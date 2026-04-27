import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Page Not Found — Yundo Ceramics",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-bg text-ink">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-6">
            404
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight mb-6">
            Page not found
          </h1>
          <p className="text-base text-ink-soft max-w-md mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <a
            href="/"
            className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1 hover:text-ink-soft transition-colors"
          >
            Return home
          </a>
        </div>
      </body>
    </html>
  );
}
