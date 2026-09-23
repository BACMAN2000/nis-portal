

async function renderTeacher(tab){
  if(tab==='exams'){ window.location.assign(location.origin + '/mocks-cambridge/quizzes.html'); return; }
  const acc = state.teacherAccess || await loadTeacherAccess();
  const _tn = state.teacherNodes||{has:false,set:new Set()};
  const _canClasses = !_tn.has || _tn.set.has('english.classes') || [..._tn.set].some(k=>k.indexOf('english.classes.')===0);
  const _canFrench  = !_tn.has || [..._tn.set].some(k=>k==='french' || k.indexOf('french.')===0);

  /* Los mismos grupos que ve el admin, para que los dos paneles se lean
     igual. Un grupo que se queda sin pestanas (porque el profesor no tiene
     ese acceso) no se pinta. Alumnos va suelto arriba: es por donde entra
     casi siempre. */
  const suelto=[], correccion=[], seguimiento=[], clases=[], cambridge=[], permisos=[];
  suelto.push({key:'overview',label:'🏠 Overview'});
  if(acc.can_students) suelto.push({key:'students',label:'👥 Students'});
  if(acc.can_results||acc.can_students) correccion.push({key:'levels',label:'🧭 Levels & roadmap'});
  if(acc.can_results){
    correccion.push({key:'unitprod',label:'🎯 Unit products'});
    correccion.push({key:'corregir',label:'✅ Mark worksheets'});
    correccion.push({key:'unitexams',label:'📋 Unit exams'});
    correccion.push({key:'readers',label:'📖 Reading checks'});
    correccion.push({key:'funnordic',label:'🧸 Fun for Nordic'});
    correccion.push({key:'mock2',label:'📝 MOCK 2'});
    seguimiento.push({key:'results',label:'📝 Results'});
    seguimiento.push({key:'activities',label:'🎲 Activities'});
    seguimiento.push({key:'final',label:'🎓 MOCK 1'});
    seguimiento.push({key:'tiempo',label:'⏱️ Screen time'});
  }
  if(acc.can_results||acc.can_students) seguimiento.push({key:'honesty',label:'🛡️ Honesty'});
  // Mismo orden que en el menu del admin, pestana por pestana: los dos
  // paneles se leen igual y una indicacion sirve para los dos.
  if(_canClasses) clases.push({key:'classes',label:'🏫 Classes'});
  if(_canFrench)  clases.push({key:'french',label:'🇫🇷 French'});
  clases.push({key:'scope',label:'📚 Scope & Sequence'});
  if(acc.can_results) clases.push({key:'materiales',label:'📄 Class materials'});
  clases.push({key:'littlereaders',label:'🧒 Little Readers'});
  clases.push({key:'rhymes',label:'🎶 Rhymes & chants'});
  clases.push({key:'fr',label:'🇫🇷 Cap sur le français'});
  clases.push({key:'pizarra',label:'📝 Whiteboard'});
  clases.push({key:'corrector',label:'✍️ Material corrector'});
  /* Cambridge en el orden de la pista del alumno: primero los tres cursos
     de primaria (van sin candado, como Little Readers: son material de
     consulta, no datos de alumnos; sus entregas se corrigen en Correccion >
     Fun for Nordic), luego el hub, los simulacros, las apps y los candados. */
  cambridge.push({key:'funyle',label:'🧸 Fun for Nordic · Primary'});
  cambridge.push({key:'funsec',label:'🧗 Nordic Ascent · Secondary'});
  cambridge.push({key:'cambridgehub',label:'🎓 YLE + Main Suite'});
  if(teacherAllowedGrades().length) cambridge.push({key:'yle',label:'🛡️ YLE panel'});
  cambridge.push({key:'exams',label:'🎧 Mock exams and Practice'});
  cambridge.push({key:'uoe',label:'🧩 Use of English'});
  cambridge.push({key:'cambridgeinfo',label:'📘 Cambridge info'});
  if(teacherAllowedGrades().length) cambridge.push({key:'practice',label:'🔓 Open Practice Tests'});
  if(teacherAllowedGrades().length) cambridge.push({key:'mockindiv',label:'🎯 Individual mock'});
  if(teacherAllowedGrades().length){
    permisos.push({key:'whatsees',label:'👁️ What each class sees'});
    permisos.push({key:'unitaccess',label:'📚 Activate units'});
    permisos.push({key:'funaccess',label:'🔐 Units by grade'});
  }

  const nav = [];
  if(suelto.length) nav.push(...suelto);
  else if(!acc.can_results) nav.push({key:'none',label:'— no access —'});
  const grupo = (g,ic,items)=>{ if(items.length) nav.push({group:g, icon:ic, items:items}); };
  // Espejo de las pistas del alumno (17-sep-2026): Clases · Cambridge ·
  // Herramientas de practica, y despues el trabajo del profesor.
  grupo('Classes','🏫',clases);
  grupo('Cambridge','🎓',cambridge);
  grupo('Practice tools','🧰',[
    {key:'games',label:'🎲 Games Lab'},
    {key:'livequiz',label:'🎮 NIShoot Live'},
    {key:'mun',label:'🌐 MUN Academy'},
    {key:'phonics',label:'🔤 Phonics'},
    {key:'phrasal',label:'🔗 Phrasal verbs'},
      {key:'collocations',label:'🪢 Collocations'},
      {key:'idioms',label:'💬 Idioms'},
    {key:'wordform',label:'🧩 Word formation'},
    {key:'dict',label:'📖 NIS Dictionary'},
    {key:'coach',label:'🎙️ Pronunciation'},
  ]);
  grupo('Marking','✅',correccion);
  grupo('Tracking','📈',seguimiento);
  grupo('Permissions','🔐',permisos);
  nav.push({key:'help',label:'❓ Help'});
  const claves = navKeys(nav);
  // Las pestanas por curso (funstarters, funket…) no estan en el menu: se
  // aceptan si su serie (funyle / funsec) esta, y el menu resalta la serie.
  const active = (tab && (claves.indexOf(tab)>=0 || (tab!==_serieNavKey(tab) && claves.indexOf(_serieNavKey(tab))>=0))) ? tab : claves[0];
  document.body.innerHTML = shell(nav, _serieNavKey(active), `<div class="center muted">Loading…</div>`, true);
  bindNav(renderTeacher);
  if(active==='overview') return window.overviewPanel({admin:false});
  if(active==='help') return $('#main').innerHTML = ayudaBody();
  if(active==='mun') return $('#main').innerHTML = munBody();
  if(active==='livequiz') return $('#main').innerHTML = liveQuizBody();
  if(active==='games') return $('#main').innerHTML = gamesLabBody();
  if(active==='results') return teacherResults();
  if(active==='final') return cefrFinalPanel();
  if(active==='mock2') return mock2Panel();
  if(active==='readers') return readerStatsPanel();
  if(active==='unitexams') return unitExamPanel();
  if(active==='levels') return levelsPanel();
  if(active==='students') return teacherStudents();
  if(active==='unitprod') return unitProductsPanel();
  if(active==='materiales') return materialesPanel();
  if(active==='corregir') return corregirPanel();
  if(active==='tiempo') return tiempoPantallaPanel();
  if(active==='activities') return window.activitiesPanel({admin:false, grades:teacherAllowedGrades()});
  if(active==='honesty') return antiCheatPanel();
  if(active==='practice') return practicePanel(teacherAllowedGrades());
  if(active==='mockindiv') return mockModePanel({admin:false});
  if(active==='unitaccess') return unitAccessPanel(teacherAllowedGrades());
  if(active==='whatsees') return window.accessPanel({admin:false, grades:teacherAllowedGrades().map(g=>g.id)});
  if(active==='classes') return studentClasses();
  if(active==='french') return studentSubject('french');
  if(active==='phonics'){ $('#main').innerHTML = phonicsPanel(); return; }
  if(active==='phrasal'){ $('#main').innerHTML = phrasalPanel(); return; }
  if(active==='collocations'){ $('#main').innerHTML = collocationsPanel(); return; }
  if(active==='idioms'){ $('#main').innerHTML = idiomsPanel(); return; }
  if(active==='wordform'){ $('#main').innerHTML = wordformPanel(); return; }
  if(active==='dict'){ $('#main').innerHTML = dictPanel(); return; }
  if(active==='coach'){ $('#main').innerHTML = coachPanel(); return; }
  // Estas tres estaban en el menu pero sin handler: el profesor las clicaba y
  // le salia el mensaje de "sin accesos".
  if(active==='fr') return funFrBody('renderTeacher').then(h => $('#main').innerHTML = h);
  if(active==='frstarters') return $('#main').innerHTML = funFrCursoBody('starters');
  if(active==='frmovers') return $('#main').innerHTML = funFrCursoBody('movers');
  if(active==='frflyers') return $('#main').innerHTML = funFrCursoBody('flyers');
  if(active==='frmetricas') return funFrMetricas();
  if(active==='funnordic') return funNordicPanel();
  if(active==='scope') return scopePanel();
  if(active==='littlereaders') return littleReadersPanel();
  if(active==='funaccess') return funAccessPanel(teacherAllowedGrades());
  if(active==='yle') return window.ylePanel(teacherAllowedGrades(), {admin:false});
  if(active==='funyle') return $('#main').innerHTML = funYleBody('renderTeacher');
  if(active==='funsec') return $('#main').innerHTML = funSecBody('renderTeacher');
  if(/^fun(starters|movers|flyers|a1|ket|pet|b2f|c1a)$/.test(active)) return $('#main').innerHTML = funCursoBody(active.slice(3));
  if(active==='rhymes') return $('#main').innerHTML = rhymesBody();
  if(active==='cambridgehub') return studentCambridgePortal();
  if(active==='uoe') return $('#main').innerHTML = useOfEnglishBody();
  if(active==='pizarra') return $('#main').innerHTML = pizarraBody();
  if(active==='corrector') return $('#main').innerHTML = correctorBody();
  if(active==='cambridgeinfo') return $('#main').innerHTML = cambridgeInfoBody();
  $('#main').innerHTML = `<div class="card">The administrator has not assigned you any access yet. Message them so they can enable <b>Results</b> or <b>Students</b> for you.</div>`;
}
/* ── Shared results filter bar (admin + teacher) ────────────────────── */
function resultsFilterBar(gradeList, onChangeFn){
  const f = resultsFilter;
  const gradeOpts = `<option value="">All grades</option>`
    + gradeList.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const sectionOpts = `<option value="">All</option>`
    + ['A','B'].map(s=>`<option value="${s}" ${f.section===s?'selected':''}>${s}</option>`).join('');
  const hasFilter = f.grade||f.section||f.name||f.dateFrom||f.dateTo;
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADE</label>
      <select onchange="${onChangeFn}('grade',this.value)" style="min-width:140px">${gradeOpts}</select>
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">SECTION</label>
      <select onchange="${onChangeFn}('section',this.value)" style="min-width:100px">${sectionOpts}</select>
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">NAME</label>
      <input type="text" placeholder="Search student…" value="${esc(f.name)}"
        oninput="window._liveNameFilter(this.value)" style="min-width:180px">
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">FROM</label>
      <input type="date" value="${f.dateFrom}" onchange="${onChangeFn}('dateFrom',this.value)">
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">TO</label>
      <input type="date" value="${f.dateTo}" onchange="${onChangeFn}('dateTo',this.value)">
    </div>
    ${hasFilter ? `<button class="btn sm ghost" style="align-self:flex-end" onclick="${onChangeFn}('_clear','')">✕ Clear</button>` : ''}
  </div>`;
}
function applyResultsFilter(list){
  const f = resultsFilter;
  if(f.grade)    list = list.filter(a=> String(a.profiles?.grade_id)===String(f.grade));
  if(f.section)  list = list.filter(a=> (a.profiles?.section||'').toUpperCase()===f.section.toUpperCase());
  if(f.name)     list = list.filter(a=> (a.profiles?.full_name||'').toLowerCase().includes(f.name.toLowerCase()));
  if(f.dateFrom) list = list.filter(a=> (a.submitted_at||'') >= f.dateFrom);
  if(f.dateTo)   list = list.filter(a=> (a.submitted_at||'') <= f.dateTo+'T23:59:59');
  return list;
}
window._setResFilter = (k,v)=>{
  if(k==='_clear') resultsFilter={grade:'',section:'',name:'',dateFrom:'',dateTo:''};
  else resultsFilter[k]=v;
  (state.profile && state.profile.role==='teacher') ? teacherResults() : adminResults();
};
/* Filtro por nombre EN VIVO: oculta/muestra las filas ya renderizadas (cada una
   marcada con data-sname) sin re-renderizar #main ni reconsultar la BD. Así el
   input no pierde el foco ni se "traba" al escribir. El valor se guarda en
   resultsFilter.name para que un re-render real (cambiar grado/sección) lo
   respete. */
window._liveNameFilter = (v)=>{
  resultsFilter.name = v;
  const q = (v||'').toLowerCase().trim();
  let shown = 0;
  document.querySelectorAll('tr[data-sname]').forEach(tr=>{
    const hit = tr.getAttribute('data-sname').includes(q);
    tr.style.display = hit ? '' : 'none';
    if(hit) shown++;
  });
  const c = document.getElementById('resCount');
  if(c) c.textContent = shown + ' ' + (c.getAttribute('data-noun') || 'result(s)');
};

/* ── Export filtered results to CSV (Excel-compatible with UTF-8 BOM) ── */
window.exportResultsExcel = ()=>{
  const list = _currentResultsList || [];
  if(!list.length){ alert('No results to export.'); return; }
  const headers = ['Student','Grade','Section','CEFR level','Exam','Skill','Score (%)','Correct','Total','Time (min)','Date'];
  const rows = list.map(a=>[
    a.profiles?.full_name||'',
    a.profiles?.grades?.name||'',
    a.profiles?.section||'',
    a.level||'',
    mockLabel(a),
    a.skill||'',
    a.percent!=null ? a.percent : '',
    a.score!=null   ? a.score   : '',
    a.total!=null   ? a.total   : '',
    a.duration_min!=null ? a.duration_min : '',
    a.submitted_at  ? new Date(a.submitted_at).toLocaleDateString('en-GB') : ''
  ]);
  const csv = [headers,...rows]
    .map(r => r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(','))
    .join('\r\n');
  const bom = '﻿'; // UTF-8 BOM so Excel opens with correct encoding
  const blob = new Blob([bom+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resultados_NIS_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
async function teacherResults(){
  state._tab='results';
  const { data } = await sb.from('exam_attempts').select('*, profiles(full_name,grade_id,section,grades(name))').order('submitted_at',{ascending:false}).limit(500);
  const all = data||[]; const isMock = resultsBranch==='mock';
  let list = applyResultsFilter(all.filter(a=> isMock?isMockAttempt(a):!isMockAttempt(a)));
  _currentResultsList = list;
  const tabs=`<div class="row" style="gap:8px;margin:0 0 14px">
    <button class="btn sm ${isMock?'':'ghost'}" onclick="window._setResBranch('mock')">📝 Mocks (${all.filter(isMockAttempt).length})</button>
    <button class="btn sm ${isMock?'ghost':''}" onclick="window._setResBranch('practice')">🎯 Practice Tests (${all.filter(a=>!isMockAttempt(a)).length})</button></div>`;
  const rows=list.map(a=>{
    const ws=weakStrong(a);
    const wsCell = ws
      ? `<span class="badge off" title="Weakest part" style="font-size:.72rem">▼ ${esc(ws.weak.name)} ${ws.weak.pct}%</span> <span class="badge on" title="Strongest part" style="font-size:.72rem">▲ ${esc(ws.strong.name)} ${ws.strong.pct}%</span>`
      : '<span class="muted">—</span>';
    return `<tr data-sname="${esc((a.profiles?.full_name||'').toLowerCase())}">
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:((a.breakdown&&a.breakdown.teacherMessage)?'<span class="badge on" style="font-size:.72rem">✓ comment sent</span>':'<span class="muted">— (review)</span>')}</td>
    <td style="min-width:200px">${wsCell}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' ghost':''}" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-grade':((a.breakdown&&a.breakdown.teacherMessage)?'Edit comment':'Grade')}</button>${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' <span class="badge on" style="font-size:.7rem">✓ sent</span>':''}`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">View analysis →</button>`}</td></tr>`;}).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Results</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Export Excel</button>
    </div>
    ${resultsFilterBar(teacherAllowedGrades(),'window._setResFilter')}${tabs}
    ${partsBreakdownCard(list)}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Section</th><th>Exam</th><th>Score</th><th>Weak / Strong (parts)</th><th>Date</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="8" class="center muted">No ${isMock?'mock':'practice test'} attempts for this filter.</td></tr>`}</tbody>
    </table>
    <div id="resCount" data-noun="result(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} result(s)</div></div>`;
}
/* -- Barra de filtro por grado (pestaña Alumnos del profesor) ------- */
let teacherFilter = { grade:'' };
function gradeFilterBar(onChangeFn, gradeList){
  const list = gradeList || teacherAllowedGrades();
  const opts = `<option value="">All grades</option>`
    + list.map(g=>`<option value="${g.id}" ${String(teacherFilter.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADE</label>
      <select onchange="${onChangeFn}(this.value)" style="min-width:140px">${opts}</select>
    </div>
    ${teacherFilter.grade ? `<button class="btn sm ghost" style="align-self:flex-end" onclick="${onChangeFn}('')">✕ Clear</button>` : ''}
  </div>`;
}
window._setTeacherGrade = (v)=>{ teacherFilter.grade = v; teacherStudents(); };
async function teacherStudents(){
  state._tab='students';
  const { data } = await sb.from('profiles').select('*, grades(name)').eq('role','student');
  let list=data||[]; const fg=teacherFilter.grade;
  if(fg) list=list.filter(p=>String(p.grade_id)===String(fg));
  list.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));
  const rows=list.map(p=>`<tr><td><b>${esc(p.full_name||p.email)}</b></td><td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td><td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td>
    <td><button class="btn sm ghost" onclick="window._openStudentAccess('${p.id}',${p.grade_id||'null'},'${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')">🔧 Access</button></td></tr>`).join('');
  $('#main').innerHTML=`<h1>Students</h1>${gradeFilterBar('window._setTeacherGrade')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Level</th><th>Access</th></tr></thead>
      <tbody>${rows||'<tr><td colspan="4" class="center muted">No students for this filter.</td></tr>'}</tbody></table>
      <div class="muted" style="padding:10px 14px">${list.length} student(s)</div></div>`;
}
/* Editor de accesos por alumno (profesor): override de nodos que el profesor gestiona y el grado tiene habilitados. */
window._openStudentAccess = async (sid, gradeId, name)=>{
  const meId=(state.session&&state.session.user&&state.session.user.id)||null;
  const isAdmin = state.profile && state.profile.role==='admin';
  let managed=null;
  if(!isAdmin){
    const { data:t } = await sb.from('teacher_node_access').select('node_key,allowed').eq('profile_id',meId);
    if(t && t.length) managed=new Set(t.filter(r=>r.allowed).map(r=>r.node_key)); // sin filas => gestiona todo
  }
  const { data:na } = gradeId!=null ? await sb.from('node_access').select('node_key,unlocked').eq('grade_id',gradeId) : {data:[]};
  const gradeMap={}; (na||[]).forEach(r=>gradeMap[r.node_key]=r.unlocked);
  const { data:sa } = await sb.from('student_access').select('node_key,unlocked').eq('student_id',sid);
  const stuMap={}; (sa||[]).forEach(r=>stuMap[r.node_key]=r.unlocked);
  const gradeOn=(k)=> Object.prototype.hasOwnProperty.call(gradeMap,k)?gradeMap[k]:_nodeDefaultOpen(k);
  // Unidades y semanas las gestiona quien gestione su Activities.
  const nodes=ACCESS_NODES.filter(n=> isAdmin || !managed || managed.has(_GATE_PARENT[n.key]||n.key));
  const rows=nodes.map(n=>{
    const base=gradeOn(n.key);
    const eff=Object.prototype.hasOwnProperty.call(stuMap,n.key)?stuMap[n.key]:base;
    return `<tr><td><b>${esc(n.label)}</b></td>
      <td style="text-align:center" class="muted">${base?'Enabled':'Blocked'}</td>
      <td style="text-align:center"><input type="checkbox" ${eff?'checked':''} onchange="window._setStudentAccess('${sid}','${n.key}',this.checked,this)"></td></tr>`;
  }).join('');
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="${isAdmin?'adminUsers':'teacherStudents'}()">← Back to ${isAdmin?'Users':'Students'}</button>
    <h1 style="margin-top:8px">Access — ${esc(name)}</h1>
    <div class="note">Turn activities on or off for this student. By default it inherits from the grade; here you set the exception.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Activity</th><th>By grade</th><th>This student</th></tr></thead>
      <tbody>${rows||'<tr><td colspan="3" class="center muted">You have no activities assigned to manage.</td></tr>'}</tbody></table></div>`;
};
window._setStudentAccess = async (sid,key,to,el)=>{
  el.disabled=true;
  const { error } = await sb.rpc('set_student_access',{p_student:sid,p_node:key,p_unlocked:to});
  el.disabled=false;
  if(error){ alert('Could not save: '+error.message); el.checked=!to; }
};

/* ===================== WRITING GRADING (teacher) ===================== */
const WRITING_WEBHOOK = (window.NIS_CONFIG && window.NIS_CONFIG.WRITING_WEBHOOK) || '';
function band6(b1,b3,b5){
  return [
    'Below Band 1 — content largely irrelevant, or too little language to assess.',
    b1,
    'Between Bands 1 and 3 — shares features of both.',
    b3,
    'Between Bands 3 and 5 — shares features of both.',
    b5
  ];
}
const WRITING_SUBSCALE = {
  'Content': band6(
    'Irrelevances or misunderstanding of the task; the reader is only minimally informed.',
    'Minor irrelevances and/or omissions; on the whole the target reader is informed.',
    'All parts of the task are covered with relevant ideas; the target reader is fully informed.'),
  'Communicative Achievement': band6(
    'Communicates simple ideas in a basic way; register and format only partly appropriate.',
    'Uses a generally appropriate register and format; main ideas communicated and the reader’s attention mostly held.',
    'Register, format and tone fully fit the task; simple and more complex ideas are communicated clearly and the reader is engaged throughout.'),
  'Organisation': band6(
    'Ideas connected with basic, high-frequency linkers (and, but, then, because).',
    'Generally well organised and coherent; a range of basic linkers and some cohesive devices.',
    'Well organised and coherent; a variety of cohesive devices and organisational patterns used smoothly.'),
  'Language': band6(
    'Basic everyday vocabulary and simple structures; errors may obscure meaning at times.',
    'Everyday vocabulary used appropriately, with a mix of simple and some complex grammar; errors present but rarely impede communication.',
    'Wide range of vocabulary and structures including less common items, used with control; errors are minimal and meaning is always clear.')
};
/* Rubricas Cambridge del corrector de exámenes (bandas 0-5). Se llamaba
   WRITING_RUBRICS y hacia sombra a window.WRITING_RUBRICS (writing-rubrics.js,
   las rubricas AD/A/B/C del portal): el corrector de producciones escritas
   llamaba a WRITING_RUBRICS.get(), que aqui no existe, y el boton «Corregir»
   moria en silencio. */
const EXAM_WRITING_RUBRICS = {
  A2:{ bandMax:5, subs:['Content','Organisation','Language'] },
  B1:{ bandMax:5, subs:['Content','Communicative Achievement','Organisation','Language'] },
  B2:{ bandMax:5, subs:['Content','Communicative Achievement','Organisation','Language'] },
  C1:{ bandMax:5, subs:['Content','Communicative Achievement','Organisation','Language'] }
};
let gradeState = null;
function writingMessage(name, level, pct){
  const f = (name||'').split(' ')[0] || 'there';
  if(pct>=85) return `Hi ${f}! Excellent work on your ${level} writing — you scored ${pct}%. Your ideas are clear, well organised, and your language is strong and varied. Keep writing like this! 🌟`;
  if(pct>=70) return `Hi ${f}! Good job on your ${level} writing — ${pct}%. You communicate your ideas well and cover the task. To reach the top band, add a little more range and accuracy in your language. 👍`;
  if(pct>=50) return `Hi ${f}! Nice effort on your ${level} writing — ${pct}%. You're developing well. Focus on covering every part of the task and linking your ideas more clearly with connectors. 💪`;
  if(pct>=30) return `Hi ${f}! Thanks for your ${level} writing — ${pct}%. Let's work on answering every point in the task, organising your paragraphs, and writing a bit more. You'll improve quickly with practice! ✍️`;
  return `Hi ${f}! Thanks for handing in your ${level} writing — ${pct}%. Don't worry: with regular practice on task content, organisation and basic grammar you'll make fast progress. Your teacher is here to help! ✍️`;
}
/* opts (21-sep-2026): { back:'mock2', quiet:true } desde ✅ Marking → 📝 MOCK 2.
   quiet = se guarda la nota SIN mandar correo al alumno (el Apps Script): en el
   Official Mock 2 los resultados salen todos juntos en el informe único. */
