"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/stores/cart";

export default function SuccessPage() {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) return;

    async function confirm() {
      try {
        const res = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message ?? "Payment confirmation failed");
          return;
        }

        setConfirmed(true);
        useCartStore.getState().clearCart();
      } catch {
        setError("Payment confirmation failed");
      }
    }
    confirm();
  }, [paymentKey, orderId, amount]);

  if (error) {
    return (
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-lg px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-6">
            {t("error")}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6">
            {t("paymentFailed")}
          </h1>
          <p className="text-base text-ink-soft mb-10">{error}</p>
          <Link
            href="/checkout"
            className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
          >
            {t("tryAgain")}
          </Link>
        </div>
      </section>
    );
  }

  if (!confirmed) {
    return (
      <section className="py-24 md:py-32">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-lg px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6">
          {t("confirmed")}
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6">
          {t("thankYou")}
        </h1>
        <p className="text-base text-ink-soft mb-4">
          {t("orderNumber")}: {orderId}
        </p>
        <p className="text-base text-ink-soft mb-10">
          {t("confirmationMessage")}
        </p>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
        >
          {t("continueShopping")}
        </Link>
      </div>
    </section>
  );
}
