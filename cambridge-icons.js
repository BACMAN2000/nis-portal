/* ============================================================
   Cambridge · iconos 3D
   ------------------------------------------------------------
   Las tarjetas YLE y MAIN SUITE se comparten entre cohasset.pe y
   nis.cohasset.pe, asi que los dibujos viven en UN solo archivo y se copian
   igual a los dos repos. Si cambias uno, copia el archivo entero al otro
   sitio; no edites los SVG dos veces.

   Cada icono es un SVG suelto de 128x128 con volumen de verdad:
     · sombra proyectada en el suelo (elipse difuminada)
     · cara superior clara y cara lateral oscura (la extrusion)
     · degradado vertical en el cuerpo
     · brillo especular arriba y luz de borde abajo
   Los ids de los degradados llevan el nombre del icono delante porque en una
   misma pagina conviven varios SVG y los ids son globales: sin prefijo, el
   segundo icono se pintaria con el degradado del primero.

   Uso:  camIcon('yle')            -> string con el <svg>
         camIcon('fce', 64)        -> el mismo, a 64px
   ============================================================ */
(function (global) {
  'use strict';

  /* Sombra de suelo comun: todos los objetos se apoyan en el mismo plano, si
     no cada icono parece flotar a una altura distinta. */
  function suelo(id, cx, cy, rx, ry) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}-sh)"/>`;
  }
  function defsSombra(id) {
    return `<radialGradient id="${id}-sh" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#0B1736" stop-opacity=".34"/>
        <stop offset="60%" stop-color="#0B1736" stop-opacity=".14"/>
        <stop offset="100%" stop-color="#0B1736" stop-opacity="0"/>
      </radialGradient>`;
  }
  /* Degradado de cuerpo: claro arriba, saturado en medio, oscuro abajo. */
  function cuerpo(id, c1, c2, c3) {
    return `<linearGradient id="${id}-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c1}"/><stop offset="55%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>`;
  }
  /* Brillo especular: una mancha blanca que se apaga hacia abajo. */
  function brillo(id) {
    return `<linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>`;
  }

  const I = {};

  /* ---------- YLE · bloques de juguete apilados con una estrella ---------- */
  I.yle = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'a', '#FCD34D', '#F59E0B', '#B45309')}
      ${cuerpo(id + 'b', '#FDBA74', '#F97316', '#C2410C')}
      ${cuerpo(id + 'c', '#FCA5A5', '#EF4444', '#B91C1C')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 40, 9)}
    <!-- bloque de abajo -->
    <path d="M26 80 64 62 102 80 64 98Z" fill="#FDE68A"/>
    <path d="M26 80v14l38 18V98Z" fill="url(#${id}a-b)"/>
    <path d="M102 80v14l-38 18V98Z" fill="#92400E"/>
    <!-- bloque del medio -->
    <path d="M34 58 64 44 94 58 64 72Z" fill="#FED7AA"/>
    <path d="M34 58v13l30 14V72Z" fill="url(#${id}b-b)"/>
    <path d="M94 58v13L64 85V72Z" fill="#9A3412"/>
    <!-- bloque de arriba -->
    <path d="M42 38 64 28 86 38 64 48Z" fill="#FECACA"/>
    <path d="M42 38v12l22 10V48Z" fill="url(#${id}c-b)"/>
    <path d="M86 38v12L64 60V48Z" fill="#991B1B"/>
    <!-- estrella coronando -->
    <path d="m64 6 4.6 9.6 10.4 1.5-7.6 7.3 1.9 10.5L64 30l-9.3 4.9 1.9-10.5L49 17.1l10.4-1.5Z"
          fill="#FDE047" stroke="#CA8A04" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M42 38 64 28 86 38 64 44Z" fill="url(#${id}-g)"/>`)('yle');

  /* ---------- MAIN SUITE · medalla con cinta ---------- */
  I.main = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'm', '#DDD6FE', '#8B5CF6', '#5B21B6')}
      ${cuerpo(id + 'r', '#C4B5FD', '#7C3AED', '#4C1D95')}
      ${brillo(id)}
      <radialGradient id="${id}-core" cx="38%" cy="30%">
        <stop offset="0%" stop-color="#F5F3FF"/><stop offset="55%" stop-color="#A78BFA"/>
        <stop offset="100%" stop-color="#6D28D9"/>
      </radialGradient>
    </defs>
    ${suelo(id, 64, 116, 34, 8)}
    <!-- cintas -->
    <path d="M44 10h18l-6 40H36Z" fill="url(#${id}r-b)"/>
    <path d="M84 10H66l6 40h20Z" fill="#5B21B6"/>
    <path d="M44 10h18l-4 26H40Z" fill="#A78BFA" opacity=".55"/>
    <!-- canto de la medalla (la extrusion) -->
    <ellipse cx="64" cy="82" rx="34" ry="34" fill="#4C1D95"/>
    <ellipse cx="64" cy="78" rx="34" ry="34" fill="url(#${id}m-b)"/>
    <ellipse cx="64" cy="78" rx="26" ry="26" fill="url(#${id}-core)"/>
    <!-- estrella grabada -->
    <path d="m64 61 4.9 10 11 1.6-8 7.8 1.9 11-9.8-5.2-9.8 5.2 1.9-11-8-7.8 11-1.6Z"
          fill="#FDE68A" stroke="#B45309" stroke-width="1.2" stroke-linejoin="round"/>
    <!-- especular del cristal -->
    <path d="M40 66a26 26 0 0 1 44-12 26 26 0 0 0-44 22Z" fill="url(#${id}-g)"/>`)('main');

  /* ---------- STARTERS · brote saliendo de la maceta ---------- */
  I.starters = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'p', '#FDBA74', '#F97316', '#9A3412')}
      ${cuerpo(id + 'l', '#86EFAC', '#22C55E', '#15803D')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 33, 8)}
    <!-- tallo y hojas -->
    <path d="M64 74V40" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
    <path d="M64 52c-16 0-24-8-24-20 14 0 24 6 24 20Z" fill="url(#${id}l-b)"/>
    <path d="M64 44c14 0 22-7 22-18-13 0-22 5-22 18Z" fill="#16A34A"/>
    <path d="M64 52c-13-1-20-7-21-17 10 1 18 6 21 17Z" fill="#BBF7D0" opacity=".5"/>
    <!-- maceta: boca elipse + cuerpo troncoconico -->
    <path d="M40 72h48l-6 34a4 4 0 0 1-4 3H50a4 4 0 0 1-4-3Z" fill="url(#${id}p-b)"/>
    <path d="M74 72h14l-6 34a4 4 0 0 1-4 3h-8Z" fill="#7C2D12" opacity=".55"/>
    <ellipse cx="64" cy="72" rx="24" ry="7" fill="#FDBA74"/>
    <ellipse cx="64" cy="72" rx="19" ry="4.6" fill="#7C2D12"/>
    <path d="M46 78h10l-4 28h-3Z" fill="url(#${id}-g)"/>`)('starters');

  /* ---------- MOVERS · escalera que sube con la flecha ---------- */
  I.movers = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 's', '#FDE68A', '#F59E0B', '#B45309')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 38, 8)}
    <!-- tres peldanos en perspectiva -->
    <path d="M18 86 40 74l22 12-22 12Z" fill="#FDE68A"/>
    <path d="M18 86v10l22 12V98Z" fill="url(#${id}s-b)"/>
    <path d="M62 86v10l-22 12V98Z" fill="#92400E"/>
    <path d="M40 68 62 56l22 12-22 12Z" fill="#FDE68A"/>
    <path d="M40 68v10l22 12V80Z" fill="url(#${id}s-b)"/>
    <path d="M84 68v10L62 90V80Z" fill="#92400E"/>
    <path d="M62 50 84 38l22 12-22 12Z" fill="#FDE68A"/>
    <path d="M62 50v10l22 12V62Z" fill="url(#${id}s-b)"/>
    <path d="M106 50v10L84 72V62Z" fill="#92400E"/>
    <!-- flecha de avance -->
    <path d="M28 46h34v-9l18 15-18 15v-9H28Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M28 46h34v-6l10 8H28Z" fill="url(#${id}-g)"/>`)('movers');

  /* ---------- FLYERS · avion de papel con estela ---------- */
  I.flyers = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'w', '#BFDBFE', '#3B82F6', '#1E40AF')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 70, 110, 32, 7)}
    <!-- estela -->
    <path d="M12 96c14-6 24-14 30-24" stroke="#93C5FD" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/>
    <path d="M20 108c16-5 28-13 36-24" stroke="#BFDBFE" stroke-width="4" stroke-linecap="round" fill="none" opacity=".55"/>
    <!-- ala lejana (mas oscura: esta detras) -->
    <path d="M108 20 46 58l20 6Z" fill="#1E3A8A"/>
    <!-- cuerpo -->
    <path d="M108 20 40 70l30 4Z" fill="url(#${id}w-b)"/>
    <!-- ala cercana, plegada -->
    <path d="M108 20 70 74l6 22Z" fill="#2563EB"/>
    <!-- pliegue central iluminado -->
    <path d="M108 20 70 74l-4-10Z" fill="#DBEAFE" opacity=".85"/>
    <path d="M108 20 52 61l14 3Z" fill="url(#${id}-g)"/>`)('flyers');

  /* ---------- A2 KEY · llave ---------- */
  I.ket = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'k', '#BFDBFE', '#3B82F6', '#1D4ED8')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 34, 8)}
    <g transform="rotate(-38 64 62)">
      <!-- anilla -->
      <circle cx="64" cy="34" r="22" fill="#1E40AF"/>
      <circle cx="64" cy="31" r="22" fill="url(#${id}k-b)"/>
      <circle cx="64" cy="31" r="11" fill="#0B1736"/>
      <circle cx="64" cy="31" r="9" fill="#1E3A8A"/>
      <!-- espiga -->
      <path d="M58 50h12v52H58Z" fill="url(#${id}k-b)"/>
      <path d="M66 50h4v52h-4Z" fill="#1E3A8A"/>
      <!-- dientes -->
      <path d="M70 78h16v9H70Zm0 16h11v9H70Z" fill="#2563EB"/>
      <path d="M70 78h16v3H70Zm0 16h11v3H70Z" fill="#93C5FD"/>
      <path d="M50 16a22 22 0 0 1 26 2 22 22 0 0 0-28 20Z" fill="url(#${id}-g)"/>
    </g>`)('ket');

  /* ---------- B1 PRELIMINARY · brujula ---------- */
  I.pet = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'c', '#BAE6FD', '#0EA5E9', '#075985')}
      ${brillo(id)}
      <radialGradient id="${id}-face" cx="38%" cy="32%">
        <stop offset="0%" stop-color="#F0F9FF"/><stop offset="60%" stop-color="#BAE6FD"/>
        <stop offset="100%" stop-color="#38BDF8"/>
      </radialGradient>
    </defs>
    ${suelo(id, 64, 114, 34, 8)}
    <!-- caja: el canto va abajo y da el grosor -->
    <circle cx="64" cy="70" r="38" fill="#075985"/>
    <circle cx="64" cy="65" r="38" fill="url(#${id}c-b)"/>
    <circle cx="64" cy="65" r="29" fill="url(#${id}-face)"/>
    <!-- rosa de los vientos -->
    <path d="M64 40l7 20 20 5-20 5-7 20-7-20-20-5 20-5Z" fill="#0369A1" opacity=".28"/>
    <path d="M64 40 71 60 64 65Z" fill="#DC2626"/>
    <path d="M64 40 57 60 64 65Z" fill="#F87171"/>
    <path d="M64 90 57 70 64 65Z" fill="#E2E8F0"/>
    <path d="M64 90 71 70 64 65Z" fill="#94A3B8"/>
    <circle cx="64" cy="65" r="4" fill="#0F172A"/>
    <!-- bisel superior -->
    <path d="M32 58a32 32 0 0 1 56-16A32 32 0 0 0 32 70Z" fill="url(#${id}-g)"/>`)('pet');

  /* ---------- B2 FIRST · estrella con volumen ---------- */
  I.fce = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 's', '#DDD6FE', '#8B5CF6', '#5B21B6')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 36, 8)}
    <!-- cara trasera desplazada = grosor de la estrella -->
    <path d="m64 20 14 30 33 5-24 23 6 33-29-16-29 16 6-33-24-23 33-5Z"
          transform="translate(0,6)" fill="#4C1D95"/>
    <path d="m64 20 14 30 33 5-24 23 6 33-29-16-29 16 6-33-24-23 33-5Z" fill="url(#${id}s-b)"/>
    <!-- facetas: cada punta con su triangulo claro y oscuro -->
    <path d="M64 20 78 50 64 66Z" fill="#EDE9FE" opacity=".7"/>
    <path d="M64 20 50 50 64 66Z" fill="#C4B5FD" opacity=".55"/>
    <path d="M111 55 87 78 64 66Z" fill="#7C3AED"/>
    <path d="M17 55l24 23 23-12Z" fill="#A78BFA" opacity=".6"/>
    <path d="M93 111 64 95l0-29Z" fill="#6D28D9"/>
    <path d="M35 111 64 95l0-29Z" fill="#8B5CF6"/>
    <path d="M64 20 78 50 64 40Z" fill="url(#${id}-g)"/>`)('fce');

  /* ---------- C1 ADVANCED · medalla de laurel ---------- */
  I.cae = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'm', '#FDE68A', '#F59E0B', '#92400E')}
      ${brillo(id)}
      <radialGradient id="${id}-core" cx="36%" cy="30%">
        <stop offset="0%" stop-color="#FFFBEB"/><stop offset="55%" stop-color="#FCD34D"/>
        <stop offset="100%" stop-color="#B45309"/>
      </radialGradient>
    </defs>
    ${suelo(id, 64, 116, 32, 8)}
    <!-- cintas cruzadas -->
    <path d="M46 8h16l-8 40H38Z" fill="#8B5CF6"/>
    <path d="M82 8H66l8 40h16Z" fill="#6D28D9"/>
    <!-- disco -->
    <circle cx="64" cy="82" r="32" fill="#78350F"/>
    <circle cx="64" cy="78" r="32" fill="url(#${id}m-b)"/>
    <circle cx="64" cy="78" r="24" fill="url(#${id}-core)"/>
    <!-- canto ranurado: el detalle que hace que se lea como moneda y no como circulo -->
    <circle cx="64" cy="78" r="28" fill="none" stroke="#B45309" stroke-width="4"
            stroke-dasharray="3 5" opacity=".45"/>
    <text x="64" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="26"
          font-weight="700" fill="#7C2D12">C1</text>
    <!-- ramita de laurel bajo el numero -->
    <path d="M56 94c4 3 8 3 12 0" stroke="#15803D" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="55" cy="93" rx="3.4" ry="2" fill="#16A34A" transform="rotate(-30 55 93)"/>
    <ellipse cx="69" cy="93" rx="3.4" ry="2" fill="#16A34A" transform="rotate(30 69 93)"/>
    <path d="M40 68a32 32 0 0 1 50-16A32 32 0 0 0 40 74Z" fill="url(#${id}-g)"/>`)('cae');

  /* ---------- C2 PROFICIENCY · corona ---------- */
  I.cpe = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'c', '#FDE68A', '#EAB308', '#854D0E')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 36, 8)}
    <!-- cara frontal de la corona -->
    <path d="M22 46l16 20 26-34 26 34 16-20-8 46H30Z" fill="url(#${id}c-b)"/>
    <!-- cara interior, mas oscura: da la curvatura -->
    <path d="M64 32l26 34 16-20-8 46H64Z" fill="#A16207" opacity=".45"/>
    <!-- base con grosor -->
    <path d="M30 92h68v12H30Z" fill="#854D0E"/>
    <path d="M30 92h68v6H30Z" fill="#FACC15"/>
    <!-- gemas en las puntas -->
    <circle cx="22" cy="44" r="6" fill="#EF4444" stroke="#991B1B" stroke-width="1.2"/>
    <circle cx="64" cy="30" r="7" fill="#8B5CF6" stroke="#5B21B6" stroke-width="1.2"/>
    <circle cx="106" cy="44" r="6" fill="#22C55E" stroke="#15803D" stroke-width="1.2"/>
    <circle cx="48" cy="84" r="4.5" fill="#EF4444" opacity=".9"/>
    <circle cx="80" cy="84" r="4.5" fill="#3B82F6" opacity=".9"/>
    <path d="M22 46l16 20 26-34-6-2-22 28Z" fill="url(#${id}-g)"/>`)('cpe');

  /* ---------- PRACTICE TEST · tabla con visto y cronometro ---------- */
  I.practice = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'p', '#E2E8F0', '#94A3B8', '#475569')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 62, 114, 36, 8)}
    <!-- canto de la tabla -->
    <rect x="22" y="20" width="72" height="90" rx="10" fill="#334155"/>
    <rect x="22" y="16" width="72" height="90" rx="10" fill="url(#${id}p-b)"/>
    <rect x="30" y="26" width="56" height="72" rx="6" fill="#F8FAFC"/>
    <!-- pinza -->
    <rect x="46" y="8" width="24" height="16" rx="5" fill="#64748B"/>
    <rect x="46" y="8" width="24" height="7" rx="3.5" fill="#CBD5E1"/>
    <!-- lineas del examen -->
    <rect x="38" y="38" width="30" height="5" rx="2.5" fill="#CBD5E1"/>
    <rect x="38" y="52" width="40" height="5" rx="2.5" fill="#CBD5E1"/>
    <rect x="38" y="66" width="24" height="5" rx="2.5" fill="#CBD5E1"/>
    <!-- visto grande -->
    <path d="M40 80l10 11 22-26" stroke="#16A34A" stroke-width="8" fill="none"
          stroke-linecap="round" stroke-linejoin="round"/>
    <!-- cronometro delante -->
    <circle cx="96" cy="86" r="22" fill="#1E3A8A"/>
    <circle cx="96" cy="83" r="22" fill="#2563EB"/>
    <circle cx="96" cy="83" r="16" fill="#EFF6FF"/>
    <rect x="91" y="57" width="10" height="7" rx="2" fill="#1E40AF"/>
    <path d="M96 73v10h8" stroke="#1E40AF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect x="30" y="26" width="56" height="26" rx="6" fill="url(#${id}-g)"/>`)('practice');

  /* ---------- CURSO · birrete ---------- */
  I.course = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'c', '#DDD6FE', '#7C3AED', '#4C1D95')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 34, 8)}
    <!-- copa -->
    <path d="M40 62h48v22a24 10 0 0 1-48 0Z" fill="#5B21B6"/>
    <path d="M64 62h24v22a24 10 0 0 1-24 10Z" fill="#4C1D95"/>
    <!-- tabla del birrete -->
    <path d="M64 30 118 54 64 78 10 54Z" fill="url(#${id}c-b)"/>
    <path d="M64 78 118 54v6L64 84Z" fill="#4C1D95"/>
    <path d="M64 78 10 54v6l54 30Z" fill="#6D28D9"/>
    <!-- borla -->
    <path d="M112 57v22" stroke="#FACC15" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="112" cy="84" r="7" fill="#EAB308"/>
    <circle cx="110" cy="82" r="3" fill="#FDE68A"/>
    <path d="M64 30 100 46 64 62 28 46Z" fill="url(#${id}-g)"/>`)('course');

  /* ---------- LISTENING · cascos ---------- */
  I.listening = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'h', '#BAE6FD', '#0EA5E9', '#075985')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 34, 8)}
    <!-- diadema -->
    <path d="M24 78V64a40 40 0 0 1 80 0v14" stroke="#075985" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M24 74V60a40 40 0 0 1 80 0v14" stroke="url(#${id}h-b)" stroke-width="12" fill="none" stroke-linecap="round"/>
    <!-- auriculares con grosor -->
    <rect x="10" y="66" width="28" height="42" rx="13" fill="#0C4A6E"/>
    <rect x="10" y="62" width="28" height="42" rx="13" fill="url(#${id}h-b)"/>
    <rect x="16" y="70" width="16" height="26" rx="8" fill="#E0F2FE"/>
    <rect x="90" y="66" width="28" height="42" rx="13" fill="#0C4A6E"/>
    <rect x="90" y="62" width="28" height="42" rx="13" fill="url(#${id}h-b)"/>
    <rect x="96" y="70" width="16" height="26" rx="8" fill="#E0F2FE"/>
    <path d="M28 60a36 36 0 0 1 66-8A36 36 0 0 0 28 66Z" fill="url(#${id}-g)"/>`)('listening');

  /* ---------- BONUS · rayo ---------- */
  I.bonus = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'z', '#FEF08A', '#F59E0B', '#B45309')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 28, 7)}
    <path d="M72 8 32 68h24l-8 52 44-64H66Z" transform="translate(4,6)" fill="#92400E"/>
    <path d="M72 8 32 68h24l-8 52 44-64H66Z" fill="url(#${id}z-b)"/>
    <path d="M72 8 32 68h14L72 20Z" fill="#FEF9C3" opacity=".8"/>
    <path d="M92 56 48 120l4-30Z" fill="#B45309" opacity=".5"/>
    <path d="M72 8 32 68h12L72 22Z" fill="url(#${id}-g)"/>`)('bonus');

  /* ---------- USE OF ENGLISH · piezas de puzzle ---------- */
  I.uoe = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'a', '#A5B4FC', '#6366F1', '#3730A3')}
      ${cuerpo(id + 'b', '#6EE7B7', '#10B981', '#065F46')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 110, 42, 8)}
    <!-- La pieza de la izquierda saca el teton; la de la derecha trae el hueco.
         Se dejan separadas a proposito: asi se lee "encajan", que es lo que
         hace el Use of English, y no un bloque de color unico. -->
    <path d="M20 32h34v13a10 10 0 0 1 0 20v13H20Z" transform="translate(0,7)" fill="#312E81"/>
    <path d="M20 32h34v13a10 10 0 0 1 0 20v13H20Z" fill="url(#${id}a-b)"/>
    <path d="M74 32h34v46H74V65a10 10 0 0 0 0-20Z" transform="translate(0,7)" fill="#065F46"/>
    <path d="M74 32h34v46H74V65a10 10 0 0 0 0-20Z" fill="url(#${id}b-b)"/>
    <!-- luz en la cara de arriba de cada pieza -->
    <path d="M20 32h34v13H20Z" fill="url(#${id}-g)"/>
    <path d="M74 32h34v13H74Z" fill="url(#${id}-g)"/>`)('uoe');

  /* ---------- READING · libro abierto ---------- */
  I.reading = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'b', '#FCA5A5', '#EF4444', '#991B1B')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 64, 112, 40, 8)}
    <!-- tapa -->
    <path d="M12 40c18-10 34-10 52 0v58c-18-10-34-10-52 0Z" fill="#991B1B"/>
    <path d="M116 40c-18-10-34-10-52 0v58c18-10 34-10 52 0Z" fill="#7F1D1D"/>
    <!-- hojas -->
    <path d="M18 42c16-8 30-8 46 2v52c-16-10-30-10-46-2Z" fill="#FFF7ED"/>
    <path d="M110 42c-16-8-30-8-46 2v52c16-10 30-10 46-2Z" fill="#FEF3C7"/>
    <!-- renglones -->
    <g stroke="#D6D3D1" stroke-width="3" stroke-linecap="round">
      <path d="M26 54c10-3 20-2 30 3M26 66c10-3 20-2 30 3M26 78c10-3 20-2 30 3"/>
      <path d="M102 54c-10-3-20-2-30 3M102 66c-10-3-20-2-30 3M102 78c-10-3-20-2-30 3"/>
    </g>
    <!-- lomo -->
    <path d="M60 42h8v56h-8Z" fill="url(#${id}b-b)"/>
    <path d="M18 42c16-8 30-8 46 2v10c-16-10-30-11-46-3Z" fill="url(#${id}-g)"/>`)('reading');

  /* ---------- WRITING · pluma sobre folio ---------- */
  I.writing = (id => `
    <defs>${defsSombra(id)}
      ${cuerpo(id + 'p', '#BFDBFE', '#3B82F6', '#1E3A8A')}
      ${brillo(id)}
    </defs>
    ${suelo(id, 62, 114, 34, 8)}
    <!-- folio con grosor -->
    <rect x="22" y="26" width="62" height="82" rx="6" fill="#CBD5E1"/>
    <rect x="22" y="22" width="62" height="82" rx="6" fill="#F8FAFC"/>
    <g stroke="#CBD5E1" stroke-width="4" stroke-linecap="round">
      <path d="M32 40h42M32 54h42M32 68h30"/>
    </g>
    <!-- pluma -->
    <path d="M104 14c-14 4-40 22-50 48l-6 16 16-6c26-10 44-36 48-50Z" fill="url(#${id}p-b)"/>
    <path d="M104 14c-8 24-24 42-50 62l-6 2 6-16c10-26 36-44 50-48Z" fill="#1D4ED8" opacity=".5"/>
    <path d="M52 78 40 90" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
    <path d="M104 14c-12 4-32 18-44 38l8-4c12-16 28-28 36-34Z" fill="url(#${id}-g)"/>`)('writing');

  /* Envoltura: el viewBox es siempre 0 0 128 128, asi que el tamano se pide
     al pintar y no hay que tocar los SVG. */
  function camIcon(key, size) {
    const body = I[key];
    if (!body) return '';
    const s = size || 128;
    return `<svg class="cam-ico cam-ico-${key}" width="${s}" height="${s}" viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  global.CAMBRIDGE_ICONS = I;
  global.camIcon = camIcon;
})(typeof window !== 'undefined' ? window : this);
