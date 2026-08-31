/* Convierte los bloques de una ficha en cosas QUE SE PUEDEN RESPONDER.
 *
 * El digitalizador (tools/digitaliza_fichas.py) saca del .docx el texto tal
 * cual y solo crea campo donde el Word tenia una linea de guiones bajos o una
 * tabla. Eso dejaba fuera medio ejercicio: en la U4 de 9.º habia 18 preguntas
 * de verdadero/falso, 138 opciones a)/b)/c), 131 alternativas del tipo
 * "(slightly / utterly)" y 234 preguntas sueltas que el alumno leia sin tener
 * donde contestar — la queja concreta fue la semana 4, "Sleep, Screens and
 * the Science of Rest".
 *
 * Aqui se lee la CONSIGNA (lo que la ficha manda hacer) y se le da a cada
 * cosa la forma que esa consigna pide:
 *
 *   "... T / F"                    -> dos botones, True o False
 *   "[ ] idea"  /  "☐ idea"        -> casilla que se marca
 *   "a) ...  b) ...  c) ..."       -> una sola opcion, esten en bloques
 *                                     separados o en el mismo parrafo
 *   "( getting / to get )"         -> desplegable con las dos formas
 *   "Tick the ones you'll use" +   -> casillas: la consigna manda marcar,
 *      lista de preguntas             no escribir
 *   "Answer in short sentences" +  -> un campo por pregunta, en vez de un
 *      lista de preguntas             solo cuadro para las siete
 *   pregunta suelta que acaba en ? -> campo de una linea
 *
 * Lo que NO lleva campo, a proposito: lo que la ficha manda HABLAR ("discuss
 * in pairs"), los titulos de actividad numerados, las preguntas dentro de un
 * texto de lectura, y los bancos de letras "A. … · B. …" que acompanan a una
 * tabla de emparejar (ahi se escribe la letra en la tabla, que es lo que pide
 * la ficha).
 *
 * Cada bloque conserva su indice original en `_k`: los identificadores de los
 * huecos ya respondidos siguen siendo los mismos aunque aqui se anadan cosas.
 *
 * Lo usan worksheet.html (para pintar la ficha) y app.js (para que el
 * profesor vea el enunciado al lado de la respuesta, y no "tf12: F").
 */
