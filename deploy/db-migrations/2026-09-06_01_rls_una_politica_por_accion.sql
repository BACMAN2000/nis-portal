-- 2026-09-06 · Una sola política permisiva por tabla y acción
--
-- Situación: el panel avisaba de 124 casos de "multiple permissive policies".
-- No era un problema de permisos sino de coste: dos o más políticas que dicen
-- lo mismo se evalúan TODAS en cada consulta, fila por fila.
--
-- Regla aplicada: las políticas permisivas ya se combinan con OR, así que
-- fusionarlas en una por acción da exactamente el mismo permiso efectivo.
-- Donde una política ALL convivía con una SELECT, se acotó la ALL a
-- INSERT/UPDATE/DELETE, comprobando ANTES que la de lectura cubría lo que la
-- ALL permitía leer.
--
-- La trampa que obligó a mirar tabla por tabla: en teacher_access la política
-- de lectura era solo "tu propia fila", así que acotar la de escritura habría
-- dejado al administrador sin ver las filas de los demás profesores. Ahí hubo
-- que ampliar la lectura ANTES de tocar nada.
--
-- Verificado con rol simulado (admin, profesor y alumno) contando filas
-- visibles en profiles, activity_attempts, exam_attempts, fun_submissions,
-- unit_submissions, node_access, teacher_access, grades y student_access,
-- antes y después: cifras idénticas en los tres roles.
--
-- Resultado: 124 avisos -> 0, sin mover un solo permiso.

-- ---------------------------------------------------------------------------
-- Bloque 1 · la lectura ya cubría al admin (o era abierta a autenticados)
-- ---------------------------------------------------------------------------

drop policy if exists grades_admin on public.grades;
create policy grades_admin_ins on public.grades for insert to authenticated with check (is_admin());
create policy grades_admin_upd on public.grades for update to authenticated using (is_admin()) with check (is_admin());
create policy grades_admin_del on public.grades for delete to authenticated using (is_admin());

drop policy if exists ra_write on public.reader_assignments;
create policy ra_write_ins on public.reader_assignments for insert to authenticated
  with check (exists (select 1 from profiles p where p.id = (select auth.uid()) and p.role = any (array['admin'::user_role,'teacher'::user_role])));
create policy ra_write_upd on public.reader_assignments for update to authenticated
  using (exists (select 1 from profiles p where p.id = (select auth.uid()) and p.role = any (array['admin'::user_role,'teacher'::user_role])))
  with check (exists (select 1 from profiles p where p.id = (select auth.uid()) and p.role = any (array['admin'::user_role,'teacher'::user_role])));
create policy ra_write_del on public.reader_assignments for delete to authenticated
  using (exists (select 1 from profiles p where p.id = (select auth.uid()) and p.role = any (array['admin'::user_role,'teacher'::user_role])));

drop policy if exists tna_admin on public.teacher_node_access;
create policy tna_admin_ins on public.teacher_node_access for insert to authenticated with check (is_admin());
create policy tna_admin_upd on public.teacher_node_access for update to authenticated using (is_admin()) with check (is_admin());
create policy tna_admin_del on public.teacher_node_access for delete to authenticated using (is_admin());

drop policy if exists sa_admin on public.student_access;
create policy sa_admin_ins on public.student_access for insert to authenticated with check (is_admin());
create policy sa_admin_upd on public.student_access for update to authenticated using (is_admin()) with check (is_admin());
create policy sa_admin_del on public.student_access for delete to authenticated using (is_admin());

-- teacher_access: AQUÍ estaba la trampa. Primero se amplía la lectura.
drop policy if exists ta_self_read on public.teacher_access;
create policy ta_read on public.teacher_access for select to authenticated
  using (profile_id = (select auth.uid()) or is_admin());
drop policy if exists ta_admin_all on public.teacher_access;
create policy ta_admin_ins on public.teacher_access for insert to authenticated with check (is_admin());
create policy ta_admin_upd on public.teacher_access for update to authenticated using (is_admin()) with check (is_admin());
create policy ta_admin_del on public.teacher_access for delete to authenticated using (is_admin());

drop policy if exists yle_settings_admin on public.yle_settings;
create policy yle_settings_ins on public.yle_settings for insert to authenticated with check (is_admin());
create policy yle_settings_upd on public.yle_settings for update to authenticated using (is_admin()) with check (is_admin());
create policy yle_settings_del on public.yle_settings for delete to authenticated using (is_admin());

-- ---------------------------------------------------------------------------
-- Bloque 2 · YLE
-- ---------------------------------------------------------------------------

drop policy if exists yle_access_admin on public.yle_access;
drop policy if exists yle_access_profesor on public.yle_access;
drop policy if exists yle_access_lee on public.yle_access;
create policy yle_access_lee on public.yle_access for select using ((select auth.role()) = 'authenticated');
create policy yle_access_ins on public.yle_access for insert with check (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));
create policy yle_access_upd on public.yle_access for update using (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer))) with check (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));
create policy yle_access_del on public.yle_access for delete using (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));

