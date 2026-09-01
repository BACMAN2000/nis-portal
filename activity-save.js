/* =========================================================================
 *  NIS · Guardado y entrega de las actividades del portal
 * -------------------------------------------------------------------------
 *  Las actividades sueltas (reading, listening, grammar lab…) guardaban lo
 *  que el alumno escribía SOLO en localStorage. Eso significa que el trabajo
 *  vive en un navegador concreto: si el alumno entra desde otro equipo, si
 *  la sala de cómputo le da otra máquina o si alguien limpia el historial,
 *  todo lo escrito desaparece y hay que rehacerlo. Y aunque no desaparezca,
 *  el profesor no lo ve: para entregar había que copiarlo a mano en la caja
 *  de entrega de la unidad. Dos veces el mismo trabajo.
 *
 *  Este módulo pone una barra fija con SAVE y SUBMIT en cualquiera de esas
 *  páginas y lleva las respuestas a unit_submissions, la misma tabla que ya
 *  usan worksheet.html y unit.html. Así:
 *    · SAVE   → borrador (draft:true). También se guarda solo mientras escribe.
 *    · SUBMIT → entrega (draft:false + handed_at). Sigue siendo editable.
 *  El profesor las corrige donde corrige todo lo demás: Portal → Productos de
 *  unidad → «Fichas entregadas», sin tocar su flujo.
 *
 *  Uso, después de que la página haya declarado su estado (store/cur/save):
 *
 *     NIS_WORK.attach({
 *       slug:'u4-reading',                    // identifica la actividad
 *       title:'Reading — …',
 *       grade:'g9', unit:4, week:1,
 *       storeKey:'u4rd_store',                // su clave de localStorage
 *       read:  () => ({ store:store, level:cur }),
 *       write: d => { store = d.store || {}; if(d.level) cur = d.level; },
 *       after: () => { drawTabs(); render(); }
 *     });
 *
 *  y una línea en el save() de la página:  NIS_WORK.touch();
 *
 *  Sin sesión del portal NO rompe nada: la página sigue funcionando con su
 *  localStorage de siempre y la barra explica que hay que entrar por el
 *  portal para que se guarde. Degradar en silencio sería peor que avisar.
 * ========================================================================= */
