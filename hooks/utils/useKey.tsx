import { useEffect } from "react";

type Key = string;

const useKey = (key: Key, callback: () => void): void => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [key, callback]);
};

export default useKey;
