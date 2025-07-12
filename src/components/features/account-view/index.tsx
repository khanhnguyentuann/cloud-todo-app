import { useState } from "react"
import { useTranslation } from "react-i18next"
import { X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/common/Button"
import { accountTabs } from "@/components/features/account-view/accountTabs"
import { AccountProfileTab } from "@/components/features/account-view/AccountProfileTab"
import { AccountSubscriptionTab } from "@/components/features/account-view/AccountSubscriptionTab"
import { AccountUsageTab } from "@/components/features/account-view/AccountUsageTab"
import { AccountPrivacyTab } from "@/components/features/account-view/AccountPrivacyTab"
import { AccountBillingTab } from "@/components/features/account-view/AccountBillingTab"
import type { AccountViewProps, ProfileData, Preferences } from "./types"

export default function AccountView({ isOpen, onClose }: AccountViewProps) {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState("profile")
    const [showSidebar, setShowSidebar] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "Khanh Nguyễn",
        email: "khanhnguyentuann@gmail.com",
        phone: "+84 123 456 789",
        timezone: "Asia/Ho_Chi_Minh",
    })
    const [preferences, setPreferences] = useState<Preferences>({
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: false,
        taskReminders: true,
    })

    if (!isOpen) return null

    const tabs = accountTabs(t)

    const handleSaveProfile = () => {
        setIsEditing(false)
        console.log("Save profile:", profileData, preferences)
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <AccountProfileTab {...{ profileData, setProfileData, isEditing, setIsEditing, preferences, setPreferences, handleSaveProfile }} />
            case "subscription":
                return <AccountSubscriptionTab />
            case "usage":
                return <AccountUsageTab />
            case "privacy":
                return <AccountPrivacyTab />
            case "billing":
                return <AccountBillingTab />
            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
            <div className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-700 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden border border-amber-300 dark:border-gray-600">
                <div className={`lg:hidden ${showSidebar ? "flex" : "hidden"} flex-col w-full h-full bg-amber-50 dark:bg-gray-800`}>
                    <div className="p-4 border-b border-amber-300 dark:border-gray-600">
                        <h2 className="text-lg font-semibold">{t("myAccount")}</h2>
                    </div>
                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => {
                                            setActiveTab(tab.id)
                                            setShowSidebar(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${activeTab === tab.id
                                            ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" /> {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={`lg:hidden ${showSidebar ? "hidden" : "flex"} flex-col w-full h-full`}>
                    <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-600">
                        <Button variant="ghost" size="sm" onClick={() => setShowSidebar(true)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-lg font-semibold">{tabs.find((s) => s.id === activeTab)?.label}</h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">{renderTabContent()}</div>
                </div>

                <div className="hidden lg:flex w-64 flex-col bg-amber-50 dark:bg-gray-800 border-r border-amber-300 dark:border-gray-600">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">{t("myAccount")}</h2>
                    </div>
                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${activeTab === tab.id
                                            ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" /> {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="hidden lg:flex flex-1 flex-col p-6 overflow-y-auto">{renderTabContent()}</div>
            </div>
        </div>
    )
}
