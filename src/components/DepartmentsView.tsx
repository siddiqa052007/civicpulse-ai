import React, { useState } from 'react';
import {
  Building,
  Hammer,
  Trees,
  Zap,
  TrafficCone,
  DollarSign,
  ShieldAlert,
  HardHat,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import { DepartmentSummary, DepartmentType, DamagedLocation, Employee, Engineer } from '../types';

interface DepartmentsViewProps {
  departments: DepartmentSummary[];
  damagedLocations: DamagedLocation[];
  employees: Employee[];
  engineers: Engineer[];
  onNavigateTab: (tab: string) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments,
  damagedLocations,
  employees,
  engineers,
  onNavigateTab,
}) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentType>('Road Department');

  const currentDept = departments.find((d) => d.name === selectedDept) || departments[0];
  const deptDamages = damagedLocations.filter((d) => d.department === selectedDept);
  const deptEmployees = employees.filter((e) => e.department === selectedDept);
  const deptEngineers = engineers.filter((e) => e.department === selectedDept);

  const getDeptIcon = (name: DepartmentType) => {
    switch (name) {
      case 'Road Department':
        return <Hammer className="w-5 h-5 text-blue-400" />;
      case 'Forest Department':
        return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Electricity Department':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Traffic Department':
        return <TrafficCone className="w-5 h-5 text-purple-400" />;
    }
  };

  const getDeptBgColor = (name: DepartmentType, isSelected: boolean) => {
    if (!isSelected) return 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80';
    switch (name) {
      case 'Road Department':
        return 'bg-blue-600/20 border-blue-500/50 text-blue-300 shadow-md shadow-blue-500/10';
      case 'Forest Department':
        return 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10';
      case 'Electricity Department':
        return 'bg-amber-600/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10';
      case 'Traffic Department':
        return 'bg-purple-600/20 border-purple-500/50 text-purple-300 shadow-md shadow-purple-500/10';
    }
  };

  const budgetPercent = Math.round((currentDept.spentBudgetUSD / currentDept.totalBudgetUSD) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-blue-400" /> Municipal Operations Console
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Cross-Department Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Dedicated command consoles for Road, Forest, Electricity, and Traffic Infrastructure.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('reports')}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-colors"
        >
          + Log Department Work Order
        </button>
      </div>

      {/* 4 Department Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const isSelected = selectedDept === dept.name;
          const activeDamagesCount = damagedLocations.filter((d) => d.department === dept.name && d.status !== 'RESOLVED').length;

          return (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept.name)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${getDeptBgColor(
                dept.name,
                isSelected
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
                    {getDeptIcon(dept.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{dept.name}</h3>
                    <span className="text-[10px] text-slate-400 block">{dept.headOfDepartment.split('(')[0]}</span>
                  </div>
                </div>
                {activeDamagesCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                    {activeDamagesCount} Active
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Budget Utilized:</span>
                  <span className="font-mono font-bold text-white">
                    ${(dept.spentBudgetUSD / 1000000).toFixed(1)}M / ${(dept.totalBudgetUSD / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round((dept.spentBudgetUSD / dept.totalBudgetUSD) * 100)}%`,
                      backgroundColor: dept.color,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Department In-Depth Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Details & Financials (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
              {getDeptIcon(currentDept.name)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{currentDept.name} Overview</h2>
              <p className="text-xs text-cyan-400 font-medium">{currentDept.headOfDepartment}</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            {currentDept.description}
          </p>

          {/* Department KPIs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Active Work Orders</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono mt-0.5 block">
                {deptDamages.length}
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Assigned Engineers</span>
              <span className="text-xl font-extrabold text-blue-400 font-mono mt-0.5 block">
                {deptEngineers.length} Lead PEs
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Allocated Annual Budget</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">
                ${(currentDept.totalBudgetUSD / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Resolved This Quarter</span>
              <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">
                {currentDept.resolvedIssues}
              </span>
            </div>
          </div>

          {/* Staff Roster Snapshot */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Department Specialists ({deptEmployees.length})
            </h4>
            <div className="space-y-1.5">
              {deptEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-lg object-cover" />
                    <div>
                      <span className="text-white font-semibold block leading-tight">{emp.name}</span>
                      <span className="text-[10px] text-slate-400">{emp.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Incidents & Work Orders (7 Columns) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Active {selectedDept} Work Orders</h3>
              <p className="text-xs text-slate-400">Prioritized by AI risk severity matrix</p>
            </div>
            <button
              onClick={() => onNavigateTab('maps')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View on GIS Radar →
            </button>
          </div>

          {deptDamages.length > 0 ? (
            <div className="space-y-3">
              {deptDamages.map((loc) => (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={loc.imageUrl}
                      alt={loc.title}
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-800 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                            loc.riskLevel === 'CRITICAL'
                              ? 'bg-red-950 text-red-300 border-red-800'
                              : 'bg-amber-950 text-amber-300 border-amber-800'
                          }`}
                        >
                          {loc.riskLevel} (Score {loc.severityScore})
                        </span>
                        <span className="text-[10px] text-slate-400">{loc.reportedDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{loc.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400" /> {loc.locationName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs">
                    <span className="font-bold text-emerald-400 font-mono">${loc.estimatedCost.toLocaleString()} USD</span>
                    <span className="text-[11px] text-slate-400">
                      Eng: <strong className="text-slate-200">{loc.assignedEngineer || 'Unassigned'}</strong>
                    </span>
                    <button
                      onClick={() => onNavigateTab('engineers')}
                      className="mt-1 px-3 py-1 bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg text-[11px] font-semibold transition-colors border border-blue-500/40"
                    >
                      Assign Crew
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">All Clear in {selectedDept}</h4>
              <p className="text-xs">Zero unaddressed critical incidents. Regular maintenance runs on schedule.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
