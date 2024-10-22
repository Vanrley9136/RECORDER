const CACHE_NAME = 'screen-recorder-cache-v1';
const urlsToCache = [
  '/',
  '/recorder.html',
  '/manifest.json',
  '/13159904.png',
  '/13159904.png',
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap',
  'https://cdn.plyr.io/3.7.8/plyr.css',
  'https://cdn.plyr.io/3.7.8/plyr.js'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache.map(url => new Request(url, { mode: 'no-cors' })));
      })
  );
});

// Busca no cache durante o carregamento offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request, { mode: 'no-cors' });
      })
  );
});

// Atualiza o cache quando uma nova versão é encontrada
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
