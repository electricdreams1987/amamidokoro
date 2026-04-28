"use client";

import React, { useState, useMemo } from "react";
import { Search, Tag, X } from "lucide-react";
import { Shop } from "../types/shop";

interface SearchAndFilterProps {
  shops: Shop[];
  onFilterChange: (filteredShops: Shop[]) => void;
  children: React.ReactNode; // For the shop list
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ shops, onFilterChange, children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    shops.forEach(shop => shop.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [shops]);

  // Handle filtering
  useMemo(() => {
    const filtered = shops.filter(shop => {
      const matchesSearch = 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.every(tag => shop.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    onFilterChange(filtered);
  }, [searchTerm, selectedTags, shops, onFilterChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-amber-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="店名、エリア、メニューで検索..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-amber-200 focus:bg-white transition-all text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Tag size={14} className="text-amber-600" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">タグ絞り込み</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-2 scrollbar-thin">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-[10px] px-2 py-1 rounded-full transition-all border ${
                selectedTags.includes(tag)
                  ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                  : "bg-white border-gray-100 text-gray-500 hover:border-amber-200 hover:bg-amber-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {children}
      </div>
    </div>
  );
};

export default SearchAndFilter;
