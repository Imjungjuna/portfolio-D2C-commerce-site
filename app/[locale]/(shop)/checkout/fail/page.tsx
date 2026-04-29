"use client";

import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function FailPage() {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const message = searchParams.get("message");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-lg px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-6">
          {t("error")}
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6">
          {t("paymentFailed")}
        </h1>
        {code && (
          <p className="text-sm text-ink-soft mb-2">
            {t("errorCode")}: {code}
          </p>
        )}
        {message && (
          <p className="text-base text-ink-soft mb-10">{message}</p>
        )}
        <Link
          href="/checkout"
          className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
        >
          {t("tryAgain")}
        </Link>
      </div>
    </section>
  );
}
