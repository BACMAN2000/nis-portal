/* teen.js — los cursos de secundaria (KET · PET · B2 First · C1 Advanced) con
   su propia piel y su Grammar Lab.
   ------------------------------------------------------------------------
   El motor de Fun for Nordic nacio para primaria y lo cuenta todo con una
   mascota: bocadillo, "The story", "Picture words", caja magica. Con quince
   anos eso no se lee como un curso; se lee como un juego para ninos. Aqui
   van las tres pantallas que cambian de arriba abajo para los cuatro niveles
   de secundaria —la portada del curso, la unidad y una referencia de
   gramatica de 24 temas por nivel, explicada en diagramas— sin tocar ni el
   contenido ni los renderers de las actividades, que siguen siendo los del
   motor (RENDER) y los de exam-c1.js.

   index.html solo necesita: cargar este archivo, y en hub() y unit() ceder
   el paso con `if (window.TEEN && TEEN.es(LEVEL)) return TEEN.hub(idx)` /
   `TEEN.unit(UD, digital)`. Las globales que usa (LEVEL, UD, PROG, T, Q,
   esc, j, SCREENS, RENDER, SAY, REC, store, BACKEND, PORTAL, PERMISO,
   montaHistoria, partirFrases, marcaClaves, makeIntro, pintaSelfCheck,
   puenteProyectoChip, proyectoDeUnidad, camIcon) son las del motor.

   Rutas nuevas:  ?level=b2f&grammar=hub      el indice del Grammar Lab
                  ?level=b2f&grammar=<id>     un tema
   Contenido:     content/<level>/grammar/index.json + <id>.json
                  (esquema en tools/grammar-lab/SCHEMA.md)
   Fotos:         assets/teen/<level>-cover.jpg, <level>-u<N>.jpg,
                  area-<slug>.jpg (+ "-s" la miniatura), credits.json
   Audio:         audio/grammar/<level>/<id>.mp3 (dialogo del tema)
   ------------------------------------------------------------------------ */
