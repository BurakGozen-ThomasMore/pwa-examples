self.addEventListener("install", () => {
  console.log("[Service Worker] Installed");
});

self.addEventListener("activate", () => {
  console.log("[Service Worker] Activated");
});

/**
 * Maak nu zelf een listener voor de fetch event aan die een fetch event logt naar de console
 */
