import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder, CheckCircle2, User, Clock } from 'lucide-react';

interface HistoryItemProps {
  title: string;
  description: string;
  time: string;
  type: 'project' | 'task' | 'user';
  status?: string;
  typeLabel: string;
}

const iconMap = {
  project: Folder,
  task: CheckCircle2,
  user: User,
};

const colorMap = {
  project: 'bg-primary/10 text-primary',
  task: 'bg-success/10 text-success',
  user: 'bg-accent text-accent-foreground',
};

export const HistoryItem = ({ title, description, time, type, status, typeLabel }: HistoryItemProps) => {
  const Icon = iconMap[type];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${colorMap[type]} flex items-center justify-center`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {typeLabel}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap text-sm">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{description}</p>
            {status && (
              <Badge variant="outline" className="mt-2">
                {status}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
