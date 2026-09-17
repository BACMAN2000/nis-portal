
/* La ayuda es UNA sola pagina (ayuda.html) y se embebe aqui con el rol ya
   resuelto, para que se abra por la pestaña que le toca a quien mira. Que sea
   la misma pagina que se imprime es lo que evita que la ayuda en pantalla y el
   manual en papel se separen con el tiempo. */
function ayudaBody(){
  const r = (state.profile||{}).role || 'student';
  return `<h1>❓ Help</h1>
    <p class="muted" style="margin-top:-6px">Where everything is and how to do it. You can switch guides
      with the pills above, and search for what you want to do.</p>
    <iframe src="ayuda.html?role=${encodeURIComponent(r)}" title="NIS Portal help"
      style="width:100%;height:80vh;min-height:560px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>
    <p class="muted" style="font-size:.82rem;margin-top:10px">Prefer to have it separately?
      <a href="ayuda.html" target="_blank" rel="noopener">Open help in another tab</a>.</p>`;
}
/* El ❓ de la cabecera lleva a la pestaña de ayuda del panel que corresponda.
   En "Ver como alumno" el perfil es el del alumno, asi que se abre la guia del
   alumno: que es lo que se quiere ver desde ahi. */
window._irAyuda = function(){
  const r = (state.profile||{}).role;
  if(r==='admin')   return renderAdmin('help');
  if(r==='teacher') return renderTeacher('help');
  return window._nav('help');
};
function munBody(){ return `<iframe src="mun-academy.html" title="MUN Academy" style="width:100%;height:82vh;min-height:560px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`; }
function liveQuizBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Host a live Kahoot-style game. Project this screen; students join with the PIN or the QR code from their phone.</div>
    <a class="btn" href="live-quiz.html?v=e1afdde7" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="live-quiz.html?v=e1afdde7" title="NIShoot Live" allow="autoplay" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#0d1d33"></iframe>`; }
function gamesLabBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Worksheets + games for grammar, vocabulary, phrasal verbs and idioms (A1–C1). Open any topic to play: quiz, gap-fill, matching, crossword, word search, word invaders and time attack.</div>
    <a class="btn" href="games-lab.html?v=be904e03" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="games-lab.html?v=be904e03" title="English Games Lab" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef1f8"></iframe>`; }
/* 📝 Pizarra — hoja de cuaderno proyectable (triple renglón, doble raya,
   rayado, cuadriculado o en blanco) donde el profesor escribe la muestra que
   los alumnos copian. Vive en pizarra.html, sin sesión: lo que se escribe se
   guarda en el navegador del profesor, no en la cuenta de nadie. */
function pizarraBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Write like in the student’s notebook and project it: triple-line paper, double line, ruled, squared or blank; several school fonts, size, colours, images and freehand drawing. What is written stays saved in this browser.</div>
    <a class="btn" href="pizarra.html?v=fa11109c" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="pizarra.html?v=fa11109c" title="Whiteboard" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#2b2f3a"></iframe>`; }
/* ✍️ Corrector de material — revisa la ficha ANTES de publicarla: ortografía,
   mezcla de inglés británico y americano, y los calcos del hispanohablante
   ("explain me", "discuss about", "I have 12 years") que ningún corrector
   normal marca, porque son palabras bien escritas. Vive en corrector.html y
   trabaja entero en el navegador contra el léxico propio: lo que el profesor
   escribe no se manda a ningún sitio. */
function correctorBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Paste a worksheet, an exam or a worksheet and check it before publishing it. It is reviewed in your browser: the text never leaves this screen.</div>
    <a class="btn" href="corrector.html?v=430c3731" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="corrector.html?v=430c3731" title="Material checker" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#f2f3ff"></iframe>`; }
/* 🧩 Use of English — la app B2 (First, Part 1: multiple-choice cloze). Es la
   misma que ve el alumno en Classes > 9.º > Cambridge; aqui el admin la revisa.
   Se corrige sola en el navegador y no guarda intentos en Supabase. */
function useOfEnglishBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Multiple-choice cloze for <b>B2 First</b> (Reading &amp; Use of English, Part 1): texts with 8 gaps and options A–D, with marking and an explanation for each answer. It marks itself in the browser and <b>does not</b> save attempts, so it does not appear in 📝 Results.</div>
    <a class="btn" href="use-of-english-part1.html" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="use-of-english-part1.html" title="Use of English · Part 1" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>`; }
/* 📘 Info Cambridge — ficha de los examenes (papers, tiempos, escala) y que grado
   del NIS apunta a cual, con el enlace a la app del portal que le toca. */
function cambridgeInfoBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">What each Cambridge exam is, how many parts it has, how long it lasts, how it is scored on the Cambridge Scale, and which NIS grade is aiming for which.</div>
    <a class="btn" href="cambridge-info.html?v=400b8190" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="cambridge-info.html?v=400b8190" title="Cambridge info" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>`; }
