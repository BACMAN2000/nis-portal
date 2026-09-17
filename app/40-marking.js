

/* ===================== TEACHER ===================== */
let resultsFilter = { grade:'', section:'', name:'', dateFrom:'', dateTo:'' };
let _currentResultsList = [];
async function loadTeacherAccess(){
  const { data } = await sb.from('teacher_access').select('*').eq('profile_id', state.session.user.id).maybeSingle();
  state.teacherAccess = data || { can_results:true, can_students:false, all_grades:true, grades:[] };
  // Tarjetas (nodos) que el admin asignó a este profesor. Sin filas → ve todo.
  try{
    const { data:tn } = await sb.from('teacher_node_access').select('node_key,allowed').eq('profile_id', state.session.user.id);
    state.teacherNodes = { has:(tn||[]).length>0, set:new Set((tn||[]).filter(r=>r.allowed).map(r=>r.node_key)) };
  }catch(e){ state.teacherNodes={ has:false, set:new Set() }; }
  return state.teacherAccess;
}
function teacherAllowedGrades(){
  const acc = state.teacherAccess || { all_grades:true, grades:[] };
  return acc.all_grades ? GRADES : GRADES.filter(g => (acc.grades||[]).includes(g.id));
}
/* ============================================================
   CONTROLES DE LECTURA — informe de los readers
   Un solo cálculo para las dos vistas (profesor y alumno). Los intentos ya
   viven en activity_attempts; lo que los distingue es la clave `activity`:
     <obra>-exam-<nivel>-ch<N>    el control del capítulo (con nota)
     <obra>-<nivel>-ch<N>-read    el rato de lectura con audio (sin nota)
     <obra>-<nivel>-ch<N>-<act>   las otras 12 actividades del capítulo
   La NOTA del capítulo es el mejor intento del control, como en el resto del
   portal. La lectura y los ejercicios no mueven la nota: son la evidencia de
   trabajo que se mira al lado. Nota de la obra = promedio de los capítulos
   rendidos; nota general = promedio de las obras con nota.
   ============================================================ */
const READER_META={
  attwn:    {icon:'🏝️', title:'And Then There Were None',        short:'ATTWN',      chapters:10},
  earnest:  {icon:'🎩', title:'The Importance of Being Earnest', short:'Earnest',    chapters:9},
  tomsawyer:{icon:'🚣', title:'The Adventures of Tom Sawyer',    short:'Tom Sawyer', chapters:8},
  princepauper:{icon:'👑', title:'The Prince and the Pauper',   short:'Prince & Pauper', chapters:8},
  treasureisland:{icon:'🏴‍☠️', title:'Treasure Island',           short:'Treasure Island', chapters:11},
  fahrenheit:{icon:'🔥', title:'Fahrenheit 451',                 short:'Fahrenheit 451', chapters:8},
  lordoftheflies:{icon:'🐚', title:'Lord of the Flies',          short:'Lord of the Flies', chapters:12},
  giver:{icon:'🛷', title:'The Giver',                           short:'The Giver', chapters:8},
  greatexpectations:{icon:'🧣', title:'Great Expectations', short:'Great Expectations', chapters:12},
  mobydick:{icon:'🐋', title:'Moby-Dick', short:'Moby-Dick', chapters:12},
  animalfarm:{icon:'🐖', title:'Animal Farm', short:'Animal Farm', chapters:10},
  mockingbird:{icon:'⚖️', title:'To Kill a Mockingbird', short:'Mockingbird', chapters:10},
  catcher:{icon:'🧢', title:'The Catcher in the Rye', short:'The Catcher', chapters:8}
};
const _RDR_IDS=Object.keys(READER_META);
const _RDR_EXAM_RX=/^([a-z]+)-exam-([a-z][0-9])-ch(\d+)$/;
const _RDR_ACT_RX=/^([a-z]+)-([a-z][0-9])-ch(\d+)-(.+)$/;
const _rdrOr=()=>_RDR_IDS.map(id=>'activity.like.'+id+'-*').join(',');
function _rdrPct(s,t){ return (t&&s!=null)? Math.round(s/t*100) : null; }
function _rdr20(p){ return (Math.round(p/5*10)/10).toFixed(1); }
/* Escala del colegio (MINEDU): AD · A · B · C, de mayor a menor — NO la A/B/C
   anglosajona. Mismos cortes que la banda del examen (attwn-exam.html), para
   que el alumno y el profesor lean exactamente la misma letra. */
function _rdrLvl(p){ return p>=90?'AD':p>=70?'A':p>=55?'B':'C'; }
const _RDR_LVL_COL={AD:'#059669',A:'#0d9488',B:'#b45309',C:'#dc2626'};
function _rdrMark(p){ if(p==null) return '<span class="muted">—</span>';
  const L=_rdrLvl(p);
  return `<b style="color:${_RDR_LVL_COL[L]}">${L}</b> <b>${p}%</b> <span class="muted" style="font-size:.78rem">${_rdr20(p)}/20</span>`; }
function _rdrTime(s){ s=Math.round(s||0); if(!s) return '<span class="muted">—</span>';
  const h=Math.floor(s/3600), m=Math.round((s%3600)/60);
  return h ? h+'h '+String(m).padStart(2,'0')+'m' : (m? m+'m' : '&lt;1m'); }
function _rdrAvg(list){ const v=(list||[]).filter(x=>x!=null); return v.length? Math.round(v.reduce((s,x)=>s+x,0)/v.length) : null; }

/* Intentos de UN alumno → {obras → capítulos} + totales. */
function readerReport(atts){
  const books={};
  (atts||[]).forEach(a=>{
    const act=String(a.activity||''); let m, kind, id, lvl, ch, actId;
    if((m=_RDR_EXAM_RX.exec(act))){ kind='exam'; id=m[1]; lvl=m[2]; ch=+m[3]; }
    else if((m=_RDR_ACT_RX.exec(act))){ id=m[1]; lvl=m[2]; ch=+m[3]; actId=m[4]; kind=(actId==='read'?'read':'act'); }
    else return;                                   // extras, juegos y todo lo demás no son controles
    if(!READER_META[id]) return;
    const b=books[id]||(books[id]={id, readSec:0, actSec:0, examSec:0, chapters:{}});
    const c=b.chapters[ch]||(b.chapters[ch]={n:ch, best:null, tries:0, readSec:0, actSec:0, acts:{}, levels:{}, last:null});
    const secs=a.duration_sec||0;
    if(lvl) c.levels[lvl.toUpperCase()]=1;
    if(kind==='exam'){
      c.tries++; b.examSec+=secs;
      const p=_rdrPct(a.score,a.total);
      if(p!=null && (c.best==null || p>c.best)) c.best=p;
      if(!c.last || String(a.submitted_at||'')>c.last) c.last=a.submitted_at;
    }
    else if(kind==='read'){ c.readSec+=secs; b.readSec+=secs; }
    else { c.actSec+=secs; b.actSec+=secs; c.acts[actId]=(c.acts[actId]||0)+1; }
  });
  let readSec=0, actSec=0, examSec=0, tries=0;
  Object.values(books).forEach(b=>{
    const chs=Object.values(b.chapters);
    b.grade=_rdrAvg(chs.map(c=>c.best));
    b.done=chs.filter(c=>c.best!=null).length;
    b.actsDone=chs.reduce((s,c)=>s+Object.keys(c.acts).length,0);
    b.tries=chs.reduce((s,c)=>s+c.tries,0);
    readSec+=b.readSec; actSec+=b.actSec; examSec+=b.examSec; tries+=b.tries;
  });
  return {books, overall:_rdrAvg(_RDR_IDS.map(id=>books[id]&&books[id].grade)), readSec, actSec, examSec, tries};
}

/* Desglose capítulo a capítulo de una obra: la misma tabla la usan el
   profesor (detalle de un alumno) y el alumno (su libreta). `en` la pasa al
   inglés, que es el idioma del portal del alumno. */
function _rdrChapterTable(id,book,en){
  const meta=READER_META[id];
  const T = en
    ? {ch:'Chapter',mark:'Control mark',tries:'Attempts',read:'⏱ Reading',ex:'⏱ Exercises',
       exs:'Exercises',lvl:'Level',last:'Last control',none:'not taken yet',att:' attempt(s)',done:' taken'}
    : {ch:'Chapter',mark:'Control mark',tries:'Attempts',read:'⏱ Reading',ex:'⏱ Exercises',
       exs:'Exercises',lvl:'Level',last:'Last control',none:'not taken yet',att:' attempt(s)',done:' taken'};
  const rows=Array.from({length:meta.chapters},(_,i)=>{
    const c=(book&&book.chapters[i+1])||null;
    const worked=c && (c.readSec||c.actSec||c.tries);
    return `<tr${c&&c.best!=null?'':' style="background:#fcfdff"'}>
      <td><b>Ch. ${i+1}</b></td>
      <td>${c&&c.best!=null?_rdrMark(c.best):`<span class="muted">${T.none}</span>`}</td>
      <td class="muted">${c&&c.tries?c.tries+T.att:'—'}</td>
      <td>${c?_rdrTime(c.readSec):'<span class="muted">—</span>'}</td>
      <td>${c?_rdrTime(c.actSec):'<span class="muted">—</span>'}</td>
      <td class="muted">${c?Object.keys(c.acts).length+'/13':'—'}</td>
      <td class="muted">${c&&Object.keys(c.levels).length?Object.keys(c.levels).sort().join(' · '):'—'}</td>
      <td class="muted">${c&&c.last?new Date(c.last).toLocaleDateString():(worked?(en?'worked on':'worked on'):'—')}</td>
    </tr>`;
  }).join('');
  return `<div class="card" style="padding:0;overflow-x:auto"><table>
    <thead><tr><th>${T.ch}</th><th>${T.mark}</th><th>${T.tries}</th><th>${T.read}</th><th>${T.ex}</th><th>${T.exs}</th><th>${T.lvl}</th><th>${T.last}</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr style="background:#f1f5f9"><td><b>${meta.icon} ${esc(meta.title)}</b></td>
      <td>${_rdrMark(book?book.grade:null)}</td>
      <td class="muted">${book?book.done:0}/${meta.chapters}${T.done}</td>
      <td>${_rdrTime(book&&book.readSec)}</td>
      <td>${_rdrTime(book&&book.actSec)}</td>
      <td class="muted">${book?book.actsDone:0}</td><td></td><td></td></tr></tfoot>
  </table></div>`;
}

const SCHOOL_YEAR_NOW=new Date().getFullYear();
const _attYear=a=>{ try{ return new Date(a.submitted_at).getFullYear(); }catch(e){ return null; } };
/* Un salon lee UNA obra por TRIMESTRE. Por eso el filtro va Anio -> Trimestre
   -> Grado -> Seccion: con esos cuatro la obra ya esta decidida (9.o en el 2.o
   trimestre es "And Then There Were None" y nada mas), y no hay que elegirla a
   mano. `term:null` = aun sin decidir; se rellena con el ultimo trimestre que
   tenga lecturas asignadas. */
const RDR_TERMS=[1,2,3];
const _rdrTermLab=t=>'Term '+t;
let readerFilter={grade:'',section:'',term:null,year:SCHOOL_YEAR_NOW};
const RDR_LEVELS=['a2','b1','b2','c1'];      // una celda vale por los cuatro
function _rdrDefaultTerm(year){
  const ts=(READER_ASSIGN||[]).filter(r=>+r.school_year===+year).map(r=>+r.term);
  return ts.length?Math.max(...ts):2;
}
/* La(s) obra(s) que caen dentro del filtro. Con grado elegido es una sola: la
   que ese salon lee ese trimestre. Sin grado pueden ser varias (cada grado lee
   la suya) y entonces la pantalla vuelve al resumen por obra. */
function _rdrFilterBooks(grades){
  const ok=new Set((grades||[]).map(g=>String(g.id)));
  const sec=String(readerFilter.section||'');
  const ids=new Set((READER_ASSIGN||[]).filter(r=>
      +r.school_year===+readerFilter.year && +r.term===+readerFilter.term &&
      ok.has(String(r.grade_id)) &&
      (!readerFilter.grade || String(r.grade_id)===String(readerFilter.grade)) &&
      (!sec || String(r.section||'')==='' || String(r.section)===sec)).map(r=>r.book_id));
  return _RDR_IDS.filter(id=>ids.has(id));
}
/* De que obra es un intento: sirve para quedarse solo con lo del trimestre. */
function _rdrBookOfAtt(a){
  const act=String((a&&a.activity)||''), m=_RDR_EXAM_RX.exec(act)||_RDR_ACT_RX.exec(act);
  return (m&&READER_META[m[1]])?m[1]:null;
}
let readerTab='stats', examCtl={book:null, until:''};
/* La hora de cierre se mide con el reloj del SERVIDOR: si dependiera del
   navegador, atrasarlo dejaría el control abierto. */
