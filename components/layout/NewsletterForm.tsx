"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewsletterForm() {
  const t = useTranslations("common.footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <label htmlFor="footer-email" className="sr-only">
          {t("emailPlaceholder")}
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="flex-1 bg-transparent border-b border-border px-0 py-2 text-sm placeholder:text-ink-soft/60 focus:border-accent focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors disabled:opacity-50 shrink-0"
          aria-label={t("subscribe")}
        >
          {t("subscribe")}
        </button>
      </div>
      {status === "success" && (
        <p className="text-xs text-accent">{t("subscribeSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600">{t("subscribeError")}</p>
      )}
    </form>
  );
}
