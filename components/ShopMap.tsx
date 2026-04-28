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
    // Fixed bounds for Tokyo 23 wards area for consistency
    return {
      minLat: 35.55,
      maxLat: 35.80,
      minLng: 139.55,
      maxLng: 139.90,
    };
  }, []);

  const getPos = (lat: number, lng: number) => {
    const top = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#f8f9fa] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl font-outfit">
      {/* SVG Map Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Tokyo Bay */}
        <path d="M 70,100 C 80,90 90,80 100,75 L 100,100 Z" fill="#e0f2fe" />
        
        {/* Sumida River */}
        <path d="M 85,0 Q 80,30 75,50 T 70,75 T 75,100" fill="none" stroke="#bae6fd" strokeWidth="2" />
        
        {/* Arakawa River */}
        <path d="M 100,20 Q 90,40 85,60 T 90,100" fill="none" stroke="#bae6fd" strokeWidth="3" />
        
        {/* Abstract Ward Boundaries */}
        <circle cx="65" cy="55" r="15" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="45" cy="50" r="10" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      {/* Map Content Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Area Labels */}
      <div className="absolute top-[35%] left-[65%] text-[10px] font-extrabold text-slate-300 uppercase tracking-widest pointer-events-none">Central Tokyo</div>
      <div className="absolute top-[15%] left-[75%] text-[10px] font-extrabold text-slate-300 uppercase tracking-widest pointer-events-none">Asakusa / Ueno</div>
      <div className="absolute bottom-[25%] left-[45%] text-[10px] font-extrabold text-slate-300 uppercase tracking-widest pointer-events-none">Shibuya / Jiyugaoka</div>

      {/* Pins Layer */}
      <div className="absolute inset-0">
        {shops.map((shop) => {
          const { top, left } = getPos(shop.lat, shop.lng);
          const isSelected = selectedShopId === shop.id;
          
          // Safety check for bounds
          const nTop = parseFloat(top);
          const nLeft = parseFloat(left);
          if (nTop < 0 || nTop > 100 || nLeft < 0 || nLeft > 100) return null;

          return (
            <button
              key={shop.id}
              onClick={() => onSelectShop(shop.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:z-50 ${
                isSelected ? "z-40" : "z-10 hover:scale-125"
              }`}
              style={{ top, left }}
            >
              <div className="relative flex items-center justify-center group">
                {/* Status-specific glow/pulse */}
                {isSelected && (
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-amber-400 opacity-20 animate-ping"></span>
                )}
                
                {/* Custom Pin Design */}
                <div className={`transition-all duration-500 flex flex-col items-center ${
                  isSelected ? "scale-110" : "scale-75 opacity-80"
                }`}>
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-2xl transition-all duration-300 flex items-center justify-center ${
                    isSelected ? "bg-amber-600" : "bg-amber-400"
                  }`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className={`w-1 h-2 -mt-1 bg-white shadow-sm rounded-full ${
                    isSelected ? "bg-amber-600" : "bg-amber-400"
                  }`}></div>
                </div>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-white shadow-2xl rounded-2xl text-xs font-bold border border-amber-50 text-amber-900 pointer-events-none transition-all ${
                  isSelected ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                }`}>
                  {shop.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-amber-50 -translate-y-1"></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Legend & Map Info */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-4">
        <div className="bg-white/90 backdrop-blur-xl px-5 py-4 rounded-[1.5rem] shadow-2xl border border-white/50">
          <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest border-b border-slate-100 pb-2">Map Legend</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-md"></div>
              <span className="text-xs font-bold text-slate-600">甘味処</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow-md ring-4 ring-amber-50"></div>
              <span className="text-xs font-extrabold text-amber-700 underline decoration-amber-200 underline-offset-4">選択中</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-900/10 backdrop-blur-sm px-4 py-2 rounded-full text-[9px] font-bold text-amber-900/60 uppercase tracking-tighter border border-amber-900/5">
          Tokyo Traditional Sweets Map v1.0
        </div>
      </div>
    </div>
  );
};

export default ShopMap;
