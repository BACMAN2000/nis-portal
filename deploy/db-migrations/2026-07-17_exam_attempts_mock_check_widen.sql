-- ============================================================================
-- Amplía el CHECK de exam_attempts.mock: antes solo mock1|mock2|practice.
-- Necesario para registrar los nuevos MOCK 3-7 con su etiqueta real (el
-- nis-bridge.js viejo aplastaba mock03+ a 'mock2' por este constraint).
-- Los practices (1-18) siguen agrupados bajo 'practice'.
-- ============================================================================
alter table public.exam_attempts drop constraint if exists exam_attempts_mock_check;
alter table public.exam_attempts add constraint exam_attempts_mock_check
  check (mock = any (array['mock1','mock2','mock3','mock4','mock5','mock6','mock7','practice']));
