

/* ===================== RESULTADO FINAL / CEFR ===================== */
/* Cambridge English Scale: reported range per exam level. A skill's % within
   its exam level maps linearly onto that range; the final is the average of the
   four skills' scale scores, mapped back to a CEFR band (the official chart). */
const SCALE_RANGE = { A2:[100,150], B1:[120,170], B2:[140,190], C1:[160,210] }; // rango Cambridge reportado por nivel (referencia)
const SCALE_BOUNDARY = { A2:120, B1:140, B2:160, C1:180 };  // inicio CEFR del nivel ≈ aprobar (~60%)
const CEFR_BANDS = [ {min:180,cefr:'C1'},{min:160,cefr:'B2'},
  {min:140,cefr:'B1'},{min:120,cefr:'A2'},{min:100,cefr:'A1'},{min:0,cefr:'<A1'} ];  // C1 es el tope: cualquier escala ≥180 reporta C1 (sin C2)
/* %→Escala Cambridge anclado al APROBADO: 60% cae en el límite del nivel; por
   encima sube hacia la banda siguiente; por debajo baja ~1 banda cada 20 puntos.
   (Antes el piso del nivel era la banda inferior, así un 20% en B2 daba 150=B1;
    ahora 20% en B2 → 120 = A2.) */
function skillScale(level, pct){
  if(pct==null || isNaN(pct)) return null;
  const B = SCALE_BOUNDARY[level] || SCALE_BOUNDARY.B1;
  pct = Number(pct);
  const s = pct>=60 ? B + (pct-60)*0.75 : B - (60-pct)*1.0;
  return Math.round(Math.max(80, Math.min(230, s)));
}
function scaleToCefr(scale){
  if(scale==null) return '—';
  for(const b of CEFR_BANDS){ if(scale>=b.min) return b.cefr; }
  return '<A1';
}
/* Target ("applying-for") CEFR level per grade — school policy map.
   Only G6–G11 have students today; lower grades default to A2. Falls back to
   the student's stored cefr_level if a grade isn't mapped. */
const GRADE_TARGET = {1:'A2',2:'A2',3:'A2',4:'A2',5:'A2',6:'A2',7:'A2',8:'B1',9:'B2',10:'B2',11:'C1'};
/* Per-student grade-target override (accessibility / teacher judgement). */
const TARGET_OVERRIDE = { '25555d21-e999-4b76-a5eb-827937b0d8a9':'A2' }; // Salvador Arata Morales (G9·B)
function targetLevel(p){ return (p && (TARGET_OVERRIDE[p.id] || GRADE_TARGET[p.grade_id] || p.cefr_level)) || null; }
const CEFR_RANK = {'<A1':0,'A1':1,'A2':2,'B1':3,'B2':4,'C1':5,'C2':6};
/* Compare a final CEFR against the target: 'meets' | 'below' | 'above' | null */
function targetStatus(finalCefr, target){
  if(!target || finalCefr==null || finalCefr==='—' || !(finalCefr in CEFR_RANK)) return null;
  const d = CEFR_RANK[finalCefr] - CEFR_RANK[target];
  return d<0 ? 'below' : d>0 ? 'above' : 'meets';
}
/* Best attempt for a skill — MOCK-FIRST, PASS-AWARE.
   The official mock (mock1/mock2) is authoritative: if the skill has ANY mock,
   only mocks are considered, so a high 'practice' score at a higher level can't
   inflate the final above the official mock (e.g. a 97% B1 practice reading
   must NOT turn an A2 mock into B2). 'practice' is used only as a fallback when
   the skill has no mock at all — otherwise that grade would simply vanish from
   the report (most attempts in the system are practice).
   A sub-pass attempt at a high level must NOT out-rank a genuine pass at a
   lower level (e.g. C1 @ 0% would otherwise score B2). So within the chosen set
   pick the highest scale among attempts that reach the pass mark; if none
   passed, fall back to the highest-% attempt (not the highest level). */
const PASS_MIN = 50;
function bestAttemptScale(atts, skill){
  const all = (atts||[])
    .filter(a => a.skill===skill && a.percent!=null)
    .map(a => ({ a, pct:Number(a.percent), scale:skillScale(a.level, Number(a.percent)), isMock:a.mock!=='practice' }))
    .filter(x => x.scale!=null);
  if(!all.length) return null;
  const mocks = all.filter(x => x.isMock);
  const rows = mocks.length ? mocks : all;   // mock-first; practice only if no mock
  const passed = rows.filter(x => x.pct >= PASS_MIN);
  const pick = passed.length
    ? passed.reduce((b,x) => x.scale > b.scale ? x : b)   // best pass by scale
    : rows.reduce((b,x) => x.pct > b.pct ? x : b);        // none passed: highest %, not highest level
  return { scale:pick.scale, cefr:scaleToCefr(pick.scale), level:pick.a.level,
           pct:Math.round(pick.pct), source:mockLabel(pick.a), passed:passed.length>0 };
}
/* Per-student CEFR override, by skill — teacher's professional judgement.
   This does NOT change the scoring formula: it pins one student's band when
   the teacher decides the auto-mapped result doesn't reflect the real level.
   The Cambridge scale is clamped into the chosen band so the displayed scale
   (and the overall average) stay coherent with the pinned CEFR. */
const FINAL_CEFR_OVERRIDE = {
  // Kai Coll Mayo (G6 · A) — teacher: overall result pinned to A2 (Reading & Listening).
  'd441885a-6ec9-4b70-92db-10fa352326d2': { Reading:'A2', Listening:'A2' },
  // Caleb Eliahu Chinchay Roncal (G6 · B) — teacher: overall result pinned to A2.
  'd1f12f91-64ba-403e-b191-783ec0280083': { Reading:'A2', Listening:'A2' },
  // Salvador Arata Morales (G9 · B) — accessibility: all skills pinned to A2.
  '25555d21-e999-4b76-a5eb-827937b0d8a9': { Reading:'A2', Listening:'A2', Writing:'A2', Speaking:'A2' },
};
/* Per-student FINAL RESULT override (teacher judgement) — pins the overall result
   and clamps the scale into that band, so portal == PDF report. */