/* 🎶 Rhymes & chants — rimas tradicionales de patio (dominio publico), las
   primeras 100 palabras y frases de uso diario, para los profesores de
   primaria. Datos en nis-fun/songs/tradicionales.json, etiquetados con la
   lista YLE; la pagina es rhymes.html, embebida igual que Info Cambridge. */
function rhymesBody(){ return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">Traditional playground rhymes, counting-out and clapping chants, the first 100 words and everyday phrases for G1–G5, tagged with the YLE wordlist. Filter, search and print.</div>
    <a class="btn" href="rhymes.html?v=23b73cb1" target="_blank" rel="noopener" style="text-decoration:none">🖥️ Open in full screen ↗</a>
  </div>
  <iframe src="rhymes.html?v=23b73cb1" title="Rhymes & chants" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#eef3f9"></iframe>`; }
/* Los tres cursos de Fun for Nordic (YLE). El motor es UNO solo — nis-fun/engine —
   y el nivel va en la URL; aqui se embebe igual que Games Lab o Phonics para que
   el profesor lo vea sin salir del portal. Datos de nis-fun/content/levels.json. */
const FUN_CURSOS = {
  starters:{em:'🐧',curso:'Fun for Nordic 1',examen:'Pre A1 Starters',unidades:45,color:'#d97d0d',grados:'G1 · G2',cast:'The Lighthouse Explorers'},
  movers:  {em:'🐺',curso:'Fun for Nordic 2',examen:'A1 Movers',      unidades:50,color:'#2f9268',grados:'G3 · G4',cast:'The Fjord Club'},
  flyers:  {em:'🦅',curso:'Fun for Nordic 3',examen:'A2 Flyers',      unidades:55,color:'#3b6fb5',grados:'G5',     cast:'The Aurora Expedition'},
};
/* La serie de secundaria (17-sep-2026): NORDIC ASCENT — la subida por la
   escalera Cambridge de A1 a C1. Mismo motor (nis-fun/engine, ?level=) y
   mismas puertas que Fun for Nordic, pero en SU tarjeta: Paolo pidio que
   primaria (Fun for Nordic) y secundaria fueran tarjetas distintas y que los
   cinco cursos se encontraran desde el menu, cosa que no pasaba. El nombre
   vive solo aqui: cambiarlo es una linea. Datos de nis-fun/content/levels.json
   (unidades = content/<id>/index.json; temas = content/<id>/grammar). */
const SEC_SERIE = {em:'🧗', nombre:'Nordic Ascent', sub:'Cambridge for Schools · A1 → C1', color:'#6d5bd0'};
const SEC_CURSOS = {
  a1: {em:'🌱',curso:'A1 Foundations', examen:'the grammar before A2 Key',   unidades:'12 grammar topics',            color:'#db2777',grados:'G6 – G11'},
  ket:{em:'🔑',curso:'A2 Key',         examen:'A2 Key for Schools',          unidades:'6 units + 24 grammar topics',  color:'#6d5bd0',grados:'G6 – G11'},
  pet:{em:'🧭',curso:'B1 Preliminary', examen:'B1 Preliminary for Schools',  unidades:'12 units + 24 grammar topics', color:'#0e7490',grados:'G6 – G11'},
  b2f:{em:'🥇',curso:'B2 First',       examen:'B2 First for Schools',        unidades:'6 units + 24 grammar topics',  color:'#a3324e',grados:'G8 – G11'},
  c1a:{em:'🏔️',curso:'C1 Advanced',    examen:'C1 Advanced for Schools',     unidades:'6 units + 24 grammar topics',  color:'#334155',grados:'G9 – G11'},
};
const SEC_ORDEN = ['a1','ket','pet','b2f','c1a'];
/* Las pestanas por curso (funstarters, funket…) ya no van en el menu: se
   entra por la tarjeta de su serie, y el menu resalta la serie. */
function _serieNavKey(t){
  if(/^fun(starters|movers|flyers)$/.test(t)) return 'funyle';
  if(/^fun(a1|ket|pet|b2f|c1a)$/.test(t)) return 'funsec';
  return t;
}
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
          <option value="">— no course —</option>
          ${FUN_NIVELES.map(n => `<option value="${n}"${n === nivel ? ' selected' : ''}>${esc(nombre(n))} (${totales[n] || 0})</option>`).join('')}
        </select></td>
        <td style="white-space:nowrap">
          <input class="fa-desde" type="number" min="1" value="${desde}" style="width:4.5rem">
          <span class="muted">to</span>
          <input class="fa-hasta" type="number" min="1" value="${hasta}" style="width:4.5rem">
        </td>
        <td style="white-space:nowrap"><span class="badge ${f && on ? 'on' : 'off'}">${!f ? '— no rule —' : (on ? '🔓 Open' : '🔒 Closed')}</span></td>
        <td class="acts"><div class="acts-wrap">
          <button class="btn sm" onclick="window._funAccessGuardar(this)">Save</button>
          ${f ? `<button class="btn sm ghost" onclick="window._funAccessQuitar(this)">Remove</button>` : ''}
        </div></td></tr>`;
    }).join('');
    return `<div class="card" style="padding:0;overflow-x:auto">
      <div style="padding:14px 16px 0"><h2 style="margin:0">${lang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}</h2>
        <p class="muted" style="font-size:.86rem;margin:4px 0 10px">${abierto
          ? 'No rules yet: <b>all grades see the three full levels</b>. As soon as you save a row, only what is written here will be shown.'
          : 'Only what is written here is shown. A grade with no row <b>sees nothing</b> of this language.'}</p></div>
      <table><thead><tr><th>Grade</th><th>Level</th><th>Units</th><th>Status</th><th></th></tr></thead>
      <tbody>${cuerpo}</tbody></table></div>`;
  };

  $('#main').innerHTML = `<h1>🔐 Units by grade — Fun for Nordic</h1>
    <div class="note">Which part of the course each grade can open. Units outside the range
      <b>still appear</b> to the student, with a lock: this way they see how far they will get, but cannot get ahead.
      It is the same as what <b>📚 Activate units</b> does with classes.</div>
    <div class="card">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">The split the school asked for</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">
        Grade 1 and Grade 2 do <b>Starters</b>, Grade 3 and Grade 4 <b>Movers</b>, Grade 5 <b>Flyers</b>.
        The 45 Starters units are split between Grade 1 and Grade 2, and the 50 Movers units between Grade 3 and Grade 4.
        <b>Grade 6 is left out</b> until it is decided whether it joins Flyers.
        This does not apply itself: check the ranges and click the button.</div>
      <button class="btn" onclick="window._funAccessReparto('en')">Apply to English</button>
      <button class="btn" onclick="window._funAccessReparto('fr')">Apply to Français</button>
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
  if (!f.level) { alert('Choose a level, or click Remove to leave the grade without a course.'); return; }
  if (!(f.desde >= 1) || !(f.hasta >= f.desde)) { alert('The range does not add up: «to» must be greater than or equal to «from».'); return; }
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
  if (error) { alert('Could not save: ' + error.message); return; }
  funAccessPanel(state.profile && state.profile.role === 'admin' ? GRADES : teacherAllowedGrades());
};

