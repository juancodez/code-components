import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SplitTestimonial } from "./components/SplitTestimonial";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { MetricsSection } from "./components/MetricsSection";
import { DiscoveryPong } from "./components/DiscoveryPong";
import imgMcaLogo from "../assets/MCA-Logo-and-slogan.svg";
import imgVisualSystem from "../assets/Case-Prompt-01.webp";
import imgNavigation from "../assets/Case-Prompt-02.webp";
import imgUxWriting from "../assets/Case-Prompt-03.webp";
import imgGraph from "../assets/graph.webp";
import imgNivins from "../assets/nivins.webp";
import imgRaw from "../assets/raw.webp";
import imgTally from "../assets/tally.webp";
import "./App.css";
import "./MicrocasingApp.css";

const CHALLENGE_ITEMS = [
  {
    id: "visual-system",
    label: "Visual System",
    text: "The generated design was lacking a Design System — no component consistency and no shared tokens across the product.",
    img: imgVisualSystem,
  },
  {
    id: "navigation",
    label: "Navigation",
    text: "No bottom nav, no way to backtrack, no access to profile or filtering. The product grew its case library weekly but gave users no way to orient inside it.",
    img: imgNavigation,
  },
  {
    id: "ux-writing",
    label: "UX Writing",
    text: "Gaming language, humour and consulting authority were competing in the same interface. The result was a product that felt neither credible enough for serious prep nor approachable enough to open daily.",
    img: imgUxWriting,
  },
];

const MC_SECTIONS = [
  { id: "challenge",    label: "Challenge"     },
  { id: "discovery",   label: "Discovery"     },
  { id: "branding",    label: "Branding"      },
  { id: "design-system",  label: "Design System"  },
  { id: "difficulties",   label: "Difficulties"   },
  { id: "before-after",  label: "Before & After" },
  { id: "prototype",   label: "Prototype"     },
  { id: "lessons",     label: "Lessons"       },
  { id: "metrics",     label: "Metrics"       },
  { id: "testimonial", label: "Testimonial"   },
  { id: "links",       label: "Links"         },
]

