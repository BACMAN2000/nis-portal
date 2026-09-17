#!/usr/bin/env node
/* Valida los archivos de un reader antes de publicarlo.
 *
 *   node tools/valida_reader.js <id> [capitulos] [a2|b1|b2|c1|extras]
 *
 * El tercer argumento limita la comprobacion a un solo archivo (para revisar
 * un nivel mientras los demas todavia no existen).
 *
 * Comprueba <id>-data-{a2,b1,b2,c1}.js y <id>-extras.js contra lo que el
 * motor (reader.html) y el examen (attwn-exam.html) esperan de verdad:
 * cuentas exactas de preguntas, indices dentro de rango, palabras del
 * vocabulario en mayusculas y sin espacios (crucigrama), READINGS que
 * Python pueda leer con ast.literal_eval (gen_reader_audio.py y
 * _check_readers_audio.py lo hacen asi), y el mismo numero de capitulos en
 * los cuatro niveles (el informe de notas y reader_exam_access lo dan por
 * hecho). Sale con codigo 1 si hay algun error.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const id = process.argv[2];
const NCAP = +process.argv[3] || 0;
const SOLO = (process.argv[4] || '').toLowerCase();
if (!id) { console.error('Uso: node tools/valida_reader.js <id> [capitulos] [a2|b1|b2|c1|extras]'); process.exit(2); }

const errs = [], warns = [];
const err = (f, m) => errs.push(f + ': ' + m);
const warn = (f, m) => warns.push(f + ': ' + m);

function load(file) {
  const ctx = { window: {}, document: { write() {} } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  return ctx.window;
}
const isStr = s => typeof s === 'string' && s.trim().length > 0;
const arr = (x, n) => Array.isArray(x) && (n == null || x.length === n);

/* Rango orientativo de palabras del read-along por capitulo en una obra con
   derechos (narracion propia, no adaptacion). Solo avisa. */
const WORDS = { A2: [220, 400], B1: [350, 550], B2: [500, 750], C1: [650, 1000] };

