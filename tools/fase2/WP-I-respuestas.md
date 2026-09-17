# WP-I · Cada intento guarda las respuestas (Fase 3) — especificación

Repo: `C:\Projects\nis-portal`. No git. Conserva finales de línea (Python `newline=''` o Edit tool).
Tocas SOLO las seis familias de juegos generadas (`crossword-*.html`, `wordsearch-*.html`,
`word-sudoku-*.html`, `word-invaders-*.html`, `say-it-right-*.html`, `voice-battle-*.html`, EN y FR,
más `crosswords.html`, `crosswords-fr.html`, `wordsearches.html`, `wordsearches-fr.html`, `word-sudoku.html`,
`crossword-digital-footprint.html`, `crossword-mind-over-matter.html`, `wordsearch-digital-footprint.html`,
`wordsearch-mind-over-matter.html`) y `unit-exam.html`, `attwn-exam.html`, `reader.html`, `grammar-lab.html`.

## Problema

`activity_attempts` tiene 614 filas y **ninguna guarda las respuestas**: solo `score/total`. La columna
`detail jsonb` existe (solo unit-exam la usa, y agregada por parte). El profesor no puede ver qué contestó
el alumno ni dónde falló. La columna `activity` de los juegos es un literal (`'crossword'`) sin grado, unidad
ni semana.

## Qué hacer

Cada `NISACT.submit({...})` de esas páginas añade dos cosas:

1. **`detail`**: objeto con lo que el alumno hizo en ese intento, compacto (≤ 8 KB):
   - crossword / wordsearch: `{items:[{id, answer, correct, ok}]}` (cada pista/palabra: lo escrito, lo correcto, acierto);
   - word-sudoku: `{grid:[...filas como cadenas], word, hints}`;
   - word-invaders / say-it-right / voice-battle: `{items:[{word, ok, attempts?}]}` con las palabras acertadas/falladas;
   - unit-exam: además del agregado por parte, `items:[{part, n, given, correct, ok}]` (las filas HTML ya lo pintan
     en pantalla; persístelas — recórtalo a 200 ítems);
   - attwn-exam: `items:[{n, given, correct, ok}]`;
   - reader.html: lo que ya manda cada actividad de capítulo + `items` si hay respuestas por ítem;
   - grammar-lab: `items` con las respuestas del alumno.
   Mira cómo el propio juego sabe qué es correcto (la comprobación ya existe: úsala, no la reimplementes).
2. **`meta`** dentro de `detail`: `{grade, unit, week, slug}` deducidos del nombre del archivo
   (`crossword-fr-g5-u4w1` → grade 'g5', unit 4, week 1, lang 'fr'; `crossword-u4w1` → grade 'g9' (los EN de U4 son
   de 9.º), unit 4, week 1). Si el archivo no lo dice, lo que `NIS_WORK` ya dedujo (mira `activity-save.js`
   `slug`/`grade`) o `null`. NO cambies el valor de `activity` ni `title` (los paneles filtran por ellos).

El inserto va a `activity_attempts.detail` (jsonb): en cada página, `NISACT.submit` construye el objeto que se
inserta — añade `detail` ahí (busca `.from('activity_attempts').insert(` en la página). Si `detail` no cabe
(> 8 KB), recórtalo (quita `given` largos) antes que fallar.

Como son familias generadas, el motor de cada familia es idéntico entre copias: aplica el mismo cambio literal a
toda la familia y comprueba con `grep -c` que el número de archivos cambiados es el de la familia. Para las
páginas sueltas (`unit-exam.html`, `attwn-exam.html`, `reader.html`, `grammar-lab.html`), edición a mano.

## Verificación

- `node tools/qa/qa-static.js` (desde `tools/qa`): 0 «JS syntax (inline)».
- Servidor local http://localhost:9178/: abre una página de cada familia con Chrome (`tools/qa/qa-browser.js`
  con filtro), y en una de ellas completa el juego por consola (o llama a la función que reporta) con
  `window.NISACT.submit = o => { window.__last = o; }` puesto antes, y pega en tu respuesta el `detail`
  resultante de crossword, word-invaders y unit-exam (con `?grade=g9&units=4&kind=practice&level=b1`).

Responde con: la tabla familia → forma de `detail` → nº de archivos cambiados, y los tres `detail` de ejemplo.
