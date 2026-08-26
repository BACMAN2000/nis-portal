/* ============================================================
   ACTIVIDADES AÑADIDAS AL MOTOR (2026-08-26)
   Inyectadas en reader.html por _make_reader_engine.py.
   Salen del reader Black Cat de The Prince and the Pauper y
   sirven a cualquier libro que traiga los campos en su data file:
     rw · halves · odd · gaps · wordform · opposites · think
   y, desde <book>-extras.js:  ILLUS · PICS · KEY · VALUES
   ============================================================ */

/* ---------- Right / Wrong / Doesn't say (Cambridge A2 Key, RW4) ---------- */
function actRightWrong(c){
  const items=(c&&c.rw)||[];
  if(!items.length){ stage.innerHTML=`<div class="panel"><p class="muted">No hay preguntas para este capítulo.</p></div>`; return; }
  const LABELS=['Right','Wrong','Doesn’t say'];
  runQuiz(items.map(it=>({
    q:`<span class="muted" style="font-size:12px">Is this sentence Right, Wrong, or does the text not say?</span><br>${it[0]}`,
    opts:LABELS.map((t,k)=>({t:`<b>${'ABC'[k]}</b> · ${t}`, correct:k===it[1]})),
    expl:it[2]
  })), {speed:false, label:'RIGHT / WRONG / DOESN’T SAY',
        replay:"actRightWrong(CHAPTERS[view.chap])",
        saveId:'rightwrong', saveName:'Right or Wrong'});
}

/* ---------- Odd one out ---------- */
function actOddOneOut(c){
  const items=(c&&c.odd)||[];
  if(!items.length){ stage.innerHTML=`<div class="panel"><p class="muted">No hay preguntas para este capítulo.</p></div>`; return; }
  runQuiz(items.map(it=>({
    q:`Which word is different from the others?`,
    opts:it[0].map((w,k)=>({t:w, correct:k===it[1]})),
    expl:it[2]
  })), {speed:false, label:'ODD ONE OUT',
        replay:"actOddOneOut(CHAPTERS[view.chap])",
        saveId:'oddoneout', saveName:'Odd one out'});
}

/* ---------- Sentence halves ---------- */
function actHalves(c){
  const items=(c&&c.halves)||[];
  if(items.length<4){ stage.innerHTML=`<div class="panel"><p class="muted">No hay frases para este capítulo.</p></div>`; return; }
  const ends=items.map(p=>p[1]);
  runQuiz(items.map((p,i)=>{
    const wrong=shuffle(ends.filter((_,k)=>k!==i)).slice(0,3);
    return { q:`How does this sentence end?<br><b>${p[0]}…</b>`,
             opts:shuffle([{t:p[1],correct:true},...wrong.map(w=>({t:w,correct:false}))]),
             expl:`${p[0]} ${p[1]}` };
  }), {speed:false, label:'SENTENCE HALVES',
       replay:"actHalves(CHAPTERS[view.chap])",
       saveId:'halves', saveName:'Sentence halves'});
}

