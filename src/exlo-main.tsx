import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ExloApp from "./ExloApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><ExloApp /></StrictMode>
);
