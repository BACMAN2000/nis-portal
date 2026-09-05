-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-09-05.
-- 🟠 MEDIA — cerrar el mismo patron de 2026-09-05_03 en las dos tablas que
-- quedaban, por decision del usuario.
--
-- `worksheets` (96 fichas) y `reader_exam_access` (72 permisos de examen)
-- dejaban escribir a cualquiera con `profiles.role IN ('admin','teacher')`, sin
-- exigir que tuviera grados asignados. Medido con el mismo metodo (UPDATE con
-- constante, sin WHERE ni RETURNING, en transaccion abortada), un profesor SIN
-- fila en teacher_access podia modificar las 96 fichas y los 72 permisos.
--
-- Aqui no hay fuga de datos: las fichas son material de clase y
-- reader_exam_access solo guarda key, unlocked, scope, school_year y fechas.
-- El riesgo es de otro tipo: abrir o cerrar un examen a destiempo, o cambiar
-- una ficha que otro profesor esta usando en su clase.
--
-- Se copia el patron de fun_submissions, que es el unico que ya lo hacia bien:
-- exigir fila en teacher_access. Y se conserva `is_admin()` porque **los admin
-- no tienen fila en teacher_access** — es el error que ya costo un susto en la
-- migracion del 29-ago.
--
-- No se exige `can_results`: eso es permiso sobre resultados de alumnos, y aqui
-- se trata de material y de calendario de examenes. Basta con ser profesor con
-- ambito asignado.

alter policy worksheets_escribe on public.worksheets
  with check ( public.is_admin()
               or exists (select 1 from public.teacher_access t
                          where t.profile_id = (select auth.uid())) );

alter policy worksheets_actualiza on public.worksheets
  using ( public.is_admin()
          or exists (select 1 from public.teacher_access t
                     where t.profile_id = (select auth.uid())) );

alter policy rea_insert on public.reader_exam_access
  with check ( public.is_admin()
               or exists (select 1 from public.teacher_access t
                          where t.profile_id = (select auth.uid())) );

alter policy rea_update on public.reader_exam_access
  using ( public.is_admin()
          or exists (select 1 from public.teacher_access t
                     where t.profile_id = (select auth.uid())) )
  with check ( public.is_admin()
               or exists (select 1 from public.teacher_access t
                          where t.profile_id = (select auth.uid())) );

-- Verificado contando filas modificables a ciegas, antes y despues:
--
--                          worksheets      reader_exam_access
--   admin                    96 -> 96           72 -> 72
--   profesor con acceso      96 -> 96           72 -> 72
--   profesor SIN acceso      96 ->  0           72 ->  0
--   alumno                    0 ->  0            0 ->  0
--
-- La lectura no se toca: `worksheets_lee` sigue dejando ver las fichas a
-- cualquier sesion y `rea_select` sigue en `true` para authenticated, que es lo
-- que necesita el alumno para saber si su examen esta abierto.
