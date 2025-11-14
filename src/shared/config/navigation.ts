import { LayoutDashboard, History, Settings, LucideIcon } from 'lucide-react';

export interface NavigationItem {
  path: string;
  icon: LucideIcon;
  labelKey: 'dashboard' | 'history' | 'settings';
}

export const navigationItems: NavigationItem[] = [
  { path: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { path: '/history', icon: History, labelKey: 'history' },
  { path: '/settings', icon: Settings, labelKey: 'settings' },
];
