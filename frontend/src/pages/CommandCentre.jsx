import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, RotateCcw, AlertTriangle, ShieldCheck, ShieldAlert, ArrowRight } from 'lucide-react';
import KPICard from '../components/KPICard';
import IndiaMap from '../components/IndiaMap';
import ProjectTable from '../components/ProjectTable';
import { fetchAnalytics, fetchProjects } from '../services/api';

export default function CommandCentre({ isDarkMode, onViewProject, filterState, setFilterState }) {
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Sorting state
  const [sortField, setSortField] = useState('overall_risk_score');
  const [sortOrder, setSortOrder] = useState('desc');

  // Load data based on filters
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const projData = await fetchProjects(filterState);
        const analData = await fetchAnalytics(filterState);
        setProjects(projData);
        setAnalytics(analData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filterState]);

  const handleFilterChange = (key, value) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilterState({
      state: '',
      city: '',
      category: '',
      risk_level: '',
      search: '',
      reason: ''
    });
  };

  const handleKPISelect = (riskId) => {
    let level = '';
    if (riskId === 'very_high') level = 'VERY HIGH RISK';
    else if (riskId === 'high') level = 'HIGH RISK';
    else if (riskId === 'medium') level = 'MEDIUM RISK';
    else if (riskId === 'low') level = 'LOW RISK';
    else if (riskId === 'good') level = 'GOOD';
    
    setFilterState(prev => ({
      ...prev,
      risk_level: level
    }));
  };

  // Sort handler
  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortField(field);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  // Sort logic
  const sortedProjects = [...projects].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (typeof valA === 'string') {
      return sortOrder === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    }
    
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  const pieData = analytics?.risk_distribution || [];

  return (
    <div className="space-y-6">
      
      {/* Filters Panel */}
      <div className={`p-4 rounded-lg border shadow-sm flex flex-wrap gap-4 items-center justify-between
        ${isDarkMode 
          ? 'bg-[#10263E] border-slate-800 text-slate-100' 
          : 'bg-white border-gray-200 text-navy'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <Filter size={14} className="text-teal-brand" />
            <span>FILTERS</span>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search project, ID, district..."
            value={filterState.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={`px-3 py-1.5 rounded border text-xs focus:outline-none focus:border-teal-brand min-w-[200px]
              ${isDarkMode ? 'bg-[#152B46] border-slate-700 text-slate-200' : 'bg-white border-gray-300'}`}
          />

          {/* Category Dropdown */}
          <select
            value={filterState.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={`px-3 py-1.5 rounded border text-xs focus:outline-none focus:border-teal-brand
              ${isDarkMode ? 'bg-[#152B46] border-slate-700 text-slate-200' : 'bg-white border-gray-300'}`}
          >
            <option value="">All Categories</option>
            <option value="Building">Building</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Solar">Solar</option>
          </select>

          {/* City Dropdown */}
          <select
            value={filterState.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className={`px-3 py-1.5 rounded border text-xs focus:outline-none focus:border-teal-brand
              ${isDarkMode ? 'bg-[#152B46] border-slate-700 text-slate-200' : 'bg-white border-gray-300'}`}
          >
            <option value="">All Districts</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Jabalpur">Jabalpur</option>
            <option value="Varanasi">Varanasi</option>
          </select>

          {/* Risk Level Dropdown */}
          <select
            value={filterState.risk_level}
            onChange={(e) => handleFilterChange('risk_level', e.target.value)}
            className={`px-3 py-1.5 rounded border text-xs focus:outline-none focus:border-teal-brand
              ${isDarkMode ? 'bg-[#152B46] border-slate-700 text-slate-200' : 'bg-white border-gray-300'}`}
          >
            <option value="">All Risks</option>
            <option value="GOOD">GOOD (0-20)</option>
            <option value="LOW RISK">LOW RISK (21-40)</option>
            <option value="MEDIUM RISK">MEDIUM RISK (41-60)</option>
            <option value="HIGH RISK">HIGH RISK (61-80)</option>
            <option value="VERY HIGH RISK">VERY HIGH RISK (81-100)</option>
          </select>
        </div>

        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1.5 text-xs text-gray-brand border border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded transition-all cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* KPI Cards section */}
      {analytics && (
        <KPICard 
          kpis={analytics.kpis} 
          isDarkMode={isDarkMode} 
          onFilterSelect={handleKPISelect} 
        />
      )}

      {/* Middle Row: GIS map and Risk Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map column (2/3 width on desktop) */}
        <div className="lg:col-span-2">
          <IndiaMap 
            projects={projects} 
            isDarkMode={isDarkMode} 
            onViewProject={onViewProject}
            selectedCoords={filterState.selectedCoords}
          />
        </div>

        {/* Risk Distribution Donut + Top Alert Feed (1/3 width) */}
        <div className="flex flex-col gap-6">
          
          {/* Donut Card */}
          <div className={`p-4 rounded-lg border shadow-sm flex flex-col justify-between h-[230px]
            ${isDarkMode 
              ? 'bg-[#10263E] border-slate-800 text-slate-100' 
              : 'bg-white border-gray-200 text-navy'
            }`}
          >
            <h3 className="text-xs font-extrabold uppercase tracking-tight mb-2">
              Risk Profile Distribution
            </h3>
            
            <div className="flex-1 min-h-[140px] flex items-center justify-between">
              <div className="w-[120px] h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Text Legend with filter trigger */}
              <div className="flex-1 pl-4 space-y-1 text-[10px] font-bold">
                {pieData.map((d, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleKPISelect(d.name === 'VERY HIGH RISK' ? 'very_high' : d.name === 'HIGH RISK' ? 'high' : d.name === 'MEDIUM RISK' ? 'medium' : d.name === 'LOW RISK' ? 'low' : 'good')}
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-100/10 p-0.5 rounded transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                      <span>{d.name}</span>
                    </div>
                    <span>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Priority Audits Panel */}
          <div className={`p-4 rounded-lg border shadow-sm flex flex-col h-[226px]
            ${isDarkMode 
              ? 'bg-[#10263E] border-slate-800 text-slate-100' 
              : 'bg-white border-gray-200 text-navy'
            }`}
          >
            <h3 className="text-xs font-extrabold uppercase tracking-tight mb-3">
              Top Priority Review Feed
            </h3>
            
            <div className="flex-1 space-y-2.5 overflow-y-auto">
              {projects
                .filter(p => p.risk_level === 'VERY HIGH RISK')
                .slice(0, 3)
                .map(p => (
                  <div 
                    key={p.project_id}
                    onClick={() => onViewProject(p.project_id)}
                    className="p-2 border border-red-300 bg-[#FAEDEC] text-[#C23A34] rounded flex justify-between items-center hover:bg-red-100/50 cursor-pointer transition-all hover:scale-101"
                  >
                    <div>
                      <div className="font-mono font-bold text-xs">{p.project_id}</div>
                      <div className="text-[10px] truncate max-w-[170px] leading-tight font-semibold mt-0.5">{p.project_title}</div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <span className="text-sm font-extrabold block leading-none">{p.overall_risk_score}</span>
                        <span className="text-[8px] font-bold block uppercase tracking-tight">CRITICAL</span>
                      </div>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
                
              {projects.filter(p => p.risk_level === 'VERY HIGH RISK').length === 0 && (
                <div className="text-xs text-gray-500 italic text-center py-6">
                  No active very high risk anomalies detected in current filters.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row: Main Triage Table */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight">
              Audit Triage Queue
            </h3>
            <p className="text-[10px] text-gray-brand">
              Showing {sortedProjects.length} synthetic records based on filter metrics.
            </p>
          </div>
        </div>
        
        <ProjectTable 
          projects={sortedProjects} 
          isDarkMode={isDarkMode} 
          onViewProject={onViewProject}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>

    </div>
  );
}
