/* Comprueba que la unidad fusionada de once semanas (scope-u56.js) no deja
   fuera ningun bloque del Scope de U5 ni de U6. Es lo que sostiene la frase
   "no se pierde nada" delante de coordinacion: si falla, la frase es falsa.

   node tools/audita_u56.js                                                */
const fs = require('fs');
global.window = {};
require('../scope-u56.js');
const SCOPE = JSON.parse(fs.readFileSync(__dirname + '/../scope/scope-2026.json', 'utf8'));
const U = window.SCOPE_U56;

let fallos = 0, total = 0;
Object.keys(U.grados).forEach(g => {
  const d = U.grados[g];
  const gs = SCOPE.grados.find(x => x.grado === 'G' + g);
  /* Todo lo que el Scope declara para U5 y U6 de este grado. */
  const esperado = [];
  [5, 6].forEach(n => (gs.unidades.find(u => u.n === n) || {bloques: []}).bloques
    .forEach(b => esperado.push('U' + n + ':' + b.bloque)));
  const cubierto = {};
  d.semanas.forEach(s => (s.cubre || []).forEach(x => { cubierto[x] = (cubierto[x] || 0) + 1; }));

  const falta = esperado.filter(x => !cubierto[x]);
  const sobra = Object.keys(cubierto).filter(x => esperado.indexOf(x) < 0);
  total += esperado.length;
  if (falta.length || sobra.length || d.semanas.length !== 11) {
    fallos++;
    console.log('X  ' + g + '.o  semanas=' + d.semanas.length
      + (falta.length ? '  SIN CUBRIR: ' + falta.join(', ') : '')
      + (sobra.length ? '  NO ESTA EN EL SCOPE: ' + sobra.join(', ') : ''));
  } else {
    console.log('ok ' + g + '.o  11 semanas  ' + esperado.length + '/' + esperado.length + ' bloques del Scope cubiertos');
  }
});
console.log(fallos ? '\n' + fallos + ' grado(s) con problemas' : '\nTodo cubierto: ' + total + ' bloques de U5 y U6 en los seis grados.');
process.exit(fallos ? 1 : 0);
