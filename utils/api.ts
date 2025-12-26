// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

import { handleEncryptedResponse } from './crypto';

// API Endpoints
export const ENDPOINTS = {
  // Search
  SEARCH_SONGS: '/search/songs',
  SONG_DETAILS: (songId: string) => `/search/songs/${songId}`,
  SONG_SUGGESTIONS: (songId: string) => `/search/songs/${songId}/suggestions`,
  
  // Room Management
  ROOMS: '/rooms',
  ROOM_STATE: (roomCode: string) => `/rooms/${roomCode}`,
  DELETE_ROOM: (roomCode: string) => `/rooms/${roomCode}`,
  
  // Queue
  ADD_TO_QUEUE: (roomCode: string) => `/rooms/${roomCode}/queue`,
  REMOVE_FROM_QUEUE: (roomCode: string, queueId: string) => `/rooms/${roomCode}/queue/${queueId}`,
  
  // Playback
  SYNC_STATE: (roomCode: string) => `/rooms/${roomCode}/sync`,
  SKIP: (roomCode: string) => `/rooms/${roomCode}/skip`,
  PAUSE: (roomCode: string) => `/rooms/${roomCode}/pause`,
  ROOM_SUGGESTIONS: (roomCode: string) => `/rooms/${roomCode}/suggestions`,
  
  // Member
  JOIN_ROOM: (roomCode: string) => `/rooms/${roomCode}/join`,
  LEAVE_ROOM: (roomCode: string) => `/rooms/${roomCode}/leave`,
  
  // Stream
  STREAM_INFO: (roomCode: string) => `/rooms/${roomCode}/stream`,
} as const;

// Request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  const data = await response.json();
  
  // Decrypt if response is encrypted
  return await handleEncryptedResponse(data);
}

// Search API
export const searchSongs = async (query: string, limit: number = 10) => {
  return apiRequest<any>(`${ENDPOINTS.SEARCH_SONGS}?query=${encodeURIComponent(query)}&limit=${limit}`);
};

export const getSongDetails = async (songId: string) => {
  return apiRequest<any>(ENDPOINTS.SONG_DETAILS(songId));
};

export const getSongSuggestions = async (songId: string, limit: number = 10) => {
  return apiRequest<any>(`${ENDPOINTS.SONG_SUGGESTIONS(songId)}?limit=${limit}`);
};

// Room API
export const createRoom = async (userId: string, username: string) => {
  return apiRequest<any>(ENDPOINTS.ROOMS, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, username }),
  });
};

export const getRoomState = async (roomCode: string) => {
  return apiRequest<any>(ENDPOINTS.ROOM_STATE(roomCode));
};

export const deleteRoom = async (roomCode: string) => {
  return apiRequest<any>(ENDPOINTS.DELETE_ROOM(roomCode), {
    method: 'DELETE',
  });
};

// Queue API
export const addToQueue = async (
  roomCode: string,
  jiosaavnSongId: string,
  userId: string,
  username: string
) => {
  return apiRequest<any>(ENDPOINTS.ADD_TO_QUEUE(roomCode), {
    method: 'POST',
    body: JSON.stringify({
      jiosaavn_song_id: jiosaavnSongId,
      user_id: userId,
      username,
    }),
  });
};

export const removeFromQueue = async (
  roomCode: string,
  queueId: string,
  requestingUserId: string
) => {
  return apiRequest<any>(
    `${ENDPOINTS.REMOVE_FROM_QUEUE(roomCode, queueId)}?requesting_user_id=${requestingUserId}`,
    { method: 'DELETE' }
  );
};

// Playback API
export const getSyncState = async (roomCode: string) => {
  return apiRequest<any>(ENDPOINTS.SYNC_STATE(roomCode));
};

export const skipSong = async (roomCode: string, requestingUserId: string) => {
  return apiRequest<any>(`${ENDPOINTS.SKIP(roomCode)}?requesting_user_id=${requestingUserId}`, {
    method: 'POST',
  });
};

export const togglePause = async (roomCode: string, requestingUserId: string) => {
  return apiRequest<any>(`${ENDPOINTS.PAUSE(roomCode)}?requesting_user_id=${requestingUserId}`, {
    method: 'POST',
  });
};

export const getRoomSuggestions = async (roomCode: string, limit: number = 10) => {
  return apiRequest<any>(`${ENDPOINTS.ROOM_SUGGESTIONS(roomCode)}?limit=${limit}`);
};

// Member API
export const joinRoom = async (roomCode: string, userId: string, username: string) => {
  return apiRequest<any>(`${ENDPOINTS.JOIN_ROOM(roomCode)}?user_id=${userId}&username=${encodeURIComponent(username)}`, {
    method: 'POST',
  });
};

export const leaveRoom = async (roomCode: string, userId: string) => {
  return apiRequest<any>(`${ENDPOINTS.LEAVE_ROOM(roomCode)}?user_id=${userId}`, {
    method: 'POST',
  });
};

// Stream API
export const getStreamInfo = async (roomCode: string) => {
  return apiRequest<any>(ENDPOINTS.STREAM_INFO(roomCode));
};