export interface Product {
  slug: string;
  name: string;
  description: string;
  priceUSD: number;
  priceKRW: number;
  category: "bowls" | "cups" | "vases" | "plates";
  size: string;
  material: string;
  stock: number;
  image: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    slug: "moon-jar-bowl",
    name: "Moon Jar Bowl",
    description:
      "Inspired by the iconic Joseon-era moon jar, this bowl features a soft white glaze with subtle irregularities that catch the light.",
    priceUSD: 120,
    priceKRW: 156000,
    category: "bowls",
    size: "Ø 18cm × H 9cm",
    material: "Stoneware, white feldspar glaze",
    stock: 8,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    featured: true,
  },
  {
    slug: "celadon-rice-bowl",
    name: "Celadon Rice Bowl",
    description:
      "A modern take on traditional celadon ware, with a jade-green glaze that deepens in the carved channels.",
    priceUSD: 65,
    priceKRW: 84500,
    category: "bowls",
    size: "Ø 13cm × H 7cm",
    material: "Porcelain, celadon glaze",
    stock: 15,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    featured: false,
  },
  {
    slug: "buncheong-tea-cup",
    name: "Buncheong Tea Cup",
    description:
      "Rustic buncheong-style cup with white slip brushwork over dark clay. Each stroke is unique.",
    priceUSD: 45,
    priceKRW: 58500,
    category: "cups",
    size: "Ø 8cm × H 7cm",
    material: "Stoneware, white slip",
    stock: 20,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    featured: true,
  },
  {
    slug: "ash-glaze-yunomi",
    name: "Ash Glaze Yunomi",
    description:
      "Wood-fired yunomi with natural ash glaze. The kiln's atmosphere creates unpredictable, beautiful patterns.",
    priceUSD: 55,
    priceKRW: 71500,
    category: "cups",
    size: "Ø 8cm × H 9cm",
    material: "Stoneware, natural ash glaze",
    stock: 12,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    featured: false,
  },
  {
    slug: "iron-oxide-espresso",
    name: "Iron Oxide Espresso Cup",
    description:
      "Compact espresso cup with a rich iron oxide finish. The dark exterior contrasts with a creamy white interior.",
    priceUSD: 35,
    priceKRW: 45500,
    category: "cups",
    size: "Ø 6cm × H 6cm",
    material: "Stoneware, iron oxide glaze",
    stock: 25,
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&q=80",
    featured: false,
  },
  {
    slug: "tall-cylinder-vase",
    name: "Tall Cylinder Vase",
    description:
      "Minimalist cylinder vase with a matte white finish. The clean lines let the flowers speak.",
    priceUSD: 180,
    priceKRW: 234000,
    category: "vases",
    size: "Ø 12cm × H 30cm",
    material: "Porcelain, matte white glaze",
    stock: 5,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    featured: true,
  },
  {
    slug: "onggi-bud-vase",
    name: "Onggi Bud Vase",
    description:
      "Small bud vase inspired by traditional onggi fermentation pots. The unglazed exterior has a warm, earthy texture.",
    priceUSD: 85,
    priceKRW: 110500,
    category: "vases",
    size: "Ø 8cm × H 15cm",
    material: "Earthenware, partial glaze",
    stock: 10,
    image: "https://images.unsplash.com/photo-1612196808214-b40bbb7d75b6?w=800&q=80",
    featured: false,
  },
  {
    slug: "crackle-glaze-vase",
    name: "Crackle Glaze Vase",
    description:
      "Medium vase with intentional crackle glaze that references centuries-old Korean ceramic tradition.",
    priceUSD: 145,
    priceKRW: 188500,
    category: "vases",
    size: "Ø 14cm × H 22cm",
    material: "Stoneware, crackle glaze",
    stock: 7,
    image: "https://images.unsplash.com/photo-1681180234028-c343a4ebfb40?q=8000&w=800",
    featured: true,
  },
  {
    slug: "hakeme-dinner-plate",
    name: "Hakeme Dinner Plate",
    description:
      "Generous dinner plate with hakeme (brush-marked) white slip over iron-rich clay. Food looks stunning on it.",
    priceUSD: 75,
    priceKRW: 97500,
    category: "plates",
    size: "Ø 27cm × H 3cm",
    material: "Stoneware, hakeme slip",
    stock: 18,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    featured: false,
  },
  {
    slug: "moon-white-side-plate",
    name: "Moon White Side Plate",
    description:
      "Elegant side plate in pure white with a slightly irregular rim that speaks to its handmade origin.",
    priceUSD: 40,
    priceKRW: 52000,
    category: "plates",
    size: "Ø 18cm × H 2cm",
    material: "Porcelain, clear glaze",
    stock: 22,
    image: "https://images.unsplash.com/photo-1594056113573-8ea18bc8e0b5?w=800&q=80",
    featured: false,
  },
  {
    slug: "charcoal-serving-plate",
    name: "Charcoal Serving Plate",
    description:
      "Large serving plate in deep charcoal with a satin finish. Perfect for sharing dishes at the center of the table.",
    priceUSD: 95,
    priceKRW: 123500,
    category: "plates",
    size: "Ø 32cm × H 3cm",
    material: "Stoneware, charcoal glaze",
    stock: 6,
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=800&q=80",
    featured: true,
  },
  {
    slug: "nesting-bowl-set",
    name: "Nesting Bowl Set",
    description:
      "Set of three nesting bowls in graduated sizes. Warm oatmeal glaze with speckled texture.",
    priceUSD: 195,
    priceKRW: 253500,
    category: "bowls",
    size: "Ø 12–22cm × H 5–10cm",
    material: "Stoneware, oatmeal glaze",
    stock: 4,
    image: "https://images.unsplash.com/photo-1603199506016-b9a694480163?w=800&q=80",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
