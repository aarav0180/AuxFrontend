import React from 'react';
import { X, TrendingUp, Globe, Users, Radio } from 'lucide-react';
import { Background } from './Background';

interface ExplorePageProps {
  onClose: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with WebGL */}
      <Background />
      
      {/* Light Overlay - more transparent to show WebGL */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/20 text-white/60 hover:text-white transition-all"
            type="button"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Decorative Line Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"></div>

          {/* Header */}
          <div className="mb-10 text-center relative">
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight">
              Explore Streams
            </h1>
            <p className="text-white/70 text-lg">Discover live music rooms and trending streams</p>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mt-4 mx-auto"></div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg"></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative">
            {/* Vertical lines between stats */}
            <div className="hidden md:block absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="hidden md:block absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:border-cyan-400/50 transition-all group">
              <Radio className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-serif text-white">1</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Live Rooms</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:border-cyan-400/50 transition-all group">
              <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-serif text-white">∞</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Listeners</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-serif text-white">24/7</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Streaming</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <Globe className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-serif text-white">∞</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Songs</div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Featured Room */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-white mb-4 flex items-center gap-3">
              Featured Room
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent"></div>
            </h2>
            <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-2 border-cyan-400/30 rounded-2xl p-6 hover:border-cyan-400/50 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
              <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-cyan-400 transition-colors">DEFAULT</h3>
                  <p className="text-white/60 text-sm">The main shared stream • Open to all</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-400 uppercase tracking-wider">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Listeners</div>
                  <div className="text-white font-medium">Active Now</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Queue</div>
                  <div className="text-white font-medium">Dynamic</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Genre</div>
                  <div className="text-white font-medium">All Genres</div>
                </div>
              </div>

              <button className="mt-4 w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-xl text-cyan-400 font-sans text-sm uppercase tracking-wider transition-all">
                Join Stream
              </button>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Coming Soon */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-cyan-400/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-cyan-400/20 rounded-br-2xl"></div>
            <h3 className="font-serif text-xl text-white/80 mb-3">More Rooms Coming Soon</h3>
            <p className="text-white/50 text-sm">
              Create custom rooms, genre-specific streams, private listening parties, and more.
              The infinite stream is just getting started.
            </p>
          </div>

          {/* Decorative Line Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-px h-16 bg-gradient-to-b from-cyan-400/50 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
