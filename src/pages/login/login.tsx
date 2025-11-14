import { useLanguage } from '@/shared/context/LanguageContext';
import { LoginForm } from './components/LoginForm';
import { translations } from './translations';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
