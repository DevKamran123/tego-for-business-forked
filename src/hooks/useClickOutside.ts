import { useState, useEffect, useRef } from "react";

// Custom hook to handle clicks outside an element
export const useClickOutside = (
  initialState: boolean | number | null = false
) => {
  const [openState, setOpenState] = useState<boolean | number | null>(
    initialState
  );
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = (index?: number) => {
    if (typeof openState === "boolean") {
      setOpenState((prev) => !prev);
    } else {
      setOpenState((prev) => (prev === index ? null : index ?? null));
    }
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenState(typeof openState === "boolean" ? false : null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openState]);

  return { openState, setOpenState, toggleOpen, ref };
};
