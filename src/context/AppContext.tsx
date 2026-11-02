import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ResearchPaper, AiQuery, ResearchNote, SidebarTab, ThemeMode, SummaryMode, PaperComparison } from '../types';
import { initialUser, initialPapers, initialQueries, initialNotes } from '../data/mockData';
import { generateAcademicSummaries } from '../utils/summaryGenerator';
import { generateAcademicComparison } from '../utils/comparisonGenerator';

interface AppContextType {
  user: User | null;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  login: (user: User) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  papers: ResearchPaper[];
  addPaper: (paper: Omit<ResearchPaper, 'id'>) => ResearchPaper;
  deletePaper: (id: string) => void;
  updatePaper: (id: string, updates: Partial<ResearchPaper>) => void;
  queries: AiQuery[];
  addQuery: (q: { question: string; answer: string; paperTitle?: string; citations?: string[]; keyTakeaways?: string[] }) => AiQuery;
  notes: ResearchNote[];
  addNote: (note: Omit<ResearchNote, 'id' | 'date'>) => ResearchNote;
  deleteNote: (id: string) => void;
  summariesCount: number;
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  selectedPaper: ResearchPaper | null;
  setSelectedPaper: (paper: ResearchPaper | null) => void;
  isPaperModalOpen: boolean;
  setIsPaperModalOpen: (open: boolean) => void;
  isKeywordsModalOpen: boolean;
  setIsKeywordsModalOpen: (open: boolean) => void;
  isNotesModalOpen: boolean;
  setIsNotesModalOpen: (open: boolean) => void;
  isAiResponseModalOpen: boolean;
  setIsAiResponseModalOpen: (open: boolean) => void;
  currentAiResponse: AiQuery | null;
  setCurrentAiResponse: (query: AiQuery | null) => void;
  selectedPaperIdsForComparison: string[];
  setSelectedPaperIdsForComparison: React.Dispatch<React.SetStateAction<string[]>>;
  togglePaperSelectionForComparison: (id: string) => void;
  activeComparison: PaperComparison | null;
  setActiveComparison: (comp: PaperComparison | null) => void;
  openCompareWithPapers: (paperIds: string[]) => void;
  openPaperSummary: (paper: ResearchPaper) => void;
  openPaperSummaryWithMode: (paper: ResearchPaper, mode?: SummaryMode) => void;
  regeneratePaperSummary: (paperId: string, mode: SummaryMode) => Promise<{ shortSummary: string; detailedSummary: string }>;
  openAskAiWithPaper: (paperTitle?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: Dark is default
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('researchmind_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // User state: checks authentication flag to prevent unauthorized rehydration
  const [user, setUser] = useState<User | null>(() => {
    const authStatus = localStorage.getItem('researchmind_auth_status');
    if (authStatus === 'unauthenticated') {
      return null;
    }
    const saved = localStorage.getItem('researchmind_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return initialUser;
  });

  // Papers state
  const [papers, setPapers] = useState<ResearchPaper[]>(() => {
    const saved = localStorage.getItem('researchmind_papers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialPapers;
      }
    }
    return initialPapers;
  });

  // Queries state
  const [queries, setQueries] = useState<AiQuery[]>(() => {
    const saved = localStorage.getItem('researchmind_queries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialQueries;
      }
    }
    return initialQueries;
  });

  // Notes state
  const [notes, setNotes] = useState<ResearchNote[]>(() => {
    const saved = localStorage.getItem('researchmind_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialNotes;
      }
    }
    return initialNotes;
  });

  const [summariesCount, setSummariesCount] = useState<number>(() => {
    const saved = localStorage.getItem('researchmind_summaries_count');
    return saved ? parseInt(saved, 10) : 8;
  });

