import React, { useState } from 'react';
import { X, Sparkles, Tag, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const KeywordsModal: React.FC = () => {
  const {
    isKeywordsModalOpen,
    setIsKeywordsModalOpen,
    papers,
    selectedPaper,
    setSelectedPaper,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  if (!isKeywordsModalOpen) return null;

  // Aggregate all keywords across papers
  const allKeywordsMap: Record<string, { count: number; papers: string[] }> = {};
  papers.forEach((p) => {
    p.keywords?.forEach((k) => {
      if (!allKeywordsMap[k]) {
        allKeywordsMap[k] = { count: 0, papers: [] };
      }
      allKeywordsMap[k].count += 1;
      allKeywordsMap[k].papers.push(p.fileName);
    });
  });

  const keywordsList = Object.entries(allKeywordsMap).sort((a, b) => b[1].count - a[1].count);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1830] border border-[#1d3563] shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsKeywordsModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Extracted Research Keywords & Topics
            </h3>
            <p className="text-xs text-slate-400">
              High-frequency concepts identified across your uploaded literature corpus
            </p>
          </div>
        </div>

        {/* Keywords Cloud */}
        <div className="p-4 rounded-xl bg-[#081224] border border-[#16294c] mb-5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Interactive Topic Cloud
          </span>
          <div className="flex flex-wrap gap-2.5">
            {keywordsList.map(([keyword, data]) => {
              const isSelected = activeFilter === keyword;
              return (
                <button
                  key={keyword}
                  onClick={() => setActiveFilter(isSelected ? 'all' : keyword)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400'
                      : 'bg-[#122244] hover:bg-[#182c58] text-purple-300 border border-purple-500/30'
                  }`}
                >
                  <Tag className="w-3 h-3 text-purple-400" />
                  <span>{keyword}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-950/80 text-purple-200">
                    {data.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Papers linked to selected topic */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            {activeFilter === 'all'
              ? 'Showing all papers with keyword tags'
              : `Papers related to "${activeFilter}"`}
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {papers
              .filter((p) =>
                activeFilter === 'all'
                  ? true
                  : p.keywords?.includes(activeFilter)
              )
              .map((paper) => (
                <div
                  key={paper.id}
                  className="p-3 rounded-xl bg-[#0e1d38] border border-[#1a3058] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-white truncate">
                      {paper.fileName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {paper.category}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-cyan-400 flex-shrink-0">
                    {paper.status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
