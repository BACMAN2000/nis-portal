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
  n:5, label:'5 · pilot', pilot:true,
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
  n:6, label:'6 · pilot', pilot:true,
  title:'The Ramp Race',
  weeks:6,
  bigq:'What makes things move, and what makes them stop?',
  situation:'At the end-of-year showing there will be a ramp in the hall and a race. Each team builds a vehicle and has to make it go as far as possible — and then explain to whoever is watching why theirs went further. Nothing moves on its own: you push, you pull, and the floor pushes back.',
  audience:'Your families at the closing showing. They will watch the race and ask you why your vehicle won or lost.',
  client:'The families · end-of-year showing',
  reader:{title:null, term:3, inPortal:false, note:'Grade 2 has two books in English for three terms. This unit is left without a book: it is the gap in the reading plan to solve for 2027.'},
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

/* --------------------------------------------- 3.o U5 (piloto 2026)
   ONCE SEMANAS, NO CINCO. El area pidio el 8-sep-2026 una sola unidad para
   el trimestre entero (P5+P6) y la profesora mando el proyecto: terremotos y
   tsunamis, con el flyer de seguridad como producto. Cuatro sesiones por
   semana mas la hora de Cambridge, que va en `cambridge` de cada semana.
   Los datos del Peru estan verificados y citados en earth-moves-peru-g3u5.html.
   Los descriptores C/B/A/AD los redactamos nosotros y siguen PENDIENTES DE
   VALIDACION del profesor, como en el resto de las unidades piloto. */
{
  cover:{icon:'🌎', from:'#7a2f12', to:'#d98a4a', image:'assets/unit-covers/g3-u5-earth-moves.png'},
  n:5,
  title:'When the Earth Moves',
  weeks:11,
  bigq:'Peru shakes. What do I have to know, and what do I have to have ready, so that it does not catch my family by surprise?',
  situation:'The Nazca plate goes down under Peru seven or eight centimetres every year and the IGP recorded 835 earthquakes in 2025 alone. Almost none of them are felt, but five of them changed the country: 1746, 1868, 1970, 2001 and 2007. In these eleven weeks you read what really happened, in real figures, and you turn it into something useful: a safety flyer that a family in your street could follow without asking anybody.',
  audience:'A family in your street who has never thought about this. They will not read a report: they will read your flyer while the ground is moving, or they will not read it at all.',
  client:'The families of the school \u00b7 safety fair in week 11',
  reader:{title:'Earthquakes, Volcanoes and Tsunamis', series:'Raz-Plus \u00b7 Lexile 730L', term:3, inPortal:false},
  /* El libro de la unidad (readers/when-the-earth-moves/): un capitulo por semana.
     `chapters` dice que capitulo toca en cada semana (el 5, volcanes, es de enlace
     con Science y va en la W4). unit.html lo pinta en la portada y en cada semana. */
  book:{href:'readers/when-the-earth-moves/index.html', title:'When the Earth Moves',
        desc:'Your unit book: one chapter for every week, in three editions (Starters, Movers, Flyers), with real photos of Peru, 3D models and activities.',
        pdfs:[{label:'Starters PDF', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Starters.pdf'},
              {label:'Movers PDF', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Movers.pdf'},
              {label:'Flyers PDF', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Flyers.pdf'},
              {label:'Starters booklet', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Starters_booklet.pdf', teacher:true},
              {label:'Movers booklet', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Movers_booklet.pdf', teacher:true},
              {label:'Flyers booklet', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Flyers_booklet.pdf', teacher:true},
              {label:'Teacher\u2019s key', href:'readers/when-the-earth-moves/When_the_Earth_Moves_Teachers_Key.pdf', teacher:true}],
        chapters:{1:[1],2:[2],3:[3],4:[4,5],5:[6],6:[7],7:[8],8:[9],9:[10],10:[11],11:[12]}},
  exam:{target:'movers', themes:['The world around us','Health','Places and directions','Time'],
        grammar:['must / must not','should','have to','imperatives','past simple: was, were and -ed'],
        extra:['earthquake','tsunami','landslide','flood','plate','safe zone','drill','shelter','whistle','torch','blanket','headache','bruise'],
        /* En ingles NO hay tres palabras como en castellano: sismo, temblor y terremoto son
           todos `earthquake`, y se gradua con un adjetivo delante o con la magnitud. `tremor`
           es falso amigo de temblor y en sismologia significa otra cosa: no se ensena. */
        noUsar:['tremor','tidal wave','seism']},
  areas:[{area:'science', level:3},{area:'social', level:2},{area:'math', level:1}],
  criteria:[
    {n:1, text:'I name natural disasters, safety words, the things in the emergency kit and the parts of the body.',
     levels:{
       C:'I say a few of the words with help.',
       B:'I say most of the words when I see the picture.',
       A:'I use the words on my own, in sentences, when I am talking about safety.',
       AD:'I use them and I explain what one of them means to somebody who does not know it.'}},
    {n:2, text:'I read a table and a chart about earthquakes in Peru and I say what they show.',
     levels:{
       C:'I find one piece of information if somebody shows me the column.',
       B:'I find information when I am asked a direct question.',
       A:'I ask and answer questions about the data and I compare two earthquakes.',
       AD:'I notice something in the data that nobody pointed out to me.'}},
    {n:3, text:'I tell what happened in a real Peruvian earthquake using the past simple.',
     levels:{
       C:'I copy sentences in the past.',
       B:'I write two or three sentences in the past with some mistakes.',
       A:'I tell what happened in four sentences, in order and in the past.',
       AD:'I tell it in order and I add what happened afterwards.'}},
    {n:4, text:'I use must, must not and should to give safety rules and advice.',
     levels:{
       C:'I copy a rule that is given to me.',
       B:'I write rules but I mix up must and should.',
       A:'I choose must, must not or should correctly and I give the reason.',
       AD:'I explain to somebody else why one is a rule and the other is advice.'}},
    {n:5, text:'I organise safety instructions into before, during and after.',
     levels:{
       C:'I put two of the three moments in the right place.',
       B:'I sort most of the actions with a bit of help.',
       A:'I sort them all and I use the three moments to organise my own flyer.',
       AD:'I notice when an instruction could go in two moments and I say why.'}},
    {n:6, text:'I write a safety flyer of 90 to 110 words and I present it to other people.',
     levels:{
       C:'I write some sentences and I show my drawing.',
       B:'I write the three parts but they are short or unclear.',
       A:'I write the three parts, with a heading, an instruction and a drawing each, and I present it.',
       AD:'My flyer works for somebody who is younger than me, and I prove it.'}}
  ],
  sequence:[
    {n:1,title:'Our ground moves',desc:'Why Peru shakes: the Nazca plate, the Ring of Fire, and the words for what the Earth does.',
     give:'Your first page: the four words with a drawing each.',
     cambridge:{paper:'Listening', part:'Part 1',
       focus:'Matching names to people. Same skill you need all unit: listen, hold two things in your head, connect them.'},
     sessions:[
      {s:1,title:'The words for it',
       objective:'Name the four things the Earth does.',
       view:[
         'Four photos on the board: earthquake, tsunami, flood, landslide. Which one is which?',
         'Clap the syllables: earth-quake, tsu-na-mi, land-slide, flood.',
         'The /kw/ sound: quake, quick, question. Say them, feel where your lips go.',
         'Word wall: the four words go up and they stay up for eleven weeks.'],
       levels:{
         'Support':{task:'Match four pictures with their word.',
               help:'Pictures with the word underneath.'},
         'Core':{task:'Write each word and draw it. Add one more you already know.',
               help:'Word wall on the board.'}}},
      {s:2,title:'What is under Peru',
       objective:'Explain that the ground moves because two plates push.',
       view:[
         'The map of Peru: the sea on one side, the mountains on the other.',
         'The Nazca plate goes down under South America, 7 or 8 centimetres a year.',
         'With two books on the desk: push them together. One goes under. That is it.',
         'Peru is on the Ring of Fire. Find it on the world map.'],
       levels:{
         'Support':{task:'Label the diagram: sea, plate, mountains.',
               help:'Diagram with the three labels given.'},
         'Core':{task:'Draw the two plates and write one sentence: what happens when they push?',
               help:'Frame: "The Nazca plate ____ under Peru."'}}},
      {s:3,title:'Have you felt one?',
       objective:'Talk about a real earthquake you remember.',
       view:[
         'Hands up: who has felt a sismo? Where were you?',
         'There was an earthquake. I was at home. My mother was in the kitchen.',
         'In pairs: tell your partner. Two sentences is enough.',
         'Two volunteers tell the class. Everybody listens for was and were.'],
       levels:{
         'Support':{task:'Complete: "I was in the ____. There was an earthquake."',
               help:'Sentence started, word bank.'},
         'Core':{task:'Tell it in three sentences: where you were, what you felt, what you did.',
               help:'was / were on the board.'}}},
      {s:4,title:'Two every day',
       objective:'Read big numbers and say what they mean.',
       view:[
         'The IGP recorded 835 earthquakes in Peru in 2025. Read the number out loud.',
         '835 in a year. How many in a day? Work it out — it is more than two.',
         'We do not feel almost any of them. Why is that good news?',
         'Your first page of the unit: the four words, drawn, with 835 at the top.'],
       levels:{
         'Support':{task:'Read and copy the numbers: 798, 835, 2, and say which is the biggest.',
               help:'Numbers on cards.'},
         'Core':{task:'Write two sentences with the numbers of 2024 and 2025.',
               help:'Frame: "In 2025 there were ____ earthquakes."'}}}
     ]},
    {n:2,title:'Reading the numbers',desc:'The five earthquakes Peru remembers, in a table and in a chart. Asking and answering about data.',
     give:'Five true sentences taken from the table.',
     cambridge:{paper:'Listening', part:'Part 2',
       focus:'Words and numbers up to 100 in the gaps of a form. Spelling names and writing numbers you hear.'},
     sessions:[
      {s:1,title:'The table',
       objective:'Find information in a table.',
       view:[
         'Open Earthquakes and Tsunamis in Peru on the portal. Look at the table.',
         'Four columns: year, where, magnitude, tsunami. What does each one tell you?',
         'Find 1970. Where was it? Find Pisco. What year?',
         'Six questions in pairs, one asks and one finds it.'],
       levels:{
         'Support':{task:'Find three answers in the table and write the year.',
               help:'Questions with the column marked.'},
         'Core':{task:'Write three questions of your own about the table and swap with your partner.',
               help:'Question words on the board.'}}},
      {s:2,title:'The chart',
       objective:'Compare sizes with a bar chart.',
       view:[
         'The same five earthquakes, now as bars. Taller bar means what?',
         'Which is the tallest? Which is the shortest? Put them in order.',
         'Magnitude 8 is much bigger than 7, not one more. Thirty times more energy.',
         'One earthquake has a range, 8.5 to 9.0. Why? Nobody had machines in 1868.'],
       levels:{
         'Support':{task:'Colour the bars from the shortest to the tallest and write the years.',
               help:'Chart with the bars empty.'},
         'Core':{task:'Write three sentences with bigger than and the biggest.',
               help:'Frame: "The 1746 earthquake was bigger than ____."'}}},
      {s:3,title:'It was, they were',
       objective:'Say where and when something was.',
       view:[
         'On the board: The 2007 earthquake WAS in Pisco. The waves WERE 20 metres.',
         'One thing: was. More than one thing: were.',
         'Ten sentences on cards, you choose was or were.',
         'Your turn: five sentences from the table, all true.'],
       levels:{
         'Support':{task:'Choose was or were in six sentences.',
               help:'Two options in each gap.'},
         'Core':{task:'Write five true sentences about the table using was and were.',
               help:'The table on screen.'}}},
      {s:4,title:'Ask me about the table',
       objective:'Ask questions about data.',
       view:[
         'Where was the 1970 earthquake? When was the Pisco earthquake?',
         'Question first, answer second. The answer is in the table, always.',
         'Data duel: two teams, five questions each, the table on the screen.',
         'Hand in your five sentences. They have to be true and you have to prove them.'],
       levels:{
         'Support':{task:'Match five questions with their answers.',
               help:'Questions and answers cut up.'},
         'Core':{task:'Ask and answer six questions with your partner, and write down two.',
               help:'Where / When / How big.'}}}
     ]},
    {n:3,title:'What happened in 1970',desc:'The worst disaster in the history of Peru, told in order. Past simple with -ed. The reading plan starts.',
     give:'Your four-sentence report about 1970.',
     cambridge:{paper:'Reading & Writing', part:'Part 1',
       focus:'Definitions matched to eight labelled pictures, copying the word. Our unit words are the ones we use.'},
     sessions:[
      {s:1,title:'The reading plan starts',
       objective:'Get information out of an informative text.',
       view:[
         'Earthquakes, Volcanoes and Tsunamis. Look at the cover: what will it be about?',
         'Read the first part together. Headings, captions and pictures first.',
         'Where does the text explain and where does it just show?',
         'Three words you did not know. Write them in your reading log.'],
       levels:{
         'Support':{task:'Match four headings with four pictures of the book.',
               help:'Headings and pictures cut up.'},
         'Core':{task:'Write what each of the first three headings tells you, in one line.',
               help:'The book open.'}}},
      {s:2,title:'31 May 1970',
       objective:'Tell the events of a real earthquake in order.',
       view:[
         '31 May 1970, twenty past three in the afternoon. Magnitude 7.9.',
         'Ice and rock came down from Mount Huascaran and covered the town of Yungay.',
         'About 70,000 people died. It is the worst disaster Peru has had.',
         'Four cards with the events. Put them in the right order in your team.'],
       levels:{
         'Support':{task:'Put four events in order with the pictures.',
               help:'Cards with drawings.'},
         'Core':{task:'Put six events in order and write the year and the place.',
               help:'Cards with text only.'}}},
      {s:3,title:'Yesterday verbs',
       objective:'Use the past simple to say what happened.',
       view:[
         'happen-ed, cover-ed, arriv-ed, start-ed, help-ed. The -ed at the end.',
         'Careful with three of them: come came, fall fell, die died.',
         'Say the sentence today, then say it in 1970. The class changes the verb.',
         'Ten verbs on the wall. You will need them on Thursday.'],
       levels:{
         'Support':{task:'Complete six sentences with the verb given in the past.',
               help:'Verb in brackets.'},
         'Core':{task:'Write six sentences about 1970 in the past simple.',
               help:'Verb wall.'}}},
      {s:4,title:'My report',
       objective:'Write a short report about something that happened.',
       view:[
         'A report answers four things: what, where, when, and what happened after.',
         'Four sentences. No more. Every sentence has to be true.',
         'first, then, after, finally to hold them together.',
         'Read it to your partner. Did they understand it the first time?'],
       levels:{
         'Support':{task:'Complete the report with the data given.',
               help:'Report with gaps and a word bank.'},
         'Core':{task:'Write your four sentences and add one thing that surprised you.',
               help:'The data on the board.'}}}
     ]},
    {n:4,title:'When the sea comes',desc:'What a tsunami is, why the earthquake itself is the alarm, and the five steps that save you.',
     give:'The five steps in order, in your notebook.',
     cambridge:{paper:'Listening', part:'Part 3',
       focus:'Matching a list with pictures A to H by writing a letter. Two pictures are left over on purpose.'},
     sessions:[
      {s:1,title:'It is not one wave',
       objective:'Explain what a tsunami is.',
       view:[
         'Three drawings: the sea as usual, the sea floor moving, the water arriving.',
         'A tsunami is not one big wave. It is the sea coming on to the land and not stopping.',
         'In a tray of water: lift the bottom and watch. That is the whole idea.',
         'Sometimes the sea goes back first. That is not a show, that is the warning.'],
       levels:{
         'Support':{task:'Put the three drawings in order.',
               help:'Drawings cut up.'},
         'Core':{task:'Draw the three moments and write one line under each.',
               help:'Words: sea floor, push, wave.'}}},
      {s:2,title:'The earthquake is the alarm',
       objective:'Know what to do on the coast without waiting for anybody.',
       view:[
         'In Peru the first wave can arrive in fifteen or twenty minutes.',
         'Nobody has time to call you. If you cannot stand up and you are near the sea, you go.',
         'Safe means more than thirty metres above the sea. Higher, not further.',
         'Where would you go from the beach you know? Draw the way.'],
       levels:{
         'Support':{task:'Choose the safe place in three pictures.',
               help:'Three pictures with heights marked.'},
         'Core':{task:'Draw your escape route from a beach and mark the safe place.',
               help:'Frame: "I must go to ____ because ____."'}}},
      {s:3,title:'Alerta, alarma, SISMATE',
       objective:'Tell the difference between getting ready and going.',
       view:[
         'Alerta means get ready. Alarma means go now. Two words, two different things.',
         'The Navy is the one who says it, and the one who says it is over.',
         'SISMATE sends emergency messages to phones. It does NOT warn before an earthquake.',
         'No machine in the world does that today. Your plan and your legs are the alarm.'],
       levels:{
         'Support':{task:'Sort six cards into ALERTA and ALARMA.',
               help:'Cards with pictures.'},
         'Core':{task:'Explain to a younger child what SISMATE does and what it does not.',
               help:'Two sentences, no more.'}}},
      {s:4,title:'The five steps',
       objective:'Put safety steps in the right order.',
       view:[
         'Five steps on the screen, mixed up. Put them in order in the app.',
         'Check it. Any step in the wrong place changes everything.',
         'Act it out: the earthquake, the standing up, the walking, the high ground, the waiting.',
         'Copy the five steps into your notebook. You are going to need them in week 9.'],
       levels:{
         'Support':{task:'Number the five steps.',
               help:'Steps written out.'},
         'Core':{task:'Write the five steps in your own words.',
               help:'The app open.'}}}
     ]},
    {n:5,title:'When people get hurt',desc:'The body, the aches and how you say where it hurts. Who you tell and what you say.',
     give:'A four-line dialogue: somebody is hurt and you help.',
     cambridge:{paper:'Reading & Writing', part:'Part 2',
       focus:'A short dialogue, choosing the answer A, B or C. The same speaking turns we practise here.'},
     sessions:[
      {s:1,title:'Head, arm, leg',
       objective:'Name the parts of the body.',
       view:[
         'Simon says, with the six words: head, arm, leg, back, knee, ankle.',
         'Point to it on yourself, then on the drawing.',
         'Draw a body on the board and label it as a class.',
         'Fast round: the teacher says the word, you touch it.'],
       levels:{
         'Support':{task:'Label the body with the six words given.',
               help:'Drawing with lines to fill.'},
         'Core':{task:'Label the body and add three more parts you know.',
               help:'Drawing, no words given.'}}},
      {s:2,title:'It hurts',
       objective:'Say where it hurts.',
       view:[
         'My leg hurts. My back hurts. One part: hurts with an s.',
         'headache, stomachache, backache. The -ache is one sound, like ake.',
         'I have a headache. Not I have headache. The a matters.',
         'Mime and guess: you show it, your partner says it.'],
       levels:{
         'Support':{task:'Match five pictures with My ____ hurts.',
               help:'Pictures and sentence starts.'},
         'Core':{task:'Write five sentences: three with hurts and two with I have a.',
               help:'Word bank of aches.'}}},
      {s:3,title:'Are you all right?',
       objective:'Ask if somebody is hurt and answer.',
       view:[
         'Are you all right? Where does it hurt? Can you walk?',
         'Answers: Yes, I am fine. No, my knee hurts. I cannot stand up.',
         'Roleplay in threes: one is hurt, one asks, one goes for help.',
         'Who do we tell in this school? Say the name out loud.'],
       levels:{
         'Support':{task:'Complete the dialogue with the three answers given.',
               help:'Dialogue with gaps.'},
         'Core':{task:'Write and act your own four-line dialogue.',
               help:'Question words on the board.'}}},
      {s:4,title:'Cuts and bruises',
       objective:'Talk about small injuries and the first-aid kit.',
       view:[
         'cut, bruise, hurt. What is the difference between a cut and a bruise?',
         'What is inside a first-aid kit? Open one and look.',
         'What we do NOT do: move somebody who cannot move, or touch a wound with dirty hands.',
         'Hand in your dialogue. Two people have to be able to act it.'],
       levels:{
         'Support':{task:'Sort six pictures into cut and bruise.',
               help:'Pictures.'},
         'Core':{task:'Write what you would do in three situations.',
               help:'Frame: "First I ____, then I ____."'}}}
     ]},
    {n:6,title:'The backpack',desc:'The real INDECI list: eight kilos, one litre of water each, the first 24 hours. must and must not.',
     give:'Your list of eight things, each with a reason.',
     cambridge:{paper:'Listening', part:'Part 4',
       focus:'Three-option multiple choice with pictures. Listening for the one detail that decides it.'},
     sessions:[
      {s:1,title:'What INDECI says',
       objective:'Know what an emergency backpack is for.',
       view:[
         'One backpack, by the door, ready. Not in the wardrobe, by the door.',
         'Eight kilos maximum. One litre of water for every person.',
         'It is for the first 24 hours, when nobody can come to help yet.',
         'Weigh your school bag. Is it more or less than eight kilos?'],
       levels:{
         'Support':{task:'Circle the three rules of the backpack.',
               help:'Rules with pictures.'},
         'Core':{task:'Write the three rules in your own words and say why each one exists.',
               help:'The three numbers on the board.'}}},
      {s:2,title:'Choose eight',
       objective:'Choose what goes in and justify it.',
       view:[
         'Fourteen things on the screen. Only eight go in.',
         'Choose in pairs. You have to agree before you touch the screen.',
         'Check. Read why each one is right or wrong.',
         'The hardest ones: the mirror and the football. Why not?'],
       levels:{
         'Support':{task:'Choose eight things from the fourteen.',
               help:'The app, in pairs.'},
         'Core':{task:'Choose eight and write why you left two of the others out.',
               help:'The app, then your notebook.'}}},
      {s:3,title:'must and must not',
       objective:'Give a rule, not an opinion.',
       view:[
         'must is a rule. must not is never, it is dangerous. should is a good idea.',
         'You must take water. You must not take a mirror.',
         'Ten sentences to sort in the app: must or must not.',
         'Careful: must not is not the same as do not have to.'],
       levels:{
         'Support':{task:'Sort eight sentences into must and must not.',
               help:'The app.'},
         'Core':{task:'Sort the ten and write two more of your own.',
               help:'The app plus your notebook.'}}},
      {s:4,title:'Because',
       objective:'Give the reason for a rule.',
       view:[
         'We must take water because we cannot drink from the tap after an earthquake.',
         'Rule first, because second. One reason is enough.',
         'Round the class: one thing, one reason, no repeating.',
         'Hand in your eight things, each with its because.'],
       levels:{
         'Support':{task:'Match five rules with five reasons.',
               help:'Rules and reasons cut up.'},
         'Core':{task:'Write your eight things with a because for each one.',
               help:'Frame: "We must take ____ because ____."'}}}
     ]},
    {n:7,title:'The safe zone and the drill',desc:'Where the safe zone is and why. Drop, cover and hold on. The three moments of a Peruvian drill.',
     give:'The map of your classroom with the safe zone and the way out.',
     cambridge:{paper:'Reading & Writing', part:'Part 3',
       focus:'A gapped story with a word bank, and choosing the title. Reading for the whole, not for one word.'},
     sessions:[
      {s:1,title:'Where is it in our room',
       objective:'Find the safe zone of your own classroom.',
       view:[
         'The safe zone is where a column meets a beam. The strongest part of the building.',
         'It is not next to the window and it is not under the shelf.',
         'Walk to it. Everybody. How long did it take?',
         'Where is the green sign? Who can see it from their chair?'],
       levels:{
         'Support':{task:'Mark the safe zone on the plan of the classroom.',
               help:'Plan with the columns drawn.'},
         'Core':{task:'Draw the plan of your classroom and mark the safe zone and the exit.',
               help:'Blank paper.'}}},
      {s:2,title:'Drop, cover, hold on',
       objective:'Give an instruction with one word.',
       view:[
         'Three verbs, three actions. Drop. Cover. Hold on.',
         'An instruction starts with the verb: Go, Stop, Wait, Listen.',
         'No please, no you, no maybe. In an emergency the verb goes first.',
         'Do it three times, faster each time, until nobody has to think.'],
       levels:{
         'Support':{task:'Match six instructions with six pictures.',
               help:'Pictures and instructions.'},
         'Core':{task:'Write six instructions for the classroom door.',
               help:'Verbs on the board.'}}},
      {s:3,title:'should',
       objective:'Give advice that is not an order.',
       view:[
         'You should have a torch at home. You should know the meeting point.',
         'should is advice. must is a rule. Which one for the family meeting point?',
         'Six situations: is this a must or a should?',
         'Two pieces of advice for a family that has just moved to Lima.'],
       levels:{
         'Support':{task:'Choose must or should in six sentences.',
               help:'Two options each.'},
         'Core':{task:'Write four sentences, two with must and two with should.',
               help:'Situations on the board.'}}},
      {s:4,title:'The drill, for real',
       objective:'Take part in a drill and measure it.',
       view:[
         'Three moments: the alarm, two minutes in the safe zone, out by the marked route.',
         'We do it. Somebody times it with a watch.',
         'How long did we take? Write the number on the board.',
         'Do it again. Did we improve? By how many seconds?'],
       levels:{
         'Support':{task:'Number the three moments of the drill.',
               help:'Three pictures.'},
         'Core':{task:'Write what went well and one thing to improve, with the times.',
               help:'The two times on the board.'}}}
     ]},
    {n:8,title:'How a safety flyer works',desc:'Reading a real flyer as a model: headings, captions and pictures, and the instruction hidden inside the text.',
     give:'The three headings of your flyer with one instruction under each.',
     cambridge:{paper:'Reading & Writing', part:'Part 4',
       focus:'A factual text with three options per gap. Exactly the kind of text we are reading this week.'},
     sessions:[
      {s:1,title:'Taking a flyer apart',
       objective:'Recognise the parts of an informative flyer.',
       view:[
         'A real flyer on every desk. Do not read it yet. Look at it.',
         'What is a heading, what is a caption, what is a picture doing there?',
         'Now read it. Was your guess right?',
         'Which part would you look at first if the ground was moving?'],
       levels:{
         'Support':{task:'Label the three parts of the flyer.',
               help:'Flyer with arrows.'},
         'Core':{task:'Say what each part is for, in one line each.',
               help:'Flyer and blank paper.'}}},
      {s:2,title:'Find the instruction',
       objective:'Find a safety instruction inside a text.',
       view:[
         'Not everything in a flyer is an instruction. Some of it is explanation.',
         'Underline only what tells you to DO something.',
         'How many did you find? Compare with your partner.',
         'The ones you both underlined are the important ones.'],
       levels:{
         'Support':{task:'Underline four instructions in a short text.',
               help:'Text with four of them.'},
         'Core':{task:'Underline the instructions and write them as a list.',
               help:'Longer text.'}}},
      {s:3,title:'Before, during, after',
       objective:'Organise information in three parts.',
       view:[
         'Every good safety flyer has the same skeleton: before, during, after.',
         'Nine actions on cards. Which of the three is each one?',
         'Check in the app. Any that surprised you?',
         'Why is the order important? What happens if you mix them up?'],
       levels:{
         'Support':{task:'Sort six actions into the three moments.',
               help:'Cards with pictures.'},
         'Core':{task:'Sort the nine and add one of your own to each moment.',
               help:'The app.'}}},
      {s:4,title:'Would a little kid understand this?',
       objective:'Judge whether an instruction is clear.',
       view:[
         'Three badly written instructions on the board. What is wrong with each?',
         'Too long, two ideas in one, or a word nobody knows.',
         'Rewrite them so a six-year-old could follow them.',
         'Write your three headings. One instruction under each. That is your plan.'],
       levels:{
         'Support':{task:'Choose the clearer of two instructions, five times.',
               help:'Pairs of instructions.'},
         'Core':{task:'Rewrite three bad instructions and write your three headings.',
               help:'The three bad ones on the board.'}}}
     ]},
    {n:9,title:'Writing my flyer',desc:'Three parts, 90 to 110 words, with must, must not and should. And a drawing in each part.',
     give:'Your first draft, with its three drawings.',
     cambridge:{paper:'Reading & Writing', part:'Part 5',
       focus:'Completing sentences about a story with one to three words. Writing short and exact, like a flyer.'},
     sessions:[
      {s:1,title:'The plan',
       objective:'Plan a text before writing it.',
       view:[
         'Your three headings from Thursday. Are they still the right ones?',
         'Under each one: what does the family have to know? Two ideas maximum.',
         'A flyer is not everything you know. It is what they need.',
         'Cross out one idea per section. Yes, really.'],
       levels:{
         'Support':{task:'Complete the plan with the ideas given.',
               help:'Plan with gaps.'},
         'Core':{task:'Write your own plan with two ideas per section.',
               help:'Blank plan.'}}},
      {s:2,title:'Before and During',
       objective:'Write the first two sections.',
       view:[
         'Open the app, My flyer. Section one: Before.',
         'Short sentences. One idea each. Start with You must or You should.',
         'Section two: During. This is the one they will read while it shakes.',
         'The counter is at the bottom. Do not look at it yet.'],
       levels:{
         'Support':{task:'Complete the two sections with the frames given.',
               help:'Sentence frames.'},
         'Core':{task:'Write the two sections in your own words.',
               help:'The word wall.'}}},
      {s:3,title:'After, and the count',
       objective:'Finish the text and adjust the length.',
       view:[
         'Section three: After. What do we do when it stops?',
         'Now look at the counter. Between 90 and 110 words.',
         'Too short: what did you leave out that they need?',
         'Too long: which sentence says the same as another one?'],
       levels:{
         'Support':{task:'Complete the third section and count the words.',
               help:'Frames and a counter.'},
         'Core':{task:'Finish the flyer and cut or add until it is between 90 and 110.',
               help:'The counter.'}}},
      {s:4,title:'The three drawings',
       objective:'Support a text with a picture.',
       view:[
         'A drawing in a flyer is not decoration. It says what the words say.',
         'One drawing per section. Somebody who cannot read has to understand it.',
         'Draw them. Big, clear, few lines.',
         'Show them to your partner without the text. What did they understand?'],
       levels:{
         'Support':{task:'Choose the right drawing for each section, from six.',
               help:'Six drawings.'},
         'Core':{task:'Draw your three and check them with a partner who does not read the text.',
               help:'Blank paper.'}}}
     ]},
    {n:10,title:'Making it better',desc:'The peer check, the verbs, and reading it out loud so that it can be heard from the back.',
     give:'Your finished flyer.',
     cambridge:{paper:'Speaking', part:'Parts 1 and 2',
       focus:'Four differences between two pictures, and describing each picture of a story. Speaking with your flyer in hand.'},
     sessions:[
      {s:1,title:'The real test',
       objective:'Check whether somebody else can follow your instructions.',
       view:[
         'Swap flyers with somebody who is not your partner.',
         'Read it and do only what it says. Nothing else.',
         'Where did you get stuck? Mark it with a pencil.',
         'Give it back and explain the mark. Do not defend yours, listen.'],
       levels:{
         'Support':{task:'Check three things on a list and mark them.',
               help:'Checklist with pictures.'},
         'Core':{task:'Write two things that worked and one that did not, for your partner.',
               help:'Checklist.'}}},
      {s:2,title:'The verbs',
       objective:'Correct the modal verbs in your own text.',
       view:[
         'Go through your flyer looking only at must, must not and should.',
         'Is it a rule or advice? Change the ones that are wrong.',
         'must not, never do not must. Check every one.',
         'Read your sentences out loud. Do they sound like an order or like a suggestion?'],
       levels:{
         'Support':{task:'Correct six sentences with the wrong verb.',
               help:'Sentences with the verb marked.'},
         'Core':{task:'Correct your own flyer and explain two changes you made.',
               help:'Your draft.'}}},
      {s:3,title:'Out loud',
       objective:'Read a text so that it can be understood.',
       view:[
         'Stand up. Feet still. Paper down, not in front of your face.',
         'Slowly. In an emergency nobody understands somebody who talks fast.',
         'Practise in pairs, one reads and one stands at the back of the room.',
         'Could they hear you? If not, again.'],
       levels:{
         'Support':{task:'Read your flyer to one partner.',
               help:'Sitting down, close.'},
         'Core':{task:'Read it to three people, one of them from the back of the room.',
               help:'Standing up.'}}},
      {s:4,title:'The final copy',
       objective:'Produce a clean final version.',
       view:[
         'Final copy: the text as it is now, the three drawings, your name.',
         'Check the spelling of the words from the wall. They are all on it.',
         'Hand it in from the app, the Submit button at the bottom.',
         'Whoever finishes helps somebody who has not.'],
       levels:{
         'Support':{task:'Copy out the final version with the model.',
               help:'Model layout.'},
         'Core':{task:'Produce the final version and hand it in from the portal.',
               help:'The app.'}}}
     ]},
    {n:11,title:'The safety fair',desc:'You present the flyer to people who did not write it, you answer their questions, and you check your own house.',
     give:'Your presentation and the family reflection.',
     cambridge:{paper:'Reading & Writing / Speaking', part:'Part 6 and Parts 3 and 4',
       focus:'Answering questions and writing two sentences about a picture; odd one out and personal questions. A full Movers rehearsal.'},
     sessions:[
      {s:1,title:'Rehearsal',
       objective:'Rehearse a short presentation.',
       view:[
         'Thirty seconds. Who you are, what your flyer is, one thing they must remember.',
         'Practise it three times in pairs, changing partner each time.',
         'The third time, without looking at the paper.',
         'What question do you think they will ask you? Prepare the answer.'],
       levels:{
         'Support':{task:'Say the three sentences with the frame.',
               help:'Frame with gaps.'},
         'Core':{task:'Present without the paper and answer two questions.',
               help:'Only your drawings.'}}},
      {s:2,title:'The fair',
       objective:'Explain your work to somebody who did not do it.',
       view:[
         'The flyers go up around the room. Half the class stays, half visits.',
         'Visitors: you have to come back with one thing you did not know.',
         'Then swap. Everybody presents and everybody visits.',
         'The guests arrive: another class, or the families.'],
       levels:{
         'Support':{task:'Present with your flyer in your hand.',
               help:'The flyer as support.'},
         'Core':{task:'Present without the flyer and ask your visitor a question.',
               help:'Only the drawings.'}}},
      {s:3,title:'Their questions',
       objective:'Answer questions about your own work.',
       view:[
         'Questions from the visitors. Some of them you will not know.',
         'I do not know is a good answer if you add I can find out.',
         'The three questions that came up most: we answer them as a class.',
         'What would you change in your flyer after hearing them?'],
       levels:{
         'Support':{task:'Answer three questions with the answers given.',
               help:'Answer bank.'},
         'Core':{task:'Answer three questions in your own words and write one you could not answer.',
               help:'Your notebook.'}}},
      {s:4,title:'And in my house?',
       objective:'Check your own family plan.',
       view:[
         'Does your family have a meeting point? Do you know where it is?',
         'Is there a backpack? Where? When did somebody last look inside it?',
         'Write it down honestly. Nobody is going to tell you off.',
         'Exit ticket: one thing I must do during an earthquake. One line.'],
       levels:{
         'Support':{task:'Tick the four questions and write the exit ticket.',
               help:'Yes/no list.'},
         'Core':{task:'Write what your house has, what it does not, and what you are going to do about it.',
               help:'Four questions on the board.'}}}
     ]}
  ],
  words:['earthquake','tsunami','landslide','flood','plate','fault','Ring of Fire','magnitude','intensity','aftershock','epicentre','safe zone','drill','shelter','exit','danger','emergency kit','torch','whistle','blanket','first-aid kit','head','arm','leg','back','knee','ankle','headache','stomachache','backache','cut','bruise','hurt','must','must not','should','have to','Drop, cover, hold on','before','during','after','was','were','-ed'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128221;', title:'Your safety flyer',
     desc:'Three parts \u2014 before, during and after an earthquake \u2014 each with a heading, one instruction and a drawing.',
     spec:'90\u2013110 words, three sections',
     range:[90,110],
     checklist:[
       {k:'before', t:'My flyer has a BEFORE part', re:'(before)'},
       {k:'during', t:'My flyer has a DURING part', re:'(during|while)'},
       {k:'after', t:'My flyer has an AFTER part', re:'(after|afterwards)'},
       {k:'modal', t:'I use must, must not or should', re:'(must|should|have to)'},
       {k:'kit', t:'I say what the family must have ready', re:'(water|torch|radio|whistle|blanket|kit|backpack|bag)'},
       {k:'zone', t:'I say where to go', re:'(safe zone|meeting point|high ground|exit|outside|column)'}
     ]},
    {kind:'presentation', type:'file', icon:'&#127908;', title:'Your flyer at the safety fair',
     desc:'A photo of your flyer and, if you can, a recording of you explaining it to a visitor.',
     spec:'Photo, and audio if possible'},
    {kind:'reflection', type:'text', icon:'&#127968;', title:'And in my house?',
     desc:'What your family already has ready, what it does not, and the one thing you are going to do about it.',
     spec:'Three or four lines, honest'}
  ]
}
    ],

    /* Lo que el planner del colegio tenia para P5 y P6 antes de que el area
       pidiera una sola unidad de once semanas. NO se ofrece (el portal solo
       lee `units`) y NO se borra: mientras el plan anual siga diciendo Sistema
       Solar y el proyecto de ingles diga terremotos, el desacuerdo tiene que
       quedar a la vista de quien lo abra. Lo resuelve coordinacion. */
    superseded:[
/* --------------------------------------------- 3.o U5 (piloto 2026) */
{
  cover:{icon:'🪐', from:'#1b2a63', to:'#5566c4'},
  n:5, label:'5 · pilot', pilot:true,
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
  n:6, label:'6 · pilot', pilot:true,
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
  n:5, label:'5 · pilot', pilot:true,
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
  n:6, label:'6 · pilot', pilot:true,
  title:'Where Our Water Comes From',
  weeks:6,
  bigq:'Where does our water come from, and what would happen if we used it as though it would never run out?',
  situation:'Water goes round: it evaporates, it forms clouds, it falls, it runs to the sea and starts again. On the way it becomes something we use — and something that can run out. You read Incredible Earth, you measure the weather yourself for two weeks, and you build the guide that will hang in the corridor: the one that tells the whole school where our water comes from and what it costs.',
  audience:'The whole school, in the corridor. People walk past — they do not sit down to read. It has to work in thirty seconds.',
  client:'The school · the guide goes up on the corridor wall',
  reader:{title:'Incredible Earth', series:'Oxford Dolphin Readers', term:3, inPortal:false,
          note:'It fits perfectly with the unit: natural resources, the water cycle and climate.'},
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
  n:5, label:'5 · pilot', pilot:true,
  title:'The Air and the Water of Our Region',
  weeks:5,
  bigq:'What is the air and the water around us really like, and what should be done about it?',
  situation:'You read Exploring Our World and you learn how the atmosphere and the hydrosphere work anywhere on the planet. Then you look out of the window. You map your own area, you find real data about its air or its water, you tell a primary source from a secondary one, and you take a position — with evidence, not with feelings. The report goes to the people who can actually do something about it.',
  audience:'Whoever can act on it: the school’s leadership, or the district. A report nobody can act on is not finished.',
  client:'The school leadership · or the district office',
  reader:{title:'Exploring Our World', series:'Oxford Dolphin Readers', term:3, inPortal:false,
          note:'Already assigned to this unit in the Annual Plan (U5 W1).'},
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
  n:6, label:'6 · pilot', pilot:true,
  title:'Worth Saving',
  weeks:6,
  bigq:'What is worth saving — and can you convince anybody else of it?',
  situation:'Some things are free and endless, like the air; others are not, and somebody pays for them. This unit is about telling the two apart and doing something about it. You choose one resource, you find out what it really costs the school, you build a savings plan with your own data, and then you have to persuade a hall full of people who did not ask to be persuaded.',
  audience:'The whole school at the closing showing. You have three minutes and they can walk away.',
  client:'The school · closing showing',
  reader:{title:null, term:3, inPortal:false, note:'Grade 5 has two books in English and both are already used (U2 and U5). This is the gap in the reading plan to solve for 2027.'},
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
  cover:{icon:'🔌', from:'#123f4f', to:'#3f9bb0', image:'assets/unit-covers/g9-u5-technology.png'},
  n:5,
  title:'Does Our School Run on Data?',
  weeks:11, perProduct:true,
  breaks:[{after:3, title:'Mid-term holiday', dates:'5–9 October',
           text:'No lessons. After Mock 2 (week 3) and the holiday, the unit restarts on Tuesday 13 October with week 4. The remaining content is reorganised into weeks 4–10 (to Friday 27 November), and week 11 (30 November – 4 December) is for presenting the work and for assessment: nothing is dropped. Cambridge B2 First: Wednesday 2 December.'}],
  bigq:'What does artificial intelligence really cost our school — and what should we do about it?',
  situation:'The school runs on screens: tablets in class, an AI assistant here, a cloud folder there. All of it costs energy, water and money somewhere, and nobody at NIS has ever measured it. The leadership team has to write a policy on how AI and screens are used next year, and they do not have the data. You are going to get it for them. You audit what really happens in this building, you compare it with what the research says, and you hand them a proposal they can act on — or reject, if you have not argued it well enough. This is the English half of the Term 3 project The instrument that measures whether we are better off, and it runs the whole term: in weeks 1–6 you collect real samples of data in this building, recommend what to do about them and follow your number into the year 802,701 in a story written the way H.G. Wells wrote his; in weeks 7–10 you take a second sample, turn on what you built and argue, seriously, whether the school should be collecting that number at all — in an essay, and then in a formal debate; in week 11 you present the whole journey and close the unit. Four graded products: the proposal, the story, the essay, and the defence and debate.',
  audience:'The leadership team of NIS. They will read your proposal to write next year’s policy, and they will ask you questions you have not rehearsed.',
  client:'NIS leadership team · they write the policy',
  reader:{title:'The Time Machine', series:'Vicens Vives · Reading & Training Step Three B1.2', term:3, inPortal:false,
          note:'The book of the term and the method of the unit: Wells took one fact of 1895 and followed it into the year 802,701. Chapters 1–6 in this unit, on paper; the rest in Unit 6.'},
  exam:{target:'b2first',
        themes:['technology','environment','society','ethics','education'],
        grammar:['proposal register: I would recommend, it is advisable to','passive for processes','concession: although, despite, even though','hedging: may, might, tends to','advanced connectors: nevertheless, moreover, in contrast','narrative tenses: past simple, past continuous, past perfect, past perfect continuous','sequence adverbs: eventually, meanwhile, suddenly'],
        extra:['artificial intelligence','algorithm','data centre','energy consumption','carbon footprint','e-waste','screen time','policy','trade-off','evidence','plot','setting','narrator','foreshadow','twist']},
  areas:[{area:'philosophy', level:2},{area:'ict', level:2},{area:'math', level:2},{area:'comunicacion', level:1}],
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
    {n:3, text:'Defence and debate — hold your position in front of people who can say no.',
     levels:{
       C:'I read my proposal out loud.',
       B:'I present it and answer easy questions.',
       A:'I speak from notes, take questions I did not expect, and build on what my teammates say.',
       AD:'I change my mind out loud when the objection is good, and say why — without losing the argument.'}},
    {n:4, text:'Story — follow your number into the year 802,701 with the four narrative tenses.',
     levels:{
       C:'I retell what happened during the audit; nothing is imagined, and the tenses wander.',
       B:'A future is imagined, but the story lives in one tense and the number is decoration.',
       A:'The number drives the plot; past simple, continuous, perfect and perfect continuous each go where they belong, with sequence adverbs.',
       AD:'The reader works out what the number was from what it became — I never explain it, and the tenses carry every jump in time on their own.'}},
    {n:5, text:'Essay — present both sides, with evidence, before your own.',
     levels:{
       C:'I give my opinion and one reason.',
       B:'Both sides appear, but one is a straw man, or my position comes first.',
       A:'Two reasons for and two against, each with evidence, and my position only at the end, in formal register.',
       AD:'I find the weakest point of my own side, say why I still hold it, and nothing in my text is a fallacy I would spot in somebody else’s.'}}
  ],
  sequence:[
    {n:1,title:'The brief, and the machine',dates:'14–18 September',desc:'The leadership team explains what policy they have to write and what they are missing. Teams form and each one takes one question of the audit. And the book of the term opens: Wells, the man who measured his own century and followed it into the future.',
     give:'Your audit question and the team’s plan — what you will measure and how.',
     across:{
       philosophy:'What “being well” means before anyone measures it: the unit ¿Qué significa ser feliz? starts this same week.',
       ict:'Identifying the project and the single piece of data the instrument will collect: your audit question is the instrument’s question.',
       math:'Domain and range of a real function: what values your number can take, and which it cannot.',
       comunicacion:'The observatory question, written in Spanish to present it to the school.'},
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
         'Each team drafts its own and passes it to the team on the right. The other team tries to break it: how would you measure THAT, exactly?',
         'The same number is the one the ICT instrument will collect in week 5: choose one a form or a sensor could log.'],
       levels:{
         'A2':{task:'Choose your question from three options and write what number will come out of it.',
               help:'Three questions ready, and the sentence "At the end I will have a number that says ____."'},
         'B1':{task:'Write your own audit question and say what unit the answer will be in.',
               help:'Minutes, kilowatt-hours, devices, litres. Choose one.'},
         'B2':{task:'Write your question and explain why it can be measured with what we have.',
               help:'What instrument, what access, what permission.'},
         'C1':{task:'Write your question, and rewrite the weakest of the three you were given.',
               help:'Say what made it weak.'}}},
      {s:3,title:'The Time Machine, chapter one',
       objective:'Read Wells taking one fact of his own time and following it 800,000 years forward — the method your story will borrow.',
       view:[
         'Read the opening aloud, in turns. Wells writing in 1895 about the year 802,701. Where does the voice pause, where does it speed up?',
         'The elements on the board: plot, character, setting, theme, conflict. Find each one in the chapter.',
         'The collocations of the trade: build tension, foreshadow, deliver a twist. Which does Wells use in the first ten pages?',
         'What does he get right about how technology changes a society? What does he invent? Ten minutes of silent reading to close.'],
       levels:{
         'A2':{task:'Answer five comprehension questions and match the five narrative elements to an example from the chapter.',
               help:'Questions with two options each; the elements with a definition.'},
         'B1':{task:'Answer the questions and write what Wells assumes about progress, using three of the unit’s words.',
               help:'Frame: "Wells thinks that…"'},
         'B2':{task:'Explain what Wells gets right and what he invents, with evidence from the text, and name the technique he uses to build tension.',
               help:'Quote at least once.'},
         'C1':{task:'Explain what Wells assumes about progress, whether we still assume it, and how the narrator-witness makes the story believable.',
               help:'Connect it to the debate about AI.'}}},
      {s:4,title:'Building the plan',
       objective:'Turn the question into a plan somebody else could carry out.',
       view:[
         'Five columns on the board: what, where, when, who, with what.',
         'Each team fills in its own plan. Anything vague gets a red mark.',
         'The awkward question: what permission do we need, and who asks for it? Coordination has to agree the data and the consent this week, not in week five.',
         'Rehearse in one sentence what you will be doing next Tuesday at 10am.'],
       levels:{
         'A2':{task:'Complete the five columns of the plan with the options given.',
               help:'Plan template with examples in the first row.'},
         'B1':{task:'Write your plan in five steps, saying who does each one.',
               help:'Model plan for a different question, to follow.'},
         'B2':{task:'Write your plan including what you will do if the measurement fails.',
               help:'Something always fails. Which part of yours is most fragile?'},
         'C1':{task:'Write the plan and justify why this measurement answers the brief.',
               help:'Quote the brief on the wall.'}}}
     ]},
    {n:2,title:'What is already known',dates:'21–25 September',desc:'The plan under attack, then the research on the energy and water cost of AI. Telling a solid source from a loud one — and, from Wells, how a narrator makes you believe a future.',
     give:'Three sources, classified, with what each one lets you claim; and the map of your story.',
     across:{
       philosophy:'Capability theory (Sen and Nussbaum): being well is what people can do and be — the criterion that says why measure this number and not another.',
       ict:'Web application development with Mimo: first prototype of the form that will collect your number.',
       math:'Studying a real function: the shape of a number that changes over time.',
       comunicacion:'The list of capabilities, translated and discussed.'},
     sessions:[
      {s:1,title:'The plan under attack',
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
               help:'Not every objection has to be accepted — but you have to answer it.'}}},
      {s:2,title:'What the research says about AI and energy',
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
      {s:3,title:'Reliable or loud?',
       objective:'Judge a source you found yourself, and see what nobody has measured here.',
       view:[
         'Each team brings a source found outside class. On the board, all of them.',
         'Four tests: who says it, how they know, when, and who benefits. The uncomfortable one: a source that says what we wanted to hear.',
         'On the board, everything the class can now claim with sources — and the list of things nobody has measured at NIS. That second list is your audit.',
         'Hand in: three sources, classified, with what each one lets your team claim.'],
       levels:{
         'A2':{task:'Classify three sources into reliable / not sure, using the four tests.',
               help:'The four tests as a checklist.'},
         'B1':{task:'File your three sources with one usable fact from each, and write what you will have to measure yourself.',
               help:'Useful: "The research shows… but nobody has measured…"'},
         'B2':{task:'File your sources, explain why you discarded one, and say what your measurement adds to what is already published.',
               help:'If it adds nothing, change the question.'},
         'C1':{task:'File your sources ranked by reliability FOR YOUR QUESTION, and identify which of your claims is weakest and why.',
               help:'A source can be excellent and useless for what you are asking.'}}},
      {s:4,title:'Technique and voice: the map of your story',
       objective:'See how Wells makes a future believable, and decide how you will make yours.',
       view:[
         'Chapter two. Why a narrator-witness in the first person and not the Time Traveller himself? Find the sentence where you first believe him.',
         'Structure and voice on the board: exposition, complication, climax; first or third person; linear, in medias res, flashback.',
         'Your story: the year 802,701 of your number. Take the thing you are measuring and follow it forward. Who lives there, and what has it done to them?',
         'Story map in four boxes: protagonist, setting, conflict, twist. Tell the premise to a partner in one minute; take one clarifying question.'],
       levels:{
         'A2':{task:'Complete the story map with the four boxes, choosing your setting from three given.',
               help:'Story map template with an example for a different number.'},
         'B1':{task:'Complete your story map and write which voice you will use and why.',
               help:'Frame: "I chose ___ because it makes the reader feel ___."'},
         'B2':{task:'Complete the story map and write a technique analysis: the voice and structure you chose, with the effect you want on the reader.',
               help:'80–100 words. Quote the sentence of Wells you are imitating.'},
         'C1':{task:'Complete the map and the technique analysis, and say what Wells would have to change in his own chapter to tell YOUR story.',
               help:'The number is the machine. Everything else follows from it.'}}}
     ]},
    {n:3,title:'Mock 2 — written and speaking',dates:'28 September – 2 October',
     desc:'No unit lessons this week: the whole week was Mock 2, the written papers and the speaking test. The unit continues in week 4.',
     give:'Nothing for the unit — your Mock 2 papers.',
     sessions:[]},
    {n:4,title:'Measuring this building',dates:'13–16 October',
      video:{src:'https://nis.cohasset.pe/nis-fun/assets/videos/g9/g9-u5-week4.mp4', poster:'https://nis.cohasset.pe/nis-fun/assets/videos/g9/g9-u5-week4.jpg', title:'Watch first — what we do this week (3:40)'},desc:'The audit itself, with ICT and Maths: devices, screen minutes, kWh, AI use and e-waste at Nordic International School. Five teams, five questions, one protocol — real numbers from our own building. On Friday, the grammar for telling what happened.',
     give:'Your team’s dataset (record sheet + cleaned table), the method you followed, one chart with its caption, and a test scene in the four past tenses.',
     across:{
       philosophy:'The longest study on happiness (Harvard): what can only be known by looking for a long time — and what eleven weeks of data cannot tell you.',
       ict:'Arduino and Tinkercad: the sensor as an instrument. What the hand-count of this week could be logged automatically. Spreadsheet for the shared sheet and the chart.',
       math:'Quadratic function: what something that accelerates looks like. Your totals and averages, per student and per room; why a sample of 20 can speak for 400.',
       comunicacion:'The Harvard study, summarised in Spanish.'},
     sessions:[
      {s:1,title:'The protocol, agreed — and the sampling plan',from:'3.1',
       objective:'Agree ONE protocol and ONE sampling plan, so that five teams measure five different things in a way that can be put together and repeated.',
       hook:'The teacher puts two rulers on the desk — one in centimetres, one in inches — and asks two volunteers to measure the same desk. Two numbers, one desk: 120 and 47. Who is right? Both. Now imagine five teams doing that across the whole school. Bet: how many tablets are plugged in and charging in the secondary building at 10:15 on a Tuesday? Everyone writes a guess on a sticky note. On Thursday we will know — and the closest guess wins.',
       explain:'You cannot measure everything, so you measure a SAMPLE: a small, well-chosen part that stands for the whole. A good sampling plan answers six questions before anyone leaves the room: What are we counting? Where? When? How? In what unit? And who is in the data — always an anonymous code, never a name. If two teams answer these differently, their numbers cannot be compared, and the leadership team will not trust any of them.',
       example:'Plan card, Team 1 (Devices): “We will count every device that is ON, CHARGING or IDLE in each of the 12 secondary classrooms at 10:15 and at 12:30, on Tuesday 13 and Thursday 15 October. One person counts, one writes, one checks. Unit: devices per classroom.” Row: 13-Oct | 10:15 | Room 9A | on 14 | charging 6 | idle 3 | counted by T1-B.',
       sample:{
         what:'Five teams, five questions. T1 Devices: how many devices are on, charging or idle? T2 Screen time: how many minutes a day do students spend on screens? T3 Energy: how many kWh does a charging cart use? T4 AI use: how often do students and teachers use AI, and for what? T5 E-waste: how many devices are in storage, broken or retired?',
         where:'T1: every secondary classroom (12 rooms), plus library and ICT lab. T2: the tablets/phones of ~20 volunteers from grades 9–11. T3: the charging carts of the secondary building (2–3 carts). T4: one lesson per subject (at least 6 subjects) + an anonymous form for ~30 students. T5: the ICT storeroom and the cupboards the ICT teacher opens for us.',
         when:'T1: 10:15 and 12:30 on Tue 13 and Thu 15 Oct (4 counts). T2: the volunteers send a screenshot of Screen Time for the LAST 7 DAYS on Tue 13 Oct (no waiting needed — the data is already in the tablet). T3: one full school day, 07:30–15:30, on Wed 14 Oct. T4: lessons Tue 13–Thu 15 Oct; the form is open until Thursday. T5: one visit on Wed 14 Oct, 10 minutes with the ICT teacher.',
         how:'T1: tally sheet, one person counts and a second checks the same room. T2: Settings > Screen Time (iPad/iPhone) or Digital Wellbeing (Android) > screenshot of the weekly average; the volunteer gets a code (S-01 to S-20). T3: a plug-in energy meter between the cart and the wall, read at 07:30 and 15:30; if no meter is available, estimate: watts on the charger label × hours plugged in ÷ 1000. T4: a tally in one lesson per subject (teacher agrees; we count prompts, not people) + 10-question anonymous form (Yes/No and 1–5 scale). T5: count by type (tablet, laptop, phone, charger, other), by condition (working, broken, unknown) and write the label’s year.',
         unit:'T1 devices per room · T2 minutes per day (average of 7 days) · T3 kWh per day (kWh = kW × hours) · T4 AI uses per lesson, and % of students who use AI at least once a week · T5 number of items, and kg if a scale is available.',
         row:'T1: 13-Oct | 10:15 | 9A | on 14 | charging 6 | idle 3 | T1-B ·· T2: S-07 | tablet | weekly avg 4 h 12 min = 252 min ·· T3: Cart 2 | 07:30 reading 120.4 kWh | 15:30 reading 123.1 kWh | used 2.7 kWh ·· T4: Maths | 11:05 | 9B | 7 AI prompts in 40 min (translate 2, explain 3, check homework 2) ·· T5: Store A | laptop | 2018 | broken | qty 5'},
       view:[
         '5 min · HOOK. The two-ruler demo and the sticky-note bet (“How many devices charging at 10:15?”). Collect the guesses on the board; keep them until Thursday.',
         '8 min · The teacher explains sample, unit and anonymous code with the plan card of Team 1 on screen. Short Q&A: why 12 rooms and not 1? why two times a day? why a code and not a name?',
         '15 min · TEAM WORK. The class splits into five teams (T1–T5). Each team fills in its OWN plan card with the six questions (what, where, when, how, unit, who) using the plan on the handout as a base. Roles inside the team: measurer, recorder, checker (swap on Thursday).',
         '10 min · PLAN GALLERY WALK. Teams rotate, read the other plans and stick one green note (“clear”) and one red note (“a team that was absent could not follow this”) on each. Then the class agrees the common rules: same clock (the classroom clock), one decimal for kWh, codes only, “write it at the moment, never from memory”.',
         '7 min · Rehearse: each team does a mock reading in the classroom with the record sheet (e.g. T1 counts the devices in this room right now). Exit ticket: I know my place, my time and my unit.'],
       dua:{
         represent:'The plan card is shown as a table AND as a map of the building; the protocol is demonstrated live with the rulers and the mock count; key words (sample, unit, anonymous) in a bilingual English–Spanish glossary on the wall.',
         express:'Fill in the plan card, draw the route of your team on the school map, or record a 30-second audio explaining the protocol to an absent classmate.',
         engage:'The bet on the devices gives the numbers a stake; each student holds a role; the teams review each other’s plans in the gallery walk; real audience: the leadership team will read the final method.'},
       levels:{
         'A2':{task:'Complete your team’s plan card (what, where, when, how, unit) from the options given, and write your role and your anonymous code.',
               help:'Plan card half-filled with word bank: count, write, check, minutes, devices, every, at 10:15. Sentence frame: “We will count … in … at …”.',
               model:'We will count the devices in every classroom at 10:15. My role is the recorder.'},
         'B1':{task:'Write the agreed protocol in your own words, in the order it will be done, and explain why you need a sample and not the whole school.',
               help:'Sequencers: first, then, after that, finally. Because / so that.',
               model:'First, we go to each classroom at 10:15. Then one of us counts the devices that are on, charging or idle. After that, ...'},
         'B2':{task:'Write the protocol so that a team that was absent could follow it, and justify your sample size (how many rooms, people or days, and why that many).',
               help:'The passive is useful: “readings are taken every…”, “the cart is weighed/measured at…”. Justify with: so that, in order to, since.',
               model:'Device counts are taken in every secondary classroom at 10:15 and 12:30 so that the break and the lesson can be compared...'},
         'C1':{task:'Write the protocol and the sampling plan, and identify the one point where you expect it to break (bias, a missing room, a volunteer who forgets) and what you would do when it does.',
               help:'Think of bias: who is NOT in your sample? A volunteer sample is not a random sample — say so.',
               model:'The plan assumes that the volunteers’ week was typical; if it was not, our average screen time would overestimate...'}}},
      {s:2,title:'Out into the school: field day',from:'3.2',
       objective:'Take the real data of the building, at the planned time and place, and write each reading down at the moment it is taken.',
       hook:'The teacher reads out the guesses from Tuesday and shows the first real number on the screen from the morning count: “At 10:15 today there were 61 devices charging in the secondary building.” Who was closest? Stand up. Nobody smooths, nobody rounds: today the school tells us the truth and we write it down exactly as it is.',
       explain:'Field day rules: (1) write it at the moment, with a pen, never from memory; (2) record the conditions — time, place, who was there; (3) if something looks odd, note it and keep going — it will be investigated tomorrow, never deleted; (4) only anonymous codes, never a name; (5) if the plan cannot be followed (a locked room, a missing cart), write what you did instead. A reading with its conditions is worth ten without.',
       example:'Record sheet row: Date 14-Oct | Time 10:15 | Place Cart 2, room 11 | Item: charging cart | Value 123.1 kWh (meter) | Unit: kWh | Taken by T3-A | Checked by T3-C | Note: meter display flickered at 10:20, re-read: 123.1 again.',
       sample:{
         what:'The five measurements of Session 1, taken for real: T1 devices on/charging/idle; T2 screenshots of Screen Time with codes; T3 meter readings of the carts; T4 AI tallies and the anonymous form; T5 the storage count.',
         where:'As in the plan: T1 the 12 secondary classrooms (plus library and ICT lab); T2 a quiet table in the library; T3 beside the charging carts; T4 inside six lessons (teachers warned in advance) and the form shared in class; T5 ICT storeroom.',
         when:'Tue 13 – Thu 15 Oct. Today’s session (Wed 14 or Thu 15, depending on the timetable) is the field window of 45 minutes; any time left over is used before the bell by prior agreement with the subject teachers. Counts at 10:15 and 12:30 are made by the teams during break and lunch.',
         how:'Pairs go out with a clipboard, the record sheet and a watch; the checker re-counts or re-reads 1 in 5 readings. At the end of the day all sheets go onto the shared spreadsheet before the bell, one row per reading, the original paper kept.',
         unit:'Same units as the plan: devices per room · minutes per day · kWh · AI uses per lesson (and % of students) · items in storage.',
         row:'Record sheet columns: Date | Time | Place | Item | Value | Unit | Taken by (code) | Checked by (code) | Conditions / note ·· e.g. 15-Oct | 12:30 | Room 8B | devices on 9, charging 4, idle 7 | 20 devices | T1-A | T1-C | substitute teacher, class out for PE at 12:20.'},
       view:[
         '5 min · HOOK. Reveal the winner of the bet. Review the five field rules on the board; check that every team has a clipboard, a pen, a watch and the record sheet.',
         '5 min · Quick briefing by team: where you go, who goes with you, who you ask for permission, the exact time of your first reading. Each team says its anonymous-code rule aloud.',
         '25 min · FIELD WORK in pairs, with a teacher or the ICT teacher on call. T1 counts rooms, T2 collects Screen Time screenshots, T3 reads the cart meters, T4 tallies and hands out the form, T5 counts in storage. Each reading is written at the moment on the sheet, with conditions. Mark any value you would not defend.',
         '5 min · Back in the classroom: enter your rows onto the shared spreadsheet, one row per reading, before the bell. The checker initials each row.',
         '5 min · Debrief circle: one surprise, one problem, one thing to change before Friday. The highest figure of each team goes on the board, uncorrected.'],
       dua:{
         represent:'The record sheet has icons for each item; the route of each team is marked on the school map; the teacher models one reading live; key phrases are printed on the clipboard (“Time?”, “Place?”, “Who?”).',
         express:'Write the rows on paper, photograph the sheet, dictate a note into a voice recorder, or draw a quick sketch of the room.',
         engage:'Real work outside the classroom; each pair has a role and a mini-challenge (find the most unexpected number); the headline figure goes straight on the board; the leadership team will see these numbers.'},
       levels:{
         'A2':{task:'Complete your measurement table with the readings you took, writing the time, place and unit in every row.',
               help:'Table with the columns and units ready; key words: place, time, device, minutes, kWh.',
               model:'14 October, 10:15, Room 11, 6 devices charging.'},
         'B1':{task:'Complete your table and note anything unusual you saw, with the time it happened.',
               help:'A note is worth more than a memory. Frame: “At …, I noticed that…”.',
               model:'At 12:30, I noticed that three tablets were charging in an empty room.'},
         'B2':{task:'Complete your table and record the conditions of each reading — time, place, who was there, what might have changed the number.',
               help:'Use past tenses: “was/were + -ing” for what was going on, “had” for what happened before you arrived.',
               model:'When we arrived, the class had already left, so the 14 devices we counted were all idle.'},
         'C1':{task:'Complete your table, mark any reading you would not defend and say why, and decide whether it should be repeated.',
               help:'Honesty here is worth more than a clean table. “This value may be inflated because…”.',
               model:'The 09:50 reading may be inflated because the cart was still plugged in from the night before; I would repeat it at 07:30.'}}},
      {s:3,title:'Is this number trustworthy? Cleaning, averages and the chart',from:'3.3',
       objective:'Clean the data without hiding what it says, calculate totals and averages, and make the headline figure visible in a chart that does not exaggerate.',
       hook:'The pooled data goes on the screen with one row that says “devices in room 9A: 140”. Is that possible? 140 devices in a classroom of 28 students? Vote with your feet: it is real / it is a mistake. Then find out: someone typed the decimal wrong, or someone counted the cables as devices. Investigate it — do not delete it.',
       explain:'An outlier is a value far from the others: it is investigated, never deleted. First we check (typing error? different unit? someone counted wrongly?), then we decide and write down what we decided. Then we summarise: the total (all rooms together), the average (total ÷ number of readings) and the average per student or per room. And finally the chart: the type of chart and the axes decide whether your figure is honest. A chart whose axis starts at 90 instead of 0 makes a small difference look enormous.',
       example:'Cleaned summary for Team 1: “Total devices counted at 10:15 over two days: 510 (24 room-counts). Average per room: 510 ÷ 24 = 21.25 ≈ 21 devices; per student (≈ 25 per room): 0.85 devices. Outlier: 9A, 140, a typing error (14.0), corrected after checking the paper sheet.” Chart caption: “Figure 1. Devices per room at 10:15, 13–15 October, NIS. Source: our data, Team 1.”',
       sample:{
         what:'The cleaned dataset of each team and its headline figure (the one number that would make the leadership team stop reading and look up).',
         where:'The shared spreadsheet of the class: one tab per team, original rows in the first columns, “cleaned” and “reason” columns on the right.',
         when:'Today, 45 minutes, using the rows entered on field day; any missing reading is marked “not taken” and not invented.',
         how:'1) Sort each column from highest to lowest; mark outliers. 2) Check against the paper sheet. 3) Write a decision per outlier: kept / corrected / excluded, with a reason. 4) Calculate total, average and per student/per room. 5) Choose the headline figure. 6) Build the chart with titled axes starting from zero and a caption.',
         unit:'Same units as before; the headline figure always travels with its unit and its n (how many readings it comes from).',
         row:'Cleaned row: Room 9A | 10:15 | devices 140 | OUTLIER | decision: corrected to 14 (typing error, paper sheet says 14) | cleaned value 14.  Summary row: Total 510 | n = 24 | average 21.25 per room | per student 0.85 | headline: “At 10:15, 6 in 10 devices in a classroom are on — and 1 in 4 is charging”.'},
       view:[
         '5 min · HOOK. The “140 devices” row: vote with your feet, then investigate it. The rule of the unit: an outlier is investigated, not deleted.',
         '10 min · CLEANING in teams. Sort, mark, check against the paper sheet, write a decision and a reason for each outlier. The checker signs the cleaned table.',
         '10 min · MATHS. Totals and averages: per reading, per student, per classroom. Which single figure would make the leadership team stop reading and look up? Each team picks its headline figure.',
         '15 min · ICT. Three ways of showing the headline figure (bar, line, pie). Which one is understood in five seconds? Build it with titled axes, a unit and a caption. The trap: a chart that exaggerates is a chart that gets you caught — swap with another team to hunt for tricks.',
         '5 min · Gallery: charts on the wall, a sticky note “I understood it in five seconds / I did not”. Hand in the dataset, the method and the chart.'],
       dua:{
         represent:'Worked cleaning example on the screen step by step; the same number shown as a table, a bar chart and a pie chart; formulas written in words (total ÷ n) and symbols.',
         express:'Present the headline figure as a chart, an infographic, a spoken 30-second explanation or a written caption.',
         engage:'Detective game around the outlier; choice of chart type; peer “exaggeration hunt”; the best chart goes into the proposal.'},
       levels:{
         'A2':{task:'Work out the total and the average of your data, circle the highest figure and build its chart with the model given.',
               help:'The operations set out step by step; chart template with axes ready.',
               model:'The total is 510 devices. The average is 21 devices per room.'},
         'B1':{task:'Work out totals and averages, build your chart and write the sentence that goes under it.',
               help:'On average, in total, per student. The caption says what the chart cannot show.',
               model:'On average, there were 21 devices per room at 10:15, which is about 0.85 devices per student.'},
         'B2':{task:'Present your data and explain how you obtained it so it could be repeated; choose the chart type and justify it.',
               help:'The method in three sentences, in the passive. Why that type and not another.',
               model:'Devices were counted in 12 rooms at 10:15 on two days. A bar chart was chosen because the rooms are separate categories...'},
         'C1':{task:'Present the data, the method and the limitations of your measurement (sample, bias, outliers), and say what your chart makes visible and what it hides.',
               help:'Every representation chooses. Say what yours chose. Hedging: may, might, tends to, suggests.',
               model:'The chart makes the peak at break visible but hides that two rooms were empty; the average may therefore underestimate...'}}},
      {s:4,title:'Narrative tenses: what happened on audit day',from:'3.4',
       objective:'Use the four past tenses to tell, in order, what really happened when you measured.',
       hook:'The teacher tells a two-minute true story of audit day with only one tense — all past simple. Flat, right? Now the same story again with the four tenses: what was going on, what had happened before, how long it had been going on. Which version makes you feel you were there?',
       explain:'Past simple moves the story forward (we counted). Past continuous sets the scene (the cart was charging). Past perfect says what had happened BEFORE (the class had left). Past perfect continuous says how long something had been going on (the tablet had been charging for six hours). Sequence adverbs — eventually, meanwhile, suddenly — move us along the timeline. In your story of the year 802,701 these tenses will do the work that dates cannot.',
       example:'By the time we arrived at Room 11, the cart had been charging for six hours. Meanwhile, a teacher was looking for a missing tablet. Suddenly the meter showed 2.7 kWh. Eventually we understood: nobody had unplugged it since Monday.',
       view:[
         '5 min · HOOK. Listen to the “flat” story with one tense, then the rich one. Which one makes you see the room?',
         '10 min · Timeline on the board with four sentences from field day: what was happening, what happened, what had happened before, what had been going on for how long. Past simple, past continuous, past perfect, past perfect continuous — each has a place on the line. Sequence adverbs to move along it.',
         '10 min · Listen to an extract of chapters 3–4 of The Time Machine: who is telling this, and what does the Time Traveller want when he reaches 802,701? Infer it from what he does, not from what he says.',
         '15 min · Test scene, 60–80 words: audit day, the four tenses, one sequence adverb. Swap with a partner and find the four tenses in theirs.',
         '5 min · Exit ticket: write one sentence for each tense about this morning.'],
       dua:{
         represent:'Timeline with colours for each tense; listening with the transcript and a glossary; teacher mime of the tenses.',
         express:'Write the scene, record it as audio, or draw the timeline and caption it.',
         engage:'True story of our own audit day; swap-and-find game; the scene becomes part of the story of the year 802,701.'},
       levels:{
         'A2':{task:'Complete the audit-day scene choosing the right tense in eight gaps, then write two sentences of your own.',
               help:'The four tenses with one example each and the timeline.',
               model:'When we arrived, the students were working. The teacher had left.'},
         'B1':{task:'Write the test scene in 60–80 words using at least three of the four tenses and one sequence adverb.',
               help:'Start with “By the time we arrived…”.',
               model:'By the time we arrived at the storeroom, the ICT teacher had already opened the door. Meanwhile, we were counting...'},
         'B2':{task:'Write the test scene with the four tenses and two sequence adverbs, and answer the listening: what the Time Traveller wants and how you know.',
               help:'Past perfect continuous for how long something had been going on before you got there.',
               model:'When we reached Cart 2, it had been charging since Monday. Suddenly the meter jumped, and eventually...'},
         'C1':{task:'Write the scene so the reader can rebuild the timeline without a single date, and explain the narrator’s point of view in the extract.',
               help:'If you have to write “at 10:15”, the tenses are not doing their job.',
               model:'The corridor had been silent for an hour when the first tablet began to ring; we were still counting what nobody had unplugged.'}}}
     ]},
    {n:5,title:'From data to a proposal — and to a story',dates:'19–23 October',desc:'Turning numbers into something somebody can decide on: the recommendation, the objection, the proposal drafted by hand and closed against the rubric — Proposal due on Friday. And the same number followed into the year 802,701: the story, drafted.',
     give:'P1 — the Proposal to the leadership team, handed in on Friday 23 October (300–350 words), and the handwritten draft of the story.',
     due:'P1 Proposal to the leadership team · Friday 23 October',
     across:{
       philosophy:'Religion and stoicism: two traditions that answered “what is being well” before anyone counted anything — the objection your proposal has to take seriously. Modern eudaimonia (Seligman) and the neuroscience of happiness: the science that would put your number in context.',
       ict:'Iterative algorithms and recursion: the algorithm that processes your number, step by step. The instrument, running: the form or the sensor collects the same number you counted by hand in week 4. Do the two agree?',
       math:'Absolute value and square root functions; and, for the story, how a quantity compounds when it grows every year. Sequences and geometric progression: the compounding you used for the story, now with its formula.',
       comunicacion:'The two traditions contrasted, in writing.'},
     sessions:[
      {s:1,title:'A number is not a recommendation — and the objection they will raise',from:'4.1+4.2',
       objective:'Turn a finding into three recommendations somebody can decide on, and meet the counterargument before the panel does.',
       hook:'The teacher puts two slides on screen. Slide A: “We counted 1,530 devices.” Slide B: the same number with “I would recommend switching off the charging carts at 15:30, which would save…”. Raise the hand for A or B: which one would a headteacher act on? Then a surprise: the teacher, playing the headteacher, shoots down your idea in one sentence. How do you answer?',
       explain:'A number tells what IS; a recommendation tells what to DO. Proposal register is polite and precise: I would recommend, it is advisable to, a first step would be. Order the recommendations from the cheapest to the most ambitious, and give each one a justification from your data. And every recommendation has an enemy: the objection. Meet it before the panel does, with concession language: although, despite, even though, it could be argued. Conceding the exact point makes the rest stronger.',
       example:'Number: “Charging carts use 2.7 kWh a day.” Recommendation: “It is advisable to switch the carts on a timer, so that they charge only between 15:30 and 18:00.” Objection and answer: “It could be argued that a timer costs money; however, even a basic plug timer costs less than the electricity it saves in a term.”',
       view:[
         '5 min · HOOK. Slide A vs. Slide B: which one would a headteacher act on? What changed between them?',
         '8 min · Proposal register: I would recommend, it is advisable to, a first step would be, in the longer term. Each team writes three recommendations from its own data (one cheap, one medium, one ambitious).',
         '5 min · Order them: the cheap one first, the ambitious one last. Add the cost of each in time, money or effort.',
         '15 min · ROLE-PLAY. The teacher (and a volunteer per team) plays the leadership team and objects to each recommendation. Note the objection you could not answer. That is the important one.',
         '12 min · Concession language: although, despite, even though, it could be argued. Rewrite your weakest recommendation answering that objection. Exit ticket: one sentence with “although”.'],
       dua:{
         represent:'Two slides side by side; a table of proposal phrases with Spanish equivalents; the role-play modelled by the teacher before the students do it.',
         express:'Write the recommendations, record the answer to the objection as audio, or act it out in front of the team.',
         engage:'The headteacher role-play; ordering recommendations like a game (cheap to expensive); the objection nobody can answer becomes the team’s challenge.'},
       levels:{
         'A2':{task:'Complete three recommendations with the frames given, using your figures, and match each objection with an answer.',
               help:'Three frames, a data bank and objections and answers to match up.',
               model:'I would recommend switching off the carts at night because they use 2.7 kWh a day.'},
         'B1':{task:'Write three recommendations of your own, each justified with your data, and write the objection you received and your answer to it.',
               help:'One sentence of recommendation, one of justification. Frame: “It could be argued that… However…”.',
               model:'It is advisable to use a timer because the carts charge all night. It could be argued that it costs money; however...'},
         'B2':{task:'Write your recommendations in proposal register, ordered by cost, and integrate the objection into the recommendation instead of answering it separately.',
               help:'It is advisable to, a first step would be, in the longer term. Although, despite, even though.',
               model:'Although a timer would need an initial investment, a first step would be to apply it to the busiest cart.'},
         'C1':{task:'Write your recommendations with what each one would cost the school, answer the objection and say under what conditions the objection would be right.',
               help:'A recommendation with no cost has not been thought through. Conceding the exact point makes the rest stronger.',
               model:'The objection would be right if the carts were needed overnight; our data suggests they are not, but we did not test it on weekends.'}}},
      {s:2,title:'Drafting the proposal',from:'4.3',
       objective:'Write the whole proposal by hand, in the four-part structure, with your figures and the objection included.',
       hook:'“In 30 seconds, tell your partner what you want the school to do — and why they should believe you.” The partner says “So you want me to… because…” out loud. If they cannot say it back, the idea is not clear enough to write yet.',
       explain:'The structure of the proposal is context (50–70 words), what we found (90–110), what we recommend (100–120) and what it costs and what we cannot prove (40–60). The draft is by hand: crossings-out are welcome, because this is where the thinking shows. Facts belong to your table: every figure you write must match it. Hedging — may, might, tends to, suggests — shows you know what your data cannot prove.',
       example:'Opening of paragraph 2: “We measured the charging carts of the secondary building on Wednesday 14 October with a plug-in meter. The energy used was 2.7 kWh per cart per day, which, according to the school’s tariff, would cost about…”. (Method in the passive, headline figure with unit, one published source.)',
       view:[
         '5 min · HOOK. 30-second pitch: “So you want me to… because…”.',
         '5 min · Structure on the board: context, what we found, what we recommend, what it costs and what we cannot prove. Word counts for each part. Model proposal on another topic.',
         '20 min · DRAFT in the notebook, by hand. Crossings-out included. Check each figure against your table.',
         '8 min · Halfway through: read your first paragraph to a partner. Do they know what you want? Use their question to improve the next paragraph.',
         '7 min · Finish the draft. Nothing is typed up today. Self-check against the checklist: recommendation, our own data, figures, a source, the objection, register.'],
       dua:{
         represent:'The four-part structure as a colour-coded template; a model proposal on a different topic; proposal phrases on the wall.',
         express:'Draft by hand, or dictate first and then write; the pitch can be in Spanish before writing in English.',
         engage:'Real audience (the leadership team); partner test (“say it back”); the best proposal is read aloud (anonymously) on Friday.'},
       levels:{
         'A2':{task:'Write your proposal with the four sections given, using your figures.',
               help:'The four openings printed and a word bank.',
               model:'Context: The leadership team asked us about energy. Our team measured the charging carts.'},
         'B1':{task:'Write your proposal with recommendations and evidence, 300–350 words.',
               help:'Model proposal on another topic.',
               model:'Our team measured the energy used by the charging carts. We found that each cart uses 2.7 kWh a day...'},
         'B2':{task:'Write your proposal in proposal register, with a counterargument included.',
               help:'Nevertheless, moreover, in contrast.',
               model:'Moreover, it is advisable to start with one cart. Nevertheless, this recommendation has a cost...'},
         'C1':{task:'Write the proposal anticipating the objection and hedging what your data does not prove.',
               help:'May, might, tends to, suggests.',
               model:'Our data suggests that the carts charge overnight, although a single day of readings may not represent the whole term.'}}},
      {s:3,title:'Feedback against the rubric — and the final proposal',from:'5.1+5.2',
       objective:'Improve the proposal with the criteria in front of you, check every figure, and close the final version for the panel. P1 is due today.',
       hook:'“Spot the sinking number.” The teacher shows a proposal paragraph with one figure that does not match its table. Find it in 30 seconds. One wrong number sinks the whole thing — so today every number gets checked.',
       explain:'Feedback is not “I liked it”: it says which level the text is at on the rubric and what is missing to move up one. Criterion 1 is the proposal itself (clear recommendations backed by data); criterion 2 is the use of language and register. The final version is not the draft typed up: read it aloud once before touching it, check every figure against your table, and make a last read for register (does it sound like a proposal or like an essay?).',
       example:'Feedback sentence: “Level B on criterion 1: you recommend a timer and you give 2.7 kWh, but the cost is missing. To reach A, add what the timer costs.” Not: “Nice proposal.”',
       view:[
         '5 min · HOOK. Find the sinking number in the model paragraph.',
         '12 min · The rubric on the table. Each pair reads the other’s proposal against criterion 1: which level is it at, and what is missing to move up one? Not “I liked it”.',
         '10 min · Silent rewriting of the weakest paragraph. Check every figure against your table and every claim against your evidence.',
         '13 min · FINAL VERSION: read it aloud once, then type it into the portal (300–350 words) and print it for the panel. Last read for register and for the objection you answered.',
         '5 min · Submit P1 in the portal (the marker checks the checklist). Self-assess with the traffic-light checklist: red / amber / green per criterion.'],
       dua:{
         represent:'The rubric as a full table and as a simplified checklist with icons; a model proposal annotated with levels; the portal checklist shown on screen.',
         express:'Feedback can be written, spoken into a voice note, or colour-coded on the draft; the final version can be dictated first.',
         engage:'Peer reviewers have a real task (to move the text up one level); a visible deadline; the printed proposal goes to a real panel.'},
       levels:{
         'A2':{task:'Mark on the rubric which level your proposal is at, correct one thing, and copy the corrected version neatly, checking your three figures.',
               help:'The rubric simplified into a checklist and your text with corrections marked.',
               model:'My proposal is at level B. I need to add the cost of the timer.'},
         'B1':{task:'Assess your partner’s proposal against two criteria, rewrite your weakest paragraph and produce the final version checking figures, units and sources.',
               help:'Say what level and what is missing. Checklist of four things to verify.',
               model:'Your proposal is at level B because the figures are clear, but you do not say where the number comes from.'},
         'B2':{task:'Assess against both criteria, rewrite justifying each change, and check that every claim in the proposal is supported.',
               help:'A change with no reason is a change at random. Underline each claim and find its evidence.',
               model:'I changed “the carts use a lot” to “the carts use 2.7 kWh a day” because the first sentence had no evidence.'},
         'C1':{task:'Assess, rewrite, check that no claim goes beyond your data, and say which criterion you will not manage to reach and why.',
               help:'Knowing your ceiling is also a result. The most common error at this level is claiming too much.',
               model:'I removed “the school wastes energy” because our single day of readings cannot support it.'}}},
      {s:4,title:'The story, drafted: the year 802,701',from:'4.4',
       objective:'Follow your number into the far future and write what it did to the people who live there.',
       hook:'The teacher puts a number on the board: 2.7. “Every year it grows by 20%. In 802,701 years it will be…” Collective bet before the calculator. Then reveal: it is absurd, and that is exactly what Wells did with the class divide of 1895 — he took a real number and let it run until it turned into a world.',
       explain:'With Maths: if your number grew every year like it grew this year, what is it in 802,701? That figure is the machine of your story. The story has five parts — opening, inciting incident, complication, climax, resolution — and uses your story map from week 2 and your test scene from week 4. Tenses stay consistent; time moves with while, as soon as, by the time, no sooner had… than. The number must be visible in the world, not explained in a sentence.',
       example:'Opening: “By the time the Ministry of Cables was founded, the carts had been charging for three hundred thousand years, and nobody remembered what a plug was for.” (Foreshadowing, past perfect continuous, the number visible in the world.)',
       view:[
         '5 min · HOOK. The bet: what does 2.7 become after 802,701 years at 20% a year? Reveal with the spreadsheet.',
         '8 min · MATHS. Compounding in a spreadsheet: your number × growth, year after year. That figure is the machine of your story.',
         '7 min · Story arc on the board: opening, inciting incident, complication, climax, resolution. Plug in your map from week 2 and your test scene from week 4. Cohesion of time: while, as soon as, by the time, no sooner had… than.',
         '20 min · WRITING WORKSHOP: 320–380 words, by hand. Halfway, read your opening sentence aloud to a partner: would they keep reading?',
         '5 min · Mark with a colour the four tenses in your draft; underline the sentence where the number is visible.'],
       dua:{
         represent:'The arc as a drawn curve; the compounding as a table and a graph; model openings on a different number.',
         express:'Write by hand, storyboard first, or record the plot orally before writing.',
         engage:'Wells’s idea turned into your own world; the shock of the number; a partner who is the first reader.'},
       levels:{
         'A2':{task:'Write your story with the five-part arc given, 320–380 words, using the past simple and at least one past perfect.',
               help:'The five openings printed and a bank of time expressions.',
               model:'In the year 802,701, the machines were still charging. Nobody remembered why.'},
         'B1':{task:'Write your story in 320–380 words using the four tenses and at least three time expressions.',
               help:'Model opening on a different number.',
               model:'By the time the sun rose over the Great Storeroom, the tablets had already been charging for a hundred years.'},
         'B2':{task:'Write your story with the four tenses, the technique you chose in week 2, and the number visible in what has happened to the setting.',
               help:'The reader should meet the consequence before the cause.',
               model:'The corridors were silent, and the dust of a million dead screens covered the floor.'},
         'C1':{task:'Write the story so the number is never named: the reader works it out from the world. Consistent tense control throughout.',
               help:'Foreshadow in the first paragraph what the twist confirms in the last.',
               model:'No one in the valley could say how long the lights had been burning; the oldest woman only said that they had never been switched off.'}}}
     ]},
    {n:6,title:'The year 802,701, and the panel',dates:'26–30 October',desc:'The story closed and told out loud — the first graded evidence of the term — and the defence in front of the people who will write the policy. Then half the machine, what the school did with your work, and the Show.',
     give:'P2 — The year 802,701, handed in on Friday 30 October (320–380 words); the oral narrative; the defence before the panel (P4 part A); and your reflection.',
     due:'P2 The year 802,701 (story) · Friday 30 October — and P4 part A, the panel defence (session 3)',
     across:{
       philosophy:'Closing the first half of the unit: what answer we can already give to the question of happiness — and what any number leaves out.',
       ict:'Presentation of the software project and of the data collected: the instrument on the same table as the proposal.',
       math:'The curve of the number, interpreted and exhibited.',
       comunicacion:'The script for presenting the observatory to the rest of the grade.'},
     sessions:[
      {s:1,title:'The story: feedback and final version',from:'5.1+5.2',
       objective:'Improve the story against criterion 4 and close it, checking tenses, cohesion and the number visible in the world.',
       hook:'Silent “tense hunt”: the teacher projects an anonymous story paragraph; every student highlights each past perfect in one colour, each past continuous in another. How many are there? Which tense is missing? A story with only one tense is a list of events, not a world.',
       explain:'Feedback on a story is not “I liked it”: it names the level on the rubric and what is missing. Criterion 4 asks for voice, the four tenses, cohesion of time and the number visible in the world. The final version is not the draft typed up: read it aloud once, then check tenses and cohesion, and decide on the 2–3 literary choices you made (narrator, structure, twist) and why.',
       example:'Feedback sentence: “Level B: tenses are correct but the number only appears in the last line. To reach A, show it earlier in what happened to the setting.” Literary choice: “I used a first-person witness, like Wells, so that the reader discovers the year 802,701 with the narrator.”',
       view:[
         '5 min · HOOK. Tense hunt on an anonymous paragraph: highlight and count.',
         '10 min · The rubric on the table. Each pair reads the other’s story against criterion 4: which level is it at, and what is missing to move up one?',
         '12 min · Silent rewriting: you choose which paragraph needs it more. Tenses, cohesion, the number visible in the world.',
         '13 min · FINAL VERSION: read aloud once, type into the portal (320–380 words), self-assessment checklist: voice, the four tenses, cohesion, the number visible. What literary choices did I make, and why?',
         '5 min · Upload in the portal. Tomorrow you will tell it out loud: choose the sentence you will never read — you will say it.'],
       dua:{
         represent:'The rubric as a table and as a checklist; coloured tenses on a model story; literary choices listed on cards.',
         express:'Rewrite, annotate with colours, or explain the changes in a voice note.',
         engage:'Choice of which paragraph to improve; readers with a real task; the story will be told out loud.'},
       levels:{
         'A2':{task:'Mark on the rubric which level your story is at, correct one thing, and copy the final version checking your three figures and tenses.',
               help:'The rubric simplified into a checklist and your story with corrections marked.',
               model:'My story is at level B. I need a past perfect in paragraph 2.'},
         'B1':{task:'Assess your partner’s story against two criteria, rewrite your weakest paragraph and check tenses in the final version.',
               help:'Say what level and what is missing. Checklist of four things to verify.',
               model:'Your story is at level B because the tenses are correct, but the number is not visible until the end.'},
         'B2':{task:'Assess against the four criteria, rewrite justifying each change, and write the 2–3 literary choices you made in the story.',
               help:'A change with no reason is a change at random.',
               model:'I chose a first-person narrator so that the reader discovers the year 802,701 with me.'},
         'C1':{task:'Assess, rewrite, and write what you would change in the story if you had one more week and which criterion you will not reach.',
               help:'Knowing your ceiling is also a result.',
               model:'With one more week I would foreshadow the twist in the first paragraph rather than in the last.'}}},
      {s:2,title:'The story, out loud',from:'5.4',
       objective:'Tell your story to the group so that they hear the year 802,701 — not read it to them. P2 is due today.',
       hook:'The teacher tells a fragment of a story twice: first reading it flat, then telling it with pauses before the twist, emphasis on the number and eyes on the room. What changed from the written version? Which one did you remember tomorrow?',
       explain:'A story told out loud is a different text: you control the silence. Techniques: the dramatic pause before the twist, the change of pace (slow for tension, fast for panic), the voice of a character, the eyes on the room. Choose ONE technique and use it on purpose. This is the first graded evidence of the term: story plus oral narrative.',
       example:'Oral technique: “And then … (pause, three seconds) … the lights went out. All of them. Forever.” The pause carries the weight, not the words.',
       view:[
         '7 min · HOOK. Flat reading vs. told story. Name the techniques the teacher used.',
         '10 min · Rehearse in pairs: two minutes each, one technique chosen — the dramatic pause, the change of pace, the voice of a character.',
         '15 min · In groups of four: each tells the story of their number. Then the collaborative one: four numbers, one future, told in turns. The group listens and writes one thing they remembered.',
         '8 min · Written reflection to close: what did I learn about myself as a writer this term?',
         '5 min · Submit P2 in the portal. Teacher feedback on one technique per group.'],
       dua:{
         represent:'Teacher models the technique; recorded examples; cue cards with the four moments of the story.',
         express:'Tell it from cards, from notes or without notes; the collaborative story can be drawn as a timeline.',
         engage:'A real audience of peers; the shared future of four numbers; one technique chosen by the student.'},
       levels:{
         'A2':{task:'Tell your story from four cue cards, using one storytelling technique, and complete the reflection with the three openings given.',
               help:'Cue cards and the openings printed.',
               model:'I used a pause before the twist. It worked because the group was silent.'},
         'B1':{task:'Tell your story from notes with two techniques, and write your reflection: which choice worked and which did not.',
               help:'Be specific: which sentence, and why.',
               model:'The pause before “the lights went out” worked because everyone looked up. The fast part was too fast.'},
         'B2':{task:'Tell your story without notes, take your turn in the collaborative story keeping the tenses consistent, and write the reflection.',
               help:'Where did the group’s future stop making sense, and who fixed it?',
               model:'In the collaborative story, we lost the timeline when someone switched to the present; I fixed it by...'},
         'C1':{task:'Tell it, hold the room through the twist, steer the collaborative story when it drifts, and write what you would do differently as a writer next time.',
               help:'The next story is always better than the first.',
               model:'I held the pause for four seconds; next time I would plant the clue earlier so that the silence means more.'}}},
      {s:3,title:'Rehearse, and face the leadership team',from:'5.3+6.2',
       objective:'Prepare to speak from notes, not from a script, and defend the proposal in front of the people who will write the policy. (P4 part A.)',
       hook:'Ten-second challenge: “Your headline figure and what you want, in one sentence, without notes.” Then the lights go on in the corridor: the leadership team enters. Today the panel is real, and the ICT instrument is on the table, running: the number it collects is the one you are talking about.',
       explain:'Rehearse first (first part of the lesson, then the panel). Six minutes, timed; whoever reads it out gets stopped. Prepare the three questions they will certainly ask and the one you would rather they did not. Answer or say honestly that you do not know and how you would find out — “I do not know, but I would find out like this” is a good answer. If the objection is good, concede it out loud and say what you would change. This is criterion 3, part A.',
       example:'Defence opening: “We are Team 3. We measured how many devices were charging at 10:15, and we found 0.85 devices per student. We recommend a timer on the carts. The objection we expect is the cost, and this is our answer.”',
       view:[
         '5 min · HOOK. One-sentence challenge, no notes.',
         '12 min · REHEARSAL in pairs: six minutes timed, swapping roles — one presents, the other objects. Prepare the three questions and the one you would rather avoid.',
         '5 min · Set up the room: chart on screen, the ICT instrument running on the table, cards in hand.',
         '20 min · THE PANEL. Teams present in turn (about 5 min each, up to 4 teams today; the rest on the next slot of the timetable). Questions from the leadership team. Everyone speaks; they will interrupt. They ask something you did not prepare.',
         '3 min · While others present, each student notes the best question of the session. Teacher closes: P4 part A is graded today.'],
       dua:{
         represent:'The six-card structure shown; example defence played from a recording; a printed list of useful phrases for conceding and not knowing.',
         express:'Present with cards, slides or the chart; answer questions orally; a written back-up for A2.',
         engage:'A real panel; the instrument running on the table; the best question of the session; each member of the team speaks.'},
       levels:{
         'A2':{task:'Prepare six cards with the key sentences of your defence, present with them and answer one question.',
               help:'Structure of the six cards given and the question bank.',
               model:'We measured the devices. The answer was 21 per room. We recommend a timer.'},
         'B1':{task:'Prepare your notes, present your defence and answer the questions from the panel.',
               help:'The three likely questions, listed.',
               model:'Our recommendation is to use a timer. This would reduce the energy used at night...'},
         'B2':{task:'Present, defend, and take a question you had not prepared, starting with the question you would rather avoid.',
               help:'Saying “I do not know, but I would find out like this” is a good answer.',
               model:'That is a fair question. We did not measure weekends, but we would repeat the count on a Saturday...'},
         'C1':{task:'Present, defend, hold the position under pressure and concede well if the objection deserves it, saying what you would change and why.',
               help:'Say why you concede — that is what makes it strength and not surrender.',
               model:'The panel is right that one day of data is thin; I would concede that point and extend the sample to a full week.'}}},
      {s:4,title:'Half the machine, what happened with it, and the Show',from:'6.1+6.3+6.4',
       objective:'Close the first half of The Time Machine, learn what the school decided to do with your work, and put the grade’s piece on stage.',
       hook:'Mystery envelope: the teacher opens the leadership team’s answer on screen — which recommendations they are taking forward and which not. Raise your hand if YOUR recommendation was chosen. Then: why were the others not? That is the real result of the unit.',
       explain:'Chapters 5–6 of The Time Machine: the Eloi above ground, the Morlocks below. Wells took one fact of 1895 — who works and who does not — and this is where it went. The leadership team’s answer is not a mark: it is the real result. The Show is the grade’s dramatised reading — one story from the class or the collaborative future told in turns. The second half of the unit begins here: you built the instrument; now argue, seriously, that it should not exist. Who is this future fair to?',
       example:'Reading-diary prediction: “I think the Morlocks will be stronger than the Eloi because Wells says they work underground, and the Time Traveller is afraid of the dark.” Reflection opening: “The panel took forward my recommendation about the timers because…”.',
       view:[
         '5 min · HOOK. The leadership team’s answer: which recommendations go forward, and why not the others?',
         '12 min · Chapters 5–6: predict before reading what the Time Traveller expects beyond the Eloi; read and check. Discussion: which of our numbers, followed far enough, splits people in two?',
         '8 min · Individual reflection: what would you do differently in the next audit? And the unit question, one last time: what does AI really cost this school?',
         '15 min · THE SHOW. Run-through of the grade’s piece, feedback on form only (timing, volume, transitions), then the real thing.',
         '5 min · The bridge: the proposal is with the leadership team, the story is graded, the instrument is collecting. What is still open? Reading diary: one prediction for the rest of the novel.'],
       dua:{
         represent:'Chapter audio with transcript; an illustration of the two-class world; the leadership team’s answer in a table.',
         express:'Reflection written, recorded, or drawn; the Show offers speaking, narrating, reading or backstage roles.',
         engage:'A real decision by the school; prediction game before reading; a performance for a real audience; the question for Unit 6.'},
       levels:{
         'A2':{task:'Answer five questions on chapters 5–6, write one prediction with the sentence frame, and complete the reflection with the three openings given. Perform your part in the Show.',
               help:'Questions with two options; frame: “I think that… because…”; three openings printed; cue cards.',
               model:'I think the Morlocks will attack because they live in the dark.'},
         'B1':{task:'Summarise what the Time Traveller learns in chapters 5–6, write your prediction with one piece of evidence, and write your reflection on the audit and on your defence.',
               help:'Quote the line that made you think it. Be specific: which moment, and why.',
               model:'The Time Traveller learns that the Eloi are not as happy as they look. My prediction is...'},
         'B2':{task:'Explain what fact of 1895 the Eloi and the Morlocks come from and which of the class’s numbers could do the same; write your reflection, including what you learned from an objection you received. Perform.',
               help:'Connect Wells’s method to your own story. What did you think before, and what do you think now?',
               model:'Wells took the class divide of his time; our number about screen time could split students into those who ...'},
         'C1':{task:'Explain the two-class future as a narrative technique AND as a problem of justice, say which of the two the second half of the unit should take up, and write the question your number leaves open — the one the leadership team did not ask. Perform.',
               help:'One answer is about craft; the other is about who it is fair to. If they did not ask it, it is because it is uncomfortable.',
               model:'As technique, the split makes the future visible; as a problem of justice, it asks who pays for the machine.'}}}
     ]},
    {n:7,title:'Should we be measuring this? If we had known…',dates:'2–6 November',
 desc:'The instrument has been running for three weeks, so we measure again: has the number moved? Then the other half of the project begins: argue against what you built, seriously. The vocabulary of a global problem and of formal debate, where the data lives, the issue framed, the grammar of regret (third conditional), contrast and concession, listening to a real formal debate, and the capabilities objection.',
 give:'Sample 2 on the shared sheet; your team’s issue framed as one question; your first objection to your own instrument; ten conditional and concessive sentences (five for, five against); your listening notes.',
 across:{
  philosophy:'What any measure leaves out: the first objection to the criterion you chose in week 2, and the capabilities objection (Sen and Nussbaum): being well is what you can do and be, and no number captures all of that.',
  ict:'Sample 2 with the same instrument; what happens to the data once it is collected: where it lives, who has the password, who can see it, when it is deleted. The instrument keeps running: the log of who has accessed the data since week 6.',
  math:'Comparing sample 1 and sample 2: difference, percentage change, and whether a small change is bigger than the error of the measurement.',
  comunicacion:'The objection to your own instrument, written in Spanish for the school.'},
 sessions:[
  {s:1,title:'Has the number moved? Sample 2',from:'7.1+7.2',
   objective:'Repeat the week 4 measurement with exactly the same protocol, compare it with sample 1, and use the vocabulary of global problems to say what the number means beyond NIS.',
   hook:'Bet before you measure. Every team writes on a sticky note: HIGHER, LOWER or THE SAME than three weeks ago, plus a guess in numbers. Notes face down on the board. After the measuring we turn them over and the team with the closest guess wins the right to choose the first speaker of the next debate.',
   explain:'A single measurement is a photograph; two measurements with the same method are a film. If the protocol changes between sample 1 and sample 2, we cannot tell whether the number moved or the method moved, so today every detail is copied from week 4: same place, same time of day, same unit, same instrument. Then the global question: NIS is one school, but data centres, energy, water and e-waste are worldwide problems, and NGOs, international organisations and governments are asking about them. New vocabulary: emissions, regulation, consumption, sustainability, to phase out, to offset, to enforce.',
   example:'Model sentence: "Between sample 1 (13 October) and sample 2 (3 November) the average screen time in room 204 rose from 41 to 47 minutes per lesson, an increase of about 15%." Global version: "In the world, data centres already use around 1–2% of electricity, whereas at NIS the same trend is measured in minutes per lesson."',
   sample:{what:'Sample 2: the same five measurements as week 4, repeated without changing anything. T1 devices on / charging / idle · T2 screen minutes per day (Screen Time, last 7 days) · T3 kWh used by a charging cart in one school day · T4 AI uses per lesson + the same anonymous form · T5 items in the ICT storeroom.',
           where:'Exactly the same places as sample 1: T1 the 12 secondary classrooms plus library and ICT lab; T2 the same ~20 volunteers (same codes S-01 to S-20); T3 the same carts; T4 one lesson per subject, the same subjects; T5 the ICT storeroom.',
           when:'Three weeks after sample 1, week of 2 November, the same weekdays and the same times (T1 at 10:15 and 12:30, Tuesday and Thursday; T3 one full day, Wednesday).',
           how:'Follow the week 4 protocol card step by step; same instrument, same unit, same roles (measurer, recorder, checker). Write at the moment, not from memory, and add a column “Sample 1” next to each new reading.',
           unit:'The same units as sample 1: devices per room · minutes per day · kWh per day · AI uses per lesson and % of students · number of items. Anonymous codes only, never a name.',
           row:'T1: 03-Nov | 10:15 | 9A | on 15 | charging 5 | idle 4 || sample 1 (13-Oct): on 14 | charging 6 | idle 3 ·· T3: Cart 2 | 04-Nov | used 2.9 kWh || sample 1: 2.7 kWh → +7% ·· T2: S-07 | weekly avg 268 min || sample 1: 252 min.'},
   view:[
    '5 min · The bet: sticky notes HIGHER / LOWER / SAME with a number guess, face down on the board. Nobody changes a note after the bell.',
    '5 min · Protocol check-up: read aloud the week 4 sheet. Each team finds the one detail most likely to be forgotten (time of day, unit, room) and shows it to the team on the right.',
    '15 min · SAMPLE 2: teams go out and take exactly the same readings, in the same places and at the same times, with the same roles. Codes only, no names. Write at the moment.',
    '8 min · Back in class: both columns on the shared sheet, sample 1 and sample 2. Calculate the difference and the percentage change. Turn the sticky notes: who won the bet?',
    '8 min · From NIS to the world: data centres, energy, water, e-waste. Three names on the board (an NGO, an international organisation, a government). New words in a quick relay: each pupil adds one sentence with one word.',
    '4 min · One sentence per team: the global version of your local number, with a word from the list.'],
   dua:{represent:'The week 4 protocol on paper and also read aloud and shown as a photo of the real sheet; the sample 1 and sample 2 columns in a table and in a simple bar chart; the vocabulary with a Spanish gloss and a picture for each word.',
        express:'Show the result as a table, a drawn bar chart or a spoken sentence recorded on a phone; write the global sentence or say it to the team.',
        engage:'A real bet with a small prize, real roles in the team, and a real question: did the number move? There is no right answer in advance, so the result is genuinely interesting.'},
   levels:{
    'A2':{task:'Complete the sample 2 table in the same columns as sample 1, write the difference for each row, and complete: "At NIS the number went up / down / stayed the same. In the world, ___ is a problem."',
          help:'Table with the columns, units and the first row of sample 1 already filled in; word bank with Spanish glosses; sentence frame.',
          model:'Sample 1 was 41 minutes. Sample 2 is 47 minutes. The number went up by 6 minutes.'},
    'B1':{task:'Record sample 2, calculate the percentage change for two rows, and write five sentences connecting your NIS number to the global problem, using five words of the week.',
          help:'Frame: "At NIS we measured… In the world, …" and the formula for percentage change written out.',
          model:'At NIS we measured 47 screen minutes per lesson, 15% more than three weeks ago. In the world, consumption of energy by data centres is also growing.'},
    'B2':{task:'Record sample 2 and write a paragraph that compares the two samples, says whether the change is large enough to matter, and places the number in the global problem with one organisation named and what it proposes.',
          help:'Say what scale changes between the school and the world, and what does not. Remember that only the protocol was held constant, not the weather, the timetable or the mood of the class.',
          model:'Although the average rose from 41 to 47 minutes, three weeks is a short time, and one lesson that overran could explain the difference. Nevertheless, the direction matches what the International Energy Agency reports at global scale.'},
    'C1':{task:'Record sample 2 and write the comparison, then explain why the global solution may not transfer to a school this size, and what in your own protocol could produce a false movement.',
          help:'Scale is an argument, not an excuse. A change in the number is a result only if the method did not change.',
          model:'A rise of six minutes would be a trend only if the two samples were comparable, and ours were not entirely: the second was taken in the week before a test, when teachers plan fewer screen tasks.'}}},

  {s:2,title:'Where does the data live? The issue, framed',from:'7.3+7.4',
   objective:'Find out what happens to the number after it is collected, read how others argue about that, and put in writing the question your team will argue and your first objection to your own instrument.',
   hook:'Mystery folder: the teacher shows a closed file on the projector called "NIS_all_data_FINAL_v7". Three questions on the board: where is it? who can open it? when will it disappear? The class votes with fingers (1 to 4) on who decided the answers. Then we find out. Nobody knows, which is the point.',
   explain:'Collecting a number is only half of the story: the other half is what happens to it afterwards. With ICT we trace where the instrument stores its data, who has the password, whether it can be deleted and who decided all that. Two formal articles disagree about collecting data on people; each frames the issue in its first paragraph before it argues. Argumentative structure: claim, reason, evidence, concession. A good issue is a neutral question, and the first objection is the hardest part: not somebody else’s, yours.',
   example:'Neutral issue: "Should NIS be collecting data on how long students use screens during lessons?" (Not neutral: "Should NIS stop spying on students?") First objection: "If this number were read by someone outside the school, it could be used to compare teachers, which was never the purpose."',
   view:[
    '5 min · The mystery folder: three questions on the board (where, who, when), a vote with fingers, then the ICT teacher’s real answers for our instrument.',
    '10 min · Data journey: on a big sheet, draw the path of one anonymous code from the sensor or the sheet to the server and back. Mark with a red pen every place where someone could see it.',
    '10 min · Two formal articles that disagree about collecting data on people. Pairs read one each, then tell their partner the first paragraph without looking. Highlight claim, reason, evidence, concession.',
    '10 min · Write the issue: one question per team in the form "Should NIS be collecting…?". The class checks that it does not give away the answer (a neutral-question detector: thumbs up or down).',
    '8 min · The hard part: the first objection to your own instrument. What could go wrong with this number in the wrong hands? Read both to the team on the right, who say whether it is serious or cosmetic.',
    '2 min · Hand in: the issue and the objection in the notebook and in the portal.'],
   dua:{represent:'The data journey as a drawing, the articles in a shortened version with the claim highlighted, the four questions read aloud; a Spanish glossary for storage, password, delete, consent.',
        express:'Draw the journey, write the issue and objection, or say them to the team in a recording; the objection can be chosen from options at A2.',
        engage:'The mystery makes the question personal (it is OUR data); choice of article; real audience for the objection, the team on the right who judge whether it is serious.'},
   levels:{
    'A2':{task:'Answer the four questions about your instrument’s data and copy the claim of each article. Complete the issue with the frame and choose your objection from three options, saying why.',
          help:'The four questions; the articles shortened with the claims highlighted. Frame: "Should NIS be collecting ___?" and three objections written out.',
          model:'The data is on the school server. Only the ICT teacher has the password. Should NIS be collecting screen minutes?'},
    'B1':{task:'Write where your data lives and who sees it, summarise the claim and one reason of each article, and write your team’s issue and one objection of your own with a reason.',
          help:'Frame: "The data is stored… Only… can see it." / "The problem is that… because…"',
          model:'The data is stored on a school computer and only two teachers can see it. The problem is that the numbers could be used to judge teachers, because they show who uses the screen the most.'},
    'B2':{task:'Write it, explain how each article frames the issue in its opening, and write an objection the leadership team did not raise, with a reason why they missed it.',
          help:'Framing happens before the first argument. If they did not raise the objection, it is probably because it is uncomfortable.',
          model:'The first article opens with a child’s name and a photograph, so we feel protective before it makes a single claim; the second opens with a statistic, so we feel reassured.'},
    'C1':{task:'Write it, rewrite the opening of one article so that it frames the issue the other way, and write the issue, the objection and what you would have to change in the instrument to answer it.',
          help:'Same facts, opposite frame. An objection you can fix is a design change; one you cannot is an argument.',
          model:'Had the opening been about a school that detected a failing heating system thanks to its data, the same facts about storage would read as a benefit rather than a threat.'}}},

  {s:3,title:'The grammar of regret, whereas and nevertheless',from:'8.1+8.2',
   objective:'Use the third conditional about a past that did not happen, and hold two sides in one sentence with contrast and concession.',
   hook:'Time Machine game: the teacher says "It is 13 October again. You may change ONE decision of your audit." Teams have 60 seconds to choose the decision they would change, then say it to the class. The first words everyone uses, "If we had…", are the grammar of the day.',
   explain:'The third conditional is the grammar of regret: if + past perfect, would have + past participle. The mistake everyone makes is "would of": it is would HAVE. Wish and if only express regret in one line: "I wish we had asked for permission earlier." Contrast (whereas, while, on the other hand) and concession (nevertheless, even so, admittedly) let a sentence hold both sides, and that is stronger than two sentences that take one each. A good sentence favours neither side.',
   example:'"If we had measured the whole school, we would have found the library uses more energy than the gym." / "Admittedly, the number is small; nevertheless, it grew faster than any other in the school." / "Whereas the proposition says the data protects students, the opposition says it exposes them."',
   view:[
    '5 min · The Time Machine game: one decision each team would change, 60 seconds, said aloud with "If we had… we would have…". Which sentences are true?',
    '8 min · Form on the board: if + past perfect, would have + past participle. The mistake "would of" is hunted on a sticky-note wall: pupils write the wrong and the right version. Wish and if only: three examples about the project.',
    '8 min · Each team: three things it would have done differently in the audit, in the third conditional, and one regret with wish / if only.',
    '6 min · Contrast and concession: whereas, while, on the other hand; nevertheless, even so, admittedly. Sorting game with cards: which is contrast and which is concession?',
    '13 min · Ten sentences per team about your issue: five for, five against, each with a contrast or concession word. Read the best one aloud: the class says which side it favours, and a good one favours neither.',
    '5 min · Exit ticket: write one sentence that holds both sides and one regret in the third conditional.'],
   dua:{represent:'The form drawn on a timeline (past, before the past, what did not happen); example sentences coloured by part; concession and contrast words in a two-column poster with Spanish equivalents.',
        express:'Write the sentences, say them in pairs or record them; sort cards or write; choose sentences about the audit or about the issue.',
        engage:'Everyone has something real to regret in the project; the "would of" hunt is a competition; the best sentence is chosen by the class.'},
   levels:{
    'A2':{task:'Complete eight third-conditional sentences about the project with the verbs given, then join ten pairs of sentences about your issue with whereas or nevertheless, choosing the right one.',
          help:'The verbs in brackets and the form on the board; the pairs written out; the two words explained with an example each.',
          model:'If we (measure) the whole school, we would have found more data. -> If we had measured the whole school, we would have found more data.'},
    'B1':{task:'Write five third-conditional sentences and two with wish / if only about your own audit, and ten sentences, five for and five against, using at least three different contrast or concession words.',
          help:'Frame: "If we had…, we would have…" Word bank: whereas, while, nevertheless, even so, admittedly, on the other hand.',
          model:'If we had asked the teachers for permission earlier, we would have collected more data. I wish we had measured on a Friday too.'},
    'B2':{task:'Write the sentences so that each third conditional names a real decision your team took and its real alternative, and each of the ten for-and-against sentences carries evidence and does not reveal your side.',
          help:'No imaginary regrets: what did you actually decide? Evidence can be your data, the leadership team’s answer or a source.',
          model:'Whereas our data show that screen time rose by 15%, the leadership team’s answer suggests that the rise was mostly in project lessons, where screens are the point.'},
    'C1':{task:'Write them, add one third conditional in the other side’s mouth (what the leadership team would have done if they had had your data earlier), and mark the two for-and-against sentences that would survive a rebuttal and say why the others would not.',
          help:'Put the conditional in somebody else’s mouth. A sentence that survives a rebuttal has evidence AND concedes something.',
          model:'Had they had the data in September, the leadership team would have scheduled the energy audit before the budget meeting, not after it. Admittedly, the data were incomplete, but they would still have changed the order of events.'}}},

  {s:4,title:'Listening to a formal debate, and the capabilities objection',from:'8.3+8.4',
   objective:'Hear how a position is held in a formal debate, tell fact from speculation, and write the strongest case against your own number using this week’s grammar.',
   hook:'Silent clip: the teacher plays thirty seconds of a formal debate with the sound off. Pupils guess from the faces and the hands who is for, who is against, who is conceding. Then the sound goes on and we check who was right.',
   explain:'In a formal debate a speaker holds a position by stating facts, speculating carefully and conceding some points without giving up the whole. Modals of speculation (might, may, could, is likely to) tell you what the speaker does NOT know. Conceding is not losing: it often makes the speaker stronger. With Philosophy: Sen and Nussbaum say being well is what you can do and be. A number leaves out much of that. That list of what it leaves out is the capabilities objection to your own measure.',
   example:'Fact: "The school used 2,400 kWh last month." Speculation: "This could be caused by the new projectors." Concession: "I accept that the data is anonymous; however, anonymity is not the same as safety." Objection: "If we had asked how students felt, we would have found something the number does not show. Although the number shows minutes, it does not tell us what the minutes were for. It does not measure what a student can do with the time."',
   view:[
    '5 min · Silent clip with the sound off: who is for, who is against, who concedes? Predictions on a mini-whiteboard.',
    '10 min · First listening of a formal debate on data or technology: what is the motion, who is for, who is against? Second listening: for each speaker, one fact and one speculation. Notes in two columns.',
    '5 min · The move to notice: a speaker concedes a point and still holds the position. Replay that moment twice and write what they gave and what they kept.',
    '10 min · With Philosophy: Sen and Nussbaum say being well is what you can do and be. What does your number NOT capture about that? List it as a team.',
    '10 min · The list is the objection. Write it in three sentences: one third conditional, one concession, one plain statement. Swap with the team on the left, who find the weakest sentence.',
    '5 min · Hand in: the ten sentences from yesterday, revised, plus the objection.'],
   dua:{represent:'The debate in audio with the transcript of the two key minutes, and the clip with the sound off first; the two columns (fact, speculation) printed; Sen and Nussbaum summarised in one picture with a Spanish gloss.',
        express:'Notes in a table, a recording of the rebuttal, or a written objection; pupils choose which of three formats to use for the fact / speculation notes.',
        engage:'The silent clip is a game; swapping with the team on the left makes the audience real; the objection is to their own work, so it matters.'},
   levels:{
    'A2':{task:'Answer eight true / false questions on the debate and copy two modals of speculation you heard. Complete the objection with the three frames given and hand in your ten sentences.',
          help:'The questions; the transcript of the two key minutes. Frames: "If we had…", "Although the number shows…", "It does not tell us…"',
          model:'Although the number shows the minutes, it does not tell us what the students learned.'},
    'B1':{task:'Complete the fact / speculation table for two speakers and say who you found more convincing, with a reason. Write the objection in three sentences using the three structures and hand in the ten revised.',
          help:'Table with the first row done. One conditional, one concession, one statement.',
          model:'I found the first speaker more convincing because she gave two facts. If we had asked the students how they felt, we would have found a different story.'},
    'B2':{task:'Complete the table, identify the moment a speaker concedes a point and write what they conceded and what they kept. Write the objection so that it uses the capabilities idea explicitly: what the number leaves out about what people can do and be.',
          help:'Conceding is not losing. Find where it makes them stronger. Name the theory; do not just say "feelings".',
          model:'She conceded that the data was accurate but kept her main claim: accuracy is not the same as meaning. In capabilities terms, the number captures time, not freedom.'},
    'C1':{task:'Complete the table and write the rebuttal you would have given to the weakest speculation you heard (point, evidence, explanation in three sentences). Then write the objection and the reply to it — why you would still measure — in the same register.',
          help:'The best objection is the one you can answer and still respect.',
          model:'The speaker only speculated that the data might be sold, with no evidence. Nevertheless, the objection stands: even if the data stays inside the school, a number can limit what a student feels free to do. We would still measure, but with an end date.'}}}
 ]},

{n:8,title:'Both sides, and the fallacy',dates:'9–13 November',
 desc:'Find the fallacy in a text you agree with — that is the only version of the exercise that teaches anything. Then the for-and-against essay, planned, drafted and delivered: both positions before your own. The essay is the third graded product of the term.',
 give:'The final essay "Should NIS be collecting this?", typed into the portal, with both sides before your own.',
 due:'P3 Should NIS be collecting this? (essay, 320–380 words, criterion 5): due Friday 13 November',
 across:{
  comunicacion:'The same exercise — bias and fallacy — on a newspaper text in Spanish; the essay corrected, and its Spanish version for the school.',
  ict:'The access log of the instrument, read: who looked at the data, and whether they should have.'},
 sessions:[
  {s:1,title:'Find the fallacy in a text you agree with',from:'9.1',
   objective:'Recognise the five fallacies that appear most in arguments about technology, first in others, then in yourself.',
   hook:'Fallacy bingo: each pupil gets a card with five pictures (a scarecrow, a fork in the road, a scream, a cherry, a slide). The teacher reads six short sentences about AI and data; pupils cover the picture that matches the trick. Whoever has the five sentences covered first shouts "Fallacy!"',
   explain:'A fallacy is an argument that persuades because it feels true, not because it is true. Five appear most in arguments about technology: straw man (attacking a weaker version of the other side), false dilemma (only two options when there are more), appeal to fear (frightening instead of proving), cherry-picking (using only the evidence that suits you) and slippery slope (one step will inevitably lead to a disaster). We practise finding them in a text we agree with, and in our own ten sentences, because fallacies are most invisible when the conclusion is one we like.',
   example:'Cherry-picking: "Our data from Monday shows screen time is falling, so the problem is solved." (Only one day.) Straw man: "The opposition wants to throw away all technology." (They only said: delete the data.) Fair rewrite: "The opposition argues that this particular dataset is not necessary."',
   view:[
    '6 min · Fallacy bingo: six sentences read aloud, five pictures to match. Quick vote on which one fooled the most people.',
    '8 min · The five fallacies with name, picture and one example each, on the board. Pairs make a gesture for each one (a scarecrow pose for straw man, and so on).',
    '12 min · An article on AI or data that most of the class agrees with. Read it looking for the five. There is at least one. Mark the paragraph numbers.',
    '12 min · The uncomfortable part: your own ten sentences from last week. Which one is a fallacy? Rewrite it without the trick and swap with a partner for a second opinion.',
    '7 min · On the board: the fallacy of the week, found by the class in its own words, and the rewrite that fixes it.'],
   dua:{represent:'Each fallacy as a name, a picture, a gesture and an example sentence; the article with the paragraphs numbered and read aloud; Spanish glosses for the five names.',
        express:'Mark the article, rewrite a sentence, or explain the fallacy to a partner out loud; choose gesture, drawing or written explanation to show you understand.',
        engage:'The bingo and the gestures make a dry topic funny; finding a fallacy in a text you agree with is a personal challenge; the class decides the fallacy of the week.'},
   levels:{
    'A2':{task:'Match the five fallacies to five example sentences, and mark one in the article.',
          help:'The fallacies with one example each; the article with the paragraphs numbered.',
          model:'This is cherry-picking because it uses only one day of data.'},
    'B1':{task:'Find two fallacies in the article, name them, and rewrite one of your own sentences without its fallacy.',
          help:'Frame: "This is a ___ because it…"',
          model:'This is a false dilemma because it says we must choose between measuring everything or measuring nothing.'},
    'B2':{task:'Find the fallacies, explain why each one still persuades, and rewrite the article’s weakest paragraph fairly.',
          help:'A fallacy works because it feels true. Say what it appeals to.',
          model:'The appeal to fear works because parents already worry about screens; the article uses that worry instead of evidence.'},
    'C1':{task:'Find them, and write the version of the article’s argument that would hold without any fallacy — if one exists.',
          help:'Sometimes it does not. That is a result too.',
          model:'Once the slippery slope is removed, the claim that data collection will inevitably become surveillance disappears; what remains is the narrower claim that safeguards are needed.'}}},

  {s:2,title:'The shape of a for-and-against essay, and arguing the other side',from:'9.2+9.4',
   objective:'Learn the structure of the B2 First essay, plan your own, then sustain out loud the position opposite to your own and check the plan against the rubric.',
   hook:'The coin of truth: the teacher flips a coin in front of the class for each pair. Heads: you defend FOR collecting data. Tails: AGAINST. The only rule is that you must argue for 30 seconds with the side the coin gave you, even if you disagree.',
   explain:'A for-and-against essay has four paragraphs, each with a job: the introduction says why the question is real; the two middle ones give two reasons each with evidence; the last one chooses. The writer’s opinion first appears in the last paragraph only. The language: whereas, nevertheless, admittedly, on the one hand / on the other, in conclusion, and one third conditional somewhere. Arguing the other side out loud teaches you what the best version of it is, which makes your own essay fairer.',
   example:'Model essay on another topic, "Should schools ban mobile phones?": Introduction: "Phones are in every pocket, so whether schools should allow them is a real question." For: "On the one hand, phones help with learning, as 62% of teachers in the survey reported." Against: "On the other hand, a phone can distract; if students had not had phones, they would have spoken more." Position: "Admittedly, bans are hard to enforce; nevertheless, on balance, I believe lessons should be phone-free."',
   view:[
    '5 min · The coin: pairs toss, argue 30 seconds the side that fell, no matter what they think.',
    '10 min · Model essay on the board: label the four paragraphs with their job. Where does the opinion first appear? Underline the language: whereas, nevertheless, admittedly, on the one hand / on the other, in conclusion.',
    '10 min · Plan grid for your own essay (the issue from last week): two reasons for, two against, one piece of evidence each (your data, the leadership team’s answer, the access log, a source), your position.',
    '10 min · Pairs. Each defends for two minutes the side they did NOT choose. The partner tries to break it. Write the point you had not taken seriously.',
    '10 min · The rubric: swap grids, read for criterion 5. Which level, and what is missing to move up one? Add the missing piece to the grid.'],
   dua:{represent:'The model essay colour-coded by paragraph job; the plan grid with prompts; the rubric as a checklist and also as a picture of the staircase of levels; Spanish glosses for the connectors.',
        express:'Fill the grid with notes, speak the other side to a partner, or record it; write the missing piece or say it.',
        engage:'The coin makes arguing a side playful; a partner who tries to break your argument is a real audience; the rubric turns revising into a game of moving up one level.'},
   levels:{
    'A2':{task:'Label the four paragraphs of the model essay with their job and complete your plan grid with the prompts given. Defend the other side with the three sentences given and mark the rubric level of your partner’s grid.',
          help:'The grid with the prompts; a bank of reasons for and against for your issue; three sentences for each side; the rubric as a checklist.',
          model:'Reason for: the data helps the school save energy. Reason against: the data can be seen by too many people.'},
    'B1':{task:'Complete your plan grid with two reasons for, two against, one piece of evidence for each, and your position. Defend the other side for two minutes from notes and say what level and what is missing in your partner’s plan.',
          help:'Evidence: your data, the leadership team’s answer, the access log, a source.',
          model:'On the one hand, our data show that screen time rose by 15%. On the other hand, the access log shows that five people could see it.'},
    'B2':{task:'Complete the grid so that the strongest reason against is one you actually believe, and note which fallacy you must avoid. Defend the other side and write the point you had not taken seriously, so that you can integrate it into your "against" paragraph.',
          help:'Cherry-picking is the one this essay invites. That is the difference between B and A on criterion 5.',
          model:'The point I had not taken seriously is that students may behave differently when they know they are measured, which would make the data less reliable.'},
    'C1':{task:'Complete the grid, write the one sentence of the essay where you will concede the other side its best point, and rewrite your position so that it answers the best point of the other side explicitly.',
          help:'That sentence decides whether the essay is fair. Name it, concede what is true in it, and say why you still choose.',
          model:'Admittedly, anonymity does not guarantee safety; nevertheless, a dataset with an end date and two keyholders is a risk worth taking.'}}},

  {s:3,title:'Drafting the essay',from:'9.3',
   objective:'Write the whole essay by hand, both sides before your own.',
   hook:'The paragraph clock: the teacher draws four circles on the board, with times in them (10, 20, 20, 15 minutes). A stopwatch starts: you will write the essay as the clock moves. Who finishes the first paragraph before the first bell?',
   explain:'Today you write the draft by hand, one paragraph at a time, to the clock. The title is a question: "Should NIS be collecting <your number>?" Four paragraphs: introduction (50–60 words), for (90–110), against (90–110), position (60–80). Your opinion belongs only in the last paragraph, so halfway through you check whether it has leaked into paragraph two or three, and if it has, you cross it out. Nothing is typed up today.',
   example:'Opening of the introduction: "Every lesson at Nordic International School, a small sensor counts the minutes that students spend on screens. Is that useful information or an invasion of privacy?" Opening of the against paragraph: "On the other hand, opponents point out that a number can be misused, and our own access log shows that more people saw it than we had expected."',
   view:[
    '4 min · The paragraph clock and the title as a question. Read your plan grid once, in silence.',
    '8 min · Paragraph 1 — Introduction (50–60 words): what the instrument collects and why the question is real. No opinion yet.',
    '10 min · Paragraph 2 — Arguments for (90–110 words): two reasons, each with evidence.',
    '10 min · Paragraph 3 — Arguments against (90–110 words): two reasons taken seriously, with at least one third conditional.',
    '3 min · Halfway check: has your opinion leaked into paragraph two or three? Cross it out. Swap pages and underline any sentence that shows a side.',
    '10 min · Paragraph 4 — Your position (60–80 words): concede the best point of the other side, then choose. Finish the draft. Nothing is typed up today.'],
   dua:{represent:'The plan grid and the model essay on the desk; the four paragraph openings printed for A2; word counts shown as lines on the page (how long is 100 words in your handwriting?); connector word bank with Spanish gloss.',
        express:'Write by hand in the notebook; if handwriting is a barrier, dictate to a partner or to a recording that you will transcribe; choose the order of the middle paragraphs.',
        engage:'The clock gives the task a rhythm; the checkpoint at halfway is a game of spot-the-opinion; the essay is about their own instrument, so they have something to say.'},
   levels:{
    'A2':{task:'Write the essay with the four paragraph openings given and your plan grid, 320–380 words.',
          help:'The four openings printed; the word bank of contrast and concession.',
          model:'Every day at NIS, we measure how long students use screens. Is this a good idea?'},
    'B1':{task:'Write the essay, 320–380 words, with two reasons on each side and your position last.',
          help:'Model essay on another topic.',
          model:'On the one hand, supporters argue that the data help the school to save energy. For example, our data show that the labs used 40% more kWh than the classrooms.'},
    'B2':{task:'Write the essay with evidence in every reason, one third conditional, and a concession in the last paragraph.',
          help:'Whereas, nevertheless, admittedly.',
          model:'If we had known that five people could see the data, we would have asked for consent differently. Admittedly, the data are anonymous; nevertheless, anonymity depends on who holds the key.'},
    'C1':{task:'Write the essay so that a reader cannot tell your side until the last paragraph, and the last paragraph still surprises.',
          help:'Fairness first; then the turn.',
          model:'It would be easy to conclude that a school that measures screens must be controlling them. Yet the evidence points to something odder: the people who most want the data are the students.'}}},

  {s:4,title:'The essay, delivered',from:'10.4',
   objective:'Close the essay and hand it in. Third graded piece of the term (P3).',
   hook:'Reading aloud to the wall: each pupil reads their final paragraph aloud to a partner who stands on the other side of the room and can only hear, not see. If the partner can tell which side the writer takes before the last paragraph, the writer loses a point. A quick, loud reminder that the opinion stays at the end.',
   explain:'The final version is not the draft typed up. Read it aloud once: has your opinion stayed in the last paragraph? Check against criterion 5 and the portal checklist: both sides, evidence in each reason, the third conditional, the concession, 320–380 words. You type it into the portal; the marker gives you a first pass and the teacher gives you the grade. The deadline is today, Friday 13 November.',
   example:'Checklist line the marker will look for: a title that is a question ("Should NIS be collecting screen minutes?"), a third conditional ("If we had known…, we would not have…"), a figure with a unit ("40% more kWh"), and a position marker at the end ("on balance", "in my view").',
   view:[
    '6 min · Reading to the wall: partners listen and say whether they can tell the side before the last paragraph.',
    '8 min · Read your draft aloud once to yourself. Mark with a pencil anything that sounds like opinion before the last paragraph.',
    '10 min · Check against criterion 5 and the portal checklist, point by point: both sides, evidence in every reason, third conditional, concession, 320–380 words.',
    '17 min · Type it into the portal. Run the checker: a first pass appears. Fix any item that does not turn green.',
    '4 min · Hand in: the essay in the portal. Deadline today. The teacher grades with the essay rubric and enters it in Toddle by Friday 4 December.'],
   dua:{represent:'The checklist read aloud and displayed on the board; the rubric in short sentences with an example for each level; typing support such as spell-check in English.',
        express:'Type or, with agreed adjustment, dictate; choose how to organise the final polish; use the checker as a conversation rather than a verdict.',
        engage:'A clear deadline and a visible checklist give a sense of finish; the first pass from the marker gives immediate feedback; the essay is their own writing about their own project.'},
   levels:{
    'A2':{task:'Copy your corrected essay into the portal and tick the checklist.',
          help:'Your draft with the corrections marked.',
          model:'I checked: the title is a question, and I have the reasons for and against.'},
    'B1':{task:'Produce the final version, check the four paragraphs do their job, and hand it in.',
          help:'Checklist of five things to verify.',
          model:'My introduction explains the question, paragraphs two and three give two reasons each, and paragraph four gives my opinion.'},
    'B2':{task:'Produce the final version, check that every reason has evidence and no fallacy of your own survives, and hand it in.',
          help:'Underline each reason and find its evidence.',
          model:'I removed a false dilemma from paragraph three: I wrote that the school must choose between data and privacy, but there are other options.'},
    'C1':{task:'Produce the final version and check that the last paragraph answers the best point of the other side.',
          help:'If it does not, the essay is not finished.',
          model:'The opposition’s best point is that anonymity can fail. My last paragraph accepts this, and proposes an end date and a second keyholder as the answer.'}}}
 ]},

    {n:9,title:'The machine ends',dates:'16–20 November',
 desc:'The Time Machine, from chapter 7 to the end: Wells saw a future split in two, and your data is a small machine for seeing the same thing. Then three novels and one question, the point–evidence–explanation model, the other side’s best points, and a timed rehearsal for the formal debate on the motion "This house would delete the data".',
 give:'Your reading diary entry, three PEE blocks for your side, the other side’s three strongest points with an answer to each, and a rehearsed two-minute speech.',
 across:{
  comunicacion:'The final portfolio reflection, in Spanish; the debate notes summarised for the school newsletter.',
  ict:'The final decision about the data: kept, anonymised or deleted — taken with the class after the debate. The data so far, exported and anonymised: what the instrument would hand over if asked.'},
 sessions:[
  {s:1,title:'The Time Machine, chapters 7 to 9',from:'9.1',
   objective:'Read the Morlocks’ world with the eyes of somebody who has measured something, and see how evidence changes the Traveller’s mind.',
   hook:'Underground sounds: the lights go off and the teacher plays a recording of a machine humming. Pupils write three words for what they imagine is making the sound and who is looking after it. The class compares the words with the chapter 7 description: how close were you to Wells?',
   explain:'In chapters 7–9 the machines are still running underground: who runs them, for whom, and since when? The Time Traveller changes his theory twice, and each time evidence changes his mind: that is how an argument with evidence works, even in a novel. Every claim about the Morlocks needs a line from the text to prove it.',
   example:'Textual evidence in a model sentence: "The Traveller first believes that the Morlocks are servants (chapter 7: ‘…’), but he later changes his mind when he finds the Eloi are their food." Reading diary: "The sentence I will remember is…, on page…, because it shows…"',
   view:[
    '4 min · Underground sounds: lights off, a recording of a machine; three words each; compare with the chapter 7 description.',
    '14 min · Chapters 7–9 (read in pairs, one reads, one finds evidence): who runs the machines, for whom, since when? Find the two sentences where the Traveller admits he was wrong.',
    '10 min · Textual evidence relay: every claim about the Morlocks needs a line. One pupil states a claim, a teammate finds the line, a third reads it aloud.',
    '10 min · Groups of four: the Traveller’s two theories drawn as a diagram, with the evidence that kills each one.',
    '7 min · Reading diary: the sentence of chapters 7–9 you will remember, and why.'],
   dua:{represent:'The chapters in the reader, with audio for those who prefer to listen; key lines highlighted; a Spanish glossary for the vocabulary of chapters 7–9; a drawing of the Traveller’s two theories.',
        express:'Write answers, speak the claim to a partner, draw the theories as a diagram or record the diary entry.',
        engage:'The underground sounds are a mystery; the relay is a team game; the reading diary is personal, with no right answer.'},
   levels:{
    'A2':{task:'Answer six comprehension questions on chapters 7–9 and copy the sentence where the Traveller admits he was wrong. Write the sentence you will remember, with the page.',
          help:'Questions with two options; the page reference.',
          model:'The Traveller says he was wrong: "I had been wrong." (page 82).'},
    'B1':{task:'Summarise what the Traveller learns about the Morlocks and quote one line that proves it.',
          help:'Frame: "He discovers that… The text says…"',
          model:'He discovers that the Morlocks look after the machines and that they eat the Eloi. The text says that he found their wells.'},
    'B2':{task:'Explain the two theories the Traveller holds and what evidence changes his mind each time.',
          help:'That is how an argument with evidence works — in a novel too.',
          model:'His first theory, that the future is a paradise, fails when he finds the Morlocks’ wells.'},
    'C1':{task:'Explain the two theories and say which fallacy the Traveller commits in the first one, with textual evidence.',
          help:'He cherry-picks. Show where. Look at the narrator, not at the Traveller.',
          model:'The Traveller cherry-picks: he sees the beautiful Eloi and concludes that all of the future is a paradise.'}}},

  {s:2,title:'The machine ends, and three novels, one question',from:'9.1+9.4',
   objective:'Finish the novel, see what Wells decided not to say, and compare three novels on one question.',
   hook:'Three book covers on the board: the readers of Terms 1 and 2 and The Time Machine. The teacher asks: "In which of these futures would you rather live?" A show of hands, then a second show at the end of the lesson to see who changed their mind.',
   explain:'Chapters 10 to the end: the Traveller goes further, comes back, then leaves and does not return. Wells leaves a lot unsaid, and the ending is a decision, not an accident. Back to week 1: Wells took one fact of 1895 and followed it; now that you have read the whole curve, was he right? Three novels, one question: all three describe a future, and one question applies to all: who wins and who loses, and does the author tell you which is which? What all three share and what only Wells does (the narrator-witness and the far future are technique).',
   example:'Comparative paragraph opening: "Both The Time Machine and [reader of Term 1] imagine a future that is unfair to somebody; whereas Wells shows it through a witness, the other novel uses…" Reading diary, last entry: "The sentence I will remember is…, on page…, because it shows…"',
   view:[
    '4 min · Three covers, one hand-vote: where would you rather live? Note the numbers.',
    '10 min · Chapters 10 to the end: the Traveller goes further, comes back, leaves. What does Wells leave unsaid? Discuss in groups of four: is the open ending a decision?',
    '5 min · Back to week 1: was Wells right? Reading diary, last entry: the sentence of the book you will remember.',
    '12 min · Three novels on the board. One question: who wins, who loses, and does the author tell you which is which? In groups, one novel each, make the case in three minutes for the one that says most about justice.',
    '8 min · The comparison: what all three share, what only Wells does. Notes for a comparative paragraph.',
    '6 min · Second hand-vote: did anyone change their mind, and why?'],
   dua:{represent:'The three novels summarised in a comparison table; the chapters with audio; key lines highlighted; a Spanish glossary.',
        express:'Write the comparison paragraph, make a table, or speak it to a partner; record the diary entry.',
        engage:'The two votes show whether a novel can change your mind; each group defends one book; the diary has no right answer.'},
   levels:{
    'A2':{task:'Answer six questions on the ending. Complete the comparison table for the three novels (who wins, who loses, does the author say) and write three sentences.',
          help:'Questions with two options. Table with the first novel done.',
          model:'In The Time Machine, the Eloi lose and the Morlocks win.'},
    'B1':{task:'Explain how the novel ends and what you think happened to the Traveller, with one piece of evidence. Write a comparative paragraph of 100–120 words on the three novels using comparison language.',
          help:'Frame: "I think that… because the text says…" Both… whereas…; unlike…; similarly.',
          model:'I think the Traveller went back in time because he took the camera with him. Both The Time Machine and the reader of Term 2 show a future that is unfair to somebody, whereas the reader of Term 1 is more hopeful.'},
    'B2':{task:'Explain what the ending leaves open and why Wells might have chosen that, with evidence from the last chapter. Write the paragraph arguing which novel says most about a future that is unfair to somebody, with evidence from two of them.',
          help:'An open ending is an argument too. Quote once from each novel.',
          model:'Wells leaves the ending open so that the reader has to decide what the future is. Although all three novels show an unfair future, The Time Machine says most, because Wells shows the unfairness through the Traveller’s own mistake.'},
    'C1':{task:'Say whether the novel is on the side of the Eloi, the Morlocks, or neither, with textual evidence. Write the paragraph and say what The Time Machine adds that the other two could not, as craft and not as topic.',
          help:'The narrator-witness and the far future are technique. Argue from them.',
          model:'The narrator’s distance from the Traveller suggests the novel sides with neither group. What Wells adds is the distance of a narrator who retells another man’s story, so the reader can doubt the Traveller.'}}},

  {s:3,title:'Point, evidence, explanation',from:'9.2',
   objective:'Build a debate speech from the PEE model.',
   hook:'The motion appears on the board: "This house would delete the data." Sides are drawn by lot from a hat, and the teacher announces: "You may have to argue against your own essay." Groans, laughter, and then a minute of silence to think of your first reaction.',
   explain:'A debate speech is made of blocks of three sentences: point (one sentence), evidence (one figure or one quote), explanation (why the evidence proves the point). If you cannot do it in three, you have not understood it yet. Each block must connect the evidence to the point, and the explanation is where most speakers lose marks.',
   example:'PEE block: "Point: deleting the data would protect students’ privacy. Evidence: our access log shows that five people viewed the data in three weeks. Explanation: if five people can see it, the risk is bigger than we thought, so deleting it removes a risk that we cannot control."',
   view:[
    '5 min · The hat: teams of three, sides drawn by lot. Read the motion and say your first reaction in one word.',
    '10 min · The model on the board: point, evidence, explanation. Practise with a motion on another topic ("This house would ban homework"): three sentences, one minute.',
    '18 min · Each team builds three PEE blocks for its side. One figure of your own data per block.',
    '8 min · Read one block to the other side, who say whether the explanation connects the evidence to the point.',
    '4 min · Exit ticket: your strongest block, in one sentence.'],
   dua:{represent:'The PEE model on a colour-coded card; a model block shown on video; a Spanish glossary of debate words.',
        express:'Write blocks on cards, speak them to a partner or record them.',
        engage:'Sides drawn by lot make it a game; your own data is the evidence; the three-sentence limit makes it a challenge.'},
   levels:{
    'A2':{task:'Complete three PEE blocks for your side with the frames given and one figure each.',
          help:'Frames: "Our point is… The evidence is… This shows that…"',
          model:'Our point is that we should delete the data. The evidence is that five people saw it. This shows that it is not safe.'},
    'B1':{task:'Write three PEE blocks for your side, each with a figure or a quote, and time them: two minutes for the three.',
          help:'Model block on a different motion. Say what level the answer reaches on the rubric.',
          model:'Our first point is that the data is no longer useful. The evidence is that sample 2 gave almost the same number as sample 1. This shows that we do not need to measure again.'},
    'B2':{task:'Write the three blocks, each with an explanation that clearly connects the evidence to the point.',
          help:'Ask yourself: so what? The explanation answers it.',
          model:'Point: the data has done its job. Evidence: the leadership team has read our proposal. Explanation: once the decision is taken, keeping the dataset only adds risk.'},
    'C1':{task:'Write the three blocks so that the third one concedes a point the other side will make and turns it.',
          help:'Concede, then explain why it still supports your side.',
          model:'The other side is right that the data helped us, but that proves my point: if we already know what the data can show, we no longer need to keep it.'}}},

  {s:4,title:'The other side’s best points, and the debate rehearsal',from:'9.2',
   objective:'Prepare for what the other side will say, decide what really happens to the data, and rehearse a timed speech with points of information.',
   hook:'Each team gets an envelope with the other side’s three arguments, written by the teacher, and a bet: "Which one will they play first?" Teams bet a point each; the real order is revealed at the end.',
   explain:'A strong team prepares the three strongest points of the other side and an answer to each, not the weakest. With ICT: the three real options for the instrument’s data are keep it, anonymise it or delete it, and each one costs and protects something. A point of information is a short question or challenge offered during the other side’s speech; the speaker may accept or decline it. Today you practise with the clock running.',
   example:'Answer to the other side: "That is a fair point, and here is why we still…" Offering a point of information: "On a point of information, Madam Chair…" Accepting: "Yes, please." Declining: "Not now, thank you."',
   view:[
    '5 min · The envelope and the bet: which of the other side’s points will come first?',
    '10 min · The other side’s three strongest points, and an answer to each. Write the answers on cards.',
    '8 min · With ICT: keep, anonymise or delete: what each one costs and protects. A table on the board.',
    '14 min · Rehearsal in pairs, timed: two minutes of speech, one point of information from the partner. Swap and repeat.',
    '8 min · Feedback with the rubric: one star and one wish for your partner.'],
   dua:{represent:'The three data options on a table with costs and protections; the rules of the floor on a poster; a Spanish glossary of debate words.',
        express:'Speak from cards or notes, or record the rehearsal and listen back.',
        engage:'The bet makes predicting the other side a game; the timed rehearsal is a challenge; a partner gives honest feedback in private.'},
   levels:{
    'A2':{task:'Complete the table: the other side’s three points and your answer to each, with the frames given. Rehearse your speech once from your cards.',
          help:'Table with the first row done; answer frames.',
          model:'Their point is that the data helps the school. Our answer is that it is not safe.'},
    'B1':{task:'Write the other side’s three points and your answers, and rehearse your speech twice from notes.',
          help:'Say what level the answer reaches on the rubric.',
          model:'They say the data is useful. We answer that sample 2 gave almost the same number as sample 1.'},
    'B2':{task:'Write the rebuttal to the other side’s likely first point, and mark which of their points you cannot fully answer, and what you will say about it.',
          help:'Predict it from their essays. "That is a fair point, and here is why we still…"',
          model:'That is a fair point: the data helped us find a heating fault. Nevertheless, we could have found it with a single reading, and we did not need to keep the whole dataset.'},
    'C1':{task:'Draft the point of information you will offer at the exact moment the other side is weakest. Extension: sketch which of the three novels you have read would support your side of the motion, and why.',
          help:'Timing is an argument. For the extension: who wins and who loses in each future?',
          model:'In The Time Machine, the Morlocks keep the machines running long after anyone remembers why; that is what happens to data nobody dares to delete.'}}}
 ]},

{n:10,title:'The formal debate',dates:'23–27 November',
 desc:'The formal debate on the motion "This house would delete the data" (part B of the product Defence and debate): final preparation, two rounds with half the class debating and half judging, then the term portfolio with the traffic-light self-assessment.',
 give:'The debate (speech and notes), and the term portfolio with your traffic light and your final reflection.',
 due:'P4 part B — the formal debate (sessions 2–3, 24–25 November)',
 across:{
  philosophy:'Who decides what happens to data about minors? Rights, consent and the common good, argued from both sides of the motion.',
  ict:'The final decision about the data: kept, anonymised or deleted — taken with the class after the debate.',
  math:'Counting the votes: the standing vote against the final vote, and what a change of percentage points tells us.',
  comunicacion:'The debate notes summarised in Spanish for the school newsletter; the final portfolio reflection.'},
 sessions:[
  {s:1,title:'The motion drawn: teams, roles, final preparation',from:'new',
   objective:'Know your team, your role and the rules of the floor, and finish preparing your speech.',
   hook:'The draw: the chair pulls team names from a hat and the board shows the bracket for the two rounds. A drum roll, and then the question: "Who is nervous?" Hands go up. "Good. That means it matters."',
   explain:'The debate has strict rules so that the argument, not the loudest voice, wins. Proposition first: three speeches of two minutes, then opposition, then one rebuttal each. Everyone has a role: speaker, chair, timekeeper, judge with the rubric, note-taker. Today you check your cards, agree who says what and who offers the points of information.',
   example:'Opening line of a speech: "Madam Chair, honourable members of the opposition, this house believes that the data should go." Rebuttal: "The opposition says the data is anonymous. That is a fair point, but the access log shows five people saw it."',
   view:[
    '6 min · The draw: teams, sides and round (1 or 2) are announced. Roles for the other half: timekeepers, judges, note-takers.',
    '6 min · The rules of the floor read by the chair, with the rubric on the screen.',
    '16 min · Final preparation in teams: order of speakers, who offers points of information, one last check of the PEE cards.',
    '12 min · Dress rehearsal of the first thirty seconds of every speech, standing up, with the clock.',
    '5 min · Judges and timekeepers meet the teacher: how to score and how to signal time.'],
   dua:{represent:'The rules of the floor on a poster and a script for the chair; the rubric in simple English with Spanish support; the bracket on the board.',
        express:'Speak from cards, notes or an outline; choose a role: speaker, chair, timekeeper, judge or note-taker.',
        engage:'The draw adds suspense; every pupil has a real role; the quieter pupils can judge or chair.'},
   levels:{
    'A2':{task:'Check your three PEE cards and practise your opening line aloud twice. Learn the three sentences for accepting and declining a point of information.',
          help:'Your three cards; the sentence frames.',
          model:'Thank you, Madam Chair. Our point is that the data is not safe.'},
    'B1':{task:'Prepare notes for a two-minute speech and agree with your team who offers the points of information.',
          help:'Your notes; timing marks every thirty seconds.',
          model:'Thank you, Madam Chair. My first point is that the data has done its job.'},
    'B2':{task:'Prepare your speech and one rebuttal to the other side’s likely first point, and plan how to answer a point of information you did not expect.',
          help:'"I do not know, but I would find out like this" is still a good answer.',
          model:'The opposition will say the data is anonymous. Even so, five people have seen it.'},
    'C1':{task:'Prepare your speech and a point of information for the exact moment the other side is weakest, and decide which of your own points you will drop if you run out of time.',
          help:'Timing is an argument. Choose what to cut.',
          model:'On a point of information: if the data is anonymous, why does the access log name five viewers?'}}},

  {s:2,title:'The formal debate, round 1',from:'new',
   objective:'Hold your position for two minutes in front of the class, and take a point of information. Product P4 part B (Defence and debate). Half the teams debate; the rest judge.',
   hook:'The chair taps the table three times and reads the motion in the voice of a parliament: "This house would delete the data." The class stands for a minute and chooses a side of the room to stand on according to their instinct. They will vote again at the end of round 2, and the difference between the two votes is a first result.',
   explain:'Proposition first: three speeches of two minutes, then opposition, then one rebuttal each. Points of information: the speaker may accept or decline. Timekeepers stop anyone at two minutes. The teams that are not debating work as timekeepers, judges with the rubric and note-takers: they listen for the best point of each side. The vote is on the argument, not on the side you believe.',
   example:'Accepting a point of information: "Yes, please." Declining: "Not now, thank you." Rebuttal: "The opposition says the data is anonymous. That is a fair point, but the access log shows five people saw it."',
   view:[
    '4 min · The standing vote: stand in the part of the room that matches your instinct. Count and note the numbers.',
    '4 min · The chair opens the floor and reads the motion. Timekeepers check their watches; judges open the rubric.',
    '20 min · Round 1: proposition, three speeches of two minutes; opposition, three speeches. Points of information may be offered, accepted or declined. Judges and note-takers write the best point of each side.',
    '6 min · One rebuttal each, one minute. The chair thanks both sides.',
    '8 min · Judges give oral feedback against the rubric: one star and one wish per speaker. The scores are collected.',
    '3 min · Swap notes with the teams of round 2.'],
   dua:{represent:'The rules of the floor on a poster and a script for the chair; the PEE cards for speakers; the clock visible to everyone.',
        express:'Speak from cards, notes or an outline; judges and note-takers write in two columns or record a voice note.',
        engage:'A real debate with a real consequence: what happens to the data; the standing vote makes the audience part of the action; roles keep everyone involved.'},
   levels:{
    'A2':{task:'Debating: deliver your speech from your PEE cards. Judging: write the best point of each side.',
          help:'Your three cards.',
          model:'Our point is that the data is not safe. The evidence is that five people saw it. This shows that we should delete it.'},
    'B1':{task:'Debating: deliver your speech from notes and accept one point of information. Judging: write the best point of each side and one star and one wish.',
          help:'Your notes; the rubric.',
          model:'Thank you, Madam Chair. My first point is that the data has done its job. Yes, I will accept a point of information.'},
    'B2':{task:'Debating: deliver it and rebut one point of the other side with evidence. Judging: score with the rubric and justify one score in a sentence.',
          help:'"I do not know, but I would find out like this" is still a good answer.',
          model:'I gave the opposition a higher score because they conceded the privacy risk and still showed that anonymised data protects students.'},
    'C1':{task:'Debating: deliver it, take a point of information and turn it. Judging: say which argument was strongest, which was weakest, and why.',
          help:'Concede, then explain why it still supports your side. Judge the argument, not the side.',
          model:'The proposition’s strongest point was the access log, because it was evidence rather than opinion.'}}},

  {s:3,title:'The formal debate, round 2, and rebuttal awards',from:'new',
   objective:'Debate or judge in round 2, vote on the argument, and decide what happens to the data. Product P4 part B (Defence and debate).',
   hook:'The scoreboard from round 1 is on the board, with the three best points chosen by the judges. The chair says: "Round 2 has to beat that." Then the rebuttal awards are announced as a surprise: best rebuttal, best point of information, best use of evidence.',
   explain:'The rules are the same as in round 1; the roles are swapped. Afterwards the audience votes on the argument, not on the side they believe. A rebuttal award goes to the speaker who listened best, not to the loudest one. Then the class decides what actually happens to the data and gives feedback to each other.',
   example:'Rebuttal that earns an award: "My opponent said the data is anonymous. That is true for the names. It is not true for the room codes, which a teacher could still identify." Feedback: "Two stars: your evidence was clear and you stayed on time. One wish: concede one point earlier."',
   view:[
    '3 min · The scoreboard and the three best points of round 1.',
    '20 min · Round 2: the other half of the teams debate; the rest are timekeepers, judges and note-takers. Same rules, same clock.',
    '5 min · One rebuttal each, one minute.',
    '7 min · The vote on the argument, not on the side you believe: the audience writes the best point of each side and votes. The chair announces the result.',
    '5 min · Rebuttal awards: best rebuttal, best point of information, best use of evidence. The class decides what happens to the data: kept, anonymised or deleted. Compare the standing vote and the final vote.',
    '5 min · Feedback: each pupil receives two stars and a wish from a judge.'],
   dua:{represent:'The same poster and script as in round 1; the rubric with Spanish support; the awards written on the board.',
        express:'Speak from cards, notes or an outline; the audience writes the best points in two columns or records a voice note.',
        engage:'The awards turn feedback into a celebration; the final vote has a real consequence for the data; roles keep everyone involved.'},
   levels:{
    'A2':{task:'Debating: deliver your speech from your PEE cards. Judging: write the best point of each side and vote.',
          help:'Your three cards.',
          model:'The best point was: the data is not safe because five people saw it.'},
    'B1':{task:'Debating: deliver your speech from notes, accept one point of information. Judging: write the best point of each side and say why you voted as you did.',
          help:'Your notes.',
          model:'I voted for the opposition because they showed that anonymised data is safe and useful.'},
    'B2':{task:'Debating: deliver it, rebut one point with evidence. Judging: write why the vote went the way it did.',
          help:'"I do not know, but I would find out like this" is still a good answer.',
          model:'The vote went to the opposition because they conceded the privacy risk and still showed that anonymised data protects students and informs the school.'},
    'C1':{task:'Debating: deliver it, take a point of information and turn it. Judging: write what you would change in the motion to make the debate fairer.',
          help:'The motion frames the debate the way the article framed the issue in week 7.',
          model:'"This house would delete the data" assumes only two options, delete or keep. A fairer motion would be: "This house would anonymise and set an end date for the data."'}}},

  {s:4,title:'Portfolio and traffic light',from:'9.4',
   objective:'Close the term with what you made, and make an honest map of what you can do with the grammar.',
   hook:'The portfolio table: on each desk lies a pile with the proposal, the story, the essay and the debate notes of one pupil, shuffled. Pupils have one minute to put the four in the order in which they were written, just by looking at the first lines. The class discovers how much their writing has changed since week 4.',
   explain:'The portfolio: the proposal, the story, the essay and the debate notes, in that order. The traffic light is an honest map: green means you could teach it. Then a final reflection on the question of the unit: what does artificial intelligence really cost this school, and what did you decide about measuring it?',
   example:'Traffic light row: "Third conditional — amber — I use it correctly in writing but I make mistakes when speaking: ‘If we would have known’." Reflection opening: "At the start of the unit I thought… Now I think… because…"',
   view:[
    '5 min · The portfolio puzzle: put the four pieces in the order they were written, just by looking at the first lines.',
    '10 min · Assemble the portfolio: the proposal, the story, the essay and the debate notes, in that order. Choose the product you are proudest of and say why in one sentence.',
    '12 min · The traffic light: red / amber / green for each grammar point of the term (narrative tenses, proposal register, third conditional, contrast and concession). Honest: green means you could teach it.',
    '15 min · Final reflection, 120–150 words: what does artificial intelligence really cost this school, and what did you decide about measuring it?',
    '3 min · Hand in: the portfolio and the traffic light in the portal.'],
   dua:{represent:'The traffic light printed with example sentences for each grammar point; reflection openings given; a Spanish glossary.',
        express:'Write the reflection or record it and transcribe it; choose which product to highlight.',
        engage:'The puzzle shows real progress; the traffic light is honest and private; the final question is a real one about their school.'},
   levels:{
    'A2':{task:'Complete the traffic light with the four grammar points and write the reflection with the three openings given.',
          help:'The traffic light printed; the openings.',
          model:'I think AI costs this school a lot of energy.'},
    'B1':{task:'Complete the traffic light with one example of your own per point, and write the reflection in 120–150 words.',
          help:'Be specific: which moment of the term, and why.',
          model:'I am amber on the third conditional because I forget "had".'},
    'B2':{task:'Complete the traffic light, write the reflection answering both questions, and say which of the four products you would send to the leadership team again.',
          help:'And say what you would change in it first.',
          model:'I would send my proposal again, but with a clearer cost.'},
    'C1':{task:'Complete the traffic light, write the reflection, and say what you would measure next year to answer the unit question better.',
          help:'The next question is always better than the first.',
          model:'Next year I would measure not how long students use screens but what they do in that time.'}}}
 ]},

{n:11,title:'Presentation of work and assessment',dates:'30 November – 4 December',
 desc:'The data exhibition, where teams present their whole journey to invited guests; structured peer feedback; the calm briefing for Cambridge B2 First on Wednesday 2 December; and the day students read their released grades, set one target and write the question they would measure next year.',
 give:'Your exhibition station, your two stars and a wish for another team, your target, and your question for next year.',
 due:'All four grades closed and in the Toddle gradebook by Friday 4 December',
 across:{
  philosophy:'What counts as knowing something about a school? Measurement, interpretation and who is left out of the numbers.',
  ict:'The exhibition stations: charts, anonymised data and a short demo of the instrument; the gradebook released to students in Toddle.',
  math:'Reading your own chart for an audience: scale, sample size and what the average hides.',
  comunicacion:'A short invitation to the exhibition in Spanish for the guests; the question for next year, in Spanish as well.'},
 sessions:[
  {s:1,title:'The data exhibition',from:'new',
   objective:'Present your team’s whole journey to invited guests: the samples, the proposal, a passage of the story, the essay question and what the debate decided.',
   hook:'The classroom is a gallery: stations with team posters, the leadership team and guests walking in. The teacher says: "Today you are not students, you are the people who know the most about this school’s data."',
   explain:'An exhibition tells a journey, not a list. Each station has five stops: the samples (what, where, when, how many), the proposal (what you asked NIS to do), a passage of the story (one paragraph read aloud), the essay question, and what the debate decided about the data. Half the team stays at the station and presents; the other half walks the gallery and asks questions. Then you swap.',
   example:'Opening at the station: "Good morning. We measured screen minutes in the library in three weeks. Our number moved from 42 to 39. This is what we recommended, and this is what the debate decided." Guest question: "How do you know your sample was fair?"',
   view:[
    '5 min · Set-up: stations, posters and guests arrive. Each team agrees who presents first.',
    '15 min · Gallery walk, part 1: half of each team presents the journey in five stops; the other half walks the gallery and asks one question at each station.',
    '15 min · Gallery walk, part 2: swap roles.',
    '6 min · Guests ask one question each; teams answer in two sentences.',
    '4 min · Thank-you round: each guest names the most convincing station and why.'],
   dua:{represent:'Posters with charts, a timeline of the unit and a glossary in English and Spanish; the story passage printed large; the five stops on a card.',
        express:'Present orally, point to the poster, read the story passage or answer questions in a prepared written card.',
        engage:'A real audience of guests and the leadership team; stations make it active; each pupil has a part to play.'},
   levels:{
    'A2':{task:'Present two of the five stops with the frames given and read your passage of the story aloud.',
          help:'Frames: "We measured… We found… We recommend…" A poster with pictures and a word bank.',
          model:'We measured screen minutes in the library. We found that students use 40 minutes. We recommend a break every 20 minutes.'},
    'B1':{task:'Present three stops and answer one guest question in two sentences.',
          help:'Frame: "Our sample was… because… A limitation is…"',
          model:'We measured the library in three weeks. Our number moved from 42 to 39, so we think it is stable.'},
    'B2':{task:'Present all five stops and answer a guest question with evidence from your data.',
          help:'Link the stops: each one answers the question the last one raised.',
          model:'The samples told us what was happening; the proposal said what to do; the debate showed that people disagree about who should hold the data.'},
    'C1':{task:'Present the journey as one argument, state the limitations of your sample, and answer a challenging guest question without notes.',
          help:'Say what you cannot prove. That is what makes the rest credible.',
          model:'Our sample shows a trend, not a cause. With one more term of data we could say whether the proposal actually changed behaviour.'}}},

  {s:2,title:'Presentations continued, with structured peer feedback',from:'new',
   objective:'Finish presenting and give structured feedback against the rubric: two stars and a wish.',
   hook:'The teacher puts the rubric on the screen and says: "Today every presentation gets feedback from three people. Your job is to be useful, not nice." Each pupil receives three sticky notes with the headings: star, star, wish.',
   explain:'Good feedback is specific and kind. A star names something that worked and quotes it. A wish says one change that would make the next version better, and links to a criterion of the rubric. You give two stars and one wish to each of three teams. You read the feedback you receive and choose one thing to remember.',
   example:'Two stars and a wish: "Star: your chart showed the change clearly (criterion 1). Star: you read the story passage slowly and with expression (criterion 4). Wish: I wish you had said how many students you measured (criterion 2)."',
   view:[
    '4 min · The rubric on the screen: one example of a star and one of a wish.',
    '22 min · Presentations continued: the remaining teams present; the audience writes two stars and a wish for the team they watch.',
    '8 min · Feedback exchange: each team receives its sticky notes and reads them in silence.',
    '8 min · In teams, choose the one wish you will act on and say how.',
    '3 min · Feedback on the feedback: which note was most useful, and why.'],
   dua:{represent:'The rubric in simple English with Spanish support; models of good and poor feedback on the board.',
        express:'Write the notes, say them to the team or record a voice note.',
        engage:'Everyone is both presenter and critic; the sticky notes are quick and tangible; feedback is specific and private to the team.'},
   levels:{
    'A2':{task:'Write two stars and a wish with the frames given for one team.',
          help:'Frames: "I like… because… I wish you…"',
          model:'I like your chart because it is clear. I wish you spoke more slowly.'},
    'B1':{task:'Write two stars and a wish for two teams, linking each to a criterion.',
          help:'Say which criterion. Be specific: quote the team.',
          model:'I liked your sample plan because it was clear and fair. I wish you had explained the unit of measure.'},
    'B2':{task:'Write two stars and a wish for three teams, with a quotation from each presentation as evidence.',
          help:'Quote the words you heard.',
          model:'Star: you said, "Our number moved from 42 to 39", which made the change easy to follow. Wish: add how many students you measured.'},
    'C1':{task:'Write feedback for three teams, with at least one wish that challenges their reasoning, and say what the strongest presentation did differently.',
          help:'A good wish asks a better question.',
          model:'Wish: your recommendation assumes that screen minutes cause lower attention; what in your data supports a cause rather than a link?'}}},

  {s:3,title:'Assessment day: Cambridge B2 First, Wednesday 2 December',from:'new',
   objective:'Be ready, calm and organised for the exam. There is no unit lesson today; this short briefing is for the day before.',
   hook:'The teacher puts a clock on the screen and a list of five objects on the board: ID, pencil, rubber, water, watch. "Which one will you forget?" A laugh, and then the real list.',
   explain:'The exam is on Wednesday 2 December. There is no unit lesson that day. Today is a calm briefing: what to bring (ID, pencils, rubber, a watch, a bottle of water), when to arrive, and how to manage time in each paper. In Reading and Use of English, do not stay too long on one question; in Writing, plan for five minutes and leave three to check; in Listening, read the questions in the pause; in Speaking, listen to your partner and keep talking.',
   example:'Time plan for a Writing paper: "5 minutes planning, 35 minutes writing, 5 minutes checking: tenses, spelling and word count." What to say if you do not know a word in Speaking: "It is a kind of… / You use it for…"',
   view:[
    '5 min · The five objects: guess which one students forget most often.',
    '10 min · What to bring and where to go: time, room, rules for phones and ID.',
    '12 min · Time management by paper: Reading, Writing, Listening, Speaking. One tip for each, practised with a stopwatch on a short example.',
    '10 min · Calm: breathing, sleep, food and a one-minute routine before you start.',
    '8 min · Questions and personal plan: write the one thing you will do differently on the day.'],
   dua:{represent:'The checklist printed with pictures; the time plan in a table; a Spanish version of the instructions.',
        express:'Write your personal plan, say it to a partner or draw the checklist.',
        engage:'The forgetting game opens the lesson lightly; a personal plan keeps it practical; the tone is calm.'},
   levels:{
    'A2':{task:'Copy the checklist of what to bring and write one sentence about your plan for the day.',
          help:'Checklist with pictures.',
          model:'I will bring my ID and a pencil. I will arrive at 8:00.'},
    'B1':{task:'Write the checklist and a time plan for one paper.',
          help:'Frame: "First I will… then I will… finally I will…"',
          model:'In Writing, first I will plan for five minutes, then I will write, finally I will check my tenses.'},
    'B2':{task:'Write a time plan for two papers and say how you will stay calm if one question is difficult.',
          help:'Plan for what could go wrong.',
          model:'If I cannot answer a question, I will move on and come back, so that I do not lose time.'},
    'C1':{task:'Write a plan for the whole exam, including what you will do to recover if one paper goes badly.',
          help:'One bad paper does not decide the exam.',
          model:'If Listening goes badly, I will keep it in the past and give all my attention to Speaking.'}}},

  {s:4,title:'Grades, feedback and the next question',from:'new',
   objective:'Read your released grades and comments for P1 to P4, set one target, and write the question you would measure next year.',
   hook:'Each pupil receives an envelope with a printed page from Toddle, and a sticker. The teacher says: "Before you open it, write your prediction for each product on the back." Then the envelopes are opened. How close were you?',
   explain:'The grades for the four products are released in the Toddle gradebook. A grade is a message, not a verdict: read the comment first. Compare it with your prediction, find the criterion where you grew most and the one where you can grow next. Choose one target for the next unit: specific, small and possible. Last, the question of the unit never ends: what would you measure next year, and why?',
   example:'Target: "In the next unit I will check every figure against my table before I hand in, because the comment on P1 said two figures did not match." Next-year question: "How do students use their phones in the 20 minutes after lunch, and does it change how they feel in the next lesson?"',
   view:[
    '6 min · The envelope: prediction against reality for P1 to P4.',
    '10 min · Read the comments one by one: find the criterion where you grew most and one where you can grow next. Share one with a partner.',
    '10 min · Set one target: specific, small and possible, with a first step for next week.',
    '14 min · The next question: write the question you would measure next year, with what, where, when and how many in two lines.',
    '5 min · Pin the questions on the wall: the class chooses the best one to give the next year group.'],
   dua:{represent:'The rubric criteria beside each comment; sentence frames for targets; a Spanish glossary of words in the feedback.',
        express:'Write the target and the question, say them to a partner or record them.',
        engage:'The prediction game starts it; the target is personal; the question for next year is a real legacy for the school.'},
   levels:{
    'A2':{task:'Write what you did well in one product, your target with the frame given, and a question for next year.',
          help:'Frames: "I did well in… My target is… I would measure…"',
          model:'I did well in the story. My target is to use more past tenses. I would measure how many students use phones in the library.'},
    'B1':{task:'Choose the product where you grew most and explain why, set one target with a first step, and write your question with one detail on how you would collect it.',
          help:'Frame: "I improved in… because… Next time I will…"',
          model:'I improved in the essay because I used more linking words. Next time I will check my figures before I hand in.'},
    'B2':{task:'Compare your prediction with your grades, explain the difference, set a target linked to a criterion, and write a question with a sample plan.',
          help:'Link the target to a word in the rubric.',
          model:'I expected an A in P1 and got a B because my recommendation was not tied to my data. My target is to justify each recommendation with a figure.'},
    'C1':{task:'Analyse the pattern across the four grades, set a target that addresses its cause, and write a research question with the limitation of the method.',
          help:'A good question includes what you will not be able to say.',
          model:'My weaker grades both involve evidence. Next year I would ask not how long students use screens but what they do in that time, knowing that self-reports can be unreliable.'}}}
 ]}
  ],
  words:['artificial intelligence','algorithm','data centre','energy consumption','carbon footprint','e-waste','screen time','policy','trade-off','evidence','I would recommend','it is advisable to','although','despite','nevertheless','moreover','in contrast','tends to','may','might','plot','setting','narrator','foreshadow','twist','eventually','meanwhile','suddenly','by the time','had been','motion','proposition','opposition','rebuttal','point of information','whereas','admittedly','even so','if we had known','fallacy','bias','straw man','false dilemma','cherry-picking'],
  deliverables:[
    {kind:'report', type:'text', icon:'&#128203;', title:'P1 · Proposal to the leadership team',
     desc:'What you measured, what it means, and what you are asking NIS to do next year. Written to be acted on, not to be marked. First graded product.',
     spec:'300–350 words · proposal register · Friday 23 October', range:[300,350],
     brief:{
       when:'Data collected in week 4 (13–16 October). Draft by hand in week 5, session 2. Feedback against the rubric and final version typed into the portal in week 5, session 3 — deadline Friday 23 October.',
       steps:[
         'Title, one line: "Proposal: <what you measured> at NIS".',
         'Paragraph 1 — Context (50–70 words): what the leadership team asked for and which question your team took.',
         'Paragraph 2 — What we found (90–110 words): your headline figure with its unit, how you collected it (the sample: where, when, how many, with what instrument — in the passive, so it could be repeated), and one published source that puts it in context.',
         'Paragraph 3 — What we recommend (100–120 words): two or three recommendations in proposal register (I would recommend, it is advisable to, a first step would be), ordered from the cheapest to the most ambitious, each justified with your data. Answer the objection they will raise: although, even though, it could be argued.',
         'Paragraph 4 — What it costs and what we cannot prove (40–60 words): the time, money or effort of each recommendation, and what your sample does not show.',
         'Before handing in: 300–350 words; every figure matches your team’s table; it reads as a proposal, not as an essay; no claim goes beyond your data.'],
       graded:'Criteria 1 and 2 of the unit, with the proposal rubric (three criteria, AD · A · B · C). Marked in the portal; the grade goes to the Toddle gradebook as P1.'},
     checklist:[
       {k:'ask', t:'I make a specific recommendation, not a general complaint', re:'(i would recommend|we recommend|it is advisable|the school should|we propose)'},
       {k:'own', t:'I use data we measured ourselves at NIS', re:'(we measured|we counted|our data|we recorded|at nis|in our school)'},
       {k:'numbers', t:'There are real figures in it', re:'[0-9]+ ?(%|kwh|minutes|hours|devices|litres|liters|kg)'},
       {k:'source', t:'I bring in published research as well', re:'(according to|research|study|report|source)'},
       {k:'counter', t:'I answer the objection they will raise', re:'(however|although|despite|some may argue|it could be objected|even though)'},
       {k:'register', t:'I write in proposal register, not as an essay', re:'(recommend|advisable|should be|we suggest|first step)'}
     ]},
    {kind:'story', type:'text', icon:'&#9203;', title:'P2 · The year 802,701',
     desc:'What your number becomes if nobody acts on your proposal. Wells took one fact of 1895 and followed it into the far future; you do the same with the figure you measured. Second graded product.',
     spec:'320–380 words · narrative tenses · Friday 30 October', range:[320,380],
     brief:{
       when:'Story map in week 2 (done). Test scene in week 4, session 4. Full draft by hand in week 5, session 4. Feedback and final version typed into the portal in week 6, session 1; told out loud in week 6, session 2 — deadline Friday 30 October.',
       steps:[
         'Start from your audit number. With Maths, work out what it becomes if it keeps growing every year the way it grew this year: that figure is the engine of the story.',
         'A title of your own. Five parts: opening (the world of 802,701 as it looks now), inciting incident, complication, climax, resolution. Your story map gives you the protagonist, the setting, the conflict and the twist.',
         'Voice and structure: the narrator you chose in week 2 (a first-person witness, like Wells, or third person) and the structure (linear, in medias res or flashback). Keep them to the end.',
         'Tenses: past simple for what happened; past continuous for what was going on; past perfect for what had happened before; past perfect continuous for how long something had been going on. Move through time with eventually, meanwhile, suddenly, by the time, as soon as.',
         'The number has to be visible in the world of the story — in what it did to the people who live there — not explained in a sentence.',
         'Before handing in: 320–380 words; the four tenses; at least two sequence adverbs; a twist that the first paragraph foreshadows; the same tense control from the first line to the last.'],
       graded:'Criterion 4 of the unit, with the story rubric (three criteria, AD · A · B · C). Marked in the portal; the grade goes to the Toddle gradebook as P2.'},
     checklist:[
       {k:'pastperf', t:'I use the past perfect for what had happened before', re:'\\bhad (been |not |never |already |just )?[a-z]+(ed|en|t|n)\\b'},
       {k:'pastcont', t:'I use the past continuous for what was going on', re:'\\b(was|were) (not )?[a-z]+ing\\b'},
       {k:'ppcont', t:'I use the past perfect continuous for how long something had been going on', re:'\\bhad (not )?been [a-z]+ing\\b'},
       {k:'sequence', t:'I move through time with sequence adverbs', re:'\\b(eventually|meanwhile|suddenly|by the time|as soon as|no sooner)\\b'},
       {k:'number', t:'The number I measured is in the story, grown', re:'[0-9][0-9,.]* ?(%|kwh|minutes|hours|devices|litres|liters|kg|years|screens|tablets)'},
       {k:'future', t:'The story reaches the year 802,701', re:'802[,.]?701'}
     ]},
    {kind:'essay', type:'text', icon:'&#9878;', title:'P3 · Should NIS be collecting this?',
     desc:'The for-and-against essay on your own instrument: both sides, with evidence, before your own position. Third graded product.',
     spec:'320–380 words · for-and-against essay · Friday 13 November', range:[320,380],
     brief:{
       when:'Second sample and issue framed in week 7. Plan grid in week 8, session 2. Draft by hand in week 8, session 3. Final version typed into the portal in week 8, session 4 — deadline Friday 13 November.',
       steps:[
         'Title as a question: "Should NIS be collecting <your number>?"',
         'Paragraph 1 — Introduction (50–60 words): what the instrument collects and why the question is real. No opinion yet.',
         'Paragraph 2 — Arguments for (90–110 words): two reasons to collect it, each with evidence — your two samples, the leadership team’s answer, a published source.',
         'Paragraph 3 — Arguments against (90–110 words): two reasons not to, taken seriously — who sees the data, what any measure leaves out (the capabilities objection from Philosophy), what could go wrong. At least one third conditional: if we had known…, we would not have….',
         'Paragraph 4 — Your position (60–80 words): only now. Concede the other side its best point (admittedly, nevertheless) and then choose.',
         'Before handing in: 320–380 words; both sides before your own; evidence in every reason; none of the fallacies from week 8 in your own text; formal register throughout.'],
       graded:'Criterion 5 of the unit, with the essay rubric (three criteria, AD · A · B · C). Marked in the portal; the grade goes to the Toddle gradebook as P3.'},
     checklist:[
       {k:'question', t:'The title is the question', re:'^\\s*should\\b.*\\?'},
       {k:'for', t:'I give reasons for, with evidence', re:'(on the one hand|one argument (for|in favour)|supporters|those in favour|firstly|first of all)'},
       {k:'against', t:'I give reasons against, taken seriously', re:'(on the other hand|however|opponents|those against|nevertheless|admittedly)'},
       {k:'third', t:'I use the third conditional at least once', re:'\\bif [^.]{0,60}\\bhad\\b[^.]{0,80}\\bwould (not )?have\\b|\\bwould (not )?have\\b[^.]{0,80}\\bif [^.]{0,60}\\bhad\\b'},
       {k:'evidence', t:'There is evidence, not only opinion', re:'([0-9]+ ?(%|kwh|minutes|hours|devices|litres|liters|kg)|according to|research|study|our data|we measured)'},
       {k:'position', t:'My position comes at the end', re:'(in conclusion|to conclude|on balance|all things considered|in my (view|opinion)|i believe)'}
     ]},
    {kind:'debate', type:'file', icon:'&#128483;', title:'P4 · Defence and debate',
     desc:'One oral grade in two moments: your team defends the audit before the leadership team (week 6), and you argue the motion "This house would delete the data" in a formal debate (week 9). Fourth graded product.',
     spec:'Panel defence 6 min + questions (week 6) · debate speech 2 min (week 10, 24–25 November)',
     brief:{
       when:'Part A — panel defence: rehearsed and delivered in week 6, session 3 (28–29 October). Part B — formal debate: rehearsed in week 9, session 4, motion drawn in week 10, session 1, and held in week 10, sessions 2–3 (24–25 November). Upload your notes after each part; the grade is given after part B.',
       steps:[
         'Part A · The defence. The audit team presents; every member speaks. Notes on cards, not a script. Minute 1: the question and why it matters. Minutes 2–3: the sample — what you measured, where, when, how many, and the headline figure on a chart. Minutes 4–5: your recommendations, in order, with what each one costs. Minute 6: the objection you expect, answered. Then questions from the panel: answer, or say honestly how you would find out.',
         'Part B · The debate. Teams of three; proposition and opposition drawn by lot — you may have to argue against your own essay. Each speech: point – evidence – explanation, three blocks in two minutes. One figure from your own samples per block. One rebuttal per side after the six speeches.',
         'Prepare the three strongest points of the other side and your answer to each. Accept at least one point of information during your speech.',
         'Upload to the portal: your cards or speech notes (photo or PDF) and, if the class records it, the audio or video. Part A first; add part B in the same box after the debate.',
         'Choose how you prepare (UDL): cue cards, a mind map, a recorded rehearsal, or a partner rehearsal with the timer — all count.'],
       graded:'Criterion 3 of the unit, with the defence-and-debate rubric (content, interaction, delivery · AD · A · B · C), on the day, by the teacher, in the portal. The grade goes to the Toddle gradebook as P4. The portfolio and traffic light of week 10 are evidence for the unit review, not a separate grade; week 11 is for presenting the work and for assessment.'}}
  ]
},

