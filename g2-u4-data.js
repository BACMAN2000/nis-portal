/* Unit 4 · 2nd grade (Primary) — "In the Kitchen".
   Vocabulario + utilidades COMPARTIDAS por los juegos de primaria:
   listen-touch-g2u4, kitchen-sort-g2u4, memory-g2u4, word-builder-g2u4
   y recipe-builder-g2u4 (mismo patrón engine+data que games-lab).
   Si cambia una palabra aquí, cambia en los cinco juegos a la vez. */
window.G2U4 = (function(){

  /* No hay emoji de yogurt ni de squeezer/chopping board: se usan las
     aproximaciones de siempre en material infantil (la palabra escrita y el
     audio acompañan SIEMPRE al dibujo, así que el emoji es solo apoyo). */
  const ACTIONS = [
    {w:'slice',   ico:'🔪'},
    {w:'spread',  ico:'🧈'},
    {w:'cut',     ico:'✂️'},
    {w:'chop',    ico:'🪓'},
    {w:'add',     ico:'➕'},
    {w:'serve',   ico:'🛎️'},
    {w:'pour',    ico:'🫗'},
    {w:'squeeze', ico:'🤏'},
    {w:'mix',     ico:'🌀'},
    {w:'peel',    ico:'🍌'},
  ];
  const INGREDIENTS = [
    {w:'tomato',     ico:'🍅'}, {w:'corn',    ico:'🌽'}, {w:'chicken', ico:'🍗'},
    {w:'fish',       ico:'🐟'}, {w:'meat',    ico:'🥩'}, {w:'onion',   ico:'🧅'},
    {w:'bread',      ico:'🍞'}, {w:'apple',   ico:'🍎'}, {w:'rice',    ico:'🍚'},
    {w:'yogurt',     ico:'🍨'}, {w:'milk',    ico:'🥛'}, {w:'strawberry', ico:'🍓'},
    {w:'carrot',     ico:'🥕'}, {w:'ham',     ico:'🍖'}, {w:'egg',     ico:'🥚'},
    {w:'lettuce',    ico:'🥬'}, {w:'pasta',   ico:'🍝'}, {w:'cheese',  ico:'🧀'},
    {w:'banana',     ico:'🍌'}, {w:'lemon',   ico:'🍋'}, {w:'blueberry', ico:'🫐'},
    {w:'orange',     ico:'🍊'},
  ];
  const UTENSILS = [
    {w:'squeezer',       ico:'🍊🥤'},
    {w:'chopping board', ico:'🪵'},
    {w:'plate',          ico:'🍽️'},
    {w:'spoon',          ico:'🥄'},
    {w:'knife',          ico:'🔪'},
    {w:'fork',           ico:'🍴'},
    {w:'bowl',           ico:'🥣'},
    {w:'glass',          ico:'🥤'},
  ];
  const ALL = [].concat(ACTIONS, INGREDIENTS, UTENSILS);
  const ICO = {}; ALL.forEach(x=>ICO[x.w]=x.ico);

  /* ---------- audio ----------
     Con HAS_MP3=true, `say()` reproduce g2u4-audio/<id>.mp3 (voz de niño,
     ElevenLabs vía gen_g2u4_audio.py) y cae a speechSynthesis si el archivo
     falla. Con false NI SIQUIERA lo intenta (no sondear 404, como el
     francés). ids: palabras → 'w-<slug>' (automático); frases → id explícito
     ('step-sandwich-1', 'done-salad'…). */
  const HAS_MP3 = true;    // g2u4-audio/ generado 2026-08-20 (voz Emmaline, niña británica)
  const AUDIO_BASE = 'g2u4-audio/';
  let _voice = null;
  function _pickVoice(){
    if(_voice) return _voice;
    const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    _voice = vs.find(v=>/^en[-_]US/i.test(v.lang)) || vs.find(v=>/^en/i.test(v.lang)) || null;
    return _voice;
  }
  if(window.speechSynthesis) speechSynthesis.onvoiceschanged = ()=>{ _voice=null; _pickVoice(); };
  function _tts(text, rate){
    try{
      if(!window.speechSynthesis) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = _pickVoice(); if(v) u.voice = v;
      u.lang = 'en-US'; u.rate = rate || 0.85; u.pitch = 1.05;
      speechSynthesis.speak(u);
    }catch(e){}
  }
  const _slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  let _playing = null;
  function say(text, rate, id){
    const key = id || (ICO[text] ? 'w-'+_slug(text) : null);
    if(HAS_MP3 && key){
      try{
        if(_playing){ _playing.pause(); _playing=null; }
        if(window.speechSynthesis) speechSynthesis.cancel();
        const a = new Audio(AUDIO_BASE + key + '.mp3');
        a.onerror = ()=>_tts(text, rate);
        _playing = a;
        a.play().catch(()=>_tts(text, rate));
        return;
      }catch(e){}
    }
    _tts(text, rate);
  }

  /* ---------- sonidos de acierto/fallo (WebAudio, sin archivos) ---------- */
  let _ac = null;
  function _ctx(){ try{ _ac = _ac || new (window.AudioContext||window.webkitAudioContext)(); return _ac; }catch(e){ return null; } }
  function _beep(freq, dur, type, when){
    const c=_ctx(); if(!c) return;
    const o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(0.001, c.currentTime+when);
    g.gain.exponentialRampToValueAtTime(0.2, c.currentTime+when+0.02);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime+when+dur);
    o.connect(g); g.connect(c.destination);
    o.start(c.currentTime+when); o.stop(c.currentTime+when+dur+0.05);
  }
  function ding(){ _beep(660,.15,'sine',0); _beep(880,.2,'sine',.12); }
  function buzz(){ _beep(180,.25,'square',0); }
  function fanfare(){ [523,659,784,1047].forEach((f,i)=>_beep(f,.22,'sine',i*.14)); }

  /* ---------- confeti ligero (emoji que caen) ---------- */
  function confetti(n){
    const EMO=['🎉','⭐','🍓','🍋','🥳','✨','🍊','💫'];
    for(let i=0;i<(n||24);i++){
      const s=document.createElement('span');
      s.textContent=EMO[Math.floor(Math.random()*EMO.length)];
      s.style.cssText='position:fixed;z-index:9999;pointer-events:none;font-size:'+(18+Math.random()*22)+'px;'+
        'left:'+(Math.random()*100)+'vw;top:-40px;transition:transform '+(1.4+Math.random())+'s ease-in, opacity .4s '+(1.2+Math.random())+'s;';
      document.body.appendChild(s);
      requestAnimationFrame(()=>{ s.style.transform='translateY('+(70+Math.random()*40)+'vh) rotate('+(Math.random()*720-360)+'deg)'; s.style.opacity='0'; });
      setTimeout(()=>s.remove(), 2600);
    }
  }

  /* ---------- puente con el Portal (mismo patrón que grammar-lab) ---------- */
  const NISACT = (function () {
    let _sb = null;
    function client(){ if(_sb) return _sb; if(!window.supabase||!window.NIS_CONFIG) return null;
      _sb = window.supabase.createClient(NIS_CONFIG.SUPABASE_URL, NIS_CONFIG.SUPABASE_KEY); return _sb; }
    async function student(){ const c=client(); if(!c) return null;
      try{ const u=await c.auth.getUser(); if(!u||!u.data||!u.data.user) return null;
        const p=await c.from('profiles').select('full_name,first_name,email').eq('id',u.data.user.id).maybeSingle();
        const d=(p&&p.data)||{};
        return {uid:u.data.user.id,email:u.data.user.email||d.email,full_name:d.full_name,first_name:d.first_name};
      }catch(e){ return null; } }
    async function submit(r){
      const s=await student(); if(!s) return {skipped:true};
      try{ await client().from('activity_attempts').insert({student_id:s.uid,activity:r.activity,title:r.title,
        level:r.level||'A1',score:r.score,total:r.total,hints_used:r.hints||0,lives_left:r.lives||3,duration_sec:r.duration}); }catch(e){}
      try{ const m=Math.floor(r.duration/60), sec=r.duration%60;
        await fetch(NIS_CONFIG.WRITING_WEBHOOK,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},
          body:JSON.stringify({skill:'Vocabulary',name:s.full_name||s.first_name||'',email:s.email||'',level:r.level||'A1',
            examTitle:r.title+' - Time '+m+'m '+String(sec).padStart(2,'0')+'s',
            examType:r.activity,score:r.score,total:r.total,duration_min:Math.max(1,Math.round(r.duration/60))})});
      }catch(e){}
      return {sent:true};
    }
    return {submit};
  })();

  /* mejor marca por juego/modo, en el navegador del alumno */
  function getBest(key){ try{ return JSON.parse(localStorage.getItem('g2u4:'+key)||'null'); }catch(e){ return null; } }
  function setBest(key,pct){
    const b=getBest(key);
    if(!b || pct>b.pct){ try{ localStorage.setItem('g2u4:'+key,JSON.stringify({pct:pct})); }catch(e){} }
  }

  const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

  return { ACTIONS, INGREDIENTS, UTENSILS, ALL, ICO,
           say, ding, buzz, fanfare, confetti, NISACT, getBest, setBest, shuffle };
})();
