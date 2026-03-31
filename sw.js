const CACHE_NAME = 'finance-pwa-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // ── Network-only : Supabase (auth + API) — jamais mis en cache
  if (url.includes('supabase.co')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ── Network-first : CDN externes + fonts
  if (url.includes('cdn.jsdelivr') ||
      url.includes('fonts.googleapis') ||
      url.includes('fonts.gstatic')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // ── Cache-first : assets locaux (index.html, manifest.json)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
