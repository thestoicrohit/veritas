import React, { useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import { uploadVisualVerification } from '../services/api';
import { FileImage, AlertTriangle, ShieldCheck, Upload, RotateCcw } from 'lucide-react';

export default function VisualVerification({ isDarkMode }) {
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  
  // Default values pointing to our seeded images
  const [beforePreview, setBeforePreview] = useState('/cv/sample_images/school_before.png');
  const [afterPreview, setAfterPreview] = useState('/cv/sample_images/school_after.png');
  
  const [score, setScore] = useState(82);
  const [statusText, setStatusText] = useState('Significant visual change detected');
  const [loading, setLoading] = useState(false);

  const handleBeforeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeFile(file);
      setBeforePreview(URL.createObjectURL(file));
    }
  };

  const handleAfterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAfterFile(file);
      setAfterPreview(URL.createObjectURL(file));
    }
  };

  const handleRunComparison = async () => {
    if (!beforeFile || !afterFile) {
      alert('Please upload both Before and After image files to execute cv analysis.');
      return;
    }

    setLoading(true);
    try {
      const data = await uploadVisualVerification(beforeFile, afterFile);
      if (data.success) {
        setScore(data.change_score);
        setStatusText(data.status);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to analyze images. Check API status.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBeforeFile(null);
    setAfterFile(null);
    setBeforePreview('/cv/sample_images/school_before.png');
    setAfterPreview('/cv/sample_images/school_after.png');
    setScore(82);
    setStatusText('Significant visual change detected');
  };

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
          <h2 className="text-base font-bold tracking-tight text-navy">
            Visual Evidence Analysis (CV Change Detection)
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'} max-w-2xl leading-relaxed`}>
            Processes before/after photographs through computer vision algorithms to estimate physical construction changes.
            A low change score despite high project funds spent triggers a warning alert.
          </p>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-bold bg-[#EBF7F5] text-teal-brand py-1.5 px-3 rounded border border-teal-100">
          <ShieldCheck size={14} />
          <span>VISUAL EVIDENCE ACTIVE</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Slider comparison column (2/3 width) */}
        <div className={`p-5 rounded-lg border shadow-sm flex flex-col justify-between lg:col-span-2
          ${isDarkMode 
            ? 'bg-[#10263E] border-slate-800' 
            : 'bg-white border-gray-200'
          }`}
        >
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-navy mb-4">
              Image Comparison Slider
            </h3>
            
            <ImageSlider beforeImage={beforePreview} afterImage={afterPreview} />
          </div>

          <div className="mt-4 p-3 bg-gray-50/50 rounded border border-gray-200/50 text-[10px] text-gray-brand leading-relaxed font-semibold">
            * Drag or click the center slider handle left/right to compare the development milestones between the two photos.
          </div>
        </div>

        {/* CV Metrics and Upload Controls Column (1/3 width) */}
        <div className="space-y-6">
          
          {/* CV Score gauge */}
          <div className={`p-5 rounded-lg border shadow-sm text-center flex flex-col justify-between items-center h-[180px]
            ${isDarkMode 
              ? 'bg-[#10263E] border-slate-800 text-slate-100' 
              : 'bg-white border-gray-200 text-navy'
            }`}
          >
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-tight text-navy mb-1">
                Visual Difference Score
              </h3>
              <span className="text-[10px] text-gray-brand block">CV change estimation percentage</span>
            </div>

            <div className="my-2">
              <span className={`text-4xl font-extrabold tracking-tight ${score > 50 ? 'text-teal-brand' : 'text-red-brand'}`}>
                {score} <span className="text-xs text-gray-500 font-bold">/ 100</span>
              </span>
              <span className={`text-[10px] font-bold block uppercase mt-1 ${score > 50 ? 'text-teal-brand' : 'text-red-brand'}`}>
                {statusText}
              </span>
            </div>
            
            <div className="text-[9px] text-gray-brand leading-none">
              Prototype change algorithm active.
            </div>
          </div>

          {/* Upload forms card */}
          <div className={`p-5 rounded-lg border shadow-sm flex flex-col gap-4
            ${isDarkMode 
              ? 'bg-[#10263E] border-slate-800' 
              : 'bg-white border-gray-200'
            }`}
          >
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-navy">
              Upload Custom Verification Photos
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Before Upload */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-brand transition-colors h-28">
                <Upload size={18} className="text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">Before Photo</span>
                <span className="text-[8px] text-slate-400 mt-1 max-w-[80px] truncate">
                  {beforeFile ? beforeFile.name : 'Select file'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleBeforeUpload} />
              </label>

              {/* After Upload */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-brand transition-colors h-28">
                <Upload size={18} className="text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">After Photo</span>
                <span className="text-[8px] text-slate-400 mt-1 max-w-[80px] truncate">
                  {afterFile ? afterFile.name : 'Select file'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAfterUpload} />
              </label>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleRunComparison}
                disabled={loading || !beforeFile || !afterFile}
                className="flex-1 bg-teal-brand hover:bg-teal-brand/90 disabled:opacity-50 text-white font-bold text-xs py-2 px-3 rounded flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                {loading ? 'Comparing...' : 'Run Analysis'}
              </button>
              
              <button 
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-navy font-bold text-xs p-2 rounded flex items-center justify-center cursor-pointer transition-all"
                title="Reset to default seed photos"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="p-2.5 bg-amber-50/20 rounded border border-amber-200/50 text-[9px] text-amber-brand leading-relaxed font-semibold">
              ⚠️ Prototype visual verification. Ground verification remains authoritative.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
