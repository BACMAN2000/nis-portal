/* =========================================================================
 *  Marking > 📰 Newspaper writings — corregir los Writing del periódico
 * -------------------------------------------------------------------------
 *  Cada artículo de The Nordic Times (newspaper/) trae una tarea de Writing de
 *  formato Cambridge; lo que el alumno entrega vive en news_responses. Aquí el
 *  profesor (can_results) y el admin lo leen entero junto a la consigna y lo
 *  corrigen con los cuatro criterios de Cambridge (0-5), una nota global en la
 *  escala del colegio (AD/A/B/C) y un comentario. Se guarda con el RPC
 *  news_review: el alumno no tiene permiso sobre esas columnas.
 *  El alumno ve la corrección debajo de su texto, en el propio artículo.
 * ========================================================================= */
const NEWS_CRIT = [
  ['content','Content','Covers all the points of the task; the reader is fully informed.'],
  ['communicative','Communicative achievement','Right format and register for the task (email, article, essay…).'],
  ['organisation','Organisation','Paragraphs, linking words and a clear order of ideas.'],
  ['language','Language','Range and accuracy of vocabulary and grammar for the level.'],
];
let newsMk = { vista:'writings', estado:'pending', nivel:'', fecha:'', sel:null, filas:[], perfiles:{}, consignas:{} };

/* Las dos pestañas de la pantalla: corregir Writings y ver los resultados de
   las preguntas (newspaper/results.js, el mismo componente que cohasset.pe). */
function _newsTabs(){
  const b = (k, lab) => `<button class="btn sm ${newsMk.vista===k?'':'ghost'}" onclick="window._newsMkVista('${k}')">${lab}</button>`;
  return `<div style="display:flex;gap:8px;margin:0 0 12px;flex-wrap:wrap">${b('writings','✍️ Writings')}${b('questions','📊 Questions')}${b('students','👤 Students')}</div>`;
}
window._newsMkVista = k => { newsMk.vista = k; newsMk.sel = null; newsMarkingPanel(); };

async function newsQuestionsPanel(){
  const main = $('#main');
  main.innerHTML = `<div class="card"><h2>📰 Newspaper</h2>${_newsTabs()}<div id="news-res"><p class="muted">Loading results…</p></div></div>`;
  const { data, error } = await sb.from('news_responses')
    .select('student_id,issue_date,article_id,level,answers,score,total,checked_at')
    .not('checked_at', 'is', null).order('issue_date', { ascending:false }).limit(5000);
  const box = document.getElementById('news-res');
  if (error){ box.innerHTML = `<p class="err">Could not load the results: ${esc(error.message)}</p>`; return; }
  const ids = [...new Set((data || []).map(r => r.student_id))];
  if (ids.length){
    const { data: ps } = await sb.from('profiles').select('id,full_name,first_name,section,grade_id,grades(name)').in('id', ids);
    (ps || []).forEach(p => { newsMk.perfiles[p.id] = p; });
  }
  const rows = (data || []).map(r => { const a = _newsAlumno(r.student_id); return Object.assign({}, r, { student:a.nombre, group:a.curso }); });
  if (!window.NewsResults){ box.innerHTML = '<p class="err">The results module did not load. Reload the page.</p>'; return; }
  NewsResults.render(box, { rows, loadIssue: d => fetch('newspaper/issues/' + d + '.json', { cache:'no-cache' }).then(x => x.json()) });
}

/* Progreso de cada alumno (newspaper/progress.js): la clase en una tabla y, al
   pulsar un alumno, la misma ficha que él ve en «My progress». */
