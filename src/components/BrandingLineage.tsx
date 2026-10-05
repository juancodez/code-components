import { useRef, useState, useEffect, useCallback } from "react";
import imgDuolingo from "../../assets/image-6.webp";
import imgRevolut from "../../assets/image-8.webp";
import imgElevate from "../../assets/image-10.webp";
import imgNivins from "../../assets/nivins.png";
import imgRabbit from "../../assets/rabbit-hole-1.png";
import imgRaw from "../../assets/raw.png";
import imgImagery01 from "../../assets/imagery-01.png";
import imgImagery02 from "../../assets/imagery-02.png";
import imgImagery03 from "../../assets/imagery-03.png";
import imgTally from "../../assets/tally.png";
import imgUnsplash from "../../assets/unsplash_2t0RSGjBJC0.png";
import logoMcKinsey from "../../assets/McKinsey-logo.svg";
import logoBain from "../../assets/Logo-Bain-and-Company.svg";
import logoNuma from "../../assets/2024-numa-logo secundary white_vector 1.svg";
import logoSignet from "../../assets/LOGO-SIGNET-02 2.svg";
import logoMca from "../../assets/MCA-Logo-and-slogan.svg";

type NodeDef =
  | { id: string; kind: "image"; x: number; y: number; w: number; h: number; r?: number; src: string; caption?: string; panel?: "dark"; device?: boolean }
  | { id: string; kind: "label"; x: number; y: number; w: number; r?: number; lines: string[]; big?: boolean };

const VIEW_W = 1500;
const VIEW_H = 1480;

const FONT = "'Author', system-ui, sans-serif";

const PLAYFUL = new Set(["duolingo", "elevate", "nivins", "raw", "tally", "rabbit"]);
const CORPORATE = new Set(["revolut", "mckinsey", "bain", "numa", "signet", "img01", "img02", "img03", "unsplash"]);
const HYBRID = new Set(["mca"]);
const vibeOf = (id: string): "playful" | "corporate" | "hybrid" | null =>
  PLAYFUL.has(id) ? "playful" : CORPORATE.has(id) ? "corporate" : HYBRID.has(id) ? "hybrid" : null;

const NODES: NodeDef[] = [
  // GROUP TITLES
  { id: "gCompetitors", kind: "label", x: 40, y: 180, w: 320, r: -0.5, big: true, lines: ["Competitors"] },
  { id: "gLogos",       kind: "label", x: 820, y: 180, w: 420, r: 0.5, big: true, lines: ["Logos of the niche"] },
  { id: "gImagery",     kind: "label", x: 40, y: 820, w: 240, r: -0.5, big: true, lines: ["Imagery"] },
  { id: "gIllus",       kind: "label", x: 820, y: 820, w: 320, r: 0.5, big: true, lines: ["Illustrations"] },

  // COMPETITORS (phone screens — tall aspect, device framing)
  { id: "duolingo", kind: "image", x: 40,  y: 280, w: 230, h: 460, r: -1.5, src: imgDuolingo, caption: "Duolingo", device: true },
  { id: "revolut",  kind: "image", x: 290, y: 300, w: 230, h: 460, r:  1.2, src: imgRevolut,  caption: "Revolut",  device: true },
  { id: "elevate",  kind: "image", x: 540, y: 280, w: 230, h: 460, r: -2,   src: imgElevate,  caption: "Elevate",  device: true },

  // LOGOS OF THE NICHE
  { id: "mckinsey", kind: "image", x: 820,  y: 300, w: 280, h: 80,  r: -0.5, src: logoMcKinsey },
  { id: "bain",     kind: "image", x: 1160, y: 300, w: 280, h: 80,  r:  0.5, src: logoBain },
  { id: "numa",     kind: "image", x: 820,  y: 480, w: 300, h: 100, r:  0.5, src: logoNuma, panel: "dark" },
  { id: "signet",   kind: "image", x: 1180, y: 440, w: 240, h: 240, r: -1,   src: logoSignet },
  { id: "mca",      kind: "image", x: 870,  y: 640, w: 320, h: 90,  r:  0.8, src: logoMca },

  // IMAGERY (photos & references)
  { id: "img01",    kind: "image", x: 30,  y: 940,  w: 340, h: 250, r: -1.2, src: imgImagery01, caption: "Reference" },
  { id: "img02",    kind: "image", x: 390, y: 910,  w: 360, h: 265, r:  1,   src: imgImagery02, caption: "Reference" },
  { id: "img03",    kind: "image", x: 30,  y: 1210, w: 320, h: 230, r: -1.8, src: imgImagery03, caption: "Reference" },
  { id: "unsplash", kind: "image", x: 380, y: 1210, w: 370, h: 230, r:  1.4, src: imgUnsplash,  caption: "Reference" },

  // ILLUSTRATIONS (characters + concept art)
  { id: "rabbit",   kind: "image", x: 820,  y: 910,  w: 420, h: 320, r: -1,   src: imgRabbit, caption: "Rabbit hole" },
  { id: "nivins",   kind: "image", x: 1260, y: 910,  w: 200, h: 260, r:  1.5, src: imgNivins, caption: "Nivins" },
  { id: "raw",      kind: "image", x: 1250, y: 1200, w: 210, h: 240, r:  1.8, src: imgRaw,    caption: "Raw" },
  { id: "tally",    kind: "image", x: 900,  y: 1210, w: 200, h: 240, r:  2,   src: imgTally,  caption: "Tally" },
];


