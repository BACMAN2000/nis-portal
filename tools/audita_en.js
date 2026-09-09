/* Comprueba que la traduccion inglesa de los arcos del trimestre no deja
   ninguna linea del castellano sin par. Es lo que sostiene la frase "los
   documentos estan tambien en ingles" delante de una head de nivel: si falla,
   la frase es falsa.

   node tools/audita_en.js                                                 */
global.window = {};
['../project-arcs.js', '../project-cursos.js', '../project-cursos-en.js',
 '../project-arcs-sec.js', '../project-arcs-sec11.js', '../project-arcs-sec11-en.js',
 '../scope-u56.js', '../scope-u56-en.js'].forEach(f => require(__dirname + '/' + f));

const A = window.PROJECT_ARCS, C = window.PROJECT_ARCS_CURSOS, CE = window.PROJECT_CURSOS_EN;
const S = window.PROJECT_SEC11, SE = window.SEC11_EN;
const U = window.SCOPE_U56, UE = window.SCOPE_U56_EN;

let fallos = 0, tareas = 0;
const mal = m => { console.log('X  ' + m); fallos++; };

/* ---- primaria: la tarea de cada curso en cada semana ---- */
['g1.t3', 'g2.t3', 'g3.t3', 'g4.t3', 'g5.p4p5', 'g5.t3'].forEach(k => {
  const a = A[k], cu = C[k] || {}, b = CE[k];
  if (!b) return mal(k + ': no hay traduccion');
  let n = 0;
  a.fases.forEach(f => {
    const o = f.cursos || cu[f.n] || {}, t = (b.semanas || {})[f.n] || {};
    Object.keys(o).forEach(c => {
      n++; tareas++;
      if (!t[c]) mal(k + ' w' + f.n + ' ' + c + ': sin traducir');
    });
  });
  console.log('ok ' + k.padEnd(9) + n + ' tareas de curso');
});

/* ---- secundaria: tareas, notas, integra, rubrica y lo que hay que decidir ---- */
[6, 7, 8, 9, 10, 11].forEach(g => {
  const k = 'g' + g + '.t3', a = S[k], b = SE[k];
  if (!b) return mal(k + ': no hay traduccion');
  let n = 0;
  a.semanas.forEach(w => {
    const t = (b.semanas || {})[w.n] || {};
    Object.keys(w.cursos || {}).forEach(c => {
      n++; tareas++;
      if (!(t.cursos || {})[c]) mal(k + ' w' + w.n + ' ' + c + ': sin traducir');
    });
    if (w.nota && !t.nota) mal(k + ' w' + w.n + ': nota sin traducir');
  });
  if (a.producto.integra.length !== Object.keys(b.integra || {}).length) mal(k + ': integra descuadrado');
  if (a.evaluacion.length !== (b.evaluacion || []).length) mal(k + ': rubrica descuadrada');
  if (a.revisar.length !== (b.revisar || []).length) mal(k + ': revisar descuadrado');
  if (!b.situacion) mal(k + ': situacion sin traducir');
  console.log('ok ' + k.padEnd(9) + n + ' tareas de curso');
});

/* ---- la propuesta de las once semanas ---- */
Object.keys(U.grados).forEach(g => {
  const a = U.grados[g], b = (UE.grados || {})[g];
  if (!b) return mal('propuesta grado ' + g + ': sin traducir');
  if (a.semanas.length !== (b.semanas || []).length) mal('propuesta grado ' + g + ': semanas descuadradas');
  if (a.gana.length !== (b.gana || []).length) mal('propuesta grado ' + g + ': gana descuadrado');
});
console.log('ok propuesta  ' + Object.keys(U.grados).length + ' grados, 121 semanas');

console.log(fallos ? '\n' + fallos + ' cosas sin traducir'
  : '\nTraducido y cuadrado: ' + tareas + ' tareas de curso en los 12 arcos del trimestre, mas la propuesta.');
process.exit(fallos ? 1 : 0);
