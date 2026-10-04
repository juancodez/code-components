import { useRef, useEffect, useState } from "react";

const W = 800, H = 460;
const SIDE = 46;
const PAD = { w: 10, h: 72, r: 5 };
const BALL_R = 7;
const GAME_H = H - 96;
const BASE_SPEED = 5;
const GRID = 28;

const QUESTIONS = [
  { q: "Core Purpose and Mission",  a: "Build better decision makers" },
  { q: "Core Values",               a: "Competition improves quality and decision making" },
  { q: "Admired Brands and Apps",   a: "Revolut, Duolingo, Elevate" },
  { q: "Definition of Success",     a: "Clean UI, 3-step access to cases, scalable to other products" },
];

const C = {
  bg:      "#f2f2f0",
  dot:     "rgba(0,0,0,0.065)",
  center:  "rgba(0,0,0,0.05)",
  pad:     "#1d2939",
  ball:    "#93c5fd",
  bracket: "#93c5fd",
  textDim: "rgba(0,0,0,0.28)",
  dim:     "rgba(242,242,240,0.86)",
};

type GameState = "idle" | "playing" | "win" | "lose";
type Phase = "waiting" | "asking" | "answered";
type Display = null | { type: "q" | "a"; qIdx: number };

interface UiState {
  gameState: GameState;
  filledBars: number;
  display: Display;
}

