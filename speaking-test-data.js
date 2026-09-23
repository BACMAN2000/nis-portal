/* Speaking test (23-sep-2026): los cuatro guiones del examinador (interlocutor
   frames) del B1 Preliminary / PET, transcritos TAL CUAL del PDF
   «speaking script.pdf» (Frames for the Speaking test, págs. 92-103), y las
   escalas analíticas de Cambridge por nivel (A2 Key · B1 Preliminary ·
   B2 First · C1 Advanced) con los descriptores de las bandas 1, 3 y 5.
   Las láminas (Parte 2: dibujo con ideas; Parte 3: una foto por candidato)
   son las del «Visual material for the Speaking test» del mismo libro
   (Cambridge PET 5, págs. I–VIII), recortadas en speaking-img/pet5-*.jpg;
   el guion las enseña en pantalla en vez de mandar al Student's Book.
   Lo lee app/74-speaking-test.js. No se traduce (data-i18n="off"). */
window.SPEAKING_TEST = (function(){

  /* ---- Bloques del guion ----
     h    cabecera (Phase 1 / Examiner)
     sp   turno del examinador: who (A/B, A, B) + lines
     box  texto enmarcado que el examinador lee
     bk   caja «Back-up prompts» (lines)
     it   instrucción en cursiva para el examinador
     p    texto suelto
     side box + bk en paralelo (left / right)                                */

  const PART1 = {
    n:1, mins:'2–3 minutes', title:null,
    tasks:'Identifying oneself; giving information about oneself; talking about interests.',
    blocks:[
      {t:'h', text:'Phase 1'},
      {t:'h', text:'Examiner'},
      {t:'sp', who:'A/B', lines:['Good morning / afternoon / evening.','Can I have your mark sheets, please?']},
      {t:'sp', who:'A/B', lines:['I’m ............ and this is ............ .','He / she is just going to listen to us.']},
      {t:'sp', who:'A', lines:['Now, what’s your name?','Thank you.']},
      {t:'sp', who:'B', lines:['And, what’s your name?','Thank you.']},
      {t:'side',
        left:[
          {who:'B', lines:['Candidate B, what’s your surname?','How do you spell it?','','Thank you.']},
          {who:'A', lines:['And Candidate A, what’s your surname?','How do you spell it?','','Thank you.']}
        ],
        right:{title:'Back-up prompts', lines:['How do you write your family / second name?']}},
      {t:'side',
        left:[
          {who:'', lines:['(Ask the following questions.','Ask Candidate A first.)','','Where do you live / come from?','','Do you work or are you a student in . . .?','What do you do / study?','','Thank you.','','(Repeat for Candidate B.)'], italicFirst:2}
        ],
        right:{title:'', lines:['Do you live in . . .?','','Have you got a job?','What job do you do? / What subject(s) do you study?']}},
      {t:'h', text:'Phase 2'},
      {t:'h', text:'Examiner'},
      {t:'it', text:'(Select one or more questions from the list to ask each candidate. Ask Candidate B first.)'},
      {t:'side', plain:true,
        left:[{who:'', lines:['Do you enjoy studying English? Why (not)?','','Do you think that English will be useful for you in the future?','','What did you do yesterday evening / last weekend?','','What do you enjoy doing in your free time?','','Thank you.','','(Introduction to Part 2)','','In the next part, you are going to talk to each other.']}],
        right:{title:'Back-up prompts', lines:['Do you like studying English?','','Will you use English in the future?','','Did you do anything yesterday evening / last weekend? What?','','What do you like to do in your free time?']}}
    ]
  };

  /* Bloque {t:'pic'}: la lámina, en el punto del guion donde el examinador la
     enseña (Parte 2: una para los dos; Parte 3: la del candidato `seat`). */
  const IMG = id => ({ id:id.toUpperCase(), src:'speaking-img/pet5-'+id+'.jpg' });

  function part2(title, situation, pic){
    return {
      n:2, mins:'2–3 minutes', title:title,
      tasks:'Discussing alternatives; expressing opinions; making choices.',
      pic:IMG(pic),
      blocks:[
        {t:'h', text:'Examiner'},
        {t:'it', text:'Say to both candidates:'},
        {t:'box', lines:['I’m going to describe a situation to you.','',situation,'','Here is a picture with some ideas to help you.']},
        {t:'pic'},
        {t:'it', text:'Show both candidates the picture and repeat the frame.'},
        {t:'box', lines:['I’ll say that again.','',situation,'','All right? Talk together.']},
        {t:'it', text:'Allow the candidates enough time to complete the task without intervention. Prompt only if necessary.'}
      ]
    };
  }

  function part3(title, intro, aText, bText, picA, picB){
    return {
      n:3, mins:'3 minutes', title:title,
      tasks:'Describing people and places; saying where people and things are and what different people are doing.',
      pics:{ A:IMG(picA), B:IMG(picB) },
      blocks:[
        {t:'h', text:'Examiner'},
        {t:'it', text:'Say to both candidates:'},
        {t:'box', lines:[intro,'',aText,'','Candidate A, please tell us what you can see in your picture.']},
        {t:'pic', seat:'A'},
        {t:'sp', who:'(Candidate A)', italic:true, lines:['Approximately one minute.','If there is a need to intervene, prompts rather than direct questions should be used.','','Close Candidate A’s picture.']},
        {t:'h', text:'Examiner'},
        {t:'box', lines:[bText]},
        {t:'pic', seat:'B'},
        {t:'sp', who:'(Candidate B)', italic:true, lines:['Approximately one minute.','','Close the pictures before moving to Part 4.']}
      ]
    };
  }

  function part4(text, prompts){
    return {
      n:4, mins:'3 minutes', title:null,
      tasks:'Talking about one’s likes and dislikes; expressing opinions.',
      blocks:[
        {t:'h', text:'Examiner'},
        {t:'it', text:'Say to both candidates:'},
        {t:'box', lines:[text]},
        {t:'it', text:'Allow the candidates enough time to complete the task without intervention. Prompt only if necessary.'},
        {t:'bk', title:'Back-up Prompts', numbered:true, lines:prompts},
        {t:'box', small:true, lines:['Thank you. That’s the end of the test.']}
      ]
    };
  }

  const TESTS = [
    { n:1, parts:[
      PART1,
      part2('T-SHIRT DESIGN',
        'The members of an English Language Club would like to have their own special T-shirt. Talk together about the different things they can put on the T-shirt and decide which one would be best.', '1a'),
      part3('PEOPLE AND PHOTOS',
        'Now, I’d like each of you to talk on your own about something. I’m going to give each of you a picture of people and photographs.',
        'Candidate A, here is your picture. Please show it to Candidate B, but I’d like you to talk about it. Candidate B, you just listen. I’ll give you your picture in a moment.',
        'Now, Candidate B, here is your picture. It also shows someone with photographs. Please show it to Candidate A and tell us what you can see in the picture.', '1b', '1c'),
      part4('Your pictures showed people and photographs. Now, I’d like you to talk together about the type of photographs you like to look at, and the type of photographs you like to keep.',
        ['Talk about the photographs you like to **look** at.','Talk about the photographs you like to **keep**.','Talk about the type of photographs you **dislike**.','Talk about the type of photographs you **take**.'])
    ]},
    { n:2, parts:[
      PART1,
      part2('WEDDING PRESENT',
        'A school teacher is getting married next month. Her class would like to give her a present. Talk together about the different presents her class could give her, and say which would be best.', '2a'),
      part3('WEATHER',
        'Now, I’d like each of you to talk on your own about something. I’m going to give each of you a photograph of people enjoying different kinds of weather.',
        'Candidate A, here is your photograph. Please show it to Candidate B, but I’d like you to talk about it. Candidate B, you just listen. I’ll give you your photograph in a moment.',
        'Now, Candidate B, here is your photograph. It also shows people enjoying different kinds of weather. Please show it to Candidate A and tell us what you can see in the photograph.', '2b', '2c'),
      part4('Your photographs showed people enjoying different kinds of weather. Now, I’d like you to talk together about the type of weather you prefer and say what you enjoy doing in different types of weather.',
        ['Talk about the type of weather you **like**.','Talk about the type of weather you **don’t like**.','Talk about what you do when it is **hot / wet / cold**.','Talk about where you **go** in hot / wet / cold weather.'])
    ]},
    { n:3, parts:[
      PART1,
      part2('BEACH HOLIDAY',
        'A friend is going on a seaside holiday, but she doesn’t like sitting on the beach all day. Talk together about the different things your friend can do at the seaside and say which would be most enjoyable.', '3a'),
      part3('AT WORK',
        'Now, I’d like each of you to talk on your own about something. I’m going to give each of you a photograph of someone at work.',
        'Candidate A, here is your photograph. Please show it to Candidate B, but I’d like you to talk about it. Candidate B, you just listen. I’ll give you your photograph in a moment.',
        'Now, Candidate B, here is your photograph. It also shows someone at work. Please show it to Candidate A and tell us what you can see in the photograph.', '3b', '3c'),
      part4('Your photographs showed people at work. Now, I’d like you to talk together about the type of place where you would like to work and what would be good about it.',
        ['Talk about places where you’d **like** to work.','Talk about what would be **good / bad** about it.','Talk about places where you **wouldn’t** like to work.','Talk about places where your **friends** / members of your **family** work.'])
    ]},
    { n:4, trio:true, parts:[
      PART1,
      (function(){
        const p = part2('PICNIC',
          'A group of friends has prepared a picnic but they aren’t sure where to eat it. Talk together about the different places they can go for a picnic, and then say which would be best.', '4a');
        p.note = 'SUITABLE FOR GROUPS OF THREE AND PAIRS';
        p.blocks[1] = {t:'it', text:'Say to both / all candidates:'};
        p.blocks[4] = {t:'it', text:'Show both/all candidates the picture and repeat the frame.'};
        return p;
      })(),
      { n:3, mins:'3 minutes', title:'HOMES',
        tasks:'Describing people and places; saying where people and things are and what different people are doing.',
        pics:{ A:IMG('4b'), B:IMG('4c'), C:IMG('4d') },
        blocks:[
          {t:'h', text:'Examiner'},
          {t:'it', text:'Say to both / all candidates:'},
          {t:'box', lines:[
            'Now, I’d like each of you to talk on your own about something. I’m going to give each of you a photograph of people in their homes.','',
            'Candidate A, here is your photograph. Please show it to Candidate(s) B (and C), but I’d like you to talk about it. Candidate(s) B (and C), you just listen. I’ll give you your photographs in a moment.','',
            'Candidate A, please tell us what you can see in your photograph.']},
          {t:'pic', seat:'A'},
          {t:'sp', who:'(Candidate A)', italic:true, lines:['Approximately one minute.','If there is a need to intervene, prompts rather than direct questions should be used.','Close Candidate A’s photograph.']},
          {t:'h', text:'Examiner'},
          {t:'box', lines:['Now, Candidate B, here is your photograph. It also shows people in their home. Please show it to Candidate(s) A (and C) and tell us what you can see in the photograph.']},
          {t:'pic', seat:'B'},
          {t:'sp', who:'(Candidate B)', italic:true, lines:['Approximately one minute.','With two candidates, close the photographs before moving to Part 4.']},
          {t:'h', text:'Examiner'},
          {t:'box', lines:['Now, Candidate C, here is your photograph. It also shows people in their home. Please show it to Candidates A and B and tell us what you can see in the photograph.']},
          {t:'pic', seat:'C'},
          {t:'sp', who:'(Candidate C)', italic:true, lines:['Approximately one minute.','Close the photographs before moving to Part 4.']}
        ]},
      (function(){
        const p = part4('Your photographs showed people in their homes. Now, I’d like you to talk together about the things you like to do when you are at home, when you are alone and when you are with other people.',
          ['Talk about the things you like to do at **home**.','Talk about what you like to do **alone / with other people**.','Talk about the **people** you spend time with at home.','Talk about times when you prefer to **go out**.']);
        p.blocks[1] = {t:'it', text:'Say to both / all candidates:'};
        return p;
      })()
    ]}
  ];

  /* ---- Escalas analíticas de Cambridge (bandas 1 · 3 · 5). Las bandas 2 y 4
     «comparten rasgos» de las contiguas; 0 = por debajo de la banda 1.
     Fuente: las escalas públicas de los handbooks de A2 Key, B1 Preliminary,
     B2 First y C1 Advanced. ---- */
  const GV='Grammar and Vocabulary', DM='Discourse Management', PR='Pronunciation', IC='Interactive Communication', GA='Global Achievement';

  const RUBRICS = {
    A2: { exam:'A2 Key', criteria:[GV,PR,IC], global:GA, d:{
      [GV]:{5:'Shows a good degree of control of simple grammatical forms. Uses a range of appropriate vocabulary when talking about everyday situations.',
            3:'Shows sufficient control of simple grammatical forms. Uses appropriate vocabulary to talk about everyday situations.',
            1:'Shows only limited control of a few grammatical forms. Uses a vocabulary of isolated words and phrases.'},
      [PR]:{5:'Is mostly intelligible, and has some control of phonological features at both utterance and word levels.',
            3:'Is mostly intelligible, despite limited control of phonological features.',
            1:'Has very limited control of phonological features and is often unintelligible.'},
      [IC]:{5:'Maintains simple exchanges. Requires very little prompting and support.',
            3:'Maintains simple exchanges, despite some difficulty. Requires prompting and support.',
            1:'Has considerable difficulty maintaining simple exchanges. Requires additional prompting and support.'},
      [GA]:{5:'Handles communication in everyday situations, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.',
            3:'Conveys basic meaning in very familiar everyday situations. Produces utterances which tend to be very short – words or phrases – with frequent hesitation and pauses.',
            1:'Has difficulty conveying basic meaning even in very familiar everyday situations. Responses are limited to short phrases or isolated words with frequent hesitation and pauses.'}
    }},
    B1: { exam:'B1 Preliminary', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]:{5:'Shows a good degree of control of simple grammatical forms, and attempts some complex grammatical forms. Uses a range of appropriate vocabulary to give and exchange views on familiar topics.',
            3:'Shows a good degree of control of simple grammatical forms. Uses a range of appropriate vocabulary when talking about familiar topics.',
            1:'Shows sufficient control of simple grammatical forms. Uses a limited range of appropriate vocabulary to talk about familiar topics.'},
      [DM]:{5:'Produces extended stretches of language despite some hesitation. Contributions are relevant despite some repetition. Uses a range of cohesive devices.',
            3:'Produces responses which are extended beyond short phrases, despite hesitation. Contributions are mostly relevant, but there may be some repetition. Uses basic cohesive devices.',
            1:'Produces responses which are characterised by short phrases and frequent hesitation. Repeats information or digresses from the topic.'},
      [PR]:{5:'Is intelligible. Intonation is generally appropriate. Sentence and word stress is generally accurately placed. Individual sounds are generally articulated clearly.',
            3:'Is mostly intelligible, and has some control of phonological features at both utterance and word levels.',
            1:'Is mostly intelligible, despite limited control of phonological features.'},
      [IC]:{5:'Initiates and responds appropriately. Maintains and develops the interaction and negotiates towards an outcome with very little support.',
            3:'Initiates and responds appropriately. Keeps the interaction going with very little prompting and support.',
            1:'Maintains simple exchanges, despite some difficulty. Requires prompting and support.'},
      [GA]:{5:'Handles communication on familiar topics, despite some hesitation. Organises extended discourse but occasionally produces utterances that lack coherence, and some inaccuracies and inappropriate usage occur.',
            3:'Handles communication in everyday situations, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.',
            1:'Conveys basic meaning in very familiar everyday situations. Produces utterances which tend to be very short – words or phrases – with frequent hesitation and pauses.'}
    }},
    B2: { exam:'B2 First', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]:{5:'Shows a good degree of control of a range of simple and some complex grammatical forms. Uses a range of appropriate vocabulary to give and exchange views on a wide range of familiar topics.',
            3:'Shows a good degree of control of simple grammatical forms, and attempts some complex grammatical forms. Uses a range of appropriate vocabulary to give and exchange views on a range of familiar topics.',
            1:'Shows a good degree of control of simple grammatical forms. Uses a range of appropriate vocabulary when talking about everyday situations.'},
      [DM]:{5:'Produces extended stretches of language with very little hesitation. Contributions are relevant and there is a clear organisation of ideas. Uses a range of cohesive devices and discourse markers.',
            3:'Produces extended stretches of language despite some hesitation. Contributions are relevant and there is very little repetition. Uses a range of cohesive devices.',
            1:'Produces responses which are extended beyond short phrases, despite hesitation. Contributions are mostly relevant, despite some repetition. Uses basic cohesive devices.'},
      [PR]:{5:'Is intelligible. Intonation is appropriate. Sentence and word stress is accurately placed. Individual sounds are articulated clearly.',
            3:'Is intelligible. Intonation is generally appropriate. Sentence and word stress is generally accurately placed. Individual sounds are generally articulated clearly.',
            1:'Is mostly intelligible, and has some control of phonological features at both utterance and word levels.'},
      [IC]:{5:'Initiates and responds appropriately, linking contributions to those of other speakers. Maintains and develops the interaction and negotiates towards an outcome.',
            3:'Initiates and responds appropriately. Maintains and develops the interaction and negotiates towards an outcome with very little support.',
            1:'Initiates and responds appropriately. Keeps the interaction going with very little prompting and support.'},
      [GA]:{5:'Handles communication on a range of familiar topics, with very little hesitation. Uses accurate and appropriate linguistic resources to express ideas and produce extended discourse that is generally coherent.',
            3:'Handles communication on familiar topics, despite some hesitation. Organises extended discourse but occasionally produces utterances that lack coherence, and some inaccuracies and inappropriate usage occur.',
            1:'Handles communication in everyday situations, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.'}
    }},
    C1: { exam:'C1 Advanced', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]:{5:'Grammatical resource: maintains control of a wide range of grammatical forms. Lexical resource: uses a wide range of appropriate vocabulary to give and exchange views on unfamiliar and abstract topics.',
            3:'Grammatical resource: shows a good degree of control of a range of simple and some complex grammatical forms. Lexical resource: uses a range of appropriate vocabulary to give and exchange views on a range of familiar and unfamiliar topics.',
            1:'Grammatical resource: shows a good degree of control of simple grammatical forms, and attempts some complex grammatical forms. Lexical resource: uses a range of appropriate vocabulary to give and exchange views on a range of familiar topics.'},
      [DM]:{5:'Produces extended stretches of language with ease and with very little hesitation. Contributions are relevant, coherent and varied. Uses a wide range of cohesive devices and discourse markers.',
            3:'Produces extended stretches of language with very little hesitation. Contributions are relevant and there is a clear organisation of ideas. Uses a range of cohesive devices and discourse markers.',
            1:'Produces extended stretches of language despite some hesitation. Contributions are relevant and there is very little repetition. Uses a range of cohesive devices.'},
      [PR]:{5:'Is intelligible. Phonological features are used effectively to convey and enhance meaning.',
            3:'Is intelligible. Intonation is appropriate. Sentence and word stress is accurately placed. Individual sounds are articulated clearly.',
            1:'Is intelligible. Intonation is generally appropriate. Sentence and word stress is generally accurately placed. Individual sounds are generally articulated clearly.'},
      [IC]:{5:'Interacts with ease, linking contributions to those of other speakers. Widens the scope of the interaction and negotiates towards an outcome.',
            3:'Initiates and responds appropriately, linking contributions to those of other speakers. Maintains and develops the interaction and negotiates towards an outcome.',
            1:'Initiates and responds appropriately. Maintains and develops the interaction and negotiates towards an outcome with very little support.'},
      [GA]:{5:'Handles communication on a wide range of familiar and unfamiliar topics, with very little hesitation. Uses accurate and appropriate linguistic resources with ease to express complex ideas and concepts and produce extended and coherent discourse.',
            3:'Handles communication on a range of familiar and unfamiliar topics, with very little hesitation. Uses accurate and appropriate linguistic resources to express ideas and produce extended discourse that is generally coherent.',
            1:'Handles communication on familiar topics, despite some hesitation. Organises extended discourse but occasionally produces utterances that lack coherence, and some inaccuracies and inappropriate usage occur.'}
    }}
  };

  /* Texto de una banda cualquiera (0-5) para un criterio de un nivel. */
  function describe(level, crit, band){
    const r = RUBRICS[level]; if(!r || band==null) return '';
    const d = r.d[crit] || {};
    if(band===0) return 'Performance below Band 1.';
    if(band===2) return 'Performance shares features of Bands 1 and 3.';
    if(band===4) return 'Performance shares features of Bands 3 and 5.';
    return d[band] || '';
  }

  /* Del promedio de bandas a la escala del colegio (AD·A·B·C). Banda 3 es lo
     esperado en el nivel (A); 5 es por encima (AD); 2 se acerca (B); 1 no
     llega (C). Umbrales sobre la media de todos los criterios y el global. */
  function letter(mean){
    if(mean==null || isNaN(mean)) return null;
    if(mean>=4)   return 'AD';
    if(mean>=2.5) return 'A';
    if(mean>=1.5) return 'B';
    return 'C';
  }

  return { tests:TESTS, rubrics:RUBRICS, describe, letter,
           LETTERS:{AD:'Outstanding', A:'Expected', B:'In progress', C:'Starting out'} };
})();
