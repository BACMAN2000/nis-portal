-- Respuestas del periódico por niveles (newspaper/): una fila por alumno y artículo.
-- Guarda las respuestas marcadas, la nota de "Check answers" y el Writing (borrador
-- autoguardado; submitted_at cuando lo entrega). Molde de unit_submissions:
-- el alumno escribe lo suyo, lo leen él, el admin y los profesores con can_results,
-- y la política RESTRICTIVE del colegio impide ver filas de otro colegio.
create table if not exists news_responses (
  id            bigserial primary key,
  student_id    uuid not null default auth.uid() references profiles(id) on delete cascade,
  school_id     uuid,
  issue_date    date not null,
  article_id    text not null check (length(article_id) <= 120),
  level         text check (level in ('A2','B1','B2','C1')),
  headline      text check (length(headline) <= 300),
  answers       jsonb not null default '{}'::jsonb,
  score         smallint,
  total         smallint,
  checked_at    timestamptz,
  writing       text check (length(writing) <= 12000),
  writing_words integer,
  submitted_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (student_id, article_id)
);
create index if not exists news_responses_issue_idx on news_responses(issue_date);
create index if not exists news_responses_school_idx on news_responses(school_id);

create trigger tenant_fill before insert on news_responses
  for each row execute function tenant_fill('student_id');

alter table news_responses enable row level security;

create policy news_resp_lee on news_responses for select using (
  is_admin() or student_id = (select auth.uid())
  or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));
create policy news_resp_inserta on news_responses for insert with check (student_id = (select auth.uid()));
create policy news_resp_actualiza on news_responses for update
  using (student_id = (select auth.uid())) with check (student_id = (select auth.uid()));
create policy news_responses_tenant on news_responses as restrictive for all to authenticated
  using ((school_id = (select my_school_id())) or is_superadmin())
  with check ((school_id = (select my_school_id())) or is_superadmin());

revoke all on news_responses from anon;
grant select, insert, update on news_responses to authenticated;
grant usage on sequence news_responses_id_seq to authenticated;
