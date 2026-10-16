/* ===================== COLEGIO DE MUESTRA (sample.cohasset.pe) =====================
   16-oct-2026. Todo lo de este archivo corre SOLO cuando schoolIsSample() es
   true: NIS y los demás colegios no pasan por aquí (cada puerta de entrada —
   studentHub, studentPractice, studentMocks, studentResults, la ruta help y la
   barra del alumno— pregunta antes de llamar a nada de esto).

   Por qué un archivo aparte: la muestra es lo que se enseña a un colegio para
   venderle Cohasset Schools, y su portada, sus pantallas de examen y su
   progreso han ido divergiendo de las de NIS (otro público, otra promesa). Tener
   sus vistas juntas evita salpicar de «if(schoolIsSample())» las de NIS.

   Piezas:
   · Nivel elegido (A2 · B1 · B2 · C1) en localStorage 'cohSampleLevel',
     compartido por portada, Practice y Mocks.
   · Practice / Mocks: una fila por test con su estado (sale de sample_attempts).
   · Portada «panel del candidato» con anillo de progreso y tour guiado.
   · My Progress visual (barras al 60 %, escala Cambridge, mini-gráfico) y
     resultados de EJEMPLO en sessionStorage, que nunca tocan la base.
   · Ayuda propia, sin nada de NIS. */

const SMP_LEVELS = [
  {k:'A2', name:'A2 Key',         low:120},
  {k:'B1', name:'B1 Preliminary', low:140},
  {k:'B2', name:'B2 First',       low:160},
  {k:'C1', name:'C1 Advanced',    low:180},
];
/* Destrezas de la muestra. A2 Key no tiene examen de Writing suelto: va dentro
   del papel «Reading & Writing», así que Writing solo existe de B1 a C1 (en
   Practice y en Mocks, que el motor tiene los mismos bancos). */
const SMP_SKILLS = [
  {sk:'Reading',   file:'reading-quiz.html',   ico:'file-text', title:'Reading & Use of English',
   desc:'Cambridge-format texts and tasks, marked as soon as you finish.'},
  {sk:'Listening', file:'listening-quiz.html', ico:'headphone', title:'Listening',
   desc:'Real exam audio with the Cambridge timing. Use headphones.'},
  {sk:'Writing',   file:'writing-quiz.html',   ico:'pencil',    title:'Writing', levels:['B1','B2','C1'],
   desc:'Part 1 + Part 2 of your choice, marked by the AI examiner with the Cambridge criteria.'},
];
/* Duración de cada papel en el examen digital de Cambridge (minutos). Es la
   referencia que se enseña al alumno, no un cronómetro: el motor lleva el suyo. */
/* Gotham (la fuente del portal) no trae «≈»: lo pinta como otra cosa. En el
   texto visible va en un span con la fuente del sistema. */
const SMP_AP = '<span class="smp-ap">≈</span>';
const SMP_MIN = { Reading:{A2:60,B1:45,B2:75,C1:90}, Listening:{A2:35,B1:30,B2:40,C1:40}, Writing:{B1:45,B2:80,C1:90} };
const SMP_FAM = {
  practice:{route:'practice', branch:'practice', content:'practice', tests:['practice','practice2'], title:'Practice Tests', emoji:'🎯'},
  mock:    {route:'mocks',    branch:'mocks',    content:'mock',     tests:['mock01','mock02'],      title:'Mocks',          emoji:'🎓'},
};

/* Cada pantalla de la muestra lee sample_attempts antes de pintar del todo. Si
   el alumno cambia de pantalla mientras tanto, la lectura vieja no debe pisar
   la nueva: cada render coge un número y solo pinta si sigue siendo el último. */
let _smpGen = 0;

/* ---------- nivel elegido ---------- */
function _smpLv(s){ const m = /\b(A2|B1|B2|C1|C2)\b/i.exec(String(s||'')); return m ? m[1].toUpperCase() : null; }
function _smpLevel(){
  let v = null;
  try{ v = localStorage.getItem('cohSampleLevel'); }catch(_){}
  if(SMP_LEVELS.some(l=>l.k===v)) return v;
  const p = _smpLv((state.profile||{}).cefr_level);
  return SMP_LEVELS.some(l=>l.k===p) ? p : 'B1';
}
function _smpLevelName(k){ const l = SMP_LEVELS.find(x=>x.k===k); return l ? l.name : k; }
/* Fichas de nivel. view = la pantalla que se repinta al cambiar (hub|practice|mocks). */
function _smpLevelChips(view){
  const cur = _smpLevel();
  return `<div class="smp-levels" role="group" aria-label="Target level">${SMP_LEVELS.map(l=>
    `<button type="button" class="smp-lv${l.k===cur?' on':''}" aria-pressed="${l.k===cur}"
       onclick="window._smpLevelSet('${l.k}','${view}')"><b>${l.k}</b> <span>${l.name.slice(3)}</span></button>`).join('')}</div>`;
}
window._smpLevelSet = function(k, view){
  try{ localStorage.setItem('cohSampleLevel', k); }catch(_){}
  if(view==='hub') return _sampleHub(state.profile||{});
  if(view==='practice') return samplePractice('practice');
  if(view==='mocks') return samplePractice('mock');
};

