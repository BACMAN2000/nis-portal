/* Cosecha las cadenas de INTERFAZ que se ven en las páginas y no están en el
   diccionario español, para traducirlas en lote (i18n/es.extra.json).
   Recorre el servidor local con Chrome (playwright-core) y lee botones,
   enlaces de navegación, títulos, etiquetas, pestañas, avisos y atributos;
   deja fuera el contenido (pistas, pasajes, opciones de examen, cajas del
   alumno). Añade además los literales de app.js y los paneles de la SPA que
   parezcan texto de interfaz (la SPA pide sesión y no se puede recorrer).

   Uso: node tools/i18n/cosecha.js http://localhost:9178/   →  tools/i18n/pendientes.json */
const fs = require('fs'), path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'qa', 'node_modules', 'playwright-core'));
const acorn = require(path.join(__dirname, '..', 'qa', 'node_modules', 'acorn'));
const ROOT = path.resolve(__dirname, '..', '..'), BASE = process.argv[2] || 'http://localhost:9178/';
const dicc = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'es.json'), 'utf8'));
const tiene = new Set(Object.keys(dicc.strings).map(k => k.replace(/\s+/g, ' ').trim()));
const patrones = (dicc.patterns || []).map(p => new RegExp(p[0]));
const SKIP = /[\\/](\.git|_backup_[^\\/]+|tools|exams|apps-script|deploy|node_modules|jm7q2x|vendor)([\\/]|$)|nis-fun[\\/]build-videos/;
function walk(d, out = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (SKIP.test(p)) continue; if (e.isDirectory()) walk(p, out); else out.push(p); } return out; }
const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');
let pages = walk(ROOT).filter(f => /\.html?$/i.test(f)).map(rel).filter(p => !/-fr-|fr-g\d|crosswords-fr|wordsearches-fr|word-sudoku-fr/.test(p));
const Q = { 'unit.html': '?grade=g9&unit=4', 'worksheet.html': '?grade=g9&unit=4&session=w1s1', 'cambridge-level.html': '?level=fce', 'reader.html': '?book=earnest', 'grammar-lab.html': '?topic=u4-habits', 'yle-practice.html': '?level=flyers', 'nis-fun/engine/index.html': '?level=flyers', 'project.html': '?grade=g9', 'writing.html': '?grade=g9', 'grammar.html': '?grade=g9', 'unit-exam.html': '?grade=g9&units=4&kind=practice&level=b1', 'ayuda.html': '?role=student', 'word-wheel.html': '?levels=a1,c2', 'activities.html': '?grade=g9', 'class-session.html': '?grade=g9&unit=4' };
const COSECHA = `(() => {
  const out = [];
  const UI = 'button, a, label, h1, h2, h3, h4, th, legend, summary, option, .tab, .tabs *, .pill, .badge, .muted, .hint, .lead, .sub, .subtitle, .crumb, .nav *, nav *, header *, footer *, .bar *, .topbar *, .status, .toast, .aviso, [role=status], [role=alert], .empty, .note, .tip, .help, small, .btn, .card h2, .card h3, .card .muted, .kicker, .eyebrow, .stat, .count, .meta, .wt-aviso-top, .nw-bar, .save-bar, .footer';
  const CONTENIDO = '.clues, .clue, .passage, .stem, .options, .opt, .question, .q, .item, .text, .body, .story, .reading, .script, .word, .grid, .cell, .sentence, .example, .def, .definition, .gloss, textarea, input, [contenteditable], code, pre, .lexapp-item, .card p, article, .passage-text, .options label, .qopts, .choice, .choices';
  const seen = new Set();
  const add = (t, sel) => { t = String(t || '').replace(/\\s+/g, ' ').trim(); if (!t || t.length < 2 || t.length > 160) return; if (!/[A-Za-z]{2}/.test(t)) return; if (/^[\\d\\s.:/%–-]+$/.test(t)) return; if (seen.has(t)) return; seen.add(t); out.push({ t, sel }); };
  document.querySelectorAll(UI).forEach(el => {
    if (el.closest(CONTENIDO)) return;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return;
    // texto propio del elemento (no de los hijos), para no coser párrafos
    const propio = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ');
    if (propio.trim()) add(propio, el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/)[0] : ''));
    ['placeholder', 'title', 'aria-label', 'alt'].forEach(a => { if (el.hasAttribute(a)) add(el.getAttribute(a), '@' + a); });
  });
  document.querySelectorAll('[placeholder], [title], input[type=button], input[type=submit]').forEach(el => { ['placeholder', 'title', 'value'].forEach(a => { if (el.hasAttribute(a) && !(a === 'value' && !/button|submit/.test(el.type))) add(el.getAttribute(a), '@' + a); }); });
  return out;
})()`;
(async () => {
  const cuenta = new Map(); // texto -> {n, pages:Set, sel}
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let i = 0; const N = 4;
  await Promise.all(Array.from({ length: N }, async () => {
    while (i < pages.length) { const p = pages[i++]; const page = await ctx.newPage();
      try { await page.goto(BASE + p + (Q[p] || ''), { waitUntil: 'load', timeout: 30000 }); await page.waitForTimeout(1200);
        const res = await page.evaluate(COSECHA);
        for (const r of res) { if (tiene.has(r.t) || patrones.some(re => re.test(r.t))) continue; const c = cuenta.get(r.t) || { n: 0, pages: new Set(), sel: r.sel }; c.n++; c.pages.add(p); cuenta.set(r.t, c); }
      } catch (e) { }
      await page.close(); }
  }));
  await browser.close();
  // Literales de la SPA y sus paneles
  const spa = ['app.js', 'overview-panel.js', 'yle-panel.js', 'scope/panel.js', 'ui-mensajes.js', 'activity-save.js', 'writing-trace.js', 'nis-nav.js', 'nis-splash.js', 'ayuda-datos.js', 'worksheet-items.js', 'level-rubrics.js', 'writing-rubrics.js'];
  const esUI = s => { s = s.replace(/\s+/g, ' ').trim(); if (s.length < 3 || s.length > 220) return false; if (!/[A-Za-z]{2}/.test(s)) return false; if (/^[a-z_$][\w$.-]*$/.test(s)) return false; if (/^(https?:|\.\/|\/|#|[\w-]+\.(js|css|html|json|png|svg|mp3|jpg))/.test(s)) return false; if (/[{}=;]|^<|\$\{|function|=>|\bvar\b|\bconst\b/.test(s) && !/^<b>/.test(s)) return false; if (!/^[A-Z0-9🧠🎯📚🎲📝🎓📖✍️🎧🏫👥✅📈🔐🎮🌐📋⏱️🛡️🔓🧭🎶🔤🎙️🔗🪢💬🧩📄🧒🐧🐺🦅❓🏅👤📊🏠⚠️✔↺💡▶⏸■●◀▶←→⚔️🔊🎤📷📎🗂️🏆🥇🔍✨🌟💾📤🖨️🔁⭐✏️🗑️❌⛔🚫🟢🟡🔴]/u.test(s) && !/^[a-z]/.test(s)) return false; return /[ .!?:…]/.test(s) || s.length <= 20; };
  for (const f of spa) { let src; try { src = fs.readFileSync(path.join(ROOT, f), 'utf8'); } catch (e) { continue; }
    let ast; try { ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' }); } catch (e) { continue; }
    (function w(n) { if (!n || typeof n.type !== 'string') return; if ((n.type === 'Literal' && typeof n.value === 'string' && esUI(n.value)) || (n.type === 'TemplateElement' && n.value.cooked && esUI(n.value.cooked))) { const t = (n.type === 'Literal' ? n.value : n.value.cooked).replace(/\s+/g, ' ').trim(); if (!tiene.has(t) && !patrones.some(re => re.test(t))) { const c = cuenta.get(t) || { n: 0, pages: new Set(), sel: 'js' }; c.n++; c.pages.add(f); cuenta.set(t, c); } } for (const k in n) { const v = n[k]; if (k === 'loc') continue; if (Array.isArray(v)) v.forEach(w); else if (v && typeof v.type === 'string') w(v); } })(ast); }
  const lista = [...cuenta.entries()].map(([t, c]) => ({ en: t, n: c.n, pages: c.pages.size, sel: c.sel, ejemplo: [...c.pages][0] })).sort((a, b) => b.pages - a.pages || b.n - a.n);
  fs.writeFileSync(path.join(__dirname, 'pendientes.json'), JSON.stringify(lista, null, 1));
  console.log('páginas recorridas:', pages.length, '| cadenas sin traducción:', lista.length, '| en ≥3 páginas:', lista.filter(x => x.pages >= 3).length, '| solo SPA:', lista.filter(x => x.sel === 'js').length);
  lista.slice(0, 40).forEach(x => console.log(String(x.pages).padStart(4), x.sel.padEnd(18), JSON.stringify(x.en).slice(0, 90)));
})();
