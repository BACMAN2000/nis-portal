# WP-B · Arquitectura del alumno v2 (Fase 2) — especificación

Repo: `C:\Projects\nis-portal`. Archivos que tocas: **`app.js`** (solo las funciones del alumno
listadas abajo y el menú del alumno en `renderStudent`) y **`brand.css`** (estilos nuevos al
final). NADA más. No ejecutes git (otras sesiones comparten el repo; yo commiteo). Conserva
los finales de línea del archivo (CRLF): edita con el Edit tool o con Python `newline=''`.
Comentarios en español, con el estilo del archivo. En texto visible nunca `'` sino `’`
(un apóstrofe rompe los `onclick` inline). app.js tiene 9.000 líneas: NO lo leas entero;
localiza con grep -n y lee por rangos.

## Por qué

Hoy el alumno tiene el mismo programa en varios sitios con distinta puerta: Fun for Nordic
desde Clases→Primaria y desde #cambridge; el curso B2 First desde la tarjeta del grado y desde
la barra; Practice/Mocks desde cuatro sitios; en `studentGrade(gN)` conviven en la misma
rejilla tarjetas de clase (Units, Activities, Readers) con tarjetas de examen (Cambridge
Flyers, B2 First course, Cambridge). Dirección pidió **separar Clases/Unidades de la
preparación Cambridge** y que **cada programa tenga UNA sola casa**.

## Diseño objetivo (alumno)

**Barra lateral** (`renderStudent`, ~línea 4146): `🏠 Home` · `🏫 My classes` · `🎓 Cambridge`
· `🧰 Practice tools` · `📊 My progress` · `❓ Help` · `👤 My account`. Si `nodeVisible('french')`,
`🇫🇷 French` entre My classes y Cambridge. Fuera el grupo «Cambridge» de la barra con
Practice/Mocks/curso (ya viven dentro de la pista Cambridge). Las claves de ruta nuevas:
`myclasses`, `tools`. Mantén `english`, `classes`, `practice`, `mocks`, `cambridge`, etc.
resolviendo (ver compatibilidad).

**Home (`studentHub`)**: saludo como hoy; debajo, DOS tarjetas grandes de pista
(`.track-card`, nuevas en brand.css: alto ≥ 150 px, icono grande, título, 1 línea de
descripción, y 2-4 «chips» con lo que hay dentro):
1. **🏫 My classes** — «Grade N: units, activities, readers and unit exams» → abre
   `classes_gN` del grado del alumno directamente (`state.profile.grade_id`); si no hay grado,
   `classes`.
2. **🎓 Cambridge** — «Your route: Pre A1 Starters» (o el nivel que toque por
   `CAMBRIDGE_REPARTO`/`secCoursesFor`) «· course · practice tests · mocks» → `#cambridge`.
Debajo, fila de tarjetas normales: 🧰 Practice tools (→ `tools`), 📚 Library (si
`general.library`), 🌐 MUN Academy (si `general.mun`), 📊 My progress (→ `results`), y 🇫🇷
French si procede. `#english` (`studentSubject('english')`) pasa a pintar exactamente este
Home (alias), para que los `?back=./#english` viejos sigan cayendo en un sitio con sentido.
`studentSubject('french')` no se toca.

**My classes (`myclasses`)**: para el alumno = `studentGrade(gN)` de su grado (sin pasar por
etapa). `studentClasses`/`studentStage` siguen existiendo para profesor/admin y para quien
no tenga grado. En **`studentGrade(gN)` solo queda lo de clase**: Project/English sequence,
🎯 Units, 📝 Grammar, 🎲 Activities, 📚 Readers, 📋 Unit exams. **Se quitan** de esa rejilla:
la tarjeta «[Nivel] course» (`secCoursesFor`), «🦅 Cambridge Flyers» (g5) y «🎓 Cambridge»
(g9, `studentGradeCambridge`). No se borran las funciones ni sus rutas (compatibilidad).
Un subtítulo «Class material — for exam preparation go to 🎓 Cambridge» con enlace.

