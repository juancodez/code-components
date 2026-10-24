import { motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import TechText from "./components/TechText/TechText";
import { CardStudioTile } from "./tiles/CardStudioTile";
import { BalanceTile } from "./tiles/BalanceTile";
import { ChecklistTile } from "./tiles/ChecklistTile";
import { LiquidToggleTile } from "./tiles/LiquidToggleTile";
import { ModelPickerTile } from "./tiles/ModelPickerTile";
import "./App.css";

const CARDS = [
  {
    slug: "model-picker",
    title: "Model Picker",
    description: "A provider-first model chooser. Rail on the left, search and list on the right, thinking-effort track along the bottom.",
    Tile: ModelPickerTile,
  },
  {
    slug: "checklist",
    title: "Checklist",
    description: "A task completion component with physics-based fall animations. Items drop away on completion, giving each action satisfying weight.",
    Tile: ChecklistTile,
  },
  {
    slug: "card-studio",
    title: "Card Studio",
    description: "A configurable image card. Dial in corner radius, add a silver or gold border beam, and toggle 3D tilt — then copy the exact code for your settings.",
    Tile: CardStudioTile,
  },
  {
    slug: "balance",
    title: "Balance Chart",
    description: "An exploration of financial data scrubbing. The cursor tracks the curve live, turning passive charting into a tactile experience.",
    Tile: BalanceTile,
  },
  {
    slug: "liquid-toggle",
    title: "Liquid Toggle",
    description: "A gooey toggle using spring-chased blending. Two states melt into each other rather than snapping.",
    Tile: LiquidToggleTile,
  },
];

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
  softness: 0.7,
  lineStyle: "dashed" as const,
  strokeWidth: 1.5,
  bounce: 0.4,
  selection: true,
  labels: true,
  color: "currentColor",
  align: "center" as const,
  draggable: true,
  sweep: true,
  speed: 0.7,
  intro: "type" as const,
  introDuration: 2.4,
};

function PostHero() {
  return (
    <section className="hero post-hero">
      <div className="hero-header">
        <div className="hero-identity">
          <Avatar />
        </div>
      </div>
      <div className="hero-about">
        <div className="hero-techtext-wrap">
          <TechText text="Design Engineering" {...techProps} />
        </div>
        <div className="hero-techtext-wrap hero-techtext-wrap--lg">
          <TechText text="Labs" {...techProps} />
        </div>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          Click around to discover the different interactions.<br />
          Interactive UI components built to explore motion, state and interaction. Copy the code.
        </motion.p>
      </div>
    </section>
  );
}

export default function PostApp() {
  return (
    <div className="page page-white">
      <header className="site-header">
        <Nav />
      </header>
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
      </main>
      <Footer />
    </div>
  );
}
