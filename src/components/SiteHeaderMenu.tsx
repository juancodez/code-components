import "./SiteHeaderMenu.css";

export type MenuItem = { label: string; href: string };

const DEFAULT_ITEMS: MenuItem[] = [
  { label: "CV", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Figma", href: "#" },
  { label: "Medium", href: "#" },
];

interface Props {
  items?: MenuItem[];
  open: boolean;
  onToggle: (next: boolean) => void;
}

export function SiteHeaderMenu({ items = DEFAULT_ITEMS, open, onToggle }: Props) {
  return (
    <div className="shm-wrap">
      <button
        className="shm-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="site-header-menu"
        onClick={() => onToggle(!open)}
      >
        <svg
          className="shm-icon"
          fill="none"
          viewBox="0 0 20 20"
          strokeWidth="2"
          aria-hidden="true"
          style={{
            transform: `rotate(${open ? 45 : 0}deg)`,
            transition: "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <path d="M10 4V16M4 10H16" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <nav id="site-header-menu" role="menu" className="shm-menu">
          {items.map((item) => (
            <a key={item.label} href={item.href} role="menuitem" className="shm-menu-item">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
