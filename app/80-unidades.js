

/* ---------------------------------------------------------------
   🎯 Productos de unidad — lo que el alumno entrega en el hub de la
   unidad (unit-g9-u5.html). Sustituye al "promedio de mock" como
   primera lectura del profesor: manda el avance POR CRITERIO de la
   rúbrica de Toddle, y la nota queda debajo.
---------------------------------------------------------------- */
const UNIT_CRIT = { '1':'Speaking & listening', '2':'Reading', '3':'Writing' };
/* De mayor a menor, igual que en el hub del alumno (unit.html): primero
   adonde se quiere llegar. La nota vigesimal sale de los niveles con la
   misma tabla que el corrector de producciones escritas (writing-rubrics.js). */
/* El nivel en que trabaja cada alumno (profiles.cefr_level) va junto a su
   nombre en todos los paneles de correccion: se corrige a cada uno con su
   nivel, no con una vara unica. Pedido el 11-sep-2026. */
function nivelBadge(lvl, tomado){
  if(!lvl) return '<span class="badge" style="background:#fee2e2" title="No level set for this student: 👥 Users → Cambridge level">no level</span>';
  const mal = tomado && String(tomado).toUpperCase() !== String(lvl).toUpperCase();
  return `<span class="badge" style="background:${mal?'#fef3c7':'#e7ecfd'}" title="${mal?'Took the '+String(tomado).toUpperCase()+' exam; works at '+esc(lvl):'Works at '+esc(lvl)}">${mal?'⚠ took '+esc(String(tomado).toUpperCase())+' · level '+esc(lvl):'level '+esc(lvl)}</span>`;
}
const UNIT_LVL  = ['AD','A','B','C'];
const UNIT_VIG  = { AD:19, A:16, B:12, C:8 };
const UNIT_SIG  = { AD:'outstanding achievement', A:'expected achievement', B:'in progress', C:'beginning' };
const UNIT_TRAMO= { AD:'18-20', A:'14-17', B:'11-13', C:'0-10' };
const UNIT_FONDO= { AD:'#dcfce7', A:'#e0f2fe', B:'#fef9c3', C:'#fee2e2' };
/* Cómo se escribió el texto — writing-trace.js en las páginas del alumno
   cuenta pulsaciones, minutos con la caja activa y pegados bloqueados, y lo
   deja en payload.trace (un rastro por producto; por campo en las fichas).
   Sin rastro = anterior al 11-sep-2026 o escrito en una caja sin vigilar.
   No se juzga aquí: se enseña y decide el docente. */
function traceDe(payload, campo){
  const tr = payload && payload.trace; if(!tr || typeof tr!=='object') return null;
  if(typeof tr.keys==='number' || Array.isArray(tr.pastes)) return tr;
  if(campo && tr[campo]) return tr[campo];
  const ks = Object.keys(tr); return ks.length===1 ? tr[ks[0]] : null;
}
function traceResumen(t){
  if(!t || (!t.keys && !t.blocked && !t.allowed)) return '— no writing trace (before 11 Sep, or typed in an unmonitored box)';
  const min = Math.round((t.active_s||0)/60), out = [`✍️ ${(t.keys||0).toLocaleString('en')} keystrokes`, `${(t.typed||0).toLocaleString('en')} characters typed`, `${min} min in the box`];
  const tams = ok => (t.pastes||[]).filter(x=>!x.ok===!ok && x.chars>0).map(x=>x.chars.toLocaleString('en'));
  if(t.blocked){
    const tam = tams(false);
    out.push(`🚫 ${t.blocked} paste${t.blocked===1?'':'s'} blocked${tam.length?' ('+tam.join(', ')+' chars)':''}`);
  }
  /* Puerta abierta por un admin (profiles.paste_allowed_until): el pegado
     entró, pero se enseña igual — el tamaño frente a lo tecleado dice
     cuánto del texto vino de fuera. */
  if(t.allowed){
    const ok = tams(true);
    out.push(`📋 ${t.allowed} paste${t.allowed===1?'':'s'} allowed by the teacher${ok.length?' ('+ok.join(', ')+' chars)':''}`);
  }
  if(!t.blocked && !t.allowed) out.push('no pastes');
  return out.join(' · ');
}
function traceHTML(payload, campo){
  const t = traceDe(payload, campo);
  const color = t&&t.blocked ? ';color:#b91c1c;font-weight:600' : t&&t.allowed ? ';color:#1d4ed8;font-weight:600' : '';
  return `<div class="muted" style="font-size:.76rem;margin-top:4px${color}">${esc(traceResumen(t))}</div>`;
}
function unitNota(crits, puestos){
  const vs = crits.map(c=>UNIT_VIG[(puestos||{})[c.n]]).filter(v=>v!=null);
  if(!vs.length) return null;
  return Math.round(vs.reduce((a,b)=>a+b,0)/vs.length);
}
function unitNivelDeNota(n){ return n==null ? null : n>=18 ? 'AD' : n>=14 ? 'A' : n>=11 ? 'B' : 'C'; }

/* Lo que la pantalla tiene entre manos: los filtros, el alumno abierto y las
   filas ya cargadas, para pasar de un alumno a otro sin volver a la base. */
const _unit = { grade:null, unit:null, section:'', i:0, filas:[], quien:{}, plan:{}, DELS:[], crits:[], firmadas:{}, rubrica:true };

