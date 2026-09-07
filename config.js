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
  if (!url) return { ok: false, motivo: 'no hay destino configurado' };
  const cuerpo = JSON.stringify(payload);
  const cab = { 'Content-Type': 'text/plain;charset=utf-8' };
  try {
    const r = await fetch(url, { method: 'POST', headers: cab, body: cuerpo });
    if (!r.ok) return { ok: false, motivo: 'el servidor respondio ' + r.status };
    let j = null;
    try { j = JSON.parse(await r.text()); } catch (_) { /* respuesta no JSON: se da por buena */ }
    if (j && j.ok === false) return { ok: false, motivo: j.error || 'el servidor lo rechazo' };
    return { ok: true };
  } catch (e) {
    /* Aqui NO se reintenta en no-cors, aunque sea tentador. Probado contra un
       endpoint roto: el reintento devolvia «enviado» porque no-cors resuelve
       siempre, con lo que un destino mal configurado pasaba desapercibido. Y
       cuando el fallo es de CORS el POST ya llego al servidor, asi que el
       reintento mandaria la entrega dos veces: dos filas y dos correos. */
    return { ok: false, motivo: 'no se pudo contactar con el servidor' };
  }
};
