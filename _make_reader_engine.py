# -*- coding: utf-8 -*-
"""
Genera reader.html (motor GENÉRICO de readers multinivel) a partir de
and-then-there-were-none.html. El contenido del libro llega por
<book>-data-<lvl>.js y <book>-extras.js (window.READER_EXTRAS).
El de ATTWN NO se toca: sigue en su propio archivo.
Re-ejecutable: parte siempre del archivo de ATTWN.
"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).parent
src = (ROOT / "and-then-there-were-none.html").read_text(encoding="utf-8")
n_rep = 0

def rep(old, new, count=1):
    global src, n_rep
    found = src.count(old)
    if found != count:
        sys.exit(f"MARCADOR con {found} coincidencias (esperaba {count}): {old[:90]!r}")
    src = src.replace(old, new)
    n_rep += 1

def span(start, end_marker, new):
    """Reemplaza desde `start` hasta el final de `end_marker` (primera aparición tras start)."""
    global src, n_rep
    i = src.find(start)
    if i < 0: sys.exit(f"NO ENCONTRADO: {start[:80]!r}")
    j = src.find(end_marker, i)
    if j < 0: sys.exit(f"SIN CIERRE {end_marker!r} para: {start[:60]!r}")
    src = src[:i] + new + src[j+len(end_marker):]
    n_rep += 1

# ---- head: título + loader por libro ----
rep("<title>And Then There Were None — Activities · Portal NIS</title>",
    "<title>Reader — Portal NIS</title>")
span("""/* Nivel del reader (?level=a2|b1|b2|c1|c2) → carga su archivo de datos.""",
     """document.write('<script src="attwn-data-'+ATTWN_LVL+'.js?v=1"><\\/script>');""",
"""/* Motor GENÉRICO de readers: reader.html?book=<id>&level=a2|b1|b2|c1|c2.
   Textos y ejercicios en <book>-data-<lvl>.js; secciones propias del libro
   (bio, personajes, C2, tema del tracker…) en <book>-extras.js.
   Sin nivel: selector. c2 = Read the original (con los datos C1 detrás). */
