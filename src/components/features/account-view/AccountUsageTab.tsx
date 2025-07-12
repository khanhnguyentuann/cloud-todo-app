import { BarChart3 } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AccountUsageTab() {
    const { t } = useTranslation()

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
}
