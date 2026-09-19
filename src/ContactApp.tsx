import { Nav } from "./components/Nav";
import "./App.css";

export default function ContactApp() {
  return (
    <div className="page">
      <div className="nav-wrap">
        <Nav />
      </div>
      <section className="contact-hero">
        <h1 className="contact-h1">Let's work<br />together.</h1>
        <p className="hero-body">
          I'm available for freelance product design and development. Drop me a line — let's
          figure out what we can build.
        </p>
        <nav className="contact-links">
          <a href="mailto:juangomezvara@gmail.com" className="btn-primary">Send an email</a>
          <a href="https://linkedin.com/in/juangomezvara" className="btn-secondary">LinkedIn</a>
        </nav>
      </section>
    </div>
  );
}
