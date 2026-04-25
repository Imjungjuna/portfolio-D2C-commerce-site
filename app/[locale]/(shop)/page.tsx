import { getFeaturedProducts } from "@/lib/data/products";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import StorySection from "@/components/home/StorySection";
import ProcessSection from "@/components/home/ProcessSection";
import PressSection from "@/components/home/PressSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturedSection products={featured} />
      <StorySection />
      <ProcessSection />
      <PressSection />
      <NewsletterSection />
    </>
  );
}
