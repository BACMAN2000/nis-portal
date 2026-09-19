

/* ===================== STUDENT ===================== */
/* Los cursos Cambridge de secundaria (motor nis-fun), por grado. Lo leen el
   hub del grado (studentGrade) y el grupo Cambridge de la barra del alumno:
   una sola lista para que las dos puertas no se desvien. El motor cierra por
   grado por su cuenta (levels.json / fun_access). */
/* Reparto del 16-sep-2026 (lo fijo el usuario): 6.º-7.º A2+B1 · 8.º A2+B1+B2 ·
   9.º-11.º A2+B1+B2+C1. Los mismos grados van en nis-fun/content/levels.json. */
/* A1 Foundations (16-sep-2026) va en todos los grados: no prepara un examen,
   es la gramatica de base para quien aun no esta listo para A2. */
const SEC_COURSES = {g6:['a1','ket','pet'],g7:['a1','ket','pet'],g8:['a1','ket','pet','b2f'],
                     g9:['a1','ket','pet','b2f','c1a'],g10:['a1','ket','pet','b2f','c1a'],g11:['a1','ket','pet','b2f','c1a']};
const SEC_COURSE_NAMES = {a1:'A1 Foundations',ket:'A2 Key',pet:'B1 Preliminary',b2f:'B2 First',c1a:'C1 Advanced'};
const SEC_COURSE_DESC = {a1:'The grammar every beginner needs before A2 Key: twelve topics explained step by step, with a story, colour blocks, audio and four rounds of practice each.'};
function secCoursesFor(key){ return SEC_COURSES[key]||[]; }

async function renderStudent(initial){
  // Fase 2 WP-B: el acceso se carga ANTES de pintar la barra (y no despues,
  // como antes) para que 🇫🇷 French salga bien a la primera si el grado lo
  // tiene abierto — nodeVisible('french') sin state.access cargado siempre
  // da cerrado, y la barra de un alumno con Frances habilitado nacia sin su
  // pestaña hasta la siguiente navegacion.
  window.__nisPaso='alumno:acceso';
  state.access = await loadStudentAccess();   // Fase 2: visibilidad por nodo
  // Mock mode (18-sep-2026): si hoy le toca mock (oficial de su grado o
  // individual), la barra es solo Home y la portada es solo la tarjeta del
  // mock. Se decide aqui, antes de pintar, igual que el acceso.
  state.mockMode = await loadMockMode();
  window.__nisPaso='alumno:acceso-ok';
  // Barra nueva (Fase 2 WP-B): Home / My classes / (French si toca) /
  // Cambridge / Practice tools / My progress / Help / My account. El grupo
  // «Cambridge» de antes (con el curso del grado y los simulacros) sale de
  // aqui: sus tres puertas viven ahora dentro de la propia pista Cambridge
  // (studentCambridgePortal), que ya sabe que grado la mira.
  document.body.innerHTML = shell(mockModeActive() ? [{key:'home',label:'🏠 Home'}] : [
    {key:'home',label:'🏠 Home'},
    {key:'myclasses',label:'🏫 My classes'},
    ...(nodeVisible('french') ? [{key:'french',label:'🇫🇷 French'}] : []),
    {key:'cambridge',label:'🎓 Cambridge'},
    {key:'tools',label:'🧰 Practice tools'},
    // 'General' salio de la barra: sus dos unicas tarjetas (Library y MUN) ya
    // estaban identicas en Home, asi que era una pestaña que no llevaba a
    // nada nuevo. La ruta #general sigue viva por si algun enlace la usa.
    {key:'results',label:'📊 My Progress'},
    {key:'help',label:'❓ Help'},
    {key:'account',label:'👤 My account'},
  ], initial||'home', `<div class="center muted">Loading…</div>`);
  window.__nisPaso='alumno:shell';
  // Toda la navegación pasa por window._nav para que la ruta quede en el hash
  // (deep links desde las páginas de actividades + "atrás" del navegador).
  bindNav(k=>window._nav(k||'home'));
  // Anti-trampa en todo el portal: mismo criterio que las actividades, pero
  // solo para alumnos logueados (docentes/admin quedan exentos en el motor).
  // En la vista de alumno no se arma el anti-trampa: quien está dentro es el
  // admin y no tiene sentido contarle salidas de pestaña ni reportarlas.
  try{ if(window.NISAntiCheat && !_isPreview()) NISAntiCheat.init({activity:'portal', label:'Portal NIS', requireStudent:true}); }catch(_){}
  // Volver desde un juego (./#classes_g9_unit_u4) reabre esa vista, no el hub.
  const deep=(location.hash||'').replace(/^#/,'');
  window.__nisPaso='alumno:hub';
  if(deep && _navRender(deep)) return;
  if(initial==='results') window._nav('results'); else studentHub();
  window.__nisPaso='alumno:hub-ok';
}
function _setNav(k){
  document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav===k));
  // La barra del alumno se pinta una sola vez, asi que el punto de la cabecera
  // del grupo (clase aqui, ver navHTML) hay que moverlo aqui al cambiar de ruta.
  document.querySelectorAll('.nav-group').forEach(g=>{
    const h=g.querySelector('.nav-head'); if(!h) return;
    h.classList.toggle('aqui', !!g.querySelector(`.nav-sub [data-nav="${k}"]`));
  });
}
function studentPhonics(){ _setNav('tools'); $('#main').innerHTML = phonicsPanel(); }
function studentCoach(){ _setNav('tools'); $('#main').innerHTML = coachPanel(); }
/* Fase 2 WP-B: las cinco apps de léxico (phrasal/collocations/idioms/
   wordform/dict) tenian panel para profesor/admin pero NINGUNA ruta en el
   router del alumno (window._nav las mandaba, sin match, de vuelta al hub) —
   se quedan cableadas aqui, con el mismo estilo sin cabecera que Phonics y
   Pronunciation, sus vecinas de siempre en el bloque «Practice». */
