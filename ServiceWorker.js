const cacheName = "MergeGuild-Unity-WebGL-v1.0";
const contentToCache = [
    "/",
    "/index.html",
    "/Build/f5b63b7c68733ee98df217b2cfcc2550.loader.js",
    "/Build/79f1647bdbc9ea3cc3418a3b86614b0c.framework.js.br",
    "/Build/dfcd9f1a23137191c55a9d735cf19f32.data.br",
    "/Build/a7624d6a54ff9dbef135031d6bc9463a.wasm.br",
    "/TemplateData/style.css",
    "/TemplateData/unity-logo-dark.png",
    "/TemplateData/progress-bar-empty-dark.png",
    "/TemplateData/progress-bar-full-dark.png",
    "/manifest.webmanifest"
];

// Unity WebGL 파일 확장자들
const unityFileExtensions = ['.wasm', '.data', '.framework.js', '.loader.js', '.br'];

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
    // Unity WebGL 파일이나 앱 리소스인 경우에만 처리
    const isUnityFile = unityFileExtensions.some(ext => e.request.url.includes(ext));
    const isAppResource = e.request.url.includes(self.location.origin);
    
    if (!isAppResource) {
        return; // 외부 리소스는 그대로 네트워크 요청
    }

    e.respondWith((async function () {
      try {
        // Unity WebGL 파일은 항상 네트워크 우선, 실패시 캐시
        if (isUnityFile) {
          try {
            const networkResponse = await fetch(e.request);
            if (networkResponse.ok) {
              // 성공시 캐시 업데이트
              const cache = await caches.open(cacheName);
              cache.put(e.request, networkResponse.clone());
              return networkResponse;
            }
          } catch (networkError) {
            console.log(`[Service Worker] Network failed for ${e.request.url}, trying cache`);
          }
          
          // 네트워크 실패시 캐시에서 제공
          const cachedResponse = await caches.match(e.request);
          if (cachedResponse) {
            return cachedResponse;
          }
        }

        // 일반 리소스는 캐시 우선, 실패시 네트워크
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
          return caches.match('/index.html');
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
        cacheNames.map(function (oldCacheName) {
          if (oldCacheName !== cacheName) {
            console.log('[Service Worker] Deleting old cache:', oldCacheName);
            return caches.delete(oldCacheName);
          }
        })
      );
      
      // 클라이언트들에게 새로운 Service Worker 활성화 알림
      self.clients.claim();
    })());
});

// 메시지 처리 (Unity와의 통신)
self.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
