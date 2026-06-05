/**
 * AÑADIR a tu Apps Script actual (NO reemplaces nada).
 * Esto solo agrega el archivado en Drive para Writing. El correo lo sigue
 * enviando tu código actual, tal cual está hoy.
 *
 * PASO 1 — Pega TODO este bloque al final de tu proyecto (Codigo.gs).
 * PASO 2 — En tu función doPost, después de que parseas el cuerpo a un objeto
 *          (por ejemplo `var data = JSON.parse(e.postData.contents);`), añade
 *          UNA línea:
 *
 *              archivarWritingEnDrive_(data);
 *
 *          Ponla dentro de un try/catch o tal cual; si algo falla, no afecta
 *          al correo. Solo actúa cuando type === 'writing_result'.
 * PASO 3 — Guarda y vuelve a Implementar (Implementar → Gestionar
 *          implementaciones → editar la actual → Nueva versión → Implementar).
 *          La primera vez Google pedirá permiso de Drive: acéptalo con pbaca@.
 *
 * La carpeta "Comentarios de Writing" se crea sola en Mi unidad.
 */

var NIS_DRIVE_FOLDER = 'Comentarios de Writing';

function archivarWritingEnDrive_(d) {
  if (!d || d.type !== 'writing_result') return;   // solo Writing
  try {
    var it = DriveApp.getFoldersByName(NIS_DRIVE_FOLDER);
    var folder = it.hasNext() ? it.next() : DriveApp.createFolder(NIS_DRIVE_FOLDER);

    var tz = Session.getScriptTimeZone() || 'America/Lima';
    var stamp = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm');
    var doc = DocumentApp.create(stamp + ' — ' + (d.studentName || 'Alumno') + ' — ' + (d.examTitle || 'Writing'));
    var body = doc.getBody();

    body.appendParagraph(d.examTitle || 'Writing').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Alumno: ' + (d.studentName || '') + '  ·  ' + (d.studentEmail || ''));
    if (d.grade) body.appendParagraph('Grado/sección: ' + d.grade);
    if (d.level) body.appendParagraph('Nivel: ' + d.level);
    body.appendParagraph('Profesor: ' + (d.teacherName || ''));
    body.appendParagraph('Fecha: ' + stamp);

    if (d.graded && d.percent != null) {
      body.appendParagraph('Nota: ' + d.score + ' / ' + d.total + '  (' + d.percent + '%)');
      if (d.task1Score != null) {
        body.appendParagraph('Task 1: ' + d.task1Score + ' / ' + d.task1Total +
          '   ·   Task 2: ' + d.task2Score + ' / ' + d.task2Total);
      }
    } else {
      body.appendParagraph('Estado: comentario (sin nota todavía)');
    }

    body.appendParagraph('Comentario del profesor').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(d.message || '(sin comentario)');

    var texts = Array.isArray(d.texts) ? d.texts : [];
    if (texts.length) {
      body.appendParagraph('Texto(s) del alumno').setHeading(DocumentApp.ParagraphHeading.HEADING2);
      texts.forEach(function (t) {
        body.appendParagraph((t.label || 'Task') + (t.wordCount != null ? '  (' + t.wordCount + ' palabras)' : ''))
            .setHeading(DocumentApp.ParagraphHeading.HEADING3);
        body.appendParagraph(t.text || '(sin respuesta)');
      });
    }

    doc.saveAndClose();
    var file = DriveApp.getFileById(doc.getId());
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);   // mover (no dejar copia en Mi unidad)
  } catch (err) {
    // No interrumpir el correo si Drive falla.
    console.error('archivarWritingEnDrive_ error: ' + err);
  }
}
