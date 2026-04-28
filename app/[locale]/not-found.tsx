import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-6">
        404
      </p>
      <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight mb-6">
        {t("heading")}
      </h1>
      <p className="text-base text-ink-soft max-w-md mb-10">
        {t("description")}
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
