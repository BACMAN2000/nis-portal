/* ===================== SPEAKING TEST (23-sep-2026) =====================
   Marking → 🗣️ Speaking test, para profesor y admin. El examinador elige
   grado → sección → dos o tres alumnos, el nivel (A2·B1·B2·C1) y uno de los
   cuatro tests; a la izquierda lee el guion del examinador tal cual (PET,
   speaking-test-data.js) y a la derecha marca 0-5 en cada criterio de la
   escala analítica de Cambridge de ese nivel más el Global Achievement. El
   resultado (puntos, %, media de bandas y letra AD·A·B·C) sale solo.
   Desde el 23-sep (tarde): el reloj va en un raíl fijo a la derecha (siempre
   a la vista, con Start/Pause y botones para subir, bajar y saltar a cada
   parte o candidato); el nombre de cada criterio se pulsa y despliega qué es
   cada banda 5·4·3·2·1·0; y las láminas del libro (Parte 2 el dibujo con
   ideas, Parte 3 una foto por candidato) se ven dentro del guion y a pantalla
   completa con «Show to…», en vez de mandar al Student's Book.
   Desde esa misma tarde cada nivel tiene sus propios guiones (A2 Key, B1
   Preliminary 2018 + los 4 del PET, B2 First / for Schools, C1 Advanced /
   Ready for C1): el desplegable SCRIPT lista solo los del nivel elegido, y
   «About the … Speaking test» resume partes, tiempos y consejos del nivel.
   Guarda en speaking_tests (una fila por candidato y sesión) y, si el
   examinador lo pide, vuelca además la nota al Speaking del MOCK 1 / MOCK 2
   (upsert_speaking, la misma forma que usa el corrector del mock). */
let _sk = null;
const _SK_SEATS = ['A','B','C'];

function _skIsAdmin(){ return !!(state.profile && state.profile.role==='admin'); }
function _skGrades(){ return (_skIsAdmin() ? GRADES : teacherAllowedGrades()).filter(g=>!g.staff); }
function _skData(){ return window.SPEAKING_TEST; }
/* Tests del nivel elegido (cada test lleva level y name; n es único y es el
   test_no que se guarda). Si el test actual no es del nivel, pasa al primero. */
function _skTestsOfLevel(){ return _skData().tests.filter(t=>t.level===_sk.level); }
function _skTest(){ return _skData().tests.find(t=>t.n===_sk.test) || _skTestsOfLevel()[0] || _skData().tests[0]; }
function _skFixTest(){ const list=_skTestsOfLevel(); if(!list.some(t=>t.n===_sk.test)) _sk.test = list.length ? list[0].n : _skData().tests[0].n; }
function _skTestName(n){ const t=_skData().tests.find(x=>x.n===n); return t ? t.name : 'Test '+n; }
function _skUUID(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=>{ const r=Math.random()*16|0; return (c==='x'?r:(r&3|8)).toString(16); });
}

async function speakingTestPanel(){
  if(!$('#main')) return;
  if(!_skData()){ $('#main').innerHTML = '<div class="note err">The Speaking test file (speaking-test-data.js) is not loaded.</div>'; return; }
  const grades = _skGrades();
  if(!_sk){
    _sk = { view:'setup', grade:'', section:'', students:[], picked:[], level:'B1', test:1,
            marks:{}, comments:{}, sessionId:null, saveCycle:'', part:1, showDesc:false, openDesc:{}, showInfo:false,
            history:[], timer:{t0:null, acc:0, id:null} };
    const first = grades[0];
    if(first){ _sk.grade = String(first.id); await _skLoadStudents(); }
  }
  _skPaint();
}

async function _skLoadStudents(){
  _sk.students=[]; _sk.history=[];
  if(!_sk.grade) return;
  const gid = parseInt(_sk.grade,10);
  const [{ data:st }, { data:hist }] = await Promise.all([
    sb.from('profiles').select('id,full_name,section,cefr_level,is_demo').eq('role','student').eq('active',true).eq('grade_id',gid).order('full_name'),
    sb.from('speaking_tests').select('*').eq('grade_id',gid).order('created_at',{ascending:false}).limit(300)
  ]);
  _sk.students = st||[];
  _sk.history = hist||[];
  const tl = (typeof targetLevel==='function') ? targetLevel({grade_id:gid}) : null;
  if(tl && LEVELS.includes(tl)) _sk.level = tl;
  _skFixTest();
  const secs = _skSections();
  if(_sk.section && !secs.includes(_sk.section)) _sk.section='';
}
function _skSections(){
  const s = new Set(); _sk.students.forEach(x=>{ if(x.section) s.add(String(x.section).toUpperCase()); });
  return [...s].sort();
}
function _skPaint(){
  if(!$('#main')) return;
  $('#main').innerHTML = _sk.view==='exam' ? _skExamHTML() : _skSetupHTML();
}

