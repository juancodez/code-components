import "./VideoPlayer.css";

export function SingleVideo({ src }: { src: string }) {
  return (
    <div className="vp-card">
      <div className="vp-frame">
        <video src={src} controls playsInline />
      </div>
    </div>
  );
}
