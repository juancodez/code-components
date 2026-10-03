import React from "react";
import { Nav } from "./components/Nav";
import { Avatar } from "./components/Avatar";
import { Footer } from "./components/Footer";
import "./App.css";

export default function ContactApp() {
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

      <Footer />
    </div>
  );
}
