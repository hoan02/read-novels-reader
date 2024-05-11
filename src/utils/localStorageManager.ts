/**
 * Gets an item from localStorage and parses it as JSON.
 * @param key The key of the item to retrieve.
 * @returns The parsed value if successful, or null if not found or on error.
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Sets an item in localStorage after stringifying it as JSON.
 * @param key The key under which to store the item.
 * @param value The value to store.
 */
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};