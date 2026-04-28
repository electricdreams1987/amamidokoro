"use client";

import React, { useState, useMemo } from "react";
import { shops as allShops } from "../data/shops";
import { Shop } from "../types/shop";
import SearchAndFilter from "../components/SearchAndFilter";
import ShopCard from "../components/ShopCard";
import ShopDetailPanel from "../components/ShopDetailPanel";
import ShopMap from "../components/ShopMap";
import { Map, List, LayoutGrid, Info } from "lucide-react";

export default function Home() {
  const [filteredShops, setFilteredShops] = useState<Shop[]>(allShops);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "map" | "list">("split");

  const selectedShop = useMemo(() => 
    allShops.find(s => s.id === selectedShopId) || null,
  [selectedShopId]);

  // Statistics
  const stats = useMemo(() => {
    const total = allShops.length;
    const closed = allShops.filter(s => s.confirmationStatus === "閉店確認済み").length;
    const officialConfirmed = allShops.filter(s => 
      s.confirmationStatus === "公式確認済み" || s.confirmationStatus === "施設公式確認済み"
    ).length;
    const imagePlanned = allShops.filter(s => 
      s.imageSourceType !== "プレースホルダー"
    ).length;

    return { total, closed, officialConfirmed, imagePlanned };
  }, []);

  // Filter visible shops (handle closed shops according to requirement)
  // nana's green tea 上野マルイ店 (id: 25) is closed.
  // Requirement: "通常表示から除外できるようにする" or "閉店バッジを出す".
  // I'll show them with a badge in the list but allow filtering them out if needed.
  // For now, I'll show all but emphasize status.

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-amber-100 px-6 py-4 flex-shrink-0 shadow-sm z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-amber-900 tracking-tight font-outfit">
              東京甘味処マップ
            </h1>
            <p className="text-xs text-amber-700/60 font-medium">
              東京の甘味処を、写真と特徴から探せる一覧マップ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-amber-50 rounded-lg px-3 py-1.5 border border-amber-100">
              <div className="text-center px-2 border-r border-amber-200">
                <p className="text-[10px] text-amber-600 font-bold uppercase">掲載数</p>
                <p className="text-sm font-black text-amber-900">{stats.total}</p>
              </div>
              <div className="text-center px-2 border-r border-amber-200">
                <p className="text-[10px] text-amber-600 font-bold uppercase">公式確認</p>
                <p className="text-sm font-black text-amber-900">{stats.officialConfirmed}</p>
              </div>
              <div className="text-center px-2">
                <p className="text-[10px] text-amber-600 font-bold uppercase">画像整理</p>
                <p className="text-sm font-black text-amber-900">{stats.imagePlanned}</p>
              </div>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode("split")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "split" ? "bg-white shadow-sm text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
                title="分割表示"
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "map" ? "bg-white shadow-sm text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
                title="マップ優先"
              >
                <Map size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
                title="リスト優先"
              >
                <List size={18} />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              DEPLOYED ON VERCEL
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Search & List */}
        <div className={`flex-shrink-0 border-r border-amber-50 bg-white transition-all duration-500 ease-in-out ${
          viewMode === "map" ? "w-0 opacity-0 overflow-hidden" : "w-full md:w-80 lg:w-96 opacity-100"
        }`}>
          <SearchAndFilter shops={allShops} onFilterChange={setFilteredShops}>
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                isSelected={selectedShopId === shop.id}
                onClick={() => setSelectedShopId(shop.id)}
              />
            ))}
            {filteredShops.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Info size={32} className="mx-auto mb-2 opacity-20" />
                <p>該当する店舗が見つかりませんでした</p>
              </div>
            )}
          </SearchAndFilter>
        </div>

        {/* Center/Right: Map & Detail */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
          {/* Map Area */}
          <div className={`flex-1 p-4 transition-all duration-500 ${
            viewMode === "list" ? "hidden" : "block"
          }`}>
            <ShopMap 
              shops={filteredShops} 
              selectedShopId={selectedShopId}
              onSelectShop={setSelectedShopId}
            />
          </div>

          {/* Detail Panel Area */}
          <div className={`transition-all duration-500 bg-white shadow-2xl z-20 ${
            viewMode === "map" ? "w-full md:w-96 lg:w-[450px]" : 
            viewMode === "split" ? "w-full md:w-96 lg:w-[400px]" : 
            "flex-1"
          } ${selectedShopId ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
            <ShopDetailPanel shop={selectedShop} />
          </div>
        </div>
      </main>

      {/* Mobile Footer Toggle (if needed) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
          className="bg-amber-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
        >
          {viewMode === "list" ? <Map size={24} /> : <List size={24} />}
        </button>
      </div>
    </div>
  );
}
