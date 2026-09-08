/* Rubricas de produccion escrita — AD / A / B / C.
 *
 * Por que existe este archivo y no vive dentro de unit-plans.js: unit-plans.js
 * es copia literal del planner de Toddle y no se inventa nada ahi. La rubrica
 * de un writing SI es nuestra: sale de los criterios de la unidad —los mismos
 * que el alumno vio el dia uno en unit.html— pero especializada para el texto
 * escrito. Cada criterio declara en `from` de que criterio del planner nace, y
 * la rubrica declara en `fuera` que criterios de la unidad NO se corrigen aqui
 * porque no son de escritura (el podcast, la exposicion oral).
 *
 * Forma:
 *   WRITING_RUBRICS[grade][unit][kind] = {
 *     task, spec, range:[lo,hi], nota:'del planner …',
 *     fuera:'…',                       criterios de la unidad que no aplican
 *     criteria:[{ k, n, text, from, auto, levels:{AD,A,B,C} }]
 *   }
 *   k     clave con que se guarda en unit_submissions.criteria ('w1', 'w2', …).
 *         Va prefijada para no chocar con el 1/2/3 de Productos de unidad,
 *         que son las tres competencias del area (Speaking / Reading / Writing).
 *   from  numero del criterio de la unidad en unit-plans.js.
 *   auto  que puede medir la maquina en ese criterio; null = solo el docente.
 *
 * La nota: el colegio califica AD·A·B·C (escala MINEDU). Cada criterio se
 * convierte al centro de su tramo vigesimal (AD 18-20, A 14-17, B 11-13,
 * C 0-10), se promedian los criterios y la nota resultante vuelve a letra con
 * la misma tabla. Asi "todo B" da 12, que es B — sumar puntos no lo daba.
 */
