import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, SnackbarType } from './Snackbar';

interface SnackbarMessage {
  id: string;
  message: string;
  type: SnackbarType;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback((message: string, type: SnackbarType) => {
    const id = `snackbar-${Date.now()}-${Math.random()}`;
    setSnackbars(prev => [...prev, { id, message, type }]);
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  }, []);

  const success = useCallback((message: string) => showSnackbar(message, 'success'), [showSnackbar]);
  const error = useCallback((message: string) => showSnackbar(message, 'error'), [showSnackbar]);
  const info = useCallback((message: string) => showSnackbar(message, 'info'), [showSnackbar]);
  const warning = useCallback((message: string) => showSnackbar(message, 'warning'), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, success, error, info, warning }}>
      {children}
      <div className="fixed top-0 right-0 z-[9999] pointer-events-none">
        {snackbars.map((snackbar, index) => (
          <div
            key={snackbar.id}
            className="pointer-events-auto"
            style={{
              transform: `translateY(${index * 80}px)`
            }}
          >
            <Snackbar
              message={snackbar.message}
              type={snackbar.type}
              onClose={() => removeSnackbar(snackbar.id)}
            />
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};
