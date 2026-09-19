import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  User as UserIcon,
  Bell,
  LogOut,
  MapPin,
  Building2,
  Menu,
  ShieldCheck,
  Mail,
  IdCard,
  Building,
  CheckCircle2,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { User, DepartmentType } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  onNavigateTab?: (tab: string) => void;
  onNavigateToTab?: (tab: string) => void;
  activeTab?: string;
  dangerBuildingsCount?: number;
  activeDangerCount?: number;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  onNavigateTab,
  onNavigateToTab,
  dangerBuildingsCount = 0,
  activeDangerCount = 0,
  onToggleMobileMenu,
}) => {
  const handleNav = onNavigateTab || onNavigateToTab || (() => {});
  const totalDangerCount = dangerBuildingsCount || activeDangerCount || 0;
  const [showUserInfo, setShowUserInfo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close popup on click outside or ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowUserInfo(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUserInfo(false);
      }
    };

    if (showUserInfo) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showUserInfo]);

  // Role display details
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'authority':
        return {
          label: 'Municipal Authority / Admin',
          color: 'bg-purple-950/70 text-purple-300 border-purple-800/80',
          clearance: 'Level 4: Full Administrative & Executive Override',
        };
      case 'engineer':
        return {
          label: 'Structural Senior Engineer',
          color: 'bg-blue-950/70 text-blue-300 border-blue-800/80',
          clearance: 'Level 3: Structural Audit, NDT Testing & Hazard Sign-Off',
        };
      case 'field_worker':
        return {
          label: 'Field Operations Specialist',
          color: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80',
          clearance: 'Level 2: Field Hazard Tagging & Dispatch Response',
        };
      default:
        return {
          label: 'Registered Citizen',
          color: 'bg-slate-800 text-slate-300 border-slate-700',
          clearance: 'Level 1: Public Citizen Issue Reporting & Safety Tracking',
        };
    }
  };

  const roleInfo = currentUser ? getRoleBadge(currentUser.role) : null;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-6 py-3 flex items-center justify-between shadow-md">
      {/* Brand & Identity (No AI symbol) */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div
          onClick={() => handleNav('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">CivicPulse</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Municipal Risk &amp; Infrastructure Intelligence</p>
          </div>
        </div>

        {/* Danger Alert Ticker */}
        {totalDangerCount > 0 && (
          <div
            onClick={() => handleNav('history')}
            className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800/60 text-red-300 text-xs cursor-pointer hover:bg-red-900/60 transition-colors animate-pulse"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="font-semibold">{totalDangerCount} High-Danger Alerts</span>
            <span className="text-red-400/80 text-[11px]">(Structures &gt; 18 Yrs / Critical Fatigue)</span>
          </div>
        )}
      </div>

      {/* Profile & Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4 relative">
        {/* Quick Location & Department Badge */}
        {currentUser?.department && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentUser.department}</span>
          </div>
        )}

        {/* User Profile Trigger Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              id="btn-user-profile-toggle"
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer group"
              title="Click to view user information"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/50 group-hover:ring-blue-400 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-white leading-tight truncate max-w-[130px] group-hover:text-cyan-300 transition-colors">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {currentUser.role.replace('_', ' ')}
                </p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${showUserInfo ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {/* Logout Shortcut */}
            <button
              id="btn-logout"
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/40 hover:border-red-800/40 border border-transparent transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Public Portal</span>
          </div>
        )}

        {/* User Information Modal / Popover */}
        {showUserInfo && currentUser && (
          <div
            ref={modalRef}
            id="modal-user-info"
            className="absolute right-0 top-full mt-2.5 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl shadow-slate-950/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-slate-700"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white">User Information</h3>
              </div>
              <button
                onClick={() => setShowUserInfo(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Avatar & Primary Identity */}
            <div className="mt-4 flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/60 shadow-lg shadow-blue-500/20"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-white truncate">{currentUser.name}</h4>
                <div className={`mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${roleInfo?.color}`}>
                  <span>{roleInfo?.label}</span>
                </div>
              </div>
            </div>

            {/* Detailed User Information Fields */}
            <div className="mt-4 space-y-2.5 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
                </span>
                <span className="text-white font-medium truncate max-w-[200px]">{currentUser.email}</span>
              </div>

              {currentUser.employeeId && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <IdCard className="w-3.5 h-3.5 text-slate-500" /> Badge / Employee ID
                  </span>
                  <span className="text-cyan-300 font-mono font-bold bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                    {currentUser.employeeId}
                  </span>
                </div>
              )}

              {currentUser.department && (
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-500" /> Department
                  </span>
                  <span className="text-white font-medium">{currentUser.department}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Status
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active &amp; Verified
                </span>
              </div>
            </div>

            {/* Security Clearance / Permissions */}
            {roleInfo?.clearance && (
              <div className="mt-3 p-2.5 rounded-xl bg-blue-950/30 border border-blue-800/30 text-[11px] text-blue-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-blue-200">Security Clearance:</span>
                  <span>{roleInfo.clearance}</span>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowUserInfo(false);
                  handleNav('settings');
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                Settings &rarr;
              </button>

              <button
                type="button"
                id="btn-modal-logout"
                onClick={() => {
                  setShowUserInfo(false);
                  onLogout();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

