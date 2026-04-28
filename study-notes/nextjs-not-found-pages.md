# Next.js 404 페이지: not-found.js vs global-not-found.js

> 이 노트는 yundoceramics 프로젝트에서 404 페이지를 구현하면서 배운 내용을 정리한 것입니다.

---

## 핵심 요약

Next.js App Router에는 404를 처리하는 파일이 두 가지입니다.

| 파일 | 역할 | html/body 필요 여부 |
|---|---|---|
| `not-found.tsx` | 라우트 세그먼트 안에서 `notFound()` 호출 시 | 직접 제공 불필요 (레이아웃이 감쌈) |
| `global-not-found.tsx` | 앱 전역, 레이아웃 체인을 완전히 우회 | **직접 제공 필수** |

---

## 1. `not-found.tsx` — 일반적인 경우

### 동작 방식

`notFound()` 함수가 던져지면, Next.js는 해당 세그먼트에서 가장 가까운 `not-found.tsx`를 찾아 레이아웃 안에서 렌더링합니다.

```
app/layout.tsx          ← <html><body> 있음
  └─ app/blog/layout.tsx
       └─ app/blog/not-found.tsx  ← layout이 감쌈
```

이 구조에서 `app/blog/not-found.tsx`는 `app/blog/layout.tsx` 안에서 렌더링되므로 따로 `<html>/<body>`를 쓸 필요가 없습니다.

```tsx
// app/blog/not-found.tsx — 그냥 JSX만 반환
export default function NotFound() {
  return <div>게시글을 찾을 수 없습니다.</div>;
}
```

### 주의: 레이아웃 자체에서 notFound()를 호출할 때

```tsx
// app/[locale]/layout.tsx
if (!routing.locales.includes(locale)) {
  notFound(); // ← 레이아웃이 직접 던짐
}
```

이 경우 `[locale]/layout.tsx`는 실행을 중단했으므로 **자기 자신이 not-found를 감쌀 수 없습니다.**
Not-found는 **부모 레이아웃**의 컨텍스트에서 렌더링됩니다.

---

## 2. i18n 프로젝트에서의 문제

### 이 프로젝트의 레이아웃 구조

```
app/layout.tsx          → return children  ← html/body 없음!
  └─ app/[locale]/layout.tsx  → <html lang={locale}><body>...
       └─ 페이지들
```

이 패턴은 i18n 프로젝트의 표준입니다. `[locale]/layout.tsx`가 `lang` 속성과 폰트를 locale에 맞게 설정해야 하기 때문입니다.

### 왜 `app/layout.tsx`가 `return children`인가?

`<html>` 태그는 한 문서에 하나만 있어야 합니다. `app/layout.tsx`에도 `<html><body>`를 넣고 `app/[locale]/layout.tsx`에도 넣으면 **중첩 html 태그** 문제가 생깁니다. 그래서 `app/layout.tsx`는 그냥 통과시키고 `[locale]/layout.tsx`가 html/body를 담당합니다.

### 문제 발생 원인

`app/[locale]/not-found.tsx`를 만들었을 때 Next.js는 이렇게 검사합니다:

```
app/layout.tsx          → return children  ← ❌ html/body 없음
  └─ app/[locale]/not-found.tsx 렌더링 시도
       → "Missing html and body tags in the root layout" 에러
```

정상 페이지는 `[locale]/layout.tsx`를 항상 거치므로 문제가 없지만, not-found는 레이아웃이 직접 던질 때나 매칭되지 않는 URL일 때 `[locale]/layout.tsx`를 우회할 수 있습니다.

### Next.js 문서가 명시한 케이스

공식 문서(`node_modules/next/dist/docs/...`)는 다음 두 경우에 `global-not-found.js`를 쓰라고 합니다:

> 1. 앱에 여러 개의 루트 레이아웃이 있는 경우
> 2. **루트 레이아웃이 최상위 동적 세그먼트로 정의된 경우 (예: `app/[country]/layout.tsx`)**

이 프로젝트가 정확히 두 번째 케이스입니다.

---

## 3. `global-not-found.tsx` — 해결책

### 설정

```ts
// next.config.ts
const nextConfig = {
  experimental: {
    globalNotFound: true,
  },
  // ...
};
```

### 파일 위치

```
app/global-not-found.tsx  ← app/ 루트에 위치
```

### 특징

레이아웃 체인을 **완전히 우회**합니다. 즉:
- `app/layout.tsx`를 타지 않음
- `app/[locale]/layout.tsx`를 타지 않음
- NextIntlClientProvider가 없음
- Next.js Router context가 없음

그래서 **스스로 완전한 HTML 문서를 반환**해야 하며, 필요한 것들을 직접 import해야 합니다.

```tsx
// app/global-not-found.tsx
import "./globals.css";              // ← 직접 import
import { Cormorant_Garamond, Inter } from "next/font/google";  // ← 직접 import
import type { Metadata } from "next";

const cormorant = Cormorant_Garamond({ ... });
const inter = Inter({ ... });

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* 내용 */}
      </body>
    </html>
  );
}
```

---

## 4. `global-not-found.tsx` 안에서 쓸 수 없는 것들

### ❌ `Link` from `next/link` (또는 `@/i18n/navigation`)

```tsx
// ❌ 안 됨 — Router context 없음
import Link from "next/link";

<Link href="/">홈으로</Link>
// URL은 바뀌지만 화면이 업데이트되지 않음
```

**이유**: `Link`는 client-side navigation을 시도하는데, Next.js Router context 없이는 URL만 바뀌고 페이지 렌더링이 트리거되지 않습니다.

**해결**: 일반 `<a>` 태그 사용 → full page reload → 미들웨어 → locale 감지 → 정상 라우팅

```tsx
// ✅ 됨
<a href="/">홈으로</a>
```

### ❌ `useTranslations` (next-intl)

```tsx
// ❌ 안 됨 — NextIntlClientProvider 없음
const t = useTranslations("notFound");
```

**해결**: 하드코딩 또는 `useEffect`로 `window.location.pathname`을 읽어 언어 감지 후 객체에서 텍스트를 직접 가져옴

```tsx
const strings = {
  en: { heading: "Page not found", cta: "Return home" },
  ko: { heading: "페이지를 찾을 수 없습니다", cta: "홈으로 돌아가기" },
};

// useEffect로 경로 확인 후 locale 판단
useEffect(() => {
  const path = window.location.pathname;
  setLocale(path.startsWith("/ko") ? "ko" : "en");
}, []);
```

### ❌ `useRouter`, `usePathname` 등 Next.js hooks

같은 이유. Router context가 없습니다.

---

## 5. 정리: 언제 뭘 쓰나

```
루트 레이아웃(app/layout.tsx)에 <html><body>가 있나?
  ├─ YES → not-found.tsx 사용 가능 (세그먼트 안에)
  └─ NO (i18n 동적 세그먼트 패턴) → global-not-found.tsx 사용
```

---

## 관련 파일 (이 프로젝트)

- `app/layout.tsx` — `return children` (html/body 없음)
- `app/[locale]/layout.tsx` — html/body 제공, next-intl Provider
- `app/global-not-found.tsx` — 독립 404 페이지
- `next.config.ts` — `experimental.globalNotFound: true`
