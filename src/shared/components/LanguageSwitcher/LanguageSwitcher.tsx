import { useLanguage } from '@/shared/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { translations } from './translations';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      aria-label={t.switchLanguage}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};
