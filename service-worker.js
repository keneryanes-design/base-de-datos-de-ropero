const CACHE_NAME = "atlas-ir-v5";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./offline.html",
  "./data/compuestos.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  // Las imágenes de los 200 espectros también quedan disponibles sin conexión.
  "./spectra/acidoscarboxilicos/acido-acetico.jpeg",
  "./spectra/acidoscarboxilicos/acido-butirico.jpeg",
  "./spectra/acidoscarboxilicos/acido-decanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-estearico.jpeg",
  "./spectra/acidoscarboxilicos/acido-formico.jpeg",
  "./spectra/acidoscarboxilicos/acido-heptadecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-heptanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-hexadecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-icosanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-isobutirico.jpeg",
  "./spectra/acidoscarboxilicos/acido-laurico.jpeg",
  "./spectra/acidoscarboxilicos/acido-nonadecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-nonanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-octanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-pivalico.jpeg",
  "./spectra/acidoscarboxilicos/acido-propionico.jpeg",
  "./spectra/acidoscarboxilicos/acido-tetradecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-tridecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-undecanoico.jpeg",
  "./spectra/acidoscarboxilicos/acido-valerico.jpeg",
  "./spectra/alcanos/2-2-4-Trimetilpentano.jpeg",
  "./spectra/alcanos/2-3-Dimetilbutano.jpeg",
  "./spectra/alcanos/2-Metilbutano.jpeg",
  "./spectra/alcanos/2-Metilpentano.jpeg",
  "./spectra/alcanos/3-Metilpentano.jpeg",
  "./spectra/alcanos/Ciclohexano.jpeg",
  "./spectra/alcanos/Ciclopentano.jpeg",
  "./spectra/alcanos/Decano.jpeg",
  "./spectra/alcanos/Dodecano.jpeg",
  "./spectra/alcanos/Heptano.jpeg",
  "./spectra/alcanos/Hexadecano.jpeg",
  "./spectra/alcanos/Hexano.jpeg",
  "./spectra/alcanos/Metilciclohexano.jpeg",
  "./spectra/alcanos/Nonano.jpeg",
  "./spectra/alcanos/Octano.jpeg",
  "./spectra/alcanos/Pentadecano.jpeg",
  "./spectra/alcanos/Pentano.jpeg",
  "./spectra/alcanos/Tetradecano.jpeg",
  "./spectra/alcanos/Tridecano.jpeg",
  "./spectra/alcanos/Undecano.jpeg",
  "./spectra/alcoholes/1-Butanol.jpeg",
  "./spectra/alcoholes/1-Decanol.jpeg",
  "./spectra/alcoholes/1-Heptanol.jpeg",
  "./spectra/alcoholes/1-Hexanol.jpeg",
  "./spectra/alcoholes/1-Nonanol.jpeg",
  "./spectra/alcoholes/1-Octanol.jpeg",
  "./spectra/alcoholes/1-Pentanol.jpeg",
  "./spectra/alcoholes/1-Propanol.jpeg",
  "./spectra/alcoholes/2-Butanol.jpeg",
  "./spectra/alcoholes/2-Hexanol.jpeg",
  "./spectra/alcoholes/2-Metil-1-propanol.jpeg",
  "./spectra/alcoholes/2-Pentanol.jpeg",
  "./spectra/alcoholes/2-Propanol.jpeg",
  "./spectra/alcoholes/3-Metil-1-butanol.jpeg",
  "./spectra/alcoholes/3-Pentanol.jpeg",
  "./spectra/alcoholes/4-Metil-1-pentanol.jpeg",
  "./spectra/alcoholes/Ciclohexanol.jpeg",
  "./spectra/alcoholes/Ciclopentanol.jpeg",
  "./spectra/alcoholes/Etanol.jpeg",
  "./spectra/alcoholes/Metanol.jpeg",
  "./spectra/aldehidos/2-2-dimetilpropanal.jpeg",
  "./spectra/aldehidos/2-Etilhexanal.jpeg",
  "./spectra/aldehidos/2-metilbutanal.jpeg",
  "./spectra/aldehidos/2-metilpentanal.jpeg",
  "./spectra/aldehidos/2-metilpropanal.jpeg",
  "./spectra/aldehidos/3-metilbutanal.jpeg",
  "./spectra/aldehidos/6-Metilheptanal.jpeg",
  "./spectra/aldehidos/Benzaldeido.jpeg",
  "./spectra/aldehidos/Butanal.jpeg",
  "./spectra/aldehidos/Ciclohexanocarbaldehido.jpeg",
  "./spectra/aldehidos/Decanal.jpeg",
  "./spectra/aldehidos/Heptanal.jpeg",
  "./spectra/aldehidos/Hexanal.jpeg",
  "./spectra/aldehidos/Nonanal.jpeg",
  "./spectra/aldehidos/Octanal.jpeg",
  "./spectra/aldehidos/Pentanal.jpeg",
  "./spectra/aldehidos/Propanal.jpeg",
  "./spectra/aldehidos/Tetradecanal.jpeg",
  "./spectra/aldehidos/Undecanal.jpeg",
  "./spectra/aldehidos/etanal.jpeg",
  "./spectra/alquenos/1-Deceno.jpeg",
  "./spectra/alquenos/1-Dodeceno.jpeg",
  "./spectra/alquenos/1-Hepteno.jpeg",
  "./spectra/alquenos/1-Hexeno.jpeg",
  "./spectra/alquenos/1-Noneno.jpeg",
  "./spectra/alquenos/1-Octeno.jpeg",
  "./spectra/alquenos/1-Penteno.jpeg",
  "./spectra/alquenos/1-Undeceno.jpeg",
  "./spectra/alquenos/2-3-Dimetil-2-buteno.jpeg",
  "./spectra/alquenos/2-Hepteno.jpeg",
  "./spectra/alquenos/2-Hexeno.jpeg",
  "./spectra/alquenos/2-Metil-2-buteno.jpeg",
  "./spectra/alquenos/2-Octeno.jpeg",
  "./spectra/alquenos/2-Penteno.jpeg",
  "./spectra/alquenos/3-Metil-1-4-pentadieno.jpeg",
  "./spectra/alquenos/4-Metil-1-penteno.jpeg",
  "./spectra/alquenos/Ciclohepteno.jpeg",
  "./spectra/alquenos/Ciclohexeno.jpeg",
  "./spectra/alquenos/Ciclopenteno.jpeg",
  "./spectra/alquenos/Isopreno-2-Metil-1-3-butadieno.jpeg",
  "./spectra/alquinos/1-Decino.jpeg",
  "./spectra/alquinos/1-Fenil-1-propino.jpeg",
  "./spectra/alquinos/1-Heptino.jpeg",
  "./spectra/alquinos/1-Hexino.jpeg",
  "./spectra/alquinos/1-Nonino.jpeg",
  "./spectra/alquinos/1-Octino.jpeg",
  "./spectra/alquinos/1-Pentino.jpeg",
  "./spectra/alquinos/2-4-Hexadiino.jpeg",
  "./spectra/alquinos/2-Butino.jpeg",
  "./spectra/alquinos/2-Cloro-2-5-5-trimetil-3-hexino.jpeg",
  "./spectra/alquinos/2-Heptino.jpeg",
  "./spectra/alquinos/2-Hexino.jpeg",
  "./spectra/alquinos/2-Nonino.jpeg",
  "./spectra/alquinos/2-Octino.jpeg",
  "./spectra/alquinos/2-Pentino.jpeg",
  "./spectra/alquinos/3-3-Dimetil-1-butino.jpeg",
  "./spectra/alquinos/3-Heptino.jpeg",
  "./spectra/alquinos/3-Nonino.jpeg",
  "./spectra/alquinos/3-Octino.jpeg",
  "./spectra/alquinos/4-Octino.jpeg",
  "./spectra/aminas/Butilamina.jpeg",
  "./spectra/aminas/Decilamina.jpeg",
  "./spectra/aminas/Dietilamina.jpeg",
  "./spectra/aminas/Diisopropilamina.jpeg",
  "./spectra/aminas/Dimetilamina.jpeg",
  "./spectra/aminas/Dipropilamina.jpeg",
  "./spectra/aminas/Etilamina.jpeg",
  "./spectra/aminas/Heptilamina.jpeg",
  "./spectra/aminas/Hexilamina.jpeg",
  "./spectra/aminas/Isobutilamina.jpeg",
  "./spectra/aminas/Isopropilamina.jpeg",
  "./spectra/aminas/Nonilamina.jpeg",
  "./spectra/aminas/Octilamina.jpeg",
  "./spectra/aminas/Pentilamina.jpeg",
  "./spectra/aminas/Propilamina.jpeg",
  "./spectra/aminas/Trietilamina.jpeg",
  "./spectra/aminas/Trimetilamina.jpeg",
  "./spectra/aminas/metilamina.jpeg",
  "./spectra/aminas/sec-Butilamina.jpeg",
  "./spectra/aminas/terc-Butilamina.jpeg",
  "./spectra/anhidricos/Anhidrido-2-etilhexanoico.jpeg",
  "./spectra/anhidricos/Anhidrido-3-3-dimetilglutarico.jpeg",
  "./spectra/anhidricos/Anhidrido-acetico.jpeg",
  "./spectra/anhidricos/Anhidrido-benzoico.jpeg",
  "./spectra/anhidricos/Anhidrido-butirico.jpeg",
  "./spectra/anhidricos/Anhidrido-cis-1-2-ciclohexanodicarboxilico.jpeg",
  "./spectra/anhidricos/Anhidrido-decanoico.jpeg",
  "./spectra/anhidricos/Anhidrido-glutarico.jpeg",
  "./spectra/anhidricos/Anhidrido-heptanoico.jpeg",
  "./spectra/anhidricos/Anhidrido-hexanoico.jpeg",
  "./spectra/anhidricos/Anhidrido-isobutirico.jpeg",
  "./spectra/anhidricos/Anhidrido-isovalerico.jpeg",
  "./spectra/anhidricos/Anhidrido-laurico.jpeg",
  "./spectra/anhidricos/Anhidrido-miristico.jpeg",
  "./spectra/anhidricos/Anhidrido-octanoico.jpeg",
  "./spectra/anhidricos/Anhidrido-pivalico.jpeg",
  "./spectra/anhidricos/Anhidrido-propionico.jpeg",
  "./spectra/anhidricos/Anhidrido-succinico.jpeg",
  "./spectra/anhidricos/Anhidrido-trifluoroacetico.jpeg",
  "./spectra/anhidricos/Anhidrido-valerico.jpeg",
  "./spectra/cetonas/2-4-dimetil-3-pentanona.jpeg",
  "./spectra/cetonas/2-butanona.jpeg",
  "./spectra/cetonas/2-decanona.jpeg",
  "./spectra/cetonas/2-heptanona.jpeg",
  "./spectra/cetonas/2-hexanona.jpeg",
  "./spectra/cetonas/2-nonanona.jpeg",
  "./spectra/cetonas/2-octanona.jpeg",
  "./spectra/cetonas/2-pentanona.jpeg",
  "./spectra/cetonas/3-3-dimetil-2-butanona.jpeg",
  "./spectra/cetonas/3-heptanona.jpeg",
  "./spectra/cetonas/3-hexanona.jpeg",
  "./spectra/cetonas/3-metil-2--butanona.jpeg",
  "./spectra/cetonas/3-metil-2-pentanona.jpeg",
  "./spectra/cetonas/3-octanona.jpeg",
  "./spectra/cetonas/3-pentanona.jpeg",
  "./spectra/cetonas/4-heptanona.jpeg",
  "./spectra/cetonas/4-metil-2-pentanona.jpeg",
  "./spectra/cetonas/Ciclohexanona.jpeg",
  "./spectra/cetonas/Ciclopentanona.jpeg",
  "./spectra/cetonas/acetona.jpeg",
  "./spectra/halurosdeacidos/Bromuro-de-acetilo.jpeg",
  "./spectra/halurosdeacidos/Bromuro-de-isobutirilo.jpeg",
  "./spectra/halurosdeacidos/Bromuro-de-propionilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-acetilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-butirilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-ciclohexanocarbonilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-decanoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-estearoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-heptanoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-hexanoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-isobutirilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-lauroilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-miristoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-nonanoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-octanoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-palmitoilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-pivaloilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-propionilo.jpeg",
  "./spectra/halurosdeacidos/Cloruro-de-valerilo.jpeg",
  "./spectra/halurosdeacidos/Fluoruro-de-benzoilo.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("espectroteca-ir-") && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (!event.data || event.data.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) return;
  const urls = event.data.urls
    .filter(url => typeof url === "string")
    .map(url => new URL(url, self.registration.scope))
    .filter(url => url.origin === self.location.origin)
    .map(url => url.href);
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urls)));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match("./index.html")) || (await caches.match("./offline.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