/* ---------- Gap fill con banco de palabras ---------- */
function actGapFill(c){
  const g=(c&&c.gaps)||null;
  if(!g||!g.items||!g.items.length){ stage.innerHTML=`<div class="panel"><p class="muted">No hay ejercicio para este capítulo.</p></div>`; return; }
  const bank=shuffle((g.bank||[]).slice());
  _actT0=Date.now();
  crumbEl.innerHTML='Gap fill · '+(g.title||'');
  stage.innerHTML=`<div class="panel">
    <div class="qnum">GAP FILL</div>
    <h2 style="color:var(--blue-d);margin:2px 0 8px">📝 ${g.title||'Complete the sentences'}</h2>
    <p class="muted" style="margin:0 0 10px">Use the words in the box. Each word is used once.</p>
    <div class="explain" style="margin-bottom:12px"><b>${bank.join(' &nbsp;·&nbsp; ')}</b></div>
    <ol class="tk-list" style="line-height:2.1">
      ${g.items.map((it,i)=>`<li>${it[0].replace('___',
        `<input id="gf${i}" class="gf-in" autocomplete="off" spellcheck="false" style="min-width:120px;padding:4px 8px;border:1px solid #cbd5e1;border-radius:8px">`)}
        <span id="gm${i}"></span></li>`).join('')}
    </ol>
    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
      <button class="btn sm" onclick="_gfCheck()">Check answers</button>
      <button class="btn ghost sm" onclick="back()">← Back</button>
    </div>
    <div id="gfRes"></div>
  </div>`;
  window._gfCheck=()=>{
    let ok=0;
    g.items.forEach((it,i)=>{
      const el=$('#gf'+i), mark=$('#gm'+i);
      const good=(el.value||'').trim().toLowerCase()===String(it[1]).toLowerCase();
      if(good){ ok++; mark.innerHTML=' ✅'; el.style.borderColor='#16a34a'; }
      else { mark.innerHTML=` ❌ <span class="muted">(${it[1]})</span>`; el.style.borderColor='#dc2626'; }
      el.disabled=true;
    });
    const pct=Math.round(ok/g.items.length*100);
    $('#gfRes').innerHTML=`<div class="explain" style="margin-top:14px"><b>${ok} / ${g.items.length}</b> — ${pct}%</div>`;
    saveResult('gapfill', ok, g.items.length, g.title||'Gap fill');
  };
  window.scrollTo(0,0);
}

/* ---------- Values & Feelings (THINK!) ---------- */
function actThink(c){
  const t=(c&&c.think)||null;
  const V=(EXTRAS.VALUES)||{};
  const val=(V.chapters||[]).find(x=>x[0]===(c?c.n:0));
  if(!t){ stage.innerHTML=`<div class="panel"><p class="muted">No hay reflexión para este capítulo.</p></div>`; return; }
  crumbEl.innerHTML='Values &amp; Feelings';
  stage.innerHTML=`<div class="panel">
    <div class="qnum">VALUES &amp; FEELINGS</div>
    ${val?`<h2 style="color:var(--blue-d);margin:2px 0 4px">🌸 ${val[1]}</h2>
           <p class="muted" style="margin:0 0 12px">${val[2]}</p>`:''}
    <div class="explain" style="margin-bottom:14px;font-style:italic">${t.quote}</div>
    <p style="margin:0 0 12px">${t.question}</p>
    <div id="thOpts">${(t.options||[]).map((o,k)=>
      `<button class="opt" data-k="${k}" onclick="_thPick(${k})">${'abcde'[k]}) ${o}</button>`).join('')}</div>
    <div id="thFb"></div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
      <button class="btn ghost sm" onclick="back()">← Back</button>
    </div>
  </div>`;
  window._thPick=(k)=>{
    const btns=[...stage.querySelectorAll('#thOpts .opt')];
    btns.forEach((b,i)=>{ b.disabled=true;
      if(t.answer!=null && i===t.answer) b.classList.add('correct');
      else if(t.answer!=null && i===k) b.classList.add('wrong'); });
    if(t.answer==null) btns[k].classList.add('correct');
    $('#thFb').innerHTML=`<div class="explain" style="margin-top:12px">${
      t.answer==null ? '💬 There is no single right answer here. ' : ''}${t.note||''}</div>`;
    saveResult('think', (t.answer==null||k===t.answer)?1:0, 1, 'Values & Feelings');
  };
  window.scrollTo(0,0);
}