/* ---------- Pantalla 1: elegir grado, sección, alumnos, nivel y test ---------- */
function _skSetupHTML(){
  const grades = _skGrades();
  const gradeOpts = grades.map(g=>`<option value="${g.id}" ${String(_sk.grade)===String(g.id)?'selected':''}>${esc(g.name)}</option>`).join('');
  const secs = _skSections();
  const secOpts = `<option value="">All sections</option>` + secs.map(s=>`<option value="${s}" ${_sk.section===s?'selected':''}>${s}</option>`).join('');
  const lvlOpts = LEVELS.map(l=>`<option value="${l}" ${_sk.level===l?'selected':''}>${l} · ${esc(_skData().rubrics[l].exam)}</option>`).join('');
  _skFixTest();
  const testOpts = _skTestsOfLevel().map(t=>`<option value="${t.n}" ${_sk.test===t.n?'selected':''}>${esc(t.name)}${t.trio?' · pairs or groups of three':''}</option>`).join('');
  const list = _sk.students.filter(s=>!_sk.section || String(s.section||'').toUpperCase()===_sk.section);
  const rows = list.map(s=>{
    const on = _sk.picked.includes(s.id);
    const full = !on && _sk.picked.length>=3;
    const done = _sk.history.filter(h=>h.student_id===s.id).length;
    return `<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid ${on?'var(--blue)':'var(--line)'};border-radius:8px;background:${on?'#eef4fb':'var(--card)'};cursor:${full?'not-allowed':'pointer'};opacity:${full?.55:1}">
      <input type="checkbox" style="width:auto" ${on?'checked':''} ${full?'disabled':''} onchange="window._skPick('${s.id}',this.checked)">
      <span style="flex:1"><b>${esc(s.full_name)}</b>${s.is_demo?' <span class="badge off">demo</span>':''}</span>
      <span class="muted" style="font-size:.85rem">${s.section?esc(s.section):''} ${s.cefr_level?'· '+esc(s.cefr_level):''}${done?' · 🗣️ '+done:''}</span>
      ${on?`<span class="badge lvl">Candidate ${_SK_SEATS[_sk.picked.indexOf(s.id)]}</span>`:''}
    </label>`;
  }).join('') || `<p class="muted">No students in this grade${_sk.section?' / section':''}.</p>`;
  const n = _sk.picked.length;
  const ready = n>=2 && n<=3;
  const trioWarn = n===3 && !_skTest().trio
    ? `<div class="note info">This script is written for pairs. With three candidates, choose a script marked “pairs or groups of three”, or use this one and repeat the long turn for Candidate C.</div>` : '';

  return `
    <h1 style="margin:0 0 4px">🗣️ Speaking test</h1>
    <p class="muted" style="margin:0 0 12px">Examine two or three students together. Read the examiner’s script and mark each candidate 0–5 on the Cambridge analytical scales of the level.</p>
    <div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px">
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px">GRADE</label>
        <select style="min-width:120px" onchange="window._skField('grade',this.value)">${gradeOpts}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px">SECTION</label>
        <select style="min-width:120px" onchange="window._skField('section',this.value)">${secOpts}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px">LEVEL · RUBRIC</label>
        <select style="min-width:190px" onchange="window._skField('level',this.value)">${lvlOpts}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px">SCRIPT · ${_skTestsOfLevel().length} for ${esc(_sk.level)}</label>
        <select style="min-width:260px;max-width:100%" onchange="window._skField('test',this.value)">${testOpts}</select></div>
    </div>
    ${_skInfoHTML()}
    <div class="grid cols-2" style="align-items:start">
      <div class="card">
        <h2 style="margin:0 0 4px">Candidates <span class="muted" style="font-weight:400;font-size:.9rem">· pick 2 or 3</span></h2>
        <div style="display:grid;gap:6px;margin-top:8px;max-height:420px;overflow:auto">${rows}</div>
        ${trioWarn}
        <div class="row" style="margin-top:12px">
          <button class="btn" ${ready?'':'disabled style="opacity:.5"'} onclick="window._skStart()">▶ Start test${n?' · '+n+' candidate'+(n>1?'s':''):''}</button>
          ${n?`<button class="btn sm ghost" onclick="window._skClearPick()">Clear</button>`:''}
        </div>
      </div>
      <div class="card">
        <h2 style="margin:0 0 4px">Previous sessions</h2>
        ${_skHistoryHTML()}
      </div>
    </div>`;
}
function _skHistoryHTML(){
  const list = _sk.history.filter(h=>!_sk.section || String(h.section||'').toUpperCase()===_sk.section);
  if(!list.length) return `<p class="muted">No speaking tests recorded for this grade${_sk.section?' / section':''} yet.</p>`;
  const byName = {}; _sk.students.forEach(s=>{ byName[s.id]=s.full_name; });
  const groups = {}, order = [];
  list.forEach(h=>{ if(!groups[h.session_id]){ groups[h.session_id]=[]; order.push(h.session_id); } groups[h.session_id].push(h); });
  return `<div style="display:grid;gap:8px;margin-top:8px;max-height:460px;overflow:auto">` + order.map(sid=>{
    const rows = groups[sid].sort((a,b)=>(a.seat||'').localeCompare(b.seat||''));
    const d = new Date(rows[0].created_at);
    const when = d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) + ' ' + d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    const cands = rows.map(r=>`<span style="display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:.85rem"><b>${esc(r.seat||'')}</b> ${esc(byName[r.student_id]||'Student')} <span class="badge lvl">${esc(r.band||'—')}</span> <span class="muted">${r.score}/${r.total}</span></span>`).join(' ');
    return `<div style="border:1px solid var(--line);border-radius:8px;padding:8px 10px">
      <div class="row" style="justify-content:space-between">
        <span class="muted" style="font-size:.82rem">${when} · ${esc(rows[0].level)} · ${esc(_skTestName(rows[0].test_no))}${rows[0].section?' · Sec. '+esc(rows[0].section):''}</span>
        <button class="btn sm ghost" style="padding:3px 10px" onclick="window._skOpen('${sid}')">Open</button>
      </div>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px">${cands}</div>
    </div>`;
  }).join('') + `</div>`;
}
window._skField = async (k,v)=>{
  if(k==='grade'){ _sk.grade=v; _sk.picked=[]; _sk.section=''; await _skLoadStudents(); }
  else if(k==='section'){ _sk.section=v; _sk.picked=_sk.picked.filter(id=>{ const s=_sk.students.find(x=>x.id===id); return s && (!v || String(s.section||'').toUpperCase()===v); }); }
  else if(k==='level'){ _sk.level=v; _skFixTest(); }
  else if(k==='test'){ _sk.test=parseInt(v,10)||1; }
  _skPaint();
};
window._skPick = (id,on)=>{
  if(on){ if(!_sk.picked.includes(id) && _sk.picked.length<3) _sk.picked.push(id); }
  else _sk.picked=_sk.picked.filter(x=>x!==id);
  _skPaint();
};
window._skClearPick = ()=>{ _sk.picked=[]; _skPaint(); };
window._skStart = ()=>{
  if(_sk.picked.length<2) return;
  _sk.sessionId=_skUUID(); _sk.marks={}; _sk.comments={}; _sk.part=1; _sk.saveCycle=''; _sk.view='exam';
  _skTimerReset();
  _skPaint();
};
window._skOpen = (sid)=>{
  const rows=_sk.history.filter(h=>h.session_id===sid).sort((a,b)=>(a.seat||'').localeCompare(b.seat||''));
  if(!rows.length) return;
  _sk.sessionId=sid; _sk.level=rows[0].level; _sk.test=rows[0].test_no; _sk.part=1; _sk.saveCycle='';
  _sk.picked=rows.map(r=>r.student_id); _sk.marks={}; _sk.comments={};
  rows.forEach(r=>{ _sk.marks[r.student_id]=Object.assign({},r.marks||{}); _sk.comments[r.student_id]=r.comment||''; });
  _sk.view='exam'; _skTimerReset(); _skPaint();
};
window._skBack = async ()=>{
  const dirty = Object.keys(_sk.marks).some(id=>Object.keys(_sk.marks[id]||{}).length);
  if(dirty && !(await NISUI.pregunta('Leave this test? Marks that were not saved will be lost.', {titulo:'Speaking test', si:'Leave', no:'Stay'}))) return;
  _skTimerStop(); window._skHidePic(); _sk.view='setup'; await _skLoadStudents(); _skPaint();
};

