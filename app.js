/* ===================== Portal NIS ===================== */
const CFG = window.NIS_CONFIG;
if(!window.supabase || !window.supabase.createClient){
  document.getElementById('app').innerHTML = '<div class="auth-wrap"><div class="auth-card center"><h1>Portal NIS</h1><p class="muted">No se pudo cargar una librería necesaria (conexión). Recarga la página.</p><button class="btn" onclick="location.reload()">Reintentar</button></div></div>';
}
const sb = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY) : null;
const $ = (s, r=document) => r.querySelector(s);
const app = $('#app');
const esc = s => (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const GRADES = Array.from({length:11},(_,i)=>({id:i+1,name:'G'+(i+1)}));
const LEVELS = ['A2','B1','B2','C1'];
const SKILLS = ['Reading','Listening','Writing'];
const QUIZ_URL = 'https://bacman2000.github.io/mocks-cambridge/';
/* === Enlaces configurables del dashboard de alumnos === */
const LIBRARY_URL = 'http://127.0.0.1:8900/';   // Biblioteca NIS (OPAC local). Cambiar por la URL pública cuando esté en línea.
const CLASSES_LINKS = {
  presentations: '',   // pegar URL de las presentaciones de clase (vacío = "Próximamente")
  activities:    'activities.html'    // hub de juegos y actividades de clase
};

let state = { session:null, profile:null };
let resultsBranch = 'mock'; // 'mock' | 'practice'
let userFilter = { grade:'', year:'' };

/* ---------- analysis helpers ---------- */
function yearOptions(sel){ const cur=new Date().getFullYear(); let o=''; for(let y=2026;y<=Math.max(cur+1,2027);y++){ o+=`<option ${String(sel)===String(y)?'selected':''}>${y}</option>`; } return o; }
function isMockAttempt(a){ return a.mock==='mock1' || a.mock==='mock2'; }
function mockLabel(a){ return a.mock==='mock2'?'MOCK 2':a.mock==='mock1'?'MOCK 1':(a.mock||'Practice'); }
function partsOf(breakdown){
  if(!breakdown) return [];
  const arr = Array.isArray(breakdown) ? breakdown : (breakdown.parts || []);
  if(!arr.length) return [];

  // ── Listening format: flat array of questions with {audio, ok, q, type} ──
  // Detect by checking first item has 'audio' string + boolean 'ok', no 'pct'.
  if(arr[0].audio !== undefined && arr[0].ok !== undefined && arr[0].pct === undefined){
    const groups = {}, order = [];
    arr.forEach(q=>{
      const key = q.audio || 'Part';
      if(!groups[key]){ groups[key]={name:key, correct:0, total:0}; order.push(key); }
      groups[key].total++;
      if(q.ok) groups[key].correct++;
    });
    return order.map(k=>{
      const g=groups[k];
      const pct=Math.round(g.correct/g.total*100);
      return {name:g.name, correct:g.correct, total:g.total, pct};
    });
  }

  // ── Standard format: each item already has {part/name, correct, total, pct} ──
  return arr.map(p=>{
    const correct = p.correct!=null?p.correct:(p.right!=null?p.right:null);
    const total   = p.total!=null?p.total:(p.outOf!=null?p.outOf:null);
    let   pct     = p.pct!=null?p.pct:(p.percent!=null?p.percent:null);
    if(pct==null && correct!=null && total) pct = Math.round(correct/total*100);
    return {name: p.part||p.name||p.label||'Part', correct, total, pct};
  }).filter(p=>p.pct!=null);
}
function cefrRec(level, pct){
  const L = level||'B2';
  if(pct==null) return {tier:'info', label:'Sin calificar', text:`Esta destreza no se califica automáticamente (la revisa el profesor). No afecta la proyección hacia ${L}.`};
  if(pct>=80) return {tier:'good', label:`Aprobado alto — ${L}`, text:`Desempeño fuerte en ${L} (${pct}%). Listo para empezar a practicar el nivel siguiente.`};
  if(pct>=60) return {tier:'good', label:`Aprobado — ${L}`, text:`Aprobado en ${L} (${pct}%); el estándar Cambridge ronda el 60%. Consolidar para asegurar el examen oficial.`};
  if(pct>=40) return {tier:'warn', label:`Acercándose a ${L}`, text:`Se está acercando a ${L} (${pct}%). Reforzar las partes más bajas antes de presentarse.`};
  return {tier:'bad', label:`Por debajo de ${L}`, text:`Por debajo de ${L} (${pct}%). Conviene más práctica en este nivel antes del examen oficial.`};
}
function barRow(label, pct){
  const cls = pct>=70?'var(--good)':pct>=50?'var(--warn)':'var(--bad)';
  return `<div style="margin:8px 0"><div class="row" style="justify-content:space-between"><b>${esc(label)}</b><span class="muted">${pct}%</span></div>
    <div class="bar"><span style="width:${Math.max(2,pct)}%;background:${cls}"></span></div></div>`;
}
/* ---- Parts strengths/weaknesses helpers ---- */
function attemptParts(a){ return partsOf(a.breakdown).filter(p=>p.pct!=null); }
function weakStrong(a){
  const ps=attemptParts(a); if(!ps.length) return null;
  const sorted=[...ps].sort((x,y)=>x.pct-y.pct);
  return { weak:sorted[0], strong:sorted[sorted.length-1] };
}
/* Aggregate average % per exam part (skill · part) across a list of attempts. */
function aggregateParts(list){
  const map={};
  list.forEach(a=>{
    attemptParts(a).forEach(p=>{
      const key=`${a.skill} · ${p.name}`;
      (map[key]=map[key]||{name:key,sum:0,n:0});
      map[key].sum+=p.pct; map[key].n++;
    });
  });
  return Object.values(map).map(x=>({name:x.name,avg:Math.round(x.sum/x.n),n:x.n})).sort((a,b)=>a.avg-b.avg);
}
/* Card: group strengths & weaknesses by part (weakest first). */
function partsBreakdownCard(list){
  const parts=aggregateParts(list);
  if(!parts.length) return '';
  const weak=parts.filter(p=>p.avg<50), strong=parts.filter(p=>p.avg>=70);
  const chip=(p,color)=>`<span class="badge" style="background:${color};color:#fff;font-size:.8rem">${esc(p.name)} · ${p.avg}%</span>`;
  return `<div class="card">
    <h2 style="margin-bottom:2px">Partes del examen — fortalezas y debilidades del grupo</h2>
    <p class="muted" style="margin-top:0;font-size:.85rem">Promedio por parte sobre los resultados filtrados (${list.length} examen(es)). Lo más débil va primero.</p>
    <div class="grid cols-2" style="margin:10px 0">
      <div><h3 style="color:var(--bad);margin:0 0 6px">⚠️ A reforzar (&lt;50%)</h3>${weak.length?`<div style="display:flex;flex-wrap:wrap;gap:6px">${weak.map(p=>chip(p,'#dc2626')).join('')}</div>`:'<p class="muted">Ninguna parte por debajo del 50%. 👏</p>'}</div>
      <div><h3 style="color:var(--good);margin:0 0 6px">💪 Fortalezas (≥70%)</h3>${strong.length?`<div style="display:flex;flex-wrap:wrap;gap:6px">${strong.map(p=>chip(p,'#16a34a')).join('')}</div>`:'<p class="muted">Aún ninguna parte ≥70%.</p>'}</div>
    </div>
    <div style="margin-top:6px">${parts.map(p=>barRow(`${p.name} (${p.n})`, p.avg)).join('')}</div>
  </div>`;
}

/* ---------- boot ---------- */
// Watchdog: never get stuck on the initial "Cargando…" splash.
setTimeout(()=>{ try{ if(/Cargando Portal NIS/.test((document.getElementById('app')||{}).innerHTML||'')) renderAuth(); }catch(_){ } }, 7000);
init();
async function init(){
  if(!sb) return;
  // Came from "Cerrar sesión": force sign-out and show the login screen.
  try{
    const params = new URLSearchParams(location.search);
    if(params.get('logout')==='1'){
      try{ await sb.auth.signOut(); }catch(_){}
      try{ history.replaceState(null,'',location.pathname); }catch(_){}
      state.session=null; state.profile=null;
      renderAuth();
      return;
    }
  }catch(_){ }
  try{
    const { data } = await sb.auth.getSession();
    state.session = data.session;
    if(state.session){ await loadProfile(); }
    route();
  }catch(e){ console.error('init failed', e); try{ renderAuth(); }catch(_){ } }
  try{
    sb.auth.onAuthStateChange(async (_e, session)=>{
      state.session = session;
      if(session){ try{ await loadProfile(); }catch(_){ state.profile=null; } } else { state.profile=null; }
      route();
    });
  }catch(_){ }
}
async function loadProfile(){
  const { data, error } = await sb.from('profiles').select('*, grades(name)').eq('id', state.session.user.id).single();
  state.profile = error ? null : data;
}
function route(){
  if(!state.session){ return renderAuth(); }
  if(!state.profile){ return renderPending(); }
  if(state.profile.active===false){ return renderSuspended(); }
  const r = state.profile.role;
  if(r==='admin') return renderAdmin();
  if(r==='teacher') return renderTeacher();
  // Students go straight to the quizzes menu (same origin → shared session),
  // UNLESS they explicitly asked to see their progress panel (?me=1).
  if(r==='student'){
    const wantsProgress = new URLSearchParams(location.search).get('me')==='1';
    return renderStudent(wantsProgress ? 'results' : 'home');
  }
  return renderStudent();
}
async function logout(){ await sb.auth.signOut(); }

/* ---------- shared chrome ---------- */
function header(){
  const p = state.profile||{};
  const name = p.full_name || (p.first_name?`${p.first_name} ${p.last_name||''}`:state.session?.user?.email) || '';
  return `<div class="app-header">
    <img src="assets/logo-white-h.svg" alt="Nordic International School">
    <div class="spacer"></div>
    <span class="role-chip">${esc(p.role||'')}</span>
    <span class="who">${esc(name)}</span>
    <button class="logout" onclick="logout()">Salir</button>
  </div>`;
}
function shell(navItems, activeKey, body){
  return header()+`<div class="shell">
    <nav class="sidebar">${navItems.map(n=> n.href ? `<a class="nav-item" href="${n.href}" target="_blank" rel="noopener">${n.label}</a>` : `<div class="nav-item ${n.key===activeKey?'active':''}" data-nav="${n.key}" tabindex="0" role="button">${n.label}</div>`).join('')}</nav>
    <main class="main" id="main">${body}</main>
  </div>`;
}
function bindNav(handler){ document.querySelectorAll('[data-nav]').forEach(e=>{
  e.onclick=()=>handler(e.dataset.nav);
  e.onkeydown=(ev)=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); handler(e.dataset.nav); } };
}); }
function munBody(){ return `<iframe src="mun-academy.html" title="MUN Academy" style="width:100%;height:82vh;min-height:560px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`; }
function studentMun(){ document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='mun')); $('#main').innerHTML = munBody(); }

/* Phonics Studio embedded as an iframe (same-origin app in /phonics).
   ?embed=1 tells it to hide its own top bar so it nests under the portal. */
function phonicsPanel(){
  return `<iframe src="phonics/index.html?embed=1&v=8" title="Phonics Studio"
    style="width:100%;height:calc(100vh - 120px);border:none;border-radius:14px;box-shadow:var(--shadow);background:#fff"></iframe>`;
}
/* Pronunciation Coach embedded as an iframe (same-origin app in /pronunciation-coach). */
function coachPanel(){
  return `<iframe src="pronunciation-coach/index.html?embed=1&v=2" title="Pronunciation Coach"
    style="width:100%;height:calc(100vh - 120px);border:none;border-radius:14px;box-shadow:var(--shadow);background:#fff"></iframe>`;
}

