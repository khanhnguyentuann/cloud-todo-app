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
    placeholder?: string;
    defaultImportant?: boolean;
}

export function TaskInput({ placeholder, defaultImportant = false }: TaskInputProps) {
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
            addTaskWithInput(defaultImportant);
        }
    }

    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover transition-all duration-200 bg-theme-surface dark:bg-theme-surface border border-theme-border dark:border-theme-border shadow-sm hover:shadow-md">
                <Plus className="w-5 h-5 text-theme-primary dark:text-theme-primary flex-shrink-0" />
                <Input
                    type="text"
                    placeholder={placeholder || t('addTask')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-0 shadow-none text-theme-text-primary dark:text-theme-text-primary placeholder:text-theme-text-muted dark:placeholder:text-theme-text-muted focus-visible:ring-0 p-0 text-sm sm:text-base bg-transparent font-medium"
                />
                <Button
                    onClick={() => addTaskWithInput(defaultImportant)}
                    variant="ghost"
                    size="sm"
                    className="text-theme-primary dark:text-theme-primary hover:text-theme-primary-hover dark:hover:text-theme-primary-hover hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                    {t('add')}
                </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                <Tooltip content={t('addDueDate')}>
                    <DueDateMenu
                        isOpen={dueDateMenuOpen}
                        onOpenChange={setDueDateMenuOpen}
                        onDateSelect={setDueDate}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-theme-info dark:text-theme-info hover:bg-theme-info/10 dark:hover:bg-theme-info/10 flex items-center gap-2 transition-all duration-200 rounded-lg px-3 py-2 font-medium ${dueDate
                                    ? "border border-theme-info/30 dark:border-theme-info/30 bg-theme-info/10 dark:bg-theme-info/10"
                                    : "border border-transparent"
                                    }`}
                            >
                                <CalendarIcon className="h-4 w-4" />
                                {dueDate && (
                                    <span className="text-xs font-semibold">{dueDate}</span>
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
                                className={`text-theme-warning dark:text-theme-warning hover:bg-theme-warning/10 dark:hover:bg-theme-warning/10 flex items-center gap-2 transition-all duration-200 rounded-lg px-3 py-2 font-medium ${reminder
                                    ? "border border-theme-warning/30 dark:border-theme-warning/30 bg-theme-warning/10 dark:bg-theme-warning/10"
                                    : "border border-transparent"
                                    }`}
                            >
                                <Bell className="h-4 w-4" />
                                {reminder && (
                                    <span className="text-xs font-semibold">{reminder}</span>
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
                                className={`text-theme-success dark:text-theme-success hover:bg-theme-success/10 dark:hover:bg-theme-success/10 flex items-center gap-2 transition-all duration-200 rounded-lg px-3 py-2 font-medium ${repeat
                                    ? "border border-theme-success/30 dark:border-theme-success/30 bg-theme-success/10 dark:bg-theme-success/10"
                                    : "border border-transparent"
                                    }`}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {repeat && (
                                    <span className="text-xs font-semibold">{repeat}</span>
                                )}
                            </Button>
                        }
                    />
                </Tooltip>
            </div>
        </div>
    )
}
