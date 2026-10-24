import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import TechText from "./components/TechText/TechText";
import figmaClaudeImg from "../assets/figma-claude.png";
import agentsClaudeImg from "../assets/agents-claude.jpg";
import "./App.css";
import "./SkillsApp.css";

type Skill = {
  slug: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  image?: string;
  installCmd: string;
};

const SKILLS: Skill[] = [
  {
    slug: "ux-research-orchestra",
    title: "UX Research Orchestra",
    category: "Research",
    description: "7-agent market research pipeline: Scout → Profiler → Quant → Benchmarker → Comparative → Hypothesis → Report.",
    gradient: "linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)",
    image: agentsClaudeImg,
    installCmd: "npx @juangv/skills install ux-research-orchestra",
  },
  {
    slug: "vibe-plan",
    title: "Vibe Plan",
    category: "Planning",
    description: "10-phase project planning companion: intake → research → exec plan → tech plan → specs → CLAUDE.md.",
    gradient: "linear-gradient(145deg, #0f2027 0%, #203a43 55%, #2c5364 100%)",
    installCmd: "npx @juangv/skills install vibe-plan",
  },
  {
    slug: "get-that-job",
    title: "Get That Job",
    category: "Career",
    description: "Full job application package in one command. Match analysis, tailored CV, cover letter, email, interview prep.",
    gradient: "linear-gradient(145deg, #0a1628 0%, #1a3a5c 55%, #2563eb 100%)",
    installCmd: "npx @juangv/skills install get-that-job",
  },
  {
    slug: "design-review",
    title: "Design Review",
    category: "Design",
    description: "Senior designer's eye for QA. Finds visual inconsistency, spacing issues, hierarchy problems, slow interactions.",
    gradient: "linear-gradient(145deg, #1a0f0a 0%, #3d1a0c 55%, #c05621 100%)",
    installCmd: "npx @juangv/skills install design-review",
  },
  {
    slug: "klaro-design",
    title: "Klaro Design",
    category: "Design System",
    description: "Design system for Klaro — the AI-native fiscal app for Spanish-speaking freelancers in Germany.",
    gradient: "linear-gradient(145deg, #001a10 0%, #003320 55%, #00684a 100%)",
    installCmd: "npx @juangv/skills install klaro-design",
  },
  {
    slug: "figma-plugin-publisher",
    title: "Figma Plugin Publisher",
    category: "Figma",
    description: "Debug and fix Figma Community plugin rejections. Covers missing files, encoding issues, undefined globals, and pre-submission checklist.",
    gradient: "linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)",
    image: figmaClaudeImg,
    installCmd: "npx @juangv/skills install figma-plugin-publisher",
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(skill.installCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function close(e: React.MouseEvent) {
    e.stopPropagation();
    setFlipped(false);
  }

  return (
    <div
      className={`skill-card${flipped ? " flipped" : ""}`}
      onClick={() => !flipped && setFlipped(true)}
      role="button"
      tabIndex={0}
      aria-label={`${skill.title} — click to see install command`}
      onKeyDown={(e) => e.key === "Enter" && !flipped && setFlipped(true)}
    >
      {/* Front */}
      <div className="skill-card-front">
        <div className="skill-cover">
          {skill.image
            ? <img className="skill-cover-img" src={skill.image} alt={skill.title} />
            : <div className="skill-cover-gradient" style={{ background: skill.gradient }} />
          }
        </div>
        <div className="skill-meta">
          <span className="skill-pill">{skill.category}</span>
          <h3 className="skill-title">{skill.title}</h3>
          <p className="skill-desc">{skill.description}</p>
        </div>
      </div>

      {/* Back — slides up */}
      <div className="skill-card-back" onClick={(e) => e.stopPropagation()}>
        <div className="skill-back-header">
          <h4 className="skill-back-title">Install Command</h4>
          <button className="skill-close-btn" onClick={close} aria-label="Close">×</button>
        </div>

        <div className="skill-code-block">
          <div className="skill-code-topbar">
            <span className="skill-code-label">npm</span>
            <button className={`skill-copy-btn${copied ? " copied" : ""}`} onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="skill-code-pre">{skill.installCmd}</pre>
        </div>

        <div className="skill-back-actions">
          <button className="skill-btn" onClick={close}>Back</button>
          <a
            className="skill-btn skill-btn-primary"
            href={`https://github.com/juancodez/skills/${skill.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}

function CopyBlock({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [cmd]);
  return (
    <div className="gs-code-block">
      <pre className="gs-pre">{cmd}</pre>
      <button className={`gs-copy-btn${copied ? " copied" : ""}`} onClick={copy}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function GettingStarted() {
  return (
    <div className="gs-section">
      <h2 className="gs-title">Getting Started with Claude Code</h2>
      <p className="gs-body">Install Claude Code skills directly to your project using npx:</p>
      <CopyBlock cmd="npx giorris-claude-skills" />
      <p className="gs-body gs-body--sm">Or install a specific skill:</p>
      <CopyBlock cmd="npx giorris-claude-skills install ai-component-metadata" />
    </div>
  );
}

const techProps = {
  fontWeight: 600 as const,
  fontSize: 140,
  reveal: "letter" as const,
  dashLength: 4,
  dashGap: 2,
  specks: 10,
  clickKick: true,
  guides: false,
  letterSpacing: 0.04,
  accentColor: "currentColor",
  reach: 180,
  softness: 0.7,
  lineStyle: "dashed" as const,
  strokeWidth: 1.5,
  bounce: 0.4,
  selection: true,
  labels: true,
  color: "currentColor",
  align: "center" as const,
  draggable: true,
  sweep: true,
  speed: 0.7,
  intro: "type" as const,
  introDuration: 2.4,
};

export default function SkillsApp() {
  return (
    <div className="page">
      <header className="site-header">
        <Nav />
      </header>
      <section className="hero">
        <div className="hero-header">
          <div className="hero-identity">
            <Avatar />
          </div>
        </div>
        <div className="hero-about">
          <div className="hero-techtext-wrap">
            <TechText text="Claude Skills" {...techProps} />
          </div>
          <motion.p
            className="hero-body"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            Free to use Claude Code skills for AI-augmented<br />
            design and engineering workflows.
          </motion.p>
        </div>
      </section>
      <div className="skills-wrap">
        <div className="skills-grid">
          {SKILLS.map((s) => <SkillCard key={s.slug} skill={s} />)}
        </div>
        <GettingStarted />
      </div>
      <Footer />
    </div>
  );
}
