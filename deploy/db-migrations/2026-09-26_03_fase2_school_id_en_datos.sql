-- 2026-09-26_03_fase2_school_id_en_datos.sql
-- FASE 2 DEL MULTI-COLEGIO (26-sep-2026): aislamiento de datos por colegio.
--
-- Antes de esta migración el admin del colegio demo veía TODO lo de NIS:
-- 1.528 intentos de examen, 141 informes de mock, 1.553 sesiones… porque las
-- políticas decían «admin ve todo» y «todo» era de un solo colegio.
--
-- Qué hace, tabla por tabla (31 tablas):
--   1. Añade `school_id` (NOT NULL, con índice) y lo rellena: en las tablas con
--      persona (student_id / profile_id / user_id) desde el perfil de esa
--      persona; en las de configuración por grado (mock_access, node_access,
--      yle_settings…) todo a NIS, que es de quien era.
--   2. Trigger `tenant_fill` BEFORE INSERT: si la fila llega sin colegio, lo
--      toma del perfil de la persona, si no del que inserta (my_school_id), y
--      si no hay sesión (paneles, triggers) de NIS. El front NO cambia sus
--      inserts.
--   3. Política RESTRICTIVA `<tabla>_tenant`: se suma con AND a las políticas
--      que ya existían, así que nadie gana permisos; solo se acota a «mi
--      colegio» (o superadmin). Las políticas antiguas no se tocan.
--   4. Las tablas de configuración por grado pasan a clave primaria con
--      school_id delante: cada colegio tiene sus propias filas. El front
--      cambia solo los `onConflict` de esos upserts (commit del mismo día).
--   5. `school_copy_config(desde, hasta)` copia la configuración por grado de
--      un colegio a otro; el alta desde modelo la usa, y el demo la recibe
--      de NIS ahora.
--
-- Verificación: `_qa_visible_counts(uuid)` cuenta lo que ve cada rol con el
-- rol simulado. Antes/después con admin NIS, profesor NIS, alumno NIS y admin
-- demo: NIS ve exactamente lo mismo; demo pasa de ver todo a ver solo lo suyo.
-- Fuera del alcance (contenido compartido, sin school_id): apps, grades,
-- unit_exams, unit_exam_scripts, worksheets, yle_tests, quiz_results.

-- ---------------------------------------------------------------- trigger genérico
create or replace function public.tenant_fill() returns trigger
language plpgsql security definer set search_path = public as $$
declare col text := coalesce(TG_ARGV[0], ''); sid uuid; pid uuid;
begin
  if new.school_id is null then
    if col <> '' then
      pid := nullif(to_jsonb(new)->>col, '')::uuid;
      if pid is not null then
        select school_id into sid from public.profiles where id = pid;
      end if;
    end if;
    new.school_id := coalesce(sid, public.my_school_id(), '00000000-0000-4000-8000-000000000001');
  end if;
  return new;
end $$;
revoke execute on function public.tenant_fill() from public, anon, authenticated;

-- ---------------------------------------------------------------- columna + relleno + trigger + política
do $$
declare r record;
begin
  for r in select * from (values
    ('activity_attempts','student_id'), ('anticheat_grants','student_id'), ('anticheat_incidents','student_id'),
    ('client_errors','user_id'), ('exam_attempts','student_id'), ('fun_submissions','student_id'),
    ('mock_individual','student_id'), ('mock_reports','student_id'), ('mun_progress','student_id'),
    ('speaking_results','student_id'), ('speaking_tests','student_id'), ('student_access','student_id'),
    ('student_sessions','student_id'), ('study_plans','student_id'), ('teacher_access','profile_id'),
    ('teacher_node_access','profile_id'), ('unit_submissions','student_id'), ('yle_attempts','student_id'),
    ('yle_family_links','student_id'), ('yle_vocab_progress','student_id'),
    ('fun_access',''), ('mock_access',''), ('mock_cycles',''), ('mock_official',''), ('node_access',''),
    ('practice_access',''), ('reader_assignments',''), ('reader_exam_access',''), ('yle_access',''),
    ('yle_sessions',''), ('yle_settings','')
  ) as t(tabla, col) loop
    execute format('alter table public.%I add column if not exists school_id uuid references public.schools(id)', r.tabla);
    -- El relleno es un UPDATE masivo: sin los triggers de la tabla, que
    -- protegen calificaciones o recalculan informes (y uno, protege_calificacion
    -- en fun_submissions, ni siquiera compila contra esa tabla).
    execute format('alter table public.%I disable trigger user', r.tabla);
    if r.col <> '' then
      execute format('update public.%I t set school_id = p.school_id from public.profiles p where p.id = t.%I and t.school_id is null', r.tabla, r.col);
    end if;
    execute format('update public.%I set school_id = %L where school_id is null', r.tabla, '00000000-0000-4000-8000-000000000001');
    execute format('alter table public.%I enable trigger user', r.tabla);
    execute format('alter table public.%I alter column school_id set not null', r.tabla);
    execute format('create index if not exists %I on public.%I (school_id)', r.tabla || '_school_idx', r.tabla);
    execute format('drop trigger if exists tenant_fill on public.%I', r.tabla);
    execute format('create trigger tenant_fill before insert on public.%I for each row execute function public.tenant_fill(%L)', r.tabla, r.col);
    execute format('drop policy if exists %I on public.%I', r.tabla || '_tenant', r.tabla);
    execute format('create policy %I on public.%I as restrictive for all to authenticated
                      using      (school_id = (select public.my_school_id()) or public.is_superadmin())
                      with check (school_id = (select public.my_school_id()) or public.is_superadmin())',
                   r.tabla || '_tenant', r.tabla);
  end loop;
