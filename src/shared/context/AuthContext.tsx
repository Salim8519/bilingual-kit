import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { storage } from '@/shared/utils/storage';

interface User {
  id: string;
  email: string;
  [key: string]: any;
}

interface Session {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateSession: (session: Session) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'auth_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Ultra-fast session restore from IndexedDB
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await storage.indexed.get<Session>(SESSION_KEY);
        
        if (storedSession) {
          // Check if session is expired
          if (storedSession.expiresAt && storedSession.expiresAt < Date.now()) {
            await storage.indexed.remove(SESSION_KEY);
            setIsInitialized(true);
            return;
          }
          
          setSession(storedSession);
          setUser(storedSession.user);
        }
      } catch (error) {
        console.error('Session restore failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const updateSession = useCallback(async (newSession: Session) => {
    setSession(newSession);
    setUser(newSession.user);
    await storage.indexed.set(SESSION_KEY, newSession);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual auth provider logic (Supabase, Firebase, etc.)
      // Placeholder implementation
      const mockSession: Session = {
        user: { id: '1', email },
        accessToken: 'mock-token',
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
      };

      await updateSession(mockSession);
      return {};
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  }, [updateSession]);

  const signUp = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual auth provider logic
      const mockSession: Session = {
        user: { id: '1', email },
        accessToken: 'mock-token',
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
      };

      await updateSession(mockSession);
      return {};
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  }, [updateSession]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual auth provider logout
      await storage.indexed.remove(SESSION_KEY);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isInitialized,
    signIn,
    signUp,
    signOut,
    updateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
