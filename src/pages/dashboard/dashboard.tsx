import { useLanguage } from '@/shared/context/LanguageContext';
import { AppLayout } from '@/shared/components/AppLayout/AppLayout';
import { StatsGrid } from './components/StatsGrid';
import { RecentActivity } from './components/RecentActivity';
import { translations } from './translations';

const Dashboard = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <StatsGrid />
        <RecentActivity />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
