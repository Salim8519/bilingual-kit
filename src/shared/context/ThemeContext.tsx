import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@/shared/utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with light theme for instant render (ultra-fast)
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme from IndexedDB on mount (blazing fast background load)
  useEffect(() => {
    const loadTheme = async () => {
      const saved = await storage.indexed.get<Theme>('theme');
      const finalTheme = saved || 'light';
      
      setTheme(finalTheme);
      
      // Apply theme to DOM
      if (finalTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      setIsInitialized(true);
    };
    
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Apply theme to DOM immediately (instant visual feedback)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update state
    setTheme(newTheme);
    
    // Persist to IndexedDB in background
    await storage.indexed.set('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
