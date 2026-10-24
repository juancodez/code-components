import { useState, useEffect } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const s = localStorage.getItem("theme");
    if (s === "dark" || s === "light") return s;
  } catch {}
  return "dark";
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>
  </svg>
);

const CvIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

function Tip({ label, shortcut }: { label: string; shortcut?: string }) {
  return (
    <span className="tool-tip" aria-hidden="true">
      {label}{shortcut && <> <kbd className="tool-tip-kbd">{shortcut}</kbd></>}
    </span>
  );
}

export function HeaderToolbar() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "l" || e.key === "L") setTheme(t => t === "light" ? "dark" : "light");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="header-tools">
      <a
        className="header-tool-btn header-tool-btn--cv"
        href="/juan-gomez-vara-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download CV"
      >
        <CvIcon />
        <Tip label="CV" />
      </a>
      <button
        className="header-tool-btn"
        onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
        <Tip label={theme === "light" ? "Dark Theme" : "Light Theme"} shortcut="L" />
      </button>
    </div>
  );
}
