import { useState, useRef, useCallback } from "react";

interface BeforeAfterProps {
  before?: string;
  after?: string;
  aspect?: string;
}

export function BeforeAfter({ before, after, aspect = "4/3" }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; updatePos(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchStart = (e: React.TouchEvent) => { dragging.current = true; updatePos(e.touches[0].clientX); };
  const onTouchMove  = (e: React.TouchEvent) => { if (dragging.current) updatePos(e.touches[0].clientX); };
  const onTouchEnd   = () => { dragging.current = false; };

  return (
    <div
      ref={containerRef}
      className="ba-wrap"
      style={{ aspectRatio: aspect }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Before — base layer */}
      <div
        className="ba-layer ba-before"
        style={before ? { backgroundImage: `url(${before})` } : undefined}
      />

      {/* After — clipped from the left, shrinks as handle moves right */}
      <div className="ba-after-clip" style={{ width: `${pos}%` }}>
        <div
          className="ba-layer ba-after"
          style={after ? { backgroundImage: `url(${after})` } : undefined}
        />
      </div>

      {/* Labels */}
      <span className="ba-tag" style={{ left: 12 }}>After</span>
      <span className="ba-tag" style={{ right: 12 }}>Before</span>

      {/* Handle */}
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-handle-line" />
        <div className="ba-handle-knob">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 9H2M2 9L4.5 6.5M2 9L4.5 11.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9H16M16 9L13.5 6.5M16 9L13.5 11.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
