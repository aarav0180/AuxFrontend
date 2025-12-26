import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, ThumbsUp, Radio } from 'lucide-react';
import { ListMusic } from 'lucide-react';
import { PlayerControlsProps } from '../../types';
import { formatTime } from '../../utils';

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSkip,
  progress,
  currentTime,
  duration,
  onToggleQueue,
  showQueueButton = false,
  onSeek,
  isOutOfSync,
  onGoToLive
}) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !onSeek) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const handleProgressMouseDown = () => {
    setIsSeeking(true);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeeking || !progressBarRef.current || !onSeek) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const handleProgressMouseUp = () => {
    setIsSeeking(false);
  };

  React.useEffect(() => {
    if (isSeeking) {
      const handleGlobalMouseUp = () => setIsSeeking(false);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isSeeking]);
  return (
    <div className="w-full max-w-xl space-y-6 animate-fade-in-up animation-delay-400">
      {/* Progress Bar */}
      <div className="w-full px-4">
        <div 
          ref={progressBarRef}
          className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all group"
          onClick={handleProgressClick}
          onMouseDown={handleProgressMouseDown}
          onMouseMove={handleProgressMouseMove}
          onMouseUp={handleProgressMouseUp}
        >
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full relative transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: isSeeking ? '0ms' : '300ms' }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4">
         <span className="font-mono text-xs text-white/40">{formatTime(currentTime)}</span>
         
         <div className="flex items-center gap-8">
           <button className="text-white/40 hover:text-white transition-colors">
              <ThumbsUp size={24} />
           </button>
           
           <button 
             onClick={onPlayPause}
             className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-charcoal hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
           >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
           </button>

           <div className="flex items-center gap-2">
              <button onClick={onSkip} className="text-white/40 hover:text-white transition-colors">
                  <SkipForward size={28} />
              </button>
              <span className="font-sans text-[10px] text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                1/3 Votes
              </span>
           </div>
           {showQueueButton && (
             <button onClick={onToggleQueue} className="lg:hidden text-white/40 hover:text-white transition-colors">
               <ListMusic size={24} />
             </button>
           )}
         </div>

         {/* Go to Live Button */}
         {isOutOfSync && onGoToLive && (
           <button 
             className="px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all flex items-center gap-2"
             onClick={onGoToLive}
             type="button"
             aria-label="Go to live"
           >
             <Radio size={14} className="text-red-400" />
             <span className="text-xs text-red-400 font-medium uppercase tracking-wider">Live</span>
           </button>
         )}

         <span className="font-mono text-xs text-white/40">-{formatTime(Math.max(0, duration - currentTime))}</span>
      </div>
    </div>
  );
};
