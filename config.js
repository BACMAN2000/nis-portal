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
  function compartir(lib) {
    if (!lib || typeof lib.createClient !== 'function' || lib.__nisCompartido) return lib;
    var original = lib.createClient.bind(lib);
    lib.createClient = function (url, key, opciones) {
      if (opciones) return original(url, key, opciones);
      var k = String(url) + '|' + String(key);
      if (!cache[k]) cache[k] = original(url, key);
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
