/* Overview — la portada del profesor y del admin.
 *
 * La primera version (agosto) contaba alumnos, profesores y examenes hechos,
 * y poco mas: era lo unico que habia. Desde entonces el portal guarda lo que
 * el alumno entrega (productos de unidad, fichas, Writing de los examenes de
 * unidad, Fun for Nordic, grabaciones), lo que intenta (examenes, practica,
 * actividades) y lo que dice la secuencia oficial de cada grado. Esta portada
 * junta todo eso en una pantalla: lo que hay que corregir, lo que ha pasado
 * esta semana, cada grado con su nivel, su examen y su unidad, y el siguiente
 * hito Cambridge.
 *
 * Reglas:
 *  - Cada consulta va por su cuenta y con try/catch: si una tabla no se puede
 *    leer (RLS del profesor), esa tarjeta dice "—" y las demas se pintan.
 *  - El profesor solo ve sus grados (teacherAllowedGrades); el admin, todos.
 *  - "Pendiente" significa lo mismo que en cada pestana de correccion:
 *    producto de unidad = hito 'final' sin revisar (sin la autoevaluacion);
 *    ficha = entregada (draft=false) sin revisar; Writing de examen = hito
 *    'exam-*' sin revisar; Fun for Nordic = writing/speaking sin revisar.
 *  - Los contadores se pulsan y abren la pestana donde se corrige.
 *
 * Usa las globales de app.js: sb, state, esc, $, GRADES, teacherAllowedGrades,
 * renderAdmin, renderTeacher, window._nav, window.UNIT_PLANS.
 */
