/* Arcos de proyecto de primaria — NIS 2026.
 *
 * Un "arco" es un proyecto interdisciplinario de 11 o 12 semanas que ocupa
 * DOS periodos seguidos del calendario del colegio. No es una capa nueva de
 * planificacion: el colegio ya llama "Project" a cada periodo (el Primary
 * Calendar dice "Upload Project 4 Week 2&3", "Present Project 5 Unit plan"),
 * y 5.o grado ya escribio su propio proyecto de once semanas a caballo entre
 * P4 y P5. Esto declara el arco que ya existe.
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
 *   - Los campos de planificacion (situacion significativa, pregunta esencial,
 *     competencias, evidencias, evaluacion, diferenciacion) siguen la
 *     plantilla oficial del colegio: "Project Planner Template.docx" y el
 *     master plan de 5.o "Projects 4 & 5.docx".
 *
 * LO QUE ESTE ARCHIVO SI ANADE, y hay que revisar con coordinacion: el titulo
 * del proyecto, la pregunta esencial, la narrativa para el alumno, el producto
 * final y el reparto de las semanas en fases. El contenido de las areas no se
 * toca: se toma del plan anual tal cual.
 *
 * Forma de un arco:
 *   grade, trimestre, periodos[], semanas, inicio, fin
 *   titulo, subtitulo, cover
 *   areaEje, areasArticuladas[]
 *   situacion         situacion significativa (lenguaje docente)
 *   preguntaEsencial
 *   narrativa         la version que escucha el alumno
 *   orientadoras      {area: pregunta}
 *   competencias      [{area, nombre, capacidades[]}] — CNEB, texto oficial
 *   producto          {titulo, audiencia, descripcion, incluye[]}
 *   fases             [{n, periodo, semana, fase, foco, hace, evidencia}]
 *   evaluacion        [{criterio, descriptor}]
 *   diferenciacion    []
 *   sad               conexion con el Student Achievement Day
 *   unidades          [{n, titulo}] unidades del portal que ya ejecutan el arco
 *   revisar           lo que falta o esta en duda, en claro
 */
window.PROJECT_ARCS = {

/* ==================================================================== 1.o
   1.o es distinto a los demas: su equipo YA tiene escritos los proyectos
   leccion a leccion (Project 1..4.docx, en Early Years / Grade 1 / 8. Planning),
   con objetivo, competencia CNEB, recursos y las tres partes de la sesion. Lo
   que sigue NO propone semanas: las transcribe. Lo unico del portal es el
   titulo del arco, la pregunta esencial y la narrativa que lo une.

   Y su plan anual no esta en el Excel de primaria: vive dentro de
   "EY_Assessment Criteria_G1.xlsx", hoja "Annual Plan", con Comunicacion,
   Math, English y (solo en P1) Music y PE. Science y Social NO estan en esa
   hoja para 1.o — estan en los propios Project.docx. Por eso el mapa de
   semanas de 1.o ensena menos areas que el de 2.o a 5.o: es el plan, no un
   fallo de la pagina. */

'g1.t1': {
  grade:'g1', label:'Grade 1', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🐞', from:'#5c3a10', to:'#c9a227'},
  titulo:'This place is not only mine',
  subtitulo:'Quien soy, donde vivo, y quien mas vive aqui',
  autoria:'Las once semanas estan transcritas de "Project 1_.docx" y "Project 2.docx", escritos '+
    'por el equipo de 1.o con objetivo, competencia CNEB, recursos y las tres partes de cada '+
    'sesion. El portal solo pone el titulo del arco, la pregunta esencial y la narrativa que une '+
    'los dos periodos.',
  notaPlan:'El plan anual de 1.o solo carga Comunicacion, Math, English y (en P1) Music y PE. '+
    'Science y Social viven en los propios Project.docx, no en esa hoja.',
  areaEje:'social', areasArticuladas:['science','comunicacion','math','english'],
  situacion:'P1 y P2 hacen la misma pregunta con dos sujetos distintos. En P1 el nino se mira a '+
    'si mismo: su cara, sus huellas, su DNI, como ha cambiado, de donde viene su apellido, como '+
    'ha cambiado su distrito y su colegio, quien vive a su alrededor y que necesita ese sitio — y '+
    'termina en un paseo de exploracion, un video para pedir un cambio y una carta de '+
    'agradecimiento. En P2 la misma mirada se posa en otro habitante del colegio: los insectos. '+
    'Se les observa, se les clasifica, se descubre para que sirven y que les hacemos nosotros, se '+
    'acuerda un protocolo de aula y se construye un prototipo con material reciclado que se '+
    'explica en video. Es un solo aprendizaje: mirar de cerca lo que ya estaba ahi.',
  preguntaEsencial:'Who lives in this place with me, and how do we look after it?',
  narrativa:'Nobody in the world has your fingerprints. Nobody has your face. This term you are '+
    'going to find out what makes you you, where you come from, and who lives around you. And '+
    'then you are going to look very closely at somebody who has been living in this school the '+
    'whole time and nobody ever asked about: the insects. At the end you make a video for the '+
    'whole school about who lives here and what they need.',
  orientadoras:{
    social:'Quien soy, de donde vengo y quien vive a mi alrededor?',
    science:'Como es por dentro y por fuera un ser vivo, y que necesita para vivir?',
    comunicacion:'Como cuento a otro lo que descubri?',
    math:'Como cuento, comparo y ordeno lo que voy encontrando?',
    english:'Can I name what I see and say how it is?'
  },
  competencias:[
    {area:'social', nombre:'Construye su identidad',
     capacidades:['Se valora a si mismo','Autorregula sus emociones','Reflexiona y argumenta eticamente']},
    {area:'social', nombre:'Construye interpretaciones historicas',
     capacidades:['Comprende el tiempo historico — ordena hechos en el tiempo',
                  'Elabora explicaciones sobre procesos historicos — describe cambios al comparar el presente y el pasado']},
    {area:'social', nombre:'Convive y participa democraticamente en la busqueda del bien comun',
     capacidades:['Construye normas y asume acuerdos y leyes',
                  'Participa en acciones que promueven el bienestar comun']},
    {area:'social', nombre:'Gestiona responsablemente el espacio y el ambiente',
     capacidades:['Maneja fuentes de informacion para comprender el espacio geografico',
                  'Genera acciones para conservar el ambiente local y global — reconoce un problema de su entorno y busca una solucion']},
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones — realiza preguntas basadas en la exploracion a traves de los sentidos',
                  'Genera y registra datos o informacion','Analiza datos e informacion — relaciona datos e informacion',
                  'Evalua y comunica — expresa sus hallazgos y dificultades']},
    {area:'science', nombre:'Disena y construye soluciones tecnologicas para resolver problemas de su entorno',
     capacidades:['Determina una alternativa de solucion tecnologica',
                  'Disena la alternativa — describe como implementar la solucion',
                  'Implementa y valida — realiza ajustes en el proceso de construccion',
                  'Evalua y comunica el funcionamiento y los impactos de su alternativa']}
  ],
  producto:{
    titulo:'Who lives here — the video',
    audiencia:'El colegio entero, que ve el video; y la persona de la comunidad que recibe la '+
      'carta de agradecimiento.',
    descripcion:'Un video de la clase que ensena quien vive en este sitio — las personas y los '+
      'insectos —, que necesita cada uno, y una cosa que los ninos construyeron para ayudar.',
    incluye:['Mi autorretrato y mis huellas','Mi linea de tiempo: como he cambiado',
             'La entrevista a alguien de la comunidad','La carta de agradecimiento',
             'Mi registro de insectos del colegio','El prototipo de material reciclado y su poster',
             'El video final']
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:'Yo', foco:'Nobody else is me',
     hace:'Autorretrato delante del espejo mirando la forma de los ojos y el tono de piel. '+
       'Huellas dactilares con tampon y lupa, y para que sirve un DNI — con el DNI de clase se '+
       'vota el nombre oficial del aula. Que emociones traigo a 1.o. Mural de piezas de puzle.',
     evidencia:'Self-portrait + classroom mural'},
    {n:2, periodo:1, semana:2, fase:'Yo', foco:'I have changed, and my body works',
     hace:'Fotos de antes y de ahora, linea de tiempo y medir cuanto he crecido. Que puedo hacer '+
       'ahora que antes no podia. Experimento de por donde viaja la comida. Experimento de para '+
       'que sirven los pulmones.', evidencia:'Growth timeline'},
    {n:3, periodo:1, semana:3, fase:'De donde vengo', foco:'Where I come from',
     hace:'Tradiciones y juegos de la familia, de antes y de ahora. De donde viene mi apellido. '+
       'Donde vivo, con Google Maps y los sitios que reconozco del barrio. Como ha cambiado mi '+
       'colegio y que podemos hacer para cuidarlo.', evidencia:'Family and district card'},
    {n:4, periodo:1, semana:4, fase:'Quien esta a mi lado', foco:'Who is around me',
     hace:'La diferencia entre un derecho y una responsabilidad. El arbol del circulo de '+
       'confianza de mi familia y que hace cada uno. Entrevista sencilla a alguien de la '+
       'comunidad del colegio.', evidencia:'Circle of trust + interview'},
    {n:5, periodo:1, semana:5, fase:'Que necesita este sitio', foco:'What this place needs',
     hace:'Paseo de exploracion por el colegio: que hay aqui que haya que proteger. De los '+
       'problemas que vimos sale un video para pedir que cambie algo. Que necesita el aula para '+
       'estar en orden. Carta de agradecimiento a alguien de la comunidad.',
     evidencia:'Awareness video + thank-you letter'},
    {n:6, periodo:1, semana:6, fase:'Que necesita este sitio', foco:'Living together',
     hace:'Reto de cooperacion en equipo (torre de papel, puzle o cuento entre todos). La cesta '+
       'de las palabras magicas. Autorretrato en 3D como cierre. Salida a la playa con yoga y '+
       'atencion plena.', evidencia:'3D self-portrait'},
    {n:7, periodo:2, semana:1, fase:'Alguien mas vive aqui', foco:'Somebody else lives here',
     hace:'Arranca P2. Se observan los insectos del aula y del colegio: cuando aparecen, donde y '+
       'cada cuanto. Paseo de observacion. Que creemos ya y que nos preguntamos. Mitos y hechos: '+
       'que es una idea y que es una prueba.', evidencia:'Insect record'},
    {n:8, periodo:2, semana:2, fase:'Alguien mas vive aqui', foco:'How they are made',
     hace:'Partes del cuerpo, como se mueven y de que tamano son, y para que sirve cada parte. '+
       'Que comen y con que boca. Donde viven y como se agrupan.', evidencia:'Labelled diagram'},
    {n:9, periodo:2, semana:3, fase:'Que hacen y que les hacemos', foco:'What they do for us',
     hace:'Para que sirven: polinizacion, descomposicion, cadenas alimentarias — y que pasaria si '+
       'desaparecieran. Como les afecta lo que hacemos con la comida, la limpieza y los '+
       'materiales. Estrategias para cuidarlos, en carteles y dibujos.',
     evidencia:'Care poster'},
    {n:10, periodo:2, semana:4, fase:'Construir', foco:'What do we do when one appears',
     hace:'Situaciones reales de aula con un insecto y que respuestas caben. Se acuerda un '+
       'protocolo de clase. Se elige el problema y cada mesa negocia y disena UN prototipo.',
     evidencia:'Class protocol + team blueprint'},
    {n:11, periodo:2, semana:5, fase:'Construir', foco:'Building the solution',
     hace:'Se construye el prototipo con material reciclado siguiendo el plano del equipo. Se '+
       'mejora con lo que dicen los demas y se hace el poster de como funciona. Presentacion oral '+
       'y grabacion del video para la comunidad.', evidencia:'Prototype + video'}
  ],
  evaluacion:[
    {criterio:'Me miro y me cuento',
     descriptor:'Dice que le hace unico y como ha cambiado, y lo apoya en algo que observo o midio.'},
    {criterio:'Observo de verdad',
     descriptor:'Registra lo que ve cuando lo ve, y distingue lo que observo de lo que creia.'},
    {criterio:'Cuido lo que esta a mi alrededor',
     descriptor:'Reconoce un problema del colegio y propone algo que su clase puede hacer.'},
    {criterio:'Construyo y lo explico',
     descriptor:'Su prototipo responde al problema que eligio y sabe decir como funciona.'}
  ],
  diferenciacion:[
    'Todo lo del proyecto se puede entregar dibujado y etiquetado, hablado o escrito.',
    'La entrevista y la carta se pueden dictar; lo que se evalua es a quien va y que pide.',
    'En el video, quien no quiera salir puede grabar la voz o sostener el cartel.'
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:'El nino ensena su autorretrato del principio y el de 3D del final, y cuenta que '+
      'descubrio en medio. Y ensena su registro de insectos: lo que creia y lo que vio.'},
  unidades:[],
  revisar:['La salida a la playa de la semana 6 y el paseo de exploracion de la 5 necesitan '+
           'autorizacion de familias con antelacion.',
           'El video de P2 se graba en la semana 5: si el material reciclado no esta pedido en la '+
           'semana 3, no hay prototipo que grabar.']
},

