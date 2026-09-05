-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-09-05.
-- 🟡 Rendimiento. NO cambia quien ve que: solo como se evalua.
--
-- Sale de la auditoria del 5-sep. El linter marcaba 126 avisos; esta migracion
-- ataca los dos que no tocan la semantica:
--
--   39 x auth_rls_initplan      politicas que llaman auth.uid() SIN envolver
--    8 x unindexed_foreign_keys claves foraneas sin indice que las cubra
--
-- Los 75 avisos de multiple_permissive_policies NO se tocan aqui: consolidar
-- dos politicas en una si puede cambiar quien ve que, y eso va con pruebas por
-- rol y en su propia migracion.

-- 1. auth.uid() -> (select auth.uid())
--
-- Sin envolver, Postgres evalua auth.uid() UNA VEZ POR FILA; envuelto en un
-- subselect lo evalua una sola vez por consulta y reusa el resultado (InitPlan).
-- En unit_submissions o yle_attempts, que crecen con cada entrega, es la
-- diferencia entre una lectura barata y una que se degrada sola.
--
-- Se hace con un bucle y ALTER POLICY en vez de escribir 39 sentencias a mano:
--   - ALTER POLICY conserva nombre, roles y comando; solo cambia la expresion,
--     asi que no hay ventana en la que la tabla quede sin politica.
--   - las expresiones se leen de la propia base, no se transcriben: no hay
--     riesgo de copiar mal un USING de doce lineas.
--   - es idempotente: al reaplicarlo, las ya envueltas no entran en el filtro.
do $$
declare
  r   record;
  ddl text;
  n   int := 0;
begin
  for r in
    select c.relname  as tabla,
           p.polname  as politica,
           pg_get_expr(p.polqual,      p.polrelid) as usando,
           pg_get_expr(p.polwithcheck, p.polrelid) as chequeo
    from pg_policy p
    join pg_class     c on c.oid = p.polrelid
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and ( (pg_get_expr(p.polqual, p.polrelid) like '%auth.uid()%'
             and pg_get_expr(p.polqual, p.polrelid) not like '%SELECT auth.uid()%')
         or (pg_get_expr(p.polwithcheck, p.polrelid) like '%auth.uid()%'
             and pg_get_expr(p.polwithcheck, p.polrelid) not like '%SELECT auth.uid()%') )
    order by c.relname, p.polname
  loop
    ddl := format('alter policy %I on public.%I', r.politica, r.tabla);
    if r.usando is not null then
      ddl := ddl || format(' using (%s)',
               replace(r.usando, 'auth.uid()', '(select auth.uid())'));
    end if;
    if r.chequeo is not null then
      ddl := ddl || format(' with check (%s)',
               replace(r.chequeo, 'auth.uid()', '(select auth.uid())'));
    end if;
    execute ddl;
    n := n + 1;
  end loop;
  raise notice 'politicas reescritas: %', n;
end $$;

-- 2. Indices en las claves foraneas que no los tenian
--
-- Sin indice, cada borrado o actualizacion de la tabla referenciada obliga a
-- recorrer la tabla hija entera para comprobar la integridad; y los JOIN por
-- esa columna (que son los del panel del profesor) van a secuencial.
create index if not exists idx_activity_attempts_student  on public.activity_attempts (student_id);
create index if not exists idx_anticheat_grants_granted_by on public.anticheat_grants  (granted_by);
create index if not exists idx_fun_submissions_reviewed_by on public.fun_submissions   (reviewed_by);
create index if not exists idx_practice_access_updated_by  on public.practice_access   (updated_by);
create index if not exists idx_profiles_grade              on public.profiles          (grade_id);
create index if not exists idx_study_plans_grade           on public.study_plans       (grade_id);
create index if not exists idx_study_plans_student         on public.study_plans       (student_id);
create index if not exists idx_yle_attempts_reviewed_by    on public.yle_attempts      (reviewed_by);

-- Verificado al aplicar. Misma foto ANTES y DESPUES, simulando cada rol con
-- `set local role authenticated` + los claims del JWT en una transaccion con
-- rollback (reproduce lo que ve PostgREST sin tocar datos). Las tres filas
-- salieron IDENTICAS, que es lo que prueba que no cambio quien ve que:
--
--   quien           profiles  unit_sub  fun_sub  activity  exam  yle  works  plans  access  speaking
--   alumno demo            1         0        0         2     3    0     96      0       1         0
--   profesor demo        162        83        6       417  1016    0     96      0      57       146
--   admin                162        83        6       417  1016    0     96      0      57       146
--
-- Y en el linter:
--   auth_rls_initplan        39 -> 0
--   unindexed_foreign_keys    8 -> 0
--   politicas totales        79 -> 79   (ninguna se perdio por el camino)
--   avisos de rendimiento   126 -> 87
--
-- `unused_index` sube de 4 a 12: son los 8 indices nuevos, que se marcan asi
-- hasta que las consultas empiecen a usarlos. No es un pendiente.
--
-- Queda para su propia migracion: los 75 `multiple_permissive_policies`.
-- Consolidar dos politicas permisivas en una CAMBIA quien ve que si se hace
-- mal, asi que va tabla por tabla y con esta misma foto por rol delante.
