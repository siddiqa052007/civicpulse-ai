import React from 'react';
import {
  LayoutDashboard,
  HardHat,
  Map,
  Camera,
  Building,
  History,
  BotMessageSquare,
  Settings,
  ShieldAlert,
  Flame,
  Zap,
  Trees,
  Car,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  currentTab?: string;
  onNavigateTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  dangerBuildingsCount?: number;
  dangerAlertsCount?: number;
  pendingReportsCount?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  currentTab,
  onNavigateTab,
  onSelectTab,
  dangerBuildingsCount,
  dangerAlertsCount,
  pendingReportsCount = 0,
  collapsed = false,
  onToggleCollapse,
}) => {
  const selectedTab = activeTab || currentTab || 'dashboard';
  const handleSelect = (tab: string) => {
    if (onNavigateTab) onNavigateTab(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const dangerCount = dangerBuildingsCount ?? dangerAlertsCount ?? 0;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Analytics, KPI charts & Employee Details'
    },
    {
      id: 'engineers',
      label: 'Engineers',
      icon: HardHat,
      badge: '5 Total',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      description: 'Total Roster & Department Specialists'
    },
    {
      id: 'maps',
      label: 'Maps',
      icon: Map,
      badge: 'Live GIS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Department Danger, Risk & Safe Zones'
    },
    {
      id: 'reports',
      label: 'Report & Camera',
      icon: Camera,
      badge: pendingReportsCount > 0 ? `${pendingReportsCount} New` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Live Camera Capture & Damage Log'
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: Building,
      badge: '4 Units',
      description: 'Road, Forest, Electricity, Traffic'
    },
    {
      id: 'history',
      label: 'History & Age AI',
      icon: History,
      badge: dangerCount > 0 ? `${dangerCount} Danger` : 'Age Protocol',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30 font-bold',
      description: 'Construction History & >18 Yr Danger Protocol'
    },
    {
      id: 'assistant',
      label: 'AI Assistant',
      icon: BotMessageSquare,
      badge: 'Copilot',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Municipal Infrastructure Assistant'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      description: 'Thresholds, Jurisdictions & System'
    },
  ];

  return (
    <aside
      className={`bg-slate-900 border border-slate-800 rounded-2xl flex flex-col flex-shrink-0 shadow-xl transition-all duration-200 z-20 overscroll-contain overflow-hidden ${
        collapsed ? 'w-16 min-w-[4rem]' : 'w-64 sm:w-68 md:w-72 min-w-[16rem]'
      }`}
    >
      {/* Navigation List - Calibrated to fit cleanly across zoom levels */}
      <div className="p-3 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all group cursor-pointer ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                {!collapsed && (
                  <div className="truncate">
                    <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white font-bold' : 'text-slate-200'}`}>
                      {item.label}
                    </p>
                  </div>
                )}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-md border flex-shrink-0 font-semibold ${
                    item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Departments Sub-Footer - Substantial, visible, fits cleanly */}
      {!collapsed && (
        <div className="p-3 pt-2.5 border-t border-slate-800 bg-slate-950/60">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span>Active Departments</span>
            <span className="text-[11px] bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-semibold">
              All Active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div
              onClick={() => handleSelect('departments')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="truncate font-medium">Road Dept</span>
            </div>
            <div
              onClick={() => handleSelect('departments')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="truncate font-medium">Forest Dept</span>
            </div>
            <div
              onClick={() => handleSelect('departments')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="truncate font-medium">Electricity</span>
            </div>
            <div
              onClick={() => handleSelect('departments')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
              <span className="truncate font-medium">Traffic Dept</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