/* ---------- catálogo de la muestra y estado de cada test ---------- */
/* Qué ofrece la muestra: piezas encendidas (school_content) × tests que deja
   el recorte (school_content.scope.tests, los mismos ids que lee el motor en
   nis-bridge.js) × niveles. Sin recorte, los dos tests de la familia. */
function _smpTests(fam, sk){
  const sc = typeof schoolScope==='function' ? schoolScope(SMP_FAM[fam].content+'.'+sk.toLowerCase()) : null;
  return (sc && Array.isArray(sc.tests) && sc.tests.length) ? sc.tests : SMP_FAM[fam].tests;
}
function _smpSkillLevels(fam, s){
  const sc = typeof schoolScope==='function' ? schoolScope(SMP_FAM[fam].content+'.'+s.sk.toLowerCase()) : null;
  let lv = s.levels || SMP_LEVELS.map(l=>l.k);
  if(sc && Array.isArray(sc.levels) && sc.levels.length) lv = lv.filter(x=>sc.levels.indexOf(x)>=0);
  return lv;
}
function _smpSkillsOn(fam){ return SMP_SKILLS.filter(s=>schoolContentOK(SMP_FAM[fam].content+'.'+s.sk.toLowerCase())); }
function _smpCatalog(fam){
  const out = [];
  _smpSkillsOn(fam).forEach(s=>_smpSkillLevels(fam,s).forEach(lv=>_smpTests(fam,s.sk).forEach(t=>out.push({fam, sk:s.sk, lv, test:t}))));
  return out;
}
/* El id del test en el enlace (mock01) no es el que guarda el intento (mock1). */
function _smpAttKey(test){ return String(test).replace(/^mock0*(\d+)$/,'mock$1'); }
function _smpTestLabel(test){
  const m = /^mock0*(\d+)$/.exec(test); if(m) return 'MOCK '+m[1];
  const p = /^practice(\d*)$/.exec(test); if(p) return 'Practice '+(p[1]||'1');
  return String(test);
}
function _smpAttsFor(atts, sk, lv, test){
  const key = _smpAttKey(test);
  return (atts||[]).filter(a=>a && a.skill===sk && _smpLv(a.level)===lv && String(a.mock||'practice')===key);
}
function _smpDoneCount(atts, cat){ return cat.filter(c=>_smpAttsFor(atts,c.sk,c.lv,c.test).length).length; }
/* Los intentos de la muestra (sample_attempts). Una lectura por pantalla; si
   falla, la pantalla se pinta igual con todo en «Start». */
async function _smpAtts(){
  const p = state.profile||{};
  if(!p.id || typeof _sampleResults!=='function') return [];
  try{ const r = await _sampleResults(p.id); return (r && r.exam) || []; }catch(_){ return []; }
}
function _smpHref(fam, s, lv, test){
  return _withBack(QUIZ_URL+s.file+'?branch='+SMP_FAM[fam].branch+'&level='+encodeURIComponent(lv)+'&test='+encodeURIComponent(test), SMP_FAM[fam].route);
}

/* ---------- Practice / Mocks ---------- */
async function samplePractice(fam){
  const F = SMP_FAM[fam], gen = ++_smpGen;
  _setNav(F.route);
  const lv = _smpLevel();
  const intro = fam==='mock'
    ? 'MOCK 1 and MOCK 2 of each level: a full timed paper per skill, as on exam day. Writing is marked by the AI examiner.'
    : 'Practice 1 and 2 of each level in the digital Cambridge format — always available, marked at once.';
  const head = `<h1>${F.emoji} ${fam==='mock'?'Cambridge Mocks':'Practice Tests'}</h1>
    <p class="muted smp-sub">${intro} Your results are saved in My progress.</p>
    <div class="smp-levelbar"><span class="smp-levelbar-l">Your level</span>${_smpLevelChips(F.route)}</div>`;
  $('#main').innerHTML = head + `<p class="muted">Loading…</p>`;
  const atts = await _smpAtts();
  if(gen!==_smpGen) return;   // el alumno ya se fue a otra pantalla
  const cards = _smpSkillsOn(fam).map(s=>{
    const title = (s.sk==='Reading' && lv==='A2') ? 'Reading & Writing' : s.title;
    const lvs = _smpSkillLevels(fam, s);
    let rows;
    if(lvs.indexOf(lv)<0){
      rows = `<li class="smp-test smp-test-note">${s.sk==='Writing' && lv==='A2'
        ? 'At A2 Key, Writing is part of the <b>Reading &amp; Writing</b> paper.'
        : 'Not available at '+esc(_smpLevelName(lv))+' in this sample.'}</li>`;
    } else {
      rows = _smpTests(fam, s.sk).map(t=>{
        const done = _smpAttsFor(atts, s.sk, lv, t);
        const scored = done.filter(a=>a.percent!=null);
        const best = scored.length ? Math.max(...scored.map(a=>+a.percent)) : null;
        const st = !done.length ? '<span class="smp-pill">Not started</span>'
          : best!=null ? `<span class="smp-pill${best>=60?' ok':''}">✓ ${Math.round(best)} %</span>` : '<span class="smp-pill ok">✓ Done</span>';
        const min = (SMP_MIN[s.sk]||{})[lv];
        return `<li class="smp-test">
          <div class="smp-test-name"><b>${esc(_smpTestLabel(t))}</b>${min?`<span class="muted">⏱ ${min} min</span>`:''}</div>
          ${st}
          <a class="btn sm${done.length?' ghost':''} smp-test-go" href="${_smpHref(fam,s,lv,t)}">${done.length?'Retake':'Start'}</a>
        </li>`;
      }).join('');
    }
    return `<section class="card smp-skill">
      <div class="smp-skill-h">${ico3d(s.ico,52)}<div><h2>${title}</h2><div class="muted">${esc(_smpLevelName(lv))} · ${s.desc}</div></div></div>
      <ul class="smp-tests">${rows}</ul>
    </section>`;
  }).join('');
  $('#main').innerHTML = head + `<div class="smp-skills">${cards}</div>`;
}

