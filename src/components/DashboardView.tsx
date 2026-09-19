import React, { useState } from 'react';
import {
  ShieldAlert,
  HardHat,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Building,
  CheckCircle2,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  Phone,
  Mail,
  Award,
  Zap,
  Trees,
  TrafficCone,
  Hammer,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  ConstructionHistoryItem,
  DamagedLocation,
  DepartmentSummary,
  Employee,
  DepartmentType
} from '../types';

interface DashboardViewProps {
  employees: Employee[];
  damagedLocations: DamagedLocation[];
  constructionHistory: ConstructionHistoryItem[];
  departments: DepartmentSummary[];
  onNavigateTab: (tab: string) => void;
  onSelectDamagedLocation?: (loc: DamagedLocation) => void;
  onSelectBuilding?: (bld: ConstructionHistoryItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  employees,
  damagedLocations,
  constructionHistory,
  departments,
  onNavigateTab,
  onSelectDamagedLocation,
  onSelectBuilding
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [employeeSearch, setEmployeeSearch] = useState<string>('');

  // Key KPI metrics
  const dangerBuildingsCount = constructionHistory.filter((b) => b.ageInYears > 18).length;
  const criticalDamageCount = damagedLocations.filter((d) => d.riskLevel === 'CRITICAL').length;
  const totalBudget = departments.reduce((acc, d) => acc + d.totalBudgetUSD, 0);
  const totalSpent = departments.reduce((acc, d) => acc + d.spentBudgetUSD, 0);
  const totalActiveIssues = damagedLocations.filter((d) => d.status !== 'RESOLVED').length;
  const resolvedIssuesCount = damagedLocations.filter((d) => d.status === 'RESOLVED').length;

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = selectedDeptFilter === 'All' || emp.department === selectedDeptFilter;
    const matchesSearch =
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.role.toLowerCase().includes(employeeSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Calculate Pie Chart Data for Damage by Department
  const deptDamageCounts = {
    'Road Department': damagedLocations.filter((d) => d.department === 'Road Department').length,
    'Forest Department': damagedLocations.filter((d) => d.department === 'Forest Department').length,
    'Electricity Department': damagedLocations.filter((d) => d.department === 'Electricity Department').length,
    'Traffic Department': damagedLocations.filter((d) => d.department === 'Traffic Department').length,
  };
  const totalDamages = Math.max(1, damagedLocations.length);

  // Calculate Severity Bar Breakdown
  const severityCounts = {
    CRITICAL: damagedLocations.filter((d) => d.riskLevel === 'CRITICAL').length,
    HIGH: damagedLocations.filter((d) => d.riskLevel === 'HIGH').length,
    MEDIUM: damagedLocations.filter((d) => d.riskLevel === 'MEDIUM').length,
    LOW: damagedLocations.filter((d) => d.riskLevel === 'LOW').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Civic Intelligence Active
            </span>
            <span className="text-xs text-slate-400 font-mono">Real-Time Municipal Sync</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Infrastructure Command &amp; Project Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Monitoring active civil assets, cross-department work orders, high-danger buildings over 18 years, and field personnel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('reports')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/25"
          >
            <span>Report Damaged Area</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('history')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Age Predictor &gt; 18 Yrs</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 18-Year Construction Age Danger */}
        <div
          onClick={() => onNavigateTab('history')}
          className="bg-slate-900 border border-red-900/40 hover:border-red-600/60 rounded-2xl p-4 transition-all cursor-pointer shadow-sm group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Aging Buildings &gt; 18 Yrs</span>
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{dangerBuildingsCount}</span>
            <span className="text-xs font-bold text-red-400 bg-red-950/70 border border-red-800/50 px-1.5 py-0.5 rounded">
              High Danger Alert
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Structures exceeding 18-year fatigue requiring urgent retrofitting &amp; danger instructions.
          </p>
        </div>

        {/* Card 2: Critical Damaged Roads & Utilities */}
        <div
          onClick={() => onNavigateTab('maps')}
          className="bg-slate-900 border border-amber-900/40 hover:border-amber-600/60 rounded-2xl p-4 transition-all cursor-pointer shadow-sm group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Critical Road &amp; Grid Hazards</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{criticalDamageCount}</span>
            <span className="text-xs font-medium text-amber-400 bg-amber-950/70 border border-amber-800/50 px-1.5 py-0.5 rounded">
              {totalActiveIssues} total pending
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Potholes, exposed electrical wires &amp; signal outages mapped with live GPS pins.
          </p>
        </div>

        {/* Card 3: Municipal Budget Utilization */}
        <div
          onClick={() => onNavigateTab('departments')}
          className="bg-slate-900 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-4 transition-all cursor-pointer shadow-sm group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Municipal Repair Budget</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              ${(totalSpent / 1000000).toFixed(1)}M
            </span>
            <span className="text-xs text-slate-400">
              / ${(totalBudget / 1000000).toFixed(1)}M Total
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round((totalSpent / totalBudget) * 100))}%` }}
            />
          </div>
        </div>

        {/* Card 4: Workforce & Field Efficiency */}
        <div
          onClick={() => onNavigateTab('engineers')}
          className="bg-slate-900 border border-emerald-900/40 hover:border-emerald-600/60 rounded-2xl p-4 transition-all cursor-pointer shadow-sm group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Active Field Workforce</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{employees.length}</span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-1.5 py-0.5 rounded">
              94.5% Avg Efficiency
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Certified engineers and inspection supervisors deployed across 4 departments.
          </p>
        </div>
      </div>

      {/* Project Analysis Graphs & Charts Section (User Requirement: graph or pi-chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie/Donut Chart: Damage Category Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Damage Distribution (Pie Chart)</h2>
              <p className="text-[11px] text-slate-400">Hazard reports breakdown by municipal department</p>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Donut / Pie Representation */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* SVG Donut Chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background Track */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#1e293b" strokeWidth="16" />
                {/* Segments */}
                {(() => {
                  let accumulatedPercent = 0;
                  const colors = {
                    'Road Department': '#2563eb', // blue-600
                    'Forest Department': '#059669', // emerald-600
                    'Electricity Department': '#d97706', // amber-600
                    'Traffic Department': '#7c3aed', // violet-600
                  };

                  return Object.entries(deptDamageCounts).map(([dept, count], idx) => {
                    const percent = (count / totalDamages) * 100;
                    const strokeDasharray = `${percent * 2.387} 238.7`;
                    const strokeDashoffset = `-${accumulatedPercent * 2.387}`;
                    accumulatedPercent += percent;

                    return (
                      <circle
                        key={dept}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={colors[dept as keyof typeof colors] || '#3b82f6'}
                        strokeWidth="16"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:opacity-80"
                      />
                    );
                  });
                })()}
              </svg>
              {/* Inner Center Label */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-white">{damagedLocations.length}</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Hazards</span>
              </div>
            </div>

            {/* Department Legend */}
            <div className="grid grid-cols-2 gap-2.5 w-full mt-4 text-xs">
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-slate-300 font-medium">Road Dept: </span>
                  <span className="text-white font-bold">{Math.round((deptDamageCounts['Road Department'] / totalDamages) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-emerald-600 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-slate-300 font-medium">Forest: </span>
                  <span className="text-white font-bold">{Math.round((deptDamageCounts['Forest Department'] / totalDamages) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-amber-600 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-slate-300 font-medium">Electricity: </span>
                  <span className="text-white font-bold">{Math.round((deptDamageCounts['Electricity Department'] / totalDamages) * 100)}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-purple-600 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-slate-300 font-medium">Traffic: </span>
                  <span className="text-white font-bold">{Math.round((deptDamageCounts['Traffic Department'] / totalDamages) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Graph: Risk Severity Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Risk Severity Graph</h2>
              <p className="text-[11px] text-slate-400">Hazard criticality scoring distribution</p>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
          </div>

          <div className="space-y-4 py-2">
            {/* Critical */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Critical Severity (Score &gt;80)
                </span>
                <span className="font-bold text-white">{severityCounts.CRITICAL} Incidents</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(severityCounts.CRITICAL / totalDamages) * 100}%` }}
                />
              </div>
            </div>

            {/* High */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> High Risk (Score 60-79)
                </span>
                <span className="font-bold text-white">{severityCounts.HIGH} Incidents</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(severityCounts.HIGH / totalDamages) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Medium Risk (Score 40-59)
                </span>
                <span className="font-bold text-white">{severityCounts.MEDIUM} Incidents</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, (severityCounts.MEDIUM / totalDamages) * 100)}%` }}
                />
              </div>
            </div>

            {/* Low */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Low / Monitoring (Score &lt;40)
                </span>
                <span className="font-bold text-white">{severityCounts.LOW} Incidents</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, (severityCounts.LOW / totalDamages) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Automated AI Prioritization Engine</span>
            <span className="text-cyan-400 font-mono">Model: Gemini 3.7 Flash</span>
          </div>
        </div>

        {/* Department Budget Utilization Comparison Bar Graph */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Department Budget Graph</h2>
              <p className="text-[11px] text-slate-400">Allocated vs utilized capital expenditure</p>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-3.5 py-1">
            {departments.map((dept) => {
              const utilPercent = Math.round((dept.spentBudgetUSD / dept.totalBudgetUSD) * 100);
              return (
                <div key={dept.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200 truncate max-w-[130px]">{dept.name}</span>
                    <span className="text-slate-400 font-mono">
                      ${(dept.spentBudgetUSD / 1000000).toFixed(2)}M / ${(dept.totalBudgetUSD / 1000000).toFixed(1)}M ({utilPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${utilPercent}%`,
                        backgroundColor: dept.color || '#3b82f6',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Total Capital Pool:</span>
            <span className="text-white font-bold font-mono">${(totalBudget / 1000000).toFixed(2)}M USD</span>
          </div>
        </div>
      </div>

      {/* Employee Details & Information Section (Explicit User Requirement) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Employee Details &amp; Field Roster Information
              </h2>
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                {filteredEmployees.length} Staff Members
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive personnel profile, qualifications, active projects, performance score, and duty status.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search employee name/code..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-44 sm:w-56"
              />
            </div>

            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Departments</option>
              <option value="Road Department">Road Department</option>
              <option value="Forest Department">Forest Department</option>
              <option value="Electricity Department">Electricity Department</option>
              <option value="Traffic Department">Traffic Department</option>
            </select>
          </div>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => {
            const statusColor =
              emp.status === 'On Duty'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : emp.status === 'In Field'
                ? 'bg-blue-950 text-blue-300 border-blue-800'
                : 'bg-amber-950 text-amber-300 border-amber-800';

            return (
              <div
                key={emp.id}
                className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all shadow-sm flex flex-col justify-between space-y-3"
              >
                {/* Employee Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-700 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white">{emp.name}</h3>
                      </div>
                      <p className="text-[11px] text-cyan-400 font-medium">{emp.role}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{emp.employeeCode}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {emp.status}
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-slate-900/90 rounded-lg p-2.5 text-center border border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Experience</span>
                    <span className="text-xs font-bold text-white">{emp.experienceYears} Yrs</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Active Tasks</span>
                    <span className="text-xs font-bold text-amber-400">{emp.activeProjects}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Resolved</span>
                    <span className="text-xs font-bold text-emerald-400">{emp.resolvedIssues}</span>
                  </div>
                </div>

                {/* Performance Meter */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Efficiency Score
                    </span>
                    <span className="text-white font-bold font-mono">{emp.performanceScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                      style={{ width: `${emp.performanceScore}%` }}
                    />
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1">
                  {emp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-slate-800/90 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contact Footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300 font-mono">
                    <Phone className="w-3 h-3 text-cyan-400" />
                    <span>{emp.phone.slice(-9)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent High-Danger Infrastructure Alerts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h2 className="text-base font-bold text-white">Live Infrastructure Hazard Radar</h2>
          </div>
          <button
            onClick={() => onNavigateTab('maps')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>Open Interactive GIS Map</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {damagedLocations.slice(0, 4).map((loc) => (
            <div
              key={loc.id}
              onClick={() => {
                if (onSelectDamagedLocation) onSelectDamagedLocation(loc);
                onNavigateTab('maps');
              }}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-start gap-3 group"
            >
              <img
                src={loc.imageUrl}
                alt={loc.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0 ring-1 ring-slate-800"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                      loc.riskLevel === 'CRITICAL'
                        ? 'bg-red-950 text-red-300 border-red-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}
                  >
                    {loc.riskLevel} (Score {loc.severityScore})
                  </span>
                  <span className="text-[10px] text-slate-400">{loc.reportedDate}</span>
                </div>
                <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                  {loc.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{loc.locationName}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span className="text-blue-400 font-medium">{loc.department}</span>
                  <span className="text-emerald-400 font-mono">${loc.estimatedCost.toLocaleString()} est.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