var _q=new URLSearchParams(location.search);
var RDR_BOOKS={
  earnest:{title:'The Importance of Being Earnest', by:'Oscar Wilde'},
  tomsawyer:{title:'The Adventures of Tom Sawyer', by:'Mark Twain'}
};
var RDR_ID=(_q.get('book')||'earnest').toLowerCase();
if(!RDR_BOOKS[RDR_ID]) RDR_ID='earnest';
var _attwnRaw=(_q.get('level')||'').toLowerCase();
window.ATTWN_CHOOSER = !_attwnRaw;
window.ATTWN_C2 = (_attwnRaw==='c2');
var ATTWN_LVL = window.ATTWN_C2 ? 'c1' : _attwnRaw;
if(['a2','b1','b2','c1'].indexOf(ATTWN_LVL)<0) ATTWN_LVL='b1';
document.write('<script src="'+RDR_ID+'-data-'+ATTWN_LVL+'.js?v=1"><\\/script>');
document.write('<script src="'+RDR_ID+'-extras.js?v=1"><\\/script>');""")

# ---- consts de nivel + libro ----
rep("""const LVL=(window.ATTWN_DATA&&ATTWN_DATA.level)||'B1';
const LVLL=LVL.toLowerCase();
const SHOW_LVL=window.ATTWN_CHOOSER?'':(window.ATTWN_C2?'C2':LVL);
document.getElementById('hdrSub').textContent='9TH GRADE · READER'+(SHOW_LVL?' · '+SHOW_LVL:'S');
document.title='And Then There Were None'+(SHOW_LVL?' ('+SHOW_LVL+')':'')+' — Portal NIS';""",
"""const LVL=(window.ATTWN_DATA&&ATTWN_DATA.level)||'B1';
const LVLL=LVL.toLowerCase();
const BOOK=RDR_BOOKS[RDR_ID];
const EXTRAS=window.READER_EXTRAS||{};
const THEME=EXTRAS.THEME||{emoji:'📖',rhyme:'',doneLine:'You finished the book! 🏆',leftWordSingular:'chapter',leftWordPlural:'chapters'};
const SHOW_LVL=window.ATTWN_CHOOSER?'':(window.ATTWN_C2?'C2':LVL);
document.getElementById('hdrSub').textContent='READER'+(SHOW_LVL?' · '+SHOW_LVL:'S');
document.title=BOOK.title+(SHOW_LVL?' ('+SHOW_LVL+')':'')+' — Portal NIS';""")

# ---- claves de progreso / NISACT por libro ----
rep("const key = 'attwn:'+LVL+':best:'+(c?c.n:'x')+':'+actId;",
    "const key = 'rdr:'+RDR_ID+':'+LVL+':best:'+(c?c.n:'x')+':'+actId;")
rep("activity:'attwn-'+LVLL+'-'+(c?('ch'+c.n):'extra')+'-'+actId,",
    "activity:RDR_ID+'-'+LVLL+'-'+(c?('ch'+c.n):'extra')+'-'+actId,")
rep("title:'ATTWN '+LVL+' '+(c?('Ch.'+c.n+' '+c.title):'')+' — '+(label||actId),",
    "title:RDR_ID.toUpperCase()+' '+LVL+' '+(c?('Ch.'+c.n+' '+c.title):'')+' — '+(label||actId),")
rep("localStorage.getItem('attwn:'+LVL+':best:'+n+':'+actId)",
    "localStorage.getItem('rdr:'+RDR_ID+':'+LVL+':best:'+n+':'+actId)")

# ---- audio por libro (siempre subcarpeta de nivel) ----
rep("const AUD_BASE='attwn-audio/'+(LVL==='B1'?'':LVLL+'/');",
    "const AUD_BASE=RDR_ID+'-audio/'+LVLL+'/';")
rep('download="ATTWN-${LVL}-chapter-${c.n}.mp3"',
    'download="${RDR_ID.toUpperCase()}-${LVL}-chapter-${c.n}.mp3"', count=src.count('download="ATTWN-${LVL}-chapter-${c.n}.mp3"'))

# ---- _gapItems: nombres de repliegue desde los personajes del libro ----
rep("""  const NAMES=['Vera','Lombard','Rogers','Wargrave','Armstrong','Blore','Marston','Macarthur','Brent','Narracott','Owen'];""",
"""  const NAMES=[...new Set((EXTRAS.CHARACTERS||[]).flatMap(c=>String(c[0]).split(/\\s+/)).filter(w=>/^[A-Z][a-z]{2,}$/.test(w)))];""")

# ---- EVENTS ya viene en el data file (nada que tocar) ----

# ---- BOOK_WORDS / predicciones ----
span("const BOOK_WORDS=[", "\n];",
     "const BOOK_WORDS=EXTRAS.BOOK_WORDS||[];")
span("""    <div class="explain" style="margin:12px 0">
      🔮 <b>Prediction — discuss or think:</b><br>""",
     "</div>",
"""    <div class="explain" style="margin:12px 0">
      🔮 <b>Prediction — discuss or think:</b><br>
      1. Look at the title, <i>${BOOK.title}</i>. What do you think the story will be about?<br>
      2. Look at the characters page. Who looks interesting? Who might cause trouble?<br>
      3. ${BOOK.by} wrote this story more than a century ago. What do you expect life to be like in it?
    </div>""")

# ---- WHOSWHO / NUMBERS / GRAMMAR / CHAR_TASKS ----
span("const WHOSWHO=[", "\n];", "const WHOSWHO=EXTRAS.WHOSWHO||[];")
span("const BIO_NUMBERS=[", "\n];", "const BIO_NUMBERS=EXTRAS.NUMBERS||[];")
rep("q:`In Agatha Christie's life, what does the number <b>${b[0]}</b> refer to?`",
    "q:`In the author's life and this book, what does the number <b>${b[0]}</b> refer to?`")
span("const GRAMMAR_PP=[", "\n];",
     "const GRAMMAR_PP=(EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.items)||[];")
span("""    <div class="qnum">GRAMMAR</div>
    <h2 style="color:var(--blue-d);margin:2px 0 8px">🧭 Past perfect simple</h2>
    <p style="margin:0 0 10px">We use the <b>past perfect</b> (had + past participle) for something that happened <b>before</b> another moment in the past.</p>
    <div class="explain" style="margin-bottom:8px">➕ Lombard <b>thought</b> about the man who <b>had given</b> him the job.</div>
    <div class="explain" style="margin-bottom:8px">➖ He needed money because he <b>hadn't worked</b> for a while.</div>
    <div class="explain" style="margin-bottom:14px">❓ Why <b>had</b> Morris <b>told</b> him so little?</div>""",
"""</div>""",
"""    <div class="qnum">GRAMMAR</div>
    <h2 style="color:var(--blue-d);margin:2px 0 8px">🧭 ${(EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.title)||'Grammar'}</h2>
    <p style="margin:0 0 10px">${(EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.intro)||''}</p>
    ${((EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.examples)||[]).map(e=>`<div class="explain" style="margin-bottom:8px">${e}</div>`).join('')}
    <div style="margin-bottom:6px"></div>""")
rep("crumbEl.innerHTML='Grammar · past perfect';",
    "crumbEl.innerHTML='Grammar · '+((EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.title)||'');")
rep("{speed:false,label:'PAST PERFECT',replay:'extraGrammar();_ppQuiz()',saveId:'grammar',saveName:'Past perfect'}",
    "{speed:false,label:'GRAMMAR',replay:'extraGrammar();_ppQuiz()',saveId:'grammar',saveName:(EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.title)||'Grammar'}")
span("const CHAR_TASKS=[", "\n];", "const CHAR_TASKS=EXTRAS.CHAR_TASKS||[];")

# ---- retratos / personajes ----
span("""/* ---------- retratos: fotogramas de la película de 1945 (dominio
   público, Wikimedia Commons) con repliegue a emoji ---------- */
