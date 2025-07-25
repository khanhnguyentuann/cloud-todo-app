import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Calendar } from "@/components/common/Calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/Select"
import { Bell, Clock, CalendarIcon } from "lucide-react"
import { DropdownMenu } from "@/components/common/DropdownMenuBase"
import type { ReminderMenuProps } from "@/types"
import { useTranslation } from "react-i18next"

export function ReminderMenu({ isOpen, onOpenChange, onReminderSelect, trigger }: ReminderMenuProps) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<string>("4:00 PM")
    const { t } = useTranslation()

    // 👉 Generate quick options
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)

    const reminderQuickOptions = [
        { label: t("today"), value: today, time: "4:00 PM" },
        { label: t("tomorrow"), value: tomorrow, time: "9:00 AM" },
        { label: t("nextWeek"), value: nextWeek, time: "9:00 AM" },
    ]

    const defaultTrigger = (
        <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
        >
            <Bell className="h-4 w-4" />
        </Button>
    )

    if (showCalendar) {
        return (
            <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
                <div className="p-4 w-72 flex flex-col items-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date)}
                        className="rounded-md border-0"
                    />
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="w-full mt-3">
                            <SelectValue placeholder="4:00 PM" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                            <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                            onReminderSelect(
                                `${selectedDate?.toLocaleDateString()} ${selectedTime}`
                            )
                            onOpenChange(false)
                            setShowCalendar(false)
                        }}
                        disabled={!selectedDate}
                    >
                        {t("save")}
                    </Button>
                </div>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu trigger={trigger || defaultTrigger} isOpen={isOpen} onOpenChange={onOpenChange}>
            <div className="p-2 w-60">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">{t("reminder")}</div>
                {reminderQuickOptions.map((option) => (
                    <button
                        key={option.label}
                        onClick={() => {
                            onReminderSelect(
                                `${option.value.toLocaleDateString()} ${option.time}`
                            )
                            onOpenChange(false)
                        }}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                        <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4" />
                            {option.label}
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">{option.time}</span>
                    </button>
                ))}
                <button
                    onClick={() => setShowCalendar(true)}
                    className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                    <CalendarIcon className="h-4 w-4" />
                    {t("pickDateTime")}
                </button>
            </div>
        </DropdownMenu>
    )
}
