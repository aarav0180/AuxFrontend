import React, { useState } from 'react';
import { UserCircle, Loader2 } from 'lucide-react';

interface UsernamePromptProps {
  onSubmit: (username: string) => void;
}

export const UsernamePrompt: React.FC<UsernamePromptProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      onSubmit(username.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-charcoal border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
            <UserCircle size={32} className="text-cyan-400" />
          </div>
          <h2 className="font-serif text-2xl text-white mb-2">Welcome to AUX</h2>
          <p className="text-white/60 text-center text-sm">
            Enter your name to start listening together
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-white/80 mb-2">
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., Alex, Sarah, DJ Mike..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors"
              maxLength={20}
              autoFocus
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim() || loading}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Joining...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        <p className="text-xs text-white/30 text-center mt-4">
          Your name will be visible to other members in the room
        </p>
      </div>
    </div>
  );
};