/* ===================== AUTH ===================== */
function renderAuth(mode='login'){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="assets/logo-h.svg" alt="Nordic">
    <h1>Portal NIS</h1>
    <p class="sub">${mode==='login'?'Ingresa con tu cuenta':'Crea tu cuenta de estudiante'}</p>
    <div id="msg"></div>
    <div id="form"></div>
    <div class="auth-switch">${mode==='login'
        ? `¿No tienes cuenta? <a id="toSignup">Regístrate</a>`
        : `¿Ya tienes cuenta? <a id="toLogin">Inicia sesión</a>`}</div>
  </div></div>`;
  $('#form').innerHTML = mode==='login' ? loginForm() : signupForm();
  if(mode==='login'){
    $('#toSignup').onclick=()=>renderAuth('signup');
    $('#loginBtn').onclick=doLogin;
    // Enter key submits the login form
    ['li_email','li_pw'].forEach(id=>{ const el=$('#'+id); if(el) el.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); doLogin(); } }); });
    // Si ya recordamos el correo, salta directo a la contraseña.
    const fe = ($('#li_email') && $('#li_email').value) ? $('#li_pw') : $('#li_email'); if(fe) fe.focus();
  } else {
    $('#toLogin').onclick=()=>renderAuth('login');
    $('#signupBtn').onclick=doSignup;
    // Enter key submits the signup form (from any field)
    document.querySelectorAll('#form input').forEach(el=>{ el.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); doSignup(); } }); });
  }
}
function loginForm(){
  let savedEmail=''; try{ savedEmail=localStorage.getItem('nis_remember_email')||''; }catch(_){}
  return `<label>Correo</label><input id="li_email" type="email" placeholder="tucorreo@nordic-school.edu.pe" value="${esc(savedEmail)}">
    <label>Contraseña</label>
    <div style="position:relative">
      <input id="li_pw" type="password" placeholder="••••••••" style="width:100%;padding-right:42px">
      <button type="button" id="li_eye" onclick="window._toggleLoginPw()" title="Mostrar / ocultar contraseña"
        style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:1.15rem;line-height:1;padding:0;color:var(--muted)">👁</button>
    </div>
    <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-weight:400;cursor:pointer">
      <input type="checkbox" id="li_remember" ${savedEmail?'checked':''} style="width:auto;margin:0"> Recordar mi correo
    </label>
    <div style="margin-top:16px"><button class="btn" id="loginBtn" style="width:100%">Ingresar</button></div>`;
}
window._toggleLoginPw=()=>{
  const inp=$('#li_pw'), btn=$('#li_eye'); if(!inp) return;
  const hidden = inp.type==='password';
  inp.type = hidden ? 'text' : 'password';
  if(btn) btn.textContent = hidden ? '🙈' : '👁';   // 🙈 = visible (clic para ocultar)
  inp.focus();
};
function signupForm(){
  return `
    <div class="field-2">
      <div><label>Nombres</label><input id="su_first"></div>
      <div><label>Apellidos</label><input id="su_last"></div>
    </div>
    <div class="field-2">
      <div><label>Documento (DNI)</label><input id="su_doc"></div>
      <div><label>Fecha de nacimiento</label><input id="su_bd" type="date"></div>
    </div>
    <label>Correo</label><input id="su_email" type="email">
    <div class="field-2">
      <div><label>Grado</label><select id="su_grade">${GRADES.map(g=>`<option value="${g.id}">${g.name}</option>`).join('')}</select></div>
      <div><label>Sección</label><input id="su_section" placeholder="A / B / C"></div>
    </div>
    <div class="field-2">
      <div><label>Nivel Cambridge</label><select id="su_level"><option value="">— sin asignar —</option>${LEVELS.map(l=>`<option>${l}</option>`).join('')}</select></div>
      <div><label>Teléfono</label><input id="su_phone"></div>
    </div>
    <div class="field-2">
      <div><label>Apoderado</label><input id="su_guard"></div>
      <div><label>Tel. apoderado</label><input id="su_gphone"></div>
    </div>
    <div class="field-2">
      <div><label>Contraseña</label><input id="su_pw" type="password"></div>
      <div><label>Repetir contraseña</label><input id="su_pw2" type="password"></div>
    </div>
    <div style="margin-top:16px"><button class="btn" id="signupBtn" style="width:100%">Crear cuenta</button></div>`;
}
function msg(kind, text){ $('#msg').innerHTML = `<div class="note ${kind}">${esc(text)}</div>`; }
async function doLogin(){
  const email=$('#li_email').value.trim(), pw=$('#li_pw').value;
  if(!email||!pw) return msg('err','Ingresa correo y contraseña.');
  // Recordar (o olvidar) el correo según la casilla.
  try{
    if($('#li_remember') && $('#li_remember').checked) localStorage.setItem('nis_remember_email', email);
    else localStorage.removeItem('nis_remember_email');
  }catch(_){}
  const { error } = await sb.auth.signInWithPassword({ email, password:pw });
  if(error) return msg('err', error.message.includes('Email not confirmed')?'Tu correo aún no está confirmado. (El admin puede desactivar la confirmación de correo en Supabase.)':error.message);
}
async function doSignup(){
  const v=id=>$('#'+id).value.trim();
  const email=v('su_email'), pw=$('#su_pw').value, pw2=$('#su_pw2').value;
  if(!v('su_first')||!v('su_last')||!email||!pw) return msg('err','Completa nombres, apellidos, correo y contraseña.');
  if(pw!==pw2) return msg('err','Las contraseñas no coinciden.');
  if(pw.length<6) return msg('err','La contraseña debe tener al menos 6 caracteres.');
  const meta={ first_name:v('su_first'), last_name:v('su_last'), full_name:v('su_first')+' '+v('su_last'),
    document_id:v('su_doc'), birthdate:v('su_bd'), phone:v('su_phone'),
    guardian_name:v('su_guard'), guardian_phone:v('su_gphone'),
    grade_id:$('#su_grade').value, section:v('su_section'), cefr_level:$('#su_level').value,
    visible_password:pw };
  const { data, error } = await sb.auth.signUp({ email, password:pw, options:{ data:meta } });
  if(error) return msg('err', error.message);
  if(data.session){ msg('ok','¡Cuenta creada! Entrando…'); }
  else { msg('ok','¡Cuenta creada! Revisa tu correo para confirmar, o pide al admin que active el acceso. Luego inicia sesión.'); }
}
function renderPending(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <img class="logo" src="assets/logo-h.svg">
    <h1>Casi listo</h1>
    <p class="sub">Tu cuenta existe pero aún no tiene perfil/rol. Pide al administrador que te active.</p>
    <button class="btn ghost" onclick="logout()">Salir</button>
  </div></div>`;
}
function renderSuspended(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <img class="logo" src="assets/logo-h.svg">
    <h1>Cuenta suspendida</h1>
    <p class="sub">Tu acceso al Portal NIS está temporalmente suspendido. Comunícate con el administrador del colegio para reactivarlo.</p>
    <button class="btn ghost" onclick="logout()">Salir</button>
  </div></div>`;
}

/* ===================== ADMIN ===================== */
async function renderAdmin(tab='users'){
  document.body.innerHTML = shell([
    {key:'overview',label:'📊 Resumen'},
    {key:'stats',label:'📈 Estadísticas'},
    {key:'users',label:'👥 Alumnos'},
    {key:'results',label:'📝 Resultados'},
    {key:'final',label:'🎓 Resultado final'},
    {key:'teachers',label:'👨‍🏫 Profesores'},
    {key:'mocks',label:'🔓 Mocks'},
    {key:'phonics',label:'🔤 Phonics'},
    {key:'coach',label:'🎙️ Pronunciación'},
    {key:'mun',label:'🌐 MUN Academy'},
    {key:'classes',label:'🏫 Classes'},
    {key:'library',label:'📚 Library'},
  ], tab, `<div class="center muted">Cargando…</div>`);
  bindNav(renderAdmin);
  if(tab==='mun') return $('#main').innerHTML = munBody();
  if(tab==='classes') return studentClasses();
  if(tab==='library') return studentLibrary();
  if(tab==='phonics') return $('#main').innerHTML = phonicsPanel();
  if(tab==='coach') return $('#main').innerHTML = coachPanel();
  if(tab==='overview') return adminOverview();
  if(tab==='stats') return adminStats();
  if(tab==='results') return adminResults();
  if(tab==='final') return cefrFinalPanel();
  if(tab==='teachers') return adminTeachers();
  if(tab==='mocks') return adminMocks();
  return adminUsers();
}
async function adminOverview(){
  const { data:profs } = await sb.from('profiles').select('role,grade_id,cefr_level');
  const { count:att } = await sb.from('exam_attempts').select('*',{count:'exact',head:true});
  const { data:mocks } = await sb.from('mock_access').select('grade_id,unlocked');
  const { count:teacherAcc } = await sb.from('teacher_access').select('*',{count:'exact',head:true});
  const mockMap={}; (mocks||[]).forEach(m=>mockMap[m.grade_id]=m.unlocked);
  const students=(profs||[]).filter(p=>p.role==='student');
  const byLevel=LEVELS.map(l=>({l,n:students.filter(s=>s.cefr_level===l).length}));
  $('#main').innerHTML=`<h1>Resumen</h1>
    <div class="grid cols-3">
      <div class="stat"><div class="n">${students.length}</div><div class="l">Alumnos</div></div>
      <div class="stat"><div class="n">${(profs||[]).filter(p=>p.role==='teacher').length}</div><div class="l">Profesores</div></div>
      <div class="stat"><div class="n">${att||0}</div><div class="l">Exámenes rendidos</div></div>
    </div>
    <div class="card"><h2>Alumnos por nivel</h2>
      ${byLevel.map(x=>`<div style="margin:8px 0"><div class="row" style="justify-content:space-between"><b>${x.l}</b><span class="muted">${x.n}</span></div>
        <div class="bar"><span style="width:${students.length?Math.round(x.n/students.length*100):0}%"></span></div></div>`).join('')}
    </div>
    <div class="card"><h2>¿Qué está activado?</h2>
      <p class="muted" style="margin-top:-4px">Estado de los <b>Mocks</b> por grado (clic en la pestaña 🔓 Mocks para cambiarlos). ${teacherAcc||0} profesor(es) con accesos configurados (pestaña 👨‍🏫 Profesores).</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
        ${GRADES.map(g=>`<span class="badge ${mockMap[g.id]?'on':'off'}" style="font-size:.82rem">${g.name}: ${mockMap[g.id]?'🔓':'🔒'}</span>`).join('')}
      </div>
      <div class="row" style="gap:8px;margin-top:14px"><button class="btn sm" onclick="adminNewUser()">+ Crear alumno</button><button class="btn sm ghost" onclick="adminNewTeacher()">+ Crear profesor</button><button class="btn sm ghost" onclick="renderAdmin('stats')">📈 Ver estadísticas</button></div>
    </div>
    <div class="card"><h2>Roles y permisos</h2>
      <p class="muted" style="margin-top:-4px">Cada persona entra con su correo y su rol decide qué ve y qué puede hacer.</p>
      <div style="overflow-x:auto"><table>
        <thead><tr><th>Acción / Vista</th><th style="text-align:center">🛡️ Admin</th><th style="text-align:center">👨‍🏫 Profesor</th><th style="text-align:center">🎓 Alumno</th></tr></thead>
        <tbody>
          ${[
            ['Ver su propio avance y proyección','—','—','✓'],
            ['Rendir exámenes (Mocks / Practice)','—','—','✓'],
            ['Ver resultados de alumnos','✓ (todos)','Si se le habilita · sólo sus grados','—'],
            ['Ver lista de alumnos','✓ (todos)','Si se le habilita · sólo sus grados','—'],
            ['Calificar Writing','✓','✓ (sus grados)','—'],
            ['📈 Estadísticas y reportes','✓ (sólo admin)','—','—'],
            ['📝 Registro: crear / editar / eliminar usuarios','✓ (sólo admin)','—','—'],
            ['Definir accesos y grados de profesores','✓ (sólo admin)','—','—'],
            ['🔓 Desbloquear Mocks por grado','✓ (sólo admin)','—','—'],
            ['Phonics y MUN Academy','✓','✓','✓']
          ].map(r=>`<tr><td>${r[0]}</td>
            <td style="text-align:center">${r[1]}</td>
            <td style="text-align:center;font-size:.85rem">${r[2]}</td>
            <td style="text-align:center">${r[3]}</td></tr>`).join('')}
        </tbody></table></div>
      <p class="muted" style="font-size:.82rem;margin-top:8px">Para definir qué ve cada profesor y de qué grados, entra a <b>👨‍🏫 Profesores</b>. <b>Estadísticas</b> y <b>Registro</b> de usuarios son exclusivos del administrador.</p>
    </div>`;
}
async function adminTeachers(){
  const { data:profs, error } = await sb.from('profiles').select('id, full_name, email, active, grades(name)').eq('role','teacher').order('full_name');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const { data:accs } = await sb.from('teacher_access').select('*');
  const amap={}; (accs||[]).forEach(a=>amap[a.profile_id]=a);
  const teachers=profs||[];
  // Fetch stored passwords for all teachers
  const { data:creds } = teachers.length
    ? await sb.from('student_credentials').select('profile_id,password').in('profile_id', teachers.map(t=>t.id))
    : { data:[] };
  const credmap={}; (creds||[]).forEach(c=>credmap[c.profile_id]=c.password||'');
  const chipCss="display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:8px;padding:4px 9px;font-size:.85rem";
  const cards=teachers.map(t=>{
    const a=amap[t.id]||{can_results:true,can_students:false,all_grades:true,grades:[]};
    const gradeChips=GRADES.map(g=>`<label style="${chipCss}"><input type="checkbox" class="tg-grade" value="${g.id}" ${(a.grades||[]).includes(g.id)?'checked':''} ${a.all_grades?'disabled':''}> ${g.name}</label>`).join('');
    const pw=credmap[t.id]||'';
    const suspended = t.active===false;
    return `<div class="card" data-tid="${t.id}" style="${suspended?'opacity:.6':''}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <h2 style="margin:0;font-size:1.1rem">${esc(t.full_name||t.email)} ${suspended?'<span class="badge off" style="font-size:.7rem;vertical-align:middle">Suspendido</span>':''}</h2>
        <div style="text-align:right">
          <span class="muted" style="font-size:.82rem;display:block">${esc(t.email||'')}</span>
          <span style="display:inline-flex;align-items:center;gap:5px;margin-top:3px">
            <span class="muted" style="font-size:.8rem">Contraseña:</span>
            <span id="pw-dot-${t.id}" style="font-size:.82rem;letter-spacing:2px;color:var(--muted)">●●●●●●</span>
            <span id="pw-val-${t.id}" style="display:none;font-family:monospace;font-size:.82rem">${esc(pw||'(sin contraseña)')}</span>
            <button onclick="window._togglePw('${t.id}')" id="pw-btn-${t.id}" title="Mostrar/ocultar contraseña"
              style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;line-height:1;color:var(--muted)">👁</button>
          </span>
        </div>
      </div>
      <div class="row" style="gap:18px;flex-wrap:wrap;margin-top:10px">
        <label style="${chipCss}"><input type="checkbox" class="tg-results" ${a.can_results?'checked':''}> 📝 Ver resultados</label>
        <label style="${chipCss}"><input type="checkbox" class="tg-students" ${a.can_students?'checked':''}> 👥 Ver alumnos</label>
        <label style="${chipCss}"><input type="checkbox" class="tg-all" ${a.all_grades?'checked':''} onchange="window._tgAll(this)"> 🏫 Todos los grados</label>
      </div>
      <div class="muted" style="margin:10px 0 4px;font-size:.85rem">Grados específicos (sólo si desmarcas "Todos los grados"):</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">${gradeChips}</div>
      <div class="row" style="margin-top:12px;align-items:center;gap:10px"><button class="btn sm" onclick="window._saveTeacher('${t.id}', this)">Guardar accesos</button>${suspended?`<button class="btn sm" style="background:var(--good)" onclick="suspendUser('${t.id}',true,'teacher')">Reactivar</button>`:`<button class="btn sm ghost" style="border-color:var(--warn);color:#92600a" onclick="suspendUser('${t.id}',false,'teacher')">Suspender</button>`}<button class="btn sm danger" onclick="deleteUser('${t.id}','teacher')">Eliminar profesor</button><span class="tmsg muted" style="font-size:.85rem"></span></div>
    </div>`;
  }).join('');
  const emptyMsg = teachers.length ? '' : `<div class="card"><p class="muted">Aún no hay profesores. Usa el botón de arriba para agregar uno.</p></div>`;
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:6px">
      <h1 style="margin:0">Profesores — accesos</h1>
      <button class="btn sm" onclick="adminNewTeacher()">+ Agregar Profesor</button>
    </div>
    <div class="note">Asigna qué puede ver cada profesor. Por defecto: <b>Resultados</b> de <b>todos los grados</b>. Desmarca "Todos los grados" para limitarlo a grados específicos.</div>
    ${cards}${emptyMsg}`;
}
window._togglePw=(id)=>{
  const dot=$('#pw-dot-'+id), val=$('#pw-val-'+id), btn=$('#pw-btn-'+id);
  const showing=dot.style.display==='none';
  dot.style.display=showing?'':'none';
  val.style.display=showing?'none':'';
  if(btn) btn.textContent=showing?'👁':'🙈';
};
window.adminNewTeacher=()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminTeachers()">← Volver a Profesores</button>
    <div class="card" style="max-width:560px;margin-top:12px"><h2 style="margin-top:0">Agregar Profesor</h2>
    <div class="field-2"><div><label>Nombres</label><input id="nt_first" placeholder="Ej: María"></div><div><label>Apellidos</label><input id="nt_last" placeholder="Ej: García"></div></div>
    <label>Correo electrónico</label><input id="nt_email" type="email" placeholder="nombre.apellido@nordic-school.edu.pe">
    <label style="margin-top:10px;display:block">Contraseña</label>
    <div style="position:relative;display:flex;align-items:center">
      <input id="nt_pw" type="password" placeholder="Mínimo 6 caracteres" style="flex:1;padding-right:40px">
      <button onclick="window._toggleNewPw('nt_pw','nt_pw_btn')" id="nt_pw_btn" title="Mostrar/ocultar contraseña"
        style="position:absolute;right:10px;background:none;border:none;cursor:pointer;font-size:1rem;color:var(--muted);line-height:1;padding:0">👁</button>
    </div>
    <div id="nt_msg" style="margin-top:10px"></div>
    <div class="row" style="margin-top:16px"><button class="btn" onclick="window.createTeacher()">Crear Profesor</button></div>
    </div>`;
};
window._toggleNewPw=(inputId,btnId)=>{
  const inp=$('#'+inputId), btn=$('#'+btnId);
  if(!inp) return;
  const hidden=inp.type==='password';
  inp.type=hidden?'text':'password';
  if(btn) btn.textContent=hidden?'🙈':'👁';
};
window.createTeacher=async()=>{
  const v=id=>($('#'+id)||{value:''}).value.trim();
  const first=v('nt_first'), last=v('nt_last'), email=v('nt_email'), pw=v('nt_pw');
  const msg=$('#nt_msg');
  if(!first||!last||!email||!pw) return msg.innerHTML='<div class="note err">Completa todos los campos: nombres, apellidos, correo y contraseña.</div>';
  if(pw.length<6) return msg.innerHTML='<div class="note err">La contraseña debe tener al menos 6 caracteres.</div>';
  msg.innerHTML='<div class="note">Creando cuenta…</div>';
  const meta={ first_name:first, last_name:last, full_name:first+' '+last, role:'teacher', academic_year:new Date().getFullYear() };
  let rpcErr=null;
  try{
    const rpcPromise=sb.rpc('admin_create_user',{p_email:email,p_password:pw,p_meta:meta});
    const timeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error('Tiempo de espera agotado.')),12000));
    const {error}=await Promise.race([rpcPromise,timeout]);
    rpcErr=error||null;
  }catch(e){ rpcErr=e; }
  if(rpcErr){ msg.innerHTML=`<div class="note err">${esc(rpcErr.message||String(rpcErr))}</div>`; return; }
  msg.innerHTML='<div class="note ok">✓ Profesor creado correctamente. Redirigiendo…</div>';
  setTimeout(adminTeachers, 900);
};
window._tgAll=(cb)=>{ cb.closest('.card').querySelectorAll('.tg-grade').forEach(c=>{ c.disabled=cb.checked; }); };
window._saveTeacher=async(id,btn)=>{
  const card=btn.closest('.card'); const msgEl=card.querySelector('.tmsg');
  const row={ profile_id:id,
    can_results:card.querySelector('.tg-results').checked,
    can_students:card.querySelector('.tg-students').checked,
    all_grades:card.querySelector('.tg-all').checked,
    grades:[...card.querySelectorAll('.tg-grade:checked')].map(c=>+c.value),
    updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null };
  msgEl.textContent='Guardando…';
  const { error } = await sb.from('teacher_access').upsert(row,{onConflict:'profile_id'});
  msgEl.textContent = error ? ('⚠ '+error.message) : '✓ Guardado';
};
async function adminMocks(){
  const { data, error } = await sb.from('mock_access').select('grade_id, unlocked, updated_at').order('grade_id');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const map={}; (data||[]).forEach(r=>map[r.grade_id]=r);
  const rows = GRADES.map(g=>{
    const r=map[g.id]; const on=!!(r&&r.unlocked);
    const when = (r&&r.updated_at)?new Date(r.updated_at).toLocaleString():'';
    return `<tr>
      <td><b>${g.name}</b></td>
      <td><span class="badge ${on?'on':'off'}">${on?'🔓 Desbloqueado':'🔒 Bloqueado'}</span></td>
      <td class="muted" style="font-size:.82rem">${when}</td>
      <td><button class="btn sm ${on?'ghost':''}" onclick="window._toggleMock(${g.id}, ${on?'false':'true'}, this)">${on?'Bloquear':'Desbloquear'}</button></td>
    </tr>`;
  }).join('');
  $('#main').innerHTML = `<h1>Mocks — control de acceso</h1>
    <div class="note">Por defecto los <b>MOCKS están bloqueados</b> para los alumnos. Habilítalos por grado cuando estén listos para rendirlos. Los <b>Practice Tests</b> siempre están disponibles. Profesores y administradores siempre ven los mocks.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Grado</th><th>Estado de Mocks</th><th>Última actualización</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
}
window._toggleMock = async (gradeId, to, btn)=>{
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const { error } = await sb.from('mock_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'grade_id' });
  if(error){ alert('No se pudo actualizar: '+error.message); }
  adminMocks();
};
async function adminUsers(){
  const { data:profs, error } = await sb.from('profiles').select('*, grades(name)').order('created_at',{ascending:false});
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const all = profs||[];
  const years = [...new Set(all.map(p=>p.academic_year||2026))];
  if(!years.includes(2026)) years.push(2026);
  if(!years.includes(new Date().getFullYear())) years.push(new Date().getFullYear());
  years.sort((a,b)=>a-b);
  const fg=userFilter.grade, fy=userFilter.year, showInactive=!!userFilter.showInactive;
  const suspendedCount = all.filter(p=>p.active===false).length;
  const list = all.filter(p=> (!fg||String(p.grade_id)===String(fg)) && (!fy||String(p.academic_year||2026)===String(fy)) && (showInactive || p.active!==false) );
  const gradeOpts = `<option value="">Todos los grados</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(fg)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const yearOpts = `<option value="">Todos los años</option>`+years.map(y=>`<option value="${y}" ${String(fy)===String(y)?'selected':''}>${y}</option>`).join('');
  const rows=list.map(p=>{
    const suspended = p.active===false;
    const toggleBtn = suspended
      ? `<button class="btn sm" style="background:var(--good)" onclick="suspendUser('${p.id}',true)">Reactivar</button>`
      : `<button class="btn sm ghost" style="border-color:var(--warn);color:#92600a" onclick="suspendUser('${p.id}',false)">Suspender</button>`;
    return `<tr data-id="${p.id}" style="${suspended?'opacity:.55':''}">
      <td><b>${esc(p.full_name||((p.first_name||'')+' '+(p.last_name||'')))}</b><div class="muted" style="font-size:.8rem">${esc(p.email||'')}</div></td>
      <td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td>
      <td>${p.academic_year||2026}</td>
      <td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td>
      <td><span class="badge ${p.role==='student'?'':'on'}">${esc(p.role)}</span></td>
      <td class="pwcell"><span class="pw" data-pw="•••••••">•••••••</span> <button class="eye" title="Ver/ocultar" onclick="togglePw('${p.id}',this)">👁</button></td>
      <td><span class="badge ${suspended?'off':'on'}">${suspended?'Suspendido':'Activo'}</span></td>
      <td style="white-space:nowrap"><button class="btn sm ghost" onclick="editUser('${p.id}')">Editar</button> ${toggleBtn} <button class="btn sm danger" onclick="deleteUser('${p.id}','user')">Eliminar</button></td>
    </tr>`;}).join('');
  $('#main').innerHTML=`<div class="row" style="justify-content:space-between;align-items:center"><h1>Alumnos</h1>
      <button class="btn sm" onclick="adminNewUser()">+ Nuevo</button></div>
    <div class="card" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
      <div><label>Grado</label><select onchange="window._setUserFilter('grade',this.value)" style="min-width:170px">${gradeOpts}</select></div>
      <div><label>Año académico</label><select onchange="window._setUserFilter('year',this.value)" style="min-width:150px">${yearOpts}</select></div>
      <label style="display:flex;align-items:center;gap:7px;font-weight:500;margin:0 0 10px"><input type="checkbox" ${showInactive?'checked':''} onchange="window._setUserFilter('showInactive',this.checked)" style="width:auto"> Mostrar suspendidos${suspendedCount?` (${suspendedCount})`:''}</label>
      <div class="muted" style="padding-bottom:11px">${list.length} usuario(s)</div>
    </div>
    <div class="card" style="padding:0;overflow-x:auto">
      <table><thead><tr><th>Nombre</th><th>Grado</th><th>Año</th><th>Nivel</th><th>Rol</th><th>Contraseña</th><th>Estado</th><th></th></tr></thead>
      <tbody>${rows||'<tr><td colspan="8" class="center muted">No hay alumnos con ese filtro.</td></tr>'}</tbody></table>
    </div>`;
}
window._setUserFilter = (k,v)=>{ userFilter[k]=v; adminUsers(); };
window.togglePw = async (id, btn)=>{
  const span = btn.closest('.pwcell').querySelector('.pw');
  if(span.dataset.shown==='1'){ span.textContent='•••••••'; span.dataset.shown='0'; return; }
  const { data } = await sb.from('student_credentials').select('password').eq('profile_id',id).maybeSingle();
  span.textContent = data?.password || '(no guardada)';
  span.dataset.shown='1';
};
window.adminNewUser = ()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Volver</button>
    <div class="card" style="max-width:600px"><h2>Nuevo usuario</h2>
    <div class="field-2"><div><label>Nombres</label><input id="n_first"></div><div><label>Apellidos</label><input id="n_last"></div></div>
    <label>Correo</label><input id="n_email" type="email" placeholder="nombre.apellido@nordic-school.edu.pe">
    <div class="field-2"><div><label>Rol</label><select id="n_role"><option value="student">student</option><option value="teacher">teacher</option><option value="admin">admin</option></select></div>
      <div><label>Contraseña</label><input id="n_pw" placeholder="visible para el admin"></div></div>
    <div class="field-2"><div><label>Grado</label><select id="n_grade"><option value="">—</option>${GRADES.map(g=>`<option value="${g.id}">${g.name}</option>`).join('')}</select></div>
      <div><label>Sección</label><input id="n_section"></div></div>
    <div class="field-2"><div><label>Nivel</label><select id="n_level"><option value="">—</option>${LEVELS.map(l=>`<option>${l}</option>`).join('')}</select></div>
      <div><label>Documento</label><input id="n_doc"></div></div>
    <div class="field-2"><div><label>Año académico</label><select id="n_year">${yearOptions(2026)}</select></div><div></div></div>
    <div id="nmsg"></div>
    <div class="row" style="margin-top:14px"><button class="btn" onclick="createUser()">Crear cuenta</button></div></div>`;
};
window.createUser = async ()=>{
  const v=id=>$('#'+id).value.trim();
  const email=v('n_email'), pw=v('n_pw');
  if(!v('n_first')||!v('n_last')||!email||!pw) return $('#nmsg').innerHTML='<div class="note err">Completa nombres, apellidos, correo y contraseña.</div>';
  if(pw.length<6) return $('#nmsg').innerHTML='<div class="note err">La contraseña debe tener al menos 6 caracteres.</div>';
  const meta={first_name:v('n_first'),last_name:v('n_last'),full_name:v('n_first')+' '+v('n_last'),
    role:$('#n_role').value, document_id:v('n_doc'),
    grade_id:$('#n_grade').value||null, section:v('n_section')||null, cefr_level:$('#n_level').value||null,
    academic_year:$('#n_year').value||'2026'};
  const { error } = await sb.rpc('admin_create_user',{p_email:email,p_password:pw,p_meta:meta});
  $('#nmsg').innerHTML = error?`<div class="note err">${esc(error.message)}</div>`:`<div class="note ok">Cuenta creada.</div>`;
  if(!error) setTimeout(adminUsers,800);
};
window.editUser = async (id)=>{
  const { data:p } = await sb.from('profiles').select('*').eq('id',id).single();
  const m=$('#main');
  m.innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Volver</button>
    <div class="card" style="max-width:560px">
      <h2>Editar: ${esc(p.full_name||p.email)}</h2>
      <div class="field-2">
        <div><label>Grado</label><select id="e_grade">${GRADES.map(g=>`<option value="${g.id}" ${p.grade_id==g.id?'selected':''}>${g.name}</option>`).join('')}</select></div>
        <div><label>Sección</label><input id="e_section" value="${esc(p.section||'')}"></div>
      </div>
      <div class="field-2">
        <div><label>Nivel</label><select id="e_level"><option value="">—</option>${LEVELS.map(l=>`<option ${p.cefr_level===l?'selected':''}>${l}</option>`).join('')}</select></div>
        <div><label>Rol</label><select id="e_role">${['student','teacher','admin'].map(r=>`<option ${p.role===r?'selected':''}>${r}</option>`).join('')}</select></div>
      </div>
      <div class="field-2">
        <div><label>Año académico</label><select id="e_year">${yearOptions(p.academic_year||2026)}</select></div>
        <div><label>Estado</label><select id="e_active"><option value="true" ${p.active?'selected':''}>Activo</option><option value="false" ${!p.active?'selected':''}>Inactivo</option></select></div>
      </div>
      <label>Reestablecer contraseña visible (opcional)</label><input id="e_pw" placeholder="dejar vacío para no cambiar">
      <div id="emsg"></div>
      <div class="row" style="margin-top:14px"><button class="btn" onclick="saveUser('${id}')">Guardar</button></div>
    </div>`;
};
window.saveUser = async (id)=>{
  const upd={ grade_id:+$('#e_grade').value, section:$('#e_section').value.trim()||null,
    cefr_level:$('#e_level').value||null, role:$('#e_role').value, active:$('#e_active').value==='true',
    academic_year:+($('#e_year').value||2026) };
  const { error } = await sb.from('profiles').update(upd).eq('id',id);
  const pw=$('#e_pw').value.trim();
  if(pw){ await sb.from('student_credentials').upsert({profile_id:id,password:pw,updated_at:new Date().toISOString()}); }
  $('#emsg').innerHTML = error?`<div class="note err">${esc(error.message)}</div>`:`<div class="note ok">Guardado.</div>`;
  if(!error) setTimeout(adminUsers,700);
};
/* Permanently delete a user (admin only). Cascades to results, credentials and
   teacher access via the DB. Guarded server-side: can't delete self or the last admin. */
window.deleteUser = async (id, kind)=>{
  const el = document.querySelector(`tr[data-id="${id}"]`) || document.querySelector(`.card[data-tid="${id}"]`);
  const name = el ? ((el.querySelector('b')||el.querySelector('h2'))||{}).textContent || 'este usuario' : 'este usuario';
  if(!confirm(`¿Eliminar definitivamente a "${name}"?\n\nSe borrará su cuenta y TODOS sus resultados. Esta acción no se puede deshacer.`)) return;
  const { error } = await sb.rpc('admin_delete_user', { p_id:id });
  if(error){ alert('No se pudo eliminar: '+error.message); return; }
  (kind==='teacher' ? adminTeachers : adminUsers)();
};
/* Suspend (soft): keep the account + data but block access and hide it from the
   default list. Reversible with Reactivar. */
window.suspendUser = async (id, to, kind)=>{
  if(!to && !confirm('¿Suspender este usuario? No podrá iniciar sesión y se ocultará de la lista (puedes reactivarlo cuando quieras).')) return;
  const { error } = await sb.from('profiles').update({ active:to }).eq('id',id);
  if(error){ alert('No se pudo actualizar: '+error.message); return; }
  (kind==='teacher' ? adminTeachers : adminUsers)();
};
async function adminResults(){
  const { data } = await sb.from('exam_attempts').select('*, profiles(full_name,grade_id,section,grades(name))').order('submitted_at',{ascending:false}).limit(500);
  const all = data||[];
  const isMock = resultsBranch==='mock';
  let list = applyResultsFilter(all.filter(a=> isMock ? isMockAttempt(a) : !isMockAttempt(a)));
  _currentResultsList = list;
  const tabs = `<div class="row" style="gap:8px;margin:0 0 14px">
    <button class="btn sm ${isMock?'':'ghost'}" onclick="window._setResBranch('mock')">📝 Mocks (${all.filter(isMockAttempt).length})</button>
    <button class="btn sm ${isMock?'ghost':''}" onclick="window._setResBranch('practice')">🎯 Practice Tests (${all.filter(a=>!isMockAttempt(a)).length})</button>
  </div>`;
  const rows = list.map(a=>{
    const ws=weakStrong(a);
    const wsCell = ws
      ? `<span class="badge off" title="Parte más débil" style="font-size:.72rem">▼ ${esc(ws.weak.name)} ${ws.weak.pct}%</span> <span class="badge on" title="Parte más fuerte" style="font-size:.72rem">▲ ${esc(ws.strong.name)} ${ws.strong.pct}%</span>`
      : '<span class="muted">—</span>';
    return `<tr>
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:((a.breakdown&&a.breakdown.teacherMessage)?'<span class="badge on" style="font-size:.72rem">✓ comentario enviado</span>':'<span class="muted">— (revisión)</span>')}</td>
    <td style="min-width:200px">${wsCell}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' ghost':''}" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-calificar':((a.breakdown&&a.breakdown.teacherMessage)?'Editar comentario':'Calificar')}</button>${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' <span class="badge on" style="font-size:.7rem">✓ enviado</span>':''}`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">Ver análisis →</button>`}</td>
  </tr>`;}).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Resultados</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Exportar Excel</button>
    </div>
    ${resultsFilterBar(GRADES,'window._setResFilter')}${tabs}
    ${partsBreakdownCard(list)}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Sección</th><th>Examen</th><th>Puntaje</th><th>Débil / Fuerte (partes)</th><th>Fecha</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="8" class="center muted">Sin resultados para este filtro.</td></tr>`}</tbody>
    </table>
    <div class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} resultado(s)</div></div>`;
}
window._setResBranch = (b)=>{ resultsBranch=b; (state.profile && state.profile.role==='teacher') ? teacherResults() : adminResults(); };
window.backToResults = ()=>{ (state.profile && state.profile.role==='teacher') ? teacherResults() : adminResults(); };

