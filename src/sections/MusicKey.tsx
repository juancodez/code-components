import { useState } from "react";
import { MusicPlayer } from "./MusicPlayer";
import "./MusicKey.css";

const TRACKS = [
  { title: "Sense of Style", artist: "Marsolo", thumb: "/marsolo-sense-of-style.png" },
  { title: "Only You",        artist: "Steve Monite", thumb: "/steve-monite-only-you.png" },
  { title: "Cybernetic Love", artist: "Casco",        thumb: "/casco.png" },
];

export function MusicKey() {
  const [open, setOpen] = useState(false);
  const [trackIdx] = useState(0);
  const track = TRACKS[trackIdx];

  return (
    <div className="mkey">
      {/* full player — always in DOM so playback state is preserved */}
      <div className={`mkey-popup${open ? " mkey-popup-open" : ""}`}>
        <MusicPlayer />
      </div>

      <button
        className={`mkey-trigger${open ? " mkey-trigger-open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={open ? "Close music player" : "Open music player"}
      >
        <img src={track.thumb} alt="" className="mkey-art" />
        <div className="mkey-info">
          <span className="mkey-title">{track.title}</span>
          <span className="mkey-artist">{track.artist}</span>
        </div>
        <span className="mkey-icon" aria-hidden="true">
          {open ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
