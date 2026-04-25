"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <h2 className="font-heading text-3xl font-light">
        Something went wrong
      </h2>
      <button
        onClick={reset}
        className="text-xs uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors"
        aria-label="Try again"
      >
        Try again
      </button>
    </div>
  );
}
