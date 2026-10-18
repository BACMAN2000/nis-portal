/* Daily English — núcleo común de NIS y cohasset.pe (18-oct-2026).
   Pinta una tarjeta con cuatro pestañas: frase del día (con personaje y
   bocadillo), reto del día (la solución sale a las 16:00 de Lima), escalera
   de palabras y cultura de la semana. No sabe nada de Supabase ni de
   FastAPI: cada web le pasa un adaptador `api` y su elenco `cast`.
   Regla «nada incompleto en vivo»: si falta el contenido de un día, esa
   pestaña no se pinta; si no queda ninguna, no aparece la tarjeta.
   El origen vive en nis-portal; cohasset recibe una copia con
   tools/daily/sincroniza.py. */
(function(){
  'use strict';
  const DAY = 864e5;
  const EMOJIS = [['heart','❤️'],['laugh','😂'],['fire','🔥'],['mind','🤯'],['clap','👏']];
  const LETTERS = ['A','B','C','D'];

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* Lima es UTC-5 todo el año (sin horario de verano). */
  function limaNow(){ return new Date(Date.now() - 5 * 3600e3); }
  function limaDate(){ return limaNow().toISOString().slice(0, 10); }
  function limaHour(){ return limaNow().getUTCHours(); }
  function daysBetween(a, b){ return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / DAY); }
  function dayNo(anchor, date, n){ const d = daysBetween(anchor, date); return ((d % n) + n) % n + 1; }
  function isoWeek(date){
    const d = new Date(date + 'T00:00:00Z'); const wd = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - wd + 3);
    const y = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((d - y) / DAY - 3 + ((y.getUTCDay() + 6) % 7)) / 7);
  }

  const cache = {};
  function getJSON(url){
    if(!cache[url]) cache[url] = fetch(url, {cache:'no-cache'}).then(r => r.ok ? r.json() : null).catch(() => null);
    return cache[url];
  }

  function fill(s, cast){
    return esc(s).replace(/\{A\}/g, '<b>' + esc(cast.A.name) + '</b>').replace(/\{B\}/g, '<b>' + esc(cast.B.name) + '</b>');
  }

  /* Audio: el mp3 pregrabado (Edge TTS); si no está, la voz del navegador. */
  function speak(url, text){
    try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
    const fallback = () => {
      try{
        if(!window.speechSynthesis || !text) return;
        const u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = 0.92;
        speechSynthesis.speak(u);
      }catch(e){}
    };
    if(!url){ fallback(); return; }
    const a = new Audio(url);
    a.onerror = fallback;
    a.play().catch(fallback);
  }

  function okPhrase(p){ return p && p.ok !== false && p.text && p.meaning_en && p.example && p.scene && p.bubble; }
  function okChallenge(c){ return c && c.ok !== false && c.stem && Array.isArray(c.options) && c.options.length === 4; }
  function okLadder(l){ return l && Array.isArray(l.steps) && l.steps.length >= 3; }
  function okCulture(c){ return c && c.title && c.text && Array.isArray(c.questions) && c.questions.length; }

  function img(src, cls, alt){
    return src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" onerror="this.style.display='none'">` : '';
  }

  /* ---------- pintado ---------- */

  async function mount(el, o){
    if(!el) return;
    const T = k => (o.t && o.t(k)) || k;
    const base = o.base != null ? o.base : 'daily-english/';
    const ix = await getJSON(base + 'bank/index.json');
    if(!ix || !ix.anchor) return;
    const today = o.today || limaDate();
    const band = o.band, level = o.level;
    const live = ix.live || {};
    const want = (k) => live[k] !== false;

    const [phrases, challenges, ladders, culture] = await Promise.all([
      band && want('phrases-' + band) ? getJSON(base + 'bank/phrases-' + band + '.json') : null,
      level && want('challenges-' + level) ? getJSON(base + 'bank/challenges-' + level + '.json') : null,
      o.ladders !== false && want('ladders') ? getJSON(base + 'bank/ladders.json') : null,
      o.culture !== false && want('culture') ? getJSON(base + 'bank/culture.json') : null,
    ]);

    const S = {};
    if(Array.isArray(phrases) && phrases.length){
      const n = dayNo(ix.anchor, today, phrases.length);
      const p = phrases.find(x => x.day === n);
      if(okPhrase(p)) S.phrase = p;
    }
    if(Array.isArray(challenges) && challenges.length){
      const n = dayNo(ix.anchor, today, challenges.length);
      const c = challenges.find(x => x.day === n);
      if(okChallenge(c)) S.challenge = Object.assign({day_no:n}, c);
    }
    if(Array.isArray(ladders) && ladders.length){
      const n = dayNo(ix.anchor, today, ladders.length);
      const l = ladders[n - 1];
      if(okLadder(l)) S.ladder = l;
    }
    if(Array.isArray(culture) && culture.length){
      const w = isoWeek(today);
      const c = culture.find(x => x.week === w) || culture[(w - 1) % culture.length];
      if(okCulture(c)) S.culture = c;
    }
    const tabs = [['phrase','💬',T('Phrase')],['challenge','🏆',T('Challenge')],['ladder','📶',T('Word ladder')],['culture','🌍',T('Culture')]]
      .filter(t => S[t[0]]);
    if(!tabs.length){ el.innerHTML = ''; return; }

    const fecha = new Date(today + 'T12:00:00Z').toLocaleDateString(o.lang === 'es' ? 'es-PE' : 'en-GB', {weekday:'long', day:'numeric', month:'long', timeZone:'UTC'});
    let cur = (() => { try{ const k = localStorage.getItem('daily.tab'); return S[k] ? k : tabs[0][0]; }catch(e){ return tabs[0][0]; } })();

    el.innerHTML = `<section class="dly" aria-label="Daily English">
      <header class="dly-head">
        <div class="dly-title"><span class="dly-spark" aria-hidden="true">✨</span>
          <div><div class="dly-kicker">${esc(T('Daily English'))} · ${esc(fecha)}</div>
          <h2 class="dly-h">${esc(T('Your English boost for today'))}</h2></div></div>
        <div class="dly-streak" hidden></div>
      </header>
      <nav class="dly-tabs" role="tablist">${tabs.map(t => `<button role="tab" class="dly-tab dly-tab-${t[0]}" data-k="${t[0]}"><span aria-hidden="true">${t[1]}</span> ${esc(t[2])}</button>`).join('')}</nav>
      <div class="dly-body"></div>
    </section>`;
    const body = el.querySelector('.dly-body');
    const show = k => {
      cur = k;
      try{ localStorage.setItem('daily.tab', k); }catch(e){}
      el.querySelectorAll('.dly-tab').forEach(b => { const on = b.dataset.k === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      body.className = 'dly-body dly-pane-' + k;
      body.innerHTML = '';
      try{ ({phrase:paintPhrase, challenge:paintChallenge, ladder:paintLadder, culture:paintCulture})[k](body); }catch(e){ console.warn('daily', e); }
    };
    el.querySelectorAll('.dly-tab').forEach(b => b.onclick = () => show(b.dataset.k));
    show(cur);

    /* Racha: si el adaptador la sabe dar. */
    if(o.api && o.api.streak){
      o.api.streak().then(s => {
        if(!s || !s.streak) return;
        const box = el.querySelector('.dly-streak');
        box.hidden = false;
        box.innerHTML = `<span class="dly-flame" aria-hidden="true">🔥</span><b>${s.streak}</b><span>${esc(T(s.streak === 1 ? 'day' : 'days'))}</span>`;
        box.title = T('Best streak') + ': ' + (s.best || s.streak);
      }).catch(() => {});
    }

    /* ---- Frase del día ---- */
    function paintPhrase(b){
      const p = S.phrase, cast = o.cast;
      const au = p.audio || {};
      b.innerHTML = `<div class="dly-stage">
          <div class="dly-actor">${img(cast.host.img, 'dly-host', cast.host.name)}<div class="dly-name">${esc(cast.host.name)}</div></div>
          <div class="dly-bubble">
            <div class="dly-type">${esc(T(p.type || 'phrase'))} · ${esc(p.level || '')}</div>
            <div class="dly-phrase">“${esc(p.text)}” <button class="dly-play" data-a="t" aria-label="${esc(T('Listen'))}">🔊</button></div>
            <div class="dly-mean">${esc(p.meaning_en)}${o.lang === 'es' || o.showEs ? `<span class="dly-es"> · ${esc(p.meaning_es || '')}</span>` : ''}</div>
          </div>
        </div>
        <div class="dly-scene"><div class="dly-scene-txt">🎬 ${fill(p.scene, cast)}</div>
          <div class="dly-scene-say">${img(cast.B.img, 'dly-mini', cast.B.name)}<span>${fill(p.bubble, cast)}</span></div></div>
        <div class="dly-example"><span class="dly-ex-k">${esc(T('Example'))}</span> <i>${esc(p.example)}</i>
          <button class="dly-play" data-a="ex" aria-label="${esc(T('Listen'))}">🔊</button></div>
        ${p.practice && Array.isArray(p.practice.options) ? `<div class="dly-quiz"><div class="dly-q">🎯 ${esc(p.practice.q)}</div>
          <div class="dly-opts">${p.practice.options.map((x, i) => `<button class="dly-opt" data-i="${i}"><span class="dly-l">${LETTERS[i]}</span>${esc(x)}</button>`).join('')}</div>
          <div class="dly-fb" aria-live="polite"></div></div>` : ''}
        <div class="dly-react"></div>`;
      b.querySelectorAll('.dly-play').forEach(btn => btn.onclick = () => {
        const which = btn.dataset.a;
        btn.classList.add('dly-pulse'); setTimeout(() => btn.classList.remove('dly-pulse'), 700);
        speak(au[which === 't' ? 'text' : 'example'] ? base + au[which === 't' ? 'text' : 'example'] : null, which === 't' ? p.text : p.example);
      });
      const fb = b.querySelector('.dly-fb');
      b.querySelectorAll('.dly-opt').forEach(btn => btn.onclick = () => {
        const i = +btn.dataset.i, ok = i === p.practice.a;
        b.querySelectorAll('.dly-opt').forEach(x => { x.disabled = true; if(+x.dataset.i === p.practice.a) x.classList.add('ok'); });
        if(!ok) btn.classList.add('ko');
        fb.innerHTML = `<div class="dly-fb-in ${ok ? 'ok' : 'ko'}">${img(ok ? cast.cheer.img : cast.think.img, 'dly-mini', '')}
          <span><b>${esc(T(ok ? 'Brilliant!' : 'Nearly!'))}</b> ${esc(p.practice.why || '')}</span></div>`;
        if(ok) confetti(btn);
      });
      paintReactions(b.querySelector('.dly-react'));
    }

    function paintReactions(box){
      if(!box) return;
      const counts = {}, mine = new Set();
      const draw = () => {
        box.innerHTML = `<span class="dly-react-k">${esc(T('How do you like it?'))}</span>` + EMOJIS.map(([k, e]) =>
          `<button class="dly-emo ${mine.has(k) ? 'on' : ''}" data-k="${k}" aria-pressed="${mine.has(k)}"><span>${e}</span>${counts[k] ? `<small>${counts[k]}</small>` : ''}</button>`).join('');
        box.querySelectorAll('.dly-emo').forEach(btn => btn.onclick = () => {
          const k = btn.dataset.k, on = !mine.has(k);
          on ? mine.add(k) : mine.delete(k);
          counts[k] = Math.max(0, (counts[k] || 0) + (on ? 1 : -1));
          draw();
          if(on){ const nb = box.querySelector(`[data-k="${k}"]`); nb && nb.classList.add('dly-pop'); }
          if(o.api && o.api.react) o.api.react(today, k, on).catch(() => {});
        });
      };
      draw();
      if(o.api && o.api.reactions) o.api.reactions(today).then(r => {
        if(!r) return;
        Object.assign(counts, r.counts || {}); (r.mine || []).forEach(k => mine.add(k)); draw();
      }).catch(() => {});
    }

    /* ---- Reto del día ---- */
    function paintChallenge(b){
      const c = S.challenge, cast = o.cast;
      const before = today === limaDate() && limaHour() < 16;
      b.innerHTML = `<div class="dly-ch-head">${img(cast.think.img, 'dly-host sm', cast.think.name)}
          <div><div class="dly-type">${esc(T(c.skill || 'challenge'))} · ${esc(level)}</div>
          <div class="dly-ch-rule">${esc(T(before ? 'One try only. The answer appears today at 4 pm.' : 'The answer is out! Come back tomorrow for a new one.'))}</div></div></div>
        <div class="dly-stem">${esc(c.stem).replace(/_{2,}/g, '<span class="dly-gap">_____</span>')}</div>
        <div class="dly-opts four">${c.options.map((x, i) => `<button class="dly-opt" data-i="${i}"><span class="dly-l">${LETTERS[i]}</span>${esc(x)}</button>`).join('')}</div>
        <div class="dly-fb" aria-live="polite"></div>
        <div class="dly-rank"></div>`;
      const fb = b.querySelector('.dly-fb');
      const opts = [...b.querySelectorAll('.dly-opt')];
      const lock = (mine, res) => {
        opts.forEach(x => {
          x.disabled = true;
          const i = +x.dataset.i;
          x.classList.toggle('mine', i === mine);
          if(res && res.revealed && res.correct != null){
            if(i === res.correct) x.classList.add('ok');
            else if(i === mine) x.classList.add('ko');
          }
        });
        if(res && res.revealed && res.correct != null){
          const ok = mine === res.correct;
          fb.innerHTML = `<div class="dly-fb-in ${mine == null ? '' : ok ? 'ok' : 'ko'}">${img(ok ? cast.cheer.img : cast.think.img, 'dly-mini', '')}
            <span><b>${esc(T(mine == null ? 'Here is the answer' : ok ? 'You got it!' : 'Not this time'))}</b> ${esc(res.explain || '')}</span></div>`;
        } else if(mine != null){
          fb.innerHTML = `<div class="dly-fb-in wait">⏳ <span><b>${esc(T('Answer saved!'))}</b> ${esc(T('Come back at 4 pm to see if you got it.'))}</span></div>`;
        }
      };
      const canPlay = !!(o.api && o.api.answer);
      if(!canPlay){ opts.forEach(x => x.disabled = true); }
      const load = () => o.api && o.api.result ? o.api.result(today, level, c.day_no).catch(() => null) : Promise.resolve(null);
      load().then(res => {
        const mine = res && res.mine != null ? res.mine : null;
        if(mine != null || (res && res.revealed) || !before) lock(mine, res);
        else opts.forEach(x => x.onclick = () => {
          const i = +x.dataset.i;
          opts.forEach(y => y.disabled = true);
          x.classList.add('mine', 'dly-pop');
          o.api.answer(today, level, c.day_no, i).then(() => { lock(i, null); confetti(x, 14); refreshStreak(); })
            .catch(() => { opts.forEach(y => { y.disabled = false; y.classList.remove('mine'); });
              fb.innerHTML = `<div class="dly-fb-in ko">${esc(T('Could not save. Try again.'))}</div>`; });
        });
      });
      if(o.api && o.api.rank) o.api.rank().then(r => {
        if(!r || !r.of_total || r.of_total < 2) return;
        b.querySelector('.dly-rank').innerHTML = `<div class="dly-rank-in">🏅 ${esc(T('This month'))}: <b>${r.points || 0}</b> ${esc(T('points'))} · ${esc(T('you are'))} <b>#${r.rank}</b> ${esc(T('of'))} ${r.of_total}${r.section ? ' ' + esc(T('in your class')) : ''}${r.top_points ? ` · ${esc(T('top'))}: ${r.top_points}` : ''}</div>`;
      }).catch(() => {});
    }
    function refreshStreak(){
      if(!(o.api && o.api.streak)) return;
      o.api.streak().then(s => {
        if(!s || !s.streak) return;
        const box = el.querySelector('.dly-streak'); box.hidden = false;
        box.innerHTML = `<span class="dly-flame" aria-hidden="true">🔥</span><b>${s.streak}</b><span>${esc(T(s.streak === 1 ? 'day' : 'days'))}</span>`;
        box.classList.add('dly-pop');
      }).catch(() => {});
    }

    /* ---- Escalera de palabras ---- */
    function paintLadder(b){
      const l = S.ladder;
      const steps = l.steps.slice().sort((x, y) => x.n - y.n);
      b.innerHTML = `<div class="dly-type">${esc(T('From mild to strong'))}</div>
        <div class="dly-ladder">${steps.map((s, i) => `<button class="dly-rung" style="--n:${s.n};--i:${i}" data-w="${esc(s.w)}">
          <span class="dly-bar"></span><span class="dly-w">${esc(s.w)}</span><span class="dly-dots">${'●'.repeat(s.n)}${'○'.repeat(5 - s.n)}</span></button>`).join('')}</div>
        ${l.ex ? `<div class="dly-example"><span class="dly-ex-k">${esc(T('Example'))}</span> <i>${esc(l.ex)}</i></div>` : ''}
        ${l.note_es && o.lang === 'es' ? `<div class="dly-note">${esc(l.note_es)}</div>` : ''}`;
      b.querySelectorAll('.dly-rung').forEach(r => r.onclick = () => speak(null, r.dataset.w));
    }

    /* ---- Cultura de la semana ---- */
    function paintCulture(b){
      const c = S.culture;
      b.innerHTML = `<div class="dly-type">${esc(T('Culture of the week'))}${c.tags ? ' · ' + c.tags.map(esc).join(' · ') : ''}</div>
        <h3 class="dly-cult-t">${esc(c.title)} ${c.audio ? `<button class="dly-play" aria-label="${esc(T('Listen'))}">🔊</button>` : `<button class="dly-play" aria-label="${esc(T('Listen'))}">🔊</button>`}</h3>
        <div class="dly-cult-txt">${c.text.split(/\n+/).map(x => `<p>${esc(x)}</p>`).join('')}</div>
        <div class="dly-cult-q">${c.questions.map((q, qi) => `<div class="dly-quiz" data-q="${qi}"><div class="dly-q">${qi + 1}. ${esc(q.q)}</div>
          <div class="dly-opts">${q.options.map((x, i) => `<button class="dly-opt" data-i="${i}"><span class="dly-l">${LETTERS[i]}</span>${esc(x)}</button>`).join('')}</div></div>`).join('')}
          <div class="dly-fb" aria-live="polite"></div></div>`;
      const pl = b.querySelector('.dly-play');
      pl.onclick = () => speak(c.audio ? base + c.audio : null, c.title + '. ' + c.text);
      let done = 0, good = 0;
      b.querySelectorAll('.dly-cult-q .dly-quiz').forEach(qd => {
        const q = c.questions[+qd.dataset.q];
        qd.querySelectorAll('.dly-opt').forEach(btn => btn.onclick = () => {
          const i = +btn.dataset.i;
          qd.querySelectorAll('.dly-opt').forEach(x => { x.disabled = true; if(+x.dataset.i === q.a) x.classList.add('ok'); });
          if(i !== q.a) btn.classList.add('ko'); else good++;
          if(++done === c.questions.length){
            b.querySelector('.dly-cult-q > .dly-fb').innerHTML = `<div class="dly-fb-in ${good === done ? 'ok' : ''}">${img(o.cast.cheer.img, 'dly-mini', '')}<span><b>${good}/${done}</b> ${esc(T(good === done ? 'Perfect! You are a culture star.' : 'Well done! Read it again and try tomorrow.'))}</span></div>`;
            if(good === done) confetti(btn, 22);
          }
        });
      });
    }
  }

  /* Confeti ligero sin librerías; respeta reduced-motion. */
  function confetti(from, n){
    try{
      if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const r = from.getBoundingClientRect();
      const cols = ['#ff5d8f','#ffb703','#3ddc97','#4cc9f0','#7b61ff','#ff7a00'];
      for(let i = 0; i < (n || 18); i++){
        const s = document.createElement('i');
        s.className = 'dly-conf';
        s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
        s.style.background = cols[i % cols.length];
        s.style.setProperty('--dx', (Math.random() * 220 - 110) + 'px');
        s.style.setProperty('--dy', (-60 - Math.random() * 140) + 'px');
        s.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1100);
      }
    }catch(e){}
  }

  window.DailyCore = { mount, limaDate, limaHour, dayNo, isoWeek };
})();
