import { motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { TextReveal } from "./components/ui/text-reveal";
import { TestimonialSlider } from "./components/TestimonialSlider";
import "./App.css";

type Project = { slug: string; bg: string; video?: string; gif?: string; videoFit?: "cover" | "contain"; title: string; subtitle: string; href?: string; hoverLabel?: string };

const PROJECTS: Project[] = [
  {
    slug: "hashbank",
    bg: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)",
    video: "/mca-thumbnail.mp4",
    title: "Micro-casing Edtech app helping aspiring consultants land a spot at Mckinsey or Bain.",
    subtitle: "The Redesign drove 508% growth",
  },
  {
    slug: "data-table",
    bg: "linear-gradient(145deg, #0f2027 0%, #203a43 55%, #2c5364 100%)",
    video: "/klaro.mp4",
    videoFit: "contain",
    href: "https://www.klaro-es.com",
    hoverLabel: "Case study coming soon · Click to see the live product",
    title: "Klaro AI Native live product I engineer to help Spanish-speaking freelancers in Germany file their tax declaration.",
    subtitle: "Designed to save between €300 and €1,000 a year per user.",
  },
  {
    slug: "design-system",
    bg: "linear-gradient(145deg, #1a0533 0%, #3b1054 55%, #7c3aed 100%)",
    title: "Design system: how we redesigned a live bank without breaking it",
    subtitle: "The invisible work that made hashbank possible",
  },
  {
    slug: "exlo",
    bg: "linear-gradient(145deg, #0a0f1e 0%, #1a2744 55%, #2e4a8f 100%)",
    gif: "/exlo-gif.gif",
    title: "Exlo: Plugin for Figma",
    subtitle: "Helping Designers increase their workflow with a tool that allows multi export multifile at once",
  },
];

function Hero() {
  return (
    <section className="hero">
      <div className="hero-header">
        <div className="hero-identity">
          <Avatar />
        </div>
      </div>
      <div className="hero-about">
        <TextReveal
          as="h1"
          className="hero-h1"
          per="word"
          preset="fade-in-blur"
          speedReveal={1.2}
        >
          My name is Juan.
        </TextReveal>
        <motion.h1
          className="hero-h1"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <span className="abt-iref">
            Product Designer who engineers.
            <div className="abt-iref-pop">
              <img src="/github-contrib.png" alt="GitHub contribution graph" className="abt-iref-img" />
            </div>
          </span>
        </motion.h1>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          My path goes from the hypothesis to code.{" "}
          <span className="abt-iref">
            Designing systems
            <div className="abt-iref-pop">
              <img src="/design-system-mca.png" alt="MCA design system" className="abt-iref-img" />
            </div>
          </span>
          , creating{" "}
          <span className="abt-iref">
            AI augmented workflows
            <div className="abt-iref-pop">
              <img src="/claude-cli.jpeg" alt="Claude Code CLI" className="abt-iref-img" />
            </div>
          </span>
          {" "}and{" "}
          <span className="abt-iref">
            implementing on code
            <div className="abt-iref-pop">
              <img src="/code.jpg" alt="Code" className="abt-iref-img" />
            </div>
          </span>
          .
        </motion.p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <Nav />
      </header>
      <Hero />
      <div className="projects-wrap">
        {PROJECTS.map(p => {
          const inner = (
            <>
              {p.gif
                ? <img className="project-video-wrap" src={p.gif} alt={p.title} />
                : p.video
                ? <video className="project-video-wrap" src={p.video} autoPlay loop muted playsInline style={p.videoFit ? { objectFit: p.videoFit } : undefined} />
                : <div className="project-video-wrap" style={{ background: p.bg }} />
              }
              {p.hoverLabel && (
                <div className="project-hover-overlay">
                  <span className="project-hover-label">{p.hoverLabel}</span>
                </div>
              )}
              <div className="project-text">
                <h2 className="project-title">{p.title}</h2>
                <p className="project-sub">{p.subtitle}</p>
              </div>
            </>
          );
          const href = p.href
            ?? (p.slug === "hashbank" ? "microcasing.html"
            : p.slug === "exlo" ? "exlo.html"
            : `./projects/${p.slug}`);
          return <a key={p.slug} className="project-card" href={href} target={p.href ? "_blank" : undefined} rel={p.href ? "noopener noreferrer" : undefined}>{inner}</a>;
        })}
      </div>
      <TestimonialSlider />
      <Footer />
    </div>
  );
}
