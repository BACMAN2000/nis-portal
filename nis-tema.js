/* ===== Claro u oscuro, y que se acuerde =====

   La paleta del portal vive en nis-tokens.css, que ya trae los dos temas. Esto
   es solo el interruptor: pone data-theme en el <html> y lo guarda.

   Tres estados, no dos. Quien no toca nada sigue al sistema —es la mayoría—;
   quien elige, manda sobre el sistema hasta que vuelva a elegir. Por eso el
   botón muestra a dónde te lleva, no dónde estás.

   El parpadeo se evita en el <head> de cada página con una línea que lee
   localStorage antes de pintar: si esperásemos a este archivo, la página
   saldría clara y se volvería oscura a la vista del usuario.                 */
(function () {
  'use strict';
  if (window.NISTema) return;
  var CLAVE = 'nis-tema';

  function guardado() {
    try { return localStorage.getItem(CLAVE) || ''; } catch (_) { return ''; }
  }
  function delSistema() {
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function actual() {
    return document.documentElement.getAttribute('data-theme') || delSistema();
  }
  function aplicar(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(CLAVE, t); } catch (_) {}
    pintarBoton();
  }
  function alternar() { aplicar(actual() === 'dark' ? 'light' : 'dark'); }

  var boton = null;
  function pintarBoton() {
    if (!boton) return;
    var oscuro = actual() === 'dark';
    boton.textContent = oscuro ? '☀' : '☾';
    boton.title = oscuro ? 'Switch to light mode' : 'Switch to dark mode';
    boton.setAttribute('aria-label', boton.title);
  }

  /* Donde cabe el boton, por orden de preferencia. La primera es la barra de
     las actividades; .app-header la pinta app.js en el portal, asi que puede
     no existir todavia cuando esto corre. */
  var BARRAS = ['.topnav', '.app-header', 'header .bar', 'header',
                '.bar', '.topbar', '.top', '.cx-bar', '.hdr', 'nav'];

  function buscaBarra() {
    for (var i = 0; i < BARRAS.length; i++) {
      var el = document.querySelector(BARRAS[i]);
      // una barra sirve si esta arriba y es ancha; si no, es cualquier otra cosa
      if (el && el.getBoundingClientRect().width > 200) return el;
    }
    return null;
  }

  var ESTILO_EN_BARRA = 'margin-left:8px;border:1px solid var(--line,#e9ecf3);' +
    'background:var(--card,#fff);color:var(--ink,#1e2433);border-radius:9px;' +
    'width:34px;height:34px;line-height:1;cursor:pointer;font-size:1rem;' +
    'flex:0 0 auto;padding:0';

  /* Sin barra donde meterlo -los readers, la pizarra, los juegos- va suelto en
     una esquina. Discreto y por encima de la pagina, pero por debajo de los
     modales; y fuera de la hoja al imprimir. */
  var ESTILO_SUELTO = 'position:fixed;z-index:400;' +
    'border:1px solid var(--line,#e9ecf3);background:var(--card,#fff);' +
    'color:var(--ink,#1e2433);border-radius:9px;width:34px;height:34px;' +
    'line-height:1;cursor:pointer;font-size:1rem;padding:0;opacity:.85;' +
    'box-shadow:0 2px 8px rgba(0,0,0,.18)';

  function crearBoton() {
    if (window.top !== window.self) return;          // dentro de un iframe, no
    if (boton) return;
    boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'nis-tema-btn';
    boton.addEventListener('click', alternar);
    if (!document.getElementById('nis-tema-estilo')) {
      var st = document.createElement('style');
      st.id = 'nis-tema-estilo';
      st.textContent = '@media print{.nis-tema-btn{display:none!important}}' +
                       '.nis-tema-btn:hover{opacity:1}' +
                       '.nis-tema-btn:focus-visible{outline:3px solid var(--accent,#3b5bdb);outline-offset:2px}';
      document.head.appendChild(st);
    }
    colocar();
    pintarBoton();
  }

  /* Las cuatro esquinas, por orden. La pizarra y los juegos tienen sus propias
     barras arriba y abajo, asi que el sitio de siempre puede estar ocupado. */
  var ESQUINAS = ['top:10px;right:10px', 'bottom:10px;right:10px',
                  'top:10px;left:10px', 'bottom:10px;left:10px'];

  function libre() {
    var r = boton.getBoundingClientRect();
    var x = Math.round(r.left + r.width / 2), y = Math.round(r.top + r.height / 2);
    return document.elementFromPoint(x, y) === boton;
  }

  function colocar() {
    var barra = buscaBarra();
    if (barra) {
      boton.style.cssText = ESTILO_EN_BARRA;
      barra.appendChild(boton);
      // Un <header> puede ser un hero con la foto encima, y una .bar un
      // contenedor cualquiera: si ahi el boton queda tapado, no vale.
      if (libre()) return;
    }
    document.body.appendChild(boton);
    for (var i = 0; i < ESQUINAS.length; i++) {
      boton.style.cssText = ESTILO_SUELTO + ';' + ESQUINAS[i];
      if (libre()) return;       // esta esquina no la tapa nada
    }
    // ninguna esquina libre: se queda arriba, pero por encima de las barras
    boton.style.cssText = ESTILO_SUELTO + ';' + ESQUINAS[0] + ';z-index:9000';
  }

  /* El portal dibuja su cabecera despues, asi que se mira una vez mas cuando ya
     ha tenido tiempo: si para entonces hay barra, el boton se muda a ella. */
  function recolocar() {
    if (!boton || !document.body.contains(boton)) return;
    var barra = buscaBarra();
    if (barra && boton.parentElement !== barra) colocar();
  }

  // Si nadie ha elegido, se sigue al sistema y se sigue reaccionando a él.
  if (!guardado() && window.matchMedia) {
    try {
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!guardado()) pintarBoton();
      });
    } catch (_) {}
  }

  window.NISTema = { alternar: alternar, aplicar: aplicar, actual: actual };

  /* El portal se dibuja entero con document.body.innerHTML en cada pantalla, y
     eso se lleva por delante el boton. En vez de darlo por perdido, se vigila
     el body y se vuelve a poner donde toque. */
  function vigila() {
    if (!window.MutationObserver) return;
    var pendiente = false;
    new MutationObserver(function () {
      if (pendiente || !boton) return;
      if (document.body.contains(boton)) { recolocar(); return; }
      pendiente = true;
      setTimeout(function () { pendiente = false; colocar(); pintarBoton(); }, 60);
    }).observe(document.body, { childList: true });
  }

  function arranca() {
    crearBoton();
    setTimeout(recolocar, 1500);   // por si la cabecera la pinta el JS de la pagina
    vigila();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arranca);
  } else {
    arranca();
  }
})();
