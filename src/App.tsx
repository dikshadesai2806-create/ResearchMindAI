import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { StatCards } from './components/StatCards';
import { RecentPapers } from './components/RecentPapers';
import { AskAiSection } from './components/AskAiSection';
import { QuickActions } from './components/QuickActions';
import { SecondaryViews } from './components/SecondaryViews';
import { LoginPage } from './components/LoginPage';
import { AuthModal } from './components/AuthModal';
import { UploadModal } from './components/UploadModal';
import { PaperDetailModal } from './components/PaperDetailModal';
import { KeywordsModal } from './components/KeywordsModal';
import { NotesModal } from './components/NotesModal';
import { AiResponseModal } from './components/AiResponseModal';

const DashboardContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-73px)]">
      {activeTab === 'Dashboard' ? (
        <>
          {/* Top Hero Welcome Banner */}
          <WelcomeBanner />

          {/* 4 Stat Cards Row */}
          <StatCards />

          {/* Two-Column Grid: Left is Recent Papers, Right is Ask AI + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Recent Papers */}
            <div className="lg:col-span-6">
              <RecentPapers />
            </div>

            {/* Right Column: Ask AI about Your Research & Quick Actions */}
            <div className="lg:col-span-6 space-y-6">
              <AskAiSection />
              <QuickActions />
            </div>
          </div>
        </>
      ) : (
        <SecondaryViews />
      )}
    </div>
  );
};

const MainApp: React.FC = () => {
  const { user } = useApp();

  // Route protection: If logged out, immediately display the Login/Register page
  // and prevent access to the dashboard.
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <Header />

      {/* Main Body: Sidebar + Main Content Area */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 bg-[#070e1b] flex flex-col">
          <DashboardContent />
        </main>
      </div>

      {/* Interactive Modals */}
      <AuthModal />
      <UploadModal />
      <PaperDetailModal />
      <KeywordsModal />
      <NotesModal />
      <AiResponseModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
