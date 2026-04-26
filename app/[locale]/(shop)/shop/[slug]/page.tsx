import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getProductBySlug,
  products,
} from "@/lib/data/products";
import ImageGallery from "@/components/product/ImageGallery";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductAccordion from "@/components/product/ProductAccordion";
import RelatedProducts from "@/components/product/RelatedProducts";

function getGalleryImages(baseUrl: string): string[] {
  const url = new URL(baseUrl);
  return [
    baseUrl,
    `${url.origin}${url.pathname}?w=800&q=80&crop=entropy&fit=crop`,
    `${url.origin}${url.pathname}?w=800&q=80&crop=edges&fit=crop`,
    `${url.origin}${url.pathname}?w=800&q=80&crop=top&fit=crop`,
  ];
}

function getRelatedProducts(slug: string, category: string) {
  return products
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, 4);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("product");
  const galleryImages = getGalleryImages(product.image);
  const related = getRelatedProducts(product.slug, product.category);

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Image gallery */}
            <ImageGallery images={galleryImages} alt={product.name} />

            {/* Right: Product info */}
            <div className="flex flex-col gap-6">
              {/* Category */}
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-light tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-xl font-light">
                ${product.priceUSD}{" "}
                <span className="text-sm text-ink-soft">
                  / ₩{product.priceKRW.toLocaleString()}
                </span>
              </p>

              {/* Description */}
              <p className="text-base text-ink-soft leading-relaxed">
                {product.description}
              </p>

              {/* Size info */}
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                  {t("size")}
                </span>
                <p className="text-sm mt-1">{product.size}</p>
              </div>

              {/* Add to cart / Buy now */}
              <AddToCartButton product={product} />

              {/* Accordion */}
              <div className="mt-4 border-t border-border pt-4">
                <ProductAccordion product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <RelatedProducts products={related} />
    </>
  );
}