window.openAttempt = async (id)=>{
  const { data:a, error } = await sb.from('exam_attempts').select('*, profiles(full_name,grades(name))').eq('id',id).single();
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const parts = partsOf(a.breakdown);
  const rec = cefrRec(a.level, a.percent);
  const strengths = parts.filter(p=>p.pct>=70).sort((x,y)=>y.pct-x.pct);
  const weaknesses = parts.filter(p=>p.pct<50).sort((x,y)=>x.pct-y.pct);
  const partsHtml = parts.length
    ? parts.map(p=>barRow(p.name + (p.total?` (${p.correct}/${p.total})`:''), p.pct)).join('')
    : `<p class="muted">Este intento no guardó detalle por partes${a.percent==null?' (Writing no se califica por partes)':''}.</p>`;
  const swHtml = parts.length ? `<div class="grid cols-2">
      <div><h3 style="color:var(--good)">💪 Fortalezas</h3>${strengths.length?'<ul>'+strengths.map(p=>`<li>${esc(p.name)} — ${p.pct}%</li>`).join('')+'</ul>':'<p class="muted">Ninguna parte ≥70% todavía.</p>'}</div>
      <div><h3 style="color:var(--bad)">⚠️ A reforzar</h3>${weaknesses.length?'<ul>'+weaknesses.map(p=>`<li>${esc(p.name)} — ${p.pct}%</li>`).join('')+'</ul>':'<p class="muted">Sin partes por debajo del 50%. 👏</p>'}</div>
    </div>` : `<p class="muted">Se mostrarán al guardar el detalle por partes.</p>`;
  const focus = weaknesses[0] ? `Enfocar el refuerzo en <b>${esc(weaknesses[0].name)}</b> (${weaknesses[0].pct}%).` : (parts.length?'Buen equilibrio entre las partes.':'');
  // Writing answers (if present)
  let writingHtml='';
  if(a.skill==='Writing' && Array.isArray(a.answers)){
    writingHtml = `<div class="card"><h2>Textos entregados (Writing)</h2>${a.answers.map(t=>`<div style="border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:10px"><b>${esc(t.label||'')}</b> <span class="muted">${t.wordCount||''} palabras</span><div class="answer" style="white-space:pre-wrap;margin-top:6px">${esc(t.text||'(sin respuesta)')}</div></div>`).join('')}</div>`;
  }
  $('#main').innerHTML=`
    <button class="btn sm ghost" onclick="backToResults()">← Volver a resultados</button>
    <div class="card"><h2 style="margin-bottom:2px">${esc(a.profiles?.full_name||'Alumno')}</h2>
      <div class="muted">${esc(a.profiles?.grades?.name||'')} · ${esc(a.skill)} · ${esc(a.level)} · ${mockLabel(a)} · ${new Date(a.submitted_at).toLocaleString()}</div>
      <div class="grid cols-3" style="margin-top:14px">
        <div class="stat"><div class="l">Puntaje</div><div class="n">${a.percent!=null?a.percent+'%':'—'}</div><div class="muted">${a.score!=null?a.score+'/'+a.total:'revisión del profesor'}</div></div>
        <div class="stat"><div class="l">Tiempo</div><div class="n">${a.duration_min!=null?a.duration_min:'—'}<span style="font-size:1rem"> min</span></div></div>
        <div class="stat"><div class="l">Tipo</div><div class="n" style="font-size:1.3rem">${isMockAttempt(a)?'Mock':'Practice'}</div><div class="muted">${mockLabel(a)}</div></div>
      </div>
    </div>
    <div class="card"><h2>Resultados por parte</h2>${partsHtml}</div>
    <div class="card"><h2>Fortalezas y debilidades</h2>${swHtml}</div>
    <div class="card"><h2>Recomendación CEFR</h2>
      <div class="note ${rec.tier==='good'?'ok':rec.tier==='bad'?'err':'info'}"><b>${esc(rec.label)}.</b> ${rec.text}</div>
      ${focus?`<p style="margin-top:8px">${focus}</p>`:''}
    </div>
    ${writingHtml}`;
};