'g1.t2': {
  grade:'g1', label:'Grade 1', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🏔️', from:'#6b3410', to:'#d98b3a'},
  titulo:'Coast, mountains and jungle',
  subtitulo:'Lo que la tierra decide: lo que tiembla, lo que crece y lo que construimos',
  autoria:'Las doce semanas estan transcritas de "Project 3.docx" y "Project 4.docx", escritos '+
    'por el equipo de 1.o. El portal solo pone el titulo del arco, la pregunta esencial y la '+
    'narrativa que une los dos periodos.',
  notaPlan:'El plan anual de 1.o solo carga Comunicacion, Math e English en P3, y solo English '+
    'en P4. El contenido de Science y Social de este arco esta en los propios Project.docx.',
  areaEje:'science', areasArticuladas:['social','math','comunicacion','english'],
  situacion:'Los dos periodos comparten un mismo eje que el propio plan escribe dos veces: las '+
    'tres regiones del Peru. En P3, la costa, la sierra y la selva explican por que en cada sitio '+
    'ocurre un desastre distinto, y de ahi se pasa a como se construye para aguantarlo — con el '+
    'experimento de las columnas y una ciudad colaborativa levantada por la clase. En P4, esas '+
    'mismas tres regiones explican por que cada fruta y cada verdura crece donde crece, y de ahi '+
    'sale el viaje del alimento hasta el colegio: el frio del transporte, el mercado mayorista, '+
    'la tienda del barrio, la balanza y las monedas. Un mismo aprendizaje: la tierra donde vives '+
    'decide cosas de tu vida.',
  preguntaEsencial:'Our country has three very different lands. What does that change for us?',
  narrativa:'Peru is not one place, it is three: the coast, the mountains and the jungle. In each '+
    'one the ground moves differently, it rains differently, and different things grow. First you '+
    'are going to find out why, and build a city that can stand up to it. Then you are going to '+
    'follow a tomato all the way from the field to your lunchbox — and find out how many people '+
    'it takes.',
  orientadoras:{
    science:'Por que en cada region pasa una cosa distinta? Que necesita una planta y que hace un desastre?',
    social:'Quien nos protege y quien nos alimenta, y como llega hasta aqui?',
    math:'Como ordeno en el tiempo, como me ubico y como pago y peso?',
    comunicacion:'Como cuento lo que investigue para que otro lo entienda?',
    english:'Can I say where things are and what they are like?'
  },
  competencias:[
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos — explica la relacion entre la Tierra, sus componentes y movimientos con los seres que la habitan',
                  'Comprende y usa conocimientos — explica la relacion entre la estructura de los seres vivos con sus funciones y su desarrollo',
                  'Evalua las implicancias del saber y del quehacer cientifico y tecnologico']},
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones — sugiere respuestas basadas en la exploracion',
                  'Disena estrategias — selecciona opciones organizadas para realizar un experimento',
                  'Genera y registra datos o informacion','Evalua y comunica — expresa sus hallazgos y dificultades']},
    {area:'science', nombre:'Disena y construye soluciones tecnologicas para resolver problemas de su entorno',
     capacidades:['Determina una alternativa de solucion tecnologica',
                  'Disena la alternativa — describe como implementar la solucion',
                  'Implementa y valida alternativas de solucion tecnologica']},
    {area:'social', nombre:'Gestiona responsablemente el espacio y el ambiente',
     capacidades:['Maneja fuentes de informacion — utiliza puntos de referencia para ubicarse y representar su espacio',
                  'Comprende las relaciones entre los elementos naturales y sociales',
                  'Genera acciones para conservar el ambiente local y global']},
    {area:'social', nombre:'Gestiona responsablemente los recursos economicos',
     capacidades:['Comprende las relaciones entre los elementos del sistema economico y financiero — reconoce por que las personas e instituciones realizan actividades economicas',
                  'Toma decisiones economicas y financieras']},
    {area:'social', nombre:'Construye interpretaciones historicas',
     capacidades:['Comprende el tiempo historico — ordena hechos en el tiempo',
                  'Interpreta criticamente fuentes diversas']}
  ],
  producto:{
    titulo:'The city that stands, and the Food Scientists Fair',
    audiencia:'En P3, la clase y el colegio, que recorren la ciudad colaborativa. En P4, las '+
      'familias, que visitan las estaciones de la feria.',
    descripcion:'Una ciudad construida entre todos con estructuras que aguantan y con sus zonas '+
      'seguras senalizadas; y una feria en la que cada nino atiende su estacion sobre el viaje '+
      'del alimento y prepara una lonchera equilibrada.',
    incluye:['Mi linea de tiempo de desastres en el Peru','El plan de seguridad de mi aula',
             'El experimento de las columnas','Mi estructura de la ciudad colaborativa',
             'Mi registro de germinacion','El mapa de que crece en cada region',
             'La guia de higiene en diptico','Mi estacion de la feria y la lonchera equilibrada']
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:'Lo que tiembla', foco:'A phenomenon or a disaster?',
     hace:'La diferencia entre un fenomeno natural y un desastre, con ejemplos reales del Peru. '+
       'Que desastres han ocurrido aqui y como afectaron a la gente. Linea de tiempo colectiva '+
       'con pasado y presente. Esta semana cae el Student Achievement Day.',
     evidencia:'Class timeline'},
    {n:2, periodo:3, semana:2, fase:'Lo que tiembla', foco:'Three very different lands',
     hace:'Sitios del Peru que hemos visitado. El clima y el paisaje de la costa, la sierra y la '+
       'selva. Como la geografia decide que desastre ocurre en cada region. Investigacion en '+
       'libros, textos informativos y carteles.', evidencia:'Region file'},
    {n:3, periodo:3, semana:3, fase:'Lo que tiembla', foco:'Before, during and after',
     hace:'Que hacer antes, durante y despues. Que materiales y recursos hacen falta. Que hacen '+
       'las brigadas del colegio y la gente de la comunidad. Se organizan y comunican las '+
       'recomendaciones.', evidencia:'Safety recommendations'},
    {n:4, periodo:3, semana:4, fase:'Lo que construimos', foco:'Building so it stands',
     hace:'Que infraestructuras hay en el Peru y como el clima y la geografia deciden su diseno. '+
       'Zonas seguras, rutas de evacuacion y senales del colegio. Experimento: para que sirven '+
       'las columnas — se predice, se observa y se compara. Se disena y construye una estructura '+
       'para la ciudad colaborativa.', evidencia:'The collaborative city'},
    {n:5, periodo:3, semana:5, fase:'Lo que construimos', foco:'What we can prevent',
     hace:'Semana con dos feriados. Causas y prevencion de huaicos e incendios forestales, '+
       'separando lo natural de lo que hacemos nosotros. Origen, causas y prevencion de sismos, '+
       'tsunamis e inundaciones, con simulaciones sencillas.', evidencia:'Cause and prevention cards'},
    {n:6, periodo:3, semana:6, fase:'Lo que construimos', foco:'Show what you learned',
     hace:'Cierre de P3: se organiza la evidencia del proyecto y se elige la que mejor muestra lo '+
       'aprendido. Se responde a una situacion de emergencia real. Reflexion sobre como han '+
       'cambiado las propias ideas.', evidencia:'Portfolio + drill'},
    {n:7, periodo:4, semana:1, fase:'Lo que crece', foco:'Where food starts',
     hace:'Arranca P4. De donde vienen las plantas: germinacion y que necesita una planta (sol, '+
       'agua, tierra y aire). Partes de la planta sobre alimentos reales y cuales se comen. '+
       'Ciclo de vida de una fruta y de una verdura: la fruta lleva semillas dentro.',
     evidencia:'Germination log'},
    {n:8, periodo:4, semana:2, fase:'Lo que crece', foco:'Who grows it, and where',
     hace:'Que hace un agricultor y con que herramientas. Donde crece cada cosa: en el arbol, en '+
       'la mata o bajo tierra. Como se sabe que ya esta para cosechar. Y otra vez las tres '+
       'regiones: por que cada fruta crece donde crece.', evidencia:'Region-and-crop map'},
    {n:9, periodo:4, semana:3, fase:'El viaje', foco:'The journey to my school',
     hace:'Del campo al colegio: la cadena de frio y el embalaje para que no se eche a perder. El '+
       'mercado mayorista, donde llega lo de la costa, la sierra y la selva. El tendero del '+
       'barrio. Feria de compraventa con monedas y balanza.', evidencia:'Market role-play'},
    {n:10, periodo:4, semana:4, fase:'El viaje', foco:'Before I eat it',
     hace:'Observar con los sentidos: color, forma, textura, olor. Por que hay que lavar y '+
       'desinfectar, y como se hace en casa. Guia visual en diptico.',
     evidencia:'Hygiene diptych'},
    {n:11, periodo:4, semana:5, fase:'Lo que me da', foco:'What it does inside me',
     hace:'Clasificar por origen: animal, vegetal o mineral. Para que sirven las vitaminas, con '+
       'el juego de los superpoderes. Alimentos que dan energia y alimentos que protegen: equipo '+
       'Energia contra equipo Escudo. Por que el cuerpo necesita agua.',
     evidencia:'Energy / shield sort'},
    {n:12, periodo:4, semana:6, fase:'Lo que me da', foco:'Food Scientists Fair',
     hace:'Visita al mercado, sabiendo ya que mirar y como participar en una compra. Prototipos '+
       'de papel de cosas que mejorarian alguna etapa del viaje del alimento. Se prepara la '+
       'estacion y se ensaya. Feria: cada nino explica lo suyo y arma una lonchera equilibrada.',
     evidencia:'Fair + balanced lunchbox'}
  ],
  evaluacion:[
    {criterio:'Relaciono el sitio con lo que pasa',
     descriptor:'Dice que ocurre en la costa, la sierra o la selva y por que ahi y no en otra parte.'},
    {criterio:'Pruebo antes de afirmar',
     descriptor:'Predice, observa y compara — y cuenta lo que salio aunque no fuera lo que esperaba.'},
    {criterio:'Construyo algo que se sostiene',
     descriptor:'Su estructura se mantiene de pie y sabe decir que le puso para conseguirlo.'},
    {criterio:'Explico un viaje completo',
     descriptor:'Cuenta el camino del alimento desde el campo hasta su lonchera nombrando a quien interviene.'}
  ],
  diferenciacion:[
    'La linea de tiempo y el mapa admiten dibujo con etiquetas, recorte o texto.',
    'En la ciudad colaborativa cada equipo elige la dificultad de su estructura.',
    'La estacion de la feria se puede atender en pareja.'
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:'El nino ensena su estructura y su registro de germinacion, y explica una cosa que '+
      'creia al principio y que resulto no ser asi.'},
  unidades:[],
  revisar:['La visita al mercado de la semana 12 y la ciudad colaborativa de la 4 necesitan '+
           'materiales pedidos con antelacion y autorizacion de familias.',
           'Project 3 marca dos lecciones como "Feriado" en su semana 5: son el 29 y el 30 de '+
           'junio (San Pedro y San Pablo, y Dia del Maestro). Si el calendario cambia, esa semana '+
           'recupera dos sesiones.']
},

/* ==================================================================== 2.o */

'g2.t1': {
  grade:'g2', label:'Grade 2', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🏡', from:'#1d4e6e', to:'#4aa3c7'},
  titulo:'The place where I live',
  subtitulo:'Como era, como esta y que puedo hacer yo',
  areaEje:'social', areasArticuladas:['science','math','comunicacion','english'],
  situacion:'El plan anual de 2.o abre el ano con dos preguntas que en realidad son la misma. '+
    'En P1, Social pregunta quien soy y como es el lugar donde vivo, y termina en "acciones que '+
    'cuidan y acciones que danan el espacio"; Science entra en paralelo con los cuatro tipos de '+
    'contaminacion y las practicas de reducir, reutilizar y reciclar. En P2, Social gira hacia '+
    '"My Personal Story": lo que ha cambiado en mi vida, la linea de tiempo, las fotos y los '+
    'objetos antiguos, y las entrevistas a abuelos y vecinos. Un nino de 2.o puede sostener una '+
    'sola idea durante once semanas si esa idea es un lugar concreto: su colegio y su barrio.',
  preguntaEsencial:'How was my place before, how is it now, and what can I do about it?',
  narrativa:'This term you are going to look at your school and your street the way a detective '+
    'looks at a room. First you find out what harms it and what takes care of it. Then you find '+
    'out what it was like before you were born, by asking the people who were already here. And '+
    'at the end you write a letter to somebody who can change one thing, and you show them the '+
    'numbers you counted.',
  orientadoras:{
    social:'Que acciones cuidan y que acciones danan el lugar donde estoy, y como era antes?',
    science:'Que tipos de contaminacion hay y que puedo reducir, reutilizar o reciclar?',
    math:'Como cuento lo que veo y como lo muestro para que otro lo entienda?',
    comunicacion:'Como se escribe una carta que alguien quiera responder?',
    english:'Can I describe my place and say what people do there?'
  },
  competencias:[
    {area:'social', nombre:'Gestiona responsablemente el espacio y el ambiente',
     capacidades:['Comprende las relaciones entre los elementos naturales y sociales',
                  'Genera acciones para conservar el ambiente local y global']},
    {area:'social', nombre:'Construye interpretaciones historicas',
     capacidades:['Interpreta criticamente fuentes diversas',
                  'Comprende el tiempo historico']},
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones para hacer indagacion',
                  'Genera y registra datos o informacion',
                  'Evalua y comunica el proceso y los resultados de su indagacion']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas',
                  'Comunica su comprension de los conceptos estadisticos']},
    {area:'comunicacion', nombre:'Escribe diversos tipos de textos en su lengua materna',
     capacidades:['Adecua el texto a la situacion comunicativa',
                  'Organiza y desarrolla las ideas de forma coherente y cohesionada']}
  ],
  producto:{
    titulo:'A letter and a count',
    audiencia:'La persona que puede cambiar esa cosa: el tutor, la directora, el senor que '+
      'limpia el patio, la familia. La carta se entrega de verdad.',
    descripcion:'Cada nino elige UNA cosa del colegio o de su calle que se puede mejorar, la '+
      'cuenta durante una semana, y escribe una carta pidiendo el cambio con el numero delante.',
    incluye:['La cosa que elegi y por que','Mi tabla de conteo de una semana',
             'Mi grafico de barras o mi pictograma','La carta, con sus partes',
             'Una foto de antes y una de ahora, o el dibujo de como me lo contaron']
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:'Mirar', foco:'Where I am',
     hace:'Recorrido por el colegio con una tarjeta de observacion. Se marca lo que gusta y lo '+
       'que no. En Social entra "About me" y las diferencias entre companeros; en Science, la '+
       'pregunta de investigacion y la prediccion.',
     evidencia:'Observation card'},
    {n:2, periodo:1, semana:2, fase:'Mirar', foco:'What harms the air and the water',
     hace:'Los cuatro tipos de contaminacion, dos por semana, tal como los reparte el plan. Se '+
       'busca cada uno en el propio colegio antes de mirarlo en una lamina.',
     evidencia:'Pollution hunt'},
    {n:3, periodo:1, semana:3, fase:'Mirar', foco:'Reduce, reuse, recycle',
     hace:'Que puedo dejar de usar, que puedo volver a usar y que va al reciclaje. Se conecta '+
       'con las reglas de convivencia que Social trabaja esta misma semana.',
     evidencia:'The three-bin sort'},
    {n:4, periodo:1, semana:4, fase:'Contar', foco:'Choosing my one thing',
     hace:'Cada nino elige la cosa que va a contar. Tiene que ser algo que se pueda ver y '+
       'contar: vasos, luces encendidas, papeles, grifos abiertos.',
     evidencia:'My question'},
    {n:5, periodo:1, semana:5, fase:'Contar', foco:'Counting for a week',
     hace:'Tally chart, que es exactamente lo que Math esta dando estas dos semanas. Se cuenta '+
       'todos los dias a la misma hora.',
     evidencia:'Tally chart'},
    {n:6, periodo:1, semana:6, fase:'Contar', foco:'Showing the number',
     hace:'El mismo dato en grafico de barras y en pictograma con escala hasta 10. Cual se '+
       'entiende mejor y por que.',
     evidencia:'Bar graph + pictograph'},
    {n:7, periodo:2, semana:1, fase:'Preguntar', foco:'Before and now',
     hace:'Arranca P2 y con el "My Personal Story". Que ha cambiado en mi vida. Se trae de casa '+
       'una foto antigua y un objeto antiguo.',
     evidencia:'Before / now pair'},
    {n:8, periodo:2, semana:2, fase:'Preguntar', foco:'The time line',
     hace:'Linea de tiempo personal y del colegio. Math entra con el calendario, la hora y las '+
       'relaciones entre dia, semana, mes y ano.',
     evidencia:'Time line'},
    {n:9, periodo:2, semana:3, fase:'Preguntar', foco:'Asking the people who were here',
     hace:'Entrevista a un abuelo, un vecino o alguien del colegio que lleve muchos anos. Tres '+
       'preguntas preparadas antes. Como era esto y que se ha perdido.',
     evidencia:'Interview notes'},
    {n:10, periodo:2, semana:4, fase:'Escribir', foco:'The parts of a letter',
     hace:'Comunicacion da las partes de la carta y el borrador esta misma semana. La carta del '+
       'proyecto ES el borrador de Comunicacion, no un trabajo aparte.',
     evidencia:'Letter draft'},
    {n:11, periodo:2, semana:5, fase:'Entregar', foco:'Delivering it',
     hace:'Carta final con el grafico pegado. Se entrega a la persona real y se lee en voz alta '+
       'a la clase. En ingles, la version corta: "In my school there are ... every day."',
     evidencia:'Letter delivered + reading'}
  ],
  evaluacion:[
    {criterio:'Cuido el lugar donde estoy',
     descriptor:'Nombra acciones que cuidan y acciones que danan, y explica cual eligio y por que.'},
    {criterio:'Cuento y muestro',
     descriptor:'Registra durante una semana sin saltarse dias y representa el dato en un grafico que se entiende.'},
    {criterio:'Escribo una carta',
     descriptor:'La carta tiene sus partes, se dirige a alguien concreto y pide una cosa clara.'},
    {criterio:'Pregunto a otros',
     descriptor:'Prepara sus preguntas antes, escucha la respuesta y la cuenta despues con sus palabras.'}
  ],
  diferenciacion:[
    'Contar se puede hacer con marcas, con pegatinas o con fotos del movil de la familia.',
    'La carta se puede dictar y despues copiar; lo que se evalua es que tenga sus partes.',
    'La entrevista puede ser en castellano. El proyecto es de todas las areas, no solo de ingles.'
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:'El nino ensena su tabla, su grafico y su carta, y cuenta en una frase que le '+
      'respondieron. La pregunta que se le hace delante de la familia es la misma que se le hizo '+
      'todo el trimestre: "que evidencia tienes?"'},
  unidades:[],
  revisar:['El destinatario de la carta lo decide el tutor: tiene que ser alguien que de verdad '+
           'pueda responder, o el producto pierde su sentido.',
           'Art, Music y Drama no tienen contenido cargado en el plan anual de 2.o; si lo tienen '+
           'en su propia programacion, hay que engancharlo aqui.']
},

