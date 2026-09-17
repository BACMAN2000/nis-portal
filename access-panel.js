/* Access panel — «Qué ve cada clase», de un solo vistazo (Fase 2).
 *
 * Los permisos del alumno viven repartidos en 9 tablas editadas desde 6 paneles
 * distintos (🔐 Access, 📚 Activate units, 📋 Study plan, 🔐 Units by grade,
 * Open Practice/Mocks, 🛡️ YLE panel, 📖 controles de lectura): un profesor no
 * puede saber en una sola pantalla «qué ve hoy 5.º B». Este panel es DE
 * LECTURA — nada se escribe aquí — y junta la foto completa por grado, con un
 * enlace «Edit in …» al panel que de verdad cambia cada cosa.
 *
 * Reglas:
 *  - Cada consulta va por su cuenta y con try/catch (como overview-panel.js):
 *    si una tabla no es legible con el acceso de quien mira, esa fila dice
 *    "not readable with your access" y el resto del panel se pinta igual.
 *  - nodeVisible() (app.js) NO sirve aquí: resuelve para QUIEN TIENE LA SESIÓN
 *    abierta (admin ve todo, profesor según sus nodos, alumno según su propio
 *    grado). Este panel resuelve el estado para UN GRADO CUALQUIERA elegido en
 *    un selector, así que la resolución de node_access se REIMPLEMENTA aquí
 *    (constantes NODE_DEFAULT_LOCKED / UNIT_PILOT copiadas de app.js
 *    ~4409-4431, 17-sep-2026 — si cambian allí, hay que traerlas aquí también).
 *  - El resto de tablas (practice_access, mock_access, fun_access, yle_access,
 *    reader_exam_access) se resuelven con la misma regla exacta que usan sus
 *    paneles en app.js/yle-panel.js (ver comentario de cada función).
 *  - Modo edición (WP-G, 17-sep-2026): el botón «✏️ Edit» convierte cada fila
 *    de estado en un control que SÍ escribe (node_access, practice_access,
 *    mock_access, fun_access, yle_access — las mismas reglas que usan los
 *    paneles de siempre, ver comentario de cada _ap* más abajo). Cerrar algo
 *    pide confirmación con NISUI.pregunta; abrir no. Tras escribir se vuelve
 *    a consultar la tabla (nunca se adivina el estado) y se repinta. reader_
 *    exam_access y student_access siguen sin editarse aquí.
 *
 * API: window.accessPanel({admin:boolean, grades:[id,...]}).
 *   `grades` ya viene filtrada por rol (todas para admin, las suyas para el
 *   profesor) — este panel no vuelve a decidir quién ve qué grado.
 * Usa las globales de app.js: sb, esc, $ (las mismas tres que overview-panel.js
 * declara como dependencia), y desde el modo edición también `state` (para
 * updated_by) y `NISUI` (para pregunta/avisa/aviso). Todo lo demás que hace
 * falta para resolver un estado se recalcula aquí mismo, para poder probar
 * este archivo sin cargar las 9000 líneas de app.js.
 */
