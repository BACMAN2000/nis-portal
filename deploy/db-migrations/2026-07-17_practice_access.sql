-- ============================================================================
-- practice_access — control por grado de los PRACTICE TESTS (rama practice del
-- motor mocks-cambridge). Espejo de mock_access con dos diferencias:
--   1. unlocked DEFAULT TRUE  → los practices siguen abiertos como hasta ahora;
--      el toggle sirve para BLOQUEARLOS cuando un profesor los reserva.
--   2. Escriben admin O profesor cuyo teacher_access cubra el grado
--      (all_grades o grade_id = ANY(grades)); mock_access sigue admin-only.
-- Fail-safe del cliente: sin fila / error de red ⇒ practice abierto.
-- ============================================================================

create table if not exists public.practice_access (
  grade_id   integer primary key references public.grades(id) on delete cascade,
  unlocked   boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

alter table public.practice_access enable row level security;

-- ¿El usuario actual es profesor con este grado a su cargo?
create or replace function public.teacher_covers_grade(g integer)
returns boolean
language sql stable security definer
set search_path to 'public'
as $$
  select public.is_teacher() and coalesce(
    (select ta.all_grades or g = any(ta.grades)
       from public.teacher_access ta
      where ta.profile_id = auth.uid()),
    false);
$$;

drop policy if exists practice_access_read on public.practice_access;
create policy practice_access_read on public.practice_access
  for select to authenticated using (true);

drop policy if exists practice_access_write_ins on public.practice_access;
create policy practice_access_write_ins on public.practice_access
  for insert to authenticated
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));

drop policy if exists practice_access_write_upd on public.practice_access;
create policy practice_access_write_upd on public.practice_access
  for update to authenticated
  using (public.is_admin() or public.teacher_covers_grade(grade_id))
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));

drop policy if exists practice_access_admin_del on public.practice_access;
create policy practice_access_admin_del on public.practice_access
  for delete to authenticated using (public.is_admin());