(function () {
  'use strict';

  const DIAS = 7;
  const FUN_NIVEL = { 1: 'starters', 2: 'starters', 3: 'movers', 4: 'movers', 5: 'flyers' };
  const FUN_ICONO = { starters: '🐧', movers: '🐺', flyers: '🦅' };
  let SCOPE = null;

  const gkey = id => 'g' + id;                       // 9 → 'g9'  (unit_submissions, UNIT_PLANS)
  const gscope = id => 'G' + id;                     // 9 → 'G9'  (scope-2026.json)
  const hace = iso => {
    if (!iso) return '—';
    const d = (Date.now() - new Date(iso).getTime()) / 864e5;
    if (d < 1) return 'today';
    if (d < 2) return 'yesterday';
    if (d < 30) return Math.floor(d) + ' days ago';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };
  const desde = new Date(Date.now() - DIAS * 864e5).toISOString();

  /* una consulta que puede fallar sin tumbar la portada */
  async function q(promesa) {
    try { const { data, error } = await promesa; return error ? null : (data || []); }
    catch (e) { return null; }
  }
  async function cargaScope() {
    if (SCOPE) return SCOPE;
    try { const r = await fetch('scope/scope-2026.json', { cache: 'no-cache' }); SCOPE = r.ok ? await r.json() : {}; }
    catch (e) { SCOPE = {}; }
    return SCOPE;
  }

  window._irTab = k => (state.profile || {}).role === 'admin' ? renderAdmin(k) : renderTeacher(k);

  window.overviewPanel = async function (opts) {
    const admin = !!(opts && opts.admin);
    const main = $('#main');
    main.innerHTML = '<div class="card"><p class="muted">Reading the week…</p></div>';

    const grados = admin ? GRADES : teacherAllowedGrades();
    const misIds = new Set(grados.map(g => g.id));
    const misKeys = new Set(grados.map(g => gkey(g.id)));

    const [scope, profs, productos, examenes, fichas, guardados, fun, intentos, actividades, pantalla, mocks, accesos] = await Promise.all([
      cargaScope(),
      q(sb.from('profiles').select('id,role,grade_id,section,cefr_level,active,is_demo').limit(3000)),
      q(sb.from('unit_submissions').select('student_id,grade,unit,kind,reviewed_at,created_at,updated_at').eq('milestone', 'final').neq('kind', 'selfassess').limit(3000)),
      q(sb.from('unit_submissions').select('student_id,grade,unit,kind,reviewed_at,created_at,updated_at').like('milestone', 'exam-%').limit(3000)),
      q(sb.from('v_entregas_ficha').select('student_id,grade_id,grade,unit,milestone,reviewed_at,updated_at,draft').like('milestone', 'w%').limit(3000)),
      q(sb.from('unit_submissions').select('student_id,grade,milestone,updated_at').like('milestone', 'a:%').gte('updated_at', desde).limit(3000)),
      q(sb.from('fun_submissions').select('student_id,level,kind,reviewed_at,created_at').limit(3000)),
      q(sb.from('exam_attempts').select('student_id,skill,level,percent,submitted_at').gte('submitted_at', desde).limit(3000)),
      q(sb.from('activity_attempts').select('student_id,submitted_at').gte('submitted_at', desde).limit(3000)),
      q(sb.from('v_tiempo_pantalla').select('student_id,grade_id,semana,minutos').limit(5000)),
      admin ? q(sb.from('mock_access').select('grade_id,unlocked')) : Promise.resolve(null),
      admin ? q(sb.from('teacher_access').select('profile_id')) : Promise.resolve(null),
    ]);

    /* ---------- quien es quien ---------- */
    const alumnos = (profs || []).filter(p => p.role === 'student' && p.active !== false && !p.is_demo && misIds.has(p.grade_id));
    const gradoDe = {}; alumnos.forEach(p => gradoDe[p.id] = p.grade_id);
    const profesores = (profs || []).filter(p => p.role === 'teacher' && p.active !== false).length;
    const enMisGrados = r => r.grade ? misKeys.has(String(r.grade).toLowerCase()) : misIds.has(gradoDe[r.student_id]);

    /* ---------- lo que hay que corregir ---------- */
    const pend = (lista, cond) => (lista || []).filter(r => enMisGrados(r) && cond(r));
    const pendProductos = pend(productos, r => !r.reviewed_at);
    const pendExamen = pend(examenes, r => !r.reviewed_at);
    const pendFichas = pend(fichas, r => r.draft === false && !r.reviewed_at);
    const pendFun = (fun || []).filter(r => (r.kind === 'writing' || r.kind === 'speaking') && !r.reviewed_at && misIds.has(gradoDe[r.student_id]));
    const porGrado = lista => {
      const c = {};
      lista.forEach(r => { const k = r.grade ? String(r.grade).toUpperCase() : gscope(gradoDe[r.student_id]); c[k] = (c[k] || 0) + 1; });
      return Object.keys(c).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1))).map(k => `<span class="badge grade">${k}: ${c[k]}</span>`).join(' ');
    };
    const filaPend = (icono, titulo, lista, tab, nulo) => `
      <div class="ov-pend" ${lista ? `onclick="window._irTab('${tab}')"` : ''} title="${lista ? 'Open ' + titulo : ''}">
        <span class="ov-ico">${icono}</span>
        <span class="ov-t"><b>${esc(titulo)}</b><small>${lista ? porGrado(lista) || 'nothing waiting' : nulo}</small></span>
        <span class="ov-n ${lista && lista.length ? 'hot' : ''}">${lista ? lista.length : '—'}</span>
      </div>`;
    const totalPend = [pendProductos, pendExamen, pendFichas, pendFun].reduce((a, l) => a + (l ? l.length : 0), 0);
    const sinAcceso = 'not readable with your access';

    /* ---------- esta semana ---------- */
    const semana = {
      entregas: pend(productos, r => r.created_at >= desde).length + pend(examenes, r => r.created_at >= desde).length + pend(fichas, r => r.updated_at >= desde).length,
      guardados: (guardados || []).filter(enMisGrados).length,
      examenes: (intentos || []).filter(r => misIds.has(gradoDe[r.student_id])).length,
      actividades: (actividades || []).filter(r => misIds.has(gradoDe[r.student_id])).length,
      fun: (fun || []).filter(r => r.created_at >= desde && misIds.has(gradoDe[r.student_id])).length,
    };
    const activos = new Set([
      ...(intentos || []), ...(actividades || []), ...(guardados || []),
      ...(fun || []).filter(r => r.created_at >= desde),
      ...pend(productos, r => r.created_at >= desde), ...pend(fichas, r => r.updated_at >= desde),
    ].map(r => r.student_id).filter(id => misIds.has(gradoDe[id])));
    // minutos de pantalla de la ultima semana registrada
    let minutos = null;
    if (pantalla) {
      const ultima = pantalla.reduce((m, r) => r.semana > m ? r.semana : m, '');
      minutos = Math.round(pantalla.filter(r => r.semana === ultima && misIds.has(r.grade_id)).reduce((a, r) => a + Number(r.minutos || 0), 0));
    }

    /* ---------- cada grado ---------- */
    const via = g => ((scope.pathway || []).find(x => x.grado === gscope(g)) || {});
    const planes = window.UNIT_PLANS || {};
    const tarjetaGrado = g => {
      const id = g.id, k = gkey(id), p = via(id);
      const chicos = alumnos.filter(a => a.grade_id === id);
      const secciones = {}; chicos.forEach(a => { const s = (a.section || '').trim() || '—'; secciones[s] = (secciones[s] || 0) + 1; });
      const niveles = {}; chicos.forEach(a => { if (a.cefr_level) niveles[a.cefr_level] = (niveles[a.cefr_level] || 0) + 1; });
      const plan = planes[k];
      // la unidad mas avanzada del planificador (las de piloto van aparte, numeradas desde 100)
      const unidad = plan ? plan.units.filter(u => u.n < 100).sort((a, b) => b.n - a.n)[0] : null;
      const movimiento = [...pend(productos, r => r.grade === k), ...pend(fichas, r => r.grade === k), ...pend(examenes, r => r.grade === k)]
        .concat((guardados || []).filter(r => r.grade === k));
      const ultimo = movimiento.reduce((m, r) => r.updated_at > m ? r.updated_at : m, '');
      const pendG = pendProductos.filter(r => r.grade === k).length + pendFichas.filter(r => r.grade === k).length
        + pendExamen.filter(r => r.grade === k).length + pendFun.filter(r => gradoDe[r.student_id] === id).length;
      const funNivel = FUN_NIVEL[id];
      const enlaces = [
        `<a href="#" onclick="window._nav('classes_${k}');return false">🏫 Classes</a>`,
        unidad ? `<a href="#" onclick="window._nav('classes_${k}_unit_u${unidad.n}');return false">🎯 Unit ${unidad.n}</a>` : '',
        funNivel ? `<a href="#" onclick="window._irTab('fun${funNivel}');return false">${FUN_ICONO[funNivel]} Fun for Nordic ${funNivel[0].toUpperCase() + funNivel.slice(1)}</a>` : '',
        funNivel ? `<a href="#" onclick="window._irTab('rhymes');return false">🎶 Rhymes</a>` : '',
        `<a href="#" onclick="window._irTab('scope');return false">📚 Scope</a>`,
      ].filter(Boolean).join('');
      return `<div class="card ov-g">
        <div class="ov-gh"><h3>${esc(g.name)} <span class="muted">· ${chicos.length} student${chicos.length === 1 ? '' : 's'}${Object.keys(secciones).length > 1 ? ' (' + Object.keys(secciones).sort().map(s => s + ': ' + secciones[s]).join(', ') + ')' : ''}</span></h3>
          ${pendG ? `<span class="badge off">${pendG} to mark</span>` : '<span class="badge on">nothing to mark</span>'}</div>
        <div class="ov-kv">
          <div><b>Level</b>${esc(p.cefr || '—')}</div>
          <div><b>Exam</b>${esc(p.examen || '—')}</div>
          <div><b>Age</b>${esc(p.edad || '—')}</div>
          <div><b>Last work</b>${hace(ultimo)}</div>
        </div>
        ${unidad ? `<p class="ov-unit"><b>Unit ${unidad.n}</b> · ${esc(unidad.title)} <span class="muted">(${unidad.weeks} weeks)</span></p>` : '<p class="ov-unit muted">No unit in the planner yet.</p>'}
        ${Object.keys(niveles).length ? `<div class="ov-lv">${Object.keys(niveles).sort().map(l => `<span class="badge lvl">${esc(l)} · ${niveles[l]}</span>`).join(' ')}</div>` : ''}
        <div class="ov-links">${enlaces}</div>
      </div>`;
    };
    const gradosConGente = grados.filter(g => alumnos.some(a => a.grade_id === g.id));
    const gradosSinGente = grados.filter(g => !alumnos.some(a => a.grade_id === g.id));

    /* ---------- calendario Cambridge ---------- */
    const MES = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const hoy = new Date();
    const hitos = (scope.calendario || []).filter(c => /🎯/.test(c.hito)).map(c => {
      const m = MES[(c.mes.match(/[a-z]+/i) || [''])[0].toLowerCase()];
      const d = parseInt((c.mes.match(/\d+/) || ['1'])[0], 10);
      const fecha = m == null ? null : new Date(hoy.getFullYear(), m, d);
      const dias = fecha ? Math.ceil((fecha - hoy) / 864e5) : null;
      return { ...c, fecha, dias, exacto: /\d/.test(c.mes) };
    });
    const proximo = hitos.find(h => h.dias != null && h.dias >= -2);
    const calendario = hitos.length ? `<div class="card">
      <h2>🎓 Cambridge calendar</h2>
      ${hitos.map(h => `<div class="ov-hito ${h === proximo ? 'next' : (h.dias != null && h.dias < -2 ? 'past' : '')}">
        <span class="ov-mes">${esc(h.mes)}</span>
        <span class="ov-t"><b>${esc(h.hito.replace('🎯', '').trim())}</b><small>${esc(h.grados)} · ${esc(h.actividad)}</small></span>
        <span class="ov-dias">${h.dias == null ? '' : h.dias < -2 ? 'done' : h.dias <= 0 ? 'now' : (h.exacto ? 'in ' + h.dias + ' days' : '~' + Math.round(h.dias / 7) + ' weeks')}</span>
      </div>`).join('')}
      <p class="muted" style="font-size:.8rem;margin:8px 0 0">Mocks in May and October, official exams on 2 December. The full calendar is in 📚 Scope &amp; Sequence.</p>
    </div>` : '';

    /* ---------- solo admin: lo de siempre ---------- */
    const mockMap = {}; (mocks || []).forEach(m => mockMap[m.grade_id] = m.unlocked);
    const adminExtra = admin ? `
      <div class="card"><h2>What is turned on?</h2>
        <p class="muted" style="margin-top:-4px">Status of <b>Mocks</b> by grade (🔓 Mocks tab to change them). ${(accesos || []).length} teacher(s) with access configured (👨‍🏫 Teachers tab).</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
          ${GRADES.map(g => `<span class="badge ${mockMap[g.id] ? 'on' : 'off'}" style="font-size:.82rem">${g.name}: ${mockMap[g.id] ? '🔓' : '🔒'}</span>`).join('')}
        </div>
        <div class="row" style="gap:8px;margin-top:14px"><button class="btn sm" onclick="adminNewUser()">+ Create student</button><button class="btn sm ghost" onclick="adminNewTeacher()">+ Create teacher</button></div>
      </div>` : '';

    /* ---------- pintado ---------- */
    const CSS = `<style>
      .ov-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:16px}
      .ov-stats .stat{padding:14px 16px}
      .ov-stats .stat .n{font-size:1.7rem}
      .ov-stats .stat.hot .n{color:#b91c1c}
      .ov-stats .stat small{display:block;color:var(--grey,#666);font-size:.74rem;margin-top:2px}
      .ov-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;align-items:start}
      .ov-pend{display:flex;align-items:center;gap:12px;padding:10px 4px;border-bottom:1px solid var(--line);cursor:pointer}
      .ov-pend:last-child{border-bottom:0}
      .ov-pend:hover{background:var(--bg)}
      .ov-ico{font-size:1.4rem;width:2rem;text-align:center}
      .ov-t{flex:1;min-width:0}
      .ov-t b{display:block}
      .ov-t small{display:block;color:var(--grey,#666);font-size:.78rem;margin-top:2px;line-height:1.7}
      .ov-n{font-size:1.4rem;font-weight:800;color:var(--grey,#666);min-width:2.2rem;text-align:right}
      .ov-n.hot{color:#b91c1c}
      .ov-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
      .ov-g{margin:0}
      .ov-gh{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
      .ov-gh h3{margin:0;font-size:1.05rem}
      .ov-kv{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin:10px 0 6px;font-size:.88rem}
      .ov-kv b{display:block;font-size:.68rem;text-transform:uppercase;letter-spacing:.06em;color:var(--grey,#666)}
      .ov-unit{margin:6px 0;font-size:.9rem}
      .ov-lv{margin:4px 0 8px}
      .ov-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
      .ov-links a{font-size:.8rem;font-weight:600;text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:3px 10px;color:var(--blue-d)}
      .ov-links a:hover{background:var(--blue-d);color:#fff;border-color:var(--blue-d)}
      .ov-hito{display:flex;align-items:center;gap:12px;padding:8px 6px;border-bottom:1px solid var(--line);border-radius:8px}
      .ov-hito:last-child{border-bottom:0}
      .ov-hito.next{background:rgba(217,161,59,.14);box-shadow:inset 0 0 0 2px rgba(217,161,59,.6)}
      .ov-hito.past{opacity:.55}
      .ov-mes{font-weight:800;min-width:4.5rem;color:var(--blue-d)}
      .ov-dias{font-size:.8rem;font-weight:700;color:var(--grey,#666);white-space:nowrap}
      .ov-hito.next .ov-dias{color:#b45309}
      .ov-empty{color:var(--grey,#666);font-size:.85rem}
    </style>`;

    main.innerHTML = CSS + `
      <div class="row" style="justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
        <h1 style="margin:0">Overview</h1>
        <span class="muted">${hoy.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · last ${DIAS} days${admin ? '' : ' · your grades: ' + grados.map(g => g.name).join(', ')}</span>
      </div>
      <div class="ov-stats" style="margin-top:12px">
        <div class="stat"><div class="n">${alumnos.length}</div><div class="l">Students</div><small>${gradosConGente.length} grade(s) with students</small></div>
        ${admin ? `<div class="stat"><div class="n">${profesores}</div><div class="l">Teachers</div><small>${(accesos || []).length} with access set</small></div>` : ''}
        <div class="stat ${totalPend ? 'hot' : ''}"><div class="n">${totalPend}</div><div class="l">To mark</div><small>products, worksheets, exam writing, Fun</small></div>
        <div class="stat"><div class="n">${activos.size}</div><div class="l">Active students</div><small>did something this week</small></div>
        <div class="stat"><div class="n">${semana.entregas + semana.fun}</div><div class="l">Submissions</div><small>this week · +${semana.guardados} activity saves</small></div>
        <div class="stat"><div class="n">${intentos ? semana.examenes : '—'}</div><div class="l">Exam attempts</div><small>mocks &amp; practice this week</small></div>
        <div class="stat"><div class="n">${actividades ? semana.actividades : '—'}</div><div class="l">Activities</div><small>games &amp; labs this week</small></div>
        <div class="stat"><div class="n">${minutos == null ? '—' : minutos >= 60 ? (minutos / 60).toFixed(1).replace(/\.0$/, '') + ' h' : minutos + ' min'}</div><div class="l">Screen time</div><small>latest week recorded</small></div>
      </div>
      <div class="ov-two">
        <div class="card">
          <h2>✏️ To mark</h2>
          <p class="muted" style="margin-top:-4px">Handed in and not yet marked. Click a line to open it.</p>
          ${filaPend('🎯', 'Unit products', productos ? pendProductos : null, 'unitprod', sinAcceso)}
          ${filaPend('✅', 'Worksheets', fichas ? pendFichas : null, 'corregir', sinAcceso)}
          ${filaPend('📋', 'Unit exam · Writing', examenes ? pendExamen : null, 'unitexams', sinAcceso)}
          ${filaPend('🧸', 'Fun for Nordic · writing & recordings', fun ? pendFun : null, 'funnordic', sinAcceso)}
        </div>
        ${calendario}
      </div>
      <h2 style="margin:20px 0 10px">🏫 ${admin ? 'Grades' : 'My grades'}</h2>
      ${gradosConGente.length ? `<div class="ov-grid">${gradosConGente.map(tarjetaGrado).join('')}</div>` : '<p class="ov-empty">No students in your grades yet.</p>'}
      ${gradosSinGente.length ? `<p class="ov-empty" style="margin-top:10px">Without students: ${gradosSinGente.map(g => g.name).join(', ')}.</p>` : ''}
      ${adminExtra}
      ${admin ? `<div class="card"><h2>Roles and permissions</h2>
        <p class="muted" style="margin-top:-4px">Each person signs in with their email, and their role decides what they see and can do.</p>
        <div style="overflow-x:auto"><table>
          <thead><tr><th>Action / View</th><th style="text-align:center">🛡️ Admin</th><th style="text-align:center">👨‍🏫 Teacher</th><th style="text-align:center">🎓 Student</th></tr></thead>
          <tbody>${[
            ['View their own progress and projection', '—', '—', '✓'],
            ['Take exams (Mocks / Practice)', '—', '—', '✓'],
            ['View student results', '✓ (all)', 'If enabled · only their grades', '—'],
            ['View student list', '✓ (all)', 'If enabled · only their grades', '—'],
            ['Mark Writing, products and worksheets', '✓', '✓ (their grades)', '—'],
            ['📈 Statistics and reports', '✓ (admin only)', '—', '—'],
            ['📝 Registration: create / edit / delete users', '✓ (admin only)', '—', '—'],
            ['Set teacher access and grades', '✓ (admin only)', '—', '—'],
            ['🔓 Unlock Mocks by grade', '✓ (admin only)', '—', '—'],
            ['Phonics, Games Lab and MUN Academy', '✓', '✓', '✓'],
          ].map(r => `<tr><td>${r[0]}</td><td style="text-align:center">${r[1]}</td><td style="text-align:center;font-size:.85rem">${r[2]}</td><td style="text-align:center">${r[3]}</td></tr>`).join('')}
          </tbody></table></div>
        <p class="muted" style="font-size:.82rem;margin-top:8px">To set what each teacher sees and which grades, go to <b>👨‍🏫 Teachers</b>.</p>
      </div>` : ''}`;
  };
})();
