-- 2026-09-17 · Tiempo de pantalla real: presencia por alumno (Fase 3).
-- Aplicada en producción el 17-sep-2026 vía MCP.
--
-- Hasta hoy el «tiempo de pantalla» era la suma de duraciones que cada
-- actividad declaraba al guardar o al terminar (unit_submissions,
-- activity_attempts, exam_attempts, fun_submissions): quien navegaba, leía
-- sin entregar o abría el curso sin acabar nada no dejaba rastro. De 154
-- alumnos, 46 tenían tiempo en dos semanas. nis-presence.js manda un latido
-- cada 30 s con la pestaña visible desde la SPA y las 345 páginas; aquí se
-- guarda una fila por carga de página con los segundos activos acumulados.

create table if not exists public.student_sessions (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id) on delete cascade,
  page         text not null,                 -- 'index.html', 'unit.html', 'nis-fun/engine/index.html'…
  resource     text,                          -- ruta del SPA (#classes_g9_unit_u4), slug de la actividad, query relevante
  started_at   timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_sec   integer not null default 0 check (active_sec between 0 and 14400),   -- tope 4 h por carga
  ua           text
);
create index if not exists student_sessions_student_idx on public.student_sessions (student_id, started_at desc);
create index if not exists student_sessions_started_idx on public.student_sessions (started_at);
comment on table public.student_sessions is 'Presencia: una fila por carga de página con la pestaña visible (nis-presence.js). active_sec = segundos con la pestaña visible.';

alter table public.student_sessions enable row level security;

-- El alumno escribe SOLO sus filas (auth.uid()); las lee él, el admin y el
-- profesor que cubre su grado (mismo criterio que unit_submissions).
create policy student_sessions_ins on public.student_sessions for insert
  with check (student_id = (select auth.uid()));
create policy student_sessions_upd on public.student_sessions for update
  using (student_id = (select auth.uid())) with check (student_id = (select auth.uid()));
create policy student_sessions_sel on public.student_sessions for select
  using (
    student_id = (select auth.uid())
    or public.is_admin()
    or (public.teacher_can_results() and exists (
          select 1 from public.profiles p
          where p.id = student_sessions.student_id and public.teacher_grade_ok(p.grade_id::int)))
  );
grant select, insert, update on public.student_sessions to authenticated;
revoke all on public.student_sessions from anon;

-- v_tiempo_pantalla v2: desde que hay presencia, manda la presencia; las
-- semanas anteriores (o un alumno sin presencia esa semana) siguen saliendo
-- de las fuentes viejas, ahora también con yle_attempts. Mismas columnas
-- que antes: los paneles no cambian.
create or replace view public.v_tiempo_pantalla with (security_invoker = true) as
with presencia as (
  select s.student_id,
         (date_trunc('week', s.started_at))::date as semana,
         'pantalla'::text as tipo,
         round(sum(least(s.active_sec, 14400))::numeric / 60.0, 1) as minutos,
         count(*) as sesiones,
         count(*) filter (where s.active_sec >= 14400) as sesiones_acotadas
  from public.student_sessions s
  group by s.student_id, (date_trunc('week', s.started_at))::date
),
fuentes as (
  select student_id, submitted_at as cuando, coalesce(duration_sec,0)::numeric/60.0 as min, 'actividades'::text as tipo from public.activity_attempts
  union all select student_id, submitted_at, coalesce(duration_min,0), 'examenes' from public.exam_attempts
  union all select student_id, created_at, coalesce(duration_sec,0)::numeric/60.0, 'grabaciones' from public.fun_submissions
  union all select student_id, updated_at, coalesce(duration_sec,0)::numeric/60.0, 'unidades' from public.unit_submissions
  union all select student_id, created_at, coalesce(duration_sec,0)::numeric/60.0, 'yle' from public.yle_attempts
),
legado as (
  select f.student_id,
         (date_trunc('week', f.cuando))::date as semana,
         f.tipo,
         round(sum(least(f.min, 120)), 1) as minutos,
         count(*) as sesiones,
         count(*) filter (where f.min > 120) as sesiones_acotadas
  from fuentes f
  where f.min > 0
  group by f.student_id, (date_trunc('week', f.cuando))::date, f.tipo
),
todo as (
  select * from presencia
  union all
  select l.* from legado l
  where not exists (select 1 from presencia p where p.student_id = l.student_id and p.semana = l.semana)
)
select t.student_id, p.full_name, p.grade_id, p.section, t.semana, t.tipo, t.minutos, t.sesiones, t.sesiones_acotadas
from todo t
join public.profiles p on p.id = t.student_id
where p.role = 'student';

revoke all on public.v_tiempo_pantalla from anon;
grant select on public.v_tiempo_pantalla to authenticated;
