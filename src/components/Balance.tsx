import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import "./Balance.css";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ══ Balance ═══════════════════════════════════════════════
   A dollar figure, a change row, a line, and a time-window
   pill. The scrub reads a FRACTION of the plot's own box, so
   it needs no zoom correction: both sides of the division are
   screen pixels and the ratio holds at any scale. It snaps to
   a real reading rather than interpolating between two and
   presenting the result as a measurement.

   ONE ARRAY IS THE WHOLE TRUTH. The balance is the last
   point, the change is last minus first, the percentage is
   that over the first, and the scrub just moves the index.
   They were three hand-written figures beside a decorative
   line — three things that can disagree with each other and
   with the chart above them.

   NO MONO. tabular-nums is the only thing the monospaced face
   was providing — same advance for every digit, so nothing
   shifts as the number changes under the pointer — and Inter
   has it. */

type WindowKey = "1H" | "4H" | "1D";
const WINDOWS: WindowKey[] = ["1H", "4H", "1D"];

/* Each window gets its own shape signature — 1H is twitchy live
   noise, 4H dips then recovers, 1D is the smooth rise. Same asset,
   different zoom, so 1D ends at the reference $58,834 (+2.1%). */
type Shape = { w1: number; w2: number; a1: number; a2: number };
const makeSeries = (n: number, seed: number, drift: number, s: Shape) => {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const base = seed + drift * t;
    const wave1 = Math.sin(t * s.w1) * (drift * s.a1);
    const wave2 = Math.sin(t * s.w2) * (drift * s.a2);
    const jitter = Math.sin(i * 7919) * (drift * 0.002);
    out.push(base + wave1 + wave2 + jitter);
  }
  return out;
};

const DATA: Record<WindowKey, number[]> = {
  "1H": makeSeries(60, 58620, 220, { w1: 9.0, w2: 22.0, a1: 0.18, a2: 0.10 }),
  "4H": makeSeries(72, 58180, 660, { w1: 3.2, w2: 8.4, a1: 0.28, a2: 0.06 }),
  "1D": makeSeries(96, 57630, 1200, { w1: 18, w2: 42, a1: 0.15, a2: 0.04 }),
};

/* Label per window: 1H is live (pulsing dot), others are a fixed
   look-back label. Two things separated so the render just reads
   the object. */
const WHEN: Record<WindowKey, { live?: boolean; text: string }> = {
  "1H": { text: "past 1 hour" },
  "4H": { text: "past 4 hours" },
  "1D": { text: "today" },
};

/* Catmull-Rom → cubic bezier for a smooth curve without a
   library. Control points are 1/6 of the neighbour delta,
   which is the correct value for a natural spline. */
function toBezierPath(points: number[], w = 100, h = 40, pad = 4) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < points.length; i++) {
    xs.push((i / (points.length - 1)) * w);
    /* SVG y is inverted; the plot has vertical padding so the
       line never touches the top/bottom of its box */
    ys.push(h - pad - ((points[i] - min) / range) * (h - pad * 2));
  }

  let d = `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const p0x = xs[Math.max(0, i - 1)], p0y = ys[Math.max(0, i - 1)];
    const p1x = xs[i], p1y = ys[i];
    const p2x = xs[i + 1], p2y = ys[i + 1];
    const p3x = xs[Math.min(xs.length - 1, i + 2)];
    const p3y = ys[Math.min(ys.length - 1, i + 2)];
    const c1x = p1x + (p2x - p0x) / 6;
    const c1y = p1y + (p2y - p0y) / 6;
    const c2x = p2x - (p3x - p1x) / 6;
    const c2y = p2y - (p3y - p1y) / 6;
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2x.toFixed(2)} ${p2y.toFixed(2)}`;
  }
  return { d, xs, ys, min, max };
}

export type BalanceHandle = {
  scrub: (idx: number) => void;
  getYNorm: (idx: number) => number;
  seriesLength: () => number;
};

type Props = {
  /* card corner — 0 to 40 */
  corner?: number;
  /* light or dark fill */
  fill?: "light" | "dark";
  onScrub?: (v: number) => void;
  onWindow?: (i: number) => void;
};

