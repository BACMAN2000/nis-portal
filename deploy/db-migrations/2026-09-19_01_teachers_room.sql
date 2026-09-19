-- 2026-09-19_01_teachers_room.sql
-- AULA DE PROFESORES (19-sep-2026). Dos "grados" mas en `grades` para que los
-- profesores rindan los mocks como un grupo propio, sin mezclarse con los
-- alumnos ni tocar sus cuentas de profesor:
--   12  Teachers · Primary
--   13  Teachers · Secondary
-- El admin crea cuentas (role student) en esos grados desde el Aula de
-- profesores del panel; el candado de mocks (mock_access), el mock mode, el
-- mock individual, los resultados por grado y el «View as» funcionan igual que
-- con cualquier grado. El front los distingue por id (GRADES[].staff) y les
-- pinta una portada propia sin unidades ni lecturas.
insert into public.grades (id, name, ord) values
  (12, 'Teachers · Primary', 12),
  (13, 'Teachers · Secondary', 13)
on conflict (id) do nothing;
