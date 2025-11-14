import { useTheme } from '@/shared/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/shared/context/LanguageContext';
import { translations } from './translations';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 transition-all duration-200"
      aria-label={t.toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="text-sm font-medium">{t[theme]}</span>
    </Button>
  );
};
