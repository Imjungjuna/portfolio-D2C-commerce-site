"use client";

import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { useState, useEffect } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const strings = {
  en: {
    heading: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Return home",
  },
  ko: {
    heading: "페이지를 찾을 수 없습니다",
    description: "찾으시는 페이지가 존재하지 않거나 이동되었습니다.",
    cta: "홈으로 돌아가기",
  },
};

export default function GlobalNotFound() {
  const [locale, setLocale] = useState<"en" | "ko">("en");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/ko")) {
      setLocale("ko");
    } else if (path.startsWith("/en")) {
      setLocale("en");
    } else {
      // locale prefix 없는 경우 브라우저 언어 감지
      setLocale(navigator.language.startsWith("ko") ? "ko" : "en");
    }
  }, []);

  const s = strings[locale];

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-bg text-ink">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-6">
            404
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight mb-6">
            {s.heading}
          </h1>
          <p className="text-base text-ink-soft max-w-md mb-10">
            {s.description}
          </p>
          <a
            href="/"
            className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
          >
            {s.cta}
          </a>
        </div>
      </body>
    </html>
  );
}