/* ---------- Reading pictures ---------- */
function actReadingPics(c){
  const P=((EXTRAS.PICS)||{})[c?c.n:0];
  if(!P){ stage.innerHTML=`<div class="panel"><p class="muted">No hay lámina para este capítulo.</p></div>`; return; }
  crumbEl.innerHTML='Reading pictures';
  stage.innerHTML=`<div class="panel">
    <div class="qnum">READING PICTURES</div>
    <h2 style="color:var(--blue-d);margin:2px 0 10px">🖼️ Look and answer</h2>
    <figure class="rdr-fig" style="margin:0 0 14px">
      <img src="${RDR_ID}-img/${P.img}.jpg" alt="" style="width:100%;max-width:640px;border-radius:12px;display:block;margin:0 auto"
           onerror="this.closest('figure').remove()">
    </figure>
    <ol class="tk-list" style="line-height:1.9">
      ${P.qs.map((q,i)=>`<li>${q[0]}
        <div style="margin:6px 0 4px"><textarea id="rp${i}" rows="2" style="width:100%;padding:6px 8px;border:1px solid #cbd5e1;border-radius:8px"></textarea></div>
        <div id="rpm${i}" class="explain" style="display:none"></div></li>`).join('')}
    </ol>
    <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
      <button class="btn sm" onclick="_rpShow()">Show model answers</button>
      <button class="btn ghost sm" onclick="back()">← Back</button>
    </div>
  </div>`;
  window._rpShow=()=>{
    P.qs.forEach((q,i)=>{ const m=$('#rpm'+i); m.style.display='block'; m.innerHTML='💡 '+q[1]; });
    saveResult('readingpics', 1, 1, 'Reading pictures');
  };
  window.scrollTo(0,0);
}

/* ---------- Picture summary: ordenar las láminas del capítulo ---------- */
function actPicSummary(c){
  const L=((EXTRAS.ILLUS)||{})[c?c.n:0]||[];
  if(L.length<3){ stage.innerHTML=`<div class="panel"><p class="muted">Este capítulo no tiene láminas suficientes.</p></div>`; return; }
  const right=L.map((x,i)=>i);
  let order=shuffle(right.slice());
  if(order.join()===right.join()) order.reverse();
  _actT0=Date.now();
  crumbEl.innerHTML='Picture summary';
  const draw=()=>{
    stage.innerHTML=`<div class="panel">
      <div class="qnum">PICTURE SUMMARY</div>
      <h2 style="color:var(--blue-d);margin:2px 0 6px">🧩 Put the pictures in order</h2>
      <p class="muted" style="margin:0 0 12px">The pictures are not in the right order. Use ↑ and ↓ to put them in the order they appear in the chapter.</p>
      <div id="psList">${order.map((idx,pos)=>`
        <div class="ps-row" style="display:flex;gap:10px;align-items:center;margin-bottom:10px;border:1px solid #e2e8f0;border-radius:12px;padding:8px">
          <div style="font-weight:800;color:var(--blue-d);min-width:22px">${pos+1}</div>
          <img src="${RDR_ID}-img/${L[idx].img}.jpg" alt="" style="width:130px;border-radius:8px;flex:none" onerror="this.remove()">
          <div style="flex:1;font-size:13.5px">${L[idx].cap}</div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="cbtn ghost" ${pos===0?'disabled':''} onclick="_psMove(${pos},-1)">↑</button>
            <button class="cbtn ghost" ${pos===order.length-1?'disabled':''} onclick="_psMove(${pos},1)">↓</button>
          </div>
        </div>`).join('')}</div>
      <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap">
        <button class="btn sm" onclick="_psCheck()">Check order</button>
        <button class="btn ghost sm" onclick="back()">← Back</button>
      </div>
      <div id="psRes"></div>
    </div>`;
  };
  window._psMove=(pos,d)=>{ const t=order[pos]; order[pos]=order[pos+d]; order[pos+d]=t; draw(); };
  window._psCheck=()=>{
    const ok=order.reduce((n,v,i)=>n+(v===i?1:0),0);
    const pct=Math.round(ok/order.length*100);
    $('#psRes').innerHTML=`<div class="explain" style="margin-top:12px">
      <b>${ok} / ${order.length}</b> in the right place — ${pct}%${ok===order.length?' 🏆':''}</div>`;
    saveResult('picsummary', ok, order.length, 'Picture summary');
  };
  draw();
  window.scrollTo(0,0);
}

