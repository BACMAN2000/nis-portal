/* Arcos de proyecto de primaria — NIS 2026.  ·  Primary project arcs.
 *
 * Un "arco" es un proyecto interdisciplinario de 11 o 12 semanas que ocupa
 * DOS periodos seguidos del calendario del colegio. No es una capa nueva de
 * planificacion: el colegio ya llama "Project" a cada periodo (el Primary
 * Calendar dice "Upload Project 4 Week 2&3", "Present Project 5 Unit plan"),
 * y 5.o grado ya escribio su propio proyecto de once semanas a caballo entre
 * P4 y P5. Esto declara el arco que ya existe.
 *
 * BILINGUE. La pagina se lee entera en ingles o entera en castellano. Cada
 * texto va como L('English', 'castellano'); una cadena suelta significa que
 * es igual en los dos idiomas — nombres propios, titulos de Toddle, nombres
 * de producto que el colegio usa tal cual. NO se traduce lo que es copia
 * literal de un documento del colegio: eso es prueba, no texto nuestro.
 *
 * DE DONDE SALE CADA COSA
 *   - El calendario (periodos, semanas y fechas) sale de
 *     "Primary Calendar 2026.xlsx": P1=6, P2=5, P3=6, P4=6, P5=5, P6=6 = 34.
 *   - El contenido por semana y por area NO esta aqui: se lee en vivo de
 *     scope/annual-plan-primary-2026.json, que es el volcado literal de
 *     "Annual Plan Primary 2026.xlsx" y, para 1.o, de la hoja "Annual Plan"
 *     que vive dentro de "EY_Assessment Criteria_G1.xlsx". Si coordinacion
 *     cambia cualquiera de los dos, se vuelve a correr
 *     tools/extrae_annual_plan.py y esta pagina cambia sola.
 *   - Los campos de planificacion siguen la plantilla oficial del colegio:
 *     "Project Planner Template.docx" y el master plan de 5.o
 *     "Projects 4 & 5.docx".
 *   - El campo `toddle` trae el NOMBRE REAL con el que el proyecto de ese
 *     periodo esta dado de alta en Toddle, el planificador oficial del
 *     colegio. Comprobado el 5-sep-2026 en Planning insights > Manage units:
 *     221 unidades en Primary y 303 en Secondary. Donde el arco y Toddle no
 *     coinciden manda Toddle, y el desajuste se dice en `revisar`.
 *
 * Forma de un arco:
 *   grade, trimestre, periodos[], semanas, inicio, fin, cover
 *   titulo, subtitulo, areaEje, areasArticuladas[]
 *   situacion, preguntaEsencial, narrativa, orientadoras{area}
 *   competencias[{area, nombre, capacidades[]}]   — CNEB
 *   producto{titulo, audiencia, descripcion, incluye[]}
 *   fases[{n, periodo, semana, fase, foco, hace, evidencia}]
 *   evaluacion[{criterio, descriptor}], diferenciacion[], sad{titulo, muestra}
 *   toddle[], unidades[], revisar[]
 */
(function(){
const L = (en, es) => ({en: en, es: es});

/* Tipos de unidad tal como los distingue Toddle. */
const IDU   = L('interdisciplinary unit', 'unidad interdisciplinaria');
const AREA  = L('single-subject unit', 'unidad de area');
const VACIA = L('empty template', 'plantilla vacia');

window.PROJECT_ARCS = {

/* ==================================================================== 1.o
   1.o es distinto a los demas: su equipo YA tiene escritos los proyectos
   leccion a leccion (Project 1..4.docx, en Early Years / Grade 1 / 8. Planning).
   Lo que sigue NO propone semanas: las transcribe. */

'g1.t1': {
  grade:'g1', label:'Grade 1', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🐞', from:'#5c3a10', to:'#c9a227'},
  titulo:'This place is not only mine',
  subtitulo:L('Who I am, where I live, and who else lives here',
              'Quién soy, dónde vivo, y quién más vive aquí'),
  autoria:L('The eleven weeks are transcribed from "Project 1_.docx" and "Project 2.docx", '+
    'written by the Grade 1 team with objectives, CNEB competencies, resources and the three '+
    'parts of every session. The portal only adds the arc title, the essential question and the '+
    'narrative that ties the two periods together.',
    'Las once semanas están transcritas de "Project 1_.docx" y "Project 2.docx", escritos por el '+
    'equipo de 1.º con objetivo, competencia CNEB, recursos y las tres partes de cada sesión. El '+
    'portal solo pone el título del arco, la pregunta esencial y la narrativa que une los dos '+
    'periodos.'),
  notaPlan:L('The Grade 1 annual plan only carries Comunicación, Math, English and (in P1) Music '+
    'and PE. Science and Social Studies live in the Project.docx files, not in that sheet.',
    'El plan anual de 1.º solo carga Comunicación, Math, English y (en P1) Music y PE. Science y '+
    'Social viven en los propios Project.docx, no en esa hoja.'),
  areaEje:'social', areasArticuladas:['science','comunicacion','math','english'],
  situacion:L('P1 and P2 ask the same question about two different subjects. In P1 the child '+
    'looks at himself: his face, his fingerprints, his ID card, how he has changed, where his '+
    'surname comes from, how his district and his school have changed, who lives around him and '+
    'what that place needs — ending in an exploratory walk, a video asking for a change and a '+
    'thank-you letter. In P2 the same gaze lands on another inhabitant of the school: insects. '+
    'They are observed, classified, understood — what they are for and what we do to them —, a '+
    'classroom protocol is agreed, and a prototype is built from recycled material and explained '+
    'on video. It is one single learning: to look closely at what was already there.',
    'P1 y P2 hacen la misma pregunta con dos sujetos distintos. En P1 el niño se mira a sí '+
    'mismo: su cara, sus huellas, su DNI, cómo ha cambiado, de dónde viene su apellido, cómo ha '+
    'cambiado su distrito y su colegio, quién vive a su alrededor y qué necesita ese sitio — y '+
    'termina en un paseo de exploración, un vídeo para pedir un cambio y una carta de '+
    'agradecimiento. En P2 la misma mirada se posa en otro habitante del colegio: los insectos. '+
    'Se les observa, se les clasifica, se descubre para qué sirven y qué les hacemos nosotros, se '+
    'acuerda un protocolo de aula y se construye un prototipo con material reciclado que se '+
    'explica en vídeo. Es un solo aprendizaje: mirar de cerca lo que ya estaba ahí.'),
  preguntaEsencial:L('Who lives in this place with me, and how do we look after it?',
    '¿Quién vive en este sitio conmigo, y cómo lo cuidamos?'),
  narrativa:L('Nobody in the world has your fingerprints. Nobody has your face. This term you '+
    'are going to find out what makes you you, where you come from, and who lives around you. '+
    'And then you are going to look very closely at somebody who has been living in this school '+
    'the whole time and nobody ever asked about: the insects. At the end you make a video for '+
    'the whole school about who lives here and what they need.',
    'Nadie en el mundo tiene tus huellas. Nadie tiene tu cara. Este trimestre vas a descubrir qué '+
    'te hace ser tú, de dónde vienes y quién vive a tu alrededor. Y después vas a mirar muy de '+
    'cerca a alguien que lleva viviendo en este colegio todo este tiempo y por quien nadie ha '+
    'preguntado nunca: los insectos. Al final haréis un vídeo para todo el colegio sobre quién '+
    'vive aquí y qué necesita.'),
  orientadoras:{
    social:L('Who am I, where do I come from and who lives around me?',
             '¿Quién soy, de dónde vengo y quién vive a mi alrededor?'),
    science:L('What is a living thing like inside and outside, and what does it need to live?',
              '¿Cómo es por dentro y por fuera un ser vivo, y qué necesita para vivir?'),
    comunicacion:L('How do I tell somebody else what I found out?',
                   '¿Cómo cuento a otro lo que descubrí?'),
    math:L('How do I count, compare and order what I keep finding?',
           '¿Cómo cuento, comparo y ordeno lo que voy encontrando?'),
    english:L('Can I name what I see and say how it is?',
              '¿Sé nombrar lo que veo y decir cómo es?')
  },
  competencias:[
    {area:'social', nombre:L('Builds his or her identity','Construye su identidad'),
     capacidades:[L('Values himself or herself','Se valora a sí mismo'),
                  L('Self-regulates emotions','Autorregula sus emociones'),
                  L('Reflects and argues ethically','Reflexiona y argumenta éticamente')]},
    {area:'social', nombre:L('Builds historical interpretations','Construye interpretaciones históricas'),
     capacidades:[L('Understands historical time — puts events in order','Comprende el tiempo histórico — ordena hechos en el tiempo'),
                  L('Explains historical processes — describes change by comparing present and past','Elabora explicaciones sobre procesos históricos — describe cambios al comparar el presente y el pasado')]},
    {area:'social', nombre:L('Lives together and participates democratically in the pursuit of the common good','Convive y participa democráticamente en la búsqueda del bien común'),
     capacidades:[L('Builds norms and takes on agreements and rules','Construye normas y asume acuerdos y leyes'),
                  L('Takes part in actions that promote the common good','Participa en acciones que promueven el bienestar común')]},
    {area:'social', nombre:L('Responsibly manages space and the environment','Gestiona responsablemente el espacio y el ambiente'),
     capacidades:[L('Handles sources of information to understand geographical space','Maneja fuentes de información para comprender el espacio geográfico'),
                  L('Generates actions to conserve the local and global environment — spots a problem around him and looks for a solution','Genera acciones para conservar el ambiente local y global — reconoce un problema de su entorno y busca una solución')]},
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry — asks questions based on exploring with the senses','Problematiza situaciones — realiza preguntas basadas en la exploración a través de los sentidos'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Analyses data — relates one piece of data to another','Analiza datos e información — relaciona datos e información'),
                  L('Evaluates and communicates — states findings and difficulties','Evalúa y comunica — expresa sus hallazgos y dificultades')]},
    {area:'science', nombre:L('Designs and builds technological solutions to problems around him','Diseña y construye soluciones tecnológicas para resolver problemas de su entorno'),
     capacidades:[L('Determines an alternative technological solution','Determina una alternativa de solución tecnológica'),
                  L('Designs the alternative — describes how to implement it','Diseña la alternativa — describe cómo implementar la solución'),
                  L('Implements and validates — adjusts as he builds','Implementa y valida — realiza ajustes en el proceso de construcción'),
                  L('Evaluates and communicates how his solution works and what it changes','Evalúa y comunica el funcionamiento y los impactos de su alternativa')]}
  ],
  producto:{
    titulo:'Who lives here — the video',
    audiencia:L('The whole school, which watches the video; and the person from the community who '+
      'receives the thank-you letter.',
      'El colegio entero, que ve el vídeo; y la persona de la comunidad que recibe la carta de '+
      'agradecimiento.'),
    descripcion:L('A class video showing who lives in this place — the people and the insects —, '+
      'what each of them needs, and one thing the children built to help.',
      'Un vídeo de la clase que enseña quién vive en este sitio — las personas y los insectos —, '+
      'qué necesita cada uno, y una cosa que los niños construyeron para ayudar.'),
    incluye:[L('My self-portrait and my fingerprints','Mi autorretrato y mis huellas'),
             L('My timeline: how I have changed','Mi línea de tiempo: cómo he cambiado'),
             L('The interview with somebody from the community','La entrevista a alguien de la comunidad'),
             L('The thank-you letter','La carta de agradecimiento'),
             L('My record of the insects in the school','Mi registro de insectos del colegio'),
             L('The recycled-material prototype and its poster','El prototipo de material reciclado y su póster'),
             L('The final video','El vídeo final')]
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:L('Me','Yo'), foco:L('Nobody else is me','Nadie más es yo'),
     hace:L('Self-portrait in front of a mirror, looking at the shape of the eyes and the skin '+
       'tone. Fingerprints with an ink pad and a magnifying glass, and what an ID card is for — '+
       'with their class ID they vote the official name of the classroom. What emotions I bring '+
       'to Grade 1. Jigsaw-piece mural.',
       'Autorretrato delante del espejo mirando la forma de los ojos y el tono de piel. Huellas '+
       'dactilares con tampón y lupa, y para qué sirve un DNI — con el DNI de clase se vota el '+
       'nombre oficial del aula. Qué emociones traigo a 1.º. Mural de piezas de puzle.'),
     evidencia:L('Self-portrait + classroom mural','Autorretrato + mural de la clase')},
    {n:2, periodo:1, semana:2, fase:L('Me','Yo'), foco:L('I have changed, and my body works','He cambiado, y mi cuerpo funciona'),
     hace:L('Photos of before and now, a timeline, and measuring how much I have grown. What I '+
       'can do now that I could not do before. Experiment on where food travels. Experiment on '+
       'what lungs are for.',
       'Fotos de antes y de ahora, línea de tiempo y medir cuánto he crecido. Qué puedo hacer '+
       'ahora que antes no podía. Experimento de por dónde viaja la comida. Experimento de para '+
       'qué sirven los pulmones.'),
     evidencia:L('Growth timeline','Línea de tiempo de mi crecimiento')},
    {n:3, periodo:1, semana:3, fase:L('Where I come from','De dónde vengo'), foco:L('Where I come from','De dónde vengo'),
     hace:L('Family traditions and games, then and now. Where my surname comes from. Where I '+
       'live, with Google Maps and the places I recognise in the neighbourhood. How my school has '+
       'changed and what we can do to look after it.',
       'Tradiciones y juegos de la familia, de antes y de ahora. De dónde viene mi apellido. '+
       'Dónde vivo, con Google Maps y los sitios que reconozco del barrio. Cómo ha cambiado mi '+
       'colegio y qué podemos hacer para cuidarlo.'),
     evidencia:L('Family and district card','Ficha de familia y distrito')},
    {n:4, periodo:1, semana:4, fase:L('Who is next to me','Quién está a mi lado'), foco:L('Who is around me','Quién está a mi alrededor'),
     hace:L('The difference between a right and a responsibility. The circle-of-trust tree of my '+
       'family and what each person does. A simple interview with somebody from the school '+
       'community.',
       'La diferencia entre un derecho y una responsabilidad. El árbol del círculo de confianza '+
       'de mi familia y qué hace cada uno. Entrevista sencilla a alguien de la comunidad del '+
       'colegio.'),
     evidencia:L('Circle of trust + interview','Círculo de confianza + entrevista')},
    {n:5, periodo:1, semana:5, fase:L('What this place needs','Qué necesita este sitio'), foco:L('What this place needs','Qué necesita este sitio'),
     hace:L('Exploratory walk around the school: what is here that needs protecting. Out of the '+
       'problems we saw comes a video asking for something to change. What the classroom needs to '+
       'be in order. Thank-you letter to somebody from the community.',
       'Paseo de exploración por el colegio: qué hay aquí que haya que proteger. De los problemas '+
       'que vimos sale un vídeo para pedir que cambie algo. Qué necesita el aula para estar en '+
       'orden. Carta de agradecimiento a alguien de la comunidad.'),
     evidencia:L('Awareness video + thank-you letter','Vídeo de concienciación + carta de agradecimiento')},
    {n:6, periodo:1, semana:6, fase:L('What this place needs','Qué necesita este sitio'), foco:L('Living together','Convivir'),
     hace:L('Team cooperation challenge (a paper tower, a jigsaw or a story written together). '+
       'The magic-words basket. A 3D self-portrait to close. Beach trip with yoga and mindfulness.',
       'Reto de cooperación en equipo (torre de papel, puzle o cuento entre todos). La cesta de '+
       'las palabras mágicas. Autorretrato en 3D como cierre. Salida a la playa con yoga y '+
       'atención plena.'),
     evidencia:L('3D self-portrait','Autorretrato en 3D')},
    {n:7, periodo:2, semana:1, fase:L('Somebody else lives here','Alguien más vive aquí'), foco:L('Somebody else lives here','Alguien más vive aquí'),
     hace:L('P2 begins. The insects of the classroom and the school are observed: when they '+
       'appear, where, and how often. Observation walk. What we already believe and what we '+
       'wonder. Myths and facts: what is an idea and what is evidence.',
       'Arranca P2. Se observan los insectos del aula y del colegio: cuándo aparecen, dónde y '+
       'cada cuánto. Paseo de observación. Qué creemos ya y qué nos preguntamos. Mitos y hechos: '+
       'qué es una idea y qué es una prueba.'),
     evidencia:L('Insect record','Registro de insectos')},
    {n:8, periodo:2, semana:2, fase:L('Somebody else lives here','Alguien más vive aquí'), foco:L('How they are made','Cómo están hechos'),
     hace:L('Body parts, how they move and what size they are, and what each part is for. What '+
       'they eat and with what mouth. Where they live and how they group.',
       'Partes del cuerpo, cómo se mueven y de qué tamaño son, y para qué sirve cada parte. Qué '+
       'comen y con qué boca. Dónde viven y cómo se agrupan.'),
     evidencia:L('Labelled diagram','Diagrama etiquetado')},
    {n:9, periodo:2, semana:3, fase:L('What they do and what we do to them','Qué hacen y qué les hacemos'), foco:L('What they do for us','Qué hacen por nosotros'),
     hace:L('What they are for: pollination, decomposition, food chains — and what would happen '+
       'if they disappeared. How what we do with food, cleaning and materials affects them. '+
       'Strategies to look after them, in posters and drawings.',
       'Para qué sirven: polinización, descomposición, cadenas alimentarias — y qué pasaría si '+
       'desaparecieran. Cómo les afecta lo que hacemos con la comida, la limpieza y los '+
       'materiales. Estrategias para cuidarlos, en carteles y dibujos.'),
     evidencia:L('Care poster','Cartel de cuidado')},
    {n:10, periodo:2, semana:4, fase:L('Build','Construir'), foco:L('What do we do when one appears','Qué hacemos cuando aparece uno'),
     hace:L('Real classroom situations with an insect and what responses fit. A class protocol is '+
       'agreed. The problem is chosen and each table negotiates and designs ONE prototype.',
       'Situaciones reales de aula con un insecto y qué respuestas caben. Se acuerda un protocolo '+
       'de clase. Se elige el problema y cada mesa negocia y diseña UN prototipo.'),
     evidencia:L('Class protocol + team blueprint','Protocolo de clase + plano del equipo')},
    {n:11, periodo:2, semana:5, fase:L('Build','Construir'), foco:L('Building the solution','Construir la solución'),
     hace:L('The prototype is built from recycled material following the team blueprint. It is '+
       'improved with what the others say and the poster on how it works is made. Oral '+
       'presentation and recording of the video for the community.',
       'Se construye el prototipo con material reciclado siguiendo el plano del equipo. Se mejora '+
       'con lo que dicen los demás y se hace el póster de cómo funciona. Presentación oral y '+
       'grabación del vídeo para la comunidad.'),
     evidencia:L('Prototype + video','Prototipo + vídeo')}
  ],
  evaluacion:[
    {criterio:L('I look at myself and tell my story','Me miro y me cuento'),
     descriptor:L('Says what makes him unique and how he has changed, and backs it with something he observed or measured.',
                  'Dice qué le hace único y cómo ha cambiado, y lo apoya en algo que observó o midió.')},
    {criterio:L('I really observe','Observo de verdad'),
     descriptor:L('Records what he sees when he sees it, and tells apart what he observed from what he believed.',
                  'Registra lo que ve cuando lo ve, y distingue lo que observó de lo que creía.')},
    {criterio:L('I look after what is around me','Cuido lo que está a mi alrededor'),
     descriptor:L('Spots a problem in the school and proposes something his class can do.',
                  'Reconoce un problema del colegio y propone algo que su clase puede hacer.')},
    {criterio:L('I build it and explain it','Construyo y lo explico'),
     descriptor:L('His prototype answers the problem he chose and he can say how it works.',
                  'Su prototipo responde al problema que eligió y sabe decir cómo funciona.')}
  ],
  diferenciacion:[
    L('Everything in the project can be handed in drawn and labelled, spoken or written.',
      'Todo lo del proyecto se puede entregar dibujado y etiquetado, hablado o escrito.'),
    L('The interview and the letter can be dictated; what is assessed is who it is for and what it asks.',
      'La entrevista y la carta se pueden dictar; lo que se evalúa es a quién va y qué pide.'),
    L('In the video, anyone who does not want to appear can record the voice or hold the sign.',
      'En el vídeo, quien no quiera salir puede grabar la voz o sostener el cartel.')
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:L('The child shows the self-portrait from the start and the 3D one from the end, and '+
      'tells what he discovered in between. And he shows his insect record: what he believed and '+
      'what he saw.',
      'El niño enseña su autorretrato del principio y el de 3D del final, y cuenta qué descubrió '+
      'en medio. Y enseña su registro de insectos: lo que creía y lo que vio.')},
  toddle:[],
  unidades:[],
  revisar:[
    L('Grade 1 is NOT in Toddle: the platform only has Primary (grades 2 to 5) and Secondary (6 '+
      'to 11). The Grade 1 planner lives only in the Project.docx files on Drive.',
      '1.º NO está en Toddle: la plataforma solo tiene Primary (grados 2 a 5) y Secondary (6 a '+
      '11). El planificador de 1.º vive solo en los Project.docx de Drive.'),
    L('The beach trip in week 6 and the exploratory walk in week 5 need family permission slips '+
      'well in advance.',
      'La salida a la playa de la semana 6 y el paseo de exploración de la 5 necesitan '+
      'autorización de familias con antelación.'),
    L('The P2 video is recorded in week 5: if the recycled material is not requested in week 3, '+
      'there is no prototype to film.',
      'El vídeo de P2 se graba en la semana 5: si el material reciclado no está pedido en la '+
      'semana 3, no hay prototipo que grabar.')]
},

