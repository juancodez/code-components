import { useEffect, useRef } from "react";
import gsap from "gsap";

const ROWS = 10;
const COLS = 16;
const COLOR = "#0c0c0c";

type Cell = { el: HTMLDivElement; row: number; col: number };

function buildOverlay(container: HTMLDivElement): Cell[] {
  const cells: Cell[] = [];
  container.style.setProperty("--px-cols", String(COLS));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const el = document.createElement("div");
      el.className = "px-cell";
      container.appendChild(el);
      cells.push({ el, row: r, col: c });
    }
  }
  return cells;
}

function showOverlay(cells: Cell[], container: HTMLDivElement): Promise<void> {
  return new Promise(resolve => {
    gsap.set(container, { pointerEvents: "all", opacity: 1 });
    gsap.fromTo(
      cells.map(c => c.el),
      { scale: 0, opacity: 0, transformOrigin: "50% 0%" },
      {
        scale: 1.02, opacity: 1,
        duration: 0.35, ease: "power3.inOut",
        stagger: (i, _, arr) => {
          const cell = arr[i] as unknown as Cell;
          return 0.025 * (cells[i].row + gsap.utils.random(0, 4));
        },
        onComplete: resolve,
      }
    );
  });
}

function hideOverlay(cells: Cell[], container: HTMLDivElement): Promise<void> {
  return new Promise(resolve => {
    gsap.fromTo(
      cells.map(c => c.el),
      { transformOrigin: "50% 100%", scale: 1, opacity: 1 },
      {
        scale: 0, opacity: 0,
        duration: 0.3, ease: "power2.in",
        stagger: (i) => 0.02 * (cells[i].row + gsap.utils.random(0, 4)),
        onComplete: () => {
          gsap.set(container, { pointerEvents: "none", opacity: 0 });
          resolve();
        },
      }
    );
  });
}

/** Call before navigating away — shows the overlay then sets sessionStorage flag */
export async function pixelNavigate(href: string): Promise<void> {
  const container = document.getElementById("px-overlay") as HTMLDivElement | null;
  if (!container) { window.location.href = href; return; }
  const cells = (window as unknown as Record<string, unknown>).__pxCells as Cell[] | undefined;
  if (!cells) { window.location.href = href; return; }
  sessionStorage.setItem("px-transition", "1");
  await showOverlay(cells, container);
  window.location.href = href;
}

export function PixelOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cells = buildOverlay(ref.current);
    (window as unknown as Record<string, unknown>).__pxCells = cells;

    const arriving = sessionStorage.getItem("px-transition") === "1";
    if (arriving) {
      sessionStorage.removeItem("px-transition");
      gsap.set(ref.current, { pointerEvents: "all", opacity: 1 });
      cells.forEach(c => gsap.set(c.el, { scale: 1, opacity: 1 }));
      hideOverlay(cells, ref.current);
    } else {
      gsap.set(ref.current, { pointerEvents: "none", opacity: 0 });
    }
  }, []);

  return <div id="px-overlay" ref={ref} className="px-overlay" aria-hidden="true" />;
}
