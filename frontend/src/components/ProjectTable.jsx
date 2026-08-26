import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  ShieldAlert, 
  AlertOctagon, 
  ArrowUpDown 
} from 'lucide-react';

export default function ProjectTable({ projects, isDarkMode, onViewProject, onSort, sortField, sortOrder }) {
  const getRiskBadge = (level) => {
    switch (level) {
      case 'VERY HIGH RISK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-[#FAEDEC] text-[#C23A34] border border-[#FAEDEC]">
            <AlertOctagon size={12} className="text-[#C23A34]" />
            <span>VERY HIGH</span>
          </span>
        );
      case 'HIGH RISK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-orange-50 text-orange-brand border border-orange-100">
            <ShieldAlert size={12} className="text-orange-brand" />
            <span>HIGH</span>
          </span>
        );
      case 'MEDIUM RISK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-amber-50 text-amber-brand border border-amber-100">
            <AlertTriangle size={12} className="text-amber-brand" />
            <span>MEDIUM</span>
          </span>
        );
      case 'LOW RISK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-teal-50 text-teal-brand border border-teal-100">
            <HelpCircle size={12} className="text-teal-brand" />
            <span>LOW</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-green-50 text-green-brand border border-green-100">
            <ShieldCheck size={12} className="text-green-brand" />
            <span>GOOD</span>
          </span>
        );
    }
  };

  const getActionButton = (level, projId) => {
    let text = 'Monitor';
    let btnStyle = 'text-teal-brand bg-teal-50 hover:bg-teal-100 border border-teal-200';
    
    if (level === 'VERY HIGH RISK') {
      text = 'Verify Priority';
      btnStyle = 'text-white bg-red-brand hover:bg-red-brand/90 shadow-sm';
    } else if (level === 'HIGH RISK') {
      text = 'Verify';
      btnStyle = 'text-white bg-orange-brand hover:bg-orange-brand/90 shadow-sm';
    } else if (level === 'MEDIUM RISK') {
      text = 'Review';
      btnStyle = 'text-amber-brand bg-amber-50 hover:bg-amber-100 border border-amber-200';
    }

    return (
      <button
        onClick={() => onViewProject(projId)}
        className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all hover:-translate-y-0.5 ${btnStyle}`}
      >
        {text}
      </button>
    );
  };

  const renderSortHeader = (label, field) => {
    return (
      <th 
        onClick={() => onSort(field)}
        className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors select-none"
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          <ArrowUpDown size={12} className="text-gray-brand" />
        </div>
      </th>
    );
  };

  return (
    <div className={`border rounded-lg shadow-sm overflow-hidden
      ${isDarkMode 
        ? 'bg-[#10263E] border-slate-800 text-slate-100' 
        : 'bg-white border-gray-200 text-[#0C1F36]'
      }`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-xs">
          <thead className={isDarkMode ? 'bg-[#142B46]' : 'bg-gray-50'}>
            <tr>
              {renderSortHeader('Project ID', 'project_id')}
              <th className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Project</th>
              <th className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">City / District</th>
              {renderSortHeader('Amount', 'sanctioned_amount')}
              {renderSortHeader('Expenditure', 'expenditure_incurred')}
              {renderSortHeader('Progress', 'physical_progress_percent')}
              {renderSortHeader('Risk Score', 'overall_risk_score')}
              <th className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-4 py-3 border-b text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">Primary Indicator</th>
              <th className="px-4 py-3 border-b text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          
          <tbody className={`divide-y divide-gray-200/50 ${isDarkMode ? 'divide-slate-800' : 'divide-gray-100'}`}>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck size={28} className="text-gray-400" />
                    <span className="font-semibold">No Projects Found</span>
                    <span className="text-xs">Adjust your search or filter configuration.</span>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr 
                  key={proj.project_id} 
                  className={`transition-colors hover:bg-gray-50/50 ${isDarkMode ? 'hover:bg-[#152F4C]' : 'hover:bg-slate-50/50'}`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-navy truncate">{proj.project_id}</td>
                  <td className="px-4 py-3 font-semibold truncate max-w-[200px]" title={proj.project_title}>
                    {proj.project_title}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      proj.category === 'Building' ? 'bg-indigo-50 text-indigo-700' :
                      proj.category === 'Road' ? 'bg-amber-50 text-amber-700' :
                      proj.category === 'Water' ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {proj.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{proj.city}</td>
                  <td className="px-4 py-3 font-semibold">₹{(proj.sanctioned_amount / 100000.0).toFixed(1)} L</td>
                  <td className="px-4 py-3 text-slate-500">₹{(proj.expenditure_incurred / 100000.0).toFixed(1)} L</td>
                  
                  {/* Physical Progress bar */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-teal-brand h-1.5 rounded-full" 
                          style={{ width: `${proj.physical_progress_percent}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[10px] font-semibold">{proj.physical_progress_percent}%</span>
                    </div>
                  </td>
                  
                  {/* Risk Score */}
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold font-mono text-sm ${
                      proj.overall_risk_score >= 80 ? 'text-red-brand' :
                      proj.overall_risk_score >= 60 ? 'text-orange-brand' :
                      proj.overall_risk_score >= 40 ? 'text-amber-brand' : 'text-teal-brand'
                    }`}>
                      {proj.overall_risk_score}
                    </span>
                  </td>
                  
                  <td className="px-4 py-3">{getRiskBadge(proj.risk_level)}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[150px] truncate" title={proj.risk_reasons}>
                    {proj.risk_reasons}
                  </td>
                  <td className="px-4 py-3 text-center">{getActionButton(proj.risk_level, proj.project_id)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
