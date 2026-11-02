import React from 'react';
import { Zap, UploadCloud, FileText, Sparkles, FileEdit } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickActions: React.FC = () => {
  const {
    setIsUploadModalOpen,
    papers,
    openPaperSummary,
    setIsKeywordsModalOpen,
    setIsNotesModalOpen,
    setSelectedPaper,
  } = useApp();

  const handleSummarize = () => {
    if (papers.length > 0) {
      openPaperSummary(papers[0]);
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleExtractKeywords = () => {
    if (papers.length > 0 && !papers.find((p) => p.id === 'paper-1')) {
      setSelectedPaper(papers[0]);
    }
    setIsKeywordsModalOpen(true);
  };

  const handleGenerateNotes = () => {
    if (papers.length > 0) {
      setSelectedPaper(papers[0]);
    }
    setIsNotesModalOpen(true);
  };

  return (
    <div className="rounded-2xl bg-[#0a172e] dark:bg-[#0a172e] border border-[#142749] dark:border-[#142749] p-5 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4">
        <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
        <h3 className="text-base font-bold text-white tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* 4 Pastel Cards Grid matching the exact reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Upload PDF (Pastel Sky Blue) */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#cbe3fe] hover:bg-[#b9d9fc] active:scale-[0.98] transition-all cursor-pointer shadow-sm text-center"
        >
          <div className="mb-2 text-[#0284c7] group-hover:scale-110 transition-transform">
            <UploadCloud className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-[#0c2e59]">
            Upload PDF
          </span>
        </button>

        {/* Card 2: Summarize Paper (Pastel Mint Green) */}
        <button
          onClick={handleSummarize}
          className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#caf1de] hover:bg-[#b6e8cf] active:scale-[0.98] transition-all cursor-pointer shadow-sm text-center"
        >
          <div className="mb-2 text-[#059669] group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-[#064e3b]">
            Summarize Paper
          </span>
        </button>

        {/* Card 3: Extract Keywords (Pastel Lavender) */}
        <button
          onClick={handleExtractKeywords}
          className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#e6dcfc] hover:bg-[#d9c9f9] active:scale-[0.98] transition-all cursor-pointer shadow-sm text-center"
        >
          <div className="mb-2 text-[#7c3aed] group-hover:scale-110 transition-transform">
            {/* Gem / Polygon icon from reference */}
            <svg
              className="w-5 h-5 fill-[#7c3aed]/20 stroke-[#7c3aed] stroke-[2.2]"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#3b0764]">
            Extract Keywords
          </span>
        </button>

        {/* Card 4: Generate Notes (Pastel Warm Peach/Yellow) */}
        <button
          onClick={handleGenerateNotes}
          className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#fbe8b5] hover:bg-[#f8dc9b] active:scale-[0.98] transition-all cursor-pointer shadow-sm text-center"
        >
          <div className="mb-2 text-[#d97706] group-hover:scale-110 transition-transform">
            <FileEdit className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-[#78350f]">
            Generate Notes
          </span>
        </button>
      </div>
    </div>
  );
};
