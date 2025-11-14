import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/shared/context/LanguageContext';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ArrowRight, Github, GitFork, Download, ExternalLink } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const translations = {
    en: {
      welcome: 'Welcome to',
      appName: 'Bilingual Web App Template',
      description: 'A professional, mobile-friendly template with Arabic and English support',
      getStarted: 'Get Started',
      features: 'Features',
      feature1: 'Full RTL Support',
      feature2: 'Mobile Responsive',
      feature3: 'Senior Accessible',
      feature4: 'Clean Architecture',
      getTheCode: 'Get the Code',
      repoDescription: 'This template is open source and available on GitHub. You can:',
      cloneRepo: 'Clone the repository',
      forkRepo: 'Fork it to your account',
      downloadZip: 'Download as ZIP',
      viewOnGitHub: 'View on GitHub',
      madeBy: 'Made by',
      developer: 'Salim Al Senani',
    },
    ar: {
      welcome: 'مرحباً بك في',
      appName: 'قالب تطبيق الويب ثنائي اللغة',
      description: 'قالب احترافي متوافق مع الهواتف المحمولة بدعم اللغة العربية والإنجليزية',
      getStarted: 'ابدأ الآن',
      features: 'المميزات',
      feature1: 'دعم كامل للعربية',
      feature2: 'متوافق مع الأجهزة المحمولة',
      feature3: 'سهل الاستخدام لكبار السن',
      feature4: 'بنية برمجية نظيفة',
      getTheCode: 'احصل على الكود',
      repoDescription: 'هذا القالب مفتوح المصدر ومتاح على GitHub. يمكنك:',
      cloneRepo: 'استنساخ المستودع',
      forkRepo: 'عمل نسخة لحسابك',
      downloadZip: 'تحميل كملف ZIP',
      viewOnGitHub: 'عرض على GitHub',
      madeBy: 'صنع بواسطة',
      developer: 'سالم السناني',
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 ltr:right-4 rtl:left-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-2">{t.welcome}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t.appName}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          <Button size="lg" onClick={() => navigate('/login')} className="h-12 px-8 text-lg gap-2">
            {t.getStarted}
            <ArrowRight className="h-5 w-5" />
          </Button>

          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">{t.features}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[t.feature1, t.feature2, t.feature3, t.feature4].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground">{feature}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Repository Section */}
          <div className="mt-20 p-8 bg-card border-2 border-primary/20 rounded-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Github className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t.getTheCode}</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              {t.repoDescription}
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-muted/50 rounded-lg">
                <Github className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-sm">{t.cloneRepo}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <GitFork className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-sm">{t.forkRepo}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <Download className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-sm">{t.downloadZip}</p>
              </div>
            </div>

            <Button 
              size="lg" 
              variant="outline"
              className="h-12 px-8 text-lg gap-2 border-primary/50 hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('https://github.com/Salim8519/bilingual-kit', '_blank')}
            >
              <Github className="h-5 w-5" />
              {t.viewOnGitHub}
              <ExternalLink className="h-4 w-4" />
            </Button>

            {/* Credit */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm">
                {t.madeBy} <span className="font-semibold text-foreground">{t.developer}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