/* ===================== ADMIN · ESTADÍSTICAS (visual) ===================== */
const CHART_PALETTE=['#4987c6','#76cbe5','#2f5f93','#d2909b','#16a34a','#f59e0b','#7c6fd2','#e07a5f','#2a9d8f','#9b5de5','#ef476f'];
const READY_TIERS=[
  {key:'high',label:'Aprobado alto (≥80%)',color:'#16a34a',min:80},
  {key:'pass',label:'Aprobado (60–79%)',color:'#4987c6',min:60},
  {key:'near',label:'Acercándose (40–59%)',color:'#f59e0b',min:40},
  {key:'below',label:'Por debajo (<40%)',color:'#dc2626',min:0}
];
let statsState={view:'grade',type:'bar',grade:'',section:'',skill:'',exam:'all'};
let _statsAll=null,_statsStudents=null,_chart=null,_chartDec=null,_chartLib=null;
function ensureChart(){
  if(window.Chart) return Promise.resolve();
  if(_chartLib) return _chartLib;
  _chartLib=new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('No se pudo cargar Chart.js (conexión).'));
    document.head.appendChild(s);
  });
  return _chartLib;
}
function _avg(a){ return a.length?Math.round(a.reduce((s,x)=>s+x,0)/a.length):null; }
function statsFiltered(){
  let l=(_statsAll||[]).filter(a=>a.percent!=null);
  const s=statsState;
  if(s.grade) l=l.filter(a=>String(a.profiles?.grade_id)===String(s.grade));
  if(s.section) l=l.filter(a=>(a.profiles?.section||'')===s.section);
  if(s.skill) l=l.filter(a=>a.skill===s.skill);
  if(s.exam==='mock1') l=l.filter(a=>a.mock==='mock1');
  else if(s.exam==='mock2') l=l.filter(a=>a.mock==='mock2');
  else if(s.exam==='practice') l=l.filter(a=>!isMockAttempt(a));
  return l;
}
/* readiness bucket for a percent */
function readyTier(pct){ for(const t of READY_TIERS){ if(pct>=t.min) return t; } return READY_TIERS[READY_TIERS.length-1]; }

async function adminStats(){
  $('#main').innerHTML=`<h1>Estadísticas y Reportes</h1><p class="muted">Cargando datos…</p>`;
  try{ await ensureChart(); }catch(e){ $('#main').innerHTML=`<div class="note err">${esc(e.message)}</div>`; return; }
  if(!_statsAll){
    const { data:att } = await sb.from('exam_attempts').select('skill,level,mock,percent,score,total,breakdown,submitted_at,student_id, profiles(full_name,grade_id,section,grades(name))').limit(3000);
    _statsAll=att||[];
    const { data:st } = await sb.from('profiles').select('id,full_name,grade_id,section,cefr_level').eq('role','student');
    _statsStudents=st||[];
  }
  const sections=[...new Set((_statsStudents||[]).map(s=>s.section).filter(Boolean))].sort();
  const f=statsState;
  const gOpts=`<option value="">Todos los grados</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const sOpts=`<option value="">Todas las secciones</option>`+sections.map(s=>`<option value="${s}" ${f.section===s?'selected':''}>${s}</option>`).join('');
  const skOpts=`<option value="">Todas las destrezas</option>`+SKILLS.map(s=>`<option value="${s}" ${f.skill===s?'selected':''}>${s}</option>`).join('');
  const exOpts=[['all','Todos los exámenes'],['mock1','Mock 1'],['mock2','Mock 2'],['practice','Practice Tests']].map(([v,l])=>`<option value="${v}" ${f.exam===v?'selected':''}>${l}</option>`).join('');
  const scored=statsFiltered();
  const studentsAssessed=new Set(scored.map(a=>a.student_id)).size;
  const overall=_avg(scored.map(a=>a.percent));
  // December readiness: per student, projected = latest mock (mock2 else mock1) avg
  const proj=decemberProjection();
  const readyPct=proj.students.length?Math.round(proj.students.filter(s=>s.proj!=null&&s.proj>=60).length/proj.students.filter(s=>s.proj!=null).length*100):0;
  const VIEWS=[['grade','Por grado'],['skill','Por destreza'],['parts','Por parte del examen'],['gradesection','Por grado y sección'],['ready','Preparación CEFR'],['mockprog','Progreso Mock 1 → 2'],['level','Por nivel CEFR']];
  const TYPES=[['bar','Barras'],['line','Línea'],['doughnut','Dona'],['polarArea','Polar']];
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h1 style="margin:0">Estadísticas y Reportes</h1>
      <div class="row" style="gap:8px"><button class="btn sm" onclick="adminNewUser()">+ Alumno</button><button class="btn sm ghost" onclick="adminNewTeacher()">+ Profesor</button></div>
    </div>
    <div class="card" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
      <div><label>Grado</label><select onchange="window._stF('grade',this.value)" style="min-width:150px">${gOpts}</select></div>
      <div><label>Sección</label><select onchange="window._stF('section',this.value)" style="min-width:140px">${sOpts}</select></div>
      <div><label>Destreza</label><select onchange="window._stF('skill',this.value)" style="min-width:150px">${skOpts}</select></div>
      <div><label>Examen</label><select onchange="window._stF('exam',this.value)" style="min-width:150px">${exOpts}</select></div>
    </div>
    <div class="grid cols-3" style="margin-bottom:4px">
      <div class="stat"><div class="l">Exámenes calificados</div><div class="n">${scored.length}</div></div>
      <div class="stat"><div class="l">Promedio general</div><div class="n">${overall!=null?overall+'%':'—'}</div></div>
      <div class="stat"><div class="l">Alumnos evaluados</div><div class="n">${studentsAssessed}</div></div>
      <div class="stat" style="background:linear-gradient(135deg,var(--blue),var(--celeste));color:#fff"><div class="l" style="color:#eaf4ff">Listos p/ oficial (Dic)</div><div class="n" style="color:#fff">${readyPct}%</div></div>
    </div>
    <div class="card">
      <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center">
        <div class="row" style="gap:6px;flex-wrap:wrap">${VIEWS.map(([v,l])=>`<button class="btn sm ${f.view===v?'':'ghost'}" onclick="window._stView('${v}')">${l}</button>`).join('')}</div>
        <div class="row" style="gap:6px">${TYPES.map(([v,l])=>`<button class="btn sm ${f.type===v?'':'ghost'}" style="font-size:.78rem;padding:5px 10px" onclick="window._stType('${v}')">${l}</button>`).join('')}</div>
      </div>
      <div style="position:relative;height:380px;margin-top:14px"><canvas id="statChart"></canvas></div>
      <div id="statLegend" class="row" style="gap:14px;flex-wrap:wrap;margin-top:10px;font-size:.82rem"></div>
    </div>
    <div class="card">
      <h2>📅 Proyección a Diciembre — Examen oficial</h2>
      <p class="muted" style="margin-top:-4px">Cada alumno se proyecta con su <b>Mock 2</b> (o Mock 1 si aún no rinde el segundo). Estándar de aprobación Cambridge ≈ 60%.</p>
      <div style="position:relative;height:300px;margin:10px 0"><canvas id="statDec"></canvas></div>
      <div style="overflow-x:auto"><table>
        <thead><tr><th>Grado</th><th>Alumnos</th><th>Prom. Mock 1</th><th>Prom. Mock 2</th><th>Proyección Dic</th><th>Listos</th><th>Pendiente 2.º mock</th></tr></thead>
        <tbody>${proj.byGrade.map(r=>`<tr>
          <td><b>${esc(r.grade)}</b></td>
          <td>${r.total}</td>
          <td>${r.m1!=null?r.m1+'%':'—'}</td>
          <td>${r.m2!=null?`<b>${r.m2}%</b>`:'<span class="muted">—</span>'}</td>
          <td>${r.proj!=null?`<span class="badge ${r.proj>=60?'on':'off'}">${r.proj}%</span>`:'<span class="muted">—</span>'}</td>
          <td>${r.ready}/${r.assessed}</td>
          <td>${r.pending? `<span class="badge off">${r.pending}</span>`:'<span class="badge on">0</span>'}</td>
        </tr>`).join('')||'<tr><td colspan="7" class="center muted">Sin datos de mocks todavía.</td></tr>'}</tbody>
      </table></div>
    </div>`;
  drawStatChart();
  drawDecChart(proj);
}
window._stF=(k,v)=>{ statsState[k]=v; adminStats(); };
window._stView=(v)=>{ statsState.view=v; adminStats(); };
window._stType=(v)=>{ statsState.type=v; adminStats(); };

function statSeries(){
  const sc=statsFiltered();
  const v=statsState.view;
  if(v==='grade'){
    const rows=GRADES.map((g,i)=>({label:g.name, val:_avg(sc.filter(a=>String(a.profiles?.grade_id)===String(g.id)).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]})).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Promedio (%) por grado'};
  }
  if(v==='skill'){
    const rows=SKILLS.map((s,i)=>({label:s, val:_avg(sc.filter(a=>a.skill===s).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]})).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Promedio (%) por destreza'};
  }
  if(v==='level'){
    const rows=LEVELS.map((l,i)=>({label:l, val:_avg(sc.filter(a=>a.level===l).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]})).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Promedio (%) por nivel CEFR'};
  }
  if(v==='gradesection'){
    const keys=[...new Set(sc.map(a=>`${a.profiles?.grade_id}|${a.profiles?.section||'—'}`))]
      .filter(k=>!k.startsWith('undefined')).sort();
    const rows=keys.map((k,i)=>{ const [g,sec]=k.split('|'); return {label:`${gradeName(g)} ${sec}`, val:_avg(sc.filter(a=>`${a.profiles?.grade_id}|${a.profiles?.section||'—'}`===k).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]};}).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Promedio (%) por grado y sección'};
  }
  if(v==='ready'){
    const rows=READY_TIERS.map(t=>({label:t.label, val:sc.filter(a=>readyTier(a.percent).key===t.key).length, color:t.color})).filter(r=>r.val>0);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Distribución de preparación (n.º de exámenes)', distribution:true};
  }
  if(v==='parts'){
    const ps=aggregateParts(sc); // weakest first
    const col=p=>p.avg<50?'#dc2626':p.avg<70?'#f59e0b':'#16a34a';
    return {labels:ps.map(p=>p.name), data:ps.map(p=>p.avg), colors:ps.map(col), title:'Promedio (%) por parte del examen — débil → fuerte'};
  }
  if(v==='mockprog'){
    const labels=GRADES.map(g=>g.name);
    const m1=GRADES.map(g=>_avg(sc.filter(a=>a.mock==='mock1'&&String(a.profiles?.grade_id)===String(g.id)).map(a=>a.percent)));
    const m2=GRADES.map(g=>_avg(sc.filter(a=>a.mock==='mock2'&&String(a.profiles?.grade_id)===String(g.id)).map(a=>a.percent)));
    const keep=labels.map((_,i)=>m1[i]!=null||m2[i]!=null);
    return {labels:labels.filter((_,i)=>keep[i]), multi:[
      {label:'Mock 1', data:labels.map((_,i)=>m1[i]).filter((_,i)=>keep[i]), color:'#76cbe5'},
      {label:'Mock 2', data:labels.map((_,i)=>m2[i]).filter((_,i)=>keep[i]), color:'#2f5f93'}
    ], title:'Progreso Mock 1 → Mock 2 (% por grado)'};
  }
  return {labels:[],data:[],colors:[],title:''};
}
function gradeName(id){ const g=GRADES.find(x=>String(x.id)===String(id)); return g?g.name:'—'; }

