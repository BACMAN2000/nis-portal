/* =========================================================================
   Panel YLE del profesor y del admin (Ruta YLE 2026, Fase 2) — nis-portal/yle-panel.js
   Lo pinta app.js en #main cuando la pestaña es 'yle' (window.ylePanel(grades)).
   Cuatro vistas:
     · Por grado    — alumno × nivel/test/paper con lo más flojo arriba y la parte más débil de cada uno
     · Corrección   — cola de intentos con parte del profesor (Speaking grabado, escritura de Movers/Flyers,
                      láminas coloreadas) y el formulario con las escalas oficiales
     · Acceso       — qué nivel y hasta qué test ve cada grado (tabla yle_access; sin fila = todo abierto)
     · Simulacro    — sesión de aula: el profesor la abre, pone el audio una sola vez y ve los resultados llegar
   Depende de app.js: sb, state, esc, $, GRADES. Los datos vienen de yle_attempts (RLS por grado del profesor).
   ========================================================================= */
(function(){
'use strict';
const NIV = {starters: 'Pre A1 Starters', movers: 'A1 Movers', flyers: 'A2 Flyers'};
const PAPER = {listening: 'Listening', rw: 'Reading & Writing', speaking: 'Speaking'};
const ESCALAS = [
  ['vocabulary_and_grammar', 'Vocabulary & grammar', 'Usa las palabras y estructuras del nivel; se le entiende aunque haya errores.'],
  ['pronunciation', 'Pronunciation', 'Se entienden las palabras; ritmo y entonación adecuados al nivel.'],
  ['interaction', 'Interaction', 'Responde a lo que se le pregunta, pide que repitan si hace falta, mantiene la conversación.']
];
let SPECS = null, TESTS = {}, INDICES = {};
let V = {view: 'grado', grade: null, level: 'starters', grades: []};
let pollTimer = null;

const nombre = p => (p && (p.full_name || [p.first_name, p.last_name].filter(Boolean).join(' '))) || '—';
const fecha = s => s ? new Date(s).toLocaleString('es-PE', {dateStyle: 'short', timeStyle: 'short'}) : '';
const pct = (s, t) => t ? Math.round(100 * s / t) : null;
const j = (u) => fetch(u, {cache: 'no-cache'}).then(r => { if(!r.ok) throw new Error(u); return r.json(); });
async function specs(){ if(!SPECS){ try { SPECS = await j('yle/specs.json'); } catch(e){ SPECS = null; } } return SPECS; }
async function indice(level){ if(!INDICES[level]){ try { INDICES[level] = await j('yle/' + level + '/index.json'); } catch(e){ INDICES[level] = []; } } return INDICES[level]; }
async function testJson(level, n){ const k = level + n; if(!TESTS[k]){ try { TESTS[k] = await j('yle/' + level + '/test-' + String(n).padStart(2, '0') + '.json'); } catch(e){ TESTS[k] = null; } } return TESTS[k]; }
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
</style>`;

window.ylePanel = async function(grades){
  V.grades = grades || (window.GRADES || []);
  if(!V.grade || !V.grades.some(g => g.id === V.grade)) V.grade = V.grades.length ? V.grades[0].id : null;
  await specs();
  if(!document.getElementById('yle-panel-css')) document.head.insertAdjacentHTML('beforeend', CSS);
  clearInterval(pollTimer);
  const vistas = [['grado', '📊 Por grado'], ['cola', '✅ Corrección'], ['acceso', '🔐 Acceso'], ['simulacro', '🏫 Simulacro']];
  const cab = `<h1>🛡️ Panel YLE</h1>
    <div class="note">Los practice tests de Cambridge Young Learners de cada grado: quién los hizo, cómo le fue parte por parte, qué queda por corregir y qué tests puede abrir cada grado. Los escudos son la <b>estimación del colegio</b>, no un resultado de Cambridge.</div>
    <div class="yle-pills">${vistas.map(v => `<button class="${v[0] === V.view ? 'on' : ''}" onclick="window._yleVista('${v[0]}')">${v[1]}</button>`).join('')}</div>
    <div id="yleBody"><p class="muted">Cargando…</p></div>`;
  $('#main').innerHTML = cab;
  try {
    if(V.view === 'grado') await vistaGrado();
    else if(V.view === 'cola') await vistaCola();
    else if(V.view === 'acceso') await vistaAcceso();
    else await vistaSimulacro();
  } catch(e){ $('#yleBody').innerHTML = `<div class="note err">${esc(e.message || String(e))}</div>`; }
};
window._yleVista = v => { V.view = v; window.ylePanel(V.grades); };
window._yleGrado = v => { V.grade = Number(v); window.ylePanel(V.grades); };
window._yleNivel = v => { V.level = v; window.ylePanel(V.grades); };

function barra(conNivel){
  return `<div class="yle-bar"><label>Grado <select onchange="window._yleGrado(this.value)">${V.grades.map(g => `<option value="${g.id}"${g.id === V.grade ? ' selected' : ''}>${esc(g.name)}</option>`).join('')}</select></label>` +
    (conNivel ? `<label>Nivel <select onchange="window._yleNivel(this.value)">${Object.keys(NIV).map(l => `<option value="${l}"${l === V.level ? ' selected' : ''}>${NIV[l]}</option>`).join('')}</select></label>` : '') + '</div>';
}
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
     <div class="muted" style="font-size:.9rem">${alumnos.length} alumnos · ${conIntentos} con tests hechos · ${filas.reduce((n, f) => n + f.pend, 0)} intentos por corregir</div>
     ${spec ? `<h3 style="margin:12px 0 4px">Dónde flojea la clase (aciertos por parte, todos los intentos)</h3>
     <div style="overflow-x:auto"><table class="yle-heat"><thead><tr><th></th>${Array.from({length: maxParts}, (_, i) => '<th>Part ' + (i + 1) + '</th>').join('')}</tr></thead><tbody>${heat}</tbody></table></div>` : ''}</div>
     <div class="card" style="padding:0;overflow-x:auto"><table><thead><tr><th>Alumno</th><th>Tests hechos</th><th>Media</th><th>Listening</th><th>R&amp;W</th><th>Speaking</th><th>Parte más floja</th><th>Por corregir</th></tr></thead><tbody>` +
     filas.map(f => `<tr><td><b>${esc(nombre(f.al))}</b></td><td>${f.hechos}</td><td>${f.media == null ? '<span class="muted">—</span>' : '<b>' + f.media + ' %</b>'}</td>` +
       `<td>${f.ult.listening ? escudos(f.ult.listening) : '—'}</td><td>${f.ult.rw ? escudos(f.ult.rw) : '—'}</td><td>${f.ult.speaking ? escudos(f.ult.speaking) : '—'}</td>` +
       `<td>${f.floja ? esc(nombreParte(f.floja.k)) + ' (' + f.floja.p + ' %)' : '<span class="muted">—</span>'}</td><td>${f.pend ? '<span class="badge off">' + f.pend + '</span>' : ''}</td></tr>`).join('') +
     `</tbody></table></div>` +
     `<p class="muted" style="font-size:.85rem">Media = promedio del mejor intento de cada test y paper. Los escudos son los del último intento. "Parte más floja" suma todos sus intentos, parte por parte.</p>`;
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
  if(!cola.length){ $('#yleBody').innerHTML = '<div class="card"><b>Nada por corregir.</b> Aquí aparecen las grabaciones de Speaking, la escritura de Movers y Flyers y las láminas coloreadas de tus grados.</div>'; return; }
  const out = [];
  for(const a of cola.slice(0, 40)) out.push(await tarjeta(a, nombres[a.student_id]));
  $('#yleBody').innerHTML = `<p class="muted">${cola.length} intentos por corregir${cola.length > 40 ? ' (se muestran 40)' : ''}. Cada uno guarda tu nota y tu comentario en la cuenta del alumno.</p>` + out.join('');
  cola.slice(0, 40).forEach(a => { const el = document.getElementById('au' + a.id); if(el && a.audio_path) sb.storage.from('fun-speaking').createSignedUrl(a.audio_path, 3600).then(r => { if(r.data && r.data.signedUrl) el.innerHTML = '<audio controls preload="none" src="' + r.data.signedUrl + '"></audio>'; else el.textContent = 'No se pudo abrir la grabación.'; }); });
}
async function tarjeta(a, quien){
  const T = await testJson(a.level, a.test);
  const ans = a.answers || {}, parts = a.parts || {};
  let cuerpo = '', form = '';
  if(a.paper === 'speaking'){
    cuerpo = `<div class="yle-audio" id="au${a.id}">${a.audio_path ? 'Cargando la grabación…' : '<span class="muted">Sin grabación (solo señalar y colocar tarjetas).</span>'}</div>` +
      (ans.part ? `<div class="meta">Parte grabada: ${esc(String(ans.part))}</div>` : '') + (a.score != null ? `<div class="meta">Parte automática: ${a.score} / ${a.total}</div>` : '');
    form = `<div class="yle-form">${ESCALAS.map(e => `<label>${e[1]}<select data-crit="${e[0]}">${[0, 1, 2, 3, 4, 5].map(n => `<option value="${n}"${n === 3 ? ' selected' : ''}>${n}</option>`).join('')}</select><small>${e[2]}</small></label>`).join('')}</div>`;
  } else if(a.paper === 'rw'){
    // campos del profesor: p6_t* (respuestas) y p6_w* (frases libres) de Movers; p7_* de Flyers (historia)
    const pk = Object.keys(parts).find(k => parts[k] && parts[k].teacher > 0) || 'p6';
    const P = T && T.rw && T.rw[pk];
    const campos = Object.keys(ans).filter(k => k.indexOf(pk + '_t') === 0 || k.indexOf(pk + '_w') === 0 || k.indexOf(pk + '_s') === 0).sort();
    cuerpo = (P && P.image ? `<img src="yle-img/${a.level}/test_${String(a.test).padStart(2, '0')}_${P.image}.jpg" alt="" style="max-width:420px;width:100%;border-radius:10px;display:block;margin:6px 0">` : '') +
      campos.map(k => { const i = +k.replace(/^p\d+_[tws]/, ''); const preg = P && k.indexOf('_t') > 0 && P.answer && P.answer[i] ? P.answer[i].q : (k.indexOf('_w') > 0 ? 'Frase ' + (i + 1) + ' sobre el dibujo' : 'Historia'); const modelo = P && k.indexOf('_t') > 0 && P.answer && P.answer[i] ? P.answer[i].model : ''; return `<div class="yle-ans"><b>${esc(preg)}</b><br>${esc(ans[k] || '—')}${modelo ? `<br><span class="muted">Modelo: ${esc(modelo)}</span>` : ''}</div>`; }).join('') +
      (a.score != null ? `<div class="meta">Parte automática: ${a.score} / ${a.total}</div>` : '');
    form = `<div class="yle-form">${campos.map(k => { const max = k.indexOf('_t') > 0 ? 1 : (k.indexOf('_s') > 0 ? 5 : 3); return `<label>${esc(k.replace(pk + '_', '').replace('t', 'Respuesta ').replace('w', 'Frase ').replace('s', 'Historia '))} (0–${max})<input type="number" min="0" max="${max}" value="0" data-crit="${k}" data-max="${max}"></label>`; }).join('')}</div>` +
      `<p class="muted" style="font-size:.85rem">Movers Part 6: respuestas 1 punto, frases 3 puntos (10 en total). Flyers Part 7: historia hasta 5. Valora contenido, vocabulario y gramática del nivel.</p>`;
  } else {
    const lam = Object.keys(a.drawings || {});
    cuerpo = `<div class="meta">Láminas coloreadas: ${lam.length ? lam.map(esc).join(', ') : 'ninguna'} · parte automática ${a.score} / ${a.total}</div>` +
      lam.map(k => { const id = k.split('#').pop(); return `<img src="yle-img/${a.level}/test_${String(a.test).padStart(2, '0')}_${id}.jpg" alt="" style="max-width:300px;width:100%;border-radius:10px;display:inline-block;margin:4px 6px 4px 0">`; }).join('') +
      `<p class="muted" style="font-size:.85rem">Los trazos se guardan en la cuenta del alumno; pídele que te enseñe la lámina en su pantalla o revisa con la clave del test.</p>`;
    form = `<div class="yle-form"><label>Colorear y escribir (0–5)<input type="number" min="0" max="5" value="5" data-crit="colouring" data-max="5"></label></div>`;
  }
  return `<div class="yle-item" id="it${a.id}"><h3>${esc(quien || '')} — ${NIV[a.level]} · Test ${a.test} · ${PAPER[a.paper]}</h3>
    <div class="meta">${fecha(a.created_at)} · modo ${a.mode === 'exam' ? 'examen' : 'práctica'}</div>${cuerpo}${form}
    <textarea placeholder="Comentario para el alumno (opcional)"></textarea>
    <button class="btn sm" onclick="window._yleGuardar('${a.id}','${a.paper}')">Guardar corrección</button> <span class="muted" data-msg></span></div>`;
}
window._yleGuardar = async function(id, paper){
  const box = document.getElementById('it' + id); if(!box) return;
  const btn = box.querySelector('button'); btn.disabled = true;
  const crit = {}; let tot = 0, max = 0;
  box.querySelectorAll('[data-crit]').forEach(el => { const v = Number(el.value) || 0; crit[el.dataset.crit] = v; tot += v; max += Number(el.dataset.max || 5); });
  crit.teacher_total = tot; crit.teacher_max = max;
  const fb = box.querySelector('textarea').value.trim();
  const fila = {criteria: crit, feedback: fb || null, reviewed_by: (state.session && state.session.user && state.session.user.id) || null, reviewed_at: new Date().toISOString()};
  if(paper === 'speaking'){ fila.shields_est = Math.max(1, Math.round(tot / ESCALAS.length)); fila.score = tot; fila.total = max; }
  else {
    const {data} = await sb.from('yle_attempts').select('score,total').eq('id', id).maybeSingle();
    if(data && data.total != null){ const p = pct((data.score || 0) + tot, (data.total || 0) + max); if(p != null) fila.shields_est = band(p); }
  }
  const {error} = await sb.from('yle_attempts').update(fila).eq('id', id);
  const msg = box.querySelector('[data-msg]');
  if(error){ msg.textContent = 'No se pudo guardar: ' + error.message; btn.disabled = false; return; }
  msg.textContent = 'Guardado ✓'; setTimeout(() => box.remove(), 700);
};

/* ---------- Acceso ---------- */
async function vistaAcceso(){
  const {data, error} = await sb.from('yle_access').select('*');
  if(error) throw error;
  const map = {}; (data || []).forEach(r => map[r.grade_id + '/' + r.level] = r);
  const idx = {}; for(const l of Object.keys(NIV)) idx[l] = await indice(l);
  const filas = V.grades.map(g => `<tr data-g="${g.id}"><td><b>${esc(g.name)}</b></td>` + Object.keys(NIV).map(l => { const r = map[g.id + '/' + l]; const on = r ? r.unlocked : true; const mx = r ? r.max_test : 99; const n = idx[l].length;
    if(!n) return `<td><span class="muted" style="font-size:.85rem">aún no en el motor YLE</span></td>`;
    return `<td style="white-space:nowrap"><label><input type="checkbox" data-l="${l}" data-k="unlocked"${on ? ' checked' : ''}> abierto</label> <select data-l="${l}" data-k="max_test"><option value="99"${mx >= 99 ? ' selected' : ''}>todos (${n})</option>${idx[l].map(t => `<option value="${t.number}"${mx === t.number ? ' selected' : ''}>hasta el test ${t.number}</option>`).join('')}<option value="0"${mx === 0 ? ' selected' : ''}>ninguno</option></select>${r ? '' : ' <span class="muted" style="font-size:.8rem">sin regla</span>'}</td>`; }).join('') +
    `<td><button class="btn sm" onclick="window._yleAccesoGuardar(this)">Guardar</button></td></tr>`).join('');
  $('#yleBody').innerHTML = `<div class="note">Qué practice tests YLE puede abrir cada grado. <b>Sin regla, un grado ve todos los tests de los niveles que le tocan</b> (el reparto del hub Cambridge). Con una fila guardada, manda la fila: cerrado oculta el nivel; "hasta el test N" deja los siguientes con candado.</div>
    <div class="card" style="padding:0;overflow-x:auto"><table><thead><tr><th>Grado</th>${Object.keys(NIV).map(l => '<th>' + NIV[l] + '</th>').join('')}<th></th></tr></thead><tbody>${filas}</tbody></table></div>`;
}
window._yleAccesoGuardar = async function(btn){
  const tr = btn.closest('tr'); const g = Number(tr.dataset.g); btn.disabled = true; btn.textContent = '…';
  const uid = (state.session && state.session.user && state.session.user.id) || null;
  const filas = Object.keys(NIV).filter(l => tr.querySelector(`[data-l="${l}"][data-k="unlocked"]`)).map(l => ({grade_id: g, level: l, unlocked: tr.querySelector(`[data-l="${l}"][data-k="unlocked"]`).checked, max_test: Number(tr.querySelector(`[data-l="${l}"][data-k="max_test"]`).value), updated_at: new Date().toISOString(), updated_by: uid}));
  const {error} = await sb.from('yle_access').upsert(filas, {onConflict: 'grade_id,level'});
  if(error) alert('No se pudo guardar: ' + error.message);
  window.ylePanel(V.grades);
};

/* ---------- Simulacro ---------- */
async function vistaSimulacro(){
  const ids = V.grades.map(g => g.id);
  const {data: abiertas, error} = await sb.from('yle_sessions').select('*').in('grade_id', ids).eq('status', 'open').order('started_at', {ascending: false});
  if(error) throw error;
  const idx = await indice(V.level);
  const spec = SPECS && SPECS.levels[V.level];
  $('#yleBody').innerHTML = `<div class="note">Un simulacro es una sesión de aula: la abres para un grado, un test y un paper; a tus alumnos el motor les entra <b>directo en modo examen</b>, sin reproductor de audio (lo pones tú aquí, una sola vez, como en el examen real), y sus resultados aparecen abajo según terminan. Ciérrala al acabar.</div>` +
    barra(true) + `<div class="card"><h2 style="margin:0 0 8px">Abrir un simulacro</h2><div class="yle-bar">
      <label>Test <select id="ysTest">${idx.map(t => `<option value="${t.number}">Test ${t.number} · ${esc(t.theme)}</option>`).join('')}</select></label>
      <label>Paper <select id="ysPaper"><option value="listening">Listening${spec ? ' (' + spec.listening.minutes + ' min)' : ''}</option><option value="rw">Reading &amp; Writing${spec ? ' (' + spec.rw.minutes + ' min)' : ''}</option></select></label>
      <button class="btn" onclick="window._yleAbrir()">Abrir sesión</button></div>${idx.length ? '' : '<p class="muted">Este nivel aún no tiene tests publicados.</p>'}</div>` +
    (abiertas || []).map(s => `<div class="card" id="ses${s.id}"><h2 style="margin:0 0 4px">🟢 ${esc((V.grades.find(g => g.id === s.grade_id) || {}).name || 'G' + s.grade_id)} · ${NIV[s.level]} · Test ${s.test} · ${PAPER[s.paper]}</h2>
      <div class="muted" style="font-size:.85rem">Abierta ${fecha(s.started_at)}</div>
      ${s.paper === 'listening' ? `<h3 style="margin:10px 0 4px">Audio para el proyector (una sola vez por parte)</h3><div class="yle-audio">${(SPECS ? SPECS.levels[s.level].listening.parts : [1, 2, 3, 4]).map(pt => { const n = pt.n || pt; return `<div class="muted" style="font-size:.85rem">Part ${n}</div><audio controls preload="none" src="yle-audio/${s.level}/test_${String(s.test).padStart(2, '0')}_part${n}.mp3"></audio>`; }).join('')}</div>` : ''}
      <h3 style="margin:10px 0 4px">Resultados en vivo</h3><div class="yle-live" data-live="${s.id}">Esperando…</div>
      <p><button class="btn sm ghost" onclick="window._yleCerrar('${s.id}')">Cerrar sesión</button></p></div>`).join('');
  const refresca = async () => { for(const s of (abiertas || [])){ const el = document.querySelector(`[data-live="${s.id}"]`); if(!el) continue; const {data} = await sb.from('yle_attempts').select('student_id, score, total, shields_est, created_at, profiles!inner(full_name, first_name, last_name)').eq('session_id', s.id).order('created_at'); const rows = data || []; el.innerHTML = rows.length ? `<table><thead><tr><th>Alumno</th><th>Nota</th><th>Escudos</th><th>Hora</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(nombre(r.profiles))}</td><td>${r.score} / ${r.total} (${pct(r.score, r.total)} %)</td><td>${escudos(r.shields_est)}</td><td>${fecha(r.created_at)}</td></tr>`).join('')}</tbody></table>` : '<span class="muted">Todavía nadie ha terminado.</span>'; } };
  await refresca(); pollTimer = setInterval(refresca, 8000);
}
window._yleAbrir = async function(){
  const test = Number($('#ysTest').value), paper = $('#ysPaper').value; if(!test) return;
  const {error} = await sb.from('yle_sessions').insert({grade_id: V.grade, level: V.level, test, paper});
  if(error) alert('No se pudo abrir: ' + error.message);
  window.ylePanel(V.grades);
};
window._yleCerrar = async function(id){
  const {error} = await sb.from('yle_sessions').update({status: 'closed', closed_at: new Date().toISOString()}).eq('id', id);
  if(error) alert('No se pudo cerrar: ' + error.message);
  window.ylePanel(V.grades);
};
})();
