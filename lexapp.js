/* Motor común de las tres apps de léxico: phrasal verbs, collocations e idioms.
   Cada app define APP en su index.html (claves del data.json, textos y audio);
   aquí dentro no hay nada específico de una sola app.

   Cómo está pensado el estudio: el nivel se parte en BLOQUES DE DIEZ. Se estudian
   de dos o tres en dos o tres —los que caben en pantalla— avanzando con las
   flechas, y luego se practica ese mismo bloque: rellenar huecos eligiendo el
   mejor de los diez, emparejar significados, repaso mixto y dos juegos. */

var DATA = null, LEVEL = null, TAB = 'learn', HECHOS = {}, RECS = {}, IDXEJ = {};
var BLOQUES = [], IB = 0, PAG = 0, FILTRO = '', ACT = null, ST = null, RELOJ = null, PP = 3;
/* Embebida en el portal: el iframe manda el alto, así que la app no scrollea
   por dentro; le dice al portal cuánto mide y él ajusta el iframe. */
var EMBED = false; try { EMBED = window.parent !== window; } catch(e){ EMBED = true; }
var ALTO = 0;

var COLORS = {A1:'#0EA5E9', A2:'#22C55E', B1:'#EAB308', B2:'#F97316', C1:'#EF4444', C2:'#8B5CF6'};
var NOMBRES = {A1:'Primeros pasos', A2:'Elemental', B1:'Intermedio', B2:'Intermedio alto', C1:'Avanzado', C2:'Dominio'};
var POR_BLOQUE = 10, SEGUNDOS = 60;

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function term(d){ return d[APP.id]; }
function items(L){ return (DATA[APP.list] || {})[L] || []; }
function mezcla(a){
  a = a.slice();
  for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
}
function arriba(){
  if(EMBED){ avisa('lexapp:arriba'); return; }
  window.scrollTo({top:0, behavior:'smooth'});
}
function avisa(tipo, alto){
  try { window.parent.postMessage({tipo:tipo, alto:alto}, location.origin); } catch(e){}
}
/* Alto real del contenido. No vale medir <html>: dentro de un iframe se estira
   hasta el alto del marco y entonces nunca encogería. */
function altoContenido(){
  var n = document.body.children, max = 0;
  for(var i = 0; i < n.length; i++){
    if(n[i].tagName === 'SCRIPT') continue;
    var r = n[i].getBoundingClientRect();
    if(r.height && r.bottom + window.pageYOffset > max) max = r.bottom + window.pageYOffset;
  }
  return Math.ceil(max);
}
function avisaAlto(){
  if(!EMBED) return;
  var h = altoContenido();
  if(!h || Math.abs(h - ALTO) < 2) return;
  ALTO = h;
  avisa('lexapp:alto', h);
}
function plural(n, uno, muchos){ return n + ' ' + (n === 1 ? uno : muchos); }

/* ---------- progreso y récords (solo en este navegador) ---------- */
function guardaProgreso(){ try { localStorage.setItem(APP.store, JSON.stringify(HECHOS)); } catch(e){} }
function leeProgreso(){ try { HECHOS = JSON.parse(localStorage.getItem(APP.store) || '{}') || {}; } catch(e){ HECHOS = {}; } }
function leeRecs(){ try { RECS = JSON.parse(localStorage.getItem(APP.store + '_rec') || '{}') || {}; } catch(e){ RECS = {}; } }
function marca(d, bien){
  if(!d) return;
  var k = LEVEL + '|' + term(d);
  if(!HECHOS[k]) HECHOS[k] = {ok:0, no:0};
  HECHOS[k][bien ? 'ok' : 'no']++;
  guardaProgreso();
}
function dominado(d){
  var h = HECHOS[LEVEL + '|' + term(d)];
  if(!h) return false;
  var t = h.ok + h.no;
  return t >= 2 && h.ok / t >= 0.8;
}
function domBloque(b){ var n = 0; b.forEach(function(d){ if(dominado(d)) n++; }); return n; }
function recKey(j){ return j + '|' + LEVEL + '|' + IB; }
function rec(j){ return RECS[recKey(j)]; }
function guardaRec(j, v, mayorEsMejor){
  var a = RECS[recKey(j)];
  if(a == null || (mayorEsMejor ? v > a : v < a)){
    RECS[recKey(j)] = v;
    try { localStorage.setItem(APP.store + '_rec', JSON.stringify(RECS)); } catch(e){}
    return true;
  }
  return false;
}

/* ---------- bloques de diez ----------
   Dos entradas casi gemelas no pueden caer en el mismo bloque: si «next week» y
   «next month» comparten banco de palabras, la frase con hueco admite las dos y
   el ejercicio deja de tener respuesta. Se separan comparando definiciones. */
var VACIAS = {a:1,an:1,the:1,to:1,of:1,in:1,on:1,at:1,for:1,with:1,and:1,or:1,that:1,this:1,it:1,its:1,
  you:1,your:1,somebody:1,something:1,is:1,are:1,be:1,as:1,from:1,by:1,not:1,so:1,if:1,than:1,then:1,
  but:1,when:1,who:1,which:1,have:1,has:1};
