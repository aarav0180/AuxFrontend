import React, { useState } from 'react';
import { X, Copy, Check, Share2, QrCode, Link2 } from 'lucide-react';
import { Background } from './Background';

interface InvitePageProps {
  onClose: () => void;
}

export const InvitePage: React.FC<InvitePageProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const roomUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AUX - The Infinite Shared Stream',
          text: 'Join me on AUX for collective music streaming!',
          url: roomUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with WebGL */}
      <Background />
      
      {/* Light Overlay - more transparent to show WebGL */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
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
            <div className="relative inline-block">
              <Share2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <div className="absolute -inset-4 border border-cyan-400/20 rounded-full"></div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-tight">
              Invite Friends
            </h1>
            <p className="text-white/70 text-lg">Share the infinite stream with others</p>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mt-4 mx-auto"></div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg"></div>
          </div>

          {/* Share URL */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <label className="text-sm text-white/60 uppercase tracking-wider">Stream URL</label>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent"></div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white font-mono text-sm flex items-center gap-3">
                <Link2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{roomUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-6 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-xl text-cyan-400 transition-all flex items-center gap-2"
                type="button"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span className="hidden md:inline text-sm uppercase tracking-wider">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="hidden md:inline text-sm uppercase tracking-wider">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Share Methods */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleShare}
              className="bg-black/30 backdrop-blur-sm hover:bg-black/40 border border-white/20 hover:border-cyan-400/30 rounded-xl p-6 transition-all group text-left relative"
              type="button"
            >
              <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-400/20 rounded-tr-xl group-hover:border-cyan-400/50 transition-all"></div>
              <Share2 className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl text-white mb-2">Share Link</h3>
              <p className="text-sm text-white/60">Use your device's native share options</p>
            </button>

            <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 opacity-50 relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white/10 rounded-tr-xl"></div>
              <QrCode className="w-8 h-8 text-white/40 mb-3" />
              <h3 className="font-serif text-xl text-white/60 mb-2">QR Code</h3>
              <p className="text-sm text-white/40">Coming soon - Scan to join instantly</p>
            </div>
          </div>

          {/* Divider Line */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="w-2 h-2 bg-cyan-400/50 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-2 border-cyan-400/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-serif text-lg text-white">How It Works</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent"></div>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Share the link with friends to invite them to the stream</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Everyone hears the same music at the same time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Add songs, vote to skip, and curate together</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>No downloads or accounts required - just click and listen</span>
              </li>
            </ul>
            </div>
          </div>

          {/* Decorative Line Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-px h-16 bg-gradient-to-b from-cyan-400/50 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
