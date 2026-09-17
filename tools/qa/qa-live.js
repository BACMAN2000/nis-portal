/* QA en vivo: cada página HTML del repo y cada asset estático que referencia deben responder 200 en nis.cohasset.pe.
   Además comprueba los mp3 de mocks-cambridge que los datasets referencian (no van en git). */
const fs=require('fs'),path=require('path');
const ROOT='C:/Projects/nis-portal', BASE='https://nis.cohasset.pe/';
const SKIP=/[\\/](\.git|_backup_[^\\/]+|tools|exams|apps-script|deploy|node_modules|jm7q2x)([\\/]|$)|nis-fun[\\/]build-videos/;
function walk(d,out=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(SKIP.test(p)) continue; if(e.isDirectory()) walk(p,out); else out.push(p);} return out; }
const rel=p=>path.relative(ROOT,p).replace(/\\/g,'/');
const html=walk(ROOT).filter(f=>/\.html?$/i.test(f));
const urls=new Map(); // url -> [páginas]
const addUrl=(u,from)=>{ if(!urls.has(u)) urls.set(u,[]); if(urls.get(u).length<3) urls.get(u).push(from); };
const refRe=/(?:src|href|poster)\s*=\s*["']([^"'#]+?)(?:#[^"']*)?["']/gi;
for(const f of html){ const r=rel(f); addUrl(r,'(página)'); const src=fs.readFileSync(f,'utf8').replace(/<!--[\s\S]*?-->/g,''); let m; refRe.lastIndex=0;
  while((m=refRe.exec(src))){ let u=m[1].trim(); if(!u||/^(https?:|mailto:|tel:|javascript:|data:|blob:|\/\/)/i.test(u)||/[{}$]/.test(u)) continue; if(/[-_.]$/.test(u.split('?')[0])) continue;
    const q=u.includes('?')?u.slice(u.indexOf('?')):''; u=u.split('?')[0]; if(u.startsWith('/')) u=u.slice(1); else u=path.posix.normalize(path.posix.join(path.posix.dirname(r),u)); if(u.startsWith('..')) continue; if(u===''||u==='.') u='index.html'; if(u.endsWith('/')) u+='index.html';
    if(/\.(html?|js|css|png|jpe?g|webp|svg|gif|mp3|mp4|woff2?|ttf|json|ico|pdf)$/i.test(u)) addUrl(u+q,r); } }
// mp3 de los mocks referenciados por los datasets
for(const ds of ['mocks-cambridge/listening-quiz.app-data.js']){ const s=fs.readFileSync(path.join(ROOT,ds),'utf8'); const re=/"(?:audio|file)"\s*:\s*"([A-Za-z0-9_\/.-]+\.mp3)"/g; let m; while((m=re.exec(s))) addUrl('mocks-cambridge/mp3/'+m[1]+'?v=m3fix',ds); }
const list=[...urls.keys()]; console.log('URLs a comprobar:',list.length);
const bad=[]; let done=0; const t0=Date.now();
async function head(u){ const full=BASE+u; for(let i=0;i<2;i++){ try{ const r=await fetch(full,{method:'GET',redirect:'manual',headers:{Range:'bytes=0-0'}}); if(r.status>=200&&r.status<400) { if(r.status>=300) return {u,status:r.status,loc:r.headers.get('location')}; return {u,status:r.status,len:r.headers.get('content-range')||r.headers.get('content-length'),type:r.headers.get('content-type')}; } if(r.status!==404&&i===0) continue; return {u,status:r.status}; }catch(e){ if(i===1) return {u,status:'ERR '+e.message}; } } }
async function run(){ let i=0; const N=12; const results=[];
  await Promise.all(Array.from({length:N},async()=>{ while(i<list.length){ const u=list[i++]; const r=await head(u); results.push(r); done++; if(!(r.status>=200&&r.status<300)) bad.push(r); if(done%150===0) process.stdout.write(`  ${done}/${list.length}\n`); } }));
  console.log(`\nComprobadas ${done} URLs en ${((Date.now()-t0)/1000).toFixed(0)} s · fallos: ${bad.length}`);
  const byStatus={}; for(const b of bad) (byStatus[b.status]=byStatus[b.status]||[]).push(b);
  for(const st in byStatus){ console.log(`== ${st} (${byStatus[st].length})`); byStatus[st].slice(0,40).forEach(b=>console.log('   '+b.u+(b.loc?' → '+b.loc:'')+'   ← '+(urls.get(b.u.split('?')[0])||urls.get(b.u)||[]).slice(0,2).join(', '))); if(byStatus[st].length>40) console.log('   … y '+(byStatus[st].length-40)+' más'); }
  // Tipos MIME sospechosos: html servido donde se esperaba js/css/mp3
  const mime=results.filter(r=>r&&r.type&&/\.(js|css|mp3|json)(\?|$)/i.test(r.u)&&/text\/html/.test(r.type)); if(mime.length){ console.log('== Servido como text/html (probable 404 disfrazado) ('+mime.length+')'); mime.slice(0,30).forEach(r=>console.log('   '+r.u)); }
  fs.writeFileSync(path.join(__dirname,'live-report.json'),JSON.stringify({bad,mime},null,1));
}
run();