function contenido(s){
  var o = {}, p = String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
  for(var i = 0; i < p.length; i++) if(p[i] && !VACIAS[p[i]]) o[p[i]] = 1;
  return o;
}
function jac(A, B){
  var i = 0, u = 0, k;
  for(k in A){ u++; if(B[k]) i++; }
  for(k in B) if(!A[k]) u++;
  return u ? i / u : 0;
}
function chocan(a, b){
  var j = jac(a.__def, b.__def);
  if(j >= 0.5) return true;
  var pa = a.__p, pb = b.__p;
  if(pa[0] === pb[0] && j >= 0.25) return true;
  if(pa[pa.length - 1] === pb[pb.length - 1] && j >= 0.3) return true;
  return false;
}
function armaBloques(lista){
  lista.forEach(function(d){
    if(!d.__def){ d.__def = contenido(d.en); d.__p = String(term(d)).toLowerCase().split(/\s+/); }
  });
  // Un resto de una a tres entradas no da un bloque: se reparte entre los demas.
  var n = lista.length, nb = Math.max(1, Math.ceil(n / POR_BLOQUE)), resto = n % POR_BLOQUE;
  if(nb > 1 && resto > 0 && resto <= 3) nb--;
  var bl = [], i;
  for(i = 0; i < nb; i++) bl.push([]);
  var pend = [];
  lista.forEach(function(d){
    for(var i = 0; i < nb; i++){
      var libre = bl[i].length < POR_BLOQUE, choque = false;
      if(libre){
        for(var k = 0; k < bl[i].length; k++) if(chocan(bl[i][k], d)){ choque = true; break; }
        if(!choque){ bl[i].push(d); return; }
      }
    }
    pend.push(d);
  });
  pend.forEach(function(d){
    var orden = [], i;
    for(i = 0; i < nb; i++) orden.push(i);
    orden.sort(function(a, b){ return bl[a].length - bl[b].length; });
    for(i = 0; i < orden.length; i++){
      var b = bl[orden[i]], choque = false;
      for(var k = 0; k < b.length; k++) if(chocan(b[k], d)){ choque = true; break; }
      if(!choque){ b.push(d); return; }
    }
    bl[orden[0]].push(d);
  });
  return bl.filter(function(b){ return b.length; });
}
function indexaEjercicios(){
  IDXEJ = {};
  ((DATA.exercises || {})[LEVEL] || []).forEach(function(e){
    var k = e[APP.id];
    if(!k) return;
    if(!IDXEJ[k]) IDXEJ[k] = {};
    if(!IDXEJ[k][e.t]) IDXEJ[k][e.t] = e;
  });
}
function ejercicio(d, t){ return (IDXEJ[term(d)] || {})[t]; }

/* ---------- navegación ---------- */
function pintaNiveles(){
  document.getElementById('levels').innerHTML = DATA.niveles.map(function(L){
    var n = items(L).length;
    return '<button class="lv" data-l="' + L + '" aria-pressed="' + (L === LEVEL) + '"' +
      ' style="--c:' + COLORS[L] + ';--cl:' + COLORS[L] + '18;--cd:' + COLORS[L] + '"' +
      ' onclick="setLevel(this.dataset.l)">' + L + '<small>' + n + ' ' + APP.varios + ' · ' + NOMBRES[L] + '</small></button>';
  }).join('');
}
function setLevel(L){
  LEVEL = L; IB = 0; PAG = 0; FILTRO = ''; ACT = null; ST = null;
  BLOQUES = armaBloques(items(L));
  indexaEjercicios();
  pintaNiveles(); render();
}
function setTab(t){
  TAB = t; ACT = null; ST = null; PAG = 0;
  ['learn','practice','games','progress'].forEach(function(x){
    var el = document.getElementById('tab-' + x);
    if(el) el.setAttribute('aria-selected', x === t);
  });
  render();
}
function setBloque(i){ IB = i; PAG = 0; ACT = null; ST = null; render(); arriba(); }
function alMenu(){ ACT = null; ST = null; render(); arriba(); }
function alPracticar(){ setTab('practice'); arriba(); }

function cabecera(){
  var b = BLOQUES[IB] || [];
  var chips = BLOQUES.map(function(bl, i){
    var dom = domBloque(bl);
    return '<button class="bk" aria-pressed="' + (i === IB) + '" onclick="setBloque(' + i + ')"' +
      ' title="Bloque ' + (i + 1) + ': ' + dom + ' de ' + bl.length + ' dominados">' + (i + 1) +
      '<i><b style="width:' + Math.round(dom / bl.length * 100) + '%"></b></i></button>';
  }).join('');
  return '<div class="blockhead">Bloque <b>' + (IB + 1) + '</b> de ' + BLOQUES.length + ' · ' +
    b.length + ' ' + APP.varios + ' · ' + plural(domBloque(b), 'dominado', 'dominados') + '</div>' +
    '<div class="blocks">' + chips + '</div>';
}

