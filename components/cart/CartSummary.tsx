"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/stores/cart";
import { useEffect, useState } from "react";

export default function CartSummary() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const [total, setTotal] = useState(0);

  const isKo = locale === "ko";
  const currencySymbol = isKo ? "₩" : "$";

  useEffect(() => {
    // 로케일에 따라 스토어의 원화/달러 총액 계산 함수를 선택
    const calculateTotal = (
      state: ReturnType<typeof useCartStore.getState>,
    ) => {
      return isKo ? state.totalPriceKRW() : state.totalPrice();
    };

    // 초기 마운트 시 총액 설정
    setTotal(calculateTotal(useCartStore.getState()));

    // 스토어 상태 변경 시 총액 업데이트
    const unsub = useCartStore.subscribe((state) => {
      setTotal(calculateTotal(state));
    });
    return unsub;
  }, [isKo]);

  return (
    <div className="bg-bg-alt p-8">
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-ink-soft">{t("subtotal")}</span>
          <span>
            {currencySymbol}
            {total.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-soft">{t("shipping")}</span>
          <span className="text-ink-soft text-xs">{t("shippingNote")}</span>
        </div>
        <div className="pt-4 border-t border-border flex justify-between text-base">
          <span>{t("total")}</span>
          <span className="font-heading text-xl font-light">
            {currencySymbol}
            {total.toLocaleString()}
          </span>
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
