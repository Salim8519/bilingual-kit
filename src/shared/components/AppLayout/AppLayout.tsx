import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/shared/context/LanguageContext';
import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileHeader } from './components/MobileHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Header with Hamburger */}
      <MobileHeader onLogout={handleLogout} />

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen w-full">
        {/* Desktop Sidebar - Fixed */}
        <DesktopSidebar onLogout={handleLogout} />

        {/* Main Content - With margin to account for fixed sidebar */}
        <main className={`min-h-screen ${isRTL ? 'mr-64' : 'ml-64'}`}>
          {children}
        </main>
      </div>

      {/* Mobile Content */}
      <main className="md:hidden">
        {children}
      </main>
    </div>
  );
};
