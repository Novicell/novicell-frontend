'use strict';

/*
  #Note: Do not move this to your /js folder. For a service worker to work on a whole site, it has to be in the site root.
*/

var CACHE_NAME = 'novicell-frontend-cache';

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log("installing");

    //What urls should be cached?
    //Manifest start_url is required to be cached, else the PWA doesnt pass audit
    var urlsToCache = [
      '/',
      '/?utm_source=homescreen',
      'index.html',
      '/dist/css/master.min.css',
      '/dist/scripts/master.min.js',
      'dist/scripts/vendor.min.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            //return cache.addAll(urlsToCache);
          })
      );
    });
}); 



self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });