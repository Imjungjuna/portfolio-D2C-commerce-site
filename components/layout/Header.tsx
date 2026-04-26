"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/stores/cart";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Header() {
  const t = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // 마운트 후 현재 값 읽기
    setCartCount(useCartStore.getState().totalItems());
    // 이후 변경 구독
    const unsub = useCartStore.subscribe((state) => {
      setCartCount(state.items.reduce((sum, item) => sum + item.quantity, 0));
    });
    return unsub;
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = (
    <>
      <Link
        href="/shop"
        className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors"
      >
        {t("nav.shop")}
      </Link>
      <Link
        href="/about"
        className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors"
      >
        {t("nav.about")}
      </Link>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-sm shadow-[0_1px_0_var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <button
                  aria-label={t("nav.menu")}
                  className="p-2 -ml-2 text-ink-soft hover:text-ink transition-colors"
                />
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="2" y1="5" x2="18" y2="5" />
                <line x1="2" y1="10" x2="18" y2="10" />
                <line x1="2" y1="15" x2="18" y2="15" />
              </svg>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-bg">
              <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
              <nav className="flex flex-col gap-8 mt-12 px-2">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/shop"
                      className="text-sm uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors"
                    />
                  }
                >
                  {t("nav.shop")}
                </SheetClose>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/about"
                      className="text-sm uppercase tracking-[0.2em] text-ink-soft hover:text-ink transition-colors"
                    />
                  }
                >
                  {t("nav.about")}
                </SheetClose>
                <div className="pt-4 border-t border-border">
                  <LocaleSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop left nav */}
        <nav className="hidden md:flex items-center gap-8">{navLinks}</nav>

        {/* Logo — center */}
        <Link
          href="/"
          className="font-heading text-xl md:text-2xl font-light tracking-tight absolute left-1/2 -translate-x-1/2"
        >
          {t("brandName")}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Link
            href="/cart"
            className="relative p-2 -mr-2 text-ink-soft hover:text-ink transition-colors"
            aria-label={`${t("nav.cart")}${cartCount > 0 ? ` (${cartCount})` : ""}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 5h12l-1.5 9H5.5L4 5z" />
              <path d="M7 5V4a3 3 0 0 1 6 0v1" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-medium bg-accent text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
