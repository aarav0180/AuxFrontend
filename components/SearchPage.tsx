import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Loader2, Music, X } from 'lucide-react';
import { searchSongs, addToQueue } from '../utils/api';
import { useUser } from '../context/UserContext';
import { useSnackbar } from './ui/SnackbarContainer';
import { Background } from './Background';

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
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for 300ms (0.3 seconds)
    debounceTimerRef.current = setTimeout(() => {
      handleSearch();
    }, 300);

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

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
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col">
      {/* Background with WebGL Animation */}
      <Background />
      
      {/* Semi-transparent overlay to show background */}
      <div className="absolute inset-0 bg-charcoal/60" />
      
      {/* Content with proper top padding to avoid header collision */}
      <div className="relative z-10 flex flex-col h-full pt-20">
      {/* Header */}
      <div className="border-b border-white/10 p-4 lg:p-6 bg-charcoal/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl lg:text-3xl text-white">Search Songs</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            type="button"
            aria-label="Close search"
          >
            <X size={24} />
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
              placeholder="Search for songs, artists, or albums..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors"
              autoFocus
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-cyan-400" size={20} />
              </div>
            )}
          </div>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((song) => (
            <div
              key={song.id}
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
            >
              {/* Square Thumbnail */}
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                <img
                  src={song.thumbnails.find(t => t.quality === '150x150')?.url || song.image_url}
                  alt={song.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleAddToQueue(song)}
                    disabled={addingId === song.id}
                    className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-green-500 text-white flex items-center justify-center transition-all transform scale-90 hover:scale-100"
                    type="button"
                    aria-label="Add to queue"
                  >
                    {addingId === song.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Plus size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Song Details */}
              <div className="space-y-1">
                <h3 className="font-medium text-white text-sm truncate group-hover:text-cyan-400 transition-colors">
                  {song.name}
                </h3>
                <p className="text-xs text-white/60 truncate">{song.artists}</p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-white/40 truncate flex-1 mr-2">{song.album}</p>
                  <span className="text-xs text-white/30 font-mono flex-shrink-0">
                    {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};