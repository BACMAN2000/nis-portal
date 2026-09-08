/* Proyectos interdisciplinarios de SECUNDARIA — NIS 2026.
 *
 * DE DONDE SALE ESTO, Y QUE PARTE ES NUESTRA
 * El colegio tiene el formato hecho: `3. Secondary /Pedagogical Documents/
 * Proyectos/` guarda cinco carpetas (Proyecto 1 U2 Mayo, Proyecto 2 U3 Junio,
 * Proyecto 3 U4 Agosto, Unidad 5 Setiembre, Proyecto 5 U6 Noviembre) y en
 * cada una un documento por grado, de 6.o a 11.o. Cada documento es una tabla
 *
 *     Area | Contenidos/Conceptos clave | Posibles conexiones con otras areas
 *
 * y la unidad dura SEIS SEMANAS, escrito en la propia cabecera.
 *
 * Los contenidos estan escritos por los profesores. **La tercera columna esta
 * practicamente vacia en los 30 documentos**: hay trece notas sueltas del
 * tipo "Arte?", "Musica???", "Philosophy?" o "Podcast about history". Es
 * decir: el colegio abrio la conversacion interdisciplinaria y se quedo ahi.
 *
 * Existe UN documento con la columna llena, y ademas con tematicas comunes,
 * producto integrador, cronograma y evaluacion: "EJEMPLO UNIDAD 2 - DURACION:
 * 6 SEMANAS" (9.o, "Emprendimiento sostenible: soluciones locales para
 * desafios globales"). **Ese ejemplo es el molde**, y todo lo que sigue lo
 * copia campo a campo: TEMATICAS COMUNES IDENTIFICADAS · PRODUCTO INTEGRADOR
 * PROPUESTO · CRONOGRAMA SUGERIDO · EVALUACION.
 *
 * Entonces:
 *   - Los CONTENIDOS de cada area son del colegio. Se leen en vivo de
 *     scope/secundaria-conexiones-2026.json y no se retocan.
 *   - Las CONEXIONES, el producto, el cronograma y la evaluacion son
 *     PROPUESTA DEL PORTAL. Salen marcados como tal en pantalla, para que
 *     coordinacion los apruebe, los cambie o los tire.
 *
 * IDIOMA. Lo que ve el alumno va bilingue, como el resto del portal:
 * L('English','castellano'). Lo que va a la reunion de coordinacion —
 * situacion, tematicas, conexiones por area, evaluacion y avisos — va en
 * castellano y solo en castellano: es el documento del colegio, y su lengua
 * de trabajo es esa. Traducirlo lo convertiria en otra cosa.
 *
 * LO QUE NO ESTA, Y POR QUE
 *   - U1 no tiene documento de proyecto: el colegio empieza a proyectar en la
 *     U2. No se inventa uno.
 *   - U5 (setiembre) esta a medio cargar: en los seis grados faltan
 *     Comunicacion, Ciencias Sociales, ICT y PE, y en varios tambien Ingles y
 *     Ciencia. La propuesta se apoya en lo unico que si esta cargado, que
 *     resulta ser el ancla real de esa unidad: el Creative Arts Show.
 *   - U6 (noviembre) esta VACIO en los seis grados, y ademas los seis
 *     documentos son la misma plantilla copiada: dicen "GRADO: 6 / UNIDAD 3".
 *     Ahi no hay propuesta, hay un pedido a coordinacion.
 */
