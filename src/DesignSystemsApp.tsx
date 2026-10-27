import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CaseStudyNav } from "./components/CaseStudyNav";
import "./App.css";
import "./MicrocasingApp.css";

const DS_SECTIONS = [
  { id: "overview",   label: "Overview"      },
  { id: "challenge",  label: "Challenge"     },
  { id: "problem",    label: "Problem"       },
  { id: "approach",   label: "Approach"      },
  { id: "workflow",   label: "Workflow"      },
  { id: "applying",   label: "In Practice"   },
  { id: "impact",     label: "Impact"        },
  { id: "future",     label: "Next Steps"    },
];

const CHALLENGE_ITEMS = [
  {
    id: "drift",
    label: "Visual Drift",
    text: "Each brand was interpreted manually by each designer on each project. Without a shared token layer, colour values, spacing, and typography drifted across products, not by intention, but by the natural accumulation of local decisions made without a common reference.",
  },
  {
    id: "speed",
    label: "Speed",
    text: "Starting a new project meant re-establishing the same foundations every time. Designers opened the brand guidelines, made interpretation decisions, and built from scratch. The work that was done on the previous project was not reusable. It lived in that Figma file and nowhere else.",
  },
  {
    id: "dev-handoff",
    label: "Dev Handoff",
    text: "External developers implementing designs had no versioned reference for the values in use. They read numbers off Figma artboards. When those numbers changed, there was no structured way to communicate the update, which meant implementations drifted from designs over time.",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    tool: "Escala Tokens",
    description: "Design foundations (colour, typography, spacing, radius) are defined and managed here. Token naming, hierarchy, and brand-specific overrides are all organized within Escala Tokens.",
  },
  {
    step: "02",
    tool: "JSON export",
    description: "Tokens are exported as structured JSON files. Each brand gets its own token set. The JSON is the source of truth that everything else reads from.",
  },
  {
    step: "03",
    tool: "GitHub",
    description: "Token JSON files are pushed to GitHub. This gives the workflow version control: every change is tracked, every update is attributable, and developers always know which version of the tokens they are working with.",
  },
  {
    step: "04",
    tool: "Figma plugin",
    description: "A Figma plugin reads the token values from the repository and applies them to the Figma file. Design and the token source stay synchronized. A token change in Escala propagates into Figma without manual intervention.",
  },
];

function Placeholder({ label, ratio = "16/9" }: { label: string; ratio?: string }) {
  return (
    <div className="mc-placeholder" style={{ aspectRatio: ratio }}>
      <span className="mc-placeholder-label">{label}</span>
    </div>
  );
}

