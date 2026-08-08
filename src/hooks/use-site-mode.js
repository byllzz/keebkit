import { useEffect, useState } from "react";

export function useSiteMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("keyb-site-mode");
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.setItem("keyb-site-mode", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  return { mode, toggle };
}
