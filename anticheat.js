/* =========================================================================
 *  NIS Anti-Cheat  ·  control de honestidad para las actividades del Portal
 * -------------------------------------------------------------------------
 *  Una sola línea por actividad:
 *
 *     <script src="anticheat.js?v=1" data-activity="opinion-essay"
 *             data-label="Opinion Essay"></script>
 *
 *  o, para pasar el estado de la actividad (snapshot) y reaccionar al bloqueo:
 *
 *     NISAntiCheat.init({
 *       activity:'opinion-essay', label:'Opinion Essay',
 *       level:'B2', topic:'social-media',
 *       getState: () => ({ ... })   // se guarda como evidencia
 *     });
 *
 *  Reglas (3 vidas):
 *    · Salida 1  → aviso: "Te quedan 2 vidas. La próxima se reporta al docente."
 *    · Salida 2  → REPORTE al docente. "Te queda 1 vida. La próxima elimina la actividad."
 *    · Salida 3  → actividad ELIMINADA, nota C, se notifica al docente (y este a los padres).
 *
 *  "Salir" = cambiar de pestaña / app / ventana (visibilitychange o blur).
 *  NO se puede capturar la pantalla de otras pestañas (lo prohíbe el navegador):
 *  se registra evidencia fiable -> # de salidas, segundos fuera, hora, equipo,
 *  navegador, SO y un snapshot del estado de ESTA actividad.
 *
 *  Compatibilidad: Chrome/Safari en Windows, macOS, Android, iPad, iPhone.
 *  El motor degrada con elegancia: si no hay sesión ni Supabase, sigue
 *  aplicando vidas + bloqueo + bloqueo de copiar/pegar localmente.
 * ========================================================================= */
