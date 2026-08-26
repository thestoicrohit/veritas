import React from 'react';
import { Sun, Moon, Bell, User } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, notificationsCount = 4 }) {
  return (
    <header className={`h-16 flex items-center justify-between px-6 border-b select-none
      ${isDarkMode 
        ? 'bg-[#0B1A2C] border-slate-800 text-slate-100' 
        : 'bg-white border-gray-200 text-[#0C1F36]'
      }`}
    >
      {/* Title & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold tracking-tight">VERITAS COMMAND CENTRE</h2>
          <span className="text-[9px] font-mono font-extrabold bg-red-brand text-white px-2 py-0.5 rounded tracking-wider animate-pulse uppercase">
            Demo Mode • Synthetic Records
          </span>
        </div>
        <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'}`}>
          See the signals. Verify the reality. <span className="mx-1">•</span> <span className="font-semibold text-teal-brand">PS 26102 • MoSPI • Smart Automation</span>
        </p>
      </div>

      {/* Control Area */}
      <div className="flex items-center gap-4">
        {/* Dark/Light mode switch */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg border transition-all
            ${isDarkMode 
              ? 'border-slate-800 bg-[#12253B] text-amber-brand hover:bg-[#1A314E]' 
              : 'border-gray-200 bg-gray-50 text-navy hover:bg-gray-100'
            }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            className={`p-2 rounded-lg border transition-all
              ${isDarkMode 
                ? 'border-slate-800 bg-[#12253B] text-slate-300 hover:bg-[#1A314E]' 
                : 'border-gray-200 bg-gray-50 text-navy hover:bg-gray-100'
              }`}
          >
            <Bell size={16} />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-brand rounded-full"></span>
            )}
          </button>
        </div>

        {/* Profile Card */}
        <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-medium
          ${isDarkMode 
            ? 'border-slate-800 bg-[#12253B] text-slate-200' 
            : 'border-gray-200 bg-gray-50 text-navy'
          }`}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-brand/20 text-teal-brand">
            <User size={14} />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-bold leading-none">MoSPI Monitor</div>
            <div className={`text-[9px] ${isDarkMode ? 'text-slate-400' : 'text-gray-brand'}`}>Audit Authority</div>
          </div>
        </div>
      </div>
    </header>
  );
}
