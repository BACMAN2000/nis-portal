/* Propuesta a coordinacion de secundaria: U5 y U6 son UNA unidad de once
 * semanas, no dos de seis y cinco.
 *
 * POR QUE, Y EL ORDEN IMPORTA
 *
 * 1. U6 (noviembre) no tiene contenido cargado en ninguna de las nueve areas
 *    de ninguno de los seis grados: los seis documentos son la misma
 *    plantilla en blanco, y hasta la cabecera dice «GRADO: 6 / UNIDAD 3» en
 *    los seis. No es un olvido de un area, es que esa unidad no se llego a
 *    planificar.
 *
 * 2. Y no se llego a planificar porque noviembre ya esta ocupado. El propio
 *    calendario del Scope lo dice: MOCK EXAM 2 en octubre, «Final prep +
 *    Cambridge enrolment» en octubre-noviembre, y el **examen oficial de
 *    Cambridge el 2 de diciembre** para 6.o (A2 Key), 8.o (B1 Preliminary),
 *    9.o (B2 First) y 11.o (C1 Advanced). Abrir contenido nuevo de seis
 *    semanas en noviembre compite con la recta final del examen.
 *
 * 3. El Scope ya trata las dos unidades como una sola y en tres sitios:
 *    - el plan lector es **un solo libro partido por la mitad** (U5 la
 *      primera parte, U6 «Ch. X-end + comparative essay»),
 *    - U6 cierra con el portafolio **de fin de trimestre**, que evalua once
 *      semanas y no cinco,
 *    - y en 11.o U6 ni siquiera es contenido: se llama «C1 Mastery & IB
 *      Diploma Exam».
 *
 * 4. El Creative Arts Show cae en U5 y es lo unico cargado en cuatro grados.
 *    Con la unidad de once semanas el Show queda dentro del trimestre y no lo
 *    parte en dos.
 *
 * LO QUE SE PIDE: no cargar U6 desde cero en nueve areas por seis grados
 * —54 documentos— sino ampliar U5 a once semanas y firmar UNA planificacion
 * por grado, con una sola nota y un solo producto.
 *
 * LO QUE NO SE PIERDE: cada semana declara en `cubre` que bloques del Scope
 * resuelve, con el nombre exacto que tienen en el Scope. `tools/audita_u56.js`
 * compara esa lista contra scope/scope-2026.json y falla si algun bloque de
 * U5 o de U6 se queda fuera. Ahora mismo: 22 de 22 en los seis grados.
 *
 * LA FORMA DE LA UNIDAD, que es la misma en los seis grados y por eso se
 * puede defender:
 *    S1-S5   el contenido de U5, con la primera entrega escrita en S5
 *    S6      mitad del reader y cierre de la primera mitad (Creative Arts Show)
 *    S7-S9   el giro: vocabulario, gramatica y segundo texto, de U6
 *    S10     el reader entero y el ensayo comparativo
 *    S11     oral final y portafolio de las once semanas
 */