(function () {
  'use strict';
  if (window.NISAntiCheat && window.NISAntiCheat.__ready) return;

  var SUPA_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4';
  var CFG = window.NIS_CONFIG || null;
  var sb = null;                 // cliente Supabase (si se logra cargar)
  var me = null;                 // { id, name, email, grade, guardian_name, guardian_phone }
  var opts = null;               // opciones de init()
  var st = { count: 0, locked: false, firstAt: null };
  var armed = false;             // tracking activo
  var paused = false;            // pausa temporal (print / portapapeles propios)
  var awayActive = false;        // hay un episodio "fuera" en curso
  var awayStart = 0;

  /* ---------- utilidades ---------- */
  function nowMs() { return (window.performance && performance.now) ? performance.now() : (+new Date()); }
  function lsKey() { return 'nis_ac_' + (opts.activity || 'activity') + '_' + (me ? me.id : 'anon'); }
  function loadLS() {
    try { var r = JSON.parse(localStorage.getItem(lsKey()) || 'null'); if (r) st = Object.assign(st, r); } catch (e) {}
  }
  function saveLS() { try { localStorage.setItem(lsKey(), JSON.stringify(st)); } catch (e) {} }

  function deviceInfo() {
    var ua = navigator.userAgent || '';
    var plat = navigator.platform || '';
    // OS / navegador legibles (best-effort)
    var os = /iPhone|iPad|iPod/i.test(ua) ? 'iOS' : /Android/i.test(ua) ? 'Android'
           : /Windows/i.test(ua) ? 'Windows' : /Mac OS X/i.test(ua) ? 'macOS'
           : /Linux/i.test(ua) ? 'Linux' : plat || 'Desconocido';
    var br = /Edg\//i.test(ua) ? 'Edge' : /OPR\//i.test(ua) ? 'Opera'
           : /Chrome\//i.test(ua) && !/Edg\//i.test(ua) ? 'Chrome'
           : /CriOS/i.test(ua) ? 'Chrome iOS'
           : /Firefox\//i.test(ua) ? 'Firefox'
           : /Safari\//i.test(ua) ? 'Safari' : 'Desconocido';
    return {
      os: os, browser: br, ua: ua, platform: plat,
      screen: (screen.width + 'x' + screen.height),
      language: navigator.language || '',
      touch: ('ontouchstart' in window) || navigator.maxTouchPoints > 0
    };
  }

  /* ---------- carga perezosa de Supabase + config ---------- */
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src;
      s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  function loadConfig() {
    if (window.NIS_CONFIG) { CFG = window.NIS_CONFIG; return Promise.resolve(); }
    return loadScript('config.js').then(function () { CFG = window.NIS_CONFIG || null; }).catch(function () {});
  }
  function ensureSupabase() {
    return loadConfig().then(function () {
      if (!CFG) return null;
      var ready = (window.supabase && window.supabase.createClient)
        ? Promise.resolve() : loadScript(SUPA_CDN).catch(function () {});
      return ready.then(function () {
        if (window.supabase && window.supabase.createClient) {
          try { sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY); } catch (e) { sb = null; }
        }
        return sb;
      });
    });
  }
  function loadMe() {
    if (!sb) return Promise.resolve(null);
    return sb.auth.getSession().then(function (r) {
      var u = r && r.data && r.data.session && r.data.session.user;
      if (!u) return null;
      return sb.from('profiles').select('full_name,email,role,guardian_name,guardian_phone,grades(name)').eq('id', u.id).single()
        .then(function (p) {
          var d = p.data || {};
          me = {
            id: u.id, email: d.email || u.email || '', role: d.role || 'student',
            name: d.full_name || u.email || '',
            grade: (d.grades && d.grades.name) || '',
            guardian_name: d.guardian_name || '', guardian_phone: d.guardian_phone || ''
          };
          return me;
        }).catch(function () { me = { id: u.id, email: u.email || '', name: u.email || '' }; return me; });
    }).catch(function () { return null; });
  }
  // Restaura el # de salidas desde la BD aunque el alumno borre el localStorage.
  function syncFromDB() {
    if (!sb || !me) return Promise.resolve();
    return sb.from('anticheat_incidents')
      .select('switch_count,event')
      .eq('student_id', me.id).eq('activity', opts.activity)
      .order('created_at', { ascending: false }).limit(1)
      .then(function (r) {
        var row = r && r.data && r.data[0];
        if (row) {
          if (typeof row.switch_count === 'number' && row.switch_count > st.count) st.count = row.switch_count;
          if (row.event === 'locked') st.locked = true;
          saveLS();
        }
      }).catch(function () {});
  }

  /* ---------- registro de incidentes ---------- */
  function record(event, extra) {
    var dev = deviceInfo();
    var payload = Object.assign({
      activity: opts.activity, activity_label: opts.label || opts.activity,
      level: val(opts.level) || null, topic: val(opts.topic) || null,
      event: event, lives_left: Math.max(0, (opts.maxLives - st.count)),
      switch_count: st.count, os: dev.os, browser: dev.browser,
      platform: dev.platform, screen: dev.screen, language: dev.language,
      user_agent: dev.ua,
      student_id: me ? me.id : null, student_name: me ? me.name : '',
      student_email: me ? me.email : '', grade: me ? me.grade : '',
      guardian_name: me ? me.guardian_name : '', guardian_phone: me ? me.guardian_phone : '',
      grade_assigned: extra && extra.grade_assigned || null,
      snapshot: (opts.getState ? safeState() : null),
      at: new Date().toISOString()
    }, extra || {});

    // 1) Supabase (si hay sesión)
    if (sb && me) {
      sb.from('anticheat_incidents').insert({
        student_id: me.id, activity: payload.activity, activity_label: payload.activity_label,
        level: payload.level, topic: payload.topic, event: event,
        lives_left: payload.lives_left, switch_count: st.count, seconds_away: extra && extra.seconds_away || null,
        os: dev.os, browser: dev.browser, platform: dev.platform, screen: dev.screen,
        language: dev.language, user_agent: dev.ua, grade_assigned: payload.grade_assigned,
        snapshot: payload.snapshot
      }).then(function () {}, function () {});
    }
    // 2) Webhook al docente (solo en los eventos importantes)
    if ((event === 'reported' || event === 'locked') && CFG && CFG.WRITING_WEBHOOK) {
      try {
        fetch(CFG.WRITING_WEBHOOK, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(Object.assign({ type: 'anticheat_incident' }, payload))
        });
      } catch (e) {}
    }
  }
  function safeState() {
    try { return opts.getState() || null; } catch (e) { return null; }
  }
  function val(x) { try { return (typeof x === 'function') ? x() : x; } catch (e) { return null; } }

  /* ---------- UI: modal de aviso y bloqueo ---------- */
  function ensureStyles() {
    if (document.getElementById('nis-ac-style')) return;
    var s = document.createElement('style'); s.id = 'nis-ac-style';
    s.textContent =
      '.nis-ac-ov{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;' +
      'padding:20px;background:rgba(15,23,42,.72);backdrop-filter:blur(3px);font-family:"Montserrat",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '.nis-ac-card{background:#fff;border-radius:18px;max-width:460px;width:100%;padding:26px 26px 22px;box-shadow:0 24px 70px rgba(0,0,0,.4);text-align:center}' +
      '.nis-ac-ic{font-size:46px;line-height:1;margin-bottom:8px}' +
      '.nis-ac-card h2{font-size:20px;margin:0 0 8px;color:#b91c1c;font-weight:800}' +
      '.nis-ac-card.warn h2{color:#b45309}' +
      '.nis-ac-card p{color:#334155;font-size:14.5px;line-height:1.55;margin:0 0 10px}' +
      '.nis-ac-lives{font-size:26px;letter-spacing:4px;margin:6px 0 12px}' +
      '.nis-ac-btn{background:#2d5a8d;color:#fff;border:0;border-radius:11px;padding:12px 22px;font:inherit;font-weight:700;font-size:15px;cursor:pointer}' +
      '.nis-ac-btn:hover{background:#244c77}' +
      '.nis-ac-meta{font-size:11.5px;color:#94a3b8;margin-top:12px}' +
      '.nis-ac-lock{background:#7f1d1d;color:#fff!important}.nis-ac-lock h2{color:#fff!important}.nis-ac-lock p{color:#fee2e2!important}' +
      'body.nis-ac-locked{overflow:hidden}';
    document.head.appendChild(s);
  }
  function hearts() {
    var left = Math.max(0, opts.maxLives - st.count), out = '';
    for (var i = 0; i < opts.maxLives; i++) out += (i < left ? '❤️' : '🖤');
    return out;
  }
  function modal(html, isLock) {
    ensureStyles();
    var prev = document.getElementById('nis-ac-modal'); if (prev) prev.remove();
    var ov = document.createElement('div'); ov.className = 'nis-ac-ov'; ov.id = 'nis-ac-modal';
    ov.innerHTML = '<div class="nis-ac-card' + (isLock ? ' lock nis-ac-lock' : ' warn') + '">' + html + '</div>';
    document.body.appendChild(ov);
    if (!isLock) {
      var b = ov.querySelector('.nis-ac-btn');
      if (b) b.addEventListener('click', function () { ov.remove(); });
    }
    return ov;
  }
  function showWarning(level) {
    // level 1 = aviso; 2 = reportado
    var html;
    if (level === 1) {
      html = '<div class="nis-ac-ic">⚠️</div><h2>Saliste de la actividad</h2>' +
        '<div class="nis-ac-lives">' + hearts() + '</div>' +
        '<p>Te quedan <b>2 vidas</b>. La actividad detecta cuando cambias de pestaña, app o ventana.</p>' +
        '<p><b>La próxima salida será reportada a tu docente.</b></p>' +
        '<button class="nis-ac-btn">Volver a la actividad</button>';
    } else {
      html = '<div class="nis-ac-ic">🚩</div><h2>Has sido reportado</h2>' +
        '<div class="nis-ac-lives">' + hearts() + '</div>' +
        '<p>Saliste de nuevo. Esto ha sido <b>reportado a tu docente</b>.</p>' +
        '<p>Te queda <b>1 vida</b>. La próxima salida <b>eliminará la actividad</b> y tu nota será <b>C</b>.</p>' +
        '<button class="nis-ac-btn">Entiendo, volver</button>';
    }
    modal(html, false);
  }
  function showLock() {
    var who = me ? (me.name + (me.grade ? ' · ' + me.grade : '')) : '';
    var html = '<div class="nis-ac-ic">⛔</div><h2>Actividad eliminada</h2>' +
      '<div class="nis-ac-lives">🖤🖤🖤</div>' +
      '<p>Saliste de la actividad demasiadas veces. Por las reglas de honestidad, esta actividad ha sido <b>eliminada</b>.</p>' +
      '<p>Tu nota es <b>C</b>. Se ha notificado a tu <b>docente</b>, quien informará a tus <b>padres</b>.</p>' +
      (who ? '<div class="nis-ac-meta">' + who + '</div>' : '') +
      '<div class="nis-ac-meta">Si crees que es un error, habla con tu docente.</div>';
    modal(html, true);
    document.body.classList.add('nis-ac-locked');
    if (opts.onLock) { try { opts.onLock(); } catch (e) {} }
  }

  /* ---------- lógica de vidas ---------- */
  function penalize(secondsAway) {
    if (st.locked) return;
    if (!st.firstAt) st.firstAt = new Date().toISOString();
    st.count++;
    saveLS();
    if (st.count >= opts.maxLives) {
      st.locked = true; saveLS();
      record('locked', { grade_assigned: 'C', seconds_away: secondsAway });
      showLock();
    } else if (st.count === 2) {
      record('reported', { seconds_away: secondsAway });
      showWarning(2);
    } else {
      record('tab_switch', { seconds_away: secondsAway });
      showWarning(1);
    }
  }

  /* ---------- detección de salida ---------- */
  function beginAway() {
    if (!armed || paused || st.locked || awayActive) return;
    awayActive = true; awayStart = nowMs();
  }
  function endAway(minMs) {
    if (!awayActive) return;
    awayActive = false;
    var dt = nowMs() - awayStart;
    if (minMs && dt < minMs) return;          // ignora parpadeos triviales (ruta blur)
    penalize(Math.round(dt / 100) / 10);      // segundos con 1 decimal
  }
  function onVisibility() {
    if (document.visibilityState === 'hidden') beginAway();
    else endAway(0);                          // visibilitychange ya es señal fuerte
  }
  function onBlur() { beginAway(); }
  function onFocus() { endAway(600); }        // ventana: exige ≥600ms para evitar falsos positivos

  /* ---------- bloqueo de copiar/pegar/traductores ---------- */
  function blockClipboard() {
    var stop = function (e) { if (!st.locked && opts.blockCopy !== false) { e.preventDefault(); e.stopPropagation(); return false; } };
    ['copy', 'cut', 'paste', 'contextmenu', 'dragstart', 'drop'].forEach(function (ev) {
      document.addEventListener(ev, stop, true);
    });
    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x'].indexOf(k) >= 0) {
        if (opts.blockCopy !== false) { e.preventDefault(); e.stopPropagation(); }
      }
    }, true);
  }
  function discourageTranslate() {
    // Desalienta el traductor integrado (Chrome) y lo detecta si igual se activa.
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
    if (!document.querySelector('meta[name="google"]')) {
      var m = document.createElement('meta'); m.name = 'google'; m.content = 'notranslate';
      document.head.appendChild(m);
    }
    try {
      var obs = new MutationObserver(function () {
        var h = document.documentElement;
        if (h.classList.contains('translated-ltr') || h.classList.contains('translated-rtl')) {
          obs.disconnect();
          if (!st.locked) record('translate_detected', {});
        }
      });
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    } catch (e) {}
  }

  /* ---------- API pública ---------- */
  function pause() { paused = true; awayActive = false; }
  function resume() { paused = false; }
  function getStatus() { return { count: st.count, livesLeft: Math.max(0, opts.maxLives - st.count), locked: st.locked }; }

  function arm() {
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pageshow', function () { if (document.visibilityState === 'visible') endAway(0); });
    // No penalizar por el diálogo de impresión propio.
    window.addEventListener('beforeprint', pause);
    window.addEventListener('afterprint', function () { setTimeout(resume, 300); });
    armed = true;
  }

  function init(o) {
    opts = Object.assign({ activity: 'activity', label: '', maxLives: 3 }, o || {});
    if (window.NISAntiCheat.__inited) return; window.NISAntiCheat.__inited = true;

    ensureSupabase().then(function () { return loadMe(); }).then(function () {
      // Docentes y administradores quedan exentos (pueden revisar sin bloquearse).
      if (me && (me.role === 'teacher' || me.role === 'admin')) return;
      loadLS();
      return syncFromDB().then(function () {
        if (st.locked) { showLock(); return; }   // ya estaba bloqueada → no se reabre
        blockClipboard();
        discourageTranslate();
        arm();
      });
    });
  }

  // Auto-init desde el atributo data-activity del propio <script>.
  function autoInit() {
    var s = document.currentScript ||
      (function () { var a = document.getElementsByTagName('script'); for (var i = a.length - 1; i >= 0; i--) if (/anticheat\.js/.test(a[i].src)) return a[i]; return null; })();
    var act = s && s.getAttribute('data-activity');
    if (act) {
      init({
        activity: act,
        label: (s.getAttribute('data-label')) || document.title || act,
        level: s.getAttribute('data-level') || null,
        maxLives: parseInt(s.getAttribute('data-lives') || '3', 10) || 3
      });
    }
  }

  window.NISAntiCheat = { init: init, pause: pause, resume: resume, getStatus: getStatus, __ready: true, __inited: false };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
})();
