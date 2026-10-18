/* Daily English — adaptador de NIS (Supabase). El núcleo está en daily-core.js.
   Elenco: SOLO personajes de las biblias (nis-fun/characters/bible.md y
   ket-cast-bible.md). Primaria (grado ≤ 5): los cuatro niños del nivel Fun
   (FUN_REPARTO); secundaria: Mateo, Sofia, Liam y Nadia, con Miss Vega en el
   reto. El presentador rota por día para que todos salgan. */
(function(){
  'use strict';
  const CH = 'nis-fun/assets/characters/';
  const KIDS = {
    starters: ['freya','nico','astrid','tomas'],
    movers:   ['erik','valentina','sofia','mateo'],
    flyers:   ['ingrid','diego','maya','oliver'],
  };
  const CLASSMATES = ['lia','bruno','aiko','samu','iris','tino'];
  const NAMES = { freya:'Freya', nico:'Nico', astrid:'Astrid', tomas:'Tomás', erik:'Erik', valentina:'Valentina',
    sofia:'Sofía', mateo:'Mateo', ingrid:'Ingrid', diego:'Diego', maya:'Maya', oliver:'Oliver',
    lia:'Lía', bruno:'Bruno', aiko:'Aiko', samu:'Samu', iris:'Iris', tino:'Tino' };
  const TEENS = [['mateo','Mateo'],['sofia','Sofia'],['liam','Liam'],['nadia','Nadia']];

  function dayIndex(){ try{ return Math.floor(Date.parse(DailyCore.limaDate() + 'T00:00:00Z') / 864e5); }catch(e){ return 0; } }

  function castFor(grade){
    const d = dayIndex();
    if(grade != null && grade <= 5){
      const lvl = (typeof FUN_REPARTO !== 'undefined' && FUN_REPARTO[grade]) || 'starters';
      const kids = KIDS[lvl] || KIDS.starters;
      const h = kids[d % 4], a = kids[(d + 1) % 4];
      const bIsMate = d % 3 === 0;
      const b = bIsMate ? CLASSMATES[d % CLASSMATES.length] : kids[(d + 2) % 4];
      const p = (s, n) => CH + lvl + '/' + s + '/pose-' + n + '.png';
      return {
        host:  { name: NAMES[h], img: p(h, '03') },
        A:     { name: NAMES[a], img: p(a, '01') },
        B:     { name: NAMES[b], img: p(b, bIsMate ? '03' : '03') },
        think: { name: NAMES[h], img: p(h, '04') },
        cheer: { name: NAMES[h], img: p(h, '10') },
      };
    }
    const t = TEENS, h = t[d % 4], a = t[(d + 1) % 4], b = t[(d + 2) % 4];
    const bust = s => CH + 'cast/' + s + '/center-bust.jpg';
    return {
      host:  { name: h[1], img: bust(h[0]) },
      A:     { name: a[1], img: bust(a[0]) },
      B:     { name: b[1], img: bust(b[0]) },
      think: { name: 'Miss Vega', img: bust('vega') },
      cheer: { name: h[1], img: bust(h[0]) },
    };
  }

  function levelsFor(p){
    const g = p && p.grade_id;
    if(g != null && g <= 5) return { band:'K', level:'K', kids:true };
    let c = String((p && p.cefr_level) || '').toUpperCase().replace(/[^ABC12]/g, '').slice(0, 2);
    if(!c) c = (g === 6 || g === 7) ? 'A2' : 'B1';
    const band = (c === 'A1' || c === 'A2') ? 'A2' : c === 'B1' ? 'B1' : 'B2C1';
    const level = (c === 'A1' || c === 'A2') ? 'A2' : c === 'B1' ? 'B1' : c === 'B2' ? 'B2' : 'C1';
    return { band, level, kids:false };
  }

  const api = {
    reactions(day){
      return Promise.all([
        sb.rpc('daily_reaction_counts', { p_day: day }),
        sb.from('daily_reactions').select('emoji').eq('day', day),
      ]).then(([c, m]) => {
        const counts = {}; (c.data || []).forEach(r => counts[r.emoji] = Number(r.n) || 0);
        return { counts, mine: (m.data || []).map(r => r.emoji) };
      });
    },
    react(day, emoji, on){
      const uid = (typeof state !== 'undefined' && state.profile) ? state.profile.id : null;
      return on
        ? sb.from('daily_reactions').insert({ day, emoji })
        : sb.from('daily_reactions').delete().eq('day', day).eq('emoji', emoji).eq('student_id', uid);
    },
    answer(day, level, day_no, choice){
      return sb.from('daily_answers').insert({ day, level, day_no, choice }).then(r => { if(r.error) throw r.error; return true; });
    },
    result(day, level, day_no){
      return sb.rpc('daily_result', { p_day: day, p_level: level, p_day_no: day_no }).then(r => {
        if(r.error) throw r.error;
        const x = (r.data || [])[0]; return x || null;
      });
    },
    streak(){
      return sb.from('daily_streaks').select('streak,best,last_day').maybeSingle().then(r => {
        const s = r.data; if(!s) return null;
        // La racha solo sigue viva si respondió hoy o ayer.
        const gap = Math.round((Date.parse(DailyCore.limaDate()) - Date.parse(s.last_day)) / 864e5);
        return gap <= 1 ? s : { streak: 0, best: s.best };
      });
    },
    rank(){
      return sb.rpc('daily_my_rank').then(r => (r.data || [])[0] || null);
    },
  };

  window.dailyEnglish = {
    mount(id){
      try{
        const el = document.getElementById(id);
        if(!el || !window.DailyCore || typeof state === 'undefined' || !state.profile) return;
        const p = state.profile, L = levelsFor(p);
        DailyCore.mount(el, {
          base: 'daily-english/',
          band: L.band, level: L.level,
          ladders: !L.kids, culture: !L.kids,
          cast: castFor(p.grade_id),
          api: (typeof sb !== 'undefined' && sb) ? api : null,
          lang: 'en',
        }).catch(e => { console.warn('daily', e); el.innerHTML = ''; });
      }catch(e){ console.warn('daily', e); }
    },
    _castFor: castFor, _levelsFor: levelsFor,
  };
})();
