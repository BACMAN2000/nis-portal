# WP-G · Editar desde «Qué ve cada clase» (Fase 2, segunda parte) — especificación

Repo: `C:\Projects\nis-portal`. Tocas SOLO **`access-panel.js`** (y su prueba
`tools/fase2/prueba_access_panel.js`). No `app.js`, no `index.html`, no git. Léete primero
`access-panel.js` entero (545 líneas): ya pinta la foto por grado; ahora se puede editar desde ahí
sin ir a cuatro paneles distintos. Los paneles viejos siguen existiendo: no se rompe nada.

## Reglas de escritura (las mismas que usan los paneles actuales; RLS manda)

Todas con `updated_at: new Date().toISOString()` y `updated_by: (state.session&&state.session.user&&state.session.user.id)||null`
(`state` es global de app.js; `sb` es el cliente):

- **node_access** (unidades, Activities, semanas, Grammar, Readers, Main Suite, YLE curso, Practice tools, Library, MUN, French):
  `sb.from('node_access').upsert({grade_id, node_key, unlocked, updated_at, updated_by}, {onConflict:'grade_id,node_key'})`
  — exactamente como app.js ~1391 (`adminAccess`) y ~5056 (`studyPlanPanel`).
- **practice_access**: `sb.from('practice_access').upsert({grade_id, unlocked, updated_at, updated_by}, {onConflict:'grade_id'})` (app.js ~1746).
- **mock_access** (SOLO admin): igual con `mock_access` (app.js ~1714).
- **fun_access** (Fun for Nordic, por idioma y nivel): fila `{grade_id, lang, level, desde, hasta, unlocked, updated_at, updated_by}`,
  `upsert(..., {onConflict:'grade_id,lang,level'})`; al guardar un nivel para un grado se borran los otros niveles de
  ese grado e idioma (`delete().eq('grade_id',g).eq('lang',lang).neq('level',level)`), como app.js ~609-615. «Quitar la
  regla» = `delete().eq('grade_id',g).eq('lang',lang)` (app.js ~625).
- **yle_access** (tests de práctica YLE): `{grade_id, level, unlocked, max_test, updated_at, updated_by}`,
  `upsert(..., {onConflict:'grade_id,level'})` — mira `yle-panel.js` (`vistaAcceso`) para la forma exacta y los valores
  de `max_test` (0 = cerrado, N = hasta el test N, 99/null = todos).
- **reader_exam_access** y **student_access**: NO se editan aquí (siguen en Reading checks y en Users → View as).

Un profesor solo puede escribir en sus grados (RLS: `teacher_covers_grade`); si el servidor devuelve error, se muestra
con `NISUI.avisa` (global) y se recarga la foto. Admin todo.

## Interfaz

- Botón **«✏️ Edit»** arriba (junto a Print) que pasa el panel a modo edición: cada fila de estado gana un control:
  interruptor ✅/🔒 para nodos, practice y mocks (mocks solo si `admin`); para Fun for Nordic, nivel + rango
  desde–hasta + «Quitar regla»; para YLE, nivel + «hasta el test N» (0 = cerrado). Un «Done» vuelve a solo lectura.
- Cada cambio pide confirmación con `NISUI.pregunta('…', {titulo, si:'Apply', no:'Cancel'})` (global; devuelve
  Promise<boolean>) SOLO cuando cierra algo (`unlocked:false`, o `max_test` menor, o rango más corto): cerrar deja
  fuera a alumnos; abrir no. Tras escribir, `NISUI.aviso('Saved ✓','bien',1800)` y se recarga la foto del grado
  (vuelve a consultar; no adivines el estado).
- En modo edición la sección resume arriba «Editing G5 · A» y advierte: «Changes apply to the whole grade» (las
  secciones no tienen candado propio en estas tablas: si el selector de sección está en una sección concreta, avisa
  de que el cambio afecta a todo el grado).
- Nada de escrituras masivas («abrir todo»): una a una.

## Verificación

- `node --check access-panel.js`.
- Amplía `tools/fase2/prueba_access_panel.js` con un `sb` de mentira que registre los `upsert`/`delete` recibidos y
  comprueba: (1) abrir un nodo no pide confirmación y manda `{grade_id, node_key, unlocked:true}` con `onConflict`
  correcto; (2) cerrar pide confirmación y, si se cancela, no escribe; (3) fun_access borra los otros niveles del
  idioma antes del upsert; (4) el profesor no ve el interruptor de mocks; (5) un error del servidor sale por
  `NISUI.avisa` y no rompe el panel. Simula `NISUI` con un objeto {pregunta:()=>Promise.resolve(true), avisa, aviso}.

Responde con: los controles añadidos y a qué tabla escribe cada uno, y el resultado de la prueba.
