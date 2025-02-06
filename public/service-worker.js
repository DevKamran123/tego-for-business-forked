// public/service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.', event);
  // Perform install steps
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.', event);
  // Perform activate steps
});

self.addEventListener('fetch', (event) => {
  // console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});