'g1.t2': {
  grade:'g1', label:'Grade 1', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🏔️', from:'#6b3410', to:'#d98b3a'},
  titulo:'Coast, mountains and jungle',
  subtitulo:L('What the land decides: what shakes, what grows and what we build',
              'Lo que la tierra decide: lo que tiembla, lo que crece y lo que construimos'),
  autoria:L('The twelve weeks are transcribed from "Project 3.docx" and "Project 4.docx", written '+
    'by the Grade 1 team. The portal only adds the arc title, the essential question and the '+
    'narrative that ties the two periods together.',
    'Las doce semanas están transcritas de "Project 3.docx" y "Project 4.docx", escritos por el '+
    'equipo de 1.º. El portal solo pone el título del arco, la pregunta esencial y la narrativa '+
    'que une los dos periodos.'),
  notaPlan:L('The Grade 1 annual plan only carries Comunicación, Math and English in P3, and only '+
    'English in P4. The Science and Social Studies content of this arc is in the Project.docx files.',
    'El plan anual de 1.º solo carga Comunicación, Math e English en P3, y solo English en P4. El '+
    'contenido de Science y Social de este arco está en los propios Project.docx.'),
  areaEje:'science', areasArticuladas:['social','math','comunicacion','english'],
  situacion:L('Both periods share one spine that the plan itself writes twice: the three regions '+
    'of Peru. In P3, the coast, the highlands and the jungle explain why a different disaster '+
    'happens in each place, and from there the class moves to how you build to withstand it — '+
    'with the column experiment and a collaborative city put up by the class. In P4, those same '+
    'three regions explain why each fruit and each vegetable grows where it grows, and out of '+
    'that comes the journey of food to school: the cold chain, the wholesale market, the corner '+
    'shop, the scales and the coins. One single learning: the land you live on decides things '+
    'about your life.',
    'Los dos periodos comparten un mismo eje que el propio plan escribe dos veces: las tres '+
    'regiones del Perú. En P3, la costa, la sierra y la selva explican por qué en cada sitio '+
    'ocurre un desastre distinto, y de ahí se pasa a cómo se construye para aguantarlo — con el '+
    'experimento de las columnas y una ciudad colaborativa levantada por la clase. En P4, esas '+
    'mismas tres regiones explican por qué cada fruta y cada verdura crece donde crece, y de ahí '+
    'sale el viaje del alimento hasta el colegio: el frío del transporte, el mercado mayorista, '+
    'la tienda del barrio, la balanza y las monedas. Un mismo aprendizaje: la tierra donde vives '+
    'decide cosas de tu vida.'),
  preguntaEsencial:L('Our country has three very different lands. What does that change for us?',
    'Nuestro país tiene tres tierras muy distintas. ¿Qué cambia eso para nosotros?'),
  narrativa:L('Peru is not one place, it is three: the coast, the mountains and the jungle. In '+
    'each one the ground moves differently, it rains differently, and different things grow. '+
    'First you are going to find out why, and build a city that can stand up to it. Then you are '+
    'going to follow a tomato all the way from the field to your lunchbox — and find out how many '+
    'people it takes.',
    'El Perú no es un sitio, son tres: la costa, la sierra y la selva. En cada uno la tierra se '+
    'mueve distinto, llueve distinto y crecen cosas distintas. Primero vais a averiguar por qué, '+
    'y a construir una ciudad que aguante. Después vais a seguir a un tomate desde el campo hasta '+
    'vuestra lonchera — y a descubrir cuánta gente hace falta.'),
  orientadoras:{
    science:L('Why does something different happen in each region? What does a plant need and what does a disaster do?',
              '¿Por qué en cada región pasa una cosa distinta? ¿Qué necesita una planta y qué hace un desastre?'),
    social:L('Who protects us and who feeds us, and how does it get here?',
             '¿Quién nos protege y quién nos alimenta, y cómo llega hasta aquí?'),
    math:L('How do I put things in order in time, how do I find my place, and how do I pay and weigh?',
           '¿Cómo ordeno en el tiempo, cómo me ubico y cómo pago y peso?'),
    comunicacion:L('How do I tell what I found out so somebody else understands it?',
                   '¿Cómo cuento lo que investigué para que otro lo entienda?'),
    english:L('Can I say where things are and what they are like?',
              '¿Sé decir dónde están las cosas y cómo son?')
  },
  competencias:[
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge — explains the relation between the Earth, its parts and its movements and the beings that live on it','Comprende y usa conocimientos — explica la relación entre la Tierra, sus componentes y movimientos con los seres que la habitan'),
                  L('Understands and uses knowledge — explains the relation between the structure of living things and their functions and development','Comprende y usa conocimientos — explica la relación entre la estructura de los seres vivos con sus funciones y su desarrollo'),
                  L('Evaluates what scientific and technological work implies','Evalúa las implicancias del saber y del quehacer científico y tecnológico')]},
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry — suggests answers based on exploring','Problematiza situaciones — sugiere respuestas basadas en la exploración'),
                  L('Designs strategies for inquiry — chooses organised options to run an experiment','Diseña estrategias — selecciona opciones organizadas para realizar un experimento'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Evaluates and communicates — states findings and difficulties','Evalúa y comunica — expresa sus hallazgos y dificultades')]},
    {area:'science', nombre:L('Designs and builds technological solutions to problems around him','Diseña y construye soluciones tecnológicas para resolver problemas de su entorno'),
     capacidades:[L('Determines an alternative technological solution','Determina una alternativa de solución tecnológica'),
                  L('Designs the alternative — describes how to implement it','Diseña la alternativa — describe cómo implementar la solución'),
                  L('Implements and validates technological alternatives','Implementa y valida alternativas de solución tecnológica')]},
    {area:'social', nombre:L('Responsibly manages space and the environment','Gestiona responsablemente el espacio y el ambiente'),
     capacidades:[L('Handles sources of information — uses reference points to locate himself and represent his space','Maneja fuentes de información — utiliza puntos de referencia para ubicarse y representar su espacio'),
                  L('Understands the relations between natural and social elements','Comprende las relaciones entre los elementos naturales y sociales'),
                  L('Generates actions to conserve the local and global environment','Genera acciones para conservar el ambiente local y global')]},
    {area:'social', nombre:L('Responsibly manages economic resources','Gestiona responsablemente los recursos económicos'),
     capacidades:[L('Understands the relations inside the economic and financial system — recognises why people and institutions carry out economic activities','Comprende las relaciones entre los elementos del sistema económico y financiero — reconoce por qué las personas e instituciones realizan actividades económicas'),
                  L('Takes economic and financial decisions','Toma decisiones económicas y financieras')]},
    {area:'social', nombre:L('Builds historical interpretations','Construye interpretaciones históricas'),
     capacidades:[L('Understands historical time — puts events in order','Comprende el tiempo histórico — ordena hechos en el tiempo'),
                  L('Critically interprets a range of sources','Interpreta críticamente fuentes diversas')]}
  ],
  producto:{
    titulo:'The city that stands, and the Food Scientists Fair',
    audiencia:L('In P3, the class and the school, who walk through the collaborative city. In P4, '+
      'the families, who visit the fair stations.',
      'En P3, la clase y el colegio, que recorren la ciudad colaborativa. En P4, las familias, '+
      'que visitan las estaciones de la feria.'),
    descripcion:L('A city built by everyone, with structures that hold up and its safe zones '+
      'signposted; and a fair where each child mans a station about the journey of food and puts '+
      'together a balanced lunchbox.',
      'Una ciudad construida entre todos con estructuras que aguantan y con sus zonas seguras '+
      'señalizadas; y una feria en la que cada niño atiende su estación sobre el viaje del '+
      'alimento y prepara una lonchera equilibrada.'),
    incluye:[L('My timeline of disasters in Peru','Mi línea de tiempo de desastres en el Perú'),
             L('My classroom safety plan','El plan de seguridad de mi aula'),
             L('The column experiment','El experimento de las columnas'),
             L('My structure in the collaborative city','Mi estructura de la ciudad colaborativa'),
             L('My germination log','Mi registro de germinación'),
             L('The map of what grows in each region','El mapa de qué crece en cada región'),
             L('The hygiene guide as a leaflet','La guía de higiene en díptico'),
             L('My fair station and the balanced lunchbox','Mi estación de la feria y la lonchera equilibrada')]
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:L('What shakes','Lo que tiembla'), foco:L('A phenomenon or a disaster?','¿Fenómeno o desastre?'),
     hace:L('The difference between a natural phenomenon and a disaster, with real examples from '+
       'Peru. What disasters have happened here and how they affected people. Collective timeline '+
       'with past and present. Student Achievement Day falls this week.',
       'La diferencia entre un fenómeno natural y un desastre, con ejemplos reales del Perú. Qué '+
       'desastres han ocurrido aquí y cómo afectaron a la gente. Línea de tiempo colectiva con '+
       'pasado y presente. Esta semana cae el Student Achievement Day.'),
     evidencia:L('Class timeline','Línea de tiempo de la clase')},
    {n:2, periodo:3, semana:2, fase:L('What shakes','Lo que tiembla'), foco:L('Three very different lands','Tres tierras muy distintas'),
     hace:L('Places in Peru we have visited. The weather and the landscape of the coast, the '+
       'highlands and the jungle. How geography decides which disaster happens in each region. '+
       'Research in books, informational texts and posters.',
       'Sitios del Perú que hemos visitado. El clima y el paisaje de la costa, la sierra y la '+
       'selva. Cómo la geografía decide qué desastre ocurre en cada región. Investigación en '+
       'libros, textos informativos y carteles.'),
     evidencia:L('Region file','Dossier de la región')},
    {n:3, periodo:3, semana:3, fase:L('What shakes','Lo que tiembla'), foco:L('Before, during and after','Antes, durante y después'),
     hace:L('What to do before, during and after. What materials and resources are needed. What '+
       'the school brigades and the people of the community do. The recommendations are organised '+
       'and communicated.',
       'Qué hacer antes, durante y después. Qué materiales y recursos hacen falta. Qué hacen las '+
       'brigadas del colegio y la gente de la comunidad. Se organizan y comunican las '+
       'recomendaciones.'),
     evidencia:L('Safety recommendations','Recomendaciones de seguridad')},
    {n:4, periodo:3, semana:4, fase:L('What we build','Lo que construimos'), foco:L('Building so it stands','Construir para que aguante'),
     hace:L('What infrastructure there is in Peru and how climate and geography decide its design. '+
       'Safe zones, evacuation routes and signs at school. Experiment: what columns are for — '+
       'predict, observe and compare. A structure is designed and built for the collaborative city.',
       'Qué infraestructuras hay en el Perú y cómo el clima y la geografía deciden su diseño. '+
       'Zonas seguras, rutas de evacuación y señales del colegio. Experimento: para qué sirven '+
       'las columnas — se predice, se observa y se compara. Se diseña y construye una estructura '+
       'para la ciudad colaborativa.'),
     evidencia:L('The collaborative city','La ciudad colaborativa')},
    {n:5, periodo:3, semana:5, fase:L('What we build','Lo que construimos'), foco:L('What we can prevent','Lo que podemos prevenir'),
     hace:L('A week with two public holidays. Causes and prevention of landslides and forest '+
       'fires, separating what is natural from what we do. Origin, causes and prevention of '+
       'earthquakes, tsunamis and floods, with simple simulations.',
       'Semana con dos feriados. Causas y prevención de huaicos e incendios forestales, separando '+
       'lo natural de lo que hacemos nosotros. Origen, causas y prevención de sismos, tsunamis e '+
       'inundaciones, con simulaciones sencillas.'),
     evidencia:L('Cause and prevention cards','Fichas de causa y prevención')},
    {n:6, periodo:3, semana:6, fase:L('What we build','Lo que construimos'), foco:L('Show what you learned','Enseña lo que aprendiste'),
     hace:L('P3 closes: the project evidence is organised and the piece that best shows the '+
       'learning is chosen. A real emergency situation is answered. Reflection on how their own '+
       'ideas have changed.',
       'Cierre de P3: se organiza la evidencia del proyecto y se elige la que mejor muestra lo '+
       'aprendido. Se responde a una situación de emergencia real. Reflexión sobre cómo han '+
       'cambiado las propias ideas.'),
     evidencia:L('Portfolio + drill','Portafolio + simulacro')},
    {n:7, periodo:4, semana:1, fase:L('What grows','Lo que crece'), foco:L('Where food starts','Dónde empieza la comida'),
     hace:L('P4 begins. Where plants come from: germination and what a plant needs (sun, water, '+
       'soil and air). Parts of the plant on real foods and which ones we eat. Life cycle of a '+
       'fruit and of a vegetable: fruit carries seeds inside.',
       'Arranca P4. De dónde vienen las plantas: germinación y qué necesita una planta (sol, '+
       'agua, tierra y aire). Partes de la planta sobre alimentos reales y cuáles se comen. Ciclo '+
       'de vida de una fruta y de una verdura: la fruta lleva semillas dentro.'),
     evidencia:L('Germination log','Registro de germinación')},
    {n:8, periodo:4, semana:2, fase:L('What grows','Lo que crece'), foco:L('Who grows it, and where','Quién lo cultiva, y dónde'),
     hace:L('What a farmer does and with what tools. Where each thing grows: on the tree, on the '+
       'bush or underground. How you know it is ready to harvest. And the three regions again: '+
       'why each fruit grows where it grows.',
       'Qué hace un agricultor y con qué herramientas. Dónde crece cada cosa: en el árbol, en la '+
       'mata o bajo tierra. Cómo se sabe que ya está para cosechar. Y otra vez las tres regiones: '+
       'por qué cada fruta crece donde crece.'),
     evidencia:L('Region-and-crop map','Mapa de región y cultivo')},
    {n:9, periodo:4, semana:3, fase:L('The journey','El viaje'), foco:L('The journey to my school','El viaje hasta mi colegio'),
     hace:L('From the field to school: the cold chain and the packaging so it does not spoil. The '+
       'wholesale market, where produce from the coast, the highlands and the jungle arrives. The '+
       'shopkeeper in the neighbourhood. A buying-and-selling fair with coins and scales.',
       'Del campo al colegio: la cadena de frío y el embalaje para que no se eche a perder. El '+
       'mercado mayorista, donde llega lo de la costa, la sierra y la selva. El tendero del '+
       'barrio. Feria de compraventa con monedas y balanza.'),
     evidencia:L('Market role-play','Juego de rol del mercado')},
    {n:10, periodo:4, semana:4, fase:L('The journey','El viaje'), foco:L('Before I eat it','Antes de comerlo'),
     hace:L('Observing with the senses: colour, shape, texture, smell. Why food has to be washed '+
       'and disinfected, and how it is done at home. Visual guide as a leaflet.',
       'Observar con los sentidos: color, forma, textura, olor. Por qué hay que lavar y '+
       'desinfectar, y cómo se hace en casa. Guía visual en díptico.'),
     evidencia:L('Hygiene leaflet','Díptico de higiene')},
    {n:11, periodo:4, semana:5, fase:L('What it gives me','Lo que me da'), foco:L('What it does inside me','Qué hace dentro de mí'),
     hace:L('Sorting by origin: animal, plant or mineral. What vitamins are for, with the '+
       'superpowers game. Foods that give energy and foods that protect: team Energy against team '+
       'Shield. Why the body needs water.',
       'Clasificar por origen: animal, vegetal o mineral. Para qué sirven las vitaminas, con el '+
       'juego de los superpoderes. Alimentos que dan energía y alimentos que protegen: equipo '+
       'Energía contra equipo Escudo. Por qué el cuerpo necesita agua.'),
     evidencia:L('Energy / shield sort','Clasificación energía / escudo')},
    {n:12, periodo:4, semana:6, fase:L('What it gives me','Lo que me da'), foco:'Food Scientists Fair',
     hace:L('Market visit, already knowing what to look at and how to take part in a purchase. '+
       'Paper prototypes of things that would improve some stage of the journey of food. The '+
       'station is prepared and rehearsed. Fair: each child explains their own and puts together '+
       'a balanced lunchbox.',
       'Visita al mercado, sabiendo ya qué mirar y cómo participar en una compra. Prototipos de '+
       'papel de cosas que mejorarían alguna etapa del viaje del alimento. Se prepara la estación '+
       'y se ensaya. Feria: cada niño explica lo suyo y arma una lonchera equilibrada.'),
     evidencia:L('Fair + balanced lunchbox','Feria + lonchera equilibrada')}
  ],
  evaluacion:[
    {criterio:L('I connect the place with what happens','Relaciono el sitio con lo que pasa'),
     descriptor:L('Says what happens on the coast, in the highlands or in the jungle and why there and not somewhere else.',
                  'Dice qué ocurre en la costa, la sierra o la selva y por qué ahí y no en otra parte.')},
    {criterio:L('I test before I claim','Pruebo antes de afirmar'),
     descriptor:L('Predicts, observes and compares — and reports what came out even when it was not what he expected.',
                  'Predice, observa y compara — y cuenta lo que salió aunque no fuera lo que esperaba.')},
    {criterio:L('I build something that holds','Construyo algo que se sostiene'),
     descriptor:L('His structure stays standing and he can say what he added to make it so.',
                  'Su estructura se mantiene de pie y sabe decir qué le puso para conseguirlo.')},
    {criterio:L('I explain a whole journey','Explico un viaje completo'),
     descriptor:L('Tells the path of food from the field to his lunchbox naming who takes part.',
                  'Cuenta el camino del alimento desde el campo hasta su lonchera nombrando a quién interviene.')}
  ],
  diferenciacion:[
    L('The timeline and the map can be a labelled drawing, a cut-and-paste or a text.',
      'La línea de tiempo y el mapa admiten dibujo con etiquetas, recorte o texto.'),
    L('In the collaborative city each team chooses how hard its structure is.',
      'En la ciudad colaborativa cada equipo elige la dificultad de su estructura.'),
    L('The fair station can be manned in pairs.',
      'La estación de la feria se puede atender en pareja.')
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:L('The child shows his structure and his germination log, and explains one thing he '+
      'believed at the start that turned out not to be so.',
      'El niño enseña su estructura y su registro de germinación, y explica una cosa que creía al '+
      'principio y que resultó no ser así.')},
  toddle:[],
  unidades:[],
  revisar:[
    L('Grade 1 is NOT in Toddle: the platform only has Primary (grades 2 to 5) and Secondary (6 '+
      'to 11). The Grade 1 planner lives only in the Project.docx files on Drive.',
      '1.º NO está en Toddle: la plataforma solo tiene Primary (grados 2 a 5) y Secondary (6 a '+
      '11). El planificador de 1.º vive solo en los Project.docx de Drive.'),
    L('The market visit in week 12 and the collaborative city in week 4 need materials ordered in '+
      'advance and family permission.',
      'La visita al mercado de la semana 12 y la ciudad colaborativa de la 4 necesitan materiales '+
      'pedidos con antelación y autorización de familias.'),
    L('Project 3 marks two lessons as "Feriado" in its week 5: they are 29 and 30 June (St Peter '+
      'and St Paul, and Teachers Day). If the calendar changes, that week gets two sessions back.',
      'Project 3 marca dos lecciones como "Feriado" en su semana 5: son el 29 y el 30 de junio '+
      '(San Pedro y San Pablo, y Día del Maestro). Si el calendario cambia, esa semana recupera '+
      'dos sesiones.')]
},

/* ==================================================================== 2.o */

'g2.t1': {
  grade:'g2', label:'Grade 2', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🏡', from:'#1d4e6e', to:'#4aa3c7'},
  titulo:'The place where I live',
  subtitulo:L('How it was, how it is, and what I can do about it',
              'Cómo era, cómo está y qué puedo hacer yo'),
  areaEje:'social', areasArticuladas:['science','math','comunicacion','english'],
  situacion:L('The Grade 2 annual plan opens the year with two questions that are really one. In '+
    'P1, Social Studies asks who I am and what the place where I live is like, and ends in '+
    '"actions that take care of the space and actions that harm it"; Science comes in alongside '+
    'with the four types of pollution and reduce, reuse, recycle. In P2, Social Studies turns to '+
    '"My Personal Story": what has changed in my life, the timeline, old photos and old objects, '+
    'and interviews with grandparents and neighbours. A Grade 2 child can hold one single idea '+
    'for eleven weeks if that idea is a concrete place: his school and his street.',
    'El plan anual de 2.º abre el año con dos preguntas que en realidad son la misma. En P1, '+
    'Social pregunta quién soy y cómo es el lugar donde vivo, y termina en "acciones que cuidan y '+
    'acciones que dañan el espacio"; Science entra en paralelo con los cuatro tipos de '+
    'contaminación y las prácticas de reducir, reutilizar y reciclar. En P2, Social gira hacia '+
    '"My Personal Story": lo que ha cambiado en mi vida, la línea de tiempo, las fotos y los '+
    'objetos antiguos, y las entrevistas a abuelos y vecinos. Un niño de 2.º puede sostener una '+
    'sola idea durante once semanas si esa idea es un lugar concreto: su colegio y su barrio.'),
  preguntaEsencial:L('How was my place before, how is it now, and what can I do about it?',
    '¿Cómo era mi sitio antes, cómo está ahora, y qué puedo hacer yo?'),
  narrativa:L('This term you are going to look at your school and your street the way a detective '+
    'looks at a room. First you find out what harms it and what takes care of it. Then you find '+
    'out what it was like before you were born, by asking the people who were already here. And '+
    'at the end you write a letter to somebody who can change one thing, and you show them the '+
    'numbers you counted.',
    'Este trimestre vas a mirar tu colegio y tu calle como un detective mira una habitación. '+
    'Primero averiguas qué le hace daño y qué lo cuida. Después averiguas cómo era antes de que '+
    'nacieras, preguntando a quienes ya estaban aquí. Y al final escribes una carta a alguien que '+
    'pueda cambiar una cosa, y le enseñas los números que contaste.'),
  orientadoras:{
    social:L('What actions take care of the place I am in, what actions harm it, and how was it before?',
             '¿Qué acciones cuidan y qué acciones dañan el lugar donde estoy, y cómo era antes?'),
    science:L('What types of pollution are there and what can I reduce, reuse or recycle?',
              '¿Qué tipos de contaminación hay y qué puedo reducir, reutilizar o reciclar?'),
    math:L('How do I count what I see and how do I show it so somebody else understands?',
           '¿Cómo cuento lo que veo y cómo lo muestro para que otro lo entienda?'),
    comunicacion:L('How do you write a letter somebody will want to answer?',
                   '¿Cómo se escribe una carta que alguien quiera responder?'),
    english:L('Can I describe my place and say what people do there?',
              '¿Sé describir mi sitio y decir qué hace la gente allí?')
  },
  competencias:[
    {area:'social', nombre:L('Responsibly manages space and the environment','Gestiona responsablemente el espacio y el ambiente'),
     capacidades:[L('Understands the relations between natural and social elements','Comprende las relaciones entre los elementos naturales y sociales'),
                  L('Generates actions to conserve the local and global environment','Genera acciones para conservar el ambiente local y global')]},
    {area:'social', nombre:L('Builds historical interpretations','Construye interpretaciones históricas'),
     capacidades:[L('Critically interprets a range of sources','Interpreta críticamente fuentes diversas'),
                  L('Understands historical time','Comprende el tiempo histórico')]},
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry','Problematiza situaciones para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Evaluates and communicates the process and the results of the inquiry','Evalúa y comunica el proceso y los resultados de su indagación')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas'),
                  L('Communicates his understanding of statistical concepts','Comunica su comprensión de los conceptos estadísticos')]},
    {area:'comunicacion', nombre:L('Writes different kinds of texts in his mother tongue','Escribe diversos tipos de textos en su lengua materna'),
     capacidades:[L('Fits the text to the communicative situation','Adecúa el texto a la situación comunicativa'),
                  L('Organises and develops ideas coherently and cohesively','Organiza y desarrolla las ideas de forma coherente y cohesionada')]}
  ],
  producto:{
    titulo:'A letter and a count',
    audiencia:L('The person who can change that thing: the tutor, the head, the man who cleans '+
      'the playground, the family. The letter is really delivered.',
      'La persona que puede cambiar esa cosa: el tutor, la directora, el señor que limpia el '+
      'patio, la familia. La carta se entrega de verdad.'),
    descripcion:L('Each child picks ONE thing in the school or in the street that can be made '+
      'better, counts it for a week, and writes a letter asking for the change with the number in '+
      'front.',
      'Cada niño elige UNA cosa del colegio o de su calle que se puede mejorar, la cuenta durante '+
      'una semana, y escribe una carta pidiendo el cambio con el número delante.'),
    incluye:[L('The thing I chose and why','La cosa que elegí y por qué'),
             L('My tally chart for one week','Mi tabla de conteo de una semana'),
             L('My bar graph or my pictograph','Mi gráfico de barras o mi pictograma'),
             L('The letter, with its parts','La carta, con sus partes'),
             L('A photo of before and one of now, or a drawing of how they told me it was',
               'Una foto de antes y una de ahora, o el dibujo de cómo me lo contaron')]
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:L('Look','Mirar'), foco:L('Where I am','Dónde estoy'),
     hace:L('A walk around the school with an observation card. What they like and what they do '+
       'not gets marked. Social Studies brings in "About me" and the differences between '+
       'classmates; Science, the research question and the prediction.',
       'Recorrido por el colegio con una tarjeta de observación. Se marca lo que gusta y lo que '+
       'no. En Social entra "About me" y las diferencias entre compañeros; en Science, la '+
       'pregunta de investigación y la predicción.'),
     evidencia:L('Observation card','Tarjeta de observación')},
    {n:2, periodo:1, semana:2, fase:L('Look','Mirar'), foco:L('What harms the air and the water','Qué daña el aire y el agua'),
     hace:L('The four types of pollution, two a week, exactly as the plan spreads them. Each one '+
       'is looked for in the school itself before it is looked at in a picture.',
       'Los cuatro tipos de contaminación, dos por semana, tal como los reparte el plan. Se busca '+
       'cada uno en el propio colegio antes de mirarlo en una lámina.'),
     evidencia:L('Pollution hunt','Búsqueda de contaminación')},
    {n:3, periodo:1, semana:3, fase:L('Look','Mirar'), foco:'Reduce, reuse, recycle',
     hace:L('What I can stop using, what I can use again and what goes to recycling. It connects '+
       'with the rules of coexistence Social Studies works on this same week.',
       'Qué puedo dejar de usar, qué puedo volver a usar y qué va al reciclaje. Se conecta con '+
       'las reglas de convivencia que Social trabaja esta misma semana.'),
     evidencia:L('The three-bin sort','La clasificación de los tres cubos')},
    {n:4, periodo:1, semana:4, fase:L('Count','Contar'), foco:L('Choosing my one thing','Elegir mi cosa'),
     hace:L('Each child chooses the thing to count. It has to be something you can see and count: '+
       'cups, lights left on, papers, taps left running.',
       'Cada niño elige la cosa que va a contar. Tiene que ser algo que se pueda ver y contar: '+
       'vasos, luces encendidas, papeles, grifos abiertos.'),
     evidencia:L('My question','Mi pregunta')},
    {n:5, periodo:1, semana:5, fase:L('Count','Contar'), foco:L('Counting for a week','Contar una semana'),
     hace:L('Tally chart, which is exactly what Math is teaching these two weeks. Counting happens '+
       'every day at the same time.',
       'Tally chart, que es exactamente lo que Math está dando estas dos semanas. Se cuenta todos '+
       'los días a la misma hora.'),
     evidencia:L('Tally chart','Tabla de conteo')},
    {n:6, periodo:1, semana:6, fase:L('Count','Contar'), foco:L('Showing the number','Enseñar el número'),
     hace:L('The same data as a bar graph and as a pictograph with a scale up to 10. Which one is '+
       'easier to understand and why.',
       'El mismo dato en gráfico de barras y en pictograma con escala hasta 10. Cuál se entiende '+
       'mejor y por qué.'),
     evidencia:L('Bar graph + pictograph','Gráfico de barras + pictograma')},
    {n:7, periodo:2, semana:1, fase:L('Ask','Preguntar'), foco:L('Before and now','Antes y ahora'),
     hace:L('P2 begins, and with it "My Personal Story". What has changed in my life. An old '+
       'photo and an old object are brought from home.',
       'Arranca P2 y con él "My Personal Story". Qué ha cambiado en mi vida. Se trae de casa una '+
       'foto antigua y un objeto antiguo.'),
     evidencia:L('Before / now pair','Pareja antes / ahora')},
    {n:8, periodo:2, semana:2, fase:L('Ask','Preguntar'), foco:L('The time line','La línea de tiempo'),
     hace:L('Personal and school timeline. Math comes in with the calendar, the clock and the '+
       'relations between day, week, month and year.',
       'Línea de tiempo personal y del colegio. Math entra con el calendario, la hora y las '+
       'relaciones entre día, semana, mes y año.'),
     evidencia:L('Time line','Línea de tiempo')},
    {n:9, periodo:2, semana:3, fase:L('Ask','Preguntar'), foco:L('Asking the people who were here','Preguntar a quienes ya estaban'),
     hace:L('Interview with a grandparent, a neighbour or somebody at school who has been here '+
       'many years. Three questions prepared beforehand. What this was like and what has been lost.',
       'Entrevista a un abuelo, un vecino o alguien del colegio que lleve muchos años. Tres '+
       'preguntas preparadas antes. Cómo era esto y qué se ha perdido.'),
     evidencia:L('Interview notes','Notas de la entrevista')},
    {n:10, periodo:2, semana:4, fase:L('Write','Escribir'), foco:L('The parts of a letter','Las partes de una carta'),
     hace:L('Comunicación teaches the parts of a letter and the draft this same week. The '+
       'project letter IS the Comunicación draft, not a separate piece of work.',
       'Comunicación da las partes de la carta y el borrador esta misma semana. La carta del '+
       'proyecto ES el borrador de Comunicación, no un trabajo aparte.'),
     evidencia:L('Letter draft','Borrador de la carta')},
    {n:11, periodo:2, semana:5, fase:L('Deliver','Entregar'), foco:L('Delivering it','Entregarla'),
     hace:L('Final letter with the graph attached. It is handed to the real person and read out '+
       'loud to the class. In English, the short version: "In my school there are ... every day."',
       'Carta final con el gráfico pegado. Se entrega a la persona real y se lee en voz alta a la '+
       'clase. En inglés, la versión corta: "In my school there are ... every day."'),
     evidencia:L('Letter delivered + reading','Carta entregada + lectura')}
  ],
  evaluacion:[
    {criterio:L('I look after the place I am in','Cuido el lugar donde estoy'),
     descriptor:L('Names actions that take care and actions that harm, and explains which one he chose and why.',
                  'Nombra acciones que cuidan y acciones que dañan, y explica cuál eligió y por qué.')},
    {criterio:L('I count and I show','Cuento y muestro'),
     descriptor:L('Records for a week without skipping days and shows the data in a graph that can be read.',
                  'Registra durante una semana sin saltarse días y representa el dato en un gráfico que se entiende.')},
    {criterio:L('I write a letter','Escribo una carta'),
     descriptor:L('The letter has its parts, is addressed to somebody specific and asks for one clear thing.',
                  'La carta tiene sus partes, se dirige a alguien concreto y pide una cosa clara.')},
    {criterio:L('I ask other people','Pregunto a otros'),
     descriptor:L('Prepares the questions beforehand, listens to the answer and retells it afterwards in his own words.',
                  'Prepara sus preguntas antes, escucha la respuesta y la cuenta después con sus palabras.')}
  ],
  diferenciacion:[
    L('Counting can be done with marks, with stickers or with photos from the family phone.',
      'Contar se puede hacer con marcas, con pegatinas o con fotos del móvil de la familia.'),
    L('The letter can be dictated and then copied; what is assessed is that it has its parts.',
      'La carta se puede dictar y después copiar; lo que se evalúa es que tenga sus partes.'),
    L('The interview can be in Spanish. The project belongs to every subject, not only to English.',
      'La entrevista puede ser en castellano. El proyecto es de todas las áreas, no solo de inglés.')
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:L('The child shows his chart, his graph and his letter, and says in one sentence what '+
      'answer he got. The question asked in front of the family is the same one asked all term: '+
      '"what evidence do you have?"',
      'El niño enseña su tabla, su gráfico y su carta, y cuenta en una frase qué le respondieron. '+
      'La pregunta que se le hace delante de la familia es la misma que se le hizo todo el '+
      'trimestre: "¿qué evidencia tienes?"')},
  toddle:[{periodo:1, nombre:'P1 - Community Voices', tipo:IDU, semanas:5, area:'STEAM +2'},
          {periodo:2, nombre:'P2 - Living Changes: My Story, Our World and Life Cycles', tipo:IDU, semanas:5, area:'Social Studies +1'}],
  unidades:[],
  revisar:[
    L('In Toddle this term is TWO projects with names of their own, not one: "Community Voices" '+
      'and "Living Changes: My Story, Our World and Life Cycles". The arc joins them; if '+
      'coordination prefers to keep them apart, this stays only as a term-wide view.',
      'En Toddle este trimestre son DOS proyectos con nombre propio, no uno: «Community Voices» y '+
      '«Living Changes: My Story, Our World and Life Cycles». El arco los junta; si coordinación '+
      'prefiere mantenerlos separados, esto se queda solo como vista de trimestre.'),
    L('Who the letter goes to is the tutor decision: it has to be somebody who can really answer, '+
      'or the product loses its point.',
      'El destinatario de la carta lo decide el tutor: tiene que ser alguien que de verdad pueda '+
      'responder, o el producto pierde su sentido.'),
    L('Art, Music and Drama have no content loaded in the Grade 2 annual plan; if they have it in '+
      'their own planning, it has to be hooked in here.',
      'Art, Music y Drama no tienen contenido cargado en el plan anual de 2.º; si lo tienen en su '+
      'propia programación, hay que engancharlo aquí.')]
},

