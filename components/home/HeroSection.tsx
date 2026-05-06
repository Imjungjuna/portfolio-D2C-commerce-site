import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-150 flex items-end">
      <Image
        src="/root-page/hero-image.png"
        alt="Handcrafted Korean ceramic vessels on a wooden surface"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pb-14 md:pb-20">
        <h1
          className={`font-heading break-keep font-light tracking-tight leading-tight text-3xl text-white max-w-2xl ${
            locale === "ko" ? "md:text-5xl whitespace-pre-line" : "md:text-6xl"
          }`}
        >
          {t("title")}
        </h1>
        <p className="mt-4 text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
          {t("subtitle")}
        </p>
        <Link
          href="/shop"
          className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
