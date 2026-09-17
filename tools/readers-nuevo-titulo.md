# Cómo entra un título nuevo en los readers del portal

Cada obra que se suma a 📚 Library llega **entera**: cuatro niveles (A2 · B1 ·
B2 · C1), C2, las 22 actividades del motor por capítulo, los bloques extra
(autor, personajes, gramática, Cambridge, Trinity, Surf the net, Values), el
examen por capítulo y el audio del read-along. Nada a medias: un nivel sin
audio ni siquiera aparece en el selector (`readers-levels.js` lo decide).

Validar siempre con `node tools/valida_reader.js <id> <capítulos>` antes de
registrar nada. Cero errores o no se publica.

## 0. Derechos: dos recetas según la obra

| | Dominio público (Twain, Stevenson, Wilde…) | Con derechos (Bradbury, Golding, Lowry…) |
|---|---|---|
| A2 · B1 · B2 | adaptación propia («adapted by Paolo Baca») | **narración al nivel** de cada capítulo, en nuestras palabras, sin diálogos ni frases del original |
| C1 | el original abreviado | la narración completa en registro avanzado + análisis literario (temas, técnica, contexto) |
| C2 | el original íntegro en `<id>-original.js` | plan de lectura del **libro físico**: comprarlo o leerlo en la biblioteca del colegio (sin `-original.js`) |
| READINGS | el texto de la obra | la narración (220–1.000 palabras por capítulo según nivel) |
| ILLUS / PICS | grabados de dominio público | no hay (las tarjetas se ocultan solas) |
| `lead` | «adapted by…» / «the original text» | «reading companion · read the book in your hands» |

Con obras protegidas **no se copia ni una frase**: nada de diálogo, ninguna
cita literal (ni en `think.quote`: ahí va la descripción de un momento), nada
que sea el libro reescrito párrafo a párrafo. Se cuenta la historia entera,
en orden, con lo que sienten y quieren los personajes, pero como la contaría
un profesor, no como la escribió el autor: es más corta que una adaptación
con licencia y no la sustituye. El alumno lee **su ejemplar** (comprado o de
la biblioteca del colegio), y cada capítulo dice qué tramo cubre (`span`).

## 1. Archivos que se crean

```
<id>-data-a2.js   <id>-data-b1.js   <id>-data-b2.js   <id>-data-c1.js
<id>-extras.js
```

`<id>` = solo letras minúsculas (`/^[a-z]+$/`): las claves de
`activity_attempts` son `<id>-<nivel>-ch<N>-<act>` y el informe las parte
con `[a-z]+`. Nada de dígitos ni guiones.

**Mismo número de capítulos en los cuatro niveles** (`reader_exam_access`, el
informe de notas y el candado examen↔lectura lo dan por hecho). Si la obra no
trae capítulos cómodos, se agrupan en unidades (The Giver: 23 capítulos → 8
unidades; Fahrenheit 451: 3 partes → 8 unidades).

### 1.1 `<id>-data-<nivel>.js`

```js
window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"…", unit:1, span:"Part One, from the opening to …",   // span solo en obras con derechos
    sum:"Resumen de 2-4 frases (alimenta el hub y el modelo de Summarize).",
    vocab:[["WORD","definition"], …],           // 10-12 · MAYÚSCULAS A-Z, 3-12 letras, SIN espacios
    comp:[["Question?",["a","b","c","d"],idx,"why"], …],   // exactamente 8
    tf:[["Statement.",true,"why"], …],                     // exactamente 6
    rw:[["Statement.",0|1|2,"Right/Wrong/Doesn't say — why"], …],  // 6-8, al menos un 2
    halves:[["beginning","ending."], …],                   // 6-8
    odd:[[["a","b","c","d"],idx,"why"], …],                // exactamente 5
    gaps:{title:"Grammar focus", bank:[6 palabras], items:[["Sentence with ___.","answer"] ×6]},
    wordform:[["noun","adjective"] ×8],                    // solo B2 y C1
    opposites:[["word","opposite"] ×8],                    // solo B2 y C1
    think:{quote:"un momento del capítulo descrito (no citado)", question:"…", options:[3], answer:idx, note:"…"},
    writing:[{task:"…",target:"30-50 words",tips:[3],starters:[4]}, {…}]   // exactamente 2
  },
  …
];
const READINGS = {
1:[
"Párrafo 1…",
"Párrafo 2…"
],
2:[ … ]
};
const EVENTS = {
1:{ev:["Six events in order.", …6], keys:["six","key","words","from","the","events"]},
…
};
return {level:'A2', lead:'Autor · reading companion · <b>A2 elementary</b>', CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
```

Reglas que el motor impone (y el validador comprueba):

- **READINGS lo lee Python** (`ast.literal_eval` en `gen_reader_audio.py` y
  `_check_readers_audio.py`): claves numéricas, cadenas con comillas dobles,
  sin `true/false/null`, sin comentarios, sin plantillas. Empieza en la línea
  `const READINGS = {` y acaba en una línea `};` sola.
- **Al menos 6 palabras del `vocab` aparecen en READINGS** del mismo capítulo:
  el Listening saca sus huecos de ahí.
- **Cada `keys` de EVENTS aparece en alguno de sus `ev`**: son las palabras que
  el alumno tiene que usar en su resumen.
- Sin `§` en los párrafos (se narra en el audio).
- Longitud del read-along por capítulo. Obra protegida (narración propia):
  A2 220–400 · B1 350–550 · B2 500–750 · C1 650–1.000 palabras. Dominio
  público (adaptación): A2 ≈400 · B1 ≈550 · B2 ≈1.000 · C1 el original.
