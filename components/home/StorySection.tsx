import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function StorySection() {
  const t = useTranslations("home.story");

  return (
    <section className="py-24 md:py-32 bg-bg-alt">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src="/root-page/hero-image.png"
              alt="Potter shaping clay on a wheel in the studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="font-heading text-2xl md:text-4xl font-light mb-8">
              {t("heading")}
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-ink-soft">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
            <Link
              href="/about"
              className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors border-b border-border pb-1"
            >
              {t("readMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
