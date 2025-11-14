import { useLanguage } from '@/shared/context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translations } from '../translations';
import { getActivities } from '../utils/activitiesData';

export const RecentActivity = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const activities = getActivities(language);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recentActivity}</CardTitle>
        <CardDescription>{t.activityDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
