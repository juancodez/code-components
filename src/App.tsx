import { AspectRatioTile } from "./tiles/AspectRatioTile";
import { PullToRefreshTile } from "./tiles/PullToRefreshTile";
import "./App.css";

/* Add a tile here when you build a new component. Each tile
   renders its own live component + hover chrome + panel. */
const TILES = [
  { slug: "aspect-ratio", Tile: AspectRatioTile },
  { slug: "pull-to-refresh", Tile: PullToRefreshTile },
];

const TOTAL = 5;

export default function App() {
  return (
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
  );
}
