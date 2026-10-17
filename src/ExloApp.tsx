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
  { id: "workshop",   label: "Workshop"   },
  { id: "lessons",    label: "Lessons"    },
  { id: "ecosystem",  label: "Ecosystem"  },
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
            From a Figma pain point to a published plugin: meet Exlo
          </h1>

          <div className="mc-placeholder" style={{ aspectRatio: "16/9", borderRadius: "16px" }}>
            <span className="mc-placeholder-label">Video coming soon</span>
          </div>

          <div className="mc-subtitle-block">
            <p className="mc-subtitle">
              Exlo is a Figma plugin that allows designers to export multiple frames at once in any format and size directly to a ZIP file.
            </p>
            <p className="mc-subtitle">
              One click replaces a twenty-step process.
            </p>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Client</span>
              <span className="mc-meta-value">Personal project</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Design Engineer</span>
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
                The idea came while watching an interview with <a href="https://www.chitt.co/" target="_blank" rel="noopener noreferrer" className="mc-inline-link">Jack Chitty</a>, one of England's top logo and branding designers. He walked through his delivery process using a plugin called Logo Package Express — one click, everything exported automatically.
              </p>
              <p className="mc-body-text">
                Figma doesn't have that. As Figma expands into vector tools and logo design to compete with Adobe and Affinity, this gap became impossible to ignore.
              </p>
            </div>
          </div>
        </section>

        {/* ── Challenge ── */}
        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">Figma doesn't let you export in multiple formats at once</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Figma doesn't allow you to export assets in multiple formats and color setups simultaneously. You have to do it manually, one by one — select the frame, open the export panel, choose the format, repeat.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              For logo delivery especially, this means running through the same ritual twenty times just to hand off a brand kit. There was no native solution and no community plugin that solved it cleanly.
            </p>
          </div>
        </section>

        {/* ── Discovery ── */}
        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">The inspiration came from a YouTube interview</h2>
            <div className="yt-two-col">
              <div className="yt-two-col-text">
                <p className="mc-body-text">
                  <a href="https://www.chitt.co/" target="_blank" rel="noopener noreferrer" className="mc-inline-link">Jack Chitty</a>, one of England's top logo and branding designers, was breaking down his delivery process in an interview. He mentioned using Logo Package Express — an Illustrator plugin that exports everything automatically in one go.
                </p>
                <p className="mc-body-text">
                  As Figma continues to invest heavily in vector tools, illustration, and logo design, it became clear: Figma needed its own version of this. So I built it.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=3xRsepxCt_o"
                target="_blank"
                rel="noopener noreferrer"
                className="yt-thumb"
                aria-label="Watch Jack Chitty's logo delivery video on YouTube"
              >
                <img
                  src="https://img.youtube.com/vi/3xRsepxCt_o/maxresdefault.jpg"
                  alt="Jack Chitty logo delivery process — YouTube"
                  className="yt-thumb-img"
                />
                <span className="yt-thumb-play" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 5l10 5-10 5V5z" fill="white"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Design ── */}
        <section className="mc-section" id="design">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">One click replaces a twenty-step process</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Exlo handles simultaneous multi-format export of logos and graphics into different file formats, delivering them as a ZIP file. It also meets two colour profile needs without leaving Figma.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Exlo works for logos and for exporting everyday images (JPEG, PNG) or any frames in bulk. As Figma expands to compete with Adobe and Affinity, Exlo serves as the workflow companion that saves designers hours of tedious export work.
            </p>
            <video
              className="mc-hero-video"
              src="/exlo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ marginTop: "8px" }}
            />
          </div>
        </section>

        {/* ── Prototype ── */}
        <section className="mc-section" id="prototype">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">Give it a try: drag the frames, select the format and export.</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              This is the actual plugin interaction. Select frames on the canvas (shift-click for multi-select), toggle the formats you need, then hit Export to see the ZIP flow in action.
            </p>
            <div style={{ marginTop: "32px" }}>
              <ExloPrototype />
            </div>
          </div>
        </section>

        {/* ── Workshop ── */}
        <section className="mc-section" id="workshop">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">After shipping Exlo, I was invited to teach it</h2>
            <div className="yt-two-col">
              <div className="yt-two-col-text">
                <p className="mc-body-text">
                  <a href="https://www.linkedin.com/in/xavier-pascual-mokkapp/" target="_blank" rel="noopener noreferrer" className="mc-inline-link">Xavier Pascual</a>, owner of the Spanish-speaking product design community <a href="https://www.skool.com/mokkapp-1438/about" target="_blank" rel="noopener noreferrer" className="mc-inline-link">Mokapp</a>, caught the attention of Exlo. I was invited to run a live online workshop: <em>Creación de plugins con IA</em> (Creating Figma plugins with AI).
                </p>
                <p className="mc-body-text">
                  The workshop covered the entire process, from identifying a genuine issue in Figma to developing and submitting a plugin to the Figma Community using AI-assisted development.
                </p>
              </div>
              <img
                src="/mokapp-course.jpg"
                alt="Workshop Creación de plugins con IA — Mokapp, 22 de septiembre"
                className="mc-challenge-img"
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div className="mc-placeholder" style={{ aspectRatio: "16/9", borderRadius: "16px", marginTop: "24px" }}>
              <span className="mc-placeholder-label">Workshop recording — coming soon</span>
            </div>
          </div>
        </section>

        {/* ── Lessons ── */}
        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">Shipping to the Figma Community taught me to read the rules first</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The Figma Community review process has strict validation. The first rejection came from an undeclared <code style={{ fontFamily: "monospace", fontSize: "0.9em", background: "#f4f4f4", padding: "1px 5px", borderRadius: "4px" }}>networkAccess</code> field in the manifest — a two-line fix that took 48 hours of review turnaround to discover.
            </p>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              The submission rules are non-obvious and underdocumented. I now keep a pre-submission checklist that covers every manifest field before each new plugin submission. Read the checklist before writing a single line of code.
            </p>
            <img
              src="/exlo-01.png"
              alt="Exlo live in the Figma Community — Your resource is live"
              className="mc-challenge-img"
              style={{ borderRadius: "12px", marginTop: "8px" }}
            />
          </div>
        </section>

        {/* ── Ecosystem ── */}
        <section className="mc-section" id="ecosystem">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">The story doesn't end here —<br />three more plugins shipped</h2>
            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              Fixing workflows with Exlo opened my eyes to other critical gaps in digital production. Three more plugins were approved by Figma in the same week — all built with Claude Code, all solving real friction points designers face daily.
            </p>

            <div className="exlo-plugin-grid">

              <div className="exlo-plugin-card">
                <div className="exlo-plugin-card-top">
                  <span className="exlo-plugin-name">EXIM</span>
                  <a href="https://lnkd.in/dCvr7qZS" target="_blank" rel="noopener noreferrer" className="exlo-plugin-link">
                    Try it
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="exlo-plugin-desc">
                  Exlo's sibling for web performance. Export images, frames, and assets directly as WebP — incredible compression without losing quality. No third-party converters, no round-tripping. Built for site speed and lightweight web assets.
                </p>
              </div>

              <div className="exlo-plugin-card">
                <div className="exlo-plugin-card-top">
                  <span className="exlo-plugin-name">Type Scala</span>
                  <a href="https://lnkd.in/duEYSuqY" target="_blank" rel="noopener noreferrer" className="exlo-plugin-link">
                    Try it
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="exlo-plugin-desc">
                  Built live during the Mokapp workshop and approved by Figma the very next morning. Calculates proportional typographic scales and generates Text Styles automatically — turning a live exercise into a shipped product overnight.
                </p>
              </div>

              <div className="exlo-plugin-card">
                <div className="exlo-plugin-card-top">
                  <span className="exlo-plugin-name">EXLE</span>
                  <a href="https://lnkd.in/d2DRRBSH" target="_blank" rel="noopener noreferrer" className="exlo-plugin-link">
                    Try it
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="exlo-plugin-desc">
                  A full photo editor inside Figma. 17 pixel adjustments — curves, levels, LUTs, colour grading, blend modes — applied live on canvas. Batch editing across multiple selected images simultaneously. No exporting to Photoshop, no losing your layer graph.
                </p>
              </div>

            </div>

            <div className="mc-placeholder" style={{ aspectRatio: "16/9", borderRadius: "16px" }}>
              <span className="mc-placeholder-label">Animation / video — coming soon</span>
            </div>

            <p className="mc-body-text" style={{ maxWidth: "62ch" }}>
              3 Figma plugin approvals in 7 days. As product designers, we have the power to build our own software solutions without technical barriers holding us back.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