const FINAL_RESULT_OVERRIDE = {
  'fdbd2138-32e3-44cb-93db-9ff74a2e7a80': 'C1', // David André Novoa Davis (G9·B)
  'a53a5fce-5381-417a-910c-26d8888fbeac': 'A1', // Rafaella Vargas (G9·B)
  'fdc5fd6f-cca7-44ee-b304-e6441b7e8b8d': 'A2', // Mikel Paolo Olcese Reategui (G9·A)
  '637dc77a-7f76-4d62-a3bc-44f7f55d2e67': 'B1', // Alejandro Mosi Pimentel (G8·B)
  '55f919be-054d-4b7a-88a6-27dfcd124a60': 'B2', // Alessandra Paola Chiri Riva (G8·B)
  '75d38ade-87c1-4558-9ba8-a5b44b4f9e31': 'A2', // Cristóbal Burga Garrúes (G8·B)
  'a23da050-d6cb-4460-90dd-d6281974e5da': 'A1', // Joaquim Alfredo Ruiz Huallanca (G8·B)
  '2ef7eb9f-8149-48c7-935b-7b9e4ddc8cff': 'A2', // Valeria Sofia Morales Parodi (G8·A)
};
function _applyCefrOverride(profile, skill, b){
  if(!b) return b;
  const ov = FINAL_CEFR_OVERRIDE[profile && profile.id];
  const lvl = ov && ov[skill];
  if(!lvl || lvl===b.cefr) return b;
  const band = CEFR_BANDS.find(x=>x.cefr===lvl);
  if(!band) return b;
  const top = CEFR_BANDS.filter(x=>x.min>band.min).reduce((m,x)=>Math.min(m,x.min),230) - 1;
  const scale = Math.max(band.min, Math.min(top, b.scale));
  return { ...b, cefr:lvl, scale, overridden:true };
}
/* Combine the four skills into a provisional/final CEFR result. */
function _finalFromData(profile, atts, spk){
  // A2 Key is a combined "Reading and Writing" paper, so Writing is NOT a
  // separate skill at A2 — it's embedded in Reading & Use of English. A2-track
  // students are therefore scored on Reading + Listening + Speaking only.
  const isA2 = targetLevel(profile)==='A2';
  const Reading   = _applyCefrOverride(profile,'Reading',  bestAttemptScale(atts,'Reading'));
  const Listening = _applyCefrOverride(profile,'Listening',bestAttemptScale(atts,'Listening'));
  // A2 (KET) normalmente combina Reading+Writing (sin Writing aparte). Pero si la
  // profesora SÍ calificó un Writing (p. ej. G7 a nivel B1), se incluye igual.
  const Writing   = _applyCefrOverride(profile,'Writing',  bestAttemptScale(atts,'Writing'));
  let Speaking = null;
  if(spk && spk.percent!=null){
    const lvl = spk.level || targetLevel(profile) || 'B1';
    const sc = skillScale(lvl, Number(spk.percent));
    Speaking = { scale:sc, cefr:scaleToCefr(sc), level:lvl, pct:Math.round(Number(spk.percent)), source:'Rubric' };
  }
  Speaking = _applyCefrOverride(profile,'Speaking', Speaking);
  // Plegar Writing dentro de Reading SOLO en A2 puro (sin ningún writing rendido).
  // Si hay writing (calificado o no), se muestra como destreza propia (B1+).
  const a2NoWriting = isA2 && !(atts||[]).some(a=>a.skill==='Writing');
  const skills = a2NoWriting ? { Reading, Listening, Speaking } : { Reading, Listening, Writing, Speaking };
  const present = Object.values(skills).filter(Boolean);
  // Salvador Arata (accesibilidad): recomputar cada destreza como A2 por % (coincide con el PDF
  // y no infla con el piso del nivel original). Mantiene techo A2 (139).
  if(profile && profile.id==='25555d21-e999-4b76-a5eb-827937b0d8a9'){
    for(const x of present){ if(x && x.pct!=null){ x.scale=Math.min(139,skillScale('A2',Number(x.pct))); x.cefr='A2'; } }
  }
  // Reglas de "informe completo":
  //  · A2 puro (A2 Key): Reading & Use of English (incluye Writing) + Listening. No requiere Speaking.
  //  · B1/B2/C1 (o A2 con Writing aparte): Reading & UoE + Listening + Writing + Speaking.
  const requiredKeys = a2NoWriting ? ['Reading','Listening'] : ['Reading','Listening','Writing','Speaking'];
  let finalScale = present.length ? Math.round(present.reduce((s,x)=>s+x.scale,0)/present.length) : null;
  // Tope por destrezas muy bajas (<50% = no aprobó la destreza): 1 baja -> máx B2,
  // 2+ bajas -> máx B1. Solo BAJA el resultado (una escala alta por el piso del nivel
  // no debe inflar un C1/C2 cuando una destreza está muy baja).
  if(finalScale!=null){
    const lows = present.filter(x=>x && x.pct!=null && Number(x.pct)<50).length;
    const ceil = lows>=2 ? 159 : (lows>=1 ? 179 : null);
    if(ceil!=null && finalScale>ceil) finalScale = ceil;
  }
  let finalCefr = scaleToCefr(finalScale);
  const _fro = FINAL_RESULT_OVERRIDE[profile && profile.id];
  if(_fro && finalScale!=null){
    const _b = CEFR_BANDS.find(x=>x.cefr===_fro);
    if(_b){ const _top = CEFR_BANDS.filter(x=>x.min>_b.min).reduce((m,x)=>Math.min(m,x.min),230)-1;
      finalScale = Math.max(_b.min, Math.min(_top, finalScale)); finalCefr=_fro; }
  }
  const labels = { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' };
  return { profile, skills, isA2, a2NoWriting, finalScale, finalCefr,
           complete: requiredKeys.every(k=>skills[k]), missing: requiredKeys.filter(k=>!skills[k]).map(k=>labels[k]) };
}
function _skillCellHtml(b){
  if(!b) return '';
  return `<b style="color:#2d5a8d">${esc(b.cefr)}</b> <span class="muted" style="font-size:.78rem">${b.scale} · ${b.pct}%</span>`;
}

/* ---- Speaking rubric (Cambridge analytical scales, 0–5 per descriptor) ---- */
const SPEAKING_SUBSCALE = {
  'Grammar and Vocabulary': band6(
    'Uses basic words and simple structures; frequent errors; vocabulary limited to familiar topics.',
    'Uses a range of everyday vocabulary and simple grammatical forms with some control; errors occur but meaning is clear.',
    'Uses a wide range of vocabulary and grammatical forms, including complex structures, with good control and precision.'),
  'Discourse Management': band6(
    'Produces very short, often isolated responses; long pauses; little development.',
    'Produces extended stretches of language with some hesitation; mostly relevant and coherent with some repetition.',
    'Produces extended, relevant and coherent discourse with very little hesitation; ideas are well developed and linked.'),
  'Pronunciation': band6(
    'Pronunciation is heavily influenced by L1; the listener must make significant effort to understand.',
    'Generally intelligible; some control of stress and intonation, though L1 influence is noticeable.',
    'Intelligible throughout; stress, rhythm and intonation are used effectively to support meaning.'),
  'Interactive Communication': band6(
    'Needs a lot of prompting and support to keep the interaction going.',
    'Initiates and responds appropriately, keeping the interaction going with some support.',
    'Interacts with ease, initiating and developing the exchange naturally and responding to the other speaker effectively.'),
  'Global Achievement': band6(
    'Manages only very simple exchanges on familiar topics with much effort.',
    'Handles the tasks at this level adequately, conveying meaning despite some limitations.',
    'Fully handles the demands of the tasks at this level with confidence and effectiveness.')
};
const SPEAKING_RUBRICS = {
  A2:{ bandMax:5, subs:['Grammar and Vocabulary','Pronunciation','Interactive Communication','Global Achievement'] },
  B1:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] },
  B2:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] },
  C1:{ bandMax:5, subs:['Grammar and Vocabulary','Discourse Management','Pronunciation','Interactive Communication','Global Achievement'] }
};

