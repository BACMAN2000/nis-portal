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
