import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

/**
 * Blazing fast auth guard component
 * Shows nothing during check to prevent UI flicker
 * 
 * Usage:
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 */
export const AuthGuard = ({ 
  children, 
  redirectTo = '/login',
  fallback = null 
}: AuthGuardProps) => {
  const { user, isInitialized } = useAuth();

  // Show nothing during initialization for blazing fast experience
  if (!isInitialized) {
    return fallback;
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