export default function MicrocasingApp() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [lens, setLens] = useState<{ x: number; y: number; bgSize: number } | null>(null);

  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      bgSize: rect.width * 2.5, // 2.5× the actual rendered image width
    });
  };

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
            <div className="mc-body-text-col">
              <p className="mc-body-text">
                Micro-casing is a mobile app that replaces $200/hour coaching with 400-second gamified case studies, making consulting interview prep fast, affordable, and sustainable for anyone competing for a spot at McKinsey, BCG, or Bain.
              </p>
              <p className="mc-body-text">
                Traditional prep is slow, expensive, and hard to stick to. Micro-casing flips the model: bite-sized cases on your commute, built on the same decision-making framework top coaches use.
              </p>
            </div>
            <img src={imgMcaLogo} alt="Micro-casing logo" className="mc-logo-img" />
          </div>
        </section>

        {/* Challenge */}
        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <span className="mc-section-label">Challenge</span>
            <h2 className="mc-section-title">The UX audit mapped three specific failures</h2>

            <div className="mc-challenge-tabs">
              {CHALLENGE_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  className={`mc-challenge-btn${activeChallenge === i ? " mc-challenge-btn--active" : ""}`}
                  onClick={() => setActiveChallenge(i)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mc-challenge-grid">
              <div className="mc-challenge-left">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeChallenge}
                    className="mc-challenge-body"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {CHALLENGE_ITEMS[activeChallenge].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mc-challenge-right">
                <div
                  className="mc-challenge-img-wrap"
                  onMouseMove={handleImgMouseMove}
                  onMouseLeave={() => setLens(null)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeChallenge}
                      src={CHALLENGE_ITEMS[activeChallenge].img}
                      alt={CHALLENGE_ITEMS[activeChallenge].label}
                      className="mc-challenge-img"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </AnimatePresence>
                  {lens && (
                    <div
                      className="mc-magnifier"
                      style={{
                        left: `${lens.x}%`,
                        top: `${lens.y}%`,
                        backgroundImage: `url(${CHALLENGE_ITEMS[activeChallenge].img})`,
                        backgroundPosition: `${lens.x}% ${lens.y}%`,
                        backgroundSize: `${lens.bgSize}px auto`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery */}
        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <span className="mc-section-label">Discovery</span>
            <h2 className="mc-section-title">Aligning on what to build</h2>
            <p className="mc-body-text" style={{ marginTop: 0, maxWidth: "62ch" }}>
              Before opening Figma, Shankar and I took the time to answer a Notion file for a discovery questionnaire where we align and define the vision, target audience, tone, and competitive positioning from the Micro-casing app.
            </p>
            <a
              href="https://app.notion.com/p/Discovery-Questionnaire-Micro-Casing-App-Case-2ec0f72674e48086bb8bf6199c76c27e"
              target="_blank"
              rel="noreferrer"
              className="mc-discovery-btn"
            >
              Discovery Questionnaire
              <svg width="10" height="10" viewBox="0 0 20.329 20.329" fill="none" aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }}>
                <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
              </svg>
            </a>
            <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
              <DiscoveryPong />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="mc-section" id="branding">
          <div className="mc-section-inner">
            <span className="mc-section-label">Branding</span>
            <h2 className="mc-section-title">Finding the balance between corporate and playful design</h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                Thanks to the Competitive &amp; Comparative Analysis, researching platforms such as Duolingo, Revolut and Elevate
                helped identify successful engagement patterns.
              </p>

              <div className="mc-flip-row">
                {([
                  ["/mc-brand-5.webp",  "/mc-brand-6.webp"],
                  ["/mc-brand-7.webp",  "/mc-brand-8.webp"],
                  ["/mc-brand-9.webp",  "/mc-brand-10.webp"],
                ] as [string, string][]).map(([front, back], i) => (
                  <div key={i} className="mc-flip-card mc-flip-card--contain" onClick={e => (e.currentTarget as HTMLDivElement).classList.toggle("mc-flip-card--flipped")}>
                    <div className="mc-flip-card-inner">
                      <div className="mc-flip-card-front">
                        <img src={front} alt="" className="mc-flip-img" />
                      </div>
                      <div className="mc-flip-card-back">
                        <img src={back} alt="" className="mc-flip-img" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mc-body-text">
                Key decisions emerged from this research — Blue was intentionally selected as the primary brand colour
                to link the product with existing fintech apps and gamification platforms.
              </p>

              <p className="mc-body-text">
                Duolingo gave us the inspiration to create four mascots for the Micro-casing app, creating engagement
                in a friendly tone while remaining professional.
              </p>

              <div className="mc-flip-row mc-flip-row--casey">
                <div className="mc-flip-card" onClick={e => (e.currentTarget as HTMLDivElement).classList.toggle("mc-flip-card--flipped")}>
                  <div className="mc-flip-card-inner">
                    <div className="mc-flip-card-front">
                      <img src="/casey.png" alt="Casey happy" className="mc-flip-img" />
                    </div>
                    <div className="mc-flip-card-back">
                      <img src="/casey-stressed.png" alt="Casey stressed" className="mc-flip-img" />
                    </div>
                  </div>
                </div>
                <div className="mc-flip-card" onClick={e => (e.currentTarget as HTMLDivElement).classList.toggle("mc-flip-card--flipped")}>
                  <div className="mc-flip-card-inner">
                    <div className="mc-flip-card-front">
                      <img src={imgGraph} alt="Graph mascot" className="mc-flip-img" />
                    </div>
                    <div className="mc-flip-card-back">
                      <img src={imgNivins} alt="Nivins mascot" className="mc-flip-img" />
                    </div>
                  </div>
                </div>
                <div className="mc-flip-card" onClick={e => (e.currentTarget as HTMLDivElement).classList.toggle("mc-flip-card--flipped")}>
                  <div className="mc-flip-card-inner">
                    <div className="mc-flip-card-front">
                      <img src={imgRaw} alt="Raw mascot" className="mc-flip-img" />
                    </div>
                    <div className="mc-flip-card-back">
                      <img src={imgTally} alt="Tally mascot" className="mc-flip-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design System */}
        <section className="mc-section" id="design-system">
          <div className="mc-section-inner">
            <span className="mc-section-label">Design System</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        {/* Difficulties */}
        <section className="mc-section" id="difficulties">
          <div className="mc-section-inner">
            <span className="mc-section-label">Difficulties</span>
            <h2 className="mc-section-title">The two-week sprint — no system, no shortcuts</h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                Two weeks is not enough time to build a proper design system — but handing engineers a Figma file
                with no components would have created permanent debt.
              </p>
              <p className="mc-body-text">
                We also faced a trade-off with the voice feature: the scope was too big, it would have pushed
                development costs up, and it didn't align with the core goals of Micro-Casing.
              </p>
            </div>
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
            <MetricsSection />
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
            <h2 className="mc-section-title">This product is live</h2>
            <div className="mc-links-row">
              <a
                href="https://apps.apple.com/gb/app/micro-casing/id6754453873"
                target="_blank"
                rel="noreferrer"
                className="mc-store-btn"
              >
                App Store
                <svg width="10" height="10" viewBox="0 0 20.329 20.329" fill="none" aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }}>
                  <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.microcasing.dev"
                target="_blank"
                rel="noreferrer"
                className="mc-store-btn"
              >
                Google Play Store
                <svg width="10" height="10" viewBox="0 0 20.329 20.329" fill="none" aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }}>
                  <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
