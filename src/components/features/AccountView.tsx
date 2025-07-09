import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { Switch } from "@/components/common/Switch"
import {
    X,
    User,
    Crown,
    BarChart3,
    Shield,
    CreditCard,
    Download,
    Trash2,
    Edit2,
    Camera,
    ChevronLeft,
} from "lucide-react"
import { useState } from "react"
import { useTranslation } from 'react-i18next';
import type { AccountViewProps } from "@/types"

export function AccountView({ isOpen, onClose }: AccountViewProps) {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState("profile")
    const [showSidebar, setShowSidebar] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "Khanh Nguyễn",
        email: "khanhnguyentuann@gmail.com",
        phone: "+84 123 456 789",
        timezone: "Asia/Ho_Chi_Minh",
    })

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: false,
        taskReminders: true,
    })

    if (!isOpen) return null

    const tabs = [
        { id: "profile", label: t("profile"), icon: User },
        { id: "subscription", label: t("subscription"), icon: Crown },
        { id: "usage", label: t("usage"), icon: BarChart3 },
        { id: "privacy", label: t("privacy"), icon: Shield },
        { id: "billing", label: t("billing"), icon: CreditCard },
    ]

    const handleSaveProfile = () => {
        setIsEditing(false)
        // TODO: save profile
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                                <Button
                                    size="sm"
                                    className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0 bg-white dark:bg-gray-700 border-2 border-white dark:border-gray-700"
                                >
                                    <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                </Button>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{profileData.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t("freeAccount")}</p>
                                <Button variant="ghost" size="sm" className="text-orange-500 dark:text-blue-400 p-0 h-auto">
                                    {t("changePicture")}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("personalInformation")}</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-orange-500 dark:text-blue-400"
                                >
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    {isEditing ? t("cancel") : t("edit")}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t("fullName")}
                                    </label>
                                    <Input
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t("email")}
                                    </label>
                                    <Input
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t("phoneNumber")}
                                    </label>
                                    <Input
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t("timezone")}
                                    </label>
                                    <Input
                                        value={profileData.timezone}
                                        onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-2">
                                    <Button onClick={handleSaveProfile} className="bg-orange-500 dark:bg-blue-500">
                                        {t("saveChanges")}
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        {t("cancel")}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("preferences")}</h4>
                            {Object.entries(preferences).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t(key)}</span>
                                    <Switch
                                        checked={value}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, [key]: checked })}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case "subscription":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("subscription")}</h3>
                        <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{t("freeAccount")}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("freeAccountDescription")}</p>
                                </div>
                                <Button className="bg-orange-500 dark:bg-blue-500">{t("upgrade")}</Button>
                            </div>
                        </div>
                    </div>
                )

            case "usage":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("usageStatistics")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="h-5 w-5 text-orange-500 dark:text-blue-400" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{t("totalTasks")}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">127</p>
                            </div>
                        </div>
                    </div>
                )

            case "privacy":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("privacySettings")}</h3>
                        <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                            <h4 className="font-medium mb-2">{t("dataExport")}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("dataExportDescription")}</p>
                            <Button variant="outline" className="w-full">
                                <Download className="h-4 w-4 mr-2" /> {t("exportMyData")}
                            </Button>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">{t("deleteAccount")}</h4>
                            <p className="text-sm text-red-600 dark:text-red-400 mb-3">{t("deleteAccountDescription")}</p>
                            <Button variant="destructive" className="w-full">
                                <Trash2 className="h-4 w-4 mr-2" /> {t("deleteMyAccount")}
                            </Button>
                        </div>
                    </div>
                )

            case "billing":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("billingInformation")}</h3>
                        <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                            <p className="text-center text-gray-600 dark:text-gray-400">{t("noBillingInfo")}</p>
                            <Button className="w-full mt-3 bg-orange-500 dark:bg-blue-500">
                                {t("upgradeToPremium")}
                            </Button>
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