/* ---------- Portada: panel del candidato ---------- */
function _smpRing(done, total){
  const r = 42, c = 2*Math.PI*r, f = total ? Math.min(1, done/total) : 0;
  return `<svg class="smp-ring" viewBox="0 0 100 100" role="img" aria-label="${done} of ${total} tests done">
    <circle class="tr" cx="50" cy="50" r="${r}"/>
    <circle class="pr" cx="50" cy="50" r="${r}" stroke-dasharray="${(c*f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/>
    <text x="50" y="49" text-anchor="middle" class="n">${done}</text>
    <text x="50" y="65" text-anchor="middle" class="d">of ${total}</text></svg>`;
}
/* Tarjeta homogénea: icono, título, texto, etiqueta de estado y CTA abajo. */
function _smpCard(o){
  return `<div class="card smp-card" data-tour="${o.tour||''}" tabindex="0" role="button" aria-label="${esc(o.title)} — ${esc(o.cta.replace(/[→↗]/g,'').trim())}"
      onclick="${o.go}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${o.go}}">
    <div class="smp-card-ico">${ico3d(o.ico,64)}</div>
    <h2>${esc(o.title)}</h2>
    <div class="muted smp-card-d">${o.desc}</div>
    <div class="smp-card-meta">${(o.tags||[]).map(t=>`<span class="smp-pill${t.ok?' ok':''}">${t.t}</span>`).join('')}</div>
    <span class="smp-cta">${o.cta}</span>
  </div>`;
}
async function _sampleHub(p){
  const gen = ++_smpGen;
  _setNav('home');
  const lv = _smpLevel();
  const catP = _smpCatalog('practice'), catM = _smpCatalog('mock');
  const total = catP.length + catM.length;
  const paint = (atts, cargando)=>{
    const dP = _smpDoneCount(atts, catP), dM = _smpDoneCount(atts, catM);
    const fam = (cat, d)=>{
      const per = cat.length ? Math.max(...SMP_SKILLS.map(s=>_smpTests(cat[0].fam, s.sk).length)) : 0;
      return [{t: per+' tests per skill · A2–C1'}, cargando ? {t:'…'} : d ? {t:d+'/'+cat.length+' done', ok:true} : {t:'Not started'}];
    };
    const cards = [];
    if(catP.length) cards.push(_smpCard({tour:'practice', ico:'target', title:'Practice Tests', go:"window._nav('practice')",
      desc:'Practice 1 and 2 of each level — A2 Key, B1 Preliminary, B2 First, C1 Advanced — marked at once.',
      tags:fam(catP,dP), cta: dP ? 'Open →' : 'Start →'}));
    if(catM.length) cards.push(_smpCard({tour:'mocks', ico:'medal', title:'Mocks', go:"window._nav('mocks')",
      desc:'MOCK 1 and MOCK 2 of each level: a full timed paper per skill. Writing is marked by the AI examiner.',
      tags:fam(catM,dM), cta: dM ? 'Open →' : 'Start →'}));
    const tools = ['tool.phrasal','tool.collocations','tool.idioms','tool.wordform'].filter(k=>schoolContentOK(k)).length;
    if(tools) cards.push(_smpCard({tour:'tools', ico:'tool', title:'Practice tools', go:"window._nav('tools')",
      desc:'Phrasal verbs, collocations, idioms and word formation: study, practise and play.',
      tags:[{t:tools+(tools===1?' tool':' tools')},{t:'A2–C1'}], cta:'Open →'}));
    if(schoolContentOK('news.daily')) cards.push(_smpCard({tour:'news', ico:'text', title:newsName(), go:"window._nav('news')",
      desc:'A daily newspaper at four levels with Cambridge-style questions.',
      tags:[{t:'New issue every day'},{t:'A2 · B1 · B2 · C1'}], cta:'Open →'}));
    cards.push(_smpCard({tour:'info', ico:'bookmark-fav', title:'Cambridge info', go:"window._nav('caminfo')",
      desc:'Every exam from A2 Key to C2 Proficiency: papers, timing, scoring and the Cambridge Scale.',
      tags:[{t:'A2 Key → C2 Proficiency'}], cta:'Open →'}));
    IELTS_PIECES.filter(x=>schoolContentOK(x.key)).forEach(x=>cards.push(_smpCard({ico:x.key==='ielts.writing'?'pencil':(x.key==='ielts.cbt'?'rocket':'explorer'),
      title:x.title, go:`window._ssoCohasset('${x.href}')`,
      desc:esc(x.desc.replace(/\s*Opens on cohasset\.pe.*$/,'')),
      tags:[{t:'Opens on cohasset.pe ↗'}], cta:'Open ↗'})));
    const n = (atts||[]).length;
    cards.push(_smpCard({tour:'progress', ico:'chart', title:'My progress', go:"window._nav('results')",
      desc:'Your best score per skill, your estimate on the Cambridge Scale and every attempt.',
      tags:[cargando ? {t:'…'} : n ? {t:n+' attempt'+(n===1?'':'s'), ok:true} : {t:'No results yet'}], cta:'Open →'}));
    const d = dP + dM;
    $('#main').innerHTML = `<section class="card smp-band">
        <div class="smp-band-main">
          <h1>Hi, ${esc(p.first_name||p.full_name||'')} 👋</h1>
          <p class="muted">This is a <b>sample</b> of Cohasset Schools: Cambridge practice tests and mocks from A2 to C1, each working from start to finish.</p>
          <div class="smp-levelbar"><span class="smp-levelbar-l">Target level</span>${_smpLevelChips('hub')}</div>
          <button type="button" class="btn ghost sm smp-tour-btn" onclick="window._smpTour()">▶ Take the tour</button>
        </div>
        <div class="smp-band-ring">${_smpRing(cargando?0:d, total)}
          <div class="muted">tests done<br><small>${catP.length} practice · ${catM.length} mock papers</small></div></div>
      </section>
      <div class="smp-cards">${cards.join('')}</div>`;
  };
  paint([], true);
  const atts = await _smpAtts();
  if(gen===_smpGen && !document.querySelector('.smp-tour-bubble')) paint(atts, false);
}

