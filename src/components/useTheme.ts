import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const s = localStorage.getItem("theme");
    if (s === "dark" || s === "light") return s;
  } catch {}
  return "dark";
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));
  return [theme, toggle];
}
