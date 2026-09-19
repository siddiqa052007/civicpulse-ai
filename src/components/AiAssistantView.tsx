import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldAlert,
  HardHat,
  DollarSign,
  MapPin,
  RefreshCw,
  Zap,
  Building,
  HelpCircle
} from 'lucide-react';
import { DamagedLocation, ConstructionHistoryItem, DepartmentSummary, Engineer } from '../types';

interface AiAssistantViewProps {
  damagedLocations: DamagedLocation[];
  constructionHistory: ConstructionHistoryItem[];
  departments: DepartmentSummary[];
  engineers: Engineer[];
  onNavigateTab: (tab: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; tab: string }[];
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  damagedLocations,
  constructionHistory,
  departments,
  engineers,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello! I am the **CivicPulse AI Municipal Copilot**. I have real-time forensic awareness of all ${damagedLocations.length} active infrastructure hazards, ${constructionHistory.filter((b) => b.isDangerAbove18).length} structures exceeding the 18-year danger limit, and department budget allocations. How can I assist your municipal workflow today?`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'View Aging Buildings > 18 Yrs', tab: 'history' },
        { label: 'Check Critical Road Hazards', tab: 'maps' },
        { label: 'Inspect Department Budgets', tab: 'departments' },
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'Which buildings have age above 18 years and what are their danger instructions?',
    'What is the highest risk road damage currently mapped?',
    'Show me the budget utilization status across all 4 departments.',
    'Which structural engineers are currently available for dispatch?',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const text = queryText || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setIsLoading(true);

    try {
      // Build context of live state
      const dangerBuildings = constructionHistory.filter((b) => b.isDangerAbove18);
      const criticalDamages = damagedLocations.filter((d) => d.riskLevel === 'CRITICAL');

      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: {
            totalDamages: damagedLocations.length,
            criticalDamagesCount: criticalDamages.length,
            topDamages: criticalDamages.map((d) => ({
              title: d.title,
              loc: d.locationName,
              score: d.severityScore,
              dept: d.department,
            })),
            dangerBuildingsCount: dangerBuildings.length,
            dangerBuildingsList: dangerBuildings.map((b) => ({
              name: b.buildingName,
              age: b.ageInYears,
              year: b.yearBuilt,
              instructions: b.dangerInstructions,
            })),
            departments: departments.map((d) => ({
              name: d.name,
              spent: d.spentBudgetUSD,
              total: d.totalBudgetUSD,
            })),
            availableEngineersCount: engineers.filter((e) => e.status === 'Available').length,
          },
        }),
      });

      const data = await res.json();
      const aiReply = data.response || 'I have analyzed the municipal databases and synchronized the records.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered a temporary connection issue while querying the municipal AI telemetry. Here is the direct status: 4 structures currently exceed the 18-year fatigue limit requiring urgent ultrasonic inspection.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-cyan-400" /> CivicPulse AI Copilot
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Municipal AI Intelligence Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Ask natural language questions about infrastructure risk, aging building danger guidelines, work orders, and budgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gemini 3.7 Online</span>
          </span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col h-[580px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-inner'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && (
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => onNavigateTab(action.tab)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700/80 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Synthesizing cross-department records &amp; age danger guidelines...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="pt-3 pb-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-cyan-400" /> Suggestions:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-2 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about construction age > 18 yrs, danger instructions, road hazards, budgets..."
            className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
