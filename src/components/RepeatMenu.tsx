import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
import { DropdownMenu } from "@/components/DropdownMenuBase"
import type { RepeatMenuProps } from "@/types"

export function RepeatMenu({ isOpen, onOpenChange, onRepeatSelect, trigger }: RepeatMenuProps) {
    const [showCustom, setShowCustom] = useState(false)
    const [customInterval, setCustomInterval] = useState<string>("1")
    const [customUnit, setCustomUnit] = useState<string>("weeks")
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    const repeatOptions: { label: string }[] = [
        { label: "Daily" },
        { label: "Weekdays" },
        { label: "Weekly" },
        { label: "Monthly" },
        { label: "Yearly" },
    ]

    const days: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const defaultTrigger = (
        <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
        >
            <RotateCcw className="h-4 w-4" />
        </Button>
    )

    if (showCustom) {
        return (
            <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
                <div className="p-4 w-80">
                    <div className="flex gap-2 mb-4">
                        <Select value={customInterval} onValueChange={(val: string) => setCustomInterval(val)}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={customUnit} onValueChange={(val: string) => setCustomUnit(val)}>
                            <SelectTrigger className="flex-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weeks">weeks</SelectItem>
                                <SelectItem value="months">months</SelectItem>
                                <SelectItem value="years">years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-1 mb-4">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() =>
                                    setSelectedDays((prev) =>
                                        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                                    )
                                }
                                className={`w-8 h-8 text-xs rounded ${selectedDays.includes(day)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                            onRepeatSelect(`${customInterval} ${customUnit}, ${selectedDays.join(" ")}`)
                            onOpenChange(false)
                            setShowCustom(false)
                        }}
                    >
                        Save
                    </Button>
                </div>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="p-2">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">Repeat</div>
                {repeatOptions.map((option) => (
                    <button
                        key={option.label}
                        onClick={() => {
                            onRepeatSelect(option.label)
                            onOpenChange(false)
                        }}
                        className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                        <RotateCcw className="h-4 w-4" />
                        {option.label}
                    </button>
                ))}
                <button
                    onClick={() => setShowCustom(true)}
                    className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                    <RotateCcw className="h-4 w-4" />
                    Custom
                </button>
            </div>
        </DropdownMenu>
    )
}