export const Balance = forwardRef<BalanceHandle, Props>(function Balance(
  { corner = 32, fill = "light", onScrub, onWindow }, ref
) {
  const [win, setWin] = useState<number>(2); /* 1D default */
  const [scrub, setScrub] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);

  const series = DATA[WINDOWS[win]];
  const idx = scrub ?? series.length - 1;
  const value = series[idx];
  const first = series[0];
  const change = value - first;
  const changePct = (change / first) * 100;
  const mood = change >= 0 ? "up" : "down";

  const { d, min, max } = useMemo(() => toBezierPath(series), [series]);
  const tipX = (idx / (series.length - 1)) * 100;
  const tipYNorm = 1 - (value - min) / (max - min || 1); /* 0 = top */

  const onMove = (e: React.PointerEvent) => {
    const plot = plotRef.current;
    if (!plot) return;
    const r = plot.getBoundingClientRect();
    /* fraction of the plot's own box — no zoom correction */
    const t = clamp((e.clientX - r.left) / r.width, 0, 1);
    const next = Math.round(t * (series.length - 1));
    if (next !== scrub) {
      setScrub(next);
      onScrub?.(next);
    }
  };
  const onLeave = () => { setScrub(null); onScrub?.(-1); };

  const pickWindow = (i: number) => {
    if (i === win) return;
    setWin(i);
    setScrub(null);
    onWindow?.(i);
  };

  /* Demo: scrub from the current index to a few midpoints then
     release. Uses the real setScrub so the sound + tip react
     identically to a live pointer. */
  useImperativeHandle(ref, () => ({
    scrub: (idx) => setScrub(idx < 0 ? null : clamp(idx, 0, series.length - 1)),
    getYNorm: (idx) => {
      const i = clamp(idx, 0, series.length - 1);
      return 1 - (series[i] - min) / (max - min || 1);
    },
    seriesLength: () => series.length,
  }), [series, min, max]);

  /* Currency formatting — split on the decimal so the cents can
     be dimmed. Rounded to 2dp. */
  const [whole, cents] = value.toFixed(2).split(".");
  const wholeFmt = Number(whole).toLocaleString("en-US");
  const changeAbs = Math.abs(change).toFixed(2);
  const changeFmt = Number(changeAbs).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div
      className={`bal bal-${fill}`}
      data-mood={mood}
      style={{
        ["--bal-r" as string]: `${clamp(corner, 0, 40)}px`,
      }}
    >
      <div className="bal-sheet">
        <p className="bal-sum">
          <span className="bal-cur">$</span>{wholeFmt}<span className="bal-dec">.{cents}</span>
        </p>
        <p className="bal-move">
          {change >= 0 ? "+" : "−"}{changeFmt} · {Math.abs(changePct).toFixed(1)}%
          {WHEN[WINDOWS[win]].live ? (
            <span className="bal-live" aria-label="Live"><i />{WHEN[WINDOWS[win]].text}</span>
          ) : (
            <span className="bal-when">{WHEN[WINDOWS[win]].text}</span>
          )}
        </p>

        <span
          className="bal-plot"
          ref={plotRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onPointerDown={onMove}
        >
          <svg className="bal-line" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="bal-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <path className="bal-curve" d={d} />
          </svg>
          {scrub !== null && (
            <>
              <i className="bal-guide" style={{ left: `${tipX}%` }} />
              <i
                className="bal-tip"
                style={{
                  left: `${tipX}%`,
                  ["--tip" as string]: tipYNorm.toFixed(4),
                }}
              />
            </>
          )}
          {scrub === null && (
            /* Rest tip anchored to the last point so the block is
               never empty of the reading. */
            <i
              className="bal-tip bal-tip-rest"
              style={{
                left: `100%`,
                ["--tip" as string]: (1 - (series[series.length - 1] - min) / (max - min || 1)).toFixed(4),
              }}
            />
          )}
        </span>

        <div
          className="bal-win"
          role="group"
          aria-label="Time window"
          style={{
            ["--win" as string]: String(win),
            ["--win-n" as string]: String(WINDOWS.length),
          }}
        >
          <span className="bal-win-pill" aria-hidden="true" />
          {WINDOWS.map((label, i) => (
            <button
              key={label}
              className="bal-win-btn"
              data-on={win === i || undefined}
              aria-pressed={win === i}
              onClick={() => pickWindow(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