'g2.t2': {
  grade:'g2', label:'Grade 2', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🦋', from:'#245c34', to:'#68b46c'},
  titulo:'Who lives in our school',
  subtitulo:L('A field guide to the playground, and to the people who look after it',
              'Una guía de campo del patio, y de la gente que lo cuida'),
  areaEje:'science', areasArticuladas:['social','math','comunicacion','english'],
  situacion:L('P3 and P4 give Grade 2 the whole living-things block: the animal kingdom '+
    '(vertebrates and invertebrates, external body parts and body coverings), the plant kingdom '+
    '(flowering and non-flowering, parts of the plant), life cycles and who eats whom. Alongside, '+
    'Social Studies works on the jobs in my community and what they are for, the institutions and '+
    'the work-need-quality of life relation, and positions and reference points. Math brings in '+
    'the units of length, mass and capacity. That is, literally, a field guide: describe, measure, '+
    'locate and ask whoever looks after it.',
    'P3 y P4 dan a 2.º el bloque de seres vivos completo: reino animal (vertebrados e '+
    'invertebrados, partes externas y cubiertas del cuerpo), reino vegetal (con flor y sin flor, '+
    'partes de la planta), ciclos de vida y quién come a quién. En paralelo, Social trabaja los '+
    'oficios de mi comunidad y para qué sirven, las instituciones y la relación trabajo-necesidad-'+
    'calidad de vida, y las posiciones y puntos de referencia. Math pone las unidades de longitud, '+
    'masa y capacidad. Eso es, literalmente, una guía de campo: describir, medir, situar y '+
    'preguntar a quien lo cuida.'),
  preguntaEsencial:L('Who lives in our school, and who looks after them?',
    '¿Quién vive en nuestro colegio y quién lo cuida?'),
  narrativa:L('Our school is full of living things and most of them have never been written down. '+
    'You are going to be the first ones to do it. You will find them, look at them properly, '+
    'measure them, say exactly where they are, and draw them. And you will interview the people '+
    'whose job is to keep them alive. At the end we will have a book that did not exist, and the '+
    'families will walk through the school with it in their hands.',
    'Nuestro colegio está lleno de seres vivos y casi ninguno se ha escrito nunca. Vais a ser los '+
    'primeros en hacerlo. Los encontraréis, los miraréis bien, los mediréis, diréis exactamente '+
    'dónde están y los dibujaréis. Y entrevistaréis a la gente cuyo trabajo es mantenerlos vivos. '+
    'Al final tendremos un libro que no existía, y las familias recorrerán el colegio con él en '+
    'la mano.'),
  orientadoras:{
    science:L('How do I group living things and how does each one change along its life?',
              '¿Cómo agrupo a los seres vivos y cómo cambia cada uno a lo largo de su vida?'),
    social:L('What jobs does this place need to work, and what need does each one cover?',
             '¿Qué oficios hacen falta para que este lugar funcione, y qué necesidad cubre cada uno?'),
    math:L('How long, how heavy and how much does it hold? And how do I say where it is?',
           '¿Cuánto mide, cuánto pesa y cuánto cabe? ¿Y cómo digo dónde está?'),
    comunicacion:L('How do you write a text that explains, and how do you present it to others?',
                   '¿Cómo se escribe un texto que explica, y cómo se expone delante de otros?'),
    english:L('Can I describe a living thing and say where it is?',
              '¿Sé describir un ser vivo y decir dónde está?')
  },
  competencias:[
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about living things, matter and energy','Comprende y usa conocimientos sobre los seres vivos, materia y energía'),
                  L('Evaluates what scientific and technological work implies','Evalúa las implicancias del saber y del quehacer científico y tecnológico')]},
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Analyses data and information','Analiza datos e información')]},
    {area:'social', nombre:L('Responsibly manages economic resources','Gestiona responsablemente los recursos económicos'),
     capacidades:[L('Understands the relations inside the economic and financial system','Comprende las relaciones entre los elementos del sistema económico y financiero')]},
    {area:'math', nombre:L('Solves problems of shape, movement and location','Resuelve problemas de forma, movimiento y localización'),
     capacidades:[L('Models objects with geometric shapes and their transformations','Modela objetos con formas geométricas y sus transformaciones'),
                  L('Uses strategies and procedures to measure and find his way in space','Usa estrategias y procedimientos para medir y orientarse en el espacio')]},
    {area:'comunicacion', nombre:L('Speaks in his mother tongue','Se comunica oralmente en su lengua materna'),
     capacidades:[L('Fits, organises and develops ideas coherently','Adecúa, organiza y desarrolla las ideas de forma coherente'),
                  L('Interacts strategically with different people','Interactúa estratégicamente con distintos interlocutores')]}
  ],
  producto:{
    titulo:'The Nordic Field Guide',
    audiencia:L('The families, on a guided walk around the playground; and the Grade 1 class, who '+
      'keep the copy next year.',
      'Las familias, en una visita guiada por el patio; y la clase de 1.º, que se queda con el '+
      'ejemplar el año que viene.'),
    descripcion:L('One guide page per child: the living thing, its group, its parts, its measure, '+
      'a map of where it is, and who looks after it. Bound into a single class guide.',
      'Una página de guía por niño: el ser vivo, su grupo, sus partes, su medida, un mapa de dónde '+
      'está, y quién lo cuida. Encuadernado en una sola guía de la clase.'),
    incluye:[L('My field card with a drawing from life','Mi ficha de campo con dibujo del natural'),
             L('My living thing classified, and its parts','Mi ser vivo clasificado y sus partes'),
             L('Its length and its mass, with the right unit','Su medida y su masa, con la unidad correcta'),
             L('The map: where it is, with reference points','El mapa: dónde está, con referencias'),
             L('The interview with the job that looks after it','La entrevista al oficio que lo cuida'),
             L('The cover: what material I chose and why','La tapa: qué material elegí y por qué')]
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:L('Classify','Clasificar'), foco:L('Vertebrates and invertebrates','Vertebrados e invertebrados'),
     hace:L('Trip to the playground with a magnifying glass. Whatever is there is collected and '+
       'grouped before anybody says how to group it. Then it is compared with the classification '+
       'in the book.',
       'Salida al patio con lupa. Se recoge lo que hay y se agrupa antes de que nadie diga cómo '+
       'se agrupa. Después se compara con la clasificación del libro.'),
     evidencia:L('First sort','Primera clasificación')},
    {n:2, periodo:3, semana:2, fase:L('Classify','Clasificar'), foco:L('Body parts and body coverings','Partes y cubiertas del cuerpo'),
     hace:L('External body parts of animals and what each covering is for. Each child now chooses '+
       'his living thing and starts his card.',
       'Partes externas del cuerpo de los animales y para qué sirve cada cubierta. Cada niño elige '+
       'ya su ser vivo y empieza su ficha.'),
     evidencia:L('Field card, part 1','Ficha de campo, parte 1')},
    {n:3, periodo:3, semana:3, fase:L('Classify','Clasificar'), foco:L('The people who keep it alive','Quienes lo mantienen vivo'),
     hace:L('Jobs in my community and what they are for. Interview with the school staff who look '+
       'after the playground, the plants or the animals. Questions prepared the lesson before.',
       'Oficios de mi comunidad y para qué sirven. Entrevista al personal del colegio que cuida el '+
       'patio, las plantas o los animales. Preguntas preparadas la clase anterior.'),
     evidencia:L('Interview','Entrevista')},
    {n:4, periodo:3, semana:4, fase:L('Classify','Clasificar'), foco:L('Flowering and non-flowering plants','Plantas con flor y sin flor'),
     hace:L('The plant kingdom. The plants of the school are shared out between teams and '+
       'classified on the spot, without pulling them up.',
       'Reino vegetal. Las plantas del colegio se reparten entre los equipos y se clasifican en el '+
       'sitio, sin arrancarlas.'),
     evidencia:L('Plant sort','Clasificación de plantas')},
    {n:5, periodo:3, semana:5, fase:L('Classify','Clasificar'), foco:L('Parts of the plant and what they do','Partes de la planta y su función'),
     hace:L('Parts of the plant and their function. The card is completed by those who chose a plant.',
       'Partes de la planta y su función. Se completa la ficha de los que eligieron planta.'),
     evidencia:L('Field card, part 2','Ficha de campo, parte 2')},
    {n:6, periodo:3, semana:6, fase:L('Classify','Clasificar'), foco:L('What we found out','Lo que averiguamos'),
     hace:L('P3 closes: all the cards go up on the wall and the class looks for what repeats. '+
       'Which group has the most specimens in our school?',
       'Cierre de P3: se ponen todas las fichas en la pared y se busca lo que se repite. ¿Qué '+
       'grupo tiene más ejemplares en nuestro colegio?'),
     evidencia:L('Class wall','Mural de la clase')},
    {n:7, periodo:4, semana:1, fase:L('Measure','Medir'), foco:L('Life cycles','Ciclos de vida'),
     hace:L('P4 begins. Life cycle in animals and plants: birth, growth, maturity, reproduction '+
       'and death. Where in its cycle is mine?',
       'Arranca P4. Ciclo de vida en animales y plantas: nacer, crecer, madurar, reproducirse y '+
       'morir. ¿En qué punto de su ciclo está el mío?'),
     evidencia:L('Life cycle strip','Tira del ciclo de vida')},
    {n:8, periodo:4, semana:2, fase:L('Measure','Medir'), foco:L('How long and how heavy','Cuánto mide y cuánto pesa'),
     hace:L('Length in cm and m. The living thing or its home is measured. Estimate first, measure '+
       'after, and compare the two.',
       'Longitud en cm y m. Se mide el ser vivo o su casa. Estimar primero, medir después, y '+
       'comparar las dos cosas.'),
     evidencia:L('Measurement log','Registro de medidas')},
    {n:9, periodo:4, semana:3, fase:L('Measure','Medir'), foco:L('Who eats whom','Quién come a quién'),
     hace:L('Carnivore, herbivore, omnivore. The short chain mine belongs to is drawn.',
       'Carnívoro, herbívoro, omnívoro. Se dibuja la cadena corta a la que pertenece el mío.'),
     evidencia:L('Food chain','Cadena alimentaria')},
    {n:10, periodo:4, semana:4, fase:L('Locate','Situar'), foco:L('Where exactly it is','Dónde está exactamente'),
     hace:L('Map of the playground with reference points: in front, behind, inside, outside, near, '+
       'far. Another child has to get there with my map alone. If he does not, the map is corrected.',
       'Mapa del patio con puntos de referencia: delante, detrás, dentro, fuera, cerca, lejos. '+
       'Otro niño tiene que llegar hasta ahí solo con mi mapa. Si no llega, el mapa se corrige.'),
     evidencia:L('Map that works','Un mapa que funciona')},
    {n:11, periodo:4, semana:5, fase:L('Locate','Situar'), foco:L('Choosing the cover','Elegir la tapa'),
     hace:L('Types of material and their properties: hard, soft, flexible, rigid. Transparent, '+
       'translucent, opaque. What material survives a guide a hundred hands will touch?',
       'Tipos de materiales y sus propiedades: duro, blando, flexible, rígido. Transparente, '+
       'translúcido, opaco. ¿Qué material aguanta una guía que van a tocar cien manos?'),
     evidencia:L('Cover, with the reason','La tapa, con su motivo')},
    {n:12, periodo:4, semana:6, fase:L('Teach','Enseñar'), foco:L('The guided tour','La visita guiada'),
     hace:L('The guide is bound and the families do the walk. Each child stays at his stop and '+
       'explains his living thing with the guide open.',
       'La guía se encuaderna y las familias hacen el recorrido. Cada niño se queda en su parada y '+
       'explica su ser vivo con la guía abierta.'),
     evidencia:L('Guided tour','Visita guiada')}
  ],
  evaluacion:[
    {criterio:L('I classify and explain','Clasifico y explico'),
     descriptor:L('Puts his living thing in its group, names its parts and says what each one is for.',
                  'Coloca su ser vivo en su grupo, nombra sus partes y dice para qué sirve cada una.')},
    {criterio:L('I measure properly','Mido bien'),
     descriptor:L('Chooses the right unit, estimates before measuring and writes down the result with its unit.',
                  'Elige la unidad correcta, estima antes de medir y anota el resultado con su unidad.')},
    {criterio:L('I say where it is','Digo dónde está'),
     descriptor:L('His map gets another child to the place without help.',
                  'Su mapa lleva a otro niño hasta el sitio sin ayuda.')},
    {criterio:L('I explain it to somebody who was not there','Explico a alguien que no estaba'),
     descriptor:L('Holds his stop on the tour, answers a question and does not read the whole card.',
                  'Sostiene su parada de la visita, responde una pregunta y no lee la ficha entera.')}
  ],
  diferenciacion:[
    L('The card can be completed with a drawing and labels, with a photo and labels, or with text.',
      'La ficha se puede completar con dibujo y etiquetas, con foto y etiquetas, o con texto.'),
    L('The interview is done in pairs: one asks and one writes down.',
      'La entrevista se hace en pareja: uno pregunta y otro apunta.'),
    L('The tour stop can be shared by two if speaking alone in front of adults is a blocker.',
      'La parada de la visita se puede hacer entre dos si hablar solo delante de adultos bloquea.')
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:L('The child brings his page of the guide and explains how he decided which group his '+
      'living thing belongs to. He is not asked to recite the classification: he is asked to '+
      'justify his own.',
      'El niño trae su página de la guía y explica cómo decidió a qué grupo pertenece su ser vivo. '+
      'No se le pide que recite la clasificación: se le pide que justifique la suya.')},
  toddle:[{periodo:3, nombre:'P3 - Peru: Our Home', tipo:IDU, semanas:5, area:'Social Studies +1'},
          {periodo:4, nombre:'P4 - Growing, Changing and Learning', tipo:IDU, semanas:5, area:'Social Studies'},
          {periodo:4, nombre:'P4 - Growing, Changing & Learning', tipo:IDU, semanas:6, area:'Science'}],
  unidades:[],
  revisar:[
    L('WATCH OUT: in Toddle, P3 of Grade 2 is "Peru: Our Home" and P4 is "Growing, Changing and '+
      'Learning". This field guide of the school is NOT what the planner says. Somebody has to '+
      'decide which one wins before this arc is used.',
      'OJO: en Toddle, P3 de 2.º es «Peru: Our Home» y P4 «Growing, Changing and Learning». Esta '+
      'guía de campo del colegio NO es lo que dice el planificador. Hay que decidir cuál manda '+
      'antes de usar el arco.'),
    L('P4 is entered TWICE in Toddle: "Growing, Changing and Learning" (Social, 5 weeks) and '+
      '"Growing, Changing & Learning" (Science, 6 weeks). Same project, two records and two '+
      'durations.',
      'P4 está dado de alta DOS VECES en Toddle: «Growing, Changing and Learning» (Social, 5 '+
      'semanas) y «Growing, Changing & Learning» (Science, 6 semanas). Mismo proyecto, dos fichas '+
      'y dos duraciones.'),
    L('If the school has no staff available for the interviews, a visit from the gardener or the '+
      'cleaning staff to the classroom will do; what will not do is inventing the job.',
      'Si el colegio no tiene personal disponible para las entrevistas, sirve una visita del '+
      'jardinero o del personal de limpieza a la clase; lo que no sirve es inventar el oficio.'),
    L('The playground trip in week 1 needs magnifying glasses: they have to be requested in P2, '+
      'not in June.',
      'La salida al patio de la semana 1 necesita lupas: hay que pedirlas en P2, no en junio.')]
},

'g2.t3': {
  grade:'g2', label:'Grade 2', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🔦', from:'#7a4a10', to:'#e0a83a'},
  titulo:'Light and movement',
  subtitulo:L('The shadow theatre and the things that move',
              'El teatro de sombras y las cosas que se mueven'),
  areaEje:'science', areasArticuladas:['math','social','english','comunicacion'],
  situacion:L('P5 gives energy and light (sources of energy, light as a form of energy, colour, '+
    'shadows and lighting) and P6 gives movement, forces and gravity (pushing and pulling, the '+
    'effect of the surface, falling objects). The two halves are the same question asked twice: '+
    'what makes something visible, and what makes something move. Social Studies brings in, in P5, '+
    'the management of the environment and of risk, and equity in how roles are shared out.',
    'P5 da energía y luz (fuentes de energía, la luz como forma de energía, color, sombras e '+
    'iluminación) y P6 da movimiento, fuerzas y gravedad (empujar y tirar, el efecto de la '+
    'superficie, la caída de los objetos). Las dos mitades son la misma pregunta hecha dos veces: '+
    'qué hace que algo se vea, y qué hace que algo se mueva. Social aporta en P5 la gestión del '+
    'ambiente y del riesgo, y la equidad en el reparto de roles.'),
  preguntaEsencial:L('What makes things visible, and what makes things move?',
    '¿Qué hace que las cosas se vean, y qué hace que las cosas se muevan?'),
  narrativa:L('Nursery has never had a shadow theatre, and after that nobody in this school has '+
    'ever built a machine that moves on its own. You are going to do both. First you find out '+
    'what light does when something gets in its way. Then you find out what makes something '+
    'start moving and what makes it stop. And the little ones come to watch, twice.',
    'Nursery no ha tenido nunca un teatro de sombras, y después nadie en este colegio ha '+
    'construido nunca una máquina que se mueva sola. Vais a hacer las dos cosas. Primero '+
    'averiguáis qué hace la luz cuando algo se le cruza. Después averiguáis qué hace que algo '+
    'empiece a moverse y qué hace que se pare. Y los pequeños vienen a verlo, dos veces.'),
  orientadoras:{
    science:L('Where does light come from and what happens when something crosses it? What makes a body move?',
              '¿De dónde viene la luz y qué pasa cuando algo se cruza? ¿Qué hace que un cuerpo se mueva?'),
    math:L('How do I record what comes out of each test and how do I compare it?',
           '¿Cómo registro lo que sale de cada prueba y cómo lo comparo?'),
    social:L('Who does what in the team, and how do we make sure it is fair?',
             '¿Quién hace qué en el equipo, y cómo nos aseguramos de que sea justo?'),
    english:L('Can I explain my show to somebody younger than me?',
              '¿Sé explicar mi show a alguien más pequeño que yo?')
  },
  competencias:[
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry','Problematiza situaciones para hacer indagación'),
                  L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Evaluates and communicates the process and the results of the inquiry','Evalúa y comunica el proceso y los resultados de su indagación')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about matter and energy','Comprende y usa conocimientos sobre materia y energía')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas')]},
    {area:'social', nombre:L('Lives together and participates democratically in the pursuit of the common good','Convive y participa democráticamente en la búsqueda del bien común'),
     capacidades:[L('Interacts with all people','Interactúa con todas las personas'),
                  L('Builds norms and takes on agreements and rules','Construye normas y asume acuerdos y leyes')]}
  ],
  producto:{
    titulo:'Two shows for Nursery',
    audiencia:L('The Nursery class. If they do not understand it, it does not work: that is the test.',
      'La clase de Nursery. Si no lo entienden, no funciona: esa es la prueba.'),
    descripcion:L('In P5, a shadow theatre that also explains why the shadow changes. In P6, a toy '+
      'or a machine that moves, and the explanation of what pushes it.',
      'En P5, un teatro de sombras que además explica por qué la sombra cambia. En P6, un juguete '+
      'o una máquina que se mueve, y la explicación de qué lo empuja.'),
    incluye:[L('My question and my prediction','Mi pregunta y mi predicción'),
             L('What came out of the test, written down','Lo que salió en la prueba, anotado'),
             L('The shadow theatre','El teatro de sombras'),
             L('The thing that moves','La cosa que se mueve'),
             L('My explanation for a small child','Mi explicación para un niño pequeño')]
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:L('Light','Luz'), foco:L('Where light comes from','De dónde viene la luz'),
     hace:L('Sources of energy: the sun, heat, the wind. Research question and prediction. The '+
       'subject of the show is chosen.',
       'Fuentes de energía: el sol, el calor, el viento. Pregunta de investigación y predicción. '+
       'Se elige de qué va el show.'),
     evidencia:L('My question + my guess','Mi pregunta + mi predicción')},
    {n:2, periodo:5, semana:2, fase:L('Light','Luz'), foco:L('Testing the torch','Probar la linterna'),
     hace:L('ONE thing is changed and everything else is left the same. What happens to the shadow '+
       'if I move the torch?',
       'Se cambia UNA cosa y se deja el resto igual. ¿Qué pasa con la sombra si muevo la linterna?'),
     evidencia:L('Fair test','Prueba justa')},
    {n:3, periodo:5, semana:3, fase:L('Light','Luz'), foco:L('Colour, shadow and light','Color, sombra y luz'),
     hace:L('The effect of light on the body and on the environment: colour, shadows, lighting. '+
       'Tested with coloured papers.',
       'El efecto de la luz sobre el cuerpo y el ambiente: color, sombras, iluminación. Se prueba '+
       'con papeles de colores.'),
     evidencia:L('Colour test','Prueba de color')},
    {n:4, periodo:5, semana:4, fase:L('Light','Luz'), foco:L('Building the theatre','Construir el teatro'),
     hace:L('Building the theatre and rehearsing. Roles are shared out with the equity rule from '+
       'Social Studies: who narrates and who holds the torch rotates.',
       'Construcción del teatro y ensayo. Reparto de roles con la regla de equidad de Social: '+
       'quién narra y quién sostiene la linterna rota.'),
     evidencia:L('Rehearsal','Ensayo')},
    {n:5, periodo:5, semana:5, fase:L('Light','Luz'), foco:L('The shadow show','El teatro de sombras'),
     hace:L('Performance for Nursery. Afterwards, each team explains why the shadow changed size.',
       'Función para Nursery. Después, cada equipo explica por qué la sombra cambiaba de tamaño.'),
     evidencia:'Show #1'},
    {n:6, periodo:6, semana:1, fase:L('Movement','Movimiento'), foco:L('Push and pull','Empujar y tirar'),
     hace:L('P6 begins. Producing movement in bodies: pushing and pulling. Tested with whatever is '+
       'in the classroom.',
       'Arranca P6. Producción de movimiento en los cuerpos: empujar y tirar. Se prueba con lo que '+
       'hay en la clase.'),
     evidencia:L('Push / pull sort','Clasificación empujar / tirar')},
    {n:7, periodo:6, semana:2, fase:L('Movement','Movimiento'), foco:L('Harder or softer','Más fuerte o más flojo'),
     hace:L('The same thing pushed hard and pushed gently. How far it gets is measured. Math comes '+
       'in with addition up to 3 digits to add up the throws.',
       'La misma cosa empujada fuerte y flojo. Se mide cuánto llega. Math entra con la suma hasta '+
       '3 cifras para acumular las tiradas.'),
     evidencia:L('Distance log','Registro de distancias')},
    {n:8, periodo:6, semana:3, fase:L('Movement','Movimiento'), foco:L('The surface matters','La superficie importa'),
     hace:L('Effect of the surface on movement. The same marble on four surfaces. They are put in '+
       'order from most to least.',
       'Efecto de la superficie sobre el movimiento. La misma canica sobre cuatro superficies. Se '+
       'ordena de más a menos.'),
     evidencia:L('Surface ranking','Ranking de superficies')},
    {n:9, periodo:6, semana:4, fase:L('Movement','Movimiento'), foco:L('Falling','Caer'),
     hace:L('Gravity and falling objects. Two different things dropped at the same time. What do '+
       'you think will happen and what happened.',
       'Gravedad y caída de los objetos. Dos cosas distintas soltadas a la vez. Qué crees que va a '+
       'pasar y qué pasó.'),
     evidencia:L('Prediction vs result','Predicción frente a resultado')},
    {n:10, periodo:6, semana:5, fase:L('Movement','Movimiento'), foco:L('Building the moving thing','Construir la cosa que se mueve'),
     hace:L('Building the toy or the machine. It has to move without anybody touching it once it '+
       'has been set off.',
       'Construcción del juguete o la máquina. Tiene que moverse sin que nadie lo toque una vez '+
       'arrancado.'),
     evidencia:L('The machine','La máquina')},
    {n:11, periodo:6, semana:6, fase:L('Teach','Enseñar'), foco:L('The moving show','El show de lo que se mueve'),
     hace:L('Second performance for Nursery. Each child explains what pushes his machine, in words '+
       'a Nursery child understands.',
       'Segunda función para Nursery. Cada niño explica qué empuja su máquina, con las palabras '+
       'que un niño de Nursery entiende.'),
     evidencia:'Show #2'}
  ],
  evaluacion:[
    {criterio:L('I test properly','Pruebo bien'),
     descriptor:L('Changes one single thing, leaves the rest the same, records what he sees and repeats to check.',
                  'Cambia una sola cosa, deja el resto igual, anota lo que ve y repite para comprobar.')},
    {criterio:L('I explain what happens','Explico lo que pasa'),
     descriptor:L('Uses the words of the unit and links what he did with what came out.',
                  'Usa las palabras de la unidad y relaciona lo que hizo con lo que salió.')},
    {criterio:L('I tell it to somebody smaller','Se lo cuento a alguien más pequeño'),
     descriptor:L('Adjusts how he says it until the Nursery child understands, and shows it again if not.',
                  'Ajusta cómo lo dice hasta que el niño de Nursery lo entiende, y vuelve a mostrarlo si no.')}
  ],
  diferenciacion:[
    L('The record can be a drawing, marks or a sentence; what is asked is that he records before he opines.',
      'La anotación puede ser dibujo, marcas o frase; lo que se pide es que registre antes de opinar.'),
    L('Anyone who does not want to speak in front of Nursery can work the torch and explain to the class afterwards.',
      'Quien no quiera hablar delante de Nursery puede manejar la linterna y explicar después a la clase.')
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:L('The child shows his record of the test and gives a small demonstration. He is asked '+
      'what he would change if he did it again.',
      'El niño enseña su registro de la prueba y hace la demostración en pequeño. Se le pregunta '+
      'qué cambiaría si lo repitiera.')},
  toddle:[{periodo:5, nombre:'P5 - Matter Around Us: Little Scientists, Big Changes', tipo:AREA, semanas:6, area:'Social Studies'}],
  unidades:[{n:5, titulo:'The Shadow Show'},{n:6, titulo:L('Things that move','Cosas que se mueven')}],
  revisar:[
    L('This arc is already running as two portal units (U5 and U6). The arc only declares that '+
      'they are one single eleven-week project.',
      'Este arco ya está ejecutado como dos unidades del portal (U5 y U6). El arco solo declara '+
      'que son un mismo proyecto de once semanas.'),
    L('In Toddle, P5 of Grade 2 is "Matter Around Us: Little Scientists, Big Changes" and it is '+
      'NOT interdisciplinary: it is entered as a Social Studies unit. And P6 does not exist in '+
      'Toddle for any primary grade. What this arc puts in P5 and P6 comes from the annual plan '+
      'spreadsheet, not from the planner.',
      'En Toddle, P5 de 2.º es «Matter Around Us: Little Scientists, Big Changes» y NO es '+
      'interdisciplinario: está como unidad de Social Studies. Y P6 no existe en Toddle para '+
      'ningún grado de primaria. Lo que este arco pone en P5 y P6 sale del plan anual en Excel, '+
      'no del planificador.')]
},

