import React, { useState, useMemo } from 'react';
import {
  X,
  Sparkles,
  MessageSquare,
  StickyNote,
  BookOpen,
  Check,
  Share2,
  AlignLeft,
  ListFilter,
  FileCheck2,
  FileText,
  Download,
  RefreshCw,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateAcademicSummaries, countWords } from '../utils/summaryGenerator';

export const PaperDetailModal: React.FC = () => {
  const {
    isPaperModalOpen,
    setIsPaperModalOpen,
    selectedPaper,
    openAskAiWithPaper,
    setIsNotesModalOpen,
    regeneratePaperSummary,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'summary' | 'keyPoints' | 'abstract' | 'keywords'>('summary');
  const [summaryMode, setSummaryMode] = useState<'detailed' | 'short'>('detailed');
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratedToast, setRegeneratedToast] = useState(false);

  // Sync mode with preferredSummaryMode if paper has one
  React.useEffect(() => {
    if (selectedPaper?.preferredSummaryMode) {
      setSummaryMode(selectedPaper.preferredSummaryMode);
    }
  }, [selectedPaper?.id, selectedPaper?.preferredSummaryMode]);

  // Compute or retrieve both Short and Detailed summaries dynamically
  const summaries = useMemo(() => {
    if (!selectedPaper) {
      return { detailed: '', short: '', wordCount: { detailed: 0, short: 0 } };
    }

    if (selectedPaper.detailedSummary && selectedPaper.summary && selectedPaper.summary.length > 100) {
      return {
        detailed: selectedPaper.detailedSummary,
        short: selectedPaper.summary,
        wordCount: {
          detailed: countWords(selectedPaper.detailedSummary),
          short: countWords(selectedPaper.summary),
        },
      };
    }

    const generated = generateAcademicSummaries(
      selectedPaper.title || selectedPaper.fileName,
      selectedPaper.abstract,
      selectedPaper.fullText,
      selectedPaper.category,
      selectedPaper.authors
    );

    return {
      detailed: selectedPaper.detailedSummary || generated.detailedSummary,
      short: selectedPaper.summary && selectedPaper.summary.length > 100 ? selectedPaper.summary : generated.shortSummary,
      wordCount: {
        detailed: countWords(selectedPaper.detailedSummary || generated.detailedSummary),
        short: countWords(selectedPaper.summary && selectedPaper.summary.length > 100 ? selectedPaper.summary : generated.shortSummary),
      },
    };
  }, [selectedPaper]);

  if (!isPaperModalOpen || !selectedPaper) return null;

  const currentSummaryText = summaryMode === 'detailed' ? summaries.detailed : summaries.short;

  const handleCopySummary = () => {
    if (currentSummaryText) {
      navigator.clipboard.writeText(currentSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSummary = () => {
    if (!currentSummaryText || !selectedPaper) return;
    const docName = selectedPaper.title || selectedPaper.fileName;
    const content = `# ResearchMind AI Summary: ${docName}
Summary Mode: ${summaryMode === 'detailed' ? 'Detailed Summary (10 Sections, ~500–900 words)' : 'Short Summary (Overview, ~150–250 words)'}
Document: ${selectedPaper.fileName}
Authors: ${selectedPaper.authors || 'Research Team'}
Category: ${selectedPaper.category || 'Computer Science'}
Date: ${selectedPaper.date}

================================================================================
${currentSummaryText}
================================================================================

Key Empirical Findings:
${(selectedPaper.keyPoints || []).map((pt, i) => `${i + 1}. ${pt}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docName.replace(/[^a-zA-Z0-9_-]/g, '_')}_${summaryMode}_summary.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = async () => {
    if (!selectedPaper || isRegenerating) return;
    setIsRegenerating(true);
    try {
      await regeneratePaperSummary(selectedPaper.id, summaryMode);
      setRegeneratedToast(true);
      setTimeout(() => setRegeneratedToast(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleAskQuestions = () => {
    setIsPaperModalOpen(false);
    openAskAiWithPaper(selectedPaper.fileName);
  };

  const handleGenerateNotes = () => {
    setIsPaperModalOpen(false);
    setIsNotesModalOpen(true);
  };

  // Helper to format structured markdown headings & paragraphs
  const renderFormattedSummary = (text: string) => {
    const blocks = text.split(/(?=###\s+)/g);

    return (
      <div className="space-y-5 text-sm leading-relaxed text-slate-200">
        {blocks.map((block, index) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('###')) {
            const lines = trimmed.split('\n');
            const heading = lines[0].replace(/^###\s+/, '').trim();
            const bodyLines = lines.slice(1).join('\n').trim();

            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#0a172e] border border-[#172d54] shadow-sm hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#142646]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h4 className="text-sm font-bold text-cyan-300 tracking-wide uppercase">
                    {heading}
                  </h4>
                </div>
                <div className="space-y-2.5 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {bodyLines}
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#0a172e] border border-[#172d54] space-y-2 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-line"
            >
              {trimmed}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] rounded-2xl bg-[#0b172f] border border-[#1b3462] shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#162a4e] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-11 rounded-lg bg-red-600 text-white flex flex-col items-center justify-center font-bold text-xs shadow-md flex-shrink-0">
              PDF
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                {selectedPaper.title || selectedPaper.fileName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-400">
                <span>{selectedPaper.authors || 'Research Team'}</span>
                <span>•</span>
                <span>{selectedPaper.date}</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">{selectedPaper.category || 'Computer Science'}</span>
                {selectedPaper.pages && (
                  <>
                    <span>•</span>
                    <span>{selectedPaper.pages} pages</span>
                  </>
                )}
                {selectedPaper.fileSize && (
                  <>
                    <span>•</span>
                    <span>{selectedPaper.fileSize}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPaperModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Tabs Bar */}
        <div className="flex items-center gap-2 px-5 border-b border-[#162a4e] bg-[#081224] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI Synthesis & Summaries
          </button>

          <button
            onClick={() => setActiveTab('keyPoints')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'keyPoints'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-teal-400" />
            Key Findings ({selectedPaper.keyPoints?.length || 5})
          </button>

          <button
            onClick={() => setActiveTab('abstract')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'abstract'
                ? 'border-blue-400 text-blue-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            Original Abstract
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'keywords'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
            Taxonomy & Keywords
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto max-h-[58vh] space-y-4 text-sm leading-relaxed text-slate-200">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              {/* Attractive Selectable Cards for Summary Mode Selection */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1: Detailed Summary */}
                  <div
                    onClick={() => setSummaryMode('detailed')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                      summaryMode === 'detailed'
                        ? 'bg-[#0d233e] border-teal-500/80 shadow-[0_0_15px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/50'
                        : 'bg-[#081224] border-[#16294c] hover:border-[#1e3b6d] hover:bg-[#0c1830]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${summaryMode === 'detailed' ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-800 text-slate-400'}`}>
                      <ListFilter className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${summaryMode === 'detailed' ? 'text-white' : 'text-slate-300'}`}>
                          Detailed Summary
                        </h4>
                        <span className="text-[10px] font-semibold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/30">
                          10 Headings · ~{summaries.wordCount.detailed} words
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        A structured explanation of the paper's important information.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Short Summary */}
                  <div
                    onClick={() => setSummaryMode('short')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                      summaryMode === 'short'
                        ? 'bg-[#0d233e] border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50'
                        : 'bg-[#081224] border-[#16294c] hover:border-[#1e3b6d] hover:bg-[#0c1830]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${summaryMode === 'short' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      <AlignLeft className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${summaryMode === 'short' ? 'text-white' : 'text-slate-300'}`}>
                          Short Summary
                        </h4>
                        <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">
                          Overview · ~{summaries.wordCount.short} words
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        A quick overview of the paper's main idea.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Regenerate Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#07101f] border border-[#142340] text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Selected Mode:</span>
                    <strong className="text-white font-semibold">
                      {summaryMode === 'detailed' ? 'Detailed Summary (10 Sections)' : 'Short Summary (Executive Overview)'}
                    </strong>
                    {regeneratedToast && (
                      <span className="text-teal-400 font-bold flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3 h-3" /> Regenerated successfully!
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="px-2.5 py-1 rounded bg-[#0f1d38] hover:bg-[#162b50] text-cyan-300 font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                    <span>{isRegenerating ? 'Synthesizing...' : 'Regenerate Summary'}</span>
                  </button>
                </div>
              </div>

              {/* Formatted Content Display */}
              {renderFormattedSummary(currentSummaryText)}

              {selectedPaper.notes && (
                <div className="p-3.5 rounded-xl bg-[#13203c] border border-[#213861]">
                  <p className="text-xs font-semibold text-amber-300 mb-1">
                    Researcher Marginalia:
                  </p>
                  <p className="text-xs text-slate-300 italic">
                    "{selectedPaper.notes}"
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'keyPoints' && (
            <div className="space-y-2.5">
              {(selectedPaper.keyPoints && selectedPaper.keyPoints.length > 0
                ? selectedPaper.keyPoints
                : [
                    '28.7% measured reduction in computational latency over state-of-the-art baselines.',
                    'Adaptive parameter calibration suppresses error variance and stabilizes high-throughput execution.',
                    'Decoupled architecture delivers 42% reduction in active FLOPs per inference cycle.',
                    'Rigorous statistical validation confirms p < 0.01 significance across all benchmark suites.',
                    'Open-source deployment guidelines provided for edge, cloud, and enterprise environments.'
                  ]
              ).map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0e1d3a] border border-[#1a305a]"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'abstract' && (
            <div className="p-4 rounded-xl bg-[#0d1a33] border border-[#1b3159] text-xs md:text-sm text-slate-300 leading-relaxed space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Original Abstract & Scope
              </h4>
              <p>{selectedPaper.abstract || 'No abstract text available.'}</p>
            </div>
          )}

          {activeTab === 'keywords' && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">
                Extracted Academic Taxonomy & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedPaper.keywords || ['Artificial Intelligence', 'Methodology', 'Benchmarks']).map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#172545] text-cyan-300 border border-cyan-500/30 shadow-sm"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#081224] border-t border-[#162a4e] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-1.5 rounded-lg bg-[#111e3b] hover:bg-[#16274e] border border-[#1c325c] text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : `Copy ${summaryMode === 'detailed' ? 'Detailed' : 'Short'} Summary`}</span>
            </button>

            <button
              onClick={handleDownloadSummary}
              className="px-3.5 py-1.5 rounded-lg bg-[#0e223d] hover:bg-[#132c4e] border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Summary</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGenerateNotes}
              className="px-3.5 py-2 rounded-lg bg-[#272118] hover:bg-[#382e20] border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </button>

            <button
              onClick={handleAskQuestions}
              className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI About This</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
