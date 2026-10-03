import { useState } from "react";
import { ImprintModal } from "./ImprintModal";

const CONNECT = [
  { label: "LinkedIn", href: "https://linkedin.com/in/juangomezvara", preview: "/linkedinscreen.png", previewPos: "left top" },
  { label: "GitHub",   href: "https://github.com/juancodez",          preview: "/github-screen.png",   previewPos: "top"      },
  { label: "Figma",    href: "https://figma.com/@juangomezvara",       preview: "/figma-screen.png",    previewPos: "bottom"   },
  { label: "Behance",  href: "https://behance.net/juangomezvara3027",  preview: "/behance-screen.png",  previewPos: "top"      },
];

export function Footer() {
  const [imprintOpen, setImprintOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("juangomezvara@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <footer className="cf" id="contact">
        <div className="cf-cta">
          <h2 className="cf-cta-heading">Let's join forces!</h2>
        </div>
        <div className="cf-grid">

          <div>
            <p className="cf-label">Menu</p>
            <ul className="cf-list">
              <li><a href="index.html"   className="cf-link">Work</a></li>
              <li><a href="post.html"    className="cf-link">Labs</a></li>
              <li><a href="about.html"   className="cf-link">About</a></li>
              <li>
                <button className="cf-link cf-imprint-btn" onClick={() => setImprintOpen(true)}>
                  Imprint
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="cf-label">Connect</p>
            <ul className="cf-list">
              {CONNECT.map(({ label, href, preview, previewPos }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="cf-link cf-link-ext">
                    {label}<span aria-hidden="true" className="cf-arrow">↗</span>
                    <div className="cf-link-preview" aria-hidden="true">
                      <img
                        src={preview}
                        alt=""
                        loading="lazy"
                        style={previewPos ? { objectPosition: previewPos } : undefined}
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="cf-label">Say hello</p>
            <div className="cf-email-row">
              <a href="mailto:juangomezvara@gmail.com" className="cf-email">
                juangomezvara@gmail.com
              </a>
              <button
                className="cf-copy-btn"
                onClick={copyEmail}
                aria-label="Copy email address"
                title={copied ? "Email copied!" : "Copy email"}
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                {copied && <span className="cf-copy-label">Email copied</span>}
              </button>
            </div>
          </div>

        </div>

        <div className="cf-bar">
          <p className="cf-copy">©2026 Juan Gomez Vara — All rights reserved</p>
          <a
            href="#top"
            className="cf-backtop"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            Back to top ↑
          </a>
        </div>
      </footer>

      <ImprintModal open={imprintOpen} onClose={() => setImprintOpen(false)} />
    </>
  );
}
