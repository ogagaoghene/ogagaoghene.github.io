let CACHE_NAME = 'static-cache';
let urlsToCache = [
    '.',
    'index.html',
    '../css/include.css',
    'https://free.currencyconverterapi.com/api/v5/currencies',
    '../js/util.js'
];

self.addEventListener('install', ( evt ) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then( ( cache ) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', ( evt ) => {
    console.log('Activate Event:', evt );
});

self.addEventListener('fetch', ( evt ) => {
    evt.respondWith(
        caches.match( evt.request )
        .then( (response) => {
            return response || fetch( evt.request );
        })
    );
});

function fetchAndCache() {
    return fetch( url )
    .then( function (response ) {
        return caches.open( CACHE_NAME )
        .then( function ( cache ){
             cache.put( url, response.clone() );
             return response;
        })
    }) 
}

