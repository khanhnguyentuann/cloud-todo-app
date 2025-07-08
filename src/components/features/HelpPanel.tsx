import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { X, Search, BookOpen, Star, Calendar, Keyboard, MessageCircle, Mail, Phone, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"

interface HelpPanelProps {
    isOpen: boolean
    onClose: () => void
}

export function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
    const { t } = useLanguage()
    const [activeSection, setActiveSection] = useState("getting-started")
    const [searchQuery, setSearchQuery] = useState("")
    const [showSidebar, setShowSidebar] = useState(true)

    if (!isOpen) return null

    const sections = [
        { id: "getting-started", label: t.gettingStarted, icon: BookOpen },
        { id: "features", label: t.features, icon: Star },
        { id: "shortcuts", label: t.shortcuts, icon: Keyboard },
        { id: "faq", label: t.faq, icon: MessageCircle },
    ]

    const renderContent = () => {
        switch (activeSection) {
            case "getting-started":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t.gettingStartedTitle}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.gettingStartedContent}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.addingTasksTitle}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.addingTasksContent}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.organizingTasksTitle}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.organizingTasksContent}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.settingRemindersTitle}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{t.settingRemindersContent}</p>
                        </div>
                    </div>
                )

            case "features":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t.featuresTitle}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <Calendar className="h-5 w-5 text-orange-500 dark:text-blue-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.myDayFeature}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.myDayDescription}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <Star className="h-5 w-5 text-orange-500 dark:text-blue-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.importantFeature}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.importantDescription}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <Calendar className="h-5 w-5 text-orange-500 dark:text-blue-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.plannedFeature}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t.plannedDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "shortcuts":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t.shortcutsTitle}</h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <span className="text-gray-800 dark:text-gray-200">{t.shortcutNewTask}</span>
                                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Enter</kbd>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <span className="text-gray-800 dark:text-gray-200">{t.shortcutSearch}</span>
                                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Ctrl+F</kbd>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <span className="text-gray-800 dark:text-gray-200">{t.shortcutToggleView}</span>
                                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Ctrl+G</kbd>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <span className="text-gray-800 dark:text-gray-200">{t.shortcutSettings}</span>
                                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Ctrl+,</kbd>
                            </div>
                        </div>
                    </div>
                )

            case "faq":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t.faqTitle}</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.faqQuestion1}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t.faqAnswer1}</p>
                            </div>

                            <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.faqQuestion2}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t.faqAnswer2}</p>
                            </div>

                            <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-600">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.faqQuestion3}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t.faqAnswer3}</p>
                            </div>
                        </div>

                        {/* Contact Support Section */}
                        <div className="border-t border-amber-300 dark:border-gray-600 pt-6">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{t.supportTitle}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.supportDescription}</p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-orange-500 dark:text-blue-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{t.supportEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-orange-500 dark:text-blue-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{t.supportPhone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />

            {/* Help Panel - Responsive */}
            <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-700 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden border border-amber-300 dark:border-gray-600">
                {/* Mobile: Full-screen sidebar initially, then content */}
                <div
                    className={`lg:hidden ${showSidebar ? "flex" : "hidden"} flex-col w-full h-full bg-amber-50 dark:bg-gray-800`}
                >
                    <div className="p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.helpCenter}</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder={t.searchHelp}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white dark:bg-gray-700 border-amber-300 dark:border-gray-600 text-sm"
                            />
                        </div>
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <button
                                        onClick={() => {
                                            setActiveSection(section.id)
                                            setShowSidebar(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id
                                                ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <section.icon className="h-4 w-4" />
                                        {section.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Mobile: Content view */}
                <div className={`lg:hidden ${showSidebar ? "hidden" : "flex"} flex-col h-full`}>
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSidebar(true)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {sections.find((s) => s.id === activeSection)?.label}
                            </h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Mobile Content */}
                    <div className="flex-1 p-4 overflow-y-auto min-h-0">{renderContent()}</div>
                </div>

                {/* Desktop: Sidebar */}
                <div className="hidden lg:flex w-80 bg-amber-50 dark:bg-gray-800 border-r border-amber-300 dark:border-gray-600 flex-col">
                    <div className="p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.helpCenter}</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder={t.searchHelp}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white dark:bg-gray-700 border-amber-300 dark:border-gray-600 text-sm"
                            />
                        </div>
                    </div>

                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <button
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id
                                            ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <section.icon className="h-4 w-4" />
                                        {section.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Desktop: Content */}
                <div className="hidden lg:flex flex-1 flex-col">
                    <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}
