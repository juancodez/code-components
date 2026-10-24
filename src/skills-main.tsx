import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SkillsApp from "./SkillsApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><SkillsApp /></StrictMode>
);
