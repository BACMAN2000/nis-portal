/* QA en navegador real (Chrome headless vía playwright-core): carga cada página en vivo y recoge
   errores de consola, excepciones, peticiones fallidas, texto ilegible (contraste < 3) y
   desbordamiento horizontal en móvil (375 px). */
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright-core');
const ROOT='C:/Projects/nis-portal', BASE=process.env.QA_BASE||'https://nis.cohasset.pe/';
const SKIP=/[\\/](\.git|_backup_[^\\/]+|tools|exams|apps-script|deploy|node_modules|jm7q2x|vendor)([\\/]|$)|nis-fun[\\/]build-videos/;
function walk(d,out=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(SKIP.test(p)) continue; if(e.isDirectory()) walk(p,out); else out.push(p);} return out; }
const rel=p=>path.relative(ROOT,p).replace(/\\/g,'/');
let pages=walk(ROOT).filter(f=>/\.html?$/i.test(f)).map(rel);
if(process.argv[2]) pages=pages.filter(p=>new RegExp(process.argv[2]).test(p));
// parámetros de ejemplo para páginas que exigen query
const Q={'unit.html':'?grade=g9&unit=4','worksheet.html':'?grade=g9&unit=4&session=w1s1','cambridge-level.html':'?level=fce','reader.html':'?book=earnest','grammar-lab.html':'?topic=u4-habits','yle-practice.html':'?level=flyers','nis-fun/engine/index.html':'?level=flyers','project.html':'?grade=g9','writing.html':'?grade=g9','grammar.html':'?grade=g9','unit-exam.html':'?grade=g9&units=4&kind=practice&level=b1','ayuda.html':'?role=student','word-wheel.html':'?levels=a1,c2','activities.html':'?grade=g9','class-session.html':'?grade=g9&unit=4'};
const CONTRAST_JS=`(()=>{
 function parse(c){const m=/rgba?\\(([^)]+)\\)/.exec(c);if(!m)return null;const v=m[1].split(',').map(Number);return {r:v[0],g:v[1],b:v[2],a:v.length>3?v[3]:1};}
 function lum({r,g,b}){const f=x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
 function bgOf(el){let n=el;while(n&&n!==document.documentElement){const cs=getComputedStyle(n);const c=parse(cs.backgroundColor);if(cs.backgroundImage&&cs.backgroundImage!=='none'&&/gradient|url/.test(cs.backgroundImage))return null;if(c&&c.a>0.9)return c;n=n.parentElement;}const b=parse(getComputedStyle(document.body).backgroundColor);return (b&&b.a>0.9)?b:{r:255,g:255,b:255,a:1};}
 const out=[];const els=document.querySelectorAll('h1,h2,h3,h4,p,li,label,button,a,td,th,span,div,strong,small,em,b,summary,legend');
 for(const el of els){ if(out.length>=12)break; const t=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').trim(); if(t.length<3)continue; const r=el.getBoundingClientRect(); if(!r.width||!r.height||r.bottom<0||r.top>window.innerHeight*3)continue; const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)<0.5)continue; const fg=parse(cs.color); if(!fg||fg.a<0.5)continue; const bg=bgOf(el); if(!bg)continue; const L1=lum(fg),L2=lum(bg); const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05); if(ratio<3) out.push({t:t.slice(0,50),ratio:+ratio.toFixed(2),fg:cs.color,bg:'rgb('+bg.r+','+bg.g+','+bg.b+')',sel:el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\\s+/).slice(0,2).join('.'):'')}); }
 return out; })()`;
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const results=[]; let i=0; const N=4; const t0=Date.now();
  await Promise.all(Array.from({length:N},async()=>{
    const ctx=await browser.newContext({viewport:{width:1280,height:800},locale:'en-GB'});
    if(process.env.QA_LANG) await ctx.addInitScript(l=>{ try{ localStorage.setItem('nis.lang', l); }catch(e){} }, process.env.QA_LANG);
    while(i<pages.length){ const p=pages[i++]; const url=BASE+p+(Q[p]||''); const page=await ctx.newPage(); const R={page:p,console:[],errors:[],failed:[],contrast:[],mobileOverflow:null,title:''};
      page.on('console',m=>{ if(m.type()==='error'||m.type()==='warning'){ const tx=m.text(); if(/favicon|net::ERR_ABORTED|Failed to load resource: the server responded with a status of 401|Third-party cookie/i.test(tx)) return; if(R.console.length<8) R.console.push(m.type()+': '+tx.slice(0,220)); } });
      page.on('pageerror',e=>{ if(R.errors.length<6) R.errors.push(String(e.message||e).slice(0,220)); });
      page.on('response',r=>{ const s=r.status(); const u=r.url(); if(s>=400&&!/supabase\.co|favicon|google|gstatic|cdn\./.test(u)&&R.failed.length<10) R.failed.push(s+' '+u.replace(BASE,'')); });
      try{ await page.goto(url,{waitUntil:'load',timeout:30000}); await page.waitForTimeout(1800); R.title=await page.title();
        try{ R.contrast=await page.evaluate(CONTRAST_JS); }catch(e){ R.contrast=[{t:'(eval falló: '+e.message.slice(0,60)+')'}]; }
        await page.setViewportSize({width:375,height:812}); await page.waitForTimeout(400);
        try{ R.mobileOverflow=await page.evaluate(()=>{const w=Math.max(document.documentElement.scrollWidth,document.body?document.body.scrollWidth:0); return w>380?w:null;}); }catch(e){}
      }catch(e){ R.errors.push('NAV: '+e.message.slice(0,160)); }
      await page.close(); results.push(R); if(results.length%25===0) process.stdout.write(`  ${results.length}/${pages.length} (${((Date.now()-t0)/1000).toFixed(0)}s)\n`); }
    await ctx.close(); }));
  await browser.close();
  fs.writeFileSync(path.join(__dirname,'browser-report.json'),JSON.stringify(results,null,1));
  const withErr=results.filter(r=>r.errors.length), withCon=results.filter(r=>r.console.length), withFail=results.filter(r=>r.failed.length), withContrast=results.filter(r=>r.contrast.length), withMob=results.filter(r=>r.mobileOverflow);
  console.log(`\n${results.length} páginas · excepciones: ${withErr.length} · errores de consola: ${withCon.length} · peticiones fallidas: ${withFail.length} · contraste <3: ${withContrast.length} · desborde móvil: ${withMob.length}`);
  const show=(title,arr,f)=>{ if(!arr.length) return; console.log(`\n== ${title} (${arr.length})`); arr.slice(0,40).forEach(r=>console.log('   '+r.page+' → '+f(r))); if(arr.length>40) console.log('   … y '+(arr.length-40)+' más'); };
  show('Excepciones JS',withErr,r=>r.errors.join(' | '));
  show('Errores de consola',withCon,r=>r.console.join(' | '));
  show('Peticiones fallidas (≥400)',withFail,r=>r.failed.join(', '));
  show('Texto con contraste < 3',withContrast,r=>r.contrast.slice(0,3).map(c=>`"${c.t}" ${c.ratio} (${c.sel})`).join(' | '));
  show('Desborde horizontal en móvil',withMob,r=>r.mobileOverflow+'px');
})();
