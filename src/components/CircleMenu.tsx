import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";

export type CircleMenuItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

export function CircleMenu({
  items,
  radius = 96,
  openIcon,
  closeIcon,
  fill = "dark",
  onToggle,
}: {
  items: CircleMenuItem[];
  radius?: number;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  fill?: "light" | "dark";
  onToggle?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const step = (2 * Math.PI) / items.length;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={"cm-root" + (fill === "dark" ? " cm-dark" : "")}>
      <AnimatePresence>
        {open &&
          items.map((it, i) => {
            const angle = i * step - Math.PI / 2;
            /* Spiral path: sweep an extra ~180deg as the radius grows from 0 to full. */
            const steps = 8;
            const xs: number[] = [];
            const ys: number[] = [];
            for (let s = 0; s <= steps; s++) {
              const t = s / steps;
              const r = radius * t;
              const spin = angle - (1 - t) * Math.PI;
              xs.push(Math.cos(spin) * r);
              ys.push(Math.sin(spin) * r);
            }
            return (
              <motion.div
                key={i}
                className="cm-item"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{ x: xs, y: ys, opacity: 1, scale: 1 }}
                exit={{ x: [...xs].reverse(), y: [...ys].reverse(), opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.04 }}
              >
                {it.href ? (
                  <a className="cm-btn" href={it.href} aria-label={it.label} onClick={it.onClick}>
                    {it.icon}
                  </a>
                ) : (
                  <button className="cm-btn" type="button" aria-label={it.label} onClick={it.onClick}>
                    {it.icon}
                  </button>
                )}
                <span className="cm-label">{it.label}</span>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <button
        className="cm-toggle"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        {open ? (closeIcon ?? <XIcon />) : (openIcon ?? <MenuIcon />)}
      </button>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
