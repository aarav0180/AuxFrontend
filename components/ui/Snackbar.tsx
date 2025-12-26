import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  duration?: number;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ 
  message, 
  type, 
  duration = 4000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 16);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      bgGradient: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/50',
      iconColor: 'text-emerald-400',
      progressColor: 'bg-emerald-500',
      shadowColor: 'shadow-[0_8px_32px_rgba(16,185,129,0.25)]'
    },
    error: {
      icon: XCircle,
      bgGradient: 'from-rose-500/20 to-red-500/20',
      borderColor: 'border-rose-500/50',
      iconColor: 'text-rose-400',
      progressColor: 'bg-rose-500',
      shadowColor: 'shadow-[0_8px_32px_rgba(244,63,94,0.25)]'
    },
    info: {
      icon: Info,
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/50',
      iconColor: 'text-cyan-400',
      progressColor: 'bg-cyan-500',
      shadowColor: 'shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
    },
    warning: {
      icon: AlertCircle,
      bgGradient: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/50',
      iconColor: 'text-amber-400',
      progressColor: 'bg-amber-500',
      shadowColor: 'shadow-[0_8px_32px_rgba(251,191,36,0.25)]'
    }
  };

  const { icon: Icon, bgGradient, borderColor, iconColor, progressColor, shadowColor } = config[type];

  return (
    <div
      className={`fixed top-24 right-6 z-[9999] transition-all duration-300 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <div
        className={`
          relative min-w-[320px] max-w-md overflow-hidden
          bg-gradient-to-br ${bgGradient}
          backdrop-blur-xl border ${borderColor}
          rounded-xl ${shadowColor}
        `}
        style={{
          animation: isVisible ? 'bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 animate-pulse-slow" />
        
        <div className="relative flex items-start gap-3 p-4">
          <div className={`flex-shrink-0 ${iconColor}`} style={{ animation: 'scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
            <Icon size={24} strokeWidth={2.5} />
          </div>

          <div className="flex-1 pr-2">
            <p className="text-white font-sans text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors duration-200 group"
            type="button"
            aria-label="Close notification"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        <div className="h-1 bg-white/5">
          <div
            className={`h-full ${progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
