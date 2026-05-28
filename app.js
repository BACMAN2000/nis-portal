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
  const r = state.profile.role;
  if(r==='admin') return renderAdmin();
  if(r==='teacher') return renderTeacher();
  // Students go straight to the quizzes menu (same origin → shared session),
  // UNLESS they explicitly asked to see their progress panel (?me=1).
  if(r==='student'){
    const wantsProgress = new URLSearchParams(location.search).get('me')==='1';
    if(wantsProgress) return renderStudent();
    const dest = location.origin + '/mocks-cambridge/quizzes.html';
    if(location.href !== dest){ window.location.replace(dest); }
    return;
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
    <nav class="sidebar">${navItems.map(n=>`<div class="nav-item ${n.key===activeKey?'active':''}" data-nav="${n.key}">${n.label}</div>`).join('')}</nav>
    <main class="main" id="main">${body}</main>
  </div>`;
}
function bindNav(handler){ document.querySelectorAll('[data-nav]').forEach(e=>e.onclick=()=>handler(e.dataset.nav)); }

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
    const fe=$('#li_email'); if(fe) fe.focus();
  } else {
    $('#toLogin').onclick=()=>renderAuth('login');
    $('#signupBtn').onclick=doSignup;
    // Enter key submits the signup form (from any field)
    document.querySelectorAll('#form input').forEach(el=>{ el.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); doSignup(); } }); });
  }
}
function loginForm(){
  return `<label>Correo</label><input id="li_email" type="email" placeholder="tucorreo@nordic-school.edu.pe">
    <label>Contraseña</label><input id="li_pw" type="password" placeholder="••••••••">
    <div style="margin-top:16px"><button class="btn" id="loginBtn" style="width:100%">Ingresar</button></div>`;
}
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

/* ===================== ADMIN ===================== */
async function renderAdmin(tab='users'){
  document.body.innerHTML = shell([
    {key:'overview',label:'📊 Resumen'},
    {key:'users',label:'👥 Alumnos'},
    {key:'results',label:'📝 Resultados'},
    {key:'teachers',label:'👨‍🏫 Profesores'},
    {key:'mocks',label:'🔓 Mocks'},
  ], tab, `<div class="center muted">Cargando…</div>`);
  bindNav(renderAdmin);
  if(tab==='overview') return adminOverview();
  if(tab==='results') return adminResults();
  if(tab==='teachers') return adminTeachers();
  if(tab==='mocks') return adminMocks();
  return adminUsers();
}
async function adminOverview(){
  const { data:profs } = await sb.from('profiles').select('role,grade_id,cefr_level');
  const { count:att } = await sb.from('exam_attempts').select('*',{count:'exact',head:true});
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
    </div>`;
}
async function adminTeachers(){
  const { data:profs, error } = await sb.from('profiles').select('id, full_name, email, grades(name)').eq('role','teacher').order('full_name');
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
    return `<div class="card" data-tid="${t.id}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <h2 style="margin:0;font-size:1.1rem">${esc(t.full_name||t.email)}</h2>
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
      <div class="row" style="margin-top:12px;align-items:center;gap:10px"><button class="btn sm" onclick="window._saveTeacher('${t.id}', this)">Guardar</button><span class="tmsg muted" style="font-size:.85rem"></span></div>
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
  const fg=userFilter.grade, fy=userFilter.year;
  const list = all.filter(p=> (!fg||String(p.grade_id)===String(fg)) && (!fy||String(p.academic_year||2026)===String(fy)) );
  const gradeOpts = `<option value="">Todos los grados</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(fg)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const yearOpts = `<option value="">Todos los años</option>`+years.map(y=>`<option value="${y}" ${String(fy)===String(y)?'selected':''}>${y}</option>`).join('');
  const rows=list.map(p=>`<tr data-id="${p.id}">
      <td><b>${esc(p.full_name||((p.first_name||'')+' '+(p.last_name||'')))}</b><div class="muted" style="font-size:.8rem">${esc(p.email||'')}</div></td>
      <td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td>
      <td>${p.academic_year||2026}</td>
      <td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td>
      <td><span class="badge ${p.role==='student'?'':'on'}">${esc(p.role)}</span></td>
      <td class="pwcell"><span class="pw" data-pw="•••••••">•••••••</span> <button class="eye" title="Ver/ocultar" onclick="togglePw('${p.id}',this)">👁</button></td>
      <td><span class="badge ${p.active?'on':'off'}">${p.active?'Activo':'Inactivo'}</span></td>
      <td><button class="btn sm ghost" onclick="editUser('${p.id}')">Editar</button></td>
    </tr>`).join('');
  $('#main').innerHTML=`<div class="row" style="justify-content:space-between;align-items:center"><h1>Alumnos</h1>
      <button class="btn sm" onclick="adminNewUser()">+ Nuevo</button></div>
    <div class="card" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
      <div><label>Grado</label><select onchange="window._setUserFilter('grade',this.value)" style="min-width:170px">${gradeOpts}</select></div>
      <div><label>Año académico</label><select onchange="window._setUserFilter('year',this.value)" style="min-width:150px">${yearOpts}</select></div>
      <div class="muted" style="padding-bottom:11px">${list.length} alumno(s)</div>
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
  const rows = list.map(a=>`<tr>
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:'<span class="muted">— (revisión)</span>'}</td>
    <td>${a.duration_min!=null?a.duration_min+' min':'—'}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-calificar':'Calificar'}</button>`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">Ver análisis →</button>`}</td>
  </tr>`).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Resultados</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Exportar Excel</button>
    </div>
    ${resultsFilterBar(GRADES,'window._setResFilter')}${tabs}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Sección</th><th>Examen</th><th>Puntaje</th><th>Tiempo</th><th>Fecha</th><th></th></tr></thead>
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
  if(acc.can_students) nav.push({key:'students',label:'👥 Alumnos'});
  if(!nav.length) nav.push({key:'none',label:'— sin accesos —'});
  nav.push({key:'exams',label:'🎧 Exámenes'});
  const active = (tab && nav.some(n=>n.key===tab)) ? tab : nav[0].key;
  document.body.innerHTML = shell(nav, active, `<div class="center muted">Cargando…</div>`);
  bindNav(renderTeacher);
  if(active==='results') return teacherResults();
  if(active==='students') return teacherStudents();
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
  const rows=list.map(a=>`<tr>
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:'<span class="muted">— (revisión)</span>'}</td>
    <td>${a.duration_min!=null?a.duration_min+' min':'—'}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-calificar':'Calificar'}</button>`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">Ver análisis →</button>`}</td></tr>`).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Resultados</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Exportar Excel</button>
    </div>
    ${resultsFilterBar(teacherAllowedGrades(),'window._setResFilter')}${tabs}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Sección</th><th>Examen</th><th>Puntaje</th><th>Tiempo</th><th>Fecha</th><th></th></tr></thead>
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
const WRITING_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzwn09Be0ZfKxGpwgkjLdp7nIs7awq8h7SVKkMlWN4EjekkOFqpLmnChzGHN_bB6kN-/exec';
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
  renderGradeWriting();
};
window._sendWritingResult = async ()=>{
  const st=$('#gw-status');
  if(!gradeState.complete){ st.innerHTML='<span style="color:var(--bad)">Selecciona un Band en cada criterio de ambas partes antes de enviar.</span>'; return; }
  const a=gradeState.attempt; const msg=($('#gw-msg').value||'').trim();
  const rubric=gradeState.rubric;
  const breakdown={
    kind:'writing-graded',
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
  // ── FIX: wrap RPC in try/catch + timeout so it never freezes on "Guardando…" ──
  let rpcErr = null;
  try {
    const rpcPromise = sb.rpc('grade_writing',{ p_attempt:a.id, p_score:gradeState.total, p_total:gradeState.max, p_percent:gradeState.pct, p_breakdown:breakdown });
    const timeout = new Promise((_,rej)=>setTimeout(()=>rej(new Error('Tiempo de espera agotado — intenta de nuevo.')),12000));
    const { error } = await Promise.race([rpcPromise, timeout]);
    rpcErr = error || null;
  } catch(e){ rpcErr = e; }
  if(rpcErr){ $('#gw-send').disabled=false; st.innerHTML=`<span style="color:var(--bad)">No se pudo guardar: ${esc(rpcErr.message||String(rpcErr))}</span>`; return; }
  // Fire-and-forget webhook (Apps Script emails the student)
  try{
    fetch(WRITING_WEBHOOK,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify({ type:'writing_result', studentEmail:a.profiles?.email||'', studentName:a.profiles?.full_name||'',
        firstName:(a.profiles?.full_name||'').split(' ')[0], grade:a.profiles?.grades?.name||'', level:a.level,
        examTitle:'Writing '+(mockLabel(a)), score:gradeState.total, total:gradeState.max, percent:gradeState.pct,
        task1Score:gradeState.t1, task1Total:rubric.subs.length*rubric.bandMax,
        task2Score:gradeState.t2, task2Total:rubric.subs.length*rubric.bandMax,
        message:msg, teacherEmail:'pbaca@nordic-school.edu.pe', teacherName:breakdown.gradedBy, schoolName:'Nordic International School of Lima' }) });
  }catch(e){}
  st.innerHTML='<span style="color:var(--good)">✓ Resultado guardado y enviado al alumno.</span>';
  setTimeout(teacherResults, 1200);
};

