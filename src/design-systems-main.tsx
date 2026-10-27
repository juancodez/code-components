import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DesignSystemsApp from "./DesignSystemsApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><DesignSystemsApp /></StrictMode>
);