(function(){
'use strict';
if(window.NIS_WORK) return;

var CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4';
var ESPERA = 1500;                 // autoguardado: ms de calma antes de subir

var cfg = null, sb = null, me = null;
var sucio = false, tGuarda = null, entregado = false, arrancado = false;
var respaldo = null;               // copia local previa a un restore (para deshacer)
var handedAt = null;               // fecha de la entrega, si ya la hubo

/* Tiempo de uso. El panel de Tiempo de pantalla suma unit_submissions.duration_sec,
   pero hasta ahora una actividad solo declaraba tiempo cuando se TERMINABA (via
   activity_attempts): quien trabajaba media hora sin acabar figuraba con cero.
   Aqui se cuenta el rato que la actividad esta de verdad delante — pestana
   visible — y se acumula entre sesiones, que es lo que el profesor quiere ver. */
var hayFila = false;               // ya existe la fila en la cuenta
var segBase = 0;                   // lo que ya venia acumulado en la cuenta
var segAqui = 0;                   // lo de esta sesion
var relojInt = null;

function arrancaReloj(){
  if(relojInt) return;
  relojInt = setInterval(function(){
    if(document.visibilityState === 'hidden') return;
    segAqui++;
    /* Cada dos minutos se sube el rato acumulado, aunque el alumno no haya
       tocado nada: leer el texto tambien es trabajar. No se crea fila por
       quien solo abre y cierra — solo se anota tiempo de lo que ya tiene
       algo dentro o ya existia en la cuenta. */
    if(segAqui % 120 === 0 && (hayFila || cuenta(O.read() || {}))){
      sucio = true;
      programa();
    }
  }, 1000);
}
/* duration_sec es smallint: pasarse de 32767 haria fallar la fila entera y el
   alumno dejaria de guardar sin saber por que. */
function segundos(){ return Math.min(32000, segBase + segAqui); }
var O = null;                      // opciones de attach()

/* ---------- utilidades ---------- */
function esc(s){ return String(s == null ? '' : s)
  .replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

/* Cuántos campos tiene realmente contestados un estado. Es lo que decide si
   una copia "tiene trabajo dentro" y, por tanto, si merece ganar.

   La forma por defecto es la de las fichas de escritura ({store:{NIVEL:{ans}}}),
   pero un juego no tiene "respuestas": tiene una rejilla a medias, unas vidas
   y un cronómetro. Por eso una actividad puede traer su propio contador y su
   propio resumen para el profesor. */
function cuenta(estado){
  if(O && O.count) return O.count(estado) || 0;
  var st = (estado && estado.store) || {}, n = 0;
  Object.keys(st).forEach(function(lv){
    var ans = st[lv] && st[lv].ans;
    if(!ans) return;
    Object.keys(ans).forEach(function(k){
      var v = ans[k];
      if(v === '' || v == null || v === false) return;
      if(typeof v === 'object'){ if(Object.keys(v).length) n++; return; }
      n++;
    });
  });
  return n;
}

/* Aplanado legible para el profesor: el visor de fichas del portal pinta
   pares clave/valor, así que la clave lleva ya el nivel delante. */
function aplana(estado){
  if(O && O.answers) return O.answers(estado) || {};
  var st = (estado && estado.store) || {}, out = {};
  Object.keys(st).forEach(function(lv){
    var ans = st[lv] && st[lv].ans;
    if(!ans) return;
    Object.keys(ans).forEach(function(k){
      var v = ans[k];
      if(v === '' || v == null || v === false) return;
      out[lv + ' · ' + k] = (typeof v === 'object') ? JSON.stringify(v) : v;
    });
  });
  return out;
}

/* ---------- barra ---------- */
var barra = null, txt = null, bSave = null, bSend = null, notaCaja = null;

function pintaEstilos(){
  var s = document.createElement('style');
  s.textContent =
   '.nisw{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#fff;' +
   'border-top:1px solid #e3e5f3;box-shadow:0 -6px 24px rgba(36,76,119,.10);' +
   'padding:10px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;' +
   "font-family:'Montserrat','Segoe UI',system-ui,sans-serif}" +
   '.nisw .who{font-size:.8rem;color:#67718a;font-weight:600;margin-right:auto;' +
   'min-width:0;overflow:hidden;text-overflow:ellipsis}' +
   '.nisw .who b{color:#243b7a}' +
   '.nisw button{border:none;border-radius:10px;padding:10px 20px;font:700 .88rem/1 inherit;' +
   'cursor:pointer;font-family:inherit}' +
   '.nisw .b1{background:#fff;color:#2f5f93;border:1px solid #cdd6ea}' +
   '.nisw .b1:hover{background:#eef4fb}' +
   '.nisw .b2{background:#3b5bdb;color:#fff}' +
   '.nisw .b2:hover{background:#2f4bbd}' +
   '.nisw button[disabled]{opacity:.5;cursor:not-allowed}' +
   '.nisw .st{font-size:.82rem;color:#67718a;font-weight:600}' +
   '.nisw .st.ok{color:#2f9e44}.nisw .st.err{color:#e03131}' +
   '.nisw .undo{background:none;border:none;color:#3b5bdb;font:700 .8rem/1 inherit;' +
   'text-decoration:underline;cursor:pointer;padding:0}' +
   '.nisw-fb{position:fixed;left:0;right:0;bottom:60px;z-index:9998;background:#eef7ee;' +
   'border-top:1px solid #cbe6cd;padding:10px 16px;font:600 .84rem/1.5 ' +
   "'Montserrat','Segoe UI',system-ui,sans-serif;color:#1c6b23}" +
   '@media(max-width:640px){.nisw{padding:8px 12px;gap:8px}' +
   '.nisw .who{flex:1 0 100%;margin:0}.nisw button{padding:9px 14px;font-size:.8rem}}';
  document.head.appendChild(s);
}

/* La barra tapa el final de la página si nadie le hace sitio, y su altura no
   es fija: el aviso de "sin sesión" ocupa dos líneas en un móvil y una en un
   portátil. Se mide la barra de verdad en vez de adivinar un hueco. */
function hazSitio(){
  if(!barra || !barra.offsetWidth) return;      // aún sin layout: medir sería inventar
  var alto = barra.offsetHeight + (notaCaja ? notaCaja.offsetHeight : 0);
  document.body.style.paddingBottom = (alto + 24) + 'px';
  if(notaCaja) notaCaja.style.bottom = barra.offsetHeight + 'px';
}

function pintaBarra(){
  pintaEstilos();
  barra = document.createElement('div');
  barra.className = 'nisw';
  barra.innerHTML =
    '<span class="who" id="niswWho"></span>' +
    '<span class="st" id="niswSt"></span>' +
    '<button class="b1" id="niswSave">Save</button>' +
    '<button class="b2" id="niswSend">Submit</button>';
  document.body.appendChild(barra);
  txt   = barra.querySelector('#niswSt');
  bSave = barra.querySelector('#niswSave');
  bSend = barra.querySelector('#niswSend');
  hazSitio();
  /* La barra cambia de alto sola: al asentarse el layout, al girar el móvil o
     al cambiar el mensaje. Un listener de 'resize' no ve el primero de los
     tres, y medirla antes de que la página tenga ancho da un hueco absurdo. */
  if(window.ResizeObserver){ new ResizeObserver(hazSitio).observe(barra); }
  window.addEventListener('resize', hazSitio);
  window.addEventListener('orientationchange', function(){ setTimeout(hazSitio, 150); });
}

function di(m, clase){
  if(!txt) return;
  txt.textContent = m;
  txt.className = 'st' + (clase ? ' ' + clase : '');
  hazSitio();
}
function quien(html){
  var w = barra && barra.querySelector('#niswWho');
  if(w){ w.innerHTML = html; hazSitio(); }
}

function feedback(r){
  if(!r || !r.feedback) return;
  if(!notaCaja){
    notaCaja = document.createElement('div');
    notaCaja.className = 'nisw-fb';
    document.body.appendChild(notaCaja);
  }
  setTimeout(hazSitio, 0);
  notaCaja.innerHTML = '&#128227; <b>Your teacher:</b> ' +
    (r.score != null ? '<b>' + esc(r.score) + '/20</b> — ' : '') + esc(r.feedback);
}

/* ---------- guardado ---------- */
function fila(final){
  var estado = O.read() || {};
  return {
    student_id: me.id, grade: O.grade, unit: O.unit,
    milestone: 'a:' + O.slug, kind: 'worksheet',
    payload: {
      activity: O.slug, title: O.title, week: O.week || null,
      level: estado.level || null,
      answers: aplana(estado),     // lo que ve el profesor
      state: estado,               // lo que se le devuelve al alumno
      seconds: segundos(),
      draft: !final,
      handed_at: final ? new Date().toISOString() : null
    },
    duration_sec: segundos(),      // lo lee v_tiempo_pantalla
    updated_at: new Date().toISOString()
  };
}

function selloLocal(){
  try{ localStorage.setItem(O.storeKey + '_at', new Date().toISOString()); }catch(e){}
}

function sube(final){
  if(!sb || !me) return Promise.resolve({ ok:false, motivo:'no session' });
  var f = fila(final);
  /* Un borrador posterior a una entrega no puede borrar la fecha de entrega:
     el alumno sigue corrigiendo lo que ya entregó, no lo desentrega. */
  if(!final && entregado){ f.payload.draft = false; f.payload.handed_at = handedAt; }
  return sb.from('unit_submissions')
    .upsert(f, { onConflict:'student_id,grade,unit,milestone,kind' })
    .then(function(r){
      if(r.error) return { ok:false, motivo:r.error.message };
      if(final){ entregado = true; handedAt = f.payload.handed_at; }
      hayFila = true;
      sucio = false;
      selloLocal();
      return { ok:true };
    });
}

function programa(){
  clearTimeout(tGuarda);
  tGuarda = setTimeout(function(){
    if(!sucio) return;
    di('Saving…');
    sube(false).then(function(r){
      di(r.ok ? 'Saved' : 'Not saved — ' + r.motivo, r.ok ? 'ok' : 'err');
    });
  }, ESPERA);
}

/* ---------- arranque ---------- */
function cliente(){
  if(sb) return sb;
  if(!window.supabase || !window.supabase.createClient || !cfg) return null;
  sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);
  return sb;
}

function cargaSDK(){
  return new Promise(function(res){
    if(window.supabase && window.supabase.createClient) return res();
    var s = document.createElement('script');
    s.src = CDN;
    s.onload = function(){ res(); };
    s.onerror = function(){ res(); };
    document.head.appendChild(s);
  });
}

/* Decide qué copia gana, la del navegador o la de la cuenta, y lo dice.
   Nunca se tira nada: la local queda guardada por si el alumno deshace. */
function reconcilia(servidor){
  var local = O.read() || {};
  var nLocal = cuenta(local), nServidor = cuenta(servidor);
  if(!nServidor) return false;
  if(nLocal){
    var sello = null;
    try{ sello = localStorage.getItem(O.storeKey + '_at'); }catch(e){}
    var masNuevo = !sello || (servidor._updated_at && servidor._updated_at > sello);
    if(!masNuevo) return false;                 // lo de aquí es lo último: se queda
  }
  respaldo = JSON.parse(JSON.stringify(local));
  O.write(servidor);
  if(O.after) O.after();
  return true;
}

function arranca(){
  cfg = window.NIS_CONFIG || null;
  pintaBarra();
  di('Connecting…');
  bSave.disabled = bSend.disabled = true;

  cargaSDK()
    .then(function(){
      var c = cliente();
      if(!c) return null;
      return c.auth.getSession().catch(function(){ return null; });
    })
    .then(function(s){
      me = s && s.data && s.data.session ? s.data.session.user : null;
      if(!me){ sinSesion(); return null; }
      if(!O.auto) return null;
      /* Antes de preguntar por la fila hay que saber de que grado es: la
         clave de la entrega lo lleva dentro. */
      return sb.from('profiles').select('grade_id').eq('id', me.id).maybeSingle()
        .then(function(r){
          const g = r && r.data && r.data.grade_id;
          if(g) O.grade = 'g' + g;
        }, function(){});
    })
    .then(function(){
      if(!me) return null;
      return sb.from('unit_submissions')
        .select('payload,score,feedback,updated_at')
        .eq('student_id', me.id).eq('grade', O.grade).eq('unit', O.unit)
        .eq('milestone', 'a:' + O.slug).eq('kind', 'worksheet').maybeSingle()
        .then(function(q){ return q && q.data; }, function(){ return null; });
    })
    .then(function(prev){
      if(!me) return;
      conSesion(prev);
    })
    .catch(function(e){
      di('Could not connect — your work is still saved in this browser.', 'err');
      bSave.disabled = bSend.disabled = false;
    });
}

/* Sin sesión la página sigue siendo útil (localStorage), pero el alumno
   tiene que saber que lo suyo no sale de este navegador. */
function sinSesion(){
  quien('Your work stays in <b>this browser only</b>. Open the activity from the portal ' +
        'while signed in to save it to your account and hand it in.');
  di('Not signed in', 'err');
  bSave.disabled = bSend.disabled = false;
  bSave.onclick = bSend.onclick = function(){ di('Sign in from the portal first.', 'err'); };
  arrancado = true;
}

function conSesion(prev){
  var restaurado = false;
  if(prev && prev.payload){
    entregado = prev.payload.draft === false;
    handedAt  = prev.payload.handed_at || null;
    segBase   = Number(prev.payload.seconds) || 0;
    hayFila   = true;
    var estado = prev.payload.state;
    if(estado){ estado._updated_at = prev.updated_at; restaurado = reconcilia(estado); }
    feedback(prev);
  }

  quien(entregado
    ? 'Handed in &#10003; — you can still change it and submit again.'
    : 'Saved to your account: you can carry on from any computer.');
  di(restaurado ? 'Restored from your account' : (prev ? 'Saved' : 'Ready'),
     (restaurado || prev) ? 'ok' : '');

  if(restaurado && respaldo && cuenta(respaldo)){
    var u = document.createElement('button');
    u.className = 'undo';
    u.textContent = 'Undo — keep what was on this computer';
    u.onclick = function(){
      O.write(respaldo);
      if(O.after) O.after();
      sucio = true;
      u.remove();
      di('Using this computer’s copy — press Save to keep it.');
    };
    barra.insertBefore(u, txt);
  }

  bSave.disabled = bSend.disabled = false;
  arrancado = true;
  arrancaReloj();

  bSave.onclick = function(){
    clearTimeout(tGuarda);
    bSave.disabled = true; di('Saving…');
    sube(false).then(function(r){
      bSave.disabled = false;
      di(r.ok ? 'Saved ✓' : 'Could not save — ' + r.motivo, r.ok ? 'ok' : 'err');
    });
  };

  bSend.onclick = function(){
    if(!cuenta(O.read() || {})){ di(O.vacio || 'Answer something first.', 'err'); return; }
    clearTimeout(tGuarda);
    bSend.disabled = true; di('Sending…');
    sube(true).then(function(r){
      bSend.disabled = false;
      if(!r.ok){ di('Could not submit — ' + r.motivo, 'err'); return; }
      quien('Handed in &#10003; — you can still change it and submit again.');
      di('Handed in ✓ — your teacher can see it now.', 'ok');
    });
  };

  /* Salir de la pestaña no puede costar lo último que escribió: si queda
     algo pendiente, se sube ya, sin esperar a que venza el temporizador. */
  const alSalir = function(){
    if(sucio || (hayFila && segAqui > 5)){ clearTimeout(tGuarda); sube(false); }
  };
  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === 'hidden') alSalir();
  });
  window.addEventListener('pagehide', alSalir);
}

