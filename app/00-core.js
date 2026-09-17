/* ===================== Portal NIS ===================== */
const CFG = window.NIS_CONFIG;
if(!window.supabase || !window.supabase.createClient){
  document.getElementById('app').innerHTML = '<div class="auth-wrap"><div class="auth-card center"><h1>NIS Portal</h1><p class="muted">A required library could not be loaded (connection). Reload the page.</p><button class="btn" onclick="location.reload()">Retry</button></div></div>';
}
const sb = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY) : null;
const $ = (s, r=document) => r.querySelector(s);
const app = $('#app');
const esc = s => (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const GRADES = Array.from({length:11},(_,i)=>({id:i+1,name:'G'+(i+1)}));
const LEVELS = ['A2','B1','B2','C1'];
const SKILLS = ['Reading','Listening','Writing'];
/* Motor de simulacros (repo mocks-cambridge), servido SIEMPRE desde este mismo
   origen (/mocks-cambridge/):
     1) el alumno nunca sale de nis.cohasset.pe (ninguna tarjeta debe mostrar
        github.io ni bacman2000 en la barra — pedido explícito 2026-08-13);
     2) mismo origen = mismo localStorage = la sesión de Supabase se COMPARTE, así
        `NIS.currentStudent()` (nis-bridge.js) devuelve al alumno logueado y los
        quizzes saltan solos la pantalla de nombre/grado/correo.
   El fallback a GitHub Pages (con HEAD de sondeo) se ELIMINÓ a propósito: con red
   lenta el sondeo expiraba y mandaba alumnos a github.io. Si /mocks-cambridge/
   diera 404 (json y mp3 sí cargan), al bloque nginx le falta el '^~' — arreglar el
   servidor (deploy/DEPLOY.md, paso 3-bis), NO resucitar el fallback. */
const QUIZ_URL = '/mocks-cambridge/';
/* === Enlaces configurables del dashboard de alumnos === */
const LIBRARY_URL = 'http://127.0.0.1:8900/';   // Biblioteca NIS (OPAC local). Mientras sea 127.0.0.1/localhost, el tile se muestra "Próximamente" (ver studentLibrary). Pon aquí la URL pública para activarlo.
const CLASSES_LINKS = {
  presentations: '',   // pegar URL de las presentaciones de clase (vacío = "Próximamente")
  activities:    'activities.html'    // hub de juegos y actividades de clase
};

let state = { session:null, profile:null };
let resultsBranch = 'mock'; // 'mock' | 'practice'
let userFilter = { grade:'', year:'', role:'', section:'' };

/* ---------- analysis helpers ---------- */
function yearOptions(sel){ const cur=new Date().getFullYear(); let o=''; for(let y=2026;y<=Math.max(cur+1,2027);y++){ o+=`<option ${String(sel)===String(y)?'selected':''}>${y}</option>`; } return o; }
function isMockAttempt(a){ return /^mock\d+$/.test(a.mock||''); }
function mockLabel(a){ const m=/^mock(\d+)$/.exec(a.mock||''); return m?('MOCK '+m[1]):(a.mock||'Practice'); }
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
  if(pct==null) return {tier:'info', label:'Not graded', text:`This skill is not graded automatically (the teacher reviews it). It does not affect the projection towards ${L}.`};
  if(pct>=80) return {tier:'good', label:`High pass — ${L}`, text:`Strong performance in ${L} (${pct}%). Ready to start practising the next level.`};
  if(pct>=60) return {tier:'good', label:`Pass — ${L}`, text:`Pass in ${L} (${pct}%); the Cambridge standard is around 60%. Keep consolidating to secure the official exam.`};
  if(pct>=40) return {tier:'warn', label:`Approaching ${L}`, text:`Approaching ${L} (${pct}%). Strengthen the lowest parts before sitting the exam.`};
  return {tier:'bad', label:`Below ${L}`, text:`Below ${L} (${pct}%). More practice at this level is recommended before the official exam.`};
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
    <h2 style="margin-bottom:2px">Exam parts — group strengths and weaknesses</h2>
    <p class="muted" style="margin-top:0;font-size:.85rem">Average per part over the filtered results (${list.length} exam(s)). Weakest first.</p>
    <div class="grid cols-2" style="margin:10px 0">
      <div><h3 style="color:var(--bad);margin:0 0 6px">⚠️ Needs work (&lt;50%)</h3>${weak.length?`<div style="display:flex;flex-wrap:wrap;gap:6px">${weak.map(p=>chip(p,'#dc2626')).join('')}</div>`:'<p class="muted">No part below 50%. 👏</p>'}</div>
      <div><h3 style="color:var(--good);margin:0 0 6px">💪 Strengths (≥70%)</h3>${strong.length?`<div style="display:flex;flex-wrap:wrap;gap:6px">${strong.map(p=>chip(p,'#16a34a')).join('')}</div>`:'<p class="muted">No part at ≥70% yet.</p>'}</div>
    </div>
    <div style="margin-top:6px">${parts.map(p=>barRow(`${p.name} (${p.n})`, p.avg)).join('')}</div>
  </div>`;
}

/* ---------- boot ---------- */
const STARTUP_TIMEOUT_MS = 12000;
let authSubscription = null;

function withTimeout(promise, ms=STARTUP_TIMEOUT_MS, code='TIMEOUT'){
  let timer;
  const timeout = new Promise((_, reject)=>{
    timer = setTimeout(()=>{
      const err = new Error(code);
      err.code = code;
      reject(err);
    }, ms);
  });
  return Promise.race([promise, timeout]).finally(()=>clearTimeout(timer));
}

function renderStartupError(error){
  console.error('Portal NIS startup error', error);
  const root = document.getElementById('app');
  if(!root) return;
  const offline = navigator && navigator.onLine === false;
  const detail = offline
    ? 'It looks like there is no internet connection.'
    : 'The portal could not start. The session or data took too long to respond.';
  root.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <h1>NIS Portal</h1>
    <p class="sub">${detail}</p>
    <div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap">
      <button class="btn" onclick="location.reload()">↻ Retry</button>
      <button class="btn ghost" onclick="window.nisSafeLogout()">Sign out</button>
    </div>
    <p class="muted" style="font-size:.8rem;margin-top:12px">Code: ${esc(error && (error.code||error.message) || 'STARTUP_ERROR')}</p>
  </div></div>`;
}

