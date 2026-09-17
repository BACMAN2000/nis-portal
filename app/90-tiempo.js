

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
  $('#main').innerHTML = '<div class="card"><p class="muted">Calculating…</p></div>';
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
    $('#main').innerHTML = `<div class="card"><p class="err">Could not read it: ${esc(error.message)}</p></div>`;
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
    <h2>⏱️ Screen time</h2>
    <p class="muted">Minutes per student and week. It helps to agree on a cap with school leadership
      and check whether it is respected, instead of debating impressions. Since 17 September it counts
      real presence — the tab open and the student active — on every page of the portal; before that
      date, only the time each activity reported when it was saved or finished.</p>

    <div class="row" style="gap:10px;margin:12px 0">
      <select id="tpGrado"><option value="">All grades</option>${grados}</select>
      <select id="tpSemanas">
        ${[4,8,12,20].map(n=>`<option value="${n}" ${n===_tp.semanas?'selected':''}>Last ${n} weeks</option>`).join('')}
      </select>
      <button class="btn small" onclick="tpCarga()">View</button>
    </div>

    <div class="grid cols-3" style="gap:12px;margin-top:6px">
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:var(--blue-dd)">${mediaGlobal}</div>
        <div class="muted" style="font-size:.82rem">minutes per student per week<br>(average)</div>
      </div>
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:${pico>120?'#b45309':'var(--blue-dd)'}">${pico}</div>
        <div class="muted" style="font-size:.82rem">the highest week<br>for a single student</div>
      </div>
      <div class="card center" style="margin:0;padding:16px">
        <div style="font-size:2rem;font-weight:800;color:var(--blue-dd)">${alumnos.length}</div>
        <div class="muted" style="font-size:.82rem">students with<br>recorded activity</div>
      </div>
    </div>

    <div style="margin-top:16px">
      <b style="font-size:.86rem">Where the time goes</b>
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
    <h3 style="font-size:1rem;color:var(--blue-d)">Minutes per student and week</h3>
    <p class="muted" style="font-size:.82rem">Weeks above 120 minutes are shown in amber.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Student</th>${cab}<th style="text-align:center">Total</th></tr></thead>
      <tbody>${cuerpo || '<tr><td colspan="9" class="muted">No activity in this period.</td></tr>'}</tbody>
    </table></div>
    ${alumnos.length > 60 ? `<p class="muted" style="font-size:.8rem">Showing the 60 with the most use, out of ${alumnos.length}.</p>` : ''}
  </div>

  <div class="card">
    <h3 style="font-size:1rem;color:var(--blue-d)">Activities per student</h3>
    <p class="muted" style="font-size:.82rem">What each student has opened, finished and submitted
      since activities started saving on their own — and the time spent on them, including
      the ones left half-done.</p>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Student</th>
        <th style="text-align:center">Activities</th>
        <th style="text-align:center">Days/rounds<br>with work</th>
        <th style="text-align:center">Finished</th>
        <th style="text-align:center">Submitted</th>
        <th style="text-align:center">Minutes</th></tr></thead>
      <tbody>${cuerpoAct || '<tr><td colspan="6" class="muted">No one has saved an activity yet.</td></tr>'}</tbody>
    </table></div>
  </div>

  <div class="card">
    <h3 style="font-size:1rem;color:var(--blue-d)">What it measures and what it does not</h3>
    <p class="muted" style="font-size:.85rem;line-height:1.7">
      It adds up the time <b>recorded</b> in activities, exams, recordings and submissions.
      For activities that save on their own, the time is counted while the tab is <b>in view</b>,
      finished or not; for everything else, only what was recorded at the end, so it is still
      a <b>floor</b>: the actual time is somewhat higher.<br>
      Each session is capped at 120 minutes because some are left open and return
      impossible durations (there is one exam recorded at 4114 minutes). In this period
      <b>${acotadas}</b> session(s) were capped; worth reviewing if there are many.
    </p>
  </div>`;
}

/* El profesor decide qué trabajo se ve en la galería de la unidad. Nunca el
   alumno: son trabajos de menores y la política del bucket y el trigger lo
   impiden aunque alguien lo intente desde la consola. */
window.unitExhibe = async function(id, si){
  const { error } = await sb.from('unit_submissions')
    .update({ shared: !!si }).eq('id', id);
  if(error) alert('Could not change it: ' + error.message);
};