/* ---------- Tour guiado (4 pasos) ----------
   Resalta la tarjeta con un «foco» (sombra enorme alrededor) y una burbuja con
   Back / Next / Skip. Teclado: Escape cierra, ← → cambian de paso y el Tab no
   se escapa de la burbuja. Una capa transparente encima impide pulsar la
   tarjeta resaltada a mitad del tour. */
const SMP_TOUR = [
  {sel:'[data-tour="practice"]', t:'Practice tests', x:'Practice 1 and 2 of every level, from A2 Key to C1 Advanced. Choose your level at the top, pick a skill and start: Reading and Listening are marked as soon as you finish.'},
  {sel:'[data-tour="mocks"]', t:'Mocks with AI marking', x:'A full timed paper per skill, as on exam day. Your Writing is marked by the AI examiner with the four Cambridge criteria, with feedback on every part.'},
  {sel:'[data-tour="tools"],[data-tour="news"]', t:'Practice tools & the newspaper', x:'Train between tests: phrasal verbs, collocations, idioms and word formation, plus a daily newspaper at four levels with Cambridge-style questions.'},
  {sel:'[data-tour="progress"]', t:'My progress', x:'Every attempt lands here: your best score per skill, an estimate on the Cambridge Scale and your latest results.'},
];
let _smpTourI = -1, _smpTourBack = null;
window._smpTour = function(){
  if(!document.querySelector('.smp-band')){ window._nav('home'); setTimeout(window._smpTour, 400); return; }
  _smpTourBack = document.activeElement;
  _smpTourI = 0;
  document.addEventListener('keydown', _smpTourKey, true);
  window.addEventListener('resize', _smpTourPlace);
  _smpTourShow();
};
function _smpTourSteps(){ return SMP_TOUR.filter(s=>document.querySelector(s.sel)); }
function _smpTourShow(){
  const steps = _smpTourSteps();
  if(!steps.length || _smpTourI<0 || _smpTourI>=steps.length) return _smpTourEnd();
  const s = steps[_smpTourI], el = document.querySelector(s.sel);
  document.querySelectorAll('.smp-tour-on').forEach(e=>e.classList.remove('smp-tour-on'));
  el.classList.add('smp-tour-on');
  let cap = document.querySelector('.smp-tour-cap');
  if(!cap){ cap = document.createElement('div'); cap.className = 'smp-tour-cap'; document.body.appendChild(cap); }
  let b = document.querySelector('.smp-tour-bubble');
  if(!b){
    b = document.createElement('div'); b.className = 'smp-tour-bubble';
    b.setAttribute('role','dialog'); b.setAttribute('aria-modal','true'); b.setAttribute('aria-labelledby','smpTourT'); b.setAttribute('aria-describedby','smpTourX');
    document.body.appendChild(b);
  }
  const last = _smpTourI===steps.length-1;
  b.innerHTML = `<div class="smp-tour-step">Step ${_smpTourI+1} of ${steps.length}</div>
    <h3 id="smpTourT">${s.t}</h3><p id="smpTourX">${s.x}</p>
    <div class="smp-tour-btns">
      <button type="button" class="btn sm ghost" data-a="skip">Skip</button><span class="sp"></span>
      ${_smpTourI ? '<button type="button" class="btn sm ghost" data-a="back">Back</button>' : ''}
      <button type="button" class="btn sm" data-a="next">${last?'Finish':'Next'}</button>
    </div>`;
  b.querySelectorAll('button').forEach(x=>x.onclick=()=>{
    const a = x.dataset.a;
    if(a==='skip') return _smpTourEnd();
    _smpTourI += a==='back' ? -1 : 1;
    if(_smpTourI>=steps.length) return _smpTourEnd();
    _smpTourShow();
  });
  // En móvil la burbuja va anclada abajo: la tarjeta sube arriba para que no la tape.
  if(window.innerWidth<=600){ el.scrollIntoView({block:'start'}); window.scrollBy(0,-12); }
  else el.scrollIntoView({block:'center'});
  _smpTourPlace();
  b.querySelector('[data-a="next"]').focus();
}
function _smpTourPlace(){
  const b = document.querySelector('.smp-tour-bubble'), el = document.querySelector('.smp-tour-on');
  if(!b || !el) return;
  if(window.innerWidth<=600){ b.style.left = b.style.top = ''; b.classList.add('docked'); return; }
  b.classList.remove('docked');
  const r = el.getBoundingClientRect(), bw = b.offsetWidth, bh = b.offsetHeight, m = 14;
  const top = (r.bottom + m + bh < window.innerHeight) ? r.bottom + m : Math.max(m, r.top - m - bh);
  b.style.top = top + 'px';
  b.style.left = Math.min(Math.max(m, r.left), window.innerWidth - bw - m) + 'px';
}
function _smpTourKey(e){
  if(_smpTourI<0) return;
  const b = document.querySelector('.smp-tour-bubble'); if(!b) return;
  if(e.key==='Escape'){ e.preventDefault(); return _smpTourEnd(); }
  if(e.key==='ArrowRight'){ e.preventDefault(); return b.querySelector('[data-a="next"]').click(); }
  if(e.key==='ArrowLeft'){ const k = b.querySelector('[data-a="back"]'); if(k){ e.preventDefault(); k.click(); } return; }
  if(e.key==='Tab'){
    const f = [...b.querySelectorAll('button')]; if(!f.length) return;
    const i = f.indexOf(document.activeElement);
    e.preventDefault();
    f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  }
}
function _smpTourEnd(){
  _smpTourI = -1;
  document.removeEventListener('keydown', _smpTourKey, true);
  window.removeEventListener('resize', _smpTourPlace);
  document.querySelectorAll('.smp-tour-on').forEach(e=>e.classList.remove('smp-tour-on'));
  document.querySelectorAll('.smp-tour-bubble,.smp-tour-cap').forEach(e=>e.remove());
  const t = document.querySelector('.smp-tour-btn') || _smpTourBack;
  try{ if(t && t.focus) t.focus(); }catch(_){}
}

