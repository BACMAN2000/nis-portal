-- 2026-09-26_01_schools_multi_colegio.sql
-- MULTI-COLEGIO, fase 1 (26-sep-2026): el portal pasa a poder servir a más de
-- un colegio con el mismo código y la misma base. Un superadministrador
-- (Paolo) da de alta cada colegio, le pone logo, nombre y color, y decide qué
-- apps del portal se le encienden.
--
--   schools       UNA fila por colegio. `slug` es la clave que usa el front
--                 (primer rótulo del hostname: demo.cohasset.pe → demo) y
--                 `domain` el dominio completo por si un colegio trae el suyo.
--   apps          Catálogo fijo de lo que el portal sabe hacer, por áreas.
--   school_apps   Qué app está encendida en qué colegio. SIN fila = apagada.
--   profiles      Gana `school_id` (a qué colegio pertenece cada persona) e
--                 `is_superadmin` (ve y administra todos los colegios).
--
-- Aislamiento: `is_admin()` sigue diciendo «es admin», pero desde hoy las
-- políticas de profiles añaden «…de SU colegio». Todos los 165 perfiles
-- actuales pasan a NIS, así que hoy nadie ve ni más ni menos que ayer.
-- Las demás tablas con datos de alumnos (student_sessions, unit_submissions,
-- mock_reports…) NO llevan school_id todavía: es la fase 2. Mientras tanto un
-- colegio nuevo solo debe tener cuentas de prueba, nunca alumnos reales.
--
-- Molde de RLS: el de speaking_tests (una política por acción, auth.uid() en
-- subconsulta, revoke a anon). Lo único que lee anon es school_public(), que
-- devuelve solo marca y apps encendidas: lo que se ve en la pantalla de login.

-- ---------------------------------------------------------------- schools
create table if not exists public.schools (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9-]{2,32}$'),
  name          text not null,
  short_name    text,
  domain        text unique,
  logo_url      text,          -- login y fondos claros
  logo_dark_url text,          -- cabecera (fondo de marca)
  accent        text check (accent is null or accent ~ '^#[0-9a-fA-F]{6}$'),
  is_demo       boolean not null default false,
  active        boolean not null default true,
  settings      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- NIS con id fijo: es el colegio al que cae todo lo que no diga otra cosa.
insert into public.schools (id, slug, name, short_name, domain, logo_url, logo_dark_url, accent)
values ('00000000-0000-4000-8000-000000000001', 'nis',
        'Nordic International School of Lima', 'NIS', 'nis.cohasset.pe',
        'assets/logo-h.svg', 'assets/logo-white-h.svg', '#3b5bdb')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------- apps
create table if not exists public.apps (
  key         text primary key,
  label       text not null,
  description text,
  area        text not null,     -- classes | cambridge | tools | tracking | staff
  sort        integer not null default 100
);

insert into public.apps (key, label, description, area, sort) values
 ('classes',       '🏫 Classes & units',         'Unit hub, projects, class material, scope & sequence, worksheets, unit exams and corrections', 'classes',   10),
 ('french',        '🇫🇷 French',                 'Cap sur le français and the French activities',                                             'classes',   20),
 ('littlereaders', '🧒 Little Readers',          'Picture books for primary',                                                                  'classes',   30),
 ('rhymes',        '🎶 Rhymes & chants',         'Traditional rhymes and chants',                                                              'classes',   40),
 ('library',       '📚 Library',                 'Graded readers with activities, exam and audio; reading checks',                             'classes',   50),
 ('whiteboard',    '📝 Whiteboard',              'Class whiteboard with the paint layer',                                                      'classes',   60),
 ('cambridge',     '🎓 Cambridge',               'YLE + Main Suite hub, YLE panel, study plan, Use of English, Cambridge info',                'cambridge', 70),
 ('fun_primary',   '🧸 Fun for Nordic · Primary','Starters / Movers / Flyers courses and the units by grade',                                  'cambridge', 80),
 ('fun_secondary', '🧗 Nordic Ascent · Secondary','KET / PET / B2 First / C1 courses',                                                         'cambridge', 90),
 ('mocks',         '🎧 Mocks & Practice tests',  'MOCK 1 / MOCK 2 cycles, practice tests, speaking test, final result and reports',            'cambridge', 100),
 ('tools',         '🧰 Practice tools',          'Games Lab, NIShoot Live, MUN, phonics, phrasal verbs, collocations, idioms, word formation, dictionary, pronunciation', 'tools', 110),
 ('progress',      '📈 Progress & tracking',     'Statistics, results, levels & roadmap, activities, screen time, honesty',                    'tracking',  120),
 ('teachers_room', '🧑‍🏫 Teachers'' Room',        'Staff room for teachers (grades 12/13)',                                                     'staff',     130)
on conflict (key) do nothing;

-- ---------------------------------------------------------------- school_apps
create table if not exists public.school_apps (
  school_id  uuid not null references public.schools(id) on delete cascade,
  app_key    text not null references public.apps(key) on delete cascade,
  enabled    boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (school_id, app_key)
);

-- NIS: todo encendido, que es lo que ya tenía.
insert into public.school_apps (school_id, app_key)
select '00000000-0000-4000-8000-000000000001', key from public.apps
on conflict do nothing;

-- ---------------------------------------------------------------- profiles
alter table public.profiles add column if not exists school_id uuid references public.schools(id);
alter table public.profiles add column if not exists is_superadmin boolean not null default false;
update public.profiles set school_id = '00000000-0000-4000-8000-000000000001' where school_id is null;
create index if not exists profiles_school_idx on public.profiles (school_id);

