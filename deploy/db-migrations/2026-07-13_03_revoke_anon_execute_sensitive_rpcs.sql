-- Applied to PROD (Supabase project kjrppibltkbflvxmiyib) on 2026-07-13.
-- DEFENSE IN DEPTH — these SECURITY DEFINER action RPCs already check
-- is_admin()/teacher authorization in their body, but the anonymous role had no
-- reason to be able to call them. Revoke EXECUTE from PUBLIC/anon; keep it for
-- authenticated (admins/teachers call them signed in; the in-body checks still
-- reject non-privileged authenticated users). None of these are referenced inside
-- RLS policies, so this does not affect policy evaluation.
-- Verified in prod: anon EXECUTE = false, authenticated EXECUTE = true for all 6.

revoke execute on function public.admin_create_user(text, text, jsonb) from public, anon;
grant  execute on function public.admin_create_user(text, text, jsonb) to authenticated;

revoke execute on function public.admin_delete_user(uuid) from public, anon;
grant  execute on function public.admin_delete_user(uuid) to authenticated;

revoke execute on function public.admin_set_password(uuid, text) from public, anon;
grant  execute on function public.admin_set_password(uuid, text) to authenticated;

revoke execute on function public.set_student_access(uuid, text, boolean) from public, anon;
grant  execute on function public.set_student_access(uuid, text, boolean) to authenticated;

revoke execute on function public.upsert_speaking(uuid, text, integer, integer, numeric, jsonb, text) from public, anon;
grant  execute on function public.upsert_speaking(uuid, text, integer, integer, numeric, jsonb, text) to authenticated;

revoke execute on function public.grade_writing(uuid, integer, integer, numeric, jsonb) from public, anon;
grant  execute on function public.grade_writing(uuid, integer, integer, numeric, jsonb) to authenticated;
