"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Shop } from "../types/shop";

// Import LeafletMap dynamically to avoid SSR issues
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center rounded-[2rem] animate-pulse">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-800 font-bold">Google Maps を読み込み中...</p>
      </div>
    </div>
  ),
});

interface ShopMapProps {
  shops: Shop[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

const ShopMap: React.FC<ShopMapProps> = (props) => {
  return (
    <div className="relative w-full h-full min-h-[500px] shadow-2xl rounded-[2.5rem] overflow-hidden border-8 border-white bg-white">
      <LeafletMap {...props} />
      
      {/* Search / Map Info Overlay */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 text-[10px] font-bold text-amber-900 uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Map Mode
        </div>
      </div>
      
      {/* Legend overlay */}
      <div className="absolute bottom-8 right-8 z-[1000] bg-white/90 backdrop-blur-xl px-5 py-4 rounded-[1.5rem] text-[10px] text-slate-600 shadow-2xl border border-white/50 pointer-events-none">
        <p className="font-bold text-slate-400 mb-3 border-b border-slate-100 pb-2 uppercase tracking-tighter">Legend</p>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-md"></div>
          <span className="font-medium text-slate-700">甘味処</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow-md ring-4 ring-amber-100"></div>
          <span className="font-bold text-amber-800">選択中</span>
        </div>
      </div>
    </div>
  );
};

export default ShopMap;
