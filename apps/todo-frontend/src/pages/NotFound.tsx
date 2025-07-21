import { motion } from "framer-motion"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/common/Button"

export default function NotFound() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <motion.div
                className="text-center max-w-2xl w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 404 Illustration */}
                <motion.div
                    className="mb-8"
                    variants={itemVariants}
                >
                    <motion.div
                        className="relative inline-block"
                        animate={{
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Large 404 Text */}
                        <div className="text-8xl md:text-9xl font-bold text-orange-200 dark:text-gray-700 select-none">
                            404
                        </div>

                        {/* Floating Icons */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <Search className="w-6 h-6 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-2 -left-6 w-10 h-10 bg-orange-400 dark:bg-blue-400 rounded-full flex items-center justify-center shadow-lg"
                            animate={{
                                rotate: [360, 0],
                                scale: [1, 0.9, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <HelpCircle className="w-5 h-5 text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    className="mb-8"
                    variants={itemVariants}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        {t("pageNotFoundTitle")}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
                        {t("pageNotFoundDescription")}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        {t("pageNotFoundSubtext")}
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                    variants={itemVariants}
                >
                    <Button
                        onClick={() => navigate('/my-day')}
                        className="bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        {t("goToHome")}
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="border-orange-300 dark:border-blue-400 text-orange-600 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t("goBack")}
                    </Button>
                </motion.div>

                {/* Helpful Links */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-orange-100 dark:border-gray-700"
                    variants={itemVariants}
                >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {t("helpfulLinks")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => navigate('/my-day')}
                            className="p-3 rounded-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors duration-200 text-center group"
                        >
                            <div className="w-8 h-8 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                <Home className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t("myDay")}
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/important')}
                            className="p-3 rounded-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors duration-200 text-center group"
                        >
                            <div className="w-8 h-8 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t("important")}
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/planned')}
                            className="p-3 rounded-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors duration-200 text-center group"
                        >
                            <div className="w-8 h-8 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t("planned")}
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/tasks')}
                            className="p-3 rounded-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors duration-200 text-center group"
                        >
                            <div className="w-8 h-8 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t("tasks")}
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="mt-8 text-sm text-gray-500 dark:text-gray-400"
                    variants={itemVariants}
                >
                    {t("errorCode")}: 404 | {t("needHelp")}{" "}
                    <button
                        onClick={() => navigate('/help')}
                        className="text-orange-500 dark:text-blue-400 hover:underline font-medium"
                    >
                        {t("contactSupport")}
                    </button>
                </motion.p>
            </motion.div>
        </div>
    )
}