window.TEEN = (function () {
  'use strict';

  const TEEN_V = '2026-09-19';    // sube al cambiar fotos o audio del lab (19-sep: Nadia cambia de voz)
  const CAST_V = '2026-09-17b';   // arte 3D del elenco (assets/characters/cast)

  const NIV = {
    a1: { name: 'A1 Foundations', full: 'A1 Foundations · the grammar before A2 Key', cefr: 'A1', icon: 'course',
          blurb: 'The twelve things every beginner needs before A2 Key: be, have got, the present simple and continuous, can, questions and where things are — each one explained step by step, with a story, colour blocks, audio and practice.' },
    ket: { name: 'A2 Key', full: 'A2 Key for Schools', cefr: 'A2', icon: 'ket',
           blurb: 'Your first Cambridge exam: everyday English for school, home and free time — reading, writing, listening and speaking, in the real exam format.' },
    pet: { name: 'B1 Preliminary', full: 'B1 Preliminary for Schools', cefr: 'B1', icon: 'pet',
           blurb: 'Independent English: stories, opinions, emails and articles — and the grammar that holds them together, in the real exam format.' },
    b2f: { name: 'B2 First', full: 'B2 First for Schools', cefr: 'B2', icon: 'fce',
           blurb: 'The exam that opens doors: essays, reports and reviews, Use of English, listening to real speech — and the grammar a B2 speaker is expected to control.' },
    c1a: { name: 'C1 Advanced', full: 'C1 Advanced', cefr: 'C1', icon: 'cae',
           blurb: 'English for university and work: nuance, register and precision — inversion, cleft sentences, hedging and the whole Use of English paper.' },
  };
  const es = lv => Object.prototype.hasOwnProperty.call(NIV, lv);

  /* ---- dibujos 3D: los de Cambridge (cambridge-icons.js) y los emoji 3D
     de Microsoft Fluent (MIT), servidos por jsDelivr ---- */
  const F3D = name => `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${encodeURIComponent(name)}/3D/${name.toLowerCase().replace(/ /g, '_')}_3d.png`;
  const ICO = {
    speaking: F3D('Speaking head'), vocabulary: F3D('Books'), grammar: F3D('Puzzle piece'),
    listening: 'cam:listening', reading: 'cam:reading', uoe: 'cam:uoe', writing: 'cam:writing',
    selfcheck: F3D('Check mark button'), lab: F3D('Light bulb'), exam: F3D('Graduation cap'),
    tip: F3D('Warning'), brain: F3D('Brain'), talk: F3D('Speech balloon'), target: F3D('Bullseye'),
    rocket: F3D('Rocket'), compass: F3D('Compass'), mic: F3D('Microphone'), pencil: F3D('Pencil'),
    trophy: F3D('Trophy'), search: F3D('Magnifying glass tilted left'), clock: F3D('Hourglass not done'),
    spark: F3D('Sparkles'), clip: F3D('Clipboard'), scale: F3D('Balance scale'), link: F3D('Link'),
    gear: F3D('Gear'), speaker: F3D('Loudspeaker'), open: F3D('Open book'),
  };
  function ico(key, size) {
    const v = ICO[key] || key;
    const s = size || 48;
    if (typeof v === 'string' && v.slice(0, 4) === 'cam:')
      return (typeof camIcon === 'function') ? camIcon(v.slice(4), s) : '';
    return `<img src="${v}" alt="" width="${s}" height="${s}" loading="lazy" decoding="async">`;
  }

  /* ---- fotos y sus creditos (licencia Unsplash: nombre + enlace) ---- */
  const FOTO = n => `../assets/teen/${n}.jpg?v=${TEEN_V}`;
  let CRED = null;
  async function creditos() {
    if (CRED) return CRED;
    try { CRED = await j('../assets/teen/credits.json'); } catch (e) { CRED = {}; }
    return CRED;
  }
  function credito(n) {
    const c = (CRED || {})[n];
    if (!c) return '';
    return `<span class="t-credit">Photo: <a href="${esc(c.link)}?utm_source=nis&utm_medium=referral" target="_blank" rel="noopener">${esc(c.name)}</a> / <a href="https://unsplash.com/?utm_source=nis&utm_medium=referral" target="_blank" rel="noopener">Unsplash</a></span>`;
  }
  // la foto de la unidad cae a la portada del nivel si no existe
  const fotoUnidad = (n, small) => `<img class="bg" src="${FOTO(`${LEVEL}-u${n}${small ? '-s' : ''}`)}" alt=""
      onerror="this.onerror=null;this.src='${FOTO(`${LEVEL}-cover${small ? '-s' : ''}`)}'">`;

  /* ---- que seccion del examen es cada actividad ---- */
  const SECCION = {
    pairwork: ['Speaking', 'speaking'], match_words: ['Vocabulary', 'vocabulary'], crossword: ['Vocabulary', 'vocabulary'],
    unscramble: ['Vocabulary', 'vocabulary'], grammar_box: ['Grammar', 'grammar'],
    reading: ['Reading & Use of English', 'reading'], gapped_text: ['Reading & Use of English', 'reading'],
    multiple_matching: ['Reading & Use of English', 'reading'], story_qa: ['Reading', 'reading'],
    mc_cloze: ['Reading & Use of English', 'uoe'], word_formation: ['Reading & Use of English', 'uoe'],
    key_transform: ['Reading & Use of English', 'uoe'], gap_text: ['Reading & Use of English', 'uoe'],
    listening: ['Listening', 'listening'], listening_mc: ['Listening', 'listening'], listening_match: ['Listening', 'listening'],
    writing: ['Writing', 'writing'], write_sentences: ['Writing', 'writing'], exam_task: ['Exam task', 'exam'],
  };
  const seccion = a => SECCION[a.type] || ['Activity', 'target'];
  function parte(a) {
    const m = /Parts?\s+(\d(?:\s*(?:and|&|,)\s*\d)*)/i.exec(a.title || '');
    if (m) return 'Part ' + m[1].replace(/\s*(and|&)\s*/g, ' & ');
    if (a.data && a.data.part) return 'Part ' + a.data.part;
    return '';
  }
  function tituloCorto(a) {
    const t = String(a.title || '').split(/\.\s|\s—\s/)[0];
    return t.replace(/\.$/, '');
  }
  function barraTarea(a) {
    const [sec, ik] = seccion(a);
    const p = parte(a);
    return `<div class="t-task"><div class="ico">${ico(ik, 56)}</div>
      <div><span class="t-kicker">${esc(a.code)} · ${esc(sec)}</span><h2>${esc(tituloCorto(a))}</h2></div>
      ${p ? `<span class="part">${esc(p)}</span>` : ''}</div>`;
  }

  /* la barra de progreso: los segmentos ya pasados se tiñen */
  function marcaPasados(i) {
    document.querySelectorAll('.scr-dot').forEach((d, k) => d.classList.toggle('past', k < i));
  }

  /* ---- Grammar Lab: indice y progreso ---- */
  let LAB = null;
  async function labIndex() {
    if (LAB !== null) return LAB;
    try { LAB = await j(`${CDIR}/${LEVEL}/grammar/index.json`); if (!LAB || !LAB.count) LAB = false; } catch (e) { LAB = false; }
    return LAB;
  }
  const labKey = id => `${LPFX}-gl-${LEVEL}-${id}`;
  function labProg(id) { try { return JSON.parse(localStorage.getItem(labKey(id)) || '{}'); } catch (e) { return {}; } }
  // hecho = todos los bloques de practica del tema (ket/pet traen cuatro; b2f/c1a, tres)
  function labHecho(id) { const p = labProg(id); return p.hecho === true || !!(p.mc && p.gap && p.transform); }
  const AREA_FOTO = {
    'Tenses & time': 'area-tenses', 'Tenses & aspect': 'area-tenses', 'Modals': 'area-modals',
    'Conditionals & hypothesis': 'area-conditionals', 'Passive & causative': 'area-passive',
    'Passive & reporting': 'area-reporting', 'Reporting': 'area-reporting', 'Sentence building': 'area-sentence',
    'Comparison & description': 'area-comparison', 'Emphasis & questions': 'area-emphasis', 'Words': 'area-words',
    'First words, first sentences': 'area-words', 'Every day': 'area-tenses', 'Here and now': 'area-sentence',
  };
  function labIndexHTML(lab) {
    let n = 0, etapa = null;
    // las areas pueden venir agrupadas en etapas (ket: A1 Foundations → A2 Key)
    return lab.areas.map(ar => `
      ${ar.stage && ar.stage !== etapa ? (etapa = ar.stage, `<div class="t-stage"><span class="t-kicker">${T('Stage', 'Étape')}</span><h2>${esc(ar.stage)}</h2></div>`) : ''}
      <div class="t-lab-area"><img src="${FOTO((AREA_FOTO[ar.area] || 'area-words') + '-s')}" alt="">
        <div><h3>${esc(ar.area)}</h3><small>${ar.topics.length} ${ar.topics.length === 1 ? T('topic', 'sujet') : T('topics', 'sujets')}</small></div></div>
      <div class="t-topics">${ar.topics.map(t => { n++; const done = labHecho(t.id);
        return `<a class="t-topic ${done ? 'done' : ''}" href="${Q(`?level=${LEVEL}&grammar=${t.id}`)}">
          <span class="n">${done ? '✓' : n}</span><span><b>${esc(t.title)}</b><small>${esc(t.tagline || '')}</small></span>
          <span class="cefr">${esc(t.cefr || NIV[LEVEL].cefr)}</span></a>`; }).join('')}</div>`).join('');
  }

  /* A1 Foundations y A2 Key se enlazan entre si: quien necesita la base baja,
     quien ya la tiene sube */
  function puente() {
    if (LEVEL === 'a1') return `<a class="t-bridge" href="${Q('?level=ket&grammar=hub')}">${ico('rocket', 40)}<span><b>${T('Ready for more?', 'Prêt pour la suite ?')}</b><small>${T('Go on to the A2 Key Grammar Lab — 24 topics for the exam.', 'Passe au Grammar Lab A2 Key.')}</small></span><span class="go">›</span></a>`;
    if (LEVEL === 'ket') return `<a class="t-bridge" href="${Q('?level=a1')}">${ico('compass', 40)}<span><b>${T('Need the basics first?', 'Besoin des bases ?')}</b><small>${T('A1 Foundations: be, have got, present simple, can, questions… twelve topics before A2.', 'A1 Foundations : douze sujets avant A2.')}</small></span><span class="go">›</span></a>`;
    return '';
  }

  /* ---- el mapa del examen: papers, partes y tiempos ---- */
  const EXAM = {
    ket: [
      ['reading', 'Reading & Writing', '1 hour · 7 parts', ['Reading 1 — signs and messages (6)', 'Reading 2 — three texts, match (7)', 'Reading 3 — long text, multiple choice (5)', 'Reading 4 — multiple-choice cloze (6)', 'Reading 5 — open cloze (6)', 'Writing 6 — short email (25 words)', 'Writing 7 — picture story (35 words)']],
      ['listening', 'Listening', 'about 30 min · 5 parts', ['1 — short conversations, pictures (5)', '2 — gap fill (5)', '3 — multiple choice (5)', '4 — five short texts, match (5)', '5 — match names and options (5)']],
      ['speaking', 'Speaking', '8–10 min · 2 parts · in pairs', ['1 — questions about yourself', '2 — discussion with prompts']],
    ],
    pet: [
      ['reading', 'Reading', '45 min · 6 parts', ['1 — signs and messages (5)', '2 — match people to texts (5)', '3 — long text, multiple choice (5)', '4 — gapped text (5)', '5 — multiple-choice cloze (6)', '6 — open cloze (6)']],
      ['writing', 'Writing', '45 min · 2 parts', ['1 — email (about 100 words)', '2 — article or story (about 100 words)']],
      ['listening', 'Listening', 'about 30 min · 4 parts', ['1 — pictures, multiple choice (7)', '2 — multiple choice (6)', '3 — gap fill (6)', '4 — interview, multiple choice (6)']],
      ['speaking', 'Speaking', '12–17 min · 4 parts · in pairs', ['1 — questions about yourself', '2 — describe a photo (1 min)', '3 — discuss a situation with your partner', '4 — discussion on the same topic']],
    ],
    b2f: [
      ['uoe', 'Reading & Use of English', '1 h 15 min · 7 parts · 52 questions', ['1 — multiple-choice cloze (8)', '2 — open cloze (8)', '3 — word formation (8)', '4 — key word transformations (6)', '5 — multiple choice (6)', '6 — gapped text (6)', '7 — multiple matching (10)']],
      ['writing', 'Writing', '1 h 20 min · 2 parts', ['1 — essay (140–190 words), compulsory', '2 — article, email/letter, review or story (140–190 words)']],
      ['listening', 'Listening', 'about 40 min · 4 parts · 30 questions', ['1 — eight short extracts, multiple choice (8)', '2 — sentence completion (10)', '3 — five speakers, multiple matching (5)', '4 — interview, multiple choice (7)']],
      ['speaking', 'Speaking', '14 min · 4 parts · in pairs', ['1 — interview (2 min)', '2 — long turn with photos (4 min)', '3 — collaborative task (4 min)', '4 — discussion (4 min)']],
    ],
    c1a: [
      ['uoe', 'Reading & Use of English', '1 h 30 min · 8 parts · 56 questions', ['1 — multiple-choice cloze (8)', '2 — open cloze (8)', '3 — word formation (8)', '4 — key word transformations (6)', '5 — multiple choice (6)', '6 — cross-text multiple matching (4)', '7 — gapped text (6)', '8 — multiple matching (10)']],
      ['writing', 'Writing', '1 h 30 min · 2 parts', ['1 — essay (220–260 words), compulsory', '2 — letter/email, proposal, report or review (220–260 words)']],
      ['listening', 'Listening', 'about 40 min · 4 parts · 30 questions', ['1 — three short extracts, multiple choice (6)', '2 — sentence completion (8)', '3 — interview, multiple choice (6)', '4 — five speakers, two tasks (10)']],
      ['speaking', 'Speaking', '15 min · 4 parts · in pairs', ['1 — interview (2 min)', '2 — long turn with photos (4 min)', '3 — collaborative task (4 min)', '4 — discussion (5 min)']],
    ],
  };
  function examMapHTML() {
    const n = NIV[LEVEL];
    return `<div class="t-section"><h2>${ico('exam', 34)} ${esc(n.full)}</h2><p>${T('The papers, their parts and their timing — so nothing surprises you on the day.', 'Les épreuves, leurs parties et leur durée.')}</p></div>
      <div class="t-exam">${(EXAM[LEVEL] || []).map(([ik, nombre, meta, partes]) => `
        <div class="t-paper"><div class="h">${ico(ik, 44)}<div><b>${esc(nombre)}</b><small>${esc(meta)}</small></div></div>
          <ul>${partes.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}</div>
      <p class="scr-pie" style="margin-top:1rem">${T('Practice tests and mocks in the real format are in the portal: Cambridge → Practice Tests · Mocks.', 'Les tests blancs sont dans le portail.')}</p>`;
  }

  /* ======================================================================
     LA PORTADA DEL CURSO
     ====================================================================== */
  async function hub(idx) {
    document.body.classList.add('teen');
    const n = NIV[LEVEL];
    await creditos();
    const lab = await labIndex();
    document.title = `${n.name} · Nordic`;
    app.classList.add('hub');
    const unidades = DEMO ? idx.units.slice(0, 2) : idx.units;
    const progreso = unidades.map(u => {
      const p = store.get(u.n);
      return { unit: u, done: Math.min(4, p.done ? Object.keys(p.done).length : 0) };
    });
    const totalHechas = progreso.reduce((s, p) => s + p.done, 0);
    const porcentaje = Math.round(totalHechas * 100 / Math.max(1, unidades.length * 4));
    const ultima = Number(localStorage.getItem(`${LPFX}-${LEVEL}-lastUnit`));
    const siguiente = progreso.find(p => p.unit.n === ultima && p.done < 4) || progreso.find(p => p.done < 4) || progreso[progreso.length - 1];
    const terminadas = progreso.filter(p => p.done >= 4).length;
    const nLab = lab ? lab.areas.reduce((s, a) => s + a.topics.length, 0) : 0;
    const labHechos = lab ? lab.areas.reduce((s, a) => s + a.topics.filter(t => labHecho(t.id)).length, 0) : 0;

    // A1 Foundations no tiene unidades: la portada ES su Grammar Lab
    if (!unidades.length && lab) {
      const sig = todos => todos.find(t => !labHecho(t.id));
      const temas = lab.areas.flatMap(a => a.topics);
      const prox = sig(temas) || temas[0];
      SCREENS.montar(app, [{ titulo: n.full,
        html: `<div class="scr-centro">
          <div class="t-hero"><img class="bg" src="${FOTO(`${LEVEL}-cover`)}" alt="" onerror="this.remove()">
            <div class="icon3d">${ico('cam:' + n.icon, 104)}</div>
            <div class="in"><span class="t-kicker">Cambridge English · ${esc(n.cefr)}</span><h1>${esc(n.name)}</h1>
              <p class="lead">${esc(n.blurb)}</p>
              <div class="row"><span class="t-chip">${nLab} ${T('grammar topics', 'points de grammaire')}</span><span class="t-chip">${T('Story, colour blocks, audio', 'Histoire, blocs, audio')}</span><span class="t-chip">${T('4 rounds of practice each', '4 exercices par sujet')}</span></div></div>
            ${credito(`${LEVEL}-cover`)}</div>
          <section class="course-status" aria-label="${T('Course progress', 'Progression')}">
            <div><h3>${labHechos ? T(`Continue with: ${prox.title}`, `Continuer : ${prox.title}`) : T(`Start with: ${prox.title}`, `Commencer : ${prox.title}`)}</h3>
              <p>${T(`${labHechos} of ${nLab} topics completed`, `${labHechos} sujets sur ${nLab}`)}</p></div>
            <a class="continue" href="${Q(`?level=${LEVEL}&grammar=${prox.id}`)}">${labHechos ? T('Continue', 'Continuer') : T('Start', 'Commencer')} <span aria-hidden="true">›</span></a>
            <div class="course-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(labHechos * 100 / Math.max(1, nLab))}"><span style="--progress:${Math.round(labHechos * 100 / Math.max(1, nLab))}%"></span></div>
          </section>
          ${labIndexHTML(lab)}
          ${puente()}</div>` }],
        { arriba: { href: Q('?'), texto: T('Courses', 'Cours') }, portal: PORTAL });
      return;
    }

    const hero = `<div class="t-hero">
      <img class="bg" src="${FOTO(`${LEVEL}-cover`)}" alt="" onerror="this.remove()">
      <div class="icon3d">${ico('cam:' + n.icon, 104)}</div>
      <div class="in"><span class="t-kicker">Cambridge English · ${esc(n.cefr)}</span>
        <h1>${esc(n.name)}</h1>
        <p class="lead">${esc(n.blurb)}</p>
        <div class="row"><span class="t-chip">${unidades.length} ${T('units', 'unités')}</span>
          ${nLab ? `<span class="t-chip">${nLab} ${T('grammar topics', 'points de grammaire')}</span>` : ''}
          <span class="t-chip">${T('Real exam tasks', 'Tâches d’examen')}</span>
          <span class="t-chip">${T('Audio, photos, dialogues', 'Audio, photos, dialogues')}</span></div></div>
      ${credito(`${LEVEL}-cover`)}</div>`;

    const estado = `<section class="course-status" aria-label="${T('Course progress', 'Progression')}">
      <div><h3>${totalHechas ? T(`Continue with Unit ${siguiente.unit.n}`, `Continuer l'unité ${siguiente.unit.n}`) : T('Start with Unit 1', 'Commencer l’unité 1')}</h3>
        <p>${T(`${terminadas} of ${unidades.length} units completed · ${porcentaje}% overall`, `${terminadas} unités sur ${unidades.length} · ${porcentaje}%`)}${nLab ? ` · ${labHechos}/${nLab} ${T('grammar topics', 'points')}` : ''}</p></div>
      <a class="continue" href="${Q(`?level=${LEVEL}&unit=${siguiente.unit.n}`)}">${totalHechas ? T('Continue', 'Continuer') : T('Start', 'Commencer')} <span aria-hidden="true">›</span></a>
      <div class="course-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${porcentaje}"><span style="--progress:${porcentaje}%"></span></div>
    </section>`;

    const dentro = `<div class="t-inside">
      <button class="it" type="button" data-go="0" style="cursor:pointer">${ico('open', 46)}<span><b>${unidades.length} ${T('units', 'unités')}</b><small>${T('Reading, Use of English, listening, writing and speaking, one part at a time.', 'Toutes les compétences, une partie à la fois.')}</small></span></button>
      ${lab ? `<a class="it" href="${Q(`?level=${LEVEL}&grammar=hub`)}">${ico('lab', 46)}<span><b>Grammar Lab · ${nLab}</b><small>${T('Every structure explained in diagrams, with a dialogue and practice.', 'Chaque structure en schémas, avec dialogue et exercices.')}</small></span></a>` : ''}
      <button class="it" type="button" data-go="${lab ? 2 : 1}" style="cursor:pointer">${ico('exam', 46)}<span><b>${T('Exam map', 'Carte de l’examen')}</b><small>${esc(n.full)}: ${T('papers, parts and timing.', 'épreuves, parties et durée.')}</small></span></button>
    </div>`;

    const tarjeta = u => {
      const p = store.get(u.n);
      const hechas = Math.min(4, p.done ? Object.keys(p.done).length : 0);
      const cerrada = !(window.BACKEND && BACKEND.puedeAbrir(PERMISO, u.n));
      const inner = `<div class="ph">${fotoUnidad(u.n, true)}<span class="num">${u.n}</span></div>
        <div class="bd"><b>${esc(u.title)}</b><small>${esc(u.topic || '')}</small>
          <div class="ft">${cerrada ? `<span>🔒 ${T('Your teacher opens this one later', 'Ton professeur l’ouvrira plus tard')}</span>`
            : `<span class="t-meter"><span style="width:${hechas * 25}%"></span></span><span>${hechas}/4</span>`}</div></div>`;
      return cerrada ? `<span class="t-card locked" aria-disabled="true">${inner}</span>`
                     : `<a class="t-card" href="${Q(`?level=${LEVEL}&unit=${u.n}`)}">${inner}</a>`;
    };

    const pantallas = [
      { titulo: n.full, etiquetaSiguiente: lab ? 'Grammar Lab' : T('Exam map', 'Carte de l’examen'),
        html: `<div class="scr-centro">${hero}${estado}${dentro}
          <div class="t-section"><h2>${T('Units', 'Unités')}</h2><p>${T('Each one is a full lesson: vocabulary, a text, grammar, an exam task, listening, writing and speaking.', 'Chacune est une leçon complète.')}</p></div>
          <div class="t-grid">${unidades.map(tarjeta).join('')}</div>
          ${DEMO ? `<div class="demoflag">${T(`Demonstration — the first two units. The full course has ${idx.units.length}.`, `Démonstration — les deux premières unités.`)}</div>` : ''}
        </div>`,
        alMostrar(el) {
          localStorage.setItem(`${LPFX}-${LEVEL}-intro-seen`, '1');
          el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
            const k = +b.dataset.go;
            if (k === 0) { const g = el.querySelector('.t-grid'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            else SCREENS.ir(k);
          });
        } },
    ];
    if (lab) pantallas.push({
      titulo: 'Grammar Lab', etiquetaSiguiente: T('Exam map', 'Carte de l’examen'),
      html: `<div class="scr-centro">
        <div class="t-hero" style="min-height:13rem"><img class="bg" src="${FOTO('area-sentence')}" alt="" onerror="this.remove()">
          <div class="icon3d">${ico('lab', 104)}</div>
          <div class="in"><span class="t-kicker">${esc(n.name)} · ${T('reference', 'référence')}</span><h1>Grammar Lab</h1>
            <p class="lead">${T(`The ${nLab} structures ${/^[AEIOU]/.test(n.cefr) ? "an" : "a"} ${n.cefr} candidate is expected to control — each one in diagrams, with real examples, the mistakes to avoid, a conversation and ${LEVEL === 'a1' || LEVEL === 'ket' || LEVEL === 'pet' ? 'four' : 'three'} rounds of practice.`, `Les ${nLab} structures du niveau ${n.cefr}.`)}</p></div>${credito('area-sentence')}</div>
        ${puente()}${labIndexHTML(lab)}</div>`,
    });
    pantallas.push({ titulo: T('Exam map', 'Carte de l’examen'), html: `<div class="scr-centro">${examMapHTML()}</div>` });

    SCREENS.montar(app, pantallas, {
      arriba: { href: Q('?'), texto: T('Courses', 'Cours') },
      portal: PORTAL, alCambiar: marcaPasados,
    });
    marcaPasados(0);
  }

  /* ======================================================================
     LA UNIDAD
     ====================================================================== */
  async function unit(ud, digital) {
    document.body.classList.add('teen');
    const n = NIV[LEVEL];
    await creditos();
    const lab = await labIndex();
    const exam = ud.exam_focus || {};
    const proyecto = (typeof puenteProyectoChip === 'function' && typeof proyectoDeUnidad === 'function') ? puenteProyectoChip(proyectoDeUnidad()) : '';

    // que hay en la unidad, y a que pantalla lleva cada cosa (0 portada,
    // 1 lead-in, 2 word bank, 3.. actividades, ultima self-check)
    const plan = digital.map((a, k) => {
      const [sec, ik] = seccion(a);
      return `<button type="button" data-go="${k + 3}" class="${PROG.done[a.code] ? 'done' : ''}">${ico(ik, 30)}
        <span><span class="k">${esc(a.code)} · ${esc(sec)}</span>${esc(tituloCorto(a))}</span></button>`;
    }).join('');

    const hero = `<div class="t-hero unit">${fotoUnidad(ud.number)}
      <div class="icon3d">${ico('cam:' + n.icon, 96)}</div>
      <div class="in"><span class="t-kicker">${esc(n.name)} · ${T('Unit', 'Unité')} ${ud.number}</span>
        <h1>${esc(ud.title)}</h1>
        ${ud.scene && ud.scene.bubble ? `<p class="lead">${esc(ud.scene.bubble)}</p>` : ''}
        <div class="row">${ud.grammar ? `<span class="t-chip">${ico('grammar', 18)} ${esc(ud.grammar)}</span>` : ''}
          ${exam.paper ? `<span class="t-chip">${esc(exam.paper)}${exam.part ? ` · ${T('Part', 'Partie')} ${esc(exam.part)}` : ''}</span>` : ''}
          ${proyecto}</div></div>
      ${credito(`${LEVEL}-u${ud.number}`)}</div>`;

    // el texto de la unidad, frase a frase para el reproductor del motor
    const frases = partirFrases(makeIntro(ud));
    const vistas = new Set();
    const historia = frases.map((f, k) => `<span class="sfr" data-k="${k}" role="button" tabindex="0">${marcaClaves(f, ud.wordlist, vistas)}</span>`).join(' ');

    // las palabras con su significado, si la unidad lo trae en el emparejado
    const significados = {};
    (ud.activities || []).filter(a => a.type === 'match_words' && a.data && a.data.pairs).forEach(a =>
      a.data.pairs.forEach(p => { if (p.left && p.right && !significados[p.left]) significados[p.left] = p.right; }));
    const palabras = [...(ud.wordlist || []).map(w => ({ w, extra: false })), ...(ud.wordlist_extra || []).map(w => ({ w, extra: true }))];
    const banco = `<div class="t-words">${palabras.map(({ w, extra }) => `<div class="t-word">
        <button type="button" data-say="${esc(w)}" aria-label="${T('Say', 'Dis')} ${esc(w)}">🔊</button>
        <div><b>${esc(w)}</b>${significados[w] ? `<small>${esc(significados[w])}</small>` : ''}${extra ? `<span class="x">${T('from the syllabus', 'du programme')}</span>` : ''}</div></div>`).join('')}</div>`;

    // el tema del Grammar Lab que corresponde a cada caja de gramatica
    const temaDe = a => {
      if (!lab) return null;
      const todos = lab.areas.flatMap(x => x.topics);
      const id = a.data && a.data.lab;
      return (id && todos.find(t => t.id === id)) || null;
    };

    const pantallas = [
      { titulo: `${T('Unit', 'Unité')} ${ud.number} · ${ud.title}`, etiquetaSiguiente: T('Lead-in', 'Introduction'),
        html: `<div class="scr-centro">${hero}
          <div class="t-section"><h2>${T('In this unit', 'Dans cette unité')}</h2><p>${T('Tap a step to jump to it.', 'Touche une étape pour y aller.')}</p></div>
          <div class="t-plan">${plan}<button type="button" data-go="${digital.length + 3}">${ico('selfcheck', 30)}<span><span class="k">${T('End', 'Fin')}</span>${T('Self-check', 'Auto-évaluation')}</span></button></div></div>`,
        alMostrar(el) { el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => SCREENS.ir(+b.dataset.go)); } },
      { titulo: T('Lead-in', 'Introduction'), etiquetaSiguiente: T('Word bank', 'Vocabulaire'),
        html: `<div class="scr-centro"><div class="t-article">
          <span class="t-kicker">${T('Before you start', 'Avant de commencer')}</span>
          <h2>${esc(ud.title)}</h2>
          <div class="t-lead"><button class="guia-say historia-say t-btn sm" type="button">🔊 ${T('Listen', 'Écoute')}</button>
            <span class="t-chip">${T('Tap any sentence to hear it again', 'Touche une phrase pour la réécouter')}</span></div>
          <p id="lahistoria">${historia}</p>
          <div class="sp" hidden><audio class="sp-audio" preload="none"></audio>
            <div class="sp-btns"><button class="sp-b sp-main sp-play" type="button">&#9654; ${T('Play', 'Lire')}</button>
              <button class="sp-b sp-stop" type="button">&#9209; ${T('Stop', 'Arrêter')}</button>
              <button class="sp-b sp-prev" type="button">&#9198; ${T('Back', 'Retour')}</button>
              <button class="sp-b sp-again" type="button">&#128257; ${T('Again', 'Encore')}</button>
              <button class="sp-b sp-next" type="button">&#9197; ${T('Next', 'Suivant')}</button>
              <button class="sp-b sp-slow" type="button" aria-pressed="false">&#128034; ${T('Slow', 'Lent')}</button></div>
            <div class="sp-bar"><div class="sp-fill"></div></div>
            <div class="sp-pie"><span class="sp-parte"></span><span class="sp-reloj"></span></div>
            <p class="sp-tip"></p></div>
        </div></div>`,
        alMostrar(el) { montaHistoria(el, frases); } },
      { titulo: T('Word bank', 'Vocabulaire'), etiquetaSiguiente: digital.length ? `${digital[0].code} · ${seccion(digital[0])[0]}` : T('Finish', 'Terminer'),
        html: `<div class="scr-centro"><div class="t-section" style="max-width:60rem;margin-left:auto;margin-right:auto"><h2>${ico('vocabulary', 34)} ${T('Word bank', 'Vocabulaire')}</h2><p>${T('The words of this unit. Listen, then use them in the tasks.', 'Les mots de l’unité.')}</p></div>${banco}</div>`,
        alMostrar(el) { el.querySelectorAll('.t-word [data-say]').forEach(b => b.onclick = () => SAY.play(b.dataset.say, b)); } },
    ];

    digital.forEach((a, k) => {
      const sig = k < digital.length - 1 ? `${digital[k + 1].code} · ${seccion(digital[k + 1])[0]}` : T('Self-check', 'Auto-évaluation');
      const tema = a.type === 'grammar_box' ? temaDe(a) : null;
      pantallas.push({
        titulo: `${a.code} · ${tituloCorto(a)}`, etiquetaSiguiente: sig,
        html: `<div class="scr-centro">${barraTarea(a)}
          <section class="act ${PROG.done[a.code] ? 'done' : ''}" id="act-${a.code}"><div class="body" id="body-${a.code}"></div></section>
          ${tema ? `<div class="gb-lab">${ico('lab', 42)}<div><b>${T('Go deeper in the Grammar Lab', 'Approfondir')}: ${esc(tema.title)}</b><small>${esc(tema.tagline || '')}</small></div>
            <a class="t-btn sm" href="${Q(`?level=${LEVEL}&grammar=${tema.id}`)}">${T('Open', 'Ouvrir')} ›</a></div>` : ''}</div>`,
        alMostrar() {
          const cuerpo = document.getElementById('body-' + a.code);
          if (cuerpo && !cuerpo.dataset.listo) {
            RENDER[a.type](a, cuerpo);
            cuerpo.dataset.listo = '1';
            if (a.type === 'pairwork' || a.type === 'spot_diff') {
              const g = document.createElement('div');
              cuerpo.parentNode.appendChild(g);
              REC.montar(g, { nivel: LEVEL, unidad: ud.number, codigo: a.code });
            }
          }
        } });
    });

    pantallas.push({
      titulo: T('Self-check — what can you do now?', 'Auto-évaluation'),
      html: `<div class="scr-centro"><div class="t-task"><div class="ico">${ico('selfcheck', 56)}</div><div><span class="t-kicker">${T('End of the unit', 'Fin de l’unité')}</span><h2>${T('What can you do now?', 'Qu’est-ce que tu sais faire ?')}</h2></div></div>
        <div class="selfcheck act" id="selfcheck"></div></div>`,
      alMostrar() { pintaSelfCheck(document.getElementById('selfcheck'), digital); } });

    SCREENS.montar(app, pantallas, {
      arriba: { href: Q(`?level=${LEVEL}`), texto: n.name },
      portal: PORTAL, alCambiar: marcaPasados,
    });
    marcaPasados(SCREENS.actual());
  }

  /* ======================================================================
     LOS DIAGRAMAS
     ====================================================================== */
  const inl = t => String(t == null ? '' : t).replace(/<(?!\/?[bi]>)/g, '&lt;');   // solo <b> e <i>
  const KICKER = { timeline: 'Timeline', formula: 'Pattern', contrast: 'Compare', transform: 'Transform', map: 'Map', scale: 'Scale',
                   blocks: 'Build it', steps: 'Step by step', spelling: 'Spelling' };
  function diagrama(g) {
    const f = { timeline, formula, contrast, transform, map, scale, blocks, steps, spelling }[g.type];
    if (!f) return '';
    return `<div class="t-diag t-${g.type}"><h4><span class="t-kicker">${esc(KICKER[g.type] || g.type)}</span> ${inl(g.title || '')}</h4>
      ${f(g)}${g.caption ? `<p class="cap">${inl(g.caption)}</p>` : ''}</div>`;
  }
  /* la frase como bloques de colores (Lego): cada pieza lleva su papel y la
     leyenda solo enseña los papeles que salen */
  const ROL = { subj: ['Who', 'Qui'], aux: ['Helper verb', 'Auxiliaire'], verb: ['Verb', 'Verbe'], obj: ['What / who', 'Quoi / qui'],
                neg: ['Not', 'Négation'], time: ['When', 'Quand'], place: ['Where', 'Où'], kw: ['Key word', 'Mot clé'], x: ['', ''] };
  function blocks(g) {
    const usados = [];
    const filas = (g.sentences || []).map(sn => `<div class="t-bl-row">${(sn.parts || []).map(pt => {
        const r = ROL[pt.role] ? pt.role : 'x';
        if (r !== 'x' && !usados.includes(r)) usados.push(r);
        const punt = /^[.,?!;:]$/.test(String(pt.t || '').trim());
        return `<span class="t-brick ${r}${punt ? ' p' : ''}">${inl(pt.t)}</span>`; }).join('')}
      ${sn.note ? `<span class="t-bl-note">${inl(sn.note)}</span>` : ''}</div>`).join('');
    const leyenda = g.legend === false || !usados.length ? '' : `<div class="t-bl-legend">${usados.map(r => `<span><i class="t-brick ${r}"></i>${T(ROL[r][0], ROL[r][1])}</span>`).join('')}</div>`;
    return `<div class="t-bl">${filas}${leyenda}</div>`;
  }
  function steps(g) {
    return `<div class="t-st">${(g.steps || []).map((x, i) => `<div class="t-step"><span class="n">${i + 1}</span><div><b>${inl(x.label)}</b><span class="ex">${inl(x.ex)}</span></div></div>`).join('')}</div>`;
  }
  function spelling(g) {
    return `<div class="t-sp">${(g.rules || []).map(r => `<div class="t-sp-rule"><b>${inl(r.rule)}</b><ul>${(r.examples || []).map(e => `<li>${inl(e)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  function timeline(g) {
    const X = { 'before-past': 120, past: 300, now: 520, future: 700 };
    const marks = g.marks || [];
    const W = 800, yAxis = 72;
    const usados = {};
    const px = marks.map(m => { const x = X[m.at] || 400; usados[x] = (usados[x] || 0) + 1; return x + (usados[x] - 1) * 44; });
    const envuelve = (t, w) => {
      const out = []; let cur = '';
      String(t || '').split(' ').forEach(p => { if ((cur + ' ' + p).trim().length > w) { out.push(cur.trim()); cur = p; } else cur += ' ' + p; });
      if (cur.trim()) out.push(cur.trim());
      return out;
    };
    // las etiquetas van debajo del eje, alternando dos alturas para que dos
    // marcas vecinas no se pisen; las flechas van por encima del eje
    const marcas = marks.map((m, i) => {
      const x = px[i], y0 = i % 2 === 0 ? 104 : 168;
      const lineas = envuelve(m.label, 24);
      const sub = envuelve(m.sub, 26);
      const txt = lineas.map((l, k) => `<text class="lbl" x="${x}" y="${y0 + k * 15}" text-anchor="middle">${esc(l)}</text>`).join('')
        + sub.map((l, k) => `<text class="sub" x="${x}" y="${y0 + lineas.length * 15 + k * 13}" text-anchor="middle">${esc(l)}</text>`).join('');
      return `<line x1="${x}" y1="${yAxis}" x2="${x}" y2="${y0 - 12}" stroke="var(--line)" stroke-width="2" stroke-dasharray="3 3"/>
        <circle class="mark ${i % 2 ? 'b' : ''}" cx="${x}" cy="${yAxis}" r="9"/>${txt}`;
    }).join('');
    const flechas = (g.arrows || []).map(([a, b, lbl]) => {
      const x1 = px[a], x2 = px[b], mid = (x1 + x2) / 2;
      const c = `M ${x1} ${yAxis - 12} C ${x1} ${yAxis - 58}, ${x2} ${yAxis - 58}, ${x2} ${yAxis - 12}`;
      return `<path class="arr" d="${c}"/>${lbl ? `<text class="arrlbl" x="${mid}" y="${yAxis - 54}" text-anchor="middle">${esc(lbl)}</text>` : ''}`;
    }).join('');
    return `<svg viewBox="0 0 ${W} 236" role="img" aria-label="${esc(g.title || 'timeline')}">
      <defs><marker id="t-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--t-kw)"/></marker></defs>
      <line class="axis" x1="40" y1="${yAxis}" x2="${W - 40}" y2="${yAxis}"/>
      <polygon points="${W - 40},${yAxis - 7} ${W - 26},${yAxis} ${W - 40},${yAxis + 7}" fill="var(--line)"/>
      <line class="now" x1="${X.now}" y1="${yAxis - 16}" x2="${X.now}" y2="224"/>
      <text class="zone" x="${X.past - 30}" y="232" text-anchor="middle">PAST</text>
      <text class="zone" x="${X.now}" y="232" text-anchor="middle">NOW</text>
      <text class="zone" x="${X.future}" y="232" text-anchor="middle">FUTURE</text>
      ${flechas}${marcas}</svg>`;
  }
  function chips(parts) {
    return `<div class="t-formula">${(parts || []).map(p => `<span class="t-fchip ${esc(p.tone || 'a')}">${inl(p.chip)}${p.ex ? `<small>${inl(p.ex)}</small>` : ''}</span>`).join('')}</div>`;
  }
  function formula(g) { return chips(g.parts); }
  function contrast(g) {
    return `<table class="t-contrast"><thead><tr><th></th>${(g.columns || []).map(c => `<th>${inl(c)}</th>`).join('')}</tr></thead>
      <tbody>${(g.rows || []).map(r => `<tr><td>${inl(r.label)}</td>${(r.cells || []).map(c => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  function resalta(texto, hl) {
    let out = inl(texto);
    (hl || []).slice().sort((a, b) => b.length - a.length).forEach(h => {
      const re = new RegExp(h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      out = out.replace(re, m => `<mark>${m}</mark>`);
    });
    return out;
  }
  function transform(g) {
    return `<div class="t-tr"><div class="sent"><span class="k">${T('Before', 'Avant')}</span>${resalta(g.before.text, g.before.hl)}</div>
      <div class="down">⌄</div>
      <div class="sent after"><span class="k">${T('After', 'Après')}</span>${resalta(g.after.text, g.after.hl)}</div>
      ${(g.steps || []).length ? `<ol>${g.steps.map(s => `<li>${inl(s)}</li>`).join('')}</ol>` : ''}</div>`;
  }
  function map(g) {
    const tonos = ['a', 'b', 'c', 'kw'];
    return `<div class="t-map"><div class="center">${inl(g.center || g.title)}</div>
      ${(g.branches || []).map((b, i) => `<div class="br ${esc(b.tone || tonos[i % 4])}"><div class="h">${inl(b.label)}</div><ul>${(b.items || []).map(x => `<li>${inl(x)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  }
  function scale(g) {
    return `<div class="t-scale"><div class="bar"></div>
      ${(g.items || []).map(x => `<span class="pt" style="left:${Math.max(0, Math.min(100, x.pct))}%">${inl(x.label)}</span>`).join('')}
      <span class="end l">${inl(g.left || '')}</span><span class="end r">${inl(g.right || '')}</span></div>`;
  }

  /* ======================================================================
     LA CAJA DE GRAMATICA DE LA UNIDAD, EN VERSION SECUNDARIA
     Misma data que el renderer del motor (title, intro, examples, rules,
     practice) mas, si la trae, data.formula (bloques) y data.diagram.
     ====================================================================== */
  function grammarBox(act, el) {
    el.classList.add('gbox');
    const d = act.data || {};
    const pr = (d.practice && d.practice.items) || [];
    el.innerHTML = `<div class="gb-card">
      <div class="gb-h"><span class="gb-tag">${T('Grammar', 'Grammaire')}</span><h3>${inl(d.title || '')}</h3></div>
      ${d.can ? `<p class="t-kicker" style="margin:.2rem 0 .6rem">${T('Goal', 'Objectif')}: <span style="text-transform:none;letter-spacing:0;font-weight:500">${inl(d.can)}</span></p>` : ''}
      ${d.intro ? `<p class="gb-intro">${inl(d.intro)}</p>` : ''}
      ${d.formula ? chips(d.formula) : ''}
      ${d.diagram ? diagrama(d.diagram) : ''}
      ${(!d.formula && d.lab) ? '<div class="gb-visual"></div>' : ''}
      ${(d.examples || []).length ? `<ul class="gb-ex">${d.examples.map((e, i) => `<li><button class="clue-say" type="button" data-ex="${i}" aria-label="${T('Listen', 'Écoute')}">🔊</button>
        ${inl((e && e.text) ? e.text : e)}${(e && e.note) ? ` <span class="gb-note">${inl(e.note)}</span>` : ''}</li>`).join('')}</ul>` : ''}
      ${(d.rules || []).length ? `<ol class="gb-rules">${d.rules.map(r => `<li>${inl(r)}</li>`).join('')}</ol>` : ''}
    </div>
    ${pr.length ? `<div class="gb-practice t-pr"><p class="gb-ph"><b>${T('Your turn', 'À toi')}</b>${d.practice.instructions ? ` · ${inl(d.practice.instructions)}` : ''}</p>
      ${pr.map((it, i) => `<div class="item" data-i="${i}"><div class="stem">${i + 1}. ${inl(it.sentence).replace('___', '<b class="blank"></b>')}</div>
        <div class="opts">${it.options.map((o, k) => `<button class="obtn" type="button" data-k="${k}">${inl(o)}</button>`).join('')}</div>${it.why ? `<p class="why">${inl(it.why)}</p>` : ''}</div>`).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>` : ''}`;
    el.querySelectorAll('.gb-ex .clue-say').forEach(b => b.onclick = () => {
      const e = (d.examples || [])[+b.dataset.ex];
      const t = (e && e.text) ? e.text : e;
      if (t) SAY.frase(String(t).replace(/<[^>]+>/g, ''), b, 'grammar');
    });
    montaMC(el, pr, ok => { if (ok === pr.length && typeof complete === 'function') complete(act.code); });
    // La caja de la unidad no trae diagrama: se le pide al tema del Lab al
    // que apunta (data.lab) su formula y su primer diagrama, y asi la regla
    // se ve tambien dentro de la unidad, no solo en la referencia.
    const hueco = el.querySelector('.gb-visual');
    if (hueco && d.lab) j(`${CDIR}/${LEVEL}/grammar/${d.lab}.json`).then(t => {
      hueco.innerHTML = (t.form && t.form.formula ? chips(t.form.formula) : '') + ((t.diagrams || [])[0] ? diagrama(t.diagrams[0]) : '');
    }).catch(() => hueco.remove());
  }

  /* ---- practica: opcion multiple, huecos, transformaciones ---- */
  const norm = v => String(v || '').toLowerCase().replace(/[’']/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
  function montaMC(el, items, alTerminar) {
    el.querySelectorAll('.item').forEach(item => item.querySelectorAll('.obtn').forEach(b => b.onclick = () => {
      item.querySelectorAll('.obtn').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); }));
    const chk = el.querySelector('.chk');
    if (!chk) return;
    chk.onclick = () => {
      let ok = 0;
      el.querySelectorAll('.item').forEach(item => {
        const it = items[+item.dataset.i];
        item.classList.add('checked');
        item.querySelectorAll('.obtn').forEach(b => {
          b.classList.remove('ok', 'bad');
          if (+b.dataset.k === it.answer) { if (b.classList.contains('sel')) ok++; b.classList.add('ok'); }
          else if (b.classList.contains('sel')) b.classList.add('bad');
        });
      });
      const sc = el.querySelector('.score'); sc.textContent = `${ok} / ${items.length}`;
      sc.className = 'score ' + (ok === items.length ? 'good' : 'partial');
      if (alTerminar) alTerminar(ok, items.length);
    };
  }
  function practicaMC(bl) {
    return `<div class="t-pr"><p class="instr">${inl(bl.instructions || '')}</p>
      ${bl.items.map((it, i) => `<div class="item" data-i="${i}"><div class="stem">${i + 1}. ${inl(it.sentence).replace('___', '<b class="blank"></b>')}</div>
        <div class="opts">${it.options.map((o, k) => `<button class="obtn" type="button" data-k="${k}">${inl(o)}</button>`).join('')}</div>${it.why ? `<p class="why">${inl(it.why)}</p>` : ''}</div>`).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>`;
  }
  function practicaGap(bl) {
    return `<div class="t-pr"><p class="instr">${inl(bl.instructions || '')}</p>
      ${bl.items.map((it, i) => `<div class="item" data-i="${i}"><div class="stem">${i + 1}. ${inl(it.sentence).replace('___', `<input class="gap" autocomplete="off" spellcheck="false" aria-label="gap ${i + 1}">`)}<span class="fix"></span></div></div>`).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>`;
  }
  function montaGap(el, items, alTerminar) {
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      el.querySelectorAll('.item').forEach(item => {
        const it = items[+item.dataset.i], inp = item.querySelector('input.gap'), fix = item.querySelector('.fix');
        const bien = (it.answers || []).some(a => norm(a) === norm(inp.value));
        inp.className = 'gap ' + (bien ? 'ok' : 'bad');
        fix.textContent = bien ? '' : `→ ${it.answers[0]}`;
        if (bien) ok++;
      });
      const sc = el.querySelector('.score'); sc.textContent = `${ok} / ${items.length}`;
      sc.className = 'score ' + (ok === items.length ? 'good' : 'partial');
      if (alTerminar) alTerminar(ok, items.length);
    };
  }
  function practicaTransform(bl) {
    return `<div class="t-pr"><p class="instr">${inl(bl.instructions || '')}</p>
      ${bl.items.map((it, i) => {
        const input = `<input class="gap" autocomplete="off" spellcheck="false" style="min-width:12rem" aria-label="answer ${i + 1}">`;
        // Word formation (Use of English Part 3): la frase trae el hueco y la
        // clave es la raiz; no hay segunda frase que reescribir.
        if (String(it.first || '').includes('___')) return `<div class="item kwt-item" data-i="${i}">
          <p class="kwt-key"><span class="kwt-tag">${T('ROOT WORD', 'RACINE')}</span> <b>${inl(it.key)}</b></p>
          <p class="kwt-second">${i + 1}. ${inl(it.first).replace('___', input)}<span class="fix"></span></p></div>`;
        return `<div class="item kwt-item" data-i="${i}">
        <p class="kwt-first">${i + 1}. ${inl(it.first)}</p>
        <p class="kwt-key"><span class="kwt-tag">${T('KEY WORD', 'MOT')}</span> <b>${inl(it.key)}</b></p>
        <p class="kwt-second">${inl(it.second_start || '')} ${input} ${inl(it.second_end || '')}<span class="fix"></span></p></div>`; }).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>`;
  }

  /* ordenar: las piezas se pulsan una a una y forman la frase */
  const junta = ws => ws.join(' ').replace(/\s+([.,?!;:])/g, '$1').replace(/\s+/g, ' ').trim();
  const igual = (a, b) => junta(String(a).split(' ')).replace(/[’]/g, "'") === junta(String(b).split(' ')).replace(/[’]/g, "'");
  function practicaOrder(bl) {
    return `<div class="t-pr t-order"><p class="instr">${inl(bl.instructions || '')}</p>
      ${bl.items.map((it, i) => `<div class="item" data-i="${i}"><div class="stem">${i + 1}.</div>
        <div class="line"></div>
        <div class="tiles">${it.words.map((w, k) => `<button class="tile" type="button" data-k="${k}">${esc(w)}</button>`).join('')}</div>
        <div class="tools"><button class="undo" type="button">↶ ${T('Undo', 'Annuler')}</button><span class="fix"></span></div></div>`).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>`;
  }
  function montaOrder(el, bl, alTerminar) {
    const items = bl.items;
    el.querySelectorAll('.item').forEach(item => {
      const it = items[+item.dataset.i], line = item.querySelector('.line'), tiles = item.querySelectorAll('.tile');
      const pila = [];
      const pinta = () => {
        line.innerHTML = pila.length ? pila.map(k => `<span class="w">${esc(it.words[k])}</span>`).join('') : `<span class="ph">${T('Tap the words below, one by one…', 'Touche les mots, un par un…')}</span>`;
        tiles.forEach(t => { t.disabled = pila.includes(+t.dataset.k); });
      };
      tiles.forEach(t => { t.onclick = () => { pila.push(+t.dataset.k); item.classList.remove('ok', 'bad'); pinta(); }; });
      item.querySelector('.undo').onclick = () => { pila.pop(); item.classList.remove('ok', 'bad'); pinta(); };
      item._pila = pila; pinta();
    });
    el.querySelector('.chk').onclick = () => {
      let ok = 0;
      el.querySelectorAll('.item').forEach(item => {
        const it = items[+item.dataset.i], fix = item.querySelector('.fix');
        const bien = item._pila.length === it.words.length && igual(junta(item._pila.map(k => it.words[k])), it.answer);
        item.classList.remove('ok', 'bad'); item.classList.add(bien ? 'ok' : 'bad');
        fix.textContent = bien ? '' : `→ ${it.answer}`;
        if (bien) ok++;
      });
      const sc = el.querySelector('.score'); sc.textContent = `${ok} / ${items.length}`;
      sc.className = 'score ' + (ok === items.length ? 'good' : 'partial');
      if (alTerminar) alTerminar(ok, items.length);
    };
  }
  /* ¿bien o mal?: dos botones; la frase incorrecta enseña su arreglo al corregir */
  function practicaSpot(bl) {
    return `<div class="t-pr t-spot"><p class="instr">${inl(bl.instructions || '')}</p>
      ${bl.items.map((it, i) => `<div class="item" data-i="${i}"><div class="stem">${i + 1}. ${inl(it.sentence)}</div>
        <div class="opts"><button class="obtn yes" type="button" data-k="1">✓ ${T('Right', 'Juste')}</button><button class="obtn no" type="button" data-k="0">✗ ${T('Wrong', 'Faux')}</button></div>
        <p class="fixline"></p>${it.why ? `<p class="why">${inl(it.why)}</p>` : ''}</div>`).join('')}
      <div class="checkrow"><button class="chk t-btn sm" type="button">${T('Check', 'Vérifier')}</button><span class="score"></span></div></div>`;
  }
  function montaSpot(el, bl, alTerminar) {
    const items = bl.items;
    montaMC(el, items.map(it => ({ answer: it.ok ? 1 : 0 })), (ok, t) => {
      el.querySelectorAll('.item').forEach(item => {
        const it = items[+item.dataset.i], f = item.querySelector('.fixline');
        f.innerHTML = it.ok ? `<span class="okmsg">✓ ${T('This sentence is correct.', 'Cette phrase est correcte.')}</span>` : `<span class="fixmsg">→ ${inl(it.fix || '')}</span>`;
      });
      if (alTerminar) alTerminar(ok, t);
    });
  }
  /* los bloques de practica que sabe montar el Lab, en el orden en que los trae el tema */
  const PRACTICA = {
    mc: { nombre: ['Choose', 'Choisir'], sub: () => T('Choose the correct option', 'Choisis la bonne réponse'), ik: 'target', html: practicaMC, monta: (el, bl, cb) => montaMC(el, bl.items, cb) },
    gap: { nombre: ['Complete', 'Compléter'], sub: () => T('Complete the sentences', 'Complète les phrases'), ik: 'pencil', html: practicaGap, monta: (el, bl, cb) => montaGap(el, bl.items, cb) },
    order: { nombre: ['Build', 'Construire'], sub: () => T('Put the words in order', 'Mets les mots dans l’ordre'), ik: 'gear', html: practicaOrder, monta: montaOrder },
    spot: { nombre: ['Spot it', 'Repérer'], sub: () => T('Right or wrong?', 'Juste ou faux ?'), ik: 'search', html: practicaSpot, monta: montaSpot },
    transform: { nombre: ['Transform', 'Transformer'], sub: bl => String((bl.items[0] || {}).first || '').includes('___') ? T('Word formation', 'Formation des mots') : T('Key word transformations', 'Transformations'), ik: 'rocket', html: practicaTransform, monta: (el, bl, cb) => montaGap(el, bl.items, cb) },
  };

  /* ======================================================================
     EL GRAMMAR LAB: un tema
     ====================================================================== */
  async function grammar() {
    document.body.classList.add('teen');
    const n = NIV[LEVEL];
    await creditos();
    const lab = await labIndex();
    const id = qs.get('grammar');
    const todos = lab ? lab.areas.flatMap(a => a.topics.map(t => Object.assign({ area: a.area }, t))) : [];
    if (!lab || id === 'hub') {
      document.title = `Grammar Lab · ${n.name}`;
      app.classList.add('hub');
      SCREENS.montar(app, [{ titulo: 'Grammar Lab',
        html: `<div class="scr-centro">
          <div class="t-hero" style="min-height:13rem"><img class="bg" src="${FOTO('area-sentence')}" alt="" onerror="this.remove()">
            <div class="icon3d">${ico('lab', 104)}</div>
            <div class="in"><span class="t-kicker">${esc(n.name)} · ${T('reference', 'référence')}</span><h1>Grammar Lab</h1>
              <p class="lead">${lab ? T(`The ${todos.length} structures ${/^[AEIOU]/.test(n.cefr) ? "an" : "a"} ${n.cefr} candidate is expected to control — each one in diagrams, with real examples, the mistakes to avoid, a conversation and ${LEVEL === 'a1' || LEVEL === 'ket' || LEVEL === 'pet' ? 'four' : 'three'} rounds of practice.`, `Les ${todos.length} structures du niveau ${n.cefr}.`) : T('Coming soon for this level.', 'Bientôt.')}</p></div>${credito('area-sentence')}</div>
          ${lab ? puente() + labIndexHTML(lab) : ''}</div>` }],
        { arriba: { href: Q(`?level=${LEVEL}`), texto: n.name }, portal: PORTAL });
      return;
    }
    const pos = todos.findIndex(t => t.id === id);
    if (pos < 0) { app.innerHTML = `<p class="scr-pie" style="padding:2rem">${T('Topic not found.', 'Sujet introuvable.')} <a href="${Q(`?level=${LEVEL}&grammar=hub`)}">Grammar Lab</a></p>`; return; }
    const d = await j(`${CDIR}/${LEVEL}/grammar/${id}.json`);
    const meta = todos[pos], sig = todos[pos + 1], ant = todos[pos - 1];
    document.title = `${d.title} · Grammar Lab`;
    const prog = labProg(id);
    const guarda = (bloque, ok, total) => {
      prog[bloque] = ok === total; prog[bloque + '_score'] = `${ok}/${total}`;
      prog.hecho = bloques.every(b => prog[b.type] === true);
      try { localStorage.setItem(labKey(id), JSON.stringify(prog)); } catch (e) {}
      if (window.BACKEND) BACKEND.guardar('grammar_lab', { nivel: LEVEL, unidad: 0, codigo: 'GL:' + id },
        { tema: d.title, area: meta.area, bloque, ok, total, hecho: labHecho(id) }).catch(() => {});
    };
    const fotoArea = AREA_FOTO[meta.area] || 'area-words';
    const cab = (kicker, titulo, ik) => `<div class="t-task"><div class="ico">${ico(ik, 56)}</div><div><span class="t-kicker">${esc(kicker)}</span><h2>${inl(titulo)}</h2></div></div>`;
    const dg = d.diagrams || [];

    // el dialogo: avatares 3D del elenco (Nordic Ascent). Cada personaje MIRA
    // hacia su bocadillo: en una linea .r el avatar va a la derecha y mira a la
    // izquierda; en las demas mira a la derecha. Quien aun no tiene arte 3D
    // (p.ej. Sofia hasta bajar su lamina) cae al retrato SVG o a la inicial.
    const AV = { mateo: 'mateo', sofia: 'sofia', liam: 'liam', nadia: 'nadia', vega: 'vega', nova: 'nova' };
    const CAST3D = new Set(['mateo', 'sofia', 'liam', 'nadia', 'vega', 'nova']);
    const TRATO = new Set(['miss', 'mr', 'mrs', 'ms', 'cousin', 'uncle', 'aunt', 'grandma', 'grandpa']);
    const slugDe = who => {
      const p = String(who || '').toLowerCase().split(/\s+/).filter(Boolean);
      return AV[(p[0] && TRATO.has(p[0]) ? p[1] : p[0]) || ''] || null;
    };
    const avatar = (who, derecha) => {
      const s = slugDe(who), ini = esc(String(who || '?')[0]);
      if (s && CAST3D.has(s))
        return `<span class="av"><img src="../assets/characters/cast/${s}/${derecha ? 'left' : 'right'}-bust.jpg?v=${CAST_V}" alt="" onerror="this.replaceWith(document.createTextNode('${ini}'))"></span>`;
      return s ? `<span class="av"><img src="../assets/characters/${LEVEL}/${s}/pose-01.svg?v=${ART_V}" alt="" onerror="this.replaceWith(document.createTextNode('${ini}'))"></span>`
               : `<span class="av">${ini}</span>`;
    };
    const hablantes = [...new Set((d.dialogue.lines || []).map(l => l.speaker))];
    /* El reproductor es el de la casa (coh-player.js: play, pausa, stop,
       barra arrastrable y velocidad) — Paolo, 19-sep-2026: «unificar el
       reproductor… y poder repetir desde donde el usuario quiera». Se monta
       en alMostrar; el 🔊 de cada linea va delante del texto, como en el
       gancho. */
    const dlg = `<div class="t-dlg"><div class="ctx">${ico('talk', 34)}<span><b>${inl(d.dialogue.title)}</b> — ${inl(d.dialogue.context)}</span></div>
      <div class="dlg-player" data-src="${ADIR}/grammar/${LEVEL}/${id}.mp3?v=${TEEN_V}"></div>
      ${(d.dialogue.lines || []).map((l, i) => `<div class="ln ${hablantes.indexOf(l.speaker) % 2 ? 'r' : ''}" data-i="${i}">${avatar(l.speaker, hablantes.indexOf(l.speaker) % 2)}
        <div class="bb"><span class="who">${esc(l.speaker)}</span><button class="say" type="button" data-i="${i}" aria-label="${T('Listen', 'Écoute')}">🔊</button> ${inl(l.text)}</div></div>`).join('')}</div>`;

    const bloques = (d.practice || []).filter(b => PRACTICA[b.type] && b.items && b.items.length);
    const puntuacion = () => `<div class="t-scores">${bloques.map(b => `<span class="t-chip ${prog[b.type] ? 'acc' : ''}">${prog[b.type] ? '✓' : '·'} ${T(...PRACTICA[b.type].nombre)} ${prog[b.type + '_score'] ? prog[b.type + '_score'] : ''}</span>`).join('')}</div>`;
    const decir = el => el.querySelectorAll('.ex-say').forEach(b => { b.onclick = () => SAY.frase(b.dataset.t, b, 'grammar'); });

    // los niveles inferiores traen ademas: la escena inicial (hook), el truco
    // de memoria (remember), las trampas del español (l1) y el semaforo (can_do)
    // La escena la cuenta Miss Vega, la profesora del elenco: quien explica la
    // gramatica es un personaje ya creado, no una mascota inventada (la
    // estrella «Nova» duro un dia, 17-sep-2026). Va a la izquierda del
    // bocadillo, asi que lleva la vista que mira a la derecha.
    /* La escena puede ser una CONVERSACION («Liam: "…"», «"…," says Nadia.»,
       «Mateo shakes his head. "…"»). Paolo (19-sep-2026): «son dos personas
       hablando; cada parte en su bocadillo, con su foto al lado, y el altavoz
       al principio». Las atribuciones («says Nadia», «he asks», «Sofia
       whispers:») deciden quien habla y NO se muestran ni se leen; la
       narracion de escena («It's Monday morning.») va en cursiva y la lee
       Miss Vega. Son las mismas reglas que tools/grammar-lab/gen_audio_frases.py
       (guion + bocadillos), que graba un mp3 por bocadillo con la voz de su
       personaje: si cambias una regla aqui, cambiala alli. */
    const H_CAST = ['Miss Vega', 'Sofia', 'Nadia', 'Mateo', 'Liam'];
    const H_GEN = { 'Miss Vega': 'f', Sofia: 'f', Nadia: 'f', Mateo: 'm', Liam: 'm' };
    const H_NOM = '(?:Miss Vega|Sofia|Nadia|Mateo|Liam)';
    const H_HABLA = '(?:says|asks|adds|replies|answers|whispers|shouts|laughs|smiles|texts|writes|thinks|explains|continues|sighs|groans|mutters|jokes|insists|agrees|admits|announces|suggests|wonders|begins|repeats|interrupts|calls|tells the class)';
    const H_POST = new RegExp('^,?\\s*(?:(' + H_HABLA + ')\\s+(' + H_NOM + '|he|she|(?:the|his|her|my|their|a) [a-z]+)|(he|she)\\s+(' + H_HABLA + '))\\s*([.,:!;]?)\\s*');
    const H_PRE = new RegExp('(^|[.!?:,] )(' + H_NOM + ')(?:\\s+' + H_HABLA + '(?:\\s+(?:' + H_NOM + '|his head|her head))?)?\\s*[.:,]?\\s*$');
    const H_VOC = new RegExp('(?:^|, )(' + H_NOM + ')(?=[?!.,;:]|$)');
    const H_OVER = { 'ket/word-building-a2': { 2: 'Mateo', 3: 'Miss Vega' }, 'ket/countable-uncountable': { 2: 'Miss Vega' } };
    const nombresDe = t => t.match(new RegExp(H_NOM, 'g')) || [];
    const esConversacion = t => /["“]/.test(t) && new RegExp(H_NOM).test(t);
    const guionHook = (html, clave) => {
      const t = String(html).replace(/[“”]/g, '"').replace(/’/g, "'");
      const trozos = t.split(/("[^"]*")/).map(x => x.trim()).filter(Boolean);
      const citas = [], salida = [], narr = [];
      let meta = null;
      trozos.forEach(tr => {
        if (tr.length > 1 && tr.startsWith('"') && tr.endsWith('"')) {
          const c = { txt: tr.slice(1, -1).trim(), pre: null, post: null, coma: false, cand: null, narrAntes: !!(salida.length && salida[salida.length - 1].n != null), narrTexto: narr.join(' ') };
          if (meta) { c.pre = meta.pre; c.cand = meta.cand; if (meta.vacio && !meta.pre) c.narrAntes = false; }
          meta = null; citas.push(c); salida.push({ q: citas.length - 1 }); return;
        }
        narr.push(tr); let resto = tr;
        const m2 = H_POST.exec(resto);
        if (m2 && citas.length) { const u = citas[citas.length - 1]; u.post = m2[2] || m2[3]; u.coma = m2[5] === ','; resto = resto.slice(m2[0].length).trim(); }
        const m = H_PRE.exec(resto);
        const pre = m ? m[2] : null;
        if (m) resto = resto.slice(0, m.index + m[1].length).trim();
        if (resto) salida.push({ n: resto });
        let cand = null;
        if (resto) { const frases = resto.split(/(?<=[.!?:])\s+/); for (let i = frases.length - 1; i >= 0; i--) { const ns = nombresDe(frases[i]); if (ns.length) { cand = ns[0]; break; } } }
        meta = { pre, cand, vacio: !resto };
      });
      const quien = [];
      const generoDe = (pron, nt) => { const g = pron === 'he' ? 'm' : 'f'; const ns = nombresDe(nt); for (let i = ns.length - 1; i >= 0; i--) if (H_GEN[ns[i]] === g) return ns[i]; for (let i = quien.length - 1; i >= 0; i--) if (H_GEN[quien[i]] === g) return quien[i]; return g === 'm' ? 'Liam' : 'Sofia'; };
      const otro = (S, prevTxt, i) => {
        const v = H_VOC.exec(prevTxt); if (v && v[1] !== S) return v[1];
        for (let k = i - 1; k >= 0; k--) if (quien[k] !== S && H_GEN[quien[k]]) return quien[k];
        const ns = nombresDe(citas[i].narrTexto); for (let k = ns.length - 1; k >= 0; k--) if (ns[k] !== S) return ns[k];
        for (let k = 0; k <= i; k++) for (const n of nombresDe(citas[k].txt)) if (n !== S) return n;
        return S !== 'Sofia' ? 'Sofia' : 'Liam';
      };
      const ov = H_OVER[clave] || {};
      citas.forEach((c, i) => {
        const p = i ? citas[i - 1] : null, S = i ? quien[i - 1] : null;
        let w, f;
        if (ov[i]) { w = ov[i]; f = 'ov'; }
        else if (c.post) { const x = c.post; f = 'post'; w = (x === 'he' || x === 'she') ? generoDe(x, c.narrTexto) : (H_GEN[x] ? x : x[0].toUpperCase() + x.slice(1)); }
        else if (c.pre) { w = c.pre; f = 'pre'; }
        else if (p && p.coma) { w = S; f = 'coma'; }
        else if (c.cand) { w = c.cand; f = 'cand'; }
        else if (!p) { w = 'Sofia'; f = 'def'; }
        else if (c.narrAntes) { w = S; f = 'sigue'; }
        else if (/\?$/.test(p.txt.replace(/<[^>]+>/g, '').trim())) { w = otro(S, p.txt, i); f = 'resp'; }
        else if (['post', 'pre', 'cand', 'ov', 'coma'].includes(p.f)) { w = S; f = 'cont'; }
        else { w = otro(S, p.txt, i); f = 'alt'; }
        c.f = f; quien.push(w);
      });
      return salida.map(it => it.n != null ? { who: null, txt: it.n, coma: false } : { who: quien[it.q], txt: citas[it.q].txt, coma: citas[it.q].coma });
    };
    // trozos seguidos del mismo hablante = un bocadillo; la coma que deja una
    // atribucion en punto («"I'm tired," he says.») pasa a punto
    const bocadillosHook = lineas => {
      const out = [];
      lineas.forEach(l => {
        const u = out[out.length - 1];
        if (u && u.who === l.who) { if (!u.coma && u.txt.endsWith(',')) u.txt = u.txt.slice(0, -1) + '.'; u.txt += ' ' + l.txt; u.coma = l.coma; }
        else out.push({ who: l.who, txt: l.txt, coma: l.coma });
      });
      return out.map(b => ({ who: b.who, txt: b.txt.endsWith(',') ? b.txt.slice(0, -1) + '.' : b.txt }));
    };
    const botonDecir = t => `<button class="ex-say" type="button" data-t="${esc(String(t).replace(/<[^>]+>/g, ''))}" aria-label="${T('Listen', 'Écoute')}">🔊</button>`;
    const hookConv = () => {
      const bocs = bocadillosHook(guionHook(d.hook.text, LEVEL + '/' + id));
      const quienes = [...new Set(bocs.filter(b => b.who).map(b => b.who))];
      const av = (who, der) => slugDe(who) ? avatar(who, der) : `<span class="av">${esc((who.split(' ').pop() || '?')[0].toUpperCase())}</span>`;
      return bocs.map(b => b.who
        ? `<div class="ln ${quienes.indexOf(b.who) % 2 ? 'r' : ''}">${av(b.who, quienes.indexOf(b.who) % 2)}<div class="bb"><span class="who">${esc(b.who)}</span>${botonDecir(b.txt)} ${inl(b.txt)}</div></div>`
        : `<p class="narr">${botonDecir(b.txt)} ${inl(b.txt)}</p>`).join('');
    };
    const hook = !d.hook ? '' : esConversacion(String(d.hook.text))
      ? `<div class="t-hook conv"><span class="t-kicker">${T('Look first', 'Observe d’abord')}</span>
          <div class="t-dlg">${hookConv()}</div>
          <p class="ask">${ico('search', 22)} <span>${inl(d.hook.ask)}</span></p></div>`
      : `<div class="t-hook"><div class="guia"><img src="../assets/characters/cast/vega/right-bust.jpg?v=${CAST_V}" alt="Miss Vega" onerror="this.replaceWith(document.createTextNode('V'))"></div>
        <div class="bb"><span class="t-kicker">Miss Vega · ${T('Look first', 'Observe d’abord')}</span><p class="story">${botonDecir(d.hook.text)} ${inl(d.hook.text)}</p>
          <p class="ask">${ico('search', 22)} <span>${inl(d.hook.ask)}</span></p></div></div>`;
    const recuerda = d.remember ? `<div class="t-remember"><span class="pin">📌</span><span class="t-kicker">${T('Remember', 'Retiens')}</span>
        <p class="trick">${botonDecir(d.remember.trick)} ${inl(d.remember.trick)}</p><p class="tip">${inl(d.remember.tip)}</p></div>` : '';
    const trampas = (d.l1 || []).length ? `${cab(T('Don’t translate!', 'Ne traduis pas !'), T('Traps for Spanish speakers', 'Pièges pour hispanophones'), 'brain')}
      <div class="t-l1">${d.l1.map(x => `<div class="it"><div class="es"><span class="tag">ES</span>${inl(x.es)}</div><div class="w"><span>${inl(x.wrong)}</span></div><div class="r"><span>${inl(x.right)}</span></div><p class="why">${inl(x.why)}</p></div>`).join('')}</div>` : '';
    const semaforo = (d.can_do || []).length ? `<div class="t-cando"><h4>${ico('selfcheck', 30)} ${T('Can you do it now?', 'Tu sais le faire ?')}</h4>
        ${d.can_do.map((c, i) => `<div class="cd" data-i="${i}"><span>${inl(c)}</span><div class="lights">${[['g', T('Yes!', 'Oui !')], ['y', T('Almost', 'Presque')], ['r', T('Not yet', 'Pas encore')]].map(([l, tx]) => `<button type="button" class="lt ${l}" data-l="${l}" title="${esc(tx)}" aria-label="${esc(tx)}"></button>`).join('')}</div></div>`).join('')}
        <p class="hint">${T('Green = I can do it · Amber = almost · Red = I need to look again.', 'Vert = je sais · Orange = presque · Rouge = à revoir.')}</p></div>` : '';

    const pantallas = [
      { titulo: d.title, etiquetaSiguiente: T('How it works', 'Comment ça marche'),
        html: `<div class="scr-centro">
          <div class="t-hero" style="min-height:15rem"><img class="bg" src="${FOTO(fotoArea)}" alt="" onerror="this.remove()">
            <div class="icon3d">${ico('grammar', 96)}</div>
            <div class="in"><span class="t-kicker">Grammar Lab · ${esc(meta.area)} · ${esc(d.cefr)}</span><h1>${inl(d.title)}</h1><p class="lead">${inl(d.tagline)}</p>
              <div class="row">${(d.exam || []).map(x => `<span class="t-chip">${ico('exam', 16)} ${inl(x)}</span>`).join('')}</div></div>${credito(fotoArea)}</div>
          ${hook}
          ${dg[0] ? diagrama(dg[0]) : ''}
          <div class="t-why"><div class="box"><h4>${T('Why it matters', 'Pourquoi')}</h4><p>${inl(d.why)}</p></div></div></div>`,
        alMostrar: decir },
      { titulo: T('How it works', 'Comment ça marche'), etiquetaSiguiente: T('In use', 'En contexte'),
        html: `<div class="scr-centro">${cab(T('Form', 'Forme'), d.title, 'gear')}
          <div class="t-diag"><h4><span class="t-kicker">${T('Pattern', 'Structure')}</span></h4>${chips(d.form.formula)}
            ${d.form.table ? `<table class="t-contrast" style="margin-top:.8rem"><thead><tr>${d.form.table.head.map((h, i) => `<th${i ? '' : ' style="background:var(--t-navy);color:#fff;border-radius:10px 0 0 0"'}>${inl(h)}</th>`).join('')}</tr></thead>
              <tbody>${d.form.table.rows.map(r => `<tr>${r.map((c, i) => `<td${i ? '' : ' style="text-transform:none;letter-spacing:0;font-size:.9rem;width:auto"'}>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : ''}</div>
          ${dg.slice(1).map(diagrama).join('')}
          ${recuerda}</div>`,
        alMostrar: decir },
      { titulo: T('In use', 'En contexte'), etiquetaSiguiente: T('Watch out', 'Attention'),
        html: `<div class="scr-centro">${cab(T('Use', 'Emploi'), T('When and how it is used', 'Quand et comment'), 'compass')}
          <div class="t-uses">${(d.use || []).map((u, i) => `<div class="t-use"><h4><span class="n">${i + 1}</span>${inl(u.point)}</h4>
            <ul>${(u.examples || []).map(e => `<li><button type="button" class="ex-say" data-t="${esc(String(e.text || '').replace(/<[^>]+>/g, ''))}" aria-label="${T('Listen', 'Écoute')}">🔊</button><span>${inl(e.text)}${e.note ? `<span class="note">${inl(e.note)}</span>` : ''}</span></li>`).join('')}</ul></div>`).join('')}</div></div>`,
        alMostrar: decir },
      { titulo: T('Watch out', 'Attention'), etiquetaSiguiente: T('In conversation', 'En conversation'),
        html: `<div class="scr-centro">${cab(T('Common mistakes', 'Erreurs fréquentes'), T('What the examiner sees too often', 'Ce que l’examinateur voit trop souvent'), 'tip')}
          <div class="t-wo">${(d.watch_out || []).map(w => `<div class="it"><div class="w"><span>${inl(w.wrong)}</span></div><div class="r"><span>${inl(w.right)}</span></div><p class="why">${inl(w.why)}</p></div>`).join('')}</div>
          ${trampas}</div>` },
      { titulo: T('In conversation', 'En conversation'), etiquetaSiguiente: `${T('Practice', 'Exercice')} 1`,
        html: `<div class="scr-centro">${cab(T('Listen', 'Écoute'), d.dialogue.title, 'mic')}${dlg}</div>`,
        alMostrar(el) {
          const host = el.querySelector('.dlg-player');
          const lineas = d.dialogue.lines || [];
          const quita = () => el.querySelectorAll('.ln').forEach(x => x.classList.remove('playing'));
          // el mp3 del dialogo (edge-tts, varias voces); si no esta, la voz
          // del navegador lee linea a linea con la misma pausa que tendria
          const leerTodo = () => {
            if (!window.speechSynthesis) return;
            speechSynthesis.cancel(); let i = 0;
            const paso = () => {
              if (i >= lineas.length) { quita(); return; }
              el.querySelectorAll('.ln').forEach(x => x.classList.toggle('playing', +x.dataset.i === i));
              const u = new SpeechSynthesisUtterance(String(lineas[i].text).replace(/<[^>]+>/g, ''));
              u.lang = 'en-GB'; u.rate = 0.95;
              // voces distintas por hablante, si el navegador tiene varias
              const voces = speechSynthesis.getVoices().filter(v => /^en/.test(v.lang));
              if (voces.length > 1) u.voice = voces[hablantes.indexOf(lineas[i].speaker) % voces.length];
              u.onend = () => { i++; setTimeout(paso, 350); };
              speechSynthesis.speak(u);
            };
            paso();
          };
          if (host && window.CohPlayer) {
            const api = CohPlayer.attach(host, { src: host.dataset.src, label: T('Play the conversation', 'Écouter'), accent: 'var(--accent)',
              onPlay: () => { if (window.speechSynthesis && speechSynthesis.speaking) { speechSynthesis.cancel(); quita(); } } });
            api.audio.onerror = () => { api.stop(); leerTodo(); };   // sin mp3: la voz del navegador
          } else if (host) {
            // sin coh-player.js (no cargo): un boton simple
            const au = new Audio(host.dataset.src); au.preload = 'none';
            host.innerHTML = `<button class="t-btn sm" type="button">▶ ${T('Play the conversation', 'Écouter')}</button>`;
            const btn = host.firstElementChild;
            btn.onclick = () => { if (!au.paused) { au.pause(); btn.textContent = `▶ ${T('Play the conversation', 'Écouter')}`; return; } btn.textContent = `⏸ ${T('Pause', 'Pause')}`; au.play().catch(() => leerTodo()); };
            au.onended = () => { btn.textContent = `▶ ${T('Play the conversation', 'Écouter')}`; };
            au.onerror = () => leerTodo();
          }
          el.querySelectorAll('.bb .say').forEach(b => b.onclick = () => {
            const l = lineas[+b.dataset.i]; SAY.frase(String(l.text).replace(/<[^>]+>/g, ''), b, 'grammar'); });
        } },
      // una pantalla por bloque de practica, en el orden del tema
      ...bloques.map((bl, i) => { const P = PRACTICA[bl.type]; return {
        titulo: `${T('Practice', 'Exercice')} ${i + 1} — ${T(...P.nombre).toLowerCase()}`,
        etiquetaSiguiente: i + 1 < bloques.length ? `${T('Practice', 'Exercice')} ${i + 2}` : T('Summary', 'Résumé'),
        html: `<div class="scr-centro">${cab(`${T('Practice', 'Exercice')} ${i + 1}`, P.sub(bl), P.ik)}${P.html(bl)}</div>`,
        alMostrar(el) { P.monta(el, bl, (ok, t) => guarda(bl.type, ok, t)); } }; }),
      { titulo: T('Summary', 'Résumé'),
        html: `<div class="scr-centro">${cab(T('Take away', 'À retenir'), d.title, 'trophy')}
          <div class="t-sum"><ul>${(d.summary || []).map(x => `<li><span>${inl(x)}</span></li>`).join('')}</ul></div>
          ${semaforo}
          <div id="gl-scores"></div>
          <div class="t-next">${ant ? `<a class="t-btn ghost" href="${Q(`?level=${LEVEL}&grammar=${ant.id}`)}">‹ ${esc(ant.title)}</a>` : ''}
            <a class="t-btn ghost" href="${Q(`?level=${LEVEL}&grammar=hub`)}">Grammar Lab</a>
            ${sig ? `<a class="t-btn" href="${Q(`?level=${LEVEL}&grammar=${sig.id}`)}">${esc(sig.title)} ›</a>` : ''}</div></div>`,
        alMostrar(el) {
          const sc = el.querySelector('#gl-scores'); if (sc) sc.innerHTML = puntuacion();
          // el semaforo "I can…": se guarda con el progreso del tema
          const luces = prog.cando || {};
          el.querySelectorAll('.t-cando .cd').forEach(cd => {
            const i = cd.dataset.i;
            const pinta = () => cd.querySelectorAll('.lt').forEach(b => b.classList.toggle('on', b.dataset.l === luces[i]));
            cd.querySelectorAll('.lt').forEach(b => { b.onclick = () => { luces[i] = b.dataset.l; prog.cando = luces; try { localStorage.setItem(labKey(id), JSON.stringify(prog)); } catch (e) {} pinta(); }; });
            pinta();
          });
        } },
    ];
    SCREENS.montar(app, pantallas, {
      arriba: { href: Q(`?level=${LEVEL}&grammar=hub`), texto: 'Grammar Lab' },
      portal: PORTAL, alCambiar: marcaPasados,
    });
    marcaPasados(SCREENS.actual());
  }

  /* el renderer de la caja de gramatica se sustituye solo en secundaria.
     Lo llama index.html al arrancar, cuando RENDER ya existe; exam-c1.js
     carga despues y envuelve tambien esta version con su caja de tips. */
  function instala() {
    if (typeof RENDER !== 'undefined' && es(LEVEL)) RENDER.grammar_box = grammarBox;
  }

  return { es, hub, unit, grammar, instala, diagrama, NIV };
})();
