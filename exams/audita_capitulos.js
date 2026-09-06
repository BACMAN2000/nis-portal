/* Revision a fondo de los controles de lectura de unos capitulos concretos.

     node exams/audita_capitulos.js attwn 5 6 7
     node exams/audita_capitulos.js earnest 1 2

   audita_readers.js busca UNA cosa —respuestas que se leen en otra pregunta— en
   todos los capitulos. Esto es lo otro: mira a fondo los capitulos que se van a
   abrir, montando el examen con el motor de verdad y comprobando lo que un
   profesor querria saber antes de dejar entrar a su clase:

     · que el examen sale entero y con el mismo numero de preguntas siempre
     · que existe el mp3 de cada hueco (un hueco sin audio no se puede responder)
     · que la clave no cae siempre en la misma letra
     · que no hay opciones repetidas ni preguntas sin respuesta correcta
     · que cada pregunta trae su explicacion, que es lo que el alumno lee al
       corregir
     · que las frases de los huecos se entienden solas
     · y, otra vez, que ninguna respuesta escrita se lee en otra pregunta
*/
const fs = require('fs'), path = require('path'), vm = require('vm');

const RAIZ = path.dirname(__dirname);
const NIVELES = ['a2', 'b1', 'b2', 'c1'];
const VUELTAS = 40;
const LETRAS = 'ABCD';

function motor() {
  const html = fs.readFileSync(path.join(RAIZ, 'attwn-exam.html'), 'utf8');
  const tr = html.match(/<script>[\s\S]*?<\/script>/g) || [];
  let code = tr[tr.length - 1].replace(/^<script>/, '').replace(/<\/script>$/, '')
                              .replace(/\bboot\(\);?\s*$/, '');
  const noop = () => {};
  const sb = { console, setInterval: () => 0, clearInterval: noop, setTimeout: () => 0,
    clearTimeout: noop, alert: noop, confirm: () => true,
    fetch: () => Promise.resolve({ ok: false }),
    location: { hash: '', search: '', href: '' },
    document: { querySelector: () => null, querySelectorAll: () => [], createElement: () => ({}),
                head: { appendChild: noop }, body: {}, addEventListener: noop },
    Audio: function () { return { play: () => Promise.resolve(), pause: noop }; } };
  sb.window = sb; sb.addEventListener = noop;
  vm.createContext(sb); vm.runInContext(code, sb, { filename: 'attwn-exam.html' });
  return sb;
}

const limpia = s => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const visible = q => limpia(q.q) + ' ' + (q.opts || []).map(o => limpia(o.t)).join(' ');
/* La misma ruta que arma el motor: b1 cuelga de la raiz por historia. */
const carpetaAudio = (rid, lvl) => path.join(RAIZ, rid + '-audio', (rid === 'attwn' && lvl === 'b1') ? '' : lvl);

function revisa(sb, d, rid, lvl, ch) {
  const avisos = [], errores = [];
  const totales = new Set(), porTag = {};
  const letras = [0, 0, 0, 0];
  let mcs = 0;

  for (let v = 0; v < VUELTAS; v++) {
    const ex = sb.buildExam(d, ch, lvl, rid, []);
    totales.add(ex.length);

    ex.forEach(q => {
      porTag[q.tag] = (porTag[q.tag] || 0) + 1;

      if (!limpia(q.q)) errores.push('una pregunta ' + q.tag + ' sin enunciado');
      if (!q.ex) avisos.push('sin explicación al corregir: ' + q.tag);

      if (q.type === 'mc') {
        const buenas = (q.opts || []).filter(o => o.ok).length;
        if (buenas !== 1) errores.push(q.tag + ': ' + buenas + ' opciones correctas');
        const textos = (q.opts || []).map(o => limpia(o.t));
        if (new Set(textos).size !== textos.length) errores.push(q.tag + ': opciones repetidas');
        if (q.tag !== 'True / False') { letras[(q.opts || []).findIndex(o => o.ok)]++; mcs++; }
      }

      if (q.type === 'type') {
        if (!q.answer) errores.push(q.tag + ': hueco sin respuesta');
        if (q.tag === 'Listening') {
          if (!q.audio) errores.push('hueco de audio sin mp3 asignado');
          else {
            const f = path.join(RAIZ, q.audio);
            if (!fs.existsSync(f)) errores.push('falta el mp3 ' + q.audio);
          }
          const frase = limpia(q.q).replace(/^.*complete:\s*/i, '');
          if (frase.split(/\s+/).length < 5) avisos.push('frase de audio muy corta: "' + frase + '"');
          if (!/______/.test(frase)) errores.push('hueco de audio sin espacio para escribir');
        }
      }
    });

    // ninguna respuesta escrita puede leerse en otra pregunta
    ex.forEach(q => {
      if (q.type !== 'type' || !q.answer) return;
      const w = String(q.answer).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('\\b' + w + 's?\\b', 'i');
      ex.forEach(o => { if (o !== q && re.test(visible(o)))
        errores.push('"' + q.answer + '" (' + q.tag + ') se lee en ' + o.tag); });
    });
  }

  if (totales.size > 1) errores.push('el examen no siempre tiene el mismo número de preguntas: ' + [...totales]);

  // reparto de la clave entre A, B, C y D
  if (mcs) {
    const peor = Math.max(...letras), i = letras.indexOf(peor);
    if (peor / mcs > 0.4) avisos.push('la clave cae en la ' + LETRAS[i] + ' el ' +
      Math.round(peor * 100 / mcs) + ' % de las veces');
  }
  const uniq = a => [...new Set(a)];
  return { errores: uniq(errores), avisos: uniq(avisos), total: [...totales][0],
           partes: Object.keys(porTag).map(t => t + ' ' + Math.round(porTag[t] / VUELTAS)).join(' · ') };
}

function main() {
  const rid = process.argv[2] || 'attwn';
  const caps = process.argv.slice(3).map(Number).filter(Boolean);
  if (!caps.length) { console.log('uso: node exams/audita_capitulos.js <reader> <cap> [cap...]'); process.exit(1); }
  const sb = motor();
  let malos = 0;
  for (const lvl of NIVELES) {
    const f = path.join(RAIZ, rid + '-data-' + lvl + '.js');
    if (!fs.existsSync(f)) { console.log('--  %s · %s (sin datos)', rid, lvl.toUpperCase()); continue; }
    vm.runInContext(fs.readFileSync(f, 'utf8'), sb, { filename: path.basename(f) });
    const d = sb.window.ATTWN_DATA;
    for (const ch of caps) {
      if (ch > d.CHAPTERS.length) { console.log('--  cap. %d no existe en %s', ch, lvl.toUpperCase()); continue; }
      const r = revisa(sb, d, rid, lvl, ch);
      const t = d.CHAPTERS[ch - 1].title;
      console.log('%s %s · cap. %d «%s» — %d preguntas [%s]',
        r.errores.length ? 'MAL ' : 'OK  ', lvl.toUpperCase(), ch, t, r.total, r.partes);
      r.errores.forEach(x => console.log('       x  ' + x));
      r.avisos.forEach(x => console.log('       !  ' + x));
      malos += r.errores.length ? 1 : 0;
    }
  }
  console.log('\n%s', malos ? malos + ' examen(es) con errores.' : 'Los exámenes revisados están correctos.');
  process.exit(malos ? 1 : 0);
}

main();
