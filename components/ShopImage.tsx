"use client";

import React from "react";
import Image from "next/image";

interface ShopImageProps {
  imageUrl: string | null;
  imageAlt: string;
  className?: string;
}

const ShopImage: React.FC<ShopImageProps> = ({
  imageUrl,
  imageAlt,
  className = "",
}) => {
  if (!imageUrl) return null;

  return (
    <div className={`relative overflow-hidden ${className} bg-amber-50`}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ShopImage;
