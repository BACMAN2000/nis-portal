/* exam-c1.js — las tareas de examen de secundaria que el motor no traía.
   ------------------------------------------------------------------------
   El motor de Fun for Nordic nació para YLE: emparejar, colorear, huecos de
   una palabra. Los cursos de B2 First y C1 Advanced entrenan otras cosas
   —un cloze de opción múltiple, la formación de palabras, un texto con
   párrafos arrancados, cinco monólogos que hay que emparejar, un essay de
   260 palabras— y hasta ahora se apañaban con lecturas de 250 palabras y
   tres opciones. Aquí van esos tipos, calcados del formato oficial de
   Cambridge (Reading & Use of English P1/P3/P6/P7/P8, Listening P1/P3/P4,
   Writing P1/P2, Speaking P1-P4), para que el alumno vea en la unidad la
   misma tarea que verá en el examen.

   Se registra sobre RENDER (el objeto del motor) al cargar, así que
   index.html solo necesita este <script> después del suyo. Las globales
   que usa (T, esc, complete, LEVEL, UD, ADIR, BACKEND, cicloIntentos) son
   las del motor.

   Tipos nuevos ............ mc_cloze · word_formation · gapped_text ·
                             multiple_matching · listening_mc ·
                             listening_match · writing
   Tipos enriquecidos ...... pairwork con data.parts (Speaking por partes)
   En cualquier actividad .. act.tips = {expect, how} pinta la caja
                             «What to expect in the exam / How to go about it»
   ------------------------------------------------------------------------ */
