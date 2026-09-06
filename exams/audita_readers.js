/* Comprueba que en los controles de lectura la respuesta que el alumno tiene
   que ESCRIBIR no esta impresa en otra pregunta del mismo examen.

     node exams/audita_readers.js              todos los readers, 4 niveles
     node exams/audita_readers.js attwn b1     uno

   Es el fallo que se vio en los capitulos 2-4: el hueco del audio pedia una
   palabra, el alumno seguia sin saberla y mas adelante se encontraba
   «What does "SKULL" mean?», con la palabra impresa en el enunciado. Volvia
   atras y la copiaba sin haber escuchado nada. No era mala suerte: los huecos
   del listening y las preguntas de vocabulario salen del MISMO banco de doce
   palabras del capitulo.

   No reimplementa nada: carga attwn-exam.html y ejecuta SU buildExam, que es
   el que corre en el navegador del alumno. Un auditor con su propia copia de
   las reglas acaba auditando la copia.

   El motor baraja, asi que cada capitulo se monta muchas veces: una fuga que
   solo sale en una de cada veinte barajadas es igual de real para el alumno a
   quien le toca.  */
const fs = require('fs'), path = require('path'), vm = require('vm');

const RAIZ = path.dirname(__dirname);
/* Solo los tres que este motor conoce (su propio array READERS). Prince and
   the Pauper y Treasure Island no tienen control de lectura. */
const READERS = { attwn: 10, earnest: 9, tomsawyer: 8 };
const PREFIJO = { attwn: 'attwn-data-', earnest: 'earnest-data-', tomsawyer: 'tomsawyer-data-' };
const NIVELES = ['a2', 'b1', 'b2', 'c1'];
const VUELTAS = 25;

/* El motor, tal cual, en un contexto con lo minimo para que cargue. */
function motor() {
  const html = fs.readFileSync(path.join(RAIZ, 'attwn-exam.html'), 'utf8');
  const trozos = html.match(/<script>[\s\S]*?<\/script>/g) || [];
  let code = trozos[trozos.length - 1].replace(/^<script>/, '').replace(/<\/script>$/, '');
  code = code.replace(/\bboot\(\);?\s*$/, '');            // no arrancar la app
  const noop = () => {};
  const sandbox = {
    console, setInterval: () => 0, clearInterval: noop, setTimeout: () => 0, clearTimeout: noop,
    alert: noop, confirm: () => true, fetch: () => Promise.resolve({ ok: false }),
    location: { hash: '', search: '', href: '' },
    document: { querySelector: () => null, querySelectorAll: () => [], createElement: () => ({}),
                head: { appendChild: noop }, body: {}, addEventListener: noop },
    Audio: function () { return { play: () => Promise.resolve(), pause: noop }; },
  };
  sandbox.window = sandbox;
  sandbox.addEventListener = noop;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'attwn-exam.html' });
  return sandbox;
}

function datos(sandbox, reader, nivel) {
  const ruta = path.join(RAIZ, PREFIJO[reader] + nivel + '.js');
  if (!fs.existsSync(ruta)) return null;
  vm.runInContext(fs.readFileSync(ruta, 'utf8'), sandbox, { filename: path.basename(ruta) });
  return sandbox.window.ATTWN_DATA || null;      // los cinco usan el mismo nombre
}

const limpia = s => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ');
const visible = q => limpia(q.q) + ' ' + (q.opts || []).map(o => limpia(o.t)).join(' ');

function fugasDe(exam) {
  const out = [];
  exam.forEach(q => {
    if (q.type !== 'type' || !q.answer) return;
    const w = String(q.answer).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + w + 's?\\b', 'i');
    exam.forEach(otra => {
      if (otra === q) return;
      if (re.test(visible(otra))) out.push({ palabra: q.answer, pide: q.tag, regala: otra.tag });
    });
  });
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const readers = args[0] ? [args[0]] : Object.keys(READERS);
  const niveles = args[1] ? [args[1]] : NIVELES;
  const sb = motor();
  let capsMalos = 0, examenes = 0;
  for (const rid of readers) {
    for (const nivel of niveles) {
      const d = datos(sb, rid, nivel);
      if (!d) { console.log('--  %s · %s (sin datos)', rid, nivel.toUpperCase()); continue; }
      const malos = [];
      const caps = Math.min(READERS[rid], d.CHAPTERS.length);
      for (let ch = 1; ch <= caps; ch++) {
        let veces = 0, ejemplo = null;
        for (let v = 0; v < VUELTAS; v++) {
          const exam = sb.buildExam(d, ch, nivel, rid, []);
          examenes++;
          const f = fugasDe(exam);
          if (f.length) { veces++; ejemplo = ejemplo || f[0]; }
        }
        if (veces) malos.push({ ch, veces, ejemplo });
      }
      console.log('%s %s · %s', malos.length ? 'FUGA' : 'OK  ', rid, nivel.toUpperCase());
      malos.forEach(m => console.log('     x  cap. %s  %s/%d barajadas · "%s" se pide en %s y se lee en %s',
        String(m.ch).padEnd(2), String(m.veces).padStart(2), VUELTAS,
        m.ejemplo.palabra, m.ejemplo.pide, m.ejemplo.regala));
      capsMalos += malos.length;
    }
  }
  console.log('\n%d exámenes montados. %s', examenes,
    capsMalos ? capsMalos + ' capítulo(s) con fuga.' : 'Sin fugas.');
  process.exit(capsMalos ? 1 : 0);
}

main();
