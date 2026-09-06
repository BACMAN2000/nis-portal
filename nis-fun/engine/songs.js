/* La pantalla de canción — Fun for Nordic.
 *
 * Cada unidad tiene dos piezas hechas con su propio vocabulario: un *chant*,
 * que es un ejercicio hablado de pregunta y respuesta, y una *canción*. Aquí
 * se oyen con la letra delante, que es la mitad del ejercicio: un niño de
 * siete años canta lo que ve escrito, y así lee sin darse cuenta.
 *
 * Dos decisiones deliberadas:
 *
 * - **No se resalta la línea que suena.** No hay marcas de tiempo de cada
 *   verso, así que un resaltado sería inventado: iría por su cuenta y el niño
 *   aprendería a desconfiar de él. Mejor la letra quieta y bien grande.
 * - **La unidad sin mp3 no tiene pantalla.** `SONGS.para()` devuelve null y el
 *   motor no la añade. Ofrecer un botón de reproducir que no suena es peor que
 *   no ofrecer nada ([[nada-incompleto-en-vivo]]).
 *
 * Uso:  await SONGS.para(nivel, numeroUnidad)  ->  {titulo, html, alMostrar} o null
 */
window.SONGS = (function () {

  const T = window.T || ((en) => en);
  const cache = {};

  async function datos(nivel) {
    if (cache[nivel] !== undefined) return cache[nivel];
    try {
      const r = await fetch(`../content/songs-${nivel}.json?v=${window.CONTENT_V || 1}`);
      cache[nivel] = r.ok ? (await r.json()).unidades : null;
    } catch (e) { cache[nivel] = null; }
    return cache[nivel];
  }

  /* La letra viene con las marcas de Suno: [Verse 1], [Chorus], [Leader],
     [Kids]. Al alumno no le dicen nada en inglés técnico, pero SÍ le importa
     saber quién canta cada trozo — el chant es a dos voces y hay que saber
     cuándo te toca. Así que se traducen a algo que se entiende y el estribillo
     se marca, porque es lo que se canta en grupo. */
  const ETIQUETAS = {
    'leader': () => T('Teacher', 'Le professeur'),
    'kids':   () => T('Everybody', 'Tout le monde'),
    'all':    () => T('Everybody', 'Tout le monde'),
    'chorus': () => T('Chorus', 'Refrain'),
    'bridge': () => T('Middle', 'Pont'),
  };

  function etiqueta(bruta) {
    const s = bruta.toLowerCase();
    for (const k in ETIQUETAS) if (s.indexOf(k) === 0) return ETIQUETAS[k]();
    const v = s.match(/^verse\s*(\d+)/);
    if (v) return T('Verse ', 'Couplet ') + v[1];
    return bruta;
  }

  function esCoro(bruta) {
    const s = bruta.toLowerCase();
    return s.indexOf('chorus') === 0 || s.indexOf('all') === 0;
  }

  function letraHTML(letra) {
    const bloques = [];
    let actual = null;
    letra.split('\n').forEach(linea => {
      const m = linea.match(/^\[([^\]]+)\]/);
      if (m) {
        actual = { et: etiqueta(m[1]), coro: esCoro(m[1]), lineas: [] };
        bloques.push(actual);
      } else if (linea.trim()) {
        if (!actual) { actual = { et: '', coro: false, lineas: [] }; bloques.push(actual); }
        actual.lineas.push(linea.trim());
      }
    });
    return bloques.map(b => `<div class="sg-bl${b.coro ? ' coro' : ''}">
      ${b.et ? `<span class="sg-et">${esc(b.et)}</span>` : ''}
      ${b.lineas.map(l => `<p>${esc(l)}</p>`).join('')}</div>`).join('');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  const CSS = `
  .sg{max-width:44rem;margin-inline:auto;text-align:left}
  .sg-tabs{display:flex;gap:.5rem;justify-content:center;margin-bottom:.9rem}
  .sg-tab{background:var(--surface2);color:var(--ink);border:1px solid var(--line);
    border-radius:999px;padding:.4rem 1.1rem;font-family:"Baloo 2",sans-serif;
    font-weight:800;font-size:1rem;cursor:pointer;min-height:2.4rem}
  .sg-tab.on{background:var(--accent);color:#fff;border-color:var(--accent)}
  .sg-tit{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:1.25rem;
    text-align:center;margin:.2rem 0 .7rem}
  .sg-btns{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;justify-content:center}
  .sg-b{background:var(--surface2);color:var(--ink);border:1px solid var(--line);
    border-radius:999px;padding:.4rem .95rem;font-family:"Baloo 2",sans-serif;
    font-weight:700;font-size:.95rem;cursor:pointer;min-height:2.3rem}
  .sg-b.main{background:var(--accent);color:#fff;border-color:var(--accent)}
  .sg-b.on{background:var(--ok);color:#fff;border-color:var(--ok)}
  .sg-bar{margin:.7rem 0 .3rem;height:.7rem;background:var(--surface2);cursor:pointer;
    border:1px solid var(--line);border-radius:999px;overflow:hidden}
  .sg-fill{height:100%;width:0;background:var(--accent);border-radius:999px}
  .sg-reloj{display:block;text-align:center;color:var(--soft);font-size:.85rem}
  .sg-letra{margin-top:1rem;font-size:1.15rem;line-height:1.7}
  .sg-bl{margin:0 0 .9rem}
  .sg-bl p{margin:0}
  /* el estribillo se ve distinto porque es lo que canta toda la clase */
  .sg-bl.coro{background:var(--surface2);border-left:.35rem solid var(--accent);
    border-radius:.5rem;padding:.55rem .8rem}
  .sg-et{display:block;font-family:"Baloo 2",sans-serif;font-weight:800;
    color:var(--soft);font-size:.85rem;text-transform:uppercase;letter-spacing:.03em}
  @media (max-width:560px){ .sg-b{flex:1 1 auto;justify-content:center}
    .sg-letra{font-size:1.05rem} }`;

  function reloj(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  async function para(nivel, numero) {
    const u = await datos(nivel);
    if (!u) return null;
    const n = String(numero).padStart(2, '0');
    const p = u[n];
    if (!p) return null;

    const piezas = [];
    if (p.chant)   piezas.push({ k: 'chant',   et: T('Chant', 'Comptine'), d: p.chant });
    if (p.cancion) piezas.push({ k: 'cancion', et: T('Song', 'Chanson'),   d: p.cancion });
    if (!piezas.length) return null;

    const html = `<style>${CSS}</style><div class="scr-centro"><div class="sg">
      ${piezas.length > 1 ? `<div class="sg-tabs" role="tablist">${piezas.map((x, i) =>
        `<button class="sg-tab${i ? '' : ' on'}" role="tab" data-k="${i}"
           aria-selected="${i ? 'false' : 'true'}">${x.et}</button>`).join('')}</div>` : ''}
      <audio class="sg-audio" preload="none"></audio>
      <h3 class="sg-tit"></h3>
      <div class="sg-btns">
        <button class="sg-b main sg-play" type="button">&#9654; ${T('Play', 'Lire')}</button>
        <button class="sg-b sg-stop" type="button">&#9209; ${T('Start again', 'Recommencer')}</button>
        <button class="sg-b sg-slow" type="button" aria-pressed="false">&#128034; ${T('Slow', 'Lent')}</button>
      </div>
      <div class="sg-bar"><div class="sg-fill"></div></div>
      <span class="sg-reloj">0:00</span>
      <div class="sg-letra"></div>
    </div></div>`;

    function alMostrar(el) {
      const a = el.querySelector('.sg-audio');
      const tit = el.querySelector('.sg-tit');
      const letra = el.querySelector('.sg-letra');
      const play = el.querySelector('.sg-play');
      const fill = el.querySelector('.sg-fill');
      const bar = el.querySelector('.sg-bar');
      const rel = el.querySelector('.sg-reloj');
      const slow = el.querySelector('.sg-slow');
      let i = 0;

      function carga(k) {
        i = k;
        const x = piezas[k];
        tit.textContent = x.d.titulo;
        letra.innerHTML = letraHTML(x.d.letra);
        a.src = `../audio/songs/${x.d.archivo}?v=${window.AUDIO_V || 1}`;
        a.playbackRate = slow.getAttribute('aria-pressed') === 'true' ? 0.75 : 1;
        fill.style.width = '0';
        rel.textContent = '0:00';
        play.innerHTML = '&#9654; ' + T('Play', 'Lire');
        el.querySelectorAll('.sg-tab').forEach((b, j) => {
          b.classList.toggle('on', j === k);
          b.setAttribute('aria-selected', j === k ? 'true' : 'false');
        });
      }

      el.querySelectorAll('.sg-tab').forEach(b =>
        b.addEventListener('click', () => { a.pause(); carga(+b.dataset.k); }));

      play.addEventListener('click', () => {
        if (a.paused) { a.play().catch(() => {}); }
        else a.pause();
      });
      a.addEventListener('play', () => { play.innerHTML = '&#10073;&#10073; ' + T('Pause', 'Pause'); });
      a.addEventListener('pause', () => { play.innerHTML = '&#9654; ' + T('Play', 'Lire'); });
      a.addEventListener('ended', () => { fill.style.width = '100%'; });
      a.addEventListener('timeupdate', () => {
        if (!a.duration) return;
        fill.style.width = (a.currentTime / a.duration * 100) + '%';
        rel.textContent = reloj(a.currentTime) + ' / ' + reloj(a.duration);
      });
      // "empezar de nuevo" y no "parar": a esta edad lo que se quiere casi
      // siempre es volver al principio y cantarla otra vez
      el.querySelector('.sg-stop').addEventListener('click', () => {
        a.pause(); a.currentTime = 0; fill.style.width = '0';
        rel.textContent = '0:00 / ' + reloj(a.duration);
      });
      slow.addEventListener('click', () => {
        const on = slow.getAttribute('aria-pressed') !== 'true';
        slow.setAttribute('aria-pressed', on ? 'true' : 'false');
        slow.classList.toggle('on', on);
        a.playbackRate = on ? 0.75 : 1;
      });
      bar.addEventListener('click', e => {
        if (!a.duration) return;
        const r = bar.getBoundingClientRect();
        a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * a.duration;
      });

      carga(0);
    }

    return {
      titulo: piezas.length > 1
        ? T('Sing it!', 'On chante !')
        : piezas[0].et + ' — ' + piezas[0].d.titulo,
      html, alMostrar,
    };
  }

  return { para };
})();
