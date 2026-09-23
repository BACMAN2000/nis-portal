-- 2026-09-23_01_speaking_tests.sql
-- SPEAKING TEST (23-sep-2026): la app con la que el profesor o el admin
-- examina oralmente a una pareja o un trío (Marking → 🗣️ Speaking test),
-- leyendo el guion del examinador y marcando 0-5 en cada criterio de la escala
-- analítica de Cambridge del nivel (A2 · B1 · B2 · C1) más el Global.
--
--   speaking_tests   UNA fila por candidato y sesión. `session_id` agrupa a la
--                    pareja / el trío que rindió junta; `marks` guarda la banda
--                    de cada criterio ({"Grammar and Vocabulary":3, …}) y
--                    score/total/percent/band el resultado calculado.
--                    Es independiente de speaking_results (el Speaking del
--                    MOCK 1 / MOCK 2): si el profesor quiere, el panel además
--                    llama a upsert_speaking para volcarlo al ciclo del mock.
--
-- No guarda respuestas de examen (el guion es público): basta RLS, no aplica
-- el molde de GRANT por columna de unit_exams. Lectura: el propio alumno, el
-- admin y el profesor que cubre su grado. Escritura: admin o profesor que
-- cubre al alumno (teacher_covers_student, de 2026-09-18_01_mock_mode.sql:
-- sin fila en teacher_access NO escribe).

create table if not exists public.speaking_tests (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null,
  student_id  uuid not null references public.profiles(id) on delete cascade,
  grade_id    integer,
  section     text,
  level       text not null check (level in ('A2','B1','B2','C1')),
  test_no     smallint not null check (test_no between 1 and 4),
  seat        text check (seat in ('A','B','C')),
  marks       jsonb not null default '{}'::jsonb,
  score       integer not null default 0,
  total       integer not null default 0,
  percent     numeric not null default 0,
  band        text check (band in ('AD','A','B','C')),
  comment     text,
  partners    uuid[] not null default '{}',
  examiner    uuid references public.profiles(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (session_id, student_id)
);
create index if not exists speaking_tests_student_idx on public.speaking_tests (student_id);
create index if not exists speaking_tests_grade_idx   on public.speaking_tests (grade_id, section);

alter table public.speaking_tests enable row level security;

drop policy if exists speaking_tests_sel on public.speaking_tests;
create policy speaking_tests_sel on public.speaking_tests
  for select to authenticated
  using ( student_id = (select auth.uid())
          or public.is_admin()
          or (public.is_teacher() and public.teacher_covers_student(student_id)) );

drop policy if exists speaking_tests_ins on public.speaking_tests;
create policy speaking_tests_ins on public.speaking_tests
  for insert to authenticated
  with check ( public.is_admin() or public.teacher_covers_student(student_id) );

drop policy if exists speaking_tests_upd on public.speaking_tests;
create policy speaking_tests_upd on public.speaking_tests
  for update to authenticated
  using      ( public.is_admin() or public.teacher_covers_student(student_id) )
  with check ( public.is_admin() or public.teacher_covers_student(student_id) );

drop policy if exists speaking_tests_del on public.speaking_tests;
create policy speaking_tests_del on public.speaking_tests
  for delete to authenticated
  using ( public.is_admin() or public.teacher_covers_student(student_id) );

-- Sin sesión no hay nada que leer aquí (las políticas ya son solo para
-- authenticated; esto quita además el privilegio de tabla a anon).
revoke all on public.speaking_tests from anon;
