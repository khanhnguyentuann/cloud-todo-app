import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Chrome, Globe, Loader2, Moon, Sun } from "lucide-react"
import { useDarkMode } from "@/hooks/useDarkMode"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "@/hooks/useAuth"
import type { User } from "@/types" // import type User

interface LoginScreenProps {
    onSignIn: () => Promise<User | null | void>
}

export function LoginScreen({ onSignIn }: LoginScreenProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const { t, i18n } = useTranslation()
    const { setIsAuthenticated, setUser } = useAuth()
    const currentLang = i18n.language as string

    const handleGoogleSignIn = () => {
        toast.info("Coming soon!", { position: "top-center" })
    }

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ja", name: "日本語", flag: "🇯🇵" },
        { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    ]

    const handleDemoLogin = async () => {
        setIsLoading(true)
        try {
            const user = await onSignIn()
            if (user) {
                // The signIn method will handle setting user, auth state, and navigation
                // But we still need these for the LoginScreen component state
                setUser(user)
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error("Demo sign in failed:", error)
            toast.error("Demo login failed", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center p-4 relative">
            {/* Header Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                        <Globe className="h-4 w-4 mr-1" />
                        {languages.find(l => l.code === currentLang)?.flag}
                    </Button>

                    {showLanguageMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowLanguageMenu(false)} />
                            <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-40">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            i18n.changeLanguage(lang.code)
                                            setShowLanguageMenu(false)
                                        }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg ${currentLang === lang.code
                                            ? "bg-orange-50 dark:bg-blue-900/20 text-orange-600 dark:text-blue-400"
                                            : "text-gray-700 dark:text-gray-300"
                                            }`}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
                >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
            </div>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-orange-500 dark:text-blue-400 size-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t("appName")}</h1>
                    <p className="text-orange-100 dark:text-gray-300">{t("loginWelcome")}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-orange-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {t("welcomeBack")}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">{t("signInToContinue")}</p>
                    </div>

                    <Button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full h-12 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <Chrome className="h-5 w-5 mr-3 text-blue-500" />
                        {t("signInWithGoogle")}
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                {t("or")}
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t("demoMode")}</p>
                        <Button
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full border-orange-300 dark:border-blue-500 text-orange-600 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-blue-900/20 bg-transparent"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                                    {t("signingIn")}
                                </>
                            ) : (
                                t("tryDemo")
                            )}
                        </Button>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
                        <p>
                            {t("termsText")}{" "}
                            <button 
                                type="button"
                                onClick={() => toast.info("Terms of Service - Coming soon!", { position: "top-center" })}
                                className="text-orange-600 dark:text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                                {t("termsOfService")}
                            </button>{" "}
                            {t("and")}{" "}
                            <button 
                                type="button"
                                onClick={() => toast.info("Privacy Policy - Coming soon!", { position: "top-center" })}
                                className="text-orange-600 dark:text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                                {t("privacyPolicy")}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
