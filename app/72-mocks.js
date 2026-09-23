

/* ===================== CICLOS DE MOCK · MOCK 1 / MOCK 2 (21-sep-2026) =====================
   El colegio rinde dos simulacros al año y cada uno cierra con UN informe a la
   familia. exam_attempts guarda el NUMERO DE BANCO del motor (mock1, mock2,
   mock3…), no el ordinal del colegio, así que el ciclo se decide aquí:
     · ciclo 2 = intentos en mock mode (breakdown.mock_mode, el Official Mock 2
       del 22-sep-2026 y los individuales que se rindan después) o del banco
       mock3 desde esa fecha;
     · ciclo 1 = todo lo anterior al 22-sep (mocks y practice): exactamente lo
       que 🎓 Final result venía mostrando, ahora congelado como MOCK 1;
     · practice posterior al corte no pertenece a ningún ciclo.
   Speaking va por ciclo en la base (speaking_results.cycle). Lo que el alumno
   ve depende de mock_cycles.released_at: sin fecha, nada de ese ciclo. */
const MOCK_CUTOFF = '2026-09-22T05:00:00.000Z';   // medianoche de Lima del 22-sep-2026
const MOCK_CYCLE_META = {
  1: { label:'MOCK 1', when:'June 2026',      whenEs:'junio de 2026',      bank:null },
  2: { label:'MOCK 2', when:'September 2026', whenEs:'septiembre de 2026', bank:'mock3' }
};
function mockCycleOf(a){
  if(!a) return null;
  if(a.breakdown && a.breakdown.mock_mode) return 2;
  if((a.submitted_at||'') >= MOCK_CUTOFF) return (isMockAttempt(a) && a.mock===MOCK_CYCLE_META[2].bank) ? 2 : null;
  return 1;
}
function mockCycleAttempts(atts, c){ return (atts||[]).filter(a=>mockCycleOf(a)===c); }
function mockSpeakingOf(rows, c){
  if(!rows) return null;
  if(!Array.isArray(rows)) rows=[rows];
  return rows.find(r=>Number(r.cycle||1)===c) || null;
}
/* Nivel en que rindió el ciclo: el de sus papers oficiales (todos van al mismo). */
function mockLevelSat(atts){
  const lv = (atts||[]).map(a=>a.level).filter(Boolean);
  if(!lv.length) return null;
  const n={}; lv.forEach(l=>{ n[l]=(n[l]||0)+1; });
  return Object.keys(n).sort((x,y)=>n[y]-n[x])[0];
}
/* Resultado del ciclo con la MISMA forma que _finalFromData (skills, finalScale,
   finalCefr, complete, missing…). Ciclo 1 = _finalFromData tal cual (con los
   ajustes de docente que se pactaron para los informes de junio). Ciclo 2 = el
   examen oficial: por destreza cuenta el intento oficial más reciente, sin
   ajustes manuales; el A2 Key no tiene Writing aparte. */
function mockCycleFinal(profile, atts, spk, cycle){
  if(cycle!==2) return _finalFromData(profile, atts, spk);
  const level = mockLevelSat(atts);
  const pick = (sk)=>{
    const a=(atts||[]).filter(x=>x.skill===sk && x.percent!=null).sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||''))[0];
    if(!a) return null;
    const sc=skillScale(a.level, Number(a.percent));
    return { scale:sc, cefr:scaleToCefr(sc), level:a.level, pct:Math.round(Number(a.percent)), source:mockLabel(a), passed:Number(a.percent)>=PASS_MIN, attemptId:a.id };
  };
  const Reading=pick('Reading'), Listening=pick('Listening'), Writing=pick('Writing');
  let Speaking=null;
  if(spk && spk.percent!=null){
    const lvl=spk.level||level||'B1', sc=skillScale(lvl, Number(spk.percent));
    Speaking={ scale:sc, cefr:scaleToCefr(sc), level:lvl, pct:Math.round(Number(spk.percent)), source:'Rubric' };
  }
  const isA2 = level==='A2';
  const a2NoWriting = isA2 && !(atts||[]).some(a=>a.skill==='Writing');
  const skills = a2NoWriting ? { Reading, Listening, Speaking } : { Reading, Listening, Writing, Speaking };
  const present = Object.values(skills).filter(Boolean);
  let finalScale = present.length ? Math.round(present.reduce((s,x)=>s+x.scale,0)/present.length) : null;
  if(finalScale!=null){
    const lows = present.filter(x=>x.pct!=null && Number(x.pct)<50).length;
    const ceil = lows>=2 ? 159 : (lows>=1 ? 179 : null);
    if(ceil!=null && finalScale>ceil) finalScale = ceil;
  }
  const labels = { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' };
  // Speaking no se rinde el día del mock: cuenta si se evaluó, pero no hace falta para cerrar el informe.
  const requiredKeys = a2NoWriting ? ['Reading','Listening'] : ['Reading','Listening','Writing'];
  const wPending = !a2NoWriting && (atts||[]).some(a=>a.skill==='Writing' && a.percent==null);
  return { profile, skills, isA2, a2NoWriting, level, finalScale, finalCefr:scaleToCefr(finalScale), cycle:2,
           complete: requiredKeys.every(k=>skills[k]), missing: requiredKeys.filter(k=>!skills[k]).map(k=>labels[k]), writingPending:wPending };
}
/* ¿Apto para rendir el examen del nivel que presentó? La escala media del ciclo
   contra el límite del nivel (aprobar ≈ 60 % = SCALE_BOUNDARY). A menos de 10
   puntos por debajo, «en el límite». Es una recomendación: la decide el docente. */
