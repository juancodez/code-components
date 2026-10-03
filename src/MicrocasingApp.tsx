import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SplitTestimonial } from "./components/SplitTestimonial";
import { CaseStudyNav } from "./components/CaseStudyNav";
import "./App.css";
import "./MicrocasingApp.css";

const MC_SECTIONS = [
  { id: "challenge",    label: "Challenge"     },
  { id: "discovery",   label: "Discovery"     },
  { id: "branding",    label: "Branding"      },
  { id: "design-system", label: "Design System" },
  { id: "before-after", label: "Before & After" },
  { id: "prototype",   label: "Prototype"     },
  { id: "lessons",     label: "Lessons"       },
  { id: "metrics",     label: "Metrics"       },
  { id: "testimonial", label: "Testimonial"   },
  { id: "links",       label: "Links"         },
]

export default function MicrocasingApp() {
  return (
    <div className="page mc-page">
      <header className="site-header">
        <Nav />
      </header>
      <CaseStudyNav sections={MC_SECTIONS} />

      <main className="mc-main" id="mc-top">
        <section className="mc-header">
          <div className="mc-header-inner">
            <div className="mc-left">
              <h1 className="mc-title">
                From AI wireframes deliverables to a consistent visual Identity of Micro-casing
              </h1>
              <div className="mc-subtitle-block">
                <p className="mc-subtitle">
                  Micro-casing had been built from AI-generated wireframes with no design system behind it.
                </p>
                <p className="mc-subtitle">
                  The CEO of Micro-casing App,{" "}
                  <a
                    href="https://www.linkedin.com/in/shankarananth8/?isSelfProfile=false"
                    target="_blank"
                    rel="noreferrer"
                    className="mc-inline-link"
                  >
                    Shankar Ananth
                  </a>
                  , contacted me to redesign the branding and rework the flow of his product.
                </p>
              </div>
            </div>

            <div className="mc-right">
              <div className="mc-placeholder">
                <span className="mc-placeholder-label">Project preview</span>
              </div>
            </div>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Client</span>
              <span className="mc-meta-value">Cerebral Games</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Year</span>
              <span className="mc-meta-value">2026</span>
            </div>
          </div>

          <div className="mc-scope">
            {["UX Strategy", "Branding", "UI Design", "Design System"].map(tag => (
              <span key={tag} className="mc-scope-tag">{tag}</span>
            ))}
          </div>

          <div className="mc-body">
            <p className="mc-body-text">
              Micro-casing is a mobile app that replaces $200/hour coaching with 400-second gamified case studies, making consulting interview prep fast, affordable, and sustainable for anyone competing for a spot at McKinsey, BCG, or Bain.
            </p>
            <p className="mc-body-text">
              Traditional prep is slow, expensive, and hard to stick to. Micro-casing flips the model: bite-sized cases on your commute, built on the same decision-making framework top coaches use.
            </p>
          </div>
        </section>

        {/* Challenge */}
        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <span className="mc-section-label">Challenge</span>
            <h2 className="mc-section-title">The UX audit mapped four specific failures</h2>
          </div>
        </section>

        {/* Discovery */}
        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <span className="mc-section-label">Discovery</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Branding */}
        <section className="mc-section" id="branding">
          <div className="mc-section-inner">
            <span className="mc-section-label">Branding</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Design System */}
        <section className="mc-section" id="design-system">
          <div className="mc-section-inner">
            <span className="mc-section-label">Design System</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Before & After */}
        <section className="mc-section" id="before-after">
          <div className="mc-section-inner">
            <span className="mc-section-label">Before & After</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Prototype */}
        <section className="mc-section" id="prototype">
          <div className="mc-section-inner">
            <span className="mc-section-label">Prototype</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Lessons */}
        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <span className="mc-section-label">Lessons</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Metrics */}
        <section className="mc-section" id="metrics">
          <div className="mc-section-inner">
            <span className="mc-section-label">Metrics</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mc-section" id="testimonial">
          <div className="mc-section-inner">
            <span className="mc-section-label">Testimonial</span>
            <SplitTestimonial />
          </div>
        </section>

        {/* Links */}
        <section className="mc-section" id="links">
          <div className="mc-section-inner">
            <span className="mc-section-label">Links</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