/* ============================================================ PILOTO 2027
   La U5 de 9.o SALIO DEL PILOTO el 14-sep-2026: "Does Our School Run on
   Data?" es la unidad real del trimestre y nace abierta como cualquier otra
   (node_access english.classes.g9.units.u5 en true). Ese mismo dia el area
   pidio que fuera UNA unidad de once semanas, no dos (U5 + U6): la U5 cubre
   el trimestre entero —semanas 1-6 auditoria, propuesta y relato; 7-11
   ensayo a favor y en contra, reader hasta el final y debate formal— y los
   22 bloques del Scope de U5 y U6. Las dos planificadas que habia en Toddle,
   "The Double-Edged Sword" (U5) y "Future Visions" (U6), quedan en
   `superseded` mas abajo. La U106 sigue en piloto: es una unidad APARTE,
   cerrada al alumno; la conducen profesor y admin.

   Que las hace un proyecto y no una unidad con actividades:
     · hay un CLIENTE fuera del aula que recibe el producto y decide algo,
     · el producto existe fuera del colegio y no es un examen,
     · cada semana entrega una PIEZA del producto, no un tema visto,
     · dos areas comparten el producto y la nota (nivel 2),
     · la rubrica esta a la vista desde la semana 1,
     · lo que se practica de Cambridge es lo que el producto exige.
   El numero interno (106) evita chocar con la unidad planificada; lo que
   se muestra es `label`. ------------------------------------------------ */
{
  cover:{icon:'🔭', from:'#2a1f66', to:'#6e63c6'},
  n:106,
  label:'6 · pilot', pilot:true,
  title:'NIS 2040',
  weeks:6,
  bigq:'What kind of future is worth arguing for — and can you make somebody believe it?',
  situation:'Everybody has heard the warnings: the climate, the machines, the jobs that will not exist. Almost nobody is asked what they would actually build instead. Your team takes one system — how we move, how we eat, how we work, how we learn — and builds a defensible vision of it in 2040: not a fantasy, and not a catastrophe either. Something you can hold up with evidence in front of a room full of families at the end of the year.',
  audience:'The families and the school at the closing exhibition. They did not come to be taught — they came to see, and they can walk away.',
  client:'Families and school · NIS 2040 exhibition',
  reader:{title:'The Time Machine', series:'Vicens Vives · Reading & Training Step Three B1.2', term:3, inPortal:false,
          note:'The same book for the term. It fits perfectly here: it is exactly the exercise of imagining a future and defending it.'},
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
    ],

    /* La U5 y la U6 que el planner de Toddle tenia para 9.o antes de que la
       unidad de once semanas las sustituyera (14-sep-2026). NO se ofrecen (el
       portal solo lee `units`) y NO se borran: es lo que decia el planner
       hasta ese dia, por si hay que volver a mirarlo. En Toddle se sustituyen
       por la nueva U5. */
    superseded:[
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
