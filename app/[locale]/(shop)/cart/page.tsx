import { getTranslations } from "next-intl/server";
import CartContent from "@/components/cart/CartContent";

export default async function CartPage() {
  const t = await getTranslations("cart");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight mb-12">
          {t("title")}
        </h1>
        <CartContent />
      </div>
    </section>
  );
}
