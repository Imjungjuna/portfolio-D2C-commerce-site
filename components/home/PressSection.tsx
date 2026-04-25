import { useTranslations } from "next-intl";

const publications = [
  "MONOCLE",
  "KINFOLK",
  "CEREAL",
  "WALLPAPER*",
  "DWELL",
];

export default function PressSection() {
  const t = useTranslations("home.press");

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft text-center mb-10">
          {t("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {publications.map((name) => (
            <span
              key={name}
              className="font-heading text-xl md:text-2xl font-light text-ink-soft/40 tracking-wide select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
