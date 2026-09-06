/* Direcciones del material de los examenes YLE (laminas y grabaciones).

   Las laminas y el audio ya no cuelgan de /yle-img/ y /yle-audio/: cualquiera
   con la URL se llevaba el material de los 30 examenes, y el colegio no lo
   vende fuera (decision de coordinacion, 6-sep-2026). Ahora los sirve el
   backend, que solo los suelta a quien tiene cuenta:

       yle-img/movers/test_06_L1.jpg
       -> /api/yle/media/yle-img/movers/test_06_L1.jpg?tk=<token>

   Un <img> o un <audio> no pueden mandar cabeceras, asi que el token viaja en
   la query. El mismo token ya viaja en la sesion del alumno.

   Se lee de localStorage, no del cliente de Supabase, porque hace falta
   SINCRONO: los src se arman mientras se pinta la pantalla, y esperar a una
   promesa dejaria la primera lamina sin cargar. Las dos webs guardan ahi su
   sesion:

     * cohasset.pe   -> bm_token (JWT de la plataforma)
     * nis.cohasset.pe -> sb-<ref>-auth-token (sesion de Supabase)

   Si no hay token, la URL sale igual y el backend responde 401: la lamina no
   aparece y el audio se cae con su aviso, que es lo que toca cuando no hay
   sesion. */
(function () {
  var API = '/api/yle/media/';
  var cache = null, cuando = 0;

  function deSupabase() {
    // sb-<ref>-auth-token, JSON con access_token dentro; la clave cambia con el
    // proyecto, asi que se busca por el patron y no por un nombre fijo.
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (!k || k.indexOf('sb-') !== 0 || k.indexOf('-auth-token') < 0) continue;
      try {
        var v = JSON.parse(localStorage.getItem(k));
        if (v && v.access_token) return v.access_token;
        if (v && v.currentSession && v.currentSession.access_token) return v.currentSession.access_token;
      } catch (e) { /* la clave puede llevar otra cosa */ }
    }
    return null;
  }

  function token() {
    // Se relee cada 30 s: el token de Supabase caduca a la hora y el SDK lo
    // renueva solo; con un valor congelado el audio del final del examen
    // empezaria a dar 401.
    var ahora = Date.now();
    if (cache && ahora - cuando < 30000) return cache;
    var t = null;
    try { t = localStorage.getItem('bm_token') || deSupabase(); } catch (e) { t = null; }
    cache = t; cuando = ahora;
    return t;
  }

  /* ruta = 'yle-img/movers/test_06_L1.jpg' (tal cual estaba antes en el src) */
  window.YM = function (ruta) {
    var t = token();
    return API + String(ruta).replace(/^\/+/, '') + (t ? '?tk=' + encodeURIComponent(t) : '');
  };
})();
