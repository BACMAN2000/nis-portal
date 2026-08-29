-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-08-29.
-- 🔴 CRITICA — el alta de usuarios llevaba ROTA desde el 2026-07-13.
--
-- El endurecimiento de ese dia (2026-07-13_01) dejo el insert apuntando a una
-- columna 'level' que en profiles NO existe: se llama cefr_level. Como el
-- trigger salta en cada insert sobre auth.users, cualquier alta -- el
-- auto-registro y tambien el boton "Nuevo usuario" del admin, que pasa por
-- admin_create_user -- moria con:
--
--     column "level" of relation "profiles" does not exist
--
-- Cuadra con los datos: la ultima cuenta creada es del 2026-06-16 y en 60 dias
-- no ha entrado ninguna. Mes y medio sin poder dar de alta a nadie.
--
-- Ademas el portal manda el nivel como 'cefr_level' en los metadatos (ver
-- doSignup en app.js), no como 'level'. Se leen los dos.
--
-- Lo demas se conserva: el rol NO se toma del cliente (solo un admin
-- autenticado puede crear roles privilegiados) y no se guarda ninguna
-- contraseña en tablas publicas.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  g smallint;
  r public.user_role;
  yr int;
begin
  begin
    g := nullif(new.raw_user_meta_data->>'grade_id','')::smallint;
  exception when others then
    g := null;
  end;

  begin
    yr := nullif(new.raw_user_meta_data->>'academic_year','')::int;
  exception when others then
    yr := null;
  end;

  -- No confiar en el rol enviado por el cliente durante auto-registro.
  r := 'student';
  if public.is_admin() then
    begin
      r := coalesce(
        nullif(new.raw_user_meta_data->>'role','')::public.user_role,
        'student'::public.user_role
      );
    exception when others then
      r := 'student';
    end;
  end if;

  insert into public.profiles(
    id, role, first_name, last_name, full_name, email, document_id, birthdate,
    phone, guardian_name, guardian_phone, grade_id, section, cefr_level, academic_year
  )
  values (
    new.id, r,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'document_id',
    nullif(new.raw_user_meta_data->>'birthdate','')::date,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'guardian_name',
    new.raw_user_meta_data->>'guardian_phone',
    g,
    new.raw_user_meta_data->>'section',
    coalesce(
      nullif(new.raw_user_meta_data->>'cefr_level',''),
      nullif(new.raw_user_meta_data->>'level','')
    ),
    coalesce(yr, 2026)
  )
  on conflict (id) do nothing;

  -- No se guardan contraseñas ni visible_password en tablas publicas.
  return new;
end;
$function$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Verificado en prod con un alta ficticia dentro de una transaccion abortada:
--   perfiles creados = 1, cefr_level = B1, grado = 9, nombre correcto
--   rol = student AUNQUE los metadatos pedian "admin"  (el endurecimiento sigue)
--   0 residuos: 162 usuarios / 162 perfiles, ninguno sin perfil.
