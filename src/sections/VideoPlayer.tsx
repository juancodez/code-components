import { useCallback, useRef, useState } from "react";
import "./VideoPlayer.css";

function playTVOff() {
  const snd = new Audio("/tv-shutdown.mp3");
  snd.volume = 0.7;
  snd.play().catch(() => {});
}

type VState = "playing" | "tvoff" | "bubble";

export function SingleVideo({ src }: { src: string }) {
  const [state, setState] = useState<VState>("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    playTVOff();
    setState("tvoff");
    setTimeout(() => setState("bubble"), 640);
  }, []);

  const restart = useCallback(() => {
    setState("playing");
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  }, []);

  return (
    <div className="vp-card">
      <div className="vp-frame">
        {state !== "bubble" ? (
          <video
            ref={videoRef}
            src={src}
            controls={state === "playing"}
            playsInline
            muted
            onEnded={handleEnded}
            className={state === "tvoff" ? "vp-tvoff" : ""}
          />
        ) : (
          <div className="vp-bubble-wrap">
            <button className="vp-bubble" onClick={restart} aria-label="Replay" />
          </div>
        )}
      </div>
    </div>
  );
}
