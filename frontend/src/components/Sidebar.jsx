import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  BarChart3, 
  Map, 
  Layers, 
  FileImage, 
  ShieldAlert, 
  FileText, 
  Settings, 
  Menu, 
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isCollapsed, setIsCollapsed, isDarkMode }) {
  const menuItems = [
    { id: 'command-centre', name: 'Command Centre', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects List', icon: FileSpreadsheet },
    { id: 'risk-analytics', name: 'Risk Analytics', icon: BarChart3 },
    { id: 'financial-intel', name: 'Financial Intelligence', icon: TrendingUp },
    { id: 'geo-intel', name: 'Geo Intelligence', icon: Map },
    { id: 'visual-verification', name: 'Visual Verification', icon: FileImage },
    { id: 'procurement', name: 'Procurement', icon: Layers },
    { id: 'alerts', name: 'Alerts Centre', icon: ShieldAlert },
    { id: 'reports', name: 'Reports Briefs', icon: FileText }
  ];

  return (
    <aside 
      className={`flex flex-col transition-all duration-300 border-r border-gray-200 select-none
        ${isCollapsed ? 'w-16' : 'w-64'} 
        ${isDarkMode 
          ? 'bg-[#0B1A2C] border-slate-800 text-slate-100' 
          : 'bg-navy text-[#ECEFF4] border-gray-300'
        }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/20">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-white">VERITAS</span>
            <span className="text-[10px] uppercase bg-teal-brand px-1.5 py-0.5 rounded font-mono font-bold text-white">
              V4
            </span>
          </div>
        )}
        {isCollapsed && (
          <span className="mx-auto text-xl font-bold tracking-wider text-white">V</span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group relative
                ${isActive 
                  ? 'bg-teal-brand text-white shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              {!isCollapsed && <span>{item.name}</span>}
              {isCollapsed && (
                <div className="absolute left-16 bg-navy text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Disclaimer */}
      <div className="p-4 border-t border-gray-200/10 text-center">
        {!isCollapsed ? (
          <div className="space-y-1">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              PROTOTYPE
            </div>
            <div className="text-[9px] text-amber-brand bg-amber-50/10 py-1 px-1.5 rounded font-bold">
              SYNTHETIC DATA ONLY
            </div>
          </div>
        ) : (
          <span className="text-amber-brand text-xs font-bold" title="Prototype - Synthetic Data">⚠️</span>
        )}
      </div>
    </aside>
  );
}