export function DiscoveryPong() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const g = useRef({
    bx: W / 2, by: GAME_H / 2,
    bvx: BASE_SPEED, bvy: BASE_SPEED * 0.3,
    ly: GAME_H / 2 - PAD.h / 2,
    ry: GAME_H / 2 - PAD.h / 2,
    mouseY: GAME_H / 2,
    qIdx: 0,
    filledBars: 0,
    phase: "waiting" as Phase,
    state: "idle" as GameState,
  });

  const [ui, setUi] = useState<UiState>({
    gameState: "idle",
    filledBars: 0,
    display: null,
  });

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function drawDotGrid() {
      ctx.fillStyle = C.dot;
      for (let x = GRID; x < W; x += GRID)
        for (let y = GRID; y < GAME_H; y += GRID) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }
    }

    function drawLabel(text: string, cx: number, paddleY: number) {
      ctx.save();
      ctx.translate(cx, paddleY + PAD.h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = "600 13px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.toUpperCase(), 0, 0);
      ctx.restore();
    }

    function draw() {
      const { bx, by, ly, ry, state } = g.current;

      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      drawDotGrid();

      ctx.save();
      ctx.setLineDash([4, 12]);
      ctx.strokeStyle = C.center;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, GAME_H); ctx.stroke();
      ctx.restore();

      drawLabel("Shankar", 18, ly);
      drawLabel("Me", W - 18, ry);

      ctx.fillStyle = C.pad;
      ctx.beginPath(); (ctx as any).roundRect(SIDE - PAD.w, ly, PAD.w, PAD.h, PAD.r); ctx.fill();
      ctx.beginPath(); (ctx as any).roundRect(W - SIDE, ry, PAD.w, PAD.h, PAD.r); ctx.fill();

      if (state === "playing") {
        ctx.beginPath(); ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
        ctx.fillStyle = C.ball; ctx.fill();
      }

      if (state !== "playing") {
        ctx.fillStyle = C.dim;
        ctx.fillRect(0, 0, W, GAME_H);
        if (state === "idle") {
          ctx.font = "500 13px 'Space Grotesk', sans-serif";
          ctx.fillStyle = C.textDim;
          ctx.textAlign = "center";
          ctx.textBaseline = "alphabetic";
          ctx.fillText("CLICK OR PRESS ANY KEY TO START", W / 2, GAME_H / 2 + 5);
        }
      }
    }

    function launch() {
      const s = g.current;
      s.bx = W / 2; s.by = GAME_H / 2;
      s.bvx = BASE_SPEED;
      s.bvy = (Math.random() * 2 - 1) * BASE_SPEED * 0.4;
      s.qIdx = 0; s.filledBars = 0; s.phase = "waiting";
      s.ly = GAME_H / 2 - PAD.h / 2;
      s.ry = GAME_H / 2 - PAD.h / 2;
      s.state = "playing";
      setUi({ gameState: "playing", filledBars: 0, display: null });
    }

    function tick() {
      const s = g.current;

      if (s.state === "playing") {
        const aiTarget = s.by - PAD.h / 2;
        s.ly += Math.sign(aiTarget - s.ly) * Math.min(Math.abs(aiTarget - s.ly), 3.6);
        s.ly = Math.max(0, Math.min(GAME_H - PAD.h, s.ly));

        s.ry += (s.mouseY - PAD.h / 2 - s.ry) * 0.14;
        s.ry = Math.max(0, Math.min(GAME_H - PAD.h, s.ry));

        s.bx += s.bvx; s.by += s.bvy;

        if (s.by - BALL_R <= 0)      { s.by = BALL_R;          s.bvy =  Math.abs(s.bvy); }
        if (s.by + BALL_R >= GAME_H) { s.by = GAME_H - BALL_R; s.bvy = -Math.abs(s.bvy); }

        const lx = SIDE - PAD.w;
        // Shankar (left paddle) returns → answer appears
        if (s.bvx < 0 && s.bx - BALL_R <= lx + PAD.w && s.by >= s.ly && s.by <= s.ly + PAD.h) {
          s.bx = lx + PAD.w + BALL_R;
          s.bvx = Math.abs(s.bvx) * 1.04;
          s.bvy = ((s.by - s.ly - PAD.h / 2) / (PAD.h / 2)) * BASE_SPEED * 0.75;
          if (s.phase === "asking" && s.qIdx < QUESTIONS.length) {
            const answered = s.qIdx;
            s.filledBars++;
            s.qIdx++;
            s.phase = "answered";
            if (s.qIdx >= QUESTIONS.length) {
              s.state = "win";
              setUi({ gameState: "win", filledBars: s.filledBars, display: { type: "a", qIdx: answered } });
            } else {
              setUi(u => ({ ...u, filledBars: s.filledBars, display: { type: "a", qIdx: answered } }));
            }
          }
        }

        const rx = W - SIDE;
        // Me (right paddle) hits → question appears
        if (s.bvx > 0 && s.bx + BALL_R >= rx && s.by >= s.ry && s.by <= s.ry + PAD.h) {
          s.bx = rx - BALL_R;
          s.bvx = -(Math.abs(s.bvx) * 1.04);
          s.bvy = ((s.by - s.ry - PAD.h / 2) / (PAD.h / 2)) * BASE_SPEED * 0.75;
          if (s.qIdx < QUESTIONS.length) {
            s.phase = "asking";
            setUi(u => ({ ...u, display: { type: "q", qIdx: s.qIdx } }));
          }
        }

        const spd = Math.hypot(s.bvx, s.bvy);
        if (spd > BASE_SPEED * 2.2) { s.bvx = (s.bvx / spd) * BASE_SPEED * 2.2; s.bvy = (s.bvy / spd) * BASE_SPEED * 2.2; }

        // Shankar misses — just reset, no penalty
        if (s.bx < 0) {
          if (s.phase === "asking") s.phase = "waiting";
          s.bx = W / 2; s.by = GAME_H / 2; s.bvx = BASE_SPEED; s.bvy = (Math.random() * 2 - 1) * BASE_SPEED * 0.4;
        }

        // Me misses — immediate lose
        if (s.bx > W) {
          s.state = "lose";
          setUi(u => ({ ...u, gameState: "lose" }));
        }
      }

      draw();
      raf.current = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      g.current.mouseY = (e.clientY - rect.top) * (H / rect.height);
    };
    const onStart = () => { if (g.current.state !== "playing") launch(); };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onStart);
    window.addEventListener("keydown", onStart);
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onStart);
      window.removeEventListener("keydown", onStart);
    };
  }, []);

  const isOver = ui.gameState === "win" || ui.gameState === "lose";

  const displayInfo = ui.display !== null ? (() => {
    const { type, qIdx } = ui.display;
    const { q, a } = QUESTIONS[qIdx];
    return {
      label: type === "q" ? "QUESTION" : q.toUpperCase(),
      text: type === "q" ? q : a,
    };
  })() : null;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: W, borderRadius: 16, overflow: "hidden", cursor: "none", border: "1px solid rgba(0,0,0,0.07)" }}>
      <canvas
        ref={cvs}
        width={W}
        height={H}
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Discovery session: Shankar vs Me"
        tabIndex={0}
      />

      {/* Q&A text */}
      {ui.gameState !== "idle" && displayInfo && (
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: "calc(14px + 4px + 14px)",
          textAlign: "center",
          pointerEvents: "none",
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(0,0,0,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
            {displayInfo.label}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1d2939" }}>
            {displayInfo.text}
          </div>
        </div>
      )}

      {/* Win / Lose overlay */}
      {isOver && (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            left: "clamp(88px, 16vw, 132px)",
            right: "clamp(88px, 16vw, 132px)",
            top: 0,
            height: `${(GAME_H / H) * 100}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div>
            <div
              className="pong-win-msg"
              style={{
                color: ui.gameState === "win" ? "#16a34a" : "#dc2626",
                fontSize: "clamp(16px, 3vw, 26px)",
                fontWeight: 700,
                lineHeight: 1.12,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {ui.gameState === "win"
                ? "We are ready to start!"
                : "We need more information!"}
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 22,
                padding: "8px 12px",
                background: "#1d2939",
                color: "#f2f2f0",
                fontFamily: "'Roboto Mono', monospace",
                fontSize: "clamp(10px, 1.8vw, 13px)",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              CLICK OR PRESS ANY KEY TO PLAY AGAIN
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {ui.gameState !== "idle" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "clamp(88px, 12vw, 140px)",
            right: "clamp(88px, 12vw, 140px)",
            bottom: 14,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            pointerEvents: "none",
          }}
        >
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              title={`${q.q}: ${q.a}`}
              style={{
                width: 32, height: 4, border: 0,
                background: ui.filledBars > i ? "#93c5fd" : "rgba(0,0,0,0.12)",
                transition: "background 400ms ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
