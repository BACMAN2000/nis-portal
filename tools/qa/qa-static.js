/* QA estático del portal NIS: recorre todos los HTML/JS/CSS/JSON publicados. */
const fs=require('fs'),path=require('path'),acorn=require('acorn');
const ROOT=require('path').resolve(__dirname,'..','..');
const SKIP=/[\\/](\.git|_backup_[^\\/]+|tools|exams|apps-script|deploy|node_modules|jm7q2x)([\\/]|$)|nis-fun[\\/]build-videos/;
function walk(d,out=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(SKIP.test(p)) continue; if(e.isDirectory()) walk(p,out); else out.push(p);} return out; }
const files=walk(ROOT); const rel=p=>path.relative(ROOT,p).replace(/\\/g,'/');
const html=files.filter(f=>/\.html?$/i.test(f)), js=files.filter(f=>/\.js$/i.test(f)&&!/\.min\.js$/.test(f)), css=files.filter(f=>/\.css$/i.test(f)), json=files.filter(f=>/\.json$/i.test(f));
const F={}; const add=(cat,file,msg)=>{(F[cat]=F[cat]||[]).push(rel(file)+': '+msg);};
const exists=new Set(files.map(f=>rel(f).toLowerCase()));
const gitignoredMedia=/^(mocks-cambridge\/mp3\/|attwn-audio\/|yle-audio\/|yle-img\/|audio\/|cambridge-audio\/|exam-audio\/|earnest-audio\/|princepauper-audio\/|treasureisland-audio\/|tomsawyer-audio\/|g2u4-audio\/|voice-battle-audio\/|reader-pron\/|nis-fun\/audio\/|nis-fun\/content\/.*\.(mp3|png|jpg|webp|mp4)|flyers-audio\/)/i;

