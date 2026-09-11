/* Rubricas de produccion escrita — AD / A / B / C.
 *
 * Por que existe este archivo y no vive dentro de unit-plans.js: unit-plans.js
 * es copia literal del planner de Toddle y no se inventa nada ahi. La rubrica
 * de un writing SI es nuestra: sale de los criterios de la unidad —los mismos
 * que el alumno vio el dia uno en unit.html— pero especializada para el texto
 * escrito. Cada criterio declara en `from` de que criterio del planner nace, y
 * la rubrica declara en `fuera` que criterios de la unidad NO se corrigen aqui
 * porque no son de escritura (el podcast, la exposicion oral).
 *
 * Forma:
 *   WRITING_RUBRICS[grade][unit][kind] = {
 *     task, spec, range:[lo,hi], nota:'del planner …',
 *     fuera:'…',                       criterios de la unidad que no aplican
 *     criteria:[{ k, n, text, from, auto, levels:{AD,A,B,C} }]
 *   }
 *   k     clave con que se guarda en unit_submissions.criteria ('w1', 'w2', …).
 *         Va prefijada para no chocar con el 1/2/3 de Productos de unidad,
 *         que son las tres competencias del area (Speaking / Reading / Writing).
 *   from  numero del criterio de la unidad en unit-plans.js.
 *   auto  que puede medir la maquina en ese criterio; null = solo el docente.
 *
 * La nota: el colegio califica AD·A·B·C (escala MINEDU). Cada criterio se
 * convierte al centro de su tramo vigesimal (AD 18-20, A 14-17, B 11-13,
 * C 0-10), se promedian los criterios y la nota resultante vuelve a letra con
 * la misma tabla. Asi "todo B" da 12, que es B — sumar puntos no lo daba.
 */
