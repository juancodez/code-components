import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./PullToRefresh.css";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* Rubber, not a rail. A linear pull reaches the threshold at
   exactly the threshold and tells you nothing on the way;
   this saturates, so the last twenty pixels cost more than
   the first twenty and RESISTANCE is what you feel rather
   than distance. */
const rubber = (raw: number, resistance: number) => {
  const R = 700 - (resistance / 100) * 380;
  return raw <= 0 ? 0 : (R * raw) / (R + raw);
};

/* THE PART THAT MATTERS: the commitment happens at a
   DISTANCE, not on release. Crossing the threshold is what
   arms the refresh, so you know it will happen while your
   finger is still down — let go after that and it goes, and
   you knew. A version that decides on release has hidden the
   only information the gesture carries. */
const THRESHOLD = 90;
const WORK_MS = 1400;

type Phase = "rest" | "pull" | "work";

export type PullToRefreshHandle = {
  demo: () => void;
};

type Props = {
  /* the viewport corner, and the pill with it — 0 to 40 */
  corner?: number;
  /* how fast the ring turns while it works — 0 to 100 */
  spin?: number;
  /* marks in the loading wheel — 3 to 10 */
  dots?: number;
  /* rubberiness of the pull — 0 to 100 */
  resistance?: number;
  /* light/dark surface */
  fill?: "light" | "dark";
  onThreshold?: () => void;
  onWorkStart?: () => void;
  onWorkEnd?: () => void;
};

export const PullToRefresh = forwardRef<PullToRefreshHandle, Props>(function PullToRefresh(
  { corner = 18, spin = 50, dots = 6, resistance = 50, fill = "light",
    onThreshold, onWorkStart, onWorkEnd },
  ref
) {
  const [phase, setPhase] = useState<Phase>("rest");
  const [pullY, setPullY] = useState(0);
  const armedRef = useRef(false);
  const dragStart = useRef(0);

  const drawn = rubber(pullY, resistance);
  const p = clamp(drawn / THRESHOLD, 0, 1);
  const armed = p >= 1;

  /* Fire onThreshold once on the crossing itself, not on every
     pixel above it — the commitment IS the moment. */
  useEffect(() => {
    if (armed && !armedRef.current) {
      armedRef.current = true;
      onThreshold?.();
    } else if (!armed && armedRef.current) {
      armedRef.current = false;
    }
  }, [armed, onThreshold]);

  /* seconds per rotation. 50 = the tuned 1s, faster on either
     side of that. */
  const rpm = 1.6 - (spin / 100) * 1.2;

  const commitOrCancel = () => {
    if (armed) {
      onWorkStart?.();
      setPhase("work");
      setPullY(0);
      window.setTimeout(() => {
        setPhase("rest");
        onWorkEnd?.();
      }, WORK_MS);
    } else {
      setPhase("rest");
      setPullY(0);
    }
  };

  const onDown = (e: React.PointerEvent) => {
    if (phase === "work") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = e.clientY;
    setPhase("pull");
  };
  const onMove = (e: React.PointerEvent) => {
    if (phase !== "pull") return;
    const delta = Math.max(0, e.clientY - dragStart.current);
    setPullY(delta);
  };
  const onUp = (e: React.PointerEvent) => {
    if (phase !== "pull") return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    commitOrCancel();
  };

  /* Demo: fake a pull-past-threshold, hold for a beat, release.
     Same code path as a real pull — the demo is the animation,
     not a special mode. */
  useImperativeHandle(ref, () => ({
    demo: () => {
      if (phase === "work") return;
      setPhase("pull");
      const t0 = performance.now();
      const target = 140; /* past THRESHOLD post-rubber */
      const durationUp = 750;
      const step = () => {
        const t = clamp((performance.now() - t0) / durationUp, 0, 1);
        /* ease-out-cubic on the way down */
        setPullY(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
        else {
          /* dwell in the armed state so the fusion is legible */
          window.setTimeout(() => {
            onWorkStart?.();
            setPhase("work");
            setPullY(0);
            window.setTimeout(() => {
              setPhase("rest");
              onWorkEnd?.();
            }, WORK_MS);
          }, 320);
        }
      };
      requestAnimationFrame(step);
    },
  }));

  const marks = Array.from({ length: dots }, (_, i) => i);
  /* THE GOO IS THE COMMITMENT, not a decoration on it. Droplets
     sit scattered at rest and are drawn together as you pull;
     crossing the threshold is the moment they touch and fuse
     into one body. One number does it: */
  const spread = 20 - p * 17.5;

  return (
    <div
      className={`pull pull-${fill}`}
      data-phase={phase}
      style={{
        ["--corner" as string]: `${clamp(corner, 0, 40)}px`,
        ["--rpm" as string]: `${rpm}s`,
        ["--spread" as string]: `${spread}px`,
      }}
    >
      {/* SVG goo filter — makes close dots fuse into one blob.
          feColorMatrix contrasts alpha so the anti-aliased edges
          snap into a solid silhouette; this is what makes the
          droplets read as ONE THING when they meet. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="pull-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* The viewport is a fixed rounded rect; the pull moves the
          CONTENT beneath a mask, revealing the pill above. Sizing
          the viewport to the content would let the block resize
          under the finger, which no scroll surface ever does. */}
      <div
        className="pull-viewport"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {/* the pill sits ABOVE the viewport, revealed as content
            slides down */}
        <div
          className="pull-pill"
          aria-hidden={phase === "rest"}
          style={{
            transform: `translate(-50%, ${(phase === "pull" ? drawn : phase === "work" ? 20 : -20)}px)`,
            opacity: phase === "rest" ? 0 : 1,
          }}
        >
          <div className="pull-goo">
            {marks.map((i) => {
              const angle = (i / dots) * 360;
              return (
                <span
                  key={i}
                  className="pull-drop"
                  style={{ ["--a" as string]: `${angle}deg` }}
                />
              );
            })}
          </div>
        </div>

        <div
          className="pull-scroll"
          style={{
            transform: phase === "pull"
              ? `translateY(${drawn}px)`
              : phase === "work"
                ? `translateY(40px)`
                : `translateY(0)`,
          }}
        >
          <div className="pull-line" />
          <div className="pull-line short" />
          <div className="pull-line" />
          <div className="pull-line short" />
          <div className="pull-line" />
          <div className="pull-line short" />
        </div>
      </div>
    </div>
  );
});
