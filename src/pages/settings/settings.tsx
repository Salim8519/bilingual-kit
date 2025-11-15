import { AppLayout } from '@/shared/components/AppLayout/AppLayout';
import { useLanguage } from '@/shared/context/LanguageContext';
import { translations } from './translations';
import { SettingCard } from './components/SettingCard';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { Palette, Globe, Info, Settings as SettingsIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Page Orchestrator: This file only coordinates components, hooks, and context.
// No business logic, UI components, or translations should be defined here.
export default function Settings() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AppLayout>
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/70" aria-hidden="true">
              <SettingsIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-muted-foreground text-lg">{t.subtitle}</p>
            </div>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Settings Cards */}
        <section className="space-y-6" aria-label={language === 'ar' ? 'الإعدادات' : 'Settings'}>
          {/* Appearance Section */}
          <article aria-labelledby="appearance-heading">
            <SettingCard
              title={t.appearance}
              description={t.appearanceDesc}
              icon={Palette}
            >
              <div className="space-y-6">
                {/* Language Setting */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium">{t.language}</p>
                    <p className="text-sm text-muted-foreground">{t.languageDesc}</p>
                  </div>
                  <LanguageSwitcher />
                </div>

                {/* Theme Setting */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium">{t.theme}</p>
                    <p className="text-sm text-muted-foreground">{t.themeDesc}</p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </SettingCard>
          </article>

          {/* About Section */}
          <article aria-labelledby="about-heading">
            <SettingCard
              title={t.about}
              description={t.aboutDesc}
              icon={Info}
            >
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
                    <h3 className="font-semibold text-lg">{t.appName}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      {t.version}: <span className="font-mono font-medium">1.0.0</span>
                    </p>
                  </div>
                </div>
              </div>
            </SettingCard>
          </article>
        </section>
      </main>
    </AppLayout>
  );
}
