import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { EngineersView } from './components/EngineersView';
import { MapsView } from './components/MapsView';
import { ReportsView } from './components/ReportsView';
import { DepartmentsView } from './components/DepartmentsView';
import { HistoryView } from './components/HistoryView';
import { AiAssistantView } from './components/AiAssistantView';
import { DocumentationView } from './components/DocumentationView';
import { SettingsView } from './components/SettingsView';

import {
  INITIAL_EMPLOYEES,
  INITIAL_ENGINEERS,
  INITIAL_DAMAGED_LOCATIONS,
  INITIAL_CONSTRUCTION_HISTORY,
  INITIAL_DEPARTMENTS,
  INITIAL_REPORTS,
} from './data/mockData';

import {
  User,
  Employee,
  Engineer,
  DamagedLocation,
  ConstructionHistoryItem,
  DepartmentSummary,
  ReportSubmission,
} from './types';

export default function App() {
  // Authentication State: always starts as null so user logs in first
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Active Navigation Tab State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Application Data States (with localStorage caching)
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('civicpulse_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [engineers, setEngineers] = useState<Engineer[]>(() => {
    const saved = localStorage.getItem('civicpulse_engineers');
    return saved ? JSON.parse(saved) : INITIAL_ENGINEERS;
  });

  const [damagedLocations, setDamagedLocations] = useState<DamagedLocation[]>(() => {
    const saved = localStorage.getItem('civicpulse_damages');
    return saved ? JSON.parse(saved) : INITIAL_DAMAGED_LOCATIONS;
  });

  const [constructionHistory, setConstructionHistory] = useState<ConstructionHistoryItem[]>(() => {
    const saved = localStorage.getItem('civicpulse_history');
    return saved ? JSON.parse(saved) : INITIAL_CONSTRUCTION_HISTORY;
  });

  const [departments, setDepartments] = useState<DepartmentSummary[]>(() => {
    const saved = localStorage.getItem('civicpulse_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [reports, setReports] = useState<ReportSubmission[]>(() => {
    const saved = localStorage.getItem('civicpulse_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Sync with LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('civicpulse_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('civicpulse_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('civicpulse_damages', JSON.stringify(damagedLocations));
  }, [damagedLocations]);

  useEffect(() => {
    localStorage.setItem('civicpulse_history', JSON.stringify(constructionHistory));
  }, [constructionHistory]);

  useEffect(() => {
    localStorage.setItem('civicpulse_reports', JSON.stringify(reports));
  }, [reports]);

  // Derived Danger Counts
  const dangerBuildingsCount = constructionHistory.filter((b) => b.isDangerAbove18).length;

  // Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDispatchEngineer = (engineerId: string, locationId: string, notes: string) => {
    const targetLoc = damagedLocations.find((d) => d.id === locationId);
    const locName = targetLoc ? targetLoc.locationName : 'Target Critical Hazard Site';

    // Update Engineer
    setEngineers((prev) =>
      prev.map((eng) =>
        eng.id === engineerId
          ? {
              ...eng,
              status: 'Dispatched',
              activeDispatchLocation: locName,
            }
          : eng
      )
    );

    // Update Damaged Location
    const targetEng = engineers.find((e) => e.id === engineerId);
    setDamagedLocations((prev) =>
      prev.map((d) =>
        d.id === locationId
          ? {
              ...d,
              status: 'IN_REPAIR',
              assignedEngineer: targetEng ? targetEng.name : 'Dispatched Engineer',
            }
          : d
      )
    );
  };

  const handleAddBuilding = (building: ConstructionHistoryItem) => {
    setConstructionHistory((prev) => [building, ...prev]);
  };

  const handleSubmitReport = (newReport: ReportSubmission) => {
    setReports((prev) => [newReport, ...prev]);

    // Also inject as an active damaged location for map visualization & department tracking
    const newDamageLoc: DamagedLocation = {
      id: `dam-${Date.now()}`,
      title: newReport.title,
      description: newReport.description,
      department: newReport.category,
      locationName: newReport.locationName,
      lat: 37.7749 + (Math.random() - 0.5) * 0.04,
      lng: -122.4194 + (Math.random() - 0.5) * 0.04,
      damageType: newReport.aiAnalysis?.damageType || `${newReport.category} Defect`,
      riskLevel: newReport.aiAnalysis?.riskLevel || 'HIGH',
      severityScore: newReport.aiAnalysis?.severityScore || 82,
      status: 'IN_PROGRESS',
      reportedDate: 'Just now',
      reportedBy: newReport.reporterName,
      estimatedCost: newReport.aiAnalysis?.estimatedCostUSD || 4500,
      dangerAlert: (newReport.aiAnalysis?.severityScore || 82) >= 80,
      imageUrl:
        newReport.imageBase64 ||
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    };

    setDamagedLocations((prev) => [newDamageLoc, ...prev]);
  };

  const handleResetData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setEngineers(INITIAL_ENGINEERS);
    setDamagedLocations(INITIAL_DAMAGED_LOCATIONS);
    setConstructionHistory(INITIAL_CONSTRUCTION_HISTORY);
    setDepartments(INITIAL_DEPARTMENTS);
    setReports(INITIAL_REPORTS);
    localStorage.clear();
  };

  // If user is not logged in, render the Login/Registration flow
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateTab={handleNavigateTab}
        activeTab={activeTab}
        dangerBuildingsCount={dangerBuildingsCount}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6 items-start">
        {/* Left Desktop Sidebar - visible on medium, large, and zoomed displays */}
        <div className="hidden md:block sticky top-20 self-start flex-shrink-0">
          <Sidebar
            activeTab={activeTab}
            onNavigateTab={handleNavigateTab}
            dangerBuildingsCount={dangerBuildingsCount}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Navigation Drawer / Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden flex">
            <div className="w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between h-full shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="text-sm font-bold text-white">Menu Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <Sidebar
                  activeTab={activeTab}
                  onNavigateTab={(tab) => {
                    handleNavigateTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  dangerBuildingsCount={dangerBuildingsCount}
                  collapsed={false}
                  onToggleCollapse={() => {}}
                />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 bg-red-950 text-red-300 border border-red-800 rounded-xl text-xs font-bold"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardView
              employees={employees}
              damagedLocations={damagedLocations}
              constructionHistory={constructionHistory}
              departments={departments}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'engineers' && (
            <EngineersView
              engineers={engineers}
              damagedLocations={damagedLocations}
              onDispatchEngineer={handleDispatchEngineer}
            />
          )}

          {activeTab === 'maps' && (
            <MapsView
              damagedLocations={damagedLocations}
              constructionHistory={constructionHistory}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              reports={reports}
              onSubmitReport={handleSubmitReport}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsView
              departments={departments}
              damagedLocations={damagedLocations}
              employees={employees}
              engineers={engineers}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              constructionHistory={constructionHistory}
              onAddBuilding={handleAddBuilding}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <AiAssistantView
              damagedLocations={damagedLocations}
              constructionHistory={constructionHistory}
              departments={departments}
              engineers={engineers}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'docs' && <DocumentationView onNavigateTab={handleNavigateTab} />}

          {activeTab === 'settings' && <SettingsView onResetData={handleResetData} />}
        </main>
      </div>
    </div>
  );
}