async function newsStudentsPanel(){
  const main = $('#main');
  main.innerHTML = `<div class="card"><h2>📰 Newspaper</h2>${_newsTabs()}<div id="news-al"><p class="muted">Loading students…</p></div></div>`;
  const { data, error } = await sb.from('news_responses')
    .select('student_id,issue_date,article_id,level,headline,score,total,checked_at,writing_words,submitted_at,grade,reviewed_at')
    .order('issue_date', { ascending:false }).limit(10000);
  const box = document.getElementById('news-al');
  if (error){ box.innerHTML = `<p class="err">Could not load the students: ${esc(error.message)}</p>`; return; }
  const ids = [...new Set((data || []).map(r => r.student_id))];
  if (ids.length){
    const { data: ps } = await sb.from('profiles').select('id,full_name,first_name,section,grade_id,grades(name)').in('id', ids);
    (ps || []).forEach(p => { newsMk.perfiles[p.id] = p; });
  }
  if (!window.NewsProgress){ box.innerHTML = '<p class="err">The progress module did not load. Reload the page.</p>'; return; }
  const porAlumno = {};
  (data || []).forEach(r => { (porAlumno[r.student_id] = porAlumno[r.student_id] || []).push(r); });
  const alumnos = Object.keys(porAlumno).map(id => { const a = _newsAlumno(id); return { id, name:a.nombre, group:a.curso, rows:porAlumno[id] }; });
  const tabla = () => NewsProgress.table(box, alumnos, { open: id => {
    const a = alumnos.find(x => x.id === id); if (!a) return;
    NewsProgress.render(box, a.rows, { teacher:true, title:a.name, sub:a.group, back:{ label:'← All students', go:tabla },
      link: r => 'newspaper/?d=' + r.issue_date + '#a=' + r.article_id });
    window.scrollTo(0, 0);
  }});
  tabla();
}

async function newsMarkingPanel(){
  if (newsMk.vista === 'questions') return newsQuestionsPanel();
  if (newsMk.vista === 'students') return newsStudentsPanel();
  const main = $('#main');
  main.innerHTML = '<div class="card"><p class="muted">Loading writings…</p></div>';
  const COLS = 'id,student_id,issue_date,article_id,level,headline,score,total,writing,writing_words,submitted_at,criteria,grade,feedback,reviewed_text,reviewed_at,marks,student_note';
  const { data, error } = await sb.from('news_responses').select(COLS)
    .not('submitted_at', 'is', null).order('submitted_at', { ascending:false }).limit(500);
  if (error){ main.innerHTML = `<div class="card"><h2>📰 Newspaper</h2>${_newsTabs()}<p class="err">Could not load the writings: ${esc(error.message)}</p></div>`; return; }
  newsMk.filas = data || [];
  const ids = [...new Set(newsMk.filas.map(r => r.student_id))];
  if (ids.length){
    const { data: ps } = await sb.from('profiles').select('id,full_name,first_name,section,grade_id,grades(name)').in('id', ids);
    newsMk.perfiles = Object.fromEntries((ps || []).map(p => [p.id, p]));
  }
  newsMarkingDraw();
}

function _newsAlumno(id){
  const p = newsMk.perfiles[id] || {};
  return { nombre: p.full_name || p.first_name || 'Student', curso: [p.grades && p.grades.name, p.section].filter(Boolean).join(' ') };
}
function _newsCorregido(r){ return !!r.reviewed_at; }
function _newsCambiado(r){ return _newsCorregido(r) && (r.reviewed_text || '') !== (r.writing || ''); }