function drawStatChart(){
  const s=statSeries(); const ctx=document.getElementById('statChart'); if(!ctx) return;
  if(_chart){ _chart.destroy(); _chart=null; }
  let type=statsState.type;
  if(s.distribution && (type==='line')) type='doughnut';
  if(s.multi && (type==='doughnut'||type==='polarArea')) type='bar';
  let cfg;
  if(s.multi){
    cfg={type:type==='line'?'line':'bar', data:{labels:s.labels, datasets:s.multi.map(d=>({label:d.label, data:d.data, backgroundColor:d.color, borderColor:d.color, borderWidth:2, tension:.3, fill:false}))},
      options:{responsive:true,maintainAspectRatio:false, scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+'%'}}}, plugins:{legend:{position:'bottom'}}}};
  } else {
    const single=(type==='doughnut'||type==='polarArea');
    cfg={type, data:{labels:s.labels, datasets:[{label:s.title, data:s.data, backgroundColor:single?s.colors:s.colors, borderColor:single?'#fff':s.colors, borderWidth:single?2:0, borderRadius:type==='bar'?8:0, tension:.3, fill:type==='line'?false:true, pointBackgroundColor:s.colors}]},
      options:{responsive:true,maintainAspectRatio:false,
        scales:(type==='doughnut'||type==='polarArea')?{}:{y:{beginAtZero:true, max:s.distribution?undefined:100, ticks:{callback:v=>s.distribution?v:v+'%'}}},
        plugins:{legend:{display:(type==='doughnut'||type==='polarArea'), position:'bottom'},
          title:{display:true,text:s.title,color:'#2b2c33',font:{size:14,weight:'700'}}}}};
  }
  _chart=new Chart(ctx,cfg);
  // custom legend for bar/line single series
  const leg=document.getElementById('statLegend');
  if(leg){ leg.innerHTML = (!s.multi && !(statsState.type==='doughnut'||statsState.type==='polarArea'))
    ? s.labels.map((l,i)=>`<span style="display:inline-flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:3px;background:${s.colors[i]};display:inline-block"></span>${esc(l)}: <b>${s.data[i]}${s.distribution?'':'%'}</b></span>`).join('')
    : ''; }
}
function decemberProjection(){
  const students=(_statsStudents||[]).map(st=>{
    const mine=(_statsAll||[]).filter(a=>a.student_id===st.id && a.percent!=null && isMockAttempt(a));
    const m1=_avg(mine.filter(a=>a.mock==='mock1').map(a=>a.percent));
    const m2=_avg(mine.filter(a=>a.mock==='mock2').map(a=>a.percent));
    const proj = m2!=null?m2:m1;
    return {id:st.id, grade_id:st.grade_id, section:st.section, m1, m2, proj, hasM1:m1!=null, hasM2:m2!=null};
  });
  const byGrade=GRADES.map(g=>{
    const gs=students.filter(s=>String(s.grade_id)===String(g.id));
    const assessed=gs.filter(s=>s.proj!=null);
    return {grade:g.name, total:gs.length,
      m1:_avg(gs.filter(s=>s.m1!=null).map(s=>s.m1)),
      m2:_avg(gs.filter(s=>s.m2!=null).map(s=>s.m2)),
      proj:_avg(assessed.map(s=>s.proj)),
      assessed:assessed.length,
      ready:assessed.filter(s=>s.proj>=60).length,
      pending:gs.filter(s=>s.hasM1&&!s.hasM2).length};
  }).filter(r=>r.total>0);
  return {students, byGrade};
}
function drawDecChart(proj){
  const ctx=document.getElementById('statDec'); if(!ctx) return;
  if(_chartDec){ _chartDec.destroy(); _chartDec=null; }
  const rows=proj.byGrade;
  _chartDec=new Chart(ctx,{type:'bar', data:{labels:rows.map(r=>r.grade), datasets:[
    {label:'Mock 1', data:rows.map(r=>r.m1), backgroundColor:'#76cbe5', borderRadius:6},
    {label:'Mock 2', data:rows.map(r=>r.m2), backgroundColor:'#2f5f93', borderRadius:6},
    {label:'Meta (60%)', type:'line', data:rows.map(()=>60), borderColor:'#dc2626', borderDash:[6,4], pointRadius:0, borderWidth:2}
  ]}, options:{responsive:true,maintainAspectRatio:false, scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+'%'}}}, plugins:{legend:{position:'bottom'}}}});
}

/* ===================== TEACHER ===================== */
let resultsFilter = { grade:'', section:'', name:'', dateFrom:'', dateTo:'' };
let _currentResultsList = [];
async function loadTeacherAccess(){
  const { data } = await sb.from('teacher_access').select('*').eq('profile_id', state.session.user.id).maybeSingle();
  state.teacherAccess = data || { can_results:true, can_students:false, all_grades:true, grades:[] };
  return state.teacherAccess;
}
function teacherAllowedGrades(){
  const acc = state.teacherAccess || { all_grades:true, grades:[] };
  return acc.all_grades ? GRADES : GRADES.filter(g => (acc.grades||[]).includes(g.id));
}
async function renderTeacher(tab){
  if(tab==='exams'){ window.location.assign(location.origin + '/mocks-cambridge/quizzes.html'); return; }
  const acc = state.teacherAccess || await loadTeacherAccess();
  const nav=[];
  if(acc.can_results) nav.push({key:'results',label:'📝 Resultados'});
  if(acc.can_results) nav.push({key:'final',label:'🎓 Resultado final'});
  if(acc.can_students) nav.push({key:'students',label:'👥 Alumnos'});
  if(!nav.length) nav.push({key:'none',label:'— sin accesos —'});
  nav.push({key:'exams',label:'🎧 Exámenes'});
  nav.push({key:'mun',label:'🌐 MUN Academy'});
  nav.push({key:'phonics',label:'🔤 Phonics'});
  nav.push({key:'coach',label:'🎙️ Pronunciación'});
  const active = (tab && nav.some(n=>n.key===tab)) ? tab : nav[0].key;
  document.body.innerHTML = shell(nav, active, `<div class="center muted">Cargando…</div>`);
  bindNav(renderTeacher);
  if(active==='mun') return $('#main').innerHTML = munBody();
  if(active==='results') return teacherResults();
  if(active==='final') return cefrFinalPanel();
  if(active==='students') return teacherStudents();
  if(active==='phonics'){ $('#main').innerHTML = phonicsPanel(); return; }
  if(active==='coach'){ $('#main').innerHTML = coachPanel(); return; }
  $('#main').innerHTML = `<div class="card">El administrador aún no te ha asignado accesos. Escríbele para que te habilite <b>Resultados</b> o <b>Alumnos</b>.</div>`;
}
/* ── Shared results filter bar (admin + teacher) ────────────────────── */
function resultsFilterBar(gradeList, onChangeFn){
  const f = resultsFilter;
  const gradeOpts = `<option value="">Todos los grados</option>`
    + gradeList.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const sectionOpts = `<option value="">Todas</option>`
    + ['A','B'].map(s=>`<option value="${s}" ${f.section===s?'selected':''}>${s}</option>`).join('');
  const hasFilter = f.grade||f.section||f.name||f.dateFrom||f.dateTo;
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADO</label>
      <select onchange="${onChangeFn}('grade',this.value)" style="min-width:140px">${gradeOpts}</select>
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">SECCIÓN</label>
      <select onchange="${onChangeFn}('section',this.value)" style="min-width:100px">${sectionOpts}</select>
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">NOMBRE</label>
      <input type="text" placeholder="Buscar alumno…" value="${esc(f.name)}"
        oninput="${onChangeFn}('name',this.value)" style="min-width:180px">
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">DESDE</label>
      <input type="date" value="${f.dateFrom}" onchange="${onChangeFn}('dateFrom',this.value)">
    </div>
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">HASTA</label>
      <input type="date" value="${f.dateTo}" onchange="${onChangeFn}('dateTo',this.value)">
    </div>
    ${hasFilter ? `<button class="btn sm ghost" style="align-self:flex-end" onclick="${onChangeFn}('_clear','')">✕ Limpiar</button>` : ''}
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

/* ── Export filtered results to CSV (Excel-compatible with UTF-8 BOM) ── */
window.exportResultsExcel = ()=>{
  const list = _currentResultsList || [];
  if(!list.length){ alert('No hay resultados para exportar.'); return; }
  const headers = ['Alumno','Grado','Sección','Nivel CEFR','Examen','Destreza','Puntaje (%)','Correctas','Total','Tiempo (min)','Fecha'];
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
    a.submitted_at  ? new Date(a.submitted_at).toLocaleDateString('es-PE') : ''
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
      ? `<span class="badge off" title="Parte más débil" style="font-size:.72rem">▼ ${esc(ws.weak.name)} ${ws.weak.pct}%</span> <span class="badge on" title="Parte más fuerte" style="font-size:.72rem">▲ ${esc(ws.strong.name)} ${ws.strong.pct}%</span>`
      : '<span class="muted">—</span>';
    return `<tr>
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:((a.breakdown&&a.breakdown.teacherMessage)?'<span class="badge on" style="font-size:.72rem">✓ comentario enviado</span>':'<span class="muted">— (revisión)</span>')}</td>
    <td style="min-width:200px">${wsCell}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' ghost':''}" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-calificar':((a.breakdown&&a.breakdown.teacherMessage)?'Editar comentario':'Calificar')}</button>${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' <span class="badge on" style="font-size:.7rem">✓ enviado</span>':''}`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">Ver análisis →</button>`}</td></tr>`;}).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Resultados</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Exportar Excel</button>
    </div>
    ${resultsFilterBar(teacherAllowedGrades(),'window._setResFilter')}${tabs}
    ${partsBreakdownCard(list)}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Sección</th><th>Examen</th><th>Puntaje</th><th>Débil / Fuerte (partes)</th><th>Fecha</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="8" class="center muted">Sin intentos ${isMock?'de mocks':'de practice tests'} para este filtro.</td></tr>`}</tbody>
    </table>
    <div class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} resultado(s)</div></div>`;
}
async function teacherStudents(){
  state._tab='students';
  const { data } = await sb.from('profiles').select('*, grades(name)').eq('role','student');
  let list=data||[]; const fg=teacherFilter.grade;
  if(fg) list=list.filter(p=>String(p.grade_id)===String(fg));
  list.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));
  const rows=list.map(p=>`<tr><td><b>${esc(p.full_name||p.email)}</b></td><td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td><td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td></tr>`).join('');
  $('#main').innerHTML=`<h1>Alumnos</h1>${gradeFilterBar('window._setTeacherGrade')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Nivel</th></tr></thead>
      <tbody>${rows||'<tr><td colspan="3" class="center muted">Sin alumnos para este filtro.</td></tr>'}</tbody></table>
      <div class="muted" style="padding:10px 14px">${list.length} alumno(s)</div></div>`;
}

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
const WRITING_RUBRICS = {
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
window.gradeWriting = async (id)=>{
  const { data:a, error } = await sb.from('exam_attempts').select('*, profiles(full_name,email,grade_id,grades(name))').eq('id',id).single();
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const rubric = WRITING_RUBRICS[a.level] || WRITING_RUBRICS.B1;
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
  gradeState = { id, attempt:a, rubric, sel_t1, sel_t2, msg:(a.breakdown&&a.breakdown.teacherMessage)||'', touched: !!(a.breakdown&&a.breakdown.teacherMessage) };
  renderGradeWriting();
};

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
        <div class="row" style="justify-content:space-between"><b>${esc(t.label||'Task')}</b><span class="muted" style="font-size:.82rem">${t.wordCount!=null?t.wordCount+' palabras':''}</span></div>
        <div style="white-space:pre-wrap;margin-top:6px;font-size:.93rem;line-height:1.6">${esc(t.text||'(sin respuesta)')}</div></div>`).join('')
    : `<p class="muted">Este intento no guardó el texto del alumno.</p>`;

  // Right column: Task 1 rubrics + Task 2 rubrics
  const t1Label = (answers[0] && answers[0].label) || 'Task 1 — Part 1';
  const t2Label = (answers[1] && answers[1].label) || 'Task 2 — Part 2';

  $('#main').innerHTML = `
    <button class="btn sm ghost" onclick="teacherResults()">← Volver a resultados</button>
    <h1 style="margin:.4rem 0 0">✍️ Calificar Writing</h1>
    <div class="muted" style="margin-bottom:10px">${esc(a.profiles?.full_name||'Alumno')} · ${esc(a.profiles?.grades?.name||'')} · ${esc(a.level)} · ${mockLabel(a)} · ${new Date(a.submitted_at).toLocaleString()}</div>
    <div class="grid cols-2" style="align-items:start">
      <div>
        <div class="card"><h2 style="margin-top:0">Texto del alumno</h2>${textsHtml}</div>
      </div>
      <div>
        <div class="note">Haz clic en el descriptor que corresponde en cada criterio (rúbrica Cambridge, 0–${rubric.bandMax}). La nota de cada parte se calcula sola.</div>
        ${_taskRubricHtml(t1Label, 0)}
        ${_taskRubricHtml(t2Label, 1)}
        <div class="card" style="position:sticky;bottom:0">
          <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
            <h2 style="margin:0">Total</h2>
            <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
              <span class="muted" style="font-size:.85rem">T1: <b id="gw-sub1-lbl">—</b> &nbsp;T2: <b id="gw-sub2-lbl">—</b></span>
              <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span id="gw-total">0</span> / ${totalMax} · <span id="gw-pct">0</span>%</div>
            </div>
          </div>
          <label style="margin-top:10px;display:block">Mensaje para el alumno (editable)</label>
          <textarea id="gw-msg" rows="5" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px" oninput="gradeState.touched=true;gradeState.msg=this.value">${esc(gradeState.msg||'')}</textarea>
          <div id="gw-status" style="margin-top:6px;font-size:.88rem"></div>
          <div class="row" style="margin-top:10px;gap:10px">
            <button class="btn" id="gw-send" onclick="window._sendWritingResult()">📧 Enviar resultado al alumno</button>
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
    st.innerHTML='<span style="color:var(--bad)">Escribe un comentario para el alumno, o marca un Band en cada criterio de ambas partes, antes de enviar.</span>';
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
  $('#gw-send').disabled=true; st.textContent='Guardando…';
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
      ? new Error('Tiempo de espera agotado — revisa tu conexión e intenta de nuevo.')
      : e;
  }
  if(rpcErr){ $('#gw-send').disabled=false; st.innerHTML=`<span style="color:var(--bad)">No se pudo guardar: ${esc(rpcErr.message||String(rpcErr))}</span>`; return; }
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
  st.innerHTML=`<span style="color:var(--good)">✓ ${graded?'Resultado guardado y enviado al alumno.':'Comentario guardado y enviado al alumno.'}</span>`;
  setTimeout(teacherResults, 1200);
};

/* ===================== STUDENT ===================== */
async function renderStudent(initial){
  document.body.innerHTML = shell([
    {key:'home',label:'🏠 Inicio'},
    {key:'english',label:'🇬🇧 English'},
    {key:'french',label:'🇫🇷 French'},
    {key:'general',label:'🗂️ General'},
    {key:'results',label:'📊 My Progress'},
  ], initial||'home', `<div class="center muted">Cargando…</div>`);
  bindNav(k=>{
    if(k==='english') return studentSubject('english');
    if(k==='french') return studentSubject('french');
    if(k==='general') return studentGeneral();
    if(k==='mun') return studentMun();
    if(k==='phonics') return studentPhonics();
    if(k==='coach') return studentCoach();
    if(k==='mocks') return studentMocks();
    if(k==='practice') return studentPractice();
    if(k==='classes') return studentClasses();
    if(k==='classes_g9') return studentGrade('g9');
    if(k==='library') return studentLibrary();
    if(k==='results') return studentResults();
    if(k==='final') return studentFinal();
    return studentHub();
  });
  if(initial==='results') studentResults(); else studentHub();
}
function _setNav(k){ document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav===k)); }
function studentPhonics(){ _setNav('phonics'); $('#main').innerHTML = phonicsPanel(); }
function studentCoach(){ _setNav('coach'); $('#main').innerHTML = coachPanel(); }

