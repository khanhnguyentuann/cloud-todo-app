import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Calendar } from "@/components/common/Calendar"
import { CalendarIcon } from "lucide-react"
import type { DueDateMenuProps } from "@/types"
import { DropdownMenu } from "@/components/common/DropdownMenuBase"
import { useTranslation } from "react-i18next"
import { getQuickDueDateOptions } from "@/utils/getQuickDueDates"

export function DueDateMenu({ isOpen, onOpenChange, onDateSelect, trigger }: DueDateMenuProps) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()
    const { t } = useTranslation()

    const today = new Date()
    const dueDateQuickOptions = getQuickDueDateOptions(today, t)

    const handleSave = (date: Date) => {
        onDateSelect(date.toISOString().split('T')[0]);
        onOpenChange(false);
        setShowCalendar(false);
    }

    const defaultTrigger = (
        <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
        >
            <CalendarIcon className="h-4 w-4" />
        </Button>
    )

    if (showCalendar) {
        return (
            <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
                <div className="p-1 w-70 flex items-center justify-between flex-col">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-0"
                    />
                    <Button
                        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => selectedDate && handleSave(selectedDate)}
                    >
                        {t("save")}
                    </Button>
                </div>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="p-2">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">{t("due")}</div>
                {dueDateQuickOptions.map((option) => (
                    <button
                        key={option.label}
                        onClick={() => handleSave(option.value)}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-4 w-4" />
                            {option.label}
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">{option.day}</span>
                    </button>
                ))}
                <button
                    onClick={() => setShowCalendar(true)}
                    className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                    <CalendarIcon className="h-4 w-4" />
                    {t("pickDate")}
                </button>
            </div>
        </DropdownMenu>
    )
}
