import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-end">
      <Image
        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
        alt="Handcrafted Korean ceramic vessels on a wooden surface"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-16 md:pb-24">
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-white max-w-2xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
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
