/*!
 * coh-player.js — el reproductor de audio de la casa (Cohasset + NIS)
 * v1 · 2026-09-09
 *
 * Por que existe: cada app se estaba inventando su propio boton de play, y el
 * alumno tenia que aprender un mando distinto en cada pantalla. Esto es lo
 * mismo que se hizo con el hueco pulsable de los examenes: un solo gesto en
 * toda la casa. Al disenar una app nueva NO se describe un reproductor: se
 * carga este archivo y se pone la caja.
 *
 * COMO SE USA
 * -----------
 *   <script src="../js/coh-player.js?v=1"></script>
 *
 *   1) Declarativo (lo normal). Al cargar la pagina se montan solas:
 *      <div class="coh-player" data-src="audio/news.mp3"
 *           data-label="Listen to the report"></div>
 *
 *   2) Por codigo, para pantallas que se repintan (motores tipo render()):
 *      CohPlayer.attach(el, {src:'audio/news.mp3', label:'Listen'});
 *      CohPlayer.scan(document.getElementById('main'));   // monta las nuevas
 *
 *   API que devuelve attach(): play() pause() stop() toggle()
 *                              setSrc(url) setRate(n) destroy()
 *   Opciones: src, label, rates (por defecto .75/1/1.25/1.5), rate, accent,
 *             compact (sin etiqueta ni velocidad), onEnd, onPlay.
 *   data-* equivalentes: data-src, data-label, data-rates="0.75,1,1.25",
 *             data-accent="#F5C542", data-compact.
 *
 * DECISIONES QUE NO CONVIENE DESHACER
 * -----------------------------------
 * - **Solo suena uno a la vez.** En el Team Sheet hay seis pistas; sin esto se
 *   pisan y el alumno no distingue cual esta oyendo.
 * - **La velocidad se recuerda** (localStorage coh_player_rate). Un alumno de
 *   A2 que necesita 0,75x lo necesita en todas las pistas, no en una.
 * - **Colores heredados**: fondo gris translucido y trazos en currentColor, asi
 *   el mismo archivo se ve bien sobre el portal claro y sobre una app oscura.
 *   El acento se puede fijar con data-accent.
 * - **preload="none"**: la duracion sale `--:--` hasta que se pulsa play. Es a
 *   proposito: en una pagina con seis pistas, precargarlas todas se lleva
 *   varios MB del movil del alumno para nada.
 *
 * Copias identicas (al tocarlo, copiar el archivo entero y subir el ?v=):
 *   cohasset-community/repo/js/coh-player.js
 *   nis-portal/coh-player.js
 */
