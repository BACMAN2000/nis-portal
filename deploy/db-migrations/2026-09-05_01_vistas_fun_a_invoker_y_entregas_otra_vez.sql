-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-09-05.
-- 🔴 CRITICA — datos de alumnos legibles sin sesion, otra vez, y una regresion.
--
-- Auditoria del 2026-09-05. Dos cosas distintas:
--
-- 1) LAS VISTAS NUEVAS REPITIERON EL PATRON. v_fun_metricas y v_fun_unidades
--    nacieron SECURITY DEFINER y con SELECT para 'anon'. Comprobado contra la
--    API antes de esto, sin ninguna sesion:
--        GET /rest/v1/v_fun_metricas -> 206, 2 filas
--        {"full_name":"...","grade_id":1,"section":"A","nota_media":null,...}
--    Hoy son 2 filas porque Fun for Nordic acaba de arrancar; con el colegio
--    dentro es el listado de menores con su nota.
--
-- 2) v_entregas_ficha VOLVIO A SER SECURITY DEFINER. La migracion
--    2026-08-29_02 ya le puso security_invoker, pero un CREATE OR REPLACE VIEW
--    posterior -- el que le anadio las columnas de correccion de producciones
--    escritas -- se llevo la opcion por delante. Los grants sobrevivieron (por
--    eso 'anon' sigue dando 401), pero el modo no: la vista volvia a saltarse
--    la RLS y su unico WHERE es kind='worksheet', asi que CUALQUIER cuenta con
--    sesion -- la de un alumno -- leia las entregas de todos.
--    Leccion: CREATE OR REPLACE VIEW no conserva reloptions. Al recrear una
--    vista hay que volver a poner security_invoker.

-- 1. El admin, que en fun_submissions faltaba (mismo agujero que tenia
--    unit_submissions en agosto: los admin no estan en teacher_access).
drop policy if exists fun_sub_admin_lee on public.fun_submissions;
create policy fun_sub_admin_lee on public.fun_submissions
  for select using (public.is_admin());

-- 2. Las tres vistas respetan la RLS de quien pregunta.
alter view public.v_fun_metricas   set (security_invoker = on);
alter view public.v_fun_unidades   set (security_invoker = on);
alter view public.v_entregas_ficha set (security_invoker = on);

-- 3. Y nadie sin sesion las lee.
revoke select on public.v_fun_metricas   from anon;
revoke select on public.v_fun_unidades   from anon;
revoke select on public.v_entregas_ficha from anon;
