/* Barrido de project-models.js contra project-arcs.js.
 *
 * Contesta a una sola pregunta: hay UN modelo por cada semana que el arco
 * declara, y ninguno de mas? Si un dia coordinacion anade una semana a un
 * arco, esto lo dice en vez de dejar un hueco silencioso en la pagina.
 *
 * Comprueba ademas: que el tipo de lamina exista en project-art.js, que todo
 * par bilingue este completo (nunca {en} sin {es}) y que cada semana traiga
 * frase de aliento, partes y linea de mejora.
 *
 *   node tools/audita_modelos.js
 */
const path = require('path');
const raiz = path.join(__dirname, '..');

global.window = {};
require(path.join(raiz, 'project-arcs.js'));
require(path.join(raiz, 'project-art.js'));
require(path.join(raiz, 'project-models.js'));

const ARCS = window.PROJECT_ARCS, MOD = window.PROJECT_MODELS;
const TIPOS = new Set(window.MODELO_TIPOS);
/* Los alias viven dentro del cierre de project-art.js, asi que la unica forma
   honesta de comprobar un tipo es dibujarlo y ver si sale la lamina generica
   sin que el tipo sea "hoja". */
function tipoValido(t){
  if(TIPOS.has(t)) return true;
  const svg = window.modeloSVG({tipo: t, titulo: 'x', partes: ['a']}, {});
  const gen = window.modeloSVG({tipo: '__no_existe__', titulo: 'x', partes: ['a']}, {});
  return svg !== gen;
}

const problemas = [];
const P = (k, msg) => problemas.push(k + ': ' + msg);

function bilingue(k, campo, v){
  if(v == null) return P(k, campo + ' vacio');
  if(typeof v === 'string') return;            /* nombre propio: correcto */
  if(!v.en || !v.es) P(k, campo + ' es un par incompleto');
}

let semanas = 0, arcos = 0;
Object.keys(ARCS).forEach(k => {
  const a = ARCS[k], m = MOD[k];
  if(!m) return P(k, 'no tiene modelos');
  arcos++;
  const esperadas = a.fases.map(f => f.n);
  const tiene = Object.keys(m.semanas).map(Number).sort((x, y) => x - y);
  esperadas.forEach(n => { if(tiene.indexOf(n) < 0) P(k, 'falta el modelo de la semana ' + n); });
  tiene.forEach(n => { if(esperadas.indexOf(n) < 0) P(k, 'sobra un modelo para la semana ' + n); });
  if(a.semanas !== esperadas.length) P(k, 'el arco dice ' + a.semanas + ' semanas y tiene ' + esperadas.length + ' fases');

  ['tipo', 'titulo', 'que', 'partes', 'mejora'].forEach(c => {
    if(m.final[c] == null) P(k, 'el producto final no tiene ' + c);
  });
  if(!tipoValido(m.final.tipo)) P(k, 'el producto final usa un tipo que no se dibuja: ' + m.final.tipo);
  bilingue(k, 'final.que', m.final.que);
  bilingue(k, 'final.mejora', m.final.mejora);

  tiene.forEach(n => {
    const s = m.semanas[n], id = k + ' W' + n;
    semanas++;
    if(!s.aliento) P(id, 'sin frase de aliento');
    else bilingue(id, 'aliento', s.aliento);
    const mo = s.modelo || {};
    if(!tipoValido(mo.tipo)) P(id, 'tipo de lamina desconocido: ' + mo.tipo);
    if(!mo.titulo) P(id, 'el modelo no tiene titulo');
    bilingue(id, 'modelo.que', mo.que);
    bilingue(id, 'modelo.mejora', mo.mejora);
    if(!mo.partes || mo.partes.length < 2) P(id, 'el modelo tiene menos de 2 partes');
    (mo.partes || []).forEach((x, i) => bilingue(id, 'parte ' + (i + 1), x));
    if(!mo.apoyo || !mo.apoyo.length) P(id, 'sin frases de apoyo en ingles');
    (mo.apoyo || []).forEach(x => { if(typeof x !== 'string') P(id, 'una frase de apoyo no es texto plano'); });
  });
});

Object.keys(MOD).forEach(k => { if(!ARCS[k]) P(k, 'hay modelos de un arco que no existe'); });

console.log(arcos + ' arcos, ' + semanas + ' semanas con modelo.');
if(problemas.length){
  console.log('\n' + problemas.length + ' problemas:');
  problemas.forEach(x => console.log('  - ' + x));
  process.exit(1);
}
console.log('Sin problemas.');
