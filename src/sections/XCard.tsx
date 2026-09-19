import "./XCard.css";

// ─── swap your details here ───────────────────────────────────────────────────
const PROFILE = {
  name: "Juan Gomez-Vara",
  handle: "@juangomezvara",
  avatar: "/avatar.jpg",
  profileUrl: "https://x.com/juangomezvara",
  tweet: "Building at the intersection of design and engineering. Design systems, interfaces, and full-stack products from scratch.",
  buttonLabel: "Follow on X",
};
// ─────────────────────────────────────────────────────────────────────────────

export function XCard() {
  return (
    <div className="xcard">
      {/* header */}
      <div className="xcard-header">
        <a href={PROFILE.profileUrl} target="_blank" rel="noreferrer" className="xcard-profile">
          <img src={PROFILE.avatar} alt={PROFILE.name} className="xcard-avatar" />
          <div className="xcard-identity">
            <span className="xcard-name">{PROFILE.name}</span>
            <span className="xcard-handle">{PROFILE.handle}</span>
          </div>
        </a>
        <a href={PROFILE.profileUrl} target="_blank" rel="noreferrer" className="xcard-icon" aria-label="X (Twitter)">
          <XIcon />
        </a>
      </div>

      {/* tweet */}
      <p className="xcard-tweet">{PROFILE.tweet}</p>

      {/* follow button */}
      <a href={PROFILE.profileUrl} target="_blank" rel="noreferrer" className="xcard-btn">
        {PROFILE.buttonLabel}
        <ArrowIcon />
      </a>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
