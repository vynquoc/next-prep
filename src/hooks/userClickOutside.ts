import React, { useEffect } from "react";
type RefType = React.MutableRefObject<HTMLElement | null>;
const useClickOutside = (ref: RefType, callback: () => void) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClick(event);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, callback]);
};

export default useClickOutside;
