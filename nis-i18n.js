/* Idioma de la interfaz: inglés por defecto, español con un botón.

   El portal está escrito en inglés (traducción en sitio del 11-sep-2026) y no
   tiene claves de i18n en el código: 331 páginas y app.js con el texto dentro.
   En vez de reescribirlo todo, este archivo traduce el DOM en caliente con un
   diccionario inglés→español (i18n/es.json, minado de git por
   tools/i18n/mina_diccionario.js y ampliado en i18n/es.extra.json):

     · nodos de texto cuyo contenido (sin espacios sobrantes) está en el
       diccionario, y los atributos placeholder/title/aria-label/alt/value;
     · elementos pequeños cuyo innerHTML entero está en el diccionario (los
       textos con <b> dentro);
     · patrones con número («Unit 4», «3 of 8») de la sección "patterns".

   Lo que no está en el diccionario se queda en inglés: contenido pedagógico,
   nombres propios, lo que escribe el alumno. Nunca se toca dentro de
   <textarea>, <input>, [contenteditable], <code> ni [data-i18n="off"]
   (48 páginas llevan <html translate="no"> contra Google Translate: eso no
   nos afecta, es otro traductor). Al volver a inglés se restaura el original guardado en
   cada nodo.

   La preferencia vive en localStorage («nis.lang») y ?lang=es la fija desde
   un enlace. El botón lo pinta nis-tema.js junto al de tema; las páginas con
   su propio bilingüismo (project, informe, boletín, guía YLE) leen
   NISi18n.lang() y escuchan el evento «nis-lang». */
