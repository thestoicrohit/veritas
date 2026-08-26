import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Briefcase, 
  AlertOctagon,
  FileText,
  Map,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { generateAuditBrief } from '../services/api';

function AnimatedRiskRing({ score, riskLevel, isDarkMode }) {
  const [offset, setOffset] = useState(251.2); // Circumference for r=40
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Stagger slightly before animating the ring
    const timer = setTimeout(() => {
      const progressOffset = circumference - (score / 100) * circumference;
      setOffset(progressOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  let color = '#35875A'; // Good
  if (riskLevel === 'LOW RISK') color = '#0F8E84';
  else if (riskLevel === 'MEDIUM RISK') color = '#D99024';
  else if (riskLevel === 'HIGH RISK') color = '#EB8425';
  else if (riskLevel === 'VERY HIGH RISK') color = '#C23A34';

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-28 h-28 transform -rotate-90">
        {/* Track */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          className={`${isDarkMode ? 'stroke-slate-800' : 'stroke-gray-100'}`}
          strokeWidth="10"
          fill="transparent"
        />
        {/* Progress */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-3xl font-extrabold tracking-tight leading-none">{score}</span>
        <span className="text-[10px] block text-gray-500 uppercase font-bold tracking-tight">/ 100</span>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, isDarkMode, onClose, onNavigate }) {
  const [report, setReport] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);

  if (!project) return null;

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    try {
      const res = await generateAuditBrief(project.project_id);
      setReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReport(false);
    }
  };

  const sancLakhs = (project.sanctioned_amount / 100000.0).toFixed(2);
  const spentLakhs = (project.expenditure_incurred / 100000.0).toFixed(2);
  const utilPercent = ((project.expenditure_incurred / project.sanctioned_amount) * 100.0).toFixed(1);

  const signals = [
    { label: 'Financial Anomaly Signal', score: project.financial_risk || 15, max: 100 },
    { label: 'Progress-Utilization Signal', score: project.progress_risk || 10, max: 100 },
    { label: 'Geospatial Proximity Signal', score: project.geo_risk || 10, max: 100 },
    { label: 'Visual Evidence Signal', score: project.visual_risk || 0, max: 100, pending: project.visual_risk === 'Pending' || !project.visual_risk }
  ];

  return (
    <div className="fixed inset-0 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div 
        className={`w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col border
          ${isDarkMode 
            ? 'bg-[#0E1E32] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-300 text-navy'
          }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200/50 flex justify-between items-start bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-gray-brand uppercase tracking-wider">{project.project_id}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono
                ${project.risk_level === 'VERY HIGH RISK' ? 'bg-red-brand text-white' :
                  project.risk_level === 'HIGH RISK' ? 'bg-orange-brand text-white' :
                  project.risk_level === 'MEDIUM RISK' ? 'bg-amber-brand text-white' :
                  project.risk_level === 'LOW RISK' ? 'bg-teal-brand text-white' : 'bg-green-brand text-white'}`}>
                {project.risk_level}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-tight text-navy">{project.project_title}</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-brand mt-1">
              <MapPin size={12} className="text-teal-brand" />
              <span>{project.city}, {project.state} (MP: {project.mp_name})</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-500 hover:text-navy hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Hero Section: Circular meter + Action Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Risk Gauge */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 rounded-lg border border-gray-200/50 text-center h-full">
              <AnimatedRiskRing score={project.overall_risk_score} riskLevel={project.risk_level} isDarkMode={isDarkMode} />
              <div className="mt-2">
                <span className="text-xs font-bold uppercase tracking-wide block">Risk Priority Score</span>
                <span className="text-[10px] text-gray-brand italic">High score triggers immediate verification</span>
              </div>
            </div>

            {/* Core Financial Indicators */}
            <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50 grid grid-cols-2 gap-4 h-full">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-brand block">Sanctioned</span>
                <div className="text-lg font-extrabold text-navy mt-1">₹{sancLakhs} Lakhs</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-brand block">Expenditure</span>
                <div className="text-lg font-extrabold text-navy mt-1">₹{spentLakhs} Lakhs</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-brand block">Utilization</span>
                <div className="text-lg font-extrabold text-navy mt-1">{utilPercent}%</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-brand block">Physical Progress</span>
                <div className="text-lg font-extrabold text-teal-brand mt-1">{project.physical_progress_percent}%</div>
              </div>
            </div>

            {/* Audit Directive Banner */}
            <div className="p-4 bg-red-50/50 border border-red-200 rounded-lg flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex items-center gap-1.5 text-[#C23A34] font-bold text-xs uppercase mb-1">
                  <AlertOctagon size={14} />
                  <span>Recommended Action</span>
                </div>
                <p className="text-sm font-extrabold uppercase text-[#C23A34] tracking-wide">
                  {project.recommended_action}
                </p>
                <p className="text-[10px] text-red-950 mt-1 leading-snug">
                  Verification protocol active. Review supporting geospatial and visual documentation.
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => { onNavigate('visual-verification'); onClose(); }}
                  className="bg-navy text-white text-[10px] font-bold py-1.5 px-3 rounded hover:bg-navy/90 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Eye size={12} />
                  <span>Inspect Visuals</span>
                </button>
                <button 
                  onClick={() => { onNavigate('geo-intel'); onClose(); }}
                  className="bg-teal-brand text-white text-[10px] font-bold py-1.5 px-3 rounded hover:bg-teal-brand/90 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Map size={12} />
                  <span>Open Map</span>
                </button>
              </div>
            </div>

          </div>

          {/* Explainable Risk Reasons Details */}
          <div className="p-4 bg-amber-50/30 border border-amber-200/50 rounded-lg">
            <h3 className="text-xs font-extrabold text-amber-brand uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle size={14} />
              <span>Assessment Breakdown (Explainable AI Signals)</span>
            </h3>
            <div className="text-xs space-y-1.5 text-navy font-medium leading-relaxed">
              <p><strong>Financial Analysis:</strong> {project.details_why_flagged?.financial}</p>
              <p><strong>Progress Analysis:</strong> {project.details_why_flagged?.progress}</p>
              <p><strong>Spatial Analytics:</strong> {project.details_why_flagged?.geo}</p>
              <p><strong>Imagery Evidence:</strong> {project.details_why_flagged?.evidence}</p>
            </div>
          </div>

          {/* Risk Score Composition Matrix */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy mb-3">
              Risk Component Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.map((sig, idx) => (
                <div key={idx} className="p-3 bg-gray-50/50 rounded border border-gray-200/40 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{sig.label}</span>
                    <span className="font-mono font-bold text-navy">
                      {sig.pending ? 'PENDING' : `${sig.score} / ${sig.max}`}
                    </span>
                  </div>
                  {sig.pending ? (
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full w-1/3 animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          sig.score >= 80 ? 'bg-red-brand' :
                          sig.score >= 60 ? 'bg-orange-brand' :
                          sig.score >= 40 ? 'bg-amber-brand' : 'bg-teal-brand'
                        }`} 
                        style={{ width: `${sig.score}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audit Report Preview Block */}
          {report && (
            <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg animate-fade-in">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-300">
                <span className="text-xs font-extrabold uppercase text-navy">Audit Brief Generated</span>
                <button
                  onClick={() => window.print()}
                  className="bg-navy hover:bg-navy/90 text-white text-[10px] font-bold py-1 px-2.5 rounded cursor-pointer transition-all"
                >
                  Print Report
                </button>
              </div>
              {/* Inject generated html */}
              <div 
                className="overflow-y-auto max-h-[300px] border border-gray-200 rounded p-2 bg-white"
                dangerouslySetInnerHTML={{ __html: report.html }}
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-200/50 flex justify-between items-center bg-gray-50/50">
          <div className="text-[10px] text-gray-500 italic">
            Ground-truth verification remaining authority.
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleGenerateReport}
              disabled={loadingReport}
              className="bg-navy hover:bg-navy/85 text-white text-xs font-bold py-1.5 px-4 rounded border border-navy cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <FileText size={14} />
              <span>{loadingReport ? 'Compiling...' : 'Generate Audit Brief'}</span>
            </button>
            
            <button 
              onClick={() => { alert('Project marked for human field audit verification. Alert notifications dispatched to district inspector.'); onClose(); }}
              className="bg-teal-brand hover:bg-teal-brand/85 text-white text-xs font-bold py-1.5 px-4 rounded border border-teal-brand cursor-pointer transition-all flex items-center gap-1.5"
            >
              <CheckCircle size={14} />
              <span>Mark for Field Verification</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