/* ---------- Student dashboard (hub) ---------- */
function _hubCard(emoji,title,desc,onclick,extra){
  return `<div class="card center" ${onclick?`onclick="${onclick}" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${onclick}}"`:''} style="cursor:${onclick?'pointer':'default'};padding:28px 16px;margin-bottom:0;transition:.15s"
    onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
    <div style="font-size:3rem;line-height:1">${emoji}</div>
    <h2 style="margin:10px 0 4px;color:var(--blue-d)">${title}</h2>
    <div class="muted" style="font-size:.85rem">${desc}</div>${extra||''}
  </div>`;
}
function studentHub(){
  _setNav('home');
  const p=state.profile;
  $('#main').innerHTML=`<h1>Hola, ${esc(p.first_name||p.full_name||'')} 👋</h1>
    <p class="muted" style="margin-top:-6px">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''} · Nivel ${esc(p.cefr_level||'sin asignar')} — ¿Qué quieres hacer hoy?</p>
    <h2 style="margin:18px 0 8px">Materias</h2>
    <div class="grid cols-3">
      ${_hubCard('🇬🇧','English','Pronunciation, Mocks, Classes y más.',"window._nav('english')")}
      ${_hubCard('🇫🇷','French','Próximamente — pronto habilitaremos el francés.',"window._nav('french')")}
    </div>
    <h2 style="margin:22px 0 8px">General</h2>
    <div class="grid cols-3">
      ${_hubCard('📚','Library','Biblioteca NIS: busca y explora los libros del colegio.',"window._nav('library')")}
      ${_hubCard('🌐','MUN Academy','Model United Nations: debate, oratoria y diplomacia.',"window._nav('mun')")}
    </div>`;
}

/* ---------- Jerarquía de contenido: Materia → Área → Grado → Actividad ----------
   Las áreas de English se reflejan en French (placeholder hasta alimentarlas). */
const ENGLISH_AREAS = [
  {emoji:'🎙️', title:'Pronunciation', desc:'Escucha cada sonido, mira la lengua y el aire, y practica.', nav:'coach'},
  {emoji:'🎓', title:'Mocks',         desc:'Simulacros oficiales MOCK 1 y MOCK 2 por destreza.',        nav:'mocks'},
  {emoji:'🏫', title:'Classes',       desc:'Material de clase por grado: grammar, actividades y más.',  nav:'classes'},
  {emoji:'🎯', title:'Practice Tests',desc:'Prácticas 1, 2 y 3 en formato Cambridge, siempre disponibles.', nav:'practice'},
  {emoji:'🔤', title:'Phonics',       desc:'Sonidos y formas de las palabras: CVC, blends, magic-e.',  nav:'phonics'},
  {emoji:'📊', title:'My Progress',   desc:'Todos tus exámenes y prácticas: tu historial y avance.',    nav:'results', englishOnly:true},
  {emoji:'🏅', title:'Resultado final',desc:'Tu nivel final CEFR (reporte para los padres) + PDF.',      nav:'final',   englishOnly:true},
];
function _backBtn(onclick,label){
  return `<button class="btn sm ghost" onclick="${onclick}" style="margin-bottom:10px">← ${label}</button>`;
}
function _isStudent(){ return !!(state.profile && state.profile.role==='student'); }

/* Vista de materia (English / French) */
function studentSubject(key){
  _setNav(key);
  const isEn = key==='english';
  const title = isEn ? '🇬🇧 English' : '🇫🇷 French';
  const areas = isEn ? ENGLISH_AREAS : ENGLISH_AREAS.filter(a=>!a.englishOnly);
  const cards = areas.map(a=> isEn
    ? _hubCard(a.emoji,a.title,a.desc,`window._nav('${a.nav}')`)
    : _soonCard(a.emoji,a.title,a.desc)).join('');
  $('#main').innerHTML = `${_backBtn("window._nav('home')",'Inicio')}<h1>${title}</h1>
    <p class="muted" style="margin-top:-6px">${isEn?'Tus áreas de inglés.':'Próximamente — iremos habilitando el francés poco a poco.'}</p>
    <div class="grid cols-3" style="margin-top:12px">${cards}</div>`;
}

/* Vista General (transversal) */
function studentGeneral(){
  _setNav('general');
  $('#main').innerHTML=`<h1>🗂️ General</h1>
    <p class="muted" style="margin-top:-6px">Recursos generales del portal.</p>
    <div class="grid cols-3" style="margin-top:12px">
      ${_hubCard('📚','Library','Biblioteca NIS: busca y explora los libros del colegio.',"window._nav('library')")}
      ${_hubCard('🌐','MUN Academy','Model United Nations: debate, oratoria y diplomacia.',"window._nav('mun')")}
    </div>`;
}

/* Resultado final del alumno = reporte CEFR que se entrega a los padres + PDF.
   El alumno ve el suyo; Profesor/Admin lo generan desde su panel (cefrFinalPanel). */
async function studentFinal(){
  _setNav('final');
  const p=state.profile;
  const back=_isStudent()?_backBtn("window._nav('english')",'English'):'';
  $('#main').innerHTML=`${back}<h1>🏅 Resultado final · CEFR</h1><p class="muted">Cargando…</p>`;
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,mock,submitted_at').eq('student_id',p.id);
  let sp=null; try{ const r=await sb.from('speaking_results').select('*').eq('student_id',p.id).maybeSingle(); sp=r&&r.data; }catch(e){}
  const fin=_finalFromData(p, at||[], sp);
  const tgt=targetLevel(p), stt=targetStatus(fin.finalCefr,tgt);
  const sttTxt = stt==='below'?`▼ Por debajo de tu objetivo (${tgt})`:stt==='above'?`▲ Por encima de tu objetivo (${tgt})`:stt==='meets'?`✓ Cumples tu objetivo (${tgt})`:'';
  const ch='padding:8px;border:1px solid var(--line)';
  const row=(label,b)=>`<tr><td style="${ch}"><b>${label}</b></td>
    <td style="${ch};text-align:center">${b?b.level:'—'}</td>
    <td style="${ch};text-align:center">${b?(b.pct!=null?b.pct+'%':'—'):'<span style="color:#b45309">Pendiente</span>'}</td>
    <td style="${ch};text-align:center;color:var(--blue-d);font-weight:700">${b?b.cefr:'—'}</td>
    <td style="${ch};text-align:center">${b?b.scale:'—'}</td></tr>`;
  const wRow = fin.isA2
    ? `<tr><td style="${ch}"><b>Writing</b></td><td colspan="4" style="${ch};color:var(--grey)">Incluido en Reading &amp; Use of English (A2 Key)</td></tr>`
    : row('Writing', fin.skills.Writing);
  $('#main').innerHTML=`${back}<h1>🏅 Resultado final · CEFR</h1>
    <p class="muted" style="margin-top:-6px">Este es el reporte que se entrega a los padres: tu nivel final combinando tus mejores resultados por destreza en la Escala Cambridge.</p>
    <div class="card" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr><th style="${ch};text-align:left">Destreza</th><th style="${ch}">Nivel</th><th style="${ch}">Resultado</th><th style="${ch}">CEFR</th><th style="${ch}">Escala</th></tr></thead>
      <tbody>
        ${row('Reading &amp; Use of English'+(fin.isA2?' (incluye Writing)':''),fin.skills.Reading)}
        ${row('Listening',fin.skills.Listening)}
        ${wRow}
        ${row('Speaking',fin.skills.Speaking)}
      </tbody></table></div>
    <div class="card" style="display:flex;gap:16px;align-items:center;background:#0f2741;color:#fff">
      <div><div style="font-size:.78rem;opacity:.8">RESULTADO FINAL</div><div style="font-size:2.2rem;font-weight:800;line-height:1">${fin.finalCefr}</div></div>
      <div style="border-left:1px solid rgba(255,255,255,.3);padding-left:16px"><div style="font-size:.78rem;opacity:.8">ESCALA CAMBRIDGE</div><div style="font-size:1.6rem;font-weight:700">${fin.finalScale!=null?fin.finalScale:'—'}</div></div>
      <div style="margin-left:auto;text-align:right">
        ${sttTxt?`<div style="font-size:.85rem;font-weight:700;color:${stt==='below'?'#fca5a5':'#86efac'}">${sttTxt}</div>`:''}
        ${fin.complete?'':`<div style="font-size:.74rem;opacity:.9;margin-top:4px">⚠ Provisional. Faltan: ${esc(fin.missing.join(', '))}.</div>`}
      </div>
    </div>
    <button class="btn" onclick="window.studentReportPDF('${p.id}')">📄 Descargar mi PDF</button>`;
}

/* Vista de un grado dentro de Classes (9th grade → Grammar + Activities) */
function studentGrade(key){
  _setNav('classes');
  const back = _isStudent() ? _backBtn("window._nav('classes')",'Classes') : '';
  $('#main').innerHTML=`${back}<h1>9️⃣ 9th grade</h1>
    <p class="muted" style="margin-top:-6px">Material de 9no grado.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('📝','Grammar','Gramática de 9no: explicaciones y práctica (en construcción).','grammar.html')}
      ${_skillCard('🎲','Activities','Juegos y actividades: crosswords, word searches y más.','activities.html')}
    </div>`;
}
window._nav=(k)=>{
  const fn={english:()=>studentSubject('english'),french:()=>studentSubject('french'),general:studentGeneral,
    mocks:studentMocks,practice:studentPractice,library:studentLibrary,mun:studentMun,classes:studentClasses,
    classes_g9:()=>studentGrade('g9'),phonics:studentPhonics,coach:studentCoach,results:studentResults,
    final:studentFinal,home:studentHub}[k];
  if(fn) fn();
};

/* ---------- Cambridge Mocks: 4 tarjetas (sin QR, sin re-registro) ---------- */
function _skillCard(emoji,title,desc,href){
  return `<a class="card center" href="${href}" style="text-decoration:none;color:inherit;display:block;padding:30px 18px;margin-bottom:0;transition:.15s"
      onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
      <div style="font-size:3.4rem;line-height:1">${emoji}</div>
      <h2 style="margin:10px 0 2px;color:var(--blue-d)">${title}</h2>
      <div class="muted" style="font-size:.85rem">${desc}</div>
    </a>`;
}
function _soonCard(emoji,title,desc){
  return `<div class="card center" style="padding:30px 18px;margin-bottom:0;opacity:.75">
      <div style="font-size:3.4rem;line-height:1">${emoji}</div>
      <h2 style="margin:10px 0 2px;color:var(--blue-d)">${title}</h2>
      <div class="muted" style="font-size:.85rem">${desc}</div>
      <div class="badge" style="background:var(--lila);color:var(--blue-dd);margin-top:10px">Próximamente</div>
    </div>`;
}
function studentMocks(){
  _setNav('mocks');
  $('#main').innerHTML=`<h1>🎓 Cambridge Mocks</h1>
    <p class="muted" style="margin-top:-6px">MOCK 1 y MOCK 2 en formato Cambridge oficial (A2 · B1 · B2 · C1). Entras directo con tu sesión — no necesitas volver a poner tus datos. Tu resultado se guarda solo en My Progress.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','Textos y tareas estilo KET/PET/FCE/CAE con temporizador.',QUIZ_URL+'reading-quiz.html?branch=mocks')}
      ${_skillCard('🎧','Listening','Audio real en formato Cambridge, con temporizador.',QUIZ_URL+'listening-quiz.html?branch=mocks')}
      ${_skillCard('✍️','Writing','Part 1 obligatoria + Part 2 a elegir. Lo califica tu profesor. Solo B1 · B2 · C1.',QUIZ_URL+'writing-quiz.html?branch=mocks')}
      ${_soonCard('🗣️','Speaking','Entrevista estilo Cambridge con examinador.')}
    </div>`;
}

/* ---------- Practice Tests: siempre disponibles (sin QR, sin re-registro) ---------- */
function studentPractice(){
  _setNav('practice');
  $('#main').innerHTML=`<h1>🎯 Practice Tests</h1>
    <p class="muted" style="margin-top:-6px">Prácticas 1, 2 y 3 en formato Cambridge auténtico — siempre disponibles. Entras directo con tu sesión y tu resultado se guarda solo en My Progress.</p>
    <div class="grid cols-3" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','Práctica 1 · 2 · 3 con corrección automática y feedback CEFR.',QUIZ_URL+'reading-quiz.html?branch=practice')}
      ${_skillCard('🎧','Listening','Práctica con audio real y corrección automática.',QUIZ_URL+'listening-quiz.html?branch=practice')}
      ${_skillCard('✍️','Writing','Tareas de escritura que tu profesor califica con rúbrica.',QUIZ_URL+'writing-quiz.html?branch=practice')}
    </div>`;
}

/* ---------- Library ---------- */
function studentLibrary(){
  _setNav('library');
  $('#main').innerHTML=`<h1>📚 Library</h1>
    <p class="muted" style="margin-top:-6px">Biblioteca NIS — catálogo en línea (OPAC).</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('📚','Abrir la Biblioteca','Busca libros, revisa disponibilidad y tus préstamos.',LIBRARY_URL)}
    </div>
    <div class="note info" style="margin-top:14px">ℹ️ La biblioteca se abre en una pestaña nueva. Si no carga, avisa a tu profesor (el servidor de la biblioteca debe estar encendido).</div>`;
}

/* ---------- Classes: Presentations + Activities ---------- */
function studentClasses(){
  _setNav('classes');
  const back = _isStudent() ? _backBtn("window._nav('english')",'English') : '';
  $('#main').innerHTML=`${back}<h1>🏫 Classes</h1>
    <p class="muted" style="margin-top:-6px">Material de clase por grado.</p>
    <div class="grid cols-3" style="margin-top:12px">
      ${_hubCard('9️⃣','9th grade','Grammar y actividades de 9no grado.',"window._nav('classes_g9')")}
    </div>
    <p class="muted" style="margin-top:12px;font-size:.85rem">Más grados próximamente.</p>`;
}

/* ---------- My Progress: historial completo del alumno (mocks, practice y actividades) ---------- */
async function studentResults(){
  _setNav('results');
  const p=state.profile;
  const back = _isStudent() ? _backBtn("window._nav('english')",'English') : '';
  $('#main').innerHTML=`${back}<h1>📊 My Progress</h1><p class="muted">Cargando…</p>`;
  const { data:atts } = await sb.from('exam_attempts').select('*').eq('student_id',p.id).order('submitted_at',{ascending:false});
  const bySkill = SKILLS.map(sk=>{
    const a=(atts||[]).filter(x=>x.skill===sk);
    const scored=a.filter(x=>x.percent!=null);              // Writing is not auto-scored
    const best=scored.length?Math.max(...scored.map(x=>+x.percent)):null;
    const avg=scored.length?Math.round(scored.reduce((s,x)=>s+(+x.percent),0)/scored.length):null;
    return {sk,n:a.length,best,avg};
  });
  const histTable=(list)=> list.length ? `<table><thead><tr><th>Examen</th><th>Puntaje</th><th>Fecha</th></tr></thead><tbody>${
      list.map(a=>{
        const lbl=`${esc(a.skill)} · ${esc(a.level)} · ${mockLabel(a)}`;
        const score = a.percent!=null ? `${a.score}/${a.total} (${a.percent}%)`
          : (a.skill==='Writing' ? '<span class="muted">Pendiente de calificación</span>' : '—');
        const msg = (a.breakdown&&a.breakdown.teacherMessage)
          ? `<tr><td colspan="3" style="background:#f7faff;font-size:.9rem">📣 <b>Profesor:</b> ${esc(a.breakdown.teacherMessage)}</td></tr>` : '';
        return `<tr><td>${lbl}</td><td>${score}</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td></tr>${msg}`;
      }).join('')
    }</tbody></table>` : `<p class="muted">Aún no hay intentos aquí.</p>`;
  const all=atts||[];
  const mocks=all.filter(isMockAttempt), practice=all.filter(a=>!isMockAttempt(a));
  const { data:acts } = await sb.from('activity_attempts').select('*').eq('student_id',p.id).order('submitted_at',{ascending:false});
  const fmtT=(s)=>{ s=s||0; return Math.floor(s/60)+'m '+String(s%60).padStart(2,'0')+'s'; };
  const actTable=(list)=> list.length ? `<table><thead><tr><th>Actividad</th><th>Nivel</th><th>Resultado</th><th>⏱ Tiempo</th><th>💡 Pistas</th><th>Fecha</th></tr></thead><tbody>${
      list.map(a=>`<tr><td>${a.activity==='crossword'?'🔎':'🔍'} ${esc(a.title||(a.activity==='crossword'?'Crossword':'Word Search'))}</td><td>${esc(a.level)}</td><td>${a.score!=null?`${a.score}/${a.total}`:'—'}</td><td>${fmtT(a.duration_sec)}</td><td>${a.hints_used||0}</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td></tr>`).join('')
    }</tbody></table>` : `<p class="muted">Aún no has completado actividades. Ve a <b>Classes → Activities</b>.</p>`;
  $('#main').innerHTML=`${back}<h1>📊 My Progress</h1>
    <p class="muted" style="margin-top:-6px">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''} · Nivel ${esc(p.cefr_level||'sin asignar')}</p>
    <div class="grid cols-3">
      ${bySkill.map(s=>`<div class="stat"><div class="l">${s.sk}</div>
        <div class="n">${s.best!=null?s.best+'%':'—'}</div>
        <div class="muted" style="font-size:.8rem">${s.n} intento(s)${s.avg!=null?' · prom '+s.avg+'%':''}</div></div>`).join('')}
    </div>
    <div class="card"><h2>Proyección</h2>${projection(p,bySkill,all)}</div>
    <div class="card"><h2>📝 Mocks (${mocks.length})</h2>${histTable(mocks)}</div>
    <div class="card"><h2>🎯 Practice Tests (${practice.length})</h2>${histTable(practice)}</div>
    <div class="card"><h2>🎲 Activities (${(acts||[]).length})</h2>${actTable(acts||[])}</div>
    ${all.length?'':'<div class="note info">Aún no has rendido exámenes. Empieza en <b>Practice Tests</b> o <b>Cambridge Mocks</b>.</div>'}`;
}
function projection(p,bySkill,atts){
  const done=bySkill.filter(s=>s.avg!=null);
  if(!done.length) return `<p class="muted">Rinde al menos un examen para ver tu proyección hacia ${esc(p.cefr_level||'tu nivel')}.</p>`;
  const overall=Math.round(done.reduce((s,x)=>s+x.avg,0)/done.length);
  const lvl=p.cefr_level||'B1';
  let verdict, cls;
  if(overall>=80){verdict=`Vas camino a un <b>aprobado alto</b> en ${lvl}. Listo para retar el siguiente nivel.`;cls='ok';}
  else if(overall>=60){verdict=`Estás en <b>nivel de aprobación</b> para ${lvl} (≈60% es el estándar Cambridge). Sigue consolidando.`;cls='ok';}
  else if(overall>=40){verdict=`Te estás <b>acercando</b> a ${lvl}. Enfócate en las destrezas más bajas de arriba.`;cls='info';}
  else {verdict=`Aún <b>por debajo</b> de ${lvl}. Conviene más práctica antes del examen oficial.`;cls='err';}
  const weak=[...done].sort((a,b)=>a.avg-b.avg)[0];
  // December official-test roadmap: Mock 1 → Mock 2 → Examen oficial
  const hasM1=(atts||[]).some(a=>a.mock==='mock1');
  const hasM2=(atts||[]).some(a=>a.mock==='mock2');
  const steps=[
    {k:'m1',label:'Mock 1',done:hasM1},
    {k:'m2',label:'Mock 2',done:hasM2},
    {k:'off',label:'Examen oficial · Diciembre',done:false}
  ];
  const roadmap=`<div class="row" style="gap:8px;flex-wrap:wrap;margin:12px 0 4px">${steps.map((s,i)=>`
    <span class="badge ${s.done?'on':(i===steps.findIndex(x=>!x.done)?'':'off')}" style="${(!s.done&&i===steps.findIndex(x=>!x.done))?'background:var(--blue);color:#fff':''}">${s.done?'✓ ':(i===steps.findIndex(x=>!x.done)?'▶ ':'')}${s.label}</span>${i<steps.length-1?'<span class="muted">→</span>':''}`).join('')}</div>`;
  const nextMsg = !hasM1 ? 'Tu siguiente paso es rendir el <b>Mock 1</b>.'
    : !hasM2 ? 'Rinde tu <b>Mock 2</b> para confirmar tu progreso antes del examen oficial de diciembre.'
    : (overall>=60 ? 'Vas en camino al <b>examen oficial de diciembre</b>. ¡Sigue practicando para asegurar el resultado!'
                   : 'Refuerza tus destrezas más bajas antes del <b>examen oficial de diciembre</b>.');
  return `<div class="proj"><div style="font-size:1.1rem;margin-bottom:6px">Promedio general: <b>${overall}%</b></div>
    <div class="note ${cls}" style="margin:8px 0">${verdict}</div>
    <div class="muted">Destreza a reforzar: <b>${weak.sk}</b> (${weak.avg}%).</div>
    ${roadmap}
    <div class="note info" style="margin-top:8px">📅 ${nextMsg}</div></div>`;
}

/* ===================== RESULTADO FINAL / CEFR ===================== */
/* Cambridge English Scale: reported range per exam level. A skill's % within
   its exam level maps linearly onto that range; the final is the average of the
   four skills' scale scores, mapped back to a CEFR band (the official chart). */
const SCALE_RANGE = { A2:[100,150], B1:[120,170], B2:[140,190], C1:[160,210] };
const CEFR_BANDS = [ {min:200,cefr:'C2'},{min:180,cefr:'C1'},{min:160,cefr:'B2'},
  {min:140,cefr:'B1'},{min:120,cefr:'A2'},{min:100,cefr:'A1'},{min:0,cefr:'<A1'} ];
function skillScale(level, pct){
  const r = SCALE_RANGE[level] || SCALE_RANGE.B1;
  if(pct==null || isNaN(pct)) return null;
  return Math.round(Math.max(r[0], Math.min(r[1], r[0] + (pct/100)*(r[1]-r[0]))));
}
function scaleToCefr(scale){
  if(scale==null) return '—';
  for(const b of CEFR_BANDS){ if(scale>=b.min) return b.cefr; }
  return '<A1';
}
/* Target ("applying-for") CEFR level per grade — school policy map.
   Only G6–G11 have students today; lower grades default to A2. Falls back to
   the student's stored cefr_level if a grade isn't mapped. */
const GRADE_TARGET = {1:'A2',2:'A2',3:'A2',4:'A2',5:'A2',6:'A2',7:'A2',8:'B1',9:'B2',10:'B2',11:'C1'};
function targetLevel(p){ return (p && (GRADE_TARGET[p.grade_id] || p.cefr_level)) || null; }
const CEFR_RANK = {'<A1':0,'A1':1,'A2':2,'B1':3,'B2':4,'C1':5,'C2':6};
/* Compare a final CEFR against the target: 'meets' | 'below' | 'above' | null */
function targetStatus(finalCefr, target){
  if(!target || finalCefr==null || finalCefr==='—' || !(finalCefr in CEFR_RANK)) return null;
  const d = CEFR_RANK[finalCefr] - CEFR_RANK[target];
  return d<0 ? 'below' : d>0 ? 'above' : 'meets';
}
/* Best attempt for a skill (mocks + practice), PASS-AWARE.
   A sub-pass attempt at a high level must NOT out-rank a genuine pass at a
   lower level (e.g. C1 @ 0% would otherwise score B2). So: pick the highest
   scale among attempts that reach the pass mark; if none passed, fall back to
   the highest-% attempt (not the highest level). */
const PASS_MIN = 50;
function bestAttemptScale(atts, skill){
  const rows = (atts||[])
    .filter(a => a.skill===skill && a.percent!=null)
    .map(a => ({ a, pct:Number(a.percent), scale:skillScale(a.level, Number(a.percent)) }))
    .filter(x => x.scale!=null);
  if(!rows.length) return null;
  const passed = rows.filter(x => x.pct >= PASS_MIN);
  const pick = passed.length
    ? passed.reduce((b,x) => x.scale > b.scale ? x : b)   // best pass by scale
    : rows.reduce((b,x) => x.pct > b.pct ? x : b);        // none passed: highest %, not highest level
  return { scale:pick.scale, cefr:scaleToCefr(pick.scale), level:pick.a.level,
           pct:Math.round(pick.pct), source:mockLabel(pick.a), passed:passed.length>0 };
}
/* Combine the four skills into a provisional/final CEFR result. */
function _finalFromData(profile, atts, spk){
  // A2 Key is a combined "Reading and Writing" paper, so Writing is NOT a
  // separate skill at A2 — it's embedded in Reading & Use of English. A2-track
  // students are therefore scored on Reading + Listening + Speaking only.
  const isA2 = targetLevel(profile)==='A2';
  const Reading   = bestAttemptScale(atts,'Reading');
  const Listening = bestAttemptScale(atts,'Listening');
  const Writing   = isA2 ? null : bestAttemptScale(atts,'Writing');
  let Speaking = null;
  if(spk && spk.percent!=null){
    const lvl = spk.level || targetLevel(profile) || 'B1';
    const sc = skillScale(lvl, Number(spk.percent));
    Speaking = { scale:sc, cefr:scaleToCefr(sc), level:lvl, pct:Math.round(Number(spk.percent)), source:'Rúbrica' };
  }
  const skills = isA2 ? { Reading, Listening, Speaking } : { Reading, Listening, Writing, Speaking };
  const present = Object.values(skills).filter(Boolean);
  const required = isA2 ? 3 : 4;
  const finalScale = present.length ? Math.round(present.reduce((s,x)=>s+x.scale,0)/present.length) : null;
  const labels = { Reading:'Reading', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' };
  return { profile, skills, isA2, finalScale, finalCefr:scaleToCefr(finalScale),
           complete: present.length===required, missing: Object.keys(skills).filter(k=>!skills[k]).map(k=>labels[k]) };
}
function _skillCellHtml(b){
  if(!b) return '';
  return `<b style="color:#2d5a8d">${b.cefr}</b> <span class="muted" style="font-size:.78rem">${b.scale} · ${b.pct}%</span>`;
}

/* ---- Speaking rubric (Cambridge analytical scales, 0–5 per descriptor) ---- */
const SPEAKING_SUBSCALE = {
  'Grammar and Vocabulary': band6(
    'Uses basic words and simple structures; frequent errors; vocabulary limited to familiar topics.',
    'Uses a range of everyday vocabulary and simple grammatical forms with some control; errors occur but meaning is clear.',
    'Uses a wide range of vocabulary and grammatical forms, including complex structures, with good control and precision.'),
  'Discourse Management': band6(
    'Produces very short, often isolated responses; long pauses; little development.',
    'Produces extended stretches of language with some hesitation; mostly relevant and coherent with some repetition.',
    'Produces extended, relevant and coherent discourse with very little hesitation; ideas are well developed and linked.'),
  'Pronunciation': band6(
    'Pronunciation is heavily influenced by L1; the listener must make significant effort to understand.',
    'Generally intelligible; some control of stress and intonation, though L1 influence is noticeable.',
    'Intelligible throughout; stress, rhythm and intonation are used effectively to support meaning.'),
  'Interactive Communication': band6(
    'Needs a lot of prompting and support to keep the interaction going.',
    'Initiates and responds appropriately, keeping the interaction going with some support.',
    'Interacts with ease, initiating and developing the exchange naturally and responding to the other speaker effectively.'),
  'Global Achievement': band6(
    'Manages only very simple exchanges on familiar topics with much effort.',
    'Handles the tasks at this level adequately, conveying meaning despite some limitations.',
    'Fully handles the demands of the tasks at this level with confidence and effectiveness.')
};
const SPEAKING_RUBRICS = {
  A2:{ bandMax:5, subs:['Grammar and Vocabulary','Pronunciation','Interactive Communication','Global Achievement'] },
  B1:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] },
  B2:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] },
  C1:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] }
};

async function cefrFinalPanel(){
  if($('#main')) $('#main').innerHTML = `<div class="center muted">Cargando…</div>`;
  const isTeacher = state.profile && state.profile.role==='teacher';
  const gradeList = isTeacher ? teacherAllowedGrades() : GRADES;
  const allowed = isTeacher ? gradeList.map(g=>g.id) : null;
  const { data:studentsRaw, error } = await sb.from('profiles')
    .select('id,full_name,section,cefr_level,grade_id,grades(name)').eq('role','student');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  let students = studentsRaw||[];
  if(allowed) students = students.filter(s=>allowed.includes(s.grade_id));
  const f = resultsFilter;
  if(f.grade)   students = students.filter(s=>String(s.grade_id)===String(f.grade));
  if(f.section) students = students.filter(s=>(s.section||'').toUpperCase()===f.section.toUpperCase());
  if(f.name)    students = students.filter(s=>(s.full_name||'').toLowerCase().includes(f.name.toLowerCase()));
  students.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));

  const ids = students.map(s=>s.id);
  const safeIds = ids.length?ids:['00000000-0000-0000-0000-000000000000'];
  const { data:atts } = await sb.from('exam_attempts')
    .select('id,student_id,skill,level,percent,mock,submitted_at').in('student_id', safeIds).limit(8000);
  const { data:spks } = await sb.from('speaking_results').select('*').in('student_id', safeIds);
  const aBy={}; (atts||[]).forEach(a=>{(aBy[a.student_id]=aBy[a.student_id]||[]).push(a);});
  const sBy={}; (spks||[]).forEach(s=>{ sBy[s.student_id]=s; });

  const rows = students.map(s=>{
    const at=aBy[s.id]||[]; const fin=_finalFromData(s, at, sBy[s.id]);
    const tgt=targetLevel(s);
    const wAtt=at.filter(a=>a.skill==='Writing').sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||''))[0];
    const wCell = fin.isA2 ? '<span class="muted" style="font-size:.78rem" title="En A2 Key el Writing va dentro de Reading &amp; Use of English">— en Reading</span>'
      : fin.skills.Writing ? _skillCellHtml(fin.skills.Writing)
      : (wAtt ? `<button class="btn sm ghost" onclick="gradeWriting('${wAtt.id}')">✍️ Calificar</button>`
              : '<span class="muted" style="font-size:.8rem">sin examen</span>');
    const spkLvl = (fin.skills.Speaking&&fin.skills.Speaking.level)||tgt||'';
    const sCell = fin.skills.Speaking
      ? `${_skillCellHtml(fin.skills.Speaking)} <button class="btn sm ghost" style="padding:2px 7px" onclick="speakingGrader('${s.id}','${spkLvl}')">✎</button>`
      : `<button class="btn sm ghost" onclick="speakingGrader('${s.id}','${spkLvl}')">🗣️ Calificar</button>`;
    const stt=targetStatus(fin.finalCefr, tgt);
    const sttChip = stt==='below' ? ` <span class="badge off" style="font-size:.66rem;background:#dc2626;color:#fff" title="Por debajo del objetivo ${tgt}">▼</span>`
      : stt==='above' ? ' <span class="badge on" style="font-size:.66rem" title="Sobre el objetivo">▲</span>'
      : stt==='meets' ? ' <span class="badge on" style="font-size:.66rem" title="Cumple el objetivo">✓</span>' : '';
    const finBadge = fin.finalScale!=null
      ? `<span class="badge lvl" style="font-size:.92rem">${fin.finalCefr} · ${fin.finalScale}</span>${sttChip}${fin.complete?'':' <span class="badge off" style="font-size:.66rem" title="Faltan: '+esc(fin.missing.join(', '))+'">prov.</span>'}`
      : '<span class="muted">—</span>';
    return `<tr>
      <td><b>${esc(s.full_name||'')}</b></td>
      <td><span class="badge grade">${esc(s.grades?.name||'—')}</span> ${s.section?esc(s.section):''}</td>
      <td><span class="badge lvl" style="opacity:.8">${tgt||'—'}</span></td>
      <td>${_skillCellHtml(fin.skills.Reading)||'<span class="muted">—</span>'}</td>
      <td>${_skillCellHtml(fin.skills.Listening)||'<span class="muted">—</span>'}</td>
      <td>${wCell}</td>
      <td style="white-space:nowrap">${sCell}</td>
      <td>${finBadge}</td>
      <td><button class="btn sm" onclick="studentReportPDF('${s.id}')">📄 PDF</button></td>
    </tr>`;
  }).join('');

  $('#main').innerHTML = `
    <h1 style="margin:0 0 4px">🎓 Resultado final · CEFR</h1>
    <p class="muted" style="margin-top:0;font-size:.88rem">Mejor resultado por destreza convertido a la <b>Escala Cambridge</b> (A2 100–150 · B1 120–170 · B2 140–190 · C1 160–210). El <b>final</b> es el promedio de las destrezas evaluadas (se toma el mejor intento <b>aprobado ≥50%</b>; si ninguno aprueba, el de mayor %). <b>Writing</b> y <b>Speaking</b> se califican con la rúbrica Cambridge (0–5 por descriptor). En <b>A2</b> el Writing va dentro de Reading &amp; Use of English (examen A2 Key), así que no cuenta como destreza aparte. <b>Objetivo</b> = nivel al que apunta el grado; <span class="badge off" style="font-size:.66rem;background:#dc2626;color:#fff">▼</span> = por debajo del objetivo, <span class="badge on" style="font-size:.66rem">✓</span> = lo cumple. <span class="badge off" style="font-size:.66rem">prov.</span> = aún faltan destrezas.</p>
    ${resultsFilterBar(gradeList,'window._setFinalFilter')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Objetivo</th><th>Reading &amp; UoE</th><th>Listening</th><th>Writing</th><th>Speaking</th><th>Final CEFR</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="9" class="center muted">Sin alumnos para este filtro.</td></tr>`}</tbody>
    </table><div class="muted" style="padding:8px 14px;font-size:.82rem">${students.length} alumno(s)</div></div>`;
}
window.cefrFinalPanel = cefrFinalPanel;
window._setFinalFilter = (k,v)=>{
  if(k==='_clear') resultsFilter={grade:'',section:'',name:'',dateFrom:'',dateTo:''};
  else resultsFilter[k]=v;
  cefrFinalPanel();
};

