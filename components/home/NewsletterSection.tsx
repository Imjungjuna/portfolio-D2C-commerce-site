"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewsletterSection() {
  const t = useTranslations("home.newsletter");
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
    <section className="py-24 md:py-32 bg-bg-alt">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-heading text-3xl md:text-5xl font-light mb-4">
          {t("heading")}
        </h2>
        <p className="text-base text-ink-soft leading-relaxed mb-10 max-w-lg mx-auto">
          {t("description")}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email-home" className="sr-only">
            {t("emailPlaceholder")}
          </label>
          <input
            id="newsletter-email-home"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="flex-1 bg-transparent border-b border-border px-0 py-3 text-sm text-center sm:text-left placeholder:text-ink-soft/60 focus:border-accent focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-3 bg-ink text-bg text-xs uppercase tracking-[0.2em] hover:bg-ink-soft transition-colors disabled:opacity-50"
            aria-label={t("subscribe")}
          >
            {t("subscribe")}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-sm text-accent">Thank you for subscribing!</p>
        )}
      </div>
    </section>
  );
}
