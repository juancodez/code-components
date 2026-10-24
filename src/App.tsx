import { motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { TextReveal } from "./components/ui/text-reveal";
import { TestimonialSlider } from "./components/TestimonialSlider";
import TechText from "./components/TechText/TechText";
import "./App.css";

type Project = { slug: string; bg: string; video?: string; gif?: string; videoFit?: "cover" | "contain"; poster?: string; title: string; subtitle: string; href?: string; hoverLabel?: string };

const PROJECTS: Project[] = [
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
    title: "How I built a Design System Multibrand",
    subtitle: "The invisible work that made hashbank possible",
  },
  {
    slug: "hashbank",
    bg: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)",
    video: "/mca-thumbnail.mp4",
    title: "Micro-casing Edtech app helping aspiring consultants land a spot at Mckinsey or Bain.",
    subtitle: "The Redesign drove 508% growth",
  },
  {
    slug: "exlo",
    bg: "linear-gradient(145deg, #0a0f1e 0%, #1a2744 55%, #2e4a8f 100%)",
    gif: "/exlo-gif.gif",
    title: "Exlo: Plugin for Figma",
    subtitle: "Helping Designers increase their workflow with a tool that allows multi export multifile at once",
  },
];

function FigmaCursor() {
  return (
    <span className="figma-push-wrap" aria-hidden="true">
      <svg className="figma-push-cursor" width="15" height="18" viewBox="0 0 11 13">
        <path d="M0 0L11 6.5L6 8L3.5 13L0 0Z" />
      </svg>
      <span className="figma-push-sq" />
    </span>
  );
}

function GreenPixel() {
  return (
    <span className="green-px-wrap" aria-hidden="true">
      <span className="green-px" />
    </span>
  );
}

function Hero() {
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
    softness: 0.88,
    lineStyle: "dashed" as const,
    strokeWidth: 1.5,
    bounce: 0.15,
    selection: true,
    labels: true,
    color: "currentColor",
    align: "center" as const,
    draggable: true,
    sweep: true,
    speed: 0.35,
    intro: "assemble" as const,
    introDuration: 2.8,
  };

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
          Hi I'm Juan,
        </TextReveal>
        <div className="hero-techtext-wrap">
          <TechText text="a product designer" {...techProps} />
        </div>
        <div className="hero-techtext-wrap hero-techtext-wrap--lg">
          <TechText text="who engineers." {...techProps} />
        </div>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          My path goes from research to implementation.<br />
          Pushing pixels <FigmaCursor /> to design in Figma.<br />
          Pushing green pixels <GreenPixel /> to ship code on GitHub.
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
                ? <video className="project-video-wrap" src={p.video} poster={p.poster} autoPlay loop muted playsInline style={p.videoFit ? { objectFit: p.videoFit } : undefined} />
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
