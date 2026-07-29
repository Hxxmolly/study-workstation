// 自毁版本 - 收到后立即注销自己
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    // 清除所有缓存
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      // 注销自己
      return self.registration.unregister();
    })
  );
});

// 不缓存任何请求
self.addEventListener('fetch', function(e) {
  // 不干预，直接透传
  e.respondWith(fetch(e.request));
});