function mockReadiness(fin, level){
  level = level || (fin && fin.level);
  if(!fin || fin.finalScale==null || !level || !SCALE_BOUNDARY[level]) return null;
  const B=SCALE_BOUNDARY[level], s=fin.finalScale;
  return { k: s>=B ? 'ready' : (s>=B-10 ? 'borderline' : 'notyet'), level, scale:s, boundary:B, gap:s-B, provisional:!fin.complete };
}
const LEVEL_EXAM = { A2:'A2 Key', B1:'B1 Preliminary', B2:'B2 First', C1:'C1 Advanced' };
function readinessLabel(r, EN){
  if(!r) return '';
  const ex = LEVEL_EXAM[r.level]||r.level;
  if(EN) return r.k==='ready' ? '✓ Ready to sit '+ex : r.k==='borderline' ? '≈ Borderline for '+ex : '✗ Not yet ready for '+ex;
  return r.k==='ready' ? '✓ Apto para rendir '+ex : r.k==='borderline' ? '≈ En el límite para '+ex : '✗ Aún no apto para '+ex;
}
function readinessColor(r){ return !r ? '#94a3b8' : r.k==='ready' ? '#16a34a' : r.k==='borderline' ? '#f59e0b' : '#dc2626'; }
function readinessChip(r, EN){
  if(!r) return '<span class="muted">—</span>';
  const t = EN ? (r.k==='ready'?'✓ Ready':r.k==='borderline'?'≈ Borderline':'✗ Not yet') : (r.k==='ready'?'✓ Apto':r.k==='borderline'?'≈ Límite':'✗ Aún no');
  return `<span class="badge" style="background:${readinessColor(r)};color:#fff;font-size:.74rem" title="${esc(readinessLabel(r,EN))} · scale ${r.scale} vs ${r.boundary}">${t}${r.provisional?' <small>prov.</small>':''}</span>`;
}

/* ---- mock_cycles: etiqueta, fecha y si el alumno ya puede ver ese ciclo ---- */
let _mockCyclesCache=null;
async function mockCyclesInfo(force){
  if(_mockCyclesCache && !force) return _mockCyclesCache;
  try{ const { data } = await sb.from('mock_cycles').select('*').order('cycle'); _mockCyclesCache = data||[]; }
  catch(e){ _mockCyclesCache=[]; }
  return _mockCyclesCache;
}
async function mockReleased(cycle){ const rows=await mockCyclesInfo(); const r=rows.find(x=>Number(x.cycle)===cycle); return !!(r && r.released_at); }
/* El último ciclo liberado (lo que ve el alumno y la familia). */
async function mockLatestReleased(){ const rows=await mockCyclesInfo(); const rel=rows.filter(x=>x.released_at).map(x=>Number(x.cycle)); return rel.length?Math.max(...rel):1; }
/* Lo que el alumno puede ver de sus intentos: nada de un ciclo no liberado. */
async function mockVisibleAttempts(atts){
  const rows=await mockCyclesInfo(); const hidden=new Set(rows.filter(x=>!x.released_at).map(x=>Number(x.cycle)));
  return (atts||[]).filter(a=>!hidden.has(mockCycleOf(a)));
}