function newsMarkingDraw(){
  const F = newsMk, filas = F.filas;
  const fechas = [...new Set(filas.map(r => r.issue_date))].sort().reverse();
  const vis = filas.filter(r =>
    (F.estado === 'all' || (F.estado === 'pending' ? (!_newsCorregido(r) || _newsCambiado(r)) : _newsCorregido(r))) &&
    (!F.nivel || r.level === F.nivel) && (!F.fecha || r.issue_date === F.fecha));
  const nPend = filas.filter(r => !_newsCorregido(r) || _newsCambiado(r)).length;
  const pill = (grupo, val, label) => `<button class="btn sm ${F[grupo]===val?'':'ghost'}" onclick="window._newsMkF('${grupo}','${val}')">${label}</button>`;
  const lista = vis.length ? vis.map(r => {
    const a = _newsAlumno(r.student_id);
    const est = !_newsCorregido(r) ? '<span class="pill" style="background:#fff4e5;color:#b45309">To mark</span>'
      : _newsCambiado(r) ? '<span class="pill" style="background:#fff4e5;color:#b45309">Rewritten</span>'
      : `<span class="pill" style="background:#e7f6ee;color:#1f7a4d">${esc(r.grade || '✓')}</span>`;
    return `<button class="newsmk-it${F.sel===r.id?' on':''}" onclick="window._newsMkSel(${r.id})">
      <b>${esc(a.nombre)}</b> <span class="muted">${esc(a.curso)}</span> ${est}<br>
      <span class="muted" style="font-size:12.5px">${esc(r.level||'')} · ${esc(r.headline||r.article_id)} · ${r.writing_words||0} words · ${new Date(r.submitted_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
    </button>`;
  }).join('') : '<p class="muted" style="padding:12px">Nothing here with these filters.</p>';

  $('#main').innerHTML = `<style>
      .newsmk{display:grid;grid-template-columns:minmax(0,320px) minmax(0,1fr);gap:16px;align-items:start}
      .newsmk-list{max-height:calc(100vh - 260px);overflow:auto;border:1px solid var(--line,#e2e8f0);border-radius:12px}
      .newsmk-it{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid var(--line,#e2e8f0);background:none;padding:10px 12px;cursor:pointer;color:inherit;font:inherit}
      .newsmk-it.on{background:rgba(37,99,235,.08)}
      .newsmk-txt{white-space:pre-wrap;font-family:Georgia,'Literata',serif;font-size:16.5px;line-height:1.65;border:1px solid var(--line,#e2e8f0);border-radius:12px;padding:14px 16px;background:var(--card,#fff)}
      .newsmk-crit{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:center;margin:10px 0}
      .newsmk-crit select,.newsmk textarea{font:inherit}
      @media (max-width:1100px){.newsmk{grid-template-columns:minmax(0,1fr)}.newsmk-list{max-height:320px}}
    </style>
    <div class="card">
      <h2>📰 Newspaper</h2>${_newsTabs()}
      <p class="muted">Writings that students submitted from the daily newspaper (${esc(typeof newsName==='function'?newsName():'The Nordic Times')}).
        Read the task and the text, give 0–5 for each Cambridge criterion, an overall grade and a short comment. The student sees it under the article.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0 14px">
        ${pill('estado','pending','To mark <b>'+nPend+'</b>')}${pill('estado','marked','Marked')}${pill('estado','all','All <b>'+filas.length+'</b>')}
        <span style="width:1px;height:22px;background:var(--line,#e2e8f0)"></span>
        ${pill('nivel','','All levels')}${['A2','B1','B2','C1'].map(l=>pill('nivel',l,l)).join('')}
        <select onchange="window._newsMkF('fecha',this.value)" class="btn sm ghost" aria-label="Edition">
          <option value="">All editions</option>${fechas.map(d=>`<option value="${d}" ${F.fecha===d?'selected':''}>${d}</option>`).join('')}
        </select>
      </div>
      <div class="newsmk"><div class="newsmk-list">${lista}</div><div id="newsmk-ficha">${F.sel ? '' : '<p class="muted">Choose a writing on the left.</p>'}</div></div>
    </div>`;
  if (F.sel) return _newsMkFicha(F.sel);
}

async function _newsConsigna(r){
  const k = r.issue_date;
  if (!(k in newsMk.consignas)){
    try { newsMk.consignas[k] = await fetch('newspaper/issues/' + k + '.json', { cache:'no-cache' }).then(x => x.json()); }
    catch(e){ newsMk.consignas[k] = null; }
  }
  const issue = newsMk.consignas[k];
  return issue && (issue.articles || []).find(a => a.id === r.article_id) || null;
}