/* ==================================================================== 3.o */

'g3.t1': {
  grade:'g3', label:'Grade 3', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🥪', from:'#7a2d3a', to:'#d4756a'},
  titulo:'From problem to proposal',
  subtitulo:L('The healthy stand the class elects, sets up and proves',
              'El quiosco saludable que la clase elige, monta y demuestra'),
  areaEje:'social', areasArticuladas:['science','math','english','comunicacion'],
  situacion:L('The Grade 3 annual plan already has the whole cycle written down, though split '+
    'across two periods. P1 goes from "my city and my district" to "local problems in my '+
    'community", and from there to assemblies, campaign budget, campaign and elections; '+
    'alongside, Science runs the full inquiry process: identifying problems, proposing solutions, '+
    'putting a plan into practice and presenting it. P2 lands that same cycle on something '+
    'concrete: needs and wants, budget basics, the business plan of a healthy snack stand, costs, '+
    'selling at break and presenting the plan; Science carries the nutrition content and the data '+
    'analysis. There is no project to invent: what is needed is to say it is one.',
    'El plan anual de 3.º ya trae el ciclo entero escrito, aunque partido en dos periodos. P1 va '+
    'de "mi ciudad y mi distrito" a "problemas locales de mi comunidad", y de ahí a asambleas, '+
    'presupuesto de campaña, campaña y elecciones; en paralelo, Science recorre el proceso de '+
    'indagación completo: identificar problemas, proponer soluciones, poner un plan en práctica y '+
    'presentarlo. P2 aterriza ese mismo ciclo en algo concreto: necesidades y deseos, nociones de '+
    'presupuesto, plan de negocio de un quiosco saludable, costos, venta en el recreo y '+
    'presentación del plan; Science sostiene el contenido de nutrición y el análisis de datos. No '+
    'hace falta inventar un proyecto: hay que decir que es uno solo.'),
  preguntaEsencial:L('How do we turn a problem in our community into a proposal that actually works?',
    '¿Cómo convertimos un problema de nuestra comunidad en una propuesta que funcione?'),
  narrativa:L('For eleven weeks you are going to do what adults do when something in a place does '+
    'not work: find out how the place is organised, spot a real problem, propose something, get '+
    'people to vote for it, and then prove that it worked. Your proposal is a healthy snack stand '+
    'for our own break time. It has to be elected, it has to have a budget, the food has to be '+
    'genuinely good for you, and at the end you have to show the numbers.',
    'Durante once semanas vais a hacer lo que hacen los adultos cuando algo de un sitio no '+
    'funciona: averiguar cómo está organizado ese sitio, detectar un problema real, proponer algo, '+
    'conseguir que la gente lo vote, y después demostrar que funcionó. Vuestra propuesta es un '+
    'quiosco saludable para nuestro propio recreo. Tiene que salir elegido, tiene que tener '+
    'presupuesto, la comida tiene que ser de verdad buena, y al final hay que enseñar los números.'),
  orientadoras:{
    social:L('How is the place where I live organised and how is a decision made there?',
             '¿Cómo está organizado el lugar donde vivo y cómo se toma allí una decisión?'),
    science:L('How do I go from a problem to a solution I can test? What makes a food good for me?',
              '¿Cómo paso de un problema a una solución que se puede probar? ¿Qué hace que un alimento sea bueno para mí?'),
    math:L('How do I collect data with a survey and how do I show it? How much does it cost and how much is left?',
           '¿Cómo recojo datos con una encuesta y cómo los muestro? ¿Cuánto cuesta y cuánto queda?'),
    comunicacion:L('How do I tell my own story and how do I convince somebody in writing?',
                   '¿Cómo cuento mi propia historia y cómo convenzo a otro por escrito?'),
    english:L('Can I give my opinion about food and say why?',
              '¿Sé dar mi opinión sobre la comida y decir por qué?')
  },
  competencias:[
    {area:'social', nombre:L('Lives together and participates democratically in the pursuit of the common good','Convive y participa democráticamente en la búsqueda del bien común'),
     capacidades:[L('Takes part in actions that promote the common good','Participa en acciones que promueven el bienestar común'),
                  L('Deliberates on public matters','Delibera sobre asuntos públicos'),
                  L('Builds norms and takes on agreements and rules','Construye normas y asume acuerdos y leyes')]},
    {area:'social', nombre:L('Responsibly manages economic resources','Gestiona responsablemente los recursos económicos'),
     capacidades:[L('Understands how the economic and financial system works','Comprende el funcionamiento del sistema económico y financiero'),
                  L('Takes economic and financial decisions','Toma decisiones económicas y financieras')]},
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry','Problematiza situaciones para hacer indagación'),
                  L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Analyses data and information','Analiza datos e información'),
                  L('Evaluates and communicates the process and the results of the inquiry','Evalúa y comunica el proceso y los resultados de su indagación')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas'),
                  L('Backs conclusions or decisions with the information obtained','Sustenta conclusiones o decisiones con base en la información obtenida')]},
    {area:'comunicacion', nombre:L('Writes different kinds of texts in his mother tongue','Escribe diversos tipos de textos en su lengua materna'),
     capacidades:[L('Organises and develops ideas coherently and cohesively','Organiza y desarrolla las ideas de forma coherente y cohesionada'),
                  L('Reflects on and evaluates the form, content and context of the written text','Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito')]}
  ],
  producto:{
    titulo:'The healthy snack stand',
    audiencia:L('The whole school, which buys at break; and the class assembly, which approves or '+
      'rejects the plan before it exists.',
      'El colegio entero, que compra en el recreo; y la asamblea de la clase, que aprueba o '+
      'rechaza el plan antes de que exista.'),
    descripcion:L('A business plan for a healthy snack stand, elected in assembly, with its '+
      'budget, its nutritional justification and its results graphed after the sale.',
      'Un plan de negocio de un quiosco saludable, elegido en asamblea, con su presupuesto, su '+
      'justificación nutricional y sus resultados graficados después de la venta.'),
    incluye:[L('My autobiography (who I am and where I come from)','Mi autobiografía (quién soy y de dónde vengo)'),
             L('The problem we identified','El problema que identificamos'),
             L('The survey and its frequency table','La encuesta y su tabla de frecuencias'),
             L('The business plan with its costs','El plan de negocio con costos'),
             L('The opinion paragraph about our snack','El párrafo de opinión sobre nuestro snack'),
             L('The graph of what happened on the day of the sale','El gráfico de lo que pasó el día de la venta')]
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:L('Know','Conocer'), foco:L('My city, my district','Mi ciudad, mi distrito'),
     hace:L('Peru and its organisation, the regions and the districts of Lima. Science opens the '+
       'inquiry process with field research: what do people at Nordic know about this?',
       'Perú y su organización, las regiones y los distritos de Lima. Science abre el proceso de '+
       'indagación con una investigación de campo: ¿qué sabe la gente de Nordic sobre esto?'),
     evidencia:L('What we found out','Lo que averiguamos')},
    {n:2, periodo:1, semana:2, fase:L('Know','Conocer'), foco:L('Who decides here','Quién decide aquí'),
     hace:L('Plans and sketch maps, the municipal authorities of the district each child lives in, '+
       'and the electoral process. In Comunicación, "my biography" starts.',
       'Planos y croquis, autoridades municipales del distrito donde vive cada uno, y el proceso '+
       'electoral. En Comunicación arranca "mi biografía".'),
     evidencia:L('District card','Ficha del distrito')},
    {n:3, periodo:1, semana:3, fase:L('Know','Conocer'), foco:L('Naming the problem','Nombrar el problema'),
     hace:L('Local problems in the community and in the school. Science: identifying problems '+
       'inside the inquiry process. The problem the campaign will be about is chosen.',
       'Problemas locales de la comunidad y del colegio. Science: identificar problemas dentro del '+
       'proceso de indagación. Se elige el problema del que va a ir la campaña.'),
     evidencia:L('Problem tree','Árbol de problemas')},
    {n:4, periodo:1, semana:4, fase:L('Propose','Proponer'), foco:L('Asking everybody','Preguntar a todos'),
     hace:L('Survey with their own questions, frequency table and conclusions. In English, the '+
       'interview with teachers about healthy habits. Campaign budget in Social Studies.',
       'Encuesta con preguntas propias, tabla de frecuencias y conclusiones. En English, la '+
       'entrevista a los profesores sobre hábitos saludables. Presupuesto de campaña en Social.'),
     evidencia:L('Frequency table','Tabla de frecuencias')},
    {n:5, periodo:1, semana:5, fase:L('Propose','Proponer'), foco:L('The campaign','La campaña'),
     hace:L('Bar graphs from the survey and campaigning in class. Science: the solution plan is '+
       'put into practice. Presentation of the autobiography.',
       'Gráficos de barras a partir de la encuesta y campaña en clase. Science: el plan de '+
       'solución se pone en práctica. Presentación de la autobiografía.'),
     evidencia:L('Bar graph + campaign','Gráfico de barras + campaña')},
    {n:6, periodo:1, semana:6, fase:L('Propose','Proponer'), foco:L('The vote','La votación'),
     hace:L('Elections and listening to classmates opinions. P1 closes with the chosen proposal, '+
       'published.',
       'Elecciones y escucha de las opiniones de los compañeros. Se cierra P1 con la propuesta '+
       'elegida y publicada.'),
     evidencia:L('Elected proposal','Propuesta elegida')},
    {n:7, periodo:2, semana:1, fase:L('Design','Diseñar'), foco:L('Needs and wants','Necesidades y deseos'),
     hace:L('P2 begins. Needs and wants, budget basics. Science comes in with balanced diet, food '+
       'groups and the pyramid.',
       'Arranca P2. Necesidades y deseos, nociones de presupuesto. Science entra con dieta '+
       'equilibrada, grupos de alimentos y la pirámide.'),
     evidencia:L('Needs / wants sort','Clasificación necesidad / deseo')},
    {n:8, periodo:2, semana:2, fase:L('Design','Diseñar'), foco:L('What is really in the food','Qué hay de verdad en la comida'),
     hace:L('Natural versus processed, perishable and non-perishable, energy / body-building / '+
       'protective. In English, the main idea of an informational text on where food comes from.',
       'Natural frente a procesado, perecedero y no perecedero, energético / constructor / '+
       'protector. En English, la idea principal de un texto informativo sobre el origen de los '+
       'alimentos.'),
     evidencia:L('Food label study','Estudio de etiquetas')},
    {n:9, periodo:2, semana:3, fase:L('Design','Diseñar'), foco:L('The business plan','El plan de negocio'),
     hace:L('Business plan for the healthy snack stand: costs and resources needed. Science: '+
       'effects of a poor diet and design of the snack plan. In English, the opinion paragraph.',
       'Plan de negocio del quiosco saludable: costos y recursos necesarios. Science: efectos de '+
       'una mala alimentación y diseño del plan del snack. En English, el párrafo de opinión.'),
     evidencia:L('Business plan, draft','Plan de negocio, borrador')},
    {n:10, periodo:2, semana:4, fase:L('Sell','Vender'), foco:L('Selling at break','Vender en el recreo'),
     hace:L('The sale at break. Science: the solution is applied (lunchbox proposal). Everything '+
       'that happens is recorded: how much was sold, what was left, what people said.',
       'La venta en el recreo. Science: se aplica la solución (propuesta de lonchera). Se registra '+
       'todo lo que pasa: cuánto se vendió, qué sobró, qué dijo la gente.'),
     evidencia:L('Sales log','Registro de ventas')},
    {n:11, periodo:2, semana:5, fase:L('Prove','Demostrar'), foco:L('Proving it','Demostrarlo'),
     hace:L('Data analysis and graphs of the results. Presentation of the business plan with what '+
       'really happened. Final version of the opinion paragraph.',
       'Análisis de datos y gráficos de resultados. Presentación del plan de negocio con lo que de '+
       'verdad pasó. Versión final del párrafo de opinión.'),
     evidencia:L('Results + final pitch','Resultados + presentación final')}
  ],
  evaluacion:[
    {criterio:L('I identify a real problem','Identifico un problema real'),
     descriptor:L('The problem belongs to the school or the district, can be seen, and he explains who it affects.',
                  'El problema es del colegio o del distrito, se puede ver, y explica a quién afecta.')},
    {criterio:L('I collect and show data','Recojo y muestro datos'),
     descriptor:L('His questions give countable answers, the table adds up and the graph says what the text says.',
                  'Sus preguntas dan respuestas contables, la tabla cuadra y el gráfico dice lo que el texto dice.')},
    {criterio:L('I decide with economic criteria','Decido con criterio económico'),
     descriptor:L('Tells a need from a want, works out costs and explains what happens if something turns out dearer.',
                  'Distingue necesidad de deseo, calcula costos y explica qué pasa si algo sale más caro.')},
    {criterio:L('I convince with reasons','Convenzo con razones'),
     descriptor:L('His opinion paragraph gives at least two reasons and one of them comes from his own data.',
                  'Su párrafo de opinión da al menos dos razones y una de ellas viene de sus propios datos.')}
  ],
  diferenciacion:[
    L('The survey can be run in pairs: one asks and one ticks.',
      'La encuesta se puede pasar en pareja: uno pregunta y otro marca.'),
    L('The business plan can be a poster, a table or a text.',
      'El plan de negocio admite formato de póster, de tabla o de texto.'),
    L('Anyone not selling can keep the sales log; the role is agreed in assembly, not assigned.',
      'Quien no venda puede llevar el registro de la venta; el rol se pacta en asamblea, no se asigna.')
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:L('The child shows his frequency table and the graph from the day of the sale, and '+
      'explains one decision the team changed because of what the data said.',
      'El niño enseña su tabla de frecuencias y el gráfico del día de la venta, y explica una '+
      'decisión que el equipo cambió por lo que decían los datos.')},
  toddle:[{periodo:1, nombre:'P1 - My Vote, My Voice', tipo:IDU, semanas:5, area:'Social Studies +1'},
          {periodo:2, nombre:'P2 - The Power of Food (We are Against Anemia)', tipo:IDU, semanas:5, area:'Social Studies +1'}],
  unidades:[],
  revisar:[
    L('It matches Toddle: P1 is "My Vote, My Voice" and P2 is "The Power of Food (We are Against '+
      'Anemia)". In front of the teacher those names are the ones that count, not ours.',
      'Coincide con Toddle: P1 es «My Vote, My Voice» y P2 «The Power of Food (We are Against '+
      'Anemia)». Delante del profesor valen esos nombres, no los nuestros.'),
    L('Selling at break needs permission and a date in the calendar: without a date the arc stays '+
      'a simulation and loses exactly what makes it real.',
      'La venta en el recreo necesita permiso y un día concreto en el calendario: sin fecha el '+
      'arco se queda en simulacro y pierde justamente lo que lo hace real.'),
    L('Food handling: it has to be agreed with administration what may be sold.',
      'Manipulación de alimentos: hay que acordar con administración qué se puede vender.')]
},

