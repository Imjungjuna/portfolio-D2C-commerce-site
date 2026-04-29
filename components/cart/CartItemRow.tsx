"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useCartStore, type CartItem } from "@/lib/stores/cart";
import QuantityStepper from "@/components/product/QuantityStepper";

export default function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations("cart");
  const p = useTranslations("products");
  const c = useTranslations("shop.categories");
  const locale = useLocale();

  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // 로케일에 따른 가격 및 기호 설정
  const isKo = locale === "ko";
  const unitPrice = isKo ? item.product.priceKRW : item.product.priceUSD;
  const totalPrice = unitPrice * item.quantity;
  const currencySymbol = isKo ? "₩" : "$";

  return (
    <div className="flex gap-6 py-6 border-b border-border">
      {/* Image */}
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative w-24 h-32 shrink-0 bg-bg-alt overflow-hidden"
      >
        <Image
          src={item.product.image}
          alt={p(`${item.product.slug}.name`)}
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
            {p(`${item.product.slug}.name`)}
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mt-1">
            {c(item.product.category)} · {item.product.size}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <QuantityStepper
            value={item.quantity}
            onChange={(v) => updateQuantity(item.product.slug, v)}
            max={item.product.stock}
            label={p(`${item.product.slug}.name`)}
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
          {currencySymbol}
          {totalPrice.toLocaleString()}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-ink-soft mt-1">
            {isKo
              ? `개당 ${currencySymbol}${unitPrice.toLocaleString()}`
              : `${currencySymbol}${unitPrice.toLocaleString()} each`}
          </p>
        )}
      </div>
    </div>
  );
}
