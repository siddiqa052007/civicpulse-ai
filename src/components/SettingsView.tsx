import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldAlert,
  Sliders,
  Bell,
  Cpu,
  Save,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Lock,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SettingsViewProps {
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetData }) => {
  const [ageDangerThreshold, setAgeDangerThreshold] = useState<number>(18);
  const [criticalScoreThreshold, setCriticalScoreThreshold] = useState<number>(80);
  const [autoDispatchEnabled, setAutoDispatchEnabled] = useState<boolean>(true);
  const [emergencyAlertsEnabled, setEmergencyAlertsEnabled] = useState<boolean>(true);
  const [selectedAiModel, setSelectedAiModel] = useState<string>('gemini-2.5-flash');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (_) {}
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <SettingsIcon className="w-3.5 h-3.5 text-slate-400" /> Platform Configuration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            System Thresholds &amp; AI Risk Parameters
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Configure municipal structural age limits, AI reasoning pipelines, emergency escalation triggers, and telemetry.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Successfully Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Card 1: Core 18-Year Construction Age Rule & Structural Thresholds */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950/80 border border-red-800 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Construction Fatigue &amp; Danger Age Threshold
              </h3>
              <p className="text-xs text-slate-400">
                Structures surpassing this age are flagged in High Danger state with mandatory civil retrofitting instructions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Building Danger Age Limit (Years)
                </label>
                <span className="text-sm font-extrabold text-red-400 font-mono">
                  {ageDangerThreshold} Years
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={ageDangerThreshold}
                onChange={(e) => setAgeDangerThreshold(parseInt(e.target.value, 10))}
                className="w-full accent-red-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Default: <strong>18 Years</strong> (Mandatory Municipal Structural Safety Standard).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Critical Hazard Severity Threshold
                </label>
                <span className="text-sm font-extrabold text-amber-400 font-mono">
                  {criticalScoreThreshold} / 100
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={criticalScoreThreshold}
                onChange={(e) => setCriticalScoreThreshold(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Scores &ge; {criticalScoreThreshold} immediately trigger red map pins and emergency work orders.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: AI Vision & LLM Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Server-Side Gemini AI Model Orchestration
              </h3>
              <p className="text-xs text-slate-400">
                Controls neural damage vision models, structural fatigue predictors, and Copilot reasoning.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Primary Multimodal Intelligence Model
              </label>
              <select
                value={selectedAiModel}
                onChange={(e) => setSelectedAiModel(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended: Fast Triage &amp; Vision)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Forensic Reasoning)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="font-semibold text-white block">Automated Dispatch Engine</span>
                <span className="text-[11px] text-slate-400">
                  Auto-assigns nearest qualified PE to critical hazards
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoDispatchEnabled}
                onChange={(e) => setAutoDispatchEnabled(e.target.checked)}
                className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Municipal Danger Broadcasts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Emergency Alert Broadcasts
              </h3>
              <p className="text-xs text-slate-400">
                Push notifications to field engineers and civic maintenance teams.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-white block">Broadcast Real-Time Red Alerts</span>
              <span className="text-[11px] text-slate-400">
                Notify command center when buildings &gt;18 years show accelerated degradation
              </span>
            </div>
            <input
              type="checkbox"
              checked={emergencyAlertsEnabled}
              onChange={(e) => setEmergencyAlertsEnabled(e.target.checked)}
              className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data to Default</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save System Parameters</span>
          </button>
        </div>
      </form>
    </div>
  );
};