(function () {
  'use strict';
  if (window.CohPlayer) return;

  var RATE_KEY = 'coh_player_rate';
  var DEFAULT_RATES = [0.75, 1, 1.25, 1.5];
  var sonando = null;             // el unico <audio> que puede estar sonando

  // ------------------------------------------------------------ estilos ---
  var CSS = '' +
  '.cohp{display:flex;align-items:center;gap:10px;flex-wrap:wrap;' +
        'background:rgba(127,127,127,.13);border:1px solid rgba(127,127,127,.28);' +
        'border-radius:12px;padding:9px 12px;font-family:inherit;font-size:14px;' +
        'color:inherit;max-width:100%;box-sizing:border-box}' +
  '.cohp button{font-family:inherit;color:inherit;background:rgba(127,127,127,.16);' +
        'border:1px solid rgba(127,127,127,.3);border-radius:9px;cursor:pointer;' +
        'padding:0;width:36px;height:36px;display:grid;place-items:center;' +
        'flex:0 0 auto;line-height:1;transition:filter .12s}' +
  '.cohp button:hover{filter:brightness(1.18)}' +
  '.cohp button:focus-visible{outline:2px solid var(--cohp-accent,currentColor);outline-offset:2px}' +
  '.cohp .cohp-main{background:var(--cohp-accent,rgba(127,127,127,.3));' +
        'border-color:transparent;width:40px;height:40px}' +
  '.cohp svg{width:15px;height:15px;fill:currentColor;display:block}' +
  '.cohp .cohp-main svg{width:17px;height:17px}' +
  '.cohp-lbl{font-weight:700;letter-spacing:.01em;white-space:nowrap;flex:0 1 auto;' +
        'overflow:hidden;text-overflow:ellipsis}' +
  '.cohp-bar{flex:1 1 130px;display:flex;align-items:center;gap:9px;min-width:120px}' +
  '.cohp-range{-webkit-appearance:none;appearance:none;width:100%;height:20px;' +
        'background:transparent;cursor:pointer;margin:0}' +
  '.cohp-range::-webkit-slider-runnable-track{height:6px;border-radius:99px;' +
        'background:linear-gradient(to right,var(--cohp-accent,currentColor) 0 var(--cohp-pct,0%),' +
        'rgba(127,127,127,.32) var(--cohp-pct,0%) 100%)}' +
  '.cohp-range::-moz-range-track{height:6px;border-radius:99px;background:rgba(127,127,127,.32)}' +
  '.cohp-range::-moz-range-progress{height:6px;border-radius:99px;background:var(--cohp-accent,currentColor)}' +
  '.cohp-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;' +
        'border-radius:50%;background:var(--cohp-accent,currentColor);margin-top:-4px;' +
        'border:2px solid rgba(255,255,255,.55)}' +
  '.cohp-range::-moz-range-thumb{width:14px;height:14px;border:2px solid rgba(255,255,255,.55);' +
        'border-radius:50%;background:var(--cohp-accent,currentColor)}' +
  '.cohp-t{font-variant-numeric:tabular-nums;font-size:12.5px;opacity:.75;white-space:nowrap;flex:0 0 auto}' +
  '.cohp-rate{width:auto;min-width:46px;padding:0 9px;font-size:12.5px;font-weight:800;height:36px}' +
  '.cohp[data-compact] .cohp-lbl{display:none}' +
  '@media(max-width:420px){.cohp-lbl{display:none}}';

  function estilos() {
    if (document.getElementById('cohp-css')) return;
    var s = document.createElement('style');
    s.id = 'cohp-css';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  // Iconos: trazos simples, en currentColor, sin dependencias de iconos.
  var ICO = {
    play:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zm7 0h4v15h-4z"/></svg>',
    stop:  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="5.5" width="13" height="13" rx="2"/></svg>'
  };

  function reloj(s) {
    if (!isFinite(s) || s < 0) return '--:--';
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function rateGuardado() {
    try { var v = parseFloat(localStorage.getItem(RATE_KEY)); return isFinite(v) && v > 0 ? v : 1; }
    catch (e) { return 1; }
  }
  function guardaRate(v) { try { localStorage.setItem(RATE_KEY, String(v)); } catch (e) {} }

  // -------------------------------------------------------------- attach ---
  function attach(host, opts) {
    if (!host) return null;
    opts = opts || {};
    estilos();
    if (host.__cohp) host.__cohp.destroy();

    var d = host.dataset || {};
    var src = opts.src || d.src || '';
    var label = opts.label != null ? opts.label : (d.label || '');
    var accent = opts.accent || d.accent || '';
    var compact = opts.compact != null ? opts.compact : ('compact' in d);
    var rates = opts.rates ||
      (d.rates ? d.rates.split(',').map(parseFloat).filter(function (x) { return x > 0; }) : null) ||
      DEFAULT_RATES;

    host.className = (host.className || '').replace(/\bcohp\b/g, '').trim();
    host.classList.add('cohp');
    if (compact) host.setAttribute('data-compact', '');
    if (accent) host.style.setProperty('--cohp-accent', accent);
    host.innerHTML = '';

    var au = new Audio();
    au.preload = 'none';
    au.src = src;

    function boton(cls, html, titulo) {
      var b = document.createElement('button');
      b.type = 'button';
      if (cls) b.className = cls;
      b.innerHTML = html;
      b.title = titulo;
      b.setAttribute('aria-label', titulo);
      return b;
    }
    var bPlay = boton('cohp-main', ICO.play, 'Play');
    var bStop = boton('', ICO.stop, 'Stop');

    var lbl = document.createElement('span');
    lbl.className = 'cohp-lbl';
    lbl.textContent = label;

    var barra = document.createElement('div');
    barra.className = 'cohp-bar';
    var range = document.createElement('input');
    range.type = 'range'; range.min = '0'; range.max = '1000'; range.value = '0';
    range.className = 'cohp-range';
    range.setAttribute('aria-label', 'Audio position');
    var t = document.createElement('span');
    t.className = 'cohp-t';
    t.textContent = '--:-- / --:--';
    barra.appendChild(range); barra.appendChild(t);

    var bRate = boton('cohp-rate', '', 'Speed');
    bRate.innerHTML = '';

    host.appendChild(bPlay);
    host.appendChild(bStop);
    if (label) host.appendChild(lbl);
    host.appendChild(barra);
    if (!compact) host.appendChild(bRate);

    var rate = rateGuardado();
    if (rates.indexOf(rate) === -1) rate = rates.indexOf(1) > -1 ? 1 : rates[0];
    function pintaRate() {
      au.playbackRate = rate;
      bRate.textContent = (rate === 1 ? '1' : String(rate)) + '×';
    }
    pintaRate();

    var arrastrando = false;
    function pintaBarra() {
      var dur = au.duration;
      if (isFinite(dur) && dur > 0) {
        if (!arrastrando) range.value = String(Math.round((au.currentTime / dur) * 1000));
        host.style.setProperty('--cohp-pct', (au.currentTime / dur * 100).toFixed(2) + '%');
      } else {
        host.style.setProperty('--cohp-pct', '0%');
      }
      t.textContent = reloj(au.currentTime) + ' / ' + reloj(dur);
    }
    function pintaPlay() {
      bPlay.innerHTML = au.paused ? ICO.play : ICO.pause;
      var tt = au.paused ? 'Play' : 'Pause';
      bPlay.title = tt; bPlay.setAttribute('aria-label', tt);
    }

    function play() {
      // Solo uno a la vez: si sonaba otro, se para.
      if (sonando && sonando !== au) { try { sonando.pause(); } catch (e) {} }
      sonando = au;
      au.playbackRate = rate;
      var p = au.play();
      if (p && p.catch) p.catch(function () {});
      if (opts.onPlay) opts.onPlay(api);
    }
    function pause() { au.pause(); }
    function stop() { au.pause(); au.currentTime = 0; pintaBarra(); }
    function toggle() { au.paused ? play() : pause(); }

    bPlay.onclick = toggle;
    bStop.onclick = stop;
    bRate.onclick = function () {
      rate = rates[(rates.indexOf(rate) + 1) % rates.length];
      guardaRate(rate); pintaRate();
    };
    range.addEventListener('input', function () {
      arrastrando = true;
      var dur = au.duration;
      if (isFinite(dur) && dur > 0) {
        au.currentTime = (parseInt(range.value, 10) / 1000) * dur;
        pintaBarra();
      }
    });
    range.addEventListener('change', function () { arrastrando = false; });

    au.addEventListener('loadedmetadata', pintaBarra);
    au.addEventListener('timeupdate', pintaBarra);
    au.addEventListener('play', pintaPlay);
    au.addEventListener('pause', pintaPlay);
    au.addEventListener('ended', function () {
      pintaPlay(); pintaBarra();
      if (opts.onEnd) opts.onEnd(api);
    });
    pintaPlay(); pintaBarra();

    var api = {
      el: host, audio: au,
      play: play, pause: pause, stop: stop, toggle: toggle,
      setSrc: function (u) { stop(); au.src = u; pintaBarra(); },
      setRate: function (n) { rate = n; guardaRate(n); pintaRate(); },
      destroy: function () {
        try { au.pause(); } catch (e) {}
        if (sonando === au) sonando = null;
        host.innerHTML = ''; host.__cohp = null;
      }
    };
    host.__cohp = api;
    return api;
  }

  // Monta todas las cajas que aun no tengan reproductor.
  function scan(root) {
    var cont = root || document;
    var lista = cont.querySelectorAll ? cont.querySelectorAll('.coh-player[data-src]') : [];
    for (var i = 0; i < lista.length; i++) {
      if (!lista[i].__cohp) attach(lista[i], {});
    }
    return lista.length;
  }

  window.CohPlayer = { attach: attach, scan: scan, version: 1 };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(document); });
  } else {
    scan(document);
  }
})();
