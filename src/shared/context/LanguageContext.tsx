import React, { createContext, useContext, useState } from 'react';
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
    const saved = storage.local.get<Language>('language');
    const initialLanguage = saved || 'ar';
    
    // Apply language immediately to prevent flicker
    const dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', initialLanguage);
    
    return initialLanguage;
  });

  const setLanguage = (lang: Language) => {
    // Update state immediately (instant visual feedback)
    setLanguageState(lang);
    
    // Apply to DOM
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    
    // Persist to localStorage
    storage.local.set('language', lang);
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
