import { useCallback, useRef, useState } from "react";
import { CircleMenu, type CircleMenuItem } from "../components/CircleMenu";
import "../components/CircleMenu.css";
import circleMenuSource from "../components/CircleMenu.tsx?raw";
import "./AspectRatioTile.css";

export function CircleMenuTile() {
  const [radius, setRadius] = useState(96);
  const [fill, setFill] = useState<"light" | "dark">("dark");
  const [soundOn, setSoundOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  });

  const rootRef = useRef<HTMLDivElement>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const beep = (freq: number, gain: number, dur: number, type: OscillatorType = "sine") => {
    if (!soundOn) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur + 0.01);
  };
  const click = () => beep(720, 0.04, 0.08);
  const pop = () => beep(520, 0.05, 0.12, "triangle");

  const lastBubbleRef = useRef(0);
  const bubble = (v: number) => {
    if (!soundOn) return;
    const now = performance.now();
    if (now - lastBubbleRef.current < 55) return;
    lastBubbleRef.current = now;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const t = ctx.currentTime;
    const target = 500 + v * 5;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(target * 0.55, t);
    o.frequency.exponentialRampToValueAtTime(target, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.19);
  };

  const copy = async () => {
    click();
    await navigator.clipboard.writeText(circleMenuSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  /* Play the menu: fake cursor moves to the toggle, opens it, taps one item,
     comes back and closes it. */
  const play = useCallback(async () => {
    const root = rootRef.current;
    if (!root || playing) return;
    const toggle = root.querySelector<HTMLButtonElement>(".cm-toggle");
    if (!toggle) return;

    setPlaying(true);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const cardRect = root.getBoundingClientRect();
    const centerOf = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cardRect.left + r.width / 2,
        y: r.top - cardRect.top + r.height / 2,
      };
    };

    setCursor({ x: cardRect.width - 30, y: cardRect.height - 30, visible: true, clicking: false });
    await sleep(280);

    const t = centerOf(toggle);
    setCursor({ x: t.x, y: t.y, visible: true, clicking: false });
    await sleep(560);
    setCursor((c) => ({ ...c, clicking: true }));
    toggle.click();
    await sleep(220);
    setCursor((c) => ({ ...c, clicking: false }));

    /* Wait for the spiral to settle, then visit one item. */
    await sleep(700);
    const items = Array.from(root.querySelectorAll<HTMLElement>(".cm-btn"));
    if (items.length) {
      const target = items[0];
      const it = centerOf(target);
      setCursor({ x: it.x, y: it.y, visible: true, clicking: false });
      await sleep(520);
      setCursor((c) => ({ ...c, clicking: true }));
      target.click();
      await sleep(220);
      setCursor((c) => ({ ...c, clicking: false }));
    }

    await sleep(380);
    setCursor({ x: t.x, y: t.y, visible: true, clicking: false });
    await sleep(520);
    setCursor((c) => ({ ...c, clicking: true }));
    toggle.click();
    await sleep(220);
    setCursor((c) => ({ ...c, clicking: false }));

    await sleep(420);
    setCursor((c) => ({ ...c, visible: false }));
    setPlaying(false);
  }, [playing]);

  const items: CircleMenuItem[] = [
    { label: "Home", icon: <HomeIcon />, onClick: pop },
    { label: "User", icon: <UserIcon />, onClick: pop },
    { label: "Settings", icon: <SettingsIcon />, onClick: pop },
    { label: "Mail", icon: <MailIcon />, onClick: pop },
    { label: "Favorites", icon: <HeartIcon />, onClick: pop },
  ];

  return (
    <article className="tile">
      <div className="tile-card">
        <header className="tile-chrome">
          <h2>Circle Menu</h2>
        </header>

        <div className="tile-tools">
          <button
            className="tile-tool"
            aria-label={panelOpen ? "Close settings" : "Open settings"}
            aria-expanded={panelOpen}
            onClick={() => { setPanelOpen((v) => !v); click(); }}
          >
            <SlidersHorizontalIcon />
          </button>
          <button
            className="tile-tool"
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            title={soundOn ? "Sound on" : "Sound off"}
            onClick={() => setSoundOn((v) => !v)}
          >
            {soundOn ? <VolumeOn /> : <VolumeOff />}
          </button>
        </div>

        <div
          className="tile-stage"
          ref={rootRef}
          style={{
            background: fill === "dark" ? "#f4f4f4" : "#0b0b0b",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <CircleMenu items={items} radius={radius} fill={fill} onToggle={click} />
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

        <button
          className="tile-play"
          aria-label="Play demo"
          onClick={play}
          disabled={playing}
        >
          <PlayIcon />
        </button>
      </div>

      {panelOpen && (
        <aside className="tile-panel">
          <div className="tile-panel-header">
            <div>
              <h3>Circle Menu</h3>
              <p>RADIAL</p>
            </div>
            <button
              className="tile-panel-close"
              aria-label="Close settings"
              onClick={() => { setPanelOpen(false); click(); }}
            >
              <XIcon />
            </button>
          </div>

          <div className="tile-fill" role="group" aria-label="Surface">
            <button
              className={"tile-fill-btn" + (fill === "light" ? " on" : "")}
              onClick={() => { setFill("light"); click(); }}
            >
              <SunIcon /> Light
            </button>
            <button
              className={"tile-fill-btn" + (fill === "dark" ? " on" : "")}
              onClick={() => { setFill("dark"); click(); }}
            >
              <MoonIcon /> Dark
            </button>
          </div>

          <label className="tile-row">
            <span>Radius</span>
            <input
              type="range"
              min={60}
              max={115}
              value={radius}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRadius(v);
                bubble(v);
              }}
            />
            <span className="tile-row-val">{radius}</span>
          </label>

          <button className="tile-copy" onClick={copy}>
            {copied ? "Copied" : "Copy source code"}
          </button>
        </aside>
      )}
    </article>
  );
}

function SlidersHorizontalIcon() {
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
function VolumeOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
      <path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
    </svg>
  );
}
function VolumeOff() {
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
function CursorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l5.5 14 2-6 6-2z"/>
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  );
}
