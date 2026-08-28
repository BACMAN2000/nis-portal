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
  cover:{icon:'🍎', from:'#1f5e3a', to:'#63b06a'},
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
}
    ]
  },

  g3: {
    label: 'Grade 3',
    units: [
{
  cover:{icon:'🦁', from:'#1d4d3b', to:'#4e9d6b'},
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
}
    ]
  },

  /* 4.o: el planner tiene la situacion y el producto, pero los criterios y la
     secuencia estan sin rellenar en Toddle. Se muestra lo que hay. */
  g4: {
    label: 'Grade 4',
    units: [
{
  cover:{icon:'🏜', from:'#8a5a1e', to:'#d9a441'},
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
}
    ]
  },

  g5: {
    label: 'Grade 5',
    units: [
{
  cover:{icon:'📖', from:'#23407a', to:'#5b8ed6'},
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
    ]
  },

  g6: {
    label: 'Grade 6',
    units: [

/* ------------------------------------------------- 6.o U4 */
{
  cover:{icon:'🏅', from:'#7a5310', to:'#d4a03a'},
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
  cover:{icon:'📱', from:'#125b6b', to:'#3fa8c4'},
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
  cover:{icon:'⚖', from:'#3f4756', to:'#8b93a6'},
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
  cover:{icon:'🌐', from:'#12556b', to:'#3f9fc4'},
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
  cover:{icon:'📕', from:'#5c2230', to:'#a5566a'},
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
  cover:{icon:'🔍', from:'#2a1f4e', to:'#6a5ba8'},
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
  cover:{icon:'🔬', from:'#123a5c', to:'#3f86bb'},
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
  cover:{icon:'📲', from:'#3b1f5c', to:'#8158b8'},
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
  cover:{icon:'🧠', from:'#14524b', to:'#3f9c8f'},
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
  cover:{icon:'⚡', from:'#6b3a12', to:'#c9772f'},
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
  cover:{icon:'🚀', from:'#1e2b6b', to:'#5566c4'},
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
  cover:{icon:'🎙', from:'#6b1d2a', to:'#bf5162'},
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
  cover:{icon:'🌍', from:'#0f4f4a', to:'#3a9c92'},
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