/* ===================== STUDENT ===================== */
async function renderStudent(){
  document.body.innerHTML = shell([
    {key:'home',label:'🏠 Mi avance'},
    {key:'exams',label:'🎓 Rendir examen'},
  ],'home',`<div class="center muted">Cargando…</div>`);
  bindNav(k=> k==='exams'?studentExams():studentHome());
  studentHome();
}
async function studentHome(){
  document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='home'));
  const p=state.profile;
  const { data:atts } = await sb.from('exam_attempts').select('*').eq('student_id',p.id).order('submitted_at',{ascending:false});
  const bySkill = SKILLS.map(sk=>{
    const a=(atts||[]).filter(x=>x.skill===sk);
    const scored=a.filter(x=>x.percent!=null);              // Writing is not auto-scored
    const best=scored.length?Math.max(...scored.map(x=>+x.percent)):null;
    const avg=scored.length?Math.round(scored.reduce((s,x)=>s+(+x.percent),0)/scored.length):null;
    return {sk,n:a.length,best,avg};
  });
  $('#main').innerHTML=`<h1>Hola, ${esc(p.first_name||p.full_name||'')} 👋</h1>
    <p class="muted">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''} · Nivel ${esc(p.cefr_level||'sin asignar')}</p>
    <div class="grid cols-3">
      ${bySkill.map(s=>`<div class="stat"><div class="l">${s.sk}</div>
        <div class="n">${s.best!=null?s.best+'%':'—'}</div>
        <div class="muted" style="font-size:.8rem">${s.n} intento(s)${s.avg!=null?' · prom '+s.avg+'%':''}</div></div>`).join('')}
    </div>
    <div class="card"><h2>Proyección</h2>${projection(p,bySkill,atts||[])}</div>
    <div class="card"><h2>Historial</h2>
      ${(atts&&atts.length)? `<table><thead><tr><th>Examen</th><th>Puntaje</th><th>Fecha</th></tr></thead><tbody>${
        atts.map(a=>{
          const lbl=`${esc(a.skill)} · ${esc(a.level)} · ${mockLabel(a)}`;
          const score = a.percent!=null ? `${a.score}/${a.total} (${a.percent}%)`
            : (a.skill==='Writing' ? '<span class="muted">Pendiente de calificación</span>' : '—');
          const msg = (a.breakdown&&a.breakdown.teacherMessage)
            ? `<tr><td colspan="3" style="background:#f7faff;font-size:.9rem">📣 <b>Profesor:</b> ${esc(a.breakdown.teacherMessage)}</td></tr>` : '';
          return `<tr><td>${lbl}</td><td>${score}</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td></tr>${msg}`;
        }).join('')
      }</tbody></table>` : `<p class="muted">Aún no has rendido exámenes. Ve a “Rendir examen”.</p>`}
    </div>`;
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
  return `<div class="proj"><div style="font-size:1.1rem;margin-bottom:6px">Promedio general: <b>${overall}%</b></div>
    <div class="note ${cls}" style="margin:8px 0">${verdict}</div>
    <div class="muted">Destreza a reforzar: <b>${weak.sk}</b> (${weak.avg}%).</div></div>`;
}
async function studentExams(){
  document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='exams'));
  const ICON={Listening:'🎧',Reading:'📖',Writing:'✍️'};
  const FILE={Reading:'reading-quiz.html',Listening:'listening-quiz.html',Writing:'writing-quiz.html'};
  const order=['Listening','Reading','Writing'];
  $('#main').innerHTML=`<h1>Rendir examen</h1><p class="muted">Cargando tu progreso…</p>`;
  const { data:atts } = await sb.from('exam_attempts').select('skill').eq('student_id', state.profile.id);
  const done = new Set((atts||[]).map(a=>a.skill));
  const next = order.find(s=>!done.has(s));
  const cards = order.map(s=>{
    const isDone = done.has(s), isNext = s===next;
    const status = isDone ? `<div class="badge on" style="margin-top:8px">✓ Completado</div>`
                  : isNext ? `<div class="badge" style="background:var(--blue);color:#fff;margin-top:8px">▶ Empieza aquí</div>`
                  : `<div class="badge" style="background:var(--lila);color:var(--blue-dd);margin-top:8px">Pendiente</div>`;
    const ring = isNext ? 'box-shadow:0 0 0 3px var(--blue), var(--shadow);' : '';
    return `<a class="card center" href="${QUIZ_URL}${FILE[s]}" style="text-decoration:none;color:inherit;display:block;padding:30px 18px;${ring}transition:.15s" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
        <div style="font-size:3.6rem;line-height:1;${isDone?'':'filter:none'}">${ICON[s]}</div>
        <h2 style="margin:10px 0 2px;color:var(--blue-d)">${s}</h2>
        <div class="muted" style="font-size:.85rem">MOCK 1 y MOCK 2 · A2–C1</div>
        ${status}
      </a>`;
  }).join('');
  const allDone = order.every(s=>done.has(s));
  $('#main').innerHTML=`<h1>Rendir examen</h1>
    <p class="muted" style="margin-top:-6px">Recorrido sugerido: <b>Listening → Reading → Writing</b>. No necesitas volver a poner tus datos; al entrar eliges el nivel (A2 · B1 · B2 · C1) y tu resultado se guarda solo. Al terminar, vuelve al portal para la siguiente.</p>
    ${allDone?`<div class="note ok">🎉 ¡Completaste las tres destrezas! Puedes repetir cualquiera o revisar tu avance.</div>`:''}
    <div class="grid cols-3" style="margin-top:12px">${cards}</div>`;
}
