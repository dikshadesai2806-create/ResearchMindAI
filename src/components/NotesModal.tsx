import React, { useState } from 'react';
import { X, FileEdit, Check, Sparkles, BookmarkPlus, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotesModal: React.FC = () => {
  const {
    isNotesModalOpen,
    setIsNotesModalOpen,
    selectedPaper,
    papers,
    addNote,
    updatePaper,
    setActiveTab,
  } = useApp();

  const activePaper = selectedPaper || papers[0];

  const [title, setTitle] = useState(
    activePaper ? `Key Notes: ${activePaper.title || activePaper.fileName}` : 'Research Notes'
  );
  const [content, setContent] = useState(
    activePaper?.notes
      ? activePaper.notes
      : `### Executive Insights\n- Core hypothesis validated across experimental sets.\n- Latency and throughput metrics show consistent improvements.\n\n### Critical Evaluation\n- Future studies should explore edge deployment constraints.\n- Cross-check citations in Section 3.`
  );
  const [tagInput, setTagInput] = useState('Literature Review, AI, Methodology');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isNotesModalOpen) return null;

  const handleApplyTemplate = (type: 'cornell' | 'bullets' | 'critique') => {
    if (type === 'cornell') {
      setContent(
        `## Cornell Research Note\n\n**Cues & Keywords:**\n- ${activePaper?.keywords?.slice(0, 3).join(', ') || 'Keywords'}\n\n**Main Notes:**\n- Methodology: Evaluates empirical performance over rigorous baseline models.\n- Finding 1: ${activePaper?.keyPoints?.[0] || 'Statistical significance achieved.'}\n- Finding 2: ${activePaper?.keyPoints?.[1] || 'Efficiency optimized.'}\n\n**Summary:**\n${activePaper?.summary || 'Comprehensive empirical research paper.'}`
      );
    } else if (type === 'bullets') {
      setContent(
        `## Quick Takeaways\n• ${activePaper?.summary || 'Paper summary overview'}\n• Key finding: ${activePaper?.keyPoints?.[0] || 'Observed major performance gains'}\n• Follow-up needed for section on benchmark comparisons.`
      );
    } else {
      setContent(
        `## Critical Analysis & Limitations\n1. Sample Diversity: How well does this generalize across varied domains?\n2. Computational Cost: Are hardware requirements practical for production?\n3. Actionable Next Steps: Replicate experiment with open-source datasets.`
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addNote({
      title: title.trim(),
      paperId: activePaper?.id,
      paperTitle: activePaper?.fileName || 'General Research',
      content: content.trim(),
      tags,
    });

    if (activePaper) {
      updatePaper(activePaper.id, {
        status: 'Notes Added',
        notes: content.trim(),
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsNotesModalOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1830] border border-[#1d3563] shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsNotesModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center">
            <FileEdit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Create / Edit Research Note
            </h3>
            <p className="text-xs text-slate-400">
              Annotate, summarize, and catalog notes for: <span className="text-cyan-300">{activePaper?.fileName}</span>
            </p>
          </div>
        </div>

        {/* Quick Templates Buttons */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-slate-400 font-medium">Templates:</span>
          <button
            type="button"
            onClick={() => handleApplyTemplate('cornell')}
            className="px-2.5 py-1 rounded-lg bg-[#142647] hover:bg-[#1a3360] text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors cursor-pointer"
          >
            Cornell Method
          </button>
          <button
            type="button"
            onClick={() => handleApplyTemplate('bullets')}
            className="px-2.5 py-1 rounded-lg bg-[#142647] hover:bg-[#1a3360] text-teal-300 text-xs font-medium border border-teal-500/30 transition-colors cursor-pointer"
          >
            Bullet Takeaways
          </button>
          <button
            type="button"
            onClick={() => handleApplyTemplate('critique')}
            className="px-2.5 py-1 rounded-lg bg-[#142647] hover:bg-[#1a3360] text-amber-300 text-xs font-medium border border-amber-500/30 transition-colors cursor-pointer"
          >
            Critical Review
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-xl bg-[#081020] border border-[#1b2e52] text-white focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Note Content & Annotations
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-xs leading-relaxed rounded-xl bg-[#081020] border border-[#1b2e52] text-white font-mono focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. Pedagogy, Benchmark, AI"
              className="w-full h-9 px-3 text-xs rounded-xl bg-[#081020] border border-[#1b2e52] text-white focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setIsNotesModalOpen(false);
                setActiveTab('Saved Notes');
              }}
              className="text-xs text-sky-400 hover:underline cursor-pointer"
            >
              View All Saved Notes →
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved to Notes!</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Save Research Note</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
