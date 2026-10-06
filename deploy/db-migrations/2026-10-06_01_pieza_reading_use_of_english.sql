-- Pieza «Reading and Use of English» (B1 · B2 · C1) en el catálogo de Cohasset Schools.
-- La tarjeta del hub Cambridge la filtra con schoolContentOK('practice.ruoe').
-- Encendida en NIS y en el colegio demo (Cohasset School, muestreo para colegios).
insert into content_items(key, label, kind, level, href, sort)
values ('practice.ruoe', 'Reading and Use of English · B1 · B2 · C1 (parts one by one)', 'practice', 'B1-C1', null, 43)
on conflict (key) do update set label = excluded.label, kind = excluded.kind, level = excluded.level, sort = excluded.sort;

insert into school_content(school_id, item_key, enabled)
select s.id, 'practice.ruoe', true from schools s where s.slug in ('nis', 'demo')
on conflict do nothing;
