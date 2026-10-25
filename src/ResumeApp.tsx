import { RiMailLine, RiLinkedinBoxLine, RiGlobalLine, RiGithubLine, RiMapPinLine } from "@remixicon/react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import "./App.css";
import "./ResumeApp.css";

const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const EXPERIENCE = [
  {
    role: "UX/UI Designer",
    company: "Bcomm.",
    location: "Part-time · Berlin, Germany",
    date: "Oct 2026 – Present",
    bullets: [
      "Collaborated with the Bcomm. creative team to design UX and interfaces for B2B corporate websites and landing pages — user flows, wireframes, and high-fidelity UI in Figma — connecting usability, visual consistency, and brand communication across client projects.",
      "Built a multibrand Figma design system for Bcomm. client brands, creating reusable components and interaction patterns that standardize UI delivery across all digital touchpoints.",
    ],
  },
  {
    role: "Freelance Product & UX/UI Designer",
    company: "Independent",
    location: "Berlin, Germany",
    date: "May 2025 – Present",
    bullets: [
      "Built Klaro — an end-to-end SaaS tax-declaration platform for Spanish-speaking freelancers in Germany, spanning UX research through AI-assisted front-end — saving users €300–1,000/year on German tax declarations.",
      "Led a systematic UX audit plus full onboarding funnel redesign for a consumer mobile app — from conversion analytics through high-fidelity UI — achieving 2.84% download-to-paid conversion with 508% subscription growth post-launch.",
      "Improved the information architecture of Supply Pro, restructuring multi-stakeholder permission flows for restaurant operators and suppliers into a unified, navigable B2B order management experience.",
    ],
  },
  {
    role: "Product Designer",
    company: "Arfve",
    location: "Stockholm, Sweden / Remote",
    date: "Feb – Apr 2025",
    bullets: [
      "Collaborated with a 5-person design team to develop Arfve's full brand system — visual language, reusable components, and campaign standards — delivering within a 2-month engagement.",
      "Led stakeholder presentations of brand identity proposals, driving the final concept to full cross-functional approval within the defined delivery window.",
    ],
  },
  {
    role: "Media Designer",
    company: "Aperçu Verlagsgesellschaft",
    location: "Berlin, Germany",
    date: "Jun 2024 – Feb 2025",
    bullets: [
      "Improved print advertising performance for publisher clients, driving a 21% increase in ad sales conversions across campaign formats.",
      "Managed end-to-end production of a published book as sole responsible — typography, layout, image editing, and press-ready file delivery — shipped to press without external revision.",
    ],
  },
  {
    role: "Culinary Design & Systems Leadership",
    company: "Hospitality",
    location: "Switzerland, France, Spain & Germany",
    date: "Mar 2005 – Aug 2022",
    bullets: [
      "Led kitchen operations across one-, two-, and three-Michelin-starred restaurants, managing teams of up to 5 under daily service pressure — contributing to two restaurants earning Michelin recognition.",
      "Managed training documentation and operational programmes for kitchen apprentices, translating high-complexity service processes into repeatable step-by-step systems used across 3+ restaurant teams.",
    ],
  },
];

const SHIPPED = [
  { name: "Klaro", tags: ["Product Design", "UX/UI", "AI Dev"], desc: "Founder of a tax declaration platform for Spanish-speaking freelancers in Germany, helping them to save between €800 and €1,000 per year.", href: "https://klaro-es.com/", label: "klaro-es.com" },
  { name: "Figma Plugins ×4", tags: ["DesignOps", "Workflow Tools"], desc: "File export, type scaling, and workflow automation tools published on Figma Community.", href: "https://www.figma.com/@juangomezvara", label: "figma.com/@juangomezvara" },
  { name: "Claude Skills", tags: ["AI Workflows", "Orchestration"], desc: "Workflow orchestration plugin for structured AI-assisted design and dev workflows.", href: "https://github.com/juancodez/SKILLS", label: "github.com/juancodez/SKILLS" },
];

const TALKS = [
  { title: "Creating Plugins with AI", venue: "Mokkapp Community · Sep 2026", href: undefined },
  { title: "The \"AI\": It's Not What You Think", venue: "Medium", href: "https://medium.com/@juangomezvara/the-ai-its-not-what-you-think-b1914030308f" },
  { title: "Beyond the Hype: Luis Nagel on Why AI Needs a Human Architect", venue: "Medium", href: "https://medium.com/@juangomezvara/beyond-the-hype-luis-nagel-on-why-ai-needs-a-human-architect-25017d8b959c" },
];

const EDUCATION = [
  { degree: "Product Design Bootcamp", school: "Digitale Leute School · Berlin", year: "2026" },
  { degree: "Product Design Mentorship", school: "Antonio Diaz Cueto · Remote", year: "2026" },
  { degree: "Digital & Print Graphic Design — IHK", school: "GPB Schule · Berlin", year: "2025" },
];

const LANGUAGES = [
  { name: "French", level: "Native" },
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1 · Fluent" },
  { name: "German", level: "C1 · Fluent" },
];

