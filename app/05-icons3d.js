/* ===================== ICONOS 3D DE LAS TARJETAS (19-sep-2026) =====================
   Las tarjetas del portal llevaban emojis, y un emoji se pinta distinto en cada
   sistema (el 🏫 de Windows no es el del iPad) y no parece de nadie. Paolo pidió
   iconos 3D «más profesionales» que describan cada tarjeta: el estilo elegido es
   3dicons (Vijay Verma, CC0, assets/icons3d/*.png), y solo dos de Fluent 3D
   (Microsoft, MIT): el dado de Games Lab y el globo de MUN.

   El icono se elige POR TÍTULO de tarjeta, no por emoji: así «My classes» y
   «Reading» —que compartían dibujo en la primera propuesta— van distintos
   (cuaderno / hoja de texto), y dentro de una misma parrilla no se repite
   ninguno. Lo que no está en la tabla (unidades, juegos de la semana, readers,
   grados) sigue con su emoji: son parrillas de contenido y mezclar 3D con emoji
   dentro de una misma fila se ve peor que dejarla entera en emoji.

   Uso: cardIcon(emoji, title[, px]) desde _hubCard/_trackCard/_lockedCard/
   _skillCard/_soonCard. Si le llega un SVG (camIcon de Cambridge) lo deja pasar. */
const ICON3D_DIR = 'assets/icons3d/';
const ICON3D = {
  // Home
  'My classes':'notebook', 'Cambridge':'medal', 'Practice tools':'tool', 'Library':'explorer',
  'MUN Academy':'globe', 'My progress':'chart', 'French':'flag',
  // English · áreas y herramientas
  'My unit':'bulb', 'My project':'puzzle', 'Classes':'notebook', 'Pronunciation':'mic', 'Phonics':'text',
  'Games Lab':'dice', 'Phrasal Verbs':'link', 'Collocations':'chat-bubble', 'Idioms':'chat-text',
  'Word Formation':'plus', 'NIS Dictionary':'zoom', 'NIShoot Live':'play',
  'Mocks':'medal', 'Practice Tests':'target', 'Practice tests':'target', 'Final result':'trophy',
  // Cambridge · puertas
  'Course':'notebook',
  // Un grado: sus tarjetas
  'Project':'puzzle', 'English sequence':'calender', 'Units':'target', 'Grammar':'pencil',
  'Activities':'dice', 'Readers':'bookmark-fav', 'Unit Exams':'tick',
  // Destrezas (B2 First, mocks y practice)
  'Listening':'headphone', 'Use of English':'puzzle', 'Reading':'file-text', 'Writing':'pencil',
  'Reading & Use of English':'file-text', 'Speaking':'mic',
  // Readers
  'Reader Exams':'tick', 'My reading report':'chart',
  // Juegos por nivel
  'Crosswords':'puzzle', 'Word Search':'zoom', 'Word Sudoku':'cube', 'Word Wheel':'setting',
  'Writing Tutor':'pencil', 'Exercises':'bulb', 'Memory':'card', 'Memory · Reported Speech':'chat-bubble',
  // Francés
  'CEFR':'bookmark-fav', 'Mots croisés':'puzzle', 'Mots mêlés':'zoom', 'Activités':'dice',
  // Biblioteca, etapas, aula de profesores
  'Open the Library':'explorer', 'Early Years':'star', 'Primary':'boy', 'Secondary':'rocket', 'Help':'bulb',
};
function ico3d(name, px){
  const s = px || 76;
  return `<img class="ico3d" src="${ICON3D_DIR}${name}.png" width="${s}" height="${s}" alt="" loading="lazy" decoding="async">`;
}
function cardIcon(emoji, title, px){
  if(typeof emoji === 'string' && emoji.trim().charAt(0) === '<') return emoji;   // ya es un SVG (camIcon)
  const key = ICON3D[String(title || '').replace(/<[^>]+>/g, '').trim()];
  return key ? ico3d(key, px) : (emoji || '');
}
