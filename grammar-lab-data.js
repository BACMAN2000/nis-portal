/* =====================================================================
 *  GRAMMAR LAB — datos por punto de gramática (ÚNICA fuente de verdad)
 * ---------------------------------------------------------------------
 *  Lo renderiza grammar-lab.html (motor) y lo listan las tarjetas de
 *  grammar.html, igual que games-lab-data.js con games-lab.html.
 *
 *  Cada tema = una PRESENTACIÓN (learn: diapositivas para proyectar o
 *  estudiar solo) + sus JUEGOS. El contenido sale literalmente de las
 *  Class Slides / Teacher's Guides / worksheets de la unidad, así que
 *  el alumno ve en el portal exactamente la misma regla, los mismos
 *  ejemplos y las mismas claves que en clase.
 *  Carpeta fuente: OneDrive\09_Instituciones\NORDIC\CLASSES\UNIT 4
 *
 *  Tipos de juego que entiende el motor:
 *    sort  → cubos (2–4): clasificar tarjetas            {buckets, items}
 *    quiz  → opción múltiple con reloj, vidas y combo    {items:[{q,s,o,a,e}]}
 *    match → dos columnas para emparejar                 {pairs:[[l,r]]}
 *    type  → escribir la respuesta (gap-fill / FCE)      {items:[{...answers}]}
 *
 *  Al añadir un tema: dale un `id` estable (se usa en la URL
 *  grammar-lab.html?topic=<id> y en localStorage) y súbelo también a
 *  UNITS en grammar.html. Si cambias este archivo, sube el ?v= con que
 *  grammar-lab.html lo carga.
 * ===================================================================== */
