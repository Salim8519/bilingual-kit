import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { DesktopSidebar } from '../DesktopSidebar/DesktopSidebar';
import { MobileNav } from '../MobileNav/MobileNav';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DesktopSidebar onLogout={handleLogout} />
        </div>

        {/* Mobile Nav */}
        <MobileNav onLogout={handleLogout} />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Desktop Header */}
          <header className="hidden md:flex items-center gap-2 border-b border-border bg-background px-4 h-16">
            <SidebarTrigger />
            <div className="flex-1" />
            <LanguageSwitcher />
          </header>

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
