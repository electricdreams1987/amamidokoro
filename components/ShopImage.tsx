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
  if (!imageUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200 text-amber-800 ${className}`}
      >
        <div className="text-center p-4">
          <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60">
            No Image
          </p>
          <p className="text-sm font-medium">画像準備中</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
