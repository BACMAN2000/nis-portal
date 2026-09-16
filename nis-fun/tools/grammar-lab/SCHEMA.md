# Grammar Lab — esquema de un tema (content/<level>/grammar/<id>.json)

Un tema = un archivo JSON. Todo el texto en inglés británico, registro de
coursebook para adolescentes de 15-17 años (B2) o 16-17 (C1). NUNCA se
menciona el grado escolar (ni "Grade 10" ni "G11"): solo el nivel.

```json
{
  "id": "mixed-conditionals",            // = nombre del archivo, kebab-case
  "level": "b2f",                        // b2f | c1a
  "area": "Conditionals & hypothesis",   // el área del índice, tal cual
  "title": "Mixed conditionals",
  "tagline": "One sentence, max 90 chars: what it does.",
  "cefr": "B2",                          // B2 | C1 (o "B2+" / "C1+")
  "exam": ["Reading & Use of English Part 4 — key word transformations", "Writing Part 1 — essay"],
  "why": "2-3 sentences. Why it matters at this level and where the exam tests it. Concrete.",
  "diagrams": [ ... 2 a 3 diagramas, ver tipos abajo ... ],
  "form": {
    "formula": [                          // los bloques de la estructura, en orden
      {"chip": "If", "tone": "kw"},
      {"chip": "past perfect", "tone": "a", "ex": "had studied"},
      {"chip": "→", "tone": "arrow"},
      {"chip": "would + infinitive", "tone": "b", "ex": "would be"}
    ],
    "table": {                            // opcional pero recomendado
      "head": ["Pattern", "Condition", "Result", "Meaning"],
      "rows": [["Past → present", "If + past perfect", "would + infinitive", "a past cause with a present result"]]
    }
  },
  "use": [                                // 3-4 usos; en total 8-12 ejemplos
    {"point": "A past cause with a present result",
     "examples": [
       {"text": "If she <b>had taken</b> the job, she <b>would be</b> living in Lima now.", "note": "past decision → present situation"},
       {"text": "...", "note": "..."}
     ]}
  ],
  "watch_out": [                          // 4-6 errores típicos
    {"wrong": "If I would have known, I would be there.", "right": "If I <b>had known</b>, I would be there.", "why": "No <i>would</i> in the if-clause."}
  ],
  "dialogue": {
    "title": "Late for the match",
    "context": "One sentence: who, where, what is going on.",
    "lines": [                            // 8-12 líneas; la estructura aparece ≥5 veces, marcada con <b>
      {"speaker": "Sofia", "text": "If you <b>had set</b> an alarm, we <b>wouldn't be</b> running now."},
      {"speaker": "Liam", "text": "..."}
    ]
  },
  "practice": [
    {"type": "mc", "instructions": "Choose the correct option.",
     "items": [{"sentence": "If they had left earlier, they ___ here by now.", "options": ["are", "would be", "would have been"], "answer": 1, "why": "present result → would + infinitive"}]},
    {"type": "gap", "instructions": "Complete with the correct form of the verb in brackets.",
     "items": [{"sentence": "If I ___ (not/miss) the bus, I wouldn't be so tired now.", "answers": ["hadn't missed", "had not missed"]}]},
    {"type": "transform", "instructions": "Complete the second sentence so that it means the same as the first, using the word given. Use between two and five words.",
     "items": [{"first": "She didn't study medicine, so she isn't a doctor now.", "key": "WOULD", "second_start": "If she had studied medicine, she", "second_end": "a doctor now.", "answers": ["would be"]}]}
  ],
  "summary": ["3-5 frases cortas: lo que hay que llevarse."]
}
```

## Cantidades mínimas (las comprueba tools/grammar-lab/valida.py)
- diagrams: 2-3 · use: 3-4 puntos con 8-12 ejemplos en total · watch_out: 4-6
- dialogue.lines: 8-12 · practice: los 3 bloques (mc ≥6 ítems, gap ≥6, transform ≥5)
- `answer` es un índice válido; las claves de mc NO pueden caer >50 % en la misma letra
- en `gap`, `answers[0]` es la forma que se muestra como corrección
- nada de "Grade N" / "grade 10" / "G11" en ningún campo

## Diagramas (los pinta el motor; usar solo estos tipos)
1. timeline — `{"type":"timeline","title":"...","marks":[{"at":"past","label":"she didn't take the job","sub":"past perfect"},{"at":"now","label":"she isn't in Lima","sub":"would + infinitive"}],"arrows":[[0,1,"cause → result"]],"caption":"..."}`
   `at` ∈ before-past | past | now | future. 2-4 marcas, 0-2 flechas.