window.gradeWriting = async (id, opts)=>{
  opts = opts||{};
  const { data:a, error } = await sb.from('exam_attempts').select('*, profiles(full_name,email,grade_id,grades(name))').eq('id',id).single();
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const rubric = EXAM_WRITING_RUBRICS[a.level] || EXAM_WRITING_RUBRICS.B1;
  // restore previous per-task selections if re-grading
  const sel_t1 = {}, sel_t2 = {};
  const pb = (a.breakdown && a.breakdown.parts) || [];
  pb.forEach(p=>{
    const m1 = p.part && p.part.match(/^Task 1 — (.+)$/);
    const m2 = p.part && p.part.match(/^Task 2 — (.+)$/);
    if(m1) sel_t1[m1[1]] = p.correct!=null ? p.correct : null;
    else if(m2) sel_t2[m2[1]] = p.correct!=null ? p.correct : null;
    else if(p.part) sel_t1[p.part] = p.correct!=null ? p.correct : null; // backwards compat
  });
  const quiet = !!opts.quiet || (typeof mockCycleOf==='function' && mockCycleOf(a)===2);   // un writing del Official Mock 2 nunca manda correo
  gradeState = { id, attempt:a, rubric, sel_t1, sel_t2, msg:(a.breakdown&&a.breakdown.teacherMessage)||'', touched: !!(a.breakdown&&a.breakdown.teacherMessage), back:(opts.back==='mock2'?'mock2':'results'), quiet };
  renderGradeWriting();
};
function _gradeWritingBack(){ return gradeState && gradeState.back==='mock2' ? mock2Panel() : teacherResults(); }

