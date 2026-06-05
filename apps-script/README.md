# Webhook de Writing (correo + archivo en Drive)

El portal, al pulsar **"📧 Enviar resultado al alumno"** en *Calificar Writing*,
hace dos cosas:

1. **Guarda la nota/comentario en Supabase** (esto ya funciona en el portal).
2. **Avisa a un Google Apps Script** (la URL `WRITING_WEBHOOK` en `config.js`).
   Ese script es el que **envía el correo** y **archiva en tu Drive**.

`Codigo.gs` de esta carpeta es el código de ese script.

## Por qué hay que hacerlo en Apps Script

La web del portal es estática (GitHub Pages): no tiene servidor y **no puede
escribir en Google Drive ni enviar correo por sí sola**. Por eso esa parte vive
en Apps Script, que sí corre con tu cuenta de Google.

## Pasos para activarlo (una sola vez)

1. Inicia sesión en Google con **pbaca@nordic-school.edu.pe** (así el correo
   sale desde tu dirección y la carpeta se crea en *tu* Drive).
2. Abre el proyecto de Apps Script que ya usa el portal. La URL del webhook en
   `config.js` es:
   `https://script.google.com/macros/s/AKfycbzwn09Be0ZfKxGpwgkjLdp7nIs7awq8h7SVKkMlWN4EjekkOFqpLmnChzGHN_bB6kN-/exec`
   - Si tienes el proyecto: ábrelo en https://script.google.com (Mis proyectos).
   - Si no lo encuentras, crea uno nuevo en https://script.google.com y luego
     reemplaza la URL `WRITING_WEBHOOK` en `config.js` por la nueva (sube 1 a
     `config.js?v=` en `index.html` para refrescar caché).
3. Pega el contenido de **`Codigo.gs`** (reemplaza lo que haya).
4. Guarda. Luego **Implementar → Nueva implementación → Aplicación web**:
   - *Ejecutar como:* **Yo (pbaca@nordic-school.edu.pe)**
   - *Quién tiene acceso:* **Cualquiera**
   - Copia la URL `/exec`.
5. Si la URL cambió respecto a la de `config.js`, pega la nueva ahí y vuelve a
   desplegar el portal (commit + push). Si es la misma, no hay que tocar nada.
6. La primera vez Google pedirá **autorizar permisos** (enviar correo + Drive).
   Acéptalos con la cuenta pbaca@.

La carpeta **"Comentarios de Writing"** se crea sola en *Mi unidad* la primera
vez que envíes un comentario. Cada envío deja un Google Doc con el comentario,
la nota (si la hay) y el/los texto(s) del alumno.

> Nota: el correo se envía **desde la cuenta que despliega el script**. Para que
> salga desde pbaca@, despliega con esa cuenta. `MailApp` no permite falsificar
> otro remitente.
