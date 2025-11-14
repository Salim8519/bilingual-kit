// Heavy-lifting storage utility for sessionStorage and IndexedDB
// Developers can use this with just 2 lines of code

const DB_NAME = 'AppStorage';
const DB_VERSION = 1;
const STORE_NAME = 'keyval';

class StorageManager {
  private db: IDBDatabase | null = null;

  // Initialize IndexedDB
  private async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }

  // SessionStorage operations
  session = {
    set: <T>(key: string, value: T): void => {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('SessionStorage set error:', error);
      }
    },

    get: <T>(key: string): T | null => {
      try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('SessionStorage get error:', error);
        return null;
      }
    },

    remove: (key: string): void => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error('SessionStorage remove error:', error);
      }
    },

    clear: (): void => {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('SessionStorage clear error:', error);
      }
    }
  };

  // IndexedDB operations
  indexed = {
    set: async <T>(key: string, value: T): Promise<void> => {
      try {
        const db = await this.initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(value, key);
        await new Promise((resolve, reject) => {
          tx.oncomplete = () => resolve(undefined);
          tx.onerror = () => reject(tx.error);
        });
      } catch (error) {
        console.error('IndexedDB set error:', error);
      }
    },

    get: async <T>(key: string): Promise<T | null> => {
      try {
        const db = await this.initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(key);
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result ?? null);
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('IndexedDB get error:', error);
        return null;
      }
    },

    remove: async (key: string): Promise<void> => {
      try {
        const db = await this.initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(key);
        await new Promise((resolve, reject) => {
          tx.oncomplete = () => resolve(undefined);
          tx.onerror = () => reject(tx.error);
        });
      } catch (error) {
        console.error('IndexedDB remove error:', error);
      }
    },

    clear: async (): Promise<void> => {
      try {
        const db = await this.initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.clear();
        await new Promise((resolve, reject) => {
          tx.oncomplete = () => resolve(undefined);
          tx.onerror = () => reject(tx.error);
        });
      } catch (error) {
        console.error('IndexedDB clear error:', error);
      }
    }
  };
}

export const storage = new StorageManager();
