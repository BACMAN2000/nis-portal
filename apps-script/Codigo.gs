/**
 * NIS English Quizzes — Google Apps Script Web App (doPost endpoint)
 * ------------------------------------------------------------------
 * Maneja DOS flujos distintos por el mismo /exec:
 *   A) Quizzes (reading-quiz / listening-quiz / writing-quiz):
 *      envían name/email/skill/detail/parts/writingEvaluation...
 *   B) Portal NIS — devolución del profesor de Writing (_sendWritingResult):
 *      envía  { type:'writing_result', studentName, studentEmail, message,
 *               texts:[...], graded, score, total, percent, task1Score, ... }
 *
 * El flujo B antes se confundía con "Reading" (porque no manda `skill`), así
 * que el comentario del profesor nunca llegaba al PDF ni al alumno. Ahora se
 * detecta por `type === 'writing_result'` y tiene su propio manejo:
 *   - correo al alumno con el comentario + nota + PDF,
 *   - copia al profesor con el mismo PDF,
 *   - copia archivada en Drive (carpeta "Comentarios de Writing").
 *
 * DEPLOY: pega esto sobre Código.gs → Guardar → Implementar (Deploy) →
 * Administrar implementaciones → editar la Web App → Nueva versión → Implementar.
 * Misma URL /exec, no cambia nada en el portal ni en los quizzes.
 */

var TEACHER_EMAIL = 'pbaca@nordic-school.edu.pe';  // '' para desactivar correos
var SCHOOL_NAME   = 'NIS English';
var SEND_EMAIL    = true;

var READING_TAB   = 'Reading';
var LISTENING_TAB = 'Listening';
var WRITING_TAB   = 'Writing';

function doGet() {
  return json_({ ok: true, service: 'NIS Quizzes endpoint' });
}

