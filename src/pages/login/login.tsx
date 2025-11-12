import { useLanguage } from '@/shared/context/LanguageContext';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { translations } from './translations';
import { useLogin } from './hooks/useLogin';
import { LoginForm } from './components/LoginForm';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { email, setEmail, password, setPassword, isLoading, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="absolute top-4 right-4 ltr:right-4 rtl:left-4">
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          translations={t}
        />
      </div>
    </div>
  );
};

export default Login;
