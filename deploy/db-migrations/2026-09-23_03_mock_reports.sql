-- 2026-09-23_03_mock_reports.sql   (aplicada por MCP el 23-sep-2026)
-- Motor del informe del Mock 2 (pedido de Paolo, 23-sep-2026): en cuanto entra la
-- nota de Speaking (o la que faltara), la evaluación del alumno queda marcada
-- «completed» y lista para enviar a la familia; el envío es por alumno.
--
--   mock_reports          UNA fila por alumno y ciclo: status pending → completed → sent,
--                         qué destrezas faltan, cuándo se completó, quién lo envió y la
--                         ruta del PDF archivado en Storage (bucket `reports`).
--   mock_report_refresh   recalcula la fila de un alumno con la MISMA regla que
--                         mockCycleFinal(…, 2) en app/72-mocks.js: ciclo 2 = intentos en
--                         mock mode o del banco mock3 desde el 22-sep; hacen falta Reading,
--                         Listening, Writing (salvo A2 sin paper de Writing) y Speaking
--                         (speaking_results.cycle = 2) con nota.
--   triggers              exam_attempts (insert/update de percent/breakdown, delete) y
--                         speaking_results (insert/update/delete) → refresh del alumno.
--                         Así da igual desde dónde se ponga la nota (rúbrica de Writing,
--                         corrector de Speaking del panel o la app de Speaking test).
--   mock_report_send      marca/desmarca «sent» (admin o profesor con can_results y grado).
--   mock_report_pdf       guarda las rutas del PDF archivado y el hash del contenido.
--   storage `reports`     el staff puede subir/leer; el alumno no lo necesita (ve el
--                         informe en el portal y genera su PDF al momento).

create table if not exists public.mock_reports (
  student_id   uuid not null references public.profiles(id) on delete cascade,
  cycle        smallint not null default 2,
  status       text not null default 'pending' check (status in ('pending','completed','sent')),
  level        text,
  missing      text[] not null default '{}',
  completed_at timestamptz,
  sent_at      timestamptz,
  sent_by      uuid references public.profiles(id),
  pdf_es       text,
  pdf_en       text,
  pdf_hash     text,
  pdf_at       timestamptz,
  updated_at   timestamptz not null default now(),
  primary key (student_id, cycle)
);
create index if not exists mock_reports_status_idx on public.mock_reports (cycle, status);

alter table public.mock_reports enable row level security;
drop policy if exists mock_reports_sel on public.mock_reports;
create policy mock_reports_sel on public.mock_reports for select to authenticated
  using (auth.uid() = student_id or public.is_admin() or public.teacher_can_results());
-- Sin políticas de escritura: todo pasa por las funciones SECURITY DEFINER de abajo.

create or replace function public.mock_report_refresh(p_student uuid, p_cycle smallint default 2)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_any bool; v_r bool; v_l bool; v_w bool; v_w_any bool; v_s bool; v_level text;
  v_missing text[] := '{}'; v_complete bool;
begin
  if p_cycle <> 2 then return; end if;
  with c2 as (
    select a.skill, a.level, a.percent from public.exam_attempts a
     where a.student_id = p_student
       and ((a.breakdown ? 'mock_mode') or (a.submitted_at >= '2026-09-22T05:00:00Z' and a.mock = 'mock3'))
  )
  select count(*) > 0,
         coalesce(bool_or(skill = 'Reading'   and percent is not null), false),
         coalesce(bool_or(skill = 'Listening' and percent is not null), false),
         coalesce(bool_or(skill = 'Writing'   and percent is not null), false),
         coalesce(bool_or(skill = 'Writing'), false),
         (select level from c2 group by level order by count(*) desc, level limit 1)
    into v_any, v_r, v_l, v_w, v_w_any, v_level
    from c2;
  if not v_any then
    delete from public.mock_reports where student_id = p_student and cycle = p_cycle and status <> 'sent';
    return;
  end if;
  select exists (select 1 from public.speaking_results s where s.student_id = p_student and s.cycle = p_cycle and s.percent is not null) into v_s;
  if not v_r then v_missing := array_append(v_missing, 'Reading & Use of English'); end if;
  if not v_l then v_missing := array_append(v_missing, 'Listening'); end if;
  if not (v_level = 'A2' and not v_w_any) and not v_w then v_missing := array_append(v_missing, 'Writing'); end if;
  if not v_s then v_missing := array_append(v_missing, 'Speaking'); end if;
  v_complete := cardinality(v_missing) = 0;
  insert into public.mock_reports as r (student_id, cycle, status, level, missing, completed_at, updated_at)
  values (p_student, p_cycle, case when v_complete then 'completed' else 'pending' end, v_level, v_missing,
          case when v_complete then now() end, now())
  on conflict (student_id, cycle) do update set
    level        = excluded.level,
    missing      = excluded.missing,
    updated_at   = now(),
    status       = case when r.status = 'sent' then 'sent' when v_complete then 'completed' else 'pending' end,
    completed_at = case when v_complete then coalesce(r.completed_at, now()) else null end;