/* Cierre de sesión que no depende del servidor. supabase-js 2.45 solo borra la
   sesión local si /auth/v1/logout responde 2xx, 401 o 404: con un 403
   session_not_found (la sesión ya revocada desde otro navegador o perfil;
   14-sep-2026, el admin) devolvía el error, dejaba el token en localStorage y
   Sign out no hacía nada — y al recargar, la sesión «volvía». Se intenta el
   cierre normal con tope y después se borra el token a mano pase lo que pase. */
async function cerrarSesion(){
  try{ if(sb) await withTimeout(sb.auth.signOut(), 8000, 'SIGNOUT_TIMEOUT'); }catch(_){ }
  try{ Object.keys(localStorage).filter(k=>/^sb-.*-auth-token/.test(k)).forEach(k=>localStorage.removeItem(k)); }catch(_){ }
  state.session=null; state.profile=null;
  try{ history.replaceState(null,'',location.pathname); }catch(_){ }
  renderAuth();
}
window.nisSafeLogout = cerrarSesion;

/* Diagnostico de un panel colgado: a los 8 s con «Loading…» se manda a
   client_errors el paso en que se quedo (window.__nisPaso), el estado y los
   cerrojos que Safari tiene tomados. Lo pidio el 11-sep-2026 el iPad de un
   alumno que no pasaba de «Loading…» sin dejar rastro en ningun sitio. */
window.__nisPaso = 'arranque';
setTimeout(async ()=>{ try{
  const m=document.getElementById('main');
  if(!(m && (m.textContent||'').trim()==='Loading…')) return;
  let locks=null; try{ locks=(await navigator.locks.query()).held.map(l=>l.name); }catch(_){ locks='n/a'; }
  if(window.NIS_ERROR) NIS_ERROR('PANEL_STALLED', '', { paso:window.__nisPaso, tab:state._tab||null,
    sesion:!!state.session, rol:(state.profile&&state.profile.role)||null, acceso:!!state.access,
    locks:locks, online:navigator.onLine, visible:!document.hidden, sbInit: !!(sb&&sb.auth) });
}catch(_){ } }, 8000);
// Safety net for a stalled panel after startup. Startup itself is handled by
// explicit timeout/error states below, so users are never left on a spinner.
setTimeout(()=>{ try{
  const m=document.getElementById('main');
  if(m && (m.textContent||'').trim()==='Loading…'){
    m.innerHTML='<div class="center muted" style="padding:24px">This module could not be loaded.<br><button class="btn" style="margin-top:10px" onclick="location.reload()">↻ Retry</button></div>';
  }
}catch(_){ } }, 15000);

