import { useEffect, useState } from "react";

export type SiteMode = "light" | "dark";

export interface UseSiteModeResult {
  mode: SiteMode;
  toggle: () => void;
}

export function useSiteMode(): UseSiteModeResult {
  const [mode, setMode] = useState<SiteMode>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("keyb-site-mode") as SiteMode | null;
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.setItem("keyb-site-mode", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  return { mode, toggle };
}
