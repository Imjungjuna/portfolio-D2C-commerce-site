import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
          alt="Ceramic vessels arranged on a wooden shelf in warm light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-end h-full">
          <div className="mx-auto max-w-7xl w-full px-6 pb-16">
            <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-white">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story — text left, image right */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl font-light mb-8">
                {t("story")}
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-ink-soft">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=960&q=80"
                alt="Ceramicist shaping clay on a potter's wheel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-width image break */}
      <section className="relative h-[50vh] min-h-[360px]">
        <Image
          src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1920&q=80"
          alt="Close-up of hands working with wet clay"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* The Studio — image left, text right */}
      <section className="py-24 md:py-32 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="relative aspect-[4/5] overflow-hidden md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1612196808214-b40bbb7d75b6?w=960&q=80"
                alt="Sunlit ceramics studio with shelves of finished pieces"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:order-2">
              <h2 className="font-heading text-3xl md:text-5xl font-light mb-8">
                {t("studioHeading")}
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-ink-soft">
                <p>{t("studioP1")}</p>
                <p>{t("studioP2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — centered wide text */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-3xl md:text-5xl font-light mb-8 text-center">
            {t("philosophyHeading")}
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-ink-soft text-center">
            <p>{t("philosophyP1")}</p>
            <p>{t("philosophyP2")}</p>
          </div>
        </div>
      </section>

      {/* Closing image */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1581783898382-80f477939ea2?w=1920&q=80"
          alt="Finished ceramic pieces cooling after kiln firing"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>
    </article>
  );
}
