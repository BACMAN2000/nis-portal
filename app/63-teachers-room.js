/* ===================== AULA DE PROFESORES (19-sep-2026) =====================
   Los profesores tambien rinden los mocks, pero no como alumnos de un grado:
   son dos grupos propios, `Teachers · Primary` (grade 12) y `Teachers ·
   Secondary` (grade 13), dados de alta en `grades` (migracion
   2026-09-19_01). Cada cuenta que se crea aqui es una cuenta de EXAMEN
   (role student, grade 12/13), distinta de la cuenta de profesor con la que
   dan clase: asi el candado de mocks, el mock mode, el mock individual, los
   resultados por grado y el «View as» valen tal cual.

   Lo que ve esa cuenta al entrar es la portada del aula (teacherRoomHub):
   practice tests, su progreso y ayuda — sin unidades, lecturas ni cursos de
   ningun grado. El dia del mock, la tarjeta del mock, como cualquier alumno. */

const TEACHER_ROOM = { 12: { key:'primary', label:'Primary teachers', emoji:'🧒', desc:'Teachers of Grades 1-5' },
                       13: { key:'secondary', label:'Secondary teachers', emoji:'🎓', desc:'Teachers of Grades 6-11' } };
function isStaffGrade(id){ return id != null && Object.prototype.hasOwnProperty.call(TEACHER_ROOM, String(id)); }

/* ---------- la portada de una cuenta del aula ---------- */
function teacherRoomHub(){
  _setNav('home');
  const p = state.profile || {};
  const room = TEACHER_ROOM[p.grade_id] || { label:'Teachers', emoji:'🧑‍🏫' };
  $('#main').innerHTML = `<h1>Hi, ${esc(p.first_name||p.full_name||'')} 👋</h1>
    <p class="muted" style="margin-top:-6px">${room.emoji} Teachers' Room · ${esc(room.label)}${p.cefr_level ? ' · Level ' + esc(p.cefr_level) : ''} — What would you like to do today?</p>
    <div class="grid cols-3" style="margin-top:16px">
      ${_hubCard('🎯','Practice tests','Reading, Listening and Writing in Cambridge format, at any level.',"location.href='"+_withBack(QUIZ_URL+'quizzes.html','home')+"'")}
      ${_hubCard('📊','My progress','Your results in mocks and practice tests.',"window._nav('results')")}
      ${_hubCard('❓','Help','Where everything is.',"window._nav('help')")}
    </div>
    <div class="note" style="margin-top:18px">On the mock day, the admin opens the mock for your group and this page shows only your mock card: choose your level (or sit the one set on your profile) and take the papers in order.</div>`;
}

