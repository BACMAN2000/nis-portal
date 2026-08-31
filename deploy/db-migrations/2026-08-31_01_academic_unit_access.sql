-- Candados de unidades académicas por grado.
-- Los alumnos pueden leer el estado; admin y docentes de ese grado lo cambian.

drop policy if exists node_access_teacher_insert_units on public.node_access;
create policy node_access_teacher_insert_units
on public.node_access for insert
to authenticated
with check (
  public.is_teacher()
  and public.teacher_grade_ok(grade_id)
  and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'
);

drop policy if exists node_access_teacher_update_units on public.node_access;
create policy node_access_teacher_update_units
on public.node_access for update
to authenticated
using (
  public.is_teacher()
  and public.teacher_grade_ok(grade_id)
  and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'
)
with check (
  public.is_teacher()
  and public.teacher_grade_ok(grade_id)
  and node_key ~ '^english\.classes\.g(?:[2-9]|10|11)\.units\.u[1-9][0-9]*$'
);

-- Estado inicial: se conserva cualquier decisión que ya existiera.
insert into public.node_access (grade_id,node_key,unlocked,updated_at,updated_by)
values
  (2,'english.classes.g2.units.u4',true,now(),null),
  (3,'english.classes.g3.units.u4',true,now(),null),
  (4,'english.classes.g4.units.u4',true,now(),null),
  (5,'english.classes.g5.units.u4',true,now(),null),
  (6,'english.classes.g6.units.u4',true,now(),null),
  (6,'english.classes.g6.units.u5',true,now(),null),
  (7,'english.classes.g7.units.u4',true,now(),null),
  (7,'english.classes.g7.units.u5',true,now(),null),
  (8,'english.classes.g8.units.u4',true,now(),null),
  (9,'english.classes.g9.units.u1',true,now(),null),
  (9,'english.classes.g9.units.u2',true,now(),null),
  (9,'english.classes.g9.units.u3',true,now(),null),
  (9,'english.classes.g9.units.u4',true,now(),null),
  (9,'english.classes.g9.units.u5',false,now(),null),
  (9,'english.classes.g9.units.u6',false,now(),null),
  (10,'english.classes.g10.units.u4',true,now(),null),
  (11,'english.classes.g11.units.u4',true,now(),null)
on conflict (grade_id,node_key) do nothing;
