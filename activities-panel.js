/* 🎲 Activities — lo que cada alumno ha hecho, respuesta a respuesta (17-sep-2026).
 *
 * activity_attempts guarda desde WP-I no solo la nota (score/total) sino lo
 * que el alumno contestó en cada ítem (detail.items / detail.grid /
 * detail.papers) y de dónde venía el juego (detail.meta {grade, unit, week,
 * slug, lang}). Hasta hoy nadie lo enseñaba: el profesor solo veía la nota
 * agregada del examen de unidad y los controles de lectura. Este panel es la
 * ventana a esa tabla para admin y profesor (Seguimiento › Actividades) y el
 * mismo pintado de respuestas lo usa el alumno en Mi progreso.
 *
 * Reglas:
 *  - DE LECTURA: aquí no se escribe nada.
 *  - RLS manda: el profesor solo recibe los intentos de sus grados
 *    (aa_select: teacher_can_results() + teacher_grade_ok). El filtro de grado
 *    de la barra va en la consulta (profiles!inner) para no traer 600 filas y
 *    tirar la mitad.
 *  - El detalle se pinta según su forma, no según el juego: items con
 *    answer/correct (crucigrama, sopa), given/correct (examen de unidad,
 *    reader exam), word/ok/attempts (invaders, say it right, voice battle),
 *    grid+word (sudoku), papers (examen de unidad). Lo que no encaje sale como
 *    lista clave: valor, nunca JSON crudo.
 *  - Globales de app.js que usa: sb, esc, $, GRADES (solo si no le pasan
 *    grades). Nada más.
 */
