// Name of the cache
const STATIC_CACHE_NAME = "static-cache";
const DYNAMIC_CACHE_NAME = "dynamic-cache";

// URLs to be cached
const urlsToCache = ["/favicon.ico"];

/**
 * Event listener for the "install" event.
 * It opens the cache and adds the URLs to be cached.
 * @param {Event} event - The "install" event object.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
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
      return fetch(event.request).then((response) => {
        return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
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
          .filter((cacheName) => cacheName !== STATIC_CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