async function cefrFinalPanel(){
  if($('#main')) $('#main').innerHTML = `<div class="center muted">Loading…</div>`;
  const isTeacher = state.profile && state.profile.role==='teacher';
  const gradeList = isTeacher ? teacherAllowedGrades() : GRADES;
  const allowed = isTeacher ? gradeList.map(g=>g.id) : null;
  const { data:studentsRaw, error } = await sb.from('profiles')
    .select('id,full_name,section,cefr_level,grade_id,grades(name)').eq('role','student');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  let students = studentsRaw||[];
  if(allowed) students = students.filter(s=>allowed.includes(s.grade_id));
  const f = resultsFilter;
  if(f.grade)   students = students.filter(s=>String(s.grade_id)===String(f.grade));
  if(f.section) students = students.filter(s=>(s.section||'').toUpperCase()===f.section.toUpperCase());
  if(f.name)    students = students.filter(s=>(s.full_name||'').toLowerCase().includes(f.name.toLowerCase()));
  students.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));

  const ids = students.map(s=>s.id);
  const safeIds = ids.length?ids:['00000000-0000-0000-0000-000000000000'];
  const { data:atts } = await sb.from('exam_attempts')
    .select('id,student_id,skill,level,percent,mock,submitted_at').in('student_id', safeIds).limit(8000);
  const { data:spks } = await sb.from('speaking_results').select('*').in('student_id', safeIds);
  const aBy={}; (atts||[]).forEach(a=>{(aBy[a.student_id]=aBy[a.student_id]||[]).push(a);});
  const sBy={}; (spks||[]).forEach(s=>{ sBy[s.student_id]=s; });

  const rows = students.map(s=>{
    const at=aBy[s.id]||[]; const fin=_finalFromData(s, at, sBy[s.id]);
    const tgt=targetLevel(s);
    // Mock column (solo profesor/admin): el examen exacto que rindió = nivel · número de mock.
    // Un alumno suele rendir un solo mock; si rindió varios (p. ej. Mock 1 y Mock 2) se listan.
    const mockCell = (()=>{
      const ms = at.filter(isMockAttempt);
      if(!ms.length) return '<span class="muted" style="font-size:.8rem">—</span>';
      ms.sort((x,y)=>(x.mock||'').localeCompare(y.mock||'')||(x.level||'').localeCompare(y.level||''));
      const seen=new Set(), out=[];
      ms.forEach(a=>{ const key=(a.level||'?')+'·'+a.mock; if(seen.has(key))return; seen.add(key);
        out.push(`<span class="badge lvl" style="font-size:.78rem" title="${esc(mockLabel(a))} · level ${esc(a.level||'?')}">${esc(a.level||'?')} · ${esc(mockLabel(a))}</span>`); });
      return out.join('<br>');
    })();
    const wAtt=at.filter(a=>a.skill==='Writing').sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||''))[0];
    const wCell = fin.a2NoWriting ? '<span class="muted" style="font-size:.78rem" title="In A2 Key, Writing is included within Reading &amp; Use of English">— in Reading</span>'
      : fin.skills.Writing ? `${_skillCellHtml(fin.skills.Writing)}${wAtt?` <button class="btn sm ghost" style="padding:2px 7px" onclick="gradeWriting('${wAtt.id}')" title="Edit grade">✎</button>`:''}`
      : (wAtt ? `<button class="btn sm ghost" onclick="gradeWriting('${wAtt.id}')">✍️ Mark</button>`
              : '<span class="muted" style="font-size:.8rem">no exam</span>');
    const spkLvl = (fin.skills.Speaking&&fin.skills.Speaking.level)||tgt||'';
    const sCell = fin.skills.Speaking
      ? `${_skillCellHtml(fin.skills.Speaking)} <button class="btn sm ghost" style="padding:2px 7px" onclick="speakingGrader('${s.id}','${spkLvl}')">✎</button>`
      : `<button class="btn sm ghost" onclick="speakingGrader('${s.id}','${spkLvl}')">🗣️ Mark</button>`;
    const stt=targetStatus(fin.finalCefr, tgt);
    const sttChip = stt==='below' ? ` <span class="badge off" style="font-size:.66rem;background:#dc2626;color:#fff" title="Below the target ${tgt}">▼</span>`
      : stt==='above' ? ' <span class="badge on" style="font-size:.66rem" title="Above the target">▲</span>'
      : stt==='meets' ? ' <span class="badge on" style="font-size:.66rem" title="Meets the target">✓</span>' : '';
    const finBadge = fin.finalScale!=null
      ? `<span class="badge lvl" style="font-size:.92rem">${esc(fin.finalCefr)} · ${fin.finalScale}</span>${sttChip}${fin.complete?'':' <span class="badge off" style="font-size:.66rem" title="Missing: '+esc(fin.missing.join(', '))+'">prov.</span>'}`
      : '<span class="muted">—</span>';
    return `<tr data-sname="${esc((s.full_name||'').toLowerCase())}">
      <td><a href="#" onclick="event.preventDefault();studentDetailReport('${s.id}')" title="View full report and print" style="color:#2d5a8d;font-weight:700;text-decoration:none;cursor:pointer">${esc(s.full_name||'')}</a></td>
      <td><span class="badge grade">${esc(s.grades?.name||'—')}</span> ${s.section?esc(s.section):''}</td>
      <td><span class="badge lvl" style="opacity:.8">${tgt||'—'}</span></td>
      <td style="white-space:nowrap">${mockCell}</td>
      <td>${_skillCellHtml(fin.skills.Reading)||'<span class="muted">—</span>'}</td>
      <td>${_skillCellHtml(fin.skills.Listening)||'<span class="muted">—</span>'}</td>
      <td>${wCell}</td>
      <td style="white-space:nowrap">${sCell}</td>
      <td>${finBadge}</td>
      <td class="acts"><div class="acts-wrap"><button class="btn sm" onclick="studentReportPDF('${s.id}','es')">📄 ES</button><button class="btn sm ghost" onclick="studentReportPDF('${s.id}','en')">📄 EN</button></div></td>
    </tr>`;
  }).join('');

  $('#main').innerHTML = `
    <h1 style="margin:0 0 4px">🎓 Final result · CEFR</h1>
    <p class="muted" style="margin-top:0;font-size:.88rem">Best result per skill converted to the <b>Cambridge Scale</b> (a pass ≈60% lands at the level boundary; below that drops a band). The <b>final</b> is the average of the assessed skills (the best attempt <b>passed ≥50%</b> is taken; if none passed, the highest %). <b>Writing</b> and <b>Speaking</b> are graded with the Cambridge rubric (0–5 per descriptor). In <b>A2</b>, Writing is included within Reading &amp; Use of English (A2 Key exam), so it does not count as a separate skill. <b>Mock</b> = exam taken (level · mock number); “—” = has not taken a mock yet. <b>Target</b> = level the grade aims for; <span class="badge off" style="font-size:.66rem;background:#dc2626;color:#fff">▼</span> = below the target, <span class="badge on" style="font-size:.66rem">✓</span> = meets it. <span class="badge off" style="font-size:.66rem">prov.</span> = skills still missing.</p>
    ${resultsFilterBar(gradeList,'window._setFinalFilter')}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Target</th><th>Mock</th><th>Reading &amp; UoE</th><th>Listening</th><th>Writing</th><th>Speaking</th><th>Final CEFR</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="10" class="center muted">No students for this filter.</td></tr>`}</tbody>
    </table><div id="resCount" data-noun="student(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${students.length} student(s)</div></div>`;
}
window.cefrFinalPanel = cefrFinalPanel;
window._setFinalFilter = (k,v)=>{
  if(k==='_clear') resultsFilter={grade:'',section:'',name:'',dateFrom:'',dateTo:''};
  else resultsFilter[k]=v;
  cefrFinalPanel();
};

