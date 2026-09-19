import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./PhotoScatter.css";

// ─── swap these URLs with your own images ───────────────────────────────────
const PHOTOS = [
  "/juan-1.jpg",
  "https://images.unsplash.com/photo-1631561729243-9b3291efceae?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635434002329-8ab192fe01e1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1719586799413-3f42bb2a132d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1720561467986-ca3d408ca30b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1724403124996-64115f38cd3f?q=80&w=800&auto=format&fit=crop",
];
// ────────────────────────────────────────────────────────────────────────────

function ri(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function PhotoScatter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topZ = useRef(PHOTOS.length);
  const [zIndexes, setZIndexes] = useState(() => PHOTOS.map((_, i) => i + 1));

  const items = useRef(
    PHOTOS.map((url) => ({
      url,
      rotation: ri(-12, 12),
      w: 194,
      h: 247,
      x: ri(4, 75),
      y: ri(6, 65),
    }))
  );

  const bringToFront = (i: number) => {
    topZ.current += 1;
    const next = [...zIndexes];
    next[i] = topZ.current;
    setZIndexes(next);
  };

  return (
    <div className="photo-scatter" ref={containerRef}>
      <p className="photo-scatter-label">
        all your <strong>memories.</strong>
      </p>
      {items.current.map((item, i) => (
        <motion.div
          key={i}
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={containerRef}
          className="photo-frame"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.w,
            height: item.h,
            rotate: item.rotation,
            zIndex: zIndexes[i],
          }}
          onDragStart={() => bringToFront(i)}
          whileDrag={{ scale: 1.05 }}
        >
          <img
            src={item.url}
            alt={`Photo ${i + 1}`}
            className="photo-img"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}
