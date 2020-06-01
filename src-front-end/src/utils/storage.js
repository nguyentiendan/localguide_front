import { useState } from 'react';

export const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const get = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const remove = key => {
  localStorage.removeItem(key);
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => get(key) || initialValue);

  const setValue = value => {
    const valueToStore = typeof value === 'function' ? value(storedValue) : value;

    setStoredValue(valueToStore);
    set(key, valueToStore);
  };

  return [storedValue, setValue];
};
