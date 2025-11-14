import { useLanguage } from '@/shared/context/LanguageContext';
import { LoginForm } from './components/LoginForm';
import { translations } from './translations';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
