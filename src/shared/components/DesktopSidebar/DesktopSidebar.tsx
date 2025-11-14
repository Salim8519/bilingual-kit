import { NavLink } from '@/components/NavLink';
import { useLanguage } from '@/shared/context/LanguageContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { navigationItems } from '@/shared/constants/navigationItems';
import { translations } from './translations';

interface DesktopSidebarProps {
  onLogout?: () => void;
}

export const DesktopSidebar = ({ onLogout }: DesktopSidebarProps) => {
  const { language } = useLanguage();
  const { state } = useSidebar();
  const t = translations[language];
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!isCollapsed && (
          <h1 className="text-lg font-bold text-sidebar-foreground">{t.appName}</h1>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className="flex items-center gap-2"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{t[item.labelKey]}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {onLogout && (
        <SidebarFooter className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start gap-2"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>{t.logout}</span>}
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
