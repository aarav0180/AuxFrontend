import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { QueueProps } from '../../types';

export const Queue: React.FC<QueueProps> = ({ queue, currentUserId, onRemove, onAddSongs }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 pb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl text-white">Up Next</h3>
        </div>
        {onAddSongs && (
          <button
            onClick={onAddSongs}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-serif text-sm"
            type="button"
            aria-label="Add songs"
          >
            <Plus size={16} />
            Add Songs
          </button>
        )}
      </div>
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-4">
        {queue.map((song, index) => (
          <div key={`${song.id}-${index}`} className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
              <img src={song.artwork} alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-xs text-white">{index + 1}</span>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-medium text-white truncate">{song.title}</h4>
              <p className="text-sm text-white/40 truncate">{song.artist}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/20 uppercase tracking-wider">{song.addedBy.username}</span>
              {song.addedBy.userId === currentUserId && (
                <button 
                  onClick={() => onRemove(song.id)}
                  className="text-white/20 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        {queue.length === 0 && (
          <div className="text-center py-12 text-white/20">
            <p>Queue is empty</p>
            <p className="text-sm mt-2">Add some songs to keep the party going!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