2. formula — `{"type":"formula","title":"...","parts":[{"chip":"If","tone":"kw"},{"chip":"past perfect","tone":"a","ex":"had gone"},{"chip":"→","tone":"arrow"},{"chip":"would + infinitive","tone":"b","ex":"would know"}],"caption":"..."}`
   `tone` ∈ kw (palabra clave) | a | b | c (partes de la estructura) | arrow.
3. contrast — `{"type":"contrast","title":"...","columns":["Third conditional","Mixed (past → present)"],"rows":[{"label":"If-clause","cells":["past perfect","past perfect"]},{"label":"Result","cells":["would have + participle","would + infinitive"]},{"label":"Time of result","cells":["past","now"]}]}` (2-3 columnas, 3-6 filas)
4. transform — `{"type":"transform","title":"...","before":{"text":"I have never seen such a mess.","hl":["never"]},"after":{"text":"Never have I seen such a mess.","hl":["Never","have I"]},"steps":["Move the negative adverbial to the front.","Invert the auxiliary and the subject."]}`
5. map — `{"type":"map","title":"...","center":"Modal verbs","branches":[{"label":"Obligation","items":["must","have to"],"tone":"a"},{"label":"Advice","items":["should","ought to"],"tone":"b"}]}` (3-5 ramas)
6. scale — `{"type":"scale","title":"How sure is the speaker?","left":"impossible","right":"certain","items":[{"label":"can't have","pct":0},{"label":"might have","pct":45},{"label":"must have","pct":100}]}`

Los campos de texto admiten `<b>`, `<i>` (nada más de HTML). Las comillas van
tipográficas o escapadas; el JSON tiene que ser válido.

---

# Niveles inferiores (a1 = A1 Foundations, ket = A2, pet = B1): la caja de herramientas del maestro

Los temas de `a1`, `ket` y `pet` llevan TODO lo de arriba (mismos campos, mismas
cantidades salvo lo que se indica) MÁS los campos de esta sección. La idea:
el alumno **ve** la gramática antes de leer la regla (bloques de colores,
pasos, tarjetas de ortografía), la **oye** (todo con 🔊), la **construye**
(ordenar palabras) y la **caza** (¿bien o mal?). Registro: `ket` = 11-13 años
(frases cortas, palabras de la wordlist A2 Key, cero jerga gramatical sin
explicar: si dices "auxiliary" di también "the helper verb"), `pet` = 13-15.
`cefr` de cada tema: "A1" (a1, el nivel propio A1 Foundations: solo Grammar Lab, sin unidades), "A2" (ket) o "B1" (pet).

## Campos nuevos (obligatorios en a1, ket y pet)

```json
{
  "hook": {                                    // LA PRIMERA PANTALLA: una mini-escena con el elenco que muestra
    "text": "Mateo is late. Sofia says: <b>Where's</b> Mateo? <b>Is</b> he at home? No — look, he<b>'s</b> here!",
    "ask": "Find the three forms of <i>be</i> in the story."   // una pregunta para que el alumno lo descubra ANTES de la regla
  },
  "remember": {                                // el truco de memoria, en una nota adhesiva con 🔊
    "trick": "He, she, it — the S must fit!",  // rima, chant o frase corta (≤ 60 chars)
    "tip": "Every time you say <i>he, she</i> or <i>it</i>, listen for the S at the end of the verb."
  },
  "l1": [                                      // 3-5 trampas de traducir del español (van con watch_out, en pantalla aparte)
    {"es": "Tengo doce años.", "wrong": "I have twelve years.", "right": "I <b>am</b> twelve.", "why": "Age uses <i>be</i> in English, not <i>have</i>."}
  ],
  "can_do": [                                  // 3 frases "I can…" para el semáforo final (verde/ámbar/rojo)
    "I can say my age, my nationality and how I feel with <i>am, is, are</i>.",
    "I can ask <i>Are you…?</i> and answer <i>Yes, I am / No, I'm not</i>.",
    "I can use the short forms <i>I'm, you're, she's</i> when I speak."
  ]
}
```

## Diagramas nuevos (además de los 6 de arriba; en ket/pet usar 3 diagramas, y AL MENOS uno de estos)

