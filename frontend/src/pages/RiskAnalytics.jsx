import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { fetchAnalytics } from '../services/api';
import { AlertCircle, ArrowRight } from 'lucide-react';

const CustomTooltip = ({ active, payload, isDarkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={`p-3 rounded border text-xs shadow-md font-sans max-w-[240px]
        ${isDarkMode ? 'bg-[#0F223A] border-slate-800 text-slate-100' : 'bg-white border-gray-300 text-navy'}`}
      >
        <div className="flex justify-between items-center mb-1 pb-1 border-b">
          <span className="font-bold font-mono">{data.project_id}</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white
            ${data.risk_level === 'VERY HIGH RISK' ? 'bg-red-brand' :
              data.risk_level === 'HIGH RISK' ? 'bg-orange-brand' :
              data.risk_level === 'MEDIUM RISK' ? 'bg-amber-brand' :
              data.risk_level === 'LOW RISK' ? 'bg-teal-brand' : 'bg-green-brand'}`}>
            Risk: {data.risk_score}
          </span>
        </div>
        <p className="font-semibold mb-1 truncate">{data.title}</p>
        <p className="text-[10px] text-gray-500">District: {data.city}</p>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] uppercase font-bold text-gray-700">
          <div>Util: {data.expenditure_utilization}%</div>
          <div>Prog: {data.physical_progress}%</div>
        </div>
        <div className="mt-2 pt-1 border-t text-[9px] text-teal-brand font-bold text-right flex items-center justify-end gap-1 cursor-pointer">
          <span>Click to inspect details</span>
          <ArrowRight size={10} />
        </div>
      </div>
    );
  }
  return null;
};

export default function RiskAnalytics({ isDarkMode, onViewProject, filterState }) {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchAnalytics(filterState);
        setPlotData(res.scatter_plot || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [filterState]);

  // Click handler for scatter dot
  const handleDotClick = (data) => {
    if (data && data.project_id) {
      onViewProject(data.project_id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Explanation Banner */}
      <div className={`p-5 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="space-y-1">
          <h2 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>
            Expenditure vs Physical Progress Analytics
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            This diagram maps <strong>Expenditure Utilization %</strong> against reported <strong>Physical Progress %</strong>. 
            Healthy project milestones align closely with the diagonal reference line. Points in the bottom-right quadrant represent anomalous cases where financial disbursement is disproportionately high relative to actual ground-level construction.
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold bg-red-50 text-red-brand py-1.5 px-3 rounded border border-red-100">
            <AlertCircle size={12} />
            <span>OUTLIER DETECTED</span>
          </span>
        </div>
      </div>

      {/* Main Scatter Chart Card */}
      <div className={`p-6 rounded-lg border shadow-sm flex flex-col
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="mb-4">
          <h3 className={`text-xs font-extrabold uppercase tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-navy'}`}>
            Milestone Dispersion Chart
          </h3>

          <p className="text-[10px] text-gray-brand">
            Interactive view • Click on any node dot to view complete audit logs and details
          </p>
        </div>

        {/* Recharts container */}
        <div className="h-[400px] w-full relative z-10 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              
              <XAxis 
                type="number" 
                dataKey="expenditure_utilization" 
                name="Expenditure Utilization" 
                unit="%" 
                domain={[0, 100]}
                fontSize={10}
                tickCount={6}
                stroke="#63707A"
              />
              <YAxis 
                type="number" 
                dataKey="physical_progress" 
                name="Physical Progress" 
                unit="%" 
                domain={[0, 100]}
                fontSize={10}
                tickCount={6}
                stroke="#63707A"
              />
              
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} cursor={{ strokeDasharray: '3 3', stroke: '#63707A' }} />
              
              {/* Healthy diagonal reference line */}
              <ReferenceLine 
                segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]} 
                stroke="#0F8E84" 
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{ value: 'Healthy Progression Path', position: 'insideTopLeft', fontSize: 10, fill: '#0F8E84', fontWeight: 'bold' }}
              />

              {/* Anomalous Outliers reference zone or just plot scatter */}
              <Scatter 
                name="MPLADS Projects" 
                data={plotData} 
                onClick={handleDotClick}
                cursor="pointer"
              >
                {plotData.map((entry, index) => {
                  let color = '#35875A'; // Good
                  if (entry.risk_level === 'LOW RISK') color = '#0F8E84';
                  else if (entry.risk_level === 'MEDIUM RISK') color = '#D99024';
                  else if (entry.risk_level === 'HIGH RISK') color = '#EB8425';
                  else if (entry.risk_level === 'VERY HIGH RISK') color = '#C23A34';
                  
                  // Highlight outliers with larger sizes
                  const isOutlier = entry.risk_level === 'VERY HIGH RISK' || entry.risk_level === 'HIGH RISK';
                  const radius = isOutlier ? 10 : 6;
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={color} 
                      r={radius} 
                      stroke="#FFFFFF" 
                      strokeWidth={1}
                      className="hover:scale-125 transition-transform"
                    />
                  );
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Legend panel */}
        <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-wrap gap-6 items-center justify-center text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-brand border border-white"></span>
            <span>Very High Risk (Outlier)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-orange-brand border border-white"></span>
            <span>High Risk (Outlier)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-brand border border-white"></span>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-brand border border-white"></span>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-brand border border-white"></span>
            <span>Good</span>
          </div>
        </div>

      </div>

    </div>
  );
}
