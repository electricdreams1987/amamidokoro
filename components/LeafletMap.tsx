"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Shop } from "../types/shop";

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for selected shop
const SelectedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
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
  const center: [number, number] = selectedShop ? [selectedShop.lat, selectedShop.lng] : [35.681, 139.767]; // Default to Tokyo Station
  const zoom = selectedShop ? 16 : 12;

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />
      {shops.map((shop) => (
        <Marker 
          key={shop.id} 
          position={[shop.lat, shop.lng]}
          icon={shop.id === selectedShopId ? SelectedIcon : DefaultIcon}
          eventHandlers={{
            click: () => onSelectShop(shop.id),
          }}
        >
          <Popup>
            <div className="font-outfit">
              <h3 className="font-bold text-amber-900">{shop.name}</h3>
              <p className="text-xs text-gray-600">{shop.area}</p>
              <button 
                onClick={() => onSelectShop(shop.id)}
                className="mt-2 text-[10px] bg-amber-600 text-white px-2 py-1 rounded"
              >
                詳細を見る
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
