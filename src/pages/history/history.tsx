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
      <main className="p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </header>

        <section aria-label={language === 'ar' ? 'تصفية السجل' : 'History Filters'}>
          <HistoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </section>
        
        <section aria-label={language === 'ar' ? 'قائمة السجل' : 'History List'}>
          <HistoryList filter={activeFilter} />
        </section>
      </main>
    </AppLayout>
  );
};

export default History;
