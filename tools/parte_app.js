/* Parte app.js en módulos (17-sep-2026) SIN cambiar una sola línea de código:
   los trozos, concatenados en orden, son byte a byte el app.js original —
   salvo `init();`, que pasa del arranque al último archivo (99-boot.js) para
   que todo esté declarado antes de que corra (con varios <script> el await
   de la sesión podría resolverse antes de que cargue el archivo que declara
   renderAdmin/renderStudent).

   Los archivos son scripts clásicos, no módulos ES: comparten el ámbito
   global igual que antes (const/let de primer nivel y function declarations
   se ven entre archivos), así que access-panel.js, overview-panel.js y los
   demás siguen encontrando sb, esc, $, state, GRADES, nodeVisible…

   Lo único que puede romperse al partir es una referencia a una función
   declarada en un archivo POSTERIOR desde código que se ejecuta AL CARGAR
   (en un solo archivo el hoisting la salvaba). Por eso, tras partir, se
   comprueba cada sentencia de primer nivel que no sea una declaración de
   función: cualquier identificador que resuelva a algo declarado en un
   archivo posterior se lista y el partido falla.

   Uso: node tools/parte_app.js [--check]   (--check no escribe; solo verifica
   que app/*.js concatenados == app.js y que no hay referencias adelantadas) */
const fs = require('fs'), path = require('path');
const acorn = require(path.join(__dirname, 'qa', 'node_modules', 'acorn'));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'app.js');
const OUT = path.join(ROOT, 'app');
const CHECK = process.argv.includes('--check');

/* Cada archivo empieza en la PRIMERA sentencia de primer nivel que se nombra;
   los comentarios y líneas en blanco que la preceden van con ella. */
const CORTES = [
  ['00-core.js',            null],                  // config, sb, helpers, arranque, sesión, shell y menú
  ['10-cursos.js',          'ayudaBody'],           // cuerpos embebidos, Fun for Nordic, Nordic Ascent, francés, apps de léxico
  ['20-auth.js',            'renderAuth'],          // login, alta, recuperación de clave
  ['30-admin.js',           'renderAdmin'],         // panel del admin: usuarios, accesos, profesores, estadísticas
  ['40-marking.js',         'resultsFilter'],       // lecturas, niveles, exámenes de unidad, Fun for Nordic (entregas)
  ['50-teacher.js',         'renderTeacher'],       // panel del profesor, resultados, corrección de Writing
  ['60-student-hub.js',     'SEC_COURSES'],         // alumno: portada, pistas, nodos de acceso, Cambridge, plan de estudio
  ['61-student-classes.js', 'ACCESS_NODES'],        // alumno: clases por grado, lecturas, actividades, router, Mi progreso
  ['70-cefr.js',            'SCALE_RANGE'],         // escala Cambridge, resultado final, Speaking, informe PDF
  ['80-unidades.js',        'UNIT_CRIT'],           // productos de unidad, planes, materiales, fichas, docx
  ['85-correccion.js',      '_corr'],               // corrección de fichas y de producciones escritas
  ['90-tiempo.js',          '_tp'],                 // tiempo de pantalla
];

/* app.js dejó de existir en el repo al partirlo (último commit con él:
   31c589fe); para volver a comprobar que app/ lo reproduce, se lee de git. */
const src = fs.existsSync(SRC) ? fs.readFileSync(SRC, 'utf8')
  : require('child_process').execSync('git show 31c589fe:app.js', { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }).toString('utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', locations: true });
const body = ast.body;
const nombreDe = st => st.type === 'FunctionDeclaration' ? st.id.name
  : st.type === 'VariableDeclaration' ? (st.declarations[0].id.name || null) : null;

/* Índices de corte: la sentencia con ese nombre; el trozo empieza justo
   después de la sentencia anterior (para llevarse sus comentarios). */
const lineas = src.split('\n');
const offsetLinea = []; { let o = 0; for (const l of lineas) { offsetLinea.push(o); o += l.length + 1; } }
const inicios = CORTES.map(([f, nombre], i) => {
  if (i === 0) return 0;
  const k = body.findIndex(st => nombreDe(st) === nombre);
  if (k < 0) throw new Error('no encuentro la sentencia ' + nombre);
  return body[k - 1].end;   // fin de la sentencia anterior (los comentarios siguientes van al nuevo trozo)
});
const trozos = CORTES.map(([f], i) => ({ f, texto: src.slice(inicios[i], i + 1 < inicios.length ? inicios[i + 1] : src.length) }));

