const CACHE_NAME = 'athkar-counter-v1.0.0';
const urlsToCache = [
    // We now point the root path to the renamed index.html
    '/Athkar_counter/',
    '/Athkar_counter/index.html', // Corrected path: was athkar-index.html
    '/Athkar_counter/manifest.json',
    '/Athkar_counter/icons/icon-72x72.png',
    '/Athkar_counter/icons/icon-192x192.png',
    '/Athkar_counter/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Important: Handle cache path error gracefully
            return cache.addAll(urlsToCache).catch(error => {
                console.error('Failed to cache resources:', error);
            });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(cacheNames.map(name => {
                if (name !== CACHE_NAME) return caches.delete(name);
            }))
        )
    );
});
