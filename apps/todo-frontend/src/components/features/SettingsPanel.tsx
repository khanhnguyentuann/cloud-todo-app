import { type FC, useState } from "react";
import { Button } from "@/components/common/Button";
import { Switch } from "@/components/common/Switch";
import type { SettingsPanelProps } from "@/types";
import { X, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SettingsPanel: FC<SettingsPanelProps> = ({
    isOpen,
    onClose,
    isDarkMode,
    onToggleDarkMode
}) => {
    const { i18n, t } = useTranslation();
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    if (!isOpen) return null;

    const languages = [
        { code: "en" as const, name: "English", nativeName: "English" },
        { code: "ja" as const, name: "Japanese", nativeName: "日本語" },
        { code: "vi" as const, name: "Vietnamese", nativeName: "Tiếng Việt" },
    ];

    if (showLanguageMenu) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowLanguageMenu(false)} />

                <div className="relative w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-xl mx-4 max-h-[80vh] flex flex-col border border-amber-300 dark:border-gray-600">
                    <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("changeLanguage")}</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowLanguageMenu(false)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    i18n.changeLanguage(lang.code);
                                    localStorage.setItem("language", lang.code);
                                    setShowLanguageMenu(false);
                                }}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <div className="text-left">
                                    <div className="font-medium text-gray-800 dark:text-gray-200">{lang.nativeName}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{lang.name}</div>
                                </div>
                                {i18n.language === lang.code && <Check className="h-5 w-5 text-orange-500 dark:text-blue-400" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-xl mx-4 max-h-[80vh] flex flex-col border border-amber-300 dark:border-gray-600">
                <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("settings")}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("languageAndTimeZone")}</h3>
                        <Button
                            variant="ghost"
                            onClick={() => setShowLanguageMenu(true)}
                            className="w-full justify-between text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600"
                        >
                            {t("changeLanguage")}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("darkMode")}</h3>
                            <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t("password")}</h3>
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600"
                        >
                            {t("changePassword")}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
