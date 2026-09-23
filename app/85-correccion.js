

/* ---------------------------------------------------------------
   ✅ Corregir fichas — la rúbrica y la corrección, en una pantalla.

   La rúbrica se define POR SESIÓN y vale para los cuatro niveles: el
   criterio es el mismo, lo que cambia es la exigencia. Se guarda en la
   propia ficha (worksheets.rubric).

   Corregir es: eliges sesión, ves quién entregó, abres a un alumno y
   tienes sus respuestas a la izquierda y la rúbrica a la derecha. Pones
   puntos, y "Guardar y siguiente" te lleva al siguiente sin volver atrás.
---------------------------------------------------------------- */
let _corr = { grade:null, unit:null, section:'', hito:null, week:1, session:1, fichas:[], entregas:[], todas:[], i:0, rubric:[], modo:'sesion', rubAbierta:true };

async function corregirPanel(){
  $('#main').innerHTML = `<div class="card"><p class="muted">Loading…</p></div>`;
  if(_corr.modo === 'escritas') return corrEscritasPanel();
  await corrCarga();
}

window.corrModo = function(m){ _corr.modo = m; corregirPanel(); };

function corrTabs(){
  return `<div class="row" style="gap:8px;margin-bottom:12px">
    <button class="btn small ${_corr.modo !== 'escritas' ? '' : 'ghost'}" onclick="corrModo('sesion')">📄 By session</button>
    <button class="btn small ${_corr.modo === 'escritas' ? '' : 'ghost'}" onclick="corrModo('escritas')">✍️ Written productions</button>
  </div>`;
}

async function corrEscritasPanel(){
  $('#main').innerHTML = `
    <div class="card">
      ${corrTabs()}
      <h2>✍️ Written productions</h2>
      <p class="muted">The whole text on the left and the rubric on the right, with an automatic
        grade suggestion drawn from what the rubric itself asks for. Nothing reaches the student
        until you press <b>Save and send</b>.</p>
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
    <div class="card" id="eLista"><p class="muted">Loading…</p></div>
    <div id="eCorr"></div>`;
  await escCarga();
}

/* La nota de una ficha sale de los niveles por criterio, con la misma tabla
   que los productos de unidad y las producciones escritas. Las claves de
   `criteria` son el indice del criterio en la rubrica de la sesion. */
function corrNota(rub, puestos){
  const vs = (rub||[]).map((c,j)=>UNIT_VIG[(puestos||{})[j]]).filter(v=>v!=null);
  if(!vs.length) return null;
  return Math.round(vs.reduce((a,b)=>a+b,0)/vs.length);
}
function corrDonde(h){ const m=/^w(\d+)s(\d+)$/.exec(h||''); return m ? 'Week '+m[1]+' · Session '+m[2] : h; }

/* Se parte de lo entregado: grado → seccion → unidad → ficha, cada
   desplegable solo con lo que existe y con cuantos la entregaron. Antes se
   elegia semana y sesion a ciegas y se pulsaba «Ver». */
async function corrCarga(){
  if(!_corr.todas.length){
    const { data } = await sb.from('v_entregas_ficha').select('*').like('milestone','w%').limit(3000);
    _corr.todas = data || [];
  }
  const T = _corr.todas;
  if(!T.length){
    $('#main').innerHTML = `<div class="card">${corrTabs()}<h2>✅ Mark worksheets</h2>
      <p class="muted">No worksheets have been submitted yet.</p></div>`;
    return;
  }
  const numG = g => parseInt(String(g).replace(/\D/g,''),10)||0;
  const sec = e => String(e.section||'').trim();
  const orden = h => { const m=/^w(\d+)s(\d+)$/.exec(h||''); return m ? (+m[1])*100+(+m[2]) : 9999; };
  const grados = [...new Set(T.map(e=>e.grade))].sort((a,b)=>numG(a)-numG(b));
  if(grados.indexOf(_corr.grade)<0) _corr.grade = grados[grados.length-1];
  const deGrado = T.filter(e=>e.grade===_corr.grade);
  const secciones = [...new Set(deGrado.map(sec).filter(Boolean))].sort();
  if(_corr.section && secciones.indexOf(_corr.section)<0) _corr.section = '';
  const deSec = _corr.section ? deGrado.filter(e=>sec(e)===_corr.section) : deGrado;
  const unidades = [...new Set(deSec.map(e=>String(e.unit)))].sort((a,b)=>a-b);
  if(unidades.indexOf(String(_corr.unit))<0) _corr.unit = unidades[unidades.length-1];
  const deUnidad = deSec.filter(e=>String(e.unit)===String(_corr.unit));
  const fichas = {};
  deUnidad.forEach(e=>{ (fichas[e.milestone] = fichas[e.milestone] || {n:0,title:e.title}).n++; });
  const hitos = Object.keys(fichas).sort((a,b)=>orden(a)-orden(b));
  if(hitos.indexOf(_corr.hito)<0){ _corr.hito = hitos[0]; _corr.i = 0; }
  const m = /^w(\d+)s(\d+)$/.exec(_corr.hito||'') || [];
  _corr.week = +m[1] || 1; _corr.session = +m[2] || 1;
  _corr.entregas = deUnidad.filter(e=>e.milestone===_corr.hito)
    .sort((a,b)=>sec(a).localeCompare(sec(b)) || String(a.full_name||'').localeCompare(String(b.full_name||'')));
  if(_corr.i >= _corr.entregas.length) _corr.i = 0;

  /* `blocks` hace falta para poner el ENUNCIADO junto a cada respuesta: sin
     el, WSITEMS.prepara() recibia undefined y el profesor solo veia la clave
     tecnica ("tf12: F"). */
  const { data: planillas } = await sb.from('worksheets')
    .select('id,level,title,rubric,blocks')
    .eq('grade',_corr.grade).eq('unit',parseInt(_corr.unit,10))
    .eq('week',_corr.week).eq('session',_corr.session).order('level');
  _corr.fichas = planillas || [];
  _corr.rubric = (planillas && planillas[0] && planillas[0].rubric) || [];

  const opt = (v, txt, sel) => `<option value="${esc(String(v))}"${sel?' selected':''}>${esc(txt)}</option>`;
  const n = _corr.entregas.length;
  const evaluados = _corr.entregas.filter(e=>corrNota(_corr.rubric, e.criteria)!=null).length;
  const enviados = _corr.entregas.filter(e=>e.reviewed_at).length;
  const titulo = (_corr.fichas[0] && _corr.fichas[0].title) || fichas[_corr.hito] && fichas[_corr.hito].title || '';

  $('#main').innerHTML = `
    <div class="card">
      ${corrTabs()}
      <h2>✅ Mark worksheets</h2>
      <p class="muted">What they submit session by session. One student at a time: their answers with the prompt
        in front and the rubric alongside; use the arrows (or the ← → keyboard keys) to move to the next one.</p>
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:12px 0 0">
        <label style="font-size:.85rem">Grade <select onchange="corrFiltra('grade',this.value)" style="margin-left:4px">
          ${grados.map(g=>opt(g,(GRADE_META[g]||[])[1]||g,g===_corr.grade)).join('')}</select></label>
        <label style="font-size:.85rem">Section <select onchange="corrFiltra('section',this.value)" style="margin-left:4px">
          ${opt('','All',!_corr.section)}${secciones.map(x=>opt(x,x,x===_corr.section)).join('')}</select></label>
        <label style="font-size:.85rem">Unit <select onchange="corrFiltra('unit',this.value)" style="margin-left:4px">
          ${unidades.map(u=>opt(u,'Unit '+u,String(u)===String(_corr.unit))).join('')}</select></label>
        <label style="font-size:.85rem">Worksheet <select onchange="corrFiltra('hito',this.value)" style="margin-left:4px;max-width:420px">
          ${hitos.map(h=>opt(h, corrDonde(h)+(fichas[h].title?' — '+fichas[h].title:'')+' ('+fichas[h].n+')', h===_corr.hito)).join('')}</select></label>
      </div>
      <p style="margin:12px 0 0"><b>${esc(corrDonde(_corr.hito))}${titulo?' — '+esc(titulo):''}</b> ·
        ${n} submission${n===1?'':'s'} · <b>${evaluados}</b> graded${evaluados===1?'':''} · ${enviados} sent${enviados===1?'':''} to the student</p>
      <details ${_corr.rubAbierta?'open':''} ontoggle="_corr.rubAbierta=this.open" style="margin-top:12px">
        <summary style="cursor:pointer;font-weight:700">📏 Rubric for this worksheet — applies to all four levels of the session</summary>
        <p class="muted" style="font-size:.8rem;margin:8px 0 0">Each criterion is graded <b>AD</b> outstanding achievement · <b>A</b> expected achievement ·
          <b>B</b> in progress · <b>C</b> starting out, and the grade is calculated automatically: AD = 19 · A = 16 · B = 12 · C = 8, average of the criteria, rounded.
          You can change the criteria here; they are saved for the ${_corr.fichas.length||4} levels.</p>
        <div id="cRub"></div>
        <div class="row">
          <button class="btn small" onclick="corrAddCrit()">+ Criterion</button>
          <button class="btn small ghost" onclick="corrGuardaRubrica()">Save rubric</button>
          <span class="state" id="cRubEstado"></span>
        </div>
      </details>
    </div>
    ${n ? `<div id="cCorreccion"></div>` : `<div class="card"><p class="muted">There are no submissions for this worksheet yet.</p></div>`}`;

  corrPintaRubrica();
  if(n) corrAlumno(_corr.i);
}

