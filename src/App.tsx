import { useState, useEffect } from "react";
import { AspectRatioTile } from "./tiles/AspectRatioTile";
import { BalanceTile } from "./tiles/BalanceTile";
import avatarUrl from "./assets/avatar.jpg";
import "./App.css";

const TILES = [
  { slug: "aspect-ratio", Tile: AspectRatioTile },
  { slug: "balance", Tile: BalanceTile },
];
const TOTAL = 5;

const ROLES = ["Product Designer", "Developer", "Entrepreneur", "Consultant", "Dog Lover"];

const LOGOS = ["Klaro", "Supply Pro", "ClickUp", "Protonic", "TrustEscrow", "Exlo"];

const PROJECTS = [
  { name: "Klaro", type: "Product", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
  { name: "Supply Pro", type: "Product", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
  { name: "TrustEscrow", type: "Web3", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
  { name: "Exlo", type: "Plugin", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
];

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setFading(false);
      }, 300);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero-header">
        <div className="hero-identity">
          <img src={avatarUrl} alt="Juan Gomez-Vara" className="avatar" />
          <div className="hero-name-block">
            <span className="hero-name">Juan</span>
            <span className={`hero-role${fading ? " fading" : ""}`}>{ROLES[roleIdx]}</span>
          </div>
        </div>
        <nav className="hero-cta">
          <a href="mailto:juangomezvara@gmail.com" className="btn-primary">Get in contact</a>
          <a href="https://linkedin.com/in/juangomezvara" className="btn-secondary">LinkedIn</a>
        </nav>
      </div>

      <div className="hero-about">
        <h1 className="hero-h1">I design and build products that set new standards.</h1>
        <p className="hero-body">
          I collaborate with founders and teams to craft design systems, interfaces, and scalable
          software — from Figma tokens to production code. Whether it's a bold new product or a
          system in need of structure, I bring both sides to the table.
        </p>
      </div>

      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="ticker-item">{l}</span>
          ))}
        </div>
      </div>

      <div className="projects-wrap">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div key={p.name} className="project-card">
              <div className="project-img" style={{ background: p.bg }}>
                <span className="project-img-label">{p.name}</span>
              </div>
              <div className="project-meta">
                <span className="project-name">{p.name}</span>
                <span className="project-type">{p.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <Hero />
      <main className="gallery">
        <header>
          <h1>Code Components</h1>
          <p>{TILES.length} of {TOTAL} shipped</p>
        </header>
        <ul className="stack">
          {TILES.map(({ slug, Tile }) => (
            <li key={slug}><Tile /></li>
          ))}
          {Array.from({ length: TOTAL - TILES.length }).map((_, i) => (
            <li key={`ghost-${i}`}>
              <div className="ghost">
                <span>Coming soon</span>
                <small>slot {TILES.length + i + 1} of {TOTAL}</small>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
