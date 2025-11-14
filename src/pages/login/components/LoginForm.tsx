import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/shared/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { useLoginForm } from '../hooks/useLoginForm';
import { translations } from '../translations';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const { email, setEmail, password, setPassword, handleSubmit } = useLoginForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    navigate('/dashboard');
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-4">
        <div className="flex justify-end gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <CardTitle className="text-2xl text-center">{t.title}</CardTitle>
        <CardDescription className="text-center">{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t.email}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              {t.password}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full h-11">
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
