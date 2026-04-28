"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Shop } from "../types/shop";

// Helper to update map view
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface LeafletMapProps {
  shops: Shop[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ shops, selectedShopId, onSelectShop }) => {
  const selectedShop = shops.find(s => s.id === selectedShopId);
  const center: [number, number] = selectedShop ? [selectedShop.lat, selectedShop.lng] : [35.681, 139.767];
  const zoom = selectedShop ? 15 : 12;

  // Create a custom icon using our CSS pin design
  const createCustomIcon = (name: string, isSelected: boolean) => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <div class="relative flex items-center justify-center transition-all duration-500">
          ${isSelected ? '<span class="absolute inline-flex h-12 w-12 rounded-full bg-amber-400 opacity-20 animate-ping"></span>' : ''}
          <div class="flex flex-col items-center ${isSelected ? 'scale-110' : 'scale-75 opacity-80'}">
            <div class="w-6 h-6 rounded-full border-4 border-white shadow-2xl ${isSelected ? 'bg-amber-600' : 'bg-amber-400'} flex items-center justify-center">
              <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div class="w-1 h-2 -mt-1 bg-white shadow-sm rounded-full ${isSelected ? 'bg-amber-600' : 'bg-amber-400'}"></div>
          </div>
          <div class="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-white shadow-2xl rounded-2xl text-xs font-bold border border-amber-50 text-amber-900 transition-all ${isSelected ? 'opacity-100' : 'opacity-0'}">
            ${name}
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-amber-50 -translate-y-1"></div>
          </div>
        </div>
      `,
      iconSize: [0, 0], // Let the CSS handle it
      iconAnchor: [0, 0],
    });
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
      zoomControl={false} // Cleaner look
    >
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        url="https://mt1.google.com/vt/lyrs=m&hl=ja&x={x}&y={y}&z={z}"
      />
      <MapUpdater center={center} zoom={zoom} />
      {shops.map((shop) => (
        <Marker 
          key={shop.id} 
          position={[shop.lat, shop.lng]}
          icon={createCustomIcon(shop.name, shop.id === selectedShopId)}
          eventHandlers={{
            click: () => onSelectShop(shop.id),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
