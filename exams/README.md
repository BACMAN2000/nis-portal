# Exámenes de unidad

El examen de una unidad (o de varias) con su reader, en los cuatro niveles y en
dos versiones: **práctica** y **oficial**. Lo rinde el alumno en `unit-exam.html`.

Siete partes: multiple choice · true/false · word formation · key word
transformations · word order · listening · writing.

## Dónde vive cada cosa

| Qué | Dónde | Por qué |
|---|---|---|
| El examen (con sus claves) | tabla `unit_exams` | El repo del portal es **público**. Publicado como archivo, cualquiera con la URL tendría el solucionario — la misma lección que los tests YLE el 6-sep-2026. |
| El guion del listening | tabla `unit_exam_scripts` | Dentro del examen serían las respuestas del listening escritas al lado de las preguntas. Solo profesor y admin. |
| El mp3 | bucket **privado** `exam-audio` | En el repo se podría escuchar el examen oficial la noche anterior. La página pide una URL firmada al abrirlo. |
| El candado | tabla `reader_exam_access` | La misma de los controles de lectura, con su año escolar, su alcance (`all`, `g9`, `g9-B`, `u:<id>`), su ventana horaria y sus minutos extra. **Sin fila = cerrado.** |
| Los archivos fuente | `exams/<grado>-<unidades>/*.json` | En el disco, fuera del git (`.gitignore`), para las herramientas de autoría. |

Cerrado significa que el alumno **no puede ni descargar el examen**: se lo niega
la RLS de `unit_exams`, no es solo que la pantalla no se lo enseñe. Profesor y
admin entran siempre, y ven además el guion.

El profesor abre y cierra en **Portal → 📋 Exámenes de unidad**.

## En papel

`unit-exam-print.html` pinta el **mismo** examen de la base en A4, listo para
imprimir o para guardar en PDF (Ctrl+P → Guardar como PDF). Tres documentos:

| `doc=` | Qué es |
|---|---|
| `exam` | La hoja del alumno: cabecera con nombre, clase, fecha y nota, círculos para marcar, líneas para escribir y 24 renglones para el Writing. |
| `key` | La clave, con la respuesta y su explicación, numeradas 1-39, y el guion del listening al final. |
| `script` | Solo el guion, para leerlo en voz alta si el audio falla. |

`&compact=1` deja fluir las partes en vez de empezar cada una en hoja nueva:
de 8 caras a 5. Sin él, una parte por hoja, que es como se reparte en la sala.

Se llega desde los botones **🖨️ Papel · 🔑 Clave · 🎧 Guion** que hay en cada
nivel, tanto en el panel del profesor como en el propio examen. **La página
vuelve a comprobar el rol**: trae la clave de respuestas, así que no basta con
no enseñar el botón — a una cuenta de alumno no se le sirve.

El **audio** del listening lo pone el profesor desde el examen en pantalla: en
papel no hay otra manera, y la hoja lo dice en vez de fingir que sí.

## El circuito para tocar un examen

```bash
python exams/baraja_claves.py g9-u34     # reparte las claves entre A, B, C y D
python exams/validate.py g9-u34          # revisa lo que ya nos ha mordido antes
python exams/gen_audio.py g9-u34         # graba el listening (ElevenLabs)
python exams/sube_examen.py g9-u34 > subir.sql   # y ejecutar ese SQL en la base
python exams/sube_audio.py               # necesita SUPABASE_SERVICE_KEY
```

Sin los dos últimos pasos el cambio se queda en el disco y el alumno sigue
viendo el examen viejo.

`python exams/prueba_local.py teacher | student-open | student-locked` genera
`_test-unit-exam.html`, una copia del motor con un Supabase de mentira: sirve
para recorrer el examen entero sin tocar la base ni los datos de ningún alumno.

## Lo que comprueba `validate.py`

- Que cada parte tenga el tipo y los campos que el motor sabe pintar. **Si se
  añade un tipo nuevo, hay que añadir su rama al render** de `unit-exam.html`.
- Que ninguna *word formation* acepte la palabra que se da en MAYÚSCULAS.
- Que las transformaciones caben en el límite de palabras del nivel
  (2-4 en A2, 2-5 en B1 y B2, **3-6 en C1**), contando la palabra clave.
- Que la clave no caiga siempre en la misma letra.
- Que las de ordenar palabras usen exactamente las palabras dadas.
- Que exista el guion del listening y su mp3.

## Nota sobre el audio

La cuota de ElevenLabs se agota. `gen_audio.py --edge` graba con las voces
en-GB gratuitas que ya usan los readers y los mocks; cuando la cuota vuelva,
`--force` rehace el mp3 con ElevenLabs.
