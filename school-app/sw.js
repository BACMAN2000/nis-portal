/* Service worker de la app Cohasset School. Solo controla /school-app/:
   red primero y, sin conexión, la copia guardada del lanzador (Android exige
   que la URL de inicio responda offline). El portal no pasa por aquí. */
var CACHE = 'coh-school-app-v1';
var SHELL = ['/school-app/', '/school-app/icons/icon-192.png', '/school-app/icons/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req.mode === 'navigate' ? '/school-app/' : req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req.mode === 'navigate' ? '/school-app/' : req, { ignoreSearch: true });
  }));
});
