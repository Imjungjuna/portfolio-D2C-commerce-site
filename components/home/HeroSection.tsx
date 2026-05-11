import ReactDOM from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getImageProps } from "next/image";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  const commonProps = {
    alt: "hero image",
    fill: true,
    sizes: "100vw",
    priority: true,
  };
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({ ...commonProps, src: "/root-page/hero-desktop.webp" });

  const {
    props: { srcSet: mobileSrcSet, src: mobileSrc, ...rest },
  } = getImageProps({ ...commonProps, src: "/root-page/hero-mobile.webp" });

  // Next.js가 최적화한 해상도별 이미지 셋을 브라우저 파싱 단계에서 최우선으로 다운로드 큐에 넣음
  ReactDOM.preload(mobileSrc, {
    as: "image",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  ReactDOM.preload(desktopSrc, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: "100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });

  // ReactDOM.preload("/root-page/hero-mobile.webp", {
  //   as: "image",
  //   media: "(max-width: 767px)",
  //   fetchPriority: "high",
  // });
  // ReactDOM.preload("/root-page/hero-desktop.webp", {
  //   as: "image",
  //   media: "(min-width: 768px)",
  //   fetchPriority: "high",
  // });

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-150 flex items-end">
      <picture className="absolute inset-0 block w-full h-full">
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          {...rest}
          fetchPriority="high"
          decoding="sync"
          className="object-cover w-full h-full"
        />
      </picture>
      {/* <Image
        src="/root-page/hero-mobile.webp"
        fill
        alt="mobile hero image"
        fetchPriority="high"
        preload={true}
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <Image
        src="/root-page/hero-desktop.webp"
        alt="desktop hero image"
        fetchPriority="high"
        preload={true}
        fill
        sizes="100vw"
        className="object-cover hidden md:block"
      /> */}
      {/* <picture className="absolute inset-0 block w-full h-full">
        <source
          media="(max-width: 767px)"
          srcSet="/root-page/hero-mobile.webp"
        />
        <img
          src="/root-page/hero-desktop.webp"
          alt="Handcrafted Korean ceramic vessels on a wooden surface"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
      </picture> */}
      {/* <Image
        src="/root-page/hero-image.png"
        fill={true}
        alt="hero section pic"
        preload={true}
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1vw, 100vw"
      /> */}
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
