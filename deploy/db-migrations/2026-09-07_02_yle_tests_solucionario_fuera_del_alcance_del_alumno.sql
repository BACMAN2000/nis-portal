-- 2026-09-07_02 — aplicada en produccion como migracion
-- "yle_tests_solucionario_fuera_del_alcance_del_alumno" (kjrppibltkbflvxmiyib).
--
-- EL FALLO
-- La politica de lectura de yle_tests (yle_tests_lee) es USING (true) para
-- cualquier usuario autenticado, y la columna `data` de esa tabla es el examen
-- entero: cada item lleva su campo `key` con la respuesta correcta. Es decir,
-- cualquier alumno con sesion abierta podia pedir
--
--     select * from yle_tests
--
-- y bajarse los 30 examenes YLE de los tres niveles (Starters, Movers y Flyers)
-- con el solucionario completo, no solo el que estaba rindiendo. Basta pedir la
-- tabla sin filtro: ninguna de las dos condiciones que el front usa (nivel y
-- numero) las impone la base.
--
-- Que era un descuido y no una decision se ve en la tabla de al lado, creada la
-- misma tarde: unit_exams SI lleva candado — su lectura exige
-- unit_exam_open(access_key).
--
-- LA VIA
-- El front nunca pide la tabla entera. Pide dos cosas distintas:
--   * el indice, con select('number, theme')  -> no necesita el solucionario;
--   * el contenido, siempre con .eq('level',…).eq('number',…) -> un test.
-- Asi que se puede separar sin romper la aplicacion:
--
--   1) el INDICE se queda como esta (todo el que tiene cuenta lo ve), pero el
--      rol `authenticated` PIERDE el privilegio sobre la columna `data`. RLS no
--      filtra columnas; los GRANT si. A partir de aqui `select *` y
--      `select data` sobre yle_tests son "permission denied" para cualquier
--      cuenta del portal. La consulta que se llevaba los 30 solucionarios deja
--      de existir.
--
--   2) el CONTENIDO pasa por yle_test_data(level, number): una funcion que
--      devuelve UN test y solo si a quien pregunta le toca. El candado —
--      yle_test_open() — esta calcado de unit_exam_open(): mira primero el
--      simulacro de aula que el profesor tenga abierto (yle_sessions) y luego
--      el permiso por grado (yle_access), que es exactamente lo que el front ya
--      comprueba en nisGate(). Profesores y administradores lo reciben siempre:
--      son quienes preparan e imprimen el examen.
--
-- POR QUE EL CANDADO ABRE CUANDO NO HAY CONFIGURACION
-- yle_access esta HOY VACIA: ningun grado tiene permiso configurado, y el front
-- interpreta "sin fila" como "abierto" (por eso los alumnos ven los 10 tests de
-- cada nivel). Si esta funcion tratara "sin fila" como cerrado, los 154 alumnos
-- se quedarian sin poder rendir en el momento de aplicar la migracion. Se
-- respeta por tanto la misma regla que el front: sin fila, abierto. La palanca
-- para estrechar esto ya existe y es de decision pedagogica, no tecnica —
-- poblar yle_access desde el panel del profesor.
--
-- LO QUE ESTA MIGRACION NO ARREGLA (dicho sin adornos)
-- El alumno sigue recibiendo el JSON con las claves DEL TEST QUE ABRE, porque
-- ahi es donde se corrige en el navegador y donde el examen de Cambridge las
-- ensena a proposito (el ejemplo resuelto, el banco de palabras, el dibujo del
-- unscramble, las razones del odd one out). Mover esa correccion al servidor no
-- quitaria la respuesta de la pantalla en esos tipos y si arriesgaria la nota de
-- 154 alumnos. Lo que se cierra es lo que convertia esto en un incidente: que
-- con UNA consulta se pudieran extraer los 30 solucionarios enteros.
--
-- Todo va dentro de un solo DO, que es atomico: la tabla no queda sin politica
-- ni un instante y, si algo no cuadra, no se aplica nada.
--
-- Verificado antes y despues con la foto por rol (alumno demo, profesor demo y
-- admin) en lectura y en escritura, y probado en la aplicacion real
-- (yle-practice.html en los tres niveles con la cuenta de alumno demo).

do $mig$
declare
  v_cols text;
