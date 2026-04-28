"use client";

import React, { useMemo } from "react";
import { Shop } from "../types/shop";

interface ShopMapProps {
  shops: Shop[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

const ShopMap: React.FC<ShopMapProps> = ({ shops, selectedShopId, onSelectShop }) => {
  // Calculate bounds to scale the map
  const bounds = useMemo(() => {
    if (shops.length === 0) return { minLat: 35.6, maxLat: 35.8, minLng: 139.6, maxLng: 139.8 };
    
    // Exclude outliers for better central Tokyo view if needed, but for now use all
    // Akiru is far west (139.29), others are around 139.7-139.8
    const lats = shops.map(s => s.lat);
    const lngs = shops.map(s => s.lng);
    
    return {
      minLat: Math.min(...lats) - 0.01,
      maxLat: Math.max(...lats) + 0.01,
      minLng: Math.min(...lngs) - 0.01,
      maxLng: Math.max(...lngs) + 0.01,
    };
  }, [shops]);

  const getPos = (lat: number, lng: number) => {
    const top = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden rounded-2xl border-2 border-white shadow-inner">
      {/* Abstract Map Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      {/* Map Labels (Abstract) */}
      <div className="absolute top-4 left-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">
        Projection: Simple Lat/Lng Grid
      </div>

      {/* Pins */}
      <div className="absolute inset-8">
        {shops.map((shop) => {
          const { top, left } = getPos(shop.lat, shop.lng);
          const isSelected = selectedShopId === shop.id;
          
          return (
            <button
              key={shop.id}
              onClick={() => onSelectShop(shop.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:z-50 ${
                isSelected ? "z-40 scale-125" : "z-10 hover:scale-110"
              }`}
              style={{ top, left }}
              title={shop.name}
            >
              <div className={`relative flex items-center justify-center`}>
                {/* Ping animation for selected */}
                {isSelected && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping"></span>
                )}
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm transition-colors ${
                  isSelected ? "bg-amber-600 w-4 h-4" : "bg-amber-400"
                }`}></div>
                
                {/* Tooltip on hover/selected */}
                <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-white shadow-xl rounded text-[10px] font-bold border border-amber-100 pointer-events-none transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  {shop.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Legend / Legend-ish overlay */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-slate-500 shadow-sm border border-white/50">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <span>甘味処（通常）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-600 ring-2 ring-amber-200"></div>
          <span>選択中の店舗</span>
        </div>
      </div>
    </div>
  );
};

export default ShopMap;
