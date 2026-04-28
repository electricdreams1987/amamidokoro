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
  const displayUrl = imageUrl || "/images/shops/placeholder-kanmi.webp";

  return (
    <div className={`relative overflow-hidden ${className} bg-amber-50`}>
      <Image
        src={displayUrl}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
          <p className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
            画像準備中
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopImage;
