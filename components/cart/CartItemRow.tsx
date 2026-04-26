"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useCartStore, type CartItem } from "@/lib/stores/cart";
import QuantityStepper from "@/components/product/QuantityStepper";

export default function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations("cart");
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-6 py-6 border-b border-border">
      {/* Image */}
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative w-24 h-32 shrink-0 bg-bg-alt overflow-hidden"
      >
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link
            href={`/shop/${item.product.slug}`}
            className="font-heading text-lg font-light hover:text-accent transition-colors"
          >
            {item.product.name}
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mt-1">
            {item.product.category} · {item.product.size}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <QuantityStepper
            value={item.quantity}
            onChange={(v) => updateQuantity(item.product.slug, v)}
            max={item.product.stock}
            label={item.product.name}
          />
          <button
            onClick={() => removeItem(item.product.slug)}
            className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors"
            aria-label={`${t("remove")} ${item.product.name}`}
          >
            {t("remove")}
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="text-sm">
          ${item.product.priceUSD * item.quantity}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-ink-soft mt-1">
            ${item.product.priceUSD} each
          </p>
        )}
      </div>
    </div>
  );
}