/* ---- Speaking grader (rubric, mirrors writing grader) ---- */
let speakingState=null;
function speakingRubric(){ return SPEAKING_RUBRICS[speakingState.level] || SPEAKING_RUBRICS.B1; }
window.speakingGrader = async (studentId, level)=>{
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,grade_id,cefr_level,grades(name)').eq('id',studentId).single();
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const { data:prev } = await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle();
  const lvl = level || (prev&&prev.level) || targetLevel(p) || 'B1';
  const sel = {};
  if(prev && prev.breakdown && Array.isArray(prev.breakdown.parts)) prev.breakdown.parts.forEach(pp=>{ sel[pp.part]=pp.correct; });
  speakingState = { studentId, profile:p, level:lvl, sel, msg:(prev&&prev.comment)||'' };
  renderSpeakingGrader();
};
function renderSpeakingGrader(){
  const r=speakingRubric(), sel=speakingState.sel, p=speakingState.profile;
  const max=r.subs.length*r.bandMax;
  let total=0, all=true; r.subs.forEach(s=>{ if(sel[s]!=null) total+=sel[s]; else all=false; });
  const pct=Math.round(total/max*100);
  const cefrBand = all ? scaleToCefr(skillScale(speakingState.level, pct)) : '—';
  const subsHtml=r.subs.map((s,si)=>{
    const desc=SPEAKING_SUBSCALE[s]||[];
    const cards=desc.map((d,band)=>{
      const on=sel[s]===band;
      return `<div onclick="window._pickSpeak(${si},${band})" style="cursor:pointer;border:2px solid ${on?'#4987c6':'var(--line)'};background:${on?'#eef4fb':'#fff'};border-radius:8px;padding:8px 10px;margin:4px 0;display:flex;gap:10px;align-items:flex-start">
        <span style="flex:0 0 auto;font-weight:700;color:${on?'#2d5a8d':'#94a3b8'};min-width:46px">Band ${band}</span>
        <span style="font-size:.88rem">${esc(d)}</span></div>`;
    }).join('');
    return `<div class="card" style="margin-bottom:6px"><h3 style="margin:0 0 6px">${esc(s)} <span class="muted" style="font-weight:400">/ ${r.bandMax}</span> <b style="float:right;color:#2d5a8d">${sel[s]!=null?sel[s]:'—'}</b></h3>${cards}</div>`;
  }).join('');
  const lvlSel=LEVELS.map(l=>`<option ${speakingState.level===l?'selected':''}>${l}</option>`).join('');
  $('#main').innerHTML=`
    <button class="btn sm ghost" onclick="cefrFinalPanel()">← Back to final result</button>
    <h1 style="margin:.4rem 0 0">🗣️ Mark Speaking</h1>
    <div class="muted" style="margin-bottom:10px">${esc(p.full_name||'Student')} · ${esc(p.grades?.name||'')}</div>
    <div class="note">Choose the descriptor that matches each criterion (Cambridge Speaking analytical scales, 0–${r.bandMax}). The grade is calculated automatically. The level defines the criteria.</div>
    <div class="row" style="gap:10px;align-items:center;margin:10px 0">
      <label style="font-weight:700">Exam level</label>
      <select onchange="window._setSpeakLevel(this.value)" style="min-width:90px">${lvlSel}</select>
    </div>
    ${subsHtml}
    <div class="card" style="position:sticky;bottom:0">
      <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
        <h2 style="margin:0">Total</h2>
        <div style="font-size:1.4rem;font-weight:800;color:#2d5a8d"><span>${total}</span> / ${max} · <span>${pct}</span>% · <span style="background:#d1d2ea;color:#244c77;border-radius:8px;padding:2px 10px;font-size:1.05rem">${esc(cefrBand)}</span></div>
      </div>
      <label style="margin-top:10px;display:block">Comment for the student (optional)</label>
      <textarea id="sp-msg" rows="4" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:8px" oninput="speakingState.msg=this.value">${esc(speakingState.msg||'')}</textarea>
      <div id="sp-status" style="margin-top:6px;font-size:.88rem"></div>
      <div class="row" style="margin-top:10px;gap:10px">
        <button class="btn" onclick="window._saveSpeaking()">💾 Save Speaking</button>
      </div>
    </div>`;
}
window._pickSpeak = (si,band)=>{ const s=speakingRubric().subs[si]; speakingState.sel[s]=band; const y=window.scrollY; renderSpeakingGrader(); window.scrollTo(0,y); };
window._setSpeakLevel = (v)=>{ speakingState.level=v; speakingState.sel={}; renderSpeakingGrader(); };
window._saveSpeaking = async ()=>{
  const r=speakingRubric(), sel=speakingState.sel, st=$('#sp-status');
  let total=0, all=true; r.subs.forEach(s=>{ if(sel[s]!=null) total+=sel[s]; else all=false; });
  if(!all){ st.innerHTML='<span style="color:var(--bad)">Select a Band for each criterion before saving.</span>'; return; }
  const max=r.subs.length*r.bandMax, pct=Math.round(total/max*100);
  const breakdown={ kind:'speaking-graded', parts:r.subs.map(s=>({part:s, correct:sel[s], total:r.bandMax})) };
  st.textContent='Saving…';
  const { error } = await sb.rpc('upsert_speaking', {
    p_student:speakingState.studentId, p_level:speakingState.level, p_score:total, p_total:max,
    p_percent:pct, p_breakdown:breakdown, p_comment:(speakingState.msg||'').trim()||null });
  if(error){ st.innerHTML=`<span style="color:var(--bad)">Could not save: ${esc(error.message)}</span>`; return; }
  cefrFinalPanel();
};

/* ---- PDF report (lazy-load html2pdf, mirrors ensureChart) ---- */
let _h2pLib=null;
function ensureHtml2pdf(){
  if(window.html2pdf) return Promise.resolve();
  if(_h2pLib) return _h2pLib;
  _h2pLib=new Promise((res,rej)=>{
    const s=document.createElement('script');
    s.src='vendor/html2pdf.bundle.min.js';
    s.onload=()=>res(); s.onerror=()=>rej(new Error('Could not load html2pdf (connection).'));
    document.head.appendChild(s);
  });
  return _h2pLib;
}
/* Carga html2canvas + jsPDF por separado. Se captura el nodo DIRECTAMENTE con
   html2canvas (no con html2pdf, que envuelve el nodo en un contenedor del ancho
   de la VENTANA y hacía que el PDF saliera encogido/cortado en ventanas reales). */
