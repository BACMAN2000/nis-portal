/* writing-trace.js — cómo se escribió un texto, no solo qué se escribió.
   ------------------------------------------------------------------
   Regla del colegio (11-sep-2026): los trabajos escritos se TECLEAN en la
   caja; nada se pega. Este archivo la hace cumplir y deja rastro:

   - Bloquea pegar y soltar texto en toda <textarea> de la página (paste,
     drop y el beforeinput de los menús táctiles), avisa debajo de la caja
     y anota el intento (cuándo y cuántos caracteres traía).
   - Cuenta pulsaciones, caracteres escritos y borrados, segundos con la
     caja enfocada y la pestaña visible, y guarda una instantánea del
     número de palabras cada 30 s (cómo creció el texto).
   - No juzga nada: el profesor ve «38 min · 2.150 pulsaciones · sin
     pegados» o «2 pegados bloqueados (2.400 caracteres)» y decide él. Por
     eso no hay vidas ni bloqueos, que es lo que dejó fuera a un alumno con
     el anti-cheat.

   Excepción por alumno (11-sep-2026): un alumno que ya tenía el texto
   escrito fuera del portal puede pegarlo si el profesor le abre la puerta
   con `profiles.paste_allowed_until` (una fecha; pasada, vuelve el bloqueo;
   solo un admin la cambia, la protege el trigger de columnas privilegiadas).
   Con la puerta abierta el pegado ENTRA, pero queda anotado igual — con
   `ok:true` — y el profesor lee «📋 1 paste allowed by the teacher (1.200
   chars)». Se consulta a PostgREST con el token de la sesión, sin abrir
   otro cliente de Supabase (ver config.js); si no contesta, se bloquea.

   Lo persiste cada página en su payload (`trace`): unit.html (productos),
   unit-exam.html (Writing), worksheet.html (por campo) y activity-save.js
   (todas las actividades). Los detectores de IA no dan certeza; el rastro
   de cómo llegó el texto a la caja, sí.

   API:  WRITING_TRACE.of(textarea)            → el rastro (objeto plano)
         WRITING_TRACE.all()                   → { clave: rastro } de la página
         WRITING_TRACE.restore(textarea, t)    → sigue contando desde un rastro guardado
         WRITING_TRACE.aviso()                 → HTML del aviso para el alumno
         WRITING_TRACE.resumen(t)              → una línea para el profesor
         WRITING_TRACE.pegarPermitido()        → true si este alumno puede pegar ahora
   Una caja con data-trace="off" se deja en paz. */
