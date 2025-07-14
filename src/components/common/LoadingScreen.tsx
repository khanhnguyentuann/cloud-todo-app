import { motion } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface LoadingScreenProps {
    message?: string
    showSkeleton?: boolean
    variant?: "login" | "general"
}

export function LoadingScreen({
    message,
    showSkeleton = false,
    variant = "general"
}: LoadingScreenProps) {
    const { t } = useTranslation()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }


    if (variant === "login") {
        return (
            <motion.div
                className="fixed inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center z-50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-center"
                    variants={itemVariants}
                >
                    {/* App Logo */}
                    <motion.div
                        className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                        animate={{
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="text-orange-500 dark:text-blue-400 w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                            />
                        </svg>
                    </motion.div>

                    {/* Loading Spinner */}
                    <motion.div
                        className="flex items-center justify-center mb-4"
                        variants={itemVariants}
                    >
                        <Loader2 className="h-8 w-8 animate-spin text-white mr-3" />
                        <span className="text-xl font-semibold text-white">
                            {message || t("signingIn")}
                        </span>
                    </motion.div>

                    {/* Progress Dots */}
                    <motion.div
                        className="flex justify-center space-x-2"
                        variants={itemVariants}
                    >
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.2
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        className="text-orange-100 dark:text-gray-300 mt-4 text-sm"
                        variants={itemVariants}
                    >
                        {t("loadingMessage")}
                    </motion.p>
                </motion.div>
            </motion.div>
        )
    }

    // General loading screen
    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="text-center max-w-md w-full px-6"
                variants={itemVariants}
            >
                {showSkeleton ? (
                    <div className="space-y-4">
                        <Skeleton height={60} className="rounded-lg" />
                        <Skeleton height={40} className="rounded-lg" />
                        <Skeleton height={40} className="rounded-lg" />
                        <div className="flex space-x-2">
                            <Skeleton height={30} width={80} className="rounded-lg" />
                            <Skeleton height={30} width={100} className="rounded-lg" />
                            <Skeleton height={30} width={90} className="rounded-lg" />
                        </div>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="flex items-center justify-center mb-6"
                            animate={{
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="w-16 h-16 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                            </div>
                        </motion.div>

                        <motion.h2
                            className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
                            variants={itemVariants}
                        >
                            {message || t("loadingMessage")}
                        </motion.h2>

                        <motion.div
                            className="flex justify-center space-x-1 mt-4"
                            variants={itemVariants}
                        >
                            {[0, 1, 2, 3, 4].map((index) => (
                                <motion.div
                                    key={index}
                                    className="w-1.5 h-1.5 bg-orange-500 dark:bg-blue-500 rounded-full"
                                    animate={{
                                        y: [0, -8, 0],
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: index * 0.1
                                    }}
                                />
                            ))}
                        </motion.div>
                    </>
                )}
            </motion.div>
        </motion.div>
    )
}

// Success loading state component
export function LoadingSuccess({ message }: { message?: string }) {
    const { t } = useTranslation()

    return (
        <motion.div
            className="fixed inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 dark:from-green-800 dark:via-green-900 dark:to-black flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <motion.div
                    className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: 0.2
                    }}
                >
                    <CheckCircle2 className="text-green-500 w-12 h-12" />
                </motion.div>

                <motion.h2
                    className="text-2xl font-semibold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    {message || t("loginSuccess")}
                </motion.h2>
            </motion.div>
        </motion.div>
    )
}
