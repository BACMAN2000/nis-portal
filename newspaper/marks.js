/* =========================================================================
 *  Tachaduras sobre un Writing del periódico («Feedback with tutor»)
 * -------------------------------------------------------------------------
 *  Lo usan la pantalla del profesor (Marking > Newspaper writings) y el
 *  artículo, donde el alumno ve las marcas sobre su texto y añade las suyas.
 *  Una marca es {start, end, note, by:'tutor'|'student'}, con offsets sobre el
 *  texto entregado — el mismo formato que «Textos por corregir» de cohasset.pe.
 *
 *    NewsMarks.render(el, text, marks, {editable, by, onSave(marks) -> Promise})
 *
 *  Se marca seleccionando un trozo del texto: aparece debajo una caja para la
 *  recomendación (nada de prompt() del navegador). Cada uno borra solo lo suyo;
 *  el profesor puede borrar cualquiera.
 * ========================================================================= */
(function(){
  'use strict';
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  var CSS = '.nmk-wrap{position:relative}' +
    '.nmk-text{white-space:pre-wrap;font-family:Georgia,"Literata",serif;font-size:16.5px;line-height:1.7;border:1px solid #d9d2c3;border-radius:12px;padding:14px 16px;background:#fff;color:#1b2b3d}' +
    '.nmk-text mark{background:#fde2e1;color:inherit;text-decoration:line-through;text-decoration-color:#c0392b;border-radius:3px;padding:0 1px;cursor:help}' +
    '.nmk-text mark.st{background:#e1ecfd;text-decoration-color:#3b6fb5}' +
    '.nmk-text mark sup{font:700 10px "Source Sans 3",sans-serif;color:#c0392b;margin-left:1px;text-decoration:none;display:inline-block}' +
    '.nmk-text mark.st sup{color:#3b6fb5}' +
    '.nmk-list{list-style:none;margin:8px 0 0;padding:0;font-size:14px;display:grid;gap:4px}' +
    '.nmk-list li{display:flex;gap:8px;align-items:baseline}' +
    '.nmk-list b{color:#c0392b;min-width:18px} .nmk-list li.st b{color:#3b6fb5}' +
    '.nmk-list q{color:#56677a;text-decoration:line-through}' +
    '.nmk-list button{margin-left:auto;border:0;background:none;color:#56677a;cursor:pointer;font-size:13px}' +
    '.nmk-add[hidden]{display:none}.nmk-add{margin-top:8px;border:1px dashed #d9d2c3;border-radius:10px;padding:10px;display:grid;gap:6px;background:#fbfaf6}' +
    '.nmk-add input{font:inherit;padding:7px 10px;border:1px solid #d9d2c3;border-radius:8px}' +
    '.nmk-add div{display:flex;gap:8px;align-items:center}' +
    '.nmk-add button{font:inherit;border:0;border-radius:8px;padding:6px 14px;cursor:pointer;background:#1b2b3d;color:#fff}' +
    '.nmk-add button.ghost{background:transparent;color:#1b2b3d;border:1px solid #d9d2c3}' +
    '.nmk-hint{font-size:12.5px;color:#56677a;margin-top:6px}' +
    '.nmk-msg{font-size:12.5px;color:#56677a}';
  function css(){ if(document.getElementById('nmk-css')) return; var s = document.createElement('style'); s.id = 'nmk-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* Las marcas no se pisan: si dos se solapan, se pinta la primera y la otra
     queda solo en la lista. */
  function tramos(text, marks){
    var orden = marks.map(function(m, i){ return {m:m, i:i}; })
      .filter(function(x){ return x.m.end <= text.length && x.m.start < x.m.end; })
      .sort(function(a, b){ return a.m.start - b.m.start; });
    var out = [], pos = 0;
    orden.forEach(function(x){
      if(x.m.start < pos) return;
      if(x.m.start > pos) out.push({t:text.slice(pos, x.m.start), off:pos});
      out.push({t:text.slice(x.m.start, x.m.end), off:x.m.start, mark:x});
      pos = x.m.end;
    });
    if(pos < text.length) out.push({t:text.slice(pos), off:pos});
    return out;
  }

  function render(el, text, marks, opts){
    css();
    opts = opts || {};
    marks = (marks || []).slice();
    var num = {};
    marks.forEach(function(m, i){ num[i] = i + 1; });
    var html = tramos(text, marks).map(function(s){
      if(!s.mark) return '<span data-off="' + s.off + '">' + esc(s.t) + '</span>';
      var m = s.mark.m;
      return '<mark data-off="' + s.off + '" class="' + (m.by === 'student' ? 'st' : '') + '" title="' + esc(m.note || '') + '">' +
        '<span data-off="' + s.off + '">' + esc(s.t) + '</span><sup>' + num[s.mark.i] + '</sup></mark>';
    }).join('');
    var lista = marks.map(function(m, i){
      var mio = opts.editable && (opts.by === 'tutor' || m.by === opts.by);
      return '<li class="' + (m.by === 'student' ? 'st' : '') + '"><b>' + (i + 1) + '</b><span><q>' + esc(text.slice(m.start, m.end)) + '</q> → ' +
        esc(m.note || '') + ' <span class="nmk-msg">· ' + (m.by === 'student' ? 'student' : 'teacher') + '</span></span>' +
        (mio ? '<button type="button" data-del="' + i + '" aria-label="Remove mark ' + (i + 1) + '">✕</button>' : '') + '</li>';
    }).join('');
    el.innerHTML = '<div class="nmk-wrap"><div class="nmk-text">' + html + '</div>' +
      (lista ? '<ol class="nmk-list">' + lista + '</ol>' : '') +
      '<div class="nmk-add" hidden><div>Mark <q class="nmk-sel"></q></div><input maxlength="1000" placeholder="' +
      (opts.by === 'tutor' ? 'Correction or recommendation' : 'Your note (what you would change)') + '" aria-label="Note for this mark">' +
      '<div><button type="button" class="ok">Add mark</button><button type="button" class="ghost no">Cancel</button><span class="nmk-msg"></span></div></div>' +
      (opts.editable ? '<div class="nmk-hint">Select words in the text to mark them.</div>' : '') + '</div>';
    if(!opts.editable) return;

    var box = el.querySelector('.nmk-add'), input = box.querySelector('input'), msg = box.querySelector('.nmk-msg'), sel = null;
    function guarda(nuevas){
      msg.textContent = 'Saving…';
      return Promise.resolve(opts.onSave(nuevas)).then(function(r){
        if(r === false){ msg.textContent = 'Not saved'; return; }
        render(el, text, nuevas, opts);
      }, function(e){ msg.textContent = 'Not saved: ' + (e && e.message || e); });
    }
    /* Offset del texto a partir de un punto de la selección: cada trozo pintado
       lleva su posición en data-off. */
    function offset(node, k){
      var span = node.nodeType === 3 ? node.parentNode : node;
      while(span && span !== el && !(span.dataset && span.dataset.off != null && span.tagName === 'SPAN')) span = span.parentNode;
      if(!span || span === el) return null;
      return +span.dataset.off + (node.nodeType === 3 ? k : 0);
    }
    el.querySelector('.nmk-text').addEventListener('mouseup', function(){
      var s = window.getSelection();
      if(!s || s.isCollapsed || !s.rangeCount) return;
      var r = s.getRangeAt(0), a = offset(r.startContainer, r.startOffset), b = offset(r.endContainer, r.endOffset);
      if(a == null || b == null) return;
      if(a > b){ var t = a; a = b; b = t; }
      while(a < b && /\s/.test(text[a])) a++;
      while(b > a && /\s/.test(text[b - 1])) b--;
      if(a >= b) return;
      sel = {start:a, end:b};
      box.querySelector('.nmk-sel').textContent = text.slice(a, b);
      box.hidden = false; msg.textContent = ''; input.value = ''; input.focus();
    });
    box.querySelector('.ok').onclick = function(){
      if(!sel) return;
      guarda(marks.concat([{start:sel.start, end:sel.end, note:input.value.trim(), by:opts.by}]));
    };
    input.onkeydown = function(e){ if(e.key === 'Enter'){ e.preventDefault(); box.querySelector('.ok').click(); } };
    box.querySelector('.no').onclick = function(){ box.hidden = true; sel = null; };
    el.querySelectorAll('[data-del]').forEach(function(b){
      b.onclick = function(){ var i = +b.dataset.del; guarda(marks.filter(function(_, j){ return j !== i; })); };
    });
  }

  window.NewsMarks = {render:render};
})();
