import React from "react";
import ReactDOM from "react-dom/client";
import { ModelPickerTile } from "./tiles/ModelPickerTile";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ transform: "scale(1.45)", transformOrigin: "center center" }}>
      <ModelPickerTile />
    </div>
  </React.StrictMode>
);
