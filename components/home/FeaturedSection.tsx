"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data/products";

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-alt">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          {product.category}
        </p>
        <h3 className="mt-1 font-heading text-lg font-light">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          ${product.priceUSD}
        </p>
      </div>
    </Link>
  );
}

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
