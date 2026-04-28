"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <h2 className="font-heading text-3xl font-light">{t("heading")}</h2>
      <button
        onClick={reset}
        className="text-xs uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors"
        aria-label={t("retry")}
      >
        {t("retry")}
      </button>
    </div>
  );
}