let _rdrSkew=0;
async function _rdrSyncClock(){
  try{ const { data } = await sb.rpc('server_now');
    if(data) _rdrSkew=new Date(data).getTime()-Date.now(); }catch(e){}
}
const _rdrNow=()=>Date.now()+_rdrSkew;
function _rdrRowOpen(r){
  if(!r || !r.unlocked) return false;
  const t=_rdrNow();
  if(r.opens_at  && new Date(r.opens_at).getTime()  >  t) return false;
  if(r.closes_at && new Date(r.closes_at).getTime() <= t) return false;
  return true;
}
/* 'HH:MM' → hoy a esa hora; si ya pasó, mañana (una evaluación que se abre a
   las 8:00 para el día siguiente es lo normal a última hora de la tarde). */
function _rdrUntilISO(hhmm){
  if(!hhmm) return null;
  const m=/^(\d{1,2}):(\d{2})$/.exec(hhmm.trim()); if(!m) return null;
  const d=new Date(_rdrNow());
  d.setHours(+m[1],+m[2],0,0);
  if(d.getTime()<=_rdrNow()) d.setDate(d.getDate()+1);
  return d.toISOString();
}
const _rdrHM=iso=>{ try{ return new Date(iso).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } };
window._setReaderTab=(t)=>{ readerTab=t; readerStatsPanel(); };
function _readerTabs(){
  const b=(k,l)=>`<button class="btn sm ${readerTab===k?'':'ghost'}" onclick="window._setReaderTab('${k}')">${l}</button>`;
  return `<div class="row" style="gap:8px;margin:0 0 14px">${b('stats','📊 Grades and times')}${b('tiempo','⏱️ Reading time')}${b('control','🔓 Open / close controls')}</div>`;
}
/* Estado efectivo de una clave para una cadena de alcances (la fila más
   específica manda; el tiempo extra es el mayor). Mismo criterio que la app
   del alumno, para que profesor y alumno vean lo mismo. */
function _rdrScopeChain(sc){
  const m=/^g(\d+)(?:-(.+))?$/.exec(sc||'');
  if(!m) return ['all'];
  return m[2] ? ['g'+m[1]+'-'+m[2],'g'+m[1],'all'] : ['g'+m[1],'all'];
}
function _rdrAccFor(rows,key,chain){
  let unlocked=false, extra=0, from=null, until=null;
  chain.forEach(sc=>{ const r=rows.find(x=>x.key===key && x.scope===sc);
    if(!r) return;
    if(from===null){ unlocked=_rdrRowOpen(r); from=sc; until=r.closes_at||null; }
    extra=Math.max(extra, r.extra_min||0); });
  return {unlocked, extra, from, until};
}
window._setReaderFilter=(k,v)=>{ readerFilter[k]=(k==='term'?+v:v); readerStatsPanel(); };
window._readerDetail=(id)=>readerStatsPanel(id);
/* Reglas propias de UN alumno: mandan sobre las de su salón. */
window._stuCtl=async(studentId,what)=>{
  const book=($('#rdrStuBook')||{}).value||_RDR_IDS[0];
  const ch=+(($('#rdrStuCh')||{}).value||1);
  const scope='u:'+studentId, now=new Date().toISOString();
  try{
    if(what==='clear'){
      const r=await sb.from('reader_exam_access').delete().eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope)
        .in('key',RDR_LEVELS.map(l=>book+':'+l+':ch'+ch));
      if(r.error) throw r.error;
    }else{
      const { data } = await sb.from('reader_exam_access').select('key,unlocked,extra_min')
        .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope).in('key',RDR_LEVELS.map(l=>book+':'+l+':ch'+ch));
      const prev=(data||[]);
      const base=prev.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
      const rows=RDR_LEVELS.map(l=>{ const p=prev.find(x=>x.key===book+':'+l+':ch'+ch);
        return {key:book+':'+l+':ch'+ch, scope, school_year:SCHOOL_YEAR_NOW,
          unlocked: what==='open' ? true : (what==='close' ? false : !!(p&&p.unlocked)),
          extra_min: what==='plus5' ? Math.min(180,base+5) : ((p&&p.extra_min)||0),
          updated_at:now}; });
      const r=await sb.from('reader_exam_access').upsert(rows);
      if(r.error) throw r.error;
    }
    alert('Done: '+READER_META[book].short+' · Ch. '+ch+' — '+
      (what==='open'?'opened only for this student':what==='close'?'closed only for this student':
       what==='plus5'?'+5 minutes only for this student':'their own rules were removed'));
    readerStatsPanel(studentId);
  }catch(e){ alert('Could not save: '+(e.message||e)); }
};
function _readerFilterBar(grades,years,books){
  const lab=t=>`<label style="font-size:.78rem;font-weight:700;display:block;margin-bottom:3px;color:var(--muted)">${t}</label>`;
  const y=(years&&years.length?years:[SCHOOL_YEAR_NOW]).map(v=>`<option value="${v}" ${String(readerFilter.year)===String(v)?'selected':''}>${v}${v===SCHOOL_YEAR_NOW?' (current)':''}</option>`).join('');
  const t=RDR_TERMS.map(v=>`<option value="${v}" ${+readerFilter.term===v?'selected':''}>${_rdrTermLab(v)}</option>`).join('');
  const g=`<option value="">All grades</option>`+grades.map(x=>`<option value="${x.id}" ${String(readerFilter.grade)===String(x.id)?'selected':''}>${x.name}</option>`).join('');
  const s=`<option value="">All</option>`+['A','B'].map(x=>`<option value="${x}" ${readerFilter.section===x?'selected':''}>${x}</option>`).join('');
  /* La obra ya no se elige: la decide el trimestre. Se enseña para que quede
     claro de qué libro son las notas que hay debajo. */
  const obra=(books&&books.length)
    ? books.map(id=>`<b>${READER_META[id].icon} ${esc(READER_META[id].title)}</b>`).join(' · ')
    : '<span class="muted">no book assigned to this term</span>';
  return `<div class="card" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:14px 16px;margin-bottom:10px">
    <div>${lab('SCHOOL YEAR')}<select onchange="window._setReaderFilter('year',this.value)" style="min-width:120px">${y}</select></div>
    <div>${lab('TERM')}<select onchange="window._setReaderFilter('term',this.value)" style="min-width:150px">${t}</select></div>
    <div>${lab('GRADE')}<select onchange="window._setReaderFilter('grade',this.value)" style="min-width:140px">${g}</select></div>
    <div>${lab('SECTION')}<select onchange="window._setReaderFilter('section',this.value)" style="min-width:100px">${s}</select></div>
    <div style="margin-left:auto;text-align:right;min-width:230px">${lab('BOOK OF THE TERM')}<div style="font-size:.92rem;padding-top:4px">${obra}</div></div>
  </div>`;
}
/* Panel del profesor. `detailId` abre debajo el desglose de un alumno. */
/* Matriz capítulo × salón: abrir y cerrar los controles de un libro sin salir
   del portal, y sin repetir el clic en cada nivel. Solo salta lo que el
   profesor lleva: sus grados y los libros asignados a esos grados. */
