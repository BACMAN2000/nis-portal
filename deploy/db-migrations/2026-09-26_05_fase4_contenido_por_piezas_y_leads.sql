-- 2026-09-26_05_fase4_contenido_por_piezas_y_leads.sql
-- FASES 4 Y 5 DEL MULTI-COLEGIO (26-sep-2026).
--
-- FASE 4 · repositorio de contenido por piezas. Hasta hoy el superadmin
-- encendía módulos enteros (apps). Paolo quiere elegir PIEZAS: qué practice
-- tests, qué mocks, qué niveles de Fun, qué cursos de secundaria, qué readers,
-- qué herramientas y qué preparación IELTS de cohasset.pe recibe cada colegio.
--
--   content_items    Catálogo fijo de piezas del portal (clave, etiqueta,
--                    familia, nivel, orden, enlace externo si lo hay).
--   school_content   Qué pieza está encendida en qué colegio. SIN fila =
--                    apagada. school_public() la devuelve como `content`.
--   El front filtra con schoolContentOK(clave) ADEMÁS de los candados por
--   grado/alumno que ya tenía (nodeVisible): el colegio decide qué existe,
--   el admin del colegio decide quién lo ve.
--
-- FASE 5 · leads de colegios. cohasset.pe/colegios tiene un formulario que
-- inserta en `school_leads` con la clave anon (solo INSERT, campos acotados,
-- trampa anti-bots en el front). El superadmin los ve en la consola y los
-- convierte en colegio + contacto + bitácora.

-- ---------------------------------------------------------------- catálogo
create table if not exists public.content_items (
  key      text primary key,
  label    text not null,
  kind     text not null,     -- yle | main | sec | practice | mock | reader | tool | ielts
  level    text,
  href     text,              -- solo piezas externas (cohasset.pe)
  sort     integer not null default 100
);

insert into public.content_items (key, label, kind, level, href, sort) values
 ('yle.starters',      'Starters course (Fun 1)',              'yle', 'Pre-A1', null, 10),
 ('yle.starterstests', 'Starters practice tests',              'yle', 'Pre-A1', null, 11),
 ('yle.movers',        'Movers course (Fun 2)',                'yle', 'A1',     null, 12),
 ('yle.moverstests',   'Movers practice tests',                'yle', 'A1',     null, 13),
 ('yle.flyers',        'Flyers course (Fun 3)',                'yle', 'A2',     null, 14),
 ('yle.flyerstests',   'Flyers practice tests',                'yle', 'A2',     null, 15),
 ('yle.words',         'YLE Word Trainer',                     'yle', 'all',    null, 16),
 ('sec.a1',            'A1 Foundations',                       'sec', 'A1',     null, 20),
 ('sec.ket',           'A2 Key course',                        'sec', 'A2',     null, 21),
 ('sec.pet',           'B1 Preliminary course',                'sec', 'B1',     null, 22),
 ('sec.b2f',           'B2 First course',                      'sec', 'B2',     null, 23),
 ('sec.c1a',           'C1 Advanced course',                   'sec', 'C1',     null, 24),
 ('main.ket',          'A2 Key (exam guide)',                  'main', 'A2',    null, 30),
 ('main.pet',          'B1 Preliminary (exam guide)',          'main', 'B1',    null, 31),
 ('main.fce',          'B2 First (exam guide)',                'main', 'B2',    null, 32),
 ('main.cae',          'C1 Advanced (exam guide)',             'main', 'C1',    null, 33),
 ('main.cpe',          'C2 Proficiency (exam guide)',          'main', 'C2',    null, 34),
 ('main.listening',    'B2 First · Listening (55 recordings)', 'main', 'B2',    null, 35),
 ('main.uoe',          'B2 First · Use of English',            'main', 'B2',    null, 36),
 ('main.writing',      'B2 First · Writing',                   'main', 'B2',    null, 37),
 ('main.bonus',        'FCE Bonus exercises',                  'main', 'B2',    null, 38),
 ('practice.reading',  'Practice tests · Reading & Use of English', 'practice', 'A2-C1', null, 40),
 ('practice.listening','Practice tests · Listening',           'practice', 'A2-C1', null, 41),
 ('practice.writing',  'Practice tests · Writing',             'practice', 'B1-C1', null, 42),
 ('mock.reading',      'Official mocks · Reading & Use of English', 'mock', 'A2-C1', null, 50),
 ('mock.listening',    'Official mocks · Listening',           'mock', 'A2-C1', null, 51),
 ('mock.writing',      'Official mocks · Writing',             'mock', 'B1-C1', null, 52),
 ('tool.coach',        'Pronunciation coach',                  'tool', null, null, 60),
 ('tool.phonics',      'Phonics',                              'tool', null, null, 61),
 ('tool.games',        'Games Lab',                            'tool', null, null, 62),
 ('tool.phrasal',      'Phrasal verbs',                        'tool', null, null, 63),
 ('tool.collocations', 'Collocations',                         'tool', null, null, 64),
 ('tool.idioms',       'Idioms',                               'tool', null, null, 65),
 ('tool.wordform',     'Word formation',                       'tool', null, null, 66),
 ('tool.dict',         'Dictionary',                           'tool', null, null, 67),
 ('tool.nishoot',      'Live quiz',                            'tool', null, null, 68),
 ('ielts.foundation',  'IELTS Foundations · Writing & Grammar (cohasset.pe)', 'ielts', 'B1-C1', 'https://cohasset.pe/ielts/foundation.html', 70),
 ('ielts.writing',     'IELTS Writing Studio (cohasset.pe)',   'ielts', 'B2-C1', 'https://cohasset.pe/ielts/writing.html', 71),
 ('ielts.cbt',         'IELTS on computer · simulator (cohasset.pe)', 'ielts', 'B1-C1', 'https://cohasset.pe/ielts-cbt/ielts-on-computer.html', 72)
