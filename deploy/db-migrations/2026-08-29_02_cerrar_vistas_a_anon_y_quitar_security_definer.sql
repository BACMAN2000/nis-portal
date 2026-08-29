-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-08-29.
-- 🔴 CRITICA — datos de alumnos legibles SIN iniciar sesion.
--
-- v_entregas_ficha era SECURITY DEFINER y ademas tenia SELECT para 'anon'. Con
-- la clave publica que esta en config.js -- a la vista de cualquiera que abra
-- la web -- se leian nombre, grado, seccion, nota y comentario de alumnos
-- reales sin sesion. Comprobado contra /rest/v1/v_entregas_ficha antes de esto:
-- devolvia filas con nombre y apellidos de un menor.
--
-- Se hizo SECURITY DEFINER porque los ADMIN no tienen fila en teacher_access y
-- las politicas de unit_submissions solo miraban ahi; la vista se saltaba la
-- RLS para que el admin viera las entregas. La solucion correcta es al reves:
-- meter al admin en la RLS y que la vista respete la del que pregunta.

-- 1. El admin, que es lo que de verdad faltaba.
drop policy if exists unit_sub_admin_lee on public.unit_submissions;
create policy unit_sub_admin_lee on public.unit_submissions
  for select using (public.is_admin());

drop policy if exists unit_sub_admin_califica on public.unit_submissions;
create policy unit_sub_admin_califica on public.unit_submissions
  for update using (public.is_admin());

-- 2. Las vistas respetan la RLS de quien pregunta.
alter view public.v_entregas_ficha  set (security_invoker = on);
alter view public.v_tiempo_pantalla set (security_invoker = on);

-- 3. Y nadie sin sesion las lee.
revoke select on public.v_entregas_ficha  from anon;
revoke select on public.v_tiempo_pantalla from anon;
revoke select on public.student_progress  from anon;

-- Verificado en prod tras aplicar:
--   anon                         -> permission denied
--   admin                        -> 6 entregas
--   alumno                       -> 1 (solo la suya)
--   profesor con all_grades      -> 6
--   profesor de 8/10/11          -> 0  (correcto: las entregas son de 9.o)
-- De paso arregla que antes CUALQUIER profesor con can_results veia todos los
-- grados, saltandose su propio ambito.
