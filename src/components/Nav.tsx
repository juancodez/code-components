import { useState, useRef, useLayoutEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "index.html" },
  { label: "About", href: "about.html" },
  { label: "Work", href: "index.html", dot: true },
  { label: "Contact", href: "contact.html" },
];

function getActiveIdx() {
  const path = window.location.pathname;
  if (path.includes("about")) return 1;
  if (path.includes("contact")) return 3;
  return 0;
}

export function Nav() {
  const [activeIdx, setActiveIdx] = useState(getActiveIdx);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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
    const nav = navRef.current;
    const item = itemRefs.current[targetIdx];
    if (!nav || !item) return;
    const nr = nav.getBoundingClientRect();
    const ir = item.getBoundingClientRect();
    setPill({ left: ir.left - nr.left, width: ir.width, ready: true });
  }, [targetIdx]);

  return (
    <div className="nav-bar" ref={navRef}>
      {pill.ready && (
        <span className="nav-pill" style={{ left: pill.left, width: pill.width }} aria-hidden="true" />
      )}
      {NAV_ITEMS.map((item, i) => (
        <a
          key={item.label}
          ref={el => { itemRefs.current[i] = el; }}
          href={item.href}
          className={"nav-item" + (i === activeIdx ? " nav-item-active" : "")}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          onMouseDown={click}
          onClick={() => setActiveIdx(i)}
        >
          {item.dot && <span className="nav-dot" aria-hidden="true" />}
          {item.label}
        </a>
      ))}
    </div>
  );
}
