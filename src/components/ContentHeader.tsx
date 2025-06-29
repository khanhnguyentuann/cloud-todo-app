import { Button } from "@/components/ui/button"
import type { ContentHeaderProps } from "@/types"
import { Sun, Grid3X3, List, ArrowUpDown, Users, Lightbulb, MoreHorizontal } from "lucide-react"
import type { FC } from "react"

export const ContentHeader: FC<ContentHeaderProps> = ({ title, date }) => {
    return (
        <div className="border-b border-amber-300 p-3 sm:p-6 bg-white">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 whitespace-nowrap">{title}</h2>
                    <Button variant="ghost" size="sm" className="hidden sm:flex flex-shrink-0 text-gray-500 hover:text-gray-800">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 ml-4">
                    {/* Left: Grid / List */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                            <Grid3X3 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">Grid</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800 bg-amber-100">
                            <List className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">List</span>
                        </Button>
                    </div>

                    {/* Right: Sort / Group / Suggestions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                            <ArrowUpDown className="h-4 w-4" />
                            <span className="hidden lg:inline ml-1">Sort</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                            <Users className="h-4 w-4" />
                            <span className="hidden lg:inline ml-1">Group</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                            <Lightbulb className="h-4 w-4" />
                            <span className="hidden lg:inline ml-1">Suggestions</span>
                        </Button>
                    </div>
                </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">{date}</p>
        </div>
    )
}