drop policy if exists yle_sessions_admin on public.yle_sessions;
drop policy if exists yle_sessions_profesor on public.yle_sessions;
drop policy if exists yle_sessions_lee on public.yle_sessions;
create policy yle_sessions_lee on public.yle_sessions for select using ((select auth.role()) = 'authenticated');
create policy yle_sessions_ins on public.yle_sessions for insert with check (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));
create policy yle_sessions_upd on public.yle_sessions for update using (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer))) with check (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));
create policy yle_sessions_del on public.yle_sessions for delete using (is_admin() or (teacher_can_results() and teacher_grade_ok(grade_id::integer)));

drop policy if exists links_admin on public.yle_family_links;
drop policy if exists links_profesor on public.yle_family_links;
create policy links_sel on public.yle_family_links for select to authenticated
  using (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_family_links.student_id and teacher_grade_ok(s.grade_id::integer))));
create policy links_ins on public.yle_family_links for insert to authenticated
  with check (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_family_links.student_id and teacher_grade_ok(s.grade_id::integer))));
create policy links_upd on public.yle_family_links for update to authenticated
  using (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_family_links.student_id and teacher_grade_ok(s.grade_id::integer))))
  with check (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_family_links.student_id and teacher_grade_ok(s.grade_id::integer))));
create policy links_del on public.yle_family_links for delete to authenticated
  using (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_family_links.student_id and teacher_grade_ok(s.grade_id::integer))));

drop policy if exists vocab_admin on public.yle_vocab_progress;
drop policy if exists vocab_alumno on public.yle_vocab_progress;
drop policy if exists vocab_profesor_lee on public.yle_vocab_progress;
create policy vocab_sel on public.yle_vocab_progress for select to authenticated
  using (is_admin() or student_id = (select auth.uid())
         or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_vocab_progress.student_id and teacher_grade_ok(s.grade_id::integer))));
create policy vocab_ins on public.yle_vocab_progress for insert to authenticated with check (is_admin() or student_id = (select auth.uid()));
create policy vocab_upd on public.yle_vocab_progress for update to authenticated using (is_admin() or student_id = (select auth.uid())) with check (is_admin() or student_id = (select auth.uid()));
create policy vocab_del on public.yle_vocab_progress for delete to authenticated using (is_admin() or student_id = (select auth.uid()));

drop policy if exists yle_admin_todo on public.yle_attempts;
drop policy if exists yle_alumno_escribe on public.yle_attempts;
drop policy if exists yle_alumno_lee on public.yle_attempts;
drop policy if exists yle_profesor_lee on public.yle_attempts;
drop policy if exists yle_profesor_califica on public.yle_attempts;
create policy yle_att_sel on public.yle_attempts for select to authenticated
  using (is_admin() or student_id = (select auth.uid())
         or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_attempts.student_id and teacher_grade_ok(s.grade_id::integer))));
create policy yle_att_ins on public.yle_attempts for insert to authenticated with check (is_admin() or student_id = (select auth.uid()));
create policy yle_att_upd on public.yle_attempts for update to authenticated
  using (is_admin() or (teacher_can_results() and exists (select 1 from profiles s where s.id = yle_attempts.student_id and teacher_grade_ok(s.grade_id::integer))))
  with check (is_admin() or teacher_can_results());
create policy yle_att_del on public.yle_attempts for delete to authenticated using (is_admin());

-- ---------------------------------------------------------------------------
-- Bloque 3 · progreso, accesos y perfiles
-- ---------------------------------------------------------------------------

drop policy if exists aa_admin_all on public.activity_attempts;
drop policy if exists aa_insert_own on public.activity_attempts;
create policy aa_insert on public.activity_attempts for insert with check (is_admin() or student_id = (select auth.uid()));
create policy aa_update on public.activity_attempts for update using (is_admin()) with check (is_admin());
create policy aa_delete on public.activity_attempts for delete using (is_admin());

drop policy if exists attempts_admin_all on public.exam_attempts;
drop policy if exists attempts_insert_own on public.exam_attempts;
create policy attempts_insert on public.exam_attempts for insert to authenticated with check (is_admin() or student_id = (select auth.uid()));
create policy attempts_update on public.exam_attempts for update to authenticated using (is_admin()) with check (is_admin());
create policy attempts_delete on public.exam_attempts for delete to authenticated using (is_admin());

drop policy if exists mp_admin_all on public.mun_progress;
drop policy if exists mp_insert_own on public.mun_progress;
drop policy if exists mp_update_own on public.mun_progress;
create policy mp_insert on public.mun_progress for insert with check (is_admin() or student_id = (select auth.uid()));
create policy mp_update on public.mun_progress for update using (is_admin() or student_id = (select auth.uid())) with check (is_admin() or student_id = (select auth.uid()));
create policy mp_delete on public.mun_progress for delete using (is_admin());