window.corrFiltra = function(k, v){
  _corr[k] = v; _corr.i = 0;
  if(k==='grade'){ _corr.section=''; _corr.unit=null; _corr.hito=null; }
  if(k==='section' || k==='unit') _corr.hito=null;
  corregirPanel();
};

function corrPintaRubrica(){
  const r = _corr.rubric;
  $('#cRub').innerHTML = r.length ? `<table class="tbl" style="margin-top:10px">
      <thead><tr><th style="width:40px">#</th><th>Criterion</th><th style="width:40px"></th></tr></thead>
      <tbody>${r.map((c,i)=>`<tr>
        <td class="muted">${i+1}</td>
        <td><input type="text" value="${esc(c.c||'')}" style="width:100%"
              onchange="_corr.rubric[${i}].c=this.value"></td>
        <td><button class="btn small ghost" onclick="corrDelCrit(${i})">✕</button></td>
      </tr>`).join('')}</tbody></table>`
    : `<p class="muted" style="margin-top:10px">No rubric yet. Add criteria and save them:
       they will appear when marking each student.</p>`;
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
  /* `max` se conserva: el corrector de producciones escritas sigue leyendo
     estas rubricas por puntos. */
  const limpia = _corr.rubric.filter(c => (c.c||'').trim()).map(c=>({ c:c.c.trim(), max:c.max||4 }));
  est.textContent = 'Saving…'; est.className = 'state';
  const { error } = await sb.from('worksheets').update({ rubric: limpia })
    .eq('grade',_corr.grade).eq('unit',parseInt(_corr.unit,10))
    .eq('week',_corr.week).eq('session',_corr.session);
  est.textContent = error ? ('Not saved: '+error.message)
    : `Saved for ${_corr.fichas.length} levels.`;
  est.className = error ? 'state err' : 'state ok';
  if(!error){ _corr.rubric = limpia; corrPintaRubrica(); corrAlumno(_corr.i); }
};

/* ---------- un alumno cada vez ---------- */
window.corrMueve = function(d){
  const n = _corr.entregas.length; if(!n) return;
  corrAlumno(Math.max(0, Math.min(n-1, _corr.i + d)));
  const h = $('#cCorreccion'); if(h) h.scrollIntoView({ behavior:'smooth', block:'start' });
};
document.addEventListener('keydown', e=>{
  if(!$('#cCorreccion')) return;
  if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if(e.key==='ArrowLeft') corrMueve(-1);
  else if(e.key==='ArrowRight') corrMueve(1);
});