export default function DesignSystemsApp() {
  const [activeChallenge, setActiveChallenge] = useState(0);

  return (
    <div className="page mc-page">
      <header className="site-header">
        <Nav />
      </header>
      <CaseStudyNav sections={DS_SECTIONS} />
      <main className="mc-main" id="ds-top">

        {/* Hero */}
        <section className="mc-header">
          <h1 className="mc-title">
            Building a Multi-Brand Design System<br />
            from Brand Identity to Code
          </h1>

          <video
            className="mc-hero-video"
            src="/escala-tokens.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="mc-subtitle-block">
            <p className="mc-subtitle">
              An agency managing multiple brands had no shared digital
              foundation. Every new project meant reinterpreting the same
              brand guidelines from scratch. Inconsistency accumulated,
              speed suffered, and developer handoff relied on reading
              numbers off Figma artboards.
            </p>
            <p className="mc-subtitle">
              I built a token-based design system that let the agency
              maintain multiple brand identities from a single structured
              workflow, reducing implementation costs by 21% measured
              across tracked developer hours.
            </p>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Context</span>
              <span className="mc-meta-value">Agency, multiple brand identities</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer · Design Systems</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Scope</span>
              <span className="mc-meta-value">Token Architecture · Multi-Brand Foundations · Design-to-Development Workflow</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Tools</span>
              <span className="mc-meta-value">Figma · Escala Tokens · GitHub · JSON</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Outcome</span>
              <span className="mc-meta-value">21% reduction in implementation costs (tracked hours comparison)</span>
            </div>
          </div>

          <div className="mc-body">
            <div className="mc-body-text-col">
              <p className="mc-body-text">
                The agency had brand guidelines. What it lacked was a
                systematic way to translate those guidelines into digital
                products consistently, quickly, and in a form that
                developers could implement without interpretation.
              </p>
              <p className="mc-body-text">
                The system I built runs on a single workflow: design
                foundations managed in Escala Tokens, exported to JSON,
                versioned in GitHub, and synchronized back into Figma
                via a plugin. One source. Every brand reads from it.
              </p>
            </div>
            <Placeholder label="01. Hero composition: multi-brand tokens side by side, colour + type + spacing" ratio="4/3" />
          </div>
        </section>

        {/* Overview */}
        <section className="mc-section" id="overview">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              Multiple brands. No shared foundation.
              Every project starting from zero.
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                The agency worked across several brand identities. Each
                had its own visual direction: colour palette, typeface,
                spacing personality. What none of them had was a structured
                digital layer that a designer or developer could reference
                directly without translating brand guidelines into implementation
                decisions by hand.
              </p>
              <p className="mc-body-text">
                There was also a hard constraint: AI-assisted design tools
                were off the table. German enterprise data privacy regulations
                meant that work processed through external AI services was a
                compliance risk the agency could not accept. The system had to
                produce consistency without relying on AI to catch inconsistency.
                That made structured foundations not a nice-to-have; it made
                them the only viable path.
              </p>
              <p className="mc-body-text">
                The result of not having them was predictable: inconsistencies
                between projects, between designers, and between design files
                and built interfaces. Not because anyone was careless. Because
                there was no shared contract to be careful about.
              </p>
            </div>
            <Placeholder label="02. Project overview: agency context, multiple brand logos, gap between guidelines and digital output" ratio="21/9" />
          </div>
        </section>

        {/* Challenge */}
        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              Three problems the guidelines alone could not solve
            </h2>

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
                <Placeholder
                  label="03. Before / after: brand guidelines interpretation vs. token-referenced design"
                  ratio="4/3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="mc-section" id="problem">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              The same values, re-entered by hand,
              on every project, across every brand
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                The root issue was not a lack of brand identity. It was
                the absence of a machine-readable layer between the brand
                and its digital products. Every designer had the guidelines.
                None of them had the same structured, versioned, reusable
                interpretation of those guidelines.
              </p>
              <p className="mc-body-text">
                German enterprise data privacy regulations added a layer of
                constraint that eliminated AI-assisted workarounds. The agency
                could not route client data or brand assets through external
                AI services. Consistency had to come from the system, from
                shared contracts and structured workflows, not from tooling
                shortcuts.
              </p>
              <p className="mc-body-text">
                This affected four areas simultaneously: consistency across
                products, speed of starting a new project, alignment between
                design and development, and the ability to update a value
                once and have it propagate everywhere.
              </p>
            </div>
            <Placeholder label="04. Problem map: four themes connecting to 'no shared token layer'" ratio="16/7" />
          </div>
        </section>

        {/* Approach */}
        <section className="mc-section" id="approach">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              A token layer as the single source of truth
              for every brand
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                The approach was to create a structured token architecture
                that could hold multiple brand identities simultaneously.
                Each brand gets its own set of semantic tokens: colour,
                typography, spacing, border radius, defined once and
                referenced everywhere.
              </p>
              <p className="mc-body-text">
                Primitive tokens carry the raw values. Semantic tokens
                give them meaning. A component binds to{" "}
                <code style={{ fontFamily: "monospace", fontSize: "0.9em", background: "#f2f4f7", padding: "1px 6px", borderRadius: 4 }}>color.surface.primary</code>,
                not to a hex code. Switching brand means remapping the
                semantic layer. The component never changes.
              </p>
            </div>
            <img
              src="/05-escalatokens.gif"
              alt="Design foundations: colour tokens, typography scale, spacing system, radius values across brands"
              style={{ width: "100%", borderRadius: 8, display: "block" }}
            />
            <div className="mc-body" style={{ marginTop: 48 }}>
              <div className="mc-body-text-col">
                <p className="mc-body-text">
                  I used Escala Tokens as the central tool for managing
                  the token definitions. It provided a structured
                  environment for naming, organizing, and exporting values,
                  and critically, for managing multiple brand sets from a
                  single project without duplication.
                </p>
                <p className="mc-body-text">
                  Escala Tokens is not the story. The story is what the
                  token layer makes possible: a design decision made once,
                  in one place, that flows through to every product that
                  reads from it.
                </p>
              </div>
              <Placeholder label="06. Token structure: naming convention, brand hierarchy, primitive to semantic chain" ratio="4/3" />
            </div>
            <div style={{ marginTop: 40 }}>
              <img
                src="/07-escalatokens.gif"
                alt="Escala Tokens: multi-brand token sets in the interface"
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="mc-section" id="workflow">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              Escala Tokens → JSON → GitHub → Figma
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                The four-step workflow is what makes the system maintainable
                rather than just organized. A change to a token value in
                Escala propagates through the entire chain, to the JSON
                files, to GitHub, and back into Figma, without manual
                re-entry at each step.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
              {WORKFLOW_STEPS.map((s) => (
                <div
                  key={s.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 160px 1fr",
                    gap: 24,
                    alignItems: "start",
                    padding: "24px 0",
                    borderTop: "1px solid #f2f4f7",
                  }}
                >
                  <span style={{ fontFamily: "'Author', system-ui", fontSize: 13, fontWeight: 500, color: "#98a1b2", paddingTop: 2 }}>{s.step}</span>
                  <span style={{ fontFamily: "'Author', system-ui", fontSize: 17, fontWeight: 600, color: "#1d2939", letterSpacing: "-0.01em" }}>{s.tool}</span>
                  <p className="mc-body-text" style={{ margin: 0 }}>{s.description}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48 }}>
              <img
                src="/workflow-escala.png"
                alt="Workflow diagram: Escala Tokens to JSON to GitHub to Figma"
                style={{ width: "100%", borderRadius: 8, display: "block" }}
              />
            </div>
            <div className="mc-body" style={{ marginTop: 48 }}>
              <div className="mc-body-text-col">
                <p className="mc-body-text">
                  Version control was not an afterthought. It was a
                  requirement. With external developers consuming the token
                  files, every change needed to be tracked, attributable,
                  and revertible. GitHub provided that without adding
                  process overhead.
                </p>
              </div>
              <Placeholder label="09. Token implementation example: JSON value alongside Figma variable and code reference" ratio="4/3" />
            </div>
          </div>
        </section>

        {/* In Practice */}
        <section className="mc-section" id="applying">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              The same component. Three brand identities.
              Zero manual re-work.
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                The practical test of any multi-brand system is whether
                you can swap brand and have the interface reflect that change
                without touching the component. When every fill, every
                spacing value, every typeface reference reads from the token
                layer, a brand swap is a semantic token remap, not a
                redesign.
              </p>
              <p className="mc-body-text">
                Designers working in Figma reference variables synchronized
                from the token source. The values they use in a component
                are the same values the developer is implementing. There is
                no translation gap between the artboard and the build.
              </p>
            </div>
            <Placeholder label="10. Tokens in context: same UI component rendered in three brand themes side by side" ratio="21/9" />
            <div style={{ marginTop: 48 }}>
              <Placeholder label="11. Interface consistency: before (local values) vs. after (token-referenced) for a real screen" ratio="16/7" />
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="mc-section" id="impact">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              21% fewer developer hours.
              Measured across projects before and after.
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                Developer hours were tracked across comparable projects
                before and after the design system was in place. The
                reduction in implementation time came from two sources:
                less re-interpretation of design values, and fewer
                corrections due to design–code discrepancies.
              </p>
              <p className="mc-body-text">
                The qualitative shift was equally significant. Designers
                stopped rebuilding foundations at the start of each project.
                Developers stopped asking what a colour should be. They
                read it from the token file. The system reduced decision
                overhead on both sides of the handoff.
              </p>
            </div>

            <div className="mc-metrics-list" style={{ marginTop: 48 }}>
              {[
                { value: "21%",  label: "reduction in implementation costs",  detail: "Tracked developer hours, before vs. after system adoption" },
                { value: "3×",   label: "faster brand project setup",          detail: "Foundations already exist; a new brand requires token remapping only" },
                { value: "1",    label: "source of truth for every brand",     detail: "One token repository, synchronized across Figma and development" },
                { value: "0",    label: "manual re-entry of brand values",     detail: "Token changes propagate through the full workflow without copy-paste" },
              ].map((m) => (
                <div className="mc-metric-item" key={m.value}>
                  <p className="mc-metric-value">{m.value}</p>
                  <p className="mc-metric-label">{m.label}</p>
                  <p className="mc-metric-signal">{m.detail}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48 }}>
              <Placeholder label="12. Impact summary: four outcome cards" ratio="16/7" />
            </div>
            <div style={{ marginTop: 32 }}>
              <Placeholder label="13. Hour comparison chart: before vs. after across projects" ratio="16/7" />
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mc-section" id="future">
          <div className="mc-section-inner">
            <h2 className="mc-section-title">
              Foundations are the prerequisite.
              Components, governance, and Storybook are what they unlock.
            </h2>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                A token layer without components is infrastructure without
                a product. The next stage is building a core component
                library on top of the established foundations: components
                that bind to the token layer by contract, not by convention,
                and that document their own usage through Storybook or a
                similar sandbox.
              </p>
              <p className="mc-body-text">
                Governance is the other half. A design system without a
                defined process for proposing, reviewing, and versioning
                changes will drift back into inconsistency. The foundations
                create the conditions for governance: a change to a semantic
                token is now a decision that can be reviewed, attributed, and
                rolled back.
              </p>
            </div>

            <div style={{ marginTop: 40 }}>
              <Placeholder label="14. Roadmap: Stage 1 Foundations (done) → Stage 2 Components + Storybook → Stage 3 Governance + Evolution" ratio="16/7" />
            </div>

            <div className="mc-body" style={{ marginTop: 48 }}>
              <div className="mc-body-text-col">
                <p className="mc-body-text">
                  <strong style={{ color: "#1d2939" }}>Core components.</strong>{" "}
                  A set of base components: buttons, inputs, cards,
                  navigation, built directly on the token layer, with
                  documented contracts that define what each component
                  accepts and how it should behave across brand contexts.
                </p>
                <p className="mc-body-text">
                  <strong style={{ color: "#1d2939" }}>Storybook.</strong>{" "}
                  A living component sandbox that designers, developers,
                  and stakeholders can reference without opening Figma.
                  Components render in isolation, tested across brand themes.
                </p>
              </div>
              <div className="mc-body-text-col">
                <p className="mc-body-text">
                  <strong style={{ color: "#1d2939" }}>Governance.</strong>{" "}
                  A versioned process for proposing and reviewing changes
                  to foundations and components, from creative conception
                  to version-controlled source in code.
                </p>
                <p className="mc-body-text">
                  <strong style={{ color: "#1d2939" }}>Broader adoption.</strong>{" "}
                  Expanding the system across additional agency brands and
                  measuring the compounding effect on implementation speed
                  as the component library grows.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
