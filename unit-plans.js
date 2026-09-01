/* Programaciones de unidad — copiadas del planner de Toddle del colegio.
 *
 * Toddle es el planificador oficial de NIS y todos los profesores planifican
 * ahi con la misma plantilla (Understanding by Design): Meaningful Situation
 * y Big question, Assessment criteria o Performance task en formato GRASPS,
 * Teaching Methodology and Sequence, y Authentic evidence. Este archivo NO
 * inventa unidades: recoge lo que el planner ya dice para que el portal lo
 * ejecute con el alumno. Si coordinacion cambia una unidad en Toddle, hay que
 * actualizarla aqui.
 *
 * Forma de cada unidad:
 *   n            numero de unidad
 *   title        titulo tal cual en Toddle
 *   weeks        semanas que dura
 *   bigq         Big question
 *   situation    Meaningful Situation, resumida para el alumno
 *   audience     para quien es el producto (del GRASPS cuando lo hay)
 *   criteria     [{n, text, levels?}] — si trae levels se pinta la rubrica de
 *                cuatro columnas; si no, el criterio va tal cual y el alumno
 *                se situa en C/B/A/AD. No se inventan descriptores.
 *   sequence     [{n, title, desc, give}] — las semanas del planner
 *   words        banco de palabras / puntos de lengua
 *   deliverables [{kind, icon, title, desc, spec, type:'text'|'file', range, checklist}]
 *                lo que el alumno entrega; kind es la clave en unit_submissions
 */
