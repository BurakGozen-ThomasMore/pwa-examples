/**
 * Verander deze code zodanig dat de service worker dyanmisch caching toepast.
 * De serice worker moet de nieuwe fetch request opslaan in de cache.
 */

// Name of the cache
const CACHE_NAME = "static-cache";

// URLs to be cached
const urlsToCache = ["/favicon.ico"];

/**
 * Event listener for the "install" event.
 * It opens the cache and adds the URLs to be cached.
 * @param {Event} event - The "install" event object.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Event listener for the "fetch" event.
 * It responds to fetch requests by checking the cache first and returning the cached response if available.
 * If the requested resource is not in the cache, it fetches it from the network.
 * @param {Event} event - The "fetch" event object.
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});

/**
 * Event listener for the "activate" event.
 * It deletes old caches that are not in the cache whitelist.
 * @param {Event} event - The "activate" event object.
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
