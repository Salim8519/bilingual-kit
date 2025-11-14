import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { useGlobalAlert } from '@/shared/context/GlobalAlertContext';
import { Menu, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import { navigationItems } from '@/shared/config/navigation';
import { translations } from '../translations';

interface MobileHeaderProps {
  onLogout: () => void;
}

export const MobileHeader = ({ onLogout }: MobileHeaderProps) => {
  const { language } = useLanguage();
  const { showAlert } = useGlobalAlert();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const isRTL = language === 'ar';

  const handleLogoutClick = () => {
    setOpen(false);
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
    <header className="md:hidden bg-sidebar border-b border-sidebar-border sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-bold text-sidebar-foreground">{t.appName}</h1>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? 'left' : 'right'} className="w-72 flex flex-col">
              <SheetHeader className="shrink-0">
                <SheetTitle>{t.menu}</SheetTitle>
              </SheetHeader>

              <ScrollArea className="flex-1 mt-6">
                <nav className="flex flex-col gap-2 pr-4">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors"
                      activeClassName="bg-accent font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{t[item.labelKey]}</span>
                    </NavLink>
                  ))}

                  <div className="mt-4 pt-4 border-t space-y-2">
                    <ThemeToggle />
                    <Button
                      variant="ghost"
                      onClick={handleLogoutClick}
                      className="w-full justify-start gap-3"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t.logout}</span>
                    </Button>
                  </div>
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
