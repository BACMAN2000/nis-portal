/* Actividades por unidad — ÚNICA fuente de verdad.
   La renderizan tanto activities.html (hub suelto) como app.js
   (Portal → Classes → grado → Activities → unidad), así las dos vistas
   no pueden volver a desincronizarse: antes las tarjetas por unidad
   existían sólo en activities.html y no se veían desde el portal. */
(function(){
  /* Unit 4 · Wellbeing: 6 semanas, los mismos 3 juegos cada una. */
  const U4_TOPICS = [
    'Emotions & Stress',
    'Habits That Shape Us',
    'Advice & Speculation',
    'Sleep & the Science of Rest',
    'Writing a Magazine Article',
    'The Wellbeing Issue',
  ];
  const DAYS = ['Day 1','Day 2','Day 3'];
  /* Semanas que nacen BLOQUEADAS: el profesor las abre desde 🔐 Accesos
     cuando toca. Ahora mismo ninguna, porque las 6 ya estaban publicadas.
     Para soltar una unidad futura semana a semana, pon aquí sus números
     (p. ej. `new Set([2,3,4,5,6])` deja abierta sólo la Week 1). */
  const U4_LOCKED_WEEKS = new Set([]);
  const u4Week = (topic, n) => ({
    id: 'w' + n,
    title: 'Week ' + n + ' — ' + topic,
    locked: U4_LOCKED_WEEKS.has(n),
    games: [
      { href:'crossword-u4w'+n+'.html', icon:'🧠', title:'Crossword — Week '+n,
        desc: topic+' vocabulary. Read the clue and type the word. Three days, lives, timer and results.', tags:DAYS },
      { href:'wordsearch-u4w'+n+'.html', icon:'🔍', title:'Word Search — Week '+n,
        desc:'Find the week’s words in the grid. Difficulty grows by day: across & down, then diagonals, then all eight directions.', tags:DAYS },
      { href:'word-sudoku-u4w'+n+'.html', icon:'🔢', title:'Word Sudoku — Week '+n,
        desc:'A calm-mind warm-up: fill each row, column and box with the letters of a wellbeing word. One set per day.', tags:DAYS },
      { href:'word-invaders-u4w'+n+'.html', icon:'👾', title:'Word Invaders — Week '+n,
        desc:'Arcade: the week’s words fall from the sky — type them before they land. Three shields, and the invasion gets faster.', tags:DAYS },
      { href:'voice-battle-u4w'+n+'.html', icon:'🎧', title:'Voice Battle — Week '+n,
        desc:'Dictation duel against the Robo-Noob: listen to the word and spell it. Replay, slow it down, and five hearts.', tags:DAYS },
      { href:'say-it-right-u4w'+n+'.html', icon:'🗣️', title:'Say It Right — Week '+n,
        desc:'Speaking: listen to the word, say it out loud into the mic and get a % accuracy score. Needs Chrome for the microphone.', tags:DAYS },
    ],
  });

  window.ACTIVITIES_DATA = {
    units: [
      /* `locked:true` → la unidad nace BLOQUEADA para los alumnos y el admin
         la abre desde 🔐 Accesos. u3 y u4 ya estaban publicadas y en uso, así
         que nacen abiertas; las unidades nuevas conviene marcarlas locked. */
      {
        id:'u3', grade:'g9', icon:'🌐',
        title:'Unit 3 — Digital Footprint',
        blurb:'Scrolling Identities: crossword and word search with the unit vocabulary.',
        lead:'Scrolling Identities · Grade 9.',
        weeks: [
          { id:'w0', title:'', games:[
            { href:'crossword-digital-footprint.html', icon:'🔎', title:'Crossword — Digital Footprint',
              desc:'Interactive crossword with the Unit 3 vocabulary (Scrolling Identities). Clues, checking and scoring.',
              tags:['A2','B1','B2','C1'] },
            { href:'wordsearch-digital-footprint.html', icon:'🔍', title:'Word Search — Digital Footprint',
              desc:'Word search with 48 words from the topic. Drag over the letters to find them; difficulty increases by level.',
              tags:['A2','B1','B2','C1'] },
          ]},
        ],
      },
      {
        id:'u4', grade:'g9', icon:'🧠',
        title:'Unit 4 — The Wellbeing Generation',
        blurb:'Mind Over Matter: 6 weeks × 3 games (crossword, word search and word sudoku).',
        lead:'Mind Over Matter · Grade 9. Each game has three tabs — Day 1 · Day 2 · Day 3 — matching the week’s sessions.',
        weeks: [
          /* Sin título a propósito: el renderizador trata las semanas sin título
             como SIEMPRE visibles (`!w.title ||` en app.js) y no les exige nodo
             de permisos, igual que u3.w0. El Word Wheel cubre las 6 semanas en
             un solo archivo, así que no cuelga de ninguna en particular. */
          { id:'w0', title:'', games:[
            { href:'word-wheel-u4.html', icon:'🎡', title:'Word Wheel — Unit 4',
              desc:'Spin the letter wheel to build words and fill the crossword, Words of Wonders style. 6 weeks × 6 levels, and each key word opens a vocabulary card.',
              tags:['Weeks 1–6'] },
          ]},
          ...U4_TOPICS.map((t,i)=>u4Week(t,i+1)),
        ],
      },
    ],
  };

  /* Unidades de un grado, en orden. */
  window.ACTIVITIES_DATA.forGrade = function(grade){
    return this.units.filter(u=>u.grade===grade);
  };
  /* Clave del nodo de permisos de una unidad (tabla node_access/student_access).
     Cuelga de la de Activities: english.classes.g9.activities.u4 */
  window.ACTIVITIES_DATA.nodeKey = function(grade,unitId){
    return 'english.classes.'+grade+'.activities.'+unitId;
  };
  /* …y el de una semana cuelga del de su unidad:
     english.classes.g9.activities.u4.w3 */
  window.ACTIVITIES_DATA.weekNodeKey = function(grade,unitId,weekId){
    return this.nodeKey(grade,unitId)+'.'+weekId;
  };
})();
