/* ===================== MOCK MODE (18-sep-2026) =====================
   El dia del simulacro el alumno solo ve su mock: la portada es UNA tarjeta
   con los papers en orden (Reading → Listening → Writing) y ninguna otra ruta
   del portal responde. Dos formas de entrar en mock mode:

   MOCK OFICIAL   el admin elige el NUMERO de mock (1-7) que rinde todo el
                  colegio (mock_official, una fila) y desbloquea los grados
                  que lo rinden ese dia (mock_access, el candado de siempre).
                  Grado desbloqueado + numero puesto = mock mode para todos
                  sus alumnos, cada uno en su nivel: el de su perfil
                  (cefr_level) o, si no lo tiene, el que elija de los de su
                  ruta (secCoursesFor).
   MOCK INDIVIDUAL un alumno concreto (mock_individual), elegido por grado →
                  seccion → alumno; lo asigna el admin o un profesor que
                  cubra su grado. Manda sobre el oficial. El resto de la clase
                  sigue trabajando.

   Los demas dias el alumno no ve ninguna tarjeta de mocks (ni bloqueada): la
   puerta «Mocks» de la pista Cambridge y la seccion MOCKS del indice del motor
   son solo del staff. El motor (mocks-cambridge/nis-bridge.js) arranca el
   examen directo con ?official=1 y devuelve aqui al terminar.
   La verdad la lee cada sitio de las mismas tablas; el portal solo pinta y
   cierra la puerta. Pedido por Paolo el 18-sep-2026. */

const MOCK_LEVELS = ['A2','B1','B2','C1'];
const MOCK_LEVEL_NAMES = { A2:'A2 Key', B1:'B1 Preliminary', B2:'B2 First', C1:'C1 Advanced' };
const MOCK_SKILLS = { A2:['Reading','Listening'], B1:['Reading','Listening','Writing'],
                      B2:['Reading','Listening','Writing'], C1:['Reading','Listening','Writing'] };