(function () {
  'use strict';

  const F = { grade: '', section: '', q: '', days: 30, family: '' };
  let ctx = { admin: false, grades: [] };
  let rows = [];
  const abiertos = new Set();

  /* La familia sale de la clave `activity`; los juegos generados guardan un
     literal ('crossword') y las páginas sueltas un prefijo. */
  const FAMILIES = [
    { key: 'games',    icon: '🎲', label: 'Games',        test: a => /^(crossword|wordsearch|word-sudoku|word-invaders|say-it-right|voice-battle)/.test(a) },
    { key: 'unitexam', icon: '📋', label: 'Unit exams',   test: a => /^unitexam-/.test(a) },
    { key: 'grammar',  icon: '🧪', label: 'Grammar Lab',  test: a => /^grammar-lab/.test(a) },
    { key: 'rdrexam',  icon: '📝', label: 'Reader exams', test: a => /^[a-z]+-exam-[a-z]\d-ch\d+$/.test(a) },
    { key: 'readers',  icon: '📖', label: 'Readers',      test: a => /^(attwn|earnest|tomsawyer|princepauper|treasureisland)-/.test(a) },
    { key: 'other',    icon: '🧩', label: 'Other',        test: () => true },
  ];
  const familyOf = a => FAMILIES.find(f => f.test(a || '')) || FAMILIES[FAMILIES.length - 1];

  const fmtT = s => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2, '0') + 's'; };
  const pct = a => (a.total ? Math.round(100 * (a.score || 0) / a.total) : null);
  const fecha = d => { try { return new Date(d).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }); } catch (_) { return String(d || ''); } };

  /* «G9 · U4 · W1» a partir de detail.meta; si no hay meta, el nivel. */
  function metaChip(a) {
    const m = (a.detail && a.detail.meta) || {};
    const parts = [];
    if (m.grade) parts.push(String(m.grade).toUpperCase());
    if (m.unit) parts.push('U' + m.unit);
    if (m.week) parts.push('W' + m.week);
    if (m.lang === 'fr') parts.push('FR');
    if (!parts.length && a.level) parts.push(a.level);
    return parts.length ? `<span class="badge" style="font-size:.7rem">${esc(parts.join(' · '))}</span>` : '';
  }

  const okMark = ok => ok ? '<span style="color:#15803d;font-weight:700">✓</span>' : '<span style="color:#b91c1c;font-weight:700">✗</span>';
  const cell = v => `<td>${esc(v == null ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v)))}</td>`;

  /* El detalle, por su forma. Devuelve '' si no hay nada que enseñar. */
  function detailHTML(a) {
    const d = a.detail;
    if (!d || typeof d !== 'object') return '';
    const items = Array.isArray(d.items) ? d.items : null;
    let out = '';
    if (items && items.length) {
      const it0 = items[0];
      if ('answer' in it0 || 'given' in it0) {
        const wrong = items.filter(x => !x.ok).length;
        out += `<div class="muted" style="font-size:.82rem;margin-bottom:6px">${items.length} items · <b style="color:${wrong ? '#b91c1c' : '#15803d'}">${wrong} wrong</b></div>
          <table style="font-size:.88rem"><thead><tr><th>#</th><th>Item</th><th>Student’s answer</th><th>Correct</th><th></th></tr></thead><tbody>${
            items.map((x, i) => `<tr style="${x.ok ? '' : 'background:#fff1f2'}">
              <td class="muted">${esc(x.n != null ? x.n : i + 1)}</td>
              ${cell([x.part, x.id, x.word].filter(v => v != null && v !== '').join(' · '))}
              ${cell('answer' in x ? x.answer : x.given)}
              ${cell(x.correct)}
              <td>${okMark(!!x.ok)}</td></tr>`).join('')
          }</tbody></table>`;
      } else if ('word' in it0) {
        const wrong = items.filter(x => !x.ok).length;
        out += `<div class="muted" style="font-size:.82rem;margin-bottom:6px">${items.length} words · <b style="color:${wrong ? '#b91c1c' : '#15803d'}">${wrong} missed</b></div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">${
            items.map(x => `<span class="badge" style="background:${x.ok ? '#dcfce7' : '#fee2e2'};color:${x.ok ? '#166534' : '#991b1b'}">${esc(x.word)}${x.attempts > 1 ? ' ×' + esc(x.attempts) : ''}</span>`).join('')
          }</div>`;
      } else {
        out += `<table style="font-size:.88rem"><tbody>${items.map((x, i) => `<tr><td class="muted">${i + 1}</td>${cell(x)}</tr>`).join('')}</tbody></table>`;
      }
    }
    if (Array.isArray(d.grid) && d.grid.length) {
      out += `<div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
        <pre style="font-family:ui-monospace,monospace;font-size:1rem;letter-spacing:.35em;line-height:1.5;margin:0;background:#f8fafc;padding:8px 10px;border-radius:8px">${esc(d.grid.join('\n'))}</pre>
        <div class="muted" style="font-size:.88rem">Word: <b>${esc(d.word || '')}</b>${d.hints != null ? ` · hints used: <b>${esc(d.hints)}</b>` : ''}</div>
      </div>`;
    }
    if (d.papers && typeof d.papers === 'object') {
      const nombres = { ruoe: 'Reading & Use of English', listening: 'Listening', writing: 'Writing' };
      out += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:${out ? '10px' : '0'}">${
        Object.keys(d.papers).map(k => { const o = d.papers[k] || {}; const q = o.of ? Math.round(100 * (o.ok || 0) / o.of) : null;
          return `<span class="badge">${esc(nombres[k] || k)}: <b>${esc(o.ok != null ? o.ok : '—')}/${esc(o.of != null ? o.of : '—')}</b>${q != null ? ' · ' + q + '%' : ''}</span>`; }).join('')
      }</div>`;
    }
    if (!out) {
      const resto = Object.keys(d).filter(k => k !== 'meta' && k !== 'items' && k !== 'grid' && k !== 'papers');
      if (resto.length) out = `<table style="font-size:.88rem"><tbody>${resto.map(k => `<tr><td class="muted">${esc(k)}</td>${cell(d[k])}</tr>`).join('')}</tbody></table>`;
    }
    return out;
  }
  const hasDetail = a => !!detailHTML(a);

  async function cargar() {
    const since = new Date(Date.now() - F.days * 86400e3).toISOString();
    let q = sb.from('activity_attempts')
      .select('id,student_id,activity,title,level,score,total,hints_used,duration_sec,submitted_at,detail,profiles!inner(full_name,grade_id,section)')
      .gte('submitted_at', since).order('submitted_at', { ascending: false }).limit(600);
    if (F.grade) q = q.eq('profiles.grade_id', F.grade);
    const { data, error } = await q;
    if (error) throw error;
    rows = data || [];
  }

  function filtrados() {
    const qn = F.q.trim().toLowerCase();
    return rows.filter(a => {
      const p = a.profiles || {};
      if (F.section && String(p.section || '') !== F.section) return false;
      if (F.family && familyOf(a.activity).key !== F.family) return false;
      if (qn && !(String(p.full_name || '').toLowerCase().includes(qn) || String(a.title || a.activity || '').toLowerCase().includes(qn))) return false;
      return true;
    });
  }

  function barra() {
    const grados = (ctx.grades && ctx.grades.length) ? ctx.grades : (window.GRADES || []);
    const secciones = [...new Set(rows.map(a => (a.profiles || {}).section).filter(Boolean))].sort();
    const gradeOpts = `<option value="">All grades</option>` + grados.map(g => `<option value="${g.id}" ${String(F.grade) === String(g.id) ? 'selected' : ''}>${esc(g.name)}</option>`).join('');
    const secOpts = `<option value="">All sections</option>` + secciones.map(s => `<option value="${esc(s)}" ${F.section === s ? 'selected' : ''}>${esc(s)}</option>`).join('');
    const dayOpts = [7, 30, 90, 365].map(n => `<option value="${n}" ${F.days === n ? 'selected' : ''}>Last ${n} days</option>`).join('');
    const lab = t => `<label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">${t}</label>`;
    return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
      <div>${lab('GRADE')}<select onchange="window.activitiesPanel._set('grade',this.value)" style="min-width:140px">${gradeOpts}</select></div>
      <div>${lab('SECTION')}<select onchange="window.activitiesPanel._set('section',this.value)">${secOpts}</select></div>
      <div>${lab('PERIOD')}<select onchange="window.activitiesPanel._set('days',+this.value)">${dayOpts}</select></div>
      <div style="flex:1;min-width:180px">${lab('STUDENT OR ACTIVITY')}<input type="search" value="${esc(F.q)}" placeholder="Name or activity…" oninput="window.activitiesPanel._set('q',this.value,true)" style="width:100%"></div>
    </div>`;
  }

  function chips(lista) {
    const n = {}; rows.forEach(a => { const k = familyOf(a.activity).key; n[k] = (n[k] || 0) + 1; });
    const b = (val, label, cnt) => `<button class="btn sm ${F.family === val ? '' : 'ghost'}" onclick="window.activitiesPanel._set('family','${val}')">${label} <b>${cnt}</b></button>`;
    return `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${b('', '🗂️ All', rows.length)}${
      FAMILIES.filter(f => n[f.key]).map(f => b(f.key, f.icon + ' ' + f.label, n[f.key])).join('')}</div>`;
  }

  function tabla(lista) {
    if (!lista.length) return `<p class="muted" style="padding:14px">No activities for this filter. Students’ games, unit exams, Grammar Lab and reader activities appear here as soon as they finish one.</p>`;
    const fila = a => {
      const p = a.profiles || {}, fam = familyOf(a.activity), q = pct(a), open = abiertos.has(a.id);
      const grado = p.grade_id ? `G${p.grade_id}${p.section || ''}` : '';
      const res = a.total ? `<b>${esc(a.score)}/${esc(a.total)}</b> <span class="muted">(${q}%)</span>` : (a.score != null ? `<b>${esc(a.score)}</b>` : '<span class="muted">—</span>');
      const boton = hasDetail(a) ? `<button class="btn sm ${open ? '' : 'ghost'}" onclick="window.activitiesPanel._toggle('${a.id}')">${open ? '▴ Hide' : '▾ Answers'}</button>` : '<span class="muted" title="This attempt was recorded before answers were saved (17 Sep 2026): only the score is available">—</span>';
      return `<tr>
        <td class="col-name"><b>${esc(p.full_name || '(student)')}</b> <span class="muted">${grado}</span></td>
        <td>${fam.icon} ${esc(a.title || a.activity)} ${metaChip(a)}</td>
        <td>${res}</td>
        <td>${fmtT(a.duration_sec)}</td>
        <td>${a.hints_used || 0}</td>
        <td class="muted">${fecha(a.submitted_at)}</td>
        <td>${boton}</td></tr>` +
        (open ? `<tr><td colspan="7" style="background:#f8fafc;padding:10px 14px">${detailHTML(a)}</td></tr>` : '');
    };
    return `<div style="overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Activity</th><th>Result</th><th>⏱ Time</th><th>💡 Hints</th><th>When</th><th></th></tr></thead>
      <tbody>${lista.map(fila).join('')}</tbody></table></div>
      <div class="muted" style="padding:8px 14px;font-size:.82rem">${lista.length} attempt(s)${rows.length >= 600 ? ' · showing the latest 600: narrow the filter to see older ones' : ''}</div>`;
  }

  function pintar(err) {
    const main = $('#main');
    if (!main) return;
    const lista = err ? [] : filtrados();
    main.innerHTML = `<h1>🎲 Activities</h1>
      <p class="muted" style="margin-top:-6px">Every game, unit exam, Grammar Lab topic and reader activity your students finish, with what they answered item by item. Worksheets and unit products are marked in <b>✅ Marking</b>.</p>
      ${barra()}${err ? `<div class="note err">Could not load the activities: ${esc(err.message || err)}</div>` : chips(lista)}
      <div class="card" style="padding:0">${err ? '' : tabla(lista)}</div>`;
  }

  async function render() {
    const main = $('#main');
    if (main) main.innerHTML = '<h1>🎲 Activities</h1><p class="muted">Loading…</p>';
    try { await cargar(); pintar(null); } catch (e) { pintar(e); }
  }

  window.activitiesPanel = async function (opts) {
    ctx = Object.assign({ admin: false, grades: [] }, opts || {});
    abiertos.clear();
    await render();
  };
  window.activitiesPanel._set = function (k, v, soloPinta) {
    F[k] = v;
    if (soloPinta || k === 'family' || k === 'section' || k === 'q') { pintar(null); const inp = document.querySelector('#main input[type=search]'); if (k === 'q' && inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } return; }
    render();
  };
  window.activitiesPanel._toggle = function (id) {
    if (abiertos.has(id)) abiertos.delete(id); else abiertos.add(id);
    pintar(null);
  };
  /* Para Mi progreso del alumno (app.js studentResults): el mismo detalle. */
  window.activitiesPanel.detailHTML = detailHTML;
})();