end $$;

-- ---------------------------------------------------------------- claves por colegio
alter table public.mock_access        drop constraint mock_access_pkey,        add primary key (school_id, grade_id);
alter table public.practice_access    drop constraint practice_access_pkey,    add primary key (school_id, grade_id);
alter table public.node_access        drop constraint node_access_pkey,        add primary key (school_id, grade_id, node_key);
alter table public.fun_access         drop constraint fun_access_pkey,         add primary key (school_id, grade_id, lang, level);
alter table public.yle_access         drop constraint yle_access_pkey,         add primary key (school_id, grade_id, level);
alter table public.yle_settings       drop constraint yle_settings_pkey,       add primary key (school_id, key);
alter table public.mock_cycles        drop constraint mock_cycles_pkey,        add primary key (school_id, cycle);
alter table public.mock_official      drop constraint mock_official_pkey,      add primary key (school_id, id);
alter table public.reader_assignments drop constraint reader_assignments_pkey, add primary key (school_id, school_year, grade_id, section, term, book_id);
alter table public.reader_exam_access drop constraint reader_exam_access_pkey, add primary key (school_id, key, scope, school_year);
alter table public.study_plans        drop constraint study_plans_area_ref_uq, add constraint study_plans_school_area_ref_uq unique (school_id, area, ref);

-- ---------------------------------------------------------------- copiar configuración de un colegio a otro
create or replace function public.school_copy_config(p_from uuid, p_to uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_superadmin() and auth.uid() is not null then
    raise exception 'Only the platform superadmin can copy a school configuration';
  end if;
  insert into public.fun_access (school_id, grade_id, lang, level, desde, hasta, unlocked)
    select p_to, grade_id, lang, level, desde, hasta, unlocked from public.fun_access where school_id = p_from on conflict do nothing;
  insert into public.mock_access (school_id, grade_id, unlocked)
    select p_to, grade_id, unlocked from public.mock_access where school_id = p_from on conflict do nothing;
  insert into public.practice_access (school_id, grade_id, unlocked)
    select p_to, grade_id, unlocked from public.practice_access where school_id = p_from on conflict do nothing;
  insert into public.node_access (school_id, grade_id, node_key, unlocked)
    select p_to, grade_id, node_key, unlocked from public.node_access where school_id = p_from on conflict do nothing;
  insert into public.yle_access (school_id, grade_id, level, unlocked, max_test)
    select p_to, grade_id, level, unlocked, max_test from public.yle_access where school_id = p_from on conflict do nothing;
  insert into public.yle_settings (school_id, key, value)
    select p_to, key, value from public.yle_settings where school_id = p_from on conflict do nothing;
  insert into public.mock_cycles (school_id, cycle, label, exam_date, notes)
    select p_to, cycle, label, exam_date, notes from public.mock_cycles where school_id = p_from on conflict do nothing;
  insert into public.mock_official (school_id, id, mock, shown_as)
    select p_to, id, mock, shown_as from public.mock_official where school_id = p_from on conflict do nothing;
end $$;
revoke execute on function public.school_copy_config(uuid, uuid) from public, anon;
grant  execute on function public.school_copy_config(uuid, uuid) to authenticated;

-- El demo recibe la configuración de NIS (candados por grado, ciclos de mock…).
select public.school_copy_config('00000000-0000-4000-8000-000000000001', (select id from public.schools where slug = 'demo'));

-- El alta desde modelo copia también la configuración.
create or replace function public.school_create_from_template(
  p_slug text, p_name text, p_short text default null, p_domain text default null,
  p_template uuid default '00000000-0000-4000-8000-000000000001')
returns uuid language plpgsql security definer set search_path = public as $$
declare nid uuid;
begin
  if not public.is_superadmin() then
    raise exception 'Only the platform superadmin can create schools';
  end if;
  insert into public.schools (slug, name, short_name, domain, logo_url, logo_dark_url, accent,
                              is_demo, status, plan, settings, template_of)
  select lower(p_slug), p_name, coalesce(p_short, p_name),
         coalesce(nullif(lower(p_domain), ''), lower(p_slug) || '.cohasset.pe'),
         'assets/cohasset-school.svg?v=6', 'assets/cohasset-school-white.svg?v=6', '#2563EB',
         false, 'trial', t.plan, t.settings, t.id
    from public.schools t where t.id = p_template
  returning id into nid;
  if nid is null then raise exception 'Template school not found'; end if;
  insert into public.school_apps (school_id, app_key, enabled)
  select nid, app_key, enabled from public.school_apps where school_id = p_template;
  perform public.school_copy_config(p_template, nid);
  return nid;
end $$;