/* ---------- Word formation: sustantivo ↔ adjetivo ---------- */
function actWordForm(c){
  const items=(c&&c.wordform)||[];
  if(!items.length){ stage.innerHTML=`<div class="panel"><p class="muted">No hay tabla para este capítulo.</p></div>`; return; }
  runQuiz(items.map((p,i)=>{
    const wrong=shuffle(items.filter((_,k)=>k!==i)).slice(0,3).map(w=>({t:w[1],correct:false}));
    return { q:`Which is the <b>adjective</b> from the noun <b>${p[0]}</b>?`,
             opts:shuffle([{t:p[1],correct:true},...wrong]),
             expl:`${p[0]} (noun) → ${p[1]} (adjective).` };
  }), {speed:false, label:'WORD FORMATION',
       replay:"actWordForm(CHAPTERS[view.chap])",
       saveId:'wordform', saveName:'Word formation'});
}

/* ---------- Opposites ---------- */
function actOpposites(c){
  const items=(c&&c.opposites)||[];
  if(!items.length){ stage.innerHTML=`<div class="panel"><p class="muted">No hay pares para este capítulo.</p></div>`; return; }
  runQuiz(items.map((p,i)=>{
    const wrong=shuffle(items.filter((_,k)=>k!==i)).slice(0,3).map(w=>({t:w[1],correct:false}));
    return { q:`What is the opposite of <b>${p[0]}</b>?`,
             opts:shuffle([{t:p[1],correct:true},...wrong]),
             expl:`${p[0]} ↔ ${p[1]}` };
  }), {speed:false, label:'OPPOSITES',
       replay:"actOpposites(CHAPTERS[view.chap])",
       saveId:'opposites', saveName:'Opposites'});
}

/* ============================================================
   CAMBRIDGE A2 KEY · PREPARATION  (pantalla de extras, no por capítulo)
   ============================================================ */
function extraKeyPrep(){
  const K=EXTRAS.KEY||{};
  if(!K.part1){ stage.innerHTML=`<div class="panel"><p class="muted">Este libro no tiene bloque Cambridge.</p></div>`; return; }
  crumbEl.innerHTML='Cambridge A2 Key · Preparation';
  const parts=[
    ['p1','📋 Part 1 — Notices',   K.part1 && K.part1.title],
    ['p3','💬 Part 3 — Conversation', K.part3 && K.part3.title],
    ['p4','📖 Part 4 — Right / Wrong / Doesn’t say', K.part4 && K.part4.title],
    ['p6','🔤 Part 6 — What is the word?', K.part6 && K.part6.title],
    ['p7','✍️ Part 7 — Open cloze', K.part7 && K.part7.title],
    ['p8','🗒️ Part 8 — Information transfer', K.part8 && K.part8.title]
  ].filter(p=>p[2]);
  stage.innerHTML=`<div class="panel">
    <div class="qnum">CAMBRIDGE A2 KEY</div>
    <h2 style="color:var(--blue-d);margin:2px 0 6px">🎓 Key · Preparation</h2>
    <p class="muted" style="margin:0 0 14px">The same task types as the real A2 Key exam, using the world of <i>${BOOK.title}</i>.</p>
    <div class="grid">${parts.map(p=>`
      <div class="card" style="flex-direction:row;text-align:left;gap:12px;align-items:center" onclick="keyPart('${p[0]}')">
        <div class="ico" style="font-size:1.8rem">${p[1].split(' ')[0]}</div>
        <div><h2 style="margin:0;font-size:15px">${p[1].replace(/^\S+\s/,'')}</h2></div>
      </div>`).join('')}</div>
    <div style="margin-top:14px"><button class="btn ghost sm" onclick="back()">← Back</button></div>
  </div>`;
  window.scrollTo(0,0);
}

