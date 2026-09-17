/* Prueba rápida del motor de trozos de nis-i18n.js con el diccionario real:
   node tools/i18n/prueba_trozos.js "80 marked and not yet sent in your grades" */
const fs = require('fs'), path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'i18n', 'es.json'), 'utf8'));
const dicc = new Map(Object.entries(d.strings).map(([k, v]) => [k.replace(/\s+/g, ' ').trim(), v]));
const trozos = []; dicc.forEach((v, k) => { if (k.length >= 12 && k.split(' ').length >= 3 && !/[<>]/.test(k)) trozos.push(k); });
trozos.sort((a, b) => b.length - a.length);
const escapa = k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const re = new RegExp('(?<![A-Za-z0-9])(?:' + trozos.map(escapa).join('|') + ')(?![A-Za-z0-9])', 'g');
console.log('trozos:', trozos.length, '| regex:', (re.source.length / 1024).toFixed(0), 'KB');
const pruebas = process.argv.slice(2).length ? process.argv.slice(2) : ['80 marked and not yet sent in your grades', '7 grade(s) with students', 'Handed in and not yet marked. Click a line to open it.', 'G2/G4/G5/G6/G8/G9/G11 · Second mock: final rehearsal under official conditions', 'Week 4 · Session 1 — Why Teenagers Need More Sleep Than Anyone Else (19)', 'My last week was a 8 because it was a good weekend', '· 127 without level in your grades', 'Minutes per student and week. It helps to agree on a cap with school leadership and check whether it works.'];
for (const t of pruebas) { let hubo = false; const r = t.replace(re, m => { const v = dicc.get(m); if (v == null) return m; hubo = true; return v; }); console.log(hubo ? '✓' : '·', JSON.stringify(r).slice(0, 120)); }
