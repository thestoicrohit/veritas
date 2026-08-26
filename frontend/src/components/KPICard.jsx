import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  ShieldAlert as HighRiskIcon, 
  ShieldCheck, 
  IndianRupee 
} from 'lucide-react';

function CountUp({ end, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (end === 0) return;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function KPICard({ kpis, isDarkMode, onFilterSelect }) {
  const {
    total_projects = 50,
    very_high_risk = 4,
    high_risk = 6,
    medium_risk = 9,
    low_risk = 18,
    good = 13,
    funds_under_review_cr = 2.84
  } = kpis;

  const cardConfig = [
    {
      id: 'all',
      title: 'TOTAL PROJECTS',
      value: total_projects,
      icon: Folder,
      colorClass: 'text-navy',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-slate-500'
    },
    {
      id: 'very_high',
      title: 'VERY HIGH RISK',
      value: very_high_risk,
      icon: ShieldAlert,
      colorClass: 'text-red-brand',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-red-brand',
      badgeText: 'Priority verification',
      badgeColor: 'bg-red-50 text-red-brand'
    },
    {
      id: 'high',
      title: 'HIGH RISK',
      value: high_risk,
      icon: HighRiskIcon,
      colorClass: 'text-orange-brand',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-orange-brand',
      badgeText: 'Verify',
      badgeColor: 'bg-orange-50 text-orange-brand'
    },
    {
      id: 'medium',
      title: 'MEDIUM RISK',
      value: medium_risk,
      icon: AlertTriangle,
      colorClass: 'text-amber-brand',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-amber-brand',
      badgeText: 'Review',
      badgeColor: 'bg-amber-50 text-amber-brand'
    },
    {
      id: 'low',
      title: 'LOW RISK',
      value: low_risk,
      icon: HelpCircle,
      colorClass: 'text-teal-brand',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-teal-brand',
      badgeText: 'Monitor',
      badgeColor: 'bg-teal-50 text-teal-brand'
    },
    {
      id: 'good',
      title: 'GOOD',
      value: good,
      icon: ShieldCheck,
      colorClass: 'text-green-brand',
      bgColor: isDarkMode ? 'bg-[#10263E]' : 'bg-white',
      borderLeft: 'border-l-4 border-green-brand',
      badgeText: 'Normal monitoring',
      badgeColor: 'bg-green-50 text-green-brand'
    }
  ];

  return (
    <div className="space-y-4">
      {/* 6 Grid layout for project risk counts */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cardConfig.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onFilterSelect && onFilterSelect(card.id)}
              className={`p-4 rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 select-none
                ${card.bgColor} ${card.borderLeft}
                ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold tracking-wider uppercase ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'}`}>
                  {card.title}
                </span>
                <Icon size={16} className={card.colorClass} />
              </div>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight">
                  <CountUp end={card.value} />
                </span>
              </div>
              
              {card.badgeText && (
                <div className="mt-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${card.badgeColor}`}>
                    {card.badgeText}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Funds Under Review Hero Card */}
      <div className={`p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 select-none
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-[#FCFDFF] border-gray-200 text-navy'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-brand/10 text-amber-brand rounded-lg">
            <IndianRupee size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Funds Under Review</h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'}`}>
              Associated with flagged demo records (Medium + High + Very High Risk projects)
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-amber-brand tracking-tight">
            ₹{funds_under_review_cr} Cr
          </div>
          <span className="text-[10px] bg-amber-500/10 text-amber-brand font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20">
            AUDIT ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
