-- Daily English (daily-english/): frase del día, reto del día con la solución a las 16:00 de Lima,
-- reacciones con emoji y racha. El contenido es estático (daily-english/bank/*.json); aquí solo
-- viven las interacciones y la CLAVE de los retos, que no viaja al navegador (el repo es público).
-- Molde de news_responses: lo propio para el alumno, RESTRICTIVE por colegio, nada para anon.

-- 1) Reacciones: una fila por alumno, día y emoji. Los contadores se piden por RPC sin exponer quién.
create table if not exists daily_reactions (
  id          bigserial primary key,
  student_id  uuid not null default auth.uid() references profiles(id) on delete cascade,
  school_id   uuid,
  day         date not null,
  emoji       text not null check (emoji in ('heart','laugh','fire','mind','clap')),
  created_at  timestamptz not null default now(),
  unique (student_id, day, emoji)
);
create index if not exists daily_reactions_day_idx on daily_reactions(school_id, day);
create trigger tenant_fill before insert on daily_reactions
  for each row execute function tenant_fill('student_id');
alter table daily_reactions enable row level security;
create policy daily_react_lee on daily_reactions for select using (student_id = (select auth.uid()));
create policy daily_react_inserta on daily_reactions for insert
  with check (student_id = (select auth.uid()) and day = (now() at time zone 'America/Lima')::date);
create policy daily_react_borra on daily_reactions for delete using (student_id = (select auth.uid()));
create policy daily_reactions_tenant on daily_reactions as restrictive for all to authenticated
  using ((school_id = (select my_school_id())) or is_superadmin())
  with check ((school_id = (select my_school_id())) or is_superadmin());
revoke all on daily_reactions from anon;
grant select, insert, delete on daily_reactions to authenticated;
grant usage on sequence daily_reactions_id_seq to authenticated;

-- 2) Claves de los retos: sin acceso directo para nadie salvo las RPC (security definer).
create table if not exists daily_challenge_keys (
  level    text not null check (level in ('K','A2','B1','B2','C1')),
  day_no   smallint not null check (day_no between 1 and 366),
  correct  smallint not null check (correct between 0 and 3),
  primary key (level, day_no)
);
alter table daily_challenge_keys enable row level security;
revoke all on daily_challenge_keys from anon, authenticated;

-- 3) Respuestas al reto: una por alumno y día, solo HOY y antes de las 16:00 de Lima, sin update.
create table if not exists daily_answers (
  id          bigserial primary key,
  student_id  uuid not null default auth.uid() references profiles(id) on delete cascade,
  school_id   uuid,
  day         date not null,
  level       text not null check (level in ('K','A2','B1','B2','C1')),
  day_no      smallint not null check (day_no between 1 and 366),
  choice      smallint not null check (choice between 0 and 3),
  created_at  timestamptz not null default now(),
  unique (student_id, day)
);
create index if not exists daily_answers_school_day_idx on daily_answers(school_id, day);
create trigger tenant_fill before insert on daily_answers
  for each row execute function tenant_fill('student_id');
alter table daily_answers enable row level security;
create policy daily_ans_lee on daily_answers for select using (
  is_admin() or student_id = (select auth.uid())
  or exists (select 1 from teacher_access t where t.profile_id = (select auth.uid()) and t.can_results));
create policy daily_ans_inserta on daily_answers for insert with check (
  student_id = (select auth.uid())
  and day = (now() at time zone 'America/Lima')::date
  and extract(hour from (now() at time zone 'America/Lima')) < 16);
create policy daily_answers_tenant on daily_answers as restrictive for all to authenticated
  using ((school_id = (select my_school_id())) or is_superadmin())
  with check ((school_id = (select my_school_id())) or is_superadmin());
revoke all on daily_answers from anon;
grant select, insert on daily_answers to authenticated;
grant usage on sequence daily_answers_id_seq to authenticated;

-- 4) Racha: cuenta participación (no aciertos, para no delatar la clave). La mantiene el trigger.
create table if not exists daily_streaks (
  student_id  uuid primary key references profiles(id) on delete cascade,
  school_id   uuid,
  last_day    date,
  streak      integer not null default 0,
  best        integer not null default 0
);
alter table daily_streaks enable row level security;
create policy daily_streak_lee on daily_streaks for select using (student_id = (select auth.uid()));
create policy daily_streaks_tenant on daily_streaks as restrictive for all to authenticated
  using ((school_id = (select my_school_id())) or is_superadmin());
revoke all on daily_streaks from anon;
grant select on daily_streaks to authenticated;

create or replace function daily_streak_bump() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  insert into daily_streaks(student_id, school_id, last_day, streak, best)
  values (new.student_id, new.school_id, new.day, 1, 1)
  on conflict (student_id) do update set
    streak = case when daily_streaks.last_day = new.day then daily_streaks.streak
                  when daily_streaks.last_day = new.day - 1 then daily_streaks.streak + 1
                  else 1 end,
    best = greatest(daily_streaks.best,
                  case when daily_streaks.last_day = new.day then daily_streaks.streak
                       when daily_streaks.last_day = new.day - 1 then daily_streaks.streak + 1
                       else 1 end),
    last_day = new.day,
    school_id = new.school_id;
  return new;
end $$;
drop trigger if exists daily_streak_bump on daily_answers;
create trigger daily_streak_bump after insert on daily_answers
  for each row execute function daily_streak_bump();

-- 5) RPC: contadores de reacciones del colegio para un día (sin nombres).
create or replace function daily_reaction_counts(p_day date)
returns table(emoji text, n bigint)
language sql stable security definer set search_path to 'public' as $$
  select r.emoji, count(*) from daily_reactions r
  where r.day = p_day and r.school_id = my_school_id()
  group by r.emoji;
$$;

-- 6) RPC: solución del reto. Solo después de las 16:00 de Lima de ese día (o días pasados).
create or replace function daily_result(p_day date, p_level text, p_day_no smallint)
returns table(correct smallint, mine smallint, revealed boolean)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  ahora timestamp := now() at time zone 'America/Lima';
  abierto boolean := p_day < ahora::date or (p_day = ahora::date and extract(hour from ahora) >= 16);
begin
  return query
    select case when abierto then k.correct else null end,
           (select a.choice from daily_answers a where a.student_id = auth.uid() and a.day = p_day),
           abierto
    from (select 1) x left join daily_challenge_keys k on k.level = p_level and k.day_no = p_day_no;
end $$;

-- 7) RPC: puesto del alumno en su sección este mes (aciertos en días ya revelados). Sin nombres:
--    son menores; devuelve su puesto, el tamaño de la sección y los puntos del primero.
create or replace function daily_my_rank()
returns table(points integer, rank integer, of_total integer, top_points integer, section text)
language sql stable security definer set search_path to 'public' as $$
  with yo as (select id, grade_id, section, school_id from profiles where id = auth.uid()),
  ahora as (select now() at time zone 'America/Lima' as t),
  pares as (
    select p.id,
      coalesce(sum(case when k.correct = a.choice
        and (a.day < (select t::date from ahora)
             or extract(hour from (select t from ahora)) >= 16) then 1 else 0 end), 0)::int as pts
    from profiles p
    join yo on p.school_id = yo.school_id and p.grade_id is not distinct from yo.grade_id
           and p.section is not distinct from yo.section
    left join daily_answers a on a.student_id = p.id
      and a.day >= date_trunc('month', (select t from ahora))::date
    left join daily_challenge_keys k on k.level = a.level and k.day_no = a.day_no
    where p.role = 'student'
    group by p.id)
  select (select pts from pares where id = auth.uid()),
         (select 1 + count(*) from pares where pts > (select pts from pares where id = auth.uid()))::int,
         (select count(*) from pares)::int,
         (select max(pts) from pares),
         (select section from yo);
$$;

revoke all on function daily_reaction_counts(date) from anon;
revoke all on function daily_result(date, text, smallint) from anon;
revoke all on function daily_my_rank() from anon;
grant execute on function daily_reaction_counts(date) to authenticated;
grant execute on function daily_result(date, text, smallint) to authenticated;
grant execute on function daily_my_rank() to authenticated;

-- 8) Pieza del catálogo: la tarjeta la filtra schoolContentOK('daily.english').
insert into content_items(key, label, kind, level, href, sort)
values ('daily.english', 'Daily English · phrase, challenge, word ladder and culture every day', 'reader', 'K-C1', '', 91)
on conflict (key) do update set label = excluded.label, kind = excluded.kind, level = excluded.level, sort = excluded.sort;
insert into school_content(school_id, item_key, enabled)
select s.id, 'daily.english', true from schools s
on conflict do nothing;

-- Las funciones nacen con EXECUTE para PUBLIC: quitarlo, no basta con anon.
revoke all on function daily_reaction_counts(date) from public;
revoke all on function daily_result(date, text, smallint) from public;
revoke all on function daily_my_rank() from public;
revoke all on function daily_streak_bump() from public, anon, authenticated;
grant execute on function daily_reaction_counts(date) to authenticated;
grant execute on function daily_result(date, text, smallint) to authenticated;
grant execute on function daily_my_rank() to authenticated;

-- La explicación del reto también delata la clave: vive con ella y sale con la solución.
alter table daily_challenge_keys add column if not exists explain text check (length(explain) <= 400);
drop function if exists daily_result(date, text, smallint);
create function daily_result(p_day date, p_level text, p_day_no smallint)
returns table(correct smallint, mine smallint, revealed boolean, explain text)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  ahora timestamp := now() at time zone 'America/Lima';
  abierto boolean := p_day < ahora::date or (p_day = ahora::date and extract(hour from ahora) >= 16);
begin
  return query
    select case when abierto then k.correct else null end,
           (select a.choice from daily_answers a where a.student_id = auth.uid() and a.day = p_day),
           abierto,
           case when abierto then k.explain else null end
    from (select 1) x left join daily_challenge_keys k on k.level = p_level and k.day_no = p_day_no;
end $$;
revoke all on function daily_result(date, text, smallint) from public, anon;
grant execute on function daily_result(date, text, smallint) to authenticated;
