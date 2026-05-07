# Mobile Hero Image LCP Optimization

**Date**: 2026-05-07
**Goal**: Improve LCP score on mobile by serving appropriately sized hero images

---

## Problem

The hero section uses a single 6.9MB PNG (2528×1686, landscape) as its background image. On mobile, the section is portrait-oriented (`calc(100vh - 4rem)`, roughly 1:2 ratio), so `object-cover` crops most of the landscape image — wasting bandwidth on pixels that are never shown.

Although Vercel's image optimization (via Next.js `<Image>`) automatically converts to WebP and resizes on demand, the 6.9MB source still means:
- Slow first-request optimization per breakpoint
- No control over mobile-specific framing

---

## Image Assets

Two pre-converted WebP files placed in `public/root-page/`:

| File | Dimensions | Target |
|------|-----------|--------|
| `hero-desktop.webp` | 1920px wide | Tablets and up (≥768px) |
| `hero-mobile.webp` | 828×1472px (9:16) | Mobile (<768px), covers 2x DPR |

Both files are manually prepared and committed to the repo. No runtime conversion needed.

---

## Component: HeroSection

Replace Next.js `<Image>` with a native `<picture>` + `<img>` element.

**Rationale**: Next.js `<Image>` does not support `<picture>` with `<source media>` for art direction. Native `<picture>` is the standard HTML solution for serving different image sources per breakpoint.

**Layout**: Replicate the current `fill` + `object-cover` behavior with `absolute inset-0 w-full h-full object-cover`.

**Priority**: Add `fetchPriority="high"` on `<img>` to signal the browser this is the LCP element.

```tsx
<picture>
  <source media="(max-width: 767px)" srcSet="/root-page/hero-mobile.webp" />
  <img
    src="/root-page/hero-desktop.webp"
    alt="Handcrafted Korean ceramic vessels on a wooden surface"
    fetchPriority="high"
    className="absolute inset-0 w-full h-full object-cover"
  />
</picture>
```

---

## Preload Hints

Since `<Image priority>` is removed, its automatic preload behavior must be replicated manually. Next.js 16 (React 19) uses `ReactDOM.preload()` for resource hints — the metadata API does not support `<link rel="preload">` directly.

Call `ReactDOM.preload` inside `HeroSection` (Server Component). React 19 supports resource preloading from both server and client components.

```tsx
import ReactDOM from 'react-dom'

// inside HeroSection, before return:
ReactDOM.preload('/root-page/hero-mobile.webp', {
  as: 'image',
  media: '(max-width: 767px)',
  fetchPriority: 'high',
})
ReactDOM.preload('/root-page/hero-desktop.webp', {
  as: 'image',
  media: '(min-width: 768px)',
  fetchPriority: 'high',
})
```

The media query breakpoint (767px / 768px) must match the `<source media>` in the component exactly.

---

## Success Criteria

- Mobile LCP image request is for `hero-mobile.webp` (~80–150KB), not `hero-desktop.webp`
- Desktop LCP image request is for `hero-desktop.webp`
- Preload link appears in the HTML `<head>` for the correct breakpoint
- Visual appearance of the hero section is unchanged on both mobile and desktop
