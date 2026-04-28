"use client";

import React from "react";
import { Shop } from "../types/shop";
import ShopImage from "./ShopImage";
import { ExternalLink, MapPin, Clock, Calendar, Info, Camera, Image as ImageIcon } from "lucide-react";

interface ShopDetailPanelProps {
  shop: Shop | null;
}

const ShopDetailPanel: React.FC<ShopDetailPanelProps> = ({ shop }) => {
  if (!shop) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
        <MapPin size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">店舗を選択してください</p>
        <p className="text-sm">左側のリストからお店を選ぶと詳細が表示されます。</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      <ShopImage
        imageUrl={shop.imageUrl}
        imageAlt={shop.imageAlt}
        className="w-full aspect-video"
      />
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
              {shop.area}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              shop.confirmationStatus === "閉店確認済み" 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {shop.confirmationStatus}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h2>
          <p className="text-gray-600 leading-relaxed italic border-l-4 border-amber-200 pl-4 py-1">
            &quot;{shop.mood}&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">最寄り駅</p>
                <p className="text-sm text-gray-700">{shop.nearest}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">営業時間</p>
                <p className="text-sm text-gray-700">{shop.businessHours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Calendar size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">定休日</p>
                <p className="text-sm text-gray-700">{shop.regularHoliday}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Info size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">特徴</p>
                <p className="text-sm text-gray-700">{shop.signature}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ImageIcon size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">画像候補元</p>
                <p className="text-sm text-gray-700">{shop.imageSourceType}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Camera size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">取得ステータス</p>
                <p className="text-sm text-gray-700">{shop.imageAcquireStatus}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-700 mb-4">{shop.feature}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {shop.tags.map(tag => (
              <span key={tag} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Real Map iframe */}
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 shadow-inner">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(shop.name)}+${encodeURIComponent(shop.area)}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={shop.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            <MapPin size={18} />
            Google Maps で開く
            <ExternalLink size={14} />
          </a>
          <a
            href={shop.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-gray-100 hover:border-amber-200 hover:bg-amber-50 text-gray-700 font-bold rounded-xl transition-all"
          >
            公式サイト・確認元を見る
            <ExternalLink size={14} />
          </a>
          {shop.imageSourceUrl && (
            <a
              href={shop.imageSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs text-gray-400 hover:text-amber-600 transition-colors"
            >
              <ImageIcon size={14} />
              画像候補元リンクを確認
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPanel;