begin
  ---------------------------------------------------------------------------
  -- 0) guardas: no tocar nada si el terreno no es el que creemos
  ---------------------------------------------------------------------------
  if to_regclass('public.yle_tests') is null then
    raise exception 'no existe public.yle_tests; abortado sin tocar nada';
  end if;

  select string_agg(column_name, ',' order by column_name) into v_cols
    from information_schema.columns
   where table_schema = 'public' and table_name = 'yle_tests';
  if v_cols <> 'data,level,number,theme,updated_at,updated_by' then
    raise exception 'yle_tests tiene otras columnas (%); abortado sin tocar nada', v_cols;
  end if;

  if not exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                  where n.nspname = 'public' and p.proname = 'is_admin')
     or not exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                     where n.nspname = 'public' and p.proname = 'is_teacher') then
    raise exception 'faltan is_admin()/is_teacher(); abortado sin tocar nada';
  end if;

  ---------------------------------------------------------------------------
  -- 1) el candado, calcado de unit_exam_open()
  ---------------------------------------------------------------------------
  execute $fn$
    create or replace function public.yle_test_open(p_level text, p_number integer)
    returns boolean
    language plpgsql
    stable security definer
    set search_path to 'public'
    as $body$
    declare
      v_uid   uuid := auth.uid();
      v_grade smallint;
      v_ses   record;
      v_acc   record;
    begin
      if v_uid is null then return false; end if;

      -- quien prepara e imprime el examen lo ve entero, siempre
      if public.is_admin() or public.is_teacher() then return true; end if;

      select grade_id into v_grade from profiles where id = v_uid;
      if v_grade is null then return true; end if;   -- alumno sin grado: como hoy

      -- simulacro de aula abierto por el profesor: manda, y solo ese test
      select test into v_ses
        from yle_sessions
       where grade_id = v_grade and level = p_level and status = 'open'
       order by started_at desc
       limit 1;
      if found then return v_ses.test = p_number; end if;

      -- permiso por grado. Sin fila = abierto, igual que hace el front hoy:
      -- yle_access esta vacia y cerrar aqui dejaria a todos sin poder rendir.
      select unlocked, max_test into v_acc
        from yle_access
       where grade_id = v_grade and level = p_level;
      if not found then return true; end if;

      return coalesce(v_acc.unlocked, false)
         and p_number <= coalesce(v_acc.max_test, 32767);
    end;
    $body$;
  $fn$;

  ---------------------------------------------------------------------------
  -- 2) el contenido: UN test, y solo si le toca
  ---------------------------------------------------------------------------
  execute $fn$
    create or replace function public.yle_test_data(p_level text, p_number integer)
    returns jsonb
    language plpgsql
    stable security definer
    set search_path to 'public'
    as $body$
    declare
      v_data jsonb;
    begin
      if auth.uid() is null then
        raise exception 'sign in through the portal to open this test.';
      end if;
      if not public.yle_test_open(p_level, p_number) then
        raise exception 'this test is not open for you yet.';
      end if;
      select data into v_data
        from yle_tests
       where level = p_level and number = p_number::smallint;
      return v_data;   -- null si ese test no esta publicado; el front ya lo trata
    end;
    $body$;
  $fn$;

  ---------------------------------------------------------------------------
  -- 3) los privilegios: el indice si, el solucionario no
  ---------------------------------------------------------------------------
  -- anon nunca tuvo politica en esta tabla (RLS ya lo cerraba), pero tenia los
  -- privilegios puestos. Se le quitan: defensa en profundidad, foto sin cambios.
  execute 'revoke all on table public.yle_tests from anon';

  -- authenticated: se rehace el SELECT columna a columna, sin `data`.
  -- INSERT/UPDATE/DELETE se dejan como estaban — quien escribe lo decide RLS
  -- (yle_tests_admin_ins/_upd/_del, todas is_admin()).
  execute 'revoke select on table public.yle_tests from authenticated';
  execute 'grant select (level, number, theme, updated_at, updated_by) on table public.yle_tests to authenticated';

  execute 'revoke all on function public.yle_test_open(text, integer) from public, anon';
  execute 'revoke all on function public.yle_test_data(text, integer) from public, anon';
  execute 'grant execute on function public.yle_test_open(text, integer) to authenticated';
  execute 'grant execute on function public.yle_test_data(text, integer) to authenticated';

  ---------------------------------------------------------------------------
  -- 4) dejarlo escrito en la propia base, para el que venga detras
  ---------------------------------------------------------------------------
  execute $c$
    comment on column public.yle_tests.data is
      'El examen entero, con la respuesta correcta (campo key) de cada item. NO se sirve por la tabla: el rol authenticated no tiene privilegio sobre esta columna. Se pide con yle_test_data(level, number), que entrega UN test y solo si yle_test_open() lo permite. Si anades una politica o un grant que vuelva a exponer esta columna, estas publicando el solucionario de los 30 examenes.'
  $c$;

  execute $c$
    comment on function public.yle_test_open(text, integer) is
      'Candado de lectura de un test YLE, calcado de unit_exam_open(): simulacro de aula abierto (yle_sessions) o permiso por grado (yle_access). Sin fila en yle_access = abierto, igual que el front, para no dejar a ningun alumno sin poder rendir.'
  $c$;

  ---------------------------------------------------------------------------
  -- 5) comprobacion final dentro de la misma transaccion
  ---------------------------------------------------------------------------
  if exists (select 1 from information_schema.column_privileges
              where table_schema = 'public' and table_name = 'yle_tests'
                and grantee = 'authenticated' and privilege_type = 'SELECT'
                and column_name = 'data') then
    raise exception 'authenticated sigue viendo yle_tests.data; abortado';
  end if;
  if not exists (select 1 from information_schema.column_privileges
                  where table_schema = 'public' and table_name = 'yle_tests'
                    and grantee = 'authenticated' and privilege_type = 'SELECT'
                    and column_name = 'theme') then
    raise exception 'authenticated ha perdido el indice de yle_tests; abortado';
  end if;
end $mig$;