/* init(); sale del core y va al boot. */
const INIT = /^init\(\);\r?\n/m;
if (!INIT.test(trozos[0].texto)) throw new Error('no encuentro init(); en el core');
const nl = trozos[0].texto.includes('\r\n') ? '\r\n' : '\n';
trozos[0].texto = trozos[0].texto.replace(INIT, '/* init(); arranca en app/99-boot.js, cuando todo está declarado. */' + nl);
trozos.push({ f: '99-boot.js', texto: '/* Arranque del portal: va el último para que todos los módulos de app/ estén declarados. */' + nl + 'init();' + nl });

/* 1) Reconstrucción: los trozos, sin la nota de init y el boot, dan el original. */
const rec = trozos.slice(0, -1).map(t => t.texto).join('').replace('/* init(); arranca en app/99-boot.js, cuando todo está declarado. */' + nl, 'init();' + nl);
if (rec !== src) throw new Error('los trozos concatenados NO reproducen app.js');

/* 2) Referencias adelantadas: quién declara qué, y en qué archivo. */
const declaraEn = new Map();   // nombre -> índice de archivo
const porArchivo = trozos.map(t => { try { return acorn.parse(t.texto, { ecmaVersion: 'latest', sourceType: 'script', locations: true }); } catch (e) { throw new Error(t.f + ': ' + e.message); } });
porArchivo.forEach((a, i) => a.body.forEach(st => {
  if (st.type === 'FunctionDeclaration') declaraEn.set(st.id.name, i);
  else if (st.type === 'VariableDeclaration') st.declarations.forEach(d => { if (d.id.type === 'Identifier') declaraEn.set(d.id.name, i); });
  else if (st.type === 'ClassDeclaration') declaraEn.set(st.id.name, i);
}));
function identificadores(node, out, saltaFunciones) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'Identifier') { out.add(node.name); return; }
  if (saltaFunciones && (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression')) return;
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'start' || k === 'end') continue;
    const v = node[k];
    if (Array.isArray(v)) v.forEach(x => identificadores(x, out, saltaFunciones));
    else if (v && typeof v.type === 'string') identificadores(v, out, saltaFunciones);
  }
}
const problemas = [], avisos = [];
porArchivo.forEach((a, i) => a.body.forEach(st => {
  if (st.type === 'FunctionDeclaration') return;
  // lo que se ejecuta seguro al cargar: la sentencia sin sus funciones internas
  const seguro = new Set(); identificadores(st, seguro, true);
  // lo que podría ejecutarse al cargar si una callback se invoca en el acto (forEach, map…)
  const todo = new Set(); identificadores(st, todo, false);
  for (const n of seguro) { const j = declaraEn.get(n); if (j != null && j > i) problemas.push(`${trozos[i].f}:${st.loc.start.line} usa «${n}» declarado en ${trozos[j].f}`); }
  for (const n of todo) { if (seguro.has(n)) continue; const j = declaraEn.get(n); if (j != null && j > i) avisos.push(`${trozos[i].f}:${st.loc.start.line} una callback usa «${n}» declarado en ${trozos[j].f} (revisar: ¿se invoca al cargar?)`); }
}));
if (avisos.length) console.log('Avisos (callbacks):\n  ' + avisos.join('\n  '));
if (problemas.length) { console.error('✗ Referencias adelantadas:\n  ' + problemas.join('\n  ')); process.exit(1); }

console.log(trozos.map(t => `${t.f.padEnd(24)} ${String(t.texto.split('\n').length).padStart(5)} líneas`).join('\n'));
console.log('✓ concatenación idéntica · sin referencias adelantadas');
if (CHECK) process.exit(0);
fs.mkdirSync(OUT, { recursive: true });
for (const t of trozos) fs.writeFileSync(path.join(OUT, t.f), t.texto);
console.log('escritos', trozos.length, 'archivos en app/');
