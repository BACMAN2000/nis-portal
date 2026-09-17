-- 2026-09-17 · duration_sec era smallint (tope 32.767 s ≈ 9 h) en unit_submissions
-- y fun_submissions: activity-save.js lo acotaba a 32.000 porque pasarse tumbaba
-- la fila entera. Pasa a integer. Las tres vistas que lo leen (v_tiempo_pantalla,
-- v_fun_metricas, v_fun_unidades) se recrean tal cual — Postgres no deja cambiar
-- el tipo de una columna usada por una vista — con security_invoker y sin anon.
-- Aplicada en producción el 17-sep-2026 vía MCP (apply_migration duration_sec_integer).
-- El SQL completo de las vistas es el de 2026-09-17_02 (v_tiempo_pantalla) y el de
-- 2026-09-05_01 (v_fun_*); aquí solo el cambio de tipo:

-- drop view v_tiempo_pantalla, v_fun_metricas, v_fun_unidades;
alter table public.unit_submissions alter column duration_sec type integer;
alter table public.fun_submissions  alter column duration_sec type integer;
-- create view … (idénticas) ; revoke all … from anon; grant select … to authenticated;
