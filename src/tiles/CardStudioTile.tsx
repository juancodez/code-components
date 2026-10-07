import { useCallback, useRef, useState } from "react";
import { Aspect } from "../components/AspectRatio";
import "../components/AspectRatio.css";
import aspectSource from "../components/AspectRatio.tsx?raw";
import "./AspectRatioTile.css";

export function CardStudioTile() {
  const [corner, setCorner] = useState(18);
  const [tilt, setTilt] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  });
  const [playing, setPlaying] = useState(false);

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

  const lastBubbleRef = useRef(0);
  const bubble = (v: number) => {
    if (!soundOn) return;
    const now = performance.now();
    if (now - lastBubbleRef.current < 55) return;
    lastBubbleRef.current = now;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const t = ctx.currentTime;
    const target = 500 + v * 22;
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
    const props = [
      `corner={${corner}}`,
      tilt ? `tilt` : null,
    ].filter(Boolean).join(" ");
    const text = `// Usage\n<Aspect ${props} />\n\n// Source\n${aspectSource}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const play = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || playing) return;
    const tabs = Array.from(stage.querySelectorAll<HTMLButtonElement>(".asp-tab"));
    if (tabs.length !== 3) return;

    setPlaying(true);
    const cardRect = stage.getBoundingClientRect();
    const aspStage = stage.querySelector<HTMLDivElement>(".asp-stage");
    const aspRect = aspStage?.getBoundingClientRect();

    /* fire a synthetic mousemove on the asp-stage so the tilt responds,
       and move the visual cursor to the matching position */
    const moveTo = (nx: number, ny: number) => {
      if (!aspStage || !aspRect) return;
      aspStage.dispatchEvent(new MouseEvent("mousemove", {
        bubbles: true,
        clientX: aspRect.left + aspRect.width * nx,
        clientY: aspRect.top + aspRect.height * ny,
      }));
      setCursor({
        x: aspRect.left - cardRect.left + aspRect.width * nx,
        y: aspRect.top - cardRect.top + aspRect.height * ny,
        visible: true,
        clicking: false,
      });
    };

    /* phase 1 — tilt showcase: drag across three corners then settle */
    const tiltSeq: [number, number][] = [[0.2, 0.22], [0.78, 0.75], [0.72, 0.18], [0.5, 0.5]];
    let ti = 0;
    const runTilt = () => {
      if (ti >= tiltSeq.length) { setTimeout(runTabs, 280); return; }
      moveTo(...tiltSeq[ti++]);
      setTimeout(runTilt, 460);
    };

    /* phase 2 — cycle through shapes */
    const sequence = [0, 2, 1];
    let si = 0;
    const runTabs = () => {
      if (si >= sequence.length) {
        aspStage?.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
        setTimeout(() => { setCursor((c) => ({ ...c, visible: false })); setPlaying(false); }, 700);
        return;
      }
      const idx = sequence[si];
      const rect = tabs[idx].getBoundingClientRect();
      setCursor({ x: rect.left - cardRect.left + rect.width / 2 - 5, y: rect.top - cardRect.top + rect.height / 2 - 3, visible: true, clicking: false });
      setTimeout(() => {
        setCursor((c) => ({ ...c, clicking: true }));
        tabs[idx].click();
        setTimeout(() => { setCursor((c) => ({ ...c, clicking: false })); si++; setTimeout(runTabs, 680); }, 220);
      }, 620);
    };

    moveTo(0.5, 0.5);
    setTimeout(runTilt, 300);
  }, [playing]);

  return (
    <article className="tile">
      <div className="tile-card">
        <header className="tile-chrome">
          <h2>Card Studio</h2>
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
            onClick={() => setSoundOn((v) => !v)}
          >
            {soundOn ? <VolumeOn /> : <VolumeOff />}
          </button>
        </div>

        <div className="tile-stage" ref={stageRef}>
          <Aspect corner={corner} tilt={tilt} onChange={click} />
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
              <h3>Card Studio</h3>
              <p>CONFIGURE</p>
            </div>
            <button
              className="tile-panel-close"
              aria-label="Close settings"
              onClick={() => { setPanelOpen(false); click(); }}
            >
              <XIcon />
            </button>
          </div>

          {/* 3D tilt */}
          <div className="tile-fill" role="group" aria-label="3D tilt">
            <button
              className={"tile-fill-btn" + (!tilt ? " on" : "")}
              onClick={() => { setTilt(false); click(); }}
            >
              3D Off
            </button>
            <button
              className={"tile-fill-btn" + (tilt ? " on" : "")}
              onClick={() => { setTilt(true); click(); }}
            >
              3D On
            </button>
          </div>

          {/* Corner radius */}
          <label className="tile-row">
            <span>Corner</span>
            <input
              type="range" min={0} max={40} value={corner}
              onChange={(e) => { const v = Number(e.target.value); setCorner(v); bubble(v); }}
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
