-- Pieza «Newspaper» (periódico diario por niveles A2 · B1 · B2 · C1) en el catálogo de Cohasset Schools.
-- La tarjeta del alumno y la pestaña del profesor la filtran con schoolContentOK('news.daily').
-- NIS la ve como The Nordic Times; cada colegio con su nombre. Encendida en todos los colegios.
insert into content_items(key, label, kind, level, href, sort)
values ('news.daily', 'Newspaper · daily news at A2 · B1 · B2 · C1 with Cambridge-style questions', 'reader', 'A2-C1', 'newspaper/', 90)
on conflict (key) do update set label = excluded.label, kind = excluded.kind, level = excluded.level, href = excluded.href, sort = excluded.sort;

insert into school_content(school_id, item_key, enabled)
select s.id, 'news.daily', true from schools s
on conflict do nothing;