window.WRITING_RUBRICS = (function(){

  const NIVELES   = ['AD','A','B','C'];      // de mayor a menor, como en todo el portal
  const VIGESIMAL = { AD:19, A:16, B:12, C:8 };
  const SIGNIFICA = { AD:'outstanding achievement', A:'expected achievement', B:'in progress', C:'starting out' };

  const DATOS = {

  /* ============================================================ 2.o ==== */
  g2: {

    /* ---- U4 · From Ingredients to Recipes ---------------------------
       El planner da los criterios sin niveles, asi que los descriptores se
       redactan aqui a partir de ellos y de la lista de comprobacion del
       propio entregable. */
    4: {
      report: {
        task:'Your recipe', spec:'Ingredients + utensils + steps',
        nota:'Criterios 6, 5 y 1 del planner.',
        fuera:'Criteria 2, 3 and 4 — questions and listening comprehension, not the written text.',
        criteria:[
          { k:'w1', n:1, from:6, auto:null,
            text:'The three parts — ingredients, utensils and steps.',
            levels:{
              AD:'My recipe also says how many people it feeds, or what to be careful with.',
              A:'My recipe has its ingredients, its utensils and all of its steps.',
              B:'I write two of the three parts.',
              C:'I write a list of food with no steps.'}},
          { k:'w2', n:2, from:5, auto:'sequence',
            text:'Instructions — action words and words that put things in order.',
            levels:{
              AD:'Somebody cooked my recipe without asking me a single question.',
              A:'Every step starts with an action word and I use first, then, after, finally.',
              B:'I use some action words, but the steps jump about.',
              C:'I write the food, not what to do with it.'}},
          { k:'w3', n:3, from:1, auto:null,
            text:'The words of the unit — food, utensils and cooking actions.',
            levels:{
              AD:'I also use words we did not practise in class, and they are right.',
              A:'I use the food, utensil and cooking words of the unit, spelled almost always right.',
              B:'I use a few words of the unit.',
              C:'I copy the words from the board.'}},
          { k:'w4', n:4, from:1, auto:null,
            text:'Nutritious food — the recipe feeds you.',
            levels:{
              AD:'I say why my recipe is good for me.',
              A:'My recipe uses nutritious food.',
              B:'One of my ingredients is nutritious.',
              C:'My recipe uses none of the nutritious food we studied.'}}
        ]
      }
    },

    /* ---- U5 · The Shadow Show --------------------------------------- */
    5: {
      report: {
        task:'What I found out about light', spec:'40–60 words', range:[40,60],
        nota:'El criterio 2 del planner es el de escritura y va tal cual, con sus niveles.',
        fuera:'Criterion 1 (Speaking) and criterion 3 (the experiment itself).',
        criteria:[
          { k:'w1', n:1, from:2, auto:null,
            text:'Writing — write what you found out.',
            levels:{
              AD:'I also write WHY I think it happened.',
              A:'I write my question, my guess and what really happened.',
              B:'I write short sentences with help.',
              C:'I copy words.'}},
          { k:'w2', n:2, from:2, auto:'structure',
            text:'Order and length — 40–60 words a Nursery teacher could read out.',
            levels:{
              AD:'Everything is in order and every sentence says something new.',
              A:'Question, guess and result in that order, in 40–60 words.',
              B:'It is all there but jumbled, or too short.',
              C:'A few words with no order.'}},
          { k:'w3', n:3, from:1, auto:null,
            text:'The words of the unit — light, dark, bright, shadow.',
            levels:{
              AD:'I use the words of the unit and I spell them right.',
              A:'I use the words of the unit and the present continuous.',
              B:'I use one or two words of the unit.',
              C:'I do not use the words of the unit.'}}
        ]
      }
    },

    /* ---- U6 · The Ramp Race ----------------------------------------- */
    6: {
      story: {
        task:'The story of my vehicle', spec:'50–80 words', range:[50,80],
        nota:'El criterio 2 del planner es el de escritura y va tal cual.',
        fuera:'Criterion 1 (Speaking) and criterion 3 (the fair race).',
        criteria:[
          { k:'w1', n:1, from:2, auto:'sequence',
            text:'Writing — tell what happened, in order.',
            levels:{
              AD:'I add why it happened, with because.',
              A:'I use first, then, after that, and I write in the past.',
              B:'I write sentences but they jump about.',
              C:'I write words with no order.'}},
          { k:'w2', n:2, from:3, auto:'data',
            text:'The real distance — the numbers you measured.',
            levels:{
              AD:'I give the distance on each floor and I say which one went further.',
              A:'I give the real distance I measured, with its unit.',
              B:'I say it went far.',
              C:'I do not say how far it went.'}},
          { k:'w3', n:3, from:1, auto:'structure',
            text:'Length and the words of the unit.',
            levels:{
              AD:'50–80 words, and I use the words of the unit without looking at the wall.',
              A:'50–80 words with the words of the unit (ramp, push, pull, further, slower).',
              B:'Too short or too long, or with only one word of the unit.',
              C:'A few words.'}}
        ]
      }
    }
  },

  /* ============================================================ 3.o ==== */
  g3: {

    /* ---- U4 · Discovering the Animal Kingdom ------------------------- */
    4: {
      report: {
        task:'Your interview script', spec:'With commas and quotation marks',
        nota:'El criterio 3 del planner es el de escritura; los descriptores se redactan a partir de el.',
        fuera:'Nothing: all three criteria touch the script, though criterion 1 shows mainly when it is read aloud.',
        criteria:[
          { k:'w1', n:1, from:3, auto:null,
            text:'Purpose and order — an interview with a beginning, a middle and an end.',
            levels:{
              AD:'A reader can tell what the zookeeper thinks, not only what the animal does.',
              A:'I know why I am writing and who for, and the questions and answers go in order.',
              B:'I write questions and answers, but they are not ordered.',
              C:'I write facts about an animal, not an interview.'}},
          { k:'w2', n:2, from:1, auto:null,
            text:'Questions that get an answer.',
            levels:{
              AD:'I ask a follow-up question about the answer I have just been given.',
              A:'I ask What, Why and How questions, and every one of them is answered.',
              B:'I ask questions that are answered with yes or no.',
              C:'I copy the questions from the board.'}},
          { k:'w3', n:3, from:3, auto:null,
            text:'Punctuating what people say.',
            levels:{
              AD:'My punctuation is right all the way through, even inside what people say.',
              A:'I use quotation marks for what people say, and commas where they go.',
              B:'I use quotation marks sometimes.',
              C:'Nothing shows who is speaking.'}},
          { k:'w4', n:4, from:2, auto:null,
            text:'The words of the unit — habitat, predator, prey.',
            levels:{
              AD:'I compare two animals and explain what makes each one fit its habitat.',
              A:'I use habitat, predator and prey, and I compare two animals.',
              B:'I use one word of the unit.',
              C:'I do not use the words of the unit.'}}
        ]
      }
    },

    /* ---- U5 · Our Place in Space ------------------------------------ */
    5: {
      report: {
        task:'How my model works', spec:'80–120 words', range:[80,120],
        nota:'El criterio 2 del planner es el de escritura y va tal cual.',
        fuera:'Criterion 1 (Explaining, spoken aloud to the visitor).',
        criteria:[
          { k:'w1', n:1, from:2, auto:'sequence',
            text:'Writing — explain a process so it can be followed.',
            levels:{
              AD:'I add a prediction with will or going to and I justify it.',
              A:'I use the present simple and linking words, and the order is clear.',
              B:'I explain it but the steps jump about.',
              C:'I write facts in no order.'}},
          { k:'w2', n:2, from:2, auto:'structure',
            text:'Length and reader — 80–120 words to be read out to a visitor.',
            levels:{
              AD:'It reads aloud well: nothing has to be said twice.',
              A:'80–120 words, written to be read out to a visitor.',
              B:'Too short or too long to read out.',
              C:'Notes, not a text.'}},
          { k:'w3', n:3, from:3, auto:null,
            text:'The words of the unit, and why we see what we see.',
            levels:{
              AD:'I explain why we see what we see from Earth, not only what moves.',
              A:'I use the words of the unit and the present simple for what always happens.',
              B:'I use some of the words of the unit.',
              C:'I name the parts only.'}}
        ]
      }
    },

    /* ---- U6 · One Thing I Will Do Better ----------------------------- */
    6: {
      report: {
        task:'This year I learned, next year I will', spec:'about 100 words each', range:[150,260],
        nota:'Los criterios 1 y 2 del planner son los dos de escritura y van tal cual.',
        fuera:'Criterion 3 (Speaking) — telling the family out loud.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Writing — look back with evidence, not with memory.',
            levels:{
              AD:'I compare where I was in March with where I am now.',
              A:'I say what I learned with an example, in the past tense.',
              B:'I say what I learned, in general.',
              C:'I write that the year was good.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Writing — set a goal that can be kept.',
            levels:{
              AD:'My plan starts from what my own habit data showed.',
              A:'A specific goal, with will or going to, and a weekly plan.',
              B:'I have a goal but no plan.',
              C:'My goal is “to be better”.'}},
          { k:'w3', n:3, from:1, auto:'structure',
            text:'Two paragraphs — the past one and the future one.',
            levels:{
              AD:'Each paragraph does its own job, and the second grows out of the first.',
              A:'Two paragraphs of about 100 words: this year in the past, next year with will or going to.',
              B:'One long paragraph, or one of the two missing.',
              C:'A few lines.'}}
        ]
      }
    }
  },

  /* ============================================================ 4.o ==== */
  g4: {

    /* ---- U4 · Your Guide to Exploring Ica ---------------------------
       Esta unidad esta en Toddle con criterios y secuencia EN BLANCO. No hay
       de donde derivar, asi que la rubrica sale del propio entregable y de su
       lista de comprobacion, y se dice. */
    4: {
      report: {
        task:'Your section of the guide', spec:'Instructions + information + opinion',
        nota:'El planner de esta unidad no trae criterios: la rubrica sale del entregable y de su lista de comprobacion. Pendiente de validar con coordinacion.',
        criteria:[
          { k:'w1', n:1, from:null, auto:'sequence',
            text:'Instructions they can actually follow.',
            levels:{
              AD:'Somebody who has never been to Ica could get ready with my instructions alone.',
              A:'My instructions are in order and each one starts with an action word.',
              B:'I give advice, but not steps.',
              C:'I say what I did, not what they should do.'}},
          { k:'w2', n:2, from:null, auto:null,
            text:'Information about a real place you visited.',
            levels:{
              AD:'I include something you only know if you were there.',
              A:'I describe a real place from the trip, with details.',
              B:'I name the place.',
              C:'I do not describe any place.'}},
          { k:'w3', n:3, from:null, auto:'linkers',
            text:'Opinion with a reason.',
            levels:{
              AD:'I say who would enjoy it and who would not.',
              A:'I recommend something and I explain why.',
              B:'I say that I liked it.',
              C:'I give no opinion.'}},
          { k:'w4', n:4, from:null, auto:null,
            text:'Written for next year’s students.',
            levels:{
              AD:'I speak to them directly and I warn them about something.',
              A:'I write to next year’s students, not to my teacher.',
              B:'Sometimes to them, sometimes to the teacher.',
              C:'I write it as if it were homework.'}}
        ]
      }
    },

    /* ---- U5 · The Fair Test Challenge -------------------------------
       Los cinco criterios del planner describen el informe escrito, asi que
       van tal cual: aqui no hay nada que redactar. */
    5: {
      report: {
        task:'Investigation report', spec:'120–160 words', range:[120,160],
        nota:'Los cinco criterios del planner van tal cual: todos describen el informe.',
        criteria:[
          { k:'w1', n:1, from:1, auto:'sequence',
            text:'Method — write it so somebody else can repeat it.',
            levels:{
              AD:'Somebody who was not there repeats it and gets my result.',
              A:'Steps in order, with what changed and what was kept the same.',
              B:'I explain the steps but I leave out what stayed the same.',
              C:'I say what I did in general terms.'}},
          { k:'w2', n:2, from:2, auto:'data',
            text:'Measuring — use decimals properly.',
            levels:{
              AD:'I take the average and say which reading looks wrong and why.',
              A:'I record every attempt with its decimal and its unit.',
              B:'I measure but I only write down the good attempts.',
              C:'I write round numbers with no unit.'}},
          { k:'w3', n:3, from:3, auto:'linkers',
            text:'Comparing — say what the numbers mean.',
            levels:{
              AD:'I say what my test does NOT prove.',
              A:'I compare with figures and explain the result with because.',
              B:'I compare the two with a comparative.',
              C:'I say one went further.'}},
          { k:'w4', n:4, from:4, auto:'structure',
            text:'Writing — an informative text that actually informs, in 120–160 words.',
            levels:{
              AD:'I close with a conclusion that says what the reader should take away.',
              A:'I introduce the topic, group the information and link it with because, therefore, since, for example.',
              B:'I introduce the topic but the information is not grouped.',
              C:'I write what happened with no structure.'}},
          { k:'w5', n:5, from:5, auto:null,
            text:'Sources — know where your information comes from.',
            levels:{
              AD:'I explain why one source is more reliable than another for this claim.',
              A:'I tell a primary source from a secondary one and I say which is which.',
              B:'I say we measured it, or that I read it somewhere.',
              C:'I do not say where the data came from.'}}
        ]
      }
    },

    /* ---- U6 · Where Our Water Comes From ----------------------------- */
    6: {
      report: {
        task:'Our water guide', spec:'150–200 words', range:[150,200],
        nota:'Los cinco criterios del planner van tal cual: la guia es el producto escrito.',
        criteria:[
          { k:'w1', n:1, from:1, auto:'sequence',
            text:'Explaining a process — the water cycle, in order.',
            levels:{
              AD:'I explain what would happen if one step failed.',
              A:'I explain it in order with sequencers and the right vocabulary.',
              B:'I explain it but the order is not clear.',
              C:'I name the parts of the cycle.'}},
          { k:'w2', n:2, from:2, auto:'data',
            text:'Data — use what you measured yourself.',
            levels:{
              AD:'I turn them into fractions or percentages and say what they show.',
              A:'My two weeks of readings are in the guide, as figures.',
              B:'I have my own readings but I do not use them in the guide.',
              C:'I copy data from the internet.'}},
          { k:'w3', n:3, from:3, auto:'structure',
            text:'Writing for a reader who is walking past — 150–200 words.',
            levels:{
              AD:'I ask the reader to do one specific thing, and it is doable.',
              A:'The main idea is visible at once and the guide can be read in thirty seconds.',
              B:'I write a lot and the important part is buried.',
              C:'I write everything I know.'}},
          { k:'w4', n:4, from:4, auto:'linkers',
            text:'Opinion — hold a point of view with reasons.',
            levels:{
              AD:'I close with a conclusion, and my reasons come from my own data.',
              A:'I state my opinion, give ordered reasons and link them with because, therefore, since.',
              B:'I give my opinion but the reasons are thin.',
              C:'I say what happens without saying what I think.'}},
          { k:'w5', n:5, from:5, auto:null,
            text:'Geography — explain why our weather is what it is.',
            levels:{
              AD:'I connect that to why our water is a limited resource.',
              A:'I explain how the currents and the mountain range shape the weather and the landscape here.',
              B:'I name one factor that affects our weather.',
              C:'I say it rains or it does not.'}}
        ]
      }
    }
  },

  /* ============================================================ 5.o ==== */
  g5: {

    /* ---- U4 · Reading Like Writers ----------------------------------- */
    4: {
      report: {
        task:'Writer’s Notebook', spec:'Collected across the unit',
        nota:'El criterio 3 del planner es el de escritura; los descriptores se redactan a partir de el y del propio cuaderno.',
        fuera:'Criterion 1 (Speaking).',
        criteria:[
          { k:'w1', n:1, from:3, auto:null,
            text:'Sensory observation — descriptive vocabulary and powerful verbs.',
            levels:{
              AD:'My observations make the reader see the place without being told what to feel.',
              A:'I write what I saw, heard and smelled, with descriptive adjectives and strong verbs.',
              B:'I describe things in general words (nice, big, good).',
              C:'I list what was there.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Something you observed yourself, not something you read.',
            levels:{
              AD:'I notice something nobody else in the class noticed.',
              A:'At least one entry comes from what I observed myself in Cajamarca.',
              B:'I copy an observation from the book.',
              C:'There is nothing observed here.'}},
          { k:'w3', n:3, from:3, auto:'linkers',
            text:'Organisation — entries that can be written from.',
            levels:{
              AD:'The notebook is organised well enough to find the entry I need for a story.',
              A:'My entries are ordered, in the past where they need to be, and linked with connectors.',
              B:'My entries are there but in no order.',
              C:'Loose words.'}},
          { k:'w4', n:4, from:3, auto:null,
            text:'Enough material — collected across the unit, not in one afternoon.',
            levels:{
              AD:'There is more here than I am going to use.',
              A:'I have entries from across the unit.',
              B:'I have a few entries, all from the same day.',
              C:'The notebook is nearly empty.'}}
        ]
      }
    },

    /* ---- U5 · The Air and the Water of Our Region -------------------- */
    5: {
      report: {
        task:'Report on our air or our water', spec:'200–250 words', range:[200,250],
        nota:'Los tres criterios del planner van tal cual; el cuarto es la forma del informe y su extension.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Position — take one, and hold it up with evidence.',
            levels:{
              AD:'I acknowledge the strongest argument against me and answer it.',
              A:'A clear position in the first paragraph, supported with my figures.',
              B:'I give an opinion but with no data behind it.',
              C:'I describe the problem without saying what I think.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Sources — tell a primary source from a secondary one.',
            levels:{
              AD:'I say which source is more reliable for this claim, and why.',
              A:'I say which data I measured myself and which I took from somebody else.',
              B:'I cite sources but do not distinguish them.',
              C:'I use whatever I found first.'}},
          { k:'w3', n:3, from:3, auto:'data',
            text:'Data — figures and percentages the reader can read.',
            levels:{
              AD:'The figures make the problem visible on their own, before you read the text.',
              A:'My data is in the report as percentages, and the map has its key and its scale.',
              B:'The data is right but it is not in the text.',
              C:'There are no figures.'}},
          { k:'w4', n:4, from:1, auto:'structure',
            text:'Structure and length — 200–250 words that go somewhere.',
            levels:{
              AD:'Every paragraph moves the argument forward.',
              A:'200–250 words: position, evidence, the other point of view, conclusion.',
              B:'It is all there, but the position is buried or the length is off.',
              C:'A description with no shape.'}}
        ]
      }
    },

    /* ---- U6 · Worth Saving ------------------------------------------- */
    6: {
      campaign: {
        task:'Your campaign', spec:'200–250 words', range:[200,250],
        nota:'Los criterios 1 y 2 del planner van tal cual; el tercero es la forma del texto.',
        fuera:'Criterion 3 (Speaking) — presenting it in the hall.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Persuading — make somebody want to change something.',
            levels:{
              AD:'I answer the objection of somebody who does not want to change.',
              A:'I ask for one specific change and I give reasons with evidence.',
              B:'I ask people to change but I do not say exactly what.',
              C:'I say the problem is bad.'}},
          { k:'w2', n:2, from:2, auto:'data',
            text:'Data — your own numbers, from this school.',
            levels:{
              AD:'I use probability to say what is likely to happen if nothing changes.',
              A:'My own measurements are in the campaign, as figures.',
              B:'I measured something but it is not in the campaign.',
              C:'I use figures I found online.'}},
          { k:'w3', n:3, from:1, auto:'structure',
            text:'Structure and length — 200–250 words that end in an ask.',
            levels:{
              AD:'The ask is the last thing the reader reads, and it is impossible to miss.',
              A:'200–250 words: the problem, my data, what happens if we act, and exactly what to do.',
              B:'It is all there but the ask is hidden.',
              C:'I say the problem is bad and nothing else.'}}
        ]
      }
    }
  },


  /* ============================================================ 6.o ==== */
  g6: {

    /* ---- U4 · Heroes Among Us --------------------------------------- */
    4: {
      report: {
        task:'Three-paragraph biography', spec:'3 paragraphs · past simple',
        nota:'Criterios 5, 3, 4 y 2 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criteria 1, 6 and 7 — literal comprehension, reading aloud and the oral presentation.',
        criteria:[
          { k:'w1', n:1, from:5, auto:'structure',
            text:'Structure — three paragraphs, one job each.',
            levels:{
              AD:'The third paragraph makes the reader see why the first two mattered.',
              A:'Three paragraphs: early life / achievements and obstacles / legacy and my opinion.',
              B:'Three paragraphs, but one of them does two jobs or is missing.',
              C:'One block of facts in no order.'}},
          { k:'w2', n:2, from:3, auto:null,
            text:'Past simple — regular and irregular verbs.',
            levels:{
              AD:'I use the past simple and the past continuous, and irregular verbs give me no trouble.',
              A:'I write in the past simple with few mistakes, regular and irregular.',
              B:'I use the past simple, but irregular verbs go wrong often.',
              C:'I write in the present, or the tense changes from line to line.'}},
          { k:'w3', n:3, from:4, auto:'sequence',
            text:'Connectors — time, and cause and effect.',
            levels:{
              AD:'My connectors carry cause as well as time: this is why he later…',
              A:'I use first, next, then, finally, and because, but and so.',
              B:'I use time connectors only.',
              C:'My sentences are not joined.'}},
          { k:'w4', n:4, from:2, auto:null,
            text:'Character — what he was like inside, not what he looked like.',
            levels:{
              AD:'I infer a trait from something he did, and I say which action shows it.',
              A:'I name internal traits (determined, resilient) and I say what I think of my hero.',
              B:'I describe what he looked like and what he did.',
              C:'I list dates and places.'}}
        ]
      }
    },

    /* ---- U5 · Tech in My Life --------------------------------------- */
    5: {
      report: {
        task:'Report on technology in your life', spec:'6–8 sentences minimum', range:[80,200],
        nota:'El criterio 3 del planner es el de escritura; los descriptores se redactan a partir de el.',
        fuera:'Criterion 2 (Reading).',
        criteria:[
          { k:'w1', n:1, from:3, auto:'structure',
            text:'Shape — topic sentence, reasons, conclusion.',
            levels:{
              AD:'My topic sentence is one somebody could disagree with.',
              A:'Topic sentence, my reasons and a conclusion, in at least six to eight sentences.',
              B:'My ideas are there but there is no topic sentence or no conclusion.',
              C:'A list of things about technology.'}},
          { k:'w2', n:2, from:3, auto:null,
            text:'Two good things and two problems.',
            levels:{
              AD:'I weigh one against the other instead of listing them.',
              A:'At least two advantages and two problems, each one explained.',
              B:'Only one of each.',
              C:'I say technology is good, or that it is bad, and nothing else.'}},
          { k:'w3', n:3, from:3, auto:'linkers',
            text:'Joining ideas — because, but, also.',
            levels:{
              AD:'I also use however or on the other hand, correctly.',
              A:'I use because, but and also to join my reasons.',
              B:'I use one of them, repeated.',
              C:'My sentences are not joined.'}},
          { k:'w4', n:4, from:1, auto:null,
            text:'An example from your own life.',
            levels:{
              AD:'My example is specific: what happened, when, and what it changed.',
              A:'I give a real example from my own life.',
              B:'I give a general example (people use their phones a lot).',
              C:'There is no example.'}}
        ]
      }
    }
  },

  /* ============================================================ 7.o ==== */
  g7: {

    /* ---- U4 · The Architecture of Order ------------------------------ */
    4: {
      report: {
        task:'Narrative snapshot', spec:'200–250 words', range:[200,250],
        nota:'El criterio 2 del planner es el de escritura; los descriptores se redactan a partir de el y del entregable.',
        fuera:'Criterion 3 (Speaking) — the debate.',
        criteria:[
          { k:'w1', n:1, from:2, auto:null,
            text:'An unspoken rule — not a written one.',
            levels:{
              AD:'The rule is never stated: the reader works it out from the reaction.',
              A:'Someone breaks an unspoken rule, and it is clear which one.',
              B:'A rule is broken, but it is a written one or a law.',
              C:'Nothing is broken: it is a description.'}},
          { k:'w2', n:2, from:2, auto:'linkers',
            text:'Cause and effect — a social consequence, not a legal one.',
            levels:{
              AD:'The consequence is exactly proportionate, and it lands without being explained.',
              A:'The consequence follows clearly from what the character did, and it is social: isolation, judgement, confusion.',
              B:'There is a consequence, but it does not follow from the action, or it is a punishment by authority.',
              C:'There is no consequence.'}},
          { k:'w3', n:3, from:2, auto:'structure',
            text:'It reads as a scene — 200–250 words with dialogue or concrete detail.',
            levels:{
              AD:'The scene shows the rule instead of telling it, and every detail is doing work.',
              A:'200–250 words of scene: dialogue or concrete detail, not summary.',
              B:'Mostly narration, with one line of dialogue.',
              C:'A summary of what happened.'}},
          { k:'w4', n:4, from:1, auto:null,
            text:'The vocabulary of the unit — norm, custom, taboo, must and should.',
            levels:{
              AD:'I use norm, custom and taboo where each one belongs, not as synonyms.',
              A:'I use the vocabulary of the unit, and must and should where they fit.',
              B:'I use one or two words of the unit.',
              C:'I do not use the vocabulary of the unit.'}}
        ]
      }
    },

    /* ---- U5 · Tech in Our World -------------------------------------- */
    5: {
      report: {
        task:'Report on technology and society', spec:'200–250 words', range:[200,250],
        nota:'El criterio 3 del planner es el de escritura; los descriptores se redactan a partir de el.',
        fuera:'Criterion 1 (Speaking & listening).',
        criteria:[
          { k:'w1', n:1, from:3, auto:'structure',
            text:'Structure — introduction, two body paragraphs, conclusion, in 200–250 words.',
            levels:{
              AD:'Each body paragraph sets up the next, and the conclusion says something the introduction did not.',
              A:'The four parts are there, developed, and the length is right.',
              B:'The four parts are there but one is a single sentence, or the length is off.',
              C:'One block, or no conclusion.'}},
          { k:'w2', n:2, from:2, auto:'evidence',
            text:'Evidence — arguments that are supported.',
            levels:{
              AD:'I weigh my evidence: I say what it shows and what it does not.',
              A:'Both of my arguments are supported with evidence or a concrete example.',
              B:'I support one argument; the other is opinion.',
              C:'I give opinions with nothing behind them.'}},
          { k:'w3', n:3, from:3, auto:'linkers',
            text:'Connectors — however, on the other hand, in addition.',
            levels:{
              AD:'My connectors mark the turn of the argument, not just the next sentence.',
              A:'I use however, on the other hand and in addition where they belong.',
              B:'I use one connector, repeated.',
              C:'My paragraphs are not connected.'}},
          { k:'w4', n:4, from:1, auto:null,
            text:'Society — not only your own screen.',
            levels:{
              AD:'I move from what happens to one person to what happens to a society, and back.',
              A:'I write about the effects at the level of society.',
              B:'I mention society but all my examples are personal.',
              C:'I write only about myself.'}}
        ]
      }
    }
  },

  /* ============================================================ 8.o ==== */
  g8: {

    /* ---- U4 · Finding Our Voice -------------------------------------- */
    4: {
      report: {
        task:'Argumentative essay', spec:'300–350 words', range:[300,350],
        nota:'Criterios 3, 2 y 4 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criterion 1 (Speaking) — the presentation.',
        criteria:[
          { k:'w1', n:1, from:3, auto:null,
            text:'Thesis — a claim, not a summary.',
            levels:{
              AD:'My thesis is arguable and I keep it in view in every paragraph.',
              A:'A clear thesis in the introduction, and the essay defends it.',
              B:'I have a thesis, but it summarises the novel instead of claiming something.',
              C:'There is no thesis: I retell what happens.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Evidence from the novel, explained.',
            levels:{
              AD:'I choose the evidence a reader who disagrees would have to explain away.',
              A:'I bring evidence from the novel and I explain how it supports my point.',
              B:'I quote the novel but I leave the quotation to speak for itself.',
              C:'I refer to the novel from memory, with no evidence.'}},
          { k:'w3', n:3, from:3, auto:'structure',
            text:'Organisation and length — introduction, body, conclusion in 300–350 words.',
            levels:{
              AD:'The order of the paragraphs is itself part of the argument.',
              A:'The three parts are there, developed, and the length is right.',
              B:'The parts are there but one is thin, or the length is off.',
              C:'One block of text.'}},
          { k:'w4', n:4, from:4, auto:null,
            text:'Accuracy — colons, semicolons and proofreading.',
            levels:{
              AD:'My punctuation is doing work: the colon introduces, the semicolon balances.',
              A:'I use a colon or a semicolon correctly, and I have proofread my spelling.',
              B:'I try advanced punctuation and it goes wrong, or I avoid it altogether.',
              C:'Basic punctuation and spelling get in the way of my meaning.'}}
        ]
      },
      reflection: {
        task:'Self-reflection', spec:'Around 100 words', range:[80,160],
        nota:'Una reflexion se mide por lo que el alumno es capaz de decir de su propia lectura, no con la rubrica del ensayo.',
        fuera:'Criteria 1 and 4 of the planner.',
        criteria:[
          { k:'w1', n:1, from:3, auto:null,
            text:'The strongest theme, and why you say so.',
            levels:{
              AD:'I explain why the theme I rejected was weaker.',
              A:'I name the theme that turned out strongest and I give my reason.',
              B:'I name a theme.',
              C:'I say the book was interesting.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'How Jonas changed — with something from the text.',
            levels:{
              AD:'I point to the moment the change begins.',
              A:'I say how Jonas changed and I anchor it in the novel.',
              B:'I say he changed.',
              C:'I retell the plot.'}},
          { k:'w3', n:3, from:3, auto:'structure',
            text:'Clarity and length — around 100 words that say something.',
            levels:{
              AD:'Every sentence adds something new.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Too short to say anything, or padded to reach the count.'}}
        ]
      }
    }
  },

  /* ============================================================ 9.º ==== */
  g9: {

    /* ---- U1 · Mystery and Secrets ------------------------------------ */
    1: {
      report: {
        task:'Your case file', spec:'Formal, descriptive register',
        nota:'Criterios 1 a 5 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criterion 6 (Creativity & presentation) — the oral defence of the case.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Content & ideas — an original mystery that develops logically.',
            levels:{
              AD:'My mystery holds together on a second reading, when you already know the answer.',
              A:'An original mystery with logical development and well-chosen details.',
              B:'A mystery, but it develops by chance rather than by logic.',
              C:'Events with no mystery in them.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Inference — fact, speculation and opinion stay apart.',
            levels:{
              AD:'The reader can reach two defensible readings and I have controlled both.',
              A:'The reader can infer, and fact, speculation and opinion are clearly distinguishable.',
              B:'I mix what is known with what is guessed.',
              C:'I state everything as fact.'}},
          { k:'w3', n:3, from:3, auto:null,
            text:'Language use — speculation modals, the passive and conditionals.',
            levels:{
              AD:'My speculative language is graded: must have been, might have been, could not have been.',
              A:'I control modals of speculation, the passive voice for reporting and conditionals.',
              B:'I use them, with recurring mistakes.',
              C:'I write in the present, in the active, with no speculation.'}},
          { k:'w4', n:4, from:4, auto:'structure',
            text:'Organisation — a case file that can be read as one.',
            levels:{
              AD:'The order in which I release the clues is itself part of the mystery.',
              A:'A clear, cohesive structure: statements, clues and report, each in its place.',
              B:'The pieces are there but the reader has to sort them.',
              C:'One block of narration.'}},
          { k:'w5', n:5, from:5, auto:null,
            text:'Evidence — the clues are integrated, not stuck on.',
            levels:{
              AD:'Every clue does two jobs: it points somewhere, and it points somewhere else too.',
              A:'My interpretations are supported and the clues are woven into the file.',
              B:'The clues are listed apart from the narrative.',
              C:'There are no clues to interpret.'}}
        ]
      },
      reflection: {
        task:'Reflection', spec:'Around 100 words', range:[80,140],
        nota:'Se mide lo que el alumno sabe decir de sus propias decisiones de escritura.',
        criteria:[
          { k:'w1', n:1, from:2, auto:null,
            text:'The inferences your reader should make.',
            levels:{
              AD:'I explain the inference I wanted and the one I was willing to let them make.',
              A:'I say what the reader should infer and from which clue.',
              B:'I say what the solution is.',
              C:'I retell my own story.'}},
          { k:'w2', n:2, from:3, auto:null,
            text:'How your language shaped what they believed.',
            levels:{
              AD:'I quote my own sentence and explain what it does to the reader.',
              A:'I explain a language choice I made and the effect I wanted from it.',
              B:'I say I used difficult words.',
              C:'I say nothing about my language.'}},
          { k:'w3', n:3, from:4, auto:'structure',
            text:'Clarity and length — around 100 words.',
            levels:{
              AD:'Every sentence adds something new.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Too short to say anything, or padded to reach the count.'}}
        ]
      }
    },

    /* ---- U2 · Voices Shaping Our World -------------------------------- */
    2: {
      report: {
        task:'Informative report', spec:'270–320 words · academic register', range:[270,320],
        nota:'Los tres criterios del planner describen el informe escrito; el cuarto sale de la propia consigna (comparar las dos voces).',
        criteria:[
          { k:'w1', n:1, from:3, auto:'structure',
            text:'Thesis & structure — introduction, background, findings, implications, conclusion.',
            levels:{
              AD:'Each section earns its place: the implications could not have been written without the findings.',
              A:'A coherent thesis and the five sections in order, in 270–320 words.',
              B:'The thesis is there but one section is missing or absorbed into another.',
              C:'I write what I found out, with no thesis and no sections.'}},
          { k:'w2', n:2, from:1, auto:null,
            text:'Academic register — the passive and nominalisation.',
            levels:{
              AD:'I choose the passive where it belongs and the active where it reads better, on purpose.',
              A:'I use the passive voice where the academic register calls for it, and nominalisation (discovery, innovation, analysis).',
              B:'I use the passive occasionally, or where it makes the sentence heavier.',
              C:'The register is conversational.'}},
          { k:'w3', n:3, from:2, auto:'evidence',
            text:'Evidence & citation.',
            levels:{
              AD:'I say what my source proves and what it only suggests.',
              A:'My evidence is integrated in the sentence and I cite at least one source.',
              B:'I mention a source but the evidence sits apart from my argument.',
              C:'I make claims with no evidence and no source.'}},
          { k:'w4', n:4, from:3, auto:null,
            text:'Comparison — the historical voice against the contemporary one.',
            levels:{
              AD:'I explain why the two were heard differently in their own time.',
              A:'I compare the two voices explicitly, on the same points.',
              B:'I describe both, one after the other, without comparing them.',
              C:'I write about one of them.'}}
        ]
      }
    },

    /* ---- U3 · Scrolling Identities ------------------------------------ */
    3: {
      report: {
        task:'Balanced opinion essay', spec:'140–190 words · FCE Writing Part 1', range:[140,190],
        nota:'Criterios 1 a 5 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criterion 6 (Communication) — that belongs to the vlog.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Content — more than one perspective, represented fairly.',
            levels:{
              AD:'I represent the side I disagree with well enough that they would accept my version.',
              A:'Several perspectives on the controversy, each given its due.',
              B:'Two sides, but one is a caricature.',
              C:'One side only.'}},
          { k:'w2', n:2, from:3, auto:null,
            text:'Language use — reported speech, relative clauses, hedging and concession.',
            levels:{
              AD:'My reporting verbs carry the stance of the speaker: claim, admit, insist, deny.',
              A:'I report accurately, use relative clauses for precision, and hedge instead of overclaiming.',
              B:'I report what others said but the tense or the pronoun slips.',
              C:'I quote directly or I invent what people said.'}},
          { k:'w3', n:3, from:4, auto:'structure',
            text:'Organisation — the FCE Part 1 shape, in 140–190 words.',
            levels:{
              AD:'The essay reads as one argument, not as four blocks.',
              A:'Introduction, two body paragraphs and a conclusion, inside the word count.',
              B:'All four parts are there but the length is off or one is a single line.',
              C:'One block, or no conclusion.'}},
          { k:'w4', n:4, from:5, auto:'evidence',
            text:'Evidence — claims supported by sources you name.',
            levels:{
              AD:'I say why the source I use is more credible than the one I do not.',
              A:'My claims are supported and I name where they come from.',
              B:'I refer to what people say without saying who.',
              C:'I give opinions with nothing behind them.'}},
          { k:'w5', n:5, from:2, auto:null,
            text:'Critical thinking — fact, opinion, evidence and assumption stay apart.',
            levels:{
              AD:'I name the assumption underneath the claim I am arguing against.',
              A:'I concede the other side before disagreeing, and I mark what is fact and what is opinion.',
              B:'I disagree without conceding anything.',
              C:'I present my opinion as fact.'}}
        ]
      },
      reflection: {
        task:'Ethics reflection', spec:'Around 100 words', range:[80,140],
        nota:'Se mide la decision etica que el alumno tomo y sabe justificar.',
        criteria:[
          { k:'w1', n:1, from:2, auto:null,
            text:'A choice you made — what you put in and what you left out.',
            levels:{
              AD:'I explain what I left out and what it cost my argument to leave it out.',
              A:'I name a real decision I made about my content, and why.',
              B:'I say I was careful.',
              C:'I describe what I made.'}},
          { k:'w2', n:2, from:2, auto:null,
            text:'Who it affects.',
            levels:{
              AD:'I think about the person who would be least happy to be quoted by me.',
              A:'I say who could be affected by what I published, and how.',
              B:'I mention that people could be affected.',
              C:'I do not consider anybody else.'}},
          { k:'w3', n:3, from:4, auto:'structure',
            text:'Clarity and length — around 100 words.',
            levels:{
              AD:'Every sentence adds something new.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Too short to say anything, or padded to reach the count.'}}
        ]
      }
    },

    /* ---- U5 · The Double-Edged Sword ---------------------------------- */
    5: {
      report: {
        task:'Analytical report', spec:'300–350 words · formal register', range:[300,350],
        nota:'El criterio 3 del planner es el de escritura y va tal cual, con sus niveles.',
        fuera:'Criterion 1 (Speaking & listening) — the debate.',
        criteria:[
          { k:'w1', n:1, from:3, auto:null,
            text:'Writing — produce a structured analytical report.',
            levels:{
              AD:'My argument is nuanced: I anticipate objections, and my vocabulary and grammar are precise throughout.',
              A:'Clear thesis, logical organisation, arguments backed by evidence, at least one counterargument, formal style and advanced connectors.',
              B:'I have a thesis and some arguments, but the evidence or the connectors are thin.',
              C:'I write about the topic, but with no clear thesis and no structure.'}},
          { k:'w2', n:2, from:2, auto:'evidence',
            text:'Evidence — pulled out of what you read, not invented.',
            levels:{
              AD:'I compare how two texts present the same issue and explain why they differ.',
              A:'Every argument is supported with evidence or an example I can trace to a source.',
              B:'I support some arguments and assert the rest.',
              C:'I give opinions with nothing behind them.'}},
          { k:'w3', n:3, from:3, auto:'structure',
            text:'Structure and length — 300–350 words in formal register.',
            levels:{
              AD:'Each paragraph earns the next one; nothing could be cut without loss.',
              A:'Thesis, arguments, counterargument and conclusion, inside 300–350 words.',
              B:'The parts are there but the length is off or one is thin.',
              C:'One block, or far from the length asked for.'}},
          { k:'w4', n:4, from:3, auto:null,
            text:'The environmental cost of AI — energy, carbon footprint or e-waste.',
            levels:{
              AD:'I weigh the environmental cost against the benefit instead of listing it.',
              A:'I bring in the environmental cost with a concrete figure or example.',
              B:'I mention that AI has an environmental cost.',
              C:'The environmental cost is not there.'}}
        ]
      }
    },

    /* ---- U6 · Future Visions ------------------------------------------ */
    6: {
      report: {
        task:'Analytical report', spec:'400–450 words', range:[400,450],
        nota:'Los cuatro criterios del planner; los descriptores se redactan a partir de ellos.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Ideas — a future you argue for, in persuasive formal language.',
            levels:{
              AD:'My vision is one somebody could reasonably refuse, and I argue it anyway.',
              A:'I state what future I am arguing for and I defend it in formal, persuasive language.',
              B:'I describe a possible future without committing to it.',
              C:'I list things that might happen.'}},
          { k:'w2', n:2, from:3, auto:'structure',
            text:'Structure — introduction, analysis, conclusion, in 400–450 words.',
            levels:{
              AD:'The analysis is ordered so that the conclusion is the only one available.',
              A:'The three parts are there, developed, connected, and inside the word count.',
              B:'The parts are there but one is thin, or the length is off.',
              C:'One block of text.'}},
          { k:'w3', n:3, from:2, auto:'evidence',
            text:'Viewpoints & evidence — more than one, with sources.',
            levels:{
              AD:'I explain why two sources looking at the same data reach different conclusions.',
              A:'I compare more than one viewpoint and note the key evidence and where it comes from.',
              B:'I mention another viewpoint without engaging with it.',
              C:'Only my own view, with no evidence.'}},
          { k:'w4', n:4, from:4, auto:'linkers',
            text:'Insight & balance — reasoning that holds both sides.',
            levels:{
              AD:'I close with what the present should learn, and it follows from my analysis.',
              A:'My reasoning is balanced and my connectors hold the argument together.',
              B:'I argue one side and mention the other at the end.',
              C:'I assert, without reasoning.'}}
        ]
      },
      reflection: {
        task:'Reflection paragraph', spec:'Around 100 words', range:[80,140],
        nota:'Se mide lo que cambio en el alumno, no lo que aprendio de memoria.',
        criteria:[
          { k:'w1', n:1, from:4, auto:null,
            text:'What changed in how you see the future.',
            levels:{
              AD:'I name the idea I held before and what displaced it.',
              A:'I say what changed in my view, and what caused the change.',
              B:'I say I learned a lot.',
              C:'I summarise the unit.'}},
          { k:'w2', n:2, from:1, auto:null,
            text:'Language — you can say it precisely.',
            levels:{
              AD:'I use conditionals and future forms to separate what is likely from what is possible.',
              A:'I use the language of the unit accurately to talk about my own thinking.',
              B:'I get my meaning across with recurring mistakes.',
              C:'The mistakes make my meaning hard to follow.'}},
          { k:'w3', n:3, from:3, auto:'structure',
            text:'Clarity and length — around 100 words.',
            levels:{
              AD:'Every sentence adds something new.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Too short to say anything, or padded to reach the count.'}}
        ]
      }
    },

    /* ---- U105 · Does Our School Run on Data? --------------------------- */
    105: {
      report: {
        task:'Proposal to the leadership team', spec:'300–350 words · proposal register', range:[300,350],
        nota:'Los criterios 1 y 2 del planner van tal cual; el tercero es la forma y el registro del documento.',
        fuera:'Criterion 3 (Defence) — defending it in front of whoever can say no.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Proposal — write something the leadership team can act on.',
            levels:{
              AD:'I anticipate the objection the leadership team will actually raise, and I answer it before they ask.',
              A:'Clear recommendations in proposal register, ordered, each one justified with my evidence.',
              B:'I make a recommendation, but the reader has to guess what to do first.',
              C:'I describe the problem but I do not ask for anything specific.'}},
          { k:'w2', n:2, from:2, auto:'data',
            text:'Evidence — use your own data, not only what the internet says.',
            levels:{
              AD:'I say what my data cannot prove, and where a better measurement would be needed.',
              A:'My own measurements, the method explained, and the published research used to put them in context.',
              B:'I have some data of my own but I do not say how I got it.',
              C:'I quote articles; I have not measured anything myself.'}},
          { k:'w3', n:3, from:1, auto:'structure',
            text:'Register and length — 300–350 words written to be acted on, not marked.',
            levels:{
              AD:'It could be sent as it is, and it would get an answer.',
              A:'Proposal register throughout, inside the word count, with the ask visible at a glance.',
              B:'It reads as an essay in places, or the length is off.',
              C:'It reads as homework.'}}
        ]
      }
    },

    /* ---- U106 · NIS 2040 ---------------------------------------------- */
    106: {
      report: {
        task:'The case for your 2040', spec:'280–330 words', range:[280,330],
        nota:'Los criterios 1 y 2 del planner van tal cual; los otros dos son la lengua del futuro y la forma del texto.',
        fuera:'Criterion 3 (Holding the room) — the stand.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'Vision — argue for a future, do not just describe one.',
            levels:{
              AD:'I defend a future that costs something, and I say who pays for it.',
              A:'A clear vision, built from present evidence, with the trade-offs named.',
              B:'I take a position, but the reasons are general.',
              C:'I describe what might happen, with no position of my own.'}},
          { k:'w2', n:2, from:2, auto:'data',
            text:'Evidence — start from what is happening now.',
            levels:{
              AD:'I distinguish what is likely from what is merely possible, and say which is which.',
              A:'Every claim about 2040 is anchored in something measurable today.',
              B:'I mention one or two present trends.',
              C:'My future is invented from scratch.'}},
          { k:'w3', n:3, from:2, auto:null,
            text:'The language of the future — future forms and conditionals.',
            levels:{
              AD:'My modals grade the likelihood: will have, is likely to, could, might.',
              A:'I use future forms accurately and conditionals to weigh alternatives.',
              B:'I use will for everything.',
              C:'I write about 2040 in the present.'}},
          { k:'w4', n:4, from:1, auto:'structure',
            text:'Structure and length — 280–330 words a family can read in two minutes.',
            levels:{
              AD:'A visitor gets the case from the first paragraph and stays for the rest.',
              A:'Vision, evidence, cost and who pays, inside the word count.',
              B:'It is all there but the case is buried, or the length is off.',
              C:'Notes, or far from the length asked for.'}}
        ]
      }
    },


    /* ---- U4 · Mind Over Matter — The Wellbeing Generation ------------
       Criterios del planner: 1 Content & relevance · 2 Language use ·
       3 Register & tone · 4 Structure · 5 Engagement · 6 Collaboration.
       El 6 es del podcast en pareja y no se corrige en un texto escrito.
       El 4 y el 5 hablan de articulo Y podcast: aqui se quedan con la
       mitad escrita. */
    4: {

      report: {
        task:'Magazine article',
        spec:'140–190 words · FCE Writing Part 2',
        range:[140,190],
        nota:'Los cinco criterios salen de la rubrica de la unidad que el alumno tiene delante desde el dia uno.',
        fuera:'Criterion 6 (Collaboration) — that belongs to the paired podcast, not the article.',
        criteria:[

          { k:'w1', n:1, from:1, auto:'evidence',
            text:'Content & evidence — an evidence-based wellbeing topic that matters to a teenage reader.',
            levels:{
              AD:'I choose a topic others overlook and I weigh the evidence instead of just quoting it.',
              A:'My topic matters to a teenager my age and I back it with evidence from what I read or listened to.',
              B:'I choose a wellbeing topic, but I rely on my own opinion more than on what I read.',
              C:'I write about wellbeing in general, or about something that is not a wellbeing topic at all, and without evidence.'}},

          { k:'w2', n:2, from:2, auto:'advice',
            text:'Language use — gerunds and infinitives, and modals of advice graded by strength.',
            levels:{
              AD:'I also use speculation modals accurately (might, may, must), and I separate what is certain from what is likely.',
              A:'I choose the verb pattern that carries the meaning I want, and I grade my advice (had better > should > could).',
              B:'I usually get gerunds and infinitives right and I give advice, though always at the same strength.',
              C:'I make frequent mistakes with verb patterns and I only use should, or I give no advice at all.'}},

          { k:'w3', n:3, from:3, auto:null,
            text:'Register & tone — right for a teen magazine, and respectful about mental health.',
            levels:{
              AD:'I adjust my tone within the piece — lighter in the hook, careful in the advice — and I name difficult things respectfully.',
              A:'I sound like a teen magazine: close but careful, and I write about mental health without stigma.',
              B:'My tone mostly fits, though it slips into slang or into an essay voice.',
              C:'My tone jumps between too formal and too casual, I use language that could hurt, or the words are not mine to explain.'}},

          { k:'w4', n:4, from:4, auto:'structure',
            text:'Structure & length — title, hook, developed body, conclusion, inside 140–190 words.',
            levels:{
              AD:'The structure is invisible because it works: every paragraph sets up the next one, and I stay inside the word count.',
              A:'Catchy title, hooking introduction, developed body and memorable conclusion, and I am inside 140–190 words.',
              B:'The article has a beginning and an end, but a part is missing or the length is off the range.',
              C:'My ideas are there but not ordered, there is no title or no ending, and the length is far from what was asked.'}},

          { k:'w5', n:5, from:5, auto:'hook',
            text:'Engagement — the hook works and the reader wants to keep reading.',
            levels:{
              AD:'I hold attention all the way through, and I leave the reader with something they will repeat.',
              A:'My hook makes someone want to keep reading, and the piece keeps its promise to the end.',
              B:'My opening is interesting, though the rest reads flat.',
              C:'I open by announcing my topic and the reader has no reason to continue.'}}
        ]
      },

      reflection: {
        task:'Editor’s reflection',
        spec:'Around 100 words',
        range:[80,140],
        nota:'Una reflexion no se corrige con la rubrica del articulo: se mira lo que el alumno es capaz de decir de su propio proceso.',
        fuera:'Criteria 4, 5 and 6 of the unit — they belong to the product, not the reflection.',
        criteria:[

          { k:'w1', n:1, from:1, auto:null,
            text:'Process — what you actually did, and what changed along the way.',
            levels:{
              AD:'I explain a decision I changed and why the piece is better for it.',
              A:'I explain what I did and what I found difficult, with a concrete example from my own article.',
              B:'I say what I did, in general terms.',
              C:'I say that I liked it or that it was hard, without saying of what.'}},

          { k:'w2', n:2, from:2, auto:'advice',
            text:'Language — the language of the unit used to talk about your own work.',
            levels:{
              AD:'I use verb patterns and modals accurately to weigh what I could have done differently.',
              A:'I use the unit’s language (gerunds, infinitives, modals) correctly when I talk about my process.',
              B:'I get my meaning across, with recurring mistakes in the structures of the unit.',
              C:'The mistakes make my meaning hard to follow.'}},

          { k:'w3', n:3, from:1, auto:'structure',
            text:'Clarity & length — around 100 words that say something.',
            levels:{
              AD:'Every sentence adds something new, inside the length asked for.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Far too short to say anything, or padded to reach the count.'}}
        ]
      }
    }
  },

  /* =========================================================== 10.o ==== */
  g10: {

    /* ---- U4 · Crafting Complex Arguments ------------------------------ */
    4: {
      report: {
        task:'Argumentative essay', spec:'Formal register · advanced punctuation',
        nota:'Criterios 2, 3, 4 y 5 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criterion 1 (Delivery) — that belongs to the podcast and the debate.',
        criteria:[
          { k:'w1', n:1, from:2, auto:'evidence',
            text:'Argument — a claim built on evidence.',
            levels:{
              AD:'I show why my evidence supports my claim and not the nearby claim it could be mistaken for.',
              A:'My claim is stated clearly and every part of it is supported with evidence.',
              B:'I have a claim and some support, but the two do not always meet.',
              C:'I assert a position with no evidence.'}},
          { k:'w2', n:2, from:3, auto:null,
            text:'Counterargument — the strongest objection, answered.',
            levels:{
              AD:'I take on the objection that would cost me most, and I answer it without dismissing it.',
              A:'I state an opposing viewpoint fairly and I refute it.',
              B:'I mention that others disagree.',
              C:'I ignore the other side.'}},
          { k:'w3', n:3, from:2, auto:null,
            text:'Rhetoric — ethos, pathos and logos used on purpose.',
            levels:{
              AD:'I can say why I chose each appeal where I chose it.',
              A:'I use rhetorical strategy deliberately, and it fits the audience.',
              B:'There is rhetoric, but it looks accidental.',
              C:'The essay has no rhetorical shape.'}},
          { k:'w4', n:4, from:4, auto:'linkers',
            text:'Cohesion and register — formal, and held together.',
            levels:{
              AD:'My cohesive devices carry the logic: the reader could follow the argument from them alone.',
              A:'Formal register throughout, with cohesive devices that hold the argument together.',
              B:'The register slips, or the connectors are repetitive.',
              C:'Conversational, with paragraphs that do not connect.'}},
          { k:'w5', n:5, from:5, auto:null,
            text:'Precision — colons, semicolons and dashes doing work.',
            levels:{
              AD:'My advanced punctuation changes the meaning of the sentence, and it is right.',
              A:'I use a colon, a semicolon or a dash correctly, and my drafts show improvement.',
              B:'I try advanced punctuation and it goes wrong, or I avoid it.',
              C:'Basic punctuation gets in the way of my meaning.'}}
        ]
      }
    }
  },

  /* =========================================================== 11.o ==== */
  g11: {

    /* ---- U4 · Rhetorical Mastery and Global Discourse ------------------ */
    4: {
      report: {
        task:'Position script', spec:'Academic register',
        nota:'Criterios 2, 3 y 4 del planner; los descriptores se redactan a partir de ellos.',
        fuera:'Criterion 1 (Delivery) — the talk at the conference.',
        criteria:[
          { k:'w1', n:1, from:2, auto:null,
            text:'Position — unmistakable, and argued.',
            levels:{
              AD:'My position is one a delegate could vote on, and I say what I would concede to get it.',
              A:'My position on the global issue is unmistakable and I build the argument for it.',
              B:'I have a position but it is buried in the background information.',
              C:'I describe the issue without taking a position.'}},
          { k:'w2', n:2, from:3, auto:'evidence',
            text:'Sources — credible, cited and synthesised.',
            levels:{
              AD:'I synthesise several sources into a claim none of them makes on its own.',
              A:'I bring credible evidence, I say where it comes from, and I judge its relevance.',
              B:'I cite sources but I do not weigh them.',
              C:'I use whatever supports me, without saying where it is from.'}},
          { k:'w3', n:3, from:2, auto:null,
            text:'The opposing perspective, and your rebuttal.',
            levels:{
              AD:'I answer the strongest version of the opposing view, not a weaker one.',
              A:'I take on an opposing perspective and rebut it with evidence.',
              B:'I acknowledge that others disagree.',
              C:'There is no opposing view in the script.'}},
          { k:'w4', n:4, from:4, auto:'linkers',
            text:'Register, connectors and advanced punctuation.',
            levels:{
              AD:'The script reads aloud as well as it reads on the page.',
              A:'Academic register, connectors that carry the argument, and advanced punctuation used correctly.',
              B:'The register slips, or the punctuation is decorative.',
              C:'Conversational, with sentences that do not connect.'}}
        ]
      },
      reflection: {
        task:'Reflection', spec:'Around 100 words', range:[80,160],
        nota:'Se mide lo que el alumno sabe decir de como comunico, no de lo que sabia.',
        criteria:[
          { k:'w1', n:1, from:1, auto:null,
            text:'What landed, and what did not.',
            levels:{
              AD:'I explain why the part that landed worked, and I could repeat it on purpose.',
              A:'I say what worked in my communication and what did not, with an example.',
              B:'I say it went well or badly.',
              C:'I describe what I did.'}},
          { k:'w2', n:2, from:4, auto:null,
            text:'What you would change.',
            levels:{
              AD:'My change is specific enough to be tested next time.',
              A:'I name one thing I would change, and why.',
              B:'I say I would prepare more.',
              C:'I would change nothing.'}},
          { k:'w3', n:3, from:4, auto:'structure',
            text:'Clarity and length — around 100 words.',
            levels:{
              AD:'Every sentence adds something new.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Too short to say anything, or padded to reach the count.'}}
        ]
      }
    }
  },

  };

  /* --------------------------------------------------------------- API */

  /* La rubrica de un entregable escrito. kind es el mismo de
     unit_submissions ('report', 'reflection'), asi que la fila entregada
     sabe sola con que se corrige. */
  function get(grade, unit, kind){
    const g = DATOS[grade]; if(!g) return null;
    const u = g[unit];      if(!u) return null;
    return u[kind] || null;
  }

  /* Nota vigesimal a partir de los niveles puestos. Solo cuenta los
     criterios calificados: media a medio corregir sigue siendo honesta. */
  function nota(rub, puestos){
    const vs = (rub.criteria||[]).map(function(c){ return VIGESIMAL[puestos[c.k]]; })
                                 .filter(function(v){ return v != null; });
    if(!vs.length) return null;
    return Math.round(vs.reduce(function(a,b){ return a+b; }, 0) / vs.length);
  }

  /* De nota vigesimal a letra, con los tramos del MINEDU. */
  function nivelDeNota(n){
    if(n == null) return null;
    return n >= 18 ? 'AD' : n >= 14 ? 'A' : n >= 11 ? 'B' : 'C';
  }

  /* El nivel global de la produccion. Es lo que se lleva a la columna
     Writing de Productos de unidad. */
  function global(rub, puestos){ return nivelDeNota(nota(rub, puestos)); }

  /* Cuantos criterios de la rubrica estan calificados. */
  function completos(rub, puestos){
    return (rub.criteria||[]).filter(function(c){ return puestos[c.k]; }).length;
  }

  return { NIVELES:NIVELES, VIGESIMAL:VIGESIMAL, SIGNIFICA:SIGNIFICA,
           datos:DATOS, get:get, nota:nota, nivelDeNota:nivelDeNota,
           global:global, completos:completos };
})();