window.WSITEMS = (function () {

  var RE_TF     = /[\s(\[]*\bT\s*\/\s*F\b[\s)\].]*$/i;
  var RE_TF2    = /[\s(\[]*\btrue\s*\/\s*false\b[\s)\].]*$/i;
  var RE_TICK   = /^\s*(?:\[\s*[xX✓]?\s*\]|\(\s*[xX✓]?\s*\)|[☐□])\s*/;
  var RE_OPCION = /^\s*([a-eA-E])\s*[).]\s+(.+)$/;
  var RE_HUECO  = /_{3,}/;
  var RE_TITULO = /^\s*(?:activity|task|step|part|section)?\s*\d+\s*[·.)\-–—]\s/i;
  var RE_PREG   = /\?\s*$/;
  var RE_HABLA  = /\b(discuss|in pairs|with (?:your|a) partner|to your partner|role[\s-]?play|say it aloud|read aloud|out loud|talk about|ask each other)\b/i;
  var RE_MARCA  = /\b(tick|check|mark|circle|choose|select|underline)\b/i;
  var RE_ESCRIBE= /\b(write|answer|complete|explain|describe|list|note|rewrite|give|state|fill)\b/i;
  var RE_VARIAS = /\b(ones|all that|as many|two|three|3-4|3 or 4)\b/i;
  // "(getting / to get)" si: hay letras a los dos lados y no es un rango 1-10
  var RE_ALT_G  = /\(\s*([^()\/]{1,32}?)\s*\/\s*([^()\/]{1,32}?)(?:\s*\/\s*([^()\/]{1,32}?))?\s*\)/g;

  function limpia(t) { return String(t == null ? '' : t).trim(); }

  function esConsigna(txt) {
    return RE_MARCA.test(txt) || RE_ESCRIBE.test(txt) || RE_HABLA.test(txt);
  }

  /* Un parrafo de lectura: largo y con varias frases. Las preguntas que
     aparecen dentro de un texto asi son retoricas, no hay que contestarlas. */
  function esLectura(txt) {
    return txt.length > 220 && (txt.match(/[.!?]\s/g) || []).length >= 3;
  }

  /* Alternativas de verdad, no "(80-100 words)" ni "(1-10)". */
  function alternativas(txt) {
    var res = [], m;
    RE_ALT_G.lastIndex = 0;
    while ((m = RE_ALT_G.exec(txt))) {
      var op = [m[1], m[2], m[3]].filter(Boolean).map(limpia);
      var vale = op.length >= 2 && op.every(function (o) {
        return /[A-Za-z]/.test(o) && !/^\d+$/.test(o) && o.length <= 32;
      }) && !/\d\s*[-–]\s*\d/.test(m[0]);
      if (vale) res.push({ raw: m[0], at: m.index, opts: op });
    }
    return res;
  }

  /* "a) uno.   b) dos.   c) tres." dentro de un mismo parrafo. */
  function opcionesEnLinea(txt) {
    if (txt.length > 400) return null;
    var re = /(^|\s)([a-eA-E])\s*[).]\s+/g, marcas = [], m;
    while ((m = re.exec(txt))) marcas.push({ v: m[2].toLowerCase(), fin: m.index + m[0].length, ini: m.index });
    if (marcas.length < 2) return null;
    // deben ir en orden alfabetico: a, b, c...
    for (var i = 1; i < marcas.length; i++) {
      if (marcas[i].v.charCodeAt(0) !== marcas[i - 1].v.charCodeAt(0) + 1) return null;
    }
    if (marcas[0].v !== 'a') return null;
    var opts = [];
    for (var j = 0; j < marcas.length; j++) {
      var hasta = (j + 1 < marcas.length) ? marcas[j + 1].ini : txt.length;
      opts.push({ v: marcas[j].v, text: limpia(txt.slice(marcas[j].fin, hasta)) });
    }
    return { antes: limpia(txt.slice(0, marcas[0].ini)), opts: opts };
  }

  function troceaChecks(txt) {
    var partes = txt.split(/\[\s*[xX✓]?\s*\]|[☐□]/);
    var cab = limpia(partes.shift());
    var items = [];
    for (var i = 0; i < partes.length; i++) {
      var p = limpia(partes[i]);
      if (p) items.push(p);
    }
    return { head: cab, items: items };
  }

  /* Devuelve {items, labels}: items para pintar, labels {id: enunciado} para
     que el profesor lea cada respuesta con su pregunta al lado. */
  function prepara(blocks) {
    var out = [], labels = {}, consigna = '', i = 0, traeTabla = false;
    blocks = blocks || [];

    function texto(b) { return limpia(b && (b.text || '')); }
    function esTexto(b) { return b && (b.t === 'h' || b.t === 'p'); }
    function tal(b, k) {                     // el bloque tal cual, con su indice
      var c = {}; for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) c[p] = b[p];
      c._k = k; return c;
    }

    while (i < blocks.length) {
      var b = blocks[i], txt = texto(b);

      /* --- listas de casillas dentro de una nota (los self-check) --- */
      if (b.t === 'note' && /\[\s*[xX✓]?\s*\]|[☐□]/.test(txt)) {
        var tro = troceaChecks(txt);
        if (tro.items.length >= 2) {
          var idn = 'nk' + i;
          out.push({ t: 'checks', id: idn, head: tro.head, nota: true, _k: i,
            items: tro.items.map(function (x, j) {
              labels[idn + '_' + j] = x;
              return { id: idn + '_' + j, text: x };
            }) });
          i++; continue;
        }
      }

      if (b.t === 'table') { traeTabla = true; out.push(tal(b, i)); i++; continue; }
      if (!esTexto(b) || !txt) { out.push(tal(b, i)); i++; continue; }

      /* --- verdadero / falso --- */
      if (RE_TF.test(txt) || RE_TF2.test(txt)) {
        var idt = 'tf' + i;
        var enunciado = limpia(txt.replace(RE_TF, '').replace(RE_TF2, ''));
        labels[idt] = enunciado;
        out.push({ t: 'tf', id: idt, text: enunciado, _k: i });
        traeTabla = false; i++; continue;
      }

      /* --- casillas sueltas, agrupadas --- */
      if (RE_TICK.test(txt)) {
        var grupo = [], k = i;
        while (k < blocks.length && esTexto(blocks[k]) && RE_TICK.test(texto(blocks[k]))) {
          grupo.push(limpia(texto(blocks[k]).replace(RE_TICK, '')));
          k++;
        }
        var idc = 'ck' + i;
        out.push({ t: 'checks', id: idc, _k: i, items: grupo.map(function (x, j) {
          labels[idc + '_' + j] = x;
          return { id: idc + '_' + j, text: x };
        }) });
        traeTabla = false; i = k; continue;
      }

      /* Un hueco ____ ya es respondible; las alternativas (a / b) tambien se
         pintan dentro del propio texto. Se deja el bloque tal cual. */
      if (RE_HUECO.test(txt)) {
        var alt0 = alternativas(txt);
        for (var a0 = 0; a0 < alt0.length; a0++) labels['b' + i + '_alt' + (a0 + 1)] = txt;
        out.push(tal(b, i)); consigna = txt; traeTabla = false; i++; continue;
      }

      /* --- opciones a) b) c) en bloques separados --- */
      if (RE_OPCION.test(txt)) {
        var opts = [], k2 = i;
        while (k2 < blocks.length && esTexto(blocks[k2]) && RE_OPCION.test(texto(blocks[k2]))) {
          var m2 = texto(blocks[k2]).match(RE_OPCION);
          opts.push({ v: m2[1].toLowerCase(), text: limpia(m2[2]) });
          k2++;
        }
        // un banco de letras "A. … · B. …" al lado de una tabla no es una
        // pregunta de opcion: la letra se escribe en la tabla
        var banco = traeTabla && opts.length === 1;
        if (opts.length >= 2 && !banco) {
          // si la ficha ya pide la respuesta por escrito ("My answer: ___"),
          // esa es la forma que manda y no se duplica con botones
          var luego = blocks[k2];
          var yaPide = luego && esTexto(luego) && RE_HUECO.test(texto(luego)) &&
                       /\banswer|letter\b/i.test(texto(luego));
          if (!yaPide) {
            var ido = 'ch' + i;
            labels[ido] = limpia(consigna) || 'Choose one';
            out.push({ t: 'choice', id: ido, _k: i, ask: limpia(consigna),
                       multi: RE_MARCA.test(consigna) && RE_VARIAS.test(consigna), opts: opts });
            traeTabla = false; i = k2; continue;
          }
        }
      }

      /* --- opciones a) b) c) dentro de un mismo parrafo --- */
      var enLinea = opcionesEnLinea(txt);
      if (enLinea && !traeTabla) {
        var idl = 'ch' + i;
        var preguntaPrevia = limpia(enLinea.antes) || limpia(consigna);
        labels[idl] = preguntaPrevia || 'Choose one';
        if (enLinea.antes) out.push({ t: 'p', text: enLinea.antes, _k: i });
        out.push({ t: 'choice', id: idl, _k: i, ask: preguntaPrevia, multi: false, opts: enLinea.opts });
        traeTabla = false; i++; continue;
      }

      /* --- alternativas dentro de la frase: (getting / to get) --- */
      var alt = alternativas(txt);
      if (alt.length) {
        for (var a = 0; a < alt.length; a++) labels['b' + i + '_alt' + (a + 1)] = txt;
        out.push(tal(b, i));
        traeTabla = false; i++; continue;
      }

      /* --- preguntas --- */
      if (RE_PREG.test(txt) && !RE_TITULO.test(txt) && !esLectura(txt) && txt.length > 12) {
        var preg = [], k3 = i;
        while (k3 < blocks.length && esTexto(blocks[k3])) {
          var t3 = texto(blocks[k3]);
          if (!RE_PREG.test(t3) || RE_TITULO.test(t3) || esLectura(t3) || RE_HUECO.test(t3)) break;
          preg.push(t3);
          k3++;
        }
        var hablado = RE_HABLA.test(consigna) && !RE_ESCRIBE.test(consigna);
        var marcar  = RE_MARCA.test(consigna) && !RE_ESCRIBE.test(consigna) && preg.length >= 2;

        if (hablado) {                                  // se contesta en voz alta
          for (var q = 0; q < preg.length; q++) out.push(tal(blocks[i + q], i + q));
          traeTabla = false; i = k3; continue;
        }
        if (marcar) {
          var idm = 'ck' + i;
          out.push({ t: 'checks', id: idm, _k: i, items: preg.map(function (x, j) {
            labels[idm + '_' + j] = x;
            return { id: idm + '_' + j, text: x };
          }) });
          traeTabla = false; i = k3; continue;
        }
        /* Un campo por pregunta. Si detras venia un unico cuadro grande para
           todas (lo que hacia el .docx con sus siete lineas), se reutiliza su
           id en la primera: asi lo ya escrito no se pierde y no queda un
           cuadro suelto sin enunciado. */
        var sig = blocks[k3], idPrimera = null;
        if (preg.length >= 2 && sig && sig.t === 'write' && (sig.lines || 1) >= 2) {
          idPrimera = sig.id;
          k3++;
        }
        for (var q2 = 0; q2 < preg.length; q2++) {
          var idq = (q2 === 0 && idPrimera) ? idPrimera : ('sh' + (i + q2));
          labels[idq] = preg[q2];
          out.push({ t: 'short', id: idq, text: preg[q2], _k: i + q2 });
        }
        traeTabla = false; i = k3; continue;
      }

      /* --- consigna que pide escribir y se queda sin sitio --- */
      if (RE_ESCRIBE.test(txt) && !RE_HABLA.test(txt) && /[:.]$/.test(txt) && !RE_TITULO.test(txt)) {
        var des = blocks[i + 1];
        var cubierto = des && (des.t === 'write' || des.t === 'table' || des.t === 'note' ||
                              (esTexto(des) && (RE_HUECO.test(texto(des)) || RE_PREG.test(texto(des)) ||
                                                RE_TICK.test(texto(des)) || RE_OPCION.test(texto(des)))));
        out.push(tal(b, i));
        consigna = txt;
        if (!cubierto) {
          var ids = 'sh' + i;
          labels[ids] = txt;
          out.push({ t: 'short', id: ids, text: '', _k: i });
        }
        traeTabla = false; i++; continue;
      }

      if (esConsigna(txt) || txt.length < 160) consigna = txt;
      out.push(tal(b, i));
      traeTabla = false;
      i++;
    }

    /* etiquetas de lo que ya existia, para la pantalla de correccion */
    for (var n = 0; n < out.length; n++) {
      var o = out[n];
      if ((o.t === 'write' || o.t === 'table') && !labels[o.id]) {
        for (var m3 = n - 1; m3 >= 0 && m3 > n - 4; m3--) {
          var prev = out[m3];
          if ((prev.t === 'h' || prev.t === 'p') && limpia(prev.text)) {
            labels[o.id] = limpia(prev.text); break;
          }
        }
      }
    }
    return { items: out, labels: labels };
  }

  return { prepara: prepara, alternativas: alternativas };
})();