window._funAccessQuitar = async (btn) => {
  const f = _funAccessFila(btn);
  if (!await NISUI.pregunta('With no row, that grade sees nothing of this language.', {titulo:'Remove access?', si:'Remove', no:'Cancel', tono:'mal', peligro:true})) return;
  btn.disabled = true;
  const { error } = await sb.from('fun_access').delete().eq('grade_id', f.grade_id).eq('lang', f.lang);
  btn.disabled = false;
  if (error) { alert('Could not remove: ' + error.message); return; }
  funAccessPanel(state.profile && state.profile.role === 'admin' ? GRADES : teacherAllowedGrades());
};

window._funAccessReparto = async (lang) => {
  const totales = await funTotales(lang);
  const lineas = Object.entries(FUN_REPARTO)
    .filter(([g, n]) => (totales[n] || 0) > 0)
    .map(([g, n]) => `G${g} → ${lang === 'fr' ? FUN_FR[n].curso : FUN_CURSOS[n].curso} (1–${totales[n]})`);
  if (!lineas.length) { alert('That language does not have any units yet.'); return; }
  if (!await NISUI.pregunta('The whole level will be written for each grade. The ranges can be adjusted by hand afterwards.', {titulo:'Apply the split?', si:'Write', no:'Cancel', detalle: lineas.join('\n')})) return;
  const ahora = new Date().toISOString();
  const uid = (state.session && state.session.user && state.session.user.id) || null;
  const filas = Object.entries(FUN_REPARTO)
    .filter(([g, n]) => (totales[n] || 0) > 0)
    .map(([g, n]) => ({ grade_id: Number(g), lang, level: n, desde: 1, hasta: totales[n],
                        unlocked: true, updated_at: ahora, updated_by: uid }));
  const { error } = await sb.from('fun_access').upsert(filas, { onConflict: 'grade_id,lang,level' });
  if (error) { alert('Could not apply: ' + error.message); return; }
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
  const sec = !!SEC_CURSOS[nivel];
  const c = FUN_CURSOS[nivel] || SEC_CURSOS[nivel] || FUN_CURSOS.starters;
  const url = `nis-fun/engine/?level=${nivel}`;
  // Secundaria no tiene libros PDF: la fila «To print» solo es de primaria.
  const resumen = sec
    ? `<b>${SEC_SERIE.em} ${SEC_SERIE.nombre} · ${c.curso}</b> — ${c.unidades} with audio, dialogues and exam tasks to prepare for <b>${c.examen}</b> (${c.grados}). It is the same course the student opens; what they write and record appears in <b>✅ Marking → 🧸 Fun for Nordic</b>.`
    : `<b>${c.curso}</b> — ${c.unidades} units with audio, games and exam tasks to prepare for <b>${c.examen}</b> (${c.grados} · ${c.cast}). It is the same course the student opens; what they write and record appears in <b>✅ Marking → 🧸 Fun for Nordic</b>.`;
  return `
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px">
    <div class="muted" style="flex:1;min-width:220px">${resumen}</div>
    <a class="btn" href="${url}" target="_blank" rel="noopener" style="background:${c.color};text-decoration:none">${c.em} Open in full screen ↗</a>
  </div>
  ${sec ? '' : `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
    <span class="muted" style="font-size:.85rem">To print:</span>${funLibros(nivel, 'en', true)}
  </div>`}
  <iframe src="${url}" title="${esc(c.curso)}" style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block;background:#fff"></iframe>`;
}
/* 🧗 Nordic Ascent para profesor y admin: la tarjeta de cada curso de
   secundaria, gemela de funYleBody. Cada tarjeta abre el curso embebido
   (funCursoBody), igual que Starters/Movers/Flyers. */
