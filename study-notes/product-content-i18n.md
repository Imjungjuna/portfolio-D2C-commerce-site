# 상품 콘텐츠 다국어 처리 (Product Content i18n)

> 이 노트는 yundoceramics 프로젝트에서 상품 이름/설명을 locale별로 다르게 표시하기 위해 적용한 패턴을 정리한 것입니다.

---

## 문제

`lib/data/products.ts`의 상품 데이터는 영어로 하드코딩되어 있습니다.

```ts
{
  slug: "moon-jar-bowl",
  name: "Moon Jar Bowl",
  description: "Inspired by the iconic Joseon-era moon jar...",
  // ...
}
```

`/ko/shop/moon-jar-bowl`에 접속해도 영어 설명이 그대로 노출됩니다.

---

## 왜 Product 데이터 자체에 번역을 넣지 않는가?

```ts
// ❌ 안티패턴
{
  slug: "moon-jar-bowl",
  name: { en: "Moon Jar Bowl", ko: "달항아리 볼" },
  description: { en: "...", ko: "..." },
}
```

- 컴포넌트에서 항상 `product.name[locale]` 형태로 접근해야 함
- TypeScript 타입이 복잡해짐
- 번역 파일(`messages/`)과 이원화됨 — 관리 포인트가 두 곳

---

## 해결: messages 파일에 slug 기반 키 추가

### messages/en.json

```json
{
  "products": {
    "moon-jar-bowl": {
      "name": "Moon Jar Bowl",
      "description": "Inspired by the iconic Joseon-era moon jar..."
    },
    "celadon-rice-bowl": {
      "name": "Celadon Rice Bowl",
      "description": "A modern take on traditional celadon ware..."
    }
  }
}
```

### messages/ko.json

```json
{
  "products": {
    "moon-jar-bowl": {
      "name": "달항아리 볼",
      "description": "조선 시대의 달항아리에서 영감을 받은..."
    },
    "celadon-rice-bowl": {
      "name": "청자 밥그릇",
      "description": "새겨진 홈 사이로 색이 깊어지는..."
    }
  }
}
```

### 키 구조

```
products
  └─ {slug}
       ├─ name
       └─ description
```

`slug`는 하이픈이 포함된 문자열이지만, JSON 오브젝트 키로 사용 가능합니다.
next-intl은 `.`으로 중첩 키를 표현하므로 `"moon-jar-bowl.name"` 형태로 접근합니다.

---

## 서버 컴포넌트에서 사용

```tsx
// app/[locale]/(shop)/shop/[slug]/page.tsx
const tProducts = await getTranslations("products");

const productName = tProducts(`${product.slug}.name`);
const productDescription = tProducts(`${product.slug}.description`);
```

`getTranslations`는 서버 컴포넌트 전용 (`next-intl/server`에서 import).

---

## 클라이언트 컴포넌트에서 사용

```tsx
// components/product/ProductCard.tsx
"use client";

import { useTranslations } from "next-intl";

const tProducts = useTranslations("products");

// 동적 키 접근
<h3>{tProducts(`${product.slug}.name`)}</h3>
```

`useTranslations`는 클라이언트 컴포넌트 전용.
`NextIntlClientProvider`가 상위에서 `messages`를 제공하고 있어야 동작합니다.

---

## 이 패턴이 작동하는 이유

`app/[locale]/layout.tsx`에서:

```tsx
const messages = await getMessages();

return (
  <NextIntlClientProvider messages={messages}>
    {children}
  </NextIntlClientProvider>
);
```

`getMessages()`가 현재 locale의 전체 메시지 파일(en.json 또는 ko.json)을 불러와 Provider로 주입합니다. 클라이언트 컴포넌트는 이 Provider에서 메시지를 꺼내 씁니다.

---

## 동적 키 접근 주의사항

```tsx
tProducts(`${product.slug}.name`)
```

이렇게 동적으로 키를 구성할 때, **TypeScript가 키의 유효성을 컴파일 타임에 체크하지 못합니다.**
존재하지 않는 slug가 들어오면 런타임에 빈 문자열 또는 에러가 발생할 수 있습니다.

안전하게 처리하려면:

```tsx
// fallback으로 원래 영어 텍스트 사용
const productName = tProducts.has(`${product.slug}.name`)
  ? tProducts(`${product.slug}.name`)
  : product.name;
```

하지만 slug가 `products.ts`와 `messages/*.json`에서 항상 동기화되어 있다면 이 처리는 생략 가능합니다.

---

## 관련 파일 (이 프로젝트)

- `lib/data/products.ts` — slug, 가격, 이미지 등 비언어 데이터만 관리
- `messages/en.json` → `products` 섹션
- `messages/ko.json` → `products` 섹션
- `components/product/ProductCard.tsx` — `useTranslations("products")`
- `app/[locale]/(shop)/shop/[slug]/page.tsx` — `getTranslations("products")`
