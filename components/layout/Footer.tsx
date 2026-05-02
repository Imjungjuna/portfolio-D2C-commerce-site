import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import React, { memo } from "react";

const linkClasses = "text-sm text-ink hover:text-ink-soft transition-colors";
const headingClasses =
  "text-lg font-medium uppercase tracking-widest font-heading mb-0 md:mb-4 text-ink";
const logoClasses = "text-ink hover:text-ink-soft transition-colors";

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

const bottomLinks = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
];

const Footer = memo(function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          <div className="max-w-md">
            <nav className="grid grid-cols-2 md:grid-cols-3">
              {/* Shop */}
              <div>
                <h3 className={headingClasses}>{t("shopHeading")}</h3>
                <ul className="mb-8 md:mb-0">
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
                <ul>
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
                <ul>
                  <li>
                    <a
                      href="mailto:hello@yundoceramics.com"
                      className={linkClasses}
                    >
                      {t("email")}
                    </a>
                  </li>
                  <li className="mt-1 flex items-center gap-3">
                    {/* Instagram */}
                    <Link
                      href="/sns"
                      className={logoClasses}
                      aria-label="Instagram"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="1"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    </Link>
                    {/* YouTube */}
                    <Link
                      href="/sns"
                      className={logoClasses}
                      aria-label="YouTube"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="4" />
                        <polygon
                          points="10,8.5 16,12 10,15.5"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    </Link>
                    {/* KakaoTalk */}
                    <Link
                      href="/sns"
                      className={logoClasses}
                      aria-label="KakaoTalk"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.6 1.7 4.9 4.3 6.2l-.8 3.1 3.5-2.3c1 .2 2 .3 3 .3 5.523 0 10-3.477 10-7.5S17.523 3 12 3Z" />
                      </svg>
                    </Link>
                    {/* Facebook */}
                    <Link
                      href="/sns"
                      className={logoClasses}
                      aria-label="Facebook"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15.5 8.5H14c-1.1 0-2 .9-2 2V22" fill="none" />
                        <path d="M9 13h6" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div>
            <p className="ml-auto w-fit text-7xl font-light text-ink-soft tracking-wider font-heading">
              Yundo.
            </p>
            <div className="w-fit ml-auto flex">
              <div className="flex items-center gap-1">
                {bottomLinks.map((link, index) => (
                  <React.Fragment key={link.key}>
                    <Link
                      href={link.href}
                      className="text-xs text-ink hover:text-ink-soft transition-colors tracking-wider"
                    >
                      {t(link.key)}
                    </Link>
                    {index < bottomLinks.length - 1 && (
                      <span className="text-lg">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="w-fit ml-auto text-ink text-xs tracking-wide">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
