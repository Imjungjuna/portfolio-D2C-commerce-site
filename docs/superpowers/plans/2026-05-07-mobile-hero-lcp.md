# Mobile Hero Image LCP Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js `<Image>` in HeroSection with a native `<picture>` element that serves `hero-mobile.webp` on mobile and `hero-desktop.webp` on desktop, with matching preload hints.

**Architecture:** Single file change in `components/home/HeroSection.tsx`. Remove Next.js `<Image>` (with its automatic-but-uncontrollable responsive behavior), replace with `<picture>` + `<img>` for explicit art direction. Add `ReactDOM.preload` calls in the same component so the browser receives `<link rel="preload">` hints in the SSR'd `<head>` before it parses the image markup.

**Tech Stack:** Next.js 16 (App Router), React 19 (`ReactDOM.preload` for resource hints), Tailwind CSS

---

## File Map

| Action | File |
|--------|------|
| Modify | `components/home/HeroSection.tsx` |

Image assets are already in place:
- `public/root-page/hero-mobile.webp` (25KB, 828×1472, 9:16)
- `public/root-page/hero-desktop.webp` (74KB, 1920px wide)

---

### Task 1: Update HeroSection.tsx

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: Replace the component contents**

Open `components/home/HeroSection.tsx` and replace the entire file with:

```tsx
import ReactDOM from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  ReactDOM.preload("/root-page/hero-mobile.webp", {
    as: "image",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });
  ReactDOM.preload("/root-page/hero-desktop.webp", {
    as: "image",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-150 flex items-end">
      <picture>
        <source media="(max-width: 767px)" srcSet="/root-page/hero-mobile.webp" />
        <img
          src="/root-page/hero-desktop.webp"
          alt="Handcrafted Korean ceramic vessels on a wooden surface"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 md:pb-20">
        <h1
          className={`font-heading break-keep font-light tracking-tight leading-tight text-3xl text-white max-w-2xl ${
            locale === "ko" ? "md:text-5xl whitespace-pre-line" : "md:text-6xl"
          }`}
        >
          {t("title")}
        </h1>
        <p className="mt-4 text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
          {t("subtitle")}
        </p>
        <Link
          href="/shop"
          className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
```

Key changes from the original:
- Removed `import Image from "next/image"` → added `import ReactDOM from "react-dom"`
- `ReactDOM.preload` calls at the top of the function body emit `<link rel="preload">` tags during SSR
- `<Image fill priority>` replaced with `<picture><source/><img/></picture>`
- `<img>` gets `fetchPriority="high"` (React 19 camelCase prop) and `absolute inset-0 w-full h-full object-cover` to replicate `fill` + `object-cover` behavior
- `<picture>` is an inline element with no dimensions, so it doesn't affect layout — the `<img>` inside positions itself relative to the `<section className="relative">`

- [ ] **Step 2: Run the dev server and verify visually on desktop**

```bash
pnpm dev
```

Open `http://localhost:3000`. The hero image should look identical to before. No layout shift, no broken image.

- [ ] **Step 3: Verify mobile image loads on mobile viewport**

In Chrome DevTools:
1. Open Network tab → filter by `Img`
2. Toggle device toolbar to **iPhone 14** (390px wide)
3. Hard-refresh (Cmd+Shift+R)
4. Confirm the request is for `hero-mobile.webp`, NOT `hero-desktop.webp` or `hero-image.png`

- [ ] **Step 4: Verify preload in page source**

In Chrome DevTools → Elements → `<head>`:
- On mobile viewport: should see `<link rel="preload" as="image" href="/root-page/hero-mobile.webp" media="(max-width: 767px)">`
- On desktop: should see the desktop preload link

If the preload tags are missing, `ReactDOM.preload` isn't emitting in this Next.js version. Fallback: add preload via a `PreloadHeroImages` client component (see Fallback below).

- [ ] **Step 5: Commit**

```bash
git add components/home/HeroSection.tsx
git commit -m "feat: serve responsive hero images via picture element for LCP improvement"
```

---

## Fallback: If ReactDOM.preload doesn't emit in SSR

If Step 4 shows no preload tags, create a small client component to emit them:

**Create `components/home/PreloadHeroImages.tsx`:**

```tsx
"use client"

import ReactDOM from "react-dom"

export default function PreloadHeroImages() {
  ReactDOM.preload("/root-page/hero-mobile.webp", {
    as: "image",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  })
  ReactDOM.preload("/root-page/hero-desktop.webp", {
    as: "image",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  })
  return null
}
```

**Add to `HeroSection.tsx` return:**

```tsx
<>
  <PreloadHeroImages />
  <section className="relative h-[calc(100vh-4rem)] min-h-150 flex items-end">
    {/* ... rest unchanged ... */}
  </section>
</>
```

Remove the `ReactDOM.preload` calls from the top of `HeroSection` when using this approach.
