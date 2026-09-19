import "./XCard.css";

const PROFILE = {
  name: "Juan Gomez-Vara",
  handle: "@juangomezvara",
  avatar: "/avatar.jpg",
  url: "https://medium.com/@juangomezvara",
  bio: "Writing about design systems, product thinking, and building at the intersection of design and engineering.",
  buttonLabel: "Read on Medium",
};

export function MediumCard() {
  return (
    <div className="xcard">
      <div className="xcard-header">
        <a href={PROFILE.url} target="_blank" rel="noreferrer" className="xcard-profile">
          <img src={PROFILE.avatar} alt={PROFILE.name} className="xcard-avatar" />
          <div className="xcard-identity">
            <span className="xcard-name">{PROFILE.name}</span>
            <span className="xcard-handle">{PROFILE.handle}</span>
          </div>
        </a>
        <a href={PROFILE.url} target="_blank" rel="noreferrer" className="xcard-icon" aria-label="Medium">
          <MediumIcon />
        </a>
      </div>

      <p className="xcard-tweet">{PROFILE.bio}</p>

      <a href={PROFILE.url} target="_blank" rel="noreferrer" className="xcard-btn">
        {PROFILE.buttonLabel}
        <ArrowIcon />
      </a>
    </div>
  );
}

function MediumIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
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
