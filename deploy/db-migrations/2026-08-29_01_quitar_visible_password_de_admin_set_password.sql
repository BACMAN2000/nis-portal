-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-08-29.
-- 🔴 CRITICA — contraseñas en texto plano.
--
-- El 28-ago se limpio el front (fuera los botones de "ver contraseña", fuera
-- las escrituras a student_credentials, fuera visible_password del alta), pero
-- NO se toco la base. Esta funcion seguia guardando la contraseña EN CLARO en
-- cada reseteo de admin:
--
--     raw_user_meta_data || jsonb_build_object('visible_password', p_password)
--
-- raw_user_meta_data viaja dentro del JWT como user_metadata, y el JWT vive en
-- el localStorage del navegador. El arreglo del front se deshacia solo: bastaba
-- un reseteo para volver a escribirla. Habia 1 alumno real activo con la suya.
--
-- La contraseña real es encrypted_password; visible_password era solo una copia
-- para dictarsela a quien la olvidara, y ese caso ya lo resuelve la pantalla de
-- reseteo, que la enseña una vez y no la guarda.

create or replace function public.admin_set_password(p_id uuid, p_password text)
returns void
language plpgsql
security definer
set search_path to 'auth', 'public', 'extensions'
as $function$
begin
  if not public.is_admin() then
    raise exception 'No autorizado: solo un administrador puede cambiar contraseñas.';
  end if;
  if p_password is null or length(p_password) < 6 then
    raise exception 'La contraseña debe tener al menos 6 caracteres.';
  end if;
  update auth.users
     set encrypted_password = crypt(p_password, gen_salt('bf')),
         raw_user_meta_data = coalesce(raw_user_meta_data,'{}'::jsonb) - 'visible_password',
         updated_at = now()
   where id = p_id;
  if not found then
    raise exception 'Usuario no encontrado.';
  end if;
end;
$function$;

-- Purga de lo que quedo. No afecta al inicio de sesion.
update auth.users
   set raw_user_meta_data = raw_user_meta_data - 'visible_password'
 where raw_user_meta_data ? 'visible_password';

-- Verificado en prod: 0 usuarios con visible_password.