/* ---------- My Progress (muestra) ---------- */
/* Escala Cambridge estimada a partir del % (aproximada, para orientar; no es
   la conversión oficial, que depende de cada papel):
     · En el examen de un nivel, el ≈60 % es el aprobado y da el umbral del
       nivel: A2 Key 120 · B1 Preliminary 140 · B2 First 160 · C1 Advanced 180.
     · Cada punto de % por encima o por debajo mueve un punto de escala:
       escala = umbral + (% − 60). Así el 80 % (grado A) cae en umbral + 20,
       que es justo el nivel siguiente (A2 Key con 80 % ≈ 140 = B1), como en
       los certificados reales.
     · Se recorta a la banda que informa cada examen: [umbral − 20, umbral + 30].
   Por nivel se toma la media del mejor % de cada destreza corregida
   (Reading, Listening); la estimación del alumno es la más alta entre niveles. */
const SMP_SCALE_MIN = 100, SMP_SCALE_MAX = 220;
function _smpScale(lv, pct){
  const L = SMP_LEVELS.find(x=>x.k===lv); if(!L || pct==null) return null;
  return Math.round(Math.max(L.low-20, Math.min(L.low+30, L.low + (pct-60))));
}
function _smpCefr(s){ return s>=200?'C2':s>=180?'C1':s>=160?'B2':s>=140?'B1':s>=120?'A2':'A1'; }
function _smpPos(s){ return ((Math.max(SMP_SCALE_MIN, Math.min(SMP_SCALE_MAX, s)) - SMP_SCALE_MIN) / (SMP_SCALE_MAX - SMP_SCALE_MIN) * 100).toFixed(2) + '%'; }

