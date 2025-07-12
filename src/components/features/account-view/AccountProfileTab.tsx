import { User, Edit2, Camera } from "lucide-react"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { Switch } from "@/components/common/Switch"
import { useTranslation } from "react-i18next"
import type { ProfileData, Preferences } from "./types"

type Props = {
    profileData: ProfileData
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    preferences: Preferences
    setPreferences: React.Dispatch<React.SetStateAction<Preferences>>
    handleSaveProfile: () => void
}

export function AccountProfileTab({
    profileData, setProfileData, isEditing, setIsEditing,
    preferences, setPreferences, handleSaveProfile
}: Props) {
    const { t } = useTranslation()

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
}