const CHAR_IMGS=['wargrave','vera','lombard','armstrong','blore','brent','macarthur','marston','rogers',null];
const IMG_CREDIT='📷 Portraits: 1945 film adaptation and studio stills — public domain (Wikimedia Commons).';""",
"""const CHAR_ICONS=["⚖️","🏊","🧭","🩺","🕵️","🙏","🎖️","🏎️","🍽️","⛵"];""",
"""/* ---------- retratos: los define <book>-extras.js (con repliegue a emoji) ---------- */
const CHAR_IMGS=EXTRAS.CHAR_IMGS||[];
const IMG_CREDIT=EXTRAS.IMG_CREDIT||'';
function medHTML(img,emoji){ return `<div class="med">${img?`<img src="${RDR_ID}-img/${img}.jpg" alt="" onerror="this.replaceWith(document.createTextNode('${emoji}'))">`:emoji}</div>`; }
const CHAR_ICONS=EXTRAS.CHAR_ICONS||[];""")
span("const CHAR_ROLES=[", "\n];" if "const CHAR_ROLES=[\n" in src else '"Boatman · the unknown host"];',
     "const CHAR_ROLES=EXTRAS.CHAR_ROLES||[];")
span("const CHAR_SECRETS=[", '"Nobody has ever met him. Said aloud, his name means \'unknown\'…"];',
     "const CHAR_SECRETS=EXTRAS.CHAR_SECRETS||[];")
span("const CHARACTERS = [", "\n];", "const CHARACTERS=EXTRAS.CHARACTERS||[];")
span("const BIO = [", "\n];", "const BIO=EXTRAS.BIO||[];")
rep('<h2 style="color:var(--blue-d);margin:2px 0 12px">✍️ Agatha Christie (1890–1976)</h2>',
    '<h2 style="color:var(--blue-d);margin:2px 0 12px">✍️ ${BOOK.by}</h2>')
rep("<p class=\"muted\" style=\"margin:0 0 4px\">Ten guests, one island, and a secret behind every face. Open each file — then test yourself.</p>",
    "<p class=\"muted\" style=\"margin:0 0 4px\">Every character in <i>${BOOK.title}</i> has something to hide. Open each file — then test yourself.</p>")

# ---- notebook: fuera del motor genérico (es exclusivo del misterio ATTWN) ----
span("""/* ============================================================
   DETECTIVE'S NOTEBOOK""",
"""/* ============================================================
   C2 · READ THE ORIGINAL""",
"""/* ============================================================
   C2 · READ THE ORIGINAL""")
rep("""      <div class="card" style="flex-direction:row;text-align:left;gap:14px;align-items:center;border-top:4px solid #b8934a" onclick="extraNotebook()">
        <div class="ico" style="font-size:2.2rem">🔍</div>
        <div><h2 style="margin:0">Detective's Notebook</h2><div class="desc">Track the suspects chapter by chapter, log the deaths… and make your final accusation.</div></div>
      </div>
""", "")
rep("""    <div style="margin:0 0 12px"><button class="btn ghost sm" onclick="extraNotebook()">🔍 Update your Detective's Notebook</button></div>
""", "")

# ---- C2 · Read the original: dinámico desde EXTRAS.C2 ----
span("const C2_STAGES=[", "\n];", "const C2_STAGES=(EXTRAS.C2&&EXTRAS.C2.stages)||[];")
span("const C2_TASKS=[", "\n];", "const C2_TASKS=(EXTRAS.C2&&EXTRAS.C2.tasks)||[];")
rep("const C2_KEY='attwn:c2:read';", "const C2_KEY='rdr:'+RDR_ID+':c2:read';")
span("""      <h2>🏆 C2 · Read the original</h2>
      <p>You have finished the retelling — the final challenge is Agatha Christie's own novel, complete and unabridged:""",
     """and keep using your 🔍 Detective's Notebook as you read.</p>""",
"""      <h2>🏆 C2 · Read the original</h2>
      <p>${(EXTRAS.C2&&EXTRAS.C2.intro)||''}
      <br>📖 <a href="${(EXTRAS.C2&&EXTRAS.C2.source)||'#'}" target="_blank" rel="noopener" style="color:#fde68a;font-weight:700">${(EXTRAS.C2&&EXTRAS.C2.sourceLabel)||'Read the original'}</a></p>""")
rep('<h2 style="font-size:16px;color:var(--blue-d);margin:0 0 4px">📖 Reading plan — 10 stages</h2>',
    '<h2 style="font-size:16px;color:var(--blue-d);margin:0 0 4px">📖 Reading plan — ${C2_STAGES.length} stages</h2>')
rep('<div class="c2-prog"><span style="width:${read.size*10}%"></span></div>',
    '<div class="c2-prog"><span style="width:${Math.round(read.size/Math.max(1,C2_STAGES.length)*100)}%"></span></div>')
rep("document.querySelector('.c2-prog span').style.width=(r.size*10)+'%';",
    "document.querySelector('.c2-prog span').style.width=Math.round(r.size/Math.max(1,C2_STAGES.length)*100)+'%';")
rep("if(r.size===10 && on) alert('🏆 All ten stages read — you have finished the original novel. Now make Wargrave proud: write like a judge.');",
    "if(r.size===C2_STAGES.length && on) alert('🏆 All stages read — you have finished the original. Now show it in your writing!');")

# ---- tracker temático (fichas por libro en vez de soldaditos) ----
span("""function soldierSVG(){""", """</svg>`;
}""",
"""function soldierSVG(){
  return `<div style="width:34px;height:44px;border-radius:10px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:22px">${THEME.emoji}</div>`;
}""")
rep("""      <div class="rhyme">"Ten little soldier boys went out to dine…" — finish a chapter (3 activities at 70%+) and its soldier disappears.</div>""",
    """      <div class="rhyme">${THEME.rhyme}</div>""")
rep("""      <div class="left-line">${left===0?'…and then there were none. You finished the whole novel! 🏆':'…and then there were '+(left===10?'ten':left)+'.'}</div>""",
    """      <div class="left-line">${left===0?THEME.doneLine:left+' '+(left===1?THEME.leftWordSingular:THEME.leftWordPlural)+' to go…'}</div>""")
rep("""    <h1><span class="em">🏝️</span> And Then There Were None <span class="chip" style="font-size:14px;vertical-align:6px">${LVL}</span></h1>""",
    """    <h1><span class="em">${THEME.emoji}</span> ${BOOK.title} <span class="chip" style="font-size:14px;vertical-align:6px">${LVL}</span></h1>""")

# ---- selector de nivel ----
rep("""  ['c2','🏆','C2','Proficiency','The final challenge: read Agatha Christie’s original novel, with a reading plan and analysis work.']""",
    """  ['c2','🏆','C2','Proficiency','The final challenge: read the original by '+RDR_BOOKS[RDR_ID].by+' — free, with a reading plan and analysis work.']""")
span("""      <h1 style="color:#fde68a;margin:0 0 4px">🏝️ And Then There Were None</h1>
      <div class="rhyme">Agatha Christie · the same mystery at five levels — same island, same suspects, your English.</div>
      <img class="cast-strip" src="attwn-img/cast.jpg" alt="The guests of Soldier Island (1945 film)" onerror="this.remove()">
      <div class="row-s" style="margin-top:6px">${CHAPTERS.map(c=>`<div class="soldier">${soldierSVG()}</div>`).join('')}</div>
      <div class="img-credit" style="color:#7f9cc4">${IMG_CREDIT}</div>""",
"""    </div>""",
"""      <h1 style="color:#fde68a;margin:0 0 4px">${THEME.emoji} ${BOOK.title}</h1>
      <div class="rhyme">${BOOK.by} · the same story at five levels — your English chooses the challenge.</div>
      <div class="row-s" style="margin-top:6px">${CHAPTERS.map(c=>`<div class="soldier">${soldierSVG()}</div>`).join('')}</div>
    </div>""")
rep("""    <p class="muted" style="margin-top:14px;font-size:12.5px">💡 Not sure? Start at <b>B1</b>. You can change level at any time — your progress is saved separately at each level, and your 🔍 Detective's Notebook travels with you.</p>`;""",
    """    <p class="muted" style="margin-top:14px;font-size:12.5px">💡 Not sure? Start at <b>B1</b>. You can change level at any time — your progress is saved separately at each level.</p>`;""")

# ---- etiquetas restantes con nombre de autor/obra ----
rep("crumbEl.innerHTML = view.info==='bio' ? 'Agatha Christie' : 'The characters';",
    "crumbEl.innerHTML = view.info==='bio' ? BOOK.by : 'The characters';")
rep("""<div><h2 style="margin:0">Agatha Christie</h2><div class="desc">A short biography — then play "Agatha in numbers".</div></div>""",
    """<div><h2 style="margin:0">${BOOK.by}</h2><div class="desc">A short biography — then play “The author in numbers”.</div></div>""")
rep("""<div class="desc">The final challenge: Agatha Christie's unabridged novel — reading plan, analysis questions and CPE-style writing.</div>""",
    """<div class="desc">The final challenge: the unabridged original — reading plan, analysis questions and advanced writing.</div>""")
rep("""<button class="btn sm" onclick="extraNumbers()">🔢 Play "Agatha in numbers"</button>""",
    """<button class="btn sm" onclick="extraNumbers()">🔢 Play “The author in numbers”</button>""")
rep("runQuiz(qs,{speed:false,label:'AGATHA IN NUMBERS',replay:'extraNumbers()',saveId:'numbers',saveName:'Agatha in numbers'});",
    "runQuiz(qs,{speed:false,label:'THE AUTHOR IN NUMBERS',replay:'extraNumbers()',saveId:'numbers',saveName:'Author in numbers'});")
# ---- panel del profesor (añadido por otra sesión): textos por libro ----
rep("Claves de respuestas y planificación de <b>And Then There Were None</b>. Solo visible para docentes.",
    "Claves de respuestas y planificación de <b>${BOOK.title}</b>. Solo visible para docentes.")
rep("<h4>Agatha in numbers</h4>", "<h4>The author in numbers</h4>")
rep("<h4>Grammar — Past perfect</h4>", "<h4>Grammar — ${(EXTRAS.GRAMMAR&&EXTRAS.GRAMMAR.title)||''}</h4>")

span("const LEVEL_PLAN=[", "\n];",
"""const LEVEL_PLAN=(()=>{ // genérico: palabras reales del nivel abierto, estimación para el resto
  const words=Object.values(READINGS).flat().join(' ').split(/\\s+/).filter(Boolean).length;
  const base={A2:[.75,'Elementary. Frases cortas y vocabulario básico; audio más lento.'],
              B1:[1,'Intermedio — versión estándar. Narrativa clara con audio completo.'],
              B2:[1.25,'Intermedio-alto. Textos más densos y léxico ampliado.'],
              C1:[1.7,'Avanzado. Prosa literaria; preguntas de inferencia y writing largo.']};
  return ['A2','B1','B2','C1'].map(l=>{
    const w=l===LVL? words : Math.round(words*(base[l][0]/(base[LVL]||base.B1)[0]));
    const perMin=Math.round(w/CHAPTERS.length/110*10)+45;
    const hrs=Math.max(6,Math.round((w/140 + CHAPTERS.length*13*2)/60));
    return {lvl:l, words:w, perCh:'~'+perMin+' min', hrs:'~'+hrs+'–'+(hrs+2)+' h', note:base[l][1]+(l===LVL?'':' (estimado)')};
  });
})();""")
rep("“N.º de palabras” = solo el texto del reader (10 capítulos).",
    "“N.º de palabras” = solo el texto del reader (${CHAPTERS.length} capítulos).")

# ---- candados de examen: la clave de reader_exam_access lleva el id del libro ----
rep("const RDR_BOOK_ID='attwn';", "const RDR_BOOK_ID=RDR_ID;")

(ROOT / "reader.html").write_text(src, encoding="utf-8")
print(f"reader.html generado con {n_rep} transformaciones, {len(src)} chars")
