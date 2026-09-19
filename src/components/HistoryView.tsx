import React, { useState } from 'react';
import {
  History,
  Building,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  HardHat,
  RefreshCw,
  PlusCircle,
  FileText,
  Clock,
  Eye,
  Camera,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConstructionHistoryItem } from '../types';

interface HistoryViewProps {
  constructionHistory: ConstructionHistoryItem[];
  onAddBuilding: (building: ConstructionHistoryItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  constructionHistory,
  onAddBuilding,
  onNavigateTab,
}) => {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'ALL' | 'DANGER_ABOVE_18' | 'SAFE_BELOW_18'>('ALL');
  const [selectedBuilding, setSelectedBuilding] = useState<ConstructionHistoryItem | null>(
    constructionHistory[0] || null
  );

  // AI Prediction form states
  const [showPredictor, setShowPredictor] = useState(false);
  const [bldName, setBldName] = useState('');
  const [bldLocation, setBldLocation] = useState('');
  const [bldType, setBldType] = useState<any>('Commercial Complex');
  const [knownYear, setKnownYear] = useState<string>('2001');
  const [materials, setMaterials] = useState('Reinforced concrete, brick masonry, steel beams');
  const [observedCracks, setObservedCracks] = useState('Hairline diagonal shear cracks in ground floor pillars, concrete spalling');
  const [maintenanceHistory, setMaintenanceHistory] = useState('No seismic retrofit since 2012');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  // Filtered list
  const filteredHistory = constructionHistory.filter((item) => {
    const matchesSearch =
      item.buildingName.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.contractor.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase());

    if (filterMode === 'DANGER_ABOVE_18') return matchesSearch && item.isDangerAbove18;
    if (filterMode === 'SAFE_BELOW_18') return matchesSearch && !item.isDangerAbove18;
    return matchesSearch;
  });

  const dangerCount = constructionHistory.filter((b) => b.isDangerAbove18).length;
  const safeCount = constructionHistory.filter((b) => !b.isDangerAbove18).length;

  // Run AI Building Age & Danger Prediction
  const handlePredictBuildingAge = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setPredictionResult(null);

    try {
      const res = await fetch('/api/ai/predict-building-age', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buildingName: bldName || 'Municipal Infrastructure Structure',
          location: bldLocation || 'Downtown Urban Corridor',
          structureType: bldType,
          knownYearBuilt: knownYear ? parseInt(knownYear, 10) : undefined,
          materials,
          observedCracks,
          maintenanceHistory,
        }),
      });

      const data = await res.json();
      setPredictionResult(data);

      if (data.isDangerAbove18) {
        // Trigger alert effect
      } else {
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (_) {}
      }
    } catch (err) {
      console.error('Age prediction error:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  // Save predicted building to official history
  const handleSaveToHistory = () => {
    if (!predictionResult) return;

    const currentYear = new Date().getFullYear();
    const newBld: ConstructionHistoryItem = {
      id: `bld-${Date.now()}`,
      buildingName: predictionResult.buildingName || bldName || 'Audited Infrastructure Asset',
      location: bldLocation || 'Metro District 4',
      district: 'Central Metro',
      yearBuilt: predictionResult.estimatedYearBuilt || (currentYear - predictionResult.ageInYears),
      ageInYears: predictionResult.ageInYears,
      structureType: bldType,
      materials,
      riskScore: predictionResult.riskScore || (predictionResult.isDangerAbove18 ? 85 : 25),
      isDangerAbove18: predictionResult.isDangerAbove18,
      dangerInstructions: predictionResult.dangerInstructions || [
        'CRITICAL DANGER: Building age > 18 years. Mandatory ultrasonic rebar scan required.'
      ],
      structuralIntegrityGrade: predictionResult.structuralIntegrityGrade || 'Grade C - High Risk',
      lastInspectedDate: new Date().toISOString().split('T')[0],
      nextScheduledAudit: predictionResult.isDangerAbove18 ? '2026-09-01 (URGENT)' : '2027-09-01',
      contractor: 'Municipal Engineering Works',
      floorsCount: 8,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
      occupancyCount: 420,
      coordinates: { lat: 37.7749, lng: -122.4194 }
    };

    onAddBuilding(newBld);
    setSelectedBuilding(newBld);
    setShowPredictor(false);
    setPredictionResult(null);

    try {
      confetti({ particleCount: 70, spread: 70 });
    } catch (_) {}
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <History className="w-3.5 h-3.5 text-red-400" /> Construction Cadastral Archive &amp; Age AI
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Construction History &amp; &gt;18 Year Age Danger Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Predict construction age, track structural fatigue, and issue automated danger instructions for structures surpassing 18 years.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowPredictor(!showPredictor)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{showPredictor ? 'Close AI Predictor' : 'Launch AI Age & Danger Predictor'}</span>
          </button>
        </div>
      </div>

      {/* AI Age & Danger Predictor Tool (The Core Requirement) */}
      {showPredictor && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/30 border border-red-800/60 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-md shadow-red-600/30">
                18+
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  AI Construction Age &amp; Danger Instruction Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Input structure details to calculate exact construction age. Structures &gt; 18 years immediately trigger mandatory civil danger instructions.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/80 hidden sm:inline">
              Gemini 3.7 Structural AI
            </span>
          </div>

          <form onSubmit={handlePredictBuildingAge} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Building / Structure Name
                </label>
                <input
                  type="text"
                  required
                  value={bldName}
                  onChange={(e) => setBldName(e.target.value)}
                  placeholder="e.g. Grand Central Municipal Complex"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location / Municipal District
                </label>
                <input
                  type="text"
                  required
                  value={bldLocation}
                  onChange={(e) => setBldLocation(e.target.value)}
                  placeholder="e.g. 450 Civic Center Blvd, Downtown"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Structure Type
                </label>
                <select
                  value={bldType}
                  onChange={(e) => setBldType(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="Residential High-Rise">Residential High-Rise</option>
                  <option value="Flyover Bridge">Flyover Bridge</option>
                  <option value="Municipal School">Municipal School</option>
                  <option value="Hospital Facility">Hospital Facility</option>
                  <option value="Substation Building">Substation Building</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Approx. Year Built / Permit Date
                </label>
                <input
                  type="number"
                  required
                  min="1900"
                  max="2026"
                  value={knownYear}
                  onChange={(e) => setKnownYear(e.target.value)}
                  placeholder="e.g. 2002 (24 years ago)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Construction Materials &amp; Framework
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. Cast-in-place reinforced concrete, brick masonry, steel tie beams"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Observed Cracks &amp; Surface Degradation
                </label>
                <input
                  type="text"
                  value={observedCracks}
                  onChange={(e) => setObservedCracks(e.target.value)}
                  placeholder="e.g. Micro-shear cracks on pillar footings, water seepage in basement"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Past Retrofit &amp; Maintenance Record
                </label>
                <input
                  type="text"
                  value={maintenanceHistory}
                  onChange={(e) => setMaintenanceHistory(e.target.value)}
                  placeholder="e.g. No seismic reinforcement in past 10 years"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPredicting}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPredicting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calculating Age Fatigue &amp; Simulating Danger Protocols...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute AI Construction Age &amp; Danger Prediction</span>
                </>
              )}
            </button>
          </form>

          {/* Prediction Result Container */}
          {predictionResult && (
            <div className="mt-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-slate-400">Analysis for:</span>
                  <h4 className="text-base font-bold text-white">{predictionResult.buildingName}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 font-mono">
                    Constructed: <strong>{predictionResult.estimatedYearBuilt}</strong> ({predictionResult.ageInYears} Years Ago)
                  </span>
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-lg border uppercase ${
                      predictionResult.isDangerAbove18
                        ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {predictionResult.isDangerAbove18 ? '⚠️ DANGER (AGE > 18 YRS)' : '✓ SAFE LIFECYCLE (≤ 18 YRS)'}
                  </span>
                </div>
              </div>

              {/* KPI Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Calculated Age</span>
                  <span className="text-2xl font-black text-white font-mono">{predictionResult.ageInYears} Years</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {predictionResult.ageInYears > 18 ? 'Exceeds 18-Yr Limit' : 'Within Lifespan'}
                  </span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Structural Risk Score</span>
                  <span
                    className={`text-2xl font-black font-mono ${
                      predictionResult.riskScore >= 70 ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {predictionResult.riskScore}/100
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Fatigue Vulnerability</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Integrity Rating</span>
                  <span className="text-sm font-bold text-cyan-300 block mt-1">
                    {predictionResult.structuralIntegrityGrade}
                  </span>
                </div>
              </div>

              {/* CRITICAL DANGER INSTRUCTIONS BOX (Prompt Mandate) */}
              {predictionResult.isDangerAbove18 ? (
                <div className="p-4 rounded-xl bg-red-950/80 border-2 border-red-600/80 text-red-200 space-y-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce flex-shrink-0" />
                    <h4 className="text-sm font-extrabold text-red-300 uppercase tracking-wide">
                      Mandatory Civil Danger Instructions (Age &gt; 18 Years Threshold Exceeded)
                    </h4>
                  </div>
                  <p className="text-xs text-red-300/90 font-medium">
                    Because this structure was constructed <strong>{predictionResult.ageInYears} years ago</strong> (surpassing the 18-year municipal structural fatigue limit), the following mandatory enforcement instructions are triggered immediately:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-red-100 font-medium pt-1">
                    {predictionResult.dangerInstructions?.map((inst: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-xs space-y-1">
                  <strong className="text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Structure is within Normal Lifecycle (Age &le; 18 Years)
                  </strong>
                  <p>Asset is within safe structural elasticity bounds. Standard preventive maintenance schedule applies.</p>
                </div>
              )}

              {/* Forensic Summary */}
              <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <strong className="text-cyan-400 block mb-1 text-[11px] uppercase">Forensic Evaluation Summary:</strong>
                <p className="italic">{predictionResult.summary}</p>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save Asset to Municipal Cadastral History</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Mode filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterMode === 'ALL'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Structures ({constructionHistory.length})
          </button>
          <button
            onClick={() => setFilterMode('DANGER_ABOVE_18')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterMode === 'DANGER_ABOVE_18'
                ? 'bg-red-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚠️ Danger &gt; 18 Yrs ({dangerCount})
          </button>
          <button
            onClick={() => setFilterMode('SAFE_BELOW_18')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterMode === 'SAFE_BELOW_18'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ✓ Safe &le; 18 Yrs ({safeCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search building name, district, contractor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-56 sm:w-72"
          />
        </div>
      </div>

      {/* Main Split: Construction History Records & Selected Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Building Cards List (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredHistory.map((item) => {
            const isSelected = selectedBuilding?.id === item.id;
            const isDanger = item.isDangerAbove18;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedBuilding(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm ${
                  isSelected
                    ? isDanger
                      ? 'bg-red-950/40 border-red-500/80 ring-1 ring-red-500'
                      : 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500'
                    : isDanger
                    ? 'bg-slate-900 border-red-900/40 hover:border-red-600/60'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={item.image}
                    alt={item.buildingName}
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-800 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                          isDanger
                            ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                            : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        }`}
                      >
                        {isDanger ? `⚠️ ${item.ageInYears} Yrs (DANGER > 18)` : `✓ ${item.ageInYears} Yrs (SAFE)`}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Built: {item.yearBuilt}</span>
                      <span className="text-[11px] text-blue-400">{item.structureType}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{item.buildingName}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {item.location} ({item.district})
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs self-end sm:self-center">
                  <span
                    className={`font-black font-mono ${
                      item.riskScore >= 70 ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    Risk: {item.riskScore}/100
                  </span>
                  <span className="text-[10px] text-slate-400">{item.structuralIntegrityGrade.split('-')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Building Detail & Danger Instructions Panel (5 Columns) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 lg:sticky lg:top-20 self-start">
          {selectedBuilding ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                      selectedBuilding.isDangerAbove18
                        ? 'bg-red-950 text-red-300 border-red-800 animate-pulse'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    {selectedBuilding.isDangerAbove18
                      ? `⚠️ DANGER: AGE IS ${selectedBuilding.ageInYears} YRS (>18 LIMIT)`
                      : `✓ SAFE: AGE IS ${selectedBuilding.ageInYears} YRS (≤18 LIMIT)`}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{selectedBuilding.buildingName}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {selectedBuilding.location}
                  </p>
                </div>
              </div>

              <img
                src={selectedBuilding.image}
                alt={selectedBuilding.buildingName}
                className="w-full h-44 rounded-xl object-cover ring-1 ring-slate-800 shadow-md"
              />

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Year Built</span>
                  <span className="font-bold text-white font-mono">{selectedBuilding.yearBuilt}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Exact Age</span>
                  <span className="font-bold text-white font-mono">{selectedBuilding.ageInYears} Yrs</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Floors</span>
                  <span className="font-bold text-amber-400 font-mono">{selectedBuilding.floorsCount} Fl</span>
                </div>
              </div>

              {/* Material & Contractor Specs */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
                <p>
                  <strong className="text-slate-400">Materials:</strong> {selectedBuilding.materials}
                </p>
                <p>
                  <strong className="text-slate-400">Contractor:</strong> {selectedBuilding.contractor}
                </p>
                <p>
                  <strong className="text-slate-400">Next Scheduled Audit:</strong>{' '}
                  <span className={selectedBuilding.isDangerAbove18 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {selectedBuilding.nextScheduledAudit}
                  </span>
                </p>
              </div>

              {/* Danger Instructions (Mandatory user requirement) */}
              {selectedBuilding.isDangerAbove18 ? (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-700 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-red-300 font-bold">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>Official Danger Instructions &amp; Retrofit Protocols</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-red-100/90 text-[11px]">
                    {selectedBuilding.dangerInstructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                  <strong>Structural Status:</strong> Normal operational health. Bi-annual elastomeric joint sealant renewal recommended.
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => onNavigateTab('engineers')}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <HardHat className="w-3.5 h-3.5" />
                  <span>Dispatch Inspector</span>
                </button>
                <button
                  onClick={() => onNavigateTab('maps')}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  View on GIS
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <History className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">Select any building record to inspect its complete construction history and danger directives.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
