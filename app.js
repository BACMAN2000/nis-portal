/* app.js ya no existe: el 17-sep-2026 se partió en app/00-core.js … app/99-boot.js
   (commit 8b5295c4). Este archivo solo lo pide un index.html VIEJO que el
   navegador guardó en caché —pasa en iPad/Safari y en los accesos directos de
   pantalla de inicio—: sin él no arrancaba nada y el portal se quedaba en
   «Loading NIS Portal…» para siempre. Se vuelve a pedir la portada con un
   parámetro nuevo, que la caché no conoce, para traer el index.html actual. */
(function () {
  try {
    if (/[?&]r=\d+/.test(location.search)) return;   // ya se reintentó: no entrar en bucle
    var q = location.search ? location.search + '&' : '?';
    location.replace(location.pathname + q + 'r=' + Date.now() + location.hash);
  } catch (e) {}
})();