'g2.t2': {
  grade:'g2', label:'Grade 2', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🦋', from:'#245c34', to:'#68b46c'},
  titulo:'Who lives in our school',
  subtitulo:'Una guia de campo del patio, y de la gente que lo cuida',
  areaEje:'science', areasArticuladas:['social','math','comunicacion','english'],
  situacion:'P3 y P4 dan a 2.o el bloque de seres vivos completo: reino animal (vertebrados e '+
    'invertebrados, partes externas y cubiertas del cuerpo), reino vegetal (con flor y sin flor, '+
    'partes de la planta), ciclos de vida y quien come a quien. En paralelo, Social trabaja los '+
    'oficios de mi comunidad y para que sirven, las instituciones y la relacion trabajo-necesidad-'+
    'calidad de vida, y las posiciones y puntos de referencia. Math pone las unidades de longitud, '+
    'masa y capacidad. Eso es, literalmente, una guia de campo: describir, medir, situar y '+
    'preguntar a quien lo cuida.',
  preguntaEsencial:'Who lives in our school, and who looks after them?',
  narrativa:'Our school is full of living things and most of them have never been written down. '+
    'You are going to be the first ones to do it. You will find them, look at them properly, '+
    'measure them, say exactly where they are, and draw them. And you will interview the people '+
    'whose job is to keep them alive. At the end we will have a book that did not exist, and the '+
    'families will walk through the school with it in their hands.',
  orientadoras:{
    science:'Como agrupo a los seres vivos y como cambia cada uno a lo largo de su vida?',
    social:'Que oficios hacen falta para que este lugar funcione, y que necesidad cubre cada uno?',
    math:'Cuanto mide, cuanto pesa y cuanto cabe? Y como digo donde esta?',
    comunicacion:'Como se escribe un texto que explica, y como se expone delante de otros?',
    english:'Can I describe a living thing and say where it is?'
  },
  competencias:[
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre los seres vivos, materia y energia',
                  'Evalua las implicancias del saber y del quehacer cientifico y tecnologico']},
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Disena estrategias para hacer indagacion','Genera y registra datos o informacion',
                  'Analiza datos e informacion']},
    {area:'social', nombre:'Gestiona responsablemente los recursos economicos',
     capacidades:['Comprende las relaciones entre los elementos del sistema economico y financiero']},
    {area:'math', nombre:'Resuelve problemas de forma, movimiento y localizacion',
     capacidades:['Modela objetos con formas geometricas y sus transformaciones',
                  'Usa estrategias y procedimientos para medir y orientarse en el espacio']},
    {area:'comunicacion', nombre:'Se comunica oralmente en su lengua materna',
     capacidades:['Adecua, organiza y desarrolla las ideas de forma coherente',
                  'Interactua estrategicamente con distintos interlocutores']}
  ],
  producto:{
    titulo:'The Nordic Field Guide',
    audiencia:'Las familias, en una visita guiada por el patio; y la clase de 1.o, que se queda '+
      'con el ejemplar el ano que viene.',
    descripcion:'Una pagina de guia por nino: el ser vivo, su grupo, sus partes, su medida, un '+
      'mapa de donde esta, y quien lo cuida. Encuadernado en una sola guia de la clase.',
    incluye:['Mi ficha de campo con dibujo del natural','Mi ser vivo clasificado y sus partes',
             'Su medida y su masa, con la unidad correcta','El mapa: donde esta, con referencias',
             'La entrevista al oficio que lo cuida','La tapa: que material elegi y por que']
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:'Clasificar', foco:'Vertebrates and invertebrates',
     hace:'Salida al patio con lupa. Se recoge lo que hay y se agrupa antes de que nadie diga '+
       'como se agrupa. Despues se compara con la clasificacion del libro.',
     evidencia:'First sort'},
    {n:2, periodo:3, semana:2, fase:'Clasificar', foco:'Body parts and body coverings',
     hace:'Partes externas del cuerpo de los animales y para que sirve cada cubierta. Cada nino '+
       'elige ya su ser vivo y empieza su ficha.',
     evidencia:'Field card, part 1'},
    {n:3, periodo:3, semana:3, fase:'Clasificar', foco:'The people who keep it alive',
     hace:'Oficios de mi comunidad y para que sirven. Entrevista al personal del colegio que '+
       'cuida el patio, las plantas o los animales. Preguntas preparadas la clase anterior.',
     evidencia:'Interview'},
    {n:4, periodo:3, semana:4, fase:'Clasificar', foco:'Flowering and non-flowering plants',
     hace:'Reino vegetal. Las plantas del colegio se reparten entre los equipos y se clasifican '+
       'en el sitio, sin arrancarlas.',
     evidencia:'Plant sort'},
    {n:5, periodo:3, semana:5, fase:'Clasificar', foco:'Parts of the plant and what they do',
     hace:'Partes de la planta y su funcion. Se completa la ficha de los que eligieron planta.',
     evidencia:'Field card, part 2'},
    {n:6, periodo:3, semana:6, fase:'Clasificar', foco:'What we found out',
     hace:'Cierre de P3: se ponen todas las fichas en la pared y se busca lo que se repite. '+
       'Que grupo tiene mas ejemplares en nuestro colegio?',
     evidencia:'Class wall'},
    {n:7, periodo:4, semana:1, fase:'Medir', foco:'Life cycles',
     hace:'Arranca P4. Ciclo de vida en animales y plantas: nacer, crecer, madurar, reproducirse '+
       'y morir. En que punto de su ciclo esta el mio?',
     evidencia:'Life cycle strip'},
    {n:8, periodo:4, semana:2, fase:'Medir', foco:'How long and how heavy',
     hace:'Longitud en cm y m. Se mide el ser vivo o su casa. Estimar primero, medir despues, y '+
       'comparar las dos cosas.',
     evidencia:'Measurement log'},
    {n:9, periodo:4, semana:3, fase:'Medir', foco:'Who eats whom',
     hace:'Carnivoro, herbivoro, omnivoro. Se dibuja la cadena corta a la que pertenece el mio.',
     evidencia:'Food chain'},
    {n:10, periodo:4, semana:4, fase:'Situar', foco:'Where exactly it is',
     hace:'Mapa del patio con puntos de referencia: delante, detras, dentro, fuera, cerca, lejos. '+
       'Otro nino tiene que llegar hasta ahi solo con mi mapa. Si no llega, el mapa se corrige.',
     evidencia:'Map that works'},
    {n:11, periodo:4, semana:5, fase:'Situar', foco:'Choosing the cover',
     hace:'Tipos de materiales y sus propiedades: duro, blando, flexible, rigido. Transparente, '+
       'traslucido, opaco. Que material aguanta una guia que van a tocar cien manos?',
     evidencia:'Cover, with the reason'},
    {n:12, periodo:4, semana:6, fase:'Ensenar', foco:'The guided tour',
     hace:'La guia se encuaderna y las familias hacen el recorrido. Cada nino se queda en su '+
       'parada y explica su ser vivo con la guia abierta.',
     evidencia:'Guided tour'}
  ],
  evaluacion:[
    {criterio:'Clasifico y explico',
     descriptor:'Coloca su ser vivo en su grupo, nombra sus partes y dice para que sirve cada una.'},
    {criterio:'Mido bien',
     descriptor:'Elige la unidad correcta, estima antes de medir y anota el resultado con su unidad.'},
    {criterio:'Digo donde esta',
     descriptor:'Su mapa lleva a otro nino hasta el sitio sin ayuda.'},
    {criterio:'Explico a alguien que no estaba',
     descriptor:'Sostiene su parada de la visita, responde una pregunta y no lee la ficha entera.'}
  ],
  diferenciacion:[
    'La ficha se puede completar con dibujo y etiquetas, con foto y etiquetas, o con texto.',
    'La entrevista se hace en pareja: uno pregunta y otro apunta.',
    'La parada de la visita se puede hacer entre dos si hablar solo delante de adultos bloquea.'
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:'El nino trae su pagina de la guia y explica como decidio a que grupo pertenece su '+
      'ser vivo. No se le pide que recite la clasificacion: se le pide que justifique la suya.'},
  unidades:[],
  revisar:['Si el colegio no tiene personal disponible para las entrevistas, sirve una visita '+
           'del jardinero o del personal de limpieza a la clase; lo que no sirve es inventar el oficio.',
           'La salida al patio de la semana 1 necesita lupas: hay que pedirlas en P2, no en junio.']
},

'g2.t3': {
  grade:'g2', label:'Grade 2', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🔦', from:'#7a4a10', to:'#e0a83a'},
  titulo:'Light and movement',
  subtitulo:'El teatro de sombras y las cosas que se mueven',
  areaEje:'science', areasArticuladas:['math','social','english','comunicacion'],
  situacion:'P5 da energia y luz (fuentes de energia, la luz como forma de energia, color, '+
    'sombras e iluminacion) y P6 da movimiento, fuerzas y gravedad (empujar y tirar, el efecto de '+
    'la superficie, la caida de los objetos). Las dos mitades son la misma pregunta hecha dos '+
    'veces: que hace que algo se vea, y que hace que algo se mueva. Social aporta en P5 la '+
    'gestion del ambiente y del riesgo, y la equidad en el reparto de roles.',
  preguntaEsencial:'What makes things visible, and what makes things move?',
  narrativa:'Nursery has never had a shadow theatre, and after that nobody in this school has '+
    'ever built a machine that moves on its own. You are going to do both. First you find out '+
    'what light does when something gets in its way. Then you find out what makes something '+
    'start moving and what makes it stop. And the little ones come to watch, twice.',
  orientadoras:{
    science:'De donde viene la luz y que pasa cuando algo se cruza? Que hace que un cuerpo se mueva?',
    math:'Como registro lo que sale de cada prueba y como lo comparo?',
    social:'Quien hace que en el equipo, y como nos aseguramos de que sea justo?',
    english:'Can I explain my show to somebody younger than me?'
  },
  competencias:[
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones para hacer indagacion',
                  'Disena estrategias para hacer indagacion',
                  'Genera y registra datos o informacion',
                  'Evalua y comunica el proceso y los resultados de su indagacion']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre materia y energia']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas']},
    {area:'social', nombre:'Convive y participa democraticamente en la busqueda del bien comun',
     capacidades:['Interactua con todas las personas','Construye normas y asume acuerdos y leyes']}
  ],
  producto:{
    titulo:'Two shows for Nursery',
    audiencia:'La clase de Nursery. Si no lo entienden, no funciona: esa es la prueba.',
    descripcion:'En P5, un teatro de sombras que ademas explica por que la sombra cambia. En P6, '+
      'un juguete o una maquina que se mueve, y la explicacion de que lo empuja.',
    incluye:['Mi pregunta y mi prediccion','Lo que salio en la prueba, anotado',
             'El teatro de sombras','La cosa que se mueve','Mi explicacion para un nino pequeno']
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:'Luz', foco:'Where light comes from',
     hace:'Fuentes de energia: el sol, el calor, el viento. Pregunta de investigacion y '+
       'prediccion. Se elige de que va el show.', evidencia:'My question + my guess'},
    {n:2, periodo:5, semana:2, fase:'Luz', foco:'Testing the torch',
     hace:'Se cambia UNA cosa y se deja el resto igual. Que pasa con la sombra si muevo la linterna?',
     evidencia:'Fair test'},
    {n:3, periodo:5, semana:3, fase:'Luz', foco:'Colour, shadow and light',
     hace:'El efecto de la luz sobre el cuerpo y el ambiente: color, sombras, iluminacion. Se '+
       'prueba con papeles de colores.', evidencia:'Colour test'},
    {n:4, periodo:5, semana:4, fase:'Luz', foco:'Building the theatre',
     hace:'Construccion del teatro y ensayo. Reparto de roles con la regla de equidad de Social: '+
       'quien narra y quien sostiene la linterna rota.', evidencia:'Rehearsal'},
    {n:5, periodo:5, semana:5, fase:'Luz', foco:'The shadow show',
     hace:'Funcion para Nursery. Despues, cada equipo explica por que la sombra cambiaba de tamano.',
     evidencia:'Show #1'},
    {n:6, periodo:6, semana:1, fase:'Movimiento', foco:'Push and pull',
     hace:'Arranca P6. Produccion de movimiento en los cuerpos: empujar y tirar. Se prueba con '+
       'lo que hay en la clase.', evidencia:'Push / pull sort'},
    {n:7, periodo:6, semana:2, fase:'Movimiento', foco:'Harder or softer',
     hace:'La misma cosa empujada fuerte y flojo. Se mide cuanto llega. Math entra con la suma '+
       'hasta 3 cifras para acumular las tiradas.', evidencia:'Distance log'},
    {n:8, periodo:6, semana:3, fase:'Movimiento', foco:'The surface matters',
     hace:'Efecto de la superficie sobre el movimiento. La misma canica sobre cuatro superficies. '+
       'Se ordena de mas a menos.', evidencia:'Surface ranking'},
    {n:9, periodo:6, semana:4, fase:'Movimiento', foco:'Falling',
     hace:'Gravedad y caida de los objetos. Dos cosas distintas soltadas a la vez. Que crees que '+
       'va a pasar y que paso.', evidencia:'Prediction vs result'},
    {n:10, periodo:6, semana:5, fase:'Movimiento', foco:'Building the moving thing',
     hace:'Construccion del juguete o la maquina. Tiene que moverse sin que nadie lo toque una '+
       'vez arrancado.', evidencia:'The machine'},
    {n:11, periodo:6, semana:6, fase:'Ensenar', foco:'The moving show',
     hace:'Segunda funcion para Nursery. Cada nino explica que empuja su maquina, con las '+
       'palabras que un nino de Nursery entiende.', evidencia:'Show #2'}
  ],
  evaluacion:[
    {criterio:'Pruebo bien',
     descriptor:'Cambia una sola cosa, deja el resto igual, anota lo que ve y repite para comprobar.'},
    {criterio:'Explico lo que pasa',
     descriptor:'Usa las palabras de la unidad y relaciona lo que hizo con lo que salio.'},
    {criterio:'Se lo cuento a alguien mas pequeno',
     descriptor:'Ajusta como lo dice hasta que el nino de Nursery lo entiende, y vuelve a mostrarlo si no.'}
  ],
  diferenciacion:[
    'La anotacion puede ser dibujo, marcas o frase; lo que se pide es que registre antes de opinar.',
    'Quien no quiera hablar delante de Nursery puede manejar la linterna y explicar despues a la clase.'
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:'El nino ensena su registro de la prueba y hace la demostracion en pequeno. Se le '+
      'pregunta que cambiaria si lo repitiera.'},
  unidades:[{n:5, titulo:'The Shadow Show'},{n:6, titulo:'Things that move'}],
  revisar:['Este arco ya esta ejecutado como dos unidades del portal (U5 y U6). El arco solo '+
           'declara que son un mismo proyecto de once semanas.']
},

