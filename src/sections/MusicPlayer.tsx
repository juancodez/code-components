import { useCallback, useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

const TRACKS = [
  {
    title: "Sense of Style",
    artist: "Marsolo",
    album: "Sense of Style",
    thumb: "/marsolo-sense-of-style.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d0/7e/71/d07e71e6-d976-35b9-f325-015f100fac87/mzaf_4502686936529535495.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/sense-of-style-single/1763088051",
    explicit: false,
  },
  {
    title: "Only You",
    artist: "Steve Monite",
    album: "Only You",
    thumb: "/steve-monite-only-you.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/26/2b/08/262b0829-e1c7-10e9-8c66-211808b81e64/mzaf_2504318641835597336.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/only-you/1614315255?i=1614315257",
    explicit: false,
  },
  {
    title: "Cybernetic Love",
    artist: "Casco",
    album: "Cybernetic Love",
    thumb: "/casco.png",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview71/v4/d1/27/2c/d1272c69-6e01-e6be-04c5-547305aadee9/mzaf_593860010414855152.plus.aac.p.m4a",
    link: "https://music.apple.com/us/album/cybernetic-love-instrumental/1174998562?i=1174998764",
    explicit: false,
  },
];

export function MusicPlayer() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showList, setShowList] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = TRACKS[idx];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const wasPlaying = playing;
    a.src = track.src;
    a.load();
    a.currentTime = 0;
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

  return (
    <div className={`mp-card${playing ? " mp-card--playing" : ""}`}>

      {/* Top row: art + Apple Music badge */}
      <div className="mp-card-top">
        <img src={track.thumb} alt={track.album} className="mp-card-art" />
        <a className="mp-am-badge" href={track.link} target="_blank" rel="noreferrer" aria-label="Open on Apple Music">
          <AppleMusicIcon />
        </a>
      </div>

      {/* Track info */}
      <div className="mp-card-info">
        <div className="mp-card-title-row">
          <span className="mp-card-title">{track.title}</span>
          {track.explicit && <span className="mp-explicit" aria-label="Explicit">E</span>}
        </div>
        <div className="mp-card-sub">{track.artist} - {track.album}</div>
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

      {/* Track list */}
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

      <audio ref={audioRef} onEnded={next} />
    </div>
  );
}

function AppleMusicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 16 16" fill="white" aria-hidden="true">
      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/>
      <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/>
      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/>
    </svg>
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

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h8v2H3v-2z"/>
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );
}
function PrevIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/>
    </svg>
  );
}
function NextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"/>
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
    </svg>
  );
}
