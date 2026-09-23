

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
  {key:'french',                        label:'French (whole subject)'},
  {key:'french.crosswords',             label:'French · Crosswords'},
  {key:'french.wordsearch',             label:'French · Word Search'},
  {key:'french.classes',                label:'🇫🇷 Classes (all)'},
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
    $('#main').innerHTML = `${_isStudent()?_backBtn("window._nav('home')",'Home'):''}<h1>🇫🇷 French</h1>
      <p class="muted" style="margin-top:-6px">Class material goes by grade; vocabulary games go by level of the Common European Framework.</p>
      <div class="grid cols-2" style="margin-top:12px">
        ${nodeVisible('french.classes') ? _hubCard('🏫','Classes','Le matériel de chaque grade : les jeux de l’unité, semaine par semaine.',"window._nav('fr_classes')") : _lockedCard('🏫','Classes','French class material by grade.')}
        ${_cefrOn ? _hubCard('📚','CEFR','Mots croisés et mots mêlés par niveau, de A1 à C2.',"window._nav('fr_cefr')") : _lockedCard('📚','CEFR','Vocabulary games by level (A1–C2).')}
      </div>`;
    return;
  }
  // Aqui abajo ya solo se pinta ingles: el francés se fue por su propia rama.
  const areas = ENGLISH_AREAS.filter(a=>!a.when || a.when());
  const tarjeta = (a)=>{
    // Cambridge trae su dibujo 3D (cambridge-icons.js) en lugar de emoji.
    const em = (a.icon && typeof camIcon==='function') ? camIcon(a.icon,72) : a.emoji;
    if(a.node && !nodeVisible(a.node)) return _lockedCard(em,a.title,a.desc);
    return _hubCard(em,a.title,a.desc,`window._nav('${a.nav}')`);
  };
  const bloques = ENGLISH_BLOCKS.map(b=>{
    const cards = areas.filter(a=>a.block===b.key).map(tarjeta).join('');
    if(!cards) return '';
    return `<h2 style="margin:26px 0 2px">${b.title}</h2>
      <p class="muted" style="margin:0 0 12px;font-size:.86rem">${b.desc}</p>
      <div class="grid cols-3">${cards}</div>`;
  }).join('');
  $('#main').innerHTML = `${_isStudent()?_backBtn("window._nav('home')",'Home'):''}<h1>🇬🇧 English</h1>
    <p class="muted" style="margin-top:-6px">Everything you have in English, in the order you use it.</p>
    ${bloques}`;
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
  // Fase 2 WP-B: ya no cuelga de la vieja English — vive dentro de My
  // Progress (results), que es donde ahora tiene su enlace de entrada.
  _setNav('results');
  const p=state.profile;
  const back=_isStudent()?_backBtn("window._nav('results')",'My Progress'):'';
  if(!p.id) return _previewNeedsStudent('🏅 Final result · CEFR', back);
  $('#main').innerHTML=`${back}<h1>🏅 Final result · CEFR</h1><p class="muted">Loading…</p>`;
  // El alumno ve el ÚLTIMO ciclo liberado por el admin (mock_cycles.released_at):
  // del Official Mock 2 no ve nada hasta que salga el informe único (21-sep-2026).
  const cycle = await mockLatestReleased(p.id);   // liberado para todos o enviado a este alumno (mock_reports)
  const { data:atAll } = await sb.from('exam_attempts').select('id,skill,level,percent,mock,submitted_at,breakdown').eq('student_id',p.id);
  const at = mockCycleAttempts(atAll||[], cycle);
  let sp=null; try{ const r=await sb.from('speaking_results').select('*').eq('student_id',p.id); sp=mockSpeakingOf((r&&r.data)||[], cycle); }catch(e){}
  const fin=mockCycleFinal(p, at, sp, cycle);
  const tgt=targetLevel(p), stt=targetStatus(fin.finalCefr,tgt);
  const sttTxt = stt==='below'?`▼ Below your target (${tgt})`:stt==='above'?`▲ Above your target (${tgt})`:stt==='meets'?`✓ Meets your target (${tgt})`:'';
  const ch='padding:8px;border:1px solid var(--line)';
  const row=(label,b)=>`<tr><td style="${ch}"><b>${label}</b></td>
    <td style="${ch};text-align:center">${b?b.level:'—'}</td>
    <td style="${ch};text-align:center">${b?(b.pct!=null?b.pct+'%':'—'):'<span style="color:#b45309">Pending</span>'}</td>
    <td style="${ch};text-align:center;color:var(--blue-d);font-weight:700">${b?esc(b.cefr):'—'}</td>
    <td style="${ch};text-align:center">${b?b.scale:'—'}</td></tr>`;
  const wRow = fin.a2NoWriting
    ? `<tr><td style="${ch}"><b>Writing</b></td><td colspan="4" style="${ch};color:var(--grey)">Included in Reading &amp; Use of English (A2 Key)</td></tr>`
    : row('Writing', fin.skills.Writing);
  $('#main').innerHTML=`${back}<h1>🏅 Final result · CEFR · ${cycle===2?'MOCK 2':'MOCK 1'}</h1>
    <p class="muted" style="margin-top:-6px">This is the report given to parents: your final level, combining your best results per skill on the Cambridge Scale.</p>
    <div class="card" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr><th style="${ch};text-align:left">Skill</th><th style="${ch}">Level</th><th style="${ch}">Result</th><th style="${ch}">CEFR</th><th style="${ch}">Scale</th></tr></thead>
      <tbody>
        ${row('Reading &amp; Use of English'+(fin.a2NoWriting?' (includes Writing)':''),fin.skills.Reading)}
        ${row('Listening',fin.skills.Listening)}
        ${wRow}
        ${row('Speaking',fin.skills.Speaking)}
      </tbody></table></div>
    <div class="card" style="display:flex;gap:16px;align-items:center;background:#0f2741;color:#fff">
      <div><div style="font-size:.78rem;opacity:.8">FINAL RESULT</div><div style="font-size:2.2rem;font-weight:800;line-height:1">${esc(fin.finalCefr)}</div></div>
      <div style="border-left:1px solid rgba(255,255,255,.3);padding-left:16px"><div style="font-size:.78rem;opacity:.8">CAMBRIDGE SCALE</div><div style="font-size:1.6rem;font-weight:700">${fin.finalScale!=null?fin.finalScale:'—'}</div></div>
      <div style="margin-left:auto;text-align:right">
        ${sttTxt?`<div style="font-size:.85rem;font-weight:700;color:${stt==='below'?'#fca5a5':'#86efac'}">${sttTxt}</div>`:''}
        ${fin.complete?'':`<div style="font-size:.74rem;opacity:.9;margin-top:4px">⚠ Provisional. Missing: ${esc(fin.missing.join(', '))}.</div>`}
      </div>
    </div>
    <button class="btn" onclick="window.studentReportPDF('${p.id}','es',${cycle})">📄 PDF (Spanish)</button> <button class="btn ghost" onclick="window.studentReportPDF('${p.id}','en',${cycle})">📄 PDF (English)</button>`;
}

