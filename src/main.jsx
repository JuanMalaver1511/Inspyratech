import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InspyraTech from "./pages/InspyraTech.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InspyraTech />
  </StrictMode>
);