/* ---------- Pantalla 2: guion + rúbrica ---------- */
function _skCands(){ return _sk.picked.map((id,i)=>({ id, seat:_SK_SEATS[i], p:_sk.students.find(s=>s.id===id)||{full_name:'Student'} })); }
function _skResult(id){
  const r=_skData().rubrics[_sk.level]; const crits=r.criteria.concat([r.global]);
  const m=_sk.marks[id]||{}; let sum=0, n=0, an=0;
  crits.forEach(c=>{ if(m[c]!=null){ sum+=m[c]; n++; if(c!==r.global) an+=m[c]; } });
  const all = n===crits.length;
  const total=crits.length*5, pct=all?Math.round(sum/total*100):null, mean=all?sum/crits.length:null;
  const weighted = all ? an + 2*(m[r.global]||0) : null;   // Cambridge: analítica + Global ×2
  return { crits, sum, total, pct, mean, all, letter: all?_skData().letter(mean):null, weighted, weightedMax:(crits.length-1)*5+10 };
}
function _skExamHTML(){
  const D=_skData(); const test=_skTest(); const r=D.rubrics[_sk.level];
  const cands=_skCands();
  const gname=(GRADES.find(g=>String(g.id)===String(_sk.grade))||{}).name||'';
  const partTabs = test.parts.map(p=>`<button class="btn sm ${_sk.part===p.n?'':'ghost'}" style="padding:6px 12px" onclick="window._skPart(${p.n})">Part ${p.n}${p.title?' · '+esc(p.title):''}</button>`).join('');
  const part = test.parts.find(p=>p.n===_sk.part)||test.parts[0];
  const chips = cands.map(c=>`<span class="badge lvl" style="font-size:.85rem">Candidate ${c.seat} · ${esc(c.p.full_name)}</span>`).join(' ');
  const cycleOpts = ['','1','2'].map(v=>`<option value="${v}" ${_sk.saveCycle===v?'selected':''}>${v?'MOCK '+v+' Speaking':'— only here —'}</option>`).join('');
  return `${_skStyleHTML()}
    <div class="sk-wrap" id="skTop">
    <div style="margin-bottom:8px">
      <button class="btn sm ghost" onclick="window._skBack()">← Back</button>
      <h1 style="margin:.3rem 0 0">🗣️ ${esc(test.name)} · <span class="badge lvl" style="font-size:1rem">${esc(_sk.level)} · ${esc(r.exam)}</span></h1>
      <div class="muted" style="margin:4px 0 0">${esc(gname)}${_sk.section?' · Section '+esc(_sk.section):''} · ${chips}</div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:16px;align-items:start">
      <div id="skScript">
        <div class="row" style="gap:6px;margin-bottom:8px">${partTabs}</div>
        <div class="card sk-script" data-i18n="off" style="padding:20px 24px">${_skPartHTML(part)}</div>
      </div>
      <div>
        ${cands.map(c=>_skCandHTML(c)).join('')}
        ${_skInfoHTML()}
        <div class="card" data-i18n="off" style="padding:14px 16px">
          <div class="row" style="justify-content:space-between">
            <button class="btn sm ghost" onclick="window._skToggleDesc()">${_sk.showDesc?'▾ Hide':'▸ Show'} the ${esc(r.exam)} descriptors (Bands 1 · 3 · 5)</button>
          </div>
          ${_sk.showDesc?_skDescTableHTML(r):''}
        </div>
        <div class="card sk-save" id="skSave" style="position:sticky;bottom:0;padding:14px 16px">
          <div class="row" style="gap:10px;align-items:flex-end;flex-wrap:wrap">
            <div style="flex:1;min-width:200px"><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px">ALSO RECORD AS</label>
              <select onchange="_sk.saveCycle=this.value">${cycleOpts}</select></div>
            <button class="btn" onclick="window._skSave()">💾 Save results</button>
          </div>
          <div id="skStatus" style="margin-top:6px;font-size:.88rem"></div>
          <div class="muted" style="font-size:.78rem;margin-top:6px">Result = every band added (${r.criteria.length} criteria + Global, 0–5 each). Letter from the mean band: AD ≥ 4 · A ≥ 2.5 · B ≥ 1.5 · C below. Cambridge weighting (analytical + Global ×2) is shown for reference.</div>
        </div>
      </div>
    </div>
    </div>
    ${_skRailHTML(test, cands)}`;
}
/* Información del examen del nivel (partes, tiempos, consejos y lenguaje
   útil): plegable, en la pantalla de elección y en la del examen. */
