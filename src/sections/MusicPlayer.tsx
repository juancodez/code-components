import { useCallback, useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

const TRACKS = [
  {
    title: "Sense of Style",
    artist: "Marsolo",
    album: "Sense of Style - Single",
    thumb: "/marsolo-sense-of-style.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d0/7e/71/d07e71e6-d976-35b9-f325-015f100fac87/mzaf_4502686936529535495.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/sense-of-style-single/1763088051",
  },
  {
    title: "Only You",
    artist: "Steve Monite",
    album: "Only You",
    thumb: "/steve-monite-only-you.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/26/2b/08/262b0829-e1c7-10e9-8c66-211808b81e64/mzaf_2504318641835597336.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/only-you/1614315255?i=1614315257",
  },
  {
    title: "Cybernetic Love (Instrumental)",
    artist: "Casco",
    album: "Cybernetic Love - Single",
    thumb: "/casco.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview71/v4/d1/27/2c/d1272c69-6e01-e6be-04c5-547305aadee9/mzaf_593860010414855152.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/cybernetic-love-instrumental/1174998562?i=1174998764",
  },
];

function fmt(s: number) {
  if (!isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showList, setShowList] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = TRACKS[idx];
  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const wasPlaying = playing;
    a.src = track.src;
    a.load();
    a.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    if (wasPlaying) a.play().catch(() => setPlaying(false));
  }, [idx]);

  const togglePlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { try { await a.play(); setPlaying(true); } catch { setPlaying(false); } }
  }, [playing]);

  const prev = () => setIdx(i => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = useCallback(() => setIdx(i => (i + 1) % TRACKS.length), []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  return (
    <div className="mp-card">
      {/* Apple Music badge — top right */}
      <div className="mp-card-top">
        <a className="mp-am-badge" href={track.link} target="_blank" rel="noreferrer" aria-label="Open on Apple Music">
          <MusicNoteIcon />
        </a>
      </div>

      {/* Album art */}
      <img src={track.thumb} alt={track.album} className="mp-card-art" />

      {/* Track info */}
      <div className="mp-card-info">
        <div className="mp-card-title">{track.title}</div>
        <div className="mp-card-sub">{track.artist} — {track.album}</div>
      </div>

      {/* Progress bar */}
      <div className="mp-bar-row">
        <span className="mp-time">{fmt(currentTime)}</span>
        <div className="mp-bar-track" onClick={seek} role="slider" aria-label="Seek" aria-valuenow={Math.round(progress)}>
          <div className="mp-bar-fill" style={{ width: `${progress}%` }}>
            <div className="mp-bar-thumb" />
          </div>
        </div>
        <span className="mp-time">{fmt(duration)}</span>
      </div>

      {/* Controls pill */}
      <div className="mp-card-controls">
        <button className="mp-ctrl-btn" onClick={() => setShowList(v => !v)} aria-label="Track list">
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
          onClick={() => { const a = audioRef.current; if (a) { a.muted = !muted; setMuted(v => !v); } }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <MuteIcon /> : <VolumeIcon />}
        </button>
      </div>

      {/* Track list (toggled by list icon) */}
      {showList && (
        <ul className="mp-list">
          {TRACKS.map((t, i) => (
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
                <span className="mp-list-artist">{t.artist}</span>
              </div>
              {i === idx && playing
                ? <EqBars />
                : <span className="mp-list-num">{String(i + 1).padStart(2, "0")}</span>
              }
            </li>
          ))}
        </ul>
      )}

      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={next}
      />
    </div>
  );
}

function EqBars() {
  return (
    <span className="mp-eq" aria-hidden="true">
      <span className="mp-eq-bar" />
      <span className="mp-eq-bar" />
      <span className="mp-eq-bar" />
    </span>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <polyline points="3 6 4 7 6 5" />
      <polyline points="3 12 4 13 6 11" />
      <polyline points="3 18 4 19 6 17" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
