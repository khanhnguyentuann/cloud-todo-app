import { Button } from "@/components/ui/button"
import type { ContentHeaderProps } from "@/types"
import { Sun, Grid3X3, List, MoreHorizontal } from "lucide-react"
import type { FC } from "react"
import { useState } from "react"
import { SortMenu } from "@/components/SortMenu"

export const ContentHeader: FC<ContentHeaderProps> = ({ title, date }) => {
    const [sortMenuOpen, setSortMenuOpen] = useState(false)

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
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <Grid3X3 className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Grid</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-amber-100 dark:bg-gray-700"
                    >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">List</span>
                    </Button>
                    <SortMenu
                        isOpen={sortMenuOpen}
                        onOpenChange={setSortMenuOpen}
                        onSortChange={(sort) => console.log("Sort:", sort)}
                    />
                </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
    )
}
