import { Button } from "@/components/ui/button"
import { Chrome, Globe, Loader2, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/UseLanguage"
import { useDarkMode } from "@/hooks/UseDarkMode"

interface LoginScreenProps {
    onSignIn: () => Promise<void>
}

export function LoginScreen({ onSignIn }: LoginScreenProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { t, language, setLanguage } = useLanguage()
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)

    const languages = [
        { code: "en" as const, name: "English", flag: "🇺🇸" },
        { code: "ja" as const, name: "日本語", flag: "🇯🇵" },
        { code: "vi" as const, name: "Tiếng Việt", flag: "🇻🇳" },
    ]

    const handleSignIn = async () => {
        setIsLoading(true)
        try {
            await onSignIn()
        } catch (error) {
            console.error("Sign in failed:", error)
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
                        {languages.find((l) => l.code === language)?.flag}
                    </Button>

                    {showLanguageMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowLanguageMenu(false)} />
                            <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-40">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code)
                                            setShowLanguageMenu(false)
                                        }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg ${language === lang.code
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
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="w-12 h-12 bg-orange-500 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t.appName}</h1>
                    <p className="text-orange-100 dark:text-gray-300">
                        {t.loginWelcome || "Organize your tasks and boost your productivity"}
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-orange-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {t.welcomeBack || "Welcome Back"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t.signInToContinue || "Sign in to continue to your tasks"}
                        </p>
                    </div>

                    {/* Google Sign In Button */}
                    <Button
                        onClick={handleSignIn}
                        disabled={isLoading}
                        className="w-full h-12 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-3" />
                        ) : (
                            <Chrome className="h-5 w-5 mr-3 text-blue-500" />
                        )}
                        {isLoading ? t.signingIn || "Signing in..." : t.signInWithGoogle || "Continue with Google"}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{t.or || "or"}</span>
                        </div>
                    </div>

                    {/* Demo Login */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t.demoMode || "Demo Mode"}</p>
                        <Button
                            onClick={handleSignIn}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full border-orange-300 dark:border-blue-500 text-orange-600 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-blue-900/20 bg-transparent"
                        >
                            {t.tryDemo || "Try Demo Account"}
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
                        <p>
                            {t.termsText || "By signing in, you agree to our"}{" "}
                            <a href="#" className="text-orange-600 dark:text-blue-400 hover:underline">
                                {t.termsOfService || "Terms of Service"}
                            </a>{" "}
                            {t.and || "and"}{" "}
                            <a href="#" className="text-orange-600 dark:text-blue-400 hover:underline">
                                {t.privacyPolicy || "Privacy Policy"}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Language Switcher */}
                <div className="mt-6 text-center">
                    <p className="text-orange-100 dark:text-gray-400 text-sm">
                        {t.changeLanguageHint || "You can change language after signing in"}
                    </p>
                </div>
            </div>
        </div>
    )
}
