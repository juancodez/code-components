import { useState, useRef, useCallback } from "react";

// ── Real SVG assets (paths inlined) ─────────────────────────────────────────

function Signet({ size = 32 }: { size?: number }) {
  const h = Math.round(size * 31 / 32);
  return (
    <svg width={size} height={h} viewBox="0 0 32 31" fill="none">
      <rect width="32" height="30.3158" fill="white" />
      <path d="M3 22.1852L5.53825 17.7767H9.74772C12.5097 17.7767 14.845 19.8213 15.2101 22.5591L15.6746 26.0427H10.1639L9.36952 24.1892C8.84849 22.9735 7.6531 22.1852 6.33045 22.1852H3Z" fill="#0047C1" />
      <path d="M28.3491 22.1852L25.8109 17.7767H21.6014C18.8394 17.7767 16.5041 19.8213 16.1391 22.5591L15.6746 26.0427H21.1852L21.9796 24.1892C22.5006 22.9735 23.696 22.1852 25.0187 22.1852H28.3491Z" fill="#0047C1" />
      <path d="M5.53827 17.7767L13.4702 4H15.6746L15.4559 9.2484C15.2672 13.7763 11.6768 17.4238 7.15252 17.6839L5.53827 17.7767Z" fill="#0047C1" />
      <path d="M25.8109 17.7767L17.8789 4H15.6746L15.8932 9.2484C16.0819 13.7763 19.6723 17.4238 24.1966 17.6839L25.8109 17.7767Z" fill="#0047C1" />
    </svg>
  );
}