/* Resultados de EJEMPLO para enseñar la pantalla en una demo: viven solo en
   sessionStorage ('cohSampleDemo') y nunca se escriben en la base. Fechas
   relativas a hoy para que el gráfico no envejezca. */
function _smpDemoOn(){ try{ return sessionStorage.getItem('cohSampleDemo')==='1'; }catch(_){ return false; } }
window._smpDemo = function(on){
  try{ on ? sessionStorage.setItem('cohSampleDemo','1') : sessionStorage.removeItem('cohSampleDemo'); }catch(_){}
  sampleProgress();
};
function _smpDemoData(){
  const d = (n)=>new Date(Date.now() - n*86400000).toISOString();
  const r = (skill, level, mock, score, total, days)=>({skill, level, mock, score, total,
    percent: total ? Math.round(score/total*100) : null, submitted_at: d(days)});
  return [
    r('Reading','A2','practice',27,32,24), r('Listening','A2','practice',20,25,22),
    r('Reading','B1','practice',19,32,18), r('Listening','B1','practice',14,25,15),
    {skill:'Writing', level:'B1', mock:'practice', score:null, total:null, percent:null, submitted_at:d(13)},
    r('Reading','B1','practice2',22,32,10), r('Listening','B1','practice2',17,25,8),
    r('Reading','B1','mock1',23,32,5), r('Listening','B1','mock1',18,25,3),
    {skill:'Writing', level:'B1', mock:'mock1', score:null, total:null, percent:null, submitted_at:d(2)},
    r('Reading','B2','practice',24,42,1),
  ].sort((a,b)=>b.submitted_at.localeCompare(a.submitted_at));
}
function _smpChart(atts){
  const pts = atts.filter(a=>a.percent!=null).slice().sort((a,b)=>String(a.submitted_at).localeCompare(String(b.submitted_at))).slice(-8);
  if(pts.length<2) return '<p class="muted">Take two marked tests to see your trend here.</p>';
  const W = 320, H = 130, L = 30, R = 10, T = 10, B = 22;
  const x = i => L + (pts.length===1 ? 0 : i*(W-L-R)/(pts.length-1));
  const y = v => T + (100-v)*(H-T-B)/100;
  const line = pts.map((a,i)=>x(i).toFixed(1)+','+y(+a.percent).toFixed(1)).join(' ');
  const dots = pts.map((a,i)=>`<circle class="pt" cx="${x(i).toFixed(1)}" cy="${y(+a.percent).toFixed(1)}" r="4"><title>${esc(a.skill)} · ${esc(_smpLv(a.level)||a.level||'')} · ${esc(_smpTestLabel(a.mock||'practice'))} — ${Math.round(+a.percent)} %</title></circle>`).join('');
  const grid = [0,60,100].map(v=>`<line class="${v===60?'pass':'gl'}" x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L-6}" y="${y(v)+4}" text-anchor="end">${v}</text>`).join('');
  const lbl = `<text class="ax" x="${L}" y="${H-5}">${new Date(pts[0].submitted_at).toLocaleDateString(undefined,{day:'numeric',month:'short'})}</text>
    <text class="ax" x="${W-R}" y="${H-5}" text-anchor="end">${new Date(pts[pts.length-1].submitted_at).toLocaleDateString(undefined,{day:'numeric',month:'short'})}</text>`;
  const sum = pts.map(a=>Math.round(+a.percent)+'%').join(', ');
  return `<svg class="smp-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Last ${pts.length} marked tests, oldest first: ${sum}. Dashed line: 60 % pass mark.">
    ${grid}<polyline class="ln" points="${line}"/>${dots}${lbl}</svg>
    <div class="muted smp-legend"><span class="k ln"></span> your score · <span class="k pass"></span> 60 % pass mark</div>`;
}
async function sampleProgress(){
  const gen = ++_smpGen;
  _setNav('results');
  const p = state.profile||{};
  if(!p.id && typeof _previewNeedsStudent==='function') return _previewNeedsStudent('📊 My Progress','');
  $('#main').innerHTML = `<h1>📊 My Progress</h1><p class="muted">Loading…</p>`;
  let real = {exam:[], act:[]};
  try{ real = (await _sampleResults(p.id)) || real; }catch(_){}
  if(gen!==_smpGen) return;
  const demo = !(real.exam||[]).length && _smpDemoOn();
  const atts = demo ? _smpDemoData() : (real.exam||[]);
  const acts = demo ? [] : (real.act||[]);
  const tag = demo ? ' <span class="smp-pill demo">Demo data</span>' : '';
  const head = `<h1>📊 My Progress</h1>
    <p class="muted smp-sub">Target level: <b>${esc(_smpLevelName(_smpLevel()))}</b> · every Practice test and Mock you finish is saved here.</p>
    ${demo ? `<div class="note info smp-demo-bar"><span><b>Demo data</b> — example results to show how this page works. They are not yours and are not saved.</span>
      <button type="button" class="btn sm ghost" onclick="window._smpDemo(false)">Reset demo</button></div>` : ''}`;
  if(!atts.length){
    $('#main').innerHTML = head + `<section class="card smp-empty">
        <div class="smp-empty-ico" aria-hidden="true">🚀</div>
        <h2>No results yet</h2>
        <p class="muted">Take your first Practice test (${SMP_AP}45 min). Your score, your trend and your estimate on the Cambridge Scale will appear here.</p>
        <div class="smp-empty-btns">
          <button type="button" class="btn" onclick="window._nav('practice')">Start a Practice test →</button>
          <button type="button" class="btn ghost" onclick="window._smpDemo(true)">Show demo results</button>
        </div></section>` + _smpActsCard(acts);
    return;
  }
  // Destrezas: mejor % hacia el 60 % del aprobado.
  const skills = SKILLS.map(sk=>{
    const a = atts.filter(x=>x.skill===sk), sc = a.filter(x=>x.percent!=null);
    const best = sc.length ? Math.round(Math.max(...sc.map(x=>+x.percent))) : null;
    const ico = (SMP_SKILLS.find(s=>s.sk===sk)||{}).ico || 'file-text';
    const body = best!=null
      ? `<div class="smp-best">${best} %</div>
         <div class="smp-bar" role="img" aria-label="Best ${best} %, pass mark 60 %"><span class="${best>=60?'ok':''}" style="width:${best}%"></span><i style="left:60%"></i></div>
         <div class="muted smp-bar-l">${best>=60?'✓ Above the 60 % pass mark':(60-best)+' points to the 60 % pass mark'}</div>`
      : `<div class="smp-best">${a.length ? '✓' : '—'}</div><div class="muted smp-bar-l">${a.length ? 'Marked by the AI examiner: the feedback is on the result screen of each script.' : 'Not taken yet.'}</div>`;
    return `<div class="card smp-sk">
      <div class="smp-sk-h">${ico3d(ico,40)}<b>${sk}</b>${tag}<span class="muted">${a.length} attempt${a.length===1?'':'s'}</span></div>${body}</div>`;
  }).join('');
  // Escala Cambridge: por nivel, media del mejor % de cada destreza corregida.
  const perLv = SMP_LEVELS.map(L=>{
    const bests = ['Reading','Listening'].map(sk=>{
      const sc = atts.filter(a=>a.skill===sk && _smpLv(a.level)===L.k && a.percent!=null);
      return sc.length ? Math.max(...sc.map(a=>+a.percent)) : null;
    }).filter(v=>v!=null);
    const pct = bests.length ? bests.reduce((s,v)=>s+v,0)/bests.length : null;
    return {L, pct, s:_smpScale(L.k, pct)};
  });
  const est = perLv.filter(x=>x.s!=null).sort((a,b)=>b.s-a.s)[0];
  const ticks = []; for(let v=SMP_SCALE_MIN; v<=SMP_SCALE_MAX; v+=20) ticks.push(`<span style="left:${_smpPos(v)}">${v}</span>`);
  const lanes = SMP_LEVELS.map((L,i)=>{
    const x = perLv[i];
    // Rótulo del nivel a la izquierda, fuera de la pista: dentro de la banda
    // lo tapaba el punto del alumno.
    return `<div class="smp-row"><div class="smp-row-l"><b>${L.k}</b><span class="rng">${L.low}–${L.low+30}</span></div>
      <div class="smp-lane"><div class="smp-band-b" style="left:${_smpPos(L.low)};width:calc(${_smpPos(L.low+30)} - ${_smpPos(L.low)})" title="${L.name}: ${L.low}–${L.low+30}"></div>
      ${x.s!=null ? `<span class="smp-dot" style="left:${_smpPos(x.s)}" title="${L.name}: best ${Math.round(x.pct)} % ≈ ${x.s}"></span>` : ''}</div></div>`;
  }).join('');
  const scale = `<section class="card">
      <h2>Cambridge Scale estimate${tag}</h2>
      ${est ? `<p class="smp-est">${SMP_AP} <b>${est.s}</b> · ${_smpCefr(est.s)} <span class="muted">from your best ${Math.round(est.pct)} % at ${esc(est.L.name)}</span></p>`
            : '<p class="muted">Finish a Reading or Listening test to see your estimate.</p>'}
      <div class="smp-scale">
        <div class="smp-track">${est ? `<div class="smp-mark" style="left:${_smpPos(est.s)}"><span>You · ${est.s}</span></div>` : ''}</div>
        ${lanes}
        <div class="smp-row"><div class="smp-row-l"></div><div class="smp-axis">${ticks.join('')}</div></div>
      </div>
      <p class="muted smp-note">Approximate: at each level ${SMP_AP}60 % is the pass mark (A2 Key 120 · B1 Preliminary 140 · B2 First 160 · C1 Advanced 180) and each point above or below moves the estimate one point, within the band the exam reports. Writing is not included.</p>
    </section>`;
  const rows = atts.map(a=>{
    const score = a.percent!=null ? `${esc(String(a.score))}/${esc(String(a.total))} <b>(${Math.round(+a.percent)} %)</b>`
      : (a.skill==='Writing' ? '<span class="muted">AI examiner feedback</span>' : '—');
    return `<tr><td>${esc(a.skill)} · ${esc(_smpTestLabel(a.mock||'practice'))}</td><td>${esc(_smpLv(a.level)||a.level||'')}</td><td>${score}</td><td class="muted">${a.submitted_at ? new Date(a.submitted_at).toLocaleDateString() : ''}</td></tr>`;
  }).join('');
  $('#main').innerHTML = head + `<div class="smp-sks">${skills}</div>${scale}
    <div class="smp-two">
      <section class="card"><h2>Latest marked tests${tag}</h2>${_smpChart(atts)}</section>
      <section class="card smp-tbl"><h2>All attempts (${atts.length})${tag}</h2>
        <div class="smp-tbl-w"><table><thead><tr><th>Test</th><th>Level</th><th>Score</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table></div></section>
    </div>` + _smpActsCard(acts);
}
function _smpActsCard(acts){
  if(!(acts||[]).length) return '';
  return `<section class="card smp-tbl"><h2>🧰 Practice tools (${acts.length})</h2><div class="smp-tbl-w"><table><thead><tr><th>Activity</th><th>Level</th><th>Result</th><th>Date</th></tr></thead><tbody>${
    acts.map(a=>`<tr><td>${esc(a.title||a.activity||'Activity')}</td><td>${esc(a.level||'')}</td><td>${a.score!=null?esc(String(a.score))+'/'+esc(String(a.total)):'—'}</td><td class="muted">${a.submitted_at?new Date(a.submitted_at).toLocaleDateString():''}</td></tr>`).join('')
  }</tbody></table></div></section>`;
}

