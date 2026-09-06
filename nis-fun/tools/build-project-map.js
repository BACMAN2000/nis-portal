/* Capa de integración PROYECTO ↔ CURSO (primaria).
 *
 * Genera nis-fun/content/project-map.json a partir de dos fuentes REALES, sin
 * inventar nada:
 *   1) ../../project-arcs.js  — los 13 arcos de proyecto interdisciplinar de
 *      primaria (nis-portal/project-arcs.js), con su título, el nombre real del
 *      proyecto en Toddle por periodo, la pregunta esencial, la pregunta guía de
 *      inglés (orientadoras.english) y el producto final.
 *   2) nis-fun/content/<nivel>/unit-*.json — cada unidad trae scope.grado y
 *      scope.temaN (1..6). En el calendario del colegio temaN = periodo (P1..P6),
 *      y un arco ocupa dos periodos (un trimestre). Así, la unidad de un grado y
 *      un temaN se vincula al arco cuyo periodo coincide.
 *
 * Mapeo grado↔nivel (por scope.grado): Starters=G1+G2, Movers=G3+G4, Flyers=G5.
 * Donde un periodo NO tiene arco (G1 P5/P6; G5 P3/P6, que están en
 * PROJECT_ARCS_SUELTOS) simplemente no se emite entrada: la app no muestra
 * puente para esa unidad (regla «nada incompleto en vivo»).
 *
 *   node nis-fun/tools/build-project-map.js
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');           // nis-portal
const NISFUN = path.resolve(__dirname, '..');               // nis-fun

// 1) cargar los arcos reales
global.window = {};
require(path.join(RAIZ, 'project-arcs.js'));
const ARCS = global.window.PROJECT_ARCS;

const pick = (x) => (x && typeof x === 'object' && 'en' in x) ? x : { en: x, es: x };
const both = (x) => { const p = pick(x); return { en: p.en, es: p.es }; };

// 2) recorrer las unidades de Fun for Nordic y quedarnos con grado+temaN+tema
const gradeThemes = {};   // { G1: { 1: {tema, level, units:[n...]} } }
for (const level of ['starters', 'movers', 'flyers']) {
  const dir = path.join(NISFUN, 'content', level);
  for (const f of fs.readdirSync(dir).filter(f => /^unit-\d+\.json$/.test(f))) {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const sc = d.scope || {};
    if (!sc.grado || !sc.temaN) continue;
    (gradeThemes[sc.grado] = gradeThemes[sc.grado] || {});
    const slot = (gradeThemes[sc.grado][sc.temaN] = gradeThemes[sc.grado][sc.temaN] || { tema: sc.tema, level, units: [] });
    slot.units.push(d.number);
  }
}

// 3) por cada arco y cada periodo suyo, emitir la entrada del grado+temaN
const map = {};   // { G1: { "1": {...} } }
for (const arcId of Object.keys(ARCS)) {
  const a = ARCS[arcId];
  const G = (a.grade || '').toUpperCase();            // g3 -> G3
  const periodos = a.periodos || [];
  for (const per of periodos) {
    const themes = gradeThemes[G] && gradeThemes[G][per];
    if (!themes) continue;                            // no hay unidad de curso ahí
    // el proyecto Toddle de ESE periodo (más preciso que el arco entero)
    const tod = (a.toddle || []).find(t => t.periodo === per);
    map[G] = map[G] || {};
    map[G][String(per)] = {
      arc: arcId,
      icon: (a.cover && a.cover.icon) || '🧭',
      grad: a.cover ? { from: a.cover.from, to: a.cover.to } : null,
      trimestre: a.trimestre,
      periodo: per,
      arcTitle: both(a.titulo),
      arcSubtitle: a.subtitulo ? both(a.subtitulo) : null,
      toddle: tod ? tod.nombre : null,                // nombre real en Toddle (mismo en los dos idiomas)
      essentialQ: a.preguntaEsencial ? both(a.preguntaEsencial) : null,
      englishMission: a.orientadoras && a.orientadoras.english ? both(a.orientadoras.english) : null,
      product: a.producto && a.producto.titulo ? both(a.producto.titulo) : null,
      unitTheme: themes.tema,                          // el tema de lengua de esa unidad
      // contribución: conecta el tema de lengua con la misión de inglés del proyecto,
      // compuesta solo con campos reales del arco (no inventa objetivos).
      contribution: {
        en: `The English in this unit (theme: “${themes.tema}”) is the language you use in the school project “${(tod ? tod.nombre : pick(a.titulo).en)}”. Your English mission: ${a.orientadoras && a.orientadoras.english ? pick(a.orientadoras.english).en : '—'}${a.producto && a.producto.titulo ? ` — building toward the ${pick(a.producto.titulo).en}.` : '.'}`,
        es: `El inglés de esta unidad (tema: «${themes.tema}») es la lengua que usas en el proyecto del colegio «${(tod ? tod.nombre : pick(a.titulo).es)}». Tu misión de inglés: ${a.orientadoras && a.orientadoras.english ? pick(a.orientadoras.english).es : '—'}${a.producto && a.producto.titulo ? ` — para construir el ${pick(a.producto.titulo).es}.` : '.'}`
      }
    };
  }
}

const out = path.join(NISFUN, 'content', 'project-map.json');
fs.writeFileSync(out, JSON.stringify(map, null, 1), 'utf8');

// resumen en consola
let n = 0;
for (const G of Object.keys(map)) { for (const p of Object.keys(map[G])) n++; }
console.log('project-map.json escrito:', out);
for (const G of ['G1', 'G2', 'G3', 'G4', 'G5']) {
  const periods = map[G] ? Object.keys(map[G]).sort() : [];
  const total = gradeThemes[G] ? Object.keys(gradeThemes[G]).length : 0;
  console.log(`  ${G}: periodos con proyecto = [${periods.join(',')}] de ${total} temas`);
}
console.log('total vínculos:', n);