/* ---- extras del informe a la familia del ciclo 2: comparativa con el MOCK 1 y aptitud ---- */
function _mockReportExtras(p, fin, prev, EN){
  const level = fin.level || mockLevelSat([]);
  const rd = mockReadiness(fin, level);
  const ex = LEVEL_EXAM[level]||level||'';
  const SK = EN ? { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' }
               : { Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing', Speaking:'Speaking' };
  const T = EN ? { sub:'Nordic International School of Lima · Cambridge English · Official Mock 2 · Results report',
                   cmp:'4) Comparison with Mock 1 (June 2026)', skill:'Skill', m1:'Mock 1', m2:'Mock 2', delta:'Change', none:'—',
                   rdy:'5) Readiness for the exam', rdyNote:'Pass mark on the Cambridge Scale for '+ex+': '+(SCALE_BOUNDARY[level]||'—')+'. Result: ', prov:' (provisional: some papers are still being marked)' }
               : { sub:'Nordic International School of Lima · Cambridge English · Official Mock 2 · Reporte de resultados',
                   cmp:'4) Comparación con el Mock 1 (junio de 2026)', skill:'Destreza', m1:'Mock 1', m2:'Mock 2', delta:'Cambio', none:'—',
                   rdy:'5) Aptitud para rendir el examen', rdyNote:'Escala Cambridge de aprobación para '+ex+': '+(SCALE_BOUNDARY[level]||'—')+'. Resultado: ', prov:' (provisional: aún hay papers por corregir)' };
  const cs='padding:6px 8px;border:1px solid #e2e8f0;text-align:center;font-size:12px';
  const th='padding:7px 8px;border:1px solid #e2e8f0;font-size:12px;color:#fff';
  const cell=(b)=> b ? '<b>'+esc(b.cefr)+'</b> · '+b.scale+' <span style="color:#6b7280">('+b.level+' · '+b.pct+'%)</span>' : T.none;
  const dcell=(a,b)=>{ if(!a||!b) return T.none; const d=b.scale-a.scale; const c=d>0?'#16a34a':d<0?'#dc2626':'#6b7280'; return '<b style="color:'+c+'">'+(d>0?'▲ +':d<0?'▼ ':'= ')+d+'</b>'; };
  let html='';
  if(prev && prev.finalScale!=null){
    const keys=['Reading','Listening','Writing','Speaking'].filter(k=>(prev.skills&&prev.skills[k])||(fin.skills&&fin.skills[k]));
    html+='<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:10px 0 4px">'+T.cmp+'</div>'+
      '<table style="width:100%;border-collapse:collapse;margin-bottom:6px"><tr style="background:#4987c6"><th style="'+th+';text-align:left">'+T.skill+'</th><th style="'+th+'">'+T.m1+'</th><th style="'+th+'">'+T.m2+'</th><th style="'+th+'">'+T.delta+'</th></tr>'+
      keys.map(k=>'<tr><td style="'+cs+';text-align:left">'+SK[k]+'</td><td style="'+cs+'">'+cell(prev.skills[k])+'</td><td style="'+cs+'">'+cell(fin.skills[k])+'</td><td style="'+cs+'">'+dcell(prev.skills[k],fin.skills[k])+'</td></tr>').join('')+
      '<tr style="background:#f7faff"><td style="'+cs+';text-align:left"><b>'+(EN?'Overall':'Global')+'</b></td><td style="'+cs+'"><b>'+esc(prev.finalCefr)+'</b> · '+prev.finalScale+'</td><td style="'+cs+'"><b>'+esc(fin.finalCefr)+'</b> · '+(fin.finalScale!=null?fin.finalScale:'—')+'</td><td style="'+cs+'">'+dcell({scale:prev.finalScale},fin.finalScale!=null?{scale:fin.finalScale}:null)+'</td></tr></table>';
  }
  if(rd){
    html+='<div style="font-size:13px;font-weight:800;color:#2f5f93;margin:10px 0 4px">'+T.rdy+'</div>'+
      '<div style="background:#fff;border:1.5px solid '+readinessColor(rd)+';border-radius:12px;padding:10px 14px;margin:2px 0 8px">'+
      '<div style="font-size:14px;font-weight:800;color:'+readinessColor(rd)+'">'+esc(readinessLabel(rd,EN))+'</div>'+
      '<div style="font-size:11px;color:#6b7280;margin-top:4px">'+T.rdyNote+'<b>'+rd.scale+'</b> ('+(rd.gap>=0?'+':'')+rd.gap+')'+(rd.provisional?T.prov:'')+'</div></div>';
  }
  // Mensaje a la familia
  const first=(p.full_name||'').split(' ')[0]||'';
  const pres=Object.keys(fin.skills||{}).filter(k=>fin.skills[k]);
  let strong='',weak='';
  if(pres.length){ strong=SK[pres.reduce((b,k)=>fin.skills[k].scale>fin.skills[b].scale?k:b)]; weak=SK[pres.reduce((b,k)=>fin.skills[k].scale<fin.skills[b].scale?k:b)]; }
  const up = prev && prev.finalScale!=null && fin.finalScale!=null ? fin.finalScale-prev.finalScale : null;
  let msg;
  if(EN){
    const trend = up==null ? '' : up>0 ? ' You have gone up '+up+' point'+(up===1?'':'s')+' on the Cambridge Scale since June.' : up<0 ? ' Your overall scale is '+(-up)+' point'+(up===-1?'':'s')+' below June: exam-day nerves count too, and we will look at it together.' : ' Your overall result is the same as in June.';
    if(!pres.length) msg=first+', we do not have your Official Mock 2 results yet. Your teacher will let you know how to complete the missing papers.';
    else if(!rd) msg=first+', here are your Official Mock 2 results. You stand out in '+strong+'; let\'s keep working on '+weak+'.'+trend;
    else if(rd.k==='ready') msg=first+', congratulations: your Official Mock 2 result shows you are ready to sit '+ex+'. You stand out in '+strong+'.'+trend+' Keep practising '+weak+' until the exam so you arrive in top form.';
    else if(rd.k==='borderline') msg=first+', you are very close to the pass mark for '+ex+' ('+rd.scale+' on the Cambridge Scale; '+rd.boundary+' is needed).'+trend+' With focused practice in '+weak+' over the coming weeks you can make it; your teacher will confirm your readiness before registration.';
    else msg=first+', your Official Mock 2 result shows you are not yet ready to sit '+ex+' ('+rd.scale+' on the Cambridge Scale; '+rd.boundary+' is needed).'+trend+' We recommend consolidating '+weak+' before registering, and your teacher will advise on the best level and date. Your effort in '+strong+' shows what you can do.';
  } else {
    const trend = up==null ? '' : up>0 ? ' Has subido '+up+' punto'+(up===1?'':'s')+' en la Escala Cambridge desde junio.' : up<0 ? ' Tu escala global está '+(-up)+' punto'+(up===-1?'':'s')+' por debajo de junio: los nervios del día también cuentan, y lo revisaremos juntos.' : ' Tu resultado global es el mismo que en junio.';
    if(!pres.length) msg=first+', todavía no tenemos tus resultados del Official Mock 2. Tu profesor te indicará cómo completar los papers que faltan.';
    else if(!rd) msg=first+', estos son tus resultados del Official Mock 2. Destacas en '+strong+'; sigamos trabajando '+weak+'.'+trend;
    else if(rd.k==='ready') msg=first+', ¡felicitaciones! Tu resultado en el Official Mock 2 muestra que estás apto para rendir '+ex+'. Destacas en '+strong+'.'+trend+' Sigue practicando '+weak+' hasta el examen para llegar en tu mejor momento.';
    else if(rd.k==='borderline') msg=first+', estás muy cerca de la nota de aprobación de '+ex+' ('+rd.scale+' en la Escala Cambridge; se necesita '+rd.boundary+').'+trend+' Con práctica enfocada en '+weak+' en las próximas semanas puedes lograrlo; tu profesor confirmará tu aptitud antes de la inscripción.';
    else msg=first+', tu resultado en el Official Mock 2 muestra que aún no estás apto para rendir '+ex+' ('+rd.scale+' en la Escala Cambridge; se necesita '+rd.boundary+').'+trend+' Recomendamos consolidar '+weak+' antes de inscribirte; tu profesor orientará sobre el nivel y la fecha más convenientes. Tu esfuerzo en '+strong+' muestra lo que puedes lograr.';
  }
  return { sub:T.sub, msg, html, readiness:rd };
}
window._mockReportExtras=_mockReportExtras;

/* ===================== PESTAÑA ✅ MARKING → 📝 MOCK 2 ===================== */
let mock2Filter = { grade:'', section:'', name:'' };
async function mock2Panel(){
  state._tab='mock2';
  if($('#main')) $('#main').innerHTML='<div class="center muted">Loading…</div>';
  const isTeacher = state.profile && state.profile.role==='teacher';
  const isAdmin = state.profile && state.profile.role==='admin';
  const gradeList = (isTeacher ? teacherAllowedGrades() : GRADES).filter(g=>g.id>=6);
  const allowed = gradeList.map(g=>g.id);
  const cyc = (await mockCyclesInfo(true)).find(x=>Number(x.cycle)===2) || {};
  const { data:studentsRaw, error } = await sb.from('profiles')
    .select('id,full_name,section,cefr_level,grade_id,active,is_demo,grades(name)').eq('role','student');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  let students=(studentsRaw||[]).filter(s=>allowed.includes(s.grade_id) && s.active!==false && !s.is_demo);
  const f=mock2Filter;
  if(f.grade)   students=students.filter(s=>String(s.grade_id)===String(f.grade));
  if(f.section) students=students.filter(s=>(s.section||'').toUpperCase()===f.section.toUpperCase());
  if(f.name)    students=students.filter(s=>(s.full_name||'').toLowerCase().includes(f.name.toLowerCase()));
  students.sort((a,b)=>(a.grade_id-b.grade_id)||(a.section||'').localeCompare(b.section||'')||(a.full_name||'').localeCompare(b.full_name||''));
  const ids=students.map(s=>s.id); const safeIds=ids.length?ids:['00000000-0000-0000-0000-000000000000'];
  const { data:atts } = await sb.from('exam_attempts').select('id,student_id,skill,level,percent,score,total,mock,submitted_at,breakdown').in('student_id',safeIds).limit(8000);
  const { data:spks } = await sb.from('speaking_results').select('*').in('student_id',safeIds);
  const aBy={}; (atts||[]).forEach(a=>{(aBy[a.student_id]=aBy[a.student_id]||[]).push(a);});
  const sBy={}; (spks||[]).forEach(s=>{(sBy[s.student_id]=sBy[s.student_id]||[]).push(s);});
  const lang=(window.NISi18n&&window.NISi18n.lang()==='es')?'es':'en', EN=lang==='en';

  let nSat=0, wPend=0, wDone=0, missing=0, ready=0, border=0, notyet=0;
  const cell=(b,att,pendingHtml)=> b ? `<b style="color:#2d5a8d">${esc(b.cefr)}</b> <span class="muted" style="font-size:.78rem">${b.scale} · ${b.pct}%</span>` : (pendingHtml||'<span class="muted">—</span>');
  const rows=students.map(s=>{
    const all=aBy[s.id]||[], a2=mockCycleAttempts(all,2), a1=mockCycleAttempts(all,1);
    const fin2=mockCycleFinal(s, a2, mockSpeakingOf(sBy[s.id],2), 2);
    const fin1=mockCycleFinal(s, a1, mockSpeakingOf(sBy[s.id],1), 1);
    const level=fin2.level;
    const sat=a2.length>0; if(sat) nSat++;
    const wAtt=a2.filter(a=>a.skill==='Writing').sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||''))[0];
    if(wAtt){ if(wAtt.percent!=null) wDone++; else wPend++; }
    if(sat && !fin2.complete) missing++;
    const rd=mockReadiness(fin2, level);
    if(rd && fin2.complete){ if(rd.k==='ready') ready++; else if(rd.k==='borderline') border++; else notyet++; }
    const wCell = fin2.a2NoWriting ? '<span class="muted" style="font-size:.78rem" title="A2 Key: Parts 6–7 were not saved with this Reading paper">— in Reading</span>'
      : fin2.skills.Writing ? `${cell(fin2.skills.Writing)} <button class="btn sm ghost" style="padding:2px 7px" onclick="gradeWriting('${wAtt.id}',{back:'mock2',quiet:true})" title="Edit grade">✎</button>`
      : wAtt ? `<button class="btn sm" onclick="gradeWriting('${wAtt.id}',{back:'mock2',quiet:true})">✍️ Mark</button>`
      : (sat ? '<span class="badge off" style="font-size:.7rem">no paper</span>' : '<span class="muted">—</span>');
    const spkLvl=(fin2.skills.Speaking&&fin2.skills.Speaking.level)||level||targetLevel(s)||'B1';
    const sCell = fin2.skills.Speaking
      ? `${cell(fin2.skills.Speaking)} <button class="btn sm ghost" style="padding:2px 7px" onclick="speakingGrader('${s.id}','${spkLvl}',{cycle:2,back:'mock2'})">✎</button>`
      : `<button class="btn sm ghost" onclick="speakingGrader('${s.id}','${spkLvl}',{cycle:2,back:'mock2'})">🗣️ Mark</button>`;
    const fin2Badge = fin2.finalScale!=null
      ? `<span class="badge lvl" style="font-size:.92rem">${esc(fin2.finalCefr)} · ${fin2.finalScale}</span>${fin2.complete?'':' <span class="badge off" style="font-size:.66rem" title="Missing: '+esc(fin2.missing.join(', '))+'">prov.</span>'}`
      : (sat ? '<span class="muted">…</span>' : '<span class="badge off" style="font-size:.7rem">absent</span>');
    const fin1Badge = fin1.finalScale!=null ? `<span class="badge lvl" style="font-size:.85rem;opacity:.85">${esc(fin1.finalCefr)} · ${fin1.finalScale}</span>` : '<span class="muted">—</span>';
    const d = (fin1.finalScale!=null && fin2.finalScale!=null) ? fin2.finalScale-fin1.finalScale : null;
    const dCell = d==null ? '<span class="muted">—</span>' : `<b style="color:${d>0?'#16a34a':d<0?'#dc2626':'#6b7280'}">${d>0?'▲ +':d<0?'▼ ':'= '}${d}</b>`;
    return `<tr data-sname="${esc((s.full_name||'').toLowerCase())}">
      <td><a href="#" onclick="event.preventDefault();studentDetailReport('${s.id}','${lang}',2)" title="Mock 2 report" style="color:#2d5a8d;font-weight:700;text-decoration:none">${esc(s.full_name||'')}</a></td>
      <td><span class="badge grade">${esc(s.grades?.name||'—')}</span> ${s.section?esc(s.section):''}</td>
      <td>${level?`<span class="badge lvl">${esc(level)}</span>`:'<span class="muted">—</span>'}</td>
      <td>${cell(fin2.skills.Reading)}</td>
      <td>${cell(fin2.skills.Listening)}</td>
      <td>${wCell}</td>
      <td style="white-space:nowrap">${sCell}</td>
      <td>${fin2Badge}</td>
      <td>${fin1Badge}</td>
      <td>${dCell}</td>
      <td>${sat ? readinessChip(rd,EN) : '<span class="muted">—</span>'}</td>
      <td class="acts"><div class="acts-wrap"><button class="btn sm" onclick="studentReportPDF('${s.id}','es',2)">📄 ES</button><button class="btn sm ghost" onclick="studentReportPDF('${s.id}','en',2)">📄 EN</button></div></td>
    </tr>`;
  }).join('');

  const rel = cyc.released_at ? new Date(cyc.released_at).toLocaleDateString() : null;
  const relBox = `<div class="card" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 14px;margin-bottom:10px;border-left:4px solid ${rel?'#16a34a':'#f59e0b'}">
      <b>${rel ? '📣 Results released to students on '+rel : '🔒 Results NOT released to students yet'}</b>
      <span class="muted" style="font-size:.85rem">${rel ? 'Students and families see this Mock 2 report in the portal.' : 'Students see nothing from Mock 2 (no scores, no emails) until you release the single report.'}</span>
      ${isAdmin ? `<span style="flex:1"></span><button class="btn sm ${rel?'ghost':''}" onclick="window._mockRelease(2,${rel?'false':'true'})">${rel?'🔒 Hide again':'📣 Release results to students'}</button>` : ''}
    </div>`;
  const chips = `<div class="row" style="gap:8px;flex-wrap:wrap;margin:0 0 10px">
      <span class="badge">${nSat} / ${students.length} sat the mock</span>
      <span class="badge ${wPend?'off':'on'}">✍️ Writings: ${wDone} marked · ${wPend} pending</span>
      <span class="badge ${missing?'off':''}">${missing} with papers missing</span>
      <span class="badge" style="background:#16a34a;color:#fff">✓ ready ${ready}</span><span class="badge" style="background:#f59e0b;color:#fff">≈ borderline ${border}</span><span class="badge" style="background:#dc2626;color:#fff">✗ not yet ${notyet}</span>
    </div>`;
  const gradeOpts=`<option value="">All grades</option>`+gradeList.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const filter=`<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:12px 16px;margin-bottom:10px">
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADE</label><select onchange="window._setMock2Filter('grade',this.value)" style="min-width:130px">${gradeOpts}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">SECTION</label><select onchange="window._setMock2Filter('section',this.value)" style="min-width:90px"><option value="">All</option>${['A','B'].map(s=>`<option ${f.section===s?'selected':''}>${s}</option>`).join('')}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">NAME</label><input type="text" placeholder="Search student…" value="${esc(f.name)}" oninput="window._liveNameFilter(this.value)" style="min-width:180px"></div>
      ${(f.grade||f.section||f.name)?`<button class="btn sm ghost" onclick="window._setMock2Filter('_clear','')">✕ Clear</button>`:''}
    </div>`;
  $('#main').innerHTML=`
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h1 style="margin:0 0 4px">📝 MOCK 2 · Official Mock 2 — 22 September 2026</h1>
      <button class="btn sm ghost" onclick="mock2Stats()">📊 Papers by exercise &amp; time</button>
    </div>
    <p class="muted" style="margin-top:0;font-size:.88rem">Every paper sat in mock mode (bank MOCK 3), by student. <b>Reading</b> and <b>Listening</b> are auto-scored; <b>Writing</b> is marked here with the Cambridge rubric (0–5 per criterion, two tasks) — no email goes out, the grade goes into the single report. In <b>A2 Key</b> the two writing tasks (Parts 6–7 of the Reading &amp; Writing paper) appear in the Writing column, ready to mark. <b>Speaking</b> is optional (oral session). <b>Mock 2</b> = average of the scales of the assessed skills; <b>Mock 1</b> = the June result (🎓 MOCK 1 tab); <b>Δ</b> = change on the Cambridge Scale; <b>Ready?</b> = scale vs. the pass mark of the level sat (A2 120 · B1 140 · B2 160 · C1 180; within 10 points below = borderline). The teacher has the final word.</p>
    ${relBox}${chips}${filter}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Student</th><th>Grade</th><th>Level</th><th>Reading &amp; UoE</th><th>Listening</th><th>Writing</th><th>Speaking</th><th>Mock 2</th><th>Mock 1</th><th>Δ</th><th>Ready?</th><th></th></tr></thead>
      <tbody>${rows||`<tr><td colspan="12" class="center muted">No students for this filter.</td></tr>`}</tbody>
    </table><div id="resCount" data-noun="student(s)" class="muted" style="padding:8px 14px;font-size:.82rem">${students.length} student(s)</div></div>`;
}
window.mock2Panel=mock2Panel;
window._setMock2Filter=(k,v)=>{ if(k==='_clear') mock2Filter={grade:'',section:'',name:''}; else mock2Filter[k]=v; mock2Panel(); };
window._mockRelease=async (cycle,on)=>{
  const q = on ? 'Release the Mock '+cycle+' results to students and families now? They will see their report in the portal.' : 'Hide the Mock '+cycle+' results from students again?';
  const ok = window.NISUI && NISUI.pregunta ? await NISUI.pregunta(q) : confirm(q);
  if(!ok) return;
  const { error } = await sb.from('mock_cycles').update({ released_at: on ? new Date().toISOString() : null, released_by: on ? (state.profile&&state.profile.id)||null : null }).eq('cycle',cycle);
  if(error){ alert('Could not save: '+error.message); return; }
  await mockCyclesInfo(true); mock2Panel();
};

