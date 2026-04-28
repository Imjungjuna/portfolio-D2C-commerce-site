# 스크롤 구현 정리

이 프로젝트에서 사용한 스크롤 관련 구현 두 가지를 정리합니다.

---

## 1. CSS smooth scroll — 앵커 링크 (`#story`, `#craft` 등)

### 어디에 적용했나
`app/[locale]/layout.tsx` — `<html>` 태그

```tsx
<html className="... scroll-smooth">
```

### 원리
`scroll-smooth`는 Tailwind 유틸리티 클래스로, 아래 CSS 한 줄과 같습니다.

```css
html {
  scroll-behavior: smooth;
}
```

브라우저가 `#story` 같은 앵커 링크를 처리할 때, 기본값은 즉시 점프(jump)입니다.
`scroll-behavior: smooth`를 선언해두면 브라우저가 자동으로 부드럽게 스크롤합니다.
속도와 가속도는 브라우저가 알아서 처리 — 별도 JS 없음.

### 한계
- 속도 조절 불가 (브라우저 마음대로)
- 다른 페이지에서 `/about#story`로 진입할 때 (cross-page), 페이지 로드 직후 브라우저가 먼저 점프해버리는 현상이 생길 수 있음
  → 이걸 해결하기 위해 아래의 `ScrollToHash` 컴포넌트를 추가

---

## 2. ScrollToHash 컴포넌트 — cross-page 앵커 진입 처리

### 어디에 적용했나
`components/about/ScrollToHash.tsx` → about 페이지에 삽입

```tsx
"use client";
import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash; // 예: "#story"
    if (!hash) return;
    const el = document.querySelector(hash); // id="story" 인 DOM 요소 찾기
    if (el) {
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  }, []);

  return null; // UI 없음, 동작만 함
}
```

### 원리
React 컴포넌트가 마운트(`useEffect`)된 시점 = 페이지가 완전히 렌더링된 직후입니다.
그 시점에 URL의 hash(`#story`)를 읽고, 해당 id를 가진 DOM 요소를 찾아 부드럽게 스크롤합니다.

`setTimeout(..., 100)` — 100ms 딜레이를 준 이유:
페이지 로드 직후 이미지·폰트가 완전히 자리잡기 전에 스크롤하면 위치가 틀릴 수 있어서, 약간 기다렸다가 실행합니다.

`scrollIntoView({ behavior: "smooth", block: "start" })`:
- `behavior: "smooth"` → 부드럽게
- `block: "start"` → 요소의 위쪽이 화면 상단에 오도록

---

## 3. 커스텀 JS 스크롤 — 로고 클릭 시 맨 위로 (속도 제어)

### 어디에 적용했나
`components/layout/Header.tsx` — 로고 `<Link>`의 `onClick`

```tsx
const handleLogoClick = useCallback((e: React.MouseEvent) => {
  if (pathname !== "/") return; // 홈이 아니면 그냥 페이지 이동
  e.preventDefault();           // 기본 navigate 막기

  const start = window.scrollY; // 현재 스크롤 위치 (px)
  if (start === 0) return;       // 이미 맨 위면 아무것도 안 함

  const duration = 350;          // 애니메이션 시간 (ms)
  const startTime = performance.now(); // 시작 시각

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    //                         ↑ 0 → 1 사이의 진행도

    const ease = 1 - Math.pow(1 - progress, 3);
    //           ↑ ease-out cubic: 처음엔 빠르게, 끝에 부드럽게 감속

    window.scrollTo(0, start * (1 - ease));
    //               ↑ 현재 위치 = 시작점 × (1 - 진행도)
    //                 progress=0 이면 start 그대로, progress=1 이면 0

    if (progress < 1) requestAnimationFrame(step);
    //                 ↑ 아직 안 끝났으면 다음 프레임에 step 다시 호출
  }

  requestAnimationFrame(step); // 첫 프레임 시작
}, [pathname]);
```

### 원리: requestAnimationFrame (rAF)

브라우저는 보통 1초에 60번 화면을 다시 그립니다 (60fps = 약 16ms마다).
`requestAnimationFrame(콜백)`은 "다음 화면 갱신 때 이 함수를 실행해줘" 라는 뜻입니다.

```
rAF 호출 흐름:
step(t=0ms)   → scrollTo(현재위치)  → rAF(step)
step(t=16ms)  → scrollTo(조금 위)   → rAF(step)
step(t=32ms)  → scrollTo(더 위)     → rAF(step)
...
step(t=350ms) → scrollTo(0)         → 종료
```

매 프레임마다 `progress`(0→1)를 계산하고, 그에 맞춰 스크롤 위치를 업데이트합니다.
CSS smooth scroll과 달리 `duration`을 직접 지정할 수 있어서 속도를 조절할 수 있습니다.

### ease-out cubic 이란

`1 - (1 - progress)^3` 의 그래프:

```
속도
 |  ████
 | █    ██
 |        ██
 |           ███
 +──────────────→ 시간
  시작(빠름)  끝(느림)
```

처음에 빠르게 치고 나갔다가 끝에서 부드럽게 감속하는 느낌.
숫자 `3`을 키울수록 초반 가속이 더 강해집니다 (4, 5도 자주 씁니다).

---

## 요약 비교

| | CSS scroll-smooth | ScrollToHash | rAF 커스텀 |
|---|---|---|---|
| **코드량** | 한 줄 | 10줄 | 25줄 |
| **속도 제어** | ❌ 브라우저 기본값 | ❌ 브라우저 기본값 | ✅ ms 단위로 지정 |
| **용도** | 같은 페이지 앵커 클릭 | cross-page 앵커 진입 | 특정 동작에 커스텀 속도 필요할 때 |
