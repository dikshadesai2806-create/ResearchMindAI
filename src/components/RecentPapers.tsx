import React, { useState } from 'react';
import { FileText, MoreVertical, ArrowRight, Eye, MessageSquare, Sparkles, StickyNote, Trash2, GitCompare, AlignLeft, ListFilter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResearchPaper } from '../types';

export const RecentPapers: React.FC = () => {
  const {
    papers,
    searchQuery,
    openPaperSummary,
    openPaperSummaryWithMode,
    openCompareWithPapers,
    openAskAiWithPaper,
    setIsKeywordsModalOpen,
    setSelectedPaper,
    setIsNotesModalOpen,
    deletePaper,
    setActiveTab,
  } = useApp();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter papers if search query is entered
  const filteredPapers = papers.filter((p) =>
    searchQuery.trim() === ''
      ? true
      : p.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.keywords && p.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const displayPapers = filteredPapers.slice(0, 5);

  const getStatusBadge = (status: ResearchPaper['status']) => {
    switch (status) {
      case 'Summarized':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1e3a5f]/80 text-[#60a5fa] border border-[#2b4c7e]/50">
            Summarized
          </span>
        );
      case 'Analyzed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#133e38]/80 text-[#34d399] border border-[#1e584f]/50">
            Analyzed
          </span>
        );
      case 'Notes Added':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3d2f16]/80 text-[#fbbf24] border border-[#584420]/50">
            Notes Added
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-[#0a172e] dark:bg-[#0a172e] border border-[#142749] dark:border-[#142749] p-5 shadow-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#142442]">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-slate-300" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Recent Papers
          </h3>
        </div>
        <button
          onClick={() => setActiveTab('My Papers')}
          className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Papers List */}
      <div className="divide-y divide-[#13233f] mt-1">
        {displayPapers.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No papers match your search criteria.
          </div>
        ) : (
          displayPapers.map((paper) => (
            <div
              key={paper.id}
              className="py-3 flex items-center justify-between group hover:bg-[#0e1d38]/40 px-2 rounded-xl transition-colors relative"
            >
              {/* Left: PDF Icon + Title & Date */}
              <div
                onClick={() => openPaperSummary(paper)}
                className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0 pr-3"
              >
                {/* Red PDF Icon badge */}
                <div className="relative flex-shrink-0 w-8 h-9 rounded-md bg-gradient-to-b from-[#dc2626] to-[#b91c1c] text-white flex flex-col items-center justify-center shadow-sm">
                  <span className="text-[9px] font-extrabold tracking-wider leading-none">
                    PDF
                  </span>
                  {/* Subtle corner fold */}
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#f87171] rounded-bl-sm opacity-60" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                    {paper.fileName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {paper.date}
                  </p>
                </div>
              </div>

              {/* Right: Status Pill & 3-dot Menu */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <div onClick={() => openPaperSummary(paper)} className="cursor-pointer">
                  {getStatusBadge(paper.status)}
                </div>

                {/* More options button */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === paper.id ? null : paper.id);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Context Dropdown Menu */}
                  {activeMenuId === paper.id && (
                    <div
                      onMouseLeave={() => setActiveMenuId(null)}
                      className="absolute right-0 top-8 w-48 rounded-xl bg-[#0f1d38] border border-[#21355e] shadow-2xl py-1 z-40 animate-in fade-in zoom-in-95"
                    >
                      <button
                        onClick={() => {
                          openPaperSummaryWithMode(paper, 'detailed');
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <ListFilter className="w-3.5 h-3.5 text-teal-400" />
                        <span>Detailed Summary (10 Headings)</span>
                      </button>

                      <button
                        onClick={() => {
                          openPaperSummaryWithMode(paper, 'short');
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <AlignLeft className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Short Summary (Overview)</span>
                      </button>

                      <button
                        onClick={() => {
                          const other = papers.find((p) => p.id !== paper.id);
                          const targetIds = other ? [paper.id, other.id] : [paper.id];
                          openCompareWithPapers(targetIds);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-purple-400" />
                        <span>Compare With Other Papers</span>
                      </button>

                      <button
                        onClick={() => {
                          openAskAiWithPaper(paper.fileName);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                        Ask AI About This
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setIsKeywordsModalOpen(true);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        Extract Keywords
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setIsNotesModalOpen(true);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-[#16274a] transition-colors"
                      >
                        <StickyNote className="w-3.5 h-3.5 text-amber-400" />
                        Add Research Note
                      </button>

                      <div className="border-t border-[#1a2d52] my-1" />

                      <button
                        onClick={() => {
                          deletePaper(paper.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Paper
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
