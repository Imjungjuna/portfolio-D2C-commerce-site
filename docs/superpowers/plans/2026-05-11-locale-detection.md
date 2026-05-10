# Locale Detection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 브라우저 언어를 감지해 첫 방문 시 `/en` 또는 `/ko`로 자동 리다이렉트하고, 사용자의 로케일 선택을 NEXT_LOCALE 쿠키에 1년간 유지한다.

**Architecture:** `proxy.ts`(Next.js 16의 미들웨어 파일)에서 next-intl의 `createMiddleware`를 사용한다. 브라우저 Accept-Language 헤더 읽기, NEXT_LOCALE 쿠키 설정/읽기는 next-intl 내장 기능에 전적으로 위임한다. `LocaleSwitcher` 컴포넌트는 이미 next-intl `useRouter`를 사용 중이므로 변경 없이 쿠키 갱신이 자동으로 동작한다.

**Tech Stack:** Next.js 16.2.4, next-intl 4.9.1

---

## File Map

| 파일 | 작업 |
|---|---|
| `proxy.ts` | 신규 생성 — next-intl 미들웨어 등록 |
| `i18n/routing.ts` | 수정 — `localeCookie.maxAge` 추가 |

---

### Task 1: `i18n/routing.ts`에 쿠키 만료 설정 추가

**Files:**
- Modify: `i18n/routing.ts`

- [ ] **Step 1: 현재 파일 내용 확인**

```bash
cat i18n/routing.ts
```

예상 출력:
```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
});
```

- [ ] **Step 2: `localeCookie.maxAge` 추가**

`i18n/routing.ts`를 아래와 같이 수정:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365, // 1년
  },
});
```

- [ ] **Step 3: 커밋**

```bash
git add i18n/routing.ts
git commit -m "feat(i18n): persist locale cookie for 1 year"
```

---

### Task 2: `proxy.ts` 생성

**Files:**
- Create: `proxy.ts`

- [ ] **Step 1: Next.js proxy 파일 컨벤션 확인**

```bash
cat node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
```

파일명은 `proxy.ts`, export명은 `proxy` (named) 또는 default export 모두 가능.

- [ ] **Step 2: `proxy.ts` 생성**

프로젝트 루트에 `proxy.ts` 생성:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", ],
};
```

matcher 패턴 설명:
- `api` — API 라우트 제외
- `_next` — Next.js 내부 경로 제외
- `_vercel` — Vercel 내부 경로 제외
- `.*\\..*` — 확장자가 있는 정적 파일(`.css`, `.png` 등) 제외

- [ ] **Step 3: 개발 서버 실행 후 동작 확인**

```bash
npm run dev
```

브라우저에서 아래 순서로 검증:

1. **첫 방문 감지 테스트**
   - 시크릿 창에서 `http://localhost:3000` 접속
   - 브라우저 언어가 한국어(`ko`)면 → `http://localhost:3000/ko`로 리다이렉트되는지 확인
   - 브라우저 언어가 영어(`en`)면 → `http://localhost:3000/en`으로 리다이렉트되는지 확인

2. **쿠키 설정 확인**
   - DevTools → Application → Cookies → `localhost`
   - `NEXT_LOCALE` 쿠키가 생성됐는지, Expires가 약 1년 뒤인지 확인

3. **쿠키 우선 적용 테스트**
   - `NEXT_LOCALE` 쿠키 값을 `en`으로 수동 변경
   - `http://localhost:3000` 재접속 → 브라우저 언어가 한국어여도 `/en`으로 이동하는지 확인

4. **수동 전환 후 쿠키 갱신 테스트**
   - 헤더의 KO/EN 버튼 클릭
   - DevTools에서 `NEXT_LOCALE` 쿠키 값이 바뀌는지 확인

- [ ] **Step 4: 커밋**

```bash
git add proxy.ts
git commit -m "feat: add locale detection proxy"
```
