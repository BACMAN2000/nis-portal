-- Applied to PROD (Supabase project kjrppibltkbflvxmiyib) on 2026-07-13.
-- CRITICAL FIX — privilege escalation via signup metadata.
--
-- Before: handle_new_user() copied the role straight from the client-supplied
-- raw_user_meta_data->>'role'. Since anyone can call the public /auth/v1/signup
-- endpoint with the anon key and data:{role:'admin'}, any anonymous person could
-- self-register as an administrator and take over the portal.
--
-- After: self-signups always become 'student'. The metadata role is honored ONLY
-- when the caller is already an admin (the admin_create_user flow, where
-- auth.uid() is the admin). The admin_emails allow-list can still elevate seeded
-- admin emails. Verified in prod: a signup with data:{role:'admin'} produced a
-- profile with role='student'.

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare g smallint; r public.user_role; yr int;
begin
  begin g := nullif(new.raw_user_meta_data->>'grade_id','')::smallint; exception when others then g := null; end;
  begin yr := nullif(new.raw_user_meta_data->>'academic_year','')::int; exception when others then yr := null; end;
  -- Do NOT trust the client-supplied role on self-signup. Default to student;
  -- only an authenticated admin (admin_create_user) may set a privileged role.
  r := 'student';
  if public.is_admin() then
    r := coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'student');
  end if;
  if exists (select 1 from public.admin_emails a where lower(a.email)=lower(new.email)) then r := 'admin'; end if;
  insert into public.profiles(id, role, first_name, last_name, full_name, email,
     document_id, birthdate, phone, guardian_name, guardian_phone, grade_id, section, cefr_level, academic_year)
  values (new.id, r,
     new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name',
     new.raw_user_meta_data->>'full_name', new.email,
     new.raw_user_meta_data->>'document_id',
     nullif(new.raw_user_meta_data->>'birthdate','')::date,
     new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'guardian_name',
     new.raw_user_meta_data->>'guardian_phone', g,
     new.raw_user_meta_data->>'section', nullif(new.raw_user_meta_data->>'cefr_level',''),
     coalesce(yr,2026))
  on conflict (id) do nothing;
  if (new.raw_user_meta_data->>'visible_password') is not null then
    insert into public.student_credentials(profile_id, password)
    values (new.id, new.raw_user_meta_data->>'visible_password')
    on conflict (profile_id) do update set password = excluded.password, updated_at = now();
  end if;
  return new;
end;
$function$;