function Logotype({ width = 64 }: { width?: number }) {
  const h = Math.round(width * 30 / 64);
  return (
    <svg width={width} height={h} viewBox="0 0 64 30" fill="none">
      <rect width="64" height="30" fill="white" />
      <path d="M14.436 11.0741C13.9989 11.0741 13.6633 10.9648 13.4292 10.7463C13.195 10.5122 13.0779 10.1141 13.0779 9.55216V8.24096H7.52875V14.3755H12.4458C12.6643 14.3755 12.8282 14.4458 12.9375 14.5862C13.0467 14.7111 13.1014 14.8594 13.1014 15.0311C13.1014 15.1872 13.0311 15.3355 12.8906 15.476C12.7658 15.6009 12.6175 15.6633 12.4458 15.6633H7.52875V22.3598H13.4292V21.0486C13.4292 20.4867 13.5462 20.0964 13.7804 19.8779C14.0145 19.6437 14.3501 19.5267 14.7872 19.5267C15.4584 19.5267 15.794 19.9169 15.794 20.6974V22.7344C15.794 23.0779 15.6691 23.312 15.4194 23.4369C15.1852 23.5461 14.8418 23.6008 14.3892 23.6008H6.07706C5.35902 23.6008 5 23.2105 5 22.4301V8.17072C5 7.39024 5.35902 7 6.07706 7H14.0379C14.4906 7 14.834 7.05463 15.0682 7.1639C15.3179 7.27317 15.4428 7.50731 15.4428 7.86633V9.90338C15.4428 10.6839 15.1072 11.0741 14.436 11.0741Z" fill="black" />
      <path d="M26.9998 8.24096C27.4993 7.41365 27.9988 7 28.4983 7C28.67 7 28.8261 7.05463 28.9666 7.1639C29.1227 7.25756 29.2007 7.39024 29.2007 7.56194C29.2007 7.6556 29.1773 7.76487 29.1305 7.88975C29.0993 8.01462 29.0368 8.1395 28.9432 8.26438L25.0096 14.6565L29.6222 22.1959C29.7471 22.3988 29.8095 22.6174 29.8095 22.8515C29.8095 23.0544 29.7237 23.2339 29.5519 23.39C29.3959 23.5305 29.1773 23.6008 28.8963 23.6008C28.4125 23.6008 28.0378 23.5071 27.7725 23.3198C27.5071 23.1169 27.2495 22.8047 26.9998 22.3832L23.4876 16.4126H23.394L19.7179 22.3364C19.3745 22.914 19.0779 23.273 18.8282 23.4135C18.5784 23.5383 18.3443 23.6008 18.1257 23.6008C17.876 23.6008 17.6965 23.5461 17.5872 23.4369C17.478 23.3276 17.4233 23.2105 17.4233 23.0857C17.4233 22.9608 17.4467 22.8281 17.4936 22.6876C17.556 22.5471 17.6184 22.4301 17.6809 22.3364L22.3637 15.0311L18.3599 8.35803C18.2506 8.18633 18.196 7.99901 18.196 7.79609C18.196 7.57756 18.2818 7.39024 18.4535 7.23414C18.6409 7.07805 18.8594 7 19.1092 7C19.5618 7 19.9287 7.11707 20.2096 7.35122C20.4906 7.58536 20.7325 7.88194 20.9355 8.24096L23.8623 13.4389H24.0027L26.9998 8.24096Z" fill="black" />
      <path d="M42.0521 19.2223C42.7233 19.2223 43.0589 19.6125 43.0589 20.393V22.8515C43.0589 23.1325 42.934 23.3276 42.6843 23.4369C42.4501 23.5461 42.1067 23.6008 41.6541 23.6008H33.9273C33.2093 23.6008 32.8503 23.2105 32.8503 22.4301V8.17072C32.8503 7.73365 32.9283 7.42926 33.0844 7.25756C33.2561 7.08585 33.5215 7 33.8805 7C34.8795 7 35.379 7.60097 35.379 8.80291V22.3598H40.6941V20.7442C40.6941 20.1823 40.8111 19.792 41.0453 19.5735C41.2794 19.3394 41.615 19.2223 42.0521 19.2223Z" fill="black" />
      <path d="M58.9516 15.3121C58.9516 15.8272 58.9048 16.4438 58.8111 17.1618C58.7174 17.8643 58.5301 18.5901 58.2492 19.3394C57.9838 20.0886 57.5858 20.7832 57.055 21.4232C56.5399 22.0632 55.8531 22.5862 54.9946 22.992C54.136 23.3978 53.0668 23.6008 51.7868 23.6008C50.5068 23.6008 49.4376 23.3978 48.579 22.992C47.7205 22.5862 47.0337 22.0632 46.5186 21.4232C46.0035 20.7832 45.6054 20.0886 45.3244 19.3394C45.0591 18.5901 44.8796 17.8643 44.7859 17.1618C44.7079 16.4438 44.6688 15.8272 44.6688 15.3121C44.6688 14.8126 44.7079 14.2116 44.7859 13.5092C44.8796 12.7911 45.0591 12.0575 45.3244 11.3082C45.6054 10.559 46.0035 9.85655 46.5186 9.20095C47.0337 8.54535 47.7205 8.01462 48.579 7.60877C49.4376 7.20292 50.5068 7 51.7868 7C53.0668 7 54.136 7.20292 54.9946 7.60877C55.8531 8.01462 56.5399 8.54535 57.055 9.20095C57.5858 9.85655 57.9838 10.559 58.2492 11.3082C58.5301 12.0575 58.7174 12.7911 58.8111 13.5092C58.9048 14.2116 58.9516 14.8126 58.9516 15.3121ZM56.3058 15.3121C56.3058 14.8438 56.2746 14.2975 56.2121 13.6731C56.1653 13.0487 56.056 12.4243 55.8843 11.7999C55.7282 11.1599 55.4863 10.5668 55.1585 10.0205C54.8307 9.47412 54.3936 9.03705 53.8473 8.70925C53.3009 8.36584 52.6141 8.19413 51.7868 8.19413C50.9751 8.19413 50.2961 8.36584 49.7498 8.70925C49.219 9.03705 48.7898 9.47412 48.462 10.0205C48.1342 10.5668 47.8844 11.1599 47.7127 11.7999C47.5566 12.4243 47.4473 13.0487 47.3849 13.6731C47.3381 14.2975 47.3147 14.8438 47.3147 15.3121C47.3147 15.7804 47.3381 16.3267 47.3849 16.9511C47.4473 17.5599 47.5566 18.1843 47.7127 18.8242C47.8844 19.4642 48.1342 20.0574 48.462 20.6037C48.7898 21.1345 49.219 21.5715 49.7498 21.9149C50.2961 22.2427 50.9751 22.4066 51.7868 22.4066C52.6141 22.4066 53.3009 22.2427 53.8473 21.9149C54.3936 21.5715 54.8307 21.1345 55.1585 20.6037C55.4863 20.0574 55.7282 19.4642 55.8843 18.8242C56.056 18.1843 56.1653 17.5599 56.2121 16.9511C56.2746 16.3267 56.3058 15.7804 56.3058 15.3121Z" fill="black" />
    </svg>
  );
}

// ── Frame config ─────────────────────────────────────────────────────────────

type FrameId = "signet" | "logotype";

const FRAME_INIT: Record<FrameId, { x: number; y: number }> = {
  signet:   { x: 28,  y: 70 },
  logotype: { x: 110, y: 82 },
};

// ── Formats ──────────────────────────────────────────────────────────────────

