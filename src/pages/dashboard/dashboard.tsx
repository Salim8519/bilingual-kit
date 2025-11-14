import { useLanguage } from '@/shared/context/LanguageContext';
import { translations } from './translations';
import { StatCard } from './components/StatCard';
import { ActivityCard } from './components/ActivityCard';
import { getDashboardStats, getRecentActivities } from './utils/dashboardData';
import { Users, Folder, CheckCircle2, Clock } from 'lucide-react';

const Dashboard = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const stats = getDashboardStats(language);
  const activities = getRecentActivities(language);

  const statCards = [
    { title: t.totalUsers, icon: Users, ...stats[0] },
    { title: t.activeProjects, icon: Folder, ...stats[1] },
    { title: t.completedTasks, icon: CheckCircle2, ...stats[2] },
    { title: t.pendingReviews, icon: Clock, ...stats[3] },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.welcome}</h1>
          <p className="text-muted-foreground text-lg">{t.overview}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ActivityCard
            title={t.recentActivity}
            activities={activities}
            viewDetailsLabel={t.viewDetails}
          />
          <ActivityCard
            title={t.quickActions}
            activities={activities}
            viewDetailsLabel={t.viewDetails}
          />
        </div>
      </div>
  );
};

export default Dashboard;
