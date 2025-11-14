import { useLanguage } from '@/shared/context/LanguageContext';
import { Card } from '@/components/ui/card';
import { getHistoryItems } from '../utils/historyData';

interface HistoryListProps {
  filter: string;
}

export const HistoryList = ({ filter }: HistoryListProps) => {
  const { language } = useLanguage();
  const items = getHistoryItems(language, filter);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">{item.type}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{item.timestamp}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
