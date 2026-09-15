import { useCallback, useRef, useState } from "react";
import { Aspect } from "../components/AspectRatio";
import "../components/AspectRatio.css";
import aspectSource from "../components/AspectRatio.tsx?raw";
import "./AspectRatioTile.css";

export function AspectRatioTile() {
  const [corner, setCorner] = useState(18);
  const [soundOn, setSoundOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  });
  const [playing, setPlaying] = useState(false);

  /* WebAudio blip. No asset needed — a short sine dropoff is
     enough tick to register an interaction. Freq/gain/dur are
     tuned per event: aspect switch is louder/longer than the
     slider tick, so a scrub sounds like a sweep rather than a
     saturated tone. */
  const ctxRef = useRef<AudioContext | null>(null);
  const beep = (freq: number, gain: number, dur: number) => {
    if (!soundOn) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = freq;
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur + 0.01);
  };
  const click = () => beep(720, 0.04, 0.08);

  /* Bubble: sine with a fast upward pitch ramp — reads as a water
     bloop rather than a slider tick. Pitch tracks the corner
     value so scrubbing sweeps through a natural range.
     Throttled: raw range events fire dozens of times a second
     and would saturate into noise otherwise. */
  const lastBubbleRef = useRef(0);
  const bubble = (v: number) => {
    if (!soundOn) return;
    const now = performance.now();
    if (now - lastBubbleRef.current < 55) return;
    lastBubbleRef.current = now;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const t = ctx.currentTime;
    const target = 500 + v * 22; /* 500..1380 Hz */
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
    await navigator.clipboard.writeText(aspectSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  /* Demo: fake cursor travels to each tab and clicks. Positions
     are read from the real .asp-tab buttons at play time, so the
     demo tracks any layout changes (padding, moved container). */
  const play = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || playing) return;
    const tabs = Array.from(stage.querySelectorAll<HTMLButtonElement>(".asp-tab"));
    if (tabs.length !== 3) return;

    setPlaying(true);
    const cardRect = stage.getBoundingClientRect();
    /* land → tall → square: cover all three and end on the
       resting default. */
    const sequence = [0, 2, 1];

    /* Start position: bottom-right, off-screen-ish, so the
       cursor slides IN rather than appearing on top of a tab. */
    setCursor({
      x: cardRect.width - 20,
      y: cardRect.height - 20,
      visible: true,
      clicking: false,
    });

    let step = 0;
    const runStep = () => {
      if (step >= sequence.length) {
        setTimeout(() => {
          setCursor((c) => ({ ...c, visible: false }));
          setPlaying(false);
        }, 700);
        return;
      }
      const idx = sequence[step];
      const rect = tabs[idx].getBoundingClientRect();
      /* Cursor tip is at ~(5, 3) inside the 24-unit viewBox, so
         offset by that much or the tip lands off the tab. */
      const x = rect.left - cardRect.left + rect.width / 2 - 5;
      const y = rect.top - cardRect.top + rect.height / 2 - 3;

      setCursor({ x, y, visible: true, clicking: false });

      /* Arrive, click (pulse the cursor), fire the real click on
         the tab, wait, next. */
      setTimeout(() => {
        setCursor((c) => ({ ...c, clicking: true }));
        tabs[idx].click();
        setTimeout(() => {
          setCursor((c) => ({ ...c, clicking: false }));
          step++;
          setTimeout(runStep, 700);
        }, 220);
      }, 650);
    };
    setTimeout(runStep, 300);
  }, [playing]);

  return (
    <article className="tile">
      <div className="tile-card">
        {/* Title fades in on hover, centered on the frame. */}
        <header className="tile-chrome">
          <h2>Aspect ratio</h2>
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

        <div className="tile-stage" ref={stageRef}>
          <Aspect corner={corner} onChange={click} />
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
              <h3>Aspect ratio</h3>
              <p>SELECT</p>
            </div>
            <button
              className="tile-panel-close"
              aria-label="Close settings"
              onClick={() => { setPanelOpen(false); click(); }}
            >
              <XIcon />
            </button>
          </div>

          <label className="tile-row">
            <span>Corner</span>
            <input
              type="range"
              min={0}
              max={40}
              value={corner}
              onChange={(e) => {
                const v = Number(e.target.value);
                setCorner(v);
                bubble(v);
              }}
            />
            <span className="tile-row-val">{corner}</span>
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
      <path d="M10 5H3"/>
      <path d="M12 19H3"/>
      <path d="M14 3v4"/>
      <path d="M16 17v4"/>
      <path d="M21 12h-9"/>
      <path d="M21 19h-5"/>
      <path d="M21 5h-7"/>
      <path d="M8 10v4"/>
      <path d="M8 12H3"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
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
      <path d="M16 9a5 5 0 0 1 0 6"/>
      <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
    </svg>
  );
}

function VolumeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
      <line x1="22" y1="9" x2="16" y2="15"/>
      <line x1="16" y1="9" x2="22" y2="15"/>
    </svg>
  );
}
