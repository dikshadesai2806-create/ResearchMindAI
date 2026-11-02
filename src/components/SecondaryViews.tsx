import React, { useState } from 'react';
import {
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Trash2,
  Eye,
  MessageSquare,
  Sparkles,
  BarChart3,
  Clock,
  Bookmark,
  Plus,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  Award,
  GitCompare,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResearchPaper } from '../types';
import { ComparePapersView } from './ComparePapersView';

export const SecondaryViews: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    papers,
    queries,
    notes,
    openPaperSummary,
    openAskAiWithPaper,
    deletePaper,
    deleteNote,
    setIsUploadModalOpen,
    setIsNotesModalOpen,
    setSelectedPaper,
    selectedPaperIdsForComparison,
    togglePaperSelectionForComparison,
    openCompareWithPapers,
  } = useApp();

  const [paperFilter, setPaperFilter] = useState<string>('All');
  const [noteTagFilter, setNoteTagFilter] = useState<string>('All');
  const [historySearch, setHistorySearch] = useState('');

  // ----------------- COMPARE PAPERS VIEW -----------------
  if (activeTab === 'Compare Papers') {
    return <ComparePapersView />;
  }

  // ----------------- MY PAPERS VIEW -----------------
  if (activeTab === 'My Papers') {
    const filtered = papers.filter((p) => {
      if (paperFilter === 'All') return true;
      return p.status === paperFilter;
    });

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10203f] hover:bg-[#162b54] text-xs font-semibold text-cyan-300 border border-[#1b3464] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Research Papers ({papers.length})
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0a172e] border border-[#152749]">
              {['All', 'Summarized', 'Analyzed', 'Notes Added'].map((status) => (
                <button
                  key={status}
                  onClick={() => setPaperFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    paperFilter === status
                      ? 'bg-[#0d7477] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload PDF</span>
            </button>
          </div>
        </div>

        {/* Multi-Paper Selection Banner */}
        {selectedPaperIdsForComparison.length >= 2 && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0d2847] to-[#0a1e38] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-lg animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <GitCompare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {selectedPaperIdsForComparison.length} Research Papers Selected
                </p>
                <p className="text-[11px] text-cyan-200/80">
                  Ready to cross-examine objectives, methodologies, findings, and research gaps.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openCompareWithPapers(selectedPaperIdsForComparison)}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare Selected Papers Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((paper) => {
            const isSelectedForComp = selectedPaperIdsForComparison.includes(paper.id);
            return (
              <div
                key={paper.id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between group shadow-sm ${
                  isSelectedForComp
                    ? 'bg-[#0c1e3a] border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'bg-[#0a172e] border-[#162b50] hover:border-cyan-500/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-9 rounded-md bg-red-600 text-white flex flex-col items-center justify-center font-bold text-[9px] shadow-sm flex-shrink-0">
                        PDF
                      </div>
                      {/* Comparison Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePaperSelectionForComparison(paper.id);
                        }}
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-colors cursor-pointer ${
                          isSelectedForComp
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-[#0c1830] text-slate-400 border-[#182a4c] hover:text-slate-200'
                        }`}
                        title="Include in multi-paper comparison"
                      >
                        <div className={`w-3 h-3 rounded flex items-center justify-center ${isSelectedForComp ? 'bg-cyan-500 text-slate-950' : 'border border-slate-600'}`}>
                          {isSelectedForComp && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>Compare</span>
                      </button>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        paper.status === 'Summarized'
                          ? 'bg-blue-900/60 text-blue-300 border-blue-700/50'
                          : paper.status === 'Analyzed'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                          : 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                      }`}
                    >
                      {paper.status}
                    </span>
                  </div>

                  <h3
                    onClick={() => openPaperSummary(paper)}
                    className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {paper.title || paper.fileName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {paper.abstract || 'No abstract preview available.'}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                    <span>{paper.date}</span>
                    <span>•</span>
                    <span>{paper.pages || 16} pages</span>
                    <span>•</span>
                    <span>{paper.fileSize || '3.5 MB'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#142442] flex items-center justify-between">
                  <button
                    onClick={() => openPaperSummary(paper)}
                    className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Summary</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openAskAiWithPaper(paper.fileName)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Ask AI about paper"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePaper(paper.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete paper"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------- PAPER ANALYSIS VIEW -----------------
  if (activeTab === 'Paper Analysis') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('Dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10203f] hover:bg-[#162b54] text-xs font-semibold text-cyan-300 border border-[#1b3464] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Literature & Paper Analysis
          </h2>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 bg-[#0a172e] border border-[#162a50]">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Layers className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Indexed Domains</span>
            </div>
            <div className="text-2xl font-extrabold text-white">4 Distinct Fields</div>
            <p className="text-xs text-slate-400 mt-1">AI Pedagogy, Distributed Ledger, IoT, Deep Learning</p>
          </div>

          <div className="rounded-2xl p-5 bg-[#0a172e] border border-[#162a50]">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Citation Influence</span>
            </div>
            <div className="text-2xl font-extrabold text-white">1,956+ Citations</div>
            <p className="text-xs text-slate-400 mt-1">Average citation impact per document: ~390</p>
          </div>

          <div className="rounded-2xl p-5 bg-[#0a172e] border border-[#162a50]">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Synthesis Coverage</span>
            </div>
            <div className="text-2xl font-extrabold text-white">100% Processed</div>
            <p className="text-xs text-slate-400 mt-1">Full-text embeddings and OCR completed</p>
          </div>
        </div>

        {/* Analysis breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#0a172e] border border-[#162a50] p-5">
            <h3 className="text-base font-bold text-white mb-4">Topic Distribution</h3>
            <div className="space-y-3">
              {[
                { name: 'Machine Learning & Neural Architecture', percentage: 40, color: 'bg-cyan-500' },
                { name: 'Cryptography & Consensus Protocols', percentage: 25, color: 'bg-purple-500' },
                { name: 'Cyber-Physical Systems & IoT', percentage: 20, color: 'bg-teal-500' },
                { name: 'Applied Analytics & Causal Inference', percentage: 15, color: 'bg-amber-500' },
              ].map((topic) => (
                <div key={topic.name}>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>{topic.name}</span>
                    <span>{topic.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#132342] overflow-hidden">
                    <div className={`h-full ${topic.color} rounded-full`} style={{ width: `${topic.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0a172e] border border-[#162a50] p-5">
            <h3 className="text-base font-bold text-white mb-4">Key Methodologies Detected</h3>
            <div className="space-y-2.5">
              {[
                { title: 'Bayesian Knowledge Tracing', desc: 'Used for modeling learner mastery curves in adaptive education' },
                { title: 'Zero-Knowledge Proofs (ZK-SNARKs)', desc: 'Cryptographic compression of distributed ledger transactions' },
                { title: 'Direct Preference Optimization (DPO)', desc: 'Closed-form alignment without auxiliary critic models' },
                { title: 'Structural Causal Models (DAGs)', desc: 'De-confounding observational datasets in empirical trials' },
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0e1d38] border border-[#1a3058]">
                  <p className="text-xs font-bold text-cyan-300">{m.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- RESEARCH HISTORY VIEW -----------------
  if (activeTab === 'Research History') {
    const filteredQueries = queries.filter((q) =>
      q.question.toLowerCase().includes(historySearch.toLowerCase()) ||
      q.answer.toLowerCase().includes(historySearch.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10203f] hover:bg-[#162b54] text-xs font-semibold text-cyan-300 border border-[#1b3464] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Research Query History ({queries.length})
            </h2>
          </div>

          <div className="relative w-64">
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="Search past queries..."
              className="w-full h-9 pl-8 pr-3 text-xs rounded-xl bg-[#0a172e] border border-[#182d54] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-3">
          {filteredQueries.map((query) => (
            <div
              key={query.id}
              className="p-5 rounded-2xl bg-[#0a172e] border border-[#162b50] hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    query.question.includes('Comparison')
                      ? 'bg-purple-500/20 text-purple-400'
                      : query.question.includes('Summary')
                      ? 'bg-teal-500/20 text-teal-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {query.question.includes('Comparison') ? 'C' : query.question.includes('Summary') ? 'S' : 'Q'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{query.question}</h4>
                    {query.question.includes('Detailed Summary') && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                        Detailed Summary (10 Sections)
                      </span>
                    )}
                    {query.question.includes('Short Summary') && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        Short Summary (Overview)
                      </span>
                    )}
                    {query.question.includes('Comparison') && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        11-Dimension Literature Matrix
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 flex-shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {query.timestamp}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#081224] border border-[#142340] text-xs leading-relaxed text-slate-200 mt-3 whitespace-pre-line max-h-60 overflow-y-auto">
                <span className="font-semibold text-teal-300 block mb-1">AI Synthesis:</span>
                {query.answer}
              </div>

              {query.paperTitle && (
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Referenced Document: <strong className="text-slate-200">{query.paperTitle}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------- SAVED NOTES VIEW -----------------
  if (activeTab === 'Saved Notes') {
    const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));
    const filteredNotes = notes.filter((n) => {
      if (noteTagFilter === 'All') return true;
      return n.tags?.includes(noteTagFilter);
    });

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10203f] hover:bg-[#162b54] text-xs font-semibold text-cyan-300 border border-[#1b3464] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Saved Research Notes ({notes.length})
            </h2>
          </div>

          <button
            onClick={() => {
              if (papers.length > 0) setSelectedPaper(papers[0]);
              setIsNotesModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setNoteTagFilter('All')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              noteTagFilter === 'All'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-[#0f1d38] text-slate-300 hover:bg-[#15274a]'
            }`}
          >
            All Notes
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setNoteTagFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                noteTagFilter === t
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-[#0f1d38] text-slate-300 hover:bg-[#15274a]'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl bg-[#0a172e] border border-[#162b50] p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white">{note.title}</h3>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-amber-300/90 font-medium mb-3">
                  Document: {note.paperTitle}
                </p>

                <div className="p-3.5 rounded-xl bg-[#081224] border border-[#142340] text-xs leading-relaxed text-slate-200 whitespace-pre-line font-mono max-h-48 overflow-y-auto">
                  {note.content}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#142442] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {note.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#16274a] text-cyan-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
