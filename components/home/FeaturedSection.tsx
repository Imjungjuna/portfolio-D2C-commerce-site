"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedSection({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("home");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-light">
            {t("featured")}
          </h2>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors border-b border-border pb-1"
          >
            {t("shopAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