async function readerControlPanel(){
  state._tab='readers';
  $('#main').innerHTML=`<h1>📖 Reading controls</h1>${_readerTabs()}<p class="muted">Loading…</p>`;
  const isAdmin=state.profile&&state.profile.role==='admin';
  const grades=isAdmin?GRADES:teacherAllowedGrades();
  const gset=new Set(grades.map(g=>String(g.id)));
  await _rdrSyncClock();
  await loadReaderAssignments();
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(SCHOOL_YEAR_NOW);
  const term=+readerFilter.term;
  const books=_RDR_IDS.filter(id=>(READER_ASSIGN||[]).some(r=>+r.school_year===SCHOOL_YEAR_NOW&&+r.term===term&&gset.has(String(r.grade_id))&&r.book_id===id));
  const termTabs=`<span class="muted" style="font-size:.78rem;font-weight:700">TERM</span> `
    +RDR_TERMS.map(t=>`<button class="btn sm ${t===term?'':'ghost'}" onclick="window._setReaderFilter('term',${t})">Term ${t}</button>`).join(' ');
  if(!books.length){
    $('#main').innerHTML=`<h1>📖 Reading controls</h1>${_readerTabs()}
      <div class="row" style="gap:6px;margin:0 0 10px;align-items:center">${termTabs}</div>
      <div class="note info">No reader assigned for <b>${_rdrTermLab(term)}</b> in your grades.  Each class reads <b>one book per term</b>; they are chosen in <b>📚 Library → What each class reads</b>.</div>`;
    return;
  }
  const book=(examCtl.book&&books.indexOf(examCtl.book)>=0)?examCtl.book:books[0];
  examCtl.book=book;
  const meta=READER_META[book];
  const [{data:studs},{data:acc}]=await Promise.all([
    sb.from('profiles').select('grade_id,section, grades(name)').eq('role','student'),
    sb.from('reader_exam_access').select('key,scope,unlocked,extra_min,opens_at,closes_at').eq('school_year',SCHOOL_YEAR_NOW)
  ]);
  const rows=(acc||[]).filter(r=>String(r.key||'').indexOf(book+':')===0);
  const rooms={};
  (studs||[]).forEach(p=>{ if(p.grade_id==null||!gset.has(String(p.grade_id))) return;
    if(!(READER_ASSIGN||[]).some(r=>+r.school_year===SCHOOL_YEAR_NOW&&+r.term===term&&+r.grade_id===+p.grade_id&&r.book_id===book)) return;   // no lee este libro este trimestre
    const sec=String(p.section||'').trim(), k=p.grade_id+'|'+sec;
    (rooms[k]||(rooms[k]={gid:p.grade_id,sec,scope:'g'+p.grade_id+(sec?'-'+sec:''),
      label:((p.grades&&p.grades.name)||('G'+p.grade_id))+(sec?' · '+sec:''),n:0})).n++; });
  const cols=[{scope:'all',label:'All',n:null}].concat(Object.values(rooms).sort((a,b)=>a.gid-b.gid||a.sec.localeCompare(b.sec)));
  /* Estado de una celda: cuántos de los 4 niveles están abiertos. */
  const cell=(ch,scope)=>{
    const chain=_rdrScopeChain(scope);
    let open=0, own=0, extra=0, from=null, until=null;
    RDR_LEVELS.forEach(l=>{ const a=_rdrAccFor(rows,book+':'+l+':ch'+ch,chain);
      if(a.unlocked) open++;
      if(a.from===scope) own++;
      extra=Math.max(extra,a.extra); if(a.from&&!from) from=a.from;
      if(a.until&&!until) until=a.until; });
    return {open, own, extra, from, until, all:open===RDR_LEVELS.length, none:open===0};
  };
  const bookTabs=books.map(id=>`<button class="btn sm ${id===book?'':'ghost'}" onclick="window._setCtlBook('${id}')">${READER_META[id].icon} ${esc(READER_META[id].short)}</button>`).join(' ');
  // Los que no lee ningun salon tuyo se ensenan igual, apagados: si no,
  // parece que el reader no existe y se acaba buscando donde no esta.
  const sinAsignar=_RDR_IDS.filter(id=>!books.includes(id));
  const avisoLibros=sinAsignar.length?`<p class="muted" style="margin:6px 0 0;font-size:.85rem">
    Outside the ${_rdrTermLab(term)} in your classes: ${sinAsignar.map(id=>`${READER_META[id].icon} ${esc(READER_META[id].short)}`).join(' · ')}.
    They are assigned in <b>📚 Library → What each class reads</b>; until then they do not appear here.</p>`:'';
  const head=`<th style="min-width:120px">Chapter</th>`+cols.map(c=>`<th style="text-align:center">${esc(c.label)}${c.n?`<div class="muted" style="font-weight:400;font-size:.7rem">${c.n} students</div>`:''}</th>`).join('')+`<th></th>`;
  const body=Array.from({length:meta.chapters},(_,i)=>{
    const ch=i+1;
    const tds=cols.map(c=>{ const st=cell(ch,c.scope);
      const heredado=st.own===0 && st.from && st.from!==c.scope;
      const cls=st.all?'':(st.none?'ghost':'');
      const txt=st.all?'✅ open':(st.none?'🔒 closed':'◐ '+st.open+'/4');
      return `<td style="text-align:center">
        <button class="btn sm ${cls}" style="padding:5px 10px;min-width:96px" title="${heredado?'Inherited from '+esc(st.from):'All four levels at once'}"
          onclick="window._ctlToggle(${ch},'${c.scope}',${st.all?'false':'true'})">${txt}</button>
        <div class="muted" style="font-size:.7rem;margin-top:3px">${st.all&&st.until?'🕒 until '+_rdrHM(st.until):(heredado?'inherited':(st.extra?'+'+st.extra+' min':'&nbsp;'))}</div>
        ${st.all?`<div style="margin-top:2px"><button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._ctlTime(${ch},'${c.scope}',5)">+5</button>${st.extra?` <button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._ctlTime(${ch},'${c.scope}',0)">✕</button>`:''}</div>`:''}
      </td>`; }).join('');
    return `<tr><td><b>Ch. ${ch}</b></td>${tds}
      <td class="acts"><div class="acts-wrap"><button class="btn sm ghost" style="padding:4px 9px;font-size:.72rem" onclick="window._ctlRow(${ch},true)">open for all</button>
          <button class="btn sm ghost" style="padding:4px 9px;font-size:.72rem" onclick="window._ctlRow(${ch},false)">close</button></div></td></tr>`;
  }).join('');
  $('#main').innerHTML=`<h1>📖 Reading controls</h1>${_readerTabs()}
    <p class="muted" style="margin-top:-6px">Open the control for a chapter for a class: <b>one cell covers all four levels</b> (each student takes it at their own level).
      While the control is open, that chapter <b>cannot be read</b> by those students. A class overrides its grade, and the grade overrides “All”. Year <b>${SCHOOL_YEAR_NOW}</b> · <b>${_rdrTermLab(term)}</b>.</p>
    <div class="row" style="gap:6px;margin:0 0 8px;align-items:center">${termTabs}</div>
    <div class="row" style="gap:8px;margin:0 0 4px;align-items:center">${bookTabs}
      <span style="margin-left:auto;font-size:12.5px;color:#475569">Close automatically at
        <input type="time" value="${esc(examCtl.until||'')}" onchange="window._setCtlUntil(this.value)"
               style="font-family:inherit;font-size:13px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
        ${examCtl.until?`<button class="btn sm ghost" style="padding:3px 9px;font-size:.72rem" onclick="window._setCtlUntil('')">No time</button>`:''}
      </span></div>${avisoLibros}
    ${examCtl.until?`<div class="note info" style="margin:0 0 12px">🕒 Whatever you open now will close automatically at <b>${esc(examCtl.until)}</b> and reading will come back without you needing to remember. Leave the field empty to open with no closing time.</div>`:''}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:8px">⏱ <b>+5</b> adds minutes for whoever is taking that control: the timer grows on its own in under 20 seconds, without taking them out of the exam. It only arrives in time if given before the clock reaches zero.</p>`;
}
window._setCtlBook=(id)=>{ examCtl.book=id; readerControlPanel(); };
window._setCtlUntil=(v)=>{ examCtl.until=v||''; readerControlPanel(); };
async function _ctlWrite(rowsToWrite){
  try{
    const r=await sb.from('reader_exam_access').upsert(rowsToWrite);
    if(r.error) throw r.error;
    readerControlPanel();
  }catch(e){ alert('Could not save: '+(e.message||e)); }
}
window._ctlToggle=(ch,scope,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(examCtl.until):null;
  _ctlWrite(RDR_LEVELS.map(l=>({key:examCtl.book+':'+l+':ch'+ch,scope,school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
window._ctlRow=(ch,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(examCtl.until):null;
  _ctlWrite(RDR_LEVELS.map(l=>({key:examCtl.book+':'+l+':ch'+ch,scope:'all',school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
/* ================= 🧭 Niveles y hoja de ruta ==============================
   Pedido de Paolo (11-sep-2026): cada alumno trabaja en un nivel (A2·B1·B2·C1)
   y se le corrige con la rúbrica de su nivel y de la habilidad, uno a uno,
   nunca con una vara única para el salón. Aquí el profesor pone el nivel de
   sus alumnos (RPC set_student_level: solo admin o profesor del grado) y ve
   la hoja de ruta con el estado real de cada paso.                           */
const NIVELES_CEFR = ['A2','B1','B2','C1'];
const _lv = { grade:'', section:'', rub:'B1', skill:'writing' };

/* La rúbrica de una habilidad en un nivel, en una tabla compacta. La usan
   este panel y los paneles de corrección (junto al alumno, en SU nivel). */
function nivelRubricaHTML(skill, lvl, opts){
  const R = window.LEVEL_RUBRICS; if(!R || !R[skill]) return '';
  lvl = String(lvl||'').toUpperCase();
  const S = R[skill];
  if(!S.levels){ /* reading / listening: una línea por nivel */
    return S.expect && S.expect[lvl] ? `<p class="muted" style="font-size:.82rem;margin:4px 0">${esc(S.expect[lvl])}</p>` : '';
  }
  const L = S.levels[lvl]; if(!L) return `<p class="muted" style="font-size:.82rem">No rubric for level ${esc(lvl||'—')}.</p>`;
  const ex = (S.expect||{})[lvl] || {};
  const compacto = opts && opts.compacto;
  const NOMBRE = { writing:'Writing', speaking:'Speaking', reading:'Reading', listening:'Listening' };
  /* Lo que se espera en el nivel: cada habilidad trae sus propias claves
     (extensión y estructuras en writing; textos y tareas en reading; fuentes
     y velocidad en listening). Se pintan todas menos el resumen, que va primero. */
  const ROTULO = { length:'Length', structures:'Structures', linkers:'Linkers', accuracy:'Accuracy', texts:'Texts', tasks:'Tasks', sources:'Sources', speed:'Speed' };
  const extras = Object.keys(ex).filter(k=>k!=='summary' && ex[k]).map(k=>' · <b>'+esc(ROTULO[k]||k.charAt(0).toUpperCase()+k.slice(1))+':</b> '+esc(ex[k])).join('');
  return `<div style="overflow-x:auto"><table class="tbl" style="font-size:${compacto?'.76rem':'.82rem'}">
      <thead><tr><th style="min-width:150px">${NOMBRE[skill]||skill} · ${esc(lvl)}</th>
        ${UNIT_LVL.map(b=>`<th>${b}${b==='A'?' <span class="muted" style="font-weight:400">expected</span>':''}</th>`).join('')}</tr></thead>
      <tbody>${S.criteria.map(c=>`<tr><td><b>${esc(c.text.split(' — ')[0])}</b>${compacto?'':'<div class="muted" style="font-weight:400">'+esc(c.text.split(' — ').slice(1).join(' — '))+'</div>'}</td>
        ${UNIT_LVL.map(b=>`<td style="vertical-align:top">${esc((L[c.k]||{})[b]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    ${ex.summary||extras?`<p class="muted" style="font-size:.78rem;margin:6px 0 0"><b>At ${esc(lvl)}:</b> ${esc(ex.summary||'')}${extras}</p>`:''}`;
}
/* El desplegable «Expected at <nivel>» que va junto al alumno al corregir. */
function nivelEsperadoBox(skill, lvl){
  if(!lvl) return `<div class="note info" style="margin:8px 0;font-size:.82rem">This student has <b>no level set</b>: mark them at the level you know they work at, and set it in 🧭 Levels &amp; roadmap.</div>`;
  return `<details style="margin:8px 0"><summary style="cursor:pointer;font-weight:700;font-size:.85rem">📐 Expected at ${esc(String(lvl).toUpperCase())} — ${esc(skill)} rubric for this level</summary>
    <div style="margin-top:6px">${nivelRubricaHTML(skill, lvl, {compacto:true})}</div></details>`;
}

async function levelsPanel(){
  state._tab='levels';
  const isAdmin = state.profile && state.profile.role==='admin';
  const grades = isAdmin ? GRADES : teacherAllowedGrades();
  $('#main').innerHTML = `<h1>🧭 Levels &amp; roadmap</h1><p class="muted">Loading…</p>`;
  const gids = grades.map(g=>g.id);
  const [{data:studs},{data:subs}] = await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section,cefr_level').eq('role','student').in('grade_id', gids).order('full_name'),
    sb.from('unit_submissions').select('id,grade,reviewed_at,released_at').not('reviewed_at','is',null).limit(5000)
  ]);
  const S = studs||[];
  /* Estado por grado: cuántos tienen nivel. */
  const porGrado = {}; S.forEach(p=>{ const g=porGrado[p.grade_id]=porGrado[p.grade_id]||{n:0,con:0}; g.n++; if(p.cefr_level) g.con++; });
  const sinNivel = S.filter(p=>!p.cefr_level).length;
  const pend = (subs||[]).filter(r=>!r.released_at && gids.indexOf(parseInt(String(r.grade).replace(/\D/g,''),10))>=0).length;
  const estadoGrados = grades.map(g=>{ const x=porGrado[g.id]||{n:0,con:0}; return `<span class="badge" style="background:${x.n&&x.con===x.n?'#dcfce7':(x.con?'#fef3c7':'#fee2e2')}">${esc(g.name)} · ${x.con}/${x.n}</span>`; }).join(' ');

  /* Por defecto, el primer grado que tenga alumnos: al admin le salían once
     grados y el primero vacío. */
  if(!_lv.grade || gids.indexOf(+_lv.grade)<0) _lv.grade = String((gids.find(g=>porGrado[g]&&porGrado[g].n)||gids[0])||'');
  const deGrado = S.filter(p=>String(p.grade_id)===String(_lv.grade));
  const secciones = [...new Set(deGrado.map(p=>String(p.section||'').trim()).filter(Boolean))].sort();
  if(_lv.section && secciones.indexOf(_lv.section)<0) _lv.section='';
  const lista = deGrado.filter(p=>!_lv.section || String(p.section||'').trim()===_lv.section);
  const opt = (v,t,sel)=>`<option value="${esc(String(v))}"${sel?' selected':''}>${esc(t)}</option>`;
  const selNivel = (p)=>`<select onchange="window._lvPon('${p.id}',this.value,this)" style="font-family:inherit;padding:4px 6px;border:1.5px solid var(--line);border-radius:8px;background:${p.cefr_level?'#fff':'#fff7ed'}">
      ${opt('','— no level —',!p.cefr_level)}${NIVELES_CEFR.map(l=>opt(l,l,p.cefr_level===l)).join('')}</select>`;

  const roadmap = `<div class="card">
    <h2 style="margin-top:0">🗺️ How we mark from September 2026 — the roadmap</h2>
    <ol style="margin:8px 0 0 18px;padding:0;line-height:1.6">
      <li><b>Every student has a working level</b> (A2 · B1 · B2 · C1), set by their teacher — not by the grade they are in.
        <div style="margin:4px 0 6px">${estadoGrados} ${sinNivel?`<span class="muted">· ${sinNivel} without level in your grades</span>`:'<span class="muted">· all set</span>'}</div></li>
      <li><b>Each student is marked individually at their level</b>, with the rubric of the skill (Writing · Speaking · Reading · Listening) for that level — never with one rubric for the whole class. The unit rubric says <i>what</i> to look at; the level rubric says <i>how much</i> to expect. In every marking panel the level sits next to the name and the level rubric is one click away (📐 Expected at…).</li>
      <li><b>Unit exams are taken at the student’s level.</b> Results flag anyone who took another level (⚠ took A2 · level B1).</li>
      <li><b>Nothing reaches the student until you send the whole class.</b> Marking saves; <b>📣 Send grades and comments</b> publishes, after you have reviewed it.
        <div style="margin:4px 0 0"><span class="badge" style="background:${pend?'#fef3c7':'#dcfce7'}">${pend} marked and not yet sent in your grades</span></div></li>
    </ol>
    <p class="muted" style="font-size:.8rem;margin:10px 0 0">Set levels below. A student with no level is marked at the level you know, and shows a red “no level” badge until you set it.</p>
  </div>`;

  const tabla = `<div class="card" style="margin-top:14px">
    <h2 style="margin-top:0">🎚️ Working level of each student</h2>
    <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:6px 0 10px">
      <label style="font-size:.85rem">Grade <select onchange="window._lvFiltra('grade',this.value)" style="margin-left:4px">${grades.map(g=>opt(g.id,g.name,String(g.id)===String(_lv.grade))).join('')}</select></label>
      <label style="font-size:.85rem">Section <select onchange="window._lvFiltra('section',this.value)" style="margin-left:4px">${opt('','All',!_lv.section)}${secciones.map(s=>opt(s,s,s===_lv.section)).join('')}</select></label>
      <span class="muted" style="font-size:.8rem">${lista.length} student${lista.length===1?'':'s'} · ${lista.filter(p=>p.cefr_level).length} with level</span>
      <span style="margin-left:auto;font-size:.82rem">Everyone shown without level → <select id="lvBulk" style="font-family:inherit;padding:3px 6px">${NIVELES_CEFR.map(l=>opt(l,l,l==='B1')).join('')}</select>
        <button class="btn sm" onclick="window._lvBulk()">Apply</button></span>
    </div>
    ${lista.length?`<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Student</th><th>Section</th><th>Working level</th><th></th></tr></thead>
      <tbody>${lista.map(p=>`<tr><td>${esc(p.full_name||'')}</td><td>${esc(String(p.section||''))}</td><td>${selNivel(p)}</td><td class="muted" id="lvst-${p.id}" style="font-size:.78rem"></td></tr>`).join('')}</tbody></table></div>`
      :'<p class="muted">No students in this grade.</p>'}
  </div>`;

  const rubricas = `<div class="card" style="margin-top:14px">
    <h2 style="margin-top:0">📐 Rubrics by skill and level</h2>
    <p class="muted" style="font-size:.82rem">A = what is expected at that level. AD is above it, B is close, C is not there yet. Same scale for everyone; different expectations per level.</p>
    <div class="row" style="gap:6px;flex-wrap:wrap;margin:0 0 10px">
      ${NIVELES_CEFR.map(l=>`<button class="btn sm ${_lv.rub===l?'':'ghost'}" onclick="window._lvRub('${l}',null)">${l}</button>`).join('')}
      <span class="muted" style="margin:0 4px">|</span>
      ${[['writing','✍️ Writing'],['speaking','🗣️ Speaking'],['reading','📖 Reading'],['listening','🎧 Listening']].map(s=>`<button class="btn sm ${_lv.skill===s[0]?'':'ghost'}" onclick="window._lvRub(null,'${s[0]}')">${s[1]}</button>`).join('')}
    </div>
    ${window.LEVEL_RUBRICS ? nivelRubricaHTML(_lv.skill, _lv.rub) : '<p class="muted">The rubrics file (level-rubrics.js) is not loaded.</p>'}
  </div>`;

  $('#main').innerHTML = `<h1>🧭 Levels &amp; roadmap</h1>${roadmap}${tabla}${rubricas}`;
}
window._lvFiltra = (k,v)=>{ _lv[k]=v; if(k==='grade') _lv.section=''; levelsPanel(); };
window._lvRub = (l,s)=>{ if(l) _lv.rub=l; if(s) _lv.skill=s; levelsPanel(); };
window._lvPon = async (id, lvl, sel)=>{
  const st = document.getElementById('lvst-'+id); if(st) st.textContent='saving…';
  const { data, error } = await sb.rpc('set_student_level', { p_student:id, p_level:lvl||null });
  if(error){ if(st){ st.textContent='✗ '+error.message; st.style.color='var(--bad,#b91c1c)'; } return; }
  if(sel) sel.style.background = data ? '#fff' : '#fff7ed';
  if(st){ st.textContent = data ? '✓ '+data : '✓ cleared'; st.style.color=''; }
};
window._lvBulk = async ()=>{
  const lvl = ($('#lvBulk')||{}).value; if(!lvl) return;
  const sels = [...document.querySelectorAll('select[onchange^="window._lvPon"]')].filter(s=>!s.value);
  if(!sels.length){ alert('Everyone shown already has a level.'); return; }
  if(!await NISUI.pregunta(sels.length+' students without level will be set to '+lvl+'.', {titulo:'Set the level for all of them?', si:'Set '+lvl, no:'Cancel'})) return;
  for(const s of sels){ const id=/'([0-9a-f-]{36})'/.exec(s.getAttribute('onchange'))[1]; s.value=lvl; await window._lvPon(id, lvl, s); }
  levelsPanel();
};

/* ================= 📋 Exámenes de unidad ==================================
   La misma mecánica que los controles de lectura, y a propósito: el profesor
   ya sabe abrir una celda, dar +5 y poner hora de cierre. Cambia lo que hay en
   las filas — aquí son los exámenes de unidad (práctica y oficial), no los
   capítulos de un libro — y que el candado además le niega al alumno la
   DESCARGA del examen, no solo la pantalla (RLS de unit_exams).
   La clave es grade:uUNITS:kind:level, y vive en la misma tabla
   reader_exam_access, con su año escolar, su alcance y sus minutos extra.  */
const UEX_LEVELS=['a2','b1','b2','c1'];
const UEX_KINDS=[['practice','📝 Practice'],['official','🎓 Official']];
/* units = null → la pantalla de tarjetas por bloque de unidades; con valor, el
   detalle de ese bloque. */
const uexCtl={until:'', grade:'g9', units:null, vista:'abrir'};
const uexKey=(kind,lvl)=>uexCtl.grade+':u'+uexCtl.units+':'+kind+':'+lvl;
/* El grado de la clave ('g9') es el del EXAMEN; el alcance ('g9-B') es el del
   salón al que se le abre. Son cosas distintas aunque se parezcan. */
const uexGradeId=()=>+String(uexCtl.grade).replace(/\D/g,'');
/* Los tres documentos de papel de un examen. Abren en otra pestaña porque el
   profesor los manda a imprimir y quiere seguir teniendo el panel donde está:
   normalmente imprime los cuatro niveles seguidos. */
const _uexDoc=(kind,lvl,doc)=>'unit-exam-print.html?grade='+uexCtl.grade+'&units='+uexCtl.units+
  '&kind='+kind+'&level='+lvl+'&doc='+doc;
const _uexImprimir=(kind,lvl)=>[['exam','🖨️','Student sheet'],['key','🔑','Answer key'],['script','🎧','Script']]
  .map(d=>`<a class="btn sm ghost" style="padding:2px 8px;font-size:.7rem;text-decoration:none"
      href="${_uexDoc(kind,lvl,d[0])}" target="_blank" rel="noopener"
      title="${d[2]} · ${kind==='official'?'official':'practice'} ${lvl.toUpperCase()} (opens ready to print or save as PDF)">${d[1]} ${d[2]}</a>`).join(' ');

/* Los bloques de unidades de un grado, de dos en dos, como se examinan: 1-2,
   3-4, 5-6. Salen del planner (unit-plans.js), no de una lista escrita a mano,
   así que en cuanto coordinación añada una unidad su bloque aparece aquí solo
   —vacío hasta que se cree el examen, que es justo lo que hay que ver: que ese
   bloque existe y todavía no tiene examen. Los pilotos quedan fuera. */
function _uexBloques(grade){
  const us=unitPlansFor(grade).filter(u=>!u.pilot).sort((a,b)=>a.n-b.n);
  const out=[];
  for(let i=0;i<us.length;i+=2) out.push(us.slice(i,i+2));
  return out.filter(b=>b.length);
}
const _uexUnits=b=>b.map(u=>u.n).join('-');
const _uexRotulo=b=>b.length>1?('Units '+b[0].n+' and '+b[b.length-1].n):('Unit '+b[0].n);

/* Pantalla 1: una tarjeta por bloque de unidades. */
function _uexTarjetas(grade, porBloque, abiertosPorBloque, notas){
  const bloques=_uexBloques(grade);
  if(!bloques.length) return `<div class="note info">This grade has no units in the planner, so there are
    no blocks to test. Units are copied from the Toddle planner into <code>unit-plans.js</code>.</div>`;
  return `<div class="grid cols-2" style="margin-top:12px">${bloques.map(b=>{
    const units=_uexUnits(b);
    const n=(porBloque[units]||[]).length, abiertos=abiertosPorBloque[units]||0;
    const ico=(b[0].cover&&b[0].cover.icon)||'📘';
    const titulos=b.map(u=>esc(u.title)).join(' · ');
    const chip=n
      ? `<span class="badge" style="background:${abiertos?'#dcfce7':'#e2e8f0'};color:${abiertos?'#065f46':'#475569'}">
           ${n} ${n===1?'exam':'exams'} · ${abiertos?abiertos+(abiertos===1?' open':' open'):'all closed'}</span>`
      : `<span class="badge" style="background:#f1f5f9;color:#64748b">No exam yet</span>`;
    /* Lo corregido, al lado del candado: el profesor venia a ver las notas y
       la tarjeta solo le decia si el examen estaba abierto. Un boton para
       abrir y cerrar, otro para corregir, y cuantos Writings esperan. */
    const r=(notas&&notas[units])||{intentos:0,writings:0,pendientes:0};
    const resumen=n?`<p class="muted" style="margin:8px 0 0;font-size:.8rem">📊 ${r.intentos} attempt${r.intentos===1?'':'s'}
         · ✍️ ${r.writings} writing${r.writings===1?'':'s'}${r.pendientes?` · <b style="color:#b45309">${r.pendientes} to mark</b>`:(r.writings?' · all marked':'')}</p>`:'';
    const botones=n?`<div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">
        <button class="btn sm" onclick="event.stopPropagation();window._uexAbreBloque('${units}','abrir')">🔓 Open / close</button>
        <button class="btn sm ${r.pendientes?'':'ghost'}" onclick="event.stopPropagation();window._uexAbreBloque('${units}','notas')">✅ Marking${r.intentos?' · '+r.intentos:''}</button>
      </div>`:'';
    /* Tambien se entra a los bloques vacios: aqui solo hay profesores y
       administradores, y ver por dentro que un bloque no tiene examen es
       informacion, no un sitio prohibido. */
    return `<div class="card" style="cursor:pointer;${n?'':'opacity:.72'}"
        onclick="window._uexAbreBloque('${units}','abrir')">
      <div style="font-size:1.9rem;line-height:1">${ico}</div>
      <h2 style="margin:6px 0 2px;font-size:1.05rem">${_uexRotulo(b)}</h2>
      <p class="muted" style="margin:0 0 6px;font-size:.85rem">${titulos}</p>
      ${chip}${resumen}${botones}
      ${n?'':`<p class="muted" style="margin:8px 0 0;font-size:.78rem">It will appear here as soon as it is uploaded
         with <code>exams/sube_examen.py</code>. Until then there is nothing to open or print.</p>`}
    </div>`; }).join('')}</div>`;
}
window._uexAbreBloque=(units,vista)=>{ uexCtl.units=units; uexCtl.vista=vista||'abrir'; unitExamPanel(); };
window._uexVista=(v)=>{ uexCtl.vista=v; unitExamPanel(); };
window._uexVuelve=()=>{ uexCtl.units=null; unitExamPanel(); };

async function unitExamPanel(){
  state._tab='unitexams';
  $('#main').innerHTML=`<h1>📋 Unit exams</h1><p class="muted">Loading…</p>`;
  const isAdmin=state.profile&&state.profile.role==='admin';
  const grades=isAdmin?GRADES:teacherAllowedGrades();
  const gid=uexGradeId();
  if(!grades.some(g=>+g.id===gid)){
    $('#main').innerHTML=`<h1>📋 Unit exams</h1>
      <div class="note info">The published unit exams are for <b>Grade 9</b> (units 3 and 4 with
      <i>And Then There Were None</i>), and you do not have that grade assigned.</div>`;
    return;
  }
  await _rdrSyncClock();
  /* Se pide el grado ENTERO, no solo el bloque abierto: la pantalla de tarjetas
     necesita saber cuáles tienen examen y cuántos están abiertos. */
  const [{data:studs},{data:acc},{data:todos},{data:ints},{data:wrs}]=await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section,cefr_level, grades(name)').eq('role','student').eq('grade_id',gid),
    sb.from('reader_exam_access').select('key,scope,unlocked,extra_min,opens_at,closes_at').eq('school_year',SCHOOL_YEAR_NOW),
    sb.from('unit_exams_index').select('units,kind,level,title,minutes,questions').eq('grade',uexCtl.grade),
    /* Solo para contar en las tarjetas: cuantos rindieron cada bloque y cuantos
       Writings esperan nota. El detalle lo trae _uexResultados. */
    sb.from('activity_attempts').select('activity').like('activity','unitexam-'+uexCtl.grade+'-%').limit(5000),
    sb.from('unit_submissions').select('payload,reviewed_at,milestone').eq('grade',uexCtl.grade).like('milestone','exam-%').limit(5000)
  ]);
  const notas={};
  const _nb=u=>notas[u]=notas[u]||{intentos:0,writings:0,pendientes:0};
  (ints||[]).forEach(a=>{ const m=/^unitexam-[a-z0-9]+-u([0-9-]+)-/.exec(a.activity||''); if(m) _nb(m[1]).intentos++; });
  (wrs||[]).forEach(r=>{ const u=String((r.payload&&r.payload.units)||''); if(!u) return; const b=_nb(u); b.writings++; if(!r.reviewed_at) b.pendientes++; });
  const porBloque={};
  (todos||[]).forEach(x=>{ (porBloque[x.units]=porBloque[x.units]||[]).push(x); });
  /* Para la tarjeta, un examen cuenta como abierto si lo está para ALGUIEN —un
     salón, un grado o todos—, no solo en el alcance «Todos». Mirando solo 'all'
     la tarjeta decía «todos cerrados» con el B2 abierto para 9.º B, que es
     justo lo contrario de lo que el profesor necesita ver de un vistazo. */
  const abiertosPorBloque={};
  Object.keys(porBloque).forEach(u=>{
    abiertosPorBloque[u]=porBloque[u].filter(x=>{
      const k=uexCtl.grade+':u'+u+':'+x.kind+':'+x.level;
      return (acc||[]).some(r=>r.key===k&&_rdrRowOpen(r));
    }).length;
  });

  if(!uexCtl.units){
    $('#main').innerHTML=`<h1>📋 Unit exams</h1>
      <p class="muted" style="margin-top:-6px">Choose the block of units. Inside are the <b>practice exam</b>
        and the <b>official</b> one, each in its four levels, with its lock and its sheet to print.</p>
      ${_uexTarjetas(uexCtl.grade, porBloque, abiertosPorBloque, notas)}`;
    return;
  }

  const pub=porBloque[uexCtl.units]||[];
  const publicados=new Set(pub.map(x=>x.kind+':'+x.level));
  /* Dos pestanas, una al lado de la otra: abrir/cerrar el examen y corregirlo.
     Antes los resultados iban debajo de la tabla de candados y nadie los
     encontraba. */
  const _b=_uexBloques(uexCtl.grade).find(b=>_uexUnits(b)===uexCtl.units);
  const _rot=_b?_uexRotulo(_b):('Units '+uexCtl.units);
  const _sub=_b?_b.map(u=>esc(u.title)).join(' · '):'';
  const _notas=notas[uexCtl.units]||{intentos:0,writings:0,pendientes:0};
  const enNotas=uexCtl.vista==='notas';
  const volver=`<div class="row" style="gap:6px;margin:0 0 12px;align-items:center;flex-wrap:wrap">
      <button class="btn sm ghost" onclick="window._uexVuelve()">← Units</button>
      <span class="muted" style="margin:0 4px">|</span>
      <button class="btn sm ${enNotas?'ghost':''}" onclick="window._uexVista('abrir')">🔓 Open / close</button>
      <button class="btn sm ${enNotas?'':'ghost'}" onclick="window._uexVista('notas')">✅ Marking${_notas.intentos?' · '+_notas.intentos:''}${_notas.pendientes?' <span class="badge" style="background:#fef3c7;color:#92400e;margin-left:4px">'+_notas.pendientes+' to mark</span>':''}</button>
    </div>`;
  if(!publicados.size){
    $('#main').innerHTML=`<h1>📋 Unit exams</h1>${volver}
      <div class="note info">There is no exam published yet for ${uexCtl.grade.toUpperCase()} · units ${uexCtl.units}.
      They are uploaded with <code>exams/sube_examen.py</code>; until then there is nothing to open.</div>`;
    return;
  }
  if(enNotas){
    $('#main').innerHTML=`<h1>📋 Unit exams</h1>${volver}
      <p class="muted" style="margin-top:-2px">${(GRADE_META[uexCtl.grade]||['','Grade 9'])[1]} · <b>${_rot}</b>${_sub?' — '+_sub:''}.</p>`;
    $('#main').insertAdjacentHTML('beforeend', await _uexResultados(studs||[]));
    return;
  }
  const prefijo=uexCtl.grade+':u'+uexCtl.units+':';
  const rows=(acc||[]).filter(r=>String(r.key||'').indexOf(prefijo)===0);
  const rooms={};
  (studs||[]).forEach(p=>{ const sec=String(p.section||'').trim(), k=p.grade_id+'|'+sec;
    (rooms[k]||(rooms[k]={gid:p.grade_id,sec,scope:'g'+p.grade_id+(sec?'-'+sec:''),
      label:((p.grades&&p.grades.name)||('G'+p.grade_id))+(sec?' · '+sec:''),n:0})).n++; });
  const cols=[{scope:'all',label:'All',n:null}].concat(Object.values(rooms).sort((a,b)=>a.sec.localeCompare(b.sec)));

  /* Estado de una celda. `niveles` = los que entran en ella: los cuatro en la
     fila resumen, uno solo en las filas de nivel. Solo cuentan los publicados,
     para no decir "2/4 abierto" de exámenes que no existen. */
  const cell=(kind,niveles,scope)=>{
    const chain=_rdrScopeChain(scope);
    const hay=niveles.filter(l=>publicados.has(kind+':'+l));
    let open=0, own=0, extra=0, from=null, until=null;
    hay.forEach(l=>{ const a=_rdrAccFor(rows,uexKey(kind,l),chain);
      if(a.unlocked) open++;
      if(a.from===scope) own++;
      extra=Math.max(extra,a.extra); if(a.from&&!from) from=a.from;
      if(a.until&&!until) until=a.until; });
    return {open, own, extra, from, until, n:hay.length, hay,
            all:hay.length>0&&open===hay.length, none:open===0};
  };
  const celda=(kind,niveles,c,etiq)=>{
    const st=cell(kind,niveles,c.scope);
    if(!st.n) return `<td style="text-align:center" class="muted">—</td>`;
    const heredado=st.own===0&&st.from&&st.from!==c.scope;
    /* Candado ABIERTO cuando está abierto: el botón se lee como lo que hace al
       pulsarlo (cerrar), no solo como el estado en que está. */
    const txt=st.all?'🔓 Open':(st.none?'🔒 Closed':'◐ '+st.open+'/'+st.n);
    const accion=st.all?'Click to CLOSE it':'Click to OPEN it';
    return `<td style="text-align:center">
      <button class="btn sm ${st.all?'':(st.none?'ghost':'')}" style="padding:5px 10px;min-width:100px"
        title="${accion} · ${heredado?'Inherited from '+esc(st.from):esc(etiq)}"
        onclick="window._uexToggle('${kind}','${niveles.join(',')}','${c.scope}',${st.all?'false':'true'})">${txt}</button>
      <div class="muted" style="font-size:.7rem;margin-top:3px">${st.all&&st.until?'🕒 until '+_rdrHM(st.until):(heredado?'inherited':(st.extra?'+'+st.extra+' min':'&nbsp;'))}</div>
      ${st.all?`<div style="margin-top:2px"><button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._uexTime('${kind}','${niveles.join(',')}','${c.scope}',5)">+5</button>${st.extra?` <button class="btn sm ghost" style="padding:2px 7px;font-size:.68rem" onclick="window._uexTime('${kind}','${niveles.join(',')}','${c.scope}',0)">✕</button>`:''}</div>`:''}
    </td>`;
  };
  const head=`<th style="min-width:150px">Exam</th>`
    +cols.map(c=>`<th style="text-align:center">${esc(c.label)}${c.n?`<div class="muted" style="font-weight:400;font-size:.7rem">${c.n} student${c.n===1?'':'s'}</div>`:''}</th>`).join('');
  const body=UEX_KINDS.map(([kind,etiq])=>{
    const resumen=`<tr style="background:#f8fafc"><td><b>${etiq}</b>
      <div class="muted" style="font-size:.72rem">all four levels at once</div></td>
      ${cols.map(c=>celda(kind,UEX_LEVELS,c,'All four levels at once')).join('')}</tr>`;
    const porNivel=UEX_LEVELS.filter(l=>publicados.has(kind+':'+l)).map(l=>{
      const e=(pub||[]).find(x=>x.kind===kind&&x.level===l)||{};
      return `<tr><td style="padding-left:22px">${l.toUpperCase()}
        <span class="muted" style="font-size:.72rem">· ${e.minutes||''} min · ${e.questions||0} questions</span>
        <div style="margin-top:3px">${_uexImprimir(kind,l)}</div></td>
        ${cols.map(c=>celda(kind,[l],c,'Only '+l.toUpperCase())).join('')}</tr>`;
    }).join('');
    return resumen+porNivel;
  }).join('');
  /* El rótulo sale del planner y del título del propio examen, no de un texto
     escrito a mano: el día que haya examen de 5 y 6 esta cabecera ya lo dirá. */
  $('#main').innerHTML=`<h1>📋 Unit exams</h1>${volver}
    <p class="muted" style="margin-top:-2px">${(GRADE_META[uexCtl.grade]||['','Grade 9'])[1]} · <b>${_rot}</b>${_sub?' — '+_sub:''}.
      Each student takes it <b>at their own level</b>: opening the row above opens all four at once, and the rows below
      are for opening just one. A class overrides its grade, and the grade overrides «All». Year <b>${SCHOOL_YEAR_NOW}</b>.</p>
    <div class="note info" style="margin:0 0 12px">🔒 While an exam is closed, the student <b>cannot even download it</b>:
      the database denies it, it is not only that the screen does not show it. You and the administrators can always go in to review it,
      and inside you will also see the <b>listening script</b>.</div>
    <div class="row" style="gap:8px;margin:0 0 10px;align-items:center">
      <span style="margin-left:auto;font-size:12.5px;color:#475569">Close automatically at
        <input type="time" value="${esc(uexCtl.until||'')}" onchange="window._uexUntil(this.value)"
               style="font-family:inherit;font-size:13px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
        ${uexCtl.until?`<button class="btn sm ghost" style="padding:3px 9px;font-size:.72rem" onclick="window._uexUntil('')">No time</button>`:''}
      </span></div>
    ${uexCtl.until?`<div class="note info" style="margin:0 0 12px">🕒 Whatever you open now will close automatically at <b>${esc(uexCtl.until)}</b>.</div>`:''}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    <p class="muted" style="font-size:.82rem;margin-top:8px">⏱ <b>+5</b> adds minutes for whoever is taking it: the timer
      grows on its own in under 20 seconds, without taking them out of the exam, and it even arrives once the clock has reached zero.
      The results and the <b>Writing</b> are marked in the <b>✅ Marking</b> tab above.</p>
    <p class="muted" style="font-size:.82rem;margin-top:4px">🖨️ For whoever takes it <b>on paper</b>: each level has its own
      <b>student sheet</b>, <b>answer key</b>, and <b>listening script</b>. They open in A4, ready to print or to
      save as PDF (Ctrl+P → Save as PDF). The answer key and script <b>are not served to student accounts</b>.
      You play the listening audio yourself from the on-screen exam.</p>`;
}

/* Resultados del bloque: quien rindio que, con su nota y su banda, y el
   Writing con el texto delante para corregirlo aqui mismo. Antes las notas
   solo se veian entrando alumno por alumno en su ficha, y el Writing estaba
   escondido en Productos de unidad con una etiqueta. */
async function _uexResultados(studs){
  const pref='unitexam-'+uexCtl.grade+'-u'+uexCtl.units+'-';
  const [{data:ints},{data:wrs}]=await Promise.all([
    sb.from('activity_attempts').select('id,student_id,activity,score,total,duration_sec,submitted_at,detail')
      .like('activity',pref+'%').order('submitted_at',{ascending:false}).limit(3000),
    sb.from('unit_submissions').select('id,student_id,grade,unit,milestone,kind,payload,score,feedback,reviewed_at,released_at')
      .eq('grade',uexCtl.grade).like('milestone','exam-%').limit(3000)
  ]);
  const quien={}; studs.forEach(p=>{ quien[p.id]=p; });
  /* El Writing se guarda con el hito 'exam-<tipo>-<nivel>' y el bloque de
     unidades en payload.units. */
  const writing={};
  (wrs||[]).forEach(r=>{
    const m=/^exam-(practice|official)-(a2|b1|b2|c1)$/.exec(r.milestone||''); if(!m) return;
    const u=(r.payload&&r.payload.units)||''; if(u && String(u)!==String(uexCtl.units)) return;
    writing[r.student_id+'|'+m[1]+'|'+m[2]]=r;
  });
  /* La misma escala que ve el alumno al terminar (unit-exam.html). */
  const banda=pct=>pct>=90?['AD','#dcfce7']:pct>=70?['A','#e0f2fe']:pct>=55?['B','#fef9c3']:['C','#fee2e2'];
  /* Un papel por columna, como en Cambridge: Reading and Use of English
     (partes 1-5, 33 preguntas), Listening (parte 6, 6 preguntas) y Writing
     (sobre 20, la pone el profesor). El desglose viene en detail.papers, que
     unit-exam.html guarda con el intento desde el 12-sep-2026; lo anterior
     solo tiene el total. */
  const papel=(a,k)=>{ const o=a.detail&&a.detail.papers&&a.detail.papers[k];
    if(!o) return '<span class="muted" title="Taken before the breakdown was recorded (12 Sep 2026): only the total is available">—</span>';
    const q=o.of?Math.round(100*o.ok/o.of):0, b=banda(q);
    return `<b>${o.ok}/${o.of}</b> · ${q}% <span class="badge" style="background:${b[1]}">${b[0]}</span>`; };
  let sinDesglose=0;
  const filas=(ints||[]).map(a=>{
    const m=/-(practice|official)-(a2|b1|b2|c1)$/.exec(a.activity)||[];
    return {a, kind:m[1]||'', lvl:m[2]||'', p:quien[a.student_id]||{}, w:writing[a.student_id+'|'+m[1]+'|'+m[2]]};
  }).sort((x,y)=>((x.kind==='official'?0:1)-(y.kind==='official'?0:1)) ||
    String(x.p.section||'').localeCompare(String(y.p.section||'')) ||
    String(x.p.full_name||'').localeCompare(String(y.p.full_name||'')) ||
    (Date.parse(y.a.submitted_at)-Date.parse(x.a.submitted_at)));
  const rendidos=new Set(filas.filter(f=>f.kind==='official').map(f=>f.a.student_id));
  const sinRendir=studs.filter(p=>!rendidos.has(p.id))
    .sort((a,b)=>String(a.section||'').localeCompare(String(b.section||''))||String(a.full_name||'').localeCompare(String(b.full_name||'')));
  const fecha=iso=>{ try{ return new Date(iso).toLocaleString('en-GB',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}); }catch(_){ return ''; } };
  const fila=f=>{
    const pct=f.a.total?Math.round(100*f.a.score/f.a.total):0, b=banda(pct);
    const w=f.w, wp=(w&&w.payload)||{};
    return `<tr>
      <td>${esc(f.p.full_name||'(student)')} <span class="muted">${f.p.grade_id?'G'+f.p.grade_id+' '+(f.p.section||''):''}</span>
        <div style="margin-top:2px">${nivelBadge(f.p.cefr_level, f.lvl)}</div></td>
      <td style="white-space:nowrap">${f.kind==='official'?'🎓 official':'📝 practice'} · <b>${f.lvl.toUpperCase()}</b></td>
      <td style="text-align:center;white-space:nowrap">${papel(f.a,'rue')}</td>
      <td style="text-align:center;white-space:nowrap">${papel(f.a,'listening')}</td>
      <td style="min-width:260px">${w ? `<details>
          <summary style="cursor:pointer">${w.reviewed_at&&w.score!=null
            ? '<span class="badge" id="uexw-'+w.id+'" style="background:'+UNIT_FONDO[unitNivelDeNota(w.score)]+'">'+w.score+'/20 · '+unitNivelDeNota(w.score)+(w.released_at?' · sent':' · marked')+'</span>'
            : w.reviewed_at ? '<span class="badge" id="uexw-'+w.id+'" style="background:#dcfce7">marked'+(w.released_at?' · sent':'')+'</span>'
            : '<span class="badge" id="uexw-'+w.id+'" style="background:#fee2e2">not marked</span>'} · ✍️ ${wp.words||0} words</summary>
          <div style="white-space:pre-wrap;font-size:.86rem;line-height:1.55;max-height:260px;overflow:auto;padding:8px 10px;margin-top:6px;border:1px solid var(--line);border-radius:8px;background:#fcfdff">${esc(wp.text||'')}</div>
          ${traceHTML(wp)}
          ${nivelEsperadoBox('writing', f.lvl)}
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:6px">
            <label style="font-size:.78rem">Grade <input type="number" min="0" max="20" value="${w.score!=null?w.score:''}" style="width:4rem"
              onchange="unitCalificar('${w.id}',this.value,null)"></label>
            <input type="text" placeholder="comment for the student" value="${esc(w.feedback||'')}" style="flex:1 1 200px"
              onchange="unitCalificar('${w.id}',null,this.value)">
          </div></details>` : '<span class="muted">no writing</span>'}</td>
      <td style="text-align:center;white-space:nowrap"><b>${f.a.score}/${f.a.total}</b> · ${pct}%
        <span class="badge" style="background:${b[1]}">${b[0]}</span></td>
      <td class="muted" style="white-space:nowrap">${fecha(f.a.submitted_at)} · ${Math.round((f.a.duration_sec||0)/60)} min</td>
    </tr>`;
  };
  filas.forEach(f=>{ if(!(f.a.detail&&f.a.detail.papers)) sinDesglose++; });
  return `<div class="card" style="margin-top:14px">
    <h2 style="font-size:1.05rem;margin-top:0">📊 Results · ${filas.length} attempt${filas.length===1?'':'s'}</h2>
    <p class="muted" style="font-size:.82rem">One mark per paper: <b>Reading and Use of English</b> (parts 1-5, 33 questions) and <b>Listening</b> (part 6, 6 questions)
      are marked automatically; you mark the <b>Writing</b> here (out of 20), with the text in front of you.
      Scale: <b>AD</b> ≥ 90 % · <b>A</b> ≥ 70 % · <b>B</b> ≥ 55 % · <b>C</b> below (Writing: AD 18-20 · A 14-17 · B 11-13 · C 0-10).${sinDesglose
      ? ` <b>${sinDesglose}</b> attempt${sinDesglose===1?'':'s'} taken before 12 Sep 2026 only ${sinDesglose===1?'has':'have'} the total (—).`:''}</p>
    <div style="margin:0 0 10px">${unitBotonPublica(Object.values(writing),'Writing marks','unitExamPanel','the students')}</div>
    ${filas.length?`<div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Student</th><th>Exam</th><th style="text-align:center">📖 Reading &amp; Use of English</th><th style="text-align:center">🎧 Listening</th><th>✍️ Writing</th><th style="text-align:center">Total (39 q.)</th><th>Date</th></tr></thead>
      <tbody>${filas.map(fila).join('')}</tbody></table></div>`:'<p class="muted">No one has taken it yet.</p>'}
    ${sinRendir.length?`<p class="muted" style="font-size:.82rem;margin-top:10px"><b>Have not taken the official exam (${sinRendir.length}):</b>
      ${sinRendir.map(p=>esc(p.full_name||'')+(p.section?' ('+esc(String(p.section))+')':'')).join(', ')}</p>`:''}
  </div>`;
}
window._uexUntil=(v)=>{ uexCtl.until=v||''; unitExamPanel(); };
async function _uexWrite(filas){
  try{
    const r=await sb.from('reader_exam_access').upsert(filas);
    if(r.error) throw r.error;
    unitExamPanel();
  }catch(e){ alert('Could not save: '+(e.message||e)); }
}
window._uexToggle=(kind,niveles,scope,open)=>{
  const now=new Date().toISOString(), until=open?_rdrUntilISO(uexCtl.until):null;
  _uexWrite(niveles.split(',').map(l=>({key:uexKey(kind,l),scope,school_year:SCHOOL_YEAR_NOW,
    unlocked:!!open,closes_at:until,updated_at:now})));
};
window._uexTime=async(kind,niveles,scope,mins)=>{
  const ls=niveles.split(',');
  const { data } = await sb.from('reader_exam_access').select('key,scope,unlocked,extra_min')
    .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope).in('key',ls.map(l=>uexKey(kind,l)));
  const cur=data||[];
  const base=cur.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
  const val=mins===0?0:Math.min(180,base+mins);
  const now=new Date().toISOString();
  _uexWrite(ls.map(l=>{ const p=cur.find(r=>r.key===uexKey(kind,l));
    return {key:uexKey(kind,l),scope,school_year:SCHOOL_YEAR_NOW,
            unlocked:!!(p&&p.unlocked),extra_min:val,updated_at:now}; }));
};

window._ctlTime=async(ch,scope,mins)=>{
  const { data } = await sb.from('reader_exam_access').select('key,scope,unlocked,extra_min')
    .eq('school_year',SCHOOL_YEAR_NOW).eq('scope',scope);
  const cur=(data||[]).filter(r=>String(r.key).indexOf(examCtl.book+':')===0 && /ch(\d+)$/.test(r.key) && +/ch(\d+)$/.exec(r.key)[1]===ch);
  const base=cur.reduce((m,r)=>Math.max(m,r.extra_min||0),0);
  const val=mins===0?0:Math.min(180,base+mins);
  const now=new Date().toISOString();
  _ctlWrite(RDR_LEVELS.map(l=>{ const p=cur.find(r=>r.key===examCtl.book+':'+l+':ch'+ch);
    return {key:examCtl.book+':'+l+':ch'+ch,scope,school_year:SCHOOL_YEAR_NOW,
            unlocked:!!(p&&p.unlocked),extra_min:val,updated_at:now}; }));
};

/* Lunes de la semana de una fecha, en ISO corto. Sirve para agrupar por semana
   igual que hace el panel de tiempo de pantalla. */
function _rdrLunes(iso){
  const d=new Date(iso); const dia=(d.getDay()+6)%7;          // 0 = lunes
  d.setDate(d.getDate()-dia); d.setHours(0,0,0,0);
  return d.toISOString().slice(0,10);
}
/* ⏱ Tiempo de lectura — cuanto rato pasa cada alumno LEYENDO. Solo cuenta la
   pantalla "Read along": es la unica que registra tiempo de lectura (actividad
   `<obra>-<nivel>-ch<n>-read`, sin nota). Los ejercicios y el examen tienen su
   propio duration_sec, pero eso es resolver, no leer, y va en su columna. */
async function readerTimePanel(){
  state._tab='readers';
  $('#main').innerHTML=`<h1>📖 Reading controls</h1>${_readerTabs()}<p class="muted">Loading…</p>`;
  const grades=(state.profile&&state.profile.role==='admin')?GRADES:teacherAllowedGrades();
  const gradeIds=new Set(grades.map(g=>String(g.id)));
  const [{data:studs},{data:atts}]=await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section, grades(name)').eq('role','student'),
    sb.from('activity_attempts').select('student_id,activity,duration_sec,submitted_at').or(_rdrOr()).limit(5000)
  ]);
  await loadReaderAssignments();
  const years=[...new Set([...(atts||[]).map(_attYear).filter(Boolean), SCHOOL_YEAR_NOW])].sort((a,b)=>b-a);

  /* intentos de lectura del año elegido, por alumno */
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(readerFilter.year);
  const books=_rdrFilterBooks(grades), bset=new Set(books);
  const porAlumno={};
  (atts||[]).forEach(a=>{
    if(_attYear(a)!==+readerFilter.year) return;
    const m=_RDR_ACT_RX.exec(String(a.activity||''));
    if(!m || m[4]!=='read') return;                     // solo "Read along"
    const obra=m[1]; if(!READER_META[obra]) return;
    if(!bset.has(obra)) return;                         // solo la obra del trimestre
    const r=porAlumno[a.student_id]||(porAlumno[a.student_id]={secs:0,sem:{},caps:new Set(),obras:new Set(),ult:null,sesiones:0});
    const secs=a.duration_sec||0;
    r.secs+=secs; r.sesiones++;
    r.sem[_rdrLunes(a.submitted_at)]=(r.sem[_rdrLunes(a.submitted_at)]||0)+secs;
    r.caps.add(obra+'-'+m[3]); r.obras.add(obra);
    if(!r.ult || a.submitted_at>r.ult) r.ult=a.submitted_at;
  });

  let list=(studs||[]).filter(p=>gradeIds.has(String(p.grade_id)));
  if(readerFilter.grade)   list=list.filter(p=>String(p.grade_id)===String(readerFilter.grade));
  if(readerFilter.section) list=list.filter(p=>p.section===readerFilter.section);
  const data=list.map(p=>({p, r:porAlumno[p.id]||{secs:0,sem:{},caps:new Set(),obras:new Set(),ult:null,sesiones:0}}))
                 .sort((a,b)=> b.r.secs-a.r.secs || (a.p.full_name||'').localeCompare(b.p.full_name||''));

  /* las 6 ultimas semanas con actividad, o las 6 ultimas del calendario */
  let semanas=[...new Set(Object.values(porAlumno).flatMap(r=>Object.keys(r.sem)))].sort().slice(-6);
  if(!semanas.length){ const h=new Date(); semanas=[_rdrLunes(h.toISOString())]; }

  const leen=data.filter(d=>d.r.secs>0);
  const cero=data.length-leen.length;
  const totalSec=data.reduce((s,d)=>s+d.r.secs,0);
  const mediaSec=leen.length?Math.round(totalSec/leen.length):0;
  const capsTotal=new Set(data.flatMap(d=>[...d.r.caps])).size;
  const tope=Math.max(1,...data.map(d=>d.r.secs));

  const stats=`<div class="grid cols-3" style="margin-bottom:12px">
    <div class="stat"><div class="l">⏱ Total read</div><div class="n" style="font-size:1.5rem">${_rdrTime(totalSec)}</div>
      <div class="muted" style="font-size:.8rem">${leen.length} of ${data.length} students have read</div></div>
    <div class="stat"><div class="l">Average per student who reads</div><div class="n" style="font-size:1.5rem">${_rdrTime(mediaSec)}</div>
      <div class="muted" style="font-size:.8rem">does not count those at zero</div></div>
    <div class="stat"><div class="l">Have not read anything</div><div class="n">${cero}</div>
      <div class="muted" style="font-size:.8rem">${capsTotal} chapter(s) opened in total</div></div>
  </div>`;

  const cab=semanas.map(s=>`<th style="text-align:center" title="Week of ${s}">${s.slice(5).replace('-','/')}</th>`).join('');
  const filas=data.map(d=>{
    const pct=Math.round(d.r.secs/tope*100);
    const barra=d.r.secs
      ? `<div style="display:flex;align-items:center;gap:8px">
           <div style="flex:1;min-width:60px;height:8px;background:var(--bg);border-radius:6px;overflow:hidden">
             <div style="width:${pct}%;height:100%;background:var(--blue)"></div></div>
           <b style="white-space:nowrap">${_rdrTime(d.r.secs)}</b></div>`
      : '<span class="muted">— has not read</span>';
    return `<tr${d.r.secs?'':' style="opacity:.6"'}>
      <td><b>${esc(d.p.full_name||'')}</b></td>
      <td><span class="badge grade">${esc(d.p.grades?.name||'—')}</span>${d.p.section?' <span class="badge">'+esc(d.p.section)+'</span>':''}</td>
      ${semanas.map(s=>{ const sec=d.r.sem[s]||0, m=Math.round(sec/60);
        // menos de un minuto no es cero: se ve '<1' para no confundirlo con no leer
        const txt = m ? m : (sec ? '&lt;1' : '·');
        return `<td style="text-align:center${m?'':';color:var(--muted)'}">${txt}</td>`; }).join('')}
      <td style="min-width:150px">${barra}</td>
      <td style="text-align:center">${d.r.caps.size||'<span class="muted">·</span>'}</td>
      <td class="muted" style="font-size:.82rem;white-space:nowrap">${d.r.ult?new Date(d.r.ult).toLocaleDateString():'—'}</td>
    </tr>`;
  }).join('');

  const aviso = totalSec ? '' : `<div class="note warn" style="margin-top:12px">No one in the filter has
    used <b>📖 Read along</b> yet, which is the only screen that measures reading. If students go straight
    to the activities or the control, or read on paper or in another tab, this will show zero even though they are
    working on the book: check it alongside <b>📊 Grades and times</b>.</div>`;

  $('#main').innerHTML=`<h1>📖 Reading controls</h1>${_readerTabs()}
    ${_readerFilterBar(grades,years,books)}
    ${stats}
    <div class="note">Minutes in <b>Read along</b>, reading with audio. Exercises and the control are not counted
      (that is solving, not reading), nor are visits under 20 seconds, and a forgotten tab cuts off
      at 45 minutes. Recording started on <b>August 25, 2026</b>: there is no
      data for anyone before that date.</div>
    ${aviso}
    <div class="card" style="padding:0;overflow-x:auto;margin-top:12px"><table>
      <thead><tr><th>Student</th><th>Grade</th>${cab}<th>Total read</th><th title="Distinct chapters opened">Ch.</th><th>Last time</th></tr></thead>
      <tbody>${filas||'<tr><td colspan="9" class="muted">No students match this filter.</td></tr>'}</tbody></table></div>`;
}
async function readerStatsPanel(detailId){
  state._tab='readers';
  if(readerTab==='control') return readerControlPanel();
  if(readerTab==='tiempo') return readerTimePanel();
  $('#main').innerHTML=`<h1>📖 Reading controls</h1><p class="muted">Loading…</p>`;
  const grades=(state.profile&&state.profile.role==='admin')?GRADES:teacherAllowedGrades();
  const gradeIds=new Set(grades.map(g=>String(g.id)));
  const [{data:studs},{data:atts}]=await Promise.all([
    sb.from('profiles').select('id,full_name,grade_id,section, grades(name)').eq('role','student'),
    sb.from('activity_attempts').select('student_id,activity,score,total,duration_sec,submitted_at').or(_rdrOr()).limit(5000)
  ]);
  await loadReaderAssignments();
  /* Los años que existen en los datos, para poder mirar atrás: los alumnos de
     un grado cambian cada año, así que las notas se leen año por año. */
  const years=[...new Set([...(atts||[]).map(_attYear).filter(Boolean), SCHOOL_YEAR_NOW])].sort((a,b)=>b-a);
  if(!readerFilter.term) readerFilter.term=_rdrDefaultTerm(readerFilter.year);
  /* El trimestre manda sobre todo lo demás: solo entran los intentos de la obra
     que se lee en él, así que la nota, el tiempo de lectura y los ejercicios son
     los de ese trimestre y no se mezclan con los de la obra anterior. */
  const books=_rdrFilterBooks(grades), bset=new Set(books);
  const one=books.length===1?books[0]:null;      // lo normal: un salón, una obra
  const meta=one?READER_META[one]:null;
  const cab=`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <h1 style="margin:0">📖 Reading controls</h1>
      <a class="btn sm ghost" href="attwn-exam.html" style="text-decoration:none">🔓 Open / close controls →</a>
    </div>
    ${_readerTabs()}`;
  if(!books.length){
    $('#main').innerHTML=`${cab}
      ${_readerFilterBar(grades,years,books)}
      <div class="note info">No class in this filter has a book assigned for the <b>${_rdrTermLab(readerFilter.term)}</b> of ${esc(readerFilter.year)}.
        Each class reads <b>one book per term</b>: they are chosen in <b>📚 Library → What each class reads</b>.</div>`;
    return;
  }
  const ofYear=(atts||[]).filter(a=>_attYear(a)===+readerFilter.year && bset.has(_rdrBookOfAtt(a)));
  const byStu={};
  ofYear.forEach(a=>{ (byStu[a.student_id]||(byStu[a.student_id]=[])).push(a); });
  let list=(studs||[]).filter(p=>gradeIds.has(String(p.grade_id)));
  if(readerFilter.grade)   list=list.filter(p=>String(p.grade_id)===String(readerFilter.grade));
  if(readerFilter.section) list=list.filter(p=>p.section===readerFilter.section);
  list.sort((a,b)=>(a.full_name||'').localeCompare(b.full_name||''));
  const data=list.map(p=>({p, r:readerReport(byStu[p.id]||[])}));
  const gradeOf=d=> one ? (d.r.books[one]?d.r.books[one].grade:null) : d.r.overall;
  const active=data.filter(d=>gradeOf(d)!=null);
  const clase=_rdrAvg(data.map(gradeOf));
  const sumRead=data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].readSec:0):d.r.readSec),0);
  const sumAct =data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].actSec:0):d.r.actSec),0);
  const stats=`<div class="grid cols-3" style="margin-bottom:12px">
    <div class="stat"><div class="l">Class final grade</div><div class="n">${clase!=null?clase+'%':'—'}</div>
      <div class="muted" style="font-size:.8rem">${clase!=null?_rdr20(clase)+'/20':'no controls yet'}</div></div>
    <div class="stat"><div class="l">Students with a grade</div><div class="n">${active.length}</div>
      <div class="muted" style="font-size:.8rem">of ${data.length} in the filter</div></div>
    <div class="stat"><div class="l">Controls taken</div><div class="n">${data.reduce((s,d)=>s+(one?(d.r.books[one]?d.r.books[one].tries:0):d.r.tries),0)}</div>
      <div class="muted" style="font-size:.8rem">attempts, best one counts</div></div>
    <div class="stat"><div class="l">⏱ Reading with audio</div><div class="n" style="font-size:1.5rem">${_rdrTime(sumRead)}</div>
      <div class="muted" style="font-size:.8rem">+ ${_rdrTime(sumAct)} in exercises</div></div>
  </div>`;
  const head = one
    ? `<th>Student</th><th>Grade</th>${Array.from({length:meta.chapters},(_,i)=>`<th title="Chapter ${i+1}">${i+1}</th>`).join('')}<th>Taken</th><th title="Average of chapters taken">Final grade</th><th>⏱ Reading</th><th>⏱ Exercises</th><th></th>`
    : `<th>Student</th><th>Grade</th>${books.map(id=>`<th>${READER_META[id].icon} ${READER_META[id].short}</th>`).join('')}<th>Final grade</th><th>⏱ Reading</th><th>⏱ Exercises</th><th></th>`;
  const rows=data.map(d=>{
    const b=one?d.r.books[one]:null;
    const cells = one
      ? Array.from({length:meta.chapters},(_,i)=>{ const c=b&&b.chapters[i+1];
          return `<td style="text-align:center">${c&&c.best!=null?`<b>${c.best}</b>`:'<span class="muted">·</span>'}</td>`; }).join('')
        +`<td class="muted" style="text-align:center">${b?b.done:0}/${meta.chapters}</td><td>${_rdrMark(b?b.grade:null)}</td>`
        +`<td>${_rdrTime(b&&b.readSec)}</td><td>${_rdrTime(b&&b.actSec)}</td>`
      : books.map(id=>{ const bk=d.r.books[id];
          return `<td>${_rdrMark(bk?bk.grade:null)}${bk?` <span class="muted" style="font-size:.75rem">${bk.done}/${READER_META[id].chapters}</span>`:''}</td>`; }).join('')
        +`<td>${_rdrMark(d.r.overall)}</td><td>${_rdrTime(d.r.readSec)}</td><td>${_rdrTime(d.r.actSec)}</td>`;
    return `<tr><td><b>${esc(d.p.full_name||'')}</b></td>
      <td><span class="badge grade">${esc(d.p.grades?.name||'—')}</span>${d.p.section?' <span class="badge">'+esc(d.p.section)+'</span>':''}</td>
      ${cells}
      <td><button class="btn sm ghost" onclick="window._readerDetail('${d.p.id}')">Details →</button></td></tr>`;
  }).join('');
  /* La obra del trimestre, capítulo a capítulo: qué saca la clase en cada
     control y cuántos lo han rendido. La NOTA FINAL es el promedio de los
     capítulos AVANZADOS: los que todavía no se han rendido no bajan la nota. */
  const chapterTable=(()=>{
    if(!one) return '';
    const chs=Array.from({length:meta.chapters},(_,i)=>{
      const n=i+1, cs=data.map(d=>{ const b=d.r.books[one]; return b?b.chapters[n]:null; });
      const notas=cs.map(c=>c?c.best:null).filter(v=>v!=null);
      return {n, avg:_rdrAvg(notas), done:notas.length,
              readSec:cs.reduce((s,c)=>s+((c&&c.readSec)||0),0),
              actSec: cs.reduce((s,c)=>s+((c&&c.actSec)||0),0),
              tries:  cs.reduce((s,c)=>s+((c&&c.tries)||0),0)};
    });
    const avanzados=chs.filter(c=>c.done).length;
    const filas=chs.map(c=>`<tr${c.done?'':' style="opacity:.55"'}>
      <td><b>Ch. ${c.n}</b></td>
      <td>${_rdrMark(c.avg)}</td>
      <td style="text-align:center">${c.done?c.done+' of '+data.length:'<span class="muted">not taken</span>'}</td>
      <td class="muted" style="text-align:center">${c.tries||'—'}</td>
      <td>${_rdrTime(c.readSec)}</td>
      <td>${_rdrTime(c.actSec)}</td></tr>`).join('');
    return `<h2 style="font-size:16px;color:var(--blue-d);margin:20px 0 8px">${meta.icon} ${esc(meta.title)} — chapter by chapter</h2>
      <p class="muted" style="margin:0 0 8px;font-size:.85rem">Average grade of the class in each control. The <b>final grade</b> is the average of the
        <b>${avanzados} chapter(s) covered</b> out of the ${meta.chapters} in the book: those not yet taken do not count.</p>
      <div class="card" style="padding:0;overflow-x:auto"><table>
        <thead><tr><th style="min-width:110px">Chapter</th><th>Class average grade</th><th>Taken by</th><th title="Attempts, best one counts">Attempts</th><th>⏱ Reading</th><th>⏱ Exercises</th></tr></thead>
        <tbody>${filas}</tbody>
        <tfoot><tr style="background:#f1f5f9"><td><b>Final grade</b></td>
          <td>${_rdrMark(clase)}</td>
          <td class="muted" style="text-align:center">${avanzados}/${meta.chapters} chapters</td>
          <td class="muted" style="text-align:center">${chs.reduce((s,c)=>s+c.tries,0)}</td>
          <td>${_rdrTime(sumRead)}</td><td>${_rdrTime(sumAct)}</td></tr></tfoot>
      </table></div>`;
  })();
  const detail=(()=>{
    if(!detailId) return '';
    const d=data.find(x=>String(x.p.id)===String(detailId));
    if(!d) return '';
    const bks=books.filter(id=>d.r.books[id]);
    return `<div class="card"><div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <h2 style="margin:0">${esc(d.p.full_name||'')} — chapter by chapter</h2>
        <div>${_rdrMark(gradeOf(d))} <span class="muted" style="font-size:.82rem">final grade for the term</span></div>
      </div>
      <p class="muted" style="margin:4px 0 0;font-size:.85rem">⏱ ${_rdrTime(d.r.readSec)} of reading with audio · ${_rdrTime(d.r.actSec)} of exercises · ${_rdrTime(d.r.examSec)} in controls.</p>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line);font-size:12.5px;color:#475569">
        <b>Only for ${esc((d.p.full_name||'').split(' ')[0])}:</b> open a control that their class has closed (make-up) or give them extra minutes.
        <div class="row" style="gap:6px;margin-top:6px;align-items:center;flex-wrap:wrap">
          <select id="rdrStuBook" style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
            ${books.map(id=>`<option value="${id}">${READER_META[id].icon} ${esc(READER_META[id].short)}</option>`).join('')}
          </select>
          <select id="rdrStuCh" style="font-family:inherit;font-size:12.5px;padding:5px 7px;border:1.5px solid var(--line);border-radius:8px">
            ${Array.from({length:one?meta.chapters:10},(_,i)=>`<option value="${i+1}">Ch. ${i+1}</option>`).join('')}
          </select>
          <button class="btn sm" onclick="window._stuCtl('${d.p.id}','open')">🔓 open the control for them</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','close')">🔒 close it for them</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','plus5')">⏱ +5 min</button>
          <button class="btn sm ghost" onclick="window._stuCtl('${d.p.id}','clear')">✕ remove their own rules</button>
        </div>
      </div></div>
      ${bks.length?bks.map(id=>_rdrChapterTable(id,d.r.books[id])).join(''):'<div class="note info">This student has not opened the book for the term yet.</div>'}`;
  })();
  $('#main').innerHTML=`${cab}
    <p class="muted" style="margin-top:-6px">The grade for each chapter is its control (best attempt) and the <b>final grade is the average of the chapters covered</b>. Reading time with audio and exercise time are shown alongside as evidence of work: they do not change the grade.
      This shows the <b>${_rdrTermLab(readerFilter.term)}</b> of the school year <b>${esc(readerFilter.year)}</b>${one?` — ${meta.icon} <b>${esc(meta.title)}</b>, the book assigned for that term`:''}.</p>
    ${_readerFilterBar(grades,years,books)}
    ${stats}
    <div class="card" style="padding:0;overflow-x:auto"><table>
      <thead><tr>${head}</tr></thead>
      <tbody>${rows||`<tr><td colspan="12" class="center muted">No students for this filter.</td></tr>`}</tbody>
    </table>
    <div class="muted" style="padding:8px 14px;font-size:.82rem">${data.length} student(s) · ${active.length} with a grade${one?' in '+esc(meta.title):''}</div></div>
    ${chapterTable}
    ${detail}`;
}


/* ---------------------------------------------------------------
   Nordic Little Readers — los cuentos de primaria.
   Los readers del portal empiezan en A2 y no sirven de G1 a G4.
   Estos son cuentos propios de Pre-A1/A1 con los personajes del
   curso; viven en nis-fun/readers y aqui solo se listan.
----------------------------------------------------------------- */
async function littleReadersPanel(){
  const main=$('#main');
  main.innerHTML='<div class="card"><p class="muted">Loading the stories…</p></div>';
  let libros=[];
  try{
    const r=await fetch('nis-fun/readers/data/index.json',{cache:'no-cache'});
    if(r.ok) libros=(await r.json()).libros||[];
  }catch(e){}
  if(!libros.length){
    main.innerHTML=`<div class="card"><h1>🧒 Nordic Little Readers</h1>
      <p class="err">Could not read the list of stories.</p></div>`;
    return;
  }
  const porGrado={};
  libros.forEach(l=>(porGrado[l.grado]=porGrado[l.grado]||[]).push(l));
  const bloques=Object.keys(porGrado).sort().map(g=>`
    <h2 style="font-size:15px;color:var(--blue-d);margin:20px 0 8px">${esc(g)} · ${esc(porGrado[g][0].nivel)}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px">
      ${porGrado[g].map(l=>`
        <a href="nis-fun/readers/?id=${esc(l.id)}" target="_blank"
           style="text-decoration:none;color:inherit;border:1px solid var(--line);border-radius:14px;
                  overflow:hidden;background:#fff;display:block">
          <img src="nis-fun/readers/${esc(l.portada)}" alt=""
               style="width:100%;aspect-ratio:16/10;object-fit:cover;display:block"
               onerror="this.style.display='none'">
          <div style="padding:10px 12px 12px">
            <b style="font-size:15px">${esc(l.titulo)}</b>
            <div class="muted" style="font-size:.85rem">${esc(l.objetivo)}</div>
            <div style="font-size:.78rem;font-weight:700;color:var(--blue-d);margin-top:5px">
              ${l.paginas} pages</div>
          </div></a>`).join('')}
    </div>`).join('');

  main.innerHTML=`<div class="card">
    <h1>🧒 Nordic Little Readers</h1>
    <p class="muted">Pre-A1 and A1 stories for primary, with the characters from Fun for Nordic.
      Each one has eight pages with illustrations and audio, and an activity at the end.
      The readers in <b>📖 Library</b> (Tom Sawyer, Treasure Island…) start at A2 and
      are for the grades above.</p>
    ${bloques}
    <p class="muted" style="margin-top:18px;font-size:.85rem">The titles the
      Scope &amp; Sequence calls for at these grades (The Very Hungry Caterpillar, Dear Zoo,
      Flat Stanley…) are under copyright and remain paper library reading:
      these stories meet the same objective with material created by the school.</p>
  </div>`;
}

/* ---------------------------------------------------------------
   Fun for Nordic — lo que entregan los alumnos
   Escritura, grabaciones de voz y el repaso final de cada unidad,
   para que el profesor las oiga y las califique.
---------------------------------------------------------------- */
/* Filtro por nivel de las entregas. Vive fuera de la funcion para que no se
   pierda al repintar el panel tras calificar. */
let funFiltro = '';
window._funFiltro = n => { funFiltro = (funFiltro===n ? '' : n); funNordicPanel(); };

async function funNordicPanel(){
  const main = $('#main');
  main.innerHTML = '<div class="card"><p class="muted">Loading submissions…</p></div>';

  // Las dos series: Fun for Nordic (primaria) y Nordic Ascent (secundaria).
  const NIVELES = ['starters','movers','flyers', ...SEC_ORDEN];
  const CURSO = n => FUN_CURSOS[n] || SEC_CURSOS[n];
  const COLS = 'id,student_id,level,unit,activity_code,kind,payload,audio_path,duration_sec,score,feedback,reviewed_at,created_at';
  // Solo lo que se corrige: las filas 'progress' (tiempo de uso) y 'grammar_lab'
  // (Grammar Lab de secundaria) tambien viven en fun_submissions y no van aqui.
  const KINDS = ['writing','speaking','selfcheck'];
  let q = sb.from('fun_submissions').select(COLS).in('kind', KINDS).order('created_at', { ascending: false }).limit(400);
  if (funFiltro) q = q.eq('level', funFiltro);
  // el filtro acota la consulta (hay tope de 400), pero las cuentas de las
  // pastillas se piden aparte para que sigan siendo del total de cada nivel
  const [res, ...cuentas] = await Promise.all([
    q,
    ...NIVELES.map(n => sb.from('fun_submissions').select('id', { count:'exact', head:true }).in('kind', KINDS).eq('level', n))
  ]);
  const { data, error } = res;
  const nPorNivel = Object.fromEntries(NIVELES.map((n,i)=>[n, cuentas[i].count||0]));
  const total = NIVELES.reduce((a,n)=>a+nPorNivel[n], 0);

  const pastilla = (val,label,n) => `<button class="btn sm ${funFiltro===val?'':'ghost'}"
      onclick="window._funFiltro('${val}')">${label} <b>${n}</b></button>`;
  const chips = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      ${pastilla('','🧸 All',total)}
      ${NIVELES.map(n=>pastilla(n, CURSO(n).em+' '+(FUN_CURSOS[n] ? n[0].toUpperCase()+n.slice(1) : CURSO(n).curso), nPorNivel[n])).join('')}
    </div>`;

  const marco = cuerpo => `<div class="card">
    <h2>🧸 Fun for Nordic · 🧗 Nordic Ascent — student submissions</h2>
    <p class="muted">What students write and record in Starters, Movers and Flyers (primary) and in
      A1 Foundations, A2 Key, B1 Preliminary, B2 First and C1 Advanced (secondary), most
      recent first. Give a score from 0 to 10 and a comment; it saves automatically.</p>
    ${chips}${cuerpo}</div>`;

  if (error){ main.innerHTML = marco(`<p class="err">Could not load the submissions: ${esc(error.message)}</p>`); return; }
  if (!data || !data.length){
    main.innerHTML = marco(`<p class="muted">${funFiltro
      ? 'There are no submissions yet for <b>'+esc((CURSO(funFiltro)||{curso:funFiltro}).curso)+'</b>.'
      : 'There are no submissions yet. They will appear here as soon as students write or record in the course.'}</p>`);
    return;
  }

  // nombres de los alumnos, en una sola consulta
  const ids = [...new Set(data.map(r => r.student_id))];
  const { data: gente } = await sb.from('profiles').select('id,full_name,grade_id,section').in('id', ids);
  const quien = Object.fromEntries((gente||[]).map(p => [p.id, p]));

  const ICONO = { writing:'✍️', speaking:'🎙️', selfcheck:'✅' };
  const NIVEL = { starters:'Starters', movers:'Movers', flyers:'Flyers', a1:'A1', ket:'KET', pet:'PET', b2f:'B2 First', c1a:'C1' };

  const fila = r => {
    const p = quien[r.student_id] || {};
    const nombre = p.full_name || '(student)';
    const grado = p.grade_id ? `G${p.grade_id}${p.section||''}` : '';
    const cuerpo = r.kind === 'speaking'
      ? `<button class="btn small" onclick="funOirAudio('${esc(r.audio_path||'')}', this)">▶ Listen</button>
         ${r.duration_sec ? `<span class="muted"> ${r.duration_sec}s</span>` : ''}`
      : r.kind === 'selfcheck'
        ? `<span class="muted">${((r.payload||{}).puede||[]).length} / ${(r.payload||{}).total||0} checked</span>`
        : `<span>${esc(((r.payload||{}).respuestas||[]).join(' · ')).slice(0,140)}</span>`;
    return `<tr>
      <td class="col-name">${esc(nombre)} <span class="muted">${grado}</span></td>
      <td>${NIVEL[r.level]||r.level} · U${r.unit} · ${esc(r.activity_code)}</td>
      <td>${ICONO[r.kind]||''} ${r.kind}</td>
      <td>${cuerpo}</td>
      <td><input type="number" min="0" max="10" value="${r.score==null?'':r.score}"
            style="width:4rem" onchange="funCalificar('${r.id}', this.value, null)"></td>
      <td class="col-flex"><input type="text" placeholder="comment" value="${esc(r.feedback||'')}"
            onchange="funCalificar('${r.id}', null, this.value)"></td>
      <td class="muted">${r.reviewed_at ? '✔' : '—'}</td>
    </tr>`;
  };

  main.innerHTML = marco(`<div style="overflow-x:auto"><table class="tbl">
      <thead><tr><th>Student</th><th>Unit</th><th>Type</th><th>Submission</th>
        <th>Grade</th><th>Comment</th><th>Seen</th></tr></thead>
      <tbody>${data.map(fila).join('')}</tbody></table></div>`);
}

/* Los audios están en un bucket privado: se pide un enlace temporal. */
window.funOirAudio = async function(ruta, boton){
  if (!ruta) return;
  const { data, error } = await sb.storage.from('fun-speaking').createSignedUrl(ruta, 3600);
  if (error || !data){ boton.textContent = 'Not available'; return; }
  const a = document.createElement('audio');
  a.controls = true; a.src = data.signedUrl; a.style.maxWidth = '15rem';
  boton.replaceWith(a);
  a.play().catch(()=>{});
};

window.funCalificar = async function(id, nota, comentario){
  const cambio = { reviewed_at: new Date().toISOString(), reviewed_by: (state.profile && state.profile.id) || null };
  if (nota !== null && nota !== '') cambio.score = Number(nota);
  if (comentario !== null) cambio.feedback = comentario;
  await sb.from('fun_submissions').update(cambio).eq('id', id);
};