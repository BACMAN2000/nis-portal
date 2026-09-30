/* Cohasset dictionary — a side tab available on any screen, in any course.
   Self-contained: no dependency on the host page's helpers or CSS. Drop in
   with a single <script src="../coh-dict-widget.js"></script> (or a plain
   <script src="coh-dict-widget.js"></script> from a page that lives at the
   repo root) and it mounts itself once the DOM is ready.

   The dictionary itself (dictionary-app/index.html?embed=1) resolves its own
   API calls against ITS OWN origin, so this same file also works unmodified
   from a different domain (e.g. nis.cohasset.pe) once that host's copy points
   DICT_URL at the absolute https://cohasset.pe/dictionary-app/... address.

   Shares its corner with coh-notes-widget.js (if that one is also loaded on
   the same page) through the #cohSideTabs container — see cohSideTabsInit()
   below, duplicated in both files on purpose so neither depends on load
   order or on the other file existing at all. */
(function(){
  'use strict';
  if(window.__cohDictWidgetMounted) return;
  window.__cohDictWidgetMounted = true;

  // Resolve relative to THIS script's own folder, so the same file works
  // whether it's included as "../coh-dict-widget.js" (from a one-level-deep
  // app folder) or "coh-dict-widget.js" (from the repo root) — no per-page
  // path to get wrong. A host page can still force a specific URL by setting
  // window.COH_DICT_URL before this script runs (e.g. an absolute
  // cross-domain address for a different site).
  function resolveUrl(){
    if (window.COH_DICT_URL) return window.COH_DICT_URL;
    var script = document.currentScript || (function(){
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (/coh-dict-widget\.js/.test(all[i].src)) return all[i];
      }
      return null;
    })();
    var base = script ? script.src.replace(/coh-dict-widget\.js.*$/, '') : './';
    return base + 'dictionary-app/index.html?embed=1';
  }

  function cohSideTabsInit(){
    if(!document.getElementById('cohSideTabsCss')){
      var s = document.createElement('style');
      s.id = 'cohSideTabsCss';
      s.textContent = '#cohSideTabs{position:fixed;right:16px;bottom:16px;z-index:9995;'
        + 'display:flex;flex-direction:column;gap:8px;align-items:flex-end}'
        + '#cohSideTabs button{border:none;color:#fff;border-radius:10px;padding:10px 16px;'
        + 'font-weight:700;font-size:.82rem;font-family:inherit;cursor:pointer;'
        + 'box-shadow:0 3px 12px rgba(0,0,0,.18);display:inline-flex;align-items:center;gap:7px;white-space:nowrap}'
        + '@media(max-width:640px){#cohSideTabs{right:10px;bottom:10px}}';
      document.head.appendChild(s);
    }
    var el = document.getElementById('cohSideTabs');
    if(!el){
      el = document.createElement('div');
      el.id = 'cohSideTabs';
      document.body.appendChild(el);
    }
    return el;
  }

  var CSS = ''
    + '#cdwDrawer{position:fixed;top:0;right:0;width:440px;max-width:92vw;height:100vh;background:#fff;'
    + 'border-left:1px solid #E2E8F0;box-shadow:-6px 0 24px rgba(0,0,0,.15);z-index:9996;'
    + 'transition:transform .2s ease;transform:translateX(100%);display:flex;flex-direction:column}'
    + '#cdwDrawer.open{transform:translateX(0)}'
    + '#cdwDrawer iframe{flex:1;width:100%;border:0}'
    + '#cdwClose{position:absolute;top:10px;right:14px;z-index:2;background:#fff;border:1px solid #E2E8F0;'
    + 'border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;'
    + 'cursor:pointer;font-size:1rem;color:#475569;box-shadow:0 1px 4px rgba(0,0,0,.15)}'
    + '@media(max-width:640px){#cdwDrawer{width:100vw;max-width:100vw}}';

  function mount(){
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var tab = document.createElement('button');
    tab.id = 'cdwTab';
    tab.type = 'button';
    tab.style.background = '#0E7FA8';
    tab.innerHTML = '<span aria-hidden="true">📖</span> Dictionary';

    var drawer = document.createElement('div');
    drawer.id = 'cdwDrawer';
    drawer.innerHTML = '<button type="button" id="cdwClose" aria-label="Close">✕</button>'
      + '<iframe id="cdwFrame" title="Cohasset Dictionary" loading="lazy"></iframe>';

    cohSideTabsInit().appendChild(tab);
    document.body.appendChild(drawer);

    var frame = drawer.querySelector('#cdwFrame');
    var url = resolveUrl();
    tab.addEventListener('click', function(){
      if(!frame.getAttribute('src')) frame.src = url;
      drawer.classList.toggle('open');
    });
    drawer.querySelector('#cdwClose').addEventListener('click', function(){ drawer.classList.remove('open'); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') drawer.classList.remove('open'); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