(function () {

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 1 · S2 — Intensity adverbs + extreme adjectives
   * (el "Grammar spot" de W1S2, con el material de la Activity 5 de W1S1)
   * ------------------------------------------------------------------ */
  const INTENSITY = {
    id: 'u4-intensity', unit: 'u4', week: 'Week 1 · Session 2', icon: '🎚️',
    title: 'Intensity Adverbs + Extreme Adjectives',
    lead: 'How strong is the feeling? From slightly uneasy to utterly exhausted.',
    quizSet: null,
    learn: [
      { eyebrow: 'THE IDEA', title: 'Two kinds of adjective',
        lead: 'Some feelings can grow or shrink. Others are already at the top of the scale.',
        table: { head: ['Type', 'What it means', 'Unit 4 adjectives'], rows: [
          ['Gradable', 'can be weaker or stronger', 'uneasy · anxious · worried · nervous · tense · irritable · frustrated · apprehensive · restless · agitated'],
          ['Extreme (limit)', 'already means “very …”', 'exhausted · drained · overwhelmed · devastated · furious · terrified'],
        ]},
        tip: 'Test it: if you can say “a bit ___”, the adjective is gradable.' },

      { eyebrow: 'THE ADVERBS', title: 'Two families of adverb',
        lead: 'Each family of adjective takes its own family of adverb.',
        cols: [
          { h: 'With gradable adjectives', sub: 'they turn the volume up or down',
            items: ['slightly', 'a bit', 'fairly', 'rather', 'really', 'very'],
            ex: ['I’m slightly uneasy about tomorrow’s presentation.', 'Before the final whistle the whole team was rather tense.'] },
          { h: 'With extreme adjectives', sub: 'they confirm the maximum',
            items: ['absolutely', 'completely', 'utterly', 'totally', 'really'],
            ex: ['I was utterly exhausted after the maths mock.', 'He hadn’t slept for two nights, so he was completely drained.'] },
        ],
        tip: '“really” is the friendly one — it works with both families.' },

      { eyebrow: 'THE LADDER', title: 'From weakest to strongest',
        lead: 'The order you ranked in Week 1 — keep it in your head for the exam.',
        table: { head: ['1 weakest', '2', '3', '4', '5', '6 strongest'],
          rows: [['slightly', 'fairly', 'rather', 'really', 'completely', 'utterly']] },
        tip: '“utterly” is the most emphatic, literary choice — that is why it goes last.' },

      { eyebrow: 'WORD ORDER', title: 'The adverb goes BEFORE the adjective',
        pairs: [
          { good: 'I was completely drained.', bad: 'I was drained completely.', note: 'Adverb first, always.' },
          { good: 'She felt utterly discouraged.', bad: 'She felt discouraged utterly.', note: 'Same rule, no exceptions here.' },
        ] },

      { eyebrow: 'WATCH OUT', title: 'The collocation trap',
        callout: { icon: '⚠️', title: '“very exhausted” is the classic slip',
          text: '<b>exhausted</b> already contains “very”. Extreme adjectives need extreme adverbs: <b>absolutely / utterly / completely exhausted</b>.' },
        pairs: [
          { good: 'utterly exhausted', bad: 'utterly tired', note: '“utterly” needs an extreme adjective.' },
          { good: 'slightly uneasy', bad: 'slightly devastated', note: '“devastated” is a limit adjective — it cannot be slight.' },
          { good: 'completely drained', bad: 'completely irritable', note: '“irritable” is gradable: really / rather irritable.' },
        ] },

      { eyebrow: 'CHECK', title: 'The “a bit” test',
        bullets: [
          'Can you say “a bit ___”? → the adjective is <b>gradable</b> (a bit nervous, a bit tense).',
          'Does “a bit ___” sound silly? → it is <b>extreme</b>; use absolutely / utterly / completely.',
        ],
        ccq: { q: 'What is wrong with “slightly devastated”?',
          a: '<b>devastated</b> is a limit adjective — you cannot be a little bit devastated. Say <b>absolutely devastated</b>, or change the adjective: <b>slightly upset</b>.' } },
    ],
    games: [
      { type: 'sort', key: 'grad', label: 'Gradable or Extreme?', sub: 'sort the adjectives',
        intro: 'Read the adjective and drop it in the right family. Extreme adjectives already mean “very …”.',
        buckets: [ { id: 'g', t: 'GRADABLE', s: 'a bit / rather / really', c: 'a' },
                   { id: 'e', t: 'EXTREME', s: 'absolutely / utterly', c: 'b' } ],
        items: [
          { t: 'uneasy', ctx: 'slightly worried or uncomfortable', a: 'g', why: 'You can be <b>a bit</b> uneasy → gradable.' },
          { t: 'exhausted', ctx: 'extremely tired', a: 'e', why: 'It already means “very tired” → <b>utterly exhausted</b>.' },
          { t: 'anxious', ctx: 'worried and nervous about the future', a: 'g', why: '“a bit anxious” works → gradable.' },
          { t: 'drained', ctx: 'no physical or mental energy left', a: 'e', why: 'A limit adjective → <b>completely drained</b>.' },
          { t: 'tense', ctx: 'not able to relax; stiff with worry', a: 'g', why: '“rather tense” is natural → gradable.' },
          { t: 'overwhelmed', ctx: 'far too much to deal with', a: 'e', why: 'The maximum already → <b>absolutely overwhelmed</b>.' },
          { t: 'irritable', ctx: 'becoming annoyed very easily', a: 'g', why: '“really irritable”, never “completely irritable”.' },
          { t: 'devastated', ctx: 'destroyed by bad news', a: 'e', why: 'Limit adjective → <b>absolutely devastated</b>.' },
          { t: 'worried', ctx: 'anxious about a problem', a: 'g', why: '“a bit worried” → gradable.' },
          { t: 'terrified', ctx: 'extremely frightened', a: 'e', why: 'The extreme of “scared” → <b>utterly terrified</b>.' },
          { t: 'restless', ctx: 'unable to keep still', a: 'g', why: '“rather restless” → gradable.' },
          { t: 'furious', ctx: 'extremely angry', a: 'e', why: 'The extreme of “angry” → <b>absolutely furious</b>.' },
        ] },

      { type: 'quiz', key: 'adv', label: 'Which adverb?', sub: 'pick the collocation', time: 18,
        intro: 'The same sentences you circled on your Week 1 worksheet. Read the whole sentence — the clue is in the context.',
        items: [
          { q: 'I was ______ exhausted after the maths mock exam — I fell asleep at 7 p.m.', o: ['slightly', 'utterly'], a: 1, e: '<b>exhausted</b> is extreme → utterly. “slightly exhausted” is a contradiction.' },
          { q: 'I’m ______ uneasy about tomorrow’s presentation, but it’s not a big problem.', o: ['slightly', 'completely'], a: 0, e: '“not a big problem” = a small feeling, and <b>uneasy</b> is gradable → slightly.' },
          { q: 'She was ______ frustrated when the printer broke five minutes before class.', o: ['really', 'slightly'], a: 0, e: 'A strong reaction to a real problem → <b>really</b> frustrated.' },
          { q: 'Before the final whistle, the whole team was ______ tense.', o: ['rather', 'slightly'], a: 0, e: '<b>rather</b> tense — stronger than “slightly”, and tense is gradable.' },
          { q: 'He hadn’t slept for two nights, so he was ______ drained.', o: ['fairly', 'completely'], a: 1, e: 'Two nights without sleep = the maximum → <b>completely drained</b>.' },
          { q: 'I’m ______ confident about English, but maths is another story.', o: ['fairly', 'utterly'], a: 0, e: 'The “but” signals a limit → <b>fairly</b> confident.' },
          { q: 'My little brother gets ______ irritable when he is hungry — don’t go near him!', o: ['really', 'slightly'], a: 0, e: '“don’t go near him” = strong → <b>really</b> irritable (irritable is gradable, so not “completely”).' },
          { q: 'I felt ______ discouraged after failing the test twice; I wanted to give up.', o: ['utterly', 'slightly'], a: 0, e: '“I wanted to give up” = the maximum → <b>utterly</b> discouraged.' },
          { q: 'Which pair is natural?', o: ['utterly tired', 'utterly exhausted'], a: 1, e: '“utterly” needs the extreme partner: <b>exhausted</b>, not tired.' },
          { q: 'Where does the adverb go?', o: ['I was drained completely.', 'I was completely drained.'], a: 1, e: 'Adverb <b>before</b> the adjective.' },
        ] },

      { type: 'match', key: 'pairs', label: 'Upgrade it', sub: 'gradable → extreme',
        intro: 'Match each everyday adjective with its extreme partner. These pairs are free marks in FCE Writing.',
        left: 'Gradable', right: 'Extreme partner',
        pairs: [ ['tired', 'exhausted'], ['angry', 'furious'], ['scared', 'terrified'], ['sad', 'devastated'],
                 ['hungry', 'starving'], ['cold', 'freezing'], ['surprised', 'astonished'], ['dirty', 'filthy'] ] },
    ],
  };

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 2 · S1 — Verb + gerund vs verb + infinitive
   * ------------------------------------------------------------------ */
  const GERUND = {
    id: 'u4-gerund-inf', unit: 'u4', week: 'Week 2 · Session 1', icon: '🧘',
    title: 'Gerunds vs Infinitives',
    lead: 'Which form follows which verb: I enjoy walking, but I want to sleep.',
    quizSet: 'b2-gerund-inf',
    learn: [
      { eyebrow: 'NOTICE', title: 'Finish both sentences about YOU',
        lead: 'I enjoy ______ .   ·   I want ______ .',
        bullets: ['What is different about the second verb?', 'After <b>enjoy</b> we used <b>-ing</b>. After <b>want</b> we used <b>to + verb</b>.'],
        ccq: { q: 'Can I say “I enjoy to walk”?',
          a: 'No. <b>enjoy</b> belongs to the -ing group: <b>I enjoy walking</b>. This is the single most common exam error at B2.' } },

      { eyebrow: 'INPUT', title: 'The two big groups',
        lead: 'There is no magic rule — we learn these verbs in groups.',
        cols: [
          { h: 'verb + -ing', sub: 'the gerund group',
            items: ['enjoy', 'avoid', 'can’t stand', 'keep', 'finish', 'mind', 'suggest', 'practise', 'imagine', 'feel like'],
            ex: ['I enjoy walking to school.', 'She avoids drinking fizzy drinks.', 'He keeps checking his phone.'] },
          { h: 'verb + to + infinitive', sub: 'the to-group',
            items: ['want', 'decide', 'hope', 'plan', 'learn', 'refuse', 'manage', 'promise', 'expect', 'agree'],
            ex: ['I want to sleep more.', 'We decided to join the team.', 'They hope to feel calmer.'] },
        ],
        tip: 'Star the two verbs in each column you find hardest — those are your personal revision targets.' },

      { eyebrow: 'INPUT', title: 'Both forms — little or no change',
        lead: 'These are free marks: either form is correct.',
        table: { head: ['Verbs', 'Examples'], rows: [
          ['like · love · hate · prefer · start · begin · continue', 'I love running = I love to run<br>It started raining = It started to rain'],
        ]},
        tip: 'Careful: stop, remember, try and forget also take both forms — but there the MEANING changes. That is the next lab.' },

      { eyebrow: 'WATCH OUT', title: 'Four things the examiner is looking for',
        callout: { icon: '⚠️', title: 'The #1 error at this level',
          text: '<s>I enjoy to play</s> → <b>I enjoy playing</b>.' },
        bullets: [
          '<b>Negative gerund:</b> I enjoy <b>not having</b> homework at the weekend.',
          '<b>Verb + object + to-infinitive:</b> My parents want <b>me to sleep</b> more.',
          '<b>Passive gerund:</b> Most teenagers can’t stand <b>being told</b> what to do.',
          'The form never changes after a preposition: I’m good <b>at sleeping</b> badly.',
        ] },

      { eyebrow: 'THINK', title: 'Say why, not just what',
        ccq: { q: 'Why is it “The doctor suggested cutting down on caffeine”?',
          a: 'Because <b>suggest</b> is a gerund verb. In the exam — and in class — always name the reason: “suggest takes -ing”, not just “cutting”.' },
        tip: 'When you check your answers, cover the verb in brackets and ask: which group is the FIRST verb in?' },
    ],
    games: [
      { type: 'sort', key: 'sortverb', label: 'Sort the verb', sub: '-ing · to · both', n: 12,
        intro: 'Which form follows this verb? Twelve verbs per round, drawn from the reference tables.',
        buckets: [ { id: 'ing', t: '+ -ING', s: 'gerund', c: 'a' },
                   { id: 'to', t: '+ TO', s: 'infinitive', c: 'b' },
                   { id: 'both', t: 'BOTH', s: 'same meaning', c: 'c' } ],
        items: [
          { t: 'enjoy', ctx: 'I ___ … to school', a: 'ing', why: 'I enjoy <b>walking</b> to school.' },
          { t: 'want', ctx: 'I ___ … more', a: 'to', why: 'I want <b>to sleep</b> more.' },
          { t: 'avoid', ctx: 'She ___ … fizzy drinks', a: 'ing', why: 'She avoids <b>drinking</b> fizzy drinks.' },
          { t: 'decide', ctx: 'We ___ … the team', a: 'to', why: 'We decided <b>to join</b> the team.' },
          { t: 'keep', ctx: 'He ___ … his phone', a: 'ing', why: 'He keeps <b>checking</b> his phone.' },
          { t: 'hope', ctx: 'They ___ … calmer', a: 'to', why: 'They hope <b>to feel</b> calmer.' },
          { t: 'suggest', ctx: 'The doctor ___ … down', a: 'ing', why: 'The doctor suggested <b>cutting</b> down. Never “suggest to do”.' },
          { t: 'manage', ctx: 'He finally ___ … to it', a: 'to', why: 'He managed <b>to stick</b> to it.' },
          { t: 'refuse', ctx: 'She ___ … up', a: 'to', why: 'She refuses <b>to give</b> up.' },
          { t: 'feel like', ctx: 'I don’t ___ … anything', a: 'ing', why: 'I don’t feel like <b>doing</b> anything.' },
          { t: 'can’t stand', ctx: 'Teenagers ___ … told', a: 'ing', why: 'Can’t stand <b>being told</b> — a passive gerund.' },
          { t: 'promise', ctx: 'She ___ … less time', a: 'to', why: 'She promised <b>to spend</b> less time.' },
          { t: 'expect', ctx: 'Don’t ___ … results', a: 'to', why: 'Don’t expect <b>to see</b> results.' },
          { t: 'practise', ctx: 'We ___ … deeply', a: 'ing', why: 'We practise <b>breathing</b> deeply.' },
          { t: 'imagine', ctx: '___ … up energised', a: 'ing', why: 'Imagine <b>waking</b> up energised.' },
          { t: 'mind', ctx: 'I don’t ___ … early', a: 'ing', why: 'I don’t mind <b>getting</b> up early.' },
          { t: 'agree', ctx: 'They ___ … the plan', a: 'to', why: 'They agreed <b>to try</b> the plan.' },
          { t: 'finish', ctx: 'I ___ … my project', a: 'ing', why: 'I finished <b>writing</b> my project.' },
          { t: 'love', ctx: 'I ___ … / … run', a: 'both', why: 'I love <b>running</b> = I love <b>to run</b>.' },
          { t: 'start', ctx: 'It ___ … / … rain', a: 'both', why: 'It started <b>raining</b> = It started <b>to rain</b>.' },
          { t: 'prefer', ctx: 'I ___ … early', a: 'both', why: 'Both forms work with almost no change.' },
          { t: 'continue', ctx: 'She ___ … calmly', a: 'both', why: 'continue <b>talking</b> = continue <b>to talk</b>.' },
        ] },

      { type: 'type', key: 'gaps', label: 'Gap-fill', sub: 'type the right form',
        intro: 'The twelve items from your worksheet. Type ONLY the missing form (e.g. <i>cutting</i> / <i>to see</i>). Two items need a passive.',
        items: [
          { before: 'The doctor suggested', gap: '(cut)', after: 'down on caffeine after 4 p.m.', answers: ['cutting'], why: '<b>suggest</b> is a gerund verb.' },
          { before: 'Don’t expect', gap: '(see)', after: 'results after only two days of a new habit.', answers: ['to see'], why: '<b>expect</b> takes the to-infinitive.' },
          { before: 'I don’t feel like', gap: '(do)', after: 'anything productive on Sunday evenings.', answers: ['doing'], why: '<b>feel like</b> + -ing.' },
          { before: 'Rafaela promised', gap: '(spend)', after: 'less time scrolling before bed.', answers: ['to spend'], why: '<b>promise</b> takes the to-infinitive.' },
          { before: 'Experts say we should avoid', gap: '(compare)', after: 'ourselves to influencers.', answers: ['comparing'], why: '<b>avoid</b> + -ing.' },
          { before: 'After three attempts, he finally managed', gap: '(stick)', after: 'to a morning routine.', answers: ['to stick'], why: '<b>manage</b> takes the to-infinitive.' },
          { before: 'Most teenagers can’t stand', gap: '(tell)', after: 'what to do.', answers: ['being told'], why: 'Passive gerund: <b>being told</b> — they are the ones being told.' },
          { before: 'I keep', gap: '(put)', after: 'off my homework until the last minute.', answers: ['putting'], why: '<b>keep</b> + -ing.' },
          { before: 'She refuses', gap: '(give)', after: 'up, even when training is hard.', answers: ['to give'], why: '<b>refuse</b> takes the to-infinitive.' },
          { before: 'Every morning we practise', gap: '(breathe)', after: 'deeply for two minutes.', answers: ['breathing'], why: '<b>practise</b> + -ing.' },
          { before: 'They hope', gap: '(improve)', after: 'their sleep habits before exam season.', answers: ['to improve'], why: '<b>hope</b> takes the to-infinitive.' },
          { before: 'Imagine', gap: '(wake)', after: 'up feeling energised every single day.', answers: ['waking'], why: '<b>imagine</b> + -ing.' },
        ] },

      { type: 'quiz', key: 'doctor', label: 'Grammar Doctor', sub: 'cure the sentence', time: 20,
        intro: 'Each sentence has ONE pattern illness. Diagnose it and choose the cure.',
        items: [
          { q: 'I really enjoy to spend time offline at weekends.', s: 'What is the cure?', o: ['enjoy spending', 'enjoy to spending', 'enjoy spend'], a: 0, e: '<b>enjoy</b> is a gerund verb → enjoy <b>spending</b>.' },
          { q: 'The coach suggested to train twice a week.', s: 'What is the cure?', o: ['suggested training', 'suggested to training', 'suggested that train'], a: 0, e: '<b>suggest</b> + -ing → suggested <b>training</b>.' },
          { q: 'Despite the rain, we managed finishing the race.', s: 'What is the cure?', o: ['managed to finish', 'managed finish', 'managed for finishing'], a: 0, e: '<b>manage</b> + to-infinitive → managed <b>to finish</b>.' },
          { q: 'I can’t stand to be interrupted when I’m concentrating.', s: 'What is the cure?', o: ['can’t stand being interrupted', 'can’t stand interrupt', 'can’t stand to interrupted'], a: 0, e: '<b>can’t stand</b> + -ing, and it is passive → <b>being interrupted</b>.' },
          { q: 'He promised calling me as soon as the exam finished.', s: 'What is the cure?', o: ['promised to call', 'promised call', 'promised for calling'], a: 0, e: '<b>promise</b> + to-infinitive → promised <b>to call</b>.' },
          { q: 'Do you feel like to watch a film tonight?', s: 'What is the cure?', o: ['feel like watching', 'feel like watch', 'feel like to watching'], a: 0, e: '<b>feel like</b> + -ing → feel like <b>watching</b>.' },
          { q: 'My parents want that I sleep more.', s: 'What is the cure?', o: ['want me to sleep', 'want that I sleep', 'want me sleeping'], a: 0, e: 'Verb + <b>object</b> + to-infinitive: want <b>me to sleep</b>.' },
          { q: 'I enjoy to not have homework at the weekend.', s: 'What is the cure?', o: ['enjoy not having', 'enjoy to not having', 'enjoy don’t have'], a: 0, e: 'Negative gerund: enjoy <b>not having</b>.' },
        ] },
    ],
  };

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 2 · S2 — Tricky verbs: stop / remember / try / forget
   * ------------------------------------------------------------------ */
  const TRICKY = {
    id: 'u4-tricky-verbs', unit: 'u4', week: 'Week 2 · Session 2', icon: '🔀',
    title: 'Tricky Verbs: stop, remember, try, forget',
    lead: 'Double agents: the same verb, two forms — and two different meanings.',
    quizSet: 'b2-tricky-verbs',
    learn: [
      { eyebrow: 'VOTE FIRST', title: 'Same meaning — yes or no?',
        pairs: [ { good: 'She stopped drinking coffee.', bad: 'She stopped to drink a coffee.', note: 'Two completely different stories.' } ],
        ccq: { q: 'So what is the difference?',
          a: '<b>stopped drinking</b> = she quit the habit (no more coffee). <b>stopped to drink</b> = she paused her journey in order to drink one.' } },

      { eyebrow: 'THE MAP', title: 'The core four',
        table: { head: ['Verb', '+ -ing means…', '+ to-infinitive means…'], rows: [
          ['stop', 'quit a habit<br><i>She stopped drinking coffee.</i>', 'pause in order to do<br><i>She stopped to drink a coffee.</i>'],
          ['remember', 'a memory of the past<br><i>I remember scoring my first goal.</i>', 'not forget a duty<br><i>Remember to bring your boots.</i>'],
          ['forget', 'a memory (usually “never forget”)<br><i>I’ll never forget winning the cup.</i>', 'fail to do something<br><i>I forgot to bring my water bottle.</i>'],
          ['try', 'experiment, test an idea<br><i>Try drinking herbal tea.</i>', 'attempt something difficult<br><i>I tried to open the window, but it was stuck.</i>'],
        ]} },

      { eyebrow: 'THE TRICK', title: 'It is all about TIME',
        callout: { icon: '⏳', title: 'remember / forget — which came first?',
          text: 'With <b>-ing</b>, the action happened <b>BEFORE</b> the remembering → a memory.<br>With <b>to</b>, the action happens <b>AFTER</b> the remembering → a duty.' },
        bullets: [
          '<b>I remember locking the door.</b> → I locked it, and I can see it in my head.',
          '<b>I remembered to lock the door.</b> → I didn’t forget, so I locked it.',
        ] },

      { eyebrow: 'EXAM LEVEL', title: 'Three more double agents',
        table: { head: ['Verb', '+ -ing means…', '+ to-infinitive means…'], rows: [
          ['regret', 'feel sorry about the past<br><i>I regret saying that.</i>', 'formal bad news, now<br><i>We regret to inform you that…</i>'],
          ['go on', 'continue the same activity<br><i>He went on talking for an hour.</i>', 'finish one thing, do the next<br><i>She went on to study psychology.</i>'],
          ['mean', 'involve, require<br><i>Getting fit means changing your routine.</i>', 'intend<br><i>I didn’t mean to upset you.</i>'],
        ]},
        tip: '“We regret to inform you…” is the classic formal-letter phrase — you will meet it in real exam texts.' },

      { eyebrow: 'THINK', title: 'Experiment or effort?',
        ccq: { q: '“She tried going to bed at ten” — easy experiment or difficult attempt?',
          a: 'An <b>experiment</b>: going to bed at ten is easy; the question is whether it works. Compare <b>“She tried to keep the routine for a month”</b> = a real effort she may fail at.' } },

      { eyebrow: 'YOUR TURN', title: 'Explain it in one sentence each',
        bullets: [
          '“I stopped running.” vs “I stopped to run.”',
          '“I remembered to call my grandma.” vs “I remember calling my grandma.”',
        ],
        tip: 'If you can explain both pairs out loud, you are ready for the quiz.' },
    ],
    games: [
      { type: 'quiz', key: 'context', label: 'Which form?', sub: 'decide from context', time: 22,
        intro: 'Think MEANING first, then form. The context always tells you: quit or pause? memory or duty? experiment or effort?',
        items: [
          { q: 'I regret ______ that to her yesterday; it was unkind.', o: ['saying', 'to say'], a: 0, e: 'Sorry about the <b>past</b> → regret + -ing.' },
          { q: 'We regret ______ you that Friday’s trip is cancelled.', o: ['informing', 'to inform'], a: 1, e: 'Formal bad news <b>right now</b> → regret + to-infinitive.' },
          { q: 'After the survey, the class went on ______ the results.', o: ['analysing', 'to analyse'], a: 1, e: 'A <b>new stage</b> after the survey → go on + to-infinitive.' },
          { q: 'Getting fitter will mean ______ our sleep routine completely.', o: ['changing', 'to change'], a: 0, e: '“involves / requires” → mean + -ing.' },
          { q: 'He stopped ______ for six months when he injured his knee.', o: ['training', 'to train'], a: 0, e: 'He <b>quit</b> for six months → stop + -ing.' },
          { q: 'We stopped ______ halfway through the run, then carried on.', o: ['stretching', 'to stretch'], a: 1, e: 'A <b>pause with a purpose</b> → stop + to-infinitive.' },
          { q: 'Remember ______ your notes for the quiz tomorrow.', o: ['bringing', 'to bring'], a: 1, e: 'A <b>duty</b> before it happens → remember + to.' },
          { q: 'If you can’t switch off at night, try ______ your worries in a journal.', o: ['writing', 'to write'], a: 0, e: 'An easy <b>experiment</b> → try + -ing.' },
          { q: 'I’ll never forget ______ the championship with that team.', o: ['winning', 'to win'], a: 0, e: 'An unforgettable <b>memory</b> → forget + -ing.' },
          { q: 'She tried ______ the window, but it was completely stuck.', o: ['opening', 'to open'], a: 1, e: 'A <b>difficult attempt</b> that failed → try + to.' },
        ] },

      { type: 'match', key: 'meaning', label: 'Meaning map', sub: 'verb + form → meaning',
        intro: 'Match each pattern with what it actually means.',
        left: 'Verb + form', right: 'Meaning',
        pairs: [
          ['stop + -ing', 'quit a habit'],
          ['stop + to', 'pause in order to do something'],
          ['remember + -ing', 'a memory of the past'],
          ['remember + to', 'a duty you did not forget'],
          ['try + -ing', 'an experiment — does it work?'],
          ['try + to', 'an attempt at something difficult'],
          ['go on + -ing', 'continue the same activity'],
          ['go on + to', 'move on to the next stage'],
        ] },

      { type: 'sort', key: 'time', label: 'Memory or Duty?', sub: 'the time trick',
        intro: 'remember / forget: did the action happen BEFORE the remembering (a memory) or AFTER it (a duty)?',
        buckets: [ { id: 'mem', t: 'MEMORY', s: 'before · -ing', c: 'a' },
                   { id: 'duty', t: 'DUTY', s: 'after · to + verb', c: 'b' } ],
        items: [
          { t: 'I remember scoring my first goal.', a: 'mem', why: 'The goal happened first → memory.' },
          { t: 'Remember to bring your boots on Monday.', a: 'duty', why: 'The bringing comes after → duty.' },
          { t: 'I’ll never forget winning the cup.', a: 'mem', why: 'An unforgettable memory.' },
          { t: 'I forgot to bring my water bottle.', a: 'duty', why: 'He failed to do it → duty (not done!).' },
          { t: 'Did you remember to lock the door?', a: 'duty', why: 'Checking a duty before leaving.' },
          { t: 'She remembers meeting him at the science fair.', a: 'mem', why: 'The meeting is in the past → memory.' },
          { t: 'Don’t forget to charge your laptop tonight.', a: 'duty', why: 'A duty for later.' },
          { t: 'He’ll never forget hearing that song for the first time.', a: 'mem', why: 'A memory he keeps.' },
        ] },
    ],
  };

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 3 · S1 — Modals of advice: degrees of strength
   * ------------------------------------------------------------------ */
  const ADVICE = {
    id: 'u4-modals-advice', unit: 'u4', week: 'Week 3 · Session 1', icon: '🪜',
    title: 'Modals of Advice',
    lead: 'The advice ladder: could → should → had better → must, plus softeners that keep it kind.',
    quizSet: 'b2-modals-advice',
    learn: [
      { eyebrow: 'THE BIG IDEA', title: 'Not WHAT you advise — how STRONG it sounds',
        callout: { icon: '🎯', title: 'Strength must match the problem',
          text: 'Small problem → gentle advice. Real danger → strong advice. Get that wrong and you sound bossy… or comic.' } },

      { eyebrow: 'THE LADDER', title: 'Four rungs of strength',
        table: { head: ['Strength', 'Modals', 'Example', 'It sounds like…'], rows: [
          ['1 · Gentle suggestion', 'could / might want to', '“You could try a study playlist.”', 'a friendly idea — easy to say no'],
          ['2 · Standard advice', 'should / ought to', '“You should ask your teacher for help.”', 'what a good friend honestly thinks'],
          ['3 · Strong warning', 'had better (’d better)', '“You’d better save your work now.”', 'do it — or something bad will happen'],
          ['4 · Very strong / urgent', 'must', '“You must tell an adult about this.”', 'there is no other option'],
        ]},
        tip: 'What is hiding at the end of every ’d better sentence? “…or else”. If there is no consequence, it is not rung 3.' },

      { eyebrow: 'SOFTENERS', title: 'Same advice, different music',
        cols: [
          { h: 'Softeners to memorise', sub: 'at least three of them',
            items: ['Maybe you could…', 'It might help to…', 'Have you tried…?', 'If I were you, I’d…', 'You might want to…', 'It might be worth… (+ -ing)'],
            ex: ['“Stop using your phone!” → “It might help to leave your phone outside your bedroom.”'] },
        ],
        tip: 'Softeners keep the same advice but change the music — your friend feels helped, not commanded.' },

      { eyebrow: 'WATCH OUT', title: 'Spelling and register',
        callout: { icon: '⚠️', title: '“you’d better”, never “you better”',
          text: 'It is <b>had better</b> → the contraction keeps the ’d: <b>You’d better start tonight.</b>' },
        ccq: { q: 'Is “You’d better finish this essay” polite to say to a teacher?',
          a: '<b>No.</b> “Had better” carries a hidden threat — “…or else”. Between friends about something urgent it is fine; said <b>upwards</b> (teacher, parent, boss) it sounds like a warning to them. Use a request instead: “Would you mind looking at my essay when you have a moment?”' } },

      { eyebrow: 'THINK', title: '“You must relax!”',
        ccq: { q: 'Why does this sound strange — even funny?',
          a: 'The <b>strongest</b> form is used for the <b>gentlest</b> goal. You cannot order someone to relax. Fix it: “It might help to breathe slowly.” / “Maybe you could take a short break.”' } },

      { eyebrow: 'IN SPEAKING', title: 'Empathy first, then advice',
        bullets: [
          '1. Empathy: “That sounds really hard…”',
          '2. Then two pieces of advice <b>at the right strength</b>.',
          '3. No bare imperatives (“Study more!”) — they are orders, not advice.',
        ],
        tip: 'This is exactly what the speed-dating rounds were marking in class.' },
    ],
    games: [
      { type: 'sort', key: 'rank', label: 'Rank the rung', sub: '1 gentle → 4 urgent',
        intro: 'Which rung of the ladder is each sentence on? Ask yourself: is there a consequence? Is there any choice left?',
        buckets: [ { id: 'r1', t: '1 · GENTLE', s: 'could / might want to', c: 'a' },
                   { id: 'r2', t: '2 · STANDARD', s: 'should / ought to', c: 'b' },
                   { id: 'r3', t: '3 · WARNING', s: '’d better', c: 'd' },
                   { id: 'r4', t: '4 · URGENT', s: 'must', c: 'e' } ],
        items: [
          { t: 'You must see the school counsellor today — this can’t wait.', a: 'r4', why: '<b>must</b> + no other option → rung 4.' },
          { t: 'You could try going to bed thirty minutes earlier.', a: 'r1', why: '<b>could try</b> = a friendly idea → rung 1.' },
          { t: 'You should talk to your teacher about the deadline.', a: 'r2', why: '<b>should</b> = honest advice → rung 2.' },
          { t: 'You’d better stop copying homework before the teacher finds out.', a: 'r3', why: '’d better + a concrete bad consequence → rung 3.' },
          { t: 'You might want to take a break from the group chat.', a: 'r1', why: '<b>might want to</b> = gentle → rung 1.' },
          { t: 'You ought to eat breakfast before an exam.', a: 'r2', why: '<b>ought to</b> = the same strength as should → rung 2.' },
          { t: 'You’d better back up your project tonight — the deadline is tomorrow.', a: 'r3', why: 'Warning + consequence → rung 3.' },
          { t: 'Maybe you could ask your sister to help you with maths.', a: 'r1', why: '<b>Maybe you could</b> = softened suggestion → rung 1.' },
        ] },

      { type: 'quiz', key: 'kind', label: 'Make it kind', sub: 'bossy → helpful', time: 22,
        intro: 'Each order is too bossy. Choose the version that keeps the advice but changes the music.',
        items: [
          { q: '“Stop using your phone at night!”', s: 'Choose the kind version:', o: ['It might help to leave your phone outside your bedroom at night.', 'You must stop using your phone at night.', 'You better stop using your phone at night.'], a: 0, e: '<b>It might help to…</b> softens without losing the advice. (“You better” is also misspelled — it is “you’d better”.)' },
          { q: '“Study more!”', s: 'Choose the kind version:', o: ['Maybe you could add two short study sessions this week.', 'You’d better study more.', 'You must study more!'], a: 0, e: 'Small problem → rung 1. <b>Maybe you could…</b>' },
          { q: '“Don’t eat junk food!”', s: 'Choose the kind version:', o: ['You might want to swap some snacks for fruit.', 'You must not eat junk food.', 'You’d better not eat junk food.'], a: 0, e: '<b>You might want to…</b> — gentle, and it offers an alternative.' },
          { q: '“Talk to her right now!”', s: 'Choose the kind version:', o: ['Have you tried talking to her calmly about how you feel?', 'You must talk to her right now.', 'You’d better talk to her now.'], a: 0, e: '<b>Have you tried + -ing?</b> turns the order into a question.' },
          { q: '“Go to sleep earlier!”', s: 'Choose the kind version:', o: ['If I were you, I’d go to bed thirty minutes earlier for a week and see how it feels.', 'You must go to sleep earlier.', 'You better go to bed earlier.'], a: 0, e: '<b>If I were you, I’d…</b> — advice from experience, not an order.' },
          { q: '“Calm down before your presentation!”', s: 'Choose the kind version:', o: ['It might help to breathe slowly and run through your slides once more.', 'You must calm down.', 'You’d better calm down.'], a: 0, e: 'You cannot order someone to calm down — the strength must match the goal.' },
          { q: 'Your friend has an exam tomorrow and hasn’t started studying.', s: 'Which is the correct STRONG advice?', o: ['You’d better start tonight — there’s no time left tomorrow.', 'You better start tonight.', 'You’d better to start tonight.'], a: 0, e: '<b>had better + bare infinitive</b>, and the ’d is not optional.' },
          { q: 'You are writing to a teacher about your essay.', s: 'Which is appropriate?', o: ['Would you mind looking at my essay when you have a moment?', 'You’d better read my essay today.', 'You must read my essay.'], a: 0, e: '’d better and must said <b>upwards</b> sound like warnings. Use a polite request.' },
        ] },

      { type: 'match', key: 'soft', label: 'Softener patterns', sub: 'what comes next?',
        intro: 'Each softener demands a different form after it. Match the two halves.',
        left: 'Softener', right: '…continues like this',
        pairs: [
          ['Maybe you could', 'put the console away at midnight.'],
          ['It might help', 'to prepare breakfast the night before.'],
          ['Have you tried', 'talking to her calmly?'],
          ['If I were you,', 'I’d go to bed thirty minutes earlier.'],
          ['You might want', 'to take a break from the group chat.'],
          ['It might be worth', 'scheduling two short revision sessions.'],
          ['You ought', 'to make a two-day study plan.'],
          ['You’d better', 'start studying tonight — the exam is on Monday.'],
        ] },
    ],
  };

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 3 · S3 — Speculation modals
   * ------------------------------------------------------------------ */
  const SPECULATION = {
    id: 'u4-speculation', unit: 'u4', week: 'Week 3 · Session 3', icon: '🔮',
    title: 'Speculation Modals',
    lead: 'must / might / may / could / can’t — how sure are you, and what is your evidence?',
    quizSet: 'b2-speculation',
    learn: [
      { eyebrow: 'SAME WORDS, NEW JOB', title: 'Last week: advice. Today: guessing',
        lead: 'Speculation = saying what is probably true, based on the evidence in front of you.',
        bullets: ['“What’s in my bag?” → It <b>might</b> be a book. It <b>can’t</b> be a laptop — too small!'] },

      { eyebrow: 'THE SCALE', title: 'How sure am I?',
        table: { head: ['How sure am I?', 'Modal', 'Example'], rows: [
          ['Almost sure it IS true (≈90%)', 'must', '“She must be exhausted — look at her eyes.”'],
          ['Possible — I’m not sure (≈50%)', 'might / may / could', '“She might be at basketball practice.”'],
          ['Almost sure it is NOT true', 'can’t', '“He can’t be home yet — school just finished.”'],
        ]},
        tip: 'Every guess needs evidence you can point to. “Why must?” — that is the question in class.' },

      { eyebrow: 'THE MISCONCEPTION', title: '“She must be tired” is still a GUESS',
        callout: { icon: '🚨', title: 'Fact vs guess',
          text: '<b>Fact:</b> “She IS tired.” — she told me, I know.<br><b>Guess:</b> “She MUST BE tired.” — dark circles, yawning… but I don’t know.' },
        ccq: { q: '“She must be tired” — do I KNOW she is tired?',
          a: 'No. <b>must be</b> = a strong guess from evidence. Only the plain present (“she is tired”), with real knowledge behind it, is a fact.' } },

      { eyebrow: 'SPANISH TRAP', title: 'The opposite of “must be” is “can’t be”',
        callout: { icon: '⚠️', title: 'Not “mustn’t be”',
          text: '<s>He mustn’t be home.</s> → <b>He can’t be home.</b><br>“mustn’t” = prohibition (you are not allowed), never a negative guess.' } },

      { eyebrow: 'B2 / C1', title: 'Guessing about the PAST',
        lead: 'modal + <b>have</b> + past participle',
        bullets: [
          'She <b>must have stayed</b> up late studying.',
          'They <b>might have gone</b> to the beach.',
          'He <b>can’t have forgotten</b> — I texted him twice.',
        ],
        tip: 'Present guess = modal + be. Past guess = modal + have + past participle.' },

      { eyebrow: 'DETECTIVE', title: 'Read the evidence',
        lead: 'A girl with headphones is asleep on a pile of textbooks. It is 4 p.m.',
        ccq: { q: 'What must be true? What might be true?',
          a: '“She <b>must be</b> exhausted” (evidence: asleep at 4 p.m. on her books). “She <b>might be</b> listening to a study playlist.” Past: “She <b>must have stayed</b> up late studying.”' } },
    ],
    games: [
      { type: 'sort', key: 'sure', label: 'How sure?', sub: 'must · might · can’t',
        intro: 'Which modal fits the gap? Read the evidence in the sentence before you choose.',
        buckets: [ { id: 'must', t: 'MUST', s: '≈90% sure it IS', c: 'a' },
                   { id: 'might', t: 'MIGHT / MAY / COULD', s: '≈50% — possible', c: 'b' },
                   { id: 'cant', t: 'CAN’T', s: 'almost sure it is NOT', c: 'd' } ],
        items: [
          { t: 'Look at Diego’s medal! He ______ be really proud.', a: 'must', why: 'The medal is the evidence → a strong guess.' },
          { t: 'I’m not sure where Sofia is. She ______ be in the library, or maybe in the canteen.', a: 'might', why: '“or maybe” = two options → about 50%.' },
          { t: 'That ______ be Mr Torres — he’s in Cusco this week!', a: 'cant', why: 'He is 1,100 km away → almost certainly NOT him.' },
          { t: 'You studied for six hours? You ______ be exhausted.', a: 'must', why: 'Six hours of study → a confident guess.' },
          { t: 'Don’t call her now. It’s 6 a.m. in Spain — she ______ still be asleep.', a: 'might', why: 'Likely but not certain → might / may / could. (must is also defensible.)' },
          { t: 'This ______ be Valeria’s bag — hers is red, and this one is black.', a: 'cant', why: 'The colours don’t match → negative certainty.' },
          { t: 'They’re not answering the door. They ______ be in the garden.', a: 'might', why: 'One possible explanation among several.' },
          { t: 'He’s worn that team shirt three days in a row. He ______ really love that team.', a: 'must', why: 'Three days running → strong evidence.' },
        ] },

      { type: 'sort', key: 'fog', label: 'Fact or Guess?', sub: 'F or G',
        intro: 'Does the speaker KNOW, or are they reading the evidence? Watch out for item 5 — it sounds certain.',
        buckets: [ { id: 'f', t: 'FACT', s: 'the speaker knows', c: 'c' },
                   { id: 'g', t: 'GUESS', s: 'speculation', c: 'b' } ],
        items: [
          { t: 'Lucia told me she is sick today.', a: 'f', why: 'She <b>told</b> me → knowledge.' },
          { t: 'Lucia isn’t at school. She must be sick.', a: 'g', why: 'Evidence: she isn’t at school. Still a guess.' },
          { t: 'It’s 3 p.m. in Lima, so it’s 9 p.m. in Madrid.', a: 'f', why: 'Time zones are known information.' },
          { t: 'Marco is smiling. He must have good news.', a: 'g', why: 'Evidence: the smile. He might be smiling for any reason.' },
          { t: 'The lights are off. They can’t be home.', a: 'g', why: '<b>can’t</b> sounds certain, but it is an inference — they could be asleep.' },
          { t: 'I saw them leave, so they are not at home.', a: 'f', why: 'The speaker saw it → fact.' },
          { t: 'Dad’s shoes are wet. It must be raining.', a: 'g', why: 'Evidence: wet shoes. A guess about the weather.' },
          { t: 'The teacher wrote the deadline on the board: Friday.', a: 'f', why: 'Written information → fact.' },
        ] },

      { type: 'quiz', key: 'detective', label: 'Detective', sub: 'read the photo', time: 25,
        intro: 'Five scenes from class, plus a few past guesses. Choose the guess the evidence actually supports.',
        items: [
          { q: 'A girl with headphones is asleep on a pile of textbooks. It is 4 p.m.', s: 'Best guess?', o: ['She must be exhausted.', 'She can’t be tired.', 'She must be sleeping badly tonight.'], a: 0, e: 'Asleep at 4 p.m. on her books → strong evidence for exhaustion.' },
          { q: 'A boy in a muddy football kit is grinning and holding a small gold trophy.', s: 'Best guess about BEFORE?', o: ['His team must have won.', 'His team can’t have played.', 'His team might be losing.'], a: 0, e: 'Trophy + grin + mud → <b>must have won</b> (past guess: modal + have + participle).' },
          { q: 'The fridge is open, an empty pizza box is on the counter, three school bags are by the door.', s: 'Which guess fits the bags?', o: ['The kids must be home from school.', 'The kids can’t be home.', 'The kids must have gone to school.'], a: 0, e: 'Three bags by the door = they are in the house.' },
          { q: 'A teenager at a bus stop in the rain checks her phone every few seconds.', s: 'Which negative guess fits?', o: ['She can’t be enjoying the rain.', 'She mustn’t be enjoying the rain.', 'She can’t enjoy the rain.'], a: 0, e: 'Negative guess = <b>can’t be</b> + -ing. “mustn’t” would mean she is not allowed to.' },
          { q: 'A bedroom light is on at 2 a.m. Someone is at the desk with three empty energy-drink cans.', s: 'Best pair of guesses?', o: ['She must be studying for an exam, and she can’t be sleeping well.', 'She might not study, and she mustn’t sleep.', 'She can’t be studying, so she must sleep badly.'], a: 0, e: 'Light + desk + energy drinks at 2 a.m. → must be studying; can’t be sleeping well.' },
          { q: 'He knew the exact score of Sunday’s match.', s: 'Past guess:', o: ['He must have watched the match.', 'He must watch the match.', 'He can’t have watched the match.'], a: 0, e: 'Past guess = <b>must have</b> + past participle.' },
          { q: 'You’re sunburnt!', s: 'Past guess:', o: ['You can’t have stayed home all weekend.', 'You mustn’t stay home all weekend.', 'You can’t stay home all weekend.'], a: 0, e: 'Negative past guess = <b>can’t have</b> + past participle.' },
          { q: 'I texted him twice and he replied both times.', s: 'Which guess is right?', o: ['He can’t have forgotten.', 'He mustn’t have forgotten.', 'He might not forget.'], a: 0, e: 'Two replies = almost certainly NOT forgotten → <b>can’t have forgotten</b>.' },
        ] },
    ],
  };

  /* ------------------------------------------------------------------
   * UNIT 4 · WEEK 6 · S4 — Wish / If only + quantifiers (FCE prep)
   * ------------------------------------------------------------------ */
  const WISH = {
    id: 'u4-wish-quant', unit: 'u4', week: 'Week 6 · Session 4', icon: '⭐',
    title: 'Wish, If only + Quantifiers',
    lead: 'Three wish patterns (the question is WHEN?) and the quantifiers FCE keeps asking for.',
    quizSet: 'b2-wish-quant',
    learn: [
      { eyebrow: 'WISH', title: 'Three patterns, one question: WHEN?',
        table: { head: ['Structure', 'When we use it', 'Example'], rows: [
          ['wish / if only + <b>past simple</b>', 'A present regret — I want reality to be different NOW.', 'I wish I slept more.<br>If only I had more free time.'],
          ['wish + <b>would(n’t)</b>', 'Annoyance at someone ELSE’S repeated behaviour.', 'I wish my brother wouldn’t play music at 2 a.m.'],
          ['wish / if only + <b>past perfect</b>', 'A past regret — it is too late to change it.', 'If only I had started my project earlier.'],
        ]},
        tip: 'The TIME of the regret picks the tense. Ask: now, someone else’s habit, or too late?' },

      { eyebrow: 'WATCH OUT', title: '“I wish I would sleep more”',
        callout: { icon: '⚠️', title: 'Wrong — and very common',
          text: '<b>would</b> after wish is only for OTHER people’s annoying habits. For yourself it is the past simple: <b>I wish I slept more.</b>' },
        ccq: { q: 'Why is “ojalá” dangerous here?',
          a: 'Because <b>ojalá</b> maps onto all three English patterns at once. Spanish gives you one word; English makes you choose the tense by the TIME of the regret.' } },

      { eyebrow: 'QUANTIFIERS', title: 'How much is too much?',
        table: { head: ['Quantifier', 'Used with', 'Meaning + example'], rows: [
          ['a few', 'plural countable', 'some, enough to be positive — <i>I have a few good friends I can really talk to.</i>'],
          ['few', 'plural countable', 'almost none (negative) — <i>Few students sleep nine hours.</i>'],
          ['a little', 'uncountable', 'some, enough to be positive — <i>A little stress can actually help you focus.</i>'],
          ['little', 'uncountable', 'almost none (negative) — <i>There is little time to relax in exam week.</i>'],
          ['plenty of', 'both', 'more than enough — <i>There is plenty of evidence that exercise lifts your mood.</i>'],
          ['hardly any', 'both', 'almost zero — <i>I get hardly any exercise in winter.</i>'],
          ['too much / too many', 'uncountable / countable', 'more than is good — <i>too much screen time; too many notifications.</i>'],
          ['enough', 'both', 'as much as needed — <i>Do you drink enough water?</i>'],
        ]} },

      { eyebrow: 'THE CONTRAST', title: 'Half full or half empty?',
        pairs: [
          { good: 'I had a few hours free and a little energy, so I went out.', bad: 'I had few hours free and little energy, so I stayed in.', note: 'Same weekend, two very different speakers. (Neither is “wrong” — they mean different things.)' },
        ],
        ccq: { q: '“There’s little hope” vs “There’s a little hope” — which speaker still believes?',
          a: 'The second. <b>a little / a few</b> = some, and that’s OK. <b>little / few</b> = almost none, and I’m not happy about it.' } },

      { eyebrow: 'FCE PART 4', title: 'Key-word transformations',
        bullets: [
          'Use between <b>2 and 5 words</b>, including the key word.',
          '<b>Never change the key word.</b>',
          'Contractions count as two words (didn’t = did + not).',
        ],
        tip: 'These two patterns are among the highest-frequency items in Part 4 — automatic patterns are free marks in December.' },
    ],
    games: [
      { type: 'sort', key: 'pattern', label: 'Which pattern?', sub: 'when is the regret?',
        intro: 'Read the situation and choose the pattern you would use after <i>wish / if only</i>.',
        buckets: [ { id: 'ps', t: 'PAST SIMPLE', s: 'present regret', c: 'a' },
                   { id: 'wd', t: 'WOULD(N’T)', s: 'someone else’s habit', c: 'b' },
                   { id: 'pp', t: 'PAST PERFECT', s: 'past regret', c: 'd' } ],
        items: [
          { t: 'You are tired right now.', a: 'ps', why: 'I wish I <b>slept</b> more. → present regret.' },
          { t: 'Your neighbour’s dog barks every single night.', a: 'wd', why: 'I wish it <b>wouldn’t bark</b>. → someone else’s repeated habit.' },
          { t: 'You didn’t study for yesterday’s test.', a: 'pp', why: 'If only I <b>had studied</b>. → too late now.' },
          { t: 'You don’t have enough free time this term.', a: 'ps', why: 'If only I <b>had</b> more free time. → now.' },
          { t: 'Your brother plays loud music at 2 a.m., again and again.', a: 'wd', why: 'I wish he <b>wouldn’t play</b> music at 2 a.m.' },
          { t: 'You didn’t join the football team in September.', a: 'pp', why: 'I wish I <b>had joined</b> the team. → past regret.' },
          { t: 'You can’t speak French, and you would love to.', a: 'ps', why: 'I wish I <b>spoke</b> French. → present regret.' },
          { t: 'You stayed up far too late last night.', a: 'pp', why: 'If only I <b>hadn’t stayed</b> up so late. → past regret.' },
          { t: 'Your friends keep sharing your photos without asking.', a: 'wd', why: 'I wish they <b>wouldn’t share</b> my photos.' },
        ] },

      { type: 'type', key: 'fce', label: 'FCE transformations', sub: '2–5 words',
        intro: 'Complete the second sentence so it means the same. Use 2–5 words <b>including the key word</b>, and do not change it.',
        items: [
          { lead: 'I’m sorry I don’t have more time to relax.', key: 'WISH',
            before: 'I',  after: 'more time to relax.',
            answers: ['wish i had'], why: 'Present regret → wish + <b>past simple</b>: “wish I had”.' },
          { lead: 'It’s a pity I stayed up so late last night.', key: 'ONLY',
            before: 'If',  after: 'up so late last night.',
            answers: ['only i hadn’t stayed', "only i hadn't stayed", 'only i had not stayed'], why: 'Past regret → if only + <b>past perfect</b> (negative): “only I hadn’t stayed”.' },
          { lead: 'My brother plays loud music at 2 a.m. and it drives me crazy.', key: 'WOULDN’T',
            before: 'I wish',  after: 'loud music at 2 a.m.',
            answers: ['my brother wouldn’t play', "my brother wouldn't play"], why: 'Someone else’s annoying habit → wish + <b>wouldn’t</b> + bare infinitive.' },
          { lead: 'I regret not joining the football team in September.', key: 'HAD',
            before: 'I wish',  after: 'the football team in September.',
            answers: ['i had joined'], why: 'Past regret → wish + <b>past perfect</b>: “I had joined”.' },
          { lead: 'There is almost no time to exercise during exam week.', key: 'HARDLY',
            before: 'There is',  after: 'to exercise during exam week.',
            answers: ['hardly any time'], why: '<b>hardly any</b> = almost zero, + the uncountable noun “time”.' },
          { lead: 'I spend far too many hours on my phone before bed.', key: 'DIDN’T',
            before: 'I wish I',  after: 'hours on my phone before bed.',
            answers: ['didn’t spend so many', "didn't spend so many", 'didn’t spend too many', "didn't spend too many"], why: 'Present regret about my own habit → wish + <b>past simple</b> negative + so many.' },
          { lead: 'We have more than enough ideas for a second episode.', key: 'PLENTY',
            before: 'We have',  after: 'for a second episode.',
            answers: ['plenty of ideas'], why: '<b>plenty of</b> = more than enough.' },
          { lead: 'Most students drink less water than they need.', key: 'ENOUGH',
            before: 'Most students do not drink',  after: '.',
            answers: ['enough water'], why: '<b>enough</b> = as much as needed.' },
        ] },

      { type: 'quiz', key: 'quant', label: 'Quantifier check', sub: 'a few / few / plenty…', time: 20,
        intro: 'The survey text from your worksheet, plus the half-full / half-empty pairs. Think: countable or uncountable? positive or negative?',
        items: [
          { q: 'Most teenagers spend ______ time on screens after 10 p.m.', o: ['too much', 'too many', 'a few'], a: 0, e: '<b>time</b> is uncountable + “more than is good” → too much.' },
          { q: '… and ______ of them get the nine hours of sleep doctors recommend.', o: ['hardly any', 'plenty', 'a little'], a: 0, e: '“of them” + almost zero → <b>hardly any</b>.' },
          { q: '______ students said they exercise every day.', o: ['A few', 'A little', 'Much'], a: 0, e: 'Plural countable + positive “some students” → <b>A few</b>.' },
          { q: 'Many admitted they have ______ energy in the mornings.', o: ['little', 'few', 'a few'], a: 0, e: '<b>energy</b> is uncountable + negative feeling → little.' },
          { q: 'There is ______ evidence that small changes work.', o: ['plenty of', 'hardly any', 'too many'], a: 0, e: 'The good news → more than enough → <b>plenty of</b>.' },
          { q: 'Most students said they now drink ______ water during the school day.', o: ['enough', 'too much', 'few'], a: 0, e: 'As much as needed → <b>enough</b>.' },
          { q: 'I have ______ good friends I can really talk to.', o: ['a few', 'few', 'a little'], a: 0, e: 'Positive → <b>a few</b>. “few good friends” would sound sad.' },
          { q: '______ students sleep nine hours a night.', o: ['Few', 'A few', 'Little'], a: 0, e: 'Almost none, negative → <b>Few</b>.' },
          { q: '______ stress can actually help you focus.', o: ['A little', 'Little', 'A few'], a: 0, e: 'Uncountable + positive → <b>A little</b>.' },
          { q: 'Which speaker still believes there is hope?', o: ['There’s a little hope.', 'There’s little hope.', 'There’s hardly any hope.'], a: 0, e: '<b>a little</b> = some, and that’s OK. <b>little</b> / hardly any = almost none.' },
        ] },
    ],
  };

  /* ------------------------------------------------------------------ */
  window.GRAMMAR_LAB = {
    /* Unidades en orden de dictado; el título se usa en las cabeceras. */
    units: {
      u4: { title: 'Unit 4 — Mind Over Matter', sub: 'The Wellbeing Generation · 9th grade · B2' },
    },
    topics: [INTENSITY, GERUND, TRICKY, ADVICE, SPECULATION, WISH],
  };
  window.GRAMMAR_LAB.byId = function (id) {
    return this.topics.filter(function (t) { return t.id === id; })[0] || null;
  };
  /* Temas de una unidad, en el orden en que se dictan. */
  window.GRAMMAR_LAB.forUnit = function (unit) {
    return this.topics.filter(function (t) { return t.unit === unit; });
  };
})();
