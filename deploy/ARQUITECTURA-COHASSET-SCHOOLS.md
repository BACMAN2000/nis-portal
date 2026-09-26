# Cohasset Schools — arquitectura de la plataforma multi-colegio

*26-sep-2026. Estado: fase 1 en producción; fases 2-4 planificadas.*

## 1. Qué es

**Cohasset Schools** es el portal escolar de Cohasset como producto: un solo
código y una sola base atienden a todos los colegios que lo contraten, cada
uno con su dirección, su logo, sus colores y las apps que Cohasset le active.
**NIS (Nordic International School) es el cliente 1 y el modelo**: lo que se
construyó para NIS (unidades, Cambridge, mocks, corrección, informes) es lo
que se replica a cada colegio nuevo.

- **cohasset.pe** es la tienda: web pública, propuesta para colegios, formulario
  de contacto, demo.
- **`<colegio>.cohasset.pe`** es el producto: el portal de cada colegio.
  `nis.cohasset.pe` es uno más. `demo.cohasset.pe` es el que ve un colegio
  interesado, con la marca neutra Cohasset Schools.
- **Un superadministrador** (Paolo) ve y maneja todos los colegios: alta,
  marca, apps, estado comercial, cobros, contactos y bitácora.

## 2. Capas

```
Cloudflare DNS  *.cohasset.pe  ──proxy──▶  nginx (204.168.174.160)
                                            server_name nis.cohasset.pe *.cohasset.pe
                                            root /opt/nis-portal  (auto-pull de GitHub main)
                                                     │
                     ┌───────────────────────────────┴───────────────────────────────┐
                     │  Front estático (HTML/JS): index.html + app/*.js + school.js  │
                     │  school.js lee el HOSTNAME → slug → school_public(host)       │
                     │  → marca + apps → pinta logo, color, título, menú, tarjetas   │
                     └───────────────────────────────┬───────────────────────────────┘
                                                     │ supabase-js (clave anon + RLS)
                     ┌───────────────────────────────┴───────────────────────────────┐
                     │  Supabase kjrppibltkbflvxmiyib (Postgres + Auth + Storage)    │
                     │  schools · apps · school_apps · profiles(school_id)           │
                     │  school_contacts · school_payments · school_interactions      │
                     │  + todas las tablas del portal (fase 2: school_id en todas)   │
                     └───────────────────────────────────────────────────────────────┘
```

**Por qué esta forma y no otra.** cohasset.pe (academia) y el portal escolar son
productos distintos con motores distintos; portar el portal al backend FastAPI
de la academia serían meses para el mismo resultado. El portal ya era estático
+ Supabase con RLS: convertirlo en multi-tenant es añadir `school_id` y una
condición «de mi colegio» a cada política, no reescribirlo.

## 3. Modelo de tenencia (quién ve qué)

| Rol | Ve | Escribe |
|---|---|---|
| **Superadmin** (`profiles.is_superadmin`) | todos los colegios y todo lo comercial | todo |
| **Admin de colegio** (`role=admin`) | solo perfiles y datos de **su** colegio | usuarios, permisos y correcciones de su colegio |
| **Profesor** | alumnos de los grados que le asignó su admin (`teacher_access`) | correcciones de esos alumnos |
| **Alumno** | lo suyo | sus entregas |
| **Sin sesión** (`anon`) | solo `school_public(host)`: nombre, logos, color y apps encendidas | nada |

Reglas que lo sostienen (migración `2026-09-26_01`):
- `profiles.school_id NOT NULL`; el trigger `profiles_tenant_guard` asigna el
  colegio del que crea la cuenta y **nadie que no sea superadmin puede cambiar
  `school_id` ni `is_superadmin`** (sin esto un admin se ascendería con un UPDATE).
- Políticas de `profiles`: las de antes **y** `school_id = my_school_id()`.
- `is_admin()` sigue diciendo «es admin»; el aislamiento lo pone la política,
  no la función.
- Colegio suspendido o dado de baja → `active=false` → `school_public` no lo
  devuelve → el portal no lo sirve.

## 4. Marca y apps por colegio

`schools`: `slug` (subdominio), `domain`, `name`, `short_name`, `logo_url`,
`logo_dark_url`, `accent`, `is_demo`, `settings` (grados, secciones, año,
idioma), `template_of` (de qué modelo nació).

`apps` es el catálogo fijo de lo que sabe hacer el portal (13 módulos:
classes, french, littlereaders, rhymes, library, whiteboard, cambridge,
fun_primary, fun_secondary, mocks, tools, progress, teachers_room).
`school_apps` dice cuál está encendida en qué colegio; **sin fila = apagada**.

El front no consulta tablas por módulo: `school.js` recibe el mapa de apps y
`shell()` filtra el menú, `schoolAppOK(nav)` filtra tarjetas. Un módulo nuevo
se registra en `apps` y en el mapa `APP_OF_NAV` de `school.js`, nada más.

**Marca neutra:** un host desconocido o un colegio recién creado se presenta
como *Cohasset Schools* (`assets/cohasset-school*.svg`, azul `#2563EB`). Solo
NIS conserva el splash animado de Nordic (`nis-splash.js` mira el slug).

## 5. Consola del superadministrador (`app/32-platform.js`)

Menú **☁️ Cohasset Schools**, visible solo con `is_superadmin`:

