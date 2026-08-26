import React, { useState, useRef } from 'react';

export default function ImageSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left mouse button dragged
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[320px] rounded-lg overflow-hidden border border-gray-300 shadow-inner select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Bottom) */}
      <img 
        src={beforeImage} 
        alt="Before Construction" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Before Label */}
      <span className="absolute bottom-2 left-2 bg-navy/80 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded z-20">BEFORE (Early Phase)</span>
      
      {/* After Image (Top, Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={afterImage} 
          alt="After Construction" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* After Label */}
        <span className="absolute bottom-2 right-2 bg-teal-brand/80 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded z-20">AFTER (Completed asset)</span>
      </div>
      
      {/* Vertical Slider line & handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-30 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border border-teal-brand flex items-center justify-center font-extrabold text-[10px] text-teal-brand select-none">
          ⇄
        </div>
      </div>
    </div>
  );
}
