import React, { useState, useLayoutEffect, useEffect } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { ContentHeader } from "@/components/ContentHeader"
import { TaskInput } from "@/components/TaskInput"
import { SettingsPanel } from "@/components/SettingsPanel"
import { AccountMenu } from "@/components/AccountMenu"
import { useMobile, useDarkMode } from "@/hooks/UseMobile"
import type { Task } from "@/types"
import { TaskList } from "@/components/TaskList"
import { createTask, fetchTasks } from "@/lib/api/Todo"
import { TaskDetailSidebar } from "@/components/TaskDetailSideBar"
import { useLanguage } from "@/hooks/UseLanguage"
import { HelpPanel } from "@/components/HelpPanel"

export default function Component() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [reminder, setReminder] = useState<string>("")
    const [repeat, setRepeat] = useState<string>("")
    const [taskDetailSidebarOpen, setTaskDetailSidebarOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [activeView, setActiveView] = useState<string>("My Day")
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
    const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")
    const isMobile = useMobile()
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const [sortBy, setSortBy] = useState<string>("Creation date")
    const { t, getCurrentDate } = useLanguage()
    const [helpOpen, setHelpOpen] = useState(false)

    // Fetch tasks from API Gateway + Lambda + DynamoDB
    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch((err) => console.error("Failed to load tasks:", err))
    }, [])

    // On viewport change, adjust sidebar
    useLayoutEffect(() => {
        setSidebarOpen(!isMobile);
        setTaskDetailSidebarOpen(false);
    }, [isMobile]);

    const addTask = async () => {
        if (inputValue.trim() !== "") {
            try {
                await createTask({
                    text: inputValue.trim(),
                    completed: false,
                    dueDate,
                    reminder,
                    repeat
                })
                setInputValue("")
                setDueDate("")
                setReminder("")
                setRepeat("")
                const updatedTasks = await fetchTasks()
                setTasks(updatedTasks)
            } catch (err) {
                console.error("Failed to create task:", err)
            }
        }
    }

    const sortTasks = (tasks: Task[], sortType: string): Task[] => {
        const tasksCopy = [...tasks]

        switch (sortType) {
            case "Important":
                return tasksCopy.sort((a, b) => {
                    if (a.isImportant && !b.isImportant) return -1
                    if (!a.isImportant && b.isImportant) return 1
                    return 0
                })

            case "Due date":
                return tasksCopy.sort((a, b) => {
                    if (!a.dueDate && !b.dueDate) return 0
                    if (!a.dueDate) return 1
                    if (!b.dueDate) return -1
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                })

            case "Alphabetical":
                return tasksCopy.sort((a, b) => a.text.localeCompare(b.text))

            case "Creation date":
            default:
                return tasksCopy.sort((a, b) => a.id - b.id)
        }
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const toggleImportant = (id: number) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, isImportant: !task.isImportant } : task
        ))
    }

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task)
        setTaskDetailSidebarOpen(true)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    return (
        <div className="h-screen flex flex-col bg-amber-50 dark:bg-gray-800">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSettingsClick={() => setSettingsOpen(true)}
                onAccountClick={() => setAccountMenuOpen(true)}
                onHelpClick={() => setHelpOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    activeView={activeView}
                    onViewChange={setActiveView}
                    isMobile={isMobile}
                />

                <main className="flex-1 flex flex-col overflow-hidden bg-amber-50 dark:bg-gray-900">
                    <ContentHeader
                        title={t.myDay}
                        date={getCurrentDate()}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />

                    <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                        <TaskInput
                            value={inputValue}
                            onChange={setInputValue}
                            onAdd={addTask}
                            onKeyPress={handleKeyPress}
                            placeholder={t.addTask}
                            selectedDueDate={dueDate}
                            setSelectedDueDate={setDueDate}
                            selectedReminder={reminder}
                            setSelectedReminder={setReminder}
                            selectedRepeat={repeat}
                            setSelectedRepeat={setRepeat}
                        />

                        {/* Tasks List/Grid */}
                        <TaskList
                            tasks={sortTasks(tasks, sortBy)}
                            viewMode={viewMode}
                            onToggle={toggleTask}
                            onToggleImportant={toggleImportant}
                            onTaskSelect={handleTaskSelect}
                        />
                    </div>
                </main>
                <TaskDetailSidebar
                    isOpen={taskDetailSidebarOpen}
                    onClose={() => setTaskDetailSidebarOpen(false)}
                    task={selectedTask}
                    isMobile={isMobile}
                />
            </div>

            <SettingsPanel
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <HelpPanel isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
            <AccountMenu isOpen={accountMenuOpen} onClose={() => setAccountMenuOpen(false)} />
        </div>
    )
}
