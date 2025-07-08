import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/tailwind.css";
import App from "@/App.tsx";
import { LanguageProvider } from "@/context/LanguageProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
