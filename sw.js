/* Independent Education - service worker
   Makes the site installable and keeps it working on a weak or lost connection.
   When you change the website, change VERSION below so visitors get the new files. */
const VERSION = 'ie-v33-reel-no-shade';
const CORE = ['/', '/offline.html', '/img/ie-mark-256.webp', '/img/favicon.ico', '/img/site.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;          // never touch forms, tracking or other sites
  if (url.pathname.startsWith('/server-tracking/')) return;
  if (req.mode === 'navigate') {                                               // pages: network first, fall back to cache, then offline page
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('/')).then(r => r || caches.match('/offline.html'))));
    return;
  }
  if (url.pathname.startsWith('/img/')) {                                      // images: cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
