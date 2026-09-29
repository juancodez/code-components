import { useCallback, useRef, useState } from "react";
import { defaultModelProviders, ModelPicker } from "../components/ModelPicker";
import pickerSource from "../components/ModelPicker.tsx?raw";
import "./AspectRatioTile.css";
import "./ModelPickerTile.css";

/* Tile wrapper for ModelPicker: reuses the shared .tile chrome (title,
   sound button, panel drawer, play-demo cursor). The picker sits centered
   in the stage with its popover locked open, so the resting state
   already shows the interesting surface. */
export function ModelPickerTile() {
  const [modelId, setModelId] = useState<string>("gpt-5.6-sol");
  const [soundOn, setSoundOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({
    x: 0, y: 0, visible: false, clicking: false,
  });
  const [playing, setPlaying] = useState(false);

  /* WebAudio blips, same shape as the other tiles — a soft click for
     selection and a small bloop that sweeps pitch for the effort track. */
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
  const chirp = (v: number) => {
    if (!soundOn) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const t = ctx.currentTime;
    const target = 520 + v * 90;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(target * 0.6, t);
    o.frequency.exponentialRampToValueAtTime(target, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + 0.19);
  };

  const copy = async () => {
    click();
    await navigator.clipboard.writeText(pickerSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  /* Demo: fake cursor walks the provider rail, landing on each icon in turn.
     Positions are read live from the rail buttons so the sequence tracks
     any layout changes. Ends on OpenAI (index 0) to match the resting shot. */
  const play = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || playing) return;
    const rails = Array.from(stage.querySelectorAll<HTMLButtonElement>(".mp-rail-btn"));
    if (rails.length < 2) return;

    setPlaying(true);
    const stageRect = stage.getBoundingClientRect();
    const sequence = [1, 2, 3, 0]; /* anthropic → xai → google → openai */

    setCursor({
      x: stageRect.width - 30,
      y: stageRect.height - 30,
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
      const rect = rails[idx].getBoundingClientRect();
      const x = rect.left - stageRect.left + rect.width / 2 - 5;
      const y = rect.top - stageRect.top + rect.height / 2 - 3;
      setCursor({ x, y, visible: true, clicking: false });

      setTimeout(() => {
        setCursor((c) => ({ ...c, clicking: true }));
        rails[idx].click();
        click();
        setTimeout(() => {
          setCursor((c) => ({ ...c, clicking: false }));
          step++;
          setTimeout(runStep, 620);
        }, 220);
      }, 620);
    };
    setTimeout(runStep, 300);
  }, [playing]);

  return (
    <article className="tile">
      <div className="tile-card tile-card-tall">
        <header className="tile-chrome">
          <h2>Model picker</h2>
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

        <div className="tile-stage tile-stage-wide" ref={stageRef}>
          <ModelPicker
            providers={defaultModelProviders}
            value={modelId}
            onValueChange={(id, _prov, effort) => {
              setModelId(id);
              click();
              if (effort && effort !== "none") chirp(["low", "medium", "high", "max"].indexOf(effort));
            }}
            defaultOpen
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
              <h3>Model picker</h3>
              <p>INFO</p>
            </div>
            <button
              className="tile-panel-close"
              aria-label="Close settings"
              onClick={() => { setPanelOpen(false); click(); }}
            >
              <XIcon />
            </button>
          </div>

          <p className="mp-tile-blurb">
            Provider rail on the left, model list on the right, thinking effort along the bottom.
            Popover stays open on select so the effort track stays reachable.
          </p>

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
      <path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>
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
