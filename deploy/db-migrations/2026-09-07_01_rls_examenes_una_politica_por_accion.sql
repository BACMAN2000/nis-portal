-- 2026-09-07_01 — aplicada en produccion como migracion
-- "rls_separar_lectura_escritura_examenes" (kjrppibltkbflvxmiyib).
--
-- Quita las tres duplicidades de politicas permisivas que quedaban, todas en
-- SELECT para el rol 'authenticated', SIN cambiar quien puede que.
--
-- De donde salen: las 7 duplicidades que quedaban del 5-sep las cerro
-- 2026-09-06_01_rls_una_politica_por_accion.sql. Estas tres son NUEVAS: nacieron
-- esa misma tarde con las tablas de examenes (yle_tests, unit_exams,
-- unit_exam_scripts), que se crearon con el molde viejo — una politica FOR ALL
-- de admin conviviendo con una de SELECT que YA incluye al admin, asi que toda
-- lectura evaluaba las dos.
--
-- Patron (el mismo del 6-sep): se acota la ALL a INSERT/UPDATE/DELETE y la
-- lectura queda en una sola politica. Las expresiones NO se transcriben a mano:
-- se leen de pg_policies y se reinyectan. Todo va dentro de un DO, que es
-- atomico, asi que la tabla no queda sin politica ni un instante.
--
-- Verificado antes/despues con la foto por rol (alumno demo, profesor demo y
-- admin), en lectura y en escritura: identica.

do $$
declare
  r         record;
  v_using   text;
  v_check   text;
  v_roles   text;
  v_sel     text;
begin
  for r in
    select * from (values
      ('unit_exams',        'unit_exams_admin',        'unit_exams_lee'),
      ('unit_exam_scripts', 'unit_exam_scripts_admin', 'unit_exam_scripts_staff'),
      ('yle_tests',         'yle_tests_admin',         'yle_tests_lee')
    ) as t(tabla, pol_all, pol_sel)
  loop
    -- 1) la politica ALL que sobra en la lectura
    select qual, with_check, array_to_string(roles, ', ')
      into v_using, v_check, v_roles
      from pg_policies
     where schemaname = 'public' and tablename = r.tabla
       and policyname = r.pol_all and cmd = 'ALL';
    if v_using is null then
      raise exception 'no encuentro la politica ALL % en %', r.pol_all, r.tabla;
    end if;

    -- 2) la politica de lectura que se queda sola
    select qual into v_sel
      from pg_policies
     where schemaname = 'public' and tablename = r.tabla
       and policyname = r.pol_sel and cmd = 'SELECT';
    if v_sel is null then
      raise exception 'no encuentro la politica SELECT % en %', r.pol_sel, r.tabla;
    end if;

    -- 3) guarda: la lectura que queda TIENE que cubrir lo que leia la ALL,
    --    o esto estaria quitando permisos de lectura. Si no, aborta todo.
    if btrim(v_sel) <> 'true' and position(v_using in v_sel) = 0 then
      raise exception 'la politica % no cubre "%"; abortado sin tocar nada', r.pol_sel, v_using;
    end if;

    -- 4) misma expresion, misma lista de roles, solo que sin SELECT
    execute format('drop policy %I on public.%I', r.pol_all, r.tabla);
    execute format('create policy %I on public.%I for insert to %s with check (%s)',
                   r.pol_all || '_ins', r.tabla, v_roles, coalesce(v_check, v_using));
    execute format('create policy %I on public.%I for update to %s using (%s) with check (%s)',
                   r.pol_all || '_upd', r.tabla, v_roles, v_using, coalesce(v_check, v_using));
    execute format('create policy %I on public.%I for delete to %s using (%s)',
                   r.pol_all || '_del', r.tabla, v_roles, v_using);
  end loop;
end $$;
