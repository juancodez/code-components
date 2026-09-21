import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { AspectRatioTile } from "./tiles/AspectRatioTile";
import { BalanceTile } from "./tiles/BalanceTile";
import { ChecklistTile } from "./tiles/ChecklistTile";
import { CircleMenuTile } from "./tiles/CircleMenuTile";
import "./App.css";

const CARDS = [
  {
    slug: "aspect-ratio",
    title: "Aspect Ratio",
    description: "A study on constrained image display. Demonstrates how a single component enforces visual rhythm across media of any proportions.",
    Tile: AspectRatioTile,
  },
  {
    slug: "balance",
    title: "Balance Chart",
    description: "An exploration of financial data scrubbing. The cursor tracks the curve live, turning passive charting into a tactile experience.",
    Tile: BalanceTile,
  },
  {
    slug: "checklist",
    title: "Checklist",
    description: "A task completion component with physics-based fall animations. Items drop away on completion, giving each action satisfying weight.",
    Tile: ChecklistTile,
  },
  {
    slug: "circle-menu",
    title: "Circle Menu",
    description: "A radial navigation pattern. Explores how actions expand from a single focal point rather than a linear list.",
    Tile: CircleMenuTile,
  },
];

function PostHero() {
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

export default function PostApp() {
  return (
    <div className="page page-white">
      <PostHero />
      <main className="post-main">
        <div className="post-list">
          {CARDS.map(({ slug, title, description, Tile }) => (
            <div key={slug} className="post-entry">
              <div className="post-entry-media">
                <Tile />
              </div>
              <div className="post-entry-info">
                <h2 className="post-entry-title">{title}</h2>
                <p className="post-entry-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="post-footer-nav">
          <a href="index.html" className="footer-link-card">
            <div className="footer-link-texts">
              <span className="footer-link-label">View work</span>
              <h4 className="footer-link-heading">View Case Studies</h4>
            </div>
            <svg className="footer-link-arrow" viewBox="0 0 20 20" fill="none">
              <path d="M2 18 L17 3 M7 3 H17 V13" stroke="#0c0c0c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="about.html" className="footer-link-card">
            <div className="footer-link-texts">
              <span className="footer-link-label">View about</span>
              <h4 className="footer-link-heading">Read My Story</h4>
            </div>
            <svg className="footer-link-arrow" viewBox="0 0 20 20" fill="none">
              <path d="M2 18 L17 3 M7 3 H17 V13" stroke="#0c0c0c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
