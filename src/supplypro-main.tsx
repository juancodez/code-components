import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SupplyProApp from "./SupplyProApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><SupplyProApp /></StrictMode>
);
