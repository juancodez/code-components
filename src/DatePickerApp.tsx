import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import "./App.css";
import "./MicrocasingApp.css";

export default function DatePickerApp() {
  return (
    <div className="page mc-page">
      <header className="site-header">
        <Nav />
      </header>

      <main className="mc-main" id="mc-top">
        <section className="mc-header">
          <div className="mc-header-inner">
            <div className="mc-left">
              <h1 className="mc-title">
                Date Picker
              </h1>
              <div className="mc-subtitle-block">
                <p className="mc-subtitle">
                  Placeholder subtitle.
                </p>
              </div>
            </div>

            <div className="mc-right">
              <div className="mc-placeholder">
                <span className="mc-placeholder-label">Project preview</span>
              </div>
            </div>
          </div>

          <div className="mc-meta">
            <div className="mc-meta-row">
              <span className="mc-meta-label">Client</span>
              <span className="mc-meta-value">—</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Role</span>
              <span className="mc-meta-value">Product Designer</span>
            </div>
            <div className="mc-meta-row">
              <span className="mc-meta-label">Year</span>
              <span className="mc-meta-value">2026</span>
            </div>
          </div>

          <div className="mc-scope">
            {["UI Design", "Component Design"].map(tag => (
              <span key={tag} className="mc-scope-tag">{tag}</span>
            ))}
          </div>

          <div className="mc-body">
            <p className="mc-body-text">
              Placeholder body text.
            </p>
          </div>
        </section>

        <section className="mc-section" id="challenge">
          <div className="mc-section-inner">
            <span className="mc-section-label">Challenge</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        <section className="mc-section" id="discovery">
          <div className="mc-section-inner">
            <span className="mc-section-label">Discovery</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        <section className="mc-section" id="design">
          <div className="mc-section-inner">
            <span className="mc-section-label">Design</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        <section className="mc-section" id="prototype">
          <div className="mc-section-inner">
            <span className="mc-section-label">Prototype</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

        <section className="mc-section" id="lessons">
          <div className="mc-section-inner">
            <span className="mc-section-label">Lessons</span>
            <h2 className="mc-section-title">Placeholder</h2>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
