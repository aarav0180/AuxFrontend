import React, { useState } from 'react';
import { X, Edit2, Check, Radio } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ProfileProps {
  onClose: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const { userId, username, roomCode, setUsername } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState(username || '');

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setNewUsername(username || '');
    setIsEditingName(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md max-h-[90vh] bg-gradient-to-br from-charcoal via-charcoal/95 to-black rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,255,255,0.1)] animate-slide-up flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white">Profile</h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              type="button"
              aria-label="Close profile"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-6 space-y-5 overflow-y-auto flex-1">
          {/* Username Section */}
          <div className="space-y-3">
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider">Username</label>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  autoFocus
                  maxLength={20}
                  placeholder="Enter username"
                />
                <button
                  onClick={handleSaveUsername}
                  className="p-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                  type="button"
                  aria-label="Save username"
                >
                  <Check size={18} className="text-white" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  type="button"
                  aria-label="Cancel"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group">
                <span className="text-white font-medium">{username || 'Guest'}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1.5 text-white/40 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  type="button"
                  aria-label="Edit username"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* User ID Section */}
          <div className="space-y-3">
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider">User ID</label>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-xs text-white/60 font-mono break-all">{userId}</p>
            </div>
          </div>

          {/* Room Code Section */}
          <div className="space-y-3">
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider">Current Room</label>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-white font-medium">{roomCode || 'Not in a room'}</p>
            </div>
          </div>

          {/* Role Section */}
          <div className="space-y-3">
            <label className="text-xs text-white/50 font-medium uppercase tracking-wider">Role</label>
            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Radio size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Listener</p>
                <p className="text-xs text-white/40">Enjoying the music</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
