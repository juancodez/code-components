import { useCallback, useEffect, useRef, useState } from "react";
import { SiteHeaderMenu } from "../components/SiteHeaderMenu";
import "../components/SiteHeaderMenu.css";
import shmSource from "../components/SiteHeaderMenu.tsx?raw";
import "./AspectRatioTile.css";
import "./SiteHeaderMenuTile.css";

export function SiteHeaderMenuTile() {
  const [open, setOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [fill, setFill] = useState<"light" | "dark">("light");
  const [soundOn, setSoundOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, clicking: false });

  const wrapRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const beep = () => {
    if (!soundOn) return;
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

  const copy = async () => {
    beep();
    await navigator.clipboard.writeText(shmSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const play = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || playing) return;
    const btn = wrap.querySelector<HTMLElement>(".shm-btn");
    if (!btn) return;

    setPlaying(true);
    const wr = wrap.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    const cx = br.left - wr.left + br.width / 2;
    const cy = br.top - wr.top + br.height / 2;

    setCursor({ x: cx - 60, y: cy + 40, visible: true, clicking: false });

    setTimeout(() => setCursor(c => ({ ...c, x: cx, y: cy })), 30);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: true }));
      setOpen(true);
      beep();
    }, 550);
    setTimeout(() => setCursor(c => ({ ...c, clicking: false })), 750);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: true }));
      setOpen(false);
      beep();
    }, 1700);
    setTimeout(() => setCursor(c => ({ ...c, clicking: false })), 1900);

    setTimeout(() => {
      setCursor(c => ({ ...c, visible: false }));
      setPlaying(false);
    }, 2300);
  }, [playing, soundOn]);

  return (
    <article className="tile">
      <div className="tile-card" data-fill={fill}>
        <header className="tile-chrome"><h2>Site header menu</h2></header>

        <div className="tile-tools">
          <button
            className="tile-tool"
            aria-label={panelOpen ? "Close settings" : "Open settings"}
            aria-expanded={panelOpen}
            onClick={() => { setPanelOpen(v => !v); beep(); }}
          >
            <SlidersHIcon />
          </button>
          <button
            className="tile-tool"
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            onClick={() => setSoundOn(v => !v)}
          >
            {soundOn ? <VolumeOnIcon /> : <VolumeOffIcon />}
          </button>
        </div>

        <div className="shm-demo-wrap" ref={wrapRef}>
          <div className="shm-demo-header">
            <span className="shm-demo-logo">Juan</span>
            <SiteHeaderMenu open={open} onToggle={setOpen} />
          </div>
          <div className="shm-demo-body">
            <div className="shm-demo-line" style={{ width: "65%" }} />
            <div className="shm-demo-line" style={{ width: "82%" }} />
            <div className="shm-demo-line" style={{ width: "48%" }} />
          </div>
          {cursor.visible && (
            <div
              className={"tile-cursor" + (cursor.clicking ? " tile-cursor-click" : "")}
              style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              aria-hidden="true"
            >
              <CursorIcon />
            </div>
          )}
        </div>

        <button className="tile-play" aria-label="Play demo" onClick={play} disabled={playing}>
          <PlayIcon />
        </button>
      </div>

      {panelOpen && (
        <aside className="tile-panel">
          <div className="tile-panel-header">
            <div>
              <h3>Site header menu</h3>
              <p>CLICK</p>
            </div>
            <button
              className="tile-panel-close"
              aria-label="Close settings"
              onClick={() => { setPanelOpen(false); beep(); }}
            >
              <XIcon />
            </button>
          </div>

          <div className="tile-fill" role="group" aria-label="Surface">
            <button className={"tile-fill-btn" + (fill === "light" ? " on" : "")} onClick={() => { setFill("light"); beep(); }}>
              <SunIcon /> Light
            </button>
            <button className={"tile-fill-btn" + (fill === "dark" ? " on" : "")} onClick={() => { setFill("dark"); beep(); }}>
              <MoonIcon /> Dark
            </button>
          </div>

          <button className="tile-copy" onClick={copy}>
            {copied ? "Copied!" : "Copy source code"}
          </button>
        </aside>
      )}
    </article>
  );
}

function SlidersHIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/>
      <path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="6 4 20 12 6 20 6 4"/>
    </svg>
  );
}
function CursorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l5.5 14 2-6 6-2z"/>
    </svg>
  );
}
function VolumeOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
      <path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
    </svg>
  );
}
function VolumeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
      <line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
