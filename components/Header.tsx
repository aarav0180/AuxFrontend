import React from 'react';
import { Disc, PictureInPicture2, Settings as SettingsIcon, User } from 'lucide-react';
import { HeaderProps } from '../types';

export const Header: React.FC<HeaderProps> = ({ view, onGoHome, onOpenSettings, onOpenProfile, memberCount = 0, onOpenManifesto, onOpenExplore, onOpenInvite }) => {
  return (
    <div className="absolute top-0 left-0 w-full z-20 px-8 py-6 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 group cursor-pointer"
        onClick={onGoHome}
      >
        <Disc className={`text-white opacity-80 group-hover:rotate-180 transition-transform duration-700 ${view === 'player' ? 'text-cyan-400 opacity-100' : ''}`} size={24} />
        <span className="font-serif text-white text-lg tracking-wide opacity-90">AUX</span>
      </div>
      
      <div className="flex items-center gap-8">
        {view === 'player' && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 animate-fade-in">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
             <span className="font-sans text-[10px] tracking-widest uppercase text-white/70">{memberCount} {memberCount === 1 ? 'Member' : 'Members'} Live</span>
             {/* <PictureInPicture2 size={14} className="text-white/50 ml-2" /> */}
          </div>
        )}

        {view === 'home' && (
          <nav className="hidden md:flex gap-8">
            <button
              onClick={onOpenManifesto}
              className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 hover:text-cyan-400 transition-colors duration-300"
              type="button"
            >
              Manifesto
            </button>
            <button
              onClick={onOpenExplore}
              className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 hover:text-cyan-400 transition-colors duration-300"
              type="button"
            >
              Explore
            </button>
            <button
              onClick={onOpenInvite}
              className="font-sans text-xs uppercase tracking-[0.15em] text-white/60 hover:text-cyan-400 transition-colors duration-300"
              type="button"
            >
              Invite
            </button>
          </nav>
        )}

        {view === 'player' && (
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              type="button"
              aria-label="Settings"
            >
              <SettingsIcon size={20} />
            </button>
            
            <button
              onClick={onOpenProfile}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              type="button"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
