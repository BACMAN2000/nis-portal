# Banco de pruebas del portal (QA)

Nació el 16-sep-2026 tras dos bugs que llegaron a dirección (preguntas del Listening
ilegibles por un `--bg` local; apóstrofes `\u0027` en el C1). Se corre entero antes
de dar por buena una publicación:

    cd tools/qa && npm install
    npm run qa            # estático + datasets + HTTP en vivo (≈3 min)
    npm run qa:browser    # 347 páginas en Chrome headless: excepciones, consola, contraste, móvil (≈10 min)
    py -3.12 transcribe_listening.py pares.json salida.jsonl   # audio↔guion con Whisper (≈40 min, ver val_listening.js para generar los pares)

- **Hook `pre-push`** (`tools/hooks/pre-push`, se instala con `python tools/instala_hook.py`): corre
  `qa-static.js --gate` antes de cada push y lo detiene solo si hay sintaxis JS rota, JSON que no
  parsea o referencias locales rotas (~40 s). `git push --no-verify` lo salta si el aviso es falso.
- `qa-static.js` — sintaxis de todo JS (archivos e inline, con acorn), `\u00xx`,
  entidades dobles, `${}` sin interpolar, referencias locales rotas, IDs duplicados,
  `:root` locales que pisan los tokens de tema (`--bg` oscuro en página clara),
  español residual en páginas `lang="en"`, viewport/title/lang.
- `val_reading.js` — los 100 tests de Reading & UoE: huecos del texto = preguntas,
  claves dentro de las opciones, `root` de word formation, keyword de las
  transformaciones, bancos de match.
- `val_listening.js` — los 100 tests de Listening: mp3 existe, duración ≈ palabras
  del guion, claves válidas, respuesta de cada hueco presente en el guion.
- `qa-live.js` — cada página y cada asset (1.479 URLs) responde 200 en nis.cohasset.pe.
- `qa-browser.js` — Chrome real: errores JS, consola, peticiones ≥400, texto con
  contraste < 3, desborde horizontal a 375 px. `QA_BASE=http://localhost:9133/`
  para probar el árbol local.

Falsos positivos conocidos: los relojes `clockNNN` del listening se dibujan en SVG
(no son archivos); "Speaker 1-5" de la parte 4 no aparecen literalmente en el guion;
h1 blancos sobre imagen de fondo salen como contraste 1.09.
