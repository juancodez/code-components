import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CaseStudyNav } from "./components/CaseStudyNav";
import "./App.css";
import "./MicrocasingApp.css";

const SP_SECTIONS = [
  { id: "challenge",     label: "Challenge"     },
  { id: "discovery",     label: "Discovery"     },
  { id: "design-system", label: "Design System" },
  { id: "prototype",     label: "Prototype"     },
  { id: "lessons",       label: "Lessons"       },
];

export default function SupplyProApp() {
  return (
    <div className="page mc-page">
      <header className="site-header">
        <Nav />
      </header>
      <CaseStudyNav sections={SP_SECTIONS} />

      <main className="mc-main" id="mc-top">
        <section className="mc-header">
          <h1 className="mc-title">
            Supply Pro
          </h1>

          <div className="mc-hero-placeholder" style={{
            width: "100%",
            aspectRatio: "16/7",
            background: "linear-gradient(145deg, #0a1f0a 0%, #1a3a1a 55%, #2d6a2d 100%)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "32px 0",
          }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Project preview</span>
          </div>

          <div className="mc-subtitle-block">
            <p className="mc-subtitle">
              Supply Pro is a B2B SaaS that helps restaurants recover up to €14,400 a year before poor supplier management reaches the kitchen.
            </p>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Client</span>
              <span className="mc-meta-value">UX Bootcamp Project</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Scope</span>
              <span className="mc-meta-value">UX Strategy / UI Design / Design System</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Year</span>
              <span className="mc-meta-value">2026</span>
            </div>
          </div>
        </section>

        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <span className="mc-section-label">Challenge</span>
            <h2 className="mc-section-title">Coming soon</h2>
          </div>
        </section>

        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <span className="mc-section-label">Discovery</span>
            <h2 className="mc-section-title">Coming soon</h2>
          </div>
        </section>

        <section className="mc-section" id="design-system">
          <div className="mc-section-inner">
            <span className="mc-section-label">Design System</span>
            <h2 className="mc-section-title">Coming soon</h2>
          </div>
        </section>

        <section className="mc-section" id="prototype">
          <div className="mc-section-inner">
            <span className="mc-section-label">Prototype</span>
            <h2 className="mc-section-title">Coming soon</h2>
          </div>
        </section>

        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <span className="mc-section-label">Lessons</span>
            <h2 className="mc-section-title">Coming soon</h2>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