function keyPart(id){
  const K=EXTRAS.KEY||{};
  if(id==='p1'){
    const P=K.part1;
    runQuiz(P.items.map(it=>({
      q:`<span class="muted" style="font-size:12px">Which notice says this?</span><br><b>${it[0]}</b>`,
      opts:P.notices.map(n=>({t:`<b>${n[0]}</b> · ${n[1]} — <span class="muted">${n[2]}</span>`, correct:n[0]===it[1]})),
      expl:`Answer: <b>${it[1]}</b> — ${(P.notices.find(n=>n[0]===it[1])||[])[2]||''}`
    })), {speed:false,label:'KEY · PART 1',replay:"keyPart('p1')",saveId:'key-p1',saveName:'Key Part 1 — Notices'});
  }
  else if(id==='p3'){
    const P=K.part3;
    runQuiz(P.answers.map((ans,i)=>{
      const line=P.lines.findIndex(l=>l[1]==='('+i+')');
      const prompt=line>0?P.lines[line-1][1]:'';
      const wrong=shuffle(P.bank.filter(b=>b[0]!==ans)).slice(0,3);
      return { q:`<span class="muted" style="font-size:12px">Tom says:</span><br><b>${prompt}</b><br><span class="muted" style="font-size:12px">What does Edward answer?</span>`,
               opts:shuffle([{t:(P.bank.find(b=>b[0]===ans)||[])[1],correct:true},...wrong.map(w=>({t:w[1],correct:false}))]),
               expl:`Answer: ${(P.bank.find(b=>b[0]===ans)||[])[1]}` };
    }), {speed:false,label:'KEY · PART 3',replay:"keyPart('p3')",saveId:'key-p3',saveName:'Key Part 3 — Conversation'});
  }
  else if(id==='p4'){
    const P=K.part4, LAB=['Right','Wrong','Doesn’t say'];
    crumbEl.innerHTML=P.title;
    stage.innerHTML=`<div class="panel">
      <div class="qnum">KEY · PART 4</div>
      <h2 style="color:var(--blue-d);margin:2px 0 8px">📖 ${P.title}</h2>
      <p class="muted" style="margin:0 0 10px">${P.intro}</p>
      ${P.text.map(p=>`<p class="rp" style="padding-left:0">${p}</p>`).join('')}
      <div style="margin-top:14px"><button class="btn sm" onclick="_keyP4()">Start the questions →</button></div>
    </div>`;
    window._keyP4=()=>runQuiz(P.items.map(it=>({
      q:it[0], opts:LAB.map((t,k)=>({t:`<b>${'ABC'[k]}</b> · ${t}`,correct:k===it[1]})), expl:it[2]
    })), {speed:false,label:'KEY · PART 4',replay:"keyPart('p4')",saveId:'key-p4',saveName:'Key Part 4 — Reading'});
    window.scrollTo(0,0);
  }
  else if(id==='p6'||id==='p7'||id==='p8'){
    const P= id==='p6'?K.part6 : id==='p7'?K.part7 : K.part8;
    const rows = id==='p7'
      ? P.answers.map((a,i)=>[`Gap (${i})`,a])
      : P.items;
    crumbEl.innerHTML=P.title;
    stage.innerHTML=`<div class="panel">
      <div class="qnum">KEY · ${id.toUpperCase()}</div>
      <h2 style="color:var(--blue-d);margin:2px 0 8px">${P.title}</h2>
      <p class="muted" style="margin:0 0 10px">${P.intro}</p>
      ${id==='p7'?`<div class="explain" style="margin-bottom:12px;line-height:2">${P.text.replace(/___/g,'<b>___</b>')}</div>`:''}
      ${id==='p8'&&P.card?`<div class="explain" style="margin-bottom:12px">
          <b>${P.card.title}</b><br>${P.card.lines.join('<br>')}
          <br><br><b>Royal menu:</b><br>• ${P.card.menu.join('<br>• ')}
          <br><br><i>${P.card.foot.join('<br>')}</i></div>`:''}
      <ol class="tk-list" style="line-height:2.1">
        ${rows.map((r,i)=>`<li>${r[0]}
          <input id="kp${i}" class="gf-in" autocomplete="off" spellcheck="false"
                 style="min-width:130px;padding:4px 8px;border:1px solid #cbd5e1;border-radius:8px">
          <span id="kpm${i}"></span></li>`).join('')}
      </ol>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <button class="btn sm" onclick="_kpCheck()">Check answers</button>
        <button class="btn ghost sm" onclick="extraKeyPrep()">← Back</button>
      </div>
      <div id="kpRes"></div>
    </div>`;
    window._kpCheck=()=>{
      let ok=0;
      rows.forEach((r,i)=>{
        const el=$('#kp'+i), mark=$('#kpm'+i);
        const good=(el.value||'').trim().toLowerCase()===String(r[1]).toLowerCase();
        if(good){ ok++; mark.innerHTML=' ✅'; el.style.borderColor='#16a34a'; }
        else { mark.innerHTML=` ❌ <span class="muted">(${r[1]})</span>`; el.style.borderColor='#dc2626'; }
        el.disabled=true;
      });
      $('#kpRes').innerHTML=`<div class="explain" style="margin-top:14px"><b>${ok} / ${rows.length}</b> — ${Math.round(ok/rows.length*100)}%</div>`;
      saveResult('key-'+id, ok, rows.length, P.title);
    };
    window.scrollTo(0,0);
  }
}

