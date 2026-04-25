"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const next = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={toggleLocale}
      className="text-sm uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
    >
      {locale === "en" ? "KO" : "EN"}
    </button>
  );
}
