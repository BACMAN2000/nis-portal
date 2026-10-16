-- Aplicado en PROD (proyecto Supabase kjrppibltkbflvxmiyib) el 2026-09-26.
-- 🟠 Media · Un alumno no podía reintentar ni actualizar su entrega de Fun for Nordic.
--
-- protege_calificacion() está pensada para unit_submissions (asigna new.criteria,
-- new.released_at, new.released_by y new.shared), pero estaba instalada también como
-- trigger BEFORE UPDATE en fun_submissions, que no tiene esas columnas. Cuando quien
-- actualiza NO es docente (ni admin/teacher en profiles ni teacher_access.can_results),
-- el trigger entra en la rama que copia old→new y revienta con
--   ERROR 42703: record "new" has no field "criteria"
-- Reproducido con rol simulado (set local role authenticated + request.jwt.claim.sub de
-- un alumno) sobre un UPDATE de payload en su propia fila. Con docente no fallaba porque
-- la rama nunca se ejecuta, por eso pasó inadvertido.
--
-- Solución: función hermana que protege solo las columnas de calificación que SÍ existen
-- en fun_submissions (score, feedback, reviewed_by, reviewed_at) con la misma regla de
-- docente, y el trigger de fun_submissions pasa a ella. unit_submissions no se toca.

create or replace function public.protege_calificacion_fun()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare docente boolean;
begin
  select exists (select 1 from teacher_access t
                 where t.profile_id = auth.uid() and t.can_results)
      or exists (select 1 from profiles p
                 where p.id = auth.uid() and p.role in ('admin','teacher'))
    into docente;

  if not docente then
    new.score       := old.score;
    new.feedback    := old.feedback;
    new.reviewed_at := old.reviewed_at;
    new.reviewed_by := old.reviewed_by;
  end if;
  return new;
end $$;

-- Función de trigger: no debe ser alcanzable como RPC (mismo criterio que la del 29-ago).
revoke execute on function public.protege_calificacion_fun() from public, anon, authenticated;

drop trigger if exists tr_protege_calificacion_fun on public.fun_submissions;
create trigger tr_protege_calificacion_fun
  before update on public.fun_submissions
  for each row execute function public.protege_calificacion_fun();

-- Verificación (rol simulado, transacción revertida):
--   alumno: UPDATE payload en su fila → OK; UPDATE score=99 → score sigue NULL.
--   protege_calificacion() queda solo en unit_submissions (tr_protege_calificacion).
