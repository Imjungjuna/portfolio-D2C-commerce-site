import { getTranslations } from "next-intl/server";
import { products } from "@/lib/data/products";
import type { Product } from "@/lib/data/products";
import ShopControls from "@/components/product/ShopControls";
import ProductGrid from "@/components/product/ProductGrid";

type SortOption = "newest" | "priceAsc" | "priceDesc";

function filterAndSort(category: string, sort: SortOption): Product[] {
  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  switch (sort) {
    case "priceAsc":
      filtered.sort((a, b) => a.priceUSD - b.priceUSD);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.priceUSD - a.priceUSD);
      break;
    case "newest":
    default:
      break;
  }

  return filtered;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category = "all", sort = "newest" } = await searchParams;
  const t = await getTranslations("shop");
  const filtered = filterAndSort(category, sort as SortOption);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight mb-12">
          {t("title")}
        </h1>

        <ShopControls />

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="text-center text-ink-soft py-16">{t("noProducts")}</p>
        )}
      </div>
    </section>
  );
}
