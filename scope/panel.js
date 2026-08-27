/* Scope & Sequence 2026 — el panel que ven los profesores.
 *
 * El documento maestro es un Excel de 24 pestanas que vive en el OneDrive de
 * coordinacion. Un profesor no deberia abrirlo para saber que le toca en su
 * grado, asi que aqui esta lo que necesita en clase: su nivel y su examen,
 * lo que el alumno debe saber hacer al acabar el ano, los seis temas del
 * grado con su detalle, y el calendario de simulacros.
 *
 * En primaria ademas se ve la auditoria: de todo lo que la secuencia pide,
 * que esta ya en Fun for Nordic, que esta en otro sitio del portal y que
 * falta por hacer. Es lo que dice por donde seguir.
 *
 * Los datos salen del Excel con scope/extrae_scope.py y de la auditoria con
 * nis-fun/tools/audita_scope.py, asi que se regeneran cuando coordinacion
 * actualice el maestro.
 */
(function () {

  let DATOS = null, AUDIT = null, gradoActivo = null;

  const esc = t => String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const CSS = `
  .sq-grados{display:flex;flex-wrap:wrap;gap:.4rem;margin:.2rem 0 1rem}
  .sq-g{background:var(--surface2,#eef2f7);border:1.5px solid transparent;border-radius:999px;
    padding:.35rem .9rem;cursor:pointer;font-weight:700;color:inherit;font:inherit}
  .sq-g.on{background:var(--accent,#d97d0d);color:#fff;border-color:var(--accent,#d97d0d)}
  .sq-g.prim{border-color:var(--accent,#d97d0d)}   /* los de primaria, con material propio */
  .sq-ficha{display:flex;flex-wrap:wrap;gap:.5rem 1.6rem;margin:.2rem 0 .9rem}
  .sq-ficha div{min-width:9rem}
  .sq-ficha b{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;
    opacity:.6;font-weight:700}
  .sq-bench{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:.7rem;
    margin:.6rem 0 1.2rem}
  .sq-bench div{background:var(--surface2,#f4f7fa);border-radius:12px;padding:.7rem .9rem}
  .sq-bench h4{margin:0 0 .3rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;
    opacity:.65}
  .sq-bench p{margin:0;line-height:1.45;font-size:.92rem}
  .sq-u{border:1px solid var(--line,#dde3ea);border-radius:14px;margin:0 0 .8rem;overflow:hidden}
  .sq-u > summary{cursor:pointer;padding:.7rem 1rem;font-weight:800;display:flex;
    align-items:center;gap:.6rem;list-style:none}
  .sq-u > summary::-webkit-details-marker{display:none}
  .sq-n{background:var(--accent,#d97d0d);color:#fff;border-radius:8px;min-width:1.9rem;
    height:1.9rem;display:inline-flex;align-items:center;justify-content:center;flex:none}
  .sq-cuerpo{padding:.2rem 1rem 1rem}
  .sq-sec{margin:.7rem 0 0}
  .sq-sec > h4{margin:0 0 .35rem;font-size:.78rem;text-transform:uppercase;letter-spacing:.07em;
    opacity:.6}
  .sq-b{border-left:3px solid var(--line,#dde3ea);padding:.15rem 0 .15rem .7rem;margin:0 0 .55rem}
  .sq-b.est-cubierto{border-left-color:#2f9268}
  .sq-b.est-portal{border-left-color:#3b6fb5}
  .sq-b.est-medias{border-left-color:#d9a13b}
  .sq-b.est-falta{border-left-color:#c9483c}
  .sq-b h5{margin:0;font-size:.9rem;display:flex;gap:.5rem;align-items:baseline;flex-wrap:wrap}
  .sq-tag{font-size:.7rem;border-radius:999px;padding:.05rem .5rem;font-weight:800;
    text-transform:uppercase;letter-spacing:.05em}
  .est-cubierto .sq-tag{background:#e4f3ec;color:#20654a}
  .est-portal   .sq-tag{background:#e6eefa;color:#27508a}
  .est-medias   .sq-tag{background:#fbf1d9;color:#7a5a12}
  .est-falta    .sq-tag{background:#fae5e3;color:#8f2f26}
  .sq-b ul{margin:.25rem 0 0;padding-left:1.1rem}
  .sq-b li{margin:.1rem 0;line-height:1.4}
  .sq-det{font-size:.84rem;opacity:.75;margin:.2rem 0 0}
  .sq-res{display:flex;flex-wrap:wrap;gap:.4rem;margin:.2rem 0 1rem}
  .sq-res span{border-radius:999px;padding:.25rem .8rem;font-weight:700;font-size:.86rem}
  .sq-cal{width:100%;border-collapse:collapse;font-size:.9rem}
  .sq-cal th,.sq-cal td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid var(--line,#dde3ea);
    vertical-align:top}
  .sq-cal th{font-size:.74rem;text-transform:uppercase;letter-spacing:.06em;opacity:.6}
  .sq-cal tr.hito{background:#fdf6e8}
  .sq-cuantas{margin-left:auto;font-size:.78rem;font-weight:700;opacity:.6}
  .sq-curso{background:var(--surface2,#f4f7fa);border-radius:10px;padding:.5rem .8rem;
    margin:.2rem 0 .6rem}
  .sq-curso a{font-weight:800;text-decoration:none;border-bottom:2px solid currentColor}`;

  /* ---------- carga ---------- */
  async function carga() {
    if (DATOS) return true;
    try {
      const r = await fetch('scope/scope-2026.json?v=1');
      if (!r.ok) return false;
      DATOS = await r.json();
    } catch (e) { return false; }
    try {
      const a = await fetch('scope/auditoria-primaria.json?v=1');
      if (a.ok) AUDIT = await a.json();
    } catch (e) { AUDIT = null; }
    return true;
  }

  const via = g => (DATOS.pathway || []).find(x => x.grado === g) || {};
  const bench = g => (DATOS.benchmarks || []).find(x => x.grado === g) || {};
  const grado = g => (DATOS.grados || []).find(x => x.grado === g) || null;
  const audit = g => AUDIT && (AUDIT.grados || []).find(x => x.grado === g) || null;

  const CLASE = {
    'cubierto': 'est-cubierto', 'en el portal': 'est-portal',
    'a medias': 'est-medias', 'FALTA': 'est-falta',
  };
  const ETIQUETA = {
    'cubierto': 'en el curso', 'en el portal': 'en el portal',
    'a medias': 'a medias', 'FALTA': 'falta',
  };

  /* ---------- pintado ---------- */
  function ficha(g) {
    const v = via(g);
    const campos = [
      ['Nivel CEFR', v.cefr], ['Examen Cambridge', v.examen || '—'],
      ['Ciclo MINEDU', v.minedu], ['Edad', v.edad],
      ['Escritura', v.escritura], ['Lectura', v.lectura],
    ];
    return `<div class="sq-ficha">${campos.map(([k, x]) =>
      `<div><b>${esc(k)}</b>${esc(x || '—')}</div>`).join('')}</div>
      ${v.gramatica ? `<p class="sq-det"><b>Gramática del año:</b> ${esc(v.gramatica)}</p>` : ''}`;
  }

  function benchmarks(g) {
    const b = bench(g);
    const cols = [['Listening', b.listening], ['Speaking', b.speaking],
                  ['Reading', b.reading], ['Writing', b.writing],
                  ['Grammar & Vocabulary', b.lengua]];
    if (!cols.some(c => c[1])) return '';
    return `<h3>Al acabar el año, el alumno puede…</h3>
      <div class="sq-bench">${cols.filter(c => c[1]).map(([k, t]) =>
        `<div><h4>${esc(k)}</h4><p>${esc(t)}</p></div>`).join('')}</div>`;
  }

  function resumenAudit(a) {
    if (!a) return '';
    const r = a.resumen || {};
    const trozos = [
      ['est-cubierto', 'en el curso', r['cubierto'] || 0],
      ['est-portal', 'en el portal', r['en el portal'] || 0],
      ['est-medias', 'a medias', r['a medias'] || 0],
      ['est-falta', 'falta', r['FALTA'] || 0],
    ];
    const enlaces = (a.recursos || []).map(x =>
      `<a href="${esc(x.enlace)}">${esc(x.nombre)}</a>`).join(' · ');
    return `<h3>Cómo lo cubre hoy la plataforma</h3>
      <p class="sq-det">Material: <b>Fun for Nordic ${esc(a.nivel)}</b>
        (${a.unidadesCurso} unidades)${enlaces ? ' · apoyo: ' + enlaces : ''}</p>
      <div class="sq-res">${trozos.map(([c, t, n]) =>
        `<span class="${c}"><b>${n}</b> ${esc(t)}</span>`).join('')}</div>`;
  }

  function unidades(g) {
    const d = grado(g);
    if (!d) return '<p class="muted">Este grado todavía no tiene detalle por unidad.</p>';
    const a = audit(g);
    return d.unidades.map(u => {
      const au = a && (a.unidades || []).find(x => x.n === u.n);
      const porSeccion = {};
      u.bloques.forEach(b => (porSeccion[b.seccion] = porSeccion[b.seccion] || []).push(b));
      const cuerpo = Object.keys(porSeccion).map(sec => `
        <div class="sq-sec"><h4>${esc(sec)}</h4>
          ${porSeccion[sec].map(b => {
            const ab = au && (au.bloques || []).find(x => x.bloque === b.bloque);
            const cls = ab ? (CLASE[ab.estado] || '') : '';
            const tag = ab ? `<span class="sq-tag">${esc(ETIQUETA[ab.estado] || ab.estado)}</span>` : '';
            return `<div class="sq-b ${cls}">
              <h5>${esc(b.bloque)} ${tag}</h5>
              <ul>${b.puntos.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
              ${ab && ab.detalle ? `<p class="sq-det">${esc(ab.detalle)}</p>` : ''}
            </div>`;
          }).join('')}
        </div>`).join('');
      // que unidades del curso se dan para este tema: es lo que el
      // profesor necesita saber para planificar la semana
      const dc = (au && au.delCurso) || [];
      const nivel = a ? a.nivel : '';
      const cuales = dc.length ? `<p class="sq-det sq-curso">
        En clase se dan las unidades
        ${dc.map(n => `<a href="nis-fun/engine/index.html?level=${esc(nivel)}&unit=${n}"
           target="_blank">${n}</a>`).join(', ')}
        de Fun for Nordic ${esc(nivel)}.</p>` : '';
      return `<details class="sq-u">
        <summary><span class="sq-n">${u.n}</span> ${esc(u.tema)}
          ${dc.length ? `<span class="sq-cuantas">${dc.length} unidades</span>` : ''}</summary>
        <div class="sq-cuerpo">${cuales}${cuerpo}</div></details>`;
    }).join('');
  }

  function calendario() {
    const c = DATOS.calendario || [];
    if (!c.length) return '';
    return `<h3>Calendario Cambridge 2026</h3>
      <div style="overflow-x:auto"><table class="sq-cal">
        <tr><th>Mes</th><th>Hito</th><th>Grados</th><th>Actividad</th><th>KPI</th></tr>
        ${c.map(f => `<tr class="${/🎯/.test(f.hito) ? 'hito' : ''}">
          <td><b>${esc(f.mes)}</b></td><td>${esc(f.hito)}</td><td>${esc(f.grados)}</td>
          <td>${esc(f.actividad)}</td><td>${esc(f.kpi)}</td></tr>`).join('')}
      </table></div>`;
  }

  function pinta() {
    const main = document.getElementById('main');
    const g = gradoActivo;
    const primaria = new Set(['G1', 'G2', 'G3', 'G4', 'G5']);
    const botones = (DATOS.pathway || []).map(p =>
      `<button class="sq-g${p.grado === g ? ' on' : ''}${primaria.has(p.grado) ? ' prim' : ''}"
        data-g="${p.grado}" type="button">${p.grado}</button>`).join('');

    main.innerHTML = `<style>${CSS}</style>
      <div class="card">
        <h2>📚 Scope &amp; Sequence 2026</h2>
        <p class="muted">Lo que toca en cada grado: nivel, examen, los seis temas del año
          y cómo lo cubre hoy la plataforma. Sale del documento maestro de coordinación
          (${esc(DATOS.origen || '')}).</p>
        <div class="sq-grados">${botones}</div>
        ${ficha(g)}
        ${benchmarks(g)}
        ${resumenAudit(audit(g))}
        <h3>Las seis unidades del año</h3>
        ${unidades(g)}
        ${calendario()}
      </div>`;

    main.querySelectorAll('.sq-g').forEach(b => b.onclick = () => {
      gradoActivo = b.dataset.g;
      pinta();
      main.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  /* ---------- entrada ---------- */
  window.scopePanel = async function () {
    const main = document.getElementById('main');
    main.innerHTML = '<div class="card"><p class="muted">Cargando la secuencia…</p></div>';
    if (!(await carga())) {
      main.innerHTML = `<div class="card"><h2>📚 Scope &amp; Sequence</h2>
        <p class="err">No pude leer la secuencia. Falta <code>scope/scope-2026.json</code>;
        se genera con <code>python scope/extrae_scope.py</code>.</p></div>`;
      return;
    }
    // se abre en el primer grado de primaria, que es por donde se empieza
    if (!gradoActivo) gradoActivo = grado('G1') ? 'G1' : (DATOS.pathway[0] || {}).grado;
    pinta();
  };
})();
