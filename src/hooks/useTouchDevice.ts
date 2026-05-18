"use client";

import { useSyncExternalStore } from "react";

export function useTouchDevice() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    () => false,
  );
}
