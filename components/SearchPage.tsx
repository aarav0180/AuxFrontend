import React, { useState } from 'react';
import { Search, Plus, Loader2, Music } from 'lucide-react';
import { searchSongs, addToQueue } from '../utils/api';
import { useUser } from '../context/UserContext';
import { useSnackbar } from './ui/SnackbarContainer';

interface SearchResult {
  id: string;
  name: string;
  artists: string;
  album: string;
  image_url: string;
  duration: number;
  download_url: string;
  thumbnails: Array<{ url: string; quality: string }>;
}

interface SearchPageProps {
  onClose: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onClose }) => {
  const { userId, username, roomCode } = useUser();
  const { success, error: showError } = useSnackbar();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchSongs(query, 20);
      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message || 'Failed to search songs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToQueue = async (song: SearchResult) => {
    if (!roomCode) {
      showError('You must be in a room to add songs');
      return;
    }

    setAddingId(song.id);
    setError(null);

    try {
      const response = await addToQueue(roomCode, song.id, userId, username);
      success(response.message || `Added "${song.name}" to queue`);
      setTimeout(() => setAddingId(null), 1000);
    } catch (err: any) {
      console.error(err.response); 
      showError(err.response?.data?.error || err.response?.error ||'Failed to add song to queue');
      setError(err.response?.data?.error || err.response?.error || 'Failed to add song to queue');
      setAddingId(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl lg:text-3xl text-white">Search Songs</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-3xl leading-none"
            type="button"
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for songs, artists, or albums..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            type="button"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-grow overflow-y-auto p-4 lg:p-6">
        {results.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-white/40">
            <Music size={64} className="mb-4" />
            <p className="text-lg">Search for songs to add to the queue</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-cyan-500" size={48} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((song) => (
            <div
              key={song.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all group"
            >
              <div className="flex gap-4">
                <img
                  src={song.thumbnails.find(t => t.quality === '150x150')?.url || song.image_url}
                  alt={song.name}
                  className="w-16 h-16 rounded object-cover flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                    {song.name}
                  </h3>
                  <p className="text-sm text-white/60 truncate">{song.artists}</p>
                  <p className="text-xs text-white/40 truncate">{song.album}</p>
                  <p className="text-xs text-white/30 mt-1">
                    {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleAddToQueue(song)}
                disabled={addingId === song.id}
                className="mt-3 w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 disabled:bg-green-500/20 border border-cyan-500/30 disabled:border-green-500/30 rounded-lg text-cyan-400 disabled:text-green-400 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                type="button"
              >
                {addingId === song.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add to Queue
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};