# 🎵 AUX

A modern, real-time collaborative music streaming platform built with React and TypeScript. Listen to music together with friends in synchronized rooms with beautiful UI and seamless playback control.

![AUX](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

---

## ✨ Features

### 🎧 **Collaborative Listening**
- **Real-time Sync**: Listen to music together in perfect synchronization across all users
- **Room-based Sessions**: Create or join rooms with unique room codes
- **DEFAULT Room**: Automatic connection to a global room for instant listening
- **Go to Live**: Smart button to sync back with the room when out of sync (5-second threshold)

### 🎵 **Music Playback**
- **High-Quality Streaming**: Multiple quality options (12kbps - 320kbps)
- **Local Playback Control**: Full control over play/pause/seek without affecting others
- **Auto-advance**: Seamlessly transitions to the next song when one ends
- **Smart Queue Management**: Personal queue with server synchronization
- **Adaptive Quality**: Choose quality based on bandwidth availability

### 🔍 **Music Discovery**
- **Powerful Search**: Search for songs, artists, and albums
- **JioSaavn Integration**: Access to extensive music library
- **Add to Queue**: Easily add songs to the collaborative queue
- **Beautiful Song Cards**: Rich metadata with album art and duration

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Stunning backdrop blur effects and gradients
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Buttery 60fps animations with CSS transitions
- **3D Network Visualization**: Interactive particle network background
- **Themed Components**: Consistent design language throughout

### 🔐 **Security & Privacy**
- **End-to-End Encryption**: AES-256-CBC encryption for all API responses
- **Automatic Decryption**: Transparent decryption using Web Crypto API
- **Secure Key Management**: Environment-based configuration

### 🎛️ **User Experience**
- **Profile Management**: Editable usernames with persistent storage
- **Audio Quality Settings**: Fine-tune streaming quality
- **Status Indicators**: Visual feedback for playback state and connection
- **Smart Notifications**: Context-aware snackbar notifications for user actions
- **Minimal Interruptions**: Only shows relevant notifications (no spam for sync calls)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Backend API** (AUX FastAPI server running on `http://localhost:8000`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AUX.git
   cd AUX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_ENCRYPTION_KEY=AUX2025SecureKey1234567890X
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3** - UI framework with hooks and context
- **TypeScript 5.6** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Key Libraries
- **lucide-react** - Beautiful, consistent icon library
- **Web Crypto API** - Browser-native encryption/decryption

### Architecture
- **React Context** - Global state management (User, Snackbar)
- **Custom Hooks** - Reusable logic encapsulation
- **Component-based** - Modular and maintainable code structure

---

## 📁 Project Structure

```
AUX/
├── src/
│   ├── components/           # React components
│   │   ├── Background.tsx    # Animated background
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Landing page hero
│   │   ├── NetworkScene.tsx  # 3D particle network
│   │   ├── PlayerPage.tsx    # Main player interface
│   │   ├── SearchPage.tsx    # Song search interface
│   │   ├── Settings.tsx      # Quality settings modal
│   │   ├── Profile.tsx       # User profile modal
│   │   ├── player/           # Player sub-components
│   │   │   ├── CurrentSong.tsx
│   │   │   ├── PlayerControls.tsx
│   │   │   └── Queue.tsx
│   │   └── ui/               # UI utilities
│   │       ├── Snackbar.tsx
│   │       ├── SnackbarContainer.tsx
│   │       └── GlobalStyles.tsx
│   ├── context/              # React Context providers
│   │   └── UserContext.tsx   # User state management
│   ├── utils/                # Utility functions
│   │   ├── api.ts            # API client & endpoints
│   │   └── crypto.ts         # Encryption utilities
│   ├── hooks/                # Custom React hooks
│   ├── types.ts              # TypeScript type definitions
│   ├── constants.ts          # App constants
│   ├── App.tsx               # Root component
│   └── main.tsx              # App entry point
├── public/                   # Static assets
├── .env                      # Environment variables (gitignored)
├── .env.example              # Example environment config
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS config
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

---

## 🎮 Usage Guide

### Creating Your First Room

1. **Enter Username**: Provide a display name when prompted
2. **Automatic Room Join**: You'll be connected to the DEFAULT room
3. **Start Listening**: Current song will start playing automatically

### Searching & Adding Songs

1. **Open Search**: Click the search icon in the player
2. **Search for Songs**: Type song name, artist, or album
3. **Add to Queue**: Click "Add to Queue" on any song card
4. **Collaborative Queue**: All users see the updated queue

### Managing Playback

- **Play/Pause**: Control playback independently
- **Seek**: Jump to any position in the song
- **Skip**: Vote to skip current song (collaborative)
- **Quality**: Change streaming quality in Settings

### Staying in Sync

- **Auto-sync**: Automatically syncs every 3 seconds
- **Go to Live**: Click when out of sync (appears after 5+ seconds difference)
- **Local Queue**: Build your own queue without affecting others

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API server URL | `http://localhost:8000` | Yes |
| `VITE_ENCRYPTION_KEY` | AES-256 encryption key (32 chars) | *(see .env.example)* | Yes |

### Audio Quality Options

| Quality | Bitrate | Use Case |
|---------|---------|----------|
| Minimum | 12 kbps | Extremely slow connections |
| Low | 48 kbps | Mobile data / slow networks |
| Standard | 96 kbps | Balanced quality and data |
| Good | 160 kbps | Better audio quality |
| High | 320 kbps | Premium experience |

---

## 🔐 Security

### API Response Encryption

All API responses are encrypted using **AES-256-CBC** encryption:

- **Algorithm**: AES-256-CBC (Advanced Encryption Standard)
- **Key Size**: 256 bits (32 bytes)
- **Block Size**: 128 bits (16 bytes)
- **Padding**: PKCS7
- **Encoding**: Base64

The frontend automatically decrypts responses using the Web Crypto API. See [`https://github.com/aarav0180/AuxBackend/blob/main/decryption.md`](decryption.md) for detailed implementation guide.

### Best Practices

⚠️ **Production Deployment**:
- Store encryption key in secure environment variables
- Never commit `.env` file to version control
- Use HTTPS for all API communications
- Rotate encryption keys periodically

---

## 🎨 UI Components

### Design System

- **Color Palette**: Charcoal base with cyan/purple accents
- **Typography**: Serif headings, sans-serif body
- **Spacing**: 4px base unit (Tailwind spacing scale)
- **Animations**: Smooth 200-300ms transitions
- **Glassmorphism**: `backdrop-blur-xl` with gradient overlays

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 📡 API Integration

### Backend Requirements

Your backend must implement the following endpoints:

- `GET /search/songs` - Search for songs
- `GET /rooms/{room_code}/sync` - Get room sync state
- `POST /rooms/{room_code}/queue` - Add song to queue
- `DELETE /rooms/{room_code}/queue/{queue_id}` - Remove from queue
- `POST /rooms/{room_code}/skip` - Skip current song
- `POST /rooms/{room_code}/join` - Join room
- `POST /rooms/{room_code}/leave` - Leave room

See [`BACKEND_INTEGRATION.md`](BACKEND_INTEGRATION.md) for complete API documentation.

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Development Server

Vite dev server runs on `http://localhost:5173` with:
- ⚡ Hot Module Replacement (HMR)
- 🔥 Fast refresh for React components
- 📦 Optimized dependency pre-bundling

---

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

Output directory: `dist/`

### Deployment Options

**Vercel** (Recommended)
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod --dir=dist
```

**Static Hosting**
- Upload `dist/` folder to any static host
- Configure environment variables in hosting platform
- Ensure SPA routing is configured (redirect all routes to `index.html`)

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Songs not playing
- ✅ Check backend API is running on configured URL
- ✅ Verify encryption key matches backend configuration
- ✅ Check browser console for network errors

**Issue**: Out of sync with room
- ✅ Click "Go to Live" button to resync
- ✅ Check network latency
- ✅ Verify sync interval (3 seconds)

**Issue**: Quality change not working
- ✅ Song must have multiple quality URLs from API
- ✅ Check `downloadUrls` array in API response
- ✅ Playback position is maintained during quality switch

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow existing component structure
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **JioSaavn** - Music streaming API
- **Tailwind CSS** - Amazing utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **React Team** - Incredible framework and community

---

## 📞 Support

- 📧 Email: support@AUX.app
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/AUX/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/AUX/discussions)

---

<div align="center">

**Built with ❤️ by the AUX Team**

⭐ Star us on GitHub — it helps!

[Website](https://AUX.app) • [Documentation](https://docs.AUX.app) • [Demo](https://demo.AUX.app)

</div>
