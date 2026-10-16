import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { ExloPrototype } from "./components/ExloPrototype";
import "./App.css";
import "./MicrocasingApp.css";

const EXLO_SECTIONS = [
  { id: "challenge",  label: "Challenge"  },
  { id: "discovery",  label: "Discovery"  },
  { id: "design",     label: "Design"     },
  { id: "prototype",  label: "Prototype"  },
  { id: "lessons",    label: "Lessons"    },
];

export default function ExloApp() {
  return (
    <div className="page mc-page">
      <header className="site-header">
        <Nav />
      </header>
      <CaseStudyNav sections={EXLO_SECTIONS} />

      <main className="mc-main" id="mc-top">

        {/* ── Hero header ── */}
        <section className="mc-header">
          <h1 className="mc-title">
            From a Figma pain point to a
            <br />published plugin — Exlo
          </h1>

          <video
            className="mc-hero-video"
            src="/exlo-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="mc-subtitle-block">
            <p className="mc-subtitle">
              Exlo is a Figma plugin that lets designers export multiple frames at once — any format, any size, straight to a ZIP.
            </p>
            <p className="mc-subtitle">
              One click replaces a twenty-step ritual.
            </p>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Client</span>
              <span className="mc-meta-value">Personal project</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer &amp; Developer</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Year</span>
              <span className="mc-meta-value">2026</span>
            </div>
          </div>

          <div className="mc-scope">
            {["Plugin Design", "Figma API", "TypeScript", "Figma Community"].map(tag => (
              <span key={tag} className="mc-scope-tag">{tag}</span>
            ))}
          </div>

          <div className="mc-body">
            <div className="mc-body-text-col">
              <p className="mc-body-text">
                Every designer who has shipped a brand kit knows the pain — select frame, open export panel, choose format, repeat sixteen times. Figma's native export is frame-by-frame by default.
              </p>
              <p className="mc-body-text">
                Exlo eliminates the repetition. Select all your frames, pick your formats once, and export everything as a single ZIP.
              </p>
            </div>
          </div>
        </section>

        {/* ── Challenge ── */}
        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <span className="mc-section-label">Challenge</span>
            <h2 className="mc-section-title">Exporting from Figma was a 20-step ritual</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The problem wasn't lack of features — it was the number of decisions the designer had to hold in their head simultaneously: which frames, which formats, which scales, where the files go.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Batch workflows exist in Figma but they're buried and fragile. Most designers had built private workarounds — scripts, export presets, naming conventions — just to get a clean ZIP without losing track.
            </p>
          </div>
        </section>

        {/* ── Discovery ── */}
        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <span className="mc-section-label">Discovery</span>
            <h2 className="mc-section-title">What designers actually do</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Talking to designers revealed a consistent pattern: the bottleneck isn't the export itself — it's the selection and confirmation step. Designers want to see exactly what they're about to export before they commit.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The core insight: a good export plugin needs to mirror the Figma canvas selection state in real time, not ask the designer to re-select inside the plugin.
            </p>
          </div>
        </section>

        {/* ── Design ── */}
        <section className="mc-section" id="design">
          <div className="mc-section-inner">
            <span className="mc-section-label">Design</span>
            <h2 className="mc-section-title">Plugin panel as decision surface</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The design reduces the interaction to three moments: select frames on the canvas, pick formats in the panel, hit export. The panel mirrors the Figma selection state in real time.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Format toggles are persistent across sessions. Once you've set SVG + PDF + PNG 2×, it stays that way until you change it. No re-picking every time.
            </p>
          </div>
        </section>

        {/* ── Prototype ── */}
        <section className="mc-section" id="prototype">
          <div className="mc-section-inner">
            <span className="mc-section-label">Prototype</span>
            <h2 className="mc-section-title">Try it — drag the frames, pick formats, export</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              This is the actual plugin interaction. Select frames on the canvas (shift-click for multi-select), toggle the formats you need, then hit Export to see the ZIP flow in action.
            </p>
            <div style={{ marginTop: "32px" }}>
              <ExloPrototype />
            </div>
          </div>
        </section>

        {/* ── Lessons ── */}
        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <span className="mc-section-label">Lessons</span>
            <h2 className="mc-section-title">What I'd do differently</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Shipping a Figma plugin to the Community platform has a review process with strict validation. The first rejection came from an undeclared <code style={{ fontFamily: "monospace", fontSize: "0.9em", background: "#f4f4f4", padding: "1px 5px", borderRadius: "4px" }}>networkAccess</code> field in the manifest — a two-line fix that took 48 hours of review turnaround to discover.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The broader lesson: read the Figma review checklist before writing a single line of plugin code. The submission rules are non-obvious and underdocumented. I now keep a pre-submission checklist that covers every manifest field before each new submission.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