drop policy if exists node_access_admin on public.node_access;
drop policy if exists node_access_teacher_insert_units on public.node_access;
drop policy if exists node_access_teacher_update_units on public.node_access;
create policy node_access_ins on public.node_access for insert to authenticated
  with check (is_admin() or (is_teacher() and teacher_grade_ok(grade_id) and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'));
create policy node_access_upd on public.node_access for update to authenticated
  using (is_admin() or (is_teacher() and teacher_grade_ok(grade_id) and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'))
  with check (is_admin() or (is_teacher() and teacher_grade_ok(grade_id) and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'));
create policy node_access_del on public.node_access for delete to authenticated using (is_admin());

drop policy if exists profiles_admin_all on public.profiles;
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_insert on public.profiles for insert to authenticated with check (is_admin());
create policy profiles_update on public.profiles for update to authenticated
  using (is_admin() or id = (select auth.uid())) with check (is_admin() or id = (select auth.uid()));
create policy profiles_delete on public.profiles for delete to authenticated using (is_admin());

drop policy if exists study_plans_admin on public.study_plans;
drop policy if exists study_plans_teacher_ins on public.study_plans;
drop policy if exists study_plans_teacher_upd on public.study_plans;
create policy study_plans_ins on public.study_plans for insert
  with check (is_admin() or (is_teacher() and ((scope = 'grade' and teacher_covers_grade(grade_id::integer))
    or (scope = 'student' and exists (select 1 from profiles s where s.id = study_plans.student_id and teacher_covers_grade(s.grade_id::integer))))));
create policy study_plans_upd on public.study_plans for update
  using (is_admin() or (is_teacher() and ((scope = 'grade' and teacher_covers_grade(grade_id::integer))
    or (scope = 'student' and exists (select 1 from profiles s where s.id = study_plans.student_id and teacher_covers_grade(s.grade_id::integer))))))
  with check (is_admin() or (is_teacher() and ((scope = 'grade' and teacher_covers_grade(grade_id::integer))
    or (scope = 'student' and exists (select 1 from profiles s where s.id = study_plans.student_id and teacher_covers_grade(s.grade_id::integer))))));
create policy study_plans_del on public.study_plans for delete using (is_admin());

-- ---------------------------------------------------------------------------
-- Bloque 4 · entregas. En UPDATE, las políticas del profesor y del admin no
-- declaraban WITH CHECK, así que Postgres reutilizaba su USING: al fusionar se
-- escribe ese mismo OR en los dos lados. Nadie tenía DELETE y sigue sin haberlo.
-- ---------------------------------------------------------------------------

drop policy if exists fun_sub_admin_lee on public.fun_submissions;
drop policy if exists fun_sub_alumno_lee on public.fun_submissions;
drop policy if exists fun_sub_profesor_lee on public.fun_submissions;
drop policy if exists fun_sub_alumno_actualiza on public.fun_submissions;
drop policy if exists fun_sub_profesor_califica on public.fun_submissions;
create policy fun_sub_lee on public.fun_submissions for select
  using (is_admin() or student_id = (select auth.uid())
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));
create policy fun_sub_actualiza on public.fun_submissions for update
  using (student_id = (select auth.uid())
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results))
  with check (student_id = (select auth.uid())
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));

drop policy if exists unit_sub_admin_lee on public.unit_submissions;
drop policy if exists unit_sub_alumno_lee on public.unit_submissions;
drop policy if exists unit_sub_galeria_lee on public.unit_submissions;
drop policy if exists unit_sub_profesor_lee on public.unit_submissions;
drop policy if exists unit_sub_admin_califica on public.unit_submissions;
drop policy if exists unit_sub_alumno_actualiza on public.unit_submissions;
drop policy if exists unit_sub_profesor_califica on public.unit_submissions;
create policy unit_sub_lee on public.unit_submissions for select
  using (is_admin() or student_id = (select auth.uid())
         or (shared and (select auth.uid()) is not null)
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));
create policy unit_sub_actualiza on public.unit_submissions for update
  using (is_admin() or student_id = (select auth.uid())
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results))
  with check (is_admin() or student_id = (select auth.uid())
         or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));

-- ---------------------------------------------------------------------------
-- Bloque 5 · lo que quedaba del informe de rendimiento
-- ---------------------------------------------------------------------------

-- auth.role() sin envolver se evalúa una vez POR FILA.
drop policy if exists yle_access_lee on public.yle_access;
create policy yle_access_lee on public.yle_access for select using ((select auth.role()) = 'authenticated');
drop policy if exists yle_sessions_lee on public.yle_sessions;
create policy yle_sessions_lee on public.yle_sessions for select using ((select auth.role()) = 'authenticated');

-- Última clave foránea del esquema sin índice que la cubriera.
create index if not exists yle_family_links_student_id_idx on public.yle_family_links (student_id);
