import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { PhotoScatter } from "./sections/PhotoScatter";
import { MusicPlayer } from "./sections/MusicPlayer";
import { MediumCard } from "./sections/MediumCard";
import { VideoPlayer } from "./sections/VideoPlayer";
import { ClaudeWidget } from "./sections/ClaudeWidget";
import "./App.css";

function AboutHero() {
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
    </section>
  );
}

export default function AboutApp() {
  return (
    <div className="page">
      <AboutHero />

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
          <div className="about-widgets">
            <MusicPlayer />
            <MediumCard />
            <VideoPlayer />
            <ClaudeWidget />
          </div>
        </div>
      </section>

      <PhotoScatter />
      <Footer />
    </div>
  );
}
