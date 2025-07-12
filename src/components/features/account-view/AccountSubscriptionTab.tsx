import { Button } from "@/components/common/Button"
import { useTranslation } from "react-i18next"

export function AccountSubscriptionTab() {
    const { t } = useTranslation()

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
}