'g3.t2': {
  grade:'g3', label:'Grade 3', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🏔️', from:'#1f4f43', to:'#5fae8f'},
  titulo:'One region, and what keeps it alive',
  subtitulo:L('From researching the region to the conservation model',
              'De la investigación de la región al modelo de conservación'),
  areaEje:'social', areasArticuladas:['science','english','math','comunicacion'],
  situacion:L('This arc does not have to be deduced: the annual plan says it. P3 ends with '+
    '"Research project by groups (region assigned): graphs + timeline + economic activity '+
    'explanation", written the same in Social Studies and in Science. And P4 notes in Science '+
    '"Forest vs jungle vs other Peruvian landscapes (connection to Proyecto 3)". They are one '+
    'project: first a region of Peru and what is produced there is researched, and then the '+
    'ecosystem that holds it up is studied and a way to conserve it is proposed. The Grade 3 '+
    'study trip falls in between, in August.',
    'Este arco no hay que deducirlo: el plan anual lo dice. P3 termina con "Research project by '+
    'groups (region assigned): graphs + timeline + economic activity explanation", escrito igual '+
    'en Social y en Science. Y P4 anota en Science "Forest vs jungle vs other Peruvian landscapes '+
    '(connection to Proyecto 3)". Son un mismo proyecto: primero se investiga una región del Perú '+
    'y lo que se produce en ella, y después se estudia el ecosistema que la sostiene y se propone '+
    'cómo conservarlo. En medio cae el viaje de estudios de 3.º (agosto).'),
  preguntaEsencial:L('How do people use what their region gives them without destroying the place they live in?',
    '¿Cómo usan las personas los recursos de su región sin destruir el lugar donde viven?'),
  narrativa:L('Each team gets one region of Peru. Not a poster about it — an investigation. You '+
    'will find out what the land gives, what people do with it, how long they have been doing it, '+
    'and what it is costing. Then you will study the ecosystem underneath all that, build a model '+
    'of it, and defend a proposal for keeping it alive in front of the class assembly.',
    'A cada equipo le toca una región del Perú. No un póster sobre ella — una investigación. Vais '+
    'a averiguar qué da esa tierra, qué hace la gente con ello, desde cuándo lo hace, y qué está '+
    'costando. Después estudiaréis el ecosistema que hay debajo de todo eso, construiréis una '+
    'maqueta y defenderéis en la asamblea de la clase una propuesta para mantenerlo vivo.'),
  orientadoras:{
    social:L('What makes this region live, and since when? What rules protect it?',
             '¿Qué hace vivir a esta región y desde cuándo? ¿Qué reglas la protegen?'),
    science:L('What ecosystem is under that activity and what happens to it when we use it?',
              '¿Qué ecosistema hay debajo de esa actividad y qué le pasa cuando la usamos?'),
    english:L('Can I write an informative text about my region and suggest what should be done?',
              '¿Sé escribir un texto informativo sobre mi región y sugerir qué habría que hacer?'),
    math:L('How do I represent the region on a plan and how do I show its data?',
           '¿Cómo represento la región en un plano y cómo muestro sus datos?'),
    comunicacion:L('What do the legends and myths of a place tell us about its people?',
                   '¿Qué cuentan las leyendas y los mitos de un lugar sobre su gente?')
  },
  competencias:[
    {area:'social', nombre:L('Responsibly manages space and the environment','Gestiona responsablemente el espacio y el ambiente'),
     capacidades:[L('Understands the relations between natural and social elements','Comprende las relaciones entre los elementos naturales y sociales'),
                  L('Handles sources of information to understand geographical space','Maneja fuentes de información para comprender el espacio geográfico'),
                  L('Generates actions to conserve the local and global environment','Genera acciones para conservar el ambiente local y global')]},
    {area:'social', nombre:L('Builds historical interpretations','Construye interpretaciones históricas'),
     capacidades:[L('Understands historical time','Comprende el tiempo histórico'),
                  L('Explains historical processes','Elabora explicaciones sobre procesos históricos')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about biodiversity, Earth and the universe','Comprende y usa conocimientos sobre biodiversidad, Tierra y universo'),
                  L('Evaluates what scientific and technological work implies','Evalúa las implicancias del saber y del quehacer científico y tecnológico')]},
    {area:'science', nombre:L('Designs and builds technological solutions to problems around him','Diseña y construye soluciones tecnológicas para resolver problemas de su entorno'),
     capacidades:[L('Determines an alternative technological solution','Determina una alternativa de solución tecnológica'),
                  L('Designs the alternative technological solution','Diseña la alternativa de solución tecnológica'),
                  L('Implements and validates the alternative technological solution','Implementa y valida la alternativa de solución tecnológica')]},
    {area:'math', nombre:L('Solves problems of shape, movement and location','Resuelve problemas de forma, movimiento y localización'),
     capacidades:[L('Uses strategies and procedures to find his way in space','Usa estrategias y procedimientos para orientarse en el espacio')]}
  ],
  producto:{
    titulo:'Region file + habitat model',
    audiencia:L('The class assembly, which approves or sends back each conservation proposal; and '+
      'the families on Student Achievement Day.',
      'La asamblea de la clase, que aprueba o devuelve cada propuesta de conservación; y las '+
      'familias en el Student Achievement Day.'),
    descripcion:L('A file on the assigned region (graphs, timeline and an explanation of its '+
      'economic activity) and, on top of it, a model of the ecosystem with a conservation '+
      'proposal defended in assembly.',
      'Un dossier de la región asignada (gráficos, línea de tiempo y explicación de su actividad '+
      'económica) y, sobre él, una maqueta del ecosistema con una propuesta de conservación '+
      'defendida en asamblea.'),
    incluye:[L('My region: map, landscape and resources','Mi región: mapa, paisaje y recursos'),
             L('Timeline of its economic activity','Línea de tiempo de su actividad económica'),
             L('Production graphs','Gráficos de producción'),
             L('The environmental problem of my region','El problema ambiental de mi región'),
             L('The habitat model','La maqueta del hábitat'),
             L('The conservation proposal, with what it costs and who does it','La propuesta de conservación, con lo que cuesta y quién la hace')]
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:L('Research','Investigar'), foco:L('The 24 regions','Las 24 regiones'),
     hace:L('The 24 regions, the landscapes of Peru and its tourist places. Regions are shared out '+
       'between teams. Science comes in with the natural regions and their resources.',
       'Las 24 regiones, los paisajes del Perú y los lugares turísticos. Se reparten las regiones '+
       'por equipos. Science entra con las regiones naturales y sus recursos.'),
     evidencia:L('Region assigned + first map','Región asignada + primer mapa')},
    {n:2, periodo:3, semana:2, fase:L('Research','Investigar'), foco:L('How long it has been happening','Desde cuándo pasa'),
     hace:L('Years and decades, BCE and CE, describing historical events. In English, the sequence '+
       'of events with past simple and time connectors.',
       'Años y décadas, antes y después de Cristo, descripción de hechos históricos. En English, '+
       'la secuencia de sucesos con pasado simple y conectores de tiempo.'),
     evidencia:L('Time line, draft','Línea de tiempo, borrador')},
    {n:3, periodo:3, semana:3, fase:L('Research','Investigar'), foco:L('Renewable or not','Renovable o no'),
     hace:L('Renewable and non-renewable resources; national symbols and the history of flags in '+
       'Social Studies. Vocabulary of the economic activities of Peru in English.',
       'Recursos renovables y no renovables; símbolos nacionales e historia de las banderas en '+
       'Social. Vocabulario de las actividades económicas del Perú en English.'),
     evidencia:L('Resource sort','Clasificación de recursos')},
    {n:4, periodo:3, semana:4, fase:L('Research','Investigar'), foco:L('What is produced here','Qué se produce aquí'),
     hace:L('Main economic activities and budget on a national scale. Science: the production and '+
       'transformation of resources. Mining, fishing, agriculture, textiles.',
       'Principales actividades económicas y presupuesto a escala nacional. Science: proceso de '+
       'producción y transformación de los recursos. Minería, pesca, agricultura, textil.'),
     evidencia:L('Production chain','Cadena de producción')},
    {n:5, periodo:3, semana:5, fase:L('Research','Investigar'), foco:L('What it is costing','Qué está costando'),
     hace:L('Environmental problems by region and strategies to cut pollution. In English, problem '+
       'and solution paragraphs with can and should.',
       'Problemas ambientales por región y estrategias para reducir la contaminación. En English, '+
       'párrafos de problema y solución con can y should.'),
     evidencia:L('Problem + solution paragraph','Párrafo de problema y solución')},
    {n:6, periodo:3, semana:6, fase:L('Research','Investigar'), foco:L('Presenting the region','Presentar la región'),
     hace:L('P3 closes: the group research project, with graphs, timeline and an explanation of '+
       'the economic activity. Oral presentation with visual support.',
       'Cierre de P3: el proyecto de investigación por grupos, con gráficos, línea de tiempo y '+
       'explicación de la actividad económica. Presentación oral con apoyo visual.'),
     evidencia:L('Region file presented','Dossier de la región presentado')},
    {n:7, periodo:4, semana:1, fase:L('Observe','Observar'), foco:L('The ecosystem underneath','El ecosistema de debajo'),
     hace:L('P4 begins. Ecosystems with a focus on the forest, living and non-living components, '+
       'animal classification and habitats. Social Studies prepares the trip rules and the '+
       'interview questions.',
       'Arranca P4. Ecosistemas con foco en el bosque, componentes vivos y no vivos, clasificación '+
       'animal y hábitats. Social prepara las reglas del viaje y las preguntas de la entrevista.'),
     evidencia:L('Interview questions ready','Preguntas de entrevista listas')},
    {n:8, periodo:4, semana:2, fase:L('Observe','Observar'), foco:L('The study trip','El viaje de estudios'),
     hace:L('Grade 3 study trip. Field notebook: what is seen, what is heard, what is collected. '+
       'Responsible tourism and personal boundaries in public spaces.',
       'Viaje de estudios de 3.º. Cuaderno de campo: qué se ve, qué se oye, qué se recoge. Turismo '+
       'responsable y límites personales en espacios públicos.'),
     evidencia:L('Field notes','Notas de campo')},
    {n:9, periodo:4, semana:3, fase:L('Observe','Observar'), foco:L('Who eats whom, and what we do to it','Quién come a quién, y qué le hacemos'),
     hace:L('Food chains, human impact on ecosystems and conservation strategies. In English, '+
       'character feelings and motives, and question formation.',
       'Cadenas alimentarias, impacto humano en los ecosistemas y estrategias de conservación. En '+
       'English, sentimientos y motivos del personaje y formación de preguntas.'),
     evidencia:L('Food web + impact','Red trófica + impacto')},
    {n:10, periodo:4, semana:4, fase:L('Build','Construir'), foco:L('What can break it','Qué lo puede romper'),
     hace:L('Natural disasters that affect ecosystems and the comparison forest / jungle / other '+
       'Peruvian landscapes, which is exactly where the plan links back to Project 3. Pictographs '+
       'in Math.',
       'Desastres naturales que afectan a los ecosistemas y comparación bosque / selva / otros '+
       'paisajes peruanos, que es donde el plan enlaza con el Proyecto 3. Pictogramas en Math.'),
     evidencia:L('Comparison chart','Cuadro comparativo')},
    {n:11, periodo:4, semana:5, fase:L('Build','Construir'), foco:L('Building the habitat','Construir el hábitat'),
     hace:L('Design of the conservation proposal and building of the habitat model. Math comes in '+
       'with the Cartesian plane, perimeter and patterns to put it up.',
       'Diseño de la propuesta de conservación y construcción de la maqueta del hábitat. Math '+
       'entra con plano cartesiano, perímetro y patrones para levantarla.'),
     evidencia:L('Habitat model','Maqueta del hábitat')},
    {n:12, periodo:4, semana:6, fase:L('Defend','Defender'), foco:L('The assembly','La asamblea'),
     hace:L('Oral rehearsal and defence of the proposal in assembly. Civic responsibility: the '+
       'class discusses each proposal and decides which one it backs.',
       'Ensayo oral y defensa de la propuesta en asamblea. Responsabilidad cívica: la clase '+
       'discute cada propuesta y decide cuál sostiene.'),
     evidencia:L('Proposal defended','Propuesta defendida')}
  ],
  evaluacion:[
    {criterio:L('I research with sources','Investigo con fuentes'),
     descriptor:L('His file says where each piece of data comes from and tells what he read from what he assumes.',
                  'Su dossier dice de dónde sale cada dato y distingue lo que leyó de lo que supone.')},
    {criterio:L('I explain relations, not lists','Explico relaciones, no listas'),
     descriptor:L('Joins resource, economic activity and environmental consequence in one explanation.',
                  'Une recurso, actividad económica y consecuencia ambiental en una misma explicación.')},
    {criterio:L('I build a solution','Construyo una solución'),
     descriptor:L('The model represents the real ecosystem and the proposal says who does it and with what.',
                  'La maqueta representa el ecosistema real y la propuesta dice quién la hace y con qué.')},
    {criterio:L('I defend and I listen','Defiendo y escucho'),
     descriptor:L('Holds his proposal in assembly, answers one objection and changes what convinces him.',
                  'Sostiene su propuesta en asamblea, responde una objeción y cambia lo que le convence.')}
  ],
  diferenciacion:[
    L('The file can be an annotated map, an illustrated timeline or an informative text.',
      'El dossier admite mapa comentado, línea de tiempo ilustrada o texto informativo.'),
    L('The model can be a habitat box, a layered drawing or a digital model.',
      'La maqueta puede ser caja de hábitat, dibujo por capas o modelo digital.'),
    L('The defence can be done in pairs, splitting the two guiding questions.',
      'La defensa se puede hacer en pareja repartiendo las dos preguntas orientadoras.')
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:L('The child brings his model and his timeline and explains what he learned on the '+
      'trip that he did not know before going.',
      'El niño trae su maqueta y su línea de tiempo y explica qué aprendió en el viaje que no '+
      'sabía antes de ir.')},
  toddle:[{periodo:3, nombre:'P3 - Passport Through Peru', tipo:IDU, semanas:5, area:'Social Studies +1'},
          {periodo:4, nombre:'P4 - Guardians of Our Ecosystems', tipo:IDU, semanas:6, area:'Social Studies +1'}],
  unidades:[],
  revisar:[
    L('It matches Toddle: P3 is "Passport Through Peru" and P4 is "Guardians of Our Ecosystems". '+
      'It is the best-supported arc of the thirteen.',
      'Coincide con Toddle: P3 es «Passport Through Peru» y P4 «Guardians of Our Ecosystems». Es '+
      'el arco mejor respaldado de los trece.'),
    L('The Grade 3 study trip is in P4 W2 of the calendar (August). If it moves, phases 8 and 9 '+
      'move, not the whole arc.',
      'El viaje de estudios de 3.º está en P4 W2 del calendario (agosto). Si se mueve, se mueven '+
      'las fases 8 y 9, no todo el arco.'),
    L('The tutor assigns the regions in week 1; it is worth making sure no region repeats so that '+
      'the class wall covers the country.',
      'La asignación de regiones por equipo la hace el tutor en la semana 1; conviene que ninguna '+
      'región se repita para que el mural de la clase cubra el país.')]
},

'g3.t3': {
  grade:'g3', label:'Grade 3', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🪐', from:'#2b2c66', to:'#7b6ad0'},
  titulo:'Looking out, looking in',
  subtitulo:L('The same method for the sky and for my own life',
              'El mismo método para el cielo y para mi propia vida'),
  areaEje:'science', areasArticuladas:['social','english','math','comunicacion'],
  situacion:L('P5 puts Grade 3 to work explaining something enormous and far away: the solar '+
    'system, rotation and revolution, the phases of the moon, gravity; and it closes with "design '+
    'experiment/model, apply inquiry process, collect data" and a public exhibition. P6 turns the '+
    'focus 180 degrees: personal goals, self-regulation, "track one personal habit for a week", a '+
    'healthy routine plan, and a two or three minute oral presentation. It is the same method '+
    'twice: observe, record, explain with evidence. First outwards and then inwards. Saying it '+
    'that way is what turns P6 into a project instead of a string of loose reflections.',
    'P5 pone a 3.º a explicar algo enorme y lejano: el sistema solar, la rotación y la traslación, '+
    'las fases de la luna, la gravedad; y lo cierra con "design experiment/model, apply inquiry '+
    'process, collect data" y una exhibición pública. P6 gira el foco 180 grados: metas '+
    'personales, autorregulación, "track one personal habit for a week", plan de rutina saludable, '+
    'y una presentación oral de dos o tres minutos. Es el mismo método dos veces: observar, '+
    'registrar, explicar con evidencia. Primero hacia fuera y después hacia dentro. Decirlo así es '+
    'lo que convierte P6 en proyecto y no en una serie de reflexiones sueltas.'),
  preguntaEsencial:L('What can I explain with evidence — about the sky, and about myself?',
    '¿Qué puedo explicar con evidencia — del cielo y de mí mismo?'),
  narrativa:L('For six weeks you are going to explain something nobody can touch: why we have day '+
    'and night, why the moon changes, why things fall. You will build a model and show it to '+
    'people who did not build it. Then, for five weeks, you turn the same tools on yourself: pick '+
    'one habit, measure it for a week, and use the numbers to set a goal you can actually defend.',
    'Durante seis semanas vais a explicar algo que nadie puede tocar: por qué hay día y noche, por '+
    'qué cambia la luna, por qué caen las cosas. Construiréis un modelo y se lo enseñaréis a gente '+
    'que no lo construyó. Después, durante cinco semanas, giráis las mismas herramientas hacia '+
    'vosotros: elegís un hábito, lo medís una semana, y usáis los números para fijar una meta que '+
    'de verdad podáis defender.'),
  orientadoras:{
    science:L('What explains what I see in the sky? And what do my data say about my own habits?',
              '¿Qué explica lo que veo en el cielo? ¿Y qué dicen mis datos sobre mis propios hábitos?'),
    social:L('What professions do this and how does a team organise itself to pull it off?',
             '¿Qué profesiones hacen esto y cómo se organiza un equipo para lograrlo?'),
    english:L('Can I explain how something works, and write about a goal I will reach?',
              '¿Sé explicar cómo funciona algo y escribir sobre una meta que voy a alcanzar?'),
    math:L('How do I use mixed operations and fractions to work out what the model needs?',
           '¿Cómo uso operaciones combinadas y fracciones para calcular lo que el modelo necesita?')
  },
  competencias:[
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Analyses data and information','Analiza datos e información'),
                  L('Evaluates and communicates the process and the results of the inquiry','Evalúa y comunica el proceso y los resultados de su indagación')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about Earth and the universe','Comprende y usa conocimientos sobre Tierra y universo')]},
    {area:'social', nombre:L('Builds his or her identity','Construye su identidad'),
     capacidades:[L('Values himself or herself','Se valora a sí mismo'),
                  L('Self-regulates emotions','Autorregula sus emociones'),
                  L('Reflects and argues ethically','Reflexiona y argumenta éticamente')]},
    {area:'comunicacion', nombre:L('Speaks in his mother tongue','Se comunica oralmente en su lengua materna'),
     capacidades:[L('Fits, organises and develops ideas coherently','Adecúa, organiza y desarrolla las ideas de forma coherente'),
                  L('Reflects on and evaluates the form, content and context of the spoken text','Reflexiona y evalúa la forma, el contenido y el contexto del texto oral')]}
  ],
  producto:{
    titulo:'The model, and the plan',
    audiencia:L('In P5, the school public exhibition, which is people who were not in the lesson. '+
      'In P6, the family itself, which is who will see whether the plan is kept.',
      'En P5, la exhibición pública del colegio, que es gente que no estuvo en clase. En P6, la '+
      'propia familia, que es la que va a ver si el plan se cumple.'),
    descripcion:L('A model or experiment that explains a phenomenon of the solar system, and then '+
      'a healthy routine plan based on a real one-week record of a habit of his own.',
      'Un modelo o experimento que explica un fenómeno del sistema solar, y después un plan de '+
      'rutina saludable basado en el registro real de un hábito propio durante una semana.'),
    incluye:[L('My question about the sky','Mi pregunta sobre el cielo'),
             L('The model or the experiment and how it works','El modelo o el experimento y cómo funciona'),
             L('The scientific explanation, written','La explicación científica, escrita'),
             L('My one-week record of my habit','El registro de mi hábito durante una semana'),
             L('My routine plan and my goal','Mi plan de rutina y mi meta'),
             L('The two or three minute talk','La presentación oral de dos o tres minutos')]
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:L('Watch the sky','Observar el cielo'), foco:L('What is out there','Qué hay ahí fuera'),
     hace:L('Elements of the solar system, the sun at the centre, planets and dwarf planets. In '+
       'English, an informative text about the planets and the vocabulary of orbit, gravity and '+
       'rotation.',
       'Elementos del sistema solar, el sol en el centro, planetas y planetas enanos. En English, '+
       'texto informativo sobre los planetas y vocabulario de órbita, gravedad y rotación.'),
     evidencia:L('Solar system map','Mapa del sistema solar')},
    {n:2, periodo:5, semana:2, fase:L('Watch the sky','Observar el cielo'), foco:L('Day, night and seasons','Día, noche y estaciones'),
     hace:L('Rotation and revolution of the Earth. Social Studies connects with the sundial and '+
       'the review of telling the time. In English, present simple against continuous to describe '+
       'the experiment.',
       'Rotación y traslación de la Tierra. Social conecta con el reloj de sol y el repaso de la '+
       'hora. En English, presente simple frente a continuo para describir el experimento.'),
     evidencia:L('Rotation demo','Demostración de la rotación')},
    {n:3, periodo:5, semana:3, fase:L('Watch the sky','Observar el cielo'), foco:L('The moon and the tides','La luna y las mareas'),
     hace:L('Phases of the moon and tides. In English, the future with will to make predictions: '+
       'what phase will there be in two weeks.',
       'Fases de la luna y mareas. En English, el futuro con will para hacer predicciones: qué '+
       'fase habrá dentro de dos semanas.'),
     evidencia:L('Moon prediction','Predicción de la luna')},
    {n:4, periodo:5, semana:4, fase:L('Explain','Explicar'), foco:L('Missions and gravity','Misiones y gravedad'),
     hace:L('Space missions and the basic concept of gravity. Social Studies: professions linked '+
       'to space exploration and the budget of a mission.',
       'Misiones espaciales y concepto básico de gravedad. Social: profesiones ligadas a la '+
       'exploración espacial y presupuesto de una misión.'),
     evidencia:L('Mission budget','Presupuesto de la misión')},
    {n:5, periodo:5, semana:5, fase:L('Explain','Explicar'), foco:L('The model and the exhibition','El modelo y la exhibición'),
     hace:L('Design of the experiment or model, data collection and the exhibition in the same '+
       'week. The annual plan spreads this over two weeks (W5 and W6) but the calendar only gives '+
       'five in P5: the exhibition happens on the last day, not the following week. Public '+
       'speaking, respectful listening and civic behaviour.',
       'Diseño del experimento o modelo, recogida de datos y exhibición en la misma semana. El '+
       'plan anual reparte esto en dos semanas (W5 y W6) pero el calendario solo da cinco en P5: '+
       'la exhibición se hace el último día, no la semana siguiente. Hablar en público, escucha '+
       'respetuosa y comportamiento cívico.'),
     evidencia:L('Model + data + exhibition','Modelo + datos + exhibición')},
    {n:6, periodo:6, semana:1, fase:L('Watch myself','Observarme'), foco:L('Turning the lens around','Girar la lente'),
     hace:L('P6 begins. Narrative non-fiction reading about a child reaching a goal. Growth and '+
       'personal goals; strengths and things to improve. THE habit is chosen.',
       'Arranca P6. Lectura de no ficción narrativa sobre un niño que alcanza una meta. '+
       'Crecimiento y metas personales; fortalezas y aspectos a mejorar. Se elige EL hábito.'),
     evidencia:L('The habit I choose','El hábito que elijo')},
    {n:7, periodo:6, semana:2, fase:L('Watch myself','Observarme'), foco:L('Measuring for a week','Medir una semana'),
     hace:L('Daily record of one habit (sleep, reading time, water). It is literally the same '+
       'table used for the model, with another kind of data inside. A 100-word reflection '+
       'paragraph in the past.',
       'Registro diario de un hábito (sueño, tiempo de lectura, agua). Es literalmente la misma '+
       'tabla que se usó para el modelo, con otro dato dentro. Párrafo de reflexión de 100 '+
       'palabras en pasado.'),
     evidencia:L('One-week log','Registro de una semana')},
    {n:8, periodo:6, semana:3, fase:L('Plan','Planear'), foco:L('What the numbers say','Qué dicen los números'),
     hace:L('Design of the healthy routine plan from the record. Rights and responsibilities, '+
       'autonomy and the importance of saying no. Future with will and going to.',
       'Diseño del plan de rutina saludable a partir del registro. Derechos y responsabilidades, '+
       'autonomía y la importancia de saber decir que no. Futuro con will y going to.'),
     evidencia:L('Routine plan','Plan de rutina')},
    {n:9, periodo:6, semana:4, fase:L('Plan','Planear'), foco:L('What it will take','Qué hará falta'),
     hace:L('Basic budget of the small personal project and decision making. What resources do I '+
       'need for my goal? Opinion writing: why my goal matters.',
       'Presupuesto básico del pequeño proyecto personal y toma de decisiones. ¿Qué recursos '+
       'necesito para mi meta? Escritura de opinión: por qué mi meta importa.'),
     evidencia:L('Opinion text','Texto de opinión')},
    {n:10, periodo:6, semana:5, fase:L('Tell','Contar'), foco:L('Two or three minutes','Dos o tres minutos'),
     hace:L('Personal growth timeline, final reflection text and a two or three minute oral '+
       'presentation. Healthy routine mini poster.',
       'Línea de tiempo de crecimiento personal, texto de reflexión final y presentación oral de '+
       'dos o tres minutos. Mini póster de la rutina saludable.'),
     evidencia:L('Final talk + poster','Presentación final + póster')},
    {n:11, periodo:6, semana:6, fase:L('Tell','Contar'), foco:L('The wall of goals','El muro de las metas'),
     hace:L('Last teaching week. Every routine poster and every goal go up together and each child '+
       'reads somebody else goal and writes them one line. The annual plan loads no subject '+
       'content this week except PE, so the arc uses it to close; if coordination fills it, this '+
       'phase is adjusted.',
       'Última semana de clase. Todos los pósters de rutina y todas las metas se cuelgan juntos y '+
       'cada niño lee la meta de otro y le escribe una línea. El plan anual no carga contenido de '+
       'área esta semana salvo Educación Física, así que el arco la usa para cerrar; si '+
       'coordinación la llena, esta fase se ajusta.'),
     evidencia:L('Wall of goals','Muro de las metas')}
  ],
  evaluacion:[
    {criterio:L('I explain with a model','Explico con un modelo'),
     descriptor:L('The model represents the phenomenon, it does not just decorate it, and he can say where it is like the real thing and where it is not.',
                  'El modelo representa el fenómeno, no solo lo decora, y sabe decir en qué se parece y en qué no.')},
    {criterio:L('I record without cheating','Registro sin trampas'),
     descriptor:L('The week is complete, includes the bad days, and is not filled in from memory at the end.',
                  'La semana está completa, incluye los días malos, y no se rellena de memoria al final.')},
    {criterio:L('I use my data to decide','Uso mis datos para decidir'),
     descriptor:L('The goal comes out of the record and not out of a wish: he can point at the data that justifies it.',
                  'La meta sale del registro y no de un deseo: se puede señalar el dato que la justifica.')},
    {criterio:L('I speak for two minutes straight','Hablo dos minutos seguidos'),
     descriptor:L('Holds the presentation without reading it all and answers a question from the audience.',
                  'Sostiene la presentación sin leerla entera y responde una pregunta del público.')}
  ],
  diferenciacion:[
    L('The model can be a mock-up, a torch demonstration, an animation or a layered drawing.',
      'El modelo puede ser maqueta, demostración con linterna, animación o dibujo por capas.'),
    L('The record can be marks, colours or numbers; what matters is that it is daily.',
      'El registro admite marcas, colores o números; lo que importa es que sea diario.'),
    L('The talk can be recorded on video if speaking live is a blocker, but it is watched in full in class.',
      'La presentación se puede grabar en vídeo si hablar en directo bloquea, pero se ve entera en clase.')
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:L('The child shows both things together: the model of the sky and his personal record, '+
      'and explains what they have in common. That is the learning of the term, not the solar system.',
      'El niño enseña las dos cosas juntas: el modelo del cielo y su registro personal, y explica '+
      'qué tienen en común. Ese es el aprendizaje del trimestre, no el sistema solar.')},
  toddle:[],
  unidades:[{n:5, titulo:L('Unit 5 in the portal','Unidad 5 del portal')},{n:6, titulo:L('Unit 6 in the portal','Unidad 6 del portal')}],
  revisar:[
    L('In Toddle there is NO Grade 3 project for P5 or P6: the Grade 3 planner stops at '+
      '"Guardians of Our Ecosystems". This arc stands only on the annual plan spreadsheet.',
      'En Toddle NO hay ningún proyecto de 3.º para P5 ni P6: el planificador de 3.º llega hasta '+
      '«Guardians of Our Ecosystems». Este arco se sostiene solo sobre el plan anual en Excel.'),
    L('The habit being recorded has to be the child own, not the family, and it cannot be weight '+
      'or food: it is a classroom record, not a body measurement.',
      'El hábito que se registra tiene que ser del niño, no de la familia, y no puede ser peso ni '+
      'comida: es un registro de aula y no una medida corporal.'),
    L('The Grade 3 annual plan writes SIX weeks in P5 and the calendar only gives five. The extra '+
      'week is exactly the exhibition one; here it runs together with the design of the model. It '+
      'is a decision, not an oversight: it should be confirmed with the grade.',
      'El plan anual de 3.º escribe SEIS semanas en P5 y el calendario solo da cinco. La semana '+
      'que sobra es justo la de la exhibición; aquí va junta con el diseño del modelo. Es una '+
      'decisión, no un descuido: conviene confirmarla con el grado.'),
    L('P6 W6 only has PE loaded in the annual plan.',
      'P6 W6 solo tiene Educación Física cargada en el plan anual.')]
},

/* ==================================================================== 4.o */