window.WRITING_RUBRICS = (function(){

  const NIVELES   = ['AD','A','B','C'];      // de mayor a menor, como en todo el portal
  const VIGESIMAL = { AD:19, A:16, B:12, C:8 };
  const SIGNIFICA = { AD:'logro destacado', A:'logro esperado', B:'en proceso', C:'en inicio' };

  const DATOS = {

  /* ============================================================ 9.º ==== */
  g9: {

    /* ---- U4 · Mind Over Matter — The Wellbeing Generation ------------
       Criterios del planner: 1 Content & relevance · 2 Language use ·
       3 Register & tone · 4 Structure · 5 Engagement · 6 Collaboration.
       El 6 es del podcast en pareja y no se corrige en un texto escrito.
       El 4 y el 5 hablan de articulo Y podcast: aqui se quedan con la
       mitad escrita. */
    4: {

      report: {
        task:'Magazine article',
        spec:'140–190 words · FCE Writing Part 2',
        range:[140,190],
        nota:'Los cinco criterios salen de la rubrica de la unidad que el alumno tiene delante desde el dia uno.',
        fuera:'Criterio 6 (Collaboration) — es del podcast en pareja, no del articulo.',
        criteria:[

          { k:'w1', n:1, from:1, auto:'evidence',
            text:'Content & evidence — an evidence-based wellbeing topic that matters to a teenage reader.',
            levels:{
              AD:'I choose a topic others overlook and I weigh the evidence instead of just quoting it.',
              A:'My topic matters to a teenager my age and I back it with evidence from what I read or listened to.',
              B:'I choose a wellbeing topic, but I rely on my own opinion more than on what I read.',
              C:'I write about wellbeing in general, or about something that is not a wellbeing topic at all, and without evidence.'}},

          { k:'w2', n:2, from:2, auto:'advice',
            text:'Language use — gerunds and infinitives, and modals of advice graded by strength.',
            levels:{
              AD:'I also use speculation modals accurately (might, may, must), and I separate what is certain from what is likely.',
              A:'I choose the verb pattern that carries the meaning I want, and I grade my advice (had better > should > could).',
              B:'I usually get gerunds and infinitives right and I give advice, though always at the same strength.',
              C:'I make frequent mistakes with verb patterns and I only use should, or I give no advice at all.'}},

          { k:'w3', n:3, from:3, auto:null,
            text:'Register & tone — right for a teen magazine, and respectful about mental health.',
            levels:{
              AD:'I adjust my tone within the piece — lighter in the hook, careful in the advice — and I name difficult things respectfully.',
              A:'I sound like a teen magazine: close but careful, and I write about mental health without stigma.',
              B:'My tone mostly fits, though it slips into slang or into an essay voice.',
              C:'My tone jumps between too formal and too casual, I use language that could hurt, or the words are not mine to explain.'}},

          { k:'w4', n:4, from:4, auto:'structure',
            text:'Structure & length — title, hook, developed body, conclusion, inside 140–190 words.',
            levels:{
              AD:'The structure is invisible because it works: every paragraph sets up the next one, and I stay inside the word count.',
              A:'Catchy title, hooking introduction, developed body and memorable conclusion, and I am inside 140–190 words.',
              B:'The article has a beginning and an end, but a part is missing or the length is off the range.',
              C:'My ideas are there but not ordered, there is no title or no ending, and the length is far from what was asked.'}},

          { k:'w5', n:5, from:5, auto:'hook',
            text:'Engagement — the hook works and the reader wants to keep reading.',
            levels:{
              AD:'I hold attention all the way through, and I leave the reader with something they will repeat.',
              A:'My hook makes someone want to keep reading, and the piece keeps its promise to the end.',
              B:'My opening is interesting, though the rest reads flat.',
              C:'I open by announcing my topic and the reader has no reason to continue.'}}
        ]
      },

      reflection: {
        task:'Editor’s reflection',
        spec:'Around 100 words',
        range:[80,140],
        nota:'Una reflexion no se corrige con la rubrica del articulo: se mira lo que el alumno es capaz de decir de su propio proceso.',
        fuera:'Criterios 4, 5 y 6 de la unidad — son del producto, no de la reflexion.',
        criteria:[

          { k:'w1', n:1, from:1, auto:null,
            text:'Process — what you actually did, and what changed along the way.',
            levels:{
              AD:'I explain a decision I changed and why the piece is better for it.',
              A:'I explain what I did and what I found difficult, with a concrete example from my own article.',
              B:'I say what I did, in general terms.',
              C:'I say that I liked it or that it was hard, without saying of what.'}},

          { k:'w2', n:2, from:2, auto:'advice',
            text:'Language — the language of the unit used to talk about your own work.',
            levels:{
              AD:'I use verb patterns and modals accurately to weigh what I could have done differently.',
              A:'I use the unit’s language (gerunds, infinitives, modals) correctly when I talk about my process.',
              B:'I get my meaning across, with recurring mistakes in the structures of the unit.',
              C:'The mistakes make my meaning hard to follow.'}},

          { k:'w3', n:3, from:1, auto:'structure',
            text:'Clarity & length — around 100 words that say something.',
            levels:{
              AD:'Every sentence adds something new, inside the length asked for.',
              A:'Around 100 words, ordered and without padding.',
              B:'Roughly the right length, but it repeats itself.',
              C:'Far too short to say anything, or padded to reach the count.'}}
        ]
      }
    }
  }

  };

  /* --------------------------------------------------------------- API */

  /* La rubrica de un entregable escrito. kind es el mismo de
     unit_submissions ('report', 'reflection'), asi que la fila entregada
     sabe sola con que se corrige. */
  function get(grade, unit, kind){
    const g = DATOS[grade]; if(!g) return null;
    const u = g[unit];      if(!u) return null;
    return u[kind] || null;
  }

  /* Nota vigesimal a partir de los niveles puestos. Solo cuenta los
     criterios calificados: media a medio corregir sigue siendo honesta. */
  function nota(rub, puestos){
    const vs = (rub.criteria||[]).map(function(c){ return VIGESIMAL[puestos[c.k]]; })
                                 .filter(function(v){ return v != null; });
    if(!vs.length) return null;
    return Math.round(vs.reduce(function(a,b){ return a+b; }, 0) / vs.length);
  }

  /* De nota vigesimal a letra, con los tramos del MINEDU. */
  function nivelDeNota(n){
    if(n == null) return null;
    return n >= 18 ? 'AD' : n >= 14 ? 'A' : n >= 11 ? 'B' : 'C';
  }

  /* El nivel global de la produccion. Es lo que se lleva a la columna
     Writing de Productos de unidad. */
  function global(rub, puestos){ return nivelDeNota(nota(rub, puestos)); }

  /* Cuantos criterios de la rubrica estan calificados. */
  function completos(rub, puestos){
    return (rub.criteria||[]).filter(function(c){ return puestos[c.k]; }).length;
  }

  return { NIVELES:NIVELES, VIGESIMAL:VIGESIMAL, SIGNIFICA:SIGNIFICA,
           datos:DATOS, get:get, nota:nota, nivelDeNota:nivelDeNota,
           global:global, completos:completos };
})();
