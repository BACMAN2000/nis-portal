/* =========================================================================
 *  Resultados de las preguntas del periódico, para el profesor
 * -------------------------------------------------------------------------
 *  Lo usan Marking > 📰 Newspaper (portal NIS) y newspaper/results.html
 *  (cohasset.pe). Recibe las filas ya normalizadas y una función que trae el
 *  JSON de un número (para las claves y los enunciados):
 *
 *    NewsResults.render(el, {
 *      rows: [{student, group, issue_date, article_id, level, answers, score, total, checked_at}],
 *      loadIssue: date => Promise<issue>
 *    })
 *
 *  Primera vista: los artículos de una edición con cuántos alumnos
 *  comprobaron, la media y el % de acierto de cada pregunta. Al abrir un
 *  artículo: alumno por alumno, qué marcó en cada pregunta, y debajo las
 *  preguntas con su clave, de la más difícil a la más fácil.
 * ========================================================================= */
(function(){
  'use strict';
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  var LVC = {A2:'#2f9268', B1:'#3b6fb5', B2:'#d97d0d', C1:'#7a4bb3'};
  var CSS = '.nrs{font-size:14.5px;color:#1b2b3d}.nrs table{border-collapse:collapse;width:100%}.nrs th,.nrs td{padding:7px 8px;border-bottom:1px solid #e5e0d4;text-align:left;vertical-align:middle}' +
    '.nrs th{font-size:12.5px;color:#56677a;font-weight:700;white-space:nowrap}.nrs .scroll{overflow-x:auto;border:1px solid #e5e0d4;border-radius:12px;background:#fff}' +
    '.nrs .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 12px}.nrs select{font:inherit;padding:5px 8px;border:1px solid #d9d2c3;border-radius:8px;background:#fff;color:inherit}' +
    '.nrs .lv{color:#fff;border-radius:5px;padding:1px 7px;font-weight:700;font-size:12px}.nrs .pct{font-weight:700}.nrs .ok{color:#1f7a4d}.nrs .ko{color:#c0392b}.nrs .na{color:#9aa5b1}' +
    '.nrs .heat{display:inline-block;min-width:44px;text-align:center;border-radius:6px;padding:2px 6px;font-weight:700;font-size:13px}' +
    '.nrs tr.art{cursor:pointer}.nrs tr.art:hover{background:#f6f3ec}.nrs .back{border:0;background:none;color:#1f3b6e;font-weight:700;cursor:pointer;padding:0;margin-bottom:10px}' +
    '.nrs .qs{list-style:none;padding:0;margin:14px 0 0;display:grid;gap:8px}.nrs .qs li{border:1px solid #e5e0d4;border-radius:10px;padding:8px 12px;background:#fff}' +
    '.nrs .muted{color:#56677a}.nrs .kpi{display:flex;gap:18px;flex-wrap:wrap;margin:0 0 12px}.nrs .kpi b{font-size:20px;display:block}';
  function css(){ if(document.getElementById('nrs-css')) return; var s = document.createElement('style'); s.id = 'nrs-css'; s.textContent = CSS; document.head.appendChild(s); }
  function heat(p){
    if(p == null) return '<span class="heat na">–</span>';
    var bg = p >= 80 ? '#dff3e8' : p >= 60 ? '#fdf3d7' : '#fde2e1', fg = p >= 80 ? '#1f7a4d' : p >= 60 ? '#8a6100' : '#b42318';
    return '<span class="heat" style="background:' + bg + ';color:' + fg + '">' + p + '%</span>';
  }
  var TF = {T:'True', F:'False', NS:"Doesn't say"};
  function optLabel(q, v){
    if(v == null || v === '') return '';
    if(q.type === 'tf') return v;
    if(q.type === 'match') return (q.options || [])[+v] || v;
    return String.fromCharCode(65 + (+v));
  }
  function optText(q, v){
    if(q.type === 'tf') return TF[v] || v;
    return (q.options || [])[+v];
  }
  function correcta(q, v){ return v != null && String(v) === String(q.answer); }

  function render(el, cfg){
    css();
    var rows = (cfg.rows || []).filter(function(r){ return r.checked_at || (r.answers && Object.keys(r.answers).length); });
    var fechas = rows.map(function(r){ return r.issue_date; }).filter(function(d, i, a){ return a.indexOf(d) === i; }).sort().reverse();
    var grupos = rows.map(function(r){ return r.group || ''; }).filter(function(g, i, a){ return g && a.indexOf(g) === i; }).sort();
    var st = {fecha:fechas[0] || '', grupo:'', art:null}, issues = {};

    function issue(d){
      if(issues[d]) return Promise.resolve(issues[d]);
      return Promise.resolve(cfg.loadIssue(d)).then(function(x){ issues[d] = x; return x; }, function(){ return null; });
    }
    function filas(){ return rows.filter(function(r){ return r.issue_date === st.fecha && (!st.grupo || r.group === st.grupo); }); }

    function barra(){
      return '<div class="bar"><label>Edition <select data-f="fecha">' + fechas.map(function(d){ return '<option ' + (d === st.fecha ? 'selected' : '') + '>' + d + '</option>'; }).join('') + '</select></label>' +
        (grupos.length ? '<label>Class <select data-f="grupo"><option value="">All classes</option>' + grupos.map(function(g){ return '<option ' + (g === st.grupo ? 'selected' : '') + '>' + esc(g) + '</option>'; }).join('') + '</select></label>' : '') + '</div>';
    }
    function engancha(){
      el.querySelectorAll('select[data-f]').forEach(function(s){ s.onchange = function(){ st[s.dataset.f] = s.value; if(s.dataset.f === 'fecha') st.art = null; pinta(); }; });
    }

    function pinta(){
      if(!fechas.length){ el.innerHTML = '<div class="nrs"><p class="muted">No student has checked the newspaper questions yet.</p></div>'; return; }
      el.innerHTML = '<div class="nrs"><p class="muted">Loading…</p></div>';
      issue(st.fecha).then(function(iss){
        if(!iss){ el.innerHTML = '<div class="nrs">' + barra() + '<p class="muted">The edition ' + esc(st.fecha) + ' could not be loaded.</p></div>'; engancha(); return; }
        if(st.art){ detalle(iss); } else { resumen(iss); }
        engancha();
      });
    }

    function stats(a, fs){
      var hechos = fs.filter(function(r){ return r.article_id === a.id && r.checked_at; });
      var media = hechos.length ? Math.round(hechos.reduce(function(s, r){ return s + (r.total ? r.score / r.total : 0); }, 0) / hechos.length * 100) : null;
      var porQ = a.questions.map(function(q){
        var con = hechos.filter(function(r){ return r.answers && r.answers[q.id] != null; });
        return con.length ? Math.round(con.filter(function(r){ return correcta(q, r.answers[q.id]); }).length / con.length * 100) : null;
      });
      return {hechos:hechos, media:media, porQ:porQ};
    }

    function resumen(iss){
      var fs = filas(), maxQ = Math.max.apply(null, iss.articles.map(function(a){ return a.questions.length; }));
      var alumnos = fs.filter(function(r){ return r.checked_at; }).map(function(r){ return r.student; }).filter(function(x, i, a){ return a.indexOf(x) === i; }).length;
      var cab = '<tr><th>Level</th><th>Article</th><th>Students</th><th>Average</th>' + Array.apply(null, {length:maxQ}).map(function(_, i){ return '<th>Q' + (i + 1) + '</th>'; }).join('') + '</tr>';
      var cuerpo = iss.articles.map(function(a){
        var s = stats(a, fs);
        return '<tr class="art" data-id="' + esc(a.id) + '" title="See each student"><td><span class="lv" style="background:' + LVC[a.level] + '">' + a.level + '</span></td><td>' + esc(a.headline) +
          '<br><span class="muted" style="font-size:12.5px">' + esc(a.exam) + '</span></td><td>' + s.hechos.length + '</td><td>' + heat(s.media) + '</td>' +
          Array.apply(null, {length:maxQ}).map(function(_, i){ return '<td>' + (i < a.questions.length ? heat(s.porQ[i]) : '') + '</td>'; }).join('') + '</tr>';
      }).join('');
      el.innerHTML = '<div class="nrs">' + barra() +
        '<div class="kpi"><span><b>' + alumnos + '</b>students checked answers</span><span><b>' + fs.filter(function(r){ return r.checked_at; }).length + '</b>articles checked</span></div>' +
        '<div class="scroll"><table>' + cab + cuerpo + '</table></div><p class="muted" style="font-size:12.5px;margin-top:6px">Each Q column is the % of students who got that question right. Click an article to see each student.</p></div>';
      el.querySelectorAll('tr.art').forEach(function(tr){ tr.onclick = function(){ st.art = tr.dataset.id; pinta(); }; });
    }

    function detalle(iss){
      var a = iss.articles.find(function(x){ return x.id === st.art; });
      if(!a){ st.art = null; resumen(iss); return; }
      var s = stats(a, filas());
      var lista = s.hechos.slice().sort(function(x, y){ return String(x.student).localeCompare(String(y.student)); });
      var cab = '<tr><th>Student</th><th>Class</th><th>Score</th>' + a.questions.map(function(q, i){ return '<th title="' + esc(q.q) + '">Q' + (i + 1) + '<br>' + heat(s.porQ[i]) + '</th>'; }).join('') + '<th>Checked</th></tr>';
      var cuerpo = lista.map(function(r){
        var p = r.total ? Math.round(r.score / r.total * 100) : null;
        return '<tr><td><b>' + esc(r.student) + '</b></td><td>' + esc(r.group || '') + '</td><td>' + r.score + '/' + r.total + ' ' + heat(p) + '</td>' +
          a.questions.map(function(q){
            var v = r.answers ? r.answers[q.id] : null;
            if(v == null || v === '') return '<td class="na">–</td>';
            return '<td class="' + (correcta(q, v) ? 'ok' : 'ko') + '" title="' + esc(optText(q, v) || '') + '">' + (correcta(q, v) ? '✓' : '✗') + ' ' + esc(optLabel(q, v)) + '</td>';
          }).join('') +
          '<td class="muted" style="white-space:nowrap">' + new Date(r.checked_at).toLocaleDateString('en-GB', {day:'numeric', month:'short'}) + '</td></tr>';
      }).join('') || '<tr><td colspan="' + (a.questions.length + 4) + '" class="muted">Nobody has checked this article yet.</td></tr>';
      var dificiles = a.questions.map(function(q, i){ return {q:q, i:i, p:s.porQ[i]}; })
        .sort(function(x, y){ return (x.p == null ? 101 : x.p) - (y.p == null ? 101 : y.p); });
      el.innerHTML = '<div class="nrs">' + barra() + '<button class="back">← All articles</button>' +
        '<h3 style="margin:0 0 4px"><span class="lv" style="background:' + LVC[a.level] + '">' + a.level + '</span> ' + esc(a.headline) + '</h3>' +
        '<p class="muted" style="margin:0 0 10px">' + esc(a.exam) + ' · ' + s.hechos.length + ' students · average ' + (s.media == null ? '–' : s.media + '%') + '</p>' +
        '<div class="scroll"><table>' + cab + cuerpo + '</table></div>' +
        '<h4 style="margin:16px 0 0">Questions, hardest first</h4><ol class="qs">' + dificiles.map(function(x){
          return '<li>' + heat(x.p) + ' <b>Q' + (x.i + 1) + '.</b> ' + esc(x.q.q) + '<br><span class="muted">Answer: ' + esc(optLabel(x.q, x.q.answer)) + ' — ' + esc(optText(x.q, x.q.answer) || '') + '</span></li>';
        }).join('') + '</ol></div>';
      el.querySelector('.back').onclick = function(){ st.art = null; pinta(); };
    }

    pinta();
  }

  window.NewsResults = {render:render};
})();
