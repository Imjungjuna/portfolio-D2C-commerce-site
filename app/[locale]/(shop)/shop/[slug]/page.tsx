import { useTranslations } from "next-intl";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = useTranslations("product");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight">
          {t("details")}: {slug}
        </h1>
      </div>
    </section>
  );
}
