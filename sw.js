// Service worker : network-first STRICT — contourne le cache HTTP (GitHub Pages = 10 min)
// pour que chaque déploiement soit visible immédiatement.
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Fichiers de l'app (même origine) : toujours revalider auprès du serveur
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request, { cache: "no-cache" }).catch(() => caches.match(e.request))
    );
  }
  // CDN (Leaflet, Supabase, tuiles…) : comportement normal du navigateur
});
