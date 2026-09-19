

/* ===================== ADMIN ===================== */
async function renderAdmin(tab='users'){
  // Los simulacros viven fuera del SPA (mocks-cambridge/): se sale a ellos,
  // igual que hace el panel del profesor.
  if(tab==='exams'){ window.location.assign(location.origin + '/mocks-cambridge/quizzes.html'); return; }
  /* Desde el 17-sep-2026 el menu ESPEJA las pistas del alumno (Home · My
     classes · Cambridge · Practice tools · My progress): primero quien
     existe, luego Clases, Cambridge y Herramientas de practica en el mismo
     orden en que las ve el alumno, despues lo que hay que corregir y lo que
     solo se consulta, y al final lo que se abre y se cierra. Resumen queda
     fuera: es la portada.
     La secuencia (scope) esta tambien aqui y no solo en el menu del profesor:
     desde coordinacion no habia por donde entrar. */
  document.body.innerHTML = shell([
    {key:'overview',label:'📊 Overview'},
    {group:'People', icon:'👥', items:[
      {key:'users',label:'👥 Users'},
      {key:'teachers',label:'👨‍🏫 Teachers'},
      {key:'teachersroom',label:"🧑‍🏫 Teachers' Room"},
    ]},
    /* Clases = dar clase: la materia, la secuencia, el material y las dos
       herramientas del profesor. Antes esto se llamaba Ensenanza y tenia doce
       pestanas: la materia, la planificacion, los tres cursos de primaria, un
       permiso, los materiales, dos herramientas y la biblioteca. Era el cajon
       de sastre del menu. */
    {group:'Classes', icon:'🏫', items:[
      {key:'classes',label:'🏫 Classes'},
      // French vivia SOLO en el hub del alumno, y el admin nunca pasa por ese
      // hub (route() lo manda a renderAdmin): la materia entera quedaba sin
      // puerta de entrada, aunque sus candados si estuvieran en 🔐 Accesos.
      {key:'french',label:'🇫🇷 French'},
      {key:'scope',label:'📚 Scope & Sequence'},
      {key:'materiales',label:'📄 Class materials'},
      // Tenia handler pero no entrada en el menu del admin: desde
      // administracion no habia forma de llegar a Little Readers.
      {key:'littlereaders',label:'🧒 Little Readers'},
      // Rimas y el curso de frances son material de clase de primaria, no
      // preparacion de examen: van con las clases (17-sep, menu espejo).
      {key:'rhymes',label:'🎶 Rhymes & chants'},
      {key:'fr',label:'🇫🇷 Cap sur le français'},
      {key:'pizarra',label:'📝 Whiteboard'},
      {key:'corrector',label:'✍️ Material corrector'},
      {key:'library',label:'📚 Library'},
    ]},
    /* Cambridge, en el mismo orden que la pista del alumno (17-sep-2026, menu
       espejo pedido por Paolo): primero los cursos que preparan el examen
       (Fun for Nordic 1-3 = Starters/Movers/Flyers), luego el hub, los
       simulacros y las apps, y al final los candados, que dicen "Abrir" para
       que no se confundan con la app. Las entregas de Fun for Nordic se
       corrigen en Correccion. */
    {group:'Cambridge', icon:'🎓', items:[
      {key:'funyle',label:'🧸 Fun for Nordic · Primary'},
      {key:'funsec',label:'🧗 Nordic Ascent · Secondary'},
      {key:'cambridgehub',label:'🎓 YLE + Main Suite'},
      {key:'yle',label:'🛡️ YLE panel'},
      {key:'studyplan',label:'📋 Study plan'},
      {key:'exams',label:'🎧 Mock exams and Practice'},
      {key:'uoe',label:'🧩 Use of English'},
      {key:'cambridgeinfo',label:'📘 Cambridge info'},
      {key:'mocks',label:'🔓 Open Mocks'},
      {key:'practice',label:'🔓 Open Practice Tests'},
    ]},
    {group:'Practice tools', icon:'🧰', items:[
      {key:'games',label:'🎲 Games Lab'},
      {key:'livequiz',label:'🎮 NIShoot Live'},
      {key:'mun',label:'🌐 MUN Academy'},
      {key:'phonics',label:'🔤 Phonics'},
      {key:'phrasal',label:'🔗 Phrasal verbs'},
      {key:'collocations',label:'🪢 Collocations'},
      {key:'idioms',label:'💬 Idioms'},
      {key:'wordform',label:'🧩 Word formation'},
      {key:'dict',label:'📖 NIS Dictionary'},
      {key:'coach',label:'🎙️ Pronunciation'},
    ]},
    /* Correccion = todo lo que espera una nota o hay que abrir para que se
       pueda entregar. Los controles de lectura y los examenes de unidad
       estaban en Seguimiento para el admin y en Correccion para el profesor:
       los dos paneles tienen que leerse igual, y quien entra aqui viene a
       corregir, no a mirar una grafica. */
    {group:'Marking', icon:'✅', items:[
      {key:'levels',label:'🧭 Levels & roadmap'},
      {key:'unitprod',label:'🎯 Unit products'},
      {key:'corregir',label:'✅ Mark worksheets'},
      {key:'unitexams',label:'📋 Unit exams'},
      {key:'readers',label:'📖 Reading checks'},
      {key:'funnordic',label:'🧸 Fun for Nordic'},
    ]},
    /* Seguimiento = solo se mira, no se toca nada. */
    {group:'Tracking', icon:'📈', items:[
      {key:'stats',label:'📈 Statistics'},
      {key:'results',label:'📝 Results'},
      {key:'activities',label:'🎲 Activities'},
      {key:'final',label:'🎓 Final result'},
      {key:'tiempo',label:'⏱️ Screen time'},
      {key:'honesty',label:'🛡️ Honesty'},
    ]},
    /* Permisos = lo que se abre y se cierra por grado. "Abrir examenes de
       unidad" estaba aqui repitiendo la MISMA clave que en Seguimiento, y una
       clave en dos grupos deja dos items del menu resaltados a la vez. Ahora
       vive solo en Correccion, que es donde ademas se califica. */
    {group:'Permissions', icon:'🔐', items:[
      // Fase 2: la foto completa (9 tablas) por grado, de solo lectura, con
      // enlace al panel que edita cada cosa. Vive en access-panel.js.
      {key:'whatsees',label:'👁️ What each class sees'},
      {key:'access',label:'🔐 Access'},
      {key:'unitaccess',label:'📚 Activate units'},
      {key:'funaccess',label:'🔐 Units by grade'},
    ]},
    {key:'help',label:'❓ Help'},
  ], _serieNavKey(tab), `<div class="center muted">Loading…</div>`, true);
  bindNav(renderAdmin);
  if(tab==='help') return $('#main').innerHTML = ayudaBody();
  if(tab==='mun') return $('#main').innerHTML = munBody();
  if(tab==='livequiz') return $('#main').innerHTML = liveQuizBody();
  if(tab==='games') return $('#main').innerHTML = gamesLabBody();
  if(tab==='classes') return studentClasses();
  if(tab==='french') return studentSubject('french');
  if(tab==='library') return studentLibrary();
  if(tab==='phonics') return $('#main').innerHTML = phonicsPanel();
  if(tab==='phrasal') return $('#main').innerHTML = phrasalPanel();
  if(tab==='collocations') return $('#main').innerHTML = collocationsPanel();
  if(tab==='idioms') return $('#main').innerHTML = idiomsPanel();
  if(tab==='wordform') return $('#main').innerHTML = wordformPanel();
  if(tab==='dict') return $('#main').innerHTML = dictPanel();
  if(tab==='coach') return $('#main').innerHTML = coachPanel();
  if(tab==='overview') return adminOverview();
  if(tab==='unitprod') return unitProductsPanel();
  if(tab==='materiales') return materialesPanel();
  if(tab==='corregir') return corregirPanel();
  if(tab==='tiempo') return tiempoPantallaPanel();
  if(tab==='activities') return window.activitiesPanel({admin:true, grades:GRADES});
  if(tab==='stats') return adminStats();
  if(tab==='results') return adminResults();
  if(tab==='final') return cefrFinalPanel();
  if(tab==='readers') return readerStatsPanel();
  if(tab==='unitexams') return unitExamPanel();
  if(tab==='levels') return levelsPanel();
  if(tab==='funnordic') return funNordicPanel();
  if(tab==='funaccess') return funAccessPanel(GRADES);
  if(tab==='yle') return window.ylePanel(GRADES, {admin:true});
  if(tab==='funyle') return $('#main').innerHTML = funYleBody('renderAdmin');
  if(tab==='fr') return funFrBody('renderAdmin').then(h => $('#main').innerHTML = h);
  if(tab==='frstarters') return $('#main').innerHTML = funFrCursoBody('starters');
  if(tab==='frmovers') return $('#main').innerHTML = funFrCursoBody('movers');
  if(tab==='frflyers') return $('#main').innerHTML = funFrCursoBody('flyers');
  if(tab==='frmetricas') return funFrMetricas();
  if(tab==='funsec') return $('#main').innerHTML = funSecBody('renderAdmin');
  if(/^fun(starters|movers|flyers|a1|ket|pet|b2f|c1a)$/.test(tab)) return $('#main').innerHTML = funCursoBody(tab.slice(3));
  if(tab==='rhymes') return $('#main').innerHTML = rhymesBody();
  if(tab==='scope') return scopePanel();
  if(tab==='littlereaders') return littleReadersPanel();
  if(tab==='teachers') return adminTeachers();
  if(tab==='teachersroom') return teachersRoomPanel();
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
  if(tab==='whatsees') return window.accessPanel({admin:true, grades:GRADES.map(g=>g.id)});
  if(tab==='access') return adminAccess();
  return adminUsers();
}
/* 🔐 Accesos — matriz grado × actividad (node_access). Mocks va aparte. */
async function adminAccess(){
  const { data, error } = await sb.from('node_access').select('grade_id,node_key,unlocked');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const map={}; (data||[]).forEach(r=>{ (map[r.grade_id]=map[r.grade_id]||{})[r.node_key]=r.unlocked; });
  const head = `<th style="text-align:left">Activity</th>` + GRADES.map(g=>`<th>${g.name}</th>`).join('');
  const rows = ACCESS_NODES.map(n=>{
    const cells = GRADES.map(g=>{
      const has = map[g.id] && Object.prototype.hasOwnProperty.call(map[g.id], n.key);
      const on = has ? map[g.id][n.key] : _nodeDefaultOpen(n.key);
      return `<td style="text-align:center"><input type="checkbox" ${on?'checked':''} onchange="window._toggleNode(${g.id},'${n.key}',this.checked,this)"></td>`;
    }).join('');
    return `<tr><td><b>${esc(n.label)}</b><div class="muted" style="font-size:.7rem">${n.key}</div></td>${cells}</tr>`;
  }).join('');
  const pvOpts = GRADES.map(g=>`<option value="${g.id}" ${g.id===9?'selected':''}>${g.name}</option>`).join('');
  $('#main').innerHTML=`<h1>🔐 Access by grade</h1>
    <div class="card" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
      <div><label>Check the result</label>
        <select id="pv_grade" style="min-width:120px">${pvOpts}</select></div>
      <button class="btn sm" onclick="window._previewGrade(document.getElementById('pv_grade').value)">👁️ View portal as student</button>
      <div class="muted" style="padding-bottom:11px;flex:1;min-width:240px">Opens the portal through the eyes of a student in that grade —
        with their locks — to check what you just set. For a specific student (with their exceptions),
        use <b>👥 Users → 👁️ View as</b>.</div>
    </div>
    <div class="note">Sets which activities each <b>grade</b> sees. New items (French, Grammar) start locked; the rest start open. <b>Units</b> (<code>…activities.u4</code>) and their <b>weeks</b> (<code>…activities.u4.w3</code>) are opened or closed one by one: closing a unit hides it entirely from <b>Activities</b>; closing a week leaves the rest of the unit as it is. For a student’s exceptions, the teacher adjusts them in <b>Students</b>. <b>Mocks</b> are managed in their 🔓 Mocks tab.</div>
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
    return `<div class="card"><h2 style="margin:0 0 12px">${esc(g.name)} · Units</h2>
      <div class="grid cols-3">${plans.map(u=>{
        const key=_academicUnitNode(gradeKey,u.n);
        const has=map[g.id]&&Object.prototype.hasOwnProperty.call(map[g.id],key);
        const on=has?map[g.id][key]:_academicUnitDefault(gradeKey,u.n);
        return `<label class="card" style="margin:0;padding:16px;cursor:pointer;border-color:${on?'#86c59a':'var(--line)'}">
          <div style="display:flex;align-items:center;gap:11px">
            <input type="checkbox" ${on?'checked':''} onchange="window._toggleAcademicUnit(${g.id},'${key}',this.checked,this)">
            <span><b>Unit ${esc(String(u.label||u.n))} · ${esc(u.title)}</b><small class="muted" style="display:block;margin-top:3px">${on?'Active for students':'Locked for students'}</small></span>
          </div></label>`;
      }).join('')}</div></div>`;
  }).join('');
  $('#main').innerHTML=`<h1>📚 Activate units</h1>
    <div class="note">Locked units <b>keep appearing</b> to the student, but cannot be opened. Activate them when the grade reaches that part of the course.</div>
    ${sections||'<div class="card muted">You have no grades with units assigned.</div>'}`;
}
window._toggleAcademicUnit=async(g,key,to,el)=>{
  el.disabled=true;
  const {error}=await sb.from('node_access').upsert({grade_id:g,node_key:key,unlocked:to,updated_at:new Date().toISOString(),updated_by:(state.session&&state.session.user&&state.session.user.id)||null},{onConflict:'grade_id,node_key'});
  el.disabled=false;
  if(error){alert('Could not save: '+error.message);el.checked=!to;return;}
  unitAccessPanel(state.profile&&state.profile.role==='admin'?GRADES:teacherAllowedGrades());
};
window._toggleNode=async(g,key,to,el)=>{
  el.disabled=true;
  const { error } = await sb.from('node_access').upsert({grade_id:g,node_key:key,unlocked:to,updated_at:new Date().toISOString(),updated_by:(state.session&&state.session.user&&state.session.user.id)||null},{onConflict:'grade_id,node_key'});
  el.disabled=false;
  if(error){ alert('Could not save: '+error.message); el.checked=!to; }
};
/* ===================== 🛡️ HONESTIDAD (anti-trampa) =====================
   Incidentes registrados por anticheat.js + botón "dar vida extra" a un
   alumno en una actividad. Disponible para admin y profesor (con acceso). */
const AC_ACTIVITIES = [
  ['portal','🏠 Portal (home screen)'],
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
const AC_EVENT = { tab_switch:'⚠️ Left screen', reported:'🚩 Reported', locked:'⛔ Removed (C)', translate_detected:'🌐 Translator' };
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
      <td style="text-align:center"><button class="btn sm" onclick="window._acGrant('${a.student_id}','${esc(a.activity)}','${sname}',this)">➕ Life</button></td>
    </tr>`;
  }).join('');

  $('#main').innerHTML=`<h1>🛡️ Honesty — Anti-cheat</h1>
    <div class="note">Each activity gives <b>3 lives</b>: leaving the screen (switching tab, app or window) uses one up. On the 2nd it is <b>reported</b>, on the 3rd the <b>activity is removed with a C grade</b> and a notification is sent. Here you can <b>grant an extra life</b> to a student in a specific activity; the student receives it on reload (or by pressing “retry” if it was locked). Teachers and administrators are exempt from this control. <b>The browser does not allow seeing other tabs</b>; only the metadata for the event is recorded.</div>

    <div class="card">
      <h2>➕ Give extra life</h2>
      <div class="row" style="gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">STUDENT</label>
          <select id="ac_stud" style="min-width:240px">${studOpts}</select></div>
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">ACTIVITY</label>
          <select id="ac_act" style="min-width:220px">${actOpts}</select></div>
        <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">EXTRA LIVES</label>
          <input id="ac_qty" type="number" min="1" max="20" value="1" style="width:84px"></div>
        <button class="btn" onclick="window._acGrantForm(this)">Grant lives</button>
      </div>
      <div id="ac_msg" class="muted" style="margin-top:8px"></div>
    </div>

    <div class="card" style="padding:0">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px 0">
        <h2 style="margin:0">Recent incidents</h2>
        <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">
          <input id="ac_search" type="search" placeholder="🔎 Search student or activity…" oninput="window._acApplyFilters()" style="min-width:220px">
          <select id="ac_filter" onchange="window._acApplyFilters()" style="min-width:160px">
            <option value="">All events</option>
            <option value="locked">Removed only (C)</option>
            <option value="reported">Reported only</option>
            <option value="tab_switch">Screen exits only</option>
          </select>
        </div>
      </div>
      <div style="overflow-x:auto"><table>
        <thead><tr><th style="text-align:left">Student</th><th style="text-align:left">Activity</th><th>Event</th><th>Lives</th><th style="text-align:left">Device</th><th style="text-align:left">Date</th><th>Action</th></tr></thead>
        <tbody id="ac_rows">${rows || `<tr><td colspan="7" class="center muted" style="padding:20px">No incidents recorded.</td></tr>`}<tr id="ac_empty" style="display:none"><td colspan="7" class="center muted" style="padding:20px">No incident matches the search.</td></tr></tbody>
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
  const ans=await NISUI.pide(`How many extra lives to give ${name} for “${acActLabel(activity)}”?`, {titulo:'Extra lives', valor:'1', tipo:'number', min:1, max:20, si:'Give'});
  if(ans===null) return;
  const n=Math.max(1, Math.min(20, parseInt(ans,10)||0));
  if(!n){ alert('Invalid number.'); return; }
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const { error } = await _acInsertGrant(studentId, activity, n);
  if(btn){ btn.disabled=false; btn.textContent = error?'➕ Life':`✓ +${n}`; }
  if(error) alert('Could not grant: '+error.message);
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
    ? `<span style="color:var(--danger,#b91c1c)">Could not grant: ${esc(error.message)}</span>`
    : `✓ <b>${n}</b> extra life(s) granted to <b>${esc(name)}</b> for <b>${esc(acActLabel(activity))}</b>. The student receives them when reloading the activity.`;
};
/* La portada del admin vive en overview-panel.js (la misma del profesor,
   con los bloques de administracion al final). */
async function adminOverview(){ return window.overviewPanel({admin:true}); }
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
      const items=_isEarlyGrade(g) ? [['english.classes.'+g,'Classes']]
        : [['english.classes.'+g,'Classes'],['english.classes.'+g+'.activities','🎲 Activities']];
      if(!_isPrimaryGrade(g) && !_isEarlyGrade(g)) items.push(['english.classes.'+g+'.grammar','📝 Grammar']);
      if(g==='g7') items.push(['english.classes.g7.reader','📚 Readers']);
      if(g!=='g9' && !_isEarlyGrade(g)) items.push(['english.classes.'+g+'.units','🎯 Units']);
      if(g==='g9') items.push(['english.classes.g9.cambridge','🎓 Cambridge'],['english.classes.g9.cambridge.listening','🎧 Cambridge Listening'],['english.classes.g9.uoe1','🧩 Use of English P1'],['english.classes.g9.writing','✍️ Writing'],['english.classes.g9.unit5','🎯 Unit 5'],['english.classes.g9.reader','📚 Readers'],['english.classes.g9.unitexams','📋 Unit Exams']);
      return `<div class="row" style="gap:6px;align-items:center;margin-top:5px;flex-wrap:wrap"><span class="muted" style="font-size:.8rem;min-width:84px">${GRADE_META[g][0]} ${GRADE_META[g][1]}</span>${items.map(it=>_nodeChip(it[0],it[1])).join('')}</div>`;
    }).join('');
    const suspended = t.active===false;
    return `<div class="card" data-tid="${t.id}" style="${suspended?'opacity:.6':''}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <h2 style="margin:0;font-size:1.1rem">${esc(t.full_name||t.email)} ${suspended?'<span class="badge off" style="font-size:.7rem;vertical-align:middle">Suspended</span>':''}</h2>
        <div style="text-align:right">
          <span class="muted" style="font-size:.82rem;display:block">${esc(t.email||'')}</span>
          <span style="display:inline-flex;align-items:center;gap:5px;margin-top:3px">
            <span class="muted" style="font-size:.8rem">Access:</span>
            <button onclick="window._resetPw('${t.id}')" title="Assign a new password"
              style="background:none;border:none;cursor:pointer;font-size:.9rem;padding:2px;line-height:1;color:var(--muted)">🔑 Change password</button>
          </span>
          <span id="pw-box-${t.id}" style="display:none;margin-top:6px;gap:6px;align-items:center;justify-content:flex-end">
            <input id="pw-new-${t.id}" type="password" placeholder="New password (min. 8)"
              style="padding:5px 8px;border:1px solid var(--line);border-radius:7px;font-size:.82rem;width:190px">
            <button class="btn small" onclick="window._guardaPw('${t.id}')">Save</button>
            <span id="pw-msg-${t.id}" style="font-size:.78rem"></span>
          </span>
        </div>
      </div>
      <div class="row" style="gap:18px;flex-wrap:wrap;margin-top:10px">
        <label style="${chipCss}"><input type="checkbox" class="tg-results" ${a.can_results?'checked':''}> 📝 View results</label>
        <label style="${chipCss}"><input type="checkbox" class="tg-students" ${a.can_students?'checked':''}> 👥 View students</label>
        <label style="${chipCss}"><input type="checkbox" class="tg-all" ${a.all_grades?'checked':''} onchange="window._tgAll(this)"> 🏫 All grades</label>
      </div>
      <div class="muted" style="margin:10px 0 4px;font-size:.85rem">Specific grades (only if you uncheck “All grades”):</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">${gradeChips}</div>
      <div class="muted" style="margin:10px 0 4px;font-size:.85rem">Cards they see and manage:</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">${generalChips}</div>
      <div class="muted" style="margin:8px 0 2px;font-size:.8rem">Classes — by grade (each one: the grade’s card, its Activities and its Grammar):</div>
      ${gradeBlocks}
      <div class="row" style="margin-top:12px;align-items:center;gap:10px"><button class="btn sm" onclick="window._saveTeacher('${t.id}', this)">Save access</button>${suspended?`<button class="btn sm" style="background:var(--good)" onclick="suspendUser('${t.id}',true,'teacher')">Reactivate</button>`:`<button class="btn sm ghost" style="border-color:var(--warn);color:#92600a" onclick="suspendUser('${t.id}',false,'teacher')">Suspend</button>`}<button class="btn sm danger" onclick="deleteUser('${t.id}','teacher')">Delete teacher</button><span class="tmsg muted" style="font-size:.85rem"></span></div>
    </div>`;
  }).join('');
  const emptyMsg = teachers.length ? '' : `<div class="card"><p class="muted">No teachers yet. Use the button above to add one.</p></div>`;
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:6px">
      <h1 style="margin:0">Teachers — access</h1>
      <button class="btn sm" onclick="adminNewTeacher()">+ Add Teacher</button>
    </div>
    <div class="note">Sets what each teacher can see. Default: <b>Results</b> for <b>all grades</b>. Uncheck “All grades” to limit it to specific grades.</div>
    ${cards}${emptyMsg}`;
}
window.adminNewTeacher=()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminTeachers()">← Back to Teachers</button>
    <div class="card" style="max-width:560px;margin-top:12px"><h2 style="margin-top:0">Add Teacher</h2>
    <div class="field-2"><div><label>First name(s)</label><input id="nt_first" placeholder="E.g. María"></div><div><label>Last name(s)</label><input id="nt_last" placeholder="E.g. García"></div></div>
    <label>Email address</label><input id="nt_email" type="email" placeholder="firstname.lastname@nordic-school.edu.pe">
    <label style="margin-top:10px;display:block">Password</label>
    <div style="position:relative;display:flex;align-items:center">
      <input id="nt_pw" type="password" placeholder="Minimum 8 characters" style="flex:1;padding-right:40px">
      <button onclick="window._toggleNewPw('nt_pw','nt_pw_btn')" id="nt_pw_btn" title="Show/hide password"
        style="position:absolute;right:10px;background:none;border:none;cursor:pointer;font-size:1rem;color:var(--muted);line-height:1;padding:0">👁</button>
    </div>
    <div id="nt_msg" style="margin-top:10px"></div>
    <div class="row" style="margin-top:16px"><button class="btn" onclick="window.createTeacher()">Create Teacher</button></div>
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
  if(!first||!last||!email||!pw) return msg.innerHTML='<div class="note err">Complete all fields: first name, last name, email and password.</div>';
  if(pw.length<8) return msg.innerHTML='<div class="note err">The password must be at least 8 characters long.</div>';
  msg.innerHTML='<div class="note">Creating account…</div>';
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
    msg.innerHTML='<div class="note">Account creation is taking longer than usual due to the connection. <b>The account has very likely already been created.</b> Returning to the Teachers list so you can check — <b>do not use the same email twice</b>. If it does not appear, wait a few seconds and reload.</div>';
    setTimeout(adminTeachers, 3000);
    return;
  }
  if(rpcErr){ msg.innerHTML=`<div class="note err">${esc(rpcErr.message||String(rpcErr))}</div>`; return; }
  msg.innerHTML='<div class="note ok">✓ Teacher created successfully. Redirecting…</div>';
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
  msgEl.textContent='Saving…';
  const { error } = await sb.from('teacher_access').upsert(row,{onConflict:'profile_id'});
  if(error){ msgEl.textContent='⚠ '+error.message; return; }
  const uid=(state.session&&state.session.user&&state.session.user.id)||null;
  const nodeRows=[...card.querySelectorAll('.tg-node')].map(c=>({profile_id:id,node_key:c.value,allowed:c.checked,updated_at:new Date().toISOString(),updated_by:uid}));
  const { error:e2 } = nodeRows.length ? await sb.from('teacher_node_access').upsert(nodeRows,{onConflict:'profile_id,node_key'}) : {error:null};
  msgEl.textContent = e2 ? ('⚠ '+e2.message) : '✓ Saved';
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
      <h2 style="margin:0 0 4px">👁️ View the ${isMock?'Mocks':'Practice Tests'}</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:12px">Open them as the student sees them${isMock?' (MOCK 1 · 2 and the level are chosen inside)':' (the level and practice 1 · 2 · 3 are chosen inside)'}. Teachers and administrators can <b>always</b> view them, even with the grade locked.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${btn(q('reading'),'📖 Reading &amp; UoE')}
        ${btn(q('listening'),'🎧 Listening')}
        ${btn(q('writing'),'✍️ Writing')}
      </div>
    </div>`;
}
/* 🔓 Open Mocks: desde el 18-sep-2026 es el panel de mock mode
   (app/62-mock-mode.js): el numero de mock que rinde todo el colegio, el
   candado por grado de siempre y el mock individual por alumno. */
async function adminMocks(){ return mockModePanel({admin:true}); }
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
      <td><span class="badge ${on?'on':'off'}">${on?'🔓 Unlocked':'🔒 Locked'}</span></td>
      <td class="muted" style="font-size:.82rem">${when}</td>
      <td><button class="btn sm ${on?'ghost':''}" onclick="window._togglePractice(${g.id}, ${on?'false':'true'}, this)">${on?'Lock':'Unlock'}</button></td>
    </tr>`;
  }).join('');
  $('#main').innerHTML = `<h1>Practice Tests — access control</h1>
    <div class="note"><b>PRACTICE TESTS are unlocked by default</b> (free practice). Lock them by grade when you want to reserve them for classroom use, then unlock them when done. <b>Mocks</b> (official exams) are managed separately, admin only.</div>
    ${_examPreviewCard('practice')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Grade</th><th>Practice Tests status</th><th>Last updated</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
}
window._togglePractice = async (gradeId, to, btn)=>{
  if(btn){ btn.disabled=true; btn.textContent='…'; }
  const { error } = await sb.from('practice_access').upsert(
    { grade_id:gradeId, unlocked:to, updated_at:new Date().toISOString(), updated_by:(state.session&&state.session.user&&state.session.user.id)||null },
    { onConflict:'grade_id' });
  if(error){ alert('Could not update: '+error.message); }
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

  const TIPOS = [['','All','👥'],['student','Students','🎒'],['teacher','Teachers','👨‍🏫'],
                 ['admin','Admins','🛡️'],['demo','Demos','🧪']];
  const botonesTipo = TIPOS.map(([v,l,ic])=>{
    const n = all.filter(p => pasaResto(p) && (!v || esTipo(p, v))).length;
    return `<button class="btn sm ${fr===v?'':'ghost'}" onclick="window._setUserFilter('role','${v}')"
      title="Show only ${l.toLowerCase()}">${ic} ${l} <b>${n}</b></button>`;
  }).join(' ');

  const gradeOpts = `<option value="">All grades</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(fg)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const yearOpts = `<option value="">All years</option>`+years.map(y=>`<option value="${y}" ${String(fy)===String(y)?'selected':''}>${y}</option>`).join('');
  const seccionOpts = `<option value="">All sections</option>`+secciones.map(s=>`<option value="${esc(s)}" ${fs===s?'selected':''}>Section ${esc(s)}</option>`).join('');
  const rows=list.map(p=>{
    const suspended = p.active===false;
    const nombre = esc((p.full_name||p.email||'').replace(/'/g,'’'));
    const pasteMs = p.role==='student' ? pasteHasta(p) : 0;
    const pasteBtn = p.role!=='student' ? '' : pasteMs
      ? `<button class="btn sm ghost" style="border-color:#2563eb;color:#1d4ed8" onclick="window._togglePaste('${p.id}','${nombre}',false)" title="Pasting into the writing boxes is allowed until ${pasteFecha(pasteMs)}. Click to switch it off now.">📋 Paste on · ${pasteFecha(pasteMs)}</button> `
      : `<button class="btn sm ghost" onclick="window._togglePaste('${p.id}','${nombre}',true)" title="Pasting is blocked (school rule). Click to allow it for ${PASTE_DIAS} days; every paste is still recorded.">📋 Paste off</button> `;
    const toggleBtn = suspended
      ? `<button class="btn sm" style="background:var(--good)" onclick="suspendUser('${p.id}',true)">Reactivate</button>`
      : `<button class="btn sm ghost" style="border-color:var(--warn);color:#92600a" onclick="suspendUser('${p.id}',false)">Suspend</button>`;
    return `<tr data-id="${p.id}" style="${suspended?'opacity:.55':''}">
      <td><b>${esc(p.full_name||((p.first_name||'')+' '+(p.last_name||'')))}</b><div class="muted" style="font-size:.8rem">${esc(p.email||'')}</div></td>
      <td><span class="badge grade">${esc(p.grades?.name||'—')}</span> ${p.section?esc(p.section):''}</td>
      <td>${p.academic_year||2026}</td>
      <td><span class="badge lvl">${esc(p.cefr_level||'—')}</span></td>
      <td><span class="badge ${p.role==='student'?'':'on'}">${esc(p.role)}</span>${p.is_demo?' <span class="badge" title="Demo account">🧪 demo</span>':''}</td>
      <td><span class="badge ${suspended?'off':'on'}">${suspended?'Suspended':'Active'}</span></td>
      <td class="acts"><div class="acts-wrap">${p.role==='student'?`<button class="btn sm ghost" onclick="window._previewStudent('${p.id}','${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')" title="View the portal as this student sees it">👁️ View as</button> <button class="btn sm ghost" onclick="window._openStudentAccess('${p.id}',${p.grade_id||'null'},'${esc((p.full_name||p.email||'').replace(/'/g,'’'))}')">🔧 Access</button> <button class="btn sm ghost" onclick="window.resetStudentPassword('${p.id}','${esc((p.full_name||p.email||'').replace(/'/g,'’'))}','${esc((p.email||'').replace(/'/g,'’'))}')" title="Assign a new temporary password">🔑 Reset</button> ${pasteBtn}`:''}<button class="btn sm ghost" onclick="editUser('${p.id}')">Edit</button> ${toggleBtn} <button class="btn sm danger" onclick="deleteUser('${p.id}','user')">Delete</button></div></td>
    </tr>`;}).join('');
  $('#main').innerHTML=`<div class="row" style="justify-content:space-between;align-items:center"><h1>Users</h1>
      <button class="btn sm" onclick="adminNewUser()">+ New</button></div>
    <div class="card">
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:14px">${botonesTipo}</div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
        <div><label>Grade</label><select onchange="window._setUserFilter('grade',this.value)" style="min-width:170px">${gradeOpts}</select></div>
        <div><label>Section</label><select onchange="window._setUserFilter('section',this.value)" style="min-width:150px">${seccionOpts}</select></div>
        <div><label>Academic year</label><select onchange="window._setUserFilter('year',this.value)" style="min-width:150px">${yearOpts}</select></div>
        <label style="display:flex;align-items:center;gap:7px;font-weight:500;margin:0 0 10px"><input type="checkbox" ${showInactive?'checked':''} onchange="window._setUserFilter('showInactive',this.checked)" style="width:auto"> Show suspended${suspendedCount?` (${suspendedCount})`:''}</label>
        <div class="muted" style="padding-bottom:11px">${list.length} user(s)</div>
        ${(fr||fg||fy||fs) ? `<button class="btn sm ghost" style="margin-bottom:8px" onclick="window._limpiaUserFiltro()">Clear filters</button>` : ''}
      </div>
    </div>
    <div class="card" style="padding:0;overflow-x:auto">
      <table class="usuarios"><thead><tr><th>Name</th><th>Grade</th><th>Year</th><th>Level</th><th>Role</th><th>Status</th><th></th></tr></thead>
      <tbody>${rows||'<tr><td colspan="7" class="center muted">No users match this filter.</td></tr>'}</tbody></table>
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
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Back to Users</button>
    <div class="card" style="max-width:620px">
      <h2>🔑 Reset password</h2>
      <p><b>${esc(name||'Student')}</b></p>
      <p class="muted" style="margin-top:-8px">${esc(email||'')}</p>
      <div class="note">This action replaces the previous password. The new key will be shown here so you can copy it and give it to the student. NIS will not keep a visible copy.</div>
      <label>New temporary password</label>
      <div class="row" style="gap:8px;align-items:center">
        <input id="rp_pw" type="text" autocomplete="off" value="${esc(suggested)}" style="flex:1;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-weight:700;letter-spacing:.4px">
        <button class="btn sm ghost" type="button" onclick="window.regenerateStudentPassword()">↻ Generate another</button>
      </div>
      <p class="muted" style="font-size:.82rem">You can use the suggested one or type another. Minimum 8 characters recommended.</p>
      <div id="rp_msg"></div>
      <div class="row" style="margin-top:14px;gap:8px">
        <button id="rp_save" class="btn" onclick="window.saveStudentPassword('${id}')">Change password</button>
        <button class="btn ghost" onclick="adminUsers()">Cancel</button>
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
  if(pw.length<8){ msg.innerHTML='<div class="note err">Use at least 8 characters for the temporary password.</div>'; return; }
  if(btn){ btn.disabled=true; btn.textContent='Changing…'; }
  msg.innerHTML='<div class="note">Updating the password…</div>';
  const r=await sb.rpc('admin_set_password',{p_id:id,p_password:pw});
  if(r.error){
    msg.innerHTML=`<div class="note err">${esc(r.error.message)}</div>`;
    if(btn){ btn.disabled=false; btn.textContent='Change password'; }
    return;
  }
  // Mantenerla visible solo en esta pantalla para poder entregársela al alumno.
  input.readOnly=true;
  msg.innerHTML=`<div class="note ok"><b>Password changed.</b> The previous password no longer works.<br>
    <div class="row" style="margin-top:10px;gap:8px;align-items:center;flex-wrap:wrap">
      <code id="rp_result" style="font-size:1.05rem;font-weight:800;user-select:all">${esc(pw)}</code>
      <button class="btn sm" onclick="window.copyTemporaryPassword()">📋 Copy</button>
    </div>
    <div class="muted" style="margin-top:8px">Once you leave this screen, NIS will not show this key again.</div></div>`;
  if(btn) btn.style.display='none';
};

window.copyTemporaryPassword = async function(){
  const el=$('#rp_result'); if(!el) return;
  const text=el.textContent||'';
  try{
    await navigator.clipboard.writeText(text);
    const old=el.nextElementSibling;
    if(old){ old.textContent='✓ Copied'; setTimeout(()=>{ old.textContent='📋 Copy'; },1600); }
  }catch(_){
    const range=document.createRange(); range.selectNodeContents(el);
    const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }
};
window.adminNewUser = ()=>{
  $('#main').innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Back</button>
    <div class="card" style="max-width:600px"><h2>New user</h2>
    <div class="field-2"><div><label>First name</label><input id="n_first"></div><div><label>Last name</label><input id="n_last"></div></div>
    <label>Email</label><input id="n_email" type="email" placeholder="nombre.apellido@nordic-school.edu.pe">
    <div class="field-2"><div><label>Role</label><select id="n_role"><option value="student">student</option><option value="teacher">teacher</option><option value="admin">admin</option></select></div>
      <div><label>Password</label><input id="n_pw" type="password" autocomplete="new-password" placeholder="min. 8 characters"></div></div>
    <div class="field-2"><div><label>Grade</label><select id="n_grade"><option value="">—</option>${GRADES.map(g=>`<option value="${g.id}">${g.name}</option>`).join('')}</select></div>
      <div><label>Section</label><input id="n_section"></div></div>
    <div class="field-2"><div><label>Level</label><select id="n_level"><option value="">—</option>${LEVELS.map(l=>`<option>${l}</option>`).join('')}</select></div>
      <div><label>ID document</label><input id="n_doc"></div></div>
    <div class="field-2"><div><label>Academic year</label><select id="n_year">${yearOptions(2026)}</select></div><div></div></div>
    <div id="nmsg"></div>
    <div class="row" style="margin-top:14px"><button class="btn" onclick="createUser()">Create account</button></div></div>`;
};
window.createUser = async ()=>{
  const v=id=>$('#'+id).value.trim();
  const email=v('n_email'), pw=v('n_pw');
  if(!v('n_first')||!v('n_last')||!email||!pw) return $('#nmsg').innerHTML='<div class="note err">Fill in first name, last name, email and password.</div>';
  if(pw.length<8) return $('#nmsg').innerHTML='<div class="note err">The password must be at least 8 characters long.</div>';
  const meta={first_name:v('n_first'),last_name:v('n_last'),full_name:v('n_first')+' '+v('n_last'),
    role:$('#n_role').value, document_id:v('n_doc'),
    grade_id:$('#n_grade').value||null, section:v('n_section')||null, cefr_level:$('#n_level').value||null,
    academic_year:$('#n_year').value||'2026'};
  const { error } = await sb.rpc('admin_create_user',{p_email:email,p_password:pw,p_meta:meta});
  $('#nmsg').innerHTML = error?`<div class="note err">${esc(error.message)}</div>`:`<div class="note ok">Account created.</div>`;
  if(!error) setTimeout(adminUsers,800);
};
window.editUser = async (id)=>{
  const { data:p } = await sb.from('profiles').select('*').eq('id',id).single();
  const m=$('#main');
  m.innerHTML=`<button class="btn sm ghost" onclick="adminUsers()">← Back</button>
    <div class="card" style="max-width:560px">
      <h2>Edit: ${esc(p.full_name||p.email)}</h2>
      <div class="field-2">
        <div><label>Grade</label><select id="e_grade">${GRADES.map(g=>`<option value="${g.id}" ${p.grade_id==g.id?'selected':''}>${g.name}</option>`).join('')}</select></div>
        <div><label>Section</label><input id="e_section" value="${esc(p.section||'')}"></div>
      </div>
      <div class="field-2">
        <div><label>Level</label><select id="e_level"><option value="">—</option>${LEVELS.map(l=>`<option ${p.cefr_level===l?'selected':''}>${l}</option>`).join('')}</select></div>
        <div><label>Role</label><select id="e_role">${['student','teacher','admin'].map(r=>`<option ${p.role===r?'selected':''}>${r}</option>`).join('')}</select></div>
      </div>
      <div class="field-2">
        <div><label>Academic year</label><select id="e_year">${yearOptions(p.academic_year||2026)}</select></div>
        <div><label>Status</label><select id="e_active"><option value="true" ${p.active?'selected':''}>Active</option><option value="false" ${!p.active?'selected':''}>Inactive</option></select></div>
      </div>
      <label style="display:flex;align-items:center;gap:8px;font-weight:500">
        <input type="checkbox" id="e_demo" ${p.is_demo?'checked':''} style="width:auto">
        🧪 Demo account (not a real student or teacher of the school)</label>
      <label>Reset access password (optional)</label><input id="e_pw" type="password" autocomplete="new-password" placeholder="leave empty to keep unchanged · min. 8 characters">
      <div id="emsg"></div>
      <div class="row" style="margin-top:14px"><button class="btn" onclick="saveUser('${id}')">Save</button></div>
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
    if(pw.length<8){ $('#emsg').innerHTML='<div class="note err">The password must be at least 8 characters long.</div>'; return; }
    // Cambia la contraseña REAL de Auth (no solo la visible), para que el usuario pueda entrar.
    const r = await sb.rpc('admin_set_password',{p_id:id,p_password:pw});
    pwErr = r.error;
  }
  const err = error||pwErr;
  $('#emsg').innerHTML = err?`<div class="note err">${esc(err.message)}</div>`:`<div class="note ok">Saved.${pw?' Password updated — the user can now sign in with the new one.':''}</div>`;
  if(!err) setTimeout(adminUsers,900);
};
/* Permanently delete a user (admin only). Cascades to results, credentials and
   teacher access via the DB. Guarded server-side: can't delete self or the last admin. */
window.deleteUser = async (id, kind)=>{
  const el = document.querySelector(`tr[data-id="${id}"]`) || document.querySelector(`.card[data-tid="${id}"]`);
  const name = el ? ((el.querySelector('b')||el.querySelector('h2'))||{}).textContent || 'this user' : 'this user';
  if(!await NISUI.pregunta(`The account of ${name} and ALL their results will be deleted. This cannot be undone.`, {titulo:'Delete permanently?', si:'Yes, delete', no:'Cancel', tono:'mal', peligro:true})) return;
  const { error } = await sb.rpc('admin_delete_user', { p_id:id });
  if(error){ alert('Could not delete: '+error.message); return; }
  (kind==='teacher' ? adminTeachers : adminUsers)();
};
/* Suspend (soft): keep the account + data but block access and hide it from the
   default list. Reversible with Reactivar. */
/* Pegar con permiso. writing-trace.js bloquea pegar en toda caja de texto
   del alumno (regla del colegio, 11-sep-2026); este interruptor abre la
   puerta a UN alumno —profiles.paste_allowed_until, que solo un admin puede
   tocar— para el caso del que ya tenía el texto escrito fuera del portal.
   Se cierra sola a los PASTE_DIAS días para que nadie se quede con la puerta
   abierta por olvido, y cada pegado queda anotado igual: el profesor lo ve en
   azul junto a las pulsaciones («📋 1 paste allowed by the teacher»). */
const PASTE_DIAS = 7;
function pasteHasta(p){ const ms = p && p.paste_allowed_until ? Date.parse(p.paste_allowed_until) : 0; return ms > Date.now() ? ms : 0; }
function pasteFecha(ms){ return new Date(ms).toLocaleDateString('en', { weekday:'short', day:'numeric', month:'short' }); }
window._togglePaste = async (id, nombre, on)=>{
  if(on && !await NISUI.pregunta(`${nombre} will be able to paste text into the writing boxes for ${PASTE_DIAS} days, or until you switch it off. Every paste is still recorded and shown next to the keystrokes.`, {titulo:'Allow pasting?', si:'Allow pasting', no:'Cancel', tono:'info', icono:'📋'})) return;
  let hasta = null;
  if(on){ hasta = new Date(Date.now() + PASTE_DIAS*864e5); hasta.setHours(23,59,59,0); }
  const { error } = await sb.from('profiles').update({ paste_allowed_until: hasta ? hasta.toISOString() : null }).eq('id', id);
  if(error){ alert('Could not update: '+error.message); return; }
  if(window.NISUI&&NISUI.aviso) NISUI.aviso(on ? `📋 Pasting allowed for ${nombre} until ${pasteFecha(hasta.getTime())}` : `🚫 Pasting is off again for ${nombre}`, 'bien', 3500);
  adminUsers();
};
window.suspendUser = async (id, to, kind)=>{
  if(!to && !await NISUI.pregunta('They will not be able to sign in and will be hidden from the list. You can reactivate them whenever you want.', {titulo:'Suspend this user?', si:'Suspend', no:'Cancel', tono:'ojo'})) return;
  const { error } = await sb.from('profiles').update({ active:to }).eq('id',id);
  if(error){ alert('Could not update: '+error.message); return; }
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
      ? `<span class="badge off" title="Weakest part" style="font-size:.72rem">▼ ${esc(ws.weak.name)} ${ws.weak.pct}%</span> <span class="badge on" title="Strongest part" style="font-size:.72rem">▲ ${esc(ws.strong.name)} ${ws.strong.pct}%</span>`
      : '<span class="muted">—</span>';
    return `<tr data-sname="${esc((a.profiles?.full_name||'').toLowerCase())}">
    <td><b>${esc(a.profiles?.full_name||'')}</b></td>
    <td><span class="badge grade">${esc(a.profiles?.grades?.name||'—')}</span></td>
    <td style="text-align:center">${a.profiles?.section?`<span class="badge">${esc(a.profiles.section)}</span>`:'<span class="muted">—</span>'}</td>
    <td>${esc(a.skill)} · <span class="badge lvl">${esc(a.level)}</span> · ${mockLabel(a)}</td>
    <td>${a.percent!=null?`<b>${a.percent}%</b> <span class="muted">(${a.score}/${a.total})</span>`:((a.breakdown&&a.breakdown.teacherMessage)?'<span class="badge on" style="font-size:.72rem">✓ comment sent</span>':'<span class="muted">— (pending review)</span>')}</td>
    <td style="min-width:200px">${wsCell}</td>
    <td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td>
    <td>${a.skill==='Writing'
        ? `<button class="btn sm${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' ghost':''}" onclick="gradeWriting('${a.id}')">✍️ ${a.percent!=null?'Re-mark':((a.breakdown&&a.breakdown.teacherMessage)?'Edit comment':'Mark')}</button>${(a.percent!=null||(a.breakdown&&a.breakdown.teacherMessage))?' <span class="badge on" style="font-size:.7rem">✓ sent</span>':''}`
        : `<button class="btn sm ghost" onclick="openAttempt('${a.id}')">View analysis →</button>`}</td>
  </tr>`;}).join('');
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">Results</h1>
      <button class="btn sm ghost" onclick="window.exportResultsExcel()">📥 Export Excel</button>
    </div>
    ${resultsFilterBar(GRADES,'window._setResFilter')}${tabs}
    ${partsBreakdownCard(list)}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Section</th><th>Exam</th><th>Score</th><th>Weak / Strong (parts)</th><th>Date</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="8" class="center muted">No results for this filter.</td></tr>`}</tbody>
    </table>
    <div id="resCount" data-noun="result(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${list.length} result(s)</div></div>`;
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
    : `<p class="muted">This attempt did not save a breakdown by part${a.percent==null?' (Writing is not marked by part)':''}.</p>`;
  const swHtml = parts.length ? `<div class="grid cols-2">
      <div><h3 style="color:var(--good)">💪 Strengths</h3>${strengths.length?'<ul>'+strengths.map(p=>`<li>${esc(p.name)} — ${p.pct}%</li>`).join('')+'</ul>':'<p class="muted">No part ≥70% yet.</p>'}</div>
      <div><h3 style="color:var(--bad)">⚠️ To reinforce</h3>${weaknesses.length?'<ul>'+weaknesses.map(p=>`<li>${esc(p.name)} — ${p.pct}%</li>`).join('')+'</ul>':'<p class="muted">No parts below 50%. 👏</p>'}</div>
    </div>` : `<p class="muted">They will be shown once the breakdown by part is saved.</p>`;
  const focus = weaknesses[0] ? `Focus reinforcement on <b>${esc(weaknesses[0].name)}</b> (${weaknesses[0].pct}%).` : (parts.length?'Good balance between the parts.':'');
  // Writing answers (if present)
  let writingHtml='';
  if(a.skill==='Writing' && Array.isArray(a.answers)){
    writingHtml = `<div class="card"><h2>Submitted texts (Writing)</h2>${a.answers.map(t=>`<div style="border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:10px"><b>${esc(t.label||'')}</b> <span class="muted">${t.wordCount||''} words</span><div class="answer" style="white-space:pre-wrap;margin-top:6px">${esc(t.text||'(no answer)')}</div></div>`).join('')}</div>`;
  }
  $('#main').innerHTML=`
    <button class="btn sm ghost" onclick="backToResults()">← Back to results</button>
    <div class="card"><h2 style="margin-bottom:2px">${esc(a.profiles?.full_name||'Student')}</h2>
      <div class="muted">${esc(a.profiles?.grades?.name||'')} · ${esc(a.skill)} · ${esc(a.level)} · ${mockLabel(a)} · ${new Date(a.submitted_at).toLocaleString()}</div>
      <div class="grid cols-3" style="margin-top:14px">
        <div class="stat"><div class="l">Score</div><div class="n">${a.percent!=null?a.percent+'%':'—'}</div><div class="muted">${a.score!=null?a.score+'/'+a.total:'teacher review'}</div></div>
        <div class="stat"><div class="l">Time</div><div class="n">${a.duration_min!=null?a.duration_min:'—'}<span style="font-size:1rem"> min</span></div></div>
        <div class="stat"><div class="l">Type</div><div class="n" style="font-size:1.3rem">${isMockAttempt(a)?'Mock':'Practice'}</div><div class="muted">${mockLabel(a)}</div></div>
      </div>
    </div>
    <div class="card"><h2>Results by part</h2>${partsHtml}</div>
    <div class="card"><h2>Strengths and weaknesses</h2>${swHtml}</div>
    <div class="card"><h2>CEFR recommendation</h2>
      <div class="note ${rec.tier==='good'?'ok':rec.tier==='bad'?'err':'info'}"><b>${esc(rec.label)}.</b> ${rec.text}</div>
      ${focus?`<p style="margin-top:8px">${focus}</p>`:''}
    </div>
    ${writingHtml}`;
};

