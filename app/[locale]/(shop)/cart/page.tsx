import { getTranslations } from "next-intl/server";
import CartContent from "@/components/cart/CartContent";

export default async function CartPage() {
  const t = await getTranslations("cart");

  return (
    <section className="py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-2xl md:text-4xl font-medium tracking-tight mb-4 md:mb-12">
          {t("title")}
        </h1>
        <CartContent />
      </div>
    </section>
  );
}