end $$;

create or replace function public.trg_mock_report_attempt() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_row public.exam_attempts;
begin
  v_row := coalesce(new, old);
  if (v_row.breakdown ? 'mock_mode') or v_row.mock = 'mock3' then
    perform public.mock_report_refresh(v_row.student_id, 2::smallint);
  end if;
  return null;
end $$;
drop trigger if exists mock_report_attempt on public.exam_attempts;
create trigger mock_report_attempt
  after insert or delete or update of percent, breakdown, skill, level on public.exam_attempts
  for each row execute function public.trg_mock_report_attempt();

create or replace function public.trg_mock_report_speaking() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_row public.speaking_results;
begin
  v_row := coalesce(new, old);
  if coalesce(v_row.cycle, 1) = 2 then
    perform public.mock_report_refresh(v_row.student_id, 2::smallint);
  end if;
  return null;
end $$;
drop trigger if exists mock_report_speaking on public.speaking_results;
create trigger mock_report_speaking
  after insert or update or delete on public.speaking_results
  for each row execute function public.trg_mock_report_speaking();

create or replace function public.mock_report_send(p_student uuid, p_cycle smallint, p_on boolean)
returns void language plpgsql security definer set search_path = public as $$
declare v_grade int; v_status text;
begin
  select grade_id into v_grade from public.profiles where id = p_student;
  if not found then raise exception 'student not found'; end if;
  if not (public.is_admin() or (public.teacher_can_results() and public.teacher_grade_ok(v_grade))) then
    raise exception 'not authorized for this student';
  end if;
  select status into v_status from public.mock_reports where student_id = p_student and cycle = p_cycle;
  if p_on then
    if v_status is null then raise exception 'no Mock % report for this student yet', p_cycle; end if;
    if v_status = 'pending' then raise exception 'the report is not complete yet'; end if;
    update public.mock_reports set status = 'sent', sent_at = now(), sent_by = auth.uid(), updated_at = now()
     where student_id = p_student and cycle = p_cycle;
  else
    update public.mock_reports
       set status = case when cardinality(missing) = 0 then 'completed' else 'pending' end,
           sent_at = null, sent_by = null, updated_at = now()
     where student_id = p_student and cycle = p_cycle;
  end if;
end $$;

create or replace function public.mock_report_pdf(p_student uuid, p_cycle smallint, p_es text, p_en text, p_hash text)
returns void language plpgsql security definer set search_path = public as $$
declare v_grade int;
begin
  select grade_id into v_grade from public.profiles where id = p_student;
  if not found then raise exception 'student not found'; end if;
  if not (public.is_admin() or (public.teacher_can_results() and public.teacher_grade_ok(v_grade))) then
    raise exception 'not authorized for this student';
  end if;
  update public.mock_reports set pdf_es = p_es, pdf_en = p_en, pdf_hash = p_hash, pdf_at = now(), updated_at = now()
   where student_id = p_student and cycle = p_cycle;
end $$;

-- Storage: el staff archiva y lee los PDF en el bucket `reports` (ya existía, vacío).
drop policy if exists reports_staff_all on storage.objects;
create policy reports_staff_all on storage.objects for all to authenticated
  using (bucket_id = 'reports' and (public.is_admin() or public.teacher_can_results()))
  with check (bucket_id = 'reports' and (public.is_admin() or public.teacher_can_results()));

-- Relleno inicial: todos los alumnos con papers del ciclo 2.
select public.mock_report_refresh(x.student_id, 2::smallint)
  from (select distinct student_id from public.exam_attempts
         where (breakdown ? 'mock_mode') or (submitted_at >= '2026-09-22T05:00:00Z' and mock = 'mock3')) x;
