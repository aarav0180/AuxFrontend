import React, { useState } from 'react';
import { Background } from './components/Background';
import { Hero } from './components/Hero';
import { PeerIndicator } from './components/PeerIndicator';
import { Header } from './components/Header';
import { PlayerPage } from './components/PlayerPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { GlobalStyles } from './components/ui/GlobalStyles';
import { SnackbarProvider } from './components/ui/SnackbarContainer';
import { UserProvider } from './context/UserContext';
import { useAppNavigation } from './hooks';
import { APP_VERSION } from './constants';

const AppContent: React.FC = () => {
  const {
    view,
    navigateToHome,
    navigateToPlayer,
    navigateToPrivacy,
    navigateToTerms,
  } = useAppNavigation();
  
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [streamQuality, setStreamQuality] = useState(() => {
    const saved = localStorage.getItem('streamQuality');
    return saved || '320kbps';
  });

  const handleQualityChange = (quality: string) => {
    setStreamQuality(quality);
    localStorage.setItem('streamQuality', quality);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-charcoal text-white selection:bg-cyan-500/30">
      <GlobalStyles />
      
      {showSettings && (
        <Settings 
          onClose={() => setShowSettings(false)}
          streamQuality={streamQuality}
          onQualityChange={handleQualityChange}
        />
      )}
      
      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} />
      )}
      
      <Header 
        view={view} 
        onGoHome={navigateToHome}
        onOpenSettings={() => setShowSettings(true)}
        onOpenProfile={() => setShowProfile(true)}
        memberCount={memberCount}
      />

      {view === 'home' && (
        <>
          <Background />
          <div className="relative z-10 w-full h-full flex flex-col">
            <main className="flex-grow">
              <Hero onEnter={navigateToPlayer} />
            </main>
            <PeerIndicator />
            
            {/* Footer Links */}
            <div className="absolute bottom-4 right-8 flex gap-4 text-xs text-white/30 z-20">
              <button 
                onClick={navigateToPrivacy} 
                className="hover:text-white transition-colors"
                type="button"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={navigateToTerms} 
                className="hover:text-white transition-colors"
                type="button"
                aria-label="View Terms of Service"
              >
                Terms of Service
              </button>
            </div>

            {/* Decorative corner lines */}
            <div className="absolute top-0 left-0 w-32 h-32 p-6 pointer-events-none">
              <div className="w-full h-px bg-white/10 mb-2" />
              <div className="w-px h-full bg-white/10" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 p-6 pointer-events-none flex flex-col justify-end">
              <div className="font-mono text-[9px] text-white/30 mb-4 rotate-90 origin-bottom-left absolute left-8 bottom-24 tracking-widest">
                {APP_VERSION}
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'player' && (
        <div className="relative z-10 w-full h-full animate-fade-in">
          <PlayerPage streamQuality={streamQuality} onMemberCountChange={setMemberCount} />
        </div>
      )}

      {view === 'privacy' && (
        <div className="relative z-10 w-full h-full animate-fade-in bg-charcoal">
          <PrivacyPolicy />
        </div>
      )}

      {view === 'terms' && (
        <div className="relative z-10 w-full h-full animate-fade-in bg-charcoal">
          <TermsOfService />
        </div>
      )}

      <GlobalStyles />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </SnackbarProvider>
  );
};

export default App;
