import React, { useState } from 'react';
import { X, Music2, Zap, Signal, Radio } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
  streamQuality: string;
  onQualityChange: (quality: string) => void;
}

const qualityOptions = [
  { value: '12kbps', label: 'Minimum', description: 'Lowest bandwidth usage', icon: Signal, bitrate: '12 kbps', color: 'from-gray-500 to-gray-600' },
  { value: '48kbps', label: 'Low', description: 'Optimized for slow connections', icon: Radio, bitrate: '48 kbps', color: 'from-blue-500 to-blue-600' },
  { value: '96kbps', label: 'Standard', description: 'Balanced quality and data', icon: Music2, bitrate: '96 kbps', color: 'from-cyan-500 to-cyan-600' },
  { value: '160kbps', label: 'Good', description: 'Better audio quality', icon: Music2, bitrate: '160 kbps', color: 'from-green-500 to-green-600' },
  { value: '320kbps', label: 'High', description: 'Premium audio experience', icon: Zap, bitrate: '320 kbps', color: 'from-purple-500 to-purple-600' },
];

export const Settings: React.FC<SettingsProps> = ({ onClose, streamQuality, onQualityChange }) => {
  const [selectedQuality, setSelectedQuality] = useState(streamQuality);

  const handleSave = () => {
    onQualityChange(selectedQuality);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in m-30">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-gradient-to-br from-charcoal via-charcoal/95 to-black rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,255,255,0.1)] animate-slide-up flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-white">Audio Quality</h2>
              <p className="text-xs text-white/40 mt-1">Select your preferred streaming quality</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              type="button"
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          <div className="space-y-2.5">
            {qualityOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedQuality === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedQuality(option.value)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                    ${isSelected 
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }
                  `}
                  type="button"
                >
                  <div className={`
                    p-2.5 rounded-lg transition-all duration-200
                    ${isSelected 
                      ? `bg-gradient-to-br ${option.color} shadow-lg` 
                      : 'bg-white/10 text-white/40'
                    }
                  `}>
                    <Icon size={18} className={isSelected ? 'text-white' : ''} />
                  </div>
                  
                  <div className="flex-grow text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{option.label}</span>
                      <span className="text-xs text-white/30 font-mono">{option.bitrate}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">{option.description}</p>
                  </div>

                  <div className={`
                    w-4 h-4 rounded-full border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-cyan-400 bg-cyan-400' 
                      : 'border-white/30'
                    }
                  `}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 leading-relaxed">
              <span className="text-cyan-400 font-medium">Note:</span> Higher quality requires more bandwidth. Choose a lower quality if you experience buffering.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