'g4.t1': {
  grade:'g4', label:'Grade 4', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🫀', from:'#6b1f38', to:'#c66a80'},
  titulo:'Systems that keep us going',
  subtitulo:L('A body works because its systems coordinate; so does a class',
              'El cuerpo funciona porque sus sistemas se coordinan; la clase, también'),
  areaEje:'science', areasArticuladas:['social','comunicacion','math','english'],
  situacion:L('P1 and P2 run two threads that Grade 4 usually experiences as separate subjects and '+
    'that are in fact the same concept. Science goes through the functions of living things '+
    '(nutrition, metabolism, excretion, sensitivity, homeostasis, growth, reproduction and '+
    'heredity) and in P2 comes down to the nervous, immune and urinary systems and to healthy '+
    'habits. Social Studies, alongside, does exactly the same with a human group: democracy and '+
    'participation, rules and agreements, listening to a classmate opinion, assemblies, and '+
    'participation, commitment and democratic reflection. And Comunicación brings the anecdote '+
    'with its structure and ends in "final writing of a personal anecdote and oral presentation". '+
    'The arc joins them with one idea: a system works when its parts coordinate.',
    'P1 y P2 corren dos hilos que 4.º suele vivir como asignaturas separadas y que en realidad son '+
    'el mismo concepto. Science recorre las funciones de los seres vivos (nutrición, metabolismo, '+
    'excreción, sensibilidad, homeostasis, crecimiento, reproducción y herencia) y en P2 baja a '+
    'los sistemas nervioso, inmunológico y urinario y a los hábitos saludables. Social, en '+
    'paralelo, hace exactamente lo mismo con un grupo humano: democracia y participación, reglas y '+
    'acuerdos, escuchar la opinión del compañero, asambleas, y participación, compromiso y '+
    'reflexión democrática. Y Comunicación trae la anécdota con su estructura y termina en '+
    '"escritura final de una anécdota personal y presentación oral". El arco los junta con una '+
    'sola idea: un sistema funciona cuando sus partes se coordinan.'),
  preguntaEsencial:L('What keeps a body working, and what keeps a group working?',
    '¿Qué mantiene funcionando a un cuerpo, y qué mantiene funcionando a un grupo?'),
  narrativa:L('Two things this term look like they have nothing to do with each other: how your '+
    'body works, and how a class agrees on something. They are the same problem. A body stays '+
    'alive because its systems talk to each other; a class works because its people do. You are '+
    'going to study one system properly, find out what breaks it, and then take a real proposal '+
    'about one healthy habit to a class assembly — with the survey to back it.',
    'Dos cosas de este trimestre parecen no tener nada que ver: cómo funciona tu cuerpo y cómo se '+
    'pone de acuerdo una clase. Son el mismo problema. Un cuerpo sigue vivo porque sus sistemas se '+
    'hablan; una clase funciona porque su gente lo hace. Vais a estudiar bien un sistema, '+
    'averiguar qué lo rompe, y después llevar a la asamblea una propuesta real sobre un hábito '+
    'saludable — con la encuesta que la respalde.'),
  orientadoras:{
    science:L('What does a living thing do to stay alive, and what happens when a system fails?',
              '¿Qué hace un ser vivo para seguir vivo, y qué pasa cuando un sistema falla?'),
    social:L('How does a group reach an agreement and what does it take for the agreement to hold?',
             '¿Cómo se pone de acuerdo un grupo y qué hace falta para que el acuerdo se cumpla?'),
    comunicacion:L('How do you tell your own anecdote so somebody else understands it and cares?',
                   '¿Cómo se cuenta una anécdota propia para que otro la entienda y le importe?'),
    math:L('How do I run a survey with open and closed questions and what do I do with the answers?',
           '¿Cómo hago una encuesta con preguntas abiertas y cerradas y qué hago con las respuestas?'),
    english:L('Can I write an opinion text and say what I do every day?',
              '¿Sé escribir un texto de opinión y decir lo que hago cada día?')
  },
  competencias:[
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about living things','Comprende y usa conocimientos sobre los seres vivos'),
                  L('Evaluates what scientific and technological work implies','Evalúa las implicancias del saber y del quehacer científico y tecnológico')]},
    {area:'social', nombre:L('Lives together and participates democratically in the pursuit of the common good','Convive y participa democráticamente en la búsqueda del bien común'),
     capacidades:[L('Builds norms and takes on agreements and rules','Construye normas y asume acuerdos y leyes'),
                  L('Deliberates on public matters','Delibera sobre asuntos públicos'),
                  L('Takes part in actions that promote the common good','Participa en acciones que promueven el bienestar común')]},
    {area:'comunicacion', nombre:L('Writes different kinds of texts in his mother tongue','Escribe diversos tipos de textos en su lengua materna'),
     capacidades:[L('Fits the text to the communicative situation','Adecúa el texto a la situación comunicativa'),
                  L('Uses the conventions of written language appropriately','Utiliza convenciones del lenguaje escrito de forma pertinente')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas'),
                  L('Backs conclusions or decisions with the information obtained','Sustenta conclusiones o decisiones con base en la información obtenida')]}
  ],
  producto:{
    titulo:'The class agreement, and my anecdote',
    audiencia:L('The class assembly, which votes the agreement; and afterwards the families, who '+
      'receive the published anecdote.',
      'La asamblea de la clase, que vota el acuerdo; y después las familias, que reciben la '+
      'anécdota publicada.'),
    descripcion:L('A class agreement about ONE healthy habit, approved in assembly and backed by '+
      'data from their own survey; and a personal anecdote written and read out loud.',
      'Un acuerdo de clase sobre UN hábito saludable, aprobado en asamblea y sostenido con datos '+
      'de una encuesta propia; y una anécdota personal escrita y presentada en voz alta.'),
    incluye:[L('The body system I studied and how it works','El sistema del cuerpo que estudié y cómo funciona'),
             L('What harms it and what looks after it','Qué lo daña y qué lo cuida'),
             L('My survey with open and closed questions','Mi encuesta con preguntas abiertas y cerradas'),
             L('The graph of the results','El gráfico de los resultados'),
             L('The proposal I took to the assembly','La propuesta que llevé a la asamblea'),
             L('My personal anecdote, written and read','Mi anécdota personal, escrita y leída')]
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:L('Understand','Comprender'), foco:L('Living and non-living','Vivo y no vivo'),
     hace:L('Living and non-living things: what something has to do to count as alive. Social '+
       'Studies opens with democracy and citizen participation. In Comunicación, the full stop and '+
       'the anecdote.',
       'Seres vivos y no vivos: qué tiene que hacer algo para considerarse vivo. Social abre con '+
       'democracia y participación ciudadana. En Comunicación, el punto y la anécdota.'),
     evidencia:L('Alive / not alive, with the reason','Vivo / no vivo, con el motivo')},
    {n:2, periodo:1, semana:2, fase:L('Understand','Comprender'), foco:L('Nutrition, metabolism, excretion','Nutrición, metabolismo, excreción'),
     hace:L('The three functions that keep the body running. Social Studies: rules, agreements and '+
       'democratic coexistence. The two topics get compared explicitly on the board.',
       'Las tres funciones que mantienen el cuerpo en marcha. Social: reglas, acuerdos y '+
       'convivencia democrática. Los dos temas se comparan explícitamente en la pizarra.'),
     evidencia:L('System diagram','Diagrama del sistema')},
    {n:3, periodo:1, semana:3, fase:L('Understand','Comprender'), foco:L('Sensitivity and homeostasis','Sensibilidad y homeostasis'),
     hace:L('How the body detects and how it self-regulates. Math opens the survey: open and '+
       'closed questions. Social Studies: listening to classmates opinions.',
       'Cómo el cuerpo detecta y cómo se autorregula. Math abre la encuesta: preguntas abiertas y '+
       'cerradas. Social: escuchar la opinión de los compañeros.'),
     evidencia:L('My survey questions','Mis preguntas de encuesta')},
    {n:4, periodo:1, semana:4, fase:L('Ask','Preguntar'), foco:L('Growth and reproduction','Crecimiento y reproducción'),
     hace:L('Growth and reproduction as functions of living things. The survey is run. Social '+
       'Studies: taking part in assemblies. Narrative connectors in Comunicación.',
       'Crecimiento y reproducción como funciones de los seres vivos. Se pasa la encuesta. Social: '+
       'participación en asambleas. Conectores narrativos en Comunicación.'),
     evidencia:L('Survey run','Encuesta pasada')},
    {n:5, periodo:1, semana:5, fase:L('Ask','Preguntar'), foco:L('Heredity','Herencia'),
     hace:L('Heredity: what is passed on and what is not. Answers are tabulated with the '+
       'part-whole bar model from Math. Oral expression techniques.',
       'Herencia: qué se transmite y qué no. Se tabulan las respuestas con el modelo de barras '+
       'parte-todo de Math. Técnicas de expresión oral.'),
     evidencia:L('Tabulated data','Datos tabulados')},
    {n:6, periodo:1, semana:6, fase:L('Ask','Preguntar'), foco:L('What the survey says','Lo que dice la encuesta'),
     hace:L('P1 closes: the Science reflection and "participation, commitment and democratic '+
       'reflection" in Social Studies. The habit the agreement will be about is chosen. Final '+
       'writing of the personal anecdote and oral presentation.',
       'Cierre de P1: reflexión de Science y "participación, compromiso y reflexión democrática" '+
       'de Social. Se elige el hábito del que va a ir el acuerdo. Escritura final de la anécdota '+
       'personal y presentación oral.'),
     evidencia:L('Anecdote + habit chosen','Anécdota + hábito elegido')},
    {n:7, periodo:2, semana:1, fase:L('Go deeper','Profundizar'), foco:L('The nervous system','El sistema nervioso'),
     hace:L('P2 begins. The nervous system: the system that coordinates the others. It is the '+
       'central metaphor of the arc and it is worth naming it. In English, narrative text.',
       'Arranca P2. Sistema nervioso: el sistema que coordina a los demás. Es la metáfora central '+
       'del arco y conviene nombrarla. En English, texto narrativo.'),
     evidencia:L('Coordination map','Mapa de coordinación')},
    {n:8, periodo:2, semana:2, fase:L('Go deeper','Profundizar'), foco:L('The immune system','El sistema inmunológico'),
     hace:L('The immune system: how the body defends itself. What happens when the defence fails. '+
       'Adjectives and degrees of adjectives in Comunicación, to describe precisely.',
       'Sistema inmunológico: cómo el cuerpo se defiende. Qué pasa cuando la defensa falla. '+
       'Adjetivo y grados del adjetivo en Comunicación para describir con precisión.'),
     evidencia:L('Defence notes','Notas de la defensa')},
    {n:9, periodo:2, semana:3, fase:L('Go deeper','Profundizar'), foco:L('The urinary system','El sistema urinario'),
     hace:L('The urinary system and its part in excretion. The map of the three systems is closed '+
       'and it is marked which depends on which.',
       'Sistema urinario y su papel en la excreción. Se cierra el mapa de los tres sistemas y se '+
       'marca cuál depende de cuál.'),
     evidencia:L('Three systems, connected','Tres sistemas, conectados')},
    {n:10, periodo:2, semana:4, fase:L('Agree','Acordar'), foco:L('Healthy habits','Hábitos saludables'),
     hace:L('Healthy habits. Each team drafts its proposed agreement: what the class commits to, '+
       'who checks it and how often.',
       'Hábitos saludables. Cada equipo redacta su propuesta de acuerdo: qué se compromete a hacer '+
       'la clase, quién lo comprueba y cada cuánto.'),
     evidencia:L('Proposal, draft','Propuesta, borrador')},
    {n:11, periodo:2, semana:5, fase:L('Agree','Acordar'), foco:L('The assembly','La asamblea'),
     hace:L('Assembly: the proposals are presented with the graph in front, debated, and one is '+
       'voted. The agreement is written and posted in the classroom with its review date.',
       'Asamblea: se presentan las propuestas con el gráfico delante, se debate y se vota una. El '+
       'acuerdo se escribe y se cuelga en la clase con la fecha de revisión.'),
     evidencia:L('Signed class agreement','Acuerdo de clase firmado')}
  ],
  evaluacion:[
    {criterio:L('I explain a system','Explico un sistema'),
     descriptor:L('Says what the system does, what it depends on and what happens if it fails, without reciting the list of organs.',
                  'Dice qué hace el sistema, de qué depende y qué pasa si falla, sin recitar la lista de órganos.')},
    {criterio:L('I ask and I tabulate','Pregunto y tabulo'),
     descriptor:L('Tells an open question from a closed one, tabulates without losing answers, and his graph says what his text says.',
                  'Distingue pregunta abierta de cerrada, tabula sin perder respuestas y su gráfico dice lo mismo que su texto.')},
    {criterio:L('I propose in assembly','Propongo en asamblea'),
     descriptor:L('His proposal can actually be kept, says who checks it, and he answers one objection.',
                  'Su propuesta se puede cumplir, dice quién la comprueba, y responde a una objeción.')},
    {criterio:L('I tell my anecdote','Cuento mi anécdota'),
     descriptor:L('The anecdote has its structure, uses narrative connectors and is read out loud clearly.',
                  'La anécdota tiene su estructura, usa conectores narrativos y se lee en voz alta de forma clara.')}
  ],
  diferenciacion:[
    L('The system map can be a labelled drawing, a diagram or a text.',
      'El mapa del sistema admite dibujo etiquetado, esquema o texto.'),
    L('The survey is run in pairs; tabulating can be done by counting or in a spreadsheet.',
      'La encuesta se pasa en pareja; tabular se puede hacer con conteo o con hoja de cálculo.'),
    L('The anecdote can be recorded as audio and transcribed afterwards.',
      'La anécdota se puede grabar en audio y transcribir después.')
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:L('The child shows his graph and the agreement signed by the class, and explains which '+
      'argument convinced the others and why.',
      'El niño enseña su gráfico y el acuerdo firmado por la clase, y explica qué argumento '+
      'convenció a los demás y por qué.')},
  toddle:[{periodo:1, nombre:'P1 - Making Choices', tipo:AREA, semanas:6, area:'Social Studies'},
          {periodo:1, nombre:'U1 - Life on Earth', tipo:AREA, semanas:6, area:'Science'},
          {periodo:2, nombre:'P2 - Asking Questions, Researching Answers', tipo:AREA, semanas:6, area:'Science'}],
  unidades:[],
  revisar:[
    L('Grade 4 has NO interdisciplinary unit at all in Toddle: its 23 units are single-subject, '+
      'even when some are called "P1" or "P2". This arc proposes a crossing that Grade 4 has not '+
      'declared yet, and that is why it is the one that most needs validating with the grade team.',
      '4.º NO tiene NINGUNA unidad interdisciplinaria en Toddle: sus 23 unidades son de área, '+
      'aunque algunas se llamen «P1» o «P2». Este arco propone un cruce que en 4.º todavía no está '+
      'declarado, y por eso es el que más hay que validar con el grado.'),
    L('The agreement has a review date: if nobody checks it in P3 the product collapses and the '+
      'civic learning is lost. It is worth fixing the review in the unit hub.',
      'El acuerdo tiene fecha de revisión: si nadie lo comprueba en P3, el producto se cae y el '+
      'aprendizaje cívico se pierde. Conviene fijar la revisión en el hub de la unidad.')]
},

'g4.t2': {
  grade:'g4', label:'Grade 4', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'📏', from:'#1c4a6b', to:'#5fa9d4'},
  titulo:'How do you know it changed?',
  subtitulo:L('Measuring matter, and measuring what changes over time',
              'Medir la materia, y medir lo que cambia con el tiempo'),
  areaEje:'science', areasArticuladas:['math','pe','comunicacion','english'],
  situacion:L('P3 gives Grade 4 the whole measurement block: states of matter, properties and '+
    'measurement, size, mass, volume, temperature and density; Math goes alongside with '+
    'measurement, patterns and the properties of squares and rectangles, and PE does athletics, '+
    'which is the only subject in the plan that produces its own numbers every week (speed, '+
    'endurance, relays, jumps, hurdles). P4 changes the object but not the method: human '+
    'development and growth, and in Math bar and line graphs and unit conversion. The line graph '+
    'turns up exactly when something changing over time has to be measured. That is the arc: you '+
    'do not claim something changed, you prove it.',
    'P3 le da a 4.º el bloque de medida completo: estados de la materia, propiedades y medición, '+
    'tamaño, masa, volumen, temperatura y densidad; Math acompaña con medida, patrones y '+
    'propiedades de cuadrados y rectángulos, y Educación Física hace atletismo, que es la única '+
    'área del plan que produce números propios cada semana (velocidad, resistencia, relevos, '+
    'saltos, obstáculos). P4 cambia el objeto pero no el método: desarrollo humano y crecimiento, '+
    'y en Math gráficos de barras y de líneas y conversión de unidades. El gráfico de líneas '+
    'aparece justo cuando hace falta medir algo que cambia en el tiempo. El arco es ese: no se '+
    'afirma que algo cambió, se demuestra.'),
  preguntaEsencial:L('How do you know that something has changed?',
    '¿Cómo sabes que algo ha cambiado?'),
  narrativa:L('Anybody can say "it got bigger" or "I got faster". Proving it is harder. For twelve '+
    'weeks you are going to measure properly: first things — their mass, their volume, their '+
    'temperature, their density — and then your own performance, week after week, on the track. '+
    'At the end you will have a line that goes somewhere, and a text that explains why.',
    'Cualquiera puede decir "se hizo más grande" o "soy más rápido". Demostrarlo es más difícil. '+
    'Durante doce semanas vais a medir bien: primero cosas — su masa, su volumen, su temperatura, '+
    'su densidad — y después vuestro propio rendimiento, semana a semana, en la pista. Al final '+
    'tendréis una línea que va a alguna parte, y un texto que explica por qué.'),
  orientadoras:{
    science:L('What properties of matter can be measured, and with which instrument each one?',
              '¿Qué propiedades de la materia se pueden medir, y con qué instrumento cada una?'),
    math:L('When do I use a bar graph and when a line graph? How do I convert units?',
           '¿Cuándo uso un gráfico de barras y cuándo uno de líneas? ¿Cómo convierto unidades?'),
    pe:L('What data does my body produce each week and how do I record it honestly?',
         '¿Qué dato produce mi cuerpo cada semana y cómo lo registro sin trampas?'),
    comunicacion:L('How do you write a text that explains, with the verbs properly conjugated?',
                   '¿Cómo se escribe un texto que explica, con verbos bien conjugados?'),
    english:L('Can I write an informative text about what I measured?',
              '¿Sé escribir un texto informativo sobre lo que medí?')
  },
  competencias:[
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Analyses data and information','Analiza datos e información')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about matter and energy','Comprende y usa conocimientos sobre materia y energía')]},
    {area:'math', nombre:L('Solves problems of quantity','Resuelve problemas de cantidad'),
     capacidades:[L('Uses estimation and calculation strategies and procedures','Usa estrategias y procedimientos de estimación y cálculo'),
                  L('Argues claims about numerical relations and operations','Argumenta afirmaciones sobre las relaciones numéricas y las operaciones')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas')]},
    {area:'comunicacion', nombre:L('Writes different kinds of texts in his mother tongue','Escribe diversos tipos de textos en su lengua materna'),
     capacidades:[L('Organises and develops ideas coherently and cohesively','Organiza y desarrolla las ideas de forma coherente y cohesionada')]}
  ],
  producto:{
    titulo:'The measurement journal',
    audiencia:L('The class, which compares its lines; and the families on Student Achievement Day.',
      'La clase, que compara sus líneas; y las familias en el Student Achievement Day.'),
    descripcion:L('A twelve-week measurement notebook: matter measured with instrument and unit in '+
      'P3, and his own athletic performance recorded week by week in P4, with the line graph and '+
      'the informative text that explains it.',
      'Un cuaderno de medidas de doce semanas: la materia medida con instrumento y unidad en P3, y '+
      'el propio rendimiento atlético registrado semana a semana en P4, con el gráfico de líneas y '+
      'el texto informativo que lo explica.'),
    incluye:[L('My measurements of matter, with instrument and unit','Mis medidas de materia, con instrumento y unidad'),
             L('The estimate before each measurement','La estimación antes de cada medida'),
             L('My weekly athletics record','Mi registro semanal de atletismo'),
             L('The line graph of my progress','El gráfico de líneas de mi progreso'),
             L('The unit conversion where it was needed','La conversión de unidades donde hizo falta'),
             L('The final informative text','El texto informativo final')]
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:L('Measure matter','Medir la materia'), foco:L('States of matter','Estados de la materia'),
     hace:L('States of matter and their changes. The measurement journal is opened and the rule is '+
       'agreed: first I estimate, then I measure, and I write down both.',
       'Estados de la materia y sus cambios. Se abre el cuaderno de medidas y se pacta la regla: '+
       'primero estimo, luego mido, y anoto las dos cosas.'),
     evidencia:L('Journal opened','Cuaderno abierto')},
    {n:2, periodo:3, semana:2, fase:L('Measure matter','Medir la materia'), foco:L('Properties and measurement','Propiedades y medición'),
     hace:L('Properties of matter and how they are measured. Which instrument suits which property. '+
       'In PE athletics starts and the first speed record is taken.',
       'Propiedades de la materia y su medición. Qué instrumento sirve para qué propiedad. En PE '+
       'arranca el atletismo y se toma el primer registro de velocidad.'),
     evidencia:L('Instrument match + first time','Instrumento correcto + primer tiempo')},
    {n:3, periodo:3, semana:3, fase:L('Measure matter','Medir la materia'), foco:L('Size, mass, volume','Tamaño, masa, volumen'),
     hace:L('Size, mass and volume measured for real, not read about. Math comes in with multiples '+
       'and factors and with patterns. PE: track endurance.',
       'Tamaño, masa y volumen medidos de verdad, no leídos. Math entra con múltiplos y factores y '+
       'con patrones. PE: resistencia en pista.'),
     evidencia:L('Mass and volume log','Registro de masa y volumen')},
    {n:4, periodo:3, semana:4, fase:L('Measure matter','Medir la materia'), foco:L('Temperature and density','Temperatura y densidad'),
     hace:L('Temperature and density. Why two things of the same size do not weigh the same. '+
       'Measurement in Math. PE: relays.',
       'Temperatura y densidad. Por qué dos cosas del mismo tamaño no pesan igual. Medida en Math. '+
       'PE: relevos.'),
     evidencia:L('Density test','Prueba de densidad')},
    {n:5, periodo:3, semana:5, fase:L('Measure matter','Medir la materia'), foco:L('Writing it up','Escribirlo'),
     hace:L('Informative text in English about one of the properties measured. In Comunicación, '+
       'classes of verbs and conjugation, which is what an explanatory text needs. PE: jumps.',
       'Texto informativo en English sobre una de las propiedades medidas. En Comunicación, clases '+
       'de verbos y conjugación, que es lo que un texto explicativo necesita. PE: saltos.'),
     evidencia:L('Informative text, draft','Texto informativo, borrador')},
    {n:6, periodo:3, semana:6, fase:L('Measure matter','Medir la materia'), foco:L('Squares and rectangles','Cuadrados y rectángulos'),
     hace:L('Properties of squares and rectangles in Math: area and shape of the container they '+
       'have been measuring. PE: hurdles, last record of P3.',
       'Propiedades de cuadrados y rectángulos en Math: área y forma del recipiente que se estuvo '+
       'midiendo. PE: carreras con obstáculos, último registro de P3.'),
     evidencia:L('P3 data set closed','Serie de datos de P3 cerrada')},
    {n:7, periodo:4, semana:1, fase:L('Measure change','Medir el cambio'), foco:L('Change over time','El cambio en el tiempo'),
     hace:L('P4 begins. Human development as a process that happens over time. Math opens the bar '+
       'graph and the line graph: which one is for what.',
       'Arranca P4. El desarrollo humano como proceso que ocurre en el tiempo. Math abre el '+
       'gráfico de barras y el de líneas: cuál sirve para qué.'),
     evidencia:L('Bar vs line, decided','Barras o líneas, decidido')},
    {n:8, periodo:4, semana:2, fase:L('Measure change','Medir el cambio'), foco:L('Plotting my own line','Dibujar mi línea'),
     hace:L('The PE records from P3 are plotted on a line graph. What does the line say that the '+
       'table did not? Mixed operations in Math. PE: introduction to basketball.',
       'Se vuelcan los registros de PE de P3 en un gráfico de líneas. ¿Qué dice la línea que no '+
       'decía la tabla? Operaciones combinadas en Math. PE: iniciación al básquet.'),
     evidencia:L('My line, first version','Mi línea, primera versión')},
    {n:9, periodo:4, semana:3, fase:L('Measure change','Medir el cambio'), foco:L('Fractions of a whole','Fracciones de un todo'),
     hace:L('Fractions: adding and subtracting parts of a whole, which is how a partial improvement '+
       'gets expressed. Determiners and polysemous words in Comunicación.',
       'Fracciones: sumar y restar partes de un todo, que es como se expresa una mejora parcial. '+
       'Determinantes y palabras polisémicas en Comunicación.'),
     evidencia:L('Improvement as a fraction','La mejora como fracción')},
    {n:10, periodo:4, semana:4, fase:L('Measure change','Medir el cambio'), foco:L('Converting units','Convertir unidades'),
     hace:L('Converting from a larger unit to a smaller one, including with fractions and mixed '+
       'numbers. Every measurement in the journal is reviewed and put into the same unit.',
       'Conversión de una unidad mayor a una menor, incluida con fracciones y números mixtos. Se '+
       'revisan todas las medidas del cuaderno y se pasan a la misma unidad.'),
     evidencia:L('Journal in one unit','Cuaderno en una sola unidad')},
    {n:11, periodo:4, semana:5, fase:L('Explain','Explicar'), foco:L('Why the line moves','Por qué se mueve la línea'),
     hace:L('The explanation is written: what I did differently and what the data shows. Quotation '+
       'marks and ellipsis in Comunicación, to quote what the PE teacher said.',
       'Se escribe la explicación: qué hice distinto y qué muestra el dato. Comillas y puntos '+
       'suspensivos en Comunicación para citar lo que dijo el profesor de PE.'),
     evidencia:L('Explanation','Explicación')},
    {n:12, periodo:4, semana:6, fase:L('Explain','Explicar'), foco:L('The journal is handed in','Se entrega el cuaderno'),
     hace:L('Measurement journal complete and presented. The lines of the class are compared: not '+
       'to see who runs fastest, but to see which line explains its own shape best.',
       'Cuaderno de medidas completo y presentado. Se comparan las líneas de la clase: no para ver '+
       'quién corre más, sino para ver qué línea explica mejor su propia forma.'),
     evidencia:L('Measurement journal','Cuaderno de medidas')}
  ],
  evaluacion:[
    {criterio:L('I measure with the right instrument','Mido con el instrumento correcto'),
     descriptor:L('Chooses instrument and unit according to the property, and writes the estimate next to the measurement.',
                  'Elige instrumento y unidad según la propiedad, y anota la estimación junto a la medida.')},
    {criterio:L('I record without skipping weeks','Registro sin saltarme semanas'),
     descriptor:L('The series is complete and includes the weeks when the data got worse.',
                  'La serie está completa e incluye las semanas en que el dato empeoró.')},
    {criterio:L('I choose the right graph','Elijo el gráfico que toca'),
     descriptor:L('Uses lines for what changes over time and bars to compare, and can say why.',
                  'Usa líneas para lo que cambia en el tiempo y barras para comparar, y sabe decir por qué.')},
    {criterio:L('I explain the change','Explico el cambio'),
     descriptor:L('Links what he did with what the data shows, without claiming more than the data allows.',
                  'Relaciona lo que hizo con lo que muestra el dato, sin afirmar más de lo que el dato permite.')}
  ],
  diferenciacion:[
    L('The PE record can be time, distance or repetitions: each child chooses a measure and keeps it.',
      'El registro de PE puede ser tiempo, distancia o repeticiones: cada niño elige su medida y la mantiene.'),
    L('The graph can be drawn by hand on graph paper or made in a spreadsheet.',
      'El gráfico se puede hacer a mano en papel milimetrado o en hoja de cálculo.'),
    L('The informative text allows a short version with a scaffold for anyone who needs it.',
      'El texto informativo admite versión corta con esquema para quien lo necesite.')
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:L('The child shows his line graph and explains a week when the data went down. What is '+
      'valued is that he can explain the dip, not that the line goes up.',
      'El niño enseña su gráfico de líneas y explica una semana en la que el dato bajó. Se valora '+
      'que sepa explicar la bajada, no que la línea suba.')},
  toddle:[{periodo:3, nombre:'P.3 "Peru to the World"', tipo:AREA, semanas:5, area:'Social Studies'},
          {periodo:3, nombre:'U3 - Ecosystems of Peru', tipo:AREA, semanas:4, area:'Science'},
          {periodo:4, nombre:'U.4 Sustainable Ica: History, Economy and Environment', tipo:AREA, semanas:5, area:'Social Studies'},
          {periodo:4, nombre:'U4 - Your Guide to Exploring Ica', tipo:AREA, semanas:5, area:'English'},
          {periodo:4, nombre:'P.4 Math "Fractions and Chance: Making Fair Decisions"', tipo:AREA, semanas:5, area:'Math'}],
  unidades:[],
  revisar:[
    L('BIG MISMATCH: in Toddle, P4 of Grade 4 revolves entirely around the trip to ICA '+
      '("Sustainable Ica", "Your Guide to Exploring Ica", "Fractions and Chance"). This '+
      'measurement arc picks up none of that. Before using it, it has to be rebuilt around Ica or '+
      'withdrawn.',
      'DESAJUSTE GRANDE: en Toddle, el P4 de 4.º gira entero alrededor del viaje a ICA '+
      '(«Sustainable Ica», «Your Guide to Exploring Ica», «Fractions and Chance»). Este arco de '+
      'medida no recoge nada de eso. Antes de usarlo hay que rehacerlo sobre Ica o retirarlo.'),
    L('The P4 Science content is human development and puberty and the subject teaches it with its '+
      'own approach. The arc does NOT measure bodies: the personal data recorded is PE performance, '+
      'chosen by the child. That is not a style detail, it is the condition for the project to be '+
      'acceptable.',
      'El contenido de P4 en Science es desarrollo humano y pubertad y lo imparte el área con su '+
      'propio enfoque. El arco NO mide cuerpos: el dato personal que se registra es rendimiento en '+
      'PE, elegido por el niño. Esto no es un detalle de estilo, es la condición para que el '+
      'proyecto sea aceptable.'),
    L('It has to be agreed with the PE teacher that the athletics records are written down and '+
      'shared; without that the arc loses its data series.',
      'Hace falta acordar con el profesor de PE que los registros de atletismo se anoten y se '+
      'compartan; sin eso el arco pierde su serie de datos.')]
},

