import { useLanguage } from '@/shared/context/LanguageContext';
import { AppLayout } from '@/shared/components/AppLayout/AppLayout';
import { HistoryList } from './components/HistoryList';
import { HistoryFilters } from './components/HistoryFilters';
import { useHistoryFilters } from './hooks/useHistoryFilters';
import { translations } from './translations';

const History = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { activeFilter, setActiveFilter } = useHistoryFilters();

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <HistoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <HistoryList filter={activeFilter} />
      </div>
    </AppLayout>
  );
};

export default History;
