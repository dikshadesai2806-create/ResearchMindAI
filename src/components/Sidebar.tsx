import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  MessageSquare,
  BarChart2,
  Clock,
  Bookmark,
  Lightbulb,
  GitCompare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SidebarTab } from '../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setIsUploadModalOpen } = useApp();

  const navItems: { label: SidebarTab; icon: React.ReactNode; action?: () => void }[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Upload PDF',
      icon: <UploadCloud className="w-5 h-5" />,
      action: () => setIsUploadModalOpen(true),
    },
    {
      label: 'My Papers',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Compare Papers',
      icon: <GitCompare className="w-5 h-5" />,
    },
    {
      label: 'Ask AI',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: 'Paper Analysis',
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      label: 'Research History',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: 'Saved Notes',
      icon: <Bookmark className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between p-4 bg-[#081020] dark:bg-[#081020] border-r border-[#142340] dark:border-[#142340] min-h-[calc(100vh-73px)] select-none">
      {/* Navigation Links */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                if (item.action) {
                  item.action();
                }
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#0d7477] text-white shadow-[0_4px_12px_rgba(13,116,119,0.35)]'
                  : 'text-slate-300 dark:text-slate-300 hover:text-white hover:bg-[#0e1a33]'
              }`}
            >
              <span className={isActive ? 'text-cyan-200' : 'text-slate-400 group-hover:text-slate-200'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Promo Card: "Your AI Research Partner" */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-b from-[#0f1d38] to-[#0c172d] border border-[#1b315b] relative overflow-hidden shadow-lg">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-400 text-lg">💡</span>
          <h4 className="text-xs font-semibold text-slate-100 tracking-wide">
            Your AI Research Partner
          </h4>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Upload, analyze, summarize and explore research papers with the power of AI.
        </p>
      </div>
    </aside>
  );
};
