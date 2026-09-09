/* La version inglesa de la propuesta de las once semanas (scope-u56.js).
 *
 * POR QUE UN ARCHIVO APARTE Y NO UN L(en, es) DENTRO DE scope-u56.js
 * Porque el castellano de ese archivo es el documento que firma coordinacion
 * y no debe moverse por una traduccion; porque asi la traduccion se puede
 * revisar de un vistazo, entera y seguida; y porque si algun dia falta, la
 * pagina sigue funcionando en castellano sin enterarse.
 *
 * COMO SE USA
 * Las claves son las mismas que en scope-u56.js: `grados[n].semanas[i]` va en
 * el mismo orden, y los campos se llaman igual. `textoU56(objeto, campo)` en
 * unidad56.html devuelve el ingles cuando el idioma es 'en' y hay traduccion,
 * y el castellano en cualquier otro caso.
 *
 * EL PREFIJO DE PROCEDENCIA se traduce tambien: "Del plan:" -> "From the
 * plan:", "Del Scope:" -> "From the Scope:". RE_FUENTE reconoce los cuatro.
 */
(function(){

/* Misma firma que la de scope-u56.js, sin `de` ni `cubre`: eso no se traduce. */
function s(n, foco, lengua, lectura, escritura, oral, hito){
  return {n:n, foco:foco, lengua:lengua, lectura:lectura,
          escritura:escritura, oral:oral, hito:hito};
}

window.SCOPE_U56_EN = {

fuente:'scope/scope-2026.json (NIS_English_Master_SS_2026.xlsx) and scope/secundaria-conexiones-2026.json',

etapas:{
  primaria:{
    label:'Primary',
    titulo:'Period 5 and Period 6 are one single eleven-week unit',
    lead:'Instead of period 5 (five weeks, 14 September to 23 October) and period 6 (six weeks, '+
      '26 October to 4 December) as two units, one single eleven-week plan per grade, with one '+
      'product and one grade.',
    reparto:'weeks 1-5 = P5 · weeks 6-11 = P6',
    razones:[
      ['The calendar already treats them as one',
       'In the Annual Plan itself both periods are «term 3», and their dates run on without a break: '+
       'P5 ends on Friday 23 October and P6 starts on Monday the 26th. There is no real cut in '+
       'between, only a change of number.'],
      ['The exam falls inside period 6',
       'Cambridge is on 2 December and period 6 ends on the 4th. With two units, the sixth one starts '+
       'on 26 October and has to assess its own content in the same week as the exam. With one, the '+
       'second piece is handed in on week 10 and November is left for revision.'],
      ['There are subjects that never appear in these eleven weeks',
       'Music does not appear in a single week in any of the five grades; Art, in four out of five. '+
       'In Grade 4 there is no English either, no Social Studies and no Tutoría. An integrating '+
       'product across eleven weeks gives them somewhere to come in without forcing them to plan two '+
       'separate units.'],
      ['The English is written down — in the Scope',
       'What never reached the annual plan is in the Scope & Sequence, which carries U5 and U6 in '+
       'full for all five grades, with their vocabulary, grammar, reading plan and two written '+
       'texts. This proposal invents no content: it places the content that already exists.']
    ],
    calendario:[
      {cuando:'14 Sep – 23 Oct', que:'Period 5 of the Annual Plan (5 weeks)', donde:'weeks 1 to 5 of the unit'},
      {cuando:'October', que:'MOCK EXAM 2 — final rehearsal under official conditions (Grades 2, 4 and 5)', donde:'weeks 4 to 6'},
      {cuando:'26 Oct – 4 Dec', que:'Period 6 of the Annual Plan (6 weeks)', donde:'weeks 6 to 11'},
      {cuando:'2 December', que:'OFFICIAL CAMBRIDGE EXAM — Starters (G2), Movers (G4) and Flyers (G5)',
       donde:'inside week 11, two days before the period ends'}
    ],
    alerta:'<b>Sitting the official exam on 2 December:</b> Grade 2 (Starters), Grade 4 (Movers) and '+
      'Grade 5 (Flyers). Grades 1 and 3 are preparation years and do not sit it: their November can '+
      'be real content.',
    pide:['<b>What is being asked of Primary coordination</b>',
      'That term 3 be planned as <b>one eleven-week unit</b> — not as P5 plus P6 — with two graded '+
      'pieces inside it (week 5 and week 10) and the portfolio at the end, so that the week of the '+
      'exam carries no new submission. The interdisciplinary project for the term is already written '+
      'across eleven weeks in the portal, subject by subject and week by week.']
  },
  secundaria:{
    label:'Secondary',
    titulo:'Unit 5 and Unit 6 are one single eleven-week unit',
    lead:'Instead of a six-week unit in September and a five-week one in November, one single '+
      'eleven-week plan per grade, with one product and one grade.',
    reparto:'weeks 1-6 = U5 · weeks 7-11 = U6',
    razones:[
      ['U6 does not exist',
       'The six «Project 5 (U6) – November» documents are blank across the nine subjects of all six '+
       'grades, and all six are the same template copied over: even the header reads «GRADE: 6 / '+
       'UNIT 3». This is not one subject that was forgotten; that unit was never planned.'],
      ['November is already taken',
       'The Scope’s own calendar puts Mock 2 in October, enrolment and the last mile in October and '+
       'November, and the official Cambridge exam on 2 December. Opening six weeks of new content '+
       'there competes with the final stretch.'],
      ['The Scope already treats them as one',
       'The reading plan is a single book cut in half (U5 the first part, U6 «Ch. X–end + comparative '+
       'essay»); U6 closes with the end-of-term portfolio, which assesses eleven weeks and not five; '+
       'and in Grade 11 U6 is not even content: it is called «C1 Mastery & IB Diploma Exam».'],
      ['The Show stays inside',
       'The Creative Arts Show falls in U5 and is the only thing loaded in four grades. With the '+
       'eleven-week unit the Show closes the first half instead of cutting the term in two.']
    ],
    calendario:[
      {cuando:'October', que:'MOCK EXAM 2 — final rehearsal under official conditions', donde:'falls in weeks 4 to 6 of the unit'},
      {cuando:'October – November', que:'Final prep + Cambridge enrolment (100 % enrolled by mid-November)', donde:'weeks 6 to 11'},
      {cuando:'2 December', que:'OFFICIAL CAMBRIDGE EXAM — Grades 6, 8, 9 and 11', donde:'the week after the unit closes'}
    ],
    alerta:'<b>Sitting the official exam on 2 December,</b> according to the Scope’s pathway and its '+
      'calendar — which agree: Grade 6 (A2 Key), Grade 8 (B1 Preliminary), Grade 9 (B2 First) and '+
      'Grade 11 (C1 Advanced). Grades 7 and 10 would be bridge years and would not sit it: their '+
      'November can be new content, and this proposal uses it.',
    pide:['<b>What is being asked of coordination</b>',
      'Not to load U6 from scratch across nine subjects and six grades — 54 documents — but to extend '+
      'U5 to eleven weeks and sign <b>one</b> plan per grade, with two graded pieces inside it (one in '+
      'week 5 and another in week 9 or 10) and the term portfolio at the end. The other subjects copy '+
      'the same duration: the interdisciplinary project for the term is already written across eleven '+
      'weeks in the portal.']
  }
},

discrepancia:{
  titulo:'Who sits B2 First: Grade 9 or Grade 10?',
  fuentes:[
    ['Scope & Sequence 2026 (pathway and calendar)', 'Grade 9 sits B2 First on 2 December. Grade 10 does not sit it: it is «FCE consolidation / CAE bridge».'],
    ['The Cambridge courses already built and live in the portal', 'Grade 9 runs B1 Preliminary (PET, units 7-12) and Grade 10 runs B2 First (six units).']
  ],
  porque:'Both readings are defensible and both are written down. It matters now because Cambridge '+
    'enrolment closes in mid-November — week 9 of this unit — and because it changes what each of the '+
    'two grades does in weeks 7 to 11: preparing an exam three weeks away is not the same as '+
    'consolidating for next year.',
  mientras:'Until it is settled, the eleven weeks work for both Grade 9 and Grade 10 either way: the '+
    'Scope content is the same. What changes is how much weight week 11 carries.'
},

examen:{1:'— (Pre-Starters preparation)', 2:'Cambridge Starters', 3:'— (Pre-Movers preparation)',
        4:'Cambridge Movers', 5:'Cambridge Flyers',
        6:'Cambridge A2 Key (KET)', 7:'— (KET+ / PET bridge)', 8:'Cambridge B1 Preliminary (PET)',
        9:'Cambridge B2 First (FCE)', 10:'— (FCE consolidation / CAE bridge)', 11:'Cambridge C1 Advanced (CAE)'},

ui:{
  eyebrow:'proposal to coordination',
  porQue:'Why',
  calendarioTit:'The calendar this has to fit',
  huecosTit:'Which subjects never reach these eleven weeks',
  huecosSub:'Counted live against the school’s Annual Plan, periods 5 and 6. This is the gap an '+
    'eleven-week integrating product can cover.',
  colGrado:'Grade', colCero:'Not one week in the eleven', colPoco:'Three weeks or fewer',
  colCuando:'When', colQue:'What', colDonde:'Where it falls in the unit',
  colSemana:'Week', colFoco:'Focus', colLengua:'Language', colLectura:'Reading',
  colEscritura:'Writing', colOral:'Speaking & listening', colHito:'Milestone',
  gana:'What this grade gains',
  disc:'Unsettled, and it has to be settled before enrolment',
  cober:'blocks of the Scope for U5 and U6, placed',
  coberOk:'Nothing from the two units is left out. Checked against scope/scope-2026.json when this page opened.',
  coberMal:'block(s) of the Scope with no week assigned',
  falta:'Missing:', sobra:'Declared and not in the Scope:',
  leyenda:'Stripe coloured by the half it comes from:',
  leyendaA:'content from', leyendaB:'content from',
  leyendaFin:'The two graded pieces are marked in green.',
  fuentePie:'Built on', fuentePie2:'Coverage at the end of each grade is calculated live against those files. Split:',
  todo:'All of', grados:'grades', unaUnidad:'one unit', planLector:'Reading plan:',
  semana:'Week', delScope:'from the Scope', evidencia:'GRADED PIECE'
},

grados:{

/* ------------------------------------------------------------------ G1 */
1:{
  temaU5:'My Family', temaU6:'Food & Fun',
  reader:'The Family Book (T. Parr) and The Very Hungry Caterpillar (E. Carle)',
  titulo:'My family and our table',
  hilo:'Who lives in my house and what we eat when we are together. It is the same table in both '+
    'halves: first you draw who sits at it, then what is on it. In Grade 1 this unit is not an '+
    'improvement, it is the only planning there is: across the eleven weeks the annual plan loads '+
    'English and nothing else.',
  escritura:[{de:'U5', que:'Family tree with labels and the sentence «This is my ___»'},
             {de:'U6', que:'«My plate»: draw and label 3-4 foods, with I like / I don’t like'}],
  semanas:[
    s(1,'Who is in my house',
      'Family members: mum, dad, sister, brother, grandma, grandpa. Adjectives: old, young, happy, kind. Initial sounds of family vocabulary.',
      'The Family Book, shared reading.','Drawing of my family.','Introducing my family: This is my mum.',
      'My family drawing'),
    s(2,'Reading the family',
      'Blending CVC words.','Match word to picture; read simple sentences: This is my dad. Illustrated family-tree diagrams.',
      'Match the word to the photo before writing.','Describing: She is tall.','Word–picture match'),
    s(3,'My, your, his, her',
      'Possessive adjectives: my, your, his, her. TO BE: She is my grandma. Numbers as adjectives: two sisters.',
      '—','Sentences with the right possessive.',
      'Listening: identify family members in a description; Who is it? riddles.','Possessives'),
    s(4,'The family tree',
      'Beginning-sound sorting.','—',
      'Family tree with labels; copy «This is my ___ . He/She is ___». From the drawing to the sentence using the frame.',
      'Listen and circle: the family photo task.','Family tree'),
    s(5,'Sharing my family',
      'Review.','—','Exit ticket: one sentence about my family. FIRST GRADED PIECE.',
      'Pair work: my family photo presentation.','Family presentation'),
    s(6,'What is on the table',
      'Food: apple, banana, bread, milk, egg, cake, water, juice. I like… / I don’t like… Review of all short vowels.',
      'The Very Hungry Caterpillar: start the book.','Food word bank.','Saying what I like.','Food word bank'),
    s(7,'Reading the menu',
      'Word–picture matching.','Read and match food pictures and words; complete «I like ___» with a word bank. Illustrated food charts and simple menus.',
      'Choose the right word from the bank.','Ordering in the classroom café.','Menu reading'),
    s(8,'I like, I don’t like',
      'Like + noun: I like apples. Don’t like + noun. Full simple sentence: subject + verb + object.',
      '—','Full sentences using the structure.',
      'Listening: identify foods in dialogues; like/don’t like listen-and-tick survey.','Full sentences'),
    s(9,'My plate',
      'Sound review.','—','Draw and label «My plate» with 3-4 foods; copy «I like ___ . I don’t like ___».',
      'Role play: ordering food.','My plate'),
    s(10,'The caterpillar ends',
      'End-of-year phonics chant.','The Very Hungry Caterpillar: finish, sequence and retell.',
      'Final version of «My plate». SECOND GRADED PIECE.',
      'Naming the foods in the story; Fruit Salad song.','Retell + plate'),
    s(11,'My six drawings',
      'General review.','—','End-of-year portfolio: my six drawings.',
      'Oral sharing: my favourite unit.','Portfolio')
  ],
  gana:['Grade 1 has NOTHING loaded across the eleven weeks except English: no Maths, no Science, no Comunicación, no Social Studies, no Art, no Music, no Tutoría. One unit with an integrating product is the only way this term gets a plan at all.',
        'The two books in the Scope — The Family Book and The Very Hungry Caterpillar — are the same table: who sits at it and what gets eaten. Across eleven weeks both can be read with time to go back to the first.',
        'Grade 1 sits no Cambridge exam in December, so week 11 is a real end-of-year close: the portfolio of the six drawings.']
},

/* ------------------------------------------------------------------ G2 */
2:{
  temaU5:'Food & Health', temaU6:'Hobbies & Play',
  reader:'Eat Your Peas (K. Gray) and Horrid Henry’s Football Fiend (F. Simon, adapted)',
  titulo:'What I eat and what I play',
  hilo:'The two halves are the same day in the life of a seven-year-old: what goes in the mouth and '+
    'what happens afterwards. The first teaches how to give advice (should / shouldn’t) and the '+
    'second how to say how often you do what you enjoy.',
  escritura:[{de:'U5', que:'Healthy eating poster: 5 bullet points with I should / I shouldn’t'},
             {de:'U6', que:'Hobby paragraph, 60-80 words'}],
  semanas:[
    s(1,'Food and the body',
      'Food groups: fruit, vegetables, dairy, meat, bread. Healthy vs unhealthy. Aches: headache, stomachache, cold, toothache. Long vowels ee, ea, oo.',
      'Eat Your Peas: start the book.','Two columns: healthy / unhealthy.','Saying what I eat and drink.','Two columns'),
    s(2,'Reading a leaflet',
      'Vowel sorting.','Read and identify healthy or unhealthy food; find information in a simple health leaflet. Short texts about habits.',
      'Brainstorm in two columns.','Survey: what do you have for breakfast?','Health leaflet'),
    s(3,'Should and shouldn’t',
      'Should / shouldn’t for advice. Countable and uncountable nouns. Some / any (intro).',
      '—','Five sentences with should / shouldn’t.',
      'Listening: match health problem to advice; a story at the doctor’s.','Advice sentences'),
    s(4,'The poster',
      'Self-check: «2 stars & 1 wish».','—',
      'Healthy eating poster with five bullet points; draft of the five sentences.',
      'Role play at the doctor’s: I have a headache.','Healthy poster'),
    s(5,'One healthy tip',
      'Peer review.','Eat Your Peas: finish and discuss.',
      'Final version of the poster. FIRST GRADED PIECE.',
      'Sharing one healthy tip with the class.','Poster + tip'),
    s(6,'What I play',
      'Sports and games: football, swimming, cycling, tennis, basketball. Toys. Frequency: every day, on Saturdays. Review of blends and digraphs.',
      'Horrid Henry’s Football Fiend: start the book.','Mind map of my hobby.','Talking about hobbies: I like playing…','Hobby mind map'),
    s(7,'Who does what',
      'Sentence stress: I like playing football.','Read and match hobby to person; identify frequency words in a short text. Illustrated texts about hobbies.',
      'Notes from the mind map.','Pair work: what do you do on Saturdays?','Match hobby–person'),
    s(8,'How often',
      'Present Simple: like + -ing. Adverbs of frequency: always, usually, sometimes, never. Question: Do you like…? Yes, I do / No, I don’t.',
      '—','Sentences with a frequency adverb.',
      'Listening: tick sports in a timetable; after-school dialogue; Starters listen-and-draw.','Frequency'),
    s(9,'My favourite hobby',
      'Self-check: does it make sense?','—',
      'Hobby paragraph, 60-80 words: My favourite hobby is… I like it because…',
      'Short presentation: my favourite sport.','Hobby paragraph'),
    s(10,'Henry ends',
      'End-of-year phonics game.','Horrid Henry’s Football Fiend: finish.',
      'Final version of the paragraph. SECOND GRADED PIECE.',
      'Structured presentation to the class.','Paragraph + talk'),
    s(11,'Starters week',
      'Whole-year review.','—','End-of-term portfolio: favourite piece.',
      'Oral: what have I learned this year?','Portfolio + exam')
  ],
  gana:['Grade 2 sits Cambridge Starters on 2 December and period 6 ends on the 4th: the exam falls INSIDE the last week. With one unit, the second piece is handed in on week 10 and week 11 is revision, not a new submission competing with the exam.',
        'Art and Music do not appear in a single one of the eleven weeks, and Social Studies in only one. An eleven-week integrating product gives them a place without making them plan two units.',
        'Food (U5) and play (U6) are the same day for a child: in one unit they can cross — what I eat before I play — and in two they stay as two separate topics.']
},

/* ------------------------------------------------------------------ G3 */
3:{
  temaU5:'When the Earth Moves', temaU6:'My Community',
  reader:'Earthquakes, Volcanoes and Tsunamis (Raz-Plus, 730L) and The Lorax (Dr. Seuss)',
  titulo:'When the earth moves, who helps',
  hilo:'The first half teaches what to do when something serious happens; the second, who comes to '+
    'help. It is one question split in two: the firefighter, the police officer and the doctor of U6 '+
    'are exactly the people in the U5 drill.',
  escritura:[{de:'U5', que:'Safety flyer: before, during and after, 90-110 words'},
             {de:'U6', que:'Community helper profile, 90-110 words'}],
  semanas:[
    s(1,'When the earth moves',
      'Natural disasters: earthquake, tsunami, flood, landslide. Safety: danger, safe place, exit, shelter, drill, helmet. Syllables in long words and the /kw/ sound.',
      'Earthquakes, Volcanoes and Tsunamis: start.','Emergency kit list.','Naming what has to be in it.','Emergency kit list'),
    s(2,'Before, during, after',
      '-ache as one sound: headache, stomachache, backache.',
      'Find a safety instruction inside an informative text; put the steps in order; use headings, captions and diagrams. Informative texts with diagrams, and a flyer read as a model.',
      'Plan the flyer in three parts.','Saying where it hurts: My leg hurts.','Steps in order'),
    s(3,'Drop, cover, hold on',
      'Modals for rules and advice: must / must not, should, have to. Imperatives for instructions. Past Simple to tell what happened: was/were and -ed verbs.',
      '—','Instructions in the imperative and advice with modals.',
      'Listening: safety instructions in order; identify the kit items named.','Instructions'),
    s(4,'The safety flyer',
      'Peer check: could a younger child follow this?','—',
      'Safety flyer of 90-110 words, in three sections with a heading, one instruction and a drawing.',
      'Giving advice: You should… / You must not…','Safety flyer'),
    s(5,'Presenting the flyer',
      'Reflection: does my family have a meeting point and a kit at home?',
      'Earthquakes, Volcanoes and Tsunamis: finish.',
      'Final version of the flyer. FIRST GRADED PIECE.',
      'Presenting my flyer to the class.','Flyer + presentation'),
    s(6,'Who helps',
      'Community helpers: doctor, teacher, firefighter, police officer, baker, librarian, vet. Places and verbs: help, protect, serve, bake, heal. Review of vowel digraphs.',
      'The Lorax: start the book.','Match helper to place of work.','Describing what someone does.','Helpers and places'),
    s(7,'What they do',
      'Sentence stress and rhythm.','Identify what each helper does; match helper to place of work in a text. Illustrated texts about community helpers.',
      'Interview notes.','Role play: interviewing a helper.','Interview notes'),
    s(8,'He helps, she protects',
      'Present Simple with he / she. Articles a / an / the, expanded. Conjunction so: I was tired, so I rested.',
      '—','Profile sentences in the third person.',
      'Listening: identify helpers in descriptions; what does a firefighter do?','Third person'),
    s(9,'The profile',
      'Peer review: any missing information?','—',
      'Community helper profile, 90-110 words: name, job, place of work and why it matters.',
      'Thanking a community helper.','Helper profile'),
    s(10,'The Lorax ends',
      'End-of-year phonics quiz.','The Lorax: finish; community and environment.',
      'Final version of the profile. SECOND GRADED PIECE.',
      'Group presentation: Our Community Helpers.','Profile + presentation'),
    s(11,'Three things I learned',
      'General review.','—','End-of-term reflection: three things I learned.',
      'Peer appreciation: say something nice.','Reflection')
  ],
  gana:['This is the cleanest crossing in Primary: the community helpers of U6 are the people from the U5 drill. In two units it is lost; in one, the safety flyer is handed to the people who will use it.',
        'Maths appears in only 3 of the 11 weeks in the plan, and Comunicación, Art and Music in none. An eleven-week product gives them somewhere to come in.',
        'Grade 3 sits no Cambridge exam in December (it is Movers preparation): its November can be real content.']
},

/* ------------------------------------------------------------------ G4 */
4:{
  temaU5:'Holidays & Travel', temaU6:'My Future',
  reader:'Around the World in 80 Days (Oxford Bookworms 2) and readings about young achievers',
  titulo:'Where I was and where I am going',
  hilo:'Eleven weeks between two tenses: the first half tells, in the past, a trip that already '+
    'happened, and the second announces, in the future, a job that has not. Same student, same '+
    'paragraph structure, two tenses.',
  escritura:[{de:'U5', que:'Holiday recount in Past Simple, 120-150 words'},
             {de:'U6', que:'Future ambitions paragraph, 120-150 words'}],
  semanas:[
    s(1,'Where I went',
      'Holiday vocabulary: beach, mountains, camping, sightseeing, souvenir, sunscreen. Weather: freezing, boiling, humid, mild. Sentence stress in past narratives.',
      'Around the World in 80 Days: start the book.','Time chart: when? where? what?',
      'Telling where I went.','Time chart'),
    s(2,'The order of a story',
      'Weak forms: was /wəz/, were /wə/.',
      'Sequence events in a holiday narrative; identify past time expressions. Holiday brochures and postcards.',
      'Connectors: first, then, after, finally.','Describing a holiday photo.','Events in order'),
    s(3,'Past simple, all of it',
      'Past Simple regular and irregular, full conjugation; questions with Did you…? and negatives with didn’t; time expressions: yesterday, last week, in 2023, ago.',
      '—','The verbs of the recount, conjugated.',
      'Listening: sequence a holiday story; where did they go and what did they do?','Past simple'),
    s(4,'The recount',
      'From the time chart to the draft.','—',
      'Holiday recount, 120-150 words: where, when, what I did and the highlight.',
      'Telling the story of my last holiday in the past.','Holiday recount'),
    s(5,'The recount, delivered',
      'Peer review «2 stars, 1 wish»; reflection: what was the best part of my recount?',
      'Around the World in 80 Days: continue.',
      'Final version of the recount. FIRST GRADED PIECE.',
      'Class survey: where did you go?','Recount + survey'),
    s(6,'What I want to be',
      'Jobs and future: engineer, scientist, artist, athlete, entrepreneur, programmer. Ambitions: I want to be…, I’d like to… Intonation of future sentences.',
      'Readings about young achievers: start.','Goal-setting timeline.','Talking about my dream job.','Goal timeline'),
    s(7,'Reading about others',
      'Stress: I WILL be a doctor.','Identify main idea and details in an article; match heading to paragraph. Short articles about young people and careers.',
      'Notes from the article read.','Pair work: dream job interview.','Main idea'),
    s(8,'Going to and will',
      'Going to for plans and intentions; will for predictions and spontaneous decisions; want to / would like to for ambitions.',
      '—','Self-check of the verb forms.',
      'Listening: interviews about future jobs; fill in name, ambition and reason.','Future forms'),
    s(9,'My ambitions',
      'From the timeline to the draft.','—',
      'Future ambitions paragraph, 120-150 words: I want to be… because… I am going to…',
      'Talking about my ambition to the group.','Ambitions paragraph'),
    s(10,'The careers fair',
      'Review of all phonics patterns from G1 to G4.','Finish the readings about young achievers.',
      'Final version of the paragraph. SECOND GRADED PIECE.',
      'Group presentation: Future Careers Fair.','Paragraph + fair'),
    s(11,'Movers week',
      'General review.','—','End-of-year portfolio; goals: what will I do in Grade 5?',
      'Oral revision in exam format.','Portfolio + exam')
  ],
  gana:['This is the finding to take to the meeting: Grade 4 sits Cambridge Movers on 2 December and the annual plan has NO English loaded in any of the eleven weeks before it. No Social Studies either, no Art, no Music and no Tutoría: four subjects out of nine.',
        'The Scope does have those eleven weeks written down — Holidays & Travel and My Future — so the eleven-week unit invents nothing: it recovers what already exists and never reached the plan.',
        'Past Simple (U5) and future forms (U6) are the same competence in two tenses, and Movers tests both: in one unit they are taught as a pair rather than as two topics.']
},

/* ------------------------------------------------------------------ G5 */
5:{
  temaU5:'Health & Wellbeing', temaU6:'Adventures & Experiences',
  reader:'The Crossover (K. Alexander) and Percy Jackson #1 or Into the Wild (adapted)',
  titulo:'Looking after myself, and daring',
  hilo:'First you learn to give advice about your own body and your own head; then you tell an '+
    'adventure where you had to hold on. The advice from the first half is what keeps the character '+
    'of the second going.',
  escritura:[{de:'U5', que:'Health advice blog post, 180-230 words'},
             {de:'U6', que:'Adventure narrative, 200-260 words'}],
  semanas:[
    s(1,'Body and mind',
      'Health and medicine: vaccination, symptoms, diagnosis, prescription, allergy, first aid. Mental health: stress, anxiety, wellbeing, resilience. Intonation for advice: You SHOULD rest.',
      'The Crossover: start the selected chapters.','Structure: problem → cause → advice → result.',
      'Giving and responding to health advice.','Advice structure'),
    s(2,'Is this advice any good',
      'Connected speech: What’s the matter?','Understand implied advice and recommendations; evaluate the logic of a health claim. Health advice articles and wellbeing blogs.',
      'Peer check: is the advice convincing?','Role play: pharmacist and patient.','Claim check'),
    s(3,'Should, ought to, might',
      'Modal verbs: should, ought to, might, could. Passive Voice in Present Simple (intro). Gerund vs infinitive: enjoy + -ing, want + to.',
      '—','Advice using the right modal.',
      'Listening: key details in a medical consultation; symptoms from causes.','Modals of advice'),
    s(4,'The blog post',
      'From the structure to the draft.','—',
      'Health advice blog post, 180-230 words, addressing the reader: You should / Why not try…',
      'Wellbeing tips for teenagers, in groups.','Health blog'),
    s(5,'How am I feeling',
      'Wellbeing journal: how am I feeling this term? What keeps me balanced?',
      'The Crossover: finish the selected chapters.',
      'Final version of the blog post. FIRST GRADED PIECE.',
      'Persuasive register when giving advice.','Blog + journal'),
    s(6,'The adventure',
      'Adventure and travel: expedition, backpacking, cruise, safari, pilgrimage. Past narratives: realised, discovered, overcame, survived. Emotional vocabulary: breathtaking, terrifying, unforgettable.',
      'Percy Jackson or Into the Wild: start.','Adventure planning sheet (5 Ws).','Telling a short adventure.','5 Ws sheet'),
    s(7,'How a story is built',
      'Fluency: retell without hesitation.','Analyse narrative structure: orientation, crisis, resolution; personal response with textual reference. Adventure travel narratives and memoir extracts.',
      'The outline of my narrative.','Pair work: travel photo story.','Story structure'),
    s(8,'While and when',
      'Past Simple with Past Continuous: while / when. Past Perfect (intro): I had already… Narrative connectors: eventually, meanwhile, suddenly, as a result.',
      '—','Test scenes using the three tenses.',
      'Listening: sequence a travel adventure; identify emotions; Flyers-style picture ordering.','Narrative tenses'),
    s(9,'The narrative',
      'Self-edit: vivid verbs, sensory detail, time expressions.','—',
      'Adventure narrative, 200-260 words, with Past Simple and Continuous and vivid adjectives.',
      'Narrating a real or imagined adventure, 3-4 minutes.','Adventure narrative'),
    s(10,'Amazing journeys',
      'Flyers-style long turn.','Percy Jackson or Into the Wild: finish.',
      'Final version of the narrative. SECOND GRADED PIECE.',
      'Group oral presentation: Amazing Journeys.','Narrative + presentation'),
    s(11,'Flyers week',
      'General review.','—',
      'End-of-year portfolio: my best three pieces; letter to my future Grade 6 self; review of the ten profile attributes.',
      'Oral revision in exam format.','Portfolio + exam')
  ],
  gana:['Grade 5 sits Cambridge Flyers on 2 December, and in the annual plan English drops to 2 of the 6 weeks of period 6, right before the exam. The eleven-week unit gives those weeks back to English without taking them from anyone: they are the ones the Scope already has written.',
        'It is the best-loaded grade in Primary — 8 subjects out of 9 in P6 — so merging here does not fill a gap: it tidies. One product instead of two keeps November from having two closes.',
        'The U6 adventure narrative calls for Past Simple, Continuous and Perfect: across eleven weeks there is room to teach them on top of the U5 health advice, which already used modals.']
}
,

/* ------------------------------------------------------------------ G6 */
6:{
  temaU5:'My Neighbourhood & Places', temaU6:'Free Time & Hobbies',
  reader:'The Prince and the Pauper (M. Twain), Black Cat A2',
  titulo:'My place and my time',
  hilo:'Where I live and what I do when I get to choose. The first half describes the place; the '+
    'second, what people do in it. The two written texts in the Scope are the same person telling '+
    'first about a place and then about a time.',
  escritura:[{de:'U5', que:'Neighbourhood report, 130-160 words'},
             {de:'U6', que:'Narrative recount, 150-200 words'}],
  semanas:[
    s(1,'The place, named',
      'Places in town and transport; prepositions of place. Intonation: questions vs statements.',
      'The Prince and the Pauper, ch. 1-3.','Loose sentences about the place, for the vocabulary bank.',
      'Saying where something is.','Vocabulary map'),
    s(2,'Reading a map',
      'Simple directions vocabulary.','Town maps and descriptions; locate information and follow step-by-step directions.',
      'The directions, written down.','Following directions in pairs.','Written directions'),
    s(3,'There is, there are',
      'There is / There are; prepositions of place; introduction to the Present Continuous.',
      'The Prince and the Pauper, ch. 4-6.','Report sentences using the new structure.',
      'Listening: directions on a map and travel announcements.','Grammar in use'),
    s(4,'The report, drafted',
      'Review of capitals and full stops.','Report models.',
      'Neighbourhood report, 130-160 words: first draft; peer feedback «2 stars & 1 wish».',
      'Reading the draft aloud.','First draft'),
    s(5,'The report, delivered',
      'Self-assessment with the vocabulary rubric.','—',
      'Final version of the report. FIRST GRADED PIECE.',
      'Pair work: describing the neighbourhood; giving and following directions.','Report + oral'),
    s(6,'Half the book, and the Show',
      'Review of the first half.','The Prince and the Pauper, ch. 7-8: closing the first part.',
      '—','Creative Arts Show: the grade’s concert.','Show + reader at half'),
    s(7,'What we do when we are free',
      'Sports, hobbies and leisure; frequency expressions; equipment and venues. Storytelling intonation and rhythm.',
      'Illustrated poems about hobbies.','Free-time survey.','Pair survey.','Free-time survey'),
    s(8,'What I can do',
      'Can / can’t for ability; like / love / hate + -ing; Let’s… and Why don’t we…? for suggestions.',
      '—','Ability and preference sentences for the recount.',
      'Listening: main idea in hobby stories; gap-fill in sports commentary.','Ability + suggestions'),
    s(9,'The weekend, told',
      'Past Simple in the recount.','—',
      'Narrative recount, 150-200 words: last weekend. Draft and self-editing checklist.',
      'Telling a partner about the weekend.','Narrative draft'),
    s(10,'The book ends',
      'Rhyme and rhythm in poems.','The Prince and the Pauper, ch. 9 to the end, with comparative discussion; personal response to illustrated texts.',
      'Final version of the recount. SECOND GRADED PIECE.','Discussion about the ending.','Reader finished + story'),
    s(11,'My hobby, presented',
      'General review.','—','End-of-term portfolio and traffic-light self-assessment.',
      'Oral presentation, 2-3 minutes, about my hobby, TED-style with visuals.','Talk + portfolio')
  ],
  gana:['The reader is read straight through across eleven weeks instead of being cut at chapter 8.',
        'The two written texts stop being two loose submissions: they are a descriptive text and a narrative one, by the same student about the same place.',
        'The unit closes in the last week of November and A2 Key is on 2 December: week 11 is useful revision, not new content.']
},

/* ------------------------------------------------------------------ G7 */
7:{
  temaU5:'Nature & Environment', temaU6:'Future Plans & Ambitions',
  reader:'Treasure Island (R.L. Stevenson), Vicens Vives A2/B1',
  titulo:'What is here, and what I will be',
  hilo:'What is alive around me and what I want to be doing in ten years. It is one question on two '+
    'timescales, and the last line of the term joins them: what would the job I chose do to what I '+
    'inventoried?',
  escritura:[{de:'U5', que:'Comparative paragraph, 200-250 words'},
             {de:'U6', que:'Future plans paragraph, 200-250 words'}],
  semanas:[
    s(1,'What is alive',
      'Wild and domestic animals, habitats and ecosystems, environmental adjectives. Intonation: surprise and enthusiasm.',
      'Treasure Island, part 1 (beginning).','Species files.','Naming and describing.','Species files'),
    s(2,'Two texts, one subject',
      '—','Nature fact files and descriptive articles; compare information across two texts and identify persuasive language.',
      'The comparison criteria, written down.','Contrasting what two sources say.','Criteria list'),
    s(3,'Must and must not',
      'Modals should / shouldn’t, must / mustn’t, have to / don’t have to; infinitive of purpose.',
      'Treasure Island, part 1 (closing).','Rules for looking after the habitat.',
      'Listening: key facts in nature documentaries; identifying opinions.','Rules of care'),
    s(4,'Comparing two',
      'PEEL paragraph structure.','—',
      'Comparative paragraph, 200-250 words, on two animals or two habitats: draft and peer review of ideas and vocabulary.',
      'Defending the comparison.','Comparative draft'),
    s(5,'The comparison, delivered',
      'Self-assessment of research skills; «two stars & a wish».','—',
      'Final version of the comparative paragraph. FIRST GRADED PIECE.',
      'Pair debate comparing two animals; oral report on an endangered species.','Paragraph + oral report'),
    s(6,'Half the island, and the Show',
      'Review of the first half.','Treasure Island, closing part 1.','—',
      'Creative Arts Show: the grade’s piece.','Show + reader at half'),
    s(7,'Jobs and ambitions',
      'Jobs and professions, personal ambitions and goals, future time expressions. Sentence rhythm in future sentences.',
      'Short interviews and opinion texts about careers.','Career vocabulary map.',
      'Saying what you want to be and why.','Career map'),
    s(8,'Going to and will',
      'Going to for plans and intentions; will for predictions and spontaneous decisions; Present Continuous for arrangements.',
      '—','Plan and prediction sentences, deliberately separated.',
      'Listening: main points in career-advice podcasts.','Future forms'),
    s(9,'My career in ten years',
      'Self-editing: grammar and spelling.','—',
      'Future plans paragraph, 200-250 words: draft and portfolio entry with the best piece.',
      'Pair work: interview simulation.','Future draft + interview'),
    s(10,'The island ends',
      '—','Treasure Island, part 2 to the end, with comparative discussion; characters’ opinions and intentions and personal response to opinion texts.',
      'Final version of the future paragraph. SECOND GRADED PIECE.',
      'Discussion: who changed in the novel?','Reader finished + plan'),
    s(11,'The talk',
      'General review.','—','End-of-term portfolio and traffic-light self-assessment.',
      'Short presentation about my future career, with an agreed structure.','Talk + portfolio')
  ],
  gana:['Grade 7 sits no official exam in December, so it is the grade where the long unit can be used in full for content.',
        'Both paragraphs in the Scope have the same length and the same format: across eleven weeks they can be asked for with a draft and a final version, which is what the Scope wants and what does not fit in five weeks.',
        'Treasure Island is read whole, without the cut between part 1 and part 2.']
},

/* ------------------------------------------------------------------ G8 */
8:{
  temaU5:'Our Planet', temaU6:'Stories & Narratives',
  reader:'The Giver (L. Lowry), Clarion Books',
  titulo:'The planet, and the stories we tell about it',
  hilo:'First you measure and argue with evidence; then you narrate. The dystopia in The Giver is the '+
    'bridge: the same reality, told as fiction, with the passive voice and reported speech as the two '+
    'grammars of «who says this».',
  escritura:[{de:'U5', que:'Informative text on an eco-problem, 250-300 words'},
             {de:'U6', que:'Short narrative story, 280-350 words'}],
  semanas:[
    s(1,'The problem, named',
      'Environmental problems and solutions, climate change vocabulary, eco-actions. Intonation for attitude and emphasis.',
      'The Giver, ch. 1-4.','Term bank with definitions.','Naming the chosen problem.','Problem file'),
    s(2,'Cause and effect',
      '—','Environmental news reports and infographics; skim and scan, and cause and effect in articles.',
      'The cause-effect outline of the problem.','Explaining the chain of causes.','Cause-effect map'),
    s(3,'Who does what to whom',
      'Passive Voice in Present and Past Simple; passive in Present Perfect; by + agent.',
      'The Giver, ch. 5-8.','Rewriting sentences in the passive, with and without the agent.',
      'Listening: main ideas in documentaries; facts and statistics.','Passive voice'),
    s(4,'Writing with evidence',
      'Paraphrasing sources; peer review of argument coherence.','—',
      'Informative text on an eco-problem, 250-300 words: draft with cited evidence.',
      'Presenting the draft to the group.','Informative draft'),
    s(5,'The argument, defended',
      'Concept map of the problem; self-assessment of research skills.','—',
      'Final version of the informative text. FIRST GRADED PIECE.',
      'Debate: is enough being done for the planet? Oral report on an environmental issue.','Text + debate'),
    s(6,'Half the book, and the Show',
      'Review of the first half.','The Giver, ch. 9-12: closing the first part.','—',
      'Creative Arts Show: the grade’s piece.','Show + reader at half'),
    s(7,'How a story is built',
      'Literary genres and story elements; narrative adjectives (gripping, chilling) and emotional vocabulary. Fluency through drama.',
      'Short story extracts and chapter openings.','The premise and the conflict, written down.',
      'Telling the premise out loud.','Premise + conflict'),
    s(8,'Narrative tenses',
      'Past Simple, Continuous and Perfect in narrative; reported speech with say / tell and tense backshift.',
      '—','Test scenes using the three tenses.',
      'Listening: narrative point of view in radio stories; sequence of past events.','Tenses + reported speech'),
    s(9,'The story, drafted',
      'Self-editing for narrative consistency.','—',
      'Short narrative story, 280-350 words: full draft.','Reading an extract to the group.','Story draft'),
    s(10,'The Giver ends',
      '—','The Giver, ch. 13 to the end, and comparative dystopia essay; analyse narrative structure, plot and conflict, and personal response with textual evidence.',
      'Final version of the story. SECOND GRADED PIECE.','Comparative discussion.','Reader finished + story'),
    s(11,'Told out loud',
      'General review.','—','End-of-term portfolio and metacognitive reflection: how have I improved?',
      'Telling the story using narrative tenses; group storytelling challenge.','Storytelling + portfolio')
  ],
  gana:['Grade 8 sits B1 Preliminary on 2 December. With the eleven-week unit, November is extended writing and speaking — what PET assesses — and not new vocabulary.',
        'The Giver is read whole: the comparative dystopia essay U6 asks for needs the book finished and a unit that has not already closed.',
        'The passive voice (U5) and reported speech (U6) are the same grammatical question — who says and who does — and in a single unit they are taught together.']
},

/* ------------------------------------------------------------------ G9 */
9:{
  temaU5:'Literature & Power', temaU6:'Justice & Ethics',
  reader:'The Time Machine (H.G. Wells), Vicens Vives B1.2',
  titulo:'Who tells it, and who it is fair to',
  hilo:'The first half teaches how to build a story; the second, how to judge one. Wells provides the '+
    'bridge: a future split into two classes is at once a narrative technique and a problem of justice.',
  escritura:[{de:'U5', que:'Short story with narrative tenses, 320-380 words'},
             {de:'U6', que:'For-and-against essay, 320-380 words'}],
  semanas:[
    s(1,'The elements',
      'Literary genres and narrative elements; emotional and sensory vocabulary; collocations of plot, character and theme. Prosody in narrative.',
      'The Time Machine, ch. 1-2.','The map of my own story.','Telling the premise.','Story map'),
    s(2,'Technique and voice',
      '—','Short story extracts and novel chapters; analyse narrative techniques — structure and voice — and respond with textual evidence.',
      'The analysis of one technique, applied to my own story.','Justifying a narrative choice.','Technique analysis'),
    s(3,'Narrative tenses',
      'Past Simple, Continuous and Perfect; Past Perfect Continuous; sequence adverbs (eventually, meanwhile, suddenly).',
      'The Time Machine, ch. 3-4.','Test scenes using the four tenses.',
      'Listening: point of view in literary extracts; inferring character motivation.','Four tenses'),
    s(4,'The story, drafted',
      'Narrative cohesion with time expressions; revising for consistent tense use.','—',
      'Short story, 320-380 words: full draft.','Reading a scene to the group.','Story draft'),
    s(5,'The story, delivered',
      'Self-assessment of narrative craft: what literary choices did I make?','—',
      'Final version of the story. FIRST GRADED PIECE.',
      'Oral narrative of a real or imagined story; collaborative group storytelling.','Story + oral narrative'),
    s(6,'Half the machine, and the Show',
      'Review of the first half.','The Time Machine, ch. 5-6: closing the first part.','—',
      'Creative Arts Show: the grade’s piece.','Show + reader at half'),
    s(7,'The global problem',
      'Global problems and solutions; NGOs and international organisations; formal debate vocabulary. Fluency and delivery for academic debate.',
      'Argumentative essays and formal articles.','The chosen issue, framed in writing.',
      'Framing the issue in thirty seconds.','The issue, framed'),
    s(8,'If we had known',
      'Third Conditional for the hypothetical past; wish and if only; contrast and concession with whereas and nevertheless.',
      '—','Both sides of the issue, in conditional sentences.',
      'Listening: positions in formal debates; distinguishing fact from speculation.','Third conditional'),
    s(9,'Both sides',
      'Self-editing for register and style; portfolio as evidence of progress.','—',
      'For-and-against essay, 320-380 words: draft presenting both positions before your own.',
      'Arguing the position opposite to your own.','Essay draft'),
    s(10,'The machine ends',
      '—','The Time Machine, ch. 7 to the end, and comparative essay on three novels; evaluate the logic and coherence of arguments and identify bias and fallacy.',
      'Final version of the essay. SECOND GRADED PIECE.','Comparative discussion.','Reader finished + essay'),
    s(11,'The formal debate',
      'General review.','—','End-of-term portfolio and R/A/G traffic light on grammar progress.',
      'Structured formal debate on a global issue, using Point–Evidence–Explanation.','Debate + portfolio')
  ],
  gana:['If Grade 9 sits B2 First in December — the Scope says so, though the portal courses give it to Grade 10: see the open question — the long unit leaves November for exam writing and speaking, which is what FCE measures. And if it does not sit it, those same weeks consolidate and nothing is lost.',
        'The for-and-against essay in U6 asks students to spot bias and fallacy, a skill built over weeks, not over five days.',
        'The comparative essay on three novels in U6 only makes sense with a whole term of reading behind it.']
},

/* ----------------------------------------------------------------- G10 */
10:{
  temaU5:'Sustainability & Action', temaU6:'Language, Career & Communication',
  reader:'Fahrenheit 451 (R. Bradbury), Simon & Schuster',
  titulo:'What I would change, and who I would be to change it',
  hilo:'The first half persuades; the second applies for the job. It is the same person: first '+
    'defending a cause in public, then asking for the post from which it would be carried out.',
  escritura:[{de:'U5', que:'Persuasive essay, 370-440 words'},
             {de:'U6', que:'CV + formal cover letter'}],
  semanas:[
    s(1,'The cause',
      'Ecology and sustainability vocabulary; environmental collocations; formal connectors (consequently, thereby). Prosody in persuasion.',
      'Fahrenheit 451, part 1.','The chosen cause, framed.','Framing the cause.','The cause, framed'),
    s(2,'Many sources, one argument',
      '—','Long-form environmental policy reports; synthesise information from several sources and introduce the annotated bibliography.',
      'The annotated bibliography.','Summarising a source in one minute.','Annotated bibliography'),
    s(3,'What would happen if',
      'Conditionals 2 and 3 across their full range; mixed conditionals; wish, if only, it’s time, would rather.',
      'Fahrenheit 451, part 2.','The scenarios, in the conditional.',
      'Listening: gist and detail in documentaries; evaluating argument logic.','Conditionals'),
    s(4,'The essay, drafted',
      'Revising for persuasive effect; tone, diction and formal register.','—',
      'Persuasive essay, 370-440 words: draft of the call to action.','Rehearsing the closing out loud.','Persuasive draft'),
    s(5,'The essay, defended',
      'Peer debate evaluation form; self-assessment of persuasive techniques.','—',
      'Final version of the persuasive essay. FIRST GRADED PIECE.',
      'Persuasive debate on environmental policy, point-counterpoint format.','Essay + debate'),
    s(6,'Half the book, and the Show',
      'Review of the first half.','Fahrenheit 451, closing parts 1-2.','—',
      'Creative Arts Show: the grade’s song (history of rock).','Show + reader at half'),
    s(7,'The professional world',
      'Career and professional communication; workplace collocations; formal vs informal register. Fluency strategies for the long turn.',
      'Job adverts, CVs and cover letters; genre conventions in professional documents.',
      'The chosen job and why.','Introducing yourself in thirty seconds.','The job, chosen'),
    s(8,'Formal register',
      'Future forms: will, going to, Present Continuous; Future Perfect and Continuous; nominalisation and impersonal structures.',
      '—','Rewriting sentences from the essay in formal register.',
      'Listening: reading formality in professional interviews; agreeing and challenging.','Future forms + register'),
    s(9,'CV and letter',
      'Proofreading checklist for the final edit.','—',
      'CV and formal cover letter: complete version. SECOND GRADED PIECE.',
      'Presenting the CV to a partner playing the employer.','CV + cover letter'),
    s(10,'Fahrenheit ends',
      '—','Fahrenheit 451, part 3 and the ending, and comparative dystopia essay.',
      'The comparative essay.','Discussion: a society that stopped reading.','Reader finished + essay'),
    s(11,'The interview',
      'General review.','—','End-of-year portfolio and career project self-assessment.',
      'Mock job interview and career presentation; professional communication strategies.','Mock interview + portfolio')
  ],
  gana:['According to the Scope, Grade 10 sits no official exam in December — it is FCE consolidation and a CAE bridge — so its November can be real content, and the long unit uses all of it.',
        'The CV and cover letter in U6 only make sense with a project behind them to talk about: the U5 persuasive essay is that project.',
        'Which of the two grades sits B2 First is still open: the Scope gives it to Grade 9 and the portal courses to Grade 10. That is the decision to take before enrolment, and it changes how much weight weeks 9 to 11 carry in both grades.']
},

/* ----------------------------------------------------------------- G11 */
11:{
  temaU5:'Politics, Society & Global Citizenship', temaU6:'C1 Mastery & IB Diploma Exam',
  reader:'Lord of the Flies (W. Golding), Penguin Books',
  titulo:'The word in public, and the exam that measures it',
  hilo:'In Grade 11 the merge is not a fix, it is the right shape: U6 in the Scope is not new content, '+
    'it is called «C1 Mastery & IB Diploma Exam». Eleven weeks of the same thing — using the language '+
    'in public at C1 level — with the external assessment at the end.',
  escritura:[{de:'U5', que:'Opinion article for publication, 450-550 words'},
             {de:'U6', que:'C1 exam writing: essay, report, proposal and formal letter, 350-500 words under timed conditions'}],
  semanas:[
    s(1,'The political word',
      'Political science: governance and sovereignty; social movements vocabulary; AWL set 7. Fluency and spontaneity in debate.',
      'Lord of the Flies, ch. 1-2.','The chosen public issue.','Taking a position without preparation.','The issue, chosen'),
    s(2,'Who is speaking',
      '—','Political speeches and policy documents; analyse political discourse and ideological stance, and identify linguistic manipulation.',
      'The analysis of a real speech.','Naming the device you spotted.','Discourse analysis'),
    s(3,'Judging what was done',
      'Advanced modals of deduction and criticism: must have, can’t have, should have, ought to have; parallel structures in formal writing; complex question tags and echo questions.',
      'Lord of the Flies, ch. 3-4.','Judgements on public decisions, in perfect modals.',
      'Listening: rhetoric and intent in political speeches; detecting persuasive techniques.','Advanced modals'),
    s(4,'The article, drafted',
      'Revising for style, cohesion and impact; varied sentence structures at C1.','—',
      'Opinion article for publication, 450-550 words: draft in editorial style with rhetorical devices.',
      'Reading the opening paragraph aloud.','Article draft'),
    s(5,'The article, published',
      'Political speech self-evaluation; reflecting on my own role as a global citizen.','—',
      'Final version of the opinion article. FIRST GRADED PIECE.',
      'Five-minute political opinion speech with Q&A; mock UN or parliamentary debate.','Article + speech'),
    s(6,'Half the island, and the Show',
      'Review of the first half.','Lord of the Flies, ch. 5-6: closing the first part.','—',
      'Creative Arts Show: the grade’s piece (music appreciation).','Show + reader at half'),
    s(7,'The exam, mapped',
      'C1 vocabulary review: full AWL, idioms and figurative language, phrasal verbs in academic contexts. C1 fluency strategies: repair and reformulation.',
      'Exam strategies: time management, unfamiliar vocabulary, gist vs detail.',
      'Diagnosis across the four skills.','Timed long turn.','Readiness diagnosis'),
    s(8,'Grammar without a net',
      'C1 grammar review: word formation with prefixes and suffixes, key word transformation FCE/CAE style, ellipsis and substitution, open cloze and error correction.',
      '—','Transformation and open cloze drills.',
      'C1 exam listening: multiple choice, matching and completion.','Use of English'),
    s(9,'Writing under a clock',
      'Final editing: error-detection strategies and time management in exam writing.',
      'Exam texts: gapped text, multiple choice, matching headings, cross-text multiple choice.',
      'C1 exam writing in all four task types — essay, report, proposal and formal letter, 350-500 words under timed conditions. SECOND GRADED PIECE.',
      'Talking through your own error with a partner.','All task types'),
    s(10,'The island ends',
      '—','Lord of the Flies, ch. 7-12, and comparative essay on two novels, with exam practice.',
      'The comparative essay.','Discussion: a political community that fails.','Reader finished + essay'),
    s(11,'The long turn',
      'General review.','—',
      'C1 readiness self-assessment across the four skills; end-of-year portfolio with five pieces and an extended reflection; review of the ten profile attributes.',
      'C1 exam speaking: long turn and discussion; final oral portfolio.','Speaking + final portfolio')
  ],
  gana:['This is the grade where the merge is most obvious: U6 is not content, it is exam preparation. Keeping it as a separate unit forces a unit grade onto what is really the final stretch towards CAE.',
        'C1 Advanced is on 2 December. Weeks 7 to 11 line up with the October Mock 2 and the November enrolment instead of competing with them.',
        'The end-of-year portfolio asks for five pieces: across eleven weeks there is somewhere to get them; across five, there is not.']
}

}};
})();
