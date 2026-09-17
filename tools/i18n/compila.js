/* Junta i18n/es.minado.json (lo que sale de git) con i18n/es.extra.json (lo que
   se añade a mano o por lote) y escribe i18n/es.json, que es lo que carga
   nis-i18n.js. Lo de extra manda sobre lo minado.  Uso: node tools/i18n/compila.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const lee = f => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', f), 'utf8')); } catch (e) { return {}; } };
const minado = lee('es.minado.json'), extra = lee('es.extra.json');
// también los lotes traducidos, si existen (tools/i18n/lotes/lote-N.es.json)
const lotes = {};
try { for (const f of fs.readdirSync(path.join(__dirname, 'lotes'))) { if (/^lote-\d+\.es\.json$/.test(f)) Object.assign(lotes, JSON.parse(fs.readFileSync(path.join(__dirname, 'lotes', f), 'utf8'))); } } catch (e) { }
const strings = Object.assign({}, minado.strings || {}, lotes, extra.strings || {});
// fuera lo que no aporta o no puede casar nunca con un nodo de texto:
// sin letras, traducción igual o nula, trozos de plantilla (${…}), escapes crudos
const TEMPLATE = /\$\{/, ESCAPE = /\\u\{?[0-9a-fA-F]{2}|\\n|\\t/;
let fuera = 0;
for (const k of Object.keys(strings)) {
  const v = strings[k];
  if (!/[A-Za-z]/.test(k) || v == null || String(v) === k || TEMPLATE.test(k) || ESCAPE.test(k) || TEMPLATE.test(String(v)) || ESCAPE.test(String(v))) { delete strings[k]; fuera++; continue; }
  // palabras sueltas en minúscula («because», «due to»): casi nunca son rótulos
  // y sí vocabulario que el alumno debe ver en inglés
  if (/^[a-z]/.test(k) && k.split(' ').length <= 2 && !(extra.strings && k in extra.strings) && !(k in lotes)) { delete strings[k]; fuera++; }
}
const out = { strings, patterns: extra.patterns || [] };
fs.writeFileSync(path.join(ROOT, 'i18n', 'es.json'), JSON.stringify(out));
console.log('i18n/es.json:', Object.keys(strings).length, 'cadenas (' + Object.keys(lotes).length + ' de lotes, ' + fuera + ' descartadas),', out.patterns.length, 'patrones,', (fs.statSync(path.join(ROOT, 'i18n', 'es.json')).size / 1024).toFixed(0), 'KB');
