-- ============================================================================
-- lit_access — qué unidades (o lecturas sueltas) de Cohasset Literature abre
-- cada grado, con fechas opcionales. Molde de practice_access, con una
-- diferencia: aquí «sin fila» = CERRADO (el libro aún no se abre a alumnos).
--   · Lee cualquier autenticado de su colegio (el alumno necesita saber qué tiene abierto).
--   · Escriben admin o el profesor cuyo teacher_access cubra el grado.
--   · Multi-colegio: school_id + tenant_fill + política RESTRICTIVA _tenant.
-- Lo que escribe el alumno va a unit_submissions (milestone 'lit:<lectura>',
-- kind 'literature'), que ya trae RLS, tenant y protege_calificacion().
-- ============================================================================

create table if not exists public.lit_access (
  id         bigint generated always as identity primary key,
  school_id  uuid not null,
  grade_id   smallint not null references public.grades(id) on delete cascade,
  unit       smallint not null check (unit between 1 and 6),
  item       text check (item is null or item ~ '^g(6|7|8|9|10|11|12)-u[1-6]-(r[1-3]|cc[12]|bi|rc[1-5])$'),
  opens_on   date,
  due_on     date,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) default auth.uid()
);

create unique index if not exists lit_access_uno
  on public.lit_access (school_id, grade_id, unit, coalesce(item, ''));

drop trigger if exists tenant_fill on public.lit_access;
create trigger tenant_fill before insert on public.lit_access
  for each row execute function public.tenant_fill('updated_by');

alter table public.lit_access enable row level security;

drop policy if exists lit_access_lee on public.lit_access;
create policy lit_access_lee on public.lit_access
  for select to authenticated using (true);

drop policy if exists lit_access_inserta on public.lit_access;
create policy lit_access_inserta on public.lit_access
  for insert to authenticated
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));

drop policy if exists lit_access_actualiza on public.lit_access;
create policy lit_access_actualiza on public.lit_access
  for update to authenticated
  using (public.is_admin() or public.teacher_covers_grade(grade_id))
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));

drop policy if exists lit_access_borra on public.lit_access;
create policy lit_access_borra on public.lit_access
  for delete to authenticated
  using (public.is_admin() or public.teacher_covers_grade(grade_id));

drop policy if exists lit_access_tenant on public.lit_access;
create policy lit_access_tenant on public.lit_access
  as restrictive for all to authenticated
  using ((school_id = (select public.my_school_id())) or public.is_superadmin())
  with check ((school_id = (select public.my_school_id())) or public.is_superadmin());

grant select, insert, update, delete on public.lit_access to authenticated;
