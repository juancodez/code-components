import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePickerApp from "./DatePickerApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode><DatePickerApp /></StrictMode>
);
