import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import {
    X, Search, BookOpen, Star, Calendar, Keyboard, MessageCircle, Mail, Phone, ChevronLeft
} from "lucide-react"
import { useTranslation } from "react-i18next"
import type { ContactSupportProps, FAQProps, FeatureCardProps, HelpPanelProps, MobileSidebarProps, PanelHeaderProps, Section, ShortcutProps, SidebarHeaderProps, SidebarNavProps } from "@/types"

export function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
    const { t } = useTranslation()
    const [activeSection, setActiveSection] = useState("getting-started")
    const [searchQuery, setSearchQuery] = useState("")
    const [showSidebar, setShowSidebar] = useState(true)

    if (!isOpen) return null

    const sections: Section[] = [
        { id: "getting-started", label: t("gettingStarted"), icon: BookOpen },
        { id: "features", label: t("features"), icon: Star },
        { id: "shortcuts", label: t("shortcuts"), icon: Keyboard },
        { id: "faq", label: t("faq"), icon: MessageCircle },
    ]

    const renderContent = () => {
        switch (activeSection) {
            case "getting-started":
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("gettingStartedTitle")}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t("gettingStartedContent")}</p>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("addingTasksTitle")}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{t("addingTasksContent")}</p>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("organizingTasksTitle")}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{t("organizingTasksContent")}</p>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("settingRemindersTitle")}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{t("settingRemindersContent")}</p>
                    </div>
                )
            case "features":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("featuresTitle")}</h3>
                        <div className="flex flex-col gap-4">
                            <FeatureCard icon={Calendar} title={t("myDayFeature")} desc={t("myDayDescription")} />
                            <FeatureCard icon={Star} title={t("importantFeature")} desc={t("importantDescription")} />
                            <FeatureCard icon={Calendar} title={t("plannedFeature")} desc={t("plannedDescription")} />
                        </div>
                    </div>
                )
            case "shortcuts":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("shortcutsTitle")}</h3>
                        <Shortcut keyCombo="Enter" desc={t("shortcutNewTask")} />
                        <Shortcut keyCombo="Ctrl+F" desc={t("shortcutSearch")} />
                        <Shortcut keyCombo="Ctrl+G" desc={t("shortcutToggleView")} />
                        <Shortcut keyCombo="Ctrl+," desc={t("shortcutSettings")} />
                    </div>
                )
            case "faq":
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("faqTitle")}</h3>
                        <FAQ question={t("faqQuestion1")} answer={t("faqAnswer1")} />
                        <FAQ question={t("faqQuestion2")} answer={t("faqAnswer2")} />
                        <FAQ question={t("faqQuestion3")} answer={t("faqAnswer3")} />
                        <div className="border-t border-amber-300 dark:border-gray-600 pt-6">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{t("supportTitle")}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{t("supportDescription")}</p>
                            <ContactSupport icon={Mail} contact={t("supportEmail")} />
                            <ContactSupport icon={Phone} contact={t("supportPhone")} />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />

            <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-700 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden border border-amber-300 dark:border-gray-600">

                <MobileSidebar
                    show={showSidebar}
                    sections={sections}
                    activeSection={activeSection}
                    onSelect={(id) => { setActiveSection(id); setShowSidebar(false); }}
                    onClose={onClose}
                    t={t}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className={`lg:hidden ${showSidebar ? "hidden" : "flex"} flex-col h-full`}>
                    <PanelHeader
                        title={sections.find(s => s.id === activeSection)?.label || ""}
                        onBack={() => setShowSidebar(true)}
                        onClose={onClose}
                    />
                    <div className="flex-1 p-4 overflow-y-auto">{renderContent()}</div>
                </div>

                <div className="hidden lg:flex w-80 bg-amber-50 dark:bg-gray-800 border-r border-amber-300 dark:border-gray-600 flex-col">
                    <SidebarHeader onClose={onClose} t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <SidebarNav sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
                </div>

                <div className="hidden lg:flex flex-1 flex-col">
                    <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

function MobileSidebar({ show, sections, activeSection, onSelect, onClose, t, searchQuery, setSearchQuery }: MobileSidebarProps) {
    return (
        <div className={`lg:hidden ${show ? "flex" : "hidden"} flex-col w-full h-full bg-amber-50 dark:bg-gray-800`}>
            <SidebarHeader onClose={onClose} t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <SidebarNav sections={sections} activeSection={activeSection} onSelect={onSelect} />
        </div>
    )
}

function SidebarHeader({ onClose, t, searchQuery, setSearchQuery }: SidebarHeaderProps) {
    return (
        <div className="p-4 border-b border-amber-300 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("helpCenter")}</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder={t("searchHelp")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700 border-amber-300 dark:border-gray-600 text-sm"
                />
            </div>
        </div>
    )
}

function SidebarNav({ sections, activeSection, onSelect }: SidebarNavProps) {
    return (
        <nav className="flex-1 p-4">
            <ul className="space-y-1">
                {sections.map((section) => (
                    <li key={section.id}>
                        <button
                            onClick={() => onSelect(section.id)}
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
    )
}

function PanelHeader({ title, onBack, onClose }: PanelHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-600">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
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
    )
}

function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
            <Icon className="h-5 w-5 text-orange-500 dark:text-blue-400 mt-0.5" />
            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
            </div>
        </div>
    )
}

function Shortcut({ keyCombo, desc }: ShortcutProps) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
            <span className="text-gray-800 dark:text-gray-200">{desc}</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">{keyCombo}</kbd>
        </div>
    )
}

function FAQ({ question, answer }: FAQProps) {
    return (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-600">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{question}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{answer}</p>
        </div>
    )
}

function ContactSupport({ icon: Icon, contact }: ContactSupportProps) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-orange-500 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">{contact}</span>
        </div>
    )
}
