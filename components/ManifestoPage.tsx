import React from 'react';
import { X } from 'lucide-react';
import { Background } from './Background';

interface ManifestoPageProps {
  onClose: () => void;
}

export const ManifestoPage: React.FC<ManifestoPageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with WebGL */}
      <Background />
      
      {/* Light Overlay - more transparent to show WebGL */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
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
              The Manifesto
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mx-auto"></div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white/80 text-base md:text-lg leading-relaxed font-sans">
            {/* Quote Section */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent rounded-full"></div>
              <blockquote className="border-l-4 border-cyan-400/50 pl-6 italic text-cyan-100/90 text-xl md:text-2xl py-2">
                "Music is a shared experience, not a solitary commodity."
              </blockquote>
            </div>

            {/* Intro Paragraph */}
            <div className="relative">
              <p className="text-white/90 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                We're building a space where music flows freely, curated collectively by everyone in the room. 
                No algorithms deciding what you hear next—just real people, real choices, real connection.
              </p>
              {/* Decorative dot */}
              <div className="absolute -right-2 top-1/2 w-3 h-3 bg-cyan-400/50 rounded-full animate-pulse"></div>
            </div>

            {/* Divider Line */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 relative">
              {/* Vertical decorative line between columns on desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all relative group">
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-400/20 rounded-tr-xl group-hover:border-cyan-400/50 transition-all"></div>
                <h3 className="font-serif text-xl text-cyan-400 mb-3">Democratic Control</h3>
                <p className="text-sm text-white/70">
                  Everyone has a voice. Add songs, remove your contributions, vote to skip. 
                  The stream is shaped by the collective will of all listeners.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all relative group">
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-400/20 rounded-tr-xl group-hover:border-cyan-400/50 transition-all"></div>
                <h3 className="font-serif text-xl text-cyan-400 mb-3">Personal Freedom</h3>
                <p className="text-sm text-white/70">
                  Want to skip ahead? Create your own local queue. Seek to your favorite part. 
                  Stay live or forge your own path—it's your choice.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all relative group">
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-400/20 rounded-tr-xl group-hover:border-cyan-400/50 transition-all"></div>
                <h3 className="font-serif text-xl text-cyan-400 mb-3">Real-Time Sync</h3>
                <p className="text-sm text-white/70">
                  Experience music together in perfect harmony. See who's listening, watch the queue evolve, 
                  feel the energy of collective listening.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all relative group">
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-400/20 rounded-tr-xl group-hover:border-cyan-400/50 transition-all"></div>
                <h3 className="font-serif text-xl text-cyan-400 mb-3">No Boundaries</h3>
                <p className="text-sm text-white/70">
                  Stream from anywhere, on any device. No subscriptions, no paywalls, 
                  no locked features. Just pure, unfiltered music streaming.
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Closing Text */}
            <p className="text-center text-white/80 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              Skip ahead if you want your own path. Stay live to ride the wave with everyone. 
              Add songs. Remove yours. It's democratic, it's chaotic, it's beautiful.
            </p>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-2 border-cyan-400/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
              <div className="relative">
                <p className="text-white text-center font-serif text-xl md:text-2xl mb-3">
                  One stream. Infinite possibilities.
                </p>
                <p className="text-white/50 text-center text-sm uppercase tracking-widest">
                  Welcome to the future of shared music
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Line Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-px h-16 bg-gradient-to-b from-cyan-400/50 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