/* ---------- el panel del admin: 🧑‍🏫 Teachers' Room ---------- */
async function teachersRoomPanel(){
  $('#main').innerHTML = `<div class="center muted">Loading…</div>`;
  const ids = Object.keys(TEACHER_ROOM).map(Number);
  const [prof, acc, off] = await Promise.all([
    sb.from('profiles').select('id,full_name,email,grade_id,section,cefr_level,active,created_at').in('grade_id', ids).eq('role','student').order('full_name'),
    sb.from('mock_access').select('grade_id,unlocked').in('grade_id', ids),
    sb.from('mock_official').select('mock').eq('id',1).maybeSingle(),
  ]);
  if(prof.error){ $('#main').innerHTML = `<div class="note err">${esc(prof.error.message)}</div>`; return; }
  const cuentas = prof.data || [];
  const N = off.data && off.data.mock;
  const abierto = {}; (acc.data||[]).forEach(r => abierto[r.grade_id] = !!r.unlocked);
  // Lo que rindio hoy cada cuenta (hora de Lima).
  const hechos = {};
  if(cuentas.length){
    const hoy = new Date(Date.now() - 5*3600e3).toISOString().slice(0,10) + 'T05:00:00.000Z';
    const r = await sb.from('exam_attempts').select('student_id,skill,level,mock').in('student_id', cuentas.map(c=>c.id)).gte('submitted_at', hoy);
    (r.data||[]).forEach(a => { (hechos[a.student_id] = hechos[a.student_id] || []).push(a.skill + ' ' + a.level + ' ' + (a.mock||'').replace('mock','M')); });
  }
  const col = (gid) => {
    const room = TEACHER_ROOM[gid]; const lista = cuentas.filter(c => c.grade_id === gid);
    const on = !!abierto[gid];
    const badge = on ? (N ? `<span class="badge on">🎓 MOCK MODE · MOCK ${N}</span>` : `<span class="badge on">🔓 Unlocked · no mock number</span>`) : `<span class="badge off">🔒 Mocks locked</span>`;
    const filas = lista.map(c => `<tr>
        <td><b>${esc(c.full_name||'')}</b>${c.active===false ? ' <span class="badge off">suspended</span>' : ''}<div class="muted" style="font-size:.78rem">${esc(c.email||'')}</div></td>
        <td>${esc(c.cefr_level||'—')}</td>
        <td style="font-size:.8rem">${(hechos[c.id]||[]).map(h=>'✓ '+esc(h)).join('<br>') || '<span class="muted">—</span>'}</td>
        <td><button class="btn sm ghost" onclick="window.editUser('${c.id}')">✏️ Edit</button></td></tr>`).join('');
    return `<div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
        <div><h2 style="margin:0 0 2px">${room.emoji} ${esc(room.label)}</h2><div class="muted" style="font-size:.85rem">${esc(room.desc)} · ${lista.length} account${lista.length===1?'':'s'}</div></div>
        ${badge}
      </div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin:12px 0">
        <button class="btn sm" onclick="window._trNewAccount(${gid})">➕ New account</button>
        <button class="btn sm ghost" onclick="renderAdmin('mocks')">🔓 Open Mocks</button>
        <button class="btn sm ghost" onclick="window._previewGrade(${gid})">👁️ View as</button>
      </div>
      ${lista.length ? `<div style="overflow-x:auto"><table><thead><tr><th>Teacher</th><th>Level</th><th>Today</th><th></th></tr></thead><tbody>${filas}</tbody></table></div>`
                     : `<p class="muted" style="font-size:.85rem;margin:0">No accounts yet. Create one per teacher with ➕ New account.</p>`}
    </div>`;
  };
  $('#main').innerHTML = `<h1>🧑‍🏫 Teachers' Room</h1>
    <div class="note">Two exam groups for the teachers, separate from the students: <b>Primary</b> and <b>Secondary</b>. Each teacher gets an <b>exam account</b> here (different from the account they teach with); with it they sit the practice tests any day and the <b>mock on the day you open it</b> for the group in 🔓 Open Mocks — same mock number as the school, each teacher at their own level (set it on the account, or let them choose). Results appear in 📝 Results and 🎓 Final result under the group.</div>
    <div class="grid cols-2">${col(12)}${col(13)}</div>`;
}
/* Alta desde el aula: el formulario de usuario de siempre, con rol y grado ya puestos. */
window._trNewAccount = (gid) => {
  adminNewUser();
  const role = $('#n_role'), grade = $('#n_grade');
  if(role) role.value = 'student';
  if(grade) grade.value = String(gid);
  const h2 = document.querySelector('#main .card h2');
  if(h2) h2.innerHTML = `New exam account · ${esc((TEACHER_ROOM[gid]||{}).label||'Teachers')}`;
  const back = document.querySelector('#main > button');
  if(back){ back.textContent = "← Back to Teachers' Room"; back.onclick = () => renderAdmin('teachersroom'); }
  const msg = $('#nmsg');
  if(msg) msg.innerHTML = `<div class="note" style="margin-top:10px">Use the teacher's usual email. If they already have a <b>teacher</b> account with it, use a variant (e.g. <code>name.exam@nordic-school.edu.pe</code>): one email = one account.</div>`;
};