- **Overview**: colegios por estado, alumnos reales, ingreso mensual recurrente
  por moneda, pagos vencidos, próximas acciones, tabla de colegios.
- **Schools**: alta **desde un modelo** (`school_create_from_template`: copia
  apps, plan y settings de NIS o de otro colegio; nace en *trial* con marca
  neutra y `slug.cohasset.pe` operativo al instante), edición de marca, plan,
  cuota, moneda, día de cobro, tope de alumnos, fin de prueba; casillas de
  apps; 👁 Preview (`?school=slug`).
- **Payments**: `school_payments_generate()` crea la fila pendiente del mes
  para cada colegio activo con cuota; lo vencido pasa a *overdue*; marcar
  pagado (método, referencia), anular, añadir a mano.
- **Contacts**: personas de cada colegio y bitácora (llamada, WhatsApp,
  correo, reunión, visita, nota) con próxima acción y fecha; lo pendiente
  aparece en Overview.

Todo esto es solo del superadmin por RLS (migración `2026-09-26_02`).

## 6. Hosting: cómo nace la dirección de un colegio

Ya no hay que tocar nada: Cloudflare tiene `*` → 204.168.174.160 (proxied) y
nginx responde a `*.cohasset.pe` con el mismo árbol. El certificado de origen
es un Origin CA de Cloudflare con comodín. Crear el colegio con slug `sanjose`
deja `sanjose.cohasset.pe` en vivo. Dominio propio del colegio: CNAME hacia
nosotros + `schools.domain`; `school_public` busca por dominio completo.

Trampa conocida: `sites-enabled/nis.cohasset.pe` era una copia, no un enlace;
hoy es symlink. Respaldos con fecha en `sites-available`.

## 7. Lo que sigue siendo de NIS (y cómo se hace genérico)

| Qué | Dónde | Cómo se resuelve |
|---|---|---|
| Nombres de módulo con la marca dentro: *Fun for Nordic*, *Nordic Ascent*, *NIS Dictionary*, *NIShoot Live* | `app/*.js` (≈60 «Nordic»), `nis-fun/`, activities | `schoolTerm(clave)` con nombres por defecto neutros (*Fun for English*, *Ascent*, *Dictionary*, *Shoot Live*) y `settings.terms` por colegio; NIS conserva los suyos |
| Grados y secciones fijos (G1-G11, A/B, Teachers 12/13) | `grades`, selectores del admin, `teacher_access` | `settings.grades/sections` ya existe en `schools`; los selectores leen de ahí en vez de la tabla global |
| Datos de alumnos sin `school_id` | `student_sessions`, `unit_submissions`, `mock_reports`, `writing_reviews`, `fun_submissions`, `speaking_tests`, `teacher_access`, `reader_exam_access`… | **Fase 2**: columna `school_id` (default por trigger desde el alumno) + `and school_id = my_school_id()` en cada política. Hasta entonces, un colegio nuevo solo con cuentas de prueba |
| Textos «Nordic»/«NIS» en pantallas (login ya está; ayuda, informes a familias, PDFs) | `ayuda.html`, `85-correccion.js`, `72-mocks.js`, plantillas de informe | sustituir por `schoolName()`/`schoolShort()` |
| Cuentas demo, claves de mock, cuenta QA | por colegio | crearlas al dar de alta desde el modelo (paso opcional del alta) |
| Material (audio, láminas, PDF) | fuera del repo, servido por nginx | compartido entre colegios; no es del inquilino |

## 8. Fases

1. **Hecho (26-sep).** Tenencia en `profiles`, marca y apps por colegio,
   hosting por comodín, demo con marca neutra y cuentas demo, consola del
   superadmin con alta desde modelo, pagos, contactos y bitácora.
2. **Aislamiento de datos.** `school_id` en las tablas de alumnos y sus
   políticas; prueba con rol simulado (admin NIS, admin demo, profesor,
   alumno) antes y después: mismas filas para NIS, cero cruzadas.
   *Requisito para meter un colegio real.*
3. **Genérico de verdad.** `schoolTerm()`, grados/secciones desde `settings`,
   textos y PDFs con el nombre del colegio, alta desde modelo que también
   crea el admin y las cuentas demo del colegio.
4. **Repositorio de contenido.** De «apps enteras» a «piezas» (practice tests,
   mocks oficiales, IELTS de cohasset.pe, readers): tabla `school_content`
   (colegio × pieza × orden) que el superadmin arma por colegio. Pide una
   sola fuente para los mocks (hoy viven en dos bases) y decidir cómo se
   sirven los cursos IELTS del backend de la academia.
5. **Tienda.** Sección «Colegios» en cohasset.pe con la propuesta, enlace al
   demo y formulario que crea el lead en la bitácora de la consola.

## 9. Reglas de seguridad que no se negocian

- Toda tabla nueva nace con `school_id`, una política por acción, `auth.uid()`
  en subconsulta y `revoke all from anon` (molde de `speaking_tests`).
- Lo que lleva respuestas de examen se entrega por función con candado, no por
  `select` (molde de `unit_exams`).
- El superadmin es una bandera de perfil que solo otro superadmin cambia.
- Ningún secreto en el repo (es público): credenciales demo en
  `C:/Projects/_local/`, claves en `.env` del servidor.
- Nada incompleto en vivo: una app apagada no se ofrece; un colegio sin
  fase 2 no recibe alumnos reales.
