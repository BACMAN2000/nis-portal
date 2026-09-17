/* Prueba de access-panel.js con un `sb` de mentira y datos sintéticos —
 * jsdom no está disponible, así que el DOM se simula con un objeto mínimo que
 * solo necesita soportar `document.querySelector('#main').innerHTML = html`.
 *
 *   node tools/fase2/prueba_access_panel.js
 *
 * Comprueba:
 *  1) El panel carga con un `sb` que responde bien, para dos grados (5 y 9),
 *     y el HTML final trae las cuatro secciones, los grados y el estado
 *     esperado de cada regla (unidad pilota con excepción, Activities
 *     bloqueado en 9.º, Grammar reabierto en 9.º, Fun for Nordic con rango,
 *     Practice/Mocks con sus defaults invertidos, el libro y la ventana de
 *     examen del lector, la excepción de alumno y el EPI).
 *  2) Cuando UNA tabla falla (RLS de profesor), esa fila dice
 *     "not readable with your access" y el resto del panel se sigue pintando.
 *  3) Los enlaces "Edit in …" admin-only no aparecen para un profesor.
 */
'use strict';
const path = require('path');

/* ---------- DOM mínimo: solo hace falta un #main con .innerHTML ---------- */
const mainStub = { innerHTML: '' };
global.window = global;
global.document = { querySelector: (sel) => (sel === '#main' ? mainStub : null) };
global.esc = s => (s == null ? '' : String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
global.$ = (s, r) => (r || document).querySelector(s);

/* ---------- datos sintéticos ---------- */
const HOY = new Date();
const AYER = new Date(HOY.getTime() - 864e5).toISOString();
const MANANA = new Date(HOY.getTime() + 864e5).toISOString();
const YEAR = HOY.getFullYear();

const TABLES = {
  node_access: [
    // 5.º: la unidad piloto u5 se reabre a mano (la excepción manda sobre UNIT_PILOT)
    { grade_id: 5, node_key: 'english.classes.g5.units.u5', unlocked: true },
    { grade_id: 5, node_key: 'english.classes.g5.activities', unlocked: true },
    // 9.º: Activities cerrado a mano; Grammar reabierto a mano (default cerrado)
    { grade_id: 9, node_key: 'english.classes.g9.activities', unlocked: false },
    { grade_id: 9, node_key: 'english.classes.g9.grammar', unlocked: true },
    { grade_id: 9, node_key: 'english.classes.g9.reader', unlocked: true },
    { grade_id: 9, node_key: 'english.cambridge.main', unlocked: true },
    { grade_id: 9, node_key: 'english.cambridge.main.fce', unlocked: true },
    { grade_id: 9, node_key: 'general.mun', unlocked: false },
  ],
  practice_access: [
    { grade_id: 5, unlocked: false },   // 5.º cierra Practice (default sería abierto)
  ],
  mock_access: [
    { grade_id: 9, unlocked: true },    // 9.º abre Mocks (default sería cerrado)
  ],
  fun_access: [
    // 'en' tiene reglas (grados 3 y 5): un grado del filtro (9.º) sin fila no ve nada
    { grade_id: 3, lang: 'en', level: 'movers', desde: 1, hasta: 10, unlocked: true },
    { grade_id: 5, lang: 'en', level: 'flyers', desde: 1, hasta: 20, unlocked: true },
    // 'fr' no tiene ninguna fila: idioma abierto entero para todos
  ],
  yle_access: [
    { grade_id: 3, level: 'movers', unlocked: false, max_test: 0 }, // fuera del filtro [5,9]: no debe aparecer
  ],
  reader_assignments: [
    { school_year: YEAR, grade_id: 9, section: 'A', term: 1, book_id: 'attwn' },
  ],
  reader_exam_access: [
    // ventana abierta ahora mismo, solo para 9.º A
    { key: 'attwn:a2:ch1', unlocked: true, scope: 'g9-A', extra_min: 0, opens_at: null, closes_at: null, school_year: YEAR },
    // ventana programada (todavía no abre) para el grado entero
    { key: 'attwn:b1:ch1', unlocked: true, scope: 'g9', extra_min: 0, opens_at: MANANA, closes_at: null, school_year: YEAR },
    // ventana ya cerrada (no debería contar como abierta ni programada)
    { key: 'attwn:c1:ch1', unlocked: true, scope: 'g9', extra_min: 0, opens_at: AYER, closes_at: AYER, school_year: YEAR },
  ],
  profiles: [
    { id: 's1', full_name: 'Ana Ana', grade_id: 9, section: 'A', individual_plan: false, active: true, role: 'student' },
    { id: 's2', full_name: 'Beto Beto', grade_id: 9, section: 'B', individual_plan: true, active: true, role: 'student' },
    { id: 's3', full_name: 'Carla Carla', grade_id: 5, section: 'A', individual_plan: false, active: true, role: 'student' },
  ],
  student_access: [
    { student_id: 's1', node_key: 'english.classes.g9.units.u5', unlocked: true },
  ],
  study_plans: [
    { ref: 'g:9', area: 'cambridge', scope: 'grade', note: 'This term: FCE units 1-5.' },
  ],
};

/* ---------- sb de mentira: from().select().eq()/in() encadenables, awaitable ---------- */
function filtro(rows, col, val, modo) {
  if (modo === 'in') { const set = new Set(val.map(String)); return rows.filter(r => set.has(String(r[col]))); }
  return rows.filter(r => String(r[col]) === String(val));
}
function makeSb(tables, tablaQueFalla) {
  return {
    from(name) {
      if (name === tablaQueFalla) {
        const builder = { select: () => builder, eq: () => builder, in: () => builder, order: () => builder,
          then: (res, rej) => Promise.resolve({ data: null, error: { message: 'permission denied (RLS)' } }).then(res, rej) };
        return builder;
      }
      let rows = (tables[name] || []).slice();
      const builder = {
        select: () => builder,
        eq: (c, v) => { rows = filtro(rows, c, v, 'eq'); return builder; },
        in: (c, v) => { rows = filtro(rows, c, v, 'in'); return builder; },
        order: () => builder,
        then: (res, rej) => Promise.resolve({ data: rows, error: null }).then(res, rej),
      };
      return builder;
    },
  };
}

/* datos vivos que en el portal cargan otros scripts (activities-data.js / unit-plans.js) */
window.ACTIVITIES_DATA = { units: [
  { id: 'u3', grade: 'g9', subject: 'english', title: 'Wellbeing', locked: false,
    weeks: [{ id: 'w1', title: 'Week 1', locked: false }, { id: 'w2', title: 'Week 2', locked: true }] },
  { id: 'u1', grade: 'g5', subject: 'english', title: 'Animals', locked: false, weeks: [] },
] };
window.UNIT_PLANS = {
  g9: { label: '9th Grade', cefr: 'B2', units: [
    { n: 1, label: '1', title: 'Identity', weeks: 6 },
    { n: 5, label: '5', title: 'Does Our School Run on Data?', weeks: 11 },
    { n: 106, label: '6 (pilot)', title: 'Pilot unit', weeks: 6, pilot: true },
  ] },
  g5: { label: '5th Grade', cefr: 'A2', units: [
    { n: 1, label: '1', title: 'Unit One', weeks: 6 },
    { n: 5, label: '5', title: 'Pilot Unit Five', weeks: 6 },
  ] },
};

/* ---------- pequeño arnés de aserciones ---------- */
let ok = 0, mal = 0;
function afirma(cond, msg) {
  if (cond) { ok++; console.log('  ✓ ' + msg); }
  else { mal++; console.log('  ✗ ' + msg); }
}
function contiene(html, txt, msg) { afirma(html.indexOf(txt) >= 0, msg + '  [buscaba: ' + JSON.stringify(txt) + ']'); }
function noContiene(html, txt, msg) { afirma(html.indexOf(txt) < 0, msg + '  [no debía tener: ' + JSON.stringify(txt) + ']'); }

(async () => {
  global.sb = makeSb(TABLES, null);
  require(path.join(__dirname, '..', '..', 'access-panel.js'));

  console.log('1) Admin, grados [5,9], todas las tablas legibles');
  await window.accessPanel({ admin: true, grades: [5, 9] });
  let html = mainStub.innerHTML;
  contiene(html, 'Access panel', 'trae el título del panel');
  contiene(html, '🏫 Classes', 'trae el bloque Classes');
  contiene(html, '🎓 Cambridge', 'trae el bloque Cambridge');
  contiene(html, 'Practice tools', 'trae el bloque Practice tools & General');
  contiene(html, '🧩 Exceptions', 'trae el bloque Exceptions');
  contiene(html, '>G5<', 'pinta la pastilla del grado 5');
  contiene(html, '>G9<', 'pinta la pastilla del grado 9');
  // por defecto pinta el primer grado de la lista ordenada (5)
  contiene(html, 'Pilot Unit Five', '5.º: muestra la unidad piloto reabierta a mano');
  contiene(html, 'Fun for Nordic 3 · A2 Flyers · units 1–20', '5.º: Fun for Nordic con su rango');
  contiene(html, 'locked', '5.º: Practice tests aparece bloqueado (cerrado a mano)');

  window._apGrado(9);
  html = mainStub.innerHTML;
  contiene(html, 'Does Our School Run on Data?', '9.º: unidad real del trimestre listada');
  contiene(html, 'Wellbeing', '9.º: unidad de Activities listada');
  contiene(html, '1/2 weeks unlocked', '9.º: cuenta semanas abiertas de Activities (1 de 2)');
  contiene(html, 'Week 2 locked', '9.º: nombra la semana bloqueada de Activities, no solo el número');
  contiene(html, 'And Then There Were None', '9.º: libro asignado este año (Readers)');
  contiene(html, 'This term: FCE units 1-5.', '9.º: nota del plan de estudio');
  contiene(html, 'sees nothing (no rule for this grade)', '9.º: Fun for Nordic en inglés sin fila propia = no ve nada');
  contiene(html, 'A2 Key (KET), B1 Preliminary (PET)'.split(',')[0], 'no debería aparecer si FCE es el único abierto'); // sanity: no other level open
  contiene(html, 'B2 First (FCE)', '9.º: Main Suite lista FCE como abierto');

  window._apSeccion('A');
  html = mainStub.innerHTML;
  contiene(html, '🕒 exam window OPEN now (ch. 1)', '9.º A: ventana de examen del lector abierta ahora');
  contiene(html, 'Ana Ana', '9.º: excepción de student_access con el nombre del alumno');
  contiene(html, 'Beto Beto', '9.º: alumno con plan individual (EPI) listado');
  contiene(html, 'Edit in 🔓 Open Mocks', 'admin: ve el enlace de edición de Mocks');
  contiene(html, 'Edit in 👥 Users', 'admin: ve el enlace de edición de Users');

  console.log('\n2) Profesor (sin acceso a mock_access, RLS), grado 9');
  global.sb = makeSb(TABLES, 'mock_access');
  await window.accessPanel({ admin: false, grades: [9] });
  html = mainStub.innerHTML;
  contiene(html, 'not readable with your access', 'la fila de Mocks avisa que la tabla no es legible');
  contiene(html, '🏫 Classes', 'el resto del panel se sigue pintando aunque mock_access falle');
  noContiene(html, 'Edit in 🔓 Open Mocks', 'profesor: NO ve el enlace de Mocks (admin-only)');
  noContiene(html, 'Edit in 🔐 Access by grade', 'profesor: NO ve el enlace de Access by grade (admin-only)');
  noContiene(html, 'Edit in 👥 Users', 'profesor: NO ve el enlace de Users (admin-only)');
  contiene(html, 'Edit in 📚 Activate units', 'profesor: SÍ ve el enlace de Activate units');
  contiene(html, "_irTab('students')", 'profesor: el bloque Exceptions enlaza a Students, no a Users');

  console.log('\n3) render() puro: sin sb ni DOM, solo datos ya cargados');
  const gradosFalsos = [{ id: 9, name: 'G9' }];
  const datosFalsos = {
    na: [], naMap: {}, pa: [], paMap: {}, ma: [], maMap: {}, fun: [], yle: [],
    ra: [], rea: [], profs: [], sa: [], notaPorGrado: {},
  };
  const htmlPuro = window.accessPanel._render(true, gradosFalsos, datosFalsos, { grade: 9, section: '' });
  contiene(htmlPuro, '🏫 Classes', 'render() puro también trae las secciones esperadas');

  console.log('\n' + ok + ' aciertos, ' + mal + ' fallos.');
  process.exit(mal ? 1 : 0);
})().catch(e => { console.error('ERROR EN LA PRUEBA:', e); process.exit(1); });
