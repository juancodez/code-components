import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PostApp from "./PostApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><PostApp /></StrictMode>
);
