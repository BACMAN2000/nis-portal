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

## Pendientes (configuración de Supabase Auth — no es SQL)

- Activar **Leaked Password Protection** (Auth → Policies).
- Considerar **desactivar el registro público** si el alta debe ser solo por admin.
- Mover la extensión `unaccent` fuera del esquema `public`.
- Deuda de diseño: `student_credentials.password` / `raw_user_meta_data.visible_password`
  guardan contraseñas en texto plano (lectura solo-admin, pero recuperables).