/* Actividades cuyo NOMBRE no dice a que unidad pertenecen. El resto se
   deducen solas del archivo, que es lo que permite que el mismo bloque de
   codigo valga para los 216 clones franceses que genera gen_fr_u4.py: si
   hubiera que escribir el grado a mano, cada clon nacería mal. */
var SUELTAS = {
  'reading-pretending-fine'     : ['g9', 4, 1],
  'listening-mind-over-matter'  : ['g9', 4, 1],
  'crossword-mind-over-matter'  : ['g9', 4, 1],
  'wordsearch-mind-over-matter' : ['g9', 4, 1],
  'word-wheel-u4-by-level'      : ['g9', 4, null],
  'crossword-digital-footprint' : ['g9', 3, null],
  'wordsearch-digital-footprint': ['g9', 3, null]
};

function ficha(){
  var f = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
  if(!f) f = 'actividad';
  var m;
  if(SUELTAS[f]) return { slug:f, grade:SUELTAS[f][0], unit:SUELTAS[f][1], week:SUELTAS[f][2] };
  m = /^(.+)-fr-g(\d+)-u(\d+)w(\d+)$/.exec(f);        // frances: por grado y semana
  if(m) return { slug:m[1]+'-fr-u'+m[3]+'w'+m[4], grade:'g'+m[2], unit:+m[3], week:+m[4] };
  m = /^(.+)-g(\d+)u(\d+)$/.exec(f);                   // primaria: memory-g2u4
  if(m) return { slug:m[1]+'-u'+m[3], grade:'g'+m[2], unit:+m[3], week:null };
  m = /^(.+)-u(\d+)w(\d+)$/.exec(f);                   // ingles: por semana
  if(m) return { slug:f, grade:'g9', unit:+m[2], week:+m[3] };
  m = /^(.+)-u(\d+)(?:-by-level)?$/.exec(f);            // ingles: por nivel
  if(m) return { slug:f, grade:'g9', unit:+m[2], week:null };
  /* Practica libre por nivel MCER (crosswords, wordsearches, word wheel…):
     no cuelga de ninguna unidad NI de ningun grado — la usa quien quiera.
     El grado se toma del propio alumno al conectar; ponerlo aqui seria
     inventarselo. */
  return { slug:f, grade:'g9', unit:0, week:null, auto:true };
}

