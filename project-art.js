/* Ilustraciones de los modelos de producto — NIS 2026.
 *
 * POR QUE ESTE ARCHIVO EXISTE
 * Un alumno de primaria no sabe que es un "Evidence Map" ni un "Field
 * Journal" hasta que ve uno. El proyecto le pide once entregas y hasta ahora
 * solo tenia el nombre de cada una. Aqui cada entrega se DIBUJA: una lamina
 * que ensena la forma de lo que va a producir, con sus partes senaladas.
 *
 * TODO ES DIBUJO PROPIO, SVG, generado en el navegador. Ni una imagen de
 * banco, ni una descarga con marca de agua, ni una peticion a un tercero:
 * eso ya paso con las portadas de Toddle. Se imprime bien, pesa nada y
 * funciona sin red.
 *
 * COMO SE USA
 *   modeloSVG(modelo, cover, {alto})   -> lamina grande, dentro de la semana
 *   modeloThumb(modelo, cover)         -> miniatura, en la cabecera plegada
 * `modelo` es {tipo, titulo, partes[]}; `cover` es el {from,to} del arco, asi
 * que la lamina toma el color del proyecto y las once semanas de un arco se
 * ven como una familia en vez de como once dibujos sueltos.
 *
 * ANADIR UN TIPO: una entrada en DIBUJO con (d) -> cadena de hijos de <svg>.
 * `d` trae {t: titulo, p: [partes], c1, c2, tinta, papel, w, h}. Si un tipo
 * no existe se dibuja `hoja`, el generico: nunca se queda en blanco.
 */
