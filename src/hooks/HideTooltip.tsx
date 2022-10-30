import React, { useEffect } from "react";

export function useHideTooltip(
  ref: any,
  show: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref!.current && !ref.current.contains(event.target)) {
        show(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
