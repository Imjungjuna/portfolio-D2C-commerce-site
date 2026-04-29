import { getTranslations } from "next-intl/server";
import CheckoutWidget from "@/components/checkout/CheckoutWidget";

export default async function CheckoutPage() {
  const t = await getTranslations("checkout");

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl md:px-6">
        <h1 className="font-heading text-2xl md:text-5xl font-light tracking-tight mb-12">
          {t("title")}
        </h1>
        <CheckoutWidget />
      </div>
    </section>
  );
}
