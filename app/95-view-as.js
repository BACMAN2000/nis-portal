/* ===================== 👁 VIEW AS (17-sep-2026) =====================
   El admin cambia de vista desde la cabecera: Admin · Teacher · Student ·
   Parent. Lo pidió Paolo para ver el portal como lo ve cada uno sin salir de
   su cuenta. Se apoya en el mecanismo de vista previa que ya existía para el
   alumno (_previewEnter / _previewExit / _previewBar en 60-student-hub.js):
   state.realProfile guarda quién está dentro de verdad, state.preview dice
   qué se está mirando, y la barra ámbar lo recuerda en toda pantalla.

   - Teacher: el panel del profesor con todos los grados (teacher_access
     sintético). Lo que se corrija ahí se guarda con la cuenta del admin, que
     ya podía hacerlo: no abre nada nuevo.
   - Student: el selector de siempre (alumno de muestra por grado o un alumno
     concreto), ahora también accesible desde la cabecera.
   - Parent: lo que recibe la familia de un alumno — el informe de resultado
     final (el mismo que se imprime y se manda en PDF), la guía de Cambridge
     para familias y cómo contactar al profesor. No existe rol «parent» en la
     base: es una vista de lectura sobre los datos del alumno elegido. */

function _viewAsSelect(){
  const real = state.realProfile || state.profile || {};
  if(real.role!=='admin') return '';
  const k = state.preview ? state.preview.kind : 'admin';
  const cur = k==='teacher' ? 'teacher' : k==='parent' ? 'parent' : (k==='student'||k==='grade') ? 'student' : 'admin';
  const opt = (v,l)=>`<option value="${v}" ${cur===v?'selected':''}>${l}</option>`;
  return `<label class="view-as" title="See the portal as another role"><span aria-hidden="true">👁</span>
    <select aria-label="View as" onchange="window._viewAs(this.value)">${opt('admin','Admin')}${opt('teacher','Teacher')}${opt('student','Student')}${opt('parent','Parent')}</select></label>`;
}

/* Vuelve al estado real sin repintar (para saltar de una vista a otra). */
function _previewRestore(){
  if(state.realProfile) state.profile = state.realProfile;
  if('_teacherAccessReal' in state){ state.teacherAccess = state._teacherAccessReal; state.teacherNodes = state._teacherNodesReal; delete state._teacherAccessReal; delete state._teacherNodesReal; }
  state.realProfile = null; state.preview = null; state.access = null;
}

window._viewAs = async function(v){
  if(!_canPreview()) return;
  if(v==='admin'){ if(state.preview) window._previewExit('overview'); else renderAdmin('overview'); return; }
  if(v==='teacher') return _previewTeacher();
  return _viewAsPicker(v);   // student / parent: hay que elegir a quién
};

async function _previewTeacher(){
  const real = state.realProfile || state.profile;
  if(state.preview) _previewRestore();
  state.realProfile = real;
  state.preview = { kind:'teacher', label:'a teacher (all grades)', backTab:'overview' };
  state._teacherAccessReal = state.teacherAccess; state._teacherNodesReal = state.teacherNodes;
  state.teacherAccess = { can_results:true, can_students:true, all_grades:true, grades:[] };
  state.teacherNodes = { has:false, set:new Set() };
  state.profile = Object.assign({}, real, { role:'teacher' });
  _previewClearHash();
  await renderTeacher('overview');
}

/* Elegir alumno (vista de alumno o de su familia). */
async function _viewAsPicker(kind){
  const main = $('#main'); if(!main) return;
  const esFamilia = kind==='parent';
  main.innerHTML = `<h1>👁 ${esFamilia ? 'View as a family' : 'View as a student'}</h1>
    <p class="muted" style="margin-top:-6px">${esFamilia
      ? 'What the family of a student receives: the final-result report, the Cambridge guide for families and how to contact the teacher.'
      : 'The portal exactly as a student sees it: only what their grade has open, with their own history.'}</p>
    ${esFamilia ? '' : `<div class="card"><h2 style="margin:0 0 6px">Sample student by grade</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:10px">Only what the grade opens, with no per-student exceptions and no personal history.</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <select id="va_grade">${GRADES.map(g=>`<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select>
        <button class="btn" onclick="window._previewGrade(document.getElementById('va_grade').value)">View as a sample student</button>
      </div></div>`}
    <div class="card"><h2 style="margin:0 0 6px">${esFamilia ? 'Choose the student' : 'A specific student'}</h2>
      <input id="va_q" type="search" placeholder="Name, grade (G7) or section…" style="width:100%;max-width:420px" oninput="window._viewAsFilter()">
      <div id="va_list" class="muted" style="margin-top:10px">Loading students…</div></div>`;
  const { data, error } = await sb.from('profiles').select('id,full_name,grade_id,section,grades(name)').eq('role','student').eq('active',true).order('full_name').limit(600);
  if(error){ $('#va_list').innerHTML = '<span class="err">'+esc(error.message)+'</span>'; return; }
  window._viewAsRows = (data||[]).map(p=>({ id:p.id, name:p.full_name||'', grade:p.grade_id, gname:(p.grades&&p.grades.name)||'', section:p.section||'' }));
  window._viewAsKind = kind;
  window._viewAsFilter();
}
window._viewAsFilter = function(){
  const q = ($('#va_q')?.value||'').trim().toLowerCase(), rows = window._viewAsRows||[], kind = window._viewAsKind;
  const lista = rows.filter(r=>!q || (r.name+' g'+r.grade+' '+r.gname+' '+r.section).toLowerCase().includes(q)).slice(0, 60);
  const fn = kind==='parent' ? '_previewParent' : '_previewStudent';
  $('#va_list').innerHTML = lista.length ? `<table><thead><tr><th>Student</th><th>Grade</th><th></th></tr></thead><tbody>${
    lista.map(r=>`<tr><td><b>${esc(r.name)}</b></td><td>${esc(r.gname||('G'+r.grade))}${r.section?' '+esc(r.section):''}</td>
      <td><button class="btn sm ghost" onclick="window.${fn}('${r.id}','${esc(r.name.replace(/'/g,'’'))}')">👁️ ${kind==='parent'?'View as their family':'View as'}</button></td></tr>`).join('')
  }</tbody></table>${rows.length>60&&lista.length>=60?'<div class="muted" style="padding:8px 0">Showing 60: narrow the search.</div>':''}`
  : '<span class="muted">No student matches.</span>';
};