window.corrAlumno = async function(i){
  if(!_corr.entregas.length) return;
  _corr.i = Math.max(0, Math.min(_corr.entregas.length-1, i));
  const e = _corr.entregas[_corr.i];
  const host = $('#cCorreccion'); if(!host) return;

  if(e._resp === undefined){
    const { data: sub } = await sb.from('unit_submissions')
      .select('payload').eq('id', e.id).maybeSingle();
    e._resp = (sub && sub.payload && sub.payload.answers) || {};
    e._handed = !!(sub && sub.payload && (sub.payload.handed_at || sub.payload.draft===false));
  }
  const resp = e._resp;

  /* Junto a cada respuesta, su enunciado. Con la clave tecnica sola ("tf12: F")
     no habia forma de corregir sin abrir la ficha en otra pestana. El orden es
     el de la ficha, no el orden en que el alumno fue contestando. */
  const fAl = _corr.fichas.find(f => f.level === e.level) || _corr.fichas[0];
  let etiquetas = {};
  try{ if(window.WSITEMS && fAl && fAl.blocks) etiquetas = WSITEMS.prepara(fAl.blocks).labels || {}; }catch(_){}
  const orden = Object.keys(etiquetas);
  const claves = Object.keys(resp)
    .filter(k => resp[k] !== '' && resp[k] !== false && resp[k] != null)
    .sort((a,b) => {
      const ia = orden.indexOf(a), ib = orden.indexOf(b);
      return (ia<0?9999:ia) - (ib<0?9999:ib);
    });
  const valor = v => v === true ? '✔' : (v === 'T' ? 'True' : (v === 'F' ? 'False' : String(v)));

  const puestos = e.criteria || {};
  const rub = _corr.rubric;
  const nota = corrNota(rub, puestos), nivel = unitNivelDeNota(nota);
  const nPuestos = rub.filter((c,j)=>puestos[j]).length;

  const nav = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:14px 0 10px">
      <button class="btn" onclick="corrMueve(-1)" ${_corr.i===0?'disabled':''}>◀ Previous</button>
      <span style="font-size:.9rem">Student <b>${_corr.i+1}</b> of ${_corr.entregas.length} ·
        <select onchange="corrAlumno(parseInt(this.value,10))" style="max-width:280px">
          ${_corr.entregas.map((x,j)=>`<option value="${j}"${j===_corr.i?' selected':''}>${esc(x.full_name||'(student)')}${x.reviewed_at?' ✓':''}</option>`).join('')}
        </select></span>
      <button class="btn" onclick="corrMueve(1)" ${_corr.i>=_corr.entregas.length-1?'disabled':''}>Next ▶</button>
    </div>`;

  host.innerHTML = `${nav}
    <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap">
      <h3 style="margin:0;font-size:1.1rem">${esc(e.full_name||'(student)')}
        <span class="muted" style="font-weight:400;font-size:.9rem">${e.grade_id?'G'+e.grade_id+' '+(e.section||''):''}</span></h3>
      <span>
        ${e.level?`<span class="badge" style="background:#e7ecfd">level ${esc(e.level)}</span>`:''}
        <span class="badge" style="background:${e._handed||e.draft===false?'#dcfce7':'#fef9c3'}">${e._handed||e.draft===false?'submitted':'draft'}</span>
        ${e.reviewed_at?'<span class="badge" style="background:#e0f2fe">marked</span>':''}
      </span>
    </div>
    <p class="muted" style="font-size:.8rem;margin:6px 0 0">${esc(corrDonde(_corr.hito))}${fAl&&fAl.title?' — '+esc(fAl.title):''} · ${claves.length} field${claves.length===1?'':'s'} answered${claves.length===1?'':''}</p>

    <style>#cGrid{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:18px;margin-top:14px} #cGrid > div{min-width:0}
      @media (max-width:1100px){ #cGrid{grid-template-columns:minmax(0,1fr)} }</style>
    <div id="cGrid">
      <div style="max-height:64vh;overflow:auto;border:1px solid var(--line);border-radius:10px;padding:4px 10px">
        ${claves.length ? `<table class="tbl" style="margin:0"><tbody>${claves.map(k=>`<tr>
            <td style="vertical-align:top;min-width:160px;max-width:380px;font-size:.84rem">${etiquetas[k] ? esc(etiquetas[k]) : '<span class="muted">'+esc(k)+'</span>'}</td>
            <td style="white-space:pre-wrap;font-size:.88rem;line-height:1.5;font-weight:600">${esc(valor(resp[k]))}</td></tr>`).join('')}</tbody></table>`
          : '<p class="muted">Did not answer anything.</p>'}
      </div>
      <div>
        <h4 style="margin:0 0 8px">📏 Evaluation</h4>
        ${rub.length ? rub.map((c,j)=>{ const puesto = puestos[j];
          return `<div style="margin-bottom:12px">
            <div style="font-size:.85rem;font-weight:600">${j+1}. ${esc(c.c)}</div>
            <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
              ${UNIT_LVL.map(l=>`<button class="btn small ${puesto===l?'':'ghost'}" style="min-width:46px" title="${UNIT_SIG[l]}"
                  onclick="corrNivel(${j},'${l}')">${l}</button>`).join('')}
            </div>
            ${puesto?`<div style="font-size:.78rem;margin-top:5px;background:#f6f8fc;border-left:3px solid var(--blue);padding:5px 9px;border-radius:0 6px 6px 0"><b>${puesto}</b> · ${UNIT_SIG[puesto]}</div>`:''}
          </div>`; }).join('')
        : '<p class="muted">Define the rubric above in order to assess by criterion.</p>'}

        <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
            <b style="font-size:.9rem">Grade</b>
            <span style="font-weight:800;font-size:1.05rem;color:var(--blue-dd)">${nota!=null
              ? `${nivel} · ${UNIT_SIG[nivel]} · ${nota}/20`
              : '<span class="muted" style="font-weight:400;font-size:.85rem">set the levels and the grade appears automatically</span>'}</span>
          </div>
          <p class="muted" style="font-size:.76rem;margin:4px 0 8px">${nPuestos} of ${rub.length} criteria set. The levels are saved when you click them;
            the student sees the grade and the comment when you send them to the class from <b>🎯 Unit products → 📄 Submitted worksheets</b>.</p>
          <textarea id="cComent" rows="3" placeholder="Comment for the student"
            style="width:100%;padding:9px;border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.86rem;line-height:1.5">${esc(e.feedback||'')}</textarea>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
            <button class="btn" onclick="corrGuarda(true)">📨 Save, send and next</button>
            <button class="btn small ghost" onclick="corrGuarda(false)">Save as marked</button>
          </div>
          <div class="row"><span class="state" id="cEstado"></span></div>
        </div>
      </div>
    </div>
    </div>`;
};

/* Un nivel por criterio. Se guarda al pulsarlo (con la nota que resulta),
   sin marcar la ficha como enviada: eso es «Guardar y enviar». */
window.corrNivel = async function(j, l){
  const e = _corr.entregas[_corr.i]; if(!e) return;
  const c = Object.assign({}, e.criteria || {});
  if(c[j] === l) delete c[j]; else c[j] = l;
  e.criteria = c; e.score = corrNota(_corr.rubric, c);
  corrAlumno(_corr.i);
  const { error } = await sb.from('unit_submissions').update({ criteria:c, score:e.score }).eq('id', e.id);
  const est = $('#cEstado');
  if(error && est){ est.textContent = 'Could not save: '+error.message; est.className = 'state err'; }
};

window.corrGuarda = async function(siguiente){
  const e = _corr.entregas[_corr.i]; if(!e) return;
  const est = $('#cEstado');
  if(est){ est.textContent = 'Saving…'; est.className = 'state'; }
  const ta = $('#cComent');
  const cambio = {
    criteria: e.criteria || {},
    score: corrNota(_corr.rubric, e.criteria),
    feedback: (ta ? ta.value : e.feedback) || null,
    reviewed_at: new Date().toISOString(),
    reviewed_by: (state.profile && state.profile.id) || null
  };
  const { error } = await sb.from('unit_submissions').update(cambio).eq('id', e.id);
  if(error){ if(est){ est.textContent = 'Could not send: '+error.message; est.className='state err'; } return; }
  Object.assign(e, cambio);
  if(siguiente && _corr.i < _corr.entregas.length-1){ corrMueve(1); return; }
  await corrAlumno(_corr.i);
  const est2 = $('#cEstado'); if(est2){ est2.textContent = 'Saved ✓ — hidden until you send the class'; est2.className = 'state ok'; }
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
const ESC_TIPO_EN = { causa:'cause', contraste:'contrast', adicion:'addition', ejemplo:'example' };
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
    if(n >= lo && n <= hi) return { p:max, tipo:'extension', datos:datos, r:n + ' words, within ' + lo + '–' + hi + '.' };
    if(n >= lo * 0.8 && n <= hi * 1.25)
      return { p:Math.max(0, max - 1), tipo:'extension', datos:datos, r:n + ' words, close to ' + lo + '–' + hi + '.' };
    return { p:nivel(n < lo ? (n / lo) * 0.6 : 0.5), tipo:'extension', datos:datos,
             r:n + ' words, ' + (n < lo ? 'below' : 'above') + ' ' + lo + '–' + hi + '.' };
  }
  if(/\b(words|palabras|length|extensi)/.test(c))
    return { p:null, r:'The criterion mentions length but does not give the range. Write it in the rubric (“40-60 words”) and it will be calculated automatically.' };

  /* 2. Conectores. El criterio suele decir de qué tipo. */
  if(/link|connector|conector|cause|efecto|effect/.test(c)){
    const quiere = /cause|efecto|effect/.test(c) ? 'causa' : null;
    const hallados = quiere ? an.conectores[quiere]
      : Object.keys(an.conectores).reduce(function(a,k){ return a.concat(an.conectores[k]); }, []);
    if(hallados.length)
      return { p:max, r:'Uses ' + hallados.slice(0,3).map(function(x){ return '“' + x + '”'; }).join(', ') + '.' };
    return { p:0, r:'No connector is visible' + (quiere ? ' for cause and effect' : '') + '.' };
  }

  /* 3. Cuánto de la ficha completó. */
  if(/task completion|completion|finished|complet|tareas/.test(c)){
    if(!ctx || !ctx.campos) return { p:null, r:'Unclear how many fields the worksheet had.' };
    const frac = ctx.respondidos / ctx.campos;
    return { p:nivel(frac), r:ctx.respondidos + ' of ' + ctx.campos + ' fields (' + Math.round(frac * 100) + '%).' };
  }

  /* 4. Vocabulario. Con banco de palabras se mide de verdad; sin él solo se
        puede mirar la variedad, y eso hay que decirlo. */
  if(/vocab|adjetiv|adjective|word choice|lexic/.test(c)){
    if(ctx && ctx.banco && ctx.banco.length){
      const usadas = escBusca(an.texto, ctx.banco);
      const frac = usadas.length / ctx.banco.length;
      return { p:nivel(Math.min(1, frac * 2)),
               r:'Uses ' + usadas.length + ' of the ' + ctx.banco.length + ' word bank items' +
                 (usadas.length ? ' (' + usadas.slice(0,4).join(', ') + ')' : '') + '.' };
    }
    /* La variedad lexica de un texto de diez palabras siempre sale altisima:
       no dice nada. Por debajo de 20 palabras no se propone nada. */
    if(an.palabras < 20)
      return { p:null, r:'Only ' + an.palabras + ' words: too short to measure vocabulary.' };
    const v = an.variedad;
    const p = v >= 0.58 ? max : (v >= 0.48 ? Math.max(0, max - 1) : Math.max(0, max - 2));
    return { p:p, r:'The worksheet has no word bank: only variety is measured (' +
             Math.round(v * 100) + '% distinct' +
             (an.repetidas.length ? '; repeats “' + an.repetidas.slice(0,2).join('”, “') + '”' : '') +
             '). Confirm it yourself.' };
  }

  /* 5. Organización y párrafos. */
  if(/organi|structure|estructura|paragraph|párrafo|parrafo|coheren/.test(c)){
    if(an.parrafos >= 2 && an.totalConectores >= 2)
      return { p:max, r:an.parrafos + ' paragraphs and ' + an.totalConectores + ' connectors.' };
    if(an.parrafos >= 2 || an.totalConectores >= 1)
      return { p:Math.max(0, max - 1), r:an.parrafos + ' paragraph(s), ' + an.totalConectores + ' connector(s).' };
    return { p:Math.max(0, max - 2), r:'A single block of text with almost no connectors.' };
  }

  /* 6. Lo que no se puede medir así. */
  return { p:null, r:'This is not measured automatically — you assess it.' };
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

/* ---------- produccion de unidad: rubrica de writing ----------
   Una redaccion que no sale de una ficha —el articulo, el ensayo, el informe
   final— no tiene rubrica de sesion, y hasta hoy la pantalla decia "esta
   practica no tiene rubrica" justo en los textos mas largos de la unidad. Se
   corrige con la rubrica del WRITING (writing-rubrics.js), que es la que el
   alumno vio en unit.html el dia uno, en niveles AD/A/B/C.

   La maquina propone donde de verdad puede medir. AD no se propone nunca:
   significa ir mas alla de lo que la tarea pedia y eso lo decide el docente. */
const ESC_EVIDENCIA = ['research','study','studies','according to','experts','scientists',
  'evidence','survey','statistics','data','shows that','found that','estimates',
  'world health organization','report says','a report'];
const ESC_CONSEJO = {
  fuerte:['had better','must','have to','need to','never','always'],
  medio: ['should','ought to','should not','avoid','make sure','remember to','shouldn\u2019t'],
  suave: ['could','why not','try','you can','it helps to','consider','it is worth'] };
const ESC_SECUENCIA = ['first','firstly','then','next','after that','after','later',
  'finally','lastly','second','secondly','third','before','meanwhile','at the end','to begin'];
const ESC_ESPECULA = ['might','may','perhaps','possibly','probably','it seems','tends to'];

/* El gancho: la primera frase hace algo o no hace nada. */
function escGancho(texto){
  /* El gancho vive DESPUES del titulo: cogiendo la primera frase a secas, un
     titulo acabado en ! o ? se hacia pasar por gancho, y uno normal se comia
     el gancho de verdad que venia debajo. */
  let lineas = String(texto||'').split(/\n+/).map(function(x){ return x.trim(); })
                 .filter(function(x){ return x; });
  if(lineas.length > 1 && lineas[0].length <= 80 && !/[.]$/.test(lineas[0])) lineas = lineas.slice(1);
  const cuerpo = lineas.slice(0, 3).join(' ');
  // Sin lookbehind: Safari < 16.4 (iPads viejos, macOS High Sierra) no lo parsea y tumbaba TODO este archivo (22-sep-2026).
  const primera = ((cuerpo.match(/^[\s\S]*?[.!?](?=\s|$)/) || [])[0] || cuerpo).slice(0, 220);
  if(/\?/.test(primera)) return { hay:true, como:'a question', frase:primera };
  if(/\b(imagine|picture this|what if|have you ever|did you know|stop|remember)\b/i.test(primera))
    return { hay:true, como:'a call to the reader', frase:primera };
  if(/\b\d+([.,]\d+)?\s*(%|percent|hours|minutes|out of|in \d+)\b/i.test(primera))
    return { hay:true, como:'a fact', frase:primera };
  return { hay:false, frase:primera };
}

/* Titulo: primera linea corta y sin punto final, con cuerpo debajo. */
function escTitulo(texto){
  const lineas = String(texto||'').split(/\n/).map(function(x){ return x.trim(); });
  const prim = lineas.find(function(x){ return x; }) || '';
  return { hay: !!prim && prim.length <= 80 && !/[.]$/.test(prim) && lineas.filter(function(x){ return x; }).length > 1,
           texto: prim.slice(0, 80) };
}

/* Umbrales de la propuesta según el nivel del alumno: lo que en A2 ya es A,
   en C1 es B. Sin nivel se usa B2, el de la rúbrica de la unidad de 9.º. */
const LEVEL_PARAMS = {
  A2: { evidenciaA:1, consejoA:1, parrafosA:2, secuenciaA:2, conectoresA:1, datosA:1 },
  B1: { evidenciaA:1, consejoA:2, parrafosA:3, secuenciaA:3, conectoresA:2, datosA:2 },
  B2: { evidenciaA:2, consejoA:2, parrafosA:3, secuenciaA:3, conectoresA:2, datosA:2 },
  C1: { evidenciaA:2, consejoA:3, parrafosA:4, secuenciaA:3, conectoresA:3, datosA:2 }
};
function escProponeNivel(c, an, W, nivel){
  const lvl = String(nivel||'').toUpperCase();
  const P = LEVEL_PARAMS[lvl] || LEVEL_PARAMS.B2;
  const out = _escProponeNivel(c, an, W, P);
  if(out && out.n) out.r = (out.r||'') + ' [expected at ' + (LEVEL_PARAMS[lvl] ? lvl : 'B2, no level set') + ']';
  return out;
}
function _escProponeNivel(c, an, W, P){
  const t = an.texto;

  if(c.auto === 'evidence'){
    const h = escBusca(t, ESC_EVIDENCIA);
    if(h.length >= P.evidenciaA) return { n:'A', r:'Cites evidence (' + h.slice(0,3).join(', ') + '). For AD it would need to weigh it, not just cite it \u2014 you assess that.' };
    if(h.length) return { n:'B', r:'A single piece of evidence (\u201c' + h[0] + '\u201d); the rest is personal opinion.' };
    return { n:'C', r:'No source or data is visible: it is all opinion.' };
  }

  if(c.auto === 'advice'){
    const usa = Object.keys(ESC_CONSEJO).filter(function(k){ return escBusca(t, ESC_CONSEJO[k]).length; });
    const esp = escBusca(t, ESC_ESPECULA);
    const ejemplos = usa.map(function(k){ return escBusca(t, ESC_CONSEJO[k])[0]; }).join(', ');
    if(usa.length >= P.consejoA && esp.length)
      return { n:'A', r:'Grades the advice (' + ejemplos + ') and uses modals of speculation (\u201c' + esp[0] + '\u201d). If it separates what is certain from what is probable, it is AD.' };
    if(usa.length >= P.consejoA) return { n:'A', r:'Gives advice' + (usa.length>1?' with more than one strength (':' (') + ejemplos + ').' };
    if(usa.length) return { n:'B', r:'Gives advice always with the same strength (\u201c' + ejemplos + '\u201d).' };
    return { n:'C', r:'There are no advice modals in the text.' };
  }

  if(c.auto === 'structure'){
    const rango = (W && W.range) || null;
    const tit = escTitulo(t), n = an.palabras;
    const dentro = rango ? (n >= rango[0] && n <= rango[1]) : null;
    const cerca  = rango ? (n >= rango[0]*0.85 && n <= rango[1]*1.15) : null;
    const partes = [];
    partes.push(tit.hay ? 'a title' : null);
    partes.push(an.parrafos >= P.parrafosA ? an.parrafos + ' paragraphs' : null);
    partes.push(dentro ? 'within ' + rango[0] + '\u2013' + rango[1] : null);
    const tiene = partes.filter(Boolean);
    const falta = [];
    if(!tit.hay) falta.push('a title');
    if(an.parrafos < P.parrafosA) falta.push('paragraphs (' + an.parrafos + ' of ' + P.parrafosA + ' expected)');
    if(rango && !dentro) falta.push(n + ' words, ' + (n < rango[0] ? 'below' : 'above') + ' ' + rango[0] + '\u2013' + rango[1]);
    const r = ((tiene.length ? 'Has ' + tiene.join(', ') + '. ' : '') +
               (falta.length ? 'Missing: ' + falta.join('; ') + '.' : '')).trim();
    /* Sin rango declarado solo hay dos senales que mirar, no tres: si no,
       una rubrica sin extension (la biografia de 6.o) nunca podia pasar de B. */
    const total = rango ? 3 : 2;
    if(tiene.length >= total) return { n:'A', r:r };
    if(tiene.length === total - 1 || (cerca && tit.hay)) return { n:'B', r:r };
    return { n:'C', r:r };
  }

  if(c.auto === 'hook'){
    const g = escGancho(t);
    if(g.hay) return { n:'A', r:'Opens with ' + g.como + ': \u201c' + g.frase.slice(0,70) + '\u2026\u201d. Whether it keeps that up until the end is for you to assess.' };
    return { n:'C', r:'Opens by announcing the topic: \u201c' + g.frase.slice(0,70) + '\u2026\u201d.' };
  }

  /* Palabras que ordenan: las piden media primaria (la receta, la carrera de
     rampas, el ciclo del agua) y la biografia de 6.o. */
  if(c.auto === 'sequence'){
    const h = escBusca(t, ESC_SECUENCIA);
    const distintas = [...new Set(h.map(function(x){ return x.toLowerCase(); }))];
    if(distintas.length >= P.secuenciaA) return { n:'A', r:'Sequences with ' + distintas.slice(0,4).join(', ') + '.' };
    if(distintas.length) return { n:'B', r:'Only ' + distintas.length + ' sequencing word(s) (\u201c' + distintas[0] + '\u201d).' };
    return { n:'C', r:'There is no word that puts the steps in order.' };
  }

  /* Conectores de cualquier tipo: el analisis ya los trae contados. */
  if(c.auto === 'linkers'){
    const tipos = Object.keys(an.conectores).filter(function(k){ return an.conectores[k].length; });
    const ejem = tipos.map(function(k){ return an.conectores[k][0]; }).slice(0,3);
    if(tipos.length >= P.conectoresA) return { n:'A', r:'Links with ' + ejem.join(', ') + ' (' + tipos.map(function(k){ return ESC_TIPO_EN[k]||k; }).join(', ') + ').' };
    if(tipos.length === 1) return { n:'B', r:'Only one type of connector: ' + (ESC_TIPO_EN[tipos[0]]||tipos[0]) + ' (\u201c' + ejem[0] + '\u201d).' };
    return { n:'C', r:'The sentences are not linked.' };
  }

  /* Cifras de verdad. Una cantidad sin unidad no es un dato: "20" puede ser
     cualquier cosa; "20 cm" o "20%" ya dice algo. */
  if(c.auto === 'data'){
    const conUnidad = t.match(/\d+([.,]\d+)?\s*(%|percent|cm|mm|km|kg|ml|min|hours|minutes|seconds|degrees|\u00b0|m\b|g\b|l\b|h\b)/gi) || [];
    const cifras = t.match(/\d+([.,]\d+)?/g) || [];
    if(conUnidad.length >= P.datosA) return { n:'A', r:'Has ' + conUnidad.length + ' figure(s) with their unit (' + conUnidad.slice(0,3).join(', ') + ').' };
    if(conUnidad.length === 1) return { n:'B', r:'A single figure with a unit (\u201c' + conUnidad[0] + '\u201d).' };
    if(cifras.length) return { n:'B', r:'There are numbers (' + cifras.slice(0,3).join(', ') + ') but none has a unit.' };
    return { n:'C', r:'There is no figure in the text.' };
  }

  return { n:null, r:'This is not measured automatically \u2014 you assess it.' };
}

/* La rubrica con que se corrige esta produccion. */
function escRubrica(f){
  const deFicha = (f.ficha && f.ficha.rubric) || [];
  if(deFicha.length) return { modo:'puntos', rub:deFicha, W:null };
  /* El writing de un examen es otra consigna: no se corrige con la rubrica
     del producto de la unidad aunque se guarde con el mismo kind. */
  if(/^exam-/.test(f.fila.milestone || '')) return { modo:'puntos', rub:[], W:null };
  const W = window.WRITING_RUBRICS &&
            WRITING_RUBRICS.get(f.fila.grade, f.fila.unit, f.fila.kind);
  if(W) return { modo:'niveles', rub:W.criteria, W:W };
  return { modo:'puntos', rub:[], W:null };
}

/* ---------- pantalla ---------- */
let _esc = { grade:'g9', unit:4, filas:[], i:-1, actual:null, props:[], puntos:{}, modo:'puntos', W:null };

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
  /* Todo producto de texto que una unidad pueda declarar en unit-plans.js
     (type:'text'): el relato y el ensayo de 9.º U5 se corrigen aqui igual
     que la propuesta. Los de archivo (podcast, defensa) van por Productos. */
  const ESC_KINDS_TEXTO = ['worksheet','report','reflection','story','essay','campaign'];
  const plan = unitPlansFor(_esc.grade).find(function(u){ return String(u.n) === String(_esc.unit); }) || {};

  /* Todo lo entregado de esa unidad, venga de la ficha de la sesion o de una
     actividad suelta: para el docente son la misma cosa, texto que corregir. */
  const { data, error } = await sb.from('unit_submissions')
    .select('id,student_id,grade,unit,milestone,kind,payload,score,criteria,feedback,reviewed_at,updated_at')
    .eq('grade', _esc.grade).eq('unit', _esc.unit).in('kind', ESC_KINDS_TEXTO)
    .order('updated_at', { ascending:false }).limit(600);
  if(error){
    $('#eLista').innerHTML = `<p class="err">Could not read it: ${esc(error.message)}</p>`;
    return;
  }
  const ids = [...new Set((data || []).map(function(r){ return r.student_id; }))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section,cefr_level').in('id', ids);
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
    /* Los productos escritos de la unidad (report, story, essay, campaign,
       reflection) guardan su texto en payload.text, no en answers: son una
       redaccion sola, no una ficha. Para quien corrige es lo mismo.
       El producto final de la unidad (kind 'report') guarda su texto en
       payload.text, no en answers: es una redaccion sola, no una ficha. Para
       quien corrige es lo mismo — texto que leer y puntuar. */
    const textos = (r.kind !== 'worksheet')
      ? ((r.payload && r.payload.text || '').trim() ? [{ campo:'texto', texto:r.payload.text }] : [])
      : escTextos(r.payload, ficha);
    textos.forEach(function(t){
      _esc.filas.push({
        id:r.id, campo:t.campo, texto:t.texto, fila:r, ficha:ficha,
        nombre:(quien[r.student_id] || {}).full_name || '(student)',
        grado:(quien[r.student_id] || {}).grade_id, seccion:(quien[r.student_id] || {}).section,
        nivel:(quien[r.student_id] || {}).cefr_level,
        donde:(r.kind === 'reflection') ? 'Unit reflection'
              : (r.kind === 'report') ? 'Final product of the unit'
              : (r.kind !== 'worksheet') ? ((plan.deliverables||[]).filter(function(d){ return d.kind === r.kind; }).map(function(d){ return d.title; })[0] || r.kind)
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
    return `<option value="${u}" ${u === _esc.unit ? 'selected' : ''}>Unit ${u}</option>`; }).join('');

  $('#eCab').innerHTML = `
    <div class="row" style="gap:10px;flex-wrap:wrap">
      <select id="eGrado">${grados}</select>
      <select id="eUnidad">${unidades}</select>
      <button class="btn small" onclick="escCarga()">View</button>
    </div>
    <p class="muted" style="margin-top:10px">${_esc.filas.length} production(s) ·
      <b>${sinCorregir} not sent yet</b>. The long texts of the unit are listed here,
      whether they come from the session worksheet or from a stand-alone activity.</p>`;

  $('#eLista').innerHTML = _esc.filas.length ? `<div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Student</th><th>Where</th><th style="text-align:center">Words</th>
        <th style="text-align:center">Status</th><th></th></tr></thead>
      <tbody>${_esc.filas.map(function(f, j){
        const est = f.fila.reviewed_at
          ? '<span class="badge" style="background:#dcfce7">sent' + (f.fila.score != null ? ' · ' + f.fila.score : '') + '</span>'
          : ((f.fila.criteria && Object.keys(f.fila.criteria).length) ||
             (f.fila.payload && f.fila.payload.review && f.fila.payload.review.niveles)
              ? '<span class="badge" style="background:#fef9c3">saved, not sent</span>'
              : '<span class="badge" style="background:#fee2e2">not marked</span>');
        return `<tr>
          <td>${esc(f.nombre)} <span class="muted">G${f.grado || ''}${f.seccion || ''}</span> ${nivelBadge(f.nivel)}</td>
          <td class="muted">${esc(f.donde)} <span style="font-size:.75rem">· ${esc(f.campo)}</span></td>
          <td style="text-align:center">${f.palabras}</td>
          <td style="text-align:center">${est}</td>
          <td><button class="btn small" onclick="escAbre(${j})">Mark</button></td></tr>`;
      }).join('')}</tbody></table></div>`
    : '<p class="muted">There are no written productions in this unit yet.</p>';

  if(_esc.i >= 0 && _esc.filas[_esc.i]) escAbre(_esc.i, true);
  else $('#eCorr').innerHTML = '';
}

window.escAbre = function(j, silencioso){
  const f = _esc.filas[j];
  if(!f) return;
  _esc.i = j;
  _esc.actual = f;

  const an = escAnaliza(f.texto);
  const R = escRubrica(f);
  const rub = R.rub;
  _esc.modo = R.modo; _esc.W = R.W;
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

  _esc.props = (_esc.modo === 'niveles')
    ? rub.map(function(c){ return escProponeNivel(c, an, R.W, f.nivel); })
    : rub.map(function(c){ return escPropone(c, an, ctx); });
  /* Si ya se habia corregido, mandan los puntos guardados; si no, la propuesta. */
  const enBorrador = (f.fila.payload && f.fila.payload.review) || {};
  const guardados = (f.fila.criteria && Object.keys(f.fila.criteria).length)
                    ? f.fila.criteria : (enBorrador.niveles || {});
  _esc.puntos = {};
  rub.forEach(function(c, k){
    const clave = (_esc.modo === 'niveles') ? c.k : k;
    const pr = _esc.props[k] || {};
    if(guardados[clave] != null) _esc.puntos[clave] = guardados[clave];
    else if(_esc.modo === 'niveles'){ if(pr.n) _esc.puntos[clave] = pr.n; }
    else if(pr.p != null) _esc.puntos[clave] = pr.p;
  });

  const maxTotal = (_esc.modo === 'niveles') ? 20
                 : rub.reduce(function(a,c){ return a + (c.max || 0); }, 0);
  const borrador = f.fila.feedback || enBorrador.borrador ||
    ((_esc.modo === 'niveles') ? '' : escBorrador(an, _esc.props));

  $('#eCorr').innerHTML = `
    <div class="card">
      <div class="row" style="justify-content:space-between;align-items:baseline">
        <h3 style="margin:0;font-size:1.05rem;color:var(--blue-dd)">${esc(f.nombre)} ${nivelBadge(f.nivel)}</h3>
        <span class="muted" style="font-size:.85rem">${esc(f.donde)} · field ${esc(f.campo)} ·
          ${_esc.i + 1} of ${_esc.filas.length}</span>
      </div>
      ${nivelEsperadoBox('writing', f.nivel)}

      <div id="eGrid">
        <div style="min-width:0">
          <div style="white-space:pre-wrap;line-height:1.75;font-size:.95rem;border:1px solid var(--line);
                      border-radius:10px;padding:16px;max-height:56vh;overflow:auto;background:#fcfdff">${esc(f.texto)}</div>
          <p class="muted" style="font-size:.8rem;margin-top:8px">
            ${an.palabras} words · ${an.frases} sentences (${an.mediaFrase} words on average) ·
            ${an.parrafos} paragraph(s) · ${Math.round(an.variedad * 100)}% distinct words ·
            ${an.totalConectores} connector(s)${an.repetidas.length ? ' · repeats: ' + esc(an.repetidas.join(', ')) : ''}</p>
          ${traceHTML(f.fila.payload, f.campo)}
        </div>

        <div>
          ${rub.length ? `<div class="badge" style="background:#e7ecfd;color:#2d5a8d;margin-bottom:8px">
              🤖 Automatic suggestion — review it before sending</div>` : ''}
          ${_esc.modo === 'niveles' ? `
            <p class="muted" style="font-size:.78rem;margin:0 0 10px">
              Writing rubric: <b>${esc(R.W.task)}</b> · ${esc(R.W.spec)}.
              It is the one the student has had in front of them since day one.
              ${R.W.fuera ? '<br>Outside this marking: ' + esc(R.W.fuera) : ''}
              <br><b>AD is never suggested</b>: it means going beyond what was asked, and that is for you to decide.</p>` : ''}
          ${rub.length && _esc.modo === 'niveles' ? rub.map(function(c, k){
            const pr = _esc.props[k] || {};
            const puesto = _esc.puntos[c.k];
            return `<div style="margin-bottom:14px">
              <div style="font-size:.85rem;font-weight:600">${c.n}. ${esc(c.text)}</div>
              <div class="row" style="gap:5px;margin-top:5px;flex-wrap:wrap">
                ${WRITING_RUBRICS.NIVELES.map(function(l){
                  const sug = pr.n === l;
                  return `<button class="btn small ${puesto === l ? '' : 'ghost'}"
                    style="padding:5px 12px;min-width:40px;${sug && puesto !== l ? 'border-color:#3b5bdb;color:#3b5bdb' : ''}"
                    title="${esc(c.levels[l])}"
                    onclick="escPunto('${c.k}','${l}')">${l}</button>`; }).join('')}
              </div>
              ${puesto ? `<div style="font-size:.78rem;margin-top:5px;background:#f6f8fc;border-left:3px solid var(--blue);
                    padding:6px 9px;border-radius:0 6px 6px 0">${esc(c.levels[puesto])}</div>` : ''}
              <div class="muted" style="font-size:.76rem;margin-top:4px">${esc(pr.r || '')}</div>
            </div>`; }).join('')
          : ''}
          ${rub.length && _esc.modo !== 'niveles' ? rub.map(function(c, k){
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
            </div>`; }).join('') : ''}
          ${rub.length ? '' : '<p class="muted">This practice has no rubric. Define it in «Mark worksheets» and it will be scored automatically here.</p>'}

          <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
            <div class="row" style="justify-content:space-between">
              <b style="font-size:.9rem">Grade</b>
              <span style="font-weight:800;color:var(--blue-dd)" id="eTotal">${escTotal()}${maxTotal ? (' / ' + maxTotal) : ''}${
                _esc.modo === 'niveles' && escNivel() ? ' · ' + escNivel() + ' (' + WRITING_RUBRICS.SIGNIFICA[escNivel()] + ')' : ''}</span>
            </div>
            <textarea id="eComent" rows="5" style="width:100%;margin-top:8px;padding:9px;
              border:1px solid var(--line);border-radius:8px;font-family:inherit;font-size:.85rem;
              line-height:1.6">${esc(borrador)}</textarea>
            <p class="muted" style="font-size:.75rem;margin:4px 0 0">
              The student sees nothing until you send the class from <b>🎯 Unit products</b>.</p>
            <div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap">
              <button class="btn" onclick="escGuarda(true)">💾 Save as marked</button>
              <button class="btn small ghost" onclick="escGuarda(false)">Save without sending</button>
              <button class="btn small ghost" onclick="escAbre(${Math.min(_esc.i + 1, _esc.filas.length - 1)})">Next ▸</button>
            </div>
            <div class="row"><span class="state" id="eEstado"></span></div>
          </div>
        </div>
      </div>
    </div>`;

  if(!silencioso) $('#eCorr').scrollIntoView({ behavior:'smooth', block:'start' });
};

/* Con rubrica de ficha la nota es la suma de puntos; con rubrica de writing
   es la media vigesimal de los niveles (AD 18-20 · A 14-17 · B 11-13 · C 0-10,
   la tabla del MINEDU), que es como califica el colegio. */
function escTotal(){
  if(_esc.modo === 'niveles' && _esc.W)
    return WRITING_RUBRICS.nota(_esc.W, _esc.puntos) || 0;
  return Object.keys(_esc.puntos).reduce(function(a,k){ return a + (Number(_esc.puntos[k]) || 0); }, 0);
}

function escNivel(){
  if(_esc.modo !== 'niveles' || !_esc.W) return null;
  return WRITING_RUBRICS.global(_esc.W, _esc.puntos);
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
  est.textContent = 'Saving…'; est.className = 'state';
  const comentario = ($('#eComent').value || '').trim();
  const hayPuntos = Object.keys(_esc.puntos).length > 0;

  /* Con rubrica de writing, ademas de los niveles por criterio (w1, w2, …)
     se escribe el nivel global en la clave '3', que es la competencia
     Writing de «Productos de unidad»: el profesor lo ve ahi sin abrir nada. */
  const criterios = Object.assign({}, _esc.puntos);
  if(_esc.modo === 'niveles' && escNivel()) criterios['3'] = escNivel();
  const cambio = {
    criteria: criterios,
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
    p.review = Object.assign({}, p.review || {}, { borrador:comentario, niveles:criterios });
    cambio.payload = p;
  }

  const { error } = await sb.from('unit_submissions').update(cambio).eq('id', f.id);
  if(error){ est.textContent = 'Could not save: ' + error.message; est.className = 'state err'; return; }

  f.fila.criteria = criterios;
  if(enviar){
    f.fila.score = cambio.score; f.fila.feedback = cambio.feedback;
    f.fila.reviewed_at = cambio.reviewed_at;
  } else {
    f.fila.payload = cambio.payload;
  }
  est.textContent = enviar ? 'Submitted ✓ — the student can see it now.' : 'Saved (not sent yet).';
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
  if(pw.length < 8){ msg.textContent = 'Minimum 8 characters'; msg.style.color = 'var(--bad)'; return; }
  msg.textContent = 'Saving…'; msg.style.color = 'var(--muted)';

  const r = await sb.rpc('admin_set_password', { p_id: id, p_password: pw });
  if(r.error){ msg.textContent = r.error.message; msg.style.color = 'var(--bad)'; return; }

  msg.textContent = 'Changed ✓ — they can now sign in with it';
  msg.style.color = 'var(--good)';
  inp.value = '';
};