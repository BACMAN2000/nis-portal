-- 2026-09-23_02_speaking_tests_test_no.sql   (aplicada por MCP el 23-sep-2026)
-- La restricción test_no between 1 and 4 se escribió cuando el Speaking test
-- solo tenía los cuatro guiones de PET. speaking-test-data.js numera ahora los
-- guiones de A2/B1/B2/C1 del 1 al 14 (n único por guion) y seguirá creciendo:
-- «Save results» fallaba con «violates check constraint speaking_tests_test_no_check»
-- en cuanto se elegía un guion que no fuera PET 1-4 (p. ej. A2 Key · Test 1 = 13).
alter table public.speaking_tests drop constraint if exists speaking_tests_test_no_check;
alter table public.speaking_tests add constraint speaking_tests_test_no_check check (test_no >= 1);