function studentPhrasal(){ _setNav('tools'); $('#main').innerHTML = phrasalPanel(); }
function studentCollocations(){ _setNav('tools'); $('#main').innerHTML = collocationsPanel(); }
function studentIdioms(){ _setNav('tools'); $('#main').innerHTML = idiomsPanel(); }
function studentWordform(){ _setNav('tools'); $('#main').innerHTML = wordformPanel(); }
function studentDict(){ _setNav('tools'); $('#main').innerHTML = dictPanel(); }
/* 🧰 Practice tools (Fase 2 WP-B): el bloque «Practice» de ENGLISH_AREAS,
   suelto de la parrilla de English — mismos handlers y candados de siempre. */
function studentTools(){
  _setNav('tools');
  const areas = ENGLISH_AREAS.filter(a=>a.block==='practice' && (!a.when || a.when()));
  const cards = areas.map(a=>{
    const em = (a.icon && typeof camIcon==='function') ? camIcon(a.icon,72) : a.emoji;
    if(a.node && !nodeVisible(a.node)) return _lockedCard(em,a.title,a.desc);
    return _hubCard(em,a.title,a.desc,`window._nav('${a.nav}')`);
  }).join('');
  $('#main').innerHTML = `<h1>🧰 Practice tools</h1>
    <p class="muted" style="margin-top:-6px">Train on your own: sounds, grammar and vocabulary games.</p>
    <div class="grid cols-3">${cards}</div>`;
}

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
    $('#main').innerHTML=`<h1>👤 My account</h1>
      <div class="card" style="max-width:680px">
        <div class="note info"><b>Password change not available in preview mode.</b><br>Exit “View as” and sign in with the student account to change the password.</div>
      </div>`;
    return;
  }
  $('#main').innerHTML=`<h1>👤 My account</h1>
    <div class="card" style="max-width:680px">
      <h2>🔐 Change password</h2>
      <p class="muted">Choose a password you can remember. The new password will immediately replace the previous one.</p>
      <label>New password</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="my_pw1" type="password" autocomplete="new-password" placeholder="Minimum 8 characters" style="flex:1">
        <button class="btn sm ghost" type="button" onclick="window.toggleMyPassword('my_pw1',this)">Show</button>
      </div>
      <label>Repeat the new password</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="my_pw2" type="password" autocomplete="new-password" placeholder="Repeat the password" style="flex:1">
        <button class="btn sm ghost" type="button" onclick="window.toggleMyPassword('my_pw2',this)">Show</button>
      </div>
      <div class="muted" style="font-size:.84rem;margin-top:8px">Tip: use a short phrase you can remember, combining letters and numbers. Do not share your password.</div>
      <div id="my_pw_msg" style="margin-top:12px"></div>
      <button id="my_pw_save" class="btn" type="button" onclick="window.saveMyPassword()" style="margin-top:12px">Save new password</button>
    </div>`;
  const first=$('#my_pw1'); if(first) first.focus();
}

window.toggleMyPassword=function(id,btn){
  const input=$('#'+id); if(!input) return;
  const show=input.type==='password';
  input.type=show?'text':'password';
  if(btn) btn.textContent=show?'Hide':'Show';
};

