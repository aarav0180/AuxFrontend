import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userId: string;
  username: string | null;
  roomCode: string | null;
  isHost: boolean;
  setUsername: (name: string) => void;
  setRoomCode: (code: string) => void;
  setIsHost: (isHost: boolean) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Generate unique user ID
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId] = useState<string>(() => {
    // Check if userId exists in localStorage
    const stored = localStorage.getItem('aux_user_id');
    if (stored) return stored;
    
    // Generate and store new userId
    const newId = generateUserId();
    localStorage.setItem('aux_user_id', newId);
    return newId;
  });

  const [username, setUsernameState] = useState<string | null>(() => {
    return localStorage.getItem('aux_username');
  });

  const [roomCode, setRoomCodeState] = useState<string | null>(() => {
    return localStorage.getItem('aux_room_code');
  });

  const [isHost, setIsHostState] = useState<boolean>(() => {
    return localStorage.getItem('aux_is_host') === 'true';
  });

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem('aux_username', name);
  };

  const setRoomCode = (code: string) => {
    setRoomCodeState(code);
    localStorage.setItem('aux_room_code', code);
  };

  const setIsHost = (host: boolean) => {
    setIsHostState(host);
    localStorage.setItem('aux_is_host', String(host));
  };

  const clearUser = () => {
    setRoomCodeState(null);
    setIsHostState(false);
    localStorage.removeItem('aux_room_code');
    localStorage.removeItem('aux_is_host');
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        username,
        roomCode,
        isHost,
        setUsername,
        setRoomCode,
        setIsHost,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};