import { Nav } from "./components/Nav";
import { PhotoScatter } from "./sections/PhotoScatter";
import { MusicPlayer } from "./sections/MusicPlayer";
import { XCard } from "./sections/XCard";
import { MediumCard } from "./sections/MediumCard";
import { VideoPlayer } from "./sections/VideoPlayer";
import "./App.css";

const SKILLS = ["Figma", "React", "TypeScript", "Design Systems", "Solidity", "Node.js"];

export default function AboutApp() {
  return (
    <div className="page">
      <div className="nav-wrap">
        <Nav />
      </div>

      <section id="about" className="about-section">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <p className="hero-body">
            I'm Juan Gomez-Vara — a product designer and developer based in Germany. I've spent
            the last several years at the intersection of design and engineering, building design
            systems, interfaces, and full-stack products from scratch.
          </p>
          <p className="hero-body">
            My background spans early-stage startups, freelance consulting, and UX research.
            I care about craft: the kind of product where every decision earns its place.
          </p>
          <div className="about-tags">
            {SKILLS.map(s => <span key={s} className="about-tag">{s}</span>)}
          </div>
          <div className="about-widgets">
            <MusicPlayer />
            <XCard />
            <MediumCard />
            <VideoPlayer />
          </div>
        </div>
      </section>

      <PhotoScatter />
    </div>
  );
}
