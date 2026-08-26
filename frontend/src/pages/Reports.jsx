import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, CheckCircle, Info } from 'lucide-react';
import { fetchProjects, generateAuditBrief } from '../services/api';

export default function Reports({ isDarkMode }) {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        // Sort to show high risk first
        const sorted = [...data].sort((a, b) => b.overall_risk_score - a.overall_risk_score);
        setProjects(sorted);
        if (sorted.length > 0) {
          setSelectedId(sorted[0].project_id);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadProjects();
  }, []);

  const handleGenerateReport = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const data = await generateAuditBrief(selectedId);
      setReport(data);
    } catch (e) {
      console.error(e);
      alert('Failed to compile audit report.');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-base font-bold tracking-tight text-navy">
            Audit Brief Generator
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            Select a project and click to compile a formal audit intelligence brief suitable for review by MoSPI inspectors.
          </p>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-[#FFF5E5] text-amber-brand py-1.5 px-3 rounded border border-amber-100">
          <Info size={14} />
          <span>OFFICIAL REVIEW SPECIFICATIONS</span>
        </span>
      </div>

      {/* Select panel */}
      <div className={`p-5 rounded-lg border shadow-sm flex flex-wrap items-end gap-4
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="flex-1 min-w-[250px] space-y-1.5">
          <label className="text-xs font-bold text-gray-brand uppercase tracking-wider block">
            Select Target Project for Briefing
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className={`w-full px-3 py-2 rounded border text-xs focus:outline-none focus:border-teal-brand font-semibold
              ${isDarkMode ? 'bg-[#152B46] border-slate-700 text-slate-200' : 'bg-white border-gray-300'}`}
          >
            {projects.map((proj) => (
              <option key={proj.project_id} value={proj.project_id}>
                {proj.project_id} - {proj.project_title} ({proj.risk_level} - Score: {proj.overall_risk_score})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={loading || !selectedId}
          className="bg-navy hover:bg-navy/85 disabled:opacity-50 text-white font-bold text-xs py-2 px-6 rounded cursor-pointer transition-all flex items-center gap-1.5 h-9"
        >
          <FileText size={14} />
          <span>{loading ? 'Compiling Audit Data...' : 'Compile Briefing'}</span>
        </button>
      </div>

      {/* Report Preview */}
      {report ? (
        <div className={`p-6 rounded-lg border shadow-sm space-y-4 animate-fade-in
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-200 text-navy'
          }`}
        >
          {/* Controls */}
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-xs font-extrabold uppercase text-navy">Document Preview</span>
            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="bg-navy hover:bg-navy/90 text-white text-xs font-bold py-1.5 px-4 rounded cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Print Document</span>
              </button>
              <button 
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([report.markdown], {type: 'text/markdown'});
                  element.href = URL.createObjectURL(file);
                  element.download = `VERITAS-AUDIT-BRIEF-${selectedId}.md`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="bg-teal-brand hover:bg-teal-brand/90 text-white text-xs font-bold py-1.5 px-4 rounded cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>

          {/* HTML Brief Container */}
          <div className="bg-slate-100 p-4 rounded-lg overflow-y-auto max-h-[500px]">
            <div 
              className="bg-white border p-4 shadow-sm"
              dangerouslySetInnerHTML={{ __html: report.html }}
            />
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-gray-500 border border-dashed rounded-lg">
          <FileText size={32} className="mx-auto mb-2 text-gray-400" />
          <span className="font-semibold block text-xs">No Report Compiled</span>
          <span className="text-[10px]">Select a project from the dropdown list above and click Compile Briefing to generate the document.</span>
        </div>
      )}

    </div>
  );
}
