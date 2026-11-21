/* Service worker form Laporan Follow Up Pelanggan: menerima push notifikasi dan memungkinkan dashboard diinstal di HP.
 * Tidak menyimpan cache halaman: data selalu diambil langsung dari server. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  var url = new URL('form.html?t=' + encodeURIComponent(d.t || '') + '&n=1' + (d.path || ''), self.registration.scope).href;
  e.waitUntil(self.registration.showNotification(d.title || 'Laporan Follow Up Pelanggan', {
    body: d.body || 'Ada pengingat follow up pelanggan.',
    icon: 'icon-192.png',
    tag: d.tag || 'fu',
    renotify: true,
    data: { url: url }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (ws) {
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i];
      if (w.url.indexOf('form') >= 0 && 'focus' in w) { return w.navigate(url).then(function (c) { return (c || w).focus(); }).catch(function () { return w.focus(); }); }
    }
    return self.clients.openWindow(url);
  }));
});