(function () {
  'use strict';
  if (typeof RENDER === 'undefined') return;

  const LET = 'ABCDEFGH';
  const norm = v => String(v || '').toLowerCase().replace(/[.,!?;:'"]/g, '').replace(/\s+/g, ' ').trim();
  const acepta = (val, resp) => (Array.isArray(resp) ? resp : [resp]).some(a => norm(a) === norm(val));
  const nWords = t => (String(t || '').trim().match(/\S+/g) || []).length;

  /* Fotos reales del Speaking Part 2 (assets/teen/<slug>.jpg). El credito de
     Unsplash lo pide la licencia: se carga credits.json una vez y se pinta
     bajo cada foto. Si no hay credito, no se pinta nada. */
  const TEEN_PIC_V = '2026-09-16b';
  let CRED_FOTO = null;
  fetch('../assets/teen/credits.json').then(r => r.json()).then(d => { CRED_FOTO = d || {}; }).catch(() => { CRED_FOTO = {}; });
  function credFoto(slug) {
    if (!slug || !CRED_FOTO || !CRED_FOTO[slug]) return '';
    const c = CRED_FOTO[slug];
    return `<span class="xcred">${T('Photo', 'Photo')}: <a href="${esc(c.link)}?utm_source=nis&utm_medium=referral" target="_blank" rel="noopener">${esc(c.name)}</a> / Unsplash</span>`;
  }

  /* ---- CSS del módulo: va aquí y no en index.html para que las dos copias
     del motor lo lleven igual ---- */
  const CSS = `
  .xtips{max-width:46rem;margin:0 auto 1rem;text-align:left;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--surface)}
  .xtips summary{cursor:pointer;padding:.6rem 1rem;font-weight:700;color:var(--accent);list-style:none;display:flex;gap:.5rem;align-items:center}
  .xtips summary::-webkit-details-marker{display:none}
  .xtips summary::after{content:'▾';margin-left:auto;color:var(--soft)}
  .xtips[open] summary::after{content:'▴'}
  .xtips .xt-body{padding:0 1rem .9rem;font-size:.97rem;line-height:1.55}
  .xtips .xt-body h4{margin:.6rem 0 .2rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.04em;color:var(--soft)}
  .xtips .xt-body p{margin:.15rem 0}
  .xex{max-width:46rem;margin-inline:auto;text-align:left}
  .xex .xinstr{font-style:italic;margin:0 0 .8rem;color:var(--soft)}
  .xex .xtitle{font-family:"Baloo 2",sans-serif;font-size:1.25rem;margin:.2rem 0 .6rem;color:var(--ink)}
  .xex .xtext{background:var(--surface2);border-radius:12px;padding:1rem 1.2rem;line-height:1.9;font-size:1.04rem}
  .xex .xtext p{margin:.5rem 0}
  .xgap{display:inline-block;min-width:3.2rem;border-bottom:2px solid var(--accent);text-align:center;font-weight:700;color:var(--accent);cursor:pointer;padding:0 .3rem;border-radius:6px 6px 0 0;background:transparent}
  .xgap.puesto{background:var(--surface);color:var(--ink)}
  .xgap.ok{border-color:var(--ok);color:var(--ok)} .xgap.bad{border-color:var(--bad);color:var(--bad)}
  .xgap.foco{background:var(--line)}
  .xgap i{font-style:normal;font-size:.7rem;vertical-align:super;color:var(--soft);margin-right:.15rem}
  .xopts{margin-top:1rem;display:grid;gap:.5rem}
  .xopts .xrow{display:grid;grid-template-columns:2rem 1fr;gap:.4rem;align-items:start;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.5rem .7rem}
  .xopts .xrow.foco{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 25%,transparent)}
  .xopts .xn{font-weight:800;color:var(--accent)}
  .xopts .opts{display:flex;flex-wrap:wrap;gap:.4rem}
  .xopts .obtn b{margin-right:.35rem;color:var(--soft)}
  .xwf input{border:0;border-bottom:2px solid var(--accent);background:transparent;font:600 1rem "Source Sans 3",sans-serif;width:8.5rem;text-align:center;color:var(--ink)}
  .xwf input.ok{color:var(--ok);border-color:var(--ok)} .xwf input.bad{color:var(--bad);border-color:var(--bad)} .xwf input.revelado{color:var(--soft)}
  .xwf .xstem{font-size:.72rem;font-weight:800;letter-spacing:.05em;color:var(--soft);margin-left:.2rem;white-space:nowrap}
  .xwf .xsol{font-size:.85rem;color:var(--ok);margin-left:.25rem}
  .xparas{margin-top:1rem;display:grid;gap:.5rem}
  .xparas .xp{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.6rem .8rem;line-height:1.5;display:grid;grid-template-columns:1.8rem 1fr;gap:.5rem}
  .xparas .xp b{color:var(--accent);font-size:1.05rem}
  .xparas .xp.usado{opacity:.55}
  .xmenu{position:absolute;z-index:5;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.35rem;display:flex;gap:.3rem;flex-wrap:wrap;box-shadow:0 6px 18px rgba(0,0,0,.12)}
  .xmenu button{min-width:2.2rem;padding:.3rem .5rem;border-radius:8px;border:1px solid var(--line);background:var(--surface2);font-weight:800;cursor:pointer;color:var(--ink)}
  .xmenu button.on{background:var(--accent);color:#fff;border-color:var(--accent)}
  .xmenu button.x{color:var(--bad);background:transparent;border:0}
  .xsecs{display:grid;gap:.7rem;margin-top:.6rem}
  .xsecs .xsec{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:.8rem 1rem;line-height:1.6}
  .xsecs .xsec .xh{font-weight:800;color:var(--accent);margin-bottom:.25rem}
  .xsecs .xsec .xh small{font-weight:600;color:var(--soft);margin-left:.4rem}
  .xqs{margin-top:1rem;display:grid;gap:.5rem}
  .xqs .xq{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.55rem .8rem;display:flex;flex-wrap:wrap;gap:.4rem .8rem;align-items:center}
  .xqs .xq .stem{flex:1 1 16rem}
  .xqs .xq .lets{display:flex;gap:.3rem;flex-wrap:wrap}
  .xqs .xq .obtn{min-width:2.3rem;padding:.3rem .5rem;font-weight:800}
  .xls .xextract{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:.7rem 1rem;margin-top:.7rem}
  .xls .xextract .xeh{font-weight:800;color:var(--accent)}
  .xls .xextract .xei{color:var(--soft);font-style:italic;margin:.1rem 0 .5rem}
  .xls .item{margin:.5rem 0}
  .xls .item .opts{display:grid;gap:.35rem}
  .xls .item .obtn{text-align:left;white-space:normal}
  .xls .item .obtn b{margin-right:.4rem;color:var(--soft)}
  .xspk{margin:.4rem 0 .6rem;display:flex;gap:.4rem;flex-wrap:wrap;align-items:center}
  .xspk span{background:var(--surface2);border-radius:999px;padding:.15rem .6rem;font-size:.85rem;font-weight:700}
  .xtask{display:grid;gap:.5rem;margin-top:.8rem}
  .xtask .xth{font-weight:800;color:var(--accent)}
  .xtask .xtp{color:var(--soft);font-style:italic}
  .xtask .xtopts{columns:2;column-gap:1rem;font-size:.95rem;line-height:1.5}
  @media(max-width:560px){.xtask .xtopts{columns:1}}
  .xtask .xtopts div b{color:var(--accent);margin-right:.3rem}
  /* writing */
  .xwr .xtask-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:1rem 1.2rem;line-height:1.6}
  .xwr .xtask-card .xgenre{display:inline-block;background:var(--accent);color:#fff;border-radius:999px;padding:.1rem .7rem;font-size:.8rem;font-weight:800;letter-spacing:.03em;margin-bottom:.4rem}
  .xwr .xtask-card blockquote{margin:.6rem 0;padding:.6rem .9rem;border-left:4px solid var(--accent);background:var(--surface2);border-radius:0 10px 10px 0}
  .xwr .xtask-card ul{margin:.3rem 0 .3rem 1.2rem}
  .xwr details{border:1px solid var(--line);border-radius:12px;background:var(--surface);margin-top:.6rem}
  .xwr details summary{cursor:pointer;padding:.55rem .9rem;font-weight:700;color:var(--accent);list-style:none}
  .xwr details summary::-webkit-details-marker{display:none}
  .xwr details .xd{padding:0 .9rem .8rem;line-height:1.55;font-size:.97rem}
  .xwr details .xd h5{margin:.55rem 0 .15rem;font-size:.82rem;text-transform:uppercase;letter-spacing:.04em;color:var(--soft)}
  .xwr details .xd ul{margin:.1rem 0 .2rem 1.2rem}
  .xwr .xul li{margin:.1rem 0}
  .xwr textarea{width:100%;box-sizing:border-box;min-height:16rem;margin-top:.8rem;padding:.9rem 1rem;border:2px solid var(--line);border-radius:12px;background:var(--surface);color:var(--ink);font:1.02rem/1.6 "Source Sans 3",Georgia,serif;resize:vertical}
  .xwr textarea:focus{outline:0;border-color:var(--accent)}
  .xwr .xcount{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-top:.4rem;font-size:.92rem;color:var(--soft)}
  .xwr .xcount b{font-size:1.05rem;color:var(--ink)}
  .xwr .xcount b.ok{color:var(--ok)} .xwr .xcount b.bad{color:var(--bad)}
  .xwr .xbtns{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.7rem;align-items:center}
  .xwr .xbtns button{border:0;border-radius:999px;padding:.5rem 1.1rem;font-weight:800;cursor:pointer;font-family:inherit}
  .xwr .xbtns .save{background:var(--surface2);color:var(--ink)}
  .xwr .xbtns .hand{background:var(--accent);color:#fff}
  .xwr .xbtns .hand:disabled{opacity:.5;cursor:default}
  .xwr .xbtns .xmsg{font-size:.9rem;color:var(--soft)}
  .xwr .xmodel{margin-top:.8rem}
  .xwr .xmodel .xd p{margin:.4rem 0}
  .xwr .xcheck label{display:block;margin:.15rem 0;cursor:pointer}
  /* speaking */
  .xsp .xtabs{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.7rem;justify-content:center}
  .xsp .xtabs button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:.35rem .9rem;font-weight:700;cursor:pointer;color:var(--ink);font-family:inherit}
  .xsp .xtabs button.on{background:var(--accent);color:#fff;border-color:var(--accent)}
  .xsp .xpart{background:var(--surface2);border-radius:14px;padding:1rem 1.2rem;text-align:left;line-height:1.6}
  .xsp .xpart .xph{display:flex;gap:.6rem;align-items:baseline;flex-wrap:wrap}
  .xsp .xpart .xph b{font-family:"Baloo 2",sans-serif;font-size:1.15rem;color:var(--accent)}
  .xsp .xpart .xph span{color:var(--soft);font-size:.9rem}
  .xsp .xpart ol,.xsp .xpart ul{margin:.4rem 0 .2rem 1.3rem}
  .xsp .xpics{display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:.6rem;margin:.6rem 0}
  .xsp .xpic{background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;text-align:center}
  .xsp .xpic .xe{font-size:2.4rem;line-height:1.1;padding:.7rem}
  .xsp .xpic .xphoto{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;background:var(--surface2)}
  .xsp .xpic .xc{font-size:.9rem;color:var(--soft);padding:.5rem .6rem}
  .xsp .xpic .xcred{font-size:.62rem;color:var(--soft);opacity:.7;padding:0 .6rem .4rem;display:block}
  .xsp .xpic .xcred a{color:inherit}
  .xsp .xmap{display:grid;grid-template-columns:1fr auto 1fr;gap:.5rem;align-items:center;margin:.7rem 0}
  .xsp .xmap .xcentre{grid-column:2;background:var(--accent);color:#fff;border-radius:14px;padding:.7rem 1rem;font-weight:800;text-align:center;max-width:14rem}
  .xsp .xmap .xspoke{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:.5rem .7rem;font-size:.95rem;text-align:center}
  @media(max-width:560px){.xsp .xmap{grid-template-columns:1fr}.xsp .xmap .xcentre{grid-column:1;max-width:none}}
  .xsp .xdecide{margin-top:.5rem;padding:.5rem .8rem;border-left:4px solid var(--accent);background:var(--surface)}
  .xsp .xul{margin-top:.6rem}
  .xsp details summary{cursor:pointer;font-weight:700;color:var(--accent)}
  .xsp details .xd{font-size:.95rem;line-height:1.5}
  .xsp details .xd h5{margin:.45rem 0 .1rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:var(--soft)}
  .xbridge{margin:1rem auto 0;max-width:46rem;text-align:left;font-size:.92rem;color:var(--soft)}
  .xbridge a{color:var(--accent);font-weight:700}
  `;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---- caja de consejos, en cualquier actividad que traiga act.tips ---- */
  function tipsHTML(tips) {
    if (!tips) return '';
    const bloque = (h, t) => t ? `<h4>${h}</h4>${(Array.isArray(t) ? t : [t]).map(p => `<p>${p}</p>`).join('')}` : '';
    return `<details class="xtips"><summary>📋 ${T('Exam guide', "Guide de l'examen")}</summary>
      <div class="xt-body">${bloque(T('What to expect in the exam', "À quoi s'attendre"), tips.expect)}
      ${bloque(T('How to go about it', 'Comment s’y prendre'), tips.how)}
      ${bloque(T("Don't forget", 'À ne pas oublier'), tips.remember)}</div></details>`;
  }

  /* ---- puente a los practice tests C1 del portal (solo si están al lado) ---- */
  let HAY_MOCKS = null;
  function puenteMocks(el, paper) {
    const pinta = () => {
      const url = { reading: '../../mocks-cambridge/reading-quiz.html?branch=practice',
                    listening: '../../mocks-cambridge/listening-quiz.html?branch=practice',
                    writing: '../../mocks-cambridge/writing-quiz.html' }[paper];
      if (!url) return;
      el.insertAdjacentHTML('beforeend', `<p class="xbridge">▶ <a href="${url}">${T('Try this part in a full C1 practice test', 'Essaie cette partie dans un test complet C1')}</a> — ${T('choose C1 when you go in.', 'choisis C1 en entrant.')}</p>`);
    };
    if (HAY_MOCKS === true) return pinta();
    if (HAY_MOCKS === false) return;
    fetch('../../mocks-cambridge/quizzes.html', { method: 'HEAD' }).then(r => { HAY_MOCKS = r.ok; if (r.ok) pinta(); }).catch(() => { HAY_MOCKS = false; });
  }

  /* ---- menú flotante de letras/opciones para un hueco ---- */
  function menuLetras(gap, opciones, alElegir) {
    document.querySelectorAll('.xmenu').forEach(m => m.remove());
    const m = document.createElement('div'); m.className = 'xmenu';
    m.innerHTML = opciones.map(o => `<button type="button" data-v="${esc(o)}" class="${gap.dataset.v === o ? 'on' : ''}">${esc(o)}</button>`).join('') +
                  `<button type="button" class="x" data-v="">✕</button>`;
    gap.insertAdjacentElement('afterend', m);
    const r = gap.getBoundingClientRect(), caja = gap.closest('.xex').getBoundingClientRect();
    m.style.left = Math.max(6, Math.min(r.left - caja.left, caja.width - m.offsetWidth - 6)) + 'px';
    m.querySelectorAll('button').forEach(b => b.onclick = e => {
      e.stopPropagation();
      const v = b.dataset.v;
      m.remove();
      if (v) alElegir(v);
    });
    setTimeout(() => document.addEventListener('click', () => m.remove(), { once: true }), 0);
  }

  function marcador(el, ok, total, code) {
    const s = el.querySelector('.score');
    s.textContent = `${ok} / ${total}`;
    s.className = 'score ' + (ok === total ? 'good' : 'partial');
    if (ok === total) complete(code);
  }

  /* =====================================================================
     mc_cloze — Reading & Use of English Part 1
     data: { instructions, title, text:"... {1} ... {2} ...", items:[{options:[4], answer:k}] }
     El texto lleva los huecos; debajo, la tabla de opciones A-D por hueco,
     como en la hoja del examen. Se puede contestar desde el hueco o desde
     la tabla.
     ===================================================================== */
  RENDER.mc_cloze = function (act, el) {
    const d = act.data || {}, items = d.items || [];
    el.classList.add('xex');
    const texto = String(d.text || '').replace(/\{(\d+)\}/g, (m, n) =>
      `<span class="xgap" data-n="${n}" data-v=""><i>${n}</i>……</span>`);
    el.innerHTML = `<p class="xinstr">${d.instructions || T('For questions 1–' + items.length + ', read the text below and decide which answer (A, B, C or D) best fits each gap.', 'Choisis la réponse (A, B, C ou D) qui convient à chaque trou.')}</p>
      ${d.title ? `<h3 class="xtitle">${esc(d.title)}</h3>` : ''}
      <div class="xtext">${texto}</div>
      <div class="xopts">${items.map((it, i) => `<div class="xrow" data-i="${i}"><span class="xn">${i + 1}</span>
        <div class="opts">${it.options.map((o, k) => `<button type="button" class="obtn" data-k="${k}"><b>${LET[k]}</b>${esc(o)}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="checkrow"><button class="chk">${T('Check', 'Vérifier')}</button><span class="score"></span></div>`;
    const gaps = [...el.querySelectorAll('.xgap')], filas = [...el.querySelectorAll('.xrow')];
    const elige = (i, k) => {
      const it = items[i], g = gaps[i], f = filas[i];
      if (!g || !f) return;
      g.textContent = it.options[k]; g.dataset.v = String(k); g.classList.add('puesto'); g.classList.remove('ok', 'bad');
      f.querySelectorAll('.obtn').forEach((b, kk) => b.classList.toggle('sel', kk === k));
    };
    gaps.forEach((g, i) => {
      g.onclick = e => { e.stopPropagation();
        filas.forEach(f => f.classList.remove('foco')); filas[i].classList.add('foco');
        filas[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        menuLetras(g, items[i].options.map((o, k) => LET[k] + ' ' + o), v => elige(i, LET.indexOf(v[0]))); };
    });
    filas.forEach((f, i) => f.querySelectorAll('.obtn').forEach(b => b.onclick = () => {
      filas.forEach(x => x.classList.remove('foco')); elige(i, +b.dataset.k); }));
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      items.forEach((it, i) => {
        const v = gaps[i].dataset.v, good = v !== '' && +v === it.answer;
        gaps[i].classList.toggle('ok', good); gaps[i].classList.toggle('bad', !good);
        filas[i].querySelectorAll('.obtn').forEach((b, k) => { b.classList.remove('ok', 'bad');
          if (k === it.answer && good) b.classList.add('ok'); else if (b.classList.contains('sel')) b.classList.add('bad'); });
        if (good) ok++;
      });
      marcador(el, ok, items.length, act.code);
    };
    puenteMocks(el, 'reading');
  };

  /* =====================================================================
     word_formation — Reading & Use of English Part 3
     data: { instructions, title, text:"... {1:STRONG} ...", answers:[ "strength" | ["a","b"] ] }
     La palabra de partida va en mayúsculas junto al hueco, como en el examen.
     ===================================================================== */
  RENDER.word_formation = function (act, el) {
    const d = act.data || {}, answers = d.answers || [];
    el.classList.add('xex', 'xwf');
    const texto = String(d.text || '').replace(/\{(\d+):([^}]+)\}/g, (m, n, w) =>
      `<span class="xg"><span class="gn"><i>${n}</i></span><input data-i="${n - 1}" autocomplete="off" autocapitalize="off" spellcheck="false"><span class="xstem">${esc(w.trim().toUpperCase())}</span></span>`);
    el.innerHTML = `<p class="xinstr">${d.instructions || T('For questions 1–' + answers.length + ', read the text below. Use the word given in capitals at the end of some of the lines to form a word that fits in the gap in the same line.', 'Forme, à partir du mot en majuscules, le mot qui convient à chaque trou.')}</p>
      ${d.title ? `<h3 class="xtitle">${esc(d.title)}</h3>` : ''}
      <div class="xtext">${texto}</div>
      <div class="checkrow final"><button class="chk">${T('Check', 'Vérifier')}</button>
        <button class="again" type="button" hidden>↻ ${T('Try again', 'Réessaie')}</button>
        <button class="reveal" type="button" hidden>👁 ${T('See the answers', 'Voir les réponses')}</button>
        <span class="score"></span><span class="tries"></span></div>`;
    const entradas = () => [...el.querySelectorAll('.xtext input')];
    cicloIntentos(el, {
      entradas,
      corrige() { let bien = 0; entradas().forEach(inp => { const ok = acepta(inp.value, answers[+inp.dataset.i]); inp.className = ok ? 'ok' : 'bad'; if (ok) bien++; }); return { bien, total: answers.length }; },
      revela() { entradas().forEach(inp => { const a = answers[+inp.dataset.i]; inp.value = Array.isArray(a) ? a[0] : a; inp.className = 'revelado'; }); },
      alAcertar() { complete(act.code); }
    });
    puenteMocks(el, 'reading');
  };

  /* =====================================================================
     gapped_text — Reading & Use of English Part 7
     data: { instructions, title, text:"<p>…</p><p>{1}</p><p>…</p>", paragraphs:[{letter:'A', text}], answers:['D','A',…] }
     Seis huecos, siete párrafos: uno sobra. El hueco se pulsa y sale la
     letra; el párrafo ya usado se atenúa en la lista.
     ===================================================================== */
  RENDER.gapped_text = function (act, el) {
    const d = act.data || {}, paras = d.paragraphs || [], answers = d.answers || [];
    el.classList.add('xex');
    const letras = paras.map(p => p.letter);
    const texto = String(d.text || '').replace(/\{(\d+)\}/g, (m, n) =>
      `<span class="xgap" data-n="${n}" data-v=""><i>${n}</i>……………</span>`);
    el.innerHTML = `<p class="xinstr">${d.instructions || T('You are going to read an article. Six paragraphs have been removed. Choose from the paragraphs A–G the one which fits each gap. There is one extra paragraph which you do not need to use.', 'Six paragraphes ont été retirés. Choisis le paragraphe (A–G) qui convient à chaque trou ; il y en a un de trop.')}</p>
      ${d.title ? `<h3 class="xtitle">${esc(d.title)}</h3>` : ''}
      <div class="xtext">${texto}</div>
      <div class="xparas">${paras.map(p => `<div class="xp" data-l="${p.letter}"><b>${p.letter}</b><div>${p.text}</div></div>`).join('')}</div>
      <div class="checkrow"><button class="chk">${T('Check', 'Vérifier')}</button><span class="score"></span></div>`;
    const gaps = [...el.querySelectorAll('.xgap')];
    const refresca = () => { const usados = new Set(gaps.map(g => g.dataset.v).filter(Boolean));
      el.querySelectorAll('.xp').forEach(p => p.classList.toggle('usado', usados.has(p.dataset.l))); };
    gaps.forEach(g => g.onclick = e => { e.stopPropagation();
      menuLetras(g, letras, v => { g.dataset.v = v; g.innerHTML = `<i>${g.dataset.n}</i>${v}`; g.classList.add('puesto'); g.classList.remove('ok', 'bad'); refresca(); }); });
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      gaps.forEach((g, i) => { const good = g.dataset.v && g.dataset.v === answers[i]; g.classList.toggle('ok', !!good); g.classList.toggle('bad', !good); if (good) ok++; });
      marcador(el, ok, answers.length, act.code);
    };
    puenteMocks(el, 'reading');
  };

  /* =====================================================================
     multiple_matching — Reading & Use of English Part 8 (y Part 6 cross-text)
     data: { instructions, title, sections:[{letter, heading, text}], questions:[{q, answer:'C'}] }
     Los textos primero y las preguntas debajo, cada una con sus letras.
     Para P6 son cuatro textos y cuatro preguntas del tipo «which reviewer
     shares reviewer B's opinion…».
     ===================================================================== */
  RENDER.multiple_matching = function (act, el) {
    const d = act.data || {}, secs = d.sections || [], qs = d.questions || [];
    el.classList.add('xex');
    const letras = secs.map(s => s.letter);
    el.innerHTML = `<p class="xinstr">${d.instructions || T('For questions 1–' + qs.length + ', choose from the sections (' + letras[0] + '–' + letras[letras.length - 1] + '). The sections may be chosen more than once.', 'Choisis la section qui répond à chaque question.')}</p>
      ${d.title ? `<h3 class="xtitle">${esc(d.title)}</h3>` : ''}
      ${d.intro ? `<p class="xinstr">${d.intro}</p>` : ''}
      <div class="xsecs">${secs.map(s => `<div class="xsec"><div class="xh">${s.letter}${s.heading ? `<small>${esc(s.heading)}</small>` : ''}</div><div>${s.text}</div></div>`).join('')}</div>
      <div class="xqs">${qs.map((q, i) => `<div class="xq" data-i="${i}"><span class="stem"><b>${i + 1}</b>. ${q.q}</span>
        <span class="lets">${letras.map(l => `<button type="button" class="obtn" data-l="${l}">${l}</button>`).join('')}</span></div>`).join('')}</div>
      <div class="checkrow"><button class="chk">${T('Check', 'Vérifier')}</button><span class="score"></span></div>`;
    el.querySelectorAll('.xq').forEach(q => q.querySelectorAll('.obtn').forEach(b => b.onclick = () => {
      q.querySelectorAll('.obtn').forEach(x => x.classList.remove('sel', 'ok', 'bad')); b.classList.add('sel'); }));
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      el.querySelectorAll('.xq').forEach(q => { const it = qs[+q.dataset.i];
        q.querySelectorAll('.obtn').forEach(b => { b.classList.remove('ok', 'bad');
          if (b.dataset.l === it.answer && b.classList.contains('sel')) { b.classList.add('ok'); ok++; }
          else if (b.classList.contains('sel')) b.classList.add('bad'); }); });
      marcador(el, ok, qs.length, act.code);
    };
    puenteMocks(el, 'reading');
  };

  /* ---- reproductor común de las escuchas nuevas: mp3 real y, si falta,
     la voz del navegador leyendo el guion con dos voces ---- */
  function reproductor(el, act) {
    el.insertAdjacentHTML('afterbegin', `<div class="lsn-mando">
      <button class="play" type="button">▶ ${T('Play', 'Lire')}</button>
      <button class="pause" type="button" disabled>⏸ ${T('Pause', 'Pause')}</button>
      <button class="stop" type="button" disabled>⏹ ${T('Stop', 'Arrêter')}</button>
      <span class="provisional"></span></div>`);
    const bPlay = el.querySelector('.play'), bPausa = el.querySelector('.pause'), bStop = el.querySelector('.stop');
    const audio = new Audio(`${ADIR}/${act.audio}`);
    let modo = 'mp3', hablando = false;
    audio.onerror = () => { modo = 'tts'; el.querySelector('.provisional').textContent = '(temporary browser voice — the real audio is coming soon)'; };
    const estado = s => { bPausa.disabled = !s || modo === 'tts'; bStop.disabled = !s; bPlay.disabled = s;
      bPlay.textContent = s ? T('▶ Playing…', '▶ Lecture…') : T('▶ Play', '▶ Lire'); };
    audio.onended = () => estado(false);
    function tts() {
      const lineas = String(act.data.script || '').split('\n').map(l => l.trim()).filter(Boolean);
      speechSynthesis.cancel();
      const voces = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
      const quien = {}; let n = 0;
      lineas.forEach((l, i) => {
        const m = l.match(/^([A-Z][A-Za-z .'-]{0,30}):\s*(.*)$/);
        const sp = m ? m[1] : '_', txt = m ? m[2] : l;
        if (!(sp in quien)) quien[sp] = n++;
        const u = new SpeechSynthesisUtterance(txt.replace(/\[[^\]]*\]/g, ''));
        u.lang = 'en-GB'; u.rate = .92;
        if (voces.length) u.voice = voces[quien[sp] % voces.length];
        if (i === lineas.length - 1) u.onend = () => { hablando = false; estado(false); };
        speechSynthesis.speak(u);
      });
      hablando = true; estado(true);
    }
    bPlay.onclick = () => { if (modo === 'mp3' && !audio.error) { audio.play(); estado(true); return; } tts(); };
    bPausa.onclick = () => { audio.pause(); estado(false); };
    bStop.onclick = () => { if (hablando) { speechSynthesis.cancel(); hablando = false; } audio.pause(); audio.currentTime = 0; estado(false); };
  }

  /* =====================================================================
     listening_mc — Listening Part 1 (tres extractos × 2) y Part 3 (uno × 6)
     data: { instructions, script, extracts:[{title, intro, questions:[{q, options:[3|4], answer}]}] }
     ===================================================================== */
  RENDER.listening_mc = function (act, el) {
    const d = act.data || {}, ex = d.extracts || [];
    el.classList.add('xex', 'xls');
    let n = 0;
    el.innerHTML = `<p class="xinstr">${d.instructions || T('You will hear the recording twice. For each question, choose the best answer.', 'Tu entendras l’enregistrement deux fois. Choisis la meilleure réponse.')}</p>
      ${ex.map(x => `<div class="xextract">${x.title ? `<div class="xeh">${esc(x.title)}</div>` : ''}${x.intro ? `<div class="xei">${esc(x.intro)}</div>` : ''}
        ${x.questions.map(q => { const i = n++; return `<div class="item" data-i="${i}"><div class="stem">${i + 1}. ${esc(q.q)}</div>
          <div class="opts">${q.options.map((o, k) => `<button type="button" class="obtn" data-k="${k}"><b>${LET[k]}</b>${esc(o)}</button>`).join('')}</div></div>`; }).join('')}</div>`).join('')}
      <div class="checkrow"><button class="chk">${T('Check', 'Vérifier')}</button><span class="score"></span></div>`;
    reproductor(el, act);
    const todas = ex.flatMap(x => x.questions);
    el.querySelectorAll('.item').forEach(item => item.querySelectorAll('.obtn').forEach(b => b.onclick = () => {
      item.querySelectorAll('.obtn').forEach(x => x.classList.remove('sel', 'ok', 'bad')); b.classList.add('sel'); }));
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      el.querySelectorAll('.item').forEach(item => { const q = todas[+item.dataset.i];
        item.querySelectorAll('.obtn').forEach(b => { b.classList.remove('ok', 'bad');
          if (+b.dataset.k === q.answer && b.classList.contains('sel')) { b.classList.add('ok'); ok++; }
          else if (b.classList.contains('sel')) b.classList.add('bad'); }); });
      marcador(el, ok, todas.length, act.code);
    };
    puenteMocks(el, 'listening');
  };

  /* =====================================================================
     listening_match — Listening Part 4: cinco hablantes, dos tareas
     data: { instructions, script, speakers:[5], tasks:[{title, prompt, options:[8], answers:[5 letras]}] }
     ===================================================================== */
  RENDER.listening_match = function (act, el) {
    const d = act.data || {}, tasks = d.tasks || [], spk = d.speakers || ['Speaker 1', 'Speaker 2', 'Speaker 3', 'Speaker 4', 'Speaker 5'];
    el.classList.add('xex', 'xls');
    let n = 0;
    el.innerHTML = `<p class="xinstr">${d.instructions || T('You will hear five short extracts in which people are talking. There are two tasks. While you listen you must complete both tasks.', 'Tu entendras cinq personnes. Il y a deux tâches à faire en écoutant.')}</p>
      <div class="xspk">${spk.map(s => `<span>${esc(s)}</span>`).join('')}</div>
      ${tasks.map((t, ti) => `<div class="xtask" data-t="${ti}"><div class="xth">${esc(t.title || ('Task ' + (ti + 1)))}</div>
        ${t.prompt ? `<div class="xtp">${esc(t.prompt)}</div>` : ''}
        <div class="xtopts">${t.options.map((o, k) => `<div><b>${LET[k]}</b>${esc(o)}</div>`).join('')}</div>
        <div class="xqs">${spk.map((s, si) => { const i = n++; return `<div class="xq" data-i="${i}" data-t="${ti}" data-s="${si}"><span class="stem"><b>${i + 1}</b>. ${esc(s)}</span>
          <span class="lets">${t.options.map((o, k) => `<button type="button" class="obtn" data-l="${LET[k]}">${LET[k]}</button>`).join('')}</span></div>`; }).join('')}</div></div>`).join('')}
      <div class="checkrow"><button class="chk">${T('Check', 'Vérifier')}</button><span class="score"></span></div>`;
    reproductor(el, act);
    el.querySelectorAll('.xq').forEach(q => q.querySelectorAll('.obtn').forEach(b => b.onclick = () => {
      q.querySelectorAll('.obtn').forEach(x => x.classList.remove('sel', 'ok', 'bad')); b.classList.add('sel'); }));
    el.querySelector('.chk').onclick = () => {
      let ok = 0, total = 0;
      el.querySelectorAll('.xq').forEach(q => { const resp = tasks[+q.dataset.t].answers[+q.dataset.s]; total++;
        q.querySelectorAll('.obtn').forEach(b => { b.classList.remove('ok', 'bad');
          if (b.dataset.l === resp && b.classList.contains('sel')) { b.classList.add('ok'); ok++; }
          else if (b.classList.contains('sel')) b.classList.add('bad'); }); });
      marcador(el, ok, total, act.code);
    };
    puenteMocks(el, 'listening');
  };

  /* =====================================================================
     writing — Writing Part 1 (essay) y Part 2 (proposal, report, review, letter/email)
     data: { part, genre, task:"<html>", words:[220,260], plan:[…], useful_language:{Título:[frases]},
             checklist:[…], model:"<html>" }
     El alumno escribe en la caja (con rastro de escritura: no se pega),
     guarda el borrador y entrega. La entrega va a fun_submissions como
     kind 'writing' y el profesor la lee en su panel. El modelo se abre solo
     después de entregar: antes, invita a copiarlo.
     ===================================================================== */
  RENDER.writing = function (act, el) {
    const d = act.data || {}, lim = d.words || [220, 260];
    const clave = `nisfun-wr-${LEVEL}-${UD.number}-${act.code}`;
    el.classList.add('xex', 'xwr');
    let guardado = null; try { guardado = JSON.parse(localStorage.getItem(clave) || 'null'); } catch (e) {}
    const lista = arr => `<ul class="xul">${(arr || []).map(x => `<li>${x}</li>`).join('')}</ul>`;
    const ul = d.useful_language ? Object.entries(d.useful_language).map(([h, fr]) => `<h5>${esc(h)}</h5><ul>${fr.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`).join('') : '';
    el.innerHTML = `
      <div class="xtask-card"><span class="xgenre">${T('Writing', 'Écriture')} · Part ${d.part || 1} · ${esc(d.genre || 'essay')} · ${lim[0]}–${lim[1]} ${T('words', 'mots')}</span>
        ${d.task || ''}</div>
      ${d.plan ? `<details open><summary>🗺 ${T('Plan before you write', 'Un plan avant d’écrire')}</summary><div class="xd">${lista(d.plan)}</div></details>` : ''}
      ${ul ? `<details><summary>💬 ${T('Useful language', 'Expressions utiles')}</summary><div class="xd">${ul}</div></details>` : ''}
      <textarea placeholder="${T('Write your answer here…', 'Écris ta réponse ici…')}">${esc(guardado && guardado.text || '')}</textarea>
      <div class="xcount"><span>${T('Words', 'Mots')}: <b class="n">0</b> <span class="lim">/ ${lim[0]}–${lim[1]}</span></span><span class="xtime"></span></div>
      ${d.checklist ? `<details class="xcheck"><summary>✅ ${T('Before you hand in', 'Avant de rendre')}</summary><div class="xd">${d.checklist.map((c, i) => `<label><input type="checkbox" data-c="${i}"> ${c}</label>`).join('')}</div></details>` : ''}
      <div class="xbtns"><button type="button" class="save">💾 ${T('Save draft', 'Enregistrer')}</button>
        <button type="button" class="hand">📨 ${T('Hand in', 'Rendre')}</button><span class="xmsg"></span></div>
      ${d.model ? `<details class="xmodel" hidden><summary>📄 ${T('A model answer', 'Un exemple de réponse')}</summary><div class="xd">${d.model}</div></details>` : ''}`;
    const ta = el.querySelector('textarea'), nEl = el.querySelector('.xcount .n'), msg = el.querySelector('.xmsg'), bHand = el.querySelector('.hand');
    const modelo = el.querySelector('.xmodel');
    const cuenta = () => { const n = nWords(ta.value); nEl.textContent = n; nEl.className = 'n ' + (n >= lim[0] && n <= lim[1] + 20 ? 'ok' : (n > 0 && (n < lim[0] * .8 || n > lim[1] + 40) ? 'bad' : '')); return n; };
    cuenta();
    if (guardado && guardado.handed && modelo) modelo.hidden = false;
    if (guardado && guardado.handed) { msg.textContent = T('Handed in. You can still edit and hand in again.', 'Rendu. Tu peux encore modifier et rendre à nouveau.'); }
    let t;
    ta.addEventListener('input', () => { cuenta(); clearTimeout(t); t = setTimeout(() => guarda(false, true), 1500); });
    async function guarda(handed, silencio) {
      const text = ta.value, words = cuenta();
      const payload = { respuestas: [text], text, words, genre: d.genre || 'essay', part: d.part || 1, handed: !!handed,
        checklist: [...el.querySelectorAll('.xcheck input')].map(c => c.checked),
        trace: (window.WRITING_TRACE && WRITING_TRACE.of) ? WRITING_TRACE.of(ta) : null };
      try { localStorage.setItem(clave, JSON.stringify({ text, handed: !!handed || (guardado && guardado.handed) })); } catch (e) {}
      if (!silencio) msg.textContent = T('Saving…', 'Enregistrement…');
      if (window.BACKEND) {
        const r = await BACKEND.guardar('writing', { nivel: LEVEL, unidad: UD.number, codigo: act.code }, payload);
        if (!silencio) msg.textContent = r.ok ? (handed ? T('Handed in ✔ Your teacher will see it.', 'Rendu ✔ Ton professeur le verra.') : T('Draft saved ✔', 'Brouillon enregistré ✔'))
          : (r.motivo === 'not signed in' ? T('Saved on this device only — sign in through the portal to hand it in.', 'Enregistré sur cet appareil seulement — connecte-toi par le portail pour rendre.') : T('Could not save: ', 'Impossible d’enregistrer : ') + r.motivo);
      } else if (!silencio) msg.textContent = T('Saved on this device.', 'Enregistré sur cet appareil.');
    }
    el.querySelector('.save').onclick = () => guarda(false, false);
    bHand.onclick = async () => {
      const n = cuenta();
      if (n < lim[0] * .8) { msg.textContent = T(`Too short: write at least ${lim[0]} words.`, `Trop court : écris au moins ${lim[0]} mots.`); return; }
      bHand.disabled = true;
      // complete() guarda también el texto de la caja; después se pisa con
      // el payload completo (palabras, género, rastro).
      complete(act.code);
      await guarda(true, false);
      guardado = { text: ta.value, handed: true };
      if (modelo) modelo.hidden = false;
      bHand.disabled = false;
    };
    puenteMocks(el, 'writing');
  };

  /* =====================================================================
     pairwork con partes — Speaking Parts 1-4
     data.parts:[ {part:1, title, time, prompts:[…]},
                  {part:2, title, time, pictures:[{emoji, caption}], question, partner},
                  {part:3, title, time, centre, spokes:[5], decide},
                  {part:4, title, time, prompts:[…]} ]
     data.useful_language:{…}. Sin data.parts se pinta como siempre.
     La grabadora la monta el motor debajo, como en cualquier pairwork.
     ===================================================================== */
  const pairworkBase = RENDER.pairwork;
  RENDER.pairwork = function (act, el) {
    const d = act.data || {};
    if (!Array.isArray(d.parts) || !d.parts.length) return pairworkBase.call(RENDER, act, el);
    el.classList.add('xsp');
    const ul = d.useful_language ? `<details class="xul"><summary>💬 ${T('Useful language', 'Expressions utiles')}</summary><div class="xd">${Object.entries(d.useful_language).map(([h, fr]) => `<h5>${esc(h)}</h5><ul>${fr.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`).join('')}</div></details>` : '';
    const parte = p => {
      const cab = `<div class="xph"><b>${T('Part', 'Partie')} ${p.part} · ${esc(p.title || '')}</b>${p.time ? `<span>⏱ ${esc(p.time)}</span>` : ''}</div>${p.intro ? `<p>${p.intro}</p>` : ''}`;
      if (p.pictures) return `${cab}<p>${p.question || ''}</p>
        <div class="xpics">${p.pictures.map(pic => `<div class="xpic">${pic.img
          ? `<img class="xphoto" loading="lazy" alt="${esc(pic.caption || '')}" src="../assets/teen/${pic.img}.jpg?v=${TEEN_PIC_V}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'xe',textContent:'${pic.emoji || '🖼️'}'}))">`
          : `<div class="xe">${pic.emoji || '🖼️'}</div>`}<div class="xc">${esc(pic.caption || '')}</div>${credFoto(pic.img)}</div>`).join('')}</div>
        ${p.partner ? `<p><b>${T('Partner', 'Camarade')}:</b> ${p.partner}</p>` : ''}`;
      if (p.spokes) return `${cab}
        <div class="xmap">${p.spokes.slice(0, 2).map(s => `<div class="xspoke">${esc(s)}</div>`).join('')}<div class="xcentre">${esc(p.centre || '')}</div>${p.spokes.slice(2).map(s => `<div class="xspoke">${esc(s)}</div>`).join('')}</div>
        ${p.decide ? `<div class="xdecide">${p.decide}</div>` : ''}`;
      return `${cab}<ol>${(p.prompts || []).map(q => `<li>${q}</li>`).join('')}</ol>`;
    };
    el.innerHTML = `<div class="xtabs">${d.parts.map((p, i) => `<button type="button" data-i="${i}" class="${i ? '' : 'on'}">${T('Part', 'Partie')} ${p.part}</button>`).join('')}</div>
      <div class="xpart">${parte(d.parts[0])}</div>${ul}`;
    const caja = el.querySelector('.xpart');
    el.querySelectorAll('.xtabs button').forEach(b => b.onclick = () => {
      el.querySelectorAll('.xtabs button').forEach(x => x.classList.toggle('on', x === b));
      caja.innerHTML = parte(d.parts[+b.dataset.i]); });
  };

  /* ---- la caja de consejos, delante de cualquier actividad que la traiga ---- */
  Object.keys(RENDER).forEach(k => {
    const f = RENDER[k];
    RENDER[k] = function (act, el) {
      f.call(RENDER, act, el);
      if (act && act.tips) el.insertAdjacentHTML('afterbegin', tipsHTML(act.tips));
      // la lectura larga de B2/C1 tambien es una parte del examen
      if (k === 'reading' && /^(b2f|c1a)$/.test(String(typeof LEVEL !== 'undefined' ? LEVEL : ''))) puenteMocks(el, 'reading');
    };
  });

  /* ---- lo que el alumno marca en el repaso final por cada tipo nuevo ---- */
  window.PUEDO_EXTRA = {
    mc_cloze:          T('I can choose the word that fits a gap by its meaning, collocation and grammar (Use of English Part 1).', 'Je sais choisir le mot qui convient à un trou (Use of English, partie 1).'),
    word_formation:    T('I can form the right word from a root — noun, adjective, adverb, negative (Use of English Part 3).', 'Je sais former le bon mot à partir d’une racine (Use of English, partie 3).'),
    gapped_text:       T('I can put missing paragraphs back in a long text by following its logic and references (Reading Part 7).', 'Je sais replacer les paragraphes manquants d’un texte long (Reading, partie 7).'),
    multiple_matching: T('I can find which section of a long text says what, even when it is paraphrased (Reading Parts 6 and 8).', 'Je sais trouver quelle section d’un texte dit quoi (Reading, parties 6 et 8).'),
    listening_mc:      T('I can follow speakers’ opinions, attitudes and purposes and choose the right option (Listening Parts 1 and 3).', 'Je sais suivre les opinions des locuteurs et choisir la bonne option (Listening, parties 1 et 3).'),
    listening_match:   T('I can listen to five speakers and match each one to two different ideas (Listening Part 4).', 'Je sais associer cinq locuteurs à deux idées différentes (Listening, partie 4).'),
    writing:           T('I can plan and write a 220–260-word text in the right register, with a clear structure (Writing).', 'Je sais planifier et écrire un texte de 220–260 mots (Writing).'),
  };
})();
