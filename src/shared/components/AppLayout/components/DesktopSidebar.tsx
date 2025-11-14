import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { navigationItems } from '@/shared/config/navigation';
import { translations } from '../translations';

interface DesktopSidebarProps {
  onLogout: () => void;
}

export const DesktopSidebar = ({ onLogout }: DesktopSidebarProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <aside
      className={`w-64 bg-sidebar border-sidebar-border flex flex-col ${
        isRTL ? 'border-l' : 'border-r'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">{t.appName}</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            >
              <item.icon className="h-5 w-5" />
              <span>{t[item.labelKey]}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="h-5 w-5" />
          <span>{t.logout}</span>
        </Button>
      </div>
    </aside>
  );
};
