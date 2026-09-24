-- 2026-09-24 · Comentario editable del informe del Mock 2 (pedido de Paolo: «un botón para el profesor y
-- admin donde puedan editar el report en comments, para el Mock 2»).
-- El «mensaje a la familia» del informe lo genera el front (_mockReportExtras) a partir de las notas.
-- Ahora el profesor/admin puede sustituirlo por un texto propio, en español y/o en inglés, guardado en
-- mock_reports.comment_es / comment_en. Vacío = vuelve al automático. Entra en el PDF, en el 👁 y en
-- el informe detallado; el hash del PDF archivado lo incluye para que se regenere.
alter table public.mock_reports
  add column if not exists comment_es text,
  add column if not exists comment_en text,
  add column if not exists comment_by uuid,
  add column if not exists comment_at timestamptz;

create or replace function public.mock_report_comment(p_student uuid, p_cycle smallint, p_lang text, p_text text)
returns void language plpgsql security definer set search_path = public as $$
declare v_grade int; v_txt text;
begin
  select grade_id into v_grade from public.profiles where id = p_student;
  if not found then raise exception 'student not found'; end if;
  if not (public.is_admin() or (public.teacher_can_results() and public.teacher_grade_ok(v_grade))) then
    raise exception 'not authorized for this student';
  end if;
  if p_lang not in ('es','en') then raise exception 'lang must be es or en'; end if;
  v_txt := nullif(btrim(coalesce(p_text,'')), '');
  if length(coalesce(v_txt,'')) > 2000 then raise exception 'comment too long (max 2000 characters)'; end if;
  -- la fila del informe la crea el motor; si aún no existe (alumno sin papers), se crea pendiente
  if not exists (select 1 from public.mock_reports where student_id = p_student and cycle = p_cycle) then
    begin perform public.mock_report_refresh(p_student, p_cycle); exception when others then null; end;
    if not exists (select 1 from public.mock_reports where student_id = p_student and cycle = p_cycle) then
      insert into public.mock_reports (student_id, cycle, status, missing) values (p_student, p_cycle, 'pending', array['Reading','Listening','Writing','Speaking']);
    end if;
  end if;
  if p_lang = 'es' then
    update public.mock_reports set comment_es = v_txt, comment_by = auth.uid(), comment_at = now(), updated_at = now()
     where student_id = p_student and cycle = p_cycle;
  else
    update public.mock_reports set comment_en = v_txt, comment_by = auth.uid(), comment_at = now(), updated_at = now()
     where student_id = p_student and cycle = p_cycle;
  end if;
end $$;
revoke execute on function public.mock_report_comment(uuid, smallint, text, text) from public, anon;
grant execute on function public.mock_report_comment(uuid, smallint, text, text) to authenticated;