/* ---------- aprender: dos o tres tarjetas por pantalla ---------- */
function porPagina(){ return (window.innerWidth < 640 || (!EMBED && window.innerHeight < 640)) ? 2 : 3; }
function vistaAprender(){
  if(!BLOQUES.length) return '<div class="empty">Todavía no hay material en este nivel.</div>';
  return cabecera() +
    '<input class="find" id="find" placeholder="Filtrar ' + esc(APP.uno) + ' o significado…"' +
    ' oninput="filtra(this.value)" autocomplete="off" value="' + esc(FILTRO) + '">' +
    '<div id="lista">' + cuerpoAprender() + '</div>';
}
function cuerpoAprender(){
  if(FILTRO){
    var f = FILTRO.toLowerCase();
    var l = items(LEVEL).filter(function(d){
      return String(term(d)).toLowerCase().indexOf(f) >= 0 ||
        String(d.en || '').toLowerCase().indexOf(f) >= 0 ||
        String(d.es || '').toLowerCase().indexOf(f) >= 0;
    });
    return '<div class="hint" style="margin:0 0 11px">' + l.length + ' en todo el nivel ' + LEVEL +
      '. Borra el filtro para volver al bloque.</div>' + tarjetas(l);
  }
  return carrusel();
}
function filtra(v){
  FILTRO = (v || '').trim(); PAG = 0;
  document.getElementById('lista').innerHTML = cuerpoAprender();
  avisaAlto();
}
function carrusel(){
  var b = BLOQUES[IB] || [];
  PP = porPagina();
  var np = Math.max(1, Math.ceil(b.length / PP));
  if(PAG >= np) PAG = np - 1;
  if(PAG < 0) PAG = 0;
  var primera = IB === 0 && PAG === 0, ultima = IB === BLOQUES.length - 1 && PAG === np - 1;
  var h = '<div class="deckwrap">' +
    '<button class="arrow" type="button" onclick="mueve(-1)" aria-label="Anterior"' + (primera ? ' disabled' : '') + '>&lsaquo;</button>' +
    '<div class="deck" id="deck">' + tarjetas(b.slice(PAG * PP, PAG * PP + PP)) + '</div>' +
    '<button class="arrow" type="button" onclick="mueve(1)" aria-label="Siguiente"' + (ultima ? ' disabled' : '') + '>&rsaquo;</button>' +
    '</div><div class="dots">';
  for(var i = 0; i < np; i++){
    h += '<button class="dot' + (i === PAG ? ' on' : '') + '" type="button" onclick="vePag(' + i + ')" aria-label="Pantalla ' + (i + 1) + '"></button>';
  }
  h += '</div><div class="pagenum">Pantalla ' + (PAG + 1) + ' de ' + np + ' · avanza con &lsaquo; &rsaquo; o con las teclas ← →</div>';
  if(PAG === np - 1){
    h += '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="alPracticar()">Practicar este bloque</button>' +
      (IB < BLOQUES.length - 1 ? '<button class="btn sec" onclick="setBloque(' + (IB + 1) + ')">Siguiente bloque</button>' : '') +
      '</div>';
  }
  return h;
}
function vePag(i){ PAG = i; document.getElementById('lista').innerHTML = cuerpoAprender(); }
function mueve(d){
  var b = BLOQUES[IB] || [];
  PP = porPagina();
  var np = Math.max(1, Math.ceil(b.length / PP)), p = PAG + d;
  if(p < 0){
    if(IB > 0){ IB--; var nb = BLOQUES[IB] || []; PAG = Math.max(0, Math.ceil(nb.length / PP) - 1); }
    else PAG = 0;
  } else if(p >= np){
    if(IB < BLOQUES.length - 1){ IB++; PAG = 0; }
    else PAG = np - 1;
  } else PAG = p;
  render();
}
function tarjetas(lista){
  if(!lista.length) return '<div class="empty">Nada que mostrar.</div>';
  return lista.map(function(d){
    var t = term(d);
    return '<div class="card">' +
      '<span class="pv">' + esc(t) + '</span>' + APP.badges(d) +
      (dominado(d) ? '<span class="badge dom">dominado</span>' : '') +
      '<button class="say" type="button" data-say="uk" data-t="' + esc(t) + '" title="Pronunciación británica">UK</button>' +
      '<button class="say" type="button" data-say="us" data-t="' + esc(t) + '" title="Pronunciación americana">US</button>' +
      '<div class="en">' + esc(d.en) + '</div>' +
      '<div class="es">' + esc(d.es) + '</div>' +
      '<div class="ex">' + esc(d.ex) + '</div>' +
      (d.note ? '<div class="note">' + esc(d.note) + '</div>' : '') +
      '</div>';
  }).join('');
}

