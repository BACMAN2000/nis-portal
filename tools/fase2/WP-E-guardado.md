# WP-E · Todo se guarda en la cuenta del alumno (Fase 3) — especificación

Repo: `C:\Projects\nis-portal`. No ejecutes git (yo commiteo). Conserva finales de línea.
No toques `app.js`, `brand.css`, `nis-*.js`, `activity-save.js`, `i18n/`. Comentarios en
español. Servidor local con el árbol: **http://localhost:9178/**.

## Contexto

`activity-save.js` (léelo entero, 590 líneas) expone `window.NIS_WORK` y guarda el trabajo
del alumno en `unit_submissions` con `milestone 'a:<slug>'`, borrador/entrega, y mide el tiempo
con la pestaña visible. 290 páginas ya lo usan. Cómo se engancha una página, según su motor:

- estado propio en memoria → `NIS_WORK.attach({slug,title,read,write,after})` + `NIS_WORK.touch()`
  en su `save()` (mira `crossword-u4w1.html` como modelo: busca `NIS_WORK.attach`);
- motor que guarda en localStorage con prefijo → `NIS_WORK.porPrefijo('pref:', {…})`
  (modelo: `reader.html`, busca `porPrefijo`);
- motor que reporta resultados por `NISACT.submit` → `NIS_WORK.porResultados({…})`.
Las páginas cargan `config.js`, `anticheat.js` (define `NISACT`), `activity-save.js` (con
`?v=`; pon `?v=0`, el hook del repo lo sella al commitear) y opcionalmente `writing-trace.js`.
El grado NO se escribe a mano: `activity-save.js` lo deduce del nombre del archivo o del alumno.

## Páginas que hoy NO guardan nada en Supabase (solo localStorage o nada)

1. `collocations-app/index.html`, `idioms-app/index.html`, `phrasal-app/index.html`,
   `word-formation-app/index.html` — comparten el motor `lexapp.js` (raíz). Engánchalo UNA
   vez en el motor (o en cada index si el motor no sabe su nombre): al terminar un bloque de
   diez, `NISACT.submit({activity:'<app>', title:'<app> · <nivel> · bloque N', level, score,
   total, duration})` si existe `NISACT`, y `NIS_WORK.attach` con el progreso (qué bloques
   están hechos y con qué acierto) para que se vea en Mi progreso. Las cuatro páginas deben
   cargar `../config.js`, `../anticheat.js` (con `data-activity`), `../activity-save.js` como
   hacen `phonics/index.html` y `pronunciation-coach/index.html` (mira cómo cargan la ruta
   relativa `../`).
2. `dictionary-app/index.html` — solo consulta; no se guarda nada (déjalo).
3. `phonics/index.html`, `pronunciation-coach/index.html` — ya cargan config/anticheat pero no
   guardan: al terminar una actividad (sonido practicado, frase grabada/evaluada) → `NISACT.submit`
   con score/total si lo hay; y `NIS_WORK.attach` con lo practicado.
4. `rhymes.html` — rimas con audio: cuando el alumno marca una rima como aprendida o la
   escucha entera, `NIS_WORK.attach` (lista de rimas escuchadas/aprendidas).
5. `games-lab.html` — juegos por tema (quiz, gap-fill, word search, time attack): al terminar
   un juego → `NISACT.submit({activity:'games-lab', title:'<tema> · <juego>', score, total,
   duration})`. Ojo: se embebe en un iframe dentro del portal; `NIS_WORK`/`NISACT` funcionan
   en iframe (no dependen de nis-nav).
6. `live-quiz.html` — guarda el ranking en `quiz_results` sin `student_id`. Si hay sesión del
   portal (mira cómo `activity-save.js` obtiene el alumno: `getStudent()` / token de
   localStorage `sb-*-auth-token`), al terminar la partida haz además un
   `activity_attempts.insert({student_id, activity:'live-quiz', title:'<quiz> · <n> players',
   score, total, duration_sec})` con el cliente de Supabase que la página ya crea. Sin sesión,
   como hoy.
7. `pizarra.html` y `corrector.html` son herramientas del profesor: no se tocan.

Cada página se prueba en http://localhost:9178/<página> con Chrome (`tools/qa/qa-browser.js`
con filtro por nombre, o abriéndola): 0 excepciones JS, y en consola no debe aparecer ningún
error de `NIS_WORK`/`NISACT`. Sin sesión, `activity-save.js` avisa «Not signed in» y no rompe:
eso es lo esperado.

Responde con la tabla: página → qué se guarda (tabla, slug, cuándo) → cómo lo probaste.