(function(){

const W = 320, H = 210;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Los textos de las partes estan escritos para leerse en una ficha, no dentro
   de un dibujo de 320 px. Se recortan por palabra: cortar por letra deja
   "Field Jour..." y parece un fallo del programa. */
function corta(s, n){
  s = String(s || '').trim();
  if(s.length <= n) return s;
  const t = s.slice(0, n);
  const i = t.lastIndexOf(' ');
  return (i > n * 0.5 ? t.slice(0, i) : t).replace(/[ ,.;:]+$/, '') + '…';
}

/* Renglones de escribir. Es la marca visual de "aqui va texto tuyo". */
function renglones(x, y, w, n, gap, color, op){
  let s = '';
  for(let i = 0; i < n; i++){
    const ww = i === n - 1 ? w * 0.62 : w;
    s += `<rect x="${x}" y="${y + i * gap}" width="${ww}" height="2" rx="1" fill="${color || '#94a3b8'}" opacity="${op == null ? .55 : op}"/>`;
  }
  return s;
}

function etiqueta(x, y, txt, color, anchor, size){
  return `<text x="${x}" y="${y}" font-size="${size || 8}" font-family="system-ui,sans-serif" fill="${color}" text-anchor="${anchor || 'start'}">${esc(txt)}</text>`;
}

/* Chip = una parte del producto, nombrada. Se usa en varios tipos: es lo que
   convierte un dibujo bonito en una lista de lo que hay que hacer. */
function chip(x, y, w, txt, c, tinta){
  return `<g><rect x="${x}" y="${y}" width="${w}" height="15" rx="7.5" fill="${c}" opacity=".16"/>
    <circle cx="${x + 9}" cy="${y + 7.5}" r="3" fill="${c}"/>
    ${etiqueta(x + 16, y + 10.5, corta(txt, Math.floor(w / 4.3)), tinta, 'start', 7.6)}</g>`;
}

/* Un nino generico. Sale en los tipos donde el producto se PRESENTA a
   alguien: sin persona, una lamina de "exposicion oral" es un rectangulo. */
function figura(x, y, k, c){
  const s = k || 1;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <circle cx="0" cy="-16" r="7" fill="${c}"/>
    <path d="M-8 0 Q0 -9 8 0 L7 14 L-7 14 Z" fill="${c}" opacity=".85"/>
    <rect x="-9" y="14" width="6" height="12" rx="3" fill="${c}" opacity=".7"/>
    <rect x="3" y="14" width="6" height="12" rx="3" fill="${c}" opacity=".7"/></g>`;
}

function titulo(d, txt){
  return `<text x="${d.w / 2}" y="19" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui,sans-serif" fill="${d.tinta}">${esc(corta(txt || d.t, 40))}</text>`;
}

const DIBUJO = {

/* --- generico: hoja con titulo, renglones y las partes ------------------- */
hoja(d){
  return `<rect x="46" y="28" width="228" height="166" rx="6" fill="#fff" stroke="${d.c1}" stroke-width="1.6"/>
    <rect x="46" y="28" width="228" height="22" rx="6" fill="${d.c1}" opacity=".18"/>
    ${etiqueta(58, 43, corta(d.t, 36), d.tinta, 'start', 9)}
    ${renglones(60, 62, 200, 4, 11, d.c2)}
    ${d.p.slice(0, 3).map((x, i) => chip(60, 112 + i * 24, 200, x, d.c1, d.tinta)).join('')}`;
},

/* --- cartel -------------------------------------------------------------- */
poster(d){
  return `<rect x="66" y="16" width="188" height="182" rx="4" fill="#fff" stroke="${d.c1}" stroke-width="2"/>
    <rect x="66" y="16" width="188" height="34" fill="${d.c1}"/>
    ${etiqueta(160, 38, corta(d.t, 28), '#fff', 'middle', 11)}
    <rect x="80" y="60" width="70" height="54" rx="4" fill="${d.c2}" opacity=".28"/>
    <circle cx="103" cy="82" r="11" fill="${d.c2}" opacity=".8"/>
    <path d="M84 110 L100 88 L114 106 L126 94 L146 110 Z" fill="${d.c1}" opacity=".55"/>
    ${renglones(160, 66, 82, 5, 10, d.c2)}
    ${d.p.slice(0, 3).map((x, i) => chip(80, 124 + i * 23, 160, x, d.c1, d.tinta)).join('')}`;
},

/* --- diagrama etiquetado ------------------------------------------------- */
diagram(d){
  const P = [[92, 72], [92, 140], [236, 72], [236, 140]];
  return titulo(d) + `<ellipse cx="160" cy="112" rx="42" ry="36" fill="${d.c1}" opacity=".3"/>
    <ellipse cx="160" cy="112" rx="42" ry="36" fill="none" stroke="${d.c1}" stroke-width="2"/>
    <circle cx="148" cy="102" r="5" fill="${d.c1}"/><circle cx="172" cy="102" r="5" fill="${d.c1}"/>
    <path d="M146 124 Q160 134 174 124" stroke="${d.c1}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    ${d.p.slice(0, 4).map((x, i) => {
      const lx = P[i][0], ly = P[i][1], izq = lx < 160;
      return `<line x1="${izq ? lx + 4 : lx - 4}" y1="${ly}" x2="${izq ? 126 : 194}" y2="${ly < 112 ? 96 : 128}" stroke="${d.c2}" stroke-width="1.4" stroke-dasharray="3 2"/>
      <circle cx="${izq ? 126 : 194}" cy="${ly < 112 ? 96 : 128}" r="2.6" fill="${d.c2}"/>
      ${etiqueta(lx, ly + 3, corta(x, 17), d.tinta, izq ? 'end' : 'start', 8)}`;
    }).join('')}`;
},

/* --- cuaderno de campo --------------------------------------------------- */
journal(d){
  return `<rect x="32" y="30" width="256" height="162" rx="5" fill="#fffdf6" stroke="${d.c1}" stroke-width="1.6"/>
    <line x1="160" y1="30" x2="160" y2="192" stroke="${d.c1}" stroke-width="1.4" opacity=".6"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="160" cy="${44 + i * 24}" r="2.6" fill="${d.c1}" opacity=".5"/>`).join('')}
    ${etiqueta(46, 48, corta(d.t, 22), d.c1, 'start', 8.5)}
    ${renglones(46, 58, 100, 6, 11, d.c2)}
    <rect x="46" y="128" width="100" height="50" rx="3" fill="${d.c2}" opacity=".2" stroke="${d.c2}" stroke-dasharray="3 2"/>
    ${etiqueta(96, 156, 'drawing', d.c2, 'middle', 7.5)}
    ${d.p.slice(0, 4).map((x, i) => `${etiqueta(174, 50 + i * 32, corta(x, 18), d.tinta, 'start', 7.8)}
      ${renglones(174, 56 + i * 32, 100, 2, 8, d.c2, .45)}`).join('')}`;
},

/* --- grafico de barras --------------------------------------------------- */
chart(d){
  const v = [34, 58, 26, 70, 45];
  return titulo(d) + `<rect x="46" y="32" width="228" height="160" rx="5" fill="#fff" stroke="${d.c1}" stroke-width="1.4"/>
    <line x1="72" y1="52" x2="72" y2="158" stroke="${d.tinta}" stroke-width="1.6"/>
    <line x1="72" y1="158" x2="256" y2="158" stroke="${d.tinta}" stroke-width="1.6"/>
    ${v.map((h, i) => `<rect x="${86 + i * 34}" y="${158 - h}" width="22" height="${h}" rx="2" fill="${i % 2 ? d.c2 : d.c1}" opacity=".85"/>
      <text x="${97 + i * 34}" y="${152 - h}" font-size="7" text-anchor="middle" font-family="system-ui,sans-serif" fill="${d.tinta}">${h}</text>`).join('')}
    ${etiqueta(164, 176, corta(d.p[0] || 'what I counted', 34), d.tinta, 'middle', 7.6)}
    ${etiqueta(58, 106, corta(d.p[1] || 'how many', 12), d.c1, 'middle', 7)}`;
},

/* --- tabla de conteo con palotes ----------------------------------------- */
tally(d){
  const f = [4, 7, 3, 6];
  return titulo(d) + `<rect x="56" y="34" width="208" height="156" rx="5" fill="#fff" stroke="${d.c1}" stroke-width="1.4"/>
    <rect x="56" y="34" width="208" height="20" fill="${d.c1}" opacity=".2"/>
    ${etiqueta(70, 48, 'what', d.tinta, 'start', 7.5)}${etiqueta(180, 48, 'tally', d.tinta, 'start', 7.5)}
    ${etiqueta(240, 48, 'n', d.tinta, 'start', 7.5)}
    ${f.map((n, i) => {
      const y = 54 + i * 33;
      let pal = '';
      for(let k = 0; k < n; k++){
        pal += (k + 1) % 5 === 0
          ? `<line x1="${178 + (k - 4) * 7}" y1="${y + 26}" x2="${180 + k * 7}" y2="${y + 10}" stroke="${d.c2}" stroke-width="1.8"/>`
          : `<line x1="${181 + k * 7}" y1="${y + 10}" x2="${181 + k * 7}" y2="${y + 26}" stroke="${d.c2}" stroke-width="1.8"/>`;
      }
      return `<line x1="56" y1="${y + 31}" x2="264" y2="${y + 31}" stroke="${d.c1}" stroke-width=".8" opacity=".5"/>
        ${etiqueta(70, y + 22, corta(d.p[i] || '', 16), d.tinta, 'start', 7.4)}${pal}
        ${etiqueta(246, y + 22, n, d.tinta, 'start', 8)}`;
    }).join('')}`;
},

/* --- linea de tiempo ----------------------------------------------------- */
timeline(d){
  const n = Math.min(4, Math.max(3, d.p.length));
  return titulo(d) + `<line x1="42" y1="120" x2="286" y2="120" stroke="${d.c1}" stroke-width="3" stroke-linecap="round"/>
    <path d="M286 120 l-9 -5 v10 z" fill="${d.c1}"/>
    ${Array.from({length: n}).map((x, i) => {
      const px = 62 + i * (208 / (n - 1)), arr = i % 2 === 0;
      return `<circle cx="${px}" cy="120" r="6" fill="#fff" stroke="${d.c1}" stroke-width="2.6"/>
        <line x1="${px}" y1="${arr ? 114 : 126}" x2="${px}" y2="${arr ? 92 : 148}" stroke="${d.c2}" stroke-width="1.2"/>
        <rect x="${px - 32}" y="${arr ? 64 : 150}" width="64" height="26" rx="4" fill="${d.c2}" opacity=".2"/>
        ${etiqueta(px, arr ? 80 : 167, corta(d.p[i] || '', 14), d.tinta, 'middle', 7.4)}`;
    }).join('')}`;
},

/* --- mapa ---------------------------------------------------------------- */
map(d){
  return titulo(d) + `<rect x="44" y="32" width="232" height="160" rx="5" fill="#f2f8f4" stroke="${d.c1}" stroke-width="1.6"/>
    <path d="M60 150 Q96 96 132 128 T206 96 T262 120" stroke="${d.c2}" stroke-width="2.4" fill="none"/>
    <path d="M56 78 Q92 52 128 72 T196 60 L196 44 L56 44 Z" fill="${d.c1}" opacity=".18"/>
    <path d="M60 176 Q120 158 180 176 T268 168 L268 188 L60 188 Z" fill="${d.c2}" opacity=".22"/>
    ${[[96, 110], [168, 88], [224, 140]].map((pt, i) => `
      <path d="M${pt[0]} ${pt[1]} l-6 -10 a7 7 0 1 1 12 0 z" fill="${d.c1}"/>
      <circle cx="${pt[0]}" cy="${pt[1] - 13}" r="2.6" fill="#fff"/>
      ${etiqueta(pt[0] + 8, pt[1] - 8, corta(d.p[i] || '', 15), d.tinta, 'start', 7.4)}`).join('')}
    <rect x="52" y="166" width="16" height="4" fill="${d.tinta}"/>
    ${etiqueta(52, 182, 'scale', d.tinta, 'start', 6.5)}`;
},

/* --- carta --------------------------------------------------------------- */
letter(d){
  return `<rect x="62" y="22" width="196" height="176" rx="3" fill="#fff" stroke="${d.c1}" stroke-width="1.6"/>
    ${etiqueta(240, 40, 'date', d.c2, 'end', 7.5)}
    ${etiqueta(80, 58, corta(d.p[0] || 'Dear …', 24), d.tinta, 'start', 9)}
    ${renglones(80, 72, 160, 4, 11, d.c2)}
    ${renglones(80, 124, 160, 3, 11, d.c2)}
    ${etiqueta(80, 172, corta(d.p[1] || 'Thank you,', 20), d.tinta, 'start', 8)}
    <path d="M150 186 q14 -12 26 -2 t22 -4" stroke="${d.c1}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M62 22 L160 96 L258 22" fill="none" stroke="${d.c1}" stroke-width="1" opacity=".35"/>`;
},

/* --- video / guion grafico ----------------------------------------------- */
video(d){
  return titulo(d) + `<rect x="34" y="40" width="252" height="102" rx="6" fill="${d.tinta}" opacity=".9"/>
    ${[0, 1, 2].map(i => `<rect x="${46 + i * 80}" y="52" width="68" height="54" rx="3" fill="#fff"/>
      <circle cx="${80 + i * 80}" cy="72" r="9" fill="${d.c1}" opacity=".6"/>
      <path d="M${52 + i * 80} 106 l16 -18 l12 12 l10 -8 l18 14 z" fill="${d.c2}" opacity=".7"/>
      ${etiqueta(80 + i * 80, 122, corta(d.p[i] || ('shot ' + (i + 1)), 15), '#fff', 'middle', 7.4)}`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${40 + i * 32}" y="132" width="12" height="6" rx="1.5" fill="#fff" opacity=".5"/>`).join('')}
    <circle cx="160" cy="170" r="15" fill="${d.c1}"/><path d="M155 163 l12 7 l-12 7 z" fill="#fff"/>
    ${etiqueta(160, 200, corta(d.p[3] || 'record it, watch it, record it again', 40), d.tinta, 'middle', 7.4)}`;
},

/* --- maqueta / prototipo ------------------------------------------------- */
model(d){
  const AX = [128, 204, 92], AY = [92, 110, 126], BX = [64, 268, 58], BY = [62, 74, 110];
  return titulo(d) + `<ellipse cx="160" cy="176" rx="106" ry="16" fill="${d.c2}" opacity=".22"/>
    <rect x="80" y="150" width="160" height="20" rx="3" fill="${d.c2}" opacity=".45"/>
    <path d="M104 150 L104 96 L146 76 L188 96 L188 150 Z" fill="${d.c1}" opacity=".35" stroke="${d.c1}" stroke-width="1.8"/>
    <path d="M104 96 L146 76 L188 96 L146 116 Z" fill="${d.c1}" opacity=".6"/>
    <rect x="196" y="112" width="34" height="38" rx="3" fill="${d.c2}" opacity=".5" stroke="${d.c2}" stroke-width="1.4"/>
    <circle cx="92" cy="138" r="12" fill="${d.c2}" opacity=".55"/>
    ${d.p.slice(0, 3).map((x, i) => `<line x1="${AX[i]}" y1="${AY[i]}" x2="${BX[i]}" y2="${BY[i]}" stroke="${d.tinta}" stroke-width="1" stroke-dasharray="3 2" opacity=".7"/>
      ${etiqueta(BX[i], BY[i] - 4, corta(x, 16), d.tinta, i === 1 ? 'end' : 'start', 7.4)}`).join('')}`;
},

/* --- ficha con foto y campos --------------------------------------------- */
card(d){
  return `<rect x="52" y="26" width="216" height="168" rx="8" fill="#fff" stroke="${d.c1}" stroke-width="1.8"/>
    <rect x="52" y="26" width="216" height="30" rx="8" fill="${d.c1}"/>
    <rect x="52" y="48" width="216" height="8" fill="${d.c1}"/>
    ${etiqueta(160, 46, corta(d.t, 32), '#fff', 'middle', 10)}
    <rect x="66" y="68" width="66" height="70" rx="4" fill="${d.c2}" opacity=".25" stroke="${d.c2}" stroke-dasharray="4 3"/>
    <circle cx="99" cy="94" r="12" fill="${d.c2}" opacity=".6"/>
    <path d="M70 134 l18 -22 l14 14 l12 -10 l16 18 z" fill="${d.c2}" opacity=".6"/>
    ${d.p.slice(0, 4).map((x, i) => `${etiqueta(144, 78 + i * 17, corta(x, 17), d.tinta, 'start', 7.6)}
      ${renglones(144, 82 + i * 17, 108, 1, 6, d.c2, .5)}`).join('')}
    ${renglones(66, 152, 186, 3, 11, d.c2, .45)}`;
},

/* --- triptico ------------------------------------------------------------ */
leaflet(d){
  return titulo(d) + `${[0, 1, 2].map(i => `<rect x="${34 + i * 86}" y="34" width="80" height="156" rx="3" fill="#fff" stroke="${d.c1}" stroke-width="1.4"/>`).join('')}
    <rect x="34" y="34" width="80" height="40" fill="${d.c1}" opacity=".85"/>
    ${etiqueta(74, 58, corta(d.p[0] || 'cover', 12), '#fff', 'middle', 8)}
    <circle cx="74" cy="100" r="16" fill="${d.c2}" opacity=".45"/>
    ${renglones(44, 128, 60, 4, 10, d.c2)}
    ${renglones(130, 46, 60, 5, 11, d.c2)}
    <rect x="130" y="108" width="60" height="34" rx="3" fill="${d.c2}" opacity=".28"/>
    ${renglones(130, 152, 60, 3, 10, d.c2)}
    ${renglones(216, 46, 60, 3, 11, d.c2)}
    <rect x="216" y="90" width="60" height="30" rx="3" fill="${d.c1}" opacity=".25"/>
    ${renglones(216, 130, 60, 4, 10, d.c2)}
    ${etiqueta(160, 204, corta(d.p[1] || '', 40), d.tinta, 'middle', 7.2)}`;
},

/* --- clasificar en columnas ---------------------------------------------- */
sort(d){
  const cols = Math.min(3, Math.max(2, d.p.length));
  const w = cols === 2 ? 108 : 74;
  return titulo(d) + Array.from({length: cols}).map((z, i) => {
    const x = cols === 2 ? 46 + i * 122 : 40 + i * 84, c = i % 2 ? d.c2 : d.c1;
    return `<rect x="${x}" y="38" width="${w}" height="152" rx="6" fill="${c}" opacity=".13"/>
      <rect x="${x}" y="38" width="${w}" height="22" rx="6" fill="${c}" opacity=".75"/>
      ${etiqueta(x + w / 2, 53, corta(d.p[i] || '', Math.floor(w / 5)), '#fff', 'middle', 8)}
      ${[0, 1, 2, 3].map(k => `<rect x="${x + 8}" y="${70 + k * 29}" width="${w - 16}" height="22" rx="3" fill="#fff" stroke="${c}" stroke-width="1"/>
        ${renglones(x + 14, 79 + k * 29, w - 30, 1, 6, d.tinta, .35)}`).join('')}`;
  }).join('');
},

/* --- plano --------------------------------------------------------------- */
plan(d){
  return titulo(d) + `<rect x="42" y="30" width="236" height="162" rx="4" fill="#eef4fb" stroke="${d.c1}" stroke-width="1.6"/>
    ${Array.from({length: 12}).map((z, i) => `<line x1="${42 + i * 20}" y1="30" x2="${42 + i * 20}" y2="192" stroke="${d.c1}" stroke-width=".5" opacity=".35"/>`).join('')}
    ${Array.from({length: 9}).map((z, i) => `<line x1="42" y1="${30 + i * 20}" x2="278" y2="${30 + i * 20}" stroke="${d.c1}" stroke-width=".5" opacity=".35"/>`).join('')}
    <path d="M86 150 L86 88 L138 62 L190 88 L190 150 Z" fill="none" stroke="${d.tinta}" stroke-width="2.2"/>
    <rect x="106" y="112" width="26" height="38" fill="none" stroke="${d.tinta}" stroke-width="1.6"/>
    <rect x="150" y="100" width="26" height="24" fill="none" stroke="${d.tinta}" stroke-width="1.6"/>
    <line x1="86" y1="164" x2="190" y2="164" stroke="${d.c2}" stroke-width="1.2"/>
    ${etiqueta(138, 176, corta(d.p[0] || 'how big', 20), d.c2, 'middle', 7.4)}
    ${d.p.slice(1, 3).map((x, i) => `<circle cx="210" cy="${72 + i * 26}" r="7" fill="${d.c1}" opacity=".8"/>
      ${etiqueta(210, 75 + i * 26, i + 1, '#fff', 'middle', 7.5)}
      ${etiqueta(222, 75 + i * 26, corta(x, 13), d.tinta, 'start', 7.4)}`).join('')}`;
},

/* --- informe ------------------------------------------------------------- */
report(d){
  const bars = [26, 40, 18, 34];
  return `<rect x="56" y="20" width="208" height="180" rx="4" fill="#fff" stroke="${d.c1}" stroke-width="1.6"/>
    <rect x="56" y="20" width="208" height="6" fill="${d.c1}"/>
    ${etiqueta(160, 46, corta(d.t, 30), d.tinta, 'middle', 10.5)}
    <line x1="110" y1="54" x2="210" y2="54" stroke="${d.c1}" stroke-width="1.6"/>
    ${renglones(74, 68, 172, 3, 10, d.c2)}
    <rect x="74" y="106" width="80" height="52" rx="3" fill="${d.c2}" opacity=".2"/>
    ${bars.map((h, i) => `<rect x="${82 + i * 18}" y="${152 - h}" width="11" height="${h}" rx="1.5" fill="${d.c1}" opacity=".8"/>`).join('')}
    ${d.p.slice(0, 3).map((x, i) => etiqueta(164, 116 + i * 16, '· ' + corta(x, 18), d.tinta, 'start', 7.6)).join('')}
    ${renglones(74, 170, 172, 2, 10, d.c2)}`;
},

/* --- stand de exposicion ------------------------------------------------- */
stand(d){
  return titulo(d) + `<rect x="52" y="34" width="216" height="98" rx="4" fill="#fff" stroke="${d.c1}" stroke-width="1.8"/>
    <rect x="52" y="34" width="216" height="18" fill="${d.c1}"/>
    ${etiqueta(160, 47, corta(d.p[0] || 'our question', 34), '#fff', 'middle', 8)}
    <rect x="64" y="62" width="60" height="58" rx="3" fill="${d.c2}" opacity=".3"/>
    <circle cx="94" cy="84" r="10" fill="${d.c2}" opacity=".7"/>
    ${renglones(134, 66, 120, 3, 11, d.c2)}
    ${chip(134, 104, 120, d.p[1] || 'what we found', d.c1, d.tinta)}
    <rect x="40" y="140" width="240" height="10" rx="3" fill="${d.c2}" opacity=".55"/>
    <rect x="70" y="150" width="8" height="26" fill="${d.c2}" opacity=".4"/>
    <rect x="242" y="150" width="8" height="26" fill="${d.c2}" opacity=".4"/>
    <rect x="120" y="126" width="26" height="14" rx="2" fill="${d.c1}" opacity=".8"/>
    <ellipse cx="180" cy="134" rx="16" ry="7" fill="${d.c2}" opacity=".6"/>
    ${figura(216, 172, .78, d.c1)}${figura(256, 174, .66, d.c2)}
    ${etiqueta(120, 200, corta(d.p[2] || 'we explain it to visitors', 34), d.tinta, 'middle', 7.4)}`;
},

/* --- registro de datos --------------------------------------------------- */
log(d){
  const dias = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], anchos = [46, 70, 34, 62, 52];
  return titulo(d) + `<rect x="46" y="34" width="228" height="158" rx="5" fill="#fff" stroke="${d.c1}" stroke-width="1.4"/>
    <rect x="46" y="34" width="228" height="20" fill="${d.c1}" opacity=".2"/>
    ${etiqueta(60, 48, 'day', d.tinta, 'start', 7.5)}
    ${etiqueta(132, 48, corta(d.p[0] || 'what I measured', 18), d.tinta, 'start', 7.5)}
    ${etiqueta(232, 48, corta(d.p[1] || 'note', 8), d.tinta, 'start', 7.5)}
    ${dias.map((x, i) => `<line x1="46" y1="${54 + (i + 1) * 27}" x2="274" y2="${54 + (i + 1) * 27}" stroke="${d.c1}" stroke-width=".7" opacity=".45"/>
      ${etiqueta(60, 72 + i * 27, x, d.c1, 'start', 7.6)}
      <rect x="132" y="${64 + i * 27}" width="${anchos[i]}" height="10" rx="2" fill="${d.c2}" opacity=".7"/>
      ${renglones(224, 72 + i * 27, 42, 1, 6, d.tinta, .3)}`).join('')}
    <line x1="124" y1="54" x2="124" y2="192" stroke="${d.c1}" stroke-width=".7" opacity=".45"/>
    <line x1="218" y1="54" x2="218" y2="192" stroke="${d.c1}" stroke-width=".7" opacity=".45"/>`;
},

/* --- montaje de experimento ---------------------------------------------- */
experiment(d){
  return titulo(d) + `<rect x="34" y="150" width="252" height="12" rx="3" fill="${d.c2}" opacity=".5"/>
    <path d="M96 78 l0 34 l-18 34 a4 4 0 0 0 3 6 l50 0 a4 4 0 0 0 3 -6 l-18 -34 l0 -34 z" fill="${d.c1}" opacity=".28" stroke="${d.c1}" stroke-width="1.8"/>
    <path d="M84 128 l46 0 l14 22 l-74 0 z" fill="${d.c2}" opacity=".65"/>
    <rect x="88" y="72" width="40" height="8" rx="3" fill="${d.c1}"/>
    <rect x="182" y="94" width="52" height="56" rx="4" fill="#fff" stroke="${d.c1}" stroke-width="1.8"/>
    <rect x="182" y="126" width="52" height="24" fill="${d.c2}" opacity=".55"/>
    ${[0, 1, 2, 3].map(i => `<line x1="182" y1="${104 + i * 11}" x2="192" y2="${104 + i * 11}" stroke="${d.tinta}" stroke-width="1"/>`).join('')}
    <path d="M140 110 l32 0" stroke="${d.tinta}" stroke-width="1.8"/>
    <path d="M172 110 l-8 -4 v8 z" fill="${d.tinta}"/>
    ${etiqueta(108, 178, corta(d.p[0] || 'what I change', 22), d.tinta, 'middle', 7.4)}
    ${etiqueta(232, 178, corta(d.p[1] || 'what I measure', 20), d.tinta, 'middle', 7.4)}
    ${etiqueta(286, 60, corta(d.p[2] || 'what stays the same', 22), d.c1, 'end', 7.4)}`;
},

/* --- red / cadena -------------------------------------------------------- */
web(d){
  const N = [[76, 72], [164, 52], [248, 84], [104, 150], [212, 152], [160, 110]];
  const E = [[5, 0], [5, 1], [5, 2], [3, 5], [4, 5], [0, 3], [2, 4]];
  return titulo(d) + E.map(p => `<line x1="${N[p[0]][0]}" y1="${N[p[0]][1]}" x2="${N[p[1]][0]}" y2="${N[p[1]][1]}" stroke="${d.c2}" stroke-width="1.6" opacity=".7"/>`).join('') +
    N.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === 5 ? 18 : 14}" fill="${i === 5 ? d.c1 : d.c2}" opacity=".85"/>
      <circle cx="${p[0]}" cy="${p[1]}" r="${i === 5 ? 18 : 14}" fill="none" stroke="#fff" stroke-width="1.6"/>
      ${etiqueta(p[0], p[1] + (i === 5 ? 32 : 28), corta(d.p[i] || '', 14), d.tinta, 'middle', 7.2)}`).join('');
},

/* --- exposicion oral ----------------------------------------------------- */
speech(d){
  return titulo(d) + `<rect x="34" y="40" width="150" height="98" rx="5" fill="#fff" stroke="${d.c1}" stroke-width="1.6"/>
    <rect x="34" y="40" width="150" height="16" fill="${d.c1}" opacity=".8"/>
    ${etiqueta(109, 52, corta(d.p[0] || 'my slide', 24), '#fff', 'middle', 7.6)}
    ${renglones(46, 68, 126, 4, 12, d.c2)}
    <rect x="46" y="118" width="60" height="12" rx="3" fill="${d.c2}" opacity=".5"/>
    ${figura(232, 136, 1.5, d.c1)}
    <path d="M200 60 h68 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-44 l-12 12 v-12 h-12 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 z" fill="${d.c2}" opacity=".25" stroke="${d.c2}" stroke-width="1.4"/>
    ${etiqueta(234, 82, corta(d.p[1] || 'what I say', 18), d.tinta, 'middle', 7.6)}
    ${etiqueta(160, 200, corta(d.p[2] || 'look up, speak slowly', 40), d.tinta, 'middle', 7.4)}`;
},

/* --- mural colectivo ----------------------------------------------------- */
mural(d){
  const c = [d.c1, d.c2];
  return titulo(d) + `<rect x="36" y="32" width="248" height="150" rx="5" fill="#fff" stroke="${d.c1}" stroke-width="1.6"/>
    ${Array.from({length: 12}).map((z, i) => {
      const x = 48 + (i % 4) * 60, y = 42 + Math.floor(i / 4) * 46;
      return `<rect x="${x}" y="${y}" width="52" height="38" rx="4" fill="${c[i % 2]}" opacity="${.2 + (i % 5) * .1}" stroke="${c[i % 2]}" stroke-width="1"/>
        <circle cx="${x + 26}" cy="${y + 14}" r="6" fill="${c[(i + 1) % 2]}" opacity=".7"/>
        <path d="M${x + 8} ${y + 34} l10 -11 l8 7 l8 -5 l10 9 z" fill="${c[i % 2]}" opacity=".65"/>`;
    }).join('')}
    ${etiqueta(160, 200, corta(d.p[0] || 'one piece each, one wall together', 44), d.tinta, 'middle', 7.4)}`;
},

/* --- guia / libreto ------------------------------------------------------ */
guide(d){
  return `<rect x="60" y="24" width="180" height="172" rx="4" fill="${d.c1}"/>
    <rect x="70" y="30" width="180" height="172" rx="4" fill="#fff" stroke="${d.c1}" stroke-width="1.8"/>
    <rect x="70" y="30" width="180" height="52" fill="${d.c1}" opacity=".9"/>
    ${etiqueta(160, 54, corta(d.t, 26), '#fff', 'middle', 10)}
    ${etiqueta(160, 70, 'made by us', '#fff', 'middle', 7.4)}
    <rect x="84" y="94" width="70" height="52" rx="3" fill="${d.c2}" opacity=".3"/>
    <path d="M88 144 l18 -22 l14 14 l12 -10 l16 18 z" fill="${d.c2}" opacity=".7"/>
    ${d.p.slice(0, 4).map((x, i) => etiqueta(164, 102 + i * 15, (i + 1) + '. ' + corta(x, 15), d.tinta, 'start', 7.4)).join('')}
    ${renglones(84, 162, 150, 3, 10, d.c2)}`;
},

/* --- pregunta e hipotesis ------------------------------------------------ */
question(d){
  return `<rect x="52" y="34" width="216" height="76" rx="8" fill="${d.c1}" opacity=".16" stroke="${d.c1}" stroke-width="1.8"/>
    ${etiqueta(70, 54, 'MY QUESTION', d.c1, 'start', 7.2)}
    ${etiqueta(160, 80, corta(d.p[0] || d.t, 34), d.tinta, 'middle', 10)}
    <path d="M154 112 l6 12 l6 -12 z" fill="${d.c1}"/>
    <rect x="52" y="126" width="216" height="70" rx="8" fill="#fff" stroke="${d.c2}" stroke-width="1.6" stroke-dasharray="5 3"/>
    ${etiqueta(70, 144, 'I THINK…', d.c2, 'start', 7.2)}
    ${renglones(70, 156, 180, 3, 12, d.c2)}`;
},

/* --- receta / lonchera --------------------------------------------------- */
recipe(d){
  const LX = [108, 211, 211], LY = [122, 150, 190];
  return titulo(d) + `<rect x="58" y="52" width="204" height="140" rx="12" fill="${d.c1}" opacity=".22" stroke="${d.c1}" stroke-width="2"/>
    <rect x="112" y="40" width="96" height="16" rx="8" fill="${d.c1}" opacity=".7"/>
    <line x1="160" y1="52" x2="160" y2="192" stroke="${d.c1}" stroke-width="1.4" opacity=".55"/>
    <line x1="58" y1="128" x2="160" y2="128" stroke="${d.c1}" stroke-width="1.4" opacity=".55"/>
    <circle cx="108" cy="88" r="20" fill="${d.c2}" opacity=".6"/>
    <path d="M76 158 q22 -18 44 0 q-22 14 -44 0 z" fill="${d.c2}" opacity=".5"/>
    <rect x="176" y="70" width="70" height="46" rx="4" fill="${d.c2}" opacity=".45"/>
    <rect x="176" y="132" width="70" height="42" rx="4" fill="${d.c1}" opacity=".4"/>
    ${d.p.slice(0, 3).map((x, i) => etiqueta(LX[i], LY[i], corta(x, 16), d.tinta, 'middle', 7.4)).join('')}`;
}
};

/* Alias: nombres que un profesor escribiria y apuntan al mismo dibujo. */
const ALIAS = {
  cartel: 'poster', diagrama: 'diagram', cuaderno: 'journal', grafico: 'chart',
  conteo: 'tally', linea: 'timeline', mapa: 'map', carta: 'letter', maqueta: 'model',
  ficha: 'card', folleto: 'leaflet', clasificar: 'sort', plano: 'plan',
  informe: 'report', puesto: 'stand', registro: 'log', experimento: 'experiment',
  red: 'web', exposicion: 'speech', guia: 'guide', pregunta: 'question',
  receta: 'recipe', storyboard: 'video', fair: 'stand', exhibition: 'stand',
  notebook: 'journal', blueprint: 'plan', survey: 'tally', graph: 'chart',
  portrait: 'card', protocol: 'sort', proposal: 'report', presentation: 'speech',
  prototype: 'model', file: 'card', pictograph: 'chart', hypothesis: 'question',
  drawing: 'poster', foodweb: 'web', lunchbox: 'recipe', talk: 'speech'
};

/* Devuelve la lamina como <svg>. `cover` es el del arco. */
function modeloSVG(m, cover, opt){
  m = m || {}; opt = opt || {};
  const cv = cover || {};
  const d = {
    t: m.titulo || '',
    p: (m.partes || []).map(x => typeof x === 'string' ? x : (x && (x.en || x.es)) || ''),
    c1: cv.from || '#0b3a6f',
    c2: cv.to || '#3f83c4',
    tinta: '#1f2937',
    papel: '#ffffff',
    w: W, h: H
  };
  const fn = DIBUJO[ALIAS[m.tipo] || m.tipo] || DIBUJO.hoja;
  const alto = opt.alto || 210;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${alto}" role="img"
    aria-label="${esc(m.titulo || 'model')}" preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg" style="display:block;background:#fff">
    <rect width="${W}" height="${H}" fill="#fff"/>${fn(d)}</svg>`;
}

/* Miniatura para la cabecera plegada de la semana: el mismo dibujo, que a ese
   tamano hace de icono de "que se entrega esta semana". */
function modeloThumb(m, cover){
  return `<span class="mdl-thumb" aria-hidden="true">${modeloSVG(m, cover, {alto: 46})}</span>`;
}

window.modeloSVG = modeloSVG;
window.modeloThumb = modeloThumb;
window.MODELO_TIPOS = Object.keys(DIBUJO);
})();
