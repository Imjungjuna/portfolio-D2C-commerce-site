"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore, type CartItem } from "@/lib/stores/cart";
import { useEffect, useState } from "react";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const t = useTranslations("cart");
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(useCartStore.getState().items);
    setMounted(true);

    const unsub = useCartStore.subscribe((state) => {
      setItems(state.items);
    });
    return unsub;
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-heading text-3xl font-light mb-6">{t("empty")}</p>
        <Link
          href="/shop"
          className="inline-block text-xs uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors border-b border-accent pb-1"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      {/* Items list */}
      <div className="lg:col-span-2">
        {items.map((item) => (
          <CartItemRow key={item.product.slug} item={item} />
        ))}
        <div className="mt-6">
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors border-b border-border pb-1"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>

      {/* Summary sidebar */}
      <div>
        <CartSummary />
      </div>
    </div>
  );
}
