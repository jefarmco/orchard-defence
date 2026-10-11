const CACHE='orchard-defence-v3';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./assets/atlas.webp','./assets/map0.webp','./assets/map1.webp','./assets/map2.webp','./assets/title.webp','./assets/wood.webp','./assets/board.webp','./assets/iron.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
