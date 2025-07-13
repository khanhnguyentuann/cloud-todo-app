import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/tailwind.css";
import App from "@/App.tsx";
import "@/plugins/i18n";

// React Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable={false}
      theme="colored"
    />
  </StrictMode>
);
