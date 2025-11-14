import { LayoutDashboard, History, LucideIcon } from 'lucide-react';

export interface NavigationItem {
  path: string;
  labelKey: 'dashboard' | 'history';
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  { path: '/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
  { path: '/history', labelKey: 'history', icon: History },
];
