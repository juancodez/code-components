import { useEffect, useState } from "react";
import avatarUrl from "../assets/avatar.jpg";

export function Avatar() {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  return (
    <>
      <img
        src={avatarUrl}
        alt="Juan Gomez Vara"
        className="avatar"
        onClick={() => setZoomed(true)}
      />
      {zoomed && (
        <div className="avatar-zoom-backdrop" onClick={() => setZoomed(false)}>
          <img
            src={avatarUrl}
            alt="Juan Gomez Vara"
            className="avatar-zoom-img"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
