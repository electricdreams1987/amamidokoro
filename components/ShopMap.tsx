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
    <div className="relative w-full h-full bg-[#fdfbf7] overflow-hidden rounded-2xl border-2 border-white shadow-inner font-outfit">
      {/* Background Water (East/South) */}
      <div className="absolute inset-0 bg-blue-50 opacity-20" 
           style={{ clipPath: 'polygon(70% 0%, 100% 0%, 100% 100%, 40% 100%, 60% 60%)' }}>
      </div>

      {/* Abstract Map Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>
      
      {/* Orientation Circles (Abstract Yamanote Line) */}
      <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-slate-200 rounded-[50%] opacity-50 pointer-events-none">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-300 font-bold uppercase tracking-widest">山手線エリア</div>
      </div>

      {/* Map Labels */}
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none">
          Tokyo Sweets Projection
        </div>
        <div className="text-[8px] text-slate-300 pointer-events-none">Scale: Automatic bounds based on data</div>
      </div>

      {/* Pins */}
      <div className="absolute inset-12">
        {shops.map((shop) => {
          const { top, left } = getPos(shop.lat, shop.lng);
          const isSelected = selectedShopId === shop.id;
          
          return (
            <button
              key={shop.id}
              onClick={() => onSelectShop(shop.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:z-50 ${
                isSelected ? "z-40" : "z-10 hover:scale-125"
              }`}
              style={{ top, left }}
            >
              <div className={`relative flex items-center justify-center group`}>
                {/* Ping animation for selected */}
                {isSelected && (
                  <span className="absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-30 animate-ping"></span>
                )}
                
                {/* Pin Shape */}
                <div className={`transition-all duration-300 flex flex-col items-center ${
                  isSelected ? "scale-100" : "scale-75"
                }`}>
                  <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-colors flex items-center justify-center ${
                    isSelected ? "bg-amber-600" : "bg-amber-400"
                  }`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className={`w-1 h-1.5 -mt-0.5 bg-white shadow-sm rounded-full ${
                    isSelected ? "bg-amber-600" : "bg-amber-400"
                  }`}></div>
                </div>
                
                {/* Tooltip on hover/selected */}
                <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-white shadow-2xl rounded-lg text-xs font-bold border border-amber-100 text-amber-900 pointer-events-none transition-all ${
                  isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}>
                  {shop.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl text-[10px] text-slate-600 shadow-xl border border-white/50">
        <p className="font-bold text-slate-400 mb-2 border-b border-slate-100 pb-1 uppercase tracking-tighter">Legend</p>
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-white shadow-sm"></div>
          <span className="font-medium">甘味処</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-600 border border-white shadow-sm ring-2 ring-amber-100"></div>
          <span className="font-bold text-amber-700">選択中の店舗</span>
        </div>
      </div>
    </div>
  );
};

export default ShopMap;
