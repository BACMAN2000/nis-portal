-- Corrección de los Writing del periódico (news_responses) por el profesor / admin.
-- Criterios Cambridge 0-5 (Content, Communicative achievement, Organisation,
-- Language), nota global en la escala del colegio (AD/A/B/C) y comentario.
-- reviewed_text guarda el texto tal como estaba al corregirlo.
alter table news_responses
  add column if not exists criteria      jsonb,
  add column if not exists grade         text check (grade in ('AD','A','B','C')),
  add column if not exists feedback      text check (length(feedback) <= 4000),
  add column if not exists reviewed_text text,
  add column if not exists reviewed_by   uuid references profiles(id) on delete set null,
  add column if not exists reviewed_at   timestamptz;

-- El alumno solo escribe sus columnas: la nota no se la pone él. RLS no filtra
-- columnas; los GRANT sí.
revoke insert, update on news_responses from authenticated;
grant insert (student_id, issue_date, article_id, level, headline, answers, score, total, checked_at,
              writing, writing_words, submitted_at, updated_at) on news_responses to authenticated;
grant update (student_id, issue_date, article_id, level, headline, answers, score, total, checked_at,
              writing, writing_words, submitted_at, updated_at) on news_responses to authenticated;

-- El profesor (can_results) o el admin corrigen por aquí, solo filas de su colegio.
create or replace function news_review(p_id bigint, p_grade text, p_feedback text, p_criteria jsonb)
returns news_responses
language plpgsql security definer set search_path = public as $$
declare r news_responses;
begin
  if not (is_admin() or exists (select 1 from teacher_access t where t.profile_id = auth.uid() and t.can_results)) then
    raise exception 'Only teachers can mark writings' using errcode = '42501';
  end if;
  select * into r from news_responses where id = p_id;
  if r.id is null or not (r.school_id = my_school_id() or is_superadmin()) then
    raise exception 'Writing not found' using errcode = 'P0002';
  end if;
  update news_responses set
    grade = nullif(p_grade, ''), feedback = nullif(p_feedback, ''), criteria = p_criteria,
    reviewed_text = r.writing, reviewed_by = auth.uid(), reviewed_at = now()
  where id = p_id returning * into r;
  return r;
end $$;
revoke all on function news_review(bigint, text, text, jsonb) from public, anon;
grant execute on function news_review(bigint, text, text, jsonb) to authenticated;
