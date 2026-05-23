/* ===================== Portal NIS ===================== */
const CFG = window.NIS_CONFIG;
const sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY);
const $ = (s, r=document) => r.querySelector(s);
const app = $('#app');
const esc = s => (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const GRADES = Array.from({length:11},(_,i)=>({id:i+1,name:'G'+(i+1)}));
const LEVELS = ['A2','B1','B2','C1'];
const SKILLS = ['Reading','Listening','Writing'];
const QUIZ_URL = 'https://bacman2000.github.io/mocks-cambridge/';

let state = { session:null, profile:null };

/* ---------- boot ---------- */
init();
async function init(){
  const { data } = await sb.auth.getSession();
  state.session = data.session;
  if(state.session){ await loadProfile(); }
  route();
  sb.auth.onAuthStateChange(async (_e, session)=>{
    state.session = session;
    if(session){ await loadProfile(); } else { state.profile=null; }
    route();
  });
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
  } else {
    $('#toLogin').onclick=()=>renderAuth('login');
    $('#signupBtn').onclick=doSignup;
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
  ], tab, `<div class="center muted">Cargando…</div>`);
  bindNav(renderAdmin);
  if(tab==='overview') return adminOverview();
  if(tab==='results') return adminResults();
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
async function adminUsers(){
  const { data:profs, error } = await sb.from('profiles').select('*, grades(name)').order('created_at',{ascending:false});
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const rows=(profs||[]).map(p=>`<tr data-id="${p.id}">
      <td><b>${esc(p.full_name||((p.first_name||'')+' '+(p.last_name||'')))}</b><div class="muted" style="font-size:.8rem">${esc(p.email||'')}</div></td>
      <td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td>
      <td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td>
      <td><span class="badge ${p.role==='student'?'':'on'}">${esc(p.role)}</span></td>
      <td class="pwcell"><span class="pw" data-pw="•••••••">•••••••</span> <button class="eye" title="Ver/ocultar" onclick="togglePw('${p.id}',this)">👁</button></td>
      <td><span class="badge ${p.active?'on':'off'}">${p.active?'Activo':'Inactivo'}</span></td>
      <td><button class="btn sm ghost" onclick="editUser('${p.id}')">Editar</button></td>
    </tr>`).join('');
  $('#main').innerHTML=`<div class="row" style="justify-content:space-between"><h1>Alumnos</h1>
      <button class="btn sm" onclick="adminNewUser()">+ Nuevo</button></div>
    <div class="card" style="padding:0;overflow-x:auto">
      <table><thead><tr><th>Nombre</th><th>Grado</th><th>Nivel</th><th>Rol</th><th>Contraseña</th><th>Estado</th><th></th></tr></thead>
      <tbody>${rows||'<tr><td colspan="7" class="center muted">Aún no hay usuarios. Cuando un alumno se registre aparecerá aquí.</td></tr>'}</tbody></table>
    </div>`;
}
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
    grade_id:$('#n_grade').value||null, section:v('n_section')||null, cefr_level:$('#n_level').value||null};
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
      <label>Estado</label><select id="e_active"><option value="true" ${p.active?'selected':''}>Activo</option><option value="false" ${!p.active?'selected':''}>Inactivo</option></select>
      <label>Reestablecer contraseña visible (opcional)</label><input id="e_pw" placeholder="dejar vacío para no cambiar">
      <div id="emsg"></div>
      <div class="row" style="margin-top:14px"><button class="btn" onclick="saveUser('${id}')">Guardar</button></div>
    </div>`;
};
window.saveUser = async (id)=>{
  const upd={ grade_id:+$('#e_grade').value, section:$('#e_section').value.trim()||null,
    cefr_level:$('#e_level').value||null, role:$('#e_role').value, active:$('#e_active').value==='true' };
  const { error } = await sb.from('profiles').update(upd).eq('id',id);
  const pw=$('#e_pw').value.trim();
  if(pw){ await sb.from('student_credentials').upsert({profile_id:id,password:pw,updated_at:new Date().toISOString()}); }
  $('#emsg').innerHTML = error?`<div class="note err">${esc(error.message)}</div>`:`<div class="note ok">Guardado.</div>`;
  if(!error) setTimeout(adminUsers,700);
};
async function adminResults(){
  const { data } = await sb.from('exam_attempts').select('*, profiles(full_name,grades(name))').order('submitted_at',{ascending:false}).limit(100);
  const rows=(data||[]).map(a=>`<tr><td>${esc(a.profiles?.full_name||'')}</td><td>${esc(a.profiles?.grades?.name||'')}</td>
    <td>${esc(a.skill)} · ${esc(a.level)} · ${a.mock==='mock2'?'MOCK 2':'MOCK 1'}</td>
    <td>${a.score}/${a.total} (${a.percent}%)</td><td class="muted">${new Date(a.submitted_at).toLocaleString()}</td></tr>`).join('');
  $('#main').innerHTML=`<h1>Resultados</h1><div class="card" style="padding:0;overflow-x:auto">
    <table><thead><tr><th>Alumno</th><th>Grado</th><th>Examen</th><th>Puntaje</th><th>Fecha</th></tr></thead>
    <tbody>${rows||'<tr><td colspan="5" class="center muted">Aún no hay resultados. Aparecerán cuando los alumnos rindan los exámenes integrados.</td></tr>'}</tbody></table></div>`;
}

/* ===================== TEACHER ===================== */
async function renderTeacher(){
  document.body.innerHTML = shell([{key:'g',label:'👥 Mi grado'}],'g',`<div class="center muted">Cargando…</div>`);
  const { data } = await sb.from('profiles').select('*, grades(name)').eq('role','student');
  const rows=(data||[]).map(p=>`<tr><td>${esc(p.full_name||p.email)}</td><td>${esc(p.grades?.name||'')}</td><td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td></tr>`).join('');
  $('#main').innerHTML=`<h1>Mis alumnos</h1><div class="card" style="padding:0;overflow-x:auto">
    <table><thead><tr><th>Alumno</th><th>Grado</th><th>Nivel</th></tr></thead>
    <tbody>${rows||'<tr><td colspan="3" class="center muted">Sin alumnos asignados a tu grado.</td></tr>'}</tbody></table></div>`;
}

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
    const best=a.length?Math.max(...a.map(x=>+x.percent||0)):null;
    const avg=a.length?Math.round(a.reduce((s,x)=>s+(+x.percent||0),0)/a.length):null;
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
        atts.map(a=>`<tr><td>${esc(a.skill)} · ${esc(a.level)} · ${a.mock==='mock2'?'MOCK 2':'MOCK 1'}</td><td>${a.score}/${a.total} (${a.percent}%)</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td></tr>`).join('')
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
function studentExams(){
  document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='exams'));
  $('#main').innerHTML=`<h1>Rendir examen</h1>
    <div class="note info">Los exámenes MOCKS CAMBRIDGE se integrarán dentro del portal (guardado automático de resultados). Por ahora puedes abrir la app de exámenes; en la siguiente fase quedará embebida y conectada a tu avance.</div>
    <div class="grid cols-3">
      ${SKILLS.map(s=>`<div class="card center"><h2>${s}</h2><p class="muted">MOCK 1 y MOCK 2</p>
        <a class="btn" href="${QUIZ_URL}${s==='Reading'?'reading-quiz.html':s==='Listening'?'listening-quiz.html':'writing-quiz.html'}" target="_blank" rel="noopener">Abrir ${s} ↗</a></div>`).join('')}
    </div>`;
}