'g4.t3': {
  grade:'g4', label:'Grade 4', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🌦️', from:'#134e63', to:'#59b6c9'},
  titulo:'The weather station',
  subtitulo:L('What moves the water and the air over our city, and can it be forecast?',
              '¿Qué mueve el agua y el aire de nuestra ciudad, y se puede predecir?'),
  areaEje:'science', areasArticuladas:['math','comunicacion','english','social'],
  situacion:L('P5 gives forces, types of force and energy. P6 gives natural resources, the water '+
    'cycle, climate and weather, and "instruments to measure" written just like that in the plan. '+
    'Math puts decimals in P5 (which is how any instrument is read) and in P6 angles, area and '+
    'perimeter and probability as a fraction and as a percentage. A school weather station uses '+
    'all four and none of them is spare: the force that moves the air, the cycle that moves the '+
    'water, the decimal that gets written down and the percentage the forecast is made with.',
    'P5 da fuerzas, tipos de fuerza y energía. P6 da recursos naturales, ciclo del agua, clima y '+
    'tiempo, e "instruments to measure" escrito tal cual en el plan. Math pone decimales en P5 '+
    '(que es como se lee cualquier instrumento) y en P6 ángulos, área y perímetro y probabilidad '+
    'como fracción y como porcentaje. Una estación meteorológica del colegio usa las cuatro cosas '+
    'y ninguna sobra: la fuerza que mueve el aire, el ciclo que mueve el agua, el decimal que se '+
    'anota y el porcentaje con el que se pronostica.'),
  preguntaEsencial:L('What moves the water and the air over our city, and can we forecast it?',
    '¿Qué mueve el agua y el aire de nuestra ciudad, y podemos predecirlo?'),
  narrativa:L('Nordic does not have a weather station. You are going to build one, and then you '+
    'are going to use it. Not a poster of the water cycle — an instrument that gives a number '+
    'every day. After four weeks of readings you will make a forecast for the school, written as '+
    'a percentage, and then you will find out whether you were right.',
    'Nordic no tiene estación meteorológica. Vais a construir una, y después la vais a usar. No un '+
    'póster del ciclo del agua — un instrumento que dé un número cada día. Después de cuatro '+
    'semanas de lecturas haréis un pronóstico para el colegio, escrito como porcentaje, y luego '+
    'averiguaréis si acertasteis.'),
  orientadoras:{
    science:L('What forces move the air and the water? What instrument measures each thing?',
              '¿Qué fuerzas mueven el aire y el agua? ¿Qué instrumento mide cada cosa?'),
    math:L('How do I read and work with decimals? How do I express a probability as a fraction and as a percentage?',
           '¿Cómo leo y opero con decimales? ¿Cómo expreso una probabilidad como fracción y como porcentaje?'),
    social:L('Where do the resources we use come from and what happens when the climate changes?',
             '¿De dónde salen los recursos que usamos y qué pasa cuando el clima cambia?'),
    english:L('Can I report what I measured and what I predict?',
              '¿Sé informar de lo que medí y de lo que predigo?'),
    comunicacion:L('How do you build a sentence with subject and predicate that informs precisely?',
                   '¿Cómo se construye una oración con sujeto y predicado que informe con precisión?')
  },
  competencias:[
    {area:'science', nombre:L('Designs and builds technological solutions to problems around him','Diseña y construye soluciones tecnológicas para resolver problemas de su entorno'),
     capacidades:[L('Determines an alternative technological solution','Determina una alternativa de solución tecnológica'),
                  L('Designs the alternative technological solution','Diseña la alternativa de solución tecnológica'),
                  L('Implements and validates the alternative technological solution','Implementa y valida la alternativa de solución tecnológica'),
                  L('Evaluates and communicates how the solution works','Evalúa y comunica el funcionamiento de su alternativa de solución tecnológica')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about matter and energy, Earth and the universe','Comprende y usa conocimientos sobre materia y energía, Tierra y universo')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas'),
                  L('Uses strategies and procedures to collect and process data','Usa estrategias y procedimientos para recopilar y procesar datos')]},
    {area:'math', nombre:L('Solves problems of shape, movement and location','Resuelve problemas de forma, movimiento y localización'),
     capacidades:[L('Uses strategies and procedures to measure and find his way in space','Usa estrategias y procedimientos para medir y orientarse en el espacio')]}
  ],
  producto:{
    titulo:'A working station and a forecast',
    audiencia:L('The whole school: the forecast is posted where everybody sees it, and the next day '+
      'everybody knows whether it was right.',
      'El colegio entero: el pronóstico se publica donde todos lo ven, y al día siguiente se sabe '+
      'si acertó.'),
    descripcion:L('A measuring instrument built and working, four weeks of daily readings and a '+
      'weekly forecast expressed as a percentage, then checked against what actually happened.',
      'Un instrumento de medida construido y en funcionamiento, cuatro semanas de registros diarios '+
      'y un pronóstico semanal expresado en porcentaje, contrastado después con lo que de verdad '+
      'pasó.'),
    incluye:[L('My instrument and how I built it','Mi instrumento y cómo lo construí'),
             L('The daily record in decimals','El registro diario en decimales'),
             L('The plan of the station with its area and its perimeter','El plano de la estación con su área y su perímetro'),
             L('My forecast as a fraction and as a percentage','Mi pronóstico en fracción y en porcentaje'),
             L('The check: right or wrong, and why','El contraste: acerté o no, y por qué')]
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:L('Forces','Fuerzas'), foco:L('What a force does','Qué hace una fuerza'),
     hace:L('Forces: what makes something move, stop or change shape. The technological problem is '+
       'set out: the school does not know what the weather is, it only knows what it feels like.',
       'Fuerzas: qué hace que algo se mueva, se pare o cambie de forma. Se plantea el problema '+
       'tecnológico: el colegio no sabe qué tiempo hace, solo lo que siente.'),
     evidencia:L('The problem, stated','El problema, enunciado')},
    {n:2, periodo:5, semana:2, fase:L('Forces','Fuerzas'), foco:L('Types of forces','Tipos de fuerza'),
     hace:L('Types of force. Which one moves the air, which one moves the water. Decimals in Math: '+
       'reading, writing and expressing up to three decimal places, which is how an instrument '+
       'reads.',
       'Tipos de fuerza. Cuál mueve el aire, cuál mueve el agua. Decimales en Math: leer, escribir '+
       'y expresar hasta tres cifras decimales, que es como marca un instrumento.'),
     evidencia:L('Force map','Mapa de fuerzas')},
    {n:3, periodo:5, semana:3, fase:L('Forces','Fuerzas'), foco:L('Choosing the instrument','Elegir el instrumento'),
     hace:L('Each team chooses what to measure: rain, wind, temperature or humidity. Decimals are '+
       'compared and ordered to fix the scale of the instrument.',
       'Cada equipo elige qué va a medir: lluvia, viento, temperatura o humedad. Se comparan y '+
       'ordenan decimales para fijar la escala del instrumento.'),
     evidencia:L('Design chosen','Diseño elegido')},
    {n:4, periodo:5, semana:4, fase:L('Build','Construir'), foco:L('Energy','Energía'),
     hace:L('Energy and its forms. Building the instrument. Adding and subtracting decimals to '+
       'calibrate it against a known measure.',
       'Energía y sus formas. Construcción del instrumento. Suma y resta de decimales para '+
       'calibrarlo contra una medida conocida.'),
     evidencia:L('Prototype v1','Prototipo v1')},
    {n:5, periodo:5, semana:5, fase:L('Build','Construir'), foco:L('Testing the instrument','Probar el instrumento'),
     hace:L('Test and adjust: two instruments measuring the same thing have to give the same '+
       'answer. Multiplying and dividing decimals to convert the reading.',
       'Prueba y ajuste: dos instrumentos midiendo lo mismo tienen que dar lo mismo. '+
       'Multiplicación y división de decimales para convertir la lectura.'),
     evidencia:L('Calibrated instrument','Instrumento calibrado')},
    {n:6, periodo:6, semana:1, fase:L('Record','Registrar'), foco:L('Natural resources','Recursos naturales'),
     hace:L('P6 begins. Natural resources: where the water we use comes from. The daily record '+
       'starts and does not stop until week 10.',
       'Arranca P6. Recursos naturales: de dónde sale el agua que usamos. Empieza el registro '+
       'diario y no para hasta la semana 10.'),
     evidencia:L('Day 1 of the log','Día 1 del registro')},
    {n:7, periodo:6, semana:2, fase:L('Record','Registrar'), foco:L('The water cycle','El ciclo del agua'),
     hace:L('The water cycle, now with their own record in front of them. Angles and 2D shapes in '+
       'Math for the plan of the station.',
       'Ciclo del agua, ahora con el propio registro delante. Ángulos y figuras 2D en Math para el '+
       'plano de la estación.'),
     evidencia:L('Water cycle, annotated with our data','Ciclo del agua, anotado con nuestros datos')},
    {n:8, periodo:6, semana:3, fase:L('Record','Registrar'), foco:L('Climate and weather','Clima y tiempo'),
     hace:L('The difference between climate and weather, which is exactly the difference between '+
       'what is expected and what is measured. Area and perimeter of the station.',
       'La diferencia entre clima y tiempo, que es exactamente la diferencia entre lo que se '+
       'espera y lo que se mide. Área y perímetro de la estación.'),
     evidencia:L('Climate vs weather','Clima frente a tiempo')},
    {n:9, periodo:6, semana:4, fase:L('Forecast','Predecir'), foco:L('Instruments to measure','Instrumentos de medida'),
     hace:L('Measuring instruments: the school ones are compared with professional ones. What error '+
       'does ours have and how much does it matter.',
       'Instrumentos de medida: se comparan los del colegio con los profesionales. Qué error tiene '+
       'el nuestro y cuánto importa.'),
     evidencia:L('Error estimate','Estimación del error')},
    {n:10, periodo:6, semana:5, fase:L('Forecast','Predecir'), foco:L('The forecast','El pronóstico'),
     hace:L('Probability as a fraction and as a percentage, applied to their own record: of the '+
       'last twenty days, how many were like this? The forecast is published.',
       'Probabilidad como fracción y como porcentaje, aplicada al propio registro: de los últimos '+
       'veinte días, ¿cuántos fueron así? Se publica el pronóstico.'),
     evidencia:L('Published forecast','Pronóstico publicado')},
    {n:11, periodo:6, semana:6, fase:L('Forecast','Predecir'), foco:L('Were we right?','¿Acertamos?'),
     hace:L('The forecast is checked against what happened. The four operations to close the '+
       'balance. Sentence, subject and predicate, to write the final report without ambiguity.',
       'Contraste del pronóstico con lo que pasó. Las cuatro operaciones para cerrar el balance. '+
       'La oración, sujeto y predicado, para redactar el informe final sin ambigüedad.'),
     evidencia:L('Final report','Informe final')}
  ],
  evaluacion:[
    {criterio:L('I build something that works','Construyo algo que funciona'),
     descriptor:L('The instrument gives a repeatable reading, and he explains what he adjusted to get there.',
                  'El instrumento da una lectura repetible, y explica qué ajustó para conseguirlo.')},
    {criterio:L('I record with decimals','Registro con decimales'),
     descriptor:L('Writes down to the precision the instrument allows and does not invent extra digits.',
                  'Anota con la precisión que el instrumento permite y no inventa cifras de más.')},
    {criterio:L('I forecast with probability','Pronostico con probabilidad'),
     descriptor:L('His percentage comes from his own record and he can say how many days it is calculated on.',
                  'Su porcentaje sale del propio registro y sabe decir sobre cuántos días está calculado.')},
    {criterio:L('I accept the result','Acepto el resultado'),
     descriptor:L('When the forecast fails, he explains what data he was missing instead of making excuses.',
                  'Cuando falla el pronóstico, explica qué dato le faltó en vez de justificarse.')}
  ],
  diferenciacion:[
    L('The instruments differ in difficulty: rain gauge (simplest), wind vane, thermometer, hygrometer.',
      'Los instrumentos tienen dificultades distintas: pluviómetro (más simple), veleta, termómetro, higrómetro.'),
    L('The daily record can be taken in turns inside the team, with the rota signed.',
      'El registro diario se puede repartir por turnos dentro del equipo, con la tabla firmada.'),
    L('The final report can take the form of a short weather bulletin.',
      'El informe final admite formato de parte meteorológico corto.')
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:L('The child shows his instrument and his record, and says the forecast he made and '+
      'whether it was right. A failed forecast well explained is worth more than a lucky one.',
      'El niño enseña su instrumento y su registro, y dice el pronóstico que hizo y si acertó. Un '+
      'pronóstico fallado bien explicado vale más que uno acertado por suerte.')},
  toddle:[{periodo:5, nombre:'U5 - Science · U5 - English · U5 - Social Studies · U5 - Math', tipo:VACIA, semanas:5, area:L('all four subjects','las cuatro áreas')}],
  unidades:[],
  revisar:[
    L('In Toddle the four U5 units of Grade 4 exist but are EMPTY: no learning experiences and no '+
      'assessments. They are reserved templates. P6 does not exist. This arc stands only on the '+
      'annual plan spreadsheet.',
      'En Toddle, las cuatro unidades U5 de 4.º existen pero están VACÍAS: sin experiencias de '+
      'aprendizaje ni evaluaciones. Son plantillas reservadas. P6 no existe. Este arco se sostiene '+
      'solo sobre el plan anual en Excel.'),
    L('The station needs a place in the school where the instrument can be left between lessons. '+
      'It has to be requested before P5, not in week 4.',
      'La estación necesita un sitio del colegio donde se pueda dejar el instrumento entre clase y '+
      'clase. Hay que pedirlo antes de P5, no en la semana 4.')]
},

/* ==================================================================== 5.o */

