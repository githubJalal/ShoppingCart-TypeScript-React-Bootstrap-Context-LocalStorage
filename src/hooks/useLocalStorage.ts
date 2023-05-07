import { useState, useEffect } from "react";

export function useLocalStorage<genericType>(
  key: string,
  initialValue: genericType | (() => genericType)
) {
  const [value, setValue] = useState<genericType>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    if (typeof initialValue === "function") {
      return initialValue as () => genericType;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
