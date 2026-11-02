import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ResearchMind AI ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleResetCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    window.location.reload();
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070e1b] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="w-full max-w-xl rounded-2xl bg-[#0c172e] border border-[#1e345e] shadow-2xl p-8 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <AlertTriangle className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  ResearchMind AI Encountered an Issue
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  An unexpected error occurred during rendering
                </p>
              </div>
            </div>

            <div className="bg-[#081020] border border-[#142340] rounded-xl p-4 mb-6 text-xs text-rose-300 font-mono overflow-x-auto max-h-40">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>

            <div className="bg-[#101e38] border border-[#1b3158] rounded-xl p-4 mb-6">
              <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                Quick Recovery Options
              </h2>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Click <strong>Reload Application</strong> to try rendering again.</li>
                <li>Click <strong>Clear Cache & Reset</strong> if outdated cached state is causing a conflict.</li>
                <li>If deployed to GitHub Pages, ensure <strong>Settings &gt; Pages &gt; Source</strong> is set to <strong>GitHub Actions</strong> or branch <strong>gh-pages</strong>.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-lg shadow-cyan-900/30 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleResetCache}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#132240] hover:bg-[#1a2f58] border border-[#233d6e] text-slate-200 font-medium text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Clear Cache & Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
