import { useState, type FC } from "react"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { Menu, Search, Settings, HelpCircle, Bell, User } from "lucide-react"
import type { HeaderProps } from "@/types"
import { useTranslation } from "react-i18next"

export const Header: FC<HeaderProps> = ({
    onMenuClick,
    onSettingsClick,
    onAccountClick,
    onHelpClick,
    onNotificationClick,
    unreadNotificationCount,
}) => {
    const [searchExpanded, setSearchExpanded] = useState(false)
    const { t } = useTranslation()

    return (
        <header className="border-b border-theme-border dark:border-theme-border bg-theme-primary dark:bg-theme-primary text-theme-primary-foreground px-2 sm:px-4 h-16 flex items-center justify-between sticky top-0 z-50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 sm:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg"
                    onClick={onMenuClick}
                >
                    <Menu className="h-4 w-4" />
                </Button>
                <h1 className="text-base sm:text-lg font-semibold">{t("appName")}</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden sm:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-muted h-4 w-4" />
                    <Input
                        placeholder={t("search")}
                        className="pl-10 bg-theme-surface dark:bg-theme-surface border border-theme-border/30 dark:border-theme-border/30 text-theme-text-primary dark:text-theme-text-primary text-sm w-full rounded-lg focus:border-theme-primary/50 transition-colors"
                    />
                </div>
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden">
                {searchExpanded ? (
                    <div className="absolute left-0 right-0 top-0 bg-theme-primary dark:bg-theme-primary p-3 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-muted h-4 w-4" />
                            <Input
                                placeholder={t("search")}
                                className="pl-10 bg-theme-surface dark:bg-theme-surface border border-theme-border/30 dark:border-theme-border/30 text-theme-text-primary dark:text-theme-text-primary text-sm w-full rounded-lg"
                                autoFocus
                                onBlur={() => setSearchExpanded(false)}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg"
                            onClick={() => setSearchExpanded(false)}
                        >
                            {t("cancel")}
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg"
                        onClick={() => setSearchExpanded(true)}
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Right Actions */}
            <div className={`flex items-center gap-1 sm:gap-2 ${searchExpanded ? "hidden" : "flex"}`}>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg p-2"
                    onClick={onSettingsClick}
                >
                    <Settings className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg p-2"
                    onClick={onHelpClick}
                >
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg p-2 relative"
                    onClick={onNotificationClick}
                >
                    <Bell className="h-4 w-4" />
                    {unreadNotificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-theme-error text-theme-error-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium shadow-sm">
                            {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                        </span>
                    )}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary-foreground hover:bg-theme-primary-hover dark:hover:bg-theme-primary-hover transition-all duration-200 rounded-lg p-2"
                    onClick={onAccountClick}
                >
                    <User className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
