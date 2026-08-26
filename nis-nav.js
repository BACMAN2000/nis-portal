/* Botón "volver" compartido para las páginas sueltas de actividades.
   Antes cada juego sólo ofrecía "🏫 Portal" (href="./"), que devuelve al
   inicio del portal y obliga al alumno a rehacer todo el camino
   (English → Classes → grado → Activities). Ahora cada página recibe un
   ← que vuelve a DONDE VENÍA:

     1. ?back=<ruta relativa>  — lo escribe el portal al enlazar hacia fuera
                                 (p. ej. ?back=./%23classes_g9_unit_u4)
     2. document.referrer      — si es del mismo origen (llegó desde el hub)
     3. ./                     — último recurso: el portal

   Se auto-inyecta en los dos patrones de barra que usan las páginas:
   `.topnav > .navbtn` y `header > a.back`. No hace nada dentro de un
   iframe (games-lab, live-quiz, MUN se embeben en el portal). */
/* El sitio viejo de GitHub Pages (bacman2000.github.io/nis-portal) sigue en
   línea y hay marcadores/enlaces antiguos apuntándole. Cualquier página que
   cargue allí salta de inmediato a nis.cohasset.pe conservando ruta, query y
   hash — ningún alumno debe ver github.io en la barra. En nis.cohasset.pe es
   un no-op. */
(function(){
  if(/\.github\.io$/i.test(location.hostname)){
    var p = location.pathname.replace(/^\/nis-portal\/?/, '/');
    location.replace('https://nis.cohasset.pe' + p + location.search + location.hash);
  }
})();
(function(){
  var PORTAL = './';

  function safeRel(u){
    if(!u) return '';
    u = String(u);
    if(/^[a-z][a-z0-9+.\-]*:/i.test(u)) return '';   // http:, javascript:, data:… → fuera
    if(u.slice(0,2) === '//') return '';             // protocol-relative → fuera
    return u;
  }
  function fromParam(){
    try{ return safeRel(new URLSearchParams(location.search).get('back')); }
    catch(_){ return ''; }
  }
  function fromReferrer(){
    try{
      if(!document.referrer) return '';
      var u = new URL(document.referrer);
      if(u.origin !== location.origin) return '';
      if(u.pathname === location.pathname) return '';   // recarga de la propia página
      return u.pathname + u.search + u.hash;
    }catch(_){ return ''; }
  }
  function target(){ return fromParam() || fromReferrer() || PORTAL; }
  function abs(u){ try{ return new URL(u, location.href).href; }catch(_){ return ''; } }

  /* Una página con pantallas internas registra aquí su propio "atrás":
     si devuelve true se queda el clic (retrocedió una pantalla); si devuelve
     false ya está en su primera pantalla y toca salir al portal. */
  var _inner = null;

  function go(ev){
    if(ev) ev.preventDefault();
    if(_inner){ try{ if(_inner() === true) return; }catch(_){} }
    var t = target(), ref = fromReferrer();
    // Si el destino ES la página anterior, usa el historial: restaura scroll
    // y el estado ya renderizado del portal (bfcache) en vez de recargarlo.
    if(ref && abs(ref) === abs(t) && history.length > 1){ history.back(); return; }
    location.href = t;
  }

  function label(){
    return (document.documentElement.getAttribute('lang')||'').slice(0,2) === 'es'
      ? '◀ Volver' : '◀ Back';
  }

  function wire(a){
    a.setAttribute('href', target());
    a.addEventListener('click', go);
  }

  function mount(){
    if(window.top !== window.self) return;            // embebido en el portal
    var slots = document.querySelectorAll('[data-nis-back]');
    if(slots.length){ Array.prototype.forEach.call(slots, wire); return; }

    var a = document.createElement('a');
    a.textContent = label();
    a.setAttribute('data-nis-back','');

    var nav = document.querySelector('nav.topnav');
    if(nav){
      a.className = 'navbtn';
      nav.insertBefore(a, nav.querySelector('.navbtn') || null);
      wire(a); return;
    }
    var old = document.querySelector('header a.back');
    if(old){
      // Mismo tamaño que "Back to Portal" pero en secundario, para que se
      // lea como "atrás un paso" y no compita con el botón del portal.
      a.className = 'back';
      a.style.cssText = 'margin-left:14px;background:#fff;color:#2d5a8d;border:1px solid #cbd5e1';
      old.parentNode.insertBefore(a, old);
      wire(a); return;
    }
    // Readers (Tom Sawyer, Being Earnest): header con su propio botón Portal.
    var pb = document.querySelector('header .backbtn');
    if(pb){
      // Compacto: la cabecera del reader ya va justa y un botón a tamaño
      // completo la partía en dos filas en tablet.
      a.className = 'backbtn ghost';
      a.style.cssText = 'margin-right:8px;padding:7px 11px;font-size:.8rem';
      pb.parentNode.insertBefore(a, pb);
      wire(a); return;
    }
    // Sin barra propia: se pinta uno autónomo dentro del header (o flotante).
    a.style.cssText = 'display:inline-block;font:600 .85rem/1 inherit;text-decoration:none;'
      + 'padding:8px 14px;border-radius:9px;background:rgba(255,255,255,.16);color:#fff;'
      + 'border:1px solid rgba(255,255,255,.35);white-space:nowrap;margin-bottom:10px';
    var h = document.querySelector('header');
    if(h){ h.insertBefore(a, h.firstChild); wire(a); return; }
    a.style.cssText += ';position:fixed;top:12px;left:12px;z-index:9999;'
      + 'background:#2d5a8d;border-color:#2d5a8d';
    document.body.appendChild(a); wire(a);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  window.NISNAV = { target: target, back: go,
    setBackHandler: function(fn){ _inner = (typeof fn === 'function') ? fn : null; } };
})();
