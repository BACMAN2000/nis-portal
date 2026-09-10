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
    boton.title = oscuro ? 'Ver en claro' : 'Ver en oscuro';
    boton.setAttribute('aria-label', boton.title);
  }

  function crearBoton() {
    if (window.top !== window.self) return;          // dentro de un iframe, no
    var barra = document.querySelector('.topnav') ||
                document.querySelector('header .bar') ||
                document.querySelector('header');
    if (!barra) return;
    boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'nis-tema-btn';
    boton.style.cssText = 'margin-left:8px;border:1px solid var(--line,#e9ecf3);' +
      'background:var(--card,#fff);color:var(--ink,#1e2433);border-radius:9px;' +
      'width:34px;height:34px;line-height:1;cursor:pointer;font-size:1rem;' +
      'flex:0 0 auto;padding:0';
    boton.addEventListener('click', alternar);
    pintarBoton();
    barra.appendChild(boton);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearBoton);
  } else {
    crearBoton();
  }
})();
