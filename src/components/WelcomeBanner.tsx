import React from 'react';
import {
  ArrowRight,
  FileText,
  Sparkles,
  MessageSquare,
  BookmarkCheck,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroIllustration } from './HeroIllustration';

export const WelcomeBanner: React.FC = () => {
  const {
    user,
    setIsUploadModalOpen,
    papers,
    openPaperSummary,
    setIsKeywordsModalOpen,
    setActiveTab,
  } = useApp();

  const firstName = user?.name ? user.name.split(' ')[0] : 'Researcher';

  const handleSummarizeClick = () => {
    if (papers.length > 0) {
      openPaperSummary(papers[0]);
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleExtractClick = () => {
    setIsKeywordsModalOpen(true);
  };

  const handleAskQuestionsClick = () => {
    const askInput = document.getElementById('ask-ai-input');
    if (askInput) {
      askInput.focus();
      askInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSaveManageClick = () => {
    setActiveTab('Saved Notes');
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#091b3b] via-[#0d2654] to-[#0a1c3d] border border-[#1b3464] shadow-[0_8px_30px_rgb(0,0,0,0.35)] overflow-hidden p-5 sm:p-6 md:p-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Welcome text & CTA */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Welcome, {firstName}!</span>
              <span className="inline-block animate-wiggle">👋</span>
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-slate-100 mt-2 leading-snug">
              Explore, Analyze and Understand Research Papers with AI.
            </h3>
          </div>

          <p className="text-xs md:text-sm text-slate-300 dark:text-slate-300 leading-relaxed max-w-md">
            Upload your documents, get intelligent summaries, ask questions and manage your research all in one place.
          </p>

          <div className="pt-1 sm:pt-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#00c4b4] to-[#0ea5e9] hover:from-[#00b3a4] hover:to-[#0284c7] text-slate-950 font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,196,180,0.35)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Upload a Research Paper</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Center Column: 3D Books & Laptop Illustration */}
        <div className="lg:col-span-4 flex justify-center items-center py-2">
          <HeroIllustration className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px]" />
        </div>

        {/* Right Column: Floating Feature Panel */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-full sm:max-w-[280px] lg:max-w-[240px] rounded-2xl bg-[#0b1c3b]/80 backdrop-blur-md border border-[#1f3a6e] p-3.5 space-y-2.5 shadow-xl">
            {/* Feature 1: Summarize Papers */}
            <button
              onClick={handleSummarizeClick}
              className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-300 group-hover:scale-105 transition-transform flex-shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                Summarize Papers
              </span>
            </button>

            {/* Feature 2: Extract Key Points */}
            <button
              onClick={handleExtractClick}
              className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-400/30 text-cyan-300 group-hover:scale-105 transition-transform flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                Extract Key Points
              </span>
            </button>

            {/* Feature 3: Ask Questions */}
            <button
              onClick={handleAskQuestionsClick}
              className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600/30 border border-teal-400/30 text-teal-300 group-hover:scale-105 transition-transform flex-shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                Ask Questions
              </span>
            </button>

            {/* Feature 4: Save & Manage */}
            <button
              onClick={handleSaveManageClick}
              className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600/30 border border-amber-400/30 text-amber-300 group-hover:scale-105 transition-transform flex-shrink-0">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                Save & Manage
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
