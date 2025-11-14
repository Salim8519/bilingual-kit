import { useLanguage } from '@/shared/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Folder, CheckCircle2, Clock } from 'lucide-react';
import { translations } from '../translations';
import { getStats } from '../utils/statsData';

export const StatsGrid = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const stats = getStats();

  const cards = [
    { title: t.totalUsers, value: stats.users, icon: Users, trend: '+12%' },
    { title: t.activeProjects, value: stats.projects, icon: Folder, trend: '+8%' },
    { title: t.completedTasks, value: stats.completed, icon: CheckCircle2, trend: '+23%' },
    { title: t.pendingReviews, value: stats.pending, icon: Clock, trend: '-5%' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.trend} {language === 'en' ? 'from last month' : 'من الشهر الماضي'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