const MOCK_PAGE = { Reading:'reading-quiz.html', Listening:'listening-quiz.html', Writing:'writing-quiz.html' };
const MOCK_SKILL_LABEL = { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing' };
const MOCK_SKILL_ICON = { Reading:'📖', Listening:'🎧', Writing:'✍️' };

/* El dia es el de Lima (UTC-5, sin horario de verano): un intento de las
   21:00 sigue siendo de hoy aunque en UTC ya sea manana. */
function _mockHoyISO(){
  const lima = new Date(Date.now() - 5*3600e3).toISOString().slice(0,10);
  return lima + 'T05:00:00.000Z';
}
/* Niveles entre los que puede rendir el alumno: el de su perfil si lo tiene;
   si no, LOS CUATRO. (El 19-sep-2026 se limitaba a la ruta del grado y en
   8.º no salia C1: el mock es «independientemente del nivel», asi que el
   alumno elige el que le diga su profesor, sea cual sea su grado.) */
function _mockLevelsFor(p){
  const fijo = String(p.cefr_level||'').toUpperCase();
  return MOCK_LEVELS.includes(fijo) ? [fijo] : MOCK_LEVELS.slice();
}

/* ---------- el alumno: ¿esta hoy en mock mode? ---------- */
async function loadMockMode(){
  const p = state.profile;
  if(!p || p.role!=='student') return null;
  try{
    const [ind, off, acc] = await Promise.all([
      p.id ? sb.from('mock_individual').select('mock,level').eq('student_id',p.id).maybeSingle() : Promise.resolve({data:null}),
      sb.from('mock_official').select('mock').eq('id',1).maybeSingle(),
      p.grade_id!=null ? sb.from('mock_access').select('unlocked').eq('grade_id',p.grade_id).maybeSingle() : Promise.resolve({data:null}),
    ]);
    let mode=null, mock=null, fijo=null;
    if(ind.data && ind.data.mock){ mode='individual'; mock=ind.data.mock; fijo=ind.data.level||null; }
    else if(off.data && off.data.mock && acc.data && acc.data.unlocked){ mode='official'; mock=off.data.mock; }
    if(!mode) return null;
    const levels = fijo ? [fijo] : _mockLevelsFor(p);
    let level = levels.length===1 ? levels[0] : null;
    if(!level){ try{ const s=sessionStorage.getItem('nis-mock-level'); if(levels.includes(s)) level=s; }catch(_){} }
    let atts = [];
    if(p.id){
      const r = await sb.from('exam_attempts').select('skill,level').eq('student_id',p.id).eq('mock','mock'+mock).gte('submitted_at', _mockHoyISO());
      atts = r.data || [];
    }
    return { mode, mock, level, levels, atts };
  }catch(e){ console.warn('[mock mode]', e); return null; }
}
function mockModeActive(){ return !!(state.mockMode && _isStudent()); }
function mockModeBlock(){
  const M = state.mockMode || {};
  const t = M.mode==='individual' ? 'Today you only have your individual mock' : 'Today the portal is in MOCK MODE';
  const msg = t + (M.mock ? ' (MOCK '+M.mock+(M.level?' · '+MOCK_LEVEL_NAMES[M.level]:'')+')' : '') + '. Nothing else is open until tomorrow.';
  if(window.NISUI && NISUI.avisa) NISUI.avisa(msg, {titulo:'Mock mode'}); else alert(msg);
}
function _mockCss(){
  if(document.getElementById('mockModeCss')) return;
  const s=document.createElement('style'); s.id='mockModeCss';
  s.textContent=`
.mock-card{position:relative;overflow:hidden;border-radius:18px;padding:26px 28px;margin:14px 0 18px;color:#fff;
  background:linear-gradient(135deg,#244c77 0%,#4987c6 55%,#6d4fc2 100%);box-shadow:0 20px 44px -22px rgba(36,76,119,.7)}
.mock-card.indiv{background:linear-gradient(135deg,#1f6b45 0%,#2e9c6a 55%,#4987c6 100%);box-shadow:0 20px 44px -22px rgba(31,107,69,.7)}
.mock-card::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:18px 18px;opacity:.6;pointer-events:none}
.mock-card > *{position:relative;z-index:1}
.mock-card .mk{display:inline-flex;align-items:center;gap:8px;font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);padding:5px 12px;border-radius:999px}
.mock-card h2{font-size:1.9rem;margin:12px 0 4px;color:#fff}
.mock-card .sub{color:rgba(255,255,255,.9);font-size:.95rem;max-width:64ch}
.mock-card .papers{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-top:20px}
.mock-paper{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;text-align:left;background:#fff;color:#1a2b40;border:none;border-radius:14px;
  padding:15px 16px 15px 50px;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px -14px rgba(15,23,42,.6);transition:transform .15s}
.mock-paper .num{position:absolute;left:13px;top:13px;width:27px;height:27px;border-radius:50%;background:#2f5f93;color:#fff;font-weight:800;font-size:.85rem;display:flex;align-items:center;justify-content:center}
.mock-paper:hover{transform:translateY(-2px)}
.mock-paper .ic{font-size:1.25rem}
.mock-paper b{font-size:1rem}
.mock-paper small{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2f5f93}
.mock-paper.next{outline:3px solid #f6c344;outline-offset:2px}
.mock-paper.next small{color:#9a6200}
.mock-paper.done{background:rgba(255,255,255,.18);color:#fff;cursor:default;box-shadow:none;border:1px solid rgba(255,255,255,.35)}
.mock-paper.done:hover{transform:none}
.mock-paper.done .num{background:#2e9c6a}
.mock-paper.done small{color:#bdf3d4}
.mock-steps{display:flex;gap:14px;flex-wrap:wrap;margin-top:16px;font-size:.8rem;color:rgba(255,255,255,.85)}
.mock-steps b{color:#fff}
.mock-lv{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
.mock-lv button{background:#fff;color:#244c77;border:none;border-radius:12px;padding:12px 18px;font-weight:800;font-size:1rem;cursor:pointer;font-family:inherit}
.mock-lv button small{display:block;font-weight:600;font-size:.72rem;color:#2f5f93;text-transform:none;letter-spacing:0}
.mock-lv button:hover{transform:translateY(-2px)}
.mm-mode{display:flex;align-items:center;gap:12px;border-radius:14px;padding:12px 16px;margin:0 0 14px;font-weight:600;color:#fff;background:linear-gradient(135deg,#244c77,#6d4fc2)}
.mm-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;align-items:end}
.mm-form label{display:flex;flex-direction:column;gap:5px;font-size:.78rem;font-weight:700;color:var(--muted)}
.mm-form select{padding:8px 10px;border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.92rem;background:var(--card,#fff);color:inherit;min-width:0}
.mm-num{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px}
.mm-num button{border:1.5px solid var(--blue);background:var(--card,#fff);color:var(--blue-d);border-radius:10px;padding:9px 14px;font-weight:800;cursor:pointer;font-family:inherit;font-size:.95rem}
.mm-num button.on{background:var(--blue-d);color:#fff}
.mm-num button:disabled{opacity:.45;cursor:default}
`;
  document.head.appendChild(s);
}
/* La portada del alumno en mock mode. */
function mockModeHub(){
  _setNav('home');
  _mockCss();
  const p = state.profile, M = state.mockMode;
  const indiv = M.mode==='individual';
  const first = esc(p.first_name || (p.full_name||'').split(' ')[0] || '');
  let cuerpo;
  if(!M.level){
    // Sin nivel en el perfil: el alumno elige el suyo (los de su ruta).
    cuerpo = `<p class="sub">Choose the level your teacher told you to sit. Ask before choosing if you are not sure.</p>
      <div class="mock-lv">${M.levels.map(l=>`<button type="button" onclick="window._mockPickLevel('${l}')">${l}<small>${esc(MOCK_LEVEL_NAMES[l])}</small></button>`).join('')}</div>`;
  } else {
    const skills = MOCK_SKILLS[M.level];
    const done = {}; (M.atts||[]).forEach(a=>{ if(a.level===M.level) done[a.skill]=true; });
    const pend = skills.filter(s=>!done[s]); const sig = pend[0]||null;
    const papers = skills.map((sk,i)=>{
      const h = !!done[sk], n = sk===sig;
      return `<button type="button" class="mock-paper${h?' done':(n?' next':'')}" ${h?'disabled':`onclick="window._mockGo('${sk}')"`}>
        <span class="num">${h?'✓':(i+1)}</span><span class="ic">${MOCK_SKILL_ICON[sk]}</span><b>${esc(MOCK_SKILL_LABEL[sk])}</b>
        <small>${h?'Submitted':(n?'Next · start':'Pending')}</small></button>`;
    }).join('');
    const texto = !pend.length ? `Done! You have submitted all ${skills.length} papers. Tomorrow the portal is back to normal.`
      : (indiv ? 'Your teacher assigned you this mock for today. Sit the papers in order: when you finish one you come back here for the next. Nothing else is open until tomorrow.'
               : 'Today is mock day. Sit the papers in order: when you finish one you come back here for the next. Nothing else is open until tomorrow.');
    cuerpo = `<p class="sub">${texto}</p><div class="papers">${papers}</div>
      <div class="mock-steps">${skills.map((s,i)=>`<span><b>${i+1}</b> ${esc(MOCK_SKILL_LABEL[s])}${i<skills.length-1?' →':''}</span>`).join('')}<span>· The timer runs as in the real exam and your result is saved by itself.</span></div>
      ${M.levels.length>1 ? `<div style="margin-top:12px;font-size:.8rem;opacity:.85"><a style="color:#fff;cursor:pointer;text-decoration:underline" onclick="window._mockPickLevel('')">Change level</a></div>` : ''}`;
  }
  $('#main').innerHTML = `<h1>Hi, ${first} 👋</h1>
    <p class="muted" style="margin-top:-6px">${indiv ? 'You have an <b>individual mock</b> assigned for today.' : 'Today the portal is in <b>MOCK MODE</b>.'} Only the exam is open.</p>
    <div class="mock-card${indiv?' indiv':''}">
      <span class="mk">🎓 ${indiv?'Mock individual':'Mock oficial'}</span>
      <h2>${M.level ? esc(MOCK_LEVEL_NAMES[M.level])+' · ' : ''}MOCK ${M.mock}</h2>
      ${cuerpo}
    </div>`;
}
window._mockPickLevel = (l)=>{
  if(!state.mockMode) return;
  const ok = l && state.mockMode.levels.includes(l);
  state.mockMode.level = ok ? l : null;
  try{ if(ok) sessionStorage.setItem('nis-mock-level', l); else sessionStorage.removeItem('nis-mock-level'); }catch(_){}
  mockModeHub();
};
/* Abre el paper en el motor. level/mock van solo como pista: nis-bridge.js
   vuelve a leer las tablas antes de arrancar nada. back=./ devuelve al inicio. */
window._mockGo = (skill)=>{
  const M = state.mockMode; if(!M || !M.level || !MOCK_PAGE[skill]) return;
  location.href = QUIZ_URL + MOCK_PAGE[skill] + '?official=1&level=' + M.level + '&mock=' + M.mock + '&back=' + encodeURIComponent('./');
};

/* ---------- el panel del staff: 🔓 Open Mocks (admin) / 🎯 Mock individual (profesor) ---------- */
let _mm = { official:null, access:{}, indiv:[], sat:{}, grade:'', section:'', students:[], student:'', loading:false };
async function mockModePanel(op){
  op = op || {}; const admin = !!op.admin;
  _mockCss();
  $('#main').innerHTML = `<div class="center muted">Loading…</div>`;
  const grades = admin ? GRADES : teacherAllowedGrades();
  try{
    const [off, acc, ind] = await Promise.all([
      sb.from('mock_official').select('mock,updated_at').eq('id',1).maybeSingle(),
      sb.from('mock_access').select('grade_id,unlocked,updated_at').order('grade_id'),
      // profiles va por su FK: la tabla tiene dos (student_id y updated_by) y sin
      // nombrarla PostgREST no sabe cual embeber.
      sb.from('mock_individual').select('student_id,mock,level,updated_at, profiles!mock_individual_student_id_fkey(full_name,grade_id,section,cefr_level,grades(name))').order('updated_at',{ascending:false}),
    ]);
    if(off.error||acc.error||ind.error) throw (off.error||acc.error||ind.error);
    _mm.official = off.data || {mock:null};
    _mm.access = {}; (acc.data||[]).forEach(r=>_mm.access[r.grade_id]=r);
    _mm.indiv = (ind.data||[]).filter(r=>!admin ? grades.some(g=>g.id===(r.profiles&&r.profiles.grade_id)) : true);
    // Quien rindio hoy: por grado (oficial) y por alumno (individual).
    _mm.sat = {}; _mm.satIndiv = {};
    const mocks = new Set(); if(_mm.official.mock) mocks.add('mock'+_mm.official.mock); _mm.indiv.forEach(r=>mocks.add('mock'+r.mock));
    if(mocks.size){
      const r = await sb.from('exam_attempts').select('student_id,skill,level,mock, profiles(grade_id)').in('mock',[...mocks]).gte('submitted_at',_mockHoyISO());
      (r.data||[]).forEach(a=>{
        const g=a.profiles&&a.profiles.grade_id;
        if(a.mock==='mock'+_mm.official.mock && g!=null){ (_mm.sat[g]=_mm.sat[g]||new Set()).add(a.student_id); }
        (_mm.satIndiv[a.student_id]=_mm.satIndiv[a.student_id]||{})[a.mock+'|'+a.skill]=true;
      });
    }
  }catch(e){ $('#main').innerHTML=`<div class="note err">${esc(e.message||e)}</div>`; return; }
  _mm.admin = admin; _mm.grades = grades;
  _mockPaint();
}
function _mockPaint(){
  const admin = _mm.admin, grades = _mm.grades, N = _mm.official.mock || null;
  const abiertos = grades.filter(g=>_mm.access[g.id]&&_mm.access[g.id].unlocked);
  const modeOn = !!(N && abiertos.length);
  // ---- MOCK OFICIAL ----
  const nums = [1,2,3,4,5,6,7].map(n=>`<button type="button" class="${N===n?'on':''}" ${admin?`onclick="window._mockSetOfficial(${n})"`:'disabled'}>MOCK ${n}</button>`).join('')
    + `<button type="button" ${admin?`onclick="window._mockSetOfficial(null)"`:'disabled'} style="border-color:var(--bad);color:var(--bad)">None</button>`;
  const rows = grades.map(g=>{
    const r=_mm.access[g.id]; const on=!!(r&&r.unlocked);
    const when=(r&&r.updated_at)?new Date(r.updated_at).toLocaleString():'';
    const sat = _mm.sat[g.id] ? _mm.sat[g.id].size : 0;
    return `<tr>
      <td><b>${g.name}</b></td>
      <td><span class="badge ${on?'on':'off'}">${on?(N?'🎓 MOCK MODE · MOCK '+N:'🔓 Unlocked'):'🔒 Locked'}</span></td>
      <td class="muted" style="font-size:.82rem">${on&&N ? sat+' sat today' : ''}</td>
      <td class="muted" style="font-size:.82rem">${when}</td>
      <td>${admin?`<button class="btn sm ${on?'ghost':''}" onclick="window._mockToggleGrade(${g.id}, ${on?'false':'true'}, this)">${on?'Lock':'Unlock'}</button>`:''}</td>
    </tr>`;
  }).join('');
  const oficial = `
    <div class="card">
      <h2 style="margin:0 0 4px">🎓 MOCK OFICIAL — the whole school</h2>
      <div class="muted" style="font-size:.86rem;margin-bottom:10px">Choose the <b>mock number everyone sits</b>, whatever their level (each student sits it at their own level), then <b>unlock the grades</b> that sit it today. An unlocked grade with a number set is in <b>MOCK MODE</b>: its students see only the mock card on their home page and nothing else opens until you lock the grade again.${admin?'':' <b>Only the admin changes this.</b>'}</div>
      ${modeOn ? `<div class="mm-mode">🔒 <div>MOCK MODE is ON — <b>MOCK ${N}</b> for ${abiertos.map(g=>g.name).join(', ')}. Those students only see their mock.</div></div>` : (N ? `<div class="note" style="margin:0 0 10px">MOCK ${N} is set but <b>no grade is unlocked</b>: nobody is in mock mode yet.</div>` : '')}
      <div style="font-weight:700;font-size:.85rem;color:var(--muted)">Mock number for everyone</div>
      <div class="mm-num">${nums}</div>
    </div>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Grade</th><th>Mocks status</th><th>Today</th><th>Last updated</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  // ---- MOCK INDIVIDUAL ----
  const optG = `<option value="">— grade —</option>` + grades.map(g=>`<option value="${g.id}" ${String(g.id)===String(_mm.grade)?'selected':''}>${g.name}</option>`).join('');
  const optS = `<option value="">All</option>` + ['A','B'].map(s=>`<option value="${s}" ${s===_mm.section?'selected':''}>${s}</option>`).join('');
  const lista = (_mm.students||[]).filter(s=>!_mm.section || (s.section||'').toUpperCase()===_mm.section);
  const optA = `<option value="">${_mm.grade ? (lista.length?'— student —':'— no students —') : '— grade first —'}</option>` + lista.map(s=>`<option value="${s.id}" ${s.id===_mm.student?'selected':''}>${esc(s.full_name||s.email)}${s.section?' · '+esc(s.section):''}${s.cefr_level?' · '+esc(s.cefr_level):''}</option>`).join('');
  const optM = [1,2,3,4,5,6,7].map(n=>`<option value="${n}" ${n===(_mm.mock||N||1)?'selected':''}>MOCK ${n}</option>`).join('');
  const optL = `<option value="">Student's level (profile / their choice)</option>` + MOCK_LEVELS.map(l=>`<option value="${l}" ${l===_mm.level?'selected':''}>${MOCK_LEVEL_NAMES[l]}</option>`).join('');
  const filas = _mm.indiv.map(r=>{
    const p=r.profiles||{}; const skills = MOCK_SKILLS[r.level||p.cefr_level] || null;
    const hechos = _mm.satIndiv[r.student_id]||{};
    const papers = skills ? skills.map(sk=>`<span style="margin-right:8px;font-size:.8rem;${hechos['mock'+r.mock+'|'+sk]?'color:var(--ok);font-weight:700':'color:var(--muted)'}">${hechos['mock'+r.mock+'|'+sk]?'✓':'○'} ${sk}</span>`).join('') : '<span class="muted" style="font-size:.8rem">level chosen by the student</span>';
    return `<tr><td><b>${esc(p.full_name||'?')}</b></td><td>${esc((p.grades&&p.grades.name)||'')} ${esc(p.section||'')}</td>
      <td><b>MOCK ${r.mock}</b>${r.level?' · '+esc(r.level):''}</td><td>${papers}</td>
      <td><button class="btn sm ghost" onclick="window._mockClearIndiv('${r.student_id}','${esc(p.full_name||'').replace(/'/g,'&#39;')}')">Remove</button></td></tr>`;
  }).join('');
  const individual = `
    <div class="card">
      <h2 style="margin:0 0 4px">🎯 MOCK INDIVIDUAL — one student</h2>
      <div class="muted" style="font-size:.86rem;margin-bottom:12px">Only that student enters mock mode; the rest of the class keeps working. Choose the grade, the section and the student, then the mock. If the student is also in a mock-mode grade today, the individual mock wins. Remove it when done.</div>
      <div class="mm-form">
        <label>Grade<select onchange="window._mockIndField('grade',this.value)">${optG}</select></label>
        <label>Section<select onchange="window._mockIndField('section',this.value)">${optS}</select></label>
        <label>Student<select onchange="window._mockIndField('student',this.value)" ${_mm.grade?'':'disabled'}>${optA}</select></label>
        <label>Mock<select id="mmMock">${optM}</select></label>
        <label>Level<select id="mmLevel">${optL}</select></label>
        <button class="btn" ${_mm.student?'':'disabled'} onclick="window._mockAssignIndiv()">Assign mock</button>
      </div>
    </div>
    ${filas ? `<div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Mock</th><th>Papers today</th><th></th></tr></thead><tbody>${filas}</tbody></table></div>`
      : `<p class="muted" style="font-size:.85rem">No student has an individual mock.</p>`}`;
  $('#main').innerHTML = `<h1>${admin ? 'Mocks — access control' : '🎯 Mock individual'}</h1>
    <div class="note">A student in mock mode sees <b>only the mock card</b> on their home page, with the papers in order (Reading → Listening → Writing); when a paper is submitted the engine brings them back to that card. On other days students see no mock card at all.</div>
    ${admin ? _examPreviewCard('mocks') : ''}
    ${oficial}
    ${individual}`;
}
window._mockSetOfficial = async (n)=>{
  if(!_mm.admin) return;
  const abiertos = _mm.grades.filter(g=>_mm.access[g.id]&&_mm.access[g.id].unlocked).map(g=>g.name);
  if(n && abiertos.length && !(await NISUI.pregunta(`Set MOCK ${n} for everyone? ${abiertos.join(', ')} ${abiertos.length>1?'are':'is'} unlocked, so their students enter MOCK MODE right now: they will only see the mock card.`, {titulo:'Mock oficial', si:'Yes, set MOCK '+n, no:'Cancel'}))) return;
  const { error } = await sb.from('mock_official').update({ mock:n, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null }).eq('id',1);
  if(error){ NISUI.avisa('Could not update: '+error.message, {titulo:'Error'}); return; }
  mockModePanel({admin:true});
};
window._mockToggleGrade = async (gradeId, to, btn)=>{
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const N = _mm.official && _mm.official.mock;
  if(to && N){ const g=(GRADES.find(x=>x.id===gradeId)||{}).name; if(!(await NISUI.pregunta(`Unlock ${g}? With MOCK ${N} set, its students enter MOCK MODE right now: they will only see the mock card until you lock the grade again.`, {titulo:'Mock oficial', si:'Unlock', no:'Cancel'}))){ mockModePanel({admin:true}); return; } }
  const { error } = await sb.from('mock_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'grade_id' });
  if(error){ NISUI.avisa('Could not update: '+error.message, {titulo:'Error'}); }
  mockModePanel({admin:true});
};
window._mockIndField = async (k, v)=>{
  if(k==='grade'){
    _mm.grade = v; _mm.student=''; _mm.students=[];
    if(v){
      const { data } = await sb.from('profiles').select('id,full_name,email,section,cefr_level').eq('role','student').eq('active',true).eq('grade_id',v).order('full_name');
      _mm.students = data||[];
    }
  } else if(k==='section'){ _mm.section=v; _mm.student=''; }
  else if(k==='student'){ _mm.student=v; }
  _mm.mock = parseInt(($('#mmMock')||{}).value||'0',10)||null; _mm.level = ($('#mmLevel')||{}).value||'';
  _mockPaint();
};
window._mockAssignIndiv = async ()=>{
  const sid=_mm.student; if(!sid) return;
  const mock=parseInt($('#mmMock').value,10), level=$('#mmLevel').value||null;
  const { error } = await sb.from('mock_individual').upsert(
    { student_id:sid, mock, level, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'student_id' });
  if(error){ NISUI.avisa('Could not assign: '+error.message, {titulo:'Error'}); return; }
  const s=(_mm.students||[]).find(x=>x.id===sid);
  NISUI.avisa(`${s?s.full_name:'The student'} is now in mock mode: MOCK ${mock}${level?' · '+level:''}.`, {titulo:'Mock individual'});
  _mm.student=''; mockModePanel({admin:_mm.admin});
};
window._mockClearIndiv = async (sid, nombre)=>{
  if(!(await NISUI.pregunta(`Remove the individual mock of ${nombre||'this student'}? They get the portal back at once.`, {titulo:'Mock individual', si:'Remove', no:'Cancel'}))) return;
  const { error } = await sb.from('mock_individual').delete().eq('student_id',sid);
  if(error){ NISUI.avisa('Could not remove: '+error.message, {titulo:'Error'}); return; }
  mockModePanel({admin:_mm.admin});
};
