/* Barrido de project-arcs-sec.js contra el documento del colegio.
 *
 * La regla del proyecto es que las conexiones se proponen SOBRE contenidos
 * que el colegio tiene cargados. Esto comprueba justo eso:
 *
 *   - que cada proyecto tiene su documento en secundaria-conexiones-2026.json,
 *   - que toda area con conexion propuesta tiene contenido cargado ahi
 *     (si no, la propuesta se apoya en el aire),
 *   - que ninguna area con contenido se queda sin conexion sin decirlo,
 *   - que las semanas van de 1 a 6 y cada una trae foco, evidencia, tipo y aliento,
 *   - que el tipo de lamina existe en project-art.js.
 *
 *   node tools/audita_sec.js
 */
const path = require('path');
const raiz = path.join(__dirname, '..');

global.window = {};
require(path.join(raiz, 'project-art.js'));
require(path.join(raiz, 'project-arcs-sec.js'));
const DOC = require(path.join(raiz, 'scope', 'secundaria-conexiones-2026.json'));

const P = window.PROJECT_SEC;
const clave = window.PROJECT_SEC_AREA_KEY;
const TIPOS = new Set(window.MODELO_TIPOS);
function tipoValido(t){
  if(TIPOS.has(t)) return true;
  const a = window.modeloSVG({tipo: t, titulo: 'x', partes: ['a']}, {});
  const b = window.modeloSVG({tipo: '__no__', titulo: 'x', partes: ['a']}, {});
  return a !== b;
}

/* Indexa el documento del colegio por grado+unidad -> {clave: contenidos[]} */
const CONT = {};
DOC.proyectos.forEach(pr => {
  Object.keys(pr.grados).forEach(g => {
    const m = {};
    pr.grados[g].areas.forEach(a => {
      const k = clave(a.area);
      if(!k){ m['__desconocida__' + a.area] = a.contenidos; return; }
      m[k] = (m[k] || []).concat(a.contenidos);
    });
    CONT['g' + g + '.u' + pr.unidad] = m;
  });
});

const problemas = [], avisos = [];
let nProy = 0, nSem = 0, nCon = 0;

Object.keys(P).forEach(k => {
  const p = P[k];
  nProy++;
  const doc = CONT[k];
  if(!doc){ problemas.push(k + ': no hay documento del colegio para ese grado y unidad'); return; }

  Object.keys(p.areas || {}).forEach(a => {
    nCon++;
    const c = doc[a];
    if(!c) return avisos.push(k + ': se propone conexión para ' + a + ' y esa área no aparece en el documento');
    if(!c.length) avisos.push(k + ': se propone conexión para ' + a + ' y su contenido está VACÍO en el documento');
  });
  Object.keys(doc).forEach(a => {
    if(a.indexOf('__desconocida__') === 0)
      return avisos.push(k + ': el documento trae un área que no sé normalizar: ' + a.slice(15));
    if(doc[a].length && !(p.areas || {})[a])
      avisos.push(k + ': ' + a + ' tiene contenido cargado y no recibe conexión');
  });

  if(!p.titulo || !p.preguntaEsencial || !p.situacion) problemas.push(k + ': le falta título, pregunta o situación');
  if(!p.producto || !p.producto.modelo) problemas.push(k + ': sin producto o sin modelo del producto');
  else if(!tipoValido(p.producto.modelo.tipo)) problemas.push(k + ': el producto usa un tipo de lámina desconocido: ' + p.producto.modelo.tipo);
  if(!(p.tematicas || []).length) problemas.push(k + ': sin temáticas comunes');
  if(!(p.evaluacion || []).length) problemas.push(k + ': sin evaluación');

  const ns = (p.semanas || []).map(s => s.n);
  for(let i = 1; i <= 6; i++) if(ns.indexOf(i) < 0) problemas.push(k + ': falta la semana ' + i);
  (p.semanas || []).forEach(s => {
    nSem++;
    const id = k + ' W' + s.n;
    if(!s.foco || !s.evidencia) problemas.push(id + ': sin foco o sin evidencia');
    if(!s.aliento) problemas.push(id + ': sin frase de aliento');
    if(!tipoValido(s.tipo)) problemas.push(id + ': tipo de lámina desconocido: ' + s.tipo);
  });
});

console.log(nProy + ' proyectos, ' + nSem + ' semanas, ' + nCon + ' conexiones propuestas.');
if(avisos.length){
  console.log('\n' + avisos.length + ' avisos (no rompen nada, pero conviene mirarlos):');
  avisos.forEach(x => console.log('  · ' + x));
}
if(problemas.length){
  console.log('\n' + problemas.length + ' problemas:');
  problemas.forEach(x => console.log('  - ' + x));
  process.exit(1);
}
console.log('\nSin problemas.');
