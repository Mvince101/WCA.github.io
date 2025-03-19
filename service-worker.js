const CACHE_NAME = 'world-countries-cache-v1';
const urlsToCache = [
  '/',
  '/world_countries_data.html',
  '/design.css',
  '/manifest.json',
  '/icons/icon1.png',
  '/Flags/philippineflag.png',
  '/Flags/germanyflag.png',
  '/Flags/australiaflag.png',
  '/Flags/belgiumflag.png',
  '/Flags/russiaflag.png',
  '/Flags/greeceflag.png',
  '/Flags/franceflag.png',
  '/Flags/japanflag.png',
  '/Flags/usflag.png',
  '/Flags/ukflag.png'
];

// Install the service worker and cache the assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve assets from the cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});

// Update the cache when a new service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