on conflict (key) do nothing;

-- ---------------------------------------------------------------- por colegio
create table if not exists public.school_content (
  school_id  uuid not null references public.schools(id) on delete cascade,
  item_key   text not null references public.content_items(key) on delete cascade,
  enabled    boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (school_id, item_key)
);

-- NIS y el demo: todo encendido (lo que había). Los colegios nuevos copian del modelo.
insert into public.school_content (school_id, item_key)
select s.id, c.key from public.schools s cross join public.content_items c
 where s.slug in ('nis', 'demo')
on conflict do nothing;

alter table public.content_items  enable row level security;
alter table public.school_content enable row level security;
drop policy if exists content_items_sel on public.content_items;
create policy content_items_sel on public.content_items for select to authenticated using ( true );
drop policy if exists content_items_write on public.content_items;
create policy content_items_write on public.content_items for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );
drop policy if exists school_content_sel on public.school_content;
create policy school_content_sel on public.school_content for select to authenticated
  using ( school_id = (select public.my_school_id()) or public.is_superadmin() );
drop policy if exists school_content_write on public.school_content;
create policy school_content_write on public.school_content for all to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );
revoke all on public.content_items  from anon;
revoke all on public.school_content from anon;

-- school_public: también las piezas encendidas.
create or replace function public.school_public(p_host text) returns jsonb
language sql stable security definer set search_path = public as $$
  with s as (
    select * from public.schools
     where active and domain = lower(p_host)
    union all
    select * from public.schools
     where active and slug = lower(split_part(p_host, '.', 1))
    limit 1
  )
  select jsonb_build_object(
           'id', s.id, 'slug', s.slug, 'name', s.name, 'short_name', s.short_name,
           'domain', s.domain, 'logo_url', s.logo_url, 'logo_dark_url', s.logo_dark_url,
           'accent', s.accent, 'is_demo', s.is_demo,
           'terms',    coalesce(s.settings->'terms',    '{}'::jsonb),
           'grades',   coalesce(s.settings->'grades',   '[]'::jsonb),
           'sections', coalesce(s.settings->'sections', '[]'::jsonb),
           'apps', coalesce((select jsonb_object_agg(sa.app_key, sa.enabled)
                               from public.school_apps sa where sa.school_id = s.id), '{}'::jsonb),
           'content', coalesce((select jsonb_object_agg(sc.item_key, sc.enabled)
                                  from public.school_content sc where sc.school_id = s.id), '{}'::jsonb))
    from s;
