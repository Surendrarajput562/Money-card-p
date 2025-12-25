

const CACHE_NAME = 'goldrupi-cache-v10';

const urlsToCache = [
  '/',
  '/index.html',
  '/3.png',
  '/2.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Naya SW turant install hoga
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Purana v6, v5 sab saaf
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});











