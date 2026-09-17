import { useCallback, useRef, useState } from "react";
import { LiquidToggle } from "../components/LiquidToggle";
import "../components/LiquidToggle.css";
import liquidSource from "../components/LiquidToggle.tsx?raw";
import "./AspectRatioTile.css";
import "./LiquidToggleTile.css";

export function LiquidToggleTile() {
  const [speed, setSpeed] = useState(60);
  const [stretch, setStretch] = useState(80);
  const [fill, setFill] = useState<"light" | "dark">("light");
  const [soundOn, setSoundOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [on, setOn] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  });
  const [playing, setPlaying] = useState(false);

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

  /* A wet "plop": short sine that sweeps down. Sounds like a
     drop landing rather than a mouse click. */
  const plop = (rising: boolean) => {
    if (!soundOn) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    const [f0, f1] = rising ? [340, 620] : [520, 260];
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.22);
  };

  const bubble = (v: number) => {
    if (!soundOn) return;
    beep(500 + v * 6, 0.03, 0.08);
  };

  const copy = async () => {
    click();
    await navigator.clipboard.writeText(liquidSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  /* Demo: fly a fake cursor to the toggle, tap it once, then
     tap it back. Two full transitions so the goo shape is
     visible in both directions. */
  const play = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || playing) return;
    const el = stage.querySelector<HTMLElement>(".liq");
    if (!el) return;

    setPlaying(true);
    const cardRect = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const cx = r.left - cardRect.left + r.width / 2 - 4;
    const cy = r.top - cardRect.top + r.height / 2 - 4;

    setCursor({ x: cx - 60, y: cy + 40, visible: true, clicking: false });

    setTimeout(() => {
      setCursor(c => ({ ...c, x: cx, y: cy, clicking: false }));
    }, 30);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: true }));
      setOn(v => !v);
      plop(true);
    }, 500);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: false }));
    }, 700);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: true }));
      setOn(v => !v);
      plop(false);
    }, 1300);

    setTimeout(() => {
      setCursor(c => ({ ...c, clicking: false }));
    }, 1500);

    setTimeout(() => {
      setCursor(c => ({ ...c, visible: false }));
      setPlaying(false);
    }, 1900);
  }, [playing]);

  const handleToggle = (v: boolean) => {
    setOn(v);
    plop(v);
  };

  return (
    <article className="tile">
      <div className="tile-card" data-fill={fill}>
        <header className="tile-chrome"><h2>Liquid toggle</h2></header>

        <div className="tile-tools">
          <button
            className="tile-tool"
            aria-label={panelOpen ? "Close settings" : "Open settings"}
            aria-expanded={panelOpen}
            onClick={() => { setPanelOpen(v => !v); click(); }}
          >
            <SlidersHorizontalIcon />
          </button>
          <button
            className="tile-tool"
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            title={soundOn ? "Sound on" : "Sound off"}
            onClick={() => setSoundOn(v => !v)}
          >
            {soundOn ? <VolumeOn /> : <VolumeOff />}
          </button>
        </div>

        <div className="tile-stage" ref={stageRef}>
          <LiquidToggle
            speed={speed}
            stretch={stretch}
            on={on}
            onToggle={handleToggle}
          />
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
              <h3>Liquid toggle</h3>
              <p>PRESS</p>
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
            <span>Speed</span>
            <input
              type="range"
              min={0}
              max={100}
              value={speed}
              onChange={(e) => { const v = Number(e.target.value); setSpeed(v); bubble(v); }}
            />
            <span className="tile-row-val">{speed}</span>
          </label>

          <label className="tile-row">
            <span>Stretch</span>
            <input
              type="range"
              min={0}
              max={100}
              value={stretch}
              onChange={(e) => { const v = Number(e.target.value); setStretch(v); bubble(v); }}
            />
            <span className="tile-row-val">{stretch}</span>
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
function CursorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l5.5 14 2-6 6-2z"/>
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
