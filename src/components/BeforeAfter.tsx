import { useState, useRef, useCallback } from "react";

interface BeforeAfterProps {
  before?: string;
  after?: string;
  aspect?: string;
}

export function BeforeAfter({ before, after, aspect = "16/9" }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragging.current) updatePos(e.clientX); };
  const onPointerUp   = () => { dragging.current = false; };

  const dimLeft  = Math.max(0, (50 - pos) / 50) * 0.65;
  const dimRight = Math.max(0, (pos - 50) / 50) * 0.65;
  const fade     = 16;
  const opL = pos < fade ? pos / fade : 1;
  const opR = pos > 100 - fade ? (100 - pos) / fade : 1;

  return (
    <div
      ref={containerRef}
      className="ba-wrap"
      style={{}}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {after
        ? <img className="ba-after-img" src={after} alt="After" draggable={false} />
        : <div className="ba-after-placeholder" />
      }

      <div className="ba-dim-right" style={{ width: `${100 - pos}%`, background: `rgba(15,12,46,${dimRight.toFixed(3)})` }} />

      <div className="ba-before-full" style={{ clipPath: `inset(0 ${(100 - pos).toFixed(2)}% 0 0)` }}>
        {before
          ? <img src={before} alt="Before" draggable={false} />
          : <div className="ba-before-placeholder" />
        }
      </div>

      <div className="ba-dim-left" style={{ width: `${pos}%`, background: `rgba(15,12,46,${dimLeft.toFixed(3)})` }} />

      <span className="ba-tag ba-tag--left"  style={{ opacity: opL }}>Before</span>
      <span className="ba-tag ba-tag--right" style={{ opacity: opR }}>After</span>

      <div className="ba-line"   style={{ left: `${pos}%` }} />
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2L1 7l3 5M10 2l3 5-3 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