function funSecBody(render){
  const tarjeta = lv => {
    const c = SEC_CURSOS[lv];
    return _hubCard(c.em, c.curso, `${c.examen}<br>${c.unidades} · ${c.grados}`, `${render}('fun${lv}')`);
  };
  return `<h1>${SEC_SERIE.em} ${SEC_SERIE.nombre} — Cambridge for Schools (Secondary)</h1>
    <p class="muted" style="margin-top:-6px">The climb up the Cambridge ladder for 6.º–11.º: A1 Foundations
      (the grammar before the first exam), then A2 Key, B1 Preliminary, B2 First and C1 Advanced. Units with
      dialogues, audio and exam tasks, and a Grammar Lab of 24 topics per level. The format of each exam is in
      <b>📘 Cambridge info</b>. Primary has its own series: <b>🧸 Fun for Nordic</b>.</p>
    <div class="grid cols-3">${SEC_ORDEN.map(tarjeta).join('')}</div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">✅ Mark what they submit</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">What students write and record in the
        five levels, to give them a grade and feedback. It is the same tab found in <b>✅ Marking</b>.</div>
      <button class="btn" onclick="${render}('funnordic')">🧸 View submissions</button>
    </div>`;
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
  return `<h1>🧸 Fun for Nordic — Cambridge Young Learners (Primary)</h1>
    <p class="muted" style="margin-top:-6px">The first three steps of the Cambridge ladder for 1.º–5.º:
      Pre A1 Starters, A1 Movers and A2 Flyers. 150 units with audio, games and exam tasks.
      The format of each exam is in <b>📘 Cambridge info</b>. Secondary has its own series:
      <b>${SEC_SERIE.em} ${SEC_SERIE.nombre}</b>.</p>
    <div class="grid cols-3">
      ${tarjeta('starters','funstarters')}${tarjeta('movers','funmovers')}${tarjeta('flyers','funflyers')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">📚 The PDF books</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">The student’s book, the homework workbook
        and the answer key for each level. They come from the same content as the on-screen course, so they say
        exactly the same thing.</div>
      ${['starters','movers','flyers'].map(n => `<div style="margin-bottom:14px">
        <div style="font-weight:600;margin-bottom:6px;color:${FUN_CURSOS[n].color}">${FUN_CURSOS[n].em} ${FUN_CURSOS[n].curso}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${funLibros(n, 'en', true)}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">✅ Mark what they submit</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">What students write and
        record in the three levels, to give them a grade and feedback. It is the same tab found in
        <b>✅ Marking</b>.</div>
      <button class="btn" onclick="${render}('funnordic')">🧸 View submissions</button>
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
      Same course, same artwork and same slides as the English version, with the text and voices in French.
      What the student writes and records appears in <b>\u{1F1EB}\u{1F1F7} Cap sur le fran\u00e7ais \u2192 Metrics</b>.</div>
    <a class="btn" href="${url}" target="_blank" rel="noopener" style="background:${c.color};text-decoration:none">${c.em} Open in full screen \u2197</a>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
    <span class="muted" style="font-size:.85rem">To print:</span>${funLibros(nivel, 'fr', true)}
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
    return _hubCard(c.em, c.curso, `${c.nivel} \u00b7 ${c.grados}<br>${n} ${n===1?'unit ready':'units ready'}`,
      `${render}('${tab}')`);
  };
  const total = Object.values(idx).reduce((a,b)=>a+b,0);
  return `<h1>\u{1F1EB}\u{1F1F7} Cap sur le fran\u00e7ais</h1>
    <p class="muted" style="margin-top:-6px">The Primary course in French: the same engine, the same
      characters and the same artwork, with the text adapted and the voices recorded in French.
      Today there are <b>${total} of 150 units</b> ready; the rest appears here only once it is complete.</p>
    <div class="grid cols-3">
      ${tarjeta('starters','frstarters')}${tarjeta('movers','frmovers')}${tarjeta('flyers','frflyers')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">\u{1F4DA} The PDF books</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">The same three books for each level as in
        English, with the same layout and the same artwork. They come from the same content as the on-screen course,
        so they say exactly the same thing.</div>
      ${['starters','movers','flyers'].map(n => `<div style="margin-bottom:14px">
        <div style="font-weight:600;margin-bottom:6px;color:${FUN_FR[n].color}">${FUN_FR[n].em} ${FUN_FR[n].curso}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${funLibros(n, 'fr', true)}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 4px;color:var(--blue-d)">\u{1F4CA} How it is being used</h2>
      <div class="muted" style="font-size:.88rem;margin-bottom:12px">Students, units, activities and minutes
        of the French course, separate from English. It is what answers \u00abis this really being used?\u00bb.</div>
      <button class="btn" onclick="${render}('frmetricas')">\u{1F4CA} View metrics</button>
    </div>`;
}
/* Metricas del curso frances. Sale de v_fun_metricas y v_fun_unidades, que
   agrupan por idioma: aqui nunca se mezcla con lo que hacen en ingles. */
async function funFrMetricas(){
  $('#main').innerHTML = `<h1>\u{1F4CA} Cap sur le fran\u00e7ais \u00b7 metrics</h1><p class="muted">Loading\u2026</p>`;
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
  $('#main').innerHTML = `<h1>\u{1F4CA} Cap sur le fran\u00e7ais \u00b7 metrics</h1>
    <p class="muted" style="margin-top:-6px">Only the French course. Submissions carry the language inside them,
      so English does not enter into these numbers.</p>
    <div class="grid cols-3" style="margin-bottom:16px">
      ${kpi(totalAlumnos,'students who have opened it')}
      ${kpi(totalAct,'activities done')}
      ${kpi(totalMin+' min','time spent')}
      ${kpi(totalEsc,'written productions')}
      ${kpi(totalGrab,'voice recordings')}
      ${kpi(U.length,'units with activity')}
    </div>
    <div class="card">
      <h2 style="margin:0 0 10px">By student</h2>
      ${A.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
        <th>Student</th><th>Grade</th><th>Level</th><th>Units</th><th>Activities</th>
        <th>Written</th><th>Recordings</th><th>Minutes</th><th>Marked \u00b7 grade</th><th>Last time</th>
        </tr></thead><tbody>${filas}</tbody></table></div>`
      : `<p class="muted">There is no activity in the French course yet. It will appear here as soon as a student opens a unit.</p>`}
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 10px">By unit</h2>
      ${U.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
        <th>Level</th><th>Unit</th><th>Students</th><th>Submissions</th><th>Minutes</th>
        </tr></thead><tbody>${porUnidad}</tbody></table></div>`
      : `<p class="muted">No data by unit yet.</p>`}
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
function studentNishoot(){ _setNav('tools'); $('#main').innerHTML = `${_backBtn("window._nav('tools')",'Practice tools')}<h1>🎮 NIShoot Live</h1>${nishootJoinBody()}`; }
/* Student view: English Games Lab (self-contained practice games). */
function studentGames(){ _setNav('tools'); $('#main').innerHTML = `${_backBtn("window._nav('tools')",'Practice tools')}<h1>🎲 Games Lab</h1>${gamesLabBody()}`; }

