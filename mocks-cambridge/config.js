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
