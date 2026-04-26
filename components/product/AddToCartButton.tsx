"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useCartStore } from "@/lib/stores/cart";
import { useRouter } from "@/i18n/navigation";
import type { Product } from "@/lib/data/products";
import QuantityStepper from "./QuantityStepper";

type CartStatus = "idle" | "adding" | "added";

export default function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations("product");
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<CartStatus>("idle");

  const handleAddToCart = useCallback(() => {
    setStatus("adding");
    addItem(product, quantity);
    setTimeout(() => {
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    }, 400);
  }, [product, quantity, addItem]);

  const handleBuyNow = useCallback(() => {
    clearCart();
    addItem(product, quantity);
    router.push("/checkout");
  }, [product, quantity, addItem, clearCart, router]);

  const outOfStock = product.stock === 0;

  const buttonLabel =
    status === "adding"
      ? t("adding")
      : status === "added"
        ? t("added")
        : t("addToCart");

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-2 block">
          {t("quantity")}
        </label>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={product.stock}
          label={t("quantity")}
        />
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={outOfStock || status === "adding"}
        className={`w-full py-4 text-xs uppercase tracking-[0.2em] transition-all ${
          outOfStock
            ? "bg-border text-ink-soft cursor-not-allowed"
            : status === "added"
              ? "bg-accent text-white"
              : "bg-ink text-bg hover:bg-ink-soft"
        } disabled:opacity-60`}
        aria-label={outOfStock ? t("outOfStock") : buttonLabel}
      >
        {outOfStock ? t("outOfStock") : buttonLabel}
      </button>

      {/* Buy Now */}
      {!outOfStock && (
        <button
          onClick={handleBuyNow}
          className="w-full py-4 text-xs uppercase tracking-[0.2em] border border-ink text-ink hover:bg-ink hover:text-bg transition-colors"
          aria-label={t("buyNow")}
        >
          {t("buyNow")}
        </button>
      )}

      {/* Stock indicator */}
      {!outOfStock && (
        <p className="text-xs text-ink-soft">
          {t("inStock")} — {product.stock}
        </p>
      )}
    </div>
  );
}