window.saveMyPassword=async function(){
  const p=state.profile||{};
  const sessionUid=state.session && state.session.user ? state.session.user.id : null;
  const msg=$('#my_pw_msg'), btn=$('#my_pw_save');
  if(_isPreview() || !sessionUid || !p.id || sessionUid!==p.id){
    if(msg) msg.innerHTML='<div class="note err">For security reasons, you can only change the password of your own account.</div>';
    return;
  }
  const pw1=(($('#my_pw1')||{}).value||'').trim();
  const pw2=(($('#my_pw2')||{}).value||'').trim();
  if(pw1.length<8){ if(msg) msg.innerHTML='<div class="note err">Password must be at least 8 characters.</div>'; return; }
  if(pw1!==pw2){ if(msg) msg.innerHTML='<div class="note err">The two passwords do not match.</div>'; return; }
  if(btn){ btn.disabled=true; btn.textContent='Saving…'; }
  if(msg) msg.innerHTML='<div class="note">Updating your password…</div>';
  try{
    const { error } = await withTimeout(sb.auth.updateUser({password:pw1}), STARTUP_TIMEOUT_MS, 'PASSWORD_UPDATE_TIMEOUT');
    if(error) throw error;
    const a=$('#my_pw1'), b=$('#my_pw2'); if(a) a.value=''; if(b) b.value='';
    if(msg) msg.innerHTML='<div class="note ok"><b>Password updated successfully.</b><br>From now on use your new password to sign in.</div>';
  }catch(e){
    const text=(e && e.message) ? e.message : 'Could not change the password.';
    if(msg) msg.innerHTML=`<div class="note err">${esc(text)}</div>`;
  }finally{
    if(btn){ btn.disabled=false; btn.textContent='Save new password'; }
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
/* Fase 2 WP-B: las dos tarjetas grandes de Home — «My classes» y «Cambridge»,
   una pista cada una. chips = 2-4 pastillas con lo que hay dentro. */
function _trackCard(emoji,title,desc,onclick,chips){
  const pastillas = (chips||[]).map(c=>`<span class="chip">${c}</span>`).join('');
  return `<div class="card track-card" onclick="${onclick}" tabindex="0" role="button"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${onclick}}">
    <div class="ico">${emoji}</div>
    <h2>${title}</h2>
    <div class="muted" style="font-size:.88rem">${desc}</div>
    <div class="track-chips">${pastillas}</div>
  </div>`;
}
/* «Tu ruta»: el nivel Cambridge que le toca al alumno por su grado — mismo
   texto para la tarjeta de Home y la cabecera de la pista Cambridge.
   Primaria por YLE (FUN_REPARTO); secundaria por los cursos que ya reparte
   secCoursesFor, sin A1 Foundations (no prepara examen, es la gramatica de
   base — ver su nota junto a SEC_COURSE_DESC). null si el alumno no tiene
   grado o su grado no tiene reparto (profesor/admin sin perfil de alumno). */
const _YLE_ROUTE_LABEL = {starters:'Pre A1 Starters', movers:'A1 Movers', flyers:'A2 Flyers'};
function _camGradeInfo(){
  const p = state.profile, g = p && p.grade_id;
  if(g==null) return null;
  const gn = Number(g), key = 'g'+gn;
  if(gn<=5){
    const lvl = FUN_REPARTO[gn];
    if(!lvl) return null;
    return {primary:true, level:lvl, key, label:_YLE_ROUTE_LABEL[lvl]||lvl};
  }
  const cursos = secCoursesFor(key).filter(lv=>lv!=='a1');
  if(!cursos.length) return null;
  return {primary:false, cursos, key, label:cursos.map(lv=>SEC_COURSE_NAMES[lv]).join(' · ')};
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
  if(mockModeActive()) return mockModeHub();   // dia de mock: solo la tarjeta del mock
  _setNav('home');
  const p=state.profile;
  // Fase 2 WP-B: dos tarjetas grandes de pista (My classes / Cambridge) en
  // vez de la parrilla de "Subjects" — direccion pidio separar Clases de la
  // preparacion Cambridge y que cada programa tenga UNA sola casa.
  const gkey = p.grade_id!=null ? 'g'+p.grade_id : null;
  const gLabel = (gkey && GRADE_META[gkey]) ? GRADE_META[gkey][1] : 'Classes';
  const classesGo = gkey ? "window._nav('classes_"+gkey+"')" : "window._nav('classes')";
  const camInfo = _camGradeInfo();
  // Sin «mocks» para el alumno: el dia del mock su portada ES el mock (mock
  // mode) y los demas dias no hay tarjeta de mocks que mostrarle.
  const camDesc = camInfo ? 'Your route: '+camInfo.label+' · course · practice tests' : 'Course · practice tests';
  // El chip «Readers» prometía lecturas a grados que no tienen readers configurados
  // (y a los que sí, pero sin libro asignado aún, la tarjeta del grado no salía).
  const _hasReaders = !!(gkey && typeof READER_BOOKS !== 'undefined' && (READER_BOOKS[gkey]||[]).length);
  $('#main').innerHTML=`<h1>Hi, ${esc(p.first_name||p.full_name||'')} 👋</h1>
    <p class="muted" style="margin-top:-6px">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''}${p.cefr_level?' · Level '+esc(p.cefr_level):''} — What would you like to do today?</p>
    ${_bandaMiUnidad()}
    <div class="grid cols-2 track-grid" style="margin-top:16px">
      ${_trackCard('🏫','My classes',gLabel+': units'+(_hasReaders?', activities, readers':', activities')+' and unit exams',classesGo,['🎯 Units','🎲 Activities'].concat(_hasReaders?['📚 Readers']:[]))}
      ${_trackCard('🎓','Cambridge',camDesc,"window._nav('cambridge')",['📘 Course','🎯 Practice tests'])}
    </div>
    <div id="serie-card"></div>
    <h2 style="margin:22px 0 8px">More</h2>
    <div class="grid cols-3">
      ${_hubCard('🧰','Practice tools','Sounds, grammar and vocabulary games to train on your own.',"window._nav('tools')")}
      ${nodeVisible('general.library') ? _hubCard('📚','Library','NIS Library: search and explore the school library.',"window._nav('library')") : ''}
      ${nodeVisible('general.mun') ? _hubCard('🌐','MUN Academy','Model United Nations: debate, public speaking and diplomacy.',"window._nav('mun')") : ''}
      ${_hubCard('📊','My progress','Your results in mocks, practice tests and activities.',"window._nav('results')")}
      ${nodeVisible('french') ? _hubCard('🇫🇷','French','Pronunciation, Mocks, Classes and more.',"window._nav('french')") : ''}
    </div>`;
  // La tarjeta del curso de su etapa (Fun for Nordic / Nordic Ascent), a un
  // clic desde la portada: Paolo pidio que se encontrara sin buscarla.
  _pintaSerie('serie-card', 'home');
}

/* Helpers de unidades y arcos de proyecto (unitsNode, unitPlansFor,
   _verProyectos…): viven aquí, ANTES de ENGLISH_AREAS y de los nodos de
   acceso que los llaman al cargar — con app.js partido en módulos (app/)
   el hoisting ya no cruza archivos. Movidos desde Unidades el 17-sep-2026. */
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
/* El arco que esta corriendo hoy. Entre trimestres no hay ninguno vigente, y
   entonces vale el que VIENE, no el primero de la lista: en septiembre, entre
   el fin de un trimestre y el arranque del siguiente, la tarjeta llevaba al
   arco de marzo. Si ya no queda ninguno por venir, el ultimo del ano. */
function arcoActual(grade){
  const hoy = new Date().toISOString().slice(0,10);
  const todos = arcsFor(grade);
  const vigente = todos.filter(([,a])=>a.inicio<=hoy && hoy<=a.fin);
  if(vigente.length) return vigente[0][0];
  const proximo = todos.filter(([,a])=>a.inicio>hoy);
  if(proximo.length) return proximo[0][0];
  return todos.length ? todos[todos.length-1][0] : null;
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

/* ---------- Jerarquía de contenido: Materia → Área → Grado → Actividad ----------
   Las áreas de English se reflejan en French (placeholder hasta alimentarlas). */
/* Los bloques en que se reparten las areas. English era una parrilla de doce
   tarjetas seguidas donde todo pesaba igual: la unidad que se esta trabajando,
   un juego y el examen. Ahora van en cuatro bloques y en el orden del curso:
   primero lo que el alumno esta haciendo, con que entrena, el examen oficial
   y, al final, lo que ha sacado. Un bloque sin tarjetas no se pinta. */
const ENGLISH_BLOCKS = [
  {key:'work',     title:'🎯 My work',     desc:'What you are working on this term.'},
  {key:'practice', title:'🧠 Practice',    desc:'Train on your own: sounds, grammar and vocabulary games.'},
  {key:'exam',     title:'🎓 Cambridge',   desc:'The official exam and its practice.'},
  {key:'results',  title:'📊 My results',  desc:'Your final level and the report your family receives.'},
];
const ENGLISH_AREAS = [
  // Va la PRIMERA a proposito. Direccion dijo que la plataforma se leia como
  // un simulador de examenes, y tenia razon leyendo esta pantalla: de diez
  // tarjetas cuatro eran de examen y la palabra "unidad" no aparecia en
  // ninguna. El proyecto existia -- con su pregunta, su producto y su rubrica
  // -- pero a cinco clics: English > Classes > etapa > grado > Units > unidad.
  // Lo que ordena el curso tiene que verse antes que lo que lo mide.
  {emoji:'🎯', title:'My unit',       desc:'Your project this term: the big question, what you will produce, and how it is marked.', nav:'myunit', node:'english.classes', block:'work'},
  // Y el proyecto del trimestre justo detras: la unidad es una parte de el.
  // Silvia pregunto donde estaban los proyectos y la respuesta honesta era
  // que existian pero no se veian. Once semanas de trabajo no pueden vivir
  // dentro de una pagina de unidad a la que se llega por cinco clics.
  {emoji:'🧩', title:'My project',    desc:'The interdisciplinary project of this term: eleven weeks, and every subject pulling the same way.', nav:'projects', node:'english.classes', when:_verProyectos, block:'work'},
  {emoji:'🏫', title:'Classes',       desc:'Class material by grade: grammar, activities and more.',  nav:'classes',  node:'english.classes', block:'work'},
  {emoji:'🎙️', title:'Pronunciation', desc:'Listen to each sound, watch the tongue and airflow, and practise.', nav:'coach',    node:'english.pronunciation', block:'practice'},
  {emoji:'🔤', title:'Phonics',       desc:'Sounds and word shapes: CVC, blends, magic-e.',  nav:'phonics',  node:'english.phonics', block:'practice'},
  {emoji:'🎲', title:'Games Lab',     desc:'7 games per topic for grammar, vocabulary, phrasal verbs and idioms (A1–C1).', nav:'games', block:'practice'},
  {emoji:'🔗', title:'Phrasal Verbs',  desc:'331 phrasal verbs level by level, with the sentence from your own course.', nav:'phrasal', block:'practice'},
  {emoji:'🪢', title:'Collocations',   desc:'395 word partnerships level by level, measured in your own courses.', nav:'collocations', block:'practice'},
  {emoji:'💬', title:'Idioms',         desc:'290 expressions you cannot guess from their words. From B1 up.', nav:'idioms', block:'practice'},
  {emoji:'🧩', title:'Word Formation', desc:'Prefixes, suffixes and word families, with the sentence from your own course.', nav:'wordform', block:'practice'},
  {emoji:'📖', title:'NIS Dictionary',  desc:'Our own dictionary, 10,910 words: phonetics, audio, translation and the meaning written for your course.', nav:'dict', block:'practice'},
  {emoji:'🎮', title:'NIShoot Live',  desc:"Join your class's live game: enter with the PIN.",    nav:'nishoot', block:'practice'},
  // Las tres puertas del examen, juntas. Cambridge es el mapa (las dos ramas
  // y sus niveles); Mocks y Practice Tests son los atajos a los simulacros que
  // el alumno ya conoce por su nombre, y por eso no se retiran.
  {emoji:'🎓', icon:'main', title:'Cambridge', desc:'YLE and Main Suite: the official Cambridge route from Pre-A1 to C2, with practice tests.', nav:'cambridge', node:'english.cambridge', block:'exam'},
  {emoji:'🎓', title:'Mocks',         desc:'Official MOCK 1 and MOCK 2 exams by skill.',        nav:'mocks', block:'exam', when:()=>!_isStudent()},
  {emoji:'🎯', title:'Practice Tests',desc:'Practice tests 1, 2 and 3 in Cambridge format, always available.', nav:'practice', node:'english.practice', block:'exam'},
  // 'My Progress' NO esta aqui: vive en la barra lateral, que es donde el
  // alumno lo busca desde cualquier pantalla. Tenerlo en los dos sitios era
  // el duplicado mas visible de esta vista.
  {emoji:'🏅', title:'Final result',desc:'Your final CEFR level (report for parents) + PDF.',      nav:'final',   englishOnly:true, block:'results'},
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
  /* La U5 de 3.o salio del piloto el 9-sep-2026: es la unidad real del
     trimestre -once semanas, terremotos y tsunamis- y nace abierta como
     cualquier otra. La U6 se queda: ya no se ofrece. */
  'english.classes.g3.units.u6',
  'english.classes.g4.units.u5','english.classes.g4.units.u6',
  'english.classes.g5.units.u5','english.classes.g5.units.u6',
  /* La U5 de 9.o (Does Our School Run on Data?) salio del piloto el
     14-sep-2026: es la unidad real del trimestre. La U6 sigue en piloto. */
  'english.classes.g9.units.u106',
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
  if(error || !data) return alert('Could not open the student view: '+((error&&error.message)||'no data'));
  await _previewEnter({kind:'student', label:(data.full_name||name||'student'), backTab:'users'}, data);
};
window._previewGrade = async (gradeId)=>{
  if(!_canPreview()) return;
  const g = GRADES.find(x=>String(x.id)===String(gradeId));
  if(!g) return alert('Choose a grade.');
  /* Alumno sintético SIN id: así no hay overrides por alumno que consultar y
     los paneles de historial avisan en vez de consultar con id nulo. */
  await _previewEnter({kind:'grade', label:'sample student from '+g.name, backTab:'access'},
    {id:null, role:'student', full_name:'student from '+g.name, first_name:'student from '+g.name,
     last_name:'', section:null, cefr_level:null, grade_id:g.id, grades:{name:g.name}, active:true});
};
async function _previewEnter(meta, profile){
  state.realProfile = state.realProfile || state.profile;
  state.preview = meta;
  state.profile = profile;
  _previewClearHash();
  await renderStudent('home');
}
window._previewExit = (tabPedida)=>{
  const tab=tabPedida||(state.preview&&state.preview.backTab)||'users';
  // 👁 View as (95-view-as.js): la vista de profesor cambia teacher_access;
  // al salir se devuelve el real.
  if('_teacherAccessReal' in state){ state.teacherAccess = state._teacherAccessReal; state.teacherNodes = state._teacherNodesReal; delete state._teacherAccessReal; delete state._teacherNodesReal; }
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
    ? 'Sample student: only what the grade opens, with no per-student exceptions.'
    : m.kind==='teacher' ? 'Teacher panel with every grade. Anything you mark here is saved under your own account.'
    : m.kind==='parent' ? 'What the family receives about this student.'
    : 'With their per-student exceptions.';
  return `<div class="preview-bar">
    <span>👁️ You are viewing the portal as <b>${esc(m.label)}</b></span>
    <span class="pv-note">${note} Read only.</span>
    <button class="btn sm" onclick="window._previewExit()">✕ Exit view</button></div>`;
}
/* Aviso en los paneles que necesitan un alumno concreto (modo por grado). */
function _previewNeedsStudent(title, back){
  $('#main').innerHTML=`${back||''}<h1>${title}</h1>
    <div class="note">This view is a student’s personal history, so there is no data to
      show in the <b>by-grade view</b>. Exit the view and enter from
      <b>👥 Users → 👁️ View as</b> with a specific student.</div>`;
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
      {key:'words', icon:'reading', name:'Word Trainer', cefr:'All levels · vocabulary', short:'Word Trainer',
       desc:'The official YLE word list by topic, with pictures and audio: learn cards, flip & recall and a memory game. Switch level inside (Starters · Movers · Flyers).', href:'yle-vocab.html?level=starters'},
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

/* Fase 2 WP-B: las tres puertas de la pista Cambridge (Course / Practice
   tests / Mocks), ya sabiendo el grado del alumno. Solo se pintan para un
   alumno con grado (o una vista-como-alumno con grado sintetico) — el
   profesor/admin en su propio perfil siguen viendo la pista de siempre, sin
   este bloque, porque no hay UN grado del que deducir "su" ruta. Cada
   puerta respeta el mismo nodeVisible que ya gateaba su vista de siempre:
   no abre nada que hoy este cerrado. */
const _YLE_TEST_KEY = {starters:'starterstests', movers:'moverstests', flyers:'flyerstests'};
function _camDoorsHTML(route){
  const info = _camGradeInfo();
  if(!_isStudent() || !info) return '';
  let courseDoor, testsDoor;
  if(info.primary){
    const lvl = info.level, key = info.key;
    const lvlMeta = CAMBRIDGE_TRACKS.yle.levels.find(l=>l.key===lvl);
    const testMeta = CAMBRIDGE_TRACKS.yle.levels.find(l=>l.key===_YLE_TEST_KEY[lvl]);
    if(key==='g5'){
      // Mismo candado que studentGradeFlyers, que es adonde lleva esta puerta.
      courseDoor = nodeVisible('english.classes.g5')
        ? _hubCard('🦅','Course','The A2 Flyers course, sorted by the unit you are working on.',"window._nav('classes_g5_flyers')")
        : _lockedCard('🦅','Course','The A2 Flyers course by unit.');
    } else {
      courseDoor = (lvlMeta && nodeVisible(lvlMeta.node))
        ? _hubCard('📘','Course',lvlMeta.desc,"location.href='"+_withBack(lvlMeta.href,route)+"'")
        : _lockedCard('📘','Course','Your Cambridge course.');
    }
    testsDoor = (testMeta && nodeVisible(testMeta.node))
      ? _hubCard('🎯','Practice tests',testMeta.desc,"location.href='"+_withBack(testMeta.href,route)+"'")
      : _lockedCard('🎯','Practice tests','Practice tests for your level.');
  } else {
    // Secundaria: la puerta es la tarjeta de Nordic Ascent, con un boton por
    // curso del grado (A1 Foundations incluido) y, en 9.º, la practica B2
    // First por destreza que antes ocupaba la puerta entera.
    courseDoor = _secSerieCardHTML(route, true)
      || _lockedCard(SEC_SERIE.em,'Course','Your Cambridge course.');
    testsDoor = nodeVisible(CAMBRIDGE_PRACTICE_NODE)
      ? _hubCard('🎯','Practice tests','Reading, Listening and Writing in Cambridge format, always available.',"location.href='"+_withBack(QUIZ_URL+'quizzes.html',route)+"'")
      : _lockedCard('🎯','Practice tests','Cambridge practice tests.');
  }
  // La puerta «Mocks» es solo del staff (vista previa): el alumno ya no ve
  // una tarjeta de mocks bloqueada — el dia del mock su portada ES el mock
  // (mock mode, app/62-mock-mode.js).
  const mocksDoor = _isStudent() ? '' : _hubCard('🎓','Mocks','MOCK 1 and MOCK 2 in official Cambridge format.',"window._nav('mocks')");
  return `<h2 style="margin:4px 0 8px">Your route: ${esc(info.label)}</h2>
    <div class="grid cols-3" style="margin-bottom:18px">${courseDoor}${testsDoor}${mocksDoor}</div>`;
}
async function studentCambridgePortal(){
  // Cambridge es ahora una pestaña de primer nivel (peer de Home): sin
  // «atrás», igual que Mocks o Practice Tests ya no lo tenian.
  _setNav(_isStudent() ? 'cambridge' : 'cambridgehub');
  const back = '';
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
    <a class="cam-practice" href="${_withBack(QUIZ_URL+'quizzes.html',route)}">
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
    ${_camDoorsHTML(route)}
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
    const txt = isNaN(d) ? x.date : d.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
    caja.innerHTML = `<div class="cam-plan"><b>🗓️ Official Cambridge exam:</b> ${esc(txt)}${x.note ? ' · ' + esc(x.note) : ''}</div>`;
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
      <button class="btn sm ${_planTab==='grades'?'':'ghost'}" onclick="window._planGo('grades')">🏫 By grade</button>
      <button class="btn sm ${_planTab==='epi'?'':'ghost'}" onclick="window._planGo('epi')">🧑‍🎓 Students with individual plan (EPI)</button>
      <span style="flex:1"></span>
      <button class="btn sm ghost" onclick="studentCambridgePortal()">👁️ View the Cambridge card</button>
    </div>`;
  $('#main').innerHTML = `<h1>📋 Study plan — Cambridge</h1>
    <div class="note">Here you decide <b>which part of YLE and Main Suite each grade sees</b> and, below, what <b>each student with an individual plan (EPI)</b> sees. A checked box = that material is offered; unchecked = locked. Anything never touched is open, like the rest of the access settings. The instructions you write appear to the student above their Cambridge card.</div>
    ${tabs}<div id="plan-body"><div class="center muted">Loading…</div></div>`;
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
  const head1 = `<tr><th rowspan="2">Grade</th><th rowspan="2" title="General switch for the card">🎓<br>Cambridge</th>`
    + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
        return `<th class="plan-track" colspan="${b.levels.length + 1}" style="background:${b.color}">${b.title}</th>`; }).join('')
    + `<th rowspan="2">🎯<br>Practice</th><th rowspan="2" style="min-width:260px">Instructions for the grade</th></tr>`;
  const head2 = `<tr>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
        return `<th title="Whole branch">Branch</th>` + b.levels.map(l => `<th>${esc(l.short)}</th>`).join(''); }).join('') + `</tr>`;
  const rows = GRADES.map(g => {
    const pOn = Object.prototype.hasOwnProperty.call(prac, g.id) ? !!prac[g.id] : true;
    const ref = 'g:' + g.id;
    return `<tr data-g="${g.id}"><td><b>${g.name}</b></td>${chk(g.id,'english.cambridge')}`
      + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
          return chk(g.id, b.node) + b.levels.map(l => chk(g.id, l.node)).join(''); }).join('')
      + `<td class="${pOn?'':'plan-off'}"><input type="checkbox" ${pOn?'checked':''} onchange="window._planSetPractice(${g.id},this.checked,this)"></td>`
      + `<td style="text-align:left"><textarea class="plan-note" data-ref="${ref}" placeholder="E.g.: This term: Movers units 1–10 and Flyers Tests 1–3.">${esc(notas[ref]||'')}</textarea>
           <div class="row" style="gap:6px;margin-top:4px;align-items:center"><button class="btn sm" onclick="window._planNoteSave('grade','${ref}',${g.id},null,this)">Save</button><span class="muted plan-note-st" style="font-size:.78rem"></span></div></td></tr>`;
  }).join('');
  $('#plan-body').innerHTML = `
    <div class="row" style="gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:center">
      <button class="btn sm" onclick="window._planReparto()">✨ Apply suggested distribution</button>
      <button class="btn sm ghost" onclick="window._planAbrirTodo()">🔓 Open all</button>
      <span class="muted" style="font-size:.82rem">The suggested distribution follows the Framework level of each grade (G1–G2 Starters · G3–G4 Movers · G5 Flyers + KET · G6 KET/PET · G7–G8 PET/FCE · G9–G11 FCE/CAE, and CPE only in G11). It can be corrected box by box afterwards.</span>
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
  if(error){ alert('Could not save: ' + error.message); el.checked = !to; return; }
  el.closest('td').classList.toggle('plan-off', !to);
};
window._planSetPractice = async (gradeId, to, el) => {
  el.disabled = true;
  const { error } = await sb.from('practice_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(),
      updated_by:(state.session&&state.session.user&&state.session.user.id)||null }, { onConflict:'grade_id' });
  el.disabled = false;
  if(error){ alert('Could not save: ' + error.message); el.checked = !to; return; }
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
  if(error){ if(st) st.textContent = ''; alert('Could not save: ' + error.message); return; }
  if(st){ st.textContent = '✓ Saved'; setTimeout(() => { st.textContent = ''; }, 2500); }
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
    return `${g.name} → ${abre.length ? abre.join(', ') : '(nothing)'}`;
  });
  if(!await NISUI.pregunta('This will be written for ALL grades: whatever does not appear for a grade is closed for that grade. It can be adjusted box by box afterwards.', {titulo:'Apply to all grades?', si:'Write', no:'Cancel', tono:'ojo', detalle: lineas.join('\n')})) return;
  const ahora = new Date().toISOString(), uid = (state.session&&state.session.user&&state.session.user.id)||null;
  const rows = GRADES.flatMap(g => _planFilasReparto(g.id).map(f => ({ grade_id:g.id, node_key:f.node_key, unlocked:f.unlocked, updated_at:ahora, updated_by:uid })));
  const { error } = await sb.from('node_access').upsert(rows, { onConflict:'grade_id,node_key' });
  if(error){ alert('Could not apply: ' + error.message); return; }
  studyPlanPanel();
};
window._planAbrirTodo = async () => {
  if(!await NISUI.pregunta('This opens ALL Cambridge material for all grades. Per-student exceptions are kept.', {titulo:'Open all Cambridge?', si:'Open all', no:'Cancel', tono:'ojo'})) return;
  const ahora = new Date().toISOString(), uid = (state.session&&state.session.user&&state.session.user.id)||null;
  const keys = ['english.cambridge', ..._CAMBRIDGE_NODES.map(n => n.key)];
  const rows = GRADES.flatMap(g => [...new Set(keys)].map(k => ({ grade_id:g.id, node_key:k, unlocked:true, updated_at:ahora, updated_by:uid })));
  const { error } = await sb.from('node_access').upsert(rows, { onConflict:'grade_id,node_key' });
  if(error){ alert('Could not apply: ' + error.message); return; }
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
      <td class="acts"><div class="acts-wrap"><button class="btn sm ${_planStudent===p.id?'':'ghost'}" onclick="window._planOpenStudent('${p.id}')">🔧 Their plan</button>
          <button class="btn sm ghost" onclick="window._planEpiFlag('${p.id}',false)">✕ Remove</button></div></td></tr>`;
  $('#plan-body').innerHTML = `
    <div class="grid cols-2" style="align-items:start">
      <div class="card" style="margin:0">
        <h2 style="font-size:1.05rem;margin:0 0 8px">Students with individual plan</h2>
        <p class="muted" style="font-size:.84rem;margin:0 0 10px">An EPI student inherits what applies to their grade, and here you define their exception: what is open, what is not, and their instructions.</p>
        <div style="overflow-x:auto"><table><tbody>${epi.map(fila).join('') || '<tr><td class="muted center" colspan="3">No students marked yet. Search for them on the right and mark them.</td></tr>'}</tbody></table></div>
      </div>
      <div class="card" style="margin:0">
        <h2 style="font-size:1.05rem;margin:0 0 8px">➕ Mark a student as EPI</h2>
        <input type="search" value="${esc(_planFiltro)}" placeholder="Student name or email…" style="width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:var(--r-sm);font:inherit"
               oninput="window._planBuscar(this.value)">
        <div id="plan-cands" style="margin-top:8px">${candidatos.map(p => `<div class="row" style="justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--line)">
            <span>${esc(p.full_name||p.email)} <span class="muted" style="font-size:.8rem">· ${esc(p.grades?.name||'—')}${p.section?' '+esc(p.section):''}</span></span>
            <button class="btn sm" onclick="window._planEpiFlag('${p.id}',true)">Mark EPI</button></div>`).join('')
          || (f ? '<div class="muted" style="font-size:.84rem">No results (or already marked).</div>' : '')}</div>
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
  if(!to && !await NISUI.pregunta('The student goes back to their grade’s plan. Their Cambridge exceptions and instructions are deleted.', {titulo:'Remove the individual plan?', si:'Remove', no:'Cancel', tono:'mal', peligro:true})) return;
  const { error } = await sb.from('profiles').update({ individual_plan:to }).eq('id', sid);
  if(error){ alert('Could not save: ' + error.message); return; }
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
  box.innerHTML = `<div class="center muted">Loading…</div>`;
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
      <div class="muted" style="font-size:.66rem;margin-top:2px">${gradeOn(k)?'grade ✓':'grade ✕'}${Object.prototype.hasOwnProperty.call(sm,k)?' · exc.':''}</div></td>`;
  const head1 = `<tr><th rowspan="2">🎓<br>Cambridge</th>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return `<th class="plan-track" colspan="${b.levels.length + 1}" style="background:${b.color}">${b.title}</th>`; }).join('') + `</tr>`;
  const head2 = `<tr>` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return `<th>Rama</th>` + b.levels.map(l => `<th>${esc(l.short)}</th>`).join(''); }).join('') + `</tr>`;
  const row = `<tr>${celda('english.cambridge')}` + Object.keys(CAMBRIDGE_TRACKS).map(bk => { const b = CAMBRIDGE_TRACKS[bk];
      return celda(b.node) + b.levels.map(l => celda(l.node)).join(''); }).join('') + `</tr>`;
  box.innerHTML = `<div class="card" style="border-top:5px solid #7c3aed">
    <div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
      <div><h2 style="margin:0;font-size:1.1rem">${esc(p.full_name||p.email)} <span class="epi-tag">EPI</span></h2>
        <div class="muted" style="font-size:.84rem">${esc(p.grades?.name||'—')}${p.section?' · '+esc(p.section):''} · inherits from the grade; every box you change here becomes their exception.</div></div>
      <button class="btn sm ghost" onclick="window._planQuitarExcepciones('${p.id}')">↺ Back to the grade’s plan</button>
    </div>
    <div style="overflow:auto;margin-top:10px"><table class="plan-grid"><thead>${head1}${head2}</thead><tbody>${row}</tbody></table></div>
    <div class="plan-note-wrap" style="margin-top:12px">
      <label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:4px;color:var(--grey)">INSTRUCTIONS FOR THIS STUDENT (shown above their Cambridge card)</label>
      <textarea class="plan-note" placeholder="E.g.: Work on Movers units 5–12 and do Flyers Test 1 this week. Ignore Main Suite for now.">${esc((sp.data&&sp.data.note)||'')}</textarea>
      <div class="row" style="gap:6px;margin-top:4px;align-items:center"><button class="btn sm" onclick="window._planNoteSave('student','s:${p.id}',null,'${p.id}',this)">Save</button><span class="muted plan-note-st" style="font-size:.78rem"></span></div>
    </div></div>`;
}
window._planSetStudent = async (sid, key, to, el) => {
  el.disabled = true;
  const { error } = await sb.rpc('set_student_access', { p_student:sid, p_node:key, p_unlocked:to });
  el.disabled = false;
  if(error){ alert('Could not save: ' + error.message); el.checked = !to; return; }
  el.closest('td').classList.toggle('plan-off', !to);
  const hint = el.nextElementSibling; if(hint && hint.textContent.indexOf('exc.') < 0) hint.textContent += ' · exc.';
};
window._planQuitarExcepciones = async (sid) => {
  if(!await NISUI.pregunta('This student’s Cambridge exceptions are deleted: they go back to seeing exactly what their grade has.', {titulo:'Delete the exceptions?', si:'Delete', no:'Cancel', tono:'mal', peligro:true})) return;
  const keys = ['english.cambridge', ..._CAMBRIDGE_NODES.map(n => n.key)];
  const { error } = await sb.from('student_access').delete().eq('student_id', sid).in('node_key', keys);
  if(error){ alert('Could not delete: ' + error.message); return; }
  _planEpi();
};