/* Builds the rubric card grid for one task (taskIdx = 0 or 1). */
function _taskRubricHtml(taskLabel, taskIdx){
  const rubric = gradeState.rubric;
  const sel = taskIdx === 0 ? gradeState.sel_t1 : gradeState.sel_t2;
  const taskMax = rubric.subs.length * rubric.bandMax;
  const subsHtml = rubric.subs.map((s,si)=>{
    const desc = WRITING_SUBSCALE[s] || [];
    const cards = desc.map((d,band)=>{
      const on = sel[s]===band;
      return `<div onclick="window._pickBand(${taskIdx},${si},${band})" style="cursor:pointer;border:2px solid ${on?'#4987c6':'var(--line)'};background:${on?'#eef4fb':'#fff'};border-radius:8px;padding:8px 10px;margin:4px 0;display:flex;gap:10px;align-items:flex-start">
        <span style="flex:0 0 auto;font-weight:700;color:${on?'#2d5a8d':'#94a3b8'};min-width:46px">Band ${band}</span>
        <span style="font-size:.88rem">${esc(d)}</span></div>`;
    }).join('');
    return `<div class="card" style="margin-bottom:6px"><h3 style="margin:0 0 6px">${esc(s)} <span class="muted" style="font-weight:400">/ ${rubric.bandMax}</span> <b style="float:right;color:#2d5a8d">${sel[s]!=null?sel[s]:'—'}</b></h3>${cards}</div>`;
  }).join('');
  return `<div style="border:2px solid #4987c6;border-radius:14px;padding:12px 14px;margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <h3 style="margin:0;color:#2d5a8d">✏️ ${esc(taskLabel)}</h3>
      <span style="font-size:1.1rem;font-weight:800;color:#2d5a8d" id="gw-sub${taskIdx+1}">—&nbsp;/&nbsp;${taskMax}</span>
    </div>
    ${subsHtml}
  </div>`;
}

