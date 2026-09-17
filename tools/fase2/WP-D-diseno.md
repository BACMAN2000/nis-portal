# WP-D · Diseño: móvil, contraste y cabeceras (Fase 4) — especificación

Repo: `C:\Projects\nis-portal`. No ejecutes git (yo commiteo). Conserva finales de línea
(CRLF en muchos archivos): Python con `newline=''` o el Edit tool. No toques `app.js`,
`brand.css`, `nis-*.js`, `i18n/`, `tools/i18n/` (otros trabajan ahí). Comentarios en español.

Hay un servidor local con el árbol de trabajo en **http://localhost:9178/** y el banco de
pruebas en `tools/qa` (ya con `node_modules`). Antes de tocar nada, ejecuta desde `tools/qa`:

    QA_BASE=http://localhost:9178/ node qa-browser.js '^(unit|worksheet|crossword-u4w1|wordsearch-u4w1|word-sudoku-u4w1|attwn-exam|cambridge-listening|class-session|conexiones|gallery|informe|project|teacher-guide|unit-exam|workbook|yle-boletin|yle-guia-familia|grammar|cambridge-bonus|opinion-essay-builder|word-formation|phonics/index|mocks-cambridge/reading-quiz)\.html$'

(en bash: `QA_BASE=... node …`; en PowerShell: `$env:QA_BASE='http://localhost:9178/'; node …`).
Te dice, página a página, «Texto con contraste < 3» y «Desborde horizontal en móvil»
(ancho de scroll a 375 px). Tu trabajo termina cuando esa misma orden devuelve **0 desbordes
y 0 contrastes < 3** en ese conjunto, y la orden sobre TODAS las páginas (`node qa-browser.js`
sin filtro, ≈10 min) baja de 102 desbordes a ≤ 5 y no añade excepciones JS.

## Qué arreglar y cómo

1. **Desborde en móvil (101 páginas)**. Causas vistas: cabeceras con botones que no envuelven
   (`unit.html` a 375 px: el «◀ Back» gigante y «← Portal» cortado), rejillas de crucigrama y
   sopa de letras (`.gridbox`) más anchas que la pantalla, tablas anchas, `min-width` fijos.
   Soluciones, en este orden de preferencia: `flex-wrap:wrap` y tamaños relativos en la
   cabecera; para rejillas de juego, envolver en un contenedor con `overflow-x:auto;
   max-width:100%` o escalar con `transform` según `--cols`; para tablas, `overflow-x:auto` en
   el contenedor; `max-width:100%` en imágenes. Los 258 juegos son 6 familias generadas
   (crossword-*, wordsearch-*, word-sudoku-*, word-invaders-*, say-it-right-*, voice-battle-*,
   EN y FR): el `<style>` es idéntico por familia — aplica el mismo cambio a toda la familia con
   un reemplazo literal exacto y comprueba con grep -c que se aplicó al mismo número de
   archivos que tiene la familia. No cambies el HTML de los juegos, solo CSS.
2. **Contraste < 3** (151 hallazgos): `button.act.b-hint` en crossword/wordsearch/word-sudoku
   (2,13: texto claro sobre fondo claro), `span.moves`/`00:01` de memory y word-sudoku,
   `.wk` de grammar.html (2,97), `.ex-kick` de cambridge-bonus, `.eyebrow` de grammar-lab,
   `.hint`/`.wcstate` de opinion-essay-builder, `.glab`/`.modehead` de word-formation.html,
   `.text-nordic-400` de pronunciation-coach, `.navbtn.primary` de listen-touch y
   recipe-builder. Sube el contraste a ≥ 4,5 cambiando el color de texto o el fondo, sin
   cambiar tamaños ni maquetación. Los `h1` blancos sobre foto (yle-*, flyers-practice,
   yle-vocab) son falsos positivos del medidor: déjalos.
3. **Cabecera de `unit.html`** en móvil: logo + spacer + botones; que a ≤ 520 px los botones
   pasen a una segunda fila y no se corten.

Comprueba también que en tema oscuro (añade `?tema=dark`… no: pon
`localStorage.setItem('nis-tema','dark')` con `page.addInitScript` si te hace falta, o mira
`:root[data-theme="dark"]` en nis-tokens.css) los colores nuevos no bajan el contraste.

Responde con: la tabla de páginas/familias tocadas y qué cambió en cada una, y la salida
final del qa-browser sobre el conjunto de arriba. Sin más prosa.
