import { Button } from '@/components/ui/button';

interface Filter {
  id: string;
  label: string;
}

interface HistoryFiltersProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export const HistoryFilters = ({ filters, activeFilter, onFilterChange }: HistoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="text-base"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
