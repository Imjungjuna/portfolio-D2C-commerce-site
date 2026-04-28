"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "@/lib/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedSection({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("home");
  const [itemsPerView, setItemsPerView] = useState(4);
  const [paused, setPaused] = useState(false);

  // Triple the list so there's always room in both directions
  const allItems = useMemo(
    () => [...products, ...products, ...products],
    [products]
  );

  // Start in the middle set
  const [currentIndex, setCurrentIndex] = useState(products.length);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const update = () =>
      setItemsPerView(window.innerWidth < 768 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const jumpTo = useCallback((index: number) => {
    setAnimated(false);
    setCurrentIndex(index);
    // re-enable animation on next frame
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true))
    );
  }, []);

  const next = useCallback(() => {
    setAnimated(true);
    setCurrentIndex((i) => {
      const next = i + 1;
      // if we've fully passed the last set, schedule a silent jump back to middle
      if (next >= products.length * 2) {
        setTimeout(() => jumpTo(next - products.length), 500);
      }
      return next;
    });
  }, [products.length, jumpTo]);

  const prev = useCallback(() => {
    setAnimated(true);
    setCurrentIndex((i) => {
      const prev = i - 1;
      // if we've gone into the first set, schedule a silent jump forward to middle
      if (prev < products.length) {
        setTimeout(() => jumpTo(prev + products.length), 500);
      }
      return prev;
    });
  }, [products.length, jumpTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, next]);

  const cardWidth = 100 / itemsPerView;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-20">
          <h2 className="font-heading text-2xl md:text-5xl font-light">
            {t("featured")}
          </h2>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors border-b border-border pb-1"
          >
            {t("shopAll")}
          </Link>
        </div>

        <div
          className="relative px-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-2/5 -translate-y-1/2 z-10 text-ink-soft text-2xl leading-none"
          >
            ‹
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}%)`,
                transition: animated
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
            >
              {allItems.map((product, i) => (
                <div
                  key={`${product.slug}-${i}`}
                  className="shrink-0 px-3"
                  style={{ width: `${cardWidth}%` }}
                >
                  <ProductCard product={product} overlayText={t("learnMore")} />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-2/5 -translate-y-1/2 z-10 text-ink-soft text-2xl leading-none"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