'g5.t1': {
  grade:'g5', label:'Grade 5', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🧭', from:'#3d2a5c', to:'#8d76c4'},
  titulo:'5th Grade Territory',
  subtitulo:L('What our territory is made of and what we are doing to it',
              'De qué está hecho nuestro territorio y qué le estamos haciendo'),
  areaEje:'science', areasArticuladas:['social','comunicacion','math','english'],
  situacion:L('The title is not ours: the Grade 5 annual plan calls its first unit "5th Grade '+
    'Territory". P1 fills it with matter (what things are made of: particles, atoms, physical and '+
    'chemical changes) and with territory in the civic sense (classroom agreements, rules of our '+
    'community, conflicts, "territorial issues"), and Science already introduces the research '+
    'question, the variables and the hypothesis. P2 lands it: kingdoms of living things, human '+
    'impact on the planet, waste management with landfills and recycling centres, pollution and '+
    'deforestation; and Math opens data collection with bar, line and dot plots. Meanwhile, '+
    'Comunicación goes through four story genres and English asks for narrative texts of 200 to '+
    '250 words. There are two possible products and both are good: an investigation into our own '+
    'waste, and a story set in that territory.',
    'El título no es nuestro: el plan anual de 5.º llama a su primera unidad "5th Grade '+
    'Territory". P1 la llena de materia (de qué están hechas las cosas: partículas, átomos, '+
    'cambios físicos y químicos) y de territorio en el sentido cívico (acuerdos de aula, reglas de '+
    'nuestra comunidad, conflictos, "territorial issues"), y Science introduce ya la pregunta de '+
    'investigación, las variables y la hipótesis. P2 aterriza: reinos de los seres vivos, impacto '+
    'humano en el planeta, gestión de residuos con vertederos y centros de reciclaje, '+
    'contaminación y deforestación; y Math abre la recogida de datos con gráficos de barras, de '+
    'líneas y de puntos. Mientras tanto, Comunicación recorre cuatro géneros de cuento y English '+
    'pide textos narrativos de 200 a 250 palabras. Hay dos productos posibles y los dos son '+
    'buenos: una investigación sobre nuestros residuos, y un cuento situado en ese territorio.'),
  preguntaEsencial:L('What is our territory made of, and what are we doing to it?',
    '¿De qué está hecho nuestro territorio, y qué le estamos haciendo?'),
  narrativa:L('This term you are going to look at this school the way a scientist and a writer '+
    'look at the same street. The scientist asks what things are made of and measures what we '+
    'throw away. The writer asks what happens here and turns it into a story somebody would want '+
    'to read. You are going to do both, about the same place, and they have to agree with each '+
    'other.',
    'Este trimestre vais a mirar este colegio como miran la misma calle un científico y un '+
    'escritor. El científico pregunta de qué están hechas las cosas y mide lo que tiramos. El '+
    'escritor pregunta qué pasa aquí y lo convierte en un relato que alguien querría leer. Vais a '+
    'hacer las dos cosas, sobre el mismo sitio, y tienen que coincidir entre sí.'),
  orientadoras:{
    science:L('What is matter made of and how does it change? What are we leaving behind, and how much?',
              '¿De qué está hecha la materia y cómo cambia? ¿Qué estamos dejando atrás y cuánto?'),
    social:L('What rules govern this territory and who decides about it?',
             '¿Qué reglas rigen este territorio y quién decide sobre él?'),
    comunicacion:L('Which story genre works best to tell what happens in a place?',
                   '¿Qué género de cuento sirve mejor para contar lo que pasa en un sitio?'),
    math:L('How do I collect data and which graph tells the truth about it?',
           '¿Cómo recojo datos y qué gráfico dice la verdad sobre ellos?'),
    english:L('Can I write a narrative of 200-250 words that holds together?',
              '¿Sé escribir una narración de 200 a 250 palabras que se sostenga?')
  },
  competencias:[
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir sus conocimientos'),
     capacidades:[L('Frames situations for inquiry','Problematiza situaciones para hacer indagación'),
                  L('Designs strategies for inquiry','Diseña estrategias para hacer indagación'),
                  L('Generates and records data','Genera y registra datos o información'),
                  L('Analyses data and information','Analiza datos e información')]},
    {area:'science', nombre:L('Explains the physical world drawing on knowledge about living things, matter and energy, biodiversity, Earth and the universe','Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo'),
     capacidades:[L('Understands and uses knowledge about matter and energy','Comprende y usa conocimientos sobre materia y energía'),
                  L('Evaluates what scientific and technological work implies','Evalúa las implicancias del saber y del quehacer científico y tecnológico')]},
    {area:'social', nombre:L('Responsibly manages space and the environment','Gestiona responsablemente el espacio y el ambiente'),
     capacidades:[L('Understands the relations between natural and social elements','Comprende las relaciones entre los elementos naturales y sociales'),
                  L('Generates actions to conserve the local and global environment','Genera acciones para conservar el ambiente local y global')]},
    {area:'comunicacion', nombre:L('Writes different kinds of texts in his mother tongue','Escribe diversos tipos de textos en su lengua materna'),
     capacidades:[L('Fits the text to the communicative situation','Adecúa el texto a la situación comunicativa'),
                  L('Organises and develops ideas coherently and cohesively','Organiza y desarrolla las ideas de forma coherente y cohesionada'),
                  L('Reflects on and evaluates the form, content and context of the written text','Reflexiona y evalúa la forma, el contenido y el contexto del texto escrito')]},
    {area:'math', nombre:L('Solves problems of data management and uncertainty','Resuelve problemas de gestión de datos e incertidumbre'),
     capacidades:[L('Represents data with graphs and statistical measures','Representa datos con gráficos y medidas estadísticas'),
                  L('Uses strategies and procedures to collect and process data','Usa estrategias y procedimientos para recopilar y procesar datos')]}
  ],
  producto:{
    titulo:'The Territory File',
    audiencia:L('The school coordination team, which receives the waste investigation; and the '+
      'class anthology, which collects the stories and stays in the library.',
      'La coordinación del colegio, que recibe la investigación de residuos; y la antología de la '+
      'clase, que recoge los cuentos y se queda en la biblioteca.'),
    descripcion:L('An investigation with a question, variables and a hypothesis about what our '+
      'school throws away, with its data and its conclusion; and a story in the genre each student '+
      'chose, set in that same territory.',
      'Una investigación con pregunta, variables e hipótesis sobre lo que nuestro colegio tira, con '+
      'sus datos y su conclusión; y un cuento del género que cada uno eligió, situado en ese mismo '+
      'territorio.'),
    incluye:[L('My research question and my variables','Mi pregunta de investigación y mis variables'),
             L('My hypothesis, written before measuring','Mi hipótesis, escrita antes de medir'),
             L('The table and the graph of what we measured','La tabla y el gráfico de lo que medimos'),
             L('The conclusion, with what the hypothesis got right and wrong','La conclusión, con lo que la hipótesis acertó y falló'),
             L('My 200 to 250 word story','Mi cuento de 200 a 250 palabras'),
             L('The critical analysis of the genre I chose','El análisis crítico del género que elegí')]
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:L('What it is made of','De qué está hecho'), foco:L('What matter is made of','De qué está hecha la materia'),
     hace:L('Small particles, atoms and subatomic particles. Social Studies opens with the '+
       'classroom agreements: the rules of this territory. In Comunicación the detective story '+
       'starts.',
       'Partículas pequeñas, átomos y partículas subatómicas. Social abre con los acuerdos de aula: '+
       'las reglas de este territorio. En Comunicación arranca el cuento policial.'),
     evidencia:L('Particle model','Modelo de partículas')},
    {n:2, periodo:1, semana:2, fase:L('What it is made of','De qué está hecho'), foco:L('Question, variables, hypothesis','Pregunta, variables, hipótesis'),
     hace:L('Research question, types of variable (dependent and independent) and how to write a '+
       'hypothesis. It is the central tool of the arc and it arrives in week 2.',
       'Pregunta de investigación, tipos de variable (dependiente e independiente) y formulación de '+
       'hipótesis. Es la herramienta central del arco y llega en la semana 2.'),
     evidencia:L('My first hypothesis','Mi primera hipótesis')},
    {n:3, periodo:1, semana:3, fase:L('What it is made of','De qué está hecho'), foco:L('Physical changes','Cambios físicos'),
     hace:L('Physical changes: types of mixture, states of matter, forces of repulsion and cohesion. '+
       'Self-regulation in Social Studies. The urban realist story in Comunicación.',
       'Cambios físicos: tipos de mezcla, estados de la materia, fuerzas de repulsión y cohesión. '+
       'Autorregulación en Social. El cuento urbano realista en Comunicación.'),
     evidencia:L('Mixture test','Prueba de mezclas')},
    {n:4, periodo:1, semana:4, fase:L('What it is made of','De qué está hecho'), foco:L('Separating a mixture','Separar una mezcla'),
     hace:L('Physical changes continue, now applied: how do you separate what we mixed. Rules of '+
       'our community, equality and respect in Social Studies.',
       'Se sigue con cambios físicos, ahora aplicados: cómo se separa lo que hemos mezclado. Reglas '+
       'de nuestra comunidad, igualdad y respeto en Social.'),
     evidencia:L('Separation method','Método de separación')},
    {n:5, periodo:1, semana:5, fase:L('What it is made of','De qué está hecho'), foco:L('Chemical changes','Cambios químicos'),
     hace:L('Chemical changes: reversible and irreversible reactions. What can be undone and what '+
       'cannot, which is exactly the question a landfill asks. Conflicts in Social Studies.',
       'Cambios químicos: reacciones reversibles e irreversibles. Qué se puede deshacer y qué no, '+
       'que es exactamente la pregunta de un vertedero. Conflictos en Social.'),
     evidencia:L('Reversible or not','Reversible o no')},
    {n:6, periodo:1, semana:6, fase:L('What it is made of','De qué está hecho'), foco:'Territorial issues',
     hace:L('P1 closes: "territorial issues" in Social Studies and a critical analysis of the '+
       'favourite story genre in Comunicación. Each student now fixes the genre of his story.',
       'Cierre de P1: "territorial issues" en Social y análisis crítico del género de cuento '+
       'preferido en Comunicación. Cada alumno fija ya el género de su cuento.'),
     evidencia:L('Genre chosen, with the reason','Género elegido, con el motivo')},
    {n:7, periodo:2, semana:1, fase:L('What we do to it','Qué le hacemos'), foco:L('Kingdoms of living things','Reinos de los seres vivos'),
     hace:L('P2 begins. Kingdoms of living things: who else lives in this territory. In English the '+
       'book "The lost city" starts.',
       'Arranca P2. Reinos de los seres vivos: quién más vive en este territorio. En English '+
       'empieza el libro "The lost city".'),
     evidencia:L('Kingdom sort','Clasificación por reinos')},
    {n:8, periodo:2, semana:2, fase:L('What we do to it','Qué le hacemos'), foco:L('What we throw away','Lo que tiramos'),
     hace:L('Human impact: environmental problems and waste management, landfills and recycling '+
       'centres. What the school throws away in one day is weighed or counted. This is where the '+
       'hypothesis from week 2 meets a real object.',
       'Impacto humano: problemas ambientales y gestión de residuos, vertederos y centros de '+
       'reciclaje. Se pesa o se cuenta lo que el colegio tira en un día. Aquí entra la hipótesis de '+
       'la semana 2 con un objeto real.'),
     evidencia:L('Waste count, day 1','Conteo de residuos, día 1')},
    {n:9, periodo:2, semana:3, fase:L('What we do to it','Qué le hacemos'), foco:L('Pollution and habitat loss','Contaminación y pérdida de hábitat'),
     hace:L('Pollution, deforestation, habitat loss and predation. The count continues. Multi-step '+
       'problems and one-variable equations in Math.',
       'Contaminación, deforestación, pérdida de hábitat y depredación. Sigue el conteo. Problemas '+
       'de varios pasos y ecuaciones de una variable en Math.'),
     evidencia:L('Week of data','Una semana de datos')},
    {n:10, periodo:2, semana:4, fase:L('Tell the story','Contar la historia'), foco:L('Choosing the graph','Elegir el gráfico'),
     hace:L('Data collection with open and closed questions and bar, line and dot plots. Which one '+
       'tells the truth about our data? In English, the choices the author makes.',
       'Recolección de datos con preguntas abiertas y cerradas y gráficos de barras, de líneas y de '+
       'puntos. ¿Cuál dice la verdad sobre nuestro dato? En English, las decisiones del autor.'),
     evidencia:L('Graph + why this one','Gráfico + por qué este')},
    {n:11, periodo:2, semana:5, fase:L('Tell the story','Contar la historia'), foco:L('The file and the story','El dossier y el cuento'),
     hace:L('Conclusion of the investigation set against the hypothesis, and the final version of '+
       'the 200 to 250 word story. They are handed in together: they are the same territory.',
       'Conclusión de la investigación contrastada con la hipótesis, y versión final del cuento de '+
       '200 a 250 palabras. Se entregan juntos: son el mismo territorio.'),
     evidencia:'Territory File'}
  ],
  evaluacion:[
    {criterio:L('I write a testable hypothesis','Formulo una hipótesis comprobable'),
     descriptor:L('His hypothesis names the variable that changes and the one that is measured, and it was written before the data.',
                  'Su hipótesis nombra la variable que cambia y la que se mide, y se escribió antes de los datos.')},
    {criterio:L('I collect honest data','Recojo datos honestos'),
     descriptor:L('The series is complete, and when the data contradicts the hypothesis he leaves it written down anyway.',
                  'La serie está completa, y cuando el dato contradice la hipótesis lo deja escrito igual.')},
    {criterio:L('I choose the representation','Elijo la representación'),
     descriptor:L('Justifies why that graph and not another one for his data.',
                  'Justifica por qué ese gráfico y no otro para sus datos.')},
    {criterio:L('I write a story in the chosen genre','Escribo un cuento del género elegido'),
     descriptor:L('The story does what defines its genre, fits in 200-250 words and stands on its own.',
                  'El cuento cumple lo que define su género, cabe en 200-250 palabras y se sostiene solo.')}
  ],
  diferenciacion:[
    L('The waste count can be by weight, by volume or by number of pieces: one is chosen and kept.',
      'El conteo de residuos admite peso, volumen o número de piezas: se elige uno y se mantiene.'),
    L('The story can be written in Spanish (Comunicación) or in English; not twice.',
      'El cuento se puede escribir en castellano (Comunicación) o en inglés (English); no las dos veces.'),
    L('Anyone who needs support writes the conclusion with a three-sentence scaffold: I expected / it happened / so.',
      'Quien necesite apoyo escribe la conclusión con un guion de tres frases: esperaba / pasó / por eso.')
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:L('The student shows his original hypothesis next to his conclusion and explains where '+
      'he was wrong. That is what is asked of him: not to be right, but to know what the data told him.',
      'El alumno enseña su hipótesis original al lado de su conclusión y explica en qué se '+
      'equivocó. Eso es lo que se le pide: no acertar, sino saber qué le dijeron los datos.')},
  toddle:[{periodo:1, nombre:'Project 1: Building our 5th Grade Territory!', tipo:IDU, semanas:5, area:'Social Studies'},
          {periodo:2, nombre:'PROJECT 2 - Life Systems: Everything is Connected', tipo:IDU, semanas:5, area:'Social Studies +1'}],
  unidades:[],
  revisar:[
    L('The title comes from Toddle: "Project 1: Building our 5th Grade Territory!". But there that '+
      'project takes up ONLY P1; P2 is another one with a name of its own, "Life Systems: '+
      'Everything is Connected". The arc joins them.',
      'El título sale de Toddle: «Project 1: Building our 5th Grade Territory!». Pero allí ese '+
      'proyecto ocupa SOLO P1; P2 es otro con nombre propio, «Life Systems: Everything is '+
      'Connected». El arco los junta.'),
    L('Weighing or counting the school rubbish needs permission and gloves. If it cannot be done, '+
      'the count is limited to the classroom and it is stated that it is a sample, not the whole '+
      'school.',
      'Pesar o contar la basura del colegio necesita permiso y guantes. Si no se puede, el conteo '+
      'se limita al aula y se dice que es una muestra, no el colegio entero.'),
    L('The Grade 5 plan writes "Solo son 5 semanitas" in P2: the arc already counts 5, not 6.',
      'El plan de 5.º marca "Solo son 5 semanitas" en P2: el arco ya cuenta 5, no 6.')]
},

'g5.p4p5': {
  grade:'g5', label:'Grade 5', trimestre:2, periodos:[4,5], semanas:11,
  inicio:'2026-08-04', fin:'2026-10-23',
  cruzaTrimestre:true,
  cover:{icon:'🔬', from:'#14503f', to:'#4fa886'},
  titulo:'Scientific Field Researchers',
  subtitulo:L('Discovering the science behind the communities of Cajamarca',
              'Descubriendo la ciencia detrás de las comunidades de Cajamarca'),
  autoria:L('A school document. This arc is NOT proposed by the portal: it is written by the Grade '+
    '5 team in "Projects 4 & 5.docx" (Master Plan + Project Overview & Teacher Planning Guide). '+
    'It is transcribed here so the portal can run it; the source is what counts.',
    'Documento del colegio. Este arco NO lo propone el portal: está escrito por el equipo de 5.º '+
    'en "Projects 4 & 5.docx" (Master Plan + Project Overview & Teacher Planning Guide). Aquí se '+
    'transcribe para que el portal lo ejecute; la fuente manda.'),
  areaEje:'science', areasArticuladas:['social','english','math'],
  situacion:L('The communities of Cajamarca have developed different ways of relating to their '+
    'territory through productive, cultural and social activities. During the study trip, students '+
    'will observe how living things, natural resources, human activities and technology interact '+
    'to make community life and sustainable production possible. From these experiences they will '+
    'develop a scientific way of looking that will let them understand real phenomena, formulate '+
    'investigable questions and design investigations of their own.',
    'Las comunidades de Cajamarca han desarrollado diferentes formas de relacionarse con su '+
    'territorio mediante actividades productivas, culturales y sociales. Durante el viaje de '+
    'estudios, los estudiantes observarán cómo los seres vivos, los recursos naturales, las '+
    'actividades humanas y la tecnología interactúan para permitir la vida comunitaria y la '+
    'producción sostenible. A partir de estas experiencias desarrollarán una mirada científica que '+
    'les permitirá comprender fenómenos reales, formular preguntas investigables y diseñar '+
    'investigaciones propias.'),
  preguntaEsencial:L('How does science help communities use natural resources sustainably?',
    '¿Cómo ayuda la ciencia a que las comunidades aprovechen los recursos naturales de forma sostenible?'),
  narrativa:L('Scientists do not only work in laboratories. Very often they go out into the world '+
    'to observe, ask questions and discover how nature works. On our trip to Cajamarca we will not '+
    'go only as visitors: we will go as field scientists. But a scientist does not stop at what he '+
    'observes. A scientist observes, asks, investigates and explains. That is why the trip is only '+
    'the beginning: afterwards we will choose a question that makes us curious and build an '+
    'investigation of our own to share at the Science Fair.',
    'Los científicos no solamente trabajan en laboratorios. Muchas veces salen al mundo para '+
    'observar, hacer preguntas y descubrir cómo funciona la naturaleza. Durante nuestro viaje a '+
    'Cajamarca no iremos solamente como visitantes: iremos como científicos de campo. Pero un '+
    'científico no se queda con lo que observa. Un científico observa, pregunta, investiga y '+
    'explica. Por eso el viaje es solo el inicio: después elegiremos una pregunta que nos genere '+
    'curiosidad y construiremos una investigación propia para compartirla en el Science Fair.'),
  orientadoras:{
    science:L('How do natural resources, living things and technology make the sustainable production of food and other goods possible?',
              '¿Cómo hacen posible los recursos naturales, los seres vivos y la tecnología la producción sostenible de alimentos y otros productos?'),
    social:L('How do communities use their territory, culture and resources to build their identity and development?',
             '¿Cómo utilizan las comunidades su territorio, cultura y recursos para construir su identidad y desarrollo?'),
    math:L('How do I represent and interpret the data I collect in the field?',
           '¿Cómo represento e interpreto los datos que recojo en campo?'),
    english:L('Can I research, take notes and give an informative talk about what I found?',
              '¿Sé investigar, tomar notas y dar una charla informativa sobre lo que encontré?')
  },
  competencias:[
    {area:'science', nombre:L('Inquires through scientific methods to build knowledge','Indaga mediante métodos científicos para construir conocimientos'),
     capacidades:[L('Frames situations — asks questions about observed phenomena','Problematiza situaciones — formula preguntas sobre fenómenos observados'),
                  L('Designs strategies for inquiry — plans ways to obtain evidence','Diseña estrategias para hacer indagación — planifica formas de obtener evidencias'),
                  L('Generates and records data — gathers information through observations and records','Genera y registra datos — recopila información mediante observaciones y registros'),
                  L('Analyses data and information — identifies patterns and relations','Analiza datos e información — identifica patrones y relaciones'),
                  L('Evaluates and communicates — builds conclusions and shares learning','Evalúa y comunica — construye conclusiones y comparte aprendizajes')]},
    {area:'science', nombre:L('Explains the physical world drawing on scientific knowledge','Explica el mundo físico basándose en conocimientos científicos'),
     capacidades:[L('Understands and uses scientific knowledge — explains relations between living things, environment, resources, the transformation of materials and productive processes','Comprende y usa conocimientos científicos — explica relaciones entre seres vivos, ambiente, recursos, transformación de materiales y procesos productivos'),
                  L('Evaluates what scientific and technological knowledge implies — reflects on how human decisions affect the environment and communities','Evalúa las implicancias del saber científico y tecnológico — reflexiona sobre cómo las decisiones humanas impactan el ambiente y las comunidades')]}
  ],
  conceptos:[
    {nombre:L('Systems','Sistemas'), idea:L('The parts of a system interact and produce change.','Los elementos de un sistema interactúan y generan cambios.')},
    {nombre:L('Interdependence','Interdependencia'), idea:L('Living things depend on one another and on the environment.','Los seres vivos dependen unos de otros y del ambiente.')},
    {nombre:L('Natural resources','Recursos naturales'), idea:L('The resources of the environment let human needs be met.','Los recursos del ambiente permiten satisfacer necesidades humanas.')},
    {nombre:L('Transformation','Transformación'), idea:L('Science and technology turn resources into products.','La ciencia y la tecnología permiten transformar recursos en productos.')},
    {nombre:L('Sustainability','Sostenibilidad'), idea:L('Communities must use resources with their future conservation in mind.','Las comunidades deben utilizar recursos considerando su conservación futura.')}
  ],
  producto:{
    titulo:'Scientific Field Report + Science Fair Research Project',
    audiencia:L('The school community at the Science Fair, and the families on Student Achievement Day.',
      'La comunidad escolar en el Science Fair, y las familias en el Student Achievement Day.'),
    descripcion:L('In P4, a field report with observations, evidence, explanations and new '+
      'questions. In P5, an investigation of their own with a scientific question, process, '+
      'evidence, conclusion and communication.',
      'En P4, un informe de campo con observaciones, evidencias, explicaciones y nuevas preguntas. '+
      'En P5, una investigación propia con pregunta científica, proceso, evidencia, conclusión y '+
      'comunicación.'),
    incluye:['Scientific Field Journal','Evidence Map','Scientific Explanation Card',
             'Research Proposal','Investigation Blueprint','Evidence Portfolio',
             'Scientific Argument','Science Fair Presentation']
  },
  fases:[
    {n:1, periodo:4, semana:1, fase:'From Observation to Question', foco:'Developing Scientific Observation',
     hace:L('Scientific preparation. The student learns to observe scientifically.',
            'Preparación científica. El estudiante aprende a observar científicamente.'),
     evidencia:'Scientist Identity + Initial Ideas'},
    {n:2, periodo:4, semana:2, fase:'From Observation to Question', foco:'Preparing Scientific Investigation',
     hace:L('Preparing for the trip. The student defines what he will observe and why.',
            'Preparación del viaje. El estudiante define qué observará y por qué.'),
     evidencia:'Scientific Observation Plan'},
    {n:3, periodo:4, semana:3, fase:'From Observation to Question', foco:'Field Research Experience',
     hace:L('Trip to Cajamarca. The student collects evidence during the trip.',
            'Viaje a Cajamarca. El estudiante recolecta evidencias durante el viaje.'),
     evidencia:'Scientific Field Journal'},
    {n:4, periodo:4, semana:4, fase:'From Observation to Question', foco:'Organizing Evidence',
     hace:L('Analysis of the evidence. The student identifies relations and patterns.',
            'Análisis de evidencias. El estudiante identifica relaciones y patrones.'),
     evidencia:'Evidence Map'},
    {n:5, periodo:4, semana:5, fase:'From Observation to Question', foco:'Building Scientific Explanations',
     hace:L('Scientific explanations. The student explains phenomena using evidence.',
            'Explicaciones científicas. El estudiante explica fenómenos utilizando evidencia.'),
     evidencia:'Scientific Explanation Card'},
    {n:6, periodo:4, semana:6, fase:'From Observation to Question', foco:'Generating New Questions',
     hace:L('P4 closes. The student turns what he has learned into a new investigation.',
            'Cierre de P4. El estudiante transforma aprendizajes en una nueva investigación.'),
     evidencia:'Research Proposal'},
    {n:7, periodo:5, semana:1, fase:'From Question to Investigation', foco:'Choosing My Research Question',
     hace:L('P5 begins, and Student Achievement Day #2.','Inicio de P5 y Student Achievement Day #2.'),
     evidencia:'Research Proposal Presentation'},
    {n:8, periodo:5, semana:2, fase:'From Question to Investigation', foco:'Designing My Investigation',
     hace:L('Designing the investigation.','Diseño de la investigación.'), evidencia:'Investigation Blueprint'},
    {n:9, periodo:5, semana:3, fase:'From Question to Investigation', foco:'Collecting Evidence',
     hace:L('Experimental work.','Desarrollo experimental.'), evidencia:'Evidence Portfolio'},
    {n:10, periodo:5, semana:4, fase:'From Question to Investigation', foco:'Constructing Scientific Explanation',
     hace:L('Interpretation and communication.','Interpretación y comunicación.'), evidencia:'Scientific Argument'},
    {n:11, periodo:5, semana:5, fase:'From Question to Investigation', foco:'Sharing Scientific Knowledge',
     hace:'Science Fair.', evidencia:'Science Fair Presentation'}
  ],
  evaluacion:[
    {criterio:L('Scientific investigation','Investigación científica'),
     descriptor:L('Formulates questions, collects evidence, analyses information and communicates conclusions.',
                  'Formula preguntas, recoge evidencias, analiza información y comunica conclusiones.')},
    {criterio:L('Scientific explanation','Explicación científica'),
     descriptor:L('Uses scientific concepts, relates causes and effects and argues using evidence.',
                  'Utiliza conceptos científicos, relaciona causas y efectos y argumenta usando evidencia.')},
    {criterio:L('Reflective thinking','Pensamiento reflexivo'),
     descriptor:L('Identifies what he has learned, recognises difficulties and proposes improvements.',
                  'Identifica aprendizajes, reconoce dificultades y propone mejoras.')}
  ],
  diferenciacion:[
    L('The project allows different routes to show learning: writing, visual models, oral '+
      'presentations, prototypes, videos or mock-ups.',
      'El proyecto permite distintos caminos para demostrar aprendizaje: escritura, modelos '+
      'visuales, exposiciones orales, prototipos, vídeos o maquetas.'),
    L('The common expectation stays: everybody must show a question, evidence and a scientific explanation.',
      'La expectativa común permanece: todos deben demostrar una pregunta, evidencia y explicación científica.')
  ],
  rolDocente:L('The teacher does not act as the main transmitter of information but as a '+
    'scientific facilitator: helping to formulate questions, validate methods, interpret evidence '+
    'and build explanations. His four standing questions are "what evidence do you have?", "what '+
    'makes you think that?", "what scientific concept helps to understand it?" and "what would you '+
    'change if you had another go?".',
    'El docente no actúa como transmisor principal de información, sino como facilitador '+
    'científico: ayuda a formular preguntas, validar métodos, interpretar evidencia y construir '+
    'explicaciones. Sus cuatro preguntas de cabecera son «¿qué evidencia tienes?», «¿qué te hace '+
    'pensar eso?», «¿qué concepto científico ayuda a entenderlo?» y «¿qué cambiarías si tuvieras '+
    'otra oportunidad?».'),
  sad:{titulo:'Student Achievement Day #2',
    muestra:L('"My Scientific Journey": what he knew before, what he discovered on the trip, the '+
      'evidence he collected and his new research question.',
      '«My Scientific Journey»: lo que sabía antes, lo que descubrió durante el viaje, las '+
      'evidencias recogidas y su nueva pregunta de investigación.')},
  toddle:[{periodo:4, nombre:'UNITS 4 & 5 - Discovering Sustainable Communities Through Science', tipo:AREA, semanas:11, area:'Science'},
          {periodo:5, nombre:'UNITS 4 & 5 - Discovering Sustainable Communities Through Science', tipo:AREA, semanas:11, area:'Science'}],
  unidades:[{n:5, titulo:L('Unit 5 in the portal','Unidad 5 del portal')}],
  revisar:[
    L('Confirmed in Toddle: it is entered as ONE single eleven-week unit, "UNITS 4 & 5 - '+
      'Discovering Sustainable Communities Through Science". It is the only project in the school '+
      'that already crosses two periods, and that is why it is the model for the rest.',
      'Confirmado en Toddle: está dado de alta como UNA sola unidad de once semanas, «UNITS 4 & 5 '+
      '- Discovering Sustainable Communities Through Science». Es el único proyecto del colegio '+
      'que ya cruza dos periodos, y por eso es el modelo del resto.'),
    L('This arc crosses the term boundary: P4 closes the second term and P5 opens the third. The '+
      'second-term marks go with the Research Proposal, not with the Science Fair.',
      'Este arco cruza el corte de trimestre: P4 cierra el 2.º y P5 abre el 3.º. Las notas del 2.º '+
      'trimestre se ponen con el Research Proposal, no con el Science Fair.'),
    L('The week 11 Science Fair has to be in the school calendar; today the calendar only says '+
      '"Shark tank? STEAM DAY?" with a question mark.',
      'El Science Fair de la semana 11 tiene que estar en el calendario del colegio; hoy el '+
      'calendario solo marca «Shark tank? STEAM DAY?» con interrogante.')]
},

};
window.PROJECT_ARCS_SUELTOS = [
  {grade:'g5', periodos:[3],
   titulo:L('Peruvian History  ·  in Toddle: Project 3 - Peru Heritage Through Food',
            'Peruvian History  ·  en Toddle: Project 3 - Peru Heritage Through Food'),
   motivo:L('Grade 5 gives P3 over to the history of Peru (consumer rights, advertising, centuries '+
     'and epochs, the Viceroyalty, Independence) while Science is on food chains and '+
     'photosynthesis. There is no crossing that holds for eleven weeks, and the grade arc starts '+
     'in P4 with the Cajamarca trip, already written by the Grade 5 team.',
     '5.o dedica P3 a la historia del Peru (derechos del consumidor, publicidad, siglos y epocas, '+
     'Virreinato, Independencia) mientras Science va por cadenas troficas y fotosintesis. No hay '+
     'un cruce que aguante once semanas, y el arco del grado empieza en P4 con el viaje a '+
     'Cajamarca, que ya esta escrito por el equipo de 5.o.')},
  {grade:'g5', periodos:[6], titulo:L('Universe and savings','Universo y ahorro'),
   motivo:L('P6 of Grade 5 puts the origin of the universe and the formation of stars in Science '+
     'together with emotions, citizenship and a savings plan in Social Studies. They are two '+
     'legitimate units with nothing to do with each other; forcing them into one project would be '+
     'inventing it.',
     'P6 de 5.o junta origen del universo y formacion de estrellas en Science con emociones, '+
     'ciudadania y plan de ahorro en Social. Son dos unidades legitimas y sin relacion; forzarlas '+
     'en un proyecto seria inventarla.')},
  {grade:'g1', periodos:[5,6],
   titulo:L('P5 and P6 of Grade 1, not written yet','P5 y P6 de 1.o, sin escribir todavia'),
   motivo:L('The P5 and P6 folders in "Grade 1 / 8. Planning" are empty: there is no Project 5 or '+
     'Project 6. And in the Grade 1 "Annual Plan" sheet those two periods only carry English '+
     '(present simple, can, verb to be, pronouns, sentence building). That is enough to plan the '+
     'English lesson, but not an eleven-week interdisciplinary project. When the Grade 1 team '+
     'writes the two Project.docx files, they will be transcribed like the first four.',
     'Las carpetas P5 y P6 de "Grade 1 / 8. Planning" estan vacias: no hay Project 5 ni Project 6. '+
     'Y en la hoja "Annual Plan" de 1.o esos dos periodos solo cargan English (present simple, '+
     'can, verb to be, pronombres, formacion de frases). Con eso se puede planificar la clase de '+
     'ingles, pero no un proyecto interdisciplinario de once semanas. Cuando el equipo de 1.o '+
     'escriba los dos Project.docx, se transcriben igual que los cuatro primeros.')}
];
})();
