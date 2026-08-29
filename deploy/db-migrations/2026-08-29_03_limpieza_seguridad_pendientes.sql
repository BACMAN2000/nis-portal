-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-08-29.
-- 🟡 Defensa en profundidad y limpieza. Cierra tres "Pendientes" del README.

-- 1. student_credentials guardaba las contraseñas EN CLARO. Ya estaba vacia y
--    el portal no la toca, pero conservaba politicas de INSERT/UPDATE para
--    'authenticated': superficie muerta que invita a volver a llenarla.
drop table if exists public.student_credentials cascade;

-- 2. Funciones de TRIGGER expuestas como RPC en /rest/v1/rpc/. El disparador no
--    comprueba el permiso del usuario que provoca la operacion, asi que
--    revocarles EXECUTE no rompe nada. OJO: hay que quitarselo a PUBLIC, no
--    solo a anon/authenticated -- PostgreSQL concede EXECUTE a PUBLIC por
--    defecto y los otros dos lo heredan de ahi.
revoke execute on function public.handle_new_user()               from public, anon, authenticated;
revoke execute on function public.protege_calificacion()          from public, anon, authenticated;
revoke execute on function public.guard_profile_privileged_cols() from public, anon, authenticated;
revoke execute on function public.fun_sub_touch()                 from public, anon, authenticated;

-- 3. search_path mutable. server_now SI la llama el portal (reloj del
--    anticheat): se le fija el search_path pero NO se le toca el EXECUTE.
alter function public.server_now()    set search_path = 'public', 'pg_temp';
alter function public.fun_sub_touch() set search_path = 'public', 'pg_temp';

-- 4. unaccent vivia en public. No la usa ningun indice, restriccion ni funcion
--    nuestra (comprobado), asi que se mueve al esquema de extensiones.
alter extension unaccent set schema extensions;

-- NO se tocan is_admin/is_teacher/my_role/teacher_* aunque el linter los marque
-- como ejecutables por anon: hay 6 politicas RLS alcanzables por anon que los
-- llaman, y sin EXECUTE un resultado vacio se convertiria en un error.