/* Phonics Studio embedded as an iframe (same-origin app in /phonics).
   ?embed=1 tells it to hide its own top bar so it nests under the portal. */
/* Phrasal verbs: 210 verbos compuestos por nivel, con sus ejercicios. Es la
   misma app que en cohasset.pe; aqui entra embebida para no sacar al alumno
   del portal. */
/* Word formation: prefijos, sufijos y familias de palabras medidos en nuestro
   propio corpus. Misma app que en cohasset.pe, embebida para no sacar al alumno
   del portal. */
/* NIS Dictionary: el mismo diccionario del centro que en cohasset.pe. El
   nombre lo pone el dominio dentro de la propia pagina, asi que no hay dos
   copias que mantener. */
function dictPanel(){
  return `<iframe src="dictionary-app/index.html?v=4e01185e&embed=1" title="NIS Dictionary"
    style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block"></iframe>`;
}

function wordformPanel(){
  return `<iframe src="word-formation-app/index.html?v=adda0b52&embed=1" title="Word Formation"
    style="width:100%;height:82vh;min-height:600px;border:0;border-radius:12px;display:block"></iframe>`;
}

/* Collocations e idioms: las otras dos apps de vocabulario. Mismo trato que
   phrasal verbs, embebidas para no sacar al alumno del portal. */
