-- 2026-09-22 · A2 Key: el Writing (Parts 6 y 7) va dentro del paper de Reading & Writing.
-- El motor guarda los dos textos en exam_attempts.answers del intento de Reading
-- («Part 6 (Writing — not auto-scored)») y no los puntúa: la profesora no tenía dónde
-- corregirlos y la columna Writing del panel decía «— in Reading».
-- Solución: cada Reading A2 rendido en mock mode genera su propio intento de Writing
-- (percent null = pendiente de corregir) con esos textos en `answers`, enlazado por
-- breakdown.from_reading. El resto del portal ya sabía qué hacer con un Writing en A2
-- (mockCycleFinal / _finalFromData: «si la profesora SÍ calificó un Writing, se incluye»).
-- La nota se guarda con la RPC grade_writing de siempre (rúbrica A2: 3 criterios × 5 × 2 tareas).

create or replace function public.a2_writing_from_reading(p_reading uuid) returns uuid
language plpgsql security definer set search_path = public as $$
declare r record; v_id uuid; v_answers jsonb; v_bd jsonb;
begin
  select * into r from exam_attempts where id = p_reading;
  if r.id is null then return null; end if;
  if r.skill <> 'Reading' or r.level <> 'A2' or r.answers is null or jsonb_typeof(r.answers) <> 'array' then return null; end if;
  select id into v_id from exam_attempts where skill = 'Writing' and breakdown->>'from_reading' = p_reading::text limit 1;
  if v_id is not null then return v_id; end if;
  select jsonb_agg(jsonb_build_object(
           'label',     regexp_replace(e->>'part', '\s*\(Writing.*$', '')
                        || case when e->'prompt'->>'kind' is not null then ' — ' || initcap(e->'prompt'->>'kind') else '' end,
           'taskType',  e->'prompt'->>'kind',
           'prompt',    e->'prompt'->>'instructions',
           'text',      coalesce(e->>'text', ''),
           'wordCount', nullif(regexp_replace(coalesce(e->>'wordCount',''), '\D', '', 'g'), '')::int)
         order by ord)
    into v_answers
    from jsonb_array_elements(r.answers) with ordinality as t(e, ord)
   where e->>'part' ilike '%writing%';
  if v_answers is null then return null; end if;
  v_bd := jsonb_build_object('kind', 'a2-embedded', 'from_reading', p_reading);
  if r.breakdown ? 'mock_mode' then v_bd := v_bd || jsonb_build_object('mock_mode', r.breakdown->'mock_mode'); end if;
  insert into exam_attempts (student_id, skill, level, mock, score, total, percent, duration_min, breakdown, answers, submitted_at)
  values (r.student_id, 'Writing', 'A2', r.mock, null, null, null, null, v_bd, v_answers, r.submitted_at)
  returning id into v_id;
  return v_id;
end $$;
revoke execute on function public.a2_writing_from_reading(uuid) from public, anon, authenticated;

-- Un Writing por Reading: nunca dos filas para el mismo paper.
create unique index if not exists exam_attempts_from_reading_uq
  on exam_attempts ((breakdown->>'from_reading')) where breakdown->>'from_reading' is not null;

-- Los próximos A2 en mock mode (rezagados, individuales) se desdoblan solos al guardarse.
create or replace function public.trg_a2_writing_split() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.skill = 'Reading' and new.level = 'A2' and new.breakdown ? 'mock_mode' and jsonb_typeof(new.answers) = 'array' then
    perform public.a2_writing_from_reading(new.id);
  end if;
  return new;
end $$;
drop trigger if exists a2_writing_split on exam_attempts;
create trigger a2_writing_split after insert on exam_attempts
  for each row execute function public.trg_a2_writing_split();

-- Relleno: los Reading A2 del Official Mock 2 (22-sep-2026) ya rendidos.
select count(public.a2_writing_from_reading(id))
  from exam_attempts
 where skill = 'Reading' and level = 'A2' and breakdown ? 'mock_mode' and submitted_at >= '2026-09-22T05:00Z';
