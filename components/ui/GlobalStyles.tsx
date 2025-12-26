import React from 'react';

/**
 * Reusable CSS animation definitions
 */
export const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes fade-in-up {
      0% { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes slide-up {
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }
    
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slide-up 0.3s ease-out forwards;
    }
    
    .animation-delay-200 {
      animation-delay: 200ms;
    }
    
    .animation-delay-400 {
      animation-delay: 400ms;
    }
  `}</style>
);