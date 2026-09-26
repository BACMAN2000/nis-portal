/* ---- el colegio que sirve esta página (multi-colegio, 26-sep-2026) --------
   El mismo código y la misma base atienden a más de un colegio. Quién es el
   colegio lo dice el hostname (demo.cohasset.pe → «demo», nis.cohasset.pe →
   «nis»), y ?school=slug lo fuerza para probar otro colegio desde el mismo
   dominio (se recuerda en sessionStorage; ?school= vacío lo quita).

   Va ANTES de nis-splash.js para que el splash de marca Nordic no salga en un
   colegio que no es Nordic, y ANTES de config.js: la petición se lanza en la
   vuelta siguiente, cuando NIS_CONFIG ya existe. Lo que devuelve la base
   (school_public) es solo marca y apps encendidas: nada que no se vea ya en la
   pantalla de login.

   Si la petición falla o tarda, NIS arranca con su marca de siempre y con todo
   visible; otro colegio espera como mucho 2,5 s y arranca con lo que tenga. */
(function () {
  var NIS = { slug: 'nis', name: 'Nordic International School of Lima', short_name: 'NIS',
              logo_url: 'assets/logo-h.svg', logo_dark_url: 'assets/logo-white-h.svg',
              accent: null, is_demo: false, apps: null };

  /* A qué app del catálogo (tabla apps) pertenece cada pestaña o tarjeta.
     Lo que no está aquí es del núcleo (Home, cuenta, ayuda, usuarios…) y se
     ve siempre. */
  var APP_OF_NAV = {
    myclasses:'classes', myunit:'classes', projects:'classes', classes:'classes', scope:'classes',
    materiales:'classes', corrector:'classes', unitprod:'classes', corregir:'classes',
    unitexams:'classes', unitaccess:'classes', whatsees:'classes',
    french:'french', fr:'french',
    littlereaders:'littlereaders', rhymes:'rhymes',
    library:'library', readers:'library',
    pizarra:'whiteboard',
    cambridge:'cambridge', cambridgehub:'cambridge', yle:'cambridge', studyplan:'cambridge',
    uoe:'cambridge', cambridgeinfo:'cambridge',
    funyle:'fun_primary', funnordic:'fun_primary', funaccess:'fun_primary',
    funsec:'fun_secondary',
    exams:'mocks', mocks:'mocks', practice:'mocks', mock2:'mocks', speaktest:'mocks', final:'mocks',
    tools:'tools', games:'tools', livequiz:'tools', nishoot:'tools', mun:'tools', phonics:'tools',
    phrasal:'tools', collocations:'tools', idioms:'tools', wordform:'tools', dict:'tools', coach:'tools',
    results:'progress', stats:'progress', activities:'progress', tiempo:'progress',
    honesty:'progress', levels:'progress',
    teachersroom:'teachers_room'
  };

  var host = location.hostname;
  var q = null, override = null;
  try {
    q = new URLSearchParams(location.search).get('school');
    if (q !== null) { if (q) sessionStorage.setItem('nis-school', q); else sessionStorage.removeItem('nis-school'); }
    override = sessionStorage.getItem('nis-school');
  } catch (e) {}
  var local = /^(localhost|127\.0\.0\.1|\[::1\]|bacman2000\.github\.io)$/.test(host);
  var guess = override || (!local && /\.cohasset\.pe$/.test(host) ? host.split('.')[0] : 'nis');
  var esNIS = guess === 'nis';
  document.documentElement.dataset.school = guess;

  window.NIS_SCHOOL = Object.assign({}, NIS, { slug: guess, loaded: false, override: !!override });

  function aplicar(s) {
    if (!s) s = NIS;
    var actual = window.NIS_SCHOOL;
    window.NIS_SCHOOL = Object.assign({}, NIS, s, { loaded: true, override: !!override });
    var S = window.NIS_SCHOOL;
    document.documentElement.dataset.school = S.slug;
    if (window.NIS_CONFIG) window.NIS_CONFIG.SCHOOL_NAME = S.name;
    document.title = (S.short_name || S.name) + ' Portal — ' + S.name;
    if (S.accent) document.documentElement.style.setProperty('--accent', S.accent);
    if (S.slug !== 'nis') {
      var sp = document.querySelector('.nisSplash'); if (sp) sp.remove();
    }
    // Si la cabecera o el login ya estaban pintados (NIS no espera), se
    // actualiza el logo en sitio; el siguiente repintado ya lo trae bien.
    if (actual && !actual.loaded) {
      document.querySelectorAll('.app-header > img').forEach(function (i) { i.src = S.logo_dark_url || S.logo_url; i.alt = S.name; });
      document.querySelectorAll('.auth-card img.logo').forEach(function (i) { i.src = S.logo_url; i.alt = S.name; });
    }
    if (override) aviso(S);
  }

  /* Banda fija cuando se está mirando otro colegio con ?school=. */
  function aviso(S) {
    if (document.getElementById('schoolPreview')) return;
    var d = document.createElement('div');
    d.id = 'schoolPreview';
    d.style.cssText = 'position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:9998;background:#111827;color:#fff;font:600 13px/1.3 system-ui,sans-serif;padding:8px 14px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;gap:12px;align-items:center';
    d.innerHTML = '<span>🏫 Previewing school: ' + String(S.name).replace(/[<>&]/g, '') + '</span>' +
      '<a href="?school=" style="color:#93c5fd;text-decoration:underline">exit preview</a>';
    (document.body || document.documentElement).appendChild(d);
  }

  var pedir = new Promise(function (res) {
    setTimeout(function () {
      var cfg = window.NIS_CONFIG;
      if (!cfg || !window.fetch) { res(null); return; }
      var ctl = ('AbortController' in window) ? new AbortController() : null;
      var t = setTimeout(function () { if (ctl) ctl.abort(); }, 2500);
      fetch(cfg.SUPABASE_URL + '/rest/v1/rpc/school_public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: cfg.SUPABASE_KEY, Authorization: 'Bearer ' + cfg.SUPABASE_KEY },
        body: JSON.stringify({ p_host: override || host }),
        signal: ctl ? ctl.signal : undefined
      }).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { clearTimeout(t); res(j && j.slug ? j : null); })
        .catch(function () { clearTimeout(t); res(null); });
    }, 0);
  });

  pedir.then(function (s) {
    if (s) aplicar(s);
    else if (!esNIS) aplicar(Object.assign({}, NIS, { slug: guess, name: guess, short_name: guess, apps: {} }));
    else aplicar(NIS);
  });

  /* NIS no espera a la base (arranca como siempre); otro colegio sí, para que
     el primer pintado ya lleve su logo y sus apps. */
  window.NIS_SCHOOL_READY = esNIS ? Promise.resolve() : pedir.then(function () {});

  /* ---- helpers globales ---- */
  window.schoolName  = function () { return (window.NIS_SCHOOL || NIS).name; };
  window.schoolShort = function () { var S = window.NIS_SCHOOL || NIS; return S.short_name || S.name; };
  window.schoolLogo  = function (dark) { var S = window.NIS_SCHOOL || NIS; return dark ? (S.logo_dark_url || S.logo_url) : (S.logo_url || S.logo_dark_url); };
  window.schoolAppKey = function (navKey) { return APP_OF_NAV[navKey] || null; };
  /* true = se muestra. Sin datos del colegio (o app desconocida) todo se ve. */
  window.schoolAppOK = function (navKey) {
    var S = window.NIS_SCHOOL;
    if (!S || !S.apps) return true;
    var app = APP_OF_NAV[navKey];
    if (!app) return true;
    return S.apps[app] === true;
  };
  /* Filtra el menú lateral (pestañas sueltas y grupos) por apps encendidas. */
  window.schoolFilterNav = function (items) {
    if (!Array.isArray(items)) return items;
    var S = window.NIS_SCHOOL;
    if (!S || !S.apps) return items;
    return items.map(function (n) {
      if (!n || !n.items) return (n && n.key && !window.schoolAppOK(n.key)) ? null : n;
      var sub = n.items.filter(function (i) { return !i.key || window.schoolAppOK(i.key); });
      return sub.length ? Object.assign({}, n, { items: sub }) : null;
    }).filter(Boolean);
  };
})();