async function _newsMkFicha(id){
  const r = newsMk.filas.find(x => x.id === id), box = document.getElementById('newsmk-ficha');
  if (!r || !box) return;
  const art = await _newsConsigna(r), a = _newsAlumno(r.student_id), c = r.criteria || {};
  const nota = (k) => `<select id="nmk-${k}" aria-label="${k}"><option value="">–</option>${[0,1,2,3,4,5].map(n=>`<option ${String(c[k])===String(n)?'selected':''}>${n}</option>`).join('')}</select>`;
  box.innerHTML = `
    <h3 style="margin:0 0 4px">${esc(a.nombre)} <span class="muted" style="font-weight:400">${esc(a.curso)}</span></h3>
    <p class="muted" style="margin:0 0 10px">${esc(r.level||'')} · <a href="newspaper/?d=${esc(r.issue_date)}#a=${esc(r.article_id)}" target="_blank" rel="noopener">${esc(r.headline||r.article_id)} ↗</a>
      · Questions ${r.score!=null ? r.score+'/'+r.total : 'not checked'} · submitted ${new Date(r.submitted_at).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</p>
    ${art && art.writing ? `<div class="note info" style="margin-bottom:10px"><b>${esc(art.writing.exam)}</b><br>${esc(art.writing.task)}</div>` : ''}
    ${_newsCambiado(r) ? '<div class="note" style="margin-bottom:10px">The student changed the text after it was marked. The current version is below; save again to mark it.</div>' : ''}
    <div id="nmk-marks"></div>
    <p class="muted" style="margin:6px 0 0;font-size:13px">${r.writing_words||0} words</p>
    <div class="newsmk-crit">
      ${NEWS_CRIT.map(([k,lab,ayuda]) => `<div><b>${lab}</b><br><span class="muted" style="font-size:12.5px">${ayuda}</span></div>${nota(k)}`).join('')}
      <div><b>Overall grade</b><br><span class="muted" style="font-size:12.5px">AD · A · B · C</span></div>
      <select id="nmk-grade" aria-label="Overall grade"><option value="">–</option>${['AD','A','B','C'].map(g=>`<option ${r.grade===g?'selected':''}>${g}</option>`).join('')}</select>
    </div>
    <label for="nmk-fb"><b>Comment for the student</b></label>
    <textarea id="nmk-fb" rows="4" style="width:100%;margin-top:4px" maxlength="4000" placeholder="What went well, and one thing to improve next time.">${esc(r.feedback||'')}</textarea>
    <div style="display:flex;gap:10px;align-items:center;margin-top:10px">
      <button class="btn" onclick="window._newsMkSave(${r.id})">${_newsCorregido(r)?'Update marking':'Save and send to the student'}</button>
      <span id="nmk-msg" class="muted" aria-live="polite">${r.reviewed_at ? 'Marked '+new Date(r.reviewed_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : ''}</span>
    </div>
    ${r.reviewed_at ? `<div style="margin-top:16px">
      <label for="nmk-note"><b>Student's reflection</b> <span class="muted" style="font-weight:400">— written by the student after reading the feedback (you can type it with the student beside you)</span></label>
      <textarea id="nmk-note" rows="3" style="width:100%;margin-top:4px" maxlength="4000" placeholder="The student has not written a reflection yet.">${esc(r.student_note||'')}</textarea>
      <div style="display:flex;gap:10px;align-items:center;margin-top:6px"><button class="btn sm ghost" onclick="window._newsMkNote(${r.id})">Save reflection</button><span id="nmk-note-msg" class="muted"></span></div>
    </div>` : ''}`;
  /* Tachaduras sobre el texto (newspaper/marks.js): se guardan solas en cada cambio. */
  if (window.NewsMarks) NewsMarks.render(document.getElementById('nmk-marks'), r.writing || '', r.marks || [], {
    editable:true, by:'tutor',
    onSave: marks => sb.rpc('news_marks', { p_id:r.id, p_marks:marks }).then(({ data, error }) => {
      if (error) throw error;
      r.marks = data.marks;
    })
  });
  else document.getElementById('nmk-marks').innerHTML = `<div class="newsmk-txt">${esc(r.writing || '')}</div>`;
}

window._newsMkNote = async id => {
  const r = newsMk.filas.find(x => x.id === id), m = document.getElementById('nmk-note-msg');
  m.textContent = 'Saving…';
  const { data, error } = await sb.rpc('news_note', { p_id:id, p_note:(document.getElementById('nmk-note').value || '').trim() });
  if (error){ m.textContent = 'Not saved: ' + error.message; return; }
  if (r) r.student_note = data.student_note;
  m.textContent = '✓ Saved';
};
window._newsMkF = (grupo, val) => { newsMk[grupo] = val; newsMk.sel = null; newsMarkingDraw(); };
window._newsMkSel = id => { newsMk.sel = id; newsMarkingDraw(); };
window._newsMkSave = async id => {
  const v = k => (document.getElementById('nmk-' + k) || {}).value || '';
  const criteria = {};
  NEWS_CRIT.forEach(([k]) => { if (v(k) !== '') criteria[k] = +v(k); });
  const grade = v('grade'), fb = (document.getElementById('nmk-fb') || {}).value || '';
  const msg = document.getElementById('nmk-msg');
  if (!grade){ msg.textContent = 'Choose an overall grade first.'; return; }
  msg.textContent = 'Saving…';
  const { data, error } = await sb.rpc('news_review', { p_id:id, p_grade:grade, p_feedback:fb.trim(), p_criteria:criteria });
  if (error){ msg.textContent = 'Not saved: ' + error.message; return; }
  const i = newsMk.filas.findIndex(x => x.id === id);
  if (i >= 0) newsMk.filas[i] = Object.assign(newsMk.filas[i], data);
  await newsMarkingDraw();
  const m = document.getElementById('nmk-msg'); if (m) m.textContent = '✓ Saved — the student can see it now';
};
