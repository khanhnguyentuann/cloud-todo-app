import { Download, Trash2 } from "lucide-react"
import { Button } from "@/components/common/Button"
import { useTranslation } from "react-i18next"

export function AccountPrivacyTab() {
    const { t } = useTranslation()

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
}
