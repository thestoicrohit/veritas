import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DemoPanel from './components/DemoPanel';
import ProjectModal from './components/ProjectModal';
import HowItWorksModal from './components/HowItWorksModal';

// Pages
import CommandCentre from './pages/CommandCentre';
import RiskAnalytics from './pages/RiskAnalytics';
import FinancialIntel from './pages/FinancialIntel';
import GeoIntelligence from './pages/GeoIntelligence';
import VisualVerification from './pages/VisualVerification';
import Procurement from './pages/Procurement';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';

// API
import { fetchProjectDetails } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState('command-centre');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  
  // Shared filter state for projects and analytics
  const [filterState, setFilterState] = useState({
    state: '',
    city: '',
    category: '',
    risk_level: '',
    search: '',
    reason: '',
    selectedCoords: null
  });

  // Apply dark mode styling to root body
  useEffect(() => {
    const root = window.document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#071525';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F7F8FA';
    }
  }, [isDarkMode]);

  // Click handler to view details of any project
  const handleViewProject = async (projectId) => {
    try {
      const data = await fetchProjectDetails(projectId);
      setSelectedProject(data);
    } catch (e) {
      console.error(e);
      alert('Failed to load project details.');
    }
  };

  // Demo flow triggers
  const handleTriggerScenario = async (scenarioId) => {
    if (scenarioId === 'cost_deviation') {
      setActivePage('command-centre');
      // Reset filters and search specifically for the Jabalpur project
      setFilterState({
        state: '',
        city: '',
        category: '',
        risk_level: '',
        search: 'VR-JBP-044',
        reason: '',
        selectedCoords: [23.1686, 79.9338] // Jabalpur coords
      });
      // Delay opening modal slightly to allow map transition
      setTimeout(async () => {
        await handleViewProject('VR-JBP-044');
      }, 500);
    } 
    else if (scenarioId === 'mismatch') {
      setActivePage('command-centre');
      setFilterState({
        state: '',
        city: '',
        category: '',
        risk_level: '',
        search: 'VR-HYD-032',
        reason: '',
        selectedCoords: [17.3850, 78.4867] // Hyderabad coords
      });
      setTimeout(async () => {
        await handleViewProject('VR-HYD-032');
      }, 500);
    } 
    else if (scenarioId === 'duplicate') {
      setActivePage('geo-intel');
      // Clear filters
      setFilterState({
        state: '',
        city: '',
        category: '',
        risk_level: '',
        search: '',
        reason: '',
        selectedCoords: null
      });
    } 
    else if (scenarioId === 'visual') {
      setActivePage('visual-verification');
    } 
    else if (scenarioId === 'procurement') {
      setActivePage('procurement');
    }
  };

  // Page switching router
  const renderActivePage = () => {
    switch (activePage) {
      case 'command-centre':
        return (
          <CommandCentre 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
            filterState={filterState}
            setFilterState={setFilterState}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          />
        );
      case 'projects':
        return (
          <CommandCentre 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
            filterState={filterState}
            setFilterState={setFilterState}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          />
        );
      case 'risk-analytics':
        return (
          <RiskAnalytics 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
            filterState={filterState}
          />
        );
      case 'financial-intel':
        return (
          <FinancialIntel 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
          />
        );
      case 'geo-intel':
        return (
          <GeoIntelligence 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
          />
        );
      case 'visual-verification':
        return (
          <VisualVerification 
            isDarkMode={isDarkMode} 
          />
        );
      case 'procurement':
        return (
          <Procurement 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
          />
        );
      case 'alerts':
        return (
          <Alerts 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
          />
        );
      case 'reports':
        return (
          <Reports 
            isDarkMode={isDarkMode} 
          />
        );
      default:
        return (
          <CommandCentre 
            isDarkMode={isDarkMode} 
            onViewProject={handleViewProject}
            filterState={filterState}
            setFilterState={setFilterState}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          />
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark bg-deep-navy text-slate-100' : 'bg-off-white text-navy'}`}>
      
      {/* Sidebar navigation */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isDarkMode={isDarkMode}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Main content frame */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header toolbar */}
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        />

        {/* Scrollable page body */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderActivePage()}
          </div>
        </main>

      </div>

      {/* Floating interactive demo scenarios console */}
      <DemoPanel 
        onTriggerScenario={handleTriggerScenario} 
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* How It Works & Live Demo Modal */}
      <HowItWorksModal 
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        isDarkMode={isDarkMode}
        onTriggerScenario={handleTriggerScenario}
      />

      {/* Central project details inspection modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isDarkMode={isDarkMode} 
          onClose={() => setSelectedProject(null)}
          onNavigate={(page) => setActivePage(page)}
        />
      )}

    </div>
  );
}
