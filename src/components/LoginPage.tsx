import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, Sparkles, Moon, Sun, BookOpen, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login, register, theme, toggleTheme } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('AI & Data Science Researcher');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both your email address and password.');
        return;
      }
      const displayName =
        email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Researcher';

      login({
        id: `usr_${Date.now()}`,
        name: displayName,
        email: email.trim(),
        avatarLetter: displayName.charAt(0).toUpperCase() || 'R',
        role: 'AI Researcher',
      });
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please complete all required fields to create your account.');
        return;
      }
      register(name.trim(), email.trim());
    }
  };

  const handleQuickDemoLogin = () => {
    login({
      id: 'usr_diksha_1',
      name: 'Diksha Desai',
      email: 'dikshadesai2806@gmail.com',
      avatarLetter: 'D',
      role: 'AI & Data Science Researcher',
    });
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4.5 bg-[#081020] border-b border-[#142340]">
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d9488]/30 via-[#06b6d4]/20 to-[#0284c7]/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <svg
              className="w-7 h-7 text-cyan-400 stroke-[1.8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
              <path d="M6 14h6" />
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              ResearchMind AI
            </h1>
            <p className="text-xs font-medium text-slate-400">
              AI-Powered Research & Literature Assistant
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#131f37] border border-[#1e2f4f] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-400" />
          )}
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-md rounded-2xl bg-[#0c172e] border border-[#1e345e] shadow-2xl p-7 text-slate-100 relative">
          {/* Decorative badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure Academic Workspace</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {mode === 'login' ? 'Sign In to Your Account' : 'Create Researcher Account'}
            </h2>
            <p className="text-xs text-slate-400 mt-1.5">
              {mode === 'login'
                ? 'Access your saved papers, AI query history, and summaries'
                : 'Join ResearchMind AI to explore, analyze, and synthesize literature'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#081224] border border-[#162744] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#0d7477] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#0d7477] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>

          {/* One-Click Demo Access */}
          {mode === 'login' && (
            <div className="mb-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-cyan-200">Demo Account</p>
                  <p className="text-slate-400 text-[11px]">Diksha Desai (Instant Login)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Continue Demo
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Alex Morgan"
                    className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Research Role or Institution
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. AI & Data Science Researcher"
                  className="w-full h-10 px-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              {mode === 'login' ? 'Sign In to Dashboard' : 'Create Account & Enter'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            {mode === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