/* ---------- Ayuda de Cohasset Schools ---------- */
function sampleHelpBody(){
  const q = (t, body, open)=>`<details class="card smp-help-q"${open?' open':''}><summary>${t}</summary><div class="smp-help-a">${body}</div></details>`;
  return `<h1>❓ Help</h1>
    <p class="muted smp-sub">How this Cohasset Schools portal works, in two minutes.</p>
    <div class="smp-help-top card"><div><b>New here?</b> The guided tour shows you the four main areas.</div>
      <button type="button" class="btn sm" onclick="window._nav('home');setTimeout(window._smpTour,450)">▶ Take the tour</button></div>
    ${q('What is this portal?', `<p>Cohasset Schools prepares students for the Cambridge English exams — A2 Key, B1 Preliminary, B2 First and C1 Advanced. This portal is a <b>sample</b>: a selection of practice tests, mocks and tools, each working from start to finish, so you can try exactly what a student uses.</p>`, true)}
    ${q('How do I take a Practice test or a Mock?', `<ol>
        <li>Open <b>🎯 Practice tests</b> (always available) or <b>🎓 Mocks</b> (a full timed paper, as on exam day).</li>
        <li>Choose your level at the top: A2 Key, B1 Preliminary, B2 First or C1 Advanced. The portal remembers it.</li>
        <li>Pick a skill — Reading &amp; Use of English, Listening or Writing — and press <b>Start</b> on the test you want.</li>
        <li>You go straight in with your session. When you finish, your result is saved and you come back here.</li></ol>
        <p class="muted">At A2 Key, Writing is part of the Reading &amp; Writing paper.</p>`)}
    ${q('How is my Writing marked?', `<p>Your Writing is marked by the <b>AI examiner</b> with the four Cambridge criteria — Content, Communicative Achievement, Organisation and Language — at the level you chose. You see a band for each criterion and comments on every part on the result screen, as soon as you submit.</p>
        <p class="muted">It is a practice mark to guide you, not an official Cambridge result.</p>`)}
    ${q('Where do I see my results?', `<p>In <b>📊 My progress</b>: your best score per skill against the 60 % pass mark, an estimate on the Cambridge Scale, a chart of your latest tests and the list of every attempt. Reading and Listening are marked automatically; Writing shows the AI examiner feedback.</p>`)}
    ${q('What do I need?', `<ul>
        <li>An up-to-date <b>Chrome</b> or <b>Safari</b> (computer or tablet recommended; Writing is easier with a keyboard).</li>
        <li>A stable internet connection.</li>
        <li><b>Headphones</b> for Listening — the audio plays as in the real exam.</li>
        <li>For the IELTS pieces, allow the new tab that opens on cohasset.pe.</li></ul>`)}
    ${q('Who do I contact?', `<p>For questions about your account, the tests or your results, speak to <b>your Cohasset Schools contact</b>.</p>`)}`;
}
