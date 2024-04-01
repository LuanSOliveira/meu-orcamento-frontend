interface UseLocalStorageReturn {
  get: <T>(key: string) => T;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
}

export const useLocalStorage = (): UseLocalStorageReturn => {
  if (typeof window === 'undefined' ? false : true) {
    return {
      get: <T>(key: string) => {
        const data = localStorage.getItem(key);
        return data as T;
      },
      set: <T>(key: string, value: T) =>
        localStorage.setItem(key, JSON.stringify(value)),
      remove: (key: string) => localStorage.removeItem(key),
    };
  }

  return {
    get: <T>(key: string) => key as T,
    set: <T>(key: string, value: T) => key || value,
    remove: (key: string) => key,
  };
};
