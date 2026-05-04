# Yundo Ceramics - 포트폴리오 정리

## 프로젝트 개요

한국 전통 도자기를 판매하는 이커머스 웹사이트. 한/영 다국어를 지원하고, 토스페이먼츠 결제까지 연동한 풀 프론트엔드 프로젝트.

---

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 16 |
| Language | TypeScript | 5 |
| UI | React | 19 |
| Styling | Tailwind CSS | 4 |
| Component | shadcn/ui (Base UI 기반) | - |
| i18n | next-intl | 4.9 |
| 상태관리 | Zustand (persist middleware) | 5 |
| 폼 | React Hook Form + Zod | 7 / 4 |
| 결제 | 토스페이먼츠 SDK | 2.7 |
| Font | Google Fonts (Cormorant Garamond, Inter, Noto Serif KR) | - |

---

## 주요 기능

### 1. 다국어 지원 (i18n)
`next-intl`을 사용해 `/en`, `/ko` 경로 기반 라우팅으로 한국어/영어를 지원한다. `messages/ko.json`, `messages/en.json`에 번역 키를 관리하고, 서버 컴포넌트에서는 `getTranslations`, 클라이언트에서는 `useTranslations` 훅으로 텍스트를 가져온다. 로케일 전환은 `LocaleSwitcher` 컴포넌트에서 `router.replace`로 현재 경로를 유지하면서 언어만 바꾸는 방식.

**왜 next-intl을 선택했는가:** App Router와 Server Component를 네이티브로 지원하는 라이브러리가 필요했다. `react-i18next`는 클라이언트 중심이라 서버 컴포넌트에서 번역을 가져오려면 우회가 필요했고, `next-intl`은 `[locale]` 동적 세그먼트 기반 라우팅을 공식 지원해서 선택했다.

### 2. 장바구니 (Zustand + persist)
Zustand로 장바구니 전역 상태를 관리한다. `persist` 미들웨어를 사용해 localStorage에 장바구니 데이터를 저장하므로 새로고침해도 유지된다. 수량 변경, 추가, 삭제, 전체 비우기, 총합 계산(KRW/USD 별도)까지 구현.

**왜 Zustand인가:** Context API는 Provider 중첩과 리렌더링 문제가 있었고, Redux는 이 규모에선 보일러플레이트가 과했다. Zustand는 `create` 한 줄로 스토어를 만들 수 있고, `persist` 미들웨어 하나면 localStorage 연동이 끝난다. 다만 SSR 환경에서 hydration mismatch 이슈를 만났고, `useEffect`로 마운트 후 상태를 동기화하는 방식으로 해결했다.

### 3. 결제 연동 (토스페이먼츠)
토스페이먼츠 SDK를 클라이언트에서 로드하고, 위젯 기반으로 결제 수단 선택 / 약관 동의 UI를 렌더링한다. 결제 승인은 Route Handler(`/api/payments/confirm`)에서 서버 사이드로 처리해 시크릿 키가 클라이언트에 노출되지 않도록 했다.

**왜 토스페이먼츠인가:** 한국 시장 타겟 이커머스에서 가장 문서가 잘 되어있고, 위젯 방식으로 결제 UI를 제공해서 커스텀 폼을 만들 필요가 없었다. 테스트 키로 실제 결제 플로우를 그대로 시뮬레이션할 수 있다는 점도 좋았다.

### 4. 상품 상세 페이지
동적 라우팅 `[slug]`로 상품별 페이지를 생성한다. 이미지 갤러리, 수량 조절, 장바구니 담기, 아코디언(상세 정보/배송/소재), 관련 상품 추천까지 구현. 가격은 로케일에 따라 원화/달러로 자동 전환.

### 5. 반응형 레이아웃 & 모바일 네비게이션
Header는 데스크톱에서 좌/우 네비게이션, 모바일에서 Sheet(사이드 드로어)로 전환된다. `@base-ui/react`의 Sheet 컴포넌트를 활용해 접근성(aria-label, SheetTitle sr-only)을 고려했다.

### 6. 홈페이지 섹션 구성
Hero / Featured Products / Story / Process / Press / Newsletter 총 6개 섹션으로 구성. 풀스크린 히어로 이미지에 그라데이션 오버레이, CTA 버튼 배치. 뉴스레터는 별도 API Route로 구독 처리.

