/* ===== Claro u oscuro, y que se acuerde =====

   La paleta del portal vive en nis-tokens.css, que ya trae los dos temas. Esto
   es solo el interruptor: pone data-theme en el <html> y lo guarda.

   El portal sale claro para todo el mundo. Hasta el 15-sep-2026 seguía al
   sistema de quien no había elegido nada, y eso lo cambiaba solo a mitad de
   clase cuando el equipo pasaba a oscuro por su cuenta. Ahora oscuro es solo
   para quien lo pide con el botón, y se queda así en ese navegador hasta que
   vuelva a pulsarlo. Por eso el botón muestra a dónde te lleva, no dónde estás.

   El parpadeo se evita en el <head> de cada página con una línea que lee
   localStorage antes de pintar: si esperásemos a este archivo, la página
   saldría clara y se volvería oscura a la vista del usuario.                 */
(function () {
  'use strict';
  if (window.NISTema) return;
  var CLAVE = 'nis-tema';

  function actual() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function aplicar(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(CLAVE, t); } catch (_) {}
    pintarBoton();
  }
  function alternar() { aplicar(actual() === 'dark' ? 'light' : 'dark'); }

  /* En la barra cabe la palabra y así se ve que es un botón; suelto en una
     esquina va solo el símbolo. El idioma lo dice el <html lang>: el portal
     está en inglés y Fun for Nordic en francés tiene sus seis páginas. */
  var PALABRAS = { en: ['Dark', 'Light'], fr: ['Sombre', 'Clair'], es: ['Oscuro', 'Claro'] };
  var TITULOS = { en: ['Switch to dark mode', 'Switch to light mode'],
                  fr: ['Passer en mode sombre', 'Passer en mode clair'],
                  es: ['Ver en oscuro', 'Ver en claro'] };
  // se lee cada vez: el botón de idioma cambia <html lang> en caliente
  function idioma() { return (document.documentElement.lang || 'en').slice(0, 2).toLowerCase(); }
  /* `boton` es el GRUPO de controles (idioma + tema): un <span> que se coloca
     entero en la barra o en una esquina; nis-i18n.js pone el botón de idioma
     y este archivo el de tema. Si nis-i18n no está cargado solo hay tema. */
  var boton = null, btnTema = null, btnLang = null, enBarra = false;
  function pintarBoton() {
    if (!boton) return;
    var oscuro = actual() === 'dark';
    var simbolo = oscuro ? '☀' : '☾';
    var PALABRA = PALABRAS[idioma()] || PALABRAS.en, TITULO = TITULOS[idioma()] || TITULOS.en;
    btnTema.textContent = enBarra ? simbolo + ' ' + PALABRA[oscuro ? 1 : 0] : simbolo;
    btnTema.title = TITULO[oscuro ? 1 : 0];
    btnTema.setAttribute('aria-label', btnTema.title);
    if (btnLang) {
      var i = window.NISi18n;
      btnLang.style.display = i ? '' : 'none';
      if (i) {
        btnLang.textContent = enBarra ? i.etiqueta() : '🌐';
        btnLang.title = i.titulo();
        btnLang.setAttribute('aria-label', btnLang.title);
      }
    }
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

  var ESTILO_BTN = 'border:1px solid var(--line,#e9ecf3);' +
    'background:var(--card,#fff);color:var(--ink,#1e2433);border-radius:9px;' +
    'height:34px;padding:0 12px;line-height:1;cursor:pointer;font-size:.85rem;' +
    'font-weight:600;font-family:inherit;white-space:nowrap;flex:0 0 auto';
  var ESTILO_EN_BARRA = 'display:inline-flex;gap:6px;align-items:center;margin-left:8px;flex:0 0 auto';

  /* Sin barra donde meterlo -los readers, la pizarra, los juegos- va suelto en
     una esquina. Discreto y por encima de la pagina, pero por debajo de los
     modales; y fuera de la hoja al imprimir. */
  var ESTILO_SUELTO = 'position:fixed;z-index:400;display:inline-flex;gap:6px;opacity:.85';
  var ESTILO_BTN_SUELTO = 'border:1px solid var(--line,#e9ecf3);background:var(--card,#fff);' +
    'color:var(--ink,#1e2433);border-radius:9px;min-width:34px;height:34px;' +
    'line-height:1;cursor:pointer;font-size:1rem;padding:0 6px;font-family:inherit;' +
    'box-shadow:0 2px 8px rgba(0,0,0,.18)';

  function crearBoton() {
    if (window.top !== window.self) return;          // dentro de un iframe, no
    if (boton) return;
    boton = document.createElement('span');
    boton.className = 'nis-ctl';
    boton.setAttribute('data-i18n', 'off');   // sus rótulos los pinta este archivo, no el diccionario
    btnLang = document.createElement('button');
    btnLang.type = 'button';
    btnLang.className = 'nis-tema-btn nis-lang-btn';
    btnLang.addEventListener('click', function () { if (window.NISi18n) { window.NISi18n.toggle(); pintarBoton(); } });
    btnTema = document.createElement('button');
    btnTema.type = 'button';
    btnTema.className = 'nis-tema-btn';
    btnTema.addEventListener('click', alternar);
    boton.appendChild(btnLang); boton.appendChild(btnTema);
    document.addEventListener('nis-lang', pintarBoton);
    if (!document.getElementById('nis-tema-estilo')) {
      var st = document.createElement('style');
      st.id = 'nis-tema-estilo';
      st.textContent = '@media print{.nis-ctl{display:none!important}}' +
                       '.nis-tema-btn:hover{opacity:1}' +
                       '.nis-tema-btn:focus-visible{outline:3px solid var(--accent,#3b5bdb);outline-offset:2px}';
      document.head.appendChild(st);
    }
    colocar();
  }

  /* Las cuatro esquinas, por orden. La pizarra y los juegos tienen sus propias
     barras arriba y abajo, asi que el sitio de siempre puede estar ocupado. */
  var ESQUINAS = ['top:10px;right:10px', 'bottom:10px;right:10px',
                  'top:10px;left:10px', 'bottom:10px;left:10px'];

  function libre() {
    var r = boton.getBoundingClientRect();
    var x = Math.round(r.left + r.width / 2), y = Math.round(r.top + r.height / 2);
    var e = document.elementFromPoint(x, y);
    return !!e && (e === boton || boton.contains(e));
  }

  /* La barra en la que ya se probo. Si el boton no cabe en ella (tapado o
     fuera de la pantalla) se va al body, y NO se vuelve a intentar en esa
     misma barra: recolocar() -> colocar() -> body -> mutacion -> recolocar()
     era un bucle sin fin que dejaba la pagina colgada («La pagina no
     responde», 12 y 14-sep-2026: el splash tapaba la cabecera del portal al
     cargar, y en word-wheel/cambridge-bonus la propia barra tapa el boton).
     Solo se reintenta cuando aparece una barra nueva (el portal repinta la
     cabecera con cada pantalla). */
  var barraIntentada = null;

  /* Si nis-nav.js no encontró barra y dejó su «◀ Back» flotando en una
     esquina, se lo trae al grupo: un solo racimo [Back][🌐][☾] en vez de dos
     botones sueltos que se pisan con el logo (word-wheel, games-lab). */
  function adoptaBack(estilo) {
    var a = document.querySelector('a[data-nis-back]');
    if (!a) return;
    if (a.parentElement !== document.body && !boton.contains(a)) return;   // ya está en una barra propia
    a.style.cssText = estilo + ';display:inline-flex;align-items:center;text-decoration:none;font-size:.85rem;font-weight:600';
    if (!boton.contains(a)) boton.insertBefore(a, boton.firstChild);
  }

  function colocar() {
    var barra = buscaBarra();
    barraIntentada = barra;
    if (barra) {
      enBarra = true;
      boton.style.cssText = ESTILO_EN_BARRA;
      btnTema.style.cssText = ESTILO_BTN; btnLang.style.cssText = ESTILO_BTN;
      pintarBoton();
      adoptaBack(ESTILO_BTN);
      barra.appendChild(boton);
      // Un <header> puede ser un hero con la foto encima, y una .bar un
      // contenedor cualquiera: si ahi el boton queda tapado, no vale.
      if (libre()) return;
    }
    enBarra = false;
    btnTema.style.cssText = ESTILO_BTN_SUELTO; btnLang.style.cssText = ESTILO_BTN_SUELTO;
    pintarBoton();
    adoptaBack(ESTILO_BTN_SUELTO);
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
    // nis-nav.js monta su Back en DOMContentLoaded, después de este primer
    // colocar(): si quedó flotando, se adopta en cuanto se ve
    adoptaBack(enBarra ? ESTILO_BTN : ESTILO_BTN_SUELTO);
    var barra = buscaBarra();
    if (barra && barra !== barraIntentada && boton.parentElement !== barra) colocar();
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
      setTimeout(function () { pendiente = false; colocar(); }, 60);
    }).observe(document.body, { childList: true });
  }

  function arranca() {
    crearBoton();
    setTimeout(recolocar, 1500);   // por si la cabecera la pinta el JS de la pagina
    vigila();
    // Si quedo suelto porque la barra estaba tapada (el splash de entrada, un
    // modal), se vuelve a probar de tarde en tarde: un intento cada 4 s como
    // mucho, nunca en bucle.
    setInterval(function () {
      if (boton && boton.parentElement === document.body && buscaBarra()) { barraIntentada = null; recolocar(); }
    }, 4000);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arranca);
  } else {
    arranca();
  }
})();
