import { useCallback, useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import "./VideoDeck.css";

const VIDEOS = [
  { title: "Treflip", sub: "Skating", src: "/treflip.mp4" },
  { title: "Signal",  sub: "Video work",       src: "/juan-signal.mp4" },
];

export function VideoDeck() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showList, setShowList] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = VIDEOS[idx];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const wasPlaying = playing;
    v.load();
    v.currentTime = 0;
    if (wasPlaying) v.play().catch(() => setPlaying(false));
  }, [idx]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { try { await v.play(); setPlaying(true); } catch { setPlaying(false); } }
  }, [playing]);

  const prev = () => setIdx(i => (i - 1 + VIDEOS.length) % VIDEOS.length);
  const next = useCallback(() => setIdx(i => (i + 1) % VIDEOS.length), []);

  return (
    <div className={`mp-card${playing ? " mp-card--playing" : ""}`}>
      <div className="vd-frame" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          muted={muted}
          playsInline
          onEnded={next}
        />
        {!playing && (
          <div className="vd-play-overlay" aria-hidden="true">
            <PlayIcon big />
          </div>
        )}
      </div>

      <div className="mp-card-info">
        <div className="mp-card-title-row">
          <span className="mp-card-title">{video.title}</span>
        </div>
        <div className="mp-card-sub">{video.sub}</div>
      </div>

      <div className="mp-card-controls">
        <button className="mp-ctrl-btn" onClick={() => setShowList(v => !v)} aria-label="Video list">
          <ListIcon />
        </button>
        <button className="mp-ctrl-btn" onClick={prev} aria-label="Previous">
          <PrevIcon />
        </button>
        <button className="mp-ctrl-btn mp-ctrl-play" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="mp-ctrl-btn" onClick={next} aria-label="Next">
          <NextIcon />
        </button>
        <button
          className="mp-ctrl-btn"
          onClick={() => { const v = videoRef.current; if (v) { v.muted = !muted; setMuted(m => !m); } }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <MuteIcon /> : <VolumeIcon />}
        </button>
      </div>

      {showList && (
        <ul className="mp-list">
          {VIDEOS.map((t, i) => (
            <li
              key={i}
              className={"mp-list-item" + (i === idx ? " mp-list-current" : "")}
              onClick={() => setIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && setIdx(i)}
            >
              <div className="mp-list-info">
                <span className="mp-list-title">{t.title}</span>
                <span className="mp-list-artist">{t.sub}</span>
              </div>
              <span className="mp-list-num">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h8v2H3v-2z"/></svg>);
}
function PlayIcon({ big }: { big?: boolean } = {}) {
  const s = big ? 32 : 20;
  return (<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>);
}
function PauseIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>);
}
function PrevIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/></svg>);
}
function NextIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"/></svg>);
}
function VolumeIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>);
}
function MuteIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>);
}
