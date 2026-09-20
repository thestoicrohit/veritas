import React, { useState } from 'react';
import { PlayCircle, Sparkles, X } from 'lucide-react';

export default function DemoPanel({ onTriggerScenario, onOpenHowItWorks }) {
  const [isOpen, setIsOpen] = useState(true);

  const scenarios = [
    {
      id: 'cost_deviation',
      label: '1. COST DEVIATION',
      desc: 'VR-JBP-044 (₹35L vs ₹10L baseline) • VERY HIGH RISK',
      color: 'bg-red-brand text-white border-red-700'
    },
    {
      id: 'mismatch',
      label: '2. PROGRESS MISMATCH',
      desc: 'VR-HYD-032 (92% spent vs 18% progress) • VERY HIGH RISK',
      color: 'bg-orange-brand text-white border-orange-750'
    },
    {
      id: 'duplicate',
      label: '3. SPATIAL DUPLICATE',
      desc: 'VR-VNS-047 & 048 (Varanasi, 43m distance) • HIGH RISK',
      color: 'bg-amber-brand text-white border-amber-700'
    },
    {
      id: 'visual',
      label: '4. VISUAL VERIFICATION',
      desc: 'Open Before/After Image comparison slider',
      color: 'bg-teal-brand text-white border-teal-700'
    },
    {
      id: 'procurement',
      label: '5. PROCUREMENT CLUSTER',
      desc: 'Lucknow Contractor A (3 works split under ₹10L)',
      color: 'bg-navy text-white border-slate-700'
    }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#0C1F36] hover:bg-[#10263E] text-white border border-slate-700 p-2.5 rounded-full shadow-lg flex items-center gap-1.5 cursor-pointer text-xs font-bold font-mono transition-transform hover:scale-105"
      >
        <Sparkles size={16} className="text-amber-brand animate-pulse" />
        <span>DEMO CONSOLE</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[300px] rounded-lg shadow-xl border border-gray-300 bg-white text-navy font-sans select-none overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-[#0C1F36] text-white px-3 py-2 flex items-center justify-between font-mono font-bold text-xs border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-brand animate-pulse" />
          <span>DEMO SCENARIOS</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-300 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>

      {/* Scenarios List */}
      <div className="p-3 space-y-2 max-h-[320px] overflow-y-auto bg-slate-50/50">
        {onOpenHowItWorks && (
          <button
            onClick={onOpenHowItWorks}
            className="w-full bg-teal-brand hover:bg-teal-brand/90 text-white font-extrabold text-xs p-2 rounded flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102"
          >
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span>Launch 4-Step Guided Tour</span>
          </button>
        )}

        <p className="text-[10px] text-gray-brand italic font-semibold">
          Click any scenario to execute the 3-minute hackathon demo sequence:
        </p>

        
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => onTriggerScenario(scen.id)}
            className={`w-full text-left p-2.5 rounded border border-b-2 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all flex flex-col gap-0.5
              ${scen.color}`}
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-[11px] font-bold tracking-tight">{scen.label}</span>
              <PlayCircle size={14} className="text-white" />
            </div>
            <span className="text-[9px] opacity-90 truncate w-full leading-tight font-medium">
              {scen.desc}
            </span>
          </button>
        ))}
      </div>
      
      {/* Footer */}
      <div className="bg-[#F7F8FA] border-t px-3 py-1.5 text-[9px] text-center italic text-gray-brand font-semibold">
        "AI flags risk. Humans verify the case."
      </div>
    </div>
  );
}
