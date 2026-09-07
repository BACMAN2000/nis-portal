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

## Limpiar las filas de prueba

Las comprobaciones técnicas del endpoint dejan filas reales en las hojas. Para
quitarlas sin tocar nada de un alumno, `Codigo.gs` trae dos funciones. **No hay
que desplegar nada**: son utilidades del editor, el `/exec` no cambia.

1. Pega el `Codigo.gs` de esta carpeta sobre el del script y **Guarda**.
2. Elige `listaFilasDePrueba` en el desplegable de funciones y pulsa **Ejecutar**.
3. Abre el registro (**Ver → Registros**) y comprueba que lo listado es justo lo
   que quieres borrar. No borra nada todavía.
4. Solo entonces, elige `borraFilasDePrueba` y **Ejecutar**.

Busca en las pestañas Reading, Listening y Writing las filas cuya columna
`Student` empiece por `PRUEBA CORS`, `PRUEBA ` o `TEST CORS` — la lista está en
`PREFIJOS_PRUEBA`, arriba de las funciones, por si hace falta añadir otra marca.

Borra de abajo hacia arriba a propósito: al quitar una fila las de debajo suben
un número, así que recorriendo de arriba abajo el segundo borrado caería en la
fila equivocada.
