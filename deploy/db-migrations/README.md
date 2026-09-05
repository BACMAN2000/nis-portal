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
| 2026-09-05 | `2026-09-05_01_vistas_fun_a_invoker_y_entregas_otra_vez.sql` | 🔴 Crítica | `v_fun_metricas` y `v_fun_unidades` nacieron SECURITY DEFINER y legibles por `anon` (nombre, grado, sección y nota **sin sesión**), y `v_entregas_ficha` **volvió a ser DEFINER**: un `CREATE OR REPLACE VIEW` posterior se llevó el `security_invoker` que puso la migración del 29-ago. |
| 2026-08-29 | `2026-08-29_04_arreglar_handle_new_user_columna_cefr_level.sql` | 🔴 Crítica | **El alta de usuarios estaba rota desde el 13-jul**: el trigger insertaba en una columna `level` inexistente. Ninguna cuenta creada en 60 días. |

## Pendientes (configuración de Supabase Auth — no es SQL)

- **Leaked Password Protection: BLOQUEADO POR PLAN.** Comprobado en el panel el
  2026-08-29: el interruptor está en Authentication → Sign In / Providers →
  Email, y dice *«Only available on Pro plan and above»*. El proyecto está en
  **Free**. No es un descuido: no se puede activar sin subir de plan.
- ~~Desactivar el registro público~~ — **hecho el 2026-08-29**. Ver abajo.
- Opcional y gratis: subir la **longitud mínima de contraseña** de 6 a 8 (el
  propio panel lo recomienda). Ojo con los flujos que validan a 6.
- NO activar «Require current password when updating» ni «Secure password
  change» sin tocar antes `app.js`: `saveMyPassword` no pide la contraseña
  actual, así que romperían el cambio de clave del alumno.
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

## Ajustes de Auth cambiados desde el panel (no son SQL)

| Fecha | Ajuste | De → a | Por qué |
|-------|--------|--------|---------|
| 2026-08-29 | **Allow new users to sign up** | ON → **OFF** | El alta pública llevaba rota desde el 13-jul por el bug de `handle_new_user`. Al arreglarla el mismo día **revivió**: cualquiera con el enlace podía crearse una cuenta de alumno en el portal del colegio. Se cierra; las altas las hace un admin desde *Nuevo usuario*, que vuelve a funcionar. Verificado contra `/auth/v1/signup`: responde `signup_disabled`. |

El rol nunca fue el riesgo — `handle_new_user` fuerza `student` salvo que haya
un admin autenticado — pero una cuenta sin aprobar entra igualmente al portal.