function collocationsPanel(){
  return `<iframe src="collocations-app/index.html?v=468b9881&embed=1" title="Collocations"
    style="width:100%;height:600px;border:0;border-radius:12px;display:block"></iframe>`;
}

function idiomsPanel(){
  return `<iframe src="idioms-app/index.html?v=382d20c4&embed=1" title="Idioms"
    style="width:100%;height:600px;border:0;border-radius:12px;display:block"></iframe>`;
}

function phrasalPanel(){
  return `<iframe src="phrasal-app/index.html?v=3b7babd5&embed=1" title="Phrasal Verbs"
    style="width:100%;height:600px;border:0;border-radius:12px;display:block"></iframe>`;
}

/* Las tres apps de léxico avisan de lo que miden y el iframe se ajusta a ellas.
   Con un alto fijo pasaban las dos cosas a la vez: la app scrolleaba por dentro
   (la última tarjeta cortada) y bajo el iframe quedaba una franja vacía. */
window.addEventListener('message', function(ev){
  if(ev.origin !== location.origin) return;
  var d = ev.data;
  if(!d || typeof d !== 'object' || String(d.tipo || '').slice(0, 7) !== 'lexapp:') return;
  var marcos = document.querySelectorAll('iframe'), f = null;
  for(var i = 0; i < marcos.length; i++){ if(marcos[i].contentWindow === ev.source){ f = marcos[i]; break; } }
  if(!f) return;
  if(d.tipo === 'lexapp:alto' && d.alto > 0){ f.style.height = d.alto + 'px'; f.style.minHeight = '0'; }
  else if(d.tipo === 'lexapp:arriba'){
    var y = f.getBoundingClientRect().top + window.pageYOffset - 12;
    window.scrollTo({top: Math.max(0, y), behavior:'smooth'});
  }
});

function phonicsPanel(){
  return `<iframe src="phonics/index.html?embed=1&v=8" title="Phonics Studio"
    style="width:100%;height:calc(100vh - 120px);border:none;border-radius:14px;box-shadow:var(--shadow);background:#fff"></iframe>`;
}
/* Pronunciation Coach embedded as an iframe (same-origin app in /pronunciation-coach). */
function coachPanel(){
  return `<iframe src="pronunciation-coach/index.html?embed=1&v=2" title="Pronunciation Coach"
    style="width:100%;height:calc(100vh - 120px);border:none;border-radius:14px;box-shadow:var(--shadow);background:#fff"></iframe>`;
}