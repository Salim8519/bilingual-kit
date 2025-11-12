import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { LayoutDashboard, History, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from './translations';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface NavigationProps {
  onLogout?: () => void;
}

export const Navigation = ({ onLogout }: NavigationProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const navItems = [
    { path: '/dashboard', label: t.dashboard, icon: LayoutDashboard },
    { path: '/history', label: t.history, icon: History },
  ];

  return (
    <nav className="bg-sidebar border-b border-sidebar-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-sidebar-foreground">{t.appName}</h1>
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  activeClassName="bg-sidebar-accent text-sidebar-foreground font-semibold"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="gap-2 text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t.logout}</span>
              </Button>
            )}
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
              activeClassName="bg-sidebar-accent text-sidebar-foreground font-semibold"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
