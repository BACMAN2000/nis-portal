/* Motor de la app de word formation.

   Comparte hoja de estilos y forma de trabajar con lexapp.js —bloques de diez,
   dos o tres tarjetas por pantalla, huecos con banco, parejas y dos juegos—
   pero el material es otro y por eso no comparte código: aquí no hay una lista
   de términos con su traducción, sino AFIJOS (con su sentido) y FAMILIAS de
   palabras, los niveles son acumulativos y los ejercicios se generan al vuelo
   porque el data.json no los trae hechos.

   Los dos modos se estudian por separado: un bloque de afijos y un bloque de
   familias no se practican igual. */

var DATA = null, LEVEL = 'A1', MODO = 'afijos', TAB = 'learn';
var HECHOS = {}, RECS = {}, ABIERTO = {};
var BLOQUES = [], IB = 0, PAG = 0, FILTRO = '', ACT = null, ST = null, RELOJ = null, PP = 3;
var COLORS = {A1:'#0EA5E9', A2:'#22C55E', B1:'#EAB308', B2:'#F97316', C1:'#EF4444', C2:'#8B5CF6'};
var NOMBRES = {A1:'First steps', A2:'Elementary', B1:'Intermediate', B2:'Upper intermediate', C1:'Advanced', C2:'Mastery'};
var CLASE = {sustantivo:'n', adjetivo:'a', verbo:'v', adverbio:'d'};
var CLASE_EN = {sustantivo:'noun', adjetivo:'adjective', verbo:'verb', adverbio:'adverb'};
var ORDEN = ['A1','A2','B1','B2','C1','C2'];
var POR_BLOQUE = 10, SEGUNDOS = 60;

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function escRx(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function mezcla(a){
  a = a.slice();
  for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
}
function alAzar(a){ return a[Math.floor(Math.random() * a.length)]; }
function plural(n, uno, muchos){ return n + ' ' + (n === 1 ? uno : muchos); }
function arriba(){ window.scrollTo({top:0, behavior:'smooth'}); }
function modoLabel(){ return MODO === 'afijos' ? 'affixes' : 'families'; }

/* Todo lo de un nivel o por debajo: si algo se enseña en A2, en B1 sigue valiendo. */
function hasta(L){ return ORDEN.slice(0, ORDEN.indexOf(L) + 1); }
function delNivel(lista, L){
  var v = hasta(L);
  return lista.filter(function(x){ return v.indexOf(x.nivel) >= 0; });
}
function prefijosDe(L){ return delNivel(DATA.prefijos, L); }
function sufijosDe(L){ return delNivel(DATA.sufijos, L); }
function afijosDe(L){ return prefijosDe(L).concat(sufijosDe(L)); }
function familiasDe(L){ return delNivel(DATA.familias, L); }
function lista(L){ return MODO === 'afijos' ? afijosDe(L || LEVEL) : familiasDe(L || LEVEL); }
function term(d){ return d.afijo || d.raiz; }
function esPrefijo(a){ return a.afijo && a.afijo.charAt(a.afijo.length - 1) === '-'; }

/* El sentido de un afijo: los prefijos lo traen escrito; en los sufijos está al
   principio de la nota, antes del ejemplo («La acción o su resultado: inform →
   information»). */
function sentidoDe(a){
  if(a.sentido) return a.sentido;
  var n = a.nota || '', i = n.indexOf(':');
  return (i > 0 ? n.slice(0, i) : n).replace(/\.$/, '').trim();
}
function significado(d){
  return MODO === 'afijos' ? sentidoDe(d) : d.formas.map(function(y){ return y.w; }).join(' · ');
}

/* ---------- progreso y récords ---------- */
function guardaProgreso(){ try { localStorage.setItem('coh_wordform', JSON.stringify(HECHOS)); } catch(e){} }
function leeProgreso(){ try { HECHOS = JSON.parse(localStorage.getItem('coh_wordform') || '{}') || {}; } catch(e){ HECHOS = {}; } }
function leeRecs(){ try { RECS = JSON.parse(localStorage.getItem('coh_wordform_rec') || '{}') || {}; } catch(e){ RECS = {}; } }
function claveItem(d){ return (MODO === 'afijos' ? 'a:' : 'f:') + term(d); }
function apunta(clave, bien){
  if(!clave) return;
  if(!HECHOS[clave]) HECHOS[clave] = {ok:0, no:0};
  HECHOS[clave][bien ? 'ok' : 'no']++;
  guardaProgreso();
}
function marca(d, bien){ if(d) apunta(claveItem(d), bien); }
function dominado(d){
  var h = HECHOS[claveItem(d)];
  if(!h) return false;
  var t = h.ok + h.no;
  return t >= 2 && h.ok / t >= 0.8;
}
function domBloque(b){ var n = 0; b.forEach(function(d){ if(dominado(d)) n++; }); return n; }
function recKey(j){ return MODO + ':' + j + '|' + LEVEL + '|' + IB; }
function rec(j){ return RECS[recKey(j)]; }
function guardaRec(j, v, mayorEsMejor){
  var a = RECS[recKey(j)];
  if(a == null || (mayorEsMejor ? v > a : v < a)){
    RECS[recKey(j)] = v;
    try { localStorage.setItem('coh_wordform_rec', JSON.stringify(RECS)); } catch(e){}
    return true;
  }
  return false;
}

/* ---------- bloques de diez ----------
   Cuatro prefijos significan «lo contrario» (un-, in-, im-, dis-): juntos en un
   bloque, la actividad de emparejar no tendría solución. Se separan por sentido.
   En las familias el choque es que una raíz empiece por otra (act / active). */
var VACIAS = {a:1,de:1,del:1,la:1,el:1,lo:1,los:1,las:1,un:1,una:1,o:1,y:1,en:1,que:1,se:1,su:1,
  con:1,por:1,para:1,al:1,como:1,es:1,ese:1,eso:1,esa:1};
function contenido(s){
  var o = {}, p = String(s || '').toLowerCase().replace(/[^a-záéíóúñü0-9\s]/g, ' ').split(/\s+/);
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
  if(MODO === 'afijos'){
    var sa = sentidoDe(a).toLowerCase(), sb = sentidoDe(b).toLowerCase();
    if(sa === sb) return true;
    return jac(contenido(sa), contenido(sb)) >= 0.5;
  }
  var ra = a.raiz, rb = b.raiz;
  if(ra.indexOf(rb) === 0 || rb.indexOf(ra) === 0) return true;
  // dos familias que comparten una forma dejarían la pareja sin dueño
  var vistos = {}, choque = false;
  a.formas.forEach(function(y){ vistos[y.w] = 1; });
  b.formas.forEach(function(y){ if(vistos[y.w]) choque = true; });
  return choque;
}
function armaBloques(l){
  var n = l.length, nb = Math.max(1, Math.ceil(n / POR_BLOQUE)), resto = n % POR_BLOQUE;
  if(nb > 1 && resto > 0 && resto <= 3) nb--;
  var bl = [], i;
  for(i = 0; i < nb; i++) bl.push([]);
  var pend = [];
  l.forEach(function(d){
    for(var i = 0; i < nb; i++){
      if(bl[i].length < POR_BLOQUE){
        var choque = false;
        for(var k = 0; k < bl[i].length; k++) if(chocan(bl[i][k], d)){ choque = true; break; }
        if(!choque){ bl[i].push(d); return; }
      }
    }
    pend.push(d);
  });
  pend.forEach(function(d){
    var orden = [], i;
    for(i = 0; i < nb; i++) orden.push(i);
    orden.sort(function(x, y){ return bl[x].length - bl[y].length; });
    for(i = 0; i < orden.length; i++){
      var b = bl[orden[i]], choque = false;
      for(var k = 0; k < b.length; k++) if(chocan(b[k], d)){ choque = true; break; }
      if(!choque){ b.push(d); return; }
    }
    bl[orden[0]].push(d);
  });
  return bl.filter(function(b){ return b.length; });
}

/* ---------- frases del corpus ---------- */
/* No vale la primera frase que contenga la palabra. El corpus son textos de
   nuestros cursos, y ahí dentro hay enunciados con sus propios huecos («This ___
   to be a common misunderstanding»), definiciones de glosario a medias y texto
   con marcas de formato: puestos como frase de un ejercicio, confunden. Se
   puntúan todas las candidatas y se coge una de las mejores. */
function punt(t, w){
  var p = 0;
  if(/_{2,}/.test(t)) p -= 6;
  if(t.indexOf('*') >= 0) p -= 4;
  if(t.indexOf('→') >= 0 || t.indexOf('->') >= 0) p -= 4;
  if(t.slice(0, 14).indexOf(':') >= 0) p -= 3;
  if(t.length < 30) p -= 3; else if(t.length > 170) p -= 4; else p += 2;
  if(/[.!?]["”’]?$/.test(t.trim())) p += 2;
  if(/^[A-Z“"]/.test(t.trim())) p += 1; else p -= 2;
  if(new RegExp('^\\W*' + escRx(w) + '\\b', 'i').test(t)) p -= 1;
  return p;
}
function mejorFrase(w, frases){
  var rx = new RegExp('\\b' + escRx(w) + '\\b', 'i'), cand = [];
  (frases || []).forEach(function(f){
    if(rx.test(f.t)) cand.push({t:f.t, p:punt(f.t, w)});
  });
  if(!cand.length) return null;
  cand.sort(function(a, b){ return b.p - a.p; });
  return alAzar(cand.filter(function(c){ return c.p >= cand[0].p - 2; }));
}
function fraseCon(w, frases){
  var m = mejorFrase(w, frases);
  return m ? m.t : null;
}
/* Corta la frase por la palabra: devuelve lo de antes, lo de después y la
   palabra tal como aparece (con su mayúscula). */
function parte(t, w){
  var m = new RegExp('\\b(' + escRx(w) + ')\\b', 'i').exec(t);
  if(!m) return null;
  return {pre:t.slice(0, m.index), real:m[1], post:t.slice(m.index + m[1].length)};
}
/* El hueco de un afijo se abre DENTRO de la palabra: el resto queda a la vista,
   así que la pregunta es qué afijo la construye y no cuál es la palabra. */
function huecoAfijo(a){
  var af = a.afijo.replace(/-/g, '').toLowerCase(), pre = esPrefijo(a), cand = [];
  (a.ejemplos || []).forEach(function(e){
    var low = e.w.toLowerCase();
    var borde = pre ? low.indexOf(af) === 0 : low.slice(-af.length) === af;
    if(!borde) return;
    var m = mejorFrase(e.w, e.frases);
    if(m) cand.push({w:e.w, t:m.t, p:m.p});
  });
  if(!cand.length) return null;
  cand.sort(function(x, y){ return y.p - x.p; });
  var c = alAzar(cand.filter(function(x){ return x.p >= cand[0].p - 2; }));
  var p = parte(c.t, c.w);
  if(!p) return null;
  return {pre:p.pre, post:p.post, palabra:p.real,
          resto:(pre ? p.real.slice(af.length) : p.real.slice(0, p.real.length - af.length)),
          afijoIzquierda:pre, item:a};
}
function huecoFamilia(f){
  var cand = [];
  f.formas.forEach(function(y){
    var m = mejorFrase(y.w, y.frases);
    if(m) cand.push({y:y, t:m.t, p:m.p});
  });
  if(!cand.length) return null;
  cand.sort(function(x, z){ return z.p - x.p; });
  var c = alAzar(cand.filter(function(x){ return x.p >= cand[0].p - 2; }));
  var p = parte(c.t, c.y.w);
  if(!p) return null;
  return {pre:p.pre, post:p.post, palabra:p.real, forma:c.y, item:f};
}
function hueco(d){ return MODO === 'afijos' ? huecoAfijo(d) : huecoFamilia(d); }
function pintaHueco(h, resuelto){
  var relleno = resuelto ?
    (MODO === 'afijos' ? esc(h.item.afijo.replace(/-/g, '')) : esc(h.palabra)) : '_____';
  var caja = '<span class="hueco' + (resuelto ? ' ok' : '') + '">' + relleno + '</span>';
  if(MODO !== 'afijos') return esc(h.pre) + caja + esc(h.post);
  return esc(h.pre) + (h.afijoIzquierda ? caja + esc(h.resto) : esc(h.resto) + caja) + esc(h.post);
}

/* ---------- navegación ---------- */
function pintaNiveles(){
  document.getElementById('levels').innerHTML = DATA.niveles.map(function(L){
    var n = lista(L).length;
    return '<button class="lv" data-l="' + L + '" aria-pressed="' + (L === LEVEL) + '"' +
      ' style="--c:' + COLORS[L] + ';--cl:' + COLORS[L] + '18;--cd:' + COLORS[L] + '"' +
      ' onclick="setLevel(this.dataset.l)">' + L + '<small>' + n + ' ' + modoLabel() + ' · ' + NOMBRES[L] + '</small></button>';
  }).join('');
}
function recarga(){ BLOQUES = armaBloques(lista()); if(IB >= BLOQUES.length) IB = 0; }
function setLevel(L){
  LEVEL = L; IB = 0; PAG = 0; FILTRO = ''; ACT = null; ST = null;
  recarga(); pintaNiveles(); render();
}
function setModo(m){
  MODO = m; IB = 0; PAG = 0; FILTRO = ''; ACT = null; ST = null;
  recarga(); pintaNiveles(); render(); arriba();
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

function selectorModo(){
  return '<div class="modos">' +
    ['afijos','familias'].map(function(m){
      var n = (m === 'afijos' ? afijosDe(LEVEL) : familiasDe(LEVEL)).length;
      return '<button class="modo" aria-pressed="' + (m === MODO) + '" onclick="setModo(\'' + m + '\')">' +
        (m === 'afijos' ? 'Prefixes and suffixes' : 'Word families') + ' <b>' + n + '</b></button>';
    }).join('') + '</div>';
}
function cabecera(){
  var b = BLOQUES[IB] || [];
  var chips = BLOQUES.map(function(bl, i){
    var dom = domBloque(bl);
    return '<button class="bk" aria-pressed="' + (i === IB) + '" onclick="setBloque(' + i + ')"' +
      ' title="Block ' + (i + 1) + ': ' + dom + ' of ' + bl.length + ' mastered">' + (i + 1) +
      '<i><b style="width:' + Math.round(dom / bl.length * 100) + '%"></b></i></button>';
  }).join('');
  return selectorModo() +
    '<div class="blockhead">Block <b>' + (IB + 1) + '</b> of ' + BLOQUES.length + ' · ' +
    b.length + ' ' + modoLabel() + ' · ' + plural(domBloque(b), 'mastered', 'mastered') + '</div>' +
    '<div class="blocks">' + chips + '</div>';
}

/* ---------- aprender ---------- */
function porPagina(){ return (window.innerWidth < 640 || window.innerHeight < 640) ? 2 : 3; }
function vistaAprender(){
  if(!BLOQUES.length) return selectorModo() + '<div class="empty">There is nothing at this level yet.</div>';
  return cabecera() +
    '<input class="find" id="find" placeholder="Filter by affix, root or meaning…"' +
    ' oninput="filtra(this.value)" autocomplete="off" value="' + esc(FILTRO) + '">' +
    '<div id="lista">' + cuerpoAprender() + '</div>';
}
function cuerpoAprender(){
  if(FILTRO){
    var f = FILTRO.toLowerCase();
    var l = lista().filter(function(d){
      return term(d).toLowerCase().indexOf(f) >= 0 ||
        significado(d).toLowerCase().indexOf(f) >= 0 ||
        String(d.nota || '').toLowerCase().indexOf(f) >= 0;
    });
    return '<div class="hint" style="margin:0 0 11px">' + l.length + ' at level ' + LEVEL +
      ' in total. Clear the filter to go back to the block.</div>' + tarjetas(l);
  }
  return carrusel();
}
function filtra(v){
  FILTRO = (v || '').trim(); PAG = 0;
  document.getElementById('lista').innerHTML = cuerpoAprender();
}
function carrusel(){
  var b = BLOQUES[IB] || [];
  PP = porPagina();
  var np = Math.max(1, Math.ceil(b.length / PP));
  if(PAG >= np) PAG = np - 1;
  if(PAG < 0) PAG = 0;
  var primera = IB === 0 && PAG === 0, ultima = IB === BLOQUES.length - 1 && PAG === np - 1;
  var h = '<div class="deckwrap">' +
    '<button class="arrow" type="button" onclick="mueve(-1)" aria-label="Previous"' + (primera ? ' disabled' : '') + '>&lsaquo;</button>' +
    '<div class="deck" id="deck">' + tarjetas(b.slice(PAG * PP, PAG * PP + PP)) + '</div>' +
    '<button class="arrow" type="button" onclick="mueve(1)" aria-label="Next"' + (ultima ? ' disabled' : '') + '>&rsaquo;</button>' +
    '</div><div class="dots">';
  for(var i = 0; i < np; i++){
    h += '<button class="dot' + (i === PAG ? ' on' : '') + '" type="button" onclick="vePag(' + i + ')" aria-label="Screen ' + (i + 1) + '"></button>';
  }
  h += '</div><div class="pagenum">Screen ' + (PAG + 1) + ' of ' + np + ' · move with &lsaquo; &rsaquo; or the ← → keys</div>';
  if(PAG === np - 1){
    h += '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="alPracticar()">Practise this block</button>' +
      (IB < BLOQUES.length - 1 ? '<button class="btn sec" onclick="setBloque(' + (IB + 1) + ')">Next block</button>' : '') +
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
function tarjetas(l){
  if(!l.length) return '<div class="empty">Nothing to show.</div>';
  return l.map(MODO === 'afijos' ? tarjetaAfijo : tarjetaFamilia).join('');
}
function tarjetaAfijo(a){
  var cl = a.clase ? '<span class="badge ' + (CLASE[a.clase] || '') + '">' + esc(CLASE_EN[a.clase] || a.clase) + '</span>' : '';
  var abierto = ABIERTO[a.afijo];
  var chips = (a.ejemplos || []).slice(0, 6).map(function(e, i){
    return '<button class="chip' + (abierto === i ? ' on' : '') + '" type="button" data-af="' + esc(a.afijo) +
      '" data-i="' + i + '">' + esc(e.w) + '</button>';
  }).join('');
  var muestra = '';
  if(abierto != null && a.ejemplos[abierto]){
    var e = a.ejemplos[abierto], t = fraseCon(e.w, e.frases);
    if(t){
      var p = parte(t, e.w);
      muestra = '<div class="ex">' + (p ? esc(p.pre) + '<b>' + esc(p.real) + '</b>' + esc(p.post) : esc(t)) + '</div>';
    }
  }
  return '<div class="card"><span class="afijo">' + esc(a.afijo) + '</span>' +
    '<span class="sentido">' + esc(sentidoDe(a)) + '</span>' + cl +
    '<span class="badge">' + esc(a.nivel) + '</span>' +
    (dominado(a) ? '<span class="badge dom">mastered</span>' : '') +
    '<div class="nota">' + esc(a.nota || '') + '</div>' +
    '<div class="chips">' + chips + '</div>' + muestra +
    '<div class="hint">Tap a word to see it in a sentence from your course.</div></div>';
}
function tarjetaFamilia(f){
  var formas = f.formas.map(function(y){
    return '<span class="chip">' + esc(y.w) + '<span class="badge ' + (CLASE[y.clase] || '') +
      '" style="margin-left:6px">' + esc(y.sufijo) + '</span></span>';
  }).join('<span class="flecha">·</span>');
  var h = huecoFamilia(f), muestra = '';
  if(h) muestra = '<div class="ex">' + esc(h.pre) + '<b>' + esc(h.palabra) + '</b>' + esc(h.post) + '</div>';
  return '<div class="card"><span class="afijo">' + esc(f.raiz) + '</span>' +
    '<span class="badge">' + esc(f.nivel) + '</span>' +
    (dominado(f) ? '<span class="badge dom">mastered</span>' : '') +
    '<div class="fam">' + formas + '</div>' + muestra + '</div>';
}
function verEjemplo(af, i){
  ABIERTO[af] = ABIERTO[af] === i ? null : i;
  if(FILTRO) document.getElementById('lista').innerHTML = cuerpoAprender();
  else render();
}

/* ---------- practicar ---------- */
function vistaPractica(){
  if(!BLOQUES.length) return selectorModo() + '<div class="empty">There is nothing at this level yet.</div>';
  if(ACT === 'gap') return vistaRelleno();
  if(ACT === 'par') return vistaEmparejar();
  if(ACT === 'mix') return vistaMixto();
  var b = BLOQUES[IB] || [];
  var af = MODO === 'afijos';
  return cabecera() + '<div class="acts">' +
    acto('gap', '&#10003;', 'Fill in the gaps',
      af ? 'Sentences from your course with the affix removed from inside the word: choose which of the ' + b.length + ' forms it.'
         : 'Sentences from your course with a word removed: choose which of the ' + b.length + ' roots it comes from.') +
    acto('par', '&#8646;', af ? 'Match meanings' : 'Match with its root',
      af ? 'Match each affix with what it adds to the word, in rounds of five.'
         : 'Match each derived word with the root it comes from, in rounds of five.') +
    acto('mix', '&#10022;', 'Mixed review',
      af ? 'Varied questions from the block: what class of word each suffix forms, what it adds and which prefix each root needs.'
         : 'Varied questions from the block: the form that fits the sentence and the odd one out in the family.') +
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
    '<p>' + tit + ' · ' + ok + ' of ' + total + ' in block ' + (IB + 1) + ' of ' + LEVEL + '.</p>' +
    '<div class="row" style="justify-content:center">' +
    '<button class="btn" onclick="inicia(\'' + a + '\')">Again</button>' +
    (IB < BLOQUES.length - 1 ? '<button class="btn sec" onclick="setBloque(' + (IB + 1) + ')">Next block</button>' : '') +
    '<button class="btn sec" onclick="alMenu()">Other activities</button></div></div>';
}

/* Rellenar: el banco son los diez del bloque. */
function iniciaRelleno(){
  var b = BLOQUES[IB] || [], huecos = [];
  mezcla(b).forEach(function(d){
    var h = hueco(d);
    if(h) huecos.push(h);
  });
  ST = {huecos:huecos, banco:mezcla(b), i:0, ok:0, hechos:{}, resuelto:false, fallo:false};
  ACT = 'gap'; render(); arriba();
}
function vistaRelleno(){
  var n = ST.huecos.length;
  if(!n) return '<div class="card"><div class="empty">This block has no sentences for gap-fills.</div>' +
    '<div class="row" style="justify-content:center"><button class="btn sec" onclick="alMenu()">Other activities</button></div></div>';
  if(ST.i >= n) return resumenAct('Fill in the gaps', ST.ok, n, 'gap');
  var h = ST.huecos[ST.i], d = h.item;
  return '<div class="bar"><i style="width:' + Math.round(ST.i / n * 100) + '%"></i></div>' +
    '<div class="meta"><span>Sentence ' + (ST.i + 1) + ' of ' + n + ' · block ' + (IB + 1) + '</span>' +
    '<span>' + ST.ok + ' on the first try</span></div>' +
    '<div class="card"><div class="sent">' + pintaHueco(h, ST.resuelto) + '</div>' +
    '<div class="banktitle">Choose the option that fits best</div><div class="bank">' +
    ST.banco.map(function(x){
      var tt = term(x), hecho = ST.hechos[tt];
      return '<button class="w' + (hecho ? ' done' : '') + '" type="button" data-t="' + esc(tt) + '"' +
        ((hecho || ST.resuelto) ? ' disabled' : '') + '>' + esc(tt) + '</button>';
    }).join('') +
    '</div><div id="fb">' + (ST.resuelto ? feedbackRelleno(h, d) : '') + '</div></div>';
}
function feedbackRelleno(h, d){
  var txt = MODO === 'afijos' ?
    '<b>' + esc(h.palabra) + '</b> = ' + esc(d.afijo) + ' · ' + esc(sentidoDe(d)) :
    '<b>' + esc(h.palabra) + '</b> = ' + esc(d.raiz) + ' + -' + esc(h.forma.sufijo) + ' (' + esc(CLASE_EN[h.forma.clase] || h.forma.clase) + ')';
  return '<div class="fb ok">' + txt +
    '<button class="btn sm" style="margin-left:12px" onclick="sigRelleno()">Next</button></div>';
}
function eligeBanco(btn){
  if(ACT !== 'gap' || !ST || ST.resuelto) return;
  var h = ST.huecos[ST.i], d = h.item, t = term(d), sel = btn.getAttribute('data-t');
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
    var porque = otro ? (MODO === 'afijos' ?
      '<b>' + esc(sel) + '</b> means «' + esc(sentidoDe(otro)) + '».' :
      '<b>' + esc(sel) + '</b> gives ' + esc(significado(otro)) + '.') : 'That does not fit here.';
    document.getElementById('fb').innerHTML = '<div class="fb no">' + porque +
      (ST.fallo ? ' Read the whole sentence again: the word has to make sense there.' : '') + '</div>';
    ST.fallo = true;
    setTimeout(function(){ btn.classList.remove('bad'); }, 900);
  }
}
function sigRelleno(){ ST.i++; ST.resuelto = false; ST.fallo = false; render(); arriba(); }

/* Emparejar: afijo con su sentido, o palabra derivada con su raíz. */
function paresDe(b){
  if(MODO === 'afijos'){
    return b.map(function(a){ return {izq:a.afijo, der:sentidoDe(a), item:a}; });
  }
  return b.map(function(f){
    var y = alAzar(f.formas);
    return {izq:y.w, der:f.raiz, item:f};
  });
}
function iniciaEmparejar(){
  var pares = mezcla(paresDe(BLOQUES[IB] || [])), rondas = [];
  for(var i = 0; i < pares.length; i += 5) rondas.push(pares.slice(i, i + 5));
  if(rondas.length > 1 && rondas[rondas.length - 1].length < 2){
    var u = rondas.pop();
    rondas[rondas.length - 1] = rondas[rondas.length - 1].concat(u);
  }
  ST = {rondas:rondas, r:0, ok:0, err:0, der:[], hechos:0, selEl:null};
  ACT = 'par'; iniciaRonda(); render(); arriba();
}
function iniciaRonda(){
  var g = ST.rondas[ST.r] || [];
  ST.der = mezcla(g.map(function(p, i){ return i; }));
  ST.hechos = 0; ST.selEl = null;
}
function vistaEmparejar(){
  if(ST.r >= ST.rondas.length) return resumenAct('Match', ST.ok, ST.ok + ST.err, 'par');
  var g = ST.rondas[ST.r];
  return '<div class="meta" style="margin-bottom:10px"><span>Round ' + (ST.r + 1) + ' of ' + ST.rondas.length +
    ' · block ' + (IB + 1) + '</span><span>' + plural(ST.ok, 'correct answer', 'correct answers') + ' · ' +
    plural(ST.err, 'mistake', 'mistakes') + '</span></div>' +
    '<div class="card"><div class="q">' +
    (MODO === 'afijos' ? 'Match each affix with what it adds.' : 'Match each word with the root it comes from.') +
    '</div><div class="match"><div>' +
    g.map(function(p, i){
      return '<button class="mt" type="button" style="width:100%;margin-bottom:8px" data-side="L" data-i="' + i + '">' + esc(p.izq) + '</button>';
    }).join('') + '</div><div>' +
    ST.der.map(function(i){
      return '<button class="mt" type="button" style="width:100%;margin-bottom:8px" data-side="R" data-i="' + i + '">' + esc(g[i].der) + '</button>';
    }).join('') + '</div></div><div id="fb"></div></div>';
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
  var par = ST.rondas[ST.r][+izq.getAttribute('data-i')];
  var bien = sel.getAttribute('data-i') === b.getAttribute('data-i');
  sel.setAttribute('aria-pressed', 'false');
  if(bien){
    sel.classList.add('done'); b.classList.add('done');
    ST.hechos++; ST.ok++; marca(par.item, true);
    if(ST.hechos === ST.rondas[ST.r].length){
      document.getElementById('fb').innerHTML = '<div class="fb ok">Round complete. ' +
        '<button class="btn sm" style="margin-left:10px" onclick="sigRonda()">' +
        (ST.r < ST.rondas.length - 1 ? 'Next round' : 'See result') + '</button></div>';
    }
  } else {
    ST.err++; marca(par.item, false);
    document.getElementById('fb').innerHTML = '<div class="fb no">Not that one. Try again.</div>';
  }
  ST.selEl = null;
}
function sigRonda(){ ST.r++; iniciaRonda(); render(); arriba(); }

/* ---------- preguntas sueltas, generadas sobre el bloque ---------- */
/* Hueco al estilo del Use of English de Cambridge: se da la raíz en mayúsculas
   y el alumno elige la forma que encaja. La frase es de su propio curso. */
function pregHueco(b){
  var fams = b.filter(function(f){ return f.formas && f.formas.length >= 2; });
  if(!fams.length) return null;
  var f = alAzar(fams), h = huecoFamilia(f);
  if(!h) return null;
  var otras = f.formas.filter(function(z){ return z.w !== h.forma.w; }).map(function(z){ return z.w; });
  var pool = [];
  b.forEach(function(g){ if(g !== f) g.formas.forEach(function(z){ pool.push(z.w); }); });
  pool = mezcla(pool);
  while(otras.length < 3 && pool.length){
    var c = pool.pop();
    if(c !== h.forma.w && otras.indexOf(c) < 0) otras.push(c);
  }
  return {clave:'h:' + h.forma.w, item:f,
    enunciado:'Complete the sentence with the correct form.',
    stem:esc(h.pre) + '<u></u>' + esc(h.post), dado:f.raiz,
    opciones:mezcla([h.forma.w].concat(otras.slice(0, 3))), correcta:h.forma.w,
    porque:'«' + f.raiz + '» + «' + h.forma.sufijo + '» makes a ' + (CLASE_EN[h.forma.clase] || h.forma.clase) + ': ' + h.forma.w + '.'};
}
/* Qué clase de palabra produce un sufijo. */
function pregClase(b){
  var suf = b.filter(function(a){ return a.clase; });
  if(!suf.length) return null;
  var a = alAzar(suf);
  return {clave:'c:' + a.afijo, item:a,
    enunciado:'What class of word does the suffix <b>' + esc(a.afijo) + '</b> form?',
    stem:a.ejemplos.slice(0, 4).map(function(e){ return esc(e.w); }).join(' · '),
    opciones:mezcla(['noun','adjective','verb','adverb']), correcta:CLASE_EN[a.clase] || a.clase, porque:a.nota};
}
/* Qué aporta un afijo. Varios comparten sentido ('lo contrario' vale para un-,
   in-, im- y dis-), así que los distractores se deduplican entre sí: si no, la
   pregunta sale con dos opciones iguales y no tiene solución. */
function pregSentido(b){
  var todos = afijosDe(LEVEL);
  if(!b.length || todos.length < 4) return null;
  var a = alAzar(b), vistos = {}, otros = [];
  vistos[sentidoDe(a).toLowerCase()] = 1;
  mezcla(todos).forEach(function(x){
    var s = sentidoDe(x).toLowerCase();
    if(vistos[s] || otros.length >= 3) return;
    vistos[s] = 1; otros.push(sentidoDe(x));
  });
  if(otros.length < 2) return null;
  return {clave:'s:' + a.afijo, item:a,
    enunciado:'What does <b>' + esc(a.afijo) + '</b> add to the word?',
    stem:a.ejemplos.slice(0, 4).map(function(e){ return esc(e.w); }).join(' · '),
    opciones:mezcla([sentidoDe(a)].concat(otros)), correcta:sentidoDe(a), porque:a.nota};
}
/* Qué prefijo necesita esta raíz. */
function pregPrefijo(b){
  var pre = b.filter(esPrefijo);
  var todos = prefijosDe(LEVEL);
  if(!pre.length || todos.length < 3) return null;
  var a = alAzar(pre), e = alAzar(a.ejemplos);
  var raiz = e.w.slice(a.afijo.replace(/-/g, '').length);
  var otros = mezcla(todos.filter(function(x){ return x.afijo !== a.afijo; })).slice(0, 3);
  if(!raiz || otros.length < 2) return null;
  return {clave:'p:' + e.w, item:a,
    enunciado:'Which prefix does <b>' + esc(raiz) + '</b> need to make <b>' + esc(e.w) + '</b>?',
    stem:'', opciones:mezcla([a.afijo].concat(otros.map(function(x){ return x.afijo; }))),
    correcta:a.afijo, porque:a.afijo + ' means «' + sentidoDe(a) + '». ' + (a.nota || '')};
}
/* Cuál NO es de la familia. */
function pregIntruso(b){
  var fams = b.filter(function(f){ return f.formas.length >= 3; });
  var otras = familiasDe(LEVEL).filter(function(g){ return b.indexOf(g) < 0; });
  if(!fams.length || !otras.length) return null;
  var f = alAzar(fams), intruso = alAzar(alAzar(otras).formas).w;
  var tres = mezcla(f.formas).slice(0, 3).map(function(y){ return y.w; });
  if(tres.indexOf(intruso) >= 0) return null;
  return {clave:'i:' + f.raiz, item:f,
    enunciado:'Which one is <b>not</b> from the same family as the others?',
    stem:'', opciones:mezcla(tres.concat([intruso])), correcta:intruso,
    porque:tres.join(', ') + ' all come from «' + f.raiz + '».'};
}
function generadores(){
  return MODO === 'afijos' ? [pregClase, pregSentido, pregPrefijo] : [pregHueco, pregHueco, pregIntruso];
}
function iniciaMixto(){
  var b = BLOQUES[IB] || [], gs = generadores(), q = [], vistas = {};
  for(var i = 0; i < 90 && q.length < 12; i++){
    var p = gs[i % gs.length](b);
    if(!p || p.opciones.length < 2) continue;
    var firma = p.clave + '|' + p.correcta;
    if(vistas[firma]) continue;
    vistas[firma] = 1; q.push(p);
  }
  ST = {q:mezcla(q), i:0, ok:0};
  ACT = 'mix'; render(); arriba();
}
function vistaMixto(){
  var n = ST.q.length;
  if(!n) return '<div class="card"><div class="empty">This block does not have enough for standalone questions.</div>' +
    '<div class="row" style="justify-content:center"><button class="btn sec" onclick="alMenu()">Other activities</button></div></div>';
  if(ST.i >= n) return resumenAct('Mixed review', ST.ok, n, 'mix');
  var p = ST.q[ST.i];
  return '<div class="bar"><i style="width:' + Math.round(ST.i / n * 100) + '%"></i></div>' +
    '<div class="meta"><span>Question ' + (ST.i + 1) + ' of ' + n + ' · block ' + (IB + 1) + '</span>' +
    '<span>' + ST.ok + ' correct</span></div><div class="card">' +
    '<div class="q">' + p.enunciado + '</div>' +
    (p.stem ? '<div class="stem">' + p.stem + '</div>' : '') +
    (p.dado ? '<div class="given">' + esc(p.dado) + '</div>' : '') +
    '<div class="opts" id="opts" style="margin-top:12px">' +
    p.opciones.map(function(o, i){
      return '<button class="opt" type="button" data-i="' + i + '">' + esc(o) + '</button>';
    }).join('') + '</div><div id="fb"></div></div>';
}
function responde(i){
  var p = ST.q[ST.i], elegida = p.opciones[i], bien = elegida === p.correcta;
  if(bien) ST.ok++;
  apunta(p.clave, bien);
  marca(p.item, bien);
  var bs = document.querySelectorAll('#opts .opt');
  for(var k = 0; k < bs.length; k++){
    bs[k].disabled = true;
    if(p.opciones[k] === p.correcta) bs[k].classList.add('good');
    else if(k === i) bs[k].classList.add('bad');
  }
  document.getElementById('fb').innerHTML = '<div class="fb ' + (bien ? 'ok' : 'no') + '">' +
    (bien ? 'Correct! ' : 'It was «' + esc(p.correcta) + '». ') + esc(p.porque || '') +
    '<button class="btn sm" style="margin-left:12px" onclick="sigMixto()">Next</button></div>';
}
function sigMixto(){ ST.i++; render(); arriba(); }

/* ---------- juegos ---------- */
function vistaJuegos(){
  if(!BLOQUES.length) return selectorModo() + '<div class="empty">There is nothing at this level yet.</div>';
  if(ACT === 'speed') return vistaSpeed();
  if(ACT === 'mem') return vistaMem();
  var rs = rec('speed'), rm = rec('mem'), af = MODO === 'afijos';
  return cabecera() + '<div class="acts">' +
    acto('speed', '&#9201;', 'Time trial',
      SEGUNDOS + ' seconds: ' + (af ? 'recognise the affix by its meaning or by the half-finished word.'
        : 'choose the form that fits the sentence.') + ' Chain correct answers and the point is worth double, then triple.',
      rs != null ? 'Record ' + rs : '') +
    acto('mem', '&#9635;', 'Memory',
      af ? 'Six pairs face down: each affix with what it adds.'
         : 'Six pairs face down: each word with its root.',
      rm != null ? 'Record ' + rm + ' moves' : '') +
    '</div><div class="hint">Records are for this block and are saved in this browser.</div>';
}
function iniciaSpeed(){
  ACT = 'speed';
  ST = {hasta:Date.now() + SEGUNDOS * 1000, puntos:0, racha:0, mejorRacha:0, aciertos:0, fallos:0,
        terminado:false, bloq:false, q:null, nuevoRecord:false};
  nuevaQ(); render();
}
function nuevaQ(){
  var b = BLOQUES[IB] || [];
  if(MODO === 'familias'){
    for(var i = 0; i < 10; i++){
      var p = pregHueco(b);
      if(p){ ST.q = p; return; }
    }
    ST.q = null; return;
  }
  var a = alAzar(b), porSentido = Math.random() < 0.5, h = porSentido ? null : huecoAfijo(a);
  var otros = mezcla(b.filter(function(x){ return x.afijo !== a.afijo; })).slice(0, 3).map(function(x){ return x.afijo; });
  var pool = mezcla(afijosDe(LEVEL));
  for(var k = 0; k < pool.length && otros.length < 3; k++){
    if(pool[k].afijo !== a.afijo && otros.indexOf(pool[k].afijo) < 0) otros.push(pool[k].afijo);
  }
  var op = mezcla([a.afijo].concat(otros));
  ST.q = {item:a, clave:'s:' + a.afijo, opciones:op, correcta:a.afijo,
    enunciado: h ? 'Complete the word:' : 'Which affix adds «<b>' + esc(sentidoDe(a)) + '</b>»?',
    // Sin las palabras de ejemplo: aquí las opciones son los afijos, y enseñar
    // «reaction · recover · remove» al lado de «re-» regala la respuesta.
    stem: h ? (h.afijoIzquierda ? '<u></u>' + esc(h.resto) : esc(h.resto) + '<u></u>') +
      ' <span class="hint" style="margin:0">(' + esc(h.pre.trim() || '…') + ' …)</span>' : ''};
}
function vistaSpeed(){
  if(ST.terminado || !ST.q){
    return '<div class="card" style="text-align:center"><div class="score">' + ST.puntos + '</div>' +
      '<p>' + plural(ST.aciertos, 'correct answer', 'correct answers') + ' and ' + plural(ST.fallos, 'mistake', 'mistakes') +
      ' in ' + SEGUNDOS + ' seconds · best streak ' + ST.mejorRacha + '.</p>' +
      (ST.nuevoRecord ? '<p style="color:var(--ok);font-weight:600">New record for this block!</p>' :
        (rec('speed') != null ? '<p class="hint">Your record for block ' + (IB + 1) + ' is ' + rec('speed') + '.</p>' : '')) +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="inicia(\'speed\')">Again</button>' +
      '<button class="btn sec" onclick="alMenu()">Back to games</button></div></div>';
  }
  var q = ST.q, queda = Math.max(0, ST.hasta - Date.now());
  return '<div class="hud"><span class="pts">' + ST.puntos + ' points</span>' +
    '<span class="racha">' + (ST.racha >= 3 ? 'Streak ' + ST.racha + ' · x' + mult() : (ST.racha ? 'Streak ' + ST.racha : '')) + '</span>' +
    '<span id="tnum">' + Math.ceil(queda / 1000) + ' s</span></div>' +
    '<div class="tbar" id="tw"><i id="tbar" style="width:' + (queda / (SEGUNDOS * 1000) * 100) + '%"></i></div>' +
    '<div class="card"><div class="q">' + q.enunciado + '</div>' +
    (q.stem ? '<div class="stem">' + q.stem + '</div>' : '') +
    (q.dado ? '<div class="given">' + esc(q.dado) + '</div>' : '') +
    '<div class="opts" id="opts" style="margin-top:12px">' +
    q.opciones.map(function(o, i){
      return '<button class="opt" type="button" data-i="' + i + '">' + esc(o) + '</button>';
    }).join('') + '</div></div>';
}
function mult(){ return ST.racha >= 6 ? 3 : (ST.racha >= 3 ? 2 : 1); }
function respondeSpeed(i){
  if(!ST || ST.bloq || ST.terminado || !ST.q) return;
  var bien = ST.q.opciones[i] === ST.q.correcta;
  ST.bloq = true;
  apunta(ST.q.clave, bien);
  marca(ST.q.item, bien);
  if(bien){
    ST.racha++; ST.aciertos++;
    if(ST.racha > ST.mejorRacha) ST.mejorRacha = ST.racha;
    ST.puntos += 10 * mult();
  } else { ST.racha = 0; ST.fallos++; }
  var bs = document.querySelectorAll('#opts .opt');
  for(var k = 0; k < bs.length; k++){
    bs[k].disabled = true;
    if(ST.q.opciones[k] === ST.q.correcta) bs[k].classList.add('good');
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
function iniciaMem(){
  var pares = mezcla(paresDe(BLOQUES[IB] || [])).slice(0, 6), cs = [];
  pares.forEach(function(p, i){
    cs.push({p:i, k:'t', x:p.izq, d:p.item});
    cs.push({p:i, k:'d', x:p.der, d:p.item});
  });
  ST = {cartas:mezcla(cs), abiertas:[], hechas:{}, movs:0, t0:Date.now(), bloq:false,
        total:pares.length, fin:null, nuevoRecord:false};
  ACT = 'mem'; render(); arriba();
}
function vistaMem(){
  var hechas = 0, k;
  for(k in ST.hechas) hechas++;
  if(ST.fin != null){
    return '<div class="card" style="text-align:center"><div class="score">' + ST.movs + '</div>' +
      '<p>' + (ST.movs === 1 ? 'move' : 'moves') + ' for the ' + ST.total + ' pairs, in ' +
      plural(ST.fin, 'second', 'seconds') + '.</p>' +
      (ST.nuevoRecord ? '<p style="color:var(--ok);font-weight:600">New record for this block!</p>' :
        (rec('mem') != null ? '<p class="hint">Your record for block ' + (IB + 1) + ' is ' +
          plural(rec('mem'), 'move', 'moves') + '.</p>' : '')) +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn" onclick="inicia(\'mem\')">Again</button>' +
      '<button class="btn sec" onclick="alMenu()">Back to games</button></div></div>';
  }
  return '<div class="hud"><span>Pairs <b>' + hechas + ' / ' + ST.total + '</b></span>' +
    '<span class="racha">' + plural(ST.movs, 'move', 'moves') + '</span></div>' +
    '<div class="mem">' + ST.cartas.map(function(c, i){
      var hecha = ST.hechas[c.p], abierta = ST.abiertas.indexOf(i) >= 0;
      if(hecha || abierta){
        return '<button class="mc' + (hecha ? ' hecha' : '') + (c.k === 't' ? ' term' : '') + '" type="button" data-c="' + i + '"' +
          (hecha ? ' disabled' : '') + '>' + esc(c.x) + '</button>';
      }
      return '<button class="mc tapada" type="button" data-c="' + i + '">?</button>';
    }).join('') + '</div>' +
    '<div class="hint">' + (MODO === 'afijos' ? 'Each affix with what it adds.' : 'Each word with its root.') +
    ' The best number of moves is saved.</div>';
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
  var l = lista(), vistos = 0, dom = 0;
  var filas = l.map(function(d){
    var h = HECHOS[claveItem(d)];
    if(h) vistos++;
    var tot = h ? h.ok + h.no : 0, pct = tot ? Math.round(h.ok / tot * 100) : 0;
    if(dominado(d)) dom++;
    return '<div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:11px 15px">' +
      '<span class="afijo" style="font-size:1rem">' + esc(term(d)) + '</span>' +
      '<span style="font-size:.88rem;color:' + (tot && pct >= 80 ? 'var(--ok)' : 'var(--muted)') + '">' +
      (tot ? h.ok + '/' + tot + ' · ' + pct + '%' : 'not practised yet') + '</span></div>';
  }).join('');
  var porBloque = BLOQUES.map(function(b, i){
    var n = domBloque(b);
    return '<div style="display:flex;align-items:center;gap:10px;margin-top:9px">' +
      '<button class="btn sec sm" onclick="setBloque(' + i + ')">Block ' + (i + 1) + '</button>' +
      '<div class="bar" style="flex:1;margin:0"><i style="width:' + Math.round(n / b.length * 100) + '%"></i></div>' +
      '<span style="font-size:.85rem;color:var(--muted);white-space:nowrap">' + n + '/' + b.length + '</span></div>';
  }).join('');
  return selectorModo() +
    '<div class="card"><b>' + dom + '</b> of ' + l.length + ' mastered at ' + LEVEL + ' (' + modoLabel() + ')' +
    ' · ' + vistos + ' practised.<div class="bar"><i style="width:' +
    (l.length ? Math.round(dom / l.length * 100) : 0) + '%"></i></div>' +
    '<div class="hint">An item counts as mastered after two attempts with 80% correct. Progress is saved in this browser.</div></div>' +
    '<div class="card"><b>By block</b>' + porBloque + '</div>' + filas;
}

/* ---------- pintado y eventos ---------- */
function render(){
  if(ACT !== 'speed') paraReloj();
  var v = document.getElementById('view');
  v.innerHTML = TAB === 'learn' ? vistaAprender() :
    TAB === 'practice' ? vistaPractica() :
    TAB === 'games' ? vistaJuegos() : vistaProgreso();
  if(ACT === 'speed' && ST && !ST.terminado && !RELOJ) arrancaReloj();
}

// Delegado y no onclick inline: hay afijos y raíces que llevan guion o apóstrofe
// y romperían el atributo sin avisar.
document.addEventListener('click', function(ev){
  var t = ev.target, b;
  if(!t || !t.closest) return;
  if((b = t.closest('.chip')) && b.getAttribute('data-af') != null){
    verEjemplo(b.getAttribute('data-af'), +b.getAttribute('data-i')); return;
  }
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
  if(ev.key === 'ArrowLeft') mueve(-1);
  else if(ev.key === 'ArrowRight') mueve(1);
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

leeProgreso(); leeRecs();
fetch('data.json?v=1').then(function(r){ return r.json(); }).then(function(d){
  DATA = d;
  if(DATA.niveles.indexOf(LEVEL) < 0) LEVEL = DATA.niveles[0];
  recarga(); pintaNiveles(); render();
}).catch(function(){
  document.getElementById('view').innerHTML =
    '<div class="empty">Could not load the material. Please try again in a moment.</div>';
});
