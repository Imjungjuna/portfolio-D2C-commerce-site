"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/stores/cart";
import { useEffect, useState } from "react";

export default function CartSummary() {
  const t = useTranslations("cart");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(useCartStore.getState().totalPrice());

    const unsub = useCartStore.subscribe((state) => {
      const total = state.items.reduce(
        (sum, item) => sum + item.product.priceUSD * item.quantity,
        0
      );
      setTotalPrice(total);
    });
    return unsub;
  }, []);

  return (
    <div className="bg-bg-alt p-8">
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-ink-soft">{t("subtotal")}</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-soft">{t("shipping")}</span>
          <span className="text-ink-soft text-xs">{t("shippingNote")}</span>
        </div>
        <div className="pt-4 border-t border-border flex justify-between text-base">
          <span>{t("total")}</span>
          <span className="font-heading text-xl font-light">${totalPrice}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="block w-full mt-8 py-4 bg-ink text-bg text-center text-xs uppercase tracking-[0.2em] hover:bg-ink-soft transition-colors"
        aria-label={t("checkout")}
      >
        {t("checkout")}
      </Link>
    </div>
  );
}
