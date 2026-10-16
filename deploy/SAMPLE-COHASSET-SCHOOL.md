# Sample de Cohasset School (sample.cohasset.pe)

Colegio de muestra para enseñar el producto a colegios (15-oct-2026). Quien entra
con una cuenta de este colegio ve **solo** esta selección, cada pieza de punta a punta:

| Pieza | Qué enseña |
|---|---|
| 🎯 Practice Tests | Prácticas 1 y 2 de A2 · B1 · B2 · C1 en Reading, Listening y Writing |
| 🎓 Mocks | MOCK 1 y MOCK 2 de cada nivel en Reading, Listening y Writing (Writing corregido por el examinador de IA) |
| 🧰 Practice tools | Phrasal verbs, Collocations, Idioms y Word formation: los dos primeros bloques de cada nivel |
| ✍️ IELTS Writing Studio | En cohasset.pe, con la sesión del colegio (SSO) |
| 📊 My progress | Sus resultados, guardados **solo en el navegador** (16-oct-2026) |

**Sin resultados en la base.** `settings.local_results = true`: los intentos de las
cuentas sample no se guardan en Supabase (trigger `trg_local_results` en `exam_attempts`
y `activity_attempts`, migración `2026-10-16_01`), ni van al archivo de textos (webhook)
ni por correo. El portal y los motores los guardan en `localStorage`
(`cohSampleResults:<uid>`) y My Progress los lee de ahí. Con `sample.cohasset.pe` los
mocks llevan la marca Cohasset Schools (`mocks-cambridge/config.js`).

## Crear más cuentas sample

**Desde la consola (recomendado).** Entrar al portal como superadmin →
☁️ Cohasset Schools → **Schools** → ficha de *Cohasset School · Sample* →
tarjeta de crear cuenta: correo, contraseña (mín. 8), nombre, rol
(`student` para enseñar el alumno; `teacher`/`admin` para enseñar la corrección),
marcar **demo**, y para alumno grado (p. ej. 9) y sección.
Usar correos `…@sample.cohasset.pe`. La cuenta entra por **https://sample.cohasset.pe**.

**Por SQL** (MCP de Supabase, proyecto del portal). `school_create_account` exige
superadmin, así que dentro del bloque se fija la identidad de Paolo:

```sql
do $$
declare pid uuid := (select id from profiles where email = 'paolobaca2000@gmail.com');
declare sid uuid := (select id from schools where slug = 'sample');
begin
  perform set_config('request.jwt.claim.sub', pid::text, true);
  perform set_config('request.jwt.claims', json_build_object('sub', pid, 'role', 'authenticated')::text, true);
  perform public.school_create_account(sid, 'colegio-x@sample.cohasset.pe', '<contraseña>',
                                       'Colegio X (muestra)', 'student', true, 9::smallint, 'A');
end $$;
```

Las contraseñas **no** van en este repo (es público): las de prueba están en
`C:/Projects/_local/cohasset-school-sample-credenciales.txt`.

## Cómo funciona

- `schools.settings.strict_content = true`: pieza sin fila en `school_content` = apagada
  (los demás colegios siguen viendo lo que no tiene fila).
- `school_content.scope` recorta dentro de la pieza: `{"tests":["practice"]}` /
  `{"tests":["mock01"]}` en `practice.*` / `mock.*` (lo aplica `mocks-cambridge/nis-bridge.js`
  con la sesión: oculta las tarjetas y bloquea el examen), y `{"levels":["A2","B1"],"blocks":1}`
  en `tool.*` (lo aplican `lexapp.js` y `wordform.js` leyendo el portal que los embebe).
- `schoolIsSample()` (school.js) da al alumno una portada propia y la vista Mocks.
- Mocks y Practice abiertos para los grados 1-11 (`mock_access`, `practice_access`).

Para cambiar la selección: encender/apagar piezas en ☁️ → 📦 Content, y el recorte con
`update school_content set scope = '…' where school_id = (select id from schools where slug='sample') and item_key = '…';`
Migración: `deploy/db-migrations/2026-10-15_01_colegio_sample.sql`.

**Límite conocido:** las apps son archivos estáticos; quien teclee la URL de una app
fuera del portal (p. ej. `/phrasal-app/`) la ve entera, igual que en cualquier colegio.
