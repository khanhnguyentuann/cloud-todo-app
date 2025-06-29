import { useState, useEffect } from "react"

export function useMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return isMobile
}

export function useDarkMode(): {
    isDarkMode: boolean
    toggleDarkMode: () => void
} {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark")
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode
        setIsDarkMode(newDarkMode)

        if (newDarkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return { isDarkMode, toggleDarkMode }
}
