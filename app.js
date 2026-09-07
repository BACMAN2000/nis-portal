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
    ? 'Parece que no hay conexión a Internet.'
    : 'No fue posible iniciar el portal. La sesión o los datos tardaron demasiado en responder.';
  root.innerHTML = `<div class="auth-wrap"><div class="auth-card center">
    <h1>Portal NIS</h1>
    <p class="sub">${detail}</p>
    <div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap">
      <button class="btn" onclick="location.reload()">↻ Reintentar</button>
      <button class="btn ghost" onclick="window.nisSafeLogout()">Cerrar sesión</button>
    </div>
    <p class="muted" style="font-size:.8rem;margin-top:12px">Código: ${esc(error && (error.code||error.message) || 'STARTUP_ERROR')}</p>
  </div></div>`;
}

window.nisSafeLogout = async ()=>{
  try{ if(sb) await withTimeout(sb.auth.signOut(), 5000, 'SIGNOUT_TIMEOUT'); }catch(_){ }
  state.session=null; state.profile=null;
  try{ history.replaceState(null,'',location.pathname); }catch(_){ }
  renderAuth();
};

// Safety net for a stalled panel after startup. Startup itself is handled by
// explicit timeout/error states below, so users are never left on a spinner.
setTimeout(()=>{ try{
  const m=document.getElementById('main');
  if(m && (m.textContent||'').trim()==='Cargando…'){
    m.innerHTML='<div class="center muted" style="padding:24px">No se pudo cargar este módulo.<br><button class="btn" style="margin-top:10px" onclick="location.reload()">↻ Reintentar</button></div>';
  }
}catch(_){ } }, 15000);

init();
async function init(){
  if(!sb){
    renderStartupError(Object.assign(new Error('SUPABASE_NOT_AVAILABLE'),{code:'SUPABASE_NOT_AVAILABLE'}));
    return;
  }

  try{
    const params = new URLSearchParams(location.search);
    if(params.get('logout')==='1'){
      try{ await withTimeout(sb.auth.signOut(), 5000, 'SIGNOUT_TIMEOUT'); }catch(_){ }
      try{ history.replaceState(null,'',location.pathname); }catch(_){ }
      state.session=null; state.profile=null;
      renderAuth();
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
    if(state.session) await withTimeout(loadProfile(), STARTUP_TIMEOUT_MS, 'PROFILE_TIMEOUT');
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
  try{ await withTimeout(loadReaderAssignments(), 8000, 'READER_ASSIGNMENTS_TIMEOUT'); }
  catch(e){ console.warn('Reader assignments unavailable during startup', e); }
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
  // En vista de alumno el chip y el nombre son los del alumno simulado, así que
  // la barra de aviso es lo único que recuerda quién está realmente dentro.
  const real = _isPreview() ? (state.realProfile||{}) : null;
  return `<div class="app-header">
    <img src="assets/logo-white-h.svg" alt="Nordic International School">
    <div class="spacer"></div>
    <span class="role-chip">${esc(p.role||'')}</span>
    <span class="who">${esc(name)}</span>
    ${real ? `<span class="who" style="opacity:.75">· sesión: ${esc(real.full_name||real.email||'admin')}</span>` : ''}
    <button class="logout" onclick="logout()">Salir</button>
  </div>`+_previewBar();
}
/* La barra lateral admite GRUPOS: {group:'Personas', icon:'👥', items:[…]}.
   El admin llego a tener 23 entradas seguidas y encontrar una era leerlas
   todas. Un item suelto se sigue pasando tal cual (Resumen, y la vista del
   alumno, que no tiene grupos).
   Se abre el grupo donde esta la pestana activa; lo demas, como lo dejo el
   usuario la ultima vez. En movil la barra es una fila con scroll y el
   acordeon no aplica: alli se ven todos (ver brand.css). */
const NAV_ABIERTOS = 'nis_nav_open';
function navAbiertos(){
  try { return JSON.parse(localStorage.getItem(NAV_ABIERTOS)||'{}') || {}; } catch(e){ return {}; }
}
function navGuardaAbierto(nombre, abierto){
  const o = navAbiertos(); o[nombre] = abierto;
  try { localStorage.setItem(NAV_ABIERTOS, JSON.stringify(o)); } catch(e){}
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
    const tieneActivo = n.items.some(i => i.key===activeKey);
    const abierto = tieneActivo || abiertos[n.group]===true;
    return `<div class="nav-group">
      <button class="nav-head ${abierto?'open':''}" data-group="${esc(n.group)}"
        aria-expanded="${abierto?'true':'false'}" type="button">
        <span>${n.icon||''} ${esc(n.group)}</span><span class="fl">›</span></button>
      <div class="nav-sub"${abierto?'':' hidden'}>${n.items.map(i=>navItemHTML(i, activeKey)).join('')}</div>
    </div>`;
  }).join('');
}
/* Las claves de todas las pestanas, con grupos o sin ellos. */
function navKeys(navItems){
  return navItems.reduce((a,n)=> a.concat(n.items ? n.items.map(i=>i.key) : [n.key]), []);
}
function shell(navItems, activeKey, body, wide){
  /* wide = paneles de gestion (admin y profesor). Son tablas con muchas
     columnas y botones; con el ancho de lectura del alumno no caben. */
  return header()+`<div class="shell">
    <nav class="sidebar">${navHTML(navItems, activeKey)}</nav>
    <main class="main${wide?' wide':''}" id="main">${body}</main>
  </div>`;
}
function bindNav(handler){
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
function munBody(){ return `<iframe src="mun-academy.html" title="MUN Academy" style="width:100%;height:82vh;min-height:560px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`; }
function liveQuizBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Aloja un juego en vivo estilo Kahoot. Proyecta esta pantalla; los alumnos entran con el PIN o el QR desde su celular.</div>
    <a class="btn" href="live-quiz.html?v=13" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Abrir en pantalla completa ↗</a>
  </div>
  <iframe src="live-quiz.html?v=13" title="NIShoot Live" allow="autoplay" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#0d1d33"></iframe>`; }
function gamesLabBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Worksheets + games for grammar, vocabulary, phrasal verbs and idioms (A1–C1). Open any topic to play: quiz, gap-fill, matching, crossword, word search, word invaders and time attack.</div>
    <a class="btn" href="games-lab.html?v=3" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="games-lab.html?v=3" title="English Games Lab" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef1f8"></iframe>`; }
/* 📝 Pizarra — hoja de cuaderno proyectable (triple renglón, doble raya,
   rayado, cuadriculado o en blanco) donde el profesor escribe la muestra que
   los alumnos copian. Vive en pizarra.html, sin sesión: lo que se escribe se
   guarda en el navegador del profesor, no en la cuenta de nadie. */
function pizarraBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Escribe como en el cuaderno del alumno y proyéctalo: papel triple renglón, doble raya, rayado, cuadriculado o en blanco; varias letras escolares, tamaño, colores, imágenes y dibujo a mano. Lo escrito se queda guardado en este navegador.</div>
    <a class="btn" href="pizarra.html?v=2" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Abrir en pantalla completa ↗</a>
  </div>
  <iframe src="pizarra.html?v=2" title="Pizarra" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#2b2f3a"></iframe>`; }
/* ✍️ Corrector de material — revisa la ficha ANTES de publicarla: ortografía,
   mezcla de inglés británico y americano, y los calcos del hispanohablante
   ("explain me", "discuss about", "I have 12 years") que ningún corrector
   normal marca, porque son palabras bien escritas. Vive en corrector.html y
   trabaja entero en el navegador contra el léxico propio: lo que el profesor
   escribe no se manda a ningún sitio. */
function correctorBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Pega una ficha, un examen o un worksheet y compruébalo antes de publicarlo. Se revisa en tu navegador: el texto no sale de esta pantalla.</div>
    <a class="btn" href="corrector.html?v=4" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Abrir en pantalla completa ↗</a>
  </div>
  <iframe src="corrector.html?v=4" title="Corrector de material" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#f2f3ff"></iframe>`; }
/* 🧩 Use of English — la app B2 (First, Part 1: multiple-choice cloze). Es la
   misma que ve el alumno en Classes > 9.º > Cambridge; aqui el admin la revisa.
   Se corrige sola en el navegador y no guarda intentos en Supabase. */
function useOfEnglishBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Multiple-choice cloze de <b>B2 First</b> (Reading &amp; Use of English, Part 1): textos con 8 huecos y opciones A–D, con corrección y explicación de cada respuesta. Se corrige sola en el navegador y <b>no</b> guarda intentos, así que no aparece en 📝 Resultados.</div>
    <a class="btn" href="use-of-english-part1.html" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Abrir en pantalla completa ↗</a>
  </div>
  <iframe src="use-of-english-part1.html" title="Use of English · Part 1" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>`; }
/* 📘 Info Cambridge — ficha de los examenes (papers, tiempos, escala) y que grado
   del NIS apunta a cual, con el enlace a la app del portal que le toca. */
function cambridgeInfoBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Qué es cada examen Cambridge, cuántas partes tiene, cuánto dura, cómo se puntúa en la Escala Cambridge y qué grado del NIS apunta a cuál.</div>
    <a class="btn" href="cambridge-info.html?v=1" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Abrir en pantalla completa ↗</a>
  </div>
  <iframe src="cambridge-info.html?v=1" title="Info Cambridge" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>`; }
/* Los tres cursos de Fun for Nordic (YLE). El motor es UNO solo — nis-fun/engine —
   y el nivel va en la URL; aqui se embebe igual que Games Lab o Phonics para que
   el profesor lo vea sin salir del portal. Datos de nis-fun/content/levels.json. */
const FUN_CURSOS = {
  starters:{em:'🐧',curso:'Fun for Nordic 1',examen:'Pre A1 Starters',unidades:45,color:'#d97d0d',grados:'G1 · G2',cast:'The Lighthouse Explorers'},
  movers:  {em:'🐺',curso:'Fun for Nordic 2',examen:'A1 Movers',      unidades:50,color:'#2f9268',grados:'G3 · G4',cast:'The Fjord Club'},
  flyers:  {em:'🦅',curso:'Fun for Nordic 3',examen:'A2 Flyers',      unidades:55,color:'#3b6fb5',grados:'G5',     cast:'The Aurora Expedition'},
};
/* ===== 🔐 Que unidades de Fun for Nordic ve cada grado ====================
 *
 * Una fila por grado: que nivel le toca y desde que unidad hasta cual. El
 * rango existe porque Starters lo hacen primero Y segundo grado: no es que
 * los dos vean las 45 unidades, es que se las reparten.
 *
 * REGLA, y es deliberada: mientras un idioma no tenga NINGUNA fila, ese
 * idioma esta abierto entero. Asi el dia que se estrena el panel no se le
 * cierra la puerta a ningun alumno que ya este dentro; la restriccion
 * empieza a valer cuando alguien la escribe. Es lo mismo que hace Practice
 * Tests (sin fila = desbloqueado).
 *
 * Se guarda en la tabla fun_access, con las mismas politicas que los demas
 * candados por grado: lee cualquiera (el alumno necesita saber que le toca),
 * escribe el admin o el profesor de ese grado.
 */
const FUN_NIVELES = ['starters', 'movers', 'flyers'];
/* El reparto que pidio el colegio. Es una PROPUESTA: no se escribe sola, hay
   un boton que la aplica. Flyers se queda en 5.o porque todavia no esta
   decidido si entra 6.o. */
const FUN_REPARTO = { 1: 'starters', 2: 'starters', 3: 'movers', 4: 'movers', 5: 'flyers' };

let _funAccessCache = null;

async function funAccessFilas(){
  const { data, error } = await sb.from('fun_access')
    .select('grade_id,lang,level,desde,hasta,unlocked');
  if (error) throw error;
  return data || [];
}

/* Cuantas unidades tiene cada nivel de verdad. El ingles las trae escritas;
   el frances se cuenta del indice, que es el que manda ([[nada-incompleto]]). */
async function funTotales(lang){
  if (lang === 'fr') { const i = await frIndice(); return i; }
  const o = {}; FUN_NIVELES.forEach(n => o[n] = FUN_CURSOS[n].unidades); return o;
}

async function funAccessPanel(grades){
  const permitidos = grades || GRADES;
  let filas;
  try { filas = await funAccessFilas(); }
  catch (e) { $('#main').innerHTML = `<div class="note err">${esc(e.message)}</div>`; return; }
  _funAccessCache = filas;
  const totEn = await funTotales('en'), totFr = await funTotales('fr');

  const tabla = (lang, totales) => {
    const mias = filas.filter(f => f.lang === lang);
    const abierto = mias.length === 0;
    const porGrado = {};
    mias.forEach(f => porGrado[f.grade_id] = f);
    const nombre = n => lang === 'fr' ? FUN_FR[n].curso : FUN_CURSOS[n].curso;
    const cuerpo = permitidos.map(g => {
      const f = porGrado[g.id];
      const nivel = f ? f.level : (FUN_REPARTO[g.id] || '');
      const max = totales[nivel] || 0;
      const desde = f ? f.desde : 1;
      const hasta = f ? f.hasta : (max || 1);
      const on = f ? f.unlocked : false;
      return `<tr data-g="${g.id}" data-lang="${lang}">
        <td><b>${esc(g.name)}</b></td>
        <td><select class="fa-nivel" style="min-width:15rem">
          <option value="">— sin curso —</option>
          ${FUN_NIVELES.map(n => `<option value="${n}"${n === nivel ? ' selected' : ''}>${esc(nombre(n))} (${totales[n] || 0})</option>`).join('')}
        </select></td>
        <td style="white-space:nowrap">
          <input class="fa-desde" type="number" min="1" value="${desde}" style="width:4.5rem">
          <span class="muted">a</span>
          <input class="fa-hasta" type="number" min="1" value="${hasta}" style="width:4.5rem">
        </td>
        <td style="white-space:nowrap"><span class="badge ${f && on ? 'on' : 'off'}">${!f ? '— sin regla —' : (on ? '🔓 Abierto' : '🔒 Cerrado')}</span></td>
        <td class="acts"><div class="acts-wrap">
          <button class="btn sm" onclick="window._funAccessGuardar(this)">Guardar</button>
          ${f ? `<button class="btn sm ghost" onclick="window._funAccessQuitar(this)">Quitar</button>` : ''}
        </div></td></tr>`;
    }).join('');
    return `<div class="card" style="padding:0;overflow-x:auto">
      <div style="padding:14px 16px 0"><h2 style="margin:0">${lang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}</h2>
        <p class="muted" style="font-size:.86rem;margin:4px 0 10px">${abierto
          ? 'Sin ninguna regla: <b>todos los grados ven los tres niveles enteros</b>. En cuanto guardes una fila, solo se verá lo que esté escrito aquí.'
          : 'Solo se ve lo escrito aquí. Un grado sin fila <b>no ve nada</b> de este idioma.'}</p></div>
      <table><thead><tr><th>Grado</th><th>Nivel</th><th>Unidades</th><th>Estado</th><th></th></tr></thead>
      <tbody>${cuerpo}</tbody></table></div>`;
  };

  $('#main').innerHTML = `<h1>🔐 Unidades por grado — Fun for Nordic</h1>
    <div class="note">Qué parte del curso puede abrir cada grado. Las unidades fuera del rango
      <b>siguen apareciendo</b> al alumno, con un candado: así ve a dónde va a llegar, pero no se adelanta.
      Es lo mismo que hace <b>📚 Activar unidades</b> con las clases.</div>
    <div class="card">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">El reparto que pidió el colegio</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">
        1.º y 2.º hacen <b>Starters</b>, 3.º y 4.º <b>Movers</b>, 5.º <b>Flyers</b>.
        Las 45 unidades de Starters se reparten entre 1.º y 2.º, y las 50 de Movers entre 3.º y 4.º.
        <b>6.º queda fuera</b> hasta que se decida si entra en Flyers.
        Esto no se aplica solo: revisa los rangos y pulsa el botón.</div>
      <button class="btn" onclick="window._funAccessReparto('en')">Aplicar a English</button>
      <button class="btn" onclick="window._funAccessReparto('fr')">Aplicar a Français</button>
    </div>
    ${tabla('en', totEn)}
    <div style="height:16px"></div>
    ${tabla('fr', totFr)}`;
}

function _funAccessFila(btn){
  const tr = btn.closest('tr');
  return {
    tr,
    grade_id: Number(tr.dataset.g),
    lang: tr.dataset.lang,
    level: tr.querySelector('.fa-nivel').value,
    desde: Number(tr.querySelector('.fa-desde').value),
    hasta: Number(tr.querySelector('.fa-hasta').value),
  };
}

window._funAccessGuardar = async (btn) => {
  const f = _funAccessFila(btn);
  if (!f.level) { alert('Elige un nivel, o pulsa Quitar para dejar el grado sin curso.'); return; }
  if (!(f.desde >= 1) || !(f.hasta >= f.desde)) { alert('El rango no cuadra: «hasta» tiene que ser mayor o igual que «desde».'); return; }
  btn.disabled = true;
  // un grado hace UN nivel: al guardar se van los otros del mismo idioma
  await sb.from('fun_access').delete().eq('grade_id', f.grade_id).eq('lang', f.lang).neq('level', f.level);
  const { error } = await sb.from('fun_access').upsert({
    grade_id: f.grade_id, lang: f.lang, level: f.level,
    desde: f.desde, hasta: f.hasta, unlocked: true,
    updated_at: new Date().toISOString(),
    updated_by: (state.session && state.session.user && state.session.user.id) || null,
  }, { onConflict: 'grade_id,lang,level' });
  btn.disabled = false;
  if (error) { alert('No se pudo guardar: ' + error.message); return; }
  funAccessPanel(state.profile && state.profile.role === 'admin' ? GRADES : teacherAllowedGrades());
};

window._funAccessQuitar = async (btn) => {
  const f = _funAccessFila(btn);
  if (!await NISUI.pregunta('Sin fila, ese grado no ve nada de este idioma.', {titulo:'¿Quitar el acceso?', si:'Quitar', no:'Cancelar', tono:'mal', peligro:true})) return;
  btn.disabled = true;
  const { error } = await sb.from('fun_access').delete().eq('grade_id', f.grade_id).eq('lang', f.lang);
  btn.disabled = false;
  if (error) { alert('No se pudo quitar: ' + error.message); return; }
  funAccessPanel(state.profile && state.profile.role === 'admin' ? GRADES : teacherAllowedGrades());
};

window._funAccessReparto = async (lang) => {
  const totales = await funTotales(lang);
  const lineas = Object.entries(FUN_REPARTO)
    .filter(([g, n]) => (totales[n] || 0) > 0)
    .map(([g, n]) => `G${g} → ${lang === 'fr' ? FUN_FR[n].curso : FUN_CURSOS[n].curso} (1–${totales[n]})`);
  if (!lineas.length) { alert('Ese idioma todavía no tiene unidades.'); return; }
  if (!await NISUI.pregunta('Se escribirá el nivel entero para cada grado. Los rangos se ajustan después a mano.', {titulo:'¿Aplicar el reparto?', si:'Escribir', no:'Cancelar', detalle: lineas.join('\n')})) return;
  const ahora = new Date().toISOString();
  const uid = (state.session && state.session.user && state.session.user.id) || null;
  const filas = Object.entries(FUN_REPARTO)
    .filter(([g, n]) => (totales[n] || 0) > 0)
    .map(([g, n]) => ({ grade_id: Number(g), lang, level: n, desde: 1, hasta: totales[n],
                        unlocked: true, updated_at: ahora, updated_by: uid }));
  const { error } = await sb.from('fun_access').upsert(filas, { onConflict: 'grade_id,lang,level' });
  if (error) { alert('No se pudo aplicar: ' + error.message); return; }
  funAccessPanel(state.profile && state.profile.role === 'admin' ? GRADES : teacherAllowedGrades());
};

/* Lo que puede abrir un grado, para pintar la tarjeta del alumno. Devuelve
   null si el idioma no tiene reglas — que significa "todo abierto". */
async function funAccessDeGrado(gradeId, lang){
  try {
    const filas = _funAccessCache || await funAccessFilas();
    _funAccessCache = filas;
    const mias = filas.filter(f => f.lang === lang);
    if (!mias.length) return null;                       // idioma sin reglas
    return mias.filter(f => f.grade_id === gradeId && f.unlocked);
  } catch (e) { return null; }                           // sin red, no se cierra
}

/* Los libros en PDF de un nivel, en el idioma que sea.
 *
 * Los tres se generan del mismo contenido que ve el alumno en pantalla
 * (book-builder/book.html, con ?lang=fr para el frances), asi que dicen
 * exactamente lo mismo que el curso. Lo unico que cambia entre idiomas es
 * el sufijo del archivo y el nombre del libro.
 *
 * `conClave` en false deja fuera el corregido: al alumno no se le dan las
 * respuestas, ni en ingles ni en frances.
 */
const FUN_LIBROS_N = { starters: 1, movers: 2, flyers: 3 };
/* Cloudflare cachea los PDF siete dias y la ruta no cambia al
   recompilarlos: sin esto el servidor tiene el libro nuevo y el borde sigue
   sirviendo el viejo. SUBIR ESTA FECHA cada vez que se recompilen. */
const FUN_LIBROS_V = '2026-09-02';
const FUN_LIBROS_TXT = {
  en: { marca: '',    sb: "Student's Book", wb: 'Workbook',           key: "Teacher's Key" },
  fr: { marca: '-FR', sb: "Livre de l'\u00e9l\u00e8ve", wb: "Cahier d'exercices",
        key: 'Corrig\u00e9 du professeur' },
};
function funLibros(nivel, lang, conClave){
  const n = FUN_LIBROS_N[nivel];
  const t = FUN_LIBROS_TXT[lang] || FUN_LIBROS_TXT.en;
  if (!n) return '';
  const libro = (suf, em, txt) =>
    // se abre en una pestana en vez de descargarse: el libro del alumno
    // pesa 24 MB y casi siempre lo que se quiere es mirarlo o imprimirlo
    `<a class="btn" target="_blank" rel="noopener"
        href="nis-fun/book-builder/FunForNordic${n}${t.marca}-${suf}.pdf?v=${FUN_LIBROS_V}"
        style="background:#fff;border:1px solid var(--line);color:var(--ink);text-decoration:none">${em} ${txt}</a>`;
  return libro('SB', '\u{1F4D8}', t.sb)
       + libro('WB', '\u{1F4DD}', t.wb)
       + (conClave ? libro('TeachersKey', '\u{1F511}', t.key) : '');
}

function funCursoBody(nivel){
  const c = FUN_CURSOS[nivel] || FUN_CURSOS.starters;
  const url = `nis-fun/engine/?level=${nivel}`;
  return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px"><b>${c.curso}</b> — ${c.unidades} unidades con audio, juegos y tareas de examen para preparar <b>${c.examen}</b> (${c.grados} · ${c.cast}). Es el mismo curso que abre el alumno; lo que escriba y grabe aparece en <b>✅ Corrección → 🧸 Fun for Nordic</b>.</div>
    <a class="btn" href="${url}" target="_blank" rel="noopener" style="background:${c.color};text-decoration:none">${c.em} Abrir en pantalla completa ↗</a>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
    <span class="muted" style="font-size:.85rem">Para imprimir:</span>${funLibros(nivel, 'en', true)}
  </div>
  <iframe src="${url}" title="${esc(c.curso)}" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`;
}
/* 🧸 Fun for Nordic dentro de Cambridge: es la rama YLE del examen (los tres
   primeros peldanos de la escalera). El curso se da en Ensenanza y las entregas
   se corrigen en Correccion, asi que aqui va la puerta a las dos cosas y no una
   tercera copia del panel — la misma pestana en dos grupos rompe el resaltado
   del menu, porque los dos items compartirian data-nav. `render` es el nombre
   de la funcion que repinta el menu: renderAdmin o renderTeacher. */
function funYleBody(render){
  const tarjeta = (nivel,tab) => {
    const c = FUN_CURSOS[nivel];
    return _hubCard(c.em, c.curso, `${c.examen} · ${c.grados}<br>${c.unidades} unidades`,
      `${render}('${tab}')`);
  };
  return `<h1>🧸 Fun for Nordic — Cambridge Young Learners</h1>
    <p class="muted" style="margin-top:-6px">Los tres primeros peldaños de la escalera Cambridge:
      Pre A1 Starters, A1 Movers y A2 Flyers. 150 unidades con audio, juegos y tareas de examen.
      El formato de cada examen está en <b>📘 Info Cambridge</b>.</p>
    <div class="grid cols-3">
      ${tarjeta('starters','funstarters')}${tarjeta('movers','funmovers')}${tarjeta('flyers','funflyers')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">📚 Los libros en PDF</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">El libro del alumno, el cuaderno de casa
        y el corregido de cada nivel. Salen del mismo contenido que el curso en pantalla, así que dicen
        exactamente lo mismo.</div>
      ${['starters','movers','flyers'].map(n => `<div style="margin-bottom:14px">
        <div style="font-weight:600;margin-bottom:6px;color:${FUN_CURSOS[n].color}">${FUN_CURSOS[n].em} ${FUN_CURSOS[n].curso}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${funLibros(n, 'en', true)}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">✅ Corregir lo que entregan</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">Lo que los alumnos escriben y
        graban en los tres niveles, para ponerles nota y comentario. Es la misma pestaña que hay en
        <b>✅ Corrección</b>.</div>
      <button class="btn" onclick="${render}('funnordic')">🧸 Ver las entregas</button>
    </div>`;
}
/* ===== Francais - el mismo curso, en frances ==============================
   No hay un segundo motor ni una segunda copia de los dibujos: el curso
   frances es el mismo `nis-fun/engine` con ?lang=fr, que lee de content-fr.
   Lo unico que se separa de verdad es el audio (las voces) y las entregas,
   que llevan el idioma en la fila para no pisar las del curso ingles. */
const FUN_FR = {
  starters:{em:'\u{1F427}',curso:'Cap sur le fran\u00e7ais 1', nivel:'Pr\u00e9-A1 \u00b7 d\u00e9butants', color:'#d97d0d',grados:'G1 \u00b7 G2',cast:'Les Explorateurs du Phare'},
  movers:  {em:'\u{1F43A}',curso:'Cap sur le fran\u00e7ais 2', nivel:'A1 \u00b7 en route',      color:'#2f9268',grados:'G3 \u00b7 G4',cast:'Le Club du Fjord'},
  flyers:  {em:'\u{1F985}',curso:'Cap sur le fran\u00e7ais 3', nivel:'A2 \u00b7 exploration',   color:'#3b6fb5',grados:'G5',    cast:"L'Exp\u00e9dition Aurore"},
};
let _FR_INDICE = null;          // cuantas unidades hay de verdad en cada nivel
async function frIndice(){
  if (_FR_INDICE) return _FR_INDICE;
  _FR_INDICE = {};
  for (const n of ['starters','movers','flyers']) {
    try {
      const r = await fetch(`nis-fun/content-fr/${n}/index.json`, {cache:'no-cache'});
      _FR_INDICE[n] = r.ok ? ((await r.json()).units || []).length : 0;
    } catch(e) { _FR_INDICE[n] = 0; }
  }
  return _FR_INDICE;
}

function funFrCursoBody(nivel){
  const c = FUN_FR[nivel] || FUN_FR.starters;
  const url = `nis-fun/engine/?level=${nivel}&lang=fr`;
  return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px"><b>${c.curso}</b> \u2014 ${c.nivel} (${c.grados} \u00b7 ${c.cast}).
      Mismo curso, mismos dibujos y mismas l\u00e1minas que la versi\u00f3n inglesa, con el texto y las voces en franc\u00e9s.
      Lo que el alumno escriba y grabe aparece en <b>\u{1F1EB}\u{1F1F7} Cap sur le fran\u00e7ais \u2192 M\u00e9tricas</b>.</div>
    <a class="btn" href="${url}" target="_blank" rel="noopener" style="background:${c.color};text-decoration:none">${c.em} Abrir en pantalla completa \u2197</a>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
    <span class="muted" style="font-size:.85rem">Para imprimir:</span>${funLibros(nivel, 'fr', true)}
  </div>
  <iframe src="${url}" title="${esc(c.curso)}" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`;
}
/* Hub del curso frances. Las unidades que anuncia NO son un numero escrito a
   mano: se leen del indice que genera el propio contenido, asi que mientras se
   traduce el resto la cifra sube sola y nunca promete lo que no existe. */
async function funFrBody(render){
  const idx = await frIndice();
  const tarjeta = (nivel,tab) => {
    const c = FUN_FR[nivel], n = idx[nivel] || 0;
    return _hubCard(c.em, c.curso, `${c.nivel} \u00b7 ${c.grados}<br>${n} ${n===1?'unidad lista':'unidades listas'}`,
      `${render}('${tab}')`);
  };
  const total = Object.values(idx).reduce((a,b)=>a+b,0);
  return `<h1>\u{1F1EB}\u{1F1F7} Cap sur le fran\u00e7ais</h1>
    <p class="muted" style="margin-top:-6px">El curso de primaria en franc\u00e9s: el mismo motor, los mismos
      personajes y los mismos dibujos, con el texto adaptado y las voces grabadas en franc\u00e9s.
      Hoy hay <b>${total} de 150 unidades</b> listas; el resto aparece aqu\u00ed solo cuando est\u00e1 completo.</p>
    <div class="grid cols-3">
      ${tarjeta('starters','frstarters')}${tarjeta('movers','frmovers')}${tarjeta('flyers','frflyers')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">\u{1F4DA} Los libros en PDF</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">Los mismos tres libros de cada nivel que en
        ingl\u00e9s, con la misma maqueta y los mismos dibujos. Salen del mismo contenido que el curso en pantalla,
        as\u00ed que dicen exactamente lo mismo.</div>
      ${['starters','movers','flyers'].map(n => `<div style="margin-bottom:14px">
        <div style="font-weight:600;margin-bottom:6px;color:${FUN_FR[n].color}">${FUN_FR[n].em} ${FUN_FR[n].curso}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${funLibros(n, 'fr', true)}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">\u{1F4CA} C\u00f3mo se est\u00e1 usando</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">Alumnos, unidades, actividades y minutos
        del curso franc\u00e9s, separados del ingl\u00e9s. Es lo que responde a \u00ab\u00bfesto se usa de verdad?\u00bb.</div>
      <button class="btn" onclick="${render}('frmetricas')">\u{1F4CA} Ver m\u00e9tricas</button>
    </div>`;
}
/* Metricas del curso frances. Sale de v_fun_metricas y v_fun_unidades, que
   agrupan por idioma: aqui nunca se mezcla con lo que hacen en ingles. */
async function funFrMetricas(){
  $('#main').innerHTML = `<h1>\u{1F4CA} Cap sur le fran\u00e7ais \u00b7 m\u00e9tricas</h1><p class="muted">Cargando\u2026</p>`;
  const [alu, uds] = await Promise.all([
    sb.from('v_fun_metricas').select('*').eq('lang','fr').order('ultima',{ascending:false}),
    sb.from('v_fun_unidades').select('*').eq('lang','fr').order('unit',{ascending:true}),
  ]);
  const A = alu.data || [], U = uds.data || [];
  const min = x => Math.round((x||0)/60);
  const totalAlumnos = new Set(A.map(r=>r.student_id)).size;
  const totalAct = A.reduce((a,r)=>a+(r.actividades||0),0);
  const totalMin = min(A.reduce((a,r)=>a+(r.segundos||0),0));
  const totalEsc = A.reduce((a,r)=>a+(r.escritas||0),0);
  const totalGrab = A.reduce((a,r)=>a+(r.grabaciones||0),0);
  const kpi = (n,t) => `<div class="card" style="text-align:center;padding:14px">
      <div style="font-size:1.9rem;font-weight:800;color:var(--blue-d)">${n}</div>
      <div class="muted" style="font-size:.82rem">${t}</div></div>`;
  const filas = A.map(r => `<tr>
      <td>${esc(r.full_name||'\u2014')}</td>
      <td>${esc(r.grade_id||'')}${r.section?' '+esc(r.section):''}</td>
      <td>${esc(FUN_FR[r.level]?FUN_FR[r.level].curso:r.level)}</td>
      <td style="text-align:center">${r.unidades||0}</td>
      <td style="text-align:center">${r.actividades||0}</td>
      <td style="text-align:center">${r.escritas||0}</td>
      <td style="text-align:center">${r.grabaciones||0}</td>
      <td style="text-align:center">${min(r.segundos)}</td>
      <td style="text-align:center">${r.corregidas||0}${r.nota_media!=null?' \u00b7 '+r.nota_media:''}</td>
      <td class="muted" style="font-size:.82rem">${r.ultima?new Date(r.ultima).toLocaleDateString():'\u2014'}</td>
    </tr>`).join('');
  const porUnidad = U.map(r => `<tr>
      <td>${esc(FUN_FR[r.level]?FUN_FR[r.level].curso:r.level)}</td>
      <td style="text-align:center">${r.unit}</td>
      <td style="text-align:center">${r.alumnos||0}</td>
      <td style="text-align:center">${r.entregas||0}</td>
      <td style="text-align:center">${min(r.segundos)}</td>
    </tr>`).join('');
  $('#main').innerHTML = `<h1>\u{1F4CA} Cap sur le fran\u00e7ais \u00b7 m\u00e9tricas</h1>
    <p class="muted" style="margin-top:-6px">Solo el curso franc\u00e9s. Las entregas llevan el idioma dentro,
      as\u00ed que lo de ingl\u00e9s no entra en estos n\u00fameros.</p>
    <div class="grid cols-3" style="margin-bottom:16px">
      ${kpi(totalAlumnos,'alumnos que lo han abierto')}
      ${kpi(totalAct,'actividades hechas')}
      ${kpi(totalMin+' min','tiempo dedicado')}
      ${kpi(totalEsc,'producciones escritas')}
      ${kpi(totalGrab,'grabaciones de voz')}
      ${kpi(U.length,'unidades con actividad')}
    </div>
    <div class="card">
      <h2 style="margin:0 0 10px">Por alumno</h2>
      ${A.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
        <th>Alumno</th><th>Grado</th><th>Nivel</th><th>Unidades</th><th>Actividades</th>
        <th>Escritas</th><th>Grabaciones</th><th>Minutos</th><th>Corregidas \u00b7 nota</th><th>\u00daltima vez</th>
        </tr></thead><tbody>${filas}</tbody></table></div>`
      : `<p class="muted">Todav\u00eda no hay actividad en el curso franc\u00e9s. Aparecer\u00e1 aqu\u00ed en cuanto un alumno abra una unidad.</p>`}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 10px">Por unidad</h2>
      ${U.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
        <th>Nivel</th><th>Unidad</th><th>Alumnos</th><th>Entregas</th><th>Minutos</th>
        </tr></thead><tbody>${porUnidad}</tbody></table></div>`
      : `<p class="muted">Sin datos por unidad todav\u00eda.</p>`}
    </div>`;
}
function studentMun(){ document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav==='mun')); $('#main').innerHTML = munBody(); }
/* Student view: join a live NIShoot game (opens straight on the Join screen). */
function nishootJoinBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Your teacher is projecting a live game. Type the <b>PIN</b> shown on the screen (or scan the QR) and your name to join.</div>
    <a class="btn" href="live-quiz.html?join=1&v=13" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="live-quiz.html?join=1&v=13" title="NIShoot Live" allow="autoplay" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#0d1d33"></iframe>`; }
function studentNishoot(){ _setNav('nishoot'); $('#main').innerHTML = `${_backBtn("window._nav('english')",'English')}<h1>🎮 NIShoot Live</h1>${nishootJoinBody()}`; }
/* Student view: English Games Lab (self-contained practice games). */
function studentGames(){ _setNav('games'); $('#main').innerHTML = `${_backBtn("window._nav('english')",'English')}<h1>🎲 Games Lab</h1>${gamesLabBody()}`; }

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
    if($('#forgotPw')) $('#forgotPw').onclick=(e)=>{ e.preventDefault(); renderForgotPassword(); };
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
    <div style="text-align:right;margin-top:8px"><a id="forgotPw" href="#" style="font-size:.9rem">¿Olvidaste tu contraseña?</a></div>
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
function renderForgotPassword(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="assets/logo-h.svg" alt="Nordic">
    <h1>Recuperar contraseña</h1>
    <p class="sub">Te enviaremos un enlace seguro para crear una nueva contraseña.</p>
    <div id="msg"></div>
    <label>Correo</label>
    <input id="fp_email" type="email" autocomplete="email" placeholder="tucorreo@nordic-school.edu.pe">
    <div style="margin-top:16px"><button class="btn" id="fp_btn" style="width:100%">Enviar enlace</button></div>
    <div class="auth-switch"><a id="fp_back">← Volver a iniciar sesión</a></div>
  </div></div>`;
  const saved=(()=>{ try{return localStorage.getItem('nis_remember_email')||'';}catch(_){return '';} })();
  if($('#fp_email')) $('#fp_email').value=saved;
  $('#fp_back').onclick=()=>renderAuth('login');
  $('#fp_btn').onclick=sendPasswordResetEmail;
  $('#fp_email').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); sendPasswordResetEmail(); } });
  $('#fp_email').focus();
}

async function sendPasswordResetEmail(){
  const email=(($('#fp_email')||{}).value||'').trim();
  const btn=$('#fp_btn');
  if(!email) return msg('err','Ingresa tu correo.');
  if(btn){ btn.disabled=true; btn.textContent='Enviando…'; }
  try{
    const redirectTo = `${location.origin}${location.pathname}?recovery=1`;
    const { error } = await withTimeout(
      sb.auth.resetPasswordForEmail(email,{ redirectTo }),
      STARTUP_TIMEOUT_MS,
      'PASSWORD_RESET_EMAIL_TIMEOUT'
    );
    if(error) throw error;
    msg('ok','Si ese correo está registrado, recibirás un enlace para crear una nueva contraseña. Revisa también Spam o Correo no deseado.');
  }catch(e){
    const text=(e&&e.message)?e.message:'No se pudo enviar el correo de recuperación.';
    msg('err',text);
  }finally{
    if(btn){ btn.disabled=false; btn.textContent='Enviar enlace'; }
  }
}

function renderRecoveryPassword(){
  document.body.innerHTML = `<div class="auth-wrap"><div class="auth-card">
    <img class="logo" src="assets/logo-h.svg" alt="Nordic">
    <h1>Nueva contraseña</h1>
    <p class="sub">Crea una contraseña que puedas recordar.</p>
    <div id="msg"></div>
    <label>Nueva contraseña</label>
    <input id="rp_pw1" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
    <label>Repite la nueva contraseña</label>
    <input id="rp_pw2" type="password" autocomplete="new-password" placeholder="Repite la contraseña">
    <div style="margin-top:16px"><button class="btn" id="rp_btn" style="width:100%">Guardar nueva contraseña</button></div>
  </div></div>`;
  $('#rp_btn').onclick=saveRecoveredPassword;
  ['rp_pw1','rp_pw2'].forEach(id=>$('#'+id).addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); saveRecoveredPassword(); } }));
  $('#rp_pw1').focus();
}

async function saveRecoveredPassword(){
  const pw1=(($('#rp_pw1')||{}).value||'').trim();
  const pw2=(($('#rp_pw2')||{}).value||'').trim();
  const btn=$('#rp_btn');
  if(pw1.length<8) return msg('err','La contraseña debe tener al menos 8 caracteres.');
  if(pw1!==pw2) return msg('err','Las contraseñas no coinciden.');
  if(btn){ btn.disabled=true; btn.textContent='Guardando…'; }
  try{
    const { error } = await withTimeout(sb.auth.updateUser({password:pw1}), STARTUP_TIMEOUT_MS, 'PASSWORD_RECOVERY_UPDATE_TIMEOUT');
    if(error) throw error;
    try{ history.replaceState(null,'',location.pathname); }catch(_){ }
    msg('ok','Contraseña actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.');
    const card=document.querySelector('.auth-card');
    if(card){
      const go=document.createElement('button');
      go.className='btn ghost'; go.style.width='100%'; go.style.marginTop='10px'; go.textContent='Ir a iniciar sesión';
      go.onclick=async()=>{ try{ await sb.auth.signOut(); }catch(_){ } state.session=null; state.profile=null; renderAuth('login'); };
      card.appendChild(go);
    }
  }catch(e){
    const text=(e&&e.message)?e.message:'No se pudo actualizar la contraseña.';
    msg('err',text);
    if(btn){ btn.disabled=false; btn.textContent='Guardar nueva contraseña'; }
  }
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
  if(pw.length<8) return msg('err','La contraseña debe tener al menos 8 caracteres.');
  const meta={ first_name:v('su_first'), last_name:v('su_last'), full_name:v('su_first')+' '+v('su_last'),
    document_id:v('su_doc'), birthdate:v('su_bd'), phone:v('su_phone'),
    guardian_name:v('su_guard'), guardian_phone:v('su_gphone'),
    grade_id:$('#su_grade').value, section:v('su_section'), cefr_level:$('#su_level').value };
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
  /* Agrupado por lo que se va a HACER, no por lo que es cada cosa: primero
     quien existe, luego lo que hay que corregir (el trabajo diario), lo que
     solo se consulta, lo que se ensena, lo que el alumno usa y, al final, lo
     que se abre y se cierra. Resumen queda fuera: es la portada.
     La secuencia (scope) esta tambien aqui y no solo en el menu del profesor:
     desde coordinacion no habia por donde entrar. */
  document.body.innerHTML = shell([
    {key:'overview',label:'📊 Resumen'},
    {group:'Personas', icon:'👥', items:[
      {key:'users',label:'👥 Usuarios'},
      {key:'teachers',label:'👨‍🏫 Profesores'},
    ]},
    {group:'Corrección', icon:'✅', items:[
      {key:'unitprod',label:'🎯 Productos de unidad'},
      {key:'corregir',label:'✅ Corregir fichas'},
      {key:'funnordic',label:'🧸 Fun for Nordic'},
    ]},
    {group:'Seguimiento', icon:'📈', items:[
      {key:'stats',label:'📈 Estadísticas'},
      {key:'results',label:'📝 Resultados'},
      {key:'final',label:'🎓 Resultado final'},
      {key:'readers',label:'📖 Controles de lectura'},
      {key:'unitexams',label:'📋 Exámenes de unidad'},
      {key:'tiempo',label:'⏱️ Tiempo de pantalla'},
      {key:'honesty',label:'🛡️ Honestidad'},
    ]},
    {group:'Enseñanza', icon:'🏫', items:[
      {key:'classes',label:'🏫 Classes'},
      // French vivia SOLO en el hub del alumno, y el admin nunca pasa por ese
      // hub (route() lo manda a renderAdmin): la materia entera quedaba sin
      // puerta de entrada, aunque sus candados si estuvieran en 🔐 Accesos.
      {key:'french',label:'🇫🇷 French'},
      {key:'scope',label:'📚 Scope & Sequence'},
      // Los tres cursos de primaria: son las clases de G1–G5, asi que van aqui
      // y no en Cambridge, aunque preparen los examenes YLE.
      {key:'funstarters',label:'🐧 Starters'},
      {key:'funmovers',label:'🐺 Movers'},
      {key:'funflyers',label:'🦅 Flyers'},
      {key:'fr',label:'🇫🇷 Cap sur le français'},
      {key:'funaccess',label:'🔐 Unidades por grado'},
      {key:'materiales',label:'📄 Materiales de clase'},
      {key:'pizarra',label:'📝 Pizarra'},
      {key:'corrector',label:'✍️ Corrector de material'},
      {key:'library',label:'📚 Library'},
    ]},
    // Todo lo del examen junto: los dos candados (Mocks / Practice, que antes
    // vivian en Permisos) y las apps de Cambridge. Fun for Nordic entra como la
    // rama YLE (`funyle`), que es un indice a los tres cursos de Ensenanza y a
    // las entregas de Correccion — NO la misma clave repetida, que dejaria dos
    // items del menu resaltados a la vez.
    {group:'Cambridge', icon:'🎓', items:[
      {key:'cambridgehub',label:'🎓 YLE + Main Suite'},
      {key:'yle',label:'🛡️ Panel YLE'},
      {key:'studyplan',label:'📋 Plan de estudio'},
      {key:'mocks',label:'🔓 Mocks'},
      {key:'practice',label:'🎯 Practice Tests'},
      {key:'funyle',label:'🧸 Fun for Nordic'},
      {key:'uoe',label:'🧩 Use of English'},
      {key:'cambridgeinfo',label:'📘 Info Cambridge'},
    ]},
    {group:'Actividades', icon:'🎮', items:[
      {key:'games',label:'🎲 Games Lab'},
      {key:'livequiz',label:'🎮 NIShoot Live'},
      {key:'mun',label:'🌐 MUN Academy'},
      {key:'phonics',label:'🔤 Phonics'},
      {key:'coach',label:'🎙️ Pronunciación'},
    ]},
    {group:'Permisos', icon:'🔐', items:[
      {key:'unitaccess',label:'📚 Activar unidades'},
      /* Tambien aqui, y a proposito. En Seguimiento esta al lado de su hermano
         —los controles de lectura, que abren y cierran igual—, pero quien va a
         habilitar un examen busca en Permisos, junto a "Activar unidades", y
         ahi no estaba: el menu nace plegado y la pestana no se encontraba. */
      {key:'unitexams',label:'📋 Abrir exámenes de unidad'},
      {key:'access',label:'🔐 Accesos'},
    ]},
  ], tab, `<div class="center muted">Cargando…</div>`, true);
  bindNav(renderAdmin);
  if(tab==='mun') return $('#main').innerHTML = munBody();
  if(tab==='livequiz') return $('#main').innerHTML = liveQuizBody();
  if(tab==='games') return $('#main').innerHTML = gamesLabBody();
  if(tab==='classes') return studentClasses();
  if(tab==='french') return studentSubject('french');
  if(tab==='library') return studentLibrary();
  if(tab==='phonics') return $('#main').innerHTML = phonicsPanel();
  if(tab==='coach') return $('#main').innerHTML = coachPanel();
  if(tab==='overview') return adminOverview();
  if(tab==='unitprod') return unitProductsPanel();
  if(tab==='materiales') return materialesPanel();
  if(tab==='corregir') return corregirPanel();
  if(tab==='tiempo') return tiempoPantallaPanel();
  if(tab==='stats') return adminStats();
  if(tab==='results') return adminResults();
  if(tab==='final') return cefrFinalPanel();
  if(tab==='readers') return readerStatsPanel();
  if(tab==='unitexams') return unitExamPanel();
  if(tab==='funnordic') return funNordicPanel();
  if(tab==='funaccess') return funAccessPanel(GRADES);
  if(tab==='yle') return window.ylePanel(GRADES, {admin:true});
  if(tab==='funyle') return $('#main').innerHTML = funYleBody('renderAdmin');
  if(tab==='fr') return funFrBody('renderAdmin').then(h => $('#main').innerHTML = h);
  if(tab==='frstarters') return $('#main').innerHTML = funFrCursoBody('starters');
  if(tab==='frmovers') return $('#main').innerHTML = funFrCursoBody('movers');
  if(tab==='frflyers') return $('#main').innerHTML = funFrCursoBody('flyers');
  if(tab==='frmetricas') return funFrMetricas();
  if(tab==='funstarters') return $('#main').innerHTML = funCursoBody('starters');
  if(tab==='funmovers') return $('#main').innerHTML = funCursoBody('movers');
  if(tab==='funflyers') return $('#main').innerHTML = funCursoBody('flyers');
  if(tab==='scope') return scopePanel();
  if(tab==='littlereaders') return littleReadersPanel();
  if(tab==='teachers') return adminTeachers();
  if(tab==='honesty') return antiCheatPanel();
  if(tab==='uoe') return $('#main').innerHTML = useOfEnglishBody();
  if(tab==='pizarra') return $('#main').innerHTML = pizarraBody();
  if(tab==='corrector') return $('#main').innerHTML = correctorBody();
  if(tab==='cambridgeinfo') return $('#main').innerHTML = cambridgeInfoBody();
  if(tab==='cambridgehub') return studentCambridgePortal();
  if(tab==='studyplan') return studyPlanPanel();
  if(tab==='mocks') return adminMocks();
  if(tab==='practice') return practicePanel(GRADES);
  if(tab==='unitaccess') return unitAccessPanel(GRADES);
  if(tab==='access') return adminAccess();
  return adminUsers();
}
/* 🔐 Accesos — matriz grado × actividad (node_access). Mocks va aparte. */
async function adminAccess(){
  const { data, error } = await sb.from('node_access').select('grade_id,node_key,unlocked');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const map={}; (data||[]).forEach(r=>{ (map[r.grade_id]=map[r.grade_id]||{})[r.node_key]=r.unlocked; });
  const head = `<th style="text-align:left">Actividad</th>` + GRADES.map(g=>`<th>${g.name}</th>`).join('');
  const rows = ACCESS_NODES.map(n=>{
    const cells = GRADES.map(g=>{
      const has = map[g.id] && Object.prototype.hasOwnProperty.call(map[g.id], n.key);
      const on = has ? map[g.id][n.key] : _nodeDefaultOpen(n.key);
      return `<td style="text-align:center"><input type="checkbox" ${on?'checked':''} onchange="window._toggleNode(${g.id},'${n.key}',this.checked,this)"></td>`;
    }).join('');
    return `<tr><td><b>${esc(n.label)}</b><div class="muted" style="font-size:.7rem">${n.key}</div></td>${cells}</tr>`;
  }).join('');
  const pvOpts = GRADES.map(g=>`<option value="${g.id}" ${g.id===9?'selected':''}>${g.name}</option>`).join('');
  $('#main').innerHTML=`<h1>🔐 Accesos por grado</h1>
    <div class="card" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
      <div><label>Comprobar el resultado</label>
        <select id="pv_grade" style="min-width:120px">${pvOpts}</select></div>
      <button class="btn sm" onclick="window._previewGrade(document.getElementById('pv_grade').value)">👁️ Ver el portal como alumno</button>
      <div class="muted" style="padding-bottom:11px;flex:1;min-width:240px">Abre el portal con los ojos de un alumno de ese grado —
        con sus candados— para verificar lo que acabas de marcar. Para un alumno concreto (con sus excepciones),
        usa <b>👥 Usuarios → 👁️ Ver como</b>.</div>
    </div>
    <div class="note">Marca qué actividades ve cada <b>grado</b>. Lo nuevo (French, Grammar) nace bloqueado; el resto, abierto. Las <b>unidades</b> (<code>…activities.u4</code>) y sus <b>semanas</b> (<code>…activities.u4.w3</code>) se abren o cierran una a una: cerrar una unidad la oculta entera de <b>Activities</b>; cerrar una semana deja el resto de la unidad como está. Para excepciones de un alumno, el profesor las ajusta en <b>Alumnos</b>. Los <b>Mocks</b> se gestionan en su pestaña 🔓 Mocks.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

/* 📚 Unidades académicas — control simple para admin y docentes. Se guarda en
   node_access, igual que los demás candados por grado. */
async function unitAccessPanel(grades){
  const allowed=grades||[];
  const {data,error}=await sb.from('node_access').select('grade_id,node_key,unlocked');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const map={}; (data||[]).forEach(r=>{(map[r.grade_id]=map[r.grade_id]||{})[r.node_key]=r.unlocked;});
  const sections=allowed.map(g=>{
    const gradeKey='g'+g.id, plans=unitPlansFor(gradeKey);
    if(!plans.length) return '';
    return `<div class="card"><h2 style="margin:0 0 12px">${esc(g.name)} · Unidades</h2>
      <div class="grid cols-3">${plans.map(u=>{
        const key=_academicUnitNode(gradeKey,u.n);
        const has=map[g.id]&&Object.prototype.hasOwnProperty.call(map[g.id],key);
        const on=has?map[g.id][key]:_academicUnitDefault(gradeKey,u.n);
        return `<label class="card" style="margin:0;padding:16px;cursor:pointer;border-color:${on?'#86c59a':'var(--line)'}">
          <div style="display:flex;align-items:center;gap:11px">
            <input type="checkbox" ${on?'checked':''} onchange="window._toggleAcademicUnit(${g.id},'${key}',this.checked,this)">
            <span><b>Unidad ${esc(String(u.label||u.n))} · ${esc(u.title)}</b><small class="muted" style="display:block;margin-top:3px">${on?'Activa para alumnos':'Bloqueada para alumnos'}</small></span>
          </div></label>`;
      }).join('')}</div></div>`;
  }).join('');
  $('#main').innerHTML=`<h1>📚 Activar unidades</h1>
    <div class="note">Las unidades bloqueadas <b>siguen apareciendo</b> al alumno, pero no se pueden abrir. Actívalas cuando el grado llegue a esa parte del curso.</div>
    ${sections||'<div class="card muted">No tienes grados con unidades asignadas.</div>'}`;
}
window._toggleAcademicUnit=async(g,key,to,el)=>{
  el.disabled=true;
  const {error}=await sb.from('node_access').upsert({grade_id:g,node_key:key,unlocked:to,updated_at:new Date().toISOString(),updated_by:(state.session&&state.session.user&&state.session.user.id)||null},{onConflict:'grade_id,node_key'});
  el.disabled=false;
  if(error){alert('No se pudo guardar: '+error.message);el.checked=!to;return;}
  unitAccessPanel(state.profile&&state.profile.role==='admin'?GRADES:teacherAllowedGrades());
};
window._toggleNode=async(g,key,to,el)=>{
  el.disabled=true;
  const { error } = await sb.from('node_access').upsert({grade_id:g,node_key:key,unlocked:to,updated_at:new Date().toISOString(),updated_by:(state.session&&state.session.user&&state.session.user.id)||null},{onConflict:'grade_id,node_key'});
  el.disabled=false;
  if(error){ alert('No se pudo guardar: '+error.message); el.checked=!to; }
};
/* ===================== 🛡️ HONESTIDAD (anti-trampa) =====================
   Incidentes registrados por anticheat.js + botón "dar vida extra" a un
   alumno en una actividad. Disponible para admin y profesor (con acceso). */
const AC_ACTIVITIES = [
  ['portal','🏠 Portal (pantalla de inicio)'],
  ['opinion-essay','Opinion Essay (Writing)'],['use-of-english-part1','Use of English · Part 1'],
  ['grammar-quiz','Grammar Quiz'],['crosswords','Crosswords'],['wordsearches','Word Searches'],
  ['crossword-digital-footprint','Crossword · Digital Footprint'],['wordsearch-digital-footprint','Word Search · Digital Footprint'],
  ['crosswords-fr','Crosswords (FR)'],['wordsearches-fr','Word Searches (FR)'],
  ['backshifting','Backshifting'],['reported-speech','Reported Speech'],['reported-speech-lab','Reported Speech · Lab'],
  ['reported-speech-order','Reported Speech · Order'],['reported-speech-verbs','Reported Speech · Verbs'],
  ['reported-speech-wheel','Reported Speech · Wheel'],['memory-reported-speech','Memory · Reported Speech'],
  ['word-sudoku','Word Sudoku'],['mun-academy','MUN Academy'],['phonics','Phonics Studio'],['pronunciation-coach','Pronunciation Coach'],
  // U4 · lectura y listening por nivel. Hoy NO llaman a anticheat.js (son
  // práctica autónoma: un alumno solo en casa se autobloquearía), pero quedan
  // registradas para poder darles vidas si algún día se les activa.
  ['reading-pretending-fine','U4 · Reading — Pretending I Was Fine'],
  ['listening-mind-over-matter','U4 · Listening — Wellbeing Podcast'],
  ['grammar-lab-u4-by-level','U4 · Grammar Practice by Level'],
  ['crossword-mind-over-matter','U4 · Crossword by Level'],
  ['wordsearch-mind-over-matter','U4 · Word Search by Level'],
  ['word-wheel-u4-by-level','U4 · Word Wheel by Level']
];
function acActLabel(k){ const f=AC_ACTIVITIES.find(a=>a[0]===k); return f?f[1]:(k||'—'); }
const AC_EVENT = { tab_switch:'⚠️ Salida', reported:'🚩 Reportado', locked:'⛔ Eliminada (C)', translate_detected:'🌐 Traductor' };
async function antiCheatPanel(){
  const { data, error } = await sb.from('anticheat_incidents')
    .select('id,student_id,activity,activity_label,level,event,lives_left,switch_count,seconds_away,os,browser,screen,grade_assigned,created_at, profiles(full_name,grades(name))')
    .order('created_at',{ascending:false}).limit(500);
  // alumnos para el selector del formulario
  const { data:studs } = await sb.from('profiles').select('id,full_name,grades(name)').eq('role','student').order('full_name');
  const studOpts = (studs||[]).map(s=>`<option value="${s.id}">${esc(s.full_name||'')}${s.grades?.name?(' · '+s.grades.name):''}</option>`).join('');
  const actOpts = AC_ACTIVITIES.map(a=>`<option value="${a[0]}">${esc(a[1])}</option>`).join('');

  const rows = (data||[]).map(a=>{
    const name = a.profiles?.full_name || '—';
    const grade = a.profiles?.grades?.name || '';
    const when = new Date(a.created_at).toLocaleString();
    const ev = AC_EVENT[a.event] || a.event;
    const dev = [a.os,a.browser,a.screen].filter(Boolean).join(' · ');
    const sname = esc(name).replace(/'/g,"\\'");
    const searchKey = esc((name+' '+grade+' '+acActLabel(a.activity)).toLowerCase());
    return `<tr data-ev="${esc(a.event)}" data-search="${searchKey}">
      <td><b>${esc(name)}</b>${grade?` <span class="badge grade">${esc(grade)}</span>`:''}</td>
      <td>${esc(acActLabel(a.activity))}${a.level?` <span class="muted">· ${esc(a.level)}</span>`:''}</td>
      <td style="text-align:center">${ev}</td>
      <td style="text-align:center">${a.lives_left!=null?a.lives_left:'—'}</td>
      <td class="muted" style="font-size:.78rem">${esc(dev)}</td>
      <td class="muted" style="font-size:.78rem;white-space:nowrap">${esc(when)}</td>
      <td style="text-align:center"><button class="btn sm" onclick="window._acGrant('${a.student_id}','${esc(a.activity)}','${sname}',this)">➕ Vida</button></td>
    </tr>`;
  }).join('');

  $('#main').innerHTML=`<h1>🛡️ Honestidad — Anti-trampa</h1>
    <div class="note">Cada actividad da <b>3 vidas</b>: salir de la pantalla (cambiar de pestaña, app o ventana) descuenta una. A la 2.ª se <b>reporta</b>, a la 3.ª se <b>elimina la actividad con nota C</b> y se notifica. Aquí puedes <b>otorgar una vida extra</b> a un alumno en una actividad concreta; el alumno la recibe al recargar (o pulsando «reintentar» si quedó bloqueado). Docentes y administradores están exentos del control. <b>El navegador no permite ver otras pestañas</b>; solo se registran los metadatos del evento.</div>

    <div class="card">
      <h2>➕ Dar vida extra</h2>
      <div class="row" style="gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">ALUMNO</label>
          <select id="ac_stud" style="min-width:240px">${studOpts}</select></div>
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">ACTIVIDAD</label>
          <select id="ac_act" style="min-width:220px">${actOpts}</select></div>
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">VIDAS EXTRA</label>
          <input id="ac_qty" type="number" min="1" max="20" value="1" style="width:84px"></div>
        <button class="btn" onclick="window._acGrantForm(this)">Otorgar vidas</button>
      </div>
      <div id="ac_msg" class="muted" style="margin-top:8px"></div>
    </div>

    <div class="card" style="padding:0">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px 0">
        <h2 style="margin:0">Incidentes recientes</h2>
        <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">
          <input id="ac_search" type="search" placeholder="🔎 Buscar alumno o actividad…" oninput="window._acApplyFilters()" style="min-width:220px">
          <select id="ac_filter" onchange="window._acApplyFilters()" style="min-width:160px">
            <option value="">Todos los eventos</option>
            <option value="locked">Solo eliminadas (C)</option>
            <option value="reported">Solo reportados</option>
            <option value="tab_switch">Solo salidas</option>
          </select>
        </div>
      </div>
      <div style="overflow-x:auto"><table>
        <thead><tr><th style="text-align:left">Alumno</th><th style="text-align:left">Actividad</th><th>Evento</th><th>Vidas</th><th style="text-align:left">Equipo</th><th style="text-align:left">Fecha</th><th>Acción</th></tr></thead>
        <tbody id="ac_rows">${rows || `<tr><td colspan="7" class="center muted" style="padding:20px">Sin incidentes registrados.</td></tr>`}<tr id="ac_empty" style="display:none"><td colspan="7" class="center muted" style="padding:20px">Ningún incidente coincide con la búsqueda.</td></tr></tbody>
      </table></div>
    </div>
    ${error?`<div class="note err">${esc(error.message)}</div>`:''}`;
}
window._acApplyFilters=()=>{
  const ev=($('#ac_filter')?.value)||'';
  const q=(($('#ac_search')?.value)||'').trim().toLowerCase();
  let shown=0;
  document.querySelectorAll('#ac_rows tr[data-ev]').forEach(tr=>{
    const okEv = !ev || tr.dataset.ev===ev;
    const okQ  = !q  || (tr.dataset.search||'').indexOf(q)>=0;
    const vis = okEv && okQ;
    tr.style.display = vis ? '' : 'none';
    if(vis) shown++;
  });
  const empty=$('#ac_empty');
  if(empty) empty.style.display = shown ? 'none' : '';
};
// Compatibilidad: llamadas antiguas a _acFilter siguen funcionando.
window._acFilter=()=>window._acApplyFilters();
async function _acInsertGrant(studentId, activity, qty){
  const uid=(state.session&&state.session.user&&state.session.user.id)||null;
  const n=Math.max(1, Math.min(20, parseInt(qty,10)||1));
  return sb.from('anticheat_grants').insert({ student_id:studentId, activity, extra_lives:n, granted_by:uid });
}
window._acGrant=async(studentId, activity, name, btn)=>{
  const ans=prompt(`¿Cuántas vidas extra dar a ${name} en «${acActLabel(activity)}»?`, '1');
  if(ans===null) return;
  const n=Math.max(1, Math.min(20, parseInt(ans,10)||0));
  if(!n){ alert('Número no válido.'); return; }
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const { error } = await _acInsertGrant(studentId, activity, n);
  if(btn){ btn.disabled=false; btn.textContent = error?'➕ Vida':`✓ +${n}`; }
  if(error) alert('No se pudo otorgar: '+error.message);
};
window._acGrantForm=async(btn)=>{
  const studSel=$('#ac_stud'), actSel=$('#ac_act'), msg=$('#ac_msg');
  const studentId=studSel.value, activity=actSel.value, qty=$('#ac_qty')?.value||1;
  const n=Math.max(1, Math.min(20, parseInt(qty,10)||1));
  const name=studSel.options[studSel.selectedIndex]?.text||'';
  btn.disabled=true;
  const { error } = await _acInsertGrant(studentId, activity, n);
  btn.disabled=false;
  msg.innerHTML = error
    ? `<span style="color:var(--danger,#b91c1c)">No se pudo: ${esc(error.message)}</span>`
    : `✓ <b>${n}</b> vida(s) extra otorgada(s) a <b>${esc(name)}</b> en <b>${esc(acActLabel(activity))}</b>. El alumno las recibe al recargar la actividad.`;
};
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
  const { data:tna } = await sb.from('teacher_node_access').select('profile_id,node_key,allowed');
  const tnaMap={}; (tna||[]).forEach(r=>{ const m=tnaMap[r.profile_id]=tnaMap[r.profile_id]||new Set(); if(r.allowed) m.add(r.node_key); });
  const teachers=profs||[];
  const chipCss="display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:8px;padding:4px 9px;font-size:.85rem";
  const cards=teachers.map(t=>{
    const a=amap[t.id]||{can_results:true,can_students:false,all_grades:true,grades:[]};
    const gradeChips=GRADES.map(g=>`<label style="${chipCss}"><input type="checkbox" class="tg-grade" value="${g.id}" ${(a.grades||[]).includes(g.id)?'checked':''} ${a.all_grades?'disabled':''}> ${g.name}</label>`).join('');
    const managed=tnaMap[t.id];
    const _nodeChip=(key,label)=>`<label style="${chipCss}"><input type="checkbox" class="tg-node" value="${key}" ${(managed? managed.has(key): true)?'checked':''}> ${esc(label)}</label>`;
    // Unidades y semanas no se asignan al profesor por separado (heredan de
    // su Activities), así que quedan fuera de los chips generales.
    const _gradeKeySet=new Set([...ALL_GRADE_ORDER.flatMap(g=>['english.classes.'+g,'english.classes.'+g+'.activities','english.classes.'+g+'.grammar']),'english.classes.g9.cambridge','english.classes.g9.cambridge.listening','english.classes.g9.uoe1','english.classes.g9.writing','english.classes.g9.unit5','english.classes.g9.unitexams','english.classes.g6.units','english.classes.g7.units','english.classes.g8.units','english.classes.g2.units','english.classes.g3.units','english.classes.g4.units','english.classes.g5.units','english.classes.g10.units','english.classes.g11.units','english.classes.g9.reader','english.classes.g7.reader',..._SUB_NODES.map(n=>n.key)]);
    const generalChips=ACCESS_NODES.filter(n=>!_gradeKeySet.has(n.key)).map(n=>_nodeChip(n.key,n.label)).join('');
    // Primaria (2.º–5.º) sin Grammar: en esa etapa la gramática vive dentro
    // de las actividades, igual que en francés.
    const gradeBlocks=ALL_GRADE_ORDER.map(g=>{
      const items=[['english.classes.'+g,'Classes'],['english.classes.'+g+'.activities','🎲 Activities']];
      if(!_isPrimaryGrade(g)) items.push(['english.classes.'+g+'.grammar','📝 Grammar']);
      if(g==='g7') items.push(['english.classes.g7.reader','📚 Readers']);
      if(g!=='g9') items.push(['english.classes.'+g+'.units','🎯 Units']);
      if(g==='g9') items.push(['english.classes.g9.cambridge','🎓 Cambridge'],['english.classes.g9.cambridge.listening','🎧 Cambridge Listening'],['english.classes.g9.uoe1','🧩 Use of English P1'],['english.classes.g9.writing','✍️ Writing'],['english.classes.g9.unit5','🎯 Unit 5'],['english.classes.g9.reader','📚 Readers'],['english.classes.g9.unitexams','📋 Unit Exams']);
      return `<div class="row" style="gap:6px;align-items:center;margin-top:5px;flex-wrap:wrap"><span class="muted" style="font-size:.8rem;min-width:84px">${GRADE_META[g][0]} ${GRADE_META[g][1]}</span>${items.map(it=>_nodeChip(it[0],it[1])).join('')}</div>`;
    }).join('');
    const suspended = t.active===false;
    return `<div class="card" data-tid="${t.id}" style="${suspended?'opacity:.6':''}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <h2 style="margin:0;font-size:1.1rem">${esc(t.full_name||t.email)} ${suspended?'<span class="badge off" style="font-size:.7rem;vertical-align:middle">Suspendido</span>':''}</h2>
        <div style="text-align:right">
          <span class="muted" style="font-size:.82rem;display:block">${esc(t.email||'')}</span>
          <span style="display:inline-flex;align-items:center;gap:5px;margin-top:3px">
            <span class="muted" style="font-size:.8rem">Acceso:</span>
            <button onclick="window._resetPw('${t.id}')" title="Asignar una contraseña nueva"
              style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;line-height:1;color:var(--muted)">🔑 Cambiar contraseña</button>
          </span>
          <span id="pw-box-${t.id}" style="display:none;margin-top:6px;gap:6px;align-items:center;justify-content:flex-end">
            <input id="pw-new-${t.id}" type="password" placeholder="Nueva contraseña (mín. 8)"
              style="padding:5px 8px;border:1px solid var(--line);border-radius:7px;font-size:.82rem;width:190px">
            <button class="btn small" onclick="window._guardaPw('${t.id}')">Guardar</button>
            <span id="pw-msg-${t.id}" style="font-size:.78rem"></span>
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
      <div class="muted" style="margin:10px 0 4px;font-size:.85rem">Tarjetas que ve y gestiona:</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">${generalChips}</div>
      <div class="muted" style="margin:8px 0 2px;font-size:.8rem">Classes — por grado (cada uno: la tarjeta del grado, sus Activities y su Grammar):</div>
      ${gradeBlocks}
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
window.adminNewTeacher=()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminTeachers()">← Volver a Profesores</button>
    <div class="card" style="max-width:560px;margin-top:12px"><h2 style="margin-top:0">Agregar Profesor</h2>
    <div class="field-2"><div><label>Nombres</label><input id="nt_first" placeholder="Ej: María"></div><div><label>Apellidos</label><input id="nt_last" placeholder="Ej: García"></div></div>
    <label>Correo electrónico</label><input id="nt_email" type="email" placeholder="nombre.apellido@nordic-school.edu.pe">
    <label style="margin-top:10px;display:block">Contraseña</label>
    <div style="position:relative;display:flex;align-items:center">
      <input id="nt_pw" type="password" placeholder="Mínimo 8 caracteres" style="flex:1;padding-right:40px">
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
  if(pw.length<8) return msg.innerHTML='<div class="note err">La contraseña debe tener al menos 8 caracteres.</div>';
  msg.innerHTML='<div class="note">Creando cuenta…</div>';
  const meta={ first_name:first, last_name:last, full_name:first+' '+last, role:'teacher', academic_year:new Date().getFullYear() };
  let rpcErr=null, timedOut=false;
  try{
    const rpcPromise=sb.rpc('admin_create_user',{p_email:email,p_password:pw,p_meta:meta});
    // La creación en BD es instantánea, pero la red/pooler puede tardar. Damos 30s.
    const timeout=new Promise((_,rej)=>setTimeout(()=>{ timedOut=true; rej(new Error('__timeout__')); },30000));
    const {error}=await Promise.race([rpcPromise,timeout]);
    rpcErr=error||null;
  }catch(e){ rpcErr=e; }
  if(timedOut){
    msg.innerHTML='<div class="note">La creación está tardando más de lo normal por la conexión. <b>Es muy posible que la cuenta SÍ se haya creado.</b> Volviendo a la lista de Profesores para que verifiques — <b>no uses el mismo correo dos veces</b>. Si no aparece, espera unos segundos y recarga.</div>';
    setTimeout(adminTeachers, 3000);
    return;
  }
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
  if(error){ msgEl.textContent='⚠ '+error.message; return; }
  const uid=(state.session&&state.session.user&&state.session.user.id)||null;
  const nodeRows=[...card.querySelectorAll('.tg-node')].map(c=>({profile_id:id,node_key:c.value,allowed:c.checked,updated_at:new Date().toISOString(),updated_by:uid}));
  const { error:e2 } = nodeRows.length ? await sb.from('teacher_node_access').upsert(nodeRows,{onConflict:'profile_id,node_key'}) : {error:null};
  msgEl.textContent = e2 ? ('⚠ '+e2.message) : '✓ Guardado';
};
/* Vista previa del motor de exámenes para admin/profesor: abre el mismo quiz que
   ve el alumno (branch 'mocks' o 'practice') en una pestaña nueva. nis-bridge.js
   deja pasar SIEMPRE a admin y profesores, así que la previa funciona aunque el
   grado esté bloqueado. El nivel y el número de examen se eligen dentro. */
function _examPreviewCard(branch){
  const isMock = branch==='mocks';
  const q = s => `${QUIZ_URL}${s}-quiz.html?branch=${branch}`;
  const btn = (href,label) => `<a class="btn sm ghost" href="${href}" target="_blank" rel="noopener" style="text-decoration:none">${label} ↗</a>`;
  return `<div class="card">
      <h2 style="margin:0 0 4px">👁️ Ver los ${isMock?'Mocks':'Practice Tests'}</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:12px">Ábrelos como los ve el alumno${isMock?' (MOCK 1 · 2 y el nivel se eligen dentro)':' (el nivel y la práctica 1 · 2 · 3 se eligen dentro)'}. Profesores y administradores <b>siempre</b> pueden verlos, incluso con el grado bloqueado.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${btn(q('reading'),'📖 Reading &amp; UoE')}
        ${btn(q('listening'),'🎧 Listening')}
        ${btn(q('writing'),'✍️ Writing')}
      </div>
    </div>`;
}
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
    <div class="note">Por defecto los <b>MOCKS están bloqueados</b> para los alumnos: son exámenes oficiales y solo el admin los habilita por grado cuando se programan. Los <b>Practice Tests</b> se gestionan en su pestaña 🎯 (admin y profesores). Profesores y administradores siempre ven los mocks.</div>
    ${_examPreviewCard('mocks')}
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
/* 🎯 Practice Tests — control por grado. A diferencia de los Mocks (admin-only),
   aquí también escriben los profesores cuyo teacher_access cubre el grado (RLS
   practice_access). Sin fila en la tabla ⇒ DESBLOQUEADO (default abierto). */
async function practicePanel(gradeList){
  const { data, error } = await sb.from('practice_access').select('grade_id, unlocked, updated_at').order('grade_id');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const map={}; (data||[]).forEach(r=>map[r.grade_id]=r);
  const rows = (gradeList||GRADES).map(g=>{
    const r=map[g.id]; const on = r ? !!r.unlocked : true; // default: abierto
    const when = (r&&r.updated_at)?new Date(r.updated_at).toLocaleString():'';
    return `<tr>
      <td><b>${g.name}</b></td>
      <td><span class="badge ${on?'on':'off'}">${on?'🔓 Desbloqueado':'🔒 Bloqueado'}</span></td>
      <td class="muted" style="font-size:.82rem">${when}</td>
      <td><button class="btn sm ${on?'ghost':''}" onclick="window._togglePractice(${g.id}, ${on?'false':'true'}, this)">${on?'Bloquear':'Desbloquear'}</button></td>
    </tr>`;
  }).join('');
  $('#main').innerHTML = `<h1>Practice Tests — control de acceso</h1>
    <div class="note">Los <b>PRACTICE TESTS están desbloqueados por defecto</b> (práctica libre). Bloquéalos por grado cuando quieras reservarlos para usarlos en clase, y desbloquéalos al terminar. Los <b>Mocks</b> (exámenes oficiales) se gestionan aparte y solo por el admin.</div>
    ${_examPreviewCard('practice')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Grado</th><th>Estado de Practice Tests</th><th>Última actualización</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
}
window._togglePractice = async (gradeId, to, btn)=>{
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const { error } = await sb.from('practice_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'grade_id' });
  if(error){ alert('No se pudo actualizar: '+error.message); }
  practicePanel(state.profile && state.profile.role==='admin' ? GRADES : teacherAllowedGrades());
};
async function adminUsers(){
  const { data:profs, error } = await sb.from('profiles').select('*, grades(name)').order('created_at',{ascending:false});
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const all = profs||[];
  const years = [...new Set(all.map(p=>p.academic_year||2026))];
  if(!years.includes(2026)) years.push(2026);
  if(!years.includes(new Date().getFullYear())) years.push(new Date().getFullYear());
  years.sort((a,b)=>a-b);
  const fg=userFilter.grade, fy=userFilter.year, fr=userFilter.role, fs=userFilter.section, showInactive=!!userFilter.showInactive;
  const suspendedCount = all.filter(p=>p.active===false).length;
  const secciones = [...new Set(all.map(p=>(p.section||'').trim()).filter(Boolean))].sort();

  /* Aquí no están solo los alumnos: están los profesores, los administradores
     y las cuentas de demostración. El tipo se elige con los botones de arriba;
     "Demo" no es un rol, es la marca profiles.is_demo. */
  const esTipo = (p, t) => t==='demo' ? p.is_demo===true : p.role===t;
  const pasaResto = p => (!fg||String(p.grade_id)===String(fg))
      && (!fy||String(p.academic_year||2026)===String(fy))
      && (!fs||(p.section||'').trim()===fs)
      && (showInactive || p.active!==false);
  const list = all.filter(p => pasaResto(p) && (!fr || esTipo(p, fr)));

  const TIPOS = [['','Todos','👥'],['student','Alumnos','🎒'],['teacher','Profesores','👨‍🏫'],
                 ['admin','Admins','🛡️'],['demo','Demos','🧪']];
  const botonesTipo = TIPOS.map(([v,l,ic])=>{
    const n = all.filter(p => pasaResto(p) && (!v || esTipo(p, v))).length;
    return `<button class="btn sm ${fr===v?'':'ghost'}" onclick="window._setUserFilter('role','${v}')"
      title="Ver solo ${l.toLowerCase()}">${ic} ${l} <b>${n}</b></button>`;
  }).join(' ');

  const gradeOpts = `<option value="">Todos los grados</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(fg)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const yearOpts = `<option value="">Todos los años</option>`+years.map(y=>`<option value="${y}" ${String(fy)===String(y)?'selected':''}>${y}</option>`).join('');
  const seccionOpts = `<option value="">Todas las secciones</option>`+secciones.map(s=>`<option value="${esc(s)}" ${fs===s?'selected':''}>Sección ${esc(s)}</option>`).join('');
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
      <td><span class="badge ${p.role==='student'?'':'on'}">${esc(p.role)}</span>${p.is_demo?' <span class="badge" title="Cuenta de demostración">🧪 demo</span>':''}</td>
      <td><span class="badge ${suspended?'off':'on'}">${suspended?'Suspendido':'Activo'}</span></td>
      <td class="acts"><div class="acts-wrap">${p.role==='student'?`<button class="btn sm ghost" onclick="window._previewStudent('${p.id}','${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')" title="Ver el portal tal como lo ve este alumno">👁️ Ver como</button> <button class="btn sm ghost" onclick="window._openStudentAccess('${p.id}',${p.grade_id||'null'},'${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')">🔧 Accesos</button> <button class="btn sm ghost" onclick="window.resetStudentPassword('${p.id}','${esc((p.full_name||p.email||'').replace(/'/g,'’'))}','${esc((p.email||'').replace(/'/g,'’'))}')" title="Asignar una contraseña temporal nueva">🔑 Restablecer</button> `:''}<button class="btn sm ghost" onclick="editUser('${p.id}')">Editar</button> ${toggleBtn} <button class="btn sm danger" onclick="deleteUser('${p.id}','user')">Eliminar</button></div></td>
    </tr>`;}).join('');
  $('#main').innerHTML=`<div class="row" style="justify-content:space-between;align-items:center"><h1>Usuarios</h1>
      <button class="btn sm" onclick="adminNewUser()">+ Nuevo</button></div>
    <div class="card">
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:14px">${botonesTipo}</div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
        <div><label>Grado</label><select onchange="window._setUserFilter('grade',this.value)" style="min-width:170px">${gradeOpts}</select></div>
        <div><label>Sección</label><select onchange="window._setUserFilter('section',this.value)" style="min-width:150px">${seccionOpts}</select></div>
        <div><label>Año académico</label><select onchange="window._setUserFilter('year',this.value)" style="min-width:150px">${yearOpts}</select></div>
        <label style="display:flex;align-items:center;gap:7px;font-weight:500;margin:0 0 10px"><input type="checkbox" ${showInactive?'checked':''} onchange="window._setUserFilter('showInactive',this.checked)" style="width:auto"> Mostrar suspendidos${suspendedCount?` (${suspendedCount})`:''}</label>
        <div class="muted" style="padding-bottom:11px">${list.length} usuario(s)</div>
        ${(fr||fg||fy||fs) ? `<button class="btn sm ghost" style="margin-bottom:8px" onclick="window._limpiaUserFiltro()">Quitar filtros</button>` : ''}
      </div>
    </div>
    <div class="card" style="padding:0;overflow-x:auto">
      <table class="usuarios"><thead><tr><th>Nombre</th><th>Grado</th><th>Año</th><th>Nivel</th><th>Rol</th><th>Estado</th><th></th></tr></thead>
      <tbody>${rows||'<tr><td colspan="7" class="center muted">No hay usuarios con ese filtro.</td></tr>'}</tbody></table>
    </div>`;
}
window._setUserFilter = (k,v)=>{ userFilter[k]=v; adminUsers(); };
window._limpiaUserFiltro = ()=>{ userFilter = { grade:'', year:'', role:'', section:'',
  showInactive:userFilter.showInactive }; adminUsers(); };

/* Contraseña temporal para alumnos.
   La clave solo existe en memoria durante este flujo: se envía a Auth mediante
   admin_set_password y NO se persiste una copia visible o recuperable. */
function _generateTemporaryPassword(){
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const symbols = '!@#$%';
  const bytes = new Uint32Array(11);
  if(window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
  else for(let i=0;i<bytes.length;i++) bytes[i] = Math.floor(Math.random()*0xFFFFFFFF);
  let out = 'Nis-';
  for(let i=0;i<8;i++) out += alphabet[bytes[i] % alphabet.length];
  out += symbols[bytes[8] % symbols.length];
  out += String(bytes[9] % 10);
  out += String(bytes[10] % 10);
  return out;
}

window.resetStudentPassword = function(id, name, email){
  const suggested = _generateTemporaryPassword();
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Volver a Usuarios</button>
    <div class="card" style="max-width:620px">
      <h2>🔑 Restablecer contraseña</h2>
      <p><b>${esc(name||'Alumno')}</b></p>
      <p class="muted" style="margin-top:-8px">${esc(email||'')}</p>
      <div class="note">Esta acción reemplaza la contraseña anterior. La nueva clave se mostrará aquí para que puedas copiarla y entregársela al alumno. NIS no conservará una copia visible.</div>
      <label>Nueva contraseña temporal</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="rp_pw" type="text" autocomplete="off" value="${esc(suggested)}" style="flex:1;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-weight:700;letter-spacing:.4px">
        <button class="btn sm ghost" type="button" onclick="window.regenerateStudentPassword()">↻ Generar otra</button>
      </div>
      <p class="muted" style="font-size:.82rem">Puedes usar la sugerida o escribir otra. Mínimo 8 caracteres recomendado.</p>
      <div id="rp_msg"></div>
      <div class="row" style="margin-top:14px;gap:8px">
        <button id="rp_save" class="btn" onclick="window.saveStudentPassword('${id}')">Cambiar contraseña</button>
        <button class="btn ghost" onclick="adminUsers()">Cancelar</button>
      </div>
    </div>`;
  const input=$('#rp_pw'); if(input){ input.focus(); input.select(); }
};

window.regenerateStudentPassword = function(){
  const input=$('#rp_pw');
  if(!input) return;
  input.value=_generateTemporaryPassword();
  input.focus(); input.select();
};

window.saveStudentPassword = async function(id){
  const input=$('#rp_pw'), msg=$('#rp_msg'), btn=$('#rp_save');
  const pw=(input && input.value || '').trim();
  if(pw.length<8){ msg.innerHTML='<div class="note err">Usa al menos 8 caracteres para la contraseña temporal.</div>'; return; }
  if(btn){ btn.disabled=true; btn.textContent='Cambiando…'; }
  msg.innerHTML='<div class="note">Actualizando la contraseña…</div>';
  const r=await sb.rpc('admin_set_password',{p_id:id,p_password:pw});
  if(r.error){
    msg.innerHTML=`<div class="note err">${esc(r.error.message)}</div>`;
    if(btn){ btn.disabled=false; btn.textContent='Cambiar contraseña'; }
    return;
  }
  // Mantenerla visible solo en esta pantalla para poder entregársela al alumno.
  input.readOnly=true;
  msg.innerHTML=`<div class="note ok"><b>Contraseña cambiada.</b> La contraseña anterior ya no funciona.<br>
    <div class="row" style="margin-top:10px;gap:8px;align-items:center;flex-wrap:wrap">
      <code id="rp_result" style="font-size:1.05rem;font-weight:800;user-select:all">${esc(pw)}</code>
      <button class="btn sm" onclick="window.copyTemporaryPassword()">📋 Copiar</button>
    </div>
    <div class="muted" style="margin-top:8px">Al salir de esta pantalla NIS no volverá a mostrar esta clave.</div></div>`;
  if(btn) btn.style.display='none';
};

window.copyTemporaryPassword = async function(){
  const el=$('#rp_result'); if(!el) return;
  const text=el.textContent||'';
  try{
    await navigator.clipboard.writeText(text);
    const old=el.nextElementSibling;
    if(old){ old.textContent='✓ Copiada'; setTimeout(()=>{ old.textContent='📋 Copiar'; },1600); }
  }catch(_){
    const range=document.createRange(); range.selectNodeContents(el);
    const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }
};
window.adminNewUser = ()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Volver</button>
    <div class="card" style="max-width:600px"><h2>Nuevo usuario</h2>
    <div class="field-2"><div><label>Nombres</label><input id="n_first"></div><div><label>Apellidos</label><input id="n_last"></div></div>
    <label>Correo</label><input id="n_email" type="email" placeholder="nombre.apellido@nordic-school.edu.pe">
    <div class="field-2"><div><label>Rol</label><select id="n_role"><option value="student">student</option><option value="teacher">teacher</option><option value="admin">admin</option></select></div>
      <div><label>Contraseña</label><input id="n_pw" type="password" autocomplete="new-password" placeholder="mín. 8 caracteres"></div></div>
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
  if(pw.length<8) return $('#nmsg').innerHTML='<div class="note err">La contraseña debe tener al menos 8 caracteres.</div>';
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
      <label style="display:flex;align-items:center;gap:8px;font-weight:500">
        <input type="checkbox" id="e_demo" ${p.is_demo?'checked':''} style="width:auto">
        🧪 Cuenta de demostración (no es un alumno ni un profesor real del colegio)</label>
      <label>Restablecer contraseña de acceso (opcional)</label><input id="e_pw" type="password" autocomplete="new-password" placeholder="dejar vacío para no cambiar · mín. 8 caracteres">
      <div id="emsg"></div>
      <div class="row" style="margin-top:14px"><button class="btn" onclick="saveUser('${id}')">Guardar</button></div>
    </div>`;
};
window.saveUser = async (id)=>{
  const upd={ grade_id:+$('#e_grade').value, section:$('#e_section').value.trim()||null,
    cefr_level:$('#e_level').value||null, role:$('#e_role').value, active:$('#e_active').value==='true',
    academic_year:+($('#e_year').value||2026), is_demo:$('#e_demo').checked };
  const { error } = await sb.from('profiles').update(upd).eq('id',id);
  const pw=$('#e_pw').value.trim();
  let pwErr=null;
  if(pw){
    if(pw.length<8){ $('#emsg').innerHTML='<div class="note err">La contraseña debe tener al menos 8 caracteres.</div>'; return; }
    // Cambia la contraseña REAL de Auth (no solo la visible), para que el usuario pueda entrar.
    const r = await sb.rpc('admin_set_password',{p_id:id,p_password:pw});
    pwErr = r.error;
  }
  const err = error||pwErr;
  $('#emsg').innerHTML = err?`<div class="note err">${esc(err.message)}</div>`:`<div class="note ok">Guardado.${pw?' Contraseña actualizada — el usuario ya puede entrar con la nueva.':''}</div>`;
  if(!err) setTimeout(adminUsers,900);
};
/* Permanently delete a user (admin only). Cascades to results, credentials and
   teacher access via the DB. Guarded server-side: can't delete self or the last admin. */
window.deleteUser = async (id, kind)=>{
  const el = document.querySelector(`tr[data-id="${id}"]`) || document.querySelector(`.card[data-tid="${id}"]`);
  const name = el ? ((el.querySelector('b')||el.querySelector('h2'))||{}).textContent || 'este usuario' : 'este usuario';
  if(!await NISUI.pregunta(`Se borrará la cuenta de ${name} y TODOS sus resultados. Esto no se puede deshacer.`, {titulo:'¿Eliminar definitivamente?', si:'Sí, eliminar', no:'Cancelar', tono:'mal', peligro:true})) return;
  const { error } = await sb.rpc('admin_delete_user', { p_id:id });
  if(error){ alert('No se pudo eliminar: '+error.message); return; }
  (kind==='teacher' ? adminTeachers : adminUsers)();
};
/* Suspend (soft): keep the account + data but block access and hide it from the
   default list. Reversible with Reactivar. */
window.suspendUser = async (id, to, kind)=>{
  if(!to && !await NISUI.pregunta('No podrá iniciar sesión y se ocultará de la lista. Puedes reactivarlo cuando quieras.', {titulo:'¿Suspender este usuario?', si:'Suspender', no:'Cancelar', tono:'ojo'})) return;
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
    return `<tr data-sname="${esc((a.profiles?.full_name||'').toLowerCase())}">
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
    <div id="resCount" data-noun="resultado(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} resultado(s)</div></div>`;
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
    s.src='vendor/chart.umd.min.js';
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
  // Tarjetas (nodos) que el admin asignó a este profesor. Sin filas → ve todo.
  try{
    const { data:tn } = await sb.from('teacher_node_access').select('node_key,allowed').eq('profile_id', state.session.user.id);
    state.teacherNodes = { has:(tn||[]).length>0, set:new Set((tn||[]).filter(r=>r.allowed).map(r=>r.node_key)) };
  }catch(e){ state.teacherNodes={ has:false, set:new Set() }; }
  return state.teacherAccess;
}
function teacherAllowedGrades(){
  const acc = state.teacherAccess || { all_grades:true, grades:[] };
  return acc.all_grades ? GRADES : GRADES.filter(g => (acc.grades||[]).includes(g.id));
}
/* ============================================================
   CONTROLES DE LECTURA — informe de los readers
   Un solo cálculo para las dos vistas (profesor y alumno). Los intentos ya
   viven en activity_attempts; lo que los distingue es la clave `activity`:
     <obra>-exam-<nivel>-ch<N>    el control del capítulo (con nota)
     <obra>-<nivel>-ch<N>-read    el rato de lectura con audio (sin nota)
     <obra>-<nivel>-ch<N>-<act>   las otras 12 actividades del capítulo
   La NOTA del capítulo es el mejor intento del control, como en el resto del
   portal. La lectura y los ejercicios no mueven la nota: son la evidencia de
   trabajo que se mira al lado. Nota de la obra = promedio de los capítulos
   rendidos; nota general = promedio de las obras con nota.
   ============================================================ */
const READER_META={
  attwn:    {icon:'🏝️', title:'And Then There Were None',        short:'ATTWN',      chapters:10},
  earnest:  {icon:'🎩', title:'The Importance of Being Earnest', short:'Earnest',    chapters:9},
  tomsawyer:{icon:'🚣', title:'The Adventures of Tom Sawyer',    short:'Tom Sawyer', chapters:8},
  princepauper:{icon:'👑', title:'The Prince and the Pauper',   short:'Prince & Pauper', chapters:8},
  treasureisland:{icon:'🏴‍☠️', title:'Treasure Island',           short:'Treasure Island', chapters:11}
};
const _RDR_IDS=Object.keys(READER_META);
const _RDR_EXAM_RX=/^([a-z]+)-exam-([a-z][0-9])-ch(\d+)$/;
const _RDR_ACT_RX=/^([a-z]+)-([a-z][0-9])-ch(\d+)-(.+)$/;
const _rdrOr=()=>_RDR_IDS.map(id=>'activity.like.'+id+'-*').join(',');
function _rdrPct(s,t){ return (t&&s!=null)? Math.round(s/t*100) : null; }
function _rdr20(p){ return (Math.round(p/5*10)/10).toFixed(1); }
/* Escala del colegio (MINEDU): AD · A · B · C, de mayor a menor — NO la A/B/C
   anglosajona. Mismos cortes que la banda del examen (attwn-exam.html), para
   que el alumno y el profesor lean exactamente la misma letra. */
function _rdrLvl(p){ return p>=90?'AD':p>=70?'A':p>=55?'B':'C'; }
const _RDR_LVL_COL={AD:'#059669',A:'#0d9488',B:'#b45309',C:'#dc2626'};
function _rdrMark(p){ if(p==null) return '<span class="muted">—</span>';
  const L=_rdrLvl(p);
  return `<b style="color:${_RDR_LVL_COL[L]}">${L}</b> <b>${p}%</b> <span class="muted" style="font-size:.78rem">${_rdr20(p)}/20</span>`; }
function _rdrTime(s){ s=Math.round(s||0); if(!s) return '<span class="muted">—</span>';
  const h=Math.floor(s/3600), m=Math.round((s%3600)/60);
  return h ? h+'h '+String(m).padStart(2,'0')+'m' : (m? m+'m' : '&lt;1m'); }
function _rdrAvg(list){ const v=(list||[]).filter(x=>x!=null); return v.length? Math.round(v.reduce((s,x)=>s+x,0)/v.length) : null; }

/* Intentos de UN alumno → {obras → capítulos} + totales. */
function readerReport(atts){
  const books={};
  (atts||[]).forEach(a=>{
    const act=String(a.activity||''); let m, kind, id, lvl, ch, actId;
    if((m=_RDR_EXAM_RX.exec(act))){ kind='exam'; id=m[1]; lvl=m[2]; ch=+m[3]; }
    else if((m=_RDR_ACT_RX.exec(act))){ id=m[1]; lvl=m[2]; ch=+m[3]; actId=m[4]; kind=(actId==='read'?'read':'act'); }
    else return;                                   // extras, juegos y todo lo demás no son controles
    if(!READER_META[id]) return;
    const b=books[id]||(books[id]={id, readSec:0, actSec:0, examSec:0, chapters:{}});
    const c=b.chapters[ch]||(b.chapters[ch]={n:ch, best:null, tries:0, readSec:0, actSec:0, acts:{}, levels:{}, last:null});
    const secs=a.duration_sec||0;
    if(lvl) c.levels[lvl.toUpperCase()]=1;
    if(kind==='exam'){
      c.tries++; b.examSec+=secs;
      const p=_rdrPct(a.score,a.total);
      if(p!=null && (c.best==null || p>c.best)) c.best=p;
      if(!c.last || String(a.submitted_at||'')>c.last) c.last=a.submitted_at;
    }
    else if(kind==='read'){ c.readSec+=secs; b.readSec+=secs; }
    else { c.actSec+=secs; b.actSec+=secs; c.acts[actId]=(c.acts[actId]||0)+1; }
  });
  let readSec=0, actSec=0, examSec=0, tries=0;
  Object.values(books).forEach(b=>{
    const chs=Object.values(b.chapters);
    b.grade=_rdrAvg(chs.map(c=>c.best));
    b.done=chs.filter(c=>c.best!=null).length;
    b.actsDone=chs.reduce((s,c)=>s+Object.keys(c.acts).length,0);
    b.tries=chs.reduce((s,c)=>s+c.tries,0);
    readSec+=b.readSec; actSec+=b.actSec; examSec+=b.examSec; tries+=b.tries;
  });
  return {books, overall:_rdrAvg(_RDR_IDS.map(id=>books[id]&&books[id].grade)), readSec, actSec, examSec, tries};
}

/* Desglose capítulo a capítulo de una obra: la misma tabla la usan el
   profesor (detalle de un alumno) y el alumno (su libreta). `en` la pasa al
   inglés, que es el idioma del portal del alumno. */
function _rdrChapterTable(id,book,en){
  const meta=READER_META[id];
  const T = en
    ? {ch:'Chapter',mark:'Control mark',tries:'Attempts',read:'⏱ Reading',ex:'⏱ Exercises',
       exs:'Exercises',lvl:'Level',last:'Last control',none:'not taken yet',att:' attempt(s)',done:' taken'}
    : {ch:'Capítulo',mark:'Nota del control',tries:'Intentos',read:'⏱ Lectura',ex:'⏱ Ejercicios',
       exs:'Ejercicios',lvl:'Nivel',last:'Último control',none:'sin rendir',att:' intento(s)',done:' rendidos'};
  const rows=Array.from({length:meta.chapters},(_,i)=>{
    const c=(book&&book.chapters[i+1])||null;
    const worked=c && (c.readSec||c.actSec||c.tries);
    return `<tr${c&&c.best!=null?'':' style="background:#fcfdff"'}>
      <td><b>Ch. ${i+1}</b></td>
      <td>${c&&c.best!=null?_rdrMark(c.best):`<span class="muted">${T.none}</span>`}</td>
      <td class="muted">${c&&c.tries?c.tries+T.att:'—'}</td>
      <td>${c?_rdrTime(c.readSec):'<span class="muted">—</span>'}</td>
      <td>${c?_rdrTime(c.actSec):'<span class="muted">—</span>'}</td>
      <td class="muted">${c?Object.keys(c.acts).length+'/13':'—'}</td>
      <td class="muted">${c&&Object.keys(c.levels).length?Object.keys(c.levels).sort().join(' · '):'—'}</td>
      <td class="muted">${c&&c.last?new Date(c.last).toLocaleDateString():(worked?(en?'worked on':'trabajado'):'—')}</td>
    </tr>`;
  }).join('');
  return `<div class="card" style="padding:0;overflow-x:auto"><table>
    <thead><tr><th>${T.ch}</th><th>${T.mark}</th><th>${T.tries}</th><th>${T.read}</th><th>${T.ex}</th><th>${T.exs}</th><th>${T.lvl}</th><th>${T.last}</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr style="background:#f1f5f9"><td><b>${meta.icon} ${esc(meta.title)}</b></td>
      <td>${_rdrMark(book?book.grade:null)}</td>
      <td class="muted">${book?book.done:0}/${meta.chapters}${T.done}</td>
      <td>${_rdrTime(book&&book.readSec)}</td>
      <td>${_rdrTime(book&&book.actSec)}</td>
      <td class="muted">${book?book.actsDone:0}</td><td></td><td></td></tr></tfoot>
  </table></div>`;
}

const SCHOOL_YEAR_NOW=new Date().getFullYear();
const _attYear=a=>{ try{ return new Date(a.submitted_at).getFullYear(); }catch(e){ return null; } };
/* Un salon lee UNA obra por TRIMESTRE. Por eso el filtro va Anio -> Trimestre
   -> Grado -> Seccion: con esos cuatro la obra ya esta decidida (9.o en el 2.o
   trimestre es "And Then There Were None" y nada mas), y no hay que elegirla a
   mano. `term:null` = aun sin decidir; se rellena con el ultimo trimestre que
   tenga lecturas asignadas. */
const RDR_TERMS=[1,2,3];
const _rdrTermLab=t=>t+'.º trimestre';
let readerFilter={grade:'',section:'',term:null,year:SCHOOL_YEAR_NOW};
const RDR_LEVELS=['a2','b1','b2','c1'];      // una celda vale por los cuatro
function _rdrDefaultTerm(year){
  const ts=(READER_ASSIGN||[]).filter(r=>+r.school_year===+year).map(r=>+r.term);
  return ts.length?Math.max(...ts):2;
}
/* La(s) obra(s) que caen dentro del filtro. Con grado elegido es una sola: la
   que ese salon lee ese trimestre. Sin grado pueden ser varias (cada grado lee
   la suya) y entonces la pantalla vuelve al resumen por obra. */
function _rdrFilterBooks(grades){
  const ok=new Set((grades||[]).map(g=>String(g.id)));
  const sec=String(readerFilter.section||'');
  const ids=new Set((READER_ASSIGN||[]).filter(r=>
      +r.school_year===+readerFilter.year && +r.term===+readerFilter.term &&
      ok.has(String(r.grade_id)) &&
      (!readerFilter.grade || String(r.grade_id)===String(readerFilter.grade)) &&
      (!sec || String(r.section||'')==='' || String(r.section)===sec)).map(r=>r.book_id));
  return _RDR_IDS.filter(id=>ids.has(id));
}
/* De que obra es un intento: sirve para quedarse solo con lo del trimestre. */
function _rdrBookOfAtt(a){
  const act=String((a&&a.activity)||''), m=_RDR_EXAM_RX.exec(act)||_RDR_ACT_RX.exec(act);
  return (m&&READER_META[m[1]])?m[1]:null;
}
let readerTab='stats', examCtl={book:null, until:''};
/* La hora de cierre se mide con el reloj del SERVIDOR: si dependiera del
   navegador, atrasarlo dejaría el control abierto. */
let _rdrSkew=0;
async function _rdrSyncClock(){
  try{ const { data } = await sb.rpc('server_now');
    if(data) _rdrSkew=new Date(data).getTime()-Date.now(); }catch(e){}
}
const _rdrNow=()=>Date.now()+_rdrSkew;
function _rdrRowOpen(r){
  if(!r || !r.unlocked) return false;
  const t=_rdrNow();
  if(r.opens_at  && new Date(r.opens_at).getTime()  >  t) return false;
  if(r.closes_at && new Date(r.closes_at).getTime() <= t) return false;
  return true;
}
/* 'HH:MM' → hoy a esa hora; si ya pasó, mañana (una evaluación que se abre a
   las 8:00 para el día siguiente es lo normal a última hora de la tarde). */
function _rdrUntilISO(hhmm){
  if(!hhmm) return null;
  const m=/^(\d{1,2}):(\d{2})$/.exec(hhmm.trim()); if(!m) return null;
  const d=new Date(_rdrNow());
  d.setHours(+m[1],+m[2],0,0);
  if(d.getTime()<=_rdrNow()) d.setDate(d.getDate()+1);
  return d.toISOString();
}
const _rdrHM=iso=>{ try{ return new Date(iso).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } };
window._setReaderTab=(t)=>{ readerTab=t; readerStatsPanel(); };
function _readerTabs(){
  const b=(k,l)=>`<button class="btn sm ${readerTab===k?'':'ghost'}" onclick="window._setReaderTab('${k}')">${l}</button>`;
  return `<div class="row" style="gap:8px;margin:0 0 14px">${b('stats','📊 Notas y tiempos')}${b('tiempo','⏱️ Tiempo de lectura')}${b('control','🔓 Abrir / cerrar controles')}</div>`;
}
/* Estado efectivo de una clave para una cadena de alcances (la fila más
   específica manda; el tiempo extra es el mayor). Mismo criterio que la app
   del alumno, para que profesor y alumno vean lo mismo. */
function _rdrScopeChain(sc){
  const m=/^g(\d+)(?:-(.+))?$/.exec(sc||'');
  if(!m) return ['all'];
  return m[2] ? ['g'+m[1]+'-'+m[2],'g'+m[1],'all'] : ['g'+m[1],'all'];
}
function _rdrAccFor(rows,key,chain){
  let unlocked=false, extra=0, from=null, until=null;
  chain.forEach(sc=>{ const r=rows.find(x=>x.key===key && x.scope===sc);
    if(!r) return;
    if(from===null){ unlocked=_rdrRowOpen(r); from=sc; until=r.closes_at||null; }
    extra=Math.max(extra, r.extra_min||0); });
  return {unlocked, extra, from, until};
}
window._setReaderFilter=(k,v)=>{ readerFilter[k]=(k==='term'?+v:v); readerStatsPanel(); };
window._readerDetail=(id)=>readerStatsPanel(id);
/* Reglas propias de UN alumno: mandan sobre las de su salón. */
window._stuCtl=async(studentId,what)=>{
  const book=($('#rdrStuBook')||{}).value||_RDR_IDS[0];
  const ch=+(($('#rdrStuCh')||{}).value||1);
  const scope='u:'+studentId, now=new Date().toISOString();
  try{
    if(what==='clear'){
      const r=await sb.from('reader_exam_access').delete().eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope)
        .in('key',RDR_LEVELS.map(l=>book+':'+l+':ch'+ch));
      if(r.error) throw r.error;
    }else{
      const { data } = await sb.from('reader_exam_access').select('key,unlocked,extra_min')
        .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope).in('key',RDR_LEVELS.map(l=>book+':'+l+':ch'+ch));
      const prev=(data||[]);
      const base=prev.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
      const rows=RDR_LEVELS.map(l=>{ const p=prev.find(x=>x.key===book+':'+l+':ch'+ch);
        return {key:book+':'+l+':ch'+ch, scope, school_year:SCHOOL_YEAR_NOW,
          unlocked: what==='open' ? true : (what==='close' ? false : !!(p&&p.unlocked)),
          extra_min: what==='plus5' ? Math.min(180,base+5) : ((p&&p.extra_min)||0),
          updated_at:now}; });
      const r=await sb.from('reader_exam_access').upsert(rows);
      if(r.error) throw r.error;
    }
    alert('Hecho: '+READER_META[book].short+' · Ch. '+ch+' — '+
      (what==='open'?'abierto solo para este alumno':what==='close'?'cerrado solo para él':
       what==='plus5'?'+5 minutos solo para él':'se quitaron sus reglas propias'));
    readerStatsPanel(studentId);
  }catch(e){ alert('No se pudo guardar: '+(e.message||e)); }
};
function _readerFilterBar(grades,years,books){
  const lab=t=>`<label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">${t}</label>`;
  const y=(years&&years.length?years:[SCHOOL_YEAR_NOW]).map(v=>`<option value="${v}" ${String(readerFilter.year)===String(v)?'selected':''}>${v}${v===SCHOOL_YEAR_NOW?' (en curso)':''}</option>`).join('');
  const t=RDR_TERMS.map(v=>`<option value="${v}" ${+readerFilter.term===v?'selected':''}>${_rdrTermLab(v)}</option>`).join('');
  const g=`<option value="">Todos los grados</option>`+grades.map(x=>`<option value="${x.id}" ${String(readerFilter.grade)===String(x.id)?'selected':''}>${x.name}</option>`).join('');
  const s=`<option value="">Todas</option>`+['A','B'].map(x=>`<option value="${x}" ${readerFilter.section===x?'selected':''}>${x}</option>`).join('');
  /* La obra ya no se elige: la decide el trimestre. Se enseña para que quede
     claro de qué libro son las notas que hay debajo. */
  const obra=(books&&books.length)
    ? books.map(id=>`<b>${READER_META[id].icon} ${esc(READER_META[id].title)}</b>`).join(' · ')
    : '<span class="muted">sin obra asignada a este trimestre</span>';
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>${lab('AÑO ESCOLAR')}<select onchange="window._setReaderFilter('year',this.value)" style="min-width:120px">${y}</select></div>
    <div>${lab('TRIMESTRE')}<select onchange="window._setReaderFilter('term',this.value)" style="min-width:150px">${t}</select></div>
    <div>${lab('GRADO')}<select onchange="window._setReaderFilter('grade',this.value)" style="min-width:140px">${g}</select></div>
    <div>${lab('SECCIÓN')}<select onchange="window._setReaderFilter('section',this.value)" style="min-width:100px">${s}</select></div>
    <div style="margin-left:auto;text-align:right;min-width:230px">${lab('OBRA DEL TRIMESTRE')}<div style="font-size:.92rem;padding-top:4px">${obra}</div></div>
  </div>`;
}
/* Panel del profesor. `detailId` abre debajo el desglose de un alumno. */
/* Matriz capítulo × salón: abrir y cerrar los controles de un libro sin salir
   del portal, y sin repetir el clic en cada nivel. Solo salta lo que el
   profesor lleva: sus grados y los libros asignados a esos grados. */
async function readerControlPanel(){
  state._tab='readers';
  $('#main').innerHTML=`<h1>📖 Controles de lectura</h1>${_readerTabs()}<p class="muted">Cargando…</p>`;
  const isAdmin=state.profile&&state.profile.role==='admin';
  const grades=isAdmin?GRADES:teacherAllowedGrades();
  const gset=new Set(grades.map(g=>String(g.id)));
  await _rdrSyncClock();
  await loadReaderAssignments();
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(SCHOOL_YEAR_NOW);
  const term=+readerFilter.term;
  const books=_RDR_IDS.filter(id=>(READER_ASSIGN||[]).some(r=>+r.school_year===SCHOOL_YEAR_NOW&&+r.term===term&&gset.has(String(r.grade_id))&&r.book_id===id));
  const termTabs=`<span class="muted" style="font-size:.78rem;font-weight:700">TRIMESTRE</span> `
    +RDR_TERMS.map(t=>`<button class="btn sm ${t===term?'':'ghost'}" onclick="window._setReaderFilter('term',${t})">${t}.º</button>`).join(' ');
  if(!books.length){
    $('#main').innerHTML=`<h1>📖 Controles de lectura</h1>${_readerTabs()}
      <div class="row" style="gap:6px;margin:0 0 10px;align-items:center">${termTabs}</div>
      <div class="note info">Ningún reader asignado al <b>${_rdrTermLab(term)}</b> en tus grados.  Cada salón lee <b>una obra por trimestre</b>; se eligen en <b>📚 Library → Qué lee cada salón</b>.</div>`;
    return;
  }
  const book=(examCtl.book&&books.indexOf(examCtl.book)>=0)?examCtl.book:books[0];
  examCtl.book=book;
  const meta=READER_META[book];
  const [{data:studs},{data:acc}]=await Promise.all([
    sb.from('profiles').select('grade_id,section, grades(name)').eq('role','student'),
    sb.from('reader_exam_access').select('key,scope,unlocked,extra_min,opens_at,closes_at').eq('school_year',SCHOOL_YEAR_NOW)
  ]);
  const rows=(acc||[]).filter(r=>String(r.key||'').indexOf(book+':')===0);
  const rooms={};
  (studs||[]).forEach(p=>{ if(p.grade_id==null||!gset.has(String(p.grade_id))) return;
    if(!(READER_ASSIGN||[]).some(r=>+r.school_year===SCHOOL_YEAR_NOW&&+r.term===term&&+r.grade_id===+p.grade_id&&r.book_id===book)) return;   // no lee este libro este trimestre
    const sec=String(p.section||'').trim(), k=p.grade_id+'|'+sec;
    (rooms[k]||(rooms[k]={gid:p.grade_id,sec,scope:'g'+p.grade_id+(sec?'-'+sec:''),
      label:((p.grades&&p.grades.name)||('G'+p.grade_id))+(sec?' · '+sec:''),n:0})).n++; });
  const cols=[{scope:'all',label:'Todos',n:null}].concat(Object.values(rooms).sort((a,b)=>a.gid-b.gid||a.sec.localeCompare(b.sec)));
  /* Estado de una celda: cuántos de los 4 niveles están abiertos. */
  const cell=(ch,scope)=>{
    const chain=_rdrScopeChain(scope);
    let open=0, own=0, extra=0, from=null, until=null;
    RDR_LEVELS.forEach(l=>{ const a=_rdrAccFor(rows,book+':'+l+':ch'+ch,chain);
      if(a.unlocked) open++;
      if(a.from===scope) own++;
      extra=Math.max(extra,a.extra); if(a.from&&!from) from=a.from;
      if(a.until&&!until) until=a.until; });
    return {open, own, extra, from, until, all:open===RDR_LEVELS.length, none:open===0};
  };
  const bookTabs=books.map(id=>`<button class="btn sm ${id===book?'':'ghost'}" onclick="window._setCtlBook('${id}')">${READER_META[id].icon} ${esc(READER_META[id].short)}</button>`).join(' ');
  // Los que no lee ningun salon tuyo se ensenan igual, apagados: si no,
  // parece que el reader no existe y se acaba buscando donde no esta.
  const sinAsignar=_RDR_IDS.filter(id=>!books.includes(id));
  const avisoLibros=sinAsignar.length?`<p class="muted" style="margin:6px 0 0;font-size:.85rem">
    Fuera del ${_rdrTermLab(term)} en tus salones: ${sinAsignar.map(id=>`${READER_META[id].icon} ${esc(READER_META[id].short)}`).join(' · ')}.
    Se asignan en <b>📚 Library → Qué lee cada salón</b>; hasta entonces no aparecen aquí.</p>`:'';
  const head=`<th style="min-width:120px">Capítulo</th>`+cols.map(c=>`<th style="text-align:center">${esc(c.label)}${c.n?`<div class="muted" style="font-weight:400;font-size:.7rem">${c.n} alumnos</div>`:''}</th>`).join('')+`<th></th>`;
  const body=Array.from({length:meta.chapters},(_,i)=>{
    const ch=i+1;
    const tds=cols.map(c=>{ const st=cell(ch,c.scope);
      const heredado=st.own===0 && st.from && st.from!==c.scope;
      const cls=st.all?'':(st.none?'ghost':'');
      const txt=st.all?'✅ abierto':(st.none?'🔒 cerrado':'◐ '+st.open+'/4');
      return `<td style="text-align:center">
        <button class="btn sm ${cls}" style="padding:5px 10px;min-width:96px" title="${heredado?'Heredado de '+esc(st.from):'Los cuatro niveles a la vez'}"
          onclick="window._ctlToggle(${ch},'${c.scope}',${st.all?'false':'true'})">${txt}</button>
        <div class="muted" style="font-size:.7rem;margin-top:3px">${st.all&&st.until?'🕒 hasta '+_rdrHM(st.until):(heredado?'heredado':(st.extra?'+'+st.extra+' min':'&nbsp;'))}</div>
        ${st.all?`<div style="margin-top:2px"><button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._ctlTime(${ch},'${c.scope}',5)">+5</button>${st.extra?` <button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._ctlTime(${ch},'${c.scope}',0)">✕</button>`:''}</div>`:''}
      </td>`; }).join('');
    return `<tr><td><b>Ch. ${ch}</b></td>${tds}
      <td class="acts"><div class="acts-wrap"><button class="btn sm ghost" style="padding:4px 9px;font-size:.72rem" onclick="window._ctlRow(${ch},true)">abrir a todos</button>
          <button class="btn sm ghost" style="padding:4px 9px;font-size:.72rem" onclick="window._ctlRow(${ch},false)">cerrar</button></div></td></tr>`;
  }).join('');
  $('#main').innerHTML=`<h1>📖 Controles de lectura</h1>${_readerTabs()}
    <p class="muted" style="margin-top:-6px">Abre el control de un capítulo para un salón: <b>una celda vale por los cuatro niveles</b> (cada alumno rinde en el suyo).
      Mientras el control está abierto, ese capítulo <b>no se puede leer</b> para esos alumnos. Un salón manda sobre su grado, y el grado sobre “Todos”. Año <b>${SCHOOL_YEAR_NOW}</b> · <b>${_rdrTermLab(term)}</b>.</p>
    <div class="row" style="gap:6px;margin:0 0 8px;align-items:center">${termTabs}</div>
    <div class="row" style="gap:8px;margin:0 0 4px;align-items:center">${bookTabs}
      <span style="margin-left:auto;font-size:12.5px;color:#475569">Cerrar automáticamente a las
        <input type="time" value="${esc(examCtl.until||'')}" onchange="window._setCtlUntil(this.value)"
               style="font-family:inherit;font-size:13px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
        ${examCtl.until?`<button class="btn sm ghost" style="padding:3px 9px;font-size:.72rem" onclick="window._setCtlUntil('')">sin hora</button>`:''}
      </span></div>${avisoLibros}
    ${examCtl.until?`<div class="note info" style="margin:0 0 12px">🕒 Lo que abras ahora se cerrará solo a las <b>${esc(examCtl.until)}</b> y la lectura volverá sin que tengas que acordarte. Deja el campo vacío para abrir sin hora de cierre.</div>`:''}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:8px">⏱ <b>+5</b> añade minutos a quien esté rindiendo ese control: el cronómetro crece solo en menos de 20 segundos, sin sacarlo del examen. Solo llega a tiempo si se da antes de que el reloj llegue a cero.</p>`;
}
window._setCtlBook=(id)=>{ examCtl.book=id; readerControlPanel(); };
window._setCtlUntil=(v)=>{ examCtl.until=v||''; readerControlPanel(); };
async function _ctlWrite(rowsToWrite){
  try{
    const r=await sb.from('reader_exam_access').upsert(rowsToWrite);
    if(r.error) throw r.error;
    readerControlPanel();
  }catch(e){ alert('No se pudo guardar: '+(e.message||e)); }
}
window._ctlToggle=(ch,scope,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(examCtl.until):null;
  _ctlWrite(RDR_LEVELS.map(l=>({key:examCtl.book+':'+l+':ch'+ch,scope,school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
window._ctlRow=(ch,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(examCtl.until):null;
  _ctlWrite(RDR_LEVELS.map(l=>({key:examCtl.book+':'+l+':ch'+ch,scope:'all',school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
/* ================= 📋 Exámenes de unidad ==================================
   La misma mecánica que los controles de lectura, y a propósito: el profesor
   ya sabe abrir una celda, dar +5 y poner hora de cierre. Cambia lo que hay en
   las filas — aquí son los exámenes de unidad (práctica y oficial), no los
   capítulos de un libro — y que el candado además le niega al alumno la
   DESCARGA del examen, no solo la pantalla (RLS de unit_exams).
   La clave es grade:uUNITS:kind:level, y vive en la misma tabla
   reader_exam_access, con su año escolar, su alcance y sus minutos extra.  */
const UEX_LEVELS=['a2','b1','b2','c1'];
const UEX_KINDS=[['practice','📝 Práctica'],['official','🎓 Oficial']];
/* units = null → la pantalla de tarjetas por bloque de unidades; con valor, el
   detalle de ese bloque. */
const uexCtl={until:'', grade:'g9', units:null};
const uexKey=(kind,lvl)=>uexCtl.grade+':u'+uexCtl.units+':'+kind+':'+lvl;
/* El grado de la clave ('g9') es el del EXAMEN; el alcance ('g9-B') es el del
   salón al que se le abre. Son cosas distintas aunque se parezcan. */
const uexGradeId=()=>+String(uexCtl.grade).replace(/\D/g,'');
/* Los tres documentos de papel de un examen. Abren en otra pestaña porque el
   profesor los manda a imprimir y quiere seguir teniendo el panel donde está:
   normalmente imprime los cuatro niveles seguidos. */
const _uexDoc=(kind,lvl,doc)=>'unit-exam-print.html?grade='+uexCtl.grade+'&units='+uexCtl.units+
  '&kind='+kind+'&level='+lvl+'&doc='+doc;
const _uexImprimir=(kind,lvl)=>[['exam','🖨️','Hoja del alumno'],['key','🔑','Clave'],['script','🎧','Guion']]
  .map(d=>`<a class="btn sm ghost" style="padding:2px 8px;font-size:.7rem;text-decoration:none"
      href="${_uexDoc(kind,lvl,d[0])}" target="_blank" rel="noopener"
      title="${d[2]} · ${kind==='official'?'oficial':'práctica'} ${lvl.toUpperCase()} (se abre listo para imprimir o guardar en PDF)">${d[1]} ${d[2]}</a>`).join(' ');

/* Los bloques de unidades de un grado, de dos en dos, como se examinan: 1-2,
   3-4, 5-6. Salen del planner (unit-plans.js), no de una lista escrita a mano,
   así que en cuanto coordinación añada una unidad su bloque aparece aquí solo
   —vacío hasta que se cree el examen, que es justo lo que hay que ver: que ese
   bloque existe y todavía no tiene examen. Los pilotos quedan fuera. */
function _uexBloques(grade){
  const us=unitPlansFor(grade).filter(u=>!u.pilot).sort((a,b)=>a.n-b.n);
  const out=[];
  for(let i=0;i<us.length;i+=2) out.push(us.slice(i,i+2));
  return out.filter(b=>b.length);
}
const _uexUnits=b=>b.map(u=>u.n).join('-');
const _uexRotulo=b=>b.length>1?('Unidades '+b[0].n+' y '+b[b.length-1].n):('Unidad '+b[0].n);

/* Pantalla 1: una tarjeta por bloque de unidades. */
function _uexTarjetas(grade, porBloque, abiertosPorBloque){
  const bloques=_uexBloques(grade);
  if(!bloques.length) return `<div class="note info">Este grado no tiene unidades en el planner, así que no hay
    bloques que examinar. Las unidades se copian del planner de Toddle a <code>unit-plans.js</code>.</div>`;
  return `<div class="grid cols-2" style="margin-top:12px">${bloques.map(b=>{
    const units=_uexUnits(b);
    const n=(porBloque[units]||[]).length, abiertos=abiertosPorBloque[units]||0;
    const ico=(b[0].cover&&b[0].cover.icon)||'📘';
    const titulos=b.map(u=>esc(u.title)).join(' · ');
    const chip=n
      ? `<span class="badge" style="background:${abiertos?'#dcfce7':'#e2e8f0'};color:${abiertos?'#065f46':'#475569'}">
           ${n} ${n===1?'examen':'exámenes'} · ${abiertos?abiertos+(abiertos===1?' abierto':' abiertos'):'todos cerrados'}</span>`
      : `<span class="badge" style="background:#f1f5f9;color:#64748b">Sin examen todavía</span>`;
    /* Tambien se entra a los bloques vacios: aqui solo hay profesores y
       administradores, y ver por dentro que un bloque no tiene examen es
       informacion, no un sitio prohibido. */
    return `<div class="card" style="cursor:pointer;${n?'':'opacity:.72'}"
        onclick="window._uexAbreBloque('${units}')">
      <div style="font-size:1.9rem;line-height:1">${ico}</div>
      <h2 style="margin:6px 0 2px;font-size:1.05rem">${_uexRotulo(b)}</h2>
      <p class="muted" style="margin:0 0 6px;font-size:.85rem">${titulos}</p>
      ${chip}
      ${n?'':`<p class="muted" style="margin:8px 0 0;font-size:.78rem">Aparecerá aquí en cuanto se suba
         con <code>exams/sube_examen.py</code>. Hasta entonces no hay nada que abrir ni que imprimir.</p>`}
    </div>`; }).join('')}</div>`;
}
window._uexAbreBloque=(units)=>{ uexCtl.units=units; unitExamPanel(); };
window._uexVuelve=()=>{ uexCtl.units=null; unitExamPanel(); };

async function unitExamPanel(){
  state._tab='unitexams';
  $('#main').innerHTML=`<h1>📋 Exámenes de unidad</h1><p class="muted">Cargando…</p>`;
  const isAdmin=state.profile&&state.profile.role==='admin';
  const grades=isAdmin?GRADES:teacherAllowedGrades();
  const gid=uexGradeId();
  if(!grades.some(g=>+g.id===gid)){
    $('#main').innerHTML=`<h1>📋 Exámenes de unidad</h1>
      <div class="note info">Los exámenes de unidad publicados son de <b>9.º grado</b> (unidades 3 y 4 con
      <i>And Then There Were None</i>), y no tienes ese grado asignado.</div>`;
    return;
  }
  await _rdrSyncClock();
  /* Se pide el grado ENTERO, no solo el bloque abierto: la pantalla de tarjetas
     necesita saber cuáles tienen examen y cuántos están abiertos. */
  const [{data:studs},{data:acc},{data:todos}]=await Promise.all([
    sb.from('profiles').select('grade_id,section, grades(name)').eq('role','student').eq('grade_id',gid),
    sb.from('reader_exam_access').select('key,scope,unlocked,extra_min,opens_at,closes_at').eq('school_year',SCHOOL_YEAR_NOW),
    sb.from('unit_exams_index').select('units,kind,level,title,minutes,questions').eq('grade',uexCtl.grade)
  ]);
  const porBloque={};
  (todos||[]).forEach(x=>{ (porBloque[x.units]=porBloque[x.units]||[]).push(x); });
  /* Para la tarjeta, un examen cuenta como abierto si lo está para ALGUIEN —un
     salón, un grado o todos—, no solo en el alcance «Todos». Mirando solo 'all'
     la tarjeta decía «todos cerrados» con el B2 abierto para 9.º B, que es
     justo lo contrario de lo que el profesor necesita ver de un vistazo. */
  const abiertosPorBloque={};
  Object.keys(porBloque).forEach(u=>{
    abiertosPorBloque[u]=porBloque[u].filter(x=>{
      const k=uexCtl.grade+':u'+u+':'+x.kind+':'+x.level;
      return (acc||[]).some(r=>r.key===k&&_rdrRowOpen(r));
    }).length;
  });

  if(!uexCtl.units){
    $('#main').innerHTML=`<h1>📋 Exámenes de unidad</h1>
      <p class="muted" style="margin-top:-6px">Elige el bloque de unidades. Dentro están el <b>examen de práctica</b>
        y el <b>oficial</b>, cada uno en sus cuatro niveles, con su candado y su hoja para imprimir.</p>
      ${_uexTarjetas(uexCtl.grade, porBloque, abiertosPorBloque)}`;
    return;
  }

  const pub=porBloque[uexCtl.units]||[];
  const publicados=new Set(pub.map(x=>x.kind+':'+x.level));
  const volver=`<button class="btn sm ghost" style="margin-bottom:10px" onclick="window._uexVuelve()">← Unidades</button>`;
  if(!publicados.size){
    $('#main').innerHTML=`<h1>📋 Exámenes de unidad</h1>${volver}
      <div class="note info">Todavía no hay ningún examen publicado para ${uexCtl.grade.toUpperCase()} · unidades ${uexCtl.units}.
      Se suben con <code>exams/sube_examen.py</code>; hasta entonces no hay nada que abrir.</div>`;
    return;
  }
  const prefijo=uexCtl.grade+':u'+uexCtl.units+':';
  const rows=(acc||[]).filter(r=>String(r.key||'').indexOf(prefijo)===0);
  const rooms={};
  (studs||[]).forEach(p=>{ const sec=String(p.section||'').trim(), k=p.grade_id+'|'+sec;
    (rooms[k]||(rooms[k]={gid:p.grade_id,sec,scope:'g'+p.grade_id+(sec?'-'+sec:''),
      label:((p.grades&&p.grades.name)||('G'+p.grade_id))+(sec?' · '+sec:''),n:0})).n++; });
  const cols=[{scope:'all',label:'Todos',n:null}].concat(Object.values(rooms).sort((a,b)=>a.sec.localeCompare(b.sec)));

  /* Estado de una celda. `niveles` = los que entran en ella: los cuatro en la
     fila resumen, uno solo en las filas de nivel. Solo cuentan los publicados,
     para no decir "2/4 abierto" de exámenes que no existen. */
  const cell=(kind,niveles,scope)=>{
    const chain=_rdrScopeChain(scope);
    const hay=niveles.filter(l=>publicados.has(kind+':'+l));
    let open=0, own=0, extra=0, from=null, until=null;
    hay.forEach(l=>{ const a=_rdrAccFor(rows,uexKey(kind,l),chain);
      if(a.unlocked) open++;
      if(a.from===scope) own++;
      extra=Math.max(extra,a.extra); if(a.from&&!from) from=a.from;
      if(a.until&&!until) until=a.until; });
    return {open, own, extra, from, until, n:hay.length, hay,
            all:hay.length>0&&open===hay.length, none:open===0};
  };
  const celda=(kind,niveles,c,etiq)=>{
    const st=cell(kind,niveles,c.scope);
    if(!st.n) return `<td style="text-align:center" class="muted">—</td>`;
    const heredado=st.own===0&&st.from&&st.from!==c.scope;
    /* Candado ABIERTO cuando está abierto: el botón se lee como lo que hace al
       pulsarlo (cerrar), no solo como el estado en que está. */
    const txt=st.all?'🔓 Abierto':(st.none?'🔒 Cerrado':'◐ '+st.open+'/'+st.n);
    const accion=st.all?'Pulsa para CERRARLO':'Pulsa para ABRIRLO';
    return `<td style="text-align:center">
      <button class="btn sm ${st.all?'':(st.none?'ghost':'')}" style="padding:5px 10px;min-width:100px"
        title="${accion} · ${heredado?'Heredado de '+esc(st.from):esc(etiq)}"
        onclick="window._uexToggle('${kind}','${niveles.join(',')}','${c.scope}',${st.all?'false':'true'})">${txt}</button>
      <div class="muted" style="font-size:.7rem;margin-top:3px">${st.all&&st.until?'🕒 hasta '+_rdrHM(st.until):(heredado?'heredado':(st.extra?'+'+st.extra+' min':'&nbsp;'))}</div>
      ${st.all?`<div style="margin-top:2px"><button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._uexTime('${kind}','${niveles.join(',')}','${c.scope}',5)">+5</button>${st.extra?` <button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._uexTime('${kind}','${niveles.join(',')}','${c.scope}',0)">✕</button>`:''}</div>`:''}
    </td>`;
  };
  const head=`<th style="min-width:150px">Examen</th>`
    +cols.map(c=>`<th style="text-align:center">${esc(c.label)}${c.n?`<div class="muted" style="font-weight:400;font-size:.7rem">${c.n} alumno${c.n===1?'':'s'}</div>`:''}</th>`).join('');
  const body=UEX_KINDS.map(([kind,etiq])=>{
    const resumen=`<tr style="background:#f8fafc"><td><b>${etiq}</b>
      <div class="muted" style="font-size:.72rem">los cuatro niveles a la vez</div></td>
      ${cols.map(c=>celda(kind,UEX_LEVELS,c,'Los cuatro niveles a la vez')).join('')}</tr>`;
    const porNivel=UEX_LEVELS.filter(l=>publicados.has(kind+':'+l)).map(l=>{
      const e=(pub||[]).find(x=>x.kind===kind&&x.level===l)||{};
      return `<tr><td style="padding-left:22px">${l.toUpperCase()}
        <span class="muted" style="font-size:.72rem">· ${e.minutes||''} min · ${e.questions||0} preguntas</span>
        <div style="margin-top:3px">${_uexImprimir(kind,l)}</div></td>
        ${cols.map(c=>celda(kind,[l],c,'Solo '+l.toUpperCase())).join('')}</tr>`;
    }).join('');
    return resumen+porNivel;
  }).join('');
  /* El rótulo sale del planner y del título del propio examen, no de un texto
     escrito a mano: el día que haya examen de 5 y 6 esta cabecera ya lo dirá. */
  const _b=_uexBloques(uexCtl.grade).find(b=>_uexUnits(b)===uexCtl.units);
  const _rot=_b?_uexRotulo(_b):('Unidades '+uexCtl.units);
  const _sub=_b?_b.map(u=>esc(u.title)).join(' · '):'';
  $('#main').innerHTML=`<h1>📋 Exámenes de unidad</h1>${volver}
    <p class="muted" style="margin-top:-2px">${(GRADE_META[uexCtl.grade]||['','9.º'])[1]} · <b>${_rot}</b>${_sub?' — '+_sub:''}.
      Cada alumno rinde <b>en su nivel</b>: abrir la fila de arriba abre los cuatro de una vez, y las filas de debajo
      sirven para abrir uno solo. Un salón manda sobre su grado, y el grado sobre «Todos». Año <b>${SCHOOL_YEAR_NOW}</b>.</p>
    <div class="note info" style="margin:0 0 12px">🔒 Mientras un examen está cerrado, el alumno <b>no puede ni descargarlo</b>:
      la base se lo niega, no es solo que la pantalla no se lo enseñe. Tú y los administradores podéis entrar siempre a revisarlo,
      y dentro veréis además el <b>guion del listening</b>.</div>
    <div class="row" style="gap:8px;margin:0 0 10px;align-items:center">
      <span style="margin-left:auto;font-size:12.5px;color:#475569">Cerrar automáticamente a las
        <input type="time" value="${esc(uexCtl.until||'')}" onchange="window._uexUntil(this.value)"
               style="font-family:inherit;font-size:13px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
        ${uexCtl.until?`<button class="btn sm ghost" style="padding:3px 9px;font-size:.72rem" onclick="window._uexUntil('')">sin hora</button>`:''}
      </span></div>
    ${uexCtl.until?`<div class="note info" style="margin:0 0 12px">🕒 Lo que abras ahora se cerrará solo a las <b>${esc(uexCtl.until)}</b>.</div>`:''}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:8px">⏱ <b>+5</b> añade minutos a quien esté rindiendo: el cronómetro
      crece solo en menos de 20 segundos, sin sacarlo del examen, y llega incluso cuando el reloj ya está en cero.
      El <b>Writing</b> no se corrige aquí: llega a <b>✅ Corrección → 🎯 Productos de unidad</b>.</p>
    <p class="muted" style="font-size:.82rem;margin-top:4px">🖨️ Para quien rinde <b>en papel</b>: cada nivel tiene su
      <b>hoja del alumno</b>, su <b>clave</b> y el <b>guion del listening</b>. Se abren en A4 listos para imprimir o para
      guardar en PDF (Ctrl+P → Guardar como PDF). La clave y el guion <b>no se sirven a las cuentas de alumno</b>.
      El audio del listening lo pones tú desde el examen en pantalla.</p>`;
}
window._uexUntil=(v)=>{ uexCtl.until=v||''; unitExamPanel(); };
async function _uexWrite(filas){
  try{
    const r=await sb.from('reader_exam_access').upsert(filas);
    if(r.error) throw r.error;
    unitExamPanel();
  }catch(e){ alert('No se pudo guardar: '+(e.message||e)); }
}
window._uexToggle=(kind,niveles,scope,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(uexCtl.until):null;
  _uexWrite(niveles.split(',').map(l=>({key:uexKey(kind,l),scope,school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
window._uexTime=async(kind,niveles,scope,mins)=>{
  const ls=niveles.split(',');
  const { data } = await sb.from('reader_exam_access').select('key,scope,unlocked,extra_min')
    .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope).in('key',ls.map(l=>uexKey(kind,l)));
  const cur=data||[];
  const base=cur.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
  const val=mins===0?0:Math.min(180,base+mins);
  const now=new Date().toISOString();
  _uexWrite(ls.map(l=>{ const p=cur.find(r=>r.key===uexKey(kind,l));
    return {key:uexKey(kind,l),scope,school_year:SCHOOL_YEAR_NOW,
            unlocked:!!(p&&p.unlocked),extra_min:val,updated_at:now}; }));
};

window._ctlTime=async(ch,scope,mins)=>{
  const { data } = await sb.from('reader_exam_access').select('key,scope,unlocked,extra_min')
    .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope);
  const cur=(data||[]).filter(r=>String(r.key).indexOf(examCtl.book+':')===0 && /ch(\d+)$/.test(r.key) && +/ch(\d+)$/.exec(r.key)[1]===ch);
  const base=cur.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
  const val=mins===0?0:Math.min(180,base+mins);
  const now=new Date().toISOString();
  _ctlWrite(RDR_LEVELS.map(l=>{ const p=cur.find(r=>r.key===examCtl.book+':'+l+':ch'+ch);
    return {key:examCtl.book+':'+l+':ch'+ch,scope,school_year:SCHOOL_YEAR_NOW,
            unlocked:!!(p&&p.unlocked),extra_min:val,updated_at:now}; }));
};

/* Lunes de la semana de una fecha, en ISO corto. Sirve para agrupar por semana
   igual que hace el panel de tiempo de pantalla. */
function _rdrLunes(iso){
  const d=new Date(iso); const dia=(d.getDay()+6)%7;          // 0 = lunes
  d.setDate(d.getDate()-dia); d.setHours(0,0,0,0);
  return d.toISOString().slice(0,10);
}
/* ⏱ Tiempo de lectura — cuanto rato pasa cada alumno LEYENDO. Solo cuenta la
   pantalla "Read along": es la unica que registra tiempo de lectura (actividad
   `<obra>-<nivel>-ch<n>-read`, sin nota). Los ejercicios y el examen tienen su
   propio duration_sec, pero eso es resolver, no leer, y va en su columna. */
async function readerTimePanel(){
  state._tab='readers';
  $('#main').innerHTML=`<h1>📖 Controles de lectura</h1>${_readerTabs()}<p class="muted">Cargando…</p>`;
  const grades=(state.profile&&state.profile.role==='admin')?GRADES:teacherAllowedGrades();
  const gradeIds=new Set(grades.map(g=>String(g.id)));
  const [{data:studs},{data:atts}]=await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section, grades(name)').eq('role','student'),
    sb.from('activity_attempts').select('student_id,activity,duration_sec,submitted_at').or(_rdrOr()).limit(5000)
  ]);
  await loadReaderAssignments();
  const years=[...new Set([...(atts||[]).map(_attYear).filter(Boolean), SCHOOL_YEAR_NOW])].sort((a,b)=>b-a);

  /* intentos de lectura del año elegido, por alumno */
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(readerFilter.year);
  const books=_rdrFilterBooks(grades), bset=new Set(books);
  const porAlumno={};
  (atts||[]).forEach(a=>{
    if(_attYear(a)!==+readerFilter.year) return;
    const m=_RDR_ACT_RX.exec(String(a.activity||''));
    if(!m || m[4]!=='read') return;                     // solo "Read along"
    const obra=m[1]; if(!READER_META[obra]) return;
    if(!bset.has(obra)) return;                         // solo la obra del trimestre
    const r=porAlumno[a.student_id]||(porAlumno[a.student_id]={secs:0,sem:{},caps:new Set(),obras:new Set(),ult:null,sesiones:0});
    const secs=a.duration_sec||0;
    r.secs+=secs; r.sesiones++;
    r.sem[_rdrLunes(a.submitted_at)]=(r.sem[_rdrLunes(a.submitted_at)]||0)+secs;
    r.caps.add(obra+'-'+m[3]); r.obras.add(obra);
    if(!r.ult || a.submitted_at>r.ult) r.ult=a.submitted_at;
  });

  let list=(studs||[]).filter(p=>gradeIds.has(String(p.grade_id)));
  if(readerFilter.grade)   list=list.filter(p=>String(p.grade_id)===String(readerFilter.grade));
  if(readerFilter.section) list=list.filter(p=>p.section===readerFilter.section);
  const data=list.map(p=>({p, r:porAlumno[p.id]||{secs:0,sem:{},caps:new Set(),obras:new Set(),ult:null,sesiones:0}}))
                 .sort((a,b)=> b.r.secs-a.r.secs || (a.p.full_name||'').localeCompare(b.p.full_name||''));

  /* las 6 ultimas semanas con actividad, o las 6 ultimas del calendario */
  let semanas=[...new Set(Object.values(porAlumno).flatMap(r=>Object.keys(r.sem)))].sort().slice(-6);
  if(!semanas.length){ const h=new Date(); semanas=[_rdrLunes(h.toISOString())]; }

  const leen=data.filter(d=>d.r.secs>0);
  const cero=data.length-leen.length;
  const totalSec=data.reduce((s,d)=>s+d.r.secs,0);
  const mediaSec=leen.length?Math.round(totalSec/leen.length):0;
  const capsTotal=new Set(data.flatMap(d=>[...d.r.caps])).size;
  const tope=Math.max(1,...data.map(d=>d.r.secs));

  const stats=`<div class="grid cols-3" style="margin-bottom:12px">
    <div class="stat"><div class="l">⏱ Total leído</div><div class="n" style="font-size:1.5rem">${_rdrTime(totalSec)}</div>
      <div class="muted" style="font-size:.8rem">${leen.length} de ${data.length} alumnos han leído</div></div>
    <div class="stat"><div class="l">Media por alumno que lee</div><div class="n" style="font-size:1.5rem">${_rdrTime(mediaSec)}</div>
      <div class="muted" style="font-size:.8rem">no cuenta a los que están a cero</div></div>
    <div class="stat"><div class="l">Sin leer nada</div><div class="n">${cero}</div>
      <div class="muted" style="font-size:.8rem">${capsTotal} capítulo(s) abiertos en total</div></div>
  </div>`;

  const cab=semanas.map(s=>`<th style="text-align:center" title="Semana del ${s}">${s.slice(5).replace('-','/')}</th>`).join('');
  const filas=data.map(d=>{
    const pct=Math.round(d.r.secs/tope*100);
    const barra=d.r.secs
      ? `<div style="display:flex;align-items:center;gap:8px">
           <div style="flex:1;min-width:60px;height:8px;background:var(--bg);border-radius:6px;overflow:hidden">
             <div style="width:${pct}%;height:100%;background:var(--blue)"></div></div>
           <b style="white-space:nowrap">${_rdrTime(d.r.secs)}</b></div>`
      : '<span class="muted">— sin leer</span>';
    return `<tr${d.r.secs?'':' style="opacity:.6"'}>
      <td><b>${esc(d.p.full_name||'')}</b></td>
      <td><span class="badge grade">${esc(d.p.grades?.name||'—')}</span>${d.p.section?' <span class="badge">'+esc(d.p.section)+'</span>':''}</td>
      ${semanas.map(s=>{ const sec=d.r.sem[s]||0, m=Math.round(sec/60);
        // menos de un minuto no es cero: se ve '<1' para no confundirlo con no leer
        const txt = m ? m : (sec ? '&lt;1' : '·');
        return `<td style="text-align:center${m?'':';color:var(--muted)'}">${txt}</td>`; }).join('')}
      <td style="min-width:150px">${barra}</td>
      <td style="text-align:center">${d.r.caps.size||'<span class="muted">·</span>'}</td>
      <td class="muted" style="font-size:.82rem;white-space:nowrap">${d.r.ult?new Date(d.r.ult).toLocaleDateString():'—'}</td>
    </tr>`;
  }).join('');

  const aviso = totalSec ? '' : `<div class="note warn" style="margin-top:12px">Nadie del filtro ha usado
    todavía <b>📖 Read along</b>, que es la única pantalla que mide lectura. Si los alumnos entran directo
    a las actividades o al control, leen en papel o en otra pestaña, aquí saldrá cero aunque estén
    trabajando la obra: míralo junto a <b>📊 Notas y tiempos</b>.</div>`;

  $('#main').innerHTML=`<h1>📖 Controles de lectura</h1>${_readerTabs()}
    ${_readerFilterBar(grades,years,books)}
    ${stats}
    <div class="note">Minutos en <b>Read along</b>, la lectura con audio. No se cuentan los ejercicios ni
      el control (eso es resolver, no leer) ni las visitas de menos de 20 segundos, y una pestaña olvidada
      corta a los 45 minutos. El registro empezó el <b>25 de agosto de 2026</b>: antes de esa fecha no hay
      datos de nadie.</div>
    ${aviso}
    <div class="card" style="padding:0;overflow-x:auto;margin-top:12px"><table>
      <thead><tr><th>Alumno</th><th>Grado</th>${cab}<th>Total leído</th><th title="Capítulos distintos abiertos">Caps.</th><th>Última vez</th></tr></thead>
      <tbody>${filas||'<tr><td colspan="9" class="muted">Sin alumnos en el filtro.</td></tr>'}</tbody></table></div>`;
}
async function readerStatsPanel(detailId){
  state._tab='readers';
  if(readerTab==='control') return readerControlPanel();
  if(readerTab==='tiempo') return readerTimePanel();
  $('#main').innerHTML=`<h1>📖 Controles de lectura</h1><p class="muted">Cargando…</p>`;
  const grades=(state.profile&&state.profile.role==='admin')?GRADES:teacherAllowedGrades();
  const gradeIds=new Set(grades.map(g=>String(g.id)));
  const [{data:studs},{data:atts}]=await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section, grades(name)').eq('role','student'),
    sb.from('activity_attempts').select('student_id,activity,score,total,duration_sec,submitted_at').or(_rdrOr()).limit(5000)
  ]);
  await loadReaderAssignments();
  /* Los años que existen en los datos, para poder mirar atrás: los alumnos de
     un grado cambian cada año, así que las notas se leen año por año. */
  const years=[...new Set([...(atts||[]).map(_attYear).filter(Boolean), SCHOOL_YEAR_NOW])].sort((a,b)=>b-a);
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(readerFilter.year);
  /* El trimestre manda sobre todo lo demás: solo entran los intentos de la obra
     que se lee en él, así que la nota, el tiempo de lectura y los ejercicios son
     los de ese trimestre y no se mezclan con los de la obra anterior. */
  const books=_rdrFilterBooks(grades), bset=new Set(books);
  const one=books.length===1?books[0]:null;      // lo normal: un salón, una obra
  const meta=one?READER_META[one]:null;
  const cab=`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">📖 Controles de lectura</h1>
      <a class="btn sm ghost" href="attwn-exam.html" style="text-decoration:none">🔓 Abrir / cerrar controles →</a>
    </div>
    ${_readerTabs()}`;
  if(!books.length){
    $('#main').innerHTML=`${cab}
      ${_readerFilterBar(grades,years,books)}
      <div class="note info">Ningún salón de este filtro tiene obra asignada al <b>${_rdrTermLab(readerFilter.term)}</b> de ${esc(readerFilter.year)}.
        Cada salón lee <b>una obra por trimestre</b>: se eligen en <b>📚 Library → Qué lee cada salón</b>.</div>`;
    return;
  }
  const ofYear=(atts||[]).filter(a=>_attYear(a)===+readerFilter.year && bset.has(_rdrBookOfAtt(a)));
  const byStu={};
  ofYear.forEach(a=>{ (byStu[a.student_id]||(byStu[a.student_id]=[])).push(a); });
  let list=(studs||[]).filter(p=>gradeIds.has(String(p.grade_id)));
  if(readerFilter.grade)   list=list.filter(p=>String(p.grade_id)===String(readerFilter.grade));
  if(readerFilter.section) list=list.filter(p=>p.section===readerFilter.section);
  list.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));
  const data=list.map(p=>({p, r:readerReport(byStu[p.id]||[])}));
  const gradeOf=d=> one ? (d.r.books[one]?d.r.books[one].grade:null) : d.r.overall;
  const active=data.filter(d=>gradeOf(d)!=null);
  const clase=_rdrAvg(data.map(gradeOf));
  const sumRead=data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].readSec:0):d.r.readSec),0);
  const sumAct =data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].actSec:0):d.r.actSec),0);
  const stats=`<div class="grid cols-3" style="margin-bottom:12px">
    <div class="stat"><div class="l">Nota final de la clase</div><div class="n">${clase!=null?clase+'%':'—'}</div>
      <div class="muted" style="font-size:.8rem">${clase!=null?_rdr20(clase)+'/20':'sin controles aún'}</div></div>
    <div class="stat"><div class="l">Alumnos con nota</div><div class="n">${active.length}</div>
      <div class="muted" style="font-size:.8rem">de ${data.length} en el filtro</div></div>
    <div class="stat"><div class="l">Controles rendidos</div><div class="n">${data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].tries:0):d.r.tries),0)}</div>
      <div class="muted" style="font-size:.8rem">intentos, se cuenta el mejor</div></div>
    <div class="stat"><div class="l">⏱ Lectura con audio</div><div class="n" style="font-size:1.5rem">${_rdrTime(sumRead)}</div>
      <div class="muted" style="font-size:.8rem">+ ${_rdrTime(sumAct)} en ejercicios</div></div>
  </div>`;
  const head = one
    ? `<th>Alumno</th><th>Grado</th>${Array.from({length:meta.chapters},(_,i)=>`<th title="Capítulo ${i+1}">${i+1}</th>`).join('')}<th>Rendidos</th><th title="Promedio de los capítulos rendidos">Nota final</th><th>⏱ Lectura</th><th>⏱ Ejercicios</th><th></th>`
    : `<th>Alumno</th><th>Grado</th>${books.map(id=>`<th>${READER_META[id].icon} ${READER_META[id].short}</th>`).join('')}<th>Nota final</th><th>⏱ Lectura</th><th>⏱ Ejercicios</th><th></th>`;
  const rows=data.map(d=>{
    const b=one?d.r.books[one]:null;
    const cells = one
      ? Array.from({length:meta.chapters},(_,i)=>{ const c=b&&b.chapters[i+1];
          return `<td style="text-align:center">${c&&c.best!=null?`<b>${c.best}</b>`:'<span class="muted">·</span>'}</td>`; }).join('')
        +`<td class="muted" style="text-align:center">${b?b.done:0}/${meta.chapters}</td><td>${_rdrMark(b?b.grade:null)}</td>`
        +`<td>${_rdrTime(b&&b.readSec)}</td><td>${_rdrTime(b&&b.actSec)}</td>`
      : books.map(id=>{ const bk=d.r.books[id];
          return `<td>${_rdrMark(bk?bk.grade:null)}${bk?` <span class="muted" style="font-size:.75rem">${bk.done}/${READER_META[id].chapters}</span>`:''}</td>`; }).join('')
        +`<td>${_rdrMark(d.r.overall)}</td><td>${_rdrTime(d.r.readSec)}</td><td>${_rdrTime(d.r.actSec)}</td>`;
    return `<tr><td><b>${esc(d.p.full_name||'')}</b></td>
      <td><span class="badge grade">${esc(d.p.grades?.name||'—')}</span>${d.p.section?' <span class="badge">'+esc(d.p.section)+'</span>':''}</td>
      ${cells}
      <td><button class="btn sm ghost" onclick="window._readerDetail('${d.p.id}')">Detalle →</button></td></tr>`;
  }).join('');
  /* La obra del trimestre, capítulo a capítulo: qué saca la clase en cada
     control y cuántos lo han rendido. La NOTA FINAL es el promedio de los
     capítulos AVANZADOS: los que todavía no se han rendido no bajan la nota. */
  const chapterTable=(()=>{
    if(!one) return '';
    const chs=Array.from({length:meta.chapters},(_,i)=>{
      const n=i+1, cs=data.map(d=>{ const b=d.r.books[one]; return b?b.chapters[n]:null; });
      const notas=cs.map(c=>c?c.best:null).filter(v=>v!=null);
      return {n, avg:_rdrAvg(notas), done:notas.length,
              readSec:cs.reduce((s,c)=>s+((c&&c.readSec)||0),0),
              actSec: cs.reduce((s,c)=>s+((c&&c.actSec)||0),0),
              tries:  cs.reduce((s,c)=>s+((c&&c.tries)||0),0)};
    });
    const avanzados=chs.filter(c=>c.done).length;
    const filas=chs.map(c=>`<tr${c.done?'':' style="opacity:.55"'}>
      <td><b>Ch. ${c.n}</b></td>
      <td>${_rdrMark(c.avg)}</td>
      <td style="text-align:center">${c.done?c.done+' de '+data.length:'<span class="muted">sin rendir</span>'}</td>
      <td class="muted" style="text-align:center">${c.tries||'—'}</td>
      <td>${_rdrTime(c.readSec)}</td>
      <td>${_rdrTime(c.actSec)}</td></tr>`).join('');
    return `<h2 style="font-size:16px;color:var(--blue-d);margin:20px 0 8px">${meta.icon} ${esc(meta.title)} — capítulo a capítulo</h2>
      <p class="muted" style="margin:0 0 8px;font-size:.85rem">Nota media de la clase en cada control. La <b>nota final</b> es el promedio de los
        <b>${avanzados} capítulo(s) avanzados</b> de los ${meta.chapters} de la obra: los que aún no se han rendido no cuentan.</p>
      <div class="card" style="padding:0;overflow-x:auto"><table>
        <thead><tr><th style="min-width:110px">Capítulo</th><th>Nota media de la clase</th><th>Rendido por</th><th title="Intentos, se cuenta el mejor">Intentos</th><th>⏱ Lectura</th><th>⏱ Ejercicios</th></tr></thead>
        <tbody>${filas}</tbody>
        <tfoot><tr style="background:#f1f5f9"><td><b>Nota final</b></td>
          <td>${_rdrMark(clase)}</td>
          <td class="muted" style="text-align:center">${avanzados}/${meta.chapters} capítulos</td>
          <td class="muted" style="text-align:center">${chs.reduce((s,c)=>s+c.tries,0)}</td>
          <td>${_rdrTime(sumRead)}</td><td>${_rdrTime(sumAct)}</td></tr></tfoot>
      </table></div>`;
  })();
  const detail=(()=>{
    if(!detailId) return '';
    const d=data.find(x=>String(x.p.id)===String(detailId));
    if(!d) return '';
    const bks=books.filter(id=>d.r.books[id]);
    return `<div class="card"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h2 style="margin:0">${esc(d.p.full_name||'')} — capítulo a capítulo</h2>
        <div>${_rdrMark(gradeOf(d))} <span class="muted" style="font-size:.82rem">nota final del trimestre</span></div>
      </div>
      <p class="muted" style="margin:4px 0 0;font-size:.85rem">⏱ ${_rdrTime(d.r.readSec)} de lectura con audio · ${_rdrTime(d.r.actSec)} de ejercicios · ${_rdrTime(d.r.examSec)} en los controles.</p>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line);font-size:12.5px;color:#475569">
        <b>Solo para ${esc((d.p.full_name||'').split(' ')[0])}:</b> abrirle un control que su salón tiene cerrado (recuperación) o darle minutos extra.
        <div class="row" style="gap:6px;margin-top:6px;align-items:center;flex-wrap:wrap">
          <select id="rdrStuBook" style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
            ${books.map(id=>`<option value="${id}">${READER_META[id].icon} ${esc(READER_META[id].short)}</option>`).join('')}
          </select>
          <select id="rdrStuCh" style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
            ${Array.from({length:one?meta.chapters:10},(_,i)=>`<option value="${i+1}">Ch. ${i+1}</option>`).join('')}
          </select>
          <button class="btn sm" onclick="window._stuCtl('${d.p.id}','open')">🔓 abrirle el control</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','close')">🔒 cerrárselo</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','plus5')">⏱ +5 min</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','clear')">✕ quitar lo suyo</button>
        </div>
      </div></div>
      ${bks.length?bks.map(id=>_rdrChapterTable(id,d.r.books[id])).join(''):'<div class="note info">Este alumno todavía no ha abierto la obra del trimestre.</div>'}`;
  })();
  $('#main').innerHTML=`${cab}
    <p class="muted" style="margin-top:-6px">La nota de cada capítulo es su control (mejor intento) y la <b>nota final es el promedio de los capítulos avanzados</b>. El tiempo de lectura con audio y el de los ejercicios se muestran al lado como evidencia de trabajo: no cambian la nota.
      Se ve el <b>${_rdrTermLab(readerFilter.term)}</b> del año escolar <b>${esc(readerFilter.year)}</b>${one?` — ${meta.icon} <b>${esc(meta.title)}</b>, la obra que toca ese trimestre`:''}.</p>
    ${_readerFilterBar(grades,years,books)}
    ${stats}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead>
      <tbody>${rows||`<tr><td colspan="12" class="center muted">Sin alumnos para este filtro.</td></tr>`}</tbody>
    </table>
    <div class="muted" style="padding:8px 14px;font-size:.82rem">${data.length} alumno(s) · ${active.length} con nota${one?' en '+esc(meta.title):''}</div></div>
    ${chapterTable}
    ${detail}`;
}


/* ---------------------------------------------------------------
   Nordic Little Readers — los cuentos de primaria.
   Los readers del portal empiezan en A2 y no sirven de G1 a G4.
   Estos son cuentos propios de Pre-A1/A1 con los personajes del
   curso; viven en nis-fun/readers y aqui solo se listan.
----------------------------------------------------------------- */
async function littleReadersPanel(){
  const main=$('#main');
  main.innerHTML='<div class="card"><p class="muted">Cargando los cuentos…</p></div>';
  let libros=[];
  try{
    const r=await fetch('nis-fun/readers/data/index.json',{cache:'no-cache'});
    if(r.ok) libros=(await r.json()).libros||[];
  }catch(e){}
  if(!libros.length){
    main.innerHTML=`<div class="card"><h1>🧒 Nordic Little Readers</h1>
      <p class="err">No pude leer la lista de cuentos.</p></div>`;
    return;
  }
  const porGrado={};
  libros.forEach(l=>(porGrado[l.grado]=porGrado[l.grado]||[]).push(l));
  const bloques=Object.keys(porGrado).sort().map(g=>`
    <h2 style="font-size:15px;color:var(--blue-d);margin:20px 0 8px">${esc(g)} · ${esc(porGrado[g][0].nivel)}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px">
      ${porGrado[g].map(l=>`
        <a href="nis-fun/readers/?id=${esc(l.id)}" target="_blank"
           style="text-decoration:none;color:inherit;border:1px solid var(--line);border-radius:14px;
                  overflow:hidden;background:#fff;display:block">
          <img src="nis-fun/readers/${esc(l.portada)}" alt=""
               style="width:100%;aspect-ratio:16/10;object-fit:cover;display:block"
               onerror="this.style.display='none'">
          <div style="padding:10px 12px 12px">
            <b style="font-size:15px">${esc(l.titulo)}</b>
            <div class="muted" style="font-size:.85rem">${esc(l.objetivo)}</div>
            <div style="font-size:.78rem;font-weight:700;color:var(--blue-d);margin-top:5px">
              ${l.paginas} páginas</div>
          </div></a>`).join('')}
    </div>`).join('');

  main.innerHTML=`<div class="card">
    <h1>🧒 Nordic Little Readers</h1>
    <p class="muted">Cuentos de Pre-A1 y A1 para primaria, con los personajes de Fun for Nordic.
      Cada uno son ocho páginas con dibujo y audio, y una actividad al final.
      Los readers de <b>📖 Library</b> (Tom Sawyer, Treasure Island…) empiezan en A2 y
      son para los grados de arriba.</p>
    ${bloques}
    <p class="muted" style="margin-top:18px;font-size:.85rem">Los títulos que pide el
      Scope &amp; Sequence para estos grados (The Very Hungry Caterpillar, Dear Zoo,
      Flat Stanley…) tienen copyright y siguen siendo lectura de biblioteca en papel:
      estos cuentos cubren el mismo objetivo con material propio del colegio.</p>
  </div>`;
}

/* ---------------------------------------------------------------
   Fun for Nordic — lo que entregan los alumnos
   Escritura, grabaciones de voz y el repaso final de cada unidad,
   para que el profesor las oiga y las califique.
---------------------------------------------------------------- */
/* Filtro por nivel de las entregas. Vive fuera de la funcion para que no se
   pierda al repintar el panel tras calificar. */
let funFiltro = '';
window._funFiltro = n => { funFiltro = (funFiltro===n ? '' : n); funNordicPanel(); };

async function funNordicPanel(){
  const main = $('#main');
  main.innerHTML = '<div class="card"><p class="muted">Cargando entregas…</p></div>';

  const NIVELES = ['starters','movers','flyers'];
  const COLS = 'id,student_id,level,unit,activity_code,kind,payload,audio_path,duration_sec,score,feedback,reviewed_at,created_at';
  let q = sb.from('fun_submissions').select(COLS).order('created_at', { ascending: false }).limit(400);
  if (funFiltro) q = q.eq('level', funFiltro);
  // el filtro acota la consulta (hay tope de 400), pero las cuentas de las
  // pastillas se piden aparte para que sigan siendo del total de cada nivel
  const [res, ...cuentas] = await Promise.all([
    q,
    ...NIVELES.map(n => sb.from('fun_submissions').select('id', { count:'exact', head:true }).eq('level', n))
  ]);
  const { data, error } = res;
  const nPorNivel = Object.fromEntries(NIVELES.map((n,i)=>[n, cuentas[i].count||0]));
  const total = NIVELES.reduce((a,n)=>a+nPorNivel[n], 0);

  const pastilla = (val,label,n) => `<button class="btn sm ${funFiltro===val?'':'ghost'}"
      onclick="window._funFiltro('${val}')">${label} <b>${n}</b></button>`;
  const chips = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      ${pastilla('','🧸 Todos',total)}
      ${NIVELES.map(n=>pastilla(n, FUN_CURSOS[n].em+' '+n[0].toUpperCase()+n.slice(1), nPorNivel[n])).join('')}
    </div>`;

  const marco = cuerpo => `<div class="card">
    <h2>🧸 Fun for Nordic — entregas de los alumnos</h2>
    <p class="muted">Lo que escriben y lo que graban en Starters, Movers y Flyers, lo más
      reciente primero. Pon una nota de 0 a 10 y un comentario; se guarda solo.</p>
    ${chips}${cuerpo}</div>`;

  if (error){ main.innerHTML = marco(`<p class="err">No pude leer las entregas: ${esc(error.message)}</p>`); return; }
  if (!data || !data.length){
    main.innerHTML = marco(`<p class="muted">${funFiltro
      ? 'Todavía no hay entregas de <b>'+esc(FUN_CURSOS[funFiltro].curso)+'</b>.'
      : 'Todavía no hay entregas. Aparecerán aquí en cuanto los alumnos escriban o graben en el curso.'}</p>`);
    return;
  }

  // nombres de los alumnos, en una sola consulta
  const ids = [...new Set(data.map(r => r.student_id))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section').in('id', ids);
  const quien = Object.fromEntries((gente||[]).map(p => [p.id, p]));

  const ICONO = { writing:'✍️', speaking:'🎙️', selfcheck:'✅' };
  const NIVEL = { starters:'Starters', movers:'Movers', flyers:'Flyers' };

  const fila = r => {
    const p = quien[r.student_id] || {};
    const nombre = p.full_name || '(alumno)';
    const grado = p.grade_id ? `${p.grade_id}º${p.section||''}` : '';
    const cuerpo = r.kind === 'speaking'
      ? `<button class="btn small" onclick="funOirAudio('${esc(r.audio_path||'')}', this)">▶ Escuchar</button>
         ${r.duration_sec ? `<span class="muted"> ${r.duration_sec}s</span>` : ''}`
      : r.kind === 'selfcheck'
        ? `<span class="muted">${((r.payload||{}).puede||[]).length} / ${(r.payload||{}).total||0} marcadas</span>`
        : `<span>${esc(((r.payload||{}).respuestas||[]).join(' · ')).slice(0,140)}</span>`;
    return `<tr>
      <td class="col-name">${esc(nombre)} <span class="muted">${grado}</span></td>
      <td>${NIVEL[r.level]||r.level} · U${r.unit} · ${esc(r.activity_code)}</td>
      <td>${ICONO[r.kind]||''} ${r.kind}</td>
      <td>${cuerpo}</td>
      <td><input type="number" min="0" max="10" value="${r.score==null?'':r.score}"
            style="width:4rem" onchange="funCalificar('${r.id}', this.value, null)"></td>
      <td class="col-flex"><input type="text" placeholder="comentario" value="${esc(r.feedback||'')}"
            onchange="funCalificar('${r.id}', null, this.value)"></td>
      <td class="muted">${r.reviewed_at ? '✔' : '—'}</td>
    </tr>`;
  };

  main.innerHTML = marco(`<div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th><th>Unidad</th><th>Tipo</th><th>Entrega</th>
        <th>Nota</th><th>Comentario</th><th>Visto</th></tr></thead>
      <tbody>${data.map(fila).join('')}</tbody></table></div>`);
}

/* Los audios están en un bucket privado: se pide un enlace temporal. */
window.funOirAudio = async function(ruta, boton){
  if (!ruta) return;
  const { data, error } = await sb.storage.from('fun-speaking').createSignedUrl(ruta, 3600);
  if (error || !data){ boton.textContent = 'No disponible'; return; }
  const a = document.createElement('audio');
  a.controls = true; a.src = data.signedUrl; a.style.maxWidth = '15rem';
  boton.replaceWith(a);
  a.play().catch(()=>{});
};

window.funCalificar = async function(id, nota, comentario){
  const cambio = { reviewed_at: new Date().toISOString(), reviewed_by: (state.profile && state.profile.id) || null };
  if (nota !== null && nota !== '') cambio.score = Number(nota);
  if (comentario !== null) cambio.feedback = comentario;
  await sb.from('fun_submissions').update(cambio).eq('id', id);
};

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
  const suelto = [], correccion = [], seguimiento = [], ensenanza = [], examenes = [];
  if(acc.can_students) suelto.push({key:'students',label:'👥 Alumnos'});
  if(acc.can_results){
    correccion.push({key:'unitprod',label:'🎯 Productos de unidad'});
    correccion.push({key:'corregir',label:'✅ Corregir fichas'});
    correccion.push({key:'readers',label:'📖 Controles de lectura'});
    correccion.push({key:'unitexams',label:'📋 Exámenes de unidad'});
    correccion.push({key:'funnordic',label:'🧸 Fun for Nordic'});
    seguimiento.push({key:'results',label:'📝 Resultados'});
    seguimiento.push({key:'final',label:'🎓 Resultado final'});
    seguimiento.push({key:'tiempo',label:'⏱️ Tiempo de pantalla'});
    ensenanza.push({key:'materiales',label:'📄 Materiales de clase'});
  }
  if(acc.can_results||acc.can_students) seguimiento.push({key:'honesty',label:'🛡️ Honestidad'});
  if(_canClasses) ensenanza.unshift({key:'classes',label:'🏫 Classes'});
  // French va pegado a Classes: es la otra materia, no un extra del final.
  if(_canFrench) ensenanza.splice(_canClasses?1:0, 0, {key:'french',label:'🇫🇷 French'});
  if(teacherAllowedGrades().length) ensenanza.push({key:'unitaccess',label:'📚 Activar unidades'});
  ensenanza.push({key:'scope',label:'📚 Scope & Sequence'});
  /* Los tres cursos de primaria (Fun for Nordic). Van sin candado, como Little
     Readers: son material de consulta, no datos de alumnos. Sus entregas se
     corrigen en Correccion > Fun for Nordic. */
  ensenanza.push({key:'funstarters',label:'🐧 Starters'});
  ensenanza.push({key:'funmovers',label:'🐺 Movers'});
  ensenanza.push({key:'funflyers',label:'🦅 Flyers'});
  ensenanza.push({key:'fr',label:'🇫🇷 Cap sur le français'});
  if(teacherAllowedGrades().length) ensenanza.push({key:'funaccess',label:'🔐 Unidades por grado'});
  ensenanza.push({key:'littlereaders',label:'🧒 Little Readers'});
  ensenanza.push({key:'pizarra',label:'📝 Pizarra'});
  ensenanza.push({key:'corrector',label:'✍️ Corrector de material'});
  examenes.push({key:'cambridgehub',label:'🎓 YLE + Main Suite'});
  if(teacherAllowedGrades().length) examenes.push({key:'yle',label:'🛡️ Panel YLE'});
  examenes.push({key:'exams',label:'🎧 Exámenes'});
  if(teacherAllowedGrades().length) examenes.push({key:'practice',label:'🎯 Practice Tests'});
  examenes.push({key:'funyle',label:'🧸 Fun for Nordic'});
  examenes.push({key:'uoe',label:'🧩 Use of English'});
  examenes.push({key:'cambridgeinfo',label:'📘 Info Cambridge'});

  const nav = [];
  if(suelto.length) nav.push(...suelto);
  else if(!acc.can_results) nav.push({key:'none',label:'— sin accesos —'});
  const grupo = (g,ic,items)=>{ if(items.length) nav.push({group:g, icon:ic, items:items}); };
  grupo('Corrección','✅',correccion);
  grupo('Seguimiento','📈',seguimiento);
  grupo('Enseñanza','🏫',ensenanza);
  grupo('Actividades','🎮',[
    {key:'games',label:'🎲 Games Lab'},
    {key:'livequiz',label:'🎮 NIShoot Live'},
    {key:'mun',label:'🌐 MUN Academy'},
    {key:'phonics',label:'🔤 Phonics'},
    {key:'coach',label:'🎙️ Pronunciación'},
  ]);
  grupo('Exámenes','🎧',examenes);
  const claves = navKeys(nav);
  const active = (tab && claves.indexOf(tab)>=0) ? tab : claves[0];
  document.body.innerHTML = shell(nav, active, `<div class="center muted">Cargando…</div>`, true);
  bindNav(renderTeacher);
  if(active==='mun') return $('#main').innerHTML = munBody();
  if(active==='livequiz') return $('#main').innerHTML = liveQuizBody();
  if(active==='games') return $('#main').innerHTML = gamesLabBody();
  if(active==='results') return teacherResults();
  if(active==='final') return cefrFinalPanel();
  if(active==='readers') return readerStatsPanel();
  if(active==='unitexams') return unitExamPanel();
  if(active==='students') return teacherStudents();
  if(active==='unitprod') return unitProductsPanel();
  if(active==='materiales') return materialesPanel();
  if(active==='corregir') return corregirPanel();
  if(active==='tiempo') return tiempoPantallaPanel();
  if(active==='honesty') return antiCheatPanel();
  if(active==='practice') return practicePanel(teacherAllowedGrades());
  if(active==='unitaccess') return unitAccessPanel(teacherAllowedGrades());
  if(active==='classes') return studentClasses();
  if(active==='french') return studentSubject('french');
  if(active==='phonics'){ $('#main').innerHTML = phonicsPanel(); return; }
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
  if(active==='funstarters') return $('#main').innerHTML = funCursoBody('starters');
  if(active==='funmovers') return $('#main').innerHTML = funCursoBody('movers');
  if(active==='funflyers') return $('#main').innerHTML = funCursoBody('flyers');
  if(active==='cambridgehub') return studentCambridgePortal();
  if(active==='uoe') return $('#main').innerHTML = useOfEnglishBody();
  if(active==='pizarra') return $('#main').innerHTML = pizarraBody();
  if(active==='corrector') return $('#main').innerHTML = correctorBody();
  if(active==='cambridgeinfo') return $('#main').innerHTML = cambridgeInfoBody();
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
        oninput="window._liveNameFilter(this.value)" style="min-width:180px">
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
  if(c) c.textContent = shown + ' ' + (c.getAttribute('data-noun') || 'resultado(s)');
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
    return `<tr data-sname="${esc((a.profiles?.full_name||'').toLowerCase())}">
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
    <div id="resCount" data-noun="resultado(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} resultado(s)</div></div>`;
}
/* -- Barra de filtro por grado (pestaña Alumnos del profesor) ------- */
let teacherFilter = { grade:'' };
function gradeFilterBar(onChangeFn, gradeList){
  const list = gradeList || teacherAllowedGrades();
  const opts = `<option value="">Todos los grados</option>`
    + list.map(g=>`<option value="${g.id}" ${String(teacherFilter.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADO</label>
      <select onchange="${onChangeFn}(this.value)" style="min-width:140px">${opts}</select>
    </div>
    ${teacherFilter.grade ? `<button class="btn sm ghost" style="align-self:flex-end" onclick="${onChangeFn}('')">✕ Limpiar</button>` : ''}
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
    <td><button class="btn sm ghost" onclick="window._openStudentAccess('${p.id}',${p.grade_id||'null'},'${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')">🔧 Accesos</button></td></tr>`).join('');
  $('#main').innerHTML=`<h1>Alumnos</h1>${gradeFilterBar('window._setTeacherGrade')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Nivel</th><th>Accesos</th></tr></thead>
      <tbody>${rows||'<tr><td colspan="4" class="center muted">Sin alumnos para este filtro.</td></tr>'}</tbody></table>
      <div class="muted" style="padding:10px 14px">${list.length} alumno(s)</div></div>`;
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
      <td style="text-align:center" class="muted">${base?'Habilitado':'Bloqueado'}</td>
      <td style="text-align:center"><input type="checkbox" ${eff?'checked':''} onchange="window._setStudentAccess('${sid}','${n.key}',this.checked,this)"></td></tr>`;
  }).join('');
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="${isAdmin?'adminUsers':'teacherStudents'}()">← Volver a ${isAdmin?'Usuarios':'Alumnos'}</button>
    <h1 style="margin-top:8px">Accesos — ${esc(name)}</h1>
    <div class="note">Activa o bloquea actividades para este alumno. Por defecto hereda lo del grado; aquí defines la excepción.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Actividad</th><th>Por grado</th><th>Este alumno</th></tr></thead>
      <tbody>${rows||'<tr><td colspan="3" class="center muted">No tienes actividades asignadas para gestionar.</td></tr>'}</tbody></table></div>`;
};
window._setStudentAccess = async (sid,key,to,el)=>{
  el.disabled=true;
  const { error } = await sb.rpc('set_student_access',{p_student:sid,p_node:key,p_unlocked:to});
  el.disabled=false;
  if(error){ alert('No se pudo guardar: '+error.message); el.checked=!to; }
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
              <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span id="gw-total">0</span> / ${totalMax} · <span id="gw-pct">0</span>% · <span id="gw-cefr" style="background:#d1d2ea;color:#244c77;border-radius:8px;padding:2px 10px;font-size:1.05rem">—</span></div>
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
    {key:'home',label:'🏠 Home'},
    {key:'english',label:'🇬🇧 English'},
    {key:'french',label:'🇫🇷 French'},
    {key:'general',label:'🗂️ General'},
    {key:'results',label:'📊 My Progress'},
    {key:'account',label:'👤 Mi cuenta'},
  ], initial||'home', `<div class="center muted">Loading…</div>`);
  // Toda la navegación pasa por window._nav para que la ruta quede en el hash
  // (deep links desde las páginas de actividades + "atrás" del navegador).
  bindNav(k=>window._nav(k||'home'));
  state.access = await loadStudentAccess();   // Fase 2: visibilidad por nodo
  // Anti-trampa en todo el portal: mismo criterio que las actividades, pero
  // solo para alumnos logueados (docentes/admin quedan exentos en el motor).
  // En la vista de alumno no se arma el anti-trampa: quien está dentro es el
  // admin y no tiene sentido contarle salidas de pestaña ni reportarlas.
  try{ if(window.NISAntiCheat && !_isPreview()) NISAntiCheat.init({activity:'portal', label:'Portal NIS', requireStudent:true}); }catch(_){}
  // Volver desde un juego (./#classes_g9_unit_u4) reabre esa vista, no el hub.
  const deep=(location.hash||'').replace(/^#/,'');
  if(deep && _navRender(deep)) return;
  if(initial==='results') window._nav('results'); else studentHub();
}
function _setNav(k){ document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav===k)); }
function studentPhonics(){ _setNav('phonics'); $('#main').innerHTML = phonicsPanel(); }
function studentCoach(){ _setNav('coach'); $('#main').innerHTML = coachPanel(); }

/* ---------- Student account / password ----------
   Uses the authenticated user's own Supabase session. No password is stored
   in profiles, metadata or any public table. In admin preview mode this flow
   is deliberately blocked so an admin can never change their own password
   while impersonating a student. */
function studentAccount(){
  _setNav('account');
  const p=state.profile||{};
  const sessionUid=state.session && state.session.user ? state.session.user.id : null;
  const ownAccount=!_isPreview() && !!sessionUid && !!p.id && sessionUid===p.id;
  if(!ownAccount){
    $('#main').innerHTML=`<h1>👤 Mi cuenta</h1>
      <div class="card" style="max-width:680px">
        <div class="note info"><b>Cambio de contraseña no disponible en vista previa.</b><br>Sal de "Ver como" e inicia sesión con la cuenta del alumno para cambiar su contraseña.</div>
      </div>`;
    return;
  }
  $('#main').innerHTML=`<h1>👤 Mi cuenta</h1>
    <div class="card" style="max-width:680px">
      <h2>🔐 Cambiar contraseña</h2>
      <p class="muted">Elige una contraseña que puedas recordar. La nueva contraseña reemplazará inmediatamente a la anterior.</p>
      <label>Nueva contraseña</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="my_pw1" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres" style="flex:1">
        <button class="btn sm ghost" type="button" onclick="window.toggleMyPassword('my_pw1',this)">Mostrar</button>
      </div>
      <label>Repite la nueva contraseña</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="my_pw2" type="password" autocomplete="new-password" placeholder="Repite la contraseña" style="flex:1">
        <button class="btn sm ghost" type="button" onclick="window.toggleMyPassword('my_pw2',this)">Mostrar</button>
      </div>
      <div class="muted" style="font-size:.84rem;margin-top:8px">Consejo: usa una frase corta que recuerdes, combinando letras y números. No compartas tu contraseña.</div>
      <div id="my_pw_msg" style="margin-top:12px"></div>
      <button id="my_pw_save" class="btn" type="button" onclick="window.saveMyPassword()" style="margin-top:12px">Guardar nueva contraseña</button>
    </div>`;
  const first=$('#my_pw1'); if(first) first.focus();
}

window.toggleMyPassword=function(id,btn){
  const input=$('#'+id); if(!input) return;
  const show=input.type==='password';
  input.type=show?'text':'password';
  if(btn) btn.textContent=show?'Ocultar':'Mostrar';
};

window.saveMyPassword=async function(){
  const p=state.profile||{};
  const sessionUid=state.session && state.session.user ? state.session.user.id : null;
  const msg=$('#my_pw_msg'), btn=$('#my_pw_save');
  if(_isPreview() || !sessionUid || !p.id || sessionUid!==p.id){
    if(msg) msg.innerHTML='<div class="note err">Por seguridad, solo puedes cambiar la contraseña de tu propia cuenta.</div>';
    return;
  }
  const pw1=(($('#my_pw1')||{}).value||'').trim();
  const pw2=(($('#my_pw2')||{}).value||'').trim();
  if(pw1.length<8){ if(msg) msg.innerHTML='<div class="note err">La contraseña debe tener al menos 8 caracteres.</div>'; return; }
  if(pw1!==pw2){ if(msg) msg.innerHTML='<div class="note err">Las dos contraseñas no coinciden.</div>'; return; }
  if(btn){ btn.disabled=true; btn.textContent='Guardando…'; }
  if(msg) msg.innerHTML='<div class="note">Actualizando tu contraseña…</div>';
  try{
    const { error } = await withTimeout(sb.auth.updateUser({password:pw1}), STARTUP_TIMEOUT_MS, 'PASSWORD_UPDATE_TIMEOUT');
    if(error) throw error;
    const a=$('#my_pw1'), b=$('#my_pw2'); if(a) a.value=''; if(b) b.value='';
    if(msg) msg.innerHTML='<div class="note ok"><b>Contraseña actualizada correctamente.</b><br>Desde ahora usa tu nueva contraseña para iniciar sesión.</div>';
  }catch(e){
    const text=(e && e.message) ? e.message : 'No se pudo cambiar la contraseña.';
    if(msg) msg.innerHTML=`<div class="note err">${esc(text)}</div>`;
  }finally{
    if(btn){ btn.disabled=false; btn.textContent='Guardar nueva contraseña'; }
  }
};

/* ---------- Student dashboard (hub) ---------- */
function _hubCard(emoji,title,desc,onclick,extra){
  return `<div class="card center" ${onclick?`onclick="${onclick}" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${onclick}}"`:''} style="cursor:${onclick?'pointer':'default'};padding:28px 16px;margin-bottom:0;transition:.15s"
    onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
    <div style="font-size:3rem;line-height:1">${emoji}</div>
    <h2 style="margin:10px 0 4px;color:var(--blue-d)">${title}</h2>
    <div class="muted" style="font-size:.85rem">${desc}</div>${extra||''}
  </div>`;
}
/* La unidad en curso, en la portada.
   Un menu que la nombre ya es mejor que nada, pero lo que hace que la
   plataforma se LEA como un curso por proyectos es que al entrar veas en que
   proyecto estas: la pregunta que lo abre y lo que vas a producir. La nota de
   examen no ocupa este sitio -- tiene el suyo en My Progress. */
function _bandaMiUnidad(){
  const p = state.profile || {};
  if(!_isStudent() || !p.grade_id) return '';
  const key = 'g' + p.grade_id;
  const plan = (window.UNIT_PLANS || {})[key];
  if(!plan || !plan.units || !plan.units.length) return '';
  if(!nodeVisible('english.classes.' + key) || !nodeVisible(unitsNode(key))) return '';

  // La unidad en curso es la ULTIMA que su grado tiene abierta: las cerradas
  // son las que todavia no ha empezado.
  const abiertas = plan.units.filter(u => nodeVisible(_academicUnitNode(key, u.n)));
  const u = abiertas.length ? abiertas[abiertas.length - 1] : null;
  if(!u) return '';

  const producto = (u.deliverables && u.deliverables[0]) || null;
  return `<div class="card" style="margin-top:14px;border-top:5px solid var(--blue);
      background:linear-gradient(135deg,#f7faff,#eef4fb)">
    <div class="muted" style="font-size:.72rem;letter-spacing:.09em;text-transform:uppercase;font-weight:700">
      Your unit right now · Unit ${esc(String(u.n))}</div>
    <h2 style="margin:4px 0 6px;color:var(--blue-dd)">${esc(u.title)}</h2>
    ${u.bigq ? `<p style="margin:0 0 10px;font-size:1.02rem;color:var(--blue-d)"><b>${esc(u.bigq)}</b></p>` : ''}
    ${producto ? `<p class="muted" style="margin:0 0 12px;font-size:.9rem">
      What you will produce: <b>${esc(producto.title)}</b>${producto.spec ? ' — ' + esc(producto.spec) : ''}</p>` : ''}
    <button class="btn" onclick="window._nav('classes_${key}_units')">Open my unit</button>
  </div>`;
}

function studentHub(){
  _setNav('home');
  const p=state.profile;
  $('#main').innerHTML=`<h1>Hi, ${esc(p.first_name||p.full_name||'')} 👋</h1>
    <p class="muted" style="margin-top:-6px">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''} · Level ${esc(p.cefr_level||'not set')} — What would you like to do today?</p>
    ${_bandaMiUnidad()}
    <h2 style="margin:18px 0 8px">Subjects</h2>
    <div class="grid cols-3">
      ${_hubCard('🇬🇧','English','Pronunciation, Mocks, Classes and more.',"window._nav('english')")}
      ${nodeVisible('french') ? _hubCard('🇫🇷','French','Pronunciation, Mocks, Classes y más.',"window._nav('french')") : _lockedCard('🇫🇷','French','Próximamente — pronto habilitaremos el francés.')}
    </div>
    <h2 style="margin:22px 0 8px">General</h2>
    <div class="grid cols-3">
      ${nodeVisible('general.library') ? _hubCard('📚','Library','NIS Library: search and explore the school library.',"window._nav('library')") : _lockedCard('📚','Library','NIS Library.')}
      ${nodeVisible('general.mun') ? _hubCard('🌐','MUN Academy','Model United Nations: debate, public speaking and diplomacy.',"window._nav('mun')") : _lockedCard('🌐','MUN Academy','Model United Nations.')}
    </div>`;
}

/* ---------- Jerarquía de contenido: Materia → Área → Grado → Actividad ----------
   Las áreas de English se reflejan en French (placeholder hasta alimentarlas). */
const ENGLISH_AREAS = [
  // Va la PRIMERA a proposito. Direccion dijo que la plataforma se leia como
  // un simulador de examenes, y tenia razon leyendo esta pantalla: de diez
  // tarjetas cuatro eran de examen y la palabra "unidad" no aparecia en
  // ninguna. El proyecto existia -- con su pregunta, su producto y su rubrica
  // -- pero a cinco clics: English > Classes > etapa > grado > Units > unidad.
  // Lo que ordena el curso tiene que verse antes que lo que lo mide.
  {emoji:'🎯', title:'My unit',       desc:'Your project this term: the big question, what you will produce, and how it is marked.', nav:'myunit', node:'english.classes'},
  // Y el proyecto del trimestre justo detras: la unidad es una parte de el.
  // Silvia pregunto donde estaban los proyectos y la respuesta honesta era
  // que existian pero no se veian. Once semanas de trabajo no pueden vivir
  // dentro de una pagina de unidad a la que se llega por cinco clics.
  {emoji:'🧩', title:'My project',    desc:'The interdisciplinary project of this term: eleven weeks, and every subject pulling the same way.', nav:'projects', node:'english.classes', when:_verProyectos},
  {emoji:'🎙️', title:'Pronunciation', desc:'Listen to each sound, watch the tongue and airflow, and practise.', nav:'coach',    node:'english.pronunciation'},
  {emoji:'🎓', icon:'main', title:'Cambridge', desc:'YLE and Main Suite: the official Cambridge route from Pre-A1 to C2, with practice tests.', nav:'cambridge', node:'english.cambridge'},
  {emoji:'🎓', title:'Mocks',         desc:'Official MOCK 1 and MOCK 2 exams by skill.',        nav:'mocks'},
  {emoji:'🎮', title:'NIShoot Live',  desc:"Join your class's live game: enter with the PIN.",    nav:'nishoot'},
  {emoji:'🎲', title:'Games Lab',     desc:'7 games per topic for grammar, vocabulary, phrasal verbs and idioms (A1–C1).', nav:'games'},
  {emoji:'🏫', title:'Classes',       desc:'Class material by grade: grammar, activities and more.',  nav:'classes',  node:'english.classes'},
  {emoji:'🎯', title:'Practice Tests',desc:'Practice tests 1, 2 and 3 in Cambridge format, always available.', nav:'practice', node:'english.practice'},
  {emoji:'🔤', title:'Phonics',       desc:'Sounds and word shapes: CVC, blends, magic-e.',  nav:'phonics',  node:'english.phonics'},
  {emoji:'📊', title:'My Progress',   desc:'Todos tus exámenes y prácticas: tu historial y avance.',    nav:'results', englishOnly:true},
  {emoji:'🏅', title:'Resultado final',desc:'Tu nivel final CEFR (reporte para los padres) + PDF.',      nav:'final',   englishOnly:true},
];
function _backBtn(onclick,label){
  return `<button class="btn sm ghost" onclick="${onclick}" style="margin-bottom:10px">← ${label}</button>`;
}
function _isStudent(){ return !!(state.profile && state.profile.role==='student'); }

/* ===== Fase 2: visibilidad por nodo (admin->grado->alumno) =====
   Defaults: nodos existentes ABIERTOS; nodos nuevos BLOQUEADOS hasta que el
   admin los habilite. La resolución es client-side (igual que Mocks). */
/* 3.º–5.º de primaria nacen CERRADOS (aún sin contenido); 2.º nace abierto
   porque la Unit 4 "In the Kitchen" ya está publicada. */
const NODE_DEFAULT_LOCKED = new Set(['french','english.classes.g9.grammar',
  'english.classes.g3','english.classes.g4','english.classes.g5']);
/* Unidades del PILOTO 2027 — el modelo nuevo: un producto por unidad con una
   sola nota, la cobertura Cambridge repartida dentro del proyecto y la obra
   del trimestre. Nacen CERRADAS para el alumno: el piloto lo conducen el
   profesor y el admin, que las ven siempre. Se abren desde 🔐 Accesos una a
   una cuando el colegio lo decida.
   La clave ya existía en node_access (english.classes.g9.units.u5, en false)
   pero NADIE la miraba: el listado pintaba todas las unidades del grado, así
   que el candado estaba puesto y la puerta abierta. */
const UNIT_PILOT = new Set([
  'english.classes.g2.units.u5','english.classes.g2.units.u6',
  'english.classes.g3.units.u5','english.classes.g3.units.u6',
  'english.classes.g4.units.u5','english.classes.g4.units.u6',
  'english.classes.g5.units.u5','english.classes.g5.units.u6',
  'english.classes.g9.units.u105','english.classes.g9.units.u106',
]);
function _nodeDefaultOpen(key){
  // Unidades y semanas: cada una decide su default con `locked` en
  // activities-data.js (así una semana futura puede nacer cerrada).
  // Va ANTES del corte general de French a propósito: si no, la regla
  // "todo french nace cerrado" pisaba el `locked` de cada semana y el
  // profesor tendría que abrir a mano las 36 semanas para arrancar.
  // Da igual el orden para la seguridad: la unidad y el Activities de los
  // que cuelgan siguen naciendo cerrados, y cerrar el padre gana.
  const n=_SUB_BY_KEY[key];
  if(n) return !n.locked;
  if(key==='french' || key.indexOf('french')===0) return false;   // subárbol French = nuevo
  if(key.slice(-8)==='.grammar') return false;                    // grammar = nuevo
  return !NODE_DEFAULT_LOCKED.has(key);
}
async function loadStudentAccess(){
  const p=state.profile; const out={grade:{}, student:{}};
  if(!p || p.role!=='student') return out;
  try{
    const [g,s] = await Promise.all([
      p.grade_id!=null ? sb.from('node_access').select('node_key,unlocked').eq('grade_id',p.grade_id) : Promise.resolve({data:[]}),
      // p.id es nulo en la vista por grado (alumno tipo): no hay overrides que pedir.
      p.id ? sb.from('student_access').select('node_key,unlocked').eq('student_id',p.id) : Promise.resolve({data:[]})
    ]);
    (g.data||[]).forEach(r=>out.grade[r.node_key]=r.unlocked);
    (s.data||[]).forEach(r=>out.student[r.node_key]=r.unlocked);
  }catch(e){}
  return out;
}
/* ¿Visible este nodo para el usuario actual? Admin/Profesor: siempre (preview). */
function nodeVisible(key){
  const p=state.profile;
  if(p && p.role==='admin') return true;                       // admin: preview total
  if(p && p.role==='teacher'){                                 // profesor: según lo asignado por el admin
    const tn=state.teacherNodes;
    if(!tn || !tn.has) return true;                            // sin configurar → ve todo
    // Unidades y semanas siguen a su Activities: el candado fino es para el
    // alumno, no para el profesor, y así los profesores ya configurados no
    // dejan de ver una unidad o semana recién añadida.
    const k=_GATE_PARENT[key]||key;
    if(!_GATEABLE.has(k)) return true;                         // claves no gestionables → visibles
    return tn.set.has(k);
  }
  const a=state.access||{grade:{},student:{}};
  if(Object.prototype.hasOwnProperty.call(a.student,key)) return !!a.student[key]; // override por alumno
  if(Object.prototype.hasOwnProperty.call(a.grade,key))   return !!a.grade[key];   // habilitación por grado
  return _nodeDefaultOpen(key);
}
function _lockedCard(emoji,title,desc){
  return `<div class="card center" style="padding:28px 16px;margin-bottom:0;opacity:.7">
    <div style="font-size:3rem;line-height:1">${emoji}</div>
    <h2 style="margin:10px 0 4px;color:var(--blue-d)">${title}</h2>
    <div class="muted" style="font-size:.85rem">${desc||''}</div>
    <div class="badge" style="background:#fee2e2;color:#991b1b;margin-top:10px">🔒 Your teacher will unlock this</div>
  </div>`;
}

/* ===== 👁️ VISTA COMO ALUMNO (solo admin) =====
   Para comprobar qué ve EXACTAMENTE un alumno sin pedirle su contraseña.
   Truco: se cambia `state.profile` por el del alumno y se recargan SUS accesos.
   Como todas las vistas de alumno leen `state.profile`, `state.access` y
   `nodeVisible()`, el portal se pinta con sus candados sin tocar la sesión
   (sigue siendo la del admin) ni escribir nada en la base. El perfil real
   espera en `state.realProfile` y salir lo restaura; recargar también.
   Dos modos:
     · por ALUMNO → incluye sus excepciones de `student_access`;
     · por GRADO  → alumno tipo, sin excepciones: solo lo que abre el grado.
   Ojo si se amplía: NO habilitar acciones que escriban durante la vista; el
   alumno previsualizado no ha consentido nada y las escrituras irían con la
   sesión del admin. */
function _isPreview(){ return !!state.preview; }
function _canPreview(){ const p=state.realProfile||state.profile; return !!(p && p.role==='admin'); }
window._previewStudent = async (sid, name)=>{
  if(!_canPreview()) return;
  const { data, error } = await sb.from('profiles').select('*, grades(name)').eq('id',sid).single();
  if(error || !data) return alert('No se pudo abrir la vista del alumno: '+((error&&error.message)||'sin datos'));
  await _previewEnter({kind:'student', label:(data.full_name||name||'alumno'), backTab:'users'}, data);
};
window._previewGrade = async (gradeId)=>{
  if(!_canPreview()) return;
  const g = GRADES.find(x=>String(x.id)===String(gradeId));
  if(!g) return alert('Elige un grado.');
  /* Alumno sintético SIN id: así no hay overrides por alumno que consultar y
     los paneles de historial avisan en vez de consultar con id nulo. */
  await _previewEnter({kind:'grade', label:'alumno tipo de '+g.name, backTab:'access'},
    {id:null, role:'student', full_name:'alumno de '+g.name, first_name:'alumno de '+g.name,
     last_name:'', section:null, cefr_level:null, grade_id:g.id, grades:{name:g.name}, active:true});
};
async function _previewEnter(meta, profile){
  state.realProfile = state.realProfile || state.profile;
  state.preview = meta;
  state.profile = profile;
  _previewClearHash();
  await renderStudent('home');
}
window._previewExit = ()=>{
  const tab=(state.preview&&state.preview.backTab)||'users';
  if(state.realProfile) state.profile = state.realProfile;
  state.realProfile=null; state.preview=null; state.access=null;
  _previewClearHash();
  renderAdmin(tab);
};
function _previewClearHash(){
  try{ history.replaceState(null,'',location.pathname+location.search); }
  catch(_){ location.hash=''; }
}
/* Barra permanente: va dentro de header(), así sale en TODA vista de alumno. */
function _previewBar(){
  if(!_isPreview()) return '';
  const m=state.preview;
  const note = m.kind==='grade'
    ? 'Alumno tipo: solo lo que abre el grado, sin excepciones por alumno.'
    : 'Con sus excepciones por alumno.';
  return `<div class="preview-bar">
    <span>👁️ Estás viendo el portal como <b>${esc(m.label)}</b></span>
    <span class="pv-note">${note} Solo lectura.</span>
    <button class="btn sm" onclick="window._previewExit()">✕ Salir de la vista</button></div>`;
}
/* Aviso en los paneles que necesitan un alumno concreto (modo por grado). */
function _previewNeedsStudent(title, back){
  $('#main').innerHTML=`${back||''}<h1>${title}</h1>
    <div class="note">Esta vista es el historial personal de un alumno, así que en la
      <b>vista por grado</b> no hay datos que mostrar. Sal de la vista y entra desde
      <b>👥 Usuarios → 👁️ Ver como</b> con un alumno concreto.</div>`;
}
/* Nodos gateables por el admin/profesor (Mocks va aparte; My Progress y Resultado final son datos propios). */
/* Primaria (2.º–5.º): sin `.grammar` — como en francés, la gramática de
   primaria vive dentro de las actividades, no en página aparte. */
const _PRIM_GRADE_NODES = ['g2','g3','g4','g5'].flatMap(g=>{
  const lbl = {g2:'2nd',g3:'3rd',g4:'4th',g5:'5th'}[g];
  return [
    {key:'english.classes.'+g,               label:'🧒 Classes · '+lbl+' grade'},
    {key:'english.classes.'+g+'.activities', label:'🧒 '+lbl+' · Activities'},
  ];
});
const _GRADE_NODES = [..._PRIM_GRADE_NODES, ...['g6','g7','g8','g9','g10','g11'].flatMap(g=>{
  const lbl = {g6:'6th',g7:'7th',g8:'8th',g9:'9th',g10:'10th',g11:'11th'}[g];
  return [
    {key:'english.classes.'+g,            label:'Classes · '+lbl+' grade'},
    {key:'english.classes.'+g+'.activities', label:lbl+' · Activities'},
    {key:'english.classes.'+g+'.grammar',    label:lbl+' · Grammar'},
  ];
})];
/* Los mismos nodos para francés (5.º–10.º). Sin `.grammar`: en francés la
   gramática vive dentro de las actividades de cada semana, no en página aparte. */
const _FR_GRADE_NODES = ['g5','g6','g7','g8','g9','g10'].flatMap(g=>{
  const lbl = {g5:'5e',g6:'6e',g7:'7e',g8:'8e',g9:'9e',g10:'10e'}[g];
  return [
    {key:'french.classes.'+g,                label:'🇫🇷 Classes · '+lbl},
    {key:'french.classes.'+g+'.activities',  label:'🇫🇷 '+lbl+' · Activités'},
  ];
});
/* Un nodo por UNIDAD y otro por SEMANA, colgando del de Activities de su
   grado. Se derivan de activities-data.js, así que añadir allí una unidad
   o una semana la hace gateable sola. */
function _unitNode(grade,unitId,subject){ return (subject||'english')+'.classes.'+grade+'.activities.'+unitId; }
function _weekNode(grade,unitId,weekId,subject){ return _unitNode(grade,unitId,subject)+'.'+weekId; }
function _academicUnitNode(grade,n){ return 'english.classes.'+grade+'.units.u'+n; }
/* Las unidades del PILOTO 2027 nacen cerradas para el alumno; las conducen
   profesor y admin, que las ven siempre. Se abren desde el panel de Accesos
   cuando el colegio lo decida. Antes esto era `grade==='g9' && n>4`, que solo
   contemplaba 9.o; el piloto llego tambien a primaria, asi que la lista es
   ahora explicita (UNIT_PILOT). */
function _academicUnitDefault(grade,n){
  if(UNIT_PILOT.has(_academicUnitNode(grade,n))) return false;   // piloto 2027
  return !(grade==='g9' && Number(n)>4);                          // regla previa de 9.o
}
/* La materia de una unidad: 'english' salvo que activities-fr-data.js la
   haya marcado como 'french'. Todo lo que ya existía cae en el default. */
function _subjOf(u){ return (u && u.subject) || 'english'; }
const _GRADE_LBL={g2:'2nd',g3:'3rd',g4:'4th',g5:'5th',g6:'6th',g7:'7th',g8:'8th',g9:'9th',g10:'10th',g11:'11th'};
/* En francés los grados se nombran a la francesa (5e, 6e…). Va aquí y no en
   FR_GRADE_META porque _UNIT_NODES se evalúa mucho antes que aquella. */
const _FR_LBL={g5:'5e',g6:'6e',g7:'7e',g8:'8e',g9:'9e',g10:'10e'};
function _gradeLbl(grade,subject){
  return (subject==='french' ? _FR_LBL[grade] : _GRADE_LBL[grade]) || grade;
}
const _shortTitle = t => String(t||'').split('—')[0].trim();
const _UNIT_NODES = (function(){
  const d=window.ACTIVITIES_DATA;
  if(!d || !Array.isArray(d.units)) return [];
  return d.units.map(u=>{
    const s=_subjOf(u);
    return {
      key:   _unitNode(u.grade,u.id,s),
      label: (s==='french'?'🇫🇷 ':'')+_gradeLbl(u.grade,s)+' · '+u.title,
      grade: u.grade,
      parent:s+'.classes.'+u.grade+'.activities',
      locked:!!u.locked,
    };
  });
})();
const _WEEK_NODES = (function(){
  const d=window.ACTIVITIES_DATA;
  if(!d || !Array.isArray(d.units)) return [];
  const out=[];
  d.units.forEach(u=>(u.weeks||[]).forEach(w=>{
    if(!w.title) return;            // unidad de una sola tanda: la semana ES la unidad
    const s=_subjOf(u);
    out.push({
      key:   _weekNode(u.grade,u.id,w.id,s),
      label: (s==='french'?'🇫🇷 ':'')+_gradeLbl(u.grade,s)+' · '+String(u.id).toUpperCase()+' · '+w.title,
      grade: u.grade,
      parent:s+'.classes.'+u.grade+'.activities',
      locked:!!w.locked,
    });
  }));
  return out;
})();
const _PLAN_UNIT_NODES=(function(){
  const out=[];
  Object.keys(window.UNIT_PLANS||{}).forEach(g=>unitPlansFor(g).forEach(u=>out.push({
    key:_academicUnitNode(g,u.n),label:_gradeLbl(g,'english')+' · Unit '+(u.label||u.n)+' · '+u.title,
    grade:g,parent:unitsNode(g),locked:!_academicUnitDefault(g,u.n)
  })));
  return out;
})();
/* Unidades y semanas comparten tratamiento: default propio (`locked`) y, para
   el profesor, herencia del Activities del que cuelgan. */
const _SUB_NODES  = [..._UNIT_NODES, ..._WEEK_NODES, ..._PLAN_UNIT_NODES];
const _SUB_BY_KEY = (function(){ const m={}; _SUB_NODES.forEach(n=>m[n.key]=n); return m; })();
const _GATE_PARENT= (function(){ const m={}; _SUB_NODES.forEach(n=>m[n.key]=n.parent); return m; })();
/* ===================== CAMBRIDGE · YLE + MAIN SUITE =====================
   La misma tarjeta doble de cohasset.pe/cambridge-portal.html, servida aquí
   con lo que NIS ya tenía (Fun for Nordic, Listening B2, Use of English,
   Writing, Practice Tests) y con lo que se trajo de Cohasset tal cual se
   comparten los demás cursos: una copia en este repo, servida desde este
   origen — cambridge-level.html + cambridge-data/ (KET…CPE) y
   cambridge-bonus.html (su audio sale del mismo bucket de Supabase que el
   Listening B2). Flyers ya no tiene motor propio: desde el 5-sep-2026 sus diez
   tests viven en yle/flyers/ y los pinta yle-practice.html, como Starters y
   Movers, así que cuentan escudos y llegan al panel del profesor. Los dibujos salen de cambridge-icons.js,
   que es UN archivo copiado igual a las dos webs.

   Cada rama y cada nivel es un nodo de acceso (english.cambridge.<rama>.<nivel>)
   para que el admin decida por grado o por alumno qué ve cada uno, desde
   📋 Plan de estudio. Nacen ABIERTOS, como el resto de nodos que ya existían:
   el panel trae un reparto sugerido que se aplica con un botón, no solo. */
const CAMBRIDGE_TRACKS = {
  yle: {
    node:'english.cambridge.yle', icon:'yle', color:'#F59E0B',
    title:'YLE', tag:'Young Learners English', panelTitle:'Young Learners English (YLE)',
    desc:'Exams for children, with playful reading, listening and speaking tasks.',
    levels:[
      {key:'starters',    icon:'starters', name:'Starters', cefr:'Pre-A1 · YLE', short:'Starters',
       desc:'First contact with English — Fun for Nordic 1, with audio, games and exam tasks.', href:'nis-fun/engine/?level=starters'},
      {key:'starterstests', icon:'practice', name:'Starters Practice Tests', cefr:'Pre A1 · practice tests', short:'Starters Tests',
       desc:'Full Pre A1 Starters practice tests with the official format and timing: Listening, Reading & Writing and Speaking, with colouring and a virtual examiner.', href:'yle-practice.html?level=starters'},
      {key:'movers',      icon:'movers',   name:'Movers',   cefr:'A1 · YLE', short:'Movers',
       desc:'Move on with simple sentences — Fun for Nordic 2.', href:'nis-fun/engine/?level=movers'},
      {key:'moverstests', icon:'practice', name:'Movers Practice Tests', cefr:'A1 · practice tests', short:'Movers Tests',
       desc:'Full A1 Movers practice tests with the official format and timing: Listening, Reading & Writing and Speaking, with find-the-differences, picture stories and odd-one-out.', href:'yle-practice.html?level=movers'},
      {key:'flyers',      icon:'flyers',   name:'Flyers',   cefr:'A2 · YLE', short:'Flyers',
       desc:'The A2 Flyers course — Fun for Nordic 3, unit by unit.', href:'nis-fun/engine/?level=flyers'},
      {key:'flyerstests', icon:'practice', name:'Flyers Practice Tests', cefr:'A2 · 10 tests', short:'Flyers Tests',
       desc:'Full A2 Flyers practice tests with the official format and timing: Listening, Reading & Writing and Speaking, with the eight-answer dialogue, the open cloze and the picture story.', href:'yle-practice.html?level=flyers'},
    ]},
  main: {
    node:'english.cambridge.main', icon:'main', color:'#7C3AED',
    title:'MAIN SUITE', tag:'Cambridge General English', panelTitle:'Cambridge Main Suite',
    desc:'The main certification route, from A2 to C2.',
    levels:[
      {key:'ket', icon:'ket', name:'A2 Key',         cefr:'A2 · KET', short:'KET',
       desc:'Basic level: everyday words and phrases. 3 papers (Reading & Writing, Listening, Speaking).', href:'cambridge-level.html?level=ket'},
      {key:'pet', icon:'pet', name:'B1 Preliminary', cefr:'B1 · PET', short:'PET',
       desc:'Intermediate: work, study and travel. 3 papers (Reading & Writing, Listening, Speaking).', href:'cambridge-level.html?level=pet'},
      {key:'fce', icon:'fce', name:'B2 First',       cefr:'B2 · FCE', short:'FCE',
       desc:'Upper-intermediate, the most requested. 4 papers (Reading & Use of English, Writing, Listening, Speaking).', href:'cambridge-level.html?level=fce'},
      {key:'cae', icon:'cae', name:'C1 Advanced',    cefr:'C1 · CAE', short:'CAE',
       desc:'Advanced level for university and professional work. Longer, more complex texts.', href:'cambridge-level.html?level=cae'},
      {key:'cpe', icon:'cpe', name:'C2 Proficiency', cefr:'C2 · CPE', short:'CPE',
       desc:'The highest level, close to an educated native speaker. Sophisticated language.', href:'cambridge-level.html?level=cpe'},
      {key:'listening', icon:'listening', name:'B2 First · Listening', cefr:'B2 · Authentic audio', short:'B2 Listening',
       desc:'55 real exam-style recordings by unit with a full player, and tasks (Parts 1–4) that mark themselves.', href:'cambridge-listening.html'},
      {key:'uoe', icon:'uoe', name:'B2 First · Use of English', cefr:'B2 · Part 1', short:'B2 UoE',
       desc:'Multiple-choice cloze: 8 gaps, options A–D, with correction and explanations.', href:'use-of-english-part1.html'},
      {key:'writing', icon:'writing', name:'B2 First · Writing', cefr:'B2 · Essay', short:'B2 Writing',
       desc:'Opinion essay (Writing Part 1): 6 topics, linkers bank, word counter and checklist.', href:'writing.html'},
      {key:'bonus', icon:'bonus', name:'FCE Bonus', cefr:'B2 · Extra practice', short:'FCE Bonus',
       desc:'7 extra interactive exercises: Use of English, reading, listening and writing.', href:'cambridge-bonus.html'},
    ]},
};
/* Practice Test reutiliza el nodo y el candado que ya existían (english.practice
   + practice_access): un solo interruptor para la misma cosa. */
const CAMBRIDGE_PRACTICE_NODE = 'english.practice';
Object.keys(CAMBRIDGE_TRACKS).forEach(bk => {
  CAMBRIDGE_TRACKS[bk].levels.forEach(l => { l.node = CAMBRIDGE_TRACKS[bk].node + '.' + l.key; });
});
/* Nodos que se suman a ACCESS_NODES (van a 🔐 Accesos, a los chips del
   profesor y al editor por alumno sin tocar nada más). */
const _CAMBRIDGE_NODES = [
  {key:'english.cambridge', label:'Cambridge (YLE + Main Suite)'},
  ...Object.keys(CAMBRIDGE_TRACKS).flatMap(bk => {
    const b = CAMBRIDGE_TRACKS[bk];
    return [{key:b.node, label:'Cambridge · ' + b.title},
            ...b.levels.map(l => ({key:l.node, label:'Cambridge · ' + b.title + ' · ' + l.name}))];
  }),
];
/* Reparto sugerido por grado: sale de GRADE_LEVELS (el nivel del Marco que
   trabaja cada grado) y de FUN_REPARTO (qué Fun for Nordic hace cada grado
   de primaria). Es una PROPUESTA: el botón del panel la aplica, y lo que no
   está en la lista de un grado se cierra para ese grado. */
const CAMBRIDGE_REPARTO = {
  1:  ['yle.starters','yle.starterstests'],
  2:  ['yle.starters','yle.starterstests'],
  3:  ['yle.movers','yle.moverstests'],
  4:  ['yle.movers','yle.moverstests','yle.flyers'],
  5:  ['yle.flyers','yle.flyerstests','main.ket'],
  6:  ['main.ket','main.pet'],
  7:  ['main.pet','main.fce','main.listening','main.uoe','main.writing','main.bonus'],
  8:  ['main.pet','main.fce','main.listening','main.uoe','main.writing','main.bonus'],
  9:  ['main.fce','main.listening','main.uoe','main.writing','main.bonus','main.cae'],
  10: ['main.fce','main.listening','main.uoe','main.writing','main.bonus','main.cae'],
  11: ['main.fce','main.listening','main.uoe','main.writing','main.bonus','main.cae','main.cpe'],
};
function _camIco(key, size){ return (typeof camIcon === 'function') ? camIcon(key, size) : ''; }

/* Lo que el admin/profesor escribió para el grado y para el alumno (tabla
   study_plans). El alumno lo ve arriba del hub; sin nota no se pinta nada. */
/* Fecha del examen oficial de Cambridge (la pone el admin en yle_settings).
   Vale para las dos ramas: la sesion es la misma para YLE y para Main Suite. */
async function cambridgeExamDate(){
  try{
    const { data } = await sb.from('yle_settings').select('key,value').in('key', ['exam_date', 'exam_note']);
    const m = {}; (data || []).forEach(r => m[r.key] = r.value);
    return m.exam_date ? {date: m.exam_date, note: m.exam_note || ''} : null;
  }catch(e){ return null; }
}

async function cambridgePlanNotes(){
  const p = state.profile; if(!p) return [];
  const ors = [];
  if(p.grade_id != null) ors.push(`ref.eq.g:${p.grade_id}`);
  if(p.id) ors.push(`ref.eq.s:${p.id}`);
  if(!ors.length) return [];
  try{
    const { data } = await sb.from('study_plans').select('scope,ref,note,updated_at').eq('area','cambridge').or(ors.join(','));
    return (data || []).filter(r => (r.note || '').trim());
  }catch(e){ return []; }
}

async function studentCambridgePortal(){
  _setNav(_isStudent() ? 'english' : 'cambridgehub');
  const back = _isStudent() ? _backBtn("window._nav('english')", 'English') : '';
  if(!nodeVisible('english.cambridge')){ _lockedView(back, '🎓 Cambridge English'); return; }
  const route = 'cambridge';
  const branch = (bk) => {
    const b = CAMBRIDGE_TRACKS[bk], on = nodeVisible(b.node);
    const chips = b.levels.map(l => `<span>${esc(l.short)}</span>`).join('');
    return `<button type="button" class="cam-branch ${bk}" id="cam-br-${bk}" style="--accent:${b.color}"
        aria-expanded="false" aria-controls="cam-panel-${bk}" onclick="window._camToggle('${bk}')" ${on ? '' : 'disabled'}>
      <span class="cam-chev" aria-hidden="true">⌄</span>
      ${_camIco(b.icon, 96)}
      <h2>${b.title}</h2>
      <div class="cam-tag">${b.tag}</div>
      <p>${b.desc}</p>
      <div class="cam-levels-inline">${chips}</div>
      ${on ? '' : '<div class="badge" style="background:#fee2e2;color:#991b1b;margin-top:12px">🔒 Your teacher will unlock this</div>'}
    </button>`;
  };
  const tile = (l) => {
    const on = nodeVisible(l.node);
    const inner = `${on ? '<span class="cam-badge ready">Available</span>' : '<span class="cam-badge locked">🔒 Locked</span>'}
      ${_camIco(l.icon, 56)}<div class="cam-name">${esc(l.name)}</div><div class="cam-cefr">${esc(l.cefr)}</div><div class="cam-desc">${esc(l.desc)}</div>`;
    return on ? `<a class="cam-tile" href="${_withBack(l.href, route)}">${inner}</a>`
              : `<div class="cam-tile locked" aria-disabled="true">${inner}</div>`;
  };
  const panel = (bk) => {
    const b = CAMBRIDGE_TRACKS[bk];
    if(!nodeVisible(b.node)) return '';
    return `<div class="cam-panel" id="cam-panel-${bk}"><div class="cam-panel-inner">
      <h3><span class="cam-bar" style="background:${b.color}"></span>${b.panelTitle}</h3>
      <div class="cam-tiles">${b.levels.map(tile).join('')}</div>
    </div></div>`;
  };
  const practice = nodeVisible(CAMBRIDGE_PRACTICE_NODE) ? `
    <a class="cam-practice" href="${QUIZ_URL}quizzes.html">
      <div class="cam-pwrap">
        ${_camIco('practice', 84)}
        <div class="cam-ptxt">
          <div class="cam-kicker">⚡ Practice Test</div>
          <h2>Cambridge mock exams · Practice Test</h2>
          <p>Exam-style <b>Reading</b>, <b>Listening</b> and <b>Writing</b> practice in the official Cambridge format, with a timer, real parts and automatic marking.</p>
          <div class="cam-skills"><span>📖 Reading</span><span>🎧 Listening</span><span>✍️ Writing</span></div>
        </div>
        <span class="cam-cta">Open Practice Test →</span>
      </div>
    </a>` : '';
  $('#main').innerHTML = `${back}<h1>🎓 Cambridge English</h1>
    <p class="muted" style="margin-top:-6px">Choose your route: <b>Young Learners</b> for children (Pre-A1 to A2) or <b>Main Suite</b> for the general exam (A2 to C2). Click a card to see its levels.</p>
    <div id="cam-exam-date"></div>
    <div id="cam-plan-notes"></div>
    <div class="cam-branches">${branch('yle')}${branch('main')}</div>
    ${practice}
    ${panel('yle')}${panel('main')}
    <p class="muted center" style="font-size:.8rem;margin-top:22px">ℹ️ Each Main Suite level opens its <b>exam guide and practice tests</b>. For timed Reading, Listening and Writing mocks, use <b>Practice Test</b>.</p>`;
  // Se abre la rama que le toca: primaria entra por YLE, secundaria por Main Suite.
  const p = state.profile, prim = p && p.grade_id != null && Number(p.grade_id) <= 5;
  const first = prim ? 'yle' : 'main', other = prim ? 'main' : 'yle';
  window._camToggle(nodeVisible(CAMBRIDGE_TRACKS[first].node) ? first : other);
  // Las instrucciones del plan llegan después: no retrasan la pantalla.
  cambridgeExamDate().then(x => {
    const caja = $('#cam-exam-date'); if(!caja || !x) return;
    const d = new Date(x.date + 'T12:00:00');
    const txt = isNaN(d) ? x.date : d.toLocaleDateString('es-PE', {day: 'numeric', month: 'long', year: 'numeric'});
    caja.innerHTML = `<div class="cam-plan"><b>🗓️ Examen oficial de Cambridge:</b> ${esc(txt)}${x.note ? ' · ' + esc(x.note) : ''}</div>`;
  });
  cambridgePlanNotes().then(notas => {
    const box = $('#cam-plan-notes'); if(!box || !notas.length) return;
    const grado = notas.find(n => n.scope === 'grade'), mio = notas.find(n => n.scope === 'student');
    const bloque = (t, n) => `<div class="cam-plan"><b>${t}</b> ${esc(n.note).replace(/\n/g,'<br>')}</div>`;
    box.innerHTML = (mio ? bloque('📌 Your plan:', mio) : '') + (grado && !mio ? bloque('📌 This term:', grado) : '');
  });
}
window._camToggle = (which) => {
  ['yle','main'].forEach(k => {
    const br = document.getElementById('cam-br-' + k), pn = document.getElementById('cam-panel-' + k);
    if(!br) return;
    if(k === which && pn){
      const abrir = !pn.classList.contains('open');
      pn.classList.toggle('open', abrir); br.classList.toggle('active', abrir); br.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    } else { if(pn) pn.classList.remove('open'); br.classList.remove('active'); br.setAttribute('aria-expanded', 'false'); }
  });
};

/* ===================== 📋 PLAN DE ESTUDIO (admin) =====================
   Qué parte de Cambridge estudia cada grado y, para los alumnos con plan
   individual (EPI), qué estudia cada uno. No inventa una tabla nueva para
   los candados: escribe en node_access (grado) y student_access (alumno),
   que es lo que ya lee nodeVisible(); lo único nuevo es la marca
   profiles.individual_plan y las instrucciones en study_plans. */
const _PLAN_COLS = Object.keys(CAMBRIDGE_TRACKS).flatMap(bk =>
  CAMBRIDGE_TRACKS[bk].levels.map(l => ({ bk, node:l.node, short:l.short, name:l.name })));
let _planTab = 'grades', _planStudent = null, _planFiltro = '';

async function studyPlanPanel(){
  state._tab = 'studyplan';
  const tabs = `<div class="row" style="gap:8px;margin-bottom:12px;flex-wrap:wrap">
      <button class="btn sm ${_planTab==='grades'?'':'ghost'}" onclick="window._planGo('grades')">🏫 Por grado</button>
      <button class="btn sm ${_planTab==='epi'?'':'ghost'}" onclick="window._planGo('epi')">🧑‍🎓 Alumnos con plan individual (EPI)</button>
      <span style="flex:1"></span>
      <button class="btn sm ghost" onclick="studentCambridgePortal()">👁️ Ver la tarjeta Cambridge</button>
    </div>`;
  $('#main').innerHTML = `<h1>📋 Plan de estudio — Cambridge</h1>
    <div class="note">Aquí se decide <b>qué parte de YLE y Main Suite ve cada grado</b> y, abajo, qué ve <b>cada alumno con plan individual (EPI)</b>. Una casilla marcada = ese material se ofrece; sin marcar = candado. Lo que no se ha tocado nunca está abierto, como el resto de accesos. Las instrucciones que escribas aparecen al alumno arriba de su tarjeta Cambridge.</div>
    ${tabs}<div id="plan-body"><div class="center muted">Cargando…</div></div>`;
  if(_planTab === 'grades') await _planGrades(); else await _planEpi();
}
window._planGo = (t) => { _planTab = t; studyPlanPanel(); };

async function _planGrades(){
  const [na, pa, sp] = await Promise.all([
    sb.from('node_access').select('grade_id,node_key,unlocked'),
    sb.from('practice_access').select('grade_id,unlocked'),
    sb.from('study_plans').select('ref,note').eq('area','cambridge').eq('scope','grade'),
  ]);
  const err = na.error || pa.error || sp.error;
  if(err){ $('#plan-body').innerHTML = `<div class="note err">${esc(err.message)}</div>`; return; }
  const map = {}; (na.data||[]).forEach(r => { (map[r.grade_id] = map[r.grade_id] || {})[r.node_key] = r.unlocked; });
  const prac = {}; (pa.data||[]).forEach(r => prac[r.grade_id] = r.unlocked);
  const notas = {}; (sp.data||[]).forEach(r => notas[r.ref] = r.note || '');
  const on = (g, k) => Object.prototype.hasOwnProperty.call(map[g]||{}, k) ? !!map[g][k] : _nodeDefaultOpen(k);
  const chk = (g, k) => `<td class="${on(g,k)?'':'plan-off'}"><input type="checkbox" ${on(g,k)?'checked':''} title="${esc(k)}"
      onchange="window._planSetNode(${g},'${k}',this.checked,this)"></td>`;
  const head1 = `<tr><th rowspan="2">Grado</th><th rowspan="2" title="Interruptor general de la tarjeta">🎓<br>Cambridge</th>`
    + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
        return `<th class="plan-track" colspan="${b.levels.length + 1}" style="background:${b.color}">${b.title}</th>`; }).join('')
    + `<th rowspan="2">🎯<br>Practice</th><th rowspan="2" style="min-width:260px">Instrucciones para el grado</th></tr>`;
  const head2 = `<tr>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
        return `<th title="Toda la rama">Rama</th>` + b.levels.map(l => `<th>${esc(l.short)}</th>`).join(''); }).join('') + `</tr>`;
  const rows = GRADES.map(g => {
    const pOn = Object.prototype.hasOwnProperty.call(prac, g.id) ? !!prac[g.id] : true;
    const ref = 'g:' + g.id;
    return `<tr data-g="${g.id}"><td><b>${g.name}</b></td>${chk(g.id,'english.cambridge')}`
      + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
          return chk(g.id, b.node) + b.levels.map(l => chk(g.id, l.node)).join(''); }).join('')
      + `<td class="${pOn?'':'plan-off'}"><input type="checkbox" ${pOn?'checked':''} onchange="window._planSetPractice(${g.id},this.checked,this)"></td>`
      + `<td style="text-align:left"><textarea class="plan-note" data-ref="${ref}" placeholder="Ej.: Este bimestre: Movers unidades 1–10 y Flyers Tests 1–3.">${esc(notas[ref]||'')}</textarea>
           <div class="row" style="gap:6px;margin-top:4px;align-items:center"><button class="btn sm" onclick="window._planNoteSave('grade','${ref}',${g.id},null,this)">Guardar</button><span class="muted plan-note-st" style="font-size:.78rem"></span></div></td></tr>`;
  }).join('');
  $('#plan-body').innerHTML = `
    <div class="row" style="gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:center">
      <button class="btn sm" onclick="window._planReparto()">✨ Aplicar reparto sugerido</button>
      <button class="btn sm ghost" onclick="window._planAbrirTodo()">🔓 Abrir todo</button>
      <span class="muted" style="font-size:.82rem">El reparto sugerido sigue el nivel del Marco de cada grado (G1–G2 Starters · G3–G4 Movers · G5 Flyers + KET · G6 KET/PET · G7–G8 PET/FCE · G9–G11 FCE/CAE, y CPE solo en G11). Se puede corregir casilla a casilla después.</span>
    </div>
    <div class="card" style="padding:0;overflow:auto;max-height:70vh"><table class="plan-grid"><thead>${head1}${head2}</thead><tbody>${rows}</tbody></table></div>`;
}
window._planSetNode = async (gradeId, key, to, el) => {
  el.disabled = true;
  const { error } = await sb.from('node_access').upsert(
    { grade_id:gradeId, node_key:key, unlocked:to, updated_at:new Date().toISOString(),
      updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'grade_id,node_key' });
  el.disabled = false;
  if(error){ alert('No se pudo guardar: ' + error.message); el.checked = !to; return; }
  el.closest('td').classList.toggle('plan-off', !to);
};
window._planSetPractice = async (gradeId, to, el) => {
  el.disabled = true;
  const { error } = await sb.from('practice_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(),
      updated_by:(state.session&&state.session.user&&state.session.user.id)||null }, { onConflict:'grade_id' });
  el.disabled = false;
  if(error){ alert('No se pudo guardar: ' + error.message); el.checked = !to; return; }
  el.closest('td').classList.toggle('plan-off', !to);
};
window._planNoteSave = async (scope, ref, gradeId, studentId, btn) => {
  const ta = btn.closest('td, .plan-note-wrap').querySelector('.plan-note');
  const st = btn.parentElement.querySelector('.plan-note-st');
  btn.disabled = true; if(st) st.textContent = '…';
  const { error } = await sb.from('study_plans').upsert(
    { area:'cambridge', scope, ref, grade_id:gradeId, student_id:studentId, note:ta.value.trim(),
      updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'area,ref' });
  btn.disabled = false;
  if(error){ if(st) st.textContent = ''; alert('No se pudo guardar: ' + error.message); return; }
  if(st){ st.textContent = '✓ Guardado'; setTimeout(() => { st.textContent = ''; }, 2500); }
};
/* Filas que escribe el reparto sugerido para un grado: abre lo listado y
   cierra el resto (incluidas las ramas sin nada dentro). */
function _planFilasReparto(gradeId){
  const abiertos = new Set((CAMBRIDGE_REPARTO[gradeId] || []).map(s => 'english.cambridge.' + s));
  const filas = [];
  Object.keys(CAMBRIDGE_TRACKS).forEach(bk => {
    const b = CAMBRIDGE_TRACKS[bk];
    const algo = b.levels.some(l => abiertos.has(l.node));
    filas.push({ node_key:b.node, unlocked:algo });
    b.levels.forEach(l => filas.push({ node_key:l.node, unlocked:abiertos.has(l.node) }));
  });
  filas.push({ node_key:'english.cambridge', unlocked:filas.some(f => f.unlocked) });
  return filas;
}
window._planReparto = async () => {
  const lineas = GRADES.map(g => {
    const abre = _planFilasReparto(g.id).filter(f => f.unlocked && !/^english\.cambridge(\.yle|\.main)?$/.test(f.node_key))
      .map(f => (_PLAN_COLS.find(c => c.node === f.node_key) || {}).short || f.node_key);
    return `${g.name} → ${abre.length ? abre.join(', ') : '(nada)'}`;
  });
  if(!await NISUI.pregunta('Se escribirá para TODOS los grados: lo que no aparece en un grado se cierra para ese grado. Después se ajusta casilla a casilla.', {titulo:'¿Aplicar a todos los grados?', si:'Escribir', no:'Cancelar', tono:'ojo', detalle: lineas.join('\n')})) return;
  const ahora = new Date().toISOString(), uid = (state.session&&state.session.user&&state.session.user.id)||null;
  const rows = GRADES.flatMap(g => _planFilasReparto(g.id).map(f => ({ grade_id:g.id, node_key:f.node_key, unlocked:f.unlocked, updated_at:ahora, updated_by:uid })));
  const { error } = await sb.from('node_access').upsert(rows, { onConflict:'grade_id,node_key' });
  if(error){ alert('No se pudo aplicar: ' + error.message); return; }
  studyPlanPanel();
};
window._planAbrirTodo = async () => {
  if(!await NISUI.pregunta('Se abre TODO el material Cambridge para todos los grados. Las excepciones por alumno se conservan.', {titulo:'¿Abrir todo Cambridge?', si:'Abrir todo', no:'Cancelar', tono:'ojo'})) return;
  const ahora = new Date().toISOString(), uid = (state.session&&state.session.user&&state.session.user.id)||null;
  const keys = ['english.cambridge', ..._CAMBRIDGE_NODES.map(n => n.key)];
  const rows = GRADES.flatMap(g => [...new Set(keys)].map(k => ({ grade_id:g.id, node_key:k, unlocked:true, updated_at:ahora, updated_by:uid })));
  const { error } = await sb.from('node_access').upsert(rows, { onConflict:'grade_id,node_key' });
  if(error){ alert('No se pudo aplicar: ' + error.message); return; }
  studyPlanPanel();
};

/* ---- Alumnos con plan individual (EPI) ---- */
async function _planEpi(){
  const { data:profs, error } = await sb.from('profiles')
    .select('id,full_name,email,grade_id,section,individual_plan,active,grades(name)').eq('role','student');
  if(error){ $('#plan-body').innerHTML = `<div class="note err">${esc(error.message)}</div>`; return; }
  const all = (profs||[]).filter(p => p.active !== false).sort((a,b) => (a.full_name||'').localeCompare(b.full_name||''));
  const epi = all.filter(p => p.individual_plan === true);
  const f = _planFiltro.trim().toLowerCase();
  const candidatos = f ? all.filter(p => !p.individual_plan && ((p.full_name||'') + ' ' + (p.email||'')).toLowerCase().includes(f)).slice(0, 12) : [];
  const fila = (p) => `<tr class="${_planStudent===p.id?'sel':''}">
      <td><b>${esc(p.full_name||p.email)}</b> <span class="epi-tag">EPI</span></td>
      <td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td>
      <td class="acts"><div class="acts-wrap"><button class="btn sm ${_planStudent===p.id?'':'ghost'}" onclick="window._planOpenStudent('${p.id}')">🔧 Su plan</button>
          <button class="btn sm ghost" onclick="window._planEpiFlag('${p.id}',false)">✕ Quitar</button></div></td></tr>`;
  $('#plan-body').innerHTML = `
    <div class="grid cols-2" style="align-items:start">
      <div class="card" style="margin:0">
        <h2 style="font-size:1.05rem;margin:0 0 8px">Alumnos con plan individual</h2>
        <p class="muted" style="font-size:.84rem;margin:0 0 10px">Un alumno EPI hereda lo de su grado y aquí se le define su excepción: qué abre y qué no, y sus instrucciones.</p>
        <div style="overflow-x:auto"><table><tbody>${epi.map(fila).join('') || '<tr><td class="muted center" colspan="3">Todavía no hay alumnos marcados. Búscalo a la derecha y márcalo.</td></tr>'}</tbody></table></div>
      </div>
      <div class="card" style="margin:0">
        <h2 style="font-size:1.05rem;margin:0 0 8px">➕ Marcar un alumno como EPI</h2>
        <input type="search" value="${esc(_planFiltro)}" placeholder="Nombre o correo del alumno…" style="width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:var(--r-sm);font:inherit"
               oninput="window._planBuscar(this.value)">
        <div id="plan-cands" style="margin-top:8px">${candidatos.map(p => `<div class="row" style="justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--line)">
            <span>${esc(p.full_name||p.email)} <span class="muted" style="font-size:.8rem">· ${esc(p.grades?.name||'—')}${p.section?' '+esc(p.section):''}</span></span>
            <button class="btn sm" onclick="window._planEpiFlag('${p.id}',true)">Marcar EPI</button></div>`).join('')
          || (f ? '<div class="muted" style="font-size:.84rem">Sin resultados (o ya está marcado).</div>' : '')}</div>
      </div>
    </div>
    <div id="plan-student" style="margin-top:16px"></div>`;
  if(_planStudent && epi.some(p => p.id === _planStudent)) _planStudentEditor(epi.find(p => p.id === _planStudent));
}
let _planBuscaT = null;
window._planBuscar = (v) => { _planFiltro = v; clearTimeout(_planBuscaT); _planBuscaT = setTimeout(() => {
  // Solo se repinta la lista de candidatos, para no perder el foco del buscador.
  const inp = document.activeElement; _planEpi().then(() => { const i = $('#plan-body input[type=search]'); if(i && inp && inp.type === 'search'){ i.focus(); i.setSelectionRange(i.value.length, i.value.length); } });
}, 250); };
window._planEpiFlag = async (sid, to) => {
  if(!to && !await NISUI.pregunta('El alumno vuelve al plan de su grado. Sus excepciones de Cambridge y sus instrucciones se borran.', {titulo:'¿Quitar el plan individual?', si:'Quitar', no:'Cancelar', tono:'mal', peligro:true})) return;
  const { error } = await sb.from('profiles').update({ individual_plan:to }).eq('id', sid);
  if(error){ alert('No se pudo guardar: ' + error.message); return; }
  if(!to){
    const keys = ['english.cambridge', ..._CAMBRIDGE_NODES.map(n => n.key)];
    await sb.from('student_access').delete().eq('student_id', sid).in('node_key', keys);
    await sb.from('study_plans').delete().eq('area','cambridge').eq('ref','s:' + sid);
    if(_planStudent === sid) _planStudent = null;
  } else { _planStudent = sid; _planFiltro = ''; }
  _planEpi();
};
window._planOpenStudent = (sid) => { _planStudent = sid; _planEpi(); };

async function _planStudentEditor(p){
  const box = $('#plan-student'); if(!box) return;
  box.innerHTML = `<div class="center muted">Cargando…</div>`;
  const [na, sa, sp] = await Promise.all([
    p.grade_id != null ? sb.from('node_access').select('node_key,unlocked').eq('grade_id', p.grade_id) : Promise.resolve({data:[]}),
    sb.from('student_access').select('node_key,unlocked').eq('student_id', p.id),
    sb.from('study_plans').select('note').eq('area','cambridge').eq('ref','s:' + p.id).maybeSingle(),
  ]);
  const gm = {}; (na.data||[]).forEach(r => gm[r.node_key] = r.unlocked);
  const sm = {}; (sa.data||[]).forEach(r => sm[r.node_key] = r.unlocked);
  const gradeOn = k => Object.prototype.hasOwnProperty.call(gm, k) ? !!gm[k] : _nodeDefaultOpen(k);
  const eff = k => Object.prototype.hasOwnProperty.call(sm, k) ? !!sm[k] : gradeOn(k);
  const celda = (k) => `<td class="${eff(k)?'':'plan-off'}" title="${esc(k)}">
      <input type="checkbox" ${eff(k)?'checked':''} onchange="window._planSetStudent('${p.id}','${k}',this.checked,this)">
      <div class="muted" style="font-size:.66rem;margin-top:2px">${gradeOn(k)?'grado ✓':'grado ✕'}${Object.prototype.hasOwnProperty.call(sm,k)?' · excep.':''}</div></td>`;
  const head1 = `<tr><th rowspan="2">🎓<br>Cambridge</th>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return `<th class="plan-track" colspan="${b.levels.length + 1}" style="background:${b.color}">${b.title}</th>`; }).join('') + `</tr>`;
  const head2 = `<tr>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return `<th>Rama</th>` + b.levels.map(l => `<th>${esc(l.short)}</th>`).join(''); }).join('') + `</tr>`;
  const row = `<tr>${celda('english.cambridge')}` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return celda(b.node) + b.levels.map(l => celda(l.node)).join(''); }).join('') + `</tr>`;
  box.innerHTML = `<div class="card" style="border-top:5px solid #7c3aed">
    <div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
      <div><h2 style="margin:0;font-size:1.1rem">${esc(p.full_name||p.email)} <span class="epi-tag">EPI</span></h2>
        <div class="muted" style="font-size:.84rem">${esc(p.grades?.name||'—')}${p.section?' · '+esc(p.section):''} · hereda lo del grado; cada casilla que toques aquí es su excepción.</div></div>
      <button class="btn sm ghost" onclick="window._planQuitarExcepciones('${p.id}')">↺ Volver a lo del grado</button>
    </div>
    <div style="overflow:auto;margin-top:10px"><table class="plan-grid"><thead>${head1}${head2}</thead><tbody>${row}</tbody></table></div>
    <div class="plan-note-wrap" style="margin-top:12px">
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:4px;color:var(--grey)">INSTRUCCIONES PARA ESTE ALUMNO (las ve arriba de su tarjeta Cambridge)</label>
      <textarea class="plan-note" placeholder="Ej.: Trabaja Movers unidades 5–12 y haz el Flyers Test 1 esta semana. Ignora el Main Suite por ahora.">${esc((sp.data&&sp.data.note)||'')}</textarea>
      <div class="row" style="gap:6px;margin-top:4px;align-items:center"><button class="btn sm" onclick="window._planNoteSave('student','s:${p.id}',null,'${p.id}',this)">Guardar</button><span class="muted plan-note-st" style="font-size:.78rem"></span></div>
    </div></div>`;
}
window._planSetStudent = async (sid, key, to, el) => {
  el.disabled = true;
  const { error } = await sb.rpc('set_student_access', { p_student:sid, p_node:key, p_unlocked:to });
  el.disabled = false;
  if(error){ alert('No se pudo guardar: ' + error.message); el.checked = !to; return; }
  el.closest('td').classList.toggle('plan-off', !to);
  const hint = el.nextElementSibling; if(hint && hint.textContent.indexOf('excep.') < 0) hint.textContent += ' · excep.';
};
window._planQuitarExcepciones = async (sid) => {
  if(!await NISUI.pregunta('Se borran las excepciones de Cambridge de este alumno: vuelve a ver exactamente lo de su grado.', {titulo:'¿Borrar las excepciones?', si:'Borrar', no:'Cancelar', tono:'mal', peligro:true})) return;
  const keys = ['english.cambridge', ..._CAMBRIDGE_NODES.map(n => n.key)];
  const { error } = await sb.from('student_access').delete().eq('student_id', sid).in('node_key', keys);
  if(error){ alert('No se pudo: ' + error.message); return; }
  _planEpi();
};

const ACCESS_NODES = [
  {key:'english.pronunciation',         label:'Pronunciation'},
  {key:'english.practice',              label:'Practice Tests'},
  {key:'english.phonics',               label:'Phonics'},
  {key:'english.classes',               label:'Classes'},
  ..._CAMBRIDGE_NODES,
  ..._GRADE_NODES,
  ...[..._UNIT_NODES,..._WEEK_NODES].map(n=>({key:n.key,label:n.label})),
  {key:'english.classes.g9.cambridge',          label:'9th · Cambridge'},
  {key:'english.classes.g9.cambridge.listening',label:'9th · Cambridge · Listening'},
  {key:'english.classes.g9.uoe1',       label:'9th · Use of English P1'},
  {key:'english.classes.g9.writing',    label:'9th · Writing'},
  {key:'english.classes.g9.unit5',      label:'9th · Unit 5 (product)'},
  {key:'english.classes.g9.unitexams',  label:'9th · Unit Exams'},
  {key:'english.classes.g6.units',      label:'6th · Units (products)'},
  {key:'english.classes.g7.units',      label:'7th · Units (products)'},
  {key:'english.classes.g8.units',      label:'8th · Units (products)'},
  {key:'english.classes.g2.units',      label:'2nd · Units (products)'},
  {key:'english.classes.g3.units',      label:'3rd · Units (products)'},
  {key:'english.classes.g4.units',      label:'4th · Units (products)'},
  {key:'english.classes.g5.units',      label:'5th · Units (products)'},
  {key:'english.classes.g10.units',     label:'10th · Units (products)'},
  {key:'english.classes.g11.units',     label:'11th · Units (products)'},
  {key:'english.classes.g7.reader',     label:'7th · Readers'},
  {key:'english.classes.g9.reader',     label:'9th · Readers'},
  {key:'french',                        label:'French (toda la materia)'},
  {key:'french.crosswords',             label:'French · Crosswords'},
  {key:'french.wordsearch',             label:'French · Word Search'},
  {key:'french.classes',                label:'🇫🇷 Classes (toda)'},
  ..._FR_GRADE_NODES,
  {key:'general.library',               label:'Library'},
  {key:'general.mun',                   label:'MUN Academy'},
];
/* Claves gestionables por profesor (para la restricción de su vista). */
const _GATEABLE = new Set(ACCESS_NODES.map(n=>n.key));

/* Vista de materia (English / French) */
function studentSubject(key){
  _setNav(key);
  const isEn = key==='english';
  if(!isEn){
    // Dos vías distintas y no mezclables: Classes va POR GRADO (el temario que
    // se está dando) y CEFR va POR NIVEL del Marco (A1–C2, entrenamiento libre).
    const _cefrOn = nodeVisible('french.crosswords') || nodeVisible('french.wordsearch');
    $('#main').innerHTML = `${_isStudent()?_backBtn("window._nav('home')",'Inicio'):''}<h1>🇫🇷 French</h1>
      <p class="muted" style="margin-top:-6px">El material de clase va por grado; los juegos de vocabulario, por nivel del Marco Común Europeo.</p>
      <div class="grid cols-2" style="margin-top:12px">
        ${nodeVisible('french.classes') ? _hubCard('🏫','Classes','Le matériel de chaque grade : les jeux de l’unité, semaine par semaine.',"window._nav('fr_classes')") : _lockedCard('🏫','Classes','Material de clase de francés por grado.')}
        ${_cefrOn ? _hubCard('📚','CEFR','Mots croisés et mots mêlés par niveau, de A1 à C2.',"window._nav('fr_cefr')") : _lockedCard('📚','CEFR','Juegos de vocabulario por nivel (A1–C2).')}
      </div>`;
    return;
  }
  const title = isEn ? '🇬🇧 English' : '🇫🇷 French';
  const areas = (isEn ? ENGLISH_AREAS : ENGLISH_AREAS.filter(a=>!a.englishOnly))
    .filter(a=>!a.when || a.when());
  const cards = areas.map(a=>{
    if(!isEn) return _soonCard(a.emoji,a.title,a.desc);
    // Cambridge trae su dibujo 3D (cambridge-icons.js) en lugar de emoji.
    const em = (a.icon && typeof camIcon==='function') ? camIcon(a.icon,72) : a.emoji;
    if(a.node && !nodeVisible(a.node)) return _lockedCard(em,a.title,a.desc);
    return _hubCard(em,a.title,a.desc,`window._nav('${a.nav}')`);
  }).join('');
  $('#main').innerHTML = `${_isStudent()?_backBtn("window._nav('home')",'Home'):''}<h1>${title}</h1>
    <p class="muted" style="margin-top:-6px">${isEn?'Your English areas.':'Próximamente — iremos habilitando el francés poco a poco.'}</p>
    <div class="grid cols-3" style="margin-top:12px">${cards}</div>`;
}

/* Vista General (transversal) */
function studentGeneral(){
  _setNav('general');
  const lib = nodeVisible('general.library')
    ? _hubCard('📚','Library','NIS Library: search and explore the school library.',"window._nav('library')")
    : _lockedCard('📚','Library','NIS Library.');
  const mun = nodeVisible('general.mun')
    ? _hubCard('🌐','MUN Academy','Model United Nations: debate, public speaking and diplomacy.',"window._nav('mun')")
    : _lockedCard('🌐','MUN Academy','Model United Nations.');
  $('#main').innerHTML=`<h1>🗂️ General</h1>
    <p class="muted" style="margin-top:-6px">General portal resources.</p>
    <div class="grid cols-3" style="margin-top:12px">${lib}${mun}</div>`;
}

/* Resultado final del alumno = reporte CEFR que se entrega a los padres + PDF.
   El alumno ve el suyo; Profesor/Admin lo generan desde su panel (cefrFinalPanel). */
async function studentFinal(){
  _setNav('final');
  const p=state.profile;
  const back=_isStudent()?_backBtn("window._nav('english')",'English'):'';
  if(!p.id) return _previewNeedsStudent('🏅 Resultado final · CEFR', back);
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
    <td style="${ch};text-align:center;color:var(--blue-d);font-weight:700">${b?esc(b.cefr):'—'}</td>
    <td style="${ch};text-align:center">${b?b.scale:'—'}</td></tr>`;
  const wRow = fin.a2NoWriting
    ? `<tr><td style="${ch}"><b>Writing</b></td><td colspan="4" style="${ch};color:var(--grey)">Incluido en Reading &amp; Use of English (A2 Key)</td></tr>`
    : row('Writing', fin.skills.Writing);
  $('#main').innerHTML=`${back}<h1>🏅 Resultado final · CEFR</h1>
    <p class="muted" style="margin-top:-6px">Este es el reporte que se entrega a los padres: tu nivel final combinando tus mejores resultados por destreza en la Escala Cambridge.</p>
    <div class="card" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr><th style="${ch};text-align:left">Destreza</th><th style="${ch}">Nivel</th><th style="${ch}">Resultado</th><th style="${ch}">CEFR</th><th style="${ch}">Escala</th></tr></thead>
      <tbody>
        ${row('Reading &amp; Use of English'+(fin.a2NoWriting?' (incluye Writing)':''),fin.skills.Reading)}
        ${row('Listening',fin.skills.Listening)}
        ${wRow}
        ${row('Speaking',fin.skills.Speaking)}
      </tbody></table></div>
    <div class="card" style="display:flex;gap:16px;align-items:center;background:#0f2741;color:#fff">
      <div><div style="font-size:.78rem;opacity:.8">RESULTADO FINAL</div><div style="font-size:2.2rem;font-weight:800;line-height:1">${esc(fin.finalCefr)}</div></div>
      <div style="border-left:1px solid rgba(255,255,255,.3);padding-left:16px"><div style="font-size:.78rem;opacity:.8">ESCALA CAMBRIDGE</div><div style="font-size:1.6rem;font-weight:700">${fin.finalScale!=null?fin.finalScale:'—'}</div></div>
      <div style="margin-left:auto;text-align:right">
        ${sttTxt?`<div style="font-size:.85rem;font-weight:700;color:${stt==='below'?'#fca5a5':'#86efac'}">${sttTxt}</div>`:''}
        ${fin.complete?'':`<div style="font-size:.74rem;opacity:.9;margin-top:4px">⚠ Provisional. Faltan: ${esc(fin.missing.join(', '))}.</div>`}
      </div>
    </div>
    <button class="btn" onclick="window.studentReportPDF('${p.id}','es')">📄 PDF (Español)</button> <button class="btn ghost" onclick="window.studentReportPDF('${p.id}','en')">📄 PDF (English)</button>`;
}

/* Metadatos de grados dentro de Classes y niveles de actividades por grado.
   Primary 2–5 → pre-A1/A1 · 6/7/8 → A1–B2 · 9/10/11 → A1–C1.
   Classes se divide en DOS etapas: Primary (2.º–5.º) y Secondary (6.º–11.º). */
const GRADE_META = { g2:['2️⃣','2nd grade'], g3:['3️⃣','3rd grade'], g4:['4️⃣','4th grade'],
  g5:['5️⃣','5th grade'],
  g6:['6️⃣','6th grade'], g7:['7️⃣','7th grade'], g8:['8️⃣','8th grade'],
  g9:['9️⃣','9th grade'], g10:['🔟','10th grade'], g11:['🎓','11th grade'] };
const GRADE_LEVELS = { g2:'A1', g3:'A1', g4:'A1,A2', g5:'A1,A2',
  g6:'A1,A2,B1,B2', g7:'A1,A2,B1,B2', g8:'A1,A2,B1,B2',
  g9:'A1,A2,B1,B2,C1', g10:'A1,A2,B1,B2,C1', g11:'A1,A2,B1,B2,C1' };
/* GRADE_ORDER sigue siendo SOLO secundaria: todo el código previo (accesos,
   vistas) nació con 6.º–11.º y así no cambia de significado. */
const PRIMARY_ORDER = ['g2','g3','g4','g5'];
const GRADE_ORDER = ['g6','g7','g8','g9','g10','g11'];
const ALL_GRADE_ORDER = [...PRIMARY_ORDER, ...GRADE_ORDER];
function _isPrimaryGrade(k){ return PRIMARY_ORDER.indexOf(k)>=0; }
const STAGE_META = {
  primary:  {emoji:'🧒', title:'Primary',   desc:'2nd to 5th grade — games and activities for young learners.',   grades:PRIMARY_ORDER},
  secondary:{emoji:'🎓', title:'Secondary', desc:'6th to 11th grade — grammar, activities and exam practice.', grades:GRADE_ORDER},
};
/* Francés va de 5.º a 10.º (inglés empieza en 6.º y llega a 11.º), y sus
   niveles del Marco son más bajos porque es segunda lengua extranjera. */
const FR_GRADE_META  = { g5:['5️⃣','5e'], g6:['6️⃣','6e'], g7:['7️⃣','7e'],
  g8:['8️⃣','8e'], g9:['9️⃣','9e'], g10:['🔟','10e'] };
const FR_GRADE_ORDER = ['g5','g6','g7','g8','g9','g10'];
const FR_GRADE_LEVEL = { g5:'A1.1', g6:'A1.2', g7:'A2.1', g8:'A2.2', g9:'A2.2', g10:'B1.1' };

/* Vista de un grado dentro de Classes (→ Grammar + Activities).
   El "atrás" vuelve a la ETAPA del grado (Primary/Secondary). En primaria no
   hay tarjeta de Grammar: la gramática va dentro de las actividades. */
function studentGrade(key){
  _setNav('classes');
  const [emoji,label]=GRADE_META[key]||['🏫',key];
  const base='english.classes.'+key;
  const route='classes_'+key;
  const stage=_isPrimaryGrade(key)?'primary':'secondary';
  const back = _backBtn("window._nav('classes_"+stage+"')",STAGE_META[stage].title);
  $('#main').innerHTML=`${back}<h1>${emoji} ${label}</h1>
    <p class="muted" style="margin-top:-6px">${label} material.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${arcsFor(key).length ? _hubCard('🧩','Project','The interdisciplinary project of the term: the essential question, the eleven-week map and what every subject contributes.',"location.href='"+_withBack('project.html?arc='+(arcoActual(key)||arcsFor(key)[0][0]),route)+"'") : ''}
      ${unitPlansFor(key).length ? (nodeVisible(unitsNode(key)) ? _hubCard('🎯','Units','Your units this year: the final product, the rubric from day one, and the week-by-week practice that feeds it.',"window._nav('classes_"+key+"_units')") : _lockedCard('🎯','Units','Your units and their final products.')) : ''}
      ${_isPrimaryGrade(key) ? '' : (nodeVisible(base+'.grammar') ? _skillCard('📝','Grammar','Grammar for '+label+': explanations and games by unit.',_withBack('grammar.html?grade='+key,route)) : _lockedCard('📝','Grammar','Grammar for '+label+'.'))}
      ${nodeVisible(base+'.activities') ? _hubCard('🎲','Activities',_isPrimaryGrade(key)?'Games for each unit — with audio for young learners.':'Games by unit and by level: crosswords, word searches and more.',"window._nav('classes_"+key+"_act')") : _lockedCard('🎲','Activities','Games and activities.')}
      ${key==='g9' ? (nodeVisible('english.classes.g9.cambridge') ? _hubCard('🎓','Cambridge','B2 First (FCE) practice by skill: Listening, Use of English, Reading and Writing.',"window._nav('classes_g9_cambridge')") : _lockedCard('🎓','Cambridge','Cambridge B2 First practice.')) : ''}
      ${key==='g5' ? _hubCard('🦅','Cambridge Flyers','The A2 Flyers picture tasks, sorted by the unit you are working on: label the people, tick the right picture, match people to pictures and write the picture story.',"window._nav('classes_g5_flyers')") : ''}
      ${readerBooksFor(key).length ? (nodeVisible(base+'.reader') ? _hubCard('📚','Readers','Graded readers with activities for every chapter: '+readerBooksFor(key).map(id=>READER_CARDS[id][4]).join(', ')+'.',"window._nav('classes_"+key+"_readers')") : _lockedCard('📚','Readers','Graded readers with activities.')) : ''}
      ${key==='g9' ? (nodeVisible('english.classes.g9.unitexams') ? _skillCard('📋','Unit Exams','The unit exam and its practice, at your level: multiple choice, true/false, word formation, transformations, word order, listening and writing. Your teacher opens each one when the class is ready.',_withBack('unit-exam.html?v=3',route)) : _lockedCard('📋','Unit Exams','The unit exam and its practice.')) : ''}
    </div>`;
}
/* Cambridge (9.º): tarjeta madre con las destrezas del examen B2 First:
   Listening, Use of English y Writing (movidas aquí desde la página del
   grado, pedido 2026-08-25; conservan sus nodos g9.uoe1 / g9.writing para
   no tocar los permisos de profesores) + Reading como "próximamente". */
/* ---------- 5.º · Cambridge Flyers dentro de la clase ----------
   Silvia dijo que la plataforma estaba demasiado orientada al examen, y la
   respuesta no es esconder el examen: es enseñar a qué unidad del curso
   pertenece cada tarea. Esta página va al revés que un simulacro — entra por
   la UNIDAD del Scope & Sequence de 5.º y, dentro, dice qué parte del Flyers
   se practica ahí. El reparto sale de nis-fun/content/flyers/exam-map.json,
   que genera tools/gen_visual_flyers.py; si una unidad no tiene tareas
   visuales, no se inventa: se dice.                                        */
const FLYERS_TIPO = {
  label_people:   ['🧍','Listen and label the people'],
  picture_mc:     ['🖼️','Listen and tick the right picture'],
  match_pictures: ['🔗','Match each person to a picture'],
  picture_story:  ['✍️','Write the picture story (20–25 words)'],
};

async function studentGradeFlyers(key){
  _setNav('classes');
  const route='classes_'+key+'_flyers';
  const back=_backBtn("window._nav('classes_"+key+"')",GRADE_META[key][1]);
  if(!nodeVisible('english.classes.'+key)){ _lockedView(back,'🦅 Cambridge Flyers'); return; }
  $('#main').innerHTML=`${back}<h1>🦅 Cambridge Flyers</h1><p class="muted">Loading…</p>`;

  let mapa=null;
  try{
    const r=await fetch('nis-fun/content/flyers/exam-map.json',{cache:'no-cache'});
    if(r.ok) mapa=await r.json();
  }catch(_){}
  if(!mapa){
    $('#main').innerHTML=`${back}<h1>🦅 Cambridge Flyers</h1>
      <div class="card"><p class="muted">The unit map is not available right now.
      You can still open the course from Classes → Primary.</p></div>`;
    return;
  }

  const secciones = mapa.temas.map(t=>{
    const filas = t.unidades.map(n=>{
      const u = mapa.unidades[String(n)];
      if(!u) return '';
      const chips = (u.visuales||[]).map(v=>{
        const meta = FLYERS_TIPO[v.tipo] || ['•', v.tipo];
        return `<span class="chip" title="${esc(v.paper)} Part ${v.part}">${meta[0]} ${esc(meta[1])}</span>`;
      }).join('');
      const foco = u.foco && u.foco.paper ? `${esc(u.foco.paper)} · Part ${u.foco.part}` : '';
      return `<tr>
        <td style="white-space:nowrap"><a href="${_withBack('nis-fun/engine/?level=flyers&unit='+n, route)}"
             target="_blank" rel="noopener"><b>Unit ${n}</b></a></td>
        <td>${esc(u.titulo)}${foco?`<div class="muted" style="font-size:.8rem">${foco}</div>`:''}</td>
        <td>${chips || '<span class="muted" style="font-size:.85rem">no picture tasks in this unit</span>'}</td>
      </tr>`;
    }).join('');
    return `<div class="card">
      <h2 style="margin:0 0 2px;color:var(--blue-d);font-size:1.05rem">Unit ${t.n} · ${esc(t.nombre)}</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:10px">
        The Flyers units your class works on during this unit.</div>
      <div style="overflow-x:auto"><table class="tbl"><tbody>${filas}</tbody></table></div>
    </div>`;
  }).join('');

  const conVisuales = Object.values(mapa.unidades).filter(u=>(u.visuales||[]).length).length;
  const totalTareas = Object.values(mapa.unidades).reduce((a,u)=>a+(u.visuales||[]).length,0);

  $('#main').innerHTML=`${back}<h1>🦅 Cambridge Flyers</h1>
    <p class="muted" style="margin-top:-6px">A2 Flyers exam tasks, sorted by the unit of your year — not as a separate exam course.</p>
    <div class="card" style="border-top:5px solid #3b6fb5">
      <p style="margin:0 0 8px">The picture tasks use <b>our own characters and our own places</b>:
        Ingrid, Diego, Maya, Oliver and Kili, plus your classmates, around the school.
        The task <i>type</i> is the Cambridge one; the drawings are ours.</p>
      <p class="muted" style="font-size:.85rem;margin:0">
        ${totalTareas} picture tasks across ${conVisuales} of the ${Object.keys(mapa.unidades).length} Flyers units.
        Every unit has the picture story; the listening picture tasks are in the units
        whose words can be drawn — in a grammar unit a picture would not add anything.</p>
    </div>
    ${secciones}`;
}
function studentGradeCambridge(key){
  _setNav('classes');
  const route='classes_'+key+'_cambridge';
  const back=_backBtn("window._nav('classes_"+key+"')",GRADE_META[key][1]);
  const base='english.classes.'+key+'.cambridge';
  if(!nodeVisible('english.classes.'+key) || !nodeVisible(base)){ _lockedView(back,'🎓 Cambridge B2 First'); return; }
  $('#main').innerHTML=`${back}<h1>🎓 Cambridge B2 First</h1>
    <p class="muted" style="margin-top:-6px">Authentic Cambridge exam practice by skill.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${nodeVisible(base+'.listening') ? _skillCard('🎧','Listening','Authentic B2 First listening: 55 recordings by unit with a full audio player, and exam tasks (Parts 1–4) that mark themselves.',_withBack('cambridge-listening.html',route)) : _lockedCard('🎧','Listening','Cambridge B2 First listening.')}
      ${nodeVisible('english.classes.'+key+'.uoe1') ? _skillCard('🧩','Use of English','Part 1 · Multiple-choice cloze B2: 8 gaps, options A–D, with correction and explanations.',_withBack('use-of-english-part1.html',route)) : _lockedCard('🧩','Use of English','Cambridge-style B2 cloze.')}
      ${_soonCard('📖','Reading','Cambridge B2 First reading tasks — coming soon.')}
      ${nodeVisible('english.classes.'+key+'.writing') ? _skillCard('✍️','Writing','Opinion essay (FCE Writing Part 1): 6 topics with guide phrases, a bank of linkers, word counter and checklist.',_withBack('writing.html?grade='+key,route)) : _lockedCard('✍️','Writing','Opinion essay · FCE Writing Part 1.')}
    </div>`;
}
/* Readers: tarjeta madre con los graded readers del grado (g7 y g9 hoy).
   La sección irá creciendo: para añadir un libro basta sumarlo a
   READER_CARDS y a la lista del grado en READER_BOOKS. Para estrenar el hub
   en un grado NUEVO hay que crear el nodo english.classes.<g>.reader en
   ACCESS_NODES, añadir su chip en adminTeachers y DÁRSELO POR SQL a los
   profesores ya configurados (teacher_node_access) — los nodos nuevos les
   nacen invisibles. */
const READER_CARDS = {
  attwn:    ['🏝️','And Then There Were None','Agatha Christie at five levels — A2 · B1 · B2 · C1 · C2. Choose your level: read along with audio, listening, summaries, games and the Detective\'s Notebook.','and-then-there-were-none.html','And Then There Were None (A2–C2)'],
  earnest:  ['🎩','The Importance of Being Earnest','Oscar Wilde at five levels — A2 · B1 · B2 · C1 · C2. Read along with audio, listening, summaries, character files, games and chapter exams.','reader.html?book=earnest','Being Earnest (A2–C2)'],
  tomsawyer:['🚣','The Adventures of Tom Sawyer','Mark Twain at five levels — A2 · B1 · B2 · C1 · C2. Read along with audio, listening, summaries, character files, games and chapter exams.','reader.html?book=tomsawyer','Tom Sawyer (A2–C2)'],
  princepauper:['👑','The Prince and the Pauper','Mark Twain at five levels — A2 · B1 · B2 · C1 · C2. Read along with the original 1881 engravings, plus Cambridge A2 Key practice, Trinity speaking topics, 20 activities per chapter and chapter exams.','reader.html?book=princepauper','The Prince and the Pauper (A2–C2)'],
  treasureisland:['🏴‍☠️','Treasure Island','Robert Louis Stevenson at five levels — A2 · B1 · B2 · C1 · C2. Eleven parts with the 1915 engravings, Cambridge PET practice, Trinity speaking topics and chapter exams.','reader.html?book=treasureisland','Treasure Island (A2–C2)'],
};
/* Qué reader lee cada salón lo decide el profesor en Library y vive en
   reader_assignments, por AÑO ESCOLAR y TRIMESTRE — una obra por trimestre:
   en 2027 vuelve a elegir sin arrastrar lo de este año. Este reparto queda
   solo como red: si la consulta falla, el alumno no se queda sin sus libros. */
const READER_BOOKS = { g7:['tomsawyer','princepauper','treasureisland'], g9:['attwn','earnest','tomsawyer','princepauper','treasureisland'] };
let READER_ASSIGN=null;
async function loadReaderAssignments(){
  try{
    const { data, error } = await sb.from('reader_assignments')
      .select('school_year,grade_id,section,book_id,term');
    if(!error) READER_ASSIGN=data||[];
  }catch(e){}
  return READER_ASSIGN;
}
const _gradeIdOf=key=>+String(key||'').replace(/^g/,'');
/* Al alumno le tocan los libros de SU salón (y los del grado entero, section='');
   el profesor ve todo lo asignado a ese grado. */
function readerBooksFor(key,section){
  if(!READER_ASSIGN) return READER_BOOKS[key]||[];
  const gid=_gradeIdOf(key), stu=_isStudent();
  const sec=String(section!=null?section:((state.profile&&state.profile.section)||'')).trim();
  const ids=new Set(READER_ASSIGN.filter(r=>+r.school_year===SCHOOL_YEAR_NOW && +r.grade_id===gid &&
      (!stu || String(r.section||'')==='' || String(r.section)===sec)).map(r=>r.book_id));
  return _RDR_IDS.filter(id=>ids.has(id));
}
/* La misma cuenta que ve el profesor, pero solo con lo del propio alumno. */
async function studentReaderReport(key){
  _setNav('classes');
  const back=_backBtn("window._nav('classes_"+key+"_readers')",'Readers');
  const p=state.profile;
  if(!p.id) return _previewNeedsStudent('📊 My reading report', back);
  $('#main').innerHTML=`${back}<h1>📊 My reading report</h1><p class="muted">Loading…</p>`;
  const { data:atts } = await sb.from('activity_attempts')
    .select('activity,score,total,duration_sec,submitted_at').eq('student_id',p.id).or(_rdrOr()).limit(2000);
  const r=readerReport((atts||[]).filter(a=>_attYear(a)===SCHOOL_YEAR_NOW));
  /* Un libro por trimestre: se ordenan como se leyeron y cada uno lleva su
     trimestre delante, para que el alumno sepa cual es el de ahora. */
  const _gid=_gradeIdOf(key), _sec=String((p&&p.section)||'').trim();
  const termOf=id=>{ const x=(READER_ASSIGN||[]).find(v=>+v.school_year===SCHOOL_YEAR_NOW &&
      +v.grade_id===_gid && v.book_id===id && (String(v.section||'')==='' || String(v.section)===_sec));
    return x?+x.term:null; };
  const mine=(readerBooksFor(key).length?readerBooksFor(key):_RDR_IDS).filter(id=>READER_META[id])
    .sort((a,b)=>(termOf(a)||9)-(termOf(b)||9));
  const cards=mine.map(id=>{
    const b=r.books[id], meta=READER_META[id], t=termOf(id);
    return `<h2 style="font-size:16px;color:var(--blue-d);margin:18px 0 8px">${t?`<span class="muted">Term ${t}</span> · `:''}${meta.icon} ${esc(meta.title)}</h2>
      ${_rdrChapterTable(id,b,true)}`;
  }).join('');
  $('#main').innerHTML=`${back}<h1>📊 My reading report</h1>
    <p class="muted" style="margin-top:-6px">Your mark for each chapter is your <b>chapter control</b> — your best attempt counts. Reading time and exercises don't change the mark: they show your teacher how much work you put in.</p>
    <div class="grid cols-3" style="margin-bottom:6px">
      <div class="stat"><div class="l">Overall mark</div><div class="n">${r.overall!=null?r.overall+'%':'—'}</div>
        <div class="muted" style="font-size:.8rem">${r.overall!=null?_rdr20(r.overall)+'/20 · average of your books':'no chapter control taken yet'}</div></div>
      <div class="stat"><div class="l">⏱ Reading with audio</div><div class="n" style="font-size:1.5rem">${_rdrTime(r.readSec)}</div>
        <div class="muted" style="font-size:.8rem">time spent in “Read along”</div></div>
      <div class="stat"><div class="l">⏱ Exercises</div><div class="n" style="font-size:1.5rem">${_rdrTime(r.actSec)}</div>
        <div class="muted" style="font-size:.8rem">the 12 activities of each chapter</div></div>
    </div>
    ${cards}`;
}
function studentGradeReaders(key){
  _setNav('classes');
  const route='classes_'+key+'_readers';
  const back=_backBtn("window._nav('classes_"+key+"')",GRADE_META[key][1]);
  const base='english.classes.'+key+'.reader';
  if(!nodeVisible('english.classes.'+key) || !nodeVisible(base)){ _lockedView(back,'📚 Readers'); return; }
  const cards=_skillCard('📝','Reader Exams','One timed exam per chapter of each book, at your level — your teacher opens them when your class is ready.',_withBack('attwn-exam.html',route))
    + readerBooksFor(key).map(id=>{ const b=READER_CARDS[id]; return _skillCard(b[0],b[1],b[2],_withBack(b[3],route)); }).join('')
    + _hubCard('📊','My reading report','Your mark for every chapter control, your reading time and your overall mark.',"window._nav('classes_"+key+"_readers_report')");
  $('#main').innerHTML=`${back}<h1>📚 Readers</h1>
    <p class="muted" style="margin-top:-6px">Graded readers with activities for every chapter.</p>
    <div class="grid cols-2" style="margin-top:12px">${cards}</div>`;
}
/* Unidades del grado (Unit 3, Unit 4…) según activities-data.js.
   FILTRA POR MATERIA a propósito: desde que activities-fr-data.js mete las
   unidades de francés en la MISMA lista, sin este filtro el 9.º y el 10.º de
   inglés mostrarían también la Unité 4 francesa. */
function _unitsFor(key,subject){
  const d=window.ACTIVITIES_DATA;
  const s=subject||'english';
  return (d && Array.isArray(d.units)) ? d.units.filter(u=>u.grade===key && _subjOf(u)===s) : [];
}
function _gradeNodeOpen(key,leaf,subject){
  const s=subject||'english';
  return nodeVisible(s+'.classes.'+key) && nodeVisible(s+'.classes.'+key+'.'+leaf);
}
function _lockedView(back,title){
  $('#main').innerHTML=`${back}<h1>${title}</h1>
    <p class="muted">🔒 This section isn't available for you yet. Ask your teacher to unlock it.</p>`;
}
/* Actividades de un grado: TODAS las unidades con sus ejercicios desplegados
   (nada de un clic extra por unidad), y al final las genéricas por nivel.
   Es la misma lista de activities.html, pero dentro del portal y desde la
   misma fuente (activities-data.js). `focusUnit` sólo desplaza la vista a
   esa unidad: se usa al volver desde un juego. */
function studentGradeActivities(key,focusUnit,subject){
  _setNav(subject==='french'?'french':'classes');
  const isFr=subject==='french';
  const [emoji,label]= (isFr?FR_GRADE_META[key]:GRADE_META[key]) || ['🏫',key];
  const lv=GRADE_LEVELS[key]||'A1,A2,B1,B2,C1';
  const pre=isFr?'fr_classes_':'classes_';
  const route=pre+key+'_act';
  const back = _backBtn("window._nav('"+pre+key+"')",label);
  // Ahora se puede entrar por enlace directo (#classes_g9_act), así que la
  // visibilidad del nodo se comprueba aquí y no sólo al pintar la tarjeta.
  if(!_gradeNodeOpen(key,'activities',subject))
    return _lockedView(back,(isFr?'🎲 Activités · ':'🎲 Activities · ')+label);
  // Candado POR UNIDAD: el profesor abre cada unidad cuando toca.
  const all=_unitsFor(key,subject);
  const units =all.filter(u=> nodeVisible(_unitNode(key,u.id,subject)));
  const locked=all.filter(u=>!nodeVisible(_unitNode(key,u.id,subject)));
  const lockedBlock = locked.length ? `
    <div class="grid cols-3" style="margin-top:18px">
      ${locked.map(u=>_lockedCard(u.icon,esc(u.title),esc(u.blurb||''))).join('')}
    </div>` : '';
  // Índice de saltos: la página es larga (una unidad puede traer 6 semanas).
  // En PRIMARIA de inglés no hay práctica por nivel (es material de
  // secundaria), así que tampoco su salto. El g5 de FRANCÉS sí la tiene.
  const hasByLevel = isFr || !_isPrimaryGrade(key);
  const jump = units.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 4px">
      ${units.map(u=>`<a class="btn sm ghost" href="#unit-${u.id}" style="text-decoration:none">${u.icon} ${esc(u.title)}</a>`).join('')}
      ${hasByLevel?`<a class="btn sm ghost" href="#by-level" style="text-decoration:none">${isFr?'🎯 Par niveau':'🎯 By level'}</a>`:''}
    </div>` : '';
  // Candado POR SEMANA dentro de una unidad abierta: las cerradas se anuncian
  // en una línea (el alumno ve que hay más, pero no los ejercicios).
  const weekOpen=(u,w)=> !w.title || nodeVisible(_weekNode(key,u.id,w.id,subject));
  const unitsBlock = units.map(u=>{
    const ws=u.weeks||[];
    const soon=ws.filter(w=>!weekOpen(u,w));
    return `
    <h2 id="unit-${u.id}" style="margin:26px 0 4px">${u.icon} ${esc(u.title)}</h2>
    ${u.lead?`<p class="muted" style="margin:0 0 10px">${esc(u.lead)}</p>`:''}
    ${ws.filter(w=>weekOpen(u,w)).map(w=>`
      ${w.title?`<h3 style="margin:16px 0 6px;font-size:1rem;color:var(--blue-d)">${esc(w.title)}</h3>`:''}
      <div class="grid cols-3" style="margin-top:8px">
        ${(w.games||[]).map(g=>_skillCard(g.icon,esc(g.title),esc(g.desc),
            _withBack(g.href,pre+key+'_unit_'+u.id))).join('')}
      </div>`).join('')}
    ${soon.length?`<p class="muted" style="margin:14px 0 0">🔒 ${soon.map(w=>esc(_shortTitle(w.title))).join(' · ')} — ${isFr?'ton professeur les ouvrira bientôt.':'your teacher will unlock these.'}</p>`:''}`;
  }).join('');
  // En francés las "prácticas por nivel" son las francesas (A1–C1); las de
  // inglés no pintan nada aquí.
  if(isFr){
    const frLv=FR_GRADE_LEVEL[key]||'A1';
    const lvParam=frLv.split('.')[0];      // A2.1 → A2 (los juegos van por nivel MCER)
    $('#main').innerHTML=`${back}<h1>🎲 Activités · ${label}</h1>
      <p class="muted" style="margin-top:-6px">Les jeux de chaque semaine de l'Unité 4, plus de l'entraînement libre par niveau (${esc(frLv)}).</p>
      ${jump}
      ${unitsBlock}
      ${lockedBlock}
      <h2 id="by-level" style="margin:30px 0 8px">🎯 Entraînement libre</h2>
      <div class="grid cols-2" style="margin-top:12px">
        ${_skillCard('🧩','Mots croisés','Mots croisés thématiques de vocabulaire français — 10 par niveau (A1–C1).',_withBack('crosswords-fr.html?levels='+encodeURIComponent(lvParam),route))}
        ${_skillCard('🔎','Mots mêlés','Grilles de mots mêlés en français — 10 par niveau (A1–C1), avec la prononciation de chaque mot trouvé.',_withBack('wordsearches-fr.html?levels='+encodeURIComponent(lvParam),route))}
      </div>`;
    if(focusUnit) setTimeout(()=>{ const el=document.getElementById('unit-'+focusUnit); if(el) el.scrollIntoView({block:'start'}); },0);
    return;
  }
  // PRIMARIA (inglés): solo las unidades — sin bloque "by level".
  if(!hasByLevel){
    $('#main').innerHTML=`${back}<h1>🎲 Activities · ${label}</h1>
      <p class="muted" style="margin-top:-6px">Games for each unit — with audio for young learners.</p>
      ${jump}
      ${unitsBlock}
      ${lockedBlock}`;
    if(focusUnit){ const el=document.getElementById('unit-'+focusUnit); if(el) el.scrollIntoView({block:'start'}); }
    return;
  }
  $('#main').innerHTML=`${back}<h1>🎲 Activities · ${label}</h1>
    <p class="muted" style="margin-top:-6px">Games for each unit, plus extra practice by level (${lv.split(',').join(' · ')}).</p>
    ${jump}
    ${unitsBlock}
    ${lockedBlock}
    <h2 id="by-level" style="margin:30px 0 8px">🎯 Extra practice by level</h2>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('🧩','Crosswords','10 themed crosswords per level — clues, lives and timer.',_withBack('crosswords.html?levels='+encodeURIComponent(lv),route))}
      ${_skillCard('🔎','Word Search','10 themed word searches per level.',_withBack('wordsearches.html?levels='+encodeURIComponent(lv),route))}
      ${_skillCard('🔢','Word Sudoku','Word sudoku: 9 puzzles per level ('+lv.split(',').join(' · ')+').',_withBack('word-sudoku.html?levels='+encodeURIComponent(lv),route))}
      ${_skillCard('🎡','Word Wheel','Spin the letter wheel to build words and fill the crossword: 6 wheels per level ('+lv.split(',').join(' · ')+'), each with a vocabulary card.',_withBack('word-wheel.html?levels='+encodeURIComponent(lv),route))}
      ${_skillCard('✍️','Writing Tutor','Guides what to write in each section: Cambridge types + academic styles, suggested phrases, counter, steps and checklist (A2–C1).',_withBack('writing-tutor.html',route))}
      ${_skillCard('🧠','Exercises','Grammar, punctuation, structure and vocabulary: exercises with instant correction and score (A2–C1).',_withBack('exercises.html',route))}
      ${_skillCard('🃏','Memory','Flip and match the picture with its word: 5 games per level (A1–C1), with timer and moves.',_withBack('memory.html',route))}
      ${key==='g9' ? _skillCard('🧠','Memory · Reported Speech','Match each sentence in direct speech with its reported-speech version.',_withBack('memory-reported-speech.html',route)) : ''}
    </div>`;
  if(focusUnit){
    const el=document.getElementById('unit-'+focusUnit);
    if(el) el.scrollIntoView({block:'start'});
  }
}
/* Ruta por unidad (#classes_g9_unit_u4): ya no es una vista aparte — abre la
   lista completa colocada en esa unidad. Se mantiene porque los juegos ya
   publicados enlazan aquí con ?back=. */
function studentGradeUnit(key,unitId){ studentGradeActivities(key,unitId); }

/* ===== 🇫🇷 FRANCÉS: Classes → grado → Activités =====
   Reutiliza studentGradeActivities pasándole subject:'french'; lo único
   propio es la lista de grados (5.º–10.º, no 6.º–11.º como inglés). */
function studentFrenchClasses(){
  _setNav('french');
  const back=_backBtn("window._nav('french')",'French');
  if(!nodeVisible('french.classes')) return _lockedView(back,'🏫 Classes · Français');
  const cards=FR_GRADE_ORDER.map(g=>{
    const [emoji,label]=FR_GRADE_META[g];
    const lvl=FR_GRADE_LEVEL[g]||'';
    const desc='Unité 4 · '+lvl+' — les jeux de la semaine.';
    return nodeVisible('french.classes.'+g)
      ? _hubCard(emoji,label,desc,"window._nav('fr_classes_"+g+"')")
      : _lockedCard(emoji,label,desc);
  }).join('');
  $('#main').innerHTML=`${back}<h1>🏫 Classes · Français</h1>
    <p class="muted" style="margin-top:-6px">Choisis ton grade.</p>
    <div class="grid cols-3" style="margin-top:12px">${cards}</div>`;
}
/* CEFR: el vocabulario por NIVEL (A1–C2), independiente del grado. Son los
   dos generadores de gen_fr_games.py, con 10 rejillas por nivel. */
function studentFrenchCefr(){
  _setNav('french');
  const back=_backBtn("window._nav('french')",'French');
  const cw=nodeVisible('french.crosswords'), ws=nodeVisible('french.wordsearch');
  if(!cw && !ws) return _lockedView(back,'📚 CEFR · Français');
  $('#main').innerHTML=`${back}<h1>📚 CEFR · Français</h1>
    <p class="muted" style="margin-top:-6px">Vocabulaire par niveau du Cadre européen — 10 grilles par niveau, de A1 à C2.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${cw ? _skillCard('🧩','Mots croisés','Mots croisés thématiques de vocabulaire français — 10 par niveau (A1 à C2). Les définitions sont en français.',_withBack('crosswords-fr.html','fr_cefr')) : _lockedCard('🧩','Mots croisés','Mots croisés de vocabulaire français.')}
      ${ws ? _skillCard('🔎','Mots mêlés','Grilles de mots mêlés en français — 10 par niveau (A1 à C2), avec la prononciation de chaque mot trouvé.',_withBack('wordsearches-fr.html','fr_cefr')) : _lockedCard('🔎','Mots mêlés','Grilles de mots mêlés en français.')}
    </div>
    <p class="muted" style="margin-top:14px;font-size:.85rem">A1 · A2 · B1 · B2 · C1 · C2 — le niveau se choisit dans le jeu.</p>`;
}
function studentFrenchGrade(key){
  _setNav('french');
  const [emoji,label]=FR_GRADE_META[key]||['🏫',key];
  const back=_backBtn("window._nav('fr_classes')",'Classes');
  if(!nodeVisible('french.classes.'+key)) return _lockedView(back,emoji+' '+label);
  $('#main').innerHTML=`${back}<h1>${emoji} ${label}</h1>
    <p class="muted" style="margin-top:-6px">Français · niveau ${esc(FR_GRADE_LEVEL[key]||'')}.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${nodeVisible('french.classes.'+key+'.activities')
        ? _hubCard('🎲','Activités',"Les six jeux de chaque semaine de l'Unité 4.","window._nav('fr_classes_"+key+"_act')")
        : _lockedCard('🎲','Activités','Les jeux de l’unité.')}
    </div>`;
}
/* Al alumno se le lleva DIRECTO a las unidades de SU grado: no tiene por que
   saber en que etapa esta ni elegir entre once grados para encontrar el suyo.
   Al profesor y al admin, que trabajan con varios, se les deja el selector. */
function irAMiUnidad(){
  const p = state.profile || {};
  const key = p.grade_id ? 'g' + p.grade_id : null;
  if(_isStudent() && key && unitPlansFor(key).length) return studentGradeUnits(key);
  if(key && unitPlansFor(key).length) return studentGradeUnits(key);
  return studentClasses();
}

/* Pinta una vista. Devuelve true si la clave era una ruta conocida. */
function _navRender(k){
  let m;
  // Francés primero: sus rutas llevan el prefijo fr_ y si no, `classes_(g\d+)`
  // se las tragaría y pintaría la vista de inglés.
  if(m=/^fr_classes_(g\d+)_unit_([a-z0-9]+)$/.exec(k)){ studentGradeActivities(m[1],m[2],'french'); return true; }
  if(m=/^fr_classes_(g\d+)_act$/.exec(k)){ studentGradeActivities(m[1],null,'french'); return true; }
  if(m=/^fr_classes_(g\d+)$/.exec(k))    { studentFrenchGrade(m[1]);   return true; }
  if(k==='fr_classes')                   { studentFrenchClasses();     return true; }
  if(k==='fr_cefr')                      { studentFrenchCefr();        return true; }
  if(k==='myunit')            { irAMiUnidad();              return true; }
  if(k==='projects')          { irAMisProyectos();          return true; }
  if(k==='classes_primary')   { studentStage('primary');   return true; }
  if(k==='classes_secondary') { studentStage('secondary'); return true; }
  if(m=/^classes_(g\d+)_unit_([a-z0-9]+)$/.exec(k)){ studentGradeUnit(m[1],m[2]); return true; }
  if(m=/^classes_(g\d+)_act$/.exec(k)){ studentGradeActivities(m[1]); return true; }
  if(m=/^classes_(g\d+)_units$/.exec(k)){ studentGradeUnits(m[1]); return true; }
  if(m=/^classes_(g\d+)_flyers$/.exec(k)){ studentGradeFlyers(m[1]); return true; }
  if(m=/^classes_(g\d+)_cambridge$/.exec(k)){ studentGradeCambridge(m[1]); return true; }
  if(m=/^classes_(g\d+)_readers_report$/.exec(k)){ studentReaderReport(m[1]); return true; }
  if(m=/^classes_(g\d+)_readers$/.exec(k)){ studentGradeReaders(m[1]); return true; }
  if(m=/^classes_(g\d+)$/.exec(k))    { studentGrade(m[1]);           return true; }
  const fn={english:()=>studentSubject('english'),french:()=>studentSubject('french'),general:studentGeneral,
    mocks:studentMocks,practice:studentPractice,cambridge:studentCambridgePortal,library:studentLibrary,mun:studentMun,classes:studentClasses,
    phonics:studentPhonics,coach:studentCoach,results:studentResults,nishoot:studentNishoot,games:studentGames,
    final:studentFinal,account:studentAccount,home:studentHub}[k];
  if(fn){ fn(); return true; }
  return false;
}
/* La ruta va al hash (#classes_g9_unit_u4) para que se pueda volver a una
   vista concreta desde fuera del portal y para que el "atrás" del navegador
   funcione dentro del SPA. Antes no había ruta en la URL: cualquier regreso
   al portal caía en el hub y había que rehacer todo el camino. */
window._nav=(k)=>{
  if(!k) return;
  if(('#'+k)!==location.hash){ location.hash=k; return; }   // → hashchange → _navRender
  _navRender(k);
};
window.addEventListener('hashchange',()=>{
  const k=(location.hash||'').replace(/^#/,'');
  // Admin y profesor navegan por el menu lateral; el hash solo les sirve para
  // moverse DENTRO de una vista de contenido (Classes, French...). Si la ruta
  // no existe no se toca nada: mandarlos al hub del alumno les borraria el
  // panel que estan mirando.
  if(!_isStudent()){ _navRender(k); return; }
  if(!_navRender(k)) studentHub();
});
/* Enlaces que SALEN del portal (juegos, hubs sueltos): llevan ?back=./#ruta
   para que nis-nav.js pueda devolver al alumno exactamente a esta vista. */
function _withBack(href,route){
  if(!route || !href) return href;
  if(/^[a-z][a-z0-9+.\-]*:/i.test(href) || href.slice(0,2)==='//') return href;   // externo
  return href+(href.indexOf('?')<0?'?':'&')+'back='+encodeURIComponent('./#'+route);
}

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
      <div class="badge" style="background:var(--lila);color:var(--blue-dd);margin-top:10px">Coming soon</div>
    </div>`;
}
function studentMocks(){
  _setNav('mocks');
  $('#main').innerHTML=`<h1>🎓 Cambridge Mocks</h1>
    <p class="muted" style="margin-top:-6px">MOCK 1 and MOCK 2 in official Cambridge format (A2 · B1 · B2 · C1). You go straight in with your session — no need to enter your details again. Your result is saved only in My Progress.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','KET/PET/FCE/CAE-style texts and tasks with a timer.',QUIZ_URL+'reading-quiz.html?branch=mocks')}
      ${_skillCard('🎧','Listening','Real audio in Cambridge format, with a timer.',QUIZ_URL+'listening-quiz.html?branch=mocks')}
      ${_skillCard('✍️','Writing','Part 1 compulsory + Part 2 of your choice. Graded by your teacher. B1 · B2 · C1 only.',QUIZ_URL+'writing-quiz.html?branch=mocks')}
      ${_soonCard('🗣️','Speaking','Cambridge-style interview with an examiner.')}
    </div>`;
}

/* ---------- Practice Tests: siempre disponibles (sin QR, sin re-registro) ---------- */
function studentPractice(){
  _setNav('practice');
  $('#main').innerHTML=`<h1>🎯 Practice Tests</h1>
    <p class="muted" style="margin-top:-6px">Practice tests 1, 2 and 3 in authentic Cambridge format — always available. You go straight in with your session and your result is saved only in My Progress.</p>
    <div class="grid cols-3" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','Practice 1 · 2 · 3 with automatic marking and CEFR feedback.',QUIZ_URL+'reading-quiz.html?branch=practice')}
      ${_skillCard('🎧','Listening','Practice with real audio and automatic marking.',QUIZ_URL+'listening-quiz.html?branch=practice')}
      ${_skillCard('✍️','Writing','Writing tasks your teacher grades with a rubric.',QUIZ_URL+'writing-quiz.html?branch=practice')}
    </div>`;
}

/* ---------- Library ---------- */
async function studentLibrary(){
  _setNav('library');
  // LIBRARY_URL aún apunta a un OPAC local (127.0.0.1) que no es público.
  // Hasta tener una URL pública, el tile se muestra como "Próximamente"
  // (evita un enlace roto para los alumnos en nis.cohasset.pe).
  const libTile = (LIBRARY_URL && !/^https?:\/\/(127\.0\.0\.1|localhost)/.test(LIBRARY_URL))
    ? _skillCard('📚','Open the Library','Search books, check availability and your loans.',LIBRARY_URL)
    : _soonCard('📚','Library','Online catalogue (OPAC): soon you\'ll be able to search books and see your loans.');
  const staff = state.profile && (state.profile.role==='teacher'||state.profile.role==='admin');
  const back = _isStudent() ? _backBtn("window._nav('english')",'English') : '';
  $('#main').innerHTML=`${back}<h1>📚 Library</h1><p class="muted">Cargando…</p>`;
  await loadReaderAssignments();
  const cat=_RDR_IDS.map(id=>{ const m=READER_META[id], c=READER_CARDS[id];
    const mine=!_isStudent() || readerBooksFor('g'+((state.profile&&state.profile.grade_id)||0)).indexOf(id)>=0;
    return `<div class="card" style="text-align:left;padding:20px 18px;${mine?'':'opacity:.6'}">
      <div style="font-size:2.6rem;line-height:1">${m.icon}</div>
      <h2 style="margin:8px 0 2px;color:var(--blue-d)">${esc(m.title)}</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:8px">${esc(c[2].split('—')[0].trim())} · ${m.chapters} chapters · A2–C2</div>
      ${mine?`<a class="btn sm" style="text-decoration:none" href="${c[3]}">Open the reader →</a>`
            :'<span class="muted" style="font-size:.8rem">Not assigned to your class this year.</span>'}
    </div>`; }).join('');
  const panel = staff ? await _assignPanel() : '';
  $('#main').innerHTML=`${back}<h1>📚 Library</h1>
    <p class="muted" style="margin-top:-6px">Los readers del colegio${staff?' — y qué lee cada salón este año':''}.</p>
    <h2 style="font-size:16px;color:var(--blue-d);margin:16px 0 10px">📖 Readers</h2>
    <div class="grid cols-3">${cat}</div>
    ${panel}
    <h2 style="font-size:16px;color:var(--blue-d);margin:22px 0 10px">🔎 Catálogo (OPAC)</h2>
    <div class="grid cols-2">${libTile}</div>`;
}
/* Asignación del año: filas = salones reales, columnas = los tres trimestres.
   Cada salón lee UNA obra por trimestre, así que cada celda es una elección y
   no una casilla: elegir otra obra sustituye a la anterior. */
async function _assignPanel(){
  const grades=(state.profile&&state.profile.role==='admin')?GRADES:teacherAllowedGrades();
  const ok=new Set(grades.map(g=>String(g.id)));
  const { data:studs } = await sb.from('profiles').select('grade_id,section, grades(name)').eq('role','student');
  const rooms={};
  (studs||[]).forEach(p=>{ if(p.grade_id==null||!ok.has(String(p.grade_id))) return;
    const sec=String(p.section||'').trim();
    const k=p.grade_id+'|'+sec;
    (rooms[k]||(rooms[k]={gid:p.grade_id,sec,name:(p.grades&&p.grades.name)||('G'+p.grade_id),n:0})).n++; });
  const list=Object.values(rooms).sort((a,b)=>a.gid-b.gid||a.sec.localeCompare(b.sec));
  if(!list.length) return '';
  const libro=(gid,sec,term)=>{ const r=(READER_ASSIGN||[]).find(x=>+x.school_year===SCHOOL_YEAR_NOW &&
      +x.grade_id===gid && String(x.section||'')===sec && +x.term===term); return r?r.book_id:''; };
  const rows=list.map(r=>`<tr>
    <td><b>${esc(r.name)}${r.sec?' · '+esc(r.sec):''}</b> <span class="muted" style="font-size:.8rem">${r.n} alumnos</span></td>
    ${RDR_TERMS.map(t=>{ const cur=libro(r.gid,r.sec,t);
      return `<td style="text-align:center"><select onchange="window._assignTerm(${r.gid},'${esc(r.sec)}',${t},this.value)"
        style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px;max-width:200px">
        <option value="">— sin asignar —</option>
        ${_RDR_IDS.map(id=>`<option value="${id}" ${cur===id?'selected':''}>${READER_META[id].icon} ${esc(READER_META[id].short)}</option>`).join('')}
      </select></td>`; }).join('')}
  </tr>`).join('');
  return `<h2 style="font-size:16px;color:var(--blue-d);margin:22px 0 8px">🗂️ Qué lee cada salón — año ${SCHOOL_YEAR_NOW}</h2>
    <p class="muted" style="margin:0 0 10px;font-size:.85rem"><b>Una obra por trimestre</b>: elegir otra sustituye a la que estaba. Cada año se elige de nuevo — lo de ${SCHOOL_YEAR_NOW} no se arrastra a ${SCHOOL_YEAR_NOW+1}, porque en cada grado habrá otros alumnos. El alumno solo ve en <b>Classes → Readers</b> los libros marcados aquí para su salón, y <b>📖 Controles de lectura</b> lee de esta misma tabla para saber qué obra toca cada trimestre.</p>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Salón</th>${RDR_TERMS.map(t=>`<th style="text-align:center">${_rdrTermLab(t)}</th>`).join('')}</tr></thead>
      <tbody>${rows}</tbody></table></div>`;
}
/* Cambiar la obra de un trimestre: se borra la que hubiera (la regla es una
   por trimestre) y se guarda la nueva. Valor vacío = dejar el trimestre libre. */
window._assignTerm=async(gid,sec,term,bookId)=>{
  try{
    const del=await sb.from('reader_assignments').delete()
      .eq('school_year',SCHOOL_YEAR_NOW).eq('grade_id',gid).eq('section',sec).eq('term',term);
    if(del.error) throw del.error;
    if(bookId){
      const r=await sb.from('reader_assignments').insert({school_year:SCHOOL_YEAR_NOW,grade_id:gid,section:sec,term,book_id:bookId});
      if(r.error) throw r.error;
    }
    READER_ASSIGN=null; await loadReaderAssignments();
    studentLibrary();
  }catch(e){ alert('No se pudo guardar la asignación: '+(e.message||e)); }
};

/* ---------- Classes: DOS etapas (Primary 2.º–5.º · Secondary 6.º–11.º) ----------
   El alumno entra por su etapa y dentro están las tarjetas por grado. Las
   tarjetas de etapa no llevan nodo propio: el candado sigue siendo por grado
   (y english.classes gatea la sección entera, como siempre). */
function studentClasses(){
  _setNav('classes');
  const back = _isStudent() ? _backBtn("window._nav('english')",'English') : '';
  const cards = ['primary','secondary'].map(st=>{
    const m=STAGE_META[st];
    return _hubCard(m.emoji,m.title,m.desc,"window._nav('classes_"+st+"')");
  }).join('');
  $('#main').innerHTML=`${back}<h1>🏫 Classes</h1>
    <p class="muted" style="margin-top:-6px">Class material by stage and grade.</p>
    <div class="grid cols-2" style="margin-top:12px">${cards}</div>`;
}
/* Una etapa: sus tarjetas por grado. */
function studentStage(stage){
  _setNav('classes');
  const m=STAGE_META[stage]||STAGE_META.secondary;
  const back = _backBtn("window._nav('classes')",'Classes');
  const cards = m.grades.map(k=>{
    const [emoji,label]=GRADE_META[k];
    const node='english.classes.'+k;
    const desc = _isPrimaryGrade(k)
      ? 'Games and activities for '+label+'.'
      : 'Grammar and activities for '+label+'.';
    return nodeVisible(node)
      ? _hubCard(emoji,label,desc,"window._nav('classes_"+k+"')")
      : _lockedCard(emoji,label,desc);
  }).join('');
  /* Tarjeta YLE (Fun for Nordic) — solo en la etapa Primary */
  /* La tarjeta se rellena despues, cuando fun_access conteste: los niveles
     que ofrece dependen del grado del alumno. Mientras tanto queda el hueco,
     que es medio segundo y no parpadea. */
  const yle = stage==='primary' ? '<div id="yle-card"></div>' : '';
  $('#main').innerHTML=`${back}<h1>${m.emoji} ${m.title}</h1>
    <p class="muted" style="margin-top:-6px">${m.desc}</p>
    ${yle}
    <div id="fr-card"></div>
    <div class="grid cols-3" style="margin-top:12px">${cards}</div>`;
  if (stage==='primary') _pintaYle();
  if (stage==='primary') frIndice().then(async idx => {
    const caja = document.getElementById('fr-card');
    if (!caja) return;
    const permiso = await funAccessDeGrado((state.profile && state.profile.grade_id) || 0, 'fr');
    const suyos = permiso === null ? ['starters','movers','flyers'] : permiso.map(f => f.level);
    const botones = ['starters','movers','flyers'].filter(n => (idx[n]||0) > 0 && suyos.includes(n)).map(n => {
      const c = FUN_FR[n];
      return `<a href="${_withBack('nis-fun/engine/?level='+n+'&lang=fr','classes_primary')}"
                 target="_blank" rel="noopener" class="btn"
                 style="background:${c.color};color:#fff;text-decoration:none">${c.em} ${c.curso}</a>`;
    }).join('');
    if (!botones) return;   // sin unidades listas no se ofrece nada
    caja.innerHTML = `<div class="card" style="margin-top:16px;border-top:5px solid #2f9268">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">🇫🇷 Cap sur le français</h2>
      <div class="muted" style="font-size:.9rem;margin-bottom:12px">Le même cours, en français : les mêmes
        personnages, les mêmes dessins et des voix françaises. Ouvre une unité et c'est parti !</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${botones}</div>
      <div class="muted" style="font-size:.85rem;margin:14px 0 6px">\u{1F4DA} Tes livres \u00e0 imprimer :</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${
        suyos.filter(n => (idx[n]||0) > 0).map(n => funLibros(n, 'fr', false)).join('')
      }</div></div>`;
  });
}

/* La tarjeta inglesa de Fun for Nordic, con los niveles que le tocan a este
   grado. Sin reglas en fun_access se ofrecen los tres, como siempre. */
const _YLE_BOT = {
  starters: {c:'#d97d0d', t:'🐧 Pre A1 · Starters'},
  movers:   {c:'#2f9268', t:'🐺 A1 · Movers'},
  flyers:   {c:'#3b6fb5', t:'🦅 A2 · Flyers'},
};
async function _pintaYle(){
  const caja = document.getElementById('yle-card');
  if (!caja) return;
  const grado = (state.profile && state.profile.grade_id) || 0;
  const permiso = await funAccessDeGrado(grado, 'en');
  const niveles = permiso === null ? ['starters','movers','flyers']
                                   : permiso.map(f => f.level);
  if (!niveles.length) return;            // este grado no hace el curso
  const rango = n => {
    const f = permiso && permiso.find(x => x.level === n);
    return f ? `<small class="muted" style="display:block">Units ${f.desde}–${f.hasta}</small>` : '';
  };
  const botones = niveles.map(n => `<a href="${_withBack('nis-fun/engine/?level='+n,'classes_primary')}"
      target="_blank" rel="noopener" class="btn"
      style="background:${_YLE_BOT[n].c};color:#fff;text-decoration:none">${_YLE_BOT[n].t}</a>`).join('');
  caja.innerHTML = `<div class="card" style="margin-top:16px;border-top:5px solid #3b6fb5">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">🧭 Fun for Nordic — Cambridge YLE</h2>
      <div class="muted" style="font-size:.9rem;margin-bottom:12px">Interactive course to get ready for the Cambridge Young Learners exams: units with audio, crosswords and exam tasks — with Pip, Luna and Kili!</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${botones}</div>
      ${niveles.map(rango).join('')}
      <div class="muted" style="font-size:.85rem;margin:14px 0 6px">📚 Your books to print:</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${
        niveles.map(n => funLibros(n, 'en', false)).join('')
      }</div>
    </div>`;
}

/* ---------- My Progress: historial completo del alumno (mocks, practice y actividades) ---------- */
async function studentResults(){
  _setNav('results');
  const p=state.profile;
  const back = _isStudent() ? _backBtn("window._nav('english')",'English') : '';
  if(!p.id) return _previewNeedsStudent('📊 My Progress', back);
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
const SCALE_RANGE = { A2:[100,150], B1:[120,170], B2:[140,190], C1:[160,210] }; // rango Cambridge reportado por nivel (referencia)
const SCALE_BOUNDARY = { A2:120, B1:140, B2:160, C1:180 };  // inicio CEFR del nivel ≈ aprobar (~60%)
const CEFR_BANDS = [ {min:180,cefr:'C1'},{min:160,cefr:'B2'},
  {min:140,cefr:'B1'},{min:120,cefr:'A2'},{min:100,cefr:'A1'},{min:0,cefr:'<A1'} ];  // C1 es el tope: cualquier escala ≥180 reporta C1 (sin C2)
/* %→Escala Cambridge anclado al APROBADO: 60% cae en el límite del nivel; por
   encima sube hacia la banda siguiente; por debajo baja ~1 banda cada 20 puntos.
   (Antes el piso del nivel era la banda inferior, así un 20% en B2 daba 150=B1;
    ahora 20% en B2 → 120 = A2.) */
function skillScale(level, pct){
  if(pct==null || isNaN(pct)) return null;
  const B = SCALE_BOUNDARY[level] || SCALE_BOUNDARY.B1;
  pct = Number(pct);
  const s = pct>=60 ? B + (pct-60)*0.75 : B - (60-pct)*1.0;
  return Math.round(Math.max(80, Math.min(230, s)));
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
/* Per-student grade-target override (accessibility / teacher judgement). */
const TARGET_OVERRIDE = { '25555d21-e999-4b76-a5eb-827937b0d8a9':'A2' }; // Salvador Arata Morales (G9·B)
function targetLevel(p){ return (p && (TARGET_OVERRIDE[p.id] || GRADE_TARGET[p.grade_id] || p.cefr_level)) || null; }
const CEFR_RANK = {'<A1':0,'A1':1,'A2':2,'B1':3,'B2':4,'C1':5,'C2':6};
/* Compare a final CEFR against the target: 'meets' | 'below' | 'above' | null */
function targetStatus(finalCefr, target){
  if(!target || finalCefr==null || finalCefr==='—' || !(finalCefr in CEFR_RANK)) return null;
  const d = CEFR_RANK[finalCefr] - CEFR_RANK[target];
  return d<0 ? 'below' : d>0 ? 'above' : 'meets';
}
/* Best attempt for a skill — MOCK-FIRST, PASS-AWARE.
   The official mock (mock1/mock2) is authoritative: if the skill has ANY mock,
   only mocks are considered, so a high 'practice' score at a higher level can't
   inflate the final above the official mock (e.g. a 97% B1 practice reading
   must NOT turn an A2 mock into B2). 'practice' is used only as a fallback when
   the skill has no mock at all — otherwise that grade would simply vanish from
   the report (most attempts in the system are practice).
   A sub-pass attempt at a high level must NOT out-rank a genuine pass at a
   lower level (e.g. C1 @ 0% would otherwise score B2). So within the chosen set
   pick the highest scale among attempts that reach the pass mark; if none
   passed, fall back to the highest-% attempt (not the highest level). */
const PASS_MIN = 50;
function bestAttemptScale(atts, skill){
  const all = (atts||[])
    .filter(a => a.skill===skill && a.percent!=null)
    .map(a => ({ a, pct:Number(a.percent), scale:skillScale(a.level, Number(a.percent)), isMock:a.mock!=='practice' }))
    .filter(x => x.scale!=null);
  if(!all.length) return null;
  const mocks = all.filter(x => x.isMock);
  const rows = mocks.length ? mocks : all;   // mock-first; practice only if no mock
  const passed = rows.filter(x => x.pct >= PASS_MIN);
  const pick = passed.length
    ? passed.reduce((b,x) => x.scale > b.scale ? x : b)   // best pass by scale
    : rows.reduce((b,x) => x.pct > b.pct ? x : b);        // none passed: highest %, not highest level
  return { scale:pick.scale, cefr:scaleToCefr(pick.scale), level:pick.a.level,
           pct:Math.round(pick.pct), source:mockLabel(pick.a), passed:passed.length>0 };
}
/* Per-student CEFR override, by skill — teacher's professional judgement.
   This does NOT change the scoring formula: it pins one student's band when
   the teacher decides the auto-mapped result doesn't reflect the real level.
   The Cambridge scale is clamped into the chosen band so the displayed scale
   (and the overall average) stay coherent with the pinned CEFR. */
const FINAL_CEFR_OVERRIDE = {
  // Kai Coll Mayo (G6 · A) — teacher: overall result pinned to A2 (Reading & Listening).
  'd441885a-6ec9-4b70-92db-10fa352326d2': { Reading:'A2', Listening:'A2' },
  // Caleb Eliahu Chinchay Roncal (G6 · B) — teacher: overall result pinned to A2.
  'd1f12f91-64ba-403e-b191-783ec0280083': { Reading:'A2', Listening:'A2' },
  // Salvador Arata Morales (G9 · B) — accessibility: all skills pinned to A2.
  '25555d21-e999-4b76-a5eb-827937b0d8a9': { Reading:'A2', Listening:'A2', Writing:'A2', Speaking:'A2' },
};
/* Per-student FINAL RESULT override (teacher judgement) — pins the overall result
   and clamps the scale into that band, so portal == PDF report. */
const FINAL_RESULT_OVERRIDE = {
  'fdbd2138-32e3-44cb-93db-9ff74a2e7a80': 'C1', // David André Novoa Davis (G9·B)
  'a53a5fce-5381-417a-910c-26d8888fbeac': 'A1', // Rafaella Vargas (G9·B)
  'fdc5fd6f-cca7-44ee-b304-e6441b7e8b8d': 'A2', // Mikel Paolo Olcese Reategui (G9·A)
  '637dc77a-7f76-4d62-a3bc-44f7f55d2e67': 'B1', // Alejandro Mosi Pimentel (G8·B)
  '55f919be-054d-4b7a-88a6-27dfcd124a60': 'B2', // Alessandra Paola Chiri Riva (G8·B)
  '75d38ade-87c1-4558-9ba8-a5b44b4f9e31': 'A2', // Cristóbal Burga Garrúes (G8·B)
  'a23da050-d6cb-4460-90dd-d6281974e5da': 'A1', // Joaquim Alfredo Ruiz Huallanca (G8·B)
  '2ef7eb9f-8149-48c7-935b-7b9e4ddc8cff': 'A2', // Valeria Sofia Morales Parodi (G8·A)
};
function _applyCefrOverride(profile, skill, b){
  if(!b) return b;
  const ov = FINAL_CEFR_OVERRIDE[profile && profile.id];
  const lvl = ov && ov[skill];
  if(!lvl || lvl===b.cefr) return b;
  const band = CEFR_BANDS.find(x=>x.cefr===lvl);
  if(!band) return b;
  const top = CEFR_BANDS.filter(x=>x.min>band.min).reduce((m,x)=>Math.min(m,x.min),230) - 1;
  const scale = Math.max(band.min, Math.min(top, b.scale));
  return { ...b, cefr:lvl, scale, overridden:true };
}
/* Combine the four skills into a provisional/final CEFR result. */
function _finalFromData(profile, atts, spk){
  // A2 Key is a combined "Reading and Writing" paper, so Writing is NOT a
  // separate skill at A2 — it's embedded in Reading & Use of English. A2-track
  // students are therefore scored on Reading + Listening + Speaking only.
  const isA2 = targetLevel(profile)==='A2';
  const Reading   = _applyCefrOverride(profile,'Reading',  bestAttemptScale(atts,'Reading'));
  const Listening = _applyCefrOverride(profile,'Listening',bestAttemptScale(atts,'Listening'));
  // A2 (KET) normalmente combina Reading+Writing (sin Writing aparte). Pero si la
  // profesora SÍ calificó un Writing (p. ej. G7 a nivel B1), se incluye igual.
  const Writing   = _applyCefrOverride(profile,'Writing',  bestAttemptScale(atts,'Writing'));
  let Speaking = null;
  if(spk && spk.percent!=null){
    const lvl = spk.level || targetLevel(profile) || 'B1';
    const sc = skillScale(lvl, Number(spk.percent));
    Speaking = { scale:sc, cefr:scaleToCefr(sc), level:lvl, pct:Math.round(Number(spk.percent)), source:'Rúbrica' };
  }
  Speaking = _applyCefrOverride(profile,'Speaking', Speaking);
  // Plegar Writing dentro de Reading SOLO en A2 puro (sin ningún writing rendido).
  // Si hay writing (calificado o no), se muestra como destreza propia (B1+).
  const a2NoWriting = isA2 && !(atts||[]).some(a=>a.skill==='Writing');
  const skills = a2NoWriting ? { Reading, Listening, Speaking } : { Reading, Listening, Writing, Speaking };
  const present = Object.values(skills).filter(Boolean);
  // Salvador Arata (accesibilidad): recomputar cada destreza como A2 por % (coincide con el PDF
  // y no infla con el piso del nivel original). Mantiene techo A2 (139).
  if(profile && profile.id==='25555d21-e999-4b76-a5eb-827937b0d8a9'){
    for(const x of present){ if(x && x.pct!=null){ x.scale=Math.min(139,skillScale('A2',Number(x.pct))); x.cefr='A2'; } }
  }
  // Reglas de "informe completo":
  //  · A2 puro (A2 Key): Reading & Use of English (incluye Writing) + Listening. No requiere Speaking.
  //  · B1/B2/C1 (o A2 con Writing aparte): Reading & UoE + Listening + Writing + Speaking.
  const requiredKeys = a2NoWriting ? ['Reading','Listening'] : ['Reading','Listening','Writing','Speaking'];
  let finalScale = present.length ? Math.round(present.reduce((s,x)=>s+x.scale,0)/present.length) : null;
  // Tope por destrezas muy bajas (<50% = no aprobó la destreza): 1 baja -> máx B2,
  // 2+ bajas -> máx B1. Solo BAJA el resultado (una escala alta por el piso del nivel
  // no debe inflar un C1/C2 cuando una destreza está muy baja).
  if(finalScale!=null){
    const lows = present.filter(x=>x && x.pct!=null && Number(x.pct)<50).length;
    const ceil = lows>=2 ? 159 : (lows>=1 ? 179 : null);
    if(ceil!=null && finalScale>ceil) finalScale = ceil;
  }
  let finalCefr = scaleToCefr(finalScale);
  const _fro = FINAL_RESULT_OVERRIDE[profile && profile.id];
  if(_fro && finalScale!=null){
    const _b = CEFR_BANDS.find(x=>x.cefr===_fro);
    if(_b){ const _top = CEFR_BANDS.filter(x=>x.min>_b.min).reduce((m,x)=>Math.min(m,x.min),230)-1;
      finalScale = Math.max(_b.min, Math.min(_top, finalScale)); finalCefr=_fro; }
  }
  const labels = { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' };
  return { profile, skills, isA2, a2NoWriting, finalScale, finalCefr,
           complete: requiredKeys.every(k=>skills[k]), missing: requiredKeys.filter(k=>!skills[k]).map(k=>labels[k]) };
}
function _skillCellHtml(b){
  if(!b) return '';
  return `<b style="color:#2d5a8d">${esc(b.cefr)}</b> <span class="muted" style="font-size:.78rem">${b.scale} · ${b.pct}%</span>`;
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
    // Mock column (solo profesor/admin): el examen exacto que rindió = nivel · número de mock.
    // Un alumno suele rendir un solo mock; si rindió varios (p. ej. Mock 1 y Mock 2) se listan.
    const mockCell = (()=>{
      const ms = at.filter(isMockAttempt);
      if(!ms.length) return '<span class="muted" style="font-size:.8rem">—</span>';
      ms.sort((x,y)=>(x.mock||'').localeCompare(y.mock||'')||(x.level||'').localeCompare(y.level||''));
      const seen=new Set(), out=[];
      ms.forEach(a=>{ const key=(a.level||'?')+'·'+a.mock; if(seen.has(key))return; seen.add(key);
        out.push(`<span class="badge lvl" style="font-size:.78rem" title="${esc(mockLabel(a))} · nivel ${esc(a.level||'?')}">${esc(a.level||'?')} · ${esc(mockLabel(a))}</span>`); });
      return out.join('<br>');
    })();
    const wAtt=at.filter(a=>a.skill==='Writing').sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||''))[0];
    const wCell = fin.a2NoWriting ? '<span class="muted" style="font-size:.78rem" title="En A2 Key el Writing va dentro de Reading &amp; Use of English">— en Reading</span>'
      : fin.skills.Writing ? `${_skillCellHtml(fin.skills.Writing)}${wAtt?` <button class="btn sm ghost" style="padding:2px 7px" onclick="gradeWriting('${wAtt.id}')" title="Editar calificación">✎</button>`:''}`
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
      ? `<span class="badge lvl" style="font-size:.92rem">${esc(fin.finalCefr)} · ${fin.finalScale}</span>${sttChip}${fin.complete?'':' <span class="badge off" style="font-size:.66rem" title="Faltan: '+esc(fin.missing.join(', '))+'">prov.</span>'}`
      : '<span class="muted">—</span>';
    return `<tr data-sname="${esc((s.full_name||'').toLowerCase())}">
      <td><a href="#" onclick="event.preventDefault();studentDetailReport('${s.id}','es')" title="Ver informe detallado e imprimir" style="color:#2d5a8d;font-weight:700;text-decoration:none;cursor:pointer">${esc(s.full_name||'')}</a></td>
      <td><span class="badge grade">${esc(s.grades?.name||'—')}</span> ${s.section?esc(s.section):''}</td>
      <td><span class="badge lvl" style="opacity:.8">${tgt||'—'}</span></td>
      <td style="white-space:nowrap">${mockCell}</td>
      <td>${_skillCellHtml(fin.skills.Reading)||'<span class="muted">—</span>'}</td>
      <td>${_skillCellHtml(fin.skills.Listening)||'<span class="muted">—</span>'}</td>
      <td>${wCell}</td>
      <td style="white-space:nowrap">${sCell}</td>
      <td>${finBadge}</td>
      <td class="acts"><div class="acts-wrap"><button class="btn sm" onclick="studentReportPDF('${s.id}','es')">📄 ES</button><button class="btn sm ghost" onclick="studentReportPDF('${s.id}','en')">📄 EN</button></div></td>
    </tr>`;
  }).join('');

  $('#main').innerHTML = `
    <h1 style="margin:0 0 4px">🎓 Resultado final · CEFR</h1>
    <p class="muted" style="margin-top:0;font-size:.88rem">Mejor resultado por destreza convertido a la <b>Escala Cambridge</b> (aprobar ≈60% cae en el límite del nivel; por debajo baja de banda). El <b>final</b> es el promedio de las destrezas evaluadas (se toma el mejor intento <b>aprobado ≥50%</b>; si ninguno aprueba, el de mayor %). <b>Writing</b> y <b>Speaking</b> se califican con la rúbrica Cambridge (0–5 por descriptor). En <b>A2</b> el Writing va dentro de Reading &amp; Use of English (examen A2 Key), así que no cuenta como destreza aparte. <b>Mock</b> = examen rendido (nivel · número de mock); “—” = aún no rinde mock. <b>Objetivo</b> = nivel al que apunta el grado; <span class="badge off" style="font-size:.66rem;background:#dc2626;color:#fff">▼</span> = por debajo del objetivo, <span class="badge on" style="font-size:.66rem">✓</span> = lo cumple. <span class="badge off" style="font-size:.66rem">prov.</span> = aún faltan destrezas.</p>
    ${resultsFilterBar(gradeList,'window._setFinalFilter')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Alumno</th><th>Grado</th><th>Objetivo</th><th>Mock</th><th>Reading &amp; UoE</th><th>Listening</th><th>Writing</th><th>Speaking</th><th>Final CEFR</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="10" class="center muted">Sin alumnos para este filtro.</td></tr>`}</tbody>
    </table><div id="resCount" data-noun="alumno(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${students.length} alumno(s)</div></div>`;
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
  const cefrBand = all ? scaleToCefr(skillScale(speakingState.level, pct)) : '—';
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
        <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span>${total}</span> / ${max} · <span>${pct}</span>% · <span style="background:#d1d2ea;color:#244c77;border-radius:8px;padding:2px 10px;font-size:1.05rem">${esc(cefrBand)}</span></div>
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
    s.src='vendor/html2pdf.bundle.min.js';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('No se pudo cargar html2pdf (conexión).'));
    document.head.appendChild(s);
  });
  return _h2pLib;
}
/* Carga html2canvas + jsPDF por separado. Se captura el nodo DIRECTAMENTE con
   html2canvas (no con html2pdf, que envuelve el nodo en un contenedor del ancho
   de la VENTANA y hacía que el PDF saliera encogido/cortado en ventanas reales). */
let _pdfLibs=null;
function ensurePdfLibs(){
  if(window.html2canvas && window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
  if(_pdfLibs) return _pdfLibs;
  const load=(src)=>new Promise((res,rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=()=>rej(new Error('No se pudieron cargar las librerías de PDF (conexión).')); document.head.appendChild(s); });
  _pdfLibs=(async()=>{
    if(!window.html2canvas) await load('vendor/html2canvas.min.js');
    if(!(window.jspdf&&window.jspdf.jsPDF)) await load('vendor/jspdf.umd.min.js');
  })();
  return _pdfLibs;
}
/* Inline SVG of the Cambridge English Scale / CEFR with a "you are here" marker. */
function cefrScaleSVG(scale, cefr){
  const W=720,H=560,topY=46,botY=512,minV=80,maxV=230;
  const yOf=v=>topY+(maxV-Math.max(minV,Math.min(maxV,v)))/(maxV-minV)*(botY-topY);
  const bands=[{cefr:'C1',lo:180,hi:230,c:'#7c6fd2'},
    {cefr:'B2',lo:160,hi:180,c:'#2d5a8d'},{cefr:'B1',lo:140,hi:160,c:'#4987c6'},
    {cefr:'A2',lo:120,hi:140,c:'#76cbe5'},{cefr:'A1',lo:100,hi:120,c:'#aebfd0'}];
  const quals=[{name:'A2 Key',lo:100,hi:150,c:'#76cbe5'},{name:'B1 Prelim.',lo:120,hi:170,c:'#4987c6'},
    {name:'B2 First',lo:140,hi:190,c:'#2d5a8d'},{name:'C1 Adv.',lo:160,hi:210,c:'#7c6fd2'}];
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
/* Construye el HTML interior del reporte de resultados (compartido por el PDF y la
   vista en pantalla). opts.detail=true añade el detalle de la evaluación de Writing y Speaking. */
function _reportInner(p, at, sp, fin, EN, opts){
  at = at||[]; opts = opts||{};
  const tgt=targetLevel(p)||'B1'; const stt=targetStatus(fin.finalCefr, tgt);
  const T = EN ? {
    sub:'Nordic International School of Lima · Cambridge English · Results report',
    sectionW:'Section', objective:'Target level', cefr:'Common European Framework (CEFR)', scaleName:'Cambridge English Scale',
    s1:'1) Skills summary (best result)', s2:'2) Reading & Use of English detail (by part)', s3:'3) Overall result on the CEFR',
    hSkill:'Skill', hLevel:'Level', hScore:'Score', hPct:'%', hScale:'Scale', hProg:'Progress', hStatus:'Status',
    reading:'Reading & Use of English', listening:'Listening', writing:'Writing', speaking:'Speaking',
    part:'Part', oral:'Oral session', notHere:'Not in this cycle', pending:'Pending (teacher)', notTaken:'Not taken',
    incl:' (includes Writing)', inReading:'Included in Reading & Use of English (A2 Key)',
    finalLbl:'Final result', targetGrade:'Target level for the grade', scaleLbl:'Cambridge Scale',
    below:'▼ Below the target ('+tgt+')', meets:'✓ Meets the target ('+tgt+')', above:'▲ Above the target ('+tgt+')',
    gnote:'The final result is the average of the scales of the assessed skills (Reading & Use of English, Listening and Writing). Speaking is assessed in an oral session.',
    prov:'Provisional result', commentTitle:'A message for the family',
    sign:'— English Department · Nordic International School of Lima',
    foot:'Cambridge Scale — pass (~60%) lands at the level boundary; below that drops a band.' } : {
    sub:'Nordic International School of Lima · Cambridge English · Reporte de resultados',
    sectionW:'Sección', objective:'Objetivo del grado', cefr:'Marco Común Europeo', scaleName:'Cambridge English Scale',
    s1:'1) Resumen por destreza (mejor resultado)', s2:'2) Detalle de Reading & Use of English (por parte)', s3:'3) Resultado global según el Marco Común Europeo (CEFR)',
    hSkill:'Destreza', hLevel:'Nivel', hScore:'Puntaje', hPct:'%', hScale:'Esc.', hProg:'Progreso', hStatus:'Estado',
    reading:'Reading & Use of English', listening:'Listening', writing:'Writing', speaking:'Speaking',
    part:'Parte', oral:'Sesión oral', notHere:'No en este ciclo', pending:'Pendiente', notTaken:'No rindió',
    incl:' (incluye Writing)', inReading:'Incluido en Reading & Use of English (examen A2 Key)',
    finalLbl:'Resultado final', targetGrade:'Nivel objetivo del grado', scaleLbl:'Escala Cambridge',
    below:'▼ Por debajo del objetivo ('+tgt+')', meets:'✓ Cumple el objetivo ('+tgt+')', above:'▲ Por encima del objetivo ('+tgt+')',
    gnote:'El resultado final es el promedio de las escalas de las destrezas evaluadas (Reading & Use of English, Listening y Writing). Speaking se evalúa en sesión oral.',
    prov:'Resultado provisional', commentTitle:'Comentario para la familia',
    sign:'— English Department · Nordic International School of Lima',
    foot:'Escala Cambridge — aprobar (~60%) cae en el límite del nivel; por debajo baja de banda.' };
  const tier=(pc)=>{ if(pc==null)return['',''];
    if(pc>=80)return[EN?'High pass':'Aprobado alto','#16a34a'];
    if(pc>=60)return[EN?'Pass':'Aprobado','#16a34a'];
    if(pc>=40)return[EN?'Approaching':'Acercándose','#f59e0b'];
    return[EN?'Developing':'En desarrollo','#dc2626']; };
  const bar=(pc)=>{ if(pc==null)return '<div style="height:9px;background:#eef2f7;border-radius:99px"></div>';
    const c=pc>=60?'#16a34a':pc>=40?'#f59e0b':'#dc2626';
    return '<div style="height:9px;background:#e2e8f0;border-radius:99px;overflow:hidden"><div style="height:100%;width:'+Math.max(3,pc)+'%;background:'+c+'"></div></div>'; };
  const ba={};
  ['Reading','Listening','Writing'].forEach(sk=>{
    const rows=(at||[]).filter(a=>a.skill===sk&&a.percent!=null).map(a=>({a,pct:Number(a.percent),scale:skillScale(a.level,Number(a.percent))})).filter(x=>x.scale!=null);
    if(rows.length){ const ps=rows.filter(x=>x.pct>=50); ba[sk]=(ps.length?ps.reduce((b,x)=>x.scale>b.scale?x:b):rows.reduce((b,x)=>x.pct>b.pct?x:b)).a; }
  });
  const wAttAny=(at||[]).some(a=>a.skill==='Writing');
  const cs='padding:6px 8px;border:1px solid #e2e8f0;text-align:center;font-size:12px';
  const th='padding:7px 8px;border:1px solid #e2e8f0;font-size:12px;color:#fff';
  const skHead='<tr style="background:#4987c6"><th style="'+th+';text-align:left">'+T.hSkill+'</th><th style="'+th+'">'+T.hLevel+'</th><th style="'+th+'">CEFR</th><th style="'+th+'">'+T.hScore+'</th><th style="'+th+'">'+T.hPct+'</th><th style="'+th+'">'+T.hScale+'</th><th style="'+th+';width:120px">'+T.hProg+'</th><th style="'+th+'">'+T.hStatus+'</th></tr>';
  const skRow=(label,b,att,opt)=>{
    if(!b){ const m=(opt&&opt.pending)?T.pending:(opt&&opt.oral)?T.oral:T.notTaken;
      const est=(opt&&opt.oral)?T.notHere:(opt&&opt.pending)?T.pending:'-';
      return '<tr><td style="'+cs+';text-align:left">'+label+'</td><td style="'+cs+'">-</td><td style="'+cs+'">-</td><td style="'+cs+';color:#6b7280">'+m+'</td><td style="'+cs+'">-</td><td style="'+cs+'">-</td><td style="'+cs+'">'+bar(null)+'</td><td style="'+cs+';color:#6b7280">'+est+'</td></tr>'; }
    const t=tier(b.pct), sc=att?(att.score+'/'+att.total):'—';
    return '<tr><td style="'+cs+';text-align:left">'+label+'</td><td style="'+cs+'">'+b.level+'</td><td style="'+cs+';color:#2d5a8d;font-weight:800">'+esc(b.cefr)+'</td><td style="'+cs+'">'+sc+'</td><td style="'+cs+'"><b>'+b.pct+'%</b></td><td style="'+cs+'"><b>'+b.scale+'</b></td><td style="'+cs+'">'+bar(b.pct)+'</td><td style="'+cs+';color:'+t[1]+';font-weight:700">'+t[0]+'</td></tr>';
  };
  const rRow=skRow(T.reading+(fin.a2NoWriting?T.incl:''), fin.skills.Reading, ba['Reading']);
  const lRow=skRow(T.listening, fin.skills.Listening, ba['Listening']);
  const wRow=fin.a2NoWriting
    ? '<tr><td style="'+cs+';text-align:left">'+T.writing+'</td><td colspan="7" style="'+cs+';text-align:left;color:#6b7280">'+T.inReading+'</td></tr>'
    : skRow(T.writing, fin.skills.Writing, ba['Writing'], {pending: wAttAny && !fin.skills.Writing});
  const spRow=skRow(T.speaking, fin.skills.Speaking, null, {oral:true});
  const rParts = ba['Reading'] ? partsOf(ba['Reading'].breakdown) : [];
  let partsTbl='';
  if(rParts.length){
    partsTbl='<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:10px 0 4px">'+T.s2+'</div>'+
      '<table style="width:100%;border-collapse:collapse;margin-bottom:6px"><tr style="background:#76cbe5"><th style="'+cs+';text-align:left;color:#0f172a">'+T.part+'</th><th style="'+cs+'">%</th><th style="'+cs+';width:170px">'+T.hProg+'</th></tr>'+
      rParts.map((pt,i)=>'<tr><td style="'+cs+';text-align:left">'+T.part+' '+(i+1)+'</td><td style="'+cs+'"><b>'+pt.pct+'%</b></td><td style="'+cs+'">'+bar(pt.pct)+'</td></tr>').join('')+'</table>';
  }
  const stColor = stt==='below'?'#f59e0b':'#16a34a';
  const stBadge = stt==='below'?T.below:stt==='above'?T.above:stt==='meets'?T.meets:'';
  const globalBox='<div style="background:#f7faff;border:1.5px solid '+stColor+';border-radius:12px;padding:12px 16px;margin:2px 0 12px">'+
    '<div style="font-size:13px"><b>'+T.targetGrade+':</b> '+tgt+' &nbsp;•&nbsp; <b>'+T.finalLbl+':</b> <span style="color:#2f5f93;font-weight:800">'+esc(fin.finalCefr)+'</span> &nbsp;•&nbsp; <b>'+T.scaleLbl+':</b> '+(fin.finalScale!=null?fin.finalScale:'—')+' &nbsp;•&nbsp; <span style="color:'+stColor+';font-weight:800">'+stBadge+'</span></div>'+
    '<div style="font-size:11px;color:#6b7280;margin-top:5px">'+T.gnote+(fin.complete?'':' '+T.prov+'.')+'</div></div>';
  const SKL={Reading:T.reading,Listening:T.listening,Writing:T.writing,Speaking:T.speaking};
  const pres=Object.keys(fin.skills).filter(k=>fin.skills[k]);
  let strong='',weak='';
  if(pres.length){ strong=SKL[pres.reduce((b,k)=>fin.skills[k].scale>fin.skills[b].scale?k:b)]; weak=SKL[pres.reduce((b,k)=>fin.skills[k].scale<fin.skills[b].scale?k:b)]; }
  const first=(p.full_name||'').split(' ')[0]||'';
  const rank=CEFR_RANK[fin.finalCefr]||0, tg=CEFR_RANK[tgt]||3, fs=fin.finalScale||0;
  let msg; const noData=!pres.length;
  if(EN){
    if(noData) msg=first+', this first mock is a starting point. Let\'s keep practising together so you arrive well prepared and improve your results in the second mock in October. We are with you!';
    else if(rank>tg) msg=first+', you did good work in this first practice mock, especially in '+strong+'. Keep in mind this is practice, not the real exam yet: the next step is to keep training, particularly '+weak+', so you reach the second mock in October with even stronger results. Let\'s keep practising!';
    else if(rank>=tg) msg=first+', you are doing well in this first practice mock and you stand out in '+strong+'. There is still room to grow, so let\'s keep practising '+weak+' steadily to improve your result in the second mock in October. Keep it up!';
    else if(fs>=130) msg=first+', you are on the right track in this first practice mock, with good moments in '+strong+'. If you keep practising, especially '+weak+', you will arrive much better prepared for the second mock in October. We are here to support you!';
    else msg=first+', this first practice mock is a starting point and you already show progress in '+strong+'. Let\'s keep practising together, especially '+weak+', so you see clear progress in the second mock in October. Keep up the effort — we are with you!';
  } else {
    if(noData) msg=first+', este primer simulacro es un punto de partida. Sigamos practicando juntos para que llegues bien preparado y mejores tus resultados en el segundo simulacro de octubre. ¡Te acompañamos!';
    else if(rank>tg) msg=first+', hiciste un buen trabajo en este primer simulacro de práctica, sobre todo en '+strong+'. Ten presente que es una práctica, todavía no el examen real: el siguiente paso es seguir entrenando, especialmente '+weak+', para llegar al segundo simulacro de octubre con resultados aún mejores. ¡Sigamos practicando!';
    else if(rank>=tg) msg=first+', vas bien en este primer simulacro de práctica y destacas en '+strong+'. Aún hay margen para crecer, así que sigamos practicando '+weak+' con constancia para mejorar tu resultado en el segundo simulacro de octubre. ¡Continúa con ese esfuerzo!';
    else if(fs>=130) msg=first+', vas por buen camino en este primer simulacro de práctica, con buenos momentos en '+strong+'. Si sigues practicando, sobre todo '+weak+', llegarás mucho mejor preparado al segundo simulacro de octubre. ¡Cuentas con nosotros!';
    else msg=first+', este primer simulacro de práctica es un punto de partida y ya muestras avances en '+strong+'. Vamos a seguir practicando juntos, especialmente '+weak+', para que en el segundo simulacro de octubre veas un progreso claro. ¡Sigue esforzándote, te acompañamos!';
  }
  const commentBox='<div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin-top:4px">'+
    '<div style="font-size:12px;font-weight:800;color:#166534;margin-bottom:5px">'+T.commentTitle+'</div>'+
    '<div style="font-size:13px;color:#0f172a;line-height:1.5">'+msg+'</div>'+
    '<div style="font-size:12px;font-weight:800;color:#0f172a;margin-top:8px">'+T.sign+'</div></div>';

  // Detalle de la evaluación de Writing y Speaking (solo en la vista detallada en pantalla)
  let detail='';
  if(opts.detail){
    const dt = EN
      ? { wTitle:'Writing — assessment detail', spTitle:'Speaking — assessment detail', crit:'Criterion', band:'Band', fb:"Teacher's feedback" }
      : { wTitle:'Writing — detalle de la evaluación', spTitle:'Speaking — detalle de la evaluación', crit:'Criterio', band:'Banda', fb:'Comentario del profesor' };
    const critTbl=(parts)=>'<table style="width:100%;border-collapse:collapse;margin-bottom:4px"><tr style="background:#4987c6"><th style="'+th+';text-align:left">'+dt.crit+'</th><th style="'+th+'">'+dt.band+'</th></tr>'+
      parts.map(pt=>'<tr><td style="'+cs+';text-align:left">'+esc(pt.part)+'</td><td style="'+cs+'"><b>'+pt.correct+'</b> / '+pt.total+'</td></tr>').join('')+'</table>';
    const fbBox=(txt)=>'<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:8px 12px;font-size:12px;margin-bottom:8px"><b>'+dt.fb+':</b> '+esc(txt)+'</div>';
    const wb = ba['Writing'] && ba['Writing'].breakdown;
    if(wb && wb.kind==='writing-graded' && Array.isArray(wb.parts) && wb.parts.length){
      detail += '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:12px 0 4px">'+dt.wTitle+'</div>'+critTbl(wb.parts);
      if(wb.teacherMessage) detail += fbBox(wb.teacherMessage);
    }
    if(sp && sp.breakdown && Array.isArray(sp.breakdown.parts) && sp.breakdown.parts.length){
      detail += '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:12px 0 4px">'+dt.spTitle+'</div>'+critTbl(sp.breakdown.parts);
      if(sp.comment) detail += fbBox(sp.comment);
    }
  }

  return ''+
    '<img src="assets/logo-h.svg" width="150" height="28" style="width:150px;height:28px;display:block">'+
    '<div style="font-size:11px;color:#6b7280;margin:3px 0 10px">'+T.sub+'</div>'+
    '<div style="background:#2f5f93;color:#fff;border-radius:10px;padding:10px 14px;margin-bottom:12px">'+
      '<div style="font-size:20px;font-weight:800">'+esc(p.full_name||'')+'</div>'+
      '<div style="font-size:12px">'+esc(p.grades&&p.grades.name||'')+(p.section?' · '+T.sectionW+' '+esc(p.section):'')+' &nbsp;•&nbsp; '+T.objective+': <b>'+tgt+'</b> ('+T.cefr+') &nbsp;•&nbsp; '+T.scaleName+'</div>'+
    '</div>'+
    '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:6px 0 4px">'+T.s1+'</div>'+
    '<table style="width:100%;border-collapse:collapse;margin-bottom:4px">'+skHead+rRow+lRow+wRow+spRow+'</table>'+
    partsTbl+
    detail+
    '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:8px 0 4px">'+T.s3+'</div>'+
    globalBox+ commentBox+
    '<div style="font-size:9px;color:#94a3b8;margin-top:10px">'+T.foot+' · build 74</div>';
}

/* Inyecta una sola vez el CSS que, al imprimir, oculta todo menos el reporte (#print-report). */
function _ensurePrintCss(){
  if(document.getElementById('nis-print-css')) return;
  const st=document.createElement('style'); st.id='nis-print-css';
  // Al imprimir (Ctrl+P): el reporte debe ocupar el ancho completo de la hoja
  // (sin el max-width:820px que lo desbordaba) y DEBE imprimir los colores de
  // fondo (barras de PROGRESO y badges) -> print-color-adjust:exact.
  st.textContent='@media print{'+
    'html,body{margin:0!important;padding:0!important;background:#fff!important}'+
    'body *{visibility:hidden!important}'+
    '#print-report,#print-report *{visibility:visible!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}'+
    '#print-report{position:absolute!important;left:0!important;top:0!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}'+
    '.no-print{display:none!important}'+
    '@page{size:A4;margin:12mm}'+
  '}';
  document.head.appendChild(st);
}

/* Vista detallada en pantalla (profesor/admin al hacer clic en el nombre del alumno):
   notas por destreza + detalle del Writing/Speaking evaluado + impresión + descarga PDF. */
window.studentDetailReport = async (studentId, lang)=>{
  lang=(lang==='en')?'en':'es'; const EN=lang==='en';
  _setNav('final');
  if($('#main')) $('#main').innerHTML='<div class="center muted">Cargando…</div>';
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',studentId).single();
  if(error){ $('#main').innerHTML='<div class="note err">'+esc(error.message)+'</div>'; return; }
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,score,total,mock,submitted_at,breakdown').eq('student_id',studentId);
  let sp=null; try{ const r=await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle(); sp=r&&r.data; }catch(e){}
  const fin=_finalFromData(p, at||[], sp);
  _ensurePrintCss();
  const inner=_reportInner(p, at||[], sp, fin, EN, {detail:true});
  $('#main').innerHTML=
    '<div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">'+
      '<button class="btn sm ghost" onclick="cefrFinalPanel()">← Volver al resultado final</button>'+
      '<span style="width:1px;height:22px;background:var(--line)"></span>'+
      '<button class="btn sm '+(EN?'ghost':'')+'" onclick="studentDetailReport(\''+studentId+'\',\'es\')">🇪🇸 Español</button>'+
      '<button class="btn sm '+(EN?'':'ghost')+'" onclick="studentDetailReport(\''+studentId+'\',\'en\')">🇬🇧 English</button>'+
      '<span style="flex:1"></span>'+
      (fin.complete?'':'<span class="badge off" style="font-size:.7rem" title="Faltan: '+esc(fin.missing.join(', '))+'">Provisional</span> ')+
      '<button class="btn sm" onclick="window.print()">🖨️ Imprimir</button>'+
      '<button class="btn sm ghost" onclick="studentReportPDF(\''+studentId+'\',\''+lang+'\')">📄 Descargar PDF</button>'+
    '</div>'+
    '<div id="print-report" style="max-width:820px;margin:0 auto;padding:24px;border:1px solid var(--line);border-radius:12px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.08)">'+inner+'</div>';
  window.scrollTo(0,0);
};

window.studentReportPDF = async (studentId, lang)=>{
  lang = (lang==='en') ? 'en' : 'es';
  try{ await ensurePdfLibs(); }catch(e){ alert(e.message); return; }
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',studentId).single();
  if(error){ alert('No se pudo cargar el alumno: '+error.message); return; }
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,score,total,mock,submitted_at,breakdown').eq('student_id',studentId);
  const { data:sp } = await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle();
  const fin=_finalFromData(p, at||[], sp);
  const EN = lang==='en';
  const fname=(p.full_name||'alumno').replace(/\s+/g,'_')+'-'+(EN?'EN':'ES')+'.pdf';
  // Nodo del reporte (ancho fijo 760px) en el origen del documento.
  const node=document.createElement('div');
  node.style.cssText='width:760px;padding:22px;font-family:Montserrat,system-ui,sans-serif;color:#0f172a;background:#fff';
  node.innerHTML=_reportInner(p, at||[], sp, fin, EN, {});
  const host=document.createElement('div');
  host.style.cssText='position:absolute;left:0;top:0;width:760px;background:#fff;z-index:-1';
  host.appendChild(node); document.body.appendChild(host);
  try{
    // El logo es un SVG SIN width/height (solo viewBox 569x107): html2canvas lo
    // renderiza a su tamaño intrínseco (~569px) y salía gigante. Lo rasterizamos a
    // un PNG del tamaño exacto antes de capturar.
    try{
      const logo=node.querySelector('img[src*="logo"]');
      if(logo){
        const r=await fetch('assets/logo-h.svg'); let svg=await r.text();
        svg=svg.replace(/<svg /i,'<svg width="300" height="57" ');
        const im=new Image();
        await new Promise((res,rej)=>{ im.onload=res; im.onerror=rej; setTimeout(rej,1500); im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg); });
        const c=document.createElement('canvas'); c.width=300; c.height=57;
        c.getContext('2d').drawImage(im,0,0,300,57);
        logo.src=c.toDataURL('image/png');
      }
    }catch(_){}
    await Promise.all(Array.from(node.querySelectorAll('img')).map(im=>im.complete?Promise.resolve():new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,1500);})));
    try{ if(document.fonts&&document.fonts.ready) await Promise.race([document.fonts.ready, new Promise(r=>setTimeout(r,1200))]); }catch(_){}
    // CLAVE: capturar el nodo DIRECTAMENTE con html2canvas (no via html2pdf, que
    // envolvía el nodo en un contenedor del ancho de la ventana → el reporte salía
    // encogido a la izquierda y cortado en ventanas reales). Así el lienzo siempre
    // es del ancho del nodo (760), sin importar el ancho ni el scroll de la página.
    const canvas=await window.html2canvas(node,{scale:2,useCORS:true,backgroundColor:'#ffffff',scrollX:0,scrollY:0,windowWidth:Math.max(760,document.documentElement.scrollWidth),windowHeight:document.documentElement.scrollHeight});
    const { jsPDF }=window.jspdf;
    const pdf=new jsPDF({unit:'mm',format:'a4',orientation:'portrait'});
    const margin=8, pw=210, ph=297, iw=pw-2*margin, pageContentH=ph-2*margin;
    const pxPerMM=canvas.width/iw;                       // px de lienzo por mm
    const fullImgH=canvas.height/pxPerMM;                // alto total en mm
    if(fullImgH<=pageContentH+0.5){
      pdf.addImage(canvas.toDataURL('image/jpeg',0.95),'JPEG',margin,margin,iw,fullImgH);
    } else {
      const pageHpx=Math.floor(pageContentH*pxPerMM);    // px de lienzo por hoja
      let y=0, first=true;
      while(y<canvas.height){
        const sliceH=Math.min(pageHpx, canvas.height-y);
        const sc=document.createElement('canvas'); sc.width=canvas.width; sc.height=sliceH;
        sc.getContext('2d').drawImage(canvas,0,y,canvas.width,sliceH,0,0,canvas.width,sliceH);
        if(!first) pdf.addPage();
        pdf.addImage(sc.toDataURL('image/jpeg',0.95),'JPEG',margin,margin,iw,sliceH/pxPerMM);
        y+=sliceH; first=false;
      }
    }
    pdf.save(fname);
  }catch(e){ alert('No se pudo generar el PDF: '+(e&&e.message||e)); }
  finally{ host.remove(); }
};

/* ---------------------------------------------------------------
   🎯 Productos de unidad — lo que el alumno entrega en el hub de la
   unidad (unit-g9-u5.html). Sustituye al "promedio de mock" como
   primera lectura del profesor: manda el avance POR CRITERIO de la
   rúbrica de Toddle, y la nota queda debajo.
---------------------------------------------------------------- */
const UNIT_CRIT = { '1':'Speaking & listening', '2':'Reading', '3':'Writing' };
/* De mayor a menor, igual que en el hub del alumno (unit.html): primero
   adonde se quiere llegar. */
const UNIT_LVL  = ['AD','A','B','C'];

async function unitProductsPanel(){
  const main = $('#main');
  main.innerHTML = '<div class="card"><p class="muted">Cargando entregas…</p></div>';

  const { data, error } = await sb
    .from('unit_submissions')
    .select('id,student_id,grade,unit,milestone,kind,payload,file_path,score,criteria,feedback,reviewed_at,created_at,shared')
    .order('created_at', { ascending:false })
    .limit(500);

  if (error){
    main.innerHTML = `<div class="card"><p class="err">No pude leer las entregas: ${esc(error.message)}</p></div>`;
    return;
  }
  if (!data || !data.length){
    main.innerHTML = `<div class="card"><h2>🎯 Productos de unidad</h2>
      <p class="muted">Todavía no hay entregas. Aparecerán aquí en cuanto los alumnos
      escriban o suban su producto en el hub de la unidad.</p></div>`;
    return;
  }

  const ids = [...new Set(data.map(r=>r.student_id))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section').in('id', ids);
  const quien = Object.fromEntries((gente||[]).map(p=>[p.id,p]));

  // Una fila por alumno: junta su informe, su presentación y su autoevaluación.
  /* Las entregas de ficha llevan milestone 'w1s1'; el producto final, 'final'.
     Van en dos tablas distintas porque se corrigen distinto. */
  const fichas = data.filter(r=>r.kind==='worksheet');
  /* El hito entra en la clave. El producto de la unidad y el Writing de un
     examen de unidad son los dos kind='report' del mismo alumno y la misma
     unidad: sin el hito, el examen tapaba el producto final en esta tabla (en
     la base convivían, porque ahí la clave sí lleva el hito). Como todo lo del
     producto comparte hito 'final', sus cuatro piezas siguen juntas en una
     fila, y cada examen se lleva la suya. */
  const porAlumno = {};
  data.filter(r=>r.kind!=='worksheet').forEach(r=>{
    const k = r.student_id+'|'+r.grade+'|'+r.unit+'|'+r.milestone;
    (porAlumno[k] = porAlumno[k] || {alumno:r.student_id, grade:r.grade, unit:r.unit,
                                     milestone:r.milestone})[r.kind] = r;
  });
  const filas = Object.values(porAlumno);

  // Avance por criterio: cuántos alumnos hay en cada nivel. Es lo que el
  // profesor mira primero y lo que se lleva a coordinación.
  const conteo = {'1':{},'2':{},'3':{}};
  filas.forEach(f=>{
    const c = (f.report && f.report.criteria) || (f.presentation && f.presentation.criteria) || null;
    if(!c) return;
    Object.keys(UNIT_CRIT).forEach(k=>{ if(c[k]) conteo[k][c[k]] = (conteo[k][c[k]]||0)+1; });
  });
  const COLOR = {AD:'#dcfce7', A:'#e0f2fe', B:'#fef9c3', C:'#fee2e2'};
  const barra = k => UNIT_LVL.map(l=>
    `<span class="badge" style="background:${COLOR[l]};margin-right:4px">${l}: ${conteo[k][l]||0}</span>`).join('');

  const sel = (id, crit, valor) => `<select onchange="unitCriterio('${id}','${crit}',this.value)" style="font-size:.8rem">
      <option value=""${valor?'':' selected'}>—</option>
      ${UNIT_LVL.map(l=>`<option value="${l}"${valor===l?' selected':''}>${l}</option>`).join('')}
    </select>`;

  /* De qué es esta fila. El producto de la unidad no lleva etiqueta (es lo
     normal); el Writing de un examen sí, con su versión y su nivel, porque se
     corrige con la misma rúbrica pero no es el producto. */
  const _unitHito = f => {
    const m = /^exam-(practice|official)-(a2|b1|b2|c1)$/.exec(f.milestone||'');
    if(!m) return '';
    return ` <span class="badge" style="background:#fef3c7;color:#78350f">${m[1]==='official'?'🎓 examen oficial':'📝 examen de práctica'} · ${m[2].toUpperCase()}</span>`;
  };
  const fila = f => {
    const p = quien[f.alumno]||{};
    const rep = f.report, pres = f.presentation, self = f.selfassess, nb = f.notebook;
    const base = rep || pres;                       // dónde se guarda la calificación
    const crit = (base && base.criteria) || {};
    const selfL = (self && self.payload && self.payload.levels) || {};
    const pal = rep && rep.payload ? (rep.payload.words||0) : 0;
    const entregado = !!(rep && rep.payload && rep.payload.draft===false);
    return `<tr>
      <td class="col-name">${esc(p.full_name||'(alumno)')} <span class="muted">${p.grade_id?p.grade_id+'º'+(p.section||''):''}</span></td>
      <td class="muted">${esc(f.grade)} · U${f.unit}${_unitHito(f)}</td>
      <td>${rep ? `<button class="btn small" onclick="unitVerTexto('${rep.id}')">📄 ${pal} pal.</button>
              <span class="badge" style="background:${entregado?'#dcfce7':'#fef9c3'}">${entregado?'entregado':'borrador'}</span>`
            : '<span class="muted">—</span>'}</td>
      <td>${pres && pres.file_path ? `<button class="btn small" onclick="unitVerArchivo('${esc(pres.file_path)}',this)">▶ Ver</button>` : '<span class="muted">—</span>'}</td>
      <td>${nb && nb.file_path ? `<button class="btn small" onclick="unitVerArchivo('${esc(nb.file_path)}',this)">📓 Ver</button>` : '<span class="muted">—</span>'}</td>
      ${Object.keys(UNIT_CRIT).map(k=>`<td style="white-space:nowrap">${base?sel(base.id,k,crit[k]):'—'}
          ${selfL[k]?`<span class="muted" style="font-size:.72rem" title="lo que se puso el alumno">↖${selfL[k]}</span>`:''}</td>`).join('')}
      <td><input type="number" min="0" max="10" value="${base&&base.score!=null?base.score:''}" style="width:4rem"
            ${base?`onchange="unitCalificar('${base.id}',this.value,null)"`:'disabled'}></td>
      <td class="col-flex"><input type="text" placeholder="comentario" value="${esc((base&&base.feedback)||'')}"
            ${base?`onchange="unitCalificar('${base.id}',null,this.value)"`:'disabled'}></td>
      <td style="text-align:center">${base?`<input type="checkbox" ${base.shared?'checked':''}
            onchange="unitExhibe('${base.id}',this.checked)" title="Mostrar en la galería de la unidad">`:''}</td>
    </tr>`;
  };

  window._unitTextos = Object.fromEntries(data.filter(r=>r.kind==='report').map(r=>[r.id,(r.payload&&r.payload.text)||'']));
  window._unitFichas = Object.fromEntries(fichas.map(r=>[r.id,r]));

  main.innerHTML = `<div class="card">
    <h2>🎯 Productos de unidad</h2>
    <p class="muted">Lo que los alumnos producen, no lo que aciertan. Primero el avance
      por criterio de la rúbrica; la nota es lo de abajo.</p>
    <div style="display:grid;gap:8px;margin:14px 0 10px">
      ${Object.keys(UNIT_CRIT).map(k=>`<div><b style="font-size:.85rem">${k}. ${UNIT_CRIT[k]}</b><br>${barra(k)}</div>`).join('')}
    </div>
    <p class="muted" style="font-size:.8rem;margin:0 0 18px">
      <b>AD</b> logro destacado · <b>A</b> logro esperado · <b>B</b> en proceso · <b>C</b> en inicio.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th><th>Unidad</th><th>Informe</th><th>Presentación</th><th>Cuaderno</th>
        <th>C1</th><th>C2</th><th>C3</th><th>Nota</th><th>Comentario</th><th>Exhibir</th></tr></thead>
      <tbody>${filas.map(fila).join('')}</tbody></table></div>
    <p class="muted" style="font-size:.8rem;margin-top:12px">↖ = el nivel que el propio alumno se puso.</p>
  </div>
  <div class="card" id="unitTexto" style="display:none"></div>${fichasTabla(fichas, quien)}`;
}

window.unitVerTexto = function(id){
  const caja = $('#unitTexto');
  caja.style.display='block';
  caja.innerHTML = `<h3>📄 Informe del alumno</h3>
    <div style="white-space:pre-wrap;font-size:.9rem;line-height:1.6">${esc(window._unitTextos[id]||'(vacío)')}</div>`;
  caja.scrollIntoView({behavior:'smooth',block:'start'});
};

/* El bucket es privado: se pide un enlace temporal, como en Fun for Nordic. */
window.unitVerArchivo = async function(ruta, boton){
  if(!ruta) return;
  const { data, error } = await sb.storage.from('unit-products').createSignedUrl(ruta, 3600);
  if(error || !data){ boton.textContent='No disponible'; return; }
  const ext = (ruta.split('.').pop()||'').toLowerCase();
  if(['webm','ogg','mp3','m4a','wav'].indexOf(ext)>=0){
    const a=document.createElement('audio'); a.controls=true; a.src=data.signedUrl; a.style.maxWidth='15rem';
    boton.replaceWith(a); a.play().catch(()=>{});
  } else {
    window.open(data.signedUrl,'_blank','noopener');
  }
};

window.unitCalificar = async function(id, nota, comentario){
  const cambio = { reviewed_at:new Date().toISOString(), reviewed_by:(state.profile&&state.profile.id)||null };
  if(nota !== null && nota !== '') cambio.score = Number(nota);
  if(comentario !== null) cambio.feedback = comentario;
  await sb.from('unit_submissions').update(cambio).eq('id', id);
};

window.unitCriterio = async function(id, crit, valor){
  const { data } = await sb.from('unit_submissions').select('criteria').eq('id',id).single();
  const c = (data && data.criteria) || {};
  if(valor) c[crit] = valor; else delete c[crit];
  await sb.from('unit_submissions').update({ criteria:c, reviewed_at:new Date().toISOString(),
    reviewed_by:(state.profile&&state.profile.id)||null }).eq('id', id);
};

/* ---------------------------------------------------------------
   🎯 Unidades del grado — la tarjeta madre que abre el hub de cada
   unidad (unit.html). Los datos salen de unit-plans.js, que es copia
   del planner de Toddle: si una unidad no está ahí, no se ofrece.
---------------------------------------------------------------- */
/* La clave del nodo de Units: 9.º conserva la suya (english.classes.g9.unit5),
   que ya esta dada a los profesores; los grados nuevos usan .units. */
function unitsNode(grade){
  return 'english.classes.'+grade+(grade==='g9' ? '.unit5' : '.units');
}
/* ---------- Arcos de proyecto (project-arcs.js) ----------
   Un arco es el proyecto interdisciplinario del trimestre: once o doce
   semanas sobre dos periodos seguidos del calendario. El colegio ya llama
   "Project" a cada periodo; el arco declara que dos de ellos son uno solo.
   La pagina es project.html y el contenido por area lo lee del volcado del
   Annual Plan, no de aqui. */
function arcsFor(grade){
  const A = window.PROJECT_ARCS || {};
  return Object.keys(A).filter(k=>A[k].grade===grade)
    .sort((x,y)=>A[x].periodos[0]-A[y].periodos[0]).map(k=>[k,A[k]]);
}
/* El arco que esta corriendo hoy. Si estamos entre trimestres no hay ninguno
   y se devuelve null: mejor el indice del grado que abrir uno que ya cerro. */
function arcoActual(grade){
  const hoy = new Date().toISOString().slice(0,10);
  const par = arcsFor(grade).filter(([,a])=>a.inicio<=hoy && hoy<=a.fin);
  return par.length ? par[0][0] : null;
}
function _miGradoKey(){ const p=state.profile||{}; return p.grade_id ? 'g'+p.grade_id : null; }
/* La tarjeta solo aparece si hay algo detras: alumno de un grado con arco, o
   profesor y admin, que ven el indice completo. */
function _verProyectos(){
  if(!_isStudent()) return Object.keys(window.PROJECT_ARCS||{}).length>0;
  const k=_miGradoKey(); return !!(k && arcsFor(k).length);
}
function irAMisProyectos(){
  const key=_miGradoKey();
  if(_isStudent() && key){
    const hoy = arcoActual(key);
    location.href = _withBack(hoy ? 'project.html?arc='+hoy : 'project.html?grade='+key, 'projects');
    return;
  }
  location.href = _withBack(key && arcsFor(key).length ? 'project.html?grade='+key : 'project.html', 'projects');
}

function unitPlansFor(grade){
  const p = (window.UNIT_PLANS||{})[grade];
  return (p && p.units) ? p.units : [];
}
function _unitPlanCard(u,route,grade,open){
  const href=_withBack('unit.html?grade='+grade+'&unit='+u.n,route);
  const image=u.cover&&u.cover.image;
  const gradeLabel=(GRADE_META[grade]&&GRADE_META[grade][1])||grade;
  const visual=image
    ? `<div style="position:relative">
         <img src="${esc(image)}" alt="${esc(gradeLabel+' · Unit '+u.n+' · '+u.title)}" loading="lazy" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block">
         <span class="badge" style="position:absolute;left:12px;bottom:12px;background:rgba(12,24,45,.82);color:#fff;border:1px solid rgba(255,255,255,.45);backdrop-filter:blur(5px)">${esc(gradeLabel)} · Unit ${esc(String(u.label||u.n))}</span>
       </div>`
    : `<div style="font-size:3.4rem;line-height:1;padding:30px 18px 8px">${(u.cover&&u.cover.icon)||'📘'}</div>`;
  const body=`${visual}<div style="padding:18px">
        <h2 style="margin:0 0 6px;color:var(--blue-d)">Unit ${esc(String(u.label||u.n))} · ${esc(u.title)}</h2>${u.pilot?`<div class="badge" style="background:#ede9fe;color:#5b21b6;margin-bottom:6px">🧪 Piloto 2027 · no visible para alumnos</div>`:''}
        <div class="muted" style="font-size:.85rem">${esc(u.deliverables.map(d=>d.title).join(' · '))} — ${u.weeks} weeks.</div>
        ${open?'':'<div class="badge" style="background:#fee2e2;color:#991b1b;margin-top:10px">🔒 Your teacher will unlock this unit</div>'}
      </div>`;
  if(!open) return `<div class="card" style="display:block;padding:0;margin-bottom:0;overflow:hidden;opacity:.72">${body}</div>`;
  return `<a class="card" href="${href}" style="text-decoration:none;color:inherit;display:block;padding:0;margin-bottom:0;overflow:hidden;transition:.15s"
      onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''">
      ${body}
    </a>`;
}
function studentGradeUnits(key){
  _setNav('classes');
  const route = 'classes_'+key+'_units';
  const back  = _backBtn("window._nav('classes_"+key+"')", GRADE_META[key][1]);
  const base  = 'english.classes.'+key;
  if(!nodeVisible(base) || !nodeVisible(unitsNode(key))){ _lockedView(back,'🎯 Units'); return; }
  const plan  = (window.UNIT_PLANS||{})[key];
  /* Candado fino por unidad: el alumno solo ve las que su grado tiene
     abiertas. Las del piloto 2027 nacen cerradas, así que profesor y admin
     las conducen sin que aparezcan en el portal del alumno. */
  /* Las unidades del piloto no se le enseñan al alumno ni con candado: si no
     están abiertas para él, no existen en su portal. Las demás unidades
     cerradas sí se pintan bloqueadas, que es lo normal para una unidad del
     año que el profesor todavía no ha abierto. */
  const units = unitPlansFor(key).filter(u=>{
    const k=_academicUnitNode(key,u.n);
    return !UNIT_PILOT.has(k) || nodeVisible(k);
  });
  if(!units.length){ _lockedView(back,'🎯 Units'); return; }
  $('#main').innerHTML = `${back}<h1>🎯 Units</h1>
    <p class="muted" style="margin-top:-6px">${esc(plan.label)}${plan.cefr?' · '+esc(plan.cefr):''} — each unit ends in something you make, not in a test.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${units.map(u=>_unitPlanCard(u,route,key,nodeVisible(_academicUnitNode(key,u.n)))).join('')}
    </div>`;
}

/* ---------------------------------------------------------------
   📄 Materiales de clase — el profesor sube sus propias fichas y
   diapositivas desde el portal, sin claves ni scripts.

   La ruta se deduce del NOMBRE del archivo, que ya lo dice todo:
     u4w1s1-worksheet-a2.pdf   → g9/u4/w1/u4w1s1-worksheet-a2.pdf
     u4w1s1-worksheet-a2.docx  → la versión editable del alumno
     u4w1s1-slides.pptx        → la presentación del profesor
   Así se pueden arrastrar los 96 archivos de una unidad de una vez.
---------------------------------------------------------------- */
const MAT_RE = /^u(\d+)w(\d+)s(\d+)-(worksheet-(a2|b1|b2|c1)|slides)\.(pdf|docx|pptx)$/i;

function materialesPanel(){
  const grados = ALL_GRADE_ORDER.map(g=>`<option value="${g}">${GRADE_META[g][1]}</option>`).join('');
  $('#main').innerHTML = `<div class="card">
    <h2>📄 Materiales de clase</h2>
    <p class="muted">Sube aquí las fichas del alumno y las diapositivas. <b>El nombre del archivo
      decide dónde va</b>, así que puedes arrastrar la carpeta entera de una unidad de golpe.</p>

    <div class="row" style="gap:10px;align-items:center;margin:14px 0">
      <label>Grado <select id="matGrado" style="margin-left:6px">${grados}</select></label>
      <span class="muted" style="font-size:.85rem">La unidad, la semana y la sesión salen del nombre.</span>
    </div>

    <label for="matFiles" style="display:block;border:2px dashed var(--lila);border-radius:12px;
        padding:26px;text-align:center;cursor:pointer;color:var(--grey)">
      <input type="file" id="matFiles" multiple accept=".pdf,.docx,.pptx" style="display:none">
      📎 <b>Elige los archivos</b> — o arrástralos aquí
    </label>

    <div class="row"><span class="state" id="matEstado"></span></div>

    <h3 style="margin-top:24px;font-size:1rem;color:var(--blue-d)">Fichas digitales</h3>
    <p class="muted">Para que el alumno la resuelva <b>dentro del portal</b>, sin bajarse nada.
      Suelta aquí tus fichas en <b>Word</b> y el portal las convierte: te enseña lo que ha
      entendido de cada una y tú decides si se publica.</p>
    <label for="matJson" style="display:block;border:2px dashed #cbe0c9;border-radius:12px;
        padding:18px;text-align:center;cursor:pointer;color:var(--grey)">
      <input type="file" id="matJson" multiple accept=".docx,.json" style="display:none">
      🧩 <b>Digitalizar fichas</b> — elige tus <code>.docx</code>, o arrástralos aquí
    </label>
    <div class="row"><span class="state" id="matJsonEstado"></span></div>
    <div id="matLista" style="margin-top:14px"></div>

    <details style="margin-top:18px">
      <summary style="cursor:pointer;font-weight:600;color:var(--blue-d)">Cómo se deben llamar los archivos</summary>
      <div style="font-size:.86rem;color:var(--grey);margin-top:10px;line-height:1.8">
        <code>u4w1s1-worksheet-a2.pdf</code> — ficha del alumno, unidad 4, semana 1, sesión 1, nivel A2<br>
        <code>u4w1s1-worksheet-a2.docx</code> — la misma ficha en Word, para que la puedan editar<br>
        <code>u4w1s1-slides.pptx</code> — las diapositivas de esa sesión<br>
        Los niveles válidos son <b>a2, b1, b2, c1</b>. Lo que no siga este patrón se queda sin subir y te lo digo.
      </div>
    </details>
  </div>`;

  const jinp = $('#matJson'), jlbl = jinp.parentNode;
  jinp.addEventListener('change', e => matDigitaliza(e.target.files));
  ['dragover','dragenter'].forEach(ev => jlbl.addEventListener(ev, e => {
    e.preventDefault(); jlbl.style.borderColor = 'var(--good)';
  }));
  ['dragleave','drop'].forEach(ev => jlbl.addEventListener(ev, e => {
    e.preventDefault(); jlbl.style.borderColor = '#cbe0c9';
  }));
  jlbl.addEventListener('drop', e => matDigitaliza(e.dataTransfer.files));
  const inp = $('#matFiles'), lbl = inp.parentNode;
  inp.addEventListener('change', e => matSube(e.target.files));
  ['dragover','dragenter'].forEach(ev => lbl.addEventListener(ev, e => {
    e.preventDefault(); lbl.style.borderColor = 'var(--blue)';
  }));
  ['dragleave','drop'].forEach(ev => lbl.addEventListener(ev, e => {
    e.preventDefault(); lbl.style.borderColor = 'var(--lila)';
  }));
  lbl.addEventListener('drop', e => matSube(e.dataTransfer.files));
}

async function matSube(files){
  if(!files || !files.length) return;
  const grado = $('#matGrado').value;
  const est = $('#matEstado'), lista = $('#matLista');
  const filas = [];
  let ok = 0, mal = 0;

  est.textContent = `Subiendo ${files.length} archivo(s)…`;
  est.className = 'state';

  for(let i = 0; i < files.length; i++){
    const f = files[i];
    const m = MAT_RE.exec(f.name);
    if(!m){
      mal++;
      filas.push(`<tr><td>${esc(f.name)}</td><td class="err">El nombre no sigue el patrón — no se sube</td></tr>`);
      continue;
    }
    const unidad = parseInt(m[1],10), semana = parseInt(m[2],10);
    const ruta = `${grado}/u${unidad}/w${semana}/${f.name.toLowerCase()}`;
    const { error } = await sb.storage.from('class-files')
      .upload(ruta, f, { upsert:true, contentType: f.type || 'application/octet-stream' });
    if(error){
      mal++;
      filas.push(`<tr><td>${esc(f.name)}</td><td class="err">${esc(error.message)}</td></tr>`);
    } else {
      ok++;
      filas.push(`<tr><td>${esc(f.name)}</td><td class="muted">→ ${esc(ruta)}</td></tr>`);
    }
    est.textContent = `${i+1} de ${files.length}…`;
  }

  est.textContent = `${ok} subido(s)${mal ? `, ${mal} sin subir` : ''}.`;
  est.className = mal ? 'state err' : 'state ok';
  lista.innerHTML = `<div style="overflow-x:auto"><table class="tbl">
    <thead><tr><th>Archivo</th><th>Dónde ha ido</th></tr></thead>
    <tbody>${filas.join('')}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:10px">Las fichas aparecen en el hub de la unidad
      en cuanto se suben, sin tocar nada más. Las diapositivas hay que convertirlas a imagen aparte
      (<code>tools/exporta_slides_png.ps1</code>) para que los alumnos las puedan ver sin descargarlas.</p>`;
}

/* Fichas entregadas, ordenadas por sesión: es la corrección del día a día,
   distinta de la del producto final de la unidad. El alumno entrega el
   archivo que rellenó o un enlace de Google Docs, porque muchos trabajan ahí
   y un PDF no se puede editar. */
function fichasTabla(fichas, quien){
  if(!fichas || !fichas.length) return '';
  /* Las fichas de sesión llevan milestone 'w1s1'; las actividades sueltas
     (reading, listening, grammar lab) llevan 'a:<actividad>' y dicen su
     semana en el payload. Se ordenan dentro de su semana, después de las
     sesiones, para que el profesor lea la semana entera de corrido. */
  const orden = f => {
    const m = /^w(\d+)s(\d+)$/.exec(f.milestone || '');
    if (m) return (+m[1]) * 100 + (+m[2]);
    const w = f.payload && f.payload.week;
    return w ? (+w) * 100 + 50 : 9999;
  };
  fichas.sort((a,b) => orden(a) - orden(b)
    || String((quien[a.student_id]||{}).full_name||'').localeCompare(String((quien[b.student_id]||{}).full_name||'')));

  const fila = r => {
    const p = quien[r.student_id] || {};
    const m = /^w(\d+)s(\d+)$/.exec(r.milestone || '');
    const act = /^a:/.test(r.milestone || '');
    /* El título de la actividad ya suele decir su semana ("Unit 4 · Week 1
       Crossword…", "Mots croisés — FR · 7e · Semaine 3"): anteponerla otra vez
       solo alarga la celda. Se pone delante únicamente si falta. */
    const tituloAct = esc((r.payload && r.payload.title) || (r.milestone || '').slice(2));
    const semanaAct = (r.payload && r.payload.week && !/(week|semaine|semana)\s*\d/i.test(tituloAct))
      ? 'Semana ' + r.payload.week + ' · ' : '';
    const donde = m ? ('Semana ' + m[1] + ' · Sesión ' + m[2])
      : act ? (semanaAct + tituloAct)
      : esc(r.milestone || '');
    const link = r.payload && r.payload.link;
    const nombre = (r.payload && r.payload.name) || 'Ver archivo';
    const digital = r.payload && r.payload.answers;
    const nresp = digital ? Object.keys(r.payload.answers).length : 0;
    const entrega = digital
      ? '<button class="btn small" onclick="unitVerFicha(&quot;' + r.id + '&quot;)">🧩 ' + nresp + ' respuestas</button>'
      : link
      ? `<a href="${esc(link)}" target="_blank" rel="noopener">🔗 Google Docs</a>`
      : (r.file_path
          ? `<button class="btn small" onclick="unitVerArchivo('${esc(r.file_path)}',this)">📎 ${esc(nombre)}</button>`
          : '<span class="muted">—</span>');
    return `<tr>
      <td class="col-name">${esc(p.full_name || '(alumno)')} <span class="muted">${p.grade_id ? p.grade_id + 'º' + (p.section || '') : ''}</span></td>
      <td class="muted">${esc(r.grade)} · U${r.unit} · ${donde}</td>
      <td>${entrega}</td>
      <td><input type="number" min="0" max="20" value="${r.score != null ? r.score : ''}" style="width:4rem"
            onchange="unitCalificar('${r.id}', this.value, null)"></td>
      <td class="col-flex"><input type="text" placeholder="comentario" value="${esc(r.feedback || '')}"
            onchange="unitCalificar('${r.id}', null, this.value)"></td>
      <td class="muted">${r.reviewed_at ? '✔' : '—'}</td>
    </tr>`;
  };

  return `<div class="card">
    <h2>📄 Fichas entregadas</h2>
    <p class="muted">Lo que entregan sesión a sesión: el archivo que rellenaron, el enlace de
      Google Docs o la actividad que resolvieron en el portal (reading, listening, grammar lab).
      Pon la nota y el comentario y el alumno lo ve en la propia actividad.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th><th>Dónde</th><th>Entrega</th><th>Nota</th><th>Comentario</th><th>Visto</th></tr></thead>
      <tbody>${fichas.map(fila).join('')}</tbody></table></div>
  </div>`;
}

/* Importa las fichas ya digitalizadas a la tabla worksheets. El archivo lo
   genera tools/digitaliza_fichas.py leyendo los .docx; aquí solo se vuelca,
   en lotes para no mandar medio mega en una sola petición. */
/* ---------------------------------------------------------------
   🧩 Digitalizar fichas .docx DENTRO del portal

   Antes esto solo lo podía hacer un administrador: había que correr
   tools/digitaliza_fichas.py en una máquina concreta, generar un JSON y
   subirlo. El profesor dependía de otra persona para algo que es suyo.

   Aquí se hace lo mismo en el navegador del profesor. La conversión no
   necesita permisos especiales — solo leer un archivo que él ya tiene — y la
   escritura va con SU sesión: las políticas de la tabla worksheets ya dejan
   escribir a profesores y administradores. No hace falta ninguna clave de
   servicio, que era el verdadero motivo por el que esto no estaba hecho.

   Un .docx es un ZIP con XML dentro. Se abre a mano, sin librerías: el
   navegador ya sabe descomprimir (DecompressionStream) y leer XML.
   ---------------------------------------------------------------- */

/* ---- 1. Sacar word/document.xml de un .docx ---------------------------- */

/* Lector de ZIP mínimo. Solo busca UN archivo, que es lo único que hace falta.
   Se recorre el directorio central (al final del ZIP) en vez de ir saltando
   por las cabeceras locales: es donde el formato garantiza los tamaños. */
async function _zipLee(buf, queArchivo){
  const dv = new DataView(buf), n = buf.byteLength;
  // El final del directorio central lleva un comentario opcional, así que se
  // busca su firma hacia atrás en vez de asumir que está en el último byte.
  let fin = -1;
  for(let i = n - 22; i >= Math.max(0, n - 65558); i--){
    if(dv.getUint32(i, true) === 0x06054b50){ fin = i; break; }
  }
  if(fin < 0) throw new Error('no parece un .docx (no encuentro el índice del ZIP)');

  let pos = dv.getUint32(fin + 16, true);
  const cuantos = dv.getUint16(fin + 10, true);
  const nombres = new TextDecoder();

  for(let k = 0; k < cuantos; k++){
    if(dv.getUint32(pos, true) !== 0x02014b50) break;
    const metodo   = dv.getUint16(pos + 10, true);
    const compSize = dv.getUint32(pos + 20, true);
    const lenNom   = dv.getUint16(pos + 28, true);
    const lenExtra = dv.getUint16(pos + 30, true);
    const lenCom   = dv.getUint16(pos + 32, true);
    const offLocal = dv.getUint32(pos + 42, true);
    const nombre   = nombres.decode(new Uint8Array(buf, pos + 46, lenNom));

    if(nombre === queArchivo){
      // La cabecera local repite el nombre y los extras, y sus longitudes NO
      // tienen por qué coincidir con las del directorio central: los datos
      // empiezan después de las de ESTA cabecera.
      const lNom = dv.getUint16(offLocal + 26, true);
      const lExt = dv.getUint16(offLocal + 28, true);
      const ini  = offLocal + 30 + lNom + lExt;
      const datos = new Uint8Array(buf, ini, compSize);
      if(metodo === 0) return new TextDecoder('utf-8').decode(datos);
      if(metodo !== 8) throw new Error('el .docx usa una compresión que no sé leer');
      if(typeof DecompressionStream === 'undefined')
        throw new Error('este navegador no puede descomprimir; ábrelo en Chrome o Edge actualizados');
      const flujo = new Blob([datos]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return await new Response(flujo).text();
    }
    pos += 46 + lenNom + lenExtra + lenCom;
  }
  throw new Error('el archivo no lleva ' + queArchivo + ' — ¿es un .docx de verdad?');
}

/* ---- 2. Del XML de Word a los bloques de la ficha ---------------------- */
/* Mismo criterio que tools/digitaliza_fichas.py, y con las mismas dos
   trampas ya resueltas; si se cambia aquí, hay que cambiarlo allí. */

const _RE_PARA  = /<w:p[ >][\s\S]*?<\/w:p>/g;
// Trampa 1: <w:t[^>]*> también casa con <w:tcPr>, y entonces se cuela el XML
// crudo como si fuera texto del alumno. Hay que exigir '>' o un espacio.
const _RE_TEXTO = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g;
const _RE_TABLA = /<w:tbl>[\s\S]*?<\/w:tbl>/g;
const _RE_FILA  = /<w:tr[ >][\s\S]*?<\/w:tr>/g;
const _RE_CELDA = /<w:tc>[\s\S]*?<\/w:tc>/g;
const _RE_LINEA = /^[_\s.]{12,}$/;
const _RE_ACT   = /^(activity|task|step)\s/i;

function _desescapa(t){
  return t.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
          .replace(/&quot;/g,'"').replace(/&apos;/g,"'");
}
function _textoDe(frag){
  let out = '', m;
  _RE_TEXTO.lastIndex = 0;
  while((m = _RE_TEXTO.exec(frag)) !== null) out += m[1];
  return _desescapa(out).trim();
}
// Trampa 2: casi todos los párrafos de estas fichas llevan algún <w:b/> suelto,
// así que solo con eso la ficha entera salía como titulares. Se pide además
// que sea corto: una instrucción larga en negrita sigue siendo instrucción.
function _esTitular(frag, txt){
  if(frag.indexOf('<w:b/>') < 0 && frag.indexOf('<w:b ') < 0) return false;
  return txt.length <= 80;
}
function _trocea(xml){
  const piezas = [];
  let pos = 0, m;
  _RE_TABLA.lastIndex = 0;
  while((m = _RE_TABLA.exec(xml)) !== null){
    const antes = xml.slice(pos, m.index);
    let p; _RE_PARA.lastIndex = 0;
    while((p = _RE_PARA.exec(antes)) !== null) piezas.push(['p', p[0]]);
    piezas.push(['tbl', m[0]]);
    pos = m.index + m[0].length;
  }
  const resto = xml.slice(pos);
  let p; _RE_PARA.lastIndex = 0;
  while((p = _RE_PARA.exec(resto)) !== null) piezas.push(['p', p[0]]);
  return piezas;
}
function _leeTabla(frag){
  const filas = []; let fr;
  _RE_FILA.lastIndex = 0;
  while((fr = _RE_FILA.exec(frag)) !== null){
    const celdas = []; let c;
    _RE_CELDA.lastIndex = 0;
    while((c = _RE_CELDA.exec(fr[0])) !== null) celdas.push(_textoDe(c[0]));
    if(celdas.length) filas.push(celdas);
  }
  return filas;
}

function docxABloques(xml){
  const bloques = [];
  let objetivos = [], lineas = 0, nCampo = 0, titulo = '', meta = '';

  const cierraLineas = () => {
    if(!lineas) return;
    nCampo++;
    bloques.push({t:'write', id:'w'+nCampo, lines: Math.min(lineas, 12)});
    lineas = 0;
  };

  for(const [tipo, frag] of _trocea(xml)){
    if(tipo === 'tbl'){
      cierraLineas();
      const filas = _leeTabla(frag);
      if(!filas.length) continue;
      if(filas.length === 1 && filas[0].length === 1){
        const caja = filas[0][0];
        if(caja.indexOf('☐') >= 0 || caja.indexOf('□') >= 0){
          const items = caja.split(/[☐□]/).map(x=>x.trim()).filter(Boolean);
          // El primer trozo suele ser el rótulo del recuadro ("Today I will…",
          // "Mini self-check") y no un objetivo con casilla: va antes del primer
          // ☐. Se descarta si no termina en punto y hay algo detrás. En el
          // script de Python esto es un items.pop(0) cuyo resultado no se usa
          // -- parece código muerto y no lo es: lo que importa es que quita.
          if(items.length > 1 && !items[0].endsWith('.')) items.shift();
          if(items.length) bloques.push({t:'goals', items});
          continue;
        }
        if(caja.toLowerCase().indexOf('word bank') === 0){
          const resto = caja.slice(9).replace(/^[\s:]+/,'');
          bloques.push({t:'bank', items: resto.split(/[·|,]/).map(x=>x.trim()).filter(Boolean)});
          continue;
        }
        bloques.push({t:'note', text: caja});
        continue;
      }
      nCampo++;
      bloques.push({t:'table', id:'t'+nCampo, head: filas[0], rows: filas.slice(1)});
      continue;
    }

    const txt = _textoDe(frag);
    if(!txt) continue;

    if(_RE_LINEA.test(txt)){ lineas++; continue; }   // varias seguidas = un campo
    cierraLineas();

    if(txt[0] === '☐' || txt[0] === '□'){
      objetivos.push(txt.replace(/^[☐□\s]+/,'').trim());
      continue;
    }
    if(objetivos.length){ bloques.push({t:'goals', items: objetivos}); objetivos = []; }

    const b = _esTitular(frag, txt);
    if(!titulo && _esTitular(frag, txt.slice(0,80)) && txt.toUpperCase().indexOf('STUDENT WORKSHEET') < 0){
      titulo = txt; continue;
    }
    if(!meta && (txt.indexOf('·') >= 0 || txt.indexOf('|') >= 0) && !b){ meta = txt; continue; }
    if(txt.toLowerCase().indexOf('name:') === 0) continue;      // el portal ya sabe quién es
    if(txt.toUpperCase().indexOf('STUDENT WORKSHEET') >= 0) continue;

    if(_RE_ACT.test(txt))                                  bloques.push({t:'activity', text: txt});
    else if(txt.toLowerCase().indexOf('word bank') === 0)  bloques.push({t:'bankhead', text: txt});
    else if(b)                                             bloques.push({t:'h', text: txt});
    else                                                   bloques.push({t:'p', text: txt});
  }

  cierraLineas();
  if(objetivos.length) bloques.push({t:'goals', items: objetivos});
  return {titulo, meta, bloques};
}

/* ---- 3. El nombre del archivo dice dónde va ---------------------------- */
const _RE_FICHA = /^u(\d+)w(\d+)s(\d+)-worksheet-([a-z0-9]+)\.docx$/i;

/* ---- 4. El flujo completo, con lo que ve el profesor ------------------- */
async function matDigitaliza(files){
  const est = $('#matJsonEstado');
  const lista = Array.from(files || []);
  if(!lista.length) return;

  const grado = $('#matGrado').value;
  const docx = lista.filter(f => /\.docx$/i.test(f.name));
  const json = lista.filter(f => /\.json$/i.test(f.name));

  // El JSON que generaba el script sigue valiendo: quien ya lo tenga no pierde
  // el camino viejo por haber estrenado el nuevo.
  if(json.length && !docx.length) return matImporta(json[0]);

  est.className = 'state';
  const fichas = [], malos = [];

  for(let i = 0; i < docx.length; i++){
    const f = docx[i];
    est.textContent = `Leyendo ${i+1} de ${docx.length}: ${f.name}…`;
    const m = _RE_FICHA.exec(f.name);
    if(!m){ malos.push(f.name + ' — el nombre no sigue el patrón uNwNsN-worksheet-nivel.docx'); continue; }
    try{
      const xml = await _zipLee(await f.arrayBuffer(), 'word/document.xml');
      const {titulo, meta, bloques} = docxABloques(xml);
      const campos = bloques.filter(b => b.t === 'write' || b.t === 'table').length;
      // Una ficha sin ningún campo que rellenar no es una ficha digital: es un
      // documento de lectura. Se avisa en vez de publicar algo que el alumno
      // abre y no puede responder.
      if(!campos){ malos.push(f.name + ' — no encontré nada que el alumno pueda rellenar'); continue; }
      fichas.push({
        grade: grado, unit: +m[1], week: +m[2], session: +m[3], level: m[4].toUpperCase(),
        code: `u${+m[1]}w${+m[2]}s${+m[3]}`, title: titulo || null, meta: meta || null,
        blocks: bloques, campos, archivo: f.name
      });
    }catch(e){ malos.push(f.name + ' — ' + e.message); }
  }

  if(!fichas.length){
    est.className = 'state err';
    est.innerHTML = 'No pude digitalizar ninguna.<br>' + malos.map(esc).join('<br>');
    return;
  }

  // Antes de escribir nada, se enseña lo que se ha entendido. Publicar a ciegas
  // una ficha mal leída la ve el alumno antes que el profesor.
  window._matPrevias = fichas;
  const filas = fichas.map((f,i) => `<tr>
      <td><b>${esc(f.code)}</b> <span class="badge lvl">${esc(f.level)}</span></td>
      <td>${esc(f.title || '(sin título)')}</td>
      <td style="text-align:center">${f.blocks.length}</td>
      <td style="text-align:center"><b>${f.campos}</b></td>
      <td><button class="btn sm ghost" onclick="matVistaPrevia(${i})">👁 Ver</button></td>
    </tr>`).join('');
  est.className = 'state ok';
  est.textContent = `${fichas.length} ficha(s) leídas. Revísalas y publica.`;
  $('#matLista').innerHTML = `
    <div class="card" style="margin-top:12px">
      <h3 style="margin-top:0;font-size:1rem;color:var(--blue-d)">Esto es lo que he entendido</h3>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Ficha</th><th>Título</th><th style="text-align:center">Bloques</th>
          <th style="text-align:center">Campos</th><th></th></tr></thead>
        <tbody>${filas}</tbody></table></div>
      ${malos.length ? `<div class="note err" style="margin-top:12px">No pude con ${malos.length}:<br>
        ${malos.map(esc).join('<br>')}</div>` : ''}
      <div id="matPrev" style="display:none;margin-top:14px"></div>
      <div class="row" style="margin-top:14px;gap:10px">
        <button class="btn" onclick="matPublica()">Publicar ${fichas.length} ficha(s) en ${esc(GRADE_META[grado][1])}</button>
        <button class="btn ghost" onclick="$('#matLista').innerHTML='';$('#matJsonEstado').textContent='';">Cancelar</button>
      </div>
    </div>`;
}

/* Lo que verá el alumno, con los campos marcados. Sin esto el profesor
   publica confiando, y la confianza no es una comprobación. */
window.matVistaPrevia = function(i){
  const f = window._matPrevias[i], caja = $('#matPrev');
  const pinta = b => {
    if(b.t === 'h')        return `<h4 style="margin:12px 0 4px;color:var(--blue-dd)">${esc(b.text)}</h4>`;
    if(b.t === 'activity') return `<div style="margin:12px 0 4px;font-weight:700;color:var(--blue-d)">${esc(b.text)}</div>`;
    if(b.t === 'p')        return `<p style="margin:4px 0">${esc(b.text)}</p>`;
    if(b.t === 'note')     return `<div class="note" style="margin:8px 0">${esc(b.text)}</div>`;
    if(b.t === 'bankhead') return `<div style="margin:10px 0 2px;font-weight:600">${esc(b.text)}</div>`;
    if(b.t === 'bank')     return `<div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0">
        ${b.items.map(x=>`<span class="badge">${esc(x)}</span>`).join('')}</div>`;
    if(b.t === 'goals')    return `<ul style="margin:8px 0">${b.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    if(b.t === 'write')    return `<div style="margin:8px 0;padding:8px 10px;border:2px dashed var(--blue);
        border-radius:8px;color:var(--blue-d);font-size:.85rem">✍️ campo de escritura · ${b.lines} línea(s)</div>`;
    if(b.t === 'table')    return `<div style="overflow-x:auto;margin:8px 0"><table class="tbl">
        <thead><tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${b.rows.map(r=>`<tr>${r.map(c=>c
          ? `<td>${esc(c)}</td>`
          : '<td style="background:#eef4fb;color:var(--blue-d);font-size:.8rem">se rellena</td>').join('')}</tr>`).join('')}
        </tbody></table></div>`;
    return '';
  };
  caja.style.display = 'block';
  caja.innerHTML = `<div style="border:1px solid var(--line);border-radius:12px;padding:16px;background:#fff">
    <div class="muted" style="font-size:.8rem">${esc(f.archivo)}</div>
    <h3 style="margin:2px 0 2px">${esc(f.title || '(sin título)')}</h3>
    ${f.meta ? `<div class="muted" style="font-size:.85rem;margin-bottom:8px">${esc(f.meta)}</div>` : ''}
    ${f.blocks.map(pinta).join('')}</div>`;
  caja.scrollIntoView({behavior:'smooth', block:'nearest'});
};

window.matPublica = async function(){
  const fichas = window._matPrevias || [];
  if(!fichas.length) return;
  const est = $('#matJsonEstado');
  est.className = 'state'; est.textContent = 'Publicando…';
  const filas = fichas.map(f => ({
    grade: f.grade, unit: f.unit, week: f.week, session: f.session, level: f.level,
    code: f.code, title: f.title, meta: f.meta, blocks: f.blocks,
    created_by: (state.profile && state.profile.id) || null,
    updated_at: new Date().toISOString()
  }));
  let ok = 0, fallos = 0, ultimo = '';
  for(let i = 0; i < filas.length; i += 12){
    const lote = filas.slice(i, i + 12);
    const { error } = await sb.from('worksheets')
      .upsert(lote, { onConflict: 'grade,unit,week,session,level' });
    if(error){ fallos += lote.length; ultimo = error.message; } else ok += lote.length;
  }
  est.className = fallos ? 'state err' : 'state ok';
  est.textContent = fallos
    ? `${ok} publicadas, ${fallos} con error (${ultimo})`
    : `${ok} ficha(s) publicadas. Ya se pueden resolver en el portal.`;
  if(!fallos) $('#matLista').innerHTML = '';
};

async function matImporta(file){
  if(!file) return;
  const est = $('#matJsonEstado');
  est.textContent = 'Leyendo…'; est.className = 'state';
  let fichas;
  try {
    fichas = JSON.parse(await file.text());
    if(!Array.isArray(fichas) || !fichas.length) throw new Error('el archivo no trae fichas');
  } catch(e){
    est.textContent = 'No pude leerlo: ' + e.message; est.className = 'state err'; return;
  }

  const filas = fichas.map(f => ({
    grade: f.grade, unit: f.unit, week: f.week, session: f.session,
    level: f.level, code: f.code, title: f.title || null, meta: f.meta || null,
    blocks: f.blocks, created_by: (state.profile && state.profile.id) || null,
    updated_at: new Date().toISOString()
  }));

  let ok = 0, fallos = 0, ultimo = '';
  for(let i = 0; i < filas.length; i += 12){
    const lote = filas.slice(i, i + 12);
    const { error } = await sb.from('worksheets')
      .upsert(lote, { onConflict: 'grade,unit,week,session,level' });
    if(error){ fallos += lote.length; ultimo = error.message; }
    else ok += lote.length;
    est.textContent = `${Math.min(i + 12, filas.length)} de ${filas.length}…`;
  }
  est.textContent = fallos
    ? `${ok} importadas, ${fallos} con error (${ultimo})`
    : `${ok} fichas digitales importadas. Ya se pueden resolver en el portal.`;
  est.className = fallos ? 'state err' : 'state ok';
}

/* Abre lo que el alumno escribio en una ficha digital. Se guardan como
   {campo: valor}, asi que se muestran en orden con su identificador: basta
   para corregir sin tener que abrir nada. */
window._unitFichas = {};
window.unitVerFicha = function(id){
  const r = window._unitFichas[id];
  const caja = $('#unitTexto');
  if(!r){ return; }
  const a = (r.payload && r.payload.answers) || {};
  const filas = Object.keys(a).filter(k => a[k] !== '' && a[k] !== false)
    .map(k => `<tr><td class="muted" style="white-space:nowrap">${esc(k)}</td>
                   <td>${a[k] === true ? '✔' : esc(String(a[k]))}</td></tr>`).join('');
  caja.style.display = 'block';
  caja.innerHTML = `<h3>🧩 ${esc((r.payload && r.payload.title) || 'Ficha')} —
      nivel ${esc((r.payload && r.payload.level) || '')}</h3>
    <p class="muted">${Object.keys(a).length} campos respondidos.</p>
    <div style="overflow-x:auto"><table class="tbl"><tbody>${filas}</tbody></table></div>`;
  caja.scrollIntoView({behavior:'smooth', block:'start'});
};

/* ---------------------------------------------------------------
   ✅ Corregir fichas — la rúbrica y la corrección, en una pantalla.

   La rúbrica se define POR SESIÓN y vale para los cuatro niveles: el
   criterio es el mismo, lo que cambia es la exigencia. Se guarda en la
   propia ficha (worksheets.rubric).

   Corregir es: eliges sesión, ves quién entregó, abres a un alumno y
   tienes sus respuestas a la izquierda y la rúbrica a la derecha. Pones
   puntos, y "Guardar y siguiente" te lleva al siguiente sin volver atrás.
---------------------------------------------------------------- */
let _corr = { grade:'g9', unit:4, week:1, session:1, fichas:[], entregas:[], i:0, rubric:[], modo:'sesion' };

async function corregirPanel(){
  $('#main').innerHTML = `<div class="card"><p class="muted">Cargando…</p></div>`;
  if(_corr.modo === 'escritas') return corrEscritasPanel();
  await corrCarga();
}

window.corrModo = function(m){ _corr.modo = m; corregirPanel(); };

function corrTabs(){
  return `<div class="row" style="gap:8px;margin-bottom:12px">
    <button class="btn small ${_corr.modo !== 'escritas' ? '' : 'ghost'}" onclick="corrModo('sesion')">📄 Por sesión</button>
    <button class="btn small ${_corr.modo === 'escritas' ? '' : 'ghost'}" onclick="corrModo('escritas')">✍️ Producciones escritas</button>
  </div>`;
}

async function corrEscritasPanel(){
  $('#main').innerHTML = `
    <div class="card">
      ${corrTabs()}
      <h2>✍️ Producciones escritas</h2>
      <p class="muted">El texto entero a la izquierda y la rúbrica a la derecha, con una propuesta
        automática de nota que sale de lo que la propia rúbrica pide. Nada le llega al alumno
        hasta que pulses <b>Guardar y enviar</b>.</p>
      <style>
        /* minmax(0,1fr): sin el, la columna del texto no puede encoger y la
           pantalla se va de ancho. Y por debajo de 1100px no caben dos
           columnas: la rubrica baja debajo del texto. */
        #eGrid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:18px;margin-top:14px}
        #eGrid > div{min-width:0}
        @media (max-width:1100px){ #eGrid{grid-template-columns:minmax(0,1fr)} }
      </style>
      <div id="eCab"></div>
    </div>
    <div class="card" id="eLista"><p class="muted">Cargando…</p></div>
    <div id="eCorr"></div>`;
  await escCarga();
}

function corrSelector(){
  const semanas = [1,2,3,4,5,6].map(w=>`<option value="${w}" ${w===_corr.week?'selected':''}>Semana ${w}</option>`).join('');
  const sesiones = [1,2,3,4].map(s=>`<option value="${s}" ${s===_corr.session?'selected':''}>Sesión ${s}</option>`).join('');
  const grados = ALL_GRADE_ORDER.map(g=>`<option value="${g}" ${g===_corr.grade?'selected':''}>${GRADE_META[g][1]}</option>`).join('');
  return `<div class="row" style="gap:10px;flex-wrap:wrap">
    <select id="cGrado">${grados}</select>
    <select id="cUnidad">${[1,2,3,4,5,6].map(u=>`<option value="${u}" ${u===_corr.unit?'selected':''}>Unidad ${u}</option>`).join('')}</select>
    <select id="cSemana">${semanas}</select>
    <select id="cSesion">${sesiones}</select>
    <button class="btn small" onclick="corrCarga()">Ver</button>
  </div>`;
}

async function corrCarga(){
  const sel = id => { const e=$(id); return e ? e.value : null; };
  if($('#cGrado')){
    _corr.grade   = sel('#cGrado');
    _corr.unit    = parseInt(sel('#cUnidad'),10);
    _corr.week    = parseInt(sel('#cSemana'),10);
    _corr.session = parseInt(sel('#cSesion'),10);
  }
  const hito = 'w'+_corr.week+'s'+_corr.session;

  /* `blocks` hace falta para poner el ENUNCIADO junto a cada respuesta: sin
     el, WSITEMS.prepara() recibia undefined y el profesor solo veia la clave
     tecnica ("tf12: F"). */
  const { data: fichas } = await sb.from('worksheets')
    .select('id,level,title,rubric,blocks')
    .eq('grade',_corr.grade).eq('unit',_corr.unit)
    .eq('week',_corr.week).eq('session',_corr.session).order('level');
  _corr.fichas = fichas || [];
  _corr.rubric = (fichas && fichas[0] && fichas[0].rubric) || [];

  const { data: ent } = await sb.from('v_entregas_ficha')
    .select('*').eq('grade',_corr.grade).eq('unit',_corr.unit).eq('milestone',hito)
    .order('full_name');
  _corr.entregas = ent || [];
  _corr.i = 0;
  corrPinta();
}

function corrPinta(){
  const titulo = (_corr.fichas[0] && _corr.fichas[0].title) || '(sin ficha digital para esta sesión)';
  const n = _corr.entregas.length;
  const sinCorregir = _corr.entregas.filter(e=>e.score==null).length;

  $('#main').innerHTML = `
    <div class="card">
      ${corrTabs()}
      <h2>✅ Corregir fichas</h2>
      <p class="muted">${esc(titulo)}</p>
      ${corrSelector()}
      <p class="muted" style="margin-top:12px">
        ${n} entrega(s) · <b>${sinCorregir} sin corregir</b> ·
        ${_corr.fichas.length} nivel(es) digitalizado(s)</p>
    </div>

    <div class="card">
      <h3 style="font-size:1rem;color:var(--blue-d)">📏 Rúbrica de esta práctica</h3>
      <p class="muted">Vale para los cuatro niveles de la sesión. La nota se suma sola.</p>
      <div id="cRub"></div>
      <div class="row">
        <button class="btn small" onclick="corrAddCrit()">+ Criterio</button>
        <button class="btn small ghost" onclick="corrGuardaRubrica()">Guardar rúbrica</button>
        <span class="state" id="cRubEstado"></span>
      </div>
    </div>

    ${n ? `<div class="card" id="cCorreccion"></div>` : `
    <div class="card"><p class="muted">Todavía no hay entregas de esta sesión.</p></div>`}`;

  corrPintaRubrica();
  if(n) corrAlumno(0);
}

function corrPintaRubrica(){
  const r = _corr.rubric;
  $('#cRub').innerHTML = r.length ? `<table class="tbl" style="margin-top:10px">
      <thead><tr><th>Criterio</th><th style="width:90px">Máx.</th><th style="width:40px"></th></tr></thead>
      <tbody>${r.map((c,i)=>`<tr>
        <td><input type="text" value="${esc(c.c||'')}" style="width:100%"
              onchange="_corr.rubric[${i}].c=this.value"></td>
        <td><input type="number" min="1" max="20" value="${c.max||4}" style="width:4.5rem"
              onchange="_corr.rubric[${i}].max=Number(this.value)"></td>
        <td><button class="btn small ghost" onclick="corrDelCrit(${i})">✕</button></td>
      </tr>`).join('')}</tbody></table>`
    : `<p class="muted" style="margin-top:10px">Sin rúbrica todavía. Añade criterios y guárdalos:
       aparecerán al corregir a cada alumno.</p>`;
}

window.corrAddCrit = function(){
  _corr.rubric.push({ c:'', max:4 });
  corrPintaRubrica();
};
window.corrDelCrit = function(i){
  _corr.rubric.splice(i,1);
  corrPintaRubrica();
};

window.corrGuardaRubrica = async function(){
  const est = $('#cRubEstado');
  const limpia = _corr.rubric.filter(c => (c.c||'').trim());
  est.textContent = 'Guardando…'; est.className = 'state';
  const { error } = await sb.from('worksheets').update({ rubric: limpia })
    .eq('grade',_corr.grade).eq('unit',_corr.unit)
    .eq('week',_corr.week).eq('session',_corr.session);
  est.textContent = error ? ('No se guardó: '+error.message)
    : `Guardada para los ${_corr.fichas.length} niveles.`;
  est.className = error ? 'state err' : 'state ok';
  if(!error){ _corr.rubric = limpia; corrPintaRubrica(); corrAlumno(_corr.i); }
};

/* ---------- corrección de un alumno ---------- */
window.corrAlumno = async function(i){
  if(!_corr.entregas.length) return;
  _corr.i = Math.max(0, Math.min(_corr.entregas.length-1, i));
  const e = _corr.entregas[_corr.i];

  const { data: sub } = await sb.from('unit_submissions')
    .select('payload').eq('id', e.id).maybeSingle();
  const resp = (sub && sub.payload && sub.payload.answers) || {};

  /* Junto a cada respuesta, su enunciado. Con la clave tecnica sola ("tf12: F")
     no habia forma de corregir sin abrir la ficha en otra pestana. El orden es
     el de la ficha, no el orden en que el alumno fue contestando. */
  const fAl = _corr.fichas.find(f => f.level === e.level) || _corr.fichas[0];
  const etiquetas = (window.WSITEMS && fAl && fAl.blocks)
    ? WSITEMS.prepara(fAl.blocks).labels : {};
  const orden = Object.keys(etiquetas);
  const claves = Object.keys(resp)
    .filter(k => resp[k] !== '' && resp[k] !== false && resp[k] != null)
    .sort((a,b) => {
      const ia = orden.indexOf(a), ib = orden.indexOf(b);
      return (ia<0?9999:ia) - (ib<0?9999:ib);
    });
  const valor = v => v === true ? '✔' : (v === 'T' ? 'True' : (v === 'F' ? 'False' : String(v)));

  const puntos = e.criteria || {};
  const rub = _corr.rubric;
  const maxTotal = rub.reduce((a,c)=>a+(c.max||0),0);

  $('#cCorreccion').innerHTML = `
    <div class="row" style="justify-content:space-between;align-items:center">
      <div>
        <h3 style="margin:0;font-size:1.05rem;color:var(--blue-dd)">${esc(e.full_name)}</h3>
        <span class="muted" style="font-size:.85rem">Nivel ${esc(e.level||'—')} ·
          ${claves.length} campo(s) respondido(s) ·
          ${e.draft===false ? 'entregada' : 'borrador'}</span>
      </div>
      <div class="muted" style="font-size:.85rem">${_corr.i+1} de ${_corr.entregas.length}</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:18px;margin-top:14px" id="cGrid">
      <div style="max-height:60vh;overflow:auto;border:1px solid var(--line);border-radius:10px;padding:12px">
        ${claves.length ? `<table class="tbl"><tbody>${claves.map(k=>`<tr>
            <td style="vertical-align:top;max-width:22rem">
              <span style="font-size:.85rem">${esc(etiquetas[k] || k)}</span>
              ${etiquetas[k] ? `<span class="muted" style="font-size:.7rem"> · ${esc(k)}</span>` : ''}</td>
            <td style="font-weight:600">${esc(valor(resp[k]))}</td></tr>`).join('')}</tbody></table>`
          : '<p class="muted">No respondió nada.</p>'}
      </div>
      <div>
        ${rub.length ? rub.map((c,j)=>`
          <div style="margin-bottom:12px">
            <div style="font-size:.85rem;font-weight:600">${esc(c.c)}</div>
            <div class="row" style="gap:5px;margin-top:5px">
              ${Array.from({length:(c.max||4)+1},(_,p)=>`
                <button class="btn small ${puntos[j]===p?'':'ghost'}"
                  style="padding:5px 10px;min-width:34px"
                  onclick="corrPunto(${j},${p})">${p}</button>`).join('')}
            </div>
          </div>`).join('')
        : '<p class="muted">Define la rúbrica arriba para poder puntuar por criterio.</p>'}

        <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
          <div class="row" style="justify-content:space-between">
            <b style="font-size:.9rem">Nota</b>
            <span id="cTotal" style="font-weight:800;color:var(--blue-dd)">
              ${corrTotal(puntos)}${maxTotal?(' / '+maxTotal):''}</span>
          </div>
          <input type="text" id="cComent" placeholder="Comentario para el alumno"
            value="${esc(e.feedback||'')}" style="width:100%;margin-top:8px;padding:8px;
            border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.85rem">
          <div class="row" style="margin-top:10px;gap:8px">
            <button class="btn" onclick="corrGuarda(true)">Guardar y siguiente</button>
            <button class="btn small ghost" onclick="corrGuarda(false)">Solo guardar</button>
          </div>
          <div class="row"><span class="state" id="cEstado"></span></div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top:14px;gap:6px;flex-wrap:wrap">
      ${_corr.entregas.map((x,j)=>`<button class="btn small ${j===_corr.i?'':'ghost'}"
        style="padding:5px 9px;font-size:.78rem" onclick="corrAlumno(${j})">
        ${esc((x.full_name||'').split(' ')[0])}${x.score!=null?' ✓':''}</button>`).join('')}
    </div>`;
};

function corrTotal(p){
  return Object.keys(p||{}).reduce((a,k)=>a+(Number(p[k])||0),0);
}

window.corrPunto = function(j, p){
  const e = _corr.entregas[_corr.i];
  e.criteria = e.criteria || {};
  e.criteria[j] = (e.criteria[j] === p) ? undefined : p;
  if(e.criteria[j] === undefined) delete e.criteria[j];
  corrAlumno(_corr.i);
};

window.corrGuarda = async function(siguiente){
  const e = _corr.entregas[_corr.i];
  const est = $('#cEstado');
  est.textContent = 'Guardando…'; est.className = 'state';
  const total = corrTotal(e.criteria);
  const { error } = await sb.from('unit_submissions').update({
    criteria: e.criteria || {},
    score: Object.keys(e.criteria||{}).length ? total : null,
    feedback: $('#cComent').value || null,
    reviewed_at: new Date().toISOString(),
    reviewed_by: (state.profile && state.profile.id) || null
  }).eq('id', e.id);
  if(error){ est.textContent = 'No se guardó: '+error.message; est.className='state err'; return; }
  e.score = Object.keys(e.criteria||{}).length ? total : null;
  e.feedback = $('#cComent').value || null;
  e.reviewed_at = new Date().toISOString();
  est.textContent = 'Guardado'; est.className = 'state ok';
  if(siguiente && _corr.i < _corr.entregas.length-1) corrAlumno(_corr.i+1);
  else corrAlumno(_corr.i);
};


/* ---------------------------------------------------------------
   ✍️ PRODUCCIONES ESCRITAS — corregir el texto, no los huecos

   Corregir fichas servía para respuestas cortas: una tabla de clave y
   valor. Un texto de 160 palabras metido en una celda no se puede leer, y
   mucho menos corregir. Aquí el texto se lee entero y al lado va la
   rúbrica con una PROPUESTA automática.

   Qué significa "automática": la propia rúbrica dice lo que es medible
   ("40-60 words", "with a cause-and-effect linker"), así que se lee el
   criterio que escribió el docente y se comprueba lo que se puede
   comprobar — extensión, conectores, párrafos, variedad léxica, cuánto de
   la ficha completó. Lo que NO se puede medir así (si la idea es buena, si
   el registro es el adecuado) se dice claramente y lo pone el docente. Es
   una corrección previa que ahorra trabajo, no un juicio sobre el texto.

   Nada llega al alumno hasta que el docente pulsa Guardar y ENVIAR: hasta
   entonces la propuesta vive en la pantalla y, si se guarda, en criteria,
   que el alumno no ve. score y feedback, que sí ve, solo se escriben al
   enviar.
---------------------------------------------------------------- */
const ESC_CONECTORES = {
  causa:     ['because','since','as a result','therefore','so','due to','thanks to',
              'that is why','consequently','thus','hence','owing to','lead to',
              'leads to','led to','cause','causes','caused','this is why'],
  contraste: ['however','although','though','even though','whereas','while',
              'on the other hand','in contrast','nevertheless','despite','in spite of','but'],
  adicion:   ['moreover','furthermore','in addition','besides','also','what is more','as well as'],
  ejemplo:   ['for example','for instance','such as','to illustrate']
};

function escBusca(texto, lista){
  const t = String(texto || '');
  return lista.filter(function(l){
    const patron = l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(^|[^a-zA-Z])' + patron + '([^a-zA-Z]|$)', 'i').test(t);
  });
}

/* Todo lo medible del texto, en un solo sitio. */
function escAnaliza(texto){
  const t = String(texto || '').trim();
  const palabras = t.match(/[A-Za-zÀ-ÿ']+/g) || [];
  const n = palabras.length;
  const bajas = palabras.map(function(w){ return w.toLowerCase(); });
  const distintas = new Set(bajas);
  const frases = t.split(/[.!?]+(?:\s|$)/).map(function(x){ return x.trim(); })
                  .filter(function(x){ return x.length > 1; });
  const parrafos = t ? (t.split(/\n\s*\n/).filter(function(p){ return p.trim(); }).length || 1) : 0;
  const veces = {};
  bajas.forEach(function(w){ if(w.length >= 4) veces[w] = (veces[w] || 0) + 1; });
  const repetidas = Object.keys(veces).filter(function(w){ return veces[w] >= 4; })
    .sort(function(a,b){ return veces[b] - veces[a]; }).slice(0, 4);
  const con = {};
  Object.keys(ESC_CONECTORES).forEach(function(k){ con[k] = escBusca(t, ESC_CONECTORES[k]); });
  return {
    texto: t, palabras: n, distintas: distintas.size,
    variedad: n ? distintas.size / n : 0,
    frases: frases.length,
    mediaFrase: frases.length ? Math.round(n / frases.length) : 0,
    parrafos: parrafos, repetidas: repetidas, conectores: con,
    totalConectores: Object.keys(con).reduce(function(a,k){ return a + con[k].length; }, 0)
  };
}

/* Propuesta para UN criterio: puntos sugeridos y por qué. Devuelve p:null
   cuando el criterio no es de los que se pueden medir. */
function escPropone(crit, an, ctx){
  const c = (crit.c || '').toLowerCase();
  const max = crit.max || 4;
  const nivel = function(frac){ return Math.max(0, Math.min(max, Math.round(max * frac))); };

  /* 1. Extensión: el rango suele estar escrito en el propio criterio. */
  const m = c.match(/(\d+)\s*(?:-|–|—|to|a)\s*(\d+)\s*(?:words|palabras)/);
  if(m){
    const lo = +m[1], hi = +m[2], n = an.palabras;
    const datos = { lo:lo, hi:hi, n:n };
    if(n >= lo && n <= hi) return { p:max, tipo:'extension', datos:datos, r:n + ' palabras, dentro de ' + lo + '–' + hi + '.' };
    if(n >= lo * 0.8 && n <= hi * 1.25)
      return { p:Math.max(0, max - 1), tipo:'extension', datos:datos, r:n + ' palabras, cerca de ' + lo + '–' + hi + '.' };
    return { p:nivel(n < lo ? (n / lo) * 0.6 : 0.5), tipo:'extension', datos:datos,
             r:n + ' palabras, ' + (n < lo ? 'por debajo' : 'por encima') + ' de ' + lo + '–' + hi + '.' };
  }
  if(/\b(words|palabras|length|extensi)/.test(c))
    return { p:null, r:'El criterio habla de extensión pero no dice el rango. Escríbelo en la rúbrica ("40-60 words") y se calcula solo.' };

  /* 2. Conectores. El criterio suele decir de qué tipo. */
  if(/link|connector|conector|cause|efecto|effect/.test(c)){
    const quiere = /cause|efecto|effect/.test(c) ? 'causa' : null;
    const hallados = quiere ? an.conectores[quiere]
      : Object.keys(an.conectores).reduce(function(a,k){ return a.concat(an.conectores[k]); }, []);
    if(hallados.length)
      return { p:max, r:'Usa ' + hallados.slice(0,3).map(function(x){ return '"' + x + '"'; }).join(', ') + '.' };
    return { p:0, r:'No se ve ningún conector' + (quiere ? ' de causa-efecto' : '') + '.' };
  }

  /* 3. Cuánto de la ficha completó. */
  if(/task completion|completion|finished|complet|tareas/.test(c)){
    if(!ctx || !ctx.campos) return { p:null, r:'No sé cuántos campos tenía la ficha.' };
    const frac = ctx.respondidos / ctx.campos;
    return { p:nivel(frac), r:ctx.respondidos + ' de ' + ctx.campos + ' campos (' + Math.round(frac * 100) + '%).' };
  }

  /* 4. Vocabulario. Con banco de palabras se mide de verdad; sin él solo se
        puede mirar la variedad, y eso hay que decirlo. */
  if(/vocab|adjetiv|adjective|word choice|lexic/.test(c)){
    if(ctx && ctx.banco && ctx.banco.length){
      const usadas = escBusca(an.texto, ctx.banco);
      const frac = usadas.length / ctx.banco.length;
      return { p:nivel(Math.min(1, frac * 2)),
               r:'Usa ' + usadas.length + ' de las ' + ctx.banco.length + ' del banco' +
                 (usadas.length ? ' (' + usadas.slice(0,4).join(', ') + ')' : '') + '.' };
    }
    /* La variedad lexica de un texto de diez palabras siempre sale altisima:
       no dice nada. Por debajo de 20 palabras no se propone nada. */
    if(an.palabras < 20)
      return { p:null, r:'Solo ' + an.palabras + ' palabras: demasiado corto para medir el vocabulario.' };
    const v = an.variedad;
    const p = v >= 0.58 ? max : (v >= 0.48 ? Math.max(0, max - 1) : Math.max(0, max - 2));
    return { p:p, r:'La ficha no trae banco de palabras: solo se mide variedad (' +
             Math.round(v * 100) + '% distintas' +
             (an.repetidas.length ? '; repite "' + an.repetidas.slice(0,2).join('", "') + '"' : '') +
             '). Confírmalo tú.' };
  }

  /* 5. Organización y párrafos. */
  if(/organi|structure|estructura|paragraph|párrafo|parrafo|coheren/.test(c)){
    if(an.parrafos >= 2 && an.totalConectores >= 2)
      return { p:max, r:an.parrafos + ' párrafos y ' + an.totalConectores + ' conectores.' };
    if(an.parrafos >= 2 || an.totalConectores >= 1)
      return { p:Math.max(0, max - 1), r:an.parrafos + ' párrafo(s), ' + an.totalConectores + ' conector(es).' };
    return { p:Math.max(0, max - 2), r:'Un solo bloque de texto y casi sin conectores.' };
  }

  /* 6. Lo que no se puede medir así. */
  return { p:null, r:'Esto no se mide automáticamente — lo valoras tú.' };
}

/* Borrador del comentario para el alumno. En inglés, que es la lengua de la
   clase, y sin adjetivar el texto: hechos que el alumno puede usar. */
function escBorrador(an, props){
  const l = [];
  l.push('You wrote ' + an.palabras + ' words in ' + an.frases + ' sentence(s).');
  /* El rango sale del criterio marcado como 'extension', NO de buscar la
     palabra "palabras" en los motivos: el de vocabulario dice "banco de
     palabras" y se colaba entero, en castellano, en el texto del alumno. */
  const ext = props.filter(function(x){ return x && x.tipo === 'extension'; })[0];
  if(ext && ext.datos){
    const d = ext.datos;
    l.push(d.n >= d.lo && d.n <= d.hi
      ? 'That is inside the ' + d.lo + '-' + d.hi + ' word range.'
      : 'The task asked for ' + d.lo + '-' + d.hi + ' words, so ' +
        (d.n < d.lo ? 'add a little more.' : 'try to be more concise.'));
  }
  const cs = Object.keys(an.conectores).filter(function(k){ return an.conectores[k].length; });
  if(cs.length) l.push('Linkers you used: ' +
    cs.map(function(k){ return an.conectores[k].slice(0,3).join(', '); }).join('; ') + '.');
  else l.push('Try to join your ideas with linkers (because, however, for example).');
  if(an.repetidas.length) l.push('You repeat "' + an.repetidas.slice(0,2).join('", "') +
    '" — try a synonym at least once.');
  if(an.mediaFrase > 28) l.push('Some sentences are very long (' + an.mediaFrase +
    ' words on average). Split the longest one in two.');
  if(an.parrafos < 2 && an.palabras > 90) l.push('Split the text into two paragraphs.');
  return l.join(' ');
}

/* ---------- pantalla ---------- */
let _esc = { grade:'g9', unit:4, filas:[], i:-1, actual:null, props:[], puntos:{} };

/* Un texto cuenta como produccion escrita si la ficha lo declaro como bloque
   `write`, y si no hay ficha (las actividades sueltas no la tienen) por su
   tamano: 25 palabras es mas de lo que cabe en un hueco. */
function escTextos(payload, ficha){
  const resp = (payload && payload.answers) || {};
  const ids = ficha && Array.isArray(ficha.blocks)
    ? ficha.blocks.filter(function(b){ return b && b.t === 'write'; }).map(function(b){ return b.id; })
    : null;
  return Object.keys(resp).filter(function(k){
    const v = resp[k];
    if(typeof v !== 'string') return false;
    if(ids && ids.indexOf(k) >= 0) return true;
    return (v.trim().match(/\S+/g) || []).length >= 25;
  }).map(function(k){ return { campo:k, texto:resp[k] }; });
}

async function escCarga(){
  const sel = function(id){ const e = $(id); return e ? e.value : null; };
  if($('#eGrado')){ _esc.grade = sel('#eGrado'); _esc.unit = parseInt(sel('#eUnidad'), 10); }

  /* Todo lo entregado de esa unidad, venga de la ficha de la sesion o de una
     actividad suelta: para el docente son la misma cosa, texto que corregir. */
  const { data, error } = await sb.from('unit_submissions')
    .select('id,student_id,grade,unit,milestone,kind,payload,score,criteria,feedback,reviewed_at,updated_at')
    .eq('grade', _esc.grade).eq('unit', _esc.unit).in('kind', ['worksheet','report'])
    .order('updated_at', { ascending:false }).limit(600);
  if(error){
    $('#eLista').innerHTML = `<p class="err">No pude leerlo: ${esc(error.message)}</p>`;
    return;
  }
  const ids = [...new Set((data || []).map(function(r){ return r.student_id; }))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section').in('id', ids);
  const quien = Object.fromEntries((gente || []).map(function(p){ return [p.id, p]; }));

  const { data: fichas } = await sb.from('worksheets')
    .select('level,week,session,title,rubric,blocks').eq('grade', _esc.grade).eq('unit', _esc.unit);
  _esc.fichas = fichas || [];

  _esc.filas = [];
  (data || []).forEach(function(r){
    const m = /^w(\d+)s(\d+)$/.exec(r.milestone || '');
    const ficha = m ? (_esc.fichas.find(function(f){
      return f.week === +m[1] && f.session === +m[2] && f.level === (r.payload && r.payload.level);
    }) || null) : null;
    /* El producto final de la unidad (kind 'report') guarda su texto en
       payload.text, no en answers: es una redaccion sola, no una ficha. Para
       quien corrige es lo mismo — texto que leer y puntuar. */
    const textos = (r.kind === 'report')
      ? ((r.payload && r.payload.text || '').trim() ? [{ campo:'texto', texto:r.payload.text }] : [])
      : escTextos(r.payload, ficha);
    textos.forEach(function(t){
      _esc.filas.push({
        id:r.id, campo:t.campo, texto:t.texto, fila:r, ficha:ficha,
        nombre:(quien[r.student_id] || {}).full_name || '(alumno)',
        grado:(quien[r.student_id] || {}).grade_id, seccion:(quien[r.student_id] || {}).section,
        donde:(r.kind === 'report') ? 'Producto final de la unidad'
              : ((r.payload && r.payload.title) || r.milestone),
        /* Mismo contador que el analisis: si no, el numero cambia al abrir. */
        palabras:(String(t.texto).match(/[A-Za-zÀ-ÿ']+/g) || []).length
      });
    });
  });
  _esc.filas.sort(function(a,b){
    return (a.reviewed_at ? 1 : 0) - (b.reviewed_at ? 1 : 0) ||
           String(a.nombre).localeCompare(String(b.nombre));
  });
  escPinta();
}

function escPinta(){
  const sinCorregir = _esc.filas.filter(function(f){ return !f.fila.reviewed_at; }).length;
  const grados = ALL_GRADE_ORDER.map(function(g){
    return `<option value="${g}" ${g === _esc.grade ? 'selected' : ''}>${GRADE_META[g][1]}</option>`; }).join('');
  const unidades = [1,2,3,4,5,6].map(function(u){
    return `<option value="${u}" ${u === _esc.unit ? 'selected' : ''}>Unidad ${u}</option>`; }).join('');

  $('#eCab').innerHTML = `
    <div class="row" style="gap:10px;flex-wrap:wrap">
      <select id="eGrado">${grados}</select>
      <select id="eUnidad">${unidades}</select>
      <button class="btn small" onclick="escCarga()">Ver</button>
    </div>
    <p class="muted" style="margin-top:10px">${_esc.filas.length} producción(es) ·
      <b>${sinCorregir} sin enviar</b>. Se listan los textos largos de la unidad,
      vengan de la ficha de la sesión o de una actividad suelta.</p>`;

  $('#eLista').innerHTML = _esc.filas.length ? `<div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th><th>Dónde</th><th style="text-align:center">Palabras</th>
        <th style="text-align:center">Estado</th><th></th></tr></thead>
      <tbody>${_esc.filas.map(function(f, j){
        const est = f.fila.reviewed_at
          ? '<span class="badge" style="background:#dcfce7">enviado' + (f.fila.score != null ? ' · ' + f.fila.score : '') + '</span>'
          : (f.fila.criteria && Object.keys(f.fila.criteria).length
              ? '<span class="badge" style="background:#fef9c3">guardado sin enviar</span>'
              : '<span class="badge" style="background:#fee2e2">sin corregir</span>');
        return `<tr>
          <td>${esc(f.nombre)} <span class="muted">${f.grado || ''}º${f.seccion || ''}</span></td>
          <td class="muted">${esc(f.donde)} <span style="font-size:.75rem">· ${esc(f.campo)}</span></td>
          <td style="text-align:center">${f.palabras}</td>
          <td style="text-align:center">${est}</td>
          <td><button class="btn small" onclick="escAbre(${j})">Corregir</button></td></tr>`;
      }).join('')}</tbody></table></div>`
    : '<p class="muted">No hay producciones escritas en esta unidad todavía.</p>';

  if(_esc.i >= 0 && _esc.filas[_esc.i]) escAbre(_esc.i, true);
  else $('#eCorr').innerHTML = '';
}

window.escAbre = function(j, silencioso){
  const f = _esc.filas[j];
  if(!f) return;
  _esc.i = j;
  _esc.actual = f;

  const an = escAnaliza(f.texto);
  const rub = (f.ficha && f.ficha.rubric) || [];
  const resp = (f.fila.payload && f.fila.payload.answers) || {};
  const respondidos = Object.keys(resp).filter(function(k){
    return resp[k] !== '' && resp[k] !== false && resp[k] != null; }).length;
  const banco = (f.ficha && Array.isArray(f.ficha.blocks))
    ? f.ficha.blocks.filter(function(b){ return b && b.t === 'bank'; })
        .reduce(function(a,b){ return a.concat(b.items || []); }, [])
    : [];
  /* Cuantos campos TENIA la ficha, no cuantos trae el payload: el payload
     solo guarda los que el alumno toco, asi que usarlo de denominador daba
     "1 de 3 (33%)" a quien habia dejado 18 sin abrir. */
  let campos = 0;
  if(f.ficha && Array.isArray(f.ficha.blocks) && window.WSITEMS){
    try{ campos = Object.keys(WSITEMS.prepara(f.ficha.blocks).labels || {}).length; }catch(e){}
  }
  if(!campos) campos = Object.keys(resp).length;
  const ctx = { campos:campos, respondidos:respondidos, banco:banco };

  _esc.props = rub.map(function(c){ return escPropone(c, an, ctx); });
  /* Si ya se habia corregido, mandan los puntos guardados; si no, la propuesta. */
  const guardados = f.fila.criteria || {};
  _esc.puntos = {};
  rub.forEach(function(c, k){
    if(guardados[k] != null) _esc.puntos[k] = guardados[k];
    else if(_esc.props[k] && _esc.props[k].p != null) _esc.puntos[k] = _esc.props[k].p;
  });

  const maxTotal = rub.reduce(function(a,c){ return a + (c.max || 0); }, 0);
  const borrador = f.fila.feedback ||
    (f.fila.payload && f.fila.payload.review && f.fila.payload.review.borrador) ||
    escBorrador(an, _esc.props);

  $('#eCorr').innerHTML = `
    <div class="card">
      <div class="row" style="justify-content:space-between;align-items:baseline">
        <h3 style="margin:0;font-size:1.05rem;color:var(--blue-dd)">${esc(f.nombre)}</h3>
        <span class="muted" style="font-size:.85rem">${esc(f.donde)} · campo ${esc(f.campo)} ·
          ${_esc.i + 1} de ${_esc.filas.length}</span>
      </div>

      <div id="eGrid">
        <div style="min-width:0">
          <div style="white-space:pre-wrap;line-height:1.75;font-size:.95rem;border:1px solid var(--line);
                      border-radius:10px;padding:16px;max-height:56vh;overflow:auto;background:#fcfdff">${esc(f.texto)}</div>
          <p class="muted" style="font-size:.8rem;margin-top:8px">
            ${an.palabras} palabras · ${an.frases} frases (${an.mediaFrase} palabras de media) ·
            ${an.parrafos} párrafo(s) · ${Math.round(an.variedad * 100)}% de palabras distintas ·
            ${an.totalConectores} conector(es)${an.repetidas.length ? ' · repite: ' + esc(an.repetidas.join(', ')) : ''}</p>
        </div>

        <div>
          ${rub.length ? `<div class="badge" style="background:#e7ecfd;color:#2d5a8d;margin-bottom:8px">
              🤖 Propuesta automática — revísala antes de enviar</div>` : ''}
          ${rub.length ? rub.map(function(c, k){
            const pr = _esc.props[k] || {};
            return `<div style="margin-bottom:12px">
              <div style="font-size:.85rem;font-weight:600">${esc(c.c)}</div>
              <div class="row" style="gap:5px;margin-top:5px;flex-wrap:wrap">
                ${Array.from({length:(c.max || 4) + 1}, function(_, p){
                  const puesto = _esc.puntos[k] === p;
                  const sugerido = pr.p === p;
                  return `<button class="btn small ${puesto ? '' : 'ghost'}"
                    style="padding:5px 10px;min-width:34px;${sugerido && !puesto ? 'border-color:#3b5bdb;color:#3b5bdb' : ''}"
                    onclick="escPunto(${k},${p})">${p}</button>`; }).join('')}
              </div>
              <div class="muted" style="font-size:.76rem;margin-top:4px">${esc(pr.r || '')}</div>
            </div>`; }).join('')
          : '<p class="muted">Esta práctica no tiene rúbrica. Defínela en «Corregir fichas» y aquí se puntúa sola.</p>'}

          <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
            <div class="row" style="justify-content:space-between">
              <b style="font-size:.9rem">Nota</b>
              <span style="font-weight:800;color:var(--blue-dd)" id="eTotal">${escTotal()}${maxTotal ? (' / ' + maxTotal) : ''}</span>
            </div>
            <textarea id="eComent" rows="5" style="width:100%;margin-top:8px;padding:9px;
              border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.85rem;
              line-height:1.6">${esc(borrador)}</textarea>
            <p class="muted" style="font-size:.75rem;margin:4px 0 0">
              El alumno no ve nada hasta que pulses <b>Guardar y enviar</b>.</p>
            <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap">
              <button class="btn" onclick="escGuarda(true)">📨 Guardar y enviar</button>
              <button class="btn small ghost" onclick="escGuarda(false)">Guardar sin enviar</button>
              <button class="btn small ghost" onclick="escAbre(${Math.min(_esc.i + 1, _esc.filas.length - 1)})">Siguiente ▸</button>
            </div>
            <div class="row"><span class="state" id="eEstado"></span></div>
          </div>
        </div>
      </div>
    </div>`;

  if(!silencioso) $('#eCorr').scrollIntoView({ behavior:'smooth', block:'start' });
};

function escTotal(){
  return Object.keys(_esc.puntos).reduce(function(a,k){ return a + (Number(_esc.puntos[k]) || 0); }, 0);
}

window.escPunto = function(k, p){
  if(_esc.puntos[k] === p) delete _esc.puntos[k];
  else _esc.puntos[k] = p;
  escAbre(_esc.i, true);
};

window.escGuarda = async function(enviar){
  const f = _esc.actual;
  if(!f) return;
  const est = $('#eEstado');
  est.textContent = 'Guardando…'; est.className = 'state';
  const comentario = ($('#eComent').value || '').trim();
  const hayPuntos = Object.keys(_esc.puntos).length > 0;

  const cambio = {
    criteria: _esc.puntos,
    reviewed_by: (state.profile && state.profile.id) || null
  };
  if(enviar){
    /* Solo al ENVIAR se escriben las dos columnas que el alumno lee. */
    cambio.score = hayPuntos ? escTotal() : null;
    cambio.feedback = comentario || null;
    cambio.reviewed_at = new Date().toISOString();
  } else {
    /* Sin enviar: el borrador se queda en el payload, y score/feedback
       intactos para que al alumno no le llegue media correccion. */
    const p = Object.assign({}, f.fila.payload || {});
    p.review = Object.assign({}, p.review || {}, { borrador:comentario });
    cambio.payload = p;
  }

  const { error } = await sb.from('unit_submissions').update(cambio).eq('id', f.id);
  if(error){ est.textContent = 'No se guardó: ' + error.message; est.className = 'state err'; return; }

  f.fila.criteria = _esc.puntos;
  if(enviar){
    f.fila.score = cambio.score; f.fila.feedback = cambio.feedback;
    f.fila.reviewed_at = cambio.reviewed_at;
  } else {
    f.fila.payload = cambio.payload;
  }
  est.textContent = enviar ? 'Enviado ✓ — el alumno ya lo ve.' : 'Guardado (todavía no le llega).';
  est.className = 'state ok';
  escPinta();
};

/* ---------------------------------------------------------------
   🔑 Resetear la contraseña de un profesor desde su tarjeta.

   La RPC admin_set_password cambia la contraseña real en Auth.
   La nueva clave no se guarda en una tabla visible ni recuperable.
---------------------------------------------------------------- */
window._resetPw = function(id){
  const caja = document.getElementById('pw-box-' + id);
  if(!caja) return;
  const abierta = caja.style.display !== 'none';
  caja.style.display = abierta ? 'none' : 'inline-flex';
  if(!abierta){ const i = document.getElementById('pw-new-' + id); if(i) i.focus(); }
};

window._guardaPw = async function(id){
  const inp = document.getElementById('pw-new-' + id);
  const msg = document.getElementById('pw-msg-' + id);
  const pw  = (inp.value || '').trim();
  if(pw.length < 8){ msg.textContent = 'Mínimo 8 caracteres'; msg.style.color = 'var(--bad)'; return; }
  msg.textContent = 'Guardando…'; msg.style.color = 'var(--muted)';

  const r = await sb.rpc('admin_set_password', { p_id: id, p_password: pw });
  if(r.error){ msg.textContent = r.error.message; msg.style.color = 'var(--bad)'; return; }

  msg.textContent = 'Cambiada ✓ ya puede entrar con ella';
  msg.style.color = 'var(--good)';
  inp.value = '';
};

/* ---------------------------------------------------------------
   ⏱️ Tiempo de pantalla — el dato que dirección pidió.

   Nace de la preocupación por el uso de tablets. La idea es convertir
   esa preocupación en un número que el colegio mire y sobre el que
   acuerde un techo, en vez de discutir percepciones.

   Honestidad del dato, dicha también en pantalla: mide el tiempo
   REGISTRADO en actividades, exámenes, grabaciones y entregas. No mide
   tener la página abierta sin hacer nada. Es un suelo, no el total.
---------------------------------------------------------------- */
let _tp = { semanas: 8, grado: '', filas: [], act: [] };

async function tiempoPantallaPanel(){
  $('#main').innerHTML = '<div class="card"><p class="muted">Calculando…</p></div>';
  await tpCarga();
}

async function tpCarga(){
  if($('#tpGrado')){
    _tp.grado   = $('#tpGrado').value;
    _tp.semanas = parseInt($('#tpSemanas').value, 10);
  }
  const desde = new Date();
  desde.setDate(desde.getDate() - _tp.semanas * 7);

  let q = sb.from('v_tiempo_pantalla').select('*')
    .gte('semana', desde.toISOString().slice(0,10));
  if(_tp.grado) q = q.eq('grade_id', Number(_tp.grado));
  const { data, error } = await q;
  if(error){
    $('#main').innerHTML = `<div class="card"><p class="err">No pude leerlo: ${esc(error.message)}</p></div>`;
    return;
  }
  _tp.filas = data || [];
  /* Las actividades se leen aparte: el panel sumaba minutos pero no decia
     CUANTAS actividades habia hecho cada alumno, que es lo primero que se
     pregunta el que mira esto. */
  const act = await sb.from('unit_submissions')
    .select('student_id,milestone,payload,duration_sec,updated_at')
    .like('milestone', 'a:%').limit(5000);
  _tp.act = (act && act.data) || [];
  tpPinta();
}

/* Cuantos niveles/rondas ha dado por terminados el alumno dentro de una
   actividad. Cada familia guarda su "done" donde le viene bien — {D1:{done}},
   {done:{D1:true}}, {done:{w0l1:true}} — asi que se busca la marca, no una
   forma concreta. */
function tpHechos(payload){
  let n = 0;
  const mira = v => {
    if(!v || typeof v !== 'object') return;
    if(Array.isArray(v)){ v.forEach(mira); return; }
    /* Los juegos de partida (invaders, voice battle, say it right, los de
       primaria) no marcan `done`: guardan el resultado, y guardar un
       resultado ES haber terminado la partida. */
    if(typeof v.score === 'number' && typeof v.total === 'number' && !v.letters && !v.ans){ n++; return; }
    Object.keys(v).forEach(k => {
      if(k === 'done'){
        if(v[k] === true) n++;
        else if(v[k] && typeof v[k] === 'object') n += Object.values(v[k]).filter(Boolean).length;
      } else mira(v[k]);
    });
  };
  mira(payload && payload.state);
  return n;
}

function tpPinta(){
  const filas = _tp.filas;
  const semanas = [...new Set(filas.map(f => f.semana))].sort().slice(-_tp.semanas);

  /* por alumno y semana */
  const porAlumno = {};
  filas.forEach(f => {
    const a = porAlumno[f.student_id] || (porAlumno[f.student_id] =
      { nombre: f.full_name, grado: f.grade_id, seccion: f.section, sem: {}, total: 0, acotadas: 0 });
    a.sem[f.semana] = (a.sem[f.semana] || 0) + Number(f.minutos);
    a.total += Number(f.minutos);
    a.acotadas += (f.sesiones_acotadas || 0);
  });
  const alumnos = Object.values(porAlumno).sort((x,y) => y.total - x.total);

  /* medias del grupo, por semana */
  const medias = semanas.map(s => {
    const v = alumnos.map(a => a.sem[s] || 0).filter(x => x > 0);
    return v.length ? Math.round(v.reduce((a,b)=>a+b,0) / v.length) : 0;
  });
  const mediaGlobal = medias.filter(Boolean).length
    ? Math.round(medias.filter(Boolean).reduce((a,b)=>a+b,0) / medias.filter(Boolean).length) : 0;
  const pico = alumnos.length ? Math.round(Math.max(...alumnos.map(a => Math.max(0, ...Object.values(a.sem))))) : 0;
  const acotadas = alumnos.reduce((a,b) => a + b.acotadas, 0);

  /* por tipo de uso */
  const porTipo = {};
  filas.forEach(f => porTipo[f.tipo] = (porTipo[f.tipo] || 0) + Number(f.minutos));
  const totalTipo = Object.values(porTipo).reduce((a,b)=>a+b,0) || 1;

  /* Actividades por alumno. Se filtra por el mismo grado que la tabla de
     minutos para que las dos hablen del mismo grupo. */
  const nombres = {};
  filas.forEach(f => { nombres[f.student_id] = { nombre:f.full_name, grado:f.grade_id, seccion:f.section }; });
  const porAct = {};
  (_tp.act || []).forEach(r => {
    const quien = nombres[r.student_id];
    if(!quien) return;                       // otro grado, u otro rol: fuera
    const a = porAct[r.student_id] || (porAct[r.student_id] =
      Object.assign({ act:0, registros:0, hechos:0, entregadas:0, seg:0 }, quien));
    a.act++;
    a.registros  += Object.keys((r.payload && r.payload.answers) || {}).length;
    a.hechos     += tpHechos(r.payload);
    a.entregadas += (r.payload && r.payload.draft === false) ? 1 : 0;
    a.seg        += Number(r.duration_sec || 0);
  });
  const listaAct = Object.values(porAct).sort((x,y) => y.hechos - x.hechos || y.act - x.act);
  const cuerpoAct = listaAct.slice(0, 60).map(a => `<tr>
      <td>${esc(a.nombre)} <span class="muted">${a.grado||''}º${a.seccion||''}</span></td>
      <td style="text-align:center">${a.act}</td>
      <td style="text-align:center">${a.registros}</td>
      <td style="text-align:center;font-weight:700;color:${a.hechos?'#2f9e44':'var(--muted)'}">${a.hechos||'·'}</td>
      <td style="text-align:center">${a.entregadas||'·'}</td>
      <td style="text-align:center">${Math.round(a.seg/60) || '·'}</td>
    </tr>`).join('');

  const grados = ALL_GRADE_ORDER.map(g =>
    `<option value="${GRADE_META[g][1].replace(/\D/g,'')}" ${_tp.grado===GRADE_META[g][1].replace(/\D/g,'')?'selected':''}>${GRADE_META[g][1]}</option>`).join('');

  const cab = semanas.map(s => `<th style="text-align:center">${s.slice(5)}</th>`).join('');
  const cuerpo = alumnos.slice(0, 60).map(a => `<tr>
      <td>${esc(a.nombre)} <span class="muted">${a.grado||''}º${a.seccion||''}</span></td>
      ${semanas.map(s => {
        const m = Math.round(a.sem[s] || 0);
        const color = m === 0 ? 'var(--muted)' : (m > 120 ? '#b45309' : 'var(--ink)');
        return `<td style="text-align:center;color:${color}">${m || '·'}</td>`;
      }).join('')}
      <td style="text-align:center;font-weight:700">${Math.round(a.total)}</td>
    </tr>`).join('');

  $('#main').innerHTML = `
  <div class="card">
    <h2>⏱️ Tiempo de pantalla</h2>
    <p class="muted">Minutos por alumno y semana. Sirve para acordar un techo con dirección
      y comprobar si se respeta, en vez de discutirlo de oídas.</p>

    <div class="row" style="gap:10px;margin:12px 0">
      <select id="tpGrado"><option value="">Todos los grados</option>${grados}</select>
      <select id="tpSemanas">
        ${[4,8,12,20].map(n=>`<option value="${n}" ${n===_tp.semanas?'selected':''}>Últimas ${n} semanas</option>`).join('')}
      </select>
      <button class="btn small" onclick="tpCarga()">Ver</button>
    </div>

    <div class="grid cols-3" style="gap:12px;margin-top:6px">
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:var(--blue-dd)">${mediaGlobal}</div>
        <div class="muted" style="font-size:.82rem">minutos por alumno y semana<br>(media)</div>
      </div>
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:${pico>120?'#b45309':'var(--blue-dd)'}">${pico}</div>
        <div class="muted" style="font-size:.82rem">la semana más alta<br>de un solo alumno</div>
      </div>
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:var(--blue-dd)">${alumnos.length}</div>
        <div class="muted" style="font-size:.82rem">alumnos con<br>actividad registrada</div>
      </div>
    </div>

    <div style="margin-top:16px">
      <b style="font-size:.86rem">En qué se va el tiempo</b>
      <div style="display:flex;height:26px;border-radius:8px;overflow:hidden;margin-top:8px;border:1px solid var(--line)">
        ${Object.keys(porTipo).sort((a,b)=>porTipo[b]-porTipo[a]).map((t,i) => {
          const pct = (porTipo[t]/totalTipo*100);
          const col = ['#4987c6','#76cbe5','#7c9a4e','#d4a03a'][i%4];
          return `<div title="${t}: ${Math.round(porTipo[t])} min" style="width:${pct}%;background:${col}"></div>`;
        }).join('')}
      </div>
      <div class="row" style="gap:14px;margin-top:7px;font-size:.8rem">
        ${Object.keys(porTipo).sort((a,b)=>porTipo[b]-porTipo[a]).map((t,i) => {
          const col = ['#4987c6','#76cbe5','#7c9a4e','#d4a03a'][i%4];
          return `<span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${col}"></span>
            ${esc(t)} · ${Math.round(porTipo[t]/totalTipo*100)}%</span>`;
        }).join('')}
      </div>
    </div>
  </div>

  <div class="card">
    <h3 style="font-size:1rem;color:var(--blue-d)">Minutos por alumno y semana</h3>
    <p class="muted" style="font-size:.82rem">En ámbar, las semanas por encima de 120 minutos.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th>${cab}<th style="text-align:center">Total</th></tr></thead>
      <tbody>${cuerpo || '<tr><td colspan="9" class="muted">Sin actividad en el periodo.</td></tr>'}</tbody>
    </table></div>
    ${alumnos.length > 60 ? `<p class="muted" style="font-size:.8rem">Se muestran los 60 de mayor uso, de ${alumnos.length}.</p>` : ''}
  </div>

  <div class="card">
    <h3 style="font-size:1rem;color:var(--blue-d)">Actividades por alumno</h3>
    <p class="muted" style="font-size:.82rem">Lo que cada uno ha abierto, terminado y entregado
      desde que las actividades guardan solas — y el rato que les ha dedicado, incluido el de
      las que dejó a medias.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Alumno</th>
        <th style="text-align:center">Actividades</th>
        <th style="text-align:center">Días/rondas<br>con trabajo</th>
        <th style="text-align:center">Terminados</th>
        <th style="text-align:center">Entregadas</th>
        <th style="text-align:center">Minutos</th></tr></thead>
      <tbody>${cuerpoAct || '<tr><td colspan="6" class="muted">Todavía nadie ha guardado una actividad.</td></tr>'}</tbody>
    </table></div>
  </div>

  <div class="card">
    <h3 style="font-size:1rem;color:var(--blue-d)">Qué mide y qué no</h3>
    <p class="muted" style="font-size:.85rem;line-height:1.7">
      Suma el tiempo <b>registrado</b> en actividades, exámenes, grabaciones y entregas.
      En las actividades que guardan solas se cuenta el rato con la pestaña <b>a la vista</b>,
      terminen o no; en lo demás, solo lo que quedó registrado al acabar, así que ahí sigue
      siendo un <b>suelo</b>: el tiempo real es algo mayor.<br>
      Cada sesión se limita a 120 minutos porque algunas quedan abiertas y devuelven
      duraciones imposibles (hay un examen registrado con 4114 minutos). En este periodo
      se acotaron <b>${acotadas}</b> sesión(es); conviene revisarlas si son muchas.
    </p>
  </div>`;
}

/* El profesor decide qué trabajo se ve en la galería de la unidad. Nunca el
   alumno: son trabajos de menores y la política del bucket y el trigger lo
   impiden aunque alguien lo intente desde la consola. */
window.unitExhibe = async function(id, si){
  const { error } = await sb.from('unit_submissions')
    .update({ shared: !!si }).eq('id', id);
  if(error) alert('No se pudo cambiar: ' + error.message);
};
