import type { TFunction } from "i18next"

interface GettingStartedProps {
    t: TFunction
}

export function GettingStarted({ t }: GettingStartedProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("gettingStartedTitle")}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t("gettingStartedContent")}</p>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("addingTasksTitle")}</h4>
            <p className="text-gray-600 dark:text-gray-400">{t("addingTasksContent")}</p>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("organizingTasksTitle")}</h4>
            <p className="text-gray-600 dark:text-gray-400">{t("organizingTasksContent")}</p>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{t("settingRemindersTitle")}</h4>
            <p className="text-gray-600 dark:text-gray-400">{t("settingRemindersContent")}</p>
        </div>
    )
}