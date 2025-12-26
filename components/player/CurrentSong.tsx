import React from 'react';
import { CurrentSongProps } from '../../types';

export const CurrentSong: React.FC<CurrentSongProps> = ({ song }) => {
  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/40">
        <p>No song playing</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center pb-6 lg:pb-4">
      {/* Album Art */}
      <div className="relative group w-[220px] h-[220px] md:w-[240px] md:h-[240px] lg:w-[240px] lg:h-[240px] mb-4 lg:mb-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.02]">
         <img 
           src={song.artwork} 
           alt={song.title}
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Track Info */}
      <div className="text-center space-y-2 mb-6">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-4xl text-white tracking-wide animate-fade-in-up line-clamp-2">
          {song.title.length > 30 ? song.title.substring(0, 30) + '...' : song.title}
        </h2>
        <p className="font-sans text-md text-white/60 tracking-widest uppercase animate-fade-in-up animation-delay-200">
          {song.artist}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mt-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up animation-delay-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-sans text-xs text-cyan-100/80 tracking-wider uppercase">
            Added by {song.addedBy.username}
          </span>
        </div>
      </div>
    </div>
  );
};