function renderGradeWriting(){
  const a=gradeState.attempt, rubric=gradeState.rubric;
  const answers = Array.isArray(a.answers) ? a.answers : [];
  const taskMax = rubric.subs.length * rubric.bandMax;
  const totalMax = taskMax * 2;

  // Left column: both answer texts
  const textsHtml = answers.length
    ? answers.map(t=>`<div style="border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:10px">
        <div class="row" style="justify-content:space-between"><b>${esc(t.label||'Task')}</b><span class="muted" style="font-size:.82rem">${t.wordCount!=null?t.wordCount+' words':''}</span></div>
        ${t.prompt?`<div class="muted" style="white-space:pre-wrap;margin-top:6px;font-size:.82rem;line-height:1.45;border-left:3px solid var(--line);padding-left:8px">${esc(t.prompt)}</div>`:''}
        <div style="white-space:pre-wrap;margin-top:6px;font-size:.93rem;line-height:1.6">${esc((t.text||'').trim()||'(no answer)')}</div></div>`).join('')
    : `<p class="muted">This attempt did not save the text submitted by the student.</p>`;

  // Right column: Task 1 rubrics + Task 2 rubrics
  const t1Label = (answers[0] && answers[0].label) || 'Task 1 — Part 1';
  const t2Label = (answers[1] && answers[1].label) || 'Task 2 — Part 2';

  $('#main').innerHTML = `
    <button class="btn sm ghost" onclick="_gradeWritingBack()">← Back to ${gradeState.back==='mock2'?'MOCK 2':'results'}</button>
    <h1 style="margin:.4rem 0 0">✍️ Grade Writing${gradeState.quiet?' · OFFICIAL MOCK 2':''}</h1>
    <div class="muted" style="margin-bottom:10px">${esc(a.profiles?.full_name||'Student')} · ${esc(a.profiles?.grades?.name||'')} · ${esc(a.level)} · ${gradeState.quiet?'Official Mock 2 (bank '+mockLabel(a)+')':mockLabel(a)} · ${new Date(a.submitted_at).toLocaleString()}</div>
    ${a.breakdown&&a.breakdown.from_reading?`<div class="note" style="margin-bottom:10px"><b>A2 Key:</b> these are Parts 6 and 7 of the Reading &amp; Writing paper, written inside the Reading exam. Mark them here with the A2 rubric (Content · Organisation · Language, 0–5 each); the Reading score (Parts 1–5) stays as it is.</div>`:''}
    <div class="grid cols-2" style="align-items:start">
      <div>
        <div class="card"><h2 style="margin-top:0">Student text</h2>${textsHtml}</div>
      </div>
      <div>
        <div class="note">Click the matching descriptor for each criterion (Cambridge rubric, 0–${rubric.bandMax}). The score for each part is calculated automatically.</div>
        ${_taskRubricHtml(t1Label, 0)}
        ${_taskRubricHtml(t2Label, 1)}
        <div class="card" style="position:sticky;bottom:0">
          <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <h2 style="margin:0">Total</h2>
            <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
              <span class="muted" style="font-size:.85rem">T1: <b id="gw-sub1-lbl">—</b> &nbsp;T2: <b id="gw-sub2-lbl">—</b></span>
              <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span id="gw-total">0</span> / ${totalMax} · <span id="gw-pct">0</span>% · <span id="gw-cefr" style="background:#d1d2ea;color:#244c77;border-radius:8px;padding:2px 10px;font-size:1.05rem">—</span></div>
            </div>
          </div>
          <label style="margin-top:10px;display:block">${gradeState.quiet?'Teacher\'s feedback (goes into the Mock 2 report)':'Message for the student (editable)'}</label>
          <textarea id="gw-msg" rows="5" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px" oninput="gradeState.touched=true;gradeState.msg=this.value">${esc(gradeState.msg||'')}</textarea>
          <div id="gw-status" style="margin-top:6px;font-size:.88rem"></div>
          <div class="row" style="margin-top:10px;gap:10px;align-items:center">
            <button class="btn" id="gw-send" onclick="window._sendWritingResult()">${gradeState.quiet?'💾 Save grade':'📧 Send result to student'}</button>
            ${gradeState.quiet?'<span class="muted" style="font-size:.82rem">No email is sent: the student sees it only in the single Mock 2 report, once released.</span>':''}
          </div>
        </div>
      </div>
    </div>`;
  _recalcGrade();
}

