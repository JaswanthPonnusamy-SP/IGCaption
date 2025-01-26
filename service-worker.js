
const CACHE_NAME = 'my-cache-v2';

const ASSETS_TO_CACHE = [
    '/IGCaption/',
    '/IGCaption/index.html',
    'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,700,900',
    'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
  '/IGCaption/igcs/js/main-js.js',
    '/IGCaption/igcs/css/cssanimation.css',
  '/IGCaption/igcs/css/main.css'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
        })
    );
});
