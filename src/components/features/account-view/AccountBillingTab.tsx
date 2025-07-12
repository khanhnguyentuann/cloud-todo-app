import { Button } from "@/components/common/Button"
import { useTranslation } from "react-i18next"

export function AccountBillingTab() {
    const { t } = useTranslation()

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
}
