import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
}

interface ActivityCardProps {
  title: string;
  activities: Activity[];
  viewDetailsLabel: string;
}

export const ActivityCard = ({ title, activities, viewDetailsLabel }: ActivityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ltr:ml-4 rtl:mr-4">
                {activity.time}
              </span>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            {viewDetailsLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
