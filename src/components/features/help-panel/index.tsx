import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import {
    X, Search, BookOpen, Star, Keyboard, MessageCircle, ChevronLeft
} from "lucide-react"
import { useTranslation } from "react-i18next"
import type { HelpPanelProps, MobileSidebarProps, PanelHeaderProps, Section, SidebarHeaderProps, SidebarNavProps } from "@/types"

import { GettingStarted } from "@/components/features/help-panel/GettingStarted"
import { Features } from "@/components/features/help-panel/Features"
import { Shortcuts } from "@/components/features/help-panel/Shortcuts"
import { FAQ } from "@/components/features/help-panel/FAQ"

export default function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
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
                return <GettingStarted t={t} />
            case "features":
                return <Features t={t} />
            case "shortcuts":
                return <Shortcuts t={t} />
            case "faq":
                return <FAQ t={t} />
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