---

## 프로젝트 구조

```
app/
  [locale]/
    layout.tsx          # i18n Provider, 폰트, Header/Footer
    (shop)/
      page.tsx          # 홈 (Hero, Featured, Story, Process, Press, Newsletter)
      shop/page.tsx     # 상품 목록
      shop/[slug]/      # 상품 상세
      cart/             # 장바구니
      checkout/         # 결제 (토스페이먼츠 위젯)
      about/            # 소개
    privacy/, terms/    # 정책 페이지
  api/
    payments/confirm/   # 토스 결제 승인 (서버)
    checkout/           # 체크아웃 엔드포인트
    newsletter/         # 뉴스레터 구독
components/
  home/       # 홈 섹션 컴포넌트 6개
  product/    # 상품 관련 (카드, 갤러리, 아코디언, 수량, 장바구니 버튼)
  cart/       # 장바구니 (목록, 행, 요약)
  checkout/   # 결제 위젯
  layout/     # Header, Footer, LocaleSwitcher, NewsletterForm
  ui/         # shadcn 기반 (accordion, button, input, sheet)
lib/
  stores/cart.ts    # Zustand 장바구니 스토어
  data/products.ts  # 상품 데이터 (정적)
i18n/               # next-intl 설정 (routing, request, navigation)
messages/           # ko.json, en.json 번역 파일
```

---

## 배운 점

### Next.js App Router의 서버/클라이언트 경계
`"use client"`를 어디에 붙이느냐가 설계의 핵심이었다. 상품 상세 페이지는 서버 컴포넌트로 데이터를 가져오고, 장바구니 버튼이나 이미지 갤러리처럼 인터랙션이 필요한 부분만 클라이언트 컴포넌트로 분리했다. 이 경계를 잘 나누면 번들 사이즈를 줄이면서 서버에서 번역과 데이터를 미리 처리할 수 있다.

### Zustand hydration 문제 해결
SSR 환경에서 서버 렌더링 HTML과 클라이언트 localStorage 값이 다르면 hydration mismatch가 발생한다. Header의 장바구니 카운트, CheckoutWidget의 아이템 목록 모두 `useEffect`로 마운트 후 `getState()`로 동기화하고, `subscribe`로 이후 변경을 추적하는 패턴을 적용했다. 이 패턴은 persist 미들웨어를 쓰는 모든 Zustand 스토어에 적용 가능한 범용 해결책이다.

### 다국어 + 가격 이중 처리
단순히 텍스트만 번역하는 게 아니라, 로케일에 따라 가격 통화(KRW/USD)도 전환해야 했다. 상품 데이터에 `priceKRW`와 `priceUSD`를 모두 넣고, `useLocale()` 결과에 따라 분기하는 방식을 썼다. 실무에서는 환율 API와 연동하겠지만, 정적 데이터 기반 프로젝트에서 다국어 가격 처리의 패턴을 익힐 수 있었다.

### 결제 플로우의 클라이언트/서버 역할 분리
결제 SDK는 클라이언트에서 위젯을 렌더링하지만, 최종 승인(confirm)은 반드시 서버에서 시크릿 키로 처리해야 한다. Route Handler를 통해 이 역할을 분리하면서, 프론트엔드 개발자가 결제 연동 시 보안적으로 어떤 부분을 서버에 맡겨야 하는지를 체감했다.

### 한글 폰트 최적화
Noto Serif KR은 용량이 크기 때문에 `preload: false`로 설정했다. `next/font`의 `display: "swap"` 옵션으로 FOUT를 허용하되 레이아웃 시프트를 최소화했다. CSS Variable 방식(`--font-heading`, `--font-body`)으로 폰트를 관리해서 Tailwind에서 `font-heading`, `font-body`로 간결하게 사용할 수 있게 했다.

---

## 한 줄 요약

> Next.js 16 App Router 기반으로 다국어(한/영) 도자기 이커머스를 구축하면서, 서버/클라이언트 컴포넌트 경계 설계, Zustand hydration 처리, 토스페이먼츠 결제 연동의 보안 구조를 실전으로 익힌 프로젝트.
