import React, { useState } from 'react';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import { HeroProps } from '../types';
import { useUser } from '../context/UserContext';
import { joinRoom } from '../utils/api';
import { UsernamePrompt } from './UsernamePrompt';

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const { userId, username, setUsername, setRoomCode } = useUser();

  const handleEnter = async () => {
    if (!username) {
      setShowUsernamePrompt(true);
      return;
    }
    await joinDefaultRoom();
  };

  const handleUsernameSubmit = async (enteredUsername: string) => {
    setUsername(enteredUsername);
    setShowUsernamePrompt(false);
    await joinDefaultRoom();
  };

  const joinDefaultRoom = async () => {
    setLoading(true);
    try {
      await joinRoom('DEFAULT', username, userId);
      setRoomCode('DEFAULT');
      onEnter();
    } catch (error) {
      console.error('Failed to join room:', error);
      alert('Failed to join room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showUsernamePrompt && (
        <UsernamePrompt
          onSubmit={handleUsernameSubmit}
        />
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
      
      {/* Main Headline */}
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight mb-6 leading-[1.1] animate-fade-in-up">
        The Infinite <br />
        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Shared Stream
        </span>
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-gray-400 text-sm md:text-base tracking-[0.2em] uppercase mb-12 max-w-md animate-fade-in-up animation-delay-200">
        Music without boundaries. Collective listening.
      </p>

      {/* Glass Button CTA */}
      <button
        onClick={handleEnter}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={loading}
        className={`
          pointer-events-auto
          group relative px-8 py-4 
          bg-white/5 backdrop-blur-md 
          border border-white/10 
          rounded-full 
          transition-all duration-500 ease-out
          hover:bg-white/10 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-3
          animate-fade-in-up animation-delay-400
        `}
      >
        <span className="font-sans text-sm font-medium tracking-widest text-white uppercase group-hover:text-cyan-50 transition-colors">
          {loading ? 'Creating Room...' : 'Enter the Stream'}
        </span>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          bg-white/10 border border-white/10
          transition-all duration-500
          ${isHovered && !loading ? 'rotate-90 bg-cyan-400/20 border-cyan-400/50' : ''}
        `}>
           {loading ? (
             <Loader2 size={14} className="text-white animate-spin" />
           ) : isHovered ? (
             <Play size={12} className="text-cyan-300 ml-0.5" fill="currentColor" />
           ) : (
             <ArrowRight size={14} className="text-white" />
           )}
        </div>
      </button>

      {/* Decorative Line */}
      <div className="absolute bottom-32 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse-slow"></div>
      </div>
    </>
  );
};