function doPost(e) {
  try {
    var data = parseInput_(e);

    // ── Flujo B: devolución del profesor desde el Portal NIS ──
    if (data.type === 'writing_result') {
      handleWritingResult_(data);
      return json_({ ok: true });
    }

    // ── Flujo C: incidente de honestidad (anti-cheat) desde una actividad ──
    if (data.type === 'anticheat_incident') {
      handleAntiCheat_(data);
      return json_({ ok: true });
    }

    // ── Flujo A: quizzes ──
    var skill = data.skill || (data.breakdown ? 'Listening' : 'Reading');
    if (skill === 'Writing') {
      writeWritingRows_(data, 'Writing Quiz');
    } else {
      writeScoreRow_(skill === 'Listening' ? LISTENING_TAB : READING_TAB, data);
      var w = data.writingEvaluation || data.writingAnswers || [];
      if (w.length) writeWritingRows_(data, skill + ' (Parts 6–7)');  // A2 reading has writing
    }

    if (SEND_EMAIL && TEACHER_EMAIL) { try { sendEmails(data, skill); } catch (_) {} }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

/* Accept a JSON body (fetch) OR a form field "data" (hidden-form POST). */
function parseInput_(e) {
  if (e && e.postData && e.postData.contents) { try { return JSON.parse(e.postData.contents); } catch (_) {} }
  if (e && e.parameter && e.parameter.data)   { try { return JSON.parse(e.parameter.data); } catch (_) {} }
  return {};
}

/* ============================================================
 *  PORTAL — Devolución de Writing del profesor (type:'writing_result')
 * ============================================================ */
function handleWritingResult_(d) {
  // 1) Archivar copia en Drive (no rompe el correo si falla)
  try { archivarWritingEnDrive_(d); } catch (_) {}

  var graded = !!(d.graded && d.percent != null);
  var pdf = null;
  try { pdf = buildWritingFeedbackPdf_(d, graded); } catch (_) {}

  // 2) Correo al ALUMNO: comentario + nota + PDF
  var sEmail = d.studentEmail || '';
  if (sEmail && /^\S+@\S+\.\S+$/.test(sEmail)) {
    var sLines = ['Hi ' + (d.firstName || d.studentName || '') + ',', ''];
    if (graded) sLines.push('Result: ' + d.score + ' / ' + d.total + ' (' + d.percent + '%)', '');
    sLines.push(d.message || '', '', '— ' + (d.teacherName || 'Your teacher') + ', ' + (d.schoolName || SCHOOL_NAME));
    var sOpts = { name: (d.teacherName || SCHOOL_NAME) };
    if (pdf) sOpts.attachments = [pdf];
    MailApp.sendEmail(sEmail,
      'Your Writing — ' + (d.examTitle || '') + (graded ? ' (' + d.percent + '%)' : ''),
      sLines.join('\n'), sOpts);
  }

  // 3) Copia al PROFESOR con el mismo PDF
  if (SEND_EMAIL && TEACHER_EMAIL) {
    var tOpts = { name: SCHOOL_NAME + ' — Writing' };
    if (pdf) tOpts.attachments = [pdf];
    MailApp.sendEmail(TEACHER_EMAIL,
      '[' + SCHOOL_NAME + ' · Writing] ' + (d.studentName || '') + ' — ' + (d.level || ''),
      'Comentario enviado a ' + (d.studentName || '') + ' (' + (d.studentEmail || '') + ')\n\n' +
      (graded ? ('Nota: ' + d.score + ' / ' + d.total + ' (' + d.percent + '%)\n\n') : '') +
      (d.message || ''),
      tOpts);
  }
}

/* ============================================================
 *  ANTI-CHEAT — incidente de honestidad (type:'anticheat_incident')
 *  Se dispara en dos momentos: 'reported' (2da salida) y 'locked' (3ra,
 *  actividad eliminada + nota C). Avisa al DOCENTE, que contacta a los padres.
 * ============================================================ */
function handleAntiCheat_(d) {
  if (!SEND_EMAIL || !TEACHER_EMAIL) return;
  var locked = (d.event === 'locked');
  var tag = locked ? 'ACTIVIDAD ELIMINADA (nota C)' : 'ALUMNO REPORTADO';
  var subject = '[' + SCHOOL_NAME + ' · Honestidad] ' + tag + ' — ' +
                (d.student_name || 'Alumno') + (d.grade ? ' (' + d.grade + ')' : '');

  var snap = d.snapshot || {};
  var snapText = (snap && (snap.text || snap.essay)) ? String(snap.text || snap.essay) : '';

  var lines = [
    (locked
      ? 'Un alumno salió de la actividad 3 veces. La actividad fue ELIMINADA y su nota es C.'
      : 'Un alumno salió de la actividad por 2da vez y ha sido reportado (le queda 1 vida).'),
    '',
    'Alumno:        ' + (d.student_name || '') + '   ' + (d.student_email || ''),
    'Grado:         ' + (d.grade || ''),
    'Apoderado:     ' + (d.guardian_name || '(sin dato)') + '   Tel: ' + (d.guardian_phone || '(sin dato)'),
    'Actividad:     ' + (d.activity_label || d.activity || '') + (d.level ? ('  ·  ' + d.level) : '') + (d.topic ? ('  ·  ' + d.topic) : ''),
    'Evento:        ' + (d.event || '') + (locked ? '  (nota asignada: C)' : ''),
    'Salidas:       ' + (d.switch_count != null ? d.switch_count : '?') + '   ·   Vidas restantes: ' + (d.lives_left != null ? d.lives_left : '?'),
    (d.seconds_away != null ? ('Tiempo fuera:  ' + d.seconds_away + ' s (última salida)') : ''),
    'Equipo:        ' + (d.os || '') + '  ·  ' + (d.browser || '') + '  ·  pantalla ' + (d.screen || '') + '  ·  idioma ' + (d.language || ''),
    'Fecha:         ' + (d.at || new Date().toISOString()),
    '',
    (locked ? 'ACCIÓN: contactar a los padres del alumno para informar el incidente.' : 'Aún no se elimina la actividad; una salida más la elimina con nota C.')
  ];
  if (snapText) {
    lines.push('', '--- Texto del alumno hasta el momento del incidente ---', snapText);
  }
  lines.push('', 'Nota: el navegador NO permite ver ni capturar otras pestañas. Se registran únicamente los metadatos del evento.');

  try { MailApp.sendEmail(TEACHER_EMAIL, subject, lines.join('\n'), { name: SCHOOL_NAME + ' — Honestidad' }); } catch (_) {}
}

/* PDF de la devolución de Writing — SÍ incluye el comentario del profesor. */
function buildWritingFeedbackPdf_(d, graded) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
  var texts = Array.isArray(d.texts) ? d.texts : [];
  var textsHtml = texts.length ? ('<h3 style="margin-top:16px">Student text(s)</h3>' + texts.map(function (t) {
    return '<div style="margin:8px 0;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px"><b>' +
           esc(t.label || 'Task') + '</b>' + (t.wordCount != null ? (' <span style="color:#64748b">(' + t.wordCount + ' words)</span>') : '') +
           '<div style="white-space:pre-wrap;margin-top:4px">' + esc(t.text || '(blank)') + '</div></div>';
  }).join('')) : '';
  var scoreLine = graded
    ? ('<div style="font-size:26px;font-weight:800;color:#2d5a8d">' + d.score + ' / ' + d.total + ' (' + d.percent + '%)</div>' +
       (d.task1Score != null ? ('<div style="color:#64748b">Task 1: ' + d.task1Score + ' / ' + d.task1Total +
         '  ·  Task 2: ' + d.task2Score + ' / ' + d.task2Total + '</div>') : ''))
    : '<div style="color:#64748b">Comment (no grade yet)</div>';
  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:700px">' +
      '<div style="border-bottom:3px solid #4987c6;padding-bottom:8px;margin-bottom:14px">' +
        '<div style="font-size:13px;letter-spacing:1px;color:#636465">' + esc(d.schoolName || SCHOOL_NAME) + ' — WRITING FEEDBACK</div>' +
        '<div style="font-size:20px;font-weight:800">' + esc(d.examTitle || 'Writing') + ' · ' + esc(d.level || '') + '</div>' +
      '</div>' +
      '<table style="font-size:14px;margin-bottom:10px">' +
        '<tr><td style="padding:2px 14px 2px 0;color:#636465">Student</td><td><b>' + esc(d.studentName || '') + '</b></td></tr>' +
        '<tr><td style="color:#636465">Grade</td><td>' + esc(d.grade || '') + '</td></tr>' +
        '<tr><td style="color:#636465">Teacher</td><td>' + esc(d.teacherName || '') + '</td></tr>' +
        '<tr><td style="color:#636465">Date</td><td>' + new Date().toLocaleString() + '</td></tr>' +
      '</table>' +
      scoreLine +
      '<h3 style="margin-top:16px">Teacher\'s comment</h3>' +
      '<p style="white-space:pre-wrap;padding:10px 12px;background:#f2f3ff;border-left:4px solid #4987c6;border-radius:6px">' +
        esc(d.message || '(no comment)') + '</p>' +
      textsHtml +
    '</div>';
  var safe = ('Writing-' + (d.level || '') + '-' + (d.studentName || 'student')).replace(/[^A-Za-z0-9_\-]+/g, '_');
  return Utilities.newBlob(html, 'text/html', safe + '.html').getAs('application/pdf').setName('NIS-' + safe + '.pdf');
}

/* ---------- Reading / Listening: keeps your columns, adds Answers ---------- */
function writeScoreRow_(tabName, d) {
  var headers = ['Timestamp', 'Student', 'Email', 'Grade', 'Level', 'Level name',
                 'Exam', 'Score', 'Total', '%', 'CEFR', 'Duration (min)',
                 'Strongest', 'Weakest', 'Verdict', 'Answers'];
  var sh = getSheet_(tabName, headers);

  var grade    = d.grade || d.klass || '';
  var minutes  = d.durationMinutes || d.elapsed_min || '';
  var pct      = (d.percent != null) ? d.percent : (d.total ? Math.round(d.score / d.total * 100) : '');

  // Strongest / Weakest single part (by %), from the parts array
  var strongest = '', weakest = '';
  if (d.parts && d.parts.length) {
    var sorted = d.parts.slice().sort(function (a, b) { return b.pct - a.pct; });
    strongest = sorted[0].name + ' (' + sorted[0].pct + '%)';
    weakest   = sorted[sorted.length - 1].name + ' (' + sorted[sorted.length - 1].pct + '%)';
  }

  // Every answer
  var answers = '';
  if (d.detail && d.detail.length) {
    answers = d.detail.map(function (q) {
      return 'Q' + q.q + ': ' + stripHtml_(q.user) +
             ' (correct: ' + stripHtml_(q.correctAns) + ') ' + (q.ok ? '✓' : '✗');
    }).join('  |  ');
  } else if (d.answers) {
    answers = JSON.stringify(d.answers);  // listening stores its answers object
  }

  sh.appendRow([
    new Date(), d.name || '', d.email || '', grade, d.level || '', d.levelName || '',
    d.examTitle || d.examType || tabName, d.score, d.total,
    (pct !== '' ? pct + '%' : ''), d.cefrLabel || '', minutes,
    strongest, weakest, d.verdict || '', answers
  ]);
}

/* ---------- Writing: one row per task, full text persisted ---------- */
function writeWritingRows_(d, sourceLabel) {
  var headers = ['Timestamp', 'Student', 'Email', 'Grade', 'Level', 'Source',
                 'Task', 'Words', 'Answer', 'Provisional band (auto — verify by hand)', 'Auto notes'];
  var sh = getSheet_(WRITING_TAB, headers);
  var grade = d.grade || d.klass || '';
  var tasks = d.writingEvaluation || d.writingAnswers || [];
  tasks.forEach(function (t) {
    var band = (t.provisionalBand != null ? t.provisionalBand : t.band != null ? t.band : '');
    sh.appendRow([
      new Date(), d.name || '', d.email || '', grade, d.level || '', sourceLabel,
      t.part || t.label || t.prompt || '', t.wordCount || '',
      (t.text || ''), (band !== '' ? band + ' / 5' : ''), (t.feedback || '')
    ]);
  });
}

/* ---------- email (teacher + student) — flujo QUIZ ---------- */
function sendEmails(d, skill) {
  var grade = d.grade || d.klass || '';
  var pct = (d.percent != null) ? d.percent : (d.total ? Math.round(d.score / d.total * 100) : '');
  var tasks = d.writingEvaluation || d.writingAnswers || [];

  // --- Teacher email (full) + PDF report attached ---
  var subject = '[' + SCHOOL_NAME + ' · ' + skill + '] ' + (d.name || 'Student') + ' — ' + (d.level || '');
  var lines = ['Student: ' + (d.name || ''), 'Grade: ' + grade, 'Email: ' + (d.email || ''),
               'Level: ' + (d.level || ''), 'Exam: ' + (d.examTitle || d.examType || skill)];
  if (skill !== 'Writing' && d.score != null) lines.push('Score: ' + d.score + ' / ' + d.total + (pct !== '' ? ' (' + pct + '%)' : ''));
  if (tasks.length) {
    lines.push('', '--- Writing (mark by hand) ---');
    tasks.forEach(function (t) { lines.push('', (t.part || t.label || '') + ' [' + (t.wordCount || 0) + ' words]:', (t.text || '(blank)')); });
  }
  var opts = { name: SCHOOL_NAME + ' — Quiz Reports' };
  try {
    var pdf = buildReportPdf_(d, skill, pct, grade, tasks);
    if (pdf) opts.attachments = [pdf];
  } catch (_) {}
  MailApp.sendEmail(TEACHER_EMAIL, subject, lines.join('\n'), opts);

  // --- Student email (their own result) ---
  var sEmail = d.email || '';
  if (sEmail && /^\S+@\S+\.\S+$/.test(sEmail)) {
    var body;
    if (skill === 'Writing') {
      body = 'Hi ' + (d.name || '') + ',\n\nYour writing (' + (d.level || '') + ') has been submitted to your teacher, who will read it and give you a mark by hand.\n\nThank you!\n— ' + SCHOOL_NAME;
    } else {
      body = 'Hi ' + (d.name || '') + ',\n\nHere is your ' + skill + ' result (' + (d.level || '') + '):\n\n' +
             'Score: ' + d.score + ' / ' + d.total + (pct !== '' ? '  (' + pct + '%)' : '') + '\n';
      if (d.parts && d.parts.length) {
        body += '\nBy part:\n' + d.parts.map(function (p) { return '  • ' + p.name + ': ' + p.pct + '%'; }).join('\n') + '\n';
      }
      body += '\nWell done — keep practising!\n— ' + SCHOOL_NAME;
    }
    MailApp.sendEmail(sEmail, 'Your ' + skill + ' result — ' + SCHOOL_NAME, body);
  }
}

/* ---------- PDF report QUIZ (HTML -> PDF, attached to the teacher email) ---------- */
function buildReportPdf_(d, skill, pct, grade, tasks) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
  var parts = d.parts || (d.breakdown && d.breakdown.parts) || (Array.isArray(d.breakdown) ? d.breakdown : []);
  var partsRows = (parts && parts.length) ? parts.map(function (p) {
    var ppct = (p.pct != null) ? p.pct : (p.percent != null ? p.percent : (p.total ? Math.round(p.correct / p.total * 100) : ''));
    return '<tr><td>' + esc(p.name || p.part || 'Part') + '</td><td style="text-align:right">' + (ppct !== '' ? ppct + '%' : '—') + '</td></tr>';
  }).join('') : '';
  var verdict = d.verdict || '';
  var writingHtml = '';
  if (tasks && tasks.length) {
    writingHtml = '<h3>Writing</h3>' + tasks.map(function (t) {
      return '<div style="margin:8px 0;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px"><b>' +
             esc(t.part || t.label || '') + '</b> <span style="color:#64748b">(' + (t.wordCount || 0) + ' words)</span><br>' +
             '<div style="white-space:pre-wrap;margin-top:4px">' + esc(t.text || '(blank)') + '</div></div>';
    }).join('');
  }
  var scoreLine = (skill !== 'Writing' && d.score != null)
    ? ('<div style="font-size:26px;font-weight:800;color:#2d5a8d">' + d.score + ' / ' + d.total + (pct !== '' ? '  (' + pct + '%)' : '') + '</div>')
    : '<div style="color:#64748b">Writing — graded by the teacher</div>';
  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:700px">' +
      '<div style="border-bottom:3px solid #4987c6;padding-bottom:8px;margin-bottom:14px">' +
        '<div style="font-size:13px;letter-spacing:1px;color:#636465">' + esc(SCHOOL_NAME) + ' — RESULTS REPORT</div>' +
        '<div style="font-size:20px;font-weight:800">' + esc(skill) + ' · ' + esc(d.level || '') + ' · ' + esc(d.examTitle || d.examType || '') + '</div>' +
      '</div>' +
      '<table style="font-size:14px;margin-bottom:10px"><tr><td style="padding:2px 14px 2px 0;color:#636465">Student</td><td><b>' + esc(d.name || '') + '</b></td></tr>' +
        '<tr><td style="color:#636465">Grade</td><td>' + esc(grade) + '</td></tr>' +
        '<tr><td style="color:#636465">Email</td><td>' + esc(d.email || '') + '</td></tr>' +
        '<tr><td style="color:#636465">Date</td><td>' + new Date().toLocaleString() + '</td></tr></table>' +
      scoreLine +
      (partsRows ? ('<h3 style="margin-top:16px">Score by part</h3><table style="width:60%;font-size:14px;border-collapse:collapse">' +
        '<tr style="background:#f2f3ff"><th style="text-align:left;padding:4px 8px">Part</th><th style="text-align:right;padding:4px 8px">%</th></tr>' + partsRows + '</table>') : '') +
      (verdict ? ('<p style="margin-top:14px;padding:10px 12px;background:#f2f3ff;border-left:4px solid #4987c6;border-radius:6px">' + esc(verdict) + '</p>') : '') +
      writingHtml +
    '</div>';
  var safe = (skill + '-' + (d.level || '') + '-' + (d.name || 'student')).replace(/[^A-Za-z0-9_\-]+/g, '_');
  return Utilities.newBlob(html, 'text/html', safe + '.html').getAs('application/pdf').setName('NIS-' + safe + '.pdf');
}

/* ---------- helpers ---------- */
function getSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers])
      .setBackground('#0f766e').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
    sh.setFrozenRows(1);
  }
  return sh;
}
function stripHtml_(s) { return String(s == null ? '' : s).replace(/<[^>]*>/g, '').trim(); }
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ===== ARCHIVAR COMENTARIOS DE WRITING EN DRIVE ===== */
var NIS_DRIVE_FOLDER = 'Comentarios de Writing';

function archivarWritingEnDrive_(d) {
  if (!d || d.type !== 'writing_result') return;   // solo Writing del portal
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
}
