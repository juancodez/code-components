import { useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Avatar } from "./components/Avatar";
import { MusicPlayer } from "./sections/MusicPlayer";
import { VideoDeck } from "./sections/VideoDeck";
import { MediumCard } from "./sections/MediumCard";
import { ClaudeWidget } from "./sections/ClaudeWidget";
import figmaLogo from "../assets/figma.svg";
import klaroLogo from "../assets/Klaro-Logo-orange.svg";
import michelinStar from "../assets/star-michelin.svg";
import claudeCodeLogo from "../assets/claude-code-logo.svg";
import "flag-icons/css/flag-icons.min.css";
import "./App.css";

function BentoGrid() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const enter = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/writing.mp3");
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  const leave = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  return (
    <div className="abt-bento">
      <div className="bento-card bento-claude">
        <ClaudeWidget />
      </div>
      <div className="bento-card bento-music">
        <MusicPlayer />
      </div>
      <div className="bento-card bento-video">
        <VideoDeck />
      </div>
      <div className="bento-card bento-medium" onMouseEnter={enter} onMouseLeave={leave}>
        <MediumCard />
      </div>
    </div>
  );
}

function Sec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="abt-sec">
      <h2 className="abt-label">{label}</h2>
      <div className="abt-body">{children}</div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

export default function AboutApp() {
  return (
    <div className="page">
      <header className="site-header">
        <Nav />
      </header>
      <section className="hero">
        <div className="hero-header">
          <div className="hero-identity">
            <Avatar />
            <div className="hero-name-block">
              <span className="hero-name">Juan Gomez Vara</span>
              <span className="hero-role">Product Designer who engineers.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="about-layout">
        <div className="about-v2">

          <Sec label="Who I am">
            <p className="abt-text">I'm Juan.</p>
            <p className="abt-text">
              Originally from Argentina{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><span className="fi fi-ar abt-flag" /></span>
                <div className="abt-iref-pop"><img src="/buenos-aires.jpg" alt="Buenos Aires" className="abt-iref-img" /></div>
              </span>
              , born in France{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><span className="fi fi-fr abt-flag" /></span>
                <div className="abt-iref-pop"><img src="/paris.jpg" alt="Paris" className="abt-iref-img" /></div>
              </span>
              , and currently living in Germany{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><span className="fi fi-de abt-flag" /></span>
                <div className="abt-iref-pop"><img src="/berlin.jpg" alt="Berlin" className="abt-iref-img" /></div>
              </span>
              . Somehow, that turned into speaking four languages: Spanish, French, English, and German.
            </p>
            <p className="abt-text">
              I'm a Product Designer who is amazed about AI workflows, solve complex systems like Design systems and understanding Business.
            </p>
          </Sec>

          <Sec label="Before digital">
            <p className="abt-text">
              Before pixels, components, and design systems, there were kitchens.
            </p>
            <p className="abt-text">
              I worked in hospitality across Europe, from{" "}
              <span className="abt-iref">
                Michelin-starred
                <span className="abt-iref-icon" aria-hidden="true"><img src={michelinStar} alt="" width="14" height="14" /></span>
                <div className="abt-iref-pop">
                  <img src="/michelin.jpg" alt="Michelin Guide" className="abt-iref-img" />
                </div>
              </span>
              {" "}restaurants to luxury hotels. It was a very different kind of product work, but the obsession with craft was the same.
            </p>
            <p className="abt-text">
              You learn pretty quickly that small details matter, things need to work under pressure, and there's always a better way to do something.
            </p>
          </Sec>

          <Sec label="What I do now">
            <p className="abt-text">Today, I design and build digital products.</p>
            <p className="abt-text">
              I don't just stop at the interface. I like getting close to the actual thing, writing code, experimenting with{" "}
              <span className="abt-iref">
                AI
                <span className="abt-iref-icon" aria-hidden="true"><img src={claudeCodeLogo} alt="" width="18" height="18" /></span>
                <div className="abt-iref-pop">
                  <img src="/claude-cli.jpeg" alt="Claude Code CLI" className="abt-iref-img" />
                </div>
              </span>
              , breaking prototypes, and seeing how far an idea can go.
            </p>
            <p className="abt-text">
              I call myself a Product Designer who engineers{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><GitHubIcon /></span>
                <div className="abt-iref-pop">
                  <img src="/github-contrib.png" alt="GitHub contribution graph" className="abt-iref-img" />
                </div>
              </span>
              .
            </p>
            <p className="abt-text">
              Sometimes that means designing a product. Sometimes it means building the Figma plugin that helps me design it. Sometimes it means making the whole thing myself.
            </p>
          </Sec>

          <Sec label="Things I've built">
            <p className="abt-text">
              I've built{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><img src={figmaLogo} alt="" width="12" height="18" /></span>
                Figma plugins
                <div className="abt-iref-pop">
                  <img src="/exlo-01.png" alt="Exlo Figma plugin" className="abt-iref-img" />
                </div>
              </span>
              , AI experiments, and{" "}
              <span className="abt-iref">
                <span className="abt-iref-icon" aria-hidden="true"><img src={klaroLogo} alt="" width="18" height="18" /></span>
                <a href="https://klaro-es.com/" target="_blank" rel="noreferrer" className="abt-extlink">
                  KLARO
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="abt-iref-pop">
                  <img src="/klaro.png" alt="Klaro" className="abt-iref-img" />
                </div>
              </span>
              {" "}my own platform that helps Spanish-speaking freelancers complete their tax declaration in Germany.
            </p>
            <p className="abt-text">I still believe the fundamentals matter.</p>
            <p className="abt-text">
              The tools keep changing. AI is changing almost everything about how we make things. But understanding the problem, talking to people, testing assumptions, and making something useful never really goes out of style.
            </p>
          </Sec>

          <Sec label="Outside the screen">
            <p className="abt-text">
              When I'm not designing, I'm usually listening to music, skating, dancing, or playing with my kids.
            </p>
            <p className="abt-text">
              I like making things, fixing things, and occasionally spending far too much time figuring out how something works when I could have just left it alone.
            </p>
            <p className="abt-text">I'm also usually working on some kind of side project.</p>
          </Sec>

          <Sec label="What's next">
            <p className="abt-text">
              Right now, I'm looking for a place where I can learn how great product teams actually work at scale.
            </p>
            <p className="abt-text">I'm interested in motivated, joyfull teams, complex products, and meaningful work.</p>
          </Sec>


        </div>

        <div className="about-bento-col">
          <BentoGrid />
        </div>
      </div>

      <div className="post-footer-nav" style={{ maxWidth: 620, padding: "0 24px 80px" }}>
        <a href="index.html" className="footer-link-card">
          <div className="footer-link-texts">
            <span className="footer-link-label">View work</span>
            <h4 className="footer-link-heading">View Case Studies</h4>
          </div>
          <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
            <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
          </svg>
        </a>
        <a href="contact.html" className="footer-link-card">
          <div className="footer-link-texts">
            <span className="footer-link-label">Get in touch</span>
            <h4 className="footer-link-heading">Let's Join Forces</h4>
          </div>
          <svg className="footer-link-arrow" viewBox="0 0 20.329 20.329" fill="none">
            <path d="M 1.713 20.329 L 0 18.617 L 16.141 2.46 L 1.467 2.46 L 1.467 0 L 20.329 0 L 20.329 18.863 L 17.869 18.863 L 17.869 4.189 Z" fill="currentColor"/>
          </svg>
        </a>
      </div>

      <Footer />
    </div>
  );
}