(function(){
  'use strict';
  var SNAP_MS = 30000, MAX_SNAPS = 60, MAX_PASTES = 30;
  var reg = (typeof Map !== 'undefined') ? new Map() : null;
  if(!reg) return;

  function ahora(){ return new Date().toISOString(); }
  function palabras(s){ var m = String(s || '').trim().match(/\S+/g); return m ? m.length : 0; }
  function nuevo(){
    return { v:1, keys:0, typed:0, deleted:0, pastes:[], blocked:0, allowed:0, active_s:0,
             started:null, last:null, snaps:[] };
  }
  function clave(ta){
    if(ta.id) return ta.id;
    if(ta.dataset && ta.dataset.campo) return ta.dataset.campo;
    if(ta.name) return ta.name;
    var todas = document.querySelectorAll('textarea');
    for(var i = 0; i < todas.length; i++) if(todas[i] === ta) return 'ta' + i;
    return 'ta';
  }

  /* ---------- estilos, una vez ---------- */
  function estilos(){
    if(document.getElementById('wt-css')) return;
    var s = document.createElement('style'); s.id = 'wt-css';
    s.textContent =
      '.wt-aviso{border-left:4px solid #d97706;background:rgba(245,158,11,.12);border-radius:0 10px 10px 0;' +
        'padding:10px 14px;margin:0 0 10px;font-size:.86rem;line-height:1.5}' +
      '.wt-aviso b{font-weight:800}' +
      '.wt-bloq{border-left:4px solid #dc2626;background:rgba(220,38,38,.10);border-radius:0 8px 8px 0;' +
        'padding:7px 12px;margin:6px 0 0;font-size:.82rem;line-height:1.4}' +
      '.wt-ok{border-left:4px solid #2563eb;background:rgba(37,99,235,.10);border-radius:0 8px 8px 0;' +
        'padding:7px 12px;margin:6px 0 0;font-size:.82rem;line-height:1.4}' +
      '.wt-aviso.wt-abierto{border-left-color:#2563eb;background:rgba(37,99,235,.10)}';
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------- la excepción por alumno ---------- */
  var permiso = null;                       // { hasta: ms } cuando el profesor abrió la puerta
  function pegarPermitido(){ return !!(permiso && permiso.hasta > Date.now()); }
  function token(){
    try{
      var k = Object.keys(localStorage).filter(function(x){ return /^sb-.*-auth-token$/.test(x); })[0];
      var v = k && JSON.parse(localStorage.getItem(k));
      return v && (v.access_token || (v.currentSession && v.currentSession.access_token)) || null;
    }catch(_){ return null; }
  }
  function uid(t){ try{ return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).sub || null; }catch(_){ return null; } }
  function fechaCorta(ms){
    try{ return new Date(ms).toLocaleString('en', { weekday:'short', day:'numeric', month:'short', hour:'numeric', minute:'2-digit' }); }
    catch(_){ return new Date(ms).toString(); }
  }
  /* Tres intentos separados 4 s: el cliente de la página puede estar
     renovando el token justo ahora. Sin respuesta clara, se queda cerrado. */
  function compruebaPermiso(intento){
    var cfg = window.NIS_CONFIG; if(!cfg || !cfg.SUPABASE_URL || !cfg.SUPABASE_KEY) return;
    function otra(){ if(intento < 2) setTimeout(function(){ compruebaPermiso(intento + 1); }, 4000); }
    var t = token(), u = t && uid(t);
    if(!u){ otra(); return; }
    fetch(cfg.SUPABASE_URL + '/rest/v1/profiles?id=eq.' + encodeURIComponent(u) + '&select=paste_allowed_until',
          { headers: { apikey: cfg.SUPABASE_KEY, Authorization: 'Bearer ' + t } })
      .then(function(r){ return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function(filas){
        var h = filas && filas[0] && filas[0].paste_allowed_until;
        var ms = h ? Date.parse(h) : NaN;
        if(ms && ms > Date.now()){ permiso = { hasta: ms }; pintaPermiso(); }
      })
      .catch(otra);
  }
  /* Los avisos ya pintados (a mano o automáticos) cambian de texto. */
  function pintaPermiso(){
    var avisos = document.querySelectorAll('.wt-aviso');
    for(var i = 0; i < avisos.length; i++){ avisos[i].innerHTML = avisoTexto(); avisos[i].classList.add('wt-abierto'); }
  }

  /* ---------- el aviso ---------- */
  function avisoTexto(){
    if(pegarPermitido()) return '📋 <b>Your teacher has allowed you to paste</b> until ' + fechaCorta(permiso.hasta) +
      '. Whatever you paste is recorded (when and how many characters) and your teacher will see it next to ' +
      'your keystrokes and minutes in the box.';
    return '✍️ <b>Type your text in the box.</b> Pasting and dropping text ' +
      'into it is switched off: anything you try to paste is blocked and recorded. Your teacher can see how ' +
      'each text was written — time, keystrokes, paste attempts. Your own words, typed here.';
  }
  function aviso(){
    return '<div class="wt-aviso wt-aviso-top' + (pegarPermitido() ? ' wt-abierto' : '') + '">' + avisoTexto() + '</div>';
  }
  function bloqueado(ta, chars){
    var el = ta.nextElementSibling;
    if(!el || !el.classList || !el.classList.contains('wt-bloq')){
      el = document.createElement('div'); el.className = 'wt-bloq';
      ta.insertAdjacentElement('afterend', el);
    }
    el.innerHTML = '🚫 <b>Pasting is off.</b> Type it here in your own words. ' +
      '(' + (chars ? chars + ' characters, ' : '') + 'recorded for your teacher.)';
    clearTimeout(el._t); el._t = setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 8000);
  }
  function permitido(ta, chars){
    var el = ta.nextElementSibling;
    if(!el || !el.classList || !el.classList.contains('wt-ok')){
      el = document.createElement('div'); el.className = 'wt-ok';
      ta.insertAdjacentElement('afterend', el);
    }
    el.innerHTML = '📋 <b>Pasted' + (chars ? ' ' + chars.toLocaleString('en') + ' characters' : '') + '.</b> ' +
      'Allowed by your teacher and recorded.';
    clearTimeout(el._t); el._t = setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 8000);
  }

  /* ---------- el rastro de una caja ---------- */
  function engancha(ta){
    if(reg.has(ta) || (ta.dataset && ta.dataset.trace === 'off')) return;
    estilos();
    var t = nuevo(), foco = false, desde = 0, ultimoPegado = 0, ultimaDecision = false, snapTimer = null;
    reg.set(ta, t);

    function acumula(){
      if(foco && !document.hidden && desde) t.active_s += Math.max(0, Math.round((Date.now() - desde) / 1000));
      desde = Date.now();
    }
    /* Devuelve true si el pegado ENTRA (puerta abierta por el profesor);
       false si se bloquea. En los dos casos queda anotado. */
    function registraPegado(chars){
      var hoy = Date.now();
      if(hoy - ultimoPegado < 80) return ultimaDecision;   // paste + beforeinput del mismo gesto
      ultimoPegado = hoy;
      ultimaDecision = pegarPermitido();
      if(ultimaDecision){
        t.allowed++;
        if(t.pastes.length < MAX_PASTES) t.pastes.push({ t:ahora(), chars:chars || 0, ok:true });
        permitido(ta, chars);
      } else {
        t.blocked++;
        if(t.pastes.length < MAX_PASTES) t.pastes.push({ t:ahora(), chars:chars || 0 });
        bloqueado(ta, chars);
      }
      return ultimaDecision;
    }
    function snap(){
      snapTimer = null;
      var n = palabras(ta.value), u = t.snaps[t.snaps.length - 1];
      if(u && u[1] === n) return;
      t.snaps.push([ahora(), n]);
      if(t.snaps.length > MAX_SNAPS) t.snaps.splice(0, t.snaps.length - MAX_SNAPS);
    }

    ta.addEventListener('focus', function(){ foco = true; desde = Date.now(); if(!t.started) t.started = ahora(); });
    ta.addEventListener('blur', function(){ acumula(); foco = false; });
    document.addEventListener('visibilitychange', function(){ if(document.hidden) acumula(); else desde = Date.now(); });

    ta.addEventListener('paste', function(e){
      var s = '';
      try{ s = (e.clipboardData || window.clipboardData).getData('text') || ''; }catch(_){}
      if(!registraPegado(s.length)) e.preventDefault();
    });
    ta.addEventListener('drop', function(e){
      var s = '';
      try{ s = e.dataTransfer.getData('text') || ''; }catch(_){}
      if(!registraPegado(s.length)) e.preventDefault();
    });
    /* Los menús táctiles (iPad, Android) a veces no disparan paste: llegan como beforeinput. */
    ta.addEventListener('beforeinput', function(e){
      var it = e.inputType || '';
      if(it === 'insertFromPaste' || it === 'insertFromDrop' || it === 'insertFromPasteAsQuotation'){
        var s = e.data || ''; try{ if(!s && e.dataTransfer) s = e.dataTransfer.getData('text') || ''; }catch(_){}
        if(!registraPegado(s.length)) e.preventDefault();
      }
    });
    ta.addEventListener('input', function(e){
      var it = e.inputType || '';
      if(it === 'insertFromPaste' || it === 'insertFromDrop' || it === 'insertFromPasteAsQuotation'){
        /* Solo llega con la puerta abierta: no cuenta como tecleado, pero
           la instantánea de palabras sí tiene que verlo crecer. */
        t.last = ahora(); if(!t.started) t.started = t.last;
        if(!snapTimer) snapTimer = setTimeout(snap, SNAP_MS);
        return;
      }
      t.keys++;
      if(it.indexOf('delete') === 0) t.deleted++;
      else t.typed += (e.data != null ? String(e.data) : '\n').length;
      t.last = ahora(); if(!t.started) t.started = t.last;
      if(!snapTimer) snapTimer = setTimeout(snap, SNAP_MS);
    });
    ta._wtAcumula = acumula;
  }

  function of(ta){
    if(!ta) return null;
    if(!reg.has(ta)) engancha(ta);
    var t = reg.get(ta);
    if(ta._wtAcumula) ta._wtAcumula();
    return JSON.parse(JSON.stringify(t));
  }
  function all(){
    var out = {};
    reg.forEach(function(t, ta){
      if(!ta.isConnected) return;
      var c = of(ta);
      if(c.keys || c.blocked || c.allowed) out[clave(ta)] = c;
    });
    return out;
  }
  /* Sigue contando desde lo guardado: la caja se vuelve a pintar (otra
     página del examen, otra visita) y las pulsaciones no empiezan de cero. */
  function restore(ta, guardado){
    if(!ta || !guardado || typeof guardado !== 'object') return;
    if(!reg.has(ta)) engancha(ta);
    var t = reg.get(ta);
    ['keys','typed','deleted','blocked','allowed','active_s'].forEach(function(k){ if(typeof guardado[k] === 'number') t[k] = guardado[k]; });
    if(Array.isArray(guardado.pastes)) t.pastes = guardado.pastes.slice(0, MAX_PASTES);
    if(Array.isArray(guardado.snaps))  t.snaps  = guardado.snaps.slice(-MAX_SNAPS);
    if(guardado.started) t.started = guardado.started;
    if(guardado.last) t.last = guardado.last;
  }

  /* Una línea para el profesor (app.js tiene la suya, traceResumen; esta es
     para cualquier otra página). Sin rastro = anterior al 11-sep-2026. */
  function resumen(t){
    if(!t || typeof t !== 'object' || (!t.keys && !t.blocked && !t.allowed)) return '— no writing trace (before 11 Sep 2026, or typed in an unmonitored box)';
    var min = Math.round((t.active_s || 0) / 60);
    var partes = ['✍️ ' + (t.keys || 0).toLocaleString('en') + ' keystrokes',
                  (t.typed || 0).toLocaleString('en') + ' characters typed',
                  min + ' min in the box'];
    function tams(ok){ return (t.pastes || []).filter(function(p){ return !p.ok === !ok && p.chars > 0; }).map(function(p){ return p.chars.toLocaleString('en'); }); }
    if(t.blocked){
      var tam = tams(false);
      partes.push('🚫 ' + t.blocked + ' paste' + (t.blocked === 1 ? '' : 's') + ' blocked' + (tam.length ? ' (' + tam.join(', ') + ' chars)' : ''));
    }
    if(t.allowed){
      var ok = tams(true);
      partes.push('📋 ' + t.allowed + ' paste' + (t.allowed === 1 ? '' : 's') + ' allowed by the teacher' + (ok.length ? ' (' + ok.join(', ') + ' chars)' : ''));
    }
    if(!t.blocked && !t.allowed) partes.push('no pastes');
    return partes.join(' · ');
  }

  /* ---------- enganche automático ---------- */
  function barre(raiz){
    var cajas = (raiz && raiz.querySelectorAll) ? raiz.querySelectorAll('textarea') : [];
    for(var i = 0; i < cajas.length; i++) engancha(cajas[i]);
    if(raiz && raiz.tagName === 'TEXTAREA') engancha(raiz);
  }
  function avisoAutomatico(){
    /* Las páginas que colocan el aviso a mano llevan .wt-aviso-top; las
       demás (las 290 actividades) lo reciben delante de su primera caja. */
    if(document.querySelector('.wt-aviso-top')) return;
    var ta = document.querySelector('textarea:not([data-trace="off"])'); if(!ta) return;
    var d = document.createElement('div'); d.innerHTML = aviso();
    ta.insertAdjacentElement('beforebegin', d.firstChild);
  }
  function arranca(){
    barre(document);
    avisoAutomatico();
    compruebaPermiso(0);
    if(typeof MutationObserver !== 'undefined'){
      new MutationObserver(function(ms){
        var hubo = false;
        ms.forEach(function(m){ for(var i = 0; i < m.addedNodes.length; i++){ var n = m.addedNodes[i]; if(n.nodeType === 1){ barre(n); hubo = true; } } });
        if(hubo) avisoAutomatico();
      }).observe(document.documentElement, { childList:true, subtree:true });
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arranca);
  else arranca();

  window.WRITING_TRACE = { of:of, all:all, restore:restore, aviso:aviso, resumen:resumen, palabras:palabras, pegarPermitido:pegarPermitido };
})();