/* Metadatos de grados dentro de Classes y niveles de actividades por grado.
   Primary 2–5 → pre-A1/A1 · 6/7/8 → A1–B2 · 9/10/11 → A1–C1.
   Classes se divide en DOS etapas: Primary (2.º–5.º) y Secondary (6.º–11.º). */
const GRADE_META = { g1:['1️⃣','Grade 1'], g2:['2️⃣','Grade 2'], g3:['3️⃣','Grade 3'], g4:['4️⃣','Grade 4'],
  g5:['5️⃣','Grade 5'],
  g6:['6️⃣','Grade 6'], g7:['7️⃣','Grade 7'], g8:['8️⃣','Grade 8'],
  g9:['9️⃣','Grade 9'], g10:['🔟','Grade 10'], g11:['🎓','Grade 11'] };
const GRADE_LEVELS = { g1:'A1', g2:'A1', g3:'A1', g4:'A1,A2', g5:'A1,A2',
  g6:'A1,A2,B1,B2', g7:'A1,A2,B1,B2', g8:'A1,A2,B1,B2',
  g9:'A1,A2,B1,B2,C1', g10:'A1,A2,B1,B2,C1', g11:'A1,A2,B1,B2,C1' };
/* GRADE_ORDER sigue siendo SOLO secundaria: todo el código previo (accesos,
   vistas) nació con 6.º–11.º y así no cambia de significado. */
/* 1.º va aparte: en el colegio es Early Years, no primaria, y su material es
   el proyecto del periodo, no las actividades por unidad. */
