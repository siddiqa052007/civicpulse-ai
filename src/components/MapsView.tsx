import React, { useState } from 'react';
import {
  Map as MapIcon,
  ShieldAlert,
  AlertTriangle,
  Building,
  Navigation,
  Layers,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  HardHat,
  MapPin,
  Flame,
  Zap,
  Hammer,
  Trees,
  Car,
  Compass,
  Maximize2,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { DamagedLocation, ConstructionHistoryItem, DepartmentType } from '../types';

interface MapsViewProps {
  damagedLocations: DamagedLocation[];
  constructionHistory: ConstructionHistoryItem[];
  onSelectDamagedLocation?: (loc: DamagedLocation) => void;
  onSelectBuilding?: (bld: ConstructionHistoryItem) => void;
  onNavigateTab: (tab: string) => void;
}

interface MapZone {
  id: string;
  name: string;
  department: DepartmentType;
  district: string;
  status: 'DANGER' | 'IN_RISK' | 'SAFE';
  riskScore: number;
  hazardType: string;
  description: string;
  activeHazardsCount: number;
  xPercent: number; // For map positioning (0-100)
  yPercent: number; // For map positioning (0-100)
  roadsAffected: string[];
  safeStatusNotes?: string;
  engineerAssigned?: string;
}

export const MapsView: React.FC<MapsViewProps> = ({
  damagedLocations,
  constructionHistory,
  onNavigateTab,
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapZoom, setMapZoom] = useState<number>(1);

  // Pre-defined spatial map zones covering Road, Forest, Electricity, Traffic
  const mapZones: MapZone[] = [
    {
      id: 'zone-rd-1',
      name: 'Oak St & 5th Ave Viaduct Corridor',
      department: 'Road Department',
      district: 'Central Metro Corridor',
      status: 'DANGER',
      riskScore: 89,
      hazardType: '14" Asphalt Pothole Fissure & Sub-base Fatigue',
      description: 'Severe structural cratering on main arterial transit lane causing rim damage and vehicle steering destabilization.',
      activeHazardsCount: 3,
      xPercent: 32,
      yPercent: 44,
      roadsAffected: ['Oak St', '5th Ave', 'Metro Viaduct #2'],
      engineerAssigned: 'Eng. Marcus Vance, PE',
    },
    {
      id: 'zone-rd-2',
      name: 'Bay Bridge Approach Pier 12 Ramp',
      department: 'Road Department',
      district: 'Waterfront Transit Zone',
      status: 'IN_RISK',
      riskScore: 68,
      hazardType: 'Neoprene Expansion Joint Seal Rupture',
      description: 'De-icing salt water seepage through perishing bridge expansion joints corroding steel cross-girders.',
      activeHazardsCount: 1,
      xPercent: 78,
      yPercent: 28,
      roadsAffected: ['Bay Bridge Approach', 'Embarcadero Pier 12 Ramp'],
      engineerAssigned: 'Eng. Sarah Connor, SE',
    },
    {
      id: 'zone-fr-1',
      name: 'Pine Ridge Hillside & Green Buffer Belt',
      department: 'Forest Department',
      district: 'West Hills Conservation Zone',
      status: 'DANGER',
      riskScore: 85,
      hazardType: 'Slope Retaining Wall Shift & Landslide Hazard',
      description: 'Heavy precipitation eroded root anchors on 45° slope; 90-ton earth mass shifting toward secondary bypass road.',
      activeHazardsCount: 2,
      xPercent: 18,
      yPercent: 26,
      roadsAffected: ['Pine Ridge Hillside Bypass', 'Ridge Crest Way'],
      engineerAssigned: 'Eng. Maya Lin, Arborist PE',
    },
    {
      id: 'zone-fr-2',
      name: 'Buena Vista Park Western Perimeter',
      department: 'Forest Department',
      district: 'Upper Heights District',
      status: 'IN_RISK',
      riskScore: 72,
      hazardType: 'Ficus Root Sidewalk Uprooting & Heave',
      description: 'Historic tree roots lifted 4 concrete pavement slabs by 9 inches, blocking pedestrian and emergency access.',
      activeHazardsCount: 1,
      xPercent: 24,
      yPercent: 68,
      roadsAffected: ['Buena Vista Western Perimeter Road'],
      engineerAssigned: 'Eng. Maya Lin, Arborist PE',
    },
    {
      id: 'zone-el-1',
      name: 'Market St & 9th Junction Underground Vault',
      department: 'Electricity Department',
      district: 'Downtown Commercial Core',
      status: 'DANGER',
      riskScore: 95,
      hazardType: '4.8kV High-Voltage Conduit Washout',
      description: 'Storm washout exposed live high-voltage cables with insulation fraying beneath cracked pedestrian sidewalk.',
      activeHazardsCount: 2,
      xPercent: 54,
      yPercent: 48,
      roadsAffected: ['Market St', '9th St Pedestrian Walkway'],
      engineerAssigned: 'Eng. Tariq Al-Hassan, EE',
    },
    {
      id: 'zone-el-2',
      name: 'Harbor Power Distribution Substation 3',
      department: 'Electricity Department',
      district: 'Industrial Waterfront',
      status: 'IN_RISK',
      riskScore: 76,
      hazardType: 'Saltwater Chloride Ingress & Transformer Overheating',
      description: '27-year-old high-voltage facility showing chloride ingress in reinforced concrete bunker.',
      activeHazardsCount: 1,
      xPercent: 74,
      yPercent: 72,
      roadsAffected: ['Dockside Industrial Way', 'Substation Access Road'],
      engineerAssigned: 'Eng. Tariq Al-Hassan, EE',
    },
    {
      id: 'zone-tf-1',
      name: 'Mission St & 16th St High-Volume Intersection',
      department: 'Traffic Department',
      district: 'Mission District',
      status: 'DANGER',
      riskScore: 91,
      hazardType: 'SCADA Signal Controller Board Failure (Blind Junction)',
      description: 'Controller power surge caused flashing red mode in 4 directions during peak transit hours.',
      activeHazardsCount: 1,
      xPercent: 48,
      yPercent: 66,
      roadsAffected: ['Mission St', '16th St Arterial', 'Valencia St Corridor'],
      engineerAssigned: 'Eng. Gregory Walsh, TE',
    },
    {
      id: 'zone-safe-1',
      name: 'Greenfield Eco-Residences Waterfront Sector',
      department: 'Road Department',
      district: 'Waterfront Innovation Quarter',
      status: 'SAFE',
      riskScore: 12,
      hazardType: 'Certified Safe - All Infrastructure Operational',
      description: 'Newly constructed corridor (2019) with high-performance self-healing asphalt and smart drainage.',
      activeHazardsCount: 0,
      xPercent: 82,
      yPercent: 40,
      roadsAffected: ['Bayview Promenade', 'Innovation Way'],
      safeStatusNotes: 'Grade A - Certified Safe by Structural PE',
    },
    {
      id: 'zone-safe-2',
      name: 'Presidio Nature Preserve & Forest Trailway',
      department: 'Forest Department',
      district: 'North Presidio Zone',
      status: 'SAFE',
      riskScore: 8,
      hazardType: 'Protected Canopy - Soil Stable',
      description: 'Recent geotechnical stabilization completed. Root buffers clear from arterial roads.',
      activeHazardsCount: 0,
      xPercent: 28,
      yPercent: 12,
      roadsAffected: ['Presidio Main Trail', 'North Bluff Parkway'],
      safeStatusNotes: 'Zero root incursions, soil matrix optimal',
    },
    {
      id: 'zone-safe-3',
      name: 'North Substation & Solar Microgrid Grid #1',
      department: 'Electricity Department',
      district: 'North Innovation District',
      status: 'SAFE',
      riskScore: 14,
      hazardType: 'Grid Voltage Balanced & Underground Telemetry Active',
      description: 'Substation telemetry nominal. Zero thermal hotspots detected by infrared drone survey.',
      activeHazardsCount: 0,
      xPercent: 58,
      yPercent: 18,
      roadsAffected: ['Solar Way', 'Grid Station Access Loop'],
      safeStatusNotes: 'All 115kV lines insulated and secure',
    },
    {
      id: 'zone-safe-4',
      name: 'Geary Blvd Synchronized Green-Wave Corridor',
      department: 'Traffic Department',
      district: 'Richmond Arterial Corridor',
      status: 'SAFE',
      riskScore: 10,
      hazardType: 'Adaptive AI Traffic Control Operating Flawlessly',
      description: 'Smart signal timing adaptive controllers reducing congestion and ensuring safe pedestrian crossing intervals.',
      activeHazardsCount: 0,
      xPercent: 42,
      yPercent: 28,
      roadsAffected: ['Geary Blvd', 'Park Presidio Interchange'],
      safeStatusNotes: '100% Signal uptime, zero collisions reported',
    },
  ];

  const [selectedZone, setSelectedZone] = useState<MapZone>(mapZones[0]);

  // Filtering
  const filteredZones = mapZones.filter((zone) => {
    const matchDept = selectedDeptFilter === 'All' || zone.department === selectedDeptFilter;
    const matchStatus = selectedStatusFilter === 'All' || zone.status === selectedStatusFilter;
    const matchSearch =
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.hazardType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.roadsAffected.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDept && matchStatus && matchSearch;
  });

  // Department Department Status calculation
  const getDeptStatusSummary = (dept: DepartmentType) => {
    const zones = mapZones.filter((z) => z.department === dept);
    const hasDanger = zones.some((z) => z.status === 'DANGER');
    const hasRisk = zones.some((z) => z.status === 'IN_RISK');

    if (hasDanger) return { status: 'DANGER', label: 'DANGER', color: 'text-red-400 bg-red-950/80 border-red-800' };
    if (hasRisk) return { status: 'IN_RISK', label: 'IN RISK', color: 'text-amber-400 bg-amber-950/80 border-amber-800' };
    return { status: 'SAFE', label: 'SAFE', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' };
  };

  const dangerCount = mapZones.filter((z) => z.status === 'DANGER').length;
  const inRiskCount = mapZones.filter((z) => z.status === 'IN_RISK').length;
  const safeCount = mapZones.filter((z) => z.status === 'SAFE').length;

  const getDeptIcon = (dept: DepartmentType) => {
    switch (dept) {
      case 'Road Department':
        return Hammer;
      case 'Forest Department':
        return Trees;
      case 'Electricity Department':
        return Zap;
      case 'Traffic Department':
        return Car;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
              <MapIcon className="w-3.5 h-3.5 text-cyan-400" /> Municipal GIS Map &amp; Danger Radar
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Hazard Map: Department Danger, Risk &amp; Safe Zones
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Geographic status tracking of municipal roads, forest buffers, electrical grids, and traffic networks.
          </p>
        </div>

        {/* Global Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedStatusFilter('DANGER')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedStatusFilter === 'DANGER'
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                : 'bg-red-950/60 text-red-300 border-red-800/60 hover:bg-red-900/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>{dangerCount} in Danger</span>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('IN_RISK')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedStatusFilter === 'IN_RISK'
                ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30'
                : 'bg-amber-950/60 text-amber-300 border-amber-800/60 hover:bg-amber-900/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{inRiskCount} in Risk</span>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('SAFE')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedStatusFilter === 'SAFE'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{safeCount} Safe Zones</span>
          </button>
        </div>
      </div>

      {/* DEPARTMENT HAZARD STATUS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Road Department */}
        {(() => {
          const summary = getDeptStatusSummary('Road Department');
          return (
            <div
              onClick={() => setSelectedDeptFilter(selectedDeptFilter === 'Road Department' ? 'All' : 'Road Department')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedDeptFilter === 'Road Department'
                  ? 'bg-blue-950/60 border-blue-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Hammer className="w-3.5 h-3.5 text-blue-400" /> Road Department
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${summary.color}`}>
                  {summary.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1 Danger (Oak St Potholes) &bull; 1 Risk (Bay Bridge)
              </p>
            </div>
          );
        })()}

        {/* Forest Department */}
        {(() => {
          const summary = getDeptStatusSummary('Forest Department');
          return (
            <div
              onClick={() => setSelectedDeptFilter(selectedDeptFilter === 'Forest Department' ? 'All' : 'Forest Department')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedDeptFilter === 'Forest Department'
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-400" /> Forest Department
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${summary.color}`}>
                  {summary.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1 Danger (Pine Ridge Slope) &bull; 1 Risk (Buena Vista)
              </p>
            </div>
          );
        })()}

        {/* Electricity Department */}
        {(() => {
          const summary = getDeptStatusSummary('Electricity Department');
          return (
            <div
              onClick={() => setSelectedDeptFilter(selectedDeptFilter === 'Electricity Department' ? 'All' : 'Electricity Department')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedDeptFilter === 'Electricity Department'
                  ? 'bg-amber-950/60 border-amber-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Electricity Dept
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${summary.color}`}>
                  {summary.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1 Danger (Market 4.8kV) &bull; 1 Risk (Substation 3)
              </p>
            </div>
          );
        })()}

        {/* Traffic Department */}
        {(() => {
          const summary = getDeptStatusSummary('Traffic Department');
          return (
            <div
              onClick={() => setSelectedDeptFilter(selectedDeptFilter === 'Traffic Department' ? 'All' : 'Traffic Department')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedDeptFilter === 'Traffic Department'
                  ? 'bg-purple-950/60 border-purple-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-purple-400" /> Traffic Department
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${summary.color}`}>
                  {summary.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1 Danger (Mission 16th Signal) &bull; 1 Safe Corridor
              </p>
            </div>
          );
        })()}
      </div>

      {/* FILTER & CONTROLS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Department Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedDeptFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDeptFilter === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Departments
          </button>
          <button
            onClick={() => setSelectedDeptFilter('Road Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDeptFilter === 'Road Department'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Hammer className="w-3.5 h-3.5 text-blue-400" /> Road
          </button>
          <button
            onClick={() => setSelectedDeptFilter('Forest Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDeptFilter === 'Forest Department'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-emerald-400" /> Forest
          </button>
          <button
            onClick={() => setSelectedDeptFilter('Electricity Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDeptFilter === 'Electricity Department'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Electricity
          </button>
          <button
            onClick={() => setSelectedDeptFilter('Traffic Department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedDeptFilter === 'Traffic Department'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-purple-400" /> Traffic
          </button>
        </div>

        {/* Status Quick Filter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedStatusFilter('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              selectedStatusFilter === 'All'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Statuses ({mapZones.length})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('DANGER')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              selectedStatusFilter === 'DANGER'
                ? 'bg-red-950 text-red-300 border border-red-800'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            Danger ({dangerCount})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('IN_RISK')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              selectedStatusFilter === 'IN_RISK'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Risk ({inRiskCount})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('SAFE')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
              selectedStatusFilter === 'SAFE'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            Safe ({safeCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter road, district, hazard..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* MAIN INTERACTIVE MAP LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAP CANVAS (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col min-h-[540px]">
          {/* Map Controls Header */}
          <div className="p-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-200">Live Municipal GIS Telemetry Grid</span>
              <span className="text-[11px] text-slate-400 font-mono">({filteredZones.length} Zones Visible)</span>
            </div>

            {/* Map Legend */}
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-red-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Danger
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> In Risk
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Safe
              </span>
            </div>
          </div>

          {/* Tactical Vector Map Canvas */}
          <div className="relative flex-1 bg-[#090d16] p-4 flex items-center justify-center overflow-hidden select-none">
            {/* GIS Grid Lines Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

            {/* Simulated Geographic Landmasses & Coastline */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Coastline / Bay */}
              <path
                d="M 650 0 Q 600 200 680 350 T 750 600 L 900 600 L 900 0 Z"
                fill="#1e3a8a"
                opacity="0.25"
              />
              {/* Forest Buffer Region */}
              <path
                d="M 0 0 L 220 0 L 180 250 L 0 350 Z"
                fill="#064e3b"
                opacity="0.2"
              />
              {/* Central Highway Arterial */}
              <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#334155" strokeWidth="6" strokeDasharray="6 4" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#334155" strokeWidth="6" strokeDasharray="6 4" />
              <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#1e293b" strokeWidth="4" />
            </svg>

            {/* City District Regions Overlay */}
            <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-emerald-500/60 uppercase">
              🌲 West Hills &amp; Forest Reserve
            </div>
            <div className="absolute top-4 right-12 text-[10px] font-mono tracking-widest text-blue-400/60 uppercase">
              🌊 Bay Shoreline &amp; Innovation Pier
            </div>
            <div className="absolute bottom-4 left-6 text-[10px] font-mono tracking-widest text-purple-400/60 uppercase">
              🚦 Mission &amp; Sunset Corridor
            </div>
            <div className="absolute bottom-4 right-12 text-[10px] font-mono tracking-widest text-amber-400/60 uppercase">
              ⚡ Harbor Grid &amp; Industrial Sector
            </div>

            {/* Interactive Map Pins & Zones */}
            {filteredZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              const DeptIcon = getDeptIcon(zone.department);

              let pinBg = 'bg-emerald-500 border-emerald-300 text-black';
              let ringColor = 'ring-emerald-500/50';
              let pulseClass = '';

              if (zone.status === 'DANGER') {
                pinBg = 'bg-red-600 border-red-400 text-white';
                ringColor = 'ring-red-500/50';
                pulseClass = 'animate-bounce';
              } else if (zone.status === 'IN_RISK') {
                pinBg = 'bg-amber-500 border-amber-300 text-black';
                ringColor = 'ring-amber-500/50';
                pulseClass = '';
              }

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    left: `${zone.xPercent}%`,
                    top: `${zone.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-10`}
                >
                  {/* Outer Pulsing Aura for Danger Pins */}
                  {zone.status === 'DANGER' && (
                    <span className="absolute -inset-2 rounded-full bg-red-600/40 animate-ping" />
                  )}

                  {/* Pin Node */}
                  <div
                    className={`w-9 h-9 rounded-2xl border-2 flex items-center justify-center shadow-lg transition-transform ${pinBg} ${
                      isSelected ? 'scale-125 ring-4 ring-white shadow-2xl z-30' : 'group-hover:scale-110'
                    }`}
                  >
                    <DeptIcon className="w-4 h-4 stroke-[2.5]" />
                  </div>

                  {/* Floating Tag */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none transition-opacity ${
                      isSelected
                        ? 'bg-white text-slate-900 opacity-100 z-30'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {zone.name.split(' ')[0]} ({zone.status})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" /> Coordinates Calibrated: 37.7749° N, 122.4194° W
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Real-Time Sensor Telemetry Active</span>
          </div>
        </div>

        {/* DETAILS INSPECTOR PANEL (1 Column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            {/* Department Tag & Status */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedZone.department === 'Road Department'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800'
                      : selectedZone.department === 'Forest Department'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : selectedZone.department === 'Electricity Department'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}
                >
                  {React.createElement(getDeptIcon(selectedZone.department), { className: 'w-4 h-4' })}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{selectedZone.department}</h4>
                  <p className="text-[10px] text-slate-400">{selectedZone.district}</p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide border flex items-center gap-1 ${
                  selectedZone.status === 'DANGER'
                    ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                    : selectedZone.status === 'IN_RISK'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {selectedZone.status === 'DANGER'
                  ? '🔴 DANGER'
                  : selectedZone.status === 'IN_RISK'
                  ? '🟡 IN RISK'
                  : '🟢 SAFE'}
              </span>
            </div>

            {/* Zone Name & Risk Score */}
            <div className="mb-4">
              <h2 className="text-base font-extrabold text-white tracking-tight leading-snug">
                {selectedZone.name}
              </h2>
              <div className="flex items-center justify-between mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Composite Risk Severity</span>
                <span
                  className={`text-sm font-black ${
                    selectedZone.riskScore >= 80
                      ? 'text-red-400'
                      : selectedZone.riskScore >= 50
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {selectedZone.riskScore} / 100
                </span>
              </div>
            </div>

            {/* Hazard / Safety Summary */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                  Hazard Classification &amp; Condition
                </span>
                <p className="text-slate-200 font-medium">{selectedZone.hazardType}</p>
                <p className="text-slate-400 text-[11px] mt-1">{selectedZone.description}</p>
              </div>

              {/* Roads / Corridors Affected */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                  Roads &amp; Corridors in this Zone
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedZone.roadsAffected.map((road, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700 font-medium"
                    >
                      {road}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Engineer */}
              {selectedZone.engineerAssigned && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="text-[10px] text-blue-400 font-semibold block uppercase">Dispatched Engineer</span>
                      <span className="text-xs font-bold text-white">{selectedZone.engineerAssigned}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateTab('engineers')}
                    className="text-[11px] text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                  >
                    View Roster &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onNavigateTab('engineers')}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Dispatch Engineer to this Hazard Area</span>
            </button>
            <button
              onClick={() => onNavigateTab('reports')}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Capture AI Photo Report of this Road</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
