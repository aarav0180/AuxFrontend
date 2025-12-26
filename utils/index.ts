import { Song } from '../types';

/**
 * Formats time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates the progress percentage of a song
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  if (!duration || duration <= 0) return 0;
  return Math.min((currentTime / duration) * 100, 100);
};

/**
 * Generates a unique ID with timestamp
 */
export const generateId = (prefix: string = ''): string => {
  return `${prefix}${prefix ? '-' : ''}${Date.now()}`;
};

/**
 * Creates an auto-DJ song when queue is empty
 */
export const createAutoDJSong = (): Song => ({
  id: generateId('auto'),
  title: "Auto-DJ Track",
  artist: "The Algorithm",
  artwork: "https://images.unsplash.com/photo-1614730341194-75c607400070?q=80&w=200&auto=format&fit=crop",
  addedBy: { userId: 'system', username: "Auto-DJ" },
  duration: 180
});

/**
 * Validates if a song object is properly formed
 */
export const isValidSong = (song: any): song is Song => {
  return (
    song &&
    typeof song.id === 'string' &&
    typeof song.title === 'string' &&
    typeof song.artist === 'string' &&
    typeof song.artwork === 'string' &&
    song.addedBy &&
    typeof song.addedBy.userId === 'string' &&
    typeof song.addedBy.username === 'string' &&
    typeof song.duration === 'number'
  );
};