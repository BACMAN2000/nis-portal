/* =========================================================================
 *  Progreso en el periódico — el del alumno y el de cada alumno para el profesor
 * -------------------------------------------------------------------------
 *  Una sola cuenta para los dos lados, para que el profesor vea exactamente
 *  lo que ve el alumno en «My progress»:
 *
 *    NewsProgress.render(el, rows, {title, back:{label, go}, link(r)})
 *        la ficha de un alumno (cifras, niveles, consejo, historial)
 *    NewsProgress.table(el, alumnos, {open(id)})
 *        alumnos = [{id, name, group, rows}] — la clase entera, ordenable
 *
 *  rows = filas de news_responses (o de /news/mine, /news/responses en
 *  cohasset.pe): issue_date, article_id, level, headline, score, total,
 *  checked_at, writing_words, submitted_at, grade, reviewed_at.
 * ========================================================================= */
(function(){
  'use strict';
  var LV = ['A2','B1','B2','C1'];
  var LVC = {A2:'#2f9268', B1:'#3b6fb5', B2:'#d97d0d', C1:'#7a4bb3'};
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  var CSS = '.npg{color:#1b2b3d}.npg h2{font-family:"Literata",Georgia,serif;font-size:clamp(24px,4vw,32px);margin:6px 0 4px}' +
    '.npg .back{border:0;background:none;color:#1f3b6e;font-weight:700;cursor:pointer;padding:0;margin-bottom:10px;font:inherit}' +
    '.npg .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:14px 0}' +
    '.npg .kpi{background:#fbfaf6;border:1px solid #ece6d8;border-radius:14px;padding:14px 16px}' +
    '.npg .kpi b{display:block;font:800 26px "Literata",Georgia,serif}.npg .kpi span{color:#56677a;font-size:13.5px}' +
    '.npg .lvls{display:grid;gap:10px;margin:8px 0 18px}' +
    '.npg .lvrow{display:grid;grid-template-columns:54px minmax(0,1fr) 120px;gap:10px;align-items:center;background:#fbfaf6;border:1px solid #ece6d8;border-radius:12px;padding:10px 14px}' +
    '.npg .track{height:12px;background:#e5e0d4;border-radius:99px;overflow:hidden}.npg .fill{height:100%;border-radius:99px}' +
    '.npg small{color:#56677a;text-align:right}.npg .lv{color:#fff;text-align:center;border-radius:5px;font-weight:700;font-size:12px;padding:1px 7px}' +
    '.npg .tip2{background:#fff8e6;border-left:4px solid #d97d0d;border-radius:10px;padding:10px 14px;margin:0 0 18px}' +
    '.npg .wrap{overflow-x:auto;border:1px solid #ece6d8;border-radius:12px;background:#fff}' +
    '.npg table{width:100%;border-collapse:collapse;font-size:14.5px}.npg th,.npg td{padding:8px 10px;border-bottom:1px solid #ece6d8;text-align:left;vertical-align:top}' +
    '.npg th{font-size:12.5px;color:#56677a;white-space:nowrap}.npg th[data-k]{cursor:pointer}.npg th[data-k]:hover{color:#1b2b3d}' +
    '.npg tr.al{cursor:pointer}.npg tr.al:hover{background:#f6f3ec}.npg .muted{color:#56677a}' +
    '.npg .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 12px}.npg select{font:inherit;padding:5px 8px;border:1px solid #d9d2c3;border-radius:8px;background:#fff}' +
    '.npg .heat{display:inline-block;min-width:44px;text-align:center;border-radius:6px;padding:2px 6px;font-weight:700;font-size:13px}';
  function css(){ if(document.getElementById('npg-css')) return; var s = document.createElement('style'); s.id = 'npg-css'; s.textContent = CSS; document.head.appendChild(s); }
  function heat(p){
    if(p == null) return '<span class="heat muted">–</span>';
    var bg = p >= 80 ? '#dff3e8' : p >= 60 ? '#fdf3d7' : '#fde2e1', fg = p >= 80 ? '#1f7a4d' : p >= 60 ? '#8a6100' : '#b42318';
    return '<span class="heat" style="background:' + bg + ';color:' + fg + '">' + p + '%</span>';
  }
  function dia(t){ var d = new Date(t); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

  function stats(rows){
    rows = rows || [];
    var hechas = rows.filter(function(r){ return r.checked_at && r.total; });
    var pct = function(xs){ return xs.length ? Math.round(xs.reduce(function(s, r){ return s + r.score / r.total; }, 0) / xs.length * 100) : null; };
    var escritos = rows.filter(function(r){ return r.submitted_at; });
    var dias = {}, ultima = null;
    rows.forEach(function(r){ [r.checked_at, r.submitted_at].forEach(function(t){ if(t){ dias[dia(t)] = 1; if(!ultima || t > ultima) ultima = t; } }); });
    /* Racha: días seguidos con actividad, contando desde hoy (o desde ayer si hoy aún no). */
    var racha = 0, d = new Date();
    if(!dias[dia(d)]) d.setDate(d.getDate() - 1);
    while(dias[dia(d)]){ racha++; d.setDate(d.getDate() - 1); }
    var porNivel = LV.map(function(l){ var xs = hechas.filter(function(r){ return r.level === l; }); return {l:l, n:xs.length, p:pct(xs)}; });
    /* Consejo: el nivel más alto con 3+ artículos manda; ≥80 % invita a subir, <60 % a afianzar. */
    var consejo = '', sugerido = null;
    for(var i = porNivel.length - 1; i >= 0; i--){
      var x = porNivel[i];
      if(x.n < 3) continue;
      if(x.p >= 80 && i < LV.length - 1){ sugerido = LV[i + 1]; consejo = 'Great work at ' + x.l + ' (' + x.p + '% on ' + x.n + ' articles). Try the <b>' + LV[i + 1] + '</b> stories next!'; }
      else if(x.p < 60){ sugerido = x.l; consejo = 'At ' + x.l + ' the average is ' + x.p + '%. Read a few more ' + x.l + ' stories carefully before moving up.'; }
      else { sugerido = x.l; }
      break;
    }
    return {hechas:hechas, media:pct(hechas), escritos:escritos, corregidos:escritos.filter(function(r){ return r.reviewed_at; }),
      palabras:escritos.reduce(function(s, r){ return s + (r.writing_words || 0); }, 0), racha:racha, porNivel:porNivel,
      consejo:consejo, sugerido:sugerido, ultima:ultima};
  }

  function render(el, rows, opts){
    css(); opts = opts || {};
    var s = stats(rows);
    var consejo = s.consejo || (!s.hechas.length ? (opts.teacher ? 'No checked answers yet.' : 'Read a story at your level and press <b>Check answers</b>: your results will appear here.') : '');
    var hist = (rows || []).slice().sort(function(a, b){ return a.issue_date < b.issue_date ? 1 : -1; }).map(function(r){
      var p = r.checked_at && r.total ? Math.round(r.score / r.total * 100) : null;
      var w = r.reviewed_at ? '✓ Marked' + (r.grade ? ' · <b>' + esc(r.grade) + '</b>' : '') : r.submitted_at ? 'Submitted · waiting for the teacher' : '';
      var tit = esc(r.headline || r.article_id), href = opts.link ? opts.link(r) : null;
      return '<tr><td style="white-space:nowrap">' + esc(r.issue_date) + '</td><td><span class="lv" style="background:' + (LVC[r.level] || '#1b2b3d') + '">' + esc(r.level || '') + '</span></td>' +
        '<td>' + (href ? '<a href="' + esc(href) + '"' + (opts.teacher ? ' target="_blank" rel="noopener"' : '') + '>' + tit + '</a>' : tit) + '</td>' +
        '<td>' + (p == null ? '<span class="muted">–</span>' : r.score + '/' + r.total + ' ' + heat(p)) + '</td><td>' + w + '</td></tr>';
    }).join('');
    el.innerHTML = '<div class="npg">' + (opts.back ? '<button class="back" type="button">' + esc(opts.back.label) + '</button>' : '') +
      '<h2>' + esc(opts.title || 'My progress') + '</h2>' + (opts.sub ? '<p class="muted" style="margin:0">' + esc(opts.sub) + '</p>' : '') +
      '<div class="kpis"><div class="kpi"><b>' + s.hechas.length + '</b><span>articles with checked answers</span></div>' +
      '<div class="kpi"><b>' + (s.media == null ? '–' : s.media + '%') + '</b><span>average score</span></div>' +
      '<div class="kpi"><b>' + s.escritos.length + '</b><span>writings submitted (' + s.palabras + ' words)</span></div>' +
      '<div class="kpi"><b>' + s.corregidos.length + '</b><span>writings marked by the teacher</span></div>' +
      '<div class="kpi"><b>' + s.racha + ' 🔥</b><span>day' + (s.racha === 1 ? '' : 's') + ' in a row</span></div></div>' +
      (consejo ? '<div class="tip2">' + consejo + '</div>' : '') +
      '<h3 style="margin:0 0 6px">By level</h3><div class="lvls">' + s.porNivel.map(function(x){
        return '<div class="lvrow"><span class="lv" style="background:' + LVC[x.l] + '">' + x.l + '</span>' +
          '<div class="track"><div class="fill" style="width:' + (x.p || 0) + '%;background:' + LVC[x.l] + '"></div></div><small>' + (x.n ? x.p + '% · ' + x.n + ' article' + (x.n === 1 ? '' : 's') : 'not yet') + '</small></div>';
      }).join('') + '</div><h3 style="margin:0 0 6px">' + (opts.teacher ? 'Everything this student has done' : 'Everything you have done') + '</h3>' +
      (hist ? '<div class="wrap"><table><tr><th>Edition</th><th>Level</th><th>Story</th><th>Questions</th><th>Writing</th></tr>' + hist + '</table></div>'
            : '<p class="muted">Nothing yet.</p>') + '</div>';
    if(opts.back) el.querySelector('.back').onclick = opts.back.go;
  }

  /* La clase entera: una fila por alumno, ordenable por cualquier columna. */
  function table(el, alumnos, opts){
    css(); opts = opts || {};
    var grupos = alumnos.map(function(a){ return a.group || ''; }).filter(function(g, i, x){ return g && x.indexOf(g) === i; }).sort();
    var st = {grupo:'', k:'name', asc:true};
    var datos = alumnos.map(function(a){ var s = stats(a.rows); return {a:a, s:s}; });
    function val(x, k){
      if(k === 'name') return String(x.a.name).toLowerCase();
      if(k === 'group') return x.a.group || '';
      if(k === 'n') return x.s.hechas.length;
      if(k === 'media') return x.s.media == null ? -1 : x.s.media;
      if(k === 'w') return x.s.escritos.length;
      if(k === 'm') return x.s.corregidos.length;
      if(k === 'racha') return x.s.racha;
      if(k === 'ultima') return x.s.ultima || '';
      if(LV.indexOf(k) >= 0){ var p = x.s.porNivel[LV.indexOf(k)].p; return p == null ? -1 : p; }
      return 0;
    }
    function pinta(){
      var vis = datos.filter(function(x){ return !st.grupo || x.a.group === st.grupo; })
        .sort(function(x, y){ var a = val(x, st.k), b = val(y, st.k); return (a < b ? -1 : a > b ? 1 : 0) * (st.asc ? 1 : -1); });
      var th = function(k, lab){ return '<th data-k="' + k + '">' + lab + (st.k === k ? (st.asc ? ' ▲' : ' ▼') : '') + '</th>'; };
      var activos = vis.filter(function(x){ return x.s.hechas.length || x.s.escritos.length; }).length;
      el.innerHTML = '<div class="npg">' +
        (grupos.length ? '<div class="bar"><label>Class <select data-f="grupo"><option value="">All classes</option>' + grupos.map(function(g){ return '<option ' + (g === st.grupo ? 'selected' : '') + '>' + esc(g) + '</option>'; }).join('') + '</select></label>' +
          '<span class="muted">' + activos + ' student' + (activos === 1 ? '' : 's') + ' with activity</span></div>' : '') +
        (vis.length ? '<div class="wrap"><table><tr>' + th('name', 'Student') + th('group', 'Class') + th('n', 'Articles') + th('media', 'Average') +
          LV.map(function(l){ return th(l, l); }).join('') + th('w', 'Writings') + th('m', 'Marked') + th('racha', 'Streak') + th('ultima', 'Last active') + '<th>Suggested</th></tr>' +
          vis.map(function(x){
            var s = x.s;
            return '<tr class="al" data-id="' + esc(x.a.id) + '" title="See the full progress"><td><b>' + esc(x.a.name) + '</b></td><td>' + esc(x.a.group || '') + '</td><td>' + s.hechas.length + '</td><td>' + heat(s.media) + '</td>' +
              s.porNivel.map(function(p){ return '<td>' + (p.n ? heat(p.p) + ' <span class="muted" style="font-size:12px">·' + p.n + '</span>' : '<span class="muted">–</span>') + '</td>'; }).join('') +
              '<td>' + s.escritos.length + '</td><td>' + s.corregidos.length + (s.escritos.length > s.corregidos.length ? ' <span class="muted" style="font-size:12px">(' + (s.escritos.length - s.corregidos.length) + ' to mark)</span>' : '') + '</td>' +
              '<td>' + (s.racha ? s.racha + ' 🔥' : '–') + '</td><td class="muted" style="white-space:nowrap">' + (s.ultima ? new Date(s.ultima).toLocaleDateString('en-GB', {day:'numeric', month:'short'}) : '–') + '</td>' +
              '<td>' + (s.sugerido ? '<span class="lv" style="background:' + LVC[s.sugerido] + '">' + s.sugerido + '</span>' : '<span class="muted">–</span>') + '</td></tr>';
          }).join('') + '</table></div><p class="muted" style="font-size:12.5px;margin-top:6px">Click a column to sort and a student to see their full progress. «Suggested» is the level to read next (3 or more articles: 80%+ moves up, under 60% stays).</p>'
          : '<p class="muted">No student has used the newspaper yet.</p>') + '</div>';
      var sel = el.querySelector('select[data-f]'); if(sel) sel.onchange = function(){ st.grupo = sel.value; pinta(); };
      el.querySelectorAll('th[data-k]').forEach(function(h){ h.onclick = function(){ var k = h.dataset.k; st.asc = st.k === k ? !st.asc : (k === 'name' || k === 'group'); st.k = k; pinta(); }; });
      el.querySelectorAll('tr.al').forEach(function(tr){ tr.onclick = function(){ if(opts.open) opts.open(tr.dataset.id); }; });
    }
    pinta();
  }

  window.NewsProgress = {stats:stats, render:render, table:table};
})();
