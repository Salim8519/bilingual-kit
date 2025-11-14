import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/shared/utils/storage';

// React hook for sessionStorage with auto-sync
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = storage.session.get<T>(key);
    return stored ?? initialValue;
  });

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue;
      storage.session.set(key, valueToStore);
      return valueToStore;
    });
  }, [key]);

  const remove = useCallback(() => {
    storage.session.remove(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setStoredValue, remove] as const;
}

// React hook for IndexedDB with auto-sync
export function useIndexedDB<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage.indexed.get<T>(key).then(stored => {
      if (stored !== null) setValue(stored);
      setLoading(false);
    });
  }, [key]);

  const setStoredValue = useCallback(async (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue;
      storage.indexed.set(key, valueToStore);
      return valueToStore;
    });
  }, [key]);

  const remove = useCallback(async () => {
    await storage.indexed.remove(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setStoredValue, remove, loading] as const;
}
