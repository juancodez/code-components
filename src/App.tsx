import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import "./App.css";

const PROJECTS = [
  { name: "Klaro", type: "Product", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
  { name: "Supply Pro", type: "Product", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
  { name: "TrustEscrow", type: "Web3", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
  { name: "Exlo", type: "Plugin", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
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
        <h1 className="hero-h1">A Product designer who engineers.</h1>
        <p className="hero-body">
          I collaborate with founders and teams to craft design systems, interfaces, and scalable
          software — from Figma tokens to production code. Whether it's a bold new product or a
          system in need of structure, I bring both sides to the table.
        </p>
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
      <Footer />
    </div>
  );
}
