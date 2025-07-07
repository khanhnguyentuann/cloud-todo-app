import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    X,
    User,
    Mail,
    Calendar,
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
import { useLanguage } from "@/hooks/UseLanguage"
import type { AccountViewProps } from "@/types/components/AccountView"

export function AccountView({ isOpen, onClose }: AccountViewProps) {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState("profile")
    const [showSidebar, setShowSidebar] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "Khanh Nguyễn",
        email: "khanhnguyentuann@gmail.com",
        phone: "+84 123 456 789",
        timezone: "Asia/Ho_Chi_Minh",
        dateFormat: "DD/MM/YYYY",
    })

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        weeklyDigest: false,
        taskReminders: true,
        soundEffects: true,
    })

    if (!isOpen) return null

    const tabs = [
        { id: "profile", label: t.profile, icon: User },
        { id: "subscription", label: t.subscription, icon: Crown },
        { id: "usage", label: t.usage, icon: BarChart3 },
        { id: "privacy", label: t.privacy, icon: Shield },
        { id: "billing", label: t.billing, icon: CreditCard },
    ]

    const handleSaveProfile = () => {
        setIsEditing(false)
        // Here you would typically save to backend
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="space-y-6">
                        {/* Profile Picture */}
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
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t.freeAccount}</p>
                                <Button variant="ghost" size="sm" className="text-orange-500 dark:text-blue-400 p-0 h-auto">
                                    {t.changePicture}
                                </Button>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.personalInformation}</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-orange-500 dark:text-blue-400"
                                >
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    {isEditing ? t.cancel : t.edit}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t.fullName}
                                    </label>
                                    <Input
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        disabled={!isEditing}
                                        className="bg-gray-50 dark:bg-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.email}</label>
                                    <Input
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="bg-gray-50 dark:bg-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t.phoneNumber}
                                    </label>
                                    <Input
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="bg-gray-50 dark:bg-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t.timezone}
                                    </label>
                                    <Input
                                        value={profileData.timezone}
                                        onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                                        disabled={!isEditing}
                                        className="bg-gray-50 dark:bg-gray-600"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleSaveProfile}
                                        className="bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                                    >
                                        {t.saveChanges}
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        {t.cancel}
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Preferences */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.preferences}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.emailNotifications}</span>
                                    <Switch
                                        checked={preferences.emailNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.pushNotifications}</span>
                                    <Switch
                                        checked={preferences.pushNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.weeklyDigest}</span>
                                    <Switch
                                        checked={preferences.weeklyDigest}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.taskReminders}</span>
                                    <Switch
                                        checked={preferences.taskReminders}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, taskReminders: checked })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "subscription":
                return (
                    <div className="space-y-6">
                        {/* Current Plan */}
                        <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Crown className="h-6 w-6 text-orange-500 dark:text-blue-400" />
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.currentPlan}</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{t.freeAccount}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.freeAccountDescription}</p>
                                </div>
                                <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                                    {t.upgrade}
                                </Button>
                            </div>
                        </div>

                        {/* Plan Features */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.planFeatures}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h5 className="font-medium text-gray-700 dark:text-gray-300">{t.freeAccount}</h5>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• {t.unlimitedTasks}</li>
                                        <li>• {t.basicReminders}</li>
                                        <li>• {t.webAccess}</li>
                                        <li>• {t.basicSupport}</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="font-medium text-gray-700 dark:text-gray-300">{t.premiumAccount}</h5>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• {t.allFreeFeatures}</li>
                                        <li>• {t.advancedReminders}</li>
                                        <li>• {t.fileAttachments}</li>
                                        <li>• {t.prioritySupport}</li>
                                        <li>• {t.teamCollaboration}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "usage":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.usageStatistics}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="h-5 w-5 text-orange-500 dark:text-blue-400" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{t.totalTasks}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">127</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t.thisMonth}</p>
                            </div>

                            <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-5 w-5 text-green-500" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{t.completedTasks}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">89</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">70% {t.completionRate}</p>
                            </div>

                            <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{t.activeReminders}</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">12</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t.upcoming}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.accountActivity}</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">{t.accountCreated}</span>
                                    <span className="text-gray-800 dark:text-gray-200">January 15, 2024</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">{t.lastLogin}</span>
                                    <span className="text-gray-800 dark:text-gray-200">{t.today}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">{t.dataUsage}</span>
                                    <span className="text-gray-800 dark:text-gray-200">2.4 MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "privacy":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.privacySettings}</h3>

                        <div className="space-y-4">
                            <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{t.dataExport}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.dataExportDescription}</p>
                                <Button variant="outline" className="w-full bg-transparent">
                                    <Download className="h-4 w-4 mr-2" />
                                    {t.exportMyData}
                                </Button>
                            </div>

                            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">{t.deleteAccount}</h4>
                                <p className="text-sm text-red-600 dark:text-red-400 mb-3">{t.deleteAccountDescription}</p>
                                <Button variant="destructive" className="w-full">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {t.deleteMyAccount}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.privacyControls}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.dataCollection}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.dataCollectionDescription}</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.analytics}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.analyticsDescription}</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.marketingEmails}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.marketingEmailsDescription}</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "billing":
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.billingInformation}</h3>

                        <div className="bg-amber-50 dark:bg-gray-600 rounded-lg p-4">
                            <p className="text-center text-gray-600 dark:text-gray-400">{t.noBillingInfo}</p>
                            <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                                {t.upgradeToPremium}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t.billingHistory}</h4>
                            <div className="text-center py-8">
                                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500 dark:text-gray-400">{t.noBillingHistory}</p>
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

            {/* Account View */}
            <div className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-700 shadow-xl rounded-lg flex flex-col lg:flex-row overflow-hidden border border-amber-300 dark:border-gray-600">
                {/* Mobile: Full-screen sidebar initially, then content */}
                <div
                    className={`lg:hidden ${showSidebar ? "flex" : "hidden"} flex-col w-full h-full bg-amber-50 dark:bg-gray-800`}
                >
                    <div className="p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.myAccount}</h2>
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

                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => {
                                            setActiveTab(tab.id)
                                            setShowSidebar(false)
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === tab.id
                                            ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Mobile: Content view */}
                <div className={`lg:hidden ${showSidebar ? "hidden" : "flex"} flex-col w-full h-full`}>
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
                                {tabs.find((s) => s.id === activeTab)?.label}
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
                    <div className="flex-1 p-4 overflow-y-auto min-h-0">{renderTabContent()}</div>
                </div>

                {/* Desktop: Sidebar */}
                <div className="hidden lg:flex w-64 bg-amber-50 dark:bg-gray-800 border-r border-amber-300 dark:border-gray-600 flex-col">
                    <div className="p-4 border-b border-amber-300 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t.myAccount}</h2>
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

                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            {tabs.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${activeTab === tab.id
                                            ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Desktop: Content */}
                <div className="hidden lg:flex flex-1 flex-col">
                    <div className="flex-1 p-6 overflow-y-auto">{renderTabContent()}</div>
                </div>
            </div>
        </div>
    )
}
