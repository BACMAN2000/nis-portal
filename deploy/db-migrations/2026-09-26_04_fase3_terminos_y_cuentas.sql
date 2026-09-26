-- 2026-09-26_04_fase3_terminos_y_cuentas.sql
-- FASE 3 DEL MULTI-COLEGIO (26-sep-2026): identidad genérica.
--
--   1. `school_public(host)` devuelve además `terms` (nombres de módulo del
--      colegio), `grades` y `sections` (de schools.settings). El front los usa
--      con schoolTerm(), schoolGrades() y schoolSections().
--   2. NIS guarda en settings.terms sus nombres de siempre (Fun for Nordic,
--      Nordic Ascent, NIS Dictionary, NIShoot Live…). Los demás colegios ven
--      los neutros del front hasta que el superadmin les ponga los suyos.
--   3. `school_create_account(...)`: el superadmin crea el admin, profesores o
--      alumnos de CUALQUIER colegio desde la consola. admin_create_user no
--      valía: crea en el colegio de quien llama (NIS).

create or replace function public.school_public(p_host text) returns jsonb
language sql stable security definer set search_path = public as $$
  with s as (
    select * from public.schools
     where active and domain = lower(p_host)
    union all
    select * from public.schools
     where active and slug = lower(split_part(p_host, '.', 1))
    limit 1
  )
  select jsonb_build_object(
           'id', s.id, 'slug', s.slug, 'name', s.name, 'short_name', s.short_name,
           'domain', s.domain, 'logo_url', s.logo_url, 'logo_dark_url', s.logo_dark_url,
           'accent', s.accent, 'is_demo', s.is_demo,
           'terms',    coalesce(s.settings->'terms',    '{}'::jsonb),
           'grades',   coalesce(s.settings->'grades',   '[]'::jsonb),
           'sections', coalesce(s.settings->'sections', '[]'::jsonb),
           'apps', coalesce((select jsonb_object_agg(sa.app_key, sa.enabled)
                               from public.school_apps sa where sa.school_id = s.id), '{}'::jsonb))
    from s;
$$;

update public.schools
   set settings = settings || jsonb_build_object('terms', jsonb_build_object(
         'fun', 'Fun for Nordic', 'ascent', 'Nordic Ascent', 'dict', 'NIS Dictionary',
         'shoot', 'NIShoot Live', 'readers', 'Nordic Little Readers', 'courses', 'Nordic courses',
         'portal', 'NIS Portal'))
 where slug = 'nis';

create or replace function public.school_create_account(
  p_school uuid, p_email text, p_password text, p_full_name text,
  p_role public.user_role default 'admin', p_is_demo boolean default false,
  p_grade_id smallint default null, p_section text default null)
returns uuid language plpgsql security definer set search_path = auth, public, extensions as $$
declare uid uuid; nombre text := trim(coalesce(p_full_name, '')); primero text;
begin
  if not public.is_superadmin() then
    raise exception 'Only the platform superadmin can create school accounts';
  end if;
  if not exists (select 1 from public.schools where id = p_school) then
    raise exception 'School not found';
  end if;
  if exists (select 1 from auth.users where email = lower(p_email)) then
    raise exception 'That email already exists';
  end if;
  if length(coalesce(p_password, '')) < 8 then
    raise exception 'Password: at least 8 characters';
  end if;
  primero := split_part(nombre, ' ', 1);
  uid := public._mk_auth_user(p_email, p_password, jsonb_build_object(
           'role', p_role, 'full_name', nombre, 'first_name', primero,
           'last_name', nullif(trim(substr(nombre, length(primero) + 1)), ''),
           'grade_id', p_grade_id, 'section', p_section));
  update public.profiles set school_id = p_school, is_demo = p_is_demo, role = p_role,
                             grade_id = coalesce(p_grade_id, grade_id), section = coalesce(p_section, section)
   where id = uid;
  return uid;
end $$;
revoke execute on function public.school_create_account(uuid, text, text, text, public.user_role, boolean, smallint, text) from public, anon;
grant  execute on function public.school_create_account(uuid, text, text, text, public.user_role, boolean, smallint, text) to authenticated;
