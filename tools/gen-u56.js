/* Copia suelta de unidad56.html para la reunion: sin servidor y sin red.
   Incrusta scope-u56.js y la parte del Scope que la pagina comprueba.
   node tools/gen-u56.js <salida.html>                                    */
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(raiz, 'unidad56.html'), 'utf8');
const datos = fs.readFileSync(path.join(raiz, 'scope-u56.js'), 'utf8');
const scope = JSON.parse(fs.readFileSync(path.join(raiz, 'scope/scope-2026.json'), 'utf8'));

/* Solo lo que la comprobacion mira: los bloques de U5 y U6 de 6.o a 11.o. */
const min = {grados: scope.grados
  .filter(g => ['G6','G7','G8','G9','G10','G11'].indexOf(g.grado) >= 0)
  .map(g => ({grado: g.grado, unidades: g.unidades.filter(u => u.n === 5 || u.n === 6)
    .map(u => ({n: u.n, bloques: u.bloques.map(b => ({bloque: b.bloque}))}))}))};

const salida = html
  .replace('<script src="scope-u56.js?v=1"></script>',
    '<script>' + datos + '</script>\n<script>window.__SCOPE = '
    + JSON.stringify(min).replace(/</g, '\u003c') + ';</script>')
  .replace('<a id="back" href="project.html">&#8592; Volver</a>', '');

const destino = process.argv[2];
fs.writeFileSync(destino, salida);
console.log(path.basename(destino) + ' · ' + salida.length + ' bytes');