/* ===================== ADMIN · ESTADÍSTICAS (visual) ===================== */
const CHART_PALETTE=['#4987c6','#76cbe5','#2f5f93','#d2909b','#16a34a','#f59e0b','#7c6fd2','#e07a5f','#2a9d8f','#9b5de5','#ef476f'];
const READY_TIERS=[
  {key:'high',label:'High pass (≥80%)',color:'#16a34a',min:80},
  {key:'pass',label:'Pass (60–79%)',color:'#4987c6',min:60},
  {key:'near',label:'Approaching (40–59%)',color:'#f59e0b',min:40},
  {key:'below',label:'Below (<40%)',color:'#dc2626',min:0}
];
let statsState={view:'grade',type:'bar',grade:'',section:'',skill:'',exam:'all'};
let _statsAll=null,_statsStudents=null,_chart=null,_chartDec=null,_chartLib=null;
function ensureChart(){
  if(window.Chart) return Promise.resolve();
  if(_chartLib) return _chartLib;
  _chartLib=new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='vendor/chart.umd.min.js';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('Could not load Chart.js (connection issue).'));
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
  $('#main').innerHTML=`<h1>Statistics and reports</h1><p class="muted">Loading data…</p>`;
  try{ await ensureChart(); }catch(e){ $('#main').innerHTML=`<div class="note err">${esc(e.message)}</div>`; return; }
  if(!_statsAll){
    const { data:att } = await sb.from('exam_attempts').select('skill,level,mock,percent,score,total,breakdown,submitted_at,student_id, profiles(full_name,grade_id,section,grades(name))').limit(3000);
    _statsAll=att||[];
    const { data:st } = await sb.from('profiles').select('id,full_name,grade_id,section,cefr_level').eq('role','student');
    _statsStudents=st||[];
  }
  const sections=[...new Set((_statsStudents||[]).map(s=>s.section).filter(Boolean))].sort();
  const f=statsState;
  const gOpts=`<option value="">All grades</option>`+GRADES.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const sOpts=`<option value="">All sections</option>`+sections.map(s=>`<option value="${s}" ${f.section===s?'selected':''}>${s}</option>`).join('');
  const skOpts=`<option value="">All skills</option>`+SKILLS.map(s=>`<option value="${s}" ${f.skill===s?'selected':''}>${s}</option>`).join('');
  const exOpts=[['all','All exams'],['mock1','Mock 1'],['mock2','Mock 2'],['practice','Practice Tests']].map(([v,l])=>`<option value="${v}" ${f.exam===v?'selected':''}>${l}</option>`).join('');
  const scored=statsFiltered();
  const studentsAssessed=new Set(scored.map(a=>a.student_id)).size;
  const overall=_avg(scored.map(a=>a.percent));
  // December readiness: per student, projected = latest mock (mock2 else mock1) avg
  const proj=decemberProjection();
  const readyPct=proj.students.length?Math.round(proj.students.filter(s=>s.proj!=null&&s.proj>=60).length/proj.students.filter(s=>s.proj!=null).length*100):0;
  const VIEWS=[['grade','By grade'],['skill','By skill'],['parts','By exam part'],['gradesection','By grade and section'],['ready','CEFR readiness'],['mockprog','Progress Mock 1 → 2'],['level','By CEFR level']];
  const TYPES=[['bar','Bars'],['line','Line'],['doughnut','Doughnut'],['polarArea','Polar']];
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h1 style="margin:0">Statistics and reports</h1>
      <div class="row" style="gap:8px"><button class="btn sm" onclick="adminNewUser()">+ Student</button><button class="btn sm ghost" onclick="adminNewTeacher()">+ Teacher</button></div>
    </div>
    <div class="card" style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end">
      <div><label>Grade</label><select onchange="window._stF('grade',this.value)" style="min-width:150px">${gOpts}</select></div>
      <div><label>Section</label><select onchange="window._stF('section',this.value)" style="min-width:140px">${sOpts}</select></div>
      <div><label>Skill</label><select onchange="window._stF('skill',this.value)" style="min-width:150px">${skOpts}</select></div>
      <div><label>Exam</label><select onchange="window._stF('exam',this.value)" style="min-width:150px">${exOpts}</select></div>
    </div>
    <div class="grid cols-3" style="margin-bottom:4px">
      <div class="stat"><div class="l">Exams marked</div><div class="n">${scored.length}</div></div>
      <div class="stat"><div class="l">Overall average</div><div class="n">${overall!=null?overall+'%':'—'}</div></div>
      <div class="stat"><div class="l">Students assessed</div><div class="n">${studentsAssessed}</div></div>
      <div class="stat" style="background:linear-gradient(135deg,var(--blue),var(--celeste));color:#fff"><div class="l" style="color:#eaf4ff">Ready for official exam (Dec)</div><div class="n" style="color:#fff">${readyPct}%</div></div>
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
      <h2>📅 December projection — Official exam</h2>
      <p class="muted" style="margin-top:-4px">Each student is projected using their <b>Mock 2</b> (or Mock 1 if they have not yet taken the second one). Cambridge pass standard ≈ 60%.</p>
      <div style="position:relative;height:300px;margin:10px 0"><canvas id="statDec"></canvas></div>
      <div style="overflow-x:auto"><table>
        <thead><tr><th>Grade</th><th>Students</th><th>Avg. Mock 1</th><th>Avg. Mock 2</th><th>Dec projection</th><th>Ready</th><th>Pending 2nd mock</th></tr></thead>
        <tbody>${proj.byGrade.map(r=>`<tr>
          <td><b>${esc(r.grade)}</b></td>
          <td>${r.total}</td>
          <td>${r.m1!=null?r.m1+'%':'—'}</td>
          <td>${r.m2!=null?`<b>${r.m2}%</b>`:'<span class="muted">—</span>'}</td>
          <td>${r.proj!=null?`<span class="badge ${r.proj>=60?'on':'off'}">${r.proj}%</span>`:'<span class="muted">—</span>'}</td>
          <td>${r.ready}/${r.assessed}</td>
          <td>${r.pending? `<span class="badge off">${r.pending}</span>`:'<span class="badge on">0</span>'}</td>
        </tr>`).join('')||'<tr><td colspan="7" class="center muted">No mock data yet.</td></tr>'}</tbody>
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
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Average (%) by grade'};
  }
  if(v==='skill'){
    const rows=SKILLS.map((s,i)=>({label:s, val:_avg(sc.filter(a=>a.skill===s).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]})).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Average (%) by skill'};
  }
  if(v==='level'){
    const rows=LEVELS.map((l,i)=>({label:l, val:_avg(sc.filter(a=>a.level===l).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]})).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Average (%) by CEFR level'};
  }
  if(v==='gradesection'){
    const keys=[...new Set(sc.map(a=>`${a.profiles?.grade_id}|${a.profiles?.section||'—'}`))]
      .filter(k=>!k.startsWith('undefined')).sort();
    const rows=keys.map((k,i)=>{ const [g,sec]=k.split('|'); return {label:`${gradeName(g)} ${sec}`, val:_avg(sc.filter(a=>`${a.profiles?.grade_id}|${a.profiles?.section||'—'}`===k).map(a=>a.percent)), color:CHART_PALETTE[i%CHART_PALETTE.length]};}).filter(r=>r.val!=null);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Average (%) by grade and section'};
  }
  if(v==='ready'){
    const rows=READY_TIERS.map(t=>({label:t.label, val:sc.filter(a=>readyTier(a.percent).key===t.key).length, color:t.color})).filter(r=>r.val>0);
    return {labels:rows.map(r=>r.label), data:rows.map(r=>r.val), colors:rows.map(r=>r.color), title:'Readiness distribution (no. of exams)', distribution:true};
  }
  if(v==='parts'){
    const ps=aggregateParts(sc); // weakest first
    const col=p=>p.avg<50?'#dc2626':p.avg<70?'#f59e0b':'#16a34a';
    return {labels:ps.map(p=>p.name), data:ps.map(p=>p.avg), colors:ps.map(col), title:'Average (%) by exam part — weak → strong'};
  }
  if(v==='mockprog'){
    const labels=GRADES.map(g=>g.name);
    const m1=GRADES.map(g=>_avg(sc.filter(a=>a.mock==='mock1'&&String(a.profiles?.grade_id)===String(g.id)).map(a=>a.percent)));
    const m2=GRADES.map(g=>_avg(sc.filter(a=>a.mock==='mock2'&&String(a.profiles?.grade_id)===String(g.id)).map(a=>a.percent)));
    const keep=labels.map((_,i)=>m1[i]!=null||m2[i]!=null);
    return {labels:labels.filter((_,i)=>keep[i]), multi:[
      {label:'Mock 1', data:labels.map((_,i)=>m1[i]).filter((_,i)=>keep[i]), color:'#76cbe5'},
      {label:'Mock 2', data:labels.map((_,i)=>m2[i]).filter((_,i)=>keep[i]), color:'#2f5f93'}
    ], title:'Progress Mock 1 → Mock 2 (% by grade)'};
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
    {label:'Target (60%)', type:'line', data:rows.map(()=>60), borderColor:'#dc2626', borderDash:[6,4], pointRadius:0, borderWidth:2}
  ]}, options:{responsive:true,maintainAspectRatio:false, scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+'%'}}}, plugins:{legend:{position:'bottom'}}}});
}