/* ---------- Trinity · speaking ---------- */
function extraTrinity(){
  const T=EXTRAS.TRINITY||[];
  if(!T.length){ stage.innerHTML=`<div class="panel"><p class="muted">Este libro no tiene bloque Trinity.</p></div>`; return; }
  crumbEl.innerHTML='Trinity · Preparation';
  stage.innerHTML=`<div class="panel">
    <div class="qnum">TRINITY</div>
    <h2 style="color:var(--blue-d);margin:2px 0 6px">🗣️ Trinity · Preparation</h2>
    <p class="muted" style="margin:0 0 14px">Speaking topics that come out of the story. Work with a partner, then tell the class.</p>
    ${T.map(t=>`<div class="explain" style="margin-bottom:14px">
      <b>${t.grade} — ${t.topic}</b><br>${t.lead}
      <ol class="tk-list" style="margin-top:8px">${t.qs.map(q=>`<li>${q}</li>`).join('')}</ol>
    </div>`).join('')}
    <div style="margin-top:8px"><button class="btn ghost sm" onclick="back()">← Back</button></div>
  </div>`;
  window.scrollTo(0,0);
}

/* ---------- Surf the net ---------- */
function extraSurf(){
  const S=EXTRAS.SURF||[];
  if(!S.length){ stage.innerHTML=`<div class="panel"><p class="muted">Este libro no tiene esta sección.</p></div>`; return; }
  crumbEl.innerHTML='Surf the net';
  stage.innerHTML=`<div class="panel">
    <div class="qnum">SURF THE NET</div>
    <h2 style="color:var(--blue-d);margin:2px 0 6px">🌐 Surf the net</h2>
    <p class="muted" style="margin:0 0 14px">Research tasks about the real world behind the story.</p>
    ${S.map(s=>`<div class="explain" style="margin-bottom:14px">
      <b>${s.title}</b><br>${s.intro}
      <ol class="tk-list" style="margin-top:8px">${s.qs.map(q=>`<li>${q}</li>`).join('')}</ol>
    </div>`).join('')}
    <div style="margin-top:8px"><button class="btn ghost sm" onclick="back()">← Back</button></div>
  </div>`;
  window.scrollTo(0,0);
}
