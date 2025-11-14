import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { Menu, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navigationItems } from '@/shared/constants/navigationItems';
import { translations } from './translations';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface MobileNavProps {
  onLogout?: () => void;
}

export const MobileNav = ({ onLogout }: MobileNavProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-bold text-sidebar-foreground">{t.appName}</h1>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-[280px]">
              <SheetHeader>
                <SheetTitle>{t.navigation}</SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2 mt-6">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                    activeClassName="bg-sidebar-accent font-medium"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{t[item.labelKey]}</span>
                  </NavLink>
                ))}
                
                {onLogout && (
                  <>
                    <div className="my-2 border-t border-sidebar-border" />
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onLogout();
                        setOpen(false);
                      }}
                      className="justify-start gap-3 text-sidebar-foreground"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t.logout}</span>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