/* ---------- Parent: lo que recibe la familia ---------- */
window._previewParent = async (sid, name)=>{
  if(!_canPreview()) return;
  const real = state.realProfile || state.profile;
  if(state.preview) _previewRestore();
  state.realProfile = real;
  state.preview = { kind:'parent', label:'the family of '+name, backTab:'overview', studentId:sid, studentName:name };
  state.profile = Object.assign({}, real, { role:'parent' });
  _previewClearHash();
  await renderParent('report');
};
async function renderParent(tab='report'){
  const m = state.preview||{}, sid = m.studentId;
  if(!sid) return window._previewExit('overview');
  const nav = [{key:'report',label:'📄 Family report'},{key:'guide',label:'📘 Family guide'},{key:'contact',label:'✉️ Contact the teacher'}];
  document.body.innerHTML = shell(nav, tab, '<div class="center muted">Loading…</div>', false);
  bindNav(renderParent);
  if(tab==='guide'){
    $('#main').innerHTML = `<h1>📘 Family guide</h1>
      <p class="muted" style="margin-top:-6px">What the Cambridge exams are, how they are scored and how the school prepares ${esc(m.studentName||'the student')} for them.</p>
      <div class="grid cols-2">
        ${_hubCard('🛡️','Cambridge Young Learners','Starters, Movers and Flyers: what each exam is, the shields and what they mean.',"location.href='yle-guia-familia.html'")}
        ${_hubCard('📘','Cambridge info','Every exam from A2 Key to C1 Advanced: parts, timing and scoring.',"location.href='cambridge-info.html'")}
      </div>`;
    return;
  }
  if(tab==='contact'){
    $('#main').innerHTML = `<h1>✉️ Contact the teacher</h1>
      <div class="card"><p>Questions about ${esc(m.studentName||'your child')}’s progress go to the English coordination:</p>
        <p><a class="btn" href="mailto:pbaca@nordic-school.edu.pe?subject=${encodeURIComponent('English — '+(m.studentName||''))}">✉️ pbaca@nordic-school.edu.pe</a></p>
        <p class="muted" style="font-size:.88rem">Families also receive the school’s communications through Toddle.</p></div>`;
    return;
  }
  // El informe: las mismas consultas y el mismo pintado que 🎓 Resultado final → Informe.
  const lang = (window.NISi18n && window.NISi18n.lang()==='es') ? 'es' : 'en', EN = lang==='en';
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',sid).single();
  if(error){ $('#main').innerHTML='<div class="note err">'+esc(error.message)+'</div>'; return; }
  const cycle = await mockLatestReleased();   // la familia recibe el último informe liberado
  const { data:atAll } = await sb.from('exam_attempts').select('id,skill,level,percent,score,total,mock,submitted_at,breakdown').eq('student_id',sid);
  const at = mockCycleAttempts(atAll||[], cycle);
  let sp=null, prev=null; try{ const r=await sb.from('speaking_results').select('*').eq('student_id',sid); sp=mockSpeakingOf((r&&r.data)||[], cycle); if(cycle===2) prev=mockCycleFinal(p, mockCycleAttempts(atAll||[],1), mockSpeakingOf((r&&r.data)||[],1), 1); }catch(e){}
  const fin=mockCycleFinal(p, at, sp, cycle);
  _ensurePrintCss();
  $('#main').innerHTML = `<h1>📄 Family report</h1>
    <p class="muted" style="margin-top:-6px">This is the document the family receives: ${esc(p.full_name||'')}’s final level, skill by skill, with the teacher’s comments.${fin.complete?'':' <span class="badge off" style="font-size:.7rem">Provisional</span>'}</p>
    <div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
      <button class="btn sm" onclick="window.print()">🖨️ Print</button>
      <button class="btn sm ghost" onclick="studentReportPDF('${sid}','${lang}',${cycle})">📄 Download PDF</button>
    </div>
    <div id="print-report" style="max-width:820px;margin:0 auto;padding:24px;border:1px solid var(--line);border-radius:12px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.08)">${_reportInner(p, at, sp, fin, EN, {detail:true, cycle, prev})}</div>`;
  window.scrollTo(0,0);
}
