// Updated useLocalStorage hook to use the localStorageManager module
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorageManager";
import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getLocalStorageItem<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setLocalStorageItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
