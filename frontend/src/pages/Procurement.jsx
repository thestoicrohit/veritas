import React from 'react';
import { AlertTriangle, Info, User, Calendar, FileText } from 'lucide-react';

export default function Procurement({ isDarkMode, onViewProject }) {
  const contractorName = "Demo Contractor A (Synthetic)";
  const contractorId = "CON-LKO-AAA";
  
  const works = [
    {
      id: "VR-LKO-068",
      title: "Rainwater Water Harvesting Works",
      amount: "₹9.8 Lakhs",
      progress: "31%",
      date: "01 March 2025",
      status: "HIGH RISK"
    },
    {
      id: "VR-LKO-069",
      title: "Water Supply Tube-well Work",
      amount: "₹9.7 Lakhs",
      progress: "35%",
      date: "05 March 2025",
      status: "HIGH RISK"
    },
    {
      id: "VR-LKO-070",
      title: "Rainwater Harvesting Tank Install",
      amount: "₹9.9 Lakhs",
      progress: "33%",
      date: "08 March 2025",
      status: "HIGH RISK"
    }
  ];

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
            Procurement Pattern Analysis
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            Monitors procurement patterns to detect potential contract splitting (tender splitting). Awarding multiple contracts of similar types within close periods below standard thresholds (e.g. ₹10.0 Lakhs) is flagged for auditor review.
          </p>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-orange-50 text-orange-brand py-1.5 px-3 rounded border border-orange-100">
          <AlertTriangle size={14} />
          <span>PROCUREMENT ALERTS ACTIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contractor Profile Card and explanation */}
        <div className={`p-5 rounded-lg border shadow-sm flex flex-col justify-between
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-200 text-navy'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 pb-3 border-b mb-4">
              <div className="p-2 bg-teal-brand/10 text-teal-brand rounded-lg">
                <User size={18} />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-tight">Contractor Profile</h3>
                <span className="text-[10px] font-mono text-gray-brand block">{contractorId}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span>{contractorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active District:</span>
                <span>Lucknow, UP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Priority Level:</span>
                <span className="text-orange-brand uppercase">HIGH RISK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trigger Indicator:</span>
                <span className="text-red-brand">Split Contracts (₹10L limit)</span>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-gray-brand leading-relaxed">
              <strong>Analysis:</strong> Demo Contractor A has been awarded three distinct contracts within a single week, each valued just under the ₹10 Lakhs administrative limit. Under guidelines, works above ₹10 Lakhs require higher technical approvals. Awarding separate small contracts for identical classes of works suggests intentional splitting.
            </p>
          </div>

          <div className="mt-6 p-2.5 bg-amber-50/20 rounded border border-amber-200/50 text-[9px] text-amber-brand flex gap-2 font-semibold">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>Indicator only — not proof of tender splitting.</span>
          </div>
        </div>

        {/* Works List column (2/3 width) */}
        <div className={`p-5 rounded-lg border shadow-sm lg:col-span-2 flex flex-col justify-between
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-200 text-navy'
          }`}
        >
          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'} mb-4`}>
              Flagged Contract Splitting Cluster
            </h3>

            <div className="space-y-4">
              {works.map((work) => (
                <div 
                  key={work.id}
                  onClick={() => onViewProject(work.id)}
                  className="p-4 bg-gray-50/50 rounded border border-gray-200/50 hover:bg-gray-100/10 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:scale-101"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-orange-brand">{work.id}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-orange-50 text-orange-brand rounded uppercase">
                        {work.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm leading-snug">{work.title}</h4>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-gray-brand pt-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} />
                        <span>Award Date: {work.date}</span>
                      </div>
                      <div>
                        <span>Progress: <strong>{work.progress}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2 sm:pt-0">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Sanctioned</span>
                      <span className={`text-sm font-extrabold leading-none ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>{work.amount}</span>
                    </div>

                    <button className="bg-navy text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-navy/90 flex items-center gap-1 cursor-pointer">
                      <FileText size={10} />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center text-xs">
            <span className="text-gray-brand font-semibold">Triage status: Under Audit Review</span>
            <button 
              onClick={() => alert('Procurement audit case files grouped and saved. Shared with State Auditor.')}
              className="bg-teal-brand hover:bg-teal-brand/90 text-white font-bold text-xs py-2 px-4 rounded cursor-pointer transition-all"
            >
              Request Contractor Audit Brief
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