/* ---- Speaking grader (rubric, mirrors writing grader) ---- */
let speakingState=null;
function speakingRubric(){ return SPEAKING_RUBRICS[speakingState.level] || SPEAKING_RUBRICS.B1; }
window.speakingGrader = async (studentId, level)=>{
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,grade_id,cefr_level,grades(name)').eq('id',studentId).single();
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const { data:prev } = await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle();
  const lvl = level || (prev&&prev.level) || targetLevel(p) || 'B1';
  const sel = {};
  if(prev && prev.breakdown && Array.isArray(prev.breakdown.parts)) prev.breakdown.parts.forEach(pp=>{ sel[pp.part]=pp.correct; });
  speakingState = { studentId, profile:p, level:lvl, sel, msg:(prev&&prev.comment)||'' };
  renderSpeakingGrader();
};
function renderSpeakingGrader(){
  const r=speakingRubric(), sel=speakingState.sel, p=speakingState.profile;
  const max=r.subs.length*r.bandMax;
  let total=0, all=true; r.subs.forEach(s=>{ if(sel[s]!=null) total+=sel[s]; else all=false; });
  const pct=Math.round(total/max*100);
  const subsHtml=r.subs.map((s,si)=>{
    const desc=SPEAKING_SUBSCALE[s]||[];
    const cards=desc.map((d,band)=>{
      const on=sel[s]===band;
      return `<div onclick="window._pickSpeak(${si},${band})" style="cursor:pointer;border:2px solid ${on?'#4987c6':'var(--line)'};background:${on?'#eef4fb':'#fff'};border-radius:8px;padding:8px 10px;margin:4px 0;display:flex;gap:10px;align-items:flex-start">
        <span style="flex:0 0 auto;font-weight:700;color:${on?'#2d5a8d':'#94a3b8'};min-width:46px">Band ${band}</span>
        <span style="font-size:.88rem">${esc(d)}</span></div>`;
    }).join('');
    return `<div class="card" style="margin-bottom:6px"><h3 style="margin:0 0 6px">${esc(s)} <span class="muted" style="font-weight:400">/ ${r.bandMax}</span> <b style="float:right;color:#2d5a8d">${sel[s]!=null?sel[s]:'—'}</b></h3>${cards}</div>`;
  }).join('');
  const lvlSel=LEVELS.map(l=>`<option ${speakingState.level===l?'selected':''}>${l}</option>`).join('');
  $('#main').innerHTML=`
    <button class="btn sm ghost" onclick="cefrFinalPanel()">← Volver al resultado final</button>
    <h1 style="margin:.4rem 0 0">🗣️ Calificar Speaking</h1>
    <div class="muted" style="margin-bottom:10px">${esc(p.full_name||'Alumno')} · ${esc(p.grades?.name||'')}</div>
    <div class="note">Elige el descriptor que corresponde en cada criterio (escalas analíticas de Cambridge Speaking, 0–${r.bandMax}). La nota se calcula sola. El nivel define los criterios.</div>
    <div class="row" style="gap:10px;align-items:center;margin:10px 0">
      <label style="font-weight:700">Nivel del examen</label>
      <select onchange="window._setSpeakLevel(this.value)" style="min-width:90px">${lvlSel}</select>
    </div>
    ${subsHtml}
    <div class="card" style="position:sticky;bottom:0">
      <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <h2 style="margin:0">Total</h2>
        <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span>${total}</span> / ${max} · <span>${pct}</span>%</div>
      </div>
      <label style="margin-top:10px;display:block">Comentario para el alumno (opcional)</label>
      <textarea id="sp-msg" rows="4" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px" oninput="speakingState.msg=this.value">${esc(speakingState.msg||'')}</textarea>
      <div id="sp-status" style="margin-top:6px;font-size:.88rem"></div>
      <div class="row" style="margin-top:10px;gap:10px">
        <button class="btn" onclick="window._saveSpeaking()">💾 Guardar Speaking</button>
      </div>
    </div>`;
}
window._pickSpeak = (si,band)=>{ const s=speakingRubric().subs[si]; speakingState.sel[s]=band; const y=window.scrollY; renderSpeakingGrader(); window.scrollTo(0,y); };
window._setSpeakLevel = (v)=>{ speakingState.level=v; speakingState.sel={}; renderSpeakingGrader(); };
window._saveSpeaking = async ()=>{
  const r=speakingRubric(), sel=speakingState.sel, st=$('#sp-status');
  let total=0, all=true; r.subs.forEach(s=>{ if(sel[s]!=null) total+=sel[s]; else all=false; });
  if(!all){ st.innerHTML='<span style="color:var(--bad)">Marca un Band en cada criterio antes de guardar.</span>'; return; }
  const max=r.subs.length*r.bandMax, pct=Math.round(total/max*100);
  const breakdown={ kind:'speaking-graded', parts:r.subs.map(s=>({part:s, correct:sel[s], total:r.bandMax})) };
  st.textContent='Guardando…';
  const { error } = await sb.rpc('upsert_speaking', {
    p_student:speakingState.studentId, p_level:speakingState.level, p_score:total, p_total:max,
    p_percent:pct, p_breakdown:breakdown, p_comment:(speakingState.msg||'').trim()||null });
  if(error){ st.innerHTML=`<span style="color:var(--bad)">No se pudo guardar: ${esc(error.message)}</span>`; return; }
  cefrFinalPanel();
};

