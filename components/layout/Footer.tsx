import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import React from "react";

const linkClasses = "text-sm text-ink transition-colors";
const headingClasses =
  "text-lg font-medium uppercase tracking-widest font-heading mb-6 text-ink";

const shopLinks = [
  { href: "/shop?category=bowls", key: "bowls" },
  { href: "/shop?category=cups", key: "cups" },
  { href: "/shop?category=vases", key: "vases" },
  { href: "/shop?category=plates", key: "plates" },
];

const aboutLinks = [
  { href: "/about#story", key: "ourStory" },
  { href: "/about#craft", key: "theCraft" },
  { href: "/about#studio", key: "studio" },
];

const contactItems = ["email", "instagram", "location"];

const bottomLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
];

export default function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-12 md:gap-8">
          <div className="max-w-md">
            <div className="grid grid-cols-3">
              {/* Shop */}
              <div>
                <h3 className={headingClasses}>{t("shopHeading")}</h3>
                <ul className="space-y-0">
                  {shopLinks.map((link) => (
                    <li key={link.key}>
                      <Link href={link.href} className={linkClasses}>
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className={headingClasses}>{t("aboutHeading")}</h3>
                <ul className="space-y-0">
                  {aboutLinks.map((link) => (
                    <li key={link.key}>
                      <Link href={link.href} className={linkClasses}>
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className={headingClasses}>{t("contactHeading")}</h3>
                <ul className="space-y-0">
                  {contactItems.map((item) => (
                    <li key={item}>
                      <span className={linkClasses}>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-0">
            <p className="ml-auto w-fit text-7xl font-light text-ink-soft tracking-wider font-heading">
              Yundo.
            </p>
            <div className="w-fit ml-auto flex">
              <div className="flex items-center gap-1">
                {bottomLinks.map((link, index) => (
                  <React.Fragment key={link.key}>
                    <Link
                      key={link.key}
                      href={link.href}
                      className="text-xs text-ink-soft hover:text-ink transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                    {index < bottomLinks.length - 1 && (
                      <span className="text-ink-soft text-lg">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="w-fit ml-auto pt-0.5 text-xs text-ink-soft">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
