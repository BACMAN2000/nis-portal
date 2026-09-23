/* Speaking test (23-sep-2026): los cuatro guiones del examinador (interlocutor
   frames) del B1 Preliminary / PET, transcritos TAL CUAL del PDF
   «speaking script.pdf» (Frames for the Speaking test, págs. 92-103), y las
   escalas analíticas de Cambridge por nivel (A2 Key · B1 Preliminary ·
   B2 First · C1 Advanced) con los descriptores de las bandas 1, 3 y 5.
   Las láminas (Parte 2: dibujo con ideas; Parte 3: una foto por candidato)
   son las del «Visual material for the Speaking test» del mismo libro
   (Cambridge PET 5, págs. I–VIII), recortadas en speaking-img/pet5-*.jpg;
   el guion las enseña en pantalla en vez de mandar al Student's Book.
   Desde la tarde del 23-sep hay tests propios de cada nivel (A2 Key, B1
   Preliminary 2018, B2 First / for Schools, C1 Advanced / Ready for C1) con
   sus láminas oficiales, más INFO por nivel para el examinador: ver el
   bloque «TESTS POR NIVEL» más abajo. Cada test lleva n (único, es el
   test_no que se guarda), level y name.
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
    { n:1, level:'B1', name:'PET · Test 1 · T-shirt design / People and photos', parts:[
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
    { n:2, level:'B1', name:'PET · Test 2 · Wedding present / Weather', parts:[
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
    { n:3, level:'B1', name:'PET · Test 3 · Beach holiday / At work', parts:[
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
    { n:4, level:'B1', name:'PET · Test 4 · Picnic / Homes (pairs or three)', trio:true, parts:[
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

  /* =====================================================================
     TESTS POR NIVEL (23-sep-2026, tarde). Frames del examinador transcritos
     de los sample papers oficiales de Cambridge y de los tests de Macmillan
     Ready for C1, con sus láminas en speaking-img/:
       A2 Key 2020 sample tests Speaking (Test 1 Eating · Test 2 Holidays)
       B1 Preliminary Speaking Sample Test 2018 (examiner booklet)
       B2 First sample papers 1 y 2 · First for Schools sample papers 1 y 2
       C1 Advanced sample paper 1 · Ready for C1 Mid-course / End-of-course
     Bloques nuevos: {t:'ul', lines} lista con viñetas. En los frames
     oficiales «Place Part N booklet, open at Task X, in front of…» pasa a
     «Show Task X to…»: la lámina está en pantalla.                        */
  const P = (id, label) => ({ id:label||id.toUpperCase(), src:'speaking-img/'+id+'.jpg' });
  const INT = 'Interlocutor';
  const cand = (seat, mins) => ({t:'sp', who:'(Candidate '+seat+')', italic:true, lines:[mins, '…………………………………………………']});
  const cands = mins => ({t:'sp', who:'Candidates', italic:true, lines:[mins, '…………………………………………………']});
  const say = (...lines) => ({t:'sp', who:INT, lines});
  const retrieve = n => ({t:'sp', who:INT, lines:['Thank you. Close the Part '+n+' picture.']});

  /* ---------- A2 Key (2 partes) ---------- */
  function a2part1(topic1, q1, topic2, q2){
    return { n:1, mins:'3–4 minutes', title:null,
      tasks:'Giving personal information; answering questions about familiar topics; a short extended response.',
      blocks:[
        {t:'h', text:'Phase 1'}, {t:'h', text:INT},
        {t:'sp', who:'A/B', lines:['Good morning / afternoon / evening.','Can I have your mark sheets, please?','I’m …………, and this is ……… .']},
        {t:'sp', who:'A', lines:['What’s your name?']},
        {t:'sp', who:'B', lines:['And what’s your name?']},
        {t:'side', left:[
            {who:'B', lines:['B, do you work or are you a student?','Where do you live?','','Thank you.']},
            {who:'A', lines:['A, do you work or are you a student?','Where do you live?','','Thank you.']}],
          right:{title:'Back-up prompts', lines:['Do you work? Do you study? Are you a student?','','Do you live in … (name of district / town etc.)?']}},
        {t:'h', text:'Phase 2'}, {t:'h', text:INT},
        {t:'p', text:'**Now, let’s talk about '+topic1+'.**'},
        {t:'side', plain:true, left:[{who:'', lines:q1.map(x=>x[0])}], right:{title:'Back-up prompts', lines:q1.map(x=>x[1])}},
        {t:'p', text:'**Now, let’s talk about '+topic2+'.**'},
        {t:'side', plain:true, left:[{who:'', lines:q2.map(x=>x[0])}], right:{title:'Back-up prompts', lines:q2.map(x=>x[1])}}
      ]};
  }
  function a2part2(task, topic, question, yn, best, phase2){
    return { n:2, mins:'5–6 minutes', title:topic.toUpperCase(),
      tasks:'Discussing likes, dislikes and giving reasons; a collaborative task about pictures.',
      pic:P(task,'Part 2'),
      blocks:[
        {t:'h', text:'Phase 1'}, {t:'it', text:'3–4 minutes.'},
        say('Now, in this part of the test you are going to talk together.'),
        {t:'it', text:'Show the Part 2 picture to both candidates.'},
        {t:'box', lines:['Here are some pictures that show '+topic+'.','',question+' Say why or why not. I’ll say that again.','',question+' Say why or why not.','','All right? Now, talk together.']},
        {t:'pic'},
        cands('Allow a minimum of 1 minute (maximum of 2 minutes) before moving on to the following questions.'),
        {t:'side', plain:true, left:[{who:'', lines:['Do you think…'].concat(yn.map(x=>'… '+x))}], right:{title:'Interlocutor / Candidates', lines:['Use as appropriate. Ask each candidate at least one question.','','Optional prompt: Why? / Why not? · What do you think?']}},
        say('So, A, '+best+'?', 'And you, B, '+best+'?', 'Thank you.'),
        {t:'it', text:'Close the Part 2 picture.'},
        {t:'h', text:'Phase 2'}, {t:'it', text:'Allow up to 2 minutes.'},
        {t:'ul', lines:phase2},
        {t:'box', small:true, lines:['Thank you. That is the end of the test.']}
      ]};
  }
  const A2_TESTS = [
    { n:13, level:'A2', name:'A2 Key · Test 1 · Eating', parts:[
      a2part1('friends',
        [['A, how often do you see your friends?','Do you see your friends every day?'],['What do you like doing with your friends?','Do you like going to the cinema?'],
         ['B, where do your friends live?','Do your friends live near you?'],['When do you see your friends?','Do you see your friends at weekends?'],
         ['','' ],['**Extended response** · Now A, please tell me something about one of your friends.','Back-up: Do you like your friend? · Where did you meet your friend? · Did you see your friends last weekend?']],
        'home',
        [['B, who do you live with?','Do you live with your family?'],['How many bedrooms are there in your house / flat?','Are there three bedrooms in your house / flat?'],
         ['A, where do you watch TV at home?','Do you watch TV in the kitchen?'],['What’s your favourite room in the house?','Is your bedroom your favourite room?'],
         ['',''],['**Extended response** · Now, B, please tell me something about the things you like doing at home, at the weekends.','Back-up: Do you like cooking at the weekends? · Do you play computer games at the weekends? · What did you do at home, last weekend?']]),
      a2part2('a2t1-p2', 'different places to eat', 'Do you like these different places to eat?',
        ['eating on the beach is fun?','eating in restaurants is expensive?','eating at home is boring?','eating at college/work is cheap?','eating in the park is nice?'],
        'which of these places to eat do you like best',
        ['Now, do you prefer eating with friends or family, B? (Why?)','And what about you, A? (Do you prefer eating with friends or family?) (Why?)','Do you prefer eating at home or in a restaurant, A? (Why?)','And you, B? (Do you prefer eating at home or in a restaurant?) (Why?)'])
    ]},
    { n:14, level:'A2', name:'A2 Key · Test 2 · Holidays', parts:[
      a2part1('music',
        [['A, how often do you listen to music?','Do you listen to music every day?'],['What music do you like best?','Do you like rock music?'],
         ['B, what is your favourite instrument?','Do you like the piano?'],['Where do you like listening to music?','Do you like going to concerts?'],
         ['',''],['**Extended response** · Now A, please tell me something about your favourite singer or group.','Back-up: Where is your favourite singer from? · Why do you like them? · Do your friends like them too?']],
        'shopping',
        [['B, where do you like to go shopping?','Do you like to go to shopping centres?'],['What do you like to buy with your money?','Do you like to buy clothes with your money?'],
         ['A, who do you like to go shopping with?','Do you like to go shopping with your friends?'],['What can you buy near your house?','Can you buy food near your house?'],
         ['',''],['**Extended response** · Now, B, please tell me something about presents you buy for your friends.','Back-up: Where do you buy presents? · Do you like giving presents? · Have you bought a present recently?']]),
      a2part2('a2t2-p2', 'different holidays', 'Do you like these different holidays?',
        ['beach holidays are fun?','city holidays are interesting?','camping holidays are exciting?','walking holidays are expensive?','holidays in the mountain are boring?'],
        'which of these holidays do you like best',
        ['Now, do you prefer to go on holidays with your friends or with your family, B? (Why?)','And what about you, A? (Do you prefer to go on holidays with your friends or with your family?) (Why?)','Which country would you like to visit in the future, A? (Why?)','And you, B? (Which country would you like to visit in the future?) (Why?)'])
    ]}
  ];

  /* ---------- B1 Preliminary, formato 2018 (4 partes) ---------- */
  const B1_2018 = { n:5, level:'B1', name:'B1 Preliminary · Sample test 2018 · Work and relaxation', trio:false, parts:[
    { n:1, mins:'2–3 minutes', title:null, tasks:'Giving personal information; talking about everyday life.',
      blocks:[
        {t:'h', text:'Phase 1'}, {t:'h', text:INT},
        {t:'sp', who:'A/B', lines:['Good morning/afternoon/evening.','Can I have your mark sheets, please?','I’m ………… and this is ………… .']},
        {t:'sp', who:'A', lines:['What’s your name? Where do you live?','Thank you.']},
        {t:'sp', who:'B', lines:['And what’s your name? Where do you live?','Thank you.']},
        {t:'side', left:[
            {who:'B', lines:['B, do you work or are you a student?','What do you do/study?','','Thank you.']},
            {who:'A', lines:['And A, do you work or are you a student?','What do you do/study?','','Thank you.']}],
          right:{title:'Back-up prompts', lines:['Do you have a job? Do you study?','','What job do you do? What subject do you study?']}},
        {t:'h', text:'Phase 2'}, {t:'h', text:INT},
        {t:'it', text:'Select one or more questions from the list to ask each candidate. Ask Candidate A first.'},
        {t:'side', plain:true,
          left:[{who:'', lines:['How do you get to work/school/university every day?','','What did you do yesterday evening/last weekend?','','Do you think that English will be useful for you in the future? (Why/Why not?)','','Tell us about the people you live with.','','Thank you.']}],
          right:{title:'Back-up prompts', lines:['Do you usually travel by car? (Why/Why not?)','','Did you do anything yesterday evening/last weekend? What?','','Will you use English in the future? (Why?/Why not?)','','Do you live with friends/your family?']}}
      ]},
    { n:2, mins:'2–3 minutes', title:'1A LEARNING A LANGUAGE · 1B AT A PARTY', tasks:'Describing a photograph on your own (long turn).',
      pics:{ A:P('b1s-1a','1A'), B:P('b1s-1b','1B') },
      blocks:[
        say('Now I’d like each of you to talk on your own about something. I’m going to give each of you a photograph and I’d like you to talk about it.',
            'A, here is your photograph. It shows **people learning a language**.'),
        {t:'it', text:'Show photograph 1A to Candidate A.'},
        {t:'pic', seat:'A'},
        say('B, you just listen.', 'A, please tell us what you can see in the photograph.'),
        cand('A','approx. 1 minute'),
        {t:'bk', title:'Back-up prompts', lines:['Talk about the people/person.','Talk about the place.','Talk about other things in the photograph.']},
        retrieve(2),
        say('B, here is your photograph. It shows **people at a party**.'),
        {t:'it', text:'Show photograph 1B to Candidate B.'},
        {t:'pic', seat:'B'},
        say('A, you just listen.', 'B, please tell us what you can see in the photograph.'),
        cand('B','approx. 1 minute'),
        {t:'bk', title:'Back-up prompts', lines:['Talk about the people/person.','Talk about the place.','Talk about other things in the photograph.']},
        retrieve(2)
      ]},
    { n:3, mins:'2–3 minutes', title:'WORK AND RELAXATION', tasks:'Discussing alternatives together and making a choice.',
      pic:P('b1s-p3','Part 3'),
      blocks:[
        say('Now, in this part of the test you’re going to talk about something together for about two minutes. I’m going to describe a situation to you.'),
        {t:'it', text:'Show the Part 3 picture to both candidates.'},
        {t:'box', lines:['A young man works very hard, and has only one free day a week. He wants to find an activity to help him relax.','','Here are some activities that could help him relax.','','Talk together about the different activities he could do, and say which would be most relaxing.','','All right? Now, talk together.']},
        {t:'pic'},
        cands('approx. 2–3 minutes'),
        retrieve(3)
      ]},
    { n:4, mins:'3 minutes', title:null, tasks:'Discussing the topic of Part 3 in more depth; giving and justifying opinions.',
      blocks:[
        {t:'it', text:'Use the following questions, as appropriate:'},
        {t:'side', plain:true,
          left:[{who:'', lines:['• What do you do when you want to relax? (Why?)','','• Do you prefer to relax with friends or alone? (Why?)','','• Is it important to do exercise in your free time? (Why?/Why not?)','','• Is it useful to learn new skills in your free time? (Why?/Why not?)','','• Do you think people spend too much time working/studying these days? (Why?/Why not?)']}],
          right:{title:'Select any of the following prompts, as appropriate:', lines:['• How/what about you?','• Do you agree?','• What do you think?']}},
        {t:'box', small:true, lines:['Thank you. That is the end of the test.']}
      ]}
  ]};

  /* ---------- B2 First (4 partes) ---------- */
  function b2part1(categories){
    const blocks=[
      {t:'h', text:INT},
      say('Good morning/afternoon/evening. My name is ………… and this is my colleague ………… .','And your names are?','Can I have your mark sheets, please?','Thank you.'),
      {t:'ul', lines:['Where are you from, (Candidate A)?','And you, (Candidate B)?']},
      say('First we’d like to know something about you.'),
      {t:'it', text:'Select one or more questions from any of the following categories, as appropriate.'}
    ];
    categories.forEach(c=>{ blocks.push({t:'h', text:c[0]}); blocks.push({t:'ul', lines:c[1]}); });
    return { n:1, mins:'2 minutes (3 minutes for groups of three)', title:null, tasks:'Interview: general questions about the candidates.', blocks };
  }
  function b2part2(t1, t2){
    /* t1/t2: {title, show, task, pic, qOther, qOtherWho} — A hace la tarea 1 y B responde; B hace la 2 y A responde. */
    return { n:2, mins:'4 minutes (6 minutes for groups of three)', title:'1 '+t1.title.toUpperCase()+' · 2 '+t2.title.toUpperCase(),
      tasks:'Long turn: comparing two photographs and answering a question about the partner’s photographs.',
      pics:{ A:P(t1.pic,'Task 1'), B:P(t2.pic,'Task 2') },
      blocks:[
        say('In this part of the test, I’m going to give each of you two photographs. I’d like you to talk about your photographs on your own for about a minute, and also to answer a question about your partner’s photographs.',
            '(Candidate A), it’s your turn first. Here are your photographs. They show **'+t1.show+'**.'),
        {t:'it', text:'Show Task 1 to Candidate A.'},
        {t:'pic', seat:'A'},
        say('I’d like you to compare the photographs, and say **'+t1.task+'**.','All right?'),
        cand('A','1 minute'),
        say('Thank you.','(Candidate B), '+t1.qOther),
        cand('B','approximately 30 seconds'),
        retrieve(2),
        say('Now, (Candidate B), here are your photographs. They show **'+t2.show+'**.'),
        {t:'it', text:'Show Task 2 to Candidate B.'},
        {t:'pic', seat:'B'},
        say('I’d like you to compare the photographs, and say **'+t2.task+'**.','All right?'),
        cand('B','1 minute'),
        say('Thank you.','(Candidate A), '+t2.qOther),
        cand('A','approximately 30 seconds'),
        retrieve(2)
      ]};
  }
  function b2part3(title, intro, discuss, decide, pic, c1){
    return { n:3, mins: c1 ? '4 minutes (6 minutes for groups of three)' : '4 minutes (5 minutes for groups of three)', title:title.toUpperCase(),
      tasks:'Collaborative task: discussing the prompts together, then reaching a decision.',
      pic:P(pic,'Task 21'),
      blocks:[
        say('Now, I’d like you to talk about something together for about two minutes (3 minutes for groups of three).',
            intro+' First you have some time to look at the task.'),
        {t:'it', text:'Show Task 21 to the candidates. Allow 15 seconds.'},
        {t:'pic'},
        say('Now, talk to each other about **'+discuss+'**.'),
        cands('2 minutes (3 minutes for groups of three)'),
        say('Thank you. Now you have about a minute'+(c1?' (2 minutes for groups of three)':'')+' to decide **'+decide+'**.'),
        cands('1 minute'+(c1?' (2 minutes for groups of three)':' (for pairs and groups of three)')),
        retrieve(3)
      ]};
  }
  function b2part4(questions, c1){
    return { n:4, mins: c1 ? '5 minutes (8 minutes for groups of three)' : '4 minutes (6 minutes for groups of three)', title:null,
      tasks:'Discussion: developing the topic of Part 3; expressing and justifying opinions.',
      blocks:[
        {t:'it', text:'Use the following questions, in order, as appropriate:'},
        {t:'side', plain:true, left:[{who:'', lines:questions.flatMap(q=>['• '+q,''])}],
          right:{title:'Select any of the following prompts, as appropriate:', lines:['• What do you think?','• Do you agree?', c1?'• How about you?':'• And you?']}},
        {t:'box', small:true, lines:['Thank you. That is the end of the test.']}
      ]};
  }
  const B2_P1_ADULT = [
    ['Likes and dislikes', ['How do you like to spend your evenings? …… (What do you do?) …… (Why?)','Do you prefer to spend time on your own or with other people? …… (Why?)','Tell us about a film you really like.','Do you like cooking? …… (What sort of things do you cook?)']],
    ['Special occasions', ['Do you normally celebrate special occasions with friends or family? …… (Why?)','Tell us about a festival or celebration in (candidate’s country).','What did you do on your last birthday?','Are you going to do anything special this weekend? …… (Where are you going to go?) …… (What are you going to do?)']],
    ['Media', ['How much TV do you watch in a week? …… (Would you prefer to watch more TV than that or less?) …… (Why?)','Tell us about a TV programme you’ve seen recently.','Do you use the internet much? …… (Why? / Why not?)','Do you ever listen to the radio? …… (What programmes do you like?) …… (Why?)']]
  ];
  const B2_P1_SCHOOLS = [
    ['People you know', ['Who are you most like in your family? Tell us about him/her.','Do you have a best friend? …… (What do you like about him/her?)','Who do you spend time with after school? …… (What do you do together?)','Tell us about a good teacher you’ve had.']],
    ['Things you like', ['What’s your favourite subject at school? …… (Why do you like it?)','Do you like reading? …… (What do you like to read?) …… (Why?)','Do you enjoy using the internet in your free time? …… (Why? / Why not?)','Tell us about the things you like doing at the weekend.']],
    ['Places you go to', ['Do you like your school? …… (Why? / Why not?)','Are there any nice places to go in (candidate’s area)? …… (What are they?) …… (Why do you like them?)','Have you been anywhere nice recently? …… (Where did you go?) …… (Why?)','Where would you like to go for your next holiday? …… (Why would you like to go there?)']]
  ];
  const B2_TESTS = [
    { n:6, level:'B2', name:'B2 First · Sample paper 1 · Helping others / Holiday resort', trio:true, parts:[
      b2part1(B2_P1_ADULT),
      b2part2({title:'Helping others', show:'people who are helping other people in different situations', task:'how important it is to help people in these situations', pic:'b2s1-t1', qOther:'do you find it easy to ask for help when you have a problem? …… (Why? / Why not?)'},
              {title:'Gardens', show:'people spending time in different gardens', task:'what you think the people are enjoying about spending time in these gardens', pic:'b2s1-t2', qOther:'which garden would you prefer to spend time in? …… (Why?)'}),
      b2part3('Holiday resort', 'I’d like you to imagine that a town wants more tourists to visit. **Here are some ideas they’re thinking about** and a question for you to discuss.',
              'why these ideas would attract more tourists to the town', 'which idea would be best for the town', 'b2s1-p3'),
      b2part4(['Do you think you have to spend a lot of money to have a good holiday? …… (Why? / Why not?)','Some people say we travel too much these days and shouldn’t go on so many holidays. What do you think?','Do you think people have enough time for holidays these days? …… (Why? / Why not?)','Why do you think people like to go away on holiday?','What do you think is the biggest advantage of living in a place where there are a lot of tourists?','What can people do to have a good holiday in (candidate’s country)? …… (Why?)'])
    ]},
    { n:7, level:'B2', name:'B2 First · Sample paper 2 · Travelling / Keeping fit', trio:true, parts:[
      b2part1(B2_P1_ADULT),
      b2part2({title:'Travelling', show:'people travelling in different situations', task:'why you think the people have decided to travel in these situations', pic:'b2s2-t1', qOther:'do you enjoy travelling by plane? …… (Why? / Why not?)'},
              {title:'Looking at things', show:'people who are looking at things in different situations', task:'why you think the people are looking at these things', pic:'b2s2-t2', qOther:'do you ever go to art galleries or museums? …… (Why? / Why not?)'}),
      b2part3('Keeping fit', '**Here are some things people often do to keep fit and healthy** and a question for you to discuss.',
              'how important these things are for keeping fit and healthy', 'which two are most important for keeping fit in the long term', 'b2s2-p3'),
      b2part4(['What is the advantage of keeping fit with friends?','Some people say it is a waste of time going to a gym because you can exercise outside for free. What do you think?','Is it possible to live healthily without spending a lot of money? …… (Why? / Why not?)','Do you think the government should spend more money on sports and leisure facilities? …… (Why? / Why not?)','Some people say it’s a school’s responsibility to help students keep fit. Do you agree?','Do you think advertising makes people worry too much about keeping fit and how they look? …… (Why? / Why not?)'])
    ]},
    { n:8, level:'B2', name:'B2 First for Schools · Sample paper 1 · Trying to win / After-school classes', trio:true, parts:[
      b2part1(B2_P1_SCHOOLS),
      b2part2({title:'Trying to win', show:'people trying to win in different situations', task:'what you think might be difficult for the people about trying to win in these situations', pic:'b2fs1-t1', qOther:'which sport would you prefer to do? …… (Why?)'},
              {title:'Spending time outside', show:'people spending time outside in different situations', task:'what you think the people are enjoying about spending time outside in these situations', pic:'b2fs1-t2', qOther:'which of these things would you prefer to do? …… (Why?)'}),
      b2part3('After-school classes', 'I’d like you to imagine that a school is going to start some after-school classes to encourage their students to learn new skills. **Here are some ideas for the classes** and a question for you to discuss.',
              'why students might want to learn to do these skills', 'which two would be the easiest to learn to do well', 'b2fs1-p3'),
      b2part4(['Do you think classes like these would be popular with students? …… (Why? / Why not?)','How important do you think it is for people to try new activities? …… (Why?)','Why do you think some people don’t like to try new things?','A lot of people enjoy doing sport after school. Do you think this is a good thing? …… (Why? / Why not?)','What do students enjoy doing after school in (candidate’s country)? …… (Why?)','Do you think it’s better to go out and do things after school or is it better to stay at home? …… (Why?)'])
    ]},
    { n:9, level:'B2', name:'B2 First for Schools · Sample paper 2 · Ways of learning / School trip', trio:true, parts:[
      b2part1(B2_P1_SCHOOLS),
      b2part2({title:'Ways of learning', show:'students learning in different ways', task:'what might be good for the students about learning in these ways', pic:'b2fs2-t1', qOther:'do you prefer learning things on your own or with friends? …… (Why?)'},
              {title:'A day out', show:'friends having a day out together', task:'what the friends are enjoying about their day out', pic:'b2fs2-t2', qOther:'which of these things would you prefer to do on a day out? …… (Why?)'}),
      b2part3('School trip', '**Here are some reasons why many students go on school trips** and a question for you to discuss.',
              'whether it’s a good idea for students to go on school trips', 'which two things are the most important for teachers to think about when they organise school trips for their students', 'b2fs2-p3'),
      b2part4(['Do you think school trips should take place on a school day or at the weekend? …… (Why?)','If you go on a school trip, is it better to visit a city, or go to the countryside? …… (Why?)','What can students do in class after going on a school trip? …… (Why?)','What’s a good place for students to visit in (candidate’s country)? …… (Why?)','What’s the most interesting thing about visiting other countries? …… (Why?)','If you could go anywhere in the world, where would you go? …… (Why?)'])
    ]}
  ];

  /* ---------- C1 Advanced (4 partes; Parte 2 con tres fotos, se comparan dos) ---------- */
  function c1part1(first, more){
    return { n:1, mins:'2 minutes (3 minutes for groups of three)', title:null, tasks:'Interview: general questions about the candidates.',
      blocks:[
        say('Good morning/afternoon/evening. My name is ………… and this is my colleague ………… .','And your names are?','Can I have your mark sheets, please?','Thank you.','First of all, we’d like to know something about you.'),
        {t:'it', text:'Select one or two questions and ask candidates in turn, as appropriate.'},
        {t:'ul', lines:first},
        {t:'it', text:'Select one or more questions from the following, as appropriate.'},
        {t:'ul', lines:more}
      ]};
  }
  function c1part2(t1, t2){
    return { n:2, mins:'4 minutes (6 minutes for groups of three)', title:'1 '+t1.title.toUpperCase()+' · 2 '+t2.title.toUpperCase(),
      tasks:'Long turn: comparing two of three pictures and answering a question about the partner’s pictures.',
      pics:{ A:P(t1.pic,'Task 1'), B:P(t2.pic,'Task 2') },
      blocks:[
        say('In this part of the test, I’m going to give each of you three pictures. I’d like you to talk about **two** of them on your own for about a minute, and also to answer a question briefly about your partner’s pictures.',
            '(Candidate A), it’s your turn first. Here are your pictures. They show **'+t1.show+'**.'),
        {t:'it', text:'Show Task 1 to Candidate A.'},
        {t:'pic', seat:'A'},
        say('I’d like you to compare **two** of the pictures, and say **'+t1.task+'**.','All right?'),
        cand('A','1 minute'),
        say('Thank you.','(Candidate B), '+t1.qOther),
        cand('B','approximately 30 seconds'),
        retrieve(2),
        say('Now, (Candidate B), here are your pictures. They show **'+t2.show+'**.'),
        {t:'it', text:'Show Task 2 to Candidate B.'},
        {t:'pic', seat:'B'},
        say('I’d like you to compare **two** of the pictures, and say **'+t2.task+'**.','All right?'),
        cand('B','1 minute'),
        say('Thank you.','(Candidate A), '+t2.qOther),
        cand('A','approximately 30 seconds'),
        retrieve(2)
      ]};
  }
  const C1_TESTS = [
    { n:10, level:'C1', name:'C1 Advanced · Sample paper 1 · Doing things together / Making decisions', trio:true, parts:[
      c1part1(['Where are you from?','What do you do here/there?','How long have you been studying English?','What do you enjoy most about learning English?'],
              ['What free time activity do you most enjoy? …… (Why?)','What sort of work would you like to do in the future? …… (Why?)','Do you think you spend too much time working or studying? …… (Why? / Why not?)','Do you like using the internet to keep in touch with people?','Have you celebrated anything recently? …… (How?)','If you could travel to one country in the world, where would you go? …… (Why?)','How important is it to you to spend time with your family? …… (Why? / Why not?)','Who do you think has had the greatest influence on your life? …… (Why?)']),
      c1part2({title:'Doing things together', show:'people doing things together', task:'why the people might be doing these things together, and how the people might be feeling', pic:'c1s1-t1', qOther:'in which situation do you think the people benefit most from being together? …… (Why?)'},
              {title:'Student life', show:'students doing different activities', task:'how students can benefit from doing these different activities, and how helpful the activities might be in preparing them for their future lives', pic:'c1s1-t2', qOther:'which of these activities do you think is most useful? …… (Why?)'}),
      b2part3('Making decisions', '**Here are some things that people often have to make decisions about** and a question for you to discuss.',
              'what people might have to consider when making these decisions', 'in which situation it is most important to make the right decision', 'c1s1-p3', true),
      b2part4(['Is it best for people to make decisions on their own or to ask others for advice? …… (Why? / Why not?)','Some people think it is best to plan their lives carefully; others prefer to make spontaneous decisions. What is your opinion? …… (Why? / Why not?)','Why do you think some people find it harder to make decisions than others?','Do you think countries should work together to solve environmental problems? …… (Why? / Why not?)','How do you think young people can be helped to take on responsibilities?','Do you think that people whose jobs involve making important decisions should be highly paid? …… (Why? / Why not?)'], true)
    ]},
    { n:11, level:'C1', name:'Ready for C1 · Mid-course test · Talking to a group / Leaving home', trio:true, parts:[
      c1part1(['Where are you currently living?','Where are you studying/working?','What is your reason for learning English?','Do you speak English in everyday life? …… (Why? / Why not?)'],
              ['Have you watched any good films or TV shows recently?','What did you like most about school when you were a child?','What do you always take with you when you go out?','If you could visit any country in the world, where would you go? …… (Why?)','What does your social life consist of?','How much of an influence has music had on your life?','What do you hope to be doing this time next year?','How much interest do you take in local/national/international news?']),
      c1part2({title:'Talking to a group', show:'people talking to a group', task:'what you think the situation is and what the speaker might be talking about', pic:'c1mid-t1', qOther:'which of the speakers would you most like to be? …… (Why?)'},
              {title:'Challenging activities', show:'people doing challenging activities', task:'what you think is involved in each activity and what personal characteristics are required to do them', pic:'c1mid-t2', qOther:'which of these activities would you most like to do? …… (Why?)'}),
      b2part3('Leaving home', '**Here are some things that might be considered important for young people to have before they leave home** and a question for you to discuss.',
              'how important it is for young people to learn each of these skills before leaving home', 'which of these skills is the most important for young people to learn before leaving home', 'c1mid-p3', true),
      b2part4(['Do you think young people can have problems managing money? …… (Why? / Why not?)','Do you think practical skills for life can or should be taught at school? …… (Why? / Why not?)','Some people say that young people are not encouraged to look after themselves enough when they are growing up. Is this true? If so, why?','How different is life at home from life in the outside world for young people?','What characteristics make it easier for some young people to adapt to life away from home than others?','Do you think young people prefer life away from home compared to life at home? …… (Why? / Why not?)'], true)
    ]},
    { n:12, level:'C1', name:'Ready for C1 · End-of-course test · Spending time alone / Motivation', trio:true, parts:[
      c1part1(['Where are you from?','What do you do?','How long have you been studying English?','What do you enjoy most about studying English? …… (Why?)'],
              ['What are your goals or ambitions at the moment?','Do you prefer to look for information online or in books or magazines? …… (Why?)','What is your earliest memory about?','What kind of job can you imagine yourself doing in the future?','How important do you think it is to make plans for the future?','Who do you spend most of your time with – your family or your friends? …… (Why?)','What do you do when you feel you need to concentrate or focus on something?','Do you ever wish that you had more free time? …… (Why? / Why not?)']),
      c1part2({title:'Spending time alone', show:'people spending time alone', task:'why the people might be spending their time alone, and how the people might be feeling', pic:'c1end-t1', qOther:'in which situation do you think the people benefit most from being alone? …… (Why?)'},
              {title:'Cooperating', show:'people cooperating', task:'why the people are working together and what they hope to achieve', pic:'c1end-t2', qOther:'in which situation is it most necessary to have someone else’s help?'}),
      b2part3('Motivation', '**Here are some things that motivate people** and a question for you to discuss.',
              'why these things might motivate people to do better', 'which thing motivates people most effectively', 'c1end-p3', true),
      b2part4(['What do you think is the best way to help someone who doesn’t seem to have any motivation?','Some people think that teenagers might perform better if they had no exams; others believe that exams are essential for monitoring progress. What is your opinion? …… (Why?)','What motivates people to do voluntary work?','To what extent is competition between people healthy?','Do you think that success is always the result of hard work? …… (Why? / Why not?)','How do you think we can motivate people to stop doing things that are bad for them (e.g. spending too much time online)?'], true)
    ]}
  ];

  /* ---------- Información del examen por nivel (para el examinador) ----------
     B2: de «Ready for First — Ready for Speaking» (Macmillan), págs. 141-144;
     el resto, del formato oficial de cada handbook. */
  const INFO = {
    A2: { about:'A2 Key Speaking: 2 parts, 8–10 minutes, two candidates (occasionally three). Two examiners: the interlocutor asks the questions; the assessor listens and marks.',
      parts:[
        {name:'Part 1 · Interview', time:'3–4 minutes', what:'Phase 1: personal questions (name, where you live, work/study). Phase 2: two topics (e.g. friends, home) with back-up prompts and one extended response per candidate (“Tell me something about…”).'},
        {name:'Part 2 · Collaborative task', time:'5–6 minutes', what:'Phase 1: the candidates talk together about five pictures (“Do you like these…? Say why or why not”), then the interlocutor asks each candidate “Do you think… is fun/expensive…?” and which they like best. Phase 2: two further questions on the topic to each candidate.'}
      ],
      tips:['Keep the pace slow and clear; use the back-up prompts as soon as a candidate hesitates.','In Part 2 allow at least 1 minute (maximum 2) of candidate-to-candidate talk before intervening.','Ask each candidate at least one “Do you think…” question.']},
    B1: { about:'B1 Preliminary Speaking: 4 parts, 12–17 minutes (the 2018 format; the four PET scripts follow the earlier format with a picture in Part 2 and a photo per candidate in Part 3).',
      parts:[
        {name:'Part 1 · Interview', time:'2–3 minutes', what:'Phase 1: name, where you live, work/study. Phase 2: one or more questions from the list to each candidate (daily life, past, future).'},
        {name:'Part 2 · Long turn', time:'2–3 minutes', what:'Each candidate describes a colour photograph on their own for about a minute. Back-up prompts: the people, the place, other things in the photograph.'},
        {name:'Part 3 · Collaborative task', time:'2–3 minutes', what:'A situation and a picture with ideas; the candidates discuss the options together and say which would be best.'},
        {name:'Part 4 · Discussion', time:'3 minutes', what:'Questions on the topic of Part 3 to both candidates; encourage them to respond to each other (“Do you agree?”, “What do you think?”).'}
      ],
      tips:['Prompts rather than direct questions if you need to intervene in the long turn.','Let the candidates run the Part 3 discussion; only step in if it stops.']},
    B2: { about:'B2 First Speaking: 4 parts, 14 minutes (20 minutes for groups of three). Two examiners: the interlocutor conducts the test and asks the questions; the assessor listens and marks. The interlocutor also assesses and contributes to the final mark.',
      parts:[
        {name:'Part 1 · Interview', time:'2 minutes', what:'Questions requiring basic personal information (family and friends, future plans, hobbies, sport, travel, TV and internet, work and study). Candidates are not invited to speak with each other.',
          tips:['Candidates should not use long, pre-prepared answers: they rarely fit the question and sound unnatural.','They should know the vocabulary that describes their own life: “I’m really keen on rock climbing”, “I’d like to study for a degree in aeronautical engineering”, “My mother’s a systems analyst”.']},
        {name:'Part 2 · Long turn', time:'4 minutes', what:'Each candidate has one minute to compare two photographs and answer the question printed above them, then the partner has about 30 seconds to comment on those pictures. No interaction between candidates.',
          tips:['Student A: point out similarities and differences (avoid “I can see…”, which leads to describing instead of comparing); leave time for the printed question; keep speaking until stopped.','Student B: speak for the full 30 seconds, giving reasons and examples.']},
        {name:'Part 3 · Collaborative task', time:'4 minutes', what:'Two minutes to discuss a question with five written prompts, then one minute to try to agree on a decision. They are not expected to cover all five prompts (three or four is fine) and do not lose marks for not agreeing.',
          tips:['Express and justify opinions, ask the partner what they think, agree/disagree/add a comment.','Take turns; do not dominate. In the decision minute, summarise and work towards a decision.']},
        {name:'Part 4 · Further discussion', time:'4 minutes', what:'Further questions related to the Part 3 topic, to each candidate or to both; candidates are encouraged to interact and comment on each other’s answers.',
          tips:['Develop answers with reasons and examples; listen and respond to the partner.']}
      ],
      language:[
        {title:'Comparing the photographs', items:['In both pictures …','One (obvious) similarity/difference is that …','In this picture … whereas/while in the other one …']},
        {title:'Speculating', items:['It might be useful in the future for (work).','He’ll probably have to do it himself one day.','It looks as if they’re enjoying (the sun).','It looks quite (exciting).']},
        {title:'Fillers', items:['Well … Let’s see … What else (can I say)?']},
        {title:'Asking for an opinion', items:['What do you think?','How do you feel about that?','Do you agree (with me on that)?']},
        {title:'Agreeing and disagreeing', items:['I agree with you (up to a point).','I think you’re right/wrong.','I think so, too.','I don’t agree. / I (completely) disagree.','I (really) don’t think so.']},
        {title:'Changing topic and summarising', items:['Let’s talk about … first/next.','Shall we move on to … now?','As we said before …','We both agreed before that …','You made a good point before about …']},
        {title:'Giving an opinion / gathering your thoughts', items:['In my opinion … / Personally, I think that … / To my mind …','I’m not quite sure, but I think …','I haven’t thought about it before, but perhaps …']}
      ],
      tips:['Part 3: show the task, allow 15 seconds of silent reading, then start the two minutes.','Part 4: use the questions in order, as appropriate; use “What do you think?”, “Do you agree?”, “And you?” to bring the partner in.']},
    C1: { about:'C1 Advanced Speaking: 4 parts, 15 minutes (23 minutes for groups of three). Same structure as B2 First, with three pictures in Part 2 (the candidate compares two) and more abstract discussion in Parts 3 and 4.',
      parts:[
        {name:'Part 1 · Interview', time:'2 minutes', what:'General questions, first about where the candidates are from and their English, then one or more from the list.'},
        {name:'Part 2 · Long turn', time:'4 minutes', what:'Each candidate compares two of three pictures for one minute, answering the two questions printed above them; the partner answers a related question for about 30 seconds.'},
        {name:'Part 3 · Collaborative task', time:'4 minutes', what:'Two minutes to discuss five written prompts around a question (15 seconds to read them first), then one minute (two for groups of three) to reach a decision.'},
        {name:'Part 4 · Discussion', time:'5 minutes', what:'Questions that widen the Part 3 topic; candidates should interact, link their contributions to their partner’s and develop abstract ideas.'}
      ],
      tips:['At C1 the marks separate Grammatical and Lexical Resource; here both go under Grammar and Vocabulary.','Expect candidates to widen the scope of the interaction and negotiate towards an outcome (Interactive Communication band 5).']}
  };

  /* ---- Escalas analíticas de Cambridge (bandas 1 · 3 · 5). Las bandas 2 y 4
     «comparten rasgos» de las contiguas; 0 = por debajo de la banda 1.
     Fuente (verificada el 23-sep-2026): «Instructions to Speaking Examiners
     from 2020» (Cambridge, MS_ISE_2020, en CAMBRIDGE_MAIN_SUITE/FCE): la
     escala analítica común (pág. 2) y la Global Achievement Scale de cada
     examen (págs. 43-55). Las escalas son UN continuo: la banda 5 de un
     nivel es la banda 3 del siguiente y la banda 1 del anterior — por eso
     la banda 1 de C1 dice lo mismo que la banda 3 de B2; no es un préstamo.
     En C1 y C2 Cambridge separa Grammatical y Lexical Resource: aquí van
     juntos en «Grammar and Vocabulary» para compartir nombres con el
     corrector del mock (SPEAKING_RUBRICS). ---- */
  const GV='Grammar and Vocabulary', DM='Discourse Management', PR='Pronunciation', IC='Interactive Communication', GA='Global Achievement';

  /* Filas de la escala común, de A1 a C2 (pág. 2 del documento). */
  const ROW = {
    A1: { gv:'Shows only limited control of a few grammatical forms. Uses a vocabulary of isolated words and phrases.',
          dm:null,
          pr:'Has very limited control of phonological features and is often unintelligible.',
          ic:'Has considerable difficulty maintaining simple exchanges. Requires additional prompting and support.' },
    A2: { gv:'Shows sufficient control of simple grammatical forms. Uses appropriate vocabulary to talk about everyday situations.',
          dm:null,
          pr:'Is mostly intelligible, despite limited control of phonological features.',
          ic:'Maintains simple exchanges, despite some difficulty. Requires prompting and support.' },
    B1: { gv:'Shows a good degree of control of simple grammatical forms. Uses a range of appropriate vocabulary when talking about familiar topics.',
          dm:'Produces responses which are extended beyond short phrases, despite hesitation. Contributions are mostly relevant, but there may be some repetition. Uses basic cohesive devices.',
          pr:'Is mostly intelligible, and has some control of phonological features at both utterance and word levels.',
          ic:'Initiates and responds appropriately. Keeps the interaction going with very little prompting and support.' },
    B2: { gv:'Shows a good degree of control of simple grammatical forms, and attempts some complex grammatical forms. Uses appropriate vocabulary to give and exchange views, on a range of familiar topics.',
          dm:'Produces extended stretches of language despite some hesitation. Contributions are relevant and there is very little repetition. Uses a range of cohesive devices.',
          pr:'Is intelligible. Intonation is generally appropriate. Sentence and word stress is generally accurately placed. Individual sounds are generally articulated clearly.',
          ic:'Initiates and responds appropriately. Maintains and develops the interaction and negotiates towards an outcome with very little support.' },
    C1: { gv:'Grammatical resource: shows a good degree of control of a range of simple and complex grammatical forms. Lexical resource: uses a range of appropriate vocabulary to give and exchange views on familiar and unfamiliar topics.',
          dm:'Produces extended stretches of language with very little hesitation. Contributions are relevant and there is a clear organisation of ideas. Uses a range of cohesive devices and discourse markers.',
          pr:'Is intelligible. Intonation is appropriate. Sentence and word stress is accurately placed. Individual sounds are articulated clearly.',
          ic:'Initiates and responds appropriately, linking contributions to those of other speakers. Maintains and develops the interaction and negotiates towards an outcome.' },
    C2: { gv:'Grammatical resource: maintains control of a wide range of grammatical forms. Lexical resource: uses a wide range of appropriate vocabulary to give and exchange views on unfamiliar and abstract topics.',
          dm:'Produces extended stretches of language with ease and with very little hesitation. Contributions are relevant, coherent and varied. Uses a wide range of cohesive devices and discourse markers.',
          pr:'Is intelligible. Phonological features are used effectively to convey and enhance meaning.',
          ic:'Interacts with ease, linking contributions to those of other speakers. Widens the scope of the interaction and negotiates towards an outcome.' }
  };
  /* Banda 5 = fila del nivel superior · 3 = la del nivel · 1 = la del inferior. */
  const scale = (hi, mid, lo, k) => ({ 5:ROW[hi][k], 3:ROW[mid][k], 1:ROW[lo][k] });

  const RUBRICS = {
    A2: { exam:'A2 Key', criteria:[GV,PR,IC], global:GA, d:{
      [GV]: scale('B1','A2','A1','gv'),
      [PR]: scale('B1','A2','A1','pr'),
      [IC]: scale('B1','A2','A1','ic'),
      [GA]:{5:'Handles communication in everyday situations, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.',
            3:'Conveys basic meaning in very familiar everyday situations. Produces utterances which tend to be very short – words or phrases – with frequent hesitation and pauses.',
            1:'Has difficulty conveying basic meaning even in very familiar everyday situations. Responses are limited to short phrases or isolated words with frequent hesitation and pauses.'}
    }},
    B1: { exam:'B1 Preliminary', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]: scale('B2','B1','A2','gv'),
      /* La fila A2 no tiene Discourse Management: la banda 1 de B1 sale del handbook de B1 Preliminary. */
      [DM]:{5:ROW.B2.dm, 3:ROW.B1.dm,
            1:'Produces responses which are characterised by short phrases and frequent hesitation. Repeats information or digresses from the topic.'},
      [PR]: scale('B2','B1','A2','pr'),
      [IC]: scale('B2','B1','A2','ic'),
      [GA]:{5:'Handles communication on familiar topics, despite some hesitation. Organises extended discourse but occasionally produces utterances that lack coherence, and some inaccuracies and inappropriate usage occur.',
            3:'Handles communication on familiar topics, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.',
            1:'Conveys basic meaning on very familiar or highly predictable topics. Produces utterances which tend to be very short – words or phrases – with frequent hesitation and pauses.'}
    }},
    B2: { exam:'B2 First', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]: scale('C1','B2','B1','gv'),
      [DM]: scale('C1','B2','B1','dm'),
      [PR]: scale('C1','B2','B1','pr'),
      [IC]: scale('C1','B2','B1','ic'),
      [GA]:{5:'Handles communication on a range of familiar topics, with very little hesitation. Uses accurate and appropriate linguistic resources to express ideas and produce extended discourse that is generally coherent.',
            3:'Handles communication on familiar topics, despite some hesitation. Organises extended discourse but occasionally produces utterances that lack coherence, and some inaccuracies and inappropriate usage occur.',
            1:'Handles communication on familiar topics, despite hesitation. Constructs longer utterances but is not able to use complex language except in well-rehearsed utterances.'}
    }},
    C1: { exam:'C1 Advanced', criteria:[GV,DM,PR,IC], global:GA, d:{
      [GV]: scale('C2','C1','B2','gv'),
      [DM]: scale('C2','C1','B2','dm'),
      [PR]: scale('C2','C1','B2','pr'),
      [IC]: scale('C2','C1','B2','ic'),
      [GA]:{5:'Handles communication on a wide range of topics, including unfamiliar and abstract ones, with very little hesitation. Uses accurate and appropriate linguistic resources to express complex ideas and concepts and produce extended discourse that is coherent and easy to follow.',
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

  const ALL = A2_TESTS.concat(TESTS, [B1_2018], B2_TESTS, C1_TESTS);
  return { tests:ALL, info:INFO, rubrics:RUBRICS, describe, letter,
           LETTERS:{AD:'Outstanding', A:'Expected', B:'In progress', C:'Starting out'} };
})();
