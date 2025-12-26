import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { QrCode, Plus } from 'lucide-react';
import { CurrentSong } from './player/CurrentSong';
import { PlayerControls } from './player/PlayerControls';
import { Queue } from './player/Queue';
import { SearchPage } from './SearchPage';
import { NetworkScene } from './NetworkScene';
import { RoomState, Song } from '../types';
import { useUser } from '../context/UserContext';
import { useSnackbar } from './ui/SnackbarContainer';
import { getSyncState, removeFromQueue as apiRemoveFromQueue, skipSong, togglePause as apiTogglePause } from '../utils/api';

interface PlayerPageProps {
  streamQuality: string;
  onMemberCountChange?: (count: number) => void;
}

export const PlayerPage: React.FC<PlayerPageProps> = ({ streamQuality, onMemberCountChange }) => {
  const { userId, username, roomCode, isHost, setRoomCode } = useUser();
  const { success, error, info } = useSnackbar();
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPerformedInitialSeek = useRef(false);
  
  const [roomState, setRoomState] = useState<RoomState>({
    currentSongId: null,
    startTimestamp: null,
    isPlaying: false,
    queue: []
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [serverCurrentSong, setServerCurrentSong] = useState<Song | null>(null);
  const [localQueue, setLocalQueue] = useState<Song[]>([]); // Start empty
  const [showMobileQueue, setShowMobileQueue] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isPlayingLocally, setIsPlayingLocally] = useState(true);
  const [serverSongId, setServerSongId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [serverSyncTime, setServerSyncTime] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  // Join DEFAULT room on mount
  useEffect(() => {
    if (!roomCode) {
      setRoomCode('DEFAULT');
    }
  }, [roomCode, setRoomCode]);

  // Join DEFAULT room on mount
  useEffect(() => {
    if (!roomCode) {
      setRoomCode('DEFAULT');
    }
  }, [roomCode, setRoomCode]);

  // Reset initial seek flag when unmounting (navigating away)
  useEffect(() => {
    return () => {
      hasPerformedInitialSeek.current = false;
    };
  }, []);

  // Sync with backend every 3 seconds
  useEffect(() => {
    if (!roomCode) return;

    const syncWithBackend = async () => {
      try {
        const data = await getSyncState(roomCode);
        
        if (data.current_song) {
          const song: Song = {
            id: data.current_song.id,
            title: data.current_song.name,
            artist: data.current_song.artists,
            artwork: data.current_song.thumbnails?.find((t: any) => t.quality === '500x500')?.url || data.current_song.image_url,
            addedBy: {
              userId: data.current_song.added_by_user_id,
              username: data.current_song.added_by_username
            },
            duration: data.current_song.duration,
            downloadUrl: data.current_song.download_url,
            downloadUrls: data.current_song.download_urls
          };
          
          // Store what the server is playing
          setServerCurrentSong(song);
          setServerSyncTime(data.seek_position_seconds || 0);
          setServerSongId(song.id);
          const newMemberCount = data.member_count || 0;
          setMemberCount(newMemberCount);
          if (onMemberCountChange) {
            onMemberCountChange(newMemberCount);
          }
          
          // Store server queue
          const serverQueue = data.next_songs?.map((s: any) => ({
            id: s.id,
            title: s.name,
            artist: s.artists,
            artwork: s.thumbnails?.find((t: any) => t.quality === '150x150')?.url || s.image_url,
            addedBy: {
              userId: s.added_by_user_id,
              username: s.added_by_username
            },
            duration: s.duration,
            downloadUrl: s.download_url,
            downloadUrls: s.download_urls
          })) || [];
          
          // Only set local song and queue on initial load
          if (!hasPerformedInitialSeek.current) {
            setCurrentSong(song);
            setCurrentTime(data.seek_position_seconds || 0);
            setLocalQueue(serverQueue); // Initialize with server queue
            setIsLive(true);
            hasPerformedInitialSeek.current = true;
          } else {
            // Always update localQueue
            if (isLive) {
              // Live mode - replace entire localQueue with server queue
              setLocalQueue(serverQueue);
            } else {
              // Local mode - append only NEW songs to existing localQueue
              const existingIds = new Set(localQueue.map(s => s.id));
              const newSongs = serverQueue.filter(s => !existingIds.has(s.id));
              if (newSongs.length > 0) {
                setLocalQueue(prev => [...prev, ...newSongs]);
              }
            }
          }
          
          // Always update server queue fully
          setRoomState({
            currentSongId: song.id,
            startTimestamp: new Date(data.song_start_time).getTime() / 1000,
            isPlaying: !data.is_paused,
            queue: serverQueue
          });
        } else {
          setCurrentSong(null);
          setRoomState(prev => ({ ...prev, queue: [] }));
        }
      } catch (err: any) {
        console.error('Failed to sync with backend:', err);
        error('Failed to sync with room');
      }
    };

    syncWithBackend();
    const interval = setInterval(syncWithBackend, 3000);
    return () => clearInterval(interval);
  }, [roomCode]);

  // Local time tracking from audio element
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      // CASE 7: Live mode - continue with server queue
      if (isLive && roomState.queue.length > 0) {
        const nextSong = roomState.queue[0];
        setCurrentSong(nextSong);
        setCurrentTime(0);
        // Don't update roomState.queue - let sync API handle it
        // Keep localQueue = [] (empty)
        // Stay isLive = true
        return;
      }
      
      // CASE 8: Local mode with queue - continue with local queue
      if (!isLive && localQueue.length > 0) {
        const nextSong = localQueue[0];
        setCurrentSong(nextSong);
        setCurrentTime(0);
        setLocalQueue(prev => prev.slice(1));
        // Stay isLive = false
        return;
      }
      
      // CASE 9: Local mode, empty queue - return to live mode
      if (!isLive && localQueue.length === 0) {
        // Return to live by syncing with server state
        if (serverCurrentSong) {
          setIsLive(true);
          setCurrentSong(serverCurrentSong);
          setCurrentTime(serverSyncTime);
          setLocalQueue([]); // Clear local queue
          if (audioRef.current) {
            audioRef.current.currentTime = serverSyncTime;
          }
        }
        return;
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, audioRef.current, localQueue, isLive, roomState.queue, serverCurrentSong, serverSyncTime]);

  const handlePlayPause = async () => {
    // Local play/pause control
    setIsPlayingLocally(!isPlayingLocally);
    
    // Also notify server if user is host
    if (roomCode && isHost) {
      try {
        // Sync pause state with server
      } catch (err: any) {
        console.error('Failed to toggle pause on server:', err);
        error('Failed to sync playback state');
      }
    }
  };

  const handleSkip = async () => {
    if (!roomCode) return;
    
    // CASE 4: Already in local mode with queue
    if (!isLive && localQueue.length > 0) {
      const nextSong = localQueue[0];
      setCurrentSong(nextSong);
      setCurrentTime(0);
      setLocalQueue(prev => prev.slice(1));
      // Stay isLive = false
      return;
    }
    
    // CASE 5: In local mode but queue empty
    if (!isLive && localQueue.length === 0) {
      info('Song not loaded till now, please wait for everyone to finish listening to previous songs');
      return;
    }
    
    // CASE 3: In live mode - create local queue from server
    if (isLive && roomState.queue.length > 0) {
      const nextSong = roomState.queue[0];
      const remainingQueue = roomState.queue.slice(1);
      setCurrentSong(nextSong);
      setCurrentTime(0);
      setLocalQueue(remainingQueue); // Take snapshot of server queue
      setIsLive(false); // Enter local mode
      return;
    }
    
    // No queue available - use server voting
    try {
      const response = await skipSong(roomCode, userId);
      if (response.message) {
        info(response.message);
      }
    } catch (err: any) {
      console.error('Failed to skip song:', err);
      error(err.response?.data?.detail || 'Failed to skip song');
    }
  };

  const handleRemoveFromQueue = async (songId: string) => {
    if (!roomCode) return;
    
    try {
      const response = await apiRemoveFromQueue(roomCode, songId, userId);
      if (response.message) {
        success(response.message);
      }
    } catch (err: any) {
      console.error('Failed to remove from queue:', err);
      error(err.response?.data?.detail || 'Failed to remove song from queue');
    }
  };

  // Audio playback management
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    // Get the appropriate stream URL based on quality
    let streamUrl = currentSong.downloadUrl;
    if (currentSong.downloadUrls && currentSong.downloadUrls.length > 0) {
      const qualityUrl = currentSong.downloadUrls.find(u => u.quality === streamQuality);
      if (qualityUrl) {
        streamUrl = qualityUrl.url;
      }
    }

    const audio = audioRef.current;
    
    // Only update src if it's actually different (new song or quality change)
    if (streamUrl && audio.src !== streamUrl) {
      const previousTime = audio.currentTime;
      audio.src = streamUrl;
      
      // Only set initial seek time if this is the very first load
      if (!hasPerformedInitialSeek.current) {
        audio.currentTime = currentTime;
        hasPerformedInitialSeek.current = true;
      } else {
        // If quality changed, maintain the current playback position
        audio.currentTime = previousTime || currentTime;
      }
      
      if (roomState.isPlaying || isPlayingLocally) {
        audio.play().catch(err => {
          error('Failed to play audio');
        });
      }
    }
  }, [currentSong?.id, streamQuality, error]); // Only depend on song ID, not entire object

  // Sync audio playback with local state
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlayingLocally) {
      audioRef.current.play().catch((err) => {
        console.error('Play error:', err);
        error('Playback failed');
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingLocally, error]);
  
  // Sync local state with server state when song changes
  useEffect(() => {
    if (currentSong?.id === serverSongId) {
      setIsPlayingLocally(roomState.isPlaying);
    }
  }, [roomState.isPlaying, currentSong, serverSongId]);

  // Sync audio currentTime with state only when changed by user or go-to-live
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    // Only sync if the difference is significant (manual seek or go-to-live action)
    const timeDiff = Math.abs(audioRef.current.currentTime - currentTime);
    if (timeDiff > 0.5) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime, currentSong]);

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    // When seeking, if we were in live mode, take snapshot of server queue
    if (isLive) {
      setLocalQueue(roomState.queue);
    }
    setIsLive(false); // User has seeked away from live
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleGoToLive = () => {
    if (!serverCurrentSong) return;
    
    setIsLive(true);
    setCurrentSong(serverCurrentSong);
    setCurrentTime(serverSyncTime);
    setLocalQueue([]); // Clear local queue, return to live mode
    
    if (audioRef.current) {
      audioRef.current.currentTime = serverSyncTime;
    }
  };

  const progress = currentSong ? (currentTime / currentSong.duration) * 100 : 0;
  
  // Show live button if out of sync
  const timeDiff = Math.abs(currentTime - serverSyncTime);
  const songsDifferent = currentSong?.id !== serverCurrentSong?.id;
  const playbackStateDifferent = isPlayingLocally !== roomState.isPlaying;
  const timeOutOfSync = (!isLive && timeDiff > 7) || (playbackStateDifferent && timeDiff > 5);
  const isOutOfSync = songsDifferent || timeOutOfSync;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
      
      {showSearch && <SearchPage onClose={() => setShowSearch(false)} />}
      
      <div className="relative w-full h-full max-h-full flex overflow-hidden">
        {/* WebGL Network Animation Layer */}
        <div className="absolute inset-0 z-0 bg-charcoal">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={['#121212']} />
            <Suspense fallback={null}>
              <NetworkScene />
            </Suspense>
            <fog attach="fog" args={['#121212', 5, 20]} />
          </Canvas>
          {/* Lighter vignette to let animation show through */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#121212_100%)] opacity-40"></div>
        </div>
        
        {/* Blurred Album Art Overlay - More transparent */}
        <div className="absolute inset-0 z-[1]">
          {currentSong && (
            <img 
              src={currentSong.artwork} 
              alt="Background" 
              className="w-full h-full object-cover blur-[80px] brightness-[0.15] opacity-60 scale-110 transition-all duration-1000" 
            />
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Main Layout Grid */}
        <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 pt-16 pb-4 lg:pt-20 lg:pb-8 px-4 lg:px-12">
          
          {/* Zone 1: Now Playing (Central Focus) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center h-full min-h-0">
            <div className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow">
              <CurrentSong song={currentSong} />
              
              <PlayerControls 
                isPlaying={isPlayingLocally}
                onPlayPause={handlePlayPause}
                onSkip={handleSkip}
                progress={progress}
                currentTime={currentTime}
                duration={currentSong?.duration || 0}
                onToggleQueue={() => setShowMobileQueue(!showMobileQueue)}
                showQueueButton={true}
                onSeek={handleSeek}
                isOutOfSync={isOutOfSync}
                onGoToLive={handleGoToLive}
              />
            </div>
          </div>

          {/* Zone 2: Queue & Connection Panel */}
          <div className="hidden lg:flex lg:col-span-4 h-full flex-col overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/5">
             <div className="flex-grow overflow-hidden">
               <Queue 
                 queue={!isLive ? localQueue : roomState.queue}
                 currentUserId={userId}
                 onRemove={handleRemoveFromQueue}
                 onAddSongs={() => setShowSearch(true)}
               />
             </div>
             
             {/* Connection Portal */}
             {/* <div className="p-4 border-t border-white/10 bg-gradient-to-b from-transparent to-black/40">
              <div className="flex items-center gap-4 mb-3">
                 <div className="bg-white p-2 rounded-lg shadow-[0_0_25px_rgba(0,255,255,0.15)]">
                   <QrCode size={48} className="text-charcoal" />
                 </div>
                 <div className="space-y-1">
                   <p className="font-serif text-base text-white">Join the Vibe</p>
                   <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-[120px]">
                     Scan to add songs & control the room.
                   </p>
                 </div>
              </div>
              {/* {roomCode && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg text-center">
                  <p className="text-xs text-white/40 mb-1">Room Code</p>
                  <p className="font-mono text-lg text-cyan-400 font-bold">{roomCode}</p>
                </div>
              )} */}
            {/* </div>  */}
          </div>

          {/* Mobile Queue Overlay */}
          {showMobileQueue && (
            <div 
              className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in" 
              onClick={() => setShowMobileQueue(false)}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-3/4 bg-charcoal rounded-t-2xl transform transition-transform duration-300 ease-out animate-slide-up" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-xl text-white">Queue</h3>
                    <button 
                      onClick={() => setShowMobileQueue(false)} 
                      className="text-white/60 hover:text-white transition-colors"
                      type="button"
                      aria-label="Close queue"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              <div className="h-full overflow-hidden pb-16">
                <Queue 
                  queue={!isLive ? localQueue : roomState.queue}
                  currentUserId={userId}
                  onRemove={handleRemoveFromQueue}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};