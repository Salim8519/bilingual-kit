import { useLanguage } from '@/shared/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { translations } from '../translations';

interface HistoryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const HistoryFilters = ({ activeFilter, onFilterChange }: HistoryFiltersProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const filters = [
    { id: 'all', label: t.filterAll },
    { id: 'today', label: t.filterToday },
    { id: 'week', label: t.filterWeek },
    { id: 'month', label: t.filterMonth },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
