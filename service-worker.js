const CACHE_NAME = "biblical-languages-v3-social";
const APP_ROOT = new URL("./", self.location.href).pathname;
const APP_SHELL = [
  APP_ROOT,
  `${APP_ROOT}dashboard.html`,
  `${APP_ROOT}activity.html`,
  `${APP_ROOT}friends.html`,
  `${APP_ROOT}study-room.html`,
  `${APP_ROOT}login.html`,
  `${APP_ROOT}css/variables.css`,
  `${APP_ROOT}css/base.css`,
  `${APP_ROOT}css/layout.css`,
  `${APP_ROOT}css/components.css`,
  `${APP_ROOT}assets/logo.png`,
  `${APP_ROOT}assets/splash-screen.png`,
  `${APP_ROOT}assets/icon-192.png`,
  `${APP_ROOT}assets/icon-512.png`
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(`${APP_ROOT}dashboard.html`))));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
    const existing = windows.find((client) => client.url.includes(APP_ROOT));
    if (existing) return existing.focus();
    return clients.openWindow(`${APP_ROOT}dashboard.html`);
  }));
});
