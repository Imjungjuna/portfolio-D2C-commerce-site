import { useTranslations } from "next-intl";

const publications = ["MONOCLE", "KINFOLK", "CEREAL", "WALLPAPER*", "DWELL"];

export default function PressSection() {
  const t = useTranslations("home.press");

  const items = publications.map((name) => (
    <span
      key={name}
      className="font-heading text-3xl md:text-6xl font-light text-ink-soft/40 tracking-wide select-none whitespace-nowrap"
    >
      {name}
    </span>
  ));

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <p className="text-2xl font-heading md:text-4xl uppercase text-ink-soft text-center mb-8 md:mb-16 px-6">
        {t("heading")}
      </p>
      <div className="overflow-hidden">
        <div
          className="flex items-center gap-12 md:gap-24 w-max"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {items}
          {items}
        </div>
      </div>
    </section>
  );
}
