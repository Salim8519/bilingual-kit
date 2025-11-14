import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/shared/context/LanguageContext';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { GitHubSection } from './components/GitHubSection';
import { useAuthRedirect } from './hooks/useAuthRedirect';
import { translations } from './translations';

const GITHUB_REPO_URL = 'https://github.com/Salim8519/bilingual-kit';

export default function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  
  useAuthRedirect();

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background" 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-4 ltr:right-4 rtl:left-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <HeroSection
            welcome={t.welcome}
            appName={t.appName}
            description={t.description}
            getStarted={t.getStarted}
            onGetStarted={() => navigate('/login')}
          />

          <FeaturesSection
            title={t.features}
            features={[t.feature1, t.feature2, t.feature3, t.feature4]}
          />

          <GitHubSection
            title={t.getTheCode}
            description={t.repoDescription}
            cloneText={t.cloneRepo}
            forkText={t.forkRepo}
            downloadText={t.downloadZip}
            viewButtonText={t.viewOnGitHub}
            madeByText={t.madeBy}
            developerName={t.developer}
            repoUrl={GITHUB_REPO_URL}
          />
        </div>
      </div>
    </div>
  );
}
