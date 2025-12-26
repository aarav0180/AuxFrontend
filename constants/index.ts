// Application constants
export const APP_VERSION = 'SYS.V.1.0.4 // SECURE';

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 300,
  MEDIUM: 700,
  SLOW: 1000,
  FADE_IN: 1000,
} as const;

// Layout constants
export const LAYOUT = {
  HEADER_HEIGHT: '5rem',
  PLAYER_HEIGHT: '90vh',
  MOBILE_QUEUE_HEIGHT: '75%',
  QR_CODE_SIZE: 48,
  QR_CODE_SIZE_LARGE: 64,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

// Mock data for development
export const MOCK_DATA = {
  CURRENT_USER_ID: 'u1',
  CURRENT_SONG: {
    id: '0',
    title: "Midnight in Tokyo",
    artist: "Neon Syndicate",
    artwork: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    addedBy: { userId: 'u1', username: "Alex_R" },
    duration: 215
  },
  QUEUE: [
    { 
      id: '1', 
      title: "Solar Sailer", 
      artist: "Daft Punk", 
      artwork: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
      addedBy: { userId: 'u2', username: "Sarah.J" },
      duration: 240
    },
    { 
      id: '2', 
      title: "Nightcall", 
      artist: "Kavinsky", 
      artwork: "https://images.unsplash.com/photo-1574169208507-843761948934?q=80&w=200&auto=format&fit=crop",
      addedBy: { userId: 'u3', username: "Guest_99" },
      duration: 258
    },
  ]
} as const;