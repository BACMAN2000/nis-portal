-- Tachaduras («Feedback with tutor») y nota del alumno en los Writing del periódico.
-- marks = [{start, end, note, by:'tutor'|'student'}], offsets sobre news_responses.writing.
-- Se escriben solo por RPC: el alumno no tiene GRANT sobre estas columnas.
alter table news_responses
  add column if not exists marks        jsonb,
  add column if not exists student_note text check (length(student_note) <= 4000);

create or replace function _news_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select is_admin() or exists (select 1 from teacher_access t where t.profile_id = auth.uid() and t.can_results)
$$;
revoke all on function _news_staff() from public, anon;
grant execute on function _news_staff() to authenticated;

-- Guarda la lista entera de marcas (gana la última versión, como en cohasset.pe).
-- El alumno solo cambia las suyas: las del profesor se conservan tal cual.
create or replace function news_marks(p_id bigint, p_marks jsonb)
returns news_responses
language plpgsql security definer set search_path = public as $$
declare r news_responses; staff boolean; m jsonb; largo int; final jsonb;
begin
  select * into r from news_responses where id = p_id;
  staff := _news_staff();
  if r.id is null or not (r.school_id = my_school_id() or is_superadmin()) then
    raise exception 'Writing not found' using errcode = 'P0002';
  end if;
  if not (staff or r.student_id = auth.uid()) then
    raise exception 'Only the student or a teacher can do this' using errcode = '42501';
  end if;
  if r.submitted_at is null then raise exception 'The writing has not been submitted' using errcode = '22023'; end if;
  if jsonb_typeof(coalesce(p_marks, '[]'::jsonb)) <> 'array' or jsonb_array_length(coalesce(p_marks, '[]'::jsonb)) > 200 then
    raise exception 'Invalid marks' using errcode = '22023';
  end if;
  largo := length(coalesce(r.writing, ''));
  for m in select * from jsonb_array_elements(coalesce(p_marks, '[]'::jsonb)) loop
    if (m->>'start') !~ '^\d+$' or (m->>'end') !~ '^\d+$'
       or (m->>'start')::int >= (m->>'end')::int or (m->>'end')::int > largo
       or coalesce(m->>'by', '') not in ('tutor', 'student')
       or length(coalesce(m->>'note', '')) > 1000 then
      raise exception 'A mark falls outside the text' using errcode = '22023';
    end if;
  end loop;
  if staff then
    final := coalesce(p_marks, '[]'::jsonb);
  else
    select coalesce(jsonb_agg(x), '[]'::jsonb) into final from (
      select x from jsonb_array_elements(coalesce(r.marks, '[]'::jsonb)) x where x->>'by' = 'tutor'
      union all
      select x from jsonb_array_elements(coalesce(p_marks, '[]'::jsonb)) x where x->>'by' = 'student'
    ) t;
  end if;
  update news_responses set marks = final where id = p_id returning * into r;
  return r;
end $$;

-- La reflexión del alumno sobre la corrección. También la puede guardar el
-- profesor cuando corrige con el alumno delante. Solo si ya hay corrección.
create or replace function news_note(p_id bigint, p_note text)
returns news_responses
language plpgsql security definer set search_path = public as $$
declare r news_responses; staff boolean;
begin
  select * into r from news_responses where id = p_id;
  staff := _news_staff();
  if r.id is null or not (r.school_id = my_school_id() or is_superadmin()) then
    raise exception 'Writing not found' using errcode = 'P0002';
  end if;
  if not (staff or r.student_id = auth.uid()) then
    raise exception 'Only the student or a teacher can do this' using errcode = '42501';
  end if;
  if r.reviewed_at is null then raise exception 'There is no feedback yet to reflect on' using errcode = '22023'; end if;
  update news_responses set student_note = nullif(left(coalesce(p_note, ''), 4000), '') where id = p_id returning * into r;
  return r;
end $$;

revoke all on function news_marks(bigint, jsonb) from public, anon;
revoke all on function news_note(bigint, text) from public, anon;
grant execute on function news_marks(bigint, jsonb) to authenticated;
grant execute on function news_note(bigint, text) to authenticated;