(function () {
  'use strict';
  if (window.NISi18n) return;
  var CLAVE = 'nis.lang';
  var IDIOMAS = ['en', 'es'];
  var script = document.currentScript;
  var BASE = script && script.src ? script.src : location.href;
  /* Sin ?v= a propósito: el diccionario cambia a menudo y sellarlo por hash
     obligaría a resellar este archivo y, con él, las 345 páginas que lo cargan.
     Se pide con no-cache: el navegador revalida con el ETag del servidor (un
     304 barato) y solo lo baja entero cuando ha cambiado. */
  var DICC_URL = new URL('i18n/es.json', BASE).href;

  function leer() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q && IDIOMAS.indexOf(q) >= 0) { localStorage.setItem(CLAVE, q); return q; }
      var v = localStorage.getItem(CLAVE);
      return IDIOMAS.indexOf(v) >= 0 ? v : 'en';
    } catch (_) { return 'en'; }
  }
  var lang = leer();
  var dicc = null, htmlDicc = null, patrones = [], cargando = null, trozosRe = null;
  /* Dónde NO se traduce: código, cajas del alumno y CONTENIDO. Un banco de
     palabras, una pista, una opción de examen o una ficha de vocabulario
     pueden contener palabras que también son rótulos («Open», «Level»,
     «because»); ahí el inglés es la lección y se queda. */
  var SALTAR = 'script,style,textarea,input,select,code,pre,kbd,svg,[contenteditable],[data-i18n="off"],' +
    '.passage,.passage-text,.wt-box,.clues,.clue,.bank,.options,.opt,.choice,.choices,.qopts,.stem,.question,' +
    '.word,.words,.chip,.token,.sentence,.example,.def,.definition,.gloss,.lexapp-item,.transcript,.lyrics,.rhyme,' +
    '.vocab,.wordbank,.tiles,.tile,.xw-grid,.ws-grid,.puzzle,.letters';
  /* Ojo: nada de clases genéricas aquí (.grid, .item, .text, .body, .card p):
     la SPA las usa para maquetar y la primera versión dejó sin traducir todas
     las tarjetas del alumno por culpa de .grid. */
  var ATRIBUTOS = ['placeholder', 'title', 'aria-label', 'alt', 'data-tip'];

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  function cargar() {
    if (cargando) return cargando;
    cargando = fetch(DICC_URL, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      dicc = new Map(); htmlDicc = new Map(); patrones = [];
      if (!d) return;
      var s = d.strings || {};
      for (var k in s) { if (k.indexOf('<') >= 0) htmlDicc.set(norm(k), s[k]); else dicc.set(norm(k), s[k]); }
      (d.patterns || []).forEach(function (p) { try { patrones.push([new RegExp(p[0]), p[1]]); } catch (_) {} });
      /* Trozos: los paneles del profesor componen frases con datos dentro
         («80 marked and not yet sent in your grades»). El diccionario trae el
         trozo fijo (viene de las plantillas de app.js); si un nodo no casa
         entero, se traducen los trozos de ≥3 palabras que contenga. */
      var trozos = [];
      dicc.forEach(function (v, k) { if (k.length >= 12 && k.split(' ').length >= 3 && !/[<>]/.test(k)) trozos.push(k); });
      trozos.sort(function (a, b) { return b.length - a.length; });
      var escapa = function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
      try { trozosRe = trozos.length ? new RegExp('(?<![A-Za-z0-9])(?:' + trozos.map(escapa).join('|') + ')(?![A-Za-z0-9])', 'g') : null; }
      catch (_) { trozosRe = null; }   // sin lookbehind (Safari viejo): solo casa entera
    }).catch(function () { dicc = new Map(); htmlDicc = new Map(); });
    return cargando;
  }

  function traduceTexto(t) {
    var n = norm(t);
    if (!n) return null;
    var v = dicc.get(n);
    if (v != null) return v;
    for (var i = 0; i < patrones.length; i++) { if (patrones[i][0].test(n)) return n.replace(patrones[i][0], patrones[i][1]); }
    if (trozosRe && n.length <= 400) {
      var hubo = false;
      var r = n.replace(trozosRe, function (m) { var t = dicc.get(m); if (t == null) return m; hubo = true; return t; });
      if (hubo) return r;
    }
    return null;
  }
  /* Conserva los espacios de los bordes del nodo original (a menudo son el
     separador con el emoji o el icono de al lado). */
  function conBordes(original, nuevo) {
    var m = /^(\s*)[\s\S]*?(\s*)$/.exec(original);
    return (m ? m[1] : '') + nuevo + (m ? m[2] : '');
  }

  var procesando = false;
  function aplicar(raiz) {
    if (!dicc || procesando) return;
    procesando = true;
    try {
      var es = lang === 'es';
      raiz = raiz || document.body;
      if (!raiz) return;
      // 1. elementos pequeños con markup dentro
      if (htmlDicc.size) {
        var els = raiz.querySelectorAll ? raiz.querySelectorAll('p,li,label,span,div,td,th,h1,h2,h3,h4,h5,h6,small,b,strong,em,button,a,summary,legend,dt,dd,figcaption') : [];
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (el.children.length === 0 || el.children.length > 4 || el.innerHTML.length > 500) continue;
          if (el.closest && el.closest(SALTAR)) continue;
          if (es) {
            if (el.__nisEnHTML != null) continue;
            var h = htmlDicc.get(norm(el.innerHTML));
            if (h != null) { el.__nisEnHTML = el.innerHTML; el.innerHTML = h; }
          } else if (el.__nisEnHTML != null) { el.innerHTML = el.__nisEnHTML; el.__nisEnHTML = null; }
        }
      }
      // 2. nodos de texto
      var walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var p = n.parentNode;
          if (!p || p.nodeType !== 1) return NodeFilter.FILTER_REJECT;
          if (p.closest && p.closest(SALTAR)) return NodeFilter.FILTER_REJECT;
          return /\S/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      });
      var nodos = []; var n;
      while ((n = walker.nextNode())) nodos.push(n);
      for (var j = 0; j < nodos.length; j++) {
        n = nodos[j];
        if (es) {
          if (n.__nisEn != null && n.nodeValue === n.__nisEs) continue;   // ya traducido
          var t = traduceTexto(n.nodeValue);
          if (t != null) { n.__nisEn = n.nodeValue; n.__nisEs = conBordes(n.nodeValue, t); n.nodeValue = n.__nisEs; }
        } else if (n.__nisEn != null && n.nodeValue === n.__nisEs) { n.nodeValue = n.__nisEn; n.__nisEn = null; n.__nisEs = null; }
      }
      // 3. atributos
      var todos = raiz.querySelectorAll ? raiz.querySelectorAll('[placeholder],[title],[aria-label],[alt],[data-tip],input[type="button"],input[type="submit"],option') : [];
      for (var k = 0; k < todos.length; k++) {
        var e = todos[k];
        if (e.closest && e.closest('[data-i18n="off"]')) continue;
        var attrs = ATRIBUTOS.slice();
        if (e.tagName === 'INPUT' && (e.type === 'button' || e.type === 'submit')) attrs.push('value');
        for (var a = 0; a < attrs.length; a++) {
          var nombre = attrs[a]; if (!e.hasAttribute(nombre)) continue;
          var guardado = e.__nisAttr = e.__nisAttr || {};
          if (es) {
            if (guardado[nombre] != null) continue;
            var tv = traduceTexto(e.getAttribute(nombre));
            if (tv != null) { guardado[nombre] = e.getAttribute(nombre); e.setAttribute(nombre, tv); }
          } else if (guardado[nombre] != null) { e.setAttribute(nombre, guardado[nombre]); guardado[nombre] = null; }
        }
        if (e.tagName === 'OPTION' && e.children.length === 0) {
          if (es) { if (e.__nisEn == null) { var ov = traduceTexto(e.textContent); if (ov != null) { e.__nisEn = e.textContent; e.textContent = ov; } } }
          else if (e.__nisEn != null) { e.textContent = e.__nisEn; e.__nisEn = null; }
        }
      }
    } finally { procesando = false; }
  }

  var pendiente = false;
  function programar() {
    if (pendiente) return;
    pendiente = true;
    // setTimeout y no requestAnimationFrame: en una pestaña en segundo plano
    // Chrome no dispara rAF y la traducción se quedaba esperando
    setTimeout(function () { pendiente = false; aplicar(document.body); }, 16);
  }
  function vigilar() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function (muts) {
      if (procesando) return;
      for (var i = 0; i < muts.length; i++) { if (muts[i].type === 'childList' && muts[i].addedNodes.length) { programar(); return; } if (muts[i].type === 'characterData') { programar(); return; } }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function marcarHTML() {
    var h = document.documentElement;
    if (!h.__nisLangOriginal) h.__nisLangOriginal = h.getAttribute('lang') || 'en';
    // el francés del curso se queda en francés
    if (h.__nisLangOriginal.slice(0, 2) === 'fr') return;
    h.setAttribute('lang', lang === 'es' ? 'es' : h.__nisLangOriginal);
  }

  function set(l) {
    if (IDIOMAS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    try { localStorage.setItem(CLAVE, l); } catch (_) {}
    marcarHTML();
    cargar().then(function () { aplicar(document.body); });
    try { document.dispatchEvent(new CustomEvent('nis-lang', { detail: { lang: l } })); } catch (_) {}
  }

  window.NISi18n = {
    lang: function () { return lang; },
    set: set,
    toggle: function () { set(lang === 'es' ? 'en' : 'es'); },
    /* Texto para el botón: lo que PASARÍA al pulsar. */
    etiqueta: function () { return lang === 'es' ? '🌐 English' : '🌐 Español'; },
    titulo: function () { return lang === 'es' ? 'Switch the interface to English' : 'Ver la interfaz en español'; },
    t: function (s) { if (lang !== 'es' || !dicc) return s; var v = traduceTexto(s); return v == null ? s : v; },
    ready: function () { return cargar(); },
    refresh: function () { aplicar(document.body); }
  };

  function arrancar() {
    marcarHTML();
    vigilar();
    if (lang === 'es') cargar().then(function () { aplicar(document.body); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
