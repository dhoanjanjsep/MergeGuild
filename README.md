# MergeGuild Unity WebGL Game

Unity로 개발된 WebGL 게임을 Vercel에 배포하기 위한 프로젝트입니다.

## 🚀 Vercel 배포 방법

### 1. GitHub/GitLab에 코드 푸시
```bash
git add .
git commit -m "Unity WebGL 게임 Vercel 배포 준비"
git push origin main
```

### 2. Vercel 대시보드에서 배포
1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub/GitLab 저장소 연결
4. 프로젝트 설정 확인 후 "Deploy" 클릭

### 3. Vercel CLI로 배포 (선택사항)
```bash
npm i -g vercel
vercel login
vercel
```

## 📁 프로젝트 구조

```
├── Build/                    # Unity 빌드 파일
│   ├── *.framework.js.br    # Unity 프레임워크
│   ├── *.loader.js          # Unity 로더
│   ├── *.wasm.br            # WebAssembly 파일
│   └── *.data.br            # 게임 데이터
├── StreamingAssets/          # 스트리밍 에셋
├── TemplateData/             # UI 템플릿
├── index.html               # 메인 HTML
├── ServiceWorker.js         # PWA 서비스 워커
├── manifest.webmanifest     # PWA 매니페스트
├── vercel.json             # Vercel 배포 설정
└── _redirects              # 리다이렉트 규칙
```

## ⚙️ 주요 설정

### vercel.json
- 정적 파일 서빙
- Unity WebGL 파일 최적화
- 캐싱 전략
- 보안 헤더 설정

### Service Worker
- 오프라인 지원
- 리소스 캐싱
- 에러 처리

### PWA 지원
- 앱 설치 가능
- 오프라인 동작
- 모바일 최적화

## 🔧 문제 해결

### 게임이 로드되지 않는 경우
1. 브라우저 콘솔 확인
2. 네트워크 탭에서 파일 로딩 상태 확인
3. Vercel 로그 확인

### WASM 파일 로딩 실패
1. `vercel.json`의 MIME 타입 설정 확인
2. CORS 설정 확인
3. 파일 경로 확인

## 🌐 지원 브라우저

- Chrome 67+
- Firefox 60+
- Safari 11+
- Edge 79+

## 📱 모바일 지원

- 반응형 디자인
- 터치 제스처 지원
- PWA 설치 지원

## 📄 라이선스

이 프로젝트는 MergeGuild 팀의 소유입니다.

---

**배포 완료 후**: `https://your-project.vercel.app`에서 게임을 확인할 수 있습니다.
