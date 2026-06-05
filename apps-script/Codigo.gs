/**
 * Portal NIS — Webhook de Writing (Google Apps Script)
 * ----------------------------------------------------
 * Recibe los resultados/comentarios de "Calificar Writing" del portal y:
 *   1) Envía un correo al alumno (con copia al profesor).
 *   2) Archiva una copia en Google Drive, en la carpeta "Comentarios de Writing".
 *
 * IMPORTANTE sobre el remitente del correo:
 *   MailApp envía SIEMPRE desde la cuenta que autoriza/posee este script.
 *   Para que el correo salga desde pbaca@nordic-school.edu.pe, este proyecto
 *   de Apps Script debe estar abierto/desplegado con esa cuenta de Google.
 *
 * Despliegue: Implementar → Nueva implementación → Aplicación web →
 *   "Ejecutar como: Yo (pbaca@...)" y "Quién tiene acceso: Cualquiera".
 *   Copia la URL /exec y ponla en config.js -> WRITING_WEBHOOK.
 */

// Cambia este nombre si quieres otra carpeta.
var DRIVE_FOLDER_NAME = 'Comentarios de Writing';
// Copia oculta para el profesor (déjalo vacío '' si no quieres copia).
var TEACHER_BCC = 'pbaca@nordic-school.edu.pe';

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    archiveToDrive_(data);
    sendStudentEmail_(data);
    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

// Permite probar el despliegue abriendo la URL en el navegador.
function doGet() {
  return jsonOut_({ ok: true, service: 'NIS Writing webhook' });
}

/** Devuelve (o crea) la carpeta de comentarios en "Mi unidad". */
function getFolder_() {
  var it = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

/** Crea un Google Doc con el comentario + textos del alumno. */
function archiveToDrive_(d) {
  var folder = getFolder_();
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'America/Lima', 'yyyy-MM-dd HH:mm');
  var title = stamp + ' — ' + (d.studentName || 'Alumno') + ' — ' + (d.examTitle || 'Writing');

  var doc = DocumentApp.create(title);
  var body = doc.getBody();
  body.appendParagraph(d.examTitle || 'Writing').setHeading(DocumentApp.ParagraphHeading.HEADING1);

  body.appendParagraph('Alumno: ' + (d.studentName || '') + '  ·  ' + (d.studentEmail || ''));
  if (d.grade) body.appendParagraph('Grado/sección: ' + d.grade);
  if (d.level) body.appendParagraph('Nivel: ' + d.level);
  body.appendParagraph('Profesor: ' + (d.teacherName || '') );
  body.appendParagraph('Fecha: ' + stamp);

  if (d.graded && d.percent != null) {
    body.appendParagraph('Nota: ' + d.score + ' / ' + d.total + '  (' + d.percent + '%)');
    if (d.task1Score != null) body.appendParagraph('Task 1: ' + d.task1Score + ' / ' + d.task1Total +
      '   ·   Task 2: ' + d.task2Score + ' / ' + d.task2Total);
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
  // Mover el doc recién creado (nace en "Mi unidad") a la carpeta.
  var file = DriveApp.getFileById(doc.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);
}

/** Envía el correo al alumno. Sale desde la cuenta que ejecuta el script. */
function sendStudentEmail_(d) {
  if (!d.studentEmail) return;
  var subject = 'Tu Writing — ' + (d.examTitle || '') +
    (d.graded && d.percent != null ? ' (' + d.percent + '%)' : '');

  var lines = [];
  lines.push('Hola ' + (d.firstName || d.studentName || '') + ',');
  lines.push('');
  if (d.graded && d.percent != null) {
    lines.push('Resultado: ' + d.score + ' / ' + d.total + '  (' + d.percent + '%)');
    lines.push('');
  }
  lines.push(d.message || '');
  lines.push('');
  lines.push('— ' + (d.teacherName || 'Tu profesor') + ', ' + (d.schoolName || 'Nordic International School of Lima'));

  var opts = {};
  if (TEACHER_BCC) opts.bcc = TEACHER_BCC;
  // name = nombre visible del remitente.
  opts.name = (d.teacherName || 'Nordic International School');

  MailApp.sendEmail(d.studentEmail, subject, lines.join('\n'), opts);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
