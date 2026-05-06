import { useTranslations } from "next-intl";

const publications = ["MONOCLE", "KINFOLK", "CEREAL", "WALLPAPER*", "DWELL"];

export default function PressSection() {
  const t = useTranslations("home.press");

  const items = publications.map((name) => (
    <span
      key={name}
      className="font-heading text-2xl md:text-5xl font-light text-ink-soft/40 tracking-wide select-none whitespace-nowrap"
    >
      {name}
    </span>
  ));

  return (
    <section className="py-14 md:py-20 border-y border-border">
      <p className="text-xl font-heading md:text-3xl uppercase text-ink-soft text-center mb-6 md:mb-12 px-6">
        {t("heading")}
      </p>
      <div className="overflow-hidden">
        <div
          className="flex items-center gap-10 md:gap-20 w-max"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {items}
          {items}
        </div>
      </div>
    </section>
  );
}