/* ---- PDF report (lazy-load html2pdf, mirrors ensureChart) ---- */
let _h2pLib=null;
function ensureHtml2pdf(){
  if(window.html2pdf) return Promise.resolve();
  if(_h2pLib) return _h2pLib;
  _h2pLib=new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('No se pudo cargar html2pdf (conexión).'));
    document.head.appendChild(s);
  });
  return _h2pLib;
}
/* Inline SVG of the Cambridge English Scale / CEFR with a "you are here" marker. */
function cefrScaleSVG(scale, cefr){
  const W=720,H=560,topY=46,botY=512,minV=80,maxV=230;
  const yOf=v=>topY+(maxV-Math.max(minV,Math.min(maxV,v)))/(maxV-minV)*(botY-topY);
  const bands=[{cefr:'C2',lo:200,hi:230,c:'#5a2d82'},{cefr:'C1',lo:180,hi:200,c:'#7c6fd2'},
    {cefr:'B2',lo:160,hi:180,c:'#2d5a8d'},{cefr:'B1',lo:140,hi:160,c:'#4987c6'},
    {cefr:'A2',lo:120,hi:140,c:'#76cbe5'},{cefr:'A1',lo:100,hi:120,c:'#aebfd0'}];
  const quals=[{name:'A2 Key',lo:100,hi:150,c:'#76cbe5'},{name:'B1 Prelim.',lo:120,hi:170,c:'#4987c6'},
    {name:'B2 First',lo:140,hi:190,c:'#2d5a8d'},{name:'C1 Adv.',lo:160,hi:210,c:'#7c6fd2'},
    {name:'C2 Prof.',lo:180,hi:230,c:'#5a2d82'}];
  const bandX=64,bandW=92;
  const bandRects=bands.map(b=>{const y=yOf(b.hi),h=yOf(b.lo)-yOf(b.hi);
    return `<rect x="${bandX}" y="${y}" width="${bandW}" height="${h}" fill="${b.c}" opacity="0.92"/><text x="${bandX+bandW/2}" y="${y+h/2+5}" text-anchor="middle" fill="#fff" font-weight="800" font-size="15">${b.cefr}</text>`;}).join('');
  const qBaseX=200,qW=64,qGap=22;
  const qBars=quals.map((q,i)=>{const x=qBaseX+i*(qW+qGap),y=yOf(q.hi),h=yOf(q.lo)-yOf(q.hi);
    return `<rect x="${x}" y="${y}" width="${qW}" height="${h}" rx="5" fill="${q.c}" opacity="0.85"/><text x="${x+qW/2}" y="${y-6}" text-anchor="middle" font-size="10" fill="#334155" font-weight="700">${q.name}</text>`;}).join('');
  const axisX=W-44; let ticks=`<line x1="${axisX}" y1="${yOf(230)}" x2="${axisX}" y2="${yOf(80)}" stroke="#cbd5e1"/>`;
  for(let v=80;v<=230;v+=10){const y=yOf(v);ticks+=`<line x1="${axisX-6}" y1="${y}" x2="${axisX}" y2="${y}" stroke="#94a3b8"/><text x="${axisX+5}" y="${y+4}" font-size="10" fill="#64748b">${v}</text>`;}
  let marker='';
  if(scale!=null){ const y=yOf(scale); const lblY=Math.max(topY+12, Math.min(botY-6, y));
    marker=`<line x1="${bandX-12}" y1="${y}" x2="${axisX}" y2="${y}" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/><circle cx="${axisX}" cy="${y}" r="6" fill="#dc2626"/><rect x="${qBaseX+95}" y="${lblY-32}" width="234" height="24" rx="6" fill="#dc2626"/><text x="${qBaseX+212}" y="${lblY-15}" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">● Tú estás aquí · ${cefr} · ${scale}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Montserrat,system-ui,sans-serif">
    <text x="${bandX+bandW/2}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">CEFR</text>
    <text x="${qBaseX+(quals.length*(qW+qGap))/2-qGap/2}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Cambridge English Qualifications</text>
    <text x="${axisX}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Escala</text>
    ${bandRects}${qBars}${ticks}${marker}</svg>`;
}
window.studentReportPDF = async (studentId)=>{
  try{ await ensureHtml2pdf(); }catch(e){ alert(e.message); return; }
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',studentId).single();
  if(error){ alert('No se pudo cargar el alumno: '+error.message); return; }
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,mock,submitted_at').eq('student_id',studentId);
  const { data:sp } = await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle();
  const fin=_finalFromData(p, at||[], sp);
  const tgt=targetLevel(p); const stt=targetStatus(fin.finalCefr, tgt);
  const sttTxt = stt==='below' ? `▼ Por debajo del objetivo (${tgt})` : stt==='above' ? `▲ Por encima del objetivo (${tgt})` : stt==='meets' ? `✓ Cumple el objetivo (${tgt})` : '';
  const sttColor = stt==='below' ? '#fca5a5' : '#86efac';
  const cell='padding:8px;border:1px solid #e2e8f0;text-align:center';
  const row=(label,b)=>`<tr><td style="padding:8px;border:1px solid #e2e8f0"><b>${label}</b></td>
    <td style="${cell}">${b?b.level:'—'}</td>
    <td style="${cell}">${b?(b.pct!=null?b.pct+'%':'—'):'<span style="color:#b45309">Pendiente</span>'}</td>
    <td style="${cell};color:#2d5a8d;font-weight:700">${b?b.cefr:'—'}</td>
    <td style="${cell}">${b?b.scale:'—'}</td></tr>`;
  const node=document.createElement('div');
  node.style.cssText='width:760px;padding:24px;font-family:Montserrat,system-ui,sans-serif;color:#0f172a;background:#fff';
  node.innerHTML=`
    <div style="text-align:center;border-bottom:3px solid #4987c6;padding-bottom:10px;margin-bottom:14px">
      <img src="assets/logo-h.svg" style="height:46px"><div style="letter-spacing:1px;color:#64748b;font-size:.78rem;margin-top:4px">REPORTE DE RESULTADO FINAL · MARCO COMÚN EUROPEO (CEFR)</div></div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:.92rem">
      <tr><td style="padding:4px"><b>Alumno:</b> ${esc(p.full_name||'')}</td><td style="padding:4px"><b>Grado:</b> ${esc(p.grades?.name||'')} ${esc(p.section||'')}</td></tr>
      <tr><td style="padding:4px"><b>Nivel objetivo:</b> ${esc(tgt||'—')}</td><td style="padding:4px"><b>Fecha:</b> ${new Date().toLocaleDateString('es-PE')}</td></tr>
    </table>
    <table style="width:100%;border-collapse:collapse;font-size:.9rem;margin-bottom:14px">
      <thead><tr style="background:#eef4fb"><th style="${cell};text-align:left">Destreza</th><th style="${cell}">Nivel examen</th><th style="${cell}">Resultado</th><th style="${cell}">CEFR</th><th style="${cell}">Escala</th></tr></thead>
      <tbody>${row('Reading &amp; Use of English'+(fin.isA2?' (incluye Writing)':''),fin.skills.Reading)}${row('Listening',fin.skills.Listening)}${fin.isA2?`<tr><td style="padding:8px;border:1px solid #e2e8f0"><b>Writing</b></td><td colspan="4" style="${cell};text-align:left;color:#64748b">Incluido en Reading &amp; Use of English (examen A2 Key)</td></tr>`:row('Writing',fin.skills.Writing)}${row('Speaking',fin.skills.Speaking)}</tbody>
    </table>
    <div style="display:flex;gap:16px;align-items:center;background:#0f2741;color:#fff;border-radius:12px;padding:14px 18px;margin-bottom:14px">
      <div><div style="font-size:.78rem;opacity:.8">RESULTADO FINAL</div><div style="font-size:2.4rem;font-weight:800;line-height:1">${fin.finalCefr}</div></div>
      <div style="border-left:1px solid rgba(255,255,255,.3);padding-left:16px"><div style="font-size:.78rem;opacity:.8">ESCALA CAMBRIDGE</div><div style="font-size:1.8rem;font-weight:700">${fin.finalScale!=null?fin.finalScale:'—'}</div></div>
      <div style="margin-left:auto;text-align:right;max-width:240px">
        ${sttTxt?`<div style="font-size:.85rem;font-weight:700;color:${sttColor}">${sttTxt}</div>`:''}
        ${fin.complete?'':`<div style="font-size:.74rem;opacity:.9;margin-top:4px">⚠ Resultado provisional. Faltan: ${esc(fin.missing.join(', '))}.</div>`}
      </div>
    </div>
    <div style="text-align:center;font-size:.76rem;color:#64748b;margin-bottom:4px">Posición del alumno en la Escala Cambridge English / CEFR</div>
    ${cefrScaleSVG(fin.finalScale, fin.finalCefr)}
    <p style="font-size:.7rem;color:#94a3b8;margin-top:12px">Cálculo: por cada destreza se toma el mejor resultado y se convierte a la Escala Cambridge (A2 100–150 · B1 120–170 · B2 140–190 · C1 160–210); el resultado final es el promedio de las destrezas evaluadas. Nordic International School of Lima.</p>`;
  // El nodo se renderiza dentro de un contenedor 0x0 con overflow:hidden: queda
  // invisible para el usuario pero EN FLUJO NORMAL, para que html2pdf pueda medir
  // su altura. Un nodo en position:fixed/absolute fuera de pantalla produce un
  // canvas de altura 0 -> PDF en blanco (bug corregido).
  const host=document.createElement('div');
  host.style.cssText='position:absolute;left:0;top:0;width:0;height:0;overflow:hidden;z-index:-1';
  host.appendChild(node);
  document.body.appendChild(host);
  // Esperar a que el logo (y cualquier imagen) carguen antes de rasterizar.
  await Promise.all(Array.from(node.querySelectorAll('img')).map(im=>im.complete?Promise.resolve():new Promise(r=>{im.onload=im.onerror=r;})));
  const opt={ margin:8, filename:`NIS-Resultado-${(p.full_name||'alumno').replace(/\s+/g,'_')}.pdf`,
    image:{type:'jpeg',quality:0.96}, html2canvas:{scale:2,useCORS:true,backgroundColor:'#ffffff'},
    jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}, pagebreak:{mode:['css','legacy']} };
  try{ await window.html2pdf().set(opt).from(node).save(); }
  catch(e){ alert('No se pudo generar el PDF: '+(e&&e.message||e)); }
  finally{ host.remove(); }
};
