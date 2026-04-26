import { useTranslations } from "next-intl";
import type { Product } from "@/lib/data/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("product");

  if (products.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-heading text-3xl md:text-5xl font-light mb-12">
          {t("youMightAlsoLike")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
