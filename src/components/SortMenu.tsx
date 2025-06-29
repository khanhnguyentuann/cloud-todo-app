import { Button } from "@/components/ui/button"
import { Star, CalendarIcon, ArrowUpDown, Clock } from "lucide-react"
import type { FC } from "react"
import { DropdownMenu } from "@/components/DropdownMenuBase"

interface SortMenuProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSortChange: (sort: string) => void
}

interface SortOption {
    icon: FC<{ className?: string }>
    label: string
}

export function SortMenu({ isOpen, onOpenChange, onSortChange }: SortMenuProps) {
    const sortOptions: SortOption[] = [
        { icon: Star, label: "Important" },
        { icon: CalendarIcon, label: "Due date" },
        { icon: ArrowUpDown, label: "Alphabetical" },
        { icon: Clock, label: "Creation date" },
    ]

    return (
        <DropdownMenu
            align="right"
            trigger={
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="hidden lg:inline ml-1">Sort</span>
                </Button>
            }
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <div className="p-2">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">Sort by</div>
                {sortOptions.map((option) => (
                    <button
                        key={option.label}
                        onClick={() => {
                            onSortChange(option.label)
                            onOpenChange(false)
                        }}
                        className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                        <option.icon className="h-4 w-4" />
                        {option.label}
                    </button>
                ))}
            </div>
        </DropdownMenu>
    )
}