/* init(); arranca en app/99-boot.js, cuando todo está declarado. */
async function init(){
  if(!sb){
    renderStartupError(Object.assign(new Error('SUPABASE_NOT_AVAILABLE'),{code:'SUPABASE_NOT_AVAILABLE'}));
    return;
  }

  try{
    const params = new URLSearchParams(location.search);
    if(params.get('logout')==='1'){
      await cerrarSesion();
      subscribeAuthChanges();
      return;
    }
  }catch(_){ }

  try{
    const { data, error } = await withTimeout(sb.auth.getSession(), STARTUP_TIMEOUT_MS, 'SESSION_TIMEOUT');
    if(error) throw error;
    state.session = data && data.session ? data.session : null;
    const recoveryMode = (()=>{ try{return new URLSearchParams(location.search).get('recovery')==='1';}catch(_){return false;} })();
    if(recoveryMode && state.session){ renderRecoveryPassword(); return; }
    window.__nisPaso='init:perfil';
    if(state.session) await withTimeout(loadProfile(), STARTUP_TIMEOUT_MS, 'PROFILE_TIMEOUT');
    window.__nisPaso='init:route';
    route();
  }catch(e){
    state.session=null;
    state.profile=null;
    renderStartupError(e);
  } finally {
    subscribeAuthChanges();
  }
}

function subscribeAuthChanges(){
  if(!sb || authSubscription) return;
  try{
    let lastUid = (state.session && state.session.user) ? state.session.user.id : null;
    const result = sb.auth.onAuthStateChange((evt, session)=>{
      setTimeout(async ()=>{
        const uid = (session && session.user) ? session.user.id : null;
        state.session = session;
        if(evt==='PASSWORD_RECOVERY'){ renderRecoveryPassword(); return; }
        if(evt==='TOKEN_REFRESHED' || evt==='USER_UPDATED') return;
        if(uid===lastUid && (uid===null || state.profile)) return;
        lastUid = uid;
        try{
          if(session) await withTimeout(loadProfile(), STARTUP_TIMEOUT_MS, 'PROFILE_TIMEOUT');
          else state.profile=null;
          route();
        }catch(e){
          state.profile=null;
          renderStartupError(e);
        }
      }, 0);
    });
    authSubscription = result && result.data ? result.data.subscription : true;
  }catch(e){ console.error('auth subscription failed', e); }
}

async function loadProfile(){
  if(!state.session || !state.session.user) throw Object.assign(new Error('NO_SESSION'),{code:'NO_SESSION'});
  const { data, error } = await sb.from('profiles').select('*, grades(name)').eq('id', state.session.user.id).maybeSingle();
  if(error) throw error;
  // A newly-created Auth account may legitimately exist before an admin/profile
  // row is ready. Preserve the existing 'Casi listo' flow for that case.
  if(!data){ state.profile=null; return; }
  state.profile = data;
  sincronizaIdioma(data);
  try{ await withTimeout(loadReaderAssignments(), 8000, 'READER_ASSIGNMENTS_TIMEOUT'); }
  catch(e){ console.warn('Reader assignments unavailable during startup', e); }
}
/* El idioma de la interfaz (botón 🌐, nis-i18n.js) se guarda en
   profiles.ui_lang para que siga al alumno de un equipo a otro. Al entrar,
   si este navegador no tiene preferencia propia, manda la del perfil; y cada
   cambio con el botón se escribe en el perfil. Un fallo aquí no rompe nada:
   el idioma sigue viviendo en localStorage. */
