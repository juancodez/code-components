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

      <div className="post-footer-nav">
        <a href="index.html" className="footer-link-card">
          <div className="footer-link-texts">
            <span className="footer-link-label">View work</span>
            <h4 className="footer-link-heading">View Case Studies</h4>
          </div>
          <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
            <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
          </svg>
        </a>
        <a href="post.html" className="footer-link-card">
          <div className="footer-link-texts">
            <span className="footer-link-label">View Posts</span>
            <h4 className="footer-link-heading">My Code Components</h4>
          </div>
          <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
            <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
          </svg>
        </a>
      </div>

      <Footer />
    </div>
  );
}