**Cambridge (`studentCambridgePortal`, #cambridge)**: pasa a ser **consciente del grado**.
Arriba, «Your route» con el nivel del alumno (primaria: `CAMBRIDGE_REPARTO`/`FUN_REPARTO`;
secundaria: `secCoursesFor(gN)`), y sus tres puertas en una fila: **Course** (nis-fun/engine
del nivel, o para g5 la vista por unidades `classes_g5_flyers`, o para g9 la vista de
destrezas `classes_g9_cambridge`), **Practice tests** (YLE: `yle-practice.html?level=…`;
Main Suite: `_withBack(QUIZ_URL+'quizzes.html','cambridge')`), **Mocks** (`mocks`).
Debajo, la tarjeta doble YLE / Main Suite de hoy tal cual (todos los niveles), con la nota
del plan de estudio si la hay. Respeta TODOS los gates actuales (`nodeVisible` de cada nodo,
`practice_access`/`mock_access` como hoy): no abras nada que hoy esté cerrado.

**Practice tools (`tools`)**: rejilla con Phonics, Pronunciation, Games Lab, NIShoot Live,
Phrasal verbs, Collocations, Idioms, Word formation, NIS Dictionary — los mismos handlers y
gates que hoy tienen en `ENGLISH_AREAS` (bloque «Practice»). `ENGLISH_AREAS`/`ENGLISH_BLOCKS`
pueden quedarse como datos si los reutilizas.

**Compatibilidad de rutas** (`_navRender` ~5617 y `window._nav`): todas las rutas actuales
siguen resolviendo: `english` → Home; `classes_gN_cambridge` y `classes_g5_flyers` → sus
vistas de siempre (ahora enlazadas desde Cambridge); `practice`/`mocks` → igual; `myunit`,
`projects`, `library`, `mun`, `results`, `final`, `account`, `help`, `phonics`, `coach`,
`games`, `nishoot`, `phrasal`… → igual. Añade `myclasses` y `tools`. Los `_setNav(k)` de cada
vista deben marcar el ítem correcto de la barra nueva (p. ej. `classes_*` → `myclasses`;
`phonics/coach/games/nishoot/phrasal/…` → `tools`; `cambridge/practice/mocks` → `cambridge`).
Los botones «← …» de cada vista apuntan a su padre nuevo (Home, My classes, Cambridge, Tools).

**Diseño** (brand.css, al final, con los tokens ya existentes `--blue`, `--blue-d`, `--card`,
`--ink`, `--line`, `--muted`): `.track-card` (grid de 2 columnas en escritorio, 1 en ≤ 700 px),
`.track-card .ico` (2.6 rem), `.track-card h2`, `.track-chips .chip` (pastillas pequeñas),
hover suave como `.card`. Nada de colores nuevos fuera de los tokens; nada de `!important`.
Tiene que verse bien en tema oscuro (`:root[data-theme="dark"]` ya redefine los tokens).

**Profesor y admin**: NO cambies sus menús ni paneles en este WP. `studentClasses`,
`studentStage`, `studentGrade` los usan como visor (Classes): deben seguir funcionando para
ellos con el selector de etapa/grado.

## Verificación obligatoria antes de terminar

1. `node --check app.js`.
2. `node tools/qa/qa-static.js` (desde `tools/qa`, ya tiene `node_modules`): 0 «JS syntax».
3. Que estas rutas existan en `_navRender`: myclasses, tools, english, classes, classes_g9,
   classes_g9_cambridge, classes_g5_flyers, cambridge, practice, mocks, results, account, help.
4. Con un `sb` de mentira no se puede; así que además pega en tu respuesta final el árbol de
   navegación resultante (ruta → función → tarjetas) y los cambios en `_setNav`, para que yo lo
   compruebe en vivo con la cuenta demo.
5. Que no queden referencias a ítems del menú viejo del alumno (grupo Cambridge de la barra).

Responde con: qué funciones cambiaste (nombre y rango de líneas), el árbol resultante, y
cualquier duda que resolviste por tu cuenta. Sin más prosa.
