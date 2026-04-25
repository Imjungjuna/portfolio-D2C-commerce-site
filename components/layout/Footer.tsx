import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] mb-6 text-ink">
              {t("shopHeading")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop?category=bowls"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("bowls")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=cups"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("cups")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=vases"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("vases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=plates"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("plates")}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] mb-6 text-ink">
              {t("aboutHeading")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("ourStory")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("theCraft")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  {t("studio")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] mb-6 text-ink">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-ink-soft">{t("email")}</span>
              </li>
              <li>
                <span className="text-sm text-ink-soft">{t("instagram")}</span>
              </li>
              <li>
                <span className="text-sm text-ink-soft">{t("location")}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] mb-6 text-ink">
              {t("newsletterHeading")}
            </h3>
            <p className="text-sm text-ink-soft mb-4 leading-relaxed">
              {t("newsletterDescription")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft">{t("copyright")}</p>
          <div className="flex gap-6">
            <span className="text-xs text-ink-soft hover:text-ink transition-colors cursor-pointer">
              {t("privacy")}
            </span>
            <span className="text-xs text-ink-soft hover:text-ink transition-colors cursor-pointer">
              {t("terms")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
