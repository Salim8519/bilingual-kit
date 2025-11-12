import { useLanguage } from '@/shared/context/LanguageContext';
import { Navigation } from '@/shared/components/Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { translations } from './translations';
import { HistoryItem } from './components/HistoryItem';
import { HistoryFilters } from './components/HistoryFilters';
import { useHistoryData } from './hooks/useHistoryData';

const History = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const { historyItems, activeFilter, setActiveFilter } = useHistoryData(language);

  const filters = [
    { id: 'all', label: t.filterAll },
    { id: 'projects', label: t.filterProjects },
    { id: 'tasks', label: t.filterTasks },
    { id: 'users', label: t.filterUsers },
  ];

  const getTypeLabel = (type: string) => {
    if (type === 'project') return t.typeProject;
    if (type === 'task') return t.typeTask;
    if (type === 'user') return t.typeUser;
    return type;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground text-lg">{t.description}</p>
        </div>

        <div className="mb-6">
          <HistoryFilters filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="space-y-4">
          {historyItems.length > 0 ? (
            historyItems.map((item) => (
              <HistoryItem key={item.id} {...item} typeLabel={getTypeLabel(item.type)} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">{t.noHistory}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
