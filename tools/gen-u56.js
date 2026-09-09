/* Copia suelta de unidad56.html para la reunion: sin servidor y sin red.
   Incrusta scope-u56.js y la parte del Scope que la pagina comprueba.
   node tools/gen-u56.js <salida.html>                                    */
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(raiz, 'unidad56.html'), 'utf8');
const datos = fs.readFileSync(path.join(raiz, 'scope-u56.js'), 'utf8');
const scope = JSON.parse(fs.readFileSync(path.join(raiz, 'scope/scope-2026.json'), 'utf8'));

/* Solo lo que la comprobacion mira: los bloques de U5 y U6, de 1.o a 11.o. */
const min = {grados: scope.grados
  .filter(g => /^G([1-9]|1[01])$/.test(g.grado))
  .map(g => ({grado: g.grado, unidades: g.unidades.filter(u => u.n === 5 || u.n === 6)
    .map(u => ({n: u.n, bloques: u.bloques.map(b => ({bloque: b.bloque}))}))}))};

/* Y, para el recuadro de huecos de primaria, que areas tienen cargada cada
   semana de P5 y P6. Va el recuento, no el contenido: la pagina solo cuenta. */
const plan = JSON.parse(fs.readFileSync(path.join(raiz, 'scope/annual-plan-primary-2026.json'), 'utf8'));
const planMin = {grados: {}};
Object.keys(plan.grados || {}).forEach(gk => {
  planMin.grados[gk] = {periodos: (plan.grados[gk].periodos || [])
    .filter(p => p.periodo === 5 || p.periodo === 6)
    .map(p => ({periodo: p.periodo, semanas: (p.semanas || []).map(w => {
      const a = {};
      Object.keys(w.areas || {}).forEach(k => { if((w.areas[k] || []).length) a[k] = [1]; });
      return {areas: a};
    })}))};
});

/* Un '</script>' dentro del JSON cerraria el script que lo lleva. */
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

const salida = html
  .replace(/<script src="scope-u56\.js\?v=\d+"><\/script>/,
    '<script>' + datos + '</script>\n<script>window.__SCOPE = '
    + json(min) + ';\nwindow.__PLAN = ' + json(planMin) + ';</script>')
  .replace('<a id="back" href="project.html">&#8592; Volver</a>', '');

const destino = process.argv[2];
fs.writeFileSync(destino, salida);
console.log(path.basename(destino) + ' · ' + salida.length + ' bytes');
