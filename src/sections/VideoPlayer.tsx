import { useState } from "react";
import "./VideoPlayer.css";

// ─── add third video when ready ───────────────────────────────────────────────
const VIDEOS = [
  { src: "/treflip.mp4",    label: "01" },
  { src: "/juan-signal.mp4", label: "02" },
];
// ─────────────────────────────────────────────────────────────────────────────

export function VideoPlayer() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="vp-card">
      <div className="vp-frame">
        <video
          key={VIDEOS[idx].src}
          src={VIDEOS[idx].src}
          controls
          playsInline
        />
      </div>

      <div className="vp-tabs">
        {VIDEOS.map((v, i) => (
          <button
            key={i}
            className={"vp-tab" + (i === idx ? " vp-tab-active" : "")}
            onClick={() => setIdx(i)}
            aria-label={`Video ${i + 1}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
