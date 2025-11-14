import { LayoutDashboard, History, LucideIcon } from 'lucide-react';

export interface NavigationItem {
  path: string;
  icon: LucideIcon;
  labelKey: 'dashboard' | 'history';
}

export const navigationItems: NavigationItem[] = [
  { path: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { path: '/history', icon: History, labelKey: 'history' },
];
