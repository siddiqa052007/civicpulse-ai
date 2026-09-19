import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  Sparkles,
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  Users,
  TrendingUp,
  Workflow,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { DOCUMENTATION_SECTIONS } from '../data/mockData';

interface DocumentationViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ onNavigateTab }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(DOCUMENTATION_SECTIONS[0].id);
  const [search, setSearch] = useState('');

  const currentSection =
    DOCUMENTATION_SECTIONS.find((s) => s.id === selectedSectionId) || DOCUMENTATION_SECTIONS[0];

  const filteredSections = DOCUMENTATION_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(search.toLowerCase()) ||
      sec.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> CivicPulse AI System Whitepaper
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Official System Documentation (10 Architectural Sections)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Complete engineering specification: problem statement, predictive structural risk model, 18-year danger rule, and impact metrics.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('history')}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-colors flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Try &gt;18 Yr Danger Predictor</span>
        </button>
      </div>

      {/* Main Grid: Section Navigation (4 Cols) & Full Text Reader (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Section Menu (4 Columns) */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-20 self-start">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documentation topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredSections.map((sec) => {
              const isSelected = sec.id === selectedSectionId;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sec.id}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      isSelected ? 'text-blue-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Section Content Reader (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                Section {currentSection.id}
              </span>
              <span className="text-xs text-slate-400">CivicPulse Technical Blueprint</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentSection.title}
            </h2>
          </div>

          {/* Formatted Content */}
          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
            {currentSection.content}
          </div>

          {/* Key Reference Callout */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Key Architectural Mandate:
            </h4>
            <p className="text-xs text-slate-300">
              {currentSection.subtitle} — Integrated with real-time Gemini AI vision, &gt;18-year construction fatigue safety protocols, and GIS spatial hazard tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