// 1. Sintaxis JS (archivos .js y scripts inline)
for(const f of js){ const src=fs.readFileSync(f,'utf8'); try{ acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',allowHashBang:true}); }catch(e){ try{ acorn.parse(src,{ecmaVersion:'latest',sourceType:'module'}); }catch(e2){ add('JS syntax',f,e.message); } } }
const inlineRe=/<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
for(const f of html){ const src=fs.readFileSync(f,'utf8'); let m; let n=0; inlineRe.lastIndex=0;
  while((m=inlineRe.exec(src))){ n++; const attrs=m[1]; if(/\bsrc=/.test(attrs)||/type=["'](?!text\/javascript|module|application\/javascript)/.test(attrs)) continue; const body=m[2]; if(!body.trim()) continue;
    try{ acorn.parse(body,{ecmaVersion:'latest',sourceType:/type=["']module/.test(attrs)?'module':'script'}); }
    catch(e){ const line=src.slice(0,m.index).split('\n').length+e.loc.line-1; add('JS syntax (inline)',f,`script #${n} línea ${line}: ${e.message.replace(/\(\d+:\d+\)/,'')}`);} }
  const tail=src.split(/<\/html>/i)[1]; if(tail&&/\S/.test(tail.replace(/<!--[\s\S]*?-->/g,''))) add('Texto tras </html>',f,tail.trim().slice(0,80));
}
// 1b. JSON que no parsea (un reemplazo de texto sobre data.json dejó la app de word formation caída 6 h el 16-sep)
for(const f of json){ try{ JSON.parse(fs.readFileSync(f,'utf8')); }catch(e){ add('JSON inválido',f,e.message.slice(0,80)); } }
// 2. Artefactos de escape / basura en texto visible
const artRe=[[/\\\\u00[0-9a-f]{2}/i,'\\\\u00xx (escape doble)'],[/&amp;(amp|lt|gt|quot|#39);/,'&amp;amp; (entidad doble)'],[/\[object Object\]/,'[object Object]'],[/\$\{[a-zA-Z_][\w.]*\}/,'${…} sin interpolar']];
for(const f of [...html,...json]){ const src=fs.readFileSync(f,'utf8'); const isHtml=/\.html?$/i.test(f);
  const vis=isHtml?src.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'').replace(/<!--[\s\S]*?-->/g,''):src;
  for(const [re,label] of artRe){ const m=re.exec(vis); if(m){ const ctx=vis.slice(Math.max(0,m.index-40),m.index+50).replace(/\s+/g,' '); add('Artefacto en texto',f,label+' → …'+ctx+'…'); } }
}
for(const f of js.filter(f=>/cambridge-data|app-data|activities|unit-plans|data\.js$|content/.test(rel(f)))){ const src=fs.readFileSync(f,'utf8'); const m=/\\\\u00[0-9a-f]{2}/i.exec(src); if(m) add('Artefacto en texto',f,'\\\\u00xx en dataset → '+src.slice(m.index-40,m.index+40).replace(/\s+/g,' ')); }
// 3. Referencias locales rotas
const refRe=/(?:src|href|poster|data-src)\s*=\s*["']([^"'#?]+)(?:[?#][^"']*)?["']/gi;
for(const f of html){ const src=fs.readFileSync(f,'utf8').replace(/<!--[\s\S]*?-->/g,''); const dir=path.dirname(f); let m; const seen=new Set(); refRe.lastIndex=0;
  while((m=refRe.exec(src))){ let u=m[1].trim(); if(!u||/[-_.]$/.test(u)||/^(https?:|mailto:|tel:|javascript:|data:|blob:|\/\/|#)/i.test(u)) continue; if(/[{}$]/.test(u)) continue;
    if(u.startsWith('/')) u=u.slice(1); else u=path.relative(ROOT,path.resolve(dir,u)).replace(/\\/g,'/'); if(seen.has(u)) continue; seen.add(u);
    if(u===''||u==='.') u='index.html'; if(u.endsWith('/')) u+='index.html'; if(exists.has((u+'/index.html').toLowerCase())) continue; if(u.startsWith('..')) { add('Referencia fuera del repo',f,u); continue; }
    if(!exists.has(u.toLowerCase())){ if(gitignoredMedia.test(u)) add('Ref a media fuera de git (verificar en vivo)',f,u); else add('Referencia local rota',f,u); } } }
for(const f of css){ const src=fs.readFileSync(f,'utf8'); let m; const re=/url\(\s*["']?([^"')?#]+)/g; while((m=re.exec(src))){ const u=m[1].trim(); if(/^(https?:|data:|\/\/)/i.test(u)) continue; const p=path.relative(ROOT,path.resolve(path.dirname(f),u)).replace(/\\/g,'/'); if(!exists.has(p.toLowerCase())) add('Referencia local rota',f,'url('+u+')'); } }
// 4. IDs duplicados en el HTML estático
for(const f of html){ const src=fs.readFileSync(f,'utf8').replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<!--[\s\S]*?-->/g,''); const ids={}; let m; const re=/<[a-z][^>]*\sid\s*=\s*["']([^"']+)["']/gi; while((m=re.exec(src))) ids[m[1]]=(ids[m[1]]||0)+1; const dup=Object.entries(ids).filter(([k,v])=>v>1); if(dup.length) add('ID duplicado',f,dup.map(([k,v])=>k+'×'+v).join(', ')); }
// 5. Tokens pisados: :root local con --bg/--card oscuro o --ink claro, usado con var() en una página de tema claro
function lum(hex){ const h=hex.replace('#',''); const v=h.length===3?h.split('').map(c=>parseInt(c+c,16)):[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; return (0.2126*v[0]+0.7152*v[1]+0.0722*v[2])/255; }
for(const f of html){ const src=fs.readFileSync(f,'utf8'); const root=/:root\s*{([^}]*)}/.exec(src); if(!root) continue; const vars={}; root[1].replace(/--(bg|card|ink|text|fg|panel|surface|paper)\s*:\s*(#[0-9a-f]{3,6})\b/gi,(_,k,v)=>{vars[k.toLowerCase()]=v;});
  for(const [k,v] of Object.entries(vars)){ const uses=(src.match(new RegExp('var\\(--'+k+'\\)','g'))||[]).length; if(!uses) continue; const L=lum(v);
    if(['bg','card','panel','surface','paper'].includes(k)&&L<0.35) add('Token de fondo oscuro en página clara',f,`--${k}:${v} (${uses} usos)`);
    if(['ink','text','fg'].includes(k)&&L>0.7) add('Token de texto claro en página clara',f,`--${k}:${v} (${uses} usos)`); } }
// 6. Español residual (UI) en páginas lang=en
const esRe=/\b(Volver a jugar|Entendido|¿Confirmas\?|Cancelar|Continuar|Cargando…|Guardar y enviar|Siguiente|Anterior|Comprobar|Reintentar|Puntaje|Actividades|Corregir|Escucha y|Elige la|Completa con|Has sido|Tu resultado)\b/;
for(const f of [...html,...js]){ const r=rel(f); if(/-fr[-.]|fr-g\d|french|frances|activities-fr|scope-u56|project-|yle-boletin|informe|unidad56/.test(r)) continue; const src=fs.readFileSync(f,'utf8'); if(/\.html?$/.test(r)){ const lang=(/<html[^>]*lang="([a-z]+)"/i.exec(src)||[])[1]; if(lang&&lang!=='en') continue; }
  const m=esRe.exec(src.replace(/<!--[\s\S]*?-->/g,'').replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'')); if(m){ add('Español residual',f,m[0]); } }
// 7. Higiene básica
for(const f of html){ const src=fs.readFileSync(f,'utf8'); if(!/<html[^>]*lang=/i.test(src)) add('Sin lang',f,''); if(!/name=["']viewport["']/i.test(src)) add('Sin viewport',f,''); if(!/<title>[^<]+<\/title>/i.test(src)) add('Sin title',f,''); }
// Las webfonts .ttf de fontawesome son el fallback de sus .woff2: no es un fallo
if(F['Referencia local rota']) F['Referencia local rota']=F['Referencia local rota'].filter(x=>!/^vendor\/fontawesome/.test(x));
// Informe
const order=Object.keys(F).sort((a,b)=>F[b].length-F[a].length);
console.log(`Archivos analizados: ${html.length} HTML · ${js.length} JS · ${css.length} CSS · ${json.length} JSON\n`);
for(const k of order){ console.log(`== ${k} (${F[k].length})`); const show=F[k].slice(0,30); show.forEach(x=>console.log('   '+x)); if(F[k].length>30) console.log(`   … y ${F[k].length-30} más`); }
fs.writeFileSync(path.join(__dirname,'static-report.json'),JSON.stringify(F,null,1));
/* --gate (hook pre-push): solo lo que rompe de verdad una página tumba el push:
   sintaxis JS, JSON que no parsea y referencias locales rotas. Lo demás (contraste,
   español residual, tokens) es informe, no barrera. */
if(process.argv.includes('--gate')){
  const graves=['JS syntax','JS syntax (inline)','JSON inválido','Referencia local rota'].filter(k=>(F[k]||[]).length);
  if(graves.length){ console.error('\n✗ QA: '+graves.map(k=>k+' ('+F[k].length+')').join(' · ')+' — el push se detiene. Detalle arriba.'); process.exit(1); }
  console.log('\n✓ QA estático: sin sintaxis rota, JSON inválido ni referencias rotas.');
}
