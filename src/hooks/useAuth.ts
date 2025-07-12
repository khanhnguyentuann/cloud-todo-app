import { useState, useEffect } from "react"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{
        id: string
        name: string
        email: string
        avatar?: string
    } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for saved auth state
        const savedAuth = localStorage.getItem("auth")
        const savedUser = localStorage.getItem("user")

        if (savedAuth === "true" && savedUser) {
            setIsAuthenticated(true)
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const signInWithGoogle = async () => {
        setIsLoading(true)

        // Mock Google Sign-In - replace with actual Google API later
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

        const mockUser = {
            id: "mock-user-123",
            name: "Khanh Nguyễn",
            email: "khanhnguyentuann@gmail.com",
            avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("auth", "true")
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
    }

    const signOut = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
    }

    return {
        isAuthenticated,
        user,
        isLoading,
        signInWithGoogle,
        signOut,
    }
}
