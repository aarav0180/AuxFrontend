import { useState, useCallback } from 'react';
import { RoomState, Song } from '../types';

export type ViewType = 'home' | 'player' | 'privacy' | 'terms';

/**
 * Hook for managing application view state
 */
export const useAppNavigation = () => {
  const [view, setView] = useState<ViewType>('home');

  const navigateToHome = useCallback(() => setView('home'), []);
  const navigateToPlayer = useCallback(() => setView('player'), []);
  const navigateToPrivacy = useCallback(() => setView('privacy'), []);
  const navigateToTerms = useCallback(() => setView('terms'), []);

  return {
    view,
    setView,
    navigateToHome,
    navigateToPlayer,
    navigateToPrivacy,
    navigateToTerms,
  };
};

/**
 * Hook for managing mobile UI state
 */
export const useMobileUI = () => {
  const [showMobileQueue, setShowMobileQueue] = useState(false);

  const toggleMobileQueue = useCallback(() => {
    setShowMobileQueue(prev => !prev);
  }, []);

  const closeMobileQueue = useCallback(() => {
    setShowMobileQueue(false);
  }, []);

  return {
    showMobileQueue,
    toggleMobileQueue,
    closeMobileQueue,
  };
};

/**
 * Hook for managing player state and actions
 */
export const usePlayerState = (initialState: RoomState, currentSong: Song | null) => {
  const [roomState, setRoomState] = useState<RoomState>(initialState);
  const [currentTime, setCurrentTime] = useState(0);

  const updateRoomState = useCallback((updater: (prev: RoomState) => RoomState) => {
    setRoomState(updater);
  }, []);

  const setPlaybackTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const togglePlayback = useCallback(() => {
    if (roomState.isPlaying) {
      setRoomState(prev => ({ ...prev, isPlaying: false }));
    } else {
      const now = Date.now() / 1000;
      const newStartTimestamp = now - currentTime;
      setRoomState(prev => ({ 
        ...prev, 
        isPlaying: true, 
        startTimestamp: newStartTimestamp 
      }));
    }
  }, [roomState.isPlaying, currentTime]);

  const removeFromQueue = useCallback((songId: string) => {
    setRoomState(prev => ({
      ...prev,
      queue: prev.queue.filter(s => s.id !== songId)
    }));
  }, []);

  return {
    roomState,
    currentTime,
    updateRoomState,
    setPlaybackTime,
    togglePlayback,
    removeFromQueue,
  };
};