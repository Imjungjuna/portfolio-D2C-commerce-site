import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("terms");

  const sections = [
    { heading: t("introHeading"), text: t("introText") },
    { heading: t("productsHeading"), text: t("productsText") },
    { heading: t("paymentHeading"), text: t("paymentText") },
    { heading: t("shippingHeading"), text: t("shippingText") },
    { heading: t("returnsHeading"), text: t("returnsText") },
    { heading: t("ipHeading"), text: t("ipText") },
    { heading: t("liabilityHeading"), text: t("liabilityText") },
    { heading: t("changesHeading"), text: t("changesText") },
    { heading: t("contactHeading"), text: t("contactText") },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
      <h1 className="font-heading text-4xl md:text-5xl font-light mb-4">
        {t("title")}
      </h1>
      <p className="text-sm text-ink-soft mb-16">{t("lastUpdated")}</p>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-light mb-4">
              {section.heading}
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              {section.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
