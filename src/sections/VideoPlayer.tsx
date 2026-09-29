import { useCallback, useRef, useState } from "react";
import "./VideoPlayer.css";

function playTVOff() {
  const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!Ctx) return;
  const ctx: AudioContext = new Ctx();
  const now = ctx.currentTime;

  // descending whine — electrical discharge winding down
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
  oscGain.gain.setValueAtTime(0.28, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.55);

  // initial static pop
  const sr = ctx.sampleRate;
  const popBuf = ctx.createBuffer(1, Math.floor(sr * 0.07), sr);
  const d = popBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++)
    d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sr * 0.015)) * 0.5;
  const pop = ctx.createBufferSource();
  pop.buffer = popBuf;
  pop.connect(ctx.destination);
  pop.start(now);

  setTimeout(() => ctx.close(), 700);
}

type VState = "playing" | "tvoff" | "bubble";

export function SingleVideo({ src }: { src: string }) {
  const [state, setState] = useState<VState>("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = useCallback(() => {
    playTVOff();
    setState("tvoff");
    setTimeout(() => setState("bubble"), 580);
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
