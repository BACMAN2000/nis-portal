-- 21-sep-2026 · El número con el que el ALUMNO ve el mock oficial.
-- El colegio rinde el MOCK 3 del banco, pero para los alumnos es el segundo
-- mock que dan: la portada y el velo del motor tienen que decir
-- «OFFICIAL MOCK 2». El número del banco (mock) sigue mandando en el motor y en
-- exam_attempts.mock; shown_as solo cambia lo que se muestra. null = el mismo.
-- Aplicada por MCP el 21-sep-2026.
alter table public.mock_official
  add column if not exists shown_as smallint
  check (shown_as is null or (shown_as between 1 and 20));
comment on column public.mock_official.shown_as is
  'Número que ve el alumno (OFFICIAL MOCK n). null = el mismo que mock. El banco sigue siendo mock.';
update public.mock_official set shown_as = 2 where id = 1 and mock = 3;
