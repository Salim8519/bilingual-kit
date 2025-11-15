import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@/shared/utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with localStorage for INSTANT zero-flicker render
  const [theme, setTheme] = useState<Theme>(() => {
    const cached = localStorage.getItem('theme');
    const initialTheme = (cached === 'dark' || cached === 'light') ? cached : 'light';
    
    // Apply theme immediately to prevent flicker
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return initialTheme;
  });

  // Sync with IndexedDB in background (persistent storage)
  useEffect(() => {
    const syncTheme = async () => {
      const saved = await storage.indexed.get<Theme>('theme');
      
      // If IndexedDB has a value different from localStorage, use it
      if (saved && saved !== theme) {
        setTheme(saved);
        localStorage.setItem('theme', saved);
        
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    syncTheme();
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
    
    // Persist to both storages (localStorage for instant load, IndexedDB for reliability)
    localStorage.setItem('theme', newTheme);
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