/* ---------- audio (mismo nombre de archivo que el generador) ---------- */
var AUDIO = null;
function slug(s){ return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function dice(boton){
  var t = boton.getAttribute('data-t'), ac = boton.getAttribute('data-say');
  if(AUDIO){ AUDIO.pause(); }
  document.querySelectorAll('.say[aria-pressed="true"]').forEach(function(b){ b.setAttribute('aria-pressed', 'false'); });
  AUDIO = new Audio('/lexicon-audio/' + APP.audio + '/' + ac + '/' + slug(t) + '.mp3');
  boton.setAttribute('aria-pressed', 'true');
  AUDIO.onended = AUDIO.onerror = function(){ boton.setAttribute('aria-pressed', 'false'); };
  AUDIO.play().catch(function(){ boton.setAttribute('aria-pressed', 'false'); });
}

/* ---------- practicar: menú del bloque ---------- */
function vistaPractica(){
  if(!BLOQUES.length) return '<div class="empty">Todavía no hay material en este nivel.</div>';
  if(ACT === 'gap') return vistaRelleno();
  if(ACT === 'par') return vistaEmparejar();
  if(ACT === 'mix') return vistaMixto();
  var b = BLOQUES[IB] || [];
  return cabecera() + '<div class="acts">' +
    acto('gap', '&#10003;', 'Rellenar los huecos',
      b.length + ' frases con un hueco: elige ' + APP.elMejor + ' ' + APP.deLos + ' ' + b.length + ' ' + APP.varios + ' del bloque.') +
    acto('par', '&#8646;', 'Emparejar significados',
      'Une cada ' + APP.uno + ' con lo que significa, en rondas de cinco.') +
    acto('mix', '&#10022;', 'Repaso mixto',
      'Preguntas variadas de este bloque: significado en inglés y en español, verdadero o falso' + (APP.extra || '') + '.') +
    '</div>';
}
function acto(id, ic, tit, desc, extra){
  return '<button class="act" type="button" onclick="inicia(\'' + id + '\')">' +
    '<span class="ic">' + ic + '</span><span><b>' + tit + '</b><span>' + desc + '</span></span>' +
    (extra ? '<span class="rec">' + extra + '</span>' : '') + '</button>';
}
function inicia(a){
  if(a === 'gap') iniciaRelleno();
  else if(a === 'par') iniciaEmparejar();
  else if(a === 'mix') iniciaMixto();
  else if(a === 'speed') iniciaSpeed();
  else if(a === 'mem') iniciaMem();
}
function resumenAct(tit, ok, total, a){
  var pct = total ? Math.round(ok / total * 100) : 0;
  return '<div class="card" style="text-align:center">' +
    '<div class="score">' + pct + '%</div>' +
    '<p>' + tit + ' · ' + ok + ' de ' + total + ' en el bloque ' + (IB + 1) + ' de ' + LEVEL + '.</p>' +
    '<div class="row" style="justify-content:center">' +
    '<button class="btn" onclick="inicia(\'' + a + '\')">Otra vez</button>' +
    (IB < BLOQUES.length - 1 ? '<button class="btn sec" onclick="setBloque(' + (IB + 1) + ')">Siguiente bloque</button>' : '') +
    '<button class="btn sec" onclick="alMenu()">Otras actividades</button></div></div>';
}

/* ---------- rellenar huecos con el banco de diez ---------- */
function iniciaRelleno(){
  var b = BLOQUES[IB] || [];
  ST = {orden:mezcla(b), banco:mezcla(b), i:0, ok:0, hechos:{}, resuelto:false, fallo:false, pista:false};
  ACT = 'gap'; render(); arriba();
}
function fraseHueco(d, resuelto){
  var t = String(term(d)), ex = String(d.ex || ''), pre = null, post = '';
  var i = ex.toLowerCase().indexOf(t.toLowerCase());
  if(i >= 0){
    var a = i > 0 ? ex.charAt(i - 1) : ' ', z = (i + t.length) < ex.length ? ex.charAt(i + t.length) : ' ';
    if(!/[a-zA-Z]/.test(a) && !/[a-zA-Z]/.test(z)){ pre = ex.slice(0, i); post = ex.slice(i + t.length); }
  }
  if(pre === null){
    // El generador ya dejó hecho el hueco para las formas conjugadas y los idioms
    // con hueco variable («speaks her mind»); ahí no vale buscar el texto literal.
    var e = ejercicio(d, 'complete');
    var q = e ? String(e.q).replace(/^\s*Complete:\s*/, '') : '';
    var m = q.match(/_{3,}(?:\s*_{3,})*/);
    if(m){ pre = q.slice(0, m.index); post = q.slice(m.index + m[0].length); }
    else { pre = String(d.en || '') + ' → '; post = ''; }
  }
  return esc(pre) + '<span class="hueco' + (resuelto ? ' ok' : '') + '">' +
    (resuelto ? esc(t) : '_____') + '</span>' + esc(post);
}
function vistaRelleno(){
  var n = ST.orden.length;
  if(ST.i >= n) return resumenAct('Rellenar los huecos', ST.ok, n, 'gap');
  var d = ST.orden[ST.i];
  return '<div class="bar"><i style="width:' + Math.round(ST.i / n * 100) + '%"></i></div>' +
    '<div class="meta"><span>Frase ' + (ST.i + 1) + ' de ' + n + ' · bloque ' + (IB + 1) + '</span>' +
    '<span>' + ST.ok + ' a la primera</span></div>' +
    '<div class="card"><div class="sent">' + fraseHueco(d, ST.resuelto) + '</div>' +
    '<div class="banktitle">Elige la opción que mejor encaja</div><div class="bank">' +
    ST.banco.map(function(x){
      var tt = term(x), hecho = ST.hechos[tt];
      return '<button class="w' + (hecho ? ' done' : '') + '" type="button" data-t="' + esc(tt) + '"' +
        ((hecho || ST.resuelto) ? ' disabled' : '') + '>' + esc(tt) + '</button>';
    }).join('') +
    '</div><div id="fb">' + (ST.resuelto ?
      '<div class="fb ok"><b>' + esc(term(d)) + '</b> — ' + esc(d.es) +
      '<button class="btn sm" style="margin-left:12px" onclick="sigRelleno()">Siguiente</button></div>' : '') +
    '</div></div>';
}
function eligeBanco(btn){
  if(ACT !== 'gap' || !ST || ST.resuelto) return;
  var d = ST.orden[ST.i], t = term(d), sel = btn.getAttribute('data-t');
  if(sel === t){
    ST.resuelto = true; ST.hechos[t] = 1;
    var limpio = !ST.fallo;
    if(limpio) ST.ok++;
    marca(d, limpio);
    render();
  } else {
    btn.classList.add('bad');
    var otro = null;
    ST.banco.forEach(function(x){ if(term(x) === sel) otro = x; });
    document.getElementById('fb').innerHTML = '<div class="fb no">' +
      (otro ? '<b>' + esc(sel) + '</b> es «' + esc(otro.es) + '». La frase pide otra cosa.' : 'Ese no encaja aquí.') +
      (ST.fallo ? ' Pista: buscas «' + esc(d.es) + '».' : '') + '</div>';
    ST.fallo = true;
    setTimeout(function(){ btn.classList.remove('bad'); }, 900);
  }
}
function sigRelleno(){ ST.i++; ST.resuelto = false; ST.fallo = false; render(); arriba(); }

/* ---------- emparejar significados, en rondas de cinco ---------- */
function iniciaEmparejar(){
  var b = mezcla(BLOQUES[IB] || []), rondas = [];
  for(var i = 0; i < b.length; i += 5) rondas.push(b.slice(i, i + 5));
  if(rondas.length > 1 && rondas[rondas.length - 1].length < 2){
    var u = rondas.pop();
    rondas[rondas.length - 1] = rondas[rondas.length - 1].concat(u);
  }
  ST = {rondas:rondas, r:0, ok:0, err:0, der:[], hechos:0, selEl:null};
  ACT = 'par'; iniciaRonda(); render(); arriba();
}
function iniciaRonda(){
  var g = ST.rondas[ST.r] || [];
  ST.der = mezcla(g.map(function(d, i){ return i; }));
  ST.hechos = 0; ST.selEl = null;
}
function vistaEmparejar(){
  if(ST.r >= ST.rondas.length) return resumenAct('Emparejar significados', ST.ok, ST.ok + ST.err, 'par');
  var g = ST.rondas[ST.r];
  var h = '<div class="meta" style="margin-bottom:10px"><span>Ronda ' + (ST.r + 1) + ' de ' + ST.rondas.length +
    ' · bloque ' + (IB + 1) + '</span><span>' + plural(ST.ok, 'acierto', 'aciertos') + ' · ' + plural(ST.err, 'fallo', 'fallos') + '</span></div>' +
    '<div class="card"><div class="q">Empareja cada ' + APP.uno + ' con su significado.</div><div class="match"><div>' +
    g.map(function(d, i){
      return '<button class="mt" type="button" style="width:100%;margin-bottom:8px" data-side="L" data-i="' + i + '">' + esc(term(d)) + '</button>';
    }).join('') + '</div><div>' +
    ST.der.map(function(i){
      return '<button class="mt" type="button" style="width:100%;margin-bottom:8px" data-side="R" data-i="' + i + '">' + esc(g[i].en) + '</button>';
    }).join('') + '</div></div><div id="fb"></div></div>';
  return h;
}
function pick(b){
  if(ACT !== 'par' || !ST) return;
  if(b.classList.contains('done')) return;
  var sel = ST.selEl;
  if(!sel){ ST.selEl = b; b.setAttribute('aria-pressed', 'true'); return; }
  if(sel === b){ ST.selEl = null; b.setAttribute('aria-pressed', 'false'); return; }
  if(sel.getAttribute('data-side') === b.getAttribute('data-side')){
    sel.setAttribute('aria-pressed', 'false'); ST.selEl = b; b.setAttribute('aria-pressed', 'true'); return;
  }
  var izq = sel.getAttribute('data-side') === 'L' ? sel : b;
  var d = ST.rondas[ST.r][+izq.getAttribute('data-i')];
  var bien = sel.getAttribute('data-i') === b.getAttribute('data-i');
  sel.setAttribute('aria-pressed', 'false');
  if(bien){
    sel.classList.add('done'); b.classList.add('done');
    ST.hechos++; ST.ok++; marca(d, true);
    if(ST.hechos === ST.rondas[ST.r].length){
      document.getElementById('fb').innerHTML = '<div class="fb ok">Ronda completa. ' +
        '<button class="btn sm" style="margin-left:10px" onclick="sigRonda()">' +
        (ST.r < ST.rondas.length - 1 ? 'Siguiente ronda' : 'Ver resultado') + '</button></div>';
    }
  } else {
    ST.err++; marca(d, false);
    document.getElementById('fb').innerHTML = '<div class="fb no">Ese no. Prueba otra vez.</div>';
  }
  ST.selEl = null;
}
function sigRonda(){ ST.r++; iniciaRonda(); render(); arriba(); }

/* ---------- repaso mixto: las preguntas ya generadas, filtradas al bloque ---------- */
function iniciaMixto(){
  var dentro = {};
  (BLOQUES[IB] || []).forEach(function(d){ dentro[term(d)] = d; });
  var pool = ((DATA.exercises || {})[LEVEL] || []).filter(function(e){
    return e.t !== 'match' && e[APP.id] && dentro[e[APP.id]];
  });
  ST = {q:mezcla(pool).slice(0, 20), i:0, ok:0, dentro:dentro};
  ACT = 'mix'; render(); arriba();
}
function vistaMixto(){
  var n = ST.q.length;
  if(!n) return cabecera() + '<div class="card"><div class="empty">Este bloque no tiene preguntas sueltas.</div></div>';
  if(ST.i >= n) return resumenAct('Repaso mixto', ST.ok, n, 'mix');
  var e = ST.q[ST.i];
  return '<div class="bar"><i style="width:' + Math.round(ST.i / n * 100) + '%"></i></div>' +
    '<div class="meta"><span>Pregunta ' + (ST.i + 1) + ' de ' + n + ' · bloque ' + (IB + 1) + '</span>' +
    '<span>' + ST.ok + ' correctas</span></div><div class="card">' +
    '<div class="q">' + e.q + '</div><div class="opts" id="opts">' +
    e.options.map(function(o, i){
      return '<button class="opt" type="button" data-i="' + i + '">' + esc(o) + '</button>';
    }).join('') + '</div><div id="fb"></div></div>';
}
function responde(i){
  var e = ST.q[ST.i], bien = i === e.a;
  if(bien) ST.ok++;
  marca(ST.dentro[e[APP.id]], bien);
  var bs = document.querySelectorAll('#opts .opt');
  for(var k = 0; k < bs.length; k++){
    bs[k].disabled = true;
    if(k === e.a) bs[k].classList.add('good');
    else if(k === i) bs[k].classList.add('bad');
  }
  document.getElementById('fb').innerHTML = '<div class="fb ' + (bien ? 'ok' : 'no') + '">' +
    (bien ? '¡Correcto!' : 'La respuesta era: <b>' + esc(e.options[e.a]) + '</b>') +
    (e.why ? ' — ' + esc(e.why) : '') +
    '<button class="btn sm" style="margin-left:12px" onclick="sigMixto()">Siguiente</button></div>';
}
function sigMixto(){ ST.i++; render(); arriba(); }

/* ---------- juegos ---------- */
function vistaJuegos(){
  if(!BLOQUES.length) return '<div class="empty">Todavía no hay material en este nivel.</div>';
  if(ACT === 'speed') return vistaSpeed();
  if(ACT === 'mem') return vistaMem();
  var rs = rec('speed'), rm = rec('mem');
  return cabecera() + '<div class="acts">' +
    acto('speed', '&#9201;', 'Contrarreloj', SEGUNDOS + ' segundos: reconoce el significado antes de que se acabe el tiempo. Encadena aciertos y el punto vale doble y triple.',
      rs != null ? 'Récord ' + rs : '') +
    acto('mem', '&#9635;', 'Memoria', 'Seis parejas boca abajo: cada ' + APP.uno + ' con su traducción. Gana quien menos movimientos gasta.',
      rm != null ? 'Récord ' + rm + ' mov.' : '') +
    '</div><div class="hint">Los récords son de este bloque y se guardan en este navegador.</div>';
}

/* Contrarreloj */
function iniciaSpeed(){
  ACT = 'speed';
  ST = {hasta:Date.now() + SEGUNDOS * 1000, puntos:0, racha:0, mejorRacha:0, aciertos:0, fallos:0,
        terminado:false, bloq:false, q:null, nuevoRecord:false};
  nuevaQ(); render();
}
function nuevaQ(){
  var b = BLOQUES[IB] || [], nivel = items(LEVEL);
  var d = b[Math.floor(Math.random() * b.length)];
  if(ST.q && b.length > 1){
    var g = 0;
    while(term(d) === ST.q.t && g++ < 8) d = b[Math.floor(Math.random() * b.length)];
  }
  var t = term(d), vistos = {}, cand = [];
  vistos[t] = 1;
  b.concat(nivel).forEach(function(x){
    var tx = term(x);
    if(!vistos[tx]){ vistos[tx] = 1; cand.push(tx); }
  });
  var op = mezcla(cand).slice(0, 3);
  op.push(t);
  op = mezcla(op);
  var enEs = Math.random() < 0.5;
  ST.q = {t:t, item:d, pista:(enEs ? d.es : d.en), enEs:enEs, op:op, a:op.indexOf(t)};
}
function vistaSpeed(){
  if(ST.terminado){
    return '<div class="card" style="text-align:center"><div class="score">' + ST.puntos + '</div>' +
      '<p>' + plural(ST.aciertos, 'acierto', 'aciertos') + ' y ' + plural(ST.fallos, 'fallo', 'fallos') + ' en ' + SEGUNDOS + ' segundos · racha máxima ' + ST.mejorRacha + '.</p>' +
      (ST.nuevoRecord ? '<p style="color:var(--ok);font-weight:600">¡Récord nuevo en este bloque!</p>' :
        (rec('speed') != null ? '<p class="hint">Tu récord en el bloque ' + (IB + 1) + ' es ' + rec('speed') + '.</p>' : '')) +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="inicia(\'speed\')">Otra vez</button>' +
      '<button class="btn sec" onclick="alMenu()">Volver a los juegos</button></div></div>';
  }
  var q = ST.q, queda = Math.max(0, ST.hasta - Date.now());
  return '<div class="hud"><span class="pts">' + ST.puntos + ' puntos</span>' +
    '<span class="racha">' + (ST.racha >= 3 ? 'Racha ' + ST.racha + ' · x' + mult() : (ST.racha ? 'Racha ' + ST.racha : '')) + '</span>' +
    '<span id="tnum">' + Math.ceil(queda / 1000) + ' s</span></div>' +
    '<div class="tbar" id="tw"><i id="tbar" style="width:' + (queda / (SEGUNDOS * 1000) * 100) + '%"></i></div>' +
    '<div class="card"><div class="q">¿Qué ' + APP.uno + ' significa ' + (q.enEs ? '' : '(en inglés) ') +
    '«<b>' + esc(q.pista) + '</b>»?</div><div class="opts" id="opts">' +
    q.op.map(function(o, i){
      return '<button class="opt" type="button" data-i="' + i + '">' + esc(o) + '</button>';
    }).join('') + '</div></div>';
}
function mult(){ return ST.racha >= 6 ? 3 : (ST.racha >= 3 ? 2 : 1); }
function respondeSpeed(i){
  if(!ST || ST.bloq || ST.terminado) return;
  var bien = i === ST.q.a;
  ST.bloq = true;
  marca(ST.q.item, bien);
  if(bien){
    ST.racha++; ST.aciertos++;
    if(ST.racha > ST.mejorRacha) ST.mejorRacha = ST.racha;
    ST.puntos += 10 * mult();
  } else { ST.racha = 0; ST.fallos++; }
  var bs = document.querySelectorAll('#opts .opt');
  for(var k = 0; k < bs.length; k++){
    bs[k].disabled = true;
    if(k === ST.q.a) bs[k].classList.add('good');
    else if(k === i) bs[k].classList.add('bad');
  }
  setTimeout(function(){
    if(ACT !== 'speed' || !ST || ST.terminado) return;
    ST.bloq = false; nuevaQ(); render();
  }, bien ? 420 : 950);
}
function paraReloj(){ if(RELOJ){ clearInterval(RELOJ); RELOJ = null; } }
function arrancaReloj(){ paraReloj(); RELOJ = setInterval(tic, 200); }
function tic(){
  if(ACT !== 'speed' || !ST || ST.terminado){ paraReloj(); return; }
  var queda = Math.max(0, ST.hasta - Date.now());
  var b = document.getElementById('tbar'), n = document.getElementById('tnum'), w = document.getElementById('tw');
  if(b) b.style.width = (queda / (SEGUNDOS * 1000) * 100) + '%';
  if(n) n.textContent = Math.ceil(queda / 1000) + ' s';
  if(w){ if(queda < 10000) w.classList.add('corre'); else w.classList.remove('corre'); }
  if(queda <= 0){
    paraReloj();
    ST.terminado = true;
    ST.nuevoRecord = guardaRec('speed', ST.puntos, true);
    render();
  }
}

/* Memoria */
function iniciaMem(){
  var sel = mezcla(BLOQUES[IB] || []).slice(0, 6), cs = [];
  sel.forEach(function(d, i){
    cs.push({p:i, k:'t', x:term(d), d:d});
    cs.push({p:i, k:'d', x:d.es, d:d});
  });
  ST = {cartas:mezcla(cs), abiertas:[], hechas:{}, movs:0, t0:Date.now(), bloq:false,
        total:sel.length, fin:null, nuevoRecord:false};
  ACT = 'mem'; render(); arriba();
}
function vistaMem(){
  var hechas = 0, k;
  for(k in ST.hechas) hechas++;
  if(ST.fin != null){
    return '<div class="card" style="text-align:center"><div class="score">' + ST.movs + '</div>' +
      '<p>' + (ST.movs === 1 ? 'movimiento' : 'movimientos') + ' para las ' + ST.total + ' parejas, en ' + plural(ST.fin, 'segundo', 'segundos') + '.</p>' +
      (ST.nuevoRecord ? '<p style="color:var(--ok);font-weight:600">¡Récord nuevo en este bloque!</p>' :
        (rec('mem') != null ? '<p class="hint">Tu récord en el bloque ' + (IB + 1) + ' es ' + plural(rec('mem'), 'movimiento', 'movimientos') + '.</p>' : '')) +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="inicia(\'mem\')">Otra vez</button>' +
      '<button class="btn sec" onclick="alMenu()">Volver a los juegos</button></div></div>';
  }
  return '<div class="hud"><span>Parejas <b>' + hechas + ' / ' + ST.total + '</b></span>' +
    '<span class="racha">' + plural(ST.movs, 'movimiento', 'movimientos') + '</span></div>' +
    '<div class="mem">' + ST.cartas.map(function(c, i){
      var hecha = ST.hechas[c.p], abierta = ST.abiertas.indexOf(i) >= 0;
      if(hecha || abierta){
        return '<button class="mc' + (hecha ? ' hecha' : '') + (c.k === 't' ? ' term' : '') + '" type="button" data-c="' + i + '"' +
          (hecha ? ' disabled' : '') + '>' + esc(c.x) + '</button>';
      }
      return '<button class="mc tapada" type="button" data-c="' + i + '">?</button>';
    }).join('') + '</div>' +
    '<div class="hint">Cada ' + APP.uno + ' con su traducción. Se guarda el mejor número de movimientos.</div>';
}
function voltea(b){
  if(ACT !== 'mem' || !ST || ST.bloq || ST.fin != null) return;
  var i = +b.getAttribute('data-c'), c = ST.cartas[i];
  if(ST.hechas[c.p] || ST.abiertas.indexOf(i) >= 0) return;
  ST.abiertas.push(i);
  if(ST.abiertas.length < 2){ render(); return; }
  ST.movs++;
  var a = ST.cartas[ST.abiertas[0]], z = ST.cartas[ST.abiertas[1]];
  if(a.p === z.p){
    ST.hechas[a.p] = 1; ST.abiertas = [];
    marca(a.d, true);
    var n = 0, k;
    for(k in ST.hechas) n++;
    if(n === ST.total){
      ST.fin = Math.round((Date.now() - ST.t0) / 1000);
      ST.nuevoRecord = guardaRec('mem', ST.movs, false);
    }
    render(); return;
  }
  ST.bloq = true; render();
  setTimeout(function(){
    if(ACT !== 'mem' || !ST) return;
    ST.abiertas = []; ST.bloq = false; render();
  }, 850);
}

/* ---------- mi progreso ---------- */
function vistaProgreso(){
  var lista = items(LEVEL), vistos = 0, dom = 0;
  var filas = lista.map(function(d){
    var h = HECHOS[LEVEL + '|' + term(d)];
    if(h) vistos++;
    var tot = h ? h.ok + h.no : 0, pct = tot ? Math.round(h.ok / tot * 100) : 0;
    if(dominado(d)) dom++;
    return '<div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:11px 15px">' +
      '<span class="pv" style="font-size:1rem">' + esc(term(d)) + '</span>' +
      '<span style="font-size:.88rem;color:' + (tot && pct >= 80 ? 'var(--ok)' : 'var(--muted)') + '">' +
      (tot ? h.ok + '/' + tot + ' · ' + pct + '%' : 'sin practicar') + '</span></div>';
  }).join('');
  var porBloque = BLOQUES.map(function(b, i){
    var n = domBloque(b);
    return '<div style="display:flex;align-items:center;gap:10px;margin-top:9px">' +
      '<button class="btn sec sm" onclick="setBloque(' + i + ')">Bloque ' + (i + 1) + '</button>' +
      '<div class="bar" style="flex:1;margin:0"><i style="width:' + Math.round(n / b.length * 100) + '%"></i></div>' +
      '<span style="font-size:.85rem;color:var(--muted);white-space:nowrap">' + n + '/' + b.length + '</span></div>';
  }).join('');
  return '<div class="card"><b>' + dom + '</b> de ' + lista.length + ' dominados en ' + LEVEL +
    ' · ' + vistos + ' practicados.<div class="bar"><i style="width:' +
    (lista.length ? Math.round(dom / lista.length * 100) : 0) + '%"></i></div>' +
    '<div class="hint">Se considera dominado con dos intentos y un 80 % de aciertos. El progreso se guarda en este navegador.</div></div>' +
    '<div class="card"><b>Por bloques</b>' + porBloque + '</div>' + filas;
}

/* ---------- pintado y eventos ---------- */
function render(){
  if(ACT !== 'speed') paraReloj();
  var v = document.getElementById('view');
  v.innerHTML = TAB === 'learn' ? vistaAprender() :
    TAB === 'practice' ? vistaPractica() :
    TAB === 'games' ? vistaJuegos() : vistaProgreso();
  if(ACT === 'speed' && ST && !ST.terminado && !RELOJ) arrancaReloj();
  avisaAlto();
}

// Delegado y no onclick inline: un apóstrofe en el texto rompería el atributo sin avisar.
document.addEventListener('click', function(ev){
  var t = ev.target, b;
  if(!t || !t.closest) return;
  if((b = t.closest('.say'))){ ev.preventDefault(); dice(b); return; }
  if((b = t.closest('.w')) && !b.disabled){ eligeBanco(b); return; }
  if((b = t.closest('.mt'))){ pick(b); return; }
  if((b = t.closest('.mc')) && !b.disabled){ voltea(b); return; }
  if((b = t.closest('.opt')) && !b.disabled){
    var i = +b.getAttribute('data-i');
    if(ACT === 'speed') respondeSpeed(i); else responde(i);
    return;
  }
});

document.addEventListener('keydown', function(ev){
  if(TAB !== 'learn' || FILTRO) return;
  var a = document.activeElement;
  if(a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA')) return;
  if(ev.key === 'ArrowLeft'){ mueve(-1); }
  else if(ev.key === 'ArrowRight'){ mueve(1); }
});

var TX = null;
document.addEventListener('touchstart', function(ev){
  var t = ev.target;
  TX = (t && t.closest && t.closest('.deck')) ? ev.touches[0].clientX : null;
}, {passive:true});
document.addEventListener('touchend', function(ev){
  if(TX == null) return;
  var dx = ev.changedTouches[0].clientX - TX;
  TX = null;
  if(Math.abs(dx) > 45 && TAB === 'learn' && !FILTRO) mueve(dx < 0 ? 1 : -1);
}, {passive:true});

var RESIZE = null;
window.addEventListener('resize', function(){
  if(RESIZE) clearTimeout(RESIZE);
  RESIZE = setTimeout(function(){
    if(TAB === 'learn' && !FILTRO && DATA && porPagina() !== PP) render();
  }, 180);
});

/* Latido: casi todo lo que cambia de alto pasa por render(), pero no todo
   (el reloj de los juegos, las fuentes al llegar). Media lectura de layout
   cada medio segundo cuesta menos que buscar cada punto que repinta. */
if(EMBED) setInterval(avisaAlto, 500);

leeProgreso(); leeRecs();
fetch('data.json?v=' + (APP.datav || 1)).then(function(r){ return r.json(); }).then(function(d){
  DATA = d;
  LEVEL = DATA.niveles.indexOf('A1') >= 0 ? 'A1' : DATA.niveles[0];
  BLOQUES = armaBloques(items(LEVEL));
  indexaEjercicios();
  pintaNiveles(); render();
}).catch(function(){
  document.getElementById('view').innerHTML =
    '<div class="empty">No se ha podido cargar el material. Vuelve a intentarlo en un momento.</div>';
});