/* ==================================================================== 3.o */

'g3.t1': {
  grade:'g3', label:'Grade 3', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🥪', from:'#7a2d3a', to:'#d4756a'},
  titulo:'From problem to proposal',
  subtitulo:'El quiosco saludable que la clase elige, monta y demuestra',
  areaEje:'social', areasArticuladas:['science','math','english','comunicacion'],
  situacion:'El plan anual de 3.o ya trae el ciclo entero escrito, aunque partido en dos '+
    'periodos. P1 va de "mi ciudad y mi distrito" a "problemas locales de mi comunidad", y de ahi '+
    'a asambleas, presupuesto de campana, campana y elecciones; en paralelo, Science recorre el '+
    'proceso de indagacion completo: identificar problemas, proponer soluciones, poner un plan en '+
    'practica y presentarlo. P2 aterriza ese mismo ciclo en algo concreto: necesidades y deseos, '+
    'nociones de presupuesto, plan de negocio de un quiosco saludable, costos, venta en el recreo '+
    'y presentacion del plan; Science sostiene el contenido de nutricion y el analisis de datos. '+
    'No hace falta inventar un proyecto: hay que decir que es uno solo.',
  preguntaEsencial:'How do we turn a problem in our community into a proposal that actually works?',
  narrativa:'For eleven weeks you are going to do what adults do when something in a place does '+
    'not work: find out how the place is organised, spot a real problem, propose something, get '+
    'people to vote for it, and then prove that it worked. Your proposal is a healthy snack stand '+
    'for our own break time. It has to be elected, it has to have a budget, the food has to be '+
    'genuinely good for you, and at the end you have to show the numbers.',
  orientadoras:{
    social:'Como esta organizado el lugar donde vivo y como se toma alli una decision?',
    science:'Como paso de un problema a una solucion que se puede probar? Que hace que un alimento sea bueno para mi?',
    math:'Como recojo datos con una encuesta y como los muestro? Cuanto cuesta y cuanto queda?',
    comunicacion:'Como cuento mi propia historia y como convenzo a otro por escrito?',
    english:'Can I give my opinion about food and say why?'
  },
  competencias:[
    {area:'social', nombre:'Convive y participa democraticamente en la busqueda del bien comun',
     capacidades:['Participa en acciones que promueven el bienestar comun',
                  'Delibera sobre asuntos publicos','Construye normas y asume acuerdos y leyes']},
    {area:'social', nombre:'Gestiona responsablemente los recursos economicos',
     capacidades:['Comprende el funcionamiento del sistema economico y financiero',
                  'Toma decisiones economicas y financieras']},
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones para hacer indagacion',
                  'Disena estrategias para hacer indagacion',
                  'Analiza datos e informacion',
                  'Evalua y comunica el proceso y los resultados de su indagacion']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas',
                  'Sustenta conclusiones o decisiones con base en la informacion obtenida']},
    {area:'comunicacion', nombre:'Escribe diversos tipos de textos en su lengua materna',
     capacidades:['Organiza y desarrolla las ideas de forma coherente y cohesionada',
                  'Reflexiona y evalua la forma, el contenido y el contexto del texto escrito']}
  ],
  producto:{
    titulo:'The healthy snack stand',
    audiencia:'El colegio entero, que compra en el recreo; y la asamblea de la clase, que aprueba '+
      'o rechaza el plan antes de que exista.',
    descripcion:'Un plan de negocio de un quiosco saludable, elegido en asamblea, con su '+
      'presupuesto, su justificacion nutricional y sus resultados graficados despues de la venta.',
    incluye:['Mi autobiografia (quien soy y de donde vengo)','El problema que identificamos',
             'La encuesta y su tabla de frecuencias','El plan de negocio con costos',
             'El parrafo de opinion sobre nuestro snack','El grafico de lo que paso el dia de la venta']
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:'Conocer', foco:'My city, my district',
     hace:'Peru y su organizacion, las regiones y los distritos de Lima. Science abre el proceso '+
       'de indagacion con una investigacion de campo: que sabe la gente de Nordic sobre esto?',
     evidencia:'What we found out'},
    {n:2, periodo:1, semana:2, fase:'Conocer', foco:'Who decides here',
     hace:'Planos y croquis, autoridades municipales del distrito donde vive cada uno, y el '+
       'proceso electoral. En Comunicacion arranca "mi biografia".',
     evidencia:'District card'},
    {n:3, periodo:1, semana:3, fase:'Conocer', foco:'Naming the problem',
     hace:'Problemas locales de la comunidad y del colegio. Science: identificar problemas dentro '+
       'del proceso de indagacion. Se elige el problema del que va a ir la campana.',
     evidencia:'Problem tree'},
    {n:4, periodo:1, semana:4, fase:'Proponer', foco:'Asking everybody',
     hace:'Encuesta con preguntas propias, tabla de frecuencias y conclusiones. En English, la '+
       'entrevista a los profesores sobre habitos saludables. Presupuesto de campana en Social.',
     evidencia:'Frequency table'},
    {n:5, periodo:1, semana:5, fase:'Proponer', foco:'The campaign',
     hace:'Graficos de barras a partir de la encuesta y campana en clase. Science: el plan de '+
       'solucion se pone en practica. Presentacion de la autobiografia.',
     evidencia:'Bar graph + campaign'},
    {n:6, periodo:1, semana:6, fase:'Proponer', foco:'The vote',
     hace:'Elecciones y escucha de las opiniones de los companeros. Se cierra P1 con la propuesta '+
       'elegida y publicada.', evidencia:'Elected proposal'},
    {n:7, periodo:2, semana:1, fase:'Disenar', foco:'Needs and wants',
     hace:'Arranca P2. Necesidades y deseos, nociones de presupuesto. Science entra con dieta '+
       'equilibrada, grupos de alimentos y la piramide.', evidencia:'Needs / wants sort'},
    {n:8, periodo:2, semana:2, fase:'Disenar', foco:'What is really in the food',
     hace:'Natural frente a procesado, perecedero y no perecedero, energetico / constructor / '+
       'protector. En English, la idea principal de un texto informativo sobre el origen de los '+
       'alimentos.', evidencia:'Food label study'},
    {n:9, periodo:2, semana:3, fase:'Disenar', foco:'The business plan',
     hace:'Plan de negocio del quiosco saludable: costos y recursos necesarios. Science: efectos '+
       'de una mala alimentacion y diseno del plan del snack. En English, el parrafo de opinion.',
     evidencia:'Business plan, draft'},
    {n:10, periodo:2, semana:4, fase:'Vender', foco:'Selling at break',
     hace:'La venta en el recreo. Science: se aplica la solucion (propuesta de lonchera). Se '+
       'registra todo lo que pasa: cuanto se vendio, que sobro, que dijo la gente.',
     evidencia:'Sales log'},
    {n:11, periodo:2, semana:5, fase:'Demostrar', foco:'Proving it',
     hace:'Analisis de datos y graficos de resultados. Presentacion del plan de negocio con lo que '+
       'de verdad paso. Version final del parrafo de opinion.',
     evidencia:'Results + final pitch'}
  ],
  evaluacion:[
    {criterio:'Identifico un problema real',
     descriptor:'El problema es del colegio o del distrito, se puede ver, y explica a quien afecta.'},
    {criterio:'Recojo y muestro datos',
     descriptor:'Sus preguntas dan respuestas contables, la tabla cuadra y el grafico dice lo que el texto dice.'},
    {criterio:'Decido con criterio economico',
     descriptor:'Distingue necesidad de deseo, calcula costos y explica que pasa si algo sale mas caro.'},
    {criterio:'Convenzo con razones',
     descriptor:'Su parrafo de opinion da al menos dos razones y una de ellas viene de sus propios datos.'}
  ],
  diferenciacion:[
    'La encuesta se puede pasar en pareja: uno pregunta y otro marca.',
    'El plan de negocio admite formato de poster, de tabla o de texto.',
    'Quien no venda puede llevar el registro de la venta; el rol se pacta en asamblea, no se asigna.'
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:'El nino ensena su tabla de frecuencias y el grafico del dia de la venta, y explica '+
      'una decision que el equipo cambio por lo que decian los datos.'},
  unidades:[],
  revisar:['La venta en el recreo necesita permiso y un dia concreto en el calendario: sin fecha '+
           'el arco se queda en simulacro y pierde justamente lo que lo hace real.',
           'Manipulacion de alimentos: hay que acordar con administracion que se puede vender.']
},

