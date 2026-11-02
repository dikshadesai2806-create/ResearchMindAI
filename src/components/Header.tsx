import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Moon, Sun, User as UserIcon, LogOut, LogIn, UserPlus, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    user,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
  } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4.5 bg-[#081020] dark:bg-[#081020] border-b border-[#142340] dark:border-[#142340] transition-colors duration-200">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3.5">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d9488]/30 via-[#06b6d4]/20 to-[#0284c7]/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          {/* Custom Book Outline Icon matching reference image */}
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
          <p className="text-xs font-medium text-slate-400 dark:text-slate-400">
            AI-Powered Research & Literature Assistant
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Theme Toggle, User Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-80 md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, topics, keywords..."
            className="w-full h-10 pl-4 pr-10 text-sm rounded-full bg-[#131f37] dark:bg-[#131f37] border border-[#1e2f4f] dark:border-[#1e2f4f] text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Dark/Light Mode Quick Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#131f37] border border-[#1e2f4f] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-400" />
          )}
        </button>

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 py-1.5 px-2 rounded-full hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2563eb] text-white font-semibold text-sm shadow-sm">
                {user.avatarLetter}
              </div>
              <span className="text-sm font-medium text-slate-100 max-w-[130px] truncate">
                {user.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-600/30 hover:bg-cyan-600/40 border border-cyan-500/50 text-cyan-200 text-xs font-medium transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* User Menu Dropdown */}
          {isDropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0d1830] border border-[#1f3258] shadow-2xl z-50 py-2 divide-y divide-[#172744] animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {user.role || 'Researcher'}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-300 hover:bg-[#142344] hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
                    Theme Mode
                  </span>
                  <span className="capitalize text-slate-400">{theme}</span>
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-[#142344] hover:text-white transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                  Switch Account
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-[#142344] hover:text-white transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-teal-400" />
                  Register New Account
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
