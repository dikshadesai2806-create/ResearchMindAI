import React, { useState } from 'react';
import { X, Sparkles, BookmarkPlus, Check, Copy, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiResponseModal: React.FC = () => {
  const {
    currentAiResponse,
    setCurrentAiResponse,
    isAiResponseModalOpen,
    setIsAiResponseModalOpen,
    addNote,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [savedToNotes, setSavedToNotes] = useState(false);

  if (!isAiResponseModalOpen || !currentAiResponse) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Question: ${currentAiResponse.question}\n\nAnswer: ${currentAiResponse.answer}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToNotes = () => {
    addNote({
      title: `AI Query: ${currentAiResponse.question.slice(0, 45)}...`,
      paperTitle: currentAiResponse.paperTitle || 'All Uploaded Papers',
      content: `### Question:\n${currentAiResponse.question}\n\n### AI Synthesis:\n${currentAiResponse.answer}\n\n### Citations:\n${currentAiResponse.citations?.map((c) => `- ${c}`).join('\n') || 'None'}`,
      tags: ['AI Insight', 'Q&A', 'ResearchMind'],
    });
    setSavedToNotes(true);
    setTimeout(() => setSavedToNotes(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#0b172f] border border-[#1b3462] shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="p-5 border-b border-[#162a4e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                AI Research Synthesis
              </h3>
              <p className="text-xs text-slate-400">
                Grounded in: <span className="text-cyan-300 font-medium">{currentAiResponse.paperTitle || 'All Uploaded Papers'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiResponseModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5">
          {/* User Question */}
          <div className="p-3.5 rounded-xl bg-[#081224] border border-[#172b50]">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Your Question
            </p>
            <p className="text-sm font-semibold text-white">
              "{currentAiResponse.question}"
            </p>
          </div>

          {/* AI Response Text */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#0f2142] to-[#0c1a36] border border-[#1c396c] leading-relaxed text-sm text-slate-200 whitespace-pre-line">
            {currentAiResponse.answer}
          </div>

          {/* Citations & Evidence */}
          {currentAiResponse.citations && currentAiResponse.citations.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Paper Citations & Grounding
              </h4>
              <div className="space-y-1.5">
                {currentAiResponse.citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#071226] border border-[#162747] text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{cite}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {currentAiResponse.keyTakeaways && currentAiResponse.keyTakeaways.length > 0 && (
            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/25">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                Actionable Findings
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                {currentAiResponse.keyTakeaways.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#081224] border-t border-[#162a4e] flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-[#111e3b] hover:bg-[#16274e] border border-[#1c325c] text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Response'}</span>
          </button>

          <button
            onClick={handleSaveToNotes}
            className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
          >
            {savedToNotes ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Notes!</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4" />
                <span>Save to Notes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
