// Enhanced type definitions for the application

export interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  phase: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface User {
  userId: string;
  username: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  addedBy: User;
  duration: number; // in seconds
  downloadUrl?: string;
  downloadUrls?: Array<{
    quality: string;
    url: string;
    bitrate: number;
  }>;
}

export interface RoomState {
  currentSongId: string | null;
  startTimestamp: number | null;
  isPlaying: boolean;
  queue: Song[];
}

// Component prop interfaces
export interface HeaderProps {
  view: 'home' | 'player' | 'privacy' | 'terms';
  onGoHome?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  onOpenManifesto?: () => void;
  onOpenExplore?: () => void;
  onOpenInvite?: () => void;
  memberCount?: number;
}

export interface CurrentSongProps {
  song: Song | null;
}

export interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
  progress: number; // 0 to 100
  currentTime: number; // in seconds
  duration: number; // in seconds
  onToggleQueue?: () => void;
  showQueueButton?: boolean;
  onSeek?: (time: number) => void;
  isOutOfSync?: boolean;
  onGoToLive?: () => void;
}

export interface QueueProps {
  queue: Song[];
  currentUserId: string;
  onRemove: (songId: string) => void;
  onAddSongs?: () => void;
}

export interface HeroProps {
  onEnter: () => void;
}

// Utility types
export type ViewType = 'home' | 'player' | 'privacy' | 'terms';

export type PlayerAction = 
  | 'play'
  | 'pause'
  | 'skip'
  | 'add_to_queue'
  | 'remove_from_queue';

// Animation types
export type AnimationDuration = 'fast' | 'medium' | 'slow';

// API related types (for future backend integration)
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface SyncData {
  roomId: string;
  timestamp: number;
  action: PlayerAction;
  payload?: any;
}