-- El superadministrador es el admin actual del portal (Paolo).
update public.profiles set is_superadmin = true
 where email = 'paolobaca2000@gmail.com' and role = 'admin';

create or replace function public.is_superadmin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_superadmin from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.my_school_id() returns uuid
language sql stable security definer set search_path = public as $$
  select school_id from public.profiles where id = auth.uid();
$$;

-- Quien nace sin colegio cae en el del que lo crea (admin_create_user corre
-- con la sesión del admin) y, sin sesión (panel de Supabase), en NIS. Nadie
-- que no sea superadmin puede mover a alguien de colegio ni hacerlo superadmin:
-- sin esto un admin de colegio se ascendería a sí mismo con un UPDATE.
create or replace function public.profiles_tenant_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if new.school_id is null then
      new.school_id := coalesce(public.my_school_id(), '00000000-0000-4000-8000-000000000001');
    end if;
    if new.is_superadmin and not public.is_superadmin() then
      new.is_superadmin := false;
    end if;
    if auth.uid() is not null and not public.is_superadmin()
       and public.my_school_id() is not null and new.school_id <> public.my_school_id() then
      raise exception 'Cannot create a user in another school';
    end if;
  elsif tg_op = 'UPDATE' then
    if (new.school_id is distinct from old.school_id
        or new.is_superadmin is distinct from old.is_superadmin)
       and auth.uid() is not null and not public.is_superadmin() then
      raise exception 'Only a superadmin can change the school or the superadmin flag';
    end if;
  end if;
  return new;
end $$;
revoke execute on function public.profiles_tenant_guard() from public, anon, authenticated;

drop trigger if exists profiles_tenant_guard on public.profiles;
create trigger profiles_tenant_guard
  before insert or update on public.profiles
  for each row execute function public.profiles_tenant_guard();

alter table public.profiles alter column school_id set not null;

-- Políticas de profiles: las mismas de antes + «de mi colegio».
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated
  using ( id = (select auth.uid())
          or public.is_superadmin()
          or ( school_id = (select public.my_school_id())
               and ( public.is_admin()
                     or ((public.teacher_can_results() or public.teacher_can_students())
                         and public.teacher_grade_ok(grade_id::integer)) ) ) );

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
  for insert to authenticated
  with check ( public.is_superadmin()
               or (public.is_admin() and school_id = (select public.my_school_id())) );

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update to authenticated
  using      ( id = (select auth.uid()) or public.is_superadmin()
               or (public.is_admin() and school_id = (select public.my_school_id())) )
  with check ( id = (select auth.uid()) or public.is_superadmin()
               or (public.is_admin() and school_id = (select public.my_school_id())) );

drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles
  for delete to authenticated
  using ( public.is_superadmin()
          or (public.is_admin() and school_id = (select public.my_school_id())) );

-- ---------------------------------------------------------------- RLS nuevas
alter table public.schools     enable row level security;
alter table public.apps        enable row level security;
alter table public.school_apps enable row level security;

drop policy if exists schools_sel on public.schools;
create policy schools_sel on public.schools for select to authenticated
  using ( id = (select public.my_school_id()) or public.is_superadmin() );
drop policy if exists schools_ins on public.schools;
create policy schools_ins on public.schools for insert to authenticated
  with check ( public.is_superadmin() );
drop policy if exists schools_upd on public.schools;
create policy schools_upd on public.schools for update to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );
drop policy if exists schools_del on public.schools;
create policy schools_del on public.schools for delete to authenticated
  using ( public.is_superadmin() );

drop policy if exists apps_sel on public.apps;
create policy apps_sel on public.apps for select to authenticated using ( true );
drop policy if exists apps_write on public.apps;
create policy apps_write on public.apps for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );

drop policy if exists school_apps_sel on public.school_apps;
create policy school_apps_sel on public.school_apps for select to authenticated
  using ( school_id = (select public.my_school_id()) or public.is_superadmin() );
drop policy if exists school_apps_write on public.school_apps;
create policy school_apps_write on public.school_apps for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );

revoke all on public.schools     from anon;
revoke all on public.apps        from anon;
revoke all on public.school_apps from anon;

-- ---------------------------------------------------------------- marca pública
-- Lo único que se ve sin sesión: nombre, logos, color y qué apps hay. Acepta
-- el hostname completo (dominio propio) o el slug (primer rótulo del host).
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
           'apps', coalesce((select jsonb_object_agg(sa.app_key, sa.enabled)
                               from public.school_apps sa where sa.school_id = s.id), '{}'::jsonb))
    from s;
$$;
grant execute on function public.school_public(text) to anon, authenticated;

-- ---------------------------------------------------------------- colegio demo
insert into public.schools (slug, name, short_name, domain, logo_url, logo_dark_url, accent, is_demo)
values ('demo', 'Demo School', 'Demo', 'demo.cohasset.pe',
        'assets/school-demo.svg', 'assets/school-demo-white.svg', '#0f766e', true)
on conflict (slug) do nothing;

-- Demo arranca con la mitad de las apps: clases, Cambridge, mocks, práctica,
-- progreso y biblioteca. El resto se enciende desde 🏫 Schools.
insert into public.school_apps (school_id, app_key, enabled)
select s.id, a.key, a.key in ('classes','cambridge','mocks','tools','progress','library')
  from public.schools s cross join public.apps a
 where s.slug = 'demo'
on conflict do nothing;