function _recalcGrade(){
  const r=gradeState.rubric;
  let t1=0, t2=0, all=true;
  r.subs.forEach(s=>{
    if(gradeState.sel_t1[s]!=null) t1+=gradeState.sel_t1[s]; else all=false;
    if(gradeState.sel_t2[s]!=null) t2+=gradeState.sel_t2[s]; else all=false;
  });
  const taskMax=r.subs.length*r.bandMax, totalMax=taskMax*2;
  const total=t1+t2, pct=Math.round(total/totalMax*100);
  const tEl=$('#gw-total'), pEl=$('#gw-pct');
  if(tEl) tEl.textContent=total; if(pEl) pEl.textContent=pct;
  // Nivel CEFR (Escala Cambridge) según el % en el nivel del examen — el profesor ve la banda, no solo el %.
  const cEl=$('#gw-cefr');
  if(cEl) cEl.textContent = gradeState.complete ? scaleToCefr(skillScale(gradeState.attempt.level, pct)) : '—';
  const s1=$('#gw-sub1-lbl'), s2=$('#gw-sub2-lbl');
  if(s1) s1.textContent=t1+'/'+taskMax; if(s2) s2.textContent=t2+'/'+taskMax;
  gradeState.t1=t1; gradeState.t2=t2; gradeState.total=total; gradeState.max=totalMax; gradeState.pct=pct; gradeState.complete=all;
  // Auto-suggest message only while teacher hasn't edited it
  if(all && !gradeState.touched){
    gradeState.msg = writingMessage(gradeState.attempt.profiles?.full_name, gradeState.attempt.level, pct);
    const msg=$('#gw-msg'); if(msg) msg.value=gradeState.msg;
  }
}
window._pickBand = (taskIdx, si, band)=>{
  const s=gradeState.rubric.subs[si];
  if(taskIdx===0) gradeState.sel_t1[s]=band; else gradeState.sel_t2[s]=band;
  // Preserve scroll position: re-rendering used to jump back to the top on
  // every click, which made it almost impossible to finish all the criteria.
  const y = window.scrollY;
  renderGradeWriting();
  window.scrollTo(0, y);
};
window._sendWritingResult = async ()=>{
  const st=$('#gw-status');
  const a=gradeState.attempt; const msg=($('#gw-msg').value||'').trim();
  const rubric=gradeState.rubric;
  // The teacher can send when the rubric is fully marked (a graded result) OR
  // when there is at least a written comment (a comment-only feedback).
  const graded = !!gradeState.complete;
  if(!graded && !msg){
    st.innerHTML='<span style="color:var(--bad)">Write a comment for the student, or mark a Band for every criterion in both parts, before sending.</span>';
    return;
  }
  const breakdown={
    kind:'writing-graded',
    graded,                                   // false = comment-only (sin nota todavía)
    parts:[
      ...rubric.subs.map(s=>({part:'Task 1 — '+s, correct:gradeState.sel_t1[s], total:rubric.bandMax})),
      ...rubric.subs.map(s=>({part:'Task 2 — '+s, correct:gradeState.sel_t2[s], total:rubric.bandMax}))
    ],
    task1Total: gradeState.t1, task2Total: gradeState.t2,
    teacherMessage: msg,
    gradedBy: (state.profile&&state.profile.full_name)||(state.session&&state.session.user&&state.session.user.email)||'teacher',
    gradedAt: new Date().toISOString()
  };
  $('#gw-send').disabled=true; st.textContent='Saving…';
  // Guardamos con fetch directo a PostgREST en vez de sb.rpc(): el cliente
  // supabase-js a veces se queda colgado esperando el "lock" de auth (sobre
  // todo con el portal abierto en varios dispositivos/pestañas a la vez) y la
  // petición nunca llega a salir. Con fetch controlamos el envío y el timeout.
  let rpcErr = null;
  try {
    const token = (state.session && state.session.access_token) || CFG.SUPABASE_KEY;
    const ctrl = new AbortController();
    const to = setTimeout(()=>ctrl.abort(), 15000);
    const res = await fetch(CFG.SUPABASE_URL + '/rest/v1/rpc/grade_writing', {
      method:'POST',
      headers:{ 'apikey':CFG.SUPABASE_KEY, 'Authorization':'Bearer '+token, 'Content-Type':'application/json' },
      body: JSON.stringify({ p_attempt:a.id,
        p_score:   graded ? gradeState.total : null,
        p_total:   graded ? gradeState.max   : null,
        p_percent: graded ? gradeState.pct   : null,
        p_breakdown:breakdown }),
      signal: ctrl.signal
    });
    clearTimeout(to);
    if(!res.ok){
      const txt = await res.text().catch(()=>'');
      rpcErr = new Error('Error ' + res.status + (txt ? (' — ' + txt) : ''));
    }
  } catch(e){
    rpcErr = (e && e.name==='AbortError')
      ? new Error('Timed out — check your connection and try again.')
      : e;
  }
  if(rpcErr){ $('#gw-send').disabled=false; st.innerHTML=`<span style="color:var(--bad)">Could not save: ${esc(rpcErr.message||String(rpcErr))}</span>`; return; }
  if(gradeState.quiet){
    st.innerHTML=`<span style="color:var(--good)">✓ ${graded?'Grade saved.':'Comment saved.'} It goes into the Mock 2 report — no email sent.</span>`;
    setTimeout(_gradeWritingBack, 900);
    return;
  }
  // Fire-and-forget webhook (Apps Script emails the student + archives to Drive).
  // We also send the student's own texts so the archived copy is complete.
  try{
    const texts = (Array.isArray(a.answers)?a.answers:[]).map(t=>({ label:t.label||'', text:t.text||'', wordCount:t.wordCount!=null?t.wordCount:null }));
    fetch(WRITING_WEBHOOK,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify({ type:'writing_result', graded, studentEmail:a.profiles?.email||'', studentName:a.profiles?.full_name||'',
        firstName:(a.profiles?.full_name||'').split(' ')[0], grade:a.profiles?.grades?.name||'', level:a.level,
        examTitle:'Writing '+(mockLabel(a)), score:graded?gradeState.total:null, total:graded?gradeState.max:null, percent:graded?gradeState.pct:null,
        task1Score:graded?gradeState.t1:null, task1Total:rubric.subs.length*rubric.bandMax,
        task2Score:graded?gradeState.t2:null, task2Total:rubric.subs.length*rubric.bandMax,
        texts,
        message:msg, teacherEmail:'pbaca@nordic-school.edu.pe', teacherName:breakdown.gradedBy, schoolName:'Nordic International School of Lima' }) });
  }catch(e){}
  st.innerHTML=`<span style="color:var(--good)">✓ ${graded?'Result saved and sent to the student.':'Comment saved and sent to the student.'}</span>`;
  setTimeout(_gradeWritingBack, 1200);
};