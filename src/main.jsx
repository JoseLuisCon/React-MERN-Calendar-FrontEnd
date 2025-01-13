import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { CalendarApp } from "./CalendarApp";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>
);
