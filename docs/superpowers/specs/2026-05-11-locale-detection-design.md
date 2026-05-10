# Locale Detection Design

**Date:** 2026-05-11
**Status:** Approved

## Goal

브라우저 언어를 감지해서 첫 방문 시 적절한 로케일로 자동 리다이렉트하고, 사용자의 수동 전환 선택을 1년간 쿠키에 유지한다.

## Context

- Next.js 16.2.4 (Middleware → Proxy로 명칭 변경, 파일명 `proxy.ts`)
- next-intl 4.9.1
- 지원 로케일: `en`, `ko` / defaultLocale: `en`
- `LocaleSwitcher` 컴포넌트가 헤더에 이미 존재하며 next-intl `useRouter`를 사용 중

## Approach

next-intl의 `createMiddleware`를 `proxy.ts`에서 사용. 브라우저 언어 감지, 쿠키 관리 모두 next-intl 내장 기능에 위임.

## Changes

### 1. `proxy.ts` (신규)

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', ]
};
```

- API 라우트, Next.js 내부 경로, 정적 파일 제외
- `createMiddleware`가 Accept-Language 헤더 읽기 및 NEXT_LOCALE 쿠키 설정/읽기를 처리

### 2. `i18n/routing.ts` (수정)

```ts
export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365  // 1년
  }
});
```

- `maxAge` 미설정 시 세션 쿠키(브라우저 닫으면 사라짐)
- 1년 설정으로 재방문 시 사용자 선택 유지

### 3. `LocaleSwitcher.tsx` (변경 없음)

이미 `router.replace(pathname, { locale: next })` 방식 사용 중. 미들웨어 추가 후 자동으로 쿠키 업데이트됨.

## Locale Resolution Priority

1. URL pathname prefix (`/ko/...`)
2. `NEXT_LOCALE` 쿠키 (사용자 선택 기억)
3. `Accept-Language` 헤더 (브라우저 언어)
4. `defaultLocale` fallback (`en`)

## Behavior Flow

```
첫 방문 (쿠키 없음)
  → proxy.ts가 Accept-Language 헤더 읽음
  → 한국어 브라우저 → /ko/... 리다이렉트 + 쿠키 설정
  → 영어 브라우저  → /en/... 리다이렉트 + 쿠키 설정

재방문 (쿠키 있음)
  → 쿠키 우선 적용 (브라우저 언어 무시)

수동 전환 (KO/EN 버튼)
  → router.replace로 로케일 변경
  → 미들웨어가 새 NEXT_LOCALE 쿠키 덮어씀
  → 이후 방문도 전환된 언어 유지
```