'g3.t2': {
  grade:'g3', label:'Grade 3', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'🏔️', from:'#1f4f43', to:'#5fae8f'},
  titulo:'One region, and what keeps it alive',
  subtitulo:'De la investigacion de la region al modelo de conservacion',
  areaEje:'social', areasArticuladas:['science','english','math','comunicacion'],
  situacion:'Este arco no hay que deducirlo: el plan anual lo dice. P3 termina con "Research '+
    'project by groups (region assigned): graphs + timeline + economic activity explanation", '+
    'escrito igual en Social y en Science. Y P4 anota en Science "Forest vs jungle vs other '+
    'Peruvian landscapes (connection to Proyecto 3)". Son un mismo proyecto: primero se investiga '+
    'una region del Peru y lo que se produce en ella, y despues se estudia el ecosistema que la '+
    'sostiene y se propone como conservarlo. En medio cae el viaje de estudios de 3.o (agosto).',
  preguntaEsencial:'How do people use what their region gives them without destroying the place they live in?',
  narrativa:'Each team gets one region of Peru. Not a poster about it — an investigation. You will '+
    'find out what the land gives, what people do with it, how long they have been doing it, and '+
    'what it is costing. Then you will study the ecosystem underneath all that, build a model of '+
    'it, and defend a proposal for keeping it alive in front of the class assembly.',
  orientadoras:{
    social:'Que hace vivir a esta region y desde cuando? Que reglas la protegen?',
    science:'Que ecosistema hay debajo de esa actividad y que le pasa cuando la usamos?',
    english:'Can I write an informative text about my region and suggest what should be done?',
    math:'Como represento la region en un plano y como muestro sus datos?',
    comunicacion:'Que cuentan las leyendas y los mitos de un lugar sobre su gente?'
  },
  competencias:[
    {area:'social', nombre:'Gestiona responsablemente el espacio y el ambiente',
     capacidades:['Comprende las relaciones entre los elementos naturales y sociales',
                  'Maneja fuentes de informacion para comprender el espacio geografico',
                  'Genera acciones para conservar el ambiente local y global']},
    {area:'social', nombre:'Construye interpretaciones historicas',
     capacidades:['Comprende el tiempo historico','Elabora explicaciones sobre procesos historicos']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre biodiversidad, Tierra y universo',
                  'Evalua las implicancias del saber y del quehacer cientifico y tecnologico']},
    {area:'science', nombre:'Disena y construye soluciones tecnologicas para resolver problemas de su entorno',
     capacidades:['Determina una alternativa de solucion tecnologica',
                  'Disena la alternativa de solucion tecnologica',
                  'Implementa y valida la alternativa de solucion tecnologica']},
    {area:'math', nombre:'Resuelve problemas de forma, movimiento y localizacion',
     capacidades:['Usa estrategias y procedimientos para orientarse en el espacio']}
  ],
  producto:{
    titulo:'Region file + habitat model',
    audiencia:'La asamblea de la clase, que aprueba o devuelve cada propuesta de conservacion; y '+
      'las familias en el Student Achievement Day.',
    descripcion:'Un dossier de la region asignada (graficos, linea de tiempo y explicacion de su '+
      'actividad economica) y, sobre el, una maqueta del ecosistema con una propuesta de '+
      'conservacion defendida en asamblea.',
    incluye:['Mi region: mapa, paisaje y recursos','Linea de tiempo de su actividad economica',
             'Graficos de produccion','El problema ambiental de mi region',
             'La maqueta del habitat','La propuesta de conservacion, con lo que cuesta y quien la hace']
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:'Investigar', foco:'The 24 regions',
     hace:'Las 24 regiones, los paisajes del Peru y los lugares turisticos. Se reparten las '+
       'regiones por equipos. Science entra con las regiones naturales y sus recursos.',
     evidencia:'Region assigned + first map'},
    {n:2, periodo:3, semana:2, fase:'Investigar', foco:'How long it has been happening',
     hace:'Anos y decadas, antes y despues de Cristo, descripcion de hechos historicos. En '+
       'English, la secuencia de sucesos con pasado simple y conectores de tiempo.',
     evidencia:'Time line, draft'},
    {n:3, periodo:3, semana:3, fase:'Investigar', foco:'Renewable or not',
     hace:'Recursos renovables y no renovables; simbolos nacionales e historia de las banderas en '+
       'Social. Vocabulario de las actividades economicas del Peru en English.',
     evidencia:'Resource sort'},
    {n:4, periodo:3, semana:4, fase:'Investigar', foco:'What is produced here',
     hace:'Principales actividades economicas y presupuesto a escala nacional. Science: proceso de '+
       'produccion y transformacion de los recursos. Mineria, pesca, agricultura, textil.',
     evidencia:'Production chain'},
    {n:5, periodo:3, semana:5, fase:'Investigar', foco:'What it is costing',
     hace:'Problemas ambientales por region y estrategias para reducir la contaminacion. En '+
       'English, parrafos de problema y solucion con can y should.',
     evidencia:'Problem + solution paragraph'},
    {n:6, periodo:3, semana:6, fase:'Investigar', foco:'Presenting the region',
     hace:'Cierre de P3: el proyecto de investigacion por grupos, con graficos, linea de tiempo y '+
       'explicacion de la actividad economica. Presentacion oral con apoyo visual.',
     evidencia:'Region file presented'},
    {n:7, periodo:4, semana:1, fase:'Observar', foco:'The ecosystem underneath',
     hace:'Arranca P4. Ecosistemas con foco en el bosque, componentes vivos y no vivos, '+
       'clasificacion animal y habitats. Social prepara las reglas del viaje y las preguntas de '+
       'la entrevista.', evidencia:'Interview questions ready'},
    {n:8, periodo:4, semana:2, fase:'Observar', foco:'The study trip',
     hace:'Viaje de estudios de 3.o. Cuaderno de campo: que se ve, que se oye, que se recoge. '+
       'Turismo responsable y limites personales en espacios publicos.',
     evidencia:'Field notes'},
    {n:9, periodo:4, semana:3, fase:'Observar', foco:'Who eats whom, and what we do to it',
     hace:'Cadenas alimentarias, impacto humano en los ecosistemas y estrategias de conservacion. '+
       'En English, sentimientos y motivos del personaje y formacion de preguntas.',
     evidencia:'Food web + impact'},
    {n:10, periodo:4, semana:4, fase:'Construir', foco:'What can break it',
     hace:'Desastres naturales que afectan a los ecosistemas y comparacion bosque / selva / otros '+
       'paisajes peruanos, que es donde el plan enlaza con el Proyecto 3. Pictogramas en Math.',
     evidencia:'Comparison chart'},
    {n:11, periodo:4, semana:5, fase:'Construir', foco:'Building the habitat',
     hace:'Diseno de la propuesta de conservacion y construccion de la maqueta del habitat. '+
       'Math entra con plano cartesiano, perimetro y patrones para levantarla.',
     evidencia:'Habitat model'},
    {n:12, periodo:4, semana:6, fase:'Defender', foco:'The assembly',
     hace:'Ensayo oral y defensa de la propuesta en asamblea. Responsabilidad civica: la clase '+
       'discute cada propuesta y decide cual sostiene.', evidencia:'Proposal defended'}
  ],
  evaluacion:[
    {criterio:'Investigo con fuentes',
     descriptor:'Su dossier dice de donde sale cada dato y distingue lo que leyo de lo que supone.'},
    {criterio:'Explico relaciones, no listas',
     descriptor:'Une recurso, actividad economica y consecuencia ambiental en una misma explicacion.'},
    {criterio:'Construyo una solucion',
     descriptor:'La maqueta representa el ecosistema real y la propuesta dice quien la hace y con que.'},
    {criterio:'Defiendo y escucho',
     descriptor:'Sostiene su propuesta en asamblea, responde una objecion y cambia lo que le convence.'}
  ],
  diferenciacion:[
    'El dossier admite mapa comentado, linea de tiempo ilustrada o texto informativo.',
    'La maqueta puede ser caja de habitat, dibujo por capas o modelo digital.',
    'La defensa se puede hacer en pareja repartiendo las dos preguntas orientadoras.'
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:'El nino trae su maqueta y su linea de tiempo y explica que aprendio en el viaje que '+
      'no sabia antes de ir.'},
  unidades:[],
  revisar:['El viaje de estudios de 3.o esta en P4 W2 del calendario (agosto). Si se mueve, se '+
           'mueven las fases 8 y 9, no todo el arco.',
           'La asignacion de regiones por equipo la hace el tutor en la semana 1; conviene que '+
           'ninguna region se repita para que el mural de la clase cubra el pais.']
},

'g3.t3': {
  grade:'g3', label:'Grade 3', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🪐', from:'#2b2c66', to:'#7b6ad0'},
  titulo:'Looking out, looking in',
  subtitulo:'El mismo metodo para el cielo y para mi propia vida',
  areaEje:'science', areasArticuladas:['social','english','math','comunicacion'],
  situacion:'P5 pone a 3.o a explicar algo enorme y lejano: el sistema solar, la rotacion y la '+
    'traslacion, las fases de la luna, la gravedad; y lo cierra con "design experiment/model, '+
    'apply inquiry process, collect data" y una exhibicion publica. P6 gira el foco 180 grados: '+
    'metas personales, autorregulacion, "track one personal habit for a week", plan de rutina '+
    'saludable, y una presentacion oral de dos o tres minutos. Es el mismo metodo dos veces: '+
    'observar, registrar, explicar con evidencia. Primero hacia fuera y despues hacia dentro. '+
    'Decirlo asi es lo que convierte P6 en proyecto y no en una serie de reflexiones sueltas.',
  preguntaEsencial:'What can I explain with evidence — about the sky, and about myself?',
  narrativa:'For six weeks you are going to explain something nobody can touch: why we have day '+
    'and night, why the moon changes, why things fall. You will build a model and show it to '+
    'people who did not build it. Then, for five weeks, you turn the same tools on yourself: pick '+
    'one habit, measure it for a week, and use the numbers to set a goal you can actually defend.',
  orientadoras:{
    science:'Que explica lo que veo en el cielo? Y que dicen mis datos sobre mis propios habitos?',
    social:'Que profesiones hacen esto y como se organiza un equipo para lograrlo?',
    english:'Can I explain how something works, and write about a goal I will reach?',
    math:'Como uso operaciones combinadas y fracciones para calcular lo que el modelo necesita?'
  },
  competencias:[
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Disena estrategias para hacer indagacion','Genera y registra datos o informacion',
                  'Analiza datos e informacion','Evalua y comunica el proceso y los resultados de su indagacion']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre Tierra y universo']},
    {area:'social', nombre:'Construye su identidad',
     capacidades:['Se valora a si mismo','Autorregula sus emociones',
                  'Reflexiona y argumenta eticamente']},
    {area:'comunicacion', nombre:'Se comunica oralmente en su lengua materna',
     capacidades:['Adecua, organiza y desarrolla las ideas de forma coherente',
                  'Reflexiona y evalua la forma, el contenido y el contexto del texto oral']}
  ],
  producto:{
    titulo:'The model, and the plan',
    audiencia:'En P5, la exhibicion publica del colegio, que es gente que no estuvo en clase. En '+
      'P6, la propia familia, que es la que va a ver si el plan se cumple.',
    descripcion:'Un modelo o experimento que explica un fenomeno del sistema solar, y despues un '+
      'plan de rutina saludable basado en el registro real de un habito propio durante una semana.',
    incluye:['Mi pregunta sobre el cielo','El modelo o el experimento y como funciona',
             'La explicacion cientifica, escrita','El registro de mi habito durante una semana',
             'Mi plan de rutina y mi meta','La presentacion oral de dos o tres minutos']
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:'Observar el cielo', foco:'What is out there',
     hace:'Elementos del sistema solar, el sol en el centro, planetas y planetas enanos. En '+
       'English, texto informativo sobre los planetas y vocabulario de orbita, gravedad y rotacion.',
     evidencia:'Solar system map'},
    {n:2, periodo:5, semana:2, fase:'Observar el cielo', foco:'Day, night and seasons',
     hace:'Rotacion y traslacion de la Tierra. Social conecta con el reloj de sol y el repaso de '+
       'la hora. En English, presente simple frente a continuo para describir el experimento.',
     evidencia:'Rotation demo'},
    {n:3, periodo:5, semana:3, fase:'Observar el cielo', foco:'The moon and the tides',
     hace:'Fases de la luna y mareas. En English, el futuro con will para hacer predicciones: que '+
       'fase habra dentro de dos semanas.', evidencia:'Moon prediction'},
    {n:4, periodo:5, semana:4, fase:'Explicar', foco:'Missions and gravity',
     hace:'Misiones espaciales y concepto basico de gravedad. Social: profesiones ligadas a la '+
       'exploracion espacial y presupuesto de una mision.', evidencia:'Mission budget'},
    {n:5, periodo:5, semana:5, fase:'Explicar', foco:'The model and the exhibition',
     hace:'Diseno del experimento o modelo, recogida de datos y exhibicion en la misma semana. El '+
       'plan anual reparte esto en dos semanas (W5 y W6) pero el calendario solo da cinco en P5: '+
       'la exhibicion se hace el ultimo dia, no la semana siguiente. Hablar en publico, escucha '+
       'respetuosa y comportamiento civico.',
     evidencia:'Model + data + exhibition'},
    {n:6, periodo:6, semana:1, fase:'Observarme', foco:'Turning the lens around',
     hace:'Arranca P6. Lectura de no ficcion narrativa sobre un nino que alcanza una meta. '+
       'Crecimiento y metas personales; fortalezas y aspectos a mejorar. Se elige EL habito.',
     evidencia:'The habit I choose'},
    {n:7, periodo:6, semana:2, fase:'Observarme', foco:'Measuring for a week',
     hace:'Registro diario de un habito (sueno, tiempo de lectura, agua). Es literalmente la '+
       'misma tabla que se uso para el modelo, con otro dato dentro. Parrafo de reflexion de 100 '+
       'palabras en pasado.', evidencia:'One-week log'},
    {n:8, periodo:6, semana:3, fase:'Planear', foco:'What the numbers say',
     hace:'Diseno del plan de rutina saludable a partir del registro. Derechos y responsabilidades, '+
       'autonomia y la importancia de saber decir que no. Futuro con will y going to.',
     evidencia:'Routine plan'},
    {n:9, periodo:6, semana:4, fase:'Planear', foco:'What it will take',
     hace:'Presupuesto basico del pequeno proyecto personal y toma de decisiones. Que recursos '+
       'necesito para mi meta? Escritura de opinion: por que mi meta importa.',
     evidencia:'Opinion text'},
    {n:10, periodo:6, semana:5, fase:'Contar', foco:'Two or three minutes',
     hace:'Linea de tiempo de crecimiento personal, texto de reflexion final y presentacion oral '+
       'de dos o tres minutos. Mini poster de la rutina saludable.',
     evidencia:'Final talk + poster'},
    {n:11, periodo:6, semana:6, fase:'Contar', foco:'The wall of goals',
     hace:'Ultima semana de clase. Todos los posters de rutina y todas las metas se cuelgan '+
       'juntos y cada nino lee la meta de otro y le escribe una linea. El plan anual no carga '+
       'contenido de area esta semana salvo Educacion Fisica, asi que el arco la usa para '+
       'cerrar; si coordinacion la llena, esta fase se ajusta.',
     evidencia:'Wall of goals'}
  ],
  evaluacion:[
    {criterio:'Explico con un modelo',
     descriptor:'El modelo representa el fenomeno, no solo lo decora, y sabe decir en que se parece y en que no.'},
    {criterio:'Registro sin trampas',
     descriptor:'La semana esta completa, incluye los dias malos, y no se rellena de memoria al final.'},
    {criterio:'Uso mis datos para decidir',
     descriptor:'La meta sale del registro y no de un deseo: se puede senalar el dato que la justifica.'},
    {criterio:'Hablo dos minutos seguidos',
     descriptor:'Sostiene la presentacion sin leerla entera y responde una pregunta del publico.'}
  ],
  diferenciacion:[
    'El modelo puede ser maqueta, demostracion con linterna, animacion o dibujo por capas.',
    'El registro admite marcas, colores o numeros; lo que importa es que sea diario.',
    'La presentacion se puede grabar en video si hablar en directo bloquea, pero se ve entera en clase.'
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:'El nino ensena las dos cosas juntas: el modelo del cielo y su registro personal, y '+
      'explica que tienen en comun. Ese es el aprendizaje del trimestre, no el sistema solar.'},
  unidades:[{n:5, titulo:'Unidad 5 del portal'},{n:6, titulo:'Unidad 6 del portal'}],
  revisar:['El habito que se registra tiene que ser del nino, no de la familia, y no puede ser '+
           'peso ni comida: es un registro de aula y no una medida corporal.',
           'El plan anual de 3.o escribe SEIS semanas en P5 y el calendario solo da cinco. La '+
           'semana que sobra es justo la de la exhibicion; aqui va junta con el diseno del '+
           'modelo. Es una decision, no un descuido: conviene confirmarla con el grado.',
           'P6 W6 solo tiene Educacion Fisica cargada en el plan anual.']
},

/* ==================================================================== 4.o */

