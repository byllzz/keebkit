import { useEffect, useState } from "react";

export function useSiteMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("keyb-site-mode");
    return saved || "light"; // default to light
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.setItem("keyb-site-mode", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  return { mode, toggle };
}
