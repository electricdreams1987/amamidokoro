"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Shop } from "../types/shop";

// Import LeafletMap dynamically to avoid SSR issues
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-2xl animate-pulse">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-800 font-bold">地図を読み込み中...</p>
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
    <div className="relative w-full h-full min-h-[400px] shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
      <LeafletMap {...props} />
      
      {/* Legend overlay */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl text-[10px] text-slate-600 shadow-xl border border-white/50 pointer-events-none">
        <p className="font-bold text-slate-400 mb-2 border-b border-slate-100 pb-1 uppercase tracking-tighter">Legend</p>
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-[#2A81CB] border border-white shadow-sm"></div>
          <span className="font-medium">甘味処</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#CB8427] border border-white shadow-sm ring-2 ring-amber-100"></div>
          <span className="font-bold text-amber-700">選択中の店舗</span>
        </div>
      </div>
    </div>
  );
};

export default ShopMap;
