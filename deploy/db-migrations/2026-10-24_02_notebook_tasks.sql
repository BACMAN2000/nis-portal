-- ============================================================================
-- Tareas del cuaderno digital (pestaña «Tasks» del Notebook de lit-tools.js).
--   notebook_tasks         → el profesor o el admin pone una tarea a un grado.
--   notebook_task_reviews  → su comentario a la respuesta de un alumno.
--   notebooks              → el admin y el profesor del grado pueden LEER el cuaderno.
-- Escriben admin o profesor cuyo teacher_access cubre el grado; tenant restrictivo.
-- La respuesta del alumno vive en su cuaderno (nota con task=<id>, done=true).
-- ============================================================================

-- Grado de un perfil sin pasar por la RLS de profiles (la usan las políticas de abajo).
create or replace function public.grade_of(p uuid)
returns integer language sql stable security definer set search_path to 'public'
as $$ select grade_id::integer from public.profiles where id = p $$;
revoke execute on function public.grade_of(uuid) from public, anon;
grant execute on function public.grade_of(uuid) to authenticated;

create table if not exists public.notebook_tasks (
  id           bigint generated always as identity primary key,
  school_id    uuid not null,
  grade_id     smallint not null references public.grades(id) on delete cascade,
  title        text not null check (length(title) between 1 and 160),
  instructions text check (instructions is null or length(instructions) <= 4000),
  section      text check (section is null or length(section) <= 40),
  due_on       date,
  created_by   uuid references public.profiles(id) default auth.uid(),
  created_at   timestamptz not null default now()
);
create index if not exists notebook_tasks_grade on public.notebook_tasks (grade_id);
drop trigger if exists tenant_fill on public.notebook_tasks;
create trigger tenant_fill before insert on public.notebook_tasks for each row execute function public.tenant_fill('created_by');
alter table public.notebook_tasks enable row level security;
drop policy if exists nb_tasks_lee on public.notebook_tasks;
create policy nb_tasks_lee on public.notebook_tasks for select to authenticated using (true);
drop policy if exists nb_tasks_escribe on public.notebook_tasks;
create policy nb_tasks_escribe on public.notebook_tasks for insert to authenticated
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));
drop policy if exists nb_tasks_cambia on public.notebook_tasks;
create policy nb_tasks_cambia on public.notebook_tasks for update to authenticated
  using (public.is_admin() or public.teacher_covers_grade(grade_id))
  with check (public.is_admin() or public.teacher_covers_grade(grade_id));
drop policy if exists nb_tasks_borra on public.notebook_tasks;
create policy nb_tasks_borra on public.notebook_tasks for delete to authenticated
  using (public.is_admin() or public.teacher_covers_grade(grade_id));
drop policy if exists notebook_tasks_tenant on public.notebook_tasks;
create policy notebook_tasks_tenant on public.notebook_tasks as restrictive for all to authenticated
  using ((school_id = (select public.my_school_id())) or public.is_superadmin())
  with check ((school_id = (select public.my_school_id())) or public.is_superadmin());
grant select, insert, update, delete on public.notebook_tasks to authenticated;

create table if not exists public.notebook_task_reviews (
  task_id     bigint not null references public.notebook_tasks(id) on delete cascade,
  student_id  uuid not null references public.profiles(id) on delete cascade,
  school_id   uuid not null,
  comment     text check (comment is null or length(comment) <= 4000),
  reviewed_by uuid references public.profiles(id) default auth.uid(),
  reviewed_at timestamptz not null default now(),
  primary key (task_id, student_id)
);
drop trigger if exists tenant_fill on public.notebook_task_reviews;
create trigger tenant_fill before insert on public.notebook_task_reviews for each row execute function public.tenant_fill('student_id');
alter table public.notebook_task_reviews enable row level security;
drop policy if exists nb_rev_lee on public.notebook_task_reviews;
create policy nb_rev_lee on public.notebook_task_reviews for select to authenticated
  using (student_id = (select auth.uid()) or public.is_admin() or public.teacher_covers_grade(public.grade_of(student_id)));
drop policy if exists nb_rev_escribe on public.notebook_task_reviews;
create policy nb_rev_escribe on public.notebook_task_reviews for insert to authenticated
  with check (public.is_admin() or public.teacher_covers_grade(public.grade_of(student_id)));
drop policy if exists nb_rev_cambia on public.notebook_task_reviews;
create policy nb_rev_cambia on public.notebook_task_reviews for update to authenticated
  using (public.is_admin() or public.teacher_covers_grade(public.grade_of(student_id)))
  with check (public.is_admin() or public.teacher_covers_grade(public.grade_of(student_id)));
drop policy if exists notebook_task_reviews_tenant on public.notebook_task_reviews;
create policy notebook_task_reviews_tenant on public.notebook_task_reviews as restrictive for all to authenticated
  using ((school_id = (select public.my_school_id())) or public.is_superadmin())
  with check ((school_id = (select public.my_school_id())) or public.is_superadmin());
grant select, insert, update on public.notebook_task_reviews to authenticated;

-- El cuaderno lo lee también el admin y el profesor del grado del alumno (solo lectura).
drop policy if exists notebooks_staff_lee on public.notebooks;
create policy notebooks_staff_lee on public.notebooks for select to authenticated
  using (public.is_admin() or public.teacher_covers_grade(public.grade_of(profile_id)));
