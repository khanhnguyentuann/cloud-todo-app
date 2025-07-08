import { Button } from "@/components/common/Button"
import { Star, CalendarIcon, ArrowUpDown, Clock } from "lucide-react"
import { DropdownMenu } from "@/components/common/DropdownMenuBase"
import type { SortMenuProps, SortOption } from "@/types"
import { useRef } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export function SortMenu({ isOpen, onOpenChange, onSortChange, currentSort }: SortMenuProps) {
    const timeoutRef = useRef<number | null>(null)
    const { t } = useLanguage()

    const sortOptions: SortOption[] = [
        { icon: Star, label: t.important },
        { icon: CalendarIcon, label: t.dueDate },
        { icon: ArrowUpDown, label: t.alphabetical },
        { icon: Clock, label: t.creationDate },
    ]

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        onOpenChange(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            onOpenChange(false)
        }, 150) // Small delay to allow moving to menu
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <DropdownMenu
                align="right"
                trigger={
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${currentSort !== "Creation date" ? "bg-amber-100 dark:bg-gray-700" : ""
                            }`}
                    >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="hidden lg:inline ml-1">{t.sort}</span>
                    </Button>
                }
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <div className="p-2">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">{t.sortBy}</div>
                    {sortOptions.map((option) => (
                        <button
                            key={option.label}
                            onClick={() => {
                                onSortChange(option.label)
                                onOpenChange(false)
                            }}
                            className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded transition-colors ${currentSort === option.label
                                ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                }`}
                        >
                            <option.icon className="h-4 w-4" />
                            {option.label}
                            {currentSort === option.label && (
                                <div className="ml-auto w-2 h-2 bg-orange-500 dark:bg-blue-400 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </DropdownMenu>
        </div>
    )
}