(function(){
const L = (en, es) => ({en: en, es: es});

/* Escalera Cambridge del colegio (decision del 31-ago-2026): un nivel cada
   dos anos, el primero construye y el segundo examina. */
const CAMBRIDGE = {
  6:  'A2 Key',        7:  'construcción B1',
  8:  'B1 Preliminary', 9: 'construcción B2',
  10: 'B2 First',      11: 'C1 Advanced'
};

/* Perfil del Egresado Nordic: diez competencias, numeradas como en el
   documento del colegio. Un proyecto declara a cuales apunta. */
const PERFIL = {
  1: 'Identificación cultural',      2: 'Comunicación efectiva',
  3: 'Ciudadanía global',            4: 'Expresión artística',
  5: 'Socioemocional',               6: 'Vida saludable',
  7: 'Emprendimiento con impacto social', 8: 'Pensamiento crítico',
  9: 'Digital',                      10: 'Ético espiritual'
};

/* s(): una semana del cronograma. `tipo` es la lamina de project-art.js con
   la que se dibuja la entrega. */
function s(n, foco, hace, evidencia, tipo, aliento){
  return {n: n, foco: foco, hace: hace, evidencia: evidencia, tipo: tipo, aliento: aliento};
}

/* Los documentos del colegio no nombran las areas igual en todos los grados:
   hay "Ciencia y Tecnologia" y "Science", "Arte y Cultura" y "Arte y Cultura
   Drama", "ICT" e "ICT EPT", y hasta "ICT/ Ciencia y Tecnologia (Science)
   Competencia 3...". Esto reduce cualquiera de esos nombres a una clave, que
   es con la que se casan las conexiones propuestas. Si un dia aparece un
   nombre nuevo, devuelve null y la pagina lo dice en vez de perderlo. */
function claveArea(nombre){
  const n = String(nombre || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '');
  if(!n) return null;
  if(n.indexOf('comunicacion') === 0) return 'com';
  if(n.indexOf('matematica') === 0) return 'mat';
  if(n.indexOf('ciencias sociales') === 0) return 'ccss';
  if(n.indexOf('ciencia y tecnologia') === 0 || n.indexOf('science') === 0) return 'cyt';
  if(n.indexOf('arte') === 0) return 'arte';
  if(n.indexOf('ict') === 0 || n.indexOf('educacion para el trabajo') === 0) return 'ict';
  if(n.indexOf('ingles') === 0 || n.indexOf('english') === 0) return 'ing';
  if(n.indexOf('pe') === 0) return 'pe';
  if(n.indexOf('spiritual') === 0) return 'sh';
  if(n.indexOf('franc') === 0) return 'fr';
  if(n.indexOf('philosophy') === 0 || n.indexOf('filosof') === 0) return 'fil';
  if(n.indexOf('enterprise') === 0) return 'ent';
  return null;
}
const AREA_NOMBRE_SEC = {
  com:'Comunicación', mat:'Matemática', cyt:'Ciencia y Tecnología', ccss:'Ciencias Sociales',
  arte:'Arte y Cultura', ict:'ICT', ing:'Inglés', pe:'PE', sh:'Spiritual History',
  fr:'Français', fil:'Philosophy', ent:'Enterprise'
};

window.PROJECT_SEC_AREA_KEY = claveArea;
window.PROJECT_SEC_AREA_NOMBRE = AREA_NOMBRE_SEC;
window.PROJECT_SEC_CAMBRIDGE = CAMBRIDGE;
window.PROJECT_SEC_PERFIL = PERFIL;

window.PROJECT_SEC = {
/* ============================================ UNIDAD 2 · Proyecto 1 · Mayo */

'g6.u2': {
  grado:6, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'🛡️', from:'#7c2d12', to:'#ea9a4a'},
  titulo:L('The hero we needed','El héroe que hizo falta'),
  preguntaEsencial:L('Why does a community need to tell stories about heroes?',
                     '¿Por qué una comunidad necesita contar historias de héroes?'),
  situacion:'El Cid no es un señor que existió: es un señor que a un pueblo le hizo falta contar. '+
    'La misma unidad en que 6.º lee un cantar de gesta estudia en Ciencias Sociales cómo un grupo '+
    'humano sobrevive cazando y recolectando, y en ICT cómo se identifica y se resuelve un problema '+
    'del entorno. Son la misma pregunta con tres sujetos: qué necesita un grupo, quién lo resuelve, '+
    'y cómo se cuenta después para que el grupo lo recuerde.',
  tematicas:[
    {nombre:'Lo que un grupo necesita para sobrevivir',
     aporta:[['ccss','Caza, recolección, autosuficiencia y uso de recursos'],
             ['ict','Identificación y análisis de un problema tecnológico real'],
             ['pe','Balonmano: cooperar, repartir roles y leer al equipo']]},
    {nombre:'La historia que el grupo se cuenta a sí mismo',
     aporta:[['com','Cantar de gesta, el cómic y sus elementos, breve historia del español'],
             ['ing','Our school stories: describir experiencias con present perfect'],
             ['arte','Acordes y emociones: qué tonalidad sostiene qué sentimiento']]},
    {nombre:'Las fuerzas que mueven el mundo donde ocurre',
     aporta:[['cyt','Fuerzas y energía, gravedad, peso y masa, movimiento en el espacio'],
             ['ict','Diseño, construcción y prueba de una solución tecnológica']]}
  ],
  areas:{
    com:'Con Arte, la banda sonora del episodio; con Inglés, la misma gesta contada en inglés; con '+
        'ICT, el cómic maquetado con herramientas digitales y prompts de imagen usados con criterio.',
    cyt:'Con ICT, las fuerzas que la solución tecnológica tiene que vencer (peso, rozamiento) '+
        'aparecen en el boceto, no como teoría aparte.',
    ccss:'Con Comunicación, el héroe del cantar y el grupo que caza y recolecta responden a la misma '+
         'pregunta: quién resuelve lo que el grupo no puede resolver solo.',
    arte:'Con Comunicación, la tonalidad y los acordes de la escena decisiva del cómic.',
    ict:'Con Ciencias Sociales, el problema que se resuelve es del colegio, no inventado; con CyT, el '+
        'diseño declara las fuerzas en juego; el debate de uso ético de la IA se hace sobre el propio '+
        'cómic, que es donde la clase la va a usar.',
    ing:'Con Comunicación, Our school stories es el mismo episodio en la otra lengua; el present '+
        'perfect es justo el tiempo de contar lo que ha pasado y todavía importa.',
    pe:'Con Ciencias Sociales, la cooperación del equipo de balonmano se lee como lo que hace posible '+
       'la caza en grupo: roles, turnos y comunicación.'
  },
  producto:{
    titulo:L('The gesta of our school','La gesta de nuestro colegio'),
    descripcion:L('A collective comic that tells a real episode of the school as a chanson de geste: '+
      'somebody solved a problem that the group could not solve alone. With its own soundtrack, its '+
      'English version and the prototype of the solution.',
      'Un cómic colectivo que cuenta un episodio real del colegio como un cantar de gesta: alguien '+
      'resolvió un problema que el grupo no podía resolver solo. Con banda sonora propia, su versión '+
      'en inglés y el prototipo de la solución.'),
    incluye:[L('The comic, page by page','El cómic, página a página'),
             L('The soundtrack of the decisive scene','La banda sonora de la escena decisiva'),
             L('The English version of the story','La versión en inglés de la historia'),
             L('The prototype of the solution','El prototipo de la solución')],
    modelo:{tipo:'storyboard',
      partes:[L('the problem','el problema'), L('the hero','el héroe'),
              L('what they did','qué hizo'), L('what changed','qué cambió')],
      apoyo:['This has happened before.', 'She has helped us a lot.', 'In the end, everything changed.'],
      mejora:L('A gesta is not a summary: it has ONE decisive scene. If in your comic everything '+
        'weighs the same, no panel is the important one.',
        'Una gesta no es un resumen: tiene UNA escena decisiva. Si en tu cómic todo pesa lo mismo, '+
        'no hay viñeta importante.')}
  },
  semanas:[
    s(1, L('What makes a hero','Qué hace a un héroe'),
      'Se lee el cantar y se saca qué hace que a alguien lo cuenten: no la fuerza, sino lo que resolvió '+
      'para otros. En Inglés se arranca Our school stories con el mismo criterio.',
      L('The hero card','Ficha del héroe'), 'card',
      L('Everybody knows a story about somebody who solved something. This week you find out why '+
        'that story survived.',
        'Todo el mundo conoce la historia de alguien que resolvió algo. Esta semana descubres por qué '+
        'esa historia sobrevivió.')),
    s(2, L('The group that needed one','El grupo que lo necesitaba'),
      'Ciencias Sociales: caza, recolección y autosuficiencia. Qué necesitaba el grupo y qué pasaba si '+
      'nadie lo resolvía. Se compara con el problema del colegio que se elige.',
      L('Survival timeline','Línea de tiempo de la supervivencia'), 'timeline',
      L('Before there were heroes there were problems. This week you look for the problem, not for '+
        'the hero.',
        'Antes que los héroes están los problemas. Esta semana buscas el problema, no al héroe.')),
    s(3, L('The problem of today','El problema de hoy'),
      'ICT: se identifica y se analiza un problema tecnológico real del colegio y se escriben los '+
      'primeros prompts. El debate de uso ético de la IA se hace aquí, sobre el uso que la clase le '+
      'va a dar de verdad.',
      L('The problem, stated','El problema, planteado'), 'question',
      L('Choosing a problem you can actually solve is harder than choosing a big one. This week you '+
        'choose small and real.',
        'Elegir un problema que de verdad puedes resolver es más difícil que elegir uno grande. Esta '+
        'semana eliges pequeño y real.')),
    s(4, L('The forces at play','Las fuerzas en juego'),
      'CyT: fuerzas, gravedad, peso y masa aplicadas al boceto de la solución. El diseño tiene que '+
      'decir qué fuerza vence y con qué.',
      L('Sketch with its forces','Boceto con sus fuerzas'), 'plan',
      L('A drawing that does not say what holds it up is a drawing, not a design.',
        'Un dibujo que no dice qué lo sostiene es un dibujo, no un diseño.')),
    s(5, L('The comic and its music','El cómic y su música'),
      'Se montan las viñetas del episodio y se elige la tonalidad y los acordes de la escena decisiva. '+
      'Comunicación revisa conectores y tilde; Arte graba la pieza.',
      L('Panels + chord progression','Viñetas + progresión de acordes'), 'storyboard',
      L('Music tells the reader what to feel before the words do. This week you choose what they feel.',
        'La música le dice al lector qué sentir antes que las palabras. Esta semana eliges qué siente.')),
    s(6, L('The gesta, told','La gesta, contada'),
      'Presentación oral del cómic en castellano y en inglés, con el prototipo en la mano. Se entrega '+
      'a la biblioteca del colegio.',
      L('The gesta presented','La gesta presentada'), 'speech',
      L('Today the school hears its own story. Say it slowly: it is the first time somebody tells it.',
        'Hoy el colegio escucha su propia historia. Dila despacio: es la primera vez que alguien la cuenta.'))
  ],
  evaluacion:[
    {dimension:'Estructura narrativa y lengua', areas:'COM · ING',
     descriptor:'El episodio tiene planteamiento, escena decisiva y consecuencia, y se sostiene en las dos lenguas.'},
    {dimension:'Comprensión histórica', areas:'CC.SS',
     descriptor:'Relaciona lo que el grupo necesitaba con lo que el héroe resolvió, sin convertirlo en anécdota.'},
    {dimension:'Rigor del diseño', areas:'CyT · ICT',
     descriptor:'El boceto nombra las fuerzas que la solución vence y el prototipo responde al problema elegido.'},
    {dimension:'Expresión sonora', areas:'ARTE',
     descriptor:'La tonalidad elegida sostiene la emoción de la escena y sabe explicar por qué.'},
    {dimension:'Cooperación', areas:'PE · todas',
     descriptor:'Reparte roles, cumple el suyo y ayuda a que el equipo llegue, como en la jugada colectiva.'}
  ],
  perfil:[1,2,4,8],
  revisar:['Matemática no aparece en el documento de 6.º para esta unidad: o se carga o el proyecto no la cuenta.',
           'El debate de IA de ICT necesita acordarse con Comunicación antes de la semana 3, o se hace dos veces.']
},

'g7.u2': {
  grado:7, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'🏛️', from:'#164e63', to:'#5eb1c9'},
  titulo:L('The myth that founds a city','El mito que funda una ciudad'),
  preguntaEsencial:L('What story does a people tell to justify what it is?',
                     '¿Qué historia cuenta un pueblo para justificar lo que es?'),
  situacion:'Roma no empieza con una ciudad: empieza con dos hermanos, una loba y un asesinato. '+
    'En la misma unidad, 7.º estudia en Ciencias Sociales la fundación de Roma y sus fronteras, en '+
    'Comunicación el género dramático y la caracterización de personajes, en Inglés los mitos y '+
    'leyendas, y en Matemática rectas, ángulos y cuadriláteros — que es, exactamente, con lo que se '+
    'traza una ciudad. El mito y el plano son las dos formas de fundar.',
  tematicas:[
    {nombre:'El relato fundacional',
     aporta:[['ccss','Rómulo y Remo, República romana, Etruria, Lacio, el Palatino'],
             ['ing','Non-fiction: myths and legends; relative clauses; TED-Talk de 3 minutos'],
             ['com','Género dramático, caracterización de personajes, citas y referencias APA']]},
    {nombre:'El trazado que lo hace real',
     aporta:[['mat','Rectas y segmentos, ángulos, bisectriz, triángulos y cuadriláteros'],
             ['ict','Diseño y validación de soluciones en Tinkercad, planificación del proyecto']]},
    {nombre:'El cielo y la luz que el pueblo mira',
     aporta:[['cyt','Luz: reflexión, refracción, colores; galaxias y rocas en el espacio'],
             ['arte','Periodo Barroco: contexto histórico y análisis estructural']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, La Celestina y el mito romano se leen igual: qué quiere cada personaje '+
        'y qué está dispuesto a hacer. Las citas APA se practican sobre las fuentes del mito.',
    mat:'Con ICT, el plano de la ciudad fundada es el ejercicio de rectas, ángulos y cuadriláteros: la '+
        'ciudad romana en damero se traza con bisectrices y perpendiculares de verdad.',
    cyt:'Con Ciencias Sociales, el cielo que el pueblo mira explica su calendario y sus fiestas; la '+
        'óptica explica por qué su emblema se ve como se ve.',
    ccss:'Con Comunicación, la frontera política y el impuesto son lo que el mito justifica.',
    arte:'Con Comunicación, el Barroco enseña cómo un poder se representa a sí mismo con música.',
    ict:'Con Matemática, Tinkercad convierte el plano en maqueta y obliga a que las medidas cuadren.',
    ing:'Con Comunicación, la TED-Talk es la versión oral del mito, con relative clauses para encadenar '+
        'quién hizo qué y por qué.',
    pe:'El fútbol aporta lo que la ciudad necesita después del mito: reglas iguales para todos y juego limpio.'
  },
  producto:{
    titulo:L('The founded city','La ciudad fundada'),
    descripcion:L('Each team founds a city: its founding myth, its geometric layout, its Tinkercad '+
      'model, its emblem and the TED-Talk in English that tells the world why it exists.',
      'Cada equipo funda una ciudad: su mito fundacional, su trazado geométrico, su maqueta en '+
      'Tinkercad, su emblema y la TED-Talk en inglés que le cuenta al mundo por qué existe.'),
    incluye:[L('The founding myth, written','El mito fundacional, escrito'),
             L('The layout, with its measurements','El trazado, con sus medidas'),
             L('The model','La maqueta'),
             L('The 3-minute TED-Talk','La TED-Talk de 3 minutos')],
    modelo:{tipo:'plan',
      partes:[L('the main streets','las calles principales'), L('the angles','los ángulos'),
              L('the founding place','el lugar de la fundación')],
      apoyo:['This is the city that was founded by two brothers.', 'The main street, which crosses the forum, is 20 metres wide.'],
      mejora:L('Every line on your layout has to have a reason in the myth. A street that is there '+
        'because it looked nice is a street your city cannot explain.',
        'Cada línea del trazado tiene que tener una razón en el mito. Una calle que está porque '+
        'quedaba bonita es una calle que tu ciudad no sabe explicar.')}
  },
  semanas:[
    s(1, L('Myths that found','Los mitos que fundan'),
      'Rómulo y Remo, y los mitos y leyendas de Inglés. Qué justifica cada mito y a quién le conviene.',
      L('Myth analysed','Mito analizado'), 'card',
      L('Every country has a story about how it began, and none of them is neutral. This week you '+
        'find out who each story helps.',
        'Todo país tiene una historia de cómo empezó, y ninguna es neutral. Esta semana descubres a '+
        'quién le conviene cada una.')),
    s(2, L('The characters that hold it up','Los personajes que lo sostienen'),
      'La Celestina: caracterización, tema e ideas principales, citas con modelo APA. Se caracteriza '+
      'también al fundador de la ciudad propia.',
      L('Character file, with sources','Ficha de personaje, con fuentes'), 'journal',
      L('A founder without a flaw is not a character, it is a poster. Give yours something to lose.',
        'Un fundador sin defecto no es un personaje, es un cartel. Dale al tuyo algo que perder.')),
    s(3, L('The sky they look at','El cielo que miran'),
      'CyT: luz, colores, galaxias y rocas en el espacio. Qué se ve desde la ciudad y qué explica.',
      L('Sky map of the city','Mapa del cielo de la ciudad'), 'map',
      L('Before the calendar there was the sky. This week you look up on purpose.',
        'Antes del calendario estuvo el cielo. Esta semana miras hacia arriba a propósito.')),
    s(4, L('The layout','El trazado'),
      'Matemática: rectas, segmentos, ángulos y cuadriláteros. Se traza la ciudad con medidas reales y '+
      'se justifica cada eje.',
      L('Layout with measurements','Trazado con medidas'), 'plan',
      L('A city is decided with a ruler. This week your myth has to fit on graph paper.',
        'Una ciudad se decide con regla. Esta semana tu mito tiene que caber en papel cuadriculado.')),
    s(5, L('Model and emblem','Maqueta y emblema'),
      'ICT: Tinkercad, con las medidas del trazado. Arte: la pieza barroca que suena en la fundación.',
      L('Model + emblem + piece','Maqueta + emblema + pieza'), 'model',
      L('If the model does not match the layout, one of the two is lying. Find out which.',
        'Si la maqueta no coincide con el plano, uno de los dos miente. Averigua cuál.')),
    s(6, L('The founding TED-Talk','La TED-Talk fundacional'),
      'Presentación de 3 minutos en inglés, con relative clauses y el mito completo.',
      L('TED-Talk delivered','TED-Talk presentada'), 'speech',
      L('Three minutes to make somebody want to live in your city. Practise the first sentence ten times.',
        'Tres minutos para que alguien quiera vivir en tu ciudad. Practica la primera frase diez veces.'))
  ],
  evaluacion:[
    {dimension:'Coherencia del relato', areas:'COM · CC.SS · ING',
     descriptor:'El mito explica el trazado y el trazado no contradice al mito.'},
    {dimension:'Precisión geométrica', areas:'MAT',
     descriptor:'Rectas, ángulos y cuadriláteros están medidos y nombrados correctamente en el plano.'},
    {dimension:'Fundamento científico', areas:'CyT',
     descriptor:'Lo que la ciudad ve en el cielo y cómo se ve su emblema están explicados con óptica y astronomía, no con adorno.'},
    {dimension:'Producción digital', areas:'ICT',
     descriptor:'La maqueta reproduce el plano con sus proporciones y el proceso está planificado.'},
    {dimension:'Expresión oral en inglés', areas:'ING',
     descriptor:'Sostiene tres minutos con relative clauses, contacto visual y ritmo propio.'}
  ],
  perfil:[1,2,3,9],
  revisar:['El documento de 7.º nombra el área como "Ciencias Sociales English": conviene aclarar si esa unidad se dicta en inglés, porque cambia el reparto con Inglés.',
           'Spiritual History no aparece en U2 de 7.º y sí en otras unidades: comprobar si es un hueco del documento.']
},

'g8.u2': {
  grado:8, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'⚗️', from:'#3f2a56', to:'#a78bfa'},
  titulo:L('Was it written?','¿Estaba escrito?'),
  preguntaEsencial:L('When something happens, was it fate, chance or a decision somebody made?',
                     'Cuando algo pasa, ¿fue el destino, el azar o una decisión que alguien tomó?'),
  situacion:'Edipo hace todo lo posible por escapar del oráculo y, haciéndolo, lo cumple. En la misma '+
    'unidad, 8.º estudia el "descubrimiento" de América a través de los diarios de Colón, y en Ciencia '+
    'por qué unos elementos reaccionan con otros y otros no. La unidad entera se puede leer con una '+
    'sola pregunta: qué estaba determinado y qué se decidió — en una tragedia, en un viaje y en una '+
    'reacción química.',
  tematicas:[
    {nombre:'Destino, azar y decisión',
     aporta:[['com','Edipo rey, el destino, discurso argumentativo, citas textuales'],
             ['ccss','Descubrimiento de América, Colón, los diarios como fuente'],
             ['cyt','Por qué los elementos reaccionan para formar compuestos']]},
    {nombre:'La prueba que sostiene una afirmación',
     aporta:[['cyt','Diseño experimental con variables y un mínimo de 4 repeticiones'],
             ['mat','Polinomios aplicados a situaciones de la vida cotidiana'],
             ['ing','Preference surveys, main messages in texts, passive voice']]},
    {nombre:'Contarlo para que otro lo lea',
     aporta:[['ing','Write an article for a School Magazine, tone in speech'],
             ['com','Textos argumentativos y citas textuales'],
             ['arte','Renacimiento y Barroco: análisis auditivo y estructural']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el diario de Colón se lee como se lee Edipo: qué dice el que narra y '+
        'qué se le escapa. Las citas textuales se practican sobre las dos fuentes.',
    mat:'Con Ciencia, el polinomio deja de ser un ejercicio cuando modela algo del proyecto: coste de '+
        'una ruta, cantidad de reactivo, superficie.',
    cyt:'Con Comunicación, "por qué reaccionan" y "por qué ocurrió" son la misma pregunta con distinto '+
        'objeto; el diseño experimental con 4 repeticiones es lo que separa una afirmación de una opinión.',
    ccss:'Con Comunicación e Inglés, los diarios de Colón son la fuente primaria del artículo.',
    arte:'Con Comunicación, el Renacimiento y el Barroco ponen la banda sonora del "encuentro" y '+
         'enseñan que la misma historia suena distinta según quién la cuente.',
    ict:'Con ICT, la revista se maqueta y se publica; los prompts se usan y se declaran.',
    ing:'Con Comunicación, el artículo de la revista escolar es el producto: passive voice para contar '+
        'lo que se hizo sin decir quién, que es justo lo que hacen las crónicas del encuentro.',
    pe:'El juego limpio del fútbol da el contraejemplo: reglas conocidas de antemano frente a un '+
       'encuentro donde solo una parte conocía las reglas.'
  },
  producto:{
    titulo:L('The Encounter Magazine','La revista del encuentro'),
    descripcion:L('A school magazine issue that argues whether what happened was fate or decision, '+
      'with an article per team, a chemistry experiment that shows what reacts with what and why, '+
      'and a model built with polynomials.',
      'Un número de revista escolar que discute si lo que pasó fue destino o decisión, con un artículo '+
      'por equipo, un experimento de química que muestra qué reacciona con qué y por qué, y un modelo '+
      'hecho con polinomios.'),
    incluye:[L('My article, with quotations','Mi artículo, con citas'),
             L('The experiment and its data','El experimento y sus datos'),
             L('The polynomial model','El modelo con polinomios'),
             L('The published issue','El número publicado')],
    modelo:{tipo:'leaflet',
      partes:[L('the cover','la portada'), L('my article','mi artículo'),
              L('the evidence','las pruebas')],
      apoyo:['It was decided that…', 'The samples were tested four times.', 'Whether it was fate or not, …'],
      mejora:L('An argumentative article that does not name the other position is a speech. Give the '+
        'strongest version of what you disagree with, and then answer it.',
        'Un artículo argumentativo que no nombra la otra postura es un discurso. Da la versión más '+
        'fuerte de lo que rechazas y después respóndele.')}
  },
  semanas:[
    s(1, L('The oracle','El oráculo'),
      'Edipo: qué es el destino y qué es decisión. Se fija la tesis de partida de cada equipo.',
      L('Opening thesis','Tesis de partida'), 'question',
      L('You are going to argue something you might stop believing. Write it down anyway: that is how '+
        'you will notice if you changed your mind.',
        'Vas a defender algo que quizá dejes de creer. Escríbelo igual: así sabrás si cambiaste de idea.')),
    s(2, L('Columbus’ diaries','Los diarios de Colón'),
      'Ciencias Sociales: la fuente primaria. Qué cuenta, qué omite, qué palabras usa para nombrar al otro.',
      L('Source analysed','Fuente analizada'), 'journal',
      L('The person who wrote it wanted you to read it. This week you read it noticing that.',
        'Quien lo escribió quería que lo leyeras. Esta semana lo lees sabiendo eso.')),
    s(3, L('Why they react','Por qué reaccionan'),
      'Ciencia: enlaces iónico, covalente y metálico; nomenclatura; diseño del experimento con variables '+
      'independiente, dependiente y controladas, y cuatro repeticiones.',
      L('Experimental design','Diseño experimental'), 'experiment',
      L('Four repetitions is not bureaucracy: it is the difference between "it happened" and "it happens".',
        'Cuatro repeticiones no es burocracia: es la diferencia entre "pasó" y "pasa".')),
    s(4, L('Putting a number on it','Ponerle número'),
      'Matemática: polinomios aplicados a una situación real del proyecto — coste, cantidad o superficie —, '+
      'con operaciones y valor numérico.',
      L('Model with polynomials','Modelo con polinomios'), 'chart',
      L('An argument with a number behind it is twice as hard to knock down.',
        'Un argumento con un número detrás es el doble de difícil de tumbar.')),
    s(5, L('The article','El artículo'),
      'Inglés y Comunicación: artículo con passive voice, tono elegido y citas textuales de las fuentes.',
      L('Article, draft','Artículo, borrador'), 'report',
      L('It is a draft on purpose. The best part of writing is the second time.',
        'Es un borrador a propósito. Lo mejor de escribir es la segunda vez.')),
    s(6, L('The issue and the scene','El número y la escena'),
      'Se publica la revista y se representa una escena del Renacimiento o del Barroco que abre el número.',
      L('Issue published','Número publicado'), 'stand',
      L('Today somebody outside your class reads what you wrote. That changes what it is worth.',
        'Hoy alguien de fuera de tu clase lee lo que escribiste. Eso cambia lo que vale.'))
  ],
  evaluacion:[
    {dimension:'Argumentación con fuentes', areas:'COM · ING',
     descriptor:'La tesis se sostiene con citas textuales y se hace cargo de la posición contraria.'},
    {dimension:'Rigor experimental', areas:'CyT',
     descriptor:'Declara variables, repite cuatro veces y no ajusta los datos a la conclusión.'},
    {dimension:'Modelado matemático', areas:'MAT',
     descriptor:'El polinomio representa algo real del proyecto y sabe decir qué significa cada término.'},
    {dimension:'Lectura histórica de la fuente', areas:'CC.SS',
     descriptor:'Distingue lo que el diario dice de lo que el diario da por supuesto.'},
    {dimension:'Producción y publicación', areas:'ICT · ARTE',
     descriptor:'La revista se lee, se entiende y declara qué se hizo con ayuda de IA.'}
  ],
  perfil:[2,8,10],
  revisar:['El documento de 8.º nombra el área como "Science" en esta unidad y "Ciencia y Tecnología" en otras: unificar para poder cruzar automáticamente.',
           'Spiritual History no aparece en U2 de 8.º.']
},

'g9.u2': {
  grado:9, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'🎭', from:'#7f1d1d', to:'#f0a05a'},
  titulo:L('Who pays for what is worth it?','¿Quién paga lo que vale la pena?'),
  preguntaEsencial:L('Who decides what deserves to exist, and with whose money?',
                     '¿Quién decide qué merece existir, y con el dinero de quién?'),
  situacion:'El Renacimiento no ocurre porque a alguien se le ocurra pintar mejor: ocurre porque hay '+
    'quien paga. En la misma unidad, 9.º estudia el antropocentrismo, el mecenazgo y el valor del arte '+
    'en Ciencias Sociales, en ICT lleva un presupuesto personal en hoja de cálculo, en Inglés aprende a '+
    'evaluar la credibilidad de una fuente y a defender una opinión, y en Matemática calcula áreas. '+
    'Todo eso es una sola cosa: decidir qué se financia y con qué criterio.',
  tematicas:[
    {nombre:'El ser humano en el centro',
     aporta:[['ccss','Renacimiento, revolución científica, mecenazgo, valor del arte'],
             ['cyt','Origen de la vida y célula: las preguntas que por fin se pudieron hacer'],
             ['com','Jasón y los argonautas, clasicismo, mitología griega']]},
    {nombre:'El dinero que lo hace posible',
     aporta:[['ict','Organización financiera, hojas de cálculo, presupuesto, ahorro y riesgo'],
             ['mat','Áreas de figuras planas, fórmula de Herón, sectores circulares']]},
    {nombre:'El criterio con que se decide',
     aporta:[['ing','Different viewpoints, opiniones informadas, credibilidad y sesgo de las fuentes'],
             ['arte','El pop a través de la historia: qué se produce cuando hay industria detrás']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el héroe clásico y el mecenas renacentista son dos formas de decidir qué '+
        'historia merece contarse. El texto argumentativo es el alegato del proyecto.',
    mat:'Con Arte y con ICT, el área de la obra entra en el presupuesto: superficie por precio del '+
        'material. La fórmula de Herón deja de ser un ejercicio.',
    cyt:'Con Ciencias Sociales, la revolución científica es el momento en que las preguntas sobre el '+
        'origen de la vida se pueden hacer en voz alta; el diseño de investigación es la herramienta.',
    ccss:'Con ICT, el mecenazgo del siglo XV y el presupuesto del siglo XXI se comparan con los mismos criterios.',
    arte:'Con Ciencias Sociales, ejecutar una canción pop y estudiar quién la financia enseña que la '+
         'industria también es mecenazgo.',
    ict:'Con Matemática, la hoja de cálculo se llena con las áreas y los costes reales de la obra propia.',
    ing:'Con Comunicación, la discusión estructurada es el formato del jurado; evaluar sesgo es lo que '+
        'permite separar el alegato del anuncio.',
    pe:'El fútbol aporta el arbitraje: un criterio conocido de antemano y aplicado igual a todos.'
  },
  producto:{
    titulo:L('The class patronage','El mecenazgo de clase'),
    descripcion:L('Each team presents a project — an artwork, an original pop song, an investigation — '+
      'with its real budget in a spreadsheet. The class, acting as a patron with a fixed fund, decides '+
      'what to finance and has to justify it with criteria.',
      'Cada equipo presenta un proyecto — una obra, una canción pop propia, una investigación — con su '+
      'presupuesto real en hoja de cálculo. La clase, como mecenas con un fondo fijo, decide qué '+
      'financia y tiene que justificarlo con criterios.'),
    incluye:[L('The proposal and its value','La propuesta y su valor'),
             L('The budget in a spreadsheet','El presupuesto en hoja de cálculo'),
             L('The written argument','El alegato escrito'),
             L('The reasoned decision','La decisión razonada')],
    modelo:{tipo:'report',
      partes:[L('what we propose','qué proponemos'), L('what it costs','cuánto cuesta'),
              L('why it is worth it','por qué vale la pena')],
      apoyo:['We propose to…', 'The total cost is …, of which 40% is materials.',
             'This source is reliable because…'],
      mejora:L('A proposal that does not say what it gives up is not a budget. Say what you are NOT '+
        'going to do with that money.',
        'Una propuesta que no dice a qué renuncia no es un presupuesto. Di qué NO vas a hacer con ese dinero.')}
  },
  semanas:[
    s(1, L('The human at the centre','El hombre en el centro'),
      'Ciencias Sociales: antropocentrismo, revolución científica, mecenazgo. Qué cambia cuando el ser '+
      'humano se pone en el centro del cuadro.',
      L('Concept in sources','Concepto en fuentes'), 'journal',
      L('Somebody had to decide that a person was worth painting. This week you find out who and why.',
        'Alguien tuvo que decidir que una persona merecía un cuadro. Esta semana descubres quién y por qué.')),
    s(2, L('What makes a source credible','Qué hace creíble una fuente'),
      'Inglés: sesgo, credibilidad, contraste de fuentes. Se evalúan las fuentes que sostendrán el alegato.',
      L('Sources evaluated','Fuentes evaluadas'), 'sort',
      L('Half of what you will read this term wants something from you. This week you learn to see what.',
        'La mitad de lo que leas este trimestre quiere algo de ti. Esta semana aprendes a ver el qué.')),
    s(3, L('The work and its geometry','La obra y su geometría'),
      'Matemática: áreas de regiones triangulares, cuadrangulares y circulares aplicadas a la obra o al '+
      'montaje propio. Herón entra donde no hay altura.',
      L('The work, with its measurements','La obra, con sus medidas'), 'plan',
      L('Measuring your own work is the first honest thing you do with it.',
        'Medir tu propia obra es lo primero honesto que haces con ella.')),
    s(4, L('The budget','El presupuesto'),
      'ICT: hoja de cálculo con costes, ahorro y riesgo. El área calculada se convierte en coste de material.',
      L('Budget in a spreadsheet','Presupuesto en hoja de cálculo'), 'chart',
      L('A number in a spreadsheet is a promise. Make one you can keep.',
        'Un número en una hoja de cálculo es una promesa. Haz una que puedas cumplir.')),
    s(5, L('The argument','El alegato'),
      'Comunicación e Inglés: texto argumentativo y discusión estructurada. Se prepara la defensa y la '+
      'respuesta a la objeción más fuerte.',
      L('Written argument','Alegato escrito'), 'report',
      L('Prepare the objection you fear most. Whoever only prepares their own speech loses in minute two.',
        'Prepara la objeción que más miedo te da. Quien solo prepara su discurso pierde en el minuto dos.')),
    s(6, L('The fund decides','El fondo decide'),
      'Presentación ante el jurado de clase, votación con criterios publicados y acta de la decisión.',
      L('Reasoned decision','Decisión razonada'), 'speech',
      L('Today somebody else decides about your work. Listening to why is worth more than winning.',
        'Hoy otro decide sobre tu trabajo. Escuchar por qué vale más que ganar.'))
  ],
  evaluacion:[
    {dimension:'Argumentación y evaluación de fuentes', areas:'ING · COM',
     descriptor:'Defiende con razones y distingue una fuente fiable de una interesada.'},
    {dimension:'Cálculo y presupuesto', areas:'MAT · ICT',
     descriptor:'Las áreas están bien calculadas y el presupuesto cuadra con ellas.'},
    {dimension:'Comprensión histórica', areas:'CC.SS',
     descriptor:'Relaciona mecenazgo y financiación actual sin igualarlos sin más.'},
    {dimension:'Producción artística', areas:'ARTE',
     descriptor:'La obra o la interpretación responde a la propuesta presentada.'},
    {dimension:'Decisión razonada', areas:'todas',
     descriptor:'El acta explica con qué criterio se decidió, no solo qué se decidió.'}
  ],
  perfil:[4,7,8],
  revisar:['El EJEMPLO oficial del colegio (Emprendimiento sostenible) es de 9.º U2: si coordinación prefiere ese, este queda como alternativa y no se hacen los dos.',
           'ICT en 9.º trae finanzas personales, no emprendimiento: el producto se apoya en eso.']
},

'g10.u2': {
  grado:10, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'⛓️', from:'#134e4a', to:'#5ec8ae'},
  titulo:L('What being free cost','Lo que costó ser libres'),
  preguntaEsencial:L('Independence from what, and paid for by whom?',
                     '¿Independencia de qué, y pagada por quién?'),
  situacion:'Medea rompe con todo lo que la sostenía y el precio lo pagan otros. En la misma unidad, '+
    '10.º estudia la independencia sudamericana, la rebelión de Túpac Amaru, la economía de saqueo y '+
    'el sistema de tributos; en Inglés trabaja los condicionales mixtos, que son exactamente la forma '+
    'de decir "qué habría pasado si"; y en Arte, el Land Art, que interviene el territorio con lo que '+
    'el territorio tiene. La unidad es una sola pregunta con tres respuestas.',
  tematicas:[
    {nombre:'Romper con lo que sostiene',
     aporta:[['com','Medea, textos argumentativos, intertextualidad'],
             ['ccss','Túpac Amaru, movimiento independentista, distribución territorial'],
             ['fil','Humanismo: qué nos hace humanos, razón y experiencia']]},
    {nombre:'El precio y quién lo paga',
     aporta:[['ccss','Economía de saqueo, sistema de tributos'],
             ['ing','Mixed conditionals, temas subyacentes en artículos']]},
    {nombre:'Decirlo donde se vea',
     aporta:[['arte','Land Art, Surrealismo, Dadaísmo, Op art, Ultraísmo'],
             ['ing','Debates, análisis de TED Talk, escribir un artículo']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, Medea y la independencia se leen con la misma pregunta: qué se rompe y '+
        'quién queda debiendo. La intertextualidad es la herramienta.',
    cyt:'Ciencia y Tecnología va en paralelo con su propia unidad (transporte y respiración celular) y '+
        'aporta al proyecto el método: diseño de investigación para sostener afirmaciones con datos. '+
        'No se fuerza el contenido.',
    ccss:'Con Inglés, los condicionales mixtos permiten trabajar el contrafactual histórico con rigor '+
         'en vez de con opinión.',
    arte:'Con Ciencias Sociales, el Land Art interviene el territorio del que se habla: la obra se hace '+
         'en el patio, con materiales del sitio, y se documenta.',
    ing:'Con Comunicación, el artículo y el debate son el mismo argumento en dos formatos.',
    fil:'Con Comunicación, el humanismo da el criterio para juzgar a Medea y a los protagonistas de la independencia.',
    pe:'El fútbol aporta el marco de reglas iguales; la unidad discute qué pasa cuando no lo son.'
  },
  producto:{
    titulo:L('The trial of independence','El juicio a la independencia'),
    descripcion:L('A formal debate on what independence cost and who paid it, backed by a researched '+
      'article and a Land Art intervention in the school grounds that makes the territory visible.',
      'Un debate formal sobre qué costó la independencia y quién lo pagó, apoyado en un artículo '+
      'documentado y una intervención de Land Art en el colegio que hace visible el territorio.'),
    incluye:[L('The researched article','El artículo documentado'),
             L('The counterfactual scenario','El escenario contrafactual'),
             L('The Land Art intervention, documented','La intervención de Land Art, documentada'),
             L('The debate','El debate')],
    modelo:{tipo:'speech',
      partes:[L('my claim','mi tesis'), L('my evidence','mis pruebas'),
              L('the strongest objection','la objeción más fuerte')],
      apoyo:['If the tribute system had not existed, the economy would be different today.',
             'The underlying theme of this article is…', 'That is a fair point, however…'],
      mejora:L('In a debate, whoever repeats their argument louder has already lost. Prepare the answer '+
        'to the objection, not a second version of your speech.',
        'En un debate, quien repite su argumento más alto ya perdió. Prepara la respuesta a la '+
        'objeción, no una segunda versión de tu discurso.')}
  },
  semanas:[
    s(1, L('Medea breaks','Medea rompe'),
      'Comunicación: Medea y la ruptura. Qué se rompe, qué se gana y qué se pierde. Tesis inicial.',
      L('Thesis on the break','Tesis sobre la ruptura'), 'question',
      L('Every freedom is bought from somebody. This week you start asking from whom.',
        'Toda libertad se le compra a alguien. Esta semana empiezas a preguntar a quién.')),
    s(2, L('The economy of plunder','La economía del saqueo'),
      'Ciencias Sociales: tributos, saqueo, distribución del territorio. Se cartografía qué salía, de '+
      'dónde y hacia dónde.',
      L('Map of extraction','Mapa de la extracción'), 'map',
      L('A map of what leaves a place explains more than a map of its borders.',
        'Un mapa de lo que sale de un sitio explica más que un mapa de sus fronteras.')),
    s(3, L('And if it had not happened?','¿Y si no hubiera pasado?'),
      'Inglés: mixed conditionals. Se construye un escenario contrafactual sostenido en datos, no en deseo.',
      L('Counterfactual scenario','Escenario contrafactual'), 'sort',
      L('"What would have happened if…" is a serious question when you answer it with evidence.',
        '"Qué habría pasado si…" es una pregunta seria cuando se responde con pruebas.')),
    s(4, L('Land Art of the territory','Land Art del territorio'),
      'Arte: intervención con materiales del sitio que hace visible lo que se extrae o lo que queda. Se '+
      'documenta en fotografía.',
      L('Documented intervention','Intervención documentada'), 'model',
      L('Land Art disappears. What stays is your photograph, so take it as if it were the work.',
        'El Land Art desaparece. Lo que queda es tu fotografía, así que tómala como si fuera la obra.')),
    s(5, L('The article','El artículo'),
      'Inglés y Comunicación: artículo detallado con tema subyacente, cohesión y precisión ortográfica.',
      L('Article, refined','Artículo, depurado'), 'report',
      L('The third draft is where the article stops sounding like homework.',
        'El tercer borrador es donde el artículo deja de sonar a tarea.')),
    s(6, L('The debate','El debate'),
      'Debate formal ante público, con réplica y turno de objeciones. Análisis posterior en formato TED Talk.',
      L('The debate held','El debate celebrado'), 'stand',
      L('You will be interrupted and that is the point. Listen to the whole objection before answering.',
        'Te van a interrumpir y de eso se trata. Escucha la objeción entera antes de responder.'))
  ],
  evaluacion:[
    {dimension:'Argumentación y debate', areas:'ING · COM',
     descriptor:'Sostiene una tesis con evidencia y responde a la objeción real, no a una versión fácil.'},
    {dimension:'Comprensión histórica', areas:'CC.SS',
     descriptor:'Explica el sistema de tributos y el saqueo con casos y cifras, no con adjetivos.'},
    {dimension:'Contrafactual con criterio', areas:'ING · CC.SS',
     descriptor:'El escenario alternativo se apoya en lo que sí ocurrió en otro sitio, no en la imaginación.'},
    {dimension:'Intervención artística', areas:'ARTE',
     descriptor:'La obra usa el territorio como material y su documentación se sostiene sola.'},
    {dimension:'Reflexión ética', areas:'FIL',
     descriptor:'Aplica el criterio humanista al juzgar decisiones históricas y literarias.'}
  ],
  perfil:[1,3,8,10],
  revisar:['En el documento de 10.º, PE y Philosophy comparten fila ("PE Philosophy"): conviene separarlas para poder evaluar por separado.',
           'Ciencia y Tecnología queda deliberadamente en paralelo: su unidad (transporte celular) no encaja con el eje y forzarla debilitaría las dos.']
},

'g11.u2': {
  grado:11, proyecto:1, unidad:2, mes:'Mayo', semanas:6,
  cover:{icon:'⚖️', from:'#1e293b', to:'#7c9cc4'},
  titulo:L('From revenge to the court','De la venganza al tribunal'),
  preguntaEsencial:L('Who puts a limit on power, and what happens when nobody does?',
                     '¿Quién le pone límite al poder, y qué pasa cuando nadie lo hace?'),
  situacion:'La Orestíada no termina con una venganza más: termina con la fundación de un tribunal. Es '+
    'el momento en que la justicia deja de ser cosa de la familia y pasa a ser cosa de la ciudad. En la '+
    'misma unidad, 11.º estudia los gobiernos totalitarios, en Filosofía qué significa ser libre, y en '+
    'Inglés prepara un discurso persuasivo sobre el impacto de la tecnología en la sociedad. Las tres '+
    'preguntan lo mismo: quién controla al que manda.',
  tematicas:[
    {nombre:'La cadena de la venganza y su corte',
     aporta:[['com','La Orestíada, venganza y justicia, texto argumentativo'],
             ['fil','Libertad, responsabilidad, derechos, teorías de la libertad']]},
    {nombre:'El poder sin límite',
     aporta:[['ccss','Totalitarismos: Stalin, Mussolini, Mao, URSS, China, comunismo'],
             ['cyt','Sistemas endocrino y nervioso: cómo responde el cuerpo al miedo y al control']]},
    {nombre:'Cómo se propaga hoy un mensaje',
     aporta:[['ing','Impacto de la tecnología en la sociedad, discurso persuasivo, presentación oral'],
             ['arte','Teatro musical contemporáneo, musical y TikTok, contextos sociales y políticos']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, la Orestíada da el modelo del juicio: el proyecto adopta su estructura.',
    cyt:'Con Filosofía, los sistemas endocrino y nervioso explican qué le pasa a un cuerpo bajo miedo '+
        'sostenido; es el puente entre el control político y la persona concreta.',
    ccss:'Con Comunicación, cada equipo instruye un caso real de poder sin límite y lo lleva a juicio.',
    arte:'Con Inglés, la pieza breve de difusión (formato musical/TikTok) es cómo se comunica hoy un '+
         'veredicto para que salga del aula.',
    ing:'Con Comunicación, el discurso persuasivo es el alegato; la pronunciación y el esquema cohesivo '+
        'se trabajan sobre él y no aparte.',
    fil:'Con Ciencias Sociales, libertad y responsabilidad son los criterios con que el tribunal juzga.',
    pe:'El reglamento deportivo aporta el caso más cotidiano de poder aceptado: quién arbitra y por qué se le obedece.'
  },
  producto:{
    titulo:L('The class court','El tribunal de la clase'),
    descripcion:L('A public trial of a case of unlimited power — historical or technological — with '+
      'prosecution, defence, evidence and a written verdict, plus a short piece that spreads the '+
      'verdict outside the classroom.',
      'Un juicio público a un caso de poder sin límite —histórico o tecnológico— con acusación, '+
      'defensa, pruebas y veredicto escrito, más una pieza breve que difunde el veredicto fuera del aula.'),
    incluye:[L('The case file','El expediente del caso'),
             L('The persuasive speech in English','El discurso persuasivo en inglés'),
             L('The written verdict','El veredicto escrito'),
             L('The piece that spreads it','La pieza que lo difunde')],
    modelo:{tipo:'stand',
      partes:[L('the case','el caso'), L('the evidence','las pruebas'), L('the verdict','el veredicto')],
      apoyo:['The evidence shows that…', 'My client acted within…', 'We therefore find that…'],
      mejora:L('A verdict that only condemns teaches nothing. Say what limit should have existed and '+
        'who should have applied it.',
        'Un veredicto que solo condena no enseña nada. Di qué límite debería haber existido y quién '+
        'tendría que haberlo aplicado.')}
  },
  semanas:[
    s(1, L('The chain of revenge','La cadena de la venganza'),
      'Comunicación: la Orestíada. Se mapea la cadena de agravios y dónde se corta.',
      L('The chain mapped','La cadena mapeada'), 'web',
      L('Every revenge is fair to the one who takes it. This week you see the whole chain.',
        'Toda venganza es justa para quien la toma. Esta semana ves la cadena entera.')),
    s(2, L('Power without limit','El poder sin límite'),
      'Ciencias Sociales: totalitarismos. Cada equipo instruye un caso con fuentes.',
      L('Case file','Expediente del caso'), 'card',
      L('You are going to read what people said while it was happening. That is the hardest part.',
        'Vas a leer lo que la gente decía mientras pasaba. Esa es la parte difícil.')),
    s(3, L('What is it to be free?','¿Qué es ser libre?'),
      'Filosofía: libertad, responsabilidad, derechos. Se fija el criterio con que el tribunal juzgará.',
      L('Philosophical position','Posición filosófica'), 'question',
      L('Decide the criterion before you know the verdict. Doing it the other way round is not judging.',
        'Decide el criterio antes de saber el veredicto. Al revés no es juzgar.')),
    s(4, L('The body that responds','El cuerpo que responde'),
      'CyT: sistemas endocrino y nervioso. Qué le pasa a una persona bajo control y miedo sostenidos.',
      L('Systems diagram','Diagrama de los sistemas'), 'diagram',
      L('Fear is not a metaphor: it has hormones and a name. This week you name them.',
        'El miedo no es una metáfora: tiene hormonas y nombre. Esta semana los nombras.')),
    s(5, L('The plea','El alegato'),
      'Inglés: discurso persuasivo con esquema cohesivo, pronunciación y ensayo cronometrado.',
      L('Persuasive speech','Discurso persuasivo'), 'report',
      L('Persuading is not raising your voice. It is choosing the order of three ideas.',
        'Persuadir no es levantar la voz. Es elegir el orden de tres ideas.')),
    s(6, L('The court','El tribunal'),
      'Juicio público con acusación, defensa y veredicto escrito; pieza breve de difusión.',
      L('Verdict and diffusion','Veredicto y difusión'), 'speech',
      L('Today the classroom becomes a court. What you decide has to be readable by somebody who was not here.',
        'Hoy el aula es un tribunal. Lo que decidáis tiene que poder leerlo alguien que no estuvo.'))
  ],
  evaluacion:[
    {dimension:'Alegato y persuasión', areas:'ING · COM',
     descriptor:'El discurso está estructurado, se sostiene en pruebas y se pronuncia con claridad.'},
    {dimension:'Instrucción del caso', areas:'CC.SS',
     descriptor:'El expediente cita fuentes y distingue hechos de interpretaciones.'},
    {dimension:'Criterio ético', areas:'FIL',
     descriptor:'Aplica una teoría de la libertad explícita y la sostiene ante el caso contrario.'},
    {dimension:'Fundamento científico', areas:'CyT',
     descriptor:'Explica la respuesta fisiológica al miedo con los sistemas estudiados.'},
    {dimension:'Difusión', areas:'ARTE · ING',
     descriptor:'La pieza breve comunica el veredicto sin deformarlo.'}
  ],
  perfil:[2,3,8,10],
  revisar:['Matemática no aparece en el documento de 11.º para esta unidad; conviene decidir si entra con estadística del caso o queda en paralelo.']
},
/* =========================================== UNIDAD 3 · Proyecto 2 · Junio */

'g6.u3': {
  grado:6, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'🧳', from:'#155e5e', to:'#5fc9c9'},
  titulo:L('What we take with us','Lo que nos llevamos'),
  preguntaEsencial:L('When a group moves, what does it take, and what does it become without?',
                     'Cuando un grupo se mueve, ¿qué se lleva y en qué se convierte sin lo que deja?'),
  situacion:'La perla de Steinbeck es un objeto que promete cambiarlo todo y termina devuelto al mar. '+
    'En la misma unidad, 6.º estudia en Ciencias Sociales las teorías de la migración humana y el '+
    'trueque, en Ciencia qué hace que algo esté vivo y por qué las células se especializan, y en '+
    'Spiritual History el confucianismo, que es una respuesta entera a la pregunta de qué mantiene '+
    'unida a una comunidad. Todo el trimestre pregunta lo mismo: qué se lleva un grupo cuando se mueve.',
  tematicas:[
    {nombre:'Por qué un grupo se mueve',
     aporta:[['ccss','Migración: Out of Africa y multirregional, controversia, trueque, actividades económicas'],
             ['com','La perla: la novela corta, conectores discursivos, mapa mental']]},
    {nombre:'Qué necesita seguir vivo',
     aporta:[['cyt','Teoría celular, funciones de los seres vivos, unicelular frente a pluricelular'],
             ['sh','Confucianismo: piedad filial, benevolencia, ritos, armonía social, meritocracia']]},
    {nombre:'Cómo se cuenta desde lejos',
     aporta:[['ing','Cartas informales de 150-200 palabras, present perfect, role-plays'],
             ['arte','Principios de diseño: equilibrio, contraste y énfasis; songwriting y rimas']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, la perla es el objeto que hace moverse a una familia: el mismo motor '+
        'que estudia la migración. El mapa mental organiza las dos historias.',
    cyt:'Con Spiritual History, la especialización celular y el reparto de funciones en una comunidad '+
        'se explican con el mismo dibujo: nadie hace todo, y por eso el conjunto sobrevive.',
    ccss:'Con Comunicación, el trueque explica por qué la perla vale lo que vale.',
    arte:'Con Comunicación, la caja del viaje se compone con equilibrio, contraste y énfasis; la canción '+
         'da la voz del que se va.',
    ing:'Con Comunicación, la carta desde el destino es el mismo relato en la otra lengua, y el present '+
        'perfect es el tiempo del que ya llegó y todavía recuerda.',
    sh:'Con Ciencias Sociales, el confucianismo aporta los acuerdos que sostienen a la comunidad que se mueve.'
  },
  producto:{
    titulo:L('The travelling box','La caja del viaje'),
    descripcion:L('Each team prepares the box of a family that migrates: five chosen and justified '+
      'objects, an informal letter in English from the destination, an original song, and the route '+
      'map with the economic reasons behind it.',
      'Cada equipo prepara la caja de una familia que migra: cinco objetos elegidos y justificados, una '+
      'carta informal en inglés desde el destino, una canción propia y el mapa de la ruta con las '+
      'razones económicas que la explican.'),
    incluye:[L('The five objects and their reason','Los cinco objetos y su razón'),
             L('The route map','El mapa de la ruta'),
             L('The letter from the destination','La carta desde el destino'),
             L('The song','La canción')],
    modelo:{tipo:'card',
      partes:[L('what I take','qué me llevo'), L('why','por qué'),
              L('what I leave','qué dejo'), L('what I will miss','qué voy a extrañar')],
      apoyo:['I have brought my grandmother’s photo.', 'We have been here for two months.',
             'I miss the smell of my street.'],
      mejora:L('Five objects means leaving out the sixth. Write down what you left out: that is the '+
        'part that says who you are.',
        'Cinco objetos significa dejar fuera el sexto. Apunta cuál dejaste fuera: esa es la parte que '+
        'dice quién eres.')}
  },
  semanas:[
    s(1, L('The pearl that changed everything','La perla que lo cambió todo'),
      'Se lee La perla y se identifica el objeto que promete cambiar una vida. Conectores y mapa mental.',
      L('The object and its promise','El objeto y su promesa'), 'card',
      L('An object is never just an object. This week you find out what yours promises.',
        'Un objeto nunca es solo un objeto. Esta semana descubres qué promete el tuyo.')),
    s(2, L('Why people move','Por qué se mueve la gente'),
      'Ciencias Sociales: Out of Africa frente a multirregional, la controversia, el trueque.',
      L('The two theories compared','Las dos teorías comparadas'), 'sort',
      L('Two explanations for the same bones. This week you learn to hold both before choosing.',
        'Dos explicaciones para los mismos huesos. Esta semana aprendes a sostener las dos antes de elegir.')),
    s(3, L('What it takes to stay alive','Qué necesita seguir vivo'),
      'Ciencia: teoría celular, funciones de los seres vivos, especialización en pluricelulares.',
      L('Cell and its functions','La célula y sus funciones'), 'diagram',
      L('You are made of things that divided the work. This week you draw that.',
        'Estás hecho de cosas que se repartieron el trabajo. Esta semana lo dibujas.')),
    s(4, L('What holds the group together','Lo que mantiene unido al grupo'),
      'Spiritual History: piedad filial, benevolencia, ritos, armonía social. Se acuerdan cinco reglas '+
      'para la comunidad que viaja.',
      L('The five agreements','Los cinco acuerdos'), 'poster',
      L('Rules that nobody would accept are decoration. Write ones your group would sign.',
        'Las reglas que nadie aceptaría son decoración. Escribe unas que tu grupo firmaría.')),
    s(5, L('The letter from the destination','La carta desde el destino'),
      'Inglés: carta informal de 150-200 palabras con present perfect, dirigida a quien se quedó.',
      L('Informal letter','Carta informal'), 'letter',
      L('Write to somebody real. A letter to nobody sounds like a letter to nobody.',
        'Escríbele a alguien de verdad. Una carta a nadie suena a carta a nadie.')),
    s(6, L('The box and the song','La caja y la canción'),
      'Se compone la caja con equilibrio, contraste y énfasis, y se toca la canción propia.',
      L('The box + the song','La caja + la canción'), 'stand',
      L('Today your box has to be understood without you next to it. Label it.',
        'Hoy tu caja tiene que entenderse sin ti al lado. Etiquétala.'))
  ],
  evaluacion:[
    {dimension:'Comprensión lectora y organización', areas:'COM',
     descriptor:'El mapa mental relaciona la novela con la pregunta del proyecto y usa conectores con sentido.'},
    {dimension:'Explicación histórica', areas:'CC.SS',
     descriptor:'Contrasta las dos teorías de la migración y explica la controversia sin elegir por gusto.'},
    {dimension:'Comprensión científica', areas:'CyT',
     descriptor:'Explica las funciones vitales y por qué la especialización celular hace posible lo pluricelular.'},
    {dimension:'Escritura en inglés', areas:'ING',
     descriptor:'La carta tiene destinatario, extensión y present perfect usado con propósito.'},
    {dimension:'Composición y expresión', areas:'ARTE',
     descriptor:'La caja aplica equilibrio, contraste y énfasis, y la letra de la canción dice algo propio.'}
  ],
  perfil:[1,2,5,10],
  revisar:['Matemática no aparece en el documento de 6.º para U3: se puede sumar con el reparto y el trueque (fracciones y equivalencias) si coordinación lo carga.']
},

'g7.u3': {
  grado:7, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'💧', from:'#1e3a8a', to:'#6fa8dc'},
  titulo:L('The city and its water','La ciudad y su agua'),
  preguntaEsencial:L('Why is a city where it is, and what would it be without its water?',
                     '¿Por qué una ciudad está donde está, y qué sería sin su agua?'),
  situacion:'Lima es una ciudad en un desierto y sus cuentos criollos ocurren como si eso no importara. '+
    'En la misma unidad, 7.º estudia las civilizaciones fluviales — Egipto, el río Amarillo, la tierra '+
    'fértil, las inundaciones, la economía agrícola —, en Ciencia la luz y sus reflejos, en Arte la '+
    'fotografía artística sobre temas sociales, y en Matemática ecuaciones e inecuaciones, que es con '+
    'lo que se reparte un recurso escaso. Es el mismo tema visto por cuatro ventanas.',
  tematicas:[
    {nombre:'El agua que decide dónde se vive',
     aporta:[['ccss','Civilizaciones fluviales: Egipto, río Amarillo, tierra fértil, inundaciones'],
             ['mat','Ecuaciones e inecuaciones: repartir lo que no alcanza para todos']]},
    {nombre:'La ciudad contada por dentro',
     aporta:[['com','Cuentos de Lima criolla, generación del 50, cuadro comparativo, tipos de comas'],
             ['ing','Artículos sencillos, tramas, discusiones de dos minutos, cohesión']]},
    {nombre:'Mirar y mostrar',
     aporta:[['cyt','Luz: reflexión, refracción, arcoíris y colores'],
             ['arte','Fotografía artística y obras sobre temas sociales y culturales']]}
  ],
  areas:{
    com:'Con Arte, cada fotografía lleva su microcuento urbano; la puntuación se corrige donde de verdad '+
        'se lee, que es en el pie de foto.',
    mat:'Con Ciencias Sociales, la inecuación modela el reparto del agua entre usos que compiten.',
    cyt:'Con Arte, la reflexión y la refracción se estudian fotografiándolas: charcos, vidrios, contraluces.',
    ccss:'Con Comunicación, Egipto y Lima se comparan con el mismo cuadro: qué da el río, qué quita y quién decide.',
    arte:'Con Ciencia, la fotografía es el instrumento y el producto a la vez.',
    ing:'Con Comunicación, la discusión de dos minutos por fotografía es la visita guiada de la exposición.',
    sh:'Con Ciencias Sociales, el conflicto religioso muestra qué pasa cuando dos comunidades comparten un mismo lugar sagrado o un mismo recurso.'
  },
  producto:{
    titulo:L('The city that water made','La ciudad que el agua hizo'),
    descripcion:L('A photographic exhibition of the city, each photo with its own micro-story, a '+
      'comparison chart with a river civilisation, and the equation model of how water is shared.',
      'Una exposición fotográfica de la ciudad, cada foto con su microcuento, el cuadro comparativo con '+
      'una civilización fluvial y el modelo con ecuaciones del reparto del agua.'),
    incluye:[L('My photograph and its caption','Mi fotografía y su pie'),
             L('The comparison chart','El cuadro comparativo'),
             L('The water-sharing model','El modelo del reparto de agua'),
             L('The guided visit in English','La visita guiada en inglés')],
    modelo:{tipo:'poster',
      partes:[L('the photograph','la fotografía'), L('the micro-story','el microcuento'),
              L('what it makes you see','qué te hace ver')],
      apoyo:['This picture was taken at…', 'What I want you to notice is…', 'Two minutes, and then questions.'],
      mejora:L('A caption that describes the photo is useless: the photo is right there. Write what the '+
        'photo does NOT show.',
        'Un pie que describe la foto no sirve: la foto está ahí. Escribe lo que la foto NO enseña.')}
  },
  semanas:[
    s(1, L('Stories of a city','Cuentos de una ciudad'),
      'Cuentos de Lima criolla y la generación del 50. Cada alumno escribe un cuento urbano breve.',
      L('My urban story','Mi cuento urbano'), 'journal',
      L('Your street has a story that nobody wrote yet. This week you write it.',
        'Tu calle tiene un cuento que nadie ha escrito todavía. Esta semana lo escribes tú.')),
    s(2, L('Cities a river made','Las ciudades que hizo un río'),
      'Ciencias Sociales: Egipto y el río Amarillo, jerarquía, economía agrícola, inundaciones.',
      L('Comparison chart','Cuadro comparativo'), 'sort',
      L('Every great city started next to water. This week you check whether yours did too.',
        'Toda ciudad grande empezó al lado del agua. Esta semana compruebas si la tuya también.')),
    s(3, L('How light behaves','Cómo se comporta la luz'),
      'Ciencia: reflexión, refracción y colores, probados con cámara y con agua.',
      L('Light tests','Pruebas de luz'), 'experiment',
      L('You have been photographing light your whole life without knowing its rules. This week you learn them.',
        'Llevas toda la vida fotografiando luz sin saber sus reglas. Esta semana las aprendes.')),
    s(4, L('Sharing the water','El reparto del agua'),
      'Matemática: ecuaciones e inecuaciones aplicadas a un reparto real con usos que compiten.',
      L('Sharing model','Modelo del reparto'), 'chart',
      L('An inequality is a fair share written in maths. This week you write one.',
        'Una inecuación es un reparto justo escrito en matemáticas. Esta semana escribes una.')),
    s(5, L('The photo and its caption','La foto y su pie'),
      'Arte y Comunicación: se elige la fotografía definitiva y se escribe el pie con puntuación cuidada.',
      L('Photo with caption','Foto con su pie'), 'poster',
      L('Choose one photo and defend it. Ten average photos say less than one you can explain.',
        'Elige una foto y defiéndela. Diez fotos regulares dicen menos que una que sabes explicar.')),
    s(6, L('The exhibition','La exposición'),
      'Montaje de la exposición y visita guiada de dos minutos por foto, en inglés.',
      L('Exhibition mounted','Exposición montada'), 'stand',
      L('Today people walk past your photograph. Two minutes to make them stop.',
        'Hoy la gente pasa por delante de tu foto. Dos minutos para que se paren.'))
  ],
  evaluacion:[
    {dimension:'Escritura narrativa y puntuación', areas:'COM',
     descriptor:'El microcuento tiene voz propia y las comas están donde cambian el sentido.'},
    {dimension:'Comparación histórica', areas:'CC.SS',
     descriptor:'El cuadro compara con los mismos criterios y explica qué aporta el río en cada caso.'},
    {dimension:'Explicación física', areas:'CyT',
     descriptor:'Identifica reflexión y refracción en su propia fotografía y sabe explicarlas.'},
    {dimension:'Modelado matemático', areas:'MAT',
     descriptor:'La ecuación o inecuación representa el reparto real y las unidades son correctas.'},
    {dimension:'Exposición oral en inglés', areas:'ING',
     descriptor:'Sostiene dos minutos y responde preguntas sobre su propia obra.'}
  ],
  perfil:[1,3,4,8],
  revisar:['El documento de 7.º no carga ICT en U3, aunque la exposición pide edición y montaje digital: conviene decidir si entra.']
},

'g8.u3': {
  grado:8, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'🫥', from:'#374151', to:'#9fb3c8'},
  titulo:L('The cost nobody sees','El costo que no se ve'),
  preguntaEsencial:L('Who pays for what nobody counts?','¿Quién paga lo que nadie cuenta?'),
  situacion:'Julius vive en una casa enorme y no sabe quién la sostiene. En la misma unidad, 8.º '+
    'estudia en Ciencias Sociales la discriminación, la escasez y el costo de oportunidad — con sus '+
    'costos explícitos e implícitos, que son literalmente los que no se ven —, en Ciencia la energía '+
    'que se transfiere y se pierde, y en Spiritual History la empatía con Kant y Gandhi. Toda la unidad '+
    'habla de lo mismo: lo que cuesta algo y no aparece en la factura.',
  tematicas:[
    {nombre:'Lo que no aparece en la cuenta',
     aporta:[['ccss','Escasez, costo de oportunidad, costos explícitos e implícitos, discriminación'],
             ['com','Un mundo para Julius, análisis literario, intertextualidad']]},
    {nombre:'La energía que se pierde',
     aporta:[['cyt','Calor y temperatura, conservación de la energía, transferencia, enfriamiento por evaporación'],
             ['mat','Ángulos entre paralelas, polígonos, triángulos y sus líneas notables']]},
    {nombre:'Ponerlo por escrito para que alguien responda',
     aporta:[['ing','Thesis statement, opinion essays de 350-400 palabras, informes de hasta 500 palabras'],
             ['sh','Empatía, la moral de Kant, la ética de Gandhi'],
             ['arte','Desarrollo de una voz artística propia']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, la novela da los personajes invisibles y la unidad les pone nombre económico.',
    mat:'Con Ciencia, medir el espacio donde ocurre la pérdida obliga a usar polígonos, ángulos y líneas '+
        'notables sobre un plano real, no sobre un ejercicio.',
    cyt:'Con Ciencias Sociales, una pérdida de calor medible es el ejemplo más limpio de costo que nadie paga.',
    ccss:'Con Inglés, el costo de oportunidad es la tesis del ensayo: qué se deja de hacer.',
    arte:'Con Spiritual History, la obra propia le da rostro a lo que el informe cuenta en números.',
    ing:'Con Comunicación, el opinion essay y el informe son dos registros del mismo hallazgo.',
    sh:'Con Ciencias Sociales, Kant y Gandhi dan el criterio para decir por qué ese costo invisible es injusto y no solo ineficiente.'
  },
  producto:{
    titulo:L('What it costs and nobody pays','Lo que cuesta y nadie paga'),
    descripcion:L('A 500-word report on a real invisible cost in the school or the neighbourhood — '+
      'time, energy, unrecognised work — with its measurement, its opportunity cost and an artwork '+
      'that gives it a face.',
      'Un informe de 500 palabras sobre un costo invisible real del colegio o del barrio —tiempo, '+
      'energía, trabajo no reconocido—, con su medición, su costo de oportunidad y una obra que le '+
      'pone rostro.'),
    incluye:[L('The measurement and its data','La medición y sus datos'),
             L('The opportunity cost','El costo de oportunidad'),
             L('The opinion essay','El ensayo de opinión'),
             L('The artwork','La obra')],
    modelo:{tipo:'report',
      partes:[L('what we measured','qué medimos'), L('what it costs','cuánto cuesta'),
              L('who pays it','quién lo paga')],
      apoyo:['The report shows that…', 'This cost is not included in…',
             'In my opinion, the school should…'],
      mejora:L('An invisible cost with no number stays invisible. Measure something, even if it is '+
        'only minutes.',
        'Un costo invisible sin número sigue siendo invisible. Mide algo, aunque sean solo minutos.')}
  },
  semanas:[
    s(1, L('Julius’ house','La casa de Julius'),
      'Comunicación: quién sostiene lo que la novela no nombra. Se listan los invisibles del texto.',
      L('The invisible ones','Los invisibles del texto'), 'card',
      L('The book tells you who matters by who it forgets to mention. This week you notice.',
        'El libro te dice quién importa por a quién se olvida de nombrar. Esta semana te das cuenta.')),
    s(2, L('Opportunity cost','El costo de oportunidad'),
      'Ciencias Sociales: escasez, costos explícitos e implícitos. Se analiza una decisión real del colegio.',
      L('The two costs of a decision','Los dos costos de una decisión'), 'sort',
      L('Every yes is a no to something else. This week you write down the no.',
        'Cada sí es un no a otra cosa. Esta semana escribes el no.')),
    s(3, L('The energy that escapes','La energía que se escapa'),
      'Ciencia: calor, transferencia y enfriamiento por evaporación. Se mide una pérdida real y repetida.',
      L('Measured loss','La pérdida medida'), 'experiment',
      L('Something in this building is losing energy right now. This week you find out how much.',
        'Algo de este edificio está perdiendo energía ahora mismo. Esta semana averiguas cuánta.')),
    s(4, L('The shape of what we measure','La forma de lo que medimos'),
      'Matemática: ángulos entre paralelas, polígonos y líneas notables sobre el plano del espacio medido.',
      L('Plan with measurements','Plano con medidas'), 'plan',
      L('Measuring the real place is what turns geometry into evidence.',
        'Medir el sitio de verdad es lo que convierte la geometría en prueba.')),
    s(5, L('The essay','El ensayo'),
      'Inglés: thesis statement y opinion essay de 350-400 palabras con evidencia propia.',
      L('Opinion essay','Ensayo de opinión'), 'journal',
      L('Your thesis has to be arguable. If nobody could disagree, it is not a thesis.',
        'Tu tesis tiene que ser discutible. Si nadie pudiera estar en desacuerdo, no es una tesis.')),
    s(6, L('The report and the work','El informe y la obra'),
      'Informe de 500 palabras entregado a quien puede decidir, y obra artística con voz propia.',
      L('Report + artwork','Informe + obra'), 'stand',
      L('A report that stays in the classroom is homework. Decide today who receives it.',
        'Un informe que se queda en el aula es una tarea. Decide hoy quién lo recibe.'))
  ],
  evaluacion:[
    {dimension:'Tesis y argumentación', areas:'ING · COM',
     descriptor:'La tesis es discutible y el ensayo la sostiene con la evidencia recogida.'},
    {dimension:'Análisis económico', areas:'CC.SS',
     descriptor:'Distingue costos explícitos e implícitos en un caso real y no los confunde.'},
    {dimension:'Medición', areas:'CyT · MAT',
     descriptor:'La pérdida está medida con repeticiones y el plano tiene medidas correctas.'},
    {dimension:'Expresión artística', areas:'ARTE',
     descriptor:'La obra tiene propuesta propia y dialoga con el hallazgo del informe.'},
    {dimension:'Criterio ético', areas:'SH',
     descriptor:'Usa a Kant o a Gandhi para argumentar por qué ese costo es injusto, no solo incómodo.'}
  ],
  perfil:[3,5,8,10],
  revisar:['El informe se entrega a alguien que pueda decidir: conviene acordar con dirección quién lo recibe antes de la semana 6.']
},

'g9.u3': {
  grado:9, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'🎙️', from:'#3f1d38', to:'#c084a8'},
  titulo:L('The one who watches and does nothing','El que mira y no hace'),
  preguntaEsencial:L('When is doing nothing also a decision?','¿Cuándo no hacer nada es también una decisión?'),
  situacion:'En Los cachorros el grupo ve lo que le pasa a Cuéllar y sigue jugando. En la misma unidad, '+
    '9.º estudia en Ciencias Sociales el absolutismo y la indiferencia, en Filosofía qué hace buena a '+
    'una acción —virtud, utilitarismo, deontología— y en Matemática probabilidad. Con esos tres se '+
    'puede hacer algo que la escuela casi nunca hace: analizar la inacción con herramientas, y no solo '+
    'lamentarla.',
  tematicas:[
    {nombre:'Ver y no hacer',
     aporta:[['com','Los cachorros, el estilo de Vargas Llosa, intertextualidad'],
             ['ccss','Indiferencia: absolutismo, guerras religiosas, paternalismo, Pedro el Grande']]},
    {nombre:'Con qué criterio se juzga una acción',
     aporta:[['fil','Ética de la virtud, utilitarismo, deontología, deberes'],
             ['ing','Noting arguments, tema central, ensayo comparativo de 450-500 palabras']]},
    {nombre:'Medir lo que puede pasar',
     aporta:[['mat','Probabilidad experimental y teórica, diagrama de árbol, eventos compuestos, Venn'],
             ['cyt','Diseño y ejecución de investigación: repeticiones y toma de datos']]}
  ],
  areas:{
    com:'Con Filosofía, la novela da el caso y la ética da el criterio: se juzga a los personajes con los tres marcos.',
    mat:'Con Filosofía, el árbol de probabilidad hace visible el daño esperado de no actuar, que es justo '+
        'lo que el utilitarismo pide calcular.',
    cyt:'Con Matemática, el diseño de investigación aporta el método para que los datos del podcast sean defendibles.',
    ccss:'Con Comunicación, la indiferencia histórica y la del grupo de la novela se comparan en el ensayo.',
    ing:'Con Comunicación, el podcast individual es el producto y el ensayo comparativo su guion argumentado.',
    fil:'Con todas, los tres marcos éticos son la rúbrica con que se juzga el caso elegido.'
  },
  producto:{
    titulo:L('Cases of indifference — the podcast','Casos de indiferencia — el podcast'),
    descripcion:L('An individual podcast that takes one case — literary, historical or current — and '+
      'analyses it with the three ethical frameworks, backed by a comparative essay and a probability '+
      'estimate of the harm of not acting.',
      'Un podcast individual que toma un caso —literario, histórico o actual— y lo analiza con los tres '+
      'marcos éticos, apoyado en un ensayo comparativo y en una estimación de probabilidad del daño de '+
      'no actuar.'),
    incluye:[L('The case, documented','El caso, documentado'),
             L('The three frameworks applied','Los tres marcos aplicados'),
             L('The probability tree','El árbol de probabilidad'),
             L('The recorded podcast','El podcast grabado')],
    modelo:{tipo:'video',
      partes:[L('the case','el caso'), L('the frameworks','los marcos'),
              L('my position','mi posición'), L('record it, listen, record again','graba, escucha, vuelve a grabar')],
      apoyo:['Nobody had been warned, and yet everybody knew.',
             'From a utilitarian point of view…', 'This is where I disagree with…'],
      mejora:L('A podcast that only condemns is a monologue. Include the strongest reason somebody had '+
        'to do nothing, and then answer it.',
        'Un podcast que solo condena es un monólogo. Incluye la razón más fuerte que alguien tuvo para '+
        'no hacer nada, y después respóndele.')}
  },
  semanas:[
    s(1, L('The ones who watched','Los que miraban'),
      'Comunicación: Los cachorros. Quién ve, quién calla y qué se cuenta el grupo a sí mismo.',
      L('The literary case','El caso literario'), 'journal',
      L('The group in the book is not evil. That is exactly what makes it worth studying.',
        'El grupo del libro no es malvado. Eso es justo lo que lo hace digno de estudio.')),
    s(2, L('Three ways to judge','Tres formas de juzgar'),
      'Filosofía: virtud, utilitarismo y deontología aplicados al mismo caso, uno por uno.',
      L('The three frameworks applied','Los tres marcos aplicados'), 'sort',
      L('The same act can be right in one framework and wrong in another. This week you find out why.',
        'El mismo acto puede estar bien en un marco y mal en otro. Esta semana descubres por qué.')),
    s(3, L('When power does not answer','Cuando el poder no responde'),
      'Ciencias Sociales: absolutismo, paternalismo, guerras religiosas. Se instruye el caso histórico.',
      L('The historical case','El caso histórico'), 'card',
      L('Indifference has a history, and it is longer than you think.',
        'La indiferencia tiene historia, y es más larga de lo que crees.')),
    s(4, L('Measuring the risk of not acting','Medir el riesgo de no actuar'),
      'Matemática: probabilidad experimental y teórica, árbol y eventos compuestos, sobre el caso.',
      L('Probability tree','Árbol de probabilidad'), 'chart',
      L('"It probably will not happen" is a sentence you can now check.',
        '"Seguramente no va a pasar" es una frase que ahora puedes comprobar.')),
    s(5, L('The comparative essay','El ensayo comparativo'),
      'Inglés: ensayo de 450-500 palabras comparando el caso literario y el histórico, con passive voice '+
      'en tiempos perfectos.',
      L('Comparative essay','Ensayo comparativo'), 'report',
      L('Comparing is not putting one after the other: it is choosing the criteria first.',
        'Comparar no es poner uno detrás de otro: es elegir antes los criterios.')),
    s(6, L('The podcast','El podcast'),
      'Grabación individual con guion, cita de fuentes y cierre propio.',
      L('Podcast published','Podcast publicado'), 'video',
      L('Your voice is going to be listened to without your face. Say the first sentence twice before recording.',
        'Van a escuchar tu voz sin verte la cara. Di la primera frase dos veces antes de grabar.'))
  ],
  evaluacion:[
    {dimension:'Análisis literario', areas:'COM',
     descriptor:'Explica cómo el estilo del autor construye la indiferencia del grupo.'},
    {dimension:'Razonamiento ético', areas:'FIL',
     descriptor:'Aplica los tres marcos con precisión y toma posición justificada.'},
    {dimension:'Tratamiento de datos', areas:'MAT · CyT',
     descriptor:'El árbol de probabilidad está bien construido y las cifras se explican.'},
    {dimension:'Escritura comparativa', areas:'ING',
     descriptor:'El ensayo compara con criterios explícitos y usa la voz pasiva con propósito.'},
    {dimension:'Producción sonora', areas:'ING · COM',
     descriptor:'El podcast se entiende, cita sus fuentes y sostiene una tesis.'}
  ],
  perfil:[2,5,8,10],
  revisar:['Arte y Cultura no aparece en el documento de 9.º para U3: si entra, la portada y la cortina del podcast son su sitio natural.']
},

'g10.u3': {
  grado:10, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'🔎', from:'#0f3d3e', to:'#5aa9a3'},
  titulo:L('By what authority?','¿Con qué autoridad?'),
  preguntaEsencial:L('What makes a claim true, and what only makes it obeyed?',
                     '¿Qué hace verdadera una afirmación, y qué solo hace que se obedezca?'),
  situacion:'En La ciudad y los perros la autoridad del colegio militar se sostiene sin que nadie la '+
    'discuta. En la misma unidad, 10.º estudia la era napoleónica y el autoritarismo, y en Filosofía la '+
    'filosofía de la ciencia: método, hechos frente a teoría, ciencia frente a pseudociencia, '+
    'objetividad. Y en Matemática, trigonometría, que es cómo se produce un dato que nadie tiene que '+
    'creer por fe. La unidad entera pregunta con qué se sostiene lo que damos por cierto.',
  tematicas:[
    {nombre:'La autoridad que no se discute',
     aporta:[['com','La ciudad y los perros, el tiempo narrativo, intertextualidad'],
             ['ccss','Era napoleónica, sistema continental, inflación e inestabilidad']]},
    {nombre:'Qué cuenta como prueba',
     aporta:[['fil','Método científico, hechos frente a teoría, ciencia frente a pseudociencia'],
             ['mat','Trigonometría: razones, ley de senos y cosenos, ángulos de elevación']]},
    {nombre:'Sostenerlo delante de otros',
     aporta:[['ing','Debates, vocabulario de debate, informes, apoyo visual, podcast en parejas'],
             ['arte','Proyectos artísticos que responden a problemas culturales y sociales']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el internado y el imperio napoleónico se leen con la misma pregunta: qué '+
        'sostiene la obediencia cuando nadie la discute.',
    mat:'Con Filosofía, medir una altura inaccesible con ley de senos es producir un dato: se ve de dónde '+
        'sale un número y por qué se puede comprobar.',
    cyt:'Ciencia y Tecnología aporta el método: diseño de investigación y toma de datos para que el '+
        'informe no dependa de la opinión.',
    ccss:'Con Filosofía, el sistema continental es un caso de decisión sostenida por autoridad y no por evidencia.',
    arte:'Con Inglés, el proyecto artístico es la parte del debate que se ve desde fuera del aula.',
    ing:'Con Comunicación, el debate y el informe son el mismo argumento en oral y en escrito.',
    fil:'Con todas, el criterio de demarcación es la rúbrica del proyecto.'
  },
  producto:{
    titulo:L('What counts as proof','Qué cuenta como prueba'),
    descripcion:L('Each team takes a disputed claim — historical, scientific or about the school — and '+
      'submits it to criteria: what supports it, what would refute it, and how a datum about it is '+
      'actually produced. Report plus public debate.',
      'Cada equipo toma una afirmación en disputa —histórica, científica o del colegio— y la somete a '+
      'criterio: qué la sostiene, qué la refutaría y cómo se produce de verdad un dato sobre ella. '+
      'Informe más debate público.'),
    incluye:[L('The claim and its criteria','La afirmación y su criterio'),
             L('The measurement that produces a datum','La medición que produce un dato'),
             L('The report','El informe'),
             L('The debate with visual support','El debate con apoyo visual')],
    modelo:{tipo:'report',
      partes:[L('the claim','la afirmación'), L('what supports it','qué la sostiene'),
              L('what would refute it','qué la refutaría')],
      apoyo:['The claim under discussion is…', 'This would be refuted if…',
             'Our measurement gives 14.2 m, with an error of ±0.3.'],
      mejora:L('If you cannot say what would prove you wrong, you are not defending a claim: you are '+
        'defending a belief. Write that sentence first.',
        'Si no puedes decir qué te demostraría que te equivocas, no estás defendiendo una afirmación: '+
        'estás defendiendo una creencia. Escribe esa frase primero.')}
  },
  semanas:[
    s(1, L('The authority of the school','La autoridad del internado'),
      'Comunicación: La ciudad y los perros. Quién manda, con qué y quién sostiene el silencio.',
      L('The system of authority','El sistema de autoridad'), 'web',
      L('Authority that nobody questions does not need to be right. This week you question it.',
        'La autoridad que nadie discute no necesita tener razón. Esta semana la discutes.')),
    s(2, L('Napoleon and the new order','Napoleón y el orden nuevo'),
      'Ciencias Sociales: sistema continental, inflación, inestabilidad. Caso instruido con fuentes.',
      L('Case file','Ficha del caso'), 'card',
      L('A decision that ruined an economy was obeyed for years. This week you find out why.',
        'Una decisión que arruinó una economía se obedeció durante años. Esta semana averiguas por qué.')),
    s(3, L('What counts as proof','Qué cuenta como prueba'),
      'Filosofía: hechos y teoría, ciencia y pseudociencia, objetividad. Se fija el criterio de demarcación.',
      L('Criterion of demarcation','Criterio de demarcación'), 'question',
      L('Deciding the criterion before knowing the result is the hardest honest thing there is.',
        'Decidir el criterio antes de saber el resultado es lo más honesto y lo más difícil que hay.')),
    s(4, L('Producing a datum','Producir un dato'),
      'Matemática: se mide una altura o distancia real del colegio con razones trigonométricas y ley de '+
      'senos o cosenos, con estimación de error.',
      L('Documented measurement','Medición documentada'), 'experiment',
      L('Today a number appears that did not exist this morning, and it is yours.',
        'Hoy aparece un número que esta mañana no existía, y es tuyo.')),
    s(5, L('The report','El informe'),
      'Inglés: informe con cohesión, puntuación avanzada y borradores sucesivos.',
      L('Report, refined','Informe, depurado'), 'journal',
      L('The first draft is for you. The third is for the reader.',
        'El primer borrador es para ti. El tercero es para el lector.')),
    s(6, L('The debate','El debate'),
      'Debate público con apoyo visual y turno de refutación; podcast en parejas como registro.',
      L('Debate held','Debate celebrado'), 'stand',
      L('Whoever changes their mind with a good argument wins the day, even if they lose the debate.',
        'Quien cambia de idea ante un buen argumento gana el día, aunque pierda el debate.'))
  ],
  evaluacion:[
    {dimension:'Criterio epistémico', areas:'FIL',
     descriptor:'Formula qué refutaría su afirmación y distingue evidencia de autoridad.'},
    {dimension:'Producción de datos', areas:'MAT · CyT',
     descriptor:'La medición trigonométrica es correcta y declara su margen de error.'},
    {dimension:'Análisis histórico y literario', areas:'CC.SS · COM',
     descriptor:'Explica cómo se sostiene una autoridad en el caso histórico y en la novela.'},
    {dimension:'Debate e informe', areas:'ING',
     descriptor:'Argumenta con vocabulario preciso y responde a la refutación.'},
    {dimension:'Proyecto artístico', areas:'ARTE',
     descriptor:'La obra responde al problema tratado y no lo ilustra sin más.'}
  ],
  perfil:[2,8,9],
  revisar:['El documento de 10.º carga Matemática por semanas (1-3 trigonometría, 4-6 geometría 3D): el cronograma de este proyecto respeta ese reparto.']
},

'g11.u3': {
  grado:11, proyecto:2, unidad:3, mes:'Junio', semanas:6,
  cover:{icon:'🕯️', from:'#3b0764', to:'#a78bfa'},
  titulo:L('Everybody knew','Todos lo sabían'),
  preguntaEsencial:L('Who is responsible when everybody knew and nobody acted?',
                     '¿Quién responde cuando todos sabían y nadie actuó?'),
  situacion:'En Crónica de una muerte anunciada el pueblo entero sabe que van a matar a Santiago Nasar '+
    'y nadie lo impide. En la misma unidad, 11.º estudia la banalidad del mal con Hannah Arendt y el '+
    'Holocausto, en Filosofía la ética de las omisiones —silencio, negligencia moral, deberes '+
    'negativos— y en Matemática programación lineal, que es la herramienta para decir qué decisión era '+
    'posible dentro de unas restricciones. Es la unidad más redonda del año y no está declarada.',
  tematicas:[
    {nombre:'La omisión colectiva',
     aporta:[['com','Crónica de una muerte anunciada, el boom, intertextualidad con Vargas Llosa'],
             ['ccss','Banalidad del mal, Arendt, Tercer Reich, Holocausto']]},
    {nombre:'La responsabilidad de no hacer',
     aporta:[['fil','Ética de las omisiones, deberes negativos, silencio, negligencia moral'],
             ['cyt','Sistema endocrino: la respuesta del cuerpo bajo presión y miedo']]},
    {nombre:'Qué era posible',
     aporta:[['mat','Programación lineal: restricciones, región factible, función objetivo; optimización'],
             ['ing','TED Talk de 5 minutos, journaling, propósito del autor, textos de 1500 palabras']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, la novela y el juicio de Eichmann se leen con la misma pregunta y en el mismo ensayo.',
    mat:'Con Filosofía, la programación lineal permite responder "qué era posible hacer" con restricciones '+
        'explícitas, en vez de con buenas intenciones.',
    cyt:'Con Filosofía, el sistema endocrino explica qué le pasa a un cuerpo que sabe y calla.',
    ccss:'Con Comunicación, Arendt da el concepto y la novela el caso.',
    ing:'Con Comunicación, la TED Talk de cinco minutos es el producto y el journaling el registro del proceso.',
    fil:'Con todas, la ética de las omisiones es el marco del proyecto entero.'
  },
  producto:{
    titulo:L('The omission that cost — a 5-minute TED Talk','La omisión que costó — TED Talk de 5 minutos'),
    descripcion:L('A five-minute talk about a case of collective omission — literary, historical or '+
      'current — with the ethics of omissions as framework, an optimisation model showing what was '+
      'actually possible, and the working journal behind it.',
      'Una charla de cinco minutos sobre un caso de omisión colectiva —literario, histórico o actual— '+
      'con la ética de las omisiones como marco, un modelo de optimización que muestra qué era posible '+
      'de verdad, y el diario de trabajo que lo sostiene.'),
    incluye:[L('The timeline of the omission','La cronología de la omisión'),
             L('The ethical framework','El marco ético'),
             L('The optimisation model','El modelo de optimización'),
             L('The TED Talk','La TED Talk')],
    modelo:{tipo:'speech',
      partes:[L('the moment it could have stopped','el momento en que pudo pararse'),
              L('who could have acted','quién pudo actuar'),
              L('what it would have cost them','qué le habría costado')],
      apoyo:['By the time anybody spoke, it was already…', 'The cost of speaking up was…',
             'What I want to leave you with is…'],
      mejora:L('Do not end by condemning. End with the concrete moment when a different decision was '+
        'still available, and what it would have cost.',
        'No termines condenando. Termina con el momento concreto en que todavía cabía otra decisión, y '+
        'con lo que habría costado.')}
  },
  semanas:[
    s(1, L('Everybody knew','Todos lo sabían'),
      'Comunicación: se reconstruye quién sabía qué y cuándo, hora por hora.',
      L('Timeline of the omission','Cronología de la omisión'), 'timeline',
      L('The novel tells you the end on the first page. The suspense is in what nobody did.',
        'La novela te cuenta el final en la primera página. El suspenso está en lo que nadie hizo.')),
    s(2, L('The banality of evil','La banalidad del mal'),
      'Ciencias Sociales: Arendt y el juicio. La obediencia sin pregunta como caso documentado.',
      L('Case file','Ficha del caso'), 'card',
      L('Arendt was attacked for this idea for the rest of her life. Read it before judging it.',
        'A Arendt la atacaron por esta idea el resto de su vida. Léela antes de juzgarla.')),
    s(3, L('Negative duties','Deberes negativos'),
      'Filosofía: ética de las omisiones, silencio, negligencia moral, responsabilidad.',
      L('Ethical framework','Marco ético'), 'question',
      L('There are things you are guilty of without doing anything. This week you learn to name them.',
        'Hay cosas de las que eres culpable sin hacer nada. Esta semana aprendes a nombrarlas.')),
    s(4, L('What was possible','Qué era posible'),
      'Matemática: restricciones, región factible y función objetivo aplicadas a la decisión del caso.',
      L('Optimisation model','Modelo de optimización'), 'chart',
      L('"There was nothing to be done" is a claim. This week you check it with constraints.',
        '"No se podía hacer nada" es una afirmación. Esta semana la compruebas con restricciones.')),
    s(5, L('The journal and the script','El diario y el guion'),
      'Inglés: journaling del proceso y guion de la charla, con propósito del autor declarado.',
      L('Script + journal','Guion + diario'), 'journal',
      L('Five minutes is about 700 words. Everything else has to go.',
        'Cinco minutos son unas 700 palabras. Todo lo demás sobra.')),
    s(6, L('The TED Talk','La TED Talk'),
      'Charla de cinco minutos ante público, con ensayo cronometrado previo.',
      L('TED Talk delivered','TED Talk presentada'), 'speech',
      L('You are going to talk about somebody who did not talk. Do it looking up.',
        'Vas a hablar de alguien que no habló. Hazlo mirando al frente.'))
  ],
  evaluacion:[
    {dimension:'Análisis literario e histórico', areas:'COM · CC.SS',
     descriptor:'Relaciona el caso literario con el histórico sin igualarlos y cita fuentes.'},
    {dimension:'Razonamiento ético', areas:'FIL',
     descriptor:'Distingue deberes negativos y positivos y sostiene una tesis sobre la responsabilidad.'},
    {dimension:'Modelado matemático', areas:'MAT',
     descriptor:'Las restricciones representan la situación real y la función objetivo está justificada.'},
    {dimension:'Oratoria', areas:'ING',
     descriptor:'Cinco minutos con estructura, ritmo y cierre; sin leer.'},
    {dimension:'Fundamento científico', areas:'CyT',
     descriptor:'Explica con el sistema endocrino la respuesta fisiológica de quien calla bajo presión.'}
  ],
  perfil:[2,3,8,10],
  revisar:['Arte y Cultura no está cargada en U3 de 11.º: si entra, el diseño de la charla y su pieza gráfica son su sitio.']
},
/* ========================================== UNIDAD 4 · Proyecto 3 · Agosto */

'g6.u4': {
  grado:6, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'🏺', from:'#78350f', to:'#e0a458'},
  titulo:L('The first city','La primera ciudad'),
  preguntaEsencial:L('What does a group have to agree on before it can live together in one place?',
                     '¿En qué tiene que ponerse de acuerdo un grupo antes de poder vivir junto en un mismo sitio?'),
  situacion:'Caral es tan antigua como las pirámides y está a tres horas de aquí. En la misma unidad, '+
    '6.º estudia las cunas de la civilización y el intercambio, en Ciencia la estructura de la Tierra y '+
    'las ondas sonoras, en Matemática fracciones y reparto equitativo — que es literalmente el problema '+
    'de toda ciudad — y en ICT debate qué es la inteligencia artificial. La pregunta de fondo, con '+
    'cinco mil años de diferencia, es la misma: cómo se organiza un grupo grande que no se conoce.',
  tematicas:[
    {nombre:'Lo que hace posible una ciudad',
     aporta:[['ccss','Mesopotamia y Caral: orígenes, comercio e intercambio'],
             ['mat','Fracciones, equivalencias y reparto equitativo de una cantidad'],
             ['cyt','Estructura de la Tierra y sus cambios: dónde se puede construir']]},
    {nombre:'Lo que la ciudad se cuenta',
     aporta:[['com','Astérix y Cleopatra, reseña, cuadro comparativo, exposición oral'],
             ['ing','Narrative essays de 250-300 palabras, modal verbs, recitación'],
             ['sh','Voces del islam: creencia, identidad y comunidad']]},
    {nombre:'La herramienta nueva de cada época',
     aporta:[['ict','Qué es la IA, historia, ventajas y desventajas, debate'],
             ['arte','Collage con objetos reciclados y creación de melodías propias']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, la reseña de Astérix y el cuadro comparativo de Mesopotamia y Caral se '+
        'hacen con los mismos criterios; la exposición oral es la visita al museo.',
    mat:'Con Ciencias Sociales, el reparto del grano en fracciones es el problema real de la primera '+
        'ciudad y el ejercicio del cuaderno a la vez.',
    cyt:'Con Ciencias Sociales, la estructura de la Tierra, los eclipses y las ondas explican dónde se '+
        'funda, qué se teme y qué se calendariza.',
    ccss:'Con todas, Caral es el caso peruano y Mesopotamia el contrapunto.',
    arte:'Con Ciencias Sociales, el collage con material reciclado construye el objeto del museo y la '+
         'melodía propia su ambiente sonoro.',
    ict:'Con Comunicación, el debate sobre la IA se plantea como el mismo debate que hubo con la '+
        'escritura: qué gana y qué pierde un grupo cuando aparece una herramienta que lo cambia todo.',
    ing:'Con Comunicación, el narrative essay cuenta un día en la primera ciudad; los modal verbs son '+
        'los de la regla y el permiso.',
    sh:'Con Ciencias Sociales, los cinco pilares muestran cómo una comunidad convierte una creencia en vida diaria.'
  },
  producto:{
    titulo:L('The museum of the first city','El museo de la primera ciudad'),
    descripcion:L('A class museum about Caral or Mesopotamia: objects built with recycled material, '+
      'each with its label, the equitable share of its granary worked out in fractions, a guided visit '+
      'and the AI debate as the closing room.',
      'Un museo de clase sobre Caral o Mesopotamia: objetos construidos con material reciclado, cada '+
      'uno con su cartela, el reparto equitativo de su granero resuelto en fracciones, una visita '+
      'guiada y el debate sobre la IA como sala de cierre.'),
    incluye:[L('My object and its label','Mi objeto y su cartela'),
             L('The share of the granary','El reparto del granero'),
             L('The narrative essay in English','El narrative essay en inglés'),
             L('The guided visit','La visita guiada')],
    modelo:{tipo:'stand',
      partes:[L('what it is','qué es'), L('what it was for','para qué servía'),
              L('how we know','cómo lo sabemos')],
      apoyo:['This object would have been used to…', 'People must have needed it because…',
             'Welcome to the museum of…'],
      mejora:L('A label that only says the name teaches nothing. Say what it was for and how we know.',
        'Una cartela que solo dice el nombre no enseña nada. Di para qué servía y cómo lo sabemos.')}
  },
  semanas:[
    s(1, L('Two cities, same time','Dos ciudades, el mismo tiempo'),
      'Ciencias Sociales: Mesopotamia y Caral. Se compara con los mismos criterios y se elige la ciudad '+
      'del museo.',
      L('Comparison chart','Cuadro comparativo'), 'sort',
      L('While the pyramids were being built, somebody was building Caral. This week you find out who.',
        'Mientras se levantaban las pirámides, alguien construía Caral. Esta semana descubres quién.')),
    s(2, L('Where you can build','Dónde se puede construir'),
      'Ciencia: estructura de la Tierra, cambios, ondas sísmicas y sonoras. Por qué se funda donde se funda.',
      L('Ground study','Estudio del terreno'), 'diagram',
      L('The ground decides more than the king does. This week you look underneath.',
        'El suelo decide más que el rey. Esta semana miras debajo.')),
    s(3, L('Sharing the granary','El reparto del granero'),
      'Matemática: fracciones propias e impropias, equivalencias y reparto equitativo de una cantidad '+
      'entre familias.',
      L('The share, in fractions','El reparto, en fracciones'), 'chart',
      L('Every city argues about the same thing: who gets how much. This week you do the maths.',
        'Toda ciudad discute lo mismo: quién recibe cuánto. Esta semana haces las cuentas.')),
    s(4, L('The object','El objeto'),
      'Arte: collage y construcción con material reciclado del objeto del museo; melodía propia para la sala.',
      L('Object + label','Objeto + cartela'), 'model',
      L('Build it so somebody can pick it up. A museum you cannot approach is a photograph.',
        'Constrúyelo para que alguien pueda cogerlo. Un museo al que no te puedes acercar es una foto.')),
    s(5, L('A day in the first city','Un día en la primera ciudad'),
      'Inglés: narrative essay de 250-300 palabras con modal verbs; Comunicación revisa la reseña.',
      L('Narrative essay','Narrative essay'), 'journal',
      L('Tell one day, not five thousand years. The day is what makes it real.',
        'Cuenta un día, no cinco mil años. El día es lo que lo hace real.')),
    s(6, L('The museum and the debate','El museo y el debate'),
      'Visita guiada al museo y debate de ICT: qué gana y qué pierde un grupo cuando aparece una '+
      'herramienta que lo cambia todo.',
      L('Museum open + debate','Museo abierto + debate'), 'speech',
      L('Writing changed everything once. Today you argue about the tool that is changing it now.',
        'La escritura lo cambió todo una vez. Hoy discutes sobre la herramienta que lo está cambiando ahora.'))
  ],
  evaluacion:[
    {dimension:'Comparación histórica', areas:'CC.SS',
     descriptor:'Compara las dos civilizaciones con criterios iguales y explica el intercambio.'},
    {dimension:'Cálculo con fracciones', areas:'MAT',
     descriptor:'El reparto es equitativo, está justificado y las equivalencias son correctas.'},
    {dimension:'Explicación científica', areas:'CyT',
     descriptor:'Relaciona la estructura del terreno con la decisión de fundar ahí.'},
    {dimension:'Narración en inglés', areas:'ING',
     descriptor:'El ensayo tiene escena, extensión y modal verbs usados con sentido.'},
    {dimension:'Producción y debate', areas:'ARTE · ICT',
     descriptor:'El objeto está construido y etiquetado, y el debate se sostiene con razones.'}
  ],
  perfil:[1,3,8,9],
  revisar:['El documento de 6.º de esta carpeta dice "UNIDAD 3" cuando la carpeta es Proyecto 3 (U4): conviene corregir la cabecera para que no se confunda con junio.']
},

'g7.u4': {
  grado:7, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'⚖️', from:'#4c1d95', to:'#a5b4fc'},
  titulo:L('What was it worth to them?','¿Qué valía para ellos?'),
  preguntaEsencial:L('Who decides what a thing is worth, and what happens when two cultures disagree?',
                     '¿Quién decide lo que vale una cosa, y qué pasa cuando dos culturas no coinciden?'),
  situacion:'Para los chimú y los mexicas ciertos objetos valían por lo que servían y por lo que '+
    'significaban, no por lo que costaban. En la misma unidad, 7.º estudia el valor de uso en esas '+
    'culturas, en Comunicación el origen de los dioses griegos, en Matemática estadística — que es cómo '+
    'se mide hoy lo que la gente valora — y en Spiritual History la ética del perdón. La unidad da para '+
    'una pregunta grande y muy actual: qué vale y para quién.',
  tematicas:[
    {nombre:'El valor de las cosas',
     aporta:[['ccss','Valor de uso: chimú, moche, mexica'],
             ['mat','Estadística: recolección de datos, media, mediana y moda, tablas y gráficos']]},
    {nombre:'Las historias que explican el mundo',
     aporta:[['com','El origen de los dioses griegos, género épico, texto expositivo, mapa conceptual'],
             ['ing','Main idea summaries, book reviews, past perfect, TED-Talk de 3 minutos']]},
    {nombre:'Cuando el valor se rompe',
     aporta:[['sh','Ética del perdón: perdón frente a venganza, reconciliación, reparación moral'],
             ['cyt','Presión y magnetismo: fuerzas que actúan sin verse']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el mito griego y el objeto ritual andino explican el mundo con el mismo '+
        'procedimiento; el texto expositivo lo pone por escrito.',
    mat:'Con Ciencias Sociales, la encuesta mide qué valora hoy el colegio y se compara con el valor de '+
        'uso de las culturas estudiadas.',
    cyt:'Con Arte, la presión y el magnetismo dan las fuerzas invisibles: el paralelo honesto con lo que '+
        'sostiene un valor sin verse.',
    ccss:'Con Matemática, el valor de uso frente al valor de cambio se ilustra con datos propios.',
    arte:'Con Comunicación, el periodo clásico aporta la escucha y la interpretación de la pieza que abre la exposición.',
    ing:'Con Comunicación, la TED-Talk de tres minutos es el resumen del hallazgo, y el book review su versión escrita.',
    sh:'Con Ciencias Sociales, el perdón y la reparación aparecen cuando el valor se rompe: qué se debe a quién.',
    fr:'Con Comunicación, la descripción física en francés practica el mismo músculo que la ficha del objeto.'
  },
  producto:{
    titulo:L('The value survey and the museum of two worlds','La encuesta del valor y el museo de dos mundos'),
    descripcion:L('A statistical survey of what the school values today, put side by side with the use '+
      'value of chimú, moche and mexica objects, presented as a two-room exhibition with a 3-minute '+
      'TED-Talk.',
      'Una encuesta estadística sobre qué valora hoy el colegio, puesta al lado del valor de uso de '+
      'objetos chimú, moche y mexica, presentada como una exposición de dos salas con una TED-Talk de '+
      'tres minutos.'),
    incluye:[L('The survey and its graphs','La encuesta y sus gráficos'),
             L('The object file','La ficha del objeto'),
             L('The expository text','El texto expositivo'),
             L('The 3-minute TED-Talk','La TED-Talk de 3 minutos')],
    modelo:{tipo:'chart',
      partes:[L('what we asked','qué preguntamos'), L('how many answered','cuántos respondieron')],
      apoyo:['We surveyed 60 students.', 'The mode was…, but the median tells another story.',
             'They had valued it for what it did, not for what it cost.'],
      mejora:L('Give the mean, the median AND the mode. When the three do not agree, that disagreement '+
        'is the finding.',
        'Da la media, la mediana Y la moda. Cuando las tres no coinciden, ese desacuerdo es el hallazgo.')}
  },
  semanas:[
    s(1, L('Gods that explain the world','Dioses que explican el mundo'),
      'Comunicación: el origen de los dioses griegos y el género épico; mapa conceptual del panteón.',
      L('Concept map of the myth','Mapa conceptual del mito'), 'web',
      L('Every culture explains the world with a story before explaining it with a formula.',
        'Toda cultura explica el mundo con una historia antes de explicarlo con una fórmula.')),
    s(2, L('What was it for?','¿Para qué servía?'),
      'Ciencias Sociales: valor de uso en chimú, moche y mexica. Se elige y se documenta un objeto.',
      L('Object file','Ficha del objeto'), 'card',
      L('An object that was worth a lot and cost nothing changes what you think value is.',
        'Un objeto que valía mucho y no costaba nada cambia lo que crees que es el valor.')),
    s(3, L('What do we value today?','¿Qué valoramos hoy?'),
      'Matemática: se diseña y se pasa una encuesta en el colegio; tabla de frecuencias.',
      L('Survey run','Encuesta pasada'), 'tally',
      L('Sixty answers say something your opinion alone cannot say.',
        'Sesenta respuestas dicen algo que tu opinión sola no puede decir.')),
    s(4, L('Reading the data','Leer los datos'),
      'Matemática: media, mediana y moda; gráficos estadísticos y su interpretación.',
      L('Graphs with their reading','Gráficos con su lectura'), 'chart',
      L('The number is easy. Saying what it means is the exercise.',
        'El número es lo fácil. Decir qué significa es el ejercicio.')),
    s(5, L('Forces that do not show','Fuerzas que no se ven'),
      'Ciencia: presión y magnetismo, con experimentos de campo magnético y electroimanes.',
      L('Experiment log','Registro del experimento'), 'experiment',
      L('You cannot see a magnetic field and yet you can map it. This week you do.',
        'No puedes ver un campo magnético y aun así puedes dibujarlo. Esta semana lo haces.')),
    s(6, L('Two rooms, one question','Dos salas, una pregunta'),
      'Montaje de la exposición y TED-Talk de tres minutos en inglés con el hallazgo.',
      L('Exhibition + TED-Talk','Exposición + TED-Talk'), 'stand',
      L('Put the two rooms next to each other and let the visitor draw the conclusion.',
        'Pon las dos salas juntas y deja que el visitante saque la conclusión.'))
  ],
  evaluacion:[
    {dimension:'Texto expositivo', areas:'COM',
     descriptor:'Explica el mito y el objeto con estructura y sin opinión encubierta.'},
    {dimension:'Estadística', areas:'MAT',
     descriptor:'La encuesta es comparable, y media, mediana y moda están bien calculadas e interpretadas.'},
    {dimension:'Comprensión cultural', areas:'CC.SS',
     descriptor:'Explica el valor de uso sin traducirlo a precio actual sin más.'},
    {dimension:'Investigación científica', areas:'CyT',
     descriptor:'El experimento de magnetismo o presión está diseñado y registrado.'},
    {dimension:'Exposición oral en inglés', areas:'ING',
     descriptor:'Tres minutos con idea principal clara y datos citados.'}
  ],
  perfil:[1,3,8],
  revisar:['El documento de 7.º de esta carpeta también dice "UNIDAD 3": corregir la cabecera.']
},

'g8.u4': {
  grado:8, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'🌿', from:'#14532d', to:'#7bc47f'},
  titulo:L('What is ours and what arrived','Lo nuestro y lo que llegó'),
  preguntaEsencial:L('What does an empire leave behind, and what was already here?',
                     '¿Qué deja un imperio, y qué ya estaba aquí?'),
  situacion:'Las Tradiciones peruanas de Ricardo Palma están llenas de arcaísmos: palabras que llegaron '+
    'y se quedaron. En la misma unidad, 8.º estudia los imperios romano y carolingio y, en Ciencia, la '+
    'biodiversidad con especies endémicas y exóticas. Es exactamente la misma pregunta en dos materias: '+
    'qué es propio de este sitio, qué llegó de fuera, qué desplazó a qué y qué convive.',
  tematicas:[
    {nombre:'Lo endémico y lo que llegó',
     aporta:[['cyt','Biodiversidad, especies endémicas y exóticas, estabilidad e impacto humano'],
             ['ccss','Imperio romano y carolingio, moneda, península'],
             ['com','Tradiciones peruanas, arcaísmos, paráfrasis']]},
    {nombre:'Medir lo que hay',
     aporta:[['mat','Ecuaciones lineales, sistemas, desigualdades e intervalos con problemas reales'],
             ['cyt','Especie, población, comunidad, ecosistema, bioma']]},
    {nombre:'Lo que sentimos ante lo que se pierde',
     aporta:[['sh','Emociones morales: culpa, vergüenza, indignación, gratitud, admiración'],
             ['ing','Argumentative essays y recitación'],
             ['arte','Obras independientes con propuesta personal']]}
  ],
  areas:{
    com:'Con Ciencia, el arcaísmo y la especie exótica son el mismo fenómeno: algo que llegó y se '+
        'naturalizó. La paráfrasis se practica sobre las dos.',
    mat:'Con Ciencia, los sistemas de ecuaciones modelan poblaciones que compiten por el mismo espacio.',
    cyt:'Con Ciencias Sociales, endémico y exótico se leen también en la lengua, la moneda y la comida.',
    ccss:'Con Comunicación, el imperio explica por qué hoy hablamos y contamos como contamos.',
    arte:'Con Spiritual History, la obra personal responde a lo que se pierde y a lo que se hereda.',
    ing:'Con Comunicación, el argumentative essay defiende qué habría que proteger y por qué.',
    sh:'Con Ciencia, las emociones morales explican por qué la pérdida de una especie o de una palabra duele.',
    fr:'Con Comunicación, la invitación y la posesión en francés practican el mismo campo: lo que es de quién.'
  },
  producto:{
    titulo:L('Inventory of what is ours','Inventario de lo nuestro'),
    descripcion:L('A double inventory of the school or the neighbourhood — species and words — telling '+
      'apart what is endemic from what arrived, with a population model, an argumentative essay on what '+
      'should be protected, and a personal artwork.',
      'Un inventario doble del colegio o del barrio —especies y palabras— que distingue lo endémico de '+
      'lo que llegó, con un modelo de poblaciones, un ensayo argumentativo sobre qué habría que '+
      'proteger y una obra personal.'),
    incluye:[L('The species inventory','El inventario de especies'),
             L('The word inventory','El inventario de palabras'),
             L('The population model','El modelo de poblaciones'),
             L('The argumentative essay','El ensayo argumentativo')],
    modelo:{tipo:'sort',
      partes:[L('endemic','endémico'), L('arrived','llegó')],
      apoyo:['This species is native to…', 'It was introduced in…',
             'I would argue that we should protect…'],
      mejora:L('Do not let the "arrived" column be the villain. Say which arrivals became part of what '+
        'we are, and which displaced something.',
        'No conviertas la columna de "lo que llegó" en el villano. Di qué llegadas se volvieron parte '+
        'de lo que somos y cuáles desplazaron algo.')}
  },
  semanas:[
    s(1, L('Words that arrived','Palabras que llegaron'),
      'Comunicación: Tradiciones peruanas, arcaísmos y paráfrasis. Primer inventario de palabras.',
      L('Word inventory','Inventario de palabras'), 'journal',
      L('You use words that crossed an ocean. This week you find out which ones.',
        'Usas palabras que cruzaron un océano. Esta semana descubres cuáles.')),
    s(2, L('Empires that leave things behind','Imperios que dejan cosas'),
      'Ciencias Sociales: imperio romano y carolingio, moneda, territorio. Qué se hereda de un imperio.',
      L('What the empire left','Lo que dejó el imperio'), 'card',
      L('An empire ends and its coins, its roads and its words stay. This week you list them.',
        'Un imperio acaba y quedan sus monedas, sus caminos y sus palabras. Esta semana los listas.')),
    s(3, L('Endemic or exotic','Endémico o exótico'),
      'Ciencia: especie, población, comunidad, ecosistema; endémicas y exóticas. Inventario de campo en '+
      'el colegio.',
      L('Species inventory','Inventario de especies'), 'log',
      L('There is something growing in this school that should not be here. This week you find it.',
        'Hay algo creciendo en este colegio que no debería estar aquí. Esta semana lo encuentras.')),
    s(4, L('Populations that compete','Poblaciones que compiten'),
      'Matemática: sistemas de ecuaciones e inecuaciones para modelar dos poblaciones que comparten espacio.',
      L('Population model','Modelo de poblaciones'), 'chart',
      L('Two species and one space is a system of equations. This week you write it.',
        'Dos especies y un espacio son un sistema de ecuaciones. Esta semana lo escribes.')),
    s(5, L('What should be protected','Qué habría que proteger'),
      'Inglés: argumentative essay con tesis, evidencia del inventario y contraargumento.',
      L('Argumentative essay','Ensayo argumentativo'), 'report',
      L('Protecting everything is protecting nothing. Choose one and defend that choice.',
        'Proteger todo es no proteger nada. Elige uno y defiende esa elección.')),
    s(6, L('The inventory, exhibited','El inventario, expuesto'),
      'Montaje del inventario doble con la obra personal y las emociones morales que lo acompañan.',
      L('Inventory exhibited','Inventario expuesto'), 'stand',
      L('Somebody will see their street on your wall. Make sure they recognise it.',
        'Alguien va a ver su calle en tu mural. Asegúrate de que la reconozca.'))
  ],
  evaluacion:[
    {dimension:'Trabajo con la lengua', areas:'COM',
     descriptor:'Identifica arcaísmos y parafrasea sin cambiar el sentido.'},
    {dimension:'Inventario y clasificación', areas:'CyT',
     descriptor:'Distingue endémico de exótico con criterio y registra el trabajo de campo.'},
    {dimension:'Modelado', areas:'MAT',
     descriptor:'El sistema de ecuaciones representa la competencia real y su solución se interpreta.'},
    {dimension:'Argumentación', areas:'ING · CC.SS',
     descriptor:'Defiende qué proteger con evidencia propia y se hace cargo del contraargumento.'},
    {dimension:'Expresión y emoción moral', areas:'ARTE · SH',
     descriptor:'La obra propone algo propio y sabe nombrar la emoción moral que la mueve.'}
  ],
  perfil:[1,3,5,8],
  revisar:['El documento de 8.º de esta carpeta dice "UNIDAD 3": corregir la cabecera.',
           'La biodiversidad de 8.º aparece igual en U4 y en U5: comprobar si es repetición o continuidad.']
},

'g9.u4': {
  grado:9, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'🤖', from:'#831843', to:'#f0a5c0'},
  titulo:L('A tradition you can sell without betraying it','Una tradición que se puede vender sin traicionarla'),
  preguntaEsencial:L('Where is the line between spreading a tradition and using it up?',
                     '¿Dónde está la línea entre difundir una tradición y gastarla?'),
  situacion:'9.º lee las Tradiciones peruanas y el tradicionalismo, y en la misma unidad ICT trabaja la '+
    'IA aplicada al emprendimiento: investigación de mercado, creación de contenido y evaluación de '+
    'riesgos. Poner las dos cosas juntas da un proyecto incómodo y muy real: se puede construir un '+
    'emprendimiento sobre una tradición peruana, y hay que decidir qué se respeta y qué no. Spiritual '+
    'History aporta justo el criterio: placer inmediato frente a bien a largo plazo.',
  tematicas:[
    {nombre:'La tradición como materia',
     aporta:[['com','Tradiciones peruanas, arcaísmos, paráfrasis, tradicionalismo en el Perú'],
             ['arte','Teatro clásico: cómo una forma antigua se vuelve a poner en pie']]},
    {nombre:'La herramienta y su riesgo',
     aporta:[['ict','IA para investigación de mercado, contenido y evaluación de riesgos y límites'],
             ['mat','Productos notables y factorización aplicados a modelos de costo']]},
    {nombre:'El criterio para decidir',
     aporta:[['sh','Placer frente a felicidad, gratificación inmediata frente a bienestar duradero'],
             ['ing','Different viewpoints, opinion pieces de hasta 750 palabras, revisión entre pares']]}
  ],
  areas:{
    com:'Con ICT, la tradición elegida se documenta y se parafrasea antes de convertirla en propuesta: '+
        'sin eso, el emprendimiento inventa folclore.',
    mat:'Con ICT, productos notables y factorización simplifican el modelo de costos del emprendimiento.',
    cyt:'Con ICT, la serie de reactividad da el caso de laboratorio para practicar la evaluación de '+
        'riesgos con datos antes de aplicarla al proyecto.',
    ccss:'Con Comunicación, las monarquías modernas muestran cómo un poder construye su propia tradición.',
    arte:'Con Comunicación, el teatro clásico es la prueba de que una forma antigua se sostiene si se '+
         'entiende, no si se decora.',
    ict:'Con Spiritual History, cada uso de IA se declara y se evalúa: qué hizo la herramienta y qué el equipo.',
    ing:'Con Comunicación, el opinion piece de 750 palabras es el alegato, y la revisión entre pares la corrección.',
    sh:'Con ICT, el criterio de bien a largo plazo se aplica a la propuesta antes de presentarla.',
    fr:'Con Comunicación, las anécdotas en pasado en francés entrenan el mismo relato en otra lengua.'
  },
  producto:{
    titulo:L('Cultural venture proposal','Propuesta de emprendimiento cultural'),
    descripcion:L('A venture proposal built on a documented Peruvian tradition, with market research '+
      'supported by AI (declared), a cost model, a risk assessment and an opinion piece defending '+
      'where the line is.',
      'Una propuesta de emprendimiento construida sobre una tradición peruana documentada, con '+
      'investigación de mercado apoyada en IA (declarada), modelo de costos, evaluación de riesgos y '+
      'un opinion piece que defiende dónde está la línea.'),
    incluye:[L('The documented tradition','La tradición documentada'),
             L('The market research and its AI use','La investigación de mercado y su uso de IA'),
             L('The cost model','El modelo de costos'),
             L('The opinion piece','El opinion piece')],
    modelo:{tipo:'report',
      partes:[L('the tradition','la tradición'), L('what we propose','qué proponemos'),
              L('what we will not do','qué no vamos a hacer')],
      apoyo:['This tradition comes from…', 'We used AI to…, and we checked it by…',
             'We will not use… because…'],
      mejora:L('The section that decides the mark is "what we will not do". A venture with no limits '+
        'written down has not thought about the tradition, only about the sale.',
        'El apartado que decide la nota es "qué no vamos a hacer". Un emprendimiento sin límites '+
        'escritos no ha pensado en la tradición, solo en la venta.')}
  },
  semanas:[
    s(1, L('The tradition, documented','La tradición, documentada'),
      'Comunicación: se elige una tradición y se documenta con fuentes; arcaísmos y paráfrasis.',
      L('Documented tradition','Tradición documentada'), 'journal',
      L('Before selling anything you have to be able to explain it. This week you explain it.',
        'Antes de vender algo hay que saber explicarlo. Esta semana lo explicas.')),
    s(2, L('Who would want it','A quién le interesaría'),
      'ICT: investigación de mercado con herramientas de IA, declarando cada uso y verificando resultados.',
      L('Market research','Investigación de mercado'), 'tally',
      L('AI will give you a confident answer even when it is wrong. This week you learn to check it.',
        'La IA te dará una respuesta segura aunque esté equivocada. Esta semana aprendes a comprobarla.')),
    s(3, L('The numbers','Los números'),
      'Matemática: productos notables y factorización para simplificar el modelo de costos.',
      L('Cost model','Modelo de costos'), 'chart',
      L('An idea starts being a project on the day it has a cost.',
        'Una idea empieza a ser proyecto el día que tiene un costo.')),
    s(4, L('The risks','Los riesgos'),
      'ICT y Ciencia: evaluación de riesgos y límites, con la serie de reactividad como práctica previa '+
      'de evaluar con datos.',
      L('Risk assessment','Evaluación de riesgos'), 'sort',
      L('The risk you did not write down is the one that will happen.',
        'El riesgo que no apuntaste es el que va a pasar.')),
    s(5, L('Where the line is','Dónde está la línea'),
      'Inglés y Spiritual History: opinion piece de hasta 750 palabras con revisión entre pares.',
      L('Opinion piece','Opinion piece'), 'report',
      L('Somebody in your class will disagree with your line. Ask them before you hand it in.',
        'Alguien de tu clase no estará de acuerdo con tu línea. Pregúntale antes de entregar.')),
    s(6, L('The pitch','La presentación'),
      'Presentación de la propuesta con el teatro clásico abriendo la sesión.',
      L('Proposal presented','Propuesta presentada'), 'speech',
      L('Say the limit out loud in your pitch. That is what separates a venture from a raid.',
        'Di el límite en voz alta en tu presentación. Eso separa un emprendimiento de un saqueo.'))
  ],
  evaluacion:[
    {dimension:'Documentación cultural', areas:'COM',
     descriptor:'La tradición está documentada con fuentes y explicada sin folclorizarla.'},
    {dimension:'Uso responsable de la IA', areas:'ICT',
     descriptor:'Declara qué hizo con IA, cómo lo verificó y qué descartó.'},
    {dimension:'Modelo económico', areas:'MAT',
     descriptor:'Los costos están calculados y las expresiones algebraicas correctamente simplificadas.'},
    {dimension:'Argumentación ética', areas:'ING · SH',
     descriptor:'Defiende dónde está el límite con un criterio explícito.'},
    {dimension:'Presentación', areas:'ARTE · ING',
     descriptor:'La propuesta se entiende, se sostiene y responde preguntas.'}
  ],
  perfil:[1,7,9,10],
  revisar:['9.º es el grado donde el uso de IA está más cargado: conviene que la política de declaración de uso salga de aquí para todo el nivel.']
},

'g10.u4': {
  grado:10, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'🏭', from:'#422006', to:'#d6a760'},
  titulo:L('The city the industry built','La ciudad que la industria construyó'),
  preguntaEsencial:L('What did the machine change in the way people live, and who was left out?',
                     '¿Qué cambió la máquina en la forma de vivir, y quién quedó fuera?'),
  situacion:'Ña Catita retrata las costumbres de una ciudad que estaba a punto de cambiar. En la misma '+
    'unidad, 10.º estudia las revoluciones industriales, en Matemática geometría analítica —con el '+
    'diagrama de Voronoi, que es la herramienta con la que hoy se estudia qué zona atiende cada '+
    'servicio—, en Enterprise el plan financiero y en Spiritual History el deber kantiano. La unidad '+
    'permite mirar el barrio del colegio con las herramientas de las cuatro.',
  tematicas:[
    {nombre:'La ciudad que cambia',
     aporta:[['ccss','Revoluciones industriales'],
             ['com','Ña Catita, costumbrismo, artículo de opinión'],
             ['arte','Historia del rock 1950-2000: la música de la ciudad industrial']]},
    {nombre:'Medir el territorio',
     aporta:[['mat','Geometría analítica: recta, distancias, rectas paralelas y perpendiculares, Voronoi'],
             ['ent','Planificación financiera, presupuesto, informes y ética empresarial']]},
    {nombre:'Con qué deber',
     aporta:[['sh','Ética kantiana: deber, intención, imperativo categórico'],
             ['ing','Debates, podcast en parejas, textos complejos, borradores sucesivos']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el costumbrismo es el retrato de lo que la industria estaba a punto de '+
        'borrar; el artículo de opinión toma partido con datos.',
    mat:'Con Enterprise, el diagrama de Voronoi divide el barrio por servicio más cercano y muestra a '+
        'quién le queda lejos todo.',
    cyt:'Ciencia y Tecnología no está cargada en esta unidad de 10.º; si entra, la huella ambiental de '+
        'la industria es su sitio natural.',
    ccss:'Con Matemática, la revolución industrial se estudia sobre el mapa del propio distrito.',
    arte:'Con Ciencias Sociales, la historia del rock enseña cómo la ciudad industrial produjo su propia música.',
    ent:'Con Matemática, el plan financiero se apoya en el análisis del territorio y en la ética empresarial.',
    ing:'Con Comunicación, el debate y el podcast en parejas cierran el proyecto.',
    sh:'Con Enterprise, el imperativo categórico es la prueba a la que se somete la decisión empresarial.',
    fr:'Con Comunicación, las recomendaciones y el mensaje amistoso en francés practican el registro del consejo.'
  },
  producto:{
    titulo:L('Voronoi of my district','Voronoi de mi distrito'),
    descripcion:L('An analysis of the school district with a Voronoi diagram of a real service — health '+
      'centres, parks, markets — showing who has everything far away, plus a financial plan for a '+
      'proposal and an opinion article.',
      'Un análisis del distrito del colegio con un diagrama de Voronoi de un servicio real —centros de '+
      'salud, parques, mercados— que muestra a quién le queda todo lejos, más el plan financiero de una '+
      'propuesta y un artículo de opinión.'),
    incluye:[L('The Voronoi diagram','El diagrama de Voronoi'),
             L('Who is left out','Quién queda fuera'),
             L('The financial plan','El plan financiero'),
             L('The opinion article','El artículo de opinión')],
    modelo:{tipo:'map',
      partes:[L('the service points','los puntos de servicio'), L('the areas','las áreas'),
              L('who is far from everything','quién está lejos de todo')],
      apoyo:['The diagram shows that…', 'People living here are 1.8 km from the nearest…',
             'We would therefore recommend…'],
      mejora:L('A pretty map that does not name anybody is decoration. Say which streets are the ones '+
        'left out.',
        'Un mapa bonito que no nombra a nadie es decoración. Di qué calles son las que quedan fuera.')}
  },
  semanas:[
    s(1, L('The city before the machine','La ciudad antes de la máquina'),
      'Comunicación: Ña Catita y el costumbrismo. Qué retrata y qué da por hecho.',
      L('Costumbrist portrait','Retrato costumbrista'), 'journal',
      L('Costumbrism records what is about to disappear. This week you notice what is disappearing now.',
        'El costumbrismo registra lo que va a desaparecer. Esta semana notas qué está desapareciendo ahora.')),
    s(2, L('The industrial revolutions','Las revoluciones industriales'),
      'Ciencias Sociales: qué cambió en el trabajo, la ciudad y el tiempo. Se elige el servicio a estudiar.',
      L('The change, documented','El cambio, documentado'), 'card',
      L('The machine did not just make things faster: it decided where people would live.',
        'La máquina no solo hizo las cosas más rápido: decidió dónde iba a vivir la gente.')),
    s(3, L('Dividing the territory','Dividir el territorio'),
      'Matemática: coordenadas, distancias, mediatrices y diagrama de Voronoi del servicio elegido.',
      L('Voronoi diagram','Diagrama de Voronoi'), 'map',
      L('A perpendicular bisector decides who goes where. This week your maths draws a real map.',
        'Una mediatriz decide quién va adónde. Esta semana tus matemáticas dibujan un mapa real.')),
    s(4, L('What it would cost','Cuánto costaría'),
      'Enterprise: plan financiero de la propuesta que corrige el desequilibrio, con informe básico.',
      L('Financial plan','Plan financiero'), 'chart',
      L('A proposal without a budget is a complaint with better handwriting.',
        'Una propuesta sin presupuesto es una queja con mejor letra.')),
    s(5, L('The article','El artículo'),
      'Comunicación e Inglés: artículo de opinión con datos del mapa y borradores sucesivos.',
      L('Opinion article','Artículo de opinión'), 'report',
      L('An opinion with a map behind it stops being an opinion.',
        'Una opinión con un mapa detrás deja de ser una opinión.')),
    s(6, L('The debate and the podcast','El debate y el podcast'),
      'Debate con apoyo visual y podcast en parejas; el deber kantiano como criterio de la decisión.',
      L('Debate + podcast','Debate + podcast'), 'stand',
      L('Ask yourself Kant’s question out loud: what if everybody decided like this?',
        'Hazte la pregunta de Kant en voz alta: ¿y si todos decidieran así?'))
  ],
  evaluacion:[
    {dimension:'Geometría analítica', areas:'MAT',
     descriptor:'El diagrama está construido con mediatrices correctas y las distancias son reales.'},
    {dimension:'Análisis histórico', areas:'CC.SS',
     descriptor:'Relaciona la revolución industrial con la forma actual del distrito.'},
    {dimension:'Plan financiero', areas:'ENT',
     descriptor:'El presupuesto es realista y declara sus supuestos.'},
    {dimension:'Artículo y debate', areas:'COM · ING',
     descriptor:'Toma partido con datos y responde a la objeción principal.'},
    {dimension:'Criterio ético', areas:'SH',
     descriptor:'Somete la propuesta al imperativo categórico y explica el resultado.'}
  ],
  perfil:[3,7,8,9],
  revisar:['Ciencia y Tecnología no está cargada en U4 de 10.º: si se carga, la huella ambiental de la industria encaja sin forzar nada.']
},

'g11.u4': {
  grado:11, proyecto:3, unidad:4, mes:'Agosto', semanas:6,
  cover:{icon:'🧱', from:'#0c4a6e', to:'#8ecae6'},
  titulo:L('Walls','Muros'),
  preguntaEsencial:L('What does a wall do to the people on each side, and what happens when art crosses it?',
                     '¿Qué le hace un muro a la gente de cada lado, y qué pasa cuando el arte lo cruza?'),
  situacion:'La Guerra Fría se explica con un muro, y el arte de impacto social que 11.º estudia —JR, '+
    'Blu, Swoon— trabaja literalmente sobre muros. En la misma unidad, Enterprise pide un plan de '+
    'negocio con gestión de riesgos, y Spiritual History discute la muerte de Dios y la crisis de '+
    'valores de la modernidad. La unidad tiene un eje evidente y sin declarar: qué separa, quién lo '+
    'decide y qué se puede hacer con eso.',
  tematicas:[
    {nombre:'Lo que separa',
     aporta:[['ccss','Guerra Fría, comunismo, capitalismo, globalización'],
             ['com','Las tres viudas, costumbrismo, artículo de opinión']]},
    {nombre:'El arte que interviene',
     aporta:[['arte','Proyecto de impacto social: JR, Blu, Swoon; investigación independiente'],
             ['ing','Impromptu speeches, TED talks, análisis literario, punto de vista']]},
    {nombre:'Sostenerlo en el mundo real',
     aporta:[['ent','Plan de negocio completo, gestión de riesgos, cumplimiento normativo'],
             ['mat','Cálculo integral y geometría analítica avanzada: áreas y curvas reales'],
             ['sh','Nietzsche, nihilismo, crisis de valores, existencialismo']]}
  ],
  areas:{
    com:'Con Ciencias Sociales, el costumbrismo local y el relato de la Guerra Fría se comparan como dos '+
        'formas de contar quién es "el otro".',
    mat:'Con Arte, el cálculo de áreas de figuras irregulares mide la superficie real de la intervención '+
        'y su costo de material.',
    cyt:'Ciencia y Tecnología no está cargada en U4 de 11.º; el proyecto no la fuerza.',
    ccss:'Con Arte, cada muro histórico se empareja con una intervención artística documentada.',
    arte:'Con Enterprise, la obra de impacto social necesita permisos, presupuesto y riesgos: se trata '+
         'como un proyecto real, no como una idea.',
    ent:'Con Arte, el plan de negocio y la evaluación de riesgos se aplican a la propia intervención.',
    ing:'Inglés NO está cargada en U4 de 11.º en el documento del colegio. La defensa pública se apoya '+
        'mientras tanto en Comunicación; si Inglés se carga, el impromptu speech y el análisis literario son su sitio.',
    sh:'Con Ciencias Sociales, la crisis de valores da el marco para preguntar en nombre de qué se levanta un muro.',
    fr:'Con Comunicación, hablar de las relaciones con los demás en francés toca el mismo asunto en otra lengua.'
  },
  producto:{
    titulo:L('Wall intervention, with its plan','Intervención sobre un muro, con su plan'),
    descripcion:L('A documented social-impact art intervention on a real wall of the school or the '+
      'neighbourhood, with permits, budget, risk assessment, area calculation and a public defence.',
      'Una intervención artística de impacto social documentada sobre un muro real del colegio o del '+
      'barrio, con permisos, presupuesto, evaluación de riesgos, cálculo de la superficie y defensa '+
      'pública.'),
    incluye:[L('The intervention, documented','La intervención, documentada'),
             L('The area and material calculation','El cálculo de superficie y material'),
             L('The plan with its risks','El plan con sus riesgos'),
             L('The public defence','La defensa pública')],
    modelo:{tipo:'model',
      partes:[L('the wall and its measurements','el muro y sus medidas'),
              L('what it says','qué dice'), L('who it is for','para quién es')],
      apoyo:['The intervention covers 12.4 m² of the north wall.',
             'The main risk is…, and we would manage it by…',
             'What we want the neighbourhood to see is…'],
      mejora:L('Ask for the permit before designing. An intervention nobody authorised is not braver: '+
        'it is one that will not exist.',
        'Pide el permiso antes de diseñar. Una intervención que nadie autorizó no es más valiente: es '+
        'una que no va a existir.')}
  },
  semanas:[
    s(1, L('The wall in history','El muro en la historia'),
      'Ciencias Sociales: Guerra Fría, bloques, globalización. Se elige el muro histórico de referencia.',
      L('The historical wall','El muro histórico'), 'card',
      L('A wall is a decision that lasts longer than the people who took it.',
        'Un muro es una decisión que dura más que quien la tomó.')),
    s(2, L('Artists who intervene','Artistas que intervienen'),
      'Arte: JR, Blu y Swoon; investigación independiente sobre una obra y su efecto.',
      L('Artist study','Estudio del artista'), 'journal',
      L('These artists worked without permission and paid for it. Read what it cost them.',
        'Estos artistas trabajaron sin permiso y lo pagaron. Lee lo que les costó.')),
    s(3, L('The wall we have','El muro que tenemos'),
      'Se elige el muro real, se mide su superficie con cálculo de áreas y se pide el permiso.',
      L('Wall, measured and authorised','Muro medido y autorizado'), 'plan',
      L('Measuring the wall is the moment the project stops being an idea.',
        'Medir el muro es el momento en que el proyecto deja de ser una idea.')),
    s(4, L('The plan and its risks','El plan y sus riesgos'),
      'Enterprise: plan completo, gestión de riesgos, cumplimiento normativo, cronograma.',
      L('Plan with risk matrix','Plan con matriz de riesgos'), 'report',
      L('Write down the risk that could stop everything. Then write who watches it.',
        'Apunta el riesgo que podría parar todo. Después apunta quién lo vigila.')),
    s(5, L('The intervention','La intervención'),
      'Ejecución y documentación fotográfica; registro del proceso y de la reacción.',
      L('Intervention executed','Intervención ejecutada'), 'model',
      L('Document it while it happens. Afterwards there is only the result, and the result is half the work.',
        'Documéntalo mientras pasa. Después solo queda el resultado, y el resultado es la mitad del trabajo.')),
    s(6, L('The public defence','La defensa pública'),
      'Defensa ante público con impromptu speech y preguntas; se entrega el expediente completo.',
      L('Defence and dossier','Defensa y expediente'), 'speech',
      L('Somebody will ask why it had to be on a wall. Have the answer ready.',
        'Alguien va a preguntar por qué tenía que ser en un muro. Ten la respuesta lista.'))
  ],
  evaluacion:[
    {dimension:'Investigación artística', areas:'ARTE',
     descriptor:'Estudia a los artistas de referencia y su propuesta dialoga con ellos, no los copia.'},
    {dimension:'Análisis histórico', areas:'CC.SS',
     descriptor:'Explica el muro histórico elegido y lo relaciona con el actual con criterio.'},
    {dimension:'Cálculo y medición', areas:'MAT',
     descriptor:'La superficie está calculada correctamente y el material se estima a partir de ella.'},
    {dimension:'Planificación y riesgo', areas:'ENT',
     descriptor:'El plan es ejecutable, tiene permisos y la matriz de riesgos es realista.'},
    {dimension:'Defensa pública', areas:'ING · SH',
     descriptor:'Sostiene la propuesta ante preguntas y argumenta en qué valores se apoya.'}
  ],
  perfil:[3,4,7,10],
  revisar:['La intervención necesita autorización de dirección y, si sale del colegio, del vecino o del municipio: hay que pedirla en la semana 3 o el proyecto se queda en maqueta.',
           'En el documento de 11.º, U4 no carga Inglés ni Ciencia y Tecnología: la propuesta no las cuenta y lo dice.']
},
/* ====================================== UNIDAD 5 · Proyecto 4 · Setiembre
 *
 * ATENCION: el documento de U5 esta a medio cargar en los seis grados. Faltan
 * Comunicacion, Ciencias Sociales, ICT y PE en todos, y en varios tambien
 * Ingles y Ciencia. Lo que SI esta cargado en cuatro de los seis grados es
 * "Creative Arts Show Repertoir", con la pieza concreta que cada grado toca.
 * O sea: la unidad ya tiene un ancla comun en todo el nivel y no esta
 * declarada. Estas seis propuestas se apoyan en eso y en lo demas que hay
 * cargado; donde el area esta vacia se dice, no se inventa el contenido.
 */

'g6.u5': {
  grado:6, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'🎻', from:'#5b21b6', to:'#c4b5fd'},
  titulo:L('The programme of the Show','El programa del Show'),
  preguntaEsencial:L('What is a piece of music made of, and what is the instrument that plays it made of?',
                     '¿De qué está hecha una pieza de música, y de qué está hecho el instrumento que la toca?'),
  situacion:'6.º toca el Canon en Re de Pachelbel en el Creative Arts Show. En la misma unidad, Ciencia '+
    'estudia elementos, compuestos y mezclas, y Spiritual History una introducción al judaísmo, donde la '+
    'música es parte del rito. El programa de mano del Show puede ser el producto que junta las tres: '+
    'qué se toca, de qué está hecho lo que suena y para qué comunidad la música es parte de lo sagrado.',
  tematicas:[
    {nombre:'La pieza que se toca',
     aporta:[['arte','Creative Arts Show: Canon in D, de Pachelbel'],
             ['sh','Introducción al judaísmo: la música dentro del rito']]},
    {nombre:'De qué está hecho lo que suena',
     aporta:[['cyt','Elementos, compuestos y mezclas']]}
  ],
  areas:{
    arte:'Con Ciencia, ensayar la pieza y estudiar de qué está hecho el instrumento ocurre en la misma semana.',
    cyt:'Con Arte, la madera, el metal y la cuerda del instrumento son el caso real de elemento, compuesto y mezcla.',
    sh:'Con Arte, el papel de la música en el rito judío abre la pregunta de para qué sirve tocar juntos.'
  },
  producto:{
    titulo:L('The Show programme','El programa de mano del Show'),
    descripcion:L('The printed programme of the Creative Arts Show: the piece, who wrote it, what the '+
      'instruments are made of, and what music is for in one community that ritualises it.',
      'El programa impreso del Creative Arts Show: la pieza, quién la escribió, de qué están hechos los '+
      'instrumentos y para qué sirve la música en una comunidad que la ritualiza.'),
    incluye:[L('The piece and its author','La pieza y su autor'),
             L('What the instrument is made of','De qué está hecho el instrumento'),
             L('Music in the rite','La música en el rito'),
             L('The performance','La interpretación')],
    modelo:{tipo:'leaflet',
      partes:[L('the programme','el programa'), L('the instrument, explained','el instrumento, explicado')],
      apoyo:['Tonight we are playing…', 'The strings are made of…', 'Please turn off your phone.'],
      mejora:L('A programme that only lists titles is a list. Add one thing the audience would not know.',
        'Un programa que solo lista títulos es una lista. Añade una cosa que el público no sabría.')}
  },
  semanas:[
    s(1, L('The piece','La pieza'), 'Se lee y se escucha el Canon en Re; se reparten voces.',
      L('Score and parts','Partitura y voces'), 'journal',
      L('The same eight notes, over and over, and it never gets boring. This week you find out why.',
        'Las mismas ocho notas, una y otra vez, y no aburre. Esta semana descubres por qué.')),
    s(2, L('Element, compound, mixture','Elemento, compuesto, mezcla'),
      'Ciencia: se clasifica lo que compone el propio instrumento.',
      L('Instrument classified','Instrumento clasificado'), 'sort',
      L('Your instrument is a chemistry lesson you can hold.',
        'Tu instrumento es una clase de química que puedes coger con las manos.')),
    s(3, L('Music in the rite','La música en el rito'),
      'Spiritual History: qué papel tiene la música en la comunidad estudiada.',
      L('Note on the rite','Apunte sobre el rito'), 'card',
      L('Somebody has been singing this for centuries because it holds them together.',
        'Alguien lleva siglos cantando esto porque los mantiene juntos.')),
    s(4, L('Rehearsal','Ensayo'), 'Ensayo con las voces completas y ajuste de tiempos.',
      L('Full rehearsal','Ensayo completo'), 'speech',
      L('The rehearsal where it goes wrong is the one that saves the show.',
        'El ensayo en que sale mal es el que salva el espectáculo.')),
    s(5, L('The programme','El programa'), 'Se maqueta e imprime el programa de mano.',
      L('Programme, printed','Programa impreso'), 'leaflet',
      L('Somebody will keep this programme. Write it for that person.',
        'Alguien se va a guardar este programa. Escríbelo para esa persona.')),
    s(6, L('The Show','El Show'), 'Creative Arts Show ante público.',
      L('The performance','La interpretación'), 'stand',
      L('Tonight you are not a student, you are a musician. Breathe before the first note.',
        'Esta noche no eres alumno, eres músico. Respira antes de la primera nota.'))
  ],
  evaluacion:[
    {dimension:'Interpretación', areas:'ARTE', descriptor:'Toca su parte en tiempo y escucha al conjunto.'},
    {dimension:'Clasificación de la materia', areas:'CyT', descriptor:'Distingue elemento, compuesto y mezcla con ejemplos del propio instrumento.'},
    {dimension:'Comprensión del rito', areas:'SH', descriptor:'Explica qué función cumple la música en la comunidad estudiada.'},
    {dimension:'Producción del programa', areas:'todas', descriptor:'El programa es correcto, legible y aporta algo que el público no sabía.'}
  ],
  perfil:[2,4,10],
  revisar:['En 6.º, U5 solo tiene cargadas tres áreas: Comunicación, Matemática, Ciencias Sociales, ICT, Inglés y PE están vacías. Con ellas cargadas, este proyecto puede crecer mucho.']
},

'g7.u5': {
  grado:7, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'🗂️', from:'#065f46', to:'#6ee7b7'},
  titulo:L('Classifying to understand','Clasificar para entender'),
  preguntaEsencial:L('What do you gain, and what do you lose, when you put something in a category?',
                     '¿Qué se gana y qué se pierde cuando pones algo en una categoría?'),
  situacion:'7.º clasifica la vida en dominios y reinos, y a la vez prepara para el Creative Arts Show '+
    'un Liszt y un Bach, que son dos casillas de otra clasificación. Y en Matemática trabaja fracciones '+
    'y decimales, que es con lo que se escribe un compás. Clasificar es la operación de toda la unidad.',
  tematicas:[
    {nombre:'Ordenar lo vivo',
     aporta:[['cyt','Dominios y reinos; animalia: vertebrados e invertebrados']]},
    {nombre:'Ordenar lo que suena',
     aporta:[['arte','Creative Arts Show: Liebestraum n.º 3 de Liszt y Minuet in G de Bach'],
             ['mat','Fracciones y decimales: orden, operaciones y equivalencias']]}
  ],
  areas:{
    cyt:'Con Arte, la clave dicotómica de la clasificación biológica y la de los periodos musicales '+
        'funcionan igual: preguntas que parten el conjunto en dos.',
    arte:'Con Matemática, el compás es una fracción y el tempo un decimal: leer la partitura es leer números.',
    mat:'Con Arte, las fracciones se practican donde se usan de verdad: en los tiempos de la pieza.'
  },
  producto:{
    titulo:L('The double key','La doble clave'),
    descripcion:L('A dichotomous key that classifies living things and another that classifies the '+
      'pieces of the Show, plus the performance with its beats written as fractions.',
      'Una clave dicotómica que clasifica seres vivos y otra que clasifica las piezas del Show, más la '+
      'interpretación con sus tiempos escritos en fracciones.'),
    incluye:[L('The biological key','La clave biológica'),
             L('The musical key','La clave musical'),
             L('The beats in fractions','Los tiempos en fracciones'),
             L('The performance','La interpretación')],
    modelo:{tipo:'sort',
      partes:[L('with backbone','con columna'), L('without','sin columna'), L('the criterion','el criterio')],
      apoyo:['Does it have a backbone?', 'If yes, go to 4.', 'This piece is from the Classical period.'],
      mejora:L('A key that only works for the examples you chose is not a key. Test it with one you '+
        'did not use.',
        'Una clave que solo funciona con los ejemplos que elegiste no es una clave. Pruébala con uno '+
        'que no usaste.')}
  },
  semanas:[
    s(1, L('Domains and kingdoms','Dominios y reinos'), 'Ciencia: los grandes grupos y sus criterios.',
      L('The criteria','Los criterios'), 'diagram',
      L('Every classification is somebody’s decision. This week you see the decisions.',
        'Toda clasificación es la decisión de alguien. Esta semana ves las decisiones.')),
    s(2, L('The dichotomous key','La clave dicotómica'), 'Se construye la clave con especies del colegio.',
      L('Biological key','Clave biológica'), 'sort',
      L('Two questions can separate a thousand species. That is the whole trick.',
        'Dos preguntas pueden separar mil especies. Ese es todo el truco.')),
    s(3, L('Beats as fractions','Los tiempos como fracciones'),
      'Matemática: fracciones y decimales aplicados al compás y al tempo de las piezas.',
      L('Beats in fractions','Tiempos en fracciones'), 'chart',
      L('Music has been written in fractions for four hundred years and nobody told you.',
        'La música se escribe en fracciones desde hace cuatrocientos años y nadie te lo había dicho.')),
    s(4, L('Two periods, two pieces','Dos periodos, dos piezas'),
      'Arte: qué separa a Bach de Liszt; se construye la clave musical.',
      L('Musical key','Clave musical'), 'timeline',
      L('The same instrument, a hundred years apart, and it sounds like another world.',
        'El mismo instrumento, cien años después, y suena a otro mundo.')),
    s(5, L('Rehearsal','Ensayo'), 'Ensayo completo con tiempos ajustados.',
      L('Full rehearsal','Ensayo completo'), 'speech',
      L('Count out loud in rehearsal. Nobody will hear you tonight.',
        'Cuenta en voz alta en el ensayo. Esta noche no te va a oír nadie.')),
    s(6, L('The Show and the keys','El Show y las claves'),
      'Interpretación en el Show y exposición de las dos claves.',
      L('Show + keys','Show + claves'), 'stand',
      L('Show somebody your key and let them use it. That is the test.',
        'Enséñale tu clave a alguien y deja que la use. Esa es la prueba.'))
  ],
  evaluacion:[
    {dimension:'Clasificación biológica', areas:'CyT', descriptor:'La clave usa criterios observables y funciona con especies nuevas.'},
    {dimension:'Fracciones y decimales', areas:'MAT', descriptor:'Convierte, ordena y opera correctamente con los tiempos de la pieza.'},
    {dimension:'Interpretación', areas:'ARTE', descriptor:'Toca su parte y sitúa la pieza en su periodo.'},
    {dimension:'Comunicación del criterio', areas:'todas', descriptor:'Explica su clave a alguien que no la conocía.'}
  ],
  perfil:[4,8],
  revisar:['En 7.º, U5 solo tiene cargadas tres áreas. Comunicación, Ciencias Sociales, Inglés, ICT, Spiritual History y PE están vacías.']
},

'g8.u5': {
  grado:8, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'📊', from:'#7c2d12', to:'#fdba74'},
  titulo:L('What does the audience like?','¿Qué le gusta al público?'),
  preguntaEsencial:L('Should the programme be chosen by taste, by data, or by what is worth playing?',
                     '¿El repertorio se elige por gusto, por datos o por lo que vale la pena tocar?'),
  situacion:'8.º toca Riptide y The Lazy Song en el Creative Arts Show y, en la misma unidad, estudia '+
    'tablas de frecuencia, media, mediana, moda y probabilidad de Laplace, y en Inglés hace '+
    'presentaciones orales sobre preferencias. Es el proyecto más redondo de la unidad: elegir el '+
    'repertorio con datos propios y defender la elección.',
  tematicas:[
    {nombre:'Medir el gusto',
     aporta:[['mat','Tablas de frecuencia, gráficos, media, mediana, moda, probabilidad de Laplace'],
             ['ing','Oral presentations on preferences, entonación, ensayos argumentativos de 300-350 palabras']]},
    {nombre:'Lo que sostiene la vida alrededor',
     aporta:[['cyt','Biodiversidad, ecosistemas, especies endémicas y exóticas, impacto humano']]},
    {nombre:'Lo que se toca',
     aporta:[['arte','Creative Arts Show: Riptide y The Lazy Song']]}
  ],
  areas:{
    mat:'Con Arte, la encuesta de preferencias musicales del colegio decide (o discute) el repertorio.',
    ing:'Con Matemática, la presentación oral sobre preferencias usa los datos propios y no impresiones.',
    cyt:'Con Matemática, la biodiversidad aporta el segundo conjunto de datos: frecuencias de especies en el patio.',
    arte:'Con Inglés, la interpretación se presenta con su porqué.'
  },
  producto:{
    titulo:L('The programme, decided with data','El repertorio, decidido con datos'),
    descripcion:L('A school-wide preference survey, its statistical analysis, and an argued decision '+
      'about the Show programme — including the case for playing something the survey did not choose.',
      'Una encuesta de preferencias en el colegio, su análisis estadístico y una decisión argumentada '+
      'sobre el repertorio del Show — incluido el alegato a favor de tocar algo que la encuesta no eligió.'),
    incluye:[L('The survey and its tables','La encuesta y sus tablas'),
             L('Mean, median and mode','Media, mediana y moda'),
             L('The argued decision','La decisión argumentada'),
             L('The performance','La interpretación')],
    modelo:{tipo:'chart',
      partes:[L('what we asked','qué preguntamos'), L('how many answered','cuántos respondieron')],
      apoyo:['We surveyed 120 students.', 'The most popular was…, but…',
             'I would argue that popularity is not the only criterion.'],
      mejora:L('Include the argument for NOT following the survey. A programme decided only by majority '+
        'never plays anything new.',
        'Incluye el argumento para NO seguir la encuesta. Un repertorio decidido solo por mayoría no '+
        'toca nunca nada nuevo.')}
  },
  semanas:[
    s(1, L('The question','La pregunta'), 'Se diseña la encuesta: opciones cerradas y muestra.',
      L('Survey designed','Encuesta diseñada'), 'question',
      L('A badly written question ruins two weeks of work. This week you write it well.',
        'Una pregunta mal escrita arruina dos semanas de trabajo. Esta semana la escribes bien.')),
    s(2, L('The data','Los datos'), 'Se pasa la encuesta y se tabula en frecuencias.',
      L('Frequency table','Tabla de frecuencias'), 'tally',
      L('One hundred and twenty answers is a fact. Your taste is an anecdote.',
        'Ciento veinte respuestas son un hecho. Tu gusto es una anécdota.')),
    s(3, L('Mean, median, mode','Media, mediana, moda'),
      'Matemática: cálculo e interpretación; probabilidad de Laplace sobre el mismo conjunto.',
      L('Analysis with its reading','Análisis con su lectura'), 'chart',
      L('When the three measures disagree, that is where the interesting thing is.',
        'Cuando las tres medidas no coinciden, ahí está lo interesante.')),
    s(4, L('The other data set','El otro conjunto de datos'),
      'Ciencia: conteo de especies en el patio; frecuencias comparadas con las de la encuesta.',
      L('Species count','Conteo de especies'), 'log',
      L('The same statistics that count songs count species. This week you use them twice.',
        'La misma estadística que cuenta canciones cuenta especies. Esta semana la usas dos veces.')),
    s(5, L('The decision','La decisión'),
      'Inglés: presentación oral sobre preferencias y ensayo argumentativo con la decisión y su porqué.',
      L('Argued decision','Decisión argumentada'), 'report',
      L('Deciding against the majority requires better reasons. Write them.',
        'Decidir contra la mayoría exige mejores razones. Escríbelas.')),
    s(6, L('The Show','El Show'), 'Interpretación en el Creative Arts Show con el repertorio decidido.',
      L('The performance','La interpretación'), 'stand',
      L('Tonight the data has a sound. Play it as if you had chosen it, because you did.',
        'Esta noche los datos suenan. Tócalos como si los hubieras elegido, porque los elegiste.'))
  ],
  evaluacion:[
    {dimension:'Diseño y análisis estadístico', areas:'MAT', descriptor:'La encuesta es comparable y las medidas están bien calculadas e interpretadas.'},
    {dimension:'Argumentación en inglés', areas:'ING', descriptor:'Presenta y defiende la decisión con datos y con contraargumento.'},
    {dimension:'Trabajo de campo', areas:'CyT', descriptor:'El conteo de especies está registrado con método.'},
    {dimension:'Interpretación', areas:'ARTE', descriptor:'Toca su parte y explica por qué está en el programa.'}
  ],
  perfil:[2,4,8],
  revisar:['En 8.º, U5 tiene cargadas cuatro áreas de nueve. Comunicación, Ciencias Sociales, ICT, Spiritual History y PE están vacías.',
           'La biodiversidad de 8.º aparece igual en U4 y U5: confirmar si es continuidad o copia.']
},

'g9.u5': {
  grado:9, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'📱', from:'#0f172a', to:'#60a5fa'},
  titulo:L('Does this make anybody happier?','¿Esto hace más feliz a alguien?'),
  preguntaEsencial:L('We can build it — but does it improve anybody’s life, and how would we know?',
                     'Podemos construirlo, pero ¿le mejora la vida a alguien, y cómo lo sabríamos?'),
  situacion:'9.º desarrolla aplicaciones y trabaja con Arduino, y en la misma unidad Filosofía pregunta '+
    'qué significa ser feliz. Juntas dan la pregunta que la industria tecnológica evita: se puede '+
    'construir, pero ¿para qué? Matemática aporta funciones y progresiones, que es con lo que se modela '+
    'el uso real de una aplicación.',
  tematicas:[
    {nombre:'Construir algo que funcione',
     aporta:[['ict','Desarrollo de apps y web (Mimo), Arduino, robótica, algoritmos'],
             ['mat','Dominio y rango, función cuadrática, valor absoluto, sucesiones y progresión geométrica']]},
    {nombre:'Preguntarse para qué',
     aporta:[['fil','¿Qué significa ser feliz?: felicidad como estado, como práctica y como vida buena']]}
  ],
  areas:{
    ict:'Con Filosofía, cada funcionalidad se justifica: qué problema resuelve y a quién.',
    mat:'Con ICT, las funciones y las progresiones modelan el crecimiento del uso y sus límites.',
    fil:'Con ICT, la definición de felicidad elegida se convierte en criterio de diseño, no en decoración.'
  },
  producto:{
    titulo:L('The thing we built, and its purpose','La cosa que construimos, y para qué'),
    descripcion:L('A working app or Arduino device solving a real problem of the school, with a use '+
      'model, and a philosophical justification of why it improves somebody’s life.',
      'Una app o un dispositivo Arduino que funciona y resuelve un problema real del colegio, con un '+
      'modelo de uso y una justificación filosófica de por qué le mejora la vida a alguien.'),
    incluye:[L('The working prototype','El prototipo que funciona'),
             L('The use model','El modelo de uso'),
             L('The purpose, argued','El para qué, argumentado'),
             L('The user test','La prueba con usuarios')],
    modelo:{tipo:'prototype',
      partes:[L('what it does','qué hace'), L('who uses it','quién lo usa'),
              L('how we know it helps','cómo sabemos que ayuda')],
      apoyo:['The app lets you…', 'We tested it with eight users.',
             'It makes their life better because…'],
      mejora:L('Test it with somebody who did not build it and watch without helping. Everything they '+
        'get stuck on is your list of work.',
        'Pruébalo con alguien que no lo construyó y míralo sin ayudarle. Todo lo que se le atasque es '+
        'tu lista de trabajo.')}
  },
  semanas:[
    s(1, L('The problem','El problema'), 'Se elige un problema real del colegio y se define el usuario.',
      L('Problem and user','Problema y usuario'), 'question',
      L('Building something nobody asked for is the most common mistake there is.',
        'Construir algo que nadie pidió es el error más común que hay.')),
    s(2, L('What happiness is','Qué es la felicidad'),
      'Filosofía: definiciones de felicidad; se elige una y se convierte en criterio de diseño.',
      L('Design criterion','Criterio de diseño'), 'card',
      L('Choose your definition before building. Afterwards you will choose the one that fits what you built.',
        'Elige tu definición antes de construir. Después elegirás la que le venga bien a lo que construiste.')),
    s(3, L('First working version','Primera versión que funciona'),
      'ICT: se construye la versión mínima que ya hace algo.',
      L('Version 1','Versión 1'), 'prototype',
      L('Version 1 always comes out wrong. That is why it is called version 1.',
        'La versión 1 siempre sale mal. Por eso se llama versión 1.')),
    s(4, L('The use model','El modelo de uso'),
      'Matemática: funciones y progresiones para modelar el uso y su límite.',
      L('Use model','Modelo de uso'), 'chart',
      L('If everybody used it, would it still work? This week you check with a function.',
        'Si lo usara todo el mundo, ¿seguiría funcionando? Esta semana lo compruebas con una función.')),
    s(5, L('The user test','La prueba con usuarios'),
      'Se prueba con usuarios reales sin ayudarles y se anota todo lo que falla.',
      L('Test log','Registro de la prueba'), 'log',
      L('Watching somebody fail to use your app is the most useful hour of the project.',
        'Ver a alguien fracasar usando tu app es la hora más útil del proyecto.')),
    s(6, L('The defence','La defensa'),
      'Presentación con el prototipo funcionando y el argumento del para qué.',
      L('Prototype defended','Prototipo defendido'), 'speech',
      L('Somebody will ask if this was necessary. Answer with your criterion, not with your effort.',
        'Alguien va a preguntar si esto era necesario. Responde con tu criterio, no con tu esfuerzo.'))
  ],
  evaluacion:[
    {dimension:'Producto funcional', areas:'ICT', descriptor:'El prototipo funciona y resuelve el problema declarado.'},
    {dimension:'Modelado matemático', areas:'MAT', descriptor:'La función representa el uso y su dominio y rango tienen sentido real.'},
    {dimension:'Justificación filosófica', areas:'FIL', descriptor:'Aplica una definición explícita de felicidad como criterio y no como adorno.'},
    {dimension:'Prueba con usuarios', areas:'todas', descriptor:'La prueba está registrada y se hicieron cambios a partir de ella.'}
  ],
  perfil:[7,8,9],
  revisar:['En 9.º, U5 solo tiene cargadas tres áreas. Comunicación, Ciencia, Ciencias Sociales, Arte, Inglés y PE están vacías.']
},

'g10.u5': {
  grado:10, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'🎤', from:'#831843', to:'#fda4af'},
  titulo:L('Playing, and being recognised','Tocar, y ser reconocido'),
  preguntaEsencial:L('What is the difference between being tolerated and being recognised?',
                     '¿Qué diferencia hay entre ser tolerado y ser reconocido?'),
  situacion:'10.º toca su canción favorita en el Creative Arts Show, y en la misma unidad Spiritual '+
    'History estudia el reconocimiento —dignidad, respeto, pertenencia— y Enterprise la comunicación '+
    'empresarial, la documentación y las redes de apoyo. El Show deja de ser solo un concierto: es el '+
    'caso práctico de qué hace falta para que un trabajo sea reconocido y no solo tolerado.',
  tematicas:[
    {nombre:'Ser reconocido',
     aporta:[['sh','Reconocimiento: dignidad, respeto, pertenencia; reconocimiento frente a tolerancia'],
             ['arte','Historia del rock: tocar nuestra canción favorita']]},
    {nombre:'Hacer que ocurra',
     aporta:[['ent','Comunicación empresarial, documentación, presentación, redes de apoyo'],
             ['mat','Semejanza y congruencia, criterios y relaciones métricas']]},
    {nombre:'Defenderlo',
     aporta:[['ing','Debates complejos, podcast en parejas, precisión ortográfica']]}
  ],
  areas:{
    arte:'Con Spiritual History, elegir la canción propia y defenderla es el ejercicio de reconocimiento.',
    ent:'Con Arte, el Show se produce como un evento real: convocatoria, documentación y comunicación.',
    mat:'Con Enterprise, el afiche y el escenario se diseñan a escala con criterios de semejanza.',
    ing:'Con Spiritual History, el debate discute qué es reconocer de verdad a alguien.',
    sh:'Con Arte, el reconocimiento se ensaya en el escenario y se piensa en clase.'
  },
  producto:{
    titulo:L('The Show, produced','El Show, producido'),
    descripcion:L('The Creative Arts Show produced by the grade: call, scaled poster and stage design, '+
      'documentation, professional communication, and a debate on recognition.',
      'El Creative Arts Show producido por el grado: convocatoria, afiche y escenario diseñados a '+
      'escala, documentación, comunicación profesional y un debate sobre el reconocimiento.'),
    incluye:[L('The scaled design','El diseño a escala'),
             L('The communication dossier','El dossier de comunicación'),
             L('The performance','La interpretación'),
             L('The debate on recognition','El debate sobre el reconocimiento')],
    modelo:{tipo:'plan',
      partes:[L('the scale','la escala'), L('the stage','el escenario'), L('the poster','el afiche')],
      apoyo:['The poster is a 1:4 scale of the banner.', 'We are writing to invite you to…',
             'Being recognised is not the same as being allowed.'],
      mejora:L('Check the scale with a ruler before printing. A poster that does not keep the '+
        'proportion is a design that failed at the last step.',
        'Comprueba la escala con regla antes de imprimir. Un afiche que no guarda la proporción es un '+
        'diseño que falló en el último paso.')}
  },
  semanas:[
    s(1, L('Recognition','El reconocimiento'), 'Spiritual History: reconocimiento frente a tolerancia; casos.',
      L('The concept, with cases','El concepto, con casos'), 'card',
      L('Being allowed to be here is not the same as belonging here. This week you name the difference.',
        'Que te dejen estar no es lo mismo que pertenecer. Esta semana nombras la diferencia.')),
    s(2, L('Choosing the song','Elegir la canción'), 'Arte: elección y justificación de la pieza propia.',
      L('Song chosen, with reason','Canción elegida, con razón'), 'question',
      L('Choose one you can defend, not one that is easy.',
        'Elige una que puedas defender, no una que sea fácil.')),
    s(3, L('Scale and stage','Escala y escenario'),
      'Matemática: semejanza, congruencia y relaciones métricas aplicadas al afiche y al escenario.',
      L('Scaled design','Diseño a escala'), 'plan',
      L('Scale is where a design stops being a drawing.',
        'La escala es donde un diseño deja de ser un dibujo.')),
    s(4, L('Making it happen','Hacer que ocurra'),
      'Enterprise: convocatoria, documentación y comunicación formal con quien haga falta.',
      L('Communication dossier','Dossier de comunicación'), 'report',
      L('A well written email opens more doors than a good idea badly explained.',
        'Un correo bien escrito abre más puertas que una buena idea mal explicada.')),
    s(5, L('Rehearsal and podcast','Ensayo y podcast'),
      'Ensayo general y podcast en parejas sobre el proceso.',
      L('Rehearsal + podcast','Ensayo + podcast'), 'video',
      L('Record the rehearsal. You will hear things you cannot hear while playing.',
        'Graba el ensayo. Vas a oír cosas que no se oyen mientras tocas.')),
    s(6, L('The Show and the debate','El Show y el debate'),
      'Show ante público y debate de cierre sobre reconocimiento.',
      L('Show + debate','Show + debate'), 'stand',
      L('Tonight somebody sees you doing something you chose. That is the whole point.',
        'Esta noche alguien te ve haciendo algo que elegiste. De eso se trata todo.'))
  ],
  evaluacion:[
    {dimension:'Producción del evento', areas:'ENT', descriptor:'La documentación y la comunicación son profesionales y llegaron a tiempo.'},
    {dimension:'Diseño a escala', areas:'MAT', descriptor:'Aplica criterios de semejanza y las proporciones se mantienen.'},
    {dimension:'Interpretación', areas:'ARTE', descriptor:'Toca su pieza y sostiene por qué la eligió.'},
    {dimension:'Debate', areas:'ING · SH', descriptor:'Distingue tolerancia de reconocimiento con ejemplos y responde a la objeción.'}
  ],
  perfil:[2,4,5,7],
  revisar:['En 10.º, U5 tiene cinco áreas de nueve cargadas. Comunicación, Ciencia, Ciencias Sociales y PE están vacías.']
},

'g11.u5': {
  grado:11, proyecto:4, unidad:5, mes:'Setiembre', semanas:6, parcial:true,
  cover:{icon:'🎓', from:'#1e3a8a', to:'#93c5fd'},
  titulo:L('What is my part in this community?','¿Cuál es mi parte en esta comunidad?'),
  preguntaEsencial:L('What do I owe the community that formed me, and what does it owe me?',
                     '¿Qué le debo a la comunidad que me formó, y qué me debe ella a mí?'),
  situacion:'Es la última unidad completa de 11.º: Enterprise cierra el portafolio de evidencias y '+
    'prepara el examen, Spiritual History discute el comunitarismo de Charles Taylor y qué papel juega '+
    'cada uno en una comunidad política, e Inglés trabaja impromptu speeches y presentaciones sobre '+
    'eventos globales. La unidad pide un cierre de etapa que sea a la vez balance y despedida.',
  tematicas:[
    {nombre:'Lo que llevo hecho',
     aporta:[['ent','Portafolio de evidencias, finalización del proyecto, preparación de examen'],
             ['mat','Factorización, ecuaciones e inecuaciones, valor absoluto: repaso aplicado']]},
    {nombre:'Lo que debo a los demás',
     aporta:[['sh','Comunitarismo, Charles Taylor, individualismo frente a comunidad, ciudadanía'],
             ['ing','Impromptu speeches, presentaciones sobre eventos globales, TED talks']]},
    {nombre:'Cómo lo digo',
     aporta:[['arte','Apreciación de música académica: barroco, clásico, romántico, forma sonata']]}
  ],
  areas:{
    ent:'Con Spiritual History, el portafolio deja de ser un requisito y pasa a ser el balance de lo aportado.',
    sh:'Con Enterprise, el comunitarismo da el marco para preguntar a quién sirvió el proyecto de estos años.',
    ing:'Con Spiritual History, el impromptu speech entrena responder sin guion a la pregunta de qué se debe a quién.',
    arte:'Con Inglés, la forma sonata da la estructura del discurso: exposición, desarrollo y reexposición.',
    mat:'Con Enterprise, el repaso aplicado sostiene la preparación del examen final.'
  },
  producto:{
    titulo:L('Portfolio and closing address','Portafolio y discurso de cierre'),
    descripcion:L('The complete evidence portfolio of the stage, plus a closing address — structured '+
      'like a sonata — on what each one owes the community that formed them.',
      'El portafolio de evidencias completo de la etapa, más un discurso de cierre —estructurado como '+
      'una sonata— sobre qué le debe cada uno a la comunidad que lo formó.'),
    incluye:[L('The complete portfolio','El portafolio completo'),
             L('The personal balance','El balance personal'),
             L('The closing address','El discurso de cierre'),
             L('The impromptu round','La ronda de impromptu')],
    modelo:{tipo:'guide',
      partes:[L('what I did','qué hice'), L('what I learned','qué aprendí'),
              L('what I owe','qué debo'), L('what I leave','qué dejo')],
      apoyo:['Looking back, the thing I would do differently is…',
             'What I owe this place is…', 'I would like to leave you with one idea.'],
      mejora:L('A portfolio that only shows successes teaches nothing. Include the piece that went '+
        'wrong and what you did about it.',
        'Un portafolio que solo enseña aciertos no enseña nada. Incluye el trabajo que salió mal y qué '+
        'hiciste con él.')}
  },
  semanas:[
    s(1, L('The balance','El balance'), 'Enterprise: se inventaría el portafolio y se detecta lo que falta.',
      L('Portfolio inventory','Inventario del portafolio'), 'log',
      L('Looking at four years at once is uncomfortable and necessary.',
        'Mirar cuatro años de golpe es incómodo y necesario.')),
    s(2, L('Individual or community','Individuo o comunidad'),
      'Spiritual History: comunitarismo, Taylor, pertenencia y ciudadanía.',
      L('Philosophical position','Posición filosófica'), 'question',
      L('You did not become who you are on your own. This week you look at who else was there.',
        'No llegaste a ser quien eres solo. Esta semana miras quién más estuvo.')),
    s(3, L('The form of a speech','La forma de un discurso'),
      'Arte: forma sonata; se usa su estructura para el discurso de cierre.',
      L('Structure of the address','Estructura del discurso'), 'plan',
      L('A sonata says the theme, argues with it and says it again changed. So does a good speech.',
        'Una sonata enuncia el tema, discute con él y lo repite cambiado. Un buen discurso también.')),
    s(4, L('Speaking without a script','Hablar sin guion'),
      'Inglés: rondas de impromptu speech sobre eventos globales y sobre el propio balance.',
      L('Impromptu round','Ronda de impromptu'), 'speech',
      L('Two minutes with no notes. It is the most honest exercise in the year.',
        'Dos minutos sin notas. Es el ejercicio más honesto del año.')),
    s(5, L('Closing the portfolio','Cerrar el portafolio'),
      'Enterprise y Matemática: documentación final y repaso aplicado para el examen.',
      L('Portfolio closed','Portafolio cerrado'), 'report',
      L('Finishing well is a skill, and this week you practise it.',
        'Terminar bien es una habilidad, y esta semana la practicas.')),
    s(6, L('The closing address','El discurso de cierre'),
      'Discurso ante la comunidad del colegio, con la pieza musical elegida.',
      L('Address delivered','Discurso pronunciado'), 'speech',
      L('You are speaking to the place that formed you. Say something true.',
        'Le hablas al sitio que te formó. Di algo verdadero.'))
  ],
  evaluacion:[
    {dimension:'Portafolio', areas:'ENT', descriptor:'Está completo, ordenado e incluye evidencia de proceso, no solo de resultado.'},
    {dimension:'Posición filosófica', areas:'SH', descriptor:'Argumenta su papel en la comunidad con el marco estudiado.'},
    {dimension:'Oratoria', areas:'ING', descriptor:'Sostiene el discurso y responde sin guion.'},
    {dimension:'Estructura y forma', areas:'ARTE', descriptor:'El discurso usa una estructura reconocible y la pieza elegida la acompaña.'},
    {dimension:'Preparación de examen', areas:'MAT', descriptor:'El repaso aplicado está hecho y las dudas están identificadas.'}
  ],
  perfil:[1,2,5,10],
  revisar:['En 11.º, U5 tiene cinco áreas de nueve cargadas. Comunicación, Ciencia, Ciencias Sociales y PE están vacías.',
           'Esta unidad coincide con la preparación del examen final de Enterprise: el proyecto se diseñó para apoyarla, no para competir con ella.']
}

};

/* ================================================== UNIDAD 6 · Noviembre
 *
 * No hay propuesta, y es a proposito. Los seis documentos de "Proyecto 5 (U6)
 * - Noviembre" son la MISMA plantilla en blanco copiada seis veces: ninguna
 * area tiene contenido en ningun grado, y los seis dicen en la cabecera
 * "GRADO: 6 / UNIDAD 3". Proponer un proyecto ahi seria inventarle el
 * contenido a seis equipos de profesores.
 *
 * Lo que hace falta para poder proponerlo esta escrito en `PROJECT_SEC_U6`,
 * que la pagina pinta como pedido a coordinacion. */
window.PROJECT_SEC_U6 = {
  estado: 'vacio',
  observado: '2026-09-08',
  detalle: 'Los 6 documentos de U6 (noviembre) no tienen ningun contenido cargado, en ninguna de las '+
    'áreas ni en ninguno de los seis grados. Además, los seis son copia de la misma plantilla: dicen '+
    '«GRADO: 6 / UNIDAD 3» en la cabecera.',
  pedido: [
    'Cargar los contenidos de cada área para U6 en los seis grados, como están en U2, U3 y U4.',
    'Corregir la cabecera de los seis documentos (grado y número de unidad).',
    'Confirmar si U6 mantiene las seis semanas o se acorta por el cierre del año escolar.'
  ],
  cuandoEste: 'Con los contenidos cargados, la propuesta de los seis proyectos de U6 se escribe en una tarde: '+
    'el método es el mismo que el de las otras cuatro unidades.'
};
})();
