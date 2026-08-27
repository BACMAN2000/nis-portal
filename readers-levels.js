/* Que niveles ofrece cada reader — generado por _check_readers_audio.py.
 *
 * No se escribe a mano: a2/b1/b2/c1 entran solo si tienen su texto Y todo
 * el audio del read-along, para que el alumno no pueda elegir un nivel que
 * luego esta vacio o mudo — como pasaba con el B2 de Treasure Island.
 *
 * El C2 entra siempre: no es un nivel de lectura sino la pantalla de plan
 * del original, escrita para funcionar sin el texto dentro de la app.
 */
window.READER_LEVELS = {
  attwn: ['a2', 'b1', 'b2', 'c1', 'c2'],
  earnest: ['a2', 'b1', 'b2', 'c1', 'c2'],
  princepauper: ['a2', 'b1', 'b2', 'c1', 'c2'],
  tomsawyer: ['a2', 'b1', 'b2', 'c1', 'c2'],
  treasureisland: ['a2', 'b1', 'c1', 'c2']
};
