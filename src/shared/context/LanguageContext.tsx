import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@/shared/utils/storage';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with localStorage for INSTANT zero-flicker render
  const [language, setLanguageState] = useState<Language>(() => {
    const cached = localStorage.getItem('language');
    const initialLanguage = (cached === 'ar' || cached === 'en') ? cached : 'ar';
    
    // Apply language immediately to prevent flicker
    const dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', initialLanguage);
    
    return initialLanguage;
  });

  // Sync with IndexedDB in background (persistent storage)
  useEffect(() => {
    const syncLanguage = async () => {
      const saved = await storage.indexed.get<Language>('language');
      
      // If IndexedDB has a value different from localStorage, use it
      if (saved && saved !== language) {
        setLanguageState(saved);
        localStorage.setItem('language', saved);
        
        const dir = saved === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', saved);
      }
    };
    
    syncLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    // Update state immediately (instant visual feedback)
    setLanguageState(lang);
    
    // Apply to DOM
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    
    // Persist to both storages (localStorage for instant load, IndexedDB for reliability)
    localStorage.setItem('language', lang);
    await storage.indexed.set('language', lang);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
