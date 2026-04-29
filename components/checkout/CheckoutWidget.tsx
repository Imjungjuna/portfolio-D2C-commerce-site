"use client";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCartStore, type CartItem } from "@/lib/stores/cart";
import Image from "next/image";

const CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const CUSTOMER_KEY = "zx7wstJbH2fVNNpbBLmSy";

function generateOrderId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `yundo_${timestamp}_${random}`;
}

export default function CheckoutWidget() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const p = useTranslations("products");

  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widgets, setWidgets] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const widgetInitialized = useRef(false);

  // Hydrate cart state
  useEffect(() => {
    setItems(useCartStore.getState().items);
    setMounted(true);
    const unsub = useCartStore.subscribe((state) => {
      setItems(state.items);
    });
    return unsub;
  }, []);

  // Calculate totals
  const totalKRW = items.reduce(
    (sum, item) => sum + item.product.priceKRW * item.quantity,
    0,
  );
  const totalUSD = items.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0,
  );

  // Initialize Toss Payments widget
  useEffect(() => {
    if (!mounted || items.length === 0 || widgetInitialized.current) return;

    async function init() {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const w = tossPayments.widgets({ customerKey: CUSTOMER_KEY });
      setWidgets(w);
      widgetInitialized.current = true;
    }
    init();
  }, [mounted, items.length]);

  // Render payment UI
  useEffect(() => {
    if (!widgets || totalKRW === 0) return;

    async function render() {
      await widgets.setAmount({ currency: "KRW", value: totalKRW });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }
    render();
  }, [widgets, totalKRW]);

  // Update amount when total changes
  useEffect(() => {
    if (!widgets || !ready) return;
    widgets.setAmount({ currency: "KRW", value: totalKRW });
  }, [widgets, ready, totalKRW]);

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
        <p className="font-heading text-3xl font-light mb-6">
          {t("emptyCart")}
        </p>
      </div>
    );
  }

  const orderName =
    items.length === 1
      ? items[0].product.name
      : `${items[0].product.name} 외 ${items.length - 1}건`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
      {/* Left: Payment widget */}
      <div className="lg:col-span-2 space-y-6">
        <div id="payment-method" />
        <div id="agreement" />

        <button
          disabled={!ready}
          onClick={async () => {
            try {
              await widgets.requestPayment({
                orderId: generateOrderId(),
                orderName,
                successUrl: `${window.location.origin}/${locale}/checkout/success`,
                failUrl: `${window.location.origin}/${locale}/checkout/fail`,
                customerEmail: "customer@example.com",
                customerName: locale === "ko" ? "고객" : "Customer",
              });
            } catch (error) {
              console.error(error);
            }
          }}
          className="w-full py-4 bg-ink text-bg text-xs uppercase tracking-[0.2em] hover:bg-ink-soft transition-colors disabled:opacity-50"
        >
          {t("placeOrder")}
        </button>
      </div>

      {/* Right: Order summary */}
      <div>
        <div className="border border-border p-6 space-y-6">
          <h2 className="text-xs uppercase tracking-widest">
            {t("orderSummary")}
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.slug} className="flex gap-4">
                <div className="relative w-16 h-20 bg-bg-alt shrink-0 overflow-hidden">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full bg-bg-alt" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">
                    {" "}
                    {p(`${item.product.slug}.name`)}
                  </p>
                  <p className="text-xs text-ink-soft mt-1">
                    {t("qty")}: {item.quantity}
                  </p>
                  <p className="text-sm mt-1">
                    {locale === "ko"
                      ? `₩${(item.product.priceKRW * item.quantity).toLocaleString()}`
                      : `$${item.product.priceUSD * item.quantity}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">{t("subtotal")}</span>
              <span>
                {locale === "ko"
                  ? `₩${totalKRW.toLocaleString()}`
                  : `$${totalUSD}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">{t("shipping")}</span>
              <span className="text-ink-soft">{t("shippingCalc")}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t border-border">
              <span>{t("total")}</span>
              <span>
                {locale === "ko"
                  ? `₩${totalKRW.toLocaleString()}`
                  : `$${totalUSD}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
