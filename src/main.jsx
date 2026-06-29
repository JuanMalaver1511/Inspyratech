import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lucid from "./pages/Lucid.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Lucid />
  </StrictMode>
);