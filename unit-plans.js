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
     sessions:[{s:1,title:'What gives us light?',view:[
       'Enter the dark room. Only a torch. What can you see, what has disappeared?',
       'Sort the cards: things that GIVE light (sun, torch, fire) and things that only RECEIVE it.',
       'New words on the board: light, energy, sun, heat, wind, bright, dark.',
       'Each team writes its question for the shadow test: "What happens if…?"']}],
     levels:{
       'Support':{task:'Match each picture to its word: sun, torch, shadow, dark, bright. Then finish the sentence: "The sun gives us ____."',
                  help:'Word bank with pictures. The sentence is started for you.'},
       'Core':{task:'Sort six things into GIVES light / RECEIVES light, and write your test question.',
               help:'Sentence frame: "What happens if I move the ____?"'}}},
    {n:2,title:'Saying what is happening',desc:'The present continuous, so you can narrate the show while it happens: the shadow is growing, the puppet is walking.',
     give:'Five sentences in the present continuous about your puppet.',
     sessions:[{s:1,title:'It is happening now',view:[
       'One student moves the puppet; the rest narrate out loud what IS HAPPENING.',
       'Board: The shadow is growing. The puppet is walking. The light is moving.',
       'Pairs: one moves, one narrates. Then swap.',
       'Write down the five best sentences — they are the script of your show.']}],
     levels:{
       'Support':{task:'Complete five sentences with the verb given: The shadow ____ (grow). The puppet ____ (walk).',
                  help:'The verb is given in brackets and the -ing ending is on the board.'},
       'Core':{task:'Write five sentences of your own describing what happens in your show.',
               help:'Model: "The shadow is getting bigger because the torch is coming closer."'}}},
    {n:3,title:'Testing the shadow',desc:'The experiment: near and far, big and small. Lab rules — we look, we do not touch the bulb.',
     give:'Your results, written and counted.',
     sessions:[{s:1,title:'Near, far, bigger, smaller',view:[
       'Rules first: the torch is hot, we hold it by the handle.',
       'Measure the shadow with the torch near, in the middle, far. Three times each.',
       'Write every result in the table — also the ones that look wrong.',
       'What do the numbers say? Say it out loud before writing it.']}],
     levels:{
       'Support':{task:'Fill in the results table and circle: the shadow is BIGGER / SMALLER when the torch is near.',
                  help:'The table is already drawn, with the three positions.'},
       'Core':{task:'Fill in your table and write one sentence with "bigger/smaller… than" comparing two positions.',
               help:'Model: "The shadow is bigger when the torch is near."'}}},
    {n:4,title:'Reading about light',desc:'A short text about colours and shadows. Finding the answers inside it, and drawing the bar chart of your results.',
     give:'Your answers and your bar chart.',
     sessions:[{s:1,title:'Read it and chart it',view:[
       'Read the text together. Underline the three words you already know from the unit.',
       'Answer four questions: what, where, why, how.',
       'Turn the results table into a bar chart — one bar per position.',
       'Which bar is the tallest? Say why.']}],
     levels:{
       'Support':{task:'Answer the four questions choosing from two options, and colour the bar chart that is already drawn.',
                  help:'Multiple choice, and the chart has its axes ready.'},
       'Core':{task:'Answer the four questions in full sentences and draw your own bar chart.',
               help:'Reminder of what a chart needs: a title, and a label on each bar.'}}},
    {n:5,title:'The show for Nursery',desc:'Building the theatre with Art, rehearsing the narration and performing it for the little ones.',
     give:'The show, and your written explanation.',
     sessions:[{s:1,title:'Curtain up',view:[
       'Last rehearsal: narrate while you move, without reading.',
       'Nursery comes in. Two shows, so everybody performs.',
       'Afterwards, one of them asks you a question. Answer it.',
       'Back in class: write what you found out, now that you have explained it to somebody.']}],
     levels:{
       'Support':{task:'Write your explanation with the frame: "My question was… I thought… What happened was…"',
                  help:'The three openings are printed; you finish them.'},
       'Core':{task:'Write your explanation — question, guess, what happened, and why you think so.',
               help:'Use "because" at least once.'}}}
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
     sessions:[{s:1,title:'Nothing moves on its own',view:[
       'Tour of the classroom: name ten movements and say push or pull.',
       'The odd one out: a dropped pencil. Nobody pushed it — so what did?',
       'Word wall: push, pull, fall, fast, slow.',
       'Teams and the challenge: build something that goes down a ramp.']}],
     levels:{
       'Support':{task:'Sort eight pictures into PUSH and PULL. Circle the one that falls on its own.',
                  help:'Pictures with the word underneath.'},
       'Core':{task:'Sort eight actions and write two of your own, one push and one pull.',
               help:'Frame: "I push the ____." / "I pull the ____."'}}},
    {n:2,title:'It happened yesterday',desc:'The past simple, because the race will already have happened when you tell it.',
     give:'Five sentences in the past about your first test.',
     sessions:[{s:1,title:'Pushed, pulled, moved, stopped',view:[
       'Do the action, then say it in the past: I push → I pushed.',
       'Board with the four verbs of the unit and their past.',
       'Test the vehicle once, and immediately narrate it in the past.',
       'Write the five sentences.']}],
     levels:{
       'Support':{task:'Complete five sentences with the past given: I ____ (push) the car. It ____ (move).',
                  help:'The verbs are in brackets and the past forms are on the board.'},
       'Core':{task:'Write five sentences in the past about what you did and what happened.',
               help:'Model: "I pushed the car and it moved to the door."'}}},
    {n:3,title:'Building it',desc:'The vehicle, with Art. Then the first test on a smooth floor and on a rough one.',
     give:'Your vehicle and your first results.',
     sessions:[{s:1,title:'Wheels and ramps',view:[
       'Materials on the table. Rule: it has to roll, not slide.',
       'Build, test, change one thing, test again.',
       'Two surfaces: the corridor and the mat. Measure both.',
       'Which went further? Write the number, not "a lot".']}],
     levels:{
       'Support':{task:'Draw your vehicle, label three parts, and write the two distances in the table.',
                  help:'The table and the labels are ready.'},
       'Core':{task:'Draw and label your vehicle and write which surface was better, with the numbers.',
               help:'Frame: "It went ____ cm on the ____ floor."'}}},
    {n:4,title:'Reading a story of movement',desc:'A short story where something moves. Who is in it, where it happens, what happened first.',
     give:'Your answers about the story.',
     sessions:[{s:1,title:'Who, where, what happened',view:[
       'Read the story aloud, stopping to predict.',
       'Three columns: characters, place, what happened.',
       'Order four pictures from the story: first, then, after that, finally.',
       'One sentence: what would have happened if the floor had been rough?']}],
     levels:{
       'Support':{task:'Order the four pictures and match each one with first / then / after that / finally.',
                  help:'The four words are on cards.'},
       'Core':{task:'Retell the story in four sentences using the four order words.',
               help:'Write in the past.'}}},
    {n:5,title:'Writing the race',desc:'Your own account of the test: what you built, what you did, what happened on each floor and why.',
     give:'The draft in your notebook.',
     sessions:[{s:1,title:'Draft it, cross it out',view:[
       'Model on the board: one account written badly, and we fix it together.',
       'Everybody writes their draft in the notebook. Crossing out is allowed — it is expected.',
       'Read it to your partner: do they understand what you did?',
       'Mark the one thing you will change tomorrow.']}],
     levels:{
       'Support':{task:'Write your account with the frame: "I built… I pushed… It went… because…"',
                  help:'The four openings are printed.'},
       'Core':{task:'Write your account in order, in the past, explaining why one floor was better.',
               help:'Use because at least once, and two order words.'}}},
    {n:6,title:'Race day',desc:'The final version, the race in the hall and the explanation to the families.',
     give:'The finished text and the race.',
     sessions:[{s:1,title:'The hall, the ramp, the families',view:[
       'Set up the ramp. Each team announces its vehicle in one sentence.',
       'The race, measured. Every result on the big chart.',
       'Each team explains to a family why theirs went that far.',
       'Back in class: was your explanation right? Add one line.']}],
     levels:{
       'Support':{task:'Copy your corrected account neatly and read it out to a family.',
                  help:'Your text from last week with the corrections marked.'},
       'Core':{task:'Write the final version including the real result of race day.',
               help:'Add the actual distance and whether it matched what you expected.'}}}
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
     sessions:[{s:1,title:'The solar system, in order',view:[
       'The scale rope across the playground: how far Neptune really is.',
       'Read the informative text. Underline: orbit, rotate, revolve, gravity.',
       'Each team takes one planet or moon and fills in its fact file.',
       'What will your model show? Decide today.']}],
     levels:{
       'Support':{task:'Complete the fact file with the data given: name, size, position, one curious fact.',
                  help:'The text with the answers highlighted, and the fact file already laid out.'},
       'Core':{task:'Write the fact file finding the data yourself and add why your body matters.',
               help:'Reminder: use the present simple for things that are always true.'}}},
    {n:2,title:'Day, night and the seasons',desc:'Rotation and revolution. What always happens, and what is happening right now.',
     give:'Six sentences: three present simple, three present continuous.',
     sessions:[{s:1,title:'Always, or right now?',view:[
       'With a torch and a globe: one turn = one day. One lap = one year.',
       'Two columns on the board: ALWAYS (the Earth rotates) / NOW (the Earth is rotating).',
       'Everybody writes three of each about what they can see.',
       'Why is it winter here and summer there? Say it before writing it.']}],
     levels:{
       'Support':{task:'Sort six sentences into ALWAYS / NOW and complete three with the right form.',
                  help:'The verbs are given.'},
       'Core':{task:'Write six sentences of your own, three of each, about rotation and revolution.',
               help:'Model: "The Earth rotates every 24 hours." / "The Earth is rotating right now."'}}},
    {n:3,title:'The Moon and the tides',desc:'Moon phases and tides. Predicting what will happen next.',
     give:'Your predictions, written with will.',
     sessions:[{s:1,title:'What happens next?',view:[
       'The phases with a ball and a lamp: it is the same Moon, we see it differently.',
       'The tide chart: what do you predict for tomorrow?',
       'Board: will for a prediction, going to for what you can already see coming.',
       'Write three predictions and sign them. We will check them at the exhibition.']}],
     levels:{
       'Support':{task:'Complete three predictions: "Tomorrow the Moon will ____." Choose from the options.',
                  help:'Options given and the phases in order on a strip.'},
       'Core':{task:'Write three predictions of your own with will, and explain one with because.',
               help:'Frame: "I think that… will… because…"'}}},
    {n:4,title:'Going to space',desc:'Space missions, the jobs behind them and what a mission costs. Planning yours.',
     give:'Your mission plan with its budget.',
     sessions:[{s:1,title:'Who goes and what it costs',view:[
       'The jobs on a real mission: not only astronauts.',
       'Your team plans a mission: where, why, who goes, what you take.',
       'The budget, with Maths: you have a limit and you cannot pass it.',
       'Present the plan in one minute to another team, who may object.']}],
     levels:{
       'Support':{task:'Complete the mission plan choosing from the options, and add up the budget.',
                  help:'Prices given and the additions started.'},
       'Core':{task:'Write your mission plan and justify two decisions in the budget.',
               help:'Use because and so.'}}},
    {n:5,title:'The exhibition',desc:'Building the model, writing the explanation and rehearsing until it can be said without reading.',
     give:'The model, the explanation and your talk to visitors.',
     sessions:[{s:1,title:'Standing next to your model',view:[
       'Final assembly and check: does the model actually move?',
       'Rehearsal in pairs: explain it in 60 seconds without the card.',
       'The exhibition opens. Take turns: one explains, one welcomes.',
       'Note down the best question a visitor asked you.']}],
     levels:{
       'Support':{task:'Write your explanation with the frame: "This model shows… It works like this… That is why…"',
                  help:'The three openings printed, plus your word bank.'},
       'Core':{task:'Write your explanation in your own words, with linking words and one prediction.',
               help:'It has to work read aloud to a visitor: read it out before handing it in.'}}}
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
     sessions:[{s:1,title:'How did they manage it?',view:[
       'Read the true story. Stop at the moment they nearly gave up.',
       'Three columns: what they wanted, what stopped them, what they did.',
       'New words: goal, effort, challenge, progress.',
       'Which habit are you going to track this week? Choose it now.']}],
     levels:{
       'Support':{task:'Answer four questions about the story choosing from two options, and copy the main idea.',
                  help:'The text with the key sentences highlighted.'},
       'Core':{task:'Write the main idea in your own words and three details that support it.',
               help:'Frame: "The main idea is… I know because…"'}}},
    {n:2,title:'This year I learned',desc:'Looking back at the year and writing it down properly, in the past tense.',
     give:'A 100-word reflection paragraph.',
     sessions:[{s:1,title:'March to now',view:[
       'Your March notebook next to today’s. What has changed?',
       'Past simple: learned, practised, started, managed.',
       'Write the paragraph. One concrete example is worth more than three adjectives.',
       'Read one out loud, anonymously. What made it good?']}],
     levels:{
       'Support':{task:'Complete the paragraph: "This year I learned ____. For example, ____. It was hard because ____."',
                  help:'Three openings and a bank of past verbs.'},
       'Core':{task:'Write your 100-word paragraph with at least one specific example.',
               help:'Past simple throughout, and linking words.'}}},
    {n:3,title:'What the data says',desc:'A week tracking one habit. Now the numbers, not the feeling.',
     give:'Your week of data, and what it shows.',
     sessions:[{s:1,title:'Seven days of evidence',view:[
       'Everybody brings their week. Nobody hides the bad days.',
       'With Maths: total, best day, worst day.',
       'What surprised you? Say it before writing it.',
       'What would you change if next week had to be better?']}],
     levels:{
       'Support':{task:'Complete your table of seven days and circle the best and worst day.',
                  help:'Table drawn, with the days of the week.'},
       'Core':{task:'Complete your table, work out the total and write two things the data shows.',
               help:'Frame: "The data shows that… because…"'}}},
    {n:4,title:'Next year I will',desc:'Setting the goal. Will and going to, and saying no to what gets in the way.',
     give:'Your goal, written twice: with will and with going to.',
     sessions:[{s:1,title:'A goal you can keep',view:[
       'Two goals on the board, one impossible and one real. Which is which, and why?',
       'Rule: if you cannot say when and how often, it is not a goal.',
       'Write yours with will, then with going to. They are not the same.',
       'Swap with a partner: is theirs keepable?']}],
     levels:{
       'Support':{task:'Complete: "Next year I will ____. I am going to ____ every ____."',
                  help:'The frames and a list of possible goals.'},
       'Core':{task:'Write your goal in both forms and explain why you chose it, with because.',
               help:'It must say when and how often.'}}},
    {n:5,title:'Why it matters',desc:'Opinion writing: why your goal is important, and what you will need for it.',
     give:'Your opinion paragraph and your plan of resources.',
     sessions:[{s:1,title:'Convince yourself first',view:[
       'A goal you cannot justify does not survive February.',
       'Write why it matters, using but, so and because.',
       'With Maths: what does it cost — time, money, help from somebody?',
       'Rehearse the first two sentences out loud.']}],
     levels:{
       'Support':{task:'Complete the opinion paragraph with the three conjunctions given.',
                  help:'but / so / because are printed where they go.'},
       'Core':{task:'Write why your goal matters and what you will need, using the three conjunctions.',
               help:'Two paragraphs: why, and what it needs.'}}},
    {n:6,title:'Saying it to your family',desc:'The final text and the two-to-three-minute presentation at the meeting.',
     give:'The presentation and the finished plan.',
     sessions:[{s:1,title:'The meeting',view:[
       'Last rehearsal in pairs, timed.',
       'Families come in. Each student presents their goal.',
       'The family asks one question. Answer it.',
       'The plan stays with them: they are the ones who will remind you.']}],
     levels:{
       'Support':{task:'Copy your final plan neatly and practise reading the first two sentences without looking.',
                  help:'Your text with the corrections marked.'},
       'Core':{task:'Write the final version of your plan, ready to hand to your family.',
               help:'It has to be understood by somebody who was not in class.'}}}
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
        grammar:['comparatives and superlatives','past simple','adverbs of manner','because / so'],
        extra:['force','friction','gravity','push','pull','distance','measure','decimal','average','fair test']},
  areas:[{area:'science', level:2},{area:'math', level:2}],
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
       AD:'I say what my test does NOT prove.'}}
  ],
  sequence:[
    {n:1,title:'What is a force?',desc:'Pushes, pulls and the forces you cannot see. Choosing what you will investigate.',
     give:'Your research question and your prediction.',
     sessions:[{s:1,title:'The forces in this room',view:[
       'Ten movements around the room: name the force in each one.',
       'The invisible ones: friction and gravity. Demonstration with the ramp.',
       'Each team writes its question: "Does ____ go further on ____ than on ____?"',
       'Prediction signed and dated. We will check it in week 4.']}],
     levels:{
       'Support':{task:'Choose your question from three options and write your prediction with the frame given.',
                  help:'Three questions ready and the frame "I predict that… because…"'},
       'Core':{task:'Write your own research question and your prediction, justified.',
               help:'The question must name one thing that changes and one that stays the same.'}}},
    {n:2,title:'Designing a fair test',desc:'Friction and gravity. One thing changes, everything else stays the same.',
     give:'Your test design, with what stays fixed.',
     sessions:[{s:1,title:'What makes a test fair',view:[
       'An unfair test done on purpose. Spot the four mistakes.',
       'Two columns: what I change / what I keep the same.',
       'Design yours and pass it to another team to look for holes.',
       'Correct it with what they found.']}],
     levels:{
       'Support':{task:'Complete the design table: what changes, what stays the same, what I measure.',
                  help:'Table with the three columns and examples in the first row.'},
       'Core':{task:'Write your design and list three things you will keep the same, and why each one matters.',
               help:'If you cannot say why it matters, it probably does not.'}}},
    {n:3,title:'Measuring properly',desc:'Running the test and recording distances with decimals. Comparing and ordering the results.',
     give:'Your table of measurements, complete.',
     sessions:[{s:1,title:'Three attempts each, no cheating',view:[
       'Three attempts per surface. All of them go in the table, including the bad ones.',
       'Decimals with Maths: reading, writing and ordering to two places.',
       'Order the results from smallest to largest.',
       'Is there a reading that does not fit? Do not delete it — mark it.']}],
     levels:{
       'Support':{task:'Complete the table with your six measurements and circle the longest.',
                  help:'Table ready, with the units already written in.'},
       'Core':{task:'Complete your table, order the six results and work out the average of each surface.',
               help:'Two decimal places throughout, and never without the unit.'}}},
    {n:4,title:'What the numbers say',desc:'Adding and subtracting your decimals, finding the difference, saying which went furthest — and whether your prediction was right.',
     give:'Your comparison, written in sentences.',
     sessions:[{s:1,title:'The difference, in numbers',view:[
       'Subtract: how much further exactly? Not "a lot".',
       'Comparatives and superlatives on the board: further, furthest, faster, fastest.',
       'Open the prediction from week 1. Were you right?',
       'Being wrong is a result too — as long as you explain it.']}],
     levels:{
       'Support':{task:'Complete four sentences with the comparative given and your numbers.',
                  help:'"The car went ____ on the ____ floor than on the ____ floor."'},
       'Core':{task:'Write four sentences comparing your results, with the exact difference, and say whether your prediction held.',
               help:'Use because at least once.'}}},
    {n:5,title:'The write-up for Grade 5',desc:'The full report: question, method, results, conclusion — written so another class can repeat it.',
     give:'The finished investigation report.',
     sessions:[{s:1,title:'Would they get the same?',view:[
       'Swap reports with another team and try to follow theirs, literally.',
       'Mark every point where you had to guess something.',
       'Correct yours with what they could not follow.',
       'Hand it in: Grade 5 gets it next month.']}],
     levels:{
       'Support':{task:'Write your report using the four headings given: Question, What I did, Results, What I found.',
                  help:'The four headings printed, with a starter line each.'},
       'Core':{task:'Write your report so another class could repeat it exactly, with your table included.',
               help:'Test: give it to somebody who was not there and watch where they stop.'}}}
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
        grammar:['present simple for processes','sequencers: first, then, next, finally','quantifiers: some, many, a lot of','comparatives'],
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
       AD:'I ask the reader to do one specific thing, and it is doable.'}}
  ],
  sequence:[
    {n:1,title:'What we have',desc:'Natural resources: what runs out and what does not. Starting Incredible Earth.',
     give:'Your list of resources, sorted.',
     sessions:[{s:1,title:'Runs out or not?',view:[
       'Twenty cards of resources. Sort: renewable / non-renewable / not sure.',
       'The "not sure" pile is the interesting one. Why is it hard?',
       'Start Incredible Earth: read the first chapter together.',
       'Choose the resource your guide will be about.']}],
     levels:{
       'Support':{task:'Sort ten resources into the two columns and write two examples of each.',
                  help:'Cards with pictures and the two columns headed.'},
       'Core':{task:'Sort them and explain why two of them were hard to classify.',
               help:'Frame: "____ is difficult because…"'}}},
    {n:2,title:'The water cycle',desc:'Evaporation, condensation, precipitation. Explaining a process in order.',
     give:'The cycle explained in your own words.',
     sessions:[{s:1,title:'Round and round',view:[
       'The cycle in a bag on the window: watch it for a week.',
       'The three words, with the action: evaporation, condensation, precipitation.',
       'Sequencers: first, then, next, finally.',
       'Explain it to your partner without looking at the diagram.']}],
     levels:{
       'Support':{task:'Label the diagram and complete the explanation with the four sequencers.',
                  help:'Diagram to label, sequencers given in a box.'},
       'Core':{task:'Explain the cycle in your own words, in order, without a diagram.',
               help:'Present simple: water evaporates, vapour rises, it condenses.'}}},
    {n:3,title:'Climate and weather',desc:'The difference between the two, and why it matters. Starting your own readings.',
     give:'Your first week of readings.',
     sessions:[{s:1,title:'Today is not the climate',view:[
       'Weather = today. Climate = many years. The classic confusion.',
       'Set up the instruments: thermometer and rain gauge.',
       'Rota: who reads, when, and where it gets written down.',
       'First reading, all together, so everybody measures the same way.']}],
     levels:{
       'Support':{task:'Complete the weather log for five days with the readings taken.',
                  help:'Log with the days and the units printed.'},
       'Core':{task:'Complete your log and write one sentence comparing two days.',
               help:'Use a comparative and the real figures.'}}},
    {n:4,title:'Measuring it',desc:'Instruments and what they measure. Turning your readings into fractions and percentages.',
     give:'Your data, as fractions and percentages.',
     sessions:[{s:1,title:'From the log to the number',view:[
       'Second week complete. Everybody’s data on the board.',
       'With Maths: how many days out of ten did it rain? As a fraction, then as a percentage.',
       'The trap: a very wet day does not make a wet week.',
       'Which figure is going in your guide? Only one — choose the one that says most.']}],
     levels:{
       'Support':{task:'Write your data as a fraction and turn two of them into percentages.',
                  help:'Worked example and the conversions started.'},
       'Core':{task:'Turn your data into percentages and choose the figure for your guide, saying why.',
               help:'Justify why that figure and not another.'}}},
    {n:5,title:'Writing the guide',desc:'Drafting it for somebody who has not read the book or seen your data.',
     give:'The draft in your notebook.',
     sessions:[{s:1,title:'Thirty seconds',view:[
       'Two real corridor posters: which one gets read and why?',
       'Rule: the main idea in the first line, not at the end.',
       'Draft it in the notebook. Cross out everything that is not needed.',
       'Time a partner reading it. Over thirty seconds, cut more.']}],
     levels:{
       'Support':{task:'Write your guide with the four headings given, one sentence each.',
                  help:'Headings: Where it comes from / How it works / What we measured / What you can do.'},
       'Core':{task:'Write your guide so it reads in thirty seconds, with your figure and one thing to do.',
               help:'If it does not fit on one side, it is too long.'}}},
    {n:6,title:'On the wall',desc:'The final guide, checked and put up where the school can read it.',
     give:'The published guide.',
     sessions:[{s:1,title:'Up it goes',view:[
       'Final proofread in pairs: spelling, figures, units.',
       'Put them up in the corridor.',
       'Watch: do people stop? For how long?',
       'One line in the notebook: what would you change now that you have seen people read it?']}],
     levels:{
       'Support':{task:'Copy your corrected guide neatly onto the final card.',
                  help:'Your draft with the corrections marked.'},
       'Core':{task:'Produce the final guide and write what you would change after seeing it read.',
               help:'Be specific: what exactly, and why.'}}}
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
     sessions:[{s:1,title:'A map without a key is a drawing',view:[
       'Two maps of the same place, one usable and one not. What is missing?',
       'The four elements: title, key, scale, orientation.',
       'Start Exploring Our World: the first chapter, and the words to keep.',
       'Draw your first map of the school’s surroundings.']}],
     levels:{
       'Support':{task:'Complete the map that is started: add key, scale and title.',
                  help:'Base map printed, symbols given.'},
       'Core':{task:'Draw your own map of the area with the four elements.',
               help:'Choose the symbols yourself and justify two of them.'}}},
    {n:2,title:'The air above us',desc:'The atmosphere: its layers and what changes it. Different viewpoints on the same problem.',
     give:'Two opposing viewpoints, written down.',
     sessions:[{s:1,title:'Two people, one problem',view:[
       'Read two texts that disagree about the same issue.',
       'What does each one want? What does each one leave out?',
       'Board: however, although, on the other hand.',
       'Write both viewpoints fairly — including the one you do not hold.']}],
     levels:{
       'Support':{task:'Complete the two viewpoints with the sentences given, and join them with however.',
                  help:'Sentences to sort into two columns.'},
       'Core':{task:'Write both viewpoints in your own words and say which convinces you, and why.',
               help:'Use however or although at least once.'}}},
    {n:3,title:'The water around us',desc:'The hydrosphere, rivers and lakes. Types of map and what each is good for.',
     give:'Your data map.',
     sessions:[{s:1,title:'Putting the data on the map',view:[
       'Three types of map for the same area: which one for which question?',
       'Where does our water come from and where does it go? Trace it.',
       'Put the data you already have onto the map.',
       'Look at it: does the problem show up on its own?']}],
     levels:{
       'Support':{task:'Place the five data points on the map using the symbols given.',
                  help:'Map with the positions marked and the data listed.'},
       'Core':{task:'Build your data map choosing how to represent each figure.',
               help:'The reader must understand it without you explaining.'}}},
    {n:4,title:'Where the evidence comes from',desc:'Primary and secondary sources. Turning what you found into percentages.',
     give:'Your sources, classified, and your figures.',
     sessions:[{s:1,title:'Who says so, and how do they know?',view:[
       'Sort your sources: measured by us / told by somebody else.',
       'Two sources that disagree. Which one do you trust for this?',
       'With Maths: fraction to decimal to percentage.',
       'Choose the two figures that will go in the report.']}],
     levels:{
       'Support':{task:'Sort six sources into primary and secondary and convert two fractions to percentages.',
                  help:'Sources listed and the conversion worked once.'},
       'Core':{task:'Classify your sources, justify one choice, and convert your data to percentages.',
               help:'Say what each source lets you claim — and what it does not.'}}},
    {n:5,title:'Taking a position',desc:'The thesis statement and the report. Ecosystems and what depends on this.',
     give:'The finished report.',
     sessions:[{s:1,title:'Say it in the first line',view:[
       'Three openings on the board: which one makes you keep reading?',
       'Your thesis statement in one sentence. Rewrite it three times.',
       'Draft the report in your notebook, with your map beside it.',
       'Read the first line to a partner: do they know what you think?']}],
     levels:{
       'Support':{task:'Write your report with the frame: "I think that… The data shows… However… That is why…"',
                  help:'The four openings printed, plus your figures.'},
       'Core':{task:'Write your report with your own thesis, your data and one opposing viewpoint.',
               help:'It has to be readable by somebody who can act on it.'}}}
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
     sessions:[{s:1,title:'Who pays for the air?',view:[
       'The air is free. The water is not. Where exactly is the line?',
       'Free goods and economic goods, with examples from the school.',
       'Each team picks a resource that the school actually uses.',
       'Why yours? Say it in one sentence.']}],
     levels:{
       'Support':{task:'Sort eight things into free goods and economic goods and choose your resource.',
                  help:'Cards and the two columns headed.'},
       'Core':{task:'Sort them, explain one difficult case and justify your choice of resource.',
               help:'Frame: "We chose ____ because the school…"'}}},
    {n:2,title:'How persuasion works',desc:'Analysing persuasive texts: what makes one convincing and another one annoying.',
     give:'Three techniques you are going to use.',
     sessions:[{s:1,title:'Convincing or annoying?',view:[
       'Three real campaigns. Which works, which irritates, and why.',
       'The techniques: a figure that surprises, a direct ask, a consequence.',
       'What NOT to do: blaming the reader.',
       'Choose the three techniques your campaign will use.']}],
     levels:{
       'Support':{task:'Match each campaign with its technique and copy the sentence that convinces you most.',
                  help:'Techniques named and campaigns printed.'},
       'Core':{task:'Analyse the three campaigns and explain why one fails.',
               help:'Be specific: which sentence and why.'}}},
    {n:3,title:'What it really costs',desc:'Measuring the real use of your resource in the school. Data analysis.',
     give:'Your data and what it shows.',
     sessions:[{s:1,title:'Counting what nobody counts',view:[
       'Design the measurement: where, when, how often, who.',
       'Take the data around the school. Two days.',
       'With Maths: total, average, and the surprising figure.',
       'Which figure would make somebody stop? That is the one for the campaign.']}],
     levels:{
       'Support':{task:'Complete the measurement table and circle the most surprising figure.',
                  help:'Table designed and the round to do it in.'},
       'Core':{task:'Take your data, work out total and average, and choose your campaign figure with a reason.',
               help:'The figure has to be true and it has to be yours.'}}},
    {n:4,title:'The savings plan',desc:'Turning the data into a plan with numbers. What is likely to work and what is not.',
     give:'Your savings plan.',
     sessions:[{s:1,title:'From the number to the plan',view:[
       'If we changed this one thing, how much would we save? Work it out.',
       'Probability with Maths: what is likely to happen if nothing changes?',
       'Rule: the plan must be doable by the people in this school.',
       'Test it on another team: would they do it?']}],
     levels:{
       'Support':{task:'Complete the savings plan with the three steps given and work out the saving.',
                  help:'Steps and the calculation started.'},
       'Core':{task:'Write your plan with its saving worked out and say what is likely if nothing changes.',
               help:'Use the first conditional.'}}},
    {n:5,title:'Writing the campaign',desc:'Drafting the persuasive text in your notebook. Feedback and rewriting.',
     give:'The final text.',
          sessions:[{s:1,title:'Draft, feedback, rewrite',view:[
       'Draft in the notebook, with the three techniques you chose.',
       'Read it to a team that is NOT convinced. Let them object.',
       'Rewrite answering the objection you got.',
       'Rehearse the first fifteen seconds: that is where they decide to stay.']}],
     levels:{
       'Support':{task:'Write your campaign with the frame: "Did you know that…? That is why… If we… we will…"',
                  help:'The three openings and your figure.'},
       'Core':{task:'Write your campaign with your three techniques and an answer to one objection.',
               help:'Should, the first conditional, and one direct ask.'}}},
    {n:6,title:'Convincing them',desc:'The speech, in front of the school.',
     give:'The campaign and the speech.',
     sessions:[{s:1,title:'Three minutes in the hall',view:[
       'Timed rehearsal. Over three minutes, cut.',
       'The showing. Each team presents its campaign.',
       'Count: how many people stayed to the end?',
       'One line in the notebook: what worked and what did not.']}],
     levels:{
       'Support':{task:'Copy your final campaign and rehearse the first fifteen seconds without reading.',
                  help:'Your text with the corrections marked.'},
       'Core':{task:'Produce the final campaign and write what you would change after presenting it.',
               help:'Be specific about what you saw in the hall.'}}}
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
     sessions:[
       {s:1,title:'The brief from the leadership team',view:[
         'A member of the leadership team explains, for ten minutes, what policy they have to write and what data they do not have.',
         'Questions from the floor. Write down what they actually need — not what you assume.',
         'The rubric goes up on the wall today, not in week 5.',
         'Teams form. Each one claims one question of the audit so nothing is measured twice.']},
       {s:2,title:'What can actually be measured',view:[
         'Difference between a good question and an unmeasurable one. Three examples of each.',
         'Your team turns its question into something with a number at the end.',
         'Plan: what, where, when, who, and with what instrument.',
         'Another team tries to break your plan. Fix what they find.']}],
     levels:{
       'A2':{task:'Complete the audit plan with the frame given and write your question as: "How much/many ____ does NIS use?"',
             help:'Plan template with the five boxes and a word bank: measure, count, energy, device, screen time.'},
       'B1':{task:'Write your audit question and your plan of measurement in five steps.',
             help:'Model plan for a different question, to follow.'},
       'B2':{task:'Write the question, the plan, and what you will NOT be able to measure with it.',
             help:'Prompt: every measurement leaves something out — name yours.'},
       'C1':{task:'Write the question and the plan, and justify why this measurement answers what the leadership team asked for.',
             help:'Their brief is on the wall: quote it.'}}},
    {n:2,title:'What is already known',desc:'Reading the research on the energy and water cost of AI, and starting The Time Machine. Telling a solid source from a loud one.',
     give:'Three sources, classified, with what each one lets you claim.',
     sessions:[
       {s:1,title:'What the research says about AI and energy',view:[
         'Read two sources with opposite conclusions about the cost of AI.',
         'For each one: who wrote it, who paid for it, what it measures.',
         'A solid source and a loud one. Which is which, and how do you tell?',
         'Each team files three sources with what each one lets it claim.']},
       {s:2,title:'The Time Machine, chapter one',view:[
         'Start the book. Wells imagining a future from the technology of his day.',
         'What is he right about and what is he wrong about — and why does that matter to you?',
         'Vocabulary: the words you will need in the proposal.',
         'Ten minutes of silent reading. This is the term’s book.']}],
     levels:{
       'A2':{task:'Classify three sources into reliable / not sure, and copy one fact from each with its source.',
             help:'Sources pre-selected and shortened, with a table to fill.'},
       'B1':{task:'Summarise what each source claims and say which you trust most, with a reason.',
             help:'Frame: "According to ____, … I trust this because…"'},
       'B2':{task:'Compare two sources that disagree and explain where the difference comes from.',
             help:'Look at what each one measures, not just what it concludes.'},
       'C1':{task:'Evaluate three sources for reliability and bias, and state what each does NOT allow you to claim.',
             help:'A source that proves everything usually proves nothing.'}}},
    {n:3,title:'Measuring this building',desc:'The audit itself, with Science and ICT: screen minutes, devices, energy, what gets thrown away. Real numbers from NIS.',
     give:'Your dataset and the method you followed.',
     sessions:[
       {s:1,title:'Measuring this building',view:[
         'Out into the school with Science and ICT: devices, screen minutes, consumption, what gets thrown away.',
         'Everybody records with the same protocol, or the data cannot be pooled.',
         'The awkward finding: something will come out higher than expected. Do not smooth it.',
         'All the data onto the shared sheet before leaving.']},
       {s:2,title:'Is this number trustworthy?',view:[
         'Look at the pooled data. Which readings look wrong?',
         'Rule: an outlier is investigated, not deleted.',
         'Averages and totals with Maths. Per student, per classroom, per week.',
         'Which single figure would make the leadership team stop? Choose it.']}],
     levels:{
       'A2':{task:'Complete the measurement table and write two sentences with your figures.',
             help:'Table with the columns ready and the units filled in.'},
       'B1':{task:'Present your data in a table and describe what it shows in a short paragraph.',
             help:'Useful language: on average, in total, per student.'},
       'B2':{task:'Present your data and explain how you obtained it, so it could be repeated.',
             help:'The passive is useful here: "the readings were taken…"'},
       'C1':{task:'Present the data, the method and the limitations of your measurement.',
             help:'Say where a better instrument would be needed and why.'}}},
    {n:4,title:'From data to a recommendation',desc:'Turning numbers into something somebody can decide on. Drafting the proposal in the notebook.',
     give:'The draft of the proposal, handwritten.',
     sessions:[
       {s:1,title:'From data to a decision',view:[
         'A number is not a recommendation. Turning one into the other.',
         'Proposal register on the board: I would recommend, it is advisable to, a first step would be.',
         'Order your recommendations: the cheap one first, the ambitious one last.',
         'Draft in the notebook. Crossings-out included — this is where the thinking shows.']},
       {s:2,title:'The objection they will raise',view:[
         'Role-play: a teacher plays the leadership team and objects to each recommendation.',
         'Note the objection you could not answer.',
         'Concession language: although, despite, even though.',
         'Rewrite the weakest paragraph answering that objection.']}],
     levels:{
       'A2':{task:'Write your proposal with the frame: "We measured… We found… We recommend… because…"',
             help:'Four openings printed and your figures beside them.'},
       'B1':{task:'Write your proposal with two clear recommendations, each justified with your data.',
             help:'Model proposal on another topic, to follow the shape.'},
       'B2':{task:'Write your proposal in proposal register with recommendations, evidence and one counterargument.',
             help:'Connectors: nevertheless, moreover, in contrast.'},
       'C1':{task:'Write the proposal anticipating the objection and answering it before it is raised.',
             help:'Hedging: may, might, tends to — claim only what your data supports.'}}},
    {n:5,title:'Facing the leadership team',desc:'Final version, and the defence in front of the people who will write the policy.',
     give:'The proposal handed in and the defence.',
     sessions:[
       {s:1,title:'Final version',view:[
         'Feedback against the rubric, criterion by criterion.',
         'Rewrite. The final version is not the draft typed up.',
         'Check every figure: it has to match your table exactly.',
         'Hand in. Printed for the panel, uploaded to the portal.']},
       {s:2,title:'Facing the leadership team',view:[
         'Six minutes per team, then questions.',
         'From notes, not from a script — they will interrupt.',
         'They ask something you did not prepare. Answer it, or say honestly that you do not know.',
         'Afterwards: which recommendation did they take seriously, and why?']}],
     levels:{
       'A2':{task:'Prepare six cards with the key sentences of your defence and rehearse aloud.',
             help:'Structure of the six cards given.'},
       'B1':{task:'Prepare your defence in notes and rehearse answering three likely questions.',
             help:'The three most likely questions, listed.'},
       'B2':{task:'Prepare the defence and the responses, including one question you would rather not be asked.',
             help:'Prepare that one especially.'},
       'C1':{task:'Prepare the defence to hold a position under pressure, and to concede if the objection is good.',
             help:'Conceding well is a mark of strength, not weakness — but say why you concede.'}}}
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
     sessions:[
       {s:1,title:'Choosing your system',view:[
         'Four systems on the board: how we move, how we eat, how we work, how we learn.',
         'Each team takes one and finds five facts about it TODAY, in Lima, with numbers.',
         'A fact is not an opinion. Filter what you bring.',
         'What of this will not exist in 2040? First guess.']}],
     levels:{
       'A2':{task:'Write five facts about your system today, with a number in each one.',
             help:'Table with five rows and where to look.'},
       'B1':{task:'Write five facts with their source and one thing that surprised you.',
             help:'Frame: "According to ____, today…"'},
       'B2':{task:'Present the state of your system today and identify the tension inside it.',
             help:'A system under tension is one that has to change.'},
       'C1':{task:'Characterise your system today and explain which forces are pulling it in each direction.',
             help:'Name at least two forces in conflict.'}}},
    {n:2,title:'Reading the future',desc:'The Time Machine and today’s projections side by side. What a trend is and where it breaks.',
     give:'Three trends and the evidence behind each one.',
     sessions:[
       {s:1,title:'The Time Machine and the projections',view:[
         'Wells travels to the year 802,701. What does he get right and what does he invent?',
         'A trend is a line that continues. Where does a line break?',
         'Three real projections about your system. What does each assume?',
         'Choose your three trends and write down the evidence behind each.']}],
     levels:{
       'A2':{task:'Complete three trends with the frame: "More and more people are ____."',
             help:'Frames and a bank of trends.'},
       'B1':{task:'Describe three trends of your system with the evidence for each.',
             help:'Useful: is increasing, is likely to, by 2040.'},
       'B2':{task:'Describe three trends and say which is most likely to break, and why.',
             help:'What would have to happen for the line to bend?'},
       'C1':{task:'Analyse three trends distinguishing what is likely from what is merely possible.',
             help:'Say which of the three you would bet on, and what it would cost you to be wrong.'}}},
    {n:3,title:'Building the vision',desc:'From trend to scenario. What has to be true for your 2040 to happen, and what it would cost.',
     give:'Your scenario with its conditions and its price.',
     sessions:[
       {s:1,title:'From trend to scenario',view:[
         'Your 2040 in one paragraph. Not a fantasy and not a catastrophe.',
         'What has to be true for it to happen? List the conditions.',
         'And what does it cost, and who pays? A future with no cost is not a future.',
         'Second conditional on the board: if we changed…, we would…']}],
     levels:{
       'A2':{task:'Write your 2040 in five sentences using will and going to.',
             help:'Frames with the future forms.'},
       'B1':{task:'Describe your scenario and the three conditions it needs.',
             help:'Frame: "This will only happen if…"'},
       'B2':{task:'Describe the scenario, its conditions and its cost, saying who pays.',
             help:'Second conditional and future perfect: "by 2040 we will have…"'},
       'C1':{task:'Build the scenario naming the trade-off and defending that it is worth paying.',
             help:'The strongest visions are the ones that admit what they sacrifice.'}}},
    {n:4,title:'Making it visible',desc:'With Creative Arts: the piece that carries the vision at the exhibition — a model, an image, an object.',
     give:'The visual, and the draft of the argument in your notebook.',
     sessions:[
       {s:1,title:'Making it visible',view:[
         'With Creative Arts: what object carries your vision at a stand?',
         'It is not decoration — it has to say something the text does not.',
         'Build it, and write the argument in your notebook beside it.',
         'Test: show it to somebody without speaking. What do they understand?']}],
     levels:{
       'A2':{task:'Write the text of your stand in six sentences and label your visual.',
             help:'Structure of the six sentences given.'},
       'B1':{task:'Write the argument of your stand with the vision, the evidence and what it costs.',
             help:'It has to be read in two minutes.'},
       'B2':{task:'Write the argument so that it works with your visual, not repeating it.',
             help:'If the text says the same as the object, one of the two is unnecessary.'},
       'C1':{task:'Write the argument and design how the visual carries the part that words do worst.',
             help:'What is easier to see than to explain?'}}},
    {n:5,title:'Sharpening the argument',desc:'Feedback against the rubric, rewriting, and rehearsing what to say when somebody disagrees.',
     give:'The final text.',
     sessions:[
       {s:1,title:'Sharpening it',view:[
         'Feedback against the rubric, criterion by criterion.',
         'The objection round: another team attacks your future. Take notes.',
         'Rewrite answering the best objection you received.',
         'Rehearse the first fifteen seconds. That is where a visitor decides to stay.']}],
     levels:{
       'A2':{task:'Correct your text with the marks received and rehearse the opening aloud.',
             help:'Your text with the corrections marked.'},
       'B1':{task:'Rewrite your text answering one objection you received.',
             help:'However, although, on the other hand.'},
       'B2':{task:'Rewrite integrating the objection into your argument, not as an appendix.',
             help:'A well-answered objection makes the argument stronger.'},
       'C1':{task:'Rewrite so that the argument survives the hardest objection you were given.',
             help:'If it does not survive, change the argument — not the objection.'}}},
    {n:6,title:'The exhibition',desc:'NIS 2040 opens. Families walk through and you defend your future to whoever stops.',
     give:'The stand, the piece and your defence.',
     sessions:[
       {s:1,title:'NIS 2040 opens',view:[
         'Set up the stands. Each team decides who welcomes and who explains.',
         'Families walk through. Nobody is obliged to stop.',
         'Defend your future to whoever does stop, including the sceptic.',
         'Count: how many stopped, and what did they ask most often?']}],
     levels:{
       'A2':{task:'Present your stand using your six sentences, without reading.',
             help:'Cards with the key words only.'},
       'B1':{task:'Present your vision and answer questions from visitors.',
             help:'Three likely questions, prepared.'},
       'B2':{task:'Present, defend and adapt the explanation to who is in front of you.',
             help:'It is not explained the same to a child as to an adult.'},
       'C1':{task:'Hold the argument with a visitor who disagrees, without losing the thread or the courtesy.',
             help:'The aim is not to win: it is that they leave thinking.'}}}
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