$$;

-- La copia de configuración también copia las piezas.
create or replace function public.school_copy_config(p_from uuid, p_to uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_superadmin() and auth.uid() is not null then
    raise exception 'Only the platform superadmin can copy a school configuration';
  end if;
  insert into public.fun_access (school_id, grade_id, lang, level, desde, hasta, unlocked)
    select p_to, grade_id, lang, level, desde, hasta, unlocked from public.fun_access where school_id = p_from on conflict do nothing;
  insert into public.mock_access (school_id, grade_id, unlocked)
    select p_to, grade_id, unlocked from public.mock_access where school_id = p_from on conflict do nothing;
  insert into public.practice_access (school_id, grade_id, unlocked)
    select p_to, grade_id, unlocked from public.practice_access where school_id = p_from on conflict do nothing;
  insert into public.node_access (school_id, grade_id, node_key, unlocked)
    select p_to, grade_id, node_key, unlocked from public.node_access where school_id = p_from on conflict do nothing;
  insert into public.yle_access (school_id, grade_id, level, unlocked, max_test)
    select p_to, grade_id, level, unlocked, max_test from public.yle_access where school_id = p_from on conflict do nothing;
  insert into public.yle_settings (school_id, key, value)
    select p_to, key, value from public.yle_settings where school_id = p_from on conflict do nothing;
  insert into public.mock_cycles (school_id, cycle, label, exam_date, notes)
    select p_to, cycle, label, exam_date, notes from public.mock_cycles where school_id = p_from on conflict do nothing;
  insert into public.mock_official (school_id, id, mock, shown_as)
    select p_to, id, mock, shown_as from public.mock_official where school_id = p_from on conflict do nothing;
  insert into public.school_content (school_id, item_key, enabled)
    select p_to, item_key, enabled from public.school_content where school_id = p_from on conflict do nothing;
end $$;

-- ---------------------------------------------------------------- leads (fase 5)
create table if not exists public.school_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  school_name  text not null check (length(school_name) between 2 and 120),
  contact_name text not null check (length(contact_name) between 2 and 120),
  position     text check (position is null or length(position) <= 120),
  email        text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 160),
  phone        text check (phone is null or length(phone) <= 40),
  students     text check (students is null or length(students) <= 40),
  message      text check (message is null or length(message) <= 2000),
  source       text not null default 'cohasset.pe/colegios',
  status       text not null default 'new' check (status in ('new','contacted','converted','discarded')),
  notes        text,
  school_id    uuid references public.schools(id) on delete set null
);
create index if not exists school_leads_status_idx on public.school_leads (status, created_at desc);

alter table public.school_leads enable row level security;
-- Cualquiera puede DEJAR un lead (la web pública); nadie sin ser superadmin lo lee.
drop policy if exists school_leads_ins_anon on public.school_leads;
create policy school_leads_ins_anon on public.school_leads for insert to anon, authenticated
  with check ( status = 'new' and school_id is null and notes is null );
drop policy if exists school_leads_sel on public.school_leads;
create policy school_leads_sel on public.school_leads for select to authenticated using ( public.is_superadmin() );
drop policy if exists school_leads_upd on public.school_leads;
create policy school_leads_upd on public.school_leads for update to authenticated
  using ( public.is_superadmin() ) with check ( public.is_superadmin() );
drop policy if exists school_leads_del on public.school_leads;
create policy school_leads_del on public.school_leads for delete to authenticated using ( public.is_superadmin() );
revoke all on public.school_leads from anon;
grant insert (school_name, contact_name, position, email, phone, students, message, source) on public.school_leads to anon;
