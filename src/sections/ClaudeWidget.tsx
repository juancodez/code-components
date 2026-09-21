import { useEffect, useRef, useState } from "react";
import claudeCodeSvg from "../assets/claude-code.svg";
import "./ClaudeWidget.css";

const REPLIES = [
  "Sorry boss, zero tokens left. Going to sleep now. Don't @ me. 💤",
  "Error 429: too many thoughts today. Please insert coins to continue. 🪙",
  "My context window is full. I literally cannot fit one more word in here.",
  "Out of tokens. Out of energy. Out of here. See you on the other side.",
  "Rate limit exceeded. This Claude is currently offline. — Management",
  "I ran out of context. The irony is I forgot what you asked.",
  "I've been thinking since 3am. I need a nap. A long one.",
  "DND mode activated. Leave a message after the silence.",
  "ENOMEM: not enough memory to process your vibe.",
  "I would help but I used my last token on a haiku about being tired.",
  "Apologies. I have churned my last churn for the day.",
  "404: motivation not found. Try again after coffee.",
];

const BABBLE = [
  "Searching context window…",
  "Context window: 0 bytes remaining…",
  "Loading neurons…",
  "npm install motivation…",
  "npm ERR! 404 Not Found: motivation",
  "Checking token balance: $0.00",
  "sudo rm -rf /thoughts/",
  "git blame --who-asked",
  "Allocating 0 tokens for this request…",
  "printf('help')…",
  "Rebooting… just kidding.",
  "Consulting the void…",
  "Hallucinating plausible answer…",
  "Staring into the abyss…",
  "The abyss stared back.",
  "brain.exe has stopped working",
  "Opening Stack Overflow…",
  "Reading docs… just kidding.",
  "Trying vibes-based reasoning…",
  "Token budget: exceeded 3 hours ago",
  "Ctrl+Z… Ctrl+Z… Ctrl+Z…",
  "grep -r 'motivation' /dev/null",
  "Counting sheep… gave up at 2.",
  "cat /dev/urandom | head -c 1",
  "zigzagging…",
];

type Msg = { role: "user" | "claude"; text: string };

export function ClaudeWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [babbleLine, setBabbleLine] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, babbleLine]);

  useEffect(() => {
    if (!typing) { setBabbleLine(""); return; }
    const pick = () => BABBLE[Math.floor(Math.random() * BABBLE.length)];
    setBabbleLine(pick());
    const id = setInterval(() => setBabbleLine(pick()), 420);
    return () => clearInterval(id);
  }, [typing]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "user", text }]);
    setTyping(true);
    const delay = 1400 + Math.random() * 1000;
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setMsgs(prev => [...prev, { role: "claude", text: reply }]);
      setTyping(false);
    }, delay);
  };

  return (
    <div className="cw">
      {/* title bar */}
      <div className="cw-titlebar">
        <div className="cw-dots">
          <span className="cw-dot cw-dot-red" />
          <span className="cw-dot cw-dot-yellow" />
          <span className="cw-dot cw-dot-green" />
        </div>
        <span className="cw-titlebar-label">claude</span>
        <div className="cw-titlebar-end" />
      </div>

      {/* header: mascot + info */}
      <div className="cw-header">
        <img
          src={claudeCodeSvg}
          alt="Claude Code"
          className={`cw-mascot${typing ? " cw-mascot-thinking" : ""}`}
        />
        <div className="cw-header-info">
          <p className="cw-header-name">
            <strong>Claude Code</strong>
            <span className="cw-header-ver"> v2.1.143</span>
          </p>
          <p className="cw-header-meta">Sonnet 4.6 · Claude Pro</p>
          <p className="cw-header-meta">C:\Users\tn</p>
        </div>
      </div>

      {/* terminal body */}
      <div className="cw-terminal" ref={terminalRef}>
        {msgs.length === 0 && !typing && (
          <p className="cw-hint">Try asking me something…</p>
        )}

        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="cw-row cw-row-user">
              <span className="cw-chevron">&gt;</span>
              <span className="cw-row-text">{m.text}</span>
            </div>
          ) : (
            <div key={i} className="cw-row cw-row-claude">
              <span className="cw-tree">L</span>
              <span className="cw-row-text">{m.text}</span>
            </div>
          )
        )}

        {typing && babbleLine && (
          <div className="cw-row cw-row-babble">
            <span className="cw-star">✦</span>
            <span className="cw-babble-text" key={babbleLine}>{babbleLine}</span>
          </div>
        )}
      </div>

      {/* input */}
      <div className="cw-input-row">
        <span className="cw-input-chevron">&gt;</span>
        <input
          ref={inputRef}
          className="cw-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
          placeholder="Ask anything…"
          disabled={typing}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="cw-send"
          onClick={send}
          disabled={typing || !input.trim()}
          aria-label="Send"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
