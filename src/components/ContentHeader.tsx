import { Button } from "@/components/ui/button"
import type { ContentHeaderProps } from "@/types"
import { Sun, Grid3X3, List, MoreHorizontal } from "lucide-react"
import type { FC } from "react"
import { useState } from "react"
import { SortMenu } from "@/components/SortMenu"
import { Tooltip } from "@/components/Tooltip"
import { useLanguage } from "@/hooks/UseLanguage"

export const ContentHeader: FC<ContentHeaderProps> = ({ title, date, viewMode, onViewModeChange, sortBy, onSortChange }) => {
    const [sortMenuOpen, setSortMenuOpen] = useState(false)
    const { t } = useLanguage()

    return (
        <div className="border-b border-amber-300 dark:border-gray-700 p-3 sm:p-6 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-blue-400 flex-shrink-0" />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {title}
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Tooltip content={t.grid}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewModeChange("grid")}
                            className={`text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${viewMode === "grid" ? "bg-amber-100 dark:bg-gray-700" : ""
                                }`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">{t.grid}</span>
                        </Button>
                    </Tooltip>

                    {/* List button */}
                    <Tooltip content={t.list}>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewModeChange("list")}
                            className={`text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${viewMode === "list" ? "bg-amber-100 dark:bg-gray-700" : ""
                                }`}
                        >
                            <List className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">{t.list}</span>
                        </Button>
                    </Tooltip>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <SortMenu
                        isOpen={sortMenuOpen}
                        onOpenChange={setSortMenuOpen}
                        onSortChange={onSortChange}
                        currentSort={sortBy}
                    />
                </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
    )
}