export function BrandingLineage() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState<string | null>(null);

  // per-node drag positions (overrides initial NODES.x/y)
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  // panning (background) + node drag share this ref
  const panState = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const nodeDrag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const viewPerPx = () => {
    const rect = svgRef.current?.getBoundingClientRect();
    return rect ? VIEW_W / rect.width : 1;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    panState.current = { x: e.clientX, y: e.clientY, tx, ty };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (nodeDrag.current) {
      const k = viewPerPx() / scale;
      const dx = (e.clientX - nodeDrag.current.sx) * k;
      const dy = (e.clientY - nodeDrag.current.sy) * k;
      const id = nodeDrag.current.id;
      setPositions(p => ({ ...p, [id]: { x: nodeDrag.current!.ox + dx, y: nodeDrag.current!.oy + dy } }));
      return;
    }
    if (!panState.current) return;
    const dx = e.clientX - panState.current.x;
    const dy = e.clientY - panState.current.y;
    setTx(panState.current.tx + dx);
    setTy(panState.current.ty + dy);
  };
  const onPointerUp = () => { panState.current = null; nodeDrag.current = null; };

  const startNodeDrag = (e: React.PointerEvent, n: NodeDef) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    const pos = positions[n.id] ?? { x: n.x, y: n.y };
    nodeDrag.current = { id: n.id, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
  };

  // zoom via wheel (ctrl) and buttons
  const zoomAt = useCallback((factor: number, cx?: number, cy?: number) => {
    setScale(s => {
      const ns = Math.max(0.4, Math.min(2.5, s * factor));
      if (cx != null && cy != null && svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const px = (cx - rect.left - tx) / s;
        const py = (cy - rect.top - ty) / s;
        setTx(cx - rect.left - px * ns);
        setTy(cy - rect.top - py * ns);
      }
      return ns;
    });
  }, [tx, ty]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${VIEW_W} / ${VIEW_H}`,
        maxHeight: "85vh",
        background: "#fff",
        border: "1px solid #e4e7ec",
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.12)",
        overflow: "hidden",
        color: "#1e1e1e",
        fontFamily: "inherit",
      }}
    >
      {/* board title — fixed overlay, not part of panning canvas */}
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", pointerEvents: "none", zIndex: 1 }}>
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: "#1d2939", letterSpacing: "-0.01em" }}>
          Branding Strategy Board
        </span>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ cursor: panState.current ? "grabbing" : "grab", display: "block", touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={e => e.preventDefault()}
      >
        <defs>
          <pattern id="bl-dot-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="12.5" cy="12.5" r="1.4" fill="#d5d0c8" />
          </pattern>
          <filter id="bl-postit-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.22"/>
          </filter>
        </defs>
        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <rect x={-3000} y={-2560} width={7500} height={6400} fill="url(#bl-dot-grid)" />

          {/* nodes */}
          {NODES.map(n => {
            const pos = positions[n.id] ?? { x: n.x, y: n.y };
            const common = {
              style: { cursor: "grab" as const },
              onPointerEnter: () => setHover(n.id),
              onPointerLeave: () => setHover(null),
              onPointerDown: (e: React.PointerEvent) => startNodeDrag(e, n),
              onClick: (e: React.MouseEvent) => e.preventDefault(),
              onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
            };
            if (n.kind === "image") {
              const cx = pos.x + n.w / 2, cy = pos.y + n.h / 2;
              const captionW = (n.caption?.length ?? 0) * 7 + 24;
              const isPhoto = !n.panel && !n.device;
              return (
                <g key={n.id} transform={`rotate(${n.r ?? 0} ${cx} ${cy})`} {...common}>
                  {n.panel === "dark" && (
                    <rect x={pos.x - 12} y={pos.y - 12} width={n.w + 24} height={n.h + 24} rx={12} fill="#1d2939" />
                  )}
                  {n.device && (
                    <rect x={pos.x - 10} y={pos.y - 10} width={n.w + 20} height={n.h + 20} rx={28} fill="#1d2939" />
                  )}
                  <foreignObject x={pos.x} y={pos.y} width={n.w} height={n.h} style={{ pointerEvents: "none", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${n.src})`,
                        backgroundSize: n.device || isPhoto ? "cover" : "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: isPhoto ? 6 : 0,
                        overflow: "hidden",
                      }}
                    />
                  </foreignObject>
                  {n.caption && (
                    <g transform={`translate(${cx} ${pos.y - 14})`}>
                      <rect x={-captionW / 2} y={-13} width={captionW} height={26} rx={13} fill="#fff" stroke="#d0d5dd" strokeWidth={1} />
                      <text textAnchor="middle" dominantBaseline="middle" y={1} style={{ fontFamily: FONT, fontSize: 13, fill: "#1d2939", userSelect: "none" }}>{n.caption}</text>
                    </g>
                  )}
                </g>
              );
            }
            // label
            if (n.big) {
              const cx = pos.x + n.w / 2, cy = pos.y + 20;
              return (
                <g key={n.id} transform={`rotate(${n.r ?? 0} ${cx} ${cy})`} {...common}>
                  {n.lines.map((ln, i) => (
                    <text key={i} x={pos.x} y={pos.y + 32 + i * 32} style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", fill: "#1d2939", userSelect: "none" }}>{ln}</text>
                  ))}
                </g>
              );
            }
            const lineH = 18;
            const h = n.lines.length * lineH + 14;
            const cx = pos.x + n.w / 2, cy = pos.y + h / 2;
            return (
              <g key={n.id} transform={`rotate(${n.r ?? 0} ${cx} ${cy})`} {...common}>
                <rect x={pos.x} y={pos.y} width={n.w} height={h} rx={6} fill="#fff" stroke="#d0d5dd" strokeWidth={1} />
                {n.lines.map((ln, i) => (
                  <text key={i} x={pos.x + 10} y={pos.y + 19 + i * lineH} style={{ fontFamily: FONT, fontSize: 13, fontWeight: 400, fill: "#1d2939", userSelect: "none" }}>{ln}</text>
                ))}
              </g>
            );
          })}

          {/* post-it: hover a node to reveal its tonality */}
          {hover && (() => {
            const n = NODES.find(x => x.id === hover);
            if (!n || n.kind !== "image") return null;
            const vibe = vibeOf(n.id);
            if (!vibe) return null;
            const pos = positions[n.id] ?? { x: n.x, y: n.y };
            const isHybrid = vibe === "hybrid";
            const bg = vibe === "playful" ? "#FFE87A" : vibe === "corporate" ? "#A6C8FF" : "#86EFAC";
            const lines = isHybrid ? ["playful", "corporate"] : [vibe === "playful" ? "playful" : "corporate"];
            const rot = vibe === "playful" ? -5 : vibe === "corporate" ? 4 : -3;
            const ph = isHybrid ? 130 : 110;
            const px = pos.x + n.w + 20;
            const py = pos.y + Math.max(0, (n.h - ph) / 2);
            return (
              <g transform={`rotate(${rot} ${px + 90} ${py + ph / 2})`} style={{ pointerEvents: "none" }}>
                <rect x={px} y={py} width={180} height={ph} fill={bg} filter="url(#bl-postit-shadow)" />
                {lines.map((ln, i) => (
                  <text key={i} x={px + 90} y={py + (isHybrid ? 55 + i * 36 : 65)} textAnchor="middle" style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, fill: "#1d2939" }}>{ln}</text>
                ))}
              </g>
            );
          })()}
        </g>
      </svg>

      <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, pointerEvents: "none" }}>
        <span style={{ fontFamily: FONT, fontSize: 10, color: "#1e1e1e", opacity: 0.65 }}>
          Hover an element to reveal its tonality · Drag any image to rearrange · Ctrl+scroll to zoom
        </span>
        <div style={{ display: "flex", gap: 4, flexShrink: 0, pointerEvents: "auto" }}>
          <button aria-label="Zoom out" onClick={() => zoomAt(1 / 1.2)} style={btnStyle}>−</button>
          <button aria-label="Zoom in" onClick={() => zoomAt(1.2)} style={btnStyle}>+</button>
          <button aria-label="Fullscreen" onClick={toggleFullscreen} style={btnStyle}>⛶</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 32, height: 32, background: "#fff", border: "1px solid #e4e7ec", borderRadius: 8,
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)", color: "#1d2939", fontSize: 15, lineHeight: 1,
  cursor: "pointer", fontFamily: FONT,
};
