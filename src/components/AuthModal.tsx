import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('AI & Data Science Researcher');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authModalMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
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
        setError('Please fill in all required fields.');
        return;
      }
      register(name.trim(), email.trim());
    }
  };

  const handleQuickDemo = () => {
    login({
      id: 'usr_diksha_1',
      name: 'Diksha Desai',
      email: 'dikshadesai2806@gmail.com',
      avatarLetter: 'D',
      role: 'AI & Data Science Researcher',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0c172e] border border-[#1e345e] shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-[#182b4a] pb-3">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setError('');
            }}
            className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-3.5 ${
              authModalMode === 'login'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setError('');
            }}
            className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-3.5 ${
              authModalMode === 'register'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>
        </div>

        {/* Quick Demo Access banner */}
        <div className="mb-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-cyan-200">Default Demo Profile</p>
              <p className="text-slate-400 text-[11px]">Diksha Desai (Pre-configured)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            Instant Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          {authModalMode === 'register' && (
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
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
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
                className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
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
                className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Research Field / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. AI & Data Science Researcher"
                className="w-full h-10 px-3 text-sm rounded-xl bg-[#081020] border border-[#1b2d4e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            {authModalMode === 'login' ? 'Sign In to ResearchMind' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};