function validaData(level) {
  const f = `${id}-data-${level}.js`;
  const file = path.join(ROOT, f);
  if (!fs.existsSync(file)) { err(f, 'no existe'); return null; }
  let w;
  try { w = load(file); } catch (e) { err(f, 'no carga: ' + e.message); return null; }
  const D = w.ATTWN_DATA;
  if (!D) { err(f, 'no define window.ATTWN_DATA'); return null; }
  if (String(D.level).toLowerCase() !== level) err(f, `level es "${D.level}", esperaba ${level.toUpperCase()}`);
  if (!isStr(D.lead)) err(f, 'falta lead');
  const CH = D.CHAPTERS, R = D.READINGS, E = D.EVENTS;
  if (!Array.isArray(CH) || !CH.length) { err(f, 'CHAPTERS vacio'); return null; }
  if (NCAP && CH.length !== NCAP) err(f, `${CH.length} capitulos, esperaba ${NCAP}`);
  const lvl = level.toUpperCase();
  CH.forEach((c, i) => {
    const p = `${f} cap ${c.n}`;
    if (c.n !== i + 1) err(p, `n=${c.n} fuera de orden`);
    if (!isStr(c.title)) err(p, 'sin title');
    if (!isStr(c.sum) || c.sum.length < 60) err(p, 'sum corto o ausente');
    // vocab: 10-12, MAYUSCULAS A-Z (sin espacios ni guiones: crucigrama y sopa)
    if (!arr(c.vocab) || c.vocab.length < 10 || c.vocab.length > 14) err(p, `vocab tiene ${(c.vocab || []).length}, esperaba 10-12`);
    const seen = new Set();
    (c.vocab || []).forEach(v => {
      if (!arr(v, 2) || !isStr(v[0]) || !isStr(v[1])) return err(p, 'vocab: cada entrada es ["WORD","definition"]');
      if (!/^[A-Z]{3,12}$/.test(v[0])) err(p, `vocab "${v[0]}": solo A-Z, 3-12 letras, sin espacios`);
      if (seen.has(v[0])) err(p, `vocab repetida ${v[0]}`); seen.add(v[0]);
    });
    // comp: exactamente 8 [q,[4],idx,expl]
    if (!arr(c.comp, 8)) err(p, `comp tiene ${(c.comp || []).length}, esperaba 8`);
    (c.comp || []).forEach((q, k) => {
      if (!arr(q, 4) || !isStr(q[0]) || !arr(q[1], 4) || !(q[2] >= 0 && q[2] <= 3) || !isStr(q[3])) err(p, `comp[${k}] mal formada`);
    });
    // tf: exactamente 6 [s,bool,expl]
    if (!arr(c.tf, 6)) err(p, `tf tiene ${(c.tf || []).length}, esperaba 6`);
    (c.tf || []).forEach((q, k) => { if (!arr(q, 3) || typeof q[1] !== 'boolean' || !isStr(q[2])) err(p, `tf[${k}] mal formada`); });
    // rw: 6-8 [s,0|1|2,expl]
    if (!arr(c.rw) || c.rw.length < 6 || c.rw.length > 8) err(p, `rw tiene ${(c.rw || []).length}, esperaba 6-8`);
    (c.rw || []).forEach((q, k) => { if (!arr(q, 3) || ![0, 1, 2].includes(q[1]) || !isStr(q[2])) err(p, `rw[${k}] mal formada`); });
    if ((c.rw || []).filter(q => q[1] === 2).length < 1) warn(p, 'rw sin ningun "Doesn\'t say"');
    // halves: 6-8 [a,b]
    if (!arr(c.halves) || c.halves.length < 6 || c.halves.length > 8) err(p, `halves tiene ${(c.halves || []).length}, esperaba 6-8`);
    (c.halves || []).forEach((q, k) => { if (!arr(q, 2) || !isStr(q[0]) || !isStr(q[1])) err(p, `halves[${k}] mal formada`); });
    // odd: 5 [[4],idx,expl]
    if (!arr(c.odd, 5)) err(p, `odd tiene ${(c.odd || []).length}, esperaba 5`);
    (c.odd || []).forEach((q, k) => { if (!arr(q, 3) || !arr(q[0], 4) || !(q[1] >= 0 && q[1] <= 3) || !isStr(q[2])) err(p, `odd[${k}] mal formada`); });
    // gaps: {title, bank>=6, items 6 [sent ___, ans in bank]}
    const g = c.gaps || {};
    if (!isStr(g.title) || !arr(g.bank) || g.bank.length < 6 || !arr(g.items, 6)) err(p, 'gaps: title, bank(>=6) e items(6)');
    (g.items || []).forEach((q, k) => {
      if (!arr(q, 2) || !/___/.test(q[0])) return err(p, `gaps.items[${k}] sin ___`);
      if (!(g.bank || []).some(b => String(b).toLowerCase() === String(q[1]).toLowerCase())) err(p, `gaps.items[${k}] respuesta "${q[1]}" no esta en bank`);
    });
    // think
    const t = c.think || {};
    if (!isStr(t.quote) || !isStr(t.question) || !arr(t.options, 3) || !(t.answer >= 0 && t.answer <= 2) || !isStr(t.note)) err(p, 'think: quote, question, options(3), answer, note');
    // writing: 2 {task,target,tips(3),starters(4)}
    if (!arr(c.writing, 2)) err(p, `writing tiene ${(c.writing || []).length}, esperaba 2`);
    (c.writing || []).forEach((q, k) => {
      if (!isStr(q.task) || !isStr(q.target) || !arr(q.tips, 3) || !arr(q.starters, 4)) err(p, `writing[${k}]: task, target, tips(3), starters(4)`);
    });
    // B2/C1: wordform y opposites (8 pares)
    if (lvl === 'B2' || lvl === 'C1') {
      if (!arr(c.wordform) || c.wordform.length < 8) err(p, 'wordform: 8 pares [noun, adjective]');
      if (!arr(c.opposites) || c.opposites.length < 8) err(p, 'opposites: 8 pares [word, opposite]');
    }
    // READINGS del capitulo
    const paras = (R || {})[c.n];
    if (!arr(paras) || paras.length < 4) err(p, 'READINGS: al menos 4 parrafos');
    else {
      paras.forEach((x, k) => { if (!isStr(x)) err(p, `READINGS parrafo ${k} vacio`); });
      const text = paras.join(' ');
      const words = text.split(/\s+/).filter(Boolean).length;
      const [lo, hi] = WORDS[lvl] || [0, 1e9];
      if (words < lo || words > hi) warn(p, `READINGS ${words} palabras (orientativo ${lo}-${hi})`);
      // el listening saca 6 huecos de las palabras del vocabulario que aparecen en el texto
      const hits = (c.vocab || []).filter(v => new RegExp('\\b' + v[0] + 's?\\b', 'i').test(text)).length;
      if (hits < 6) err(p, `solo ${hits} palabras del vocab aparecen en READINGS (el Listening necesita 6)`);
      if (/^§/m.test(text)) warn(p, 'READINGS usa "§" (se narra en el audio)');
    }
    // EVENTS
    const ev = (E || {})[c.n];
    if (!ev || !arr(ev.ev, 6) || !arr(ev.keys, 6)) err(p, 'EVENTS: ev(6) y keys(6)');
    else ev.keys.forEach((k, i) => {
      if (!ev.ev.some(s => new RegExp('\\b' + k + '\\b', 'i').test(s))) err(p, `EVENTS key "${k}" no aparece en ningun evento`);
    });
  });
  // READINGS legible por Python (gen_reader_audio.py / _check_readers_audio.py)
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/const READINGS = (\{[\s\S]*?\n\})\s*;?\s*\n/);
  if (!m) err(f, 'no encuentro "const READINGS = {" … "\\n}" (formato que leen los .py)');
  else {
    const tmp = path.join(require('os').tmpdir(), `rdr_${id}_${level}.txt`);
    fs.writeFileSync(tmp, m[1], 'utf8');
    const py = spawnSync('python', ['-c', `import ast,io,sys;ast.literal_eval(io.open(sys.argv[1],encoding='utf-8').read())`, tmp], { encoding: 'utf8' });
    if (py.status !== 0) err(f, 'READINGS no es literal Python (comillas dobles, claves numericas, sin true/false/comentarios): ' + (py.stderr || '').trim().split('\n').pop());
    try { fs.unlinkSync(tmp); } catch (e) {}
  }
  return CH.length;
}

