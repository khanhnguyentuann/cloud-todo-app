import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/tailwind.css";
import App from "@/App.tsx";
import "@/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
