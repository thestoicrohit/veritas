import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Database, 
  Cpu, 
  Map, 
  FileText, 
  CheckCircle, 
  Play, 
  ArrowRight, 
  ExternalLink,
  Layers
} from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, isDarkMode, onTriggerScenario }) {
  const [activeTab, setActiveTab] = useState(1);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      id: 'ingestion',
      title: '1. e-SAKSHI Ingestion',
      subtitle: 'Data Sync from mplads.gov.in',
      icon: Database,
      color: 'text-teal-brand bg-teal-50 border-teal-200',
      badge: 'LIVE DATA FEED',
      summary: 'Ingests public works data directly from MoSPI e-SAKSHI portal.',
      details: [
        'Ingests MP Recommendation IDs, Nodal Districts, and MP Constituency details.',
        'Tracks Administrative Sanction Amounts, Installment Releases, and Implementing Agencies (PWD, DRDA, Jal Nigam).',
        'Monitors reported Physical Progress % against Cumulative Expenditure Incurred.',
        'Maintains full audit logs for both Lok Sabha and Rajya Sabha sanctioned works.'
      ],
      scenarioId: 'cost_deviation',
      scenarioLabel: 'Test Ingestion Anomaly (Jabalpur Road Work)'
    },
    {
      step: 2,
      id: 'anomaly',
      title: '2. AI Risk Intelligence',
      subtitle: 'Multi-Signal Anomaly Engine',
      icon: Cpu,
      color: 'text-amber-brand bg-amber-50 border-amber-200',
      badge: 'ISOLATION FOREST + Z-SCORE',
      summary: 'Computes multi-dimensional risk scores (0-100) using 5 distinct AI signals.',
      details: [
        'Financial Anomaly Signal: Isolation Forest + Z-score cost deviation from regional prototype baselines (e.g. 3.5× cost jump).',
        'Progress Gap Signal: Detects severe mismatches (e.g., 92% funds spent vs 18% physical completion).',
        'Geospatial Proximity Signal: Haversine distance formula flags duplicate works sanctioned within 50 metres.',
        'Visual Evidence Signal: Computer Vision image difference (OpenCV absdiff & threshold) detects zero/low site change.',
        'Procurement Splitting Signal: Detects repeat contractors receiving multiple split works under ₹10L threshold.'
      ],
      scenarioId: 'mismatch',
      scenarioLabel: 'Test Progress Gap Engine (Hyderabad Water Work)'
    },
    {
      step: 3,
      id: 'gis',
      title: '3. GIS & Priority Triage',
      subtitle: 'Interactive Map & Alert Queue',
      icon: Map,
      color: 'text-orange-brand bg-orange-50 border-orange-200',
      badge: 'SPATIAL OVERLAY',
      summary: 'Maps projects geographically and triages audit priorities in real-time.',
      details: [
        'National Leaflet GIS Map with color-coded markers scaled by Risk Priority Score.',
        'Scatter plot dispersion diagram mapping Expenditure Utilization % vs Physical Progress %.',
        'Real-time Anomaly Alerts feed for immediate auditor assignment.',
        'Automated spatial duplicate cluster detection (e.g. Varanasi works VR-VNS-047 & 048 within 43m).'
      ],
      scenarioId: 'duplicate',
      scenarioLabel: 'Test Spatial Duplicate Detection (Varanasi Works)'
    },
    {
      step: 4,
      id: 'verification',
      title: '4. Verification & Briefs',
      subtitle: 'Satellite Slider & MoSPI Brief',
      icon: FileText,
      color: 'text-red-brand bg-red-50 border-red-200',
      badge: '1-CLICK AUDIT REPORT',
      summary: 'Enables photo evidence slider comparison and instant formal audit brief generation.',
      details: [
        'Interactive Before/After Satellite Photo Slider with real-time CV Change Score.',
        'One-Click Audit Brief compiler generating official MoSPI Markdown & HTML briefing reports.',
        'Direct "Mark for Field Verification" button notifying district inspectors.',
        'Full export to printable PDF/Markdown for official government record keeping.'
      ],
      scenarioId: 'visual',
      scenarioLabel: 'Test Visual Slider & Report Generator'
    }
  ];

  const handleStartGuidedTour = () => {
    setIsPlayingTour(true);
    setTourStep(1);
    setActiveTab(1);

    setTimeout(() => {
      setTourStep(2);
      setActiveTab(2);
    }, 2500);

    setTimeout(() => {
      setTourStep(3);
      setActiveTab(3);
    }, 5000);

    setTimeout(() => {
      setTourStep(4);
      setActiveTab(4);
    }, 7500);

    setTimeout(() => {
      setIsPlayingTour(false);
      setTourStep(0);
    }, 10000);
  };

  const activeStepObj = steps.find(s => s.step === activeTab) || steps[0];

  return (
    <div className="fixed inset-0 bg-navy/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div 
        className={`w-full max-w-5xl max-h-[92vh] rounded-xl shadow-2xl overflow-hidden flex flex-col border
          ${isDarkMode 
            ? 'bg-[#0E1E32] border-slate-800 text-slate-100' 
            : 'bg-white border-gray-300 text-navy'
          }`}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between
          ${isDarkMode ? 'bg-[#0B1A2C] border-slate-800' : 'bg-navy text-white'}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-brand/20 text-teal-brand rounded-lg">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-brand">MoSPI • SIH PS 26102</span>
                <span className="text-[9px] bg-red-brand text-white px-2 py-0.5 rounded font-mono font-bold uppercase">
                  e-SAKSHI Portal Integration
                </span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">HOW VERITAS WORKS • Operational Architecture</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartGuidedTour}
              disabled={isPlayingTour}
              className="bg-teal-brand hover:bg-teal-brand/90 disabled:opacity-50 text-white text-xs font-extrabold py-1.5 px-4 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Play size={14} fill="currentColor" />
              <span>{isPlayingTour ? `Guided Tour: Step ${tourStep}/4...` : '🚀 Run Guided Demo Tour'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Workflow Diagram Banner */}
        <div className={`px-6 py-3 border-b text-xs flex flex-wrap justify-between items-center gap-2
          ${isDarkMode ? 'bg-[#12253B] border-slate-800 text-slate-300' : 'bg-slate-50 border-gray-200 text-gray-700'}`}
        >
          <div className="flex items-center gap-2 font-mono font-semibold text-[11px]">
            <ExternalLink size={14} className="text-teal-brand" />
            <span>Official Portal Link: <a href="http://mplads.gov.in/" target="_blank" rel="noreferrer" className="text-teal-brand underline font-bold">http://mplads.gov.in/</a></span>
          </div>
          <div className="text-[10px] text-amber-brand font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
            SIMPLIFIED 4-STEP AUDIT PIPELINE ACTIVE
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 4 Pipeline Tabs Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = activeTab === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveTab(s.step)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden
                    ${isActive 
                      ? 'border-teal-brand shadow-md ring-2 ring-teal-brand/30 ' + (isDarkMode ? 'bg-[#162D4A]' : 'bg-teal-50/50')
                      : (isDarkMode ? 'bg-[#10263E] border-slate-800 hover:bg-[#152F4C]' : 'bg-white border-gray-200 hover:bg-gray-50')
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-md ${s.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">0{s.step}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">{s.title}</h4>
                    <p className="text-[10px] text-gray-brand truncate mt-0.5">{s.subtitle}</p>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-brand"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed View */}
          <div className={`p-6 rounded-xl border shadow-sm space-y-5 animate-fade-in
            ${isDarkMode ? 'bg-[#10263E] border-slate-800' : 'bg-white border-gray-200'}`}
          >
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-gray-200/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${activeStepObj.color}`}>
                    {activeStepObj.badge}
                  </span>
                  <span className="text-xs font-extrabold text-teal-brand uppercase tracking-wider">
                    Pipeline Stage {activeStepObj.step} of 4
                  </span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">{activeStepObj.title}</h3>
                <p className="text-xs text-gray-brand max-w-2xl leading-relaxed">{activeStepObj.summary}</p>
              </div>

              {/* Run Trigger Scenario button */}
              <button
                onClick={() => {
                  onClose();
                  if (onTriggerScenario) onTriggerScenario(activeStepObj.scenarioId);
                }}
                className="bg-navy hover:bg-navy/90 text-white text-xs font-extrabold py-2 px-4 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
              >
                <span>{activeStepObj.scenarioLabel}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Stage Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStepObj.details.map((detail, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed flex items-start gap-3
                    ${isDarkMode ? 'bg-[#152B46] border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-200 text-navy'}`}
                >
                  <CheckCircle size={16} className="text-teal-brand flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

          </div>

          {/* e-SAKSHI Portal Integration Architecture Diagram */}
          <div className={`p-5 rounded-xl border shadow-sm
            ${isDarkMode ? 'bg-[#10263E] border-slate-800' : 'bg-[#FCFDFF] border-gray-200'}`}
          >
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy mb-3 flex items-center gap-2">
              <Layers size={14} className="text-teal-brand" />
              <span>Official e-SAKSHI Data Sync & VERITAS AI Pipeline</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-xs font-bold">
              <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#152B46] border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="text-[10px] text-teal-brand uppercase font-mono">Input Source</div>
                <div className="text-sm font-extrabold mt-1">mplads.gov.in</div>
                <div className="text-[9px] text-gray-brand font-normal mt-1">Work recommendations, sanctions, releases & agencies</div>
              </div>

              <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#152B46] border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="text-[10px] text-amber-brand uppercase font-mono">ML & CV Engine</div>
                <div className="text-sm font-extrabold mt-1">VERITAS AI</div>
                <div className="text-[9px] text-gray-brand font-normal mt-1">Isolation Forest, Z-score, Haversine & OpenCV diff</div>
              </div>

              <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#152B46] border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="text-[10px] text-orange-brand uppercase font-mono">GIS & Triage</div>
                <div className="text-sm font-extrabold mt-1">Audit Queue</div>
                <div className="text-[9px] text-gray-brand font-normal mt-1">National map markers, scatter plot & alerts feed</div>
              </div>

              <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-[#152B46] border-slate-800' : 'bg-white border-gray-200'}`}>
                <div className="text-[10px] text-red-brand uppercase font-mono">Output Authority</div>
                <div className="text-sm font-extrabold mt-1">MoSPI Audit Brief</div>
                <div className="text-[9px] text-gray-brand font-normal mt-1">1-click Markdown/HTML brief & field verification dispatch</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-3 border-t flex justify-between items-center text-xs font-semibold
          ${isDarkMode ? 'bg-[#0B1A2C] border-slate-800 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
        >
          <div>Official MoSPI Smart Automation Solution • SIH Problem Statement PS 26102</div>
          <button 
            onClick={onClose}
            className="bg-teal-brand hover:bg-teal-brand/90 text-white font-bold py-1.5 px-4 rounded-lg cursor-pointer transition-all"
          >
            Close Presentation
          </button>
        </div>

      </div>
    </div>
  );
}
