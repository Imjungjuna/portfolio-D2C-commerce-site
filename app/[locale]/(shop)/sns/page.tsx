import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function SnsPage() {
  const t = await getTranslations("sns");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6">
        {t("heading")}
      </h1>
      <p className="font-heading text-base text-ink-soft max-w-md mb-10">
        {t("description")}
      </p>
      <Link
        href="/"
        className="font-heading text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