const SKILLS = [
  { cat: "UX / UI", tags: ["UX Research", "Information Architecture", "Interaction Design", "Usability Testing", "Prototyping", "Conversion Optimization", "WCAG Accessibility"] },
  { cat: "Design Sys.", tags: ["Figma", "FigJam", "Component Libraries", "Design Tokens", "Miro", "Supernova"] },
  { cat: "AI & Dev", tags: ["Claude", "Claude Code", "Figma Make", "Relume", "FIGR", "Lovable", "HTML / CSS", "GitHub"] },
  { cat: "Visual", tags: ["Adobe Creative Suite", "Affinity Suite", "Typography", "Brand Design", "Styleguides"] },
];

export default function ResumeApp() {
  return (
    <div className="page">
      <header className="site-header cv-site-header">
        <Nav />
      </header>

      <main className="cv-main">

        {/* Header */}
        <div className="cv-header">
          <div>
            <h1 className="cv-name">Juan Gomez Vara</h1>
            <p className="cv-subtitle">Product Designer · Design Systems · AI-Augmented Workflows</p>
          </div>
          <button className="header-tool-btn" onClick={() => window.print()} aria-label="Print / Save as PDF">
            <PrintIcon />
          </button>
        </div>

        <nav className="cv-contact" aria-label="Contact">
          <a href="mailto:juangomezvara@gmail.com" className="cv-contact-item"><RiMailLine size={16} aria-hidden="true" />juangomezvara@gmail.com</a>
          <span className="cv-dot" />
          <a href="https://www.linkedin.com/in/juangomezvara" className="cv-contact-item"><RiLinkedinBoxLine size={16} aria-hidden="true" />linkedin.com/in/juangomezvara</a>
          <span className="cv-dot" />
          <a href="https://juangomezvara.com" className="cv-contact-item"><RiGlobalLine size={16} aria-hidden="true" />juangomezvara.com</a>
          <span className="cv-dot" />
          <a href="https://github.com/juancodez" className="cv-contact-item"><RiGithubLine size={16} aria-hidden="true" />github.com/juancodez</a>
          <span className="cv-dot" />
          <span className="cv-contact-item"><RiMapPinLine size={16} aria-hidden="true" />Berlin, Germany</span>
        </nav>

        {/* About */}
        <section className="cv-section">
          <h2 className="cv-section-label">About</h2>
          <p className="cv-body">
            I design digital products, build scalable design systems, and develop AI-augmented workflows that connect design and implementation.
          </p>
        </section>

        {/* Experience */}
        <section className="cv-section">
          <h2 className="cv-section-label">Experience</h2>
          <ul className="cv-exp-list">
            {EXPERIENCE.map(e => (
              <li key={e.role + e.company} className="cv-exp-item">
                <div className="cv-exp-company-row">
                  <span className="cv-exp-company">{e.company}</span>
                  <span className="cv-exp-date">{e.date}</span>
                </div>
                <span className="cv-exp-role">{e.role}</span>
                <ul className="cv-bullets">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="cv-bullet">
                      <span className="cv-bullet-dot" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Shipped */}
        <section className="cv-section">
          <h2 className="cv-section-label">Shipped</h2>
          <ul className="cv-exp-list">
            {SHIPPED.map(s => (
              <li key={s.name} className="cv-exp-item">
                <div className="cv-exp-company-row">
                  <a className="cv-shipped-name" href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>
                </div>
                <p className="cv-shipped-desc">{s.desc}</p>
                <a className="cv-shipped-url" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </section>

        {/* Talks & Writing */}
        <section className="cv-section">
          <h2 className="cv-section-label">Talks & Writing</h2>
          <div className="cv-talks">
            {TALKS.map(t => (
              <div key={t.title} className="cv-talk-item">
                {t.href
                  ? <a className="cv-talk-title cv-talk-link" href={t.href} target="_blank" rel="noopener noreferrer">{t.title}</a>
                  : <span className="cv-talk-title">{t.title}</span>
                }
                <span className="cv-talk-venue">{t.venue}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education + Languages */}
        <section className="cv-section">
          <div className="cv-two-col">
            <div>
              <h2 className="cv-section-label">Education</h2>
              <div className="cv-edu-list">
                {EDUCATION.map(e => (
                  <div key={e.degree} className="cv-edu-item">
                    <div>
                      <span className="cv-edu-degree">{e.degree}</span>
                      <span className="cv-edu-school">{e.school}</span>
                    </div>
                    <span className="cv-edu-year">{e.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="cv-section-label">Languages</h2>
              <div className="cv-lang-list">
                {LANGUAGES.map(l => (
                  <div key={l.name} className="cv-lang-item">
                    <span className="cv-lang-name">{l.name}</span>
                    <span className="cv-lang-badge">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="cv-section cv-section--last">
          <h2 className="cv-section-label">Skills & Tools</h2>
          <div className="cv-skills">
            {SKILLS.map(s => (
              <div key={s.cat} className="cv-skill-row">
                <span className="cv-skill-cat">{s.cat}</span>
                <div className="cv-skill-tags">
                  {s.tags.map(t => <span key={t} className="cv-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
