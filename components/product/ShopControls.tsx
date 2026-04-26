"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

const categories = ["all", "bowls", "cups", "vases", "plates"] as const;
const sortOptions = ["newest", "priceAsc", "priceDesc"] as const;

export default function ShopControls() {
  const t = useTranslations("shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "newest";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" && key === "category") {
      params.delete("category");
    } else if (value === "newest" && key === "sort") {
      params.delete("sort");
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    startTransition(() => {
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
      {/* Category tabs */}
      <div
        className="flex flex-wrap gap-1"
        role="tablist"
        aria-label={t("categories.all")}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => updateParams("category", cat)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
              activeCategory === cat
                ? "bg-ink text-bg"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="shop-sort"
          className="text-xs uppercase tracking-[0.2em] text-ink-soft"
        >
          {t("sort.label")}
        </label>
        <select
          id="shop-sort"
          value={activeSort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="bg-transparent text-sm text-ink-soft border-b border-border py-1 pr-6 focus:border-accent focus:outline-none cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%234A4A4A' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0 center",
          }}
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {t(`sort.${opt}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Pending overlay */}
      {isPending && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-accent/20">
            <div className="h-full w-1/3 bg-accent animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
