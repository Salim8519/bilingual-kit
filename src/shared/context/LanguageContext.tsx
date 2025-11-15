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
  // Initialize with Arabic for instant render (ultra-fast)
  const [language, setLanguageState] = useState<Language>('ar');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved language from IndexedDB on mount (blazing fast background load)
  useEffect(() => {
    const loadLanguage = async () => {
      const saved = await storage.indexed.get<Language>('language');
      const finalLanguage = saved || 'ar';
      
      setLanguageState(finalLanguage);
      
      // Apply language to DOM
      const dir = finalLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', finalLanguage);
      
      setIsInitialized(true);
    };
    
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    // Update state immediately (instant visual feedback)
    setLanguageState(lang);
    
    // Apply to DOM
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    
    // Persist to IndexedDB in background
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
