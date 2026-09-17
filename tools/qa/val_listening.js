const fs=require('fs'),vm=require('vm'),cp=require('child_process');
const MOCKS=require('path').resolve(__dirname,'..','..','mocks-cambridge'); process.chdir(MOCKS); const src=fs.readFileSync('listening-quiz.app-data.js','utf8');
const noop=()=>null; const el={style:{},classList:{add:noop,remove:noop,toggle:noop},dataset:{}}; Object.assign(el,{addEventListener:noop,setAttribute:noop,appendChild:noop,querySelector:()=>el,querySelectorAll:()=>[],getElementById:()=>el,createElement:()=>el,body:el,documentElement:el});
const ctx={document:el,localStorage:{getItem:()=>null,setItem:noop},navigator:{},location:{search:'',hash:''},console:{log:noop,warn:noop,error:noop},setTimeout:noop,setInterval:noop,speechSynthesis:{cancel:noop,getVoices:()=>[],speak:noop,addEventListener:noop},SpeechSynthesisUtterance:function(){},Audio:function(){return el},requestAnimationFrame:noop,matchMedia:()=>({matches:false,addEventListener:noop})}; ctx.window=ctx; vm.createContext(ctx);
try{vm.runInContext(src+'\n;this.__X={LM:LISTEN_MORE,QUIZ:QUIZ,QUIZ2:QUIZ2,QUIZ3:QUIZ3,QUIZ4:QUIZ4,QUIZ5:QUIZ5,QUIZ6:QUIZ6};',ctx);}catch(e){}
const X=ctx.__X;
const tests=[];
for(const [name,Q] of [['MOCK 1',X.QUIZ],['MOCK 2',X.QUIZ2],['MOCK 3',X.QUIZ6],['Practice 1',X.QUIZ3],['Practice 2',X.QUIZ4],['Practice 3',X.QUIZ5]]) for(const lv of Object.keys(Q||{})) tests.push([lv+' '+name,lv,Q[lv]]);
for(const lv of Object.keys(X.LM)){ X.LM[lv].practice.forEach((t,i)=>tests.push([lv+' Practice '+(i+4),lv,t])); X.LM[lv].mocks.forEach((t,i)=>tests.push([lv+' MOCK '+(i+4),lv,t])); }
const durCache={}; function dur(f){ if(durCache[f]!==undefined) return durCache[f]; try{ const o=cp.execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "mp3/${f}"`).toString().trim(); durCache[f]=parseFloat(o)||0; }catch(e){ durCache[f]=-1; } return durCache[f]; }
const norm=s=>String(s).toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();
const words=s=>norm(s).split(' ').filter(Boolean).length;
const IMG=new Set(fs.existsSync('images')?fs.readdirSync('images').map(f=>f.replace(/\.[a-z]+$/,'')):[]);
let total=0,bad=0; const report=[];
for(const [label,lv,t] of tests){
  const pr=[];
  if(!t||!t.audios||!t.audios.length){pr.push('sin audios'); report.push([label,pr]); continue;}
  t.audios.forEach((a)=>{
    const qs=a.questions||[]; const scripts=(a.scripts||[]).map(String); const scriptAll=norm(scripts.join(' '));
    if(!qs.length) pr.push(`${a.id}: 0 preguntas`);
    if(!scripts.length) pr.push(`${a.id}: sin guion (scripts)`);
    // audio existence + duration vs script
    const ttsLevel = (lv==='A2'||lv==='B1') && !(a.file||qs[0]&&qs[0].audio);
    if(a.paged){
      if(scripts.length!==qs.length) pr.push(`${a.id}: paged con ${scripts.length} guiones para ${qs.length} preguntas`);
      qs.forEach((q,i)=>{ if(!q.audio){ if(!ttsLevel) pr.push(`${a.id} q${i+1}: sin audio`); return; }
        if(!fs.existsSync('mp3/'+q.audio)){ pr.push(`${a.id} q${i+1}: mp3 NO EXISTE ${q.audio}`); return; }
        const d=dur(q.audio), w=words(scripts[i]||''); const exp=w/2.6; if(d<=0) pr.push(`${a.id} q${i+1}: mp3 ilegible ${q.audio}`); else if(w&&(d<exp*0.55||d>exp*1.8)) pr.push(`${a.id} q${i+1}: audio ${d.toFixed(0)}s vs guion ${w} palabras (~${exp.toFixed(0)}s) — no cuadra ${q.audio}`); });
    } else if(a.file){
      if(!fs.existsSync('mp3/'+a.file)) pr.push(`${a.id}: mp3 NO EXISTE ${a.file}`);
      else { const d=dur(a.file), w=words(scripts.join(' ')); const exp=w/2.6; if(d<=0) pr.push(`${a.id}: mp3 ilegible ${a.file}`); else if(w&&(d<exp*0.55||d>exp*1.8)) pr.push(`${a.id}: audio ${d.toFixed(0)}s vs guion ${w} palabras (~${exp.toFixed(0)}s) — no cuadra ${a.file}`); }
    } else if(!ttsLevel) pr.push(`${a.id}: sin file ni audio por pregunta`);
    qs.forEach((q,i)=>{
      const tag=`${a.id} q${i+1}`; const txt=JSON.stringify(q);
      if(/\\u00/.test(txt)) pr.push(tag+': escape u00xx literal'); if(/\bundefined\b|\bnull\b/.test(txt)) pr.push(tag+': undefined/null en datos');
      if(q.type==='mc'){ if(!Array.isArray(q.o)||q.o.length<2) pr.push(tag+': opciones inválidas'); else if(typeof q.c!=='number'||q.c<0||q.c>=q.o.length) pr.push(tag+`: clave c=${JSON.stringify(q.c)} fuera de ${q.o.length} opciones`); if(!q.q) pr.push(tag+': sin enunciado'); 
        if(Array.isArray(q.o)&&new Set(q.o.map(norm)).size!==q.o.length) pr.push(tag+': opciones repetidas'); }
      else if(q.type==='pic'){ if(!Array.isArray(q.imgs)||q.imgs.length<2) pr.push(tag+': imgs inválidas'); else { if(typeof q.c!=='number'||q.c<0||q.c>=q.imgs.length) pr.push(tag+`: clave c=${JSON.stringify(q.c)} fuera de ${q.imgs.length} imágenes`); q.imgs.forEach(im=>{ if(IMG.size&&!IMG.has(im)&&!IMG.has(im.replace(/\.[a-z]+$/,''))) pr.push(tag+': imagen no existe '+im); }); } }
      else if(q.type==='gap'){ if(!Array.isArray(q.accept)||!q.accept.length||q.accept.some(s=>!String(s).trim())) pr.push(tag+': accept vacío'); else { const found=q.accept.some(s=>scriptAll.includes(norm(s))); if(!found) pr.push(tag+`: la respuesta "${q.accept[0]}" no aparece en el guion (el alumno no puede oírla)`); } if(!q.label||!/_{2,}|…|\.\.\./.test(q.label)) pr.push(tag+': label sin hueco ____'); }
      else if(q.type==='match'){ const bank=q.bank||a.bank; if(!Array.isArray(bank)||bank.length<2) pr.push(tag+': sin bank'); else if(!bank.includes(q.c)) pr.push(tag+`: clave "${q.c}" no está en el bank`); if(!q.person) pr.push(tag+': sin person'); else if(!scriptAll.includes(norm(q.person))) pr.push(tag+`: la persona "${q.person}" no se nombra en el guion`); }
      else pr.push(tag+': tipo desconocido '+q.type);
    });
    // match: bank should have ≥ qs+2 distractors typically; and no duplicated keys
    if(qs.length&&qs[0].type==='match'){ const keys=qs.map(q=>q.c); if(new Set(keys).size!==keys.length) pr.push(`${a.id}: dos personas con la misma respuesta`); }
  });
  total++; if(pr.length){bad++; report.push([label,pr]);}
}
for(const [l,pr] of report){ console.log('✗ '+l); pr.forEach(p=>console.log('   '+p)); }
console.log(`\n${total} tests de listening · ${bad} con hallazgos`);
