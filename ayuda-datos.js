/* Contenido de la ayuda del Portal NIS (ayuda.html).
   Va aparte del HTML a proposito: el texto se corrige a menudo y quien lo
   corrige no tiene por que tocar la pagina. El mismo archivo alimenta la
   ayuda en pantalla y el manual impreso, asi que lo que se escriba aqui sale
   en los dos sitios.

   Formato de cada bloque del cuerpo:
     'texto'                     -> parrafo (admite HTML sencillo)
     {h:'Titulo'}                -> subtitulo
     {pasos:['…','…']}           -> lista numerada
     {lista:['…','…']}           -> lista con vinetas
     {nota:'…', tipo:'warn'}     -> aviso (tipo: '', 'warn', 'bad')
     {tabla:{cols:[…], filas:[[…]]}}  -> tabla; la primera celda va resaltada

   REGLA: no se documenta nada que no exista. Si una pantalla cambia de sitio,
   se cambia aqui el mismo dia. */
window.AYUDA = {

/* ───────────────────────────── ALUMNO ───────────────────────────── */
student: { secciones: [

  { icon:'🔑', titulo:'Entrar al portal', busca:'login contraseña password acceso entrar olvide',
    sub:'La dirección es nis.cohasset.pe. Entra siempre por ahí.',
    cuerpo:[
      {pasos:[
        'Abre <b>nis.cohasset.pe</b> en el navegador (Chrome funciona mejor).',
        'Escribe tu <b>correo del colegio</b> y tu contraseña.',
        'Pulsa <b>Entrar</b>. Verás tu nombre arriba a la derecha.'
      ]},
      {h:'Olvidé mi contraseña'},
      'En la pantalla de entrada pulsa <b>¿Olvidaste tu contraseña?</b> y escribe tu correo: te llega un enlace para poner una nueva. Si el correo no llega, mira la carpeta de correo no deseado y, si sigue sin aparecer, pídele a tu profesor que avise a coordinación para que te asignen una contraseña temporal.',
      {nota:'Si entras desde una dirección que empieza por <b>bacman2000.github.io</b>, el portal te lleva solo a nis.cohasset.pe. Es la misma plataforma, pero la sesión solo funciona en nis.cohasset.pe: cambia tu marcador.', tipo:'warn'}
    ]},

  { icon:'🧭', titulo:'Cómo está organizado', busca:'menu barra navegacion donde esta estructura mapa',
    sub:'Seis entradas en la barra de la izquierda, y nada más.',
    cuerpo:[
      {tabla:{cols:['En la barra','Qué encuentras'],filas:[
        ['🏠 Home','Tu unidad de un vistazo, las materias (English y French) y los recursos generales: Library y MUN Academy.'],
        ['🇬🇧 English','<b>Todo lo de inglés</b>, repartido en cuatro bloques. Es la pantalla donde vas a estar casi siempre.'],
        ['🇫🇷 French','El material de francés: por grado (lo que se está dando en clase) y por nivel del Marco Europeo (A1–C2).'],
        ['📊 My Progress','Tus exámenes y prácticas: qué rendiste, cuándo y con qué nota.'],
        ['👤 Mi cuenta','Cambiar tu contraseña.'],
        ['❓ Ayuda','Esta guía.']
      ]}},
      {nota:'En el móvil o la tablet la barra no está a la izquierda: es una fila que se desliza arriba de la pantalla. Están las mismas entradas.'}
    ]},

  { icon:'🇬🇧', titulo:'English: los cuatro bloques', busca:'english bloques my work practice cambridge results tarjetas',
    sub:'Van en el orden en que se usan: primero lo que estás haciendo, luego con qué entrenas, después el examen y al final tus notas.',
    cuerpo:[
      {h:'🎯 My work — lo que estás haciendo'},
      {lista:[
        '<b>My unit</b> — tu unidad de este trimestre: la pregunta grande, qué tienes que producir y con qué criterios se te va a calificar. <b>La rúbrica se ve desde el primer día</b>, antes de empezar.',
        '<b>My project</b> — el proyecto interdisciplinario del trimestre: once semanas y lo que aporta cada asignatura.',
        '<b>Classes</b> — el material de tu grado: gramática, actividades, readers, exámenes de unidad y las fichas de cada sesión.'
      ]},
      {h:'🧠 Practice — para entrenar por tu cuenta'},
      {lista:[
        '<b>Pronunciation</b> — cada sonido, con la lengua y el aire, para escuchar y repetir.',
        '<b>Phonics</b> — sonidos y formas de palabra: CVC, blends, magic-e.',
        '<b>Games Lab</b> — 7 juegos por tema: gramática, vocabulario, phrasal verbs e idioms (A1–C1).',
        '<b>NIShoot Live</b> — el juego en vivo de tu clase. Entras con el PIN que da el profesor.'
      ]},
      {h:'🎓 Cambridge — el examen oficial'},
      {lista:[
        '<b>Cambridge</b> — el mapa completo: la rama Young Learners (Pre-A1 a A2) y la Main Suite (A2 a C2), con la guía de cada examen.',
        '<b>Mocks</b> — los simulacros oficiales MOCK 1 y MOCK 2, por destreza.',
        '<b>Practice Tests</b> — prácticas en formato Cambridge, siempre disponibles.'
      ]},
      {h:'📊 My results'},
      {lista:['<b>Resultado final</b> — tu nivel CEFR final y el reporte que recibe tu familia, con PDF.']},
      {nota:'Tu <b>progreso día a día</b> no está aquí: está en <b>📊 My Progress</b>, en la barra de la izquierda, para que lo alcances desde cualquier pantalla.'}
    ]},

  { icon:'🎯', titulo:'Mi unidad y mi proyecto', busca:'unidad unit producto rubrica proyecto entrega big question',
    sub:'La unidad tiene un producto final y una rúbrica. Las dos cosas se ven desde el principio.',
    cuerpo:[
      {pasos:[
        'Entra por <b>English → My unit</b> (o desde Home, en la banda de arriba).',
        'Arriba está el <b>producto final</b>: lo que tienes que entregar al terminar la unidad.',
        'Debajo, la <b>rúbrica</b>: los criterios con los que se califica, en la escala <b>AD · A · B · C</b> (AD es el nivel más alto).',
        'Después va el <b>camino semana a semana</b>, con las actividades de cada semana enganchadas donde toca.',
        'Al final está la <b>entrega</b>: subes tu archivo o pegas el enlace de tu Google Doc, y pulsas enviar.'
      ]},
      {h:'Los materiales de cada sesión'},
      'Dentro de cada semana verás la ficha en <b>PDF</b> (para leer), en <b>Word</b> (para editarla en tu computadora o en Google Docs) y el <b>visor de clase</b> con las diapositivas que usó el profesor.',
      {nota:'Las diapositivas se ven en el portal pero no se descargan. La ficha sí puedes bajarla en los dos formatos.'}
    ]},

  { icon:'📄', titulo:'Responder y entregar una ficha', busca:'ficha worksheet guardar enviar entregar borrador save submit',
    sub:'Las fichas se responden dentro del portal. No hace falta imprimirlas ni pasarlas a Word.',
    cuerpo:[
      {pasos:[
        'Abre la sesión que toca desde <b>Classes → tu grado → la unidad → la semana</b>.',
        'La ficha se abre con sus campos: escribes directamente en la pantalla.',
        'Se <b>autoguarda</b> mientras escribes, un segundo y medio después de la última tecla. Arriba verás el aviso de guardado.',
        'Cuando termines, pulsa <b>Submit / Entregar</b>. Ese es el momento en el que tu profesor la recibe.'
      ]},
      {nota:'<b>Guardar no es entregar.</b> Mientras solo guardas, tu trabajo queda como borrador y tu profesor no lo ve en su lista. La entrega es el botón de enviar.', tipo:'warn'},
      {h:'Tu trabajo va a tu cuenta, no al equipo'},
      'Puedes empezar una ficha en la sala de cómputo y terminarla en casa: al volver a abrirla aparece lo que escribiste. Si la copia del equipo es más reciente que la de tu cuenta, el portal se queda con la del equipo y te ofrece deshacerlo. Nunca se borra nada.',
      {nota:'Si has entrado al portal en otra pestaña y la sesión se cerró, la ficha sigue funcionando pero solo guarda en ese equipo, y te lo dice en la barra. Vuelve a entrar antes de escribir mucho.', tipo:'warn'}
    ]},

  { icon:'📚', titulo:'Readers y controles de lectura', busca:'reader lectura libro capitulo control examen read along',
    sub:'Los libros graduados con actividades por capítulo, y el control de lectura de cada uno.',
    cuerpo:[
      'Entra por <b>Classes → tu grado → Readers</b>. Cada libro se lee <b>en tu nivel</b>: al abrirlo eliges A2, B1, B2 o C1 y el texto cambia de dificultad, no solo de tamaño.',
      {h:'Read along'},
      'Es la pantalla de lectura con audio. El tiempo que pasas ahí queda registrado y tu profesor lo ve: no da nota, pero es la prueba de que has leído.',
      {h:'El control del capítulo'},
      {lista:[
        'Se llega desde la tarjeta <b>📝 EXAMS</b> del selector de niveles del libro.',
        'Tu profesor lo <b>abre y lo cierra</b>. Si no está abierto, no puedes rendirlo.',
        'Mientras el control de un capítulo está abierto, <b>ese capítulo se cierra en la lectura</b>, y en todos los niveles del libro. Al cerrarse el control, la lectura vuelve sola.'
      ]},
      {h:'📊 My reading report'},
      'En Readers tienes tu informe: la nota de cada capítulo, tu tiempo de lectura y tu nota general. La nota del capítulo es la de tu <b>mejor intento</b>.'
    ]},

  { icon:'📋', titulo:'Exámenes de unidad', busca:'examen unidad unit exam practica oficial writing listening',
    sub:'El examen de tu unidad con su reader, en tu nivel, en versión de práctica y en versión oficial.',
    cuerpo:[
      'Se entra por <b>Classes → tu grado → 📋 Unit Exams</b>. Lo primero que ves es una tarjeta por <b>bloque de unidades</b> (1 y 2, 3 y 4, 5 y 6). Los bloques que todavía no tienen examen aparecen apagados.',
      {lista:[
        '<b>Práctica</b> — para entrenar. Puedes rendirla cuando tu profesor la abra.',
        '<b>Oficial</b> — la que cuenta. Se abre solo el día que corresponde.'
      ]},
      'Tiene siete partes: multiple choice, true/false, word formation, key word transformations, word order, listening y writing. Las seis primeras te dan la nota al instante en la escala AD·A·B·C.',
      {nota:'El <b>writing no se corrige solo</b>: lo lee y lo califica tu profesor, y te llega su comentario.'},
      {nota:'Si el examen no está abierto para ti, no aparece su contenido. No es un fallo de la página: es que tu profesor todavía no lo ha abierto.', tipo:'warn'}
    ]},

  { icon:'📊', titulo:'Mi progreso y mi resultado final', busca:'progreso notas resultados historial cefr nivel final reporte padres',
    cuerpo:[
      {h:'📊 My Progress (en la barra)'},
      'Todos tus exámenes y prácticas: qué rendiste, cuándo, con qué puntaje y en qué partes estuviste más fuerte o más flojo.',
      {h:'🏅 Resultado final (English → My results)'},
      'Tu nivel CEFR final del año y el reporte que recibe tu familia, con su PDF para descargar.'
    ]},

  { icon:'👤', titulo:'Mi cuenta y mi contraseña', busca:'contraseña cambiar cuenta password seguridad',
    cuerpo:[
      {pasos:[
        'Entra en <b>👤 Mi cuenta</b>.',
        'Escribe la contraseña nueva dos veces (mínimo 8 caracteres).',
        'Pulsa <b>Guardar nueva contraseña</b>. El cambio es inmediato.'
      ]},
      {nota:'Elige una frase corta que recuerdes, con letras y números. <b>No compartas tu contraseña con nadie</b>, tampoco con un compañero: lo que se haga con tu cuenta queda registrado a tu nombre.', tipo:'warn'}
    ]},

  { icon:'🔒', titulo:'Por qué no veo algo que sí tiene un compañero', busca:'candado bloqueado locked no veo falta no aparece',
    cuerpo:[
      'Cuando una tarjeta sale con un <b>candado 🔒</b>, existe pero todavía no está abierta para tu grado o para ti. Se abre por tres motivos distintos:',
      {lista:[
        'Tu profesor <b>aún no la ha activado</b> (es lo más frecuente: el material se abre cuando la clase llega ahí).',
        'La actividad es de <b>otro grado</b> o de otro nivel.',
        'Es un <b>examen</b>, y los exámenes se abren solo durante su ventana.'
      ]},
      'Si crees que debería estar abierta, díselo a tu profesor: lo abre él desde su panel, en el momento.'
    ]},

  { icon:'🆘', titulo:'Si algo no funciona', busca:'problema error fallo no carga no guarda lento ayuda soporte',
    cuerpo:[
      {tabla:{cols:['Lo que ves','Qué hacer'],filas:[
        ['La página se ve como antes del cambio','Pulsa <kbd>Ctrl</kbd>+<kbd>F5</kbd> (en Mac <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>) para que el navegador traiga la versión nueva.'],
        ['«Tu sesión expiró» al recargar','Cierra todas las pestañas del portal, abre una sola y vuelve a entrar.'],
        ['No guarda mi trabajo','Comprueba que arriba aparece tu nombre. Sin sesión, la actividad solo guarda en ese equipo y te lo avisa en la barra.'],
        ['No puedo abrir un examen','Está cerrado. Solo lo abre tu profesor.'],
        ['El audio no suena','Sube el volumen del equipo y prueba con auriculares. Si sigue sin sonar, avisa al profesor: puede darte la hoja en papel.'],
        ['Nada de lo anterior','Escribe a tu profesor o a <b>pbaca@nordic-school.edu.pe</b> contando en qué pantalla estabas.']
      ]}}
    ]}
]},

/* ──────────────────────────── PROFESOR ──────────────────────────── */
teacher: { secciones: [

  { icon:'🧭', titulo:'Tu panel, grupo por grupo', busca:'menu grupos barra lateral panel donde esta navegacion',
    sub:'La barra va por grupos que se pliegan. El criterio es qué vas a HACER, no qué es cada cosa.',
    cuerpo:[
      {tabla:{cols:['Grupo','Para qué es','Qué hay dentro'],filas:[
        ['👥 Alumnos','Suelto arriba: es por donde se entra casi siempre.','Tus alumnos, su ficha y su avance.'],
        ['✅ Corrección','Lo que espera una nota tuya, o lo que hay que abrir para que se pueda entregar.','Productos de unidad · Corregir fichas · Exámenes de unidad · Controles de lectura · Fun for Nordic'],
        ['📈 Seguimiento','Solo se mira. No se toca nada.','Resultados · Resultado final · Tiempo de pantalla · Honestidad'],
        ['🏫 Clases','Dar clase: la materia, la secuencia, el material y tus herramientas.','Classes · French · Scope &amp; Sequence · Materiales de clase · Little Readers · Pizarra · Corrector de material'],
        ['🧸 Cursos Nordic','Los cursos propios del colegio.','Starters · Movers · Flyers · Cap sur le français'],
        ['🎓 Cambridge','El examen oficial: sus apps y el candado que abre las prácticas.','YLE + Main Suite · Panel YLE · Simulacros y Practice · Use of English · Info Cambridge · Abrir Practice Tests'],
        ['🎮 Actividades','Lo que usan tus alumnos, para que lo veas antes de mandarlo.','Games Lab · NIShoot Live · MUN Academy · Phonics · Pronunciación'],
        ['🔐 Permisos','Lo que abres y cierras por grado.','Activar unidades · Unidades por grado']
      ]}},
      {nota:'<b>Solo ves los grupos para los que tienes acceso.</b> Un grupo sin pestañas no se pinta. Si te falta algo que necesitas, pídeselo a coordinación: los accesos los da el administrador.'},
      {nota:'El grupo donde está la pestaña abierta se despliega solo; el resto se queda como lo dejaste la última vez. Si no encuentras una pestaña, <b>abre las cabeceras</b>: nacen plegadas.', tipo:'warn'}
    ]},

  { icon:'✅', titulo:'Corregir: las cinco pantallas', busca:'corregir calificar nota rubrica entregas fichas productos',
    sub:'Todo lo que espera nota tuya está en este grupo, y en ningún otro sitio.',
    cuerpo:[
      {h:'🎯 Productos de unidad'},
      'El producto final de cada unidad. Arriba va el <b>avance por criterio</b> y debajo la nota. Aquí también marcas un trabajo para que salga en la <b>galería de la unidad</b>, con una casilla.',
      {h:'✅ Corregir fichas'},
      {pasos:[
        'Elige grado, unidad, semana y sesión.',
        'Ves quién entregó y cuántos faltan.',
        'Al abrir a un alumno tienes sus respuestas a la izquierda y la <b>rúbrica a la derecha</b>, con un botón por puntuación.',
        'La nota se suma sola. <b>Guardar y siguiente</b> encadena alumnos sin volver a la lista.'
      ]},
      {nota:'La rúbrica se define <b>una vez por sesión</b> y se aplica a los cuatro niveles: el criterio es el mismo, lo que cambia es la exigencia.'},
      {h:'📋 Exámenes de unidad'},
      'Se entra por una tarjeta por <b>bloque de unidades</b> (1 y 2, 3 y 4, 5 y 6). Dentro, una fila por examen y otra por nivel, con el botón 🔓/🔒 para abrir y cerrar. Puedes abrir para todos, para un grado, para un salón o para un alumno concreto: <b>gana siempre el alcance más específico</b>.',
      {lista:[
        'Las seis primeras partes se corrigen solas, en la escala AD·A·B·C.',
        'El <b>writing lo calificas tú</b>: aparece en la cola de producciones escritas.',
        'Cada nivel trae los botones <b>🖨️ Papel · 🔑 Clave · 🎧 Guion</b> para dar el examen impreso. La clave y el guion no se le sirven a una cuenta de alumno.'
      ]},
      {h:'📖 Controles de lectura'},
      'Abres y cierras el control de cada capítulo de cada reader. <b>Mientras el control está abierto, ese capítulo se cierra en la lectura</b> y en todos los niveles del libro, para que nadie lo responda leyendo. Al cerrarlo, la lectura vuelve sola.',
      'Tiene tres pestañas: las notas por capítulo, el detalle por alumno y el <b>tiempo de lectura</b> por semana. Los que no han leído nada salen igual, en gris: son la mitad de la información.',
      {h:'🧸 Fun for Nordic'},
      'Las entregas de los tres cursos de primaria, con pastillas para filtrar por nivel (Starters, Movers, Flyers).'
    ]},

  { icon:'📈', titulo:'Seguimiento: mirar sin tocar', busca:'resultados estadisticas tiempo pantalla honestidad cefr',
    cuerpo:[
      {lista:[
        '<b>📝 Resultados</b> — todos los intentos de tus alumnos: mocks, prácticas y actividades, con el desglose por parte.',
        '<b>🎓 Resultado final</b> — el nivel CEFR final de cada alumno y el reporte para la familia.',
        '<b>⏱️ Tiempo de pantalla</b> — minutos por alumno y semana.',
        '<b>🛡️ Honestidad</b> — los avisos del sistema anti-trampa.'
      ]},
      {nota:'El tiempo de pantalla mide el tiempo <b>registrado</b>: es un suelo, no cuenta la página abierta sin actividad. Cada sesión se acota a 120 minutos porque algunas quedan abiertas. Los dos avisos están escritos en la propia pantalla.'}
    ]},

  { icon:'🏫', titulo:'Clases: material y herramientas', busca:'materiales fichas diapositivas subir scope secuencia pizarra corrector',
    cuerpo:[
      {h:'📄 Materiales de clase — subir tus fichas'},
      {pasos:[
        'Entra en <b>Clases → Materiales de clase</b>.',
        'Arrastra los archivos. <b>La ruta sale del nombre</b>: <code>u4w1s1-worksheet-a2.pdf</code> va solo a 9.º / unidad 4 / semana 1.',
        'Cabe una unidad entera de una vez.'
      ]},
      {nota:'Puedes subir, pero <b>borrar solo puede el administrador</b>. Si subiste algo mal, avisa a coordinación.', tipo:'warn'},
      {h:'📚 Scope &amp; Sequence'},
      'La secuencia oficial del año: qué nivel le toca a cada grado y en qué orden.',
      {h:'🧒 Little Readers'},
      'Los libros de los más pequeños, para consulta.',
      {h:'📝 Pizarra y ✍️ Corrector de material'},
      'La pizarra para explicar en clase, y el corrector para revisar el material que preparas antes de repartirlo.'
    ]},

  { icon:'🎓', titulo:'Cambridge', busca:'cambridge yle mocks practice simulacros use of english info',
    cuerpo:[
      {lista:[
        '<b>🎓 YLE + Main Suite</b> — el mapa que ven tus alumnos: las dos ramas y sus niveles.',
        '<b>🛡️ Panel YLE</b> — el seguimiento de los exámenes de Young Learners de tus grados.',
        '<b>🎧 Simulacros y Practice</b> — abre los exámenes en formato Cambridge (sale del portal, a la sección de simulacros).',
        '<b>🧩 Use of English</b> — la app de Part 1 del B2 First.',
        '<b>📘 Info Cambridge</b> — qué es cada examen, cuántas partes tiene, cuánto dura y cómo se puntúa. Para responder a las familias.',
        '<b>🔓 Abrir Practice Tests</b> — el candado: qué grado puede rendir las prácticas.'
      ]},
      {nota:'Las entradas que empiezan por <b>🔓 Abrir</b> no son la actividad: son el permiso. Abren o cierran el acceso de un grado.'}
    ]},

  { icon:'🔐', titulo:'Lo que puedes abrir y cerrar', busca:'permisos activar unidades abrir candado acceso grado',
    cuerpo:[
      {lista:[
        '<b>📚 Activar unidades</b> — qué unidades ve cada grado.',
        '<b>🔐 Unidades por grado</b> — qué parte de los cursos Fun for Nordic ve cada grado.',
        '<b>📋 Exámenes de unidad</b> y <b>📖 Controles de lectura</b> (en Corrección) — abren y cierran cada examen.',
        '<b>🔓 Abrir Practice Tests</b> (en Cambridge).'
      ]},
      {nota:'Estas pestañas solo aparecen si tienes grados asignados. Si no las ves, es que coordinación todavía no te ha asignado ninguno.', tipo:'warn'}
    ]},

  { icon:'❗', titulo:'Lo que solo puede el administrador', busca:'no puedo permisos crear usuario borrar admin coordinacion',
    cuerpo:[
      {lista:[
        'Crear, editar, suspender o eliminar cuentas de alumnos y profesores.',
        'Dar accesos a otro profesor.',
        'Borrar material ya subido al bucket de clase.',
        'Abrir los Mocks (los simulacros oficiales).',
        'Ver las estadísticas globales del colegio.'
      ]},
      'Todo eso se pide a coordinación: <b>pbaca@nordic-school.edu.pe</b>.'
    ]}
]},

/* ─────────────────────────── ADMINISTRADOR ─────────────────────────── */
admin: { secciones: [

  { icon:'🧭', titulo:'El panel, grupo por grupo', busca:'menu grupos admin panel navegacion donde esta',
    sub:'Nueve grupos y el Resumen suelto arriba. El profesor ve estos mismos grupos, con menos pestañas dentro.',
    cuerpo:[
      {tabla:{cols:['Grupo','Qué hay dentro'],filas:[
        ['📊 Resumen','La portada: cuántos alumnos, cuántos profesores y la actividad reciente.'],
        ['👥 Personas','Usuarios · Profesores'],
        ['✅ Corrección','Productos de unidad · Corregir fichas · Exámenes de unidad · Controles de lectura · Fun for Nordic'],
        ['📈 Seguimiento','Estadísticas · Resultados · Resultado final · Tiempo de pantalla · Honestidad'],
        ['🏫 Clases','Classes · French · Scope &amp; Sequence · Materiales de clase · Little Readers · Pizarra · Corrector de material · Library'],
        ['🧸 Cursos Nordic','Starters · Movers · Flyers · Cap sur le français'],
        ['🎓 Cambridge','YLE + Main Suite · Panel YLE · Plan de estudio · Simulacros y Practice · Use of English · Info Cambridge · Abrir Mocks · Abrir Practice Tests'],
        ['🎮 Actividades','Games Lab · NIShoot Live · MUN Academy · Phonics · Pronunciación'],
        ['🔐 Permisos','Accesos · Activar unidades · Unidades por grado']
      ]}},
      {nota:'El criterio del reparto: <b>Corrección</b> es lo que espera una nota o hay que abrir para que se entregue; <b>Seguimiento</b> es lo que solo se mira; <b>Permisos</b> es lo que se abre y se cierra por grado.'}
    ]},

  { icon:'👥', titulo:'Personas: crear cuentas y dar accesos', busca:'usuario crear alumno profesor contraseña demo suspender eliminar',
    cuerpo:[
      {h:'👥 Usuarios'},
      'Están <b>todos</b>: alumnos, profesores, administradores y cuentas de demostración. Los filtros son una fila de botones con el recuento de cada tipo (Todos · Alumnos · Profesores · Admins · Demos) más grado, sección y año académico.',
      {tabla:{cols:['Botón de la fila','Qué hace'],filas:[
        ['👁️ Ver como','Abre el portal <b>tal como lo ve ese alumno</b>, con sus candados. Una barra arriba recuerda quién está realmente dentro.'],
        ['🔧 Accesos','Abre o cierra actividades <b>para ese alumno concreto</b>, por encima de lo que tenga su grado.'],
        ['🔑 Restablecer','Asigna una contraseña temporal nueva. Es lo que se hace cuando un alumno no puede entrar.'],
        ['Editar','Nombre, grado, sección, nivel CEFR y la casilla 🧪 <b>demo</b>.'],
        ['Eliminar','Borra la cuenta. No tiene vuelta atrás.']
      ]}},
      {nota:'<b>«Demo» no es un rol.</b> Los roles siguen siendo alumno, profesor y administrador; demo es una casilla aparte para las cuentas de prueba. Márcala en Editar, después de crear la cuenta.'},
      {nota:'En <b>Ver como</b> no se puede cambiar la contraseña del alumno: es deliberado. Para eso está 🔑 Restablecer.', tipo:'warn'},
      {h:'👨‍🏫 Profesores'},
      'Aquí se decide qué ve cada profesor: <b>Resultados</b>, <b>Alumnos</b> y los grados que tiene asignados. Un profesor sin nada asignado entra al portal y solo lee «El administrador aún no te ha asignado accesos».',
      {nota:'Al crear una pestaña o un grado nuevos, <b>los profesores ya configurados no los reciben solos</b>: hay que asignárselos.', tipo:'warn'}
    ]},

  { icon:'🔐', titulo:'Cómo funcionan los accesos', busca:'accesos nodos candado grado alumno permisos matriz abrir cerrar',
    sub:'Tres niveles, y gana siempre el más específico.',
    cuerpo:[
      {tabla:{cols:['Nivel','Dónde se toca','Para qué'],filas:[
        ['Por grado','🔐 Permisos → 🔐 Accesos','La matriz grado × actividad. Es el nivel normal: se abre una actividad para todo un grado.'],
        ['Por alumno','👥 Usuarios → 🔧 Accesos','Abre o cierra algo para una sola persona, por encima de su grado.'],
        ['Por examen','✅ Corrección → Exámenes de unidad / Controles de lectura','Ventanas de examen, con alcance todos → grado → salón → alumno.']
      ]}},
      {lista:[
        '<b>Sin fila = cerrado</b> en los exámenes. Si nadie lo abrió, nadie puede rendirlo.',
        'Lo que ya existía nace <b>abierto</b>; lo que se añade nuevo nace <b>cerrado</b> hasta que se habilita.',
        'El administrador ve todo siempre, aunque esté cerrado: es la vista previa.'
      ]},
      {h:'Las otras dos puertas'},
      {lista:[
        '<b>📚 Activar unidades</b> — qué unidades ofrece cada grado.',
        '<b>🔐 Unidades por grado</b> — qué parte de los cursos Fun for Nordic ve cada grado.'
      ]}
    ]},

  { icon:'📈', titulo:'Seguimiento y estadísticas', busca:'estadisticas resultados proyeccion diciembre tiempo pantalla honestidad',
    cuerpo:[
      {lista:[
        '<b>📈 Estadísticas</b> — el avance del colegio con su gráfico y la proyección a diciembre.',
        '<b>📝 Resultados</b> — todos los intentos, filtrables por grado, sección y año.',
        '<b>🎓 Resultado final</b> — el nivel CEFR final y los reportes para las familias.',
        '<b>⏱️ Tiempo de pantalla</b> — la respuesta con datos a la pregunta de cuánto tiempo pasan los alumnos en la tablet.',
        '<b>🛡️ Honestidad</b> — los avisos del anti-trampa.'
      ]},
      {nota:'Los recuentos del Resumen <b>incluyen las cuentas demo</b>. Para contar alumnos reales, filtra en Usuarios.', tipo:'warn'}
    ]},

  { icon:'🎓', titulo:'Cambridge y el plan de estudio', busca:'cambridge mocks practice yle plan estudio fecha examen',
    cuerpo:[
      {lista:[
        '<b>🎓 YLE + Main Suite</b> — el mapa que ven alumnos y profesores.',
        '<b>🛡️ Panel YLE</b> — el seguimiento de Young Learners de todos los grados.',
        '<b>📋 Plan de estudio</b> — la fecha del examen oficial y las indicaciones que aparecen en la pantalla de Cambridge del alumno, por grado o por alumno.',
        '<b>🎧 Simulacros y Practice</b> — la sección de simulacros (sale del portal).',
        '<b>🔓 Abrir Mocks</b> y <b>🔓 Abrir Practice Tests</b> — los dos candados.'
      ]},
      {nota:'Lo que escribas en el plan de estudio lo lee el alumno en su pantalla de Cambridge, arriba del todo. Es el sitio para avisar de una fecha o dar una instrucción de trimestre.'}
    ]},

  { icon:'🧪', titulo:'Comprobar un cambio antes de anunciarlo', busca:'probar verificar demo pruebas alumno vista previa cache',
    cuerpo:[
      {pasos:[
        'Usa una <b>cuenta demo</b>, nunca la primera fila de alumno que aparezca: lo que hagas queda en su expediente.',
        'O entra por <b>👥 Usuarios → 👁️ Ver como</b>, que no escribe nada.',
        'Si la pantalla se ve como antes, pulsa <kbd>Ctrl</kbd>+<kbd>F5</kbd>: el navegador guarda la versión anterior.'
      ]},
      {nota:'Marca las cuentas de prueba con la casilla 🧪 <b>demo</b> en Editar. Así se distinguen de las reales en cualquier listado.'}
    ]},

  { icon:'🆘', titulo:'Lo que más preguntan', busca:'problema frecuente no entra no ve error soporte duda',
    cuerpo:[
      {tabla:{cols:['El caso','La respuesta'],filas:[
        ['«Un alumno no puede entrar»','👥 Usuarios → busca su nombre → 🔑 Restablecer. Comprueba también que la cuenta no esté suspendida.'],
        ['«Un profesor no ve nada»','👨‍🏫 Profesores: no tiene Resultados ni Alumnos asignados, o no tiene grados.'],
        ['«Mis alumnos no ven la actividad»','🔐 Accesos: esa actividad está cerrada para su grado. Lo nuevo nace cerrado.'],
        ['«El examen no les aparece»','Sin fila de apertura, el examen está cerrado. Ábrelo en ✅ Corrección → Exámenes de unidad.'],
        ['«Se ve la versión de ayer»','<kbd>Ctrl</kbd>+<kbd>F5</kbd> en esa página.'],
        ['«¿Cuántos alumnos hay de verdad?»','El Resumen incluye las cuentas demo. Filtra en 👥 Usuarios.']
      ]}}
    ]}
]}

};