function _skInfoHTML(){
  const D=_skData(); const info=(D.info||{})[_sk.level]; const r=D.rubrics[_sk.level]; if(!info) return '';
  const body = !_sk.showInfo ? '' : `<div data-i18n="off" style="margin-top:10px;font-size:.88rem;line-height:1.45">
      <p style="margin:0 0 8px">${esc(info.about)}</p>
      ${(info.parts||[]).map(p=>`<div style="margin:6px 0;padding:8px 10px;border:1px solid var(--line);border-radius:8px"><b>${esc(p.name)}</b> <span class="muted">· ${esc(p.time)}</span><div style="margin-top:3px">${esc(p.what)}</div>${p.tips?`<ul style="margin:4px 0 0;padding-left:20px">${p.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}</div>`).join('')}
      ${info.language?`<div style="margin-top:8px"><b>Useful language for the candidates</b><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:6px;margin-top:4px">${info.language.map(g=>`<div style="padding:6px 8px;background:var(--bg);border-radius:8px"><div style="font-weight:700;font-size:.82rem">${esc(g.title)}</div>${g.items.map(i=>`<div class="muted" style="font-size:.82rem">${esc(i)}</div>`).join('')}</div>`).join('')}</div></div>`:''}
      ${info.tips?`<div style="margin-top:8px"><b>For the examiner</b><ul style="margin:4px 0 0;padding-left:20px">${info.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`:''}
    </div>`;
  return `<div class="card" data-i18n="off" style="padding:12px 16px">
    <button class="btn sm ghost" onclick="window._skToggleInfo()">${_sk.showInfo?'▾ Hide':'ℹ About'} the ${esc(r.exam)} Speaking test · parts, timing and tips</button>
    ${body}</div>`;
}
window._skToggleInfo = ()=>{ _sk.showInfo=!_sk.showInfo; const y=window.scrollY; _skPaint(); window.scrollTo(0,y); };
/* Estilos del examen (se pintan con el panel): raíl fijo con el reloj y la
   navegación, láminas dentro del guion y lámina a pantalla completa. */
function _skStyleHTML(){
  return `<style id="skStyle">
    .sk-wrap{padding-right:150px}
    .sk-rail{position:fixed;right:14px;top:50%;transform:translateY(-50%);width:128px;z-index:60;display:flex;flex-direction:column;gap:5px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px;box-shadow:0 8px 28px rgba(0,0,0,.14);max-height:calc(100vh - 24px);overflow:auto}
    .sk-rail .btn{width:100%;padding:5px 8px;font-size:.82rem;justify-content:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sk-rail .sk-clock{font-size:1.7rem;font-weight:800;color:var(--blue-d);font-variant-numeric:tabular-nums;text-align:center;line-height:1.1}
    .sk-rail .sk-sep{border-top:1px solid var(--line);margin:3px 0}
    .sk-crit{cursor:pointer;user-select:none}
    .sk-crit:hover{color:var(--blue-d)}
    .sk-pic{margin:10px 0;border:1.5px solid var(--ink);border-radius:3px;padding:8px 10px;background:#fff}
    .sk-pic img{display:block;width:100%;max-height:360px;object-fit:contain;cursor:zoom-in;background:#fff}
    .sk-full{position:fixed;inset:0;z-index:9500;background:#111;display:flex;flex-direction:column}
    .sk-full img{flex:1;min-height:0;width:100%;object-fit:contain;padding:8px 16px 16px}
    @media (max-width:1100px){
      .sk-wrap{padding-right:0;padding-bottom:120px}
      .sk-save{position:static!important}
      .sk-rail{top:auto;bottom:10px;left:50%;right:auto;transform:translateX(-50%);width:auto;max-width:calc(100vw - 24px);flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center}
      .sk-rail .btn{width:auto}
      .sk-rail .sk-sep{display:none}
    }
  </style>`;
}
/* Raíl anclado: el reloj (siempre a la vista del examinador), Start/Pause,
   y botones para subir, bajar y saltar a cada parte, candidato y al guardado. */
function _skRailHTML(test, cands){
  const parts = test.parts.map(p=>`<button class="btn sm ${_sk.part===p.n?'':'ghost'}" onclick="window._skPart(${p.n})">Part ${p.n}</button>`).join('');
  const cs = cands.map(c=>`<button class="btn sm ghost" title="${esc(c.p.full_name)}" onclick="window._skGo('skCand-${c.seat}')">👤 ${c.seat} · ${esc(c.p.full_name.split(' ')[0])}</button>`).join('');
  return `<div class="sk-rail" data-i18n="off">
    <div class="sk-clock" id="skClock">${_skTimerText()}</div>
    <div class="row" style="gap:4px;justify-content:center;flex-wrap:nowrap">
      <button class="btn sm ghost" id="skTimerBtn" style="flex:1" onclick="window._skTimerToggle()">${_sk.timer.id?'⏸ Pause':'▶ Start'}</button>
      <button class="btn sm ghost" style="width:auto;flex:0 0 auto" title="Reset" onclick="window._skTimerReset(true)">↺</button>
    </div>
    <div class="sk-sep"></div>
    <button class="btn sm ghost" onclick="window._skGo('skTop')">▲ Top</button>
    ${parts}
    ${cs}
    <button class="btn sm ghost" onclick="window._skGo('skSave')">💾 Save</button>
    <button class="btn sm ghost" onclick="window._skGo('bottom')">▼ Bottom</button>
  </div>`;
}
window._skGo = (id)=>{
  if(id==='bottom'){ window.scrollTo({top:document.documentElement.scrollHeight, behavior:'smooth'}); return; }
  const el=document.getElementById(id); if(!el) return;
  if(id==='skTop') window.scrollTo({top:0, behavior:'smooth'}); else el.scrollIntoView({behavior:'smooth', block:'start'});
};
/* Lámina a pantalla completa (para girar la pantalla hacia los candidatos). */
window._skShowPic = (src, caption)=>{
  window._skHidePic();
  const d=document.createElement('div'); d.className='sk-full'; d.id='skFull'; d.setAttribute('data-i18n','off');
  d.innerHTML=`<div class="row" style="justify-content:space-between;align-items:center;padding:10px 16px;color:#fff;flex-wrap:nowrap">
      <span style="font-weight:700">${esc(caption)}</span>
      <span style="display:flex;gap:10px;align-items:center;flex:0 0 auto"><span id="skFullClock" style="font-weight:800;font-variant-numeric:tabular-nums;opacity:.85">${_skTimerText()}</span><button class="btn sm" onclick="window._skHidePic()">✕ Close</button></span>
    </div><img src="${esc(src)}" alt="${esc(caption)}" onclick="window._skHidePic()">`;
  document.body.appendChild(d);
  document.addEventListener('keydown', _skEscKey);
};
function _skEscKey(e){ if(e.key==='Escape') window._skHidePic(); }
window._skHidePic = ()=>{ const d=document.getElementById('skFull'); if(d) d.remove(); document.removeEventListener('keydown', _skEscKey); };
function _skCandHTML(c){
  const D=_skData(); const r=D.rubrics[_sk.level]; const m=_sk.marks[c.id]||{}; const res=_skResult(c.id);
  const rows = res.crits.map(crit=>{
    const isG = crit===r.global; const v=m[crit]; const cq=crit.replace(/'/g,"\\'");
    const open = !!((_sk.openDesc||{})[c.id+'|'+crit]);
    const btns=[0,1,2,3,4,5].map(b=>`<button onclick="window._skMark('${c.id}','${cq}',${b})" style="width:34px;height:32px;border-radius:8px;border:2px solid ${v===b?'var(--blue)':'var(--line)'};background:${v===b?'var(--blue)':'var(--card)'};color:${v===b?'#fff':'var(--ink)'};font-weight:700;cursor:pointer;font:inherit;font-weight:700">${b}</button>`).join('');
    const desc = v!=null ? D.describe(_sk.level, crit, v) : '';
    /* El nombre del criterio se pulsa: despliega qué es cada banda 5·4·3·2·1·0
       (y cada línea se pulsa para marcar esa banda). */
    const bands = open ? `<div data-i18n="off" style="margin:6px 0 2px;border:1px solid var(--line);border-radius:8px;overflow:hidden;font-size:.8rem;background:var(--card)">${[5,4,3,2,1,0].map(b=>`<div onclick="window._skMark('${c.id}','${cq}',${b})" style="display:flex;gap:8px;padding:5px 8px;cursor:pointer;border-top:${b===5?'0':'1px solid var(--line)'};background:${v===b?'var(--lila)':'transparent'}"><b style="flex:0 0 18px;color:var(--blue-d)">${b}</b><span style="line-height:1.35">${esc(D.describe(_sk.level,crit,b))}</span></div>`).join('')}</div>` : '';
    return `<div style="padding:8px 0;border-top:1px solid var(--line)${isG?';background:var(--bg);margin:0 -16px;padding:8px 16px':''}">
      <div class="row" style="justify-content:space-between;gap:8px">
        <span class="sk-crit" style="font-weight:700;font-size:.9rem" title="What does each band mean?" onclick="window._skToggleCrit('${c.id}','${cq}')">${isG?'⭐ ':''}${esc(crit)} <span class="muted" style="font-weight:500;font-size:.75rem">${open?'▾':'▸'}</span></span>
        <span style="display:flex;gap:4px">${btns}</span>
      </div>
      ${bands}
      ${!open&&desc?`<div data-i18n="off" class="muted" style="font-size:.8rem;margin-top:4px;line-height:1.35">${esc(desc)}</div>`:''}
    </div>`;
  }).join('');
  const resHTML = res.all
    ? `<div class="row" style="justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:2px solid var(--blue)">
         <span style="font-weight:800;font-size:1.1rem;color:var(--blue-d)">${res.sum} / ${res.total} · ${res.pct}%</span>
         <span class="muted" style="font-size:.82rem">mean ${res.mean.toFixed(1)} · Cambridge ${res.weighted}/${res.weightedMax}</span>
         <span style="background:var(--lila);color:var(--blue-dd);border-radius:8px;padding:3px 12px;font-weight:800;font-size:1.05rem">${res.letter} <span style="font-weight:500;font-size:.8rem">${esc(D.LETTERS[res.letter])}</span></span>
       </div>`
    : `<div class="muted" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line);font-size:.85rem">Mark every criterion to see the result · ${res.crits.filter(k=>m[k]!=null).length}/${res.crits.length}</div>`;
  return `<div class="card" id="skCand-${c.seat}" style="padding:12px 16px">
    <div class="row" style="justify-content:space-between">
      <h3 style="margin:0"><span class="badge grade">Candidate ${c.seat}</span> ${esc(c.p.full_name)}</h3>
      <span class="muted" style="font-size:.82rem">${c.p.section?'Sec. '+esc(c.p.section):''}${c.p.cefr_level?' · '+esc(c.p.cefr_level):''}</span>
    </div>
    <div style="margin-top:6px">${rows}</div>
    ${resHTML}
    <textarea rows="2" placeholder="Comment for ${esc(c.p.full_name.split(' ')[0])} (optional)" style="width:100%;margin-top:8px;padding:8px;border:1px solid var(--line);border-radius:8px;font:inherit" oninput="_sk.comments['${c.id}']=this.value">${esc(_sk.comments[c.id]||'')}</textarea>
  </div>`;
}
function _skDescTableHTML(r){
  const D=_skData(); const crits=r.criteria.concat([r.global]);
  return `<div style="overflow:auto;margin-top:8px"><table style="font-size:.8rem">
    <thead><tr><th style="text-align:left;width:22%">Criterion</th><th style="text-align:left">Band 5</th><th style="text-align:left">Band 3</th><th style="text-align:left">Band 1</th></tr></thead>
    <tbody>${crits.map(c=>`<tr><td style="font-weight:700;vertical-align:top">${c===r.global?'⭐ ':''}${esc(c)}</td><td style="vertical-align:top">${esc(D.describe(_sk.level,c,5))}</td><td style="vertical-align:top">${esc(D.describe(_sk.level,c,3))}</td><td style="vertical-align:top">${esc(D.describe(_sk.level,c,1))}</td></tr>`).join('')}</tbody>
  </table><p class="muted" style="font-size:.78rem;margin:6px 0 0">Bands 2 and 4 share features of the bands either side. Band 0 = performance below Band 1.</p></div>`;
}
/* El guion, bloque a bloque, con la maqueta del PDF: turnos con el hablante
   en el margen, cajas enmarcadas para lo que se lee, «Back-up prompts» al
   lado y las instrucciones en cursiva. */
function _skPartHTML(p){
  const B = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
  const lines = arr => arr.map(l=>l===''?'<div style="height:.55em"></div>':`<div>${B(l)}</div>`).join('');
  const box = (arr, small) => `<div style="border:1.5px solid var(--ink);border-radius:3px;padding:10px 14px;margin:8px 0;${small?'display:inline-block;':''}">${lines(arr)}</div>`;
  const who = (w, arr, italic, italicFirst) => `<div style="display:flex;gap:12px;margin:6px 0"><div style="flex:0 0 78px;font-weight:700">${esc(w)}</div><div style="flex:1;${italic?'font-style:italic':''}">${arr.map((l,i)=>l===''?'<div style="height:.55em"></div>':`<div style="${italicFirst&&i<italicFirst?'font-style:italic':''}">${B(l)}</div>`).join('')}</div></div>`;
  const out = [];
  out.push(`<div style="font-weight:800;font-size:1.15rem">Part ${p.n} <span style="font-weight:500">(${esc(p.mins)})</span></div>`);
  if(p.title) out.push(`<div style="margin:6px 0 2px;letter-spacing:.04em">${esc(p.title)}</div>`);
  if(p.note) out.push(`<div style="display:inline-block;border:1.5px solid var(--ink);padding:4px 14px;margin:6px 0;letter-spacing:.04em">${esc(p.note)}</div>`);
  out.push(`<div style="display:flex;gap:12px;margin:8px 0 12px"><div style="flex:0 0 78px;font-weight:700">Tasks</div><div>${esc(p.tasks)}</div></div>`);
  (p.blocks||[]).forEach(b=>{
    if(b.t==='h') out.push(`<div style="font-weight:700;margin-top:${b.text==='Examiner'?'0':'12px'}">${esc(b.text)}</div>`);
    else if(b.t==='it') out.push(`<div style="font-style:italic;margin:8px 0">${esc(b.text)}</div>`);
    else if(b.t==='p') out.push(`<div style="margin:6px 0">${B(b.text)}</div>`);
    else if(b.t==='ul') out.push(`<ul style="margin:6px 0 8px;padding-left:22px">${b.lines.map(l=>`<li style="margin:3px 0">${B(l)}</li>`).join('')}</ul>`);
    else if(b.t==='sp') out.push(who(b.who, b.lines, b.italic));
    else if(b.t==='box') out.push(box(b.lines, b.small));
    else if(b.t==='bk') out.push(`<div style="border:1.5px solid var(--ink);border-radius:3px;padding:8px 14px;margin:8px 0;display:inline-block"><div style="font-weight:700;text-align:center">${esc(b.title)}</div>${b.lines.map((l,i)=>`<div>${b.numbered?(i+1)+'. ':''}${B(l)}</div>`).join('')}</div>`);
    else if(b.t==='pic'){
      /* La lámina del libro en el punto del guion donde se enseña: Parte 2 la
         misma para todos; Parte 3 la del candidato. «Show» la abre a pantalla
         completa para girar la pantalla hacia los alumnos. */
      const pic = b.seat ? (p.pics||{})[b.seat] : p.pic; if(!pic) return;
      const who = b.seat ? 'Candidate '+b.seat : 'the candidates';
      const cap = `Picture ${pic.id}${p.title?' · '+p.title:''}${b.seat?' · Candidate '+b.seat:''}`;
      out.push(`<div class="sk-pic">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-weight:700;font-size:.85rem">🖼 ${esc(cap)}</span>
          <button class="btn sm" style="padding:4px 12px" onclick="window._skShowPic('${esc(pic.src)}','${esc(cap)}')">⛶ Show to ${who}</button>
        </div>
        <img src="${esc(pic.src)}" alt="${esc(cap)}" loading="lazy" onclick="window._skShowPic('${esc(pic.src)}','${esc(cap)}')">
      </div>`);
    }
    else if(b.t==='side'){
      const left = b.plain
        ? `<div style="padding:4px 0">${b.left.map(x=>lines(x.lines)).join('')}</div>`
        : `<div style="border:1.5px solid var(--ink);border-radius:3px;padding:10px 14px">${b.left.map(x=>who(x.who, x.lines, false, x.italicFirst)).join('')}</div>`;
      const right = `<div style="border:1.5px solid var(--ink);border-radius:3px;padding:10px 14px">${lines(b.right.lines)}</div>`;
      out.push(`<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin:10px 0;align-items:start">
        <div>${left}</div>
        <div>${b.right.title?`<div style="font-weight:700;margin-bottom:4px">${esc(b.right.title)}</div>`:'<div style="height:1.4em"></div>'}${right}</div></div>`);
    }
  });
  return out.join('');
}
window._skPart = (n)=>{ _sk.part=n; window._skHidePic(); const y=window.scrollY; _skPaint(); window.scrollTo(0,y); };
window._skToggleDesc = ()=>{ _sk.showDesc=!_sk.showDesc; const y=window.scrollY; _skPaint(); window.scrollTo(0,y); };
window._skToggleCrit = (id, crit)=>{
  _sk.openDesc = _sk.openDesc||{}; const k=id+'|'+crit; _sk.openDesc[k]=!_sk.openDesc[k];
  const y=window.scrollY; _skPaint(); window.scrollTo(0,y);
};
window._skMark = (id, crit, band)=>{
  (_sk.marks[id]=_sk.marks[id]||{})[crit]=band;
  const y=window.scrollY; _skPaint(); window.scrollTo(0,y);
};

/* ---------- Cronómetro (2-3 min por parte; solo orienta) ---------- */
function _skTimerText(){ const t=_sk.timer; const ms=t.acc+(t.t0?Date.now()-t.t0:0); const s=Math.floor(ms/1000); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
function _skTimerStop(){ const t=_sk.timer; if(t.id){ clearInterval(t.id); t.id=null; } if(t.t0){ t.acc+=Date.now()-t.t0; t.t0=null; } }
function _skTimerPaint(){ const txt=_skTimerText(); const el=$('#skClock'); if(el) el.textContent=txt; const f=document.getElementById('skFullClock'); if(f) f.textContent=txt; return !!el; }
function _skTimerReset(repaint){ _skTimerStop(); _sk.timer.acc=0; if(repaint){ _skTimerPaint(); const b=$('#skTimerBtn'); if(b) b.textContent='▶ Start'; } }
window._skTimerReset = _skTimerReset;
window._skTimerToggle = ()=>{
  const t=_sk.timer;
  if(t.id){ _skTimerStop(); }
  else { t.t0=Date.now(); t.id=setInterval(()=>{ if(!_skTimerPaint()) _skTimerStop(); },500); }
  const b=$('#skTimerBtn'); if(b) b.textContent = t.id ? '⏸ Pause' : '▶ Start';
};

/* ---------- Guardar ---------- */
window._skSave = async ()=>{
  const st=$('#skStatus'); const D=_skData(); const r=D.rubrics[_sk.level];
  const cands=_skCands();
  const missing = cands.filter(c=>!_skResult(c.id).all);
  if(missing.length){ st.innerHTML=`<span style="color:var(--bad)">Mark every criterion for ${missing.map(c=>'Candidate '+c.seat).join(' and ')} before saving.</span>`; return; }
  st.textContent='Saving…';
  const me=(state.session&&state.session.user&&state.session.user.id)||null;
  const gid=parseInt(_sk.grade,10)||null;
  const now=new Date().toISOString();
  const rows=cands.map(c=>{
    const res=_skResult(c.id);
    return { session_id:_sk.sessionId, student_id:c.id, grade_id:gid, section:(c.p.section||_sk.section||null),
      level:_sk.level, test_no:_sk.test, seat:c.seat, marks:_sk.marks[c.id], score:res.sum, total:res.total,
      percent:res.pct, band:res.letter, comment:(_sk.comments[c.id]||'').trim()||null,
      partners:cands.filter(x=>x.id!==c.id).map(x=>x.id), examiner:me, updated_at:now };
  });
  const { error } = await sb.from('speaking_tests').upsert(rows, { onConflict:'session_id,student_id' });
  if(error){ st.innerHTML=`<span style="color:var(--bad)">Could not save: ${esc(error.message)}</span>`; return; }
  let extra='';
  if(_sk.saveCycle){
    const cycle=parseInt(_sk.saveCycle,10);
    const fails=[];
    for(const c of cands){
      const res=_skResult(c.id);
      const breakdown={ kind:'speaking-graded', parts:res.crits.map(k=>({part:k, correct:_sk.marks[c.id][k], total:5})) };
      const { error:e2 } = await sb.rpc('upsert_speaking', { p_student:c.id, p_level:_sk.level, p_score:res.sum, p_total:res.total,
        p_percent:res.pct, p_breakdown:breakdown, p_comment:(_sk.comments[c.id]||'').trim()||null, p_cycle:cycle });
      if(e2) fails.push(c.p.full_name+': '+e2.message);
    }
    extra = fails.length ? ` <span style="color:var(--bad)">MOCK ${cycle} Speaking not updated for ${esc(fails.join(' · '))}</span>` : ` Also recorded as MOCK ${cycle} Speaking.`;
  }
  st.innerHTML=`<span style="color:#166534">✓ Saved for ${cands.map(c=>esc(c.p.full_name)).join(', ')}.${extra}</span>`;
  // Refresca el historial en segundo plano para que «Back» ya lo muestre.
  try{ const { data:hist } = await sb.from('speaking_tests').select('*').eq('grade_id',gid).order('created_at',{ascending:false}).limit(300); _sk.history=hist||[]; }catch(e){}
};
