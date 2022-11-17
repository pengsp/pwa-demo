var cacheStorageKey = 'web-app-pwa'
var cacheList = [   '/',   "index.html",   "*.css",   "*.png", "*.js" ]
// self ServiceWorkerGlobalScope
self.addEventListener('install', function(e) {
  //  console.log('cache event!')
   e.waitUntil(
     caches.open(cacheStorageKey)
       .then(function(cache) {
          // console.log('adding to cache:', cacheList)
          return cache.addAll(cacheList)
       }).then(function() {
        // console.log('skip waiting!')
        return self.skipWaiting()
       }).catch(err=>{
        console.log("err",err)
       })
   )
})

self.addEventListener('fetch', function(e) {
  if((e.request.url.indexOf('http') === 0)){ 
    e.respondWith(
      caches.match(e.request)
      .then(function(response) {
        if (!!response) {
          // console.log('using fetch cache for:', e.request.url)
          return response
        }
        const fetchRequest = e.request.clone()
        return fetch(fetchRequest).then(res => {
          const responseToCache = res.clone()
          caches.open(cacheStorageKey).then(function(cache) {
            cache.put(e.request, responseToCache)
          }).catch(err=>{
          })
          return res;
        }).catch(err=>{
        })
      })
    )
  }
})

self.addEventListener('activate', function(e) {
  // console.log('activate event')
  e.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
         return Promise.all(
           cacheNames.filter(function(cacheName) {
             return cacheName !== cacheStorageKey;
           }).map(function(cacheName) {
             return caches.delete(cacheName);
           })
         );
      })
  )
})

self.addEventListener('redundent', function(e) {
  console.log('redundent event')   
})