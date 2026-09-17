# Traducción EN → ES de la interfaz del portal NIS (Nordic International School, Lima)

Recibes un archivo `lote-N.json`: un array JSON de cadenas en inglés tal como aparecen en la
interfaz (botones, títulos, avisos, rúbricas que lee el alumno, descriptores de nivel).
Debes escribir `lote-N.es.json`: un **objeto JSON** `{ "cadena inglesa exacta": "traducción" }`
con TODAS las cadenas del lote como claves (copiadas carácter a carácter, sin recortar espacios
ni emojis). Solo se escribe ese archivo; no se toca ningún otro.

## Reglas

1. **Registro:** español de colegio peruano, natural, sin traducción literal forzada. Al alumno se le
   habla de tú («Escribe tu respuesta»). Mayúscula solo inicial en títulos («Examen de unidad», no
   «Examen De Unidad»).
2. **Glosario fijo** (respétalo siempre):
   student → alumno · teacher → profesor · school leadership → dirección · Sign in → Entrar ·
   Sign out → Salir · Mark (calificar) → Corregir · marked/pending → corregido/pendiente ·
   submission → entrega · hand in → entregar · worksheet → ficha · unit exam → examen de unidad ·
   mock exam → simulacro · practice test → test de práctica · term → bimestre · grade (nota) → nota ·
   grade (curso, G5) → grado · score → puntaje · lives → vidas · hint → pista · level → nivel ·
   reader (libro) → lectura · Screen time → Tiempo de pantalla · Overview → Resumen ·
   Marking → Corrección · Tracking → Seguimiento · Access → Accesos · Classes → Clases ·
   Library → Biblioteca · Unit products → Productos de unidad · Writing trace → Rastro de escritura ·
   Honesty → Honestidad · Family → Familia · week → semana · unit → unidad · day → día.
3. **No se traducen:** AD/A/B/C, MOCK, Fun for Nordic, Toddle, NIS, Nordic, Cambridge, los nombres de
   exámenes (Starters, Movers, Flyers, A2 Key, KET, B1 Preliminary, PET, B2 First, FCE, C1 Advanced,
   CAE, C2 Proficiency, CPE, YLE), las destrezas cuando son nombres de paper (Reading, Listening,
   Writing, Speaking, Use of English), los nombres de unidades y de libros («Mind Over Matter»,
   «The Wellbeing Generation», «And Then There Were None»), Games Lab, NIShoot, MUN, Phonics,
   Word Wheel, Grammar Lab, códigos como «G5 A», «B1», «u4w1». Dentro de una frase se dejan igual:
   «Open the B2 First course» → «Abre el curso B2 First».
4. **Se conservan tal cual** emojis, flechas (→ ← ◀ ▶ ↺ ✔ ✓), puntos suspensivos «…», números,
   unidades, etiquetas HTML sencillas (`<b>…</b>`), y marcadores como `{n}`, `%s`, `$1`. Los
   apóstrofes ingleses del original no importan; en español usa «’» tipográfico si hace falta uno.
5. Si una cadena **no es inglés** (francés, español ya), es **código** (`id,full_name`, un selector,
   una ruta) o no tiene sentido traducirla (una sigla, un nombre propio), devuelve `null` como valor.
6. Longitud parecida: son botones y rótulos; no expliques, traduce.
7. Descriptores de rúbrica («I use cohesive devices…»): primera persona, tono de autoevaluación
   («Uso conectores…»).

## Comprobación antes de terminar

- El archivo de salida es JSON válido (`node -e "JSON.parse(require('fs').readFileSync('lote-N.es.json','utf8'))"`).
- Tiene exactamente las mismas claves que el lote de entrada, ni una más ni una menos.
- Ningún valor contiene texto en inglés que debiera ir en español (salvo los nombres de la regla 3).
