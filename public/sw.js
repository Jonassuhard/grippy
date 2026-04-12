const CACHE_NAME = "grippy-v1";
const ASSETS = [
  "/",
  "/logo-grippy.png",
  "/bluetooth-icon.png",
  "/grip-pressure.png",
  "/grip-rotation-object.png",
  "/grip-relaxation-object.png",
  "/hand-outline.png",
  "/ex-pression1.png",
  "/ex-pression2.png",
  "/ex-pression3.png",
  "/ex-relaxation.png",
  "/relax-palms.png",
  "/bravo.wav",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        if (response.ok && event.request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
