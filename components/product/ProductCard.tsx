"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { Product } from "@/lib/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const tProducts = useTranslations("products");
  const locale = useLocale();

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-bg-alt">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${
            hovered && product.hoverImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-all duration-700 ${
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-bg/60 flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
              Sold out
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
          {product.category}
        </p>
        <h3 className="mt-1 font-heading text-lg font-light">{tProducts(`${product.slug}.name`)}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {locale === "ko"
            ? `₩${product.priceKRW.toLocaleString()}`
            : `$${product.priceUSD}`}
        </p>
      </div>
    </Link>
  );
}
