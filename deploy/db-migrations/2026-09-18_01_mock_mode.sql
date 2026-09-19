-- 2026-09-18_01_mock_mode.sql
-- MOCK MODE (18-sep-2026): el dia del simulacro el alumno solo ve su mock.
--
--   mock_official    UNA sola fila (id = 1): el NUMERO de mock (1-7) que rinde
--                    todo el colegio, cada alumno en su nivel; null = ninguno.
--                    Junto con mock_access (el candado por grado que ya
--                    existia) decide quien esta en mock mode: grado
--                    desbloqueado + numero puesto. Solo el admin lo cambia.
--   mock_individual  el mock de UN alumno concreto (admin, o profesor que
--                    cubre su grado). Manda sobre el oficial. Se borra al
--                    quitarselo.
--
-- Ninguna de las dos guarda respuestas, asi que no aplica el molde de
-- unit_exams (GRANT por columna): basta RLS.

create table if not exists public.mock_official (
  id         smallint primary key default 1 check (id = 1),
  mock       smallint check (mock between 1 and 7),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);
insert into public.mock_official (id) values (1) on conflict (id) do nothing;

alter table public.mock_official enable row level security;
drop policy if exists mock_official_read on public.mock_official;
create policy mock_official_read on public.mock_official
  for select to authenticated using (true);
drop policy if exists mock_official_admin_upd on public.mock_official;
create policy mock_official_admin_upd on public.mock_official
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
-- Sin insert ni delete: la fila unica ya existe y no se borra.

-- El profesor asigna solo a alumnos de los grados que cubre (teacher_access).
create or replace function public.teacher_covers_student(sid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.teacher_covers_grade((select grade_id::integer from public.profiles where id = sid));
$$;

create table if not exists public.mock_individual (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  mock       smallint not null check (mock between 1 and 7),
  level      text check (level in ('A2','B1','B2','C1')),   -- null = el del perfil / el que elija
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);
alter table public.mock_individual enable row level security;
drop policy if exists mock_individual_read on public.mock_individual;
create policy mock_individual_read on public.mock_individual
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin() or public.is_teacher());
drop policy if exists mock_individual_ins on public.mock_individual;
create policy mock_individual_ins on public.mock_individual
  for insert to authenticated
  with check (public.is_admin() or public.teacher_covers_student(student_id));
drop policy if exists mock_individual_upd on public.mock_individual;
create policy mock_individual_upd on public.mock_individual
  for update to authenticated
  using (public.is_admin() or public.teacher_covers_student(student_id))
  with check (public.is_admin() or public.teacher_covers_student(student_id));
drop policy if exists mock_individual_del on public.mock_individual;
create policy mock_individual_del on public.mock_individual
  for delete to authenticated
  using (public.is_admin() or public.teacher_covers_student(student_id));
