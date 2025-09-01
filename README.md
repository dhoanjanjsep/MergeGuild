# MergeGuild Unity WebGL Game

Unity WebGL로 개발된 MergeGuild 게임을 Vercel에 배포하기 위한 프로젝트입니다.

## 🚀 특징

- **Unity WebGL 게임**: 완전한 Unity 게임을 웹에서 실행
- **PWA 지원**: Progressive Web App으로 모바일에서도 앱처럼 사용 가능
- **오프라인 지원**: Service Worker를 통한 캐싱 및 오프라인 기능
- **Vercel 최적화**: Vercel 플랫폼에 최적화된 설정

## 📁 프로젝트 구조

```
├── Build/                    # Unity WebGL 빌드 파일
│   ├── *.framework.js.br    # Unity 프레임워크 (Brotli 압축)
│   ├── *.data.br            # 게임 데이터 (Brotli 압축)
│   ├── *.wasm.br            # WebAssembly 파일 (Brotli 압축)
│   └── *.loader.js          # Unity 로더 스크립트
├── TemplateData/             # UI 템플릿 및 스타일
├── StreamingAssets/          # 스트리밍 에셋
├── index.html               # 메인 HTML 파일
├── ServiceWorker.js         # PWA Service Worker
├── manifest.webmanifest     # PWA 매니페스트
├── vercel.json             # Vercel 배포 설정
└── package.json            # 프로젝트 설정
```

## 🛠️ 기술 스택

- **Unity WebGL**: 게임 엔진
- **HTML5/CSS3/JavaScript**: 웹 인터페이스
- **Service Worker**: 오프라인 지원 및 캐싱
- **PWA**: Progressive Web App 기능
- **Vercel**: 호스팅 및 배포

## 🚀 Vercel 배포

### 자동 배포 (GitHub 연동)

1. GitHub 저장소를 Vercel에 연결
2. 프로젝트 설정에서 다음 설정 확인:
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.` (루트 디렉토리)
   - **Install Command**: `npm install`

### 수동 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

## ⚙️ 환경 변수

현재 환경 변수 설정이 필요하지 않습니다.

## 🔧 로컬 개발

```bash
# 의존성 설치
npm install

# 로컬 서버 시작 (선택사항)
npm start
```

## 📱 PWA 기능

- **홈 화면 추가**: 모바일에서 앱처럼 설치 가능
- **오프라인 지원**: Service Worker를 통한 캐싱
- **푸시 알림**: 향후 구현 예정
- **백그라운드 동기화**: 향후 구현 예정

## 🌐 브라우저 지원

- **Chrome**: 67+ (권장)
- **Firefox**: 79+
- **Safari**: 11.1+
- **Edge**: 79+

## ⚠️ 주의사항

1. **SharedArrayBuffer**: Unity WebGL의 SharedArrayBuffer 사용을 위해 특별한 CORS 설정이 필요합니다.
2. **파일 크기**: Unity WebGL 파일들이 크므로 CDN 사용을 권장합니다.
3. **모바일 최적화**: 모바일 디바이스에서 최적의 성능을 위해 PWA 설치를 권장합니다.

## 🔍 문제 해결

### Unity 게임이 로드되지 않는 경우

1. 브라우저 콘솔에서 오류 메시지 확인
2. 네트워크 탭에서 파일 로딩 상태 확인
3. CORS 정책 확인 (Cross-Origin-Embedder-Policy)

### Service Worker 오류

1. 브라우저에서 Service Worker 지원 여부 확인
2. HTTPS 연결 확인 (로컬 개발 시 localhost 제외)
3. 브라우저 캐시 및 쿠키 삭제

## 📄 라이선스

MIT License

## 👥 팀

MergeGuild Team

## 🔗 링크

- **게임**: [https://mergeguild-game.vercel.app](https://mergeguild-game.vercel.app)
- **GitHub**: [https://github.com/mergeguild/unity-webgl-game](https://github.com/mergeguild/unity-webgl-game)