- `gaps.title` cambia con el nivel: A2 past simple / prepositions · B1
  present perfect / modals / reported speech · B2 narrative tenses / linkers /
  passive · C1 inversion / hedging / nominalisation / concession.
- `writing.target`: A2 30–50 · B1 60–90 · B2 120–150 · C1 150–180 palabras.

### 1.2 `<id>-extras.js`

```js
window.READER_EXTRAS = {
  BIO: [3-5 párrafos],                       NUMBERS: [["1953","what it is"] ×6-8],
  CHARACTERS: [["Name","description"] ×6-10],
  CHAR_ROLES / CHAR_SECRETS / CHAR_ICONS / CHAR_IMGS: una entrada por personaje (CHAR_IMGS: null si no hay foto),
  IMG_CREDIT: "…",                           WHOSWHO: [["Who …?","Name"] ×8],
  BOOK_WORDS: [["WORD","def"] ×12],
  GRAMMAR: {title, intro, examples:[3], items:[["q",[4],idx,"why"] ×8]},
  CHAR_TASKS: [{task,target,tips:[3],starters:[4]} ×4-6],
  THEME: {emoji, plateTitle, rhyme, tokens:<capítulos>, doneLine, leftWordSingular, leftWordPlural},
  C2: {intro, source, sourceLabel, stages:[{orig, app:N, focus, qs:[2]} ×capítulos], tasks:[4 writing tasks]},
  EXAM_CH1: [["Author"|"Characters","q",[4],idx,"why"] ×8],
  OWN_COPY: {note:"…", label:"…"},           // solo obras con derechos: el aviso «lee tu ejemplar»
  KEY: {part1:{title,intro,notices:[8 × [letter,title,text]],items:[6 × [sentence,letter]]},
        part3:{title,intro,lines:[[who,text]…],bank:[10 × [letter,text]],answers:[8 letters]},
        part4:{title,intro,text:[párrafos],items:[7-9 × [s,0|1|2,why]]},
        part6:{title,intro,items:[8 × [definition,"WORD"]]},
        part7:{title,intro,text:"… (1)___ …",answers:[una por hueco]},
        part8:{title,intro,card:{title,lines,menu,foot},items:[8 × [q,answer]]}},
  TRINITY: [{grade,topic,lead,qs:[4-5]} ×3],
  SURF: [{title,intro,qs:[5-6]} ×2],
  VALUES: {cloud:[20 adjetivos], good:[los positivos], chapters:[[n,"Value","one line"] ×capítulos]}
};
```

`THEME.tokens`, `C2.stages` y `VALUES.chapters` = número de capítulos.

## 2. Dónde se registra (ocho sitios)

1. `reader.html` → `RDR_BOOKS` (y `_make_reader_engine.py`, aunque hoy no regenera).
2. `app/40-marking.js` → `READER_META` (icon, title, short, chapters).
3. `app/61-student-classes.js` → `READER_CARDS` (la tarjeta de Library).
4. `attwn-exam.html` → `READERS` (levels, chapters, prefix, extras).
5. `_check_readers_audio.py` → `LIBROS`.
6. `gen_reader_audio.py` → `VOICES`.
7. `.gitignore` → `<id>-audio/` (el audio no viaja en el repo).
8. `tools/qa/qa-static.js` → `gitignoredMedia` (si no, el QA cuenta el audio como referencia rota).

## 3. Audio y publicación

```
python gen_reader_audio.py <id> a2   (b1, b2, c1)      # edge-tts, gratis
python _check_readers_audio.py --escribe               # reescribe readers-levels.js
tar cf - <id>-audio | ssh root@204.168.174.160 "tar xf - -C /opt/nis-media/"
```

En el servidor, nginx necesita `location ^~ /<id>-audio/ { alias /opt/nis-media/<id>-audio/; }`
en `/etc/nginx/sites-available/nis.cohasset.pe` **y** en `sites-enabled/` (es una
copia, no un enlace); sin `^~` la regex de `.mp3` gana y busca en el repo. El
respaldo del archivo NO se deja dentro de `sites-enabled/` (nginx incluye `*` y
avisa de `server_name` duplicado). `nginx -t && systemctl reload nginx`, y
`curl -I` a un `ch1-p1.mp3` en vivo **antes** del push. Si un texto cambia
después de generar su audio, borrar los `chN-*` de ese capítulo y relanzar el
generador (solo rehace lo que falta). Luego `npm run qa` en `tools/qa`, abrir
las tres URLs (`?book=<id>`, `&level=b1`, `&level=c2`) y push.

La obra aparece en 📚 Library para todos; qué salón la lee lo elige el
profesor o el admin ahí mismo (`reader_assignments`, una obra por trimestre).

## 4. Reparto del trabajo

Opus decide la unidad de cada libro, el `span` y la receta; los archivos los
producen subagentes **Sonnet** (uno por nivel y otro para extras) a partir de
este documento y del plan de unidades del título; Opus revisa el piloto,
lanza el resto y valida. Un archivo de 12 capítulos no cabe en una sola
escritura (límite de 64k tokens de salida por llamada): el agente lo escribe
por partes (capítulos de 4 en 4, READINGS en dos mitades, EVENTS al final).
Al terminar, buscar frases célebres de la obra en los archivos (`grep -i`):
los agentes las evitan, pero el plan de Opus puede colarlas sin querer. Los prompts van con: id, título, autor, el plan de
unidades (n, title, span, qué pasa), el nivel, la receta de derechos y la
orden de ejecutar el validador antes de terminar.
