-- 2026-10-15 · Colegio «sample»: la muestra de Cohasset School para enseñar a colegios.
--
-- Un colegio más (sample.cohasset.pe) con dos cosas que los demás no usan:
--   1. settings.strict_content = true → pieza sin fila en school_content = APAGADA
--      (en los demás colegios schoolContentOK sigue siendo fail-open).
--   2. school_content.scope (jsonb) → recorta DENTRO de la pieza:
--        practice.* / mock.* : {"tests":["practice"]} / {"tests":["mock01"]}
--                              (lo lee mocks-cambridge/nis-bridge.js)
--        tool.*              : {"levels":["A2","B1"],"blocks":1}
--                              (lo leen lexapp.js y wordform.js por parent.NIS_SCHOOL)
--      Sin scope = la pieza entera, como hasta hoy.
-- Las cuentas sample se crean con school_create_account(<id de sample>, …) desde
-- la consola ☁️ (ver deploy/SAMPLE-COHASSET-SCHOOL.md). No toca nis, demo ni cic.

alter table public.school_content add column if not exists scope jsonb;

create or replace function public.school_public(p_host text)
 returns jsonb
 language sql
 stable security definer
 set search_path to 'public'
as $function$
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
           'strict',   coalesce((s.settings->>'strict_content')::boolean, false),
           'terms',    coalesce(s.settings->'terms',    '{}'::jsonb),
           'grades',   coalesce(s.settings->'grades',   '[]'::jsonb),
           'sections', coalesce(s.settings->'sections', '[]'::jsonb),
           'apps', coalesce((select jsonb_object_agg(sa.app_key, sa.enabled)
                               from public.school_apps sa where sa.school_id = s.id), '{}'::jsonb),
           'content', coalesce((select jsonb_object_agg(sc.item_key, sc.enabled)
                                  from public.school_content sc where sc.school_id = s.id), '{}'::jsonb),
           'scope', coalesce((select jsonb_object_agg(sc.item_key, sc.scope)
                                from public.school_content sc
                               where sc.school_id = s.id and sc.enabled and sc.scope is not null), '{}'::jsonb))
    from s;
$function$;

-- El colegio (idempotente por slug).
insert into public.schools (slug, name, short_name, domain, logo_url, logo_dark_url, accent,
                            is_demo, status, plan, settings, notes)
values ('sample', 'Cohasset School · Sample', 'Cohasset', 'sample.cohasset.pe',
        'assets/cohasset-school.svg?v=6', 'assets/cohasset-school-white.svg?v=6', '#2563EB',
        true, 'trial', 'demo',
        '{"terms":{},"grades":[1,2,3,4,5,6,7,8,9,10,11],"sections":["A","B"],"strict_content":true}'::jsonb,
        'Muestra para enseñar a colegios: Practice 1 + MOCK 1 por nivel, un bloque de cada herramienta de léxico, IELTS Writing.')
on conflict (slug) do update set settings = excluded.settings, notes = excluded.notes;

do $$
declare sid uuid := (select id from public.schools where slug = 'sample');
begin
  -- Módulos: solo los que llevan la muestra.
  delete from public.school_apps where school_id = sid;
  insert into public.school_apps (school_id, app_key, enabled)
  select sid, a.key, a.key in ('mocks', 'tools', 'progress') from public.apps a;

  -- Piezas: todas con fila (strict), encendidas solo las de la muestra.
  delete from public.school_content where school_id = sid;
  insert into public.school_content (school_id, item_key, enabled, scope)
  select sid, ci.key,
         ci.key in ('practice.reading', 'practice.listening', 'practice.writing',
                    'mock.reading', 'mock.listening', 'mock.writing',
                    'tool.phrasal', 'tool.collocations', 'tool.idioms', 'tool.wordform',
                    'ielts.writing'),
         case when ci.key like 'practice.%' then '{"tests":["practice"]}'::jsonb
              when ci.key like 'mock.%'     then '{"tests":["mock01"]}'::jsonb
              when ci.key in ('tool.phrasal', 'tool.collocations', 'tool.idioms', 'tool.wordform')
                                            then '{"levels":["A2","B1"],"blocks":1}'::jsonb
         end
    from public.content_items ci;

  -- Mocks y practice abiertos para todos los grados de la muestra.
  insert into public.mock_access (school_id, grade_id, unlocked)
  select sid, g, true from generate_series(1, 11) g
  on conflict (school_id, grade_id) do update set unlocked = true;
  insert into public.practice_access (school_id, grade_id, unlocked)
  select sid, g, true from generate_series(1, 11) g
  on conflict (school_id, grade_id) do update set unlocked = true;
end $$;
