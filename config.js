/* ---- una sola puerta de entrada -------------------------------------------
   El sitio se publica tambien en bacman2000.github.io/nis-portal/, y por ahi
   entraban alumnos: 10 personas distintas solo el 7-sep-2026. Al ser otro
   dominio el navegador les guarda una sesion aparte, asi que quien salta entre
   los dos se encuentra desconectado sin motivo aparente. Y el alumno no debe
   ver github.io ni bacman2000 en la barra (pedido del 13-ago-2026).

   Se manda a nis.cohasset.pe conservando pagina, parametros y ancla.
   replace() y no href: con href el boton Atras devuelve a github.io y rebota. */
(function () {
  if (location.hostname !== 'bacman2000.github.io') return;
  var base = '/nis-portal/';
  var ruta = location.pathname.indexOf(base) === 0
    ? location.pathname.slice(base.length)
    : location.pathname.replace(/^\/+/, '');
  location.replace('https://nis.cohasset.pe/' + ruta + location.search + location.hash);
})();

// Supabase connection for Portal NIS.
// The publishable (anon) key is safe to expose in the browser: Row Level
// Security policies on the database decide what each role can read/write.
window.NIS_CONFIG = {
  SUPABASE_URL: "https://kjrppibltkbflvxmiyib.supabase.co",
  SUPABASE_KEY: "sb_publishable_HINNpxCDLvwXIlecuhKGcw_LDGamS-Z",
  SCHOOL_NAME: "Nordic International School of Lima",
  // Endpoint público (Google Apps Script) que recibe los textos de Writing para
  // archivar. No es un secreto, pero se centraliza aquí en vez de hardcodearlo.
  WRITING_WEBHOOK: "https://script.google.com/macros/s/AKfycbzwn09Be0ZfKxGpwgkjLdp7nIs7awq8h7SVKkMlWN4EjekkOFqpLmnChzGHN_bB6kN-/exec"
};

/* ---- un solo cliente de Supabase por pestana -----------------------------
   El portal carga en la MISMA pagina app.js y anticheat.js, y cada uno llamaba
   por su cuenta a createClient(). Dos clientes con la misma clave de
   almacenamiento renuevan el token a la vez: el primero lo rota y el segundo
   manda el que acaba de caducar. Eso devuelve 400 «Invalid Refresh Token» y la
   libreria responde cerrando la sesion, asi que al alumno le sale que la sesion
   expiro y, al recargar, vuelve a pasar lo mismo. Visto en los registros del
   7-sep-2026: 13:09:26.946 -> 200 y 13:09:27.212 -> 400, mismo navegador.

   Aqui se memoriza createClient por URL+clave: quien lo pida recibe SIEMPRE la
   misma instancia, con lo que solo hay una renovacion en vuelo. Arregla de una
   vez las 266 paginas que crean cliente, sin tocarlas una por una.

   Si alguien pasa opciones propias (otra clave de almacenamiento, sin sesion
   persistente) se le da un cliente nuevo: ese quiere estar aparte a proposito y
   no compite por el mismo token. */
(function () {
  var cache = {};
  /* ---- el cerrojo de la sesion no puede colgar la pagina -----------------
     supabase-js protege la sesion con navigator.locks (Web Locks): getSession,
     la renovacion del token y el aviso de SIGNED_IN esperan a que el cerrojo
     este libre, y esperan SIN LIMITE. En Safari (Mac e iPad) una pestana del
     mismo origen que el sistema deja suspendida se queda con el cerrojo y la
     pestana viva no lo consigue nunca: el login responde 200 pero la app no
     llega a pedir el perfil, el alumno vuelve a pulsar Enter y en los registros
     salen cinco logins por segundo sin nada detras. Visto el 11-sep-2026 con
     todo 9.o en iPad y Mac (178 logins en tres horas, ni una peticion de
     perfil), mientras Windows funcionaba.

     Este cerrojo intenta el de Web Locks y, si en 2 s no lo tiene, sigue sin
     el. Sin cerrojo se vuelve a como era la libreria antes de Web Locks: dos
     pestanas podrian renovar el token a la vez, y eso ya lo amortigua el
     cliente unico de abajo y la ventana de reuso del refresh token. Colgarse
     nunca es la opcion. */
  function nisLock(name, acquireTimeout, fn) {
    var locks = (typeof navigator !== 'undefined') && navigator.locks;
    if (!locks || typeof locks.request !== 'function' || typeof AbortController === 'undefined') return fn();
    return new Promise(function (resolve, reject) {
      var done = false, ac = new AbortController();
      var timer = setTimeout(function () {
        if (done) return;
        done = true; ac.abort();
        Promise.resolve().then(fn).then(resolve, reject);
      }, 2000);
      locks.request(name, { mode: 'exclusive', signal: ac.signal }, function () {
        if (done) return;                 // llego tarde: ya se corrio sin cerrojo
        done = true; clearTimeout(timer);
        return Promise.resolve().then(fn).then(resolve, reject);
      }).catch(function (e) {
        if (done) return;                 // el abort del timer, ya atendido
        done = true; clearTimeout(timer);
        Promise.resolve().then(fn).then(resolve, reject);
      });
    });
  }
  function conCerrojo(opciones) {
    var o = opciones ? Object.assign({}, opciones) : {};
    o.auth = Object.assign({}, o.auth || {});
    if (!o.auth.lock) o.auth.lock = nisLock;
    return o;
  }
  function compartir(lib) {
    if (!lib || typeof lib.createClient !== 'function' || lib.__nisCompartido) return lib;
    var original = lib.createClient.bind(lib);
    lib.createClient = function (url, key, opciones) {
      if (opciones) return original(url, key, conCerrojo(opciones));
      var k = String(url) + '|' + String(key);
      if (!cache[k]) cache[k] = original(url, key, conCerrojo(null));
      return cache[k];
    };
    lib.__nisCompartido = true;
    return lib;
  }
  // La libreria ya esta cargada (el caso normal: su <script> va antes que este).
  if (window.supabase) { compartir(window.supabase); return; }
  // Y si llega despues, se envuelve en cuanto se asigne.
  try {
    var pendiente;
    Object.defineProperty(window, 'supabase', {
      configurable: true,
      get: function () { return pendiente; },
      set: function (v) { pendiente = compartir(v); }
    });
  } catch (_) { /* si el navegador no deja, se queda como estaba */ }
})();