'g4.t1': {
  grade:'g4', label:'Grade 4', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🫀', from:'#6b1f38', to:'#c66a80'},
  titulo:'Systems that keep us going',
  subtitulo:'El cuerpo funciona porque sus sistemas se coordinan; la clase, tambien',
  areaEje:'science', areasArticuladas:['social','comunicacion','math','english'],
  situacion:'P1 y P2 corren dos hilos que 4.o suele vivir como asignaturas separadas y que en '+
    'realidad son el mismo concepto. Science recorre las funciones de los seres vivos '+
    '(nutricion, metabolismo, excrecion, sensibilidad, homeostasis, crecimiento, reproduccion y '+
    'herencia) y en P2 baja a los sistemas nervioso, inmunologico y urinario y a los habitos '+
    'saludables. Social, en paralelo, hace exactamente lo mismo con un grupo humano: democracia y '+
    'participacion, reglas y acuerdos, escuchar la opinion del companero, asambleas, y '+
    'participacion, compromiso y reflexion democratica. Y Comunicacion trae la anecdota con su '+
    'estructura y termina en "escritura final de una anecdota personal y presentacion oral". El '+
    'arco los junta con una sola idea: un sistema funciona cuando sus partes se coordinan.',
  preguntaEsencial:'What keeps a body working, and what keeps a group working?',
  narrativa:'Two things in this term look like they have nothing to do with each other: how your '+
    'body works, and how a class agrees on something. They are the same problem. A body stays '+
    'alive because its systems talk to each other; a class works because its people do. You are '+
    'going to study one system properly, find out what breaks it, and then take a real proposal '+
    'about one healthy habit to a class assembly — with the survey to back it.',
  orientadoras:{
    science:'Que hace un ser vivo para seguir vivo, y que pasa cuando un sistema falla?',
    social:'Como se pone de acuerdo un grupo y que hace falta para que el acuerdo se cumpla?',
    comunicacion:'Como se cuenta una anecdota propia para que otro la entienda y le importe?',
    math:'Como hago una encuesta con preguntas abiertas y cerradas y que hago con las respuestas?',
    english:'Can I write an opinion text and say what I do every day?'
  },
  competencias:[
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre los seres vivos',
                  'Evalua las implicancias del saber y del quehacer cientifico y tecnologico']},
    {area:'social', nombre:'Convive y participa democraticamente en la busqueda del bien comun',
     capacidades:['Construye normas y asume acuerdos y leyes','Delibera sobre asuntos publicos',
                  'Participa en acciones que promueven el bienestar comun']},
    {area:'comunicacion', nombre:'Escribe diversos tipos de textos en su lengua materna',
     capacidades:['Adecua el texto a la situacion comunicativa',
                  'Utiliza convenciones del lenguaje escrito de forma pertinente']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas',
                  'Sustenta conclusiones o decisiones con base en la informacion obtenida']}
  ],
  producto:{
    titulo:'The class agreement, and my anecdote',
    audiencia:'La asamblea de la clase, que vota el acuerdo; y despues las familias, que reciben '+
      'la anecdota publicada.',
    descripcion:'Un acuerdo de clase sobre UN habito saludable, aprobado en asamblea y sostenido '+
      'con datos de una encuesta propia; y una anecdota personal escrita y presentada en voz alta.',
    incluye:['El sistema del cuerpo que estudie y como funciona','Que lo dana y que lo cuida',
             'Mi encuesta con preguntas abiertas y cerradas','El grafico de los resultados',
             'La propuesta que lleve a la asamblea','Mi anecdota personal, escrita y leida']
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:'Comprender', foco:'Living and non-living',
     hace:'Seres vivos y no vivos: que tiene que hacer algo para considerarse vivo. Social abre '+
       'con democracia y participacion ciudadana. En Comunicacion, el punto y la anecdota.',
     evidencia:'Alive / not alive, with the reason'},
    {n:2, periodo:1, semana:2, fase:'Comprender', foco:'Nutrition, metabolism, excretion',
     hace:'Las tres funciones que mantienen el cuerpo en marcha. Social: reglas, acuerdos y '+
       'convivencia democratica. Los dos temas se comparan explicitamente en la pizarra.',
     evidencia:'System diagram'},
    {n:3, periodo:1, semana:3, fase:'Comprender', foco:'Sensitivity and homeostasis',
     hace:'Como el cuerpo detecta y como se autorregula. Math abre la encuesta: preguntas '+
       'abiertas y cerradas. Social: escuchar la opinion de los companeros.',
     evidencia:'My survey questions'},
    {n:4, periodo:1, semana:4, fase:'Preguntar', foco:'Growth and reproduction',
     hace:'Crecimiento y reproduccion como funciones de los seres vivos. Se pasa la encuesta. '+
       'Social: participacion en asambleas. Conectores narrativos en Comunicacion.',
     evidencia:'Survey passed'},
    {n:5, periodo:1, semana:5, fase:'Preguntar', foco:'Heredity',
     hace:'Herencia: que se transmite y que no. Se tabulan las respuestas con el modelo de barras '+
       'parte-todo de Math. Tecnicas de expresion oral.', evidencia:'Tabulated data'},
    {n:6, periodo:1, semana:6, fase:'Preguntar', foco:'What the survey says',
     hace:'Cierre de P1: reflexion de Science y "participacion, compromiso y reflexion '+
       'democratica" de Social. Se elige el habito del que va a ir el acuerdo. Escritura final de '+
       'la anecdota personal y presentacion oral.', evidencia:'Anecdote + habit chosen'},
    {n:7, periodo:2, semana:1, fase:'Profundizar', foco:'The nervous system',
     hace:'Arranca P2. Sistema nervioso: el sistema que coordina a los demas. Es la metafora '+
       'central del arco y conviene nombrarla. En English, texto narrativo.',
     evidencia:'Coordination map'},
    {n:8, periodo:2, semana:2, fase:'Profundizar', foco:'The immune system',
     hace:'Sistema inmunologico: como el cuerpo se defiende. Que pasa cuando la defensa falla. '+
       'Adjetivo y grados del adjetivo en Comunicacion para describir con precision.',
     evidencia:'Defence notes'},
    {n:9, periodo:2, semana:3, fase:'Profundizar', foco:'The urinary system',
     hace:'Sistema urinario y su papel en la excrecion. Se cierra el mapa de los tres sistemas y '+
       'se marca cual depende de cual.', evidencia:'Three systems, connected'},
    {n:10, periodo:2, semana:4, fase:'Acordar', foco:'Healthy habits',
     hace:'Habitos saludables. Cada equipo redacta su propuesta de acuerdo: que se compromete a '+
       'hacer la clase, quien lo comprueba y cada cuanto.', evidencia:'Proposal, draft'},
    {n:11, periodo:2, semana:5, fase:'Acordar', foco:'The assembly',
     hace:'Asamblea: se presentan las propuestas con el grafico delante, se debate y se vota una. '+
       'El acuerdo se escribe y se cuelga en la clase con la fecha de revision.',
     evidencia:'Signed class agreement'}
  ],
  evaluacion:[
    {criterio:'Explico un sistema',
     descriptor:'Dice que hace el sistema, de que depende y que pasa si falla, sin recitar la lista de organos.'},
    {criterio:'Pregunto y tabulo',
     descriptor:'Distingue pregunta abierta de cerrada, tabula sin perder respuestas y su grafico dice lo mismo que su texto.'},
    {criterio:'Propongo en asamblea',
     descriptor:'Su propuesta se puede cumplir, dice quien la comprueba, y responde a una objecion.'},
    {criterio:'Cuento mi anecdota',
     descriptor:'La anecdota tiene su estructura, usa conectores narrativos y se lee en voz alta de forma clara.'}
  ],
  diferenciacion:[
    'El mapa del sistema admite dibujo etiquetado, esquema o texto.',
    'La encuesta se pasa en pareja; tabular se puede hacer con conteo o con hoja de calculo.',
    'La anecdota se puede grabar en audio y transcribir despues.'
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:'El nino ensena su grafico y el acuerdo firmado por la clase, y explica que argumento '+
      'convencio a los demas y por que.'},
  unidades:[],
  revisar:['El acuerdo tiene fecha de revision: si nadie lo comprueba en P3, el producto se cae y '+
           'el aprendizaje civico se pierde. Conviene fijar la revision en el hub de la unidad.']
},

'g4.t2': {
  grade:'g4', label:'Grade 4', trimestre:2, periodos:[3,4], semanas:12,
  inicio:'2026-06-01', fin:'2026-09-11',
  cover:{icon:'📏', from:'#1c4a6b', to:'#5fa9d4'},
  titulo:'How do you know it changed?',
  subtitulo:'Medir la materia, y medir lo que cambia con el tiempo',
  areaEje:'science', areasArticuladas:['math','pe','comunicacion','english'],
  situacion:'P3 le da a 4.o el bloque de medida completo: estados de la materia, propiedades y '+
    'medicion, tamano, masa, volumen, temperatura y densidad; Math acompana con medida, patrones y '+
    'propiedades de cuadrados y rectangulos, y Educacion Fisica hace atletismo, que es la unica '+
    'area del plan que produce numeros propios cada semana (velocidad, resistencia, relevos, '+
    'saltos, obstaculos). P4 cambia el objeto pero no el metodo: desarrollo humano y crecimiento, '+
    'y en Math graficos de barras y de lineas y conversion de unidades. El grafico de lineas '+
    'aparece justo cuando hace falta medir algo que cambia en el tiempo. El arco es ese: no se '+
    'afirma que algo cambio, se demuestra.',
  preguntaEsencial:'How do you know that something has changed?',
  narrativa:'Anybody can say "it got bigger" or "I got faster". Proving it is harder. For twelve '+
    'weeks you are going to measure properly: first things — their mass, their volume, their '+
    'temperature, their density — and then your own performance, week after week, on the track. '+
    'At the end you will have a line that goes somewhere, and a text that explains why.',
  orientadoras:{
    science:'Que propiedades de la materia se pueden medir, y con que instrumento cada una?',
    math:'Cuando uso un grafico de barras y cuando uno de lineas? Como convierto unidades?',
    pe:'Que dato produce mi cuerpo cada semana y como lo registro sin trampas?',
    comunicacion:'Como se escribe un texto que explica, con verbos bien conjugados?',
    english:'Can I write an informative text about what I measured?'
  },
  competencias:[
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Disena estrategias para hacer indagacion','Genera y registra datos o informacion',
                  'Analiza datos e informacion']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre materia y energia']},
    {area:'math', nombre:'Resuelve problemas de cantidad',
     capacidades:['Usa estrategias y procedimientos de estimacion y calculo',
                  'Argumenta afirmaciones sobre las relaciones numericas y las operaciones']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas']},
    {area:'comunicacion', nombre:'Escribe diversos tipos de textos en su lengua materna',
     capacidades:['Organiza y desarrolla las ideas de forma coherente y cohesionada']}
  ],
  producto:{
    titulo:'The measurement journal',
    audiencia:'La clase, que compara sus lineas; y las familias en el Student Achievement Day.',
    descripcion:'Un cuaderno de medidas de doce semanas: la materia medida con instrumento y '+
      'unidad en P3, y el propio rendimiento atletico registrado semana a semana en P4, con el '+
      'grafico de lineas y el texto informativo que lo explica.',
    incluye:['Mis medidas de materia, con instrumento y unidad','La estimacion antes de cada medida',
             'Mi registro semanal de atletismo','El grafico de lineas de mi progreso',
             'La conversion de unidades donde hizo falta','El texto informativo final']
  },
  fases:[
    {n:1, periodo:3, semana:1, fase:'Medir la materia', foco:'States of matter',
     hace:'Estados de la materia y sus cambios. Se abre el cuaderno de medidas y se pacta la '+
       'regla: primero estimo, luego mido, y anoto las dos cosas.', evidencia:'Journal opened'},
    {n:2, periodo:3, semana:2, fase:'Medir la materia', foco:'Properties and measurement',
     hace:'Propiedades de la materia y su medicion. Que instrumento sirve para que propiedad. En '+
       'PE arranca el atletismo y se toma el primer registro de velocidad.',
     evidencia:'Instrument match + first time'},
    {n:3, periodo:3, semana:3, fase:'Medir la materia', foco:'Size, mass, volume',
     hace:'Tamano, masa y volumen medidos de verdad, no leidos. Math entra con multiplos y '+
       'factores y con patrones. PE: resistencia en pista.', evidencia:'Mass and volume log'},
    {n:4, periodo:3, semana:4, fase:'Medir la materia', foco:'Temperature and density',
     hace:'Temperatura y densidad. Por que dos cosas del mismo tamano no pesan igual. Medida en '+
       'Math. PE: relevos.', evidencia:'Density test'},
    {n:5, periodo:3, semana:5, fase:'Medir la materia', foco:'Writing it up',
     hace:'Texto informativo en English sobre una de las propiedades medidas. En Comunicacion, '+
       'clases de verbos y conjugacion, que es lo que un texto explicativo necesita. PE: saltos.',
     evidencia:'Informative text, draft'},
    {n:6, periodo:3, semana:6, fase:'Medir la materia', foco:'Squares and rectangles',
     hace:'Propiedades de cuadrados y rectangulos en Math: area y forma del recipiente que se '+
       'estuvo midiendo. PE: carreras con obstaculos, ultimo registro de P3.',
     evidencia:'P3 data set closed'},
    {n:7, periodo:4, semana:1, fase:'Medir el cambio', foco:'Change over time',
     hace:'Arranca P4. El desarrollo humano como proceso que ocurre en el tiempo. Math abre el '+
       'grafico de barras y el de lineas: cual sirve para que.',
     evidencia:'Bar vs line, decided'},
    {n:8, periodo:4, semana:2, fase:'Medir el cambio', foco:'Plotting my own line',
     hace:'Se vuelcan los registros de PE de P3 en un grafico de lineas. Que dice la linea que no '+
       'decia la tabla? Operaciones combinadas en Math. PE: iniciacion al basquet.',
     evidencia:'My line, first version'},
    {n:9, periodo:4, semana:3, fase:'Medir el cambio', foco:'Fractions of a whole',
     hace:'Fracciones: sumar y restar partes de un todo, que es como se expresa una mejora '+
       'parcial. Determinantes y palabras polisemicas en Comunicacion.',
     evidencia:'Improvement as a fraction'},
    {n:10, periodo:4, semana:4, fase:'Medir el cambio', foco:'Converting units',
     hace:'Conversion de una unidad mayor a una menor, incluida con fracciones y numeros mixtos. '+
       'Se revisan todas las medidas del cuaderno y se pasan a la misma unidad.',
     evidencia:'Journal in one unit'},
    {n:11, periodo:4, semana:5, fase:'Explicar', foco:'Why the line moves',
     hace:'Se escribe la explicacion: que hice distinto y que muestra el dato. Comillas y puntos '+
       'suspensivos en Comunicacion para citar lo que dijo el profesor de PE.',
     evidencia:'Explanation'},
    {n:12, periodo:4, semana:6, fase:'Explicar', foco:'The journal is handed in',
     hace:'Cuaderno de medidas completo y presentado. Se comparan las lineas de la clase: no para '+
       'ver quien corre mas, sino para ver que linea explica mejor su propia forma.',
     evidencia:'Measurement journal'}
  ],
  evaluacion:[
    {criterio:'Mido con el instrumento correcto',
     descriptor:'Elige instrumento y unidad segun la propiedad, y anota la estimacion junto a la medida.'},
    {criterio:'Registro sin saltarme semanas',
     descriptor:'La serie esta completa e incluye las semanas en que el dato empeoro.'},
    {criterio:'Elijo el grafico que toca',
     descriptor:'Usa lineas para lo que cambia en el tiempo y barras para comparar, y sabe decir por que.'},
    {criterio:'Explico el cambio',
     descriptor:'Relaciona lo que hizo con lo que muestra el dato, sin afirmar mas de lo que el dato permite.'}
  ],
  diferenciacion:[
    'El registro de PE puede ser tiempo, distancia o repeticiones: cada nino elige su medida y la mantiene.',
    'El grafico se puede hacer a mano en papel milimetrado o en hoja de calculo.',
    'El texto informativo admite version corta con esquema para quien lo necesite.'
  ],
  sad:{titulo:'Student Achievement Day #2',
    muestra:'El nino ensena su grafico de lineas y explica una semana en la que el dato bajo. Se '+
      'valora que sepa explicar la bajada, no que la linea suba.'},
  unidades:[],
  revisar:['El contenido de P4 en Science es desarrollo humano y pubertad y lo imparte el area '+
           'con su propio enfoque. El arco NO mide cuerpos: el dato personal que se registra es '+
           'rendimiento en PE, elegido por el nino. Esto no es un detalle de estilo, es la '+
           'condicion para que el proyecto sea aceptable.',
           'Hace falta acordar con el profesor de PE que los registros de atletismo se anoten y '+
           'se compartan; sin eso el arco pierde su serie de datos.']
},

