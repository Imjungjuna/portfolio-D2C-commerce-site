"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/data/products";

export default function ProductAccordion({ product }: { product: Product }) {
  const t = useTranslations("product");

  return (
    <Accordion defaultValue={[0]}>
      <AccordionItem>
        <AccordionTrigger className="text-xs uppercase tracking-[0.2em]">
          {t("details")}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-ink-soft leading-relaxed">
            <p>{product.description}</p>
            <p>
              <span className="text-ink">{t("size")}:</span> {product.size}
            </p>
            <p>
              <span className="text-ink">{t("material")}:</span>{" "}
              {product.material}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger className="text-xs uppercase tracking-[0.2em]">
          {t("care")}
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-ink-soft leading-relaxed">
            {t("careText")}
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger className="text-xs uppercase tracking-[0.2em]">
          {t("shipping")}
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-ink-soft leading-relaxed">
            {t("shippingText")}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