function validaExtras(ncap) {
  const f = `${id}-extras.js`;
  const file = path.join(ROOT, f);
  if (!fs.existsSync(file)) { err(f, 'no existe'); return; }
  let w;
  try { w = load(file); } catch (e) { err(f, 'no carga: ' + e.message); return; }
  const X = w.READER_EXTRAS;
  if (!X) { err(f, 'no define window.READER_EXTRAS'); return; }
  if (!arr(X.BIO) || X.BIO.length < 3) err(f, 'BIO: 3-5 parrafos');
  if (!arr(X.NUMBERS) || X.NUMBERS.length < 6) err(f, 'NUMBERS: >=6 [numero, que es]');
  const nch = (X.CHARACTERS || []).length;
  if (!arr(X.CHARACTERS) || nch < 6 || nch > 10) err(f, 'CHARACTERS: 6-10 [nombre, descripcion]');
  ['CHAR_ROLES', 'CHAR_SECRETS', 'CHAR_ICONS', 'CHAR_IMGS'].forEach(k => { if (!arr(X[k], nch)) err(f, `${k}: ${nch} entradas, una por personaje`); });
  if (!isStr(X.IMG_CREDIT)) err(f, 'IMG_CREDIT');
  const names = (X.CHARACTERS || []).map(c => c[0]);
  if (!arr(X.WHOSWHO) || X.WHOSWHO.length < 6) err(f, 'WHOSWHO: >=6 [pregunta, nombre]');
  (X.WHOSWHO || []).forEach((q, k) => { if (!names.some(n => n.includes(q[1]) || q[1].includes(n.split(' ')[0]))) warn(f, `WHOSWHO[${k}] "${q[1]}" no es un CHARACTERS`); });
  if (!arr(X.BOOK_WORDS) || X.BOOK_WORDS.length < 10) err(f, 'BOOK_WORDS: >=10 [WORD, def]');
  const G = X.GRAMMAR || {};
  if (!isStr(G.title) || !isStr(G.intro) || !arr(G.examples) || G.examples.length < 3 || !arr(G.items, 8)) err(f, 'GRAMMAR: title, intro, examples(>=3), items(8)');
  (G.items || []).forEach((q, k) => { if (!arr(q, 4) || !arr(q[1], 4) || !(q[2] >= 0 && q[2] <= 3)) err(f, `GRAMMAR.items[${k}] = [q,[4],idx,expl]`); });
  if (!arr(X.CHAR_TASKS) || X.CHAR_TASKS.length < 4) err(f, 'CHAR_TASKS: >=4 {task,target,tips,starters}');
  const T = X.THEME || {};
  ['emoji', 'plateTitle', 'rhyme', 'doneLine', 'leftWordSingular', 'leftWordPlural'].forEach(k => { if (!isStr(T[k])) err(f, 'THEME.' + k); });
  if (ncap && T.tokens !== ncap) err(f, `THEME.tokens=${T.tokens}, esperaba ${ncap}`);
  const C = X.C2 || {};
  if (!isStr(C.intro) || !isStr(C.source) || !isStr(C.sourceLabel)) err(f, 'C2: intro, source, sourceLabel');
  if (!arr(C.stages) || (ncap && C.stages.length !== ncap)) err(f, `C2.stages: ${ncap || 'N'} etapas`);
  (C.stages || []).forEach((s, k) => { if (!isStr(s.orig) || s.app !== k + 1 || !isStr(s.focus) || !arr(s.qs) || s.qs.length < 2) err(f, `C2.stages[${k}]: orig, app=${k + 1}, focus, qs(>=2)`); });
  if (!arr(C.tasks, 4)) err(f, 'C2.tasks: 4');
  if (!arr(X.EXAM_CH1, 8)) err(f, 'EXAM_CH1: 8 [seccion, q, [4], idx, expl]');
  (X.EXAM_CH1 || []).forEach((q, k) => { if (!arr(q, 5) || !arr(q[2], 4) || !(q[3] >= 0 && q[3] <= 3)) err(f, `EXAM_CH1[${k}] mal formada`); });
  // Bloques opcionales, pero si estan tienen que estar enteros
  if (X.KEY) {
    const K = X.KEY;
    if (!K.part1 || !arr(K.part1.notices, 8) || !arr(K.part1.items, 6)) err(f, 'KEY.part1: notices(8) e items(6)');
    if (!K.part3 || !arr(K.part3.lines) || !arr(K.part3.bank, 10) || !arr(K.part3.answers, 8)) err(f, 'KEY.part3: lines, bank(10), answers(8)');
    if (!K.part4 || !arr(K.part4.text) || !arr(K.part4.items) || K.part4.items.length < 7) err(f, 'KEY.part4: text[], items(7-9)');
    if (!K.part6 || !arr(K.part6.items) || K.part6.items.length < 6) err(f, 'KEY.part6: items(>=6)');
    if (!K.part7 || !isStr(K.part7.text) || !arr(K.part7.answers)) err(f, 'KEY.part7: text, answers');
    else { const n = (K.part7.text.match(/\(\d+\)___/g) || []).length; if (n !== K.part7.answers.length) err(f, `KEY.part7: ${n} huecos y ${K.part7.answers.length} respuestas`); }
    if (!K.part8 || !K.part8.card || !arr(K.part8.items) || K.part8.items.length < 6) err(f, 'KEY.part8: card, items(>=6)');
  }
  if (X.TRINITY) X.TRINITY.forEach((t, k) => { if (!isStr(t.grade) || !isStr(t.topic) || !isStr(t.lead) || !arr(t.qs) || t.qs.length < 4) err(f, `TRINITY[${k}]`); });
  if (X.SURF) X.SURF.forEach((t, k) => { if (!isStr(t.title) || !isStr(t.intro) || !arr(t.qs) || t.qs.length < 4) err(f, `SURF[${k}]`); });
  if (X.VALUES) {
    const V = X.VALUES;
    if (!arr(V.cloud) || V.cloud.length < 12 || !arr(V.good) || !arr(V.chapters)) err(f, 'VALUES: cloud, good, chapters');
    if (ncap && (V.chapters || []).length !== ncap) err(f, `VALUES.chapters: ${ncap}`);
    (V.good || []).forEach(g => { if (!(V.cloud || []).includes(g)) err(f, `VALUES.good "${g}" no esta en cloud`); });
  }
}

const counts = {};
['a2', 'b1', 'b2', 'c1'].filter(l => !SOLO || SOLO === l).forEach(l => { const n = validaData(l); if (n) counts[l] = n; });
const ns = [...new Set(Object.values(counts))];
if (ns.length > 1) err(id, 'los niveles no tienen el mismo numero de capitulos: ' + JSON.stringify(counts));
if (!SOLO || SOLO === 'extras') validaExtras(NCAP || ns[0]);

warns.forEach(w => console.log('  aviso  ' + w));
errs.forEach(e => console.log('  ERROR  ' + e));
console.log(`${id}: ${errs.length} errores, ${warns.length} avisos` + (ns.length === 1 ? ` · ${ns[0]} capitulos en ${Object.keys(counts).join('/')}` : ''));
process.exit(errs.length ? 1 : 0);
