import { useState, useEffect } from "react"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{
        id: string
        name: string
        email: string
        avatar?: string
        phone?: string
        timezone?: string
        preferences?: {
            emailNotifications: boolean
            pushNotifications: boolean
            weeklyDigest: boolean
            taskReminders: boolean
        }
    } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth")
        const savedUser = localStorage.getItem("user")

        if (savedAuth === "true" && savedUser) {
            setIsAuthenticated(true)
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    const signInWithGoogle = async () => {}

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
        setIsAuthenticated,
        setUser
    }
}
