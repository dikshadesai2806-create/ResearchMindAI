import React from 'react';
import { FileText, MessageSquare, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatCards: React.FC = () => {
  const {
    papers,
    queries,
    summariesCount,
    notes,
    setActiveTab,
    openPaperSummary,
  } = useApp();

  const handleViewPapers = () => {
    setActiveTab('My Papers');
  };

  const handleViewHistory = () => {
    setActiveTab('Research History');
  };

  const handleViewSummaries = () => {
    if (papers.length > 0) {
      openPaperSummary(papers[0]);
    }
  };

  const handleViewNotes = () => {
    setActiveTab('Saved Notes');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Papers */}
      <div className="rounded-2xl p-4.5 bg-[#0e1f3b] dark:bg-[#0e1f3b] border border-[#1a2d52] dark:border-[#1a2d52] hover:border-blue-500/40 transition-all flex flex-col justify-between group shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1e40af]/30 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
            <FileText className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {papers.length}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Total Papers
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-[#182b4a]">
          <button
            onClick={handleViewPapers}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Papers</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Card 2: AI Queries */}
      <div className="rounded-2xl p-4.5 bg-[#0e2536] dark:bg-[#0e2536] border border-[#14364c] dark:border-[#14364c] hover:border-teal-500/40 transition-all flex flex-col justify-between group shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0d9488]/30 border border-teal-500/30 text-teal-300 group-hover:scale-105 transition-transform flex-shrink-0">
            <MessageSquare className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {queries.length}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              AI Queries
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-[#153448]">
          <button
            onClick={handleViewHistory}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View History</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Card 3: Summaries Generated */}
      <div className="rounded-2xl p-4.5 bg-[#191c3d] dark:bg-[#191c3d] border border-[#2a2656] dark:border-[#2a2656] hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#7c3aed]/30 border border-purple-500/30 text-purple-300 group-hover:scale-105 transition-transform flex-shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {summariesCount}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Summaries Generated
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-[#252250]">
          <button
            onClick={handleViewSummaries}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Summaries</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Card 4: Saved Notes */}
      <div className="rounded-2xl p-4.5 bg-[#232019] dark:bg-[#232019] border border-[#3c3423] dark:border-[#3c3423] hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#d97706]/30 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {notes.length}
            </div>
            <div className="text-xs font-medium text-slate-300 mt-0.5">
              Saved Notes
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-[#342d1f]">
          <button
            onClick={handleViewNotes}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Notes</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
