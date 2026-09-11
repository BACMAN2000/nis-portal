/* =========================================================================
   Panel YLE del profesor y del admin (Ruta YLE 2026, Fase 2) — nis-portal/yle-panel.js
   Lo pinta app.js en #main cuando la pestaña es 'yle' (window.ylePanel(grades)).
   Cuatro vistas:
     · Por grado    — alumno × nivel/test/paper con lo más flojo arriba y la parte más débil de cada uno
     · Corrección   — cola de intentos con parte del profesor (Speaking grabado, escritura de Movers/Flyers,
                      láminas coloreadas) y el formulario con las escalas oficiales
     · Acceso       — qué nivel y hasta qué test ve cada grado (tabla yle_access; sin fila = todo abierto)
     · Simulacro    — sesión de aula: el profesor la abre, pone el audio una sola vez y ve los resultados llegar
     · Coordinación — (solo admin) tablero por grado con la distribución de escudos, exportación CSV y fecha del examen
   Por grado enlaza el boletín de cada alumno (yle-boletin.html), que el profesor imprime o manda como enlace de familia.
   Depende de app.js: sb, state, esc, $, GRADES. Los datos vienen de yle_attempts (RLS por grado del profesor).
   ========================================================================= */
(function(){
'use strict';
const NIV = {starters: 'Pre A1 Starters', movers: 'A1 Movers', flyers: 'A2 Flyers'};
const PAPER = {listening: 'Listening', rw: 'Reading & Writing', speaking: 'Speaking'};
/* Las escalas de Speaking salen de yle/scales-2024.json (Handbook 2024, pp. 85-87) y cambian
   por nivel: en Pre A1 Starters el primer criterio es solo «Vocabulary» —la gramática no se
   evalúa— y la pronunciación todavía no valora la entonación. Si el fichero no carga, se usa
   esta versión mínima para no dejar al profesor sin formulario. */
const ESCALAS_MIN = [
  {id: 'vocabulary_and_grammar', name: 'Vocabulary and grammar', es: 'Vocabulary and grammar', ayuda: 'Uses the words and structures for the level; can be understood even with errors.', bands: {}},
  {id: 'pronunciation', name: 'Pronunciation', es: 'Pronunciation', ayuda: 'Words can be understood; rhythm and intonation suited to the level.', bands: {}},
  {id: 'interaction', name: 'Interaction', es: 'Interaction', ayuda: 'Responds to what is asked, asks for repetition when needed, keeps the conversation going.', bands: {}}
];
let SPECS = null, SCALES = null, TESTS = {}, INDICES = {};
let V = {view: 'grado', grade: null, level: 'starters', test: null, grades: []};
let pollTimer = null;

const nombre = p => (p && (p.full_name || [p.first_name, p.last_name].filter(Boolean).join(' '))) || '—';
const fecha = s => s ? new Date(s).toLocaleString('en-GB', {dateStyle: 'short', timeStyle: 'short'}) : '';
const pct = (s, t) => t ? Math.round(100 * s / t) : null;
const j = (u) => fetch(u, {cache: 'no-cache'}).then(r => { if(!r.ok) throw new Error(u); return r.json(); });
async function specs(){ if(!SPECS){ try { SPECS = await j('yle/specs.json'); } catch(e){ SPECS = null; } } return SPECS; }
async function scales(){ if(!SCALES){ try { SCALES = await j('yle/scales-2024.json'); } catch(e){ SCALES = null; } } return SCALES; }
/* Los tres criterios del nivel, con sus descriptores oficiales por banda. */
function escalasDe(level){
  const s = SCALES && SCALES.speaking && SCALES.speaking[level];
  return (s && s.criteria) || ESCALAS_MIN;
}
/* El desplegable de una banda: descriptor oficial en inglés, que es el que manda. */
function bandas(c){
  const b = c.bands || {}, inter = (SCALES && SCALES._banda_intermedia) || {};
  const filas = [5, 4, 3, 2, 1, 0].map(n => {
    const t = b[n] || inter[n] || '';
    return t ? `<tr><td class="bn">${n}</td><td>${esc(t)}</td></tr>` : '';
  }).join('');
  if(!filas) return '';
  return `<details class="yle-desc"><summary>Official descriptors${c.sub ? ' · ' + c.sub.join(' · ') : ''}</summary><table>${filas}</table></details>`;
}
/* Los examenes ya no son archivos publicos: viven en la tabla yle_tests, porque el
   JSON lleva dentro las claves de respuesta y cualquiera con la direccion se llevaba
   el solucionario de los treinta (6-sep-2026). El panel los lee de la base con la
   sesion del profesor, igual que la pantalla del alumno. */
async function indice(level){ if(!INDICES[level]){ try { const r = await sb.from('yle_tests').select('number, theme').eq('level', level).order('number'); INDICES[level] = r.data || []; } catch(e){ INDICES[level] = []; } } return INDICES[level]; }
/* El contenido va por yle_test_data(): desde el 7-sep-2026 la columna `data` no esta
   al alcance de ninguna cuenta del portal. Al profesor la funcion se lo da entero. */
async function testJson(level, n){ const k = level + n; if(!(k in TESTS)){ try { const r = await sb.rpc('yle_test_data', {p_level: level, p_number: n}); TESTS[k] = r.data || null; } catch(e){ TESTS[k] = null; } } return TESTS[k]; }
function band(p){ const b = (SPECS && SPECS.shields && SPECS.shields.nis_estimate_bands) || [[90, 5], [75, 4], [60, 3], [40, 2], [0, 1]]; for(const x of b) if(p >= x[0]) return x[1]; return 1; }
function escudos(n){ let h = '<span class="yle-sh">'; for(let i = 1; i <= 5; i++) h += '<i class="' + (i <= (n || 0) ? 'on' : '') + '">' + i + '</i>'; return h + '</span>'; }
const CSS = `<style id="yle-panel-css">
.yle-pills{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 14px}
.yle-pills button{border:1.5px solid var(--border,#d9deea);background:#fff;border-radius:999px;padding:7px 14px;font:inherit;font-weight:600;cursor:pointer}
.yle-pills button.on{background:var(--blue,#1e3a8a);color:#fff;border-color:var(--blue,#1e3a8a)}
.yle-bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:6px 0 12px}
.yle-bar select{border:1.5px solid var(--border,#d9deea);border-radius:9px;padding:7px 10px;font:inherit}
.yle-sh{display:inline-flex;gap:2px;vertical-align:middle}
.yle-sh i{width:16px;height:19px;display:inline-grid;place-items:center;font-style:normal;font-size:.62rem;font-weight:800;color:#9aa3b5;background:#e2e6ef;clip-path:polygon(50% 0,100% 12%,100% 60%,50% 100%,0 60%,0 12%)}
.yle-sh i.on{background:#d29a1f;color:#3b2a05}
.yle-heat td.h{font-weight:700;text-align:center}
.yle-heat td.h.bad{background:#f8e1e1} .yle-heat td.h.mid{background:#fff3d6} .yle-heat td.h.ok{background:#e3f3ea}
.yle-item{border:1px solid var(--border,#d9deea);border-radius:12px;padding:12px 14px;margin:10px 0;background:#fff}
.yle-item h3{margin:0 0 6px;font-size:1rem}
.yle-item .meta{color:var(--muted,#64748b);font-size:.85rem}
.yle-ans{background:#f5f7fb;border-radius:9px;padding:8px 10px;margin:6px 0;font-size:.92rem}
.yle-ans b{color:var(--blue,#1e3a8a)}
.yle-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin:10px 0}
.yle-form label{display:block;font-size:.85rem;font-weight:600}
.yle-form select,.yle-form input{width:100%;border:1.5px solid var(--border,#d9deea);border-radius:9px;padding:7px 10px;font:inherit;margin-top:3px}
.yle-form small{display:block;color:var(--muted,#64748b);font-weight:400;margin-top:2px}
.yle-item textarea{width:100%;min-height:56px;border:1.5px solid var(--border,#d9deea);border-radius:9px;padding:8px 10px;font:inherit;margin:6px 0}
.yle-live{font-variant-numeric:tabular-nums}
.yle-audio audio{width:100%;max-width:520px;display:block;margin:4px 0}
.yle-desc{margin-top:4px;font-weight:400}
.yle-desc summary{cursor:pointer;color:var(--blue,#1e3a8a);font-size:.78rem;font-weight:600}
.yle-desc table{width:100%;border-collapse:collapse;margin-top:5px;font-size:.78rem}
.yle-desc td{border-top:1px solid var(--border,#d9deea);padding:5px 6px;vertical-align:top;color:var(--ink,#1e293b)}
.yle-desc td.bn{width:22px;font-weight:800;text-align:center;color:#9a6b12;background:#fdf6e6}
.yle-script{background:#fff;border:1px solid var(--border,#d9deea);border-radius:12px;padding:12px 14px;margin:10px 0}
.yle-script h3{margin:0 0 8px;font-size:.98rem}
.yle-script .ln{display:grid;grid-template-columns:74px 1fr;gap:10px;padding:4px 0;border-top:1px solid #eef1f6;font-size:.9rem;line-height:1.45}
.yle-script .ln:first-of-type{border-top:none}
.yle-script .who{font-size:.7rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#fff;background:#64748b;border-radius:6px;padding:2px 6px;height:fit-content;text-align:center}
.yle-script .who.R{background:#1e3a8a} .yle-script .who.F{background:#7a3f9d} .yle-script .who.M{background:#1f6f8b}
.yle-script .who.Fch{background:#b8541f} .yle-script .who.Mch{background:#2f7d55} .yle-script .who.pausa{background:#cbd2de;color:#4b5563}
.yle-script .pausa-txt{color:var(--muted,#64748b);font-style:italic}
@media print{.yle-pills,.yle-bar,.nav,header,footer{display:none!important}.yle-script{break-inside:avoid;border:none}}
</style>`;

window.ylePanel = async function(grades, opts){
  V.grades = grades || (window.GRADES || []); if(opts && typeof opts.admin === 'boolean') V.admin = opts.admin;
  if(!V.grade || !V.grades.some(g => g.id === V.grade)) V.grade = V.grades.length ? V.grades[0].id : null;
  await specs(); await scales();
  if(!document.getElementById('yle-panel-css')) document.head.insertAdjacentHTML('beforeend', CSS);
  clearInterval(pollTimer);
  const vistas = [['grado', '📊 By grade'], ['cola', '✅ Marking'], ['guion', '📻 Audio script'], ['acceso', '🔐 Access'], ['simulacro', '🏫 Mock exam']].concat(V.admin ? [['coord', '📈 Coordination']] : []);
  const cab = `<h1>🛡️ YLE Panel</h1>
    <div class="note">The Cambridge Young Learners practice tests for each grade: who has done them, how they did part by part, what is left to mark and which tests each grade can open. The shields are the <b>school’s estimate</b>, not a Cambridge result.</div>
    <div class="yle-pills">${vistas.map(v => `<button class="${v[0] === V.view ? 'on' : ''}" onclick="window._yleVista('${v[0]}')">${v[1]}</button>`).join('')}</div>
    <div id="yleBody"><p class="muted">Loading…</p></div>`;
  $('#main').innerHTML = cab;
  try {
    if(V.view === 'grado') await vistaGrado();
    else if(V.view === 'cola') await vistaCola();
    else if(V.view === 'guion') await vistaGuion();
    else if(V.view === 'acceso') await vistaAcceso();
    else if(V.view === 'simulacro') await vistaSimulacro();
    else await vistaCoord();
  } catch(e){ $('#yleBody').innerHTML = `<div class="note err">${esc(e.message || String(e))}</div>`; }
};
window._yleVista = v => { V.view = v; window.ylePanel(V.grades); };
window._yleGrado = v => { V.grade = Number(v); window.ylePanel(V.grades); };
window._yleNivel = v => { V.level = v; window.ylePanel(V.grades); };

function barra(conNivel){
  return `<div class="yle-bar"><label>Grade <select onchange="window._yleGrado(this.value)">${V.grades.map(g => `<option value="${g.id}"${g.id === V.grade ? ' selected' : ''}>${esc(g.name)}</option>`).join('')}</select></label>` +
    (conNivel ? `<label>Level <select onchange="window._yleNivel(this.value)">${Object.keys(NIV).map(l => `<option value="${l}"${l === V.level ? ' selected' : ''}>${NIV[l]}</option>`).join('')}</select></label>` : '') + '</div>';
}
/* ── 📻 Guion del audio ────────────────────────────────────────────────────
   Lo que se oye en cada parte de Listening, repartido por voces, tal y como se
   montó el mp3. El profesor lo necesita para dirigir un simulacro (pone el audio
   una sola vez) y para leerlo en clase cuando prefiere hacerlo él. Sale de la
   clave "audio" del propio test, así que guion y grabación no se pueden separar. */
const VOZ = {R: 'Examiner', F: 'Woman', M: 'Man', Fch: 'Girl', Mch: 'Boy'};
/* Ya no hay tests "ineditos" que rescatar uno a uno: el indice sale de la misma
   tabla que los examenes, asi que lista todo lo que existe. Con archivos habia dos
   fuentes (index.json y el disco) y una podia quedarse corta. */
async function testsDe(level){
  return (await indice(level)).slice().sort((a, b) => a.number - b.number);
}
async function vistaGuion(){
  const lista = await testsDe(V.level);
  if(!V.test || !lista.some(t => t.number === V.test)) V.test = lista.length ? lista[0].number : null;
  const T = V.test ? await testJson(V.level, V.test) : null;
  const spec = SPECS && SPECS.levels[V.level];
  const sel = `<div class="yle-bar">
    <label>Level <select onchange="window._yleNivel(this.value)">${Object.keys(NIV).map(l => `<option value="${l}"${l === V.level ? ' selected' : ''}>${NIV[l]}</option>`).join('')}</select></label>
    <label>Test <select onchange="window._yleTest(this.value)">${lista.map(t => `<option value="${t.number}"${t.number === V.test ? ' selected' : ''}>Test ${t.number}${t.theme ? ' · ' + esc(t.theme) : ''}${t.inedito ? ' (not yet published)' : ''}</option>`).join('')}</select></label>
    <button class="btn sm ghost" onclick="window.print()">🖨️ Print</button>
    <a class="btn sm ghost" target="_blank" rel="noopener"
       href="yle-print.html?level=${V.level}&test=${V.test || 1}">📄 Printable exam</a>
    <a class="btn sm ghost" target="_blank" rel="noopener"
       href="yle-print.html?level=${V.level}&test=${V.test || 1}&key=1">🗝️ Answer sheet</a></div>`;
  if(!T || !T.audio){
    $('#yleBody').innerHTML = `<div class="note">Here is what is heard in each part of the Listening, in case you run a mock exam or prefer to read it yourself in class.</div>` + sel +
      `<div class="card"><p class="muted">${lista.length ? 'This test does not have an audio script yet.' : 'This level does not have tests in the YLE engine yet.'}</p></div>`;
    return;
  }
  const partes = (spec ? spec.listening.parts.map(p => p.n) : [1, 2, 3, 4, 5]).filter(n => T.audio['p' + n]);
  const leyenda = Object.keys(VOZ).map(k => `<span class="who ${k}" style="display:inline-block;margin-right:4px">${k}</span> ${VOZ[k]}`).join(' &nbsp; ');
  $('#yleBody').innerHTML = `<div class="note">What is heard in each part of the Listening for <b>Test ${V.test}</b>, split by voice and with the pauses from the exam. It is the same text used to record the mp3. In the real exam each part is heard <b>twice</b>: the audio already includes the repeat.</div>` +
    sel + `<p class="muted" style="font-size:.82rem">${leyenda}</p>` +
    partes.map(n => {
      const tarea = spec && (spec.listening.parts.find(p => p.n === n) || {}).task;
      return `<div class="yle-script"><h3>Part ${n}${tarea ? ' · ' + esc(tarea) : ''}</h3>
        <audio controls preload="none" src="${YM(`yle-audio/${V.level}/test_${String(V.test).padStart(2, '0')}_part${n}.mp3`)}"></audio>
        ${T.audio['p' + n].map(l => {
          if(l[0] === 'pause') return `<div class="ln"><span class="who pausa">pause</span><span class="pausa-txt">${l[1]} s</span></div>`;
          return `<div class="ln"><span class="who ${esc(l[0])}">${esc(l[0])}</span><span>${esc(l[1])}</span></div>`;
        }).join('')}</div>`;
    }).join('');
}
window._yleTest = v => { V.test = Number(v); window.ylePanel(V.grades); };
window._yleVerGuion = (level, test) => { V.level = level; V.test = test; V.view = 'guion'; window.ylePanel(V.grades); };

async function alumnosDe(gradeId){
  const {data, error} = await sb.from('profiles').select('id, full_name, first_name, last_name, active').eq('grade_id', gradeId).eq('role', 'student').order('last_name');
  if(error) throw error;
  return (data || []).filter(p => p.active !== false);
}
function pendiente(a){
  if(a.reviewed_at) return false;
  if(a.audio_path) return true;
  const parts = a.parts || {};
  if(Object.keys(parts).some(k => parts[k] && parts[k].teacher > 0)) return true;
  if(a.paper === 'listening' && a.drawings && Object.keys(a.drawings).length) return true;
  return false;
}
function notaTotal(a){
  // auto + lo que puso el profesor (criteria.teacher_total / teacher_max)
  const c = a.criteria || {};
  const s = (a.score || 0) + (c.teacher_total || 0), t = (a.total || 0) + (c.teacher_max || 0);
  return {s, t, p: pct(s, t)};
}

/* ---------- Por grado ---------- */
async function vistaGrado(){
  const alumnos = await alumnosDe(V.grade);
  const ids = alumnos.map(a => a.id);
  let intentos = [];
  if(ids.length){
    const {data, error} = await sb.from('yle_attempts').select('id, student_id, test, paper, mode, score, total, parts, shields_est, criteria, audio_path, drawings, reviewed_at, created_at').eq('level', V.level).in('student_id', ids).order('created_at', {ascending: false});
    if(error) throw error; intentos = data || [];
  }
  const spec = SPECS && SPECS.levels[V.level];
  const filas = alumnos.map(al => {
    const mios = intentos.filter(x => x.student_id === al.id);
    const mejor = {};   // test#paper -> mejor pct
    const partes = {};  // paper/pk -> [score,total]
    let ult = {listening: null, rw: null, speaking: null}, pend = 0;
    mios.forEach(a => {
      if(pendiente(a)) pend++;
      if(a.score == null) return;
      const n = notaTotal(a); const k = a.test + '#' + a.paper;
      if(n.p != null && (mejor[k] == null || n.p > mejor[k])) mejor[k] = n.p;
      if(ult[a.paper] == null && a.shields_est) ult[a.paper] = a.shields_est;
      Object.keys(a.parts || {}).forEach(pk => { const r = a.parts[pk]; if(!r || !r.total) return; const kk = a.paper + '/' + pk; partes[kk] = partes[kk] || [0, 0]; partes[kk][0] += r.score; partes[kk][1] += r.total; });
    });
    const vals = Object.values(mejor); const media = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    let floja = null; Object.keys(partes).forEach(kk => { const p = pct(partes[kk][0], partes[kk][1]); if(p != null && (floja == null || p < floja.p)) floja = {k: kk, p}; });
    return {al, hechos: vals.length, media, ult, floja, pend, partes};
  }).sort((a, b) => (a.media == null ? 101 : a.media) - (b.media == null ? 101 : b.media));
  // calor por parte (toda la clase)
  const calor = {};
  filas.forEach(f => Object.keys(f.partes).forEach(kk => { calor[kk] = calor[kk] || [0, 0]; calor[kk][0] += f.partes[kk][0]; calor[kk][1] += f.partes[kk][1]; }));
  const cel = p => p == null ? '<td class="h">—</td>' : `<td class="h ${p < 50 ? 'bad' : p < 75 ? 'mid' : 'ok'}">${p} %</td>`;
  const heat = spec ? ['listening', 'rw'].map(paper => `<tr><th>${PAPER[paper]}</th>${spec[paper].parts.map(pt => { const c = calor[paper + '/p' + pt.n]; return cel(c ? pct(c[0], c[1]) : null); }).join('')}</tr>`).join('') : '';
  const maxParts = spec ? Math.max(spec.listening.parts.length, spec.rw.parts.length) : 0;
  const conIntentos = filas.filter(f => f.hechos).length;
  const nombreParte = kk => { const [paper, pk] = kk.split('/'); const pt = spec && spec[paper] && spec[paper].parts[+pk.slice(1) - 1]; return PAPER[paper] + ' P' + pk.slice(1) + (pt ? ' · ' + pt.task.split(':')[0].split('(')[0].trim() : ''); };
  $('#yleBody').innerHTML = barra(true) +
    `<div class="card"><h2 style="margin:0 0 6px">${NIV[V.level]} · ${esc((V.grades.find(g => g.id === V.grade) || {}).name || '')}</h2>
     <div class="muted" style="font-size:.9rem">${alumnos.length} students · ${conIntentos} have done tests · ${filas.reduce((n, f) => n + f.pend, 0)} attempts to mark</div>
     ${spec ? `<h3 style="margin:12px 0 4px">Where the class is weakest (correct answers by part, all attempts)</h3>
     <div style="overflow-x:auto"><table class="yle-heat"><thead><tr><th></th>${Array.from({length: maxParts}, (_, i) => '<th>Part ' + (i + 1) + '</th>').join('')}</tr></thead><tbody>${heat}</tbody></table></div>` : ''}</div>
     <div class="card" style="padding:0;overflow-x:auto"><table><thead><tr><th>Student</th><th>Tests done</th><th>Average</th><th>Listening</th><th>R&amp;W</th><th>Speaking</th><th>Weakest part</th><th>To mark</th><th>Report</th></tr></thead><tbody>` +
     filas.map(f => `<tr><td><b>${esc(nombre(f.al))}</b></td><td>${f.hechos}</td><td>${f.media == null ? '<span class="muted">—</span>' : '<b>' + f.media + ' %</b>'}</td>` +
       `<td>${f.ult.listening ? escudos(f.ult.listening) : '—'}</td><td>${f.ult.rw ? escudos(f.ult.rw) : '—'}</td><td>${f.ult.speaking ? escudos(f.ult.speaking) : '—'}</td>` +
       `<td>${f.floja ? esc(nombreParte(f.floja.k)) + ' (' + f.floja.p + ' %)' : '<span class="muted">—</span>'}</td><td>${f.pend ? '<span class="badge off">' + f.pend + '</span>' : ''}</td><td><a class="btn sm ghost" href="yle-boletin.html?student=${f.al.id}&level=${V.level}" target="_blank" rel="noopener" title="Report for the family">📄</a></td></tr>`).join('') +
     `</tbody></table></div>` +
     `<p class="muted" style="font-size:.85rem">Average = mean of the best attempt for each test and paper. The shields are from the last attempt. “Weakest part” adds up all attempts, part by part.</p>`;
}

/* ---------- Corrección ---------- */
async function vistaCola(){
  const ids = []; const nombres = {};
  for(const g of V.grades){ const als = await alumnosDe(g.id); als.forEach(a => { ids.push(a.id); nombres[a.id] = nombre(a) + ' · ' + g.name; }); }
  let cola = [];
  if(ids.length){
    const {data, error} = await sb.from('yle_attempts').select('*').in('student_id', ids).is('reviewed_at', null).order('created_at', {ascending: false}).limit(300);
    if(error) throw error; cola = (data || []).filter(pendiente);
  }
  if(!cola.length){ $('#yleBody').innerHTML = '<div class="card"><b>Nothing to mark.</b> Here you will find the Speaking recordings, the Movers and Flyers writing and the coloured pictures for your grades.</div>'; return; }
  const out = [];
  for(const a of cola.slice(0, 40)) out.push(await tarjeta(a, nombres[a.student_id]));
  $('#yleBody').innerHTML = `<p class="muted">${cola.length} attempts to mark${cola.length > 40 ? ' (40 shown)' : ''}. Each one saves your grade and your comment to the student’s account.</p>` + out.join('');
  cola.slice(0, 40).forEach(a => { const el = document.getElementById('au' + a.id); if(el && a.audio_path) sb.storage.from('fun-speaking').createSignedUrl(a.audio_path, 3600).then(r => { if(r.data && r.data.signedUrl) el.innerHTML = '<audio controls preload="none" src="' + r.data.signedUrl + '"></audio>'; else el.textContent = 'The recording could not be opened.'; }); });
}
async function tarjeta(a, quien){
  const T = await testJson(a.level, a.test);
  const ans = a.answers || {}, parts = a.parts || {};
  let cuerpo = '', form = '';
  if(a.paper === 'speaking'){
    cuerpo = `<div class="yle-audio" id="au${a.id}">${a.audio_path ? 'Loading the recording…' : '<span class="muted">No recording (pointing and placing cards only).</span>'}</div>` +
      (ans.part ? `<div class="meta">Recorded part: ${esc(String(ans.part))}</div>` : '') + (a.score != null ? `<div class="meta">Automatic part: ${a.score} / ${a.total}</div>` : '');
    const ESC = escalasDe(a.level), notaNiv = (SCALES && SCALES.speaking && SCALES.speaking[a.level] || {}).nota;
    form = `<div class="yle-form">${ESC.map(c => `<label>${esc(c.name)} <span class="muted" style="font-weight:400">· ${esc(c.es)}</span><select data-crit="${c.id}">${[0, 1, 2, 3, 4, 5].map(n => `<option value="${n}"${n === 3 ? ' selected' : ''}>${n}</option>`).join('')}</select><small>${esc(c.ayuda || '')}</small>${bandas(c)}</label>`).join('')}</div>` +
      (notaNiv ? `<p class="muted" style="font-size:.82rem">${esc(notaNiv)}</p>` : '') +
      (SCALES && SCALES._pronunciation_cap ? `<p class="muted" style="font-size:.78rem">${esc(SCALES._pronunciation_cap)}</p>` : '');
  } else if(a.paper === 'rw'){
    // campos del profesor: p6_t* (respuestas) y p6_w* (frases libres) de Movers; p7_* de Flyers (historia)
    const pk = Object.keys(parts).find(k => parts[k] && parts[k].teacher > 0) || 'p6';
    const P = T && T.rw && T.rw[pk];
    const campos = Object.keys(ans).filter(k => k.indexOf(pk + '_t') === 0 || k.indexOf(pk + '_w') === 0 || k.indexOf(pk + '_s') === 0).sort();
    cuerpo = (P && P.image ? `<img src="${YM(`yle-img/${a.level}/test_${String(a.test).padStart(2, '0')}_${P.image}.jpg`)}" alt="" style="max-width:420px;width:100%;border-radius:10px;display:block;margin:6px 0">` : '') +
      campos.map(k => { const i = +k.replace(/^p\d+_[tws]/, ''); const preg = P && k.indexOf('_t') > 0 && P.answer && P.answer[i] ? P.answer[i].q : (k.indexOf('_w') > 0 ? 'Sentence ' + (i + 1) + ' about the picture' : 'Story'); const modelo = P && k.indexOf('_t') > 0 && P.answer && P.answer[i] ? P.answer[i].model : ''; return `<div class="yle-ans"><b>${esc(preg)}</b><br>${esc(ans[k] || '—')}${modelo ? `<br><span class="muted">Model: ${esc(modelo)}</span>` : ''}</div>`; }).join('') +
      (a.score != null ? `<div class="meta">Automatic part: ${a.score} / ${a.total}</div>` : '');
    /* Marcas oficiales. Movers Part 6 (Handbook p. 44): completar 1 marca; responder y escribir
       2 marcas cada una — 1 si se entiende y 1 más si representa el dibujo con exactitud; 10 en
       total con las dos automáticas. Flyers Part 7 (p. 70): la historia, escala 0-5. */
    const W = (SCALES && SCALES.writing) || {};
    form = `<div class="yle-form">${campos.map(k => { const max = k.indexOf('_s') > 0 ? 5 : 2; return `<label>${esc(k.replace(pk + '_', '').replace('t', 'Answer ').replace('w', 'Sentence ').replace('s', 'Story '))} (0–${max})<input type="number" min="0" max="${max}" value="0" data-crit="${k}" data-max="${max}"></label>`; }).join('')}</div>` +
      (a.level === 'flyers' && W.flyers_p7
        ? `<details class="yle-desc" open><summary>${esc(W.flyers_p7.titulo)} · scale 0–${W.flyers_p7.total}</summary><table>${[5, 4, 3, 2, 1, 0].map(n => `<tr><td class="bn">${n}</td><td>${esc(W.flyers_p7.bands[n] || '')}</td></tr>`).join('')}</table></details>`
        : (W.movers_p6 ? `<details class="yle-desc" open><summary>${esc(W.movers_p6.titulo)} · ${W.movers_p6.total} marks</summary><table>${W.movers_p6.regla.map(r => `<tr><td>${esc(r)}</td></tr>`).join('')}</table></details>` : ''));
  } else {
    const lam = Object.keys(a.drawings || {});
    cuerpo = `<div class="meta">Coloured pictures: ${lam.length ? lam.map(esc).join(', ') : 'none'} · automatic part ${a.score} / ${a.total}</div>` +
      lam.map(k => { const id = k.split('#').pop(); return `<img src="${YM(`yle-img/${a.level}/test_${String(a.test).padStart(2, '0')}_${id}.jpg`)}" alt="" style="max-width:300px;width:100%;border-radius:10px;display:inline-block;margin:4px 6px 4px 0">`; }).join('') +
      `<p class="muted" style="font-size:.85rem">The drawing strokes are saved in the student’s account; ask them to show you the picture on their screen or check it against the test’s answer key.</p>`;
    form = `<div class="yle-form"><label>Colour and write (0–5)<input type="number" min="0" max="5" value="5" data-crit="colouring" data-max="5"></label></div>`;
  }
  return `<div class="yle-item" id="it${a.id}"><h3>${esc(quien || '')} — ${NIV[a.level]} · Test ${a.test} · ${PAPER[a.paper]}</h3>
    <div class="meta">${fecha(a.created_at)} · mode ${a.mode === 'exam' ? 'exam' : 'practice'}</div>${cuerpo}${form}
    <textarea placeholder="Comment for the student (optional)"></textarea>
    <button class="btn sm" onclick="window._yleGuardar('${a.id}','${a.paper}')">Save marking</button> <span class="muted" data-msg></span></div>`;
}
window._yleGuardar = async function(id, paper){
  const box = document.getElementById('it' + id); if(!box) return;
  const btn = box.querySelector('button'); btn.disabled = true;
  const crit = {}; let tot = 0, max = 0;
  box.querySelectorAll('[data-crit]').forEach(el => { const v = Number(el.value) || 0; crit[el.dataset.crit] = v; tot += v; max += Number(el.dataset.max || 5); });
  crit.teacher_total = tot; crit.teacher_max = max;
  const fb = box.querySelector('textarea').value.trim();
  const fila = {criteria: crit, feedback: fb || null, reviewed_by: (state.session && state.session.user && state.session.user.id) || null, reviewed_at: new Date().toISOString()};
  /* Speaking: los tres criterios van de 0 a 5 y el escudo es su media, como el máximo por paper. */
  if(paper === 'speaking'){ const n = Object.keys(crit).filter(k => k !== 'teacher_total' && k !== 'teacher_max').length || 3; fila.shields_est = Math.max(1, Math.round(tot / n)); fila.score = tot; fila.total = max; }
  else {
    const {data} = await sb.from('yle_attempts').select('score,total').eq('id', id).maybeSingle();
    if(data && data.total != null){ const p = pct((data.score || 0) + tot, (data.total || 0) + max); if(p != null) fila.shields_est = band(p); }
  }
  const {error} = await sb.from('yle_attempts').update(fila).eq('id', id);
  const msg = box.querySelector('[data-msg]');
  if(error){ msg.textContent = 'Could not save: ' + error.message; btn.disabled = false; return; }
  msg.textContent = 'Saved ✓'; setTimeout(() => box.remove(), 700);
};


/* ---------- Coordinación (admin): tablero por grado, exportación y fecha del examen ---------- */
async function vistaCoord(){
  const spec = SPECS && SPECS.levels[V.level];
  const [{data: alumnos, error: e1}, {data: intentos, error: e2}, {data: ajustes}, {data: vocab}] = await Promise.all([
    sb.from('profiles').select('id, full_name, first_name, last_name, grade_id, is_demo, active').eq('role', 'student'),
    sb.from('yle_attempts').select('student_id, test, paper, mode, score, total, shields_est, criteria, reviewed_at, audio_path, created_at').eq('level', V.level).order('created_at', {ascending: false}).limit(5000),
    sb.from('yle_settings').select('key, value'),
    sb.from('yle_vocab_progress').select('student_id, ok').eq('level', V.level).gte('ok', 3)
  ]);
  if(e1) throw e1; if(e2) throw e2;
  const set = {}; (ajustes || []).forEach(r => set[r.key] = r.value || '');
  const vocabPor = {}; (vocab || []).forEach(r => vocabPor[r.student_id] = (vocabPor[r.student_id] || 0) + 1);
  const porAlumno = {};
  (intentos || []).forEach(a => {
    const x = porAlumno[a.student_id] = porAlumno[a.student_id] || {tests: new Set(), best: {}, sh: {}, exam: false, pend: 0, last: null, sp: null};
    if(!x.last) x.last = a.created_at;
    if(pendiente(a)) x.pend++;
    if(a.mode === 'exam') x.exam = true;
    if(a.paper === 'speaking'){ x.tests.add(a.test); if(a.reviewed_at && a.criteria && a.criteria.teacher_max){ const v = Math.max(1, Math.min(5, Math.round(5 * (a.criteria.teacher_total || 0) / a.criteria.teacher_max))); x.sp = Math.max(x.sp || 0, v); } return; }
    if(a.score == null) return;
    x.tests.add(a.test);
    const p = pct(a.score, a.total); if(p != null && (x.best[a.paper] == null || p > x.best[a.paper])) x.best[a.paper] = p;
    if(a.shields_est && (x.sh[a.paper] == null || a.shields_est > x.sh[a.paper])) x.sh[a.paper] = a.shields_est;
  });
  const reales = (alumnos || []).filter(a => a.active !== false && !a.is_demo);
  const filas = V.grades.map(g => {
    const als = reales.filter(a => a.grade_id === g.id); if(!als.length) return null;
    const con = als.filter(a => porAlumno[a.id] && porAlumno[a.id].tests.size);
    const dist = {listening: [0, 0, 0, 0, 0], rw: [0, 0, 0, 0, 0]};
    let listos = 0, examen = 0, pend = 0, testsTot = 0;
    con.forEach(a => { const x = porAlumno[a.id]; testsTot += x.tests.size; if(x.exam) examen++; pend += x.pend;
      ['listening', 'rw'].forEach(p => { if(x.sh[p]) dist[p][x.sh[p] - 1]++; });
      if((x.sh.listening || 0) >= 3 && (x.sh.rw || 0) >= 3) listos++; });
    const barra = p => dist[p].map((n, i) => `<span class="yle-dist" title="${n} with ${i + 1} shield(s)"><i style="height:${con.length ? Math.max(2, Math.round(28 * n / con.length)) : 2}px"></i><small>${i + 1}</small></span>`).join('');
    return {g, n: als.length, con: con.length, testsMed: con.length ? (testsTot / con.length).toFixed(1) : '—', listos, examen, pend, barraL: barra('listening'), barraR: barra('rw')};
  }).filter(Boolean);
  const totalAl = filas.reduce((n, f) => n + f.n, 0), totalCon = filas.reduce((n, f) => n + f.con, 0);
  const fechaKey = 'exam_date_' + V.level, notaKey = 'exam_note_' + V.level;
  $('#yleBody').innerHTML = `<div class="yle-bar"><label>Level <select onchange="window._yleNivel(this.value)">${Object.keys(NIV).map(l => `<option value="${l}"${l === V.level ? ' selected' : ''}>${NIV[l]}</option>`).join('')}</select></label>
      <button class="btn sm" onclick="window._yleCsv()">⬇️ Export CSV (Excel)</button></div>
    <div class="card"><h2 style="margin:0 0 6px">${NIV[V.level]} · all grades</h2>
      <div class="muted" style="font-size:.9rem">${totalAl} real students (no demo accounts) · ${totalCon} have done tests · «ready» = at least 3 estimated shields in Listening and in Reading &amp; Writing</div>
      <div style="overflow-x:auto;margin-top:10px"><table><thead><tr><th>Grade</th><th>Students</th><th>With tests</th><th>Tests per student</th><th>Listening shields (1→5)</th><th>R&amp;W shields (1→5)</th><th>Ready</th><th>Exam mode</th><th>To mark</th></tr></thead><tbody>
      ${filas.map(f => `<tr><td><b>${esc(f.g.name)}</b></td><td>${f.n}</td><td>${f.con} <span class="muted">(${f.n ? Math.round(100 * f.con / f.n) : 0} %)</span></td><td>${f.testsMed}</td><td><div class="yle-hist">${f.barraL}</div></td><td><div class="yle-hist">${f.barraR}</div></td><td>${f.listos} <span class="muted">(${f.con ? Math.round(100 * f.listos / f.con) : 0} % of those who practise)</span></td><td>${f.examen}</td><td>${f.pend ? '<span class="badge off">' + f.pend + '</span>' : '—'}</td></tr>`).join('') || '<tr><td colspan="9" class="muted">No grade has active students.</td></tr>'}
      </tbody></table></div></div>
    <div class="card"><h2 style="margin:0 0 6px">Official exam date · ${NIV[V.level]}</h2>
      <p class="muted" style="font-size:.9rem;margin:0 0 8px">It appears in each family’s report. If left empty, the report says «to be confirmed by the school».</p>
      <div class="yle-form"><label>Date (free text)<input id="yleFecha" value="${esc(set[fechaKey] || '')}" placeholder="e.g. Saturday 21 November 2026, 9:00"></label>
      <label>Note for the family<input id="yleNota" value="${esc(set[notaKey] || '')}" placeholder="e.g. at school; the Speaking exam is the same day in the afternoon"></label></div>
      <button class="btn sm" onclick="window._yleAjustes('${fechaKey}','${notaKey}')">Save</button> <span id="yleAjMsg" class="muted" style="font-size:.85rem"></span></div>`;
  if(!document.getElementById('yle-coord-css')) document.head.insertAdjacentHTML('beforeend', '<style id="yle-coord-css">.yle-hist{display:flex;gap:4px;align-items:flex-end;height:44px}.yle-dist{display:flex;flex-direction:column;align-items:center;gap:2px}.yle-dist i{display:block;width:14px;background:#d29a1f;border-radius:3px 3px 0 0}.yle-dist small{font-size:.65rem;color:var(--muted,#64748b)}</style>');
  // CSV: una fila por alumno con tests
  const csvFilas = [];
  V.grades.forEach(g => reales.filter(a => a.grade_id === g.id).forEach(a => { const x = porAlumno[a.id]; if(!x || !x.tests.size) return;
    csvFilas.push([g.name, nombre(a), NIV[V.level], x.tests.size, x.best.listening ?? '', x.sh.listening ?? '', x.best.rw ?? '', x.sh.rw ?? '', x.sp ?? '', x.exam ? 'yes' : 'no', vocabPor[a.id] || 0, x.pend, x.last ? fecha(x.last) : '']); }));
  window._yleCsv = () => {
    const head = ['Grade', 'Student', 'Level', 'Tests done', 'Listening best %', 'Listening est. shields', 'R&W best %', 'R&W est. shields', 'Speaking shields (teacher)', 'Exam mode', '2025 words mastered', 'To mark', 'Last attempt'];
    const q = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const csv = '\ufeff' + [head].concat(csvFilas).map(r => r.map(q).join(';')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'})); a.download = 'yle_' + V.level + '_' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); a.remove();
  };
}
window._yleAjustes = async function(fk, nk){
  const uid = (state.session && state.session.user && state.session.user.id) || null, now = new Date().toISOString();
  const rows = [{key: fk, value: $('#yleFecha').value.trim(), updated_at: now, updated_by: uid}, {key: nk, value: $('#yleNota').value.trim(), updated_at: now, updated_by: uid}];
  const {error} = await sb.from('yle_settings').upsert(rows, {onConflict: 'key'});
  $('#yleAjMsg').textContent = error ? 'Could not save: ' + error.message : 'Saved ✓';
};

/* ---------- Acceso ---------- */
async function vistaAcceso(){
  const {data, error} = await sb.from('yle_access').select('*');
  if(error) throw error;
  const map = {}; (data || []).forEach(r => map[r.grade_id + '/' + r.level] = r);
  const idx = {}; for(const l of Object.keys(NIV)) idx[l] = await indice(l);
  const filas = V.grades.map(g => `<tr data-g="${g.id}"><td><b>${esc(g.name)}</b></td>` + Object.keys(NIV).map(l => { const r = map[g.id + '/' + l]; const on = r ? r.unlocked : true; const mx = r ? r.max_test : 99; const n = idx[l].length;
    if(!n) return `<td><span class="muted" style="font-size:.85rem">not yet in the YLE engine</span></td>`;
    return `<td style="white-space:nowrap"><label><input type="checkbox" data-l="${l}" data-k="unlocked"${on ? ' checked' : ''}> open</label> <select data-l="${l}" data-k="max_test"><option value="99"${mx >= 99 ? ' selected' : ''}>all (${n})</option>${idx[l].map(t => `<option value="${t.number}"${mx === t.number ? ' selected' : ''}>up to test ${t.number}</option>`).join('')}<option value="0"${mx === 0 ? ' selected' : ''}>none</option></select>${r ? '' : ' <span class="muted" style="font-size:.8rem">no rule</span>'}</td>`; }).join('') +
    `<td><button class="btn sm" onclick="window._yleAccesoGuardar(this)">Save</button></td></tr>`).join('');
  $('#yleBody').innerHTML = `<div class="note">Which YLE practice tests each grade can open. <b>With no rule, a grade sees all the tests for the levels assigned to it</b> (the split from the Cambridge hub). With a saved row, the row takes over: closed hides the level; “up to test N” locks the following ones.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table><thead><tr><th>Grade</th>${Object.keys(NIV).map(l => '<th>' + NIV[l] + '</th>').join('')}<th></th></tr></thead><tbody>${filas}</tbody></table></div>`;
}
window._yleAccesoGuardar = async function(btn){
  const tr = btn.closest('tr'); const g = Number(tr.dataset.g); btn.disabled = true; btn.textContent = '…';
  const uid = (state.session && state.session.user && state.session.user.id) || null;
  const filas = Object.keys(NIV).filter(l => tr.querySelector(`[data-l="${l}"][data-k="unlocked"]`)).map(l => ({grade_id: g, level: l, unlocked: tr.querySelector(`[data-l="${l}"][data-k="unlocked"]`).checked, max_test: Number(tr.querySelector(`[data-l="${l}"][data-k="max_test"]`).value), updated_at: new Date().toISOString(), updated_by: uid}));
  const {error} = await sb.from('yle_access').upsert(filas, {onConflict: 'grade_id,level'});
  if(error) alert('Could not save: ' + error.message);
  window.ylePanel(V.grades);
};

/* ---------- Simulacro ---------- */
async function vistaSimulacro(){
  const ids = V.grades.map(g => g.id);
  const {data: abiertas, error} = await sb.from('yle_sessions').select('*').in('grade_id', ids).eq('status', 'open').order('started_at', {ascending: false});
  if(error) throw error;
  const idx = await indice(V.level);
  const spec = SPECS && SPECS.levels[V.level];
  $('#yleBody').innerHTML = `<div class="note">A mock exam is a classroom session: you open it for a grade, a test and a paper; the engine takes your students <b>straight into exam mode</b>, with no audio player (you play it here yourself, just once, as in the real exam), and their results appear below as they finish. Close it when you are done.</div>` +
    barra(true) + `<div class="card"><h2 style="margin:0 0 8px">Open a mock exam</h2><div class="yle-bar">
      <label>Test <select id="ysTest">${idx.map(t => `<option value="${t.number}">Test ${t.number} · ${esc(t.theme)}</option>`).join('')}</select></label>
      <label>Paper <select id="ysPaper"><option value="listening">Listening${spec ? ' (' + spec.listening.minutes + ' min)' : ''}</option><option value="rw">Reading &amp; Writing${spec ? ' (' + spec.rw.minutes + ' min)' : ''}</option></select></label>
      <button class="btn" onclick="window._yleAbrir()">Open session</button></div>${idx.length ? '' : '<p class="muted">This level does not have published tests yet.</p>'}</div>` +
    (abiertas || []).map(s => `<div class="card" id="ses${s.id}"><h2 style="margin:0 0 4px">🟢 ${esc((V.grades.find(g => g.id === s.grade_id) || {}).name || 'G' + s.grade_id)} · ${NIV[s.level]} · Test ${s.test} · ${PAPER[s.paper]}</h2>
      <div class="muted" style="font-size:.85rem">Opened ${fecha(s.started_at)}</div>
      ${s.paper === 'listening' ? `<h3 style="margin:10px 0 4px">Audio for the projector (once per part)</h3><div class="yle-audio">${(SPECS ? SPECS.levels[s.level].listening.parts : [1, 2, 3, 4]).map(pt => { const n = pt.n || pt; return `<div class="muted" style="font-size:.85rem">Part ${n}</div><audio controls preload="none" src="${YM(`yle-audio/${s.level}/test_${String(s.test).padStart(2, '0')}_part${n}.mp3`)}"></audio>`; }).join('')}</div>
      <p><button class="btn sm ghost" onclick="window._yleVerGuion('${s.level}',${s.test})">📻 View this test’s script</button></p>` : ''}
      <h3 style="margin:10px 0 4px">Live results</h3><div class="yle-live" data-live="${s.id}">Waiting…</div>
      <p><button class="btn sm ghost" onclick="window._yleCerrar('${s.id}')">Close session</button></p></div>`).join('');
  const refresca = async () => { for(const s of (abiertas || [])){ const el = document.querySelector(`[data-live="${s.id}"]`); if(!el) continue; const {data} = await sb.from('yle_attempts').select('student_id, score, total, shields_est, created_at, profiles!inner(full_name, first_name, last_name)').eq('session_id', s.id).order('created_at'); const rows = data || []; el.innerHTML = rows.length ? `<table><thead><tr><th>Student</th><th>Grade</th><th>Shields</th><th>Time</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(nombre(r.profiles))}</td><td>${r.score} / ${r.total} (${pct(r.score, r.total)} %)</td><td>${escudos(r.shields_est)}</td><td>${fecha(r.created_at)}</td></tr>`).join('')}</tbody></table>` : '<span class="muted">No one has finished yet.</span>'; } };
  await refresca(); pollTimer = setInterval(refresca, 8000);
}
window._yleAbrir = async function(){
  const test = Number($('#ysTest').value), paper = $('#ysPaper').value; if(!test) return;
  const {error} = await sb.from('yle_sessions').insert({grade_id: V.grade, level: V.level, test, paper});
  if(error) alert('Could not open: ' + error.message);
  window.ylePanel(V.grades);
};
window._yleCerrar = async function(id){
  const {error} = await sb.from('yle_sessions').update({status: 'closed', closed_at: new Date().toISOString()}).eq('id', id);
  if(error) alert('Could not close: ' + error.message);
  window.ylePanel(V.grades);
};
})();
