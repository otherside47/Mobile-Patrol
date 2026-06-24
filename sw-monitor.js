// Mobile Patrol Monitor — Service Worker

self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) {}
  var title = data.title || 'MP Monitor';
  var body = data.body || '';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: './icon-192-monitor.png',
      badge: './icon-192-monitor.png',
      tag: 'mp-monitor',
      renotify: true,
      requireInteraction: true,
      vibrate: [200, 100, 200],
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if ('focus' in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow('./monitor-app.html');
    })
  );
});
