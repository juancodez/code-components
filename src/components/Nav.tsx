import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { HeaderToolbar } from "./HeaderToolbar";
import { useTheme } from "./useTheme";

const NAV_ITEMS = [
  { label: "Work",          href: "index.html"   },
  { label: "Labs",          href: "post.html"    },
  { label: "Claude Skills", href: "skills.html"  },
  { label: "About",         href: "about.html"   },
  { label: "Contact",       href: "#contact" },
];

function getActiveIdx() {
  const path = window.location.pathname;
  if (path.includes("post"))    return 1;
  if (path.includes("skills"))  return 2;
  if (path.includes("about"))   return 3;
  if (path.includes("contact")) return 4;
  return 0;
}

export function Nav() {
  const [activeIdx, setActiveIdx] = useState(getActiveIdx);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const targetIdx = hoveredIdx ?? activeIdx;
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const ctxRef = useRef<AudioContext | null>(null);

  const click = () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 640;
    g.gain.value = 0.035;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.11);
  };

  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const item = itemRefs.current[targetIdx];
      if (!nav || !item) return;
      const nr = nav.getBoundingClientRect();
      const ir = item.getBoundingClientRect();
      setPill({ left: ir.left - nr.left, width: ir.width, ready: true });
    };
    measure();
    document.fonts.ready.then(measure);
  }, [targetIdx]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <nav className="nav-bar" ref={navRef} aria-label="Main navigation">
        {pill.ready && (
          <span className="nav-pill" style={{ left: pill.left, width: pill.width }} aria-hidden="true" />
        )}
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            ref={el => { itemRefs.current[i] = el; }}
            href={item.href}
            className={"nav-item" + (i === activeIdx ? " nav-item-active" : "")}
            aria-current={i === activeIdx ? "page" : undefined}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onMouseDown={click}
            onClick={() => setActiveIdx(i)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <HeaderToolbar />

      <button
        className="nav-burger"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className="nav-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nav-sheet-head">
            <button
              className="nav-sheet-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="nav-sheet-list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={"nav-sheet-item" + (i === activeIdx ? " nav-sheet-item--active" : "")}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-sheet-divider" aria-hidden="true" />
            <li>
              <a href="/resume.html" className="nav-sheet-item" onClick={() => setMenuOpen(false)}>
                Resume
              </a>
            </li>
            <li>
              <button className="nav-sheet-item nav-sheet-item--btn" onClick={toggleTheme}>
                {theme === "light" ? "Dark theme" : "Light theme"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
