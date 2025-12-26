import React, { useEffect, useState } from 'react';
import { Activity, Radio } from 'lucide-react';

export const PeerIndicator: React.FC = () => {
  const [peerCount, setPeerCount] = useState(12);

  // Simulate subtle fluctuation in peer count
  useEffect(() => {
    const interval = setInterval(() => {
      setPeerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        // Keep between 10 and 25 for this demo
        const next = prev + change;
        return next < 10 ? 10 : next > 25 ? 25 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 animate-fade-in">
      <div className="flex flex-col items-end">
        <span className="font-sans text-[10px] tracking-[0.2em] text-cyan-400/80 uppercase font-semibold">
          Live Network
        </span>
        <span className="font-serif text-white/90 text-sm">
          {peerCount} Peers Connected
        </span>
      </div>
      <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-20"></div>
        <Radio size={16} className="text-cyan-400" />
      </div>
    </div>
  );
};
