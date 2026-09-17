# WP-F · «Qué ve cada clase»: un solo panel de acceso (Fase 2) — especificación

Repo: `C:\Projects\nis-portal`. Creas UN archivo nuevo: **`access-panel.js`** (raíz), modelo
`overview-panel.js` (léelo entero: cómo expone `window.overviewPanel({admin})`, cómo consulta
con `sb`, cómo pinta en `#main`, try/catch por consulta, estilo de comentarios en español).
No toques `app.js` ni `index.html` (yo lo engancho al menú). No ejecutes git.

## Problema

Los permisos del alumno viven en **9 tablas** editadas desde **4 paneles** que se solapan
(Access, Activate units, Study plan, Units by grade, Open Practice/Mocks, controles de
lectura). Un profesor no puede saber en una sola pantalla «qué ve hoy 5.º B». Este panel es
**de lectura** (nada se escribe): la foto completa por grado, con un enlace al panel que edita
cada cosa.

## Tablas (esquema real)

- `node_access(grade_id, node_key, unlocked)` — candado por grado y nodo. Los nodos son las
  claves de `ACCESS_NODES` (const global en app.js, ≈129: `english.classes.g9.units.u4`,
  `english.cambridge.yle.starters`, `english.practice`, `french`, `general.library`…). Sin fila
  = valor por defecto: abierto salvo los de `NODE_DEFAULT_LOCKED` (global) y `UNIT_PILOT`.
  Usa la función global `nodeVisible`? NO: es para el usuario actual. Reimplementa la
  resolución por grado: fila → `unlocked`; sin fila → `!NODE_DEFAULT_LOCKED.includes(key)`
  (mira `_nodeDefaultOpen` en app.js ~4409 para copiar la regla exacta, incluidas unidades).
- `student_access(student_id, node_key, unlocked)` — excepciones por alumno (mandan sobre el
  grado). `profiles(id, full_name, grade_id, section, role='student')`.
- `practice_access(grade_id, unlocked)` y `mock_access(grade_id, unlocked)` — sin fila = abierto
  (practice) / cerrado (mocks): confirma en app.js buscando `practice_access` y `mock_access`.
- `fun_access(grade_id, lang, level, desde, hasta, unlocked)` — Fun for Nordic por idioma
  (`en`/`fr`) y nivel (`starters|movers|flyers`, o los de secundaria); sin NINGUNA fila de un
  idioma = ese idioma abierto entero (regla de app.js `funAccessDeGrado`).
- `yle_access(grade_id, level, unlocked, max_test)` — practice tests YLE por nivel.
- `reader_exam_access(key, unlocked, scope, extra_min, school_year, opens_at, closes_at)` —
  ventanas de exámenes de lector y de unidad (`key` codifica grado/libro/examen; mira
  `_rdrRowOpen`/`unit_exam_open` en app.js para interpretarla).
- `reader_assignments(school_year, grade_id, section, book_id, term)` — libro asignado.
- `study_plans(area, scope, grade_id, student_id, note)` — nota del plan de estudio.

`GRADES` (global, `[{id,name}]`) y `state.teacherNodes`/`teacherAllowedGrades()` (profesor)
dicen qué grados mostrar: admin todos; profesor solo los suyos (`window.accessPanel({admin,
grades})`, yo paso la lista).

## Qué pinta `window.accessPanel({admin:boolean, grades:[ids]})` en `#main`

1. Selector de grado (pastillas) y, si el grado tiene secciones (`profiles.section`), de
   sección; por defecto el primer grado.
2. Cuatro bloques, cada uno una tabla compacta con ✅/🔒/🕒 y el enlace «Edit in …» al panel
   de siempre (`window._irTab('access')`, `'unitaccess'`, `'studyplan'`, `'funaccess'`,
   `'practice'`, `'mocks'`, `'readers'`, `'unitexams'` — sólo los que existan para ese rol;
   `_irTab` es global y ya decide por rol):
   - **Classes**: por unidad del grado (`unitPlansFor(gN)` global): abierta/cerrada/piloto;
     Activities y semanas (nodos `…gN.activities` y `…units.uN`), Grammar, Readers (nodo +
     libro asignado este año + ventana de examen si la hay).
   - **Cambridge**: Fun for Nordic (nivel y rango de unidades `desde–hasta` por idioma), YLE
     practice tests (nivel, hasta qué test), Main Suite (nodos `english.cambridge.main.*`),
     Practice tests (`practice_access`), Mocks (`mock_access`), nota del plan de estudio.
   - **Practice tools & General**: `english.phonics`, `english.pronunciation`, `general.library`,
     `general.mun`, `french`.
   - **Exceptions**: alumnos del grado con filas en `student_access` (nombre → nodo → estado)
     y alumnos con `individual_plan`.
3. Arriba, un resumen en una frase: «G5 sees: Units 1–4 open (5–6 locked) · Activities ·
   Readers: Tom Sawyer · Fun for Nordic Flyers units 1–20 · Practice tests open · Mocks closed».
4. Botón «🖨️ Print» (window.print) para pegarlo en la carpeta de la clase.

Todo en inglés (el portal es inglés; el diccionario lo traduce). Cada consulta con try/catch:
si una tabla no es legible para el profesor, la fila dice «not readable with your access» y lo
demás se pinta (como overview-panel.js). Nada de escrituras.

## Verificación

- `node --check access-panel.js`.
- Un `sb` de mentira con datos sintéticos (como hizo overview-panel.js en su día; deja el
  arnés en `tools/fase2/prueba_access_panel.js` con jsdom NO disponible: usa un DOM mínimo con
  `document.getElementById` simulado o simplemente comprueba que `render()` devuelve HTML con
  las secciones esperadas).

Responde con: la API (`accessPanel(opts)`), las tablas que consulta y cómo resuelve cada
estado, y el resultado de tu prueba.
