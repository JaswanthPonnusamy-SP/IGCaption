
const CACHE_NAME = 'my-cache-v2';

const ASSETS_TO_CACHE = [
    '/IGCaption/',
    '/IGCaption/index.html',
    'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,700,900',
    'https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2',
    'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.1/TweenMax.min.js',
  '/IGCaption/igcs/js/main-js.js',
    '/IGCaption/igcs/css/cssanimation.css',
  '/IGCaption/igcs/css/main.css',
    '/IGCaption/igcs/images/Like.png',
    '/IGCaption/igcs/images/heart.png',
    '/IGCaption/igcs/images/angry.png',
    '/IGCaption/igcs/images/Haha_face.png',
    '/IGCaption/igcs/images/Sad_face.png',
    '/IGCaption/igcs/images/Wow_face.png',
    '/IGCaption/igcs/images/rect-500.svg',
    '/IGCaption/igcs/images/hand.svg',
    '/IGCaption/igcs/mp4/final.mp4'
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