/* ---- los errores del navegador, a la base ---------------------------------
   Lo que falla en el Safari de un alumno no se ve desde ningun sitio: el
   alumno dice «no me deja hacer nada» y aqui no llega ni una peticion. Cada
   error de JavaScript (y cada promesa rechazada sin atender) se guarda en
   client_errors con la pagina y el navegador, como maximo cinco por pagina,
   y el admin los lee desde SQL. Se manda con fetch directo a PostgREST, sin
   pasar por el cliente de Supabase: si lo que fallo es justo el cliente, el
   aviso tiene que salir igual. */
(function () {
  var enviados = 0, cfg = window.NIS_CONFIG;
  function token() {
    try {
      var k = Object.keys(localStorage).filter(function (x) { return /^sb-.*-auth-token$/.test(x); })[0];
      var v = k && JSON.parse(localStorage.getItem(k));
      return v && (v.access_token || (v.currentSession && v.currentSession.access_token)) || null;
    } catch (_) { return null; }
  }
  function uid(t) { try { return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).sub || null; } catch (_) { return null; } }
  function manda(mensaje, pila, extra) {
    if (enviados >= 5 || !cfg || !cfg.SUPABASE_URL) return; enviados++;
    var t = token(); // sin sesion va con la clave publica y sin user_id (la pantalla de login tambien falla)
    try {
      fetch(cfg.SUPABASE_URL + '/rest/v1/client_errors', {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'application/json', apikey: cfg.SUPABASE_KEY, Authorization: 'Bearer ' + (t || cfg.SUPABASE_KEY), Prefer: 'return=minimal' },
        body: JSON.stringify({ user_id: t ? uid(t) : null, page: location.pathname + location.search + location.hash, ua: navigator.userAgent,
          message: String(mensaje || '').slice(0, 500), stack: String(pila || '').slice(0, 2000), extra: extra || null })
      }).catch(function () {});
    } catch (_) {}
  }
  window.addEventListener('error', function (e) {
    manda(e.message || (e.error && e.error.message), e.error && e.error.stack, { file: e.filename, line: e.lineno, col: e.colno });
  });
  window.addEventListener('unhandledrejection', function (e) {
    var r = e.reason; manda(r && (r.message || String(r)), r && r.stack, { tipo: 'unhandledrejection' });
  });
  window.NIS_ERROR = manda;
})();

/* ---- envio al webhook, con acuse de recibo -------------------------------
   El Apps Script responde {ok:true} o {ok:false,error} y su Web App ya manda
   las cabeceras CORS. Pero el portal lo llamaba con mode:'no-cors', que deja
   la respuesta opaca: un 500 del script —o un {ok:false}— pasaba por exito y
   el alumno leia que su trabajo se habia enviado.

   En modo cors si se puede leer. Como el Content-Type es text/plain la
   peticion sigue siendo "simple" y no dispara el preflight OPTIONS, que Apps
   Script no sabe responder.

   Si CORS fallara igualmente (proxy, extension, red del colegio), se reintenta
   a ciegas para no perder la entrega, pero se devuelve sinConfirmar:true — que
   no es lo mismo que un exito. */
window.enviaWebhook = async function (url, payload) {
  if (!url) return { ok: false, motivo: 'no destination configured' };
  const cuerpo = JSON.stringify(payload);
  const cab = { 'Content-Type': 'text/plain;charset=utf-8' };
  try {
    const r = await fetch(url, { method: 'POST', headers: cab, body: cuerpo });
    if (!r.ok) return { ok: false, motivo: 'the server responded ' + r.status };
    let j = null;
    try { j = JSON.parse(await r.text()); } catch (_) { /* respuesta no JSON: se da por buena */ }
    if (j && j.ok === false) return { ok: false, motivo: j.error || 'the server rejected it' };
    return { ok: true };
  } catch (e) {
    /* Aqui NO se reintenta en no-cors, aunque sea tentador. Probado contra un
       endpoint roto: el reintento devolvia «enviado» porque no-cors resuelve
       siempre, con lo que un destino mal configurado pasaba desapercibido. Y
       cuando el fallo es de CORS el POST ya llego al servidor, asi que el
       reintento mandaria la entrega dos veces: dos filas y dos correos. */
    return { ok: false, motivo: 'could not contact the server' };
  }
};