let _langSync = false;
function sincronizaIdioma(p){
  const i = window.NISi18n; if(!i || !p) return;
  try{
    if(!localStorage.getItem('nis.lang') && (p.ui_lang==='es' || p.ui_lang==='en')) i.set(p.ui_lang);
  }catch(_){}
  if(_langSync) return; _langSync = true;
  document.addEventListener('nis-lang', async e=>{
    const l = e.detail && e.detail.lang; if(l!=='es' && l!=='en') return;
    if(!state.session || !state.session.user) return;
    try{ await sb.from('profiles').update({ ui_lang:l }).eq('id', state.session.user.id); }catch(_){}
  });
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
async function logout(){ await cerrarSesion(); }

/* ---------- shared chrome ---------- */
function header(){
  const p = state.profile||{};
  const name = p.full_name || (p.first_name?`${p.first_name} ${p.last_name||''}`:state.session?.user?.email) || '';
  // En vista de alumno el chip y el nombre son los del alumno simulado, así que
  // la barra de aviso es lo único que recuerda quién está realmente dentro.
  const real = _isPreview() ? (state.realProfile||{}) : null;
  return `<div class="app-header">
    <button class="nav-toggle" type="button" onclick="window._navToggle(true)" aria-label="Menu" title="Menu">☰</button>
    <img src="assets/logo-white-h.svg" alt="Nordic International School">
    <div class="spacer"></div>
    ${_viewAsSelect()}
    <span class="role-chip">${esc(p.role||'')}</span>
    <span class="who">${esc(name)}</span>
    ${real ? `<span class="who" style="opacity:.75">· session: ${esc(real.full_name||real.email||'admin')}</span>` : ''}
    <button class="logout" onclick="window._irAyuda()" title="Help: where everything is">❓ Help</button>
    <button class="logout" onclick="logout()">Sign out</button>
  </div>`+_previewBar();
}
/* La barra lateral admite GRUPOS: {group:'Personas', icon:'👥', items:[…]}.
   El admin llego a tener 23 entradas seguidas y encontrar una era leerlas
   todas. Un item suelto se sigue pasando tal cual (Resumen, y la vista del
   alumno, que no tiene grupos).
   Se abre el grupo donde esta la pestana activa; lo demas, como lo dejo el
   usuario la ultima vez. En movil la barra es una fila con scroll y el
   acordeon no aplica: alli se ven todos (ver brand.css). */
/* El menu se abre SIEMPRE compacto: todos los grupos plegados, y es el usuario
   quien despliega el que necesita. Antes se recordaba en localStorage, asi que
   al volver al dia siguiente uno se encontraba con lo que dejo abierto hace una
   semana y la barra volvia a ser una lista larga.
   Lo desplegado se guarda en sessionStorage y no en localStorage: mientras se
   navega por el panel se conserva (cambiar de pestaña repinta la barra entera,
   y cerrarle los grupos a cada clic seria insufrible), pero al abrir el portal
   de nuevo se vuelve a empezar compacto. */
const NAV_ABIERTOS = 'nis_nav_open';
function navAbiertos(){
  try {
    // Rastro de la version anterior: si se queda, no molesta, pero tampoco
    // pinta nada ya. Se limpia una vez.
    localStorage.removeItem(NAV_ABIERTOS);
    return JSON.parse(sessionStorage.getItem(NAV_ABIERTOS)||'{}') || {};
  } catch(e){ return {}; }
}
function navGuardaAbierto(nombre, abierto){
  const o = navAbiertos(); o[nombre] = abierto;
  try { sessionStorage.setItem(NAV_ABIERTOS, JSON.stringify(o)); } catch(e){}
}
function navItemHTML(n, activeKey){
  return n.href
    ? `<a class="nav-item" href="${n.href}" target="_blank" rel="noopener">${n.label}</a>`
    : `<div class="nav-item ${n.key===activeKey?'active':''}" data-nav="${n.key}" tabindex="0" role="button">${n.label}</div>`;
}
function navHTML(navItems, activeKey){
  const abiertos = navAbiertos();
  return navItems.map(n => {
    if(!n.items) return navItemHTML(n, activeKey);
    const abierto = abiertos[n.group]===true;
    const aqui = n.items.some(i => i.key===activeKey);
    return `<div class="nav-group">
      <button class="nav-head ${abierto?'open':''} ${aqui?'aqui':''}" data-group="${esc(n.group)}"
        aria-expanded="${abierto?'true':'false'}" type="button">
        <span>${n.icon||''} ${esc(n.group)}</span><span class="fl">›</span></button>
      <div class="nav-sub"${abierto?'':' hidden'}>${n.items.map(i=>navItemHTML(i, activeKey)).join('')}</div>
    </div>`;
  }).join('');
}
/* Las claves de todas las pestanas, con grupos o sin ellos. */
function navKeys(navItems){
  return navItems.reduce((a,n)=> a.concat(n.items ? n.items.map(i=>i.key) : [n.key]), []).filter(Boolean);
}
function shell(navItems, activeKey, body, wide){
  /* wide = paneles de gestion (admin y profesor). Son tablas con muchas
     columnas y botones; con el ancho de lectura del alumno no caben. */
  return header()+`<div class="shell">
    <div class="nav-backdrop" onclick="window._navToggle(false)"></div>
    <nav class="sidebar">
      <div class="nav-drawer-head"><b>☰ Menu</b><button type="button" onclick="window._navToggle(false)" aria-label="Close menu">✕ Close</button></div>
      ${navHTML(navItems, activeKey)}</nav>
    <main class="main${wide?' wide':''}" id="main">${body}</main>
  </div>`;
}
/* Cajon del menu en movil (brand.css ≤760 px): la clase va en <body>, que
   sobrevive a los repintados de la SPA, asi que bindNav la quita en cada
   render para que un cambio de pestaña no deje el cajon abierto encima. */
window._navToggle = function(abrir){
  document.body.classList.toggle('nav-open', !!abrir);
};
function bindNav(handler){
  document.body.classList.remove('nav-open');
  document.querySelectorAll('[data-nav]').forEach(e=>{
    e.onclick=()=>handler(e.dataset.nav);
    e.onkeydown=(ev)=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); handler(e.dataset.nav); } };
  });
  // abrir y cerrar un grupo no repinta la pagina: seria perder lo que se este
  // mirando en el panel de la derecha
  document.querySelectorAll('.nav-head').forEach(h=>{
    h.onclick=()=>{
      const sub = h.parentElement.querySelector('.nav-sub');
      const abrir = sub.hidden;
      sub.hidden = !abrir;
      h.classList.toggle('open', abrir);
      h.setAttribute('aria-expanded', abrir?'true':'false');
      navGuardaAbierto(h.dataset.group, abrir);
    };
  });
}