"use client";

import React from "react";
import { Shop } from "../types/shop";
import ShopImage from "./ShopImage";

interface ShopCardProps {
  shop: Shop;
  isSelected: boolean;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-amber-500 bg-amber-50 shadow-md"
          : "hover:bg-white hover:shadow-lg border border-transparent hover:border-amber-100 bg-gray-50/50"
      }`}
    >
      <div className="flex p-3 gap-4">
        <ShopImage
          imageUrl={shop.imageUrl}
          imageAlt={shop.imageAlt}
          className="w-24 h-24 rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded uppercase">
              {shop.area}
            </span>
            {shop.confirmationStatus === "閉店確認済み" && (
              <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                閉店
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
            {shop.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2 truncate">{shop.nearest}</p>
          <p className="text-xs font-medium text-amber-900 bg-amber-50 inline-block px-2 py-0.5 rounded-full">
            {shop.signature}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
