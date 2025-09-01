const cacheName = "MergeGuild-Unity-WebGL-v1.0";
const contentToCache = [
    "Build/f5b63b7c68733ee98df217b2cfcc2550.loader.js",
    "Build/79f1647bdbc9ea3cc3418a3b86614b0c.framework.js.br",
    "Build/dfcd9f1a23137191c55a9d735cf19f32.data.br",
    "Build/a7624d6a54ff9dbef135031d6bc9463a.wasm.br",
    "TemplateData/style.css",
    "TemplateData/unity-logo-dark.png",
    "TemplateData/progress-bar-empty-dark.png",
    "TemplateData/progress-bar-full-dark.png"
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      try {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
        console.log('[Service Worker] All resources cached successfully');
      } catch (error) {
        console.error('[Service Worker] Failed to cache resources:', error);
      }
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      try {
        // 먼저 캐시에서 확인
        let response = await caches.match(e.request);
        if (response) {
          console.log(`[Service Worker] Serving from cache: ${e.request.url}`);
          return response;
        }

        // 캐시에 없으면 네트워크에서 가져오기
        console.log(`[Service Worker] Fetching from network: ${e.request.url}`);
        response = await fetch(e.request);
        
        // 성공적인 응답만 캐시에 저장
        if (response && response.status === 200 && response.type === 'basic') {
          const cache = await caches.open(cacheName);
          console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
          cache.put(e.request, response.clone());
        }
        
        return response;
      } catch (error) {
        console.error(`[Service Worker] Fetch failed for ${e.request.url}:`, error);
        
        // 오프라인 상태에서 기본 페이지 제공
        if (e.request.destination === 'document') {
          return caches.match('index.html');
        }
        
        throw error;
      }
    })());
});

self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');
    
    e.waitUntil((async function () {
      // 이전 캐시 정리
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== cacheName) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })());
});