(function () {
  'use strict';

  /* ---------- utilidad compartida con overview-panel.js: una consulta que
     puede fallar sin tumbar el panel ---------- */
  async function q(promesa) {
    try { const { data, error } = await promesa; return error ? null : (data || []); }
    catch (e) { return null; }
  }
  const SIN_ACCESO = 'not readable with your access';
  const SCHOOL_YEAR = new Date().getFullYear();

  /* ===================== reglas de node_access (copia de app.js) ===================== */
  /* 3.º–5.º de primaria nacen cerrados; 9.º Grammar también; French entero se
     resuelve aparte (regla de subárbol). Copia de NODE_DEFAULT_LOCKED. */
  const NODE_DEFAULT_LOCKED = new Set([
    'french', 'english.classes.g9.grammar',
    'english.classes.g3', 'english.classes.g4', 'english.classes.g5',
  ]);
  /* Unidades académicas del piloto 2027: nacen cerradas para el alumno. Copia
     de UNIT_PILOT. */
  const UNIT_PILOT = new Set([
    'english.classes.g2.units.u5', 'english.classes.g2.units.u6',
    'english.classes.g3.units.u6',
    'english.classes.g4.units.u5', 'english.classes.g4.units.u6',
    'english.classes.g5.units.u5', 'english.classes.g5.units.u6',
    'english.classes.g9.units.u106',
  ]);
  /* Nodo → ¿abierto por defecto sin fila en node_access? Para nodos "normales"
     (Classes, Activities, Grammar, Phonics, Library...). Copia de
     _nodeDefaultOpen, sin la rama de unidades/semanas (que aquí se resuelve
     aparte, porque su default sale de datos vivos: activities-data.js). */
  function defaultOpenGeneral(key) {
    if (key === 'french' || key.indexOf('french') === 0) return false; // subárbol nuevo
    if (key.slice(-8) === '.grammar') return false;                    // gramática nueva
    return !NODE_DEFAULT_LOCKED.has(key);
  }
  /* Nodo de una unidad/semana de Activities (…activities.uX[.wY]): su default
     sale del `locked` de activities-data.js (window.ACTIVITIES_DATA), no de
     esta lista. Copia de la rama `_SUB_BY_KEY` de _nodeDefaultOpen. */
  function defaultOpenActivityNode(locked) { return !locked; }
  /* Nodo de una unidad ACADÉMICA (…units.uN, la del planificador/Toddle):
     piloto 2027 cerrado; si no, la regla previa "9.º con más de 4 unidades
     cerrado". Copia de _academicUnitDefault. */
  function defaultOpenAcademicUnit(gradeKey, n) {
    const key = 'english.classes.' + gradeKey + '.units.u' + n;
    if (UNIT_PILOT.has(key)) return false;
    return !(gradeKey === 'g9' && Number(n) > 4);
  }
  /* Resolución genérica: fila en node_access manda; sin fila, el default que
     le corresponda a esa clave. */
  function resuelveNodo(naMap, gradeId, key, defaultFn) {
    const g = naMap[gradeId];
    if (g && Object.prototype.hasOwnProperty.call(g, key)) return !!g[key];
    return defaultFn();
  }

  /* ===================== practice_access / mock_access ===================== */
  /* Sin fila: Practice Tests ABIERTO, Mocks CERRADO (app.js: practicePanel /
     adminMocks, líneas ~1719-1724 y ~1691-1692). */
  function practiceOpen(paMap, gradeId) {
    return Object.prototype.hasOwnProperty.call(paMap, gradeId) ? !!paMap[gradeId] : true;
  }
  function mockOpen(maMap, gradeId) {
    return Object.prototype.hasOwnProperty.call(maMap, gradeId) ? !!maMap[gradeId] : false;
  }

  /* ===================== fun_access (Fun for Nordic) ===================== */
  /* Sin NINGUNA fila del idioma: el idioma entero está abierto (todos los
     grados, todas las unidades). En cuanto el idioma tiene alguna fila en
     algún grado, un grado SIN fila propia no ve nada de ese idioma. Copia
     exacta de funAccessDeGrado (app.js ~651-659). */
  function funEstadoDeGrado(funRows, gradeId, lang) {
    const delIdioma = funRows.filter(f => f.lang === lang);
    if (!delIdioma.length) return { abierto: true, filas: [] };      // idioma sin reglas
    return { abierto: false, filas: delIdioma.filter(f => f.grade_id === gradeId && f.unlocked) };
  }
  const FUN_NOMBRE = {
    en: { starters: 'Fun for Nordic 1 · Pre A1 Starters', movers: 'Fun for Nordic 2 · A1 Movers', flyers: 'Fun for Nordic 3 · A2 Flyers' },
    fr: { starters: 'Cap sur le français 1', movers: 'Cap sur le français 2', flyers: 'Cap sur le français 3' },
  };

  /* ===================== yle_access (practice tests YLE) ===================== */
  /* Sin fila: nivel abierto y con TODOS los tests (max_test=99 = "todos" en
     yle-panel.js vistaAcceso, líneas ~395-400). */
  const YLE_NIV = { starters: 'Pre A1 Starters', movers: 'A1 Movers', flyers: 'A2 Flyers' };
  function yleFilaDe(yleRows, gradeId, level) {
    return yleRows.find(r => r.grade_id === gradeId && r.level === level) || null;
  }
  function yleEstado(row) {
    if (!row) return { icon: '✅', texto: 'open · all tests (no rule)' };
    if (!row.unlocked) return { icon: '🔒', texto: 'closed' };
    if (row.max_test == null || row.max_test >= 99) return { icon: '✅', texto: 'open · all tests' };
    if (row.max_test <= 0) return { icon: '🔒', texto: 'open level, 0 tests released' };
    return { icon: '✅', texto: 'open · up to test ' + row.max_test };
  }

  /* ===================== reader_exam_access (ventanas de examen) ===================== */
  /* Copia exacta de _rdrRowOpen (app.js ~2470-2476): sin unlocked no hay
     ventana; opens_at futuro o closes_at ya pasado tampoco cuentan. */
  function ventanaAbierta(r, ahora) {
    if (!r || !r.unlocked) return false;
    if (r.opens_at && new Date(r.opens_at).getTime() > ahora) return false;
    if (r.closes_at && new Date(r.closes_at).getTime() <= ahora) return false;
    return true;
  }
  /* Cadena de alcance grado[-sección] → grado → todos, igual que
     _rdrScopeChain (app.js ~2496-2500), pero ya con el id de grado resuelto. */
  function cadenaAlcance(gradeId, section) {
    const g = 'g' + gradeId;
    return section ? [g + '-' + section, g, 'all'] : [g, 'all'];
  }
  /* Ventanas de examen del libro asignado que caen en el alcance del grado o
     su sección. No baja al nivel de capítulo con precisión total (ese detalle
     vive en el panel de Reading checks); aquí basta con avisar si HAY algo
     abierto ahora o programado para abrir. */
  function ventanasDelLibro(examRows, bookId, chain, ahora) {
    const mias = (examRows || []).filter(r => r.key && r.key.indexOf(bookId + ':') === 0 && chain.indexOf(r.scope) >= 0);
    const abiertas = mias.filter(r => ventanaAbierta(r, ahora));
    const programadas = mias.filter(r => !ventanaAbierta(r, ahora) && r.unlocked && r.opens_at && new Date(r.opens_at).getTime() > ahora);
    const capitulo = r => { const m = /ch(\d+)$/.exec(r.key || ''); return m ? m[1] : '?'; };
    return {
      abiertas: abiertas.map(capitulo),
      programadas: programadas.map(r => ({ ch: capitulo(r), desde: r.opens_at })),
    };
  }

  /* ===================== catálogo mínimo (libros, Main Suite) =====================
     Datos de referencia que cambian poco; copiados de READER_META/CAMBRIDGE_TRACKS
     en app.js solo con lo que hace falta para una etiqueta. */
  const READER_GRADES = new Set(['g7', 'g9']);           // copia de READER_BOOKS (app.js ~5389)
  const RDR_TERMS = [1, 2, 3];
  const BOOK_LABEL = {                                   // copia de READER_META (app.js ~2332)
    attwn: 'And Then There Were None', earnest: 'The Importance of Being Earnest',
    tomsawyer: 'The Adventures of Tom Sawyer', princepauper: 'The Prince and the Pauper',
    treasureisland: 'Treasure Island',
  };
  const MAIN_SUITE_LEVELS = [                            // copia de CAMBRIDGE_TRACKS.main.levels (app.js ~4694)
    { key: 'ket', short: 'A2 Key (KET)' }, { key: 'pet', short: 'B1 Preliminary (PET)' },
    { key: 'fce', short: 'B2 First (FCE)' }, { key: 'cae', short: 'C1 Advanced (CAE)' },
    { key: 'cpe', short: 'C2 Proficiency (CPE)' }, { key: 'listening', short: 'B2 First · Listening' },
    { key: 'uoe', short: 'B2 First · Use of English' }, { key: 'writing', short: 'B2 First · Writing' },
    { key: 'bonus', short: 'FCE Bonus' },
  ];
  const MISC_NODES = [
    { key: 'english.phonics', label: 'Phonics' },
    { key: 'english.pronunciation', label: 'Pronunciation' },
    { key: 'general.library', label: 'Library' },
    { key: 'general.mun', label: 'MUN Academy' },
    { key: 'french', label: 'French (whole subject)' },
  ];

  /* ===================== datos por unidad de Activities (window.ACTIVITIES_DATA) =====================
     Un nodo por unidad y otro por semana, colgando de "<subj>.classes.<g>.activities".
     Se leen en vivo del mismo fichero que usa app.js (_UNIT_NODES/_WEEK_NODES):
     no es una regla que se pueda copiar, es contenido que cambia con el curso. */
  function unidadesActivitiesDe(gradeKey) {
    const d = window.ACTIVITIES_DATA;
    if (!d || !Array.isArray(d.units)) return [];
    return d.units.filter(u => u.grade === gradeKey).map(u => {
      const subj = u.subject || 'english';
      const key = subj + '.classes.' + gradeKey + '.activities.' + u.id;
      const semanas = (u.weeks || []).filter(w => w.title).map(w => ({
        key: key + '.' + w.id, label: w.title, locked: !!w.locked,
      }));
      return { key, label: u.title || u.id, locked: !!u.locked, semanas };
    });
  }
  /* Unidades académicas del planificador (window.UNIT_PLANS, copia del
     planner de Toddle) — igual que unitPlansFor(grade) en app.js. */
  function unidadesPlanDe(gradeKey) {
    const p = (window.UNIT_PLANS || {})[gradeKey];
    return (p && p.units) ? p.units : [];
  }

  /* ===================== estado del panel ===================== */
  let DATA = null;      // lo que se cargó de Supabase (crudo + mapas)
  let V = { grade: null, section: '' };
  let EDIT = false;      // modo edición (botón «✏️ Edit» / «✅ Done»)

  /* Vuelve a consultar Supabase (los mismos grados que ya se estaban viendo)
     y repinta. Se llama tras CUALQUIER escritura, haya ido bien o mal: nunca
     se adivina el estado a partir de lo que se mandó, siempre se relee. */
  async function recargarYPinta() {
    DATA = await cargar(V.grades.map(g => g.id));
    pintar();
  }

  /* Control ✅/🔒 de una fila respaldada por node_access (key obligatoria) o
     por practice_access/mock_access (sin key: candado único por grado). */
  function toggleHTML(gradeId, tabla, key, on) {
    return `<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">` +
      `<input type="checkbox" ${on ? 'checked' : ''} onchange="window._apToggle(${gradeId},'${tabla}','${key || ''}',this.checked,this)">` +
      `<span>${on ? '✅' : '🔒'}</span></label>`;
  }
  window._apEditar = () => { EDIT = !EDIT; pintar(); };
  window._apToggle = async (gradeId, tabla, key, to, el) => {
    if (!to) {
      const ok = await NISUI.pregunta('Closing it leaves students in this grade without it.', { titulo: 'Close this?', si: 'Apply', no: 'Cancel', tono: 'ojo' });
      if (!ok) { el.checked = true; return; }
    }
    el.disabled = true;
    const updated_at = new Date().toISOString();
    const updated_by = (state.session && state.session.user && state.session.user.id) || null;
    let error;
    if (tabla === 'node_access') {
      ({ error } = await sb.from('node_access').upsert({ grade_id: gradeId, node_key: key, unlocked: to, updated_at, updated_by }, { onConflict: 'grade_id,node_key' }));
    } else if (tabla === 'practice_access') {
      ({ error } = await sb.from('practice_access').upsert({ grade_id: gradeId, unlocked: to, updated_at, updated_by }, { onConflict: 'grade_id' }));
    } else if (tabla === 'mock_access') {
      ({ error } = await sb.from('mock_access').upsert({ grade_id: gradeId, unlocked: to, updated_at, updated_by }, { onConflict: 'grade_id' }));
    }
    el.disabled = false;
    if (error) await NISUI.avisa('Could not save: ' + error.message, { titulo: 'Error', tono: 'mal' });
    else NISUI.aviso('Saved ✓', 'bien', 1800);
    await recargarYPinta();
  };

  /* Fun for Nordic: un grado tiene UN nivel activo por idioma — guardar borra
     los otros niveles de ese grado+idioma antes del upsert (igual que
     _funAccessGuardar en app.js). «Remove rule» borra la fila entera: el
     grado vuelve a depender del default del idioma (todo abierto si el
     idioma no tiene ninguna fila, nada si tiene filas de otros grados). */
  window._apFunGuardar = async (gradeId, lang, btn) => {
    const tr = btn.closest('tr');
    const nivel = tr.querySelector('.ap-fun-nivel').value;
    const desde = Number(tr.querySelector('.ap-fun-desde').value);
    const hasta = Number(tr.querySelector('.ap-fun-hasta').value);
    if (!nivel) { await NISUI.avisa('Choose a level, or use "Remove rule" to leave the grade without one.', { titulo: 'Missing level', tono: 'ojo' }); return; }
    if (!(desde >= 1) || !(hasta >= desde)) { await NISUI.avisa('The range does not add up: "to" must be greater than or equal to "from".', { titulo: 'Invalid range', tono: 'ojo' }); return; }
    const filaActual = (DATA.fun || []).find(r => r.grade_id === gradeId && r.lang === lang);
    const prevSpan = filaActual ? (filaActual.hasta - filaActual.desde) : Infinity; // sin fila = todo el idioma abierto
    if ((hasta - desde) < prevSpan) {
      const ok = await NISUI.pregunta('This narrows what the grade can see: units outside the new range become unavailable.', { titulo: 'Apply the shorter range?', si: 'Apply', no: 'Cancel', tono: 'ojo' });
      if (!ok) return;
    }
    btn.disabled = true;
    await sb.from('fun_access').delete().eq('grade_id', gradeId).eq('lang', lang).neq('level', nivel);
    const { error } = await sb.from('fun_access').upsert({
      grade_id: gradeId, lang, level: nivel, desde, hasta, unlocked: true,
      updated_at: new Date().toISOString(), updated_by: (state.session && state.session.user && state.session.user.id) || null,
    }, { onConflict: 'grade_id,lang,level' });
    btn.disabled = false;
    if (error) await NISUI.avisa('Could not save: ' + error.message, { titulo: 'Error', tono: 'mal' });
    else NISUI.aviso('Saved ✓', 'bien', 1800);
    await recargarYPinta();
  };
  window._apFunQuitar = async (gradeId, lang, btn) => {
    const ok = await NISUI.pregunta('With no row, that grade sees nothing of this language.', { titulo: 'Remove access?', si: 'Remove', no: 'Cancel', tono: 'mal', peligro: true });
    if (!ok) return;
    btn.disabled = true;
    const { error } = await sb.from('fun_access').delete().eq('grade_id', gradeId).eq('lang', lang);
    btn.disabled = false;
    if (error) await NISUI.avisa('Could not remove: ' + error.message, { titulo: 'Error', tono: 'mal' });
    else NISUI.aviso('Saved ✓', 'bien', 1800);
    await recargarYPinta();
  };

  /* YLE: un solo número resume unlocked+max_test (0 = cerrado, N = hasta el
     test N, 99 = todos) — igual que interpreta yleEstado() más arriba. */
  window._apYleGuardar = async (gradeId, level, el) => {
    const val = Number(el.value);
    if (!(val >= 0)) { return; }
    const filaActual = (DATA.yle || []).find(r => r.grade_id === gradeId && r.level === level);
    const prevMax = filaActual ? (filaActual.unlocked ? (filaActual.max_test == null ? 99 : filaActual.max_test) : 0) : 99; // sin fila = abierto con todos los tests
    if (val === 0 || val < prevMax) {
      const ok = await NISUI.pregunta('This leaves students without part of, or all of, this level.', { titulo: 'Apply?', si: 'Apply', no: 'Cancel', tono: 'ojo' });
      if (!ok) { el.value = prevMax; return; }
    }
    el.disabled = true;
    const { error } = await sb.from('yle_access').upsert({
      grade_id: gradeId, level, unlocked: val > 0, max_test: val,
      updated_at: new Date().toISOString(), updated_by: (state.session && state.session.user && state.session.user.id) || null,
    }, { onConflict: 'grade_id,level' });
    el.disabled = false;
    if (error) await NISUI.avisa('Could not save: ' + error.message, { titulo: 'Error', tono: 'mal' });
    else NISUI.aviso('Saved ✓', 'bien', 1800);
    await recargarYPinta();
  };

  async function cargar(gradeIds) {
    const [na, pa, ma, fun, yle, ra, rea, profs, sa, sp] = await Promise.all([
      q(sb.from('node_access').select('grade_id,node_key,unlocked').in('grade_id', gradeIds)),
      q(sb.from('practice_access').select('grade_id,unlocked').in('grade_id', gradeIds)),
      q(sb.from('mock_access').select('grade_id,unlocked').in('grade_id', gradeIds)),
      q(sb.from('fun_access').select('grade_id,lang,level,desde,hasta,unlocked')),
      q(sb.from('yle_access').select('grade_id,level,unlocked,max_test').in('grade_id', gradeIds)),
      q(sb.from('reader_assignments').select('school_year,grade_id,section,book_id,term').eq('school_year', SCHOOL_YEAR).in('grade_id', gradeIds)),
      q(sb.from('reader_exam_access').select('key,unlocked,scope,extra_min,opens_at,closes_at').eq('school_year', SCHOOL_YEAR)),
      q(sb.from('profiles').select('id,full_name,grade_id,section,individual_plan,active').eq('role', 'student').in('grade_id', gradeIds)),
      // student_access no admite filtrar por grado (no tiene esa columna) y las
      // excepciones son pocas de por sí: se trae entera y se cruza en memoria
      // con los alumnos ya cargados arriba.
      q(sb.from('student_access').select('student_id,node_key,unlocked')),
      q(sb.from('study_plans').select('ref,note').eq('area', 'cambridge').eq('scope', 'grade')),
    ]);
    const mapaNodo = (rows) => { const m = {}; (rows || []).forEach(r => { (m[r.grade_id] = m[r.grade_id] || {})[r.node_key] = r.unlocked; }); return m; };
    const mapaGrado = (rows) => { const m = {}; (rows || []).forEach(r => { m[r.grade_id] = r.unlocked; }); return m; };
    const notaPorGrado = {}; (sp || []).forEach(r => { notaPorGrado[r.ref] = r.note || ''; });
    return {
      na, pa, ma, fun, yle, ra, rea, profs, sa,
      naMap: na && mapaNodo(na), paMap: pa && mapaGrado(pa), maMap: ma && mapaGrado(ma),
      notaPorGrado: sp ? notaPorGrado : null,
    };
  }

  /* ===================== construcción de una fila ✅/🔒/🕒 ===================== */
  function fila(label, icono, texto, extra) {
    return `<tr><td>${esc(label)}</td><td style="text-align:center">${icono}</td><td>${esc(texto)}${extra || ''}</td></tr>`;
  }
  function filaNoLeible(label) {
    return `<tr><td>${esc(label)}</td><td style="text-align:center">—</td><td class="muted">${SIN_ACCESO}</td></tr>`;
  }
  function editLink(admin, tab, label) {
    // Los paneles admin-only (Access, Mocks, Study plan, Library) no existen
    // en el menú del profesor: _irTab('access') para un profesor lo manda a
    // su primera pestaña en vez de al editor, así que ese enlace ni se pinta.
    const ADMIN_ONLY = new Set(['access', 'mocks', 'studyplan', 'library', 'users']);
    if (ADMIN_ONLY.has(tab) && !admin) return '';
    return ` <a href="#" class="ap-edit" onclick="window._irTab('${tab}');return false">Edit in ${esc(label)} →</a>`;
  }

  /* ===================== bloque Classes ===================== */
  function bloqueClasses(admin, gradeId, gradeKey, D) {
    if (D.na === null) return `<div class="card"><h2>🏫 Classes</h2><p class="muted">${SIN_ACCESO}</p></div>`;
    const esPrimaria = ['g2', 'g3', 'g4', 'g5'].indexOf(gradeKey) >= 0;
    const esEarly = gradeKey === 'g1';
    const esSecundaria = !esPrimaria && !esEarly;

    // Unidades académicas (el planificador — producto final por unidad)
    const plan = unidadesPlanDe(gradeKey);
    const filasUnidades = plan.map(u => {
      const key = 'english.classes.' + gradeKey + '.units.u' + u.n;
      const piloto = UNIT_PILOT.has(key);
      const on = resuelveNodo(D.naMap, gradeId, key, () => defaultOpenAcademicUnit(gradeKey, u.n));
      const icono = EDIT ? toggleHTML(gradeId, 'node_access', key, on) : (piloto && !on ? '🧪' : (on ? '✅' : '🔒'));
      const nota = piloto ? ' <span class="muted">(2027 pilot)</span>' : (u.pilot ? ' <span class="muted">(pilot)</span>' : '');
      return fila('Unit ' + (u.label || u.n) + ' · ' + u.title, icono, on ? 'open' : 'locked', nota);
    }).join('');

    // Activities (y sus semanas), del motor de juegos por unidad
    const actKey = 'english.classes.' + gradeKey + '.activities';
    const actOn = esEarly ? null : resuelveNodo(D.naMap, gradeId, actKey, () => defaultOpenGeneral(actKey));
    const unidadesAct = esEarly ? [] : unidadesActivitiesDe(gradeKey);
    const semanasTotal = unidadesAct.reduce((n, u) => n + (u.semanas.length || 1), 0);
    let semanasAbiertas = 0;
    const bloqueadas = [];   // qué unidad/semana de Activities está cerrada, para no dejarlo solo en un número
    unidadesAct.forEach(u => {
      const uOn = resuelveNodo(D.naMap, gradeId, u.key, () => defaultOpenActivityNode(u.locked));
      if (!u.semanas.length) { if (uOn) semanasAbiertas++; else bloqueadas.push(u.label); return; }
      const semCerradas = [];
      u.semanas.forEach(w => {
        const wOn = resuelveNodo(D.naMap, gradeId, w.key, () => defaultOpenActivityNode(w.locked));
        if (uOn && wOn) semanasAbiertas++; else semCerradas.push(w.label);
      });
      if (!uOn) bloqueadas.push(u.label);
      else if (semCerradas.length) bloqueadas.push(u.label + ' (' + semCerradas.join(', ') + ' locked)');
    });
    const filaActividades = esEarly ? '' : fila('Activities', EDIT ? toggleHTML(gradeId, 'node_access', actKey, actOn) : (actOn ? '✅' : '🔒'),
      actOn ? 'open' : 'locked', unidadesAct.length
        ? ` <span class="muted">(${semanasAbiertas}/${semanasTotal} weeks unlocked${bloqueadas.length ? ' · ' + bloqueadas.join('; ') : ''})</span>`
        : '');

    // Grammar (solo secundaria: en primaria y francés vive dentro de las actividades)
    const gramKey = 'english.classes.' + gradeKey + '.grammar';
    const gramOn = resuelveNodo(D.naMap, gradeId, gramKey, () => defaultOpenGeneral(gramKey));
    const filaGramatica = esSecundaria ? fila('Grammar', EDIT ? toggleHTML(gradeId, 'node_access', gramKey, gramOn) : (gramOn ? '✅' : '🔒'), gramOn ? 'open' : 'locked') : '';

    // Readers: nodo + libro asignado este año + ventana de examen si la hay
    let filaReaders = '';
    if (READER_GRADES.has(gradeKey)) {
      const rdrKey = 'english.classes.' + gradeKey + '.reader';
      const rdrOn = resuelveNodo(D.naMap, gradeId, rdrKey, () => defaultOpenGeneral(rdrKey));
      if (D.ra === null) {
        filaReaders = filaNoLeible('Readers');
      } else {
        // Sin sección elegida ("todas"), se agregan las filas de TODAS las
        // secciones del grado — si no, la vista "todas las secciones" no
        // encontraba ninguna fila (cada asignación es por grado+sección).
        const seccion = V.section || '';
        const filasGrado = D.ra.filter(x => +x.grade_id === gradeId);
        const relevantes = seccion ? filasGrado.filter(x => String(x.section || '') === String(seccion)) : filasGrado;
        const porTermino = RDR_TERMS.map(t => {
          const filas = relevantes.filter(x => +x.term === t);
          if (!filas.length) return null;
          const distintos = [...new Set(filas.map(f => f.book_id))];
          if (!seccion && distintos.length > 1) {
            return filas.map(f => (f.section ? f.section + ': ' : '') + (BOOK_LABEL[f.book_id] || f.book_id)).join(', ');
          }
          return BOOK_LABEL[distintos[0]] || distintos[0];
        }).filter(Boolean);
        const libroTxt = porTermino.length ? porTermino.join(' · ') : 'no book assigned this year';
        let ventanaTxt = '';
        if (D.rea === null) {
          ventanaTxt = ' · <span class="muted">exam windows: ' + SIN_ACCESO + '</span>';
        } else if (relevantes.length) {
          const bookIds = [...new Set(relevantes.map(f => f.book_id))];
          const ahora = Date.now();
          const chain = cadenaAlcance(gradeId, seccion);
          const ventanas = bookIds.map(bid => ventanasDelLibro(D.rea, bid, chain, ahora));
          const abiertas = ventanas.flatMap(v => v.abiertas);
          const programadas = ventanas.flatMap(v => v.programadas);
          if (abiertas.length) ventanaTxt = ' · 🕒 exam window OPEN now (ch. ' + abiertas.join(', ') + ')';
          else if (programadas.length) ventanaTxt = ' · 🕒 scheduled (ch. ' + programadas.map(p => p.ch).join(', ') + ')';
        }
        filaReaders = fila('Readers', EDIT ? toggleHTML(gradeId, 'node_access', rdrKey, rdrOn) : (rdrOn ? '✅' : '🔒'), (rdrOn ? 'open' : 'locked') + ' · ' + libroTxt, ventanaTxt);
      }
    }

    return `<div class="card">
      <h2 style="margin:0 0 4px">🏫 Classes</h2>
      <table class="ap-tbl"><tbody>
        ${filasUnidades || '<tr><td colspan="3" class="muted">No units in the planner for this grade.</td></tr>'}
        ${filaActividades}${filaGramatica}${filaReaders}
      </tbody></table>
      ${editLink(admin, 'unitaccess', '📚 Activate units')}${editLink(admin, 'access', '🔐 Access by grade')}${READER_GRADES.has(gradeKey) ? editLink(admin, 'readers', '📖 Reading checks') : ''}
    </div>`;
  }

  /* ===================== bloque Cambridge ===================== */
  function bloqueCambridge(admin, gradeId, gradeKey, D) {
    // Fun for Nordic (por idioma)
    let filasFun = '';
    if (D.fun === null) { filasFun = filaNoLeible('Fun for Nordic'); }
    else if (EDIT) {
      ['en', 'fr'].forEach(lang => {
        const etiqLang = lang === 'en' ? '🇬🇧 English' : '🇫🇷 Français';
        const filaActual = D.fun.find(r => r.grade_id === gradeId && r.lang === lang);
        const opciones = ['starters', 'movers', 'flyers'].map(lv =>
          `<option value="${lv}" ${filaActual && filaActual.level === lv ? 'selected' : ''}>${esc((FUN_NOMBRE[lang] || {})[lv] || lv)}</option>`).join('');
        filasFun += `<tr><td colspan="3"><b>Fun for Nordic · ${esc(etiqLang)}</b>
          <div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
            <select class="ap-fun-nivel">${filaActual ? '' : '<option value="">— choose a level —</option>'}${opciones}</select>
            units <input class="ap-fun-desde" type="number" min="1" value="${filaActual ? filaActual.desde : 1}" style="width:64px">
            – <input class="ap-fun-hasta" type="number" min="1" value="${filaActual ? filaActual.hasta : 10}" style="width:64px">
            <button class="btn sm" onclick="window._apFunGuardar(${gradeId},'${lang}',this)">Apply</button>
            <button class="btn sm ghost" onclick="window._apFunQuitar(${gradeId},'${lang}',this)">Remove rule</button>
          </div></td></tr>`;
      });
    }
    else {
      ['en', 'fr'].forEach(lang => {
        const est = funEstadoDeGrado(D.fun, gradeId, lang);
        const etiqLang = lang === 'en' ? '🇬🇧 English' : '🇫🇷 Français';
        if (est.abierto) { filasFun += fila('Fun for Nordic · ' + etiqLang, '✅', 'open · whole course (no rule saved yet)'); return; }
        if (!est.filas.length) { filasFun += fila('Fun for Nordic · ' + etiqLang, '🔒', 'sees nothing (no rule for this grade)'); return; }
        est.filas.forEach(f => {
          const nombre = (FUN_NOMBRE[lang] && FUN_NOMBRE[lang][f.level]) || f.level;
          filasFun += fila('Fun for Nordic · ' + etiqLang, '✅', nombre + ' · units ' + f.desde + '–' + f.hasta);
        });
      });
    }

    // YLE practice tests
    let filasYle = '';
    if (D.yle === null) { filasYle = filaNoLeible('YLE practice tests'); }
    else {
      Object.keys(YLE_NIV).forEach(level => {
        const row = yleFilaDe(D.yle, gradeId, level);
        if (EDIT) {
          const actual = row ? (row.unlocked ? (row.max_test == null ? 99 : row.max_test) : 0) : 99;
          filasYle += `<tr><td>${esc('YLE · ' + YLE_NIV[level])}</td><td colspan="2">` +
            `<input type="number" min="0" value="${actual}" style="width:64px" onchange="window._apYleGuardar(${gradeId},'${level}',this)"> ` +
            `<span class="muted" style="font-size:.8rem">tests unlocked (0 = closed, 99 = all)</span></td></tr>`;
        } else {
          const est = yleEstado(row);
          filasYle += fila('YLE · ' + YLE_NIV[level], est.icon, est.texto);
        }
      });
    }

    // Main Suite (nodos english.cambridge.main.*)
    let filasMain = '';
    if (D.na === null) { filasMain = filaNoLeible('Main Suite'); }
    else {
      const mainKey = 'english.cambridge.main';
      const ramaOn = resuelveNodo(D.naMap, gradeId, mainKey, () => defaultOpenGeneral(mainKey));
      const abiertos = MAIN_SUITE_LEVELS.filter(l => resuelveNodo(D.naMap, gradeId, 'english.cambridge.main.' + l.key, () => defaultOpenGeneral('english.cambridge.main.' + l.key)));
      filasMain = fila('Main Suite', EDIT ? toggleHTML(gradeId, 'node_access', mainKey, ramaOn) : (ramaOn ? '✅' : '🔒'),
        ramaOn ? (abiertos.length ? abiertos.map(l => l.short).join(', ') : 'branch open, no level unlocked') : 'closed',
        EDIT ? ' <span class="muted" style="font-size:.8rem">(edit individual levels in 🔐 Access by grade)</span>' : '');
    }

    // Practice tests / Mocks
    let filaPractice, filaMocks;
    if (D.pa === null) { filaPractice = filaNoLeible('Practice tests'); }
    else {
      const practiceOn = practiceOpen(D.paMap, gradeId);
      filaPractice = fila('Practice tests', EDIT ? toggleHTML(gradeId, 'practice_access', '', practiceOn) : (practiceOn ? '✅' : '🔒'), practiceOn ? 'open' : 'locked');
    }
    if (D.ma === null) { filaMocks = filaNoLeible('Mocks'); }
    else {
      const mockOn = mockOpen(D.maMap, gradeId);
      filaMocks = fila('Mocks', (EDIT && admin) ? toggleHTML(gradeId, 'mock_access', '', mockOn) : (mockOn ? '✅' : '🔒'), mockOn ? 'open' : 'locked');
    }

    // Nota del plan de estudio
    const nota = D.notaPorGrado === null ? SIN_ACCESO : (D.notaPorGrado['g:' + gradeId] || '(no note for this grade)');

    return `<div class="card">
      <h2 style="margin:0 0 4px">🎓 Cambridge</h2>
      <table class="ap-tbl"><tbody>${filasFun}${filasYle}${filasMain}${filaPractice}${filaMocks}</tbody></table>
      <p style="margin:10px 0 0"><b>Study plan note:</b> ${esc(nota)}</p>
      ${editLink(admin, 'funaccess', '🔐 Units by grade')}${editLink(admin, 'yle', '🛡️ YLE panel')}${editLink(admin, 'practice', '🔓 Open Practice Tests')}${editLink(admin, 'mocks', '🔓 Open Mocks')}${editLink(admin, 'studyplan', '📋 Study plan')}
    </div>`;
  }

  /* ===================== bloque Practice tools & General ===================== */
  function bloqueGeneral(admin, gradeId, D) {
    if (D.na === null) return `<div class="card"><h2>🧰 Practice tools &amp; General</h2><p class="muted">${SIN_ACCESO}</p></div>`;
    const filas = MISC_NODES.map(n => {
      const on = resuelveNodo(D.naMap, gradeId, n.key, () => defaultOpenGeneral(n.key));
      return fila(n.label, EDIT ? toggleHTML(gradeId, 'node_access', n.key, on) : (on ? '✅' : '🔒'), on ? 'open' : 'locked');
    }).join('');
    return `<div class="card">
      <h2 style="margin:0 0 4px">🧰 Practice tools &amp; General</h2>
      <table class="ap-tbl"><tbody>${filas}</tbody></table>
      ${editLink(admin, 'access', '🔐 Access by grade')}
    </div>`;
  }

  /* ===================== bloque Exceptions ===================== */
  function bloqueExcepciones(admin, gradeId, D) {
    if (D.profs === null) return `<div class="card"><h2>🧩 Exceptions</h2><p class="muted">${SIN_ACCESO}</p></div>`;
    const alumnos = D.profs.filter(p => p.grade_id === gradeId && p.active !== false);
    const nombreDe = {}; alumnos.forEach(a => { nombreDe[a.id] = a.full_name || '(no name)'; });
    const idsAlumnos = new Set(alumnos.map(a => a.id));

    let filasExc = '';
    if (D.sa === null) { filasExc = filaNoLeible('Per-student overrides'); }
    else {
      const mias = D.sa.filter(r => idsAlumnos.has(r.student_id));
      if (!mias.length) filasExc = '<tr><td colspan="3" class="muted">No per-student exceptions in this grade.</td></tr>';
      else filasExc = mias.map(r => fila(nombreDe[r.student_id] || r.student_id, r.unlocked ? '✅' : '🔒', r.node_key)).join('');
    }

    const epi = alumnos.filter(a => a.individual_plan === true);
    const filaEpi = epi.length
      ? `<tr><td colspan="3"><b>Individual plan (EPI):</b> ${epi.map(a => esc(a.full_name || '—')).join(', ')}</td></tr>`
      : '<tr><td colspan="3" class="muted">No student with an individual plan in this grade.</td></tr>';

    return `<div class="card">
      <h2 style="margin:0 0 4px">🧩 Exceptions</h2>
      <table class="ap-tbl"><tbody>${filasExc}${filaEpi}</tbody></table>
      ${editLink(admin, 'users', '👥 Users')}${!admin ? ' <a href="#" class="ap-edit" onclick="window._irTab(\'students\');return false">Edit in 👥 Students →</a>' : ''}${editLink(admin, 'studyplan', '📋 Study plan (EPI)')}
    </div>`;
  }

  /* ===================== resumen en una frase ===================== */
  function resumen(gradeId, gradeKey, gradeName, D) {
    if (D.na === null) return gradeName + ': access data ' + SIN_ACCESO + '.';
    const trozos = [];
    const plan = unidadesPlanDe(gradeKey);
    if (plan.length) {
      const abiertas = plan.filter(u => resuelveNodo(D.naMap, gradeId, 'english.classes.' + gradeKey + '.units.u' + u.n, () => defaultOpenAcademicUnit(gradeKey, u.n)));
      const cerradas = plan.filter(u => !resuelveNodo(D.naMap, gradeId, 'english.classes.' + gradeKey + '.units.u' + u.n, () => defaultOpenAcademicUnit(gradeKey, u.n)));
      const rango = xs => xs.length ? (xs.length > 1 ? (xs[0].label || xs[0].n) + '–' + (xs[xs.length - 1].label || xs[xs.length - 1].n) : String(xs[0].label || xs[0].n)) : '';
      if (abiertas.length) trozos.push('Units ' + rango(abiertas) + ' open' + (cerradas.length ? ' (' + rango(cerradas) + ' locked)' : ''));
      else if (cerradas.length) trozos.push('all units locked');
    }
    if (gradeKey !== 'g1') {
      const actOn = resuelveNodo(D.naMap, gradeId, 'english.classes.' + gradeKey + '.activities', () => defaultOpenGeneral('english.classes.' + gradeKey + '.activities'));
      trozos.push('Activities' + (actOn ? '' : ' locked'));
    }
    if (READER_GRADES.has(gradeKey) && D.ra) {
      const seccion = V.section || '';
      const r = seccion
        ? D.ra.find(x => +x.grade_id === gradeId && String(x.section || '') === String(seccion))
        : D.ra.find(x => +x.grade_id === gradeId);   // "todas las secciones": cualquiera sirve de muestra
      if (r) trozos.push('Readers: ' + (BOOK_LABEL[r.book_id] || r.book_id));
    }
    if (D.fun) {
      const est = funEstadoDeGrado(D.fun, gradeId, 'en');
      if (!est.abierto && est.filas.length) est.filas.forEach(f => trozos.push('Fun for Nordic ' + (f.level[0].toUpperCase() + f.level.slice(1)) + ' units ' + f.desde + '–' + f.hasta));
    }
    if (D.pa) trozos.push('Practice tests ' + (practiceOpen(D.paMap, gradeId) ? 'open' : 'closed'));
    if (D.ma) trozos.push('Mocks ' + (mockOpen(D.maMap, gradeId) ? 'open' : 'closed'));
    return gradeName + ' sees: ' + (trozos.join(' · ') || 'nothing configured yet') + '.';
  }

  /* ===================== render puro (testeable sin red ni DOM real) ===================== */
  function render(admin, grades, D, view) {
    const g = view.grade, sec = view.section;
    const gradeObj = grades.find(x => x.id === g) || grades[0];
    if (!gradeObj) return `<h1>🔍 Access panel</h1><div class="note">No grades to show.</div>`;
    const gradeKey = 'g' + gradeObj.id;

    // secciones del grado elegido (si las tiene)
    const secciones = D.profs
      ? [...new Set(D.profs.filter(p => p.grade_id === gradeObj.id && (p.section || '').trim()).map(p => p.section.trim()))].sort()
      : [];

    const pillsGrado = grades.map(gr => `<button class="ap-pill ${gr.id === gradeObj.id ? 'on' : ''}" onclick="window._apGrado(${gr.id})">${esc(gr.name)}</button>`).join('');
    const pillsSeccion = secciones.length > 1
      ? `<div class="ap-pills">${['', ...secciones].map(s => `<button class="ap-pill ${s === sec ? 'on' : ''}" onclick="window._apSeccion('${esc(s)}')">${s ? esc(s) : 'All sections'}</button>`).join('')}</div>`
      : '';

    const CSS = `<style>
      .ap-pills{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
      .ap-pill{border:1.5px solid var(--line,#d9deea);background:#fff;border-radius:999px;padding:6px 13px;font:inherit;font-weight:600;cursor:pointer}
      .ap-pill.on{background:var(--blue-d,#1e3a8a);color:#fff;border-color:var(--blue-d,#1e3a8a)}
      .ap-tbl{width:100%;border-collapse:collapse;font-size:.9rem}
      .ap-tbl td{border-top:1px solid var(--line,#e5e9f0);padding:6px 8px;vertical-align:top}
      .ap-tbl tr:first-child td{border-top:0}
      .ap-edit{display:inline-block;margin:10px 10px 0 0;font-size:.82rem;font-weight:600;text-decoration:none}
      .ap-summary{background:#eef4fb;border-radius:10px;padding:10px 14px;font-weight:600;margin:10px 0 16px}
      @media print{.ap-noprint{display:none!important}}
    </style>`;

    return CSS + `
      <div class="row ap-noprint" style="justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
        <h1 style="margin:0">🔍 Access panel — what each class sees</h1>
        <div style="display:flex;gap:8px">
          <button class="btn sm ${EDIT ? '' : 'ghost'}" onclick="window._apEditar()">${EDIT ? '✅ Done' : '✏️ Edit'}</button>
          <button class="btn sm ghost" onclick="window.print()">🖨️ Print</button>
        </div>
      </div>
      <div class="ap-noprint"><div class="ap-pills">${pillsGrado}</div>${pillsSeccion}</div>
      ${EDIT ? `<div class="note ap-noprint" style="margin:8px 0 0">✏️ <b>Editing ${esc(gradeObj.name)}${sec ? ' · ' + esc(sec) : ''}</b>${sec ? ' — changes apply to the whole grade (these tables have no per-section lock).' : ''}</div>` : ''}
      <p class="ap-summary">${esc(resumen(gradeObj.id, gradeKey, gradeObj.name, D))}</p>
      <div class="grid cols-2" style="align-items:start;gap:14px">
        ${bloqueClasses(admin, gradeObj.id, gradeKey, D)}
        ${bloqueCambridge(admin, gradeObj.id, gradeKey, D)}
        ${bloqueGeneral(admin, gradeObj.id, D)}
        ${bloqueExcepciones(admin, gradeObj.id, D)}
      </div>`;
  }

  /* ===================== pintado + navegación del selector ===================== */
  function pintar() {
    $('#main').innerHTML = render(V.admin, V.grades, DATA, V);
  }
  window._apGrado = (id) => { V.grade = Number(id); V.section = ''; pintar(); };
  window._apSeccion = (s) => { V.section = s; pintar(); };

  window.accessPanel = async function (opts) {
    const admin = !!(opts && opts.admin);
    const ids = (opts && Array.isArray(opts.grades) && opts.grades.length) ? opts.grades.slice() : [];
    const grades = ids.map(id => ({ id: Number(id), name: 'G' + id })).sort((a, b) => a.id - b.id);
    V = { admin, grades, grade: grades.length ? grades[0].id : null, section: '' };
    EDIT = false; // cada apertura del panel empieza en solo lectura
    $('#main').innerHTML = '<div class="card"><p class="muted">Reading the access tables…</p></div>';
    if (!grades.length) { $('#main').innerHTML = '<div class="note">No grades to show.</div>'; return; }
    DATA = await cargar(grades.map(g => g.id));
    pintar();
  };

  /* Expuesto solo para la prueba de tools/fase2/prueba_access_panel.js: le
     permite comprobar el HTML de render() sin pasar por Supabase ni por el DOM. */
  window.accessPanel._render = render;
})();
