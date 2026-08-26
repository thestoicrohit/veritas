import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix standard Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to programmatically pan/zoom map on selection
function MapController({ selectedCoords }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCoords) {
      map.setView(selectedCoords, 10, { animate: true, duration: 1.5 });
    }
  }, [selectedCoords, map]);
  return null;
}

export default function IndiaMap({ projects, isDarkMode, onViewProject, selectedCoords }) {
  // Center of India
  const center = [21.7679, 78.8718];
  const zoom = 5;

  const createCustomIcon = (score, riskLevel) => {
    let color = '#35875A'; // Good
    if (riskLevel === 'LOW RISK') color = '#0F8E84';
    else if (riskLevel === 'MEDIUM RISK') color = '#D99024';
    else if (riskLevel === 'HIGH RISK') color = '#EB8425';
    else if (riskLevel === 'VERY HIGH RISK') color = '#C23A34';
    
    // Scale marker size based on score (14px to 24px)
    const size = 14 + (score / 10);
    
    return L.divIcon({
      className: 'custom-project-marker',
      html: `<div style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border: 2px solid white; 
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
      " class="hover:scale-125 hover:shadow-lg"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <div className={`relative h-[480px] w-full rounded-lg border overflow-hidden shadow-sm flex flex-col
      ${isDarkMode 
        ? 'bg-[#10263E] border-slate-800' 
        : 'bg-white border-gray-200'
      }`}
    >
      {/* Map Header */}
      <div className="px-4 py-3 border-b border-gray-200/50 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="text-xs font-extrabold tracking-tight text-navy uppercase">
            National Project Risk View
          </h3>
          <p className="text-[10px] text-gray-brand">
            Interactive GIS overlay • Synthetic demonstration records
          </p>
        </div>
        
        {/* Map Legend */}
        <div className="flex gap-3 text-[10px] font-bold">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-brand border border-white"></span>
            <span>GOOD</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-brand border border-white"></span>
            <span>LOW</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-brand border border-white"></span>
            <span>MEDIUM</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-brand border border-white"></span>
            <span>HIGH</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-brand border border-white"></span>
            <span>V. HIGH</span>
          </div>
        </div>
      </div>

      {/* Leaflet Container */}
      <div className="flex-1 relative z-10">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={
              isDarkMode 
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
                : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            }
          />
          
          {projects.map((proj) => (
            <Marker 
              key={proj.project_id} 
              position={[proj.latitude, proj.longitude]}
              icon={createCustomIcon(proj.overall_risk_score, proj.risk_level)}
            >
              <Popup>
                <div className="p-1 font-sans text-xs min-w-[200px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-navy">{proj.project_id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white
                      ${proj.risk_level === 'VERY HIGH RISK' ? 'bg-red-brand' :
                        proj.risk_level === 'HIGH RISK' ? 'bg-orange-brand' :
                        proj.risk_level === 'MEDIUM RISK' ? 'bg-amber-brand' :
                        proj.risk_level === 'LOW RISK' ? 'bg-teal-brand' : 'bg-green-brand'}`}>
                      {proj.overall_risk_score} / 100
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1 leading-snug">{proj.project_title}</h4>
                  <div className="text-[10px] text-gray-500 mb-2">
                    <strong>District:</strong> {proj.city} ({proj.state})
                  </div>
                  <div className="border-t pt-2 mt-1 flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 italic truncate max-w-[120px]" title={proj.risk_reasons}>
                      {proj.risk_reasons}
                    </span>
                    <button
                      onClick={() => onViewProject && onViewProject(proj.project_id)}
                      className="bg-navy hover:bg-navy/85 text-white font-bold text-[9px] px-2 py-1 rounded transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapController selectedCoords={selectedCoords} />
        </MapContainer>
      </div>
    </div>
  );
}