async function unitProductsPanel(){
  const main = $('#main');
  main.innerHTML = '<div class="card"><p class="muted">Loading submissions…</p></div>';

  const { data, error } = await sb
    .from('unit_submissions')
    .select('id,student_id,grade,unit,milestone,kind,payload,file_path,score,criteria,feedback,reviewed_at,released_at,created_at,updated_at,shared')
    .order('updated_at', { ascending:false })
    .limit(3000);

  if (error){
    main.innerHTML = `<div class="card"><p class="err">Could not read the submissions: ${esc(error.message)}</p></div>`;
    return;
  }
  /* Solo el producto de la unidad (hito 'final'): el Writing de los examenes
     de unidad se corrige en 📋 Examenes de unidad, junto a su nota. */
  const productos = (data||[]).filter(r=>r.milestone==='final');
  if (!productos.length){
    main.innerHTML = `<div class="card"><h2>🎯 Unit products</h2>
      <p class="muted">There are no submissions yet. They will appear here once students
      write or upload their product in the unit hub.</p></div>`;
    return;
  }

  const worksheets = (data||[]).filter(r=>r.kind==='worksheet');
  const ids = [...new Set(productos.concat(worksheets).map(r=>r.student_id))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section,cefr_level').in('id', ids);
  const quien = Object.fromEntries((gente||[]).map(p=>[p.id,p]));
  const seccionDe = r => String((quien[r.student_id]||{}).section||'').trim();

  /* Grado → unidad → seccion. Si lo elegido ya no existe (o es la primera
     vez) se abre lo mas reciente, que es lo que se esta corrigiendo. */
  const numG = g => parseInt(String(g).replace(/\D/g,''),10)||0;
  const grados = [...new Set(productos.map(r=>r.grade))].sort((a,b)=>numG(a)-numG(b));
  if(grados.indexOf(_unit.grade)<0) _unit.grade = productos[0].grade;
  const deGrado = productos.filter(r=>r.grade===_unit.grade);
  const unidades = [...new Set(deGrado.map(r=>String(r.unit)))].sort((a,b)=>a-b);
  if(unidades.indexOf(String(_unit.unit))<0) _unit.unit = String(deGrado[0].unit);
  const dataGU = deGrado.filter(r=>String(r.unit)===_unit.unit);
  const secciones = [...new Set(dataGU.map(seccionDe).filter(Boolean))].sort();
  if(_unit.section && secciones.indexOf(_unit.section)<0) _unit.section = '';
  const dataF = _unit.section ? dataGU.filter(r=>seccionDe(r)===_unit.section) : dataGU;

  const plan = unitPlansFor(_unit.grade).find(u=>String(u.n)===_unit.unit) || {};
  /* Los productos que la unidad declara en unit-plans.js, en su orden — en
     9.º U4: el articulo, el podcast y la reflexion del editor. Si la unidad no
     tiene plan, los tres de siempre. El cuaderno va aparte. */
  const dels = (plan.deliverables||[]).filter(d=>d.kind!=='notebook');
  const DELS = dels.length ? dels : [
    {kind:'report',type:'text',icon:'📄',title:'Report'},
    {kind:'presentation',type:'file',icon:'🎤',title:'Presentation'},
    {kind:'reflection',type:'text',icon:'💭',title:'Reflection'}];
  const crits = (plan.criteria||[]).length
    ? plan.criteria.map(c=>({n:String(c.n), text:c.text, levels:c.levels||null}))
    : Object.keys(UNIT_CRIT).map(k=>({n:k, text:UNIT_CRIT[k], levels:null}));

  const porAlumno = {};
  dataF.forEach(r=>{ (porAlumno[r.student_id] = porAlumno[r.student_id] || {alumno:r.student_id})[r.kind] = r; });
  const filas = Object.values(porAlumno).sort((a,b)=>{
    const pa=quien[a.alumno]||{}, pb=quien[b.alumno]||{};
    return String(pa.section||'').localeCompare(String(pb.section||'')) ||
           String(pa.full_name||'').localeCompare(String(pb.full_name||''));
  });

  /* Los archivos se firman todos de golpe: el bucket es privado y cada
     reproductor necesita su enlace temporal. */
  const firmadas = {};
  const rutas = dataF.filter(r=>r.file_path).map(r=>r.file_path);
  if(rutas.length){
    const { data: urls } = await sb.storage.from('unit-products').createSignedUrls(rutas, 7200);
    (urls||[]).forEach(u=>{ if(u && u.signedUrl && !u.error) firmadas[u.path]=u.signedUrl; });
  }

  Object.assign(_unit, { filas, quien, plan, DELS, crits, firmadas });
  if(_unit.i >= filas.length) _unit.i = 0;

  /* Las fichas digitales de la misma unidad y seccion, debajo, con el mismo
     formato: una ficha elegida y un alumno cada vez. `blocks` sirve para
     poner el enunciado junto a cada respuesta, como en Corregir fichas. */
  const fichas = worksheets.filter(r=>r.grade===_unit.grade && String(r.unit)===_unit.unit &&
    (!_unit.section || seccionDe(r)===_unit.section));
  let planillas = [];
  if(fichas.length){
    const { data: ws } = await sb.from('worksheets').select('level,week,session,title,rubric,blocks')
      .eq('grade',_unit.grade).eq('unit',parseInt(_unit.unit,10));
    planillas = ws || [];
  }
  Object.assign(_unit, { fichas, planillas });

  /* Cuantos van evaluados y en que nivel global quedaron, con palabras: una
     letra con un numero detras no le dice nada a nadie. */
  const dist = {}; let evaluados = 0;
  filas.forEach(f=>{
    const base = f.report || f.presentation || f.reflection;
    const n = base && unitNota(crits, base.criteria);
    if(n==null) return;
    evaluados++; const l = unitNivelDeNota(n); dist[l] = (dist[l]||0)+1;
  });

  const opt = (v, txt, sel) => `<option value="${esc(String(v))}"${sel?' selected':''}>${esc(txt)}</option>`;
  const rotuloGrado = g => (GRADE_META[g]||[])[1] || g;
  const rubrica = `<details ${_unit.rubrica?'open':''} ontoggle="_unit.rubrica=this.open" style="margin-top:12px">
    <summary style="cursor:pointer;font-weight:700">📏 Unit rubric — what each level means for each criterion</summary>
    <div style="overflow-x:auto;margin-top:8px"><table class="tbl">
      <thead><tr><th style="min-width:180px">Criterion</th>
        ${UNIT_LVL.map(l=>`<th>${l} · ${UNIT_SIG[l]}<div class="muted" style="font-weight:400;font-size:.72rem">grade ${UNIT_TRAMO[l]}</div></th>`).join('')}</tr></thead>
      <tbody>${crits.map(c=>`<tr><td><b>${c.n}.</b> ${esc(c.text)}</td>
        ${UNIT_LVL.map(l=>`<td style="font-size:.8rem;vertical-align:top">${esc((c.levels||{})[l]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="muted" style="font-size:.78rem;margin:8px 0 0">The student’s grade is calculated automatically from the levels you set:
      AD = 19 · A = 16 · B = 12 · C = 8, average of the criteria, rounded. It is the same table used to
      mark written productions.</p>
  </details>`;

  main.innerHTML = `<div class="card">
    <h2>🎯 Unit products</h2>
    <p class="muted">What students produce, not what they get right. One student at a time, with their products in front
      and the rubric below; use the arrows (or ← → on the keyboard) to move to the next.</p>
    <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:12px 0 0">
      <label style="font-size:.85rem">Grade <select onchange="unitFiltra('grade',this.value)" style="margin-left:4px">
        ${grados.map(g=>opt(g, rotuloGrado(g), g===_unit.grade)).join('')}</select></label>
      <label style="font-size:.85rem">Section <select onchange="unitFiltra('section',this.value)" style="margin-left:4px">
        ${opt('', 'All', !_unit.section)}${secciones.map(x=>opt(x, x, x===_unit.section)).join('')}</select></label>
      <label style="font-size:.85rem">Unit <select onchange="unitFiltra('unit',this.value)" style="margin-left:4px">
        ${unidades.map(u=>opt(u, 'Unit '+u, u===_unit.unit)).join('')}</select></label>
      <span class="muted" style="font-size:.8rem">${filas.length} student${filas.length===1?'':'s'} with submissions
        · <b>${evaluados}</b> student${evaluados===1?'':'s'} graded${evaluados?' — '+UNIT_LVL.filter(l=>dist[l]).map(l=>`${dist[l]} in ${l} (${UNIT_SIG[l]})`).join(', '):''}</span>
    </div>
    <p style="margin:12px 0 0"><b>${esc(rotuloGrado(_unit.grade))}${_unit.section?' '+esc(_unit.section):''} · Unit ${esc(_unit.unit)}${plan.title?' — '+esc(plan.title):''}</b>.
      Deliverables: ${DELS.map(d=>`${d.icon||''} ${esc(d.title)}`).join(' · ')}.</p>
    <div style="margin:10px 0 0">${unitBotonPublica(dataF,'products','unitProductsPanel',_unit.section?rotuloGrado(_unit.grade)+' '+esc(_unit.section):'the whole grade')}</div>
    ${rubrica}
  </div>
  <div id="unitAlumno"></div>
  ${unitFichasBloque()}`;
  unitPintaAlumno();
  unitPintaFicha();
}

window.unitFiltra = function(k, v){
  _unit[k] = v; _unit.i = 0;
  if(k==='grade'){ _unit.unit = null; _unit.section = ''; }
  if(k==='unit') _unit.section = '';
  unitProductsPanel();
};
window.unitMueve = function(d){
  const n = _unit.filas.length; if(!n) return;
  _unit.i = Math.max(0, Math.min(n-1, _unit.i + d));
  unitPintaAlumno();
  const h = $('#unitAlumno'); if(h) h.scrollIntoView({ behavior:'smooth', block:'start' });
};
window.unitSalta = function(j){ _unit.i = parseInt(j,10)||0; unitPintaAlumno(); };
/* Flechas del teclado, salvo cuando se esta escribiendo en un campo. */
document.addEventListener('keydown', e=>{
  if(!$('#unitAlumno')) return;
  if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if(e.key==='ArrowLeft') unitMueve(-1);
  else if(e.key==='ArrowRight') unitMueve(1);
});

function unitPintaAlumno(){
  const U = _unit, host = $('#unitAlumno'); if(!host) return;
  const f = U.filas[U.i];
  if(!f){ host.innerHTML = '<div class="card"><p class="muted">Nobody has submitted anything here yet.</p></div>'; return; }
  const p = U.quien[f.alumno]||{};
  const base = f.report || f.presentation || f.reflection;   // dónde se guarda la evaluación
  const crit = (base && base.criteria) || {};
  const selfL = (f.selfassess && f.selfassess.payload && f.selfassess.payload.levels) || {};
  const nb = f.notebook;
  const nota = base ? unitNota(U.crits, crit) : null, nivel = unitNivelDeNota(nota);
  const puestos = U.crits.filter(c=>crit[c.n]).length;
  /* Una propuesta previa (payload.review, hecha con la rubrica de la unidad)
     se ensena como sugerencia: el nivel con borde azul y el comentario ya
     escrito. No es nota hasta que el profesor la acepta o pone la suya. */
  const rv = (base && base.payload && base.payload.review) || null;
  const sug = (rv && rv.niveles) || {};
  const haySug = U.crits.some(c=>sug[c.n] && !crit[c.n]);
  const entregados = U.DELS.filter(d=>{ const r=f[d.kind];
    return r && (d.type==='file' ? !!r.file_path : !!(r.payload && r.payload.text && r.payload.text.trim())); }).length;

  const AUDIO = ['webm','ogg','mp3','m4a','wav','aac'], VIDEO = ['mp4','mov','m4v'];
  const vacio = '<p class="muted" style="margin:0;font-size:.85rem">Not submitted</p>';
  const archivo = r => {
    if(!r || !r.file_path) return vacio;
    const url = U.firmadas[r.file_path], ext = (r.file_path.split('.').pop()||'').toLowerCase();
    if(!url) return '<p class="muted" style="margin:0;font-size:.85rem">File not available</p>';
    const kb = r.payload && r.payload.size ? ' · '+Math.round(r.payload.size/1024)+' KB' : '';
    const pie = `<div class="muted" style="font-size:.75rem;margin-top:4px">${esc(ext)}${kb} ·
      <a href="${esc(url)}" target="_blank" rel="noopener">download</a></div>`;
    if(AUDIO.indexOf(ext)>=0) return `<audio controls preload="metadata" src="${esc(url)}" style="width:100%"></audio>${pie}`;
    if(VIDEO.indexOf(ext)>=0) return `<video controls preload="metadata" src="${esc(url)}" style="width:100%;max-height:260px;background:#000;border-radius:8px"></video>${pie}`;
    return `<a class="btn small" href="${esc(url)}" target="_blank" rel="noopener">📎 Open file</a>${pie}`;
  };
  const textoBox = r => {
    const q = r && r.payload;
    if(!q || typeof q.text!=='string' || !q.text.trim()) return vacio;
    return `<div class="muted" style="font-size:.75rem;margin-bottom:4px">${q.words||0} words ·
        <span class="badge" style="background:${q.draft===false?'#dcfce7':'#fef9c3'}">${q.draft===false?'submitted':'draft'}</span></div>
      <div style="white-space:pre-wrap;font-size:.88rem;line-height:1.6;max-height:360px;overflow:auto;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#fcfdff">${esc(q.text)}</div>
      ${traceHTML(q)}`;
  };
  /* Cada entregable lleva debajo SU nota y SU comentario (las columnas score
     y feedback de su propia fila, que son las que el alumno lee en unit.html):
     el articulo y la reflexion se corrigen por separado y aqui se ve, de un
     vistazo, cuanto sacó en cada uno. La rubrica de abajo es la de la unidad. */
  const notaBox = r => {
    if(!r || (r.score==null && !r.feedback)) return '';
    const lv = unitNivelDeNota(r.score);
    return `<div style="margin-top:8px;padding:8px 10px;border:1px solid var(--line);border-left:4px solid var(--blue);border-radius:0 8px 8px 0;background:#f6f8fc">
        <div style="font-weight:800;font-size:1.05rem;color:var(--blue-dd)">${r.score!=null
          ? `${r.score}/20 · ${lv} · ${UNIT_SIG[lv]}` : '<span class="muted" style="font-weight:400;font-size:.85rem">No grade · comment only</span>'}</div>
        ${r.feedback ? `<div style="font-size:.8rem;line-height:1.5;margin-top:4px;white-space:pre-wrap">${esc(r.feedback)}</div>` : ''}
        ${r.reviewed_at ? `<div class="muted" style="font-size:.72rem;margin-top:4px">marked · ${esc(new Date(r.reviewed_at).toLocaleDateString('en-GB'))}${r.released_at?' · sent to the student '+esc(new Date(r.released_at).toLocaleDateString('en-GB')):' · <b>hidden from the student</b> until you send the class'}</div>` : ''}
      </div>`;
  };
  const producto = d => `<div style="flex:1 1 280px;min-width:260px">
      <div style="font-weight:700;font-size:.9rem;margin-bottom:6px">${d.icon||''} ${esc(d.title)}</div>
      ${d.type==='file' ? archivo(f[d.kind]) : textoBox(f[d.kind])}
      ${notaBox(f[d.kind])}</div>`;

  const nav = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:14px 0 10px">
      <button class="btn" onclick="unitMueve(-1)" ${U.i===0?'disabled':''}>◀ Previous</button>
      <span style="font-size:.9rem">Student <b>${U.i+1}</b> of ${U.filas.length} ·
        <select onchange="unitSalta(this.value)" style="max-width:260px">
          ${U.filas.map((x,j)=>`<option value="${j}"${j===U.i?' selected':''}>${esc((U.quien[x.alumno]||{}).full_name||'(student)')}</option>`).join('')}
        </select></span>
      <button class="btn" onclick="unitMueve(1)" ${U.i>=U.filas.length-1?'disabled':''}>Next ▶</button>
    </div>`;

  const evaluacion = !base ? '<p class="muted">No product has been submitted yet: there is nothing to assess.</p>' : `
    <h4 style="margin:0 0 8px">📏 Assessment</h4>
    ${U.crits.map(c=>{ const puesto = crit[c.n];
      return `<div style="margin-bottom:12px">
        <div style="font-size:.86rem;font-weight:600">${c.n}. ${esc(c.text)}
          ${selfL[c.n]?`<span class="muted" style="font-weight:400;font-size:.75rem" title="self-assessment"> · the student self-assessed as ${selfL[c.n]}</span>`:''}</div>
        <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
          ${UNIT_LVL.map(l=>`<button class="btn small ${puesto===l?'':'ghost'}" style="min-width:46px;${sug[c.n]===l&&puesto!==l?'border-color:#3b5bdb;color:#3b5bdb':''}"
              title="${esc((c.levels||{})[l]||UNIT_SIG[l])}${sug[c.n]===l?' (suggested)':''}" onclick="unitNivel('${base.id}','${c.n}','${l}')">${l}</button>`).join('')}
        </div>
        ${puesto?`<div style="font-size:.8rem;margin-top:6px;background:#f6f8fc;border-left:3px solid var(--blue);padding:6px 10px;border-radius:0 6px 6px 0">
            <b>${puesto} · ${UNIT_SIG[puesto]}</b>${(c.levels||{})[puesto]?' — '+esc(c.levels[puesto]):''}</div>`
          : (sug[c.n]?`<div class="muted" style="font-size:.76rem;margin-top:4px">suggested: <b>${sug[c.n]}</b> · ${UNIT_SIG[sug[c.n]]}</div>`:'')}
      </div>`; }).join('')}
    ${rv && (haySug || (!base.feedback && rv.borrador)) ? `<div style="font-size:.8rem;background:#e7ecfd;color:#2d5a8d;border-radius:8px;padding:8px 10px;margin:4px 0 10px">
        🤖 <b>Automatic suggestion</b>${rv.fecha?' from '+esc(rv.fecha):''} — ${esc(rv.por||'review it before sending')}.
        ${haySug?`<button class="btn small" style="margin-left:8px" onclick="unitAceptaPropuesta('${base.id}')">✔ Accept suggested levels</button>`:''}</div>` : ''}
    <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:6px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
        <b>Grade</b>
        <span style="font-weight:800;font-size:1.05rem;color:var(--blue-dd)">${nota!=null
          ? `${nivel} · ${UNIT_SIG[nivel]} · ${nota}/20`
          : '<span class="muted" style="font-weight:400;font-size:.85rem">add the levels and it shows automatically</span>'}</span>
      </div>
      <p class="muted" style="font-size:.76rem;margin:4px 0 8px">${puestos} of ${U.crits.length} criteria set.
        Levels are saved as soon as you click them. The student sees nothing until you press <b>📣 Send grades and comments</b> at the top, for the whole class.</p>
      <textarea id="unitComent" rows="${(base.feedback||(rv&&rv.borrador)||'').length>200?6:3}" placeholder="Comment for the student" style="width:100%;padding:9px;border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.86rem;line-height:1.5">${esc(base.feedback||(rv&&rv.borrador)||'')}</textarea>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:8px">
        <button class="btn" onclick="unitEnvia('${base.id}')">💾 Save grade and comment</button>
        <span class="state" id="unitEstado">${base.released_at?'Sent to the student · '+esc(new Date(base.released_at).toLocaleDateString('en-GB')):(base.reviewed_at?'Marked · hidden until you send the class':'')}</span>
      </div>
      <label style="display:block;font-size:.8rem;margin-top:10px">
        <input type="checkbox" ${base.shared?'checked':''} onchange="unitExhibe('${base.id}',this.checked)">
        🖼️ Show in the unit gallery — classmates will be able to see this work as an example (by default only you and the student can see it).</label>
    </div>`;

  host.innerHTML = `${nav}
    <div class="card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap">
        <h3 style="margin:0;font-size:1.1rem">${esc(p.full_name||'(student)')}
          <span class="muted" style="font-weight:400;font-size:.9rem">${p.grade_id?'G'+p.grade_id+' '+(p.section||''):''}</span>
          ${nivelBadge(p.cefr_level)}</h3>
        <span>
          <span class="badge" style="background:${entregados===U.DELS.length?'#dcfce7':'#fef9c3'}">${entregados} of ${U.DELS.length} products submitted</span>
          ${base && base.released_at ? '<span class="badge" style="background:#dcfce7">sent to student</span>' : (base && base.reviewed_at ? '<span class="badge" style="background:#e0f2fe">marked · not sent</span>' : '')}
        </span>
      </div>
      <div style="display:flex;gap:18px;flex-wrap:wrap;margin:14px 0">${U.DELS.map(producto).join('')}</div>
      ${nb && nb.file_path ? `<div style="margin:0 0 12px"><button class="btn small" onclick="unitVerArchivo('${esc(nb.file_path)}',this)">📓 Notebook</button></div>` : ''}
      <div style="border-top:1px solid var(--line);padding-top:12px">${nivelEsperadoBox('writing', p.cefr_level)}${evaluacion}</div>
    </div>`;
}

/* Un nivel por criterio. Se guarda al pulsarlo (con la nota que resulta),
   sin marcar la entrega como enviada: eso es «Guardar y enviar». */
window.unitNivel = async function(id, crit, valor){
  const f = _unit.filas[_unit.i]; if(!f) return;
  const base = Object.values(f).find(r=>r && r.id===id); if(!base) return;
  const c = Object.assign({}, base.criteria||{});
  if(c[crit]===valor) delete c[crit]; else c[crit] = valor;
  base.criteria = c; base.score = unitNota(_unit.crits, c);
  unitPintaAlumno();
  const { error } = await sb.from('unit_submissions').update({ criteria:c, score:base.score }).eq('id', id);
  const st = $('#unitEstado');
  if(error && st){ st.textContent = 'Could not save: '+error.message; st.className='state err'; }
};

/* Copia los niveles propuestos a los criterios (solo donde el profesor no
   ha puesto nada) y guarda la nota que resulta. Enviar sigue siendo aparte. */
window.unitAceptaPropuesta = async function(id){
  const f = _unit.filas[_unit.i]; if(!f) return;
  const base = Object.values(f).find(r=>r && r.id===id); if(!base) return;
  const sug = (base.payload && base.payload.review && base.payload.review.niveles) || {};
  const c = Object.assign({}, base.criteria||{});
  _unit.crits.forEach(k=>{ if(sug[k.n] && !c[k.n]) c[k.n] = sug[k.n]; });
  base.criteria = c; base.score = unitNota(_unit.crits, c);
  unitPintaAlumno();
  const { error } = await sb.from('unit_submissions').update({ criteria:c, score:base.score }).eq('id', id);
  const st = $('#unitEstado');
  if(st){ st.textContent = error ? 'Could not save: '+error.message : 'Levels saved — review the comment and click Save'; st.className = error?'state err':'state ok'; }
};

window.unitEnvia = async function(id){
  const f = _unit.filas[_unit.i]; if(!f) return;
  const base = Object.values(f).find(r=>r && r.id===id); if(!base) return;
  const ta = $('#unitComent'), st = $('#unitEstado');
  const cambio = { feedback:(ta?ta.value:base.feedback)||'', score:unitNota(_unit.crits, base.criteria),
                   reviewed_at:new Date().toISOString(), reviewed_by:(state.profile&&state.profile.id)||null };
  if(st){ st.textContent='Saving…'; st.className='state'; }
  const { error } = await sb.from('unit_submissions').update(cambio).eq('id', id);
  if(error){ if(st){ st.textContent='Could not send: '+error.message; st.className='state err'; } return; }
  Object.assign(base, cambio);
  unitPintaAlumno();
  const st2 = $('#unitEstado'); if(st2){ st2.textContent=base.released_at?'Saved ✓ — the student already sees it':'Saved ✓ — hidden until you send the class'; st2.className='state ok'; }
};

/* El bucket es privado: se pide un enlace temporal, como en Fun for Nordic. */
window.unitVerArchivo = async function(ruta, boton){
  if(!ruta) return;
  const { data, error } = await sb.storage.from('unit-products').createSignedUrl(ruta, 3600);
  if(error || !data){ boton.textContent='Not available'; return; }
  const ext = (ruta.split('.').pop()||'').toLowerCase();
  if(['webm','ogg','mp3','m4a','wav','aac'].indexOf(ext)>=0){
    const a=document.createElement('audio'); a.controls=true; a.src=data.signedUrl; a.style.maxWidth='15rem';
    boton.replaceWith(a); a.play().catch(()=>{});
  } else {
    window.open(data.signedUrl,'_blank','noopener');
  }
};

/* Corregir y publicar son dos pasos. La nota y el comentario se guardan con
   reviewed_at y el alumno NO los ve; los ve cuando el profesor publica el
   salon entero (released_at), despues de revisarlo. Pedido el 11-sep-2026:
   habian salido notas que aun habia que mirar. */
window.unitPublica = async function(ids, que, tras){
  ids = (ids||[]).filter(Boolean);
  if(!ids.length){ alert('Nothing to send: there is no marked work waiting to be published.'); return; }
  const ok = await NISUI.pregunta('From now on those students will see their grade and comment. Sending '+ids.length+' '+que+'.',
    {titulo:'Send grades and comments to the class?', si:'Send', no:'Not yet'});
  if(!ok) return;
  const { error } = await sb.from('unit_submissions')
    .update({ released_at:new Date().toISOString(), released_by:(state.profile&&state.profile.id)||null }).in('id', ids);
  if(error){ alert('Could not send: '+error.message); return; }
  if(window.NISUI&&NISUI.aviso) NISUI.aviso('Sent to the class · '+ids.length+' '+que,'bien',3000);
  if(tras) tras();
};
/* El boton, con su cuenta: cuantos estan corregidos y sin publicar. */
function unitBotonPublica(filas, que, tras, aQuien){
  const por = (filas||[]).filter(r=>r.reviewed_at && !r.released_at).map(r=>r.id);
  const ya  = (filas||[]).filter(r=>r.released_at).length;
  window._unitPub = window._unitPub || {}; window._unitPub[que] = por;
  return `<span style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap">
    <button class="btn" ${por.length?'':'disabled'} onclick="unitPublica(window._unitPub['${que}'],'${que}',${tras})">📣 Send grades and comments to ${aQuien} (${por.length})</button>
    <span class="muted" style="font-size:.78rem">${ya?ya+' already sent · ':''}students see nothing until you send</span></span>`;
}

window.unitCalificar = async function(id, nota, comentario){
  const cambio = { reviewed_at:new Date().toISOString(), reviewed_by:(state.profile&&state.profile.id)||null };
  if(nota !== null && nota !== '') cambio.score = Number(nota);
  if(comentario !== null) cambio.feedback = comentario;
  const r = await sb.from('unit_submissions').update(cambio).eq('id', id);
  if(r.error){ alert('Could not save: '+(r.error.message||r.error)); return; }
  /* El badge de la fila cambia en el sitio: sin repintar la tabla, que
     cerraria el texto que el profesor tiene delante. */
  const b=document.getElementById('uexw-'+id);
  if(b){ if(cambio.score!=null){ const nv=unitNivelDeNota(cambio.score); b.style.background=UNIT_FONDO[nv]; b.textContent=cambio.score+'/20 · '+nv+' · marked'; }
         else if(b.textContent==='not marked'){ b.style.background='#dcfce7'; b.textContent='marked'; } }
  if(window.NISUI&&NISUI.aviso) NISUI.aviso(cambio.score!=null?'Grade saved · '+cambio.score+'/20':'Comment saved','bien',2500);
};

/* ---------------------------------------------------------------
   🎯 Unidades del grado — la tarjeta madre que abre el hub de cada
   unidad (unit.html). Los datos salen de unit-plans.js, que es copia
   del planner de Toddle: si una unidad no está ahí, no se ofrece.
---------------------------------------------------------------- */
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
        <h2 style="margin:0 0 6px;color:var(--blue-d)">Unit ${esc(String(u.label||u.n))} · ${esc(u.title)}</h2>${u.pilot?`<div class="badge" style="background:#ede9fe;color:#5b21b6;margin-bottom:6px">🧪 2027 pilot · not visible to students</div>`:''}
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
  _setNav(_isStudent() ? 'myclasses' : 'classes');
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
    <h2>📄 Class materials</h2>
    <p class="muted">Upload the student worksheets and slides here. <b>The file name
      decides where it goes</b>, so you can drag the whole unit folder in one go.</p>

    <div class="row" style="gap:10px;align-items:center;margin:14px 0">
      <label>Grade <select id="matGrado" style="margin-left:6px">${grados}</select></label>
      <span class="muted" style="font-size:.85rem">The unit, week and session come from the name.</span>
    </div>

    <label for="matFiles" style="display:block;border:2px dashed var(--lila);border-radius:12px;
        padding:26px;text-align:center;cursor:pointer;color:var(--grey)">
      <input type="file" id="matFiles" multiple accept=".pdf,.docx,.pptx" style="display:none">
      📎 <b>Choose the files</b> — or drag them here
    </label>

    <div class="row"><span class="state" id="matEstado"></span></div>

    <h3 style="margin-top:24px;font-size:1rem;color:var(--blue-d)">Digital worksheets</h3>
    <p class="muted">So the student can complete it <b>inside the portal</b>, without downloading anything.
      Drop your worksheets here in <b>Word</b> and the portal converts them: it shows you what it
      understood from each one and you decide whether to publish it.</p>
    <label for="matJson" style="display:block;border:2px dashed #cbe0c9;border-radius:12px;
        padding:18px;text-align:center;cursor:pointer;color:var(--grey)">
      <input type="file" id="matJson" multiple accept=".docx,.json" style="display:none">
      🧩 <b>Digitize worksheets</b> — choose your <code>.docx</code> files, or drag them here
    </label>
    <div class="row"><span class="state" id="matJsonEstado"></span></div>
    <div id="matLista" style="margin-top:14px"></div>

    <details style="margin-top:18px">
      <summary style="cursor:pointer;font-weight:600;color:var(--blue-d)">How the files should be named</summary>
      <div style="font-size:.86rem;color:var(--grey);margin-top:10px;line-height:1.8">
        <code>u4w1s1-worksheet-a2.pdf</code> — student worksheet, unit 4, week 1, session 1, level A2<br>
        <code>u4w1s1-worksheet-a2.docx</code> — the same worksheet in Word, so it can be edited<br>
        <code>u4w1s1-slides.pptx</code> — the slides for that session<br>
        The valid levels are <b>a2, b1, b2, c1</b>. Anything that does not follow this pattern is not uploaded, and you will be told.
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

  est.textContent = `Uploading ${files.length} file(s)…`;
  est.className = 'state';

  for(let i = 0; i < files.length; i++){
    const f = files[i];
    const m = MAT_RE.exec(f.name);
    if(!m){
      mal++;
      filas.push(`<tr><td>${esc(f.name)}</td><td class="err">The name does not follow the pattern — not uploaded</td></tr>`);
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
    est.textContent = `${i+1} of ${files.length}…`;
  }

  est.textContent = `${ok} uploaded${mal ? `, ${mal} not uploaded` : ''}.`;
  est.className = mal ? 'state err' : 'state ok';
  lista.innerHTML = `<div style="overflow-x:auto"><table class="tbl">
    <thead><tr><th>File</th><th>Where it went</th></tr></thead>
    <tbody>${filas.join('')}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:10px">Worksheets appear in the unit hub
      as soon as they are uploaded, with nothing else to do. Slides need to be converted to images separately
      (<code>tools/exporta_slides_png.ps1</code>) so students can view them without downloading.</p>`;
}

/* Fichas entregadas, ordenadas por sesión: es la corrección del día a día,
   distinta de la del producto final de la unidad. El alumno entrega el
   archivo que rellenó o un enlace de Google Docs, porque muchos trabajan ahí
   y un PDF no se puede editar. */
/* ---------- 📄 Fichas entregadas, con el mismo formato que los productos:
   se elige la ficha (sesion o actividad) y se pasa alumno por alumno. ---------- */
const _ficha = { sel:null, i:0 };

/* De que es una entrega de ficha: sesion 'w1s1' o actividad suelta 'a:...'. */
function unitFichaDonde(r){
  const m = /^w(\d+)s(\d+)$/.exec(r.milestone || '');
  if(m) return 'Week ' + m[1] + ' · Session ' + m[2];
  const titulo = (r.payload && r.payload.title) || (r.milestone || '').replace(/^a:/,'');
  const semana = (r.payload && r.payload.week && !/(week|semaine|semana)\s*\d/i.test(titulo)) ? 'Week ' + r.payload.week + ' · ' : '';
  return semana + titulo;
}
function unitFichaOrden(r){
  const m = /^w(\d+)s(\d+)$/.exec(r.milestone || '');
  if(m) return (+m[1]) * 100 + (+m[2]);
  const w = r.payload && r.payload.week;
  return w ? (+w) * 100 + 50 : 9999;
}

function unitFichasBloque(){
  const F = _unit.fichas || [];
  if(!F.length) return '';
  /* Una opcion por ficha, en el orden de la unidad, con cuantos la entregaron. */
  const grupos = {};
  F.forEach(r=>{ (grupos[r.milestone] = grupos[r.milestone] || {r, n:0}).n++; });
  const claves = Object.keys(grupos).sort((a,b)=>unitFichaOrden(grupos[a].r)-unitFichaOrden(grupos[b].r) || a.localeCompare(b));
  if(claves.indexOf(_ficha.sel)<0){ _ficha.sel = claves[0]; _ficha.i = 0; }
  return `<div class="card" style="margin-top:14px">
    <h2>📄 Submitted worksheets</h2>
    <p class="muted">What students submit session by session: the worksheet completed in the portal, the
      Google Docs link, or the file. Choose the worksheet and go through students one by one; the student
      sees the grade and comment in the activity itself — once you send them to the class.</p>
    <label style="font-size:.85rem">Worksheet <select onchange="unitFichaElige(this.value)" style="margin-left:4px;max-width:420px">
      ${claves.map(k=>`<option value="${esc(k)}"${k===_ficha.sel?' selected':''}>${esc(unitFichaDonde(grupos[k].r))} (${grupos[k].n})</option>`).join('')}
    </select></label>
    <div id="unitFicha"></div>
  </div>`;
}
window.unitFichaElige = function(v){ _ficha.sel = v; _ficha.i = 0; unitPintaFicha(); };
window.unitFichaMueve = function(d){
  const n = unitFichaLista().length; if(!n) return;
  _ficha.i = Math.max(0, Math.min(n-1, _ficha.i + d)); unitPintaFicha();
  const h = $('#unitFicha'); if(h) h.scrollIntoView({ behavior:'smooth', block:'start' });
};
window.unitFichaSalta = function(j){ _ficha.i = parseInt(j,10)||0; unitPintaFicha(); };
function unitFichaLista(){
  const q = _unit.quien || {};
  return (_unit.fichas || []).filter(r=>r.milestone===_ficha.sel).sort((a,b)=>
    String((q[a.student_id]||{}).section||'').localeCompare(String((q[b.student_id]||{}).section||'')) ||
    String((q[a.student_id]||{}).full_name||'').localeCompare(String((q[b.student_id]||{}).full_name||'')));
}

function unitPintaFicha(){
  const host = $('#unitFicha'); if(!host) return;
  const lista = unitFichaLista(), r = lista[_ficha.i];
  if(!r){ host.innerHTML = '<p class="muted">Nobody has submitted this worksheet yet.</p>'; return; }
  const p = (_unit.quien||{})[r.student_id] || {};
  const pl = r.payload || {};
  const m = /^w(\d+)s(\d+)$/.exec(r.milestone || '');
  /* La planilla de la sesion en el nivel del alumno, para el enunciado de
     cada campo y para saber si tiene rubrica de puntos. */
  const planilla = m ? ((_unit.planillas||[]).find(w=>w.week===+m[1] && w.session===+m[2] && w.level===pl.level)
                     || (_unit.planillas||[]).find(w=>w.week===+m[1] && w.session===+m[2])) : null;
  let etiquetas = {};
  try{ if(window.WSITEMS && planilla && Array.isArray(planilla.blocks)) etiquetas = WSITEMS.prepara(planilla.blocks).labels || {}; }catch(_){}
  const orden = Object.keys(etiquetas);
  const resp = pl.answers || {};
  const claves = Object.keys(resp).filter(k=>resp[k]!=='' && resp[k]!==false && resp[k]!=null)
    .sort((a,b)=>{ const ia=orden.indexOf(a), ib=orden.indexOf(b); return (ia<0?9999:ia)-(ib<0?9999:ib); });
  const valor = v => v===true ? '✔' : v==='T' ? 'True' : v==='F' ? 'False' : String(v);

  const nav = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:12px 0 10px">
      <button class="btn" onclick="unitFichaMueve(-1)" ${_ficha.i===0?'disabled':''}>◀ Previous</button>
      <span style="font-size:.9rem">Student <b>${_ficha.i+1}</b> of ${lista.length} ·
        <select onchange="unitFichaSalta(this.value)" style="max-width:260px">
          ${lista.map((x,j)=>`<option value="${j}"${j===_ficha.i?' selected':''}>${esc(((_unit.quien||{})[x.student_id]||{}).full_name||'(student)')}</option>`).join('')}
        </select></span>
      <button class="btn" onclick="unitFichaMueve(1)" ${_ficha.i>=lista.length-1?'disabled':''}>Next ▶</button>
    </div>`;

  let entrega;
  if(pl.answers){
    entrega = `<div class="muted" style="font-size:.78rem;margin-bottom:6px">🧩 ${esc(pl.title||(planilla&&planilla.title)||'Digital worksheet')}
        ${pl.level?' · level '+esc(pl.level):''} · ${claves.length} field${claves.length===1?'':'s'} answered${claves.length===1?'':'s'}
        · <span class="badge" style="background:${pl.handed_at||pl.draft===false?'#dcfce7':'#fef9c3'}">${pl.handed_at||pl.draft===false?'submitted':'draft'}</span></div>
      ${claves.length ? `<div style="overflow:auto;max-height:420px;border:1px solid var(--line);border-radius:8px"><table class="tbl" style="margin:0">
        <tbody>${claves.map(k=>`<tr>
          <td style="font-size:.8rem;vertical-align:top;min-width:160px;max-width:380px">${etiquetas[k]?esc(etiquetas[k]):'<span class="muted">'+esc(k)+'</span>'}</td>
          <td style="white-space:pre-wrap;font-size:.86rem;line-height:1.5">${esc(valor(resp[k]))}</td></tr>`).join('')}</tbody></table></div>`
        : '<p class="muted" style="margin:0">No field was answered.</p>'}`;
  } else if(pl.link){
    entrega = `<a class="btn small" href="${esc(pl.link)}" target="_blank" rel="noopener">🔗 Open in Google Docs</a>`;
  } else if(r.file_path){
    entrega = `<button class="btn small" onclick="unitVerArchivo('${esc(r.file_path)}',this)">📎 ${esc(pl.name||'View file')}</button>`;
  } else {
    entrega = '<p class="muted" style="margin:0">Not submitted.</p>';
  }

  const conRubrica = !!(planilla && Array.isArray(planilla.rubric) && planilla.rubric.length);
  host.innerHTML = `${nav}
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap">
      <h3 style="margin:0;font-size:1.05rem">${esc(p.full_name||'(student)')}
        <span class="muted" style="font-weight:400;font-size:.9rem">${p.grade_id?'G'+p.grade_id+' '+(p.section||''):''}</span>
        ${nivelBadge(p.cefr_level, pl.level)}</h3>
      <span class="muted" style="font-size:.85rem">${esc(unitFichaDonde(r))}${r.released_at?' · <span class="badge" style="background:#dcfce7">sent to student</span>':(r.reviewed_at?' · <span class="badge" style="background:#e0f2fe">marked · not sent</span>':'')}</span>
    </div>
    <div style="margin:12px 0">${entrega}${(pl.trace && typeof pl.trace==='object' && Object.keys(pl.trace).length)
      ? Object.keys(pl.trace).map(k=>`<div class="muted" style="font-size:.76rem;margin-top:2px"><b>${esc(k)}</b> — ${esc(traceResumen(pl.trace[k]))}</div>`).join('') : ''}</div>
    <div style="border-top:1px solid var(--line);padding-top:10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <label style="font-size:.8rem">Grade <input type="number" min="0" max="20" id="unitFichaNota" value="${r.score!=null?r.score:''}" style="width:4.5rem"></label>
      <input type="text" id="unitFichaComent" placeholder="Comment for the student" value="${esc(r.feedback||'')}" style="flex:1 1 240px;min-width:200px">
      <button class="btn" onclick="unitFichaEnvia('${r.id}')">💾 Save</button>
      <span class="state" id="unitFichaEstado"></span>
    </div>
    <div style="margin-top:10px">${unitBotonPublica(lista,'worksheets','unitPintaFichaTras','this worksheet\u2019s students')}</div>
    ${conRubrica && m ? `<p class="muted" style="font-size:.78rem;margin:8px 0 0">This session has a points rubric:
      <a href="#" onclick="unitFichaCorregir('${_unit.grade}',${parseInt(_unit.unit,10)},${+m[1]},${+m[2]});return false">mark it with the rubric in ✅ Mark worksheets</a>.</p>` : ''}`;
}

window.unitFichaEnvia = async function(id){
  const r = (_unit.fichas||[]).find(x=>x.id===id); if(!r) return;
  const st = $('#unitFichaEstado'), nota = $('#unitFichaNota'), com = $('#unitFichaComent');
  const cambio = { feedback:(com?com.value:r.feedback)||'', reviewed_at:new Date().toISOString(), reviewed_by:(state.profile&&state.profile.id)||null };
  if(nota && nota.value!=='') cambio.score = Number(nota.value);
  if(st){ st.textContent='Saving…'; st.className='state'; }
  const { error } = await sb.from('unit_submissions').update(cambio).eq('id', id);
  if(error){ if(st){ st.textContent='Could not send: '+error.message; st.className='state err'; } return; }
  Object.assign(r, cambio);
  unitPintaFicha();
  const st2 = $('#unitFichaEstado'); if(st2){ st2.textContent=r.released_at?'Saved ✓ — the student already sees it':'Saved ✓ — hidden until you send the class'; st2.className='state ok'; }
};
/* Tras publicar fichas: las filas en memoria ya llevan released_at y se repinta. */
window.unitPintaFichaTras = function(){
  const ids = new Set((window._unitPub||{}).worksheets||[]), now = new Date().toISOString();
  (_unit.fichas||[]).forEach(r=>{ if(ids.has(r.id)) r.released_at = now; });
  unitPintaFicha();
};
/* Abre esa sesion en Corregir fichas, que corrige con la rubrica de puntos. */
window.unitFichaCorregir = function(grade, unit, week, session){
  Object.assign(_corr, { grade, unit:String(unit), section:'', hito:'w'+week+'s'+session, i:0, modo:'sesion' });
  state._tab = 'corregir';
  corregirPanel();
};

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
  if(fin < 0) throw new Error('it does not look like a .docx (no ZIP index found)');

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
      if(metodo !== 8) throw new Error('the .docx uses a compression this tool cannot read');
      if(typeof DecompressionStream === 'undefined')
        throw new Error('this browser cannot decompress it; open it in an up-to-date Chrome or Edge');
      const flujo = new Blob([datos]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return await new Response(flujo).text();
    }
    pos += 46 + lenNom + lenExtra + lenCom;
  }
  throw new Error('the file has no ' + queArchivo + ' — is it really a .docx?');
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
    est.textContent = `Reading ${i+1} of ${docx.length}: ${f.name}…`;
    const m = _RE_FICHA.exec(f.name);
    if(!m){ malos.push(f.name + ' — the name does not follow the pattern uNwNsN-worksheet-level.docx'); continue; }
    try{
      const xml = await _zipLee(await f.arrayBuffer(), 'word/document.xml');
      const {titulo, meta, bloques} = docxABloques(xml);
      const campos = bloques.filter(b => b.t === 'write' || b.t === 'table').length;
      // Una ficha sin ningún campo que rellenar no es una ficha digital: es un
      // documento de lectura. Se avisa en vez de publicar algo que el alumno
      // abre y no puede responder.
      if(!campos){ malos.push(f.name + ' — found nothing for the student to fill in'); continue; }
      fichas.push({
        grade: grado, unit: +m[1], week: +m[2], session: +m[3], level: m[4].toUpperCase(),
        code: `u${+m[1]}w${+m[2]}s${+m[3]}`, title: titulo || null, meta: meta || null,
        blocks: bloques, campos, archivo: f.name
      });
    }catch(e){ malos.push(f.name + ' — ' + e.message); }
  }

  if(!fichas.length){
    est.className = 'state err';
    est.innerHTML = 'Could not digitize any of them.<br>' + malos.map(esc).join('<br>');
    return;
  }

  // Antes de escribir nada, se enseña lo que se ha entendido. Publicar a ciegas
  // una ficha mal leída la ve el alumno antes que el profesor.
  window._matPrevias = fichas;
  const filas = fichas.map((f,i) => `<tr>
      <td><b>${esc(f.code)}</b> <span class="badge lvl">${esc(f.level)}</span></td>
      <td>${esc(f.title || '(no title)')}</td>
      <td style="text-align:center">${f.blocks.length}</td>
      <td style="text-align:center"><b>${f.campos}</b></td>
      <td><button class="btn sm ghost" onclick="matVistaPrevia(${i})">👁 View</button></td>
    </tr>`).join('');
  est.className = 'state ok';
  est.textContent = `${fichas.length} worksheet(s) read. Review them and publish.`;
  $('#matLista').innerHTML = `
    <div class="card" style="margin-top:12px">
      <h3 style="margin-top:0;font-size:1rem;color:var(--blue-d)">This is what I understood</h3>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Worksheet</th><th>Title</th><th style="text-align:center">Blocks</th>
          <th style="text-align:center">Fields</th><th></th></tr></thead>
        <tbody>${filas}</tbody></table></div>
      ${malos.length ? `<div class="note err" style="margin-top:12px">Could not process ${malos.length}:<br>
        ${malos.map(esc).join('<br>')}</div>` : ''}
      <div id="matPrev" style="display:none;margin-top:14px"></div>
      <div class="row" style="margin-top:14px;gap:10px">
        <button class="btn" onclick="matPublica()">Publish ${fichas.length} worksheet(s) in ${esc(GRADE_META[grado][1])}</button>
        <button class="btn ghost" onclick="$('#matLista').innerHTML='';$('#matJsonEstado').textContent='';">Cancel</button>
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
        border-radius:8px;color:var(--blue-d);font-size:.85rem">✍️ writing field · ${b.lines} line(s)</div>`;
    if(b.t === 'table')    return `<div style="overflow-x:auto;margin:8px 0"><table class="tbl">
        <thead><tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${b.rows.map(r=>`<tr>${r.map(c=>c
          ? `<td>${esc(c)}</td>`
          : '<td style="background:#eef4fb;color:var(--blue-d);font-size:.8rem">to fill in</td>').join('')}</tr>`).join('')}
        </tbody></table></div>`;
    return '';
  };
  caja.style.display = 'block';
  caja.innerHTML = `<div style="border:1px solid var(--line);border-radius:12px;padding:16px;background:#fff">
    <div class="muted" style="font-size:.8rem">${esc(f.archivo)}</div>
    <h3 style="margin:2px 0 2px">${esc(f.title || '(no title)')}</h3>
    ${f.meta ? `<div class="muted" style="font-size:.85rem;margin-bottom:8px">${esc(f.meta)}</div>` : ''}
    ${f.blocks.map(pinta).join('')}</div>`;
  caja.scrollIntoView({behavior:'smooth', block:'nearest'});
};

window.matPublica = async function(){
  const fichas = window._matPrevias || [];
  if(!fichas.length) return;
  const est = $('#matJsonEstado');
  est.className = 'state'; est.textContent = 'Publishing…';
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
    ? `${ok} published, ${fallos} with error (${ultimo})`
    : `${ok} worksheet(s) published. They can now be completed in the portal.`;
  if(!fallos) $('#matLista').innerHTML = '';
};

async function matImporta(file){
  if(!file) return;
  const est = $('#matJsonEstado');
  est.textContent = 'Reading…'; est.className = 'state';
  let fichas;
  try {
    fichas = JSON.parse(await file.text());
    if(!Array.isArray(fichas) || !fichas.length) throw new Error('the file does not include any worksheets');
  } catch(e){
    est.textContent = 'Could not read it: ' + e.message; est.className = 'state err'; return;
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
    est.textContent = `${Math.min(i + 12, filas.length)} of ${filas.length}…`;
  }
  est.textContent = fallos
    ? `${ok} imported, ${fallos} with error (${ultimo})`
    : `${ok} digital worksheets imported. They can now be completed in the portal.`;
  est.className = fallos ? 'state err' : 'state ok';
}