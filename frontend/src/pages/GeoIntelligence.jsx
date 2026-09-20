import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Info, ArrowRight, AlertTriangle } from 'lucide-react';

export default function GeoIntelligence({ isDarkMode, onViewProject }) {
  // Coordinates for the Varanasi duplicate cases
  const projA_coords = [25.3176, 82.9739];
  const projB_coords = [25.3178, 82.9742];
  
  // Custom marker icons
  const createMapMarkerIcon = (color) => {
    return L.divIcon({
      className: 'custom-geo-intel-marker',
      html: `<div style="
        width: 18px; 
        height: 18px; 
        background-color: ${color}; 
        border: 2px solid white; 
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className={`p-5 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>
            Geospatial Duplicate Work Detection
          </h2>

          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            The geo intelligence layer checks for spatial overlaps. When multiple projects of a similar category (e.g. Buildings, Road works) are sanctioned within 50 meters of each other, it flags them as a potential anomaly.
          </p>
        </div>
        
        <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-brand py-1.5 px-3 rounded border border-amber-100">
          <AlertTriangle size={12} />
          <span>PROXIMITY WARNING ACTIVE</span>
        </span>
      </div>

      {/* Map + Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaflet Map Column (2/3 width) */}
        <div className="lg:col-span-2 relative h-[450px] rounded-lg border overflow-hidden shadow-sm z-10">
          <MapContainer 
            center={projA_coords} 
            zoom={18} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={
                isDarkMode 
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
                  : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              }
            />

            {/* Project A Marker */}
            <Marker position={projA_coords} icon={createMapMarkerIcon('#C23A34')}>
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <span className="font-bold text-red-brand">VR-VNS-047</span>
                  <h4 className="font-bold">Community Hall Building</h4>
                  <p className="text-[10px] text-gray-500">Sanctioned: ₹20.0L</p>
                </div>
              </Popup>
            </Marker>

            {/* Project B Marker */}
            <Marker position={projB_coords} icon={createMapMarkerIcon('#C23A34')}>
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <span className="font-bold text-red-brand">VR-VNS-048</span>
                  <h4 className="font-bold">Community Hall Renovation</h4>
                  <p className="text-[10px] text-gray-500">Sanctioned: ₹18.0L</p>
                </div>
              </Popup>
            </Marker>

            {/* Dotted Polyline connecting the duplicate works */}
            <Polyline 
              positions={[projA_coords, projB_coords]} 
              color="#C23A34" 
              dashArray="6, 8" 
              weight={3}
            />
          </MapContainer>
          
          {/* Proximity Label floating on Map */}
          <div className="absolute bottom-4 left-4 z-20 bg-red-brand text-white text-[10px] font-bold py-1 px-2 rounded-md shadow-md border border-white">
            SPATIAL PROXIMITY GAP: 43 METRES
          </div>
        </div>

        {/* Side Panel Info Column (1/3 width) */}
        <div className="flex flex-col gap-4">
          
          {/* Relationship detail card */}
          <div className={`p-4 rounded-lg border shadow-sm flex flex-col justify-between flex-1
            ${isDarkMode 
              ? 'bg-[#10263E] border-slate-800 text-slate-100' 
              : 'bg-white border-gray-200 text-navy'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-red-brand font-bold text-xs uppercase mb-3">
                <AlertTriangle size={14} />
                <span>Duplicate Work Alert</span>
              </div>
              
              <div className="space-y-4">
                
                {/* Project A Mini Panel */}
                <div className="p-3 bg-gray-50/50 rounded border border-gray-200/50 flex justify-between items-center cursor-pointer hover:bg-gray-100/20"
                     onClick={() => onViewProject('VR-VNS-047')}>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-red-brand">PROJECT A: VR-VNS-047</span>
                    <h4 className="font-bold text-xs leading-tight mt-0.5">Community Hall Building</h4>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-1">₹20.0L Sanctioned • Progress: 24%</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-brand" />
                </div>

                {/* Project B Mini Panel */}
                <div className="p-3 bg-gray-50/50 rounded border border-gray-200/50 flex justify-between items-center cursor-pointer hover:bg-gray-100/20"
                     onClick={() => onViewProject('VR-VNS-048')}>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-red-brand">PROJECT B: VR-VNS-048</span>
                    <h4 className="font-bold text-xs leading-tight mt-0.5">Community Hall Renovation</h4>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-1">₹18.0L Sanctioned • Progress: 26%</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-brand" />
                </div>

              </div>

              {/* Duplicate metrics */}
              <div className="mt-4 pt-4 border-t border-gray-200/50 space-y-2 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Spatial Proximity:</span>
                  <span className="text-red-brand font-bold">43 Metres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category Similarity:</span>
                  <span className="text-red-brand font-bold">HIGH (Building)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Title Similarity:</span>
                  <span className="text-red-brand font-bold">HIGH (91%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AI Flagged Status:</span>
                  <span className="text-red-brand bg-red-50 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                    POTENTIAL DUPLICATE
                  </span>
                </div>
              </div>
            </div>

            {/* Note disclaimer */}
            <div className="mt-6 p-2.5 bg-amber-50/30 rounded border border-amber-200/50 flex items-start gap-2 text-[10px] text-amber-brand leading-relaxed font-semibold">
              <Info size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                <strong>Indicator only:</strong> Location proximity and naming similarities alone do not establish administrative duplication. Ground physical audit verification remains authoritative.
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
