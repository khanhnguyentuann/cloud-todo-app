import { Button } from "@/components/common/Button"
import { Input } from "@/components/common/Input"
import { Bell, CalendarIcon, Plus, RotateCcw } from "lucide-react"
import { useState } from "react"
import { DueDateMenu } from "@/components/features/DueDateMenu"
import { ReminderMenu } from "@/components/features/ReminderMenu"
import { RepeatMenu } from "@/components/features/RepeatMenu"
import { Tooltip } from "@/components/common/Tooltip"
import { useTranslation } from 'react-i18next'
import { useTaskContext } from "@/context/taskContext"

interface TaskInputProps {
    placeholder?: string
}

export function TaskInput({ placeholder }: TaskInputProps) {
    const {
        inputValue,
        setInputValue,
        dueDate,
        setDueDate,
        reminder,
        setReminder,
        repeat,
        setRepeat,
        addTaskWithInput
    } = useTaskContext()
    const [dueDateMenuOpen, setDueDateMenuOpen] = useState(false)
    const [reminderMenuOpen, setReminderMenuOpen] = useState(false)
    const [repeatMenuOpen, setRepeatMenuOpen] = useState(false)
    const { t } = useTranslation()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskWithInput()
        }
    }

    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 border border-amber-300 dark:border-gray-600">
                <Plus className="w-4 h-4 text-orange-500 dark:text-blue-400 flex-shrink-0" />
                <Input
                    type="text"
                    placeholder={placeholder || t('addTask')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-0 shadow-none text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 p-0 text-sm sm:text-base bg-transparent"
                />
                <Button
                    onClick={addTaskWithInput}
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 dark:text-blue-400 hover:text-orange-600 dark:hover:text-blue-300 hover:bg-orange-50 dark:hover:bg-gray-600 flex-shrink-0"
                >
                    {t('add')}
                </Button>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <Tooltip content={t('addDueDate')}>
                    <DueDateMenu
                        isOpen={dueDateMenuOpen}
                        onOpenChange={setDueDateMenuOpen}
                        onDateSelect={setDueDate}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${dueDate
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <CalendarIcon className="h-4 w-4" />
                                {dueDate && (
                                    <span className="text-xs font-medium">{dueDate}</span>
                                )}
                            </Button>
                        }
                    />
                </Tooltip>

                <Tooltip content={t('remindMe')}>
                    <ReminderMenu
                        isOpen={reminderMenuOpen}
                        onOpenChange={setReminderMenuOpen}
                        onReminderSelect={setReminder}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${reminder
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <Bell className="h-4 w-4" />
                                {reminder && (
                                    <span className="text-xs font-medium">{reminder}</span>
                                )}
                            </Button>
                        }
                    />
                </Tooltip>

                <Tooltip content={t('repeat')}>
                    <RepeatMenu
                        isOpen={repeatMenuOpen}
                        onOpenChange={setRepeatMenuOpen}
                        onRepeatSelect={setRepeat}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${repeat
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {repeat && (
                                    <span className="text-xs font-medium">{repeat}</span>
                                )}
                            </Button>
                        }
                    />
                </Tooltip>
            </div>
        </div>
    )
}