/* Atajo para las paginas que YA guardaban en localStorage bajo un prefijo
   (mejores marcas, borradores): sincroniza esas claves con la cuenta sin
   tener que entender su motor. Lo que se guarda sigue siendo suyo; aqui solo
   deja de vivir en un unico navegador. */
/* Se avisa sola cuando la pagina escribe bajo su prefijo: asi estas paginas
   no necesitan que se les meta un NIS_WORK.touch() dentro del motor. Se
   envuelve setItem una sola vez y sin cambiar lo que hace. */
var _lsEnvuelto = false, _lsPrefijos = [];
function vigilaLocalStorage(pref){
  _lsPrefijos.push(pref);
  if(_lsEnvuelto) return;
  try{
    var original = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function(k, v){
      var r = original(k, v);
      try{
        for(var i = 0; i < _lsPrefijos.length; i++){
          if(String(k).indexOf(_lsPrefijos[i]) === 0){
            if(window.NIS_WORK) window.NIS_WORK.touch();
            break;
          }
        }
      }catch(e){}
      return r;
    };
    _lsEnvuelto = true;
  }catch(e){}
}

function porPrefijo(pref, extra){
  vigilaLocalStorage(pref);
  return Object.assign({
    read: function(){
      var out = {};
      try{
        Object.keys(localStorage).forEach(function(k){
          if(k.indexOf(pref) === 0) out[k.slice(pref.length)] = localStorage.getItem(k);
        });
      }catch(e){}
      return { store: out };
    },
    write: function(d){
      var p = (d && d.store) || {};
      try{ Object.keys(p).forEach(function(k){ localStorage.setItem(pref + k, p[k]); }); }catch(e){}
    },
    count: function(d){ return Object.keys(((d || {}).store) || {}).length; },
    answers: function(d){
      var p = (d && d.store) || {}, out = {};
      Object.keys(p).forEach(function(k){ out[k.replace(/_/g, ' / ')] = String(p[k]); });
      return out;
    }
  }, extra || {});
}