  const [activeTab, setActiveTab] = useState<SidebarTab>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isAiResponseModalOpen, setIsAiResponseModalOpen] = useState(false);
  const [currentAiResponse, setCurrentAiResponse] = useState<AiQuery | null>(null);
  const [selectedPaperIdsForComparison, setSelectedPaperIdsForComparison] = useState<string[]>(() => {
    return initialPapers.slice(0, 2).map((p) => p.id);
  });
  const [activeComparison, setActiveComparison] = useState<PaperComparison | null>(null);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    localStorage.setItem('researchmind_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync papers
  useEffect(() => {
    localStorage.setItem('researchmind_papers', JSON.stringify(papers));
  }, [papers]);

  // Sync queries
  useEffect(() => {
    localStorage.setItem('researchmind_queries', JSON.stringify(queries));
  }, [queries]);

  // Sync notes
  useEffect(() => {
    localStorage.setItem('researchmind_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync summaries count
  useEffect(() => {
    localStorage.setItem('researchmind_summaries_count', summariesCount.toString());
  }, [summariesCount]);

  // Sync user
  useEffect(() => {
    if (user) {
      localStorage.setItem('researchmind_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('researchmind_user');
    }
  }, [user]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('researchmind_auth_status', 'authenticated');
    localStorage.setItem('researchmind_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem('researchmind_auth_status', 'unauthenticated');
    localStorage.removeItem('researchmind_user');
    setSearchQuery('');
    setActiveTab('Dashboard');
    setIsAuthModalOpen(false);
    setIsUploadModalOpen(false);
    setIsPaperModalOpen(false);
    setIsKeywordsModalOpen(false);
    setIsNotesModalOpen(false);
    setIsAiResponseModalOpen(false);
    setSelectedPaper(null);
    setCurrentAiResponse(null);
  };

  const register = (name: string, email: string) => {
    const cleanName = name.trim();
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: email.trim(),
      avatarLetter: cleanName.charAt(0).toUpperCase() || 'R',
      role: 'Research Scholar',
    };
    setUser(newUser);
    localStorage.setItem('researchmind_auth_status', 'authenticated');
    localStorage.setItem('researchmind_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const addPaper = (paperData: Omit<ResearchPaper, 'id'>) => {
    const newPaper: ResearchPaper = {
      ...paperData,
      id: `paper-${Date.now()}`,
    };
    setPapers((prev) => [newPaper, ...prev]);
    setSummariesCount((prev) => prev + 1);
    return newPaper;
  };

  const deletePaper = (id: string) => {
    setPapers((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePaper = (id: string, updates: Partial<ResearchPaper>) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    setSelectedPaper((prev) => (prev && prev.id === id ? { ...prev, ...updates } : prev));
  };

  const addQuery = (q: {
    question: string;
    answer: string;
    paperTitle?: string;
    citations?: string[];
    keyTakeaways?: string[];
  }) => {
    const newQuery: AiQuery = {
      id: `q-${Date.now()}`,
      question: q.question,
      answer: q.answer,
      paperTitle: q.paperTitle,
      timestamp: 'Just now',
      citations: q.citations || [],
      keyTakeaways: q.keyTakeaways || [],
    };
    setQueries((prev) => [newQuery, ...prev]);
    return newQuery;
  };

  const addNote = (noteData: Omit<ResearchNote, 'id' | 'date'>) => {
    const newNote: ResearchNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePaperSelectionForComparison = (id: string) => {
    setSelectedPaperIdsForComparison((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 5) return prev; // max 5 papers
        return [...prev, id];
      }
    });
  };

  const openCompareWithPapers = (paperIds: string[]) => {
    setSelectedPaperIdsForComparison(paperIds);
    const chosen = papers.filter((p) => paperIds.includes(p.id));
    if (chosen.length >= 2) {
      const comp = generateAcademicComparison(chosen);
      setActiveComparison(comp);
    }
    setActiveTab('Compare Papers');
  };

  const openPaperSummary = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
    setIsPaperModalOpen(true);
  };

  const openPaperSummaryWithMode = (paper: ResearchPaper, mode?: SummaryMode) => {
    const updated = {
      ...paper,
      preferredSummaryMode: mode || paper.preferredSummaryMode || 'detailed',
    };
    setSelectedPaper(updated);
    setIsPaperModalOpen(true);
  };

  const regeneratePaperSummary = async (paperId: string, mode: SummaryMode): Promise<{ shortSummary: string; detailedSummary: string }> => {
    const targetPaper = papers.find((p) => p.id === paperId) || selectedPaper;
    if (!targetPaper) throw new Error('Paper not found');

    let detailedSummary = '';
    let shortSummary = '';
    let keyPoints: string[] = [];

    try {
      const response = await fetch('/api/summarize-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: targetPaper.title || targetPaper.fileName,
          abstract: targetPaper.abstract,
          fullText: targetPaper.fullText,
          pdfBase64: targetPaper.pdfBase64,
          category: targetPaper.category,
          authors: targetPaper.authors,
          summaryMode: mode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        detailedSummary = data.detailedSummary;
        shortSummary = data.shortSummary || data.summary;
        keyPoints = data.keyPoints || [];
      }
    } catch {
      // Fallback to client generation
    }

    if (!detailedSummary || !shortSummary) {
      const fallback = generateAcademicSummaries(
        targetPaper.title || targetPaper.fileName,
        targetPaper.abstract,
        targetPaper.fullText,
        targetPaper.category,
        targetPaper.authors
      );
      detailedSummary = detailedSummary || fallback.detailedSummary;
      shortSummary = shortSummary || fallback.shortSummary;
      keyPoints = keyPoints.length > 0 ? keyPoints : fallback.keyPoints;
    }

    const updates: Partial<ResearchPaper> = {
      detailedSummary,
      summary: shortSummary,
      keyPoints: keyPoints.length > 0 ? keyPoints : targetPaper.keyPoints,
      preferredSummaryMode: mode,
      status: 'Summarized',
    };

    updatePaper(paperId, updates);

    // Save summary mode and generated summary to research history
    addQuery({
      question: `Regenerated ${mode === 'detailed' ? 'Detailed Summary (10 Sections)' : 'Short Summary'} for "${targetPaper.title || targetPaper.fileName}"`,
      answer: mode === 'detailed' ? detailedSummary : shortSummary,
      paperTitle: targetPaper.title || targetPaper.fileName,
      citations: [`${targetPaper.title || targetPaper.fileName} - Synthesized Overview`],
      keyTakeaways: keyPoints.slice(0, 3),
    });

    return { shortSummary, detailedSummary };
  };

  const openAskAiWithPaper = (paperTitle?: string) => {
    setActiveTab('Dashboard');
    // Scroll to Ask AI section or focus input
    const askInput = document.getElementById('ask-ai-input');
    if (askInput) {
      askInput.focus();
      askInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        toggleTheme,
        setTheme,
        login,
        logout,
        register,
        papers,
        addPaper,
        deletePaper,
        updatePaper,
        queries,
        addQuery,
        notes,
        addNote,
        deleteNote,
        summariesCount,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isUploadModalOpen,
        setIsUploadModalOpen,
        selectedPaper,
        setSelectedPaper,
        isPaperModalOpen,
        setIsPaperModalOpen,
        isKeywordsModalOpen,
        setIsKeywordsModalOpen,
        isNotesModalOpen,
        setIsNotesModalOpen,
        isAiResponseModalOpen,
        setIsAiResponseModalOpen,
        currentAiResponse,
        setCurrentAiResponse,
        selectedPaperIdsForComparison,
        setSelectedPaperIdsForComparison,
        togglePaperSelectionForComparison,
        activeComparison,
        setActiveComparison,
        openCompareWithPapers,
        openPaperSummary,
        openPaperSummaryWithMode,
        regeneratePaperSummary,
        openAskAiWithPaper,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
