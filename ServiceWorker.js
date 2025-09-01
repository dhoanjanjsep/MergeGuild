const cacheName = "MergeGuild-1.0";
const contentToCache = [
    "/",
    "/index.html",
    "/Build/f5b63b7c68733ee98df217b2cfcc2550.loader.js",
    "/Build/79f1647bdbc9ea3cc3418a3b86614b0c.framework.js.br",
    "/Build/a2695f08e995c006b2c50afa641dc839.data.br",
    "/Build/a7624d6a54ff9dbef135031d6bc9463a.wasm.br",
    "/TemplateData/style.css",
    "/TemplateData/favicon.ico",
    "/manifest.webmanifest"
];

// 압축 파일 확장자 확인
const isCompressedFile = (url) => {
    return url.endsWith('.br') || url.endsWith('.gz');
};

// 압축되지 않은 파일 URL 생성 (Vercel에서 자동으로 압축 처리)
const getUncompressedUrl = (url) => {
    if (url.endsWith('.br')) {
        return url.replace('.br', '');
    }
    return url;
};

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching app shell and content');
        
        // 압축되지 않은 파일들만 캐시 (Vercel이 자동으로 압축 처리)
        const uncompressedUrls = contentToCache.map(url => getUncompressedUrl(url));
        await cache.addAll(uncompressedUrls);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
        const request = e.request;
        const url = new URL(request.url);
        
        // 압축 파일 요청인 경우 압축되지 않은 버전으로 처리
        if (isCompressedFile(url.pathname)) {
            const uncompressedUrl = getUncompressedUrl(url.pathname);
            const uncompressedRequest = new Request(uncompressedUrl, request);
            
            let response = await caches.match(uncompressedRequest);
            if (response) {
                console.log(`[Service Worker] Serving cached: ${uncompressedUrl}`);
                return response;
            }
            
            // 네트워크에서 가져오기
            try {
                response = await fetch(uncompressedRequest);
                if (response.ok) {
                    const cache = await caches.open(cacheName);
                    cache.put(uncompressedRequest, response.clone());
                    console.log(`[Service Worker] Cached new resource: ${uncompressedUrl}`);
                }
                return response;
            } catch (error) {
                console.error(`[Service Worker] Fetch failed: ${uncompressedUrl}`, error);
                throw error;
            }
        }
        
        // 일반 파일 처리
        let response = await caches.match(request);
        if (response) {
            console.log(`[Service Worker] Serving cached: ${request.url}`);
            return response;
        }
        
        // 네트워크에서 가져오기
        try {
            response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(cacheName);
                cache.put(request, response.clone());
                console.log(`[Service Worker] Cached new resource: ${request.url}`);
            }
            return response;
        } catch (error) {
            console.error(`[Service Worker] Fetch failed: ${request.url}`, error);
            throw error;
        }
    })());
});

// 캐시 정리 (새로운 버전 배포 시)
self.addEventListener('activate', function (e) {
    e.waitUntil((async function () {
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
