import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * Ultra-fast auth redirect hook
 * Prevents UI flicker by checking session before render
 * 
 * @param options.redirectTo - Where to redirect authenticated/unauthenticated users
 * @param options.requireAuth - If true, redirects to login when not authenticated
 */
export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const { redirectTo = '/dashboard', requireAuth = false } = options;
  const navigate = useNavigate();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    if (requireAuth && !user) {
      navigate('/login', { replace: true });
    } else if (!requireAuth && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, isInitialized, navigate, redirectTo, requireAuth]);

  return { isChecking: !isInitialized };
};
