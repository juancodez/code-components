import { useState } from "react";
import imgDuolingo from "../../assets/image-6.webp";
import imgRevolut from "../../assets/image-8.webp";
import imgElevate from "../../assets/image-10.webp";
import imgNivins from "../../assets/nivins.png";
import imgRabbit from "../../assets/rabbit-hole-1.png";
import imgRaw from "../../assets/raw.png";
import imgImagery01 from "../../assets/imagery-01.png";
import imgImagery02 from "../../assets/imagery-02.png";
import imgImagery03 from "../../assets/imagery-03.png";
import imgTally from "../../assets/tally.png";
import imgUnsplash from "../../assets/unsplash_2t0RSGjBJC0.png";
import logoMcKinsey from "../../assets/McKinsey-logo.svg";
import logoBain from "../../assets/Logo-Bain-and-Company.svg";
import logoNuma from "../../assets/2024-numa-logo secundary white_vector 1.svg";
import logoMca from "../../assets/MCA-Logo-and-slogan.svg";

const FONT = "'Author', system-ui, sans-serif";

type Vibe = "playful" | "corporate" | "hybrid";

const VIBE_COLOR: Record<Vibe, string> = {
  playful: "#FFE87A",
  corporate: "#A6C8FF",
  hybrid: "#86EFAC",
};

function PostIt({ vibe }: { vibe: Vibe }) {
  return (
    <div style={{
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
      background: VIBE_COLOR[vibe],
      padding: vibe === "hybrid" ? "8px 18px" : "7px 18px",
      boxShadow: "3px 5px 12px rgba(0,0,0,0.24)",
      pointerEvents: "none",
      textAlign: "center",
    }}>
      {vibe === "hybrid" ? (
        <>
          <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939", lineHeight: 1.4 }}>playful</div>
          <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939", lineHeight: 1.4 }}>corporate</div>
        </>
      ) : (
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939" }}>{vibe}</span>
      )}
    </div>
  );
}

function Phone({ src, label, vibe }: { src: string; label: string; vibe: Vibe }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "9/16",
          background: "#1d2939",
          borderRadius: 20,
          padding: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: 14,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        {hovered && <PostIt vibe={vibe} />}
      </div>
      <span style={{ fontFamily: FONT, fontSize: 14, color: "#667085" }}>{label}</span>
    </div>
  );
}

function Photo({ src, label, vibe }: { src: string; label?: string; vibe: Vibe }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "5/4",
          borderRadius: 8,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && <PostIt vibe={vibe} />}
      </div>
      {label && <span style={{ fontFamily: FONT, fontSize: 14, color: "#667085" }}>{label}</span>}
    </div>
  );
}

function SectionHead({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: FONT,
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: "#98a1b2",
      margin: "0 0 18px",
    }}>{children}</p>
  );
}

export function BrandingLineage() {
  return (
    <div style={{
      width: "100%",
      background: "#fff",
      border: "1px solid #e4e7ec",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.12)",
      overflow: "hidden",
      fontFamily: FONT,
    }}>
      <div style={{ padding: "18px 24px 0", textAlign: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1d2939", letterSpacing: "-0.01em" }}>
          Branding Strategy Board
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* LEFT: Competitors + Imagery */}
        <div style={{ padding: "28px 24px 28px 28px", display: "flex", flexDirection: "column", gap: 36 }}>
          <div>
            <SectionHead>Competitors</SectionHead>
            <div style={{ display: "flex", gap: 24, padding: "0 12%" }}>
              <Phone src={imgDuolingo} label="Duolingo" vibe="playful" />
              <Phone src={imgRevolut} label="Revolut"  vibe="corporate" />
              <Phone src={imgElevate} label="Elevate"  vibe="playful" />
            </div>
          </div>

          <div>
            <SectionHead>Imagery</SectionHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "0 12%" }}>
              <Photo src={imgImagery01} vibe="corporate" />
              <Photo src={imgImagery02} vibe="corporate" />
              <Photo src={imgImagery03} vibe="corporate" />
              <Photo src={imgUnsplash}  vibe="corporate" />
            </div>
          </div>
        </div>

        {/* RIGHT: Logos + Illustrations */}
        <div style={{
          padding: "28px 28px 28px 24px",
          borderLeft: "1px solid #f2f4f7",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}>
          <div>
            <SectionHead>Logos of the niche</SectionHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoMcKinsey} alt="McKinsey" style={{ maxWidth: "100%", height: 72, objectFit: "contain" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoBain} alt="Bain" style={{ maxWidth: "100%", height: 52, objectFit: "contain" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* ponytail: invert Numa since the SVG is a white-only version */}
                <img src={logoNuma} alt="Numa" style={{ maxWidth: "100%", height: 52, objectFit: "contain", filter: "invert(1)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoMca} alt="MCA" style={{ maxWidth: "100%", height: 88, objectFit: "contain", borderRadius: 14 }} />
              </div>
            </div>
          </div>

          <div>
            <SectionHead>Illustrations</SectionHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "0 12%" }}>
              <Photo src={imgRabbit} label="Rabbit hole" vibe="playful" />
              <Photo src={imgNivins} label="Nivins"      vibe="playful" />
              <Photo src={imgRaw}    label="Raw"         vibe="playful" />
              <Photo src={imgTally}  label="Tally"       vibe="playful" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
