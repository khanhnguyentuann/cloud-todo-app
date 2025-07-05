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

export default function Component() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [reminder, setReminder] = useState<string>("")
    const [repeat, setRepeat] = useState<string>("")

    const [activeView, setActiveView] = useState<string>("My Day")
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
    const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")
    const isMobile = useMobile()
    const { isDarkMode, toggleDarkMode } = useDarkMode()


    // Fetch tasks from API Gateway + Lambda + DynamoDB
    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch((err) => console.error("Failed to load tasks:", err))
    }, [])

    // On viewport change, adjust sidebar
    useLayoutEffect(() => {
        setSidebarOpen(!isMobile)
    }, [isMobile])

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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    return (
        <div className="h-screen flex flex-col bg-amber-50 dark:bg-gray-800">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSettingsClick={() => setSettingsOpen(true)}
                onAccountClick={() => setAccountMenuOpen(true)}
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
                    <ContentHeader title="My Day" date="Sunday, June 29" viewMode={viewMode} onViewModeChange={setViewMode} />

                    <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                        <TaskInput
                            value={inputValue}
                            onChange={setInputValue}
                            onAdd={addTask}
                            onKeyPress={handleKeyPress}
                            selectedDueDate={dueDate}
                            setSelectedDueDate={setDueDate}
                            selectedReminder={reminder}
                            setSelectedReminder={setReminder}
                            selectedRepeat={repeat}
                            setSelectedRepeat={setRepeat}
                        />

                        {/* Tasks List/Grid */}
                        <TaskList tasks={tasks} viewMode={viewMode} onToggle={toggleTask} onToggleImportant={toggleImportant} />
                    </div>
                </main>
            </div>

            <SettingsPanel
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
            <AccountMenu isOpen={accountMenuOpen} onClose={() => setAccountMenuOpen(false)} />
        </div>
    )
}