7. blocks — la frase como bloques de colores (Lego). Cada palabra o grupo lleva un `role`:
   `subj` (quién) · `aux` (el verbo ayudante: am/do/does/have/will…) · `verb` · `obj` (qué/a quién) · `neg` (not/n't) · `time` · `place` · `kw` (la palabra clave del tema) · `x` (lo demás).
   `{"type":"blocks","title":"Build the sentence","legend":true,"sentences":[
      {"parts":[{"t":"She","role":"subj"},{"t":"plays","role":"verb"},{"t":"tennis","role":"obj"},{"t":"on Saturdays","role":"time"}],"note":"statement"},
      {"parts":[{"t":"She","role":"subj"},{"t":"doesn't","role":"neg"},{"t":"play","role":"verb"},{"t":"tennis","role":"obj"}],"note":"negative"},
      {"parts":[{"t":"Does","role":"aux"},{"t":"she","role":"subj"},{"t":"play","role":"verb"},{"t":"tennis","role":"obj"},{"t":"?","role":"x"}],"note":"question"}],
     "caption":"The helper <b>does</b> takes the S, so the verb goes back to <i>play</i>."}`
   2-4 frases; `note` corta (statement / negative / question / short answer…).
8. steps — cómo se construye, en 2-4 pasos numerados con ejemplo:
   `{"type":"steps","title":"How to make the question","steps":[{"label":"Start with the helper","ex":"<b>Does</b>"},{"label":"Add the person","ex":"Does <b>she</b>"},{"label":"Add the verb with NO -s","ex":"Does she <b>play</b> tennis?"}],"caption":"..."}`
9. spelling — tarjetas de regla de ortografía (2-4 reglas, 2-4 ejemplos cada una, con →):
   `{"type":"spelling","title":"Adding -s","rules":[{"rule":"Most verbs: + s","examples":["play → play<b>s</b>","eat → eat<b>s</b>"]},{"rule":"-s, -sh, -ch, -x, -o: + es","examples":["watch → watch<b>es</b>","go → go<b>es</b>"]},{"rule":"consonant + y: y → ies","examples":["study → stud<b>ies</b>"]}],"caption":"..."}`

## Práctica en los niveles inferiores (sustituye a los 3 bloques de arriba)

- `a1` y `ket`: **mc ≥6 · gap ≥6 · order ≥5 · spot ≥6**  (nada de transform)
- `pet` (B1): **mc ≥6 · gap ≥6 · order ≥5 · transform ≥5** (transform tipo B1: 1-3 palabras, frases sencillas)

```json
{"type":"order","instructions":"Put the words in order. Tap them one by one.",
 "items":[{"words":["plays","She","tennis","on Saturdays","."],"answer":"She plays tennis on Saturdays."}]}
```
`words` son las piezas desordenadas (2-8 piezas; un grupo como "on Saturdays" puede ir junto; el signo final "." o "?" es una pieza aparte). `answer` = las piezas en orden unidas por espacio (el motor quita el espacio antes de . ? !). Las piezas de `words` tienen que ser EXACTAMENTE las de `answer` (mismo multiconjunto). No dejes `words` ya en orden.

```json
{"type":"spot","instructions":"Right or wrong? Tap ✓ or ✗. If it is wrong, say the right sentence.",
 "items":[{"sentence":"She play tennis on Saturdays.","ok":false,"fix":"She play<b>s</b> tennis on Saturdays.","why":"he/she/it → -s"},
          {"sentence":"They don't like fish.","ok":true,"why":"they → don't + base verb"}]}
```
≈ mitad `ok:true`, mitad `ok:false` (nunca más del 65 % de un tipo); los `false` llevan `fix` con la corrección en `<b>`.

## Cantidades en ket/pet (las comprueba valida.py)
- diagrams: exactamente 3, ≥1 de tipo blocks/steps/spelling · use: 3-4 puntos con **10-14 ejemplos** (cada ejemplo con `note` en palabras llanas)
- watch_out: 4-6 · l1: 3-5 · dialogue.lines: 6-12 (a1, ket) / 8-12 (pet), con la estructura ≥5 veces en `<b>` · can_do: exactamente 3 · summary: 3-5
- `hook.text` ≤ 320 chars, con la estructura en `<b>` ≥2 veces; `remember.trick` ≤ 60 chars
- `exam`: 1-3 partes reales del examen (ket: A2 Key for Schools; pet: B1 Preliminary for Schools)
- El elenco: Mateo, Sofia, Liam, Nadia (alumnos) y Miss Vega (profesora). Nova es el guía del motor y NO habla en los diálogos.
