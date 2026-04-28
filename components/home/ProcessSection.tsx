import { useTranslations } from "next-intl";

const steps = [
  {
    key: "clay" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="16" cy="24" rx="12" ry="4" />
        <path d="M4 24V14c0-2 4-6 12-6s12 4 12 6v10" />
        <path d="M8 12c0-3 4-6 8-6s8 3 8 6" />
      </svg>
    ),
  },
  {
    key: "throw" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="16" cy="22" rx="8" ry="3" />
        <path d="M8 22v-6c0-2 3.5-4 8-4s8 2 8 4v6" />
        <path d="M16 4v8" />
        <path d="M12 6l4-2 4 2" />
      </svg>
    ),
  },
  {
    key: "fire" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M16 4c0 6-8 10-8 18a8 8 0 0 0 16 0c0-8-8-12-8-18z" />
        <path d="M16 14c0 3-3 5-3 9a3 3 0 0 0 6 0c0-4-3-6-3-9z" />
      </svg>
    ),
  },
  {
    key: "ship" as const,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="8" width="20" height="14" rx="1" />
        <path d="M6 12h20" />
        <path d="M13 8v4" />
        <path d="M19 8v4" />
        <path d="M10 22v4M22 22v4" />
      </svg>
    ),
  },
] as const;

export default function ProcessSection() {
  const t = useTranslations("home.process");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-heading text-2xl md:text-5xl font-light text-center mb-16 md:mb-20">
          {t("heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.key} className={`text-center py-10 md:py-0 ${i !== 0 ? "border-t border-border md:border-t-0" : ""}`}>
              <div className="flex justify-center mb-6 text-accent">
                {step.icon}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-heading text-base md:text-xl font-light mb-3">
                {t(step.key)}
              </h3>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                {t(`${step.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
