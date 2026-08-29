# Migraciones de base de datos (Supabase — Portal NIS)

Proyecto Supabase de producción: `kjrppibltkbflvxmiyib` (nis.cohasset.pe).

Estos `.sql` son el registro versionado de cambios **ya aplicados en producción**
vía el panel/API de Supabase. Se guardan aquí para trazabilidad y para poder
reaplicarlos en un entorno nuevo. Aplicar en orden por nombre de archivo.

| Fecha | Archivo | Severidad | Qué corrige |
|-------|---------|-----------|-------------|
| 2026-07-13 | `2026-07-13_01_harden_handle_new_user_role.sql` | 🔴 Crítica | Registro público como admin: el trigger de alta ya no confía en el `role` del metadata del signup. |
| 2026-07-13 | `2026-07-13_02_harden_quiz_results_rls.sql` | 🟠 Media | `quiz_results` tenía lectura e inserción abiertas a `anon` (`USING/CHECK true`). |
| 2026-07-13 | `2026-07-13_03_revoke_anon_execute_sensitive_rpcs.sql` | 🟡 Defensa en profundidad | Revoca `EXECUTE` a `anon` en las RPC de acción sensibles. |
| 2026-08-29 | `2026-08-29_01_quitar_visible_password_de_admin_set_password.sql` | 🔴 Crítica | `admin_set_password` seguía guardando la contraseña **en texto plano** en `raw_user_meta_data` (y de ahí al JWT) en cada reseteo. La limpieza del front del 28-ago se deshacía sola. |
| 2026-08-29 | `2026-08-29_02_cerrar_vistas_a_anon_y_quitar_security_definer.sql` | 🔴 Crítica | `v_entregas_ficha` era SECURITY DEFINER **y** legible por `anon`: nombre, grado, nota y comentario de alumnos reales **sin iniciar sesión**. |
| 2026-08-29 | `2026-08-29_03_limpieza_seguridad_pendientes.sql` | 🟡 Defensa en profundidad | Borra `student_credentials`, revoca `EXECUTE` en las funciones de trigger, fija `search_path` y saca `unaccent` de `public`. |
| 2026-08-29 | `2026-08-29_04_arreglar_handle_new_user_columna_cefr_level.sql` | 🔴 Crítica | **El alta de usuarios estaba rota desde el 13-jul**: el trigger insertaba en una columna `level` inexistente. Ninguna cuenta creada en 60 días. |

## Pendientes (configuración de Supabase Auth — no es SQL)

- Activar **Leaked Password Protection** (Auth → Policies). **Sigue pendiente**: es
  un ajuste del panel, no SQL, y solo lo puede hacer el dueño de la cuenta.
- Considerar **desactivar el registro público** si el alta debe ser solo por admin.
- ~~Mover la extensión `unaccent` fuera de `public`~~ — hecho el 2026-08-29.
- ~~Contraseñas en texto plano en `student_credentials` / `visible_password`~~ —
  cerrado el 2026-08-29: la tabla se borró y la función dejó de escribirlas.

## Lo que el linter marca y NO hay que "arreglar"

`is_admin`, `is_teacher`, `my_role`, `teacher_can_*`, `teacher_grade_ok`,
`teacher_covers_grade` y `same_grade_teacher` aparecen como ejecutables por
`anon`. **Es intencionado**: hay 6 políticas RLS alcanzables por `anon` que los
llaman, y sin `EXECUTE` un resultado vacío se convertiría en un error.

Las RPC `admin_*`, `grade_writing`, `set_student_access` y `upsert_speaking` son
ejecutables por `authenticated` **a propósito** — las llaman admins y profesores
con sesión, y cada una comprueba el rol en su cuerpo.
