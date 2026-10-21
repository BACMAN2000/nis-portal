/* Service worker de la app NIS Portal. Solo controla /nis-app/:
   red primero y, sin conexión, la copia guardada del lanzador (Android exige
   que la URL de inicio responda offline). El portal no pasa por aquí. */
var CACHE = 'nis-app-v1';
var SHELL = ['/nis-app/', '/nis-app/icons/icon-192.png', '/nis-app/icons/icon-512.png'];

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
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req.mode === 'navigate' ? '/nis-app/' : req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req.mode === 'navigate' ? '/nis-app/' : req, { ignoreSearch: true });
  }));
});
