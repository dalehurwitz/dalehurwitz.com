const dhCacheName = 'dh-cache-1'

const cacheFiles = [
  '/',
  'index.html',
  'style.css',
  'index.js'
]

// 1. Cache files
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(dhCacheName)
      .then(function (cache) {
        return cache.addAll(cacheFiles)
      })
  )
})

// 2. Serve cached files
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
      .catch(function (error) {

      })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== dhCacheName) {
              return caches.delete(cacheName)
            }
          })
        )
      })
  )
})