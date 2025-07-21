import { ToastContainer } from "react-toastify";
import { useDarkMode } from "@/hooks/useDarkMode";

export function ThemedToastContainer() {
    const { isDarkMode } = useDarkMode();

    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme={isDarkMode ? "dark" : "light"}
            toastClassName="!bg-theme-surface !text-theme-text-primary !border !border-theme-border"
            progressClassName="!bg-theme-primary"
        />
    );
}
