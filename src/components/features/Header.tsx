import { useState, type FC } from "react"
import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { Menu, Search, Settings, HelpCircle, Bell, User } from "lucide-react"
import type { HeaderProps } from "@/types"
import { useLanguage } from "@/hooks/useLanguage"

export const Header: FC<HeaderProps> = ({
    onMenuClick,
    onSettingsClick,
    onAccountClick,
    onHelpClick,
    onNotificationClick,
    unreadNotificationCount,
}) => {
    const [searchExpanded, setSearchExpanded] = useState(false)
    const { t } = useLanguage()

    return (
        <header className="border-b border-amber-300 dark:border-gray-600 bg-orange-500 dark:bg-gray-800 text-white px-2 sm:px-4 h-16 flex items-center justify-between relative z-50">
            <div className="flex items-center gap-2 sm:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-orange-600 dark:hover:bg-blue-500"
                    onClick={onMenuClick}
                >
                    <Menu className="h-4 w-4" />
                </Button>
                <h1 className="text-base sm:text-lg font-semibold">{t.appName}</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden sm:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                    <Input
                        placeholder={t.search}
                        className="pl-10 bg-white dark:bg-gray-800 border-0 text-gray-800 dark:text-gray-200 text-sm w-full"
                    />
                </div>
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden">
                {searchExpanded ? (
                    <div className="absolute left-0 right-0 top-0 bg-orange-500 dark:bg-gray-800 p-3 flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                                placeholder={t.search}
                                className="pl-10 bg-white dark:bg-gray-800 border-0 text-gray-800 dark:text-gray-200 text-sm w-full"
                                autoFocus
                                onBlur={() => setSearchExpanded(false)}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-orange-600 dark:hover:bg-blue-500"
                            onClick={() => setSearchExpanded(false)}
                        >
                            {t.cancel}
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-orange-600 dark:hover:bg-blue-500"
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
                    className="text-white hover:bg-orange-600 dark:hover:bg-blue-500"
                    onClick={onSettingsClick}
                >
                    <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-orange-600 dark:hover:bg-blue-500" onClick={onHelpClick}>
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-orange-600 dark:hover:bg-blue-500 relative"
                    onClick={onNotificationClick}
                >
                    <Bell className="h-4 w-4" />
                    {unreadNotificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center text-white">
                            {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                        </span>
                    )}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-orange-600 dark:hover:bg-blue-500"
                    onClick={onAccountClick}
                >
                    <User className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