function porResultados(extra){
  var RES = {};
  function engancha(){
    if(!window.NISACT || typeof window.NISACT.submit !== 'function' || window.NISACT.__nisw) return;
    var original = window.NISACT.submit;
    window.NISACT.submit = function(o){
      try{
        var k = (o && (o.title || o.level)) || 'Resultado';
        RES[k] = { score:o.score, total:o.total, duration:o.duration, lives:o.lives };
        if(window.NIS_WORK) window.NIS_WORK.touch();
      }catch(e){}
      return original.apply(this, arguments);
    };
    window.NISACT.__nisw = true;
  }
  engancha();
  /* Algunas paginas declaran NISACT despues; se reintenta una vez. */
  setTimeout(engancha, 0);
  return Object.assign({
    vacio: 'Finish a round first — then you can hand it in.',
    read:  function(){ return { store: RES }; },
    write: function(d){ var p = (d && d.store) || {};
                        Object.keys(p).forEach(function(k){ RES[k] = p[k]; }); },
    after: function(){},
    count: function(d){ return Object.keys(((d || {}).store) || {}).length; },
    answers: function(d){
      var p = (d && d.store) || {}, out = {};
      Object.keys(p).forEach(function(k){
        var x = p[k] || {}, t = Math.max(0, Math.round(x.duration || 0));
        out[k] = (x.score || 0) + '/' + (x.total || 0) + ' / ' +
                 String(Math.floor(t/60)).padStart(2,'0') + ':' + String(t%60).padStart(2,'0');
      });
      return out;
    }
  }, extra || {});
}

window.NIS_WORK = {
  /* De que actividad es esta pagina, deducido del nombre del archivo. */
  ficha: ficha,

  /* Adaptador para paginas que ya usaban localStorage con un prefijo. */
  porPrefijo: porPrefijo,

  /* Adaptador para paginas que no guardan NADA y solo reportan el resultado
     a activity_attempts al terminar (backshifting, reported speech lab…).
     Se envuelve ese reporte en vez de tocar su motor: cada resultado que
     mandan queda tambien en la cuenta del alumno y se puede entregar. */
  porResultados: porResultados,

  /* Lo llama el save() de la página en cada tecla: marca sucio y programa
     la subida. No sube en cada pulsación — eso sería una petición por letra. */
  touch: function(){
    if(!arrancado || !me) return;
    sucio = true;
    di('Saving…');
    programa();
  },

  attach: function(opciones){
    O = opciones;
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', arranca);
    } else arranca();
  }
};
})();
