import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import "./App.css";

const PROJECTS = [
  {
    slug: "hashbank",
    video: "https://framerusercontent.com/assets/0lG7iLlrMlQuKB1qJ4CddTWzo.mp4",
    title: "hashbank: one app for your whole financial life",
    subtitle: "Built for people who need both",
  },
  {
    slug: "data-table",
    video: "https://framerusercontent.com/assets/Gubx4wZR4GtqUASpvUbTLQyhlY.mp4",
    title: "Data table: After 10,000 rows",
    subtitle: "Where work actually happens, but nobody designs for it",
  },
  {
    slug: "design-system",
    video: "https://framerusercontent.com/assets/Y43TDcqsno5M4iq5IHuxI0pTu2Y.mp4",
    title: "Design system: how we redesigned a live bank without breaking it",
    subtitle: "The invisible work that made hashbank possible",
  },
  {
    slug: "spacecargo",
    video: "https://framerusercontent.com/assets/ifjWCqyeg0DRj5FqoDrVwfc1QQI.mp4",
    title: "SpaceCargo: warehouse management system",
    subtitle: "67% fewer lost parcels. Zero magic involved",
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
        <h1 className="hero-h1">A Product designer who engineers.</h1>
        <p className="hero-body">
          I collaborate with founders and teams to craft design systems, interfaces, and scalable
          software — from Figma tokens to production code. Whether it's a bold new product or a
          system in need of structure, I bring both sides to the table.
        </p>
      </div>

      <div className="projects-wrap">
        {PROJECTS.map(p => (
          <a key={p.slug} className="project-card" href={`./projects/${p.slug}`}>
            <div className="project-video-wrap">
              <video src={p.video} loop autoPlay muted playsInline />
            </div>
            <div className="project-text">
              <h2 className="project-title">{p.title}</h2>
              <p className="project-sub">{p.subtitle}</p>
            </div>
          </a>
        ))}

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
