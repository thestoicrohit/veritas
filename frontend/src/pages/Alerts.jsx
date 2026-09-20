import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Clock, Trash2, UserPlus, Eye } from 'lucide-react';
import { fetchAlerts } from '../services/api';

export default function Alerts({ isDarkMode, onViewProject }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadAlerts();
  }, []);

  const handleDismiss = (id) => {
    setAlerts(prev => prev.filter(alt => alt.id !== id));
  };

  const handleAssign = (id) => {
    alert(`Alert ${id} has been assigned to the Regional District Audit Officer for ground inspection.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-5 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>
            Anomaly Alerts Centre
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            Dispatches alerts triggered by statistical cost deviations, physical-financial progress gaps, geospatial proximity duplicates, and image change failures.
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold bg-red-50 text-red-brand py-1.5 px-3 rounded border border-red-100">
            <Bell size={12} className="animate-bounce" />
            <span>{alerts.length} ALERTS ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Alerts queue list */}
      <div className={`border rounded-lg shadow-sm divide-y divide-gray-200/50 overflow-hidden
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100 divide-slate-800' 
          : 'bg-white border-gray-200 text-navy divide-gray-100'
        }`}
      >
        {alerts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <CheckCircle size={28} className="text-green-brand mx-auto mb-2" />
            <span className="font-semibold block">All Alerts Cleared</span>
            <span className="text-xs">No pending anomalies require priority triage.</span>
          </div>
        ) : (
          alerts.map((alt) => (
            <div 
              key={alt.id}
              className={`p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${isDarkMode ? 'hover:bg-[#152F4C]' : 'hover:bg-gray-50/50'}`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0
                  ${alt.color === 'red' ? 'bg-red-brand' :
                    alt.color === 'orange' ? 'bg-orange-brand' :
                    alt.color === 'amber' ? 'bg-amber-brand' :
                    alt.color === 'teal' ? 'bg-teal-brand' : 'bg-green-brand'}`}
                ></span>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-navy'}`}>{alt.project_id}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase font-mono text-white
                      ${alt.type === 'VERY HIGH' ? 'bg-red-brand' :
                        alt.type === 'HIGH' ? 'bg-orange-brand' :
                        alt.type === 'MEDIUM' ? 'bg-amber-brand' :
                        alt.type === 'LOW' ? 'bg-teal-brand' : 'bg-green-brand'}`}
                    >
                      {alt.type}
                    </span>
                    <span className="text-[10px] text-gray-brand flex items-center gap-1">
                      <Clock size={10} />
                      <span>{alt.timestamp}</span>
                    </span>
                  </div>
                  <p className={`text-sm font-semibold leading-snug ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>{alt.message}</p>
                </div>
              </div>

              {/* Actions panel */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 pt-2 sm:pt-0">
                <button
                  onClick={() => onViewProject(alt.project_id)}
                  className="bg-navy hover:bg-navy/90 text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center gap-1 cursor-pointer transition-all"
                  title="Open detailed project screen"
                >
                  <Eye size={12} />
                  <span>Review</span>
                </button>
                <button
                  onClick={() => handleAssign(alt.id)}
                  className="bg-gray-100 hover:bg-gray-200 text-navy border border-gray-300 text-[10px] font-bold py-1.5 px-3 rounded flex items-center gap-1 cursor-pointer transition-all"
                  title="Assign to inspector"
                >
                  <UserPlus size={12} />
                  <span>Assign</span>
                </button>
                <button
                  onClick={() => handleDismiss(alt.id)}
                  className="bg-gray-100 hover:bg-red-50 text-red-brand border border-gray-300 hover:border-red-200 text-[10px] font-bold py-1.5 px-2.5 rounded flex items-center justify-center cursor-pointer transition-all"
                  title="Dismiss alert"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