(function(){
const L = (en, es) => ({en: en, es: es});

/* s(): una semana de la unidad fusionada.
   `de` dice de que unidad del Scope viene lo de esa semana; `cubre`, que
   bloques del Scope quedan resueltos, con su nombre exacto. */
function s(n, de, foco, lengua, lectura, escritura, oral, hito, cubre){
  return {n:n, de:de, foco:foco, lengua:lengua, lectura:lectura,
          escritura:escritura, oral:oral, hito:hito, cubre:cubre};
}

window.SCOPE_U56 = {
  fuente:'scope/scope-2026.json (NIS_English_Master_SS_2026.xlsx) y scope/secundaria-conexiones-2026.json',
  trimestre:{inicio:'2026-09-14', fin:'2026-12-04', semanas:11},

/* Las dos etapas piden lo mismo —una unidad de once semanas en vez de dos—
 * pero por razones que NO son las mismas, y conviene no mezclarlas:
 *
 *  En SECUNDARIA U6 esta vacia en las nueve areas de los seis grados. La
 *  propuesta llena un hueco.
 *
 *  En PRIMARIA el periodo 6 esta tan cargado como el 5: aqui no hay hueco que
 *  llenar, hay otra cosa. Los dos periodos ya son el mismo trimestre en el
 *  propio Annual Plan (P5 = 14-sep a 23-oct, 5 semanas; P6 = 26-oct a 4-dic,
 *  6 semanas, sin corte entre medias), el examen oficial de Cambridge cae
 *  DENTRO de la ultima semana del periodo 6, y hay areas enteras que no
 *  aparecen ni una semana en las once. Ese es el argumento, y la pagina lo
 *  cuenta en vivo contra scope/annual-plan-primary-2026.json.
 */
  etapas:{
  primaria:{
    label:'Primaria', grados:[1,2,3,4,5], reparto:'semanas 1-5 = P5 · semanas 6-11 = P6',
    lead:'En vez del periodo 5 (cinco semanas, del 14 de setiembre al 23 de octubre) y el periodo 6 '+
      '(seis semanas, del 26 de octubre al 4 de diciembre) como dos unidades, una sola planificación '+
      'de once semanas por grado, con un producto y una nota.',
    razones:[
      ['El calendario ya las trata como una',
       'En el propio Annual Plan los dos periodos son «trimestre 3» y sus fechas son continuas: el '+
       'P5 acaba el viernes 23 de octubre y el P6 empieza el lunes 26. No hay corte real entre medias, '+
       'solo un cambio de número.'],
      ['El examen cae dentro del periodo 6',
       'Cambridge es el 2 de diciembre y el periodo 6 termina el 4. Con dos unidades, la sexta empieza '+
       'el 26 de octubre y tiene que evaluar lo suyo la misma semana del examen. Con una, la segunda '+
       'entrega es en la semana 10 y noviembre queda para repasar.'],
      ['Hay áreas que no aparecen en las once semanas',
       'Música no aparece ni una semana en ninguno de los cinco grados; Arte, en cuatro de cinco. '+
       'En 4.º tampoco hay inglés, ni Personal Social, ni Tutoría. Un producto integrador de once '+
       'semanas les da dónde entrar sin obligarles a programar dos unidades.'],
      ['El inglés sí está escrito, en el Scope',
       'Lo que no llegó al plan anual está en el Scope & Sequence, que trae U5 y U6 completas en los '+
       'cinco grados con su vocabulario, su gramática, su plan lector y sus dos textos. La propuesta '+
       'no inventa contenido: coloca el que ya existe.']
    ],
    calendario:[
      {cuando:'14 set – 23 oct', que:'Periodo 5 del Annual Plan (5 semanas)', donde:'semanas 1 a 5 de la unidad'},
      {cuando:'Octubre', que:'MOCK EXAM 2 — ensayo final en condiciones oficiales (2.º, 4.º y 5.º)', donde:'semanas 4 a 6'},
      {cuando:'26 oct – 4 dic', que:'Periodo 6 del Annual Plan (6 semanas)', donde:'semanas 6 a 11'},
      {cuando:'2 de diciembre', que:'EXAMEN OFICIAL CAMBRIDGE — Starters (2.º), Movers (4.º) y Flyers (5.º)',
       donde:'dentro de la semana 11, dos días antes de que acabe el periodo'}
    ],
    alerta:'<b>Rinden examen oficial el 2 de diciembre:</b> 2.º (Starters), 4.º (Movers) y 5.º (Flyers). '+
      '1.º y 3.º son grados de preparación y no rinden: su noviembre puede ser contenido de verdad.',
    pide:['<b>Lo que se pide a coordinación de primaria</b>',
      'Que el trimestre 3 se planifique como <b>una unidad de once semanas</b> —no como P5 más P6— con '+
      'dos evidencias calificadas dentro (semana 5 y semana 10) y el portafolio al final, de modo que '+
      'la semana del examen no lleve entrega nueva. El proyecto interdisciplinario del trimestre ya '+
      'está escrito a once semanas en el portal, área por área y semana por semana.']
  },
  secundaria:{
    label:'Secundaria', grados:[6,7,8,9,10,11], reparto:'semanas 1-6 = U5 · semanas 7-11 = U6',
    lead:'En vez de una unidad de seis semanas en setiembre y otra de cinco en noviembre, una sola '+
      'planificación de once semanas por grado, con un solo producto y una sola nota.',
    razones:[
      ['U6 no existe',
       'Los seis documentos de «Proyecto 5 (U6) – Noviembre» están en blanco en las nueve áreas de los '+
       'seis grados, y los seis son la misma plantilla copiada: hasta la cabecera dice «GRADO: 6 / '+
       'UNIDAD 3». No es un área que se olvidó; esa unidad no se llegó a planificar.'],
      ['Noviembre ya está ocupado',
       'El calendario del propio Scope pone el Mock 2 en octubre, la matrícula y la última milla en '+
       'octubre–noviembre, y el examen oficial de Cambridge el 2 de diciembre. Abrir contenido nuevo '+
       'de seis semanas ahí compite con la recta final.'],
      ['El Scope ya las trata como una',
       'El plan lector es un solo libro partido por la mitad (U5 la primera parte, U6 «Ch. X–end + '+
       'comparative essay»); U6 cierra con el portafolio de fin de trimestre, que evalúa once semanas '+
       'y no cinco; y en 11.º U6 ni siquiera es contenido: se llama «C1 Mastery & IB Diploma Exam».'],
      ['El Show queda dentro',
       'El Creative Arts Show cae en U5 y es lo único cargado en cuatro grados. Con la unidad de once '+
       'semanas el Show es el cierre de la primera mitad y no el corte entre dos unidades.']
    ],
    calendario:[
      {cuando:'Octubre', que:'MOCK EXAM 2 — ensayo final en condiciones oficiales', donde:'cae en las semanas 4 a 6 de la unidad'},
      {cuando:'Octubre – noviembre', que:'Final prep + matrícula Cambridge (100 % matriculados a mediados de noviembre)', donde:'semanas 6 a 11'},
      {cuando:'2 de diciembre', que:'EXAMEN OFICIAL CAMBRIDGE — 6.º, 8.º, 9.º y 11.º', donde:'la semana siguiente al cierre de la unidad'}
    ],
    alerta:'<b>Presentan examen oficial el 2 de diciembre,</b> según el pathway y el calendario del '+
      'Scope —que coinciden—: 6.º (A2 Key), 8.º (B1 Preliminary), 9.º (B2 First) y 11.º (C1 Advanced). '+
      '7.º y 10.º serían grados puente y no presentarían: su noviembre sí puede ser contenido nuevo, '+
      'y la propuesta lo aprovecha.',
    pide:['<b>Lo que se pide a coordinación</b>',
      'No cargar U6 desde cero en nueve áreas por seis grados —54 documentos— sino ampliar U5 a once '+
      'semanas y firmar <b>una</b> planificación por grado, con dos evidencias calificadas dentro (una '+
      'en la semana 5 y otra en la 9 o la 10) y el portafolio del trimestre al final. Las demás áreas '+
      'copian la misma duración: el proyecto interdisciplinario del trimestre ya está escrito a once '+
      'semanas en el portal.']
  }},


  /* Del pathway del Scope. En secundaria coincide ademas con su propio
     calendario: los grados de examen son G6, G8, G9 y G11 en las dos listas. */
  examen:{1:'— (preparación Pre-Starters)', 2:'Cambridge Starters', 3:'— (preparación Pre-Movers)',
          4:'Cambridge Movers', 5:'Cambridge Flyers',
          6:'Cambridge A2 Key (KET)', 7:'— (puente KET+ / PET)', 8:'Cambridge B1 Preliminary (PET)',
          9:'Cambridge B2 First (FCE)', 10:'— (consolidación FCE / puente CAE)', 11:'Cambridge C1 Advanced (CAE)'},

  /* Y aqui hay un desacuerdo entre dos documentos del colegio que esta
     propuesta NO resuelve, porque no le toca: lo senala para que se decida
     antes de que cierre la matricula. */
  discrepancia:{
    titulo:'¿Quién presenta B2 First: 9.º o 10.º?',
    fuentes:[
      ['Scope & Sequence 2026 (pathway y calendario)', '9.º presenta B2 First el 2 de diciembre. 10.º no presenta: es «FCE consolidation / CAE bridge».'],
      ['Los cursos Cambridge ya construidos y en vivo en el portal', '9.º va con B1 Preliminary (PET, unidades 7-12) y 10.º con B2 First (nivel b2f, seis unidades).']
    ],
    porque:'Las dos lecturas son defendibles y las dos están escritas. Importa ahora porque la '+
      'matrícula de Cambridge cierra a mediados de noviembre —semana 9 de esta unidad— y porque '+
      'cambia qué hace cada uno de los dos grados en las semanas 7 a 11: preparar un examen que se '+
      'rinde en tres semanas no es lo mismo que consolidar para el año que viene.',
    mientras:'Hasta que se decida, las once semanas de 9.º y de 10.º sirven igual: el contenido del '+
      'Scope es el mismo. Lo que cambia es el peso de la semana 11.'
  },

grados:{

/* ==================================================================== 1.o */
1:{
  etapa:'primaria', cefr:'Pre-A1', temaU5:'My Family', temaU6:'Food & Fun',
  reader:'The Family Book (T. Parr) y The Very Hungry Caterpillar (E. Carle)',
  titulo:L('My family and our table','Mi familia y nuestra mesa'),
  hilo:'Quién vive en mi casa y qué comemos cuando estamos juntos. Es la misma mesa en las dos '+
    'mitades: primero se dibuja quién se sienta en ella y después qué hay encima. En 1.º esta '+
    'unidad no es una mejora, es la única planificación que existe: en las once semanas el plan '+
    'anual solo carga inglés.',
  escritura:[{de:'U5', que:'Árbol de familia con etiquetas y la frase «This is my ___»'},
             {de:'U6', que:'«My plate»: dibujar y etiquetar 3-4 alimentos, con I like / I don’t like'}],
  semanas:[
    s(1,'U5',L('Who is in my house','Quién vive en mi casa'),
      'Miembros de la familia: mum, dad, sister, brother, grandma, grandpa. Adjetivos: old, young, happy, kind. Sonidos iniciales del vocabulario de familia.',
      'The Family Book, lectura compartida.','Dibujo de mi familia.','Presentar a mi familia: This is my mum.',
      L('My family drawing','Dibujo de mi familia'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Reading the family','Leer la familia'),
      'Blending de palabras CVC.','Emparejar palabra e imagen; leer frases sencillas: This is my dad. Diagramas ilustrados de árbol de familia.',
      'Emparejar la palabra con la foto antes de escribir.','Describir: She is tall.',
      L('Word–picture match','Palabra e imagen'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('My, your, his, her','My, your, his, her'),
      'Posesivos: my, your, his, her. Verbo to be: She is my grandma. Números como adjetivo: two sisters.',
      '—','Frases con el posesivo correcto.',
      'Escucha: identificar miembros de la familia en una descripción; adivinanzas «Who is it?».',
      L('Possessives','Posesivos'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The family tree','El árbol de familia'),
      'Clasificación por sonido inicial.','—',
      'Árbol de familia con etiquetas; copiar «This is my ___ . He/She is ___». Del dibujo a la frase con el molde.',
      'Escuchar y rodear: la tarea de la foto de familia.',L('Family tree','Árbol de familia'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('Sharing my family','Presento a mi familia'),
      'Repaso.','—','Ticket de salida: una frase sobre mi familia. PRIMERA EVIDENCIA CALIFICADA.',
      'Presentación en pareja: la foto de mi familia.',L('Family presentation','Presentación de familia'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U6',L('What is on the table','Qué hay en la mesa'),
      'Comida: apple, banana, bread, milk, egg, cake, water, juice. I like… / I don’t like… Repaso de todas las vocales cortas.',
      'The Very Hungry Caterpillar: empezar el libro.','Banco de palabras de comida.','Decir qué me gusta.',
      L('Food word bank','Banco de palabras de comida'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Plan']),
    s(7,'U6',L('Reading the menu','Leer el menú'),
      'Emparejar palabra e imagen.','Leer y emparejar imágenes y palabras de comida; completar «I like ___» con banco de palabras. Cuadros de comida y menús ilustrados.',
      'Elegir del banco la palabra que va.','Pedir en el café de la clase.',
      L('Menu reading','Leer el menú'),
      ['U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('I like, I don’t like','I like, I don’t like'),
      'Like + sustantivo: I like apples. Don’t like + sustantivo. Frase simple completa: sujeto + verbo + objeto.',
      '—','Frases completas con la estructura.',
      'Escucha: identificar alimentos en diálogos; encuesta de gustos «escuchar y marcar».',
      L('Full sentences','Frases completas'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('My plate','Mi plato'),
      'Repaso de sonidos.','—',
      'Dibujar y etiquetar «My plate» con 3-4 alimentos; copiar «I like ___ . I don’t like ___».',
      'Juego de rol: pedir comida.',L('My plate','Mi plato'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The caterpillar ends','Se acaba la oruga'),
      'Cantinela de fonética de fin de año.','The Very Hungry Caterpillar: terminar, secuenciar y volver a contar.',
      'Versión final de «My plate». SEGUNDA EVIDENCIA CALIFICADA.',
      'Nombrar las comidas del cuento; canción Fruit Salad.',
      L('Retell + plate','Recontar + plato'),
      ['U6:Reading Plan','U6:Speaking Skills']),
    s(11,'U6',L('My six drawings','Mis seis dibujos'),
      'Repaso general.','—','Portafolio de fin de año: mis seis dibujos.',
      'Compartir en voz alta: mi unidad favorita.',L('Portfolio','Portafolio'),
      ['U6:Writing Reflection'])
  ],
  gana:['1.º no tiene NADA cargado en las once semanas salvo inglés: ni Matemática, ni Ciencia, ni Comunicación, ni Personal Social, ni Arte, ni Música, ni Tutoría. Una sola unidad con producto integrador es la única forma de que el trimestre tenga plan.',
        'Los dos libros del Scope —The Family Book y The Very Hungry Caterpillar— son la misma mesa: quién se sienta y qué se come. En once semanas se leen los dos con tiempo de volver al primero.',
        '1.º no rinde examen Cambridge en diciembre, así que la semana 11 es cierre de año de verdad: el portafolio de los seis dibujos.']
},

/* ==================================================================== 2.o */
2:{
  etapa:'primaria', cefr:'Pre-A1→A1', temaU5:'Food & Health', temaU6:'Hobbies & Play',
  reader:'Eat Your Peas (K. Gray) y Horrid Henry’s Football Fiend (F. Simon, adaptado)',
  titulo:L('What I eat and what I play','Lo que como y lo que juego'),
  hilo:'Las dos mitades son el mismo día de un niño de siete años: lo que se lleva a la boca y lo '+
    'que hace después. La primera enseña a aconsejar (should / shouldn’t) y la segunda a contar '+
    'con qué frecuencia hace uno lo que le gusta.',
  escritura:[{de:'U5', que:'Cartel de alimentación saludable: 5 viñetas con I should / I shouldn’t'},
             {de:'U6', que:'Párrafo de afición, 60-80 palabras'}],
  semanas:[
    s(1,'U5',L('Food and the body','La comida y el cuerpo'),
      'Grupos de alimentos: fruit, vegetables, dairy, meat, bread. Saludable y no saludable. Molestias: headache, stomachache, cold, toothache. Vocales largas ee, ea, oo.',
      'Eat Your Peas: empezar el libro.','Dos columnas: saludable / no saludable.','Decir qué como y qué bebo.',
      L('Two columns','Dos columnas'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Reading a leaflet','Leer un folleto'),
      'Clasificación de vocales.','Leer e identificar si un alimento es saludable; localizar información en un folleto de salud sencillo. Textos cortos sobre hábitos.',
      'Lluvia de ideas en dos columnas.','Encuesta: ¿qué desayunas?',
      L('Health leaflet','Folleto de salud'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Should and shouldn’t','Should y shouldn’t'),
      'Should / shouldn’t para aconsejar. Sustantivos contables e incontables. Some / any (introducción).',
      '—','Cinco frases con should / shouldn’t.',
      'Escucha: emparejar problema de salud con el consejo; cuento en el consultorio.',
      L('Advice sentences','Frases de consejo'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The poster','El cartel'),
      'Autocorrección: «2 stars & 1 wish».','—',
      'Cartel de alimentación saludable con cinco viñetas; borrador de las cinco frases.',
      'Juego de rol en el consultorio: I have a headache.',L('Healthy poster','Cartel saludable'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('One healthy tip','Un consejo saludable'),
      'Revisión entre pares.','Eat Your Peas: terminar y discutir.',
      'Versión final del cartel. PRIMERA EVIDENCIA CALIFICADA.',
      'Compartir un consejo saludable con la clase.',L('Poster + tip','Cartel + consejo'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U6',L('What I play','Lo que juego'),
      'Deportes y juegos: football, swimming, cycling, tennis, basketball. Juguetes. Frecuencia: every day, on Saturdays. Repaso de mezclas y dígrafos.',
      'Horrid Henry’s Football Fiend: empezar el libro.','Mapa mental de mi afición.','Hablar de aficiones: I like playing…',
      L('Hobby mind map','Mapa de mi afición'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Plan']),
    s(7,'U6',L('Who does what','Quién hace qué'),
      'Acento de frase: I like playing football.','Leer y emparejar afición y persona; identificar palabras de frecuencia en un texto corto. Textos ilustrados sobre aficiones.',
      'Notas del mapa mental.','En pareja: ¿qué haces los sábados?',
      L('Match hobby–person','Emparejar afición y persona'),
      ['U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('How often','Con qué frecuencia'),
      'Presente simple: like + -ing. Adverbios de frecuencia: always, usually, sometimes, never. Pregunta: Do you like…? Yes, I do / No, I don’t.',
      '—','Frases con adverbio de frecuencia.',
      'Escucha: marcar deportes en un horario; diálogo de actividades extraescolares; Starters «escuchar y dibujar».',
      L('Frequency','Frecuencia'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('My favourite hobby','Mi afición favorita'),
      'Autocomprobación: ¿tiene sentido?','—',
      'Párrafo de afición, 60-80 palabras: My favourite hobby is… I like it because…',
      'Presentación breve: mi deporte favorito.',L('Hobby paragraph','Párrafo de afición'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('Henry ends','Se acaba Henry'),
      'Juego de fonética de fin de año.','Horrid Henry’s Football Fiend: terminar.',
      'Versión final del párrafo. SEGUNDA EVIDENCIA CALIFICADA.',
      'Presentación estructurada ante la clase.',L('Paragraph + talk','Párrafo + charla'),
      ['U6:Reading Plan','U6:Speaking Skills']),
    s(11,'U6',L('Starters week','Semana de Starters'),
      'Repaso de todo el año.','—','Portafolio de fin de trimestre: la pieza favorita.',
      'Oral: ¿qué he aprendido este año?',L('Portfolio + exam','Portafolio + examen'),
      ['U6:Writing Reflection'])
  ],
  gana:['2.º rinde Cambridge Starters el 2 de diciembre y el periodo 6 termina el 4: el examen cae DENTRO de la última semana. Con una sola unidad, la segunda evidencia se entrega en la semana 10 y la 11 es repaso, no una entrega nueva compitiendo con el examen.',
        'Arte y Música no aparecen ni una semana en las once, y Personal Social solo una. Un producto integrador de once semanas les da sitio sin obligarles a programar dos unidades.',
        'La comida (U5) y el juego (U6) son el mismo día del niño: en una unidad se pueden cruzar —qué como antes de jugar— y en dos quedan como dos temas sueltos.']
},

/* ==================================================================== 3.o */
3:{
  etapa:'primaria', cefr:'A1', temaU5:'When the Earth Moves', temaU6:'My Community',
  reader:'Earthquakes, Volcanoes and Tsunamis (Raz-Plus, 730L) y The Lorax (Dr. Seuss)',
  titulo:L('When the earth moves, who helps','Cuando la tierra se mueve, quién ayuda'),
  hilo:'La primera mitad enseña qué hacer cuando pasa algo grave; la segunda, quién viene a '+
    'ayudar. Es una sola pregunta partida en dos: el bombero, el policía y el médico de U6 son '+
    'exactamente las personas del simulacro de U5.',
  escritura:[{de:'U5', que:'Folleto de seguridad: antes, durante y después, 90-110 palabras'},
             {de:'U6', que:'Perfil de un servidor de la comunidad, 90-110 palabras'}],
  semanas:[
    s(1,'U5',L('When the earth moves','Cuando la tierra se mueve'),
      'Desastres naturales: earthquake, tsunami, flood, landslide. Seguridad: danger, safe place, exit, shelter, drill, helmet. Sílabas en palabras largas y el sonido /kw/.',
      'Earthquakes, Volcanoes and Tsunamis: empezar.','Lista de la mochila de emergencia.','Nombrar lo que hay que tener.',
      L('Emergency kit list','Lista de la mochila'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Before, during, after','Antes, durante, después'),
      '-ache como un solo sonido: headache, stomachache, backache.',
      'Localizar una instrucción de seguridad dentro de un texto informativo; ordenar los pasos; usar títulos, pies y diagramas. Textos informativos con diagramas y un folleto leído como modelo.',
      'Planificar el folleto en tres partes.','Decir dónde duele: My leg hurts.',
      L('Steps in order','Pasos en orden'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Drop, cover, hold on','Drop, cover, hold on'),
      'Modales de norma y consejo: must / must not, should, have to. Imperativos para instrucciones. Pasado simple para contar lo que pasó: was/were y verbos en -ed.',
      '—','Instrucciones en imperativo y consejos en modal.',
      'Escucha: instrucciones de seguridad en orden; identificar los objetos nombrados de la mochila.',
      L('Instructions','Instrucciones'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The safety flyer','El folleto de seguridad'),
      'Revisión entre pares: ¿podría seguirlo un niño más pequeño?','—',
      'Folleto de seguridad de 90-110 palabras, en tres secciones con título, una instrucción y un dibujo.',
      'Dar consejos: You should… / You must not…',L('Safety flyer','Folleto de seguridad'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('Presenting the flyer','Presentar el folleto'),
      'Reflexión: ¿mi familia tiene punto de encuentro y mochila en casa?',
      'Earthquakes, Volcanoes and Tsunamis: terminar.',
      'Versión final del folleto. PRIMERA EVIDENCIA CALIFICADA.',
      'Presentar mi folleto a la clase.',L('Flyer + presentation','Folleto + presentación'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U6',L('Who helps','Quién ayuda'),
      'Servidores de la comunidad: doctor, teacher, firefighter, police officer, baker, librarian, vet. Lugares y verbos: help, protect, serve, bake, heal. Repaso de dígrafos vocálicos.',
      'The Lorax: empezar el libro.','Emparejar persona y lugar de trabajo.','Describir el trabajo de alguien.',
      L('Helpers and places','Personas y lugares'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Plan']),
    s(7,'U6',L('What they do','Qué hacen'),
      'Ritmo y acento de la frase.','Identificar qué hace cada servidor; emparejar persona y lugar de trabajo en un texto. Textos ilustrados sobre servidores de la comunidad.',
      'Notas de la entrevista.','Juego de rol: entrevistar a un servidor.',
      L('Interview notes','Notas de la entrevista'),
      ['U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('He helps, she protects','He helps, she protects'),
      'Presente simple con he / she. Artículos a / an / the ampliados. Conjunción so: I was tired, so I rested.',
      '—','Frases del perfil con la tercera persona.',
      'Escucha: identificar servidores en descripciones; ¿qué hace un bombero?',
      L('Third person','Tercera persona'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('The profile','El perfil'),
      'Revisión entre pares: ¿falta información?','—',
      'Perfil de un servidor, 90-110 palabras: nombre, oficio, lugar de trabajo y por qué es importante.',
      'Agradecer a un servidor de la comunidad.',L('Helper profile','Perfil del servidor'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The Lorax ends','Se acaba el Lorax'),
      'Concurso de fonética de fin de año.','The Lorax: terminar; la comunidad y el ambiente.',
      'Versión final del perfil. SEGUNDA EVIDENCIA CALIFICADA.',
      'Presentación en grupo: nuestra comunidad.',L('Profile + presentation','Perfil + presentación'),
      ['U6:Reading Plan','U6:Speaking Skills']),
    s(11,'U6',L('Three things I learned','Tres cosas que aprendí'),
      'Repaso general.','—','Reflexión de fin de trimestre: tres cosas que aprendí.',
      'Apreciación entre pares: decir algo bueno.',L('Reflection','Reflexión'),
      ['U6:Writing Reflection'])
  ],
  gana:['El cruce es el más limpio de primaria: los servidores de la comunidad de U6 son las personas del simulacro de U5. En dos unidades se pierde; en una, el folleto de seguridad se entrega a quien lo va a usar.',
        'Matemática solo aparece 3 de las 11 semanas en el plan y Comunicación, Arte y Música ninguna. Un producto de once semanas les da dónde entrar.',
        '3.º no rinde examen Cambridge en diciembre (es preparación de Movers): su noviembre puede ser contenido de verdad.']
},

/* ==================================================================== 4.o */
4:{
  etapa:'primaria', cefr:'A1→A2', temaU5:'Holidays & Travel', temaU6:'My Future',
  reader:'Around the World in 80 Days (Oxford Bookworms 2) y lecturas de jóvenes que lograron algo',
  titulo:L('Where I was and where I am going','Dónde estuve y adónde voy'),
  hilo:'Once semanas entre dos tiempos verbales: la primera mitad cuenta en pasado un viaje que '+
    'ya pasó y la segunda anuncia en futuro un oficio que todavía no. El mismo alumno, la misma '+
    'estructura de párrafo, dos tiempos.',
  escritura:[{de:'U5', que:'Recuento de vacaciones en pasado simple, 120-150 palabras'},
             {de:'U6', que:'Párrafo de ambiciones de futuro, 120-150 palabras'}],
  semanas:[
    s(1,'U5',L('Where I went','Dónde fui'),
      'Vocabulario de viaje: beach, mountains, camping, sightseeing, souvenir, sunscreen. Clima: freezing, boiling, humid, mild. Acento de frase en narraciones en pasado.',
      'Around the World in 80 Days: empezar el libro.','Cuadro de tiempo: ¿cuándo? ¿dónde? ¿qué?',
      'Contar adónde fui.',L('Time chart','Cuadro de tiempo'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('The order of a story','El orden de una historia'),
      'Formas débiles: was /wəz/, were /wə/.',
      'Secuenciar los hechos de una narración de viaje; identificar expresiones de tiempo pasado. Folletos de viaje y postales.',
      'Conectores: first, then, after, finally.','Describir una foto de vacaciones.',
      L('Events in order','Hechos en orden'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Past simple, all of it','Pasado simple, entero'),
      'Pasado simple regular e irregular, conjugación completa; preguntas con Did you…? y negativas con didn’t; expresiones de tiempo: yesterday, last week, in 2023, ago.',
      '—','Verbos del recuento, conjugados.',
      'Escucha: secuenciar los hechos de una historia de vacaciones; ¿adónde fueron y qué hicieron?',
      L('Past simple','Pasado simple'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The recount','El recuento'),
      'Del cuadro de tiempo al borrador.','—',
      'Recuento de vacaciones, 120-150 palabras: dónde, cuándo, qué hice y lo mejor.',
      'Contar mis últimas vacaciones en pasado.',L('Holiday recount','Recuento de vacaciones'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The recount, delivered','El recuento, entregado'),
      'Revisión entre pares «2 stars, 1 wish»; reflexión: ¿qué fue lo mejor de mi recuento?',
      'Around the World in 80 Days: seguir.',
      'Versión final del recuento. PRIMERA EVIDENCIA CALIFICADA.',
      'Encuesta de clase: ¿adónde fuiste?',L('Recount + survey','Recuento + encuesta'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U6',L('What I want to be','Lo que quiero ser'),
      'Oficios y futuro: engineer, scientist, artist, athlete, entrepreneur, programmer. Ambiciones: I want to be…, I’d like to… Entonación de la frase en futuro.',
      'Lecturas sobre jóvenes que lograron algo: empezar.','Línea de tiempo de metas.','Hablar de mi oficio soñado.',
      L('Goal timeline','Línea de tiempo de metas'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Plan']),
    s(7,'U6',L('Reading about others','Leer sobre otros'),
      'Acento: I WILL be a doctor.','Identificar idea principal y detalles en un artículo; emparejar título y párrafo. Artículos breves sobre jóvenes y sobre oficios.',
      'Notas del artículo leído.','En pareja: entrevista de trabajo soñado.',
      L('Main idea','Idea principal'),
      ['U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('Going to and will','Going to y will'),
      'Going to para planes e intenciones; will para predicciones y decisiones espontáneas; want to / would like to para ambiciones.',
      '—','Autocomprobación de las formas verbales.',
      'Escucha: entrevistas sobre oficios futuros; completar nombre, ambición y razón.',
      L('Future forms','Formas de futuro'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('My ambitions','Mis ambiciones'),
      'De la línea de tiempo al borrador.','—',
      'Párrafo de ambiciones, 120-150 palabras: I want to be… because… I am going to…',
      'Hablar de mi ambición ante el grupo.',L('Ambitions paragraph','Párrafo de ambiciones'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The careers fair','La feria de oficios'),
      'Repaso de todos los patrones fonéticos de 1.º a 4.º.','Terminar la lectura de jóvenes que lograron algo.',
      'Versión final del párrafo. SEGUNDA EVIDENCIA CALIFICADA.',
      'Presentación en grupo: feria de oficios del futuro.',L('Paragraph + fair','Párrafo + feria'),
      ['U6:Reading Plan','U6:Speaking Skills']),
    s(11,'U6',L('Movers week','Semana de Movers'),
      'Repaso general.','—','Portafolio de fin de año; metas: ¿qué haré en 5.º?',
      'Repaso oral en formato de examen.',L('Portfolio + exam','Portafolio + examen'),
      ['U6:Writing Reflection'])
  ],
  gana:['Este es el hallazgo que hay que llevar a la reunión: 4.º rinde Cambridge Movers el 2 de diciembre y en el plan anual NO tiene inglés cargado en ninguna de las once semanas previas. Tampoco Personal Social, ni Arte, ni Música, ni Tutoría: solo cuatro áreas de nueve.',
        'El Scope sí tiene esas once semanas escritas —Holidays & Travel y My Future—, así que la unidad de once semanas no inventa: recupera lo que ya existe y no llegó al plan.',
        'Pasado simple (U5) y formas de futuro (U6) son la misma competencia en dos tiempos, y el Movers evalúa las dos: en una unidad se enseñan como pareja y no como dos temas.']
},

/* ==================================================================== 5.o */
5:{
  etapa:'primaria', cefr:'A2', temaU5:'Health & Wellbeing', temaU6:'Adventures & Experiences',
  reader:'The Crossover (K. Alexander) y Percy Jackson n.º 1 o Into the Wild (adaptado)',
  titulo:L('Looking after myself, and daring','Cuidarme y atreverme'),
  hilo:'Primero se aprende a aconsejar sobre el propio cuerpo y la propia cabeza; después se '+
    'cuenta una aventura en la que hubo que aguantar. El consejo de la primera mitad es lo que '+
    'sostiene al protagonista de la segunda.',
  escritura:[{de:'U5', que:'Entrada de blog con consejos de salud, 180-230 palabras'},
             {de:'U6', que:'Narración de aventura, 200-260 palabras'}],
  semanas:[
    s(1,'U5',L('Body and mind','El cuerpo y la cabeza'),
      'Salud y medicina: vaccination, symptoms, diagnosis, prescription, allergy, first aid. Salud mental: stress, anxiety, wellbeing, resilience. Entonación del consejo: You SHOULD rest.',
      'The Crossover: empezar los capítulos seleccionados.','Esquema problema → causa → consejo → resultado.',
      'Dar y responder a un consejo de salud.',L('Advice structure','Esquema del consejo'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Is this advice any good','¿Sirve este consejo?'),
      'Habla encadenada: What’s the matter?','Entender consejos y recomendaciones implícitas; evaluar la lógica de una afirmación sobre salud. Artículos de consejo y blogs de bienestar.',
      'Comprobación entre pares: ¿convence el consejo?','Juego de rol: farmacéutico y paciente.',
      L('Claim check','¿Se sostiene?'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Should, ought to, might','Should, ought to, might'),
      'Modales: should, ought to, might, could. Voz pasiva en presente simple (introducción). Gerundio frente a infinitivo: enjoy + -ing, want + to.',
      '—','Consejos con el modal que corresponde.',
      'Escucha: detalles clave en una consulta médica; distinguir síntoma de causa.',
      L('Modals of advice','Modales de consejo'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The blog post','La entrada de blog'),
      'Del esquema al borrador.','—',
      'Entrada de blog con consejos de salud, 180-230 palabras, dirigiéndose al lector: You should / Why not try…',
      'Consejos de bienestar para adolescentes, en grupo.',L('Health blog','Blog de salud'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('How am I feeling','Cómo me siento'),
      'Diario de bienestar: ¿cómo me siento este trimestre? ¿Qué me mantiene en equilibrio?',
      'The Crossover: terminar los capítulos seleccionados.',
      'Versión final del blog. PRIMERA EVIDENCIA CALIFICADA.',
      'Registro persuasivo al aconsejar.',L('Blog + journal','Blog + diario'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U6',L('The adventure','La aventura'),
      'Aventura y viaje: expedition, backpacking, cruise, safari, pilgrimage. Narración en pasado: realised, discovered, overcame, survived. Vocabulario emocional: breathtaking, terrifying, unforgettable.',
      'Percy Jackson o Into the Wild: empezar.','Ficha de las 5 W de la aventura.','Contar una aventura breve.',
      L('5 Ws sheet','Ficha de las 5 W'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Plan']),
    s(7,'U6',L('How a story is built','Cómo se arma una historia'),
      'Fluidez: volver a contar sin titubear.','Analizar la estructura narrativa: orientación, crisis y resolución; respuesta personal con referencia al texto. Extractos de narrativa de viaje y memorias.',
      'El esquema de mi narración.','En pareja: historia con fotos de viaje.',
      L('Story structure','Estructura de la historia'),
      ['U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('While and when','While y when'),
      'Pasado simple con pasado continuo: while / when. Pasado perfecto (introducción): I had already… Conectores narrativos: eventually, meanwhile, suddenly, as a result.',
      '—','Escenas de prueba con los tres tiempos.',
      'Escucha: secuenciar los hechos de una aventura; identificar emociones; Flyers, ordenar imágenes.',
      L('Narrative tenses','Tiempos del relato'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('The narrative','La narración'),
      'Autoedición: verbos vivos, detalle sensorial, expresiones de tiempo.','—',
      'Narración de aventura, 200-260 palabras, con pasado simple y continuo y adjetivos vívidos.',
      'Narrar una aventura real o imaginada, 3-4 minutos.',L('Adventure narrative','Narración de aventura'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('Amazing journeys','Viajes increíbles'),
      'Turno largo estilo Flyers.','Percy Jackson o Into the Wild: terminar.',
      'Versión final de la narración. SEGUNDA EVIDENCIA CALIFICADA.',
      'Presentación oral en grupo: viajes increíbles.',L('Narrative + presentation','Narración + presentación'),
      ['U6:Reading Plan','U6:Speaking Skills']),
    s(11,'U6',L('Flyers week','Semana de Flyers'),
      'Repaso general.','—',
      'Portafolio de fin de año: mis tres mejores piezas; carta a mi yo de 6.º; repaso de los diez atributos del perfil.',
      'Repaso oral en formato de examen.',L('Portfolio + exam','Portafolio + examen'),
      ['U6:Writing Reflection'])
  ],
  gana:['5.º rinde Cambridge Flyers el 2 de diciembre, y en el plan anual el inglés cae a 2 de las 6 semanas del periodo 6, justo antes del examen. La unidad de once semanas devuelve esas semanas al inglés sin quitárselas a nadie: son las que el Scope ya tiene escritas.',
        'Es el grado mejor cargado de primaria —8 de 9 áreas en P6— así que la fusión aquí no resuelve un vacío: ordena. Un solo producto en vez de dos evita que noviembre tenga dos cierres.',
        'La narración de aventura de U6 pide pasado simple, continuo y perfecto: en once semanas hay sitio para enseñarlos sobre el consejo de salud de U5, que ya usaba modales.']
},

/* ------------------------------------------------------------------ 6.o */
6:{
  etapa:'secundaria', cefr:'A2→B1', temaU5:'My Neighbourhood & Places', temaU6:'Free Time & Hobbies',
  reader:'The Prince and the Pauper (M. Twain), Black Cat A2',
  titulo:L('My place and my time','Mi sitio y mi tiempo'),
  hilo:'Dónde vivo y qué hago cuando puedo elegir. La primera mitad describe el sitio; '+
    'la segunda, lo que la gente hace en él. Las dos escrituras del Scope son la misma persona '+
    'contando primero un lugar y después un tiempo.',
  escritura:[{de:'U5', que:'Neighbourhood report, 130-160 palabras'},
             {de:'U6', que:'Narrative recount, 150-200 palabras'}],
  semanas:[
    s(1,'U5',L('The place, named','El lugar, nombrado'),
      'Places in town y transporte; preposiciones de lugar. Entonación de pregunta frente a afirmación.',
      'The Prince and the Pauper, cap. 1-3.','Frases sueltas del sitio, para el banco de vocabulario.',
      'Decir dónde está algo.',L('Vocabulary map','Mapa de vocabulario'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Reading a map','Leer un mapa'),
      'Simple directions vocabulary.','Mapas y descripciones de pueblo; localizar información y seguir indicaciones paso a paso.',
      'Las indicaciones, escritas.','Seguir indicaciones en pareja.',L('Written directions','Indicaciones escritas'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('There is, there are','There is, there are'),
      'There is / There are; preposiciones de lugar; introducción al presente continuo.',
      'The Prince and the Pauper, cap. 4-6.','Frases del informe con la estructura nueva.',
      'Escucha: indicaciones sobre un mapa y anuncios de viaje.',L('Grammar in use','Gramática en uso'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The report, drafted','El informe, en borrador'),
      'Repaso de mayúsculas y puntos.','Modelos de informe.',
      'Neighbourhood report, 130-160 palabras: primer borrador; peer feedback «2 stars & 1 wish».',
      'Leer el borrador en voz alta.',L('First draft','Primer borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The report, delivered','El informe, entregado'),
      'Corrección propia con la rúbrica de vocabulario.','—',
      'Versión final del informe. PRIMERA EVIDENCIA CALIFICADA.',
      'Pair work: describir el barrio; dar y seguir indicaciones.',
      L('Report + oral','Informe + oral'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the book, and the Show','Medio libro, y el Show'),
      'Repaso de la primera mitad.','The Prince and the Pauper, cap. 7-8: cierre de la primera parte.',
      '—','Creative Arts Show: el concierto del grado.',L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('What we do when we are free','Qué hacemos cuando podemos'),
      'Deportes, aficiones y ocio; expresiones de frecuencia; equipamiento y lugares. Entonación y ritmo del relato.',
      'Poemas ilustrados sobre aficiones.','Encuesta de tiempo libre.','Pair survey.',
      L('Free-time survey','Encuesta de tiempo libre'),
      ['U6:Vocabulary Development','U6:Phonics']),
    s(8,'U6',L('What I can do','Lo que sé hacer'),
      'Can / can’t para habilidad; like / love / hate + -ing; Let’s… y Why don’t we…? para sugerir.',
      '—','Frases de habilidad y de gusto para el relato.',
      'Escucha: idea principal en historias de aficiones; hueco en comentario deportivo.',
      L('Ability + suggestions','Habilidad + sugerencias'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('The weekend, told','El fin de semana, contado'),
      'Pasado simple en el relato.','—',
      'Narrative recount, 150-200 palabras: el fin de semana pasado. Borrador y lista de autocorrección.',
      'Contar el fin de semana a un compañero.',L('Narrative draft','Relato en borrador'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The book ends','Se acaba el libro'),
      'Rima y ritmo en poemas.','The Prince and the Pauper, cap. 9 al final, y discusión comparativa; respuesta personal a textos ilustrados.',
      'Versión final del relato. SEGUNDA EVIDENCIA CALIFICADA.','Discusión sobre el final del libro.',
      L('Reader finished + story','Reader terminado + relato'),
      ['U6:Reading Plan','U6:Reading Skills','U6:Textual Comprehension']),
    s(11,'U6',L('My hobby, presented','Mi afición, presentada'),
      'Repaso general.','—','Portafolio del trimestre y autoevaluación semáforo.',
      'Presentación oral de 2-3 minutos sobre mi afición, estilo TED con apoyo visual.',
      L('Talk + portfolio','Charla + portafolio'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['El reader se lee de corrido en once semanas en vez de cortarse en el capítulo 8.',
        'Las dos escrituras dejan de ser dos entregas sueltas: son un texto descriptivo y uno narrativo del mismo alumno sobre el mismo sitio.',
        'La unidad cierra la última semana de noviembre y el A2 Key es el 2 de diciembre: la semana 11 es repaso útil, no contenido nuevo.']
},

/* ------------------------------------------------------------------ 7.o */
7:{
  etapa:'secundaria', cefr:'B1', temaU5:'Nature & Environment', temaU6:'Future Plans & Ambitions',
  reader:'Treasure Island (R.L. Stevenson), Vicens Vives A2/B1',
  titulo:L('What is here, and what I will be','Lo que hay aquí y lo que seré'),
  hilo:'Qué está vivo alrededor y qué quiero estar haciendo dentro de diez años. Es una sola '+
    'pregunta con dos plazos, y la última frase del trimestre las une: qué le haría el oficio que '+
    'elegí a lo que inventarié.',
  escritura:[{de:'U5', que:'Comparative paragraph, 200-250 palabras'},
             {de:'U6', que:'Future plans paragraph, 200-250 palabras'}],
  semanas:[
    s(1,'U5',L('What is alive','Lo vivo'),
      'Animales salvajes y domésticos, hábitats y ecosistemas, adjetivos ambientales. Entonación de sorpresa y entusiasmo.',
      'Treasure Island, parte 1 (inicio).','Fichas de especie.','Nombrar y describir.',
      L('Species files','Fichas de especie'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Two texts, one subject','Dos textos, un tema'),
      '—','Fact files y artículos descriptivos de naturaleza; comparar información entre dos textos e identificar lenguaje persuasivo.',
      'Los criterios de comparación, escritos.','Contrastar lo que dicen dos fuentes.',
      L('Criteria list','Lista de criterios'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Must and must not','Debe y no debe'),
      'Modales should / shouldn’t, must / mustn’t, have to / don’t have to; infinitivo de finalidad.',
      'Treasure Island, parte 1 (cierre).','Reglas de cuidado del hábitat.',
      'Escucha: datos clave en documentales de naturaleza; identificar opiniones.',
      L('Rules of care','Reglas de cuidado'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('Comparing two','Comparar dos'),
      'Estructura PEEL del párrafo.','—',
      'Comparative paragraph, 200-250 palabras, sobre dos animales o dos hábitats: borrador y peer review de ideas y vocabulario.',
      'Defender la comparación.',L('Comparative draft','Comparativo en borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The comparison, delivered','La comparación, entregada'),
      'Autoevaluación de destrezas de investigación; «two stars & a wish».','—',
      'Versión final del comparativo. PRIMERA EVIDENCIA CALIFICADA.',
      'Debate en pareja comparando dos animales; informe oral sobre una especie amenazada.',
      L('Paragraph + oral report','Párrafo + informe oral'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the island, and the Show','Media isla, y el Show'),
      'Repaso de la primera mitad.','Treasure Island, cierre de la parte 1.','—',
      'Creative Arts Show: la pieza del grado.',L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('Jobs and ambitions','Oficios y ambiciones'),
      'Oficios y profesiones, ambiciones y metas, expresiones de tiempo futuro. Ritmo de la frase en futuro.',
      'Entrevistas breves y textos de opinión sobre carreras.','Mapa de oficios.',
      'Decir qué se quiere ser y por qué.',L('Career map','Mapa de oficios'),
      ['U6:Vocabulary Development','U6:Phonics']),
    s(8,'U6',L('Going to and will','Going to y will'),
      'Going to para planes e intenciones; will para predicciones y decisiones espontáneas; presente continuo para lo ya acordado.',
      '—','Frases de plan y de predicción, separadas a propósito.',
      'Escucha: puntos principales en podcasts de orientación profesional.',
      L('Future forms','Formas de futuro'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('My career in ten years','Mi carrera en diez años'),
      'Autocorrección de gramática y ortografía.','—',
      'Future plans paragraph, 200-250 palabras: borrador y entrada de portafolio con la mejor pieza.',
      'Simulación de entrevista en pareja.',L('Future draft + interview','Futuro en borrador + entrevista'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The island ends','Se acaba la isla'),
      '—','Treasure Island, parte 2 al final, con discusión comparativa; opiniones e intenciones de los personajes y respuesta personal a textos de opinión.',
      'Versión final del párrafo de futuro. SEGUNDA EVIDENCIA CALIFICADA.','Discusión sobre quién cambió en la novela.',
      L('Reader finished + plan','Reader terminado + plan'),
      ['U6:Reading Plan','U6:Reading Skills','U6:Textual Comprehension']),
    s(11,'U6',L('The talk','La charla'),
      'Repaso general.','—','Portafolio del trimestre y autoevaluación semáforo.',
      'Presentación breve sobre mi carrera futura, con estructura acordada.',
      L('Talk + portfolio','Charla + portafolio'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['7.º no presenta examen oficial en diciembre, así que es el grado donde la unidad larga se puede aprovechar entera para contenido.',
        'Los dos párrafos del Scope tienen la misma extensión y el mismo formato: en once semanas se pueden pedir con borrador y versión final, que es lo que el Scope pide y en cinco semanas no cabe.',
        'Treasure Island se lee entero sin el corte de la parte 1 a la 2.']
},

/* ------------------------------------------------------------------ 8.o */
8:{
  etapa:'secundaria', cefr:'B1+', temaU5:'Our Planet', temaU6:'Stories & Narratives',
  reader:'The Giver (L. Lowry), Clarion Books',
  titulo:L('The planet, and the stories we tell about it','El planeta y las historias que contamos de él'),
  hilo:'Primero se mide y se argumenta con evidencia; después se narra. La distopía de The Giver '+
    'es el puente: la misma realidad, contada como ficción, y con la voz pasiva y el estilo '+
    'indirecto como las dos gramáticas de «quién dice esto».',
  escritura:[{de:'U5', que:'Informative text on an eco-problem, 250-300 palabras'},
             {de:'U6', que:'Short narrative story, 280-350 palabras'}],
  semanas:[
    s(1,'U5',L('The problem, named','El problema, nombrado'),
      'Problemas ambientales y soluciones, vocabulario de cambio climático, eco-acciones. Entonación para actitud y énfasis.',
      'The Giver, cap. 1-4.','Banco de términos con su definición.','Nombrar el problema elegido.',
      L('Problem file','Ficha del problema'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Cause and effect','Causa y efecto'),
      '—','Noticias ambientales e infografías; skim y scan, y causa-efecto en artículos.',
      'El esquema causa-efecto del problema.','Explicar la cadena de causas.',
      L('Cause-effect map','Mapa de causa y efecto'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Who does what to whom','Quién le hace qué a quién'),
      'Voz pasiva en presente y pasado simple; pasiva en presente perfecto; by + agente.',
      'The Giver, cap. 5-8.','Reescritura de frases en pasiva, con y sin agente.',
      'Escucha: ideas principales en documentales; datos y estadísticas.',
      L('Passive voice','Voz pasiva'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('Writing with evidence','Escribir con evidencia'),
      'Paráfrasis de fuentes; peer review de coherencia argumental.','—',
      'Informative text sobre un problema ecológico, 250-300 palabras: borrador con evidencia citada.',
      'Presentar el borrador al grupo.',L('Informative draft','Informativo en borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The argument, defended','El argumento, defendido'),
      'Mapa conceptual del problema; autoevaluación de destrezas de investigación.','—',
      'Versión final del texto informativo. PRIMERA EVIDENCIA CALIFICADA.',
      'Debate: ¿se está haciendo bastante por el planeta? Informe oral de un problema ambiental.',
      L('Text + debate','Texto + debate'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the book, and the Show','Medio libro, y el Show'),
      'Repaso de la primera mitad.','The Giver, cap. 9-12: cierre de la primera parte.','—',
      'Creative Arts Show: la pieza del grado.',L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('How a story is built','Cómo se arma un relato'),
      'Géneros literarios y elementos del relato; adjetivos narrativos (gripping, chilling) y vocabulario emocional. Fluidez con dramatización.',
      'Extractos de relato y aperturas de capítulo.','La premisa y el conflicto, por escrito.',
      'Contar la premisa en voz alta.',L('Premise + conflict','Premisa + conflicto'),
      ['U6:Vocabulary Development','U6:Phonics']),
    s(8,'U6',L('Narrative tenses','Los tiempos del relato'),
      'Pasado simple, continuo y perfecto en el relato; estilo indirecto con say / tell y retroceso temporal.',
      '—','Escenas de prueba con los tres tiempos.',
      'Escucha: punto de vista narrativo en historias de radio; secuencia de hechos pasados.',
      L('Tenses + reported speech','Tiempos + estilo indirecto'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('The story, drafted','El relato, en borrador'),
      'Autoedición de la consistencia narrativa.','—',
      'Short narrative story, 280-350 palabras: borrador completo.','Leer un fragmento al grupo.',
      L('Story draft','Relato en borrador'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The Giver ends','Se acaba The Giver'),
      '—','The Giver, cap. 13 al final, y ensayo comparativo de distopías; analizar estructura narrativa, trama y conflicto, y respuesta personal con evidencia del texto.',
      'Versión final del relato. SEGUNDA EVIDENCIA CALIFICADA.','Discusión comparativa.',
      L('Reader finished + story','Reader terminado + relato'),
      ['U6:Reading Plan','U6:Reading Skills','U6:Textual Comprehension']),
    s(11,'U6',L('Told out loud','Contado en voz alta'),
      'Repaso general.','—','Portafolio del trimestre y reflexión metacognitiva: ¿en qué he mejorado?',
      'Contar el relato con los tiempos narrativos; reto de narración en grupo.',
      L('Storytelling + portfolio','Narración + portafolio'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['8.º presenta B1 Preliminary el 2 de diciembre. Con la unidad de once semanas, noviembre es escritura larga y oral —lo que el PET evalúa— y no vocabulario nuevo.',
        'The Giver se lee entero: el ensayo comparativo de distopías que pide U6 necesita el libro terminado y una unidad que no se haya cerrado antes.',
        'La voz pasiva (U5) y el estilo indirecto (U6) son la misma pregunta gramatical —quién dice y quién hace— y en una sola unidad se enseñan juntas.']
},

/* ------------------------------------------------------------------ 9.o */
9:{
  etapa:'secundaria', cefr:'B1+→B2', temaU5:'Literature & Power', temaU6:'Justice & Ethics',
  reader:'The Time Machine (H.G. Wells), Vicens Vives B1.2',
  titulo:L('Who tells it, and who it is fair to','Quién lo cuenta y a quién le es justo'),
  hilo:'La primera mitad enseña a construir un relato; la segunda, a juzgarlo. Wells da el puente: '+
    'un futuro partido en dos clases es a la vez una técnica narrativa y un problema de justicia.',
  escritura:[{de:'U5', que:'Short story with narrative tenses, 320-380 palabras'},
             {de:'U6', que:'For-and-against essay, 320-380 palabras'}],
  semanas:[
    s(1,'U5',L('The elements','Los elementos'),
      'Géneros literarios y elementos narrativos; vocabulario emocional y sensorial; colocaciones de plot, character y theme. Prosodia del relato.',
      'The Time Machine, cap. 1-2.','El mapa del relato propio.','Contar la premisa.',
      L('Story map','Mapa del relato'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Technique and voice','Técnica y voz'),
      '—','Extractos de relato y capítulos de novela; analizar técnicas narrativas —estructura y voz— y responder con evidencia del texto.',
      'El análisis de una técnica, aplicado al propio relato.','Justificar una elección narrativa.',
      L('Technique analysis','Análisis de técnica'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Narrative tenses','Los tiempos del relato'),
      'Pasado simple, continuo y perfecto; past perfect continuous; adverbios de secuencia (eventually, meanwhile, suddenly).',
      'The Time Machine, cap. 3-4.','Escenas de prueba con los cuatro tiempos.',
      'Escucha: punto de vista en extractos literarios; inferir la motivación del personaje.',
      L('Four tenses','Los cuatro tiempos'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The story, drafted','El relato, en borrador'),
      'Cohesión narrativa con expresiones de tiempo; revisión de la consistencia verbal.','—',
      'Short story, 320-380 palabras: borrador completo.','Leer una escena al grupo.',
      L('Story draft','Relato en borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The story, delivered','El relato, entregado'),
      'Autoevaluación del oficio narrativo: ¿qué decisiones literarias tomé?','—',
      'Versión final del relato. PRIMERA EVIDENCIA CALIFICADA.',
      'Narración oral de una historia real o imaginada; narración colaborativa en grupo.',
      L('Story + oral narrative','Relato + narración oral'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the machine, and the Show','Media máquina, y el Show'),
      'Repaso de la primera mitad.','The Time Machine, cap. 5-6: cierre de la primera parte.','—',
      'Creative Arts Show: la pieza del grado.',L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('The global problem','El problema global'),
      'Problemas globales y soluciones; ONG y organismos internacionales; vocabulario de debate formal. Fluidez y dicción para el debate académico.',
      'Ensayos argumentativos y artículos formales.','El asunto elegido, acotado por escrito.',
      'Plantear el asunto en treinta segundos.',L('The issue, framed','El asunto, acotado'),
      ['U6:Vocabulary Development','U6:Phonics']),
    s(8,'U6',L('If we had known','Si lo hubiéramos sabido'),
      'Tercer condicional para el pasado hipotético; wish e if only; contraste y concesión con whereas y nevertheless.',
      '—','Los dos lados del asunto, en frases condicionales.',
      'Escucha: posturas en debates formales; distinguir hecho de especulación.',
      L('Third conditional','Tercer condicional'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('Both sides','Las dos caras'),
      'Autoedición de registro y estilo; portafolio como evidencia de progreso.','—',
      'For-and-against essay, 320-380 palabras: borrador con las dos posturas antes de la propia.',
      'Sostener la postura contraria a la propia.',L('Essay draft','Ensayo en borrador'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('The machine ends','Se acaba la máquina'),
      '—','The Time Machine, cap. 7 al final, y ensayo comparativo de tres novelas; evaluar la lógica y la coherencia de los argumentos, e identificar sesgo y falacia.',
      'Versión final del ensayo. SEGUNDA EVIDENCIA CALIFICADA.','Discusión comparativa.',
      L('Reader finished + essay','Reader terminado + ensayo'),
      ['U6:Reading Plan','U6:Reading Skills','U6:Textual Comprehension']),
    s(11,'U6',L('The formal debate','El debate formal'),
      'Repaso general.','—','Portafolio del trimestre y semáforo R/A/G de progreso gramatical.',
      'Debate formal estructurado sobre un asunto global, con el modelo Point–Evidence–Explanation.',
      L('Debate + portfolio','Debate + portafolio'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['Si 9.º presenta B2 First en diciembre —lo dice el Scope, aunque los cursos del portal se lo dan a 10.º: ver la discrepancia abierta— la unidad larga deja noviembre para escritura de examen y speaking, que es lo que el FCE mide. Y si no lo presenta, esas mismas semanas consolidan sin perderse nada.',
        'El for-and-against essay de U6 pide evaluar sesgo y falacia, que es una destreza que se construye en semanas, no en cinco días.',
        'El ensayo comparativo de tres novelas de U6 solo tiene sentido con el trimestre entero de lectura detrás.']
},

/* ----------------------------------------------------------------- 10.o */
10:{
  etapa:'secundaria', cefr:'B2+', temaU5:'Sustainability & Action', temaU6:'Language, Career & Communication',
  reader:'Fahrenheit 451 (R. Bradbury), Simon & Schuster',
  titulo:L('What I would change, and who I would be to change it','Lo que cambiaría y quién tendría que ser para cambiarlo'),
  hilo:'La primera mitad convence; la segunda se postula. Es la misma persona: primero defiende '+
    'una causa en público y después pide el puesto desde el que se llevaría a cabo.',
  escritura:[{de:'U5', que:'Persuasive essay, 370-440 palabras'},
             {de:'U6', que:'CV + formal cover letter'}],
  semanas:[
    s(1,'U5',L('The cause','La causa'),
      'Vocabulario de ecología y sostenibilidad; colocaciones ambientales; conectores formales (consequently, thereby). Prosodia de la persuasión.',
      'Fahrenheit 451, parte 1.','La causa elegida, acotada.','Plantear la causa.',
      L('The cause, framed','La causa, acotada'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Many sources, one argument','Muchas fuentes, un argumento'),
      '—','Informes largos de política ambiental; sintetizar información de varias fuentes e introducir la bibliografía anotada.',
      'La bibliografía anotada.','Resumir una fuente en un minuto.',
      L('Annotated bibliography','Bibliografía anotada'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('What would happen if','Qué pasaría si'),
      'Condicionales 2 y 3 en toda su gama; condicionales mixtos; wish, if only, it’s time, would rather.',
      'Fahrenheit 451, parte 2.','Los escenarios, en condicional.',
      'Escucha: idea general y detalle en documentales; evaluar la lógica del argumento.',
      L('Conditionals','Condicionales'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The essay, drafted','El ensayo, en borrador'),
      'Revisión para el efecto persuasivo; tono, dicción y registro formal.','—',
      'Persuasive essay, 370-440 palabras: borrador de la llamada a la acción.','Ensayar el cierre en voz alta.',
      L('Persuasive draft','Persuasivo en borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The essay, defended','El ensayo, defendido'),
      'Ficha de evaluación del debate entre pares; autoevaluación de recursos persuasivos.','—',
      'Versión final del ensayo persuasivo. PRIMERA EVIDENCIA CALIFICADA.',
      'Debate persuasivo sobre políticas ambientales, en formato punto-contrapunto.',
      L('Essay + debate','Ensayo + debate'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the book, and the Show','Medio libro, y el Show'),
      'Repaso de la primera mitad.','Fahrenheit 451, cierre de las partes 1-2.','—',
      'Creative Arts Show: la canción del grado (historia del rock).',
      L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('The professional world','El mundo profesional'),
      'Comunicación profesional y vocabulario de trabajo; colocaciones del entorno laboral; registro formal frente a informal. Estrategias de fluidez para el turno largo.',
      'Anuncios de empleo, CV y cartas de presentación; convenciones de género en documentos profesionales.',
      'El puesto elegido y por qué.','Presentarse en treinta segundos.',
      L('The job, chosen','El puesto, elegido'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Skills','U6:Textual Comprehension']),
    s(8,'U6',L('Formal register','Registro formal'),
      'Formas de futuro: will, going to, presente continuo; futuro perfecto y continuo; nominalización y estructuras impersonales.',
      '—','Reescritura de frases del ensayo en registro formal.',
      'Escucha: interpretar la formalidad en entrevistas profesionales; acordar y rebatir.',
      L('Future forms + register','Futuro + registro'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('CV and letter','CV y carta'),
      'Lista de comprobación para la corrección final.','—',
      'CV y carta de presentación formal: versión completa. SEGUNDA EVIDENCIA CALIFICADA.',
      'Presentar el CV a un compañero como si fuera el empleador.',
      L('CV + cover letter','CV + carta'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process']),
    s(10,'U6',L('Fahrenheit ends','Se acaba Fahrenheit'),
      '—','Fahrenheit 451, parte 3 y final, y ensayo comparativo de distopías.',
      'El ensayo comparativo.','Discusión: una sociedad que dejó de leer.',
      L('Reader finished + essay','Reader terminado + ensayo'),
      ['U6:Reading Plan']),
    s(11,'U6',L('The interview','La entrevista'),
      'Repaso general.','—','Portafolio de fin de año y autoevaluación del proyecto de carrera.',
      'Entrevista de trabajo simulada y presentación de carrera; estrategias de comunicación profesional.',
      L('Mock interview + portfolio','Entrevista simulada + portafolio'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['Según el Scope, 10.º no presenta examen oficial en diciembre —es consolidación de FCE y puente a CAE—, así que su noviembre puede ser contenido de verdad, y la unidad larga lo aprovecha entero.',
        'El CV y la carta de U6 solo tienen sentido si hay un proyecto detrás del que hablar: el ensayo persuasivo de U5 es ese proyecto.',
        'Cuál de los dos grados presenta B2 First está sin cerrar: el Scope se lo da a 9.º y los cursos del portal a 10.º. Es la decisión que hay que tomar antes de la matrícula, y cambia el peso de las semanas 9 a 11 en los dos grados.']
},

/* ----------------------------------------------------------------- 11.o */
11:{
  etapa:'secundaria', cefr:'C1', temaU5:'Politics, Society & Global Citizenship', temaU6:'C1 Mastery & IB Diploma Exam',
  reader:'Lord of the Flies (W. Golding), Penguin Books',
  titulo:L('The word in public, and the exam that measures it','La palabra en público y el examen que la mide'),
  hilo:'En 11.º la fusión no es un remedio, es lo correcto: U6 del Scope no es contenido nuevo, '+
    'se llama «C1 Mastery & IB Diploma Exam». Son once semanas de la misma cosa —usar la lengua '+
    'en público con nivel C1— con la evaluación externa al final.',
  escritura:[{de:'U5', que:'Opinion article for publication, 450-550 palabras'},
             {de:'U6', que:'C1 exam writing: essay, report, proposal y formal letter, 350-500 palabras con tiempo'}],
  semanas:[
    s(1,'U5',L('The political word','La palabra política'),
      'Ciencia política: gobernanza y soberanía; vocabulario de movimientos sociales; AWL set 7. Fluidez y espontaneidad en el debate.',
      'Lord of the Flies, cap. 1-2.','El asunto público elegido.','Plantear una postura sin preparación.',
      L('The issue, chosen','El asunto, elegido'),
      ['U5:Vocabulary Development','U5:Phonics','U5:Reading Plan']),
    s(2,'U5',L('Who is speaking','Quién está hablando'),
      '—','Discursos políticos y documentos de política pública; analizar el discurso y la postura ideológica, e identificar la manipulación lingüística.',
      'El análisis de un discurso real.','Señalar el recurso y nombrarlo.',
      L('Discourse analysis','Análisis del discurso'),
      ['U5:Reading Skills','U5:Textual Comprehension']),
    s(3,'U5',L('Judging what was done','Juzgar lo hecho'),
      'Modales avanzados de deducción y crítica: must have, can’t have, should have, ought to have; estructuras paralelas en la escritura formal; question tags complejas y echo questions.',
      'Lord of the Flies, cap. 3-4.','Juicios sobre decisiones públicas, en modal perfecto.',
      'Escucha: retórica e intención en discursos políticos; detectar técnicas persuasivas.',
      L('Advanced modals','Modales avanzados'),
      ['U5:Language Conventions (Writing)','U5:Listening Skills']),
    s(4,'U5',L('The article, drafted','El artículo, en borrador'),
      'Revisión de estilo, cohesión e impacto; estructuras de frase variadas de nivel C1.','—',
      'Opinion article para publicar, 450-550 palabras: borrador en estilo editorial con recursos retóricos.',
      'Leer el párrafo de apertura en voz alta.',L('Article draft','Artículo en borrador'),
      ['U5:Text Types (Writing)','U5:Idea Development & Process']),
    s(5,'U5',L('The article, published','El artículo, publicado'),
      'Autoevaluación del discurso político; reflexión sobre el propio papel como ciudadano global.','—',
      'Versión final del artículo de opinión. PRIMERA EVIDENCIA CALIFICADA.',
      'Discurso de opinión política de cinco minutos con turno de preguntas; debate modelo ONU o parlamentario.',
      L('Article + speech','Artículo + discurso'),
      ['U5:Speaking Skills','U5:Writing Reflection']),
    s(6,'U5',L('Half the island, and the Show','Media isla, y el Show'),
      'Repaso de la primera mitad.','Lord of the Flies, cap. 5-6: cierre de la primera parte.','—',
      'Creative Arts Show: la pieza del grado (apreciación de música académica).',
      L('Show + reader at half','Show + reader a la mitad'),
      ['U5:Reading Plan']),
    s(7,'U6',L('The exam, mapped','El examen, mapeado'),
      'Repaso de vocabulario C1: AWL completo, idioms y lenguaje figurado, verbos frasales en contexto académico. Estrategias C1 de fluidez: reparación y reformulación.',
      'Estrategias de examen: gestión del tiempo, vocabulario desconocido, idea general frente a detalle.',
      'Diagnóstico de las cuatro destrezas.','Turno largo cronometrado.',
      L('Readiness diagnosis','Diagnóstico de preparación'),
      ['U6:Vocabulary Development','U6:Phonics','U6:Reading Skills']),
    s(8,'U6',L('Grammar without a net','Gramática sin red'),
      'Repaso gramatical C1: formación de palabras con prefijos y sufijos, key word transformation estilo FCE/CAE, elipsis y sustitución, open cloze y corrección de errores.',
      '—','Baterías de transformación y open cloze.',
      'Escucha de examen C1: opción múltiple, emparejamiento y completar.',
      L('Use of English','Use of English'),
      ['U6:Language Conventions (Writing)','U6:Listening Skills']),
    s(9,'U6',L('Writing under a clock','Escribir con reloj'),
      'Corrección final: estrategias de detección de errores y gestión del tiempo en la escritura de examen.',
      'Textos de examen: gapped text, opción múltiple, emparejar títulos, cross-text multiple choice.',
      'Escritura de examen C1 en los cuatro formatos —ensayo, informe, propuesta y carta formal—, 350-500 palabras en condiciones de tiempo. SEGUNDA EVIDENCIA CALIFICADA.',
      'Comentar el propio error con el compañero.',L('All task types','Todos los formatos'),
      ['U6:Text Types (Writing)','U6:Idea Development & Process','U6:Textual Comprehension']),
    s(10,'U6',L('The island ends','Se acaba la isla'),
      '—','Lord of the Flies, cap. 7-12, y ensayo comparativo de dos novelas, con práctica de examen.',
      'El ensayo comparativo.','Discusión: una comunidad política que fracasa.',
      L('Reader finished + essay','Reader terminado + ensayo'),
      ['U6:Reading Plan']),
    s(11,'U6',L('The long turn','El turno largo'),
      'Repaso general.','—',
      'Autoevaluación de preparación C1 en las cuatro destrezas; portafolio de fin de año con cinco piezas y reflexión extensa; revisión de los diez atributos del perfil.',
      'Speaking de examen C1: turno largo y discusión; portafolio oral final.',
      L('Speaking + final portfolio','Speaking + portafolio final'),
      ['U6:Speaking Skills','U6:Writing Reflection'])
  ],
  gana:['Es el grado donde la fusión es más evidente: U6 no es contenido, es preparación de examen. Mantenerla como unidad aparte obliga a poner una nota de unidad a lo que en realidad es la recta final del CAE.',
        'El C1 Advanced es el 2 de diciembre. Las semanas 7 a 11 quedan alineadas con el Mock 2 de octubre y la matrícula de noviembre, sin competir con ellos.',
        'El portafolio de fin de año pide cinco piezas: en once semanas hay de dónde sacarlas; en cinco, no.']
}

}};
})();
