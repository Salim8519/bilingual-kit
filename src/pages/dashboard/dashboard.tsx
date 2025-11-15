import { useLanguage } from '@/shared/context/LanguageContext';
import { AppLayout } from '@/shared/components/AppLayout/AppLayout';
import { StatsGrid } from './components/StatsGrid';
import { RecentActivity } from './components/RecentActivity';
import { translations } from './translations';

// Page Orchestrator: This file only coordinates components, hooks, and context.
// No business logic, UI components, or translations should be defined here.
const Dashboard = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AppLayout>
      <main className="p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </header>

        <section aria-label={language === 'ar' ? 'الإحصائيات' : 'Statistics'}>
          <StatsGrid />
        </section>
        
        <section aria-label={language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}>
          <RecentActivity />
        </section>
      </main>
    </AppLayout>
  );
};

export default Dashboard;
