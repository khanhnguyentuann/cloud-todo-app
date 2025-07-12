import type { TFunction } from "i18next"
import type { ShortcutProps } from "@/types"

interface ShortcutsProps {
    t: TFunction
}

export function Shortcuts({ t }: ShortcutsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("shortcutsTitle")}</h3>
            <Shortcut keyCombo="Enter" desc={t("shortcutNewTask")} />
            <Shortcut keyCombo="Ctrl+F" desc={t("shortcutSearch")} />
            <Shortcut keyCombo="Ctrl+G" desc={t("shortcutToggleView")} />
            <Shortcut keyCombo="Ctrl+," desc={t("shortcutSettings")} />
        </div>
    )
}

function Shortcut({ keyCombo, desc }: ShortcutProps) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-gray-600">
            <span className="text-gray-800 dark:text-gray-200">{desc}</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">{keyCombo}</kbd>
        </div>
    )
}