import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CaseStudyNav } from "./components/CaseStudyNav";
import "./App.css";
import "./MicrocasingApp.css";

const SP_SECTIONS = [
  { id: "problem",       label: "Problem"        },
  { id: "research",      label: "Research"       },
  { id: "hmw",           label: "HMW"            },
  { id: "process",       label: "Process"        },
  { id: "testing",       label: "Testing"        },
  { id: "before-after",  label: "Before & After" },
  { id: "design-system", label: "Design System"  },
  { id: "solution",      label: "Solution"       },
  { id: "kpis",          label: "KPIs"           },
  { id: "outlook",       label: "Outlook"        },
  { id: "lessons",       label: "Lessons"        },
];

const ARROW = (
  <svg width="10" height="10" viewBox="0 0 20.329 20.329" fill="none" aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }}>
    <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor" />
  </svg>
);

const Divider = () => <div style={{ height: 1, background: "#f2f4f7", margin: "48px 0" }} />;

export default function SupplyProApp() {
  return (
    <div className="page mc-page">
      <header className="site-header"><Nav /></header>
      <CaseStudyNav sections={SP_SECTIONS} />

      <main className="mc-main" id="mc-top">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="mc-header">
          <h1 className="mc-title">
            Prevent supply disruptions before they reach the kitchen.
          </h1>

          <div style={{
            width: "100%", aspectRatio: "16/7",
            background: "linear-gradient(145deg, #0a1f0a 0%, #1a3a1a 55%, #2d6a2d 100%)",
            borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Author, system-ui, sans-serif" }}>
              Project preview
            </span>
          </div>

          <div className="mc-subtitle-block">
            <p className="mc-subtitle">
              Supply Pro is a B2B SaaS product designed to help professional kitchens detect supplier issues early, evaluate alternatives, and protect service from unexpected disruptions.
            </p>
            <p className="mc-subtitle">
              After 17 years working as a head pastry chef in high-end restaurants, I knew the problem firsthand: procurement often runs on WhatsApp, phone calls, and paper. Nothing is properly documented. No one warns you in advance. You discover something is missing when the delivery truck is already at the door and service starts in three hours.
            </p>
            <p className="mc-subtitle">
              No product means no dish. No dish means a menu you cannot deliver. And a menu you cannot deliver means a client who paid for an experience you can no longer guarantee.
            </p>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Type</span>
              <span className="mc-meta-value">Solo Product Design Case</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Scope</span>
              <span className="mc-meta-value">UX Research · Product Strategy · UI Design · Design Systems</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Duration</span>
              <span className="mc-meta-value">4 Months</span>
            </div>
          </div>

          <div className="mc-scope">
            {["UX Research", "Product Strategy", "UI Design", "Design Systems"].map(t => (
              <span key={t} className="mc-scope-tag">{t}</span>
            ))}
          </div>
        </section>

        {/* ── 01. Problem ──────────────────────────── */}
        <section className="mc-section" id="problem">
          <div className="mc-section-inner">
            <span className="mc-section-label">01 — Problem, Solution & Impact</span>
            <h2 className="mc-section-title">Supplier issues discovered almost too late.</h2>

            <div className="mc-branding-body">
              <p className="mc-body-text">
                The problem is the uncertainty of not knowing whether a supplier will arrive on time, whether the products will match the order, or whether they will meet the required quality standards.
              </p>
              <p className="mc-body-text">
                When a problem becomes visible, service may already be at risk. There is very little time left to react.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48 }}>
              <div className="mc-metric-item">
                <p className="mc-metric-value">€4,300–€7,300</p>
                <p className="mc-metric-label">Estimated annual labour cost from manually managing supplier problems per kitchen.</p>
              </div>
              <div className="mc-metric-item">
                <p className="mc-metric-value">3–5 hrs/wk</p>
                <p className="mc-metric-label">Estimated time lost each week to supplier-related issues, at €28 per hour.</p>
              </div>
            </div>

            <Divider />

            <h3 style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 600, letterSpacing: "-0.02em", color: "#1d2939", margin: "0 0 16px" }}>
              Turn supply disruptions into actionable decisions.
            </h3>
            <div className="mc-branding-body">
              <p className="mc-body-text">
                Supply Pro introduces an early warning system that helps chefs identify delivery and quality issues, assess alternative products, and take action before a disruption affects service.
              </p>
              <p className="mc-body-text">
                The experience focuses on one critical operational moment: the gap between placing an order and receiving the delivery.
              </p>
            </div>

            <Divider />

            <h3 style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 17, fontWeight: 600, color: "#1d2939", margin: "0 0 16px" }}>Product Goals</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Help chefs identify supply issues without unnecessary searching.",
                "Enable a clear response to an alert within two minutes.",
                "Support end-to-end task completion within five minutes.",
                "Reduce ambiguity in the decisions required to resolve a supply disruption.",
              ].map(g => (
                <li key={g} style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 17, color: "#667085", lineHeight: 1.6, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: "#d0d5dd", flexShrink: 0, display: "block" }} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 02. Research ─────────────────────────── */}
        <section className="mc-section" id="research">
          <div className="mc-section-inner">
            <span className="mc-section-label">02 — Research</span>
            <h2 className="mc-section-title">11 interviews. 5 countries. One recurring operational problem.</h2>

            <div className="mc-branding-body">
              <p className="mc-body-text">
                I conducted qualitative research with 10 executive chefs with more than 10 years of experience, alongside supplier stakeholders in Switzerland. The research explored how professional kitchens manage procurement, what happens when deliveries fail, and how teams react when products arrive late or do not meet the required standard.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, margin: "40px 0" }}>
              {[
                { value: "11", label: "Executive chefs and supplier stakeholders interviewed." },
                { value: "5",  label: "Countries — Germany, Uruguay, France, Switzerland, Spain." },
                { value: "60%",label: "Of chefs reported being directly affected by late deliveries." },
              ].map(({ value, label }) => (
                <div key={value} className="mc-metric-item">
                  <p className="mc-metric-value">{value}</p>
                  <p className="mc-metric-label">{label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {[
                {
                  quote: "An early warning system for delays or supplier problems would be a good solution to this problem, as it would allow us to respond sooner and salvage the service.",
                  name: "Daniel Garcia Serra",
                  role: "Executive Chef, Yellowstone Club, Big Sky, Montana, United States",
                },
                {
                  quote: "Then you often have to run around to make sure they deliver the product on time and in good condition, or you have to work with other suppliers, but it's always a headache when that happens to you.",
                  name: "Marco Silva Lindblom",
                  role: "Executive Chef, England Embassy, Montevideo, Uruguay",
                },
                {
                  quote: "If the product doesn't meet the required standard, I immediately feel frustrated and concerned about the operational side of things. As a chef, I am responsible for the final quality.",
                  name: "Edoardo De Simone",
                  role: "Executive Chef, Clinique La Prairie, Clarens, Switzerland",
                },
              ].map(({ quote, name, role }) => (
                <figure key={name} className="t2-figure">
                  <blockquote className="t2-quote">
                    <span className="t2-mark t2-mark--open">"</span>
                    <span className="t2-text">{quote}</span>
                    <span className="t2-mark t2-mark--close">"</span>
                  </blockquote>
                  <figcaption className="t2-caption">
                    <span className="t2-line" />
                    <div className="t2-author">
                      <div className="t2-author-text">
                        <span className="t2-name">{name}</span>
                        <span className="t2-tagline">{role}</span>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div style={{ marginTop: 40, padding: "24px 28px", background: "#f8f9fa", borderRadius: 12, borderLeft: "3px solid #1d2939" }}>
              <p className="mc-body-text" style={{ color: "#1d2939", margin: 0 }}>
                <strong>Key Insight</strong> — The issue was not simply that deliveries could be late. It was that chefs often discovered problems too late to respond comfortably. Earlier visibility could turn a reactive, stressful process into a more controlled decision.
              </p>
            </div>
          </div>
        </section>

        {/* ── 03. How Might We ─────────────────────── */}
        <section className="mc-section" id="hmw">
          <div className="mc-section-inner">
            <span className="mc-section-label">03 — How Might We</span>
            <h2 className="mc-section-title">The key design question</h2>
            <p className="mc-body-text">
              The interviews converged on a clear opportunity: give chefs enough information and time to react before a supplier issue affects service.
            </p>
            <div style={{ marginTop: 24, padding: "36px 40px", background: "#1d2939", borderRadius: 16 }}>
              <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 500, color: "#fff", lineHeight: 1.5, margin: 0, letterSpacing: "-0.01em" }}>
                How might we help chefs in gastronomy detect supply disruptions early so they can react before service is affected?
              </p>
            </div>
          </div>
        </section>

        {/* ── 04. Process ──────────────────────────── */}
        <section className="mc-section" id="process">
          <div className="mc-section-inner">
            <span className="mc-section-label">04 — Process & Key Decisions</span>
            <h2 className="mc-section-title">Three decisions that shaped the product</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 16 }}>
              {[
                {
                  num: "01",
                  title: "Back to the User",
                  sub: "Scope before features.",
                  body: "Competitive analysis initially pulled me away from the core problem. I became distracted by feature-heavy products and started designing beyond what chefs had actually described in interviews. Returning to the research helped realign the MVP around one specific moment: the gap between order placement and delivery arrival. The decision was to focus on a narrow, high-value problem rather than build a broad procurement platform.",
                },
                {
                  num: "02",
                  title: "The Niche Defines the Design",
                  sub: "Domain knowledge as design input.",
                  body: "Kitchens under pressure do not need an impressive interface. They need one that works. This shaped every design decision: no unnecessary decorative elements, no complex flows, and no hidden actions. Functional clarity took priority over visual complexity. Seventeen years as a head pastry chef and cook in high-end restaurants was not just background experience. It helped me understand the constraints, anticipate real-world behaviour, and challenge assumptions throughout the design process.",
                },
                {
                  num: "03",
                  title: "UX Writing Is Not a Detail",
                  sub: "Language is part of the interface.",
                  body: "The first usability test revealed that several terms were unclear or contradictory. Testers hesitated not because the interface was poorly structured, but because they were unsure what an action meant. A chef does not have time to interpret ambiguous labels. They scan for information and act. This finding led to a complete revision of the UX writing, supported by adjustments to the typographic scale and visual hierarchy. The layout stayed. The language was rebuilt.",
                },
              ].map(({ num, title, sub, body }) => (
                <div key={num} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 28, paddingTop: 32, paddingBottom: 32, borderTop: "1px solid #f2f4f7" }}>
                  <span style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#98a1b2", letterSpacing: "0.1em", paddingTop: 3 }}>{num}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <h3 style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 600, color: "#1d2939", margin: 0, letterSpacing: "-0.01em" }}>{title}</h3>
                    <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 12, fontWeight: 500, color: "#98a1b2", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>{sub}</p>
                    <p className="mc-body-text" style={{ marginTop: 8 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05. Testing & Iteration ──────────────── */}
        <section className="mc-section" id="testing">
          <div className="mc-section-inner">
            <span className="mc-section-label">05 — Testing & Iteration</span>
            <h2 className="mc-section-title">Validating the early warning system</h2>

            <div className="mc-branding-body">
              <p className="mc-body-text">
                I tested the prototype with people from the gastronomy environment to evaluate whether the alert system was understandable and easy to use. The scenario simulated two simultaneous supply problems: a quality issue and a delivery delay. Participants had to resolve both within three minutes.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
              {([
                {
                  tag: "What worked", tagBg: "#d1fae5", tagColor: "#065f46",
                  title: "The F-pattern layout held.",
                  body: "Testers scanned the information intuitively. The visual hierarchy guided attention without requiring additional instructions. No tester struggled to locate the relevant information.",
                },
                {
                  tag: "What failed", tagBg: "#fee2e2", tagColor: "#991b1b",
                  title: "The UX writing created hesitation.",
                  body: "Several terms were unclear or contradictory. Participants hesitated because they could not confidently predict the outcome of an action. Layout was fine — language was creating friction.",
                },
                {
                  tag: "What changed", tagBg: "#dbeafe", tagColor: "#1e40af",
                  title: "The language was rebuilt.",
                  body: "Every label, status, and action was reviewed. Ambiguous terms were rewritten, terminology standardized, typographic scale adjusted, and visual hierarchy between actions was strengthened.",
                },
              ] as const).map(({ tag, tagBg, tagColor, title, body }) => (
                <div key={tag} style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ display: "inline-block", background: tagBg, color: tagColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, alignSelf: "flex-start", fontFamily: "Author, system-ui, sans-serif" }}>{tag}</span>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 17, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.3 }}>{title}</p>
                  <p className="mc-body-text" style={{ fontSize: 16 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06. Before & After ───────────────────── */}
        <section className="mc-section" id="before-after">
          <div className="mc-section-inner">
            <span className="mc-section-label">06 — Before & After</span>
            <h2 className="mc-section-title">From generic labels to clear language</h2>
            <p className="mc-body-text">
              The first usability test revealed that interface clarity depends on more than layout. The wording itself can either support or interrupt a decision.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
              <div style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "28px 32px" }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#98a1b2", margin: "0 0 20px" }}>Before — first usability test</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "Generic status terms created hesitation at decision points.",
                    "Inconsistent terminology — same action described differently across screens.",
                    "Unclear calls to action — users could not determine what would happen next.",
                    "Flat visual hierarchy — primary and secondary actions carried similar weight.",
                  ].map(item => (
                    <li key={item} style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 16, color: "#667085", lineHeight: 1.55, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "#fca5a5", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "28px 32px", background: "#f9fbf9" }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ade80", margin: "0 0 20px" }}>After — revised interface</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "Clear status badges — each state communicates its meaning directly.",
                    "Consistent action language following the same logic across screens.",
                    "Primary actions are visually dominant; secondary actions recede.",
                    "Scannable labels written for users working under time pressure.",
                  ].map(item => (
                    <li key={item} style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 16, color: "#667085", lineHeight: 1.55, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: "#4ade80", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 24, padding: "20px 24px", background: "#f8f9fa", borderRadius: 12 }}>
              <p className="mc-body-text" style={{ fontSize: 16, margin: 0 }}>
                <strong style={{ color: "#1d2939" }}>The design decision</strong> — I kept the layout that testing showed to be effective and focused the iteration on the elements that created friction. This avoided redesigning the entire interface when the evidence pointed to a more specific problem.
              </p>
            </div>
          </div>
        </section>

        {/* ── 07. Design System ────────────────────── */}
        <section className="mc-section" id="design-system">
          <div className="mc-section-inner">
            <span className="mc-section-label">07 — Design System</span>
            <h2 className="mc-section-title">Connecting design and code to reduce design drift</h2>

            <div className="mc-branding-body">
              <p className="mc-body-text">
                A consistent product experience requires more than well-designed individual screens. For Supply Pro, I explored a connected workflow using MCP to bring the code implementation into Figma and align the design artifacts with the product's actual UI.
              </p>
              <p className="mc-body-text">
                Rather than maintaining two disconnected representations of the same interface, this approach created a closer relationship between the implemented components and their visual representation.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, margin: "40px 0" }}>
              {[
                { num: "01", title: "Codebase", body: "The existing implementation provided the reference for the product's actual UI, including its components, styles, and interface patterns." },
                { num: "02", title: "MCP-powered workflow", body: "I used MCP as part of the process for connecting the implementation with the design environment and bringing the relevant UI into Figma." },
                { num: "03", title: "Figma alignment", body: "The resulting design artifacts helped make the interface easier to inspect and maintain, with a clearer relationship to the implementation." },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#98a1b2", letterSpacing: "0.1em" }}>{num}</span>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 17, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.3 }}>{title}</p>
                  <p className="mc-body-text" style={{ fontSize: 16 }}>{body}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { title: "Reducing design drift", body: "Keeps what the team sees in Figma aligned with what users experience in the product." },
                { title: "Consistency across components", body: "A shared visual language preserves patterns for buttons, tables, status badges, alerts, and form controls." },
                { title: "A stronger foundation for iteration", body: "When design artifacts reflect the implementation more closely, future improvements start from a reliable reference." },
              ].map(({ title, body }) => (
                <div key={title} style={{ paddingTop: 20, borderTop: "1px solid #f2f4f7" }}>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: "#1d2939", margin: "0 0 8px" }}>{title}</p>
                  <p className="mc-body-text" style={{ fontSize: 15 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08. The Solution ─────────────────────── */}
        <section className="mc-section" id="solution">
          <div className="mc-section-inner">
            <span className="mc-section-label">08 — The Solution</span>
            <h2 className="mc-section-title">Three screens. One clear flow.</h2>

            <div className="mc-branding-body">
              <p className="mc-body-text">
                Supply Pro focuses on a single operational moment: the gap between placing an order and receiving a delivery. The product is fully responsive, with the iPad as the primary device. In a professional kitchen, it can remain accessible to the team throughout service.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 40 }}>
              {[
                {
                  num: "01",
                  title: "Early Warning — Alert Screen",
                  body: "The Early Warning Screen uses a table layout designed for high-pressure kitchen environments. Critical information is easy to scan. Status badges communicate urgency at a glance, helping the chef understand what requires attention. From there, the chef makes a clear decision: accept a suggested alternative or dismiss it.",
                },
                {
                  num: "02",
                  title: "Alternative Product Selection",
                  body: "When a supplier is unavailable, the system suggests products from an alternative supplier. The chef selects only what is urgently needed. Alternatives are organized alphabetically to reduce search effort. Checkboxes support the selection of one or multiple products without switching screens. Price, delivery time, and availability help the chef evaluate the alternatives.",
                },
                {
                  num: "03",
                  title: "Dashboard — Order Overview",
                  body: "The dashboard gives the chef an overview of daily supply operations in one place. Four summary cards surface key information. Active alerts are positioned in the top-right area and highlighted in orange to make urgent issues easier to spot. The Recent Orders table uses the same status-badge system as the Early Warning Screen, maintaining a consistent visual language across the product.",
                },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr", gap: 28, paddingTop: 40, paddingBottom: 40, borderTop: "1px solid #f2f4f7", alignItems: "start" }}>
                  <span style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#98a1b2", letterSpacing: "0.1em", paddingTop: 3 }}>{num}</span>
                  <div>
                    <h3 style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: "clamp(17px, 1.8vw, 22px)", fontWeight: 600, color: "#1d2939", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{title}</h3>
                    <p className="mc-body-text" style={{ fontSize: 17 }}>{body}</p>
                  </div>
                  <div style={{ background: "#f2f4f7", borderRadius: 12, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 12, color: "#98a1b2", letterSpacing: "0.08em", textTransform: "uppercase" }}>Screen {num}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <a href="#" className="mc-discovery-btn">
                View interactive prototype {ARROW}
              </a>
            </div>
          </div>
        </section>

        {/* ── 09. KPIs ─────────────────────────────── */}
        <section className="mc-section" id="kpis">
          <div className="mc-section-inner">
            <span className="mc-section-label">09 — KPIs</span>
            <h2 className="mc-section-title">Measuring what matters</h2>
            <p className="mc-body-text">
              Supply Pro's success needs to be evaluated at two levels: the business problem it aims to address and the product's ability to help users act on that problem.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 48 }}>
              <div style={{ borderTop: "1px solid #f2f4f7", paddingTop: 24 }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#98a1b2", margin: "0 0 16px" }}>Business metric 01 — Labour Cost Recovery</p>
                <p className="mc-metric-value" style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}>€4,300–€7,300</p>
                <p className="mc-metric-label">Estimated annual labour cost per kitchen from manually managing supplier problems, at €28/hour for 3–5 hours/week.</p>
              </div>
              <div style={{ borderTop: "1px solid #f2f4f7", paddingTop: 24 }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#98a1b2", margin: "0 0 16px" }}>Business metric 02 — Supply Chain Inefficiency</p>
                <p className="mc-metric-value" style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}>€28,000</p>
                <p className="mc-metric-label">Potential recovery at 10% efficiency gain for a mid-sized restaurant spending €280,000 annually on suppliers.</p>
              </div>
            </div>

            <Divider />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[
                {
                  label: "Product metric 01 — Time to Action",
                  value: "< 2 min",
                  desc: "Time between receiving an alert and taking action.",
                  note: "Measures whether users can interpret the alert and decide how to respond without unnecessary friction.",
                },
                {
                  label: "Product metric 02 — Task Completion Rate",
                  value: "< 5 min",
                  desc: "End-to-end task: reviewing an alert and confirming an alternative order or dismissing it.",
                  note: "Evaluates whether users can move from identifying a problem to taking the intended action.",
                },
              ].map(({ label, value, desc, note }) => (
                <div key={label} style={{ borderTop: "1px solid #f2f4f7", paddingTop: 24 }}>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#98a1b2", margin: "0 0 16px" }}>{label}</p>
                  <p className="mc-metric-value" style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}>{value}</p>
                  <p className="mc-metric-label">{desc}</p>
                  <p className="mc-body-text" style={{ fontSize: 15, marginTop: 4 }}>{note}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, padding: "20px 24px", background: "#f8f9fa", borderRadius: 12 }}>
              <p className="mc-body-text" style={{ fontSize: 15, margin: 0 }}>
                Usability testing evaluates whether the proposed interface supports the intended tasks. It does not, by itself, prove that Supply Pro has generated annual savings. Validating the business impact would require measuring the operational results of using the product over time.
              </p>
            </div>
          </div>
        </section>

        {/* ── 10. Product Outlook ──────────────────── */}
        <section className="mc-section" id="outlook">
          <div className="mc-section-inner">
            <span className="mc-section-label">10 — Product Outlook</span>
            <h2 className="mc-section-title">The next three versions</h2>
            <p className="mc-body-text">
              The long-term vision is for Supply Pro to become the operational memory of a professional kitchen: a system that not only identifies supply issues but also connects the kitchen and its suppliers throughout the delivery process.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
              {[
                {
                  version: "V1.5",
                  title: "GPS Tracking",
                  body: "Real-time delivery location visible to the chef. Reduces uncertainty between order confirmation and arrival.",
                  signal: "Requested explicitly in 6 of the 10 chef interviews.",
                },
                {
                  version: "V2",
                  title: "Supplier Portal",
                  body: "A dedicated portal where suppliers can actively confirm order status and communicate relevant updates. Closes the communication loop between the kitchen and the supply chain.",
                  signal: "Supplier interviews identified a mutual need for clearer coordination.",
                },
                {
                  version: "V3",
                  title: "Photo Recognition at Goods Receipt",
                  body: "AI-assisted detection and documentation of potential product-quality issues during goods receipt. Extends the product experience to the final stage of the supply workflow.",
                  signal: "Helps teams document discrepancies at delivery with less manual effort.",
                },
              ].map(({ version, title, body, signal }) => (
                <div key={version} style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#1d2939", letterSpacing: "0.06em" }}>{version}</span>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 20, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</p>
                  <p className="mc-body-text" style={{ fontSize: 16 }}>{body}</p>
                  <div style={{ height: 1, background: "#f2f4f7" }} />
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, color: "#98a1b2", fontStyle: "italic", margin: 0 }}>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. Lessons Learned ──────────────────── */}
        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <span className="mc-section-label">11 — Lessons Learned</span>
            <h2 className="mc-section-title">What this project taught me</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  title: "Tight scope is a strategic decision.",
                  body: "Focusing on one operational moment helped keep the product grounded in a specific, high-value problem. A narrow MVP is not a weakness. It is a way to create a coherent solution without unnecessary complexity.",
                },
                {
                  title: "Domain knowledge sharpens methods.",
                  body: "Seventeen years in professional kitchens helped me ask more relevant questions, interpret the context, and challenge assumptions. Domain knowledge does not replace UX methods. It makes them more precise.",
                },
                {
                  title: "Test with low fidelity earlier.",
                  body: "The first usability test came too late in the process. Earlier low-fidelity testing could have revealed language and flow problems before more time was invested in visual refinement.",
                },
                {
                  title: "Design consistency needs an ongoing process.",
                  body: "The work connecting code and Figma reinforced the importance of keeping design artifacts close to the implemented product. A design system is not just a collection of components; it is part of how a product remains consistent as it evolves.",
                },
              ].map(({ title, body }) => (
                <div key={title} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, paddingTop: 28, paddingBottom: 28, borderTop: "1px solid #f2f4f7" }}>
                  <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.4 }}>{title}</p>
                  <p className="mc-body-text" style={{ fontSize: 17 }}>{body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 56 }}>
              <figure className="t2-figure">
                <blockquote className="t2-quote">
                  <span className="t2-mark t2-mark--open">"</span>
                  <span className="t2-text">Even though it was in another language, you could still figure out what to do. In fact, it's super clear, it's not at all hard to understand how it works. There's nothing superfluous; it simply provides the necessary information.</span>
                  <span className="t2-mark t2-mark--close">"</span>
                </blockquote>
                <figcaption className="t2-caption">
                  <span className="t2-line" />
                  <div className="t2-author">
                    <div className="t2-author-text">
                      <span className="t2-name">Valentin Chappuis</span>
                      <span className="t2-tagline">Pastry Chef, Vegan Restaurant Aujourd'hui Demain, Paris, France</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── 12. Sources & Links ──────────────────── */}
        <section className="mc-section">
          <div className="mc-section-inner">
            <span className="mc-section-label">12 — Sources & Links</span>
            <h2 className="mc-section-title">Explore the full work</h2>

            <div className="mc-links-row">
              {[
                { label: "View live app",                    href: "#" },
                { label: "Interview documentation",          href: "#" },
                { label: "Usability testing documentation",  href: "#" },
                { label: "Interactive prototype",            href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="mc-store-btn">{label} {ARROW}</a>
              ))}
            </div>

            <Divider />

            <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#98a1b2", margin: "0 0 20px" }}>More work</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <a href="microcasing.html" style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "24px 28px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 6 }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d5dd"; (e.currentTarget as HTMLAnchorElement).style.background = "#f8f9fa"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f2f4f7"; (e.currentTarget as HTMLAnchorElement).style.background = ""; }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, color: "#98a1b2", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Mobile App · EdTech · Branding</p>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 20, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.2 }}>Micro-casing App</p>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 14, color: "#667085", margin: 0 }}>View case study →</p>
              </a>
              <a href="#" style={{ border: "1px solid #f2f4f7", borderRadius: 16, padding: "24px 28px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 6 }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d0d5dd"; (e.currentTarget as HTMLAnchorElement).style.background = "#f8f9fa"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f2f4f7"; (e.currentTarget as HTMLAnchorElement).style.background = ""; }}>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 11, color: "#98a1b2", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Vibecoding · Design Engineering</p>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 20, fontWeight: 600, color: "#1d2939", margin: 0, lineHeight: 1.2 }}>AI Playground</p>
                <p style={{ fontFamily: "Author, system-ui, sans-serif", fontSize: 14, color: "#667085", margin: 0 }}>View experiments →</p>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
