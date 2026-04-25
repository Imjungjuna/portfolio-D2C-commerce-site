import { useTranslations } from "next-intl";

export default function ShopPage() {
  const t = useTranslations("shop");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