window.UNIT_PLANS = {

  /* ===== PRIMARIA ===== En primaria solo hay U4 planificada; la U5 no existe
     todavia en Toddle, asi que no se ofrece. */
  g2: {
    label: 'Grade 2',
    units: [
{
  cover:{icon:'🍎', from:'#1f5e3a', to:'#63b06a', image:'assets/unit-covers/g2-u4-recipes.png'},
  n:4,
  title:'From Ingredients to Recipes',
  weeks:5,
  bigq:'How can we use English to create and share a nutritious recipe that others can follow?',
  situation:'Food gives us energy to learn, play and grow, and every family cooks following steps. In this unit you explore nutritious food, what people eat every day, and how a recipe is written — until you can write one of your own that somebody else could actually follow.',
  audience:'Whoever cooks your recipe. If they cannot follow your steps, the recipe does not work — that is the test.',
  criteria:[
    {n:1, text:'I name and sort nutritious foods, ingredients and cooking actions.'},
    {n:2, text:'I use the present simple to talk about habits and daily routines.'},
    {n:3, text:'I ask and answer What, Who and Where questions about food and recipes.'},
    {n:4, text:'I follow and understand the steps of a recipe.'},
    {n:5, text:'I use imperative verbs and sequencing words to give clear instructions.'},
    {n:6, text:'I write a recipe with its ingredients, its utensils and its steps.'}
  ],
  sequence:[],
  words:['fruits','vegetables','grains','proteins','drinks','cooking utensils','first','then','after','finally','cut','mix','pour','wash','peel','What','Who','Where'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#129380;', title:'Your recipe',
     desc:'A nutritious recipe with three parts: the ingredients, the utensils you need, and the steps in order.',
     spec:'Ingredients + utensils + steps',
     checklist:[
       {k:'ingr', t:'I list my ingredients', re:'(ingredient|you need|cup|spoon|gram)'},
       {k:'seq', t:'I put the steps in order with first, then, after, finally', re:'(first|then|after|finally|next)'},
       {k:'verbs', t:'I use cooking action words', re:'(cut|mix|pour|wash|peel|add|put|cook|stir)'},
       {k:'healthy', t:'My recipe uses nutritious food', re:'(fruit|vegetable|water|milk|bread|rice|chicken|egg|salad)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Present your recipe',
     desc:'Record yourself reading your recipe out loud, or take a photo of the dish you made.',
     spec:'Speak or show'}
  ]
},

/* --------------------------------------------- 2.o U5 (piloto 2026) */
{
  cover:{icon:'🔦', from:'#7a4a10', to:'#e0a83a'},
  n:5, label:'5 · piloto', pilot:true,
  title:'The Shadow Show',
  weeks:5,
  bigq:'Where does light come from, and what happens when something gets in its way?',
  situation:'Nursery has never had a shadow theatre. You are going to build them one — and, more difficult, teach them how it works. To do that you first have to find out yourself: where energy comes from, what light does when it meets an object, and why a shadow changes size when you move the torch. You ask a question, you guess, you test it, and you count what happens.',
  audience:'The Nursery class. They will sit down in front of your shadow theatre, and if your explanation is too hard for them it does not work — that is the test.',
  client:'Nursery · the little ones of the school',
  reader:{title:'The Thought Task', series:'Oxford Dolphin Readers', term:3, inPortal:false},
  exam:{target:'starters', themes:['Colours','The home','Weather','The world around us'],
        grammar:['present continuous','can / can\u2019t','adjectives','prepositions of place'],
        extra:['light','shadow','energy','sun','heat','wind','torch','bright','dark','bigger','smaller']},
  areas:[{area:'science', level:2},{area:'math', level:2},{area:'art', level:1}],
  criteria:[
    {n:1, text:'Speaking — explain your show to a younger child.',
     levels:{
       C:'I show the puppet but I do not explain anything.',
       B:'I say a few words about the light and the shadow.',
       A:'I explain what happens using the words of the unit, and the little ones understand me.',
       AD:'I answer their questions and I show them again when they do not get it.'}},
    {n:2, text:'Writing — write what you found out.',
     levels:{
       C:'I copy words.',
       B:'I write short sentences with help.',
       A:'I write my question, my guess and what really happened.',
       AD:'I also write WHY I think it happened.'}},
    {n:3, text:'Science — test it properly.',
     levels:{
       C:'I play with the torch.',
       B:'I do the test but I change more than one thing at a time.',
       A:'I change one thing, I keep the rest the same, and I write down what I see.',
       AD:'I repeat the test to check that it gives the same answer.'}}
  ],
  sequence:[
    {n:1,title:'Where light comes from',desc:'The sun, heat and the wind. New words for the things that give us light. Choosing what your show will be about.',
     give:'Your question for the test, and your guess.',
     across:{
       science:'Sources of energy: the sun, heat and the wind. Stating a research question and a prediction.',
       math:'Counting to 999 and the properties of addition, to record what the tests will produce.',
       social:'Equity: boys and girls can do the same jobs — who holds the torch and who narrates rotates.',
       english:'Starters listening: everyday objects and simple actions, and the words for light.'},
     sessions:[
      {s:1,title:'Into the dark room',
       objective:'Notice that without light there is nothing to see.',
       view:[
         'Go into the darkened room. Only one torch. What can you see and what has disappeared?',
         'Turn the torch on and off three times. What comes back each time?',
         'Word wall: light, dark, bright, shadow.',
         'Everyone draws what they saw with the torch on and with it off.'],
       levels:{
         'Support':{task:'Match five pictures with their word: sun, torch, shadow, dark, bright.',
               help:'Pictures with the word underneath.'},
         'Core':{task:'Draw the two moments and label them with three words of the unit.',
               help:'Word bank on the board.'}}},
      {s:2,title:'Where energy comes from',
       objective:'Name the things that give us light and energy.',
       view:[
         'Cards on the floor: things that GIVE light and things that only receive it.',
         'The sun, heat, the wind. Which of the three do we feel today?',
         'The odd one out: the moon. Does it give light or receive it?',
         'Sort your own cards in pairs and explain one to your partner.'],
       levels:{
         'Support':{task:'Sort six cards into GIVES / RECEIVES and finish: "The sun gives us ____."',
               help:'Cards with pictures and the sentence started.'},
         'Core':{task:'Sort your cards and write two sentences with gives and receives.',
               help:'Model: "The torch gives light. The wall receives it."'}}},
      {s:3,title:'Our question for the show',
       objective:'Ask something you can actually test.',
       view:[
         'Three questions on the board. Which one can we answer with a torch?',
         'The rule: we have to be able to look and see the answer.',
         'Each team writes its question: "What happens if I move the torch?"',
         'Guess before testing. Everyone writes their guess and signs it.'],
       levels:{
         'Support':{task:'Choose your question from two options and circle your guess.',
               help:'Two questions and two possible guesses.'},
         'Core':{task:'Write your own question and your guess, saying why you think so.',
               help:'Frame: "I think ____ because ____."'}}}
     ]},
    {n:2,title:'Saying what is happening',desc:'The present continuous, so you can narrate the show while it happens: the shadow is growing, the puppet is walking.',
     give:'Five sentences in the present continuous about your puppet.',
     across:{
       science:'Energy and light in everyday life.',
       math:'Times tables (2, 3, 4, 5 and 10), for counting the repetitions of the test.',
       comunicacion:'La noticia como texto instructivo: dar un paso a la vez, tambien en castellano.',
       english:'Starters speaking: present continuous to narrate what is happening as it happens.'},
     sessions:[
      {s:1,title:'It is happening now',
       objective:'Say what is happening while it happens.',
       view:[
         'One child moves the puppet; everyone else narrates out loud.',
         'On the board: The shadow is growing. The puppet is walking.',
         'Freeze game: when the teacher claps, say what IS happening.',
         'Write down the two best sentences of the class.'],
       levels:{
         'Support':{task:'Complete five sentences with the verb given: The shadow ____ (grow).',
               help:'Verbs in brackets and the -ing ending on the board.'},
         'Core':{task:'Write five sentences of your own about what your puppet is doing.',
               help:'Model: "The shadow is getting bigger."'}}},
      {s:2,title:'The script of the show',
       objective:'Put your sentences in the order of the story.',
       view:[
         'Read three sentences in the wrong order. Does the story work?',
         'Order them together. What has to happen first?',
         'Each team puts its five sentences in order.',
         'Read them out while your partner moves the puppet.'],
       levels:{
         'Support':{task:'Order the five sentences given and copy them out in order.',
               help:'Sentence strips to cut and arrange.'},
         'Core':{task:'Put your five sentences in order and add one at the end.',
               help:'It has to be the ending of the show.'}}},
      {s:3,title:'Saying it out loud',
       objective:'Narrate without reading, looking at the audience.',
       view:[
         'Rehearse in pairs: one moves, one narrates. Then swap.',
         'Rule: eyes on the puppet, not on the paper.',
         'Record one team and listen back. What is understood and what is not?',
         'Say what you will practise at home.'],
       levels:{
         'Support':{task:'Practise your two favourite sentences until you can say them without reading.',
               help:'Your two sentences, in large print.'},
         'Core':{task:'Rehearse the whole narration and mark the sentence that comes out worst.',
               help:'Practise that one twice more.'}}}
     ]},
    {n:3,title:'Testing the shadow',desc:'The experiment: near and far, big and small. Lab rules — we look, we do not touch the bulb.',
     give:'Your results, written and counted.',
     across:{
       science:'Following instructions to carry out an investigation. Laboratory safety: we look, we do not touch.',
       math:'Introduction to division (halves) and combined operations, to split the measurements.',
       english:'Short simple stories: listening for the key action.'},
     sessions:[
      {s:1,title:'Lab rules',
       objective:'Work safely with light and heat.',
       view:[
         'The torch gets hot. We hold it by the handle, always.',
         'Three rules, agreed by the class and written on the board.',
         'What do we do if something falls? We do not pick up glass.',
         'Everyone signs the rules.'],
       levels:{
         'Support':{task:'Circle the safe action in four pictures.',
               help:'Pairs of pictures, one safe and one not.'},
         'Core':{task:'Write the three class rules in your own words.',
               help:'Frame: "We always ____. We never ____."'}}},
      {s:2,title:'Near, far, bigger, smaller',
       objective:'Measure the shadow in three positions.',
       view:[
         'Torch near, in the middle, far. Measure the shadow each time.',
         'Three tries in each position. All of them go in the table.',
         'What changes, and what did we keep the same?',
         'The number that looks wrong stays in. We mark it, we do not rub it out.'],
       levels:{
         'Support':{task:'Complete the results table with your nine measurements.',
               help:'Table drawn, with the three positions.'},
         'Core':{task:'Complete your table and circle the biggest and the smallest shadow.',
               help:'Say in one sentence which position gave which.'}}},
      {s:3,title:'What the numbers say',
       objective:'Read your own results.',
       view:[
         'Look at your table. Where was the shadow biggest?',
         'Bigger and smaller: compare two positions out loud.',
         'Was your guess from last week right? Open it and check.',
         'Being wrong is fine if you can say what really happened.'],
       levels:{
         'Support':{task:'Circle BIGGER or SMALLER in three sentences about your results.',
               help:'Sentences with the two options.'},
         'Core':{task:'Write two sentences comparing two positions, with your numbers.',
               help:'Model: "The shadow is bigger when the torch is near."'}}}
     ]},
    {n:4,title:'Reading about light',desc:'A short text about colours and shadows. Finding the answers inside it, and drawing the bar chart of your results.',
     give:'Your answers and your bar chart.',
     across:{
       science:'Light as a form of energy: colour, shadow and illumination.',
       math:'Statistics: bar charts, horizontal and vertical, and pictographs with a scale up to 10.',
       comunicacion:'Partes de un cuento: principio, nudo y desenlace — la forma de la funcion.',
       english:'Starters reading: friendly letters and descriptions, and brainstorming before writing.'},
     sessions:[
      {s:1,title:'Reading about light',
       objective:'Find the answers inside a text.',
       view:[
         'Read the short text together, stopping at the words we already know.',
         'Underline three words of the unit.',
         'Four questions: what, where, why, how.',
         'Where exactly in the text is each answer? Point to it.'],
       levels:{
         'Support':{task:'Answer the four questions choosing from two options.',
               help:'The text with the answers highlighted.'},
         'Core':{task:'Answer the four questions in full sentences.',
               help:'Point to the line where you found each one.'}}},
      {s:2,title:'Our bar chart',
       objective:'Turn the results into a chart.',
       view:[
         'Count how many measurements went in each group.',
         'One bar per position. The tallest bar is the biggest shadow.',
         'A chart needs a title and a label on each bar.',
         'Compare charts between teams: are they the same?'],
       levels:{
         'Support':{task:'Colour in the bar chart that is already drawn and write its title.',
               help:'Chart with axes and labels ready.'},
         'Core':{task:'Draw your own bar chart with title and labels.',
               help:'Reminder of the three things a chart needs.'}}},
      {s:3,title:'Writing what we found',
       objective:'Write it so a grown-up understands it.',
       view:[
         'Model on the board: an explanation written badly. Fix it together.',
         'Everyone writes their draft in the notebook. Crossings-out allowed.',
         'Read it to your partner: do they understand what you did?',
         'Mark one thing to change tomorrow.'],
       levels:{
         'Support':{task:'Write your explanation with the frame: "My question was… I thought… What happened was…"',
               help:'The three openings printed.'},
         'Core':{task:'Write your explanation including why you think it happened.',
               help:'Use because at least once.'}}}
     ]},
    {n:5,title:'The show for Nursery',desc:'Building the theatre with Art, rehearsing the narration and performing it for the little ones.',
     give:'The show, and your written explanation.',
     across:{
       science:'What the test showed, and why the shadow changes size.',
       math:'Tally charts and reading a picture graph with a scale.',
       social:'Sense of belonging: the little ones are part of the school too.',
       english:'Starters writing: short narratives, present continuous and basic conjunctions.'},
     sessions:[
      {s:1,title:'Building the theatre',
       objective:'Make the thing the little ones will watch.',
       view:[
         'With Art: the frame, the sheet and the puppets.',
         'Test it with the torch. Is the shadow sharp?',
         'Fix what does not work. Move the torch, not the sheet.',
         'Leave it ready for tomorrow.'],
       levels:{
         'Support':{task:'Draw your theatre and label three parts.',
               help:'Labels given.'},
         'Core':{task:'Draw your theatre and write what you had to fix.',
               help:'Frame: "It did not work because… so we…"'}}},
      {s:2,title:'Dress rehearsal',
       objective:'Narrate while you move, without reading.',
       view:[
         'Full run, timed. Two minutes per team.',
         'The audience is the other half of the class, and they may ask.',
         'Feedback: one thing that worked and one to fix.',
         'Second run with the fix.'],
       levels:{
         'Support':{task:'Practise your part until you can do it without the paper.',
               help:'Your sentences in large print.'},
         'Core':{task:'Rehearse and write the one thing you will improve for tomorrow.',
               help:'Be specific.'}}},
      {s:3,title:'The show for Nursery',
       objective:'Explain it to somebody younger than you.',
       view:[
         'Nursery comes in. Two shows so everybody performs.',
         'After the show, one of them asks a question. Answer it.',
         'Back in class: was it easy to explain? What did they not understand?',
         'Finish your written explanation now that you have taught it.'],
       levels:{
         'Support':{task:'Copy your corrected explanation neatly.',
               help:'Your text with the corrections marked.'},
         'Core':{task:'Write the final version and add what a Nursery child asked you.',
               help:'And how you answered.'}}}
     ]}
  ],
  words:['sun','heat','wind','light','energy','shadow','bright','dark','torch','colour','bigger','smaller','near','far','is shining','is moving','is growing','I think','because'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#9728;', title:'What I found out about light',
     desc:'Your question, your guess, what you did and what really happened — written so a Nursery teacher could read it out.',
     spec:'40–60 words', range:[40,60],
     checklist:[
       {k:'question', t:'I write my question', re:'\\?'},
       {k:'guess', t:'I say what I thought would happen', re:'(i think|i thought|will|going to)'},
       {k:'now', t:'I use the present continuous', re:'(is|are) [a-z]+ing'},
       {k:'result', t:'I say what really happened', re:'(bigger|smaller|near|far|happened|saw)'},
       {k:'why', t:'I explain why', re:'because'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127917;', title:'The shadow show',
     desc:'A photo or a short video of your theatre and of the show you gave to Nursery.',
     spec:'Photo or video of the real thing'}
  ]
},

/* --------------------------------------------- 2.o U6 (piloto 2026) */
{
  cover:{icon:'🚗', from:'#12496b', to:'#4aa3c9'},
  n:6, label:'6 · piloto', pilot:true,
  title:'The Ramp Race',
  weeks:6,
  bigq:'What makes things move, and what makes them stop?',
  situation:'At the end-of-year showing there will be a ramp in the hall and a race. Each team builds a vehicle and has to make it go as far as possible — and then explain to whoever is watching why theirs went further. Nothing moves on its own: you push, you pull, and the floor pushes back.',
  audience:'Your families at the closing showing. They will watch the race and ask you why your vehicle won or lost.',
  client:'The families · end-of-year showing',
  reader:{title:null, term:3, inPortal:false, note:'2.o tiene dos libros en inglés para tres trimestres. Esta unidad se queda sin obra: es el hueco del plan lector que hay que resolver para 2027.'},
  exam:{target:'starters', themes:['Toys','Transport','The world around us','School'],
        grammar:['past simple','prepositions of place','there is / there are','and, but, because'],
        extra:['push','pull','fall','fast','slow','smooth','rough','wheel','ramp','further']},
  areas:[{area:'science', level:2},{area:'math', level:2},{area:'art', level:1}],
  criteria:[
    {n:1, text:'Speaking — explain your vehicle to your family.',
     levels:{
       C:'I show it without saying anything.',
       B:'I name the parts.',
       A:'I explain what I did and what happened, using the words of the unit.',
       AD:'I explain why it went further than the other one.'}},
    {n:2, text:'Writing — tell what happened, in order.',
     levels:{
       C:'I write words with no order.',
       B:'I write sentences but they jump about.',
       A:'I use first, then, after that, and I write in the past.',
       AD:'I add why it happened, with because.'}},
    {n:3, text:'Science — make it a fair race.',
     levels:{
       C:'I let it go however.',
       B:'I test it but I change the ramp each time.',
       A:'Same ramp, same starting point, and I measure how far it went.',
       AD:'I test it three times and take the middle result.'}}
  ],
  sequence:[
    {n:1,title:'Push or pull?',desc:'Sorting the movements of the classroom: what we push, what we pull, what falls on its own.',
     give:'Your sorting chart, and your team.',
     across:{
       science:'Motion, forces and gravity: movement produced by pushing and pulling.',
       math:'Counting to 999 and place value, to write down the distances.',
       english:'Starters listening, and the introduction of the past simple.'},
     sessions:[
      {s:1,title:'Push, pull, or neither',
       objective:'Sort the movements of the room.',
       view:[
         'Tour of the classroom: name ten movements out loud.',
         'Push or pull? Two columns on the board.',
         'The odd one: a dropped pencil. Nobody pushed it. So what did?',
         'Word wall: push, pull, fall, fast, slow.'],
       levels:{
         'Support':{task:'Sort eight pictures into PUSH and PULL and circle the one that falls.',
               help:'Pictures with the word underneath.'},
         'Core':{task:'Sort them and write two movements of your own, one push and one pull.',
               help:'Frame: "I push the ____."'}}},
      {s:2,title:'The challenge',
       objective:'Understand what you have to build and for whom.',
       view:[
         'The ramp goes up in the hall. On race day your family will be watching.',
         'Rule: it has to roll, not slide.',
         'Teams and jobs: who builds, who measures, who writes.',
         'First sketch of your vehicle.'],
       levels:{
         'Support':{task:'Draw your vehicle and label three parts.',
               help:'Labels given: wheel, body, front.'},
         'Core':{task:'Draw your vehicle and write what you will use to build it.',
               help:'List of materials.'}}},
      {s:3,title:'What makes it go further',
       objective:'Guess before you build.',
       view:[
         'Two vehicles down the same ramp. Why did one go further?',
         'Smooth and rough: feel both surfaces with your hand.',
         'Everyone writes a guess and signs it.',
         'We will open the guesses in week 3.'],
       levels:{
         'Support':{task:'Circle your guess: it will go further on the SMOOTH / ROUGH floor.',
               help:'Two options and the two words.'},
         'Core':{task:'Write your guess and say why you think so.',
               help:'Frame: "I think ____ because ____."'}}}
     ]},
    {n:2,title:'It happened yesterday',desc:'The past simple, because the race will already have happened when you tell it.',
     give:'Five sentences in the past about your first test.',
     across:{
       science:'What produces movement and what stops it.',
       math:'Addition up to three digits, with and without trading.',
       english:'Starters speaking: simple conversations about what you did.'},
     sessions:[
      {s:1,title:'It happened yesterday',
       objective:'Talk about what you did, in the past.',
       view:[
         'Do the action, then say it in the past: I push → I pushed.',
         'Four verbs on the board with their past: push, pull, move, stop.',
         'Chain game: each child adds one past sentence.',
         'Write the four verbs in your notebook.'],
       levels:{
         'Support':{task:'Complete five sentences with the past given in brackets.',
               help:'The verbs and their past on the board.'},
         'Core':{task:'Write five sentences in the past about something you did today.',
               help:'Use three of the four verbs.'}}},
      {s:2,title:'Numbers we can trust',
       objective:'Write down distances properly.',
       view:[
         'Two children measure the same thing and get different numbers. Why?',
         'Rule: measure from the same starting line, always.',
         'Practise measuring three things in the room.',
         'Everything gets written down, also the odd result.'],
       levels:{
         'Support':{task:'Measure three things and write the numbers in the table.',
               help:'Table ready with the units.'},
         'Core':{task:'Measure three things and write which is longest.',
               help:'Use "longer than".'}}},
      {s:3,title:'First test',
       objective:'Try it and write what happened.',
       view:[
         'First run down the ramp. Measure how far it went.',
         'Immediately, narrate it in the past: "I pushed it and it moved."',
         'Three tries. All of them go in the table.',
         'What would you change before the race?'],
       levels:{
         'Support':{task:'Complete the table with your three tries and circle the best.',
               help:'Table with three rows.'},
         'Core':{task:'Complete your table and write two sentences in the past about the test.',
               help:'Model: "I pushed the car and it moved to the door."'}}}
     ]},
    {n:3,title:'Building it',desc:'The vehicle, with Art. Then the first test on a smooth floor and on a rough one.',
     give:'Your vehicle and your first results.',
     across:{
       science:'Following instructions in an investigation, and laboratory safety.',
       math:'Subtraction up to three digits: the difference between the two surfaces.',
       comunicacion:'Cuentos — borrador: contar en orden lo que paso, tambien en castellano.',
       english:'Past simple in dialogues about what you did today.'},
     sessions:[
      {s:1,title:'Smooth or rough',
       objective:'Test the same vehicle on two surfaces.',
       view:[
         'Same vehicle, same ramp, same push. Only the floor changes.',
         'Three tries on the corridor and three on the mat.',
         'Measure and write. Nothing gets rubbed out.',
         'Open the guesses from week 1. Who was right?'],
       levels:{
         'Support':{task:'Complete the table with the two surfaces and circle the longer one.',
               help:'Table with the two columns.'},
         'Core':{task:'Complete your table and write which surface was better, with the numbers.',
               help:'Frame: "It went ____ cm on the ____ floor."'}}},
      {s:2,title:'Why the floor matters',
       objective:'Explain the result.',
       view:[
         'Rub your hands on the table and on the mat. Which one holds you back?',
         'The word for that: friction, though we can just say the floor holds it back.',
         'So why did the smooth floor win?',
         'Say it out loud before writing it.'],
       levels:{
         'Support':{task:'Circle the right answer in three sentences about your test.',
               help:'Two options each.'},
         'Core':{task:'Write why one floor was better, using because.',
               help:'Model: "It went further because the floor was smooth."'}}},
      {s:3,title:'Fixing the vehicle',
       objective:'Change one thing and test again.',
       view:[
         'Each team changes ONE thing: wheels, weight or the front.',
         'Test again with the same ramp.',
         'Better or worse? Write the new number next to the old one.',
         'Was the change worth it?'],
       levels:{
         'Support':{task:'Write what you changed and the new number.',
               help:'Two boxes: before and after.'},
         'Core':{task:'Write what you changed, the two numbers and whether it was worth it.',
               help:'Use "better than" or "worse than".'}}}
     ]},
    {n:4,title:'Reading a story of movement',desc:'A short story where something moves. Who is in it, where it happens, what happened first.',
     give:'Your answers about the story.',
     across:{
       science:'Effect of the surface on movement. Gravity and falling objects.',
       math:'Counting in 2s, 3s, 4s, 5s and 10s.',
       english:'Starters reading: describing characters, settings and events with details.'},
     sessions:[
      {s:1,title:'A story where something moves',
       objective:'Read and find the order.',
       view:[
         'Read the story aloud, stopping to guess what comes next.',
         'Who is in it, where it happens, what happened.',
         'Four pictures to put in order: first, then, after that, finally.',
         'What would have happened on a rough floor?'],
       levels:{
         'Support':{task:'Order the four pictures and match them with the four order words.',
               help:'Word cards.'},
         'Core':{task:'Retell the story in four sentences using the four order words.',
               help:'Write in the past.'}}},
      {s:2,title:'Describing what you see',
       objective:'Say who, where and how.',
       view:[
         'Describe the character of the story: what is he like?',
         'Describe the place. Three things you can see.',
         'Adjectives on the board: fast, slow, big, small, smooth, rough.',
         'Describe your own vehicle to somebody who cannot see it.'],
       levels:{
         'Support':{task:'Complete the description with the adjectives given.',
               help:'Adjectives in a box.'},
         'Core':{task:'Write four sentences describing your vehicle.',
               help:'At least two adjectives.'}}},
      {s:3,title:'Planning my account',
       objective:'Decide what to tell and in what order.',
       view:[
         'What has to go in: what I built, what I did, what happened, why.',
         'Order them with the four order words.',
         'Plan it in the notebook before writing it.',
         'Read your plan to your partner.'],
       levels:{
         'Support':{task:'Number the four parts in the order you will write them.',
               help:'Parts on cards.'},
         'Core':{task:'Write your plan in four lines, one per part.',
               help:'One line each, no more.'}}}
     ]},
    {n:5,title:'Writing the race',desc:'Your own account of the test: what you built, what you did, what happened on each floor and why.',
     give:'The draft in your notebook.',
     across:{
       science:'Why one surface holds the vehicle back more than the other.',
       math:'Fractions: half the ramp, a quarter of the distance.',
       english:'Starters writing: narratives and graphic organisers to sequence ideas.'},
          sessions:[
      {s:1,title:'Drafting the account',
       objective:'Write it in the past, in order.',
       view:[
         'Model on the board: an account written badly. Fix it together.',
         'Everyone drafts in the notebook. Crossings-out are expected.',
         'Halfway: read your first two sentences to a partner.',
         'Finish the draft.'],
       levels:{
         'Support':{task:'Write your account with the frame: "I built… I pushed… It went… because…"',
               help:'The four openings printed.'},
         'Core':{task:'Write your account in order, in the past, with your real numbers.',
               help:'Two order words and one because.'}}},
      {s:2,title:'Making it better',
       objective:'Improve it with what your partner did not understand.',
       view:[
         'Swap notebooks. Mark what you did not understand.',
         'Three common problems: no order, no numbers, no why.',
         'Correct yours with what was marked.',
         'Read the corrected version out loud.'],
       levels:{
         'Support':{task:'Correct the three things marked in your text.',
               help:'Your text with the marks.'},
         'Core':{task:'Rewrite your account fixing what your partner did not understand.',
               help:'Say what you changed.'}}},
      {s:3,title:'The final version',
       objective:'Leave it ready for your family to read.',
       view:[
         'Last read: capital letters, full stops, and the numbers.',
         'Copy it out neatly for race day.',
         'Practise reading it out loud in twenty seconds.',
         'Leave it with your vehicle.'],
       levels:{
         'Support':{task:'Copy your account neatly and practise reading it.',
               help:'Your corrected text.'},
         'Core':{task:'Produce the final version and rehearse explaining it without reading.',
               help:'Your family will ask you.'}}}
     ]},
    {n:6,title:'Race day',desc:'The final version, the race in the hall and the explanation to the families.',
     give:'The finished text and the race.',
     across:{
       science:'Explaining the result of the race with what you learned about friction.',
       math:'Times tables and combined operations to total the results.',
       social:'Sense of belonging: your family sees what this class built.',
       english:'Friendly letters and narratives: telling it in order, in the past.'},
     sessions:[
      {s:1,title:'Setting up the hall',
       objective:'Get the race ready.',
       view:[
         'Set up the ramp and the measuring line.',
         'Each team announces its vehicle in one sentence.',
         'Rules of the race, agreed: same ramp, same push, three tries.',
         'Last check of the vehicles.'],
       levels:{
         'Support':{task:'Practise your announcement sentence.',
               help:'Frame: "This is ____ and it has ____."'},
         'Core':{task:'Write your announcement and practise saying it clearly.',
               help:'One sentence, no more.'}}},
      {s:2,title:'Race day',
       objective:'Run the race and record the results.',
       view:[
         'The race, measured. Three tries per team.',
         'Every result goes on the big class chart.',
         'Explain to a family why yours went that far.',
         'Answer their question.'],
       levels:{
         'Support':{task:'Write your race result in the table and circle the best try.',
               help:'Table on the wall.'},
         'Core':{task:'Write your result and explain to a family why yours went that far.',
               help:'Use because.'}}},
      {s:3,title:'What we learned',
       objective:'Close the loop.',
       view:[
         'Look at the class chart. Which vehicle won and why?',
         'Was our explanation right?',
         'Add one line to your account with the real race result.',
         'One thing you would do differently.'],
       levels:{
         'Support':{task:'Add the race result to your account and circle if your guess was right.',
               help:'Your text.'},
         'Core':{task:'Add the real result and write what you would do differently next time.',
               help:'Be specific.'}}}
     ]}
  ],
  words:['push','pull','move','stop','fall','fast','slow','smooth','rough','wheel','ramp','pushed','pulled','moved','stopped','further','first','then','after that','because'],
  deliverables:[
    {kind:'story', type:'text', icon:'&#128666;', title:'The story of my vehicle',
     desc:'What you built, what you did to it, how far it went on each floor and why you think that happened.',
     spec:'50–80 words', range:[50,80],
     checklist:[
       {k:'past', t:'I write in the past simple', re:'\\b(pushed|pulled|moved|stopped|was|were|fell|went|built)\\b'},
       {k:'order', t:'I put things in order', re:'(first|then|after that|finally|next)'},
       {k:'why', t:'I explain why', re:'because'},
       {k:'number', t:'I give the real distance', re:'[0-9]+ ?(cm|m|metres|meters)'},
       {k:'words', t:'I use the words of the unit', re:'(push|pull|fast|slow|smooth|rough|wheel|ramp)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127942;', title:'Your vehicle on race day',
     desc:'A photo of the vehicle and of the results chart from the hall.',
     spec:'Photos of the real thing'}
  ]
},
    ]
  },

  g3: {
    label: 'Grade 3',
    units: [
{
  cover:{icon:'🦁', from:'#1d4d3b', to:'#4e9d6b', image:'assets/unit-covers/g3-u4-animals.png'},
  n:4,
  title:'Discovering the Animal Kingdom',
  weeks:6,
  stepWord:'Step',
  bigq:'What makes an animal fit its habitat — and how do we explain that to somebody else?',
  situation:'You explore animals, where they live, who hunts them and who they hunt, and you compare them in English. You get ready for the zoo trip by writing your own interview questions, you interview a zookeeper, and afterwards you tell what happened — first out loud, then in writing.',
  audience:'The class, when you present your habitat. They have to understand your animal without having seen it.',
  criteria:[
    {n:1, text:'Speaking — I use clues like intonation and key words to work out what is meant, I explain what I think and why, I use connectors, and I ask and answer questions about the topic.'},
    {n:2, text:'Reading — I say what the characters do, I use pictures and titles to guess what a text is about, and I back my opinion with a reason or something I already knew.'},
    {n:3, text:'Writing — I know why I am writing and who for, I organise my ideas before I start, I keep them connected and in order (beginning, middle and end), and I support my opinion with a reason.'}
  ],
  sequence:[
    {n:1,title:'Describing animals',desc:'The words you need to say what an animal is like.'},
    {n:2,title:'Comparing them',desc:'Comparative and superlative adjectives: bigger, the fastest, more dangerous.'},
    {n:3,title:'Habitats and ecosystems',desc:'Where animals live, and who eats whom: habitat, predator, prey.'},
    {n:4,title:'Preparing the interview',desc:'Writing the questions you will actually ask the zookeeper.',give:'Your interview questions.'},
    {n:5,title:'The zookeeper interview',desc:'Writing it up with commas and quotation marks, the way dialogue is written.',give:'Your written interview.'},
    {n:6,title:'Telling the trip and presenting',desc:'Recounting the field trip with temporal words, and presenting your interview script.',give:'Your habitat and your presentation.'}
  ],
  words:['habitat','predator','prey','ecosystem','bigger','the fastest','more dangerous','First','Then','After that','What','Why','How'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Your interview script',
     desc:'The questions you asked the zookeeper and the answers you got, written as dialogue.',
     spec:'With commas and quotation marks',
     checklist:[
       {k:'quest', t:'I ask What, Why or How questions', re:'(what|why|how)'},
       {k:'punct', t:'I use quotation marks for what people say', re:'(\\"|\\u201c)'},
       {k:'animal', t:'I use habitat, predator or prey', re:'(habitat|predator|prey)'},
       {k:'compare', t:'I compare two animals', re:'(bigger|smaller|faster|the most|than)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127968;', title:'Your 3D habitat',
     desc:'Photograph or film the diorama your group built — the habitat, the food, the predators, the prey — and present it in English.',
     spec:'Diorama + spoken presentation'}
  ]
},

/* --------------------------------------------- 3.o U5 (piloto 2026) */
{
  cover:{icon:'🪐', from:'#1b2a63', to:'#5566c4'},
  n:5, label:'5 · piloto', pilot:true,
  title:'Our Place in Space',
  weeks:5,
  bigq:'How does the Earth move, and how do you explain it to somebody who has never thought about it?',
  situation:'The Sun rises, the Moon changes shape, the seasons come round. All of it happens because things are moving, and nobody can see it from here. Ancient cultures watched the sky and worked much of it out with no telescope at all. You are going to do the same: observe, build a model that shows one of those movements, and stand next to it at the school exhibition explaining it to whoever stops.',
  audience:'The visitors at the Grade 3 exhibition — families, other classes, teachers. They will not read a report: they will stand in front of your model and listen to you.',
  client:'The Grade 3 exhibition · open to the school',
  reader:{title:'A Shadow on the Park', series:'Oxford Dolphin Readers', term:3, inPortal:false},
  exam:{target:'movers', themes:['The world around us','Time','Work','School'],
        grammar:['present simple vs present continuous','future: will','future: going to','linking words: and, but, because, so'],
        extra:['orbit','rotate','revolve','gravity','solar system','planet','moon phase','tide','mission','telescope']},
  areas:[{area:'science', level:3},{area:'social', level:2},{area:'math', level:1}],
  criteria:[
    {n:1, text:'Explaining — make a visitor understand your model.',
     levels:{
       C:'I point at the model and say the names.',
       B:'I explain what it shows, reading from my card.',
       A:'I explain how it works and why we see what we see, without reading.',
       AD:'I answer the question a visitor asks, even one I had not prepared.'}},
    {n:2, text:'Writing — explain a process so it can be followed.',
     levels:{
       C:'I write facts in no order.',
       B:'I explain it but the steps jump about.',
       A:'I use the present simple and linking words, and the order is clear.',
       AD:'I add a prediction with will or going to and justify it.'}},
    {n:3, text:'Reading — get information out of an informative text.',
     levels:{
       C:'I find single words.',
       B:'I find the main idea with help.',
       A:'I find the main idea and the details, and I use them in my own explanation.',
       AD:'I compare what two sources say about the same thing.'}}
  ],
  sequence:[
    {n:1,title:'What is out there',desc:'The Sun at the centre, the planets, the dwarf planets. Reading an informative text and taking the key words out of it.',
     give:'Your fact file on one body of the solar system.',
     across:{
       science:'Elements of the solar system: the Sun at the centre, planets and dwarf planets.',
       math:'Combined operations, for the distances of the fact file.',
       social:'The Earth as part of the world. The sundial and telling the time by the Sun.',
       english:'Informative text about the planets: main idea and details, and the vocabulary orbit, gravity, rotate.'},
     sessions:[
      {s:1,title:'How far is far',
       objective:'Get a sense of the size of the solar system.',
       view:[
         'The scale rope across the playground. Where does Neptune end up?',
         'The Sun at the centre, and everything turning around it.',
         'Words for the wall: orbit, rotate, revolve, gravity.',
         'Which body will your team take?'],
       levels:{
         'Support':{task:'Label the diagram of the solar system with the names given.',
               help:'Diagram to label.'},
         'Core':{task:'Draw the solar system in order and label the four key words.',
               help:'From memory if you can.'}}},
      {s:2,title:'Reading about your planet',
       objective:'Get information out of an informative text.',
       view:[
         'Read the text about the planets. What kind of text is this?',
         'Main idea first, details afterwards. Where is each?',
         'Underline the words of the unit that appear.',
         'Fill in the fact file of your body.'],
       levels:{
         'Support':{task:'Complete the fact file with the data given: name, size, position, one fact.',
               help:'Text with data highlighted.'},
         'Core':{task:'Write your fact file finding the data yourself and add why it matters.',
               help:'Present simple for what is always true.'}}},
      {s:3,title:'Deciding the model',
       objective:'Choose what your model will show.',
       view:[
         'Three models on the table. What does each one explain?',
         'A model that shows everything shows nothing. Choose ONE movement.',
         'Sketch it: what moves, what stays still.',
         'What will you need to build it?'],
       levels:{
         'Support':{task:'Choose your model from three options and list what you need.',
               help:'Three options and a materials list.'},
         'Core':{task:'Sketch your model and write what movement it will show.',
               help:'One sentence, clear.'}}}
     ]},
    {n:2,title:'Day, night and the seasons',desc:'Rotation and revolution. What always happens, and what is happening right now.',
     give:'Six sentences: three present simple, three present continuous.',
     across:{
       science:'Rotation (day and night) and revolution (the seasons).',
       math:'Fractions: a quarter of a turn, half an orbit.',
       social:'Years, decades, past-present-future, and how ancient cultures read the sky.',
       english:'Present simple versus present continuous: what always happens and what is happening now.'},
     sessions:[
      {s:1,title:'Day and night',
       objective:'Explain rotation with a torch and a globe.',
       view:[
         'Torch and globe: one turn, one day. Where is it night now?',
         'Rotation: the Earth turns on itself.',
         'Everyone tries it with their partner.',
         'Explain it out loud without the globe.'],
       levels:{
         'Support':{task:'Complete three sentences about day and night with the words given.',
               help:'Words in a box.'},
         'Core':{task:'Explain in three sentences why we have day and night.',
               help:'Present simple.'}}},
      {s:2,title:'The seasons',
       objective:'Explain revolution.',
       view:[
         'One lap around the Sun, one year. Why is it not the same all year?',
         'The tilt. Show it with the globe.',
         'Why is it winter here and summer there?',
         'Say it before writing it.'],
       levels:{
         'Support':{task:'Match each season with its picture and complete two sentences.',
               help:'Pictures and sentences.'},
         'Core':{task:'Explain why the seasons change, in three sentences.',
               help:'Use because.'}}},
      {s:3,title:'Always or right now',
       objective:'Tell present simple from present continuous.',
       view:[
         'Two columns: ALWAYS (the Earth rotates) / NOW (the Earth is rotating).',
         'Sort ten sentences between the two.',
         'Write three of each about what you can see.',
         'Trap: which of the two do we use to explain a model?'],
       levels:{
         'Support':{task:'Sort six sentences into ALWAYS / NOW and complete three.',
               help:'Verbs given.'},
         'Core':{task:'Write six sentences of your own, three of each.',
               help:'About rotation and revolution.'}}}
     ]},
    {n:3,title:'The Moon and the tides',desc:'Moon phases and tides. Predicting what will happen next.',
     give:'Your predictions, written with will.',
     across:{
       science:'Moon phases and tides.',
       math:'Reading the tide chart and its numbers.',
       social:'Natural disasters linked to the Earth’s systems, and environmental responsibility.',
       english:'Future with will: making predictions and justifying them.'},
     sessions:[
      {s:1,title:'The Moon changes shape',
       objective:'Understand the phases.',
       view:[
         'Ball and lamp: it is the same Moon, we see it differently.',
         'The eight phases, in order.',
         'What phase is it tonight? Look it up.',
         'Draw the phases in order.'],
       levels:{
         'Support':{task:'Order the phases and label four of them.',
               help:'Phase cards.'},
         'Core':{task:'Draw the phases in order and explain why we see them differently.',
               help:'Because.'}}},
      {s:2,title:'Tides',
       objective:'Connect the Moon with the sea.',
       view:[
         'The Moon pulls the water. Demonstration with the magnet.',
         'The tide chart of the coast. What does it show?',
         'What do you predict for tomorrow?',
         'Predictions signed. We check them at the exhibition.'],
       levels:{
         'Support':{task:'Complete three predictions choosing from the options.',
               help:'Options given.'},
         'Core':{task:'Write three predictions with will and justify one.',
               help:'Frame: "I think that… will… because…"'}}},
      {s:3,title:'Saying what will happen',
       objective:'Use will for predictions.',
       view:[
         'Will for what we think, going to for what we can already see coming.',
         'Ten situations: which of the two?',
         'Write your predictions about your model.',
         'Read one out. Does the class agree?'],
       levels:{
         'Support':{task:'Complete five predictions with will.',
               help:'Sentences started.'},
         'Core':{task:'Write five predictions and mark which are will and which going to.',
               help:'And say why.'}}}
     ]},
    {n:4,title:'Going to space',desc:'Space missions, the jobs behind them and what a mission costs. Planning yours.',
     give:'Your mission plan with its budget.',
     across:{
       science:'Space missions and the basic idea of gravity.',
       math:'The mission budget: adding, comparing and staying under a limit.',
       social:'Jobs in space exploration, and deciding as a team what the mission is for.',
       english:'Going to, and will versus going to. Writing a short informative text.'},
     sessions:[
      {s:1,title:'Who goes to space',
       objective:'Discover the jobs behind a mission.',
       view:[
         'Not only astronauts: engineers, doctors, cooks, programmers.',
         'Which of these jobs would you want?',
         'Every mission needs a team. What is yours?',
         'Assign the jobs in your team.'],
       levels:{
         'Support':{task:'Match five jobs with what they do on a mission.',
               help:'Cards to match.'},
         'Core':{task:'Choose your job and write what you would do on the mission.',
               help:'Three sentences.'}}},
      {s:2,title:'What a mission costs',
       objective:'Plan with a real budget.',
       view:[
         'You have a limit and you cannot go over it.',
         'Prices on the board: rocket, food, fuel, suits.',
         'With Maths: add up and decide what to leave out.',
         'What did you sacrifice, and why?'],
       levels:{
         'Support':{task:'Complete the budget with the prices given and add it up.',
               help:'Additions started.'},
         'Core':{task:'Build your budget and justify two decisions.',
               help:'Because and so.'}}},
      {s:3,title:'Presenting the mission',
       objective:'Explain a plan in one minute.',
       view:[
         'One minute per team. Where, why, who and how much.',
         'The other team may object.',
         'Answer the objection.',
         'Correct your plan with what came up.'],
       levels:{
         'Support':{task:'Present your plan with the four points on your card.',
               help:'Card with the four points.'},
         'Core':{task:'Present your plan and answer one objection.',
               help:'Prepare the likely one.'}}}
     ]},
    {n:5,title:'The exhibition',desc:'Building the model, writing the explanation and rehearsing until it can be said without reading.',
     give:'The model, the explanation and your talk to visitors.',
     across:{
       science:'Designing the model, applying the inquiry process and collecting data.',
       math:'Checking the scale of your model against the real figures.',
       social:'Teamwork norms, public speaking, respectful listening and civic behaviour at the exhibition.',
       english:'Writing an informative explanation with linking words, and rehearsing it out loud.'},
     sessions:[
      {s:1,title:'Building the model',
       objective:'Make it actually move.',
       view:[
         'Assemble it. Rule: it has to move, not just look nice.',
         'Test it. Does it show what you wanted?',
         'Fix what does not work.',
         'Leave it ready to explain.'],
       levels:{
         'Support':{task:'Build your model and label its parts.',
               help:'Labels given.'},
         'Core':{task:'Build your model and write what you had to change.',
               help:'And why.'}}},
      {s:2,title:'Writing the explanation',
       objective:'Explain a process so it can be followed.',
       view:[
         'What it shows, how it works, why we see what we see.',
         'Linking words: first, then, because, so, that is why.',
         'Draft in the notebook.',
         'Read it to a partner: do they understand it?'],
       levels:{
         'Support':{task:'Write your explanation with the frame: "This model shows… It works like this… That is why…"',
               help:'Three openings printed.'},
         'Core':{task:'Write your explanation in your own words with linking words.',
               help:'80–120 words.'}}},
      {s:3,title:'The exhibition',
       objective:'Explain it to a visitor who is not your teacher.',
       view:[
         'Set up the stands. Who welcomes and who explains?',
         'Rehearse in 60 seconds without the card.',
         'The exhibition opens. Take turns.',
         'Note the best question a visitor asked you.'],
       levels:{
         'Support':{task:'Explain your model using your card, and note one question.',
               help:'Your card.'},
         'Core':{task:'Explain without reading and answer a question you had not prepared.',
               help:'Note it down afterwards.'}}}
     ]}
  ],
  words:['orbit','rotate','revolve','gravity','solar system','planet','moon','phase','tide','season','day','night','mission','will','going to','because','so','first','next','that is why'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#127756;', title:'How my model works',
     desc:'What your model shows, how it moves, and why that produces what we see from Earth. Written to be read out to a visitor.',
     spec:'80–120 words', range:[80,120],
     checklist:[
       {k:'what', t:'I say clearly what my model shows', re:'(model|shows|explains)'},
       {k:'present', t:'I use the present simple for what always happens', re:'\\b(rotates|revolves|orbits|takes|happens|moves|goes)\\b'},
       {k:'future', t:'I include a prediction with will or going to', re:'(will|going to)'},
       {k:'link', t:'I link my ideas', re:'(because|so|and|but|then|that is why)'},
       {k:'vocab', t:'I use the words of the unit', re:'(orbit|rotat|revolv|gravity|phase|tide|solar system)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128301;', title:'Your model at the exhibition',
     desc:'A photo of the model and, if you can, a recording of you explaining it to a visitor.',
     spec:'Photo, and audio if possible'}
  ]
},

/* --------------------------------------------- 3.o U6 (piloto 2026) */
{
  cover:{icon:'🎯', from:'#14563e', to:'#4fae7c'},
  n:6, label:'6 · piloto', pilot:true,
  title:'One Thing I Will Do Better',
  weeks:6,
  bigq:'What did I actually get better at this year, and what am I going to do about next year?',
  situation:'A year is long and it is easy to forget how much has changed. This time you are not going to trust your memory: you read about somebody who reached a goal, you track one of your own habits for a week with real numbers, and you use what the data says to set a goal you can actually keep. Then you say it out loud in front of your family, which is what makes it hard to forget.',
  audience:'Your family, at the last meeting of the year. They will hear your goal and they are the ones who will remind you of it in March.',
  client:'Your family · end-of-year meeting',
  reader:{title:'Camouflage', series:'Oxford Dolphin Readers', term:3, inPortal:false},
  exam:{target:'movers', themes:['School','Health','Time','Sports and leisure'],
        grammar:['past simple','future: will','future: going to','conjunctions: but, so, because'],
        extra:['goal','effort','challenge','habit','routine','progress','improve','plan','budget']},
  areas:[{area:'social', level:2},{area:'science', level:2},{area:'math', level:2}],
  criteria:[
    {n:1, text:'Writing — look back with evidence, not with memory.',
     levels:{
       C:'I write that the year was good.',
       B:'I say what I learned, in general.',
       A:'I say what I learned with an example, in the past tense.',
       AD:'I compare where I was in March with where I am now.'}},
    {n:2, text:'Writing — set a goal that can be kept.',
     levels:{
       C:'My goal is "to be better".',
       B:'I have a goal but no plan.',
       A:'A specific goal, with will or going to, and a weekly plan.',
       AD:'My plan starts from what my own habit data showed.'}},
    {n:3, text:'Speaking — say it out loud to your family.',
     levels:{
       C:'I read it looking at the paper.',
       B:'I say it, but very short.',
       A:'I speak for two or three minutes and I explain why it matters to me.',
       AD:'I answer what my family asks me about the plan.'}}
  ],
  sequence:[
    {n:1,title:'Somebody who did it',desc:'Reading about a child who reached a goal: what helped them and what got in the way.',
     give:'Main idea and three supporting details.',
     across:{
       science:'How habits affect performance: sleep, food, study time.',
       math:'Decimals, to read the data you are about to collect.',
       social:'Personal growth and goals. Self-regulation, strengths and areas to improve.',
       english:'Reading narrative nonfiction: a child reaching a goal. Main idea and supporting details.'},
     sessions:[
      {s:1,title:'Somebody who did it',
       objective:'Read about a child who reached a goal.',
       view:[
         'Read the true story, stopping where they nearly gave up.',
         'What did they want, what stopped them, what did they do?',
         'Words: goal, effort, challenge, progress.',
         'Which of the three columns is the hardest in real life?'],
       levels:{
         'Support':{task:'Answer four questions choosing from two options and copy the main idea.',
               help:'Text with key sentences highlighted.'},
         'Core':{task:'Write the main idea in your own words and three details.',
               help:'Frame: "The main idea is… I know because…"'}}},
      {s:2,title:'What is a good goal',
       objective:'Tell a keepable goal from an impossible one.',
       view:[
         'Two goals on the board: one real, one impossible. Which is which?',
         'The rule: if you cannot say when and how often, it is not a goal.',
         'Five goals to judge: keepable or not?',
         'Start thinking about yours.'],
       levels:{
         'Support':{task:'Mark five goals as keepable or not, and say why for one.',
               help:'Goals listed.'},
         'Core':{task:'Rewrite two impossible goals so they become keepable.',
               help:'Add when and how often.'}}},
      {s:3,title:'Choosing my habit',
       objective:'Decide what you will track for a week.',
       view:[
         'What can be counted: hours of sleep, minutes of reading, glasses of water.',
         'It has to be countable, and it has to be yours.',
         'Design your tracking sheet.',
         'First reading, today.'],
       levels:{
         'Support':{task:'Choose your habit from four options and complete the sheet.',
               help:'Four options and the sheet drawn.'},
         'Core':{task:'Choose your habit and design your own sheet.',
               help:'It must have seven days and a unit.'}}}
     ]},
    {n:2,title:'This year I learned',desc:'Looking back at the year and writing it down properly, in the past tense.',
     give:'A 100-word reflection paragraph.',
     across:{
       science:'Tracking one habit for a week: sleep, or reading time.',
       math:'Recording the daily data of your habit.',
       social:'Responsibility in learning, and reviewing the classroom agreements.',
       english:'A 100-word reflection paragraph in the past tense, with linking words.'},
     sessions:[
      {s:1,title:'Looking back at the year',
       objective:'Remember with evidence, not with feeling.',
       view:[
         'Your March notebook next to today’s. What has changed?',
         'Not "I did well": one concrete example.',
         'Past simple: learned, practised, started, managed.',
         'Say your example out loud to a partner.'],
       levels:{
         'Support':{task:'Complete three sentences about the year with the past verbs given.',
               help:'Verbs in a box.'},
         'Core':{task:'Write three things you learned, each with an example.',
               help:'Past simple throughout.'}}},
      {s:2,title:'Writing the reflection',
       objective:'Write 100 words that say something.',
       view:[
         'Two reflections on the board: one empty, one specific. What is the difference?',
         'Linking words: and, because, also, but.',
         'Write your paragraph in the notebook.',
         'Read one out anonymously. What made it good?'],
       levels:{
         'Support':{task:'Complete the paragraph: "This year I learned ____. For example ____. It was hard because ____."',
               help:'Three openings.'},
         'Core':{task:'Write your 100-word paragraph with at least one example.',
               help:'Past simple and linking words.'}}},
      {s:3,title:'Checking my tracking',
       objective:'Make sure the week of data is usable.',
       view:[
         'Show your sheet. Any day missing?',
         'A gap is not a zero. Mark it as a gap.',
         'Are we all measuring the same way?',
         'Finish the week today.'],
       levels:{
         'Support':{task:'Complete the missing days of your sheet and mark the gaps.',
               help:'Your sheet.'},
         'Core':{task:'Complete your sheet and write how you measured, so it could be repeated.',
               help:'Two sentences.'}}}
     ]},
    {n:3,title:'What the data says',desc:'A week tracking one habit. Now the numbers, not the feeling.',
     give:'Your week of data, and what it shows.',
     across:{
       science:'Designing a healthy routine plan to reach the goal.',
       math:'Total, best day and worst day of your week of data.',
       social:'Children’s rights and responsibilities. Autonomy, and saying no to what gets in the way.',
       english:'Describing what the data shows, without exaggerating it.'},
     sessions:[
      {s:1,title:'Reading my week',
       objective:'Look at the data you collected.',
       view:[
         'Everyone brings their week. Nobody hides the bad days.',
         'Total, best day, worst day.',
         'What surprised you?',
         'What would you change if next week had to be better?'],
       levels:{
         'Support':{task:'Complete your table of seven days and circle the best and worst.',
               help:'Table with the days.'},
         'Core':{task:'Complete your table, work out the total and write two things it shows.',
               help:'Frame: "The data shows that…"'}}},
      {s:2,title:'What the numbers do not say',
       objective:'Read data honestly.',
       view:[
         'A very good day does not make a good week.',
         'Average: what is the normal day like for you?',
         'What does your data NOT tell you?',
         'Say one thing your data proves and one it does not.'],
       levels:{
         'Support':{task:'Work out your average and circle whether it is high or low for you.',
               help:'Operation set out.'},
         'Core':{task:'Work out your average and write one thing your data does not tell you.',
               help:'Be honest.'}}},
      {s:3,title:'From the data to the plan',
       objective:'Use the evidence to decide.',
       view:[
         'Design a healthy routine that starts from what your data showed.',
         'If your data says you read on two days, do not plan for seven.',
         'Write your routine.',
         'Test it against a real week.'],
       levels:{
         'Support':{task:'Complete the routine with the options given.',
               help:'Weekly grid.'},
         'Core':{task:'Design your routine starting from your data and say why.',
               help:'Frame: "Because my data shows… I will…"'}}}
     ]},
    {n:4,title:'Next year I will',desc:'Setting the goal. Will and going to, and saying no to what gets in the way.',
     give:'Your goal, written twice: with will and with going to.',
     across:{
       science:'What resources your goal needs.',
       math:'Basic budget planning for a small personal goal.',
       social:'Decision making: what you give up when you choose a goal.',
       english:'Future forms: will and going to, and the difference between them.'},
     sessions:[
      {s:1,title:'Next year I will',
       objective:'Set a goal in the future.',
       view:[
         'Will and going to. They are not the same.',
         'Write yours in both forms.',
         'The test: when and how often?',
         'Swap with a partner: is theirs keepable?'],
       levels:{
         'Support':{task:'Complete: "Next year I will ____. I am going to ____ every ____."',
               help:'Frames and a list of goals.'},
         'Core':{task:'Write your goal in both forms and explain why you chose it.',
               help:'With because.'}}},
      {s:2,title:'Saying no',
       objective:'Recognise what will get in the way.',
       view:[
         'What is going to stop you? Be honest.',
         'Rights and responsibilities: choosing is also giving something up.',
         'Peer pressure: what do you do when your friends say otherwise?',
         'Write the obstacle and what you will do about it.'],
       levels:{
         'Support':{task:'Match three obstacles with three solutions.',
               help:'Cards to match.'},
         'Core':{task:'Write your biggest obstacle and your plan for it.',
               help:'Frame: "When ____, I will ____."'}}},
      {s:3,title:'The routine plan',
       objective:'Turn the goal into a week.',
       view:[
         'A goal with no routine does not survive February.',
         'Design your week: which days, how long.',
         'With Maths: does it fit in a real week?',
         'Test it against your data from week 2.'],
       levels:{
         'Support':{task:'Complete your weekly routine with the options given.',
               help:'Weekly grid.'},
         'Core':{task:'Design your routine plan and check it against your data.',
               help:'Does it fit? If not, change it.'}}}
     ]},
    {n:5,title:'Why it matters',desc:'Opinion writing: why your goal is important, and what you will need for it.',
     give:'Your opinion paragraph and your plan of resources.',
     across:{
       science:'A healthy routine mini poster.',
       math:'What the goal costs in time, and whether it fits in a week.',
       social:'Final reflection: rights and responsibilities in what you set out to do.',
       english:'Opinion writing: why my goal is important, with but, so and because.'},
     sessions:[
      {s:1,title:'Why my goal matters',
       objective:'Give reasons for an opinion.',
       view:[
         'A goal you cannot justify does not last.',
         'But, so and because: three ways to give a reason.',
         'Write why yours matters.',
         'Read the first two sentences out loud.'],
       levels:{
         'Support':{task:'Complete the opinion paragraph with the three conjunctions.',
               help:'Conjunctions placed.'},
         'Core':{task:'Write why your goal matters using the three conjunctions.',
               help:'One paragraph.'}}},
      {s:2,title:'What I will need',
       objective:'Work out what it costs.',
       view:[
         'Time, money, help from somebody. What does yours need?',
         'Basic budget for a small personal goal.',
         'What can you get and what not?',
         'Adjust the plan if it does not fit.'],
       levels:{
         'Support':{task:'Complete the resources list and add up the cost.',
               help:'List and prices.'},
         'Core':{task:'Write what you need and adjust your plan if it does not fit.',
               help:'Say what you adjusted.'}}},
      {s:3,title:'Editing my text',
       objective:'Leave it correct before handing it over.',
       view:[
         'Capital letters, full stops, question marks.',
         'Read it aloud: where do you run out of breath? There goes a full stop.',
         'Correct in pairs.',
         'Copy out the corrected version.'],
       levels:{
         'Support':{task:'Correct the ten mistakes marked in your text.',
               help:'Your text with the marks.'},
         'Core':{task:'Correct your text and explain two of your corrections.',
               help:'Which rule applies.'}}}
     ]},
    {n:6,title:'Saying it to your family',desc:'The final text and the two-to-three-minute presentation at the meeting.',
     give:'The presentation and the finished plan.',
     across:{
       science:'The routine plan, finished and doable.',
       math:'The weekly plan with its real numbers.',
       social:'Oral presentation to the family: two to three minutes, and answering a question.',
       english:'Editing punctuation and capitalisation before handing it over.'},
     sessions:[
      {s:1,title:'Preparing the presentation',
       objective:'Get ready to say it out loud.',
       view:[
         'Two to three minutes. What goes in and what does not?',
         'Structure: what I learned, my goal, my plan, why it matters.',
         'Make your cards, with key words only.',
         'First rehearsal in pairs.'],
       levels:{
         'Support':{task:'Make four cards with the key words of each part.',
               help:'Structure given.'},
         'Core':{task:'Prepare your cards and rehearse the opening without reading.',
               help:'The first fifteen seconds matter most.'}}},
      {s:2,title:'Rehearsing',
       objective:'Say it without reading, looking up.',
       view:[
         'Timed rehearsal. Over three minutes, cut.',
         'Your partner asks you one question. Answer it.',
         'Mark the part that comes out worst.',
         'Rehearse that part twice more.'],
       levels:{
         'Support':{task:'Rehearse with your cards and mark the hardest part.',
               help:'Your cards.'},
         'Core':{task:'Rehearse and prepare an answer to the likely question.',
               help:'Which one will your family ask?'}}},
      {s:3,title:'The family meeting',
       objective:'Present your goal to the people who will remind you of it.',
       view:[
         'Families come in. Each student presents.',
         'The family asks one question. Answer it.',
         'The plan stays with them.',
         'Back in class: how did it go, and what would you change?'],
       levels:{
         'Support':{task:'Present using your cards and hand over your plan.',
               help:'Your cards and your plan.'},
         'Core':{task:'Present without reading, answer the question and note what you would change.',
               help:'Be specific.'}}}
     ]}
  ],
  words:['goal','effort','challenge','habit','routine','progress','improve','plan','learned','practised','will','going to','but','so','because','every','I think'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'This year I learned, next year I will',
     desc:'Two paragraphs: what you learned this year with a real example, and what you are going to do next year, why it matters and what your data says.',
     spec:'about 100 words each', range:[150,260],
     checklist:[
       {k:'past', t:'I write about this year in the past', re:'\\b(learned|learnt|practised|practiced|was|were|got|started|managed|finished)\\b'},
       {k:'future', t:'I write about next year with will or going to', re:'(will|going to)'},
       {k:'conj', t:'I use but, so and because', re:'(but|so|because)'},
       {k:'data', t:'I mention what my week of tracking showed', re:'(week|days|hours|minutes|times|tracked|every day|the data)'},
       {k:'when', t:'My goal says when and how often', re:'(every|each|twice|once|daily|weekly|monday|morning)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Your goal, said out loud',
     desc:'Two or three minutes explaining your goal and your plan to your family. Record it or upload your mini poster.',
     spec:'2–3 minutes'}
  ]
},
    ]
  },

  /* 4.o: el planner tiene la situacion y el producto, pero los criterios y la
     secuencia estan sin rellenar en Toddle. Se muestra lo que hay. */
  g4: {
    label: 'Grade 4',
    units: [
{
  cover:{icon:'🏜', from:'#8a5a1e', to:'#d9a441', image:'assets/unit-covers/g4-u4-ica.png'},
  n:4,
  title:'Your Guide to Exploring Ica',
  weeks:5,
  bigq:'How can we create a guide that helps future fourth graders prepare for and enjoy their study trip to Ica?',
  situation:'Every year fourth grade travels to Ica to discover Peru’s geography, history and culture. For many of you it is the first school trip outside Lima, and the first without your parents — so you arrive with questions: what do I pack, what will we do, how do I stay safe? The answers you find become the guide for whoever travels next.',
  audience:'The fourth graders who will travel next year. They will actually use your guide — which is why it has to be clear.',
  criteria:[],
  sequence:[],
  words:['instructions','information','opinion','recommend','pack','safety','geography','history','culture','observe','first','then','finally'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128220;', title:'Your section of the guide',
     desc:'Three kinds of text in one: instructions so they can get ready and travel responsibly, information about the places you visited, and your opinion recommending what you enjoyed most.',
     spec:'Instructions + information + opinion',
     checklist:[
       {k:'instr', t:'I give instructions they can follow', re:'(first|then|after that|finally|remember to|do not forget)'},
       {k:'info', t:'I describe a real place from the trip', re:'(huacachina|nazca|ica|dunes|oasis|museum|desert|lines)'},
       {k:'opinion', t:'I recommend something and say why', re:'(i recommend|my favourite|i loved|because|the best)'},
       {k:'audience', t:'I write to next year’s students, not to my teacher', re:'(you |your )'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128247;', title:'Photos and your talk',
     desc:'Add the photos or drawings of the places, and record yourself telling them what they cannot miss.',
     spec:'Photos + spoken recommendation'}
  ]
},

/* --------------------------------------------- 4.o U5 (piloto 2026) */
{
  cover:{icon:'⚙️', from:'#5a2f6b', to:'#a473c4'},
  n:5, label:'5 · piloto', pilot:true,
  title:'The Fair Test Challenge',
  weeks:5,
  bigq:'What makes an object move the way it does — and how do you measure it well enough to prove it?',
  situation:'A ball rolls further on the corridor than on the grass. Everybody knows that. Proving it is another matter: it needs a fair test, a ruler and numbers with decimals. Grade 5 is going to repeat your investigation next month, so your write-up has to be good enough for them to get the same answer without you there to explain it.',
  audience:'Grade 5. They will repeat your test from your instructions. If your measurements are sloppy or your method is vague, their results will not match yours — and that is how you find out.',
  client:'Grade 5 · they repeat your investigation',
  reader:{title:'Nasreddin Ten Stories', series:'Vicens Vives', term:3, inPortal:false},
  exam:{target:'movers', themes:['The world around us','Transport','Sports and leisure','Materials'],
        grammar:['comparatives and superlatives','past simple','adverbs of manner','linking words: because, therefore, since, for example'],
        extra:['force','friction','gravity','push','pull','distance','measure','decimal','average','fair test']},
  areas:[{area:'science', level:2},{area:'math', level:2},{area:'social', level:1}],
  criteria:[
    {n:1, text:'Method — write it so somebody else can repeat it.',
     levels:{
       C:'I say what I did in general terms.',
       B:'I explain the steps but I leave out what stayed the same.',
       A:'Steps in order, with what changed and what was kept the same.',
       AD:'Somebody who was not there repeats it and gets my result.'}},
    {n:2, text:'Measuring — use decimals properly.',
     levels:{
       C:'I write round numbers with no unit.',
       B:'I measure but I only write down the good attempts.',
       A:'I record every attempt with its decimal and its unit.',
       AD:'I take the average and say which reading looks wrong and why.'}},
    {n:3, text:'Comparing — say what the numbers mean.',
     levels:{
       C:'I say one went further.',
       B:'I compare the two with a comparative.',
       A:'I compare with figures and explain the result with because.',
       AD:'I say what my test does NOT prove.'}},
    {n:4, text:'Writing — an informative text that actually informs.',
     levels:{
       C:'I write what happened with no structure.',
       B:'I introduce the topic but the information is not grouped.',
       A:'I introduce the topic, group the information and link it with because, therefore, since, for example.',
       AD:'I close with a conclusion that says what the reader should take away.'}},
    {n:5, text:'Sources — know where your information comes from.',
     levels:{
       C:'I do not say where the data came from.',
       B:'I say we measured it, or that I read it somewhere.',
       A:'I tell a primary source from a secondary one and I say which is which.',
       AD:'I explain why one source is more reliable than another for this claim.'}}
  ],
  sequence:[
    {n:1,title:'What is a force?',desc:'Pushes, pulls and the forces you cannot see. Choosing what you will investigate.',
     give:'Your research question and your prediction.',
     across:{
       science:'Pushes, pulls and the forces you cannot see. Choosing the force to investigate.',
       math:'Improper fractions and mixed numbers: reading the measurements you are about to take.',
       english:'Expository text: how an informative text is built, and the question that opens it.',
       social:'Inventions in the history of mankind: which ones tamed a force (the wheel, the pulley, the lever).'},
     sessions:[
      {s:1,title:'The forces in this room',
       objective:'Name the forces that move things.',
       view:[
         'Ten movements around the room: which force is behind each one?',
         'Pushes and pulls, and the two you cannot see: friction and gravity.',
         'Demonstration with the ramp: what holds the ball back?',
         'Words for the wall: force, friction, gravity, distance.'],
       levels:{
         'Support':{task:'Match five movements with their force and label the diagram.',
               help:'Diagram and word cards.'},
         'Core':{task:'Sort ten movements by force and explain the two invisible ones.',
               help:'Frame: "Friction is the force that…"'}}},
      {s:2,title:'What Grade 5 will need',
       objective:'Understand who the report is for.',
       view:[
         'Grade 5 repeats your investigation next month, without you there.',
         'Read a badly written method and try to follow it. What is missing?',
         'That is exactly what your report must not do.',
         'What would they need to know?'],
       levels:{
         'Support':{task:'Mark the three things missing from the method you were given.',
               help:'Method with the gaps.'},
         'Core':{task:'Write the three things a report needs so somebody can repeat it.',
               help:'From what you could not follow.'}}},
      {s:3,title:'Our question and our prediction',
       objective:'Ask something measurable and commit to an answer.',
       view:[
         'Six questions: which can be measured with a ramp and a ruler?',
         'The rule: a number has to come out at the end.',
         'Each team writes its question and its prediction.',
         'Signed and dated. We open them in week 4.'],
       levels:{
         'Support':{task:'Choose your question from three options and write your prediction.',
               help:'Frame: "I predict that… because…"'},
         'Core':{task:'Write your own question and justify your prediction.',
               help:'Say what changes and what stays the same.'}}}
     ]},
    {n:2,title:'Designing a fair test',desc:'Friction and gravity. One thing changes, everything else stays the same.',
     give:'Your test design, with what stays fixed.',
     across:{
       science:'Friction and gravity. Designing a fair test.',
       math:'Decimals: reading and writing to three places, so the design says what will be measured.',
       english:'Linking words to explain a method: because, therefore, since, for example.',
       social:'Historical sources: what a source is, and why an invention is documented before it is believed.'},
     sessions:[
      {s:1,title:'What makes a test fair',
       objective:'Spot an unfair test.',
       view:[
         'An unfair test done on purpose. Find the four mistakes.',
         'One thing changes, everything else stays the same.',
         'Two columns: what I change / what I keep the same.',
         'Which of the two is the longer list? It should be.'],
       levels:{
         'Support':{task:'Mark the four mistakes in the test and complete the two columns.',
               help:'Test described and columns started.'},
         'Core':{task:'Explain why the test was unfair and write your two columns.',
               help:'At least three things kept the same.'}}},
      {s:2,title:'Designing ours',
       objective:'Write a plan somebody else could follow.',
       view:[
         'What, where, when, how many tries, with what instrument.',
         'Anything vague gets a red mark.',
         'Write your design in the notebook.',
         'How many tries are enough? Decide and justify.'],
       levels:{
         'Support':{task:'Complete the design table: what changes, what stays, what I measure.',
               help:'Table with examples.'},
         'Core':{task:'Write your design and say why you keep three things the same.',
               help:'Each one with its reason.'}}},
      {s:3,title:'The design under attack',
       objective:'Fix it before it meets the floor.',
       view:[
         'Swap designs. Find three holes in the other team’s.',
         'Read out the best hole. Fatal or fixable?',
         'Correct yours.',
         'Hand in the corrected design.'],
       levels:{
         'Support':{task:'Mark three problems in the design you received and fix one in yours.',
               help:'Checklist of common problems.'},
         'Core':{task:'Write the critique you gave and the change you made.',
               help:'Frame: "They pointed out… so now we…"'}}}
     ]},
    {n:3,title:'Measuring properly',desc:'Running the test and recording distances with decimals. Comparing and ordering the results.',
     give:'Your table of measurements, complete.',
     across:{
       science:'Running the test with the protocol agreed.',
       math:'Comparing and ordering decimals; rounding to one place.',
       english:'Inflected endings -ed and -ing: what I measured, what was moving.',
       social:'Primary and secondary sources: what we measured ourselves and what we were told.'},
     sessions:[
      {s:1,title:'Measuring with decimals',
       objective:'Read and write numbers to two places.',
       view:[
         'Two children measure the same thing and disagree. Why?',
         'Decimals: read, write and compare to two places.',
         'Practise with five real measurements.',
         'The unit always goes with the number.'],
       levels:{
         'Support':{task:'Write five measurements with their unit and order them.',
               help:'Measurements given.'},
         'Core':{task:'Measure five things and order them from smallest to largest.',
               help:'Two decimal places.'}}},
      {s:2,title:'Running the test',
       objective:'Take the data of the investigation.',
       view:[
         'Same ramp, same starting line, same push. Three tries per surface.',
         'Everything goes in the table, including the odd one.',
         'Roles: who releases, who measures, who writes.',
         'Nothing gets rubbed out.'],
       levels:{
         'Support':{task:'Complete the table with your six measurements.',
               help:'Table with units.'},
         'Core':{task:'Complete your table and note the conditions of each try.',
               help:'Which surface, which try.'}}},
      {s:3,title:'Cleaning the data',
       objective:'Deal with the reading that does not fit.',
       view:[
         'Look at your table. Is there a number that does not fit?',
         'An outlier is investigated, not deleted. What happened in that try?',
         'Average of the three tries per surface.',
         'Which number will go in the report?'],
       levels:{
         'Support':{task:'Circle the odd reading and work out the average of each surface.',
               help:'Operations set out.'},
         'Core':{task:'Work out the averages and explain what happened in the odd try.',
               help:'And whether you keep it.'}}}
     ]},
    {n:4,title:'What the numbers say',desc:'Adding and subtracting your decimals, finding the difference, saying which went furthest — and whether your prediction was right.',
     give:'Your comparison, written in sentences.',
     across:{
       science:'What the result means and whether the prediction held.',
       math:'Adding and subtracting decimals: the exact difference between the two surfaces.',
       english:'Comparatives and superlatives, and homophones that trip you up in a report (their/there, its/it’s).',
       social:'Identifying reliable sources: which of the ones you found would you cite, and why.'},
     sessions:[
      {s:1,title:'The exact difference',
       objective:'Subtract to say how much more.',
       view:[
         'Not "a lot": how many centimetres exactly?',
         'Adding and subtracting decimals with your data.',
         'Work out the difference between the two surfaces.',
         'Check it with your partner.'],
       levels:{
         'Support':{task:'Work out the difference between your two averages.',
               help:'Subtraction set out.'},
         'Core':{task:'Work out the difference and express it also as a comparison.',
               help:'"It went ____ cm further."'}}},
      {s:2,title:'Saying it with comparatives',
       objective:'Compare properly.',
       view:[
         'Further, furthest, faster, fastest. Which for two, which for three?',
         'Ten sentences to correct.',
         'Write four comparing your results.',
         'Every comparison needs its number.'],
       levels:{
         'Support':{task:'Complete four sentences with the comparative and your numbers.',
               help:'Sentences started.'},
         'Core':{task:'Write four comparisons of your own with the exact figures.',
               help:'Use than at least twice.'}}},
      {s:3,title:'Was the prediction right',
       objective:'Open week 1 and check.',
       view:[
         'Open your prediction. Were you right?',
         'Being wrong is a result, as long as you explain it.',
         'Why do you think it came out that way?',
         'Write your conclusion in two sentences.'],
       levels:{
         'Support':{task:'Circle whether your prediction was right and complete the conclusion.',
               help:'Frame given.'},
         'Core':{task:'Write your conclusion explaining the result with because.',
               help:'Two or three sentences.'}}}
     ]},
    {n:5,title:'The write-up for Grade 5',desc:'The full report: question, method, results, conclusion — written so another class can repeat it.',
     give:'The finished investigation report.',
     across:{
       science:'The conclusion, and what the test does not prove.',
       math:'Multiplying and dividing decimals; equations to express the relationship you found.',
       english:'Informative/explanatory text: introduce the topic, group the information, use linking words and close it.',
       social:'Your report becomes a source for Grade 5: what makes a source usable by somebody else.'},
     sessions:[
      {s:1,title:'Structuring the report',
       objective:'Learn the shape of an informative text.',
       view:[
         'Four parts: question, method, results, conclusion.',
         'Introduce the topic, group the information, link it, close it.',
         'Linking words: because, therefore, since, for example.',
         'Plan your report in four lines.'],
       levels:{
         'Support':{task:'Number the four parts in order and write one line for each.',
               help:'Parts on cards.'},
         'Core':{task:'Plan your report in four lines and choose your linking words.',
               help:'One per part.'}}},
      {s:2,title:'Drafting it',
       objective:'Write it by hand, for Grade 5.',
       view:[
         'Draft in the notebook. Crossings-out expected.',
         'Halfway: read your method to a partner. Could they follow it?',
         'Fix what they could not.',
         'Finish the draft.'],
       levels:{
         'Support':{task:'Write your report with the four headings given.',
               help:'Headings with a starter line.'},
         'Core':{task:'Write your report so another class could repeat it.',
               help:'120–160 words, with your table.'}}},
      {s:3,title:'The test of the report',
       objective:'Give it to somebody who was not there.',
       view:[
         'Swap reports and try to follow the other one, literally.',
         'Mark every point where you had to guess.',
         'Correct yours with what they marked.',
         'Hand it in. Grade 5 gets it next month.'],
       levels:{
         'Support':{task:'Correct the three points marked in your report.',
               help:'Your report with the marks.'},
         'Core':{task:'Rewrite what could not be followed and say what you clarified.',
               help:'Be specific.'}}}
     ]}
  ],
  words:['force','friction','gravity','push','pull','distance','measure','decimal','average','fair test','further','furthest','faster','fastest','than','because','so','carefully','exactly'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128207;', title:'Investigation report',
     desc:'Your question, your prediction, what you did, your measurements and what you concluded — written for Grade 5 to repeat it.',
     spec:'120–160 words', range:[120,160],
     checklist:[
       {k:'question', t:'I state my research question', re:'\\?'},
       {k:'method', t:'Somebody else could repeat what I did', re:'(i measured|we measured|i rolled|i placed|each time|three times|same)'},
       {k:'numbers', t:'My measurements have decimals and units', re:'[0-9]+\\.[0-9]'},
       {k:'compare', t:'I compare with comparatives and the real difference', re:'(further|furthest|faster|fastest|longer|longest|than|more)'},
       {k:'why', t:'I explain the result', re:'(because|so|this shows|this means)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128202;', title:'Your results table',
     desc:'A photo of the table from your notebook, with every reading — not only the good ones.',
     spec:'Photo of the notebook page'}
  ]
},

/* --------------------------------------------- 4.o U6 (piloto 2026) */
{
  cover:{icon:'🌍', from:'#0f5b52', to:'#4bb3a2'},
  n:6, label:'6 · piloto', pilot:true,
  title:'Where Our Water Comes From',
  weeks:6,
  bigq:'Where does our water come from, and what would happen if we used it as though it would never run out?',
  situation:'Water goes round: it evaporates, it forms clouds, it falls, it runs to the sea and starts again. On the way it becomes something we use — and something that can run out. You read Incredible Earth, you measure the weather yourself for two weeks, and you build the guide that will hang in the corridor: the one that tells the whole school where our water comes from and what it costs.',
  audience:'The whole school, in the corridor. People walk past — they do not sit down to read. It has to work in thirty seconds.',
  client:'The school · the guide goes up on the corridor wall',
  reader:{title:'Incredible Earth', series:'Oxford Dolphin Readers', term:3, inPortal:false,
          note:'Encaja de lleno con la unidad: recursos naturales, ciclo del agua y clima.'},
  exam:{target:'movers', themes:['The world around us','Weather','Materials','The home'],
        grammar:['present simple for processes','sequencers: first, then, next, finally','quantifiers: some, many, a lot of','opinion + reason: I think… because…, therefore, since, for example'],
        extra:['water cycle','evaporation','condensation','precipitation','natural resource','renewable','climate','weather','rainfall','thermometer']},
  areas:[{area:'science', level:2},{area:'math', level:2},{area:'social', level:1}],
  criteria:[
    {n:1, text:'Explaining a process — the water cycle, in order.',
     levels:{
       C:'I name the parts of the cycle.',
       B:'I explain it but the order is not clear.',
       A:'I explain it in order with sequencers and the right vocabulary.',
       AD:'I explain what would happen if one step failed.'}},
    {n:2, text:'Data — use what you measured yourself.',
     levels:{
       C:'I copy data from the internet.',
       B:'I have my own readings but I do not use them in the guide.',
       A:'My two weeks of readings are in the guide, as figures.',
       AD:'I turn them into fractions or percentages and say what they show.'}},
    {n:3, text:'Writing for a reader who is walking past.',
     levels:{
       C:'I write everything I know.',
       B:'I write a lot and the important part is buried.',
       A:'The main idea is visible at once and the guide can be read in thirty seconds.',
       AD:'I ask the reader to do one specific thing, and it is doable.'}},
    {n:4, text:'Opinion — hold a point of view with reasons.',
     levels:{
       C:'I say what happens without saying what I think.',
       B:'I give my opinion but the reasons are thin.',
       A:'I state my opinion, give ordered reasons and link them with because, therefore, since.',
       AD:'I close with a conclusion, and my reasons come from my own data.'}},
    {n:5, text:'Geography — explain why our weather is what it is.',
     levels:{
       C:'I say it rains or it does not.',
       B:'I name one factor that affects our weather.',
       A:'I explain how the currents and the mountain range shape the weather and the landscape here.',
       AD:'I connect that to why our water is a limited resource.'}}
  ],
  sequence:[
    {n:1,title:'What we have',desc:'Natural resources: what runs out and what does not. Starting Incredible Earth.',
     give:'Your list of resources, sorted.',
     across:{
       science:'Natural resources: what runs out and what does not.',
       math:'Angles, and reading the diagrams of the book.',
       english:'Argumentative text: reading one and spotting what it wants you to do.',
       social:'Efficient use of resources, and responsible consumption.'},
     sessions:[
      {s:1,title:'Runs out or not',
       objective:'Sort what we have.',
       view:[
         'Twenty resource cards: renewable, non-renewable, not sure.',
         'The "not sure" pile is the interesting one. Why is it hard?',
         'Water: which pile does it go in?',
         'Choose the resource your guide will be about.'],
       levels:{
         'Support':{task:'Sort ten resources into the two columns.',
               help:'Cards with pictures.'},
         'Core':{task:'Sort them and explain why two were hard to classify.',
               help:'Frame: "____ is difficult because…"'}}},
      {s:2,title:'Starting Incredible Earth',
       objective:'Read a documentary text for information.',
       view:[
         'First chapter, read together. What kind of text is this?',
         'It is not a story: it informs. Where is the information?',
         'Underline three facts you did not know.',
         'Ten minutes of silent reading.'],
       levels:{
         'Support':{task:'Answer four questions about the chapter choosing from two options.',
               help:'Text with data highlighted.'},
         'Core':{task:'Write three facts from the chapter with the page where you found them.',
               help:'In your own words.'}}},
      {s:3,title:'Who the guide is for',
       objective:'Understand a reader who is walking past.',
       view:[
         'Two real corridor posters. Which one gets read?',
         'Thirty seconds is all you have.',
         'The main idea goes in the first line, not at the end.',
         'What must your guide have?'],
       levels:{
         'Support':{task:'Mark which of the two posters works and copy its first line.',
               help:'Two posters.'},
         'Core':{task:'Explain why one poster works and list three things yours needs.',
               help:'Be specific.'}}}
     ]},
    {n:2,title:'The water cycle',desc:'Evaporation, condensation, precipitation. Explaining a process in order.',
     give:'The cycle explained in your own words.',
     across:{
       science:'Evaporation, condensation and precipitation.',
       math:'Properties of squares and rectangles: the diagram of the cycle, drawn to fit.',
       english:'Present simple for processes and sequencers: first, then, next, finally.',
       social:'Cartography: where the water of our region comes from, on the map.'},
     sessions:[
      {s:1,title:'Where water goes',
       objective:'Follow the cycle.',
       view:[
         'The bag on the window: watch what happens for a week.',
         'Evaporation, condensation, precipitation, and back again.',
         'Draw the cycle with arrows.',
         'Which step happens in our region and which does not?'],
       levels:{
         'Support':{task:'Label the diagram of the cycle with the three words.',
               help:'Diagram to label.'},
         'Core':{task:'Draw the cycle from memory and label the three processes.',
               help:'With arrows in the right direction.'}}},
      {s:2,title:'Explaining a process',
       objective:'Say it in order.',
       view:[
         'Sequencers: first, then, next, finally.',
         'Present simple for what always happens: water evaporates.',
         'Explain the cycle to your partner without the diagram.',
         'Write it in four sentences.'],
       levels:{
         'Support':{task:'Complete the explanation with the four sequencers.',
               help:'Sequencers in a box.'},
         'Core':{task:'Explain the cycle in your own words, in order.',
               help:'Present simple throughout.'}}},
      {s:3,title:'Where our water comes from',
       objective:'Put it on the map.',
       view:[
         'Where does the water of this school come from?',
         'Trace the route on the map of the region.',
         'How far does it travel before it reaches the tap?',
         'Mark it on your map.'],
       levels:{
         'Support':{task:'Complete the map with the route given.',
               help:'Base map with the points.'},
         'Core':{task:'Trace the route on your map and write how far it travels.',
               help:'With the figure.'}}}
     ]},
    {n:3,title:'Climate and weather',desc:'The difference between the two, and why it matters. Starting your own readings.',
     give:'Your first week of readings.',
     across:{
       science:'Climate and weather: the difference, and why it is confused.',
       math:'Area and perimeter: the surface that collects the rain you are measuring.',
       english:'Expository text: reading Incredible Earth for information, not for a story.',
       social:'Factors that influence weather and landscape in Peru: the Humboldt and El Niño currents, the mountain range.'},
     sessions:[
      {s:1,title:'Weather is not climate',
       objective:'Tell the two apart.',
       view:[
         'Weather is today. Climate is many years. The classic confusion.',
         'Ten statements: weather or climate?',
         'Which of the two can we measure in two weeks?',
         'Only the weather. Say why.'],
       levels:{
         'Support':{task:'Sort ten statements into WEATHER and CLIMATE.',
               help:'Statement cards.'},
         'Core':{task:'Sort them and explain the difference in two sentences.',
               help:'With an example of each.'}}},
      {s:2,title:'Setting up the instruments',
       objective:'Prepare to measure.',
       view:[
         'Thermometer and rain gauge. What does each one measure?',
         'Where do we put them, and why not in the sun?',
         'Rota: who reads, when, where it gets written.',
         'First reading, all together.'],
       levels:{
         'Support':{task:'Complete the log for the first day with the readings taken.',
               help:'Log with days and units.'},
         'Core':{task:'Take the first reading and write the protocol you will follow.',
               help:'So anybody could do it.'}}},
      {s:3,title:'Why our weather is like this',
       objective:'Understand the factors.',
       view:[
         'The Humboldt current, El Niño, the mountain range.',
         'Why is Lima like this and the mountains different?',
         'Which of the three explains most of our weather?',
         'Connect it to your readings.'],
       levels:{
         'Support':{task:'Match the three factors with their effect.',
               help:'Cards to match.'},
         'Core':{task:'Explain how one factor affects the weather here.',
               help:'With because.'}}}
     ]},
    {n:4,title:'Measuring it',desc:'Instruments and what they measure. Turning your readings into fractions and percentages.',
     give:'Your data, as fractions and percentages.',
     across:{
       science:'Instruments and what each one measures.',
       math:'Probability as a fraction and as a percentage; the four operations on your readings.',
       english:'Opinion piece: stating a point of view and supporting it with reasons.',
       social:'Ecosystems, nature reserves and biodiversity: what depends on this water.'},
     sessions:[
      {s:1,title:'Reading the instruments',
       objective:'Take the second week of data.',
       view:[
         'Second week complete. Everybody’s data on the board.',
         'Any missing days? A gap is not a zero.',
         'Are we all reading the same way?',
         'Finish the log.'],
       levels:{
         'Support':{task:'Complete your log for the two weeks.',
               help:'Log with the days.'},
         'Core':{task:'Complete your log and note any day that was different.',
               help:'And why.'}}},
      {s:2,title:'From the log to the number',
       objective:'Turn readings into fractions and percentages.',
       view:[
         'How many days out of ten did it rain? As a fraction.',
         'And as a percentage. With Maths.',
         'The trap: one very wet day does not make a wet fortnight.',
         'Which figure says most?'],
       levels:{
         'Support':{task:'Write your data as a fraction and convert two to percentages.',
               help:'Worked example.'},
         'Core':{task:'Convert your data to percentages and choose the figure for your guide.',
               help:'Say why that one.'}}},
      {s:3,title:'What depends on this water',
       objective:'Connect it to the ecosystem.',
       view:[
         'Nature reserves and biodiversity: what lives on this water?',
         'What happens if it runs short?',
         'Efficient use of resources: what does the school do today?',
         'What could it do differently?'],
       levels:{
         'Support':{task:'Match three living things with what they need from the water.',
               help:'Cards to match.'},
         'Core':{task:'Write what depends on this water and one thing the school could change.',
               help:'Be specific.'}}}
     ]},
    {n:5,title:'Writing the guide',desc:'Drafting it for somebody who has not read the book or seen your data.',
     give:'The draft in your notebook.',
     across:{
       science:'What your two weeks of data say about our water.',
       math:'Choosing the figure that carries the argument, and checking it.',
       english:'Opinion writing: topic, opinion, reasons in order, linking words, concluding statement.',
       social:'Citizenship responsibilities: what you can ask of the person reading your guide.'},
     sessions:[
      {s:1,title:'Stating an opinion',
       objective:'Give a point of view with reasons.',
       view:[
         'An opinion with no reason is just a shout.',
         'Because, therefore, since, for example.',
         'State your opinion about the resource in one sentence.',
         'Add two reasons, ordered.'],
       levels:{
         'Support':{task:'Complete the opinion with the connectors given.',
               help:'Connectors placed.'},
         'Core':{task:'Write your opinion with two ordered reasons.',
               help:'Using three connectors.'}}},
      {s:2,title:'Drafting the guide',
       objective:'Write it to be read in thirty seconds.',
       view:[
         'The main idea first. Cut everything that is not needed.',
         'Your figure, and one thing you ask of the reader.',
         'Draft in the notebook.',
         'Time a partner reading it. Over thirty seconds, cut more.'],
       levels:{
         'Support':{task:'Write your guide with the four headings given, one sentence each.',
               help:'Headings printed.'},
         'Core':{task:'Write your guide so it reads in thirty seconds.',
               help:'150–200 words maximum.'}}},
      {s:3,title:'The closing statement',
       objective:'Finish so it stays with the reader.',
       view:[
         'How do you close a text that asks for something?',
         'Three endings on the board. Which one works?',
         'Write yours.',
         'Read the ending out loud.'],
       levels:{
         'Support':{task:'Choose your closing from three options and copy it.',
               help:'Three endings.'},
         'Core':{task:'Write your own closing statement.',
               help:'It must ask for one specific thing.'}}}
     ]},
    {n:6,title:'On the wall',desc:'The final guide, checked and put up where the school can read it.',
     give:'The published guide.',
     across:{
       science:'The cycle and the resource, explained for somebody who has not studied them.',
       math:'The final check of every figure and unit on the guide.',
       english:'Revising for clarity: reading your own text as if somebody else had written it.',
       social:'Responsible use of public spaces: the guide goes up where the whole school passes.'},
     sessions:[
      {s:1,title:'Correcting the guide',
       objective:'Leave it right before it goes up.',
       view:[
         'Proofread in pairs: spelling, figures, units.',
         'Every number against your log.',
         'One wrong figure and the whole guide loses credit.',
         'Corrected version.'],
       levels:{
         'Support':{task:'Correct the mistakes marked and check your three figures.',
               help:'Your text with marks.'},
         'Core':{task:'Proofread your guide and verify every figure against your log.',
               help:'Checklist of four things.'}}},
      {s:2,title:'Producing the final guide',
       objective:'Make the thing that goes on the wall.',
       view:[
         'Layout: what goes big and what goes small.',
         'Your chart, if it helps.',
         'Produce the final version on the card.',
         'Last check before it goes up.'],
       levels:{
         'Support':{task:'Copy your guide neatly onto the final card.',
               help:'Your corrected text.'},
         'Core':{task:'Produce your final guide with its layout and its chart.',
               help:'It has to work from two metres away.'}}},
      {s:3,title:'On the wall',
       objective:'Put it up and watch what happens.',
       view:[
         'Put the guides up in the corridor.',
         'Watch: do people stop? For how long?',
         'Ask one person what they understood.',
         'What would you change now that you have seen it read?'],
       levels:{
         'Support':{task:'Put your guide up and write what one person told you.',
               help:'One sentence.'},
         'Core':{task:'Write what you would change after seeing people read it.',
               help:'Be specific: what and why.'}}}
     ]}
  ],
  words:['water cycle','evaporation','condensation','precipitation','natural resource','renewable','climate','weather','rainfall','temperature','thermometer','first','then','next','finally','some','many','a lot of','per cent'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#127758;', title:'Our water guide',
     desc:'Where our water comes from, how the cycle works, what your measurements showed, and one thing the reader should do differently.',
     spec:'150–200 words', range:[150,200],
     checklist:[
       {k:'process', t:'I explain the cycle in order', re:'(first|then|next|finally|after that)'},
       {k:'terms', t:'I use the words of the cycle', re:'(evaporat|condens|precipitat|cloud|vapour|vapor)'},
       {k:'data', t:'I include my own measurements', re:'([0-9]+ ?(mm|%|degrees)|per cent|percent)'},
       {k:'resource', t:'I say whether it is renewable and why that matters', re:'(renewable|run out|limited|save|waste)'},
       {k:'action', t:'I ask the reader to do one specific thing', re:'(you can|you should|turn off|use less|do not|don’t|remember to)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127777;', title:'Your weather log and your guide',
     desc:'A photo of the two weeks of readings and of the finished guide on the wall.',
     spec:'Photos of the log and the guide'}
  ]
},
    ]
  },

  g5: {
    label: 'Grade 5',
    units: [
{
  cover:{icon:'📖', from:'#23407a', to:'#5b8ed6', image:'assets/unit-covers/g5-u4-writers.png'},
  n:4,
  title:'Reading Like Writers',
  weeks:6,
  bigq:'How do readers become writers by observing, reading and exploring the world around them?',
  situation:'This term you travel to Cajamarca and you read The Lost City. In both you are doing the same thing: watching how a story is built. You look at how the author makes characters, places and adventures, and you collect what you see — words, details, ideas — in a Writer’s Notebook that will feed the stories you write in Unit 5.',
  audience:'Your future self as a writer: everything you collect now is what you will write with next unit.',
  criteria:[
    {n:1, text:'Speaking — I catch the main ideas and the details of what I hear, I express my ideas clearly, I take part in conversations and I respond to what others say.'},
    {n:2, text:'Reading — I predict from titles and pictures, I find explicit information, I recognise main ideas and details, I give my opinion using my own experience, and I compare characters, settings and events.'},
    {n:3, text:'Writing — I organise my ideas logically, develop them with details, use descriptive vocabulary and adjectives, revise for coherence, and check that my text fits its purpose and its reader.'}
  ],
  sequence:[
    {n:1,title:'Meet the story',desc:'Predicting, connecting with what you already know, and stepping into The Lost City.',give:'Your first notebook entries.'},
    {n:2,title:'Interesting characters and amazing settings',desc:'How the author builds a person and a place you can see in your head.',give:'A setting described with your senses.'},
    {n:3,title:'Powerful words',desc:'Collecting descriptive vocabulary and strong verbs — the ones worth stealing.',give:'Your word collection.'},
    {n:4,title:'Observing Cajamarca',desc:'The trip as fieldwork: observing, asking, noting what you would otherwise forget.',give:'Your observations from the trip.'},
    {n:5,title:'Reading like a writer',desc:'Going back to the book to see how the author did what you now want to do.',give:'Your reflections on the author’s craft.'},
    {n:6,title:'The Writer’s Notebook',desc:'Putting it together: vocabulary, observations, sketches and ideas ready for Unit 5.',give:'The finished notebook.'}
  ],
  words:['exploration','adventure','archaeology','ancient civilizations','landscapes','historical places','descriptive adjectives','powerful verbs','senses vocabulary','past simple','past continuous','there was','there were','and, but, because, so, then, after that, finally'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128214;', title:'Your Writer’s Notebook',
     desc:'Observations, descriptive vocabulary, reflections and ideas — from the book and from Cajamarca. Not a finished story: the raw material for one.',
     spec:'Collected across the unit',
     checklist:[
       {k:'senses', t:'I use sensory language — what I saw, heard, smelled', re:'(saw|heard|smell|felt|sounded|looked like)'},
       {k:'adj', t:'I collect descriptive adjectives and powerful verbs', re:'(ancient|enormous|silent|dusty|glowing|rushed|whispered|crumbled)'},
       {k:'past', t:'I write about what happened in the past', re:'\\b(was|were|had|went|saw|found|walked|climbed)\\b'},
       {k:'link', t:'I link my ideas with connectors', re:'(and|but|because|so|then|after that|finally)'},
       {k:'trip', t:'I include something I observed myself', re:'(cajamarca|trip|we visited|i noticed|when we)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128247;', title:'Your notebook pages',
     desc:'Photograph the pages of your handwritten notebook — the sketches and the crossings-out are part of the work.',
     spec:'Photos of the real notebook'}
  ]
},

/* --------------------------------------------- 5.o U5 (piloto 2026) */
{
  cover:{icon:'🗺️', from:'#0d4f6b', to:'#4aa8c9'},
  n:5, label:'5 · piloto', pilot:true,
  title:'The Air and the Water of Our Region',
  weeks:5,
  bigq:'What is the air and the water around us really like, and what should be done about it?',
  situation:'You read Exploring Our World and you learn how the atmosphere and the hydrosphere work anywhere on the planet. Then you look out of the window. You map your own area, you find real data about its air or its water, you tell a primary source from a secondary one, and you take a position — with evidence, not with feelings. The report goes to the people who can actually do something about it.',
  audience:'Whoever can act on it: the school’s leadership, or the district. A report nobody can act on is not finished.',
  client:'The school leadership · or the district office',
  reader:{title:'Exploring Our World', series:'Oxford Dolphin Readers', term:3, inPortal:false,
          note:'Ya asignada a esta unidad en el Annual Plan (U5 W1).'},
  exam:{target:'flyers', themes:['The world around us','Weather','Places and directions','Health'],
        grammar:['present simple for facts','comparatives and superlatives','because / however / although','opinion phrases: I think, in my opinion'],
        extra:['atmosphere','hydrosphere','ecosystem','map','scale','river','lake','watershed','primary source','secondary source','pollution']},
  areas:[{area:'social', level:2},{area:'science', level:2},{area:'math', level:2}],
  criteria:[
    {n:1, text:'Position — take one, and hold it up with evidence.',
     levels:{
       C:'I describe the problem without saying what I think.',
       B:'I give an opinion but with no data behind it.',
       A:'A clear position in the first paragraph, supported with my figures.',
       AD:'I acknowledge the strongest argument against me and answer it.'}},
    {n:2, text:'Sources — tell a primary source from a secondary one.',
     levels:{
       C:'I use whatever I found first.',
       B:'I cite sources but do not distinguish them.',
       A:'I say which data I measured myself and which I took from somebody else.',
       AD:'I say which source is more reliable for this claim, and why.'}},
    {n:3, text:'Maps and data — make them readable.',
     levels:{
       C:'My map has no key and no scale.',
       B:'The map is right but the data is not on it.',
       A:'Map with key and scale, and the data expressed as percentages.',
       AD:'The map makes the problem visible on its own, before you read the text.'}}
  ],
  sequence:[
    {n:1,title:'Reading the world, reading the map',desc:'Starting Exploring Our World. Cartographic tools and elements: what a map must have to be usable.',
     give:'Your first map of the area, with its key.',
     across:{
       science:'The atmosphere: what it is made of and what changes it.',
       math:'Deepening decimal operations, for the data you will collect.',
       social:'Cartographic tools: what a map needs to be usable.',
       comunicacion:'Palabras homonimas: la misma palabra, distinto sentido — tambien en los datos.',
       english:'Book: Exploring Our World. Reading for information.'},
     sessions:[
      {s:1,title:'Starting Exploring Our World',
       objective:'Read for information about the planet.',
       view:[
         'First chapter. How the atmosphere and the hydrosphere work anywhere.',
         'Vocabulary: atmosphere, hydrosphere, ecosystem.',
         'What of this happens here, outside the window?',
         'Ten minutes of silent reading.'],
       levels:{
         'Support':{task:'Answer four questions about the chapter and copy three key words.',
               help:'Text with words highlighted.'},
         'Core':{task:'Summarise the chapter in three sentences with the key words.',
               help:'In your own words.'}}},
      {s:2,title:'A map without a key is a drawing',
       objective:'Learn what a map needs.',
       view:[
         'Two maps of the same place: one usable, one not. What is missing?',
         'Title, key, scale, orientation.',
         'Cartographic tools: what each one is for.',
         'Sketch your first map of the area.'],
       levels:{
         'Support':{task:'Complete the map that is started: key, scale and title.',
               help:'Base map and symbols.'},
         'Core':{task:'Draw your own map of the area with the four elements.',
               help:'Choose your own symbols.'}}},
      {s:3,title:'Choosing air or water',
       objective:'Decide what your report will be about.',
       view:[
         'Two problems, one report. You cannot do both.',
         'What can we actually find data about?',
         'Each team chooses and justifies.',
         'What will you need to find out?'],
       levels:{
         'Support':{task:'Choose your topic and complete the plan with the options given.',
               help:'Plan template.'},
         'Core':{task:'Choose your topic and justify it, saying what data you will need.',
               help:'Two reasons.'}}}
     ]},
    {n:2,title:'The air above us',desc:'The atmosphere: its layers and what changes it. Different viewpoints on the same problem.',
     give:'Two opposing viewpoints, written down.',
     across:{
       science:'The atmosphere and what alters it locally.',
       math:'Multi-step decimal word problems.',
       social:'Cartographic elements: key, scale, orientation.',
       comunicacion:'Palabras paronimas: parecidas y distintas, cuidado al citar.',
       english:'Analysing detailed texts for their main ideas, and different viewpoints.'},
     sessions:[
      {s:1,title:'The air above us',
       objective:'Understand the atmosphere.',
       view:[
         'Layers, and what changes them.',
         'What alters the air here, in this district?',
         'Read a short text and pull out the causes.',
         'Which of them can we see?'],
       levels:{
         'Support':{task:'Label the layers and complete two sentences about what alters the air.',
               help:'Diagram and sentences.'},
         'Core':{task:'Explain what alters the air in our district, with three causes.',
               help:'From the text and from what you see.'}}},
      {s:2,title:'Two people, one problem',
       objective:'Read opposing viewpoints.',
       view:[
         'Two texts that disagree about the same issue.',
         'What does each want? What does each leave out?',
         'However, although, on the other hand.',
         'Neither is lying. They are looking at different things.'],
       levels:{
         'Support':{task:'Sort the sentences into the two viewpoints and join two with however.',
               help:'Sentences to sort.'},
         'Core':{task:'Write both viewpoints in your own words and say which convinces you.',
               help:'Using however or although.'}}},
      {s:3,title:'My own viewpoint',
       objective:'Say what you think and why.',
       view:[
         'Personal opinion: I think, in my opinion.',
         'An opinion without evidence is a feeling.',
         'What do you think about your problem, and what supports it?',
         'Write it in three sentences.'],
       levels:{
         'Support':{task:'Complete your opinion with the frames given.',
               help:'Frames and connectors.'},
         'Core':{task:'Write your opinion with two reasons and one piece of evidence.',
               help:'Even if it is provisional.'}}}
     ]},
    {n:3,title:'The water around us',desc:'The hydrosphere, rivers and lakes. Types of map and what each is good for.',
     give:'Your data map.',
     across:{
       science:'The hydrosphere: where our water is and where it goes.',
       math:'Percent: what it means and how it is represented.',
       social:'Types of map, and which one answers which question.',
       comunicacion:'Adverbios: precisar como, cuando y cuanto.',
       english:'Different viewpoints and personal opinion: saying what you think and why.'},
     sessions:[
      {s:1,title:'The water around us',
       objective:'Understand the hydrosphere.',
       view:[
         'Where the water of our region is and where it goes.',
         'Rivers and lakes: name the ones nearest to us.',
         'What happens to the water after we use it?',
         'Trace it on the map.'],
       levels:{
         'Support':{task:'Complete the diagram of the hydrosphere with the words given.',
               help:'Diagram to label.'},
         'Core':{task:'Explain where our water comes from and where it goes.',
               help:'With the names of the rivers.'}}},
      {s:2,title:'Types of map',
       objective:'Choose the right map for the question.',
       view:[
         'Three maps of the same area: physical, political, thematic.',
         'Which answers which question?',
         'Which do you need for your report?',
         'Start your data map.'],
       levels:{
         'Support':{task:'Match three maps with three questions.',
               help:'Maps and questions.'},
         'Core':{task:'Choose your type of map and justify it.',
               help:'Which question does it answer?'}}},
      {s:3,title:'Putting data on the map',
       objective:'Make the problem visible.',
       view:[
         'Data on a map says more than data in a list.',
         'Choose how to represent each figure.',
         'Place your data.',
         'Look at it: does the problem show up on its own?'],
       levels:{
         'Support':{task:'Place the five data points using the symbols given.',
               help:'Map with positions.'},
         'Core':{task:'Build your data map choosing how to represent each figure.',
               help:'Without you explaining it.'}}}
     ]},
    {n:4,title:'Where the evidence comes from',desc:'Primary and secondary sources. Turning what you found into percentages.',
     give:'Your sources, classified, and your figures.',
     across:{
       science:'Primary and secondary sources in science.',
       math:'Fraction, decimal and percent conversions.',
       social:'Rivers and lakes of our region.',
       comunicacion:'Preposiciones y conjunciones: unir ideas sin perder el hilo.',
       english:'Developing a thesis statement for an opinion text.'},
     sessions:[
      {s:1,title:'Where the evidence comes from',
       objective:'Tell primary from secondary sources.',
       view:[
         'What we measured ourselves, and what somebody told us.',
         'Sort your sources.',
         'Two sources that disagree: which do you trust for this?',
         'Say what each one lets you claim.'],
       levels:{
         'Support':{task:'Sort six sources into primary and secondary.',
               help:'Sources listed.'},
         'Core':{task:'Classify your sources and justify one choice.',
               help:'What does each let you claim?'}}},
      {s:2,title:'From data to percentage',
       objective:'Convert your figures.',
       view:[
         'Fraction, decimal, percentage: the same number three ways.',
         'Convert your data with Maths.',
         'Which conversion makes the problem clearest?',
         'Choose the two figures for the report.'],
       levels:{
         'Support':{task:'Convert three fractions to percentages.',
               help:'Conversion worked once.'},
         'Core':{task:'Convert your data and choose your two figures, saying why.',
               help:'And what each one shows.'}}},
      {s:3,title:'What it would cost to change it',
       objective:'Put a number on the solution.',
       view:[
         'Percent problems: discount, tax, interest.',
         'What would it cost to fix what you found?',
         'And what does it cost to do nothing?',
         'That comparison goes in the report.'],
       levels:{
         'Support':{task:'Work out the cost with the prices given.',
               help:'Operations set out.'},
         'Core':{task:'Work out what the change would cost and compare it with doing nothing.',
               help:'With figures.'}}}
     ]},
    {n:5,title:'Taking a position',desc:'The thesis statement and the report. Ecosystems and what depends on this.',
     give:'The finished report.',
     across:{
       science:'Ecosystems: what depends on this water and this air.',
       math:'Percent word problems: discount, tax and interest — what the change would cost.',
       social:'Ecosystems and the responsibility over them.',
       english:'Thesis statements, and identifying the main points of a short talk.'},
     sessions:[
      {s:1,title:'The thesis statement',
       objective:'Say it in the first line.',
       view:[
         'Three openings on the board. Which makes you keep reading?',
         'Your position in one sentence. Rewrite it three times.',
         'Read the first line to a partner: do they know what you think?',
         'Choose the best of your three.'],
       levels:{
         'Support':{task:'Choose your thesis from three options and copy it.',
               help:'Three theses.'},
         'Core':{task:'Write your thesis three times and choose the best, saying why.',
               help:'It must be arguable.'}}},
      {s:2,title:'Drafting the report',
       objective:'Write it for somebody who can act.',
       view:[
         'Structure: position, evidence, other viewpoint, what should be done.',
         'Draft in the notebook, with your map beside it.',
         'Halfway: does your evidence really support your position?',
         'Finish the draft.'],
       levels:{
         'Support':{task:'Write your report with the frame: "I think… The data shows… However… That is why…"',
               help:'Four openings.'},
         'Core':{task:'Write your report with your thesis, your data and one opposing viewpoint.',
               help:'200–250 words.'}}},
      {s:3,title:'Handing it over',
       objective:'Leave it ready for whoever receives it.',
       view:[
         'Feedback against the rubric, criterion by criterion.',
         'Rewrite the weakest paragraph.',
         'Check every figure against your map.',
         'Hand in: report and map together.'],
       levels:{
         'Support':{task:'Correct what was marked and check your figures.',
               help:'Your text with marks.'},
         'Core':{task:'Rewrite your weakest paragraph and say what you improved.',
               help:'Against which criterion.'}}}
     ]}
  ],
  words:['atmosphere','hydrosphere','ecosystem','map','key','scale','river','lake','watershed','primary source','secondary source','pollution','percentage','evidence','viewpoint','I think','in my opinion','because','however','although'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128506;', title:'Report on our air or our water',
     desc:'Your map, your data as percentages, where the data came from, and your position on what should be done.',
     spec:'200–250 words', range:[200,250],
     checklist:[
       {k:'thesis', t:'I state my position in the first paragraph', re:'(i think|in my opinion|should|must|the problem is)'},
       {k:'data', t:'I include figures, with percentages', re:'([0-9]+ ?%|per cent|percent)'},
       {k:'source', t:'I say where my information came from', re:'(source|according to|we measured|i measured|interview|survey)'},
       {k:'other', t:'I mention a different point of view', re:'(however|although|some people|others think|on the other hand)'},
       {k:'vocab', t:'I use the words of the unit', re:'(atmosphere|hydrosphere|ecosystem|river|lake|pollution|watershed)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128506;', title:'Your map',
     desc:'The map you drew by hand, with its key, its scale and the data marked on it.',
     spec:'Photo of the hand-drawn map'}
  ]
},

/* --------------------------------------------- 5.o U6 (piloto 2026) */
{
  cover:{icon:'💰', from:'#6b4a0d', to:'#d1a13a'},
  n:6, label:'6 · piloto', pilot:true,
  title:'Worth Saving',
  weeks:6,
  bigq:'What is worth saving — and can you convince anybody else of it?',
  situation:'Some things are free and endless, like the air; others are not, and somebody pays for them. This unit is about telling the two apart and doing something about it. You choose one resource, you find out what it really costs the school, you build a savings plan with your own data, and then you have to persuade a hall full of people who did not ask to be persuaded.',
  audience:'The whole school at the closing showing. You have three minutes and they can walk away.',
  client:'The school · closing showing',
  reader:{title:null, term:3, inPortal:false, note:'5.o tiene dos libros en inglés y los dos ya se usan (U2 y U5). Este es el hueco del plan lector a resolver para 2027.'},
  exam:{target:'flyers', themes:['The home','The world around us','Work','School'],
        grammar:['should / shouldn\u2019t','first conditional','persuasive imperatives','because / that is why'],
        extra:['renewable','non-renewable','free goods','economic goods','saving','budget','probability','data','waste','campaign']},
  areas:[{area:'social', level:2},{area:'math', level:2},{area:'science', level:1}],
  criteria:[
    {n:1, text:'Persuading — make somebody want to change something.',
     levels:{
       C:'I say the problem is bad.',
       B:'I ask people to change but I do not say exactly what.',
       A:'I ask for one specific change and I give reasons with evidence.',
       AD:'I answer the objection of somebody who does not want to change.'}},
    {n:2, text:'Data — your own numbers, from this school.',
     levels:{
       C:'I use figures I found online.',
       B:'I measured something but it is not in the campaign.',
       A:'My own measurements are in the campaign, as figures.',
       AD:'I use probability to say what is likely to happen if nothing changes.'}},
    {n:3, text:'Speaking — hold a hall that can walk away.',
     levels:{
       C:'I read the campaign out.',
       B:'I present it to people who are listening politely.',
       A:'I speak from notes, look up, and hold their attention for three minutes.',
       AD:'Somebody who was walking past stops to listen.'}}
  ],
  sequence:[
    {n:1,title:'Free or not free?',desc:'Renewable and non-renewable resources; free goods and economic goods. Choosing yours.',
     give:'Your resource, and why you chose it.',
     across:{
       science:'Universe origins — running in parallel: it does not feed this project and is not forced into it.',
       math:'Area of polygons: measuring the surfaces the resource is used on.',
       social:'Emotions, and what makes us decide to change something.',
       comunicacion:'La oracion y sus clases: construir la frase que convence.',
       english:'Analysing detailed texts for their main ideas.'},
     sessions:[
      {s:1,title:'Who pays for the air',
       objective:'Tell free goods from economic goods.',
       view:[
         'The air is free. The water is not. Where is the line?',
         'Free goods and economic goods, with examples from the school.',
         'Which of the two is easier to waste? Why?',
         'Sort ten things.'],
       levels:{
         'Support':{task:'Sort ten things into free goods and economic goods.',
               help:'Cards and columns.'},
         'Core':{task:'Sort them and explain one difficult case.',
               help:'Frame: "____ is difficult because…"'}}},
      {s:2,title:'Renewable or not',
       objective:'Understand what runs out.',
       view:[
         'Renewable does not mean unlimited. Explain the difference.',
         'Which resources does this school use most?',
         'Which of them worries you?',
         'Choose yours.'],
       levels:{
         'Support':{task:'Sort eight resources and circle the one you will work on.',
               help:'Cards.'},
         'Core':{task:'Choose your resource and justify it with what the school uses.',
               help:'Two reasons.'}}},
      {s:3,title:'What the school does today',
       objective:'Look before proposing.',
       view:[
         'Walk round: where is your resource used?',
         'Take note of what you see, without judging yet.',
         'Who decides about that resource?',
         'Who would have to change something?'],
       levels:{
         'Support':{task:'Complete the observation sheet with what you saw.',
               help:'Sheet with three columns.'},
         'Core':{task:'Write what you observed and who would have to change it.',
               help:'Be specific.'}}}
     ]},
    {n:2,title:'How persuasion works',desc:'Analysing persuasive texts: what makes one convincing and another one annoying.',
     give:'Three techniques you are going to use.',
     across:{
       science:'Universe origins (parallel).',
       math:'3D shapes: prisms and pyramids, for the containers you are measuring.',
       social:'Customs and citizenship: what the school already does and what it could do.',
       comunicacion:'El sujeto: quien hace la accion en tu campana.',
       english:'Discussions and persuasive speech: what makes a text convincing.'},
     sessions:[
      {s:1,title:'Convincing or annoying',
       objective:'Analyse real campaigns.',
       view:[
         'Three campaigns. Which works, which irritates, and why.',
         'The techniques: a surprising figure, a direct ask, a consequence.',
         'What NOT to do: blame the reader.',
         'Which technique will you steal?'],
       levels:{
         'Support':{task:'Match each campaign with its technique and copy the best sentence.',
               help:'Campaigns printed.'},
         'Core':{task:'Analyse the three and explain why one fails.',
               help:'Which sentence exactly.'}}},
      {s:2,title:'Reading a persuasive text',
       objective:'Find the argument inside it.',
       view:[
         'Read a persuasive text and mark: claim, reason, evidence.',
         'What does it want you to do?',
         'Where is it weakest?',
         'Would you do what it asks? Why?'],
       levels:{
         'Support':{task:'Mark the three parts in the text given.',
               help:'Text with the parts to find.'},
         'Core':{task:'Analyse the text and say where the argument is weakest.',
               help:'And how you would fix it.'}}},
      {s:3,title:'Planning the measurement',
       objective:'Decide what you will count.',
       view:[
         'What can be counted in this school in two days?',
         'Where, when, how often, who.',
         'Design your measurement round.',
         'Test it once today.'],
       levels:{
         'Support':{task:'Complete the measurement plan with the options given.',
               help:'Plan template.'},
         'Core':{task:'Design your measurement round and say what could go wrong.',
               help:'And your plan B.'}}}
     ]},
    {n:3,title:'What it really costs',desc:'Measuring the real use of your resource in the school. Data analysis.',
     give:'Your data and what it shows.',
     across:{
       science:'Formation of stars and the solar system (parallel).',
       math:'Nets, faces, edges and vertices; recording the measurement round.',
       social:'Renewable and non-renewable resources.',
       comunicacion:'El predicado: decir con precision que ocurre.',
       english:'Reporting what you measured, without exaggerating it.'},
     sessions:[
      {s:1,title:'Counting what nobody counts',
       objective:'Take the data of the school.',
       view:[
         'Out on the round. Two days of data.',
         'Everything written down at the moment.',
         'Something will surprise you. Do not smooth it.',
         'All the data onto the shared sheet.'],
       levels:{
         'Support':{task:'Complete your measurement table.',
               help:'Table with columns.'},
         'Core':{task:'Complete your table and note the conditions of each reading.',
               help:'Time and place.'}}},
      {s:2,title:'Reading our own data',
       objective:'Work out what it means.',
       view:[
         'Total, average, and the surprising figure.',
         'Per student, per classroom, per week.',
         'Which figure would make somebody stop?',
         'That is the one for the campaign.'],
       levels:{
         'Support':{task:'Work out the total and average of your data.',
               help:'Operations set out.'},
         'Core':{task:'Work out your figures and choose your campaign number, with a reason.',
               help:'It has to be true and yours.'}}},
      {s:3,title:'What is likely to happen',
       objective:'Use probability.',
       view:[
         'Theoretical and experimental probability.',
         'If nothing changes, what is likely in a year?',
         'Work it out with your data.',
         'Is that a good enough reason to change?'],
       levels:{
         'Support':{task:'Complete the probability calculation with the model given.',
               help:'Worked example.'},
         'Core':{task:'Work out what is likely in a year if nothing changes.',
               help:'With the figure.'}}}
     ]},
    {n:4,title:'The savings plan',desc:'Turning the data into a plan with numbers. What is likely to work and what is not.',
     give:'Your savings plan.',
     across:{
       science:'Formation of stars and the solar system (parallel).',
       math:'Circles and circumference; the calculation of the saving.',
       social:'Free goods versus economic goods: what is paid for and by whom.',
       comunicacion:'Sentido literal y figurado: la imagen que se queda en la cabeza.',
       english:'Should and the first conditional: what would happen if we changed it.'},
     sessions:[
      {s:1,title:'Designing the saving',
       objective:'Turn data into a plan.',
       view:[
         'If we changed this one thing, how much would we save?',
         'Work it out with real numbers.',
         'The plan has to be doable by the people in this school.',
         'Write your three steps.'],
       levels:{
         'Support':{task:'Complete the savings plan with the three steps given.',
               help:'Steps and calculation.'},
         'Core':{task:'Design your plan and work out the saving.',
               help:'With the figures.'}}},
      {s:2,title:'Would they actually do it',
       objective:'Test the plan on somebody else.',
       view:[
         'Present your plan to another team. Would they do it?',
         'What do they object to?',
         'Fix the step they would not follow.',
         'A plan nobody follows is not a plan.'],
       levels:{
         'Support':{task:'Note the objection you received and fix one step.',
               help:'Your plan.'},
         'Core':{task:'Rewrite the step that was objected to and say why it is better.',
               help:'Be specific.'}}},
      {s:3,title:'Should and if',
       objective:'Learn the language of persuading.',
       view:[
         'Should and shouldn’t: what we ought to do.',
         'First conditional: if we do this, that will happen.',
         'Write four sentences about your plan.',
         'Two with should, two with if.'],
       levels:{
         'Support':{task:'Complete four sentences with should and if.',
               help:'Sentences started.'},
         'Core':{task:'Write four sentences of your own about your plan.',
               help:'Two of each type.'}}}
     ]},
    {n:5,title:'Writing the campaign',desc:'Drafting the persuasive text in your notebook. Feedback and rewriting.',
     give:'The final text.',
     across:{
       science:'Planetary movements (parallel).',
       math:'Probability, theoretical and experimental: what is likely if nothing changes.',
       social:'The importance of saving.',
       comunicacion:'Guion y raya: los signos del dialogo y del inciso.',
       english:'Drafting, feedback and rewriting the persuasive text.'},
          sessions:[
      {s:1,title:'Drafting the campaign',
       objective:'Write it with your three techniques.',
       view:[
         'Your figure, your ask, your consequence.',
         'The first fifteen seconds decide whether they stay.',
         'Draft in the notebook.',
         'Read your opening to a partner.'],
       levels:{
         'Support':{task:'Write your campaign with the frame: "Did you know…? That is why… If we…"',
               help:'Three openings.'},
         'Core':{task:'Write your campaign with your three techniques.',
               help:'200–250 words.'}}},
      {s:2,title:'Facing the unconvinced',
       objective:'Answer an objection.',
       view:[
         'Read your campaign to a team that is NOT convinced.',
         'Let them object. Note the one you could not answer.',
         'Rewrite answering it.',
         'An answered objection makes the campaign stronger.'],
       levels:{
         'Support':{task:'Note the objection and add one sentence answering it.',
               help:'Your text.'},
         'Core':{task:'Rewrite integrating the objection into your argument.',
               help:'Not as an appendix.'}}},
      {s:3,title:'The final version',
       objective:'Leave it ready to be said out loud.',
       view:[
         'Feedback against the rubric.',
         'Check that every figure is yours and is right.',
         'Final version.',
         'Rehearse the first fifteen seconds.'],
       levels:{
         'Support':{task:'Correct what was marked and rehearse your opening.',
               help:'Your text with marks.'},
         'Core':{task:'Produce the final version and rehearse the opening without reading.',
               help:'Timed.'}}}
     ]},
    {n:6,title:'Convincing them',desc:'The speech, in front of the school.',
     give:'The campaign and the speech.',
     across:{
       science:'Planetary movements (parallel).',
       math:'Data analysis and integrated problem solving on your own figures.',
       social:'Making a savings plan that the school could actually adopt.',
       comunicacion:'Diferencia entre haber y a ver: revisar antes de publicar.',
       english:'Delivering a persuasive speech to an audience that can walk away.'},
     sessions:[
      {s:1,title:'Rehearsing the speech',
       objective:'Three minutes, without reading.',
       view:[
         'Timed rehearsal. Over three minutes, cut.',
         'Eyes up, not on the paper.',
         'Your partner asks one question. Answer it.',
         'Mark the part that comes out worst.'],
       levels:{
         'Support':{task:'Rehearse with your cards and mark the hardest part.',
               help:'Cards with key words.'},
         'Core':{task:'Rehearse the whole speech and prepare an answer to one question.',
               help:'The likely one.'}}},
      {s:2,title:'The showing',
       objective:'Convince a hall that can walk away.',
       view:[
         'Each team presents its campaign.',
         'Count how many people stayed to the end.',
         'Somebody asks something. Answer it.',
         'Note the best question.'],
       levels:{
         'Support':{task:'Present your campaign with your cards.',
               help:'Your cards.'},
         'Core':{task:'Present without reading and answer a question from the floor.',
               help:'Note it afterwards.'}}},
      {s:3,title:'What worked',
       objective:'Close the loop.',
       view:[
         'How many stayed? What did they ask most?',
         'Which campaign convinced the school, and why?',
         'Will the school actually change anything?',
         'Write what worked and what did not.'],
       levels:{
         'Support':{task:'Complete the reflection: what worked, what did not.',
               help:'Two openings.'},
         'Core':{task:'Write what you would change after presenting it.',
               help:'Be specific about what you saw.'}}}
     ]}
  ],
  words:['renewable','non-renewable','free goods','economic goods','saving','budget','probability','data','waste','campaign','should','shouldn\u2019t','if we','we will','that is why','did you know'],
  deliverables:[
    {kind:'campaign', type:'text', icon:'&#128227;', title:'Your campaign',
     desc:'What you want people to change, why it matters, what your data shows and exactly what you are asking them to do.',
     spec:'200–250 words', range:[200,250],
     checklist:[
       {k:'ask', t:'I say exactly what I want people to do', re:'(should|let’s|let us|start|stop|turn off|use less|switch)'},
       {k:'data', t:'I use our own data from this school', re:'([0-9]+ ?(%|litres|liters|kg|hours|times)|per cent|percent|we counted|we measured)'},
       {k:'if', t:'I say what will happen if we do it', re:'(if we|if you|we will|it will|then we)'},
       {k:'why', t:'I give reasons', re:'(because|that is why|this means|so that)'},
       {k:'vocab', t:'I use the words of the unit', re:'(renewable|non-renewable|resource|saving|waste|budget)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Your speech and your plan',
     desc:'A recording of your three-minute speech, and a photo of the savings plan with your data.',
     spec:'3 minutes, plus the plan'}
  ]
},
    ]
  },

  g6: {
    label: 'Grade 6',
    units: [

/* ------------------------------------------------- 6.o U4 */
{
  cover:{icon:'🏅', from:'#7a5310', to:'#d4a03a', image:'assets/unit-covers/g6-u4-heroes.png'},
  n:4,
  title:'Heroes Among Us — The Power of Life Choices',
  weeks:6,
  stepWord:'Step',
  bigq:'How do the choices we make today shape our character and our community tomorrow?',
  situation:'You are looking for role models, and it is easy to find them in superheroes or influencers. This unit sends you somewhere else: to the lives of real, ordinary people who got past huge personal, social or physical obstacles and made an extraordinary difference. Key concepts: identity and connections.',
  audience:'Your Hero Profile is a finished booklet, made to be read by someone else — not a worksheet you fill in and forget.',
  criteria:[
    {n:1, text:'Literal comprehension — I pull out dates, names, places and life milestones from a biography.'},
    {n:2, text:'Inference — I work out what someone was like inside from what they actually did.'},
    {n:3, text:'I use the past simple (regular and irregular) with few mistakes when I describe past events.'},
    {n:4, text:'I link my sentences with chronological connectors (first, next, then, finally) and with because, but and so.'},
    {n:5, text:'I produce a cohesive 3-paragraph biography: early life — achievements and obstacles — legacy and my opinion.'},
    {n:6, text:'I read passages aloud with the right phrasing, pauses and pacing.'},
    {n:7, text:'I share a short, structured spoken summary and opinion of the hero I chose.'}
  ],
  sequence:[
    {n:1,title:'Traits: what you see and what you are',desc:'Sorting physical traits (tall, brown hair) from internal character traits (brave, determined) with visual sorting tasks.'},
    {n:2,title:'Rebuilding a timeline',desc:'Unscrambling the chronological story of a real figure using sequence cards: first, next, then, finally.'},
    {n:3,title:'Cause and effect',desc:'Reading short stories of struggle — Frida Kahlo, Louis Braille — and colour-coding the link between the obstacle and the heroic response with but, because and so.'},
    {n:4,title:'Finding the facts yourself',desc:'Safe-search data extraction: locked-down pages, specific data points, and your Hero ID Card.',give:'Your Hero ID Card, complete.'}
  ],
  words:['brave','creative','patient','determined','kind','hardworking','honest','curious','resilient','disciplined','was born','grew up','studied','discovered','improved','first, next, then, finally','because','so','but'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Three-paragraph biography',
     desc:'Early life — achievements and obstacles — legacy and what you think. One paragraph each.',
     spec:'3 paragraphs · past simple',
     checklist:[
       {k:'past', t:'I write in the past simple', re:'\\b(was|were|had|went|made|became|wrote|built|fought|studied|lived|started|created|discovered|helped)\\b'},
       {k:'seq', t:'I use chronological connectors', re:'(first|next|then|after that|finally|later in life|at the age of)'},
       {k:'cause', t:'I show cause and effect with because, so or but', re:'\\b(because|so|but)\\b'},
       {k:'traits', t:'I name internal character traits, not just looks', re:'(brave|determined|resilient|patient|honest|curious|disciplined|kind|hardworking|creative)'},
       {k:'opinion', t:'I say what I think about my hero', re:'(i think|in my opinion|i believe|for me|i admire)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128218;', title:'Hero Profile booklet + your spoken summary',
     desc:'Upload your finished booklet (export it as PDF or images), or record the short spoken summary of your hero.',
     spec:'Booklet · plus a short talk'}
  ]
},

/* ------------------------------------------------- 6.o U5 */
{
  cover:{icon:'📱', from:'#125b6b', to:'#3fa8c4', image:'assets/unit-covers/g6-u5-tech-life.png'},
  n:5,
  title:'Tech in My Life: Pros and Cons',
  weeks:5,
  bigq:'How does technology help and harm us in our personal lives?',
  situation:'Technology is everywhere in your day. In this unit you stop and look at it: what the devices and tools you use actually do to your routines, your health and your habits — and you learn to say it in English, first in sentences, then in paragraphs, then in a report.',
  audience:'Your class. The mini-poster is there so somebody can follow your talk, and the report is written to be read.',
  criteria:[
    {n:1, text:'Speaking & listening — I give a simple, personal opinion about technology in short clear sentences, with at least one reason or example, and I listen for the main idea and two details.'},
    {n:2, text:'Reading — I find key information in short texts and I can tell whether a text is for or against technology.'},
    {n:3, text:'Writing — I write a short opinion paragraph (6–8 sentences) with a topic sentence, at least one reason and a conclusion, using because, but and also.'}
  ],
  sequence:[
    {n:1,title:'Introduction and vocabulary',desc:'Naming the technologies you personally use and describing one pro and one con in simple sentences.',give:'One pro and one con, in your own words.'},
    {n:2,title:'Reading and organising ideas',desc:'Pulling pros and cons out of short texts and putting them in order.',give:'Your pros-and-cons chart.'},
    {n:3,title:'From sentences to paragraphs',desc:'Turning a list of sentences into a connected paragraph with basic connectors.',give:'Your first full paragraph.'},
    {n:4,title:'Drafting the report',desc:'How a report is built, and your first draft of one.',give:'The draft of your report.'},
    {n:5,title:'Final products',desc:'Finishing the report and presenting the mini-poster.',give:'The final report and the poster talk.'}
  ],
  words:['technology','useful','harmful','advantage','disadvantage','save time','fun','distraction','screen time','health','learning','family','friends','because','but','also'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Report on technology in your life',
     desc:'At least two personal pros and two cons. Topic sentence, your reasons, and a conclusion.',
     spec:'6–8 sentences minimum', range:[80,200],
     checklist:[
       {k:'pros', t:'I give at least two good things about technology', re:'(help|useful|save time|fun|learn|easier)'},
       {k:'cons', t:'I give at least two problems', re:'(harm|distract|screen time|health|addicted|waste)'},
       {k:'connect', t:'I use because, but and also', re:'\\b(because|but|also)\\b'},
       {k:'example', t:'I give an example from my own life', re:'(i use|my|when i|every day)'},
       {k:'concl', t:'I finish with what I think', re:'(in conclusion|to sum up|i think|in my opinion)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128506;', title:'Mini-poster and your talk',
     desc:'Photograph your mini-poster and record your one-to-two-minute presentation.',
     spec:'1–2 minutes'}
  ]
}

    ]
  },

  g7: {
    label: 'Grade 7',
    units: [

/* ------------------------------------------------- 7.o U4 */
{
  cover:{icon:'⚖', from:'#3f4756', to:'#8b93a6', image:'assets/unit-covers/g7-u4-order.png'},
  n:4,
  title:'The Architecture of Order: From Written Laws to Unspoken Truths',
  weeks:5,
  stepWord:'Phase',
  bigq:'What has more power over how we behave: the laws we write down, or the unspoken rules we choose to follow?',
  situation:'Every day you move through an invisible network of guidelines. You stop at red lights, you raise your hand in class, you wear certain clothes to fit in. Some of those are official laws written in books; others are unwritten rules passed down through culture and peer pressure. Here you become a social architect: you analyse real rules, debate whether they work, and then build your own society.',
  audience:'Your classmates, who have to live inside the world you invent — and discover for themselves that what is unsaid often has more power than what is written down.',
  criteria:[
    {n:1, text:'Reading — I find the main ideas and the arguments in texts about rules and laws, and I work out why characters in a story act as they do.'},
    {n:2, text:'Writing — I write a structured set of rules with must and should, and a short scene with a clear cause and effect when a rule is broken.'},
    {n:3, text:'Speaking — I state a clear opinion in a structured debate, answer a classmate with turn-taking phrases (“I agree, but…”), and use intonation to make my view clear.'}
  ],
  sequence:[
    {n:1,title:'Deconstruct — real rules',desc:'Real-world inquiry into everyday regulations: school, games, traffic. Why does society work at all?',give:'Your vocabulary of order, built from real rules.'},
    {n:2,title:'Argue — debate',desc:'Small-group structured debates on which rules work and why others fail.',give:'Your position, defended out loud.'},
    {n:3,title:'Create — fantasy laws',desc:'Designing the foundation of an original world and drafting its written legal code.',give:'The three chief written laws of your world.'},
    {n:4,title:'Apply — the unspoken twist',desc:'Adding unspoken cultural customs to your world and exploring them through a short narrative.',give:'Your narrative snapshot.'}
  ],
  words:['authority','citizen','consequence','custom','norm','taboo','tradition','punishment','regulation','enforce','forbid','prohibit','rebel','penalise','acceptable','mandatory','unwritten','invisible','subtle','must','should'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128220;', title:'Narrative snapshot',
     desc:'A scene or dialogue where a character accidentally breaks one of your society’s unspoken rules — and pays for it socially: isolation, public judgement or plain confusion.',
     spec:'200–250 words', range:[200,250],
     checklist:[
       {k:'break', t:'Someone breaks an unspoken rule — not a written one', re:'(unwritten|unspoken|custom|taboo|nobody told|everyone knew)'},
       {k:'cause', t:'The consequence follows clearly from what they did', re:'\\b(because|so|therefore|as a result|which meant)\\b'},
       {k:'social', t:'The consequence is social, not legal', re:'(stared|silence|laughed|ignored|ashamed|judged|alone|whisper)'},
       {k:'scene', t:'It reads as a scene, with dialogue or detail', re:'(“|\\bsaid\\b|\\basked\\b|\\breplied\\b)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127963;', title:'Legislative portfolio',
     desc:'The poster with the three chief written laws of your invented world and a paragraph justifying why each one exists. Photograph it or upload the file.',
     spec:'3 laws · with justification'}
  ]
},

/* ------------------------------------------------- 7.o U5 */
{
  cover:{icon:'🌐', from:'#12556b', to:'#3f9fc4', image:'assets/unit-covers/g7-u5-tech-world.png'},
  n:5,
  title:'Tech in Our World: Help or Harm?',
  weeks:5,
  bigq:'How does technology affect society positively and negatively?',
  situation:'You hear mixed messages all the time: technology keeps people connected, helps them learn and work — and at the same time it distracts, misinforms and replaces face-to-face contact. Here you are a community member and a young thinker: you gather perspectives, read and listen to arguments, and learn to organise your ideas clearly.',
  audience:'Your class, in a real debate. The report is written so somebody who disagrees with you still has to take it seriously.',
  criteria:[
    {n:1, text:'Speaking & listening — I take part in discussions with clear ideas and reasons, I ask and answer, I take turns properly, and I can tell facts from opinions in what I hear.'},
    {n:2, text:'Reading — I find the main idea, the supporting details and the writer’s opinion, and I notice tone and bias across different texts.'},
    {n:3, text:'Writing — I write an organised opinion text (200–250 words) with an introduction, two developed body paragraphs with evidence, and a conclusion, using however, on the other hand and in addition.'}
  ],
  sequence:[
    {n:1,title:'Introduction and vocabulary',desc:'What role technology plays in society, and the language of pros and cons.',give:'Your first ideas, expressed simply.'},
    {n:2,title:'Reading and identifying arguments',desc:'Recognising arguments, main ideas and supporting details in short texts.',give:'One argument for and one against, from a real text.'},
    {n:3,title:'Writing foundations',desc:'Coherence and cohesion: making connectors do the work.',give:'A connected paragraph, not a list.'},
    {n:4,title:'Practice and oral debate',desc:'Expressing pros and cons out loud, and gathering the content for the final report.',give:'Your part in the class debate.'},
    {n:5,title:'Final writing and presentation',desc:'The opinion report, written and presented.',give:'The report and your presentation.'}
  ],
  words:['society','community','communication','information','connection','isolation','influence','social media','education','cooperation','responsibility','privacy','security','innovation','however','on the other hand','in addition'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Report on technology and society',
     desc:'Introduction, two developed body paragraphs with evidence, and a conclusion — about the effects at the level of society, not just your own screen.',
     spec:'200–250 words', range:[200,250],
     checklist:[
       {k:'intro', t:'My introduction says what the report is about', re:'.{150,}'},
       {k:'two', t:'I develop two separate arguments', re:'(firstly|first of all|secondly|another|in addition)'},
       {k:'evidence', t:'I support them with evidence or examples', re:'(for example|for instance|according to|research|study|survey)'},
       {k:'connect', t:'I use however, on the other hand or in addition', re:'(however|on the other hand|in addition|nevertheless)'},
       {k:'social', t:'I write about society, not only about me', re:'(society|community|people|schools|families|everyone)'},
       {k:'concl', t:'I close with a conclusion', re:'(in conclusion|to sum up|overall|to conclude)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#128483;', title:'Class debate',
     desc:'Record your turn in the debate: your position, your evidence and your answer to somebody who disagrees.',
     spec:'Live debate · recorded'}
  ]
}

    ]
  },

  /* 8.o solo tiene planificada la U4 en Toddle: no hay U5, asi que no se ofrece. */
  g8: {
    label: 'Grade 8',
    units: [

/* ------------------------------------------------- 8.o U4 */
{
  cover:{icon:'📕', from:'#5c2230', to:'#a5566a', image:'assets/unit-covers/g8-u4-voice.png'},
  n:4,
  title:'Finding Our Voice Through Literature and Argument',
  weeks:6,
  bigq:'How can literature help us understand different perspectives and express our own ideas clearly?',
  situation:'Books show you worlds very different from your own, and then send you back to look at this one. Reading The Giver you meet freedom, equality, memory, responsibility and individuality — and you compare Jonas’s community with yours, learning to defend an opinion with evidence from the text instead of just asserting it.',
  audience:'The Literary Symposium: you present your argument to your classmates and answer their questions. Your essay has to survive being asked about.',
  criteria:[
    {n:1, text:'Speaking — I use intonation to carry meaning and emotion, I organise a clear presentation, I keep eye contact and I present with confidence.'},
    {n:2, text:'Reading — I identify plot, setting and main characters, I infer their motives from what they do and say, and I back my reading with textual evidence.'},
    {n:3, text:'Writing — I write a clear thesis, develop a coherent argument with enough evidence, organise introduction, body and conclusion, and revise my drafts.'},
    {n:4, text:'Accuracy — I use colons and semicolons correctly and I proofread my spelling.'}
  ],
  sequence:[
    {n:1,title:'The power of communication',desc:'Intonation patterns and expressing meaning out loud. The Giver begins.',give:'A 1-minute oral presentation — and your Reading Journal opens.'},
    {n:2,title:'Understanding characters',desc:'Listening for main ideas, speaking with confidence, and reading characters critically (chapters 2–4).',give:'Your Character Profile: the trait, and the evidence for it.'},
    {n:3,title:'Exploring themes',desc:'Character development and theme analysis; collecting textual evidence and using it to back an opinion.',give:'Your Theme Tracker — quote, theme, why it matters. This is your evidence bank.'},
    {n:4,title:'Building strong arguments',desc:'What makes an argument strong, and the grammar that holds it together: colons, semicolons and cohesive devices.',give:'Your Argument Planner and one argumentative paragraph, peer-reviewed.'},
    {n:5,title:'Writing and refining',desc:'Choosing your question, thesis, outline, drafting and revision. The Giver finishes.',give:'The final essay, revised and submitted.'},
    {n:6,title:'Literary Symposium',desc:'Presenting your ideas, defending them under questioning, and reflecting on what literature let you see.',give:'Your presentation, the Theme Tracker, the Reading Journal and your self-reflection.'}
  ],
  words:['thesis statement','argument','evidence','counterargument','refutation','theme','perspective','character','claim','intonation','persuasion','collaboration','reflection','colon','semicolon','The Giver'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Argumentative essay',
     desc:'Your opinion on one theme from chapters 1–7 of The Giver: thesis, reasons, evidence from the novel, and an explanation of how that evidence supports you. Choose one of the four essay questions.',
     spec:'300–350 words', range:[300,350],
     checklist:[
       {k:'thesis', t:'I state a clear thesis in the introduction', re:'.{200,}'},
       {k:'quote', t:'I bring evidence from the novel', re:'(“|"|jonas|the giver|the community|chapter)'},
       {k:'explain', t:'I explain how the evidence supports my point', re:'(this shows|this suggests|which means|this proves|because of this)'},
       {k:'punct', t:'I use a colon or a semicolon correctly', re:'[;:]'},
       {k:'concl', t:'I close with a conclusion', re:'(in conclusion|to conclude|ultimately|overall)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Literary Symposium',
     desc:'Three to four minutes: your thesis, your strongest evidence, your conclusion — and then you answer one or two questions from the floor.',
     spec:'3–4 minutes · with Q&A'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Self-reflection',
     desc:'Which theme turned out to be the strongest, how Jonas changed, and what reading him changed in you.',
     spec:'Around 100 words', range:[80,160]}
  ]
}

    ]
  },

  g9: {
    label: 'Grade 9',
    cefr: 'B1+ → B2 (Cambridge B2 First)',
    units: [

/* ---------------------------------------------------------------- U1 */
{
  cover:{icon:'🔍', from:'#2a1f4e', to:'#6a5ba8', image:'assets/unit-covers/g9-u1-mystery.png'},
  n:1,
  title:'Mystery and Secrets: Investigating the Unknown',
  weeks:6,
  bigq:'How do we uncover the truth when information is incomplete or hidden?',
  situation:'Throughout history, mysteries and secrets have shaped the way we understand the world — from Great Expectations to real unsolved cases. In this unit you take on the role of an investigator: you analyse texts, uncover hidden meanings and build well-supported conclusions.',
  audience:'Your classmates, acting as detectives. They will read or listen to your case and try to solve it from the evidence you give them — so the mystery has to stay open to interpretation.',
  criteria:[
    {n:1, text:'Content & ideas — an original, engaging mystery with logical development and well-chosen details.'},
    {n:2, text:'Inference & critical thinking — the audience can make inferences, and fact, speculation and opinion are clearly distinguishable.'},
    {n:3, text:'Language use — speculative language, descriptive vocabulary and control of modals, conditionals and the passive voice.'},
    {n:4, text:'Organisation — a clear, cohesive structure in the case file and in the presentation.'},
    {n:5, text:'Evidence — interpretations are supported and the clues are well integrated.'},
    {n:6, text:'Creativity & presentation — engaging delivery, attention to detail and interaction with the audience.'}
  ],
  sequence:[
    {n:1,title:'The nature of mystery',desc:'What makes a mystery compelling? Mystery vocabulary, suspense-building techniques, and forming and justifying opinions.',give:'A suspenseful setting written with sensory detail.'},
    {n:2,title:'Uncovering secrets: evidence and clues',desc:'How do we separate fact from speculation? Modals of speculation, cohesive devices and the passive voice for reporting.',give:'Your theory of a case, defended out loud as a detective.'},
    {n:3,title:'Deception and unreliable narrators',desc:'Can we trust what we see and hear? Bias, ambiguity and inference, with Great Expectations as the mentor text.',give:'A mystery twist built on a misleading narrative.'},
    {n:4,title:'Solving a mystery: argumentation',desc:'How do we construct a compelling argument? Argument structures, logical fallacies and conditionals.',give:'A persuasive case, argued in a mock trial.'},
    {n:5,title:'Creative storytelling',desc:'How do writers create suspense? Planning, drafting, editing and delivery with intonation and pacing.',give:'The first draft of your story, peer-reviewed.'},
    {n:6,title:'The final challenge',desc:'Everything together: analyse the clues, build a theory, structure your findings and defend them.',give:'Your finished case file and its defence.'}
  ],
  words:['modals of speculation (must have been)','debate language','foreshadowing','irony','cohesive devices (however, therefore)','inference-based language','passive voice','conditionals (if he had…)'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128220;', title:'Your case file',
     desc:'A narrative report or witness statements in formal, descriptive language, plus the written clues that make more than one interpretation possible.',
     spec:'Formal, descriptive register'},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'The report on the mystery',
     desc:'Present or record yourself reporting the case, using speculative language and carefully chosen detail. Do not give away the solution.',
     spec:'Live or recorded'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Reflection',
     desc:'Explain the inferences your audience should make, the clues you hid, and how your language shaped what they believed.',
     spec:'Around 100 words', range:[80,140]}
  ]
},

/* ---------------------------------------------------------------- U2 */
{
  cover:{icon:'🔬', from:'#123a5c', to:'#3f86bb', image:'assets/unit-covers/g9-u2-voices.png'},
  n:2,
  title:'Voices Shaping Our World',
  weeks:6,
  bigq:'Which discovery has most meaningfully shaped how we understand the world — and why?',
  situation:'You engage with the voices of scientific discovery: biographies, science-magazine articles, podcasts and a short drama piece. You learn to integrate factual evidence, cite sources responsibly, and use the passive and nominalisation that academic English runs on.',
  audience:'A student-led exhibition called “Discoveries That Matter”, and the school journal. You are writing as a young science communicator, not as a student doing homework.',
  criteria:[
    {n:1, text:'Formal register with appropriate use of the passive voice.'},
    {n:2, text:'Evidence integrated with basic in-text citation.'},
    {n:3, text:'A coherent thesis and a structured argument: introduction, background, findings, implications, conclusion.'}
  ],
  sequence:[
    {n:1,title:'Whose discovery changed the world?',desc:'Biographies of iconic scientists and the language of discovery. Passive voice in the present and past simple, and by + agent.',give:'Notes taken from an academic text.'},
    {n:2,title:'Voices of innovation: then and now',desc:'A contemporary innovator against a historical one. Passive in perfect and continuous tenses, connectors of contrast.',give:'A summary of a scientific biography.'},
    {n:3,title:'Whose voice gets heard today?',desc:'Media coverage of science, bias and credibility. Passive with modals: should be done, must be tested, can be proven.',give:'A Point–Evidence–Explanation argument.'},
    {n:4,title:'From notes to report',desc:'Model informative reports and abstracts. Nominalisation (discover → discovery) and paragraph cohesion.',give:'The draft of your report, peer-reviewed.'},
    {n:5,title:'Showcase and reflection',desc:'Time to finish: final report, presentation with cue cards, self-assessment against the rubric.',give:'The final report and the 4-minute talk.'},
    {n:6,title:'Public voice: beyond the classroom',desc:'Turning academic findings into a public-facing voice: register, hooks, signposting and rhetorical questions.',give:'A 250-word self-assessment journal.'}
  ],
  words:['passive voice — all tenses','passive + modals (should be done, must be tested)','by + agent','nominalisation (innovate → innovation)','analyse','hypothesise','demonstrate','evidence','claim','source'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Informative report',
     desc:'Thesis, background, findings, implications and conclusion — comparing one historical and one contemporary scientific voice, with evidence and basic citation.',
     spec:'270–320 words · academic register', range:[270,320],
     checklist:[
       {k:'thesis', t:'My introduction states which discovery I am defending', re:'.{200,}'},
       {k:'passive', t:'I use the passive voice where the academic register calls for it', re:'(was|were|has been|have been|had been|is|are|be)\\s+\\w+(ed|en)\\b'},
       {k:'nominal', t:'I use nominalisation (discovery, innovation, analysis)', re:'(discovery|innovation|analysis|observation|investigation)'},
       {k:'cite', t:'I cite at least one source', re:'(according to|\\(\\d{4}\\)|as reported|research by|study)'},
       {k:'contrast', t:'I compare the two voices explicitly', re:'(whereas|however|by contrast|in contrast|despite|unlike)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Research presentation',
     desc:'Four minutes with cue cards — never a full script. “The discovery I chose, and why it matters.”',
     spec:'4 minutes · cue cards only'}
  ]
},

/* ---------------------------------------------------------------- U3 */
{
  cover:{icon:'📲', from:'#3b1f5c', to:'#8158b8', image:'assets/unit-covers/g9-u3-identities.png'},
  n:3,
  title:'Scrolling Identities — Who Are We Online?',
  weeks:6,
  bigq:'Who are we when we go online — and who decides?',
  situation:'Every day you post, scroll, like and curate a digital version of yourself. Influencers shape opinions, algorithms decide what you watch, and one viral post can change a life. Here you step in as a digital thinker and creator: you analyse how identity is built and sold online, spot manipulation, and learn to defend your view respectfully.',
  audience:'Your classmates and other 9th-grade classes, who will judge whose vlog and essay best models balanced, ethical online communication.',
  criteria:[
    {n:1, text:'Content & ideas — a well-researched controversy with several perspectives fairly represented.'},
    {n:2, text:'Critical thinking — fact, opinion, evidence and assumption are clearly distinguished, and sources are evaluated.'},
    {n:3, text:'Language use — accurate reported speech, relative clauses, hedging and concession.'},
    {n:4, text:'Organisation — a clear essay structure and a coherent vlog narrative.'},
    {n:5, text:'Evidence — claims supported by credible sources you name.'},
    {n:6, text:'Communication — confident delivery, clear pronunciation and a respectful tone.'}
  ],
  sequence:[
    {n:1,title:'My digital footprint',desc:'How much of your online self is real? The vocabulary of self-presentation: curated, filtered, performative, authentic.',give:'A 100-word reflection: my online self vs. my real self.'},
    {n:2,title:'Influencers and the power to persuade',desc:'Why do we trust strangers on a screen? Persuasive techniques and reporting verbs: claim, suggest, warn, admit, deny.',give:'A short pitch reporting somebody else’s claim.'},
    {n:3,title:'Fake news, real consequences',desc:'How do we know what is true? The SIFT method, reported questions and commands.',give:'A misleading post rewritten as a factual one.'},
    {n:4,title:'Relative clauses: saying more in one sentence',desc:'Defining and non-defining relative clauses, with the punctuation they need.',give:'Simple sentences combined into precise ones.'},
    {n:5,title:'Writing a balanced opinion essay',desc:'FCE Writing Part 1: introduction, two body paragraphs, conclusion. Concession language.',give:'Your first draft, peer-reviewed against a checklist.'},
    {n:6,title:'The Scroll Court',desc:'A viral controversy: gather the evidence, report every viewpoint, record your response and defend your position.',give:'The essay, the vlog and your reflection.'}
  ],
  words:['reported speech','reporting verbs (claim, admit, deny, insist, warn)','defining relative clauses','non-defining relative clauses','in my view','from my perspective','it seems that','there is evidence to suggest','however','although','nevertheless','despite'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#9997;', title:'Balanced opinion essay',
     desc:'FCE Writing Part 1: introduction, two body paragraphs and a conclusion. Report what each side claims — accurately.',
     spec:'140–190 words', range:[140,190],
     checklist:[
       {k:'struct', t:'Introduction, two body paragraphs and conclusion', re:'.{600,}'},
       {k:'reported', t:'I report what others said using reporting verbs', re:'(claimed|admitted|denied|insisted|suggested|warned|argued|said that)'},
       {k:'relative', t:'I use relative clauses to add precision', re:'\\b(who|which|whose|that)\\b'},
       {k:'hedge', t:'I hedge instead of overclaiming', re:'(it seems|evidence to suggest|arguably|may|might|tends to)'},
       {k:'concede', t:'I concede the other side before disagreeing', re:'(however|although|even though|nevertheless|despite|on the other hand)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127909;', title:'Vlog response',
     desc:'Three minutes reporting the different viewpoints with reported speech and relative clauses. Respectful tone, clear pacing.',
     spec:'3 minutes'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Ethics reflection',
     desc:'The ethical choices you made while creating your content — what you included, what you left out, and why.',
     spec:'Around 100 words', range:[80,140]}
  ]
},

/* ---------------------------------------------------------------- U4 */
{
  cover:{icon:'🧠', from:'#14524b', to:'#3f9c8f', image:'assets/unit-covers/g9-u4-wellbeing.png'},
  n:4,
  title:'Mind Over Matter — The Wellbeing Generation',
  weeks:6,
  bigq:'What does it mean to be well — and how do we get there?',
  situation:'Wellbeing is not the absence of stress: it is something you build through habits, sleep, the way you talk to yourself and the way you support each other. You name emotions precisely, examine the habits that shape them, learn to give and receive advice with care, and investigate why rest matters.',
  audience:'Your community. “The Wellbeing Issue” is a real class magazine and podcast sharing evidence-based, age-appropriate advice — written for other teenagers, not for the teacher.',
  criteria:[
    {n:1, text:'Content & relevance — an evidence-based wellbeing topic that matters to a teenage reader.',
     levels:{
       C:'I write about wellbeing in general, without a clear topic and without evidence.',
       B:'I choose a topic, but I rely on my own opinion more than on what I read.',
       A:'My topic matters to a teenager my age and I back it with evidence from what I read or listened to.',
       AD:'I choose a topic others overlook and I weigh the evidence instead of just quoting it.'}},
    {n:2, text:'Language use — gerunds and infinitives, and modals of advice and speculation.',
     levels:{
       C:'I make frequent mistakes with verb patterns and I only use should.',
       B:'I usually get gerunds and infinitives right and I give advice, though always at the same strength.',
       A:'I choose the verb pattern that carries the meaning I want, and I grade my advice (had better > should > could).',
       AD:'I also use speculation modals accurately, and I separate what is certain from what is likely.'}},
    {n:3, text:'Register & tone — right for a teen magazine, and respectful about mental health.',
     levels:{
       C:'My tone jumps between too formal and too casual, and I use language that could hurt.',
       B:'My tone mostly fits, though it slips into slang or into an essay voice.',
       A:'I sound like a teen magazine: close but careful, and I write about mental health without stigma.',
       AD:'I adjust my tone within the piece — lighter in the hook, careful in the advice — and I name difficult things respectfully.'}},
    {n:4, text:'Structure — the article and the podcast each follow their shape.',
     levels:{
       C:'My ideas are there but not ordered; the podcast wanders.',
       B:'The article has a beginning and an end; the podcast covers the parts but unevenly.',
       A:'Catchy title, hooking introduction, developed body and memorable conclusion; the podcast runs hook → problem → claim → story → call to action.',
       AD:'The structure is invisible because it works: every section sets up the next one.'}},
    {n:5, text:'Engagement — the hook works and the delivery holds attention.',
     levels:{
       C:'I open by announcing my topic and I read the podcast aloud.',
       B:'My opening is interesting and my delivery is clear, though flat.',
       A:'My hook makes someone want to keep reading, and I vary pace and emphasis when I speak.',
       AD:'I hold attention all the way through, and I leave the listener with something they will repeat.'}},
    {n:6, text:'Collaboration — both speakers contribute meaningfully to the podcast.',
     levels:{
       C:'One of us does almost all of the talking.',
       B:'We both speak, but we take turns rather than build on each other.',
       A:'We both contribute real content, we listen and we respond to what the other just said.',
       AD:'The conversation goes somewhere neither of us had scripted, and we still land the call to action.'}}
  ],
  sequence:[
    {n:1,title:'The pressure cooker',desc:'Naming emotions precisely: academic emotion adjectives, intensity adverbs and cause-and-effect linkers.',give:'An 80-word description of a stressful day.'},
    {n:2,title:'Habits that shape us',desc:'Verb patterns: gerund vs. infinitive, and the verbs that change meaning depending on which you pick.',give:'The gerunds and infinitives quiz.'},
    {n:3,title:'Giving advice that actually helps',desc:'Modals of advice by strength (had better > should > could) and speculation modals.',give:'An empathetic advice-column response (100 words).'},
    {n:4,title:'Sleep, screens and the science of rest',desc:'Reading popular-science research and summarising it with reporting verbs.',give:'A research summary and the listening quiz.'},
    {n:5,title:'Writing a magazine article',desc:'Structure, hooks and register: timed drafting of an FCE Writing Part 2 article with peer review.',give:'Your article draft, self-assessed against the rubric.'},
    {n:6,title:'The Wellbeing Issue',desc:'Production and showcase of the magazine and the podcast, closing with an FCE prep block.',give:'The article, the podcast and the editor’s reflection.'}
  ],
  words:['gerunds and infinitives','verbs that change meaning (stop, remember, try)','modals of advice (had better, should, could)','speculation modals (might, may, must)','emotion adjectives','intensity adverbs','cause-and-effect linkers','reporting verbs'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128240;', title:'Magazine article',
     desc:'FCE Writing Part 2 conventions: catchy title, hook, developed body, memorable conclusion — on a wellbeing topic you choose and can back with evidence.',
     spec:'140–190 words', range:[140,190],
     checklist:[
       {k:'title', t:'It has a title that makes someone want to read it', re:'^.{5,80}\\n'},
       {k:'hook', t:'The first line hooks the reader (a question, an image, a surprise)', re:'(\\?|imagine|have you ever|picture this|what if)'},
       {k:'advice', t:'I give advice with the right strength of modal', re:'(had better|should|could|ought to|why not)'},
       {k:'verbpat', t:'I use gerunds and infinitives correctly', re:'(\\b\\w+ing\\b.{0,40}(helps|matters|works)|to\\s+\\w+\\s)'},
       {k:'evidence', t:'I bring evidence, not just my opinion', re:'(research|study|according to|scientists|evidence)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127911;', title:'Interview-style podcast',
     desc:'Five minutes in pairs, both of you contributing: hook → problem → expert claim → personal story → call to action.',
     spec:'5 minutes · in pairs'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Editor’s reflection',
     desc:'The process and what you learned making the issue.',
     spec:'Around 100 words', range:[80,140]}
  ]
},

/* ---------------------------------------------------------------- U5 */
{
  cover:{icon:'⚡', from:'#6b3a12', to:'#c9772f', image:'assets/unit-covers/g9-u5-technology.png'},
  n:5,
  title:'The Double-Edged Sword: Technology, Society and the Environment',
  weeks:5,
  bigq:'What are the pros and cons of technology at both personal and social levels, and what environmental damage is caused by AI?',
  situation:'Technology sits at the centre of today’s biggest opportunities and problems — from misinformation to the environmental cost of artificial intelligence. You act as a critical researcher and advocate: you analyse articles, debates and reports, compare arguments, and produce your own written and spoken contribution.',
  audience:'Not only your teacher. You are writing and speaking as an informed citizen taking a position in a real debate — the same one governments, companies and scientists are having about AI, energy and e-waste.',
  criteria:[
    {n:1, text:'Speaking & listening — present and defend a viewpoint.',
     levels:{
       C:'I give an opinion but I struggle to explain why, and I read from my notes.',
       B:'I present my viewpoint with some examples. I answer questions, though not always spontaneously.',
       A:'I organise my ideas logically, use topic vocabulary, give examples and respond to others respectfully and spontaneously.',
       AD:'I defend my position persuasively, take counterarguments on live, and judge how reliable or biased what others claim is.'}},
    {n:2, text:'Reading — analyse how a text argues.',
     levels:{
       C:'I understand what a text is about, but not the position the writer takes.',
       B:'I identify the main thesis and some of the details that support it.',
       A:'I identify thesis, evidence, tone and bias, and I pull out evidence I can use in my own work.',
       AD:'I compare how different texts present the same issue and explain why they differ.'}},
    {n:3, text:'Writing — produce a structured analytical report.',
     levels:{
       C:'I write about the topic, but with no clear thesis and no structure.',
       B:'I have a thesis and some arguments, but the evidence or the connectors are thin.',
       A:'Clear thesis, logical organisation, arguments backed by evidence, at least one counterargument, formal style and advanced connectors.',
       AD:'My argument is nuanced: I anticipate objections, and my vocabulary and grammar are precise throughout.'}}
  ],
  sequence:[
    {n:1,title:'Introduction to pros and cons of technology',desc:'Identify and categorise the pros and cons of technology at three levels: personal, social and environmental.',give:'A short spoken and written reflection using the unit vocabulary.'},
    {n:2,title:'Gathering evidence and structuring arguments',desc:'Structure an argument, tell a strong point from a weak one, and present it out loud with clarity.',give:'Three arguments with the evidence that supports each one.'},
    {n:3,title:'Writing analytical paragraphs',desc:'Build short analytical paragraphs using evidence from the readings on the environmental impact of AI.',give:'Two analytical paragraphs — the core of your report.'},
    {n:4,title:'From paragraphs to reports and debates',desc:'Expand to a report of two or three paragraphs, and take part in a structured debate using evidence.',give:'The first full draft of your report.'},
    {n:5,title:'Finalising and presenting reports',desc:'Revise and finalise the report, present your findings orally and reflect on your learning.',give:'The final report and the presentation.'}
  ],
  words:['artificial intelligence','algorithm','data','efficiency','productivity','inequality','ethics','sustainability','environment','energy consumption','carbon footprint','e-waste','progress','responsibility','consequences'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Analytical report',
     desc:'Pros and cons of technology including its environmental cost. Thesis, arguments backed by evidence, and at least one counterargument.',
     spec:'300–350 words · formal register', range:[300,350],
     checklist:[
       {k:'thesis', t:'My first paragraph states my thesis clearly', re:'.{200,}'},
       {k:'evidence', t:'Every argument is supported with evidence or an example', re:'(for example|for instance|according to|research|study|data show)'},
       {k:'counter', t:'I include at least one counterargument', re:'(however|although|critics|opponents|on the other hand|some argue)'},
       {k:'linkers', t:'I use advanced connectors (nevertheless, moreover, in contrast)', re:'(nevertheless|moreover|in contrast|furthermore|on the other hand)'},
       {k:'env', t:'I mention the environmental cost of AI (energy, carbon footprint or e-waste)', re:'(carbon|e-waste|energy consumption|emissions|environmental)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Oral presentation',
     desc:'Present your findings on AI and technology’s impact, defend your position and answer questions from the floor.',
     spec:'Speak from notes, not from a script'}
  ]
},

/* ---------------------------------------------------------------- U6 */
{
  cover:{icon:'🚀', from:'#1e2b6b', to:'#5566c4', image:'assets/unit-covers/g9-u6-future.png'},
  n:6,
  title:'Future Visions',
  weeks:5,
  bigq:'What kind of future do we want to create, and what can we learn from the present to build it?',
  situation:'You hear warnings about the future all the time — pollution, artificial intelligence, overpopulation — but you rarely get to imagine your own vision of what the future could look like. In this final unit you analyse different ideas about the future, evaluate arguments, and present your own report on possible futures for humanity, society or the planet.',
  audience:'The Future Forum: the class exchanges visions and reflections, and you have to make yours stand up to the others.',
  criteria:[
    {n:1, text:'Expresses clear ideas with logical organisation, in persuasive and formal language.'},
    {n:2, text:'Identifies central themes and arguments, notes key evidence and the author’s purpose, and compares viewpoints accurately.'},
    {n:3, text:'Structures the text with introduction, analysis and conclusion, using connectors and evidence correctly.'},
    {n:4, text:'Demonstrates insight and balanced reasoning, and uses visual aids or devices effectively.'}
  ],
  sequence:[
    {n:1,title:'Revisiting technology’s impact',desc:'Listening and summarising main ideas; reading short reports and noting the arguments.',give:'A chart of personal, social and environmental impacts.'},
    {n:2,title:'Evaluating perspectives',desc:'Identifying claims, evidence and bias in texts, and discussing responsible use.',give:'Annotated reading and a group discussion summary.'},
    {n:3,title:'Structuring analytical writing',desc:'Transitions and ellipses; writing topic sentences and thesis statements.',give:'The outline of your analytical report.'},
    {n:4,title:'Writing and revising reports',desc:'Drafting and peer-reviewing the analytical report.',give:'The final analytical report.'},
    {n:5,title:'Speaking for awareness',desc:'Presenting a short talk that summarises your findings and your reflections.',give:'The oral presentation and your self-evaluation.'}
  ],
  words:['future','progress','innovation','sustainability','technology','perspective','vision','argument','evidence','solution','consequence','reflection'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Analytical report',
     desc:'Your vision of a possible future for humanity, society or the planet — argued with evidence, in introduction, analysis and conclusion.',
     spec:'400–450 words', range:[400,450],
     checklist:[
       {k:'thesis', t:'I state what future I am arguing for', re:'.{300,}'},
       {k:'compare', t:'I compare more than one viewpoint', re:'(whereas|by contrast|others argue|some believe|on the other hand)'},
       {k:'evidence', t:'I note key evidence and where it comes from', re:'(according to|research|study|evidence|data)'},
       {k:'connect', t:'I use connectors to hold the argument together', re:'(therefore|consequently|moreover|nevertheless|furthermore|as a result)'},
       {k:'concl', t:'I close with what we should learn from the present', re:'(in conclusion|to sum up|ultimately|overall)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Future Forum talk',
     desc:'Three minutes summarising your findings and your reflection, with visual aids if they help.',
     spec:'3 minutes'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Reflection paragraph',
     desc:'What changed in how you see the future after this unit.',
     spec:'Around 100 words', range:[80,140]}
  ]
}
,

/* ============================================================ PILOTO 2027
   Unidades 5 y 6 PILOTO de 9.o. No sustituyen a las unidades 5 y 6
   planificadas, que siguen intactas arriba tal como estan en Toddle: son
   unidades APARTE, con el mismo contenido curricular y otra forma de
   trabajarlo. Van cerradas al alumno; las conducen profesor y admin.

   Que las hace un proyecto y no una unidad con actividades:
     · hay un CLIENTE fuera del aula que recibe el producto y decide algo,
     · el producto existe fuera del colegio y no es un examen,
     · cada semana entrega una PIEZA del producto, no un tema visto,
     · dos areas comparten el producto y la nota (nivel 2),
     · la rubrica esta a la vista desde la semana 1,
     · lo que se practica de Cambridge es lo que el producto exige.
   El numero interno (105/106) evita chocar con la unidad planificada; lo
   que se muestra es `label`. -------------------------------------------- */
{
  cover:{icon:'🔌', from:'#123f4f', to:'#3f9bb0'},
  n:105,
  label:'5 · piloto', pilot:true,
  title:'Does Our School Run on Data?',
  weeks:5,
  bigq:'What does artificial intelligence really cost our school — and what should we do about it?',
  situation:'The school runs on screens: tablets in class, an AI assistant here, a cloud folder there. All of it costs energy, water and money somewhere, and nobody at NIS has ever measured it. The leadership team has to write a policy on how AI and screens are used next year, and they do not have the data. You are going to get it for them. You audit what really happens in this building, you compare it with what the research says, and you hand them a proposal they can act on — or reject, if you have not argued it well enough.',
  audience:'The leadership team of NIS. They will read your proposal to write next year’s policy, and they will ask you questions you have not rehearsed.',
  client:'NIS leadership team · they write the policy',
  reader:{title:'The Time Machine', series:'Vicens Vives · Reading & Training Step Three B1.2', term:3, inPortal:false,
          note:'Obra del trimestre en el Plan Lector de 9.o. Todavía sin reader en el portal: se lee en papel.'},
  exam:{target:'b2first',
        themes:['technology','environment','society','ethics','education'],
        grammar:['proposal register: I would recommend, it is advisable to','passive for processes','concession: although, despite, even though','hedging: may, might, tends to','advanced connectors: nevertheless, moreover, in contrast'],
        extra:['artificial intelligence','algorithm','data centre','energy consumption','carbon footprint','e-waste','screen time','policy','trade-off','evidence']},
  areas:[{area:'science', level:2},{area:'ict', level:2}],
  criteria:[
    {n:1, text:'Proposal — write something the leadership team can act on.',
     levels:{
       C:'I describe the problem but I do not ask for anything specific.',
       B:'I make a recommendation, but the reader has to guess what to do first.',
       A:'Clear recommendations in proposal register, ordered, each one justified with my evidence.',
       AD:'I anticipate the objection the leadership team will actually raise, and I answer it before they ask.'}},
    {n:2, text:'Evidence — use your own data, not only what the internet says.',
     levels:{
       C:'I quote articles; I have not measured anything myself.',
       B:'I have some data of my own but I do not say how I got it.',
       A:'My own measurements, the method explained, and the published research used to put them in context.',
       AD:'I say what my data cannot prove, and where a better measurement would be needed.'}},
    {n:3, text:'Defence — hold your position in front of people who can say no.',
     levels:{
       C:'I read my proposal out loud.',
       B:'I present it and answer easy questions.',
       A:'I speak from notes, take questions I did not expect, and build on what my teammates say.',
       AD:'I change my mind out loud when the objection is good, and say why — without losing the argument.'}}
  ],
  sequence:[
    {n:1,title:'The brief',desc:'The leadership team explains what policy they have to write and what they are missing. Teams form and each one takes one question of the audit. The rubric is on the table from today.',
     give:'Your audit question and the team’s plan — what you will measure and how.',
     across:{
       science:'Framing a measurable question and the variables behind it.',
       english:'Reading the brief and turning it into an audit question.',
       ict:'What can be logged in this school: devices, accounts, storage, consumption.'},
     sessions:[
      {s:1,title:'The brief from the leadership team',
       objective:'Understand what the school actually needs, and turn it into something measurable.',
       view:[
         'A member of the leadership team explains for ten minutes what policy they have to write next year and what data they are missing.',
         'Questions from the floor. Write down what they NEED, not what you assume they need.',
         'The brief goes up on the wall. Everything this unit produces has to serve it.',
         'First reaction in pairs: which part of this can we actually measure in this building?'],
       levels:{
         'A2':{task:'Complete the brief sheet: what the school wants, what it does not have, what we could count.',
               help:'Sheet with three boxes and a word bank: policy, measure, count, device, screen time.'},
         'B1':{task:'Summarise the brief in five sentences and list three things you could count at NIS.',
               help:'Frame: "The leadership team needs… because…"'},
         'B2':{task:'Summarise the brief and identify the question behind it that nobody has asked yet.',
               help:'A brief always hides an assumption. Find it.'},
         'C1':{task:'Summarise the brief and say what would count as an answer good enough to act on.',
               help:'If your data cannot change a decision, it is not an answer.'}}},
      {s:2,title:'What can actually be measured',
       objective:'Tell a good research question from an unmeasurable one.',
       view:[
         'Six questions on the board. Three can be measured this month, three cannot. Which are which?',
         'The rule: if you cannot say what number comes out at the end, it is not a question yet.',
         'Each team drafts its own and passes it to the team on the right.',
         'The other team tries to break it: how would you measure THAT, exactly?'],
       levels:{
         'A2':{task:'Choose your question from three options and write what number will come out of it.',
               help:'Three questions ready, and the sentence "At the end I will have a number that says ____."'},
         'B1':{task:'Write your own audit question and say what unit the answer will be in.',
               help:'Minutes, kilowatt-hours, devices, litres. Choose one.'},
         'B2':{task:'Write your question and explain why it can be measured with what we have.',
               help:'What instrument, what access, what permission.'},
         'C1':{task:'Write your question, and rewrite the weakest of the three you were given.',
               help:'Say what made it weak.'}}},
      {s:3,title:'Building the plan',
       objective:'Turn the question into a plan somebody else could carry out.',
       view:[
         'Five columns on the board: what, where, when, who, with what.',
         'Each team fills in its own plan. Anything vague gets a red mark.',
         'The awkward question: what permission do we need, and who asks for it?',
         'Rehearse in one sentence what you will be doing next Tuesday at 10am.'],
       levels:{
         'A2':{task:'Complete the five columns of the plan with the options given.',
               help:'Plan template with examples in the first row.'},
         'B1':{task:'Write your plan in five steps, saying who does each one.',
               help:'Model plan for a different question, to follow.'},
         'B2':{task:'Write your plan including what you will do if the measurement fails.',
               help:'Something always fails. Which part of yours is most fragile?'},
         'C1':{task:'Write the plan and justify why this measurement answers the brief.',
               help:'Quote the brief on the wall.'}}},
      {s:4,title:'The plan under attack',
       objective:'Fix the plan before it meets reality.',
       view:[
         'Swap plans between teams. You have fifteen minutes to find three holes in theirs.',
         'Read out the best hole found. The class votes on whether it is fatal or fixable.',
         'Each team corrects its plan with what was found.',
         'Hand in: the corrected plan, with the corrections visible.'],
       levels:{
         'A2':{task:'Mark three problems in the plan you received and correct one in yours.',
               help:'Checklist of the four most common problems.'},
         'B1':{task:'Write the three holes you found and how your team fixed the one in yours.',
               help:'Frame: "They pointed out that… so now we…"'},
         'B2':{task:'Write the critique you gave and the change you made, saying why it improves the plan.',
               help:'A critique that does not propose an alternative is only a complaint.'},
         'C1':{task:'Write the critique, the change, and what you decided NOT to change, with your reason.',
               help:'Not every objection has to be accepted — but you have to answer it.'}}}
     ]},
    {n:2,title:'What is already known',desc:'Reading the research on the energy and water cost of AI, and starting The Time Machine. Telling a solid source from a loud one.',
     give:'Three sources, classified, with what each one lets you claim.',
     across:{
       science:'Evaluating scientific evidence: what a study measures and what it concludes.',
       english:'Reading to evaluate reliability and bias. The Time Machine, chapter one.',
       ict:'Where the energy and water figures of a data centre come from.'},
     sessions:[
      {s:1,title:'What the research says about AI and energy',
       objective:'Read two sources that disagree, and work out where the disagreement comes from.',
       view:[
         'Two texts on the cost of AI reaching opposite conclusions. Read both, in silence.',
         'For each: who wrote it, who paid for it, what exactly it measured.',
         'The key move: they do not disagree about the facts, they measure different things.',
         'One sentence each: what can I claim using this source?'],
       levels:{
         'A2':{task:'Complete the source table: who, when, what it measures, one fact.',
               help:'The two texts shortened, with the key data highlighted.'},
         'B1':{task:'Summarise what each source claims and say which you trust more, with a reason.',
               help:'Frame: "According to… I trust this one because…"'},
         'B2':{task:'Explain where the disagreement between the two sources comes from.',
               help:'Look at what each one measures, not at what each one concludes.'},
         'C1':{task:'Evaluate both sources and say what neither of them lets you claim.',
               help:'The gap between them is where your own measurement goes.'}}},
      {s:2,title:'Reliable or loud?',
       objective:'Judge a source you found yourself.',
       view:[
         'Each team brings a source found outside class. On the board, all of them.',
         'Four tests: who says it, how they know, when, and who benefits.',
         'The uncomfortable one: a source that says what we wanted to hear.',
         'File three sources with what each one lets your team claim.'],
       levels:{
         'A2':{task:'Classify three sources into reliable / not sure, using the four tests.',
               help:'The four tests as a checklist.'},
         'B1':{task:'File your three sources with one usable fact from each.',
               help:'Include where you found it.'},
         'B2':{task:'File your sources and explain why you discarded one.',
               help:'Discarding well is part of the work.'},
         'C1':{task:'File your sources and rank them by reliability FOR YOUR QUESTION.',
               help:'A source can be excellent and useless for what you are asking.'}}},
      {s:3,title:'The Time Machine, chapter one',
       objective:'Read Wells imagining a future out of the technology of his own day.',
       view:[
         'Read the opening aloud. Wells writing in 1895 about the year 802,701.',
         'What does he get right about how technology changes a society? What does he invent?',
         'Vocabulary of the unit that appears in the chapter: progress, consequence, machine.',
         'Ten minutes of silent reading. This is the book of the term.'],
       levels:{
         'A2':{task:'Answer five comprehension questions and copy three words of the unit that appear in the text.',
               help:'Questions with two options each.'},
         'B1':{task:'Answer the questions and write what Wells assumes about progress.',
               help:'Frame: "Wells thinks that…"'},
         'B2':{task:'Explain what Wells gets right and what he invents, with evidence from the text.',
               help:'Quote at least once.'},
         'C1':{task:'Explain what Wells assumes about progress and whether we still assume it.',
               help:'Connect it to the debate about AI.'}}},
      {s:4,title:'From reading to your own claim',
       objective:'Turn what you read into something your audit can stand on.',
       view:[
         'On the board, everything the class can now claim with sources.',
         'And what it cannot: the list of things nobody has measured here.',
         'That second list is your audit. Confirm your question against it.',
         'Hand in: three sources, classified, with what each one supports.'],
       levels:{
         'A2':{task:'Complete the sheet: what I can say with sources, what I need to measure.',
               help:'Two columns and examples.'},
         'B1':{task:'Write what your sources support and what you will have to measure yourself.',
               help:'Useful: "The research shows… but nobody has measured…"'},
         'B2':{task:'Write it, and say what your measurement adds to what is already published.',
               help:'If it adds nothing, change the question.'},
         'C1':{task:'Write it, and identify which of your claims is weakest and why.',
               help:'Knowing the weak point before somebody else finds it.'}}}
     ]},
    {n:3,title:'Measuring this building',desc:'The audit itself, with Science and ICT: screen minutes, devices, energy, what gets thrown away. Real numbers from NIS.',
     give:'Your dataset and the method you followed.',
     across:{
       science:'Measurement protocol and control of variables during the audit.',
       english:'Describing the method in the passive, so it can be repeated.',
       ict:'Collecting and cleaning the school’s data. Averages per student and per room.'},
     sessions:[
      {s:1,title:'The protocol, agreed',
       objective:'Make sure five teams measure the same way.',
       view:[
         'If each team measures differently, the data cannot be put together. Demonstration with two rulers.',
         'The class agrees ONE protocol: same instrument, same moment, same unit.',
         'Roles inside the team: who measures, who writes, who checks.',
         'Rehearse the protocol in class before going out.'],
       levels:{
         'A2':{task:'Complete the protocol sheet and write down your role.',
               help:'Protocol drafted, with the gaps to fill.'},
         'B1':{task:'Write the agreed protocol in your own words, in the order it will be done.',
               help:'Sequencers: first, then, after that.'},
         'B2':{task:'Write the protocol so that a team that was absent could follow it.',
               help:'The passive is useful: "readings are taken every…"'},
         'C1':{task:'Write the protocol and the one point where you expect it to break.',
               help:'And what you would do when it does.'}}},
      {s:2,title:'Out into the school',
       objective:'Take the real data of the building.',
       view:[
         'Out with Science and ICT: devices, screen minutes, consumption, what gets thrown away.',
         'Everything gets written down at the moment, not from memory afterwards.',
         'Something will come out higher than expected. Do not smooth it.',
         'Back in class: everything onto the shared sheet before the bell.'],
       levels:{
         'A2':{task:'Complete your measurement table with the readings taken.',
               help:'Table with the columns and units ready.'},
         'B1':{task:'Complete your table and note anything unusual you saw.',
               help:'A note is worth more than a memory.'},
         'B2':{task:'Complete your table and record the conditions of each reading.',
               help:'Time, place, who was there.'},
         'C1':{task:'Complete your table and mark any reading you would not defend, saying why.',
               help:'Honesty here is worth more than a clean table.'}}},
      {s:3,title:'Is this number trustworthy?',
       objective:'Clean the data without hiding what it says.',
       view:[
         'The pooled data on screen. Which readings look wrong?',
         'The rule of the unit: an outlier is investigated, not deleted.',
         'With Maths: totals and averages, per student and per classroom.',
         'Which single figure would make the leadership team stop reading and look up?'],
       levels:{
         'A2':{task:'Work out the total and the average of your data and circle the highest figure.',
               help:'The operations set out.'},
         'B1':{task:'Work out totals and averages and write two sentences about what the data shows.',
               help:'On average, in total, per student.'},
         'B2':{task:'Present your data and explain how you obtained it, so it could be repeated.',
               help:'The method in three sentences.'},
         'C1':{task:'Present the data, the method and the limitations of your measurement.',
               help:'Where would a better instrument be needed, and why?'}}},
      {s:4,title:'Making the number visible',
       objective:'Choose how the leadership team will see this.',
       view:[
         'Three ways of showing the same figure. Which one is understood in five seconds?',
         'With ICT: build the chart of your headline figure.',
         'The trap: a chart that exaggerates is a chart that gets you caught.',
         'Hand in: the dataset, the method and the chart.'],
       levels:{
         'A2':{task:'Build the chart of your data with the model given, and label it.',
               help:'Chart with axes ready.'},
         'B1':{task:'Build your chart and write the sentence that goes under it.',
               help:'The caption says what the chart cannot.'},
         'B2':{task:'Build your chart choosing the type, and justify the choice.',
               help:'Why that type and not another.'},
         'C1':{task:'Build the chart and explain what it makes visible and what it hides.',
               help:'Every representation chooses. Say what yours chose.'}}}
     ]},
    {n:4,title:'From data to a recommendation',desc:'Turning numbers into something somebody can decide on. Drafting the proposal in the notebook.',
     give:'The draft of the proposal, handwritten.',
     across:{
       science:'From data to a defensible claim, and what the data does not support.',
       english:'Proposal register, concession and hedging: recommending without overclaiming.',
       ict:'Presenting the figures so a non-technical reader understands them.'},
     sessions:[
      {s:1,title:'A number is not a recommendation',
       objective:'Turn a finding into something somebody can decide on.',
       view:[
         'Real example: a figure with no recommendation, and the same figure with one. What changed?',
         'Proposal register: I would recommend, it is advisable to, a first step would be.',
         'Each team writes three recommendations from its own data.',
         'Order them: the cheap one first, the ambitious one last.'],
       levels:{
         'A2':{task:'Complete three recommendations with the frames given, using your figures.',
               help:'Three frames and your data.'},
         'B1':{task:'Write three recommendations of your own, each justified with your data.',
               help:'One sentence of recommendation, one of justification.'},
         'B2':{task:'Write your recommendations in proposal register, ordered by cost.',
               help:'It is advisable to, a first step would be, in the longer term.'},
         'C1':{task:'Write your recommendations and say what each one would cost the school.',
               help:'A recommendation with no cost has not been thought through.'}}},
      {s:2,title:'The objection they will raise',
       objective:'Meet the counterargument before the panel does.',
       view:[
         'Role-play: the teacher plays the leadership team and objects to each recommendation.',
         'Note the objection you could not answer. That is the important one.',
         'Concession language: although, despite, even though, it could be argued.',
         'Rewrite your weakest recommendation answering that objection.'],
       levels:{
         'A2':{task:'Match each objection with an answer, and copy the one that affects your team.',
               help:'Objections and answers to match up.'},
         'B1':{task:'Write the objection you received and your answer to it.',
               help:'Frame: "It could be argued that… However…"'},
         'B2':{task:'Integrate the objection into your recommendation instead of answering it separately.',
               help:'Although, despite, even though.'},
         'C1':{task:'Answer the objection and say under what conditions the objection would be right.',
               help:'Conceding the exact point makes the rest stronger.'}}},
      {s:3,title:'Drafting the proposal',
       objective:'Write the whole thing, by hand.',
       view:[
         'Structure on the board: context, what we found, what we recommend, what it costs.',
         'Draft in the notebook. Crossings-out included — this is where the thinking shows.',
         'Halfway: read your first paragraph to a partner. Do they know what you want?',
         'Finish the draft. Nothing is typed up today.'],
       levels:{
         'A2':{task:'Write your proposal with the four sections given, using your figures.',
               help:'The four openings printed.'},
         'B1':{task:'Write your proposal with recommendations and evidence, 300–350 words.',
               help:'Model proposal on another topic.'},
         'B2':{task:'Write your proposal in proposal register, with a counterargument included.',
               help:'Nevertheless, moreover, in contrast.'},
         'C1':{task:'Write the proposal anticipating the objection and hedging what your data does not prove.',
               help:'May, might, tends to, suggests.'}}},
      {s:4,title:'Feedback against the rubric',
       objective:'Improve it with the criteria in front of you.',
       view:[
         'The rubric on the table. Each pair reads the other’s against criterion 1.',
         'Not "I liked it": which level is it at, and what is missing to move up one.',
         'Twenty minutes of silent rewriting.',
         'Hand in: the revised draft, with the changes marked.'],
       levels:{
         'A2':{task:'Mark on the rubric which level your text is at and correct one thing.',
               help:'The rubric simplified into a checklist.'},
         'B1':{task:'Assess your partner’s text against two criteria and rewrite your weakest paragraph.',
               help:'Say what level and what is missing.'},
         'B2':{task:'Assess against the three criteria and rewrite justifying each change.',
               help:'A change with no reason is a change at random.'},
         'C1':{task:'Assess, rewrite, and say which criterion you will not manage to reach and why.',
               help:'Knowing your ceiling is also a result.'}}}
     ]},
    {n:5,title:'Facing the leadership team',desc:'Final version, and the defence in front of the people who will write the policy.',
     give:'The proposal handed in and the defence.',
     across:{
       science:'Limitations of the measurement, stated openly.',
       english:'B2 First Writing Part 2 (proposal) and Speaking Parts 3-4: defending it live.',
       ict:'The final version of the figures and their visualisation for the panel.'},
     sessions:[
      {s:1,title:'The final version',
       objective:'Close the text and check every figure.',
       view:[
         'The final version is not the draft typed up. Read it aloud once before touching it.',
         'Check every figure against your table. One wrong number sinks the whole proposal.',
         'Last read for register: does it sound like a proposal or like an essay?',
         'Hand in: printed for the panel, uploaded to the portal.'],
       levels:{
         'A2':{task:'Copy your corrected proposal neatly and check your three figures.',
               help:'Your text with the corrections marked.'},
         'B1':{task:'Produce the final version and check figures, units and sources.',
               help:'Checklist of four things to verify.'},
         'B2':{task:'Produce the final version and check that every claim is supported.',
               help:'Underline each claim and find its evidence.'},
         'C1':{task:'Produce the final version and check that no claim goes beyond your data.',
               help:'The most common error at this level is claiming too much.'}}},
      {s:2,title:'Rehearsing the defence',
       objective:'Prepare to speak from notes, not from a script.',
       view:[
         'Six minutes, timed. Whoever reads it out gets stopped.',
         'The three questions they will certainly ask. Prepare them.',
         'And the one you would rather they did not ask. Prepare that one especially.',
         'Rehearse in pairs, swapping roles: one presents, the other objects.'],
       levels:{
         'A2':{task:'Prepare six cards with the key sentences of your defence.',
               help:'Structure of the six cards given.'},
         'B1':{task:'Prepare your notes and rehearse the three likely questions.',
               help:'The three questions, listed.'},
         'B2':{task:'Prepare the defence and the answer to the question you would rather avoid.',
               help:'That one first.'},
         'C1':{task:'Prepare the defence to hold the position under pressure, and to concede if the objection is good.',
               help:'Say why you concede — that is what makes it strength and not surrender.'}}},
      {s:3,title:'Facing the leadership team',
       objective:'Defend the proposal in front of the people who will write the policy.',
       view:[
         'Six minutes per team, then questions. The panel is real.',
         'From notes. They will interrupt.',
         'They ask something you did not prepare: answer it, or say honestly that you do not know.',
         'While others present, note the best question of the session.'],
       levels:{
         'A2':{task:'Present with your cards and answer one question.',
               help:'Your six cards.'},
         'B1':{task:'Present your defence and answer the questions from the panel.',
               help:'Your notes.'},
         'B2':{task:'Present, defend, and take a question you had not prepared.',
               help:'Saying "I do not know, but I would find out like this" is a good answer.'},
         'C1':{task:'Present, defend, and concede well if the objection deserves it.',
               help:'Say what you would change and why.'}}},
      {s:4,title:'What happened with it',
       objective:'Close the loop: what the school did with your work.',
       view:[
         'The leadership team says which recommendations they are taking forward, and why not the others.',
         'That is not a mark: it is the real result of the unit.',
         'Individual reflection: what would you do differently in the next audit?',
         'And the unit question, one last time: what does AI really cost this school?'],
       levels:{
         'A2':{task:'Complete the reflection: what went well, what did not, what I would change.',
               help:'Three openings printed.'},
         'B1':{task:'Write your reflection on the audit and on your own defence.',
               help:'Be specific: which moment, and why.'},
         'B2':{task:'Write your reflection, including what you learned from an objection you received.',
               help:'What did you think before, and what do you think now?'},
         'C1':{task:'Write your reflection, and what you would measure differently to answer better.',
               help:'The next question is always better than the first.'}}}
     ]}
  ],
  words:['artificial intelligence','algorithm','data centre','energy consumption','carbon footprint','e-waste','screen time','policy','trade-off','evidence','I would recommend','it is advisable to','although','despite','nevertheless','moreover','in contrast','tends to','may','might'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128203;', title:'Proposal to the leadership team',
     desc:'What you measured, what it means, and what you are asking NIS to do next year. Written to be acted on, not to be marked.',
     spec:'300–350 words · proposal register', range:[300,350],
     checklist:[
       {k:'ask', t:'I make a specific recommendation, not a general complaint', re:'(i would recommend|we recommend|it is advisable|the school should|we propose)'},
       {k:'own', t:'I use data we measured ourselves at NIS', re:'(we measured|we counted|our data|we recorded|at nis|in our school)'},
       {k:'numbers', t:'There are real figures in it', re:'[0-9]+ ?(%|kwh|minutes|hours|devices|litres|liters|kg)'},
       {k:'source', t:'I bring in published research as well', re:'(according to|research|study|report|source)'},
       {k:'counter', t:'I answer the objection they will raise', re:'(however|although|despite|some may argue|it could be objected|even though)'},
       {k:'register', t:'I write in proposal register, not as an essay', re:'(recommend|advisable|should be|we suggest|first step)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Defence before the panel',
     desc:'Present the audit and defend the recommendation in front of the leadership team. Notes, not a script — they will interrupt.',
     spec:'6 minutes plus questions'}
  ]
},
{
  cover:{icon:'🔭', from:'#2a1f66', to:'#6e63c6'},
  n:106,
  label:'6 · piloto', pilot:true,
  title:'NIS 2040',
  weeks:6,
  bigq:'What kind of future is worth arguing for — and can you make somebody believe it?',
  situation:'Everybody has heard the warnings: the climate, the machines, the jobs that will not exist. Almost nobody is asked what they would actually build instead. Your team takes one system — how we move, how we eat, how we work, how we learn — and builds a defensible vision of it in 2040: not a fantasy, and not a catastrophe either. Something you can hold up with evidence in front of a room full of families at the end of the year.',
  audience:'The families and the school at the closing exhibition. They did not come to be taught — they came to see, and they can walk away.',
  client:'Families and school · NIS 2040 exhibition',
  reader:{title:'The Time Machine', series:'Vicens Vives · Reading & Training Step Three B1.2', term:3, inPortal:false,
          note:'La misma obra del trimestre. Aquí encaja de lleno: es exactamente el ejercicio de imaginar un futuro y defenderlo.'},
  exam:{target:'b2first',
        themes:['future','innovation','society','environment','work'],
        grammar:['future forms: will, going to, future perfect','second conditional','speculation: could, might, is likely to','discourse markers for argument'],
        extra:['vision','scenario','trend','projection','consequence','trade-off','sustainable','automation','plausible','far-fetched']},
  areas:[{area:'globalperspectives', level:2},{area:'art', level:1}],
  criteria:[
    {n:1, text:'Vision — argue for a future, do not just describe one.',
     levels:{
       C:'I describe what might happen, with no position of my own.',
       B:'I take a position, but the reasons are general.',
       A:'A clear vision, built from present evidence, with the trade-offs named.',
       AD:'I defend a future that costs something, and I say who pays for it.'}},
    {n:2, text:'Evidence — start from what is happening now.',
     levels:{
       C:'My future is invented from scratch.',
       B:'I mention one or two present trends.',
       A:'Every claim about 2040 is anchored in something measurable today.',
       AD:'I distinguish what is likely from what is merely possible, and say which is which.'}},
    {n:3, text:'Holding the room — speak to people who owe you nothing.',
     levels:{
       C:'I recite what I wrote.',
       B:'I present clearly to people who are listening politely.',
       A:'I hold attention, use my visual, and answer what I am asked.',
       AD:'People stop to listen who were walking past.'}}
  ],
  sequence:[
    {n:1,title:'Choosing the system',desc:'Movement, food, work or learning. What that system looks like today at NIS and in Lima, with numbers.',
     give:'Your system, and its present state in five facts.',
     across:{
       english:'Reading for facts, and distinguishing a fact from an opinion.',
       art:'Visual references: how a future has been imagined before.',
       globalperspectives:'Characterising a system today, with evidence and not with impressions.'},
     sessions:[
      {s:1,title:'Four systems',
       objective:'Choose the system your team will argue about.',
       view:[
         'Four systems on the board: how we move, how we eat, how we work, how we learn.',
         'Each one is already changing. Where can you see it in Lima?',
         'Teams form and claim one system each.',
         'First question: what would you change about yours if you could?'],
       levels:{
         'A2':{task:'Choose your system and write three things you know about it today.',
               help:'Three sentences started.'},
         'B1':{task:'Choose your system and explain why it matters to you.',
               help:'Frame: "I chose… because…"'},
         'B2':{task:'Choose your system and identify what is already changing in it.',
               help:'With one example.'},
         'C1':{task:'Choose your system and say what tension inside it forces it to change.',
               help:'Name the two forces.'}}},
      {s:2,title:'Fact or opinion',
       objective:'Build on evidence, not on impressions.',
       view:[
         'Ten statements about the future. Which are facts and which opinions?',
         'A projection is neither: it is a fact plus an assumption.',
         'Where do the figures about your system come from?',
         'Bring five facts, with their source.'],
       levels:{
         'A2':{task:'Sort ten statements into fact and opinion.',
               help:'Statements listed.'},
         'B1':{task:'Sort them and rewrite two opinions as checkable facts.',
               help:'Say what you would check.'},
         'B2':{task:'Explain the difference between a fact, an opinion and a projection.',
               help:'With an example of each.'},
         'C1':{task:'Take a projection about your system and name the assumption inside it.',
               help:'What has to hold for it to be true?'}}},
      {s:3,title:'The state of play',
       objective:'Describe your system today, with numbers.',
       view:[
         'Five facts about your system today, in Lima, with figures.',
         'Not "a lot of people": how many, and according to whom.',
         'Compare with another country if you can.',
         'File your five facts.'],
       levels:{
         'A2':{task:'Complete the fact sheet with the data given.',
               help:'Sheet with five rows.'},
         'B1':{task:'Write five facts with their source.',
               help:'Each one with a number.'},
         'B2':{task:'Present the state of your system today and what surprised you.',
               help:'And why it surprised you.'},
         'C1':{task:'Characterise your system today and say which figure is least reliable.',
               help:'And why.'}}},
      {s:4,title:'Visual references',
       objective:'See how the future has been imagined before.',
       view:[
         'With Creative Arts: five images of the future from different decades.',
         'What did each one get right, and what does it say about its own time?',
         'A picture of the future is always a picture of the present.',
         'Which visual language will you use?'],
       levels:{
         'A2':{task:'Match five images with their decade and choose your favourite.',
               help:'Images and dates.'},
         'B1':{task:'Describe two images and say what each got right.',
               help:'Two sentences each.'},
         'B2':{task:'Analyse what one image reveals about the time that produced it.',
               help:'Be specific.'},
         'C1':{task:'Analyse two images and explain what your own will reveal about 2026.',
               help:'Unavoidably.'}}}
     ]},
    {n:2,title:'Reading the future',desc:'The Time Machine and today’s projections side by side. What a trend is and where it breaks.',
     give:'Three trends and the evidence behind each one.',
     across:{
       english:'The Time Machine and today’s projections. Speculation: could, might, is likely to.',
       art:'The visual language of a projection: what an image can claim.',
       globalperspectives:'What a trend is, where it comes from and when it breaks.'},
     sessions:[
      {s:1,title:'The Time Machine',
       objective:'Read Wells imagining a future out of his own present.',
       view:[
         'Wells writes in 1895 about the year 802,701.',
         'What does he get right about how technology changes a society?',
         'And what does he simply invent?',
         'Silent reading. This is the book of the term.'],
       levels:{
         'A2':{task:'Answer five comprehension questions about the chapter.',
               help:'Two options each.'},
         'B1':{task:'Answer and write what Wells assumes about progress.',
               help:'Frame: "Wells thinks that…"'},
         'B2':{task:'Explain what Wells gets right and what he invents, with evidence.',
               help:'Quote once.'},
         'C1':{task:'Explain what Wells assumes and whether we still assume it.',
               help:'Connect it to today.'}}},
      {s:2,title:'What a trend is',
       objective:'Tell a trend from a wish.',
       view:[
         'A line that continues. Three real graphs of your system.',
         'Where does a line break? Find a historical example.',
         'A trend that everybody repeats is not necessarily true.',
         'Choose your three trends.'],
       levels:{
         'A2':{task:'Complete three trends: "More and more people are ____."',
               help:'Frames and a trend bank.'},
         'B1':{task:'Describe three trends of your system with the evidence for each.',
               help:'Is increasing, is likely to.'},
         'B2':{task:'Describe three trends and say which is most likely to break.',
               help:'And what would break it.'},
         'C1':{task:'Analyse three trends distinguishing likely from merely possible.',
               help:'Say which you would bet on.'}}},
      {s:3,title:'Speculating properly',
       objective:'Use the language of what is not certain.',
       view:[
         'Could, might, is likely to, will probably.',
         'Which of them commits you most?',
         'Rewrite five over-confident statements.',
         'Claiming less can persuade more.'],
       levels:{
         'A2':{task:'Complete five sentences with could, might or will.',
               help:'Sentences started.'},
         'B1':{task:'Rewrite five statements using speculation language.',
               help:'Three different forms.'},
         'B2':{task:'Rewrite them and explain why the hedged version is stronger.',
               help:'With an example.'},
         'C1':{task:'Write five claims about 2040 calibrated to your evidence.',
               help:'Each with its degree of certainty.'}}},
      {s:4,title:'Filing the evidence',
       objective:'Leave the research usable.',
       view:[
         'Everything the team has: facts, trends, sources.',
         'What can you claim with this, and what not?',
         'The gap is where your vision goes.',
         'File it before you start imagining.'],
       levels:{
         'A2':{task:'Complete the evidence file with what you found.',
               help:'File template.'},
         'B1':{task:'File your evidence saying what each source supports.',
               help:'Three sources.'},
         'B2':{task:'File it and identify the gap your vision will fill.',
               help:'Be specific.'},
         'C1':{task:'File it and say what your vision cannot claim on this evidence.',
               help:'Know your ceiling.'}}}
     ]},
    {n:3,title:'Building the vision',desc:'From trend to scenario. What has to be true for your 2040 to happen, and what it would cost.',
     give:'Your scenario with its conditions and its price.',
     across:{
       english:'Second conditional and future perfect: by 2040 we will have…',
       art:'Choosing what of the vision is better seen than explained.',
       globalperspectives:'Building a scenario: conditions, cost and who pays.'},
     sessions:[
      {s:1,title:'From trend to scenario',
       objective:'Build a future that follows from the present.',
       view:[
         'Your 2040 in one paragraph. Not a fantasy, not a catastrophe.',
         'It has to follow from your three trends.',
         'Write the first version.',
         'Read it out: does it sound possible?'],
       levels:{
         'A2':{task:'Write your 2040 in five sentences with will and going to.',
               help:'Frames.'},
         'B1':{task:'Describe your scenario in a paragraph, based on your trends.',
               help:'Future forms.'},
         'B2':{task:'Describe your scenario and connect each part to a trend.',
               help:'Explicitly.'},
         'C1':{task:'Build the scenario and say which trend it depends on most.',
               help:'Its weakest point.'}}},
      {s:2,title:'What has to be true',
       objective:'Name the conditions.',
       view:[
         'Your 2040 needs things to happen first. Which?',
         'Second conditional: if we changed X, we would get Y.',
         'List three conditions.',
         'Which is the hardest?'],
       levels:{
         'A2':{task:'Complete three conditions with the frame given.',
               help:'Frame: "This will only happen if…"'},
         'B1':{task:'Write your three conditions using the second conditional.',
               help:'And order them by difficulty.'},
         'B2':{task:'Write the conditions and explain which is least likely.',
               help:'And why.'},
         'C1':{task:'Write the conditions and what would have to change for the hardest to hold.',
               help:'Concretely.'}}},
      {s:3,title:'What it costs and who pays',
       objective:'Name the trade-off.',
       view:[
         'A future with no cost is not a future, it is an advert.',
         'What does yours cost? In money, in time, in freedom?',
         'And who pays it? Not always the same people who benefit.',
         'Write your trade-off.'],
       levels:{
         'A2':{task:'Complete: "My future costs ____ and ____ would pay for it."',
               help:'Frame and options.'},
         'B1':{task:'Write what your future costs and who pays.',
               help:'Two sentences.'},
         'B2':{task:'Explain the trade-off and defend that it is worth paying.',
               help:'With a reason.'},
         'C1':{task:'Name the trade-off and answer somebody who refuses to pay it.',
               help:'Their objection is legitimate.'}}},
      {s:4,title:'Testing the scenario',
       objective:'Let another team attack it.',
       view:[
         'Swap scenarios. Find the weakest point of theirs.',
         'The best attack: "that assumes that…, and it is not true."',
         'Note the attack you could not answer.',
         'Fix your scenario.'],
       levels:{
         'A2':{task:'Note the objection and fix one part of your scenario.',
               help:'Your text.'},
         'B1':{task:'Write the objection you received and how you fixed it.',
               help:'Frame: "They said… so now…"'},
         'B2':{task:'Integrate the objection into your scenario.',
               help:'Not as an appendix.'},
         'C1':{task:'Answer the objection and say under what conditions it would be right.',
               help:'Concede exactly.'}}}
     ]},
    {n:4,title:'Making it visible',desc:'With Creative Arts: the piece that carries the vision at the exhibition — a model, an image, an object.',
     give:'The visual, and the draft of the argument in your notebook.',
     across:{
       english:'Writing an argument that works with the visual instead of repeating it.',
       art:'Building the piece that carries the argument at the stand.',
       globalperspectives:'The trade-off of your vision, named out loud.'},
     sessions:[
      {s:1,title:'What the object has to say',
       objective:'Decide what the visual carries.',
       view:[
         'With Creative Arts: what is easier to see than to explain?',
         'The piece is not decoration: it says what the text says worst.',
         'Sketch three options.',
         'Choose one and say why.'],
       levels:{
         'A2':{task:'Choose your visual from three options and label it.',
               help:'Three sketches.'},
         'B1':{task:'Sketch your piece and write what it will say.',
               help:'One sentence.'},
         'B2':{task:'Design your piece so it says what the text cannot.',
               help:'Explain the division.'},
         'C1':{task:'Design it and explain why this idea is better seen than read.',
               help:'Be specific.'}}},
      {s:2,title:'Building it',
       objective:'Make the piece for the stand.',
       view:[
         'Materials on the table. Two sessions to build.',
         'Test: show it to somebody without speaking. What do they understand?',
         'Fix what was misread.',
         'Leave it half-built for tomorrow.'],
       levels:{
         'A2':{task:'Build your piece following your sketch.',
               help:'Your sketch.'},
         'B1':{task:'Build your piece and note what a classmate understood.',
               help:'And what they did not.'},
         'B2':{task:'Build it and adjust what was misread.',
               help:'Say what you changed.'},
         'C1':{task:'Build it and justify one design decision.',
               help:'Why that and not the alternative.'}}},
      {s:3,title:'Drafting the argument',
       objective:'Write the case for your 2040.',
       view:[
         'Structure: vision, what it is built on, what it costs, who pays.',
         'It has to be read in two minutes at a stand.',
         'Draft in the notebook.',
         'Read the first line out loud.'],
       levels:{
         'A2':{task:'Write your argument in six sentences with the frames given.',
               help:'Six openings.'},
         'B1':{task:'Write your argument with the four parts.',
               help:'280–330 words.'},
         'B2':{task:'Write it so it works WITH your visual, not repeating it.',
               help:'Divide the work.'},
         'C1':{task:'Write it anchoring every claim about 2040 in something measurable today.',
               help:'Every one.'}}},
      {s:4,title:'Text and object together',
       objective:'Check that the two work as one.',
       view:[
         'Put the text next to the piece. Do they repeat each other?',
         'If they do, one of the two is unnecessary.',
         'Adjust the text, not the piece.',
         'Hand in the draft and the piece.'],
       levels:{
         'A2':{task:'Check your text and your piece and mark what repeats.',
               help:'Both together.'},
         'B1':{task:'Adjust your text so it does not repeat the visual.',
               help:'Say what you cut.'},
         'B2':{task:'Adjust both so each carries a different part.',
               help:'Explain the division.'},
         'C1':{task:'Adjust them and explain what the visitor understands from each.',
               help:'Separately.'}}}
     ]},
    {n:5,title:'Sharpening the argument',desc:'Feedback against the rubric, rewriting, and rehearsing what to say when somebody disagrees.',
     give:'The final text.',
     across:{
       english:'Rewriting to integrate the objection into the argument.',
       art:'Final adjustments to the piece after the feedback.',
       globalperspectives:'Standing up to the objection of somebody who does not share your future.'},
     sessions:[
      {s:1,title:'Feedback against the rubric',
       objective:'Improve it with the criteria in front of you.',
       view:[
         'The rubric on the table. Assess a partner’s text against criterion 1.',
         'Not "I liked it": which level, and what is missing to move up.',
         'Twenty minutes of silent rewriting.',
         'Mark what you changed.'],
       levels:{
         'A2':{task:'Mark your level on the rubric and correct one thing.',
               help:'Rubric as a checklist.'},
         'B1':{task:'Assess against two criteria and rewrite your weakest part.',
               help:'Say the level.'},
         'B2':{task:'Assess against the three criteria and justify each change.',
               help:'No change at random.'},
         'C1':{task:'Assess, rewrite, and say which criterion you will not reach.',
               help:'And why.'}}},
      {s:2,title:'The objection round',
       objective:'Defend it against somebody who disagrees.',
       view:[
         'Each team defends its 2040. The others attack.',
         'Rule: attack the argument, not the team.',
         'Note the best objection you received.',
         'Is it fatal or fixable?'],
       levels:{
         'A2':{task:'Note the objection received and write one answer.',
               help:'Frame given.'},
         'B1':{task:'Write the objection and your answer to it.',
               help:'However, although.'},
         'B2':{task:'Rewrite integrating the objection into the argument.',
               help:'Making it stronger.'},
         'C1':{task:'Rewrite so the argument survives the hardest objection.',
               help:'If it does not, change the argument.'}}},
      {s:3,title:'The final version',
       objective:'Close the text.',
       view:[
         'Read it aloud once before touching it.',
         'Every claim about 2040: what supports it?',
         'Check figures and sources.',
         'Final version.'],
       levels:{
         'A2':{task:'Copy your corrected text and check your three figures.',
               help:'Your text with marks.'},
         'B1':{task:'Produce the final version and verify every figure.',
               help:'Checklist.'},
         'B2':{task:'Produce it and check every claim has its evidence.',
               help:'Underline them.'},
         'C1':{task:'Produce it and check no claim goes beyond your evidence.',
               help:'The commonest error.'}}},
      {s:4,title:'Rehearsing the stand',
       objective:'Prepare to talk to strangers.',
       view:[
         'Fifteen seconds to make somebody stop. Rehearse them.',
         'It is not explained the same to a child as to an adult.',
         'Rehearse both versions.',
         'Prepare the question of the sceptic.'],
       levels:{
         'A2':{task:'Prepare four cards with the key words of your stand.',
               help:'Structure given.'},
         'B1':{task:'Rehearse your explanation and prepare two likely questions.',
               help:'The two.'},
         'B2':{task:'Rehearse two versions, for a child and for an adult.',
               help:'Same content.'},
         'C1':{task:'Rehearse and prepare the answer to somebody who does not share your future.',
               help:'Their objection is reasonable.'}}}
     ]},
    {n:6,title:'The exhibition',desc:'NIS 2040 opens. Families walk through and you defend your future to whoever stops.',
     give:'The stand, the piece and your defence.',
     across:{
       english:'Speaking Parts 3-4: holding a conversation with somebody who disagrees.',
       art:'Setting up the stand at the NIS 2040 exhibition.',
       globalperspectives:'Defending a position in public, and conceding well when the objection is good.'},
     sessions:[
      {s:1,title:'Setting up NIS 2040',
       objective:'Get the exhibition ready.',
       view:[
         'Set up the stands. Who welcomes and who explains?',
         'Last check: does the piece hold, is the text readable?',
         'Walk through the other stands as a visitor.',
         'What makes you stop at one and not another?'],
       levels:{
         'A2':{task:'Set up your stand and practise your opening.',
               help:'Your cards.'},
         'B1':{task:'Set up and note what makes you stop at another stand.',
               help:'One thing.'},
         'B2':{task:'Set up and adjust your opening with what you saw.',
               help:'Say what you changed.'},
         'C1':{task:'Set up and prepare how you will adapt to who arrives.',
               help:'Two versions.'}}},
      {s:2,title:'The exhibition',
       objective:'Defend your future to whoever stops.',
       view:[
         'Families walk through. Nobody is obliged to stop.',
         'Take turns: one welcomes, one explains.',
         'Somebody disagrees. Hold the argument, without losing courtesy.',
         'Count how many stopped and what they asked most.'],
       levels:{
         'A2':{task:'Present your stand with your cards.',
               help:'Your cards.'},
         'B1':{task:'Present and answer visitors’ questions.',
               help:'Your two prepared ones.'},
         'B2':{task:'Present, adapt to who is in front of you and answer an unexpected question.',
               help:'Note it.'},
         'C1':{task:'Hold the argument with somebody who disagrees, and concede if they are right.',
               help:'Say why.'}}},
      {s:3,title:'What they took away',
       objective:'Find out what actually landed.',
       view:[
         'What did visitors remember? Ask three of them.',
         'What they remember is not always what you said.',
         'Which part of your stand worked?',
         'And which was ignored?'],
       levels:{
         'A2':{task:'Ask two visitors what they remember and write it down.',
               help:'Two answers.'},
         'B1':{task:'Write what three visitors took away and compare it with what you wanted.',
               help:'The difference.'},
         'B2':{task:'Analyse the gap between what you said and what they understood.',
               help:'And why.'},
         'C1':{task:'Analyse it and say what you would change in the piece or in the text.',
               help:'Be specific.'}}},
      {s:4,title:'Closing the year',
       objective:'Look back at the two units.',
       view:[
         'Two projects: an audit and a vision. What did each demand of you?',
         'Which was harder, and why?',
         'What do you know now that you did not in October?',
         'Final reflection, written.'],
       levels:{
         'A2':{task:'Complete the reflection with the three openings given.',
               help:'Openings printed.'},
         'B1':{task:'Write your reflection on the two projects.',
               help:'What each demanded.'},
         'B2':{task:'Write it including what you learned from an objection you received.',
               help:'Before and after.'},
         'C1':{task:'Write it and say what you would do differently in a third project.',
               help:'Concretely.'}}}
     ]}
  ],
  words:['vision','scenario','trend','projection','consequence','trade-off','sustainable','automation','plausible','far-fetched','by 2040','will have','is likely to','could','might','if we','unless','whereas','on balance'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128220;', title:'The case for your 2040',
     desc:'The vision, what it is built on, what it would cost and who pays. Written so that a family standing at your stand can read it in two minutes.',
     spec:'280–330 words', range:[280,330],
     checklist:[
       {k:'position', t:'I argue for a future, I do not only describe it', re:'(should|must|worth|i argue|we believe|the case for)'},
       {k:'today', t:'I anchor it in something measurable today', re:'(today|currently|at present|in 2026|already|right now)'},
       {k:'future', t:'I use future forms properly', re:'(will have|by 2040|is likely to|could|might|going to)'},
       {k:'cost', t:'I say what it costs and who pays', re:'(cost|pay|price|trade-off|expensive|invest)'},
       {k:'cond', t:'I use conditionals to weigh alternatives', re:'(if we|unless|would|otherwise)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127912;', title:'Your stand at NIS 2040',
     desc:'The visual piece and a recording of your defence at the exhibition.',
     spec:'The piece, plus 3 minutes of defence'}
  ]
},
    ]
  },

  /* 10.o y 11.o tienen planificada la U4; no hay U5 en Toddle. */
  g10: {
    label: 'Grade 10',
    units: [
{
  cover:{icon:'🎙', from:'#6b1d2a', to:'#bf5162', image:'assets/unit-covers/g10-u4-arguments.png'},
  n:4,
  title:'Crafting Complex Arguments and Expressive Presentations',
  weeks:6,
  bigq:'How can we communicate complex ideas and arguments effectively enough to influence and inform very different audiences?',
  situation:'You are part of “Youth Voices for Change”, a school initiative that pushes young people to take on the issues that matter and make others care about them. You are preparing for a regional debate and podcast competition, reading Animal Farm along the way to see how power, propaganda and persuasion actually work.',
  audience:'A regional debate and podcast competition — people who do not know you and will judge whether your argument stands up.',
  criteria:[
    {n:1, text:'Delivery — I use tone, gesture and expression to carry attitude, and I hold the audience with eye contact and pacing.'},
    {n:2, text:'Argument — I build clear, evidence-based arguments and rebuttals, and I use ethos, pathos and logos deliberately.'},
    {n:3, text:'Response — I take opposing viewpoints seriously and answer them respectfully during the debate.'},
    {n:4, text:'Scripting — I research and script the podcast with advanced structures and cohesive devices so it reads clearly out loud.'},
    {n:5, text:'Precision — I improve across drafts and I control advanced punctuation: colons, semicolons and dashes.'}
  ],
  sequence:[
    {n:1,title:'Expressing emotions and presentation skills',desc:'Tone, body language and persuasive vocabulary. The basic shape of an argument: claim, support, counterclaim.',give:'A short presentation, delivered rather than read.'},
    {n:2,title:'Animal Farm ch. 5–6 and debate preparation',desc:'Power, propaganda and persuasive technique in the novel — and then in your own debate topic.',give:'Your topic, your arguments and your counterarguments.'},
    {n:3,title:'Argument writing and debate planning',desc:'From speaking to writing: analysing strong argumentative writing and planning the debate.',give:'Your essay on a complex societal issue.'},
    {n:4,title:'Drafting and language precision',desc:'Revision, peer feedback, and advanced punctuation applied to real drafts.',give:'A revised draft, with the punctuation working for you.'},
    {n:5,title:'Finalising and coherence',desc:'Polishing the arguments and rehearsing the debate.',give:'Your final script.'},
    {n:6,title:'Presentations and assessment',desc:'The debate itself, and the comprehensive exam.',give:'The debate, and your podcast episode.'}
  ],
  words:['claim','support','counterclaim','rebuttal','ethos','pathos','logos','propaganda','rhetoric','cohesive devices','colon','semicolon','dash','Animal Farm'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Argumentative essay',
     desc:'Your position on a complex societal issue, argued with evidence and with the counterargument taken seriously.',
     spec:'Formal register · advanced punctuation',
     checklist:[
       {k:'claim', t:'My claim is stated clearly', re:'.{250,}'},
       {k:'evidence', t:'I support it with evidence', re:'(for example|for instance|according to|research|evidence|study)'},
       {k:'counter', t:'I answer the strongest objection', re:'(however|although|critics|opponents|some argue|on the other hand)'},
       {k:'rhetoric', t:'I use rhetorical strategy on purpose', re:'(imagine|consider|we must|surely|what if)'},
       {k:'punct', t:'I use a colon, semicolon or dash correctly', re:'[;:—]'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Debate and podcast',
     desc:'Record your debate turn or your podcast episode on the issue you chose.',
     spec:'Debate · podcast episode'}
  ]
}
    ]
  },

  g11: {
    label: 'Grade 11',
    units: [
{
  cover:{icon:'🌍', from:'#0f4f4a', to:'#3a9c92', image:'assets/unit-covers/g11-u4-discourse.png'},
  n:4,
  title:'Rhetorical Mastery and Global Discourse',
  weeks:5,
  stepWord:'Step',
  bigq:'How can we use rhetorical strategies, evidence and effective communication to persuade others about important global issues?',
  situation:'You have been invited to an international Youth Conference. Young people from many countries are there to discuss global issues and propose change. Your voice counts: you have to present a well-supported position, persuade the room, and answer perspectives that are not yours.',
  audience:'The conference floor: your classmates act as delegates, and they will question you.',
  criteria:[
    {n:1, text:'Delivery — I use tone, pitch, volume, gesture and eye contact so the emotion matches the argument.'},
    {n:2, text:'Rhetoric — I build evidence-based arguments and strong rebuttals, and I use ethos, pathos and logos.'},
    {n:3, text:'Reading — I analyse complex texts, judge whether a source is credible and relevant, and synthesise across several.'},
    {n:4, text:'Writing — I improve clarity and persuasiveness draft by draft, taking feedback in, and I control advanced punctuation and connectors.'}
  ],
  sequence:[
    {n:1,title:'Read and analyse',desc:'Complex texts through the Reading Plan: main ideas, detail, vocabulary, perspectives and evidence.'},
    {n:2,title:'Cambridge practice',desc:'Reading, Use of English, writing, listening and speaking, with targeted practice and feedback.'},
    {n:3,title:'Evaluate and synthesise',desc:'Judging the credibility and relevance of what you find, and pulling several sources into one position.'},
    {n:4,title:'Build and organise',desc:'Claims, reasons, evidence and rebuttals, organised with academic vocabulary and connectors.',give:'Your position and the evidence behind it.'},
    {n:5,title:'Apply language and rhetoric',desc:'Grammar, advanced punctuation, transitions, and ethos, pathos and logos where they do work.'},
    {n:6,title:'Draft, revise and edit',desc:'Drafts improved with teacher and peer feedback: coherence, accuracy, vocabulary, persuasive effect.',give:'Your revised script.'},
    {n:7,title:'Rehearse',desc:'Tone, pitch, volume, gesture, eye contact and audience awareness — out loud, repeatedly.'},
    {n:8,title:'Present and reflect',desc:'The Youth Conference: you deliver, you answer questions, and you reflect on how you communicated.',give:'The presentation and your reflection.'}
  ],
  words:['ethos','pathos','logos','rebuttal','claim','evidence','credibility','synthesis','global issue','delegate','transition','semicolon','colon','dash'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Position script',
     desc:'The written position you will defend at the conference: the issue, your stance, the evidence, and your answer to the strongest opposing view.',
     spec:'Academic register',
     checklist:[
       {k:'position', t:'My position on the global issue is unmistakable', re:'.{250,}'},
       {k:'evidence', t:'I bring credible evidence and say where it comes from', re:'(according to|report|data|research|study|un |unesco|who )'},
       {k:'opposing', t:'I take on an opposing perspective', re:'(however|critics|opponents|some argue|it could be said|admittedly)'},
       {k:'appeal', t:'I use ethos, pathos or logos deliberately', re:'(imagine|consider|we must|as a young person|the evidence shows)'},
       {k:'punct', t:'My advanced punctuation is doing work', re:'[;:—]'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127760;', title:'Conference presentation',
     desc:'Four to five minutes in pairs with a visual aid, and then the questions from the floor.',
     spec:'4–5 minutes · in pairs · with visual aid'},
    {kind:'reflection', type:'text', icon:'&#128173;', title:'Reflection',
     desc:'How you communicated, what landed, and what you would change.',
     spec:'Around 100 words', range:[80,160]}
  ]
}
    ]
  }
};
