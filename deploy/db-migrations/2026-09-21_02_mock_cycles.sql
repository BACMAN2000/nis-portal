-- 2026-09-21_02_mock_cycles.sql
-- CICLOS DE MOCK (21-sep-2026): el colegio rinde dos simulacros al año
-- (MOCK 1 en junio, MOCK 2 el 22-sep) y cada uno cierra con UN informe a la
-- familia. Los intentos de exam_attempts se reparten por ciclo en el front
-- (fecha + breakdown.mock_mode); lo que faltaba en la base era:
--
--   mock_cycles        una fila por ciclo: fecha, etiqueta y released_at.
--                      Mientras released_at sea null el alumno NO ve los
--                      resultados de ese ciclo en el portal (ni correo al
--                      entregar): salen todos juntos cuando los profesores
--                      terminan de corregir los Writings. Solo el admin libera.
--   speaking_results   una fila por alumno Y por ciclo (antes: una por
--                      alumno). Las 146 filas existentes son del MOCK 1.
--
-- Sin respuestas de alumnos: basta RLS (no aplica el molde de GRANT por columna).

create table if not exists public.mock_cycles (
  cycle       smallint primary key check (cycle between 1 and 9),
  label       text not null,
  exam_date   date,
  released_at timestamptz,
  released_by uuid references public.profiles(id),
  notes       text
);
alter table public.mock_cycles enable row level security;
drop policy if exists mock_cycles_select on public.mock_cycles;
create policy mock_cycles_select on public.mock_cycles for select to authenticated using (true);
drop policy if exists mock_cycles_update on public.mock_cycles;
create policy mock_cycles_update on public.mock_cycles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
insert into public.mock_cycles (cycle, label, exam_date, released_at, notes) values
  (1, 'MOCK 1', '2026-06-04', '2026-07-02', 'Informes EN/ES enviados a las familias por Toddle (jun-jul 2026).'),
  (2, 'MOCK 2', '2026-09-22', null, 'Official Mock 2 · banco MOCK 3 del motor.')
on conflict (cycle) do nothing;

-- Speaking por ciclo.
alter table public.speaking_results add column if not exists cycle smallint not null default 1;
alter table public.speaking_results drop constraint if exists speaking_results_student_id_key;
alter table public.speaking_results add constraint speaking_results_student_cycle_key unique (student_id, cycle);

-- Fuera la firma vieja de 7 parametros: si se deja, una llamada con 7 casa con
-- las dos (la nueva tiene default) y Postgres responde «function is not unique».
drop function if exists public.upsert_speaking(uuid,text,integer,integer,numeric,jsonb,text);
create or replace function public.upsert_speaking(
  p_student uuid, p_level text, p_score integer, p_total integer, p_percent numeric,
  p_breakdown jsonb, p_comment text, p_cycle smallint default 1)
returns void
language plpgsql security definer set search_path to 'public'
as $$
declare v_grade int;
begin
  select s.grade_id into v_grade from public.profiles s where s.id = p_student;
  if not found then raise exception 'student not found'; end if;
  if not ( is_admin() or (public.teacher_can_results() and public.teacher_grade_ok(v_grade)) ) then
    raise exception 'not authorized to grade this student';
  end if;
  insert into public.speaking_results as sr
    (student_id, level, score, total, percent, breakdown, comment, graded_by, updated_at, cycle)
  values (p_student, p_level, p_score, p_total, p_percent, p_breakdown, p_comment, auth.uid(), now(), coalesce(p_cycle, 1))
  on conflict (student_id, cycle) do update
     set level = excluded.level,
         score = excluded.score,
         total = excluded.total,
         percent = excluded.percent,
         breakdown = excluded.breakdown,
         comment = excluded.comment,
         graded_by = excluded.graded_by,
         updated_at = now();
end; $$;
revoke execute on function public.upsert_speaking(uuid,text,integer,integer,numeric,jsonb,text,smallint) from public, anon;
grant execute on function public.upsert_speaking(uuid,text,integer,integer,numeric,jsonb,text,smallint) to authenticated;
