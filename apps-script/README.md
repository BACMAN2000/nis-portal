# Webhook de quizzes + devolución de Writing (Apps Script)

El mismo Apps Script (`/exec`, "NIS Quizzes endpoint") atiende **dos flujos**:

- **Quizzes** (reading/listening/writing-quiz) → registran en las hojas
  Reading / Listening / Writing y mandan correo + PDF al profesor.
- **Portal NIS — devolución del profesor de Writing** (`_sendWritingResult`) →
  manda `{ type:'writing_result', studentName, studentEmail, message, texts, … }`.

`Codigo.gs` de esta carpeta es el **código completo y corregido** del script.

## Qué corrige respecto al script anterior

1. **El comentario del profesor ahora SÍ va en el PDF y en el correo.** Antes el
   portal mandaba `type:'writing_result'` pero el script lo confundía con un
   examen de *Reading* (porque no llega `skill`), así que el `message` se perdía.
   Ahora se detecta por `type==='writing_result'` y se maneja aparte.
2. **Correo al alumno** con el comentario + nota + un **PDF que incluye el
   comentario, la nota y el texto del alumno**; **copia al profesor** con el
   mismo PDF.
3. **Archivado en Drive** en la carpeta *"Comentarios de Writing"* (la función
   `archivarWritingEnDrive_` ya se llama bien desde `handleWritingResult_`; antes
   estaba mal pegada y nunca corría).

No toca nada de Reading / Listening / quizzes.

## Cómo aplicarlo

1. Abre el proyecto en https://script.google.com con **pbaca@nordic-school.edu.pe**.
2. Selecciona todo en `Código.gs` (Ctrl+A) y **pega el contenido de
   `Codigo.gs`** de esta carpeta (reemplaza todo).
3. Guarda (Ctrl+S).
4. **Implementar → Administrar implementaciones → editar la Web App (✏️) →
   Versión: Nueva versión → Implementar.** La URL `/exec` no cambia.
5. La primera vez Google pedirá permisos nuevos (Drive + enviar correo):
   acéptalos con la cuenta pbaca@.

> El correo sale desde la cuenta que ejecuta el script. Despliega con pbaca@
> para que salga desde pbaca@. La carpeta "Comentarios de Writing" se crea sola.
