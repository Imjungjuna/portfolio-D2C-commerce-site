"use client";

import Image from "next/image";
import { useState } from "react";

export default function ClosingImage({ quote }: { quote: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className="relative h-[40vh] min-h-75 overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with muted filter */}
      <Image
        src="/about-page/closing-image.png"
        alt="Finished ceramic pieces"
        fill
        className="object-cover"
        style={{
          filter: "sepia(15%) saturate(0.75) brightness(0.9)",
        }}
        sizes="100vw"
      />

      {/* Warm overlay — lifts slightly on hover */}
      <div
        className="absolute inset-0 bg-stone-800 transition-opacity duration-700"
        style={{ opacity: hovered ? 0.2 : 0.35, mixBlendMode: "multiply" }}
      />

      {/* Quote — fades in on hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-heading text-2xl md:text-4xl font-light text-white tracking-wide text-center px-6">
          {quote}
        </p>
      </div>
    </section>
  );
}
