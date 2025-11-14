import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { useGlobalAlert } from '@/shared/context/GlobalAlertContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { navigationItems } from '@/shared/config/navigation';
import { translations } from '../translations';

interface DesktopSidebarProps {
  onLogout: () => void;
}

export const DesktopSidebar = ({ onLogout }: DesktopSidebarProps) => {
  const { language } = useLanguage();
  const { showAlert } = useGlobalAlert();
  const t = translations[language];
  const isRTL = language === 'ar';

  const handleLogoutClick = () => {
    showAlert({
      title: t.logoutConfirmTitle,
      message: t.logoutConfirmMessage,
      confirmText: t.logoutConfirmButton,
      type: 'warning',
      buttonDelay: 1000,
      onConfirm: onLogout,
    });
  };

  return (
    <aside
      className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen w-64 bg-sidebar border-sidebar-border flex flex-col z-40 ${
        isRTL ? 'border-l' : 'border-r'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">{t.appName}</h1>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <nav className="py-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{t[item.labelKey]}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button
          variant="ghost"
          onClick={handleLogoutClick}
          className={`w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>{t.logout}</span>
        </Button>
      </div>
    </aside>
  );
};
