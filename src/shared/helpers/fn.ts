import { LOCAL_STORAGE_KEYS } from "@/shared/helpers/consts";

 
export const getLocalStorage = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);

  if (raw === null) throw new Error("Local storage key not found");

  return JSON.parse(raw) as T;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  const lang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANG);

  localStorage.clear();

  if (lang) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, lang);
  }
};
export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
