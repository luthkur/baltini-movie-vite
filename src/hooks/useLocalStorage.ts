import { useCallback, useEffect, useState, useMemo } from "react";

const isBrowser = typeof window !== "undefined";

const isLocalstorageAvailable = () => {
  if (!isBrowser) {
    return false;
  }

  const test = `test-${Date.now()}`;
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// React hook
const useLocalstorage = (key: string, initialValue = "") => {
  const available = isLocalstorageAvailable();
  const getValueFromLocalstorage = useCallback(() => {
    try {
      if (!available) {
        return initialValue;
      }
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [available, initialValue, key]);

  const [storedValue, setStoredValue] = useState(getValueFromLocalstorage());

  useEffect(() => {
    const value = getValueFromLocalstorage();
    setStoredValue(value);
  }, [available, getValueFromLocalstorage]);

  // Listen to localstorage change to apply it
  const changeHandler = useCallback(
    (e: StorageEvent) => {
      const { key: changeKey, newValue } = e;
      if (key === changeKey) {
        setStoredValue(JSON.parse(newValue as string));
      }
    },
    [key]
  );

  // Listen changes
  useEffect(() => {
    if (available) {
      window.addEventListener("storage", changeHandler);
      return () => {
        window.removeEventListener("storage", changeHandler);
      };
    }
  }, [available]); // eslint-disable-line react-hooks/exhaustive-deps

  // Build the output
  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setValue = (value: any) => {
      if (!available) {
        return false;
      }
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      if (valueToStore !== storedValue) {
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    };
    return [storedValue, setValue];
  }, [storedValue, available, key]);
};

export default useLocalstorage;