const EARLY_ORDER = ['g1'];
const PRIMARY_ORDER = ['g2','g3','g4','g5'];
const GRADE_ORDER = ['g6','g7','g8','g9','g10','g11'];
const ALL_GRADE_ORDER = [...EARLY_ORDER, ...PRIMARY_ORDER, ...GRADE_ORDER];
function _isPrimaryGrade(k){ return PRIMARY_ORDER.indexOf(k)>=0; }
function _isEarlyGrade(k){ return EARLY_ORDER.indexOf(k)>=0; }
const STAGE_META = {
  early:    {emoji:'🌱', title:'Early Years', desc:'1st grade — the interdisciplinary project of each term.', grades:EARLY_ORDER},
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
  // Fase 2 WP-B: para el alumno esta pagina ES «My classes» (se llega
  // directo desde la barra, sin pasar por etapa); para profesor/admin sigue
  // siendo el visor de siempre, con su «atrás» a la etapa.
  _setNav(_isStudent() ? 'myclasses' : 'classes');
  const [emoji,label]=GRADE_META[key]||['🏫',key];
  const base='english.classes.'+key;
  const route='classes_'+key;
  const stage=_isEarlyGrade(key)?'early':(_isPrimaryGrade(key)?'primary':'secondary');
  const back = _isStudent() ? '' : _backBtn("window._nav('classes_"+stage+"')",STAGE_META[stage].title);
  $('#main').innerHTML=`${back}<h1>${emoji} ${label}</h1>
    <p class="muted" style="margin-top:-6px">Class material — for exam preparation go to <a href="javascript:void(0)" onclick="window._nav('cambridge')">🎓 Cambridge</a>.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${arcsFor(key).length ? _hubCard('🧩','Project','The interdisciplinary project of the term: the essential question, the eleven-week map and what every subject contributes.',"location.href='"+_withBack('project.html?arc='+(arcoActual(key)||arcsFor(key)[0][0]),route)+"'")
        : (_isPrimaryGrade(key) ? '' : _hubCard('📚','English sequence','The six units of the year with their vocabulary, grammar and reading plan, the Cambridge exam the grade is preparing for and what every subject has in the planner.',"location.href='"+_withBack('project.html?grade='+key,route)+"'"))}
      ${unitPlansFor(key).length ? (nodeVisible(unitsNode(key)) ? _hubCard('🎯','Units','Your units this year: the final product, the rubric from day one, and the week-by-week practice that feeds it.',"window._nav('classes_"+key+"_units')") : _lockedCard('🎯','Units','Your units and their final products.')) : ''}
      ${_isPrimaryGrade(key)||_isEarlyGrade(key) ? '' : (nodeVisible(base+'.grammar') ? _skillCard('📝','Grammar','Grammar for '+label+': explanations and games by unit.',_withBack('grammar.html?grade='+key,route)) : _lockedCard('📝','Grammar','Grammar for '+label+'.'))}
      ${_isEarlyGrade(key) ? '' : nodeVisible(base+'.activities') ? _hubCard('🎲','Activities',_isPrimaryGrade(key)?'Games for each unit — with audio for young learners.':'Games by unit and by level: crosswords, word searches and more.',"window._nav('classes_"+key+"_act')") : _lockedCard('🎲','Activities','Games and activities.')}
      ${readerBooksFor(key).length ? (nodeVisible(base+'.reader') ? _hubCard('📚','Readers','Graded readers with activities for every chapter: '+readerBooksFor(key).map(id=>READER_CARDS[id][4]).join(', ')+'.',"window._nav('classes_"+key+"_readers')") : _lockedCard('📚','Readers','Graded readers with activities.'))
        : ((READER_BOOKS[key]||[]).length && nodeVisible('general.library') ? _hubCard('📚','Readers','Your teacher has not assigned a book to your class yet. Meanwhile, all the readers are in the Library.',"window._nav('library')") : '')}
      ${key==='g9' ? (nodeVisible('english.classes.g9.unitexams') ? _skillCard('📋','Unit Exams','The unit exam and its practice, at your level: multiple choice, true/false, word formation, transformations, word order, listening and writing. Your teacher opens each one when the class is ready.',_withBack('unit-exam.html?v=b5a52ea8',route)) : _lockedCard('📋','Unit Exams','The unit exam and its practice.')) : ''}
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
  // Fase 2 WP-B: se llega desde la pista Cambridge (Course de 5.º), no ya
  // desde la tarjeta de My classes — el «atrás» del alumno vuelve ahi.
  _setNav(_isStudent() ? 'cambridge' : 'classes');
  const route='classes_'+key+'_flyers';
  const back = _isStudent() ? _backBtn("window._nav('cambridge')",'Cambridge') : _backBtn("window._nav('classes_"+key+"')",GRADE_META[key][1]);
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
  // Fase 2 WP-B: se llega desde la pista Cambridge (Course de 9.º), no ya
  // desde la tarjeta de My classes — el «atrás» del alumno vuelve ahi.
  _setNav(_isStudent() ? 'cambridge' : 'classes');
  const route='classes_'+key+'_cambridge';
  const back = _isStudent() ? _backBtn("window._nav('cambridge')",'Cambridge') : _backBtn("window._nav('classes_"+key+"')",GRADE_META[key][1]);
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
  /* Obras con derechos: la app cuenta la historia al nivel y el alumno lee su
     ejemplar (biblioteca del colegio o comprado); el C2 es el plan de lectura
     del original. Ver tools/readers-nuevo-titulo.md. */
  fahrenheit:['🔥','Fahrenheit 451','Ray Bradbury at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: eight units, audio, 20 activities per unit, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=fahrenheit','Fahrenheit 451 (A2–C2)'],
  lordoftheflies:['🐚','Lord of the Flies','William Golding at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: twelve chapters, audio, 20 activities per chapter, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=lordoftheflies','Lord of the Flies (A2–C2)'],
  giver:['🛷','The Giver','Lois Lowry at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: eight units, audio, 20 activities per unit, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=giver','The Giver (A2–C2)'],
  greatexpectations:['🧣','Great Expectations','Charles Dickens at five levels — A2 · B1 · B2 · C1 · C2. Twelve chapters: read along with audio, listening, summaries, character files, games, Cambridge practice, Trinity speaking topics and chapter exams; the original text at C1 and C2.','reader.html?book=greatexpectations','Great Expectations (A2–C2)'],
  mobydick:['🐋','Moby-Dick','Herman Melville at five levels — A2 · B1 · B2 · C1 · C2. Twelve chapters: read along with audio, listening, summaries, character files, games, Cambridge practice, Trinity speaking topics and chapter exams; the original text at C1 and C2.','reader.html?book=mobydick','Moby-Dick (A2–C2)'],
  animalfarm:['🐖','Animal Farm','George Orwell at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: ten units, audio, 20 activities per unit, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=animalfarm','Animal Farm (A2–C2)'],
  mockingbird:['⚖️','To Kill a Mockingbird','Harper Lee at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: ten units, audio, 20 activities per unit, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=mockingbird','To Kill a Mockingbird (A2–C2)'],
  catcher:['🧢','The Catcher in the Rye','J. D. Salinger at five levels — A2 · B1 · B2 · C1 · C2. Read along with the book in your hands: eight units, audio, 20 activities per unit, Cambridge practice, Trinity speaking topics and chapter exams.','reader.html?book=catcher','The Catcher in the Rye (A2–C2)'],
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
  _setNav(_isStudent() ? 'myclasses' : 'classes');
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
  _setNav(_isStudent() ? 'myclasses' : 'classes');
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
  _setNav(subject==='french'?'french':(_isStudent()?'myclasses':'classes'));
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
  // Dia de mock (app/62-mock-mode.js): ninguna ruta salvo Home responde.
  if(mockModeActive() && k!=='home'){ mockModeBlock(); mockModeHub(); return true; }
  // Francés primero: sus rutas llevan el prefijo fr_ y si no, `classes_(g\d+)`
  // se las tragaría y pintaría la vista de inglés.
  if(m=/^fr_classes_(g\d+)_unit_([a-z0-9]+)$/.exec(k)){ studentGradeActivities(m[1],m[2],'french'); return true; }
  if(m=/^fr_classes_(g\d+)_act$/.exec(k)){ studentGradeActivities(m[1],null,'french'); return true; }
  if(m=/^fr_classes_(g\d+)$/.exec(k))    { studentFrenchGrade(m[1]);   return true; }
  if(k==='fr_classes')                   { studentFrenchClasses();     return true; }
  if(k==='fr_cefr')                      { studentFrenchCefr();        return true; }
  if(k==='myunit')            { irAMiUnidad();              return true; }
  if(k==='projects')          { irAMisProyectos();          return true; }
  if(k==='classes_early')     { studentStage('early');     return true; }
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
  if(k==='help'){ _setNav('help'); $('#main').innerHTML = ayudaBody(); return true; }
  // 'english' pinta ahora exactamente Home (alias): los ?back=./#english
  // viejos de las paginas de actividades siguen cayendo en un sitio con
  // sentido. 'myclasses' y 'tools' son las dos claves nuevas de la barra.
  const fn={english:studentHub,french:()=>studentSubject('french'),general:studentGeneral,
    mocks:studentMocks,practice:studentPractice,cambridge:studentCambridgePortal,library:studentLibrary,mun:studentMun,classes:studentClasses,
    myclasses:studentMyClasses,tools:studentTools,
    phonics:studentPhonics,coach:studentCoach,results:studentResults,nishoot:studentNishoot,games:studentGames,
    phrasal:studentPhrasal,collocations:studentCollocations,idioms:studentIdioms,wordform:studentWordform,dict:studentDict,
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
      <div class="card-ico" style="font-size:3.4rem;line-height:1">${cardIcon(emoji,title,84)}</div>
      <h2 style="margin:10px 0 2px;color:var(--blue-d)">${title}</h2>
      <div class="muted" style="font-size:.85rem">${desc}</div>
    </a>`;
}
function _soonCard(emoji,title,desc){
  return `<div class="card center" style="padding:30px 18px;margin-bottom:0;opacity:.75">
      <div class="card-ico" style="font-size:3.4rem;line-height:1">${cardIcon(emoji,title,84)}</div>
      <h2 style="margin:10px 0 2px;color:var(--blue-d)">${title}</h2>
      <div class="muted" style="font-size:.85rem">${desc}</div>
      <div class="badge" style="background:var(--lila);color:var(--blue-dd);margin-top:10px">Coming soon</div>
    </div>`;
}
function studentMocks(){
  // El alumno ya no tiene vista de mocks: el dia del mock su portada es el
  // mock (mock mode); los demas dias no hay nada que enseñarle aqui.
  if(_isStudent()){ studentHub(); return; }
  _setNav('mocks');
  $('#main').innerHTML=`<h1>🎓 Cambridge Mocks</h1>
    <p class="muted" style="margin-top:-6px">MOCK 1 and MOCK 2 in official Cambridge format (A2 · B1 · B2 · C1). You go straight in with your session — no need to enter your details again. Your result is saved only in My Progress.</p>
    <div class="grid cols-2" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','KET/PET/FCE/CAE-style texts and tasks with a timer.',_withBack(QUIZ_URL+'reading-quiz.html?branch=mocks','mocks'))}
      ${_skillCard('🎧','Listening','Real audio in Cambridge format, with a timer.',_withBack(QUIZ_URL+'listening-quiz.html?branch=mocks','mocks'))}
      ${_skillCard('✍️','Writing','Part 1 compulsory + Part 2 of your choice. Graded by your teacher. B1 · B2 · C1 only.',_withBack(QUIZ_URL+'writing-quiz.html?branch=mocks','mocks'))}
      ${_soonCard('🗣️','Speaking','Cambridge-style interview with an examiner.')}
    </div>`;
}

