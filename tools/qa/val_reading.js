/* Valida todos los tests de Reading & Use of English de mocks-cambridge (estructura + claves + coherencia). */
const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync(require('path').resolve(__dirname,'..','..','mocks-cambridge','reading-quiz.app-data.js'),'utf8');
const noop=()=>null; const el={style:{},classList:{add:noop,remove:noop,toggle:noop},dataset:{}}; Object.assign(el,{addEventListener:noop,setAttribute:noop,appendChild:noop,querySelector:()=>el,querySelectorAll:()=>[],getElementById:()=>el,createElement:()=>el,body:el,documentElement:el});
const ctx={document:el,localStorage:{getItem:()=>null,setItem:noop},navigator:{},location:{search:'',hash:''},console:{log:noop,warn:noop,error:noop},setTimeout:noop,setInterval:noop,requestAnimationFrame:noop,matchMedia:()=>({matches:false,addEventListener:noop}),Image:function(){return el},scrollTo:noop}; ctx.window=ctx; vm.createContext(ctx);
try{ vm.runInContext(src+'\n;this.__X={EXAMS,PRACTICE2,PRACTICE3,MOCK01,MOCK02,MOCK03,PRACTICE_MORE,MOCKS_MORE};',ctx);}catch(e){ if(!ctx.__X){console.log('PARSE ERROR',e.message);process.exit(1);} }
const X=ctx.__X;
const tests=[];
for(const [name,S] of [['Practice 1',X.EXAMS],['Practice 2',X.PRACTICE2],['Practice 3',X.PRACTICE3],['MOCK 1',X.MOCK01],['MOCK 2',X.MOCK02],['MOCK 3',X.MOCK03]]) for(const lv of Object.keys(S||{})) tests.push([lv+' '+name,lv,S[lv].Reading||S[lv]]);
for(const [name,S] of [['Practice',X.PRACTICE_MORE],['MOCK',X.MOCKS_MORE]]) for(const lv of Object.keys(S||{})) (S[lv].Reading||[]).forEach((t,i)=>tests.push([lv+' '+name+' '+(i+4),lv,t]));
const norm=s=>String(s).toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();
const gapsIn=s=>(String(s||'').match(/\(\d+\)\s*_{2,}|_{3,}/g)||[]).length;
let total=0,bad=0; const report=[]; const stats={parts:0,qs:0};
for(const [label,lv,t] of tests){ const pr=[]; total++;
  if(!t||!t.parts){ pr.push('sin parts'); report.push([label,pr]); bad++; continue; }
  const partsSeen=new Set(); let nq=0;
  t.parts.forEach((p,pi)=>{ const tag=p.part||('part '+(pi+1)); stats.parts++; if(partsSeen.has(tag)) pr.push(tag+': nombre de parte repetido'); partsSeen.add(tag);
    const txt=JSON.stringify(p); if(/\\\\u00[0-9a-f]{2}/i.test(txt)) pr.push(tag+': escape u00xx literal'); if(/:\s*(null|"undefined"|"null")/.test(txt)) pr.push(tag+': campo nulo/undefined');
    if(!p.instructions&&p.type!=='writing') pr.push(tag+': sin instrucciones');
    if(p.type==='writing'){ if(!Array.isArray(p.prompts)||!p.prompts.length) pr.push(tag+': writing sin prompts'); return; }
    const qs=p.questions||[]; if(!qs.length){ pr.push(tag+': 0 preguntas'); return; } nq+=qs.length; stats.qs+=qs.length;
    if(p.type==='clozeMC'||p.type==='clozeOpen'){ const g=gapsIn(p.body); if(!p.body) pr.push(tag+': sin body'); else if(g!==qs.length) pr.push(tag+`: ${g} huecos en el texto pero ${qs.length} preguntas`); }
    if(p.type==='wordform'){ const rows=p.rows||[]; const roots=rows.filter(r=>r.root).length; const g=rows.reduce((a,r)=>a+gapsIn(r.text),0); if(roots!==qs.length) pr.push(tag+`: ${roots} palabras en mayúsculas pero ${qs.length} preguntas`); if(g!==qs.length) pr.push(tag+`: ${g} huecos pero ${qs.length} preguntas`); }
    if(p.type==='match'){ const labels=(p.bank&&p.bank.labels)||[]; if(!labels.length) pr.push(tag+': match sin bank.labels'); if(p.bank&&p.bank.texts&&p.bank.texts.length!==labels.length) pr.push(tag+': bank.labels y bank.texts no cuadran'); if(!p.passage&&!(p.sources&&p.sources.length)) pr.push(tag+': match sin passage ni sources');
      if(p.sources&&p.bank&&!p.bank.texts){ const sl=p.sources.map(s=>s.label); labels.forEach(L=>{ if(!sl.includes(L)) pr.push(tag+`: la etiqueta ${L} del bank no tiene source`); }); } }
    const rootsList=(p.rows||[]).filter(r=>r.root).map(r=>r.root);
    qs.forEach((q,qi)=>{ const qt=`${tag} q${qi+1}`;
      if(p.type==='mc'||p.type==='clozeMC'){ if(!Array.isArray(q.options)||q.options.length<2) pr.push(qt+': opciones inválidas'); else { if(typeof q.answer!=='number'||q.answer<0||q.answer>=q.options.length) pr.push(qt+`: answer=${JSON.stringify(q.answer)} fuera de ${q.options.length} opciones`); if(new Set(q.options.map(norm)).size!==q.options.length) pr.push(qt+': opciones repetidas'); if(q.options.some(o=>!String(o).trim())) pr.push(qt+': opción vacía'); }
        if(p.type==='mc'&&!(q.stem||q.text||q.body)) pr.push(qt+': sin enunciado'); }
      else if(p.type==='match'){ const labels=(p.bank&&p.bank.labels)||[]; if(labels.length&&!labels.includes(q.answer)) pr.push(qt+`: answer "${q.answer}" no está en ${labels.join('')}`); if(!q.stem) pr.push(qt+': sin enunciado'); }
      else if(p.type==='clozeOpen'||p.type==='wordform'||p.type==='transform'){ if(!Array.isArray(q.accept)||!q.accept.length||q.accept.some(a=>!String(a).trim())) pr.push(qt+': accept vacío'); else {
          if(q.accept.some(a=>String(a)!==String(a).trim())) pr.push(qt+': respuesta con espacios sobrantes');
          if(p.type==='wordform'){ const root=norm(q.root||rootsList[qi]||''); if(!root) pr.push(qt+': sin palabra base (root)'); else if(!q.accept.some(a=>{const n=norm(a); return n.includes(root.slice(0,3))||root.includes(n.slice(0,3));})) pr.push(qt+`: "${q.accept[0]}" no parece derivar de "${root}"`); if(q.root&&rootsList[qi]&&norm(q.root)!==norm(rootsList[qi])) pr.push(qt+`: root de la pregunta (${q.root}) ≠ root de la fila (${rootsList[qi]})`); }
          if(p.type==='transform'){ const key=norm(q.keyword||''); if(!key) pr.push(qt+': sin keyword'); else { const missing=q.accept.filter(a=>!norm(a).replace(/'/g,'').includes(key.replace(/'/g,''))); if(missing.length) pr.push(qt+`: ${missing.length} respuesta(s) no contienen la palabra clave "${q.keyword}": ${missing.slice(0,2).join(' | ')}`); }
            const lim=lv==='B1'?5:(lv==='C2'?8:6); if(q.accept.some(a=>norm(a).split(' ').length>lim)) pr.push(qt+`: respuesta de más de ${lim} palabras`); if(q.accept.some(a=>norm(a).split(' ').length<2)) pr.push(qt+': respuesta de una sola palabra'); if(!q.before||!q.after) pr.push(qt+': falta before/after'); if(q.after&&!/_{2,}/.test(q.after)) pr.push(qt+': after sin hueco'); }
          if(p.type==='clozeOpen'){ if(q.accept.some(a=>norm(a).split(' ').length>1)) pr.push(qt+`: open cloze con respuesta de varias palabras "${q.accept.find(a=>norm(a).split(' ').length>1)}"`); if(q.accept.some(a=>/^[A-Z]/.test(String(a).trim())&&!/^I$|^I'/.test(String(a).trim()))) pr.push(qt+`: respuesta con mayúscula "${q.accept[0]}" (el corrector normaliza a minúsculas)`); } } }
      else pr.push(qt+': tipo de parte desconocido '+p.type);
    });
  });
  if(nq===0) pr.push('0 preguntas en total');
  if(pr.length){ bad++; report.push([label,pr]); }
}
for(const [l,pr] of report){ console.log('✗ '+l); pr.slice(0,14).forEach(p=>console.log('   '+p)); if(pr.length>14) console.log('   … y '+(pr.length-14)+' más'); }
console.log(`\n${total} tests de Reading & UoE (${stats.parts} partes, ${stats.qs} preguntas) · ${bad} con hallazgos`);