'g4.t3': {
  grade:'g4', label:'Grade 4', trimestre:3, periodos:[5,6], semanas:11,
  inicio:'2026-09-14', fin:'2026-12-04',
  cover:{icon:'🌦️', from:'#134e63', to:'#59b6c9'},
  titulo:'The weather station',
  subtitulo:'Que mueve el agua y el aire de nuestra ciudad, y se puede predecir?',
  areaEje:'science', areasArticuladas:['math','comunicacion','english','social'],
  situacion:'P5 da fuerzas, tipos de fuerza y energia. P6 da recursos naturales, ciclo del agua, '+
    'clima y tiempo, e "instruments to measure" escrito tal cual en el plan. Math pone decimales '+
    'en P5 (que es como se lee cualquier instrumento) y en P6 angulos, area y perimetro y '+
    'probabilidad como fraccion y como porcentaje. Una estacion meteorologica del colegio usa '+
    'las cuatro cosas y ninguna sobra: la fuerza que mueve el aire, el ciclo que mueve el agua, '+
    'el decimal que se anota y el porcentaje con el que se pronostica.',
  preguntaEsencial:'What moves the water and the air over our city, and can we forecast it?',
  narrativa:'Nordic does not have a weather station. You are going to build one, and then you are '+
    'going to use it. Not a poster of the water cycle — an instrument that gives a number every '+
    'day. After four weeks of readings you will make a forecast for the school, written as a '+
    'percentage, and then you will find out whether you were right.',
  orientadoras:{
    science:'Que fuerzas mueven el aire y el agua? Que instrumento mide cada cosa?',
    math:'Como leo y opero con decimales? Como expreso una probabilidad como fraccion y como porcentaje?',
    social:'De donde salen los recursos que usamos y que pasa cuando el clima cambia?',
    english:'Can I report what I measured and what I predict?',
    comunicacion:'Como se construye una oracion con sujeto y predicado que informe con precision?'
  },
  competencias:[
    {area:'science', nombre:'Disena y construye soluciones tecnologicas para resolver problemas de su entorno',
     capacidades:['Determina una alternativa de solucion tecnologica',
                  'Disena la alternativa de solucion tecnologica',
                  'Implementa y valida la alternativa de solucion tecnologica',
                  'Evalua y comunica el funcionamiento de su alternativa de solucion tecnologica']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre materia y energia, Tierra y universo']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas',
                  'Usa estrategias y procedimientos para recopilar y procesar datos']},
    {area:'math', nombre:'Resuelve problemas de forma, movimiento y localizacion',
     capacidades:['Usa estrategias y procedimientos para medir y orientarse en el espacio']}
  ],
  producto:{
    titulo:'A working station and a forecast',
    audiencia:'El colegio entero: el pronostico se publica donde todos lo ven, y al dia siguiente '+
      'se sabe si acerto.',
    descripcion:'Un instrumento de medida construido y en funcionamiento, cuatro semanas de '+
      'registros diarios y un pronostico semanal expresado en porcentaje, contrastado despues '+
      'con lo que de verdad paso.',
    incluye:['Mi instrumento y como lo construi','El registro diario en decimales',
             'El plano de la estacion con su area y su perimetro','Mi pronostico en fraccion y en porcentaje',
             'El contraste: acerte o no, y por que']
  },
  fases:[
    {n:1, periodo:5, semana:1, fase:'Fuerzas', foco:'What a force does',
     hace:'Fuerzas: que hace que algo se mueva, se pare o cambie de forma. Se plantea el problema '+
       'tecnologico: el colegio no sabe que tiempo hace, solo lo que siente.',
     evidencia:'The problem, stated'},
    {n:2, periodo:5, semana:2, fase:'Fuerzas', foco:'Types of forces',
     hace:'Tipos de fuerza. Cual mueve el aire, cual mueve el agua. Decimales en Math: leer, '+
       'escribir y expresar hasta tres cifras decimales, que es como marca un instrumento.',
     evidencia:'Force map'},
    {n:3, periodo:5, semana:3, fase:'Fuerzas', foco:'Choosing the instrument',
     hace:'Cada equipo elige que va a medir: lluvia, viento, temperatura o humedad. Se comparan y '+
       'ordenan decimales para fijar la escala del instrumento.', evidencia:'Design chosen'},
    {n:4, periodo:5, semana:4, fase:'Construir', foco:'Energy',
     hace:'Energia y sus formas. Construccion del instrumento. Suma y resta de decimales para '+
       'calibrarlo contra una medida conocida.', evidencia:'Prototype v1'},
    {n:5, periodo:5, semana:5, fase:'Construir', foco:'Testing the instrument',
     hace:'Prueba y ajuste: dos instrumentos midiendo lo mismo tienen que dar lo mismo. '+
       'Multiplicacion y division de decimales para convertir la lectura.',
     evidencia:'Calibrated instrument'},
    {n:6, periodo:6, semana:1, fase:'Registrar', foco:'Natural resources',
     hace:'Arranca P6. Recursos naturales: de donde sale el agua que usamos. Empieza el registro '+
       'diario y no para hasta la semana 10.', evidencia:'Day 1 of the log'},
    {n:7, periodo:6, semana:2, fase:'Registrar', foco:'The water cycle',
     hace:'Ciclo del agua, ahora con el propio registro delante. Angulos y figuras 2D en Math '+
       'para el plano de la estacion.', evidencia:'Water cycle, annotated with our data'},
    {n:8, periodo:6, semana:3, fase:'Registrar', foco:'Climate and weather',
     hace:'La diferencia entre clima y tiempo, que es exactamente la diferencia entre lo que se '+
       'espera y lo que se mide. Area y perimetro de la estacion.',
     evidencia:'Climate vs weather'},
    {n:9, periodo:6, semana:4, fase:'Predecir', foco:'Instruments to measure',
     hace:'Instrumentos de medida: se comparan los del colegio con los profesionales. Que error '+
       'tiene el nuestro y cuanto importa.', evidencia:'Error estimate'},
    {n:10, periodo:6, semana:5, fase:'Predecir', foco:'The forecast',
     hace:'Probabilidad como fraccion y como porcentaje, aplicada al propio registro: de los '+
       'ultimos veinte dias, cuantos fueron asi? Se publica el pronostico.',
     evidencia:'Published forecast'},
    {n:11, periodo:6, semana:6, fase:'Predecir', foco:'Were we right?',
     hace:'Contraste del pronostico con lo que paso. Las cuatro operaciones para cerrar el '+
       'balance. La oracion, sujeto y predicado, para redactar el informe final sin ambiguedad.',
     evidencia:'Final report'}
  ],
  evaluacion:[
    {criterio:'Construyo algo que funciona',
     descriptor:'El instrumento da una lectura repetible, y explica que ajusto para conseguirlo.'},
    {criterio:'Registro con decimales',
     descriptor:'Anota con la precision que el instrumento permite y no inventa cifras de mas.'},
    {criterio:'Pronostico con probabilidad',
     descriptor:'Su porcentaje sale del propio registro y sabe decir sobre cuantos dias esta calculado.'},
    {criterio:'Acepto el resultado',
     descriptor:'Cuando falla el pronostico, explica que dato le falto en vez de justificarse.'}
  ],
  diferenciacion:[
    'Los instrumentos tienen dificultades distintas: pluviometro (mas simple), veleta, termometro, higrometro.',
    'El registro diario se puede repartir por turnos dentro del equipo, con la tabla firmada.',
    'El informe final admite formato de parte meteorologico corto.'
  ],
  sad:{titulo:'Student Achievement Day #3',
    muestra:'El nino ensena su instrumento y su registro, y dice el pronostico que hizo y si '+
      'acerto. Un pronostico fallado bien explicado vale mas que uno acertado por suerte.'},
  unidades:[],
  revisar:['La estacion necesita un sitio del colegio donde se pueda dejar el instrumento entre '+
           'clase y clase. Hay que pedirlo antes de P5, no en la semana 4.']
},

/* ==================================================================== 5.o */

'g5.t1': {
  grade:'g5', label:'Grade 5', trimestre:1, periodos:[1,2], semanas:11,
  inicio:'2026-03-09', fin:'2026-05-29',
  cover:{icon:'🧭', from:'#3d2a5c', to:'#8d76c4'},
  titulo:'5th Grade Territory',
  subtitulo:'De que esta hecho nuestro territorio y que le estamos haciendo',
  areaEje:'science', areasArticuladas:['social','comunicacion','math','english'],
  situacion:'El titulo no es nuestro: el plan anual de 5.o llama a su primera unidad "5th Grade '+
    'Territory". P1 la llena de materia (de que estan hechas las cosas: particulas, atomos, '+
    'cambios fisicos y quimicos) y de territorio en el sentido civico (acuerdos de aula, reglas '+
    'de nuestra comunidad, conflictos, "territorial issues"), y Science introduce ya la pregunta '+
    'de investigacion, las variables y la hipotesis. P2 aterriza: reinos de los seres vivos, '+
    'impacto humano en el planeta, gestion de residuos con vertederos y centros de reciclaje, '+
    'contaminacion y deforestacion; y Math abre la recogida de datos con graficos de barras, de '+
    'lineas y de puntos. Mientras tanto, Comunicacion recorre cuatro generos de cuento y English '+
    'pide textos narrativos de 200 a 250 palabras. Hay dos productos posibles y los dos son '+
    'buenos: una investigacion sobre nuestros residuos, y un cuento situado en ese territorio.',
  preguntaEsencial:'What is our territory made of, and what are we doing to it?',
  narrativa:'This term you are going to look at this school the way a scientist and a writer look '+
    'at the same street. The scientist asks what things are made of and measures what we throw '+
    'away. The writer asks what happens here and turns it into a story somebody would want to '+
    'read. You are going to do both, about the same place, and they have to agree with each other.',
  orientadoras:{
    science:'De que esta hecha la materia y como cambia? Que estamos dejando atras y cuanto?',
    social:'Que reglas rigen este territorio y quien decide sobre el?',
    comunicacion:'Que genero de cuento sirve mejor para contar lo que pasa en un sitio?',
    math:'Como recojo datos y que grafico dice la verdad sobre ellos?',
    english:'Can I write a narrative of 200-250 words that holds together?'
  },
  competencias:[
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir sus conocimientos',
     capacidades:['Problematiza situaciones para hacer indagacion',
                  'Disena estrategias para hacer indagacion','Genera y registra datos o informacion',
                  'Analiza datos e informacion']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos sobre los seres vivos, materia y energia, biodiversidad, Tierra y universo',
     capacidades:['Comprende y usa conocimientos sobre materia y energia',
                  'Evalua las implicancias del saber y del quehacer cientifico y tecnologico']},
    {area:'social', nombre:'Gestiona responsablemente el espacio y el ambiente',
     capacidades:['Comprende las relaciones entre los elementos naturales y sociales',
                  'Genera acciones para conservar el ambiente local y global']},
    {area:'comunicacion', nombre:'Escribe diversos tipos de textos en su lengua materna',
     capacidades:['Adecua el texto a la situacion comunicativa',
                  'Organiza y desarrolla las ideas de forma coherente y cohesionada',
                  'Reflexiona y evalua la forma, el contenido y el contexto del texto escrito']},
    {area:'math', nombre:'Resuelve problemas de gestion de datos e incertidumbre',
     capacidades:['Representa datos con graficos y medidas estadisticas',
                  'Usa estrategias y procedimientos para recopilar y procesar datos']}
  ],
  producto:{
    titulo:'The Territory File',
    audiencia:'La coordinacion del colegio, que recibe la investigacion de residuos; y la '+
      'antologia de la clase, que recoge los cuentos y se queda en la biblioteca.',
    descripcion:'Una investigacion con pregunta, variables e hipotesis sobre lo que nuestro '+
      'colegio tira, con sus datos y su conclusion; y un cuento del genero que cada uno eligio, '+
      'situado en ese mismo territorio.',
    incluye:['Mi pregunta de investigacion y mis variables','Mi hipotesis, escrita antes de medir',
             'La tabla y el grafico de lo que medimos','La conclusion, con lo que la hipotesis acerto y fallo',
             'Mi cuento de 200 a 250 palabras','El analisis critico del genero que elegi']
  },
  fases:[
    {n:1, periodo:1, semana:1, fase:'De que esta hecho', foco:'What matter is made of',
     hace:'Particulas pequenas, atomos y particulas subatomicas. Social abre con los acuerdos de '+
       'aula: las reglas de este territorio. En Comunicacion arranca el cuento policial.',
     evidencia:'Particle model'},
    {n:2, periodo:1, semana:2, fase:'De que esta hecho', foco:'Question, variables, hypothesis',
     hace:'Pregunta de investigacion, tipos de variable (dependiente e independiente) y '+
       'formulacion de hipotesis. Es la herramienta central del arco y llega en la semana 2.',
     evidencia:'My first hypothesis'},
    {n:3, periodo:1, semana:3, fase:'De que esta hecho', foco:'Physical changes',
     hace:'Cambios fisicos: tipos de mezcla, estados de la materia, fuerzas de repulsion y '+
       'cohesion. Autorregulacion en Social. El cuento urbano realista en Comunicacion.',
     evidencia:'Mixture test'},
    {n:4, periodo:1, semana:4, fase:'De que esta hecho', foco:'Separating a mixture',
     hace:'Se sigue con cambios fisicos, ahora aplicados: como se separa lo que hemos mezclado. '+
       'Reglas de nuestra comunidad, igualdad y respeto en Social.',
     evidencia:'Separation method'},
    {n:5, periodo:1, semana:5, fase:'De que esta hecho', foco:'Chemical changes',
     hace:'Cambios quimicos: reacciones reversibles e irreversibles. Que se puede deshacer y que '+
       'no, que es exactamente la pregunta de un vertedero. Conflictos en Social.',
     evidencia:'Reversible or not'},
    {n:6, periodo:1, semana:6, fase:'De que esta hecho', foco:'Territorial issues',
     hace:'Cierre de P1: "territorial issues" en Social y analisis critico del genero de cuento '+
       'preferido en Comunicacion. Cada alumno fija ya el genero de su cuento.',
     evidencia:'Genre chosen, with the reason'},
    {n:7, periodo:2, semana:1, fase:'Que le hacemos', foco:'Kingdoms of living things',
     hace:'Arranca P2. Reinos de los seres vivos: quien mas vive en este territorio. En English '+
       'empieza el libro "The lost city".', evidencia:'Kingdom sort'},
    {n:8, periodo:2, semana:2, fase:'Que le hacemos', foco:'What we throw away',
     hace:'Impacto humano: problemas ambientales y gestion de residuos, vertederos y centros de '+
       'reciclaje. Se pesa o se cuenta lo que el colegio tira en un dia. Aqui entra la hipotesis '+
       'de la semana 2 con un objeto real.', evidencia:'Waste count, day 1'},
    {n:9, periodo:2, semana:3, fase:'Que le hacemos', foco:'Pollution and habitat loss',
     hace:'Contaminacion, deforestacion, perdida de habitat y depredacion. Sigue el conteo. '+
       'Problemas de varios pasos y ecuaciones de una variable en Math.',
     evidencia:'Week of data'},
    {n:10, periodo:2, semana:4, fase:'Contar la historia', foco:'Choosing the graph',
     hace:'Recoleccion de datos con preguntas abiertas y cerradas y graficos de barras, de lineas '+
       'y de puntos. Cual dice la verdad sobre nuestro dato? En English, las decisiones del autor.',
     evidencia:'Graph + why this one'},
    {n:11, periodo:2, semana:5, fase:'Contar la historia', foco:'The file and the story',
     hace:'Conclusion de la investigacion contrastada con la hipotesis, y version final del '+
       'cuento de 200 a 250 palabras. Se entregan juntos: son el mismo territorio.',
     evidencia:'Territory File'}
  ],
  evaluacion:[
    {criterio:'Formulo una hipotesis comprobable',
     descriptor:'Su hipotesis nombra la variable que cambia y la que se mide, y se escribio antes de los datos.'},
    {criterio:'Recojo datos honestos',
     descriptor:'La serie esta completa, y cuando el dato contradice la hipotesis lo deja escrito igual.'},
    {criterio:'Elijo la representacion',
     descriptor:'Justifica por que ese grafico y no otro para sus datos.'},
    {criterio:'Escribo un cuento del genero elegido',
     descriptor:'El cuento cumple lo que define su genero, cabe en 200-250 palabras y se sostiene solo.'}
  ],
  diferenciacion:[
    'El conteo de residuos admite peso, volumen o numero de piezas: se elige uno y se mantiene.',
    'El cuento se puede escribir en castellano (Comunicacion) o en ingles (English); no las dos veces.',
    'Quien necesite apoyo escribe la conclusion con un guion de tres frases: esperaba / paso / por eso.'
  ],
  sad:{titulo:'Student Achievement Day #1',
    muestra:'El alumno ensena su hipotesis original al lado de su conclusion y explica en que se '+
      'equivoco. Eso es lo que se le pide: no acertar, sino saber que le dijeron los datos.'},
  unidades:[],
  revisar:['Pesar o contar la basura del colegio necesita permiso y guantes. Si no se puede, el '+
           'conteo se limita al aula y se dice que es una muestra, no el colegio entero.',
           'El plan de 5.o marca "Solo son 5 semanitas" en P2: el arco ya cuenta 5, no 6.']
},

