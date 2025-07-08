import React, { useState, useLayoutEffect, useEffect } from "react"
import { Header } from "@/components/features/Header"
import { Sidebar } from "@/components/features/Sidebar"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { SettingsPanel } from "@/components/features/SettingsPanel"
import { AccountMenu } from "@/components/features/AccountMenu"
import { useMobile } from "@/hooks/useMobile"
import { useDarkMode } from "@/hooks/useDarkMode"
import type { Task } from "@/types"
import { TaskList } from "@/components/features/TaskList"
import { createTask, fetchTasks } from "@/services/api/Todo"
import { TaskDetailSidebar } from "@/components/features/TaskDetailSideBar"
import { useLanguage } from "@/hooks/useLanguage"
import { HelpPanel } from "@/components/features/HelpPanel"
import { NotificationPanel } from "@/components/features/NotificationPanel"
import { AccountView } from "@/components/features/AccountView"
import { LoginScreen } from "@/components/features/LoginScreen"
import { useAuth } from "@/hooks/useAuth"


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
    const [notificationOpen, setNotificationOpen] = useState(false)
    // Mock unread notification count
    const [unreadNotificationCount] = useState(2)
    const [accountViewOpen, setAccountViewOpen] = useState(false)
    const { isAuthenticated, isLoading, signInWithGoogle, signOut, user } = useAuth()

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

    const handleNotificationClick = () => {
        setNotificationOpen(!notificationOpen)
        // Close other panels
        setAccountMenuOpen(false)
        setSettingsOpen(false)
        setHelpOpen(false)
    }

    // Show loading screen while checking auth
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        )
    }

    // Show login screen if not authenticated
    if (!isAuthenticated) {
        return <LoginScreen onSignIn={signInWithGoogle} />
    }

    return (
        <div className="h-screen flex flex-col bg-amber-50 dark:bg-gray-800">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSettingsClick={() => setSettingsOpen(true)}
                onAccountClick={() => setAccountMenuOpen(true)}
                onHelpClick={() => setHelpOpen(true)}
                onNotificationClick={handleNotificationClick}
                unreadNotificationCount={unreadNotificationCount}
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
            {/* Notification Panel */}
            <NotificationPanel isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
            <AccountMenu
                isOpen={accountMenuOpen}
                onClose={() => setAccountMenuOpen(false)}
                onViewAccount={() => setAccountViewOpen(true)}
                onSignOut={signOut}
                user={user}
            />

            <AccountView isOpen={accountViewOpen} onClose={() => setAccountViewOpen(false)} user={user} />
        </div>
    )
}
