import React, { useState } from 'react';
import {
  HardHat,
  Search,
  Filter,
  Award,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Send,
  Calendar,
  X,
  ShieldCheck,
  Zap,
  Hammer,
  Trees,
  Car,
  Users,
  Activity
} from 'lucide-react';
import { Engineer, DepartmentType, DamagedLocation } from '../types';

interface EngineersViewProps {
  engineers: Engineer[];
  damagedLocations: DamagedLocation[];
  onDispatchEngineer: (engineerId: string, locationId: string, notes: string) => void;
}

export const EngineersView: React.FC<EngineersViewProps> = ({
  engineers,
  damagedLocations,
  onDispatchEngineer,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [dispatchModalEngineer, setDispatchModalEngineer] = useState<Engineer | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [dispatchNotes, setDispatchNotes] = useState<string>('');
  const [dispatchSuccessMessage, setDispatchSuccessMessage] = useState<string>('');

  // Department counts
  const totalCount = engineers.length;
  const roadEngs = engineers.filter((e) => e.department === 'Road Department');
  const forestEngs = engineers.filter((e) => e.department === 'Forest Department');
  const electricityEngs = engineers.filter((e) => e.department === 'Electricity Department');
  const trafficEngs = engineers.filter((e) => e.department === 'Traffic Department');

  const availableCount = engineers.filter((e) => e.status === 'Available').length;
  const dispatchedCount = engineers.filter((e) => e.status === 'Dispatched').length;
  const emergencyCount = engineers.filter((e) => e.status === 'Emergency Inspection').length;

  const filteredEngineers = engineers.filter((eng) => {
    const matchesDept = selectedDept === 'All' || eng.department === selectedDept;
    const matchesSearch =
      eng.name.toLowerCase().includes(search.toLowerCase()) ||
      eng.engineerLicense.toLowerCase().includes(search.toLowerCase()) ||
      eng.specialization.toLowerCase().includes(search.toLowerCase()) ||
      eng.assignedZone.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const pendingDamages = damagedLocations.filter((d) => d.status !== 'RESOLVED');

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchModalEngineer || !selectedLocationId) return;

    onDispatchEngineer(dispatchModalEngineer.id, selectedLocationId, dispatchNotes);
    const loc = damagedLocations.find((d) => d.id === selectedLocationId);
    setDispatchSuccessMessage(`Successfully dispatched ${dispatchModalEngineer.name} to ${loc?.locationName || 'the site'}!`);

    setTimeout(() => {
      setDispatchSuccessMessage('');
      setDispatchModalEngineer(null);
      setSelectedLocationId('');
      setDispatchNotes('');
    }, 1800);
  };

  const getDeptColor = (dept: DepartmentType) => {
    switch (dept) {
      case 'Road Department':
        return {
          badge: 'bg-blue-950 text-blue-300 border-blue-800',
          dot: 'bg-blue-400',
          icon: Hammer,
        };
      case 'Forest Department':
        return {
          badge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
          dot: 'bg-emerald-400',
          icon: Trees,
        };
      case 'Electricity Department':
        return {
          badge: 'bg-amber-950 text-amber-300 border-amber-800',
          dot: 'bg-amber-400',
          icon: Zap,
        };
      case 'Traffic Department':
        return {
          badge: 'bg-purple-950 text-purple-300 border-purple-800',
          dot: 'bg-purple-400',
          icon: Car,
        };
      default:
        return {
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          icon: HardHat,
        };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner with Total Count */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-cyan-400" /> Municipal Engineer Directory
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Licensed Engineers Roster</span>
            <span className="px-3 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-sm font-bold">
              Total: {totalCount} Engineers
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete registry of licensed municipal engineers, structural auditors, and emergency field dispatchers categorized by department.
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{availableCount} Available</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>{dispatchedCount} Dispatched</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>{emergencyCount} Emergency Audit</span>
          </div>
        </div>
      </div>

      {/* DEPARTMENT-BY-DEPARTMENT BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Road Department Card */}
        <div
          onClick={() => setSelectedDept(selectedDept === 'Road Department' ? 'All' : 'Road Department')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedDept === 'Road Department'
              ? 'bg-blue-950/50 border-blue-500 shadow-md shadow-blue-500/10'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <Hammer className="w-4 h-4" />
            </div>
            <span className="text-xl font-black text-white">{roadEngs.length}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Road Department</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {roadEngs.map((e) => e.name.split(',')[0]).join(', ')}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-blue-400">
            <span>Highway &amp; Bridges</span>
            <span className="font-semibold">{roadEngs.length} Engineers</span>
          </div>
        </div>

        {/* Forest Department Card */}
        <div
          onClick={() => setSelectedDept(selectedDept === 'Forest Department' ? 'All' : 'Forest Department')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedDept === 'Forest Department'
              ? 'bg-emerald-950/50 border-emerald-500 shadow-md shadow-emerald-500/10'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Trees className="w-4 h-4" />
            </div>
            <span className="text-xl font-black text-white">{forestEngs.length}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Forest Department</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {forestEngs.map((e) => e.name.split(',')[0]).join(', ')}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-emerald-400">
            <span>Canopy &amp; Slope Stability</span>
            <span className="font-semibold">{forestEngs.length} Engineer</span>
          </div>
        </div>

        {/* Electricity Department Card */}
        <div
          onClick={() => setSelectedDept(selectedDept === 'Electricity Department' ? 'All' : 'Electricity Department')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedDept === 'Electricity Department'
              ? 'bg-amber-950/50 border-amber-500 shadow-md shadow-amber-500/10'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xl font-black text-white">{electricityEngs.length}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Electricity Department</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {electricityEngs.map((e) => e.name.split(',')[0]).join(', ')}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-amber-400">
            <span>High-Voltage &amp; Grid</span>
            <span className="font-semibold">{electricityEngs.length} Engineer</span>
          </div>
        </div>

        {/* Traffic Department Card */}
        <div
          onClick={() => setSelectedDept(selectedDept === 'Traffic Department' ? 'All' : 'Traffic Department')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedDept === 'Traffic Department'
              ? 'bg-purple-950/50 border-purple-500 shadow-md shadow-purple-500/10'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-xl font-black text-white">{trafficEngs.length}</span>
          </div>
          <h3 className="text-sm font-bold text-white">Traffic Department</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {trafficEngs.map((e) => e.name.split(',')[0]).join(', ')}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-purple-400">
            <span>Traffic Signals &amp; Flow</span>
            <span className="font-semibold">{trafficEngs.length} Engineer</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedDept('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedDept === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Engineers ({totalCount})
          </button>
          <button
            onClick={() => setSelectedDept('Road Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDept === 'Road Department'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Hammer className="w-3.5 h-3.5 text-blue-400" />
            Road ({roadEngs.length})
          </button>
          <button
            onClick={() => setSelectedDept('Forest Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDept === 'Forest Department'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            Forest ({forestEngs.length})
          </button>
          <button
            onClick={() => setSelectedDept('Electricity Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDept === 'Electricity Department'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Electricity ({electricityEngs.length})
          </button>
          <button
            onClick={() => setSelectedDept('Traffic Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDept === 'Traffic Department'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-purple-400" />
            Traffic ({trafficEngs.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search engineer name, license..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Engineer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEngineers.map((eng) => {
          const deptStyle = getDeptColor(eng.department);
          const DeptIcon = deptStyle.icon;

          const statusStyle =
            eng.status === 'Available'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
              : eng.status === 'Dispatched'
              ? 'bg-blue-950 text-blue-300 border-blue-800'
              : eng.status === 'Emergency Inspection'
              ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
              : 'bg-slate-800 text-slate-400 border-slate-700';

          return (
            <div
              key={eng.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              <div>
                {/* Header & Avatar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={eng.avatar}
                      alt={eng.name}
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-700/80 shadow-md flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {eng.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400">{eng.engineerLicense}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center gap-1 ${statusStyle}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {eng.status}
                  </span>
                </div>

                {/* Department Tag */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${deptStyle.badge}`}
                  >
                    <DeptIcon className="w-3.5 h-3.5" />
                    {eng.department}
                  </span>
                </div>

                {/* Specialization */}
                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 text-xs space-y-2 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Specialization</span>
                    <span className="text-slate-200 font-medium">{eng.specialization}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {eng.assignedZone}
                    </span>
                    <span className="text-amber-400 font-semibold">★ {eng.rating}</span>
                  </div>
                </div>

                {/* Active Assignment Site */}
                {eng.activeDispatchLocation && (
                  <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300 flex items-start gap-2 mb-3">
                    <Radio className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0 animate-pulse" />
                    <div>
                      <span className="text-[10px] text-blue-400 font-semibold block uppercase">Active Dispatch Site</span>
                      <span className="font-medium text-slate-200">{eng.activeDispatchLocation}</span>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <Phone className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{eng.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{eng.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  <strong className="text-white font-bold">{eng.completedAudits}</strong> audits completed
                </span>

                <button
                  type="button"
                  onClick={() => setDispatchModalEngineer(eng)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-blue-600/20 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Dispatch</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Modal */}
      {dispatchModalEngineer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setDispatchModalEngineer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Dispatch {dispatchModalEngineer.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {dispatchModalEngineer.department} &bull; {dispatchModalEngineer.engineerLicense}
                </p>
              </div>
            </div>

            {dispatchSuccessMessage ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 my-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-sm">{dispatchSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleConfirmDispatch} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Select Target Damaged Road or Critical Infrastructure Site
                  </label>
                  <select
                    required
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Choose active municipal incident --</option>
                    {pendingDamages.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        [{loc.department}] {loc.title} - {loc.locationName} ({loc.riskLevel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Engineering Dispatch Directives &amp; Priority Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={dispatchNotes}
                    onChange={(e) => setDispatchNotes(e.target.value)}
                    placeholder="e.g. Conduct core ultrasonic scan, check rebar spalling, seal road perimeter..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDispatchModalEngineer(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Confirm Field Dispatch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