'g5.p4p5': {
  grade:'g5', label:'Grade 5', trimestre:2, periodos:[4,5], semanas:11,
  inicio:'2026-08-04', fin:'2026-10-23',
  cruzaTrimestre:true,
  cover:{icon:'🔬', from:'#14503f', to:'#4fa886'},
  titulo:'Scientific Field Researchers',
  subtitulo:'Descubriendo la ciencia detras de las comunidades de Cajamarca',
  autoria:'Documento del colegio. Este arco NO lo propone el portal: esta escrito por el equipo '+
    'de 5.o en "Projects 4 & 5.docx" (Master Plan + Project Overview & Teacher Planning Guide). '+
    'Aqui se transcribe para que el portal lo ejecute; la fuente manda.',
  areaEje:'science', areasArticuladas:['social','english','math'],
  situacion:'Las comunidades de Cajamarca han desarrollado diferentes formas de relacionarse con '+
    'su territorio mediante actividades productivas, culturales y sociales. Durante el viaje de '+
    'estudios, los estudiantes observaran como los seres vivos, los recursos naturales, las '+
    'actividades humanas y la tecnologia interactuan para permitir la vida comunitaria y la '+
    'produccion sostenible. A partir de estas experiencias desarrollaran una mirada cientifica '+
    'que les permitira comprender fenomenos reales, formular preguntas investigables y disenar '+
    'investigaciones propias.',
  preguntaEsencial:'Como ayuda la ciencia a que las comunidades aprovechen los recursos naturales de forma sostenible?',
  narrativa:'Los cientificos no solamente trabajan en laboratorios. Muchas veces salen al mundo '+
    'para observar, hacer preguntas y descubrir como funciona la naturaleza. Durante nuestro '+
    'viaje a Cajamarca no iremos solamente como visitantes: iremos como cientificos de campo. '+
    'Pero un cientifico no se queda con lo que observa. Un cientifico observa, pregunta, investiga '+
    'y explica. Por eso el viaje es solo el inicio: despues elegiremos una pregunta que nos genere '+
    'curiosidad y construiremos una investigacion propia para compartirla en el Science Fair.',
  orientadoras:{
    science:'Como hacen posible los recursos naturales, los seres vivos y la tecnologia la produccion sostenible de alimentos y otros productos?',
    social:'Como utilizan las comunidades su territorio, cultura y recursos para construir su identidad y desarrollo?',
    math:'Como represento e interpreto los datos que recojo en campo?',
    english:'Can I research, take notes and give an informative talk about what I found?'
  },
  competencias:[
    {area:'science', nombre:'Indaga mediante metodos cientificos para construir conocimientos',
     capacidades:['Problematiza situaciones — formula preguntas sobre fenomenos observados',
                  'Disena estrategias para hacer indagacion — planifica formas de obtener evidencias',
                  'Genera y registra datos — recopila informacion mediante observaciones y registros',
                  'Analiza datos e informacion — identifica patrones y relaciones',
                  'Evalua y comunica — construye conclusiones y comparte aprendizajes']},
    {area:'science', nombre:'Explica el mundo fisico basandose en conocimientos cientificos',
     capacidades:['Comprende y usa conocimientos cientificos — explica relaciones entre seres vivos, ambiente, recursos, transformacion de materiales y procesos productivos',
                  'Evalua las implicancias del saber cientifico y tecnologico — reflexiona sobre como las decisiones humanas impactan el ambiente y las comunidades']}
  ],
  conceptos:[
    {nombre:'Sistemas', idea:'Los elementos de un sistema interactuan y generan cambios.'},
    {nombre:'Interdependencia', idea:'Los seres vivos dependen unos de otros y del ambiente.'},
    {nombre:'Recursos naturales', idea:'Los recursos del ambiente permiten satisfacer necesidades humanas.'},
    {nombre:'Transformacion', idea:'La ciencia y la tecnologia permiten transformar recursos en productos.'},
    {nombre:'Sostenibilidad', idea:'Las comunidades deben utilizar recursos considerando su conservacion futura.'}
  ],
  producto:{
    titulo:'Scientific Field Report + Science Fair Research Project',
    audiencia:'La comunidad escolar en el Science Fair, y las familias en el Student Achievement Day.',
    descripcion:'En P4, un informe de campo con observaciones, evidencias, explicaciones y nuevas '+
      'preguntas. En P5, una investigacion propia con pregunta cientifica, proceso, evidencia, '+
      'conclusion y comunicacion.',
    incluye:['Scientific Field Journal','Evidence Map','Scientific Explanation Card',
             'Research Proposal','Investigation Blueprint','Evidence Portfolio',
             'Scientific Argument','Science Fair Presentation']
  },
  fases:[
    {n:1, periodo:4, semana:1, fase:'From Observation to Question', foco:'Developing Scientific Observation',
     hace:'Preparacion cientifica. El estudiante aprende a observar cientificamente.',
     evidencia:'Scientist Identity + Initial Ideas'},
    {n:2, periodo:4, semana:2, fase:'From Observation to Question', foco:'Preparing Scientific Investigation',
     hace:'Preparacion del viaje. El estudiante define que observara y por que.',
     evidencia:'Scientific Observation Plan'},
    {n:3, periodo:4, semana:3, fase:'From Observation to Question', foco:'Field Research Experience',
     hace:'Viaje a Cajamarca. El estudiante recolecta evidencias durante el viaje.',
     evidencia:'Scientific Field Journal'},
    {n:4, periodo:4, semana:4, fase:'From Observation to Question', foco:'Organizing Evidence',
     hace:'Analisis de evidencias. El estudiante identifica relaciones y patrones.',
     evidencia:'Evidence Map'},
    {n:5, periodo:4, semana:5, fase:'From Observation to Question', foco:'Building Scientific Explanations',
     hace:'Explicaciones cientificas. El estudiante explica fenomenos utilizando evidencia.',
     evidencia:'Scientific Explanation Card'},
    {n:6, periodo:4, semana:6, fase:'From Observation to Question', foco:'Generating New Questions',
     hace:'Cierre de P4. El estudiante transforma aprendizajes en una nueva investigacion.',
     evidencia:'Research Proposal'},
    {n:7, periodo:5, semana:1, fase:'From Question to Investigation', foco:'Choosing My Research Question',
     hace:'Inicio de P5 y Student Achievement Day #2.',
     evidencia:'Research Proposal Presentation'},
    {n:8, periodo:5, semana:2, fase:'From Question to Investigation', foco:'Designing My Investigation',
     hace:'Diseno de la investigacion.', evidencia:'Investigation Blueprint'},
    {n:9, periodo:5, semana:3, fase:'From Question to Investigation', foco:'Collecting Evidence',
     hace:'Desarrollo experimental.', evidencia:'Evidence Portfolio'},
    {n:10, periodo:5, semana:4, fase:'From Question to Investigation', foco:'Constructing Scientific Explanation',
     hace:'Interpretacion y comunicacion.', evidencia:'Scientific Argument'},
    {n:11, periodo:5, semana:5, fase:'From Question to Investigation', foco:'Sharing Scientific Knowledge',
     hace:'Science Fair.', evidencia:'Science Fair Presentation'}
  ],
  evaluacion:[
    {criterio:'Investigacion cientifica',
     descriptor:'Formula preguntas, recoge evidencias, analiza informacion y comunica conclusiones.'},
    {criterio:'Explicacion cientifica',
     descriptor:'Utiliza conceptos cientificos, relaciona causas y efectos y argumenta usando evidencia.'},
    {criterio:'Pensamiento reflexivo',
     descriptor:'Identifica aprendizajes, reconoce dificultades y propone mejoras.'}
  ],
  diferenciacion:[
    'El proyecto permite distintos caminos para demostrar aprendizaje: escritura, modelos visuales, '+
      'exposiciones orales, prototipos, videos o maquetas.',
    'La expectativa comun permanece: todos deben demostrar una pregunta, evidencia y explicacion cientifica.'
  ],
  rolDocente:'El docente no actua como transmisor principal de informacion, sino como facilitador '+
    'cientifico: ayuda a formular preguntas, validar metodos, interpretar evidencia y construir '+
    'explicaciones. Sus cuatro preguntas de cabecera son "que evidencia tienes?", "que te hace '+
    'pensar eso?", "que concepto cientifico ayuda a entenderlo?" y "que cambiarias si tuvieras '+
    'otra oportunidad?".',
  sad:{titulo:'Student Achievement Day #2',
    muestra:'"My Scientific Journey": lo que sabia antes, lo que descubrio durante el viaje, las '+
      'evidencias recogidas y su nueva pregunta de investigacion.'},
  unidades:[{n:5, titulo:'Unidad 5 del portal'}],
  revisar:['Este arco cruza el corte de trimestre: P4 cierra el 2.o y P5 abre el 3.o. Las notas '+
           'del 2.o trimestre se ponen con el Research Proposal, no con el Science Fair.',
           'El Science Fair de la semana 11 tiene que estar en el calendario del colegio; hoy el '+
           'calendario solo marca "Shark tank? STEAM DAY?" con interrogante.']
},

/* MAS-GRADOS-AQUI */
};

/* Periodos de primaria que NO estan dentro de un arco, y por que. Se dice en
   claro: media programacion presentada como proyecto ensena menos que decir
   que ese periodo va suelto. */
window.PROJECT_ARCS_SUELTOS = [
  {grade:'g5', periodos:[3], titulo:'Peruvian History',
   motivo:'5.o dedica P3 a la historia del Peru (derechos del consumidor, publicidad, siglos y '+
     'epocas, Virreinato, Independencia) mientras Science va por cadenas troficas y fotosintesis. '+
     'No hay un cruce que aguante once semanas, y el arco del grado empieza en P4 con el viaje a '+
     'Cajamarca, que ya esta escrito por el equipo de 5.o.'},
  {grade:'g5', periodos:[6], titulo:'Universo y ahorro',
   motivo:'P6 de 5.o junta origen del universo y formacion de estrellas en Science con emociones, '+
     'ciudadania y plan de ahorro en Social. Son dos unidades legitimas y sin relacion; forzarlas '+
     'en un proyecto seria inventarla.'},
  {grade:'g1', periodos:[5,6], titulo:'P5 y P6 de 1.o, sin escribir todavia',
   motivo:'Las carpetas P5 y P6 de "Grade 1 / 8. Planning" estan vacias: no hay Project 5 ni '+
     'Project 6. Y en la hoja "Annual Plan" de 1.o esos dos periodos solo cargan English '+
     '(present simple, can, verb to be, pronombres, formacion de frases). Con eso se puede '+
     'planificar la clase de ingles, pero no un proyecto interdisciplinario de once semanas. '+
     'Cuando el equipo de 1.o escriba los dos Project.docx, se transcriben igual que los cuatro '+
     'primeros.'}
];
