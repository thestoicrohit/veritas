import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { AlertOctagon, HelpCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialIntel({ isDarkMode, onViewProject }) {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        // Filter to show projects with high financial risk scores
        const sorted = [...data].sort((a, b) => b.financial_risk - a.financial_risk);
        setProjects(sorted);
      } catch (err) {
        console.error(err);
      }
    }
    loadProjects();
  }, []);

  const chartData = projects.slice(0, 8).map(p => ({
    name: p.project_id,
    cost: p.sanctioned_amount / 100000.0, // Lakhs
    risk: p.financial_risk,
    progress: p.physical_progress_percent
  }));

  return (
    <div className="space-y-6">
      
      {/* Overview Header */}
      <div className={`p-5 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>
            Financial Intelligence & Baseline Benchmarks
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            Cross-checks project expenditure against regional historical baseline benchmarks. 
            Flagged anomalies identify works costing significantly more than similar works in the same category and city.
          </p>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-[#FFF5E5] text-amber-brand py-1.5 px-3 rounded border border-amber-100">
          <TrendingUp size={14} />
          <span>FINANCIAL AUDIT INTERFACES</span>
        </span>
      </div>

      {/* Main Grid: Outlier Spotting & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Outlier case card */}
        <div className={`p-5 rounded-lg border shadow-sm flex flex-col justify-between
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-200 text-navy'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 pb-3 border-b mb-4">
              <div className="p-2 bg-red-brand/10 text-red-brand rounded-lg">
                <AlertOctagon size={18} />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-tight text-[#C23A34]">
                  Cost Deviation Anomaly
                </h3>
                <span className="text-[10px] text-gray-brand block">Critical outlier project flagged</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-red-50/50 border border-red-200 rounded">
                <span className="text-[10px] font-bold font-mono text-red-brand block">VR-JBP-044 • JABALPUR ROAD WORK</span>
                <div className="mt-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Sanctioned:</span>
                    <span className={`text-xl font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>₹35.0 Lakhs</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold block">Dev. Ratio:</span>
                    <span className="text-xl font-extrabold text-red-brand">3.5×</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Regional Prototype Benchmark:</span>
                  <span>₹10.0 Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Utilization Rate:</span>
                  <span className="text-red-brand">90% spent (₹31.5L)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Physical Progress:</span>
                  <span className="text-red-brand">12% completed</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-brand leading-relaxed pt-2 border-t">
                <strong>Deviation Alert:</strong> The project sanctioned amount of ₹35.0L represents a 3.5× cost deviation compared to the regional baseline average of ₹10.0L for similar road works in Madhya Pradesh. 
              </p>
            </div>
          </div>

          <div className="mt-6 p-2 bg-amber-50/20 rounded border border-amber-200/50 text-[9px] text-amber-brand flex gap-1.5 font-semibold">
            <HelpCircle size={14} className="flex-shrink-0" />
            <span>Benchmark comparison is a prototype comparison based on synthetic records.</span>
          </div>
        </div>

        {/* Bar chart card (2/3 width) */}
        <div className={`p-5 rounded-lg border shadow-sm lg:col-span-2 flex flex-col justify-between
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-200 text-navy'
          }`}
        >
          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'} mb-4`}>
              Top Flagged Projects by Cost (Lakhs) & Financial Risk
            </h3>


            <div className="h-[260px] w-full relative z-10 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={10} stroke="#63707A" />
                  <YAxis fontSize={10} stroke="#63707A" />
                  <Tooltip contentStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="cost" fill="#0F8E84" name="Cost (Lakhs)">
                    {chartData.map((entry, index) => {
                      // Color code very high risk bars red
                      const color = entry.risk >= 80 ? '#C23A34' : entry.risk >= 60 ? '#EB8425' : '#0F8E84';
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-wrap gap-4 items-center justify-between text-xs">
            <div className="flex gap-4 font-bold">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-red-brand rounded"></span>
                <span>Critical Risk (&gt;80)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-orange-brand rounded"></span>
                <span>High Risk (60-80)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-teal-brand rounded"></span>
                <span>Standard Review</span>
              </div>
            </div>
            
            <button 
              onClick={() => onViewProject('VR-JBP-044')}
              className="bg-navy hover:bg-navy/90 text-white font-bold py-1.5 px-3 rounded flex items-center gap-1 cursor-pointer transition-all"
            >
              <span>Inspect VR-JBP-044</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
