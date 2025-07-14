import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/tailwind.css";
import App from "@/App.tsx";
import "@/plugins/i18n";

// React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ThemedToastContainer } from "@/components/common/ThemedToastContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ThemedToastContainer />
  </StrictMode>
);
