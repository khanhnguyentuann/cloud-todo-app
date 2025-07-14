import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

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
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth")
        const savedUser = localStorage.getItem("user")

        if (savedAuth === "true" && savedUser) {
            setIsAuthenticated(true)
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    // Redirect to login if not authenticated (except when already on login)
    useEffect(() => {
        if (!isLoading && !isAuthenticated && location.pathname !== '/') {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, isLoading, location.pathname, navigate])

    const signInWithGoogle = async () => {}

    const signOut = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
        
        // Navigate to root path after logout, which will show login screen
        navigate('/', { replace: true })
    }

    const signIn = (userData: typeof user) => {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("auth", "true")
        localStorage.setItem("user", JSON.stringify(userData))
        
        // Navigate to my-day after successful login
        navigate('/my-day', { replace: true })
    }

    return {
        isAuthenticated,
        user,
        isLoading,
        signInWithGoogle,
        signOut,
        signIn,
        setIsAuthenticated,
        setUser
    }
}
