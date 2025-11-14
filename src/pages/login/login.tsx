import { useLanguage } from '@/shared/context/LanguageContext';
import { LoginForm } from './components/LoginForm';
import { translations } from './translations';

const Login = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center p-4" role="main">
      <section className="w-full max-w-md" aria-label={language === 'ar' ? 'تسجيل الدخول' : 'Login'}>
        <LoginForm />
      </section>
    </main>
  );
};

export default Login;
