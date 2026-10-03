import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { ExloPrototype } from "./components/ExloPrototype";
import "./App.css";

const PROJECTS = [
  {
    slug: "hashbank",
    bg: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)",
    title: "Micro-casing Edtech app helping aspiring consultants land a spot at Mckinsey or Bain.",
    subtitle: "The Redesign drove 508% growth",
  },
  {
    slug: "data-table",
    bg: "linear-gradient(145deg, #0f2027 0%, #203a43 55%, #2c5364 100%)",
    title: "Data table: After 10,000 rows",
    subtitle: "Where work actually happens, but nobody designs for it",
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
          <div className="hero-name-block">
            <span className="hero-name">Juan Gomez Vara</span>
            <span className="hero-role">Product Designer who engineers.</span>
          </div>
        </div>
      </div>
      <div className="hero-about">
        <h1 className="hero-h1">From hypothesis to shipped product.</h1>
        <p className="hero-body">My path goes from research to code.</p>
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
              {p.slug === "exlo"
                ? <ExloPrototype />
                : <div className="project-video-wrap" style={{ background: p.bg }} />
              }
              <div className="project-text">
                <h2 className="project-title">{p.title}</h2>
                <p className="project-sub">{p.subtitle}</p>
              </div>
            </>
          );
          const href = p.slug === "hashbank" ? "microcasing.html" : `./projects/${p.slug}`;
          return p.slug === "exlo"
            ? <div key={p.slug} className="project-card">{inner}</div>
            : <a key={p.slug} className="project-card" href={href}>{inner}</a>;
        })}
      </div>
      <Footer />
    </div>
  );
}
