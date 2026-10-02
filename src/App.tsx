import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { ExloPrototype } from "./components/ExloPrototype";
import "./App.css";

const PROJECTS = [
  {
    slug: "hashbank",
    bg: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)",
    title: "hashbank: one app for your whole financial life",
    subtitle: "Built for people who need both",
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
        <Nav />
      </div>

      <div className="hero-about">
        <h1 className="hero-h1">From hypothesis to shipped product.</h1>
        <p className="hero-body">My path goes from research to code.</p>
      </div>

      <div className="projects-wrap">
        {PROJECTS.map(p => {
          const inner = <>
            {p.slug === "exlo"
              ? <ExloPrototype />
              : <div className="project-video-wrap" style={{ background: p.bg }} />
            }
            <div className="project-text">
              <h2 className="project-title">{p.title}</h2>
              <p className="project-sub">{p.subtitle}</p>
            </div>
          </>;
          return p.slug === "exlo"
            ? <div key={p.slug} className="project-card">{inner}</div>
            : <a key={p.slug} className="project-card" href={`./projects/${p.slug}`}>{inner}</a>;
        })}

        <div className="footer-nav">
          <a href="post.html" className="footer-link-card">
            <div className="footer-link-texts">
              <span className="footer-link-label">View Posts</span>
              <h4 className="footer-link-heading">My Experiments</h4>
            </div>
            <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
              <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
            </svg>
          </a>
          <a href="about.html" className="footer-link-card">
            <div className="footer-link-texts">
              <span className="footer-link-label">View About</span>
              <h4 className="footer-link-heading">Read My Story</h4>
            </div>
            <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
              <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <Hero />
      <Footer />
    </div>
  );
}