/* ===================== 📊 MOCK 2 · PAPERS BY EXERCISE & TIME (22-sep-2026) =====================
   Pedido de Paolo la tarde del Official Mock 2: el detalle de cada paper por ejercicio
   (parte) y el tiempo que tomó, y después la estadística global por nivel. El motor solo
   guarda el tiempo por paper (duration_min), no por parte; el Writing no guarda tiempo. */
let mock2StatsFilter = { level:'', skill:'' };
let _mock2StatsCsv = [];
function _avg1(arr){ return arr.length ? Math.round(arr.reduce((s,x)=>s+x,0)/arr.length*10)/10 : null; }
function _median(arr){ if(!arr.length) return null; const s=[...arr].sort((a,b)=>a-b), m=Math.floor(s.length/2); return s.length%2 ? s[m] : Math.round((s[m-1]+s[m])/2); }
function _pctColor(p){ return p==null ? 'var(--muted)' : p>=70 ? 'var(--good)' : p>=50 ? 'var(--warn)' : 'var(--bad)'; }
async function mock2Stats(){
  state._tab='mock2';
  if($('#main')) $('#main').innerHTML='<div class="center muted">Loading…</div>';
  const isTeacher = state.profile && state.profile.role==='teacher';
  const gradeList = (isTeacher ? teacherAllowedGrades() : GRADES).filter(g=>g.id>=6);
  const allowed = gradeList.map(g=>g.id);
  const { data:studentsRaw, error } = await sb.from('profiles')
    .select('id,full_name,section,cefr_level,grade_id,active,is_demo,grades(name)').eq('role','student');
  if(error){ $('#main').innerHTML=`<div class="note err">${esc(error.message)}</div>`; return; }
  const f=mock2Filter, sf=mock2StatsFilter;
  let students=(studentsRaw||[]).filter(s=>allowed.includes(s.grade_id) && s.active!==false && !s.is_demo);
  if(f.grade)   students=students.filter(s=>String(s.grade_id)===String(f.grade));
  if(f.section) students=students.filter(s=>(s.section||'').toUpperCase()===f.section.toUpperCase());
  if(f.name)    students=students.filter(s=>(s.full_name||'').toLowerCase().includes(f.name.toLowerCase()));
  students.sort((a,b)=>(a.grade_id-b.grade_id)||(a.section||'').localeCompare(b.section||'')||(a.full_name||'').localeCompare(b.full_name||''));
  const byId={}; students.forEach(s=>{ byId[s.id]=s; });
  const ids=students.map(s=>s.id); const safeIds=ids.length?ids:['00000000-0000-0000-0000-000000000000'];
  const { data:atts } = await sb.from('exam_attempts').select('id,student_id,skill,level,percent,score,total,mock,submitted_at,duration_min,breakdown').in('student_id',safeIds).limit(8000);
  const { data:spks } = await sb.from('speaking_results').select('*').in('student_id',safeIds);
  const c2=(atts||[]).filter(a=>byId[a.student_id] && mockCycleOf(a)===2);
  const aBy={}; c2.forEach(a=>{(aBy[a.student_id]=aBy[a.student_id]||[]).push(a);});
  const sBy={}; (spks||[]).forEach(s=>{(sBy[s.student_id]=sBy[s.student_id]||[]).push(s);});
  const LEVELS=['A2','B1','B2','C1'], SKILLS=['Reading','Listening','Writing'];
  const SKILL_NAME={ Reading:'Reading & Use of English', Listening:'Listening', Writing:'Writing' };
  const cmpParts=(x,y)=>x.localeCompare(y,undefined,{numeric:true});

  /* ---- 1) Global by level ---- */
  const levelRows = LEVELS.map(L=>{
    const stu = students.filter(s=>{ const at=aBy[s.id]||[]; return at.length && mockLevelSat(at)===L; });
    if(!stu.length) return '';
    const atL = c2.filter(a=>a.level===L);
    let ready=0, border=0, notyet=0, complete=0;
    stu.forEach(s=>{
      const fin=mockCycleFinal(s, aBy[s.id]||[], mockSpeakingOf(sBy[s.id],2), 2);
      if(!fin.complete) return; complete++;
      const rd=mockReadiness(fin, L); if(!rd) return;
      if(rd.k==='ready') ready++; else if(rd.k==='borderline') border++; else notyet++;
    });
    const sk = SKILLS.map(S=>{
      const A=atL.filter(a=>a.skill===S), g=A.filter(a=>a.percent!=null);
      if(!A.length) return '<td style="text-align:center"><span class="muted">—</span></td>';
      const pct=_avg1(g.map(a=>Number(a.percent))), dur=_avg1(A.map(a=>a.duration_min).filter(x=>x!=null));
      return `<td style="text-align:center;white-space:nowrap"><b>${A.length}</b> papers${pct!=null?` · <b style="color:${_pctColor(pct)}">${pct}%</b>`:''}${dur!=null?` · ${dur} min`:''}${A.length-g.length?` <span class="badge off" style="font-size:.66rem">${A.length-g.length} to mark</span>`:''}</td>`;
    }).join('');
    return `<tr><td><span class="badge lvl">${L}</span> <span class="muted">${esc(LEVEL_EXAM[L]||'')}</span></td><td style="text-align:center"><b>${stu.length}</b></td>${sk}
      <td style="text-align:center;white-space:nowrap"><span class="badge" style="background:#16a34a;color:#fff;font-size:.72rem">✓ ${ready}</span> <span class="badge" style="background:#f59e0b;color:#fff;font-size:.72rem">≈ ${border}</span> <span class="badge" style="background:#dc2626;color:#fff;font-size:.72rem">✗ ${notyet}</span> <span class="muted" style="font-size:.74rem">(${complete}/${stu.length} complete)</span></td></tr>`;
  }).join('');
  const globalCard = `<div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr><th>Level sat</th><th>Students</th><th>Reading &amp; UoE</th><th>Listening</th><th>Writing</th><th>Ready? (complete reports)</th></tr></thead>
      <tbody>${levelRows||'<tr><td colspan="6" class="center muted">No Mock 2 papers for this filter.</td></tr>'}</tbody></table>
      <div class="muted" style="padding:8px 14px;font-size:.8rem">Per skill: papers sat · mean score · mean time per paper. Writing does not record time. <b>Ready?</b> counts only students whose report is complete (Reading, Listening and Writing marked).</div></div>`;

  /* ---- 2) One card per paper (level · skill): parts, time and the detail by student ---- */
  _mock2StatsCsv=[['Level','Paper','Student','Grade','Section','Part','Correct','Total','Part %','Paper %','Time (min)','Submitted']];
  const paperCards=[];
  LEVELS.forEach(L=>SKILLS.forEach(S=>{
    if(sf.level && sf.level!==L) return; if(sf.skill && sf.skill!==S) return;
    const A=c2.filter(a=>a.level===L && a.skill===S);
    if(!A.length) return;
    const last={}; [...A].sort((x,y)=>(y.submitted_at||'').localeCompare(x.submitted_at||'')).forEach(a=>{ if(!last[a.student_id]) last[a.student_id]=a; });
    const list=Object.values(last).sort((x,y)=>{ const a=byId[x.student_id], b=byId[y.student_id]; return (a.grade_id-b.grade_id)||(a.section||'').localeCompare(b.section||'')||(a.full_name||'').localeCompare(b.full_name||''); });
    const partNames=[]; const rows=list.map(a=>{ const ps=attemptParts(a); ps.forEach(p=>{ if(!partNames.includes(p.name)) partNames.push(p.name); }); return { a, s:byId[a.student_id], ps }; });
    partNames.sort(cmpParts);
    const graded=list.filter(a=>a.percent!=null), pcts=graded.map(a=>Number(a.percent));
    const durs=list.map(a=>a.duration_min).filter(x=>x!=null);
    const pass=pcts.filter(p=>p>=60).length;
    const partAvg=partNames.map(n=>{ const xs=rows.map(r=>r.ps.find(p=>p.name===n)).filter(Boolean); const c=xs.map(p=>p.correct).filter(x=>x!=null), t=xs.map(p=>p.total).filter(x=>x!=null); return { name:n, n:xs.length, avg:Math.round(xs.reduce((s,p)=>s+p.pct,0)/xs.length), c:_avg1(c), t:t.length?t[0]:null }; });
    const stat=(l,v,sub)=>`<div class="stat"><div class="l">${l}</div><div class="n" style="font-size:1.35rem">${v}</div>${sub?`<div class="muted" style="font-size:.78rem">${sub}</div>`:''}</div>`;
    const summary=`<div class="grid cols-4" style="margin:8px 0 12px">
        ${stat('Papers', list.length, S==='Writing'&&list.length-graded.length?`${list.length-graded.length} still to mark`:'latest paper per student')}
        ${stat('Mean score', pcts.length?`<span style="color:${_pctColor(_avg1(pcts))}">${_avg1(pcts)}%</span>`:'—', pcts.length?`median ${_median(pcts)}% · ≥60%: ${pass} of ${pcts.length}`:'')}
        ${stat('Mean time', durs.length?`${_avg1(durs)} <span style="font-size:.95rem">min</span>`:'—', durs.length?`median ${_median(durs)} · ${Math.min(...durs)}–${Math.max(...durs)} min`:(S==='Writing'?'the Writing paper does not record time':''))}
        ${stat('Exercises', partNames.length||'—', partNames.length?`${partAvg.filter(p=>p.avg<50).length} below 50%`:(S==='Writing'?'appear once marked':''))}
      </div>`;
    const partsHtml = partAvg.length ? `<div class="grid cols-2" style="gap:0 24px">${partAvg.map(p=>barRow(`${p.name}${p.t?` (avg ${p.c}/${p.t})`:''} · ${p.n}`, p.avg)).join('')}</div>` : `<p class="muted" style="margin:4px 0 10px">No breakdown by exercise yet${S==='Writing'?' — it appears as the papers are marked (two tasks × criteria)':''}.</p>`;
    const th=partNames.map(n=>`<th style="text-align:center;font-size:.74rem;white-space:nowrap" title="${esc(n)}">${esc(n.replace(/ · Questions.*$/,'').replace(/^Task (\d) — /,'T$1 '))}</th>`).join('');
    const trs=rows.map(({a,s,ps})=>{
      const cells=partNames.map(n=>{ const p=ps.find(x=>x.name===n); if(!p) return '<td style="text-align:center"><span class="muted">—</span></td>'; return `<td style="text-align:center;white-space:nowrap;color:${_pctColor(p.pct)}"><b>${p.correct!=null?p.correct:'—'}</b><span class="muted">/${p.total!=null?p.total:'—'}</span></td>`; }).join('');
      const when=a.submitted_at?new Date(a.submitted_at):null;
      const sec=s.section||'';
      if(ps.length) ps.forEach(p=>_mock2StatsCsv.push([L,SKILL_NAME[S],s.full_name||'',s.grades?.name||'',sec,p.name,p.correct,p.total,p.pct,a.percent!=null?Number(a.percent):'',a.duration_min!=null?a.duration_min:'',when?when.toLocaleString('en-GB'):'']));
      else _mock2StatsCsv.push([L,SKILL_NAME[S],s.full_name||'',s.grades?.name||'',sec,'','','','',a.percent!=null?Number(a.percent):'',a.duration_min!=null?a.duration_min:'',when?when.toLocaleString('en-GB'):'']);
      const total = a.percent!=null ? `<b style="color:${_pctColor(Number(a.percent))}">${Math.round(Number(a.percent))}%</b> <span class="muted" style="font-size:.78rem">${a.score!=null?a.score+'/'+a.total:''}</span>` : (S==='Writing'?`<button class="btn sm" onclick="gradeWriting('${a.id}',{back:'mock2',quiet:true})">✍️ Mark</button>`:'<span class="muted">—</span>');
      return `<tr data-sname="${esc((s.full_name||'').toLowerCase())}"><td style="white-space:nowrap">${S==='Writing'?esc(s.full_name||''):`<a href="#" onclick="event.preventDefault();openAttempt('${a.id}')" title="Full analysis" style="color:#2d5a8d;font-weight:700;text-decoration:none">${esc(s.full_name||'')}</a>`}</td>
        <td style="white-space:nowrap"><span class="badge grade">${esc(s.grades?.name||'—')}</span> ${esc(sec)}</td>${cells}
        <td style="text-align:center;white-space:nowrap">${total}</td>
        <td style="text-align:center">${a.duration_min!=null?a.duration_min+' min':'<span class="muted">—</span>'}</td>
        <td class="muted" style="white-space:nowrap;font-size:.8rem">${when?when.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):''}</td></tr>`;
    }).join('');
    paperCards.push(`<div class="card" id="m2s-${L}-${S}">
      <h2 style="margin:0 0 2px"><span class="badge lvl">${L}</span> ${esc(LEVEL_EXAM[L]||L)} · ${SKILL_NAME[S]}</h2>
      ${summary}
      <h3 style="margin:6px 0 2px">By exercise (mean % correct)</h3>${partsHtml}
      <h3 style="margin:10px 0 6px">Detail by student</h3>
      <div style="overflow-x:auto"><table><thead><tr><th>Student</th><th>Grade</th>${th}<th style="text-align:center">Total</th><th style="text-align:center">Time</th><th>Submitted</th></tr></thead><tbody>${trs}</tbody></table></div>
    </div>`);
  }));

  const gradeOpts=`<option value="">All grades</option>`+gradeList.map(g=>`<option value="${g.id}" ${String(f.grade)===String(g.id)?'selected':''}>${g.name}</option>`).join('');
  const filter=`<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:12px 16px;margin-bottom:10px">
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">LEVEL</label><select onchange="window._setMock2StatsFilter('level',this.value)" style="min-width:110px"><option value="">All</option>${LEVELS.map(L=>`<option ${sf.level===L?'selected':''}>${L}</option>`).join('')}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">PAPER</label><select onchange="window._setMock2StatsFilter('skill',this.value)" style="min-width:170px"><option value="">All</option>${SKILLS.map(S=>`<option value="${S}" ${sf.skill===S?'selected':''}>${SKILL_NAME[S]}</option>`).join('')}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">GRADE</label><select onchange="window._setMock2StatsFilter('grade',this.value)" style="min-width:130px">${gradeOpts}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">SECTION</label><select onchange="window._setMock2StatsFilter('section',this.value)" style="min-width:90px"><option value="">All</option>${['A','B'].map(s=>`<option ${f.section===s?'selected':''}>${s}</option>`).join('')}</select></div>
      <div><label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">NAME</label><input type="text" placeholder="Search student…" value="${esc(f.name)}" oninput="window._liveNameFilter(this.value)" style="min-width:180px"></div>
      ${(f.grade||f.section||f.name||sf.level||sf.skill)?`<button class="btn sm ghost" onclick="window._setMock2StatsFilter('_clear','')">✕ Clear</button>`:''}
      <span style="flex:1"></span>
      <button class="btn sm ghost" onclick="window._mock2StatsCSV()">📥 Export CSV</button>
    </div>`;
  $('#main').innerHTML=`
    <button class="btn sm ghost" onclick="mock2Panel()">← Back to MOCK 2</button>
    <h1 style="margin:.4rem 0 4px">📊 MOCK 2 · Papers by exercise &amp; time</h1>
    <p class="muted" style="margin-top:0;font-size:.88rem">Official Mock 2 (22 September 2026). First the <b>global picture by level</b>; then <b>one card per paper</b> (level · skill) with the mean per exercise, the time taken and the detail by student — each exercise as <b>correct/total</b>, coloured by %. Time is recorded per paper, not per exercise. Click a student's name for the full analysis of that paper.</p>
    ${filter}
    <h2 style="margin:4px 0 6px">1) Global by level</h2>${globalCard}
    <h2 style="margin:14px 0 6px">2) Each paper, by exercise</h2>
    ${paperCards.join('')||'<div class="card muted">No Mock 2 papers for this filter.</div>'}`;
}
window.mock2Stats=mock2Stats;
window._setMock2StatsFilter=(k,v)=>{
  if(k==='_clear'){ mock2Filter={grade:'',section:'',name:''}; mock2StatsFilter={level:'',skill:''}; }
  else if(k==='level'||k==='skill') mock2StatsFilter[k]=v;
  else mock2Filter[k]=v;
  mock2Stats();
};
window._mock2StatsCSV=()=>{
  const csv=_mock2StatsCsv.map(r=>r.map(c=>`"${String(c==null?'':c).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob=new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=`MOCK2_by_exercise_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
};
