import { useEffect, useState } from "react"
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
import { useAuth } from "@/hooks/useAuth"

export default function AccountView({ isOpen, onClose }: AccountViewProps) {
    const { t } = useTranslation()
    const { user } = useAuth() // 🔥 lấy user từ context
    const [activeTab, setActiveTab] = useState("profile")
    const [showSidebar, setShowSidebar] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        email: "",
        phone: "",
        timezone: ""
    })

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                timezone: user.timezone ?? ""
            })
        }
    }, [user])


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
                return (
                    <AccountProfileTab
                        profileData={profileData}
                        setProfileData={setProfileData}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        preferences={preferences}
                        setPreferences={setPreferences}
                        handleSaveProfile={handleSaveProfile}
                    />
                )
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

            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-700 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden border border-amber-300 dark:border-gray-600">
                {/* MOBILE SIDEBAR */}
                <div className={`lg:hidden ${showSidebar ? "flex" : "hidden"} flex-col w-full h-full bg-amber-50 dark:bg-gray-800`}>
                    <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-600">
                        <h2 className="text-lg font-semibold">{t("myAccount")}</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {tabs.map(tab => (
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

                {/* MOBILE CONTENT */}
                <div className={`lg:hidden ${showSidebar ? "hidden" : "flex"} flex-col w-full h-full overflow-y-auto`}>
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(true)}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <h2 className="text-lg font-semibold">{tabs.find(s => s.id === activeTab)?.label}</h2>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="p-4">{renderTabContent()}</div>
                </div>

                {/* DESKTOP SIDEBAR */}
                <div className="hidden lg:flex w-64 flex-col bg-amber-50 dark:bg-gray-800 border-r border-amber-300 dark:border-gray-600">
                    <div className="sticky top-0 z-10 bg-amber-50 dark:bg-gray-800 p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("myAccount")}</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-1">
                            {tabs.map(tab => (
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

                {/* DESKTOP CONTENT */}
                <div className="hidden lg:flex flex-1 flex-col overflow-y-auto">
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 p-6 border-b border-amber-300 dark:border-gray-600">
                        <h2 className="text-lg font-semibold">{tabs.find(s => s.id === activeTab)?.label}</h2>
                    </div>
                    <div className="p-6">{renderTabContent()}</div>
                </div>
            </div>
        </div>
    )
}