let _pdfLibs=null;
function ensurePdfLibs(){
  if(window.html2canvas && window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
  if(_pdfLibs) return _pdfLibs;
  const load=(src)=>new Promise((res,rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=()=>rej(new Error('Could not load the PDF libraries (connection).')); document.head.appendChild(s); });
  _pdfLibs=(async()=>{
    if(!window.html2canvas) await load('vendor/html2canvas.min.js');
    if(!(window.jspdf&&window.jspdf.jsPDF)) await load('vendor/jspdf.umd.min.js');
  })();
  return _pdfLibs;
}
/* Inline SVG of the Cambridge English Scale / CEFR with a "you are here" marker. */
function cefrScaleSVG(scale, cefr){
  const W=720,H=560,topY=46,botY=512,minV=80,maxV=230;
  const yOf=v=>topY+(maxV-Math.max(minV,Math.min(maxV,v)))/(maxV-minV)*(botY-topY);
  const bands=[{cefr:'C1',lo:180,hi:230,c:'#7c6fd2'},
    {cefr:'B2',lo:160,hi:180,c:'#2d5a8d'},{cefr:'B1',lo:140,hi:160,c:'#4987c6'},
    {cefr:'A2',lo:120,hi:140,c:'#76cbe5'},{cefr:'A1',lo:100,hi:120,c:'#aebfd0'}];
  const quals=[{name:'A2 Key',lo:100,hi:150,c:'#76cbe5'},{name:'B1 Prelim.',lo:120,hi:170,c:'#4987c6'},
    {name:'B2 First',lo:140,hi:190,c:'#2d5a8d'},{name:'C1 Adv.',lo:160,hi:210,c:'#7c6fd2'}];
  const bandX=64,bandW=92;
  const bandRects=bands.map(b=>{const y=yOf(b.hi),h=yOf(b.lo)-yOf(b.hi);
    return `<rect x="${bandX}" y="${y}" width="${bandW}" height="${h}" fill="${b.c}" opacity="0.92"/><text x="${bandX+bandW/2}" y="${y+h/2+5}" text-anchor="middle" fill="#fff" font-weight="800" font-size="15">${b.cefr}</text>`;}).join('');
  const qBaseX=200,qW=64,qGap=22;
  const qBars=quals.map((q,i)=>{const x=qBaseX+i*(qW+qGap),y=yOf(q.hi),h=yOf(q.lo)-yOf(q.hi);
    return `<rect x="${x}" y="${y}" width="${qW}" height="${h}" rx="5" fill="${q.c}" opacity="0.85"/><text x="${x+qW/2}" y="${y-6}" text-anchor="middle" font-size="10" fill="#334155" font-weight="700">${q.name}</text>`;}).join('');
  const axisX=W-44; let ticks=`<line x1="${axisX}" y1="${yOf(230)}" x2="${axisX}" y2="${yOf(80)}" stroke="#cbd5e1"/>`;
  for(let v=80;v<=230;v+=10){const y=yOf(v);ticks+=`<line x1="${axisX-6}" y1="${y}" x2="${axisX}" y2="${y}" stroke="#94a3b8"/><text x="${axisX+5}" y="${y+4}" font-size="10" fill="#64748b">${v}</text>`;}
  let marker='';
  if(scale!=null){ const y=yOf(scale); const lblY=Math.max(topY+12, Math.min(botY-6, y));
    marker=`<line x1="${bandX-12}" y1="${y}" x2="${axisX}" y2="${y}" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/><circle cx="${axisX}" cy="${y}" r="6" fill="#dc2626"/><rect x="${qBaseX+95}" y="${lblY-32}" width="234" height="24" rx="6" fill="#dc2626"/><text x="${qBaseX+212}" y="${lblY-15}" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">● You are here · ${cefr} · ${scale}</text>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Montserrat,system-ui,sans-serif">
    <text x="${bandX+bandW/2}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">CEFR</text>
    <text x="${qBaseX+(quals.length*(qW+qGap))/2-qGap/2}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Cambridge English Qualifications</text>
    <text x="${axisX}" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Scale</text>
    ${bandRects}${qBars}${ticks}${marker}</svg>`;
}
/* Construye el HTML interior del reporte de resultados (compartido por el PDF y la
   vista en pantalla). opts.detail=true añade el detalle de la evaluación de Writing y Speaking. */
function _reportInner(p, at, sp, fin, EN, opts){
  at = at||[]; opts = opts||{};
  const tgt=targetLevel(p)||'B1'; const stt=targetStatus(fin.finalCefr, tgt);
  const T = EN ? {
    sub:'Nordic International School of Lima · Cambridge English · Results report',
    sectionW:'Section', objective:'Target level', cefr:'Common European Framework (CEFR)', scaleName:'Cambridge English Scale',
    s1:'1) Skills summary (best result)', s2:'2) Reading & Use of English detail (by part)', s3:'3) Overall result on the CEFR',
    hSkill:'Skill', hLevel:'Level', hScore:'Score', hPct:'%', hScale:'Scale', hProg:'Progress', hStatus:'Status',
    reading:'Reading & Use of English', listening:'Listening', writing:'Writing', speaking:'Speaking',
    part:'Part', oral:'Oral session', notHere:'Not in this cycle', pending:'Pending (teacher)', notTaken:'Not taken',
    incl:' (includes Writing)', inReading:'Included in Reading & Use of English (A2 Key)',
    finalLbl:'Final result', targetGrade:'Target level for the grade', scaleLbl:'Cambridge Scale',
    below:'▼ Below the target ('+tgt+')', meets:'✓ Meets the target ('+tgt+')', above:'▲ Above the target ('+tgt+')',
    gnote:'The final result is the average of the scales of the assessed skills (Reading & Use of English, Listening and Writing). Speaking is assessed in an oral session.',
    prov:'Provisional result', commentTitle:'A message for the family',
    sign:'— English Department · Nordic International School of Lima',
    foot:'Cambridge Scale — pass (~60%) lands at the level boundary; below that drops a band.' } : {
    sub:'Nordic International School of Lima · Cambridge English · Reporte de resultados',
    sectionW:'Sección', objective:'Objetivo del grado', cefr:'Marco Común Europeo', scaleName:'Cambridge English Scale',
    s1:'1) Resumen por destreza (mejor resultado)', s2:'2) Detalle de Reading & Use of English (por parte)', s3:'3) Resultado global según el Marco Común Europeo (CEFR)',
    hSkill:'Destreza', hLevel:'Nivel', hScore:'Puntaje', hPct:'%', hScale:'Esc.', hProg:'Progreso', hStatus:'Estado',
    reading:'Reading & Use of English', listening:'Listening', writing:'Writing', speaking:'Speaking',
    part:'Parte', oral:'Sesión oral', notHere:'No en este ciclo', pending:'Pendiente', notTaken:'No rindió',
    incl:' (incluye Writing)', inReading:'Incluido en Reading & Use of English (examen A2 Key)',
    finalLbl:'Resultado final', targetGrade:'Nivel objetivo del grado', scaleLbl:'Escala Cambridge',
    below:'▼ Por debajo del objetivo ('+tgt+')', meets:'✓ Cumple el objetivo ('+tgt+')', above:'▲ Por encima del objetivo ('+tgt+')',
    gnote:'El resultado final es el promedio de las escalas de las destrezas evaluadas (Reading & Use of English, Listening y Writing). Speaking se evalúa en sesión oral.',
    prov:'Resultado provisional', commentTitle:'Comentario para la familia',
    sign:'— English Department · Nordic International School of Lima',
    foot:'Escala Cambridge — aprobar (~60%) cae en el límite del nivel; por debajo baja de banda.' };
  const tier=(pc)=>{ if(pc==null)return['',''];
    if(pc>=80)return[EN?'High pass':'Aprobado alto','#16a34a'];
    if(pc>=60)return[EN?'Pass':'Aprobado','#16a34a'];
    if(pc>=40)return[EN?'Approaching':'Acercándose','#f59e0b'];
    return[EN?'Developing':'En desarrollo','#dc2626']; };
  const bar=(pc)=>{ if(pc==null)return '<div style="height:9px;background:#eef2f7;border-radius:99px"></div>';
    const c=pc>=60?'#16a34a':pc>=40?'#f59e0b':'#dc2626';
    return '<div style="height:9px;background:#e2e8f0;border-radius:99px;overflow:hidden"><div style="height:100%;width:'+Math.max(3,pc)+'%;background:'+c+'"></div></div>'; };
  const ba={};
  ['Reading','Listening','Writing'].forEach(sk=>{
    const rows=(at||[]).filter(a=>a.skill===sk&&a.percent!=null).map(a=>({a,pct:Number(a.percent),scale:skillScale(a.level,Number(a.percent))})).filter(x=>x.scale!=null);
    if(rows.length){ const ps=rows.filter(x=>x.pct>=50); ba[sk]=(ps.length?ps.reduce((b,x)=>x.scale>b.scale?x:b):rows.reduce((b,x)=>x.pct>b.pct?x:b)).a; }
  });
  const wAttAny=(at||[]).some(a=>a.skill==='Writing');
  const cs='padding:6px 8px;border:1px solid #e2e8f0;text-align:center;font-size:12px';
  const th='padding:7px 8px;border:1px solid #e2e8f0;font-size:12px;color:#fff';
  const skHead='<tr style="background:#4987c6"><th style="'+th+';text-align:left">'+T.hSkill+'</th><th style="'+th+'">'+T.hLevel+'</th><th style="'+th+'">CEFR</th><th style="'+th+'">'+T.hScore+'</th><th style="'+th+'">'+T.hPct+'</th><th style="'+th+'">'+T.hScale+'</th><th style="'+th+';width:120px">'+T.hProg+'</th><th style="'+th+'">'+T.hStatus+'</th></tr>';
  const skRow=(label,b,att,opt)=>{
    if(!b){ const m=(opt&&opt.pending)?T.pending:(opt&&opt.oral)?T.oral:T.notTaken;
      const est=(opt&&opt.oral)?T.notHere:(opt&&opt.pending)?T.pending:'-';
      return '<tr><td style="'+cs+';text-align:left">'+label+'</td><td style="'+cs+'">-</td><td style="'+cs+'">-</td><td style="'+cs+';color:#6b7280">'+m+'</td><td style="'+cs+'">-</td><td style="'+cs+'">-</td><td style="'+cs+'">'+bar(null)+'</td><td style="'+cs+';color:#6b7280">'+est+'</td></tr>'; }
    const t=tier(b.pct), sc=att?(att.score+'/'+att.total):'—';
    return '<tr><td style="'+cs+';text-align:left">'+label+'</td><td style="'+cs+'">'+b.level+'</td><td style="'+cs+';color:#2d5a8d;font-weight:800">'+esc(b.cefr)+'</td><td style="'+cs+'">'+sc+'</td><td style="'+cs+'"><b>'+b.pct+'%</b></td><td style="'+cs+'"><b>'+b.scale+'</b></td><td style="'+cs+'">'+bar(b.pct)+'</td><td style="'+cs+';color:'+t[1]+';font-weight:700">'+t[0]+'</td></tr>';
  };
  const rRow=skRow(T.reading+(fin.a2NoWriting?T.incl:''), fin.skills.Reading, ba['Reading']);
  const lRow=skRow(T.listening, fin.skills.Listening, ba['Listening']);
  const wRow=fin.a2NoWriting
    ? '<tr><td style="'+cs+';text-align:left">'+T.writing+'</td><td colspan="7" style="'+cs+';text-align:left;color:#6b7280">'+T.inReading+'</td></tr>'
    : skRow(T.writing, fin.skills.Writing, ba['Writing'], {pending: wAttAny && !fin.skills.Writing});
  const spRow=skRow(T.speaking, fin.skills.Speaking, null, {oral:true});
  const rParts = ba['Reading'] ? partsOf(ba['Reading'].breakdown) : [];
  let partsTbl='';
  if(rParts.length){
    partsTbl='<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:10px 0 4px">'+T.s2+'</div>'+
      '<table style="width:100%;border-collapse:collapse;margin-bottom:6px"><tr style="background:#76cbe5"><th style="'+cs+';text-align:left;color:#0f172a">'+T.part+'</th><th style="'+cs+'">%</th><th style="'+cs+';width:170px">'+T.hProg+'</th></tr>'+
      rParts.map((pt,i)=>'<tr><td style="'+cs+';text-align:left">'+T.part+' '+(i+1)+'</td><td style="'+cs+'"><b>'+pt.pct+'%</b></td><td style="'+cs+'">'+bar(pt.pct)+'</td></tr>').join('')+'</table>';
  }
  const stColor = stt==='below'?'#f59e0b':'#16a34a';
  const stBadge = stt==='below'?T.below:stt==='above'?T.above:stt==='meets'?T.meets:'';
  const globalBox='<div style="background:#f7faff;border:1.5px solid '+stColor+';border-radius:12px;padding:12px 16px;margin:2px 0 12px">'+
    '<div style="font-size:13px"><b>'+T.targetGrade+':</b> '+tgt+' &nbsp;•&nbsp; <b>'+T.finalLbl+':</b> <span style="color:#2f5f93;font-weight:800">'+esc(fin.finalCefr)+'</span> &nbsp;•&nbsp; <b>'+T.scaleLbl+':</b> '+(fin.finalScale!=null?fin.finalScale:'—')+' &nbsp;•&nbsp; <span style="color:'+stColor+';font-weight:800">'+stBadge+'</span></div>'+
    '<div style="font-size:11px;color:#6b7280;margin-top:5px">'+T.gnote+(fin.complete?'':' '+T.prov+'.')+'</div></div>';
  const SKL={Reading:T.reading,Listening:T.listening,Writing:T.writing,Speaking:T.speaking};
  const pres=Object.keys(fin.skills).filter(k=>fin.skills[k]);
  let strong='',weak='';
  if(pres.length){ strong=SKL[pres.reduce((b,k)=>fin.skills[k].scale>fin.skills[b].scale?k:b)]; weak=SKL[pres.reduce((b,k)=>fin.skills[k].scale<fin.skills[b].scale?k:b)]; }
  const first=(p.full_name||'').split(' ')[0]||'';
  const rank=CEFR_RANK[fin.finalCefr]||0, tg=CEFR_RANK[tgt]||3, fs=fin.finalScale||0;
  let msg; const noData=!pres.length;
  if(EN){
    if(noData) msg=first+', this first mock is a starting point. Let\'s keep practising together so you arrive well prepared and improve your results in the second mock in October. We are with you!';
    else if(rank>tg) msg=first+', you did good work in this first practice mock, especially in '+strong+'. Keep in mind this is practice, not the real exam yet: the next step is to keep training, particularly '+weak+', so you reach the second mock in October with even stronger results. Let\'s keep practising!';
    else if(rank>=tg) msg=first+', you are doing well in this first practice mock and you stand out in '+strong+'. There is still room to grow, so let\'s keep practising '+weak+' steadily to improve your result in the second mock in October. Keep it up!';
    else if(fs>=130) msg=first+', you are on the right track in this first practice mock, with good moments in '+strong+'. If you keep practising, especially '+weak+', you will arrive much better prepared for the second mock in October. We are here to support you!';
    else msg=first+', this first practice mock is a starting point and you already show progress in '+strong+'. Let\'s keep practising together, especially '+weak+', so you see clear progress in the second mock in October. Keep up the effort — we are with you!';
  } else {
    if(noData) msg=first+', este primer simulacro es un punto de partida. Sigamos practicando juntos para que llegues bien preparado y mejores tus resultados en el segundo simulacro de octubre. ¡Te acompañamos!';
    else if(rank>tg) msg=first+', hiciste un buen trabajo en este primer simulacro de práctica, sobre todo en '+strong+'. Ten presente que es una práctica, todavía no el examen real: el siguiente paso es seguir entrenando, especialmente '+weak+', para llegar al segundo simulacro de octubre con resultados aún mejores. ¡Sigamos practicando!';
    else if(rank>=tg) msg=first+', vas bien en este primer simulacro de práctica y destacas en '+strong+'. Aún hay margen para crecer, así que sigamos practicando '+weak+' con constancia para mejorar tu resultado en el segundo simulacro de octubre. ¡Continúa con ese esfuerzo!';
    else if(fs>=130) msg=first+', vas por buen camino en este primer simulacro de práctica, con buenos momentos en '+strong+'. Si sigues practicando, sobre todo '+weak+', llegarás mucho mejor preparado al segundo simulacro de octubre. ¡Cuentas con nosotros!';
    else msg=first+', este primer simulacro de práctica es un punto de partida y ya muestras avances en '+strong+'. Vamos a seguir practicando juntos, especialmente '+weak+', para que en el segundo simulacro de octubre veas un progreso claro. ¡Sigue esforzándote, te acompañamos!';
  }
  const commentBox='<div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin-top:4px">'+
    '<div style="font-size:12px;font-weight:800;color:#166534;margin-bottom:5px">'+T.commentTitle+'</div>'+
    '<div style="font-size:13px;color:#0f172a;line-height:1.5">'+msg+'</div>'+
    '<div style="font-size:12px;font-weight:800;color:#0f172a;margin-top:8px">'+T.sign+'</div></div>';

  // Detalle de la evaluación de Writing y Speaking (solo en la vista detallada en pantalla)
  let detail='';
  if(opts.detail){
    const dt = EN
      ? { wTitle:'Writing — assessment detail', spTitle:'Speaking — assessment detail', crit:'Criterion', band:'Band', fb:"Teacher's feedback" }
      : { wTitle:'Writing — detalle de la evaluación', spTitle:'Speaking — detalle de la evaluación', crit:'Criterio', band:'Banda', fb:'Comentario del profesor' };
    const critTbl=(parts)=>'<table style="width:100%;border-collapse:collapse;margin-bottom:4px"><tr style="background:#4987c6"><th style="'+th+';text-align:left">'+dt.crit+'</th><th style="'+th+'">'+dt.band+'</th></tr>'+
      parts.map(pt=>'<tr><td style="'+cs+';text-align:left">'+esc(pt.part)+'</td><td style="'+cs+'"><b>'+pt.correct+'</b> / '+pt.total+'</td></tr>').join('')+'</table>';
    const fbBox=(txt)=>'<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:8px 12px;font-size:12px;margin-bottom:8px"><b>'+dt.fb+':</b> '+esc(txt)+'</div>';
    const wb = ba['Writing'] && ba['Writing'].breakdown;
    if(wb && wb.kind==='writing-graded' && Array.isArray(wb.parts) && wb.parts.length){
      detail += '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:12px 0 4px">'+dt.wTitle+'</div>'+critTbl(wb.parts);
      if(wb.teacherMessage) detail += fbBox(wb.teacherMessage);
    }
    if(sp && sp.breakdown && Array.isArray(sp.breakdown.parts) && sp.breakdown.parts.length){
      detail += '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:12px 0 4px">'+dt.spTitle+'</div>'+critTbl(sp.breakdown.parts);
      if(sp.comment) detail += fbBox(sp.comment);
    }
  }

  return ''+
    '<img src="assets/logo-h.svg" width="150" height="28" style="width:150px;height:28px;display:block">'+
    '<div style="font-size:11px;color:#6b7280;margin:3px 0 10px">'+T.sub+'</div>'+
    '<div style="background:#2f5f93;color:#fff;border-radius:10px;padding:10px 14px;margin-bottom:12px">'+
      '<div style="font-size:20px;font-weight:800">'+esc(p.full_name||'')+'</div>'+
      '<div style="font-size:12px">'+esc(p.grades&&p.grades.name||'')+(p.section?' · '+T.sectionW+' '+esc(p.section):'')+' &nbsp;•&nbsp; '+T.objective+': <b>'+tgt+'</b> ('+T.cefr+') &nbsp;•&nbsp; '+T.scaleName+'</div>'+
    '</div>'+
    '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:6px 0 4px">'+T.s1+'</div>'+
    '<table style="width:100%;border-collapse:collapse;margin-bottom:4px">'+skHead+rRow+lRow+wRow+spRow+'</table>'+
    partsTbl+
    detail+
    '<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:8px 0 4px">'+T.s3+'</div>'+
    globalBox+ commentBox+
    '<div style="font-size:9px;color:#94a3b8;margin-top:10px">'+T.foot+' · build 74</div>';
}

/* Inyecta una sola vez el CSS que, al imprimir, oculta todo menos el reporte (#print-report). */
function _ensurePrintCss(){
  if(document.getElementById('nis-print-css')) return;
  const st=document.createElement('style'); st.id='nis-print-css';
  // Al imprimir (Ctrl+P): el reporte debe ocupar el ancho completo de la hoja
  // (sin el max-width:820px que lo desbordaba) y DEBE imprimir los colores de
  // fondo (barras de PROGRESO y badges) -> print-color-adjust:exact.
  st.textContent='@media print{'+
    'html,body{margin:0!important;padding:0!important;background:#fff!important}'+
    'body *{visibility:hidden!important}'+
    '#print-report,#print-report *{visibility:visible!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}'+
    '#print-report{position:absolute!important;left:0!important;top:0!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important}'+
    '.no-print{display:none!important}'+
    '@page{size:A4;margin:12mm}'+
  '}';
  document.head.appendChild(st);
}

/* Vista detallada en pantalla (profesor/admin al hacer clic en el nombre del alumno):
   notas por destreza + detalle del Writing/Speaking evaluado + impresión + descarga PDF. */
window.studentDetailReport = async (studentId, lang)=>{
  // sin idioma explícito, el del portal (botón 🌐); los dos botones del informe siguen forzándolo
  if(lang!=='es'&&lang!=='en') lang=(window.NISi18n&&window.NISi18n.lang()==='es')?'es':'en';
  const EN=lang==='en';
  _setNav('final');
  if($('#main')) $('#main').innerHTML='<div class="center muted">Loading…</div>';
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',studentId).single();
  if(error){ $('#main').innerHTML='<div class="note err">'+esc(error.message)+'</div>'; return; }
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,score,total,mock,submitted_at,breakdown').eq('student_id',studentId);
  let sp=null; try{ const r=await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle(); sp=r&&r.data; }catch(e){}
  const fin=_finalFromData(p, at||[], sp);
  _ensurePrintCss();
  const inner=_reportInner(p, at||[], sp, fin, EN, {detail:true});
  $('#main').innerHTML=
    '<div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px">'+
      '<button class="btn sm ghost" onclick="cefrFinalPanel()">← Back to final result</button>'+
      '<span style="width:1px;height:22px;background:var(--line)"></span>'+
      '<button class="btn sm '+(EN?'ghost':'')+'" onclick="studentDetailReport(\''+studentId+'\',\'es\')">🇪🇸 Español</button>'+
      '<button class="btn sm '+(EN?'':'ghost')+'" onclick="studentDetailReport(\''+studentId+'\',\'en\')">🇬🇧 English</button>'+
      '<span style="flex:1"></span>'+
      (fin.complete?'':'<span class="badge off" style="font-size:.7rem" title="Missing: '+esc(fin.missing.join(', '))+'">Provisional</span> ')+
      '<button class="btn sm" onclick="window.print()">🖨️ Print</button>'+
      '<button class="btn sm ghost" onclick="studentReportPDF(\''+studentId+'\',\''+lang+'\')">📄 Download PDF</button>'+
    '</div>'+
    '<div id="print-report" style="max-width:820px;margin:0 auto;padding:24px;border:1px solid var(--line);border-radius:12px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.08)">'+inner+'</div>';
  window.scrollTo(0,0);
};

window.studentReportPDF = async (studentId, lang)=>{
  lang = (lang==='en') ? 'en' : 'es';
  try{ await ensurePdfLibs(); }catch(e){ alert(e.message); return; }
  const { data:p, error } = await sb.from('profiles').select('id,full_name,email,section,cefr_level,grade_id,grades(name)').eq('id',studentId).single();
  if(error){ alert('Could not load the student: '+error.message); return; }
  const { data:at } = await sb.from('exam_attempts').select('id,skill,level,percent,score,total,mock,submitted_at,breakdown').eq('student_id',studentId);
  const { data:sp } = await sb.from('speaking_results').select('*').eq('student_id',studentId).maybeSingle();
  const fin=_finalFromData(p, at||[], sp);
  const EN = lang==='en';
  const fname=(p.full_name||'student').replace(/\s+/g,'_')+'-'+(EN?'EN':'ES')+'.pdf';
  // Nodo del reporte (ancho fijo 760px) en el origen del documento.
  const node=document.createElement('div');
  node.style.cssText='width:760px;padding:22px;font-family:Montserrat,system-ui,sans-serif;color:#0f172a;background:#fff';
  node.innerHTML=_reportInner(p, at||[], sp, fin, EN, {});
  const host=document.createElement('div');
  host.style.cssText='position:absolute;left:0;top:0;width:760px;background:#fff;z-index:-1';
  host.appendChild(node); document.body.appendChild(host);
  try{
    // El logo es un SVG SIN width/height (solo viewBox 569x107): html2canvas lo
    // renderiza a su tamaño intrínseco (~569px) y salía gigante. Lo rasterizamos a
    // un PNG del tamaño exacto antes de capturar.
    try{
      const logo=node.querySelector('img[src*="logo"]');
      if(logo){
        const r=await fetch('assets/logo-h.svg'); let svg=await r.text();
        svg=svg.replace(/<svg /i,'<svg width="300" height="57" ');
        const im=new Image();
        await new Promise((res,rej)=>{ im.onload=res; im.onerror=rej; setTimeout(rej,1500); im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg); });
        const c=document.createElement('canvas'); c.width=300; c.height=57;
        c.getContext('2d').drawImage(im,0,0,300,57);
        logo.src=c.toDataURL('image/png');
      }
    }catch(_){}
    await Promise.all(Array.from(node.querySelectorAll('img')).map(im=>im.complete?Promise.resolve():new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,1500);})));
    try{ if(document.fonts&&document.fonts.ready) await Promise.race([document.fonts.ready, new Promise(r=>setTimeout(r,1200))]); }catch(_){}
    // CLAVE: capturar el nodo DIRECTAMENTE con html2canvas (no via html2pdf, que
    // envolvía el nodo en un contenedor del ancho de la ventana → el reporte salía
    // encogido a la izquierda y cortado en ventanas reales). Así el lienzo siempre
    // es del ancho del nodo (760), sin importar el ancho ni el scroll de la página.
    const canvas=await window.html2canvas(node,{scale:2,useCORS:true,backgroundColor:'#ffffff',scrollX:0,scrollY:0,windowWidth:Math.max(760,document.documentElement.scrollWidth),windowHeight:document.documentElement.scrollHeight});
    const { jsPDF }=window.jspdf;
    const pdf=new jsPDF({unit:'mm',format:'a4',orientation:'portrait'});
    const margin=8, pw=210, ph=297, iw=pw-2*margin, pageContentH=ph-2*margin;
    const pxPerMM=canvas.width/iw;                       // px de lienzo por mm
    const fullImgH=canvas.height/pxPerMM;                // alto total en mm
    if(fullImgH<=pageContentH+0.5){
      pdf.addImage(canvas.toDataURL('image/jpeg',0.95),'JPEG',margin,margin,iw,fullImgH);
    } else {
      const pageHpx=Math.floor(pageContentH*pxPerMM);    // px de lienzo por hoja
      let y=0, first=true;
      while(y<canvas.height){
        const sliceH=Math.min(pageHpx, canvas.height-y);
        const sc=document.createElement('canvas'); sc.width=canvas.width; sc.height=sliceH;
        sc.getContext('2d').drawImage(canvas,0,y,canvas.width,sliceH,0,0,canvas.width,sliceH);
        if(!first) pdf.addPage();
        pdf.addImage(sc.toDataURL('image/jpeg',0.95),'JPEG',margin,margin,iw,sliceH/pxPerMM);
        y+=sliceH; first=false;
      }
    }
    pdf.save(fname);
  }catch(e){ alert('Could not generate the PDF: '+(e&&e.message||e)); }
  finally{ host.remove(); }
};