/* ---------- Practice Tests: siempre disponibles (sin QR, sin re-registro) ---------- */
function studentPractice(){
  _setNav('practice');
  // Desde el menu se llega aqui sin pasar por la tarjeta de English, que es
  // la que ponia el candado: se comprueba el mismo nodo (english.practice).
  if(_isStudent() && !nodeVisible(CAMBRIDGE_PRACTICE_NODE)){ _lockedView('', '🎯 Practice Tests'); return; }
  $('#main').innerHTML=`<h1>🎯 Practice Tests</h1>
    <p class="muted" style="margin-top:-6px">Practice tests 1, 2 and 3 in authentic Cambridge format — always available. You go straight in with your session and your result is saved only in My Progress.</p>
    <div class="grid cols-3" style="margin-top:12px">
      ${_skillCard('📖','Reading & Use of English','Practice 1 · 2 · 3 with automatic marking and CEFR feedback.',_withBack(QUIZ_URL+'reading-quiz.html?branch=practice','practice'))}
      ${_skillCard('🎧','Listening','Practice with real audio and automatic marking.',_withBack(QUIZ_URL+'listening-quiz.html?branch=practice','practice'))}
      ${_skillCard('✍️','Writing','Writing tasks your teacher grades with a rubric.',_withBack(QUIZ_URL+'writing-quiz.html?branch=practice','practice'))}
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
  const back = _isStudent() ? _backBtn("window._nav('home')",'Home') : '';
  $('#main').innerHTML=`${back}<h1>📚 Library</h1><p class="muted">Loading…</p>`;
  await loadReaderAssignments();
  const cat=_RDR_IDS.map(id=>{ const m=READER_META[id], c=READER_CARDS[id];
    const mine=!_isStudent() || readerBooksFor('g'+((state.profile&&state.profile.grade_id)||0)).indexOf(id)>=0;
    return `<div class="card" style="text-align:left;padding:20px 18px;${mine?'':'opacity:.6'}">
      <div style="font-size:2.6rem;line-height:1">${m.icon}</div>
      <h2 style="margin:8px 0 2px;color:var(--blue-d)">${esc(m.title)}</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:8px">${esc(c[2].split('—')[0].trim())} · ${m.chapters} chapters · A2–C2</div>
      ${mine?`<a class="btn sm" style="text-decoration:none" href="${_withBack(c[3],'library')}">Open the reader →</a>`
            :'<span class="muted" style="font-size:.8rem">Not assigned to your class this year.</span>'}
    </div>`; }).join('');
  const panel = staff ? await _assignPanel() : '';
  $('#main').innerHTML=`${back}<h1>📚 Library</h1>
    <p class="muted" style="margin-top:-6px">The school readers${staff?' — and what each class is reading this year':''}.</p>
    <h2 style="font-size:16px;color:var(--blue-d);margin:16px 0 10px">📖 Readers</h2>
    <div class="grid cols-3">${cat}</div>
    ${panel}
    <h2 style="font-size:16px;color:var(--blue-d);margin:22px 0 10px">🔎 Catalogue (OPAC)</h2>
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
    <td><b>${esc(r.name)}${r.sec?' · '+esc(r.sec):''}</b> <span class="muted" style="font-size:.8rem">${r.n} students</span></td>
    ${RDR_TERMS.map(t=>{ const cur=libro(r.gid,r.sec,t);
      return `<td style="text-align:center"><select onchange="window._assignTerm(${r.gid},'${esc(r.sec)}',${t},this.value)"
        style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px;max-width:200px">
        <option value="">— not assigned —</option>
        ${_RDR_IDS.map(id=>`<option value="${id}" ${cur===id?'selected':''}>${READER_META[id].icon} ${esc(READER_META[id].short)}</option>`).join('')}
      </select></td>`; }).join('')}
  </tr>`).join('');
  return `<h2 style="font-size:16px;color:var(--blue-d);margin:22px 0 8px">🗂️ What each class is reading — ${SCHOOL_YEAR_NOW} school year</h2>
    <p class="muted" style="margin:0 0 10px;font-size:.85rem"><b>One book per term</b>: choosing another one replaces the current choice. It is chosen again every year — ${SCHOOL_YEAR_NOW} does not carry over to ${SCHOOL_YEAR_NOW+1}, because each grade will have different students. The student only sees, under <b>Classes → Readers</b>, the books marked here for their class, and <b>📖 Chapter controls</b> reads from this same table to know which book is due each term.</p>
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Class</th>${RDR_TERMS.map(t=>`<th style="text-align:center">${_rdrTermLab(t)}</th>`).join('')}</tr></thead>
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
  }catch(e){ alert('Could not save the assignment: '+(e.message||e)); }
};

/* Fase 2 WP-B: «My classes» de la barra nueva. Al alumno se le lleva DIRECTO
   a su grado — no tiene por que elegir etapa para encontrar su propio salon.
   Sin grado (o para profesor/admin, que trabajan con varios) se deja el
   selector de siempre (studentClasses → studentStage → studentGrade). */
function studentMyClasses(){
  const p = state.profile || {};
  if(_isStudent() && p.grade_id!=null) return studentGrade('g'+p.grade_id);
  return studentClasses();
}
/* ---------- Classes: DOS etapas (Primary 2.º–5.º · Secondary 6.º–11.º) ----------
   El alumno entra por su etapa y dentro están las tarjetas por grado. Las
   tarjetas de etapa no llevan nodo propio: el candado sigue siendo por grado
   (y english.classes gatea la sección entera, como siempre). */
function studentClasses(){
  // Al alumno solo se llega aqui sin grado asignado (myclasses cae directo en
  // su studentGrade); si llega, el «atrás» es Home, no la vieja English.
  _setNav(_isStudent() ? 'myclasses' : 'classes');
  const back = _isStudent() ? _backBtn("window._nav('home')",'Home') : '';
  const cards = ['early','primary','secondary'].map(st=>{
    const m=STAGE_META[st];
    return _hubCard(m.emoji,m.title,m.desc,"window._nav('classes_"+st+"')");
  }).join('');
  $('#main').innerHTML=`${back}<h1>🏫 Classes</h1>
    <p class="muted" style="margin-top:-6px">Class material by stage and grade.</p>
    <div class="grid cols-2" style="margin-top:12px">${cards}</div>`;
}
/* Una etapa: sus tarjetas por grado. */
function studentStage(stage){
  _setNav(_isStudent() ? 'myclasses' : 'classes');
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
async function _pintaYle(cajaId='yle-card', route='classes_primary'){
  const caja = document.getElementById(cajaId);
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
  const botones = niveles.map(n => `<a href="${_withBack('nis-fun/engine/?level='+n,route)}"
      target="_blank" rel="noopener" class="btn"
      style="background:${_YLE_BOT[n].c};color:#fff;text-decoration:none">${_YLE_BOT[n].t}</a>`).join('');
  caja.innerHTML = `<div class="card" style="margin-top:16px;border-top:5px solid #3b6fb5">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">🧸 Fun for Nordic — Cambridge YLE</h2>
      <div class="muted" style="font-size:.9rem;margin-bottom:12px">Interactive course to get ready for the Cambridge Young Learners exams: units with audio, crosswords and exam tasks — with Pip, Luna and Kili!</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${botones}</div>
      ${niveles.map(rango).join('')}
      <div class="muted" style="font-size:.85rem;margin:14px 0 6px">📚 Your books to print:</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${
        niveles.map(n => funLibros(n, 'en', false)).join('')
      }</div>
    </div>`;
}

/* La tarjeta de Nordic Ascent: los cursos de secundaria que le tocan al
   grado (SEC_COURSES, con A1 Foundations delante — desde WP-B no habia por
   donde abrirlo). Sin candado propio, como siempre: el motor gatea con
   fun_access y levels.json. 9.º suma la practica B2 First por destreza, que
   antes ocupaba la puerta entera y dejaba los cursos fuera. */
function _secSerieCardHTML(route, compact){
  const p = state.profile || {}, g = Number(p.grade_id);
  const key = 'g'+g, cursos = secCoursesFor(key);
  if(!cursos.length) return '';
  const botones = cursos.map(lv => { const c = SEC_CURSOS[lv]; return `<a href="${_withBack('nis-fun/engine/?level='+lv, route)}"
      target="_blank" rel="noopener" class="btn${compact?' sm':''}"
      style="background:${c.color};color:#fff;text-decoration:none">${c.em} ${esc(c.curso)}</a>`; }).join('');
  const skills = (key==='g9' && nodeVisible('english.classes.g9') && nodeVisible('english.classes.g9.cambridge'))
    ? `<a href="javascript:void(0)" class="btn${compact?' sm':''} ghost" onclick="window._nav('classes_g9_cambridge')">🎯 B2 First by skill</a>` : '';
  if(compact) return `<div class="card center" style="padding:28px 16px;margin-bottom:0">
      <div style="font-size:3rem;line-height:1">${SEC_SERIE.em}</div>
      <h2 style="margin:10px 0 4px;color:var(--blue-d)">Course</h2>
      <div class="muted" style="font-size:.85rem;margin-bottom:12px">${esc(SEC_SERIE.nombre)}: your Cambridge course, unit by unit.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">${botones}${skills}</div>
    </div>`;
  return `<div class="card" style="margin-top:16px;border-top:5px solid ${SEC_SERIE.color}">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">${SEC_SERIE.em} ${esc(SEC_SERIE.nombre)} — ${esc(SEC_SERIE.sub)}</h2>
      <div class="muted" style="font-size:.9rem;margin-bottom:12px">Your Cambridge course, unit by unit: dialogues, audio, exam tasks and a Grammar Lab for each level. A1 Foundations is the grammar to start with if you are not ready for A2 Key yet.</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${botones}${skills}</div>
    </div>`;
}
/* La tarjeta de la serie del alumno en Home: Fun for Nordic si es de
   primaria, Nordic Ascent si es de secundaria — nunca las dos. */
function _pintaSerie(cajaId, route){
  const caja = document.getElementById(cajaId);
  const p = state.profile || {}, g = Number(p.grade_id);
  if(!caja || !p.grade_id) return;
  if(g <= 5) return _pintaYle(cajaId, route);
  caja.innerHTML = _secSerieCardHTML(route, false);
}

/* ---------- My Progress: historial completo del alumno (mocks, practice y actividades) ---------- */
async function studentResults(){
  // Fase 2 WP-B: My Progress es ahora de primer nivel (peer de Home), sin
  // «atrás» — igual que Cambridge, Mocks o Practice Tests.
  _setNav('results');
  const p=state.profile;
  const back = '';
  if(!p.id) return _previewNeedsStudent('📊 My Progress', back);
  $('#main').innerHTML=`${back}<h1>📊 My Progress</h1><p class="muted">Loading…</p>`;
  const { data:attsRaw } = await sb.from('exam_attempts').select('*').eq('student_id',p.id).order('submitted_at',{ascending:false});
  const atts = await mockVisibleAttempts(attsRaw||[], p.id);   // nada del Official Mock 2 hasta que se libere o se le envíe su informe
  const bySkill = SKILLS.map(sk=>{
    const a=(atts||[]).filter(x=>x.skill===sk);
    const scored=a.filter(x=>x.percent!=null);              // Writing is not auto-scored
    const best=scored.length?Math.max(...scored.map(x=>+x.percent)):null;
    const avg=scored.length?Math.round(scored.reduce((s,x)=>s+(+x.percent),0)/scored.length):null;
    return {sk,n:a.length,best,avg};
  });
  const histTable=(list)=> list.length ? `<table><thead><tr><th>Exam</th><th>Score</th><th>Date</th></tr></thead><tbody>${
      list.map(a=>{
        const lbl=`${esc(a.skill)} · ${esc(a.level)} · ${mockLabel(a)}`;
        const score = a.percent!=null ? `${a.score}/${a.total} (${a.percent}%)`
          : (a.skill==='Writing' ? '<span class="muted">Pending grading</span>' : '—');
        const msg = (a.breakdown&&a.breakdown.teacherMessage)
          ? `<tr><td colspan="3" style="background:#f7faff;font-size:.9rem">📣 <b>Teacher:</b> ${esc(a.breakdown.teacherMessage)}</td></tr>` : '';
        return `<tr><td>${lbl}</td><td>${score}</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td></tr>${msg}`;
      }).join('')
    }</tbody></table>` : `<p class="muted">No attempts here yet.</p>`;
  const all=atts||[];
  const mocks=all.filter(isMockAttempt), practice=all.filter(a=>!isMockAttempt(a));
  const { data:acts } = await sb.from('activity_attempts').select('*').eq('student_id',p.id).order('submitted_at',{ascending:false});
  const fmtT=(s)=>{ s=s||0; return Math.floor(s/60)+'m '+String(s%60).padStart(2,'0')+'s'; };
  // Sus respuestas, ítem a ítem (activities-panel.js pinta el detalle; el
  // mismo que ve el profesor en Seguimiento › Actividades).
  const detalle=(a)=>{ const f=window.activitiesPanel&&window.activitiesPanel.detailHTML; return f?f(a):''; };
  const actTable=(list)=> list.length ? `<table><thead><tr><th>Activity</th><th>Level</th><th>Result</th><th>⏱ Time</th><th>💡 Hints</th><th>Date</th><th></th></tr></thead><tbody>${
      list.map(a=>{ const d=detalle(a); return `<tr><td>${a.activity==='crossword'?'🔎':'🔍'} ${esc(a.title||(a.activity==='crossword'?'Crossword':'Word Search'))}</td><td>${esc(a.level)}</td><td>${a.score!=null?`${a.score}/${a.total}`:'—'}</td><td>${fmtT(a.duration_sec)}</td><td>${a.hints_used||0}</td><td class="muted">${new Date(a.submitted_at).toLocaleDateString()}</td><td>${d?`<button class="btn sm ghost" onclick="const r=this.closest('tr').nextElementSibling; r.hidden=!r.hidden; this.textContent=r.hidden?'▾ My answers':'▴ Hide'">▾ My answers</button>`:''}</td></tr>${d?`<tr hidden><td colspan="7" style="background:#f8fafc;padding:10px 14px">${d}</td></tr>`:''}`; }).join('')
    }</tbody></table>` : `<p class="muted">You haven’t completed any activities yet. Go to <b>Classes → Activities</b>.</p>`;
  $('#main').innerHTML=`${back}<h1>📊 My Progress</h1>
    <p class="muted" style="margin-top:-6px">${esc(p.grades?.name||'')} ${p.section?'· '+esc(p.section):''} · Level ${esc(p.cefr_level||'not assigned')}</p>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <div><h2 style="margin:0 0 2px">🏅 Final result · CEFR</h2>
        <div class="muted" style="font-size:.85rem">Your final level, combining your best result per skill — the report your family receives, plus its PDF.</div></div>
      <button class="btn sm" onclick="window._nav('final')">View</button>
    </div>
    <div class="grid cols-3">
      ${bySkill.map(s=>`<div class="stat"><div class="l">${s.sk}</div>
        <div class="n">${s.best!=null?s.best+'%':'—'}</div>
        <div class="muted" style="font-size:.8rem">${s.n} attempt(s)${s.avg!=null?' · avg '+s.avg+'%':''}</div></div>`).join('')}
    </div>
    <div class="card"><h2>Projection</h2>${projection(p,bySkill,all)}</div>
    <div class="card"><h2>📝 Mocks (${mocks.length})</h2>${histTable(mocks)}</div>
    <div class="card"><h2>🎯 Practice Tests (${practice.length})</h2>${histTable(practice)}</div>
    <div class="card"><h2>🎲 Activities (${(acts||[]).length})</h2>${actTable(acts||[])}</div>
    ${all.length?'':'<div class="note info">You haven’t taken any exams yet. Start with <b>Practice Tests</b> or <b>Cambridge Mocks</b>.</div>'}`;
}
function projection(p,bySkill,atts){
  const done=bySkill.filter(s=>s.avg!=null);
  if(!done.length) return `<p class="muted">Take at least one exam to see your projection toward ${esc(p.cefr_level||'your level')}.</p>`;
  const overall=Math.round(done.reduce((s,x)=>s+x.avg,0)/done.length);
  const lvl=p.cefr_level||'B1';
  let verdict, cls;
  if(overall>=80){verdict=`You are on track for a <b>high pass</b> in ${lvl}. Ready to take on the next level.`;cls='ok';}
  else if(overall>=60){verdict=`You are at <b>pass level</b> for ${lvl} (≈60% is the Cambridge standard). Keep consolidating.`;cls='ok';}
  else if(overall>=40){verdict=`You are <b>approaching</b> ${lvl}. Focus on the lowest skills above.`;cls='info';}
  else {verdict=`Still <b>below</b> ${lvl}. More practice is recommended before the official exam.`;cls='err';}
  const weak=[...done].sort((a,b)=>a.avg-b.avg)[0];
  // December official-test roadmap: Mock 1 → Mock 2 → Examen oficial
  const hasM1=(atts||[]).some(a=>isMockAttempt(a)&&mockCycleOf(a)===1);   // ciclos del colegio, no bancos del motor
  const hasM2=(atts||[]).some(a=>mockCycleOf(a)===2);
  const steps=[
    {k:'m1',label:'Mock 1',done:hasM1},
    {k:'m2',label:'Mock 2',done:hasM2},
    {k:'off',label:'Official exam · December',done:false}
  ];
  const roadmap=`<div class="row" style="gap:8px;flex-wrap:wrap;margin:12px 0 4px">${steps.map((s,i)=>`
    <span class="badge ${s.done?'on':(i===steps.findIndex(x=>!x.done)?'':'off')}" style="${(!s.done&&i===steps.findIndex(x=>!x.done))?'background:var(--blue);color:#fff':''}">${s.done?'✓ ':(i===steps.findIndex(x=>!x.done)?'▶ ':'')}${s.label}</span>${i<steps.length-1?'<span class="muted">→</span>':''}`).join('')}</div>`;
  const nextMsg = !hasM1 ? 'Your next step is to take <b>Mock 1</b>.'
    : !hasM2 ? 'Take your <b>Mock 2</b> to confirm your progress before the official exam in December.'
    : (overall>=60 ? 'You are on track for the <b>official exam in December</b>. Keep practising to secure your result!'
                   : 'Strengthen your lowest skills before the <b>official exam in December</b>.');
  return `<div class="proj"><div style="font-size:1.1rem;margin-bottom:6px">Overall average: <b>${overall}%</b></div>
    <div class="note ${cls}" style="margin:8px 0">${verdict}</div>
    <div class="muted">Skill to strengthen: <b>${weak.sk}</b> (${weak.avg}%).</div>
    ${roadmap}
    <div class="note info" style="margin-top:8px">📅 ${nextMsg}</div></div>`;
}