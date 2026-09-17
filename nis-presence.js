/* Presencia: cuánto tiempo pasa el alumno DELANTE de cada página.

   Hasta el 17-sep-2026 el «tiempo de pantalla» era la suma de lo que cada
   actividad declaraba al guardar o al terminar: quien navegaba el portal,
   leía sin entregar o abría el curso sin acabar nada no dejaba rastro (154
   alumnos, 46 con tiempo en dos semanas). Este archivo va en la SPA y en
   todas las páginas y manda un latido a `student_sessions`:

     · una fila por carga de página (y, en la SPA, por cambio de ruta);
     · `active_sec` = segundos con la pestaña visible Y con el alumno activo
       (tecla, ratón, toque o scroll en los últimos 5 min);
     · primer envío a los 20 s (así una entrada y salida no deja fila), luego
       cada 30 s, y al esconder la pestaña o salir (fetch keepalive).

   Sin sesión no hace nada. Dentro de un iframe tampoco (cuenta el padre).
   Habla con PostgREST con el token que ya guarda supabase-js en
   localStorage: no abre otro cliente ([[nis-sesion-dos-clientes-supabase]]).
   Un fallo (sin red, RLS, token caducado) para el latido en silencio: medir
   presencia nunca puede molestar al alumno. */
(function () {
  'use strict';
  if (window.NISPresence) return;
  if (window.top !== window.self) return;
  var URL_BASE = (window.NIS_CONFIG && window.NIS_CONFIG.SUPABASE_URL) || 'https://kjrppibltkbflvxmiyib.supabase.co';
  var KEY = (window.NIS_CONFIG && window.NIS_CONFIG.SUPABASE_KEY) || 'sb_publishable_HINNpxCDLvwXIlecuhKGcw_LDGamS-Z';
  var PRIMER = 20, CADA = 30, IDLE = 300, TOPE = 14400;

  function sesion() {
    try {
      var k = Object.keys(localStorage).filter(function (x) { return /^sb-.*-auth-token$/.test(x); })[0];
      if (!k) return null;
      var t = JSON.parse(localStorage.getItem(k));
      var tok = t && (t.access_token || (t.currentSession && t.currentSession.access_token));
      var uid = t && ((t.user && t.user.id) || (t.currentSession && t.currentSession.user && t.currentSession.user.id));
      return (tok && uid) ? { token: tok, uid: uid } : null;
    } catch (_) { return null; }
  }
  var s = sesion();
  if (!s) return;

  var pagina = location.pathname.replace(/^\//, '') || 'index.html';
  if (/\/$/.test(pagina)) pagina += 'index.html';
  function recurso() {
    if (pagina === 'index.html') return location.hash || '#home';
    var q = location.search.replace(/^\?/, '').split('&').filter(function (p) { return !/^(back|v|lang|claude)=/.test(p); }).join('&');
    return q ? '?' + q : null;
  }

  var id = null, activo = 0, enviado = 0, ultimaEntrada = Date.now(), muerto = false, enviando = false, gen = 0;
  var nota = recurso();
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'pointerdown'].forEach(function (ev) {
    document.addEventListener(ev, function () { ultimaEntrada = Date.now(); }, { passive: true, capture: true });
  });

  function cabeceras() {
    // supabase-js renueva el token cada hora y lo reescribe en localStorage: se relee en cada envío
    var ahora = sesion() || s;
    return { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + ahora.token, Prefer: 'return=representation' };
  }
  function enviar(final) {
    if (muerto || enviando || activo === enviado) return;
    if (activo < PRIMER && !id) return;
    enviando = true;
    var cuerpo = { last_seen_at: new Date().toISOString(), active_sec: Math.min(activo, TOPE), resource: nota };
    var req;
    if (!id) {
      cuerpo.student_id = s.uid; cuerpo.page = pagina; cuerpo.ua = (navigator.userAgent || '').slice(0, 200);
      req = fetch(URL_BASE + '/rest/v1/student_sessions', { method: 'POST', headers: cabeceras(), body: JSON.stringify(cuerpo), keepalive: !!final });
    } else {
      req = fetch(URL_BASE + '/rest/v1/student_sessions?id=eq.' + id, { method: 'PATCH', headers: cabeceras(), body: JSON.stringify(cuerpo), keepalive: !!final });
    }
    var valor = activo, g = gen;
    req.then(function (r) {
      if (g !== gen) return null;          // respuesta de una ruta anterior de la SPA: ya no vale
      if (!r.ok) { muerto = (r.status === 401 || r.status === 403); return null; }
      return r.json().catch(function () { return null; });
    }).then(function (d) {
      if (g !== gen) return;
      if (d && d[0] && d[0].id && !id) id = d[0].id;
      if (id) enviado = valor;
    }).catch(function () {}).then(function () { if (g === gen) enviando = false; });
  }

  /* Un tic por segundo: solo cuenta con la pestaña visible y actividad reciente. */
  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    if (Date.now() - ultimaEntrada > IDLE * 1000) return;
    if (activo >= TOPE) return;
    activo++;
    if (activo === PRIMER || (activo > PRIMER && (activo - PRIMER) % CADA === 0)) enviar(false);
  }, 1000);

  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') enviar(true); });
  window.addEventListener('pagehide', function () { enviar(true); });

  /* En la SPA cada ruta es un recurso distinto: se cierra la fila y empieza otra. */
  if (pagina === 'index.html') {
    window.addEventListener('hashchange', function () {
      enviar(true);
      gen++; id = null; activo = 0; enviado = 0; enviando = false; nota = recurso();
    });
  }

  window.NISPresence = { segundos: function () { return activo; }, flush: function () { enviar(true); }, id: function () { return id; } };
})();