const FORMATS = [
  { key: "SVG",    tag: "vector" },
  { key: "PDF",    tag: "print"  },
  { key: "PNG 1×", tag: "raster" },
  { key: "PNG 2×", tag: "retina" },
  { key: "JPG",    tag: "photo"  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function stop(e: React.MouseEvent) { e.preventDefault(); e.stopPropagation(); }

function CheckMark() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() { return <span className="exlo-spinner" />; }

// ── Main component ───────────────────────────────────────────────────────────

export function ExloPrototype() {
  const [positions, setPositions] = useState({ ...FRAME_INIT });
  const [selected, setSelected] = useState<Set<FrameId>>(new Set(["signet"]));
  const [formats, setFormats] = useState(new Set(["SVG", "PDF", "PNG 1×"]));
  const [exportState, setExportState] = useState<"idle" | "exporting" | "done">("idle");

  const drag = useRef<{
    id: FrameId;
    startX: number; startY: number;
    origX: number; origY: number;
    moved: boolean;
  } | null>(null);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const onFrameDown = useCallback((id: FrameId, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    drag.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: positions[id].x,
      origY: positions[id].y,
      moved: false,
    };
  }, [positions]);

  const onCanvasMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.current.moved = true;
    setPositions(prev => ({
      ...prev,
      [drag.current!.id]: {
        x: drag.current!.origX + dx,
        y: drag.current!.origY + dy,
      },
    }));
  }, []);

  // Frame mouseup — Figma selection rules:
  //   plain click  → select only this frame
  //   shift+click  → add/remove from current selection
  const onFrameUp = useCallback((id: FrameId, e: React.MouseEvent) => {
    e.stopPropagation(); // don't let canvas also handle this
    if (drag.current && !drag.current.moved) {
      if (e.shiftKey) {
        setSelected(prev => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      } else {
        setSelected(new Set([id]));
      }
      setExportState("idle");
    }
    drag.current = null;
  }, []);

  // Canvas background mouseup — click on empty space deselects all
  const onCanvasBgUp = useCallback(() => {
    if (drag.current && !drag.current.moved) {
      setSelected(new Set());
    }
    drag.current = null;
  }, []);

  // ── Format toggle ──────────────────────────────────────────────────────────
  const toggleFmt = useCallback((key: string, e: React.MouseEvent) => {
    stop(e);
    setFormats(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
    setExportState("idle");
  }, []);

  // ── Export ─────────────────────────────────────────────────────────────────
  const handleExport = useCallback((e: React.MouseEvent) => {
    stop(e);
    if (exportState !== "idle") return;
    setExportState("exporting");
    setTimeout(() => setExportState("done"), 1400);
  }, [exportState]);

  const selCount = selected.size;
  const fmtCount = formats.size;
  const disabled = selCount === 0 || fmtCount === 0;

  return (
    <div className="exlo-proto">

      {/* ── Figma canvas ── */}
      <div
        className="exlo-canvas"
        onMouseMove={onCanvasMove}
        onMouseUp={onCanvasBgUp}
        onMouseLeave={() => { drag.current = null; }}
      >
        {/* Signet frame */}
        <div
          className="exlo-figma-frame"
          style={{ left: positions.signet.x, top: positions.signet.y }}
          onMouseDown={e => onFrameDown("signet", e)}
          onMouseUp={e => onFrameUp("signet", e)}
        >
          <span className={`exlo-figma-label ${selected.has("signet") ? "exlo-figma-label-sel" : ""}`}>Signet</span>
          <div className={`exlo-figma-thumb ${selected.has("signet") ? "exlo-sel" : ""}`}>
            <Signet size={48} />
          </div>
        </div>

        {/* Logotype frame */}
        <div
          className="exlo-figma-frame"
          style={{ left: positions.logotype.x, top: positions.logotype.y }}
          onMouseDown={e => onFrameDown("logotype", e)}
          onMouseUp={e => onFrameUp("logotype", e)}
        >
          <span className={`exlo-figma-label ${selected.has("logotype") ? "exlo-figma-label-sel" : ""}`}>Logotype</span>
          <div className={`exlo-figma-thumb ${selected.has("logotype") ? "exlo-sel" : ""}`}>
            <Logotype width={96} />
          </div>
        </div>
      </div>

      {/* ── Plugin panel ── */}
      <div className="exlo-panel">
        <div className="exlo-panel-head">
          <Signet size={16} />
          <span className="exlo-panel-title">EXLO</span>
        </div>

        <p className="exlo-panel-desc">
          {selCount === 0
            ? "Select frames to export"
            : `${selCount} frame${selCount !== 1 ? "s" : ""} selected`}
        </p>

        <div className="exlo-formats">
          {FORMATS.map(({ key, tag }) => (
            <label
              key={key}
              className={`exlo-fmt ${formats.has(key) ? "exlo-fmt-on" : ""}`}
              onClick={e => toggleFmt(key, e)}
            >
              <span className="exlo-fmt-box">{formats.has(key) && <CheckMark />}</span>
              <span className="exlo-fmt-key">{key}</span>
              <span className="exlo-fmt-tag">{tag}</span>
            </label>
          ))}
        </div>

        <button
          className={`exlo-export-btn exlo-export-${exportState}`}
          onClick={handleExport}
          disabled={disabled}
        >
          {exportState === "idle"      && (disabled ? "Export selection" : `Export · ${fmtCount} format${fmtCount !== 1 ? "s" : ""}`)}
          {exportState === "exporting" && <><Spinner /> Packing ZIP…</>}
          {exportState === "done"      && "Done ✓"}
        </button>
      </div>
    </div>
  );
}
