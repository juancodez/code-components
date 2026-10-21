import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const imgDuolingo = "/image-6.webp";
const imgRevolut = "/image-8.webp";
const imgElevate = "/image-10.webp";
const imgNivins = "/nivins.png";
const imgRabbit = "/rabbit-hole-1.png";
const imgRaw = "/raw.png";
const imgImagery01 = "/imagery-01.png";
const imgImagery02 = "/imagery-02.png";
const imgImagery03 = "/imagery-03.png";
const imgTally = "/tally.png";
const imgUnsplash = "/unsplash_2t0RSGjBJC0.png";
const logoMcKinsey = "/McKinsey-logo.svg";
const logoBain = "/Logo-Bain-and-Company.svg";
const logoNuma = "/numa-logo.svg";
const logoMca = "/MCA-Logo-and-slogan.svg";

const FONT = "'Author', system-ui, sans-serif";

type Vibe = "playful" | "corporate" | "hybrid";

const VIBE_COLOR: Record<Vibe, string> = {
  playful: "#FFE87A",
  corporate: "#A6C8FF",
  hybrid: "#86EFAC",
};

const VIBE_ROTATE: Record<Vibe, number> = {
  playful: -4,
  corporate: 3,
  hybrid: -2,
};

function PostIt({ vibe, inView }: { vibe: Vibe; inView: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        background: VIBE_COLOR[vibe],
        padding: vibe === "hybrid" ? "8px 18px" : "7px 18px",
        pointerEvents: "none",
        textAlign: "center",
      }}
      initial={{ x: -340, rotate: -8, opacity: 0, scale: 0.9 }}
      animate={inView ? { x: 0, rotate: 0, opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0 }}
    >
      {vibe === "hybrid" ? (
        <>
          <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939", lineHeight: 1.4 }}>playful</div>
          <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939", lineHeight: 1.4 }}>corporate</div>
        </>
      ) : (
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#1d2939" }}>{vibe}</span>
      )}
    </motion.div>
  );
}

function Phone({ src, label, vibe, inView }: { src: string; label: string; vibe: Vibe; inView: boolean }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "9/16",
        borderRadius: 16,
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundColor: "#f8f9fa",
        overflow: "hidden",
      }}>
        <PostIt vibe={vibe} inView={inView} />
      </div>
      <span style={{ fontFamily: FONT, fontSize: 14, color: "#667085" }}>{label}</span>
    </div>
  );
}

function Photo({ src, label, vibe, inView }: { src: string; label?: string; vibe: Vibe; inView: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "5/4",
        borderRadius: 8,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <PostIt vibe={vibe} inView={inView} />
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} style={{
      width: "100%",
      background: "#fff",
      border: "1px solid #e4e7ec",
      borderRadius: 16,
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
            <div style={{ display: "flex", gap: 24 }}>
              <Phone src={imgDuolingo} label="Duolingo" vibe="playful"   inView={inView} />
              <Phone src={imgRevolut}  label="Revolut"  vibe="corporate" inView={inView} />
              <Phone src={imgElevate}  label="Elevate"  vibe="playful"   inView={inView} />
            </div>
          </div>

          <div>
            <SectionHead>Imagery</SectionHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "0 12%" }}>
              <Photo src={imgImagery01} vibe="corporate" inView={inView} />
              <Photo src={imgImagery02} vibe="corporate" inView={inView} />
              <Photo src={imgImagery03} vibe="corporate" inView={inView} />
              <Photo src={imgUnsplash}  vibe="corporate" inView={inView} />
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
              <Photo src={imgRabbit} label="Rabbit hole" vibe="playful" inView={inView} />
              <Photo src={imgNivins} label="Nivins"      vibe="playful" inView={inView} />
              <Photo src={imgRaw}    label="Raw"         vibe="playful" inView={inView} />
              <Photo src={imgTally}  label="Tally"       vibe="playful" inView={inView} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
