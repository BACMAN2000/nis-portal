-- Applied to PROD (Supabase project kjrppibltkbflvxmiyib) on 2026-07-13.
-- MEDIUM FIX — quiz_results had two fully-open RLS policies:
--   "anon read results"   SELECT USING (true)      -> anyone could read all rows
--   "anon insert results" INSERT WITH CHECK (true)  -> anyone could insert anything
--
-- quiz_results stores live-quiz (Kahoot-style) session leaderboards and has no
-- owner column. The host (live-quiz.html) uses a session-less Supabase client, so
-- INSERT must stay open to anon — but we bound the payload to limit abuse. Nothing
-- in the app SELECTs this table, so public read is removed (admin-only now).

drop policy if exists "anon read results"   on public.quiz_results;
drop policy if exists "anon insert results" on public.quiz_results;

create policy "quiz_results admin read"
  on public.quiz_results for select
  to authenticated
  using (public.is_admin());

create policy "quiz_results bounded insert"
  on public.quiz_results for insert
  to anon, authenticated
  with check (
    players >= 0 and players <= 1000
    and char_length(coalesce(pin,  '')) <= 16
    and char_length(coalesce(quiz, '')) <= 200
  );
