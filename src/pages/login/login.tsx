import { useLanguage } from '@/shared/context/LanguageContext';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { LoginForm } from './components/LoginForm';
import { translations } from './translations';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="absolute top-4 ltr:right-4 rtl:left-4